import { render } from '@testing-library/react';

import ConfigurationPage from './configuration-page';

describe('ConfigurationPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ConfigurationPage />);
    expect(baseElement).toBeTruthy();
  });
});
