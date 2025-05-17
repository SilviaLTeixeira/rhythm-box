import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Tracks } from './domain/entities/tracks.entity';
import { TypeOrmTracksRepository } from './infrastructure/persistence/typeorm-tracks.repository';

import { CreateTrackUseCase } from './application/use-cases/create-track.use-case';
import { FindAllTracksUseCase } from './application/use-cases/find-all-tracks.use-case';
import { FindOneTrackUseCase } from './application/use-cases/find-one-track.use-case';
import { UpdateTrackUseCase } from './application/use-cases/update-track.use-case';
import { DeleteTrackUseCase } from './application/use-cases/delete-track.use-case';

import { TracksController } from './interfaces/controllers/tracks.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tracks]),
  ],
  controllers: [TracksController],
  providers: [
    TypeOrmTracksRepository, 
    CreateTrackUseCase,
    FindAllTracksUseCase,
    FindOneTrackUseCase,
    UpdateTrackUseCase,
    DeleteTrackUseCase,
  ],
})
export class TracksModule {}