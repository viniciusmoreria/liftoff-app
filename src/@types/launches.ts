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
  prevPage?: any;
  nextPage: number;
}

export interface LaunchProps {
  fairings: Fairings;
  links: Links;
  static_fire_date_utc?: any;
  static_fire_date_unix?: any;
  net: boolean;
  window?: any;
  rocket: Rocket;
  success?: any;
  failures: any[];
  details?: any;
  crew: any[];
  ships: any[];
  capsules: any[];
  payloads: Payload[];
  launchpad: Launchpad;
  flight_number: number;
  name: string;
  date_utc: Date;
  date_unix: number;
  date_local: Date;
  date_precision: string;
  upcoming: boolean;
  cores: Core[];
  auto_update: boolean;
  tbd: boolean;
  launch_library_id: string;
  id: string;
}

interface Core {
  core?: any;
  flight?: any;
  gridfins?: any;
  legs?: any;
  reused?: any;
  landing_attempt?: any;
  landing_success?: any;
  landing_type?: any;
  landpad?: any;
}

interface Fairings {
  reused?: any;
  recovery_attempt?: any;
  recovered?: any;
  ships: any[];
}

interface Patch {
  small?: any;
  large?: any;
}

interface Reddit {
  campaign?: any;
  launch?: any;
  media?: any;
  recovery?: any;
}

interface Flickr {
  small: any[];
  original: any[];
}

interface Links {
  patch: Patch;
  reddit: Reddit;
  flickr: Flickr;
  presskit?: any;
  webcast?: any;
  youtube_id?: any;
  article?: any;
  wikipedia?: any;
}

interface Height {
  meters: number;
  feet: number;
}

interface Diameter {
  meters: number;
  feet: number;
}

interface Mass {
  kg: number;
  lb: number;
}

interface ThrustSeaLevel {
  kN: number;
  lbf: number;
}

interface ThrustVacuum {
  kN: number;
  lbf: number;
}

interface FirstStage {
  thrust_sea_level: ThrustSeaLevel;
  thrust_vacuum: ThrustVacuum;
  reusable: boolean;
  engines: number;
  fuel_amount_tons: number;
  burn_time_sec: number;
}

interface Thrust {
  kN: number;
  lbf: number;
}

interface Height2 {
  meters: number;
  feet: number;
}

interface Diameter2 {
  meters: number;
  feet: number;
}

interface CompositeFairing {
  height: Height2;
  diameter: Diameter2;
}

interface Payloads {
  composite_fairing: CompositeFairing;
  option_1: string;
}

interface SecondStage {
  thrust: Thrust;
  payloads: Payloads;
  reusable: boolean;
  engines: number;
  fuel_amount_tons: number;
  burn_time_sec: number;
}

interface Isp {
  sea_level: number;
  vacuum: number;
}

interface ThrustSeaLevel2 {
  kN: number;
  lbf: number;
}

interface ThrustVacuum2 {
  kN: number;
  lbf: number;
}

interface Engines {
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

interface LandingLegs {
  number: number;
  material: string;
}

interface PayloadWeight {
  id: string;
  name: string;
  kg: number;
  lb: number;
}

interface Rocket {
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

interface Dragon {
  capsule?: any;
  mass_returned_kg?: any;
  mass_returned_lbs?: any;
  flight_time_sec?: any;
  manifest?: any;
  water_landing?: any;
  land_landing?: any;
}

interface Payload {
  dragon: Dragon;
  name: string;
  type: string;
  reused: boolean;
  launch: string;
  customers: string[];
  norad_ids: any[];
  nationalities: string[];
  manufacturers: string[];
  mass_kg: number;
  mass_lbs: number;
  orbit: string;
  reference_system: string;
  regime: string;
  longitude: number;
  semi_major_axis_km?: any;
  eccentricity?: any;
  periapsis_km?: any;
  apoapsis_km?: any;
  inclination_deg?: any;
  period_min?: any;
  lifespan_years: number;
  epoch?: any;
  mean_motion?: any;
  raan?: any;
  arg_of_pericenter?: any;
  mean_anomaly?: any;
  id: string;
}

interface Images {
  large: string[];
}

interface Launchpad {
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
