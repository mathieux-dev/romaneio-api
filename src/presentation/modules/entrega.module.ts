import { Module } from '@nestjs/common';
import { EntregaController } from '../controllers/entrega.controller';
import { CriarEntregaUseCase } from '../../core/use-cases/entrega/criar-entrega.use-case';
import { ListarEntregasPorRomaneioUseCase } from '../../core/use-cases/entrega/listar-entregas-por-romaneio.use-case';
import { AtualizarStatusEntregaUseCase } from '../../core/use-cases/entrega/atualizar-status-entrega.use-case';
import { EntregaRepository } from '../../infrastructure/repositories/entrega.repository';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { RomaneioModule } from './romaneio.module';

@Module({
  imports: [DatabaseModule, RomaneioModule],
  controllers: [EntregaController],
  providers: [
    {
      provide: 'IEntregaRepository',
      useClass: EntregaRepository,
    },
    CriarEntregaUseCase,
    ListarEntregasPorRomaneioUseCase,
    AtualizarStatusEntregaUseCase,
  ],
  exports: [
    CriarEntregaUseCase,
    ListarEntregasPorRomaneioUseCase,
    AtualizarStatusEntregaUseCase,
  ],
})
export class EntregaModule {}
