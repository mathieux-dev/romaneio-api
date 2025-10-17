import { Test, TestingModule } from '@nestjs/testing';
import { Knex } from 'knex';
import { MotoristaRepository } from './motorista.repository';
import { Motorista } from '../../core/domain/entities/motorista.entity';

describe('MotoristaRepository', () => {
  let repository: MotoristaRepository;
  let knexMock: jest.Mocked<Knex>;

  const mockMotoristaData = {
    id: 1,
    nome: 'João Silva',
    cpf: '12345678901',
    telefone: '11999999999',
    created_at: new Date('2025-10-16'),
    updated_at: new Date('2025-10-16'),
  };

  beforeEach(async () => {
    const knexQueryBuilder: any = {
      insert: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      first: jest.fn(),
      select: jest.fn(),
      update: jest.fn().mockReturnThis(),
      returning: jest.fn(),
    };

    knexMock = jest.fn(() => knexQueryBuilder) as any;
    knexMock.fn = {
      now: jest.fn(() => new Date()),
    } as any;

    Object.assign(knexMock, knexQueryBuilder);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MotoristaRepository,
        {
          provide: 'KNEX_CONNECTION',
          useValue: knexMock,
        },
      ],
    }).compile();

    repository = module.get<MotoristaRepository>(MotoristaRepository);
  });

  describe('criar', () => {
    it('should create a motorista and return the entity', async () => {
      const motoristaInput = {
        nome: 'João Silva',
        cpf: '12345678901',
        telefone: '11999999999',
      };

      (knexMock as any).returning.mockResolvedValue([mockMotoristaData]);

      const result = await repository.criar(motoristaInput);

      expect(knexMock).toHaveBeenCalledWith('motoristas');
      expect((knexMock as any).insert).toHaveBeenCalledWith({
        nome: motoristaInput.nome,
        cpf: motoristaInput.cpf,
        telefone: motoristaInput.telefone,
      });
      expect((knexMock as any).returning).toHaveBeenCalledWith('*');
      expect(result).toBeInstanceOf(Motorista);
      expect(result.id).toBe(1);
      expect(result.nome).toBe('João Silva');
      expect(result.cpf).toBe('12345678901');
    });
  });

  describe('buscarPorId', () => {
    it('should return a motorista when found', async () => {
      (knexMock as any).first.mockResolvedValue(mockMotoristaData);

      const result = await repository.buscarPorId(1);

      expect(knexMock).toHaveBeenCalledWith('motoristas');
      expect((knexMock as any).where).toHaveBeenCalledWith({ id: 1 });
      expect((knexMock as any).first).toHaveBeenCalled();
      expect(result).toBeInstanceOf(Motorista);
      expect(result?.id).toBe(1);
      expect(result?.nome).toBe('João Silva');
    });

    it('should return null when motorista not found', async () => {
      (knexMock as any).first.mockResolvedValue(null);

      const result = await repository.buscarPorId(999);

      expect(knexMock).toHaveBeenCalledWith('motoristas');
      expect((knexMock as any).where).toHaveBeenCalledWith({ id: 999 });
      expect(result).toBeNull();
    });
  });

  describe('buscarPorCpf', () => {
    it('should return a motorista when found by CPF', async () => {
      (knexMock as any).first.mockResolvedValue(mockMotoristaData);

      const result = await repository.buscarPorCpf('12345678901');

      expect(knexMock).toHaveBeenCalledWith('motoristas');
      expect((knexMock as any).where).toHaveBeenCalledWith({
        cpf: '12345678901',
      });
      expect((knexMock as any).first).toHaveBeenCalled();
      expect(result).toBeInstanceOf(Motorista);
      expect(result?.cpf).toBe('12345678901');
    });

    it('should return null when motorista not found by CPF', async () => {
      (knexMock as any).first.mockResolvedValue(null);

      const result = await repository.buscarPorCpf('99999999999');

      expect(knexMock).toHaveBeenCalledWith('motoristas');
      expect((knexMock as any).where).toHaveBeenCalledWith({
        cpf: '99999999999',
      });
      expect(result).toBeNull();
    });
  });

  describe('listarTodos', () => {
    it('should return all motoristas', async () => {
      const mockMotoristas = [
        mockMotoristaData,
        {
          id: 2,
          nome: 'Maria Santos',
          cpf: '98765432109',
          telefone: '11888888888',
          created_at: new Date('2025-10-16'),
          updated_at: new Date('2025-10-16'),
        },
      ];

      (knexMock as any).select.mockResolvedValue(mockMotoristas);

      const result = await repository.listarTodos();

      expect(knexMock).toHaveBeenCalledWith('motoristas');
      expect((knexMock as any).select).toHaveBeenCalledWith('*');
      expect(result).toHaveLength(2);
      expect(result[0]).toBeInstanceOf(Motorista);
      expect(result[1]).toBeInstanceOf(Motorista);
      expect(result[0].nome).toBe('João Silva');
      expect(result[1].nome).toBe('Maria Santos');
    });

    it('should return empty array when no motoristas exist', async () => {
      (knexMock as any).select.mockResolvedValue([]);

      const result = await repository.listarTodos();

      expect(knexMock).toHaveBeenCalledWith('motoristas');
      expect(result).toEqual([]);
    });
  });

  describe('atualizar', () => {
    it('should update motorista nome and return updated entity', async () => {
      const updatedData = {
        ...mockMotoristaData,
        nome: 'João Silva Updated',
      };

      (knexMock as any).returning.mockResolvedValue([updatedData]);

      const result = await repository.atualizar(1, { nome: 'João Silva Updated' });

      expect(knexMock).toHaveBeenCalledWith('motoristas');
      expect((knexMock as any).where).toHaveBeenCalledWith({ id: 1 });
      expect((knexMock as any).update).toHaveBeenCalledWith(
        expect.objectContaining({
          nome: 'João Silva Updated',
        }),
      );
      expect((knexMock as any).returning).toHaveBeenCalledWith('*');
      expect(result).toBeInstanceOf(Motorista);
      expect(result.nome).toBe('João Silva Updated');
    });

    it('should update motorista telefone and return updated entity', async () => {
      const updatedData = {
        ...mockMotoristaData,
        telefone: '11777777777',
      };

      (knexMock as any).returning.mockResolvedValue([updatedData]);

      const result = await repository.atualizar(1, { telefone: '11777777777' });

      expect(knexMock).toHaveBeenCalledWith('motoristas');
      expect((knexMock as any).where).toHaveBeenCalledWith({ id: 1 });
      expect((knexMock as any).update).toHaveBeenCalledWith(
        expect.objectContaining({
          telefone: '11777777777',
        }),
      );
      expect(result.telefone).toBe('11777777777');
    });

    it('should update both nome and telefone', async () => {
      const updatedData = {
        ...mockMotoristaData,
        nome: 'João Silva Updated',
        telefone: '11777777777',
      };

      (knexMock as any).returning.mockResolvedValue([updatedData]);

      const result = await repository.atualizar(1, {
        nome: 'João Silva Updated',
        telefone: '11777777777',
      });

      expect((knexMock as any).update).toHaveBeenCalledWith(
        expect.objectContaining({
          nome: 'João Silva Updated',
          telefone: '11777777777',
        }),
      );
      expect(result.nome).toBe('João Silva Updated');
      expect(result.telefone).toBe('11777777777');
    });

    it('should update updated_at timestamp', async () => {
      (knexMock as any).returning.mockResolvedValue([mockMotoristaData]);

      await repository.atualizar(1, { nome: 'João Silva Updated' });

      expect((knexMock as any).update).toHaveBeenCalledWith(
        expect.objectContaining({
          updated_at: expect.any(Date),
        }),
      );
    });
  });
});
