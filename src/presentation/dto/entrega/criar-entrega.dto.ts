import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CriarEntregaDto {
  @ApiProperty({
    description: 'ID do romaneio ao qual a entrega será associada',
    example: 1,
    minimum: 1,
  })
  @IsNumber({}, { message: 'O ID do romaneio deve ser um número' })
  @IsPositive({ message: 'O ID do romaneio deve ser um número positivo' })
  romaneioId: number;

  @ApiProperty({
    description: 'Nome do cliente destinatário',
    example: 'Empresa XYZ Ltda',
    minLength: 1,
    maxLength: 255,
  })
  @IsString({ message: 'O nome do cliente deve ser uma string' })
  @IsNotEmpty({ message: 'O nome do cliente é obrigatório' })
  cliente: string;

  @ApiProperty({
    description: 'Endereço completo de entrega',
    example: 'Rua das Flores, 123 - São Paulo/SP',
    minLength: 1,
  })
  @IsString({ message: 'O endereço deve ser uma string' })
  @IsNotEmpty({ message: 'O endereço é obrigatório' })
  endereco: string;

  @ApiProperty({
    description: 'Valor da entrega em reais',
    example: 150.50,
    minimum: 0.01,
  })
  @IsNumber({}, { message: 'O valor deve ser um número' })
  @IsPositive({ message: 'O valor deve ser um número positivo' })
  valor: number;
}
