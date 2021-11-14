export default interface ProjectData
{
    url:string;
    description:string,
    image:string;
}

export const ProjectDataEntries: Array<ProjectData> =
[
    {
        url: "/projects/pathfinding",
        description: 
            "Pathfinding Visualization - A simple tool to visualize different pathfinding strategies. \
            Visualize the steps taken by the algorithm to get to the resulting path."
        ,
        image: "pathfinding.png",
    },
    {
        url: "projects/chess",
        description: "Chess Engine",
        image: "chess.png",
    },
]