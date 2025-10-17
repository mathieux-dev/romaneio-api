import { validate } from 'class-validator';
import { CriarEntregaDto } from './criar-entrega.dto';

describe('CriarEntregaDto', () => {
  it('should pass validation with valid data', async () => {
    const dto = new CriarEntregaDto();
    dto.romaneioId = 1;
    dto.cliente = 'Empresa XYZ Ltda';
    dto.endereco = 'Rua das Flores, 123 - São Paulo/SP';
    dto.valor = 150.50;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  describe('romaneioId validation', () => {
    it('should fail when romaneioId is not provided', async () => {
      const dto = new CriarEntregaDto();
      dto.cliente = 'Empresa XYZ Ltda';
      dto.endereco = 'Rua das Flores, 123 - São Paulo/SP';
      dto.valor = 150.50;

      const errors = await validate(dto);
      const romaneioError = errors.find((e) => e.property === 'romaneioId');
      expect(romaneioError).toBeDefined();
    });

    it('should fail when romaneioId is not a number', async () => {
      const dto = new CriarEntregaDto();
      (dto as any).romaneioId = '1';
      dto.cliente = 'Empresa XYZ Ltda';
      dto.endereco = 'Rua das Flores, 123 - São Paulo/SP';
      dto.valor = 150.50;

      const errors = await validate(dto);
      const romaneioError = errors.find((e) => e.property === 'romaneioId');
      expect(romaneioError).toBeDefined();
    });

    it('should fail when romaneioId is zero', async () => {
      const dto = new CriarEntregaDto();
      dto.romaneioId = 0;
      dto.cliente = 'Empresa XYZ Ltda';
      dto.endereco = 'Rua das Flores, 123 - São Paulo/SP';
      dto.valor = 150.50;

      const errors = await validate(dto);
      const romaneioError = errors.find((e) => e.property === 'romaneioId');
      expect(romaneioError).toBeDefined();
    });

    it('should fail when romaneioId is negative', async () => {
      const dto = new CriarEntregaDto();
      dto.romaneioId = -1;
      dto.cliente = 'Empresa XYZ Ltda';
      dto.endereco = 'Rua das Flores, 123 - São Paulo/SP';
      dto.valor = 150.50;

      const errors = await validate(dto);
      const romaneioError = errors.find((e) => e.property === 'romaneioId');
      expect(romaneioError).toBeDefined();
    });

    it('should pass with positive romaneioId', async () => {
      const dto = new CriarEntregaDto();
      dto.romaneioId = 999;
      dto.cliente = 'Empresa XYZ Ltda';
      dto.endereco = 'Rua das Flores, 123 - São Paulo/SP';
      dto.valor = 150.50;

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });
  });

  describe('cliente validation', () => {
    it('should fail when cliente is empty', async () => {
      const dto = new CriarEntregaDto();
      dto.romaneioId = 1;
      dto.cliente = '';
      dto.endereco = 'Rua das Flores, 123 - São Paulo/SP';
      dto.valor = 150.50;

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const clienteError = errors.find((e) => e.property === 'cliente');
      expect(clienteError).toBeDefined();
    });

    it('should fail when cliente is not provided', async () => {
      const dto = new CriarEntregaDto();
      dto.romaneioId = 1;
      dto.endereco = 'Rua das Flores, 123 - São Paulo/SP';
      dto.valor = 150.50;

      const errors = await validate(dto);
      const clienteError = errors.find((e) => e.property === 'cliente');
      expect(clienteError).toBeDefined();
    });

    it('should fail when cliente is not a string', async () => {
      const dto = new CriarEntregaDto();
      dto.romaneioId = 1;
      (dto as any).cliente = 123;
      dto.endereco = 'Rua das Flores, 123 - São Paulo/SP';
      dto.valor = 150.50;

      const errors = await validate(dto);
      const clienteError = errors.find((e) => e.property === 'cliente');
      expect(clienteError).toBeDefined();
    });
  });

  describe('endereco validation', () => {
    it('should fail when endereco is empty', async () => {
      const dto = new CriarEntregaDto();
      dto.romaneioId = 1;
      dto.cliente = 'Empresa XYZ Ltda';
      dto.endereco = '';
      dto.valor = 150.50;

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const enderecoError = errors.find((e) => e.property === 'endereco');
      expect(enderecoError).toBeDefined();
    });

    it('should fail when endereco is not provided', async () => {
      const dto = new CriarEntregaDto();
      dto.romaneioId = 1;
      dto.cliente = 'Empresa XYZ Ltda';
      dto.valor = 150.50;

      const errors = await validate(dto);
      const enderecoError = errors.find((e) => e.property === 'endereco');
      expect(enderecoError).toBeDefined();
    });

    it('should fail when endereco is not a string', async () => {
      const dto = new CriarEntregaDto();
      dto.romaneioId = 1;
      dto.cliente = 'Empresa XYZ Ltda';
      (dto as any).endereco = 123;
      dto.valor = 150.50;

      const errors = await validate(dto);
      const enderecoError = errors.find((e) => e.property === 'endereco');
      expect(enderecoError).toBeDefined();
    });
  });

  describe('valor validation', () => {
    it('should fail when valor is not provided', async () => {
      const dto = new CriarEntregaDto();
      dto.romaneioId = 1;
      dto.cliente = 'Empresa XYZ Ltda';
      dto.endereco = 'Rua das Flores, 123 - São Paulo/SP';

      const errors = await validate(dto);
      const valorError = errors.find((e) => e.property === 'valor');
      expect(valorError).toBeDefined();
    });

    it('should fail when valor is not a number', async () => {
      const dto = new CriarEntregaDto();
      dto.romaneioId = 1;
      dto.cliente = 'Empresa XYZ Ltda';
      dto.endereco = 'Rua das Flores, 123 - São Paulo/SP';
      (dto as any).valor = '150.50';

      const errors = await validate(dto);
      const valorError = errors.find((e) => e.property === 'valor');
      expect(valorError).toBeDefined();
    });

    it('should fail when valor is zero', async () => {
      const dto = new CriarEntregaDto();
      dto.romaneioId = 1;
      dto.cliente = 'Empresa XYZ Ltda';
      dto.endereco = 'Rua das Flores, 123 - São Paulo/SP';
      dto.valor = 0;

      const errors = await validate(dto);
      const valorError = errors.find((e) => e.property === 'valor');
      expect(valorError).toBeDefined();
    });

    it('should fail when valor is negative', async () => {
      const dto = new CriarEntregaDto();
      dto.romaneioId = 1;
      dto.cliente = 'Empresa XYZ Ltda';
      dto.endereco = 'Rua das Flores, 123 - São Paulo/SP';
      dto.valor = -50.00;

      const errors = await validate(dto);
      const valorError = errors.find((e) => e.property === 'valor');
      expect(valorError).toBeDefined();
    });

    it('should pass with positive valor', async () => {
      const dto = new CriarEntregaDto();
      dto.romaneioId = 1;
      dto.cliente = 'Empresa XYZ Ltda';
      dto.endereco = 'Rua das Flores, 123 - São Paulo/SP';
      dto.valor = 999.99;

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should pass with decimal valor', async () => {
      const dto = new CriarEntregaDto();
      dto.romaneioId = 1;
      dto.cliente = 'Empresa XYZ Ltda';
      dto.endereco = 'Rua das Flores, 123 - São Paulo/SP';
      dto.valor = 0.01;

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });
  });
});
