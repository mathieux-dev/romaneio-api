import { ApiProperty } from '@nestjs/swagger';
import { Romaneio, RomaneioStatus } from '../../../core/domain/entities/romaneio.entity';
import { Entrega, EntregaStatus } from '../../../core/domain/entities/entrega.entity';

export class EntregaNestedDto {
  @ApiProperty({
    description: 'ID único da entrega',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'ID do romaneio associado',
    example: 1,
  })
  romaneioId: number;

  @ApiProperty({
    description: 'Nome do cliente',
    example: 'Empresa XYZ Ltda',
  })
  cliente: string;

  @ApiProperty({
    description: 'Endereço de entrega',
    example: 'Rua das Flores, 123 - São Paulo/SP',
  })
  endereco: string;

  @ApiProperty({
    description: 'Valor da entrega',
    example: 150.50,
  })
  valor: number;

  @ApiProperty({
    description: 'Status da entrega',
    enum: EntregaStatus,
    example: EntregaStatus.PENDENTE,
  })
  status: EntregaStatus;

  @ApiProperty({
    description: 'Data de criação do registro',
    example: '2025-10-16T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização do registro',
    example: '2025-10-16T10:30:00.000Z',
  })
  updatedAt: Date;

  static fromEntity(entrega: Entrega): EntregaNestedDto {
    const dto = new EntregaNestedDto();
    dto.id = entrega.id;
    dto.romaneioId = entrega.romaneioId;
    dto.cliente = entrega.cliente;
    dto.endereco = entrega.endereco;
    dto.valor = entrega.valor;
    dto.status = entrega.status;
    dto.createdAt = entrega.createdAt;
    dto.updatedAt = entrega.updatedAt;
    return dto;
  }
}

export class RomaneioResponseDto {
  @ApiProperty({
    description: 'ID único do romaneio',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Número único do romaneio',
    example: 'ROM-2025-001',
  })
  numeroRomaneio: string;

  @ApiProperty({
    description: 'Data de emissão do romaneio',
    example: '2025-10-16T00:00:00.000Z',
  })
  dataEmissao: Date;

  @ApiProperty({
    description: 'ID do motorista responsável',
    example: 1,
  })
  motoristaId: number;

  @ApiProperty({
    description: 'Identificação do veículo',
    example: 'ABC-1234',
  })
  veiculo: string;

  @ApiProperty({
    description: 'Status atual do romaneio',
    enum: RomaneioStatus,
    example: RomaneioStatus.ABERTO,
  })
  status: RomaneioStatus;

  @ApiProperty({
    description: 'Lista de entregas associadas ao romaneio',
    type: [EntregaNestedDto],
    required: false,
  })
  entregas?: EntregaNestedDto[];

  @ApiProperty({
    description: 'Data de criação do registro',
    example: '2025-10-16T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização do registro',
    example: '2025-10-16T10:30:00.000Z',
  })
  updatedAt: Date;

  static fromEntity(romaneio: Romaneio): RomaneioResponseDto {
    const dto = new RomaneioResponseDto();
    dto.id = romaneio.id;
    dto.numeroRomaneio = romaneio.numeroRomaneio;
    dto.dataEmissao = romaneio.dataEmissao;
    dto.motoristaId = romaneio.motoristaId;
    dto.veiculo = romaneio.veiculo;
    dto.status = romaneio.status;
    dto.createdAt = romaneio.createdAt;
    dto.updatedAt = romaneio.updatedAt;

    if (romaneio.entregas) {
      dto.entregas = romaneio.entregas.map((entrega) =>
        EntregaNestedDto.fromEntity(entrega),
      );
    }

    return dto;
  }
}
