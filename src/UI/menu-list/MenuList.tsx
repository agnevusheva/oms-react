import styles from './MenuList.module.css';
import { Button } from '../buttons/Button';
import { MenuItem, Currency } from '../../routes/menu/types';
import { useClientDocument } from '@livestore/react';
import { tables } from '../../lib/liveStore/schema';

export enum MenuListMode {
  Read,
  Write,
}

interface MenuListProps {
  menuItems: MenuItem[];
  currency?: Currency;
  mode?: MenuListMode;
}

export function MenuList({ menuItems, currency = '€', mode = MenuListMode.Read }: MenuListProps) {
  const [_, setDraft] = useClientDocument(tables.orderDraft);

  const onIncreaseQuantity = (itemToIncrease: MenuItem) => {
    setDraft(draft => {
      const idx = draft.items.findIndex(i => i.id === itemToIncrease.id);

      let updatedItems: MenuItem[];

      if (idx === -1) {
        updatedItems = [...draft.items, { ...itemToIncrease, quantity: 1 }];
      } else {
        updatedItems = draft.items.map((i, iIdx) =>
          iIdx === idx ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }

      return { ...draft, items: updatedItems };
    });
  };

  const onDecreaseQuantity = (itemToDecrease: MenuItem) => {
    setDraft(draft => {
      const idx = draft.items.findIndex(i => i.id === itemToDecrease.id);
      if (idx === -1) return draft;

      const target = draft.items[idx];

      let updatedItems: MenuItem[];
      if (target!.quantity <= 1) {
        updatedItems = draft.items.filter((_, i) => i !== idx);
      } else {
        updatedItems = draft.items.map((i, iIdx) =>
          iIdx === idx ? { ...i, quantity: i.quantity - 1 } : i,
        );
      }

      return { ...draft, items: updatedItems };
    });
  };

  return (
    <div className={styles.menuList}>
      {menuItems.map((item, idx) => (
        <div key={idx} className={styles.menuItem}>
          <span>{item.name}</span>
          <span>
            {currency} {item.price.toFixed(2)}
          </span>

          {mode === MenuListMode.Write ? (
            <div className={styles.quantityControls}>
              <Button type="button" onClick={() => onDecreaseQuantity(item)}>
                −
              </Button>
              <Button type="button" onClick={() => onIncreaseQuantity(item)}>
                +
              </Button>
            </div>
          ) : null}
          {mode === MenuListMode.Read ? <span>x {item.quantity}</span> : null}
        </div>
      ))}
    </div>
  );
}
