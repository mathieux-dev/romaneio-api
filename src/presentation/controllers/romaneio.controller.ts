import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
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
import { CriarRomaneioUseCase } from '../../core/use-cases/romaneio/criar-romaneio.use-case';
import { ListarRomaneiosUseCase } from '../../core/use-cases/romaneio/listar-romaneios.use-case';
import { BuscarRomaneioUseCase } from '../../core/use-cases/romaneio/buscar-romaneio.use-case';
import { AtualizarStatusRomaneioUseCase } from '../../core/use-cases/romaneio/atualizar-status-romaneio.use-case';
import { DeletarRomaneioUseCase } from '../../core/use-cases/romaneio/deletar-romaneio.use-case';
import { CriarRomaneioDto } from '../dto/romaneio/criar-romaneio.dto';
import { AtualizarStatusRomaneioDto } from '../dto/romaneio/atualizar-status-romaneio.dto';
import { RomaneioResponseDto } from '../dto/romaneio/romaneio-response.dto';

@Controller('romaneios')
@ApiTags('Romaneios')
export class RomaneioController {
  constructor(
    private readonly criarRomaneioUseCase: CriarRomaneioUseCase,
    private readonly listarRomaneiosUseCase: ListarRomaneiosUseCase,
    private readonly buscarRomaneioUseCase: BuscarRomaneioUseCase,
    private readonly atualizarStatusRomaneioUseCase: AtualizarStatusRomaneioUseCase,
    private readonly deletarRomaneioUseCase: DeletarRomaneioUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar novo romaneio' })
  @ApiResponse({
    status: 201,
    description: 'Romaneio criado com sucesso',
    type: RomaneioResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Motorista não encontrado',
  })
  async criar(
    @Body() dto: CriarRomaneioDto,
  ): Promise<RomaneioResponseDto> {
    const romaneio = await this.criarRomaneioUseCase.execute({
      numeroRomaneio: dto.numeroRomaneio,
      dataEmissao: new Date(dto.dataEmissao),
      motoristaId: dto.motoristaId,
      veiculo: dto.veiculo,
    });
    return RomaneioResponseDto.fromEntity(romaneio);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os romaneios' })
  @ApiResponse({
    status: 200,
    description: 'Lista de romaneios retornada com sucesso',
    type: [RomaneioResponseDto],
  })
  async listar(): Promise<RomaneioResponseDto[]> {
    const romaneios = await this.listarRomaneiosUseCase.execute();
    return romaneios.map((romaneio) =>
      RomaneioResponseDto.fromEntity(romaneio),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar romaneio por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID do romaneio',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Romaneio encontrado',
    type: RomaneioResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Romaneio não encontrado',
  })
  async buscarPorId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RomaneioResponseDto> {
    const romaneio = await this.buscarRomaneioUseCase.execute(id);
    return RomaneioResponseDto.fromEntity(romaneio);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Atualizar status do romaneio' })
  @ApiParam({
    name: 'id',
    description: 'ID do romaneio',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Status do romaneio atualizado com sucesso',
    type: RomaneioResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou transição de status inválida',
  })
  @ApiResponse({
    status: 404,
    description: 'Romaneio não encontrado',
  })
  async atualizarStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AtualizarStatusRomaneioDto,
  ): Promise<RomaneioResponseDto> {
    const romaneio = await this.atualizarStatusRomaneioUseCase.execute(id, dto.status);
    return RomaneioResponseDto.fromEntity(romaneio);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar romaneio' })
  @ApiParam({
    name: 'id',
    description: 'ID do romaneio',
    type: Number,
  })
  @ApiResponse({
    status: 204,
    description: 'Romaneio deletado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Romaneio não encontrado',
  })
  async deletar(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.deletarRomaneioUseCase.execute(id);
  }
}
