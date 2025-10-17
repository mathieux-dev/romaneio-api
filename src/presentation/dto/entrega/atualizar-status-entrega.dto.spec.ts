import { validate } from 'class-validator';
import { AtualizarStatusEntregaDto } from './atualizar-status-entrega.dto';
import { EntregaStatus } from '../../../core/domain/entities/entrega.entity';

describe('AtualizarStatusEntregaDto', () => {
  it('should pass validation with valid status Pendente', async () => {
    const dto = new AtualizarStatusEntregaDto();
    dto.status = EntregaStatus.PENDENTE;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should pass validation with valid status Entregue', async () => {
    const dto = new AtualizarStatusEntregaDto();
    dto.status = EntregaStatus.ENTREGUE;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should pass validation with valid status Cancelada', async () => {
    const dto = new AtualizarStatusEntregaDto();
    dto.status = EntregaStatus.CANCELADA;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  describe('status validation', () => {
    it('should fail when status is not provided', async () => {
      const dto = new AtualizarStatusEntregaDto();

      const errors = await validate(dto);
      const statusError = errors.find((e) => e.property === 'status');
      expect(statusError).toBeDefined();
    });

    it('should fail when status is empty string', async () => {
      const dto = new AtualizarStatusEntregaDto();
      (dto as any).status = '';

      const errors = await validate(dto);
      const statusError = errors.find((e) => e.property === 'status');
      expect(statusError).toBeDefined();
    });

    it('should fail when status is an invalid value', async () => {
      const dto = new AtualizarStatusEntregaDto();
      (dto as any).status = 'InvalidStatus';

      const errors = await validate(dto);
      const statusError = errors.find((e) => e.property === 'status');
      expect(statusError).toBeDefined();
    });

    it('should fail when status is a number', async () => {
      const dto = new AtualizarStatusEntregaDto();
      (dto as any).status = 123;

      const errors = await validate(dto);
      const statusError = errors.find((e) => e.property === 'status');
      expect(statusError).toBeDefined();
    });

    it('should fail when status is null', async () => {
      const dto = new AtualizarStatusEntregaDto();
      (dto as any).status = null;

      const errors = await validate(dto);
      const statusError = errors.find((e) => e.property === 'status');
      expect(statusError).toBeDefined();
    });

    it('should fail when status is undefined', async () => {
      const dto = new AtualizarStatusEntregaDto();
      (dto as any).status = undefined;

      const errors = await validate(dto);
      const statusError = errors.find((e) => e.property === 'status');
      expect(statusError).toBeDefined();
    });

    it('should fail with lowercase status value', async () => {
      const dto = new AtualizarStatusEntregaDto();
      (dto as any).status = 'pendente';

      const errors = await validate(dto);
      const statusError = errors.find((e) => e.property === 'status');
      expect(statusError).toBeDefined();
    });

    it('should fail with partial match', async () => {
      const dto = new AtualizarStatusEntregaDto();
      (dto as any).status = 'Pend';

      const errors = await validate(dto);
      const statusError = errors.find((e) => e.property === 'status');
      expect(statusError).toBeDefined();
    });

    it('should fail with wrong enum value from RomaneioStatus', async () => {
      const dto = new AtualizarStatusEntregaDto();
      (dto as any).status = 'Aberto';

      const errors = await validate(dto);
      const statusError = errors.find((e) => e.property === 'status');
      expect(statusError).toBeDefined();
    });
  });
});
