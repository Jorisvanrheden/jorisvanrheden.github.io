import { Chess, Square } from 'chess.js'

const chess = new Chess()

export default class ChessModel {
	private tiles: any = [];
	private stockfish: Worker | null = null;
	private updateMoveCallback: (data:any[]) => void;

	private latestFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

	private pieceMap: { [key: string]: number } = {
		'r': 11, 'n': 10, 'b': 9, 'q': 8, 'k': 7, 'p': 12,
		'R': 5, 'N': 4, 'B': 3, 'Q': 2, 'K': 1, 'P': 6,
		'.': 0  // 0 represents an empty square
	};

	constructor() {
		this.initializeStockfish();
		this.updateTiles(
			this.FENtoBoard(this.latestFEN)
		)
	}

	setUpdateMoveCallback(updateMoveCallback: any) {
		this.updateMoveCallback = updateMoveCallback;
	}

	private FENtoBoard(fen: string) {
		const [pieces] = fen.split(' ');
		const rows = pieces.split('/');

		return rows.map((row, i) => {
			let rowTiles: any[] = [];
			let j = 0; // Column index

			for (let char of row) {
				if (char >= '1' && char <= '8') {
					// Add empty squares based on the number
					for (let k = 0; k < Number(char); k++) {
						rowTiles.push({ x: i, y: j, ID: 0 });
						j++;
					}
				} else {
					// Translate piece symbol to ID and create grid node
					rowTiles.push({ x: i, y: j, ID: this.pieceMap[char] });
					j++;
				}
			}
			return rowTiles;
		});
	}

	// Initialize Stockfish
	private initializeStockfish() {
		// Create a new Worker for the Stockfish ASM-JS engine
		this.stockfish = new Worker('./stockfish/stockfish-16.1-asm.js'); // Adjust the path as needed

		// Set up message handling for Stockfish
		this.stockfish.onmessage = (event) => this.handleStockfishMessage(event);

		// Send 'uci' command to initialize the engine
		this.stockfish.postMessage('uci');

		// Set the position to the starting position (new game)
		this.stockfish.postMessage('position startpos');

		// this.stockfish.postMessage('d'); // Request debug information
	}

	private handleStockfishMessage(event: MessageEvent) {
		const message = event.data;
	
		if (typeof message === 'string') {
			if (message.startsWith('bestmove')) {
				// Extract the best move
				const [command, bestMove] = message.split(' ');				
				// Further processing of the best move can be done here
				// For example, you could update the board or make the move in your application
	
			} else if (message.startsWith('legal moves:')) {
				// Extract and parse the list of legal moves
				const legalMovesString = message.substring('legal moves:'.length).trim();
				const legalMoves = legalMovesString.split(',').map(move => move.trim());
	
				console.log('Legal Moves:', legalMoves);
	
				// Further processing of the legal moves can be done here
				// For example, updating the UI to show all possible moves
	
			} else if (message.startsWith('d')) {
				// Parsing the debug information
				// You might need to parse the debug information to extract the board state
				console.log('Debug info:', message);

			} else if (message.startsWith('Fen')) {
				const FEN = message.replace(/^Fen:\s*/, '');
				// overwrite the stored FEN representation
				this.latestFEN = FEN;
				this.updateTiles(
					this.FENtoBoard(FEN)
				)
			}
		}
	}
	
	updateTiles(tiles:any[]) {
		this.tiles = tiles;

		if (this.updateMoveCallback != null) {
			this.updateMoveCallback(tiles);
		}	
	}

	getTiles() {
		return this.tiles.slice();
	}

	getTile(x: number, y: number) {
		return this.tiles[x][y];
	}

	getMoves(x: number, y: number) {
		// update board
		chess.load(this.latestFEN);

		const pos: string = this.positionToMove({x, y});
		const square: Square = pos as Square;
		
		return chess
			.moves({ square: square })
			.map(move => {
				// Handle castling moves
				if (move === '0-0' || move === '0-0-0') {
					// You can define specific positions for castling moves
					// return this.castlingMoveToPosition(move);
				}
				const index = this.findFirstOccurrenceIndex(move, "abcdefgh")
				return move[index] + move[index + 1]
			})
			.map(move => this.moveToPosition(move))
	}

	private findFirstOccurrenceIndex(str, chars) {
		// Convert the list of characters to an array
		const charsArray = chars.split('');
		
		// Find the index of the first character in charsArray that is in str
		const index = charsArray.findIndex(char => str.indexOf(char) !== -1);
	
		// If a character is found, return its index; otherwise, return -1
		return index === -1 ? -1 : str.indexOf(charsArray[index]);
	}

	// Convert board position to move string (e.g., from { x: 0, y: 1 } to 'a2')
	private positionToMove(pos: { x: number, y: number }): string {
		const file = String.fromCharCode('a'.charCodeAt(0) + pos.y);
		const rank = 8 - pos.x; // Convert to rank 1-8
		return `${file}${rank}`;
	}

	// Convert move string (e.g., 'a2') to board position (e.g., { x: 6, y: 0 })
	private moveToPosition(move: string): { x: number, y: number } {
		const file = move.charAt(0); // Extract the file (e.g., 'a')
		const rank = parseInt(move.charAt(1)); // Extract the rank (e.g., '2')

		const y = file.charCodeAt(0) - 'a'.charCodeAt(0); // Convert file to 0-based index
		const x = 8 - rank; // Convert rank to 0-based index

		return { x, y };
	}

	processMove(start: any, target: any) {
		if (this.stockfish) {
			const moves = `${this.positionToMove(start)}${this.positionToMove(target)}`;
			// update position
			this.stockfish.postMessage(`position fen ${this.latestFEN} moves ${moves}`);
			// request FEM 
			this.stockfish.postMessage('d');
			// start processing AI move
			// this.stockfish.postMessage('go depth 1');
		}	
	}
}
