import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Playlist } from '../../domain/entities/playlist.entity';
import { CreatePlaylistDto } from '../../interfaces/dtos/create-playlist.dto';
import { UpdatePlaylistDto } from '../../interfaces/dtos/update-playlist.dto';
import { Users } from '../../../users/domain/entities/users.entity';
import { Tracks } from '../../../tracks/domain/entities/tracks.entity';

@Injectable()
export class TypeOrmPlaylistRepository {
  constructor(
    @InjectRepository(Playlist)
    private readonly repo: Repository<Playlist>,

    @InjectRepository(Users)
    private readonly userRepo: Repository<Users>,

    @InjectRepository(Tracks)
    private readonly trackRepo: Repository<Tracks>,
  ) {}

  async create(dto: CreatePlaylistDto) {
    const user = await this.userRepo.findOneBy({ id: dto.createdById });
    if (!user) throw new NotFoundException(`Usuário ${dto.createdById} não encontrado`);

    const tracks = await this.trackRepo.findBy({ id: In(dto.trackIds) });
    if (tracks.length !== dto.trackIds.length) {
      throw new NotFoundException('Uma ou mais tracks não foram encontradas');
    }

    const playlist = this.repo.create({
      name: dto.name,
      createdBy: user,
      tracks: tracks,
    });

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



  async update(id: number, dto: UpdatePlaylistDto): Promise<Playlist> {

    const playlist = await this.findOne(id);

    if (dto.createdById !== undefined) {
      const user = await this.userRepo.findOneBy({ id: dto.createdById });
      if (!user) throw new NotFoundException(`Usuário ${dto.createdById} não encontrado`);
      playlist.createdBy = user;
    }

  
    if (dto.trackIds !== undefined) {
      const tracks = await this.trackRepo.findBy({ id: In(dto.trackIds) });
      if (tracks.length !== dto.trackIds.length) {
        throw new NotFoundException('Uma ou mais tracks não foram encontradas');
      }
      playlist.tracks = tracks;
    }

    this.repo.merge(playlist, dto);

  
    await this.repo.save(playlist);

  
    return this.findOne(id);
  }



  async delete(id: number) {
    const { affected } = await this.repo.delete(id);
    if (!affected)
      throw new NotFoundException(`Playlist ${id} não encontrada`);
  }
}
