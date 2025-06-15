import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { backofficeAPI } from '../lib/backoffice/backofficeService';
import { MenuItemDTO } from './menu/types';
import Menu from './menu/Menu';
import { App } from '../App';
import { TableDTO } from './orders/types';
import Orders from './orders/Orders';
import { ROUTES } from '../utils';
import { Main } from './main/Main';

const mainRoute: RouteObject = {
  path: ROUTES.MAIN,
  Component: Main,
};

const menuRoute: RouteObject & {
  loader: () => Promise<{ itemsDTO: MenuItemDTO[] }>;
} = {
  path: ROUTES.MENU,
  loader: async () => {
    const itemsDTO = await backofficeAPI.getItems();
    return { itemsDTO };
  },
  Component: Menu,
};

const ordersRoute: RouteObject & {
  loader: () => Promise<{ tablesDTO: TableDTO[] }>;
} = {
  path: ROUTES.ORDERS,
  loader: async () => {
    const tablesDTO = await backofficeAPI.getTables();
    return { tablesDTO };
  },
  Component: Orders,
};

const rootRoute: RouteObject = {
  path: ROUTES.MAIN,
  Component: App,
  children: [menuRoute, ordersRoute, mainRoute],
};

export const router = createBrowserRouter([rootRoute] as RouteObject[]);
