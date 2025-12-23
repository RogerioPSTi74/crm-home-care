-- supabase/migrations/001_initial_schema.sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Clientes table
CREATE TABLE clientes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nome TEXT NOT NULL,
  cpf TEXT UNIQUE NOT NULL,
  rg TEXT,
  telefone TEXT NOT NULL,
  email TEXT,
  cep TEXT,
  logradouro TEXT,
  numero TEXT,
  complemento TEXT,
  bairro TEXT,
  cidade TEXT,
  estado TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  status TEXT DEFAULT 'ativo'
);

-- Profissionais table
CREATE TABLE profissionais (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nome TEXT NOT NULL,
  cpf TEXT UNIQUE NOT NULL,
  categoria TEXT NOT NULL,
  registro_profissional TEXT,
  telefone TEXT NOT NULL,
  disponibilidade JSONB DEFAULT '{}',
  status TEXT DEFAULT 'ativo',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Escalas table
CREATE TABLE escalas (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  cliente_id UUID REFERENCES clientes(id),
  profissional_id UUID REFERENCES profissionais(id),
  data DATE NOT NULL,
  turno TEXT NOT NULL,
  horario_inicio TIME NOT NULL,
  horario_fim TIME NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  repasse DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pendente',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Financeiro table
CREATE TABLE financeiro (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  tipo TEXT NOT NULL, -- 'receita' ou 'despesa'
  descricao TEXT NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  vencimento DATE NOT NULL,
  status TEXT DEFAULT 'pendente',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Documentos table
CREATE TABLE documentos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  tipo TEXT NOT NULL,
  proprietario_id UUID NOT NULL,
  proprietario_tipo TEXT NOT NULL, -- 'cliente' ou 'profissional'
  nome TEXT NOT NULL,
  arquivo_url TEXT NOT NULL,
  validade DATE,
  status TEXT DEFAULT 'valido',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE profissionais ENABLE ROW LEVEL SECURITY;
ALTER TABLE escalas ENABLE ROW LEVEL SECURITY;
ALTER TABLE financeiro ENABLE ROW LEVEL SECURITY;
ALTER TABLE documentos ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable all for authenticated users" ON clientes
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all for authenticated users" ON profissionais
  FOR ALL USING (auth.role() = 'authenticated');