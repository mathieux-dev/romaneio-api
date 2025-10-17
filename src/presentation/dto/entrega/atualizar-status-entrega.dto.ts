import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { EntregaStatus } from '../../../core/domain/entities/entrega.entity';

export class AtualizarStatusEntregaDto {
  @ApiProperty({
    description: 'Novo status da entrega',
    enum: EntregaStatus,
    example: EntregaStatus.ENTREGUE,
    enumName: 'EntregaStatus',
  })
  @IsEnum(EntregaStatus, {
    message: 'O status deve ser um dos valores válidos: Pendente, Entregue, Cancelada',
  })
  @IsNotEmpty({ message: 'O status é obrigatório' })
  status: EntregaStatus;
}
