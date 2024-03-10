import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Movie App text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Movie App/i);
  expect(linkElement).toBeInTheDocument();
});
