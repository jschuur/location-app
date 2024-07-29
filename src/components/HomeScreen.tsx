import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import ProgressBar from '@/components/ProgressBar';
import RecentLocations from '@/components/RecentLocations';

import { useDatabase } from '@/db/DatabaseProvider';
import useDatabaseQueries from '@/hooks/useDatabaseQueries';
import useLocations from '@/hooks/useLocations';

import { INTERVAL } from '@/config';

export default function HomeScreen() {
  const { db } = useDatabase();
  const { location, loading, isLogging, countdown, errorMsg, toggleLogging } = useLocations();
  const { getRecentLocationSnapshotsQuery, clearLocationSnapshots } = useDatabaseQueries();
  const snapshots = db ? useLiveQuery(getRecentLocationSnapshotsQuery!).data : [];

  if (errorMsg) return <Text className='text-lg text-center'>{errorMsg}</Text>;
  if (loading) return <ActivityIndicator size='large' color='#0000ff' />;

  if (location) {
    return (
      <>
        <Text className='text-4xl text-center mb-5'>Location Logger</Text>
        <View className='flex-row justify-center gap-4 items-center'>
          <TouchableOpacity className='bg-blue-500 p-2.5 rounded mt-2.5' onPress={toggleLogging}>
            <Text className='text-white text-base'>
              {isLogging ? 'Stop Logging' : 'Start Logging'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className='bg-red-500 p-2.5 rounded mt-2.5'
            onPress={clearLocationSnapshots}
          >
            <Text className='text-white text-base'>Clear Logged Locations</Text>
          </TouchableOpacity>
        </View>

        <View className='w-full h-10'>
          {isLogging && (
            <>
              <ProgressBar progress={1 - countdown / INTERVAL} />
              <Text className='text-center mt-1'>{(countdown / 1000).toFixed(1)}s</Text>
            </>
          )}
        </View>

        <RecentLocations />
      </>
    );
  } else return <Text className='text-lg text-center'>Waiting for initial location...</Text>;
}
