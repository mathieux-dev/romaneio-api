import { Injectable, Inject } from '@nestjs/common';
import { IEntregaRepository } from '../../domain/repositories/entrega.repository.interface';
import { Entrega } from '../../domain/entities/entrega.entity';

@Injectable()
export class ListarEntregasPorRomaneioUseCase {
  constructor(
    @Inject('IEntregaRepository')
    private readonly entregaRepository: IEntregaRepository,
  ) {}

  async execute(romaneioId: number): Promise<Entrega[]> {
    return this.entregaRepository.listarPorRomaneio(romaneioId);
  }
}
