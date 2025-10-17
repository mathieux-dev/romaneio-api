import { Module } from '@nestjs/common';
import { MotoristaController } from '../controllers/motorista.controller';
import { CriarMotoristaUseCase } from '../../core/use-cases/motorista/criar-motorista.use-case';
import { ListarMotoristasUseCase } from '../../core/use-cases/motorista/listar-motoristas.use-case';
import { BuscarMotoristaUseCase } from '../../core/use-cases/motorista/buscar-motorista.use-case';
import { AtualizarMotoristaUseCase } from '../../core/use-cases/motorista/atualizar-motorista.use-case';
import { MotoristaRepository } from '../../infrastructure/repositories/motorista.repository';
import { DatabaseModule } from '../../infrastructure/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [MotoristaController],
  providers: [
    {
      provide: 'IMotoristaRepository',
      useClass: MotoristaRepository,
    },
    CriarMotoristaUseCase,
    ListarMotoristasUseCase,
    BuscarMotoristaUseCase,
    AtualizarMotoristaUseCase,
  ],
  exports: [
    'IMotoristaRepository',
    CriarMotoristaUseCase,
    ListarMotoristasUseCase,
    BuscarMotoristaUseCase,
    AtualizarMotoristaUseCase,
  ],
})
export class MotoristaModule {}
