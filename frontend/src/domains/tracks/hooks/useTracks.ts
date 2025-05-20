import { useState, useEffect, useCallback } from 'react';
import {
  getAllTracks,
  createTrack,
  updateTrack,
  deleteTrack as apiDeleteTrack
} from '../services/trackService';
import type { Track } from '../types/Track';

export function useTracks() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllTracks();
      setTracks(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const remove = useCallback(async (id: number) => {
    setLoading(true);
    try {
      await apiDeleteTrack(id);
      await fetch();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetch]);

  return {
    tracks,
    loading,
    error,
    fetch,
    createTrack,
    updateTrack,
    deleteTrack: remove, 
    };
}
