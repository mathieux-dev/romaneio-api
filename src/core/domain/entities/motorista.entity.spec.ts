import { Motorista } from './motorista.entity';

describe('Motorista Entity', () => {
  describe('constructor', () => {
    it('should create a motorista with all properties', () => {
      const now = new Date();
      const motoristaData = {
        id: 1,
        nome: 'João Silva',
        cpf: '12345678901',
        telefone: '11987654321',
        createdAt: now,
        updatedAt: now,
      };

      const motorista = new Motorista(motoristaData);

      expect(motorista.id).toBe(1);
      expect(motorista.nome).toBe('João Silva');
      expect(motorista.cpf).toBe('12345678901');
      expect(motorista.telefone).toBe('11987654321');
      expect(motorista.createdAt).toBe(now);
      expect(motorista.updatedAt).toBe(now);
    });

    it('should create a motorista with partial properties', () => {
      const motorista = new Motorista({
        nome: 'Maria Santos',
        cpf: '98765432100',
      });

      expect(motorista.nome).toBe('Maria Santos');
      expect(motorista.cpf).toBe('98765432100');
      expect(motorista.id).toBeUndefined();
      expect(motorista.telefone).toBeUndefined();
    });

    it('should create a motorista with empty object', () => {
      const motorista = new Motorista({});

      expect(motorista.id).toBeUndefined();
      expect(motorista.nome).toBeUndefined();
      expect(motorista.cpf).toBeUndefined();
      expect(motorista.telefone).toBeUndefined();
    });
  });

  describe('properties', () => {
    it('should store CPF as string', () => {
      const motorista = new Motorista({ cpf: '12345678901' });
      expect(typeof motorista.cpf).toBe('string');
      expect(motorista.cpf).toBe('12345678901');
    });

    it('should store telefone with area code', () => {
      const motorista = new Motorista({ telefone: '11987654321' });
      expect(motorista.telefone).toBe('11987654321');
    });

    it('should store nome as string', () => {
      const motorista = new Motorista({ nome: 'Pedro Oliveira' });
      expect(motorista.nome).toBe('Pedro Oliveira');
    });

    it('should store timestamps', () => {
      const createdAt = new Date('2025-01-01');
      const updatedAt = new Date('2025-01-02');
      const motorista = new Motorista({ createdAt, updatedAt });

      expect(motorista.createdAt).toBe(createdAt);
      expect(motorista.updatedAt).toBe(updatedAt);
    });
  });
});
