import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { RomaneioStatus } from '../../../core/domain/entities/romaneio.entity';

export class AtualizarStatusRomaneioDto {
  @ApiProperty({
    description: 'Novo status do romaneio',
    enum: RomaneioStatus,
    example: RomaneioStatus.EM_TRANSITO,
    enumName: 'RomaneioStatus',
  })
  @IsEnum(RomaneioStatus, {
    message: 'O status deve ser um dos valores válidos: Aberto, Em trânsito, Finalizado',
  })
  @IsNotEmpty({ message: 'O status é obrigatório' })
  status: RomaneioStatus;
}
