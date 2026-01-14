import { DB_CONFIG } from '../../config/database.config';
import {
  DatabaseProvider,
  DatabaseProviderType,
  SupabaseProvider,
  LocalApiProvider,
} from './providers';

// Re-export types for backward compatibility
export type { DatabaseProvider, KnowledgeResult } from './providers';

export interface DatabaseServiceConfig {
  supabaseUrl?: string;
  supabaseKey?: string;
}

/**
 * Creates a database provider based on the configuration in database.config.ts
 *
 * @param config - Object containing Supabase credentials (only needed if using Supabase)
 * @returns Configured database provider instance
 * @throws Error if required credentials are missing for the configured provider
 */
export function createDatabaseProvider(
  config: DatabaseServiceConfig
): DatabaseProvider {
  const provider = DB_CONFIG.provider;

  switch (provider) {
    case 'local': {
      // Use API provider for browser (connects to local Express server)
      return new LocalApiProvider('/api');
    }

    case 'supabase': {
      if (!config.supabaseUrl || !config.supabaseKey) {
        throw new Error(
          'Supabase credentials not found. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env.local file.'
        );
      }
      return new SupabaseProvider(config.supabaseUrl, config.supabaseKey);
    }

    default: {
      const exhaustiveCheck: never = provider;
      throw new Error(`Unknown database provider: ${exhaustiveCheck}`);
    }
  }
}

/**
 * Get the currently configured provider type
 */
export function getConfiguredDatabaseProvider(): DatabaseProviderType {
  return DB_CONFIG.provider;
}
