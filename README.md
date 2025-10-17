# API de Romaneio

API REST para gerenciamento de romaneios, entregas e motoristas, desenvolvida com NestJS, TypeScript e PostgreSQL seguindo os princípios de Clean Architecture.

## 🚀 Quick Start

```bash
git clone <url-do-repositorio>
cd romaneio-api
docker-compose up -d
```

Acesse: `http://localhost:3000/api` (Swagger)

A API sobe com banco de dados configurado e dados de teste (25 motoristas, 30 romaneios, 280+ entregas).

## 🛠️ Stack

NestJS • TypeScript • PostgreSQL • Knex.js • Swagger • Jest • Docker

## 🏗️ Arquitetura

Clean Architecture com separação em camadas:

- **core/domain** - Entidades e interfaces de repositórios
- **core/use-cases** - Lógica de negócio
- **infrastructure** - Banco de dados e implementações de repositórios
- **presentation** - Controllers e DTOs
- **shared** - Exceções e filtros

## 🐳 Comandos Docker

```bash
# Iniciar
docker-compose up -d

# Parar
docker-compose down

# Resetar banco (limpa volumes)
docker-compose down -v && docker-compose up -d

# Ver logs
docker-compose logs -f app

# Acessar banco
docker exec -it romaneio-postgres psql -U postgres -d romaneio_db
```

## 📚 Documentação (Swagger)

Acesse `http://localhost:3000/api` para documentação interativa com todos os endpoints, schemas e testes.

## 🧪 Testes

```bash
docker exec -it romaneio-api sh
npm test              # Testes unitários
npm run test:cov      # Com cobertura
npm run test:e2e      # Testes E2E
```

## 🔌 Endpoints

**Motoristas**: `POST|GET|PATCH /motoristas`  
**Romaneios**: `POST|GET|PATCH|DELETE /romaneios`  
**Entregas**: `POST|GET|PATCH /entregas`

Exemplos completos disponíveis no Swagger.

## 📊 Status

**Romaneio**: Aberto • Em trânsito • Finalizado  
**Entrega**: Pendente • Entregue • Cancelada
