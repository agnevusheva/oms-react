import React from 'react';
import styles from './Header.module.css';

type HeaderLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeaderTag = `h${HeaderLevel}`;

interface HeaderProps {
  level?: HeaderLevel;
  text: string;
}

export function Header({ level = 3, text }: HeaderProps) {
  const Tag = `h${level}` as HeaderTag;
  const sizeClass = styles[`h${level}`];

  return <Tag className={`${styles.header} ${sizeClass}`}>{text}</Tag>;
}
