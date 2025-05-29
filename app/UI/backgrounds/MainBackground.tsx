import React, { PropsWithChildren } from 'react';
import style from './MainBackground.module.css';

export const MainBackground = ({ children }: PropsWithChildren) => (
  <div className={style.lines}>
    <div className={style.line} />
    {children}
  </div>
);
