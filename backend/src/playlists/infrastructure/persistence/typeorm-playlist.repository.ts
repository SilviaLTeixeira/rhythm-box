import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Playlist } from '../../domain/entities/playlist.entity';
import { CreatePlaylistDto } from '../../interfaces/dtos/create-playlist.dto';
import { UpdatePlaylistDto } from '../../interfaces/dtos/update-playlist.dto';

@Injectable()
export class TypeOrmPlaylistRepository {
  constructor(
    @InjectRepository(Playlist)
    private readonly repo: Repository<Playlist>,
  ) {}

  async create(dto: CreatePlaylistDto) {
    const playlist = this.repo.create(dto);
    return this.repo.save(playlist);
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const playlist = await this.repo.findOneBy({ id });
    if (!playlist) throw new NotFoundException(`Playlist ${id} não encontrada`);
    return playlist;
  }

  async update(id: number, dto: UpdatePlaylistDto) {
    const playlist = await this.findOne(id);
    const merged = this.repo.merge(playlist, dto);
    return this.repo.save(merged);
  }

  async delete(id: number) {
    const { affected } = await this.repo.delete(id);
    if (!affected)
      throw new NotFoundException(`Playlist ${id} não encontrada`);
  }
}
