import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { Slot } from 'expo-router';
import * as SQLite from 'expo-sqlite';
import { Platform, SafeAreaView, View } from 'react-native';

import '@/global.css';

import DatabaseProvider from '@/db/DatabaseProvider';

import { DATABASE_FILE } from '@/config';

export default function App() {
  useDrizzleStudio(Platform.OS === 'web' ? null : SQLite.openDatabaseSync(DATABASE_FILE));

  return (
    <DatabaseProvider>
      <View className='flex-1 bg-orange-100'>
        <SafeAreaView className='flex-1 w-full'>
          <View className='flex-1 w-full max-w-md mx-auto px-2 pt-10'>
            <Slot />
          </View>
        </SafeAreaView>
      </View>
    </DatabaseProvider>
  );
}
