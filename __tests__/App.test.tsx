// __tests__/App.test.tsx
import React from 'react';
import renderer, {act} from 'react-test-renderer';
import App from '../App';

it('renders correctly', () => {
  act(() => {
    renderer.create(<App />);
  });
});
