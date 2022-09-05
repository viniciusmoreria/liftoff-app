import { useMemo } from 'react';
import { Text, View } from 'react-native';

import { Launch } from '@features/home/hooks/types';
import { UPCOMING_LAUNCHES_QUERY_KEY } from '@features/home/hooks/use-upcoming-launches';
import { getLaunchStage } from '@libs/utilities';
import { useQueryClient } from '@tanstack/react-query';
import { isAfter } from 'date-fns';
import Animated, { FadeIn } from 'react-native-reanimated';

import { useCountdown } from './hooks/use-coundown';

export const Countdown = () => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<Launch[]>([UPCOMING_LAUNCHES_QUERY_KEY]);

  const nextLaunch = useMemo(() => {
    return data?.find((launch) => isAfter(new Date(launch.net), new Date()));
  }, [data]);

  const { days, hours, minutes, seconds } = useCountdown(nextLaunch?.net ?? new Date());

  const stage = getLaunchStage(nextLaunch ? new Date(nextLaunch.net) : new Date());

  if (!nextLaunch) {
    return null;
  }

  return (
    <Animated.View entering={FadeIn} className="flex-row mt-8">
      <View className="flex-1 justify-between mr-6">
        <Text className="text-base text-white font-bold">{nextLaunch?.mission?.name}</Text>
        <Text className="text-xs text-white font-bold underline decoration-primary">{stage}</Text>
      </View>

      {Number(days) >= 1 && (
        <View>
          <View className="items-center bg-secondary px-2 py-4 rounded-md min-w-[50]">
            <Text className="text-white text-2xl font-bold">{days}</Text>
          </View>
          <Text className="text-gray text-sm mt-1">{Number(days) > 1 ? 'days' : 'day'}</Text>
        </View>
      )}

      {Number(hours) >= 1 && (
        <CountdownDigit digit={hours} label={Number(hours) > 1 ? 'hours' : 'hour'} />
      )}
      {Number(days) < 1 && (
        <CountdownDigit digit={minutes} label={Number(minutes) > 1 ? 'mins' : 'min'} />
      )}
      {Number(days) < 1 && Number(hours) < 1 && (
        <CountdownDigit digit={seconds} label={Number(seconds) > 1 ? 'secs' : 'sec'} />
      )}
    </Animated.View>
  );
};

const CountdownDigit = ({ digit, label }: { digit: string; label: string }) => {
  return (
    <View>
      <View className="flex-row items-center">
        <Text className="text-white text-2xl mx-1">:</Text>
        <View className="items-center bg-secondary px-2 py-4 rounded-md min-w-[50]">
          <Text className="text-white text-2xl font-bold">{digit}</Text>
        </View>
      </View>
      <Text className="text-gray text-sm mt-1 ml-4">{label}</Text>
    </View>
  );
};
