import { ApiProperty } from '@nestjs/swagger';
import { Entrega, EntregaStatus } from '../../../core/domain/entities/entrega.entity';

export class EntregaResponseDto {
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
    description: 'Nome do cliente destinatário',
    example: 'Empresa XYZ Ltda',
  })
  cliente: string;

  @ApiProperty({
    description: 'Endereço completo de entrega',
    example: 'Rua das Flores, 123 - São Paulo/SP',
  })
  endereco: string;

  @ApiProperty({
    description: 'Valor da entrega em reais',
    example: 150.50,
  })
  valor: number;

  @ApiProperty({
    description: 'Status atual da entrega',
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

  static fromEntity(entrega: Entrega): EntregaResponseDto {
    const dto = new EntregaResponseDto();
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
