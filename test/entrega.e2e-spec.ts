import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { HttpExceptionFilter } from '../src/shared/filters/http-exception.filter';
import { Knex } from 'knex';

/**
 * E2E Tests for EntregaController
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
describe('EntregaController (e2e)', () => {
  let app: INestApplication;
  let knex: Knex;
  let motoristaId: number;
  let romaneioId: number;

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

    // Create a romaneio for testing
    const [romaneio] = await knex('romaneios')
      .insert({
        numero_romaneio: 'ROM-2025-001',
        data_emissao: '2025-10-16',
        motorista_id: motoristaId,
        veiculo: 'ABC-1234',
        status: 'Aberto',
      })
      .returning('*');
    
    romaneioId = romaneio.id;
  });

  describe('POST /entregas', () => {
    it('should create a new entrega with valid data', async () => {
      const dto = {
        romaneioId: romaneioId,
        cliente: 'Empresa XYZ Ltda',
        endereco: 'Rua das Flores, 123 - São Paulo/SP',
        valor: 150.50,
      };

      const response = await request(app.getHttpServer())
        .post('/entregas')
        .send(dto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.romaneioId).toBe(dto.romaneioId);
      expect(response.body.cliente).toBe(dto.cliente);
      expect(response.body.endereco).toBe(dto.endereco);
      expect(response.body.valor).toBe(dto.valor);
      expect(response.body.status).toBe('Pendente');
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');
    });

    it('should return 400 when romaneioId is missing', async () => {
      const dto = {
        cliente: 'Empresa XYZ Ltda',
        endereco: 'Rua das Flores, 123 - São Paulo/SP',
        valor: 150.50,
      };

      const response = await request(app.getHttpServer())
        .post('/entregas')
        .send(dto)
        .expect(400);

      expect(response.body.message).toBeDefined();
      expect(Array.isArray(response.body.message) ? response.body.message.join(' ') : response.body.message).toMatch(/romaneio/i);
    });

    it('should return 400 when cliente is missing', async () => {
      const dto = {
        romaneioId: romaneioId,
        endereco: 'Rua das Flores, 123 - São Paulo/SP',
        valor: 150.50,
      };

      const response = await request(app.getHttpServer())
        .post('/entregas')
        .send(dto)
        .expect(400);

      expect(response.body.message).toBeDefined();
      expect(Array.isArray(response.body.message) ? response.body.message.join(' ') : response.body.message).toMatch(/cliente/i);
    });

    it('should return 400 when endereco is missing', async () => {
      const dto = {
        romaneioId: romaneioId,
        cliente: 'Empresa XYZ Ltda',
        valor: 150.50,
      };

      const response = await request(app.getHttpServer())
        .post('/entregas')
        .send(dto)
        .expect(400);

      expect(response.body.message).toBeDefined();
      expect(Array.isArray(response.body.message) ? response.body.message.join(' ') : response.body.message).toMatch(/endere[çc]o/i);
    });

    it('should return 400 when valor is missing', async () => {
      const dto = {
        romaneioId: romaneioId,
        cliente: 'Empresa XYZ Ltda',
        endereco: 'Rua das Flores, 123 - São Paulo/SP',
      };

      const response = await request(app.getHttpServer())
        .post('/entregas')
        .send(dto)
        .expect(400);

      expect(response.body.message).toBeDefined();
      expect(Array.isArray(response.body.message) ? response.body.message.join(' ') : response.body.message).toMatch(/valor/i);
    });

    it('should return 400 when valor is negative', async () => {
      const dto = {
        romaneioId: romaneioId,
        cliente: 'Empresa XYZ Ltda',
        endereco: 'Rua das Flores, 123 - São Paulo/SP',
        valor: -50.00,
      };

      const response = await request(app.getHttpServer())
        .post('/entregas')
        .send(dto)
        .expect(400);

      expect(response.body.message).toBeDefined();
      expect(Array.isArray(response.body.message) ? response.body.message.join(' ') : response.body.message).toMatch(/valor.*positivo/i);
    });

    it('should return 400 when valor is zero', async () => {
      const dto = {
        romaneioId: romaneioId,
        cliente: 'Empresa XYZ Ltda',
        endereco: 'Rua das Flores, 123 - São Paulo/SP',
        valor: 0,
      };

      const response = await request(app.getHttpServer())
        .post('/entregas')
        .send(dto)
        .expect(400);

      expect(response.body.message).toBeDefined();
      expect(Array.isArray(response.body.message) ? response.body.message.join(' ') : response.body.message).toMatch(/valor.*positivo/i);
    });

    it('should return 400 when romaneioId is not positive', async () => {
      const dto = {
        romaneioId: -1,
        cliente: 'Empresa XYZ Ltda',
        endereco: 'Rua das Flores, 123 - São Paulo/SP',
        valor: 150.50,
      };

      const response = await request(app.getHttpServer())
        .post('/entregas')
        .send(dto)
        .expect(400);

      expect(response.body.message).toBeDefined();
      expect(Array.isArray(response.body.message) ? response.body.message.join(' ') : response.body.message).toMatch(/romaneio.*positivo/i);
    });

    it('should return 404 when romaneio does not exist', async () => {
      const dto = {
        romaneioId: 999,
        cliente: 'Empresa XYZ Ltda',
        endereco: 'Rua das Flores, 123 - São Paulo/SP',
        valor: 150.50,
      };

      const response = await request(app.getHttpServer())
        .post('/entregas')
        .send(dto)
        .expect(404);

      expect(response.body.message).toContain('Romaneio');
    });
  });

  describe('GET /entregas?romaneio_id=:id', () => {
    it('should return an empty array when no entregas exist for romaneio', async () => {
      const response = await request(app.getHttpServer())
        .get(`/entregas?romaneio_id=${romaneioId}`)
        .expect(200);

      expect(response.body).toEqual([]);
    });

    it('should return all entregas for a specific romaneio', async () => {
      // Create test entregas
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

      const response = await request(app.getHttpServer())
        .get(`/entregas?romaneio_id=${romaneioId}`)
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('romaneioId');
      expect(response.body[0]).toHaveProperty('cliente');
      expect(response.body[0]).toHaveProperty('endereco');
      expect(response.body[0]).toHaveProperty('valor');
      expect(response.body[0]).toHaveProperty('status');
      expect(response.body[0]).toHaveProperty('createdAt');
      expect(response.body[0]).toHaveProperty('updatedAt');
    });

    it('should return only entregas for the specified romaneio', async () => {
      // Create another romaneio
      const [romaneio2] = await knex('romaneios')
        .insert({
          numero_romaneio: 'ROM-2025-002',
          data_emissao: '2025-10-17',
          motorista_id: motoristaId,
          veiculo: 'XYZ-5678',
          status: 'Aberto',
        })
        .returning('*');

      // Create entregas for both romaneios
      await knex('entregas').insert([
        {
          romaneio_id: romaneioId,
          cliente: 'Cliente Romaneio 1',
          endereco: 'Endereço 1',
          valor: 100.00,
          status: 'Pendente',
        },
        {
          romaneio_id: romaneio2.id,
          cliente: 'Cliente Romaneio 2',
          endereco: 'Endereço 2',
          valor: 200.00,
          status: 'Pendente',
        },
      ]);

      const response = await request(app.getHttpServer())
        .get(`/entregas?romaneio_id=${romaneioId}`)
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(response.body[0].romaneioId).toBe(romaneioId);
      expect(response.body[0].cliente).toBe('Cliente Romaneio 1');
    });

    it('should return 400 when romaneio_id is missing', async () => {
      await request(app.getHttpServer())
        .get('/entregas')
        .expect(400);
    });

    it('should return 400 when romaneio_id is not a number', async () => {
      await request(app.getHttpServer())
        .get('/entregas?romaneio_id=invalid')
        .expect(400);
    });
  });

  describe('PATCH /entregas/:id/status', () => {
    it('should update entrega status from Pendente to Entregue', async () => {
      // Create an entrega
      const [entrega] = await knex('entregas')
        .insert({
          romaneio_id: romaneioId,
          cliente: 'Empresa XYZ Ltda',
          endereco: 'Rua das Flores, 123 - São Paulo/SP',
          valor: 150.50,
          status: 'Pendente',
        })
        .returning('*');

      const updateDto = {
        status: 'Entregue',
      };

      const response = await request(app.getHttpServer())
        .patch(`/entregas/${entrega.id}/status`)
        .send(updateDto)
        .expect(200);

      expect(response.body.id).toBe(entrega.id);
      expect(response.body.status).toBe('Entregue');
    });

    it('should update entrega status from Pendente to Cancelada', async () => {
      // Create an entrega
      const [entrega] = await knex('entregas')
        .insert({
          romaneio_id: romaneioId,
          cliente: 'Empresa XYZ Ltda',
          endereco: 'Rua das Flores, 123 - São Paulo/SP',
          valor: 150.50,
          status: 'Pendente',
        })
        .returning('*');

      const updateDto = {
        status: 'Cancelada',
      };

      const response = await request(app.getHttpServer())
        .patch(`/entregas/${entrega.id}/status`)
        .send(updateDto)
        .expect(200);

      expect(response.body.id).toBe(entrega.id);
      expect(response.body.status).toBe('Cancelada');
    });

    it('should return 400 when status is invalid', async () => {
      // Create an entrega
      const [entrega] = await knex('entregas')
        .insert({
          romaneio_id: romaneioId,
          cliente: 'Empresa XYZ Ltda',
          endereco: 'Rua das Flores, 123 - São Paulo/SP',
          valor: 150.50,
          status: 'Pendente',
        })
        .returning('*');

      const updateDto = {
        status: 'InvalidStatus',
      };

      const response = await request(app.getHttpServer())
        .patch(`/entregas/${entrega.id}/status`)
        .send(updateDto)
        .expect(400);

      expect(response.body.message).toBeDefined();
      expect(Array.isArray(response.body.message) ? response.body.message.join(' ') : response.body.message).toMatch(/status/i);
    });

    it('should return 400 when status is missing', async () => {
      // Create an entrega
      const [entrega] = await knex('entregas')
        .insert({
          romaneio_id: romaneioId,
          cliente: 'Empresa XYZ Ltda',
          endereco: 'Rua das Flores, 123 - São Paulo/SP',
          valor: 150.50,
          status: 'Pendente',
        })
        .returning('*');

      const response = await request(app.getHttpServer())
        .patch(`/entregas/${entrega.id}/status`)
        .send({})
        .expect(400);

      expect(response.body.message).toBeDefined();
      expect(Array.isArray(response.body.message) ? response.body.message.join(' ') : response.body.message).toMatch(/status/i);
    });

    it('should return 404 when entrega does not exist', async () => {
      const updateDto = {
        status: 'Entregue',
      };

      const response = await request(app.getHttpServer())
        .patch('/entregas/999/status')
        .send(updateDto)
        .expect(404);

      expect(response.body.message).toMatch(/Entrega.*não encontrad/i);
    });

    it('should return 400 when id is not a number', async () => {
      const updateDto = {
        status: 'Entregue',
      };

      await request(app.getHttpServer())
        .patch('/entregas/invalid/status')
        .send(updateDto)
        .expect(400);
    });
  });
});
