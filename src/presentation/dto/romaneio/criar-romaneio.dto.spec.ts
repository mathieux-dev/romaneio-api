import { validate } from 'class-validator';
import { CriarRomaneioDto } from './criar-romaneio.dto';

describe('CriarRomaneioDto', () => {
  it('should pass validation with valid data', async () => {
    const dto = new CriarRomaneioDto();
    dto.numeroRomaneio = 'ROM-2025-001';
    dto.dataEmissao = '2025-10-16';
    dto.motoristaId = 1;
    dto.veiculo = 'ABC-1234';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  describe('numeroRomaneio validation', () => {
    it('should fail when numeroRomaneio is empty', async () => {
      const dto = new CriarRomaneioDto();
      dto.numeroRomaneio = '';
      dto.dataEmissao = '2025-10-16';
      dto.motoristaId = 1;
      dto.veiculo = 'ABC-1234';

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('numeroRomaneio');
    });

    it('should fail when numeroRomaneio is not provided', async () => {
      const dto = new CriarRomaneioDto();
      dto.dataEmissao = '2025-10-16';
      dto.motoristaId = 1;
      dto.veiculo = 'ABC-1234';

      const errors = await validate(dto);
      const numeroError = errors.find((e) => e.property === 'numeroRomaneio');
      expect(numeroError).toBeDefined();
    });

    it('should fail when numeroRomaneio is not a string', async () => {
      const dto = new CriarRomaneioDto();
      (dto as any).numeroRomaneio = 123;
      dto.dataEmissao = '2025-10-16';
      dto.motoristaId = 1;
      dto.veiculo = 'ABC-1234';

      const errors = await validate(dto);
      const numeroError = errors.find((e) => e.property === 'numeroRomaneio');
      expect(numeroError).toBeDefined();
    });
  });

  describe('dataEmissao validation', () => {
    it('should fail when dataEmissao is empty', async () => {
      const dto = new CriarRomaneioDto();
      dto.numeroRomaneio = 'ROM-2025-001';
      dto.dataEmissao = '';
      dto.motoristaId = 1;
      dto.veiculo = 'ABC-1234';

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const dataError = errors.find((e) => e.property === 'dataEmissao');
      expect(dataError).toBeDefined();
    });

    it('should fail when dataEmissao is not provided', async () => {
      const dto = new CriarRomaneioDto();
      dto.numeroRomaneio = 'ROM-2025-001';
      dto.motoristaId = 1;
      dto.veiculo = 'ABC-1234';

      const errors = await validate(dto);
      const dataError = errors.find((e) => e.property === 'dataEmissao');
      expect(dataError).toBeDefined();
    });

    it('should fail when dataEmissao is not in ISO 8601 format', async () => {
      const dto = new CriarRomaneioDto();
      dto.numeroRomaneio = 'ROM-2025-001';
      dto.dataEmissao = '16/10/2025';
      dto.motoristaId = 1;
      dto.veiculo = 'ABC-1234';

      const errors = await validate(dto);
      const dataError = errors.find((e) => e.property === 'dataEmissao');
      expect(dataError).toBeDefined();
    });

    it('should fail when dataEmissao is an invalid date', async () => {
      const dto = new CriarRomaneioDto();
      dto.numeroRomaneio = 'ROM-2025-001';
      dto.dataEmissao = 'invalid-date';
      dto.motoristaId = 1;
      dto.veiculo = 'ABC-1234';

      const errors = await validate(dto);
      const dataError = errors.find((e) => e.property === 'dataEmissao');
      expect(dataError).toBeDefined();
    });

    it('should pass with ISO 8601 date format', async () => {
      const dto = new CriarRomaneioDto();
      dto.numeroRomaneio = 'ROM-2025-001';
      dto.dataEmissao = '2025-10-16T10:30:00.000Z';
      dto.motoristaId = 1;
      dto.veiculo = 'ABC-1234';

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should pass with simple date format', async () => {
      const dto = new CriarRomaneioDto();
      dto.numeroRomaneio = 'ROM-2025-001';
      dto.dataEmissao = '2025-10-16';
      dto.motoristaId = 1;
      dto.veiculo = 'ABC-1234';

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });
  });

  describe('motoristaId validation', () => {
    it('should fail when motoristaId is not provided', async () => {
      const dto = new CriarRomaneioDto();
      dto.numeroRomaneio = 'ROM-2025-001';
      dto.dataEmissao = '2025-10-16';
      dto.veiculo = 'ABC-1234';

      const errors = await validate(dto);
      const motoristaError = errors.find((e) => e.property === 'motoristaId');
      expect(motoristaError).toBeDefined();
    });

    it('should fail when motoristaId is not a number', async () => {
      const dto = new CriarRomaneioDto();
      dto.numeroRomaneio = 'ROM-2025-001';
      dto.dataEmissao = '2025-10-16';
      (dto as any).motoristaId = '1';
      dto.veiculo = 'ABC-1234';

      const errors = await validate(dto);
      const motoristaError = errors.find((e) => e.property === 'motoristaId');
      expect(motoristaError).toBeDefined();
    });

    it('should fail when motoristaId is zero', async () => {
      const dto = new CriarRomaneioDto();
      dto.numeroRomaneio = 'ROM-2025-001';
      dto.dataEmissao = '2025-10-16';
      dto.motoristaId = 0;
      dto.veiculo = 'ABC-1234';

      const errors = await validate(dto);
      const motoristaError = errors.find((e) => e.property === 'motoristaId');
      expect(motoristaError).toBeDefined();
    });

    it('should fail when motoristaId is negative', async () => {
      const dto = new CriarRomaneioDto();
      dto.numeroRomaneio = 'ROM-2025-001';
      dto.dataEmissao = '2025-10-16';
      dto.motoristaId = -1;
      dto.veiculo = 'ABC-1234';

      const errors = await validate(dto);
      const motoristaError = errors.find((e) => e.property === 'motoristaId');
      expect(motoristaError).toBeDefined();
    });

    it('should pass with positive motoristaId', async () => {
      const dto = new CriarRomaneioDto();
      dto.numeroRomaneio = 'ROM-2025-001';
      dto.dataEmissao = '2025-10-16';
      dto.motoristaId = 999;
      dto.veiculo = 'ABC-1234';

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });
  });

  describe('veiculo validation', () => {
    it('should fail when veiculo is empty', async () => {
      const dto = new CriarRomaneioDto();
      dto.numeroRomaneio = 'ROM-2025-001';
      dto.dataEmissao = '2025-10-16';
      dto.motoristaId = 1;
      dto.veiculo = '';

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const veiculoError = errors.find((e) => e.property === 'veiculo');
      expect(veiculoError).toBeDefined();
    });

    it('should fail when veiculo is not provided', async () => {
      const dto = new CriarRomaneioDto();
      dto.numeroRomaneio = 'ROM-2025-001';
      dto.dataEmissao = '2025-10-16';
      dto.motoristaId = 1;

      const errors = await validate(dto);
      const veiculoError = errors.find((e) => e.property === 'veiculo');
      expect(veiculoError).toBeDefined();
    });

    it('should fail when veiculo is not a string', async () => {
      const dto = new CriarRomaneioDto();
      dto.numeroRomaneio = 'ROM-2025-001';
      dto.dataEmissao = '2025-10-16';
      dto.motoristaId = 1;
      (dto as any).veiculo = 1234;

      const errors = await validate(dto);
      const veiculoError = errors.find((e) => e.property === 'veiculo');
      expect(veiculoError).toBeDefined();
    });
  });
});
