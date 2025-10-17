import { Module, Global, OnModuleInit, Logger, Inject } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import knex, { Knex } from 'knex';
import { knexConfig } from './knex.config';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'KNEX_CONNECTION',
      useFactory: (): Knex => {
        return knex(knexConfig);
      },
    },
  ],
  exports: ['KNEX_CONNECTION'],
})
export class DatabaseModule implements OnModuleInit {
  private readonly logger = new Logger(DatabaseModule.name);

  constructor(
    @Inject('KNEX_CONNECTION') private readonly knexConnection: Knex,
  ) {}

  async onModuleInit() {
    try {
      await this.knexConnection.raw('SELECT 1');
      this.logger.log('✅ Database connection established successfully');
    } catch (error) {
      this.logger.error('❌ Failed to connect to database', error);
      throw error;
    }
  }
}
