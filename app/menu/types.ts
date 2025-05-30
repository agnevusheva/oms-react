export interface MenuItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface MenuItemDTO {
  id: number;
  name: string;
  price: number;
}

export type Currency = '€' | '$' | '£';
