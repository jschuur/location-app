# tsconfig.json

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "types": ["nativewind/types"],
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

```

# tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  debug: true,
  content: ['./App.tsx', './app/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};

```

# package.json

```json
{
  "name": "location-app",
  "version": "1.0.0",
  "main": "expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "generate": "drizzle-kit generate"
  },
  "dependencies": {
    "@expo/metro-runtime": "~3.2.1",
    "@react-native-async-storage/async-storage": "1.24.0",
    "drizzle-orm": "^0.32.1",
    "expo": "~51.0.22",
    "expo-dev-client": "~4.0.20",
    "expo-file-system": "~17.0.1",
    "expo-location": "~17.0.1",
    "expo-sqlite": "~14.0.5",
    "expo-status-bar": "~1.12.1",
    "expo-updates": "~0.25.21",
    "nativewind": "^2.0.11",
    "react": "18.3.1",
    "react-native": "0.74.3",
    "react-native-web": "~0.19.12"
  },
  "devDependencies": {
    "@babel/core": "^7.24.9",
    "@types/react": "^18.3.3",
    "babel-plugin-inline-import": "^3.0.0",
    "drizzle-kit": "^0.23.0",
    "tailwind": "3",
    "tailwindcss": "3.3.2"
  },
  "private": true
}

```

# metro.config.js

```js
// update metro.config.js

const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push('sql');

module.exports = config;

```

# eas.json

```json
{
  "build": {
    "preview": {
      "distribution": "internal"
    }
  }
}

```

# drizzle.config.ts

```ts
import type { Config } from 'drizzle-kit';

module.exports = {
  schema: './db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  driver: 'expo',
} satisfies Config;

```

# babel.config.js

```js
module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [['nativewind/babel'], ['inline-import', { extensions: ['.sql'] }]],
  };
};

```

# app.json

```json
{
  "expo": {
    "name": "location-app",
    "slug": "location-app",
    "version": "1.0.0",
    "main": "src/App.tsx",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
  },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.joostschuur.locationapp"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "eas": {
        "projectId": "829b6d75-495e-4352-91ac-731719a54477"
      }
    },
    "owner": "jschuur",
    "runtimeVersion": {
      "policy": "appVersion"
    },
    "updates": {
      "url": "https://u.expo.dev/829b6d75-495e-4352-91ac-731719a54477"
    }
  }
}

```

# App.tsx

```tsx
// import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
// import { useEffect } from 'react';
// import { Text, View } from 'react-native';
import { View } from 'react-native';

import HomeScreen from '@/components/HomeScreen';

// import { db } from '@/db/db';
// import migrations from './drizzle/migrations';

export default function App() {
  // const { success, error } = useMigrations(db, migrations);

  // useEffect(() => {
  //   if (error) {
  //     console.error('Migration error:', error);
  //   }
  // }, [error]);

  // if (!success) {
  //   return (
  //     <View className='flex-1 justify-center items-center'>
  //       <Text className='text-lg'>Migration is in progress...</Text>
  //     </View>
  //   );
  // }

  return (
    <View className='flex-1 justify-center items-center bg-yellow-200'>
      <View className='w-full max-w-md p-4'>
        <HomeScreen />
      </View>
    </View>
  );
}

```

# .npmrc

```
node-linker=hoisted

```

# .gitignore

```
# Learn more https://docs.github.com/en/get-started/getting-started-with-git/ignoring-files

# dependencies
node_modules/

# Expo
.expo/
dist/
web-build/

# Native
*.orig.*
*.jks
*.p8
*.p12
*.key
*.mobileprovision

# Metro
.metro-health-check*

# debug
npm-debug.*
yarn-debug.*
yarn-error.*

# macOS
.DS_Store
*.pem

# local env files
.env*.local

# typescript
*.tsbuildinfo

```

# src/styles.ts

```ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  clearButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  progressContainer: {
    width: '100%',
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#007AFF',
  },
  countdownText: {
    textAlign: 'center',
    marginTop: 5,
  },
  recentLocationsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
  },
  recentLocationsContainer: {
    maxHeight: 150,
    width: '100%',
  },
  locationItem: {
    fontSize: 12,
    marginBottom: 5,
  },
});

export default styles;

```

# src/config.ts

```ts
export const STORAGE_KEY = '@location_logs';
export const INTERVAL = 10000;

```

# drizzle/migrations.js

```js
// This file is required for Expo/React Native SQLite migrations - https://orm.drizzle.team/quick-sqlite/expo

import journal from './meta/_journal.json';
import m0000 from './0000_thick_captain_cross.sql';

  export default {
    journal,
    migrations: {
      m0000
    }
  }
  
```

# drizzle/0000_thick_captain_cross.sql

```sql
CREATE TABLE `location_snapshot` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`latitude` real NOT NULL,
	`longitude` real NOT NULL,
	`timestamp` text NOT NULL,
	`count` integer DEFAULT 1 NOT NULL
);

```

