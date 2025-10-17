-- Seed data for romaneio database
-- This file populates the database with sample data for testing

-- Clear existing data (in order due to foreign keys)
TRUNCATE TABLE entregas CASCADE;
TRUNCATE TABLE romaneios CASCADE;
TRUNCATE TABLE motoristas CASCADE;

-- Reset sequences
ALTER SEQUENCE motoristas_id_seq RESTART WITH 1;
ALTER SEQUENCE romaneios_id_seq RESTART WITH 1;
ALTER SEQUENCE entregas_id_seq RESTART WITH 1;

-- Insert motoristas (25 motoristas)
INSERT INTO motoristas (nome, cpf, telefone, created_at, updated_at) VALUES
('João Silva', '12345678900', '11987654321', NOW(), NOW()),
('Maria Santos', '23456789011', '11976543210', NOW(), NOW()),
('Pedro Oliveira', '34567890122', '11965432109', NOW(), NOW()),
('Ana Costa', '45678901233', '11954321098', NOW(), NOW()),
('Carlos Souza', '56789012344', '11943210987', NOW(), NOW()),
('Juliana Lima', '67890123455', '11932109876', NOW(), NOW()),
('Roberto Alves', '78901234566', '11921098765', NOW(), NOW()),
('Fernanda Rocha', '89012345677', '11910987654', NOW(), NOW()),
('Ricardo Mendes', '90123456788', '11909876543', NOW(), NOW()),
('Patrícia Ferreira', '01234567899', '11898765432', NOW(), NOW()),
('Marcos Ribeiro', '11122233344', '11887654321', NOW(), NOW()),
('Luciana Martins', '22233344455', '11876543210', NOW(), NOW()),
('Fernando Dias', '33344455566', '11865432109', NOW(), NOW()),
('Camila Barbosa', '44455566677', '11854321098', NOW(), NOW()),
('André Cardoso', '55566677788', '11843210987', NOW(), NOW()),
('Beatriz Gomes', '66677788899', '11832109876', NOW(), NOW()),
('Thiago Pereira', '77788899900', '11821098765', NOW(), NOW()),
('Renata Carvalho', '88899900011', '11810987654', NOW(), NOW()),
('Gabriel Araújo', '99900011122', '11809876543', NOW(), NOW()),
('Daniela Rodrigues', '00011122233', '11798765432', NOW(), NOW()),
('Bruno Nascimento', '11133355577', '11787654321', NOW(), NOW()),
('Aline Moreira', '22244466688', '11776543210', NOW(), NOW()),
('Rodrigo Teixeira', '33355577799', '11765432109', NOW(), NOW()),
('Vanessa Pinto', '44466688800', '11754321098', NOW(), NOW()),
('Leonardo Castro', '55577799911', '11743210987', NOW(), NOW());

-- Insert romaneios (30 romaneios)
INSERT INTO romaneios (numero_romaneio, data_emissao, motorista_id, veiculo, status, created_at, updated_at) VALUES
('ROM-2025-001', '2025-01-15', 1, 'Ducato ABC-1234', 'Finalizado', NOW(), NOW()),
('ROM-2025-002', '2025-02-10', 2, 'Sprinter DEF-5678', 'Finalizado', NOW(), NOW()),
('ROM-2025-003', '2025-03-05', 3, 'Daily GHI-9012', 'Finalizado', NOW(), NOW()),
('ROM-2025-004', '2025-03-20', 4, 'Master JKL-3456', 'Finalizado', NOW(), NOW()),
('ROM-2025-005', '2025-04-01', 5, 'Delivery MNO-7890', 'Finalizado', NOW(), NOW()),
('ROM-2025-006', '2025-04-10', 6, 'Transit PQR-1234', 'Em trânsito', NOW(), NOW()),
('ROM-2025-007', '2025-04-15', 7, 'Jumper STU-5678', 'Em trânsito', NOW(), NOW()),
('ROM-2025-008', '2025-04-16', 8, 'Boxer VWX-9012', 'Em trânsito', NOW(), NOW()),
('ROM-2025-009', '2025-05-01', 9, 'HR YZA-3456', 'Em trânsito', NOW(), NOW()),
('ROM-2025-010', '2025-05-05', 10, 'Fiorino BCD-7890', 'Em trânsito', NOW(), NOW()),
('ROM-2025-011', '2025-06-01', 11, 'Saveiro EFG-1234', 'Aberto', NOW(), NOW()),
('ROM-2025-012', '2025-06-05', 12, 'Montana HIJ-5678', 'Aberto', NOW(), NOW()),
('ROM-2025-013', '2025-06-10', 13, 'Kangoo KLM-9012', 'Aberto', NOW(), NOW()),
('ROM-2025-014', '2025-06-15', 14, 'Berlingo NOP-3456', 'Aberto', NOW(), NOW()),
('ROM-2025-015', '2025-07-01', 15, 'Partner QRS-7890', 'Aberto', NOW(), NOW()),
('ROM-2025-016', '2025-07-05', 16, 'Courier TUV-1234', 'Aberto', NOW(), NOW()),
('ROM-2025-017', '2025-07-10', 17, 'Strada WXY-5678', 'Aberto', NOW(), NOW()),
('ROM-2025-018', '2025-07-15', 18, 'Frontier ZAB-9012', 'Aberto', NOW(), NOW()),
('ROM-2025-019', '2025-08-01', 19, 'Hilux CDE-3456', 'Aberto', NOW(), NOW()),
('ROM-2025-020', '2025-08-05', 20, 'L200 FGH-7890', 'Aberto', NOW(), NOW()),
('ROM-2025-021', '2025-08-10', 21, 'S10 IJK-1234', 'Aberto', NOW(), NOW()),
('ROM-2025-022', '2025-08-15', 22, 'Amarok LMN-5678', 'Aberto', NOW(), NOW()),
('ROM-2025-023', '2025-09-01', 23, 'Ranger OPQ-9012', 'Aberto', NOW(), NOW()),
('ROM-2025-024', '2025-09-05', 24, 'Ram RST-3456', 'Aberto', NOW(), NOW()),
('ROM-2025-025', '2025-09-10', 25, 'Gladiator UVW-7890', 'Aberto', NOW(), NOW()),
('ROM-2025-026', '2025-09-15', 1, 'Ducato ABC-1234', 'Aberto', NOW(), NOW()),
('ROM-2025-027', '2025-09-20', 2, 'Sprinter DEF-5678', 'Aberto', NOW(), NOW()),
('ROM-2025-028', '2025-09-25', 3, 'Daily GHI-9012', 'Aberto', NOW(), NOW()),
('ROM-2025-029', '2025-09-28', 4, 'Master JKL-3456', 'Aberto', NOW(), NOW()),
('ROM-2025-030', '2025-09-30', 5, 'Delivery MNO-7890', 'Aberto', NOW(), NOW());

