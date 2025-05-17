import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';

import { CreateTrackDto } from '../dtos/create-track.dto';
import { UpdateTrackDto } from '../dtos/update-track.dto';

import { CreateTrackUseCase } from '../../application/use-cases/create-track.use-case';
import { FindAllTracksUseCase } from '../../application/use-cases/find-all-tracks.use-case';
import { FindOneTrackUseCase } from '../../application/use-cases/find-one-track.use-case';
import { UpdateTrackUseCase } from '../../application/use-cases/update-track.use-case';
import { DeleteTrackUseCase } from '../../application/use-cases/delete-track.use-case';

@Controller('tracks')
export class TracksController {
  constructor(
    private readonly createTrackUseCase: CreateTrackUseCase,
    private readonly findAllTracksUseCase: FindAllTracksUseCase,
    private readonly findOneTrackUseCase: FindOneTrackUseCase,
    private readonly updateTrackUseCase: UpdateTrackUseCase,
    private readonly deleteTrackUseCase: DeleteTrackUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateTrackDto) {
    return this.createTrackUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.findAllTracksUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.findOneTrackUseCase.execute(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateTrackDto) {
    return this.updateTrackUseCase.execute(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.deleteTrackUseCase.execute(+id);
  }
}