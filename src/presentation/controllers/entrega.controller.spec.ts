import { Test, TestingModule } from '@nestjs/testing';
import { EntregaController } from './entrega.controller';
import { CriarEntregaUseCase } from '../../core/use-cases/entrega/criar-entrega.use-case';
import { ListarEntregasPorRomaneioUseCase } from '../../core/use-cases/entrega/listar-entregas-por-romaneio.use-case';
import { AtualizarStatusEntregaUseCase } from '../../core/use-cases/entrega/atualizar-status-entrega.use-case';
import { CriarEntregaDto } from '../dto/entrega/criar-entrega.dto';
import { AtualizarStatusEntregaDto } from '../dto/entrega/atualizar-status-entrega.dto';
import { EntregaStatus } from '../../core/domain/entities/entrega.entity';
import { NotFoundException } from '../../shared/exceptions';

describe('EntregaController', () => {
  let controller: EntregaController;
  let criarEntregaUseCase: jest.Mocked<CriarEntregaUseCase>;
  let listarEntregasPorRomaneioUseCase: jest.Mocked<ListarEntregasPorRomaneioUseCase>;
  let atualizarStatusEntregaUseCase: jest.Mocked<AtualizarStatusEntregaUseCase>;

  const mockEntrega = {
    id: 1,
    romaneioId: 1,
    cliente: 'Empresa XYZ Ltda',
    endereco: 'Rua das Flores, 123 - São Paulo/SP',
    valor: 150.50,
    status: EntregaStatus.PENDENTE,
    createdAt: new Date('2025-10-16T10:30:00.000Z'),
    updatedAt: new Date('2025-10-16T10:30:00.000Z'),
  };

  beforeEach(async () => {
    const mockCriarEntregaUseCase = {
      execute: jest.fn(),
    };

    const mockListarEntregasPorRomaneioUseCase = {
      execute: jest.fn(),
    };

    const mockAtualizarStatusEntregaUseCase = {
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntregaController],
      providers: [
        {
          provide: CriarEntregaUseCase,
          useValue: mockCriarEntregaUseCase,
        },
        {
          provide: ListarEntregasPorRomaneioUseCase,
          useValue: mockListarEntregasPorRomaneioUseCase,
        },
        {
          provide: AtualizarStatusEntregaUseCase,
          useValue: mockAtualizarStatusEntregaUseCase,
        },
      ],
    }).compile();

    controller = module.get<EntregaController>(EntregaController);
    criarEntregaUseCase = module.get(CriarEntregaUseCase);
    listarEntregasPorRomaneioUseCase = module.get(ListarEntregasPorRomaneioUseCase);
    atualizarStatusEntregaUseCase = module.get(AtualizarStatusEntregaUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('criar', () => {
    it('should create a new entrega', async () => {
      const dto: CriarEntregaDto = {
        romaneioId: 1,
        cliente: 'Empresa XYZ Ltda',
        endereco: 'Rua das Flores, 123 - São Paulo/SP',
        valor: 150.50,
      };

      criarEntregaUseCase.execute.mockResolvedValue(mockEntrega);

      const result = await controller.criar(dto);

      expect(criarEntregaUseCase.execute).toHaveBeenCalledWith({
        romaneioId: dto.romaneioId,
        cliente: dto.cliente,
        endereco: dto.endereco,
        valor: dto.valor,
      });
      expect(result).toEqual({
        id: mockEntrega.id,
        romaneioId: mockEntrega.romaneioId,
        cliente: mockEntrega.cliente,
        endereco: mockEntrega.endereco,
        valor: mockEntrega.valor,
        status: mockEntrega.status,
        createdAt: mockEntrega.createdAt,
        updatedAt: mockEntrega.updatedAt,
      });
    });

    it('should throw NotFoundException when romaneio does not exist', async () => {
      const dto: CriarEntregaDto = {
        romaneioId: 999,
        cliente: 'Empresa XYZ Ltda',
        endereco: 'Rua das Flores, 123 - São Paulo/SP',
        valor: 150.50,
      };

      criarEntregaUseCase.execute.mockRejectedValue(
        new NotFoundException('Romaneio com ID 999 não encontrado'),
      );

      await expect(controller.criar(dto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('listar', () => {
    it('should return list of entregas for a romaneio', async () => {
      const entregas = [
        mockEntrega,
        {
          ...mockEntrega,
          id: 2,
          cliente: 'Empresa ABC Ltda',
        },
      ];

      listarEntregasPorRomaneioUseCase.execute.mockResolvedValue(entregas);

      const result = await controller.listar(1);

      expect(listarEntregasPorRomaneioUseCase.execute).toHaveBeenCalledWith(1);
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(1);
      expect(result[1].id).toBe(2);
    });

    it('should return empty array when no entregas found', async () => {
      listarEntregasPorRomaneioUseCase.execute.mockResolvedValue([]);

      const result = await controller.listar(1);

      expect(result).toEqual([]);
    });
  });

  describe('atualizarStatus', () => {
    it('should update entrega status', async () => {
      const dto: AtualizarStatusEntregaDto = {
        status: EntregaStatus.ENTREGUE,
      };

      const entregaAtualizada = {
        ...mockEntrega,
        status: EntregaStatus.ENTREGUE,
        updatedAt: new Date('2025-10-16T11:00:00.000Z'),
      };

      atualizarStatusEntregaUseCase.execute.mockResolvedValue(entregaAtualizada);

      const result = await controller.atualizarStatus(1, dto);

      expect(atualizarStatusEntregaUseCase.execute).toHaveBeenCalledWith(1, EntregaStatus.ENTREGUE);
      expect(result.status).toBe(EntregaStatus.ENTREGUE);
    });

    it('should throw NotFoundException when entrega does not exist', async () => {
      const dto: AtualizarStatusEntregaDto = {
        status: EntregaStatus.ENTREGUE,
      };

      atualizarStatusEntregaUseCase.execute.mockRejectedValue(
        new NotFoundException('Entrega com ID 999 não encontrada'),
      );

      await expect(controller.atualizarStatus(999, dto)).rejects.toThrow(NotFoundException);
    });
  });
});
