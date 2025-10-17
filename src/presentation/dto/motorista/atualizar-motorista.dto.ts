import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, Length } from 'class-validator';

export class AtualizarMotoristaDto {
  @ApiProperty({
    description: 'Nome completo do motorista',
    example: 'João da Silva',
    minLength: 3,
    maxLength: 255,
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(3, 255, { message: 'O nome deve ter entre 3 e 255 caracteres' })
  nome?: string;

  @ApiProperty({
    description: 'Telefone do motorista',
    example: '11987654321',
    minLength: 10,
    maxLength: 20,
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(10, 20, { message: 'O telefone deve ter entre 10 e 20 caracteres' })
  telefone?: string;
}
