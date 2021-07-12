export default class Grid
{
  xSize:number = 0;
  ySize:number = 0;

  private tiles:any = [];

  private DEFAULT:number = 0;
  private START:number = 1;
  private TARGET:number = 2;
  private VISITED:number = 3;
  private PATH:number = 4;

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

  resetStatuses()
  {
    //Unset any other start values
    for(let i=0;i<this.xSize;i++)
    {     
      for(let j=0;j<this.ySize;j++)
      {
        //skip non-walkable tiles
        if(!this.tiles[i][j].walkable) continue;

        //skip start/target tiles
        if(this.tiles[i][j].status === this.START) continue;
        if(this.tiles[i][j].status === this.TARGET) continue;

        this.tiles[i][j].status = this.DEFAULT;
      }
    }
  }

  toggleWalkable(x:number, y:number)
  {
    this.tiles[x][y].walkable = !this.tiles[x][y].walkable;
  }

  /***Status setters***/
  setStart(x:number, y:number)
  {
    //Unset any other start values
    for(let i=0;i<this.xSize;i++)
    {     
      for(let j=0;j<this.ySize;j++)
      {
        if(this.tiles[i][j].status === this.START)
        {
          this.tiles[i][j].status = this.DEFAULT;
        }
      }
    }

    this.tiles[x][y].status = this.START;
  }
  setTarget(x:number, y:number)
  {
    //Unset any other start values
    for(let i=0;i<this.xSize;i++)
    {     
      for(let j=0;j<this.ySize;j++)
      {
        if(this.tiles[i][j].status === this.TARGET)
        {
          this.tiles[i][j].status = this.DEFAULT;
        }
      }
    }

    this.tiles[x][y].status = this.TARGET;
  }
  setVisited(x:number, y:number)
  {
    this.tiles[x][y].status = this.VISITED;
  }
  setPath(x:number, y:number)
  {
    this.tiles[x][y].status = this.PATH;
  }
  /***Status setters***/

  randomize()
  {
    for(let i=0;i<this.xSize;i++)
    {     
      for(let j=0;j<this.ySize;j++)
      {
        //start and target tiles should not be set to non-walkable
        if(this.tiles[i][j].status === this.START ||
           this.tiles[i][j].status === this.TARGET)
        {
           this.tiles[i][j].walkable = true;    
        }
        else
        {
          this.tiles[i][j].walkable = Math.random() > 0.3;
        }
      }
    }
  }

  getNeighboringTiles(coordinate:any)
  {
    let neighbors:any = [];

    if(this.isValidTileCoordinate(coordinate.x-1, coordinate.y)) neighbors.push({x: coordinate.x-1, y:coordinate.y});
    if(this.isValidTileCoordinate(coordinate.x, coordinate.y-1)) neighbors.push({x: coordinate.x, y:coordinate.y-1});
    if(this.isValidTileCoordinate(coordinate.x+1, coordinate.y)) neighbors.push({x: coordinate.x+1, y:coordinate.y});
    if(this.isValidTileCoordinate(coordinate.x, coordinate.y+1)) neighbors.push({x:coordinate. x, y:coordinate.y+1});

    return neighbors;
  }

  getTiles()
  {
    return this.tiles.slice();
  }

  /***Helper functions***/
  isValidTileCoordinate(x:number, y:number)
  {
    if(x < 0 || x >= this.tiles.length) return false;
    if(y < 0 || y >= this.tiles[0].length) return false;

    return this.tiles[x][y].walkable;
  }

  getStatus(x:number, y:number)
  {
    return this.tiles[x][y].status;
  }
  /***Helper functions***/
  
}