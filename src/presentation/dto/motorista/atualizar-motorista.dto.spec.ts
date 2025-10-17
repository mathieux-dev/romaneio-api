import { validate } from 'class-validator';
import { AtualizarMotoristaDto } from './atualizar-motorista.dto';

describe('AtualizarMotoristaDto', () => {
  it('should pass validation with all fields provided', async () => {
    const dto = new AtualizarMotoristaDto();
    dto.nome = 'João da Silva';
    dto.telefone = '11987654321';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should pass validation with no fields provided (all optional)', async () => {
    const dto = new AtualizarMotoristaDto();

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should pass validation with only nome provided', async () => {
    const dto = new AtualizarMotoristaDto();
    dto.nome = 'João da Silva';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should pass validation with only telefone provided', async () => {
    const dto = new AtualizarMotoristaDto();
    dto.telefone = '11987654321';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  describe('nome validation', () => {
    it('should fail when nome is too short', async () => {
      const dto = new AtualizarMotoristaDto();
      dto.nome = 'Jo';

      const errors = await validate(dto);
      const nomeError = errors.find((e) => e.property === 'nome');
      expect(nomeError).toBeDefined();
    });

    it('should fail when nome is too long', async () => {
      const dto = new AtualizarMotoristaDto();
      dto.nome = 'a'.repeat(256);

      const errors = await validate(dto);
      const nomeError = errors.find((e) => e.property === 'nome');
      expect(nomeError).toBeDefined();
    });

    it('should fail when nome is not a string', async () => {
      const dto = new AtualizarMotoristaDto();
      (dto as any).nome = 123;

      const errors = await validate(dto);
      const nomeError = errors.find((e) => e.property === 'nome');
      expect(nomeError).toBeDefined();
    });

    it('should pass when nome is empty string', async () => {
      const dto = new AtualizarMotoristaDto();
      dto.nome = '';

      const errors = await validate(dto);
      // Empty string should fail length validation
      const nomeError = errors.find((e) => e.property === 'nome');
      expect(nomeError).toBeDefined();
    });

    it('should pass with minimum length nome', async () => {
      const dto = new AtualizarMotoristaDto();
      dto.nome = 'João';

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should pass with maximum length nome', async () => {
      const dto = new AtualizarMotoristaDto();
      dto.nome = 'a'.repeat(255);

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });
  });

  describe('telefone validation', () => {
    it('should fail when telefone is too short', async () => {
      const dto = new AtualizarMotoristaDto();
      dto.telefone = '123456789';

      const errors = await validate(dto);
      const telefoneError = errors.find((e) => e.property === 'telefone');
      expect(telefoneError).toBeDefined();
    });

    it('should fail when telefone is too long', async () => {
      const dto = new AtualizarMotoristaDto();
      dto.telefone = '1'.repeat(21);

      const errors = await validate(dto);
      const telefoneError = errors.find((e) => e.property === 'telefone');
      expect(telefoneError).toBeDefined();
    });

    it('should fail when telefone is not a string', async () => {
      const dto = new AtualizarMotoristaDto();
      (dto as any).telefone = 11987654321;

      const errors = await validate(dto);
      const telefoneError = errors.find((e) => e.property === 'telefone');
      expect(telefoneError).toBeDefined();
    });

    it('should fail when telefone is empty string', async () => {
      const dto = new AtualizarMotoristaDto();
      dto.telefone = '';

      const errors = await validate(dto);
      // Empty string should fail length validation
      const telefoneError = errors.find((e) => e.property === 'telefone');
      expect(telefoneError).toBeDefined();
    });

    it('should pass with minimum length telefone', async () => {
      const dto = new AtualizarMotoristaDto();
      dto.telefone = '1198765432';

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should pass with maximum length telefone', async () => {
      const dto = new AtualizarMotoristaDto();
      dto.telefone = '1'.repeat(20);

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });
  });
});
