import { Injectable, Inject } from '@nestjs/common';
import { IRomaneioRepository } from '../../domain/repositories/romaneio.repository.interface';
import { IMotoristaRepository } from '../../domain/repositories/motorista.repository.interface';
import { Romaneio, RomaneioStatus } from '../../domain/entities/romaneio.entity';
import { NotFoundException } from '../../../shared/exceptions';

export interface CriarRomaneioInput {
  numeroRomaneio: string;
  dataEmissao: Date;
  motoristaId: number;
  veiculo: string;
}

@Injectable()
export class CriarRomaneioUseCase {
  constructor(
    @Inject('IRomaneioRepository')
    private readonly romaneioRepository: IRomaneioRepository,
    @Inject('IMotoristaRepository')
    private readonly motoristaRepository: IMotoristaRepository,
  ) {}

  async execute(input: CriarRomaneioInput): Promise<Romaneio> {
    // Validar se motorista existe
    const motorista = await this.motoristaRepository.buscarPorId(input.motoristaId);
    if (!motorista) {
      throw new NotFoundException(`Motorista com ID ${input.motoristaId} não encontrado`);
    }

    // Criar romaneio com status 'Aberto'
    const romaneio = await this.romaneioRepository.criar({
      numeroRomaneio: input.numeroRomaneio,
      dataEmissao: input.dataEmissao,
      motoristaId: input.motoristaId,
      veiculo: input.veiculo,
      status: RomaneioStatus.ABERTO,
    });

    return romaneio;
  }
}
