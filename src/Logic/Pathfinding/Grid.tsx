export default class Grid
{
  xSize:number = 0;
  ySize:number = 0;

  private tiles:any = [];

  latestVisitedNodes:any = [];

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

    this.latestVisitedNodes = [];
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
        if(this.tiles[i][j].status === 1)
        {
          this.tiles[i][j].status = 0;
        }
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
        if(this.tiles[i][j].status === 2)
        {
          this.tiles[i][j].status = 0;
        }
      }
    }

    this.tiles[x][y].status = 2;
  }
  setVisited(x:number, y:number)
  {
    this.tiles[x][y].status = 3;
  }
  /***Status setters***/


  addVisitedNode(coordinate:any)
  {
    if(this.visitedCollectionContainsNode(coordinate)) return;

    //only add default tiles
    if(this.tiles[coordinate.x][coordinate.y].status !== 0) return;

    this.latestVisitedNodes.push(coordinate);
  }

  getNeighboringTiles(coordinate:any)
  {
    let neighbors:any = [];

    if(this.isValidTileCoordinate(coordinate.x-1, coordinate.y)) neighbors.push({x: coordinate.x-1, y:coordinate.y});
    if(this.isValidTileCoordinate(coordinate.x+1, coordinate.y)) neighbors.push({x: coordinate.x+1, y:coordinate.y});
    if(this.isValidTileCoordinate(coordinate.x, coordinate.y-1)) neighbors.push({x: coordinate.x, y:coordinate.y-1});
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

  visitedCollectionContainsNode(coordinate:any)
  {
    for(let i=0;i<this.latestVisitedNodes.length;i++)
    {
      if(this.latestVisitedNodes[i].x === coordinate.x &&
         this.latestVisitedNodes[i].y === coordinate.y) return true;
    }

    return false;
  }
  /***Helper functions***/
  
}