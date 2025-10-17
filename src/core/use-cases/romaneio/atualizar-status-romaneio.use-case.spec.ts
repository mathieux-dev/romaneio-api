import { Test, TestingModule } from '@nestjs/testing';
import { AtualizarStatusRomaneioUseCase } from './atualizar-status-romaneio.use-case';
import { IRomaneioRepository } from '../../domain/repositories/romaneio.repository.interface';
import { Romaneio, RomaneioStatus } from '../../domain/entities/romaneio.entity';
import { NotFoundException, ValidationException } from '../../../shared/exceptions';

describe('AtualizarStatusRomaneioUseCase', () => {
  let useCase: AtualizarStatusRomaneioUseCase;
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
        AtualizarStatusRomaneioUseCase,
        {
          provide: 'IRomaneioRepository',
          useValue: mockRomaneioRepository,
        },
      ],
    }).compile();

    useCase = module.get<AtualizarStatusRomaneioUseCase>(AtualizarStatusRomaneioUseCase);
    romaneioRepository = module.get('IRomaneioRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should update status from ABERTO to EM_TRANSITO', async () => {
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

      const updatedRomaneio: Romaneio = {
        ...romaneio,
        status: RomaneioStatus.EM_TRANSITO,
      };

      romaneioRepository.buscarPorId.mockResolvedValue(romaneio);
      romaneioRepository.atualizarStatus.mockResolvedValue(updatedRomaneio);

      const result = await useCase.execute(1, RomaneioStatus.EM_TRANSITO);

      expect(romaneioRepository.buscarPorId).toHaveBeenCalledWith(1);
      expect(romaneioRepository.atualizarStatus).toHaveBeenCalledWith(1, RomaneioStatus.EM_TRANSITO);
      expect(result.status).toBe(RomaneioStatus.EM_TRANSITO);
    });

    it('should update status from ABERTO to FINALIZADO', async () => {
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

      const updatedRomaneio: Romaneio = {
        ...romaneio,
        status: RomaneioStatus.FINALIZADO,
      };

      romaneioRepository.buscarPorId.mockResolvedValue(romaneio);
      romaneioRepository.atualizarStatus.mockResolvedValue(updatedRomaneio);

      const result = await useCase.execute(1, RomaneioStatus.FINALIZADO);

      expect(result.status).toBe(RomaneioStatus.FINALIZADO);
    });

    it('should update status from EM_TRANSITO to FINALIZADO', async () => {
      const romaneio: Romaneio = {
        id: 1,
        numeroRomaneio: 'ROM-001',
        dataEmissao: new Date('2025-10-16'),
        motoristaId: 1,
        veiculo: 'ABC-1234',
        status: RomaneioStatus.EM_TRANSITO,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updatedRomaneio: Romaneio = {
        ...romaneio,
        status: RomaneioStatus.FINALIZADO,
      };

      romaneioRepository.buscarPorId.mockResolvedValue(romaneio);
      romaneioRepository.atualizarStatus.mockResolvedValue(updatedRomaneio);

      const result = await useCase.execute(1, RomaneioStatus.FINALIZADO);

      expect(result.status).toBe(RomaneioStatus.FINALIZADO);
    });

    it('should throw NotFoundException when romaneio not found', async () => {
      romaneioRepository.buscarPorId.mockResolvedValue(null);

      await expect(useCase.execute(999, RomaneioStatus.EM_TRANSITO)).rejects.toThrow(
        NotFoundException
      );
      await expect(useCase.execute(999, RomaneioStatus.EM_TRANSITO)).rejects.toThrow(
        'Romaneio com ID 999 não encontrado'
      );
      expect(romaneioRepository.atualizarStatus).not.toHaveBeenCalled();
    });

    it('should throw ValidationException when trying to change from EM_TRANSITO to ABERTO', async () => {
      const romaneio: Romaneio = {
        id: 1,
        numeroRomaneio: 'ROM-001',
        dataEmissao: new Date('2025-10-16'),
        motoristaId: 1,
        veiculo: 'ABC-1234',
        status: RomaneioStatus.EM_TRANSITO,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      romaneioRepository.buscarPorId.mockResolvedValue(romaneio);

      await expect(useCase.execute(1, RomaneioStatus.ABERTO)).rejects.toThrow(
        ValidationException
      );
      await expect(useCase.execute(1, RomaneioStatus.ABERTO)).rejects.toThrow(
        "Transição de status inválida: não é possível mudar de 'Em trânsito' para 'Aberto'"
      );
      expect(romaneioRepository.atualizarStatus).not.toHaveBeenCalled();
    });

    it('should throw ValidationException when trying to change from FINALIZADO to any status', async () => {
      const romaneio: Romaneio = {
        id: 1,
        numeroRomaneio: 'ROM-001',
        dataEmissao: new Date('2025-10-16'),
        motoristaId: 1,
        veiculo: 'ABC-1234',
        status: RomaneioStatus.FINALIZADO,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      romaneioRepository.buscarPorId.mockResolvedValue(romaneio);

      await expect(useCase.execute(1, RomaneioStatus.ABERTO)).rejects.toThrow(
        ValidationException
      );
      await expect(useCase.execute(1, RomaneioStatus.EM_TRANSITO)).rejects.toThrow(
        ValidationException
      );
      expect(romaneioRepository.atualizarStatus).not.toHaveBeenCalled();
    });
  });
});
