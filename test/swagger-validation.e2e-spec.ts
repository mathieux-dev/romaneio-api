import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { HttpExceptionFilter } from '../src/shared/filters/http-exception.filter';

describe('Swagger and Validation Configuration (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    
    // Apply the same configuration as main.ts
    // Swagger setup
    const config = new DocumentBuilder()
      .setTitle('API de Romaneio')
      .setDescription('API para gerenciamento de romaneios, entregas e motoristas')
      .setVersion('1.0.0')
      .addTag('Romaneios')
      .addTag('Entregas')
      .addTag('Motoristas')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );
    app.useGlobalFilters(new HttpExceptionFilter());
    
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Swagger Documentation', () => {
    it('should serve Swagger UI at /api', async () => {
      const response = await request(app.getHttpServer())
        .get('/api')
        .expect(200);

      expect(response.text).toContain('Swagger UI');
    });

    it('should serve Swagger JSON at /api-json', async () => {
      const response = await request(app.getHttpServer())
        .get('/api-json')
        .expect(200);

      expect(response.body).toHaveProperty('openapi');
      expect(response.body.info).toEqual({
        title: 'API de Romaneio',
        description: 'API para gerenciamento de romaneios, entregas e motoristas',
        version: '1.0.0',
        contact: {},
      });
    });

    it('should have all required tags in Swagger', async () => {
      const response = await request(app.getHttpServer())
        .get('/api-json')
        .expect(200);

      const tags = response.body.tags.map((tag: any) => tag.name);
      expect(tags).toContain('Romaneios');
      expect(tags).toContain('Entregas');
      expect(tags).toContain('Motoristas');
    });
  });

  describe('Global ValidationPipe', () => {
    it('should validate and reject invalid data with 400', async () => {
      const response = await request(app.getHttpServer())
        .post('/motoristas')
        .send({
          nome: '', // Invalid: empty string
          cpf: '123', // Invalid: too short
          telefone: '', // Invalid: empty string
        })
        .expect(400);

      expect(response.body).toHaveProperty('statusCode', 400);
      expect(response.body).toHaveProperty('message');
      expect(Array.isArray(response.body.message)).toBe(true);
      expect(response.body.message.length).toBeGreaterThan(0);
    });

    it('should strip non-whitelisted properties', async () => {
      // This test would require a valid motorista creation
      // and checking that extra properties are removed
      // For now, we verify the validation pipe is active
      const uniqueCpf = `${Date.now()}${Math.random()}`.replace('.', '').padStart(11, '0').slice(0, 11);
      const response = await request(app.getHttpServer())
        .post('/motoristas')
        .send({
          nome: 'Test Whitelist',
          cpf: uniqueCpf,
          telefone: '11987654321',
          extraProperty: 'should be removed', // Not in DTO
        })
        .expect(201);

      expect(response.body).not.toHaveProperty('extraProperty');
    });

    it('should transform data types', async () => {
      const uniqueCpf = `${Date.now()}${Math.random()}`.replace('.', '').padStart(11, '0').slice(-11);
      const response = await request(app.getHttpServer())
        .post('/motoristas')
        .send({
          nome: 'João Silva Transform',
          cpf: uniqueCpf,
          telefone: '11987654321',
        })
        .expect(201);

      expect(typeof response.body.id).toBe('number');
      expect(response.body.createdAt).toBeDefined();
    });
  });

  describe('Global HttpExceptionFilter', () => {
    it('should return 404 with proper format for not found resources', async () => {
      const response = await request(app.getHttpServer())
        .get('/motoristas/99999')
        .expect(404);

      expect(response.body).toHaveProperty('statusCode', 404);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('path', '/motoristas/99999');
    });

    it('should return 409 with proper format for conflicts', async () => {
      // First, create a motorista
      const uniqueCpf = `${Date.now()}${Math.random()}`.replace('.', '').padStart(11, '0').slice(-11);
      await request(app.getHttpServer())
        .post('/motoristas')
        .send({
          nome: 'João Conflict',
          cpf: uniqueCpf,
          telefone: '11987654321',
        })
        .expect(201);

      // Try to create another with the same CPF
      const response = await request(app.getHttpServer())
        .post('/motoristas')
        .send({
          nome: 'João Conflict 2',
          cpf: uniqueCpf, // Duplicate CPF
          telefone: '11987654322',
        })
        .expect(409);

      expect(response.body).toHaveProperty('statusCode', 409);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('path', '/motoristas');
    });

    it('should include timestamp in ISO format', async () => {
      const response = await request(app.getHttpServer())
        .get('/motoristas/99999')
        .expect(404);

      const timestamp = new Date(response.body.timestamp);
      expect(timestamp.toISOString()).toBe(response.body.timestamp);
    });
  });
});
