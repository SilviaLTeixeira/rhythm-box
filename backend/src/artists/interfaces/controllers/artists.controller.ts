import { Controller, Get, Param } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly httpService: HttpService) {}

  @Get(':slug')
  async getArtistProfile(@Param('slug') slug: string) {
    const url = `https://www.vagalume.com.br/${slug}/index.js`;
    const response = await firstValueFrom(this.httpService.get(url));
    const data = response.data;

    return {
      name: data.artist.desc,
      image: data.artist.pic_medium,
      topSongs: data.artist.toplyrics?.item?.slice(0, 5).map((song: any) => ({
        id: song.id,
        title: song.desc,
        url: `https://www.vagalume.com.br${song.url}`,
      })) || [],
    };
  }
}


