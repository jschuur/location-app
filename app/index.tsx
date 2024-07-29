import { Text, View } from 'react-native';

import HomeScreen from '@/components/HomeScreen';

import { useDatabase } from '@/db/DatabaseProvider';
import { useMigrationHelper } from '@/db/drizzle';

export default function HomePage() {
  const { db } = useDatabase();
  const { success, error } = useMigrationHelper();

  if (!db)
    return (
      <View>
        <Text>Waiting for database...</Text>
      </View>
    );

  if (error)
    return (
      <View>
        <Text>Migration error: {error.message}</Text>
      </View>
    );

  if (!success)
    return (
      <View className='flex-1 justify-center items-center'>
        <Text className='text-lg'>Migration is in progress...</Text>
      </View>
    );

  return (
    <View>
      <HomeScreen />
    </View>
  );
}
