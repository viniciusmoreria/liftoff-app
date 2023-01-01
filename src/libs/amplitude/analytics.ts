import { Amplitude, Identify } from '@amplitude/react-native';
import auth from '@react-native-firebase/auth';

class AnalyticsService {
  instance: Amplitude;

  constructor() {
    this.instance = Amplitude.getInstance();
  }

  init = async (apiKey?: string) => {
    this.instance.trackingSessionEvents(true);
    this.instance.init(apiKey || '');

    const identify = new Identify();
    const user = auth().currentUser;
    if (user) {
      identify.set('user_id', user.uid);
    }
    identify.set('platform', 'mobile');
    this.instance.identify(identify);
  };

  logEvent = (name: string, params?: Record<string, any>) => {
    return this.instance.logEvent(name, params);
  };
}

export const analyticsService = new AnalyticsService();
