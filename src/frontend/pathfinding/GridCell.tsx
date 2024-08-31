import "./GridCell.css"
import "./Grid.css"

type Props = {
    x: number;
    y: number;
    walkable: boolean;
    status: GRID_STATUS;
    processMouseClick: (x: number, y: number) => void;
    processMouseEnter: (x: number, y: number) => void;
};

export enum GRID_STATUS
{
    DEFAULT,
    START,
    TARGET, 
    VISITED, 
    PATH
}

export default function GridCell({ x, y, walkable, status, processMouseClick, processMouseEnter }: Props) {
    function getCellStyle() {
        if (!walkable) return "cell dark";

        const statusClassMap = {
            [GRID_STATUS.DEFAULT]: "light",
            [GRID_STATUS.START]: "start",
            [GRID_STATUS.TARGET]: "target",
            [GRID_STATUS.VISITED]: "visited",
            [GRID_STATUS.PATH]: "path"
        };

        return `cell ${statusClassMap[status]}`;
    }
    return (
        <div 
            className={getCellStyle()}
            onMouseDown={() => processMouseClick(x, y)}
            onMouseEnter={() => processMouseEnter(x, y)}
        >
        </div>
    );
}