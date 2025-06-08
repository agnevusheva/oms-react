import React from 'react';
import styles from './Main.module.css';
import { NavButton } from '../../UI/buttons/NavButton';
import { Header } from '../../UI/typography/Header';
import { MAIN_TITLE, ORDERS_BUTTON, MENU_BUTTON } from './utils';
import { ROUTES } from '../../utils';

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
