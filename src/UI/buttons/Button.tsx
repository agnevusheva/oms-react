import React, { PropsWithChildren } from 'react';
import styles from './Button.module.css';

type ControlButtonProps = PropsWithChildren<{
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}>;

export function Button({ children, onClick, type }: ControlButtonProps) {
  return (
    <button type={type} className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
}
