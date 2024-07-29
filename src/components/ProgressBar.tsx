import React from 'react';
import { View } from 'react-native';
import { ProgressBar as PaperProgressBar } from 'react-native-paper';

type Props = {
  progress: number;
};
export default function ProgressBar({ progress }: Props) {
  return (
    <View className='my-4 h-2 bg-gray-200 rounded overflow-hidden'>
      <PaperProgressBar progress={progress} color='#3b82f6' className='h-2' />
    </View>
  );
}
