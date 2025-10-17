import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { HttpExceptionFilter } from '../src/shared/filters/http-exception.filter';
import { Knex } from 'knex';

/**
 * E2E Tests for RomaneioController
 * 
 * IMPORTANT: These tests require a running PostgreSQL database.
 * Make sure to:
 * 1. Have PostgreSQL running on localhost:5432
 * 2. Create the database 'romaneio_db'
 * 3. Run the schema.sql script to create tables
 * 4. Configure .env file with correct database credentials
 * 
 * To run these tests:
 * npm run test:e2e
 */
describe('RomaneioController (e2e)', () => {
  let app: INestApplication;
  let knex: Knex;
  let motoristaId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    
    // Apply global pipes and filters
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );
    app.useGlobalFilters(new HttpExceptionFilter());

    await app.init();

    // Get Knex instance for database cleanup
    knex = moduleFixture.get<Knex>('KNEX_CONNECTION');
  });

  afterAll(async () => {
    await knex.destroy();
    await app.close();
  });

  beforeEach(async () => {
    // Clean up database before each test
    await knex('entregas').del();
    await knex('romaneios').del();
    await knex('motoristas').del();

    // Create a motorista for testing
    const [motorista] = await knex('motoristas')
      .insert({
        nome: 'João da Silva',
        cpf: '12345678901',
        telefone: '11987654321',
      })
      .returning('*');
    
    motoristaId = motorista.id;
  });

  describe('POST /romaneios', () => {
    it('should create a new romaneio with valid data', async () => {
      const dto = {
        numeroRomaneio: 'ROM-2025-001',
        dataEmissao: '2025-10-16',
        motoristaId: motoristaId,
        veiculo: 'ABC-1234',
      };

      const response = await request(app.getHttpServer())
        .post('/romaneios')
        .send(dto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.numeroRomaneio).toBe(dto.numeroRomaneio);
      expect(response.body.motoristaId).toBe(dto.motoristaId);
      expect(response.body.veiculo).toBe(dto.veiculo);
      expect(response.body.status).toBe('Aberto');
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');
    });

    it('should return 400 when numeroRomaneio is missing', async () => {
      const dto = {
        dataEmissao: '2025-10-16',
        motoristaId: motoristaId,
        veiculo: 'ABC-1234',
      };

      const response = await request(app.getHttpServer())
        .post('/romaneios')
        .send(dto)
        .expect(400);

      expect(response.body.message).toBeDefined();
      expect(Array.isArray(response.body.message) ? response.body.message.join(' ') : response.body.message).toMatch(/romaneio/i);
    });

    it('should return 400 when dataEmissao is missing', async () => {
      const dto = {
        numeroRomaneio: 'ROM-2025-001',
        motoristaId: motoristaId,
        veiculo: 'ABC-1234',
      };

      const response = await request(app.getHttpServer())
        .post('/romaneios')
        .send(dto)
        .expect(400);

      expect(response.body.message).toBeDefined();
      expect(Array.isArray(response.body.message) ? response.body.message.join(' ') : response.body.message).toMatch(/data.*emiss/i);
    });

    it('should return 400 when motoristaId is missing', async () => {
      const dto = {
        numeroRomaneio: 'ROM-2025-001',
        dataEmissao: '2025-10-16',
        veiculo: 'ABC-1234',
      };

      const response = await request(app.getHttpServer())
        .post('/romaneios')
        .send(dto)
        .expect(400);

      expect(response.body.message).toBeDefined();
      expect(Array.isArray(response.body.message) ? response.body.message.join(' ') : response.body.message).toMatch(/motorista/i);
    });

    it('should return 400 when veiculo is missing', async () => {
      const dto = {
        numeroRomaneio: 'ROM-2025-001',
        dataEmissao: '2025-10-16',
        motoristaId: motoristaId,
      };

      const response = await request(app.getHttpServer())
        .post('/romaneios')
        .send(dto)
        .expect(400);

      expect(response.body.message).toBeDefined();
      expect(Array.isArray(response.body.message) ? response.body.message.join(' ') : response.body.message).toMatch(/ve[ií]culo/i);
    });

    it('should return 400 when dataEmissao has invalid format', async () => {
      const dto = {
        numeroRomaneio: 'ROM-2025-001',
        dataEmissao: 'invalid-date',
        motoristaId: motoristaId,
        veiculo: 'ABC-1234',
      };

      const response = await request(app.getHttpServer())
        .post('/romaneios')
        .send(dto)
        .expect(400);

      expect(response.body.message).toBeDefined();
      expect(Array.isArray(response.body.message) ? response.body.message.join(' ') : response.body.message).toMatch(/data.*emiss/i);
    });

    it('should return 400 when motoristaId is not positive', async () => {
      const dto = {
        numeroRomaneio: 'ROM-2025-001',
        dataEmissao: '2025-10-16',
        motoristaId: -1,
        veiculo: 'ABC-1234',
      };

      const response = await request(app.getHttpServer())
        .post('/romaneios')
        .send(dto)
        .expect(400);

      expect(response.body.message).toBeDefined();
      expect(Array.isArray(response.body.message) ? response.body.message.join(' ') : response.body.message).toMatch(/motorista.*positivo/i);
    });

    it('should return 404 when motorista does not exist', async () => {
      const dto = {
        numeroRomaneio: 'ROM-2025-001',
        dataEmissao: '2025-10-16',
        motoristaId: 999,
        veiculo: 'ABC-1234',
      };

      const response = await request(app.getHttpServer())
        .post('/romaneios')
        .send(dto)
        .expect(404);

      expect(response.body.message).toContain('Motorista');
    });
  });

  describe('GET /romaneios', () => {
    it('should return an empty array when no romaneios exist', async () => {
      const response = await request(app.getHttpServer())
        .get('/romaneios')
        .expect(200);

      expect(response.body).toEqual([]);
    });

    it('should return all romaneios', async () => {
      // Create test romaneios
      const romaneio1 = {
        numeroRomaneio: 'ROM-2025-001',
        dataEmissao: '2025-10-16',
        motoristaId: motoristaId,
        veiculo: 'ABC-1234',
      };
      const romaneio2 = {
        numeroRomaneio: 'ROM-2025-002',
        dataEmissao: '2025-10-17',
        motoristaId: motoristaId,
        veiculo: 'XYZ-5678',
      };

      await request(app.getHttpServer())
        .post('/romaneios')
        .send(romaneio1);

      await request(app.getHttpServer())
        .post('/romaneios')
        .send(romaneio2);

      const response = await request(app.getHttpServer())
        .get('/romaneios')
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('numeroRomaneio');
      expect(response.body[0]).toHaveProperty('status');
      expect(response.body[0]).toHaveProperty('createdAt');
      expect(response.body[0]).toHaveProperty('updatedAt');
    });
  });

  describe('GET /romaneios/:id', () => {
    it('should return a romaneio by id', async () => {
      // Create a romaneio
      const dto = {
        numeroRomaneio: 'ROM-2025-001',
        dataEmissao: '2025-10-16',
        motoristaId: motoristaId,
        veiculo: 'ABC-1234',
      };

      const createResponse = await request(app.getHttpServer())
        .post('/romaneios')
        .send(dto);

      const romaneioId = createResponse.body.id;

      const response = await request(app.getHttpServer())
        .get(`/romaneios/${romaneioId}`)
        .expect(200);

      expect(response.body.id).toBe(romaneioId);
      expect(response.body.numeroRomaneio).toBe(dto.numeroRomaneio);
      expect(response.body.motoristaId).toBe(dto.motoristaId);
      expect(response.body.veiculo).toBe(dto.veiculo);
      expect(response.body.status).toBe('Aberto');
    });

    it('should return 404 when romaneio does not exist', async () => {
      const response = await request(app.getHttpServer())
        .get('/romaneios/999')
        .expect(404);

      expect(response.body.message).toMatch(/Romaneio.*não encontrado/i);
    });

    it('should return 400 when id is not a number', async () => {
      await request(app.getHttpServer())
        .get('/romaneios/invalid')
        .expect(400);
    });
  });

  describe('PATCH /romaneios/:id/status', () => {
    it('should update romaneio status from Aberto to Em trânsito', async () => {
      // Create a romaneio
      const dto = {
        numeroRomaneio: 'ROM-2025-001',
        dataEmissao: '2025-10-16',
        motoristaId: motoristaId,
        veiculo: 'ABC-1234',
      };

      const createResponse = await request(app.getHttpServer())
        .post('/romaneios')
        .send(dto);

      const romaneioId = createResponse.body.id;

      // Update status
      const updateDto = {
        status: 'Em trânsito',
      };

      const response = await request(app.getHttpServer())
        .patch(`/romaneios/${romaneioId}/status`)
        .send(updateDto)
        .expect(200);

      expect(response.body.id).toBe(romaneioId);
      expect(response.body.status).toBe('Em trânsito');
    });

    it('should update romaneio status from Aberto to Finalizado', async () => {
      // Create a romaneio
      const dto = {
        numeroRomaneio: 'ROM-2025-001',
        dataEmissao: '2025-10-16',
        motoristaId: motoristaId,
        veiculo: 'ABC-1234',
      };

      const createResponse = await request(app.getHttpServer())
        .post('/romaneios')
        .send(dto);

      const romaneioId = createResponse.body.id;

      // Update status
      const updateDto = {
        status: 'Finalizado',
      };

      const response = await request(app.getHttpServer())
        .patch(`/romaneios/${romaneioId}/status`)
        .send(updateDto)
        .expect(200);

      expect(response.body.id).toBe(romaneioId);
      expect(response.body.status).toBe('Finalizado');
    });

    it('should update romaneio status from Em trânsito to Finalizado', async () => {
      // Create a romaneio
      const dto = {
        numeroRomaneio: 'ROM-2025-001',
        dataEmissao: '2025-10-16',
        motoristaId: motoristaId,
        veiculo: 'ABC-1234',
      };

      const createResponse = await request(app.getHttpServer())
        .post('/romaneios')
        .send(dto);

      const romaneioId = createResponse.body.id;

      // First update to Em trânsito
      await request(app.getHttpServer())
        .patch(`/romaneios/${romaneioId}/status`)
        .send({ status: 'Em trânsito' });

      // Then update to Finalizado
      const response = await request(app.getHttpServer())
        .patch(`/romaneios/${romaneioId}/status`)
        .send({ status: 'Finalizado' })
        .expect(200);

      expect(response.body.status).toBe('Finalizado');
    });

    it('should return 400 when trying invalid status transition', async () => {
      // Create a romaneio
      const dto = {
        numeroRomaneio: 'ROM-2025-001',
        dataEmissao: '2025-10-16',
        motoristaId: motoristaId,
        veiculo: 'ABC-1234',
      };

      const createResponse = await request(app.getHttpServer())
        .post('/romaneios')
        .send(dto);

      const romaneioId = createResponse.body.id;

      // Update to Finalizado
      await request(app.getHttpServer())
        .patch(`/romaneios/${romaneioId}/status`)
        .send({ status: 'Finalizado' });

      // Try to update from Finalizado to Em trânsito (invalid)
      const response = await request(app.getHttpServer())
        .patch(`/romaneios/${romaneioId}/status`)
        .send({ status: 'Em trânsito' })
        .expect(400);

      expect(response.body.message).toContain('Transição de status inválida');
    });

    it('should return 400 when status is invalid', async () => {
      // Create a romaneio
      const dto = {
        numeroRomaneio: 'ROM-2025-001',
        dataEmissao: '2025-10-16',
        motoristaId: motoristaId,
        veiculo: 'ABC-1234',
      };

      const createResponse = await request(app.getHttpServer())
        .post('/romaneios')
        .send(dto);

      const romaneioId = createResponse.body.id;

      // Try to update with invalid status
      const response = await request(app.getHttpServer())
        .patch(`/romaneios/${romaneioId}/status`)
        .send({ status: 'InvalidStatus' })
        .expect(400);

      expect(response.body.message).toBeDefined();
      expect(Array.isArray(response.body.message) ? response.body.message.join(' ') : response.body.message).toMatch(/status/i);
    });

    it('should return 404 when romaneio does not exist', async () => {
      const updateDto = {
        status: 'Em trânsito',
      };

      const response = await request(app.getHttpServer())
        .patch('/romaneios/999/status')
        .send(updateDto)
        .expect(404);

      expect(response.body.message).toMatch(/Romaneio.*não encontrado/i);
    });

    it('should return 400 when status is missing', async () => {
      // Create a romaneio
      const dto = {
        numeroRomaneio: 'ROM-2025-001',
        dataEmissao: '2025-10-16',
        motoristaId: motoristaId,
        veiculo: 'ABC-1234',
      };

      const createResponse = await request(app.getHttpServer())
        .post('/romaneios')
        .send(dto);

      const romaneioId = createResponse.body.id;

      const response = await request(app.getHttpServer())
        .patch(`/romaneios/${romaneioId}/status`)
        .send({})
        .expect(400);

      expect(response.body.message).toBeDefined();
      expect(Array.isArray(response.body.message) ? response.body.message.join(' ') : response.body.message).toMatch(/status/i);
    });
  });

  describe('DELETE /romaneios/:id', () => {
    it('should delete a romaneio successfully', async () => {
      // Create a romaneio
      const dto = {
        numeroRomaneio: 'ROM-2025-001',
        dataEmissao: '2025-10-16',
        motoristaId: motoristaId,
        veiculo: 'ABC-1234',
      };

      const createResponse = await request(app.getHttpServer())
        .post('/romaneios')
        .send(dto);

      const romaneioId = createResponse.body.id;

      // Delete the romaneio
      await request(app.getHttpServer())
        .delete(`/romaneios/${romaneioId}`)
        .expect(204);

      // Verify it's deleted
      await request(app.getHttpServer())
        .get(`/romaneios/${romaneioId}`)
        .expect(404);
    });

    it('should return 404 when romaneio does not exist', async () => {
      const response = await request(app.getHttpServer())
        .delete('/romaneios/999')
        .expect(404);

      expect(response.body.message).toMatch(/Romaneio.*não encontrado/i);
    });

    it('should return 400 when id is not a number', async () => {
      await request(app.getHttpServer())
        .delete('/romaneios/invalid')
        .expect(400);
    });

    it('should delete romaneio and cascade delete entregas', async () => {
      // Create a romaneio
      const romaneioDto = {
        numeroRomaneio: 'ROM-2025-001',
        dataEmissao: '2025-10-16',
        motoristaId: motoristaId,
        veiculo: 'ABC-1234',
      };

      const createResponse = await request(app.getHttpServer())
        .post('/romaneios')
        .send(romaneioDto);

      const romaneioId = createResponse.body.id;

      // Create entregas associated with the romaneio
      await knex('entregas').insert([
        {
          romaneio_id: romaneioId,
          cliente: 'Cliente 1',
          endereco: 'Endereço 1',
          valor: 100.00,
          status: 'Pendente',
        },
        {
          romaneio_id: romaneioId,
          cliente: 'Cliente 2',
          endereco: 'Endereço 2',
          valor: 200.00,
          status: 'Pendente',
        },
      ]);

      // Verify entregas exist
      const entregasBefore = await knex('entregas').where('romaneio_id', romaneioId);
      expect(entregasBefore).toHaveLength(2);

      // Delete the romaneio
      await request(app.getHttpServer())
        .delete(`/romaneios/${romaneioId}`)
        .expect(204);

      // Verify entregas are also deleted (cascade)
      const entregasAfter = await knex('entregas').where('romaneio_id', romaneioId);
      expect(entregasAfter).toHaveLength(0);
    });
  });
});
