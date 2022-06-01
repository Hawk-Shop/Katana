import React from 'react';

// describe('true is truthy and false is falsy', () => {
//   test('true is truthy', () => {
//     expect(true).toBe(true);
//   });

//   test('false is falsy', () => {
//     expect(false).toBe(false);
//   });
// });

import { render, screen , waitFor } from "@testing-library/react";
import { Context } from '../components/util/context.js';
import QuestionsList from '../components/QA/QuestionsList.jsx';

test('renders learn react link', () => {
  render(<QuestionsList/>)
  const qAndAHeader = screen.getByText(/Questions & Answers/i);
  expect(qAndAHeader).toBeInTheDocument();
});

test('renders learn react link', () => {
  render(<QuestionsList/>);
  const searchbar = screen.getByText(/SEARCH/i);
  expect(searchbar).toBeInTheDocument();
});
