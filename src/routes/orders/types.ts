import { MenuItem } from '../menu/types';

export interface Table {
  id: number;
  shape: Shape;
}

export enum Shape {
  SQUARE = 'SQUARE',
  CIRCLE = 'CIRCLE',
}

export interface TableDTO {
  id: number;
  shape?: string;
}

export enum OrderType {
  DINE_IN = 'DINE_IN',
  TAKE_AWAY = 'TAKE_AWAY',
  DELIVERY = 'DELIVERY',
}

export enum OrderStatus {
  NEW = 'NEW',
  PREPARING = 'PREPARING',
  READY = 'READY',
  SERVED = 'SERVED',
  CANCELLED = 'CANCELLED',
  CLOSED = 'CLOSED',
}
