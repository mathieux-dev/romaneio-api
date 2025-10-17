import { Test, TestingModule } from '@nestjs/testing';
import { CriarRomaneioUseCase } from './criar-romaneio.use-case';
import { IRomaneioRepository } from '../../domain/repositories/romaneio.repository.interface';
import { IMotoristaRepository } from '../../domain/repositories/motorista.repository.interface';
import { Romaneio, RomaneioStatus } from '../../domain/entities/romaneio.entity';
import { Motorista } from '../../domain/entities/motorista.entity';
import { NotFoundException } from '../../../shared/exceptions';

describe('CriarRomaneioUseCase', () => {
  let useCase: CriarRomaneioUseCase;
  let romaneioRepository: jest.Mocked<IRomaneioRepository>;
  let motoristaRepository: jest.Mocked<IMotoristaRepository>;

  beforeEach(async () => {
    const mockRomaneioRepository = {
      criar: jest.fn(),
      buscarPorId: jest.fn(),
      listarTodos: jest.fn(),
      atualizarStatus: jest.fn(),
      deletar: jest.fn(),
    };

    const mockMotoristaRepository = {
      criar: jest.fn(),
      buscarPorId: jest.fn(),
      buscarPorCpf: jest.fn(),
      listarTodos: jest.fn(),
      atualizar: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CriarRomaneioUseCase,
        {
          provide: 'IRomaneioRepository',
          useValue: mockRomaneioRepository,
        },
        {
          provide: 'IMotoristaRepository',
          useValue: mockMotoristaRepository,
        },
      ],
    }).compile();

    useCase = module.get<CriarRomaneioUseCase>(CriarRomaneioUseCase);
    romaneioRepository = module.get('IRomaneioRepository');
    motoristaRepository = module.get('IMotoristaRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should create a romaneio when motorista exists', async () => {
      const motorista: Motorista = {
        id: 1,
        nome: 'João Silva',
        cpf: '12345678901',
        telefone: '11999999999',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const input = {
        numeroRomaneio: 'ROM-001',
        dataEmissao: new Date('2025-10-16'),
        motoristaId: 1,
        veiculo: 'ABC-1234',
      };

      const expectedRomaneio: Romaneio = {
        id: 1,
        numeroRomaneio: input.numeroRomaneio,
        dataEmissao: input.dataEmissao,
        motoristaId: input.motoristaId,
        veiculo: input.veiculo,
        status: RomaneioStatus.ABERTO,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      motoristaRepository.buscarPorId.mockResolvedValue(motorista);
      romaneioRepository.criar.mockResolvedValue(expectedRomaneio);

      const result = await useCase.execute(input);

      expect(motoristaRepository.buscarPorId).toHaveBeenCalledWith(1);
      expect(romaneioRepository.criar).toHaveBeenCalledWith({
        numeroRomaneio: input.numeroRomaneio,
        dataEmissao: input.dataEmissao,
        motoristaId: input.motoristaId,
        veiculo: input.veiculo,
        status: RomaneioStatus.ABERTO,
      });
      expect(result).toEqual(expectedRomaneio);
    });

    it('should throw NotFoundException when motorista does not exist', async () => {
      const input = {
        numeroRomaneio: 'ROM-001',
        dataEmissao: new Date('2025-10-16'),
        motoristaId: 999,
        veiculo: 'ABC-1234',
      };

      motoristaRepository.buscarPorId.mockResolvedValue(null);

      await expect(useCase.execute(input)).rejects.toThrow(NotFoundException);
      await expect(useCase.execute(input)).rejects.toThrow(
        'Motorista com ID 999 não encontrado'
      );
      expect(romaneioRepository.criar).not.toHaveBeenCalled();
    });

    it('should create romaneio with status ABERTO by default', async () => {
      const motorista: Motorista = {
        id: 1,
        nome: 'João Silva',
        cpf: '12345678901',
        telefone: '11999999999',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const input = {
        numeroRomaneio: 'ROM-002',
        dataEmissao: new Date('2025-10-16'),
        motoristaId: 1,
        veiculo: 'XYZ-5678',
      };

      motoristaRepository.buscarPorId.mockResolvedValue(motorista);
      romaneioRepository.criar.mockResolvedValue({
        id: 2,
        ...input,
        status: RomaneioStatus.ABERTO,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await useCase.execute(input);

      expect(romaneioRepository.criar).toHaveBeenCalledWith(
        expect.objectContaining({
          status: RomaneioStatus.ABERTO,
        })
      );
    });
  });
});
