import type { ExpoSQLiteDatabase } from 'drizzle-orm/expo-sqlite';
import type { SQLJsDatabase } from 'drizzle-orm/sql-js';
import React, { type PropsWithChildren, useContext, useEffect, useState } from 'react';

import { initialize } from '@/db/drizzle';
import * as schema from '@/db/schema';

type ContextType = { db: SQLJsDatabase<typeof schema> | ExpoSQLiteDatabase<typeof schema> | null };

export const DatabaseContext = React.createContext<ContextType>({ db: null });

export const useDatabase = () => useContext(DatabaseContext);

export default function DatabaseProvider({ children }: PropsWithChildren) {
  const [db, setDb] = useState<
    SQLJsDatabase<typeof schema> | ExpoSQLiteDatabase<typeof schema> | null
  >(null);

  useEffect(() => {
    if (db) return;
    initialize().then((newDb) => {
      setDb(newDb);
    });
  }, []);

  return <DatabaseContext.Provider value={{ db }}>{children}</DatabaseContext.Provider>;
}
