import { type ExpoSQLiteDatabase, drizzle } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import type { SQLJsDatabase } from 'drizzle-orm/sql-js';
import { openDatabaseSync } from 'expo-sqlite/next';

import { DATABASE_FILE } from '@/config';
import migrations from '@/db/migrations/migrations';
import * as schema from '@/db/schema';

// https://github.com/drizzle-team/drizzle-orm/discussions/2447
// https://github.com/expo-starter/expo-template/blob/main/db/drizzle.ts

const expoSqlite = openDatabaseSync(DATABASE_FILE, { enableChangeListener: true });
export const db = drizzle(expoSqlite, { schema });

export const initialize = (): Promise<
  SQLJsDatabase<typeof schema> | ExpoSQLiteDatabase<typeof schema>
> => {
  console.log('initializing Drizzle');

  return Promise.resolve(db);
};

export const useMigrationHelper = () => {
  return useMigrations(db as ExpoSQLiteDatabase<typeof schema>, migrations);
};
