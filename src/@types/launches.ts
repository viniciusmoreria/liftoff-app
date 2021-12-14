export interface LaunchProps {
  fairings?: any;
  links: Links;
  static_fire_date_utc: Date;
  static_fire_date_unix: number;
  tdb: boolean;
  net: boolean;
  window: number;
  rocket: string;
  success: boolean;
  failures: any[];
  details: string;
  crew: string[];
  ships: string[];
  capsules: string[];
  payloads: string[];
  launchpad: string;
  auto_update: boolean;
  flight_number: number;
  name: string;
  date_utc: Date;
  date_unix: number;
  date_local: Date;
  date_precision: string;
  upcoming: boolean;
  cores: Core[];
  id: string;
}

interface Patch {
  small: string;
  large: string;
}

interface Reddit {
  campaign: string;
  launch: string;
  media: string;
  recovery: string;
}

interface Flickr {
  small: any[];
  original: string[];
}

interface Links {
  patch: Patch;
  reddit: Reddit;
  flickr: Flickr;
  presskit: string;
  webcast: string;
  youtube_id: string;
  article: string;
  wikipedia: string;
}

interface Core {
  core: string;
  flight: number;
  gridfins: boolean;
  legs: boolean;
  reused: boolean;
  landing_attempt: boolean;
  landing_success: boolean;
  landing_type: string;
  landpad: string;
}