-- Insert entregas for ROM-2025-001 (Finalizado - 8 entregas)
INSERT INTO entregas (romaneio_id, cliente, endereco, valor, status, created_at, updated_at) VALUES
(1, 'Supermercado Bom Preço', 'Av. Paulista, 1000 - São Paulo/SP', 1500.00, 'Entregue', NOW(), NOW()),
(1, 'Padaria Central', 'Rua Augusta, 500 - São Paulo/SP', 850.50, 'Entregue', NOW(), NOW()),
(1, 'Restaurante Sabor & Cia', 'Rua Oscar Freire, 200 - São Paulo/SP', 2300.00, 'Entregue', NOW(), NOW()),
(1, 'Mercearia do Bairro', 'Rua da Consolação, 750 - São Paulo/SP', 980.00, 'Entregue', NOW(), NOW()),
(1, 'Açougue Premium', 'Av. Rebouças, 1200 - São Paulo/SP', 1650.00, 'Entregue', NOW(), NOW()),
(1, 'Distribuidora de Bebidas', 'Rua Teodoro Sampaio, 890 - São Paulo/SP', 3200.00, 'Entregue', NOW(), NOW()),
(1, 'Lanchonete Fast Food', 'Av. Faria Lima, 2500 - São Paulo/SP', 720.00, 'Entregue', NOW(), NOW()),
(1, 'Pizzaria Bella Napoli', 'Rua Haddock Lobo, 450 - São Paulo/SP', 1890.00, 'Entregue', NOW(), NOW());

-- Insert entregas for ROM-2025-002 (Finalizado - 10 entregas)
INSERT INTO entregas (romaneio_id, cliente, endereco, valor, status, created_at, updated_at) VALUES
(2, 'Farmácia Saúde Total', 'Av. Brigadeiro Faria Lima, 1500 - São Paulo/SP', 980.00, 'Entregue', NOW(), NOW()),
(2, 'Pet Shop Amigo Fiel', 'Rua Haddock Lobo, 300 - São Paulo/SP', 650.00, 'Entregue', NOW(), NOW()),
(2, 'Livraria Cultura & Arte', 'Av. Rebouças, 800 - São Paulo/SP', 1200.00, 'Entregue', NOW(), NOW()),
(2, 'Loja de Eletrônicos TechWorld', 'Rua da Consolação, 1200 - São Paulo/SP', 3500.00, 'Entregue', NOW(), NOW()),
(2, 'Drogaria Popular', 'Rua Estados Unidos, 650 - São Paulo/SP', 1450.00, 'Entregue', NOW(), NOW()),
(2, 'Clínica Veterinária', 'Av. Angélica, 1800 - São Paulo/SP', 890.00, 'Entregue', NOW(), NOW()),
(2, 'Papelaria Escolar', 'Rua Bela Cintra, 920 - São Paulo/SP', 560.00, 'Entregue', NOW(), NOW()),
(2, 'Loja de Informática', 'Av. Paulista, 2200 - São Paulo/SP', 4200.00, 'Entregue', NOW(), NOW()),
(2, 'Perfumaria Cheirosa', 'Rua Oscar Freire, 1100 - São Paulo/SP', 1780.00, 'Entregue', NOW(), NOW()),
(2, 'Ótica Visão Clara', 'Av. Ipiranga, 850 - São Paulo/SP', 2100.00, 'Entregue', NOW(), NOW());

-- Insert entregas for ROM-2025-003 (Finalizado - 12 entregas)
INSERT INTO entregas (romaneio_id, cliente, endereco, valor, status, created_at, updated_at) VALUES
(3, 'Mercado da Vila', 'Rua dos Pinheiros, 450 - São Paulo/SP', 1800.00, 'Entregue', NOW(), NOW()),
(3, 'Açougue Premium', 'Av. Faria Lima, 2000 - São Paulo/SP', 2100.00, 'Entregue', NOW(), NOW()),
(3, 'Hortifruti Orgânico', 'Rua Teodoro Sampaio, 600 - São Paulo/SP', 750.00, 'Entregue', NOW(), NOW()),
(3, 'Distribuidora Bebidas & Cia', 'Av. Sumaré, 1100 - São Paulo/SP', 4200.00, 'Entregue', NOW(), NOW()),
(3, 'Confeitaria Doce Sabor', 'Rua Girassol, 250 - São Paulo/SP', 920.00, 'Entregue', NOW(), NOW()),
(3, 'Padaria Pão Quente', 'Rua Cardeal Arcoverde, 380 - São Paulo/SP', 680.00, 'Entregue', NOW(), NOW()),
(3, 'Sorveteria Gelados', 'Av. Henrique Schaumann, 920 - São Paulo/SP', 1150.00, 'Entregue', NOW(), NOW()),
(3, 'Restaurante Japonês', 'Rua da Consolação, 3200 - São Paulo/SP', 3400.00, 'Entregue', NOW(), NOW()),
(3, 'Churrascaria Gaúcha', 'Av. Rebouças, 2100 - São Paulo/SP', 2850.00, 'Entregue', NOW(), NOW()),
(3, 'Lanchonete do Parque', 'Rua Bela Cintra, 1500 - São Paulo/SP', 590.00, 'Entregue', NOW(), NOW()),
(3, 'Café Expresso', 'Av. Paulista, 1800 - São Paulo/SP', 1320.00, 'Entregue', NOW(), NOW()),
(3, 'Doceria Delícias', 'Rua Augusta, 2800 - São Paulo/SP', 980.00, 'Entregue', NOW(), NOW());

-- Insert entregas for ROM-2025-004 (Finalizado - 9 entregas)
INSERT INTO entregas (romaneio_id, cliente, endereco, valor, status, created_at, updated_at) VALUES
(4, 'Loja de Roupas Fashion Style', 'Rua Oscar Freire, 800 - São Paulo/SP', 2800.00, 'Entregue', NOW(), NOW()),
(4, 'Ótica Visão Perfeita', 'Av. Paulista, 1500 - São Paulo/SP', 1350.00, 'Entregue', NOW(), NOW()),
(4, 'Joalheria Brilho Eterno', 'Rua Augusta, 1800 - São Paulo/SP', 5600.00, 'Entregue', NOW(), NOW()),
(4, 'Perfumaria Essência', 'Shopping Iguatemi - São Paulo/SP', 1900.00, 'Entregue', NOW(), NOW()),
(4, 'Boutique Elegância', 'Rua Haddock Lobo, 1200 - São Paulo/SP', 3200.00, 'Entregue', NOW(), NOW()),
(4, 'Sapataria Passos', 'Av. Rebouças, 1800 - São Paulo/SP', 2450.00, 'Entregue', NOW(), NOW()),
(4, 'Loja de Acessórios', 'Rua Bela Cintra, 950 - São Paulo/SP', 1680.00, 'Entregue', NOW(), NOW()),
(4, 'Relojoaria Tempo', 'Av. Faria Lima, 3500 - São Paulo/SP', 4800.00, 'Entregue', NOW(), NOW()),
(4, 'Loja de Bolsas', 'Rua da Consolação, 2200 - São Paulo/SP', 2100.00, 'Entregue', NOW(), NOW());

