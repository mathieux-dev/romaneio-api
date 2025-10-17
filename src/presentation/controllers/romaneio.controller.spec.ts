import { Test, TestingModule } from '@nestjs/testing';
import { RomaneioController } from './romaneio.controller';
import { CriarRomaneioUseCase } from '../../core/use-cases/romaneio/criar-romaneio.use-case';
import { ListarRomaneiosUseCase } from '../../core/use-cases/romaneio/listar-romaneios.use-case';
import { BuscarRomaneioUseCase } from '../../core/use-cases/romaneio/buscar-romaneio.use-case';
import { AtualizarStatusRomaneioUseCase } from '../../core/use-cases/romaneio/atualizar-status-romaneio.use-case';
import { DeletarRomaneioUseCase } from '../../core/use-cases/romaneio/deletar-romaneio.use-case';
import { Romaneio, RomaneioStatus } from '../../core/domain/entities/romaneio.entity';
import { CriarRomaneioDto } from '../dto/romaneio/criar-romaneio.dto';
import { AtualizarStatusRomaneioDto } from '../dto/romaneio/atualizar-status-romaneio.dto';

describe('RomaneioController', () => {
  let controller: RomaneioController;
  let criarRomaneioUseCase: jest.Mocked<CriarRomaneioUseCase>;
  let listarRomaneiosUseCase: jest.Mocked<ListarRomaneiosUseCase>;
  let buscarRomaneioUseCase: jest.Mocked<BuscarRomaneioUseCase>;
  let atualizarStatusRomaneioUseCase: jest.Mocked<AtualizarStatusRomaneioUseCase>;
  let deletarRomaneioUseCase: jest.Mocked<DeletarRomaneioUseCase>;

  const mockRomaneio: Romaneio = {
    id: 1,
    numeroRomaneio: 'ROM-2025-001',
    dataEmissao: new Date('2025-10-16'),
    motoristaId: 1,
    veiculo: 'ABC-1234',
    status: RomaneioStatus.ABERTO,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const mockCriarRomaneioUseCase = {
      execute: jest.fn(),
    };

    const mockListarRomaneiosUseCase = {
      execute: jest.fn(),
    };

    const mockBuscarRomaneioUseCase = {
      execute: jest.fn(),
    };

    const mockAtualizarStatusRomaneioUseCase = {
      execute: jest.fn(),
    };

    const mockDeletarRomaneioUseCase = {
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RomaneioController],
      providers: [
        {
          provide: CriarRomaneioUseCase,
          useValue: mockCriarRomaneioUseCase,
        },
        {
          provide: ListarRomaneiosUseCase,
          useValue: mockListarRomaneiosUseCase,
        },
        {
          provide: BuscarRomaneioUseCase,
          useValue: mockBuscarRomaneioUseCase,
        },
        {
          provide: AtualizarStatusRomaneioUseCase,
          useValue: mockAtualizarStatusRomaneioUseCase,
        },
        {
          provide: DeletarRomaneioUseCase,
          useValue: mockDeletarRomaneioUseCase,
        },
      ],
    }).compile();

    controller = module.get<RomaneioController>(RomaneioController);
    criarRomaneioUseCase = module.get(CriarRomaneioUseCase);
    listarRomaneiosUseCase = module.get(ListarRomaneiosUseCase);
    buscarRomaneioUseCase = module.get(BuscarRomaneioUseCase);
    atualizarStatusRomaneioUseCase = module.get(AtualizarStatusRomaneioUseCase);
    deletarRomaneioUseCase = module.get(DeletarRomaneioUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('criar', () => {
    it('should create a romaneio successfully', async () => {
      const dto: CriarRomaneioDto = {
        numeroRomaneio: 'ROM-2025-001',
        dataEmissao: '2025-10-16',
        motoristaId: 1,
        veiculo: 'ABC-1234',
      };

      criarRomaneioUseCase.execute.mockResolvedValue(mockRomaneio);

      const result = await controller.criar(dto);

      expect(criarRomaneioUseCase.execute).toHaveBeenCalledWith({
        numeroRomaneio: dto.numeroRomaneio,
        dataEmissao: new Date(dto.dataEmissao),
        motoristaId: dto.motoristaId,
        veiculo: dto.veiculo,
      });
      expect(result).toEqual(expect.objectContaining({
        id: mockRomaneio.id,
        numeroRomaneio: mockRomaneio.numeroRomaneio,
        status: mockRomaneio.status,
      }));
    });
  });

  describe('listar', () => {
    it('should return a list of romaneios', async () => {
      const mockRomaneios = [mockRomaneio];
      listarRomaneiosUseCase.execute.mockResolvedValue(mockRomaneios);

      const result = await controller.listar();

      expect(listarRomaneiosUseCase.execute).toHaveBeenCalled();
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(expect.objectContaining({
        id: mockRomaneio.id,
        numeroRomaneio: mockRomaneio.numeroRomaneio,
      }));
    });

    it('should return an empty list when no romaneios exist', async () => {
      listarRomaneiosUseCase.execute.mockResolvedValue([]);

      const result = await controller.listar();

      expect(listarRomaneiosUseCase.execute).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('buscarPorId', () => {
    it('should return a romaneio by id', async () => {
      buscarRomaneioUseCase.execute.mockResolvedValue(mockRomaneio);

      const result = await controller.buscarPorId(1);

      expect(buscarRomaneioUseCase.execute).toHaveBeenCalledWith(1);
      expect(result).toEqual(expect.objectContaining({
        id: mockRomaneio.id,
        numeroRomaneio: mockRomaneio.numeroRomaneio,
      }));
    });
  });

  describe('atualizarStatus', () => {
    it('should update romaneio status successfully', async () => {
      const dto: AtualizarStatusRomaneioDto = {
        status: RomaneioStatus.EM_TRANSITO,
      };

      const updatedRomaneio = {
        ...mockRomaneio,
        status: RomaneioStatus.EM_TRANSITO,
      };

      atualizarStatusRomaneioUseCase.execute.mockResolvedValue(updatedRomaneio);

      const result = await controller.atualizarStatus(1, dto);

      expect(atualizarStatusRomaneioUseCase.execute).toHaveBeenCalledWith(1, dto.status);
      expect(result.status).toBe(RomaneioStatus.EM_TRANSITO);
    });
  });

  describe('deletar', () => {
    it('should delete a romaneio successfully', async () => {
      deletarRomaneioUseCase.execute.mockResolvedValue(undefined);

      await controller.deletar(1);

      expect(deletarRomaneioUseCase.execute).toHaveBeenCalledWith(1);
    });
  });
});
