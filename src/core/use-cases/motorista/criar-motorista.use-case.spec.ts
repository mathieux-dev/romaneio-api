import { CriarMotoristaUseCase } from './criar-motorista.use-case';
import { IMotoristaRepository } from '../../domain/repositories/motorista.repository.interface';
import { Motorista } from '../../domain/entities/motorista.entity';
import { ConflictException } from '../../../shared/exceptions';

describe('CriarMotoristaUseCase', () => {
  let useCase: CriarMotoristaUseCase;
  let motoristaRepository: jest.Mocked<IMotoristaRepository>;

  beforeEach(() => {
    motoristaRepository = {
      criar: jest.fn(),
      buscarPorId: jest.fn(),
      buscarPorCpf: jest.fn(),
      listarTodos: jest.fn(),
      atualizar: jest.fn(),
    };

    useCase = new CriarMotoristaUseCase(motoristaRepository);
  });

  it('should create a motorista when CPF is unique', async () => {
    const input = {
      nome: 'João Silva',
      cpf: '12345678901',
      telefone: '11999999999',
    };

    const motoristaCriado = new Motorista({
      id: 1,
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    motoristaRepository.buscarPorCpf.mockResolvedValue(null);
    motoristaRepository.criar.mockResolvedValue(motoristaCriado);

    const result = await useCase.execute(input);

    expect(motoristaRepository.buscarPorCpf).toHaveBeenCalledWith(input.cpf);
    expect(motoristaRepository.criar).toHaveBeenCalledWith({
      nome: input.nome,
      cpf: input.cpf,
      telefone: input.telefone,
    });
    expect(result).toEqual(motoristaCriado);
  });

  it('should throw ConflictException when CPF already exists', async () => {
    const input = {
      nome: 'João Silva',
      cpf: '12345678901',
      telefone: '11999999999',
    };

    const motoristaExistente = new Motorista({
      id: 1,
      nome: 'Maria Santos',
      cpf: '12345678901',
      telefone: '11888888888',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    motoristaRepository.buscarPorCpf.mockResolvedValue(motoristaExistente);

    await expect(useCase.execute(input)).rejects.toThrow(ConflictException);
    await expect(useCase.execute(input)).rejects.toThrow('CPF já cadastrado');
    expect(motoristaRepository.buscarPorCpf).toHaveBeenCalledWith(input.cpf);
    expect(motoristaRepository.criar).not.toHaveBeenCalled();
  });
});
