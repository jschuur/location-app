import { count, desc, sql } from 'drizzle-orm';

import { useDatabase } from '@/db/DatabaseProvider';

import { RECENT_LOCATIONS_LIMIT } from '@/config';
import { locationSnapshot } from '@/db/schema';

import { LocationSnapshotInsert } from '@/types';

export default function useDatabaseQueries() {
  const { db } = useDatabase();

  const insertLocationSnapshot = async (loc: LocationSnapshotInsert) => {
    if (!db) return;

    await db.insert(locationSnapshot).values(loc);
  };

  const locationSnapshotCount = async () => {
    if (!db) return 0;

    const res = await db.select({ value: count() }).from(locationSnapshot);
    return res[0].value;
  };

  const getRecentLocationSnapshots = async () => {
    if (!db) return [];

    const res = await db.query.locationSnapshot.findMany({
      orderBy: [desc(locationSnapshot.timestamp)],
      limit: RECENT_LOCATIONS_LIMIT,
    });
    return res;
  };

  const clearLocationSnapshots = async () => {
    if (!db) return;

    await db.delete(locationSnapshot);
  };

  const getRecentLocationSnapshotsQuery = db?.query?.locationSnapshot?.findMany({
    orderBy: [desc(locationSnapshot.timestamp)],
    limit: RECENT_LOCATIONS_LIMIT,
  });

  const locationSnapshotCountQuery = db
    ?.select({ count: sql<number>`count(*)` })
    .from(locationSnapshot);

  return {
    db,
    insertLocationSnapshot,
    locationSnapshotCount,
    clearLocationSnapshots,
    getRecentLocationSnapshots,
    getRecentLocationSnapshotsQuery,
    locationSnapshotCountQuery,
  };
}
