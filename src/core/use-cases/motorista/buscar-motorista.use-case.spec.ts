import { BuscarMotoristaUseCase } from './buscar-motorista.use-case';
import { IMotoristaRepository } from '../../domain/repositories/motorista.repository.interface';
import { Motorista } from '../../domain/entities/motorista.entity';
import { NotFoundException } from '../../../shared/exceptions';

describe('BuscarMotoristaUseCase', () => {
  let useCase: BuscarMotoristaUseCase;
  let motoristaRepository: jest.Mocked<IMotoristaRepository>;

  beforeEach(() => {
    motoristaRepository = {
      criar: jest.fn(),
      buscarPorId: jest.fn(),
      buscarPorCpf: jest.fn(),
      listarTodos: jest.fn(),
      atualizar: jest.fn(),
    };

    useCase = new BuscarMotoristaUseCase(motoristaRepository);
  });

  it('should return motorista when found', async () => {
    const motorista = new Motorista({
      id: 1,
      nome: 'João Silva',
      cpf: '12345678901',
      telefone: '11999999999',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    motoristaRepository.buscarPorId.mockResolvedValue(motorista);

    const result = await useCase.execute(1);

    expect(motoristaRepository.buscarPorId).toHaveBeenCalledWith(1);
    expect(result).toEqual(motorista);
  });

  it('should throw NotFoundException when motorista not found', async () => {
    motoristaRepository.buscarPorId.mockResolvedValue(null);

    await expect(useCase.execute(999)).rejects.toThrow(NotFoundException);
    await expect(useCase.execute(999)).rejects.toThrow(
      'Motorista não encontrado',
    );
    expect(motoristaRepository.buscarPorId).toHaveBeenCalledWith(999);
  });
});
