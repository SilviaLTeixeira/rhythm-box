import { Injectable } from '@nestjs/common';
import { Tracks } from '../../domain/entities/tracks.entity';
import { TypeOrmTracksRepository } from '../../infrastructure/persistence/typeorm-tracks.repository';


@Injectable()
export class FindAllTracksUseCase {
  constructor(
    private readonly repository: TypeOrmTracksRepository,
  ) {}

  async execute(): Promise<Tracks[]> {
    return this.repository.findAll();
  }
}