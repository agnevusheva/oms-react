export const ROUTES = {
  ORDERS: 'orders',
  MENU: 'menu',
  MAIN: '*',
};

export const ORDERS_HEADER = 'Orders';

export const getClientId = () => {
  if (typeof window === 'undefined') return 'unused';

  const searchParams = new URLSearchParams(window.location.search);
  const clientId = searchParams.get('clientId');
  if (clientId !== null) return clientId;

  const newAppId = crypto.randomUUID();
  searchParams.set('clientId', newAppId);

  window.location.search = searchParams.toString();
};
