export class Motorista {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<Motorista>) {
    Object.assign(this, data);
  }
}
