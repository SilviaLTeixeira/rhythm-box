import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@/domains/playlists/services/playlistService', () => ({
  getAllPlaylists: () => Promise.resolve([
    { id: 10, name: 'Minha Playlist', tracks: [], createdById: 1 }
  ]),
  deletePlaylist: vi.fn()
}))

import { PlaylistsListPage } from '../../pages/playlist/PlaylistsListPage'

describe('PlaylistListPage', () => {
  it('mostra lista de playlists', async () => {
    render(
      <MemoryRouter>
        <PlaylistsListPage />
      </MemoryRouter>
    )

    expect(screen.getByText('Playlists')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('Minha Playlist')).toBeInTheDocument()
    })
  })
})

