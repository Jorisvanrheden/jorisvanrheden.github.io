export class Tile
{
    walkable:boolean = false;
}

export default class Grid
{
    values:Tile[][] = [];

    constructor(xSize:number, ySize:number)
    {
        for(let i=0;i<xSize;i++)
        {
            this.values[i] = [];

            for(let j=0;j<ySize;j++)
            {
                let tile:Tile = new Tile();

                if(Math.random() > 0.5)
                {
                    tile.walkable = true;
                }

                this.values[i][j] = tile;
            }
        }
    }
}