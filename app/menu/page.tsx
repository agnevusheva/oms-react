import { MENU_SUBHEADER, SELECTED_ITEMS_SUBHEADER } from './consts';
import { mapItemFromDTO } from './utils';
import styles from './page.module.css';
import type { MenuItem } from './types';
import { backofficeAPI } from '../services/backoffice';
import { Card } from '../UI/cards/Card';
import { MenuList } from '../UI/menu-list/MenuList';
import { PageContainer } from '../UI/page-container/PageConteiner';
import { Header } from '../UI/typography/Header';

export default async function MenuPage() {
  const itemsDTO = await backofficeAPI.getItems();
  const menuItems: MenuItem[] = itemsDTO.map(mapItemFromDTO);

  return (
    <PageContainer>
      <div className={styles.contentContainer}>
        <div className={styles.menuContainer}>
          <Card>
            <Header level={3} text={MENU_SUBHEADER} />
            <MenuList menuItems={menuItems} />
          </Card>
        </div>
        <div className={styles.selectedItems}>
          <Card>
            <Header level={3} text={SELECTED_ITEMS_SUBHEADER} />
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
