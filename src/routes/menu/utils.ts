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

/* export const buildOrder = ({  }, omsId: string): Order => {
  const now = new Date();
  return {
    id: crypto.randomUUID(),
    type: draft.type,
    items: draft.items,
    createdAt: now,
    updatedAt: now,
    status:,
    omsId,
  };
};
 */
