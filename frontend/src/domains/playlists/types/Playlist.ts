import type { Track } from "@/domains/tracks/types/Track";
import type { User } from "@/domains/users/types/User";

export interface Playlist {
  id: number;
  name: string;
  tracks: Track[]; 
  createdBy: User;
  createdAt: string;
}