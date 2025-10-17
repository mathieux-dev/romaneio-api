import { Test, TestingModule } from '@nestjs/testing';
import { DeletarRomaneioUseCase } from './deletar-romaneio.use-case';
import { IRomaneioRepository } from '../../domain/repositories/romaneio.repository.interface';
import { Romaneio, RomaneioStatus } from '../../domain/entities/romaneio.entity';
import { NotFoundException } from '../../../shared/exceptions';

describe('DeletarRomaneioUseCase', () => {
  let useCase: DeletarRomaneioUseCase;
  let romaneioRepository: jest.Mocked<IRomaneioRepository>;

  beforeEach(async () => {
    const mockRomaneioRepository = {
      criar: jest.fn(),
      buscarPorId: jest.fn(),
      listarTodos: jest.fn(),
      atualizarStatus: jest.fn(),
      deletar: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeletarRomaneioUseCase,
        {
          provide: 'IRomaneioRepository',
          useValue: mockRomaneioRepository,
        },
      ],
    }).compile();

    useCase = module.get<DeletarRomaneioUseCase>(DeletarRomaneioUseCase);
    romaneioRepository = module.get('IRomaneioRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should delete romaneio when it exists', async () => {
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

      romaneioRepository.buscarPorId.mockResolvedValue(romaneio);
      romaneioRepository.deletar.mockResolvedValue(undefined);

      await useCase.execute(1);

      expect(romaneioRepository.buscarPorId).toHaveBeenCalledWith(1);
      expect(romaneioRepository.deletar).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when romaneio not found', async () => {
      romaneioRepository.buscarPorId.mockResolvedValue(null);

      await expect(useCase.execute(999)).rejects.toThrow(NotFoundException);
      await expect(useCase.execute(999)).rejects.toThrow(
        'Romaneio com ID 999 não encontrado'
      );
      expect(romaneioRepository.deletar).not.toHaveBeenCalled();
    });

    it('should delete romaneio with associated entregas (cascade)', async () => {
      const romaneio: Romaneio = {
        id: 1,
        numeroRomaneio: 'ROM-001',
        dataEmissao: new Date('2025-10-16'),
        motoristaId: 1,
        veiculo: 'ABC-1234',
        status: RomaneioStatus.ABERTO,
        entregas: [
          {
            id: 1,
            romaneioId: 1,
            cliente: 'Cliente A',
            endereco: 'Rua A, 123',
            valor: 100.50,
            status: 'Pendente' as any,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      romaneioRepository.buscarPorId.mockResolvedValue(romaneio);
      romaneioRepository.deletar.mockResolvedValue(undefined);

      await useCase.execute(1);

      expect(romaneioRepository.deletar).toHaveBeenCalledWith(1);
    });
  });
});
