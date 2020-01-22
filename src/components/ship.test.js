import React from 'react';
import { render } from '@testing-library/react';
import Ship from './ship';
import { exportAllDeclaration } from '@babel/types';

const carrier = Ship(5);
const destroyer = Ship(2);

test('tracks ships length', () => {
  expect(carrier.length).toBe(5);
});

test('tracks ship hits', () => {
    carrier.hit(1);
    expect(carrier.health[1]).toBe("x");
  });

test('tracks when ship sunk', () => {
    destroyer.hit(0);
    destroyer.hit(1);
    expect(destroyer.sunk).toBe("Y");
})
