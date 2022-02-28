import React, { createContext, useContext } from 'react';

import * as Notifications from 'expo-notifications';
import { useIntl } from 'react-intl';
import * as Sentry from 'sentry-expo';

import type { LaunchProps } from '@types';

interface NotificationContextData {
  scheduleNotification: (launch: LaunchProps) => Promise<void>;
}

const NotificationContext = createContext<NotificationContextData>(
  {} as NotificationContextData,
);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const NotificationProvider: React.FC = ({ children }) => {
  const { formatMessage } = useIntl();

  async function scheduleNotification(launch: LaunchProps) {
    await Notifications.cancelAllScheduledNotificationsAsync();

    const { status } = await Notifications.getPermissionsAsync();

    if (status !== 'granted') {
      return;
    }

    try {
      const secondsToLaunch = Math.round(
        new Date(launch.date_local).getTime() / 1000 -
          new Date().getTime() / 1000,
      );

      await Notifications.scheduleNotificationAsync({
        content: {
          title: formatMessage({ id: 'NOTIFICATIONS.TITLE' }),
          body: `${launch.name} ${formatMessage({
            id: 'NOTIFICATIONS.SUBTITLE',
          })} ${launch.launchpad.locality} - ${
            launch.launchpad.region
          } ${formatMessage({ id: 'NOTIFICATIONS.TWENTY_FOUR_HOURS' })}`,
        },
        trigger: {
          // 24 hours before launch
          seconds: secondsToLaunch - 86400,
        },
      });

      await Notifications.scheduleNotificationAsync({
        content: {
          title: formatMessage({ id: 'NOTIFICATIONS.TITLE' }),
          body: `${launch.name} ${formatMessage({
            id: 'NOTIFICATIONS.SUBTITLE',
          })} ${launch.launchpad.locality} - ${
            launch.launchpad.region
          } ${formatMessage({ id: 'NOTIFICATIONS.ONE_HOUR' })}`,
        },
        trigger: {
          // 1 hour before launch
          seconds: secondsToLaunch - 60 * 60,
        },
      });

      await Notifications.scheduleNotificationAsync({
        content: {
          title: `${launch.name}: ${formatMessage({
            id: 'NOTIFICATIONS.T_MINUS_TEN_MINS',
          })}`,
          body: `${formatMessage({ id: 'NOTIFICATIONS.FLIGHT' })} #${
            launch?.flight_number
          } ${formatMessage({ id: 'NOTIFICATIONS.READY_FOR_LAUNCH' })}`,
        },
        trigger: {
          // 10 minutes before launch
          seconds: secondsToLaunch - 600,
        },
      });
    } catch (err) {
      Sentry.Native.captureException(err);
    }
  }

  return (
    <NotificationContext.Provider
      value={{
        scheduleNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

function useNotification(): NotificationContextData {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      'useNotification must be used within an NotificationProvider',
    );
  }

  return context;
}

export { NotificationProvider, useNotification };
