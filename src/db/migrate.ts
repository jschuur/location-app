import fs from 'node:fs';
import path from 'node:path';

import { type SQLJsDatabase, drizzle } from 'drizzle-orm/sql-js';
import { migrate } from 'drizzle-orm/sql-js/migrator';
import initSqlJs from 'sql.js';

import { DATABASE_FILE } from '@/config';

export let db: SQLJsDatabase;

const run = async () => {
  const fileBuffer = fs.readFileSync(path.resolve('.', DATABASE_FILE));
  const SQL = await initSqlJs();
  const sqldb = new SQL.Database(fileBuffer);
  const database = drizzle(sqldb);

  db = database;

  migrate(db, { migrationsFolder: path.resolve('.', './src/db/migrations') });

  const data = sqldb.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(path.resolve('.', DATABASE_FILE), buffer);
};

run().catch(console.log);