# assets/splash.png

This is a binary file of the type: Image

# assets/icon.png

This is a binary file of the type: Image

# assets/favicon.png

This is a binary file of the type: Image

# assets/adaptive-icon.png

This is a binary file of the type: Image

# .expo/devices.json

```json
{
  "devices": []
}

```

# .expo/README.md

```md
> Why do I have a folder named ".expo" in my project?
The ".expo" folder is created when an Expo project is started using "expo start" command.
> What do the files contain?
- "devices.json": contains information about devices that have recently opened this project. This is used to populate the "Development sessions" list in your development builds.
- "settings.json": contains the server configuration that is used to serve the application manifest.
> Should I commit the ".expo" folder?
No, you should not share the ".expo" folder. It does not contain any information that is relevant for other developers working on the project, it is specific to your machine.
Upon project creation, the ".expo" folder is already added to your ".gitignore" file.

```

# src/hooks/useLocations.ts

```ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';

import { INTERVAL, STORAGE_KEY } from '@/config';

type Location = {
  latitude: number;
  longitude: number;
};

export type LocationSnapshot = {
  latitude: number;
  longitude: number;
  timestamp: Date;
  count: number;
};

export default function useLocations() {
  const [location, setLocation] = useState<Location | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const [loggedLocations, setLoggedLocations] = useState<LocationSnapshot[]>([]);
  const [lastCheckTime, setLastCheckTime] = useState<Date | null>(null);
  const [countdown, setCountdown] = useState(INTERVAL);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  const logLocation = async () => {
    try {
      let newLocation = await Location.getCurrentPositionAsync({});
      const timestamp = new Date();

      setLoggedLocations((prevLocations) => {
        let updatedLocations: LocationSnapshot[] = [];

        if (prevLocations.length > 0) {
          const lastLocation = prevLocations[0];
          if (
            lastLocation.latitude === newLocation.coords.latitude &&
            lastLocation.longitude === newLocation.coords.longitude
          ) {
            updatedLocations = [
              { ...lastLocation, count: (lastLocation.count || 1) + 1, timestamp },
              ...prevLocations.slice(1),
            ];
          } else {
            updatedLocations = [{ ...newLocation.coords, timestamp, count: 1 }, ...prevLocations];
          }
        } else {
          updatedLocations = [{ ...newLocation.coords, timestamp, count: 1 }];
        }

        updatedLocations = updatedLocations.slice(0, 100); // Keep last 100 locations
        saveLoggedLocations(updatedLocations);
        return updatedLocations;
      });

      setLocation(newLocation.coords);
      setLastCheckTime(timestamp);
      setCountdown(INTERVAL);
    } catch (error) {
      console.error('Error logging location:', error);
    }
  };

  const loadLoggedLocations = async () => {
    try {
      const storedLocations = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedLocations !== null) {
        setLoggedLocations(JSON.parse(storedLocations));
      }
    } catch (error) {
      console.error('Error loading logged locations:', error);
    }
  };

  const clearLoggedLocations = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setLoggedLocations([]);
    } catch (error) {
      console.error('Error clearing logged locations:', error);
    }
  };

  const saveLoggedLocations = async (locations: LocationSnapshot[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(locations));
    } catch (error) {
      console.error('Error saving logged locations:', error);
    }
  };

  const startLogging = () => {
    setIsLogging(true);
    logLocation();
    intervalRef.current = setInterval(logLocation, INTERVAL);
    startCountdown();
  };

  const stopLogging = () => {
    setIsLogging(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);
    setCountdown(INTERVAL);
  };

  const toggleLogging = () => {
    if (isLogging) {
      stopLogging();
    } else {
      startLogging();
    }
  };

  const startCountdown = () => {
    setCountdown(INTERVAL);
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 100) {
          return INTERVAL;
        }
        return prev - 100;
      });
    }, 100);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      setLoading(true);
      try {
        let location = await Location.getCurrentPositionAsync({});

        setLocation(location.coords);
        await loadLoggedLocations();
      } catch (error) {
        console.error('Error fetching location:', error);
        setErrorMsg('Unable to fetch location information');
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      stopLogging();
    };
  }, []);

  return {
    loading,
    location,
    isLogging,
    toggleLogging,
    loggedLocations,
    errorMsg,
    lastCheckTime,
    countdown,
    logLocation,
    clearLoggedLocations,
  };
}

```

# src/db/schema.ts

```ts
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const locationSnapshot = sqliteTable('location_snapshot', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  latitude: real('latitude').notNull(),
  longitude: real('longitude').notNull(),
  timestamp: text('timestamp').notNull(),
  count: integer('count').notNull().default(1),
});

```

# src/db/db.ts

