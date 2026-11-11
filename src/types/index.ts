export type PageType = 'inicio' | 'agendar';

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price: number | string;
  unit: string;
  badge?: string;
  image?: string;
  icon?: string;
}

export interface BookingQuantities {
  kilosRopa: number;
  cobijaIndividual: number;
  cobijaMatrimonial: number;
  cobijaKing: number;
  tenisZapatos: number;
  peluches: number;
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
  paymentMethod: 'card' | 'transfer' | 'cash';
}
