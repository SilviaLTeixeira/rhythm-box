import { Test, TestingModule } from '@nestjs/testing';
import { TracksController } from './tracks.controller';

import { CreateTrackUseCase } from '../../application/use-cases/create-track.use-case';
import { FindAllTracksUseCase } from '../../application/use-cases/find-all-tracks.use-case';
import { FindOneTrackUseCase } from '../../application/use-cases/find-one-track.use-case';
import { UpdateTrackUseCase } from '../../application/use-cases/update-track.use-case';
import { DeleteTrackUseCase } from '../../application/use-cases/delete-track.use-case';

describe('TracksController', () => {
  let controller: TracksController;

  const createTrackUseCase = { execute: jest.fn() };
  const findAllTracksUseCase = { execute: jest.fn() };
  const findOneTrackUseCase = { execute: jest.fn() };
  const updateTrackUseCase = { execute: jest.fn() };
  const deleteTrackUseCase = { execute: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TracksController],
      providers: [
        { provide: CreateTrackUseCase, useValue: createTrackUseCase },
        { provide: FindAllTracksUseCase, useValue: findAllTracksUseCase },
        { provide: FindOneTrackUseCase, useValue: findOneTrackUseCase },
        { provide: UpdateTrackUseCase, useValue: updateTrackUseCase },
        { provide: DeleteTrackUseCase, useValue: deleteTrackUseCase },
      ],
    }).compile();

    controller = module.get<TracksController>(TracksController);
  });

  it('should call findAllTracksUseCase.execute', () => {
    controller.findAll();
    expect(findAllTracksUseCase.execute).toHaveBeenCalled();
  });

  it('should call findOneTrackUseCase.execute with correct id', () => {
    controller.findOne(1);
    expect(findOneTrackUseCase.execute).toHaveBeenCalledWith(1);
  });


  it('should call deleteTrackUseCase.execute with correct id', () => {
    controller.remove(1);
    expect(deleteTrackUseCase.execute).toHaveBeenCalledWith(1);
  });
});
