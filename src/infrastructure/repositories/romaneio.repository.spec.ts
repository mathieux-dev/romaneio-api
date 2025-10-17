import { Test, TestingModule } from '@nestjs/testing';
import { RomaneioRepository } from './romaneio.repository';
import { Romaneio, RomaneioStatus } from '../../core/domain/entities/romaneio.entity';
import { EntregaStatus } from '../../core/domain/entities/entrega.entity';
import { Knex } from 'knex';

describe('RomaneioRepository', () => {
  let repository: RomaneioRepository;
  let knexMock: jest.Mocked<Knex>;

  const mockRomaneioData = {
    id: 1,
    numero_romaneio: 'ROM-001',
    data_emissao: new Date('2025-10-16'),
    motorista_id: 1,
    veiculo: 'ABC-1234',
    status: 'Aberto',
    created_at: new Date('2025-10-16'),
    updated_at: new Date('2025-10-16'),
  };

  beforeEach(async () => {
    const knexQueryBuilder: any = {
      insert: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
      select: jest.fn(),
      first: jest.fn(),
      returning: jest.fn(),
    };

    knexMock = jest.fn(() => knexQueryBuilder) as any;
    knexMock.fn = {
      now: jest.fn(() => new Date()),
    } as any;

    Object.assign(knexMock, knexQueryBuilder);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RomaneioRepository,
        {
          provide: 'KNEX_CONNECTION',
          useValue: knexMock,
        },
      ],
    }).compile();

    repository = module.get<RomaneioRepository>(RomaneioRepository);
  });

  describe('criar', () => {
    it('should create a romaneio with status Aberto by default', async () => {
      const romaneioData = {
        numeroRomaneio: 'ROM-001',
        dataEmissao: new Date('2025-10-16'),
        motoristaId: 1,
        veiculo: 'ABC-1234',
        status: RomaneioStatus.ABERTO,
      };

      (knexMock as any).returning.mockResolvedValue([mockRomaneioData]);

      const result = await repository.criar(romaneioData);

      expect(knexMock).toHaveBeenCalledWith('romaneios');
      expect((knexMock as any).insert).toHaveBeenCalledWith({
        numero_romaneio: 'ROM-001',
        data_emissao: romaneioData.dataEmissao,
        motorista_id: 1,
        veiculo: 'ABC-1234',
        status: 'Aberto',
      });
      expect((knexMock as any).returning).toHaveBeenCalledWith('*');
      expect(result).toBeInstanceOf(Romaneio);
      expect(result.id).toBe(1);
      expect(result.numeroRomaneio).toBe('ROM-001');
      expect(result.status).toBe(RomaneioStatus.ABERTO);
    });

    it('should create a romaneio with default status when not provided', async () => {
      const romaneioData = {
        numeroRomaneio: 'ROM-002',
        dataEmissao: new Date('2025-10-16'),
        motoristaId: 2,
        veiculo: 'XYZ-5678',
      } as any;

      const createdRow = {
        id: 2,
        numero_romaneio: 'ROM-002',
        data_emissao: new Date('2025-10-16'),
        motorista_id: 2,
        veiculo: 'XYZ-5678',
        status: 'Aberto',
        created_at: new Date(),
        updated_at: new Date(),
      };

      (knexMock as any).returning.mockResolvedValue([createdRow]);

      const result = await repository.criar(romaneioData);

      expect((knexMock as any).insert).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'Aberto',
        }),
      );
      expect(result.status).toBe(RomaneioStatus.ABERTO);
    });
  });

  describe('buscarPorId', () => {
    it('should return romaneio with entregas when found', async () => {
      const entregasRows = [
        {
          id: 1,
          romaneio_id: 1,
          cliente: 'Cliente A',
          endereco: 'Rua A, 123',
          valor: '100.50',
          status: 'Pendente',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          romaneio_id: 1,
          cliente: 'Cliente B',
          endereco: 'Rua B, 456',
          valor: '200.75',
          status: 'Pendente',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      (knexMock as any).first.mockResolvedValue(mockRomaneioData);
      (knexMock as any).select.mockResolvedValue(entregasRows);

      const result = await repository.buscarPorId(1);

      expect(knexMock).toHaveBeenCalledWith('romaneios');
      expect((knexMock as any).where).toHaveBeenCalledWith({ id: 1 });
      expect(knexMock).toHaveBeenCalledWith('entregas');
      expect((knexMock as any).where).toHaveBeenCalledWith({ romaneio_id: 1 });
      expect(result).toBeInstanceOf(Romaneio);
      expect(result?.id).toBe(1);
      expect(result?.entregas).toHaveLength(2);
      expect(result?.entregas?.[0].cliente).toBe('Cliente A');
      expect(result?.entregas?.[0].valor).toBe(100.5);
      expect(result?.entregas?.[1].cliente).toBe('Cliente B');
    });

    it('should return null when romaneio not found', async () => {
      (knexMock as any).first.mockResolvedValue(null);

      const result = await repository.buscarPorId(999);

      expect(knexMock).toHaveBeenCalledWith('romaneios');
      expect((knexMock as any).where).toHaveBeenCalledWith({ id: 999 });
      expect(result).toBeNull();
    });

    it('should return romaneio with empty entregas array when no entregas exist', async () => {
      (knexMock as any).first.mockResolvedValue(mockRomaneioData);
      (knexMock as any).select.mockResolvedValue([]);

      const result = await repository.buscarPorId(1);

      expect(result).toBeInstanceOf(Romaneio);
      expect(result?.entregas).toEqual([]);
    });
  });

  describe('listarTodos', () => {
    it('should return all romaneios', async () => {
      const rows = [
        mockRomaneioData,
        {
          id: 2,
          numero_romaneio: 'ROM-002',
          data_emissao: new Date('2025-10-17'),
          motorista_id: 2,
          veiculo: 'XYZ-5678',
          status: 'Em trânsito',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      (knexMock as any).select.mockResolvedValue(rows);

      const result = await repository.listarTodos();

      expect(knexMock).toHaveBeenCalledWith('romaneios');
      expect((knexMock as any).select).toHaveBeenCalledWith('*');
      expect(result).toHaveLength(2);
      expect(result[0]).toBeInstanceOf(Romaneio);
      expect(result[0].numeroRomaneio).toBe('ROM-001');
      expect(result[1].numeroRomaneio).toBe('ROM-002');
      expect(result[1].status).toBe(RomaneioStatus.EM_TRANSITO);
    });

    it('should return empty array when no romaneios exist', async () => {
      (knexMock as any).select.mockResolvedValue([]);

      const result = await repository.listarTodos();

      expect(result).toEqual([]);
    });
  });

  describe('atualizarStatus', () => {
    it('should update romaneio status', async () => {
      const updatedRow = {
        ...mockRomaneioData,
        status: 'Em trânsito',
      };

      (knexMock as any).returning.mockResolvedValue([updatedRow]);

      const result = await repository.atualizarStatus(1, RomaneioStatus.EM_TRANSITO);

      expect(knexMock).toHaveBeenCalledWith('romaneios');
      expect((knexMock as any).where).toHaveBeenCalledWith({ id: 1 });
      expect((knexMock as any).update).toHaveBeenCalledWith({
        status: 'Em trânsito',
        updated_at: expect.any(Date),
      });
      expect((knexMock as any).returning).toHaveBeenCalledWith('*');
      expect(result).toBeInstanceOf(Romaneio);
      expect(result.status).toBe(RomaneioStatus.EM_TRANSITO);
    });

    it('should update romaneio status to Finalizado', async () => {
      const updatedRow = {
        ...mockRomaneioData,
        status: 'Finalizado',
      };

      (knexMock as any).returning.mockResolvedValue([updatedRow]);

      const result = await repository.atualizarStatus(1, RomaneioStatus.FINALIZADO);

      expect((knexMock as any).update).toHaveBeenCalledWith({
        status: 'Finalizado',
        updated_at: expect.any(Date),
      });
      expect(result.status).toBe(RomaneioStatus.FINALIZADO);
    });
  });

  describe('deletar', () => {
    it('should delete romaneio by id', async () => {
      (knexMock as any).delete.mockResolvedValue(1);

      await repository.deletar(1);

      expect(knexMock).toHaveBeenCalledWith('romaneios');
      expect((knexMock as any).where).toHaveBeenCalledWith({ id: 1 });
      expect((knexMock as any).delete).toHaveBeenCalled();
    });

    it('should handle deletion of non-existent romaneio', async () => {
      (knexMock as any).delete.mockResolvedValue(0);

      await repository.deletar(999);

      expect(knexMock).toHaveBeenCalledWith('romaneios');
      expect((knexMock as any).where).toHaveBeenCalledWith({ id: 999 });
      expect((knexMock as any).delete).toHaveBeenCalled();
    });
  });
});
