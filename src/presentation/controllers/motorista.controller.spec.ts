import { Test, TestingModule } from '@nestjs/testing';
import { MotoristaController } from './motorista.controller';
import { CriarMotoristaUseCase } from '../../core/use-cases/motorista/criar-motorista.use-case';
import { ListarMotoristasUseCase } from '../../core/use-cases/motorista/listar-motoristas.use-case';
import { BuscarMotoristaUseCase } from '../../core/use-cases/motorista/buscar-motorista.use-case';
import { AtualizarMotoristaUseCase } from '../../core/use-cases/motorista/atualizar-motorista.use-case';
import { Motorista } from '../../core/domain/entities/motorista.entity';
import { CriarMotoristaDto } from '../dto/motorista/criar-motorista.dto';
import { AtualizarMotoristaDto } from '../dto/motorista/atualizar-motorista.dto';

describe('MotoristaController', () => {
  let controller: MotoristaController;
  let criarMotoristaUseCase: jest.Mocked<CriarMotoristaUseCase>;
  let listarMotoristasUseCase: jest.Mocked<ListarMotoristasUseCase>;
  let buscarMotoristaUseCase: jest.Mocked<BuscarMotoristaUseCase>;
  let atualizarMotoristaUseCase: jest.Mocked<AtualizarMotoristaUseCase>;

  const mockMotorista: Motorista = new Motorista({
    id: 1,
    nome: 'João da Silva',
    cpf: '12345678901',
    telefone: '11987654321',
    createdAt: new Date('2025-10-16T10:00:00Z'),
    updatedAt: new Date('2025-10-16T10:00:00Z'),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MotoristaController],
      providers: [
        {
          provide: CriarMotoristaUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: ListarMotoristasUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: BuscarMotoristaUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: AtualizarMotoristaUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MotoristaController>(MotoristaController);
    criarMotoristaUseCase = module.get(CriarMotoristaUseCase);
    listarMotoristasUseCase = module.get(ListarMotoristasUseCase);
    buscarMotoristaUseCase = module.get(BuscarMotoristaUseCase);
    atualizarMotoristaUseCase = module.get(AtualizarMotoristaUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('criar', () => {
    it('should create a motorista and return response DTO', async () => {
      const dto: CriarMotoristaDto = {
        nome: 'João da Silva',
        cpf: '12345678901',
        telefone: '11987654321',
      };

      criarMotoristaUseCase.execute.mockResolvedValue(mockMotorista);

      const result = await controller.criar(dto);

      expect(criarMotoristaUseCase.execute).toHaveBeenCalledWith(dto);
      expect(result).toEqual({
        id: mockMotorista.id,
        nome: mockMotorista.nome,
        cpf: mockMotorista.cpf,
        telefone: mockMotorista.telefone,
        createdAt: mockMotorista.createdAt,
        updatedAt: mockMotorista.updatedAt,
      });
    });
  });

  describe('listar', () => {
    it('should return an array of motorista response DTOs', async () => {
      const motoristas = [mockMotorista];
      listarMotoristasUseCase.execute.mockResolvedValue(motoristas);

      const result = await controller.listar();

      expect(listarMotoristasUseCase.execute).toHaveBeenCalled();
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        id: mockMotorista.id,
        nome: mockMotorista.nome,
        cpf: mockMotorista.cpf,
        telefone: mockMotorista.telefone,
        createdAt: mockMotorista.createdAt,
        updatedAt: mockMotorista.updatedAt,
      });
    });

    it('should return an empty array when no motoristas exist', async () => {
      listarMotoristasUseCase.execute.mockResolvedValue([]);

      const result = await controller.listar();

      expect(listarMotoristasUseCase.execute).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('buscarPorId', () => {
    it('should return a motorista response DTO', async () => {
      buscarMotoristaUseCase.execute.mockResolvedValue(mockMotorista);

      const result = await controller.buscarPorId(1);

      expect(buscarMotoristaUseCase.execute).toHaveBeenCalledWith(1);
      expect(result).toEqual({
        id: mockMotorista.id,
        nome: mockMotorista.nome,
        cpf: mockMotorista.cpf,
        telefone: mockMotorista.telefone,
        createdAt: mockMotorista.createdAt,
        updatedAt: mockMotorista.updatedAt,
      });
    });
  });

  describe('atualizar', () => {
    it('should update a motorista and return response DTO', async () => {
      const dto: AtualizarMotoristaDto = {
        nome: 'João Pedro da Silva',
      };

      const updatedMotorista = new Motorista({
        ...mockMotorista,
        nome: dto.nome!,
        updatedAt: new Date('2025-10-16T11:00:00Z'),
      });

      atualizarMotoristaUseCase.execute.mockResolvedValue(updatedMotorista);

      const result = await controller.atualizar(1, dto);

      expect(atualizarMotoristaUseCase.execute).toHaveBeenCalledWith(1, dto);
      expect(result.nome).toBe(dto.nome);
      expect(result.id).toBe(mockMotorista.id);
    });
  });
});
