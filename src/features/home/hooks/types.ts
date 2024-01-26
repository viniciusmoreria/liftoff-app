import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { InfiniteData } from '@tanstack/react-query';

export interface Status {
  id: number;
  name: string;
  abbrev: string;
  description: string;
}

export interface Update {
  id: number;
  profile_image: string;
  comment: string;
  info_url: string;
  created_by: string;
  created_on: Date;
}

export interface LaunchServiceProvider {
  id: number;
  url: string;
  name: string;
  featured: boolean;
  type: string;
  country_code: string;
  abbrev: string;
  description: string;
  administrator: string;
  founding_year: string;
  launchers: string;
  spacecraft: string;
  launch_library_url: string;
  total_launch_count: number;
  consecutive_successful_launches: number;
  successful_launches: number;
  failed_launches: number;
  pending_launches: number;
  consecutive_successful_landings: number;
  successful_landings: number;
  failed_landings: number;
  attempted_landings: number;
  info_url: string;
  wiki_url: string;
  logo_url: string;
  image_url: string;
  nation_url: string;
}

export interface Manufacturer {
  id: number;
  url: string;
  name: string;
  featured: boolean;
  type: string;
  country_code: string;
  abbrev: string;
  description: string;
  administrator: string;
  founding_year: string;
  launchers: string;
  spacecraft: string;
  launch_library_url: string;
  total_launch_count: number;
  consecutive_successful_launches: number;
  successful_launches: number;
  failed_launches: number;
  pending_launches: number;
  consecutive_successful_landings: number;
  successful_landings: number;
  failed_landings: number;
  attempted_landings: number;
  info_url: string;
  wiki_url: string;
  logo_url: string;
  image_url: string;
  nation_url: string;
}

export interface Agency {
  id: number;
  url: string;
  name: string;
  type: string;
}

export interface Program {
  id: number;
  url: string;
  name: string;
  description: string;
  agencies: Agency[];
  image_url: string;
  start_date: Date;
  end_date?: any;
  info_url: string;
  wiki_url: string;
  mission_patches: any[];
}

export interface Configuration {
  id: number;
  url: string;
  name: string;
  description: string;
  family: string;
  full_name: string;
  manufacturer: Manufacturer;
  program: Program[];
  variant: string;
  alias: string;
  min_stage?: number;
  max_stage?: number;
  length?: number;
  diameter?: number;
  maiden_flight: string;
  launch_cost: string;
  launch_mass?: number;
  leo_capacity?: number;
  gto_capacity?: number;
  to_thrust?: number;
  apogee?: number;
  vehicle_range?: any;
  image_url: string;
  info_url: string;
  wiki_url: string;
  total_launch_count: number;
  consecutive_successful_launches: number;
  successful_launches: number;
  failed_launches: number;
  pending_launches: number;
}

export interface Launcher {
  id: number;
  url: string;
  details: string;
  flight_proven: boolean;
  serial_number: string;
  status: string;
  image_url: string;
  successful_landings: number;
  attempted_landings: number;
  flights: number;
  last_launch_date?: Date;
  first_launch_date?: Date;
}

export interface Location {
  id: number;
  name: string;
  abbrev: string;
  description: string;
  location?: any;
  successful_landings: number;
}

export interface Type {
  id: number;
  name: string;
  abbrev: string;
  description: string;
}

export interface Landing {
  id: number;
  attempt: boolean;
  success?: any;
  description: string;
  location: Location;
  type: Type;
}

export interface LauncherStage {
  id: number;
  type: string;
  reused?: boolean;
  launcher_flight_number?: any;
  launcher: Launcher;
  landing: Landing;
  previous_flight_date?: any;
  turn_around_time_days?: any;
  previous_flight?: any;
}

export interface Role {
  id: number;
  role: string;
  priority: number;
}

export interface Type2 {
  id: number;
  name: string;
}

export interface Status2 {
  id: number;
  name: string;
}

export interface Agency2 {
  id: number;
  url: string;
  name: string;
  type: string;
}

export interface Astronaut {
  id: number;
  url: string;
  name: string;
  type: Type2;
  status: Status2;
  agency: Agency2;
  date_of_birth: string;
  date_of_death?: any;
  nationality: string;
  twitter: string;
  instagram: string;
  bio: string;
  profile_image: string;
  wiki: string;
  last_flight?: any;
  first_flight?: any;
}

export interface LaunchCrew {
  id: number;
  role: Role;
  astronaut: Astronaut;
}

export interface Role2 {
  id: number;
  role: string;
  priority: number;
}

export interface Type3 {
  id: number;
  name: string;
}

export interface Status3 {
  id: number;
  name: string;
}

export interface Agency3 {
  id: number;
  url: string;
  name: string;
  type: string;
}

export interface Astronaut2 {
  id: number;
  url: string;
  name: string;
  type: Type3;
  status: Status3;
  agency: Agency3;
  date_of_birth: string;
  date_of_death?: any;
  nationality: string;
  twitter: string;
  instagram: string;
  bio: string;
  profile_image: string;
  wiki: string;
  last_flight?: any;
  first_flight?: any;
}

