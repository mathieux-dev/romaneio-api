import { Test, TestingModule } from '@nestjs/testing';
import { Knex } from 'knex';
import { EntregaRepository } from './entrega.repository';
import { Entrega, EntregaStatus } from '../../core/domain/entities/entrega.entity';

describe('EntregaRepository', () => {
  let repository: EntregaRepository;
  let knexMock: jest.Mocked<Knex>;

  const mockEntregaData = {
    id: 1,
    romaneio_id: 1,
    cliente: 'Cliente Teste',
    endereco: 'Rua Teste, 123',
    valor: '150.50',
    status: EntregaStatus.PENDENTE,
    created_at: new Date('2025-10-16'),
    updated_at: new Date('2025-10-16'),
  };

  beforeEach(async () => {
    const knexQueryBuilder: any = {
      insert: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      select: jest.fn(),
      update: jest.fn().mockReturnThis(),
      delete: jest.fn(),
      returning: jest.fn(),
    };

    knexMock = jest.fn(() => knexQueryBuilder) as any;
    knexMock.fn = {
      now: jest.fn(() => new Date()),
    } as any;

    Object.assign(knexMock, knexQueryBuilder);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EntregaRepository,
        {
          provide: 'KNEX_CONNECTION',
          useValue: knexMock,
        },
      ],
    }).compile();

    repository = module.get<EntregaRepository>(EntregaRepository);
  });

  describe('criar', () => {
    it('should create an entrega with status Pendente by default and return the entity', async () => {
      const entregaInput = {
        romaneioId: 1,
        cliente: 'Cliente Teste',
        endereco: 'Rua Teste, 123',
        valor: 150.5,
        status: EntregaStatus.PENDENTE,
      };

      (knexMock as any).returning.mockResolvedValue([mockEntregaData]);

      const result = await repository.criar(entregaInput);

      expect(knexMock).toHaveBeenCalledWith('entregas');
      expect((knexMock as any).insert).toHaveBeenCalledWith({
        romaneio_id: entregaInput.romaneioId,
        cliente: entregaInput.cliente,
        endereco: entregaInput.endereco,
        valor: entregaInput.valor,
        status: EntregaStatus.PENDENTE,
      });
      expect((knexMock as any).returning).toHaveBeenCalledWith('*');
      expect(result).toBeInstanceOf(Entrega);
      expect(result.id).toBe(1);
      expect(result.romaneioId).toBe(1);
      expect(result.cliente).toBe('Cliente Teste');
      expect(result.endereco).toBe('Rua Teste, 123');
      expect(result.valor).toBe(150.5);
      expect(result.status).toBe(EntregaStatus.PENDENTE);
    });

    it('should create an entrega without explicit status and default to Pendente', async () => {
      const entregaInput = {
        romaneioId: 1,
        cliente: 'Cliente Teste',
        endereco: 'Rua Teste, 123',
        valor: 150.5,
      } as any;

      (knexMock as any).returning.mockResolvedValue([mockEntregaData]);

      const result = await repository.criar(entregaInput);

      expect((knexMock as any).insert).toHaveBeenCalledWith(
        expect.objectContaining({
          status: EntregaStatus.PENDENTE,
        }),
      );
      expect(result.status).toBe(EntregaStatus.PENDENTE);
    });

    it('should parse valor as float correctly', async () => {
      const entregaInput = {
        romaneioId: 1,
        cliente: 'Cliente Teste',
        endereco: 'Rua Teste, 123',
        valor: 99.99,
        status: EntregaStatus.PENDENTE,
      };

      const mockData = {
        ...mockEntregaData,
        valor: '99.99',
      };

      (knexMock as any).returning.mockResolvedValue([mockData]);

      const result = await repository.criar(entregaInput);

      expect(result.valor).toBe(99.99);
      expect(typeof result.valor).toBe('number');
    });
  });

  describe('listarPorRomaneio', () => {
    it('should return all entregas for a specific romaneio', async () => {
      const mockEntregas = [
        mockEntregaData,
        {
          id: 2,
          romaneio_id: 1,
          cliente: 'Cliente 2',
          endereco: 'Rua Teste, 456',
          valor: '200.00',
          status: EntregaStatus.ENTREGUE,
          created_at: new Date('2025-10-16'),
          updated_at: new Date('2025-10-16'),
        },
      ];

      (knexMock as any).select.mockResolvedValue(mockEntregas);

      const result = await repository.listarPorRomaneio(1);

      expect(knexMock).toHaveBeenCalledWith('entregas');
      expect((knexMock as any).where).toHaveBeenCalledWith({ romaneio_id: 1 });
      expect((knexMock as any).select).toHaveBeenCalledWith('*');
      expect(result).toHaveLength(2);
      expect(result[0]).toBeInstanceOf(Entrega);
      expect(result[1]).toBeInstanceOf(Entrega);
      expect(result[0].cliente).toBe('Cliente Teste');
      expect(result[1].cliente).toBe('Cliente 2');
      expect(result[0].romaneioId).toBe(1);
      expect(result[1].romaneioId).toBe(1);
    });

    it('should return empty array when no entregas exist for romaneio', async () => {
      (knexMock as any).select.mockResolvedValue([]);

      const result = await repository.listarPorRomaneio(999);

      expect(knexMock).toHaveBeenCalledWith('entregas');
      expect((knexMock as any).where).toHaveBeenCalledWith({ romaneio_id: 999 });
      expect(result).toEqual([]);
    });

    it('should correctly parse valor for all entregas', async () => {
      const mockEntregas = [
        { ...mockEntregaData, valor: '100.50' },
        { ...mockEntregaData, id: 2, valor: '250.75' },
      ];

      (knexMock as any).select.mockResolvedValue(mockEntregas);

      const result = await repository.listarPorRomaneio(1);

      expect(result[0].valor).toBe(100.5);
      expect(result[1].valor).toBe(250.75);
      expect(typeof result[0].valor).toBe('number');
      expect(typeof result[1].valor).toBe('number');
    });
  });

  describe('atualizarStatus', () => {
    it('should update entrega status to Entregue and return updated entity', async () => {
      const updatedData = {
        ...mockEntregaData,
        status: EntregaStatus.ENTREGUE,
      };

      (knexMock as any).returning.mockResolvedValue([updatedData]);

      const result = await repository.atualizarStatus(1, EntregaStatus.ENTREGUE);

      expect(knexMock).toHaveBeenCalledWith('entregas');
      expect((knexMock as any).where).toHaveBeenCalledWith({ id: 1 });
      expect((knexMock as any).update).toHaveBeenCalledWith(
        expect.objectContaining({
          status: EntregaStatus.ENTREGUE,
        }),
      );
      expect((knexMock as any).returning).toHaveBeenCalledWith('*');
      expect(result).toBeInstanceOf(Entrega);
      expect(result.status).toBe(EntregaStatus.ENTREGUE);
    });

    it('should update entrega status to Cancelada and return updated entity', async () => {
      const updatedData = {
        ...mockEntregaData,
        status: EntregaStatus.CANCELADA,
      };

      (knexMock as any).returning.mockResolvedValue([updatedData]);

      const result = await repository.atualizarStatus(1, EntregaStatus.CANCELADA);

      expect((knexMock as any).update).toHaveBeenCalledWith(
        expect.objectContaining({
          status: EntregaStatus.CANCELADA,
        }),
      );
      expect(result.status).toBe(EntregaStatus.CANCELADA);
    });

    it('should update updated_at timestamp when updating status', async () => {
      (knexMock as any).returning.mockResolvedValue([mockEntregaData]);

      await repository.atualizarStatus(1, EntregaStatus.ENTREGUE);

      expect((knexMock as any).update).toHaveBeenCalledWith(
        expect.objectContaining({
          updated_at: expect.any(Date),
        }),
      );
    });

    it('should correctly map all fields in updated entity', async () => {
      const updatedData = {
        ...mockEntregaData,
        status: EntregaStatus.ENTREGUE,
        valor: '300.00',
      };

      (knexMock as any).returning.mockResolvedValue([updatedData]);

      const result = await repository.atualizarStatus(1, EntregaStatus.ENTREGUE);

      expect(result.id).toBe(1);
      expect(result.romaneioId).toBe(1);
      expect(result.cliente).toBe('Cliente Teste');
      expect(result.endereco).toBe('Rua Teste, 123');
      expect(result.valor).toBe(300);
      expect(result.status).toBe(EntregaStatus.ENTREGUE);
    });
  });

  describe('deletarPorRomaneio', () => {
    it('should delete all entregas for a specific romaneio', async () => {
      (knexMock as any).delete.mockResolvedValue(2);

      await repository.deletarPorRomaneio(1);

      expect(knexMock).toHaveBeenCalledWith('entregas');
      expect((knexMock as any).where).toHaveBeenCalledWith({ romaneio_id: 1 });
      expect((knexMock as any).delete).toHaveBeenCalled();
    });

    it('should not throw error when no entregas exist for romaneio', async () => {
      (knexMock as any).delete.mockResolvedValue(0);

      await expect(repository.deletarPorRomaneio(999)).resolves.not.toThrow();

      expect(knexMock).toHaveBeenCalledWith('entregas');
      expect((knexMock as any).where).toHaveBeenCalledWith({ romaneio_id: 999 });
    });

    it('should return void', async () => {
      (knexMock as any).delete.mockResolvedValue(1);

      const result = await repository.deletarPorRomaneio(1);

      expect(result).toBeUndefined();
    });
  });
});
