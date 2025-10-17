import { validate } from 'class-validator';
import { AtualizarStatusRomaneioDto } from './atualizar-status-romaneio.dto';
import { RomaneioStatus } from '../../../core/domain/entities/romaneio.entity';

describe('AtualizarStatusRomaneioDto', () => {
  it('should pass validation with valid status Aberto', async () => {
    const dto = new AtualizarStatusRomaneioDto();
    dto.status = RomaneioStatus.ABERTO;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should pass validation with valid status Em trânsito', async () => {
    const dto = new AtualizarStatusRomaneioDto();
    dto.status = RomaneioStatus.EM_TRANSITO;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should pass validation with valid status Finalizado', async () => {
    const dto = new AtualizarStatusRomaneioDto();
    dto.status = RomaneioStatus.FINALIZADO;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  describe('status validation', () => {
    it('should fail when status is not provided', async () => {
      const dto = new AtualizarStatusRomaneioDto();

      const errors = await validate(dto);
      const statusError = errors.find((e) => e.property === 'status');
      expect(statusError).toBeDefined();
    });

    it('should fail when status is empty string', async () => {
      const dto = new AtualizarStatusRomaneioDto();
      (dto as any).status = '';

      const errors = await validate(dto);
      const statusError = errors.find((e) => e.property === 'status');
      expect(statusError).toBeDefined();
    });

    it('should fail when status is an invalid value', async () => {
      const dto = new AtualizarStatusRomaneioDto();
      (dto as any).status = 'InvalidStatus';

      const errors = await validate(dto);
      const statusError = errors.find((e) => e.property === 'status');
      expect(statusError).toBeDefined();
    });

    it('should fail when status is a number', async () => {
      const dto = new AtualizarStatusRomaneioDto();
      (dto as any).status = 123;

      const errors = await validate(dto);
      const statusError = errors.find((e) => e.property === 'status');
      expect(statusError).toBeDefined();
    });

    it('should fail when status is null', async () => {
      const dto = new AtualizarStatusRomaneioDto();
      (dto as any).status = null;

      const errors = await validate(dto);
      const statusError = errors.find((e) => e.property === 'status');
      expect(statusError).toBeDefined();
    });

    it('should fail when status is undefined', async () => {
      const dto = new AtualizarStatusRomaneioDto();
      (dto as any).status = undefined;

      const errors = await validate(dto);
      const statusError = errors.find((e) => e.property === 'status');
      expect(statusError).toBeDefined();
    });

    it('should fail with lowercase status value', async () => {
      const dto = new AtualizarStatusRomaneioDto();
      (dto as any).status = 'aberto';

      const errors = await validate(dto);
      const statusError = errors.find((e) => e.property === 'status');
      expect(statusError).toBeDefined();
    });

    it('should fail with partial match', async () => {
      const dto = new AtualizarStatusRomaneioDto();
      (dto as any).status = 'Aber';

      const errors = await validate(dto);
      const statusError = errors.find((e) => e.property === 'status');
      expect(statusError).toBeDefined();
    });
  });
});
