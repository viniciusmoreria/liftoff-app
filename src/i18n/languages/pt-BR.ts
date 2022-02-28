import type MessageMap from '../i18n.d';

const pt: MessageMap = {
  UPCOMING_LAUNCHES: {
    TITLE: 'Próximos',
    NO_UPCOMING_LAUNCHES: 'Nenhum lançamento da SpaceX no momento',
    FETCH_ERROR:
      'Ocorreu um erro ao buscar os próximos lançamentos. Tente novamente mais tarde',
  },
  RECENT_LAUNCHES: {
    TITLE: 'Recentes',
    FETCH_ERROR:
      'Ocorreu um erro ao buscar os lançamentos recentes. Tente novamente mais tarde',
  },
  RECENT_ARTICLES: {
    TITLE: 'Notícias',
    WHATS_NEW: 'O que há de novo?',
    DAILY_FEED: 'Feed diário',
    CONTINUE_BUTTON: 'Continue lendo em',
    FETCH_ERROR:
      'Ocorreu um erro ao buscar as notícias. Tente novamente mais tarde',
  },
  GREETING: {
    MORNING: 'Bom dia',
    AFTERNOON: 'Boa tarde',
    EVENING: 'Boa noite',
  },
  LABELS: {
    DAYS: 'dias',
    DAY: 'dia',
    HOURS: 'horas',
    HOUR: 'hora',
    MINUTES: 'mins',
    MINUTE: 'min',
    SECONDS: 'segs',
    SECOND: 'seg',
    SEE_ALL: 'Ver todos',
    SEE_ALL_NEWS: 'Ver todas',
    ORBIT: 'Órbita',
    COMPLETED: 'Concluídos',
    DATE_PENDING: 'Data pendente',
    MISSION_BRIEF: 'Resumo da missão',
    PENDING_LIVESTREAM: 'Aguardando o início da transmissão ao vivo',
    LIFESPAN: 'Duração da missão',
    REFERENCE_SYSTEM: 'Sistema de referência',
    REGIME: 'Regime',
    APOAPSIS: 'Apoastro',
    PERIAPSIS: 'Periastro',
  },
  NOTIFICATIONS: {
    TITLE: 'Próximo lançamento',
    SUBTITLE: 'tentará o lançamento de',
    TWENTY_FOUR_HOURS: 'em 24 horas',
    ONE_HOUR: 'em 1 hora',
    T_MINUS_TEN_MINS: 'Em 10 minutos',
    FLIGHT: 'Vôo',
    READY_FOR_LAUNCH:
      'pronto para o lançamento. A transmissão ao vivo já está disponível',
  },
};

export default pt;
