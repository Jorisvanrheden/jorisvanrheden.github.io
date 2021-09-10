export default interface YoutubeProjectData
{
    url:string;
    title:string;
    description:string,
    image:string;
}

export const YoutubeProjectEntries: Array<YoutubeProjectData> =
[
    {url: "https://www.youtube.com/embed/rbQ-Hn2hN8o", title: "Chopin", description: "Chopin Nocturne Op. 48 No. 1", image: "Scarbo"},
    {url: "https://www.youtube.com/embed/rbQ-Hn2hN8o", title: "Test", description: "Chess game", image: "chess.png"},
    {url: "https://www.youtube.com/embed/rbQ-Hn2hN8o", title: "Test", description: "Mandelbrot", image: "mandelbrot.png"},
    {url: "https://www.youtube.com/embed/rbQ-Hn2hN8o", title: "Test", description: "Pathfinding", image: "TestURL"},
    {url: "https://www.youtube.com/embed/rbQ-Hn2hN8o", title: "Test", description: "test description", image: "TestURL"},
    {url: "https://www.youtube.com/embed/rbQ-Hn2hN8o", title: "Test", description: "test description", image: "TestURL"},
    {url: "https://www.youtube.com/embed/rbQ-Hn2hN8o", title: "Test", description: "test description", image: "TestURL"}
]