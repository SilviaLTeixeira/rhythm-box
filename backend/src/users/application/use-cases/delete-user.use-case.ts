import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmUsersRepository } from '../../infrastructure/persistence/typeorm-users.repository';


@Injectable()
export class DeleteUserUseCase {
  constructor(
    private readonly repository: TypeOrmUsersRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const playlist = await this.repository.findOne(id);
    if (!playlist) {
      throw new NotFoundException(`User com ID ${id} não encontrada.`);
    }
    await this.repository.delete(id);
  }
}