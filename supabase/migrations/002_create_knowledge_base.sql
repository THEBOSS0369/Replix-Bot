-- Create knowledge_base table
CREATE TABLE IF NOT EXISTS knowledge_base (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  embedding vector(1536), -- for future semantic search
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create index for user lookups
CREATE INDEX IF NOT EXISTS idx_knowledge_user ON knowledge_base(user_id);
