export interface CreatePlaylistDto {
  name: string;
  trackIds: number[];
  createdById: number;
}