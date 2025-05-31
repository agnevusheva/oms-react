'use client';
import React from 'react';

import styles from './MenuList.module.css';
import { ControlButton } from '../buttons/ControlButton';
import { Currency, MenuItem } from '../../app/menu/types';

interface MenuListProps {
  menuItems: MenuItem[];
  currency?: Currency;
}

export function MenuList({ menuItems, currency = '€' }: MenuListProps) {
  return (
    <div className={styles.menuList}>
      {menuItems.map((item, idx) => (
        <div key={idx} className={styles.menuItem}>
          <span>{item.name}</span>
          <span>
            {currency} {item.price.toFixed(2)}
          </span>
          <div className={styles.quantityControls}>
            <ControlButton onClick={() => console.log('decrease')}>−</ControlButton>
            <span>{item.quantity}</span>
            <ControlButton onClick={() => console.log('increase')}>+</ControlButton>
          </div>
        </div>
      ))}
    </div>
  );
}
