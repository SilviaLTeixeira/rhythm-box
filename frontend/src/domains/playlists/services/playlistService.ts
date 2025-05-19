import { api } from '@/services/api';
import type { Playlist } from '../types/Playlist';
import type { CreatePlaylistDto } from '../types/CreatePlaylistDto';

export async function getAllPlaylists(): Promise<Playlist[]> {
  const { data } = await api.get<Playlist[]>('/playlists');
  return data;
}

export async function createPlaylist(dto: CreatePlaylistDto): Promise<Playlist> {
  const { data } = await api.post<Playlist>('/playlists', dto);
  return data;
}

export async function updatePlaylist(id: number, dto: CreatePlaylistDto): Promise<Playlist> {
  const { data } = await api.put<Playlist>(`/playlists/${id}`, dto);
  return data;
}

export async function deletePlaylist(id: number): Promise<void> {
  await api.delete(`/playlists/${id}`);
}