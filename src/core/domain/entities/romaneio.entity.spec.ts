import { Romaneio, RomaneioStatus } from './romaneio.entity';
import { Entrega, EntregaStatus } from './entrega.entity';

describe('Romaneio Entity', () => {
  describe('constructor', () => {
    it('should create a romaneio with all properties', () => {
      const now = new Date();
      const romaneioData = {
        id: 1,
        numeroRomaneio: 'ROM-2025-001',
        dataEmissao: new Date('2025-10-16'),
        motoristaId: 1,
        veiculo: 'ABC-1234',
        status: RomaneioStatus.ABERTO,
        createdAt: now,
        updatedAt: now,
      };

      const romaneio = new Romaneio(romaneioData);

      expect(romaneio.id).toBe(1);
      expect(romaneio.numeroRomaneio).toBe('ROM-2025-001');
      expect(romaneio.dataEmissao).toEqual(new Date('2025-10-16'));
      expect(romaneio.motoristaId).toBe(1);
      expect(romaneio.veiculo).toBe('ABC-1234');
      expect(romaneio.status).toBe(RomaneioStatus.ABERTO);
      expect(romaneio.createdAt).toBe(now);
      expect(romaneio.updatedAt).toBe(now);
    });

    it('should create a romaneio with partial properties', () => {
      const romaneio = new Romaneio({
        numeroRomaneio: 'ROM-2025-002',
        veiculo: 'XYZ-5678',
      });

      expect(romaneio.numeroRomaneio).toBe('ROM-2025-002');
      expect(romaneio.veiculo).toBe('XYZ-5678');
      expect(romaneio.id).toBeUndefined();
      expect(romaneio.status).toBeUndefined();
    });

    it('should create a romaneio with entregas', () => {
      const entrega1 = new Entrega({
        id: 1,
        romaneioId: 1,
        cliente: 'Cliente 1',
        endereco: 'Endereço 1',
        valor: 100,
        status: EntregaStatus.PENDENTE,
      });

      const entrega2 = new Entrega({
        id: 2,
        romaneioId: 1,
        cliente: 'Cliente 2',
        endereco: 'Endereço 2',
        valor: 200,
        status: EntregaStatus.PENDENTE,
      });

      const romaneio = new Romaneio({
        id: 1,
        numeroRomaneio: 'ROM-2025-003',
        entregas: [entrega1, entrega2],
      });

      expect(romaneio.entregas).toHaveLength(2);
      expect(romaneio.entregas?.[0].cliente).toBe('Cliente 1');
      expect(romaneio.entregas?.[1].cliente).toBe('Cliente 2');
    });
  });

  describe('RomaneioStatus enum', () => {
    it('should have ABERTO status', () => {
      expect(RomaneioStatus.ABERTO).toBe('Aberto');
    });

    it('should have EM_TRANSITO status', () => {
      expect(RomaneioStatus.EM_TRANSITO).toBe('Em trânsito');
    });

    it('should have FINALIZADO status', () => {
      expect(RomaneioStatus.FINALIZADO).toBe('Finalizado');
    });

    it('should have exactly 3 status values', () => {
      const statusValues = Object.values(RomaneioStatus);
      expect(statusValues).toHaveLength(3);
    });
  });

  describe('properties', () => {
    it('should store numeroRomaneio as string', () => {
      const romaneio = new Romaneio({ numeroRomaneio: 'ROM-2025-999' });
      expect(typeof romaneio.numeroRomaneio).toBe('string');
      expect(romaneio.numeroRomaneio).toBe('ROM-2025-999');
    });

    it('should store dataEmissao as Date', () => {
      const date = new Date('2025-10-16');
      const romaneio = new Romaneio({ dataEmissao: date });
      expect(romaneio.dataEmissao).toBeInstanceOf(Date);
      expect(romaneio.dataEmissao).toBe(date);
    });

    it('should store motoristaId reference', () => {
      const romaneio = new Romaneio({ motoristaId: 42 });
      expect(romaneio.motoristaId).toBe(42);
    });

    it('should store veiculo plate', () => {
      const romaneio = new Romaneio({ veiculo: 'DEF-9876' });
      expect(romaneio.veiculo).toBe('DEF-9876');
    });

    it('should allow entregas to be undefined', () => {
      const romaneio = new Romaneio({ numeroRomaneio: 'ROM-001' });
      expect(romaneio.entregas).toBeUndefined();
    });

    it('should allow entregas to be empty array', () => {
      const romaneio = new Romaneio({ numeroRomaneio: 'ROM-001', entregas: [] });
      expect(romaneio.entregas).toEqual([]);
    });
  });

  describe('status transitions', () => {
    it('should allow status to be ABERTO', () => {
      const romaneio = new Romaneio({ status: RomaneioStatus.ABERTO });
      expect(romaneio.status).toBe(RomaneioStatus.ABERTO);
    });

    it('should allow status to be EM_TRANSITO', () => {
      const romaneio = new Romaneio({ status: RomaneioStatus.EM_TRANSITO });
      expect(romaneio.status).toBe(RomaneioStatus.EM_TRANSITO);
    });

    it('should allow status to be FINALIZADO', () => {
      const romaneio = new Romaneio({ status: RomaneioStatus.FINALIZADO });
      expect(romaneio.status).toBe(RomaneioStatus.FINALIZADO);
    });
  });
});
