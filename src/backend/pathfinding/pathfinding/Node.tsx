export class Node {
	//store the link to backtrack
	//this is more efficient than keeping track of another data structure
	link: Node;

	x: number;
	y: number;

	visited: boolean = false;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
}
