export interface LaunchPaginationProps {
  docs: LaunchProps[];
  totalDocs: number;
  offset: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage?: number;
  nextPage: number;
}

export interface LaunchProps {
  fairings: Fairings;
  links: Links;
  static_fire_date_utc: Date;
  static_fire_date_unix: number;
  net: boolean;
  window: number;
  rocket: Rocket;
  success: boolean;
  failures: Failure[];
  details: string;
  crew: string[];
  ships: string[];
  capsules: string[];
  payloads: Payload[];
  launchpad: Launchpad;
  flight_number: number;
  name: string;
  date_utc: Date;
  date_unix: number;
  date_local: Date;
  date_precision: 'hour' | 'day' | 'month' | 'year' | 'quarter' | 'half';
  upcoming: boolean;
  cores: Core[];
  auto_update: boolean;
  tbd: boolean;
  launch_library_id?: string;
  id: string;
}

export interface Fairings {
  reused: boolean;
  recovery_attempt: boolean;
  recovered: boolean;
  ships: string[];
}

export interface Patch {
  small: string;
  large: string;
}

export interface Reddit {
  campaign?: string;
  launch?: string;
  media?: string;
  recovery?: string;
}

export interface Flickr {
  small: string[];
  original: string[];
}

export interface Links {
  patch: Patch;
  reddit: Reddit;
  flickr: Flickr;
  presskit?: string;
  webcast: string;
  youtube_id: string;
  article: string;
  wikipedia: string;
}

export interface Height {
  meters: number;
  feet: number;
}

export interface Diameter {
  meters: number;
  feet: number;
}

export interface Mass {
  kg: number;
  lb: number;
}

export interface ThrustSeaLevel {
  kN: number;
  lbf: number;
}

export interface ThrustVacuum {
  kN: number;
  lbf: number;
}

export interface FirstStage {
  thrust_sea_level: ThrustSeaLevel;
  thrust_vacuum: ThrustVacuum;
  reusable: boolean;
  engines: number;
  fuel_amount_tons: number;
  burn_time_sec: number;
}

export interface Thrust {
  kN: number;
  lbf: number;
}

export interface Height2 {
  meters: number;
  feet: number;
}

export interface Diameter2 {
  meters: number;
  feet: number;
}

export interface CompositeFairing {
  height: Height2;
  diameter: Diameter2;
}

export interface Payloads {
  composite_fairing: CompositeFairing;
  option_1: string;
}

export interface SecondStage {
  thrust: Thrust;
  payloads: Payloads;
  reusable: boolean;
  engines: number;
  fuel_amount_tons: number;
  burn_time_sec: number;
}

export interface Isp {
  sea_level: number;
  vacuum: number;
}

export interface ThrustSeaLevel2 {
  kN: number;
  lbf: number;
}

export interface ThrustVacuum2 {
  kN: number;
  lbf: number;
}

export interface Engines {
  isp: Isp;
  thrust_sea_level: ThrustSeaLevel2;
  thrust_vacuum: ThrustVacuum2;
  number: number;
  type: string;
  version: string;
  layout: string;
  engine_loss_max: number;
  propellant_1: string;
  propellant_2: string;
  thrust_to_weight: number;
}

export interface LandingLegs {
  number: number;
  material?: string;
}

export interface PayloadWeight {
  id: string;
  name: string;
  kg: number;
  lb: number;
}

export interface Rocket {
  height: Height;
  diameter: Diameter;
  mass: Mass;
  first_stage: FirstStage;
  second_stage: SecondStage;
  engines: Engines;
  landing_legs: LandingLegs;
  payload_weights: PayloadWeight[];
  flickr_images: string[];
  name: string;
  type: string;
  active: boolean;
  stages: number;
  boosters: number;
  cost_per_launch: number;
  success_rate_pct: number;
  first_flight: string;
  country: string;
  company: string;
  wikipedia: string;
  description: string;
  id: string;
}

export interface Failure {
  time: number;
  altitude?: number;
  reason: string;
}

export interface Dragon {
  capsule?: string;
  mass_returned_kg?: number;
  mass_returned_lbs?: number;
  flight_time_sec?: number;
  manifest?: string;
  water_landing?: boolean;
  land_landing?: boolean;
}

export interface Payload {
  dragon: Dragon;
  name: string;
  type: string;
  reused: boolean;
  launch: string;
  customers: string[];
  norad_ids: number[];
  nationalities: string[];
  manufacturers: string[];
  mass_kg: number;
  mass_lbs: number;
  orbit: string;
  reference_system: string;
  regime: string;
  longitude?: number;
  semi_major_axis_km?: number;
  eccentricity?: number;
  periapsis_km: number;
  apoapsis_km: number;
  inclination_deg: number;
  period_min?: number;
  lifespan_years?: number;
  epoch?: Date;
  mean_motion?: number;
  raan?: number;
  arg_of_pericenter?: number;
  mean_anomaly?: number;
  id: string;
}

export interface Images {
  large: string[];
}

export interface Launchpad {
  images: Images;
  name: string;
  full_name: string;
  locality: string;
  region: string;
  latitude: number;
  longitude: number;
  launch_attempts: number;
  launch_successes: number;
  rockets: string[];
  timezone: string;
  launches: string[];
  status: string;
  details: string;
  id: string;
}

export interface Core2 {
  serial: string;
  id: string;
}

export interface Core {
  core: Core2;
  flight: number;
  gridfins: boolean;
  legs: boolean;
  reused: boolean;
  landing_attempt: boolean;
  landing_success?: boolean;
  landing_type?: string;
  landpad?: {
    name: string;
    id: string;
  };
}
