import { Injectable, Inject } from '@nestjs/common';
import { IRomaneioRepository } from '../../domain/repositories/romaneio.repository.interface';
import { Romaneio } from '../../domain/entities/romaneio.entity';
import { NotFoundException } from '../../../shared/exceptions';

@Injectable()
export class BuscarRomaneioUseCase {
  constructor(
    @Inject('IRomaneioRepository')
    private readonly romaneioRepository: IRomaneioRepository,
  ) {}

  async execute(id: number): Promise<Romaneio> {
    const romaneio = await this.romaneioRepository.buscarPorId(id);
    
    if (!romaneio) {
      throw new NotFoundException(`Romaneio com ID ${id} não encontrado`);
    }

    return romaneio;
  }
}
