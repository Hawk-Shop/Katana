import React from 'react';
import { render, screen } from "@testing-library/react";

import ProductInfo from '../components/overview/ProductInfo.jsx';

test('renders learn react link', () => {
  render(<ProductInfo />);
  const linkElement = screen.getByText(/Read/i);
  expect(linkElement).toBeInTheDocument();
});