import type { MenuItem, MenuItemDTO } from './types';

export const mapItemFromDTO = (dto: MenuItemDTO): MenuItem => {
	console.log('Mapping item from DTO:', dto);
	const { id, name, price } = dto;
	return {
		id,
		name,
		price,
		quantity: 0
	};
};
