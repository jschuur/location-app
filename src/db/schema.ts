import { sql } from 'drizzle-orm';
import { integer, real, sqliteTable } from 'drizzle-orm/sqlite-core';

export const locationSnapshot = sqliteTable('location_snapshot', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  latitude: real('latitude').notNull(),
  longitude: real('longitude').notNull(),
  timestamp: integer('timestamp', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
  count: integer('count').notNull().default(1),
  synced: integer('synced', { mode: 'boolean' }).notNull().default(false),
});
