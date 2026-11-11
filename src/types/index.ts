export type PageType = 'inicio' | 'agendar';

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  badge?: string;
  image?: string;
  icon?: string;
}

export interface BookingQuantities {
  diario: number;
  grande: number;
  delicadas: number;
  nordicos: number;
}

export interface BookingFormState {
  fullName: string;
  phone: string;
  address: string;
  floor: string;
  postalCode: string;
  notes: string;
  detergent: 'hipoalergenico' | 'neutro' | 'lanas';
  coldWater: boolean;
  organicSoftener: boolean;
  selectedDate: string;
  selectedSlot: string;
  speed: 'standard' | 'express';
  hasIronPack: boolean;
  paymentMethod: 'card' | 'bizum' | 'cash';
}
