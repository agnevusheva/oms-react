import React from 'react';
import styles from './NavButton.module.css';
import { NAV_BUTTON_SIZE } from './utils';

type NavButtonProps = {
  text: string;
  destination: string;
  size: keyof typeof NAV_BUTTON_SIZE;
};

export function NavButton({ text, destination, size }: NavButtonProps) {
  const stylesParams = NAV_BUTTON_SIZE[size];

  return (
    <a
      className={styles['nav-btn']}
      href={destination}
      style={{
        width: stylesParams.width,
        height: stylesParams.height,
        minWidth: stylesParams['min-width'],
        minHeight: stylesParams['min-height'],
        fontSize: stylesParams['font-size'],
        fontWeight: stylesParams['font-weight'],
      }}
    >
      {text}
    </a>
  );
}
