export type RemindersType = 'twentyFourHour' | 'oneHour' | 'tenMinutes' | 'updates' | 'webcastLive';

export type LocationType =
  | 'cape'
  | 'van'
  | 'wallops'
  | 'china'
  | 'russia'
  | 'india'
  | 'japan'
  | 'french_guiana'
  | 'new_zealand'
  | 'kazakhstan';

export type NotificationPreference = {
  type: RemindersType | LocationType;
  value: boolean;
};

type NotificationPreferences = NotificationPreference[];

export type NotificationState = {
  notificationPreferences: NotificationPreferences;
};

export type NotificationActions = {
  getPreference: (type: NotificationPreference['type']) => boolean;
  setNotificationPreference: (preference: NotificationPreference) => void;
};
