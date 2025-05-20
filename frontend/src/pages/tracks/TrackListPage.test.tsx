import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {TracksListPage} from '../../pages/tracks/TrackListPage';

vi.mock('@/domains/tracks/services/trackService', () => {
  return {
    getAllTracks: vi.fn(async () => [
      { id: 1, name: 'Track A', album: 'Album A', artistId: 10 },
      { id: 2, name: 'Track B', album: 'Album B', artistId: 11 },
    ]),
   
    createTrack: vi.fn(async (dto) => ({ id: 99, ...dto })),
    
    updateTrack: vi.fn(async (id, dto) => ({ id, ...dto })),
    
    deleteTrack: vi.fn(async (_id) => {}),
  };
});

describe('TrackListPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('exibe lista de tracks vindas do serviço', async () => {
    render(
      <MemoryRouter>
        <TracksListPage />
      </MemoryRouter>
    );

    expect(await screen.findByText('Track A')).toBeInTheDocument();
    expect(screen.getByText('Track B')).toBeInTheDocument();
  });

  it('habilita botões de editar e excluir para cada linha', async () => {
    render(
      <MemoryRouter>
        <TracksListPage />
      </MemoryRouter>
    );

 
    await screen.findByText('Track A');

    const editButtons = screen.getAllByRole('button', { name: /Editar/i });
    const deleteButtons = screen.getAllByRole('button', { name: /Excluir/i });
    expect(editButtons.length).toBe(2);
    expect(deleteButtons.length).toBe(2);
  });
});
