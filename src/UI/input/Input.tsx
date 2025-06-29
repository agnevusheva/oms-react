import { ChangeEventHandler } from 'react';
import styles from './Input.module.css';

export const Input = ({
  value = 0,
  onChange,
}: {
  value: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) => {
  return <input type="number" className={styles.input} value={value} onChange={onChange} />;
};
