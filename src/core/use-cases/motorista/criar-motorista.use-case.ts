import { Injectable, Inject } from '@nestjs/common';
import { IMotoristaRepository } from '../../domain/repositories/motorista.repository.interface';
import { Motorista } from '../../domain/entities/motorista.entity';
import { ConflictException } from '../../../shared/exceptions';

export interface CriarMotoristaInput {
  nome: string;
  cpf: string;
  telefone: string;
}

@Injectable()
export class CriarMotoristaUseCase {
  constructor(
    @Inject('IMotoristaRepository')
    private readonly motoristaRepository: IMotoristaRepository,
  ) {}

  async execute(input: CriarMotoristaInput): Promise<Motorista> {
    // Validar se CPF já existe
    const motoristaExistente = await this.motoristaRepository.buscarPorCpf(
      input.cpf,
    );

    if (motoristaExistente) {
      throw new ConflictException('CPF já cadastrado');
    }

    // Criar motorista
    const motorista = await this.motoristaRepository.criar({
      nome: input.nome,
      cpf: input.cpf,
      telefone: input.telefone,
    });

    return motorista;
  }
}
