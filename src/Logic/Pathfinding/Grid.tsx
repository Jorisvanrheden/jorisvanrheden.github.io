export default class Grid
{
  xSize:number = 0;
  ySize:number = 0;

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
            const gridNode:any = {x:i, y:j, walkable:true, status: 0};
            row.push(gridNode);
        }

        tiles.push(row);
    }

    return tiles;
  }

  clear()
  {
    this.tiles = this.initializeTiles();
  }

  toggleWalkable(x:number, y:number)
  {
    this.tiles[x][y].walkable = !this.tiles[x][y].walkable;
  }

  setStart(x:number, y:number)
  {
    //Unset any other start values
    for(let i=0;i<this.xSize;i++)
    {     
      for(let j=0;j<this.ySize;j++)
      {
        this.tiles[i][j].status = 0;
      }
    }

    this.tiles[x][y].status = 1;
  }
  setTarget(x:number, y:number)
  {
    //Unset any other start values
    for(let i=0;i<this.xSize;i++)
    {     
      for(let j=0;j<this.ySize;j++)
      {
        this.tiles[i][j].status = 0;
      }
    }

    this.tiles[x][y].status = 2;
  }

  getTiles()
  {
    return this.tiles.slice();
  }
}