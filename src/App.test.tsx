import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Please, enter a past date in unix timestamp format/i);
  expect(linkElement).toBeInTheDocument();
});
