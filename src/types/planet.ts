export type PlanetId = 
  | 'mercury' 
  | 'venus' 
  | 'earth' 
  | 'mars' 
  | 'jupiter' 
  | 'saturn' 
  | 'uranus' 
  | 'neptune';

export interface AtmosphereGas {
  gas: string;
  percentage: number;
  color: string;
}

export interface MoonInfo {
  name: string;
  diameterKm: number;
  description: string;
  discoveryYear: number;
  highlight: string;
}

export interface MissionInfo {
  name: string;
  agency: string;
  year: string;
  type: 'Flyby' | 'Orbiter' | 'Lander' | 'Rover' | 'Sample Return';
  achievement: string;
}

export interface PlanetData {
  id: PlanetId;
  name: string;
  order: number;
  romanNumeral: string;
  tagline: string;
  type: 'Terrestrial Planet' | 'Gas Giant' | 'Ice Giant';
  diameterKm: number;
  diameterStr: string;
  mass: string;
  distanceFromSunKm: number;
  distanceFromSunAU: number;
  distanceStr: string;
  avgTempC: number;
  avgTempStr: string;
  minTempC: number;
  maxTempC: number;
  dayLengthHours: number;
  dayLengthStr: string;
  yearLengthDays: number;
  yearLengthStr: string;
  moonsCount: number;
  gravityMss: number;
  gravityVsEarth: number;
  orbitalVelocityKmS: number;
  axialTiltDeg: number;
  colors: {
    primary: string;
    secondary: string;
    glow: string;
    ringColor?: string;
    accent: string;
  };
  overview: string;
  scientificDescription: string;
  interestingFacts: string[];
  atmosphericComposition: AtmosphereGas[];
  surfaceCharacteristics: {
    geology: string;
    elevationRecord?: string;
    magneticField: string;
    notableFeatures: string[];
  };
  majorMoons: MoonInfo[];
  missions: MissionInfo[];
}

export interface DiscoveryStory {
  id: string;
  category: 'Deep Space Mission' | 'Planetary Phenomenon' | 'Astrophysics Breakthrough' | 'Exoplanet Discovery';
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  imageAlt: string;
  summary: string;
  body: string[];
  keyStats: { label: string; value: string }[];
  accentColor: string;
}
