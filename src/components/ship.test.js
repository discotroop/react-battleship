import React from 'react';
import { render } from '@testing-library/react';
import Ship from './ship';
import { exportAllDeclaration } from '@babel/types';

test('tracks ships length', () => {
  expect(Ship(5).length).toBe(5);
});