-- Insert entregas for ROM-2025-005 (Finalizado - 11 entregas)
INSERT INTO entregas (romaneio_id, cliente, endereco, valor, status, created_at, updated_at) VALUES
(5, 'Construtora Alicerce', 'Av. Eng. Luís Carlos Berrini, 1000 - São Paulo/SP', 8500.00, 'Entregue', NOW(), NOW()),
(5, 'Materiais de Construção Silva', 'Rua Vergueiro, 2500 - São Paulo/SP', 3200.00, 'Entregue', NOW(), NOW()),
(5, 'Ferragens e Ferramentas Ltda', 'Av. do Estado, 1800 - São Paulo/SP', 2700.00, 'Entregue', NOW(), NOW()),
(5, 'Madeireira São Paulo', 'Rua do Gasômetro, 450 - São Paulo/SP', 5400.00, 'Entregue', NOW(), NOW()),
(5, 'Tintas e Vernizes', 'Av. Alcântara Machado, 2200 - São Paulo/SP', 1950.00, 'Entregue', NOW(), NOW()),
(5, 'Elétrica Industrial', 'Rua do Hipódromo, 1100 - São Paulo/SP', 3800.00, 'Entregue', NOW(), NOW()),
(5, 'Hidráulica Central', 'Av. Celso Garcia, 3400 - São Paulo/SP', 2650.00, 'Entregue', NOW(), NOW()),
(5, 'Pisos e Revestimentos', 'Rua da Mooca, 1800 - São Paulo/SP', 6200.00, 'Entregue', NOW(), NOW()),
(5, 'Vidraçaria Cristal', 'Av. Paes de Barros, 950 - São Paulo/SP', 4100.00, 'Entregue', NOW(), NOW()),
(5, 'Serralheria Forte', 'Rua Bresser, 1500 - São Paulo/SP', 3300.00, 'Entregue', NOW(), NOW()),
(5, 'Marmoraria Pedra Nobre', 'Av. Salim Farah Maluf, 2800 - São Paulo/SP', 7800.00, 'Entregue', NOW(), NOW());

-- Insert entregas for ROM-2025-006 (Em trânsito - 13 entregas)
INSERT INTO entregas (romaneio_id, cliente, endereco, valor, status, created_at, updated_at) VALUES
(6, 'Academia Corpo em Forma', 'Rua Pamplona, 500 - São Paulo/SP', 1600.00, 'Entregue', NOW(), NOW()),
(6, 'Clínica Médica Vida Saudável', 'Av. Brigadeiro Luís Antônio, 1200 - São Paulo/SP', 2400.00, 'Entregue', NOW(), NOW()),
(6, 'Laboratório de Análises Clínicas', 'Rua Bela Cintra, 800 - São Paulo/SP', 3100.00, 'Entregue', NOW(), NOW()),
(6, 'Fisioterapia & Reabilitação', 'Av. Rebouças, 1500 - São Paulo/SP', 1850.00, 'Entregue', NOW(), NOW()),
(6, 'Dentista Sorriso Perfeito', 'Rua Estados Unidos, 600 - São Paulo/SP', 2200.00, 'Entregue', NOW(), NOW()),
(6, 'Farmácia Drogamax', 'Av. Paulista, 2800 - São Paulo/SP', 1950.00, 'Entregue', NOW(), NOW()),
(6, 'Hospital São Lucas', 'Rua da Consolação, 3800 - São Paulo/SP', 12500.00, 'Entregue', NOW(), NOW()),
(6, 'Clínica de Estética', 'Rua Oscar Freire, 1400 - São Paulo/SP', 2800.00, 'Pendente', NOW(), NOW()),
(6, 'Psicologia Mente Sã', 'Av. Angélica, 1600 - São Paulo/SP', 980.00, 'Pendente', NOW(), NOW()),
(6, 'Nutricionista Saúde Vital', 'Rua Haddock Lobo, 950 - São Paulo/SP', 750.00, 'Pendente', NOW(), NOW()),
(6, 'Ortopedia Ossos Fortes', 'Av. Faria Lima, 2900 - São Paulo/SP', 3400.00, 'Pendente', NOW(), NOW()),
(6, 'Cardiologia Coração Saudável', 'Rua Augusta, 3200 - São Paulo/SP', 2900.00, 'Pendente', NOW(), NOW()),
(6, 'Pediatria Criança Feliz', 'Av. Rebouças, 2400 - São Paulo/SP', 1650.00, 'Pendente', NOW(), NOW());

-- Insert entregas for ROM-2025-007 (Em trânsito - 10 entregas)
INSERT INTO entregas (romaneio_id, cliente, endereco, valor, status, created_at, updated_at) VALUES
(7, 'Escola Infantil Pequenos Gênios', 'Rua Avanhandava, 300 - São Paulo/SP', 1400.00, 'Entregue', NOW(), NOW()),
(7, 'Colégio Excelência', 'Av. Angélica, 2000 - São Paulo/SP', 3800.00, 'Entregue', NOW(), NOW()),
(7, 'Curso de Idiomas Fluente', 'Rua da Consolação, 2500 - São Paulo/SP', 1100.00, 'Entregue', NOW(), NOW()),
(7, 'Universidade Conhecimento', 'Av. Paulista, 2000 - São Paulo/SP', 5200.00, 'Entregue', NOW(), NOW()),
(7, 'Escola Técnica Profissional', 'Rua Vergueiro, 3500 - São Paulo/SP', 2800.00, 'Entregue', NOW(), NOW()),
(7, 'Cursinho Pré-Vestibular', 'Av. Brigadeiro Luís Antônio, 2200 - São Paulo/SP', 1950.00, 'Pendente', NOW(), NOW()),
(7, 'Escola de Música Harmonia', 'Rua Bela Cintra, 1800 - São Paulo/SP', 1200.00, 'Pendente', NOW(), NOW()),
(7, 'Academia de Dança', 'Av. Rebouças, 2800 - São Paulo/SP', 980.00, 'Pendente', NOW(), NOW()),
(7, 'Escola de Artes Plásticas', 'Rua Oscar Freire, 1600 - São Paulo/SP', 1450.00, 'Pendente', NOW(), NOW()),
(7, 'Centro de Treinamento Corporativo', 'Av. Faria Lima, 3800 - São Paulo/SP', 4200.00, 'Pendente', NOW(), NOW());

-- Insert entregas for ROM-2025-008 (Em trânsito - 14 entregas)
INSERT INTO entregas (romaneio_id, cliente, endereco, valor, status, created_at, updated_at) VALUES
(8, 'Hotel Conforto & Luxo', 'Av. Ipiranga, 1000 - São Paulo/SP', 6800.00, 'Entregue', NOW(), NOW()),
(8, 'Restaurante Gourmet', 'Rua Bela Cintra, 1200 - São Paulo/SP', 4500.00, 'Entregue', NOW(), NOW()),
(8, 'Café & Bistrô', 'Rua Oscar Freire, 1000 - São Paulo/SP', 1800.00, 'Entregue', NOW(), NOW()),
(8, 'Bar e Choperia Tradição', 'Rua Augusta, 2200 - São Paulo/SP', 2900.00, 'Entregue', NOW(), NOW()),
(8, 'Pizzaria Forno a Lenha', 'Av. Paulista, 2500 - São Paulo/SP', 2100.00, 'Entregue', NOW(), NOW()),
(8, 'Sorveteria Gelato Italiano', 'Rua Haddock Lobo, 800 - São Paulo/SP', 950.00, 'Entregue', NOW(), NOW()),
(8, 'Pousada Aconchego', 'Av. Rebouças, 3200 - São Paulo/SP', 3800.00, 'Pendente', NOW(), NOW()),
(8, 'Restaurante Italiano', 'Rua da Consolação, 2800 - São Paulo/SP', 3600.00, 'Pendente', NOW(), NOW()),
(8, 'Lanchonete 24 Horas', 'Av. Angélica, 1900 - São Paulo/SP', 1250.00, 'Pendente', NOW(), NOW()),
(8, 'Hamburgueria Artesanal', 'Rua Estados Unidos, 850 - São Paulo/SP', 1680.00, 'Pendente', NOW(), NOW()),
(8, 'Sushi Bar', 'Av. Faria Lima, 3200 - São Paulo/SP', 4200.00, 'Pendente', NOW(), NOW()),
(8, 'Churrascaria Rodízio', 'Rua Pamplona, 1200 - São Paulo/SP', 3900.00, 'Pendente', NOW(), NOW()),
(8, 'Padaria Artesanal', 'Av. Brigadeiro Luís Antônio, 1800 - São Paulo/SP', 1450.00, 'Pendente', NOW(), NOW()),
(8, 'Confeitaria Francesa', 'Rua Oscar Freire, 1800 - São Paulo/SP', 2200.00, 'Pendente', NOW(), NOW());

