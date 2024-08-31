export abstract class IAction {
	abstract process(x: number, y: number): void;
}

export class DefaultAction extends IAction {
	process(x: number, y: number): void {}
}
