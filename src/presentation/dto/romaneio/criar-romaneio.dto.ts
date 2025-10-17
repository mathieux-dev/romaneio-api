import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString, IsNumber, IsPositive } from 'class-validator';

export class CriarRomaneioDto {
  @ApiProperty({
    description: 'Número único do romaneio',
    example: 'ROM-2025-001',
    minLength: 1,
    maxLength: 50,
  })
  @IsString({ message: 'O número do romaneio deve ser uma string' })
  @IsNotEmpty({ message: 'O número do romaneio é obrigatório' })
  numeroRomaneio: string;

  @ApiProperty({
    description: 'Data de emissão do romaneio (formato ISO 8601)',
    example: '2025-10-16',
    type: String,
  })
  @IsDateString({}, { message: 'A data de emissão deve estar no formato ISO 8601' })
  @IsNotEmpty({ message: 'A data de emissão é obrigatória' })
  dataEmissao: string;

  @ApiProperty({
    description: 'ID do motorista responsável pelo romaneio',
    example: 1,
    minimum: 1,
  })
  @IsNumber({}, { message: 'O ID do motorista deve ser um número' })
  @IsPositive({ message: 'O ID do motorista deve ser um número positivo' })
  motoristaId: number;

  @ApiProperty({
    description: 'Identificação do veículo (placa)',
    example: 'ABC-1234',
    minLength: 1,
    maxLength: 20,
  })
  @IsString({ message: 'O veículo deve ser uma string' })
  @IsNotEmpty({ message: 'O veículo é obrigatório' })
  veiculo: string;
}