-- Insert entregas for ROM-2025-009 (Em trânsito - 8 entregas)
INSERT INTO entregas (romaneio_id, cliente, endereco, valor, status, created_at, updated_at) VALUES
(9, 'Supermercado Zona Sul', 'Av. Ibirapuera, 1500 - São Paulo/SP', 2800.00, 'Entregue', NOW(), NOW()),
(9, 'Atacadista Preço Bom', 'Rua do Manifesto, 2200 - São Paulo/SP', 5400.00, 'Entregue', NOW(), NOW()),
(9, 'Mercearia Cantinho', 'Av. Vila Ema, 850 - São Paulo/SP', 980.00, 'Entregue', NOW(), NOW()),
(9, 'Distribuidora Alimentos', 'Rua Sapopemba, 1600 - São Paulo/SP', 6200.00, 'Entregue', NOW(), NOW()),
(9, 'Padaria Pão Nosso', 'Av. Aricanduva, 3200 - São Paulo/SP', 1150.00, 'Pendente', NOW(), NOW()),
(9, 'Açougue Boi Gordo', 'Rua Itaquera, 950 - São Paulo/SP', 2400.00, 'Pendente', NOW(), NOW()),
(9, 'Peixaria Mar Azul', 'Av. Jacu Pêssego, 1800 - São Paulo/SP', 1850.00, 'Pendente', NOW(), NOW()),
(9, 'Hortifruti Natural', 'Rua Penha, 1200 - São Paulo/SP', 720.00, 'Pendente', NOW(), NOW());

-- Insert entregas for ROM-2025-010 (Em trânsito - 7 entregas)
INSERT INTO entregas (romaneio_id, cliente, endereco, valor, status, created_at, updated_at) VALUES
(10, 'Farmácia Drogasil', 'Av. Jabaquara, 2100 - São Paulo/SP', 1650.00, 'Entregue', NOW(), NOW()),
(10, 'Drogaria São Paulo', 'Rua Domingos de Morais, 1800 - São Paulo/SP', 1980.00, 'Entregue', NOW(), NOW()),
(10, 'Pet Shop Bichos & Cia', 'Av. Cupecê, 950 - São Paulo/SP', 890.00, 'Entregue', NOW(), NOW()),
(10, 'Livraria Leitura', 'Rua Santa Cruz, 1200 - São Paulo/SP', 1450.00, 'Pendente', NOW(), NOW()),
(10, 'Papelaria Escrita', 'Av. Ibirapuera, 2800 - São Paulo/SP', 680.00, 'Pendente', NOW(), NOW()),
(10, 'Bazar Utilidades', 'Rua Sena Madureira, 1500 - São Paulo/SP', 1120.00, 'Pendente', NOW(), NOW()),
(10, 'Loja de Brinquedos', 'Av. Moreira Guimarães, 850 - São Paulo/SP', 2300.00, 'Pendente', NOW(), NOW());

-- Insert entregas for ROM-2025-011 (Aberto - 6 entregas)
INSERT INTO entregas (romaneio_id, cliente, endereco, valor, status, created_at, updated_at) VALUES
(11, 'Loja de Móveis Conforto', 'Av. Cupecê, 3200 - São Paulo/SP', 8900.00, 'Pendente', NOW(), NOW()),
(11, 'Colchões Sono Bom', 'Rua Vergueiro, 4500 - São Paulo/SP', 5600.00, 'Pendente', NOW(), NOW()),
(11, 'Eletrodomésticos Casa', 'Av. Jabaquara, 2800 - São Paulo/SP', 7200.00, 'Pendente', NOW(), NOW()),
(11, 'Loja de Decoração', 'Rua Domingos de Morais, 2200 - São Paulo/SP', 3400.00, 'Pendente', NOW(), NOW()),
(11, 'Cortinas e Persianas', 'Av. Ibirapuera, 1900 - São Paulo/SP', 2800.00, 'Pendente', NOW(), NOW()),
(11, 'Tapetes e Carpetes', 'Rua Santa Cruz, 1600 - São Paulo/SP', 1950.00, 'Pendente', NOW(), NOW());

-- Insert entregas for ROM-2025-012 (Aberto - 9 entregas)
INSERT INTO entregas (romaneio_id, cliente, endereco, valor, status, created_at, updated_at) VALUES
(12, 'Autopeças Veloz', 'Av. do Estado, 3500 - São Paulo/SP', 4200.00, 'Pendente', NOW(), NOW()),
(12, 'Oficina Mecânica Expert', 'Rua do Hipódromo, 1800 - São Paulo/SP', 3800.00, 'Pendente', NOW(), NOW()),
(12, 'Loja de Pneus Rodas', 'Av. Alcântara Machado, 2900 - São Paulo/SP', 5600.00, 'Pendente', NOW(), NOW()),
(12, 'Acessórios Automotivos', 'Rua da Mooca, 2200 - São Paulo/SP', 2100.00, 'Pendente', NOW(), NOW()),
(12, 'Som Automotivo', 'Av. Paes de Barros, 1500 - São Paulo/SP', 3200.00, 'Pendente', NOW(), NOW()),
(12, 'Funilaria e Pintura', 'Rua Bresser, 1900 - São Paulo/SP', 2800.00, 'Pendente', NOW(), NOW()),
(12, 'Vidros Automotivos', 'Av. Celso Garcia, 4200 - São Paulo/SP', 1950.00, 'Pendente', NOW(), NOW()),
(12, 'Alarmes e Travas', 'Rua do Gasômetro, 850 - São Paulo/SP', 1450.00, 'Pendente', NOW(), NOW()),
(12, 'Estofaria Automotiva', 'Av. Salim Farah Maluf, 3600 - São Paulo/SP', 2650.00, 'Pendente', NOW(), NOW());

-- Insert entregas for ROM-2025-013 (Aberto - 8 entregas)
INSERT INTO entregas (romaneio_id, cliente, endereco, valor, status, created_at, updated_at) VALUES
(13, 'Loja de Esportes Atleta', 'Av. Paulista, 3200 - São Paulo/SP', 4800.00, 'Pendente', NOW(), NOW()),
(13, 'Academia Fitness Pro', 'Rua Augusta, 3500 - São Paulo/SP', 6200.00, 'Pendente', NOW(), NOW()),
(13, 'Suplementos Nutrição', 'Av. Rebouças, 3800 - São Paulo/SP', 3400.00, 'Pendente', NOW(), NOW()),
(13, 'Loja de Bicicletas', 'Rua da Consolação, 4200 - São Paulo/SP', 5600.00, 'Pendente', NOW(), NOW()),
(13, 'Equipamentos de Camping', 'Av. Faria Lima, 4500 - São Paulo/SP', 2900.00, 'Pendente', NOW(), NOW()),
(13, 'Artigos de Pesca', 'Rua Oscar Freire, 2200 - São Paulo/SP', 1850.00, 'Pendente', NOW(), NOW()),
(13, 'Tênis e Calçados Esportivos', 'Av. Brigadeiro Faria Lima, 3900 - São Paulo/SP', 4200.00, 'Pendente', NOW(), NOW()),
(13, 'Roupas Fitness', 'Rua Haddock Lobo, 1600 - São Paulo/SP', 3100.00, 'Pendente', NOW(), NOW());

