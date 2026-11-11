import React, { useState } from 'react';
import { PageType } from '../types';

interface HomePageProps {
  onNavigate: (page: PageType, sectionId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    service: 'Lavado & Doblado por Kilo',
    slot: 'Hoy - Tarde (16:00 - 20:00)',
  });

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Subtle decorative ambient orbs */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-32 -left-20 w-96 h-96 bg-primary-fixed/40 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute top-80 -right-24 w-[32rem] h-[32rem] bg-secondary-fixed/40 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute top-[1600px] left-1/3 w-80 h-80 bg-primary-fixed-dim/30 rounded-full blur-3xl pointer-events-none -z-10"></div>

        {/* 1. HERO SECTION */}
        <section className="relative max-w-[1200px] mx-auto px-margin lg:px-margin-desktop pt-space-lg lg:pt-space-xl pb-space-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
            {/* Left Hero Content (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col items-start space-y-space-md">
              {/* Fresh Badges Row */}
              <div className="flex flex-wrap items-center gap-space-xs">
                <span className="inline-flex items-center gap-1.5 px-space-md py-1.5 rounded-full bg-surface-container-high text-primary font-label-md text-label-md shadow-sm">
                  <span className="material-symbols-outlined text-base">eco</span>
                  🌿 Detergentes Hipoalergénicos
                </span>
                <span className="inline-flex items-center gap-1.5 px-space-md py-1.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md shadow-sm">
                  <span className="material-symbols-outlined text-base">bolt</span>
                  ⚡ Entrega en 24 Horas
                </span>
                <span className="inline-flex items-center gap-1.5 px-space-md py-1.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md shadow-sm">
                  <span className="material-symbols-outlined text-base">electric_moped</span>
                  🛵 Recogida Gratis
                </span>
              </div>

              {/* Main Title */}
              <h1 className="font-display text-headline-lg lg:text-display text-on-surface tracking-tight leading-tight">
                Frescura, Cuidado y Suavidad para tus{' '}
                <span className="text-primary underline decoration-secondary-container decoration-wavy decoration-2">
                  Prendas Favoritas
                </span>
              </h1>

              {/* Subtitle */}
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                En <strong className="text-primary font-semibold">Lavandería Las Danis</strong> tratamos tu ropa como si fuera nuestra: combinando tecnología eco-amigable de bajo impacto hídrico con el amor y la dedicación minuciosa de un cálido negocio familiar.
              </p>

              {/* Interactive Action Buttons */}
              <div className="flex flex-wrap items-center gap-space-md pt-space-xs w-full sm:w-auto">
                <button
                  onClick={() => onNavigate('agendar')}
                  className="inline-flex items-center justify-center gap-space-xs px-space-xl py-3.5 rounded-full bg-primary text-on-primary font-label-lg text-label-lg shadow-md hover:bg-primary-container transition-all hover:shadow-xl active:scale-95"
                >
                  <span className="material-symbols-outlined text-lg">local_shipping</span>
                  <span>Agendar Recogida a Domicilio</span>
                </button>
                <button
                  onClick={() => onNavigate('rastreo')}
                  className="inline-flex items-center justify-center gap-space-xs px-space-lg py-3.5 rounded-full bg-surface-container-low text-secondary font-label-lg text-label-lg hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-all"
                >
                  <span className="material-symbols-outlined text-lg">travel_explore</span>
                  <span>Rastrear mi Folio</span>
                </button>
              </div>

              {/* Trust Badges & Guarantee Row */}
              <div className="pt-space-md flex items-center gap-space-lg text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-base">verified</span>
                  </span>
                  <span className="font-label-md text-label-md font-semibold text-on-surface">Cuidado Artesanal 100%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-base">water_drop</span>
                  </span>
                  <span className="font-label-md text-label-md font-semibold text-on-surface">Agua Filtrada y Suave</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual with Floating Stat Bubble Overlays (5 Cols) */}
            <div className="lg:col-span-5 relative mt-space-lg lg:mt-0">
              <div className="relative mx-auto max-w-[420px] lg:max-w-none">
                <div className="relative rounded-[2.5rem] overflow-hidden bg-surface-container-high shadow-xl aspect-[4/5] flex items-center justify-center">
                  <img
                    className="w-full h-full object-cover"
                    alt="Lavandería Las Danis - Precios y Servicios"
                    src="/img/Lavanderia_Precios.jpeg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent"></div>
                </div>

                {/* Floating Stat Bubble 1: Top Left */}
                <div className="absolute -top-4 -left-6 bg-surface/95 backdrop-blur-md p-space-sm rounded-2xl shadow-lg flex items-center gap-space-sm transform -rotate-2 hover:rotate-0 transition-transform">
                  <div className="w-11 h-11 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-xl">favorite</span>
                  </div>
                  <div>
                    <p className="font-headline-sm text-headline-sm text-primary font-bold leading-none">+5,000</p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">Clientes Felices</p>
                  </div>
                </div>

                {/* Floating Stat Bubble 2: Bottom Right */}
                <div className="absolute -bottom-6 -right-4 bg-surface/95 backdrop-blur-md p-space-sm rounded-2xl shadow-lg flex items-center gap-space-sm transform rotate-2 hover:rotate-0 transition-transform">
                  <div className="w-11 h-11 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-xl">temp_preferences_custom</span>
                  </div>
                  <div>
                    <p className="font-headline-sm text-headline-sm text-secondary font-bold leading-none">99.8%</p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">Prendas Impecables</p>
                  </div>
                </div>

                {/* Floating Stat Bubble 3: Bottom Left Small Pill */}
                <div className="absolute -bottom-4 left-4 bg-tertiary-fixed text-on-tertiary-fixed px-space-md py-2 rounded-full shadow-md flex items-center gap-1.5 font-label-md text-label-md">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  <span>100% Cuidado de Tejidos</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. QUIÉNES SOMOS / ESENCIA DE LAS DANIS */}
        <section className="max-w-[1200px] mx-auto px-margin lg:px-margin-desktop py-space-xl" id="quienes-somos">
          <div className="bg-surface-container-low rounded-[2rem] p-space-lg lg:p-space-xl shadow-sm relative overflow-hidden">
            <div className="max-w-2xl mx-auto text-center space-y-space-xs mb-space-xl">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold bg-primary-fixed px-space-md py-1 rounded-full">
                Nuestra Esencia
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
                La Historia y el Cariño Familiar Detrás de Las Danis
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Un proyecto nacido del cariño profundo por los detalles textiles y del ferviente deseo de devolverle a las familias su tiempo libre más valioso.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
              {/* Atelier Photo Mosaic Left (5 cols) */}
              <div className="lg:col-span-5 space-y-space-md">
                <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[4/3] bg-surface-container-high">
                  <img
                    className="w-full h-full object-cover"
                    alt="Cuidado y dedicación en Lavandería Las Danis"
                    src="/img/Img_1.jpeg"
                  />
                </div>
                <div className="p-space-md bg-surface rounded-2xl shadow-sm flex items-start gap-space-sm">
                  <span className="material-symbols-outlined text-primary text-2xl shrink-0 mt-0.5">sentiment_satisfied</span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant italic">
                    “Empezamos en casa lavando las sábanas de los abuelos y los uniformes de los niños del barrio; hoy seguimos con la misma dedicación artesanal, pero con la mejor tecnología eco-friendly.”
                  </p>
                </div>
              </div>

              {/* 3 Pillars Cards Right (7 cols) */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-space-md">
                {/* Pillar 1 */}
                <div className="bg-surface p-space-md rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-space-md group">
                  <div className="w-12 h-12 rounded-2xl bg-primary-fixed flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-2xl">laundry</span>
                  </div>
                  <div className="space-y-space-xs">
                    <h3 className="font-title-md text-title-md text-on-surface font-bold">Cuidado Especializado</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Clasificación experta de fibras finas, sedas, lanas y linos para preservar colores vivos y texturas originales sin encogimiento.
                    </p>
                  </div>
                  <span className="font-label-sm text-label-sm text-primary font-semibold flex items-center gap-1">
                    Fibras protegidas
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </div>

                {/* Pillar 2 */}
                <div className="bg-surface p-space-md rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-space-md group">
                  <div className="w-12 h-12 rounded-2xl bg-secondary-fixed flex items-center justify-center text-secondary group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-2xl">iron</span>
                  </div>
                  <div className="space-y-space-xs">
                    <h3 className="font-title-md text-title-md text-on-surface font-bold">Planchado Artesanal</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Vapor termorregulado aplicado a mano por profesionales dedicadas que eliminan cada arruga sin quemar ni abrillantar las telas.
                    </p>
                  </div>
                  <span className="font-label-sm text-label-sm text-secondary font-semibold flex items-center gap-1">
                    Acabado de hotel
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </div>

                {/* Pillar 3 */}
                <div className="bg-surface p-space-md rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-space-md group">
                  <div className="w-12 h-12 rounded-2xl bg-tertiary-fixed flex items-center justify-center text-tertiary group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-2xl">recycling</span>
                  </div>
                  <div className="space-y-space-xs">
                    <h3 className="font-title-md text-title-md text-on-surface font-bold">Empaque Sustentable</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Fundas y precintos 100% compostables a base de maíz y bolsas reutilizables de algodón orgánico para cuidar la madre tierra.
                    </p>
                  </div>
                  <span className="font-label-sm text-label-sm text-tertiary font-semibold flex items-center gap-1">
                    Cero plástico virgen
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. PROTAGONISTA: NUESTRA MISIÓN Y VISIÓN */}
        <section className="max-w-[1200px] mx-auto px-margin lg:px-margin-desktop py-space-xl" id="mision-y-vision">
          <div className="text-center max-w-2xl mx-auto space-y-space-xs mb-space-xl">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold bg-secondary-fixed px-space-md py-1 rounded-full">
              Nuestro Rumbo y Propósito
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              La Brújula que Guía Cada Ciclo de Lavado
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Construimos una relación duradera con tu guardarropa y tu bienestar a través de compromisos tangibles y metas claras hacia el futuro.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter-desktop">
            {/* CARD MISIÓN */}
            <div className="relative bg-gradient-to-br from-secondary-fixed/50 via-surface to-primary-fixed/40 rounded-[2.5rem] p-space-xl shadow-lg flex flex-col justify-between space-y-space-lg overflow-hidden">
              <div className="space-y-space-md">
                <div className="flex items-center justify-between">
                  <div className="w-16 h-16 rounded-2xl bg-secondary text-on-secondary flex items-center justify-center shadow-md">
                    <span className="material-symbols-outlined text-3xl">bubble_chart</span>
                  </div>
                  <span className="font-label-md text-label-md font-bold px-space-md py-1 bg-surface/90 text-secondary rounded-full shadow-sm">
                    Compromiso Diario
                  </span>
                </div>
                <div className="space-y-space-xs">
                  <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Nuestra Misión</h3>
                  <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                    Brindar a nuestros clientes una experiencia de lavandería y cuidado textil <strong className="text-secondary font-semibold">impecable, confiable y accesible</strong>, preservando la vida útil y suavidad de cada prenda mediante procesos ecológicos, atención personalizada y la máxima dedicación familiar en cada entrega.
                  </p>
                </div>
                <div className="space-y-space-xs pt-space-xs">
                  <div className="flex items-center gap-space-sm p-space-xs bg-surface/80 rounded-xl">
                    <span className="material-symbols-outlined text-secondary text-xl">check_circle</span>
                    <span className="font-label-md text-label-md text-on-surface font-semibold">Cuidado fibra a fibra adaptado a cada tejido</span>
                  </div>
                  <div className="flex items-center gap-space-sm p-space-xs bg-surface/80 rounded-xl">
                    <span className="material-symbols-outlined text-secondary text-xl">schedule</span>
                    <span className="font-label-md text-label-md text-on-surface font-semibold">Puntualidad garantizada en horarios pactados</span>
                  </div>
                  <div className="flex items-center gap-space-sm p-space-xs bg-surface/80 rounded-xl">
                    <span className="material-symbols-outlined text-secondary text-xl">spa</span>
                    <span className="font-label-md text-label-md text-on-surface font-semibold">Productos 100% libres de fosfatos y tóxicos</span>
                  </div>
                </div>
              </div>
              <div className="pt-space-md flex items-center justify-between bg-surface/60 backdrop-blur-sm p-space-md rounded-2xl">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-secondary">water_drop</span>
                  <span className="font-label-sm text-label-sm text-on-surface font-bold">Ahorro Hídrico: -42% vs lavado en casa</span>
                </div>
                <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">Norma Eco-Clean</span>
              </div>
            </div>

            {/* CARD VISIÓN */}
            <div className="relative bg-gradient-to-br from-primary-fixed/50 via-surface to-secondary-fixed/30 rounded-[2.5rem] p-space-xl shadow-lg flex flex-col justify-between space-y-space-lg overflow-hidden">
              <div className="space-y-space-md">
                <div className="flex items-center justify-between">
                  <div className="w-16 h-16 rounded-2xl bg-primary text-on-primary flex items-center justify-center shadow-md">
                    <span className="material-symbols-outlined text-3xl">visibility</span>
                  </div>
                  <span className="font-label-md text-label-md font-bold px-space-md py-1 bg-surface/90 text-primary rounded-full shadow-sm">
                    Mirada Hacia el Futuro
                  </span>
                </div>
                <div className="space-y-space-xs">
                  <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Nuestra Visión</h3>
                  <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                    Ser la <strong className="text-primary font-semibold">lavandería boutique de referencia y mayor confianza</strong> en la comunidad, reconocida por la excelencia en el trato a nuestros clientes, la innovación en técnicas sostenibles de lavado y por promover un estilo de vida cómodo, limpio y libre de preocupaciones cotidianas para los hogares.
                  </p>
                </div>
                <div className="space-y-space-xs pt-space-xs">
                  <div className="flex items-center gap-space-sm p-space-xs bg-surface/80 rounded-xl">
                    <span className="material-symbols-outlined text-primary text-xl">electric_rickshaw</span>
                    <span className="font-label-md text-label-md text-on-surface font-semibold">Flota de reparto 100% eléctrica para cero emisiones</span>
                  </div>
                  <div className="flex items-center gap-space-sm p-space-xs bg-surface/80 rounded-xl">
                    <span className="material-symbols-outlined text-primary text-xl">nest_eco_leaf</span>
                    <span className="font-label-md text-label-md text-on-surface font-semibold">Reducción total de la huella de carbono textil</span>
                  </div>
                  <div className="flex items-center gap-space-sm p-space-xs bg-surface/80 rounded-xl">
                    <span className="material-symbols-outlined text-primary text-xl">store</span>
                    <span className="font-label-md text-label-md text-on-surface font-semibold">Apertura de nuevos puntos de cercanía en el barrio</span>
                  </div>
                </div>
              </div>
              <div className="pt-space-md flex items-center justify-between bg-surface/60 backdrop-blur-sm p-space-md rounded-2xl">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary">solar_power</span>
                  <span className="font-label-sm text-label-sm text-on-surface font-bold">Energía 100% Renovable en planta</span>
                </div>
                <span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">Objetivo 2026</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. NUESTROS VALORES (Grid de 6 tarjetas) */}
        <section className="max-w-[1200px] mx-auto px-margin lg:px-margin-desktop py-space-xl" id="valores">
          <div className="text-center max-w-2xl mx-auto space-y-space-xs mb-space-xl">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold bg-primary-fixed px-space-md py-1 rounded-full">
              Nuestros Principios
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              Valores que Hacen Brillar a Las Danis
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Seis pilares innegociables que experimentas desde el momento en que entregas tu bolsa hasta que recibes tu ropa lista para usar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-desktop">
            {/* Valor 1: Cariño y Dedicación */}
            <div className="bg-surface-container-lowest p-space-lg rounded-[2rem] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-space-md group">
              <div className="space-y-space-sm">
                <div className="w-14 h-14 rounded-2xl bg-primary-fixed flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                </div>
                <div className="space-y-space-xs">
                  <span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">Valor 01</span>
                  <h3 className="font-title-md text-title-md text-on-surface font-bold">Cariño y Dedicación</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Cada lote de ropa se trata de manera estrictamente individual, clasificando minuciosamente por tipos de tejido y gama cromática para asegurar cero accidentes de desteñido o desgaste.
                  </p>
                </div>
              </div>
              <div className="pt-space-xs flex items-center gap-1.5 text-primary font-label-sm text-label-sm font-semibold">
                <span className="material-symbols-outlined text-base">check</span>
                Tratamiento por tanda única
              </div>
            </div>

            {/* Valor 2: Compromiso Ecológico */}
            <div className="bg-surface-container-lowest p-space-lg rounded-[2rem] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-space-md group">
              <div className="space-y-space-sm">
                <div className="w-14 h-14 rounded-2xl bg-secondary-fixed flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 2a10 10 0 0 1 10 10c0 5.5-4.5 10-10 10S2 17.5 2 12a10 10 0 0 1 10-10Z"></path>
                    <path d="M12 6v6l4 2"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </div>
                <div className="space-y-space-xs">
                  <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">Valor 02</span>
                  <h3 className="font-title-md text-title-md text-on-surface font-bold">Compromiso Ecológico</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Usamos agua purificada y detergentes enzimáticos biodegradables con extractos de flor de algodón y lavanda silvestre que cuidan tu piel y protegen nuestros ecosistemas fluviales.
                  </p>
                </div>
              </div>
              <div className="pt-space-xs flex items-center gap-1.5 text-secondary font-label-sm text-label-sm font-semibold">
                <span className="material-symbols-outlined text-base">eco</span>
                Fórmulas 100% biodegradables
              </div>
            </div>

            {/* Valor 3: Honestidad y Confianza */}
            <div className="bg-surface-container-lowest p-space-lg rounded-[2rem] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-space-md group">
              <div className="space-y-space-sm">
                <div className="w-14 h-14 rounded-2xl bg-tertiary-fixed flex items-center justify-center text-tertiary group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
                <div className="space-y-space-xs">
                  <span className="font-label-sm text-label-sm text-tertiary font-bold uppercase tracking-wider">Valor 03</span>
                  <h3 className="font-title-md text-title-md text-on-surface font-bold">Honestidad y Confianza</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Revisión exhaustiva al recibir cada bolsa: desocupamos y protegemos bolsillos, reportamos botones flojos y generamos un inventario digital transparente antes de lavar.
                  </p>
                </div>
              </div>
              <div className="pt-space-xs flex items-center gap-1.5 text-tertiary font-label-sm text-label-sm font-semibold">
                <span className="material-symbols-outlined text-base">verified_user</span>
                Inventario digital verificado
              </div>
            </div>

            {/* Valor 4: Calidad Impecable */}
            <div className="bg-surface-container-lowest p-space-lg rounded-[2rem] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-space-md group">
              <div className="space-y-space-sm">
                <div className="w-14 h-14 rounded-2xl bg-primary-fixed flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="m4.93 4.93 4.24 4.24"></path>
                    <path d="m14.83 9.17 4.24-4.24"></path>
                    <path d="m14.83 14.83 4.24 4.24"></path>
                    <path d="m9.17 14.83-4.24 4.24"></path>
                    <circle cx="12" cy="12" r="4"></circle>
                  </svg>
                </div>
                <div className="space-y-space-xs">
                  <span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">Valor 04</span>
                  <h3 className="font-title-md text-title-md text-on-surface font-bold">Calidad Impecable</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Estándares rigurosos de desmanchado puntual, lavado a temperatura óptima y planchado suave a vapor vertical que deja la ropa con tacto sedoso y aroma celestial.
                  </p>
                </div>
              </div>
              <div className="pt-space-xs flex items-center gap-1.5 text-primary font-label-sm text-label-sm font-semibold">
                <span className="material-symbols-outlined text-base">star</span>
                Garantía de satisfacción
              </div>
            </div>

            {/* Valor 5: Puntualidad Absoluta */}
            <div className="bg-surface-container-lowest p-space-lg rounded-[2rem] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-space-md group">
              <div className="space-y-space-sm">
                <div className="w-14 h-14 rounded-2xl bg-secondary-fixed flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div className="space-y-space-xs">
                  <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">Valor 05</span>
                  <h3 className="font-title-md text-title-md text-on-surface font-bold">Puntualidad Absoluta</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Respetamos tu tiempo como oro: tus prendas están listas con puntualidad suiza en la franja horaria pactada, con notificaciones instantáneas de rastreo por WhatsApp.
                  </p>
                </div>
              </div>
              <div className="pt-space-xs flex items-center gap-1.5 text-secondary font-label-sm text-label-sm font-semibold">
                <span className="material-symbols-outlined text-base">alarm_on</span>
                Notificaciones en tiempo real
              </div>
            </div>

            {/* Valor 6: Calidez Familiar */}
            <div className="bg-surface-container-lowest p-space-lg rounded-[2rem] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-space-md group">
              <div className="space-y-space-sm">
                <div className="w-14 h-14 rounded-2xl bg-tertiary-fixed flex items-center justify-center text-tertiary group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2"></path>
                    <rect height="18" rx="2" width="18" x="3" y="4"></rect>
                    <circle cx="12" cy="10" r="2"></circle>
                    <line x1="8" x2="8" y1="2" y2="4"></line>
                    <line x1="16" x2="16" y1="2" y2="4"></line>
                  </svg>
                </div>
                <div className="space-y-space-xs">
                  <span className="font-label-sm text-label-sm text-tertiary font-bold uppercase tracking-wider">Valor 06</span>
                  <h3 className="font-title-md text-title-md text-on-surface font-bold">Calidez Familiar</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    La sonrisa cordial, el buen consejo y el trato cercano de Las Danis siempre dispuestas a escucharte, asesorarte sobre manchas difíciles y hacerte sentir como en tu hogar.
                  </p>
                </div>
              </div>
              <div className="pt-space-xs flex items-center gap-1.5 text-tertiary font-label-sm text-label-sm font-semibold">
                <span className="material-symbols-outlined text-base">handshake</span>
                Trato humano y sonriente
              </div>
            </div>
          </div>
        </section>

        {/* 5. RESUMEN DE SERVICIOS POPULARES */}
        <section className="max-w-[1200px] mx-auto px-margin lg:px-margin-desktop py-space-xl" id="servicios">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
            <div className="space-y-space-xs max-w-xl">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold bg-secondary-fixed px-space-md py-1 rounded-full">
                Catálogo Boutique
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
                Nuestros Servicios Populares
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Desde la colada semanal hasta tus prendas de alta costura y edredones de pluma. Todo con entrega impecable y fragancia relajante.
              </p>
            </div>
            <div className="shrink-0">
              <button
                onClick={() => onNavigate('agendar')}
                className="inline-flex items-center gap-space-xs px-space-lg py-2.5 rounded-full bg-surface-container-high text-primary font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-all"
              >
                <span className="material-symbols-outlined text-base">receipt_long</span>
                <span>Tarifario Completo por Prenda</span>
              </button>
            </div>
          </div>

          {/* 4 Services Bento Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop">
            {/* Service 1: Ropa por Kilo */}
            <div className="bg-surface p-space-lg rounded-3xl shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-space-md">
              <div className="space-y-space-sm">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-surface-container">
                  <img
                    className="w-full h-full object-cover"
                    alt="Ropa limpia y toallas dobladas por kilo"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAm06QjsZLY8BqaDUDJ_3Yn2sX--nbtoxKPuN0nfC44hV9xKu7RHskAci3QLf_xx0r9-cDqDeEdvE8JE94opyj3KkrMOJ9-cVBR8PBI-vCRPRGoQv5lQGpDUXWMQD9abr_0arhqnG7xKjETYsY6UsgvX5x8ceQNeAfP0iP_vr_y8CebLE_WihjhCw1XZmE4kdNtreAa3r_KG8-1s6hYcNF2dGSFuyJeB8pvkIx3s8s"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-surface/90 backdrop-blur-sm text-primary font-label-sm text-label-sm font-bold px-space-sm py-0.5 rounded-full">
                    Más Solicitado
                  </span>
                </div>
                <div className="space-y-space-xs">
                  <h3 className="font-title-md text-title-md text-on-surface font-bold">Ropa por Kilo</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Lavado, secado suave y doblado impecable. Entrega estándar o express el mismo día.
                  </p>
                  <div className="pt-1 flex flex-col gap-0.5 text-xs text-on-surface-variant">
                    <span>• Estándar (24-48h): <strong>$18 MXN / kg</strong></span>
                    <span>• Express (mismo día): <strong>$22 MXN / kg</strong></span>
                  </div>
                </div>
              </div>
              <div className="pt-space-xs flex items-center justify-between border-t border-transparent">
                <div>
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">$18 MXN</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant"> / kg</span>
                </div>
                <button
                  onClick={() => onNavigate('agendar')}
                  className="w-10 h-10 rounded-full bg-primary-fixed text-primary flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors"
                  title="Agendar por kilo"
                >
                  <span className="material-symbols-outlined text-lg">add</span>
                </button>
              </div>
            </div>

            {/* Service 2: Cobijas y Edredones */}
            <div className="bg-surface p-space-lg rounded-3xl shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-space-md">
              <div className="space-y-space-sm">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-surface-container">
                  <img
                    className="w-full h-full object-cover"
                    alt="Cobijas y edredones acolchados limpios"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnxJUsLHwYd8krsycXPSHYhRGIrjNx7OUcK_DoB6LelooZz-cMduF59qq_2-MFuwYcvc8ngz80UD8EMvLIs0OjNNu6eX_oTCVBsmOmgfLbuJgs8Bm22tNUEISO1r8uEeFd4ijHmiJ3iA84MkZcDzBFSoRtrk17U-9uHr2pCTVisfsEN-FRKWBAgkYi4zNCl_pPV4f3lodKnSFGEaFLR7iBimu-0_niNcRRb6PKeSY"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-surface/90 backdrop-blur-sm text-secondary font-label-sm text-label-sm font-bold px-space-sm py-0.5 rounded-full">
                    Hogar & Confort
                  </span>
                </div>
                <div className="space-y-space-xs">
                  <h3 className="font-title-md text-title-md text-on-surface font-bold">Cobijas y Edredones</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Tratamiento desodorizante y antiácaros con secado esponjoso para todos los tamaños.
                  </p>
                  <div className="pt-1 flex flex-col gap-0.5 text-xs text-on-surface-variant">
                    <span>• Individual: <strong>$40 MXN</strong></span>
                    <span>• Matrimonial: <strong>$45 MXN</strong></span>
                    <span>• King Size: <strong>$50 MXN</strong></span>
                  </div>
                </div>
              </div>
              <div className="pt-space-xs flex items-center justify-between">
                <div>
                  <span className="font-headline-sm text-headline-sm text-secondary font-bold">Desde $40</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant"> MXN</span>
                </div>
                <button
                  onClick={() => onNavigate('agendar')}
                  className="w-10 h-10 rounded-full bg-secondary-fixed text-secondary flex items-center justify-center hover:bg-secondary hover:text-on-secondary transition-colors"
                  title="Agendar cobijas"
                >
                  <span className="material-symbols-outlined text-lg">add</span>
                </button>
              </div>
            </div>

            {/* Service 3: Tenis y Zapatos */}
            <div className="bg-surface p-space-lg rounded-3xl shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-space-md">
              <div className="space-y-space-sm">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-surface-container flex items-center justify-center bg-gradient-to-br from-tertiary-fixed/40 to-surface-container">
                  <div className="w-20 h-20 rounded-3xl bg-surface flex items-center justify-center text-tertiary shadow-md">
                    <span className="material-symbols-outlined text-5xl">steps</span>
                  </div>
                  <span className="absolute top-2.5 left-2.5 bg-surface/90 backdrop-blur-sm text-tertiary font-label-sm text-label-sm font-bold px-space-sm py-0.5 rounded-full">
                    Cuidado Especial
                  </span>
                </div>
                <div className="space-y-space-xs">
                  <h3 className="font-title-md text-title-md text-on-surface font-bold">Tenis y Zapatos</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Lavado detallado a mano, desmanchado de suelas, agujetas y desinfección interna profunda.
                  </p>
                  <div className="pt-1 flex flex-col gap-0.5 text-xs text-on-surface-variant">
                    <span>• Todo tipo de calzado deportivo y casual</span>
                    <span>• Secado termorregulado sin deformaciones</span>
                  </div>
                </div>
              </div>
              <div className="pt-space-xs flex items-center justify-between">
                <div>
                  <span className="font-headline-sm text-headline-sm text-tertiary font-bold">$30 MXN</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant"> / par</span>
                </div>
                <button
                  onClick={() => onNavigate('agendar')}
                  className="w-10 h-10 rounded-full bg-tertiary-fixed text-tertiary flex items-center justify-center hover:bg-tertiary hover:text-on-tertiary transition-colors"
                  title="Agendar tenis y zapatos"
                >
                  <span className="material-symbols-outlined text-lg">add</span>
                </button>
              </div>
            </div>

            {/* Service 4: Peluches */}
            <div className="bg-surface p-space-lg rounded-3xl shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-space-md">
              <div className="space-y-space-sm">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-surface-container flex items-center justify-center bg-gradient-to-br from-primary-fixed/40 to-surface-container">
                  <div className="w-20 h-20 rounded-3xl bg-surface flex items-center justify-center text-primary shadow-md">
                    <span className="material-symbols-outlined text-5xl">toys</span>
                  </div>
                  <span className="absolute top-2.5 left-2.5 bg-surface/90 backdrop-blur-sm text-primary font-label-sm text-label-sm font-bold px-space-sm py-0.5 rounded-full">
                    Delicado & Bebés
                  </span>
                </div>
                <div className="space-y-space-xs">
                  <h3 className="font-title-md text-title-md text-on-surface font-bold">Lavado de Peluches</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Higienización hipoalergénica, eliminación de polvo y ácaros protegiendo las costuras y relleno.
                  </p>
                  <div className="pt-1 flex flex-col gap-0.5 text-xs text-on-surface-variant">
                    <span>• Chico, Mediano, Grande o Gigante</span>
                    <span>• Precio cotizado según tamaño</span>
                  </div>
                </div>
              </div>
              <div className="pt-space-xs flex items-center justify-between">
                <div>
                  <span className="font-title-md text-title-md text-primary font-bold">Según tamaño</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant"> (Cotización)</span>
                </div>
                <button
                  onClick={() => onNavigate('agendar')}
                  className="w-10 h-10 rounded-full bg-primary-fixed text-primary flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors"
                  title="Agendar peluches"
                >
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS STRIP */}
        <section className="max-w-[1200px] mx-auto px-margin lg:px-margin-desktop py-space-md">
          <div className="bg-surface-container rounded-[2rem] p-space-lg lg:p-space-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
              <div className="space-y-space-xs bg-surface p-space-md rounded-2xl shadow-sm">
                <div className="flex text-primary">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-base">star</span>
                  ))}
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant italic">
                  “El aroma suave a lavanda natural dura semanas en mis sábanas. Jamás he tenido la ropa tan suave sin químicos pesados.”
                </p>
                <p className="font-label-md text-label-md font-bold text-on-surface">— Carmen M., Bella Vista</p>
              </div>

              <div className="space-y-space-xs bg-surface p-space-md rounded-2xl shadow-sm">
                <div className="flex text-secondary">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-base">star</span>
                  ))}
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant italic">
                  “Trabajo todo el día y su servicio a domicilio me salvó los fines de semana. Las Danis son super puntuales y amables.”
                </p>
                <p className="font-label-md text-label-md font-bold text-on-surface">— David S., Arquitecto</p>
              </div>

              <div className="space-y-space-xs bg-surface p-space-md rounded-2xl shadow-sm">
                <div className="flex text-tertiary">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-base">star</span>
                  ))}
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant italic">
                  “Me recuperaron un vestido de seda con una mancha de vino que creí imposible. Tienen manos mágicas y mucho corazón.”
                </p>
                <p className="font-label-md text-label-md font-bold text-on-surface">— Lucía R., Diseñadora</p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. BANNER CTA FINAL Y FORMULARIO RÁPIDO DE SOLICITUD */}
        <section className="max-w-[1200px] mx-auto px-margin lg:px-margin-desktop py-space-xl" id="agendar-rapido">
          <div className="relative bg-gradient-to-br from-primary-fixed via-surface-container-high to-secondary-fixed rounded-[2.5rem] p-space-lg lg:p-space-xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
              {/* CTA Text & WhatsApp Direct (6 cols) */}
              <div className="lg:col-span-6 space-y-space-md">
                <span className="inline-flex items-center gap-1.5 px-space-md py-1 rounded-full bg-surface text-primary font-label-md text-label-md font-bold shadow-sm">
                  <span className="material-symbols-outlined text-base">schedule</span>
                  Recogidas Disponibles para Hoy
                </span>
                <h2 className="font-headline-lg text-headline-lg lg:text-display text-on-surface font-extrabold tracking-tight leading-tight">
                  ¡Deja el lavado en nuestras manos y disfruta tu día libre!
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
                  Indícanos tu dirección y la hora preferida. Nuestro repartidor pasará con bolsas hipoalergénicas exclusivas para llevarse tu ropa.
                </p>
                <div className="pt-space-xs flex flex-wrap items-center gap-space-md">
                  <a
                    className="inline-flex items-center gap-space-xs px-space-lg py-3 rounded-full bg-secondary text-on-secondary font-label-lg text-label-lg shadow-md hover:bg-on-secondary-container transition-all hover:shadow-lg active:scale-95"
                    href="https://wa.me/525598765432"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="material-symbols-outlined text-lg">chat</span>
                    <span>Pedir directo por WhatsApp</span>
                  </a>
                  <div className="flex items-center gap-2 text-on-surface font-label-md text-label-md">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
                    <span>Respuesta inmediata en minutos</span>
                  </div>
                </div>
              </div>

              {/* Quick Interactive Booking Form Card (6 cols) */}
              <div className="lg:col-span-6">
                <div className="bg-surface p-space-lg rounded-3xl shadow-lg space-y-space-md">
                  <div className="space-y-space-xs border-b border-transparent">
                    <h3 className="font-title-md text-title-md text-on-surface font-bold">Solicitud Rápida de Recogida</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Sin pagos por adelantado. Abonas al recibir tu ropa limpia.</p>
                  </div>

                  {formSubmitted ? (
                    <div className="bg-primary-fixed/50 p-space-lg rounded-2xl text-center space-y-space-sm animate-fade-in">
                      <div className="w-14 h-14 bg-primary text-on-primary rounded-full flex items-center justify-center mx-auto shadow-md">
                        <span className="material-symbols-outlined text-3xl">done</span>
                      </div>
                      <h4 className="font-headline-sm text-headline-sm font-bold text-primary">¡Solicitud Recibida!</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Gracias <strong>{formData.name}</strong>. Te contactaremos por WhatsApp al <strong>{formData.phone}</strong> para coordinar la recogida en {formData.address}.
                      </p>
                      <button
                        onClick={() => {
                          setFormSubmitted(false);
                          setFormData({ name: '', phone: '', address: '', service: 'Ropa por Kilo ($18 normal / $22 express)', slot: 'Hoy - Tarde (16:00 - 20:00)' });
                        }}
                        className="px-space-md py-2 rounded-full bg-primary text-on-primary font-label-sm text-label-sm"
                      >
                        Enviar otra solicitud
                      </button>
                    </div>
                  ) : (
                    <form className="space-y-space-sm" onSubmit={handleQuickSubmit}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                        <div>
                          <label className="block font-label-sm text-label-sm text-on-surface font-semibold mb-1">Nombre Completo</label>
                          <input
                            className="w-full px-space-md py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:bg-surface focus:shadow-md transition-all placeholder:text-outline"
                            placeholder="Ej. Ana García"
                            required
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block font-label-sm text-label-sm text-on-surface font-semibold mb-1">Teléfono / WhatsApp</label>
                          <input
                            className="w-full px-space-md py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:bg-surface focus:shadow-md transition-all placeholder:text-outline"
                            placeholder="+52 55 1234 5678"
                            required
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-label-sm text-label-sm text-on-surface font-semibold mb-1">Dirección de Recogida</label>
                        <input
                          className="w-full px-space-md py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:bg-surface focus:shadow-md transition-all placeholder:text-outline"
                          placeholder="Calle, número, colonia o departamento"
                          required
                          type="text"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                        <div>
                          <label className="block font-label-sm text-label-sm text-on-surface font-semibold mb-1">Tipo de Servicio</label>
                          <select
                            className="w-full px-space-md py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:bg-surface focus:shadow-md transition-all"
                            value={formData.service}
                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          >
                            <option>Ropa por Kilo ($18 normal / $22 express)</option>
                            <option>Cobija Individual ($40)</option>
                            <option>Cobija Matrimonial ($45)</option>
                            <option>Cobija King Size ($50)</option>
                            <option>Tenis y Zapatos ($30 / par)</option>
                            <option>Peluches (Precio según tamaño)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block font-label-sm text-label-sm text-on-surface font-semibold mb-1">Horario Preferido</label>
                          <select
                            className="w-full px-space-md py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:bg-surface focus:shadow-md transition-all"
                            value={formData.slot}
                            onChange={(e) => setFormData({ ...formData, slot: e.target.value })}
                          >
                            <option>Hoy - Mañana (09:00 - 13:00)</option>
                            <option>Hoy - Tarde (16:00 - 20:00)</option>
                            <option>Mañana - Primera hora (08:30)</option>
                            <option>Otro horario a coordinar</option>
                          </select>
                        </div>
                      </div>

                      <div className="pt-space-xs">
                        <button
                          className="w-full py-3.5 rounded-full bg-primary text-on-primary font-label-lg text-label-lg shadow-md hover:bg-primary-container transition-all hover:shadow-xl active:scale-[0.99] flex items-center justify-center gap-space-xs"
                          type="submit"
                        >
                          <span className="material-symbols-outlined text-lg">check_circle</span>
                          <span>Confirmar Solicitud de Recogida</span>
                        </button>
                      </div>

                      <div className="flex items-center justify-center gap-2 pt-1 text-on-surface-variant font-label-sm text-label-sm">
                        <span className="material-symbols-outlined text-sm text-secondary">verified_user</span>
                        <span>Tus datos se tratan bajo estricta confidencialidad familiar.</span>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
