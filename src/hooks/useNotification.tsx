import React, { createContext, useContext } from 'react';

import * as Notifications from 'expo-notifications';

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
  async function scheduleNotification(launch: LaunchProps) {
    await Notifications.cancelAllScheduledNotificationsAsync();

    const { status } = await Notifications.getPermissionsAsync();

    if (status !== 'granted') {
      return;
    }

    const launchTime = new Date(launch.date_local).getTime() / 1000;

    await Notifications.scheduleNotificationAsync({
      content: {
        title: `${launch.name}: T-Minus 10 minutes`,
        body: `Flight #${launch?.flight_number} launching from ${launch.launchpad.locality}`,
      },
      trigger: {
        seconds: launchTime - 600,
      },
    });

    await Notifications.scheduleNotificationAsync({
      content: {
        title: `${launch.name} aboard ${launch.rocket.name}`,
        body: `Commencing in T-Minus 5 minutes`,
      },
      trigger: {
        seconds: launchTime - 300,
      },
    });
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
