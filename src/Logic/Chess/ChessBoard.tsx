export default class ChessBoard
{
  private xSize:number = 0;
  private ySize:number = 0;

  private tiles:any = [];

  constructor(xSize:number, ySize:number)
  {
    this.xSize = xSize;
    this.ySize = ySize;

    this.tiles = this.initializeTiles();
  }

  initializeTiles() 
  {
    const tiles:any = [];

    for(let i=0;i<this.xSize;i++)
    {
        const row:any = [];
        for(let j=0;j<this.ySize;j++)
        {
            const gridNode:any = {x:i, y:j};
            row.push(gridNode);
        }

        tiles.push(row);
    }

    return tiles;
  }

  getTiles()
  {
    return this.tiles.slice();
  }

  getTile(x:number, y:number)
  {
    return this.tiles[x][y];
  }

  isValidTileCoordinate(x:number, y:number)
  {
    if(x < 0 || x >= this.tiles.length) return false;
    if(y < 0 || y >= this.tiles[0].length) return false;

    return true;
  }
}