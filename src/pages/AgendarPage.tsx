import React, { useState } from 'react';
import { PageType, BookingQuantities, Order } from '../types';
import { saveOrder, generateFolio } from '../utils/orderStorage';

interface AgendarPageProps {
  onNavigate: (page: PageType, sectionId?: string) => void;
  onOrderCreated?: (folio: string) => void;
}

const PRICES = {
  kiloNormal: 18,
  kiloExpress: 22,
  cobijaIndividual: 40,
  cobijaMatrimonial: 45,
  cobijaKing: 50,
  tenisZapatos: 30,
};

export const AgendarPage: React.FC<AgendarPageProps> = ({ onNavigate, onOrderCreated }) => {
  // Quantities
  const [quantities, setQuantities] = useState<BookingQuantities>({
    kilosRopa: 5,
    cobijaIndividual: 0,
    cobijaMatrimonial: 1,
    cobijaKing: 0,
    tenisZapatos: 1,
    peluches: 0,
  });

  // Peluche size
  const [pelucheSizes, setPelucheSizes] = useState<string>('Mediano');

  // Delivery speed
  const [speed, setSpeed] = useState<'standard' | 'express'>('standard');

  // Detergent & preferences
  const [detergent, setDetergent] = useState<'hipoalergenico' | 'neutro' | 'lanas'>('hipoalergenico');
  const [coldWater, setColdWater] = useState(true);
  const [organicSoftener, setOrganicSoftener] = useState(true);

  // Address & Contact
  const [name, setName] = useState('Daniela Morales');
  const [phone, setPhone] = useState('55 9876 5432');
  const [street, setStreet] = useState('Av. Insurgentes Sur 450');
  const [floor, setFloor] = useState('Depto 402');
  const [postalCode, setPostalCode] = useState('06700');
  const [notes, setNotes] = useState('');

  // Date setup (today & tomorrow helper)
  const todayISO = new Date().toISOString().split('T')[0];
  const tomorrowDate = new Date(Date.now() + 86400000);
  const tomorrowISO = tomorrowDate.toISOString().split('T')[0];
  const dayAfterTomorrow = new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0];

  const [selectedDate, setSelectedDate] = useState(todayISO);
  const [selectedSlot, setSelectedSlot] = useState('Mediodía (12:00 - 15:00)');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'cash'>('cash');

  // Validation errors
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [copiedFolio, setCopiedFolio] = useState(false);

  // Submit Modal & Generated Order
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // Handlers
  const updateQty = (key: keyof BookingQuantities, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta),
    }));
  };

  // Calculations
  const kiloPrice = speed === 'express' ? PRICES.kiloExpress : PRICES.kiloNormal;
  const subtotal =
    quantities.kilosRopa * kiloPrice +
    quantities.cobijaIndividual * PRICES.cobijaIndividual +
    quantities.cobijaMatrimonial * PRICES.cobijaMatrimonial +
    quantities.cobijaKing * PRICES.cobijaKing +
    quantities.tenisZapatos * PRICES.tenisZapatos;

  const discount = subtotal * 0.10;
  const total = Math.max(0, subtotal - discount);

  const formatCurrency = (val: number) => `$${val.toFixed(2)} MXN`;

  const totalItemsCount =
    quantities.kilosRopa +
    quantities.cobijaIndividual +
    quantities.cobijaMatrimonial +
    quantities.cobijaKing +
    quantities.tenisZapatos +
    quantities.peluches;

  const handleConfirmOrder = () => {
    const errors: string[] = [];

    if (!name.trim()) {
      errors.push('Por favor ingresa tu nombre completo.');
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 8) {
      errors.push('Por favor ingresa un número de teléfono o WhatsApp válido.');
    }
    if (!street.trim()) {
      errors.push('Por favor ingresa tu dirección de recogida.');
    }
    if (totalItemsCount === 0) {
      errors.push('Por favor selecciona al menos un servicio, prenda o kilo de ropa.');
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      window.scrollTo({ top: 300, behavior: 'smooth' });
      return;
    }

    setValidationErrors([]);

    // Generate unique Folio
    const newFolio = generateFolio();

    const newOrder: Order = {
      folio: newFolio,
      createdAt: new Date().toISOString(),
      customerName: name.trim(),
      customerPhone: phone.trim(),
      address: street.trim(),
      floor: floor.trim(),
      postalCode: postalCode.trim(),
      notes: notes.trim(),
      quantities,
      pelucheSize: quantities.peluches > 0 ? pelucheSizes : undefined,
      speed,
      pickupDate: selectedDate,
      pickupSlot: selectedSlot,
      detergent,
      coldWater,
      organicSoftener,
      paymentMethod,
      subtotal,
      discount,
      total,
      status: 'AGENDADO',
      statusUpdatedAt: new Date().toISOString(),
    };

    saveOrder(newOrder);
    setCreatedOrder(newOrder);
    setOrderConfirmed(true);

    if (onOrderCreated) {
      onOrderCreated(newFolio);
    }
  };

  const handleCopyFolio = () => {
    if (createdOrder) {
      navigator.clipboard.writeText(createdOrder.folio);
      setCopiedFolio(true);
      setTimeout(() => setCopiedFolio(false), 2000);
    }
  };

  // Helper for human date preview
  const formatFriendlyDate = (dateStr: string) => {
    try {
      const parts = dateStr.split('-');
      const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      return d.toLocaleDateString('es-MX', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full max-w-[1200px] mx-auto px-margin lg:px-margin-desktop py-space-md lg:py-space-lg overflow-hidden">
        {/* Subtle decorative ambient orbs */}
        <div className="absolute -top-24 right-10 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-secondary-container/15 rounded-full blur-3xl pointer-events-none -z-10"></div>

        {/* Header & Breadcrumbs */}
        <div className="space-y-space-sm mb-space-lg">
          <div className="flex flex-wrap items-center justify-between gap-space-sm">
            <nav className="flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant">
              <button
                onClick={() => onNavigate('inicio')}
                className="hover:text-primary transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">home</span>
                <span>Inicio</span>
              </button>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-primary font-semibold">Agendar Recogida</span>
            </nav>
            <span className="inline-flex items-center gap-1.5 px-space-md py-1 bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm rounded-full shadow-sm">
              <span className="material-symbols-outlined text-xs text-secondary animate-pulse">timer</span>
              Generación de Folio Inmediata
            </span>
          </div>
          <div className="max-w-3xl">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Agenda la Recogida de tus Prendas
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">
              Selecciona tus prendas o kilos de ropa, elige fecha y franja horaria en el calendario y recibe tu folio de seguimiento en tiempo real.
            </p>
          </div>
        </div>

        {/* Validation Errors Notice */}
        {validationErrors.length > 0 && (
          <div className="mb-space-md p-space-md rounded-2xl bg-error-container text-on-error-container text-body-sm shadow-sm space-y-1 animate-fade-in border border-error/30">
            <div className="flex items-center gap-2 font-bold font-title-md">
              <span className="material-symbols-outlined text-xl">warning</span>
              <span>Por favor completa los siguientes campos:</span>
            </div>
            <ul className="list-disc list-inside space-y-0.5 text-xs sm:text-sm pl-2">
              {validationErrors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Visual Stepper Progress Bar */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md lg:p-space-lg shadow-sm mb-space-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md relative">
            {/* Step 1 */}
            <div className="flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-lg text-label-lg font-bold shadow-md shadow-primary/25 shrink-0">
                1
              </div>
              <div className="min-w-0">
                <p className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">Paso 1</p>
                <p className="font-label-lg text-label-lg text-on-surface truncate">Prendas & Kilos</p>
              </div>
            </div>
            {/* Step 2 */}
            <div className="flex items-center gap-space-sm opacity-90">
              <div className="w-10 h-10 rounded-full bg-surface-container-high text-primary flex items-center justify-center font-label-lg text-label-lg font-bold shrink-0">
                2
              </div>
              <div className="min-w-0">
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Paso 2</p>
                <p className="font-label-lg text-label-lg text-on-surface truncate">Dirección & Contacto</p>
              </div>
            </div>
            {/* Step 3 */}
            <div className="flex items-center gap-space-sm opacity-90">
              <div className="w-10 h-10 rounded-full bg-surface-container-high text-primary flex items-center justify-center font-label-lg text-label-lg font-bold shrink-0">
                3
              </div>
              <div className="min-w-0">
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Paso 3</p>
                <p className="font-label-lg text-label-lg text-on-surface truncate">Fecha & Calendario</p>
              </div>
            </div>
            {/* Step 4 */}
            <div className="flex items-center gap-space-sm opacity-80">
              <div className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-label-lg text-label-lg font-bold shrink-0">
                4
              </div>
              <div className="min-w-0">
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Paso 4</p>
                <p className="font-label-lg text-label-lg text-on-surface truncate">Confirmar & Folio</p>
              </div>
            </div>
          </div>
          <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-space-md overflow-hidden">
            <div className="bg-primary h-full w-2/5 rounded-full transition-all duration-500"></div>
          </div>
        </div>

        {/* Main Two-Column Workflow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
          {/* LEFT COLUMN: Interactive Form Sections */}
          <div className="lg:col-span-8 space-y-space-xl">
            {/* SECTION 1: Service Categories */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg lg:p-space-xl shadow-sm space-y-space-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <span className="w-8 h-8 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold text-label-md">1</span>
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Selecciona tus Servicios y Cantidades</h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Precios en pesos mexicanos ($ MXN)</p>
                  </div>
                </div>
                <span className="hidden sm:inline-flex px-3 py-1 bg-surface-container-low text-secondary font-label-sm text-label-sm rounded-full">
                  Lavado Ecológico
                </span>
              </div>

              {/* Cards Grid for Garment Types */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                {/* 1. Ropa por Kilo */}
                <div className="p-space-md bg-surface-container-low rounded-xl flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-space-sm mb-space-sm">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm shrink-0">
                      <span className="material-symbols-outlined text-2xl">local_laundry_service</span>
                    </div>
                    <div>
                      <h3 className="font-title-md text-title-md text-on-surface font-semibold">Ropa por Kilo</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Lavado, secado suave y doblado ({speed === 'express' ? '$22/kg express' : '$18/kg normal'})
                      </p>
                      <span className="font-title-md text-title-md text-primary font-bold mt-1 inline-block">
                        {speed === 'express' ? '$22.00 MXN / kg' : '$18.00 MXN / kg'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-space-xs">
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Kilos estimados:</span>
                    <div className="flex items-center gap-space-xs bg-surface-container-lowest rounded-full p-1 shadow-sm">
                      <button
                        className="w-8 h-8 rounded-full bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface flex items-center justify-center transition-colors"
                        onClick={() => updateQty('kilosRopa', -1)}
                        type="button"
                        aria-label="Restar un kilo"
                      >
                        <span className="material-symbols-outlined text-base">remove</span>
                      </button>
                      <span className="font-label-lg text-label-lg font-bold w-10 text-center">{quantities.kilosRopa} kg</span>
                      <button
                        className="w-8 h-8 rounded-full bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface flex items-center justify-center transition-colors"
                        onClick={() => updateQty('kilosRopa', 1)}
                        type="button"
                        aria-label="Añadir un kilo"
                      >
                        <span className="material-symbols-outlined text-base">add</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. Cobijas Individuales */}
                <div className="p-space-md bg-surface-container-low rounded-xl flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-space-sm mb-space-sm">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-lowest flex items-center justify-center text-secondary shadow-sm shrink-0">
                      <span className="material-symbols-outlined text-2xl">bed</span>
                    </div>
                    <div>
                      <h3 className="font-title-md text-title-md text-on-surface font-semibold">Cobija Individual</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Para cama individual o cobertor ligero</p>
                      <span className="font-title-md text-title-md text-secondary font-bold mt-1 inline-block">
                        $40.00 MXN / pza
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-space-xs">
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Piezas:</span>
                    <div className="flex items-center gap-space-xs bg-surface-container-lowest rounded-full p-1 shadow-sm">
                      <button
                        className="w-8 h-8 rounded-full bg-surface-container-high hover:bg-secondary hover:text-on-secondary text-on-surface flex items-center justify-center transition-colors"
                        onClick={() => updateQty('cobijaIndividual', -1)}
                        type="button"
                        aria-label="Restar una cobija individual"
                      >
                        <span className="material-symbols-outlined text-base">remove</span>
                      </button>
                      <span className="font-label-lg text-label-lg font-bold w-7 text-center">{quantities.cobijaIndividual}</span>
                      <button
                        className="w-8 h-8 rounded-full bg-surface-container-high hover:bg-secondary hover:text-on-secondary text-on-surface flex items-center justify-center transition-colors"
                        onClick={() => updateQty('cobijaIndividual', 1)}
                        type="button"
                        aria-label="Añadir una cobija individual"
                      >
                        <span className="material-symbols-outlined text-base">add</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3. Cobijas Matrimoniales */}
                <div className="p-space-md bg-surface-container-low rounded-xl flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-space-sm mb-space-sm">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-lowest flex items-center justify-center text-tertiary shadow-sm shrink-0">
                      <span className="material-symbols-outlined text-2xl">hotel</span>
                    </div>
                    <div>
                      <h3 className="font-title-md text-title-md text-on-surface font-semibold">Cobija Matrimonial</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Edredones o cobertores tamaño matrimonial</p>
                      <span className="font-title-md text-title-md text-tertiary font-bold mt-1 inline-block">
                        $45.00 MXN / pza
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-space-xs">
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Piezas:</span>
                    <div className="flex items-center gap-space-xs bg-surface-container-lowest rounded-full p-1 shadow-sm">
                      <button
                        className="w-8 h-8 rounded-full bg-surface-container-high hover:bg-tertiary hover:text-on-tertiary text-on-surface flex items-center justify-center transition-colors"
                        onClick={() => updateQty('cobijaMatrimonial', -1)}
                        type="button"
                        aria-label="Restar una cobija matrimonial"
                      >
                        <span className="material-symbols-outlined text-base">remove</span>
                      </button>
                      <span className="font-label-lg text-label-lg font-bold w-7 text-center">{quantities.cobijaMatrimonial}</span>
                      <button
                        className="w-8 h-8 rounded-full bg-surface-container-high hover:bg-tertiary hover:text-on-tertiary text-on-surface flex items-center justify-center transition-colors"
                        onClick={() => updateQty('cobijaMatrimonial', 1)}
                        type="button"
                        aria-label="Añadir una cobija matrimonial"
                      >
                        <span className="material-symbols-outlined text-base">add</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 4. Cobija King Size */}
                <div className="p-space-md bg-surface-container-low rounded-xl flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-space-sm mb-space-sm">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary-container shadow-sm shrink-0">
                      <span className="material-symbols-outlined text-2xl">king_bed</span>
                    </div>
                    <div>
                      <h3 className="font-title-md text-title-md text-on-surface font-semibold">Cobija King Size</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Edredones extra grandes tamaño King / Queen</p>
                      <span className="font-title-md text-title-md text-primary-container font-bold mt-1 inline-block">
                        $50.00 MXN / pza
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-space-xs">
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Piezas:</span>
                    <div className="flex items-center gap-space-xs bg-surface-container-lowest rounded-full p-1 shadow-sm">
                      <button
                        className="w-8 h-8 rounded-full bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-on-surface flex items-center justify-center transition-colors"
                        onClick={() => updateQty('cobijaKing', -1)}
                        type="button"
                        aria-label="Restar una cobija king"
                      >
                        <span className="material-symbols-outlined text-base">remove</span>
                      </button>
                      <span className="font-label-lg text-label-lg font-bold w-7 text-center">{quantities.cobijaKing}</span>
                      <button
                        className="w-8 h-8 rounded-full bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-on-surface flex items-center justify-center transition-colors"
                        onClick={() => updateQty('cobijaKing', 1)}
                        type="button"
                        aria-label="Añadir una cobija king"
                      >
                        <span className="material-symbols-outlined text-base">add</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 5. Tenis y Zapatos */}
                <div className="p-space-md bg-surface-container-low rounded-xl flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-space-sm mb-space-sm">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-lowest flex items-center justify-center text-secondary shadow-sm shrink-0">
                      <span className="material-symbols-outlined text-2xl">steps</span>
                    </div>
                    <div>
                      <h3 className="font-title-md text-title-md text-on-surface font-semibold">Tenis y Zapatos</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Limpieza profunda, agujetas y desinfección de suelas</p>
                      <span className="font-title-md text-title-md text-secondary font-bold mt-1 inline-block">
                        $30.00 MXN / par
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-space-xs">
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Pares:</span>
                    <div className="flex items-center gap-space-xs bg-surface-container-lowest rounded-full p-1 shadow-sm">
                      <button
                        className="w-8 h-8 rounded-full bg-surface-container-high hover:bg-secondary hover:text-on-secondary text-on-surface flex items-center justify-center transition-colors"
                        onClick={() => updateQty('tenisZapatos', -1)}
                        type="button"
                        aria-label="Restar un par de tenis"
                      >
                        <span className="material-symbols-outlined text-base">remove</span>
                      </button>
                      <span className="font-label-lg text-label-lg font-bold w-7 text-center">{quantities.tenisZapatos}</span>
                      <button
                        className="w-8 h-8 rounded-full bg-surface-container-high hover:bg-secondary hover:text-on-secondary text-on-surface flex items-center justify-center transition-colors"
                        onClick={() => updateQty('tenisZapatos', 1)}
                        type="button"
                        aria-label="Añadir un par de tenis"
                      >
                        <span className="material-symbols-outlined text-base">add</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 6. Peluches */}
                <div className="p-space-md bg-surface-container-low rounded-xl flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-space-sm mb-space-sm">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm shrink-0">
                      <span className="material-symbols-outlined text-2xl">toys</span>
                    </div>
                    <div>
                      <h3 className="font-title-md text-title-md text-on-surface font-semibold">Lavado de Peluches</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Limpieza hipoalergénica cuidando relleno. Precio variable según tamaño.
                      </p>
                      <span className="font-title-md text-title-md text-primary font-bold mt-1 inline-block">
                        Cotización al recibir
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-space-xs">
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Peluches:</span>
                    <div className="flex items-center gap-space-xs bg-surface-container-lowest rounded-full p-1 shadow-sm">
                      <button
                        className="w-8 h-8 rounded-full bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface flex items-center justify-center transition-colors"
                        onClick={() => updateQty('peluches', -1)}
                        type="button"
                        aria-label="Restar un peluche"
                      >
                        <span className="material-symbols-outlined text-base">remove</span>
                      </button>
                      <span className="font-label-lg text-label-lg font-bold w-7 text-center">{quantities.peluches}</span>
                      <button
                        className="w-8 h-8 rounded-full bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface flex items-center justify-center transition-colors"
                        onClick={() => updateQty('peluches', 1)}
                        type="button"
                        aria-label="Añadir un peluche"
                      >
                        <span className="material-symbols-outlined text-base">add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Peluche size detail dropdown if > 0 */}
              {quantities.peluches > 0 && (
                <div className="p-space-sm bg-surface-container rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-lg">info</span>
                    <span className="font-body-sm text-body-sm text-on-surface">Tamaño de tus peluches:</span>
                  </div>
                  <select
                    value={pelucheSizes}
                    onChange={(e) => setPelucheSizes(e.target.value)}
                    className="px-space-md py-1.5 rounded-lg bg-surface text-on-surface font-label-md text-label-md border border-outline-variant focus:outline-none"
                  >
                    <option value="Chico">Chico (hasta 25 cm)</option>
                    <option value="Mediano">Mediano (25 a 50 cm)</option>
                    <option value="Grande">Grande (50 a 90 cm)</option>
                    <option value="Gigante">Gigante (+90 cm)</option>
                  </select>
                </div>
              )}

              {/* Preferences */}
              <div className="pt-space-md space-y-space-md">
                <h4 className="font-title-md text-title-md text-on-surface font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-lg">tune</span>
                  Tus Preferencias de Cuidado
                </h4>

                <div className="space-y-space-sm">
                  <label className="font-label-md text-label-md text-on-surface-variant block">Tipo de Detergente Eco-Friendly:</label>
                  <div className="flex flex-wrap gap-space-xs">
                    <button
                      className={`px-4 py-2 rounded-full font-label-md text-label-md flex items-center gap-1.5 transition-colors ${
                        detergent === 'hipoalergenico'
                          ? 'bg-primary text-on-primary shadow-sm'
                          : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                      }`}
                      onClick={() => setDetergent('hipoalergenico')}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-sm">spa</span>
                      Hipoalergénico (Lavanda Silvestre)
                    </button>
                    <button
                      className={`px-4 py-2 rounded-full font-label-md text-label-md transition-colors ${
                        detergent === 'neutro'
                          ? 'bg-primary text-on-primary shadow-sm'
                          : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                      }`}
                      onClick={() => setDetergent('neutro')}
                      type="button"
                    >
                      Neutro Piel Sensible
                    </button>
                    <button
                      className={`px-4 py-2 rounded-full font-label-md text-label-md transition-colors ${
                        detergent === 'lanas'
                          ? 'bg-primary text-on-primary shadow-sm'
                          : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                      }`}
                      onClick={() => setDetergent('lanas')}
                      type="button"
                    >
                      Especial Fibras Finas
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm pt-space-xs">
                  <label className="flex items-center gap-space-sm p-space-sm bg-surface-container-low rounded-lg cursor-pointer hover:bg-surface-container transition-colors">
                    <input
                      checked={coldWater}
                      onChange={(e) => setColdWater(e.target.checked)}
                      className="w-4 h-4 rounded text-primary focus:ring-0 cursor-pointer accent-primary"
                      type="checkbox"
                    />
                    <span className="font-body-sm text-body-sm text-on-surface">Agua filtrada para preservar colores y fibras</span>
                  </label>
                  <label className="flex items-center gap-space-sm p-space-sm bg-surface-container-low rounded-lg cursor-pointer hover:bg-surface-container transition-colors">
                    <input
                      checked={organicSoftener}
                      onChange={(e) => setOrganicSoftener(e.target.checked)}
                      className="w-4 h-4 rounded text-primary focus:ring-0 cursor-pointer accent-primary"
                      type="checkbox"
                    />
                    <span className="font-body-sm text-body-sm text-on-surface">Suavizante vegetal 100% biodegradable</span>
                  </label>
                </div>
              </div>
            </div>

            {/* SECTION 2: Address & Contact Details */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg lg:p-space-xl shadow-sm space-y-space-lg">
              <div className="flex items-center gap-space-sm">
                <span className="w-8 h-8 rounded-full bg-secondary-fixed text-secondary flex items-center justify-center font-bold text-label-md">2</span>
                <div>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Datos de Contacto y Dirección</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Obligatorios para emitir tu folio y coordinar la entrega</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-1 font-semibold">
                    Nombre Completo <span className="text-primary">*</span>
                  </label>
                  <input
                    className="w-full px-space-md py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all border border-outline-variant"
                    placeholder="Ej. Daniela Morales"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-1 font-semibold">
                    Teléfono Móvil / WhatsApp <span className="text-primary">*</span>
                  </label>
                  <div className="flex items-center">
                    <span className="px-3 py-2.5 bg-surface-container text-on-surface-variant rounded-l-lg font-label-md text-label-md border-y border-l border-outline-variant">+52</span>
                    <input
                      className="w-full px-space-md py-2.5 rounded-r-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all border border-outline-variant"
                      placeholder="55 1234 5678"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block font-label-md text-label-md text-on-surface mb-1 font-semibold">
                    Calle, Número y Colonia <span className="text-primary">*</span>
                  </label>
                  <input
                    className="w-full px-space-md py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all border border-outline-variant"
                    placeholder="Ej. Av. Insurgentes Sur 450, Col. Roma"
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-1 font-semibold">Piso / Depto / Interior</label>
                  <input
                    className="w-full px-space-md py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all border border-outline-variant"
                    placeholder="Ej. Depto 402"
                    type="text"
                    value={floor}
                    onChange={(e) => setFloor(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-1 font-semibold">Código Postal</label>
                  <input
                    className="w-full px-space-md py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all border border-outline-variant"
                    placeholder="06700"
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block font-label-md text-label-md text-on-surface mb-1 font-semibold">Instrucciones o Referencias (Opcional)</label>
                  <textarea
                    className="w-full px-space-md py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all resize-none border border-outline-variant"
                    placeholder="Ej. Portón negro, avisar al conserje de entrada, tocar timbre 4B, etc."
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* SECTION 3: Accessible Date & Calendar Picker */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg lg:p-space-xl shadow-sm space-y-space-lg">
              <div className="flex items-center gap-space-sm">
                <span className="w-8 h-8 rounded-full bg-tertiary-fixed text-tertiary flex items-center justify-center font-bold text-label-md">3</span>
                <div>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Fecha, Calendario y Horario</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Selecciona el día exacto en el calendario accesible</p>
                </div>
              </div>

              {/* Speed of Delivery Option */}
              <div className="space-y-space-xs">
                <label className="font-label-md text-label-md text-on-surface-variant block font-semibold">Modalidad de Entrega:</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                  <label
                    className={`p-space-md rounded-xl cursor-pointer flex items-start gap-space-sm transition-colors ${
                      speed === 'standard' ? 'bg-secondary-fixed/30 border-2 border-secondary' : 'bg-surface-container-low hover:bg-surface-container'
                    }`}
                  >
                    <input
                      checked={speed === 'standard'}
                      onChange={() => setSpeed('standard')}
                      className="mt-1 accent-primary"
                      name="speed"
                      type="radio"
                      value="standard"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-title-md text-title-md font-bold text-on-surface">Servicio Estándar</span>
                        <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
                          $18 MXN / kg
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                        Entrega habitual en 24 a 48 horas. Cuidado tranquilo y secado natural suave.
                      </p>
                    </div>
                  </label>

                  <label
                    className={`p-space-md rounded-xl cursor-pointer flex items-start gap-space-sm transition-colors ${
                      speed === 'express' ? 'bg-primary-fixed/30 border-2 border-primary' : 'bg-surface-container-low hover:bg-surface-container'
                    }`}
                  >
                    <input
                      checked={speed === 'express'}
                      onChange={() => setSpeed('express')}
                      className="mt-1 accent-primary"
                      name="speed"
                      type="radio"
                      value="express"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-title-md text-title-md font-bold text-on-surface">⚡ Servicio Express</span>
                        <span className="font-label-md text-label-md font-bold text-primary">$22 MXN / kg</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                        <strong>¡Entrega el mismo día!</strong> Recogemos por la mañana y devolvemos por la tarde/noche.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Accessible Interactive Date Picker */}
              <div className="space-y-space-sm pt-space-xs">
                <label className="font-label-md text-label-md text-on-surface-variant block font-semibold">
                  Selecciona la Fecha de Recogida:
                </label>

                {/* Quick Date Chips */}
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedDate(todayISO)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      selectedDate === todayISO
                        ? 'bg-primary text-on-primary shadow-sm'
                        : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    Hoy ({todayISO})
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedDate(tomorrowISO)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      selectedDate === tomorrowISO
                        ? 'bg-primary text-on-primary shadow-sm'
                        : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    Mañana ({tomorrowISO})
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedDate(dayAfterTomorrow)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      selectedDate === dayAfterTomorrow
                        ? 'bg-primary text-on-primary shadow-sm'
                        : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    En 2 días ({dayAfterTomorrow})
                  </button>
                </div>

                {/* Calendar Input Component */}
                <div className="p-space-md bg-surface-container-low rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm border border-surface-container-high">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary-fixed text-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-2xl">calendar_month</span>
                    </div>
                    <div>
                      <p className="font-label-sm text-label-sm text-on-surface-variant font-medium">Fecha elegida:</p>
                      <p className="font-title-md text-title-md font-bold text-on-surface capitalize">
                        {formatFriendlyDate(selectedDate)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="date"
                      min={todayISO}
                      value={selectedDate}
                      onChange={(e) => {
                        if (e.target.value) {
                          setSelectedDate(e.target.value);
                        }
                      }}
                      className="px-3 py-2 rounded-xl bg-surface text-on-surface font-title-md text-sm border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary shadow-sm cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-space-xs pt-space-xs">
                <label className="font-label-md text-label-md text-on-surface-variant block font-semibold">Franja Horaria:</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-space-sm">
                  {[
                    { key: 'Mañana (08:30 - 11:30)', title: 'Mañana', time: '08:30 - 11:30' },
                    { key: 'Mediodía (12:00 - 15:00)', title: 'Mediodía', time: '12:00 - 15:00' },
                    { key: 'Tarde (16:00 - 19:00)', title: 'Tarde', time: '16:00 - 19:00' },
                    { key: 'Noche (19:30 - 21:30)', title: 'Noche', time: '19:30 - 21:30' },
                  ].map((slot) => {
                    const isSelected = selectedSlot === slot.key;
                    return (
                      <label
                        key={slot.key}
                        className={`flex items-center gap-space-xs p-space-sm rounded-lg cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-primary-fixed/40 shadow-sm border border-primary/20'
                            : 'bg-surface-container-low hover:bg-surface-container'
                        }`}
                      >
                        <input
                          checked={isSelected}
                          onChange={() => setSelectedSlot(slot.key)}
                          className="text-primary accent-primary"
                          name="slot"
                          type="radio"
                        />
                        <div className="min-w-0">
                          <p className={`font-label-md text-label-md font-semibold ${isSelected ? 'text-primary' : 'text-on-surface'}`}>
                            {slot.title}
                          </p>
                          <p className="font-label-sm text-label-sm text-on-surface-variant">{slot.time}</p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sticky Order Summary & Checkout */}
          <div className="lg:col-span-4 space-y-space-lg lg:sticky lg:top-24">
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-md space-y-space-md border border-surface-container-high">
              <div className="flex items-center justify-between pb-space-sm border-b border-surface-container-low">
                <h3 className="font-title-md text-title-md text-on-surface font-bold">Resumen de tu Recogida</h3>
                <span className="material-symbols-outlined text-primary">local_shipping</span>
              </div>

              {/* Items Breakdown */}
              <div className="space-y-space-xs font-body-sm text-body-sm">
                {quantities.kilosRopa > 0 && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-on-surface-variant">
                      {quantities.kilosRopa} kg Ropa ({speed === 'express' ? '$22/kg express' : '$18/kg normal'})
                    </span>
                    <span className="font-medium text-on-surface">
                      {formatCurrency(quantities.kilosRopa * kiloPrice)}
                    </span>
                  </div>
                )}

                {quantities.cobijaIndividual > 0 && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-on-surface-variant">
                      {quantities.cobijaIndividual}x Cobija Individual ($40)
                    </span>
                    <span className="font-medium text-on-surface">
                      {formatCurrency(quantities.cobijaIndividual * PRICES.cobijaIndividual)}
                    </span>
                  </div>
                )}

                {quantities.cobijaMatrimonial > 0 && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-on-surface-variant">
                      {quantities.cobijaMatrimonial}x Cobija Matrimonial ($45)
                    </span>
                    <span className="font-medium text-on-surface">
                      {formatCurrency(quantities.cobijaMatrimonial * PRICES.cobijaMatrimonial)}
                    </span>
                  </div>
                )}

                {quantities.cobijaKing > 0 && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-on-surface-variant">
                      {quantities.cobijaKing}x Cobija King Size ($50)
                    </span>
                    <span className="font-medium text-on-surface">
                      {formatCurrency(quantities.cobijaKing * PRICES.cobijaKing)}
                    </span>
                  </div>
                )}

                {quantities.tenisZapatos > 0 && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-on-surface-variant">
                      {quantities.tenisZapatos}x Tenis y Zapatos ($30 / par)
                    </span>
                    <span className="font-medium text-on-surface">
                      {formatCurrency(quantities.tenisZapatos * PRICES.tenisZapatos)}
                    </span>
                  </div>
                )}

                {quantities.peluches > 0 && (
                  <div className="flex justify-between items-center py-1 text-primary">
                    <span className="text-on-surface-variant">
                      {quantities.peluches}x Peluche ({pelucheSizes})
                    </span>
                    <span className="font-medium text-primary text-xs">
                      A cotizar según tamaño
                    </span>
                  </div>
                )}

                {/* Free Delivery Badge */}
                <div className="flex justify-between items-center py-1 text-secondary font-medium">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">verified</span>
                    Recogida y Entrega a Domicilio
                  </span>
                  <span className="uppercase tracking-wide font-bold">¡GRATIS!</span>
                </div>

                {/* Promo applied */}
                <div className="flex justify-between items-center py-1 text-tertiary">
                  <span className="flex items-center gap-1 font-label-md text-label-md">
                    <span className="material-symbols-outlined text-sm">high_res</span>
                    Cupón: BIENVENIDA10 (-10%)
                  </span>
                  <span className="font-bold">-{formatCurrency(discount)}</span>
                </div>
              </div>

              {/* Total Calculation Area */}
              <div className="pt-space-sm bg-surface-container-low p-space-md rounded-xl space-y-1">
                <div className="flex justify-between items-baseline">
                  <span className="font-title-md text-title-md text-on-surface font-bold">Total Estimado</span>
                  <span className="font-headline-sm text-headline-sm text-primary font-extrabold">
                    {formatCurrency(total)}
                  </span>
                </div>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  {quantities.peluches > 0 ? '* Total base + cotización final de peluches al recibir.' : 'Precios en pesos mexicanos ($ MXN).'}
                </p>
              </div>

              {/* Payment Method Choice */}
              <div className="space-y-space-xs pt-space-xs">
                <label className="font-label-md text-label-md text-on-surface font-semibold block">Método de Pago:</label>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors">
                    <input
                      checked={paymentMethod === 'cash'}
                      onChange={() => setPaymentMethod('cash')}
                      className="accent-primary"
                      name="pay-method"
                      type="radio"
                    />
                    <span className="material-symbols-outlined text-tertiary text-base">payments</span>
                    <span className="font-body-sm text-body-sm text-on-surface font-medium">Efectivo contra entrega al recibir</span>
                  </label>
                  <label className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors">
                    <input
                      checked={paymentMethod === 'transfer'}
                      onChange={() => setPaymentMethod('transfer')}
                      className="accent-primary"
                      name="pay-method"
                      type="radio"
                    />
                    <span className="material-symbols-outlined text-primary text-base">account_balance</span>
                    <span className="font-body-sm text-body-sm text-on-surface font-medium">Transferencia bancaria / SPEI</span>
                  </label>
                  <label className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors">
                    <input
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="accent-primary"
                      name="pay-method"
                      type="radio"
                    />
                    <span className="material-symbols-outlined text-secondary text-base">credit_card</span>
                    <span className="font-body-sm text-body-sm text-on-surface font-medium">Tarjeta con terminal al recibir</span>
                  </label>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                onClick={handleConfirmOrder}
                className="w-full py-3.5 px-space-md rounded-full bg-primary text-on-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 hover:bg-primary-container shadow-lg shadow-primary/25 hover:shadow-xl active:scale-95 transition-all"
                type="button"
              >
                <span className="material-symbols-outlined text-lg">local_shipping</span>
                <span>Confirmar y Generar Folio</span>
              </button>

              <p className="font-label-sm text-label-sm text-center text-on-surface-variant">
                Se guardará tu solicitud y se asignará un folio único para rastrear tu ropa en todo momento.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal with Generated Folio */}
      {orderConfirmed && createdOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/60 backdrop-blur-sm p-4 animate-fade-in overflow-y-auto">
          <div className="bg-surface max-w-lg w-full rounded-[2.5rem] p-space-lg md:p-space-xl shadow-2xl space-y-space-md text-center border border-surface-container-high my-8">
            <div className="w-16 h-16 rounded-full bg-primary-fixed text-primary flex items-center justify-center mx-auto shadow-md">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>

            <div className="space-y-1">
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                ¡Recogida Agendada con Éxito!
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Guarda tu folio para dar seguimiento al estado de tu ropa en el taller.
              </p>
            </div>

            {/* Big Folio Box */}
            <div className="bg-primary-fixed/40 p-4 rounded-2xl border-2 border-primary/30 flex items-center justify-between">
              <div className="text-left">
                <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Tu Folio de Rastreo:</span>
                <p className="text-2xl sm:text-3xl font-extrabold text-primary font-mono tracking-wider">
                  {createdOrder.folio}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCopyFolio}
                className="px-3 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold flex items-center gap-1 shadow-sm hover:bg-primary-container transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-base">
                  {copiedFolio ? 'done' : 'content_copy'}
                </span>
                <span>{copiedFolio ? '¡Copiado!' : 'Copiar'}</span>
              </button>
            </div>

            {/* Summary details */}
            <div className="bg-surface-container-low p-space-md rounded-2xl text-left space-y-1.5 font-body-sm text-body-sm">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Cliente:</span>
                <span className="font-semibold text-on-surface">{createdOrder.customerName} ({createdOrder.customerPhone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Fecha y Horario:</span>
                <span className="font-medium">{createdOrder.pickupDate} ({createdOrder.pickupSlot.split(' ')[0]})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Dirección:</span>
                <span className="font-medium truncate max-w-[200px]" title={createdOrder.address}>
                  {createdOrder.address}
                </span>
              </div>
              <div className="flex justify-between border-t border-surface-container-high pt-1.5">
                <span className="text-on-surface-variant font-bold">Total a pagar:</span>
                <span className="font-extrabold text-primary font-title-md">
                  {formatCurrency(createdOrder.total)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-space-xs flex flex-col sm:flex-row gap-space-sm justify-center">
              <button
                onClick={() => {
                  setOrderConfirmed(false);
                  onNavigate('rastreo', createdOrder.folio);
                }}
                className="w-full sm:w-auto px-space-lg py-3 rounded-full bg-primary text-on-primary font-label-md text-label-md font-bold shadow-md hover:bg-primary-container transition-all flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">visibility</span>
                <span>Rastrear mi Folio Ahora</span>
              </button>

              <button
                onClick={() => {
                  setOrderConfirmed(false);
                  onNavigate('inicio');
                }}
                className="w-full sm:w-auto px-space-lg py-3 rounded-full bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container transition-colors"
              >
                Volver al Inicio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
