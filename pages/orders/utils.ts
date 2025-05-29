import { Shape, type Table, type TableDTO } from './types';

function shapeFromString(shape: string): Shape {
	switch (shape.toLowerCase()) {
		case 'round':
			return Shape.CIRCLE;
		case 'square':
			return Shape.SQUARE;

		default:
			console.warn(`Unknown table shape: ${shape}, defaulting to Circle`);
			return Shape.CIRCLE;
	}
}

export const mapTableFromDTO = (dto: TableDTO): Table => {
	return {
		id: dto.id,
		shape: dto.shape ? shapeFromString(dto.shape) : Shape.CIRCLE
	};
};
