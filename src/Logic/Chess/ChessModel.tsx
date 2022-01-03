export default class ChessModel
{
  private tiles:any = [];

  constructor()
  {
    const board = [
      [11,10,9,8,7,9,10, 11],
      [12,12,12,12,12,12,12,12],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [6,6,6,6,6,6,6,6],
      [5,4,3,2,1,3,4,5]
    ];
  
    this.setTiles(board)
  }

  setTiles(map:any[])
  {
    this.tiles = [];
    for(let i=0;i<map.length;i++)
    {
      const row:any = [];
      for(let j=0;j<map[i].length;j++)
      {
          const gridNode:any = {x:i, y:j,ID:map[i][j]};
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

    //get the potential tiles from the chess model
    //this is a mock implementation until the API is linked
    moves.push({xValue: x - 1, yValue: y});
    moves.push({xValue: x - 2, yValue: y});
    moves.push({xValue: x - 3, yValue: y});

    return moves;
  }

  processMove(start:any, target:any)
  {
      if(start.x === target.x && start.y === target.y) return;

      let originalID = this.getTile(start.x, start.y).ID;
        
      //set original ID at new place
      this.getTile(target.x, target.y).ID = originalID;

      //set the original tile to 0
      this.getTile(start.x, start.y).ID = 0;
  }
}