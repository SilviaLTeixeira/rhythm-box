import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Users } from '../../domain/entities/users.entity';
import { CreateUserDto } from '../../interfaces/dtos/create-user.dto';
import { UpdateUserDto } from '../../interfaces/dtos/update-user.dto';

@Injectable()
export class TypeOrmUsersRepository {
  constructor(
    @InjectRepository(Users)
    private readonly repo: Repository<Users>,
  ) {}

  async create(dto: CreateUserDto) {
    const user = this.repo.create(dto);
    const saved = await this.repo.save(user);
    return saved;
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const user = await this.repo.findOneBy({ id });
    if (!user) throw new NotFoundException(`Usuario ${id} não encontrado`);
    return user;
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.findOne(id);
    const merged = this.repo.merge(user, dto);
    return this.repo.save(merged);
  }

  async delete(id: number) {
    const { affected } = await this.repo.delete(id);
    if (!affected)
      throw new NotFoundException(`Usuario${id} não encontrado`);
  }
}
