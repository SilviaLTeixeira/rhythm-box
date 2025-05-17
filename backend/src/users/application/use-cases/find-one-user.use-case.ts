import {Injectable} from '@nestjs/common';
import { TypeOrmUsersRepository } from '../../infrastructure/persistence/typeorm-users.repository';


@Injectable()
export class FindOneUserUseCase {
  constructor(
    private readonly repository: TypeOrmUsersRepository,
  ) {}

  execute(id: number) {
    return this.repository.findOne(id);
  }
}