import { Sentry } from '@libs/sentry';
import { getArticlesQuery } from '@modules/articles/domain/useCases/getArticles/queries';
import { getPreviousLaunchesQuery } from '@modules/launches/previous/domain/useCases/getPreviousLaunches/queries';
import { getUpcomingLaunchesQuery } from '@modules/launches/upcoming/domain/useCases/getUpcomingLaunches/queries';
import { useNotificationObserver } from '@modules/notifications/hooks/useNotificationObserver';
import { SplashScreen } from '@modules/splash-screen';
import { useQueryClient } from '@tanstack/react-query';
import { colors } from '@theme/colors';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';

export const unstable_settings = {
  initialRouteName: '(home)',
};

const headerDefaultProps = {
  title: '',
  headerShown: false,
  headerTintColor: colors.text,
  headerStyle: {
    backgroundColor: colors.background,
  },
  contentStyle: {
    backgroundColor: colors.background,
  },
  headerLargeTitle: true,
  headerTransparent: true,
  headerShadowVisible: false,
};

function RootLayout() {
  useNotificationObserver();

  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(true);

  const prefetch = async () => {
    const dataFetchingPromises: Promise<any>[] = [
      queryClient.prefetchQuery(getUpcomingLaunchesQuery),
      queryClient.prefetchInfiniteQuery(getPreviousLaunchesQuery),
      queryClient.prefetchInfiniteQuery(getArticlesQuery),
    ];

    try {
      await Promise.all(dataFetchingPromises);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    prefetch();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack screenOptions={headerDefaultProps}>
      <Stack.Screen name="(home)" />
    </Stack>
  );
}

export default Sentry.wrap(RootLayout);
