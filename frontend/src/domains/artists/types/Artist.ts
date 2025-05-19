export interface TopLyric {
  id: string;
  desc: string;
  url: string;
}

export interface ArtistProfile {
  artist: ArtistProfile | PromiseLike<ArtistProfile>;
  id: string;               
  desc: string;               
  url: string;                 
  pic_small: string;          
  pic_medium: string;                           
  genre: {                     
    name: string;
    url: string;
  }[];
  toplyrics: {                 
    item: TopLyric[];
  };
}
