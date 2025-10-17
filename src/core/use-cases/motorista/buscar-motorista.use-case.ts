import { Injectable, Inject } from '@nestjs/common';
import { IMotoristaRepository } from '../../domain/repositories/motorista.repository.interface';
import { Motorista } from '../../domain/entities/motorista.entity';
import { NotFoundException } from '../../../shared/exceptions';

@Injectable()
export class BuscarMotoristaUseCase {
  constructor(
    @Inject('IMotoristaRepository')
    private readonly motoristaRepository: IMotoristaRepository,
  ) {}

  async execute(id: number): Promise<Motorista> {
    const motorista = await this.motoristaRepository.buscarPorId(id);

    if (!motorista) {
      throw new NotFoundException('Motorista não encontrado');
    }

    return motorista;
  }
}
