import { AtualizarMotoristaUseCase } from './atualizar-motorista.use-case';
import { IMotoristaRepository } from '../../domain/repositories/motorista.repository.interface';
import { Motorista } from '../../domain/entities/motorista.entity';
import { NotFoundException } from '../../../shared/exceptions';

describe('AtualizarMotoristaUseCase', () => {
  let useCase: AtualizarMotoristaUseCase;
  let motoristaRepository: jest.Mocked<IMotoristaRepository>;

  beforeEach(() => {
    motoristaRepository = {
      criar: jest.fn(),
      buscarPorId: jest.fn(),
      buscarPorCpf: jest.fn(),
      listarTodos: jest.fn(),
      atualizar: jest.fn(),
    };

    useCase = new AtualizarMotoristaUseCase(motoristaRepository);
  });

  it('should update motorista when exists', async () => {
    const motoristaExistente = new Motorista({
      id: 1,
      nome: 'João Silva',
      cpf: '12345678901',
      telefone: '11999999999',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const input = {
      nome: 'João Silva Santos',
      telefone: '11988888888',
    };

    const motoristaAtualizado = new Motorista({
      ...motoristaExistente,
      ...input,
      updatedAt: new Date(),
    });

    motoristaRepository.buscarPorId.mockResolvedValue(motoristaExistente);
    motoristaRepository.atualizar.mockResolvedValue(motoristaAtualizado);

    const result = await useCase.execute(1, input);

    expect(motoristaRepository.buscarPorId).toHaveBeenCalledWith(1);
    expect(motoristaRepository.atualizar).toHaveBeenCalledWith(1, input);
    expect(result).toEqual(motoristaAtualizado);
  });

  it('should throw NotFoundException when motorista does not exist', async () => {
    const input = {
      nome: 'João Silva Santos',
      telefone: '11988888888',
    };

    motoristaRepository.buscarPorId.mockResolvedValue(null);

    await expect(useCase.execute(999, input)).rejects.toThrow(
      NotFoundException,
    );
    await expect(useCase.execute(999, input)).rejects.toThrow(
      'Motorista não encontrado',
    );
    expect(motoristaRepository.buscarPorId).toHaveBeenCalledWith(999);
    expect(motoristaRepository.atualizar).not.toHaveBeenCalled();
  });

  it('should update only provided fields', async () => {
    const motoristaExistente = new Motorista({
      id: 1,
      nome: 'João Silva',
      cpf: '12345678901',
      telefone: '11999999999',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const input = {
      telefone: '11988888888',
    };

    const motoristaAtualizado = new Motorista({
      ...motoristaExistente,
      telefone: input.telefone,
      updatedAt: new Date(),
    });

    motoristaRepository.buscarPorId.mockResolvedValue(motoristaExistente);
    motoristaRepository.atualizar.mockResolvedValue(motoristaAtualizado);

    const result = await useCase.execute(1, input);

    expect(motoristaRepository.buscarPorId).toHaveBeenCalledWith(1);
    expect(motoristaRepository.atualizar).toHaveBeenCalledWith(1, input);
    expect(result.nome).toBe(motoristaExistente.nome);
    expect(result.telefone).toBe(input.telefone);
  });
});
