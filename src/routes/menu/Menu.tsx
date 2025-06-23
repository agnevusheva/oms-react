import { MENU_SUBHEADER, SELECTED_ITEMS_SUBHEADER } from './consts';
import { mapItemFromDraft, mapItemFromDTO } from './utils';
import styles from './Menu.module.css';
import type { MenuItem } from './types';
import { Card } from '../../UI/cards/Card';
import { MenuList, MenuListMode } from '../../UI/menu-list/MenuList';
import { PageContainer } from '../../UI/page-container/PageConteiner';
import { Header } from '../../UI/typography/Header';
import { useLoaderData } from 'react-router-dom';
import { useClientDocument, useStore } from '@livestore/react';
import { tables } from '../../lib/liveStore/schema';
import { Input } from '../../UI/input/Input';
import { Button } from '../../UI/buttons/Button';
import { useRef, useState } from 'react';

export default function Menu() {
  const { store } = useStore();
  const [tableNumber, setTableNumber] = useState(0);
  const onTableNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTableNumber(Number(e.target.value));
  };
  const { itemsDTO } = useLoaderData();
  const menuItems: MenuItem[] = itemsDTO.map(mapItemFromDTO);

  const [draft] = useClientDocument(tables.orderDraft);
  const draftOrderItems = draft.items.map(mapItemFromDraft);

  const onAssignOrder = () => {};

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
            <div className={styles.inputContainer}>
              <Input value={tableNumber} onChange={onTableNumberChange} />
              <Button type="submit" onClick={() => onAssignOrder()}>
                Assign to Table
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
