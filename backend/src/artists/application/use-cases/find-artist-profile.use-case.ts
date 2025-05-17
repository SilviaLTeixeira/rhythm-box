import { Injectable } from '@nestjs/common';
import { VagalumeArtistService } from '../../infrastructure/services/vagalume-artist.service';
import { ArtistProfileResponseDto } from '../../interfaces/dtos/artist-profile-response.dto';

@Injectable()
export class FindArtistProfileUseCase {
  constructor(private readonly vagalume: VagalumeArtistService) {}

  async execute(slug: string): Promise<ArtistProfileResponseDto> {
    return this.vagalume.getArtistProfile(slug);
  }
}
