import React, { PropsWithChildren } from 'react';
import styles from './ControlButton.module.css';

type ControlButtonProps = PropsWithChildren<{
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}>;

export function ControlButton({ children, onClick }: ControlButtonProps) {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
}
