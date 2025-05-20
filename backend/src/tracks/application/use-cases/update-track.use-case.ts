import { Injectable } from '@nestjs/common';
import { UpdateTrackDto } from '../../interfaces/dtos/update-track.dto';
import { TypeOrmTracksRepository } from '../../infrastructure/persistence/typeorm-tracks.repository';


@Injectable()
export class UpdateTrackUseCase {
  constructor(
    private readonly repository: TypeOrmTracksRepository,
  ) {}

  async execute(id: number, dto: UpdateTrackDto) {
    return this.repository.update(id, dto);
  }
}