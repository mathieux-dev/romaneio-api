import { Module } from '@nestjs/common';
import { RomaneioController } from '../controllers/romaneio.controller';
import { CriarRomaneioUseCase } from '../../core/use-cases/romaneio/criar-romaneio.use-case';
import { ListarRomaneiosUseCase } from '../../core/use-cases/romaneio/listar-romaneios.use-case';
import { BuscarRomaneioUseCase } from '../../core/use-cases/romaneio/buscar-romaneio.use-case';
import { AtualizarStatusRomaneioUseCase } from '../../core/use-cases/romaneio/atualizar-status-romaneio.use-case';
import { DeletarRomaneioUseCase } from '../../core/use-cases/romaneio/deletar-romaneio.use-case';
import { RomaneioRepository } from '../../infrastructure/repositories/romaneio.repository';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { MotoristaModule } from './motorista.module';

@Module({
  imports: [DatabaseModule, MotoristaModule],
  controllers: [RomaneioController],
  providers: [
    {
      provide: 'IRomaneioRepository',
      useClass: RomaneioRepository,
    },
    CriarRomaneioUseCase,
    ListarRomaneiosUseCase,
    BuscarRomaneioUseCase,
    AtualizarStatusRomaneioUseCase,
    DeletarRomaneioUseCase,
  ],
  exports: [
    'IRomaneioRepository',
    CriarRomaneioUseCase,
    ListarRomaneiosUseCase,
    BuscarRomaneioUseCase,
    AtualizarStatusRomaneioUseCase,
    DeletarRomaneioUseCase,
  ],
})
export class RomaneioModule {}
