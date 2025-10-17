import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { MotoristaController } from './presentation/controllers/motorista.controller';
import { RomaneioController } from './presentation/controllers/romaneio.controller';
import { EntregaController } from './presentation/controllers/entrega.controller';
import { CriarMotoristaUseCase } from './core/use-cases/motorista/criar-motorista.use-case';
import { CriarRomaneioUseCase } from './core/use-cases/romaneio/criar-romaneio.use-case';
import { CriarEntregaUseCase } from './core/use-cases/entrega/criar-entrega.use-case';

describe('AppModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  describe('Controllers', () => {
    it('should have MotoristaController', () => {
      const controller = module.get<MotoristaController>(MotoristaController);
      expect(controller).toBeDefined();
    });

    it('should have RomaneioController', () => {
      const controller = module.get<RomaneioController>(RomaneioController);
      expect(controller).toBeDefined();
    });

    it('should have EntregaController', () => {
      const controller = module.get<EntregaController>(EntregaController);
      expect(controller).toBeDefined();
    });
  });

  describe('Use Cases', () => {
    it('should have CriarMotoristaUseCase', () => {
      const useCase = module.get<CriarMotoristaUseCase>(CriarMotoristaUseCase);
      expect(useCase).toBeDefined();
    });

    it('should have CriarRomaneioUseCase', () => {
      const useCase = module.get<CriarRomaneioUseCase>(CriarRomaneioUseCase);
      expect(useCase).toBeDefined();
    });

    it('should have CriarEntregaUseCase', () => {
      const useCase = module.get<CriarEntregaUseCase>(CriarEntregaUseCase);
      expect(useCase).toBeDefined();
    });
  });

  describe('Repository Tokens', () => {
    it('should have IMotoristaRepository token', () => {
      const repository = module.get('IMotoristaRepository');
      expect(repository).toBeDefined();
    });

    it('should have IRomaneioRepository token', () => {
      const repository = module.get('IRomaneioRepository');
      expect(repository).toBeDefined();
    });

    it('should have IEntregaRepository token', () => {
      const repository = module.get('IEntregaRepository');
      expect(repository).toBeDefined();
    });
  });

  describe('Database Connection', () => {
    it('should have KNEX_CONNECTION token', () => {
      const connection = module.get('KNEX_CONNECTION');
      expect(connection).toBeDefined();
    });
  });
});
