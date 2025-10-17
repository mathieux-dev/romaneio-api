export enum EntregaStatus {
  PENDENTE = 'Pendente',
  ENTREGUE = 'Entregue',
  CANCELADA = 'Cancelada',
}

export class Entrega {
  id: number;
  romaneioId: number;
  cliente: string;
  endereco: string;
  valor: number;
  status: EntregaStatus;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<Entrega>) {
    Object.assign(this, data);
  }
}
