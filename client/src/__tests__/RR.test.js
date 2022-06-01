import React from 'react';
import { render, screen } from '@testing-library/react';

import App from '../components/App.jsx';

test('renders header', () => {
  render(<ReviewsOverview />);
  const linkElement = screen.getByText("Ratings and Reviews");
  expect(linkElement).toBeInTheDocument();
});