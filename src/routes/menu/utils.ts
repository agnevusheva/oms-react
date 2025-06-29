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

export const mapItemFromDraft = (draftItem: MenuItem): MenuItem => {
  const { id, name, price, quantity } = draftItem;
  return {
    id,
    name,
    price,
    quantity,
  };
};
