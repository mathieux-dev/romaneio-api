import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infrastructure/database/database.module';
import { MotoristaModule } from './presentation/modules/motorista.module';
import { RomaneioModule } from './presentation/modules/romaneio.module';
import { EntregaModule } from './presentation/modules/entrega.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    MotoristaModule,
    RomaneioModule,
    EntregaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
