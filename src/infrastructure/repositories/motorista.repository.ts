import { Injectable, Inject } from '@nestjs/common';
import { Knex } from 'knex';
import { IMotoristaRepository } from '../../core/domain/repositories/motorista.repository.interface';
import { Motorista } from '../../core/domain/entities/motorista.entity';

@Injectable()
export class MotoristaRepository implements IMotoristaRepository {
  constructor(@Inject('KNEX_CONNECTION') private readonly knex: Knex) {}

  async criar(
    motorista: Omit<Motorista, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Motorista> {
    const [created] = await this.knex('motoristas')
      .insert({
        nome: motorista.nome,
        cpf: motorista.cpf,
        telefone: motorista.telefone,
      })
      .returning('*');

    return this.mapToEntity(created);
  }

  async buscarPorId(id: number): Promise<Motorista | null> {
    const result = await this.knex('motoristas').where({ id }).first();

    return result ? this.mapToEntity(result) : null;
  }

  async buscarPorCpf(cpf: string): Promise<Motorista | null> {
    const result = await this.knex('motoristas').where({ cpf }).first();

    return result ? this.mapToEntity(result) : null;
  }

  async listarTodos(): Promise<Motorista[]> {
    const results = await this.knex('motoristas').select('*');

    return results.map((row) => this.mapToEntity(row));
  }

  async atualizar(
    id: number,
    dados: Partial<Omit<Motorista, 'id' | 'cpf' | 'createdAt' | 'updatedAt'>>,
  ): Promise<Motorista> {
    const updateData: any = {};

    if (dados.nome !== undefined) {
      updateData.nome = dados.nome;
    }
    if (dados.telefone !== undefined) {
      updateData.telefone = dados.telefone;
    }

    updateData.updated_at = this.knex.fn.now();

    const [updated] = await this.knex('motoristas')
      .where({ id })
      .update(updateData)
      .returning('*');

    return this.mapToEntity(updated);
  }

  private mapToEntity(row: any): Motorista {
    return new Motorista({
      id: row.id,
      nome: row.nome,
      cpf: row.cpf,
      telefone: row.telefone,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    });
  }
}
