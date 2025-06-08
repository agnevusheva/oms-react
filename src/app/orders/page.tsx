import { mapTableFromDTO } from './utils';
import type { Table as TableType } from './types';
import { ORDERS_HEADER } from '../consts';

import { backofficeAPI } from '../../lib/backoffice/backofficeService';
import { TablesGrid } from '../../UI/layouts/TableGrid';
import { PageContainer } from '../../UI/page-container/PageConteiner';
import { Table } from '../../UI/table/Table';

export default async function OrdersPage() {
  const tablesDTO = await backofficeAPI.getTables();
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
