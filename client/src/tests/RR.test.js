<<<<<<< HEAD
describe('true is truthy and false is falsy', () => {
  test('true is truthy', () => {
    expect(true).toBe(true);
=======
import React from 'react';
import { render, screen } from '@testing-library/react';

import App from '../components/App.jsx';

describe('App', () => {
  test('renders App component', () => {
    render(<App />);

    screen.debug();
>>>>>>> master
  });
});