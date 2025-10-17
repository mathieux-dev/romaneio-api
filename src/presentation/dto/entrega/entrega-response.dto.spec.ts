import { EntregaResponseDto } from './entrega-response.dto';
import { Entrega, EntregaStatus } from '../../../core/domain/entities/entrega.entity';

describe('EntregaResponseDto', () => {
  describe('fromEntity', () => {
    it('should convert Entrega entity to EntregaResponseDto', () => {
      const entrega = new Entrega({
        id: 1,
        romaneioId: 1,
        cliente: 'Empresa XYZ Ltda',
        endereco: 'Rua das Flores, 123 - São Paulo/SP',
        valor: 150.50,
        status: EntregaStatus.PENDENTE,
        createdAt: new Date('2025-10-16T10:30:00.000Z'),
        updatedAt: new Date('2025-10-16T10:30:00.000Z'),
      });

      const dto = EntregaResponseDto.fromEntity(entrega);

      expect(dto).toBeInstanceOf(EntregaResponseDto);
      expect(dto.id).toBe(1);
      expect(dto.romaneioId).toBe(1);
      expect(dto.cliente).toBe('Empresa XYZ Ltda');
      expect(dto.endereco).toBe('Rua das Flores, 123 - São Paulo/SP');
      expect(dto.valor).toBe(150.50);
      expect(dto.status).toBe(EntregaStatus.PENDENTE);
      expect(dto.createdAt).toEqual(new Date('2025-10-16T10:30:00.000Z'));
      expect(dto.updatedAt).toEqual(new Date('2025-10-16T10:30:00.000Z'));
    });

    it('should handle status Entregue', () => {
      const entrega = new Entrega({
        id: 2,
        romaneioId: 1,
        cliente: 'Cliente ABC',
        endereco: 'Av. Principal, 456',
        valor: 200.00,
        status: EntregaStatus.ENTREGUE,
        createdAt: new Date('2025-10-16T11:00:00.000Z'),
        updatedAt: new Date('2025-10-16T12:00:00.000Z'),
      });

      const dto = EntregaResponseDto.fromEntity(entrega);

      expect(dto.status).toBe(EntregaStatus.ENTREGUE);
      expect(dto.id).toBe(2);
      expect(dto.cliente).toBe('Cliente ABC');
    });

    it('should handle status Cancelada', () => {
      const entrega = new Entrega({
        id: 3,
        romaneioId: 2,
        cliente: 'Empresa DEF',
        endereco: 'Rua Secundária, 789',
        valor: 75.25,
        status: EntregaStatus.CANCELADA,
        createdAt: new Date('2025-10-16T13:00:00.000Z'),
        updatedAt: new Date('2025-10-16T14:00:00.000Z'),
      });

      const dto = EntregaResponseDto.fromEntity(entrega);

      expect(dto.status).toBe(EntregaStatus.CANCELADA);
      expect(dto.id).toBe(3);
      expect(dto.romaneioId).toBe(2);
    });

    it('should preserve all entrega properties', () => {
      const entrega = new Entrega({
        id: 999,
        romaneioId: 42,
        cliente: 'Cliente Especial XYZ',
        endereco: 'Endereço Completo com Número 9999 - Cidade/Estado - CEP 12345-678',
        valor: 9999.99,
        status: EntregaStatus.PENDENTE,
        createdAt: new Date('2025-01-01T00:00:00.000Z'),
        updatedAt: new Date('2025-12-31T23:59:59.999Z'),
      });

      const dto = EntregaResponseDto.fromEntity(entrega);

      expect(dto.id).toBe(999);
      expect(dto.romaneioId).toBe(42);
      expect(dto.cliente).toBe('Cliente Especial XYZ');
      expect(dto.endereco).toBe('Endereço Completo com Número 9999 - Cidade/Estado - CEP 12345-678');
      expect(dto.valor).toBe(9999.99);
      expect(dto.status).toBe(EntregaStatus.PENDENTE);
      expect(dto.createdAt).toEqual(new Date('2025-01-01T00:00:00.000Z'));
      expect(dto.updatedAt).toEqual(new Date('2025-12-31T23:59:59.999Z'));
    });

    it('should handle decimal values correctly', () => {
      const entrega = new Entrega({
        id: 4,
        romaneioId: 1,
        cliente: 'Cliente Teste',
        endereco: 'Rua Teste, 100',
        valor: 0.01,
        status: EntregaStatus.PENDENTE,
        createdAt: new Date('2025-10-16T10:00:00.000Z'),
        updatedAt: new Date('2025-10-16T10:00:00.000Z'),
      });

      const dto = EntregaResponseDto.fromEntity(entrega);

      expect(dto.valor).toBe(0.01);
    });

    it('should handle large decimal values', () => {
      const entrega = new Entrega({
        id: 5,
        romaneioId: 1,
        cliente: 'Cliente Grande',
        endereco: 'Rua Grande, 500',
        valor: 123456.78,
        status: EntregaStatus.ENTREGUE,
        createdAt: new Date('2025-10-16T10:00:00.000Z'),
        updatedAt: new Date('2025-10-16T10:00:00.000Z'),
      });

      const dto = EntregaResponseDto.fromEntity(entrega);

      expect(dto.valor).toBe(123456.78);
    });
  });
});