-- Insert entregas for ROM-2025-014 (Aberto - 10 entregas)
INSERT INTO entregas (romaneio_id, cliente, endereco, valor, status, created_at, updated_at) VALUES
(14, 'Loja de Informática TechStore', 'Av. Paulista, 2900 - São Paulo/SP', 8900.00, 'Pendente', NOW(), NOW()),
(14, 'Assistência Técnica Computadores', 'Rua da Consolação, 3600 - São Paulo/SP', 2400.00, 'Pendente', NOW(), NOW()),
(14, 'Games e Consoles', 'Av. Rebouças, 4200 - São Paulo/SP', 6800.00, 'Pendente', NOW(), NOW()),
(14, 'Acessórios de Informática', 'Rua Augusta, 4100 - São Paulo/SP', 3200.00, 'Pendente', NOW(), NOW()),
(14, 'Impressoras e Scanners', 'Av. Faria Lima, 5200 - São Paulo/SP', 4500.00, 'Pendente', NOW(), NOW()),
(14, 'Notebooks e Tablets', 'Rua Oscar Freire, 2800 - São Paulo/SP', 12500.00, 'Pendente', NOW(), NOW()),
(14, 'Câmeras e Filmadoras', 'Av. Brigadeiro Luís Antônio, 3200 - São Paulo/SP', 5600.00, 'Pendente', NOW(), NOW()),
(14, 'Drones e Acessórios', 'Rua Bela Cintra, 2400 - São Paulo/SP', 7200.00, 'Pendente', NOW(), NOW()),
(14, 'Softwares e Licenças', 'Av. Angélica, 2800 - São Paulo/SP', 3800.00, 'Pendente', NOW(), NOW()),
(14, 'Cabos e Conectores', 'Rua Estados Unidos, 1200 - São Paulo/SP', 980.00, 'Pendente', NOW(), NOW());

-- Insert entregas for ROM-2025-015 (Aberto - 7 entregas)
INSERT INTO entregas (romaneio_id, cliente, endereco, valor, status, created_at, updated_at) VALUES
(15, 'Floricultura Jardim das Flores', 'Av. Paulista, 3500 - São Paulo/SP', 1850.00, 'Pendente', NOW(), NOW()),
(15, 'Paisagismo Verde Vida', 'Rua Augusta, 4500 - São Paulo/SP', 4200.00, 'Pendente', NOW(), NOW()),
(15, 'Mudas e Plantas', 'Av. Rebouças, 4800 - São Paulo/SP', 2600.00, 'Pendente', NOW(), NOW()),
(15, 'Ferramentas de Jardinagem', 'Rua da Consolação, 4800 - São Paulo/SP', 1950.00, 'Pendente', NOW(), NOW()),
(15, 'Adubos e Fertilizantes', 'Av. Faria Lima, 5800 - São Paulo/SP', 3400.00, 'Pendente', NOW(), NOW()),
(15, 'Vasos e Cachepôs', 'Rua Oscar Freire, 3200 - São Paulo/SP', 2100.00, 'Pendente', NOW(), NOW()),
(15, 'Sementes e Bulbos', 'Av. Brigadeiro Faria Lima, 4500 - São Paulo/SP', 1280.00, 'Pendente', NOW(), NOW());

-- Insert entregas for ROM-2025-016 (Aberto - 11 entregas)
INSERT INTO entregas (romaneio_id, cliente, endereco, valor, status, created_at, updated_at) VALUES
(16, 'Clínica Veterinária Amigo Pet', 'Av. Ibirapuera, 2800 - São Paulo/SP', 3200.00, 'Pendente', NOW(), NOW()),
(16, 'Pet Shop Mundo Animal', 'Rua Vergueiro, 3800 - São Paulo/SP', 2800.00, 'Pendente', NOW(), NOW()),
(16, 'Rações e Alimentos Pet', 'Av. Jabaquara, 3200 - São Paulo/SP', 4500.00, 'Pendente', NOW(), NOW()),
(16, 'Banho e Tosa Chic Pet', 'Rua Domingos de Morais, 2800 - São Paulo/SP', 1650.00, 'Pendente', NOW(), NOW()),
(16, 'Acessórios para Pets', 'Av. Cupecê, 2200 - São Paulo/SP', 1980.00, 'Pendente', NOW(), NOW()),
(16, 'Aquarismo Peixes Tropicais', 'Rua Santa Cruz, 2100 - São Paulo/SP', 3600.00, 'Pendente', NOW(), NOW()),
(16, 'Casinhas e Camas Pet', 'Av. Ibirapuera, 3500 - São Paulo/SP', 2400.00, 'Pendente', NOW(), NOW()),
(16, 'Brinquedos para Animais', 'Rua Sena Madureira, 1900 - São Paulo/SP', 1150.00, 'Pendente', NOW(), NOW()),
(16, 'Medicamentos Veterinários', 'Av. Moreira Guimarães, 1200 - São Paulo/SP', 2850.00, 'Pendente', NOW(), NOW()),
(16, 'Coleiras e Guias', 'Rua Vergueiro, 4200 - São Paulo/SP', 890.00, 'Pendente', NOW(), NOW()),
(16, 'Transporte para Pets', 'Av. Jabaquara, 3800 - São Paulo/SP', 1750.00, 'Pendente', NOW(), NOW());

-- Insert entregas for ROM-2025-017 (Aberto - 9 entregas)
INSERT INTO entregas (romaneio_id, cliente, endereco, valor, status, created_at, updated_at) VALUES
(17, 'Salão de Beleza Glamour', 'Av. Paulista, 4200 - São Paulo/SP', 2800.00, 'Pendente', NOW(), NOW()),
(17, 'Barbearia Estilo Masculino', 'Rua Augusta, 5200 - São Paulo/SP', 1950.00, 'Pendente', NOW(), NOW()),
(17, 'Manicure e Pedicure Unhas Perfeitas', 'Av. Rebouças, 5400 - São Paulo/SP', 1450.00, 'Pendente', NOW(), NOW()),
(17, 'Depilação Laser Pele Lisa', 'Rua da Consolação, 5600 - São Paulo/SP', 3200.00, 'Pendente', NOW(), NOW()),
(17, 'Estética Facial Beleza Natural', 'Av. Faria Lima, 6200 - São Paulo/SP', 2650.00, 'Pendente', NOW(), NOW()),
(17, 'Massagem Terapêutica Relax', 'Rua Oscar Freire, 3800 - São Paulo/SP', 1850.00, 'Pendente', NOW(), NOW()),
(17, 'Spa Urbano Zen', 'Av. Brigadeiro Luís Antônio, 3800 - São Paulo/SP', 4200.00, 'Pendente', NOW(), NOW()),
(17, 'Produtos de Beleza Cosméticos', 'Rua Bela Cintra, 3200 - São Paulo/SP', 3600.00, 'Pendente', NOW(), NOW()),
(17, 'Maquiagem Profissional', 'Av. Angélica, 3400 - São Paulo/SP', 2100.00, 'Pendente', NOW(), NOW());

