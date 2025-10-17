import { Injectable, Inject } from '@nestjs/common';
import { IEntregaRepository } from '../../domain/repositories/entrega.repository.interface';
import { IRomaneioRepository } from '../../domain/repositories/romaneio.repository.interface';
import { Entrega, EntregaStatus } from '../../domain/entities/entrega.entity';
import { NotFoundException, ValidationException } from '../../../shared/exceptions';

export interface CriarEntregaInput {
  romaneioId: number;
  cliente: string;
  endereco: string;
  valor: number;
}

@Injectable()
export class CriarEntregaUseCase {
  constructor(
    @Inject('IEntregaRepository')
    private readonly entregaRepository: IEntregaRepository,
    @Inject('IRomaneioRepository')
    private readonly romaneioRepository: IRomaneioRepository,
  ) {}

  async execute(input: CriarEntregaInput): Promise<Entrega> {
    // Validar se romaneio existe
    const romaneio = await this.romaneioRepository.buscarPorId(input.romaneioId);
    if (!romaneio) {
      throw new NotFoundException(`Romaneio com ID ${input.romaneioId} não encontrado`);
    }

    // Validar valor positivo
    if (input.valor <= 0) {
      throw new ValidationException('O valor da entrega deve ser positivo');
    }

    // Criar entrega com status 'Pendente'
    const entrega = await this.entregaRepository.criar({
      romaneioId: input.romaneioId,
      cliente: input.cliente,
      endereco: input.endereco,
      valor: input.valor,
      status: EntregaStatus.PENDENTE,
    });

    return entrega;
  }
}
