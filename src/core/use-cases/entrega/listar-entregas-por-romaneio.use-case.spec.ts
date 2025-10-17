import { Test, TestingModule } from '@nestjs/testing';
import { ListarEntregasPorRomaneioUseCase } from './listar-entregas-por-romaneio.use-case';
import { IEntregaRepository } from '../../domain/repositories/entrega.repository.interface';
import { Entrega, EntregaStatus } from '../../domain/entities/entrega.entity';

describe('ListarEntregasPorRomaneioUseCase', () => {
  let useCase: ListarEntregasPorRomaneioUseCase;
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
        ListarEntregasPorRomaneioUseCase,
        {
          provide: 'IEntregaRepository',
          useValue: mockEntregaRepository,
        },
      ],
    }).compile();

    useCase = module.get<ListarEntregasPorRomaneioUseCase>(
      ListarEntregasPorRomaneioUseCase,
    );
    entregaRepository = module.get('IEntregaRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return all entregas for a given romaneio', async () => {
      const romaneioId = 1;
      const expectedEntregas: Entrega[] = [
        {
          id: 1,
          romaneioId: romaneioId,
          cliente: 'Cliente 1',
          endereco: 'Rua A, 123',
          valor: 100.00,
          status: EntregaStatus.PENDENTE,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          romaneioId: romaneioId,
          cliente: 'Cliente 2',
          endereco: 'Rua B, 456',
          valor: 200.00,
          status: EntregaStatus.ENTREGUE,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      entregaRepository.listarPorRomaneio.mockResolvedValue(expectedEntregas);

      const result = await useCase.execute(romaneioId);

      expect(entregaRepository.listarPorRomaneio).toHaveBeenCalledWith(romaneioId);
      expect(result).toEqual(expectedEntregas);
      expect(result).toHaveLength(2);
    });

    it('should return empty array when romaneio has no entregas', async () => {
      const romaneioId = 1;

      entregaRepository.listarPorRomaneio.mockResolvedValue([]);

      const result = await useCase.execute(romaneioId);

      expect(entregaRepository.listarPorRomaneio).toHaveBeenCalledWith(romaneioId);
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('should filter entregas by romaneio correctly', async () => {
      const romaneioId = 2;
      const expectedEntregas: Entrega[] = [
        {
          id: 3,
          romaneioId: romaneioId,
          cliente: 'Cliente 3',
          endereco: 'Rua C, 789',
          valor: 150.00,
          status: EntregaStatus.PENDENTE,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      entregaRepository.listarPorRomaneio.mockResolvedValue(expectedEntregas);

      const result = await useCase.execute(romaneioId);

      expect(entregaRepository.listarPorRomaneio).toHaveBeenCalledWith(romaneioId);
      expect(result).toEqual(expectedEntregas);
      expect(result.every(e => e.romaneioId === romaneioId)).toBe(true);
    });
  });
});
