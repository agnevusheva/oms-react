export interface Table {
	id: number;
	shape: Shape;
}

export enum Shape {
	SQUARE = 'SQUARE',
	CIRCLE = 'CIRCLE'
}

export interface TableDTO {
	id: number;
	shape?: string;
}
