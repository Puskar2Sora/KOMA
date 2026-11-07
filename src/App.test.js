import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock("./components/map/MapView", () => () => null);

test('renders the KOMA application', () => {
  render(<App />);
  expect(screen.getAllByText("KOMA").length).toBeGreaterThan(0);
});
