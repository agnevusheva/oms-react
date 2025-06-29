import React from 'react';
import styles from './Table.module.css';
import { Shape } from '../../routes/orders/types';

interface TableProps {
  id: number;
  shape?: Shape;
  hasOrder: boolean;
}

type CSSVariables = Record<`--${string}`, string | number>;

export function Table({ id, shape = Shape.SQUARE, hasOrder }: TableProps) {
  const isCircle = shape === Shape.CIRCLE;
  const radius = isCircle ? '50%' : '8px';

  const style: React.CSSProperties & CSSVariables = {
    borderRadius: radius,
    '--beforeElementShape': radius,
  };

  return (
    <div className={`${styles.table} ${hasOrder ? styles.hasOrder : ''}`} style={style}>
      <span className={styles.id}>{id}</span>
    </div>
  );
}
