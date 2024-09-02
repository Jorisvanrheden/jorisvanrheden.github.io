import ChessModel from "../../backend/chess/ChessModel";
import { useEffect, useState } from "react";
import ChessTile from "./ChessTile";
import ResponsiveRectangle from "../components/ResponsiveRectangle";
import "./ChessBoard.css";

type Props = {
	model: ChessModel;
}

export default function ChessProject({model}: Props) {
	const [start, setStart] = useState({ x: -1, y: -1 });
	const [target, setTarget] = useState({ x: -1, y: -1 });
	const [possibleTiles, setPossibleTiles]: any = useState([]);
	const [tiles, setTiles] = useState(model.getTiles());

	// Set the callback when the component mounts
	useEffect(() => {
		model.setUpdateMoveCallback(onMoveUpdate);
	}, [model]);

	function onMoveUpdate(data: any[]) {
		setTiles(data);
	}

	function resetSelectedInput() {
		setStart({ x: -1, y: -1 });
		setTarget({ x: -1, y: -1 });
		setPossibleTiles([]);
	}

	function processSelectPiece(x: number, y: number) {
		const moves = model.getMoves(x, y);
		console.log(moves);
		setPossibleTiles(moves);

		setStart({ x: x, y: y });
	}

	function processSelectTarget(x: number, y: number) {
		setTarget({ x: x, y: y });
	}

	function processDeselect() {
		resetSelectedInput();
	}

	function processMove() {
		model.processMove(start, target);

		resetSelectedInput();
	}

	function getIsSelected(x: number, y: number, startNode: any) {
		return start.x === x && start.y === y;
	}

	function getIsPossibleMove(x: number, y: number): boolean {
		return possibleTiles.some(tile => tile.x === x && tile.y === y);
	}

	return (
		<div className="chess-container">
			<div className="chess-container-board">
				<ResponsiveRectangle>
					<div className="chess-board">
						{tiles.map((values: any[]) => (
							<div className="chess-row">
								{values.map((value: any) => (
									<ChessTile
										x={value.x}
										y={value.y}
										pieceID={model.getTile(value.x, value.y).ID}
										isSelected={getIsSelected(value.x, value.y, start)}
										isPossibleMove={getIsPossibleMove(value.x, value.y)}
										selectPiece={processSelectPiece}
										selectTarget={processSelectTarget}
										deselectPiece={processDeselect}
										processMove={processMove}
									/>
								))}
							</div>
						))}
					</div>
				</ResponsiveRectangle>
			</div>
			<div className="chess-container-moves">
				<div className="chess-moves"></div>
			</div>
		</div>
	);
}
