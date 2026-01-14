import { DatabaseProviderType } from '../services/database/providers/types';

export interface DatabaseConfig {
  provider: DatabaseProviderType;
  local: {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
  };
}

/**
 * Database Provider Configuration
 *
 * Change the 'provider' value to switch between databases:
 * - 'local'    : Local PostgreSQL (for development)
 * - 'supabase' : Supabase (for production)
 *
 * For Supabase: Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local
 * For Local: Configure the 'local' settings below or use env vars
 */
export const DB_CONFIG: DatabaseConfig = {
  // Change this to switch databases: 'local' | 'supabase'
  provider: 'local',

  // Local PostgreSQL settings
  local: {
    host: 'localhost',
    port: 5432,
    database: 'repllix',
    user: 'postgres',
    password: 'postgres',
  },
};
