import { Injectable } from '@nestjs/common';
import { Playlist } from '../../domain/entities/playlist.entity';
import { TypeOrmPlaylistRepository } from '../../infrastructure/persistence/typeorm-playlist.repository';


@Injectable()
export class FindAllPlaylistsUseCase {
  constructor(
    private readonly repository: TypeOrmPlaylistRepository,
  ) {}

  async execute(): Promise<Playlist[]> {
    return this.repository.findAll();
  }
}