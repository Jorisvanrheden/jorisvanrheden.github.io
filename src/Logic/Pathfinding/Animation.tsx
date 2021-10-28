import { GridModel } from "./GridModel";

export abstract class IAnimator
{
    abstract animate(path:any, gridModel:GridModel):void;
    abstract stop():void;
}

export class InstantAnimator extends IAnimator
{
    animate(path:any, gridModel:GridModel)
    {
        gridModel.displayPath(path);
    }

    stop()
    {
        
    }
}

export class StepByStepAnimator extends IAnimator
{
    readonly ANIMATION_STEP_TIMER:number = 50;

    private timers:any = [];

    animate(path:any, gridModel:GridModel)
    {
        let path_copy:any = [];

        this.timers = []; 

        for(let i=0;i<path.length;i++)
        {
            //Store all timer IDs, as the animation can be cancelled
            //By storing these, clearTimeout can be called on all IDs
            this.timers.push(setTimeout(() => 
            {
                path_copy.push(path[i]);

                gridModel.displayPath(path_copy);

            }, i*this.ANIMATION_STEP_TIMER));
        }
    }

    stop()
    {
        for(let i=0;i<this.timers.length;i++)
        {
            clearTimeout(this.timers[i]);
        }
    }
}