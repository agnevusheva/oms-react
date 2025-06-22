import type { MenuItem, MenuItemDTO } from './types';

export const mapItemFromDTO = (dto: MenuItemDTO): MenuItem => {
  const { id, name, price } = dto;
  return {
    id,
    name,
    price,
    quantity: 0,
  };
};
