import { locationSnapshot } from '@/db/schema';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export type Location = {
  latitude: number;
  longitude: number;
};

// const locationSnapshotSchemaOptions = {
//   timestamp: z.coerce.date(),
// };

const locationSnapshotInsertSchema = createInsertSchema(locationSnapshot);
export type LocationSnapshotInsert = z.infer<typeof locationSnapshotInsertSchema>;

const locationSnapshotSchema = createSelectSchema(locationSnapshot);
export type LocationSnapshot = z.infer<typeof locationSnapshotSchema>;
