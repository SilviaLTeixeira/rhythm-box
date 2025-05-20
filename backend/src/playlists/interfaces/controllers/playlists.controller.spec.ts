import { Test, TestingModule } from '@nestjs/testing';
import { PlaylistsController } from './playlists.controller';

import { CreatePlaylistUseCase } from '../../application/use-cases/create-playlist.use-case';
import { FindAllPlaylistsUseCase } from '../../application/use-cases/find-all-playlists.use-case';
import { FindOnePlaylistUseCase } from '../../application/use-cases/find-one-playlist.use-case';
import { UpdatePlaylistUseCase } from '../../application/use-cases/update-playlist.use-case';
import { DeletePlaylistUseCase } from '../../application/use-cases/delete-playlist.use-case';

describe('PlaylistsController', () => {
  let controller: PlaylistsController;

  const createMock = { execute: jest.fn() };
  const findAllMock = { execute: jest.fn() };
  const findOneMock = { execute: jest.fn() };
  const updateMock = { execute: jest.fn() };
  const deleteMock = { execute: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaylistsController],
      providers: [
        { provide: CreatePlaylistUseCase, useValue: createMock },
        { provide: FindAllPlaylistsUseCase, useValue: findAllMock },
        { provide: FindOnePlaylistUseCase, useValue: findOneMock },
        { provide: UpdatePlaylistUseCase, useValue: updateMock },
        { provide: DeletePlaylistUseCase, useValue: deleteMock },
      ],
    }).compile();

    controller = module.get<PlaylistsController>(PlaylistsController);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('deve repassar o DTO para o use‑case e retornar seu resultado', async () => {
      const dto = { name: 'Chill', description: 'Relax' };
      const expected = { id: 1, ...dto };
      createMock.execute.mockResolvedValue(expected);

      const result = await controller.create(dto as any);

      expect(createMock.execute).toHaveBeenCalledTimes(1);
      expect(createMock.execute).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expected);
    });
  });

  describe('findAll', () => {
    it('deve chamar o use‑case e retornar a lista', async () => {
      const expected = [{ id: 1, name: 'Chill' }];
      findAllMock.execute.mockResolvedValue(expected);

      const result = await controller.findAll();

      expect(findAllMock.execute).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expected);
    });
  });

  describe('findOne', () => {
    it('deve converter id para número, chamar o use‑case e retornar o item', async () => {
      const expected = { id: 1, name: 'Chill' };
      findOneMock.execute.mockResolvedValue(expected);

      const result = await controller.findOne('1' as any);

      expect(findOneMock.execute).toHaveBeenCalledWith(1);
      expect(result).toEqual(expected);
    });
  });

  describe('update', () => {
    it('deve passar id numérico e DTO para o use‑case', async () => {
      const dto = { name: 'Focus' };
      const expected = { id: 2, ...dto };
      updateMock.execute.mockResolvedValue(expected);

      const result = await controller.update('2' as any, dto as any);

      expect(updateMock.execute).toHaveBeenCalledWith(2, dto);
      expect(result).toEqual(expected);
    });
  });

  describe('remove', () => {
    it('deve passar id numérico para o use‑case', async () => {
      const expected = { deleted: true };
      deleteMock.execute.mockResolvedValue(expected);

      const result = await controller.remove('3' as any);

      expect(deleteMock.execute).toHaveBeenCalledWith(3);
      expect(result).toEqual(expected);
    });
  });
});