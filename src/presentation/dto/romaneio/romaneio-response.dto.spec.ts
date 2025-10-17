import { RomaneioResponseDto, EntregaNestedDto } from './romaneio-response.dto';
import { Romaneio, RomaneioStatus } from '../../../core/domain/entities/romaneio.entity';
import { Entrega, EntregaStatus } from '../../../core/domain/entities/entrega.entity';

describe('EntregaNestedDto', () => {
  describe('fromEntity', () => {
    it('should convert Entrega entity to EntregaNestedDto', () => {
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

      const dto = EntregaNestedDto.fromEntity(entrega);

      expect(dto).toBeInstanceOf(EntregaNestedDto);
      expect(dto.id).toBe(1);
      expect(dto.romaneioId).toBe(1);
      expect(dto.cliente).toBe('Empresa XYZ Ltda');
      expect(dto.endereco).toBe('Rua das Flores, 123 - São Paulo/SP');
      expect(dto.valor).toBe(150.50);
      expect(dto.status).toBe(EntregaStatus.PENDENTE);
      expect(dto.createdAt).toEqual(new Date('2025-10-16T10:30:00.000Z'));
      expect(dto.updatedAt).toEqual(new Date('2025-10-16T10:30:00.000Z'));
    });

    it('should handle different status values', () => {
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

      const dto = EntregaNestedDto.fromEntity(entrega);

      expect(dto.status).toBe(EntregaStatus.ENTREGUE);
    });
  });
});