```ts
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite/next';

import * as schema from './schema';

// https://github.com/drizzle-team/drizzle-orm/discussions/2447

const expoSqlite = openDatabaseSync('location-app.db');

export const db = drizzle(expoSqlite, { schema });

```

# src/components/RecentLocations.tsx

```tsx
import { ScrollView, Text } from 'react-native';

import { LocationSnapshot } from '@/hooks/useLocations';

type Props = {
  loggedLocations: any;
};

export default function RecentLocations({ loggedLocations }: Props) {
  const recentLocations = loggedLocations.slice(0, 10);

  return (
    <>
      <Text className='text-base font-bold mt-5 mb-1'>Recent Locations:</Text>
      <ScrollView className='max-h-40 w-full'>
        {recentLocations.map((loc: LocationSnapshot, index: number) => (
          <Text key={index} className='text-sm mb-1'>
            {loc.timestamp.toLocaleString()}, {loc.latitude.toFixed(4)}, {loc.longitude.toFixed(4)},
            Count: {loc.count}
          </Text>
        ))}
      </ScrollView>
    </>
  );
}

```

# src/components/ProgressBar.tsx

```tsx
import { Platform, ProgressBarAndroid, View } from 'react-native';

type Props = {
  progress: number;
};
export default function ProgressBar({ progress }: Props) {
  if (Platform.OS === 'android') {
    return <ProgressBarAndroid styleAttr='Horizontal' indeterminate={false} progress={progress} />;
  }

  return (
    <View className='h-2 bg-gray-200 rounded overflow-hidden'>
      <View className='h-full bg-blue-500' style={{ width: `${progress * 100}%` }} />
    </View>
  );
}

```

# src/components/HomeScreen.tsx

```tsx
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import ProgressBar from '@/components/ProgressBar';
import RecentLocations from '@/components/RecentLocations';

import useLocations from '@/hooks/useLocations';

import { INTERVAL } from '@/config';

export default function HomeScreen() {
  const {
    location,
    loading,
    isLogging,
    loggedLocations,
    lastCheckTime,
    countdown,
    errorMsg,
    toggleLogging,
    clearLoggedLocations,
  } = useLocations();

  if (errorMsg) return <Text className='text-lg text-center'>{errorMsg}</Text>;
  if (loading) return <ActivityIndicator size='large' color='#0000ff' />;
  if (location)
    return (
      <>
        <Text className='text-lg text-center mb-5'>
          Location: {location.latitude.toFixed(4)}/{location.longitude.toFixed(4)}
          {'\n'}
          Logged Locations: {loggedLocations.length}
          {'\n'}
          Last Check: {lastCheckTime?.toLocaleString() || 'Not started'}
        </Text>
        {isLogging && (
          <View className='w-full mb-2.5'>
            <ProgressBar progress={1 - countdown / INTERVAL} />
            <Text className='text-center mt-1'>{(countdown / 1000).toFixed(1)}s</Text>
          </View>
        )}
        <TouchableOpacity className='bg-blue-500 p-2.5 rounded mt-2.5' onPress={toggleLogging}>
          <Text className='text-white text-base'>
            {isLogging ? 'Stop Logging' : 'Start Logging'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className='bg-red-500 p-2.5 rounded mt-2.5'
          onPress={clearLoggedLocations}
        >
          <Text className='text-white text-base'>Clear Logged Locations</Text>
        </TouchableOpacity>
        <RecentLocations loggedLocations={loggedLocations} />
      </>
    );
  else return <Text className='text-lg text-center'>Waiting for initial location...</Text>;
}

```

# drizzle/meta/_journal.json

```json
{
  "version": "7",
  "dialect": "sqlite",
  "entries": [
    {
      "idx": 0,
      "version": "6",
      "when": 1721903242096,
      "tag": "0000_thick_captain_cross",
      "breakpoints": true
    }
  ]
}
```

# drizzle/meta/0000_snapshot.json

```json
{
  "version": "6",
  "dialect": "sqlite",
  "id": "3a5d3058-7024-4551-be6d-dfc601147d42",
  "prevId": "00000000-0000-0000-0000-000000000000",
  "tables": {
    "location_snapshot": {
      "name": "location_snapshot",
      "columns": {
        "id": {
          "name": "id",
          "type": "integer",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": true
        },
        "latitude": {
          "name": "latitude",
          "type": "real",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "longitude": {
          "name": "longitude",
          "type": "real",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "timestamp": {
          "name": "timestamp",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "count": {
          "name": "count",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 1
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {},
      "uniqueConstraints": {}
    }
  },
  "enums": {},
  "_meta": {
    "schemas": {},
    "tables": {},
    "columns": {}
  },
  "internal": {
    "indexes": {}
  }
}
```

# .expo/web/cache/production/images/favicon/favicon-24272cdaeff82cc5facdaccd982a6f05b60c4504704bbf94c19a6388659880bb-contain-transparent/favicon-48.png

This is a binary file of the type: Image

