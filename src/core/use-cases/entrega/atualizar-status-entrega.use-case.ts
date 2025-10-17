import { Injectable, Inject } from '@nestjs/common';
import { IEntregaRepository } from '../../domain/repositories/entrega.repository.interface';
import { Entrega, EntregaStatus } from '../../domain/entities/entrega.entity';
import { ValidationException } from '../../../shared/exceptions';

@Injectable()
export class AtualizarStatusEntregaUseCase {
  constructor(
    @Inject('IEntregaRepository')
    private readonly entregaRepository: IEntregaRepository,
  ) {}

  async execute(id: number, novoStatus: EntregaStatus): Promise<Entrega> {
    // Validar transições de status válidas
    this.validarTransicaoStatus(novoStatus);

    const entrega = await this.entregaRepository.atualizarStatus(id, novoStatus);
    return entrega;
  }

  private validarTransicaoStatus(status: EntregaStatus): void {
    const statusValidos = [
      EntregaStatus.PENDENTE,
      EntregaStatus.ENTREGUE,
      EntregaStatus.CANCELADA,
    ];

    if (!statusValidos.includes(status)) {
      throw new ValidationException(
        `Status inválido. Valores permitidos: ${statusValidos.join(', ')}`,
      );
    }
  }
}
