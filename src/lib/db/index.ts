import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL!;

// For server-side connection
export const sql = postgres(connectionString, { max: 1 });
export const db = drizzle(sql, { schema });

// For edge functions (API routes)
export const createClient = () => {
  const client = postgres(connectionString, { max: 1 });
  return drizzle(client, { schema });
};