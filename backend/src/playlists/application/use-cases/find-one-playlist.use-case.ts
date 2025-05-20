import {Injectable} from '@nestjs/common';
import { TypeOrmPlaylistRepository } from '../../infrastructure/persistence/typeorm-playlist.repository';


@Injectable()
export class FindOnePlaylistUseCase {
  constructor(
    private readonly repository: TypeOrmPlaylistRepository,
  ) {}

  execute(id: number) {
    return this.repository.findOne(id);
  }
}
