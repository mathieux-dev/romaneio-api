import { Injectable, Inject } from '@nestjs/common';
import { IRomaneioRepository } from '../../domain/repositories/romaneio.repository.interface';
import { Romaneio, RomaneioStatus } from '../../domain/entities/romaneio.entity';
import { NotFoundException, ValidationException } from '../../../shared/exceptions';

@Injectable()
export class AtualizarStatusRomaneioUseCase {
  constructor(
    @Inject('IRomaneioRepository')
    private readonly romaneioRepository: IRomaneioRepository,
  ) {}

  async execute(id: number, novoStatus: RomaneioStatus): Promise<Romaneio> {
    // Verificar se romaneio existe
    const romaneio = await this.romaneioRepository.buscarPorId(id);
    if (!romaneio) {
      throw new NotFoundException(`Romaneio com ID ${id} não encontrado`);
    }

    // Validar transições de status válidas
    this.validarTransicaoStatus(romaneio.status, novoStatus);

    // Atualizar status
    return await this.romaneioRepository.atualizarStatus(id, novoStatus);
  }

  private validarTransicaoStatus(statusAtual: RomaneioStatus, novoStatus: RomaneioStatus): void {
    const transicoesValidas: Record<RomaneioStatus, RomaneioStatus[]> = {
      [RomaneioStatus.ABERTO]: [RomaneioStatus.EM_TRANSITO, RomaneioStatus.FINALIZADO],
      [RomaneioStatus.EM_TRANSITO]: [RomaneioStatus.FINALIZADO],
      [RomaneioStatus.FINALIZADO]: [],
    };

    if (!transicoesValidas[statusAtual].includes(novoStatus)) {
      throw new ValidationException(
        `Transição de status inválida: não é possível mudar de '${statusAtual}' para '${novoStatus}'`
      );
    }
  }
}
