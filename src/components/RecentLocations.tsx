import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { ScrollView, Text, View } from 'react-native';

import useDatabaseQueries from '@/hooks/useDatabaseQueries';

import { shortDuration } from '@/lib/utils';

import { LocationSnapshot } from '@/types';

export default function RecentLocations() {
  const { getRecentLocationSnapshotsQuery, locationSnapshotCountQuery } = useDatabaseQueries();
  const { data: recentSnapshots } = useLiveQuery(getRecentLocationSnapshotsQuery!);
  const { data: totalSnapshots } = useLiveQuery(locationSnapshotCountQuery!);

  return (
    <View className=''>
      <View className='flex-row justify-between items-center mt-5 border-b border-gray-700 pb-1'>
        <Text className='text-xl font-bold'>Recent Locations</Text>
        <Text className='text-xl font-bold'>{totalSnapshots[0]?.count} in total</Text>
      </View>
      <ScrollView className='w-full'>
        {recentSnapshots.map((loc: LocationSnapshot, index: number) => (
          <View
            key={index}
            className={`flex-row py-2 px-1 ${index % 2 === 0 ? 'bg-orange-50' : 'bg-orange-100'}`}
          >
            <View key='time' className='w-[70%] gap-1.5'>
              <Text>{loc.timestamp.toLocaleString()}</Text>
              <Text className='text-slate-400'>
                {shortDuration(new Date().getTime() - loc?.timestamp?.getTime())} ago
              </Text>
            </View>
            <View key='label' className='w-[10%] gap-1.5'>
              <Text className='text-slate-400'>Lat:</Text>
              <Text className='text-slate-400'>Long:</Text>
            </View>
            <View key='coords' className='w-[20%] gap-1.5 items-end'>
              <Text className='tabular-nums'>{loc.latitude.toFixed(4)}</Text>
              <Text className='tabular-nums'>{loc.longitude.toFixed(4)}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
