import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ArtistsController } from './interfaces/controllers/artists.controller';
import { FindArtistProfileUseCase } from './application/use-cases/find-artist-profile.use-case';
import { VagalumeArtistService } from './infrastructure/services/vagalume-artist.service';

@Module({
  imports: [HttpModule],
  controllers: [ArtistsController],
  providers: [VagalumeArtistService, FindArtistProfileUseCase],
})
export class ArtistsModule {}
