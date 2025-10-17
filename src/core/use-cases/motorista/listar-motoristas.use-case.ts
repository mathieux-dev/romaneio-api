import { Injectable, Inject } from '@nestjs/common';
import { IMotoristaRepository } from '../../domain/repositories/motorista.repository.interface';
import { Motorista } from '../../domain/entities/motorista.entity';

@Injectable()
export class ListarMotoristasUseCase {
  constructor(
    @Inject('IMotoristaRepository')
    private readonly motoristaRepository: IMotoristaRepository,
  ) {}

  async execute(): Promise<Motorista[]> {
    return this.motoristaRepository.listarTodos();
  }
}
