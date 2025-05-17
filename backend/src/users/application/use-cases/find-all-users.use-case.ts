import { Injectable } from '@nestjs/common';
import { Users } from '../../domain/entities/users.entity';
import { TypeOrmUsersRepository } from '../../infrastructure/persistence/typeorm-users.repository';


@Injectable()
export class FindAllUsersUseCase {
  constructor(
    private readonly repository: TypeOrmUsersRepository,
  ) {}

  async execute(): Promise<Users[]> {
    return this.repository.findAll();
  }
}