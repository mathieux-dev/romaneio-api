import { Injectable, Inject } from '@nestjs/common';
import { IMotoristaRepository } from '../../domain/repositories/motorista.repository.interface';
import { Motorista } from '../../domain/entities/motorista.entity';
import { NotFoundException } from '../../../shared/exceptions';

export interface AtualizarMotoristaInput {
  nome?: string;
  telefone?: string;
}

@Injectable()
export class AtualizarMotoristaUseCase {
  constructor(
    @Inject('IMotoristaRepository')
    private readonly motoristaRepository: IMotoristaRepository,
  ) {}

  async execute(
    id: number,
    input: AtualizarMotoristaInput,
  ): Promise<Motorista> {
    // Validar se motorista existe
    const motoristaExistente = await this.motoristaRepository.buscarPorId(id);

    if (!motoristaExistente) {
      throw new NotFoundException('Motorista não encontrado');
    }

    // Atualizar motorista
    const motoristaAtualizado = await this.motoristaRepository.atualizar(
      id,
      input,
    );

    return motoristaAtualizado;
  }
}
