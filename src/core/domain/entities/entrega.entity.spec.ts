import { Entrega, EntregaStatus } from './entrega.entity';

describe('Entrega Entity', () => {
  describe('constructor', () => {
    it('should create an entrega with all properties', () => {
      const now = new Date();
      const entregaData = {
        id: 1,
        romaneioId: 1,
        cliente: 'Cliente Teste',
        endereco: 'Rua Teste, 123',
        valor: 150.50,
        status: EntregaStatus.PENDENTE,
        createdAt: now,
        updatedAt: now,
      };

      const entrega = new Entrega(entregaData);

      expect(entrega.id).toBe(1);
      expect(entrega.romaneioId).toBe(1);
      expect(entrega.cliente).toBe('Cliente Teste');
      expect(entrega.endereco).toBe('Rua Teste, 123');
      expect(entrega.valor).toBe(150.50);
      expect(entrega.status).toBe(EntregaStatus.PENDENTE);
      expect(entrega.createdAt).toBe(now);
      expect(entrega.updatedAt).toBe(now);
    });

    it('should create an entrega with partial properties', () => {
      const entrega = new Entrega({
        cliente: 'Cliente Parcial',
        endereco: 'Endereço Parcial',
        valor: 100,
      });

      expect(entrega.cliente).toBe('Cliente Parcial');
      expect(entrega.endereco).toBe('Endereço Parcial');
      expect(entrega.valor).toBe(100);
      expect(entrega.id).toBeUndefined();
    });
  });

  describe('EntregaStatus enum', () => {
    it('should have PENDENTE status', () => {
      expect(EntregaStatus.PENDENTE).toBe('Pendente');
    });

    it('should have ENTREGUE status', () => {
      expect(EntregaStatus.ENTREGUE).toBe('Entregue');
    });

    it('should have CANCELADA status', () => {
      expect(EntregaStatus.CANCELADA).toBe('Cancelada');
    });

    it('should have exactly 3 status values', () => {
      const statusValues = Object.values(EntregaStatus);
      expect(statusValues).toHaveLength(3);
    });
  });

  describe('properties', () => {
    it('should allow positive valor', () => {
      const entrega = new Entrega({ valor: 500.75 });
      expect(entrega.valor).toBe(500.75);
    });

    it('should allow zero valor', () => {
      const entrega = new Entrega({ valor: 0 });
      expect(entrega.valor).toBe(0);
    });

    it('should store romaneioId reference', () => {
      const entrega = new Entrega({ romaneioId: 42 });
      expect(entrega.romaneioId).toBe(42);
    });
  });
});
