import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { UserListPage } from './UserListPage';

vi.mock('@/domains/users/hooks/useUsers', () => ({
  useUsers: () => ({
    users: [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ],
    loading: false,
    error: null,
    refresh: vi.fn(),
  }),
}));

describe('UserListPage', () => {
  it('deve mostrar a tabela com os usuários', () => {
    render(<UserListPage />);
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });
});



