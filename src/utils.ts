import { get } from 'http';

export const ROUTES = {
  ORDERS: 'orders',
  MENU: 'menu',
  MAIN: '*',
};

export const ORDERS_HEADER = 'Orders';

export const getClientId = () => {
  const clientId = localStorage.getItem('clientId');
  if (clientId) return clientId;
  // Generate a new UUID if it doesn't exist
  const newClientId = crypto.randomUUID();
  localStorage.setItem('clientId', newClientId);
  return newClientId;
};
