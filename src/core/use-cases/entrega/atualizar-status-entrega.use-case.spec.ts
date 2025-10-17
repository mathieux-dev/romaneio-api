import { Test, TestingModule } from '@nestjs/testing';
import { AtualizarStatusEntregaUseCase } from './atualizar-status-entrega.use-case';
import { IEntregaRepository } from '../../domain/repositories/entrega.repository.interface';
import { Entrega, EntregaStatus } from '../../domain/entities/entrega.entity';
import { ValidationException } from '../../../shared/exceptions';

describe('AtualizarStatusEntregaUseCase', () => {
  let useCase: AtualizarStatusEntregaUseCase;
  let entregaRepository: jest.Mocked<IEntregaRepository>;

  beforeEach(async () => {
    const mockEntregaRepository = {
      criar: jest.fn(),
      listarPorRomaneio: jest.fn(),
      atualizarStatus: jest.fn(),
      deletarPorRomaneio: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AtualizarStatusEntregaUseCase,
        {
          provide: 'IEntregaRepository',
          useValue: mockEntregaRepository,
        },
      ],
    }).compile();

    useCase = module.get<AtualizarStatusEntregaUseCase>(
      AtualizarStatusEntregaUseCase,
    );
    entregaRepository = module.get('IEntregaRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should update entrega status to ENTREGUE', async () => {
      const entregaId = 1;
      const novoStatus = EntregaStatus.ENTREGUE;
      const expectedEntrega: Entrega = {
        id: entregaId,
        romaneioId: 1,
        cliente: 'Cliente Teste',
        endereco: 'Rua Teste, 123',
        valor: 100.00,
        status: novoStatus,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      entregaRepository.atualizarStatus.mockResolvedValue(expectedEntrega);

      const result = await useCase.execute(entregaId, novoStatus);

      expect(entregaRepository.atualizarStatus).toHaveBeenCalledWith(
        entregaId,
        novoStatus,
      );
      expect(result).toEqual(expectedEntrega);
      expect(result.status).toBe(EntregaStatus.ENTREGUE);
    });

    it('should update entrega status to CANCELADA', async () => {
      const entregaId = 2;
      const novoStatus = EntregaStatus.CANCELADA;
      const expectedEntrega: Entrega = {
        id: entregaId,
        romaneioId: 1,
        cliente: 'Cliente Teste',
        endereco: 'Rua Teste, 456',
        valor: 200.00,
        status: novoStatus,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      entregaRepository.atualizarStatus.mockResolvedValue(expectedEntrega);

      const result = await useCase.execute(entregaId, novoStatus);

      expect(entregaRepository.atualizarStatus).toHaveBeenCalledWith(
        entregaId,
        novoStatus,
      );
      expect(result).toEqual(expectedEntrega);
      expect(result.status).toBe(EntregaStatus.CANCELADA);
    });

    it('should update entrega status to PENDENTE', async () => {
      const entregaId = 3;
      const novoStatus = EntregaStatus.PENDENTE;
      const expectedEntrega: Entrega = {
        id: entregaId,
        romaneioId: 1,
        cliente: 'Cliente Teste',
        endereco: 'Rua Teste, 789',
        valor: 150.00,
        status: novoStatus,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      entregaRepository.atualizarStatus.mockResolvedValue(expectedEntrega);

      const result = await useCase.execute(entregaId, novoStatus);

      expect(entregaRepository.atualizarStatus).toHaveBeenCalledWith(
        entregaId,
        novoStatus,
      );
      expect(result).toEqual(expectedEntrega);
      expect(result.status).toBe(EntregaStatus.PENDENTE);
    });

    it('should throw ValidationException for invalid status', async () => {
      const entregaId = 1;
      const invalidStatus = 'StatusInvalido' as EntregaStatus;

      await expect(useCase.execute(entregaId, invalidStatus)).rejects.toThrow(
        ValidationException,
      );
      expect(entregaRepository.atualizarStatus).not.toHaveBeenCalled();
    });

    it('should accept all valid status transitions', async () => {
      const entregaId = 1;
      const validStatuses = [
        EntregaStatus.PENDENTE,
        EntregaStatus.ENTREGUE,
        EntregaStatus.CANCELADA,
      ];

      for (const status of validStatuses) {
        entregaRepository.atualizarStatus.mockResolvedValue({
          id: entregaId,
          romaneioId: 1,
          cliente: 'Cliente Teste',
          endereco: 'Rua Teste, 123',
          valor: 100.00,
          status: status,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        await expect(useCase.execute(entregaId, status)).resolves.not.toThrow();
      }

      expect(entregaRepository.atualizarStatus).toHaveBeenCalledTimes(
        validStatuses.length,
      );
    });
  });
});
