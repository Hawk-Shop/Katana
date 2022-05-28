import { render, screen } from '@testing-library/react';
import App from '../components/App';
import React from "react";
import ReactDOM from "react-dom";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

test('renders header', () => {
  render(<App />);
  const linkElement = screen.getByText("Overview");
  expect(linkElement).toBeInTheDocument();
});