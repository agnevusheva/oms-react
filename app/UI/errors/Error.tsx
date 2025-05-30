import React from 'react';
import { ERROR_TITLE, ERROR_SUBTITLE } from './utils';
import { Header } from '../typography/Header';

export function ErrorHeaders() {
  return (
    <>
      <Header level={2} text={ERROR_TITLE} />
      <Header level={3} text={ERROR_SUBTITLE} />
    </>
  );
}
