import { useEffect, useState } from 'react';
import { getArtistProfile } from '../services/artistService';
import { type ArtistProfile } from '../types/Artist';

export function useArtist(slug: string) {
  const [artist, setArtist] = useState<ArtistProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getArtistProfile(slug)
      .then((data) => setArtist(data))
      .catch((err) => setError(err.message || 'Erro ao buscar artista'))
      .finally(() => setLoading(false));
  }, [slug]);

  return { artist, loading, error };
}
