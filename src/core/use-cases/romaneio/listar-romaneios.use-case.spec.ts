import { Test, TestingModule } from '@nestjs/testing';
import { ListarRomaneiosUseCase } from './listar-romaneios.use-case';
import { IRomaneioRepository } from '../../domain/repositories/romaneio.repository.interface';
import { Romaneio, RomaneioStatus } from '../../domain/entities/romaneio.entity';

describe('ListarRomaneiosUseCase', () => {
  let useCase: ListarRomaneiosUseCase;
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
        ListarRomaneiosUseCase,
        {
          provide: 'IRomaneioRepository',
          useValue: mockRomaneioRepository,
        },
      ],
    }).compile();

    useCase = module.get<ListarRomaneiosUseCase>(ListarRomaneiosUseCase);
    romaneioRepository = module.get('IRomaneioRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return all romaneios', async () => {
      const romaneios: Romaneio[] = [
        {
          id: 1,
          numeroRomaneio: 'ROM-001',
          dataEmissao: new Date('2025-10-16'),
          motoristaId: 1,
          veiculo: 'ABC-1234',
          status: RomaneioStatus.ABERTO,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          numeroRomaneio: 'ROM-002',
          dataEmissao: new Date('2025-10-17'),
          motoristaId: 2,
          veiculo: 'XYZ-5678',
          status: RomaneioStatus.EM_TRANSITO,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      romaneioRepository.listarTodos.mockResolvedValue(romaneios);

      const result = await useCase.execute();

      expect(romaneioRepository.listarTodos).toHaveBeenCalled();
      expect(result).toEqual(romaneios);
      expect(result).toHaveLength(2);
    });

    it('should return empty array when no romaneios exist', async () => {
      romaneioRepository.listarTodos.mockResolvedValue([]);

      const result = await useCase.execute();

      expect(romaneioRepository.listarTodos).toHaveBeenCalled();
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });
});
