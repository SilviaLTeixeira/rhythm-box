import { Injectable } from '@nestjs/common'; 
import { CreateTrackDto } from '../../interfaces/dtos/create-track.dto';
import { Tracks } from '../../domain/entities/tracks.entity';
import { TypeOrmTracksRepository } from '../../infrastructure/persistence/typeorm-tracks.repository';


@Injectable()
export class CreateTrackUseCase {
  constructor(
    private readonly repository: TypeOrmTracksRepository,
  ) {}

  async execute(dto: CreateTrackDto): Promise<Tracks> {
    return this.repository.create(dto);
  }
}