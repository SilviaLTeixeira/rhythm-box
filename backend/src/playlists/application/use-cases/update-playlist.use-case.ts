import { Injectable } from '@nestjs/common';
import { UpdatePlaylistDto } from '../../interfaces/dtos/update-playlist.dto';
import { TypeOrmPlaylistRepository } from '../../infrastructure/persistence/typeorm-playlist.repository';


@Injectable()
export class UpdatePlaylistUseCase {
  constructor(
    private readonly repository: TypeOrmPlaylistRepository,
  ) {}

  async execute(id: number, dto: UpdatePlaylistDto) {
    return this.repository.update(id, dto);
  }
}