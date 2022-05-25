import React from 'react';
import { render } from '@testing-library/react';
import App from '../components/App.jsx'

import RelatedProducts from '../components/RelatedItems/Main.jsx';

describe('RelatedProducts', () => {
  test('renders RelatedProducts component', () => {
    render(<RelatedProducts />);
  });
});