import { useNotificationStore } from '../notification-store';
import { NotificationPreference } from '../types';

const initialState = [
  { type: 'twentyFourHour', value: false },
  { type: 'oneHour', value: false },
  { type: 'tenMinutes', value: false },
  { type: 'cape', value: false },
  { type: 'van', value: false },
  { type: 'wallops', value: false },
  { type: 'china', value: false },
  { type: 'russia', value: false },
  { type: 'india', value: false },
  { type: 'japan', value: false },
  { type: 'french_guiana', value: false },
  { type: 'new_zealand', value: false },
  { type: 'kazakhstan', value: false },
];

describe('useNotificationStore', () => {
  it('should initialize notificationPreferences with correct values', () => {
    const notificationPreferences = useNotificationStore.getState().notificationPreferences;

    expect(notificationPreferences).toEqual(initialState);
  });

  it('should update notificationPreferences with new values', () => {
    const newPreference: NotificationPreference = { type: 'twentyFourHour', value: true };

    useNotificationStore.getState().setNotificationPreference(newPreference);

    const notificationPreferences = useNotificationStore.getState().notificationPreferences;

    expect(notificationPreferences).toContain(newPreference);
  });
});