-- Insert entregas for ROM-2025-018 (Aberto - 12 entregas)
INSERT INTO entregas (romaneio_id, cliente, endereco, valor, status, created_at, updated_at) VALUES
(18, 'Imobiliária Lar Doce Lar', 'Av. Paulista, 4800 - São Paulo/SP', 5600.00, 'Pendente', NOW(), NOW()),
(18, 'Construtora Edifica', 'Rua Augusta, 5800 - São Paulo/SP', 12500.00, 'Pendente', NOW(), NOW()),
(18, 'Arquitetura e Design Projetos', 'Av. Rebouças, 6200 - São Paulo/SP', 8900.00, 'Pendente', NOW(), NOW()),
(18, 'Engenharia Civil Estruturas', 'Rua da Consolação, 6400 - São Paulo/SP', 9800.00, 'Pendente', NOW(), NOW()),
(18, 'Incorporadora Imóveis Premium', 'Av. Faria Lima, 7200 - São Paulo/SP', 15000.00, 'Pendente', NOW(), NOW()),
(18, 'Administradora de Condomínios', 'Rua Oscar Freire, 4500 - São Paulo/SP', 3400.00, 'Pendente', NOW(), NOW()),
(18, 'Corretora de Imóveis', 'Av. Brigadeiro Luís Antônio, 4500 - São Paulo/SP', 2800.00, 'Pendente', NOW(), NOW()),
(18, 'Reformas e Acabamentos', 'Rua Bela Cintra, 3800 - São Paulo/SP', 6200.00, 'Pendente', NOW(), NOW()),
(18, 'Instalações Elétricas Prediais', 'Av. Angélica, 4200 - São Paulo/SP', 4500.00, 'Pendente', NOW(), NOW()),
(18, 'Hidráulica Predial', 'Rua Estados Unidos, 1800 - São Paulo/SP', 3800.00, 'Pendente', NOW(), NOW()),
(18, 'Ar Condicionado Central', 'Av. Rebouças, 6800 - São Paulo/SP', 7200.00, 'Pendente', NOW(), NOW()),
(18, 'Elevadores e Manutenção', 'Rua da Consolação, 7200 - São Paulo/SP', 8500.00, 'Pendente', NOW(), NOW());

-- Insert entregas for ROM-2025-019 (Aberto - 8 entregas)
INSERT INTO entregas (romaneio_id, cliente, endereco, valor, status, created_at, updated_at) VALUES
(19, 'Gráfica Rápida Impressões', 'Av. Paulista, 5500 - São Paulo/SP', 3200.00, 'Pendente', NOW(), NOW()),
(19, 'Editora Livros & Revistas', 'Rua Augusta, 6500 - São Paulo/SP', 8900.00, 'Pendente', NOW(), NOW()),
(19, 'Serigrafia Camisetas', 'Av. Rebouças, 7200 - São Paulo/SP', 2800.00, 'Pendente', NOW(), NOW()),
(19, 'Comunicação Visual Outdoor', 'Rua da Consolação, 7800 - São Paulo/SP', 5600.00, 'Pendente', NOW(), NOW()),
(19, 'Brindes Personalizados', 'Av. Faria Lima, 8200 - São Paulo/SP', 4200.00, 'Pendente', NOW(), NOW()),
(19, 'Adesivos e Etiquetas', 'Rua Oscar Freire, 5200 - São Paulo/SP', 1950.00, 'Pendente', NOW(), NOW()),
(19, 'Impressão Digital Grande Formato', 'Av. Brigadeiro Luís Antônio, 5200 - São Paulo/SP', 6800.00, 'Pendente', NOW(), NOW()),
(19, 'Encadernação e Acabamento', 'Rua Bela Cintra, 4500 - São Paulo/SP', 2400.00, 'Pendente', NOW(), NOW());

-- Insert entregas for ROM-2025-020 (Aberto - 10 entregas)
INSERT INTO entregas (romaneio_id, cliente, endereco, valor, status, created_at, updated_at) VALUES
(20, 'Agência de Viagens Mundo Tour', 'Av. Paulista, 6200 - São Paulo/SP', 4500.00, 'Pendente', NOW(), NOW()),
(20, 'Hotel Fazenda Descanso', 'Rua Augusta, 7200 - São Paulo/SP', 8900.00, 'Pendente', NOW(), NOW()),
(20, 'Pousada Praia Sol', 'Av. Rebouças, 8200 - São Paulo/SP', 6200.00, 'Pendente', NOW(), NOW()),
(20, 'Resort Águas Claras', 'Rua da Consolação, 8800 - São Paulo/SP', 12500.00, 'Pendente', NOW(), NOW()),
(20, 'Turismo Aventura Radical', 'Av. Faria Lima, 9200 - São Paulo/SP', 3800.00, 'Pendente', NOW(), NOW()),
(20, 'Cruzeiros Marítimos', 'Rua Oscar Freire, 6200 - São Paulo/SP', 15000.00, 'Pendente', NOW(), NOW()),
(20, 'Excursões Culturais', 'Av. Brigadeiro Luís Antônio, 6200 - São Paulo/SP', 2800.00, 'Pendente', NOW(), NOW()),
(20, 'Transfer Aeroporto', 'Rua Bela Cintra, 5500 - São Paulo/SP', 1650.00, 'Pendente', NOW(), NOW()),
(20, 'Aluguel de Vans Turismo', 'Av. Angélica, 5200 - São Paulo/SP', 3200.00, 'Pendente', NOW(), NOW()),
(20, 'Seguro Viagem Internacional', 'Rua Estados Unidos, 2400 - São Paulo/SP', 2100.00, 'Pendente', NOW(), NOW());

-- Insert entregas for ROM-2025-021 (Aberto - 9 entregas)
INSERT INTO entregas (romaneio_id, cliente, endereco, valor, status, created_at, updated_at) VALUES
(21, 'Advocacia Direito & Justiça', 'Av. Paulista, 7200 - São Paulo/SP', 5600.00, 'Pendente', NOW(), NOW()),
(21, 'Contabilidade Números Certos', 'Rua Augusta, 8200 - São Paulo/SP', 4200.00, 'Pendente', NOW(), NOW()),
(21, 'Consultoria Empresarial', 'Av. Rebouças, 9200 - São Paulo/SP', 8900.00, 'Pendente', NOW(), NOW()),
(21, 'Auditoria Fiscal', 'Rua da Consolação, 9800 - São Paulo/SP', 6800.00, 'Pendente', NOW(), NOW()),
(21, 'Recursos Humanos RH Pro', 'Av. Faria Lima, 10200 - São Paulo/SP', 3800.00, 'Pendente', NOW(), NOW()),
(21, 'Marketing Digital Agência', 'Rua Oscar Freire, 7200 - São Paulo/SP', 7200.00, 'Pendente', NOW(), NOW()),
(21, 'Assessoria de Imprensa', 'Av. Brigadeiro Luís Antônio, 7200 - São Paulo/SP', 4500.00, 'Pendente', NOW(), NOW()),
(21, 'Tradução e Interpretação', 'Rua Bela Cintra, 6500 - São Paulo/SP', 2800.00, 'Pendente', NOW(), NOW()),
(21, 'Despachante Documentos', 'Av. Angélica, 6200 - São Paulo/SP', 1950.00, 'Pendente', NOW(), NOW());

