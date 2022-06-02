import { render, screen } from '@testing-library/react';
import Overview from '../components/App';
import React from "react";
import ReactDOM from "react-dom";

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
// });

// test('renders header', async () => {
//   await render(<App />);
//   const linkElement = screen.getByText("Overview");
//   await expect(linkElement).toBeInTheDocument();
// });

describe('Overview', () => {
  test('renders OVerview component', async () => {
    render(<Overview />);

    expect(await screen.findByText(/Hawk Shop/)).toBeInTheDocument();

  });
});