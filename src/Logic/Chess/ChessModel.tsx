export default class ChessModel
{
  private tiles:any = [];

  // private kotlinBoard = new kotlin_wrapper.Wrapper(8, 8);

  constructor()
  {
    this.updateTiles();
  }

  setTiles(map:any[])
  {
    this.tiles = [];
    for(let i=0;i<map.length;i++)
    {
      const row:any = [];
      for(let j=0;j<map[i].length;j++)
      {
          const gridNode:any = {x:j, y:i,ID:map[i][j]};
          row.push(gridNode);
      }
      this.tiles.push(row);
    }
  }

  getTiles()
  {
    return this.tiles.slice();
  }

  getTile(x:number, y:number)
  {
    return this.tiles[x][y];
  }

  getMoves(x:number, y:number)
  {
    let moves:any[] = [];

    // const pieceMoves = this.kotlinBoard.getMoves(x,y)
    // for(let i=0;i<pieceMoves.length;i++)
    // {
    //   moves.push({xValue: pieceMoves[i].x, yValue: pieceMoves[i].y});
    // }

    return moves;
  }

  processMove(start:any, target:any)
  {
      // this.kotlinBoard.processMove(start.x, start.y, target.x, target.y)

      this.updateTiles();
  }

  undoMove()
  {
      // this.kotlinBoard.undoMove();

      this.updateTiles();
  }

  updateTiles()
  {
    // const board = this.kotlinBoard.getBoardRepresentation()
    // this.setTiles(board);
  }
}