import { Motorista } from '../entities/motorista.entity';

export interface IMotoristaRepository {
  criar(motorista: Omit<Motorista, 'id' | 'createdAt' | 'updatedAt'>): Promise<Motorista>;
  buscarPorId(id: number): Promise<Motorista | null>;
  buscarPorCpf(cpf: string): Promise<Motorista | null>;
  listarTodos(): Promise<Motorista[]>;
  atualizar(
    id: number,
    dados: Partial<Omit<Motorista, 'id' | 'cpf' | 'createdAt' | 'updatedAt'>>,
  ): Promise<Motorista>;
}
