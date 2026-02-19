import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Percentages Quiz title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Percentages Quiz/i);
  expect(titleElement).toBeInTheDocument();
});
