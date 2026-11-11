export type PageType = 'inicio' | 'agendar' | 'rastreo' | 'admin';

export type OrderStatus =
  | 'AGENDADO'
  | 'EN_CAMINO'
  | 'EN_LAVADO'
  | 'PLANCHADO'
  | 'LISTO'
  | 'ENTREGADO';

export interface BookingQuantities {
  kilosRopa: number;
  cobijaIndividual: number;
  cobijaMatrimonial: number;
  cobijaKing: number;
  tenisZapatos: number;
  peluches: number;
}

export interface Order {
  folio: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  address: string;
  floor: string;
  postalCode: string;
  notes: string;
  quantities: BookingQuantities;
  pelucheSize?: string;
  speed: 'standard' | 'express';
  pickupDate: string; // YYYY-MM-DD
  pickupSlot: string;
  detergent: 'hipoalergenico' | 'neutro' | 'lanas';
  coldWater: boolean;
  organicSoftener: boolean;
  paymentMethod: 'card' | 'transfer' | 'cash';
  subtotal: number;
  discount: number;
  total: number;
  status: OrderStatus;
  statusUpdatedAt: string;
  adminNotes?: string;
}
