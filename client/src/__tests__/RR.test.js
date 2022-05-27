import React from 'react';
import { render, screen } from '@testing-library/react';

import App from '../components/App.jsx';

describe('App', () => {
  test('renders App component', () => {
    render(<App />);

    screen.debug();
  });
});