-- Local PostgreSQL Setup Script for Repllix Agent
-- Run this after creating the database: psql -d repllix -f scripts/local-db-setup.sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- Table 1: conversations
-- ============================================
CREATE TABLE IF NOT EXISTS conversations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  session_id text NOT NULL,
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  content text NOT NULL,
  source text NOT NULL CHECK (source IN ('web', 'telegram', 'whatsapp')),
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_conversations_session ON conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_conversations_user ON conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_created ON conversations(created_at DESC);

-- ============================================
-- Table 2: knowledge_base
-- ============================================
CREATE TABLE IF NOT EXISTS knowledge_base (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create index for user lookups
CREATE INDEX IF NOT EXISTS idx_knowledge_user ON knowledge_base(user_id);

-- ============================================
-- Table 3: profiles
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_tone text DEFAULT 'friendly' CHECK (brand_tone IN ('friendly', 'professional', 'casual')),
  company_name text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- ============================================
-- Sample data for testing (optional)
-- ============================================

-- Insert a test profile
INSERT INTO profiles (id, brand_tone, company_name)
VALUES ('00000000-0000-0000-0000-000000000001', 'friendly', 'Test Company')
ON CONFLICT (id) DO NOTHING;

-- Insert some test knowledge base articles
INSERT INTO knowledge_base (user_id, title, content)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'Getting Started', 'Welcome to our service! Here is how to get started...'),
  ('00000000-0000-0000-0000-000000000001', 'Pricing', 'Our pricing plans include: Basic ($10/mo), Pro ($25/mo), Enterprise (Contact us)'),
  ('00000000-0000-0000-0000-000000000001', 'Contact Support', 'You can reach our support team at support@example.com or call 1-800-EXAMPLE')
ON CONFLICT DO NOTHING;

-- Done!
SELECT 'Database setup complete!' as status;
