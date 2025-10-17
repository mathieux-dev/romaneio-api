import { MotoristaResponseDto } from './motorista-response.dto';
import { Motorista } from '../../../core/domain/entities/motorista.entity';

describe('MotoristaResponseDto', () => {
  describe('fromEntity', () => {
    it('should convert Motorista entity to MotoristaResponseDto', () => {
      const motorista: Motorista = {
        id: 1,
        nome: 'João da Silva',
        cpf: '12345678901',
        telefone: '11987654321',
        createdAt: new Date('2025-10-16T10:30:00.000Z'),
        updatedAt: new Date('2025-10-16T10:30:00.000Z'),
      };

      const dto = MotoristaResponseDto.fromEntity(motorista);

      expect(dto).toBeInstanceOf(MotoristaResponseDto);
      expect(dto.id).toBe(1);
      expect(dto.nome).toBe('João da Silva');
      expect(dto.cpf).toBe('12345678901');
      expect(dto.telefone).toBe('11987654321');
      expect(dto.createdAt).toEqual(new Date('2025-10-16T10:30:00.000Z'));
      expect(dto.updatedAt).toEqual(new Date('2025-10-16T10:30:00.000Z'));
    });

    it('should handle different motorista data', () => {
      const motorista: Motorista = {
        id: 999,
        nome: 'Maria Santos',
        cpf: '98765432100',
        telefone: '21912345678',
        createdAt: new Date('2025-01-01T00:00:00.000Z'),
        updatedAt: new Date('2025-01-02T00:00:00.000Z'),
      };

      const dto = MotoristaResponseDto.fromEntity(motorista);

      expect(dto.id).toBe(999);
      expect(dto.nome).toBe('Maria Santos');
      expect(dto.cpf).toBe('98765432100');
      expect(dto.telefone).toBe('21912345678');
      expect(dto.createdAt).toEqual(new Date('2025-01-01T00:00:00.000Z'));
      expect(dto.updatedAt).toEqual(new Date('2025-01-02T00:00:00.000Z'));
    });

    it('should preserve all entity properties', () => {
      const now = new Date();
      const motorista: Motorista = {
        id: 42,
        nome: 'Pedro Oliveira',
        cpf: '11122233344',
        telefone: '85988776655',
        createdAt: now,
        updatedAt: now,
      };

      const dto = MotoristaResponseDto.fromEntity(motorista);

      expect(dto).toHaveProperty('id');
      expect(dto).toHaveProperty('nome');
      expect(dto).toHaveProperty('cpf');
      expect(dto).toHaveProperty('telefone');
      expect(dto).toHaveProperty('createdAt');
      expect(dto).toHaveProperty('updatedAt');
    });
  });
});
