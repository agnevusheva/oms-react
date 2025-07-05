import { get } from 'http';

export const ROUTES = {
  ORDERS: 'orders',
  MENU: 'menu',
  MAIN: '*',
};

export const ORDERS_HEADER = 'Orders';

export const getClientId = () => {
  if (typeof window === 'undefined') return 'unused';

  const searchParams = new URLSearchParams(window.location.search);
  const storeId = searchParams.get('storeId');
  if (storeId !== null) return storeId;
  // use business id if it doesn't exist yet
  const newClientId = '12345';
  searchParams.set('storeId', newClientId);

  window.location.search = searchParams.toString();
};
