import { Injectable } from '@nestjs/common'; 
import { CreateUserDto } from '../../interfaces/dtos/create-user.dto';
import { Users } from '../../domain/entities/users.entity';
import { TypeOrmUsersRepository } from '../../infrastructure/persistence/typeorm-users.repository';


@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly repository: TypeOrmUsersRepository,
  ) {}

  async execute(dto: CreateUserDto): Promise<Users> {
    return this.repository.create(dto);
  }
}