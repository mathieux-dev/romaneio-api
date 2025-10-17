import { Test, TestingModule } from '@nestjs/testing';
import { CriarEntregaUseCase } from './criar-entrega.use-case';
import { IEntregaRepository } from '../../domain/repositories/entrega.repository.interface';
import { IRomaneioRepository } from '../../domain/repositories/romaneio.repository.interface';
import { Entrega, EntregaStatus } from '../../domain/entities/entrega.entity';
import { Romaneio, RomaneioStatus } from '../../domain/entities/romaneio.entity';
import { NotFoundException, ValidationException } from '../../../shared/exceptions';

describe('CriarEntregaUseCase', () => {
  let useCase: CriarEntregaUseCase;
  let entregaRepository: jest.Mocked<IEntregaRepository>;
  let romaneioRepository: jest.Mocked<IRomaneioRepository>;

  beforeEach(async () => {
    const mockEntregaRepository = {
      criar: jest.fn(),
      listarPorRomaneio: jest.fn(),
      atualizarStatus: jest.fn(),
      deletarPorRomaneio: jest.fn(),
    };

    const mockRomaneioRepository = {
      criar: jest.fn(),
      buscarPorId: jest.fn(),
      listarTodos: jest.fn(),
      atualizarStatus: jest.fn(),
      deletar: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CriarEntregaUseCase,
        {
          provide: 'IEntregaRepository',
          useValue: mockEntregaRepository,
        },
        {
          provide: 'IRomaneioRepository',
          useValue: mockRomaneioRepository,
        },
      ],
    }).compile();

    useCase = module.get<CriarEntregaUseCase>(CriarEntregaUseCase);
    entregaRepository = module.get('IEntregaRepository');
    romaneioRepository = module.get('IRomaneioRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should create an entrega when romaneio exists and valor is positive', async () => {
      const romaneio: Romaneio = {
        id: 1,
        numeroRomaneio: 'ROM-001',
        dataEmissao: new Date('2025-10-16'),
        motoristaId: 1,
        veiculo: 'ABC-1234',
        status: RomaneioStatus.ABERTO,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const input = {
        romaneioId: 1,
        cliente: 'Cliente Teste',
        endereco: 'Rua Teste, 123',
        valor: 100.50,
      };

      const expectedEntrega: Entrega = {
        id: 1,
        romaneioId: input.romaneioId,
        cliente: input.cliente,
        endereco: input.endereco,
        valor: input.valor,
        status: EntregaStatus.PENDENTE,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      romaneioRepository.buscarPorId.mockResolvedValue(romaneio);
      entregaRepository.criar.mockResolvedValue(expectedEntrega);

      const result = await useCase.execute(input);

      expect(romaneioRepository.buscarPorId).toHaveBeenCalledWith(1);
      expect(entregaRepository.criar).toHaveBeenCalledWith({
        romaneioId: input.romaneioId,
        cliente: input.cliente,
        endereco: input.endereco,
        valor: input.valor,
        status: EntregaStatus.PENDENTE,
      });
      expect(result).toEqual(expectedEntrega);
    });

    it('should throw NotFoundException when romaneio does not exist', async () => {
      const input = {
        romaneioId: 999,
        cliente: 'Cliente Teste',
        endereco: 'Rua Teste, 123',
        valor: 100.50,
      };

      romaneioRepository.buscarPorId.mockResolvedValue(null);

      await expect(useCase.execute(input)).rejects.toThrow(NotFoundException);
      await expect(useCase.execute(input)).rejects.toThrow(
        'Romaneio com ID 999 não encontrado'
      );
      expect(entregaRepository.criar).not.toHaveBeenCalled();
    });

    it('should throw ValidationException when valor is zero', async () => {
      const romaneio: Romaneio = {
        id: 1,
        numeroRomaneio: 'ROM-001',
        dataEmissao: new Date('2025-10-16'),
        motoristaId: 1,
        veiculo: 'ABC-1234',
        status: RomaneioStatus.ABERTO,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const input = {
        romaneioId: 1,
        cliente: 'Cliente Teste',
        endereco: 'Rua Teste, 123',
        valor: 0,
      };

      romaneioRepository.buscarPorId.mockResolvedValue(romaneio);

      await expect(useCase.execute(input)).rejects.toThrow(ValidationException);
      await expect(useCase.execute(input)).rejects.toThrow(
        'O valor da entrega deve ser positivo'
      );
      expect(entregaRepository.criar).not.toHaveBeenCalled();
    });

    it('should throw ValidationException when valor is negative', async () => {
      const romaneio: Romaneio = {
        id: 1,
        numeroRomaneio: 'ROM-001',
        dataEmissao: new Date('2025-10-16'),
        motoristaId: 1,
        veiculo: 'ABC-1234',
        status: RomaneioStatus.ABERTO,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const input = {
        romaneioId: 1,
        cliente: 'Cliente Teste',
        endereco: 'Rua Teste, 123',
        valor: -50.00,
      };

      romaneioRepository.buscarPorId.mockResolvedValue(romaneio);

      await expect(useCase.execute(input)).rejects.toThrow(ValidationException);
      await expect(useCase.execute(input)).rejects.toThrow(
        'O valor da entrega deve ser positivo'
      );
      expect(entregaRepository.criar).not.toHaveBeenCalled();
    });

    it('should create entrega with status PENDENTE by default', async () => {
      const romaneio: Romaneio = {
        id: 1,
        numeroRomaneio: 'ROM-001',
        dataEmissao: new Date('2025-10-16'),
        motoristaId: 1,
        veiculo: 'ABC-1234',
        status: RomaneioStatus.ABERTO,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const input = {
        romaneioId: 1,
        cliente: 'Cliente Teste',
        endereco: 'Rua Teste, 123',
        valor: 200.00,
      };

      romaneioRepository.buscarPorId.mockResolvedValue(romaneio);
      entregaRepository.criar.mockResolvedValue({
        id: 1,
        ...input,
        status: EntregaStatus.PENDENTE,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await useCase.execute(input);

      expect(entregaRepository.criar).toHaveBeenCalledWith(
        expect.objectContaining({
          status: EntregaStatus.PENDENTE,
        })
      );
    });
  });
});
