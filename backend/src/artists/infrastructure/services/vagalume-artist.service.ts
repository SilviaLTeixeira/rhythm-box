import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { ArtistProfileResponseDto } from '../../interfaces/dtos/artist-profile-response.dto';

@Injectable()
export class VagalumeArtistService {
  async getArtistProfile(slug: string): Promise<ArtistProfileResponseDto> {
    try {
      const url = `https://www.vagalume.com.br/${slug}/index.js`;
      const { data } = await axios.get(url);

      if (!data.artist) throw new NotFoundException('Artista não encontrado');

      return {
        id: data.artist.id,
        name: data.artist.desc,
        picture: `https://www.vagalume.com.br${data.artist.pic_medium}`,
        ranking: {
          position: data.artist.rank?.pos,
          views: data.artist.rank?.views,
          uniques: data.artist.rank?.uniques,
          points: data.artist.rank?.points,
        },
        genres: data.artist.genre?.map((g) => g.name) || [],
      };
    } catch (error) {
      throw new NotFoundException('Erro ao buscar artista no Vagalume');
    }
  }
}
