import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmTracksRepository } from '../../infrastructure/persistence/typeorm-tracks.repository';


@Injectable()
export class DeleteTrackUseCase {
  constructor(
    private readonly repository: TypeOrmTracksRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const playlist = await this.repository.findOne(id);
    if (!playlist) {
      throw new NotFoundException(`Track com ID ${id} não encontrada.`);
    }
    await this.repository.delete(id);
  }
}