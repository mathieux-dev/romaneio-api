import { Romaneio, RomaneioStatus } from '../entities/romaneio.entity';

export interface IRomaneioRepository {
  criar(romaneio: Omit<Romaneio, 'id' | 'createdAt' | 'updatedAt'>): Promise<Romaneio>;
  buscarPorId(id: number): Promise<Romaneio | null>;
  listarTodos(): Promise<Romaneio[]>;
  atualizarStatus(id: number, status: RomaneioStatus): Promise<Romaneio>;
  deletar(id: number): Promise<void>;
}
