import { Entrega, EntregaStatus } from '../entities/entrega.entity';

export interface IEntregaRepository {
  criar(entrega: Omit<Entrega, 'id' | 'createdAt' | 'updatedAt'>): Promise<Entrega>;
  listarPorRomaneio(romaneioId: number): Promise<Entrega[]>;
  atualizarStatus(id: number, status: EntregaStatus): Promise<Entrega>;
  deletarPorRomaneio(romaneioId: number): Promise<void>;
}
