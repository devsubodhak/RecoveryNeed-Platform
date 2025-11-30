export type Language = 'en' | 'si' | 'ta';

export enum DamageType {
  HOME = 'HOME',
  BUSINESS = 'BUSINESS',
  VEHICLE = 'VEHICLE'
}

export enum BusinessSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE'
}

export enum VehicleType {
  BIKE = 'BIKE',
  CAR = 'CAR',
  VAN = 'VAN',
  CAB = 'CAB',
  LORRY = 'LORRY',
  BUS = 'BUS'
}

export interface HomeDetails {
  residents: number;
  damagePercentage: number; // 0-100
  memberAges: number[];
}

export interface BusinessDetails {
  size: BusinessSize;
  damagePercentage: number; // 0-100
}

export interface VehicleDetails {
  type: VehicleType;
  count: number;
}

export interface DamageReport {
  id: string;
  lat: number;
  lng: number;
  type: DamageType;
  timestamp: number;
  description?: string;
  image?: string; // Base64 encoded image string
  homeDetails?: HomeDetails;
  businessDetails?: BusinessDetails;
  vehicleDetails?: VehicleDetails;
}

export interface AIAnalysisResult {
  type: DamageType;
  homeDetails?: HomeDetails;
  businessDetails?: BusinessDetails;
  vehicleDetails?: VehicleDetails;
  confidence: number;
}