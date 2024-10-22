import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react';
import App from './App';

test('renders home page correctly', () => {
  act(() => {
    render(<App />);
  });
  const homeElement = screen.getByText((content) => content.includes('Inicio'));
  expect(homeElement).toBeInTheDocument();
});
