// frontend/src/pages/home/HomePage.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {HomePage} from './HomePage';

describe('HomePage', () => {
  it('deve exibir o título', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <HomePage />
      </MemoryRouter>
    );


    expect(
    screen.getByRole('heading', { level: 3, name: /rhythm box/i })
    ).toBeInTheDocument();
  });
});


