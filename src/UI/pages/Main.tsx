import React from 'react';
import styles from './Main.module.css';
import { MAIN_TITLE, MENU_BUTTON, ORDERS_BUTTON } from './utils';
import { NavButton } from '../buttons/NavButton';
import { Header } from '../typography/Header';
import { ROUTES } from '../../app/utils';

export function Main() {
  return (
    <section className={styles.section}>
      <Header level={1} text={MAIN_TITLE} />
      <div className={styles.buttonsContainer}>
        <NavButton text={ORDERS_BUTTON} destination={ROUTES.ORDERS} size="M" />
        <NavButton text={MENU_BUTTON} destination={ROUTES.MENU} size="M" />
      </div>
    </section>
  );
}
