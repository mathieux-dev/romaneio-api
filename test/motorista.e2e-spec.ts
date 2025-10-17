import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { HttpExceptionFilter } from '../src/shared/filters/http-exception.filter';
import { Knex } from 'knex';

/**
 * E2E Tests for MotoristaController
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
describe('MotoristaController (e2e)', () => {
  let app: INestApplication;
  let knex: Knex;

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
  });

  describe('POST /motoristas', () => {
    it('should create a new motorista with valid data', async () => {
      const dto = {
        nome: 'João da Silva',
        cpf: '12345678901',
        telefone: '11987654321',
      };

      const response = await request(app.getHttpServer())
        .post('/motoristas')
        .send(dto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.nome).toBe(dto.nome);
      expect(response.body.cpf).toBe(dto.cpf);
      expect(response.body.telefone).toBe(dto.telefone);
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');
    });

    it('should return 400 when nome is missing', async () => {
      const dto = {
        cpf: '12345678901',
        telefone: '11987654321',
      };

      const response = await request(app.getHttpServer())
        .post('/motoristas')
        .send(dto)
        .expect(400);

      const message = Array.isArray(response.body.message) 
        ? response.body.message.join(' ') 
        : response.body.message;
      expect(message).toMatch(/nome/i);
    });

    it('should return 400 when cpf is missing', async () => {
      const dto = {
        nome: 'João da Silva',
        telefone: '11987654321',
      };

      const response = await request(app.getHttpServer())
        .post('/motoristas')
        .send(dto)
        .expect(400);

      const message = Array.isArray(response.body.message) 
        ? response.body.message.join(' ') 
        : response.body.message;
      expect(message).toMatch(/cpf/i);
    });

    it('should return 400 when telefone is missing', async () => {
      const dto = {
        nome: 'João da Silva',
        cpf: '12345678901',
      };

      const response = await request(app.getHttpServer())
        .post('/motoristas')
        .send(dto)
        .expect(400);

      const message = Array.isArray(response.body.message) 
        ? response.body.message.join(' ') 
        : response.body.message;
      expect(message).toMatch(/telefone/i);
    });

    it('should return 400 when cpf has invalid format', async () => {
      const dto = {
        nome: 'João da Silva',
        cpf: '123',
        telefone: '11987654321',
      };

      const response = await request(app.getHttpServer())
        .post('/motoristas')
        .send(dto)
        .expect(400);

      const message = Array.isArray(response.body.message) 
        ? response.body.message.join(' ') 
        : response.body.message;
      expect(message).toMatch(/cpf/i);
    });

    it('should return 400 when cpf contains non-numeric characters', async () => {
      const dto = {
        nome: 'João da Silva',
        cpf: '123.456.789-01',
        telefone: '11987654321',
      };

      const response = await request(app.getHttpServer())
        .post('/motoristas')
        .send(dto)
        .expect(400);

      const message = Array.isArray(response.body.message) 
        ? response.body.message.join(' ') 
        : response.body.message;
      expect(message).toMatch(/cpf/i);
    });

    it('should return 409 when cpf already exists', async () => {
      const dto = {
        nome: 'João da Silva',
        cpf: '12345678901',
        telefone: '11987654321',
      };

      // Create first motorista
      await request(app.getHttpServer())
        .post('/motoristas')
        .send(dto)
        .expect(201);

      // Try to create duplicate
      const response = await request(app.getHttpServer())
        .post('/motoristas')
        .send(dto)
        .expect(409);

      expect(response.body.message).toContain('CPF já cadastrado');
    });

    it('should return 400 when nome is too short', async () => {
      const dto = {
        nome: 'Jo',
        cpf: '12345678901',
        telefone: '11987654321',
      };

      const response = await request(app.getHttpServer())
        .post('/motoristas')
        .send(dto)
        .expect(400);

      const message = Array.isArray(response.body.message) 
        ? response.body.message.join(' ') 
        : response.body.message;
      expect(message).toMatch(/nome/i);
    });

    it('should return 400 when telefone is too short', async () => {
      const dto = {
        nome: 'João da Silva',
        cpf: '12345678901',
        telefone: '123',
      };

      const response = await request(app.getHttpServer())
        .post('/motoristas')
        .send(dto)
        .expect(400);

      const message = Array.isArray(response.body.message) 
        ? response.body.message.join(' ') 
        : response.body.message;
      expect(message).toMatch(/telefone/i);
    });
  });

  describe('GET /motoristas', () => {
    it('should return an empty array when no motoristas exist', async () => {
      const response = await request(app.getHttpServer())
        .get('/motoristas')
        .expect(200);

      expect(response.body).toEqual([]);
    });

    it('should return all motoristas', async () => {
      // Create test motoristas
      const motorista1 = {
        nome: 'João da Silva',
        cpf: '12345678901',
        telefone: '11987654321',
      };
      const motorista2 = {
        nome: 'Maria Santos',
        cpf: '98765432109',
        telefone: '11912345678',
      };

      await request(app.getHttpServer())
        .post('/motoristas')
        .send(motorista1);

      await request(app.getHttpServer())
        .post('/motoristas')
        .send(motorista2);

      const response = await request(app.getHttpServer())
        .get('/motoristas')
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('nome');
      expect(response.body[0]).toHaveProperty('cpf');
      expect(response.body[0]).toHaveProperty('telefone');
      expect(response.body[0]).toHaveProperty('createdAt');
      expect(response.body[0]).toHaveProperty('updatedAt');
    });
  });

  describe('GET /motoristas/:id', () => {
    it('should return a motorista by id', async () => {
      // Create a motorista
      const dto = {
        nome: 'João da Silva',
        cpf: '12345678901',
        telefone: '11987654321',
      };

      const createResponse = await request(app.getHttpServer())
        .post('/motoristas')
        .send(dto);

      const motoristaId = createResponse.body.id;

      const response = await request(app.getHttpServer())
        .get(`/motoristas/${motoristaId}`)
        .expect(200);

      expect(response.body.id).toBe(motoristaId);
      expect(response.body.nome).toBe(dto.nome);
      expect(response.body.cpf).toBe(dto.cpf);
      expect(response.body.telefone).toBe(dto.telefone);
    });

    it('should return 404 when motorista does not exist', async () => {
      const response = await request(app.getHttpServer())
        .get('/motoristas/999')
        .expect(404);

      expect(response.body.message).toContain('Motorista não encontrado');
    });

    it('should return 400 when id is not a number', async () => {
      await request(app.getHttpServer())
        .get('/motoristas/invalid')
        .expect(400);
    });
  });

  describe('PATCH /motoristas/:id', () => {
    it('should update motorista nome', async () => {
      // Create a motorista
      const dto = {
        nome: 'João da Silva',
        cpf: '12345678901',
        telefone: '11987654321',
      };

      const createResponse = await request(app.getHttpServer())
        .post('/motoristas')
        .send(dto);

      const motoristaId = createResponse.body.id;

      // Update nome
      const updateDto = {
        nome: 'João Pedro da Silva',
      };

      const response = await request(app.getHttpServer())
        .patch(`/motoristas/${motoristaId}`)
        .send(updateDto)
        .expect(200);

      expect(response.body.id).toBe(motoristaId);
      expect(response.body.nome).toBe(updateDto.nome);
      expect(response.body.cpf).toBe(dto.cpf);
      expect(response.body.telefone).toBe(dto.telefone);
    });

    it('should update motorista telefone', async () => {
      // Create a motorista
      const dto = {
        nome: 'João da Silva',
        cpf: '12345678901',
        telefone: '11987654321',
      };

      const createResponse = await request(app.getHttpServer())
        .post('/motoristas')
        .send(dto);

      const motoristaId = createResponse.body.id;

      // Update telefone
      const updateDto = {
        telefone: '11999887766',
      };

      const response = await request(app.getHttpServer())
        .patch(`/motoristas/${motoristaId}`)
        .send(updateDto)
        .expect(200);

      expect(response.body.id).toBe(motoristaId);
      expect(response.body.nome).toBe(dto.nome);
      expect(response.body.cpf).toBe(dto.cpf);
      expect(response.body.telefone).toBe(updateDto.telefone);
    });

    it('should update both nome and telefone', async () => {
      // Create a motorista
      const dto = {
        nome: 'João da Silva',
        cpf: '12345678901',
        telefone: '11987654321',
      };

      const createResponse = await request(app.getHttpServer())
        .post('/motoristas')
        .send(dto);

      const motoristaId = createResponse.body.id;

      // Update both fields
      const updateDto = {
        nome: 'João Pedro da Silva',
        telefone: '11999887766',
      };

      const response = await request(app.getHttpServer())
        .patch(`/motoristas/${motoristaId}`)
        .send(updateDto)
        .expect(200);

      expect(response.body.id).toBe(motoristaId);
      expect(response.body.nome).toBe(updateDto.nome);
      expect(response.body.cpf).toBe(dto.cpf);
      expect(response.body.telefone).toBe(updateDto.telefone);
    });

    it('should return 404 when motorista does not exist', async () => {
      const updateDto = {
        nome: 'João Pedro da Silva',
      };

      const response = await request(app.getHttpServer())
        .patch('/motoristas/999')
        .send(updateDto)
        .expect(404);

      expect(response.body.message).toContain('Motorista não encontrado');
    });

    it('should return 400 when nome is too short', async () => {
      // Create a motorista
      const dto = {
        nome: 'João da Silva',
        cpf: '12345678901',
        telefone: '11987654321',
      };

      const createResponse = await request(app.getHttpServer())
        .post('/motoristas')
        .send(dto);

      const motoristaId = createResponse.body.id;

      // Try to update with invalid nome
      const updateDto = {
        nome: 'Jo',
      };

      const response = await request(app.getHttpServer())
        .patch(`/motoristas/${motoristaId}`)
        .send(updateDto)
        .expect(400);

      const message = Array.isArray(response.body.message) 
        ? response.body.message.join(' ') 
        : response.body.message;
      expect(message).toMatch(/nome/i);
    });

    it('should return 400 when telefone is too short', async () => {
      // Create a motorista
      const dto = {
        nome: 'João da Silva',
        cpf: '12345678901',
        telefone: '11987654321',
      };

      const createResponse = await request(app.getHttpServer())
        .post('/motoristas')
        .send(dto);

      const motoristaId = createResponse.body.id;

      // Try to update with invalid telefone
      const updateDto = {
        telefone: '123',
      };

      const response = await request(app.getHttpServer())
        .patch(`/motoristas/${motoristaId}`)
        .send(updateDto)
        .expect(400);

      const message = Array.isArray(response.body.message) 
        ? response.body.message.join(' ') 
        : response.body.message;
      expect(message).toMatch(/telefone/i);
    });

    it('should return 400 when id is not a number', async () => {
      const updateDto = {
        nome: 'João Pedro da Silva',
      };

      await request(app.getHttpServer())
        .patch('/motoristas/invalid')
        .send(updateDto)
        .expect(400);
    });

    it('should accept empty body and return motorista unchanged', async () => {
      // Create a motorista
      const dto = {
        nome: 'João da Silva',
        cpf: '12345678901',
        telefone: '11987654321',
      };

      const createResponse = await request(app.getHttpServer())
        .post('/motoristas')
        .send(dto);

      const motoristaId = createResponse.body.id;

      // Update with empty body
      const response = await request(app.getHttpServer())
        .patch(`/motoristas/${motoristaId}`)
        .send({})
        .expect(200);

      expect(response.body.id).toBe(motoristaId);
      expect(response.body.nome).toBe(dto.nome);
      expect(response.body.cpf).toBe(dto.cpf);
      expect(response.body.telefone).toBe(dto.telefone);
    });
  });
});
