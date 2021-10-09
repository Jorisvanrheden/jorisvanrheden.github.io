import Grid from "./Grid"

export interface GridModelObserver
{
    updateTiles:(tiles:any[])=>void;
}

export class GridModel
{
    grid:Grid;

    observers:GridModelObserver[] = [];

    constructor()
    {

    }

    randomizeGrid()
    {
        this.grid.randomize();
    }

    attachObserver(observer:GridModelObserver)
    {
        this.observers.push(observer);
    }

    notifyObservers()
    {
        let tiles = this.grid.getTiles();

        this.observers.forEach(observer => {
            observer.updateTiles(tiles);
        });
    }
}