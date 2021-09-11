export default interface YoutubeProjectData
{
    url:string;
    title:string;
    description:string,
    image:string;
}

export const YoutubeProjectEntries: Array<YoutubeProjectData> =
[
    {
        url: "",
        title: "Title",
        description: "Description",
        image: "image.png"
    },
    {url: "https://www.youtube.com/embed/rbQ-Hn2hN8o", title: "Chopin", description: "Chopin Nocturne Op. 48 No. 1", image: "music.png"},
    {url: "https://www.youtube.com/embed/Ak-E5s5A32I", title: "Respighi", description: "Notturno", image: "music.png"},
    {url: "https://www.youtube.com/embed/rbQ-Hn2hN8o", title: "Test", description: "Mandelbrot", image: "mandelbrot.png"},
    {url: "https://www.youtube.com/embed/rbQ-Hn2hN8o", title: "Test", description: "Pathfinding", image: "TestURL"},
    {url: "https://www.youtube.com/embed/rbQ-Hn2hN8o", title: "Test", description: "test description", image: "TestURL"},
    {url: "https://www.youtube.com/embed/rbQ-Hn2hN8o", title: "Test", description: "test description", image: "TestURL"},
    {url: "https://www.youtube.com/embed/rbQ-Hn2hN8o", title: "Test", description: "test description", image: "TestURL"}
]