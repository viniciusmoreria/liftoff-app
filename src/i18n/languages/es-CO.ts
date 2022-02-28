import type MessageMap from '../i18n.d';

const es: MessageMap = {
  UPCOMING_LAUNCHES: {
    TITLE: 'Próximos',
    NO_UPCOMING_LAUNCHES:
      'No hay próximos lanzamientos de SpaceX en este momento',
    FETCH_ERROR:
      'Algo salió mal mientras se cargaban los lanzamientos próximos, por favor intenta de nuevo más tarde',
  },
  RECENT_LAUNCHES: {
    TITLE: 'Recientes',
    FETCH_ERROR:
      'Algo salió mal mientras se cargaban los lanzamientos recientes, por favor intenta de nuevo más tarde',
  },
  RECENT_ARTICLES: {
    TITLE: 'Noticias',
    WHATS_NEW: '¿Qué hay de nuevo?',
    DAILY_FEED: 'Feed diario',
    CONTINUE_BUTTON: 'Seguir leyendo en',
    FETCH_ERROR:
      'Algo salió mal mientras se cargaban las noticias, por favor intenta de nuevo más tarde',
  },
  GREETING: {
    MORNING: 'Buenos días',
    AFTERNOON: 'Buenas tardes',
    EVENING: 'Buenas noches',
  },
  LABELS: {
    DAYS: 'días',
    DAY: 'día',
    HOURS: 'horas',
    HOUR: 'hora',
    MINUTES: 'mins',
    MINUTE: 'min',
    SECONDS: 'segs',
    SECOND: 'seg',
    SEE_ALL: 'Ver todos',
    SEE_ALL_NEWS: 'Ver todas',
    ORBIT: 'Orbita',
    COMPLETED: 'Terminados',
    DATE_PENDING: 'Fecha pendiente',
    MISSION_BRIEF: 'Resumen de la misión',
    PENDING_LIVESTREAM: 'Esperando a que comience la transmisión en vivo',
    LIFESPAN: 'Duración de la misión',
    REFERENCE_SYSTEM: 'Sistema de referencia',
    REGIME: 'Régimen',
    APOAPSIS: 'Apoastro',
    PERIAPSIS: 'Periastro',
  },
  NOTIFICATIONS: {
    TITLE: 'Próximo lanzamiento',
    SUBTITLE: 'intentará el lanzamiento desde',
    TWENTY_FOUR_HOURS: 'en 24 horas',
    ONE_HOUR: 'en 1 hora',
    T_MINUS_TEN_MINS: 'En 10 minutos',
    FLIGHT: 'Vuelo',
    READY_FOR_LAUNCH:
      'listo para el lanzamiento. La transmisión en vivo ya está disponible',
  },
};

export default es;
