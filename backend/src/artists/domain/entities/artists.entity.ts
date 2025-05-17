export class Artist {
  id: string;
  name: string;
  picture: string;
  ranking: {
    position: string;
    views: string;
    uniques: string;
    points: string;
  };
  genres: string[];
}
