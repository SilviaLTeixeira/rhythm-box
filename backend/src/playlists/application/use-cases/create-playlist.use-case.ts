import { Injectable } from '@nestjs/common'; 
import { CreatePlaylistDto } from '../../interfaces/dtos/create-playlist.dto';
import { Playlist } from '../../domain/entities/playlist.entity';
import { TypeOrmPlaylistRepository } from '../../infrastructure/persistence/typeorm-playlist.repository';


@Injectable()
export class CreatePlaylistUseCase {
  constructor(
    private readonly repository: TypeOrmPlaylistRepository,
  ) {}

  async execute(dto: CreatePlaylistDto): Promise<Playlist> {
    return this.repository.create(dto);
  }
}

