import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tracks } from '../../domain/entities/tracks.entity';
import { CreateTrackDto } from '../../interfaces/dtos/create-track.dto';
import { UpdateTrackDto } from '../../interfaces/dtos/update-track.dto';

@Injectable()
export class TypeOrmTracksRepository {
  constructor(
    @InjectRepository(Tracks)
    private readonly repo: Repository<Tracks>,
  ) {}

  async create(dto: CreateTrackDto) {
    const user = this.repo.create(dto);
    return this.repo.save(user);
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const user = await this.repo.findOneBy({ id });
    if (!user) throw new NotFoundException(`Track ${id} não encontrada`);
    return user;
  }

  async update(id: number, dto: UpdateTrackDto) {
    const user = await this.findOne(id);
    const merged = this.repo.merge(user, dto);
    return this.repo.save(merged);
  }

  async delete(id: number) {
    const { affected } = await this.repo.delete(id);
    if (!affected)
      throw new NotFoundException(`Track ${id} não encontrada`);
  } 
}