import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../../interfaces/dtos/update-user.dto';
import { TypeOrmUsersRepository } from '../../infrastructure/persistence/typeorm-users.repository';


@Injectable()
export class UpdateUserUseCase {
  constructor(
    private readonly repository: TypeOrmUsersRepository,
  ) {}

  async execute(id: number, dto: UpdateUserDto) {
    return this.repository.update(id, dto);
  }
}