describe('RomaneioResponseDto', () => {
  describe('fromEntity', () => {
    it('should convert Romaneio entity to RomaneioResponseDto without entregas', () => {
      const romaneio = new Romaneio({
        id: 1,
        numeroRomaneio: 'ROM-2025-001',
        dataEmissao: new Date('2025-10-16T00:00:00.000Z'),
        motoristaId: 1,
        veiculo: 'ABC-1234',
        status: RomaneioStatus.ABERTO,
        createdAt: new Date('2025-10-16T10:30:00.000Z'),
        updatedAt: new Date('2025-10-16T10:30:00.000Z'),
      });

      const dto = RomaneioResponseDto.fromEntity(romaneio);

      expect(dto).toBeInstanceOf(RomaneioResponseDto);
      expect(dto.id).toBe(1);
      expect(dto.numeroRomaneio).toBe('ROM-2025-001');
      expect(dto.dataEmissao).toEqual(new Date('2025-10-16T00:00:00.000Z'));
      expect(dto.motoristaId).toBe(1);
      expect(dto.veiculo).toBe('ABC-1234');
      expect(dto.status).toBe(RomaneioStatus.ABERTO);
      expect(dto.createdAt).toEqual(new Date('2025-10-16T10:30:00.000Z'));
      expect(dto.updatedAt).toEqual(new Date('2025-10-16T10:30:00.000Z'));
      expect(dto.entregas).toBeUndefined();
    });

    it('should convert Romaneio entity to RomaneioResponseDto with entregas', () => {
      const entregas = [
        new Entrega({
          id: 1,
          romaneioId: 1,
          cliente: 'Empresa XYZ Ltda',
          endereco: 'Rua das Flores, 123 - São Paulo/SP',
          valor: 150.50,
          status: EntregaStatus.PENDENTE,
          createdAt: new Date('2025-10-16T10:30:00.000Z'),
          updatedAt: new Date('2025-10-16T10:30:00.000Z'),
        }),
        new Entrega({
          id: 2,
          romaneioId: 1,
          cliente: 'Cliente ABC',
          endereco: 'Av. Principal, 456',
          valor: 200.00,
          status: EntregaStatus.ENTREGUE,
          createdAt: new Date('2025-10-16T11:00:00.000Z'),
          updatedAt: new Date('2025-10-16T12:00:00.000Z'),
        }),
      ];

      const romaneio = new Romaneio({
        id: 1,
        numeroRomaneio: 'ROM-2025-001',
        dataEmissao: new Date('2025-10-16T00:00:00.000Z'),
        motoristaId: 1,
        veiculo: 'ABC-1234',
        status: RomaneioStatus.EM_TRANSITO,
        entregas,
        createdAt: new Date('2025-10-16T10:30:00.000Z'),
        updatedAt: new Date('2025-10-16T10:30:00.000Z'),
      });

      const dto = RomaneioResponseDto.fromEntity(romaneio);

      expect(dto).toBeInstanceOf(RomaneioResponseDto);
      expect(dto.id).toBe(1);
      expect(dto.numeroRomaneio).toBe('ROM-2025-001');
      expect(dto.status).toBe(RomaneioStatus.EM_TRANSITO);
      expect(dto.entregas).toBeDefined();
      expect(dto.entregas).toHaveLength(2);
      expect(dto.entregas[0]).toBeInstanceOf(EntregaNestedDto);
      expect(dto.entregas[0].id).toBe(1);
      expect(dto.entregas[0].cliente).toBe('Empresa XYZ Ltda');
      expect(dto.entregas[1]).toBeInstanceOf(EntregaNestedDto);
      expect(dto.entregas[1].id).toBe(2);
      expect(dto.entregas[1].cliente).toBe('Cliente ABC');
    });

    it('should handle empty entregas array', () => {
      const romaneio = new Romaneio({
        id: 1,
        numeroRomaneio: 'ROM-2025-001',
        dataEmissao: new Date('2025-10-16T00:00:00.000Z'),
        motoristaId: 1,
        veiculo: 'ABC-1234',
        status: RomaneioStatus.ABERTO,
        entregas: [],
        createdAt: new Date('2025-10-16T10:30:00.000Z'),
        updatedAt: new Date('2025-10-16T10:30:00.000Z'),
      });

      const dto = RomaneioResponseDto.fromEntity(romaneio);

      expect(dto.entregas).toBeDefined();
      expect(dto.entregas).toHaveLength(0);
    });

    it('should handle different status values', () => {
      const romaneio = new Romaneio({
        id: 1,
        numeroRomaneio: 'ROM-2025-001',
        dataEmissao: new Date('2025-10-16T00:00:00.000Z'),
        motoristaId: 1,
        veiculo: 'ABC-1234',
        status: RomaneioStatus.FINALIZADO,
        createdAt: new Date('2025-10-16T10:30:00.000Z'),
        updatedAt: new Date('2025-10-16T10:30:00.000Z'),
      });

      const dto = RomaneioResponseDto.fromEntity(romaneio);

      expect(dto.status).toBe(RomaneioStatus.FINALIZADO);
    });

    it('should preserve all romaneio properties', () => {
      const romaneio = new Romaneio({
        id: 999,
        numeroRomaneio: 'ROM-2025-999',
        dataEmissao: new Date('2025-12-31T23:59:59.999Z'),
        motoristaId: 42,
        veiculo: 'XYZ-9999',
        status: RomaneioStatus.EM_TRANSITO,
        createdAt: new Date('2025-10-01T00:00:00.000Z'),
        updatedAt: new Date('2025-10-16T15:45:30.000Z'),
      });

      const dto = RomaneioResponseDto.fromEntity(romaneio);

      expect(dto.id).toBe(999);
      expect(dto.numeroRomaneio).toBe('ROM-2025-999');
      expect(dto.dataEmissao).toEqual(new Date('2025-12-31T23:59:59.999Z'));
      expect(dto.motoristaId).toBe(42);
      expect(dto.veiculo).toBe('XYZ-9999');
      expect(dto.status).toBe(RomaneioStatus.EM_TRANSITO);
      expect(dto.createdAt).toEqual(new Date('2025-10-01T00:00:00.000Z'));
      expect(dto.updatedAt).toEqual(new Date('2025-10-16T15:45:30.000Z'));
    });
  });
});
