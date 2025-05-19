import { useState, useEffect, useCallback } from 'react';
import {
  getAllPlaylists,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
} from '../services/playlistService';
import { type Playlist } from '../types/Playlist';
import type { CreatePlaylistDto } from '../types/CreatePlaylistDto';

export function usePlaylists() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllPlaylists();
      setPlaylists(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (dto: CreatePlaylistDto) => {
    setLoading(true);
    try {
      const newP = await createPlaylist(dto);
      setPlaylists(prev => [...prev, newP]);
      return newP;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (id: number, dto: CreatePlaylistDto) => {
    setLoading(true);
    try {
      const upd = await updatePlaylist(id, dto);
      setPlaylists(prev => prev.map(p => p.id === id ? upd : p));
      return upd;
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(async (id: number) => {
    setLoading(true);
    try {
      await deletePlaylist(id);
      setPlaylists(prev => prev.filter(p => p.id !== id));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  return { playlists, loading, error, fetch, create, update, remove };
}