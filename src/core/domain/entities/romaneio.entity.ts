export enum RomaneioStatus {
  ABERTO = 'Aberto',
  EM_TRANSITO = 'Em trânsito',
  FINALIZADO = 'Finalizado',
}

export class Romaneio {
  id: number;
  numeroRomaneio: string;
  dataEmissao: Date;
  motoristaId: number;
  veiculo: string;
  status: RomaneioStatus;
  entregas?: Entrega[];
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<Romaneio>) {
    Object.assign(this, data);
  }
}

// Import for type reference
import { Entrega } from './entrega.entity';
