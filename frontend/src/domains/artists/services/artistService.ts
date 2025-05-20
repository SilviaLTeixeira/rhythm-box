import axios from 'axios';
import type { ArtistProfile } from '../types/Artist';

const VAGALUME_BASE = 'https://www.vagalume.com.br';

export async function getArtistProfile(slug: string): Promise<ArtistProfile> {
  const res = await axios.get<ArtistProfile>(`${VAGALUME_BASE}/${slug}/index.js`);
  return res.data.artist;
}