-- Insert entregas for ROM-2025-022 (Aberto - 11 entregas)
INSERT INTO entregas (romaneio_id, cliente, endereco, valor, status, created_at, updated_at) VALUES
(22, 'Laboratório Análises Químicas', 'Av. Paulista, 8200 - São Paulo/SP', 9800.00, 'Pendente', NOW(), NOW()),
(22, 'Farmácia de Manipulação', 'Rua Augusta, 9200 - São Paulo/SP', 5600.00, 'Pendente', NOW(), NOW()),
(22, 'Hospital Geral São José', 'Av. Rebouças, 10200 - São Paulo/SP', 25000.00, 'Pendente', NOW(), NOW()),
(22, 'Clínica de Diagnóstico por Imagem', 'Rua da Consolação, 10800 - São Paulo/SP', 12500.00, 'Pendente', NOW(), NOW()),
(22, 'Centro Cirúrgico Especializado', 'Av. Faria Lima, 11200 - São Paulo/SP', 18000.00, 'Pendente', NOW(), NOW()),
(22, 'Hemocentro Banco de Sangue', 'Rua Oscar Freire, 8200 - São Paulo/SP', 8900.00, 'Pendente', NOW(), NOW()),
(22, 'Pronto Socorro 24h', 'Av. Brigadeiro Luís Antônio, 8200 - São Paulo/SP', 15000.00, 'Pendente', NOW(), NOW()),
(22, 'UTI Móvel Ambulância', 'Rua Bela Cintra, 7500 - São Paulo/SP', 6800.00, 'Pendente', NOW(), NOW()),
(22, 'Radioterapia Oncologia', 'Av. Angélica, 7200 - São Paulo/SP', 22000.00, 'Pendente', NOW(), NOW()),
(22, 'Hemodiálise Nefrologia', 'Rua Estados Unidos, 3200 - São Paulo/SP', 11500.00, 'Pendente', NOW(), NOW()),
(22, 'Reabilitação Fisioterapia', 'Av. Rebouças, 11200 - São Paulo/SP', 4800.00, 'Pendente', NOW(), NOW());

-- Insert entregas for ROM-2025-023 (Aberto - 7 entregas)
INSERT INTO entregas (romaneio_id, cliente, endereco, valor, status, created_at, updated_at) VALUES
(23, 'Indústria Metalúrgica Aço Forte', 'Av. do Estado, 4500 - São Paulo/SP', 35000.00, 'Pendente', NOW(), NOW()),
(23, 'Fábrica de Plásticos Polímeros', 'Rua do Hipódromo, 2800 - São Paulo/SP', 28000.00, 'Pendente', NOW(), NOW()),
(23, 'Indústria Química Reagentes', 'Av. Alcântara Machado, 3800 - São Paulo/SP', 42000.00, 'Pendente', NOW(), NOW()),
(23, 'Fábrica de Embalagens', 'Rua da Mooca, 3200 - São Paulo/SP', 18500.00, 'Pendente', NOW(), NOW()),
(23, 'Indústria Têxtil Tecidos', 'Av. Paes de Barros, 2200 - São Paulo/SP', 32000.00, 'Pendente', NOW(), NOW()),
(23, 'Fábrica de Móveis Madeira', 'Rua Bresser, 2800 - São Paulo/SP', 25000.00, 'Pendente', NOW(), NOW()),
(23, 'Indústria Alimentícia Processados', 'Av. Celso Garcia, 5200 - São Paulo/SP', 38000.00, 'Pendente', NOW(), NOW());

-- Insert entregas for ROM-2025-024 (Aberto - 10 entregas)
INSERT INTO entregas (romaneio_id, cliente, endereco, valor, status, created_at, updated_at) VALUES
(24, 'Distribuidora de Bebidas Líquidos', 'Av. Ibirapuera, 4500 - São Paulo/SP', 12500.00, 'Pendente', NOW(), NOW()),
(24, 'Atacadista de Alimentos Grãos', 'Rua Vergueiro, 5500 - São Paulo/SP', 18000.00, 'Pendente', NOW(), NOW()),
(24, 'Importadora Produtos Internacionais', 'Av. Jabaquara, 4800 - São Paulo/SP', 25000.00, 'Pendente', NOW(), NOW()),
(24, 'Exportadora Commodities', 'Rua Domingos de Morais, 3800 - São Paulo/SP', 32000.00, 'Pendente', NOW(), NOW()),
(24, 'Logística e Armazenagem', 'Av. Cupecê, 3800 - São Paulo/SP', 15000.00, 'Pendente', NOW(), NOW()),
(24, 'Transportadora Cargas Pesadas', 'Rua Santa Cruz, 3200 - São Paulo/SP', 22000.00, 'Pendente', NOW(), NOW()),
(24, 'Centro de Distribuição Regional', 'Av. Ibirapuera, 5500 - São Paulo/SP', 28000.00, 'Pendente', NOW(), NOW()),
(24, 'Armazém Frigorífico', 'Rua Sena Madureira, 2800 - São Paulo/SP', 18500.00, 'Pendente', NOW(), NOW()),
(24, 'Depósito Alfandegado', 'Av. Moreira Guimarães, 2200 - São Paulo/SP', 35000.00, 'Pendente', NOW(), NOW()),
(24, 'Terminal de Cargas', 'Rua Vergueiro, 6500 - São Paulo/SP', 42000.00, 'Pendente', NOW(), NOW());

-- Insert entregas for ROM-2025-025 (Aberto - 8 entregas)
INSERT INTO entregas (romaneio_id, cliente, endereco, valor, status, created_at, updated_at) VALUES
(25, 'Concessionária Veículos Novos', 'Av. Paulista, 9200 - São Paulo/SP', 85000.00, 'Pendente', NOW(), NOW()),
(25, 'Loja de Veículos Seminovos', 'Rua Augusta, 10200 - São Paulo/SP', 65000.00, 'Pendente', NOW(), NOW()),
(25, 'Locadora de Veículos Rent Car', 'Av. Rebouças, 12200 - São Paulo/SP', 45000.00, 'Pendente', NOW(), NOW()),
(25, 'Oficina Autorizada Montadora', 'Rua da Consolação, 11800 - São Paulo/SP', 28000.00, 'Pendente', NOW(), NOW()),
(25, 'Distribuidora de Peças Originais', 'Av. Faria Lima, 12200 - São Paulo/SP', 38000.00, 'Pendente', NOW(), NOW()),
(25, 'Blindagem de Veículos', 'Rua Oscar Freire, 9200 - São Paulo/SP', 55000.00, 'Pendente', NOW(), NOW()),
(25, 'Customização Automotiva', 'Av. Brigadeiro Luís Antônio, 9200 - São Paulo/SP', 32000.00, 'Pendente', NOW(), NOW()),
(25, 'Vistoria Veicular Laudo', 'Rua Bela Cintra, 8500 - São Paulo/SP', 12500.00, 'Pendente', NOW(), NOW());

-- Insert entregas for ROM-2025-026 (Aberto - 6 entregas)
INSERT INTO entregas (romaneio_id, cliente, endereco, valor, status, created_at, updated_at) VALUES
(26, 'Shopping Center Mega Mall', 'Av. Paulista, 10200 - São Paulo/SP', 125000.00, 'Pendente', NOW(), NOW()),
(26, 'Supermercado Rede Nacional', 'Rua Augusta, 11200 - São Paulo/SP', 85000.00, 'Pendente', NOW(), NOW()),
(26, 'Hipermercado Atacarejo', 'Av. Rebouças, 13200 - São Paulo/SP', 95000.00, 'Pendente', NOW(), NOW()),
(26, 'Loja de Departamentos Grande Porte', 'Rua da Consolação, 12800 - São Paulo/SP', 75000.00, 'Pendente', NOW(), NOW()),
(26, 'Franquia Fast Food Internacional', 'Av. Faria Lima, 13200 - São Paulo/SP', 45000.00, 'Pendente', NOW(), NOW()),
(26, 'Rede de Farmácias Filial', 'Rua Oscar Freire, 10200 - São Paulo/SP', 55000.00, 'Pendente', NOW(), NOW());

