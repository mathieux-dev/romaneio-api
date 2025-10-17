import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { CriarEntregaUseCase } from '../../core/use-cases/entrega/criar-entrega.use-case';
import { ListarEntregasPorRomaneioUseCase } from '../../core/use-cases/entrega/listar-entregas-por-romaneio.use-case';
import { AtualizarStatusEntregaUseCase } from '../../core/use-cases/entrega/atualizar-status-entrega.use-case';
import { CriarEntregaDto } from '../dto/entrega/criar-entrega.dto';
import { AtualizarStatusEntregaDto } from '../dto/entrega/atualizar-status-entrega.dto';
import { EntregaResponseDto } from '../dto/entrega/entrega-response.dto';

@Controller('entregas')
@ApiTags('Entregas')
export class EntregaController {
  constructor(
    private readonly criarEntregaUseCase: CriarEntregaUseCase,
    private readonly listarEntregasPorRomaneioUseCase: ListarEntregasPorRomaneioUseCase,
    private readonly atualizarStatusEntregaUseCase: AtualizarStatusEntregaUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar nova entrega' })
  @ApiResponse({
    status: 201,
    description: 'Entrega criada com sucesso',
    type: EntregaResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Romaneio não encontrado',
  })
  async criar(
    @Body() dto: CriarEntregaDto,
  ): Promise<EntregaResponseDto> {
    const entrega = await this.criarEntregaUseCase.execute({
      romaneioId: dto.romaneioId,
      cliente: dto.cliente,
      endereco: dto.endereco,
      valor: dto.valor,
    });
    return EntregaResponseDto.fromEntity(entrega);
  }

  @Get()
  @ApiOperation({ summary: 'Listar entregas por romaneio' })
  @ApiQuery({
    name: 'romaneio_id',
    description: 'ID do romaneio para filtrar entregas',
    type: Number,
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de entregas retornada com sucesso',
    type: [EntregaResponseDto],
  })
  async listar(
    @Query('romaneio_id', ParseIntPipe) romaneioId: number,
  ): Promise<EntregaResponseDto[]> {
    const entregas = await this.listarEntregasPorRomaneioUseCase.execute(romaneioId);
    return entregas.map((entrega) =>
      EntregaResponseDto.fromEntity(entrega),
    );
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Atualizar status da entrega' })
  @ApiParam({
    name: 'id',
    description: 'ID da entrega',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Status da entrega atualizado com sucesso',
    type: EntregaResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou transição de status inválida',
  })
  @ApiResponse({
    status: 404,
    description: 'Entrega não encontrada',
  })
  async atualizarStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AtualizarStatusEntregaDto,
  ): Promise<EntregaResponseDto> {
    const entrega = await this.atualizarStatusEntregaUseCase.execute(id, dto.status);
    return EntregaResponseDto.fromEntity(entrega);
  }
}
