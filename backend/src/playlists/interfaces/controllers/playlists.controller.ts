import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';

import { CreatePlaylistDto } from '../dtos/create-playlist.dto';
import { UpdatePlaylistDto } from '../dtos/update-playlist.dto';

import { CreatePlaylistUseCase } from '../../application/use-cases/create-playlist.use-case';
import { FindAllPlaylistsUseCase } from '../../application/use-cases/find-all-playlists.use-case';
import { FindOnePlaylistUseCase } from '../../application/use-cases/find-one-playlist.use-case';
import { UpdatePlaylistUseCase } from '../../application/use-cases/update-playlist.use-case';
import { DeletePlaylistUseCase } from '../../application/use-cases/delete-playlist.use-case';

@Controller('playlists')
export class PlaylistsController {
  constructor(
    private readonly createPlaylistUseCase: CreatePlaylistUseCase,
    private readonly findAllPlaylistsUseCase: FindAllPlaylistsUseCase,
    private readonly findOnePlaylistUseCase: FindOnePlaylistUseCase,
    private readonly updatePlaylistUseCase: UpdatePlaylistUseCase,
    private readonly deletePlaylistUseCase: DeletePlaylistUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreatePlaylistDto) {
    return this.createPlaylistUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.findAllPlaylistsUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.findOnePlaylistUseCase.execute(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdatePlaylistDto) {
    return this.updatePlaylistUseCase.execute(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.deletePlaylistUseCase.execute(+id);
  }
}



