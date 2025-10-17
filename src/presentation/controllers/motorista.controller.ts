import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { CriarMotoristaUseCase } from '../../core/use-cases/motorista/criar-motorista.use-case';
import { ListarMotoristasUseCase } from '../../core/use-cases/motorista/listar-motoristas.use-case';
import { BuscarMotoristaUseCase } from '../../core/use-cases/motorista/buscar-motorista.use-case';
import { AtualizarMotoristaUseCase } from '../../core/use-cases/motorista/atualizar-motorista.use-case';
import { CriarMotoristaDto } from '../dto/motorista/criar-motorista.dto';
import { AtualizarMotoristaDto } from '../dto/motorista/atualizar-motorista.dto';
import { MotoristaResponseDto } from '../dto/motorista/motorista-response.dto';

@Controller('motoristas')
@ApiTags('Motoristas')
export class MotoristaController {
  constructor(
    private readonly criarMotoristaUseCase: CriarMotoristaUseCase,
    private readonly listarMotoristasUseCase: ListarMotoristasUseCase,
    private readonly buscarMotoristaUseCase: BuscarMotoristaUseCase,
    private readonly atualizarMotoristaUseCase: AtualizarMotoristaUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar novo motorista' })
  @ApiResponse({
    status: 201,
    description: 'Motorista criado com sucesso',
    type: MotoristaResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  @ApiResponse({
    status: 409,
    description: 'CPF já cadastrado',
  })
  async criar(
    @Body() dto: CriarMotoristaDto,
  ): Promise<MotoristaResponseDto> {
    const motorista = await this.criarMotoristaUseCase.execute(dto);
    return MotoristaResponseDto.fromEntity(motorista);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os motoristas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de motoristas retornada com sucesso',
    type: [MotoristaResponseDto],
  })
  async listar(): Promise<MotoristaResponseDto[]> {
    const motoristas = await this.listarMotoristasUseCase.execute();
    return motoristas.map((motorista) =>
      MotoristaResponseDto.fromEntity(motorista),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar motorista por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID do motorista',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Motorista encontrado',
    type: MotoristaResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Motorista não encontrado',
  })
  async buscarPorId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MotoristaResponseDto> {
    const motorista = await this.buscarMotoristaUseCase.execute(id);
    return MotoristaResponseDto.fromEntity(motorista);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar dados do motorista' })
  @ApiParam({
    name: 'id',
    description: 'ID do motorista',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Motorista atualizado com sucesso',
    type: MotoristaResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Motorista não encontrado',
  })
  async atualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AtualizarMotoristaDto,
  ): Promise<MotoristaResponseDto> {
    const motorista = await this.atualizarMotoristaUseCase.execute(id, dto);
    return MotoristaResponseDto.fromEntity(motorista);
  }
}
