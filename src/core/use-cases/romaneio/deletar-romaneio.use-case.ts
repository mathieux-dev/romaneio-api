import { Injectable, Inject } from '@nestjs/common';
import { IRomaneioRepository } from '../../domain/repositories/romaneio.repository.interface';
import { NotFoundException } from '../../../shared/exceptions';

@Injectable()
export class DeletarRomaneioUseCase {
  constructor(
    @Inject('IRomaneioRepository')
    private readonly romaneioRepository: IRomaneioRepository,
  ) {}

  async execute(id: number): Promise<void> {
    // Verificar se romaneio existe
    const romaneio = await this.romaneioRepository.buscarPorId(id);
    if (!romaneio) {
      throw new NotFoundException(`Romaneio com ID ${id} não encontrado`);
    }

    // Deletar romaneio (entregas associadas serão removidas por cascade)
    await this.romaneioRepository.deletar(id);
  }
}
