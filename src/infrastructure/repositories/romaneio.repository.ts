import { Injectable, Inject } from '@nestjs/common';
import { Knex } from 'knex';
import { IRomaneioRepository } from '../../core/domain/repositories/romaneio.repository.interface';
import { Romaneio, RomaneioStatus } from '../../core/domain/entities/romaneio.entity';
import { Entrega, EntregaStatus } from '../../core/domain/entities/entrega.entity';

@Injectable()
export class RomaneioRepository implements IRomaneioRepository {
  constructor(@Inject('KNEX_CONNECTION') private readonly knex: Knex) {}

  async criar(
    romaneio: Omit<Romaneio, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Romaneio> {
    const [created] = await this.knex('romaneios')
      .insert({
        numero_romaneio: romaneio.numeroRomaneio,
        data_emissao: romaneio.dataEmissao,
        motorista_id: romaneio.motoristaId,
        veiculo: romaneio.veiculo,
        status: romaneio.status || RomaneioStatus.ABERTO,
      })
      .returning('*');

    return this.mapToEntity(created);
  }

  async buscarPorId(id: number): Promise<Romaneio | null> {
    const romaneioRow = await this.knex('romaneios').where({ id }).first();

    if (!romaneioRow) {
      return null;
    }

    const entregasRows = await this.knex('entregas')
      .where({ romaneio_id: id })
      .select('*');

    const romaneio = this.mapToEntity(romaneioRow);
    romaneio.entregas = entregasRows.map((row) => this.mapEntregaToEntity(row));

    return romaneio;
  }

  async listarTodos(): Promise<Romaneio[]> {
    const results = await this.knex('romaneios').select('*');

    return results.map((row) => this.mapToEntity(row));
  }

  async atualizarStatus(
    id: number,
    status: RomaneioStatus,
  ): Promise<Romaneio> {
    const [updated] = await this.knex('romaneios')
      .where({ id })
      .update({
        status,
        updated_at: this.knex.fn.now(),
      })
      .returning('*');

    return this.mapToEntity(updated);
  }

  async deletar(id: number): Promise<void> {
    await this.knex('romaneios').where({ id }).delete();
  }

  private mapToEntity(row: any): Romaneio {
    return new Romaneio({
      id: row.id,
      numeroRomaneio: row.numero_romaneio,
      dataEmissao: row.data_emissao,
      motoristaId: row.motorista_id,
      veiculo: row.veiculo,
      status: row.status as RomaneioStatus,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    });
  }

  private mapEntregaToEntity(row: any): Entrega {
    return new Entrega({
      id: row.id,
      romaneioId: row.romaneio_id,
      cliente: row.cliente,
      endereco: row.endereco,
      valor: parseFloat(row.valor),
      status: row.status as EntregaStatus,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    });
  }
}
