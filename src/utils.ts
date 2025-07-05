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
  // use business id if it doesn't exist yet
  const newClientId = '12345';
  localStorage.setItem('clientId', newClientId);
  return newClientId;
};
