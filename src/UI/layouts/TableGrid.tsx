import React, { PropsWithChildren } from 'react';
import styles from './TableGrid.module.css';

export function TablesGrid({ children }: PropsWithChildren) {
  return <div className={styles.tablesGrid}>{children}</div>;
}
