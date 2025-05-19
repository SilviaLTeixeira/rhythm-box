import { api } from '@/services/api';
import { type Track } from '../types/Track';

export async function getAllTracks(): Promise<Track[]> {
  const { data } = await api.get<Track[]>('/tracks');
  return data;
}
export async function getTrackById(id: number): Promise<Track> {
  const { data } = await api.get<Track>(`/tracks/${id}`);
  return data;
}
export async function createTrack(dto: Omit<Track, 'id'>): Promise<Track> {
  const { data } = await api.post<Track>('/tracks', dto);
  return data;
}
export async function updateTrack(id: number, dto: Partial<Omit<Track, 'id'>>): Promise<Track> {
  const { data } = await api.put<Track>(`/tracks/${id}`, dto);
  return data;
}
export async function deleteTrack(id: number): Promise<void> {
  await api.delete(`/tracks/${id}`);
}