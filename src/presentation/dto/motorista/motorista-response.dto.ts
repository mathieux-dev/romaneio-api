import { ApiProperty } from '@nestjs/swagger';
import { Motorista } from '../../../core/domain/entities/motorista.entity';

export class MotoristaResponseDto {
  @ApiProperty({
    description: 'ID único do motorista',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Nome completo do motorista',
    example: 'João da Silva',
  })
  nome: string;

  @ApiProperty({
    description: 'CPF do motorista',
    example: '12345678901',
  })
  cpf: string;

  @ApiProperty({
    description: 'Telefone do motorista',
    example: '11987654321',
  })
  telefone: string;

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

  static fromEntity(motorista: Motorista): MotoristaResponseDto {
    const dto = new MotoristaResponseDto();
    dto.id = motorista.id;
    dto.nome = motorista.nome;
    dto.cpf = motorista.cpf;
    dto.telefone = motorista.telefone;
    dto.createdAt = motorista.createdAt;
    dto.updatedAt = motorista.updatedAt;
    return dto;
  }
}
