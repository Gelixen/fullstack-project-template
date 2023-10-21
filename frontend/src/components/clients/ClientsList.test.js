import {render, screen} from '@testing-library/react';
import ClientsList from "./ClientsList";

test('renders learn react link', () => {
  render(<ClientsList/>);
  const linkElement = screen.getByText(/Clients/i);
  expect(linkElement).toBeInTheDocument();
});
