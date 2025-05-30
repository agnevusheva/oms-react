import React, { PropsWithChildren } from 'react';
import styles from './Page.module.css';
import { NavButton } from '../buttons/NavButton';
import { Header } from '../typography/Header';

interface PageOwnProps {
  headerText?: string;
}

export function PageContainer({ headerText, children }: PropsWithChildren<PageOwnProps>) {
  return (
    <div className={styles.page}>
      <NavButton text="Back" destination="/" size="XS" />
      {headerText && <Header level={1} text={headerText} />}
      {children}
    </div>
  );
}
