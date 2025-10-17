-- Script SQL para criação das tabelas do sistema de Romaneio
-- Execute este script no PostgreSQL antes de iniciar a aplicação

-- Tabela de Motoristas
CREATE TABLE IF NOT EXISTS motoristas (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  cpf VARCHAR(11) UNIQUE NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Romaneios
CREATE TABLE IF NOT EXISTS romaneios (
  id SERIAL PRIMARY KEY,
  numero_romaneio VARCHAR(50) UNIQUE NOT NULL,
  data_emissao DATE NOT NULL,
  motorista_id INTEGER NOT NULL REFERENCES motoristas(id),
  veiculo VARCHAR(20) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Aberto',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT chk_romaneio_status CHECK (status IN ('Aberto', 'Em trânsito', 'Finalizado'))
);

-- Tabela de Entregas
CREATE TABLE IF NOT EXISTS entregas (
  id SERIAL PRIMARY KEY,
  romaneio_id INTEGER NOT NULL REFERENCES romaneios(id) ON DELETE CASCADE,
  cliente VARCHAR(255) NOT NULL,
  endereco TEXT NOT NULL,
  valor DECIMAL(10, 2) NOT NULL CHECK (valor >= 0),
  status VARCHAR(20) NOT NULL DEFAULT 'Pendente',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT chk_entrega_status CHECK (status IN ('Pendente', 'Entregue', 'Cancelada'))
);

-- Índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_romaneios_motorista_id ON romaneios(motorista_id);
CREATE INDEX IF NOT EXISTS idx_romaneios_numero ON romaneios(numero_romaneio);
CREATE INDEX IF NOT EXISTS idx_romaneios_status ON romaneios(status);
CREATE INDEX IF NOT EXISTS idx_entregas_romaneio_id ON entregas(romaneio_id);
CREATE INDEX IF NOT EXISTS idx_entregas_status ON entregas(status);
CREATE INDEX IF NOT EXISTS idx_motoristas_cpf ON motoristas(cpf);

-- Comentários nas tabelas
COMMENT ON TABLE motoristas IS 'Cadastro de motoristas responsáveis pelos romaneios';
COMMENT ON TABLE romaneios IS 'Romaneios de entrega agrupando múltiplas entregas';
COMMENT ON TABLE entregas IS 'Entregas individuais associadas a um romaneio';

-- Comentários nas colunas
COMMENT ON COLUMN romaneios.status IS 'Status do romaneio: Aberto, Em trânsito, Finalizado';
COMMENT ON COLUMN entregas.status IS 'Status da entrega: Pendente, Entregue, Cancelada';
COMMENT ON COLUMN entregas.valor IS 'Valor da entrega em reais';
