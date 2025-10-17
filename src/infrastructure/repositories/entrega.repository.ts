import { Injectable, Inject } from '@nestjs/common';
import { Knex } from 'knex';
import { IEntregaRepository } from '../../core/domain/repositories/entrega.repository.interface';
import { Entrega, EntregaStatus } from '../../core/domain/entities/entrega.entity';

@Injectable()
export class EntregaRepository implements IEntregaRepository {
  constructor(@Inject('KNEX_CONNECTION') private readonly knex: Knex) {}

  async criar(
    entrega: Omit<Entrega, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Entrega> {
    const [created] = await this.knex('entregas')
      .insert({
        romaneio_id: entrega.romaneioId,
        cliente: entrega.cliente,
        endereco: entrega.endereco,
        valor: entrega.valor,
        status: entrega.status || EntregaStatus.PENDENTE,
      })
      .returning('*');

    return this.mapToEntity(created);
  }

  async listarPorRomaneio(romaneioId: number): Promise<Entrega[]> {
    const results = await this.knex('entregas')
      .where({ romaneio_id: romaneioId })
      .select('*');

    return results.map((row) => this.mapToEntity(row));
  }

  async atualizarStatus(id: number, status: EntregaStatus): Promise<Entrega> {
    const [updated] = await this.knex('entregas')
      .where({ id })
      .update({
        status,
        updated_at: this.knex.fn.now(),
      })
      .returning('*');

    if (!updated) {
      const { NotFoundException } = require('../../shared/exceptions');
      throw new NotFoundException(`Entrega com ID ${id} não encontrada`);
    }

    return this.mapToEntity(updated);
  }

  async deletarPorRomaneio(romaneioId: number): Promise<void> {
    await this.knex('entregas').where({ romaneio_id: romaneioId }).delete();
  }

  private mapToEntity(row: any): Entrega {
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
