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

  const nextLaunch = data?.find((launch) =>
    isAfter(
      new Date(launch.net),
      new Date(Date.now() - 1000 * 60 * 45) // 45 minutes ago
    )
  );

  const { days, hours, minutes, seconds } = useCountdown(nextLaunch?.net ?? new Date());

  const stage = getLaunchStage(nextLaunch ? new Date(nextLaunch.net) : new Date());

  if (!nextLaunch) {
    return null;
  }

  const shouldShowDays = Number(days) > 0;
  const shouldShowHours = Number(hours) > 0 || shouldShowDays;
  const shouldShowMinutes = !shouldShowDays;
  const shouldShowSeconds = !shouldShowDays && !shouldShowHours;

  return (
    <Animated.View entering={FadeIn} className="flex-row mt-8 px-8">
      <View className="flex-1 justify-around mr-6">
        <Text className="text-sm text-white font-bold" numberOfLines={2}>
          {nextLaunch?.mission?.name ?? nextLaunch?.name}
        </Text>
        <View className="self-start mt-4">
          <Text className="text-xs text-white font-bold">{stage}</Text>
          <View className="border-b-4 border-primary mt-1" />
        </View>
      </View>

      {shouldShowDays && (
        <View>
          <View className="items-center bg-secondary px-2 py-4 rounded-md min-w-[50]">
            <Text className="text-white text-2xl font-bold">{days}</Text>
          </View>
          <Text className="text-gray text-xs mt-1 pb-1">{Number(days) > 1 ? 'days' : 'day'}</Text>
        </View>
      )}
      {shouldShowHours && (
        <CountdownDigit
          digit={hours}
          label={Number(hours) > 1 ? 'hours' : 'hour'}
          showSeparator={Number(days) >= 1}
        />
      )}
      {shouldShowMinutes && (
        <CountdownDigit
          digit={minutes}
          label={Number(minutes) > 1 ? 'mins' : 'min'}
          showSeparator={Number(hours) >= 1}
        />
      )}
      {shouldShowSeconds && (
        <CountdownDigit digit={seconds} label={Number(seconds) > 1 ? 'secs' : 'sec'} />
      )}
    </Animated.View>
  );
};

type CountdownDigitProps = {
  digit: string;
  label: string;
  showSeparator?: boolean;
};

const CountdownDigit = ({ digit, label, showSeparator = true }: CountdownDigitProps) => {
  return (
    <View className="flex-row">
      {showSeparator && <Text className="text-white text-2xl mx-1 mt-3">:</Text>}
      <View>
        <View className="flex-row items-center">
          <View className="items-center bg-secondary px-2 py-4 rounded-md min-w-[50]">
            <Text className="text-white text-2xl font-bold">{digit}</Text>
          </View>
        </View>
        <Text className="text-gray text-xs mt-1 pb-1">{label}</Text>
      </View>
    </View>
  );
};
