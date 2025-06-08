import { mapTableFromDTO } from './utils';
import type { Table as TableType } from './types';
import { TablesGrid } from '../../UI/layouts/TableGrid';
import { PageContainer } from '../../UI/page-container/PageConteiner';
import { Table } from '../../UI/table/Table';
import { useLoaderData } from 'react-router-dom';
import { ORDERS_HEADER } from '../../utils';

export default function Orders() {
  const { tablesDTO } = useLoaderData();
  const tables: TableType[] = tablesDTO.map(mapTableFromDTO);

  return (
    <PageContainer headerText={ORDERS_HEADER}>
      <TablesGrid>
        {tables.map(({ id, shape }) => (
          <Table key={id} id={id} shape={shape} />
        ))}
      </TablesGrid>
    </PageContainer>
  );
}
