import { MENU_SUBHEADER, SELECTED_ITEMS_SUBHEADER } from './consts';
import { mapItemFromDTO } from './utils';
import styles from './Menu.module.css';
import type { MenuItem } from './types';
import { Card } from '../../UI/cards/Card';
import { MenuList, MenuListMode } from '../../UI/menu-list/MenuList';
import { PageContainer } from '../../UI/page-container/PageConteiner';
import { Header } from '../../UI/typography/Header';
import { useLoaderData } from 'react-router-dom';
import { useClientDocument } from '@livestore/react';
import { tables } from '../../lib/liveStore/schema';

export default function Menu() {
  const { itemsDTO } = useLoaderData();
  const menuItems: MenuItem[] = itemsDTO.map(mapItemFromDTO);

  const [draft] = useClientDocument(tables.orderDraft);
  const draftOrderItems = draft.items.map(mapItemFromDTO);

  return (
    <PageContainer>
      <div className={styles.contentContainer}>
        <div className={styles.menuContainer}>
          <Card>
            <Header level={3} text={MENU_SUBHEADER} />
            <MenuList menuItems={menuItems} mode={MenuListMode.Write} />
          </Card>
        </div>
        <div className={styles.selectedItems}>
          <Card>
            <Header level={3} text={SELECTED_ITEMS_SUBHEADER} />
            <MenuList menuItems={draftOrderItems} mode={MenuListMode.Read} />
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
