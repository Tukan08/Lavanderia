import { Order, OrderStatus } from '../types';

const STORAGE_KEY = 'lavanderia_las_danis_orders_v1';

export const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; icon: string; step: number }> = {
  AGENDADO: { label: 'Recogida Agendada', color: 'bg-surface-container-high text-on-surface', icon: 'schedule', step: 1 },
  EN_CAMINO: { label: 'Repartidor en Camino', color: 'bg-secondary-fixed text-on-secondary-fixed', icon: 'electric_moped', step: 2 },
  EN_LAVADO: { label: 'En Lavado y Cuidado', color: 'bg-primary-fixed text-on-primary-fixed', icon: 'local_laundry_service', step: 3 },
  PLANCHADO: { label: 'Secado y Planchado', color: 'bg-tertiary-fixed text-on-tertiary-fixed', icon: 'iron', step: 4 },
  LISTO: { label: 'Listo para Entrega', color: 'bg-secondary-container text-on-secondary-container', icon: 'inventory_2', step: 5 },
  ENTREGADO: { label: 'Entregado con Éxito', color: 'bg-green-100 text-green-800', icon: 'check_circle', step: 6 },
};

const INITIAL_DEMO_ORDERS: Order[] = [
  {
    folio: 'LD-8492',
    createdAt: new Date().toISOString(),
    customerName: 'Daniela Morales',
    customerPhone: '55 9876 5432',
    address: 'Av. Insurgentes Sur 450, Col. Roma',
    floor: 'Depto 402',
    postalCode: '06700',
    notes: 'Tocar el timbre del 402, dejar con vigilancia si no respondo.',
    quantities: {
      kilosRopa: 5,
      cobijaIndividual: 0,
      cobijaMatrimonial: 1,
      cobijaKing: 0,
      tenisZapatos: 1,
      peluches: 0,
    },
    speed: 'standard',
    pickupDate: new Date().toISOString().split('T')[0],
    pickupSlot: 'Mediodía (12:00 - 15:00)',
    detergent: 'hipoalergenico',
    coldWater: true,
    organicSoftener: true,
    paymentMethod: 'cash',
    subtotal: 165,
    discount: 16.5,
    total: 148.5,
    status: 'EN_LAVADO',
    statusUpdatedAt: new Date().toISOString(),
    adminNotes: 'Prendas clasificadas en lote lavanda.',
  },
  {
    folio: 'LD-6310',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    customerName: 'Carlos Mendoza',
    customerPhone: '55 1234 9876',
    address: 'Calle Durango 180, Condesa',
    floor: 'Piso 2',
    postalCode: '06140',
    notes: 'Favor de avisar por WhatsApp 10 min antes.',
    quantities: {
      kilosRopa: 7,
      cobijaIndividual: 1,
      cobijaMatrimonial: 0,
      cobijaKing: 0,
      tenisZapatos: 2,
      peluches: 1,
    },
    pelucheSize: 'Mediano',
    speed: 'express',
    pickupDate: new Date().toISOString().split('T')[0],
    pickupSlot: 'Tarde (16:00 - 19:00)',
    detergent: 'neutro',
    coldWater: true,
    organicSoftener: true,
    paymentMethod: 'transfer',
    subtotal: 254,
    discount: 25.4,
    total: 228.6,
    status: 'EN_CAMINO',
    statusUpdatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    adminNotes: 'Repartidor Juan asignado para entrega hoy.',
  },
];

export function getOrders(): Order[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_ORDERS));
      return INITIAL_DEMO_ORDERS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error al leer pedidos de localStorage', e);
    return INITIAL_DEMO_ORDERS;
  }
}

export function saveOrder(order: Order): Order {
  const currentOrders = getOrders();
  const updatedOrders = [order, ...currentOrders.filter(o => o.folio !== order.folio)];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOrders));
  return order;
}

export function getOrderByFolio(folio: string): Order | undefined {
  const orders = getOrders();
  const cleanFolio = folio.trim().toUpperCase();
  return orders.find(o => o.folio.toUpperCase() === cleanFolio);
}

export function updateOrderStatus(folio: string, newStatus: OrderStatus, adminNotes?: string): Order | undefined {
  const orders = getOrders();
  const index = orders.findIndex(o => o.folio.toUpperCase() === folio.trim().toUpperCase());
  if (index === -1) return undefined;

  const updated: Order = {
    ...orders[index],
    status: newStatus,
    statusUpdatedAt: new Date().toISOString(),
    adminNotes: adminNotes !== undefined ? adminNotes : orders[index].adminNotes,
  };

  orders[index] = updated;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  return updated;
}

export function generateFolio(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `LD-${randomNum}`;
}

export function ordersToCSV(orders: Order[]): string {
  const headers = [
    'Folio',
    'Fecha Creacion',
    'Cliente',
    'Telefono',
    'Direccion',
    'Piso/Depto',
    'CP',
    'Fecha Recogida',
    'Franja Horaria',
    'Velocidad',
    'Kilos Ropa',
    'Cobija Individual',
    'Cobija Matrimonial',
    'Cobija King',
    'Tenis/Zapatos (Pares)',
    'Peluches',
    'Detergente',
    'Metodo Pago',
    'Subtotal MXN',
    'Descuento MXN',
    'Total MXN',
    'Estado',
    'Ultima Actualizacion',
    'Notas Cliente',
    'Notas Admin'
  ];

  const escapeField = (val: any) => {
    const str = String(val ?? '').replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = orders.map(o => [
    o.folio,
    o.createdAt,
    o.customerName,
    o.customerPhone,
    o.address,
    o.floor,
    o.postalCode,
    o.pickupDate,
    o.pickupSlot,
    o.speed === 'express' ? 'Express (Mismo Día)' : 'Estándar',
    o.quantities.kilosRopa,
    o.quantities.cobijaIndividual,
    o.quantities.cobijaMatrimonial,
    o.quantities.cobijaKing,
    o.quantities.tenisZapatos,
    o.quantities.peluches,
    o.detergent,
    o.paymentMethod,
    o.subtotal.toFixed(2),
    o.discount.toFixed(2),
    o.total.toFixed(2),
    STATUS_CONFIG[o.status].label,
    o.statusUpdatedAt,
    o.notes,
    o.adminNotes || ''
  ].map(escapeField).join(','));

  return [headers.join(','), ...rows].join('\n');
}

export function downloadOrdersCSV(orders?: Order[]): void {
  const targetOrders = orders || getOrders();
  const csvContent = ordersToCSV(targetOrders);
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  const dateStr = new Date().toISOString().split('T')[0];
  link.setAttribute('download', `pedidos_lavanderia_las_danis_${dateStr}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
