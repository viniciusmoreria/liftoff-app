import type MessageMap from '../i18n.d';

const en: MessageMap = {
  UPCOMING_LAUNCHES: {
    TITLE: 'Upcoming',
    NO_UPCOMING_LAUNCHES: 'No SpaceX upcoming launches at the moment',
    FETCH_ERROR:
      'Something went wrong while fetching the upcoming launches, please try again later',
  },
  RECENT_LAUNCHES: {
    TITLE: 'Recent',
    FETCH_ERROR:
      'Something went wrong while fetching the recent launches, please try again later',
  },
  RECENT_ARTICLES: {
    TITLE: 'News',
    WHATS_NEW: 'Whats new?',
    DAILY_FEED: 'Daily feed',
    CONTINUE_BUTTON: 'Continue reading on',
    FETCH_ERROR:
      'Something went wrong while fetching the recent news, please try again later',
  },
  GREETING: {
    MORNING: 'Good morning',
    AFTERNOON: 'Good afternoon',
    EVENING: 'Good evening',
  },
  LABELS: {
    DAYS: 'days',
    DAY: 'day',
    HOURS: 'hours',
    HOUR: 'hour',
    MINUTES: 'mins',
    MINUTE: 'min',
    SECONDS: 'secs',
    SECOND: 'sec',
    SEE_ALL: 'See all',
    SEE_ALL_NEWS: 'See all',
    ORBIT: 'Orbit',
    COMPLETED: 'Completed',
    DATE_PENDING: 'Date pending',
    MISSION_BRIEF: 'Mission Brief',
    PENDING_LIVESTREAM: 'Waiting for livestream to start',
    LIFESPAN: 'Lifespan',
    REFERENCE_SYSTEM: 'Reference System',
    REGIME: 'Regime',
    APOAPSIS: 'Apoapsis',
    PERIAPSIS: 'Periapsis',
  },
  NOTIFICATIONS: {
    TITLE: 'Upcoming Launch',
    SUBTITLE: 'will attempt launch from',
    TWENTY_FOUR_HOURS: 'in 24 hours',
    ONE_HOUR: 'in 1 hour',
    T_MINUS_TEN_MINS: 'T-Minus 10 minutes',
    FLIGHT: 'Flight',
    READY_FOR_LAUNCH: 'ready for launch. Livestream is now available',
  },
};

export default en;
