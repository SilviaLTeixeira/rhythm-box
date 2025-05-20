import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Playlist } from './domain/entities/playlist.entity';
import { TypeOrmPlaylistRepository } from './infrastructure/persistence/typeorm-playlist.repository';

import { CreatePlaylistUseCase } from './application/use-cases/create-playlist.use-case';
import { FindAllPlaylistsUseCase } from './application/use-cases/find-all-playlists.use-case';
import { FindOnePlaylistUseCase } from './application/use-cases/find-one-playlist.use-case';
import { UpdatePlaylistUseCase } from './application/use-cases/update-playlist.use-case';
import { DeletePlaylistUseCase } from './application/use-cases/delete-playlist.use-case';

import { PlaylistsController } from './interfaces/controllers/playlists.controller';
import { Users } from '../users/domain/entities/users.entity';
import { Tracks } from '../tracks/domain/entities/tracks.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Playlist, Users, Tracks]),
  ],
  controllers: [PlaylistsController],
  providers: [
    TypeOrmPlaylistRepository, 
    CreatePlaylistUseCase,
    FindAllPlaylistsUseCase,
    FindOnePlaylistUseCase,
    UpdatePlaylistUseCase,
    DeletePlaylistUseCase,
  ],
})
export class PlaylistsModule {}




