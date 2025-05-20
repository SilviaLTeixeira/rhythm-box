import {Injectable} from '@nestjs/common';
import { TypeOrmTracksRepository } from '../../infrastructure/persistence/typeorm-tracks.repository';


@Injectable()
export class FindOneTrackUseCase {
  constructor(
    private readonly repository: TypeOrmTracksRepository,
  ) {}

  execute(id: number) {
    return this.repository.findOne(id);
  }
}