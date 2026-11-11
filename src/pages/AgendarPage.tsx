import React, { useState } from 'react';
import { PageType, BookingQuantities } from '../types';

interface AgendarPageProps {
  onNavigate: (page: PageType, sectionId?: string) => void;
}

const PRICES = {
  diario: 14.50,
  grande: 26.00,
  delicadas: 7.50,
  nordicos: 14.00,
  ironPack: 12.00,
  express: 3.00,
};

export const AgendarPage: React.FC<AgendarPageProps> = ({ onNavigate }) => {
  // Quantities
  const [quantities, setQuantities] = useState<BookingQuantities>({
    diario: 1,
    grande: 0,
    delicadas: 2,
    nordicos: 0,
  });

  // Add-ons & speed
  const [hasIronPack, setHasIronPack] = useState(false);
  const [speed, setSpeed] = useState<'standard' | 'express'>('standard');

  // Detergent & preferences
  const [detergent, setDetergent] = useState<'hipoalergenico' | 'neutro' | 'lanas'>('hipoalergenico');
  const [coldWater, setColdWater] = useState(true);
  const [organicSoftener, setOrganicSoftener] = useState(true);

  // Address & Contact
  const [name, setName] = useState('Elena Romero Serrano');
  const [phone, setPhone] = useState('654 987 321');
  const [street, setStreet] = useState('Calle Velázquez 78');
  const [floor, setFloor] = useState('Piso 4º - Puerta B');
  const [postalCode, setPostalCode] = useState('28006');
  const [notes, setNotes] = useState('');

  // Date & Slot
  const [selectedDay, setSelectedDay] = useState('Hoy');
  const [selectedSlot, setSelectedSlot] = useState('Mediodía');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bizum' | 'cash'>('card');

  // Submit Modal
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Handlers
  const updateQty = (key: keyof BookingQuantities, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta),
    }));
  };

  // Calculations
  const subtotal =
    quantities.diario * PRICES.diario +
    quantities.grande * PRICES.grande +
    quantities.delicadas * PRICES.delicadas +
    quantities.nordicos * PRICES.nordicos +
    (hasIronPack ? PRICES.ironPack : 0) +
    (speed === 'express' ? PRICES.express : 0);

  const discount = subtotal * 0.10;
  const total = Math.max(0, subtotal - discount);

  const formatCurrency = (val: number) =>
    val.toFixed(2).replace('.', ',') + ' €';

  const handleConfirmOrder = () => {
    if (subtotal === 0) {
      alert('Por favor selecciona al menos un servicio o prenda para tu recogida.');
      return;
    }
    setOrderConfirmed(true);
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
              Reserva en menos de 2 minutos
            </span>
          </div>
          <div className="max-w-3xl">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Agenda la Recogida de tus Prendas
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">
              Nosotros nos encargamos del lavado, secado, planchado artesanal y entrega impecable directamente en la puerta de tu hogar.
            </p>
          </div>
        </div>

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
                <p className="font-label-lg text-label-lg text-on-surface truncate">Servicios & Prendas</p>
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
                <p className="font-label-lg text-label-lg text-on-surface truncate">Horario de Entrega</p>
              </div>
            </div>
            {/* Step 4 */}
            <div className="flex items-center gap-space-sm opacity-80">
              <div className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-label-lg text-label-lg font-bold shrink-0">
                4
              </div>
              <div className="min-w-0">
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Paso 4</p>
                <p className="font-label-lg text-label-lg text-on-surface truncate">Pago Flexible</p>
              </div>
            </div>
          </div>
          {/* Progress Bar Track */}
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
                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Selecciona tus Servicios y Prendas</h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Puedes combinar diferentes tipos de cuidado textil en la misma recogida</p>
                  </div>
                </div>
                <span className="hidden sm:inline-flex px-3 py-1 bg-surface-container-low text-secondary font-label-sm text-label-sm rounded-full">
                  Lavado Ecológico
                </span>
              </div>

              {/* Cards Grid for Garment Types */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                {/* Category Card 1: Ropa de Diario */}
                <div className="p-space-md bg-surface-container-low rounded-xl flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-space-sm mb-space-sm">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm shrink-0">
                      <span className="material-symbols-outlined text-2xl">local_laundry_service</span>
                    </div>
                    <div>
                      <h3 className="font-title-md text-title-md text-on-surface font-semibold">Bolsa Diaria (5 kg)</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Lavado, secado suave y doblado impecable</p>
                      <span className="font-title-md text-title-md text-primary font-bold mt-1 inline-block">14,50 €</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-space-xs">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Bolsas:</span>
                    <div className="flex items-center gap-space-xs bg-surface-container-lowest rounded-full p-1 shadow-sm">
                      <button
                        className="w-8 h-8 rounded-full bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface flex items-center justify-center transition-colors"
                        onClick={() => updateQty('diario', -1)}
                        type="button"
                        aria-label="Restar una bolsa diaria"
                      >
                        <span className="material-symbols-outlined text-base">remove</span>
                      </button>
                      <span className="font-label-lg text-label-lg font-bold w-7 text-center">{quantities.diario}</span>
                      <button
                        className="w-8 h-8 rounded-full bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface flex items-center justify-center transition-colors"
                        onClick={() => updateQty('diario', 1)}
                        type="button"
                        aria-label="Añadir una bolsa diaria"
                      >
                        <span className="material-symbols-outlined text-base">add</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Category Card 2: Bolsa Familiar XL */}
                <div className="p-space-md bg-surface-container-low rounded-xl flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-space-sm mb-space-sm">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-lowest flex items-center justify-center text-secondary shadow-sm shrink-0">
                      <span className="material-symbols-outlined text-2xl">shopping_bag</span>
                    </div>
                    <div>
                      <h3 className="font-title-md text-title-md text-on-surface font-semibold">Bolsa Grande XL (10 kg)</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Ideal familias o coladas quincenales</p>
                      <span className="font-title-md text-title-md text-secondary font-bold mt-1 inline-block">26,00 €</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-space-xs">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Bolsas:</span>
                    <div className="flex items-center gap-space-xs bg-surface-container-lowest rounded-full p-1 shadow-sm">
                      <button
                        className="w-8 h-8 rounded-full bg-surface-container-high hover:bg-secondary hover:text-on-secondary text-on-surface flex items-center justify-center transition-colors"
                        onClick={() => updateQty('grande', -1)}
                        type="button"
                        aria-label="Restar una bolsa grande"
                      >
                        <span className="material-symbols-outlined text-base">remove</span>
                      </button>
                      <span className="font-label-lg text-label-lg font-bold w-7 text-center">{quantities.grande}</span>
                      <button
                        className="w-8 h-8 rounded-full bg-surface-container-high hover:bg-secondary hover:text-on-secondary text-on-surface flex items-center justify-center transition-colors"
                        onClick={() => updateQty('grande', 1)}
                        type="button"
                        aria-label="Añadir una bolsa grande"
                      >
                        <span className="material-symbols-outlined text-base">add</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Category Card 3: Prendas Delicadas & Trajes */}
                <div className="p-space-md bg-surface-container-low rounded-xl flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-space-sm mb-space-sm">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-lowest flex items-center justify-center text-tertiary shadow-sm shrink-0">
                      <span className="material-symbols-outlined text-2xl">dry_cleaning</span>
                    </div>
                    <div>
                      <h3 className="font-title-md text-title-md text-on-surface font-semibold">Delicadas & Trajes</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Seda, lana, trajes de dos piezas y abrigos</p>
                      <span className="font-title-md text-title-md text-tertiary font-bold mt-1 inline-block">7,50 € / prenda</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-space-xs">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Prendas:</span>
                    <div className="flex items-center gap-space-xs bg-surface-container-lowest rounded-full p-1 shadow-sm">
                      <button
                        className="w-8 h-8 rounded-full bg-surface-container-high hover:bg-tertiary hover:text-on-tertiary text-on-surface flex items-center justify-center transition-colors"
                        onClick={() => updateQty('delicadas', -1)}
                        type="button"
                        aria-label="Restar una prenda delicada"
                      >
                        <span className="material-symbols-outlined text-base">remove</span>
                      </button>
                      <span className="font-label-lg text-label-lg font-bold w-7 text-center">{quantities.delicadas}</span>
                      <button
                        className="w-8 h-8 rounded-full bg-surface-container-high hover:bg-tertiary hover:text-on-tertiary text-on-surface flex items-center justify-center transition-colors"
                        onClick={() => updateQty('delicadas', 1)}
                        type="button"
                        aria-label="Añadir una prenda delicada"
                      >
                        <span className="material-symbols-outlined text-base">add</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Category Card 4: Blancos & Nórdicos */}
                <div className="p-space-md bg-surface-container-low rounded-xl flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-space-sm mb-space-sm">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary-container shadow-sm shrink-0">
                      <span className="material-symbols-outlined text-2xl">bed</span>
                    </div>
                    <div>
                      <h3 className="font-title-md text-title-md text-on-surface font-semibold">Blancos & Edredones</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Nórdicos de pluma o fibra, mantas y sábanas</p>
                      <span className="font-title-md text-title-md text-primary-container font-bold mt-1 inline-block">14,00 € / nórdico</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-space-xs">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Unidades:</span>
                    <div className="flex items-center gap-space-xs bg-surface-container-lowest rounded-full p-1 shadow-sm">
                      <button
                        className="w-8 h-8 rounded-full bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-on-surface flex items-center justify-center transition-colors"
                        onClick={() => updateQty('nordicos', -1)}
                        type="button"
                        aria-label="Restar un edredón"
                      >
                        <span className="material-symbols-outlined text-base">remove</span>
                      </button>
                      <span className="font-label-lg text-label-lg font-bold w-7 text-center">{quantities.nordicos}</span>
                      <button
                        className="w-8 h-8 rounded-full bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-on-surface flex items-center justify-center transition-colors"
                        onClick={() => updateQty('nordicos', 1)}
                        type="button"
                        aria-label="Añadir un edredón"
                      >
                        <span className="material-symbols-outlined text-base">add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add-on Service Banner: Planchado Artesanal Extra */}
              <div className="p-space-md bg-surface-container rounded-xl flex flex-col sm:flex-row items-center justify-between gap-space-md">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-3xl text-primary">iron</span>
                  <div>
                    <p className="font-title-md text-title-md font-semibold text-on-surface">Pack Planchado Artesanal (10 camisas o prendas)</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Acabado impecable sobre percha biodegradable con funda protectora</p>
                  </div>
                </div>
                <div className="flex items-center gap-space-md shrink-0">
                  <span className="font-title-md text-title-md font-bold text-primary">+12,00 €</span>
                  <button
                    className={`px-space-md py-1.5 rounded-full font-label-md text-label-md transition-all shadow-sm ${
                      hasIronPack
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container-lowest text-primary hover:bg-primary hover:text-on-primary'
                    }`}
                    onClick={() => setHasIronPack(!hasIronPack)}
                    type="button"
                  >
                    {hasIronPack ? 'Añadido ✓' : 'Añadir al pedido'}
                  </button>
                </div>
              </div>

              {/* Custom Washing Preferences */}
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
                      Especial Lanas & Sedas
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
                    <span className="font-body-sm text-body-sm text-on-surface">Agua fría sustentable para preservar colores</span>
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
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Dirección de Recogida & Contacto</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Un repartidor de Las Danis recogerá la cesta en el lugar indicado</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-1">Nombre Completo *</label>
                  <input
                    className="w-full px-space-md py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all"
                    placeholder="Tu nombre"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-1">Teléfono Móvil / WhatsApp *</label>
                  <div className="flex items-center">
                    <span className="px-3 py-2.5 bg-surface-container text-on-surface-variant rounded-l-lg font-label-md text-label-md">+34</span>
                    <input
                      className="w-full px-space-md py-2.5 rounded-r-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all"
                      placeholder="Número de contacto"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block font-label-md text-label-md text-on-surface mb-1">Calle, Número y Portal *</label>
                  <input
                    className="w-full px-space-md py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all"
                    placeholder="Ej. Calle Gran Vía 12"
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-1">Piso / Puerta</label>
                  <input
                    className="w-full px-space-md py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all"
                    placeholder="Ej. 3º Izquierda"
                    type="text"
                    value={floor}
                    onChange={(e) => setFloor(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-1">Código Postal *</label>
                  <input
                    className="w-full px-space-md py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all"
                    placeholder="28001"
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block font-label-md text-label-md text-on-surface mb-1">Instrucciones para el Conserje / Repartidor (Opcional)</label>
                  <textarea
                    className="w-full px-space-md py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all resize-none"
                    placeholder="Ej: Portería con conserje de 9 a 14h, o llamar al interfono 4B."
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* SECTION 3: Date & Slot Selection */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg lg:p-space-xl shadow-sm space-y-space-lg">
              <div className="flex items-center gap-space-sm">
                <span className="w-8 h-8 rounded-full bg-tertiary-fixed text-tertiary flex items-center justify-center font-bold text-label-md">3</span>
                <div>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Fecha y Franja de Recogida</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Selecciona el momento en que mejor te convenga que pasemos</p>
                </div>
              </div>

              {/* Day Selector Pills */}
              <div className="space-y-space-xs">
                <label className="font-label-md text-label-md text-on-surface-variant block">Día de Recogida:</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm">
                  {[
                    { key: 'Hoy', label: 'Hoy', date: 'Jueves 24', status: 'Disponible' },
                    { key: 'Mañana', label: 'Mañana', date: 'Viernes 25', status: 'Franjas libres' },
                    { key: 'Sábado', label: 'Fin de semana', date: 'Sábado 26', status: 'Mañana sólo' },
                    { key: 'Lunes', label: 'Próximo', date: 'Lunes 28', status: 'Completo' },
                  ].map((d) => (
                    <button
                      key={d.key}
                      onClick={() => setSelectedDay(d.key)}
                      className={`p-space-sm rounded-xl flex flex-col items-center justify-center transition-all ${
                        selectedDay === d.key
                          ? 'bg-primary text-on-primary shadow-md shadow-primary/20'
                          : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                      }`}
                      type="button"
                    >
                      <span className="font-label-sm text-label-sm opacity-90 uppercase">{d.label}</span>
                      <span className="font-title-md text-title-md font-bold">{d.date}</span>
                      <span className={`font-label-sm text-label-sm ${selectedDay === d.key ? 'opacity-90' : 'text-secondary'}`}>
                        {d.status}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-space-xs pt-space-xs">
                <label className="font-label-md text-label-md text-on-surface-variant block">Franja Horaria:</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-space-sm">
                  {[
                    { key: 'Mañana', title: 'Mañana', time: '08:30 - 11:30' },
                    { key: 'Mediodía', title: 'Mediodía', time: '12:00 - 15:00' },
                    { key: 'Tarde', title: 'Tarde', time: '16:00 - 19:00' },
                    { key: 'Noche', title: 'Noche', time: '19:30 - 21:30' },
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

              {/* Speed of Delivery Option */}
              <div className="pt-space-sm space-y-space-xs">
                <label className="font-label-md text-label-md text-on-surface-variant block">Velocidad de Entrega:</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                  <label
                    className={`p-space-md rounded-xl cursor-pointer flex items-start gap-space-sm transition-colors ${
                      speed === 'standard' ? 'bg-secondary-fixed/30 border border-secondary/30' : 'bg-surface-container-low hover:bg-surface-container'
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
                        <span className="font-title-md text-title-md font-bold text-on-surface">Estándar 48 Horas</span>
                        <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
                          Gratis
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                        Lavado tranquilo, secado natural suave y entrega perfecta.
                      </p>
                    </div>
                  </label>

                  <label
                    className={`p-space-md rounded-xl cursor-pointer flex items-start gap-space-sm transition-colors ${
                      speed === 'express' ? 'bg-primary-fixed/30 border border-primary/30' : 'bg-surface-container-low hover:bg-surface-container'
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
                        <span className="font-title-md text-title-md font-bold text-on-surface">Servicio Express 24h</span>
                        <span className="font-label-md text-label-md font-bold text-primary">+3,00 €</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                        Recogemos hoy y tus prendas vuelven limpias mañana.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sticky Order Summary & Checkout */}
          <div className="lg:col-span-4 space-y-space-lg lg:sticky lg:top-24">
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-md space-y-space-md">
              <div className="flex items-center justify-between pb-space-sm border-b border-surface-container-low">
                <h3 className="font-title-md text-title-md text-on-surface font-bold">Resumen de tu Recogida</h3>
                <span className="material-symbols-outlined text-primary">local_shipping</span>
              </div>

              {/* Items Breakdown */}
              <div className="space-y-space-xs font-body-sm text-body-sm">
                {quantities.diario > 0 && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-on-surface-variant">
                      {quantities.diario}x Bolsa Diaria (5kg)
                    </span>
                    <span className="font-medium text-on-surface">
                      {formatCurrency(quantities.diario * PRICES.diario)}
                    </span>
                  </div>
                )}

                {quantities.grande > 0 && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-on-surface-variant">
                      {quantities.grande}x Bolsa Grande (10kg)
                    </span>
                    <span className="font-medium text-on-surface">
                      {formatCurrency(quantities.grande * PRICES.grande)}
                    </span>
                  </div>
                )}

                {quantities.delicadas > 0 && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-on-surface-variant">
                      {quantities.delicadas}x Prenda Delicada / Traje
                    </span>
                    <span className="font-medium text-on-surface">
                      {formatCurrency(quantities.delicadas * PRICES.delicadas)}
                    </span>
                  </div>
                )}

                {quantities.nordicos > 0 && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-on-surface-variant">
                      {quantities.nordicos}x Blancos & Edredón
                    </span>
                    <span className="font-medium text-on-surface">
                      {formatCurrency(quantities.nordicos * PRICES.nordicos)}
                    </span>
                  </div>
                )}

                {hasIronPack && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-on-surface-variant">Pack Planchado Artesanal</span>
                    <span className="font-medium text-on-surface">{formatCurrency(PRICES.ironPack)}</span>
                  </div>
                )}

                {speed === 'express' && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-on-surface-variant">Suplemento Exprés 24h</span>
                    <span className="font-medium text-on-surface">{formatCurrency(PRICES.express)}</span>
                  </div>
                )}

                {/* Free Delivery Badge */}
                <div className="flex justify-between items-center py-1 text-secondary font-medium">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">verified</span>
                    Recogida y Entrega
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
                  IVA incluido. Pago verificado sin comisiones extra.
                </p>
              </div>

              {/* Payment Method Choice */}
              <div className="space-y-space-xs pt-space-xs">
                <label className="font-label-md text-label-md text-on-surface font-semibold block">Método de Pago:</label>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors">
                    <input
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="accent-primary"
                      name="pay-method"
                      type="radio"
                    />
                    <span className="material-symbols-outlined text-secondary text-base">credit_card</span>
                    <span className="font-body-sm text-body-sm text-on-surface font-medium">Tarjeta en línea al reservar</span>
                  </label>
                  <label className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors">
                    <input
                      checked={paymentMethod === 'bizum'}
                      onChange={() => setPaymentMethod('bizum')}
                      className="accent-primary"
                      name="pay-method"
                      type="radio"
                    />
                    <span className="material-symbols-outlined text-primary text-base">smartphone</span>
                    <span className="font-body-sm text-body-sm text-on-surface font-medium">Bizum instantáneo</span>
                  </label>
                  <label className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors">
                    <input
                      checked={paymentMethod === 'cash'}
                      onChange={() => setPaymentMethod('cash')}
                      className="accent-primary"
                      name="pay-method"
                      type="radio"
                    />
                    <span className="material-symbols-outlined text-tertiary text-base">handshake</span>
                    <span className="font-body-sm text-body-sm text-on-surface font-medium">En mano al recibir las prendas</span>
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
                <span>Confirmar y Agendar Recogida</span>
              </button>

              <p className="font-label-sm text-label-sm text-center text-on-surface-variant">
                Cancela o reprograma de forma gratuita hasta 1 hora antes de la cita.
              </p>
            </div>

            {/* Trust & Quality Guarantees Bento */}
            <div className="grid grid-cols-1 gap-space-xs">
              <div className="p-space-sm bg-surface-container-lowest rounded-xl flex items-center gap-space-sm shadow-sm">
                <div className="w-10 h-10 rounded-full bg-secondary-fixed text-secondary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-xl">format_image_left</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md font-bold text-on-surface">Garantía Textil 100%</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">Cuidado o reposición de tus prendas favoritas.</p>
                </div>
              </div>
              <div className="p-space-sm bg-surface-container-lowest rounded-xl flex items-center gap-space-sm shadow-sm">
                <div className="w-10 h-10 rounded-full bg-primary-fixed text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-xl">mark_chat_unread</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md font-bold text-on-surface">Avisos en Tiempo Real</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">Actualización por WhatsApp del estado del pedido.</p>
                </div>
              </div>
              <div className="p-space-sm bg-surface-container-lowest rounded-xl flex items-center gap-space-sm shadow-sm">
                <div className="w-10 h-10 rounded-full bg-tertiary-fixed text-tertiary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-xl">compost</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md font-bold text-on-surface">Bolsas Selladas Compostables</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">Máxima higiene, libre de polvo y 100% ecológico.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Micro Section: Frequently Asked Questions Mini Ribbon */}
        <div className="mt-space-xl p-space-lg bg-surface-container-low rounded-xl flex flex-col md:flex-row items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md">
            <span className="material-symbols-outlined text-3xl text-secondary">help_center</span>
            <div>
              <h4 className="font-title-md text-title-md font-bold text-on-surface">¿Tienes alguna duda sobre tus prendas?</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Consulta cómo clasificamos el peso o indícanos detalles específicos al repartidor.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-space-sm shrink-0">
            <button
              onClick={() => onNavigate('inicio', 'contacto')}
              className="px-space-md py-2 rounded-full bg-surface-container-lowest text-on-surface font-label-md text-label-md hover:text-primary transition-colors shadow-sm"
            >
              Preguntas Frecuentes
            </button>
            <a
              className="px-space-md py-2 rounded-full bg-secondary text-on-secondary font-label-md text-label-md hover:bg-secondary-container hover:text-on-secondary-container transition-colors shadow-sm flex items-center gap-1.5"
              href="https://wa.me/34612345678"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="material-symbols-outlined text-sm">chat</span>
              WhatsApp Las Danis
            </a>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {orderConfirmed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-surface max-w-lg w-full rounded-[2rem] p-space-lg md:p-space-xl shadow-2xl space-y-space-md text-center border border-surface-container-high">
            <div className="w-16 h-16 rounded-full bg-primary-fixed text-primary flex items-center justify-center mx-auto shadow-md">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface font-bold">¡Recogida Agendada con Éxito!</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Hemos reservado tu recogida para <strong>{selectedDay}</strong> en la franja de <strong>{selectedSlot}</strong> en <strong>{street}, {floor}</strong>.
            </p>
            <div className="bg-surface-container-low p-space-md rounded-2xl text-left space-y-1 font-body-sm text-body-sm">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Total a pagar:</span>
                <span className="font-bold text-primary font-title-md">{formatCurrency(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Método:</span>
                <span className="capitalize font-medium">{paymentMethod === 'card' ? 'Tarjeta en línea' : paymentMethod === 'bizum' ? 'Bizum' : 'En mano'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Contacto:</span>
                <span className="font-medium">{name} ({phone})</span>
              </div>
            </div>
            <p className="font-label-sm text-label-sm text-on-surface-variant">
              Te hemos enviado los detalles por WhatsApp. ¡Gracias por confiar en el equipo de Las Danis!
            </p>
            <div className="pt-space-xs flex gap-space-sm justify-center">
              <button
                onClick={() => {
                  setOrderConfirmed(false);
                  onNavigate('inicio');
                }}
                className="px-space-xl py-3 rounded-full bg-primary text-on-primary font-label-md text-label-md font-bold shadow-md hover:bg-primary-container transition-all"
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