export interface LandingCrew {
  id: number;
  role: Role2;
  astronaut: Astronaut2;
}

export interface Status4 {
  id: number;
  name: string;
}

export interface Type4 {
  id: number;
  name: string;
}

export interface Agency4 {
  id: number;
  url: string;
  name: string;
  featured: boolean;
  type: string;
  country_code: string;
  abbrev: string;
  description: string;
  administrator: string;
  founding_year: string;
  launchers: string;
  spacecraft: string;
  parent?: any;
  image_url: string;
}

export interface SpacecraftConfig {
  id: number;
  url: string;
  name: string;
  type: Type4;
  agency: Agency4;
  in_use: boolean;
  capability: string;
  history: string;
  details: string;
  maiden_flight: string;
  height?: number;
  diameter?: number;
  human_rated: boolean;
  crew_capacity?: number;
  payload_capacity?: number;
  flight_life: string;
  image_url: string;
  nation_url: string;
  wiki_link: string;
  info_link: string;
}

export interface Spacecraft {
  id: number;
  url: string;
  name: string;
  serial_number: string;
  status: Status4;
  description: string;
  spacecraft_config: SpacecraftConfig;
}

export interface SpacecraftStage {
  id: number;
  url: string;
  mission_end?: any;
  destination: string;
  launch_crew: LaunchCrew[];
  onboard_crew: any[];
  landing_crew: LandingCrew[];
  spacecraft: Spacecraft;
  docking_events: any[];
}

export interface Rocket {
  id: number;
  configuration: Configuration;
  launcher_stage: LauncherStage[];
  spacecraft_stage: SpacecraftStage;
}

export interface Orbit {
  id: number;
  name: string;
  abbrev: string;
}

export interface Mission {
  id: number;
  name: string;
  description: string;
  launch_designator?: any;
  type: string;
  orbit: Orbit;
}

export interface Location2 {
  id: number;
  url: string;
  name: string;
  country_code: string;
  map_image: string;
  total_launch_count: number;
  total_landing_count: number;
}

export interface Pad {
  id: number;
  url: string;
  agency_id?: number;
  name: string;
  info_url: string;
  wiki_url: string;
  map_url: string;
  latitude: string;
  longitude: string;
  location: Location2;
  map_image: string;
  total_launch_count: number;
  orbital_launch_attempt_count: number;
}

export interface InfoURL {
  priority: number;
  title: string;
  description: string;
  feature_image?: any;
  url: string;
}

export interface VidURL {
  priority: number;
  title: string;
  description: string;
  feature_image: string;
  url: string;
}

export interface Agency5 {
  id: number;
  url: string;
  name: string;
  type: string;
}

export interface Program2 {
  id: number;
  url: string;
  name: string;
  description: string;
  agencies: Agency5[];
  image_url: string;
  start_date: Date;
  end_date?: any;
  info_url: string;
  wiki_url: string;
  mission_patches: any[];
}

export interface Agency6 {
  id: number;
  url: string;
  name: string;
  type: string;
}

export interface MissionPatch {
  id: number;
  name: string;
  priority: number;
  image_url: string;
  agency: Agency6;
}

export interface Launch {
  id: string;
  url: string;
  slug: string;
  flightclub_url: string;
  r_spacex_api_id?: any;
  name: string;
  status: Status;
  last_updated: Date;
  updates: Update[];
  net: Date;
  window_end: Date;
  window_start: Date;
  probability?: number;
  holdreason: string;
  failreason: string;
  hashtag?: any;
  launch_service_provider: LaunchServiceProvider;
  rocket: Rocket;
  mission: Mission;
  pad: Pad;
  infoURLs: InfoURL[];
  vidURLs: VidURL[];
  webcast_live: boolean;
  image: string;
  infographic?: any;
  program: Program2[];
  orbital_launch_attempt_count?: number;
  location_launch_attempt_count?: number;
  pad_launch_attempt_count?: number;
  agency_launch_attempt_count?: number;
  orbital_launch_attempt_count_year?: number;
  location_launch_attempt_count_year?: number;
  pad_launch_attempt_count_year?: number;
  agency_launch_attempt_count_year?: number;
  mission_patches: MissionPatch[];
  type?: string;
}

export interface Article {
  id: string;
  title: string;
  featured: boolean;
  url: string;
  image_url: string;
  summary: string;
  published_at: string;
  news_site: string;
  type?: string;
  launches: [
    {
      id: string;
      launchId: string;
      name: string;
      articles: string[];
      blogs: string[];
      provider: string;
      created_by: string;
      updated_by: string;
    }
  ];
  events: [
    {
      id: string;
      name: string;
      eventId: number;
      articles: string[];
      blogs: string[];
      provider: string;
      created_by: string;
      updated_by: string;
    }
  ];
}

export type ArticleResponse = {
  count: number;
  next: string;
  previous: string;
  results: Article[];
};

export type PreviousQueryCacheType =
  | InfiniteData<
      FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>[]
    >
  | undefined;

export type ArticleQueryCacheType = InfiniteData<Article[]> | undefined;
