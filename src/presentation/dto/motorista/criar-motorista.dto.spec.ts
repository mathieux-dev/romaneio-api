import { validate } from 'class-validator';
import { CriarMotoristaDto } from './criar-motorista.dto';

describe('CriarMotoristaDto', () => {
  it('should pass validation with valid data', async () => {
    const dto = new CriarMotoristaDto();
    dto.nome = 'João da Silva';
    dto.cpf = '12345678901';
    dto.telefone = '11987654321';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  describe('nome validation', () => {
    it('should fail when nome is empty', async () => {
      const dto = new CriarMotoristaDto();
      dto.nome = '';
      dto.cpf = '12345678901';
      dto.telefone = '11987654321';

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('nome');
    });

    it('should fail when nome is not provided', async () => {
      const dto = new CriarMotoristaDto();
      dto.cpf = '12345678901';
      dto.telefone = '11987654321';

      const errors = await validate(dto);
      const nomeError = errors.find((e) => e.property === 'nome');
      expect(nomeError).toBeDefined();
    });

    it('should fail when nome is too short', async () => {
      const dto = new CriarMotoristaDto();
      dto.nome = 'Jo';
      dto.cpf = '12345678901';
      dto.telefone = '11987654321';

      const errors = await validate(dto);
      const nomeError = errors.find((e) => e.property === 'nome');
      expect(nomeError).toBeDefined();
    });

    it('should fail when nome is too long', async () => {
      const dto = new CriarMotoristaDto();
      dto.nome = 'a'.repeat(256);
      dto.cpf = '12345678901';
      dto.telefone = '11987654321';

      const errors = await validate(dto);
      const nomeError = errors.find((e) => e.property === 'nome');
      expect(nomeError).toBeDefined();
    });

    it('should fail when nome is not a string', async () => {
      const dto = new CriarMotoristaDto();
      (dto as any).nome = 123;
      dto.cpf = '12345678901';
      dto.telefone = '11987654321';

      const errors = await validate(dto);
      const nomeError = errors.find((e) => e.property === 'nome');
      expect(nomeError).toBeDefined();
    });
  });

  describe('cpf validation', () => {
    it('should fail when cpf is empty', async () => {
      const dto = new CriarMotoristaDto();
      dto.nome = 'João da Silva';
      dto.cpf = '';
      dto.telefone = '11987654321';

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const cpfError = errors.find((e) => e.property === 'cpf');
      expect(cpfError).toBeDefined();
    });

    it('should fail when cpf is not provided', async () => {
      const dto = new CriarMotoristaDto();
      dto.nome = 'João da Silva';
      dto.telefone = '11987654321';

      const errors = await validate(dto);
      const cpfError = errors.find((e) => e.property === 'cpf');
      expect(cpfError).toBeDefined();
    });

    it('should fail when cpf has less than 11 digits', async () => {
      const dto = new CriarMotoristaDto();
      dto.nome = 'João da Silva';
      dto.cpf = '1234567890';
      dto.telefone = '11987654321';

      const errors = await validate(dto);
      const cpfError = errors.find((e) => e.property === 'cpf');
      expect(cpfError).toBeDefined();
    });

    it('should fail when cpf has more than 11 digits', async () => {
      const dto = new CriarMotoristaDto();
      dto.nome = 'João da Silva';
      dto.cpf = '123456789012';
      dto.telefone = '11987654321';

      const errors = await validate(dto);
      const cpfError = errors.find((e) => e.property === 'cpf');
      expect(cpfError).toBeDefined();
    });

    it('should fail when cpf contains non-numeric characters', async () => {
      const dto = new CriarMotoristaDto();
      dto.nome = 'João da Silva';
      dto.cpf = '123.456.789-01';
      dto.telefone = '11987654321';

      const errors = await validate(dto);
      const cpfError = errors.find((e) => e.property === 'cpf');
      expect(cpfError).toBeDefined();
    });

    it('should fail when cpf contains letters', async () => {
      const dto = new CriarMotoristaDto();
      dto.nome = 'João da Silva';
      dto.cpf = '1234567890a';
      dto.telefone = '11987654321';

      const errors = await validate(dto);
      const cpfError = errors.find((e) => e.property === 'cpf');
      expect(cpfError).toBeDefined();
    });

    it('should fail when cpf is not a string', async () => {
      const dto = new CriarMotoristaDto();
      dto.nome = 'João da Silva';
      (dto as any).cpf = 12345678901;
      dto.telefone = '11987654321';

      const errors = await validate(dto);
      const cpfError = errors.find((e) => e.property === 'cpf');
      expect(cpfError).toBeDefined();
    });
  });

  describe('telefone validation', () => {
    it('should fail when telefone is empty', async () => {
      const dto = new CriarMotoristaDto();
      dto.nome = 'João da Silva';
      dto.cpf = '12345678901';
      dto.telefone = '';

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const telefoneError = errors.find((e) => e.property === 'telefone');
      expect(telefoneError).toBeDefined();
    });

    it('should fail when telefone is not provided', async () => {
      const dto = new CriarMotoristaDto();
      dto.nome = 'João da Silva';
      dto.cpf = '12345678901';

      const errors = await validate(dto);
      const telefoneError = errors.find((e) => e.property === 'telefone');
      expect(telefoneError).toBeDefined();
    });

    it('should fail when telefone is too short', async () => {
      const dto = new CriarMotoristaDto();
      dto.nome = 'João da Silva';
      dto.cpf = '12345678901';
      dto.telefone = '123456789';

      const errors = await validate(dto);
      const telefoneError = errors.find((e) => e.property === 'telefone');
      expect(telefoneError).toBeDefined();
    });

    it('should fail when telefone is too long', async () => {
      const dto = new CriarMotoristaDto();
      dto.nome = 'João da Silva';
      dto.cpf = '12345678901';
      dto.telefone = '1'.repeat(21);

      const errors = await validate(dto);
      const telefoneError = errors.find((e) => e.property === 'telefone');
      expect(telefoneError).toBeDefined();
    });

    it('should fail when telefone is not a string', async () => {
      const dto = new CriarMotoristaDto();
      dto.nome = 'João da Silva';
      dto.cpf = '12345678901';
      (dto as any).telefone = 11987654321;

      const errors = await validate(dto);
      const telefoneError = errors.find((e) => e.property === 'telefone');
      expect(telefoneError).toBeDefined();
    });

    it('should pass with minimum length telefone', async () => {
      const dto = new CriarMotoristaDto();
      dto.nome = 'João da Silva';
      dto.cpf = '12345678901';
      dto.telefone = '1198765432';

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should pass with maximum length telefone', async () => {
      const dto = new CriarMotoristaDto();
      dto.nome = 'João da Silva';
      dto.cpf = '12345678901';
      dto.telefone = '1'.repeat(20);

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });
  });
});
