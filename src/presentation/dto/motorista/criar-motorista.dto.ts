import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Matches, Length } from 'class-validator';

export class CriarMotoristaDto {
  @ApiProperty({
    description: 'Nome completo do motorista',
    example: 'João da Silva',
    minLength: 3,
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @Length(3, 255, { message: 'O nome deve ter entre 3 e 255 caracteres' })
  nome: string;

  @ApiProperty({
    description: 'CPF do motorista (apenas números)',
    example: '12345678901',
    minLength: 11,
    maxLength: 11,
  })
  @IsString()
  @IsNotEmpty({ message: 'O CPF é obrigatório' })
  @Length(11, 11, { message: 'O CPF deve ter exatamente 11 dígitos' })
  @Matches(/^\d{11}$/, { message: 'O CPF deve conter apenas números' })
  cpf: string;

  @ApiProperty({
    description: 'Telefone do motorista',
    example: '11987654321',
    minLength: 10,
    maxLength: 20,
  })
  @IsString()
  @IsNotEmpty({ message: 'O telefone é obrigatório' })
  @Length(10, 20, { message: 'O telefone deve ter entre 10 e 20 caracteres' })
  telefone: string;
}
