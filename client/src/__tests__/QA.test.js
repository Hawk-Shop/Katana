describe('true is truthy and false is falsy', () => {
  test('true is truthy', () => {
    expect(true).toBe(true);
  });

  test('false is falsy', () => {
    expect(false).toBe(false);
  });
});

import React from 'react';
import { render, screen } from "@testing-library/react";

import QuestionsList from '../components/QA/QuestionsList.jsx';

test('renders learn react link', () => {
  render(<QuestionsList />);
  const linkElement = screen.getByText(/Read/i);
  expect(linkElement).toBeInTheDocument();
});
