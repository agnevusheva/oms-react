import { mapTableFromDTO } from './utils';
import { OrderStatus, type Table as TableType } from './types';
import { TablesGrid } from '../../UI/layouts/TableGrid';
import { PageContainer } from '../../UI/page-container/PageConteiner';
import { Table } from '../../UI/table/Table';
import { useLoaderData } from 'react-router-dom';
import { ORDERS_HEADER } from '../../utils';
import { useStore } from '@livestore/react';
import { queryDb } from '@livestore/livestore';
import { tables } from '../../lib/liveStore/schema';

const visibleOrders$ = queryDb(
  _ => {
    return tables.orders;
  },
  { label: 'visibleOrders' },
);

export default function Orders() {
  const { tablesDTO } = useLoaderData();
  const tables: TableType[] = tablesDTO.map(mapTableFromDTO);

  const { store } = useStore();
  const orders = store.useQuery(visibleOrders$);
  console.log('Orders:', orders);

  const ordersAccountIds = new Set(orders.map(order => order.accountId));
  console.log('Orders account IDs:', ordersAccountIds);

  return (
    <PageContainer headerText={ORDERS_HEADER}>
      <TablesGrid>
        {tables.map(({ id, shape }) => (
          <Table key={id} id={id} shape={shape} hasOrder={ordersAccountIds.has(id)} />
        ))}
      </TablesGrid>
    </PageContainer>
  );
}