-- Insert entregas for ROM-2025-027 (Aberto - 9 entregas)
INSERT INTO entregas (romaneio_id, cliente, endereco, valor, status, created_at, updated_at) VALUES
(27, 'Banco Agência Central', 'Av. Paulista, 11200 - São Paulo/SP', 65000.00, 'Pendente', NOW(), NOW()),
(27, 'Seguradora Vida e Patrimônio', 'Rua Augusta, 12200 - São Paulo/SP', 48000.00, 'Pendente', NOW(), NOW()),
(27, 'Corretora de Valores Investimentos', 'Av. Rebouças, 14200 - São Paulo/SP', 55000.00, 'Pendente', NOW(), NOW()),
(27, 'Financeira Crédito Pessoal', 'Rua da Consolação, 13800 - São Paulo/SP', 38000.00, 'Pendente', NOW(), NOW()),
(27, 'Cooperativa de Crédito', 'Av. Faria Lima, 14200 - São Paulo/SP', 42000.00, 'Pendente', NOW(), NOW()),
(27, 'Administradora de Cartões', 'Rua Oscar Freire, 11200 - São Paulo/SP', 52000.00, 'Pendente', NOW(), NOW()),
(27, 'Previdência Privada Fundos', 'Av. Brigadeiro Luís Antônio, 10200 - São Paulo/SP', 68000.00, 'Pendente', NOW(), NOW()),
(27, 'Câmbio e Remessas Internacionais', 'Rua Bela Cintra, 9500 - São Paulo/SP', 35000.00, 'Pendente', NOW(), NOW()),
(27, 'Consórcio Imóveis e Veículos', 'Av. Angélica, 8200 - São Paulo/SP', 45000.00, 'Pendente', NOW(), NOW());

-- Insert entregas for ROM-2025-028 (Aberto - 12 entregas)
INSERT INTO entregas (romaneio_id, cliente, endereco, valor, status, created_at, updated_at) VALUES
(28, 'Universidade Campus Principal', 'Av. Paulista, 12200 - São Paulo/SP', 95000.00, 'Pendente', NOW(), NOW()),
(28, 'Faculdade Tecnologia TI', 'Rua Augusta, 13200 - São Paulo/SP', 68000.00, 'Pendente', NOW(), NOW()),
(28, 'Centro Universitário Medicina', 'Av. Rebouças, 15200 - São Paulo/SP', 125000.00, 'Pendente', NOW(), NOW()),
(28, 'Instituto de Pesquisa Científica', 'Rua da Consolação, 14800 - São Paulo/SP', 85000.00, 'Pendente', NOW(), NOW()),
(28, 'Laboratório de Análises Avançadas', 'Av. Faria Lima, 15200 - São Paulo/SP', 75000.00, 'Pendente', NOW(), NOW()),
(28, 'Biblioteca Central Acervo', 'Rua Oscar Freire, 12200 - São Paulo/SP', 42000.00, 'Pendente', NOW(), NOW()),
(28, 'Centro de Convenções Eventos', 'Av. Brigadeiro Luís Antônio, 11200 - São Paulo/SP', 55000.00, 'Pendente', NOW(), NOW()),
(28, 'Auditório Teatro Acadêmico', 'Rua Bela Cintra, 10500 - São Paulo/SP', 38000.00, 'Pendente', NOW(), NOW()),
(28, 'Restaurante Universitário RU', 'Av. Angélica, 9200 - São Paulo/SP', 32000.00, 'Pendente', NOW(), NOW()),
(28, 'Moradia Estudantil Residência', 'Rua Estados Unidos, 4200 - São Paulo/SP', 48000.00, 'Pendente', NOW(), NOW()),
(28, 'Centro Esportivo Ginásio', 'Av. Rebouças, 16200 - São Paulo/SP', 62000.00, 'Pendente', NOW(), NOW()),
(28, 'Clínica Escola Atendimento', 'Rua da Consolação, 15800 - São Paulo/SP', 52000.00, 'Pendente', NOW(), NOW());

-- Insert entregas for ROM-2025-029 (Aberto - 8 entregas)
INSERT INTO entregas (romaneio_id, cliente, endereco, valor, status, created_at, updated_at) VALUES
(29, 'Estúdio de Gravação Profissional', 'Av. Paulista, 13200 - São Paulo/SP', 45000.00, 'Pendente', NOW(), NOW()),
(29, 'Produtora Audiovisual Cinema', 'Rua Augusta, 14200 - São Paulo/SP', 68000.00, 'Pendente', NOW(), NOW()),
(29, 'Agência de Publicidade Criativa', 'Av. Rebouças, 17200 - São Paulo/SP', 55000.00, 'Pendente', NOW(), NOW()),
(29, 'Editora de Vídeo Pós-Produção', 'Rua da Consolação, 16800 - São Paulo/SP', 38000.00, 'Pendente', NOW(), NOW()),
(29, 'Fotografia Profissional Estúdio', 'Av. Faria Lima, 16200 - São Paulo/SP', 32000.00, 'Pendente', NOW(), NOW()),
(29, 'Streaming Plataforma Digital', 'Rua Oscar Freire, 13200 - São Paulo/SP', 85000.00, 'Pendente', NOW(), NOW()),
(29, 'Rádio FM Emissora', 'Av. Brigadeiro Luís Antônio, 12200 - São Paulo/SP', 48000.00, 'Pendente', NOW(), NOW()),
(29, 'TV Produtora Conteúdo', 'Rua Bela Cintra, 11500 - São Paulo/SP', 95000.00, 'Pendente', NOW(), NOW());

-- Insert entregas for ROM-2025-030 (Aberto - 10 entregas)
INSERT INTO entregas (romaneio_id, cliente, endereco, valor, status, created_at, updated_at) VALUES
(30, 'Data Center Servidores Cloud', 'Av. Paulista, 14200 - São Paulo/SP', 125000.00, 'Pendente', NOW(), NOW()),
(30, 'Empresa de Software Desenvolvimento', 'Rua Augusta, 15200 - São Paulo/SP', 85000.00, 'Pendente', NOW(), NOW()),
(30, 'Startup Tecnologia Inovação', 'Av. Rebouças, 18200 - São Paulo/SP', 65000.00, 'Pendente', NOW(), NOW()),
(30, 'Consultoria TI Infraestrutura', 'Rua da Consolação, 17800 - São Paulo/SP', 75000.00, 'Pendente', NOW(), NOW()),
(30, 'Segurança da Informação Cyber', 'Av. Faria Lima, 17200 - São Paulo/SP', 95000.00, 'Pendente', NOW(), NOW()),
(30, 'Inteligência Artificial IA Lab', 'Rua Oscar Freire, 14200 - São Paulo/SP', 115000.00, 'Pendente', NOW(), NOW()),
(30, 'Big Data Analytics Dados', 'Av. Brigadeiro Luís Antônio, 13200 - São Paulo/SP', 88000.00, 'Pendente', NOW(), NOW()),
(30, 'Blockchain Criptomoedas', 'Rua Bela Cintra, 12500 - São Paulo/SP', 105000.00, 'Pendente', NOW(), NOW()),
(30, 'IoT Internet das Coisas', 'Av. Angélica, 10200 - São Paulo/SP', 72000.00, 'Pendente', NOW(), NOW()),
(30, 'Robótica Automação Industrial', 'Rua Estados Unidos, 5200 - São Paulo/SP', 135000.00, 'Pendente', NOW(), NOW());
