import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmPlaylistRepository } from '../../infrastructure/persistence/typeorm-playlist.repository';


@Injectable()
export class DeletePlaylistUseCase {
  constructor(
    private readonly repository: TypeOrmPlaylistRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const playlist = await this.repository.findOne(id);
    if (!playlist) {
      throw new NotFoundException(`Playlist com ID ${id} não encontrada.`);
    }
    await this.repository.delete(id);
  }
}