-- Create or alter profiles table for agent configuration
-- Check if profiles table exists and create if not
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'profiles') THEN
    CREATE TABLE profiles (
      id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
      brand_tone text DEFAULT 'friendly' CHECK (brand_tone IN ('friendly', 'professional', 'casual')),
      company_name text,
      created_at timestamp with time zone DEFAULT now(),
      updated_at timestamp with time zone DEFAULT now()
    );
  ELSE
    -- Add columns if they don't exist
    ALTER TABLE profiles ADD COLUMN IF NOT EXISTS brand_tone text DEFAULT 'friendly';
    ALTER TABLE profiles ADD COLUMN IF NOT EXISTS company_name text;
    
    -- Add check constraint if it doesn't exist
    IF NOT EXISTS (
      SELECT 1 FROM pg_constraint 
      WHERE conname = 'profiles_brand_tone_check'
    ) THEN
      ALTER TABLE profiles ADD CONSTRAINT profiles_brand_tone_check 
      CHECK (brand_tone IN ('friendly', 'professional', 'casual'));
    END IF;
  END IF;
END $$;
