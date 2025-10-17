import { Injectable, Inject } from '@nestjs/common';
import { IRomaneioRepository } from '../../domain/repositories/romaneio.repository.interface';
import { Romaneio } from '../../domain/entities/romaneio.entity';

@Injectable()
export class ListarRomaneiosUseCase {
  constructor(
    @Inject('IRomaneioRepository')
    private readonly romaneioRepository: IRomaneioRepository,
  ) {}

  async execute(): Promise<Romaneio[]> {
    return await this.romaneioRepository.listarTodos();
  }
}
