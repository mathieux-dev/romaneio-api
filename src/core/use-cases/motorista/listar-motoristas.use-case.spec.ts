import { ListarMotoristasUseCase } from './listar-motoristas.use-case';
import { IMotoristaRepository } from '../../domain/repositories/motorista.repository.interface';
import { Motorista } from '../../domain/entities/motorista.entity';

describe('ListarMotoristasUseCase', () => {
  let useCase: ListarMotoristasUseCase;
  let motoristaRepository: jest.Mocked<IMotoristaRepository>;

  beforeEach(() => {
    motoristaRepository = {
      criar: jest.fn(),
      buscarPorId: jest.fn(),
      buscarPorCpf: jest.fn(),
      listarTodos: jest.fn(),
      atualizar: jest.fn(),
    };

    useCase = new ListarMotoristasUseCase(motoristaRepository);
  });

  it('should return all motoristas', async () => {
    const motoristas = [
      new Motorista({
        id: 1,
        nome: 'João Silva',
        cpf: '12345678901',
        telefone: '11999999999',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      new Motorista({
        id: 2,
        nome: 'Maria Santos',
        cpf: '98765432100',
        telefone: '11888888888',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    ];

    motoristaRepository.listarTodos.mockResolvedValue(motoristas);

    const result = await useCase.execute();

    expect(motoristaRepository.listarTodos).toHaveBeenCalled();
    expect(result).toEqual(motoristas);
    expect(result).toHaveLength(2);
  });

  it('should return empty array when no motoristas exist', async () => {
    motoristaRepository.listarTodos.mockResolvedValue([]);

    const result = await useCase.execute();

    expect(motoristaRepository.listarTodos).toHaveBeenCalled();
    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });
});
