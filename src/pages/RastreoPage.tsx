import React, { useState, useEffect } from 'react';
import { PageType, Order } from '../types';
import { getOrderByFolio, STATUS_CONFIG } from '../utils/orderStorage';

interface RastreoPageProps {
  onNavigate: (page: PageType, sectionId?: string) => void;
  initialFolio?: string;
}

export const RastreoPage: React.FC<RastreoPageProps> = ({ onNavigate, initialFolio = '' }) => {
  const [folioInput, setFolioInput] = useState(initialFolio);
  const [searchedFolio, setSearchedFolio] = useState(initialFolio);
  const [order, setOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (initialFolio) {
      handleSearch(initialFolio);
    }
  }, [initialFolio]);

  const handleSearch = (searchVal: string) => {
    const val = searchVal.trim().toUpperCase();
    if (!val) return;
    setSearchedFolio(val);
    const found = getOrderByFolio(val);
    setOrder(found || null);
    setHasSearched(true);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(folioInput);
  };

  const formatCurrency = (val: number) => `$${val.toFixed(2)} MXN`;

  const allStatuses: Array<keyof typeof STATUS_CONFIG> = [
    'AGENDADO',
    'EN_CAMINO',
    'EN_LAVADO',
    'PLANCHADO',
    'LISTO',
    'ENTREGADO',
  ];

  return (
    <div className="flex flex-col w-full min-h-[70vh]">
      <div className="relative w-full max-w-[1000px] mx-auto px-margin lg:px-margin-desktop py-space-md lg:py-space-xl">
        {/* Subtle decorative orb */}
        <div className="absolute -top-24 right-10 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-space-xs mb-space-lg">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold bg-secondary-fixed px-space-md py-1 rounded-full">
            Seguimiento en Tiempo Real
          </span>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
            Rastrea el Estado de tu Ropa
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Ingresa el folio que recibiste al agendar para ver en qué etapa de lavado y cuidado se encuentran tus prendas.
          </p>
        </div>

        {/* Search Bar Card */}
        <div className="bg-surface-container-lowest p-space-md sm:p-space-lg rounded-2xl shadow-sm border border-surface-container-high max-w-xl mx-auto mb-space-xl">
          <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-space-xs">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">
                search
              </span>
              <input
                type="text"
                placeholder="Ej. LD-8492"
                value={folioInput}
                onChange={(e) => setFolioInput(e.target.value.toUpperCase())}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-title-md tracking-wider uppercase focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-surface transition-all placeholder:normal-case placeholder:tracking-normal placeholder:text-outline"
                required
              />
            </div>
            <button
              type="submit"
              className="px-space-xl py-3 rounded-xl bg-primary text-on-primary font-label-lg font-bold shadow-md hover:bg-primary-container transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Buscar</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </form>

          {/* Quick Demo Folios */}
          <div className="pt-space-xs flex flex-wrap items-center gap-2 text-xs text-on-surface-variant justify-center">
            <span>Folios de demostración:</span>
            <button
              type="button"
              onClick={() => {
                setFolioInput('LD-8492');
                handleSearch('LD-8492');
              }}
              className="px-2 py-0.5 rounded-md bg-surface-container hover:bg-surface-container-high text-primary font-semibold"
            >
              LD-8492
            </button>
            <button
              type="button"
              onClick={() => {
                setFolioInput('LD-6310');
                handleSearch('LD-6310');
              }}
              className="px-2 py-0.5 rounded-md bg-surface-container hover:bg-surface-container-high text-secondary font-semibold"
            >
              LD-6310
            </button>
          </div>
        </div>

        {/* Results Area */}
        {hasSearched && (
          order ? (
            <div className="bg-surface-container-lowest rounded-3xl p-space-lg lg:p-space-xl shadow-md border border-surface-container-high space-y-space-lg animate-fade-in">
              {/* Top Banner with Folio & Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-sm border-b border-surface-container-high">
                <div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Folio del Pedido:</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-headline-md text-headline-md font-extrabold text-primary tracking-wide">
                      {order.folio}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-fixed text-on-primary-fixed">
                      {order.speed === 'express' ? '⚡ Express Mismo Día' : 'Estándar'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className={`px-4 py-2 rounded-full font-label-md text-label-md font-bold flex items-center gap-2 shadow-sm ${STATUS_CONFIG[order.status].color}`}>
                    <span className="material-symbols-outlined text-base animate-pulse">
                      {STATUS_CONFIG[order.status].icon}
                    </span>
                    <span>{STATUS_CONFIG[order.status].label}</span>
                  </span>
                </div>
              </div>

              {/* Visual Multi-step Progression Tracker */}
              <div className="space-y-space-sm py-space-xs">
                <h3 className="font-title-md text-title-md font-bold text-on-surface">Progreso del Servicio</h3>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-2 sm:gap-4 relative">
                  {allStatuses.map((st, index) => {
                    const currentStep = STATUS_CONFIG[order.status].step;
                    const thisStep = STATUS_CONFIG[st].step;
                    const isCompleted = thisStep <= currentStep;
                    const isCurrent = thisStep === currentStep;

                    return (
                      <div
                        key={st}
                        className={`flex flex-col items-center text-center p-3 rounded-2xl transition-all ${
                          isCurrent
                            ? 'bg-primary-fixed/40 ring-2 ring-primary shadow-sm'
                            : isCompleted
                            ? 'bg-surface-container-low text-on-surface'
                            : 'opacity-50 bg-surface-container-low/50'
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 shadow-sm ${
                            isCompleted
                              ? 'bg-primary text-on-primary'
                              : 'bg-surface-container-high text-on-surface-variant'
                          }`}
                        >
                          <span className="material-symbols-outlined text-lg">
                            {STATUS_CONFIG[st].icon}
                          </span>
                        </div>
                        <span className="font-label-sm text-label-sm font-bold line-clamp-1">
                          {index + 1}. {STATUS_CONFIG[st].label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Admin Note if available */}
              {order.adminNotes && (
                <div className="p-space-md bg-secondary-fixed/30 rounded-2xl flex items-start gap-3 border border-secondary/20">
                  <span className="material-symbols-outlined text-secondary text-2xl shrink-0 mt-0.5">info</span>
                  <div>
                    <h4 className="font-label-md text-label-md font-bold text-on-surface">Nota del Taller / Repartidor:</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{order.adminNotes}</p>
                  </div>
                </div>
              )}

              {/* Order Breakdown Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md pt-space-xs">
                {/* Details Column */}
                <div className="p-space-md bg-surface-container-low rounded-2xl space-y-space-xs">
                  <h4 className="font-title-md text-title-md font-bold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-xl">person</span>
                    Datos de Entrega
                  </h4>
                  <div className="text-body-sm space-y-1 pt-1 text-on-surface-variant">
                    <p><strong className="text-on-surface">Cliente:</strong> {order.customerName}</p>
                    <p><strong className="text-on-surface">Teléfono / WhatsApp:</strong> {order.customerPhone}</p>
                    <p><strong className="text-on-surface">Dirección:</strong> {order.address} {order.floor && `(${order.floor})`}</p>
                    <p><strong className="text-on-surface">Fecha Programada:</strong> {order.pickupDate} ({order.pickupSlot})</p>
                    {order.notes && <p><strong className="text-on-surface">Notas:</strong> {order.notes}</p>}
                  </div>
                </div>

                {/* Garments Column */}
                <div className="p-space-md bg-surface-container-low rounded-2xl space-y-space-xs">
                  <h4 className="font-title-md text-title-md font-bold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-xl">dry_cleaning</span>
                    Prendas Solicitadas
                  </h4>
                  <div className="text-body-sm space-y-1.5 pt-1">
                    {order.quantities.kilosRopa > 0 && (
                      <div className="flex justify-between">
                        <span>{order.quantities.kilosRopa} kg Ropa ({order.speed === 'express' ? '$22/kg express' : '$18/kg'})</span>
                        <span className="font-semibold text-on-surface">
                          {formatCurrency(order.quantities.kilosRopa * (order.speed === 'express' ? 22 : 18))}
                        </span>
                      </div>
                    )}
                    {order.quantities.cobijaIndividual > 0 && (
                      <div className="flex justify-between">
                        <span>{order.quantities.cobijaIndividual}x Cobija Individual ($40)</span>
                        <span className="font-semibold text-on-surface">
                          {formatCurrency(order.quantities.cobijaIndividual * 40)}
                        </span>
                      </div>
                    )}
                    {order.quantities.cobijaMatrimonial > 0 && (
                      <div className="flex justify-between">
                        <span>{order.quantities.cobijaMatrimonial}x Cobija Matrimonial ($45)</span>
                        <span className="font-semibold text-on-surface">
                          {formatCurrency(order.quantities.cobijaMatrimonial * 45)}
                        </span>
                      </div>
                    )}
                    {order.quantities.cobijaKing > 0 && (
                      <div className="flex justify-between">
                        <span>{order.quantities.cobijaKing}x Cobija King Size ($50)</span>
                        <span className="font-semibold text-on-surface">
                          {formatCurrency(order.quantities.cobijaKing * 50)}
                        </span>
                      </div>
                    )}
                    {order.quantities.tenisZapatos > 0 && (
                      <div className="flex justify-between">
                        <span>{order.quantities.tenisZapatos}x Tenis y Zapatos ($30 / par)</span>
                        <span className="font-semibold text-on-surface">
                          {formatCurrency(order.quantities.tenisZapatos * 30)}
                        </span>
                      </div>
                    )}
                    {order.quantities.peluches > 0 && (
                      <div className="flex justify-between text-primary">
                        <span>{order.quantities.peluches}x Peluches ({order.pelucheSize || 'Mediano'})</span>
                        <span className="font-semibold">Cotización al recibir</span>
                      </div>
                    )}

                    <div className="border-t border-surface-container-high pt-2 mt-2 flex justify-between items-baseline font-title-md">
                      <span className="font-bold text-on-surface">Total:</span>
                      <span className="font-extrabold text-primary font-headline-sm">
                        {formatCurrency(order.total)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs">
                <a
                  href={`https://wa.me/525598765432?text=${encodeURIComponent(
                    `Hola Las Danis, tengo una duda sobre mi folio ${order.folio} a nombre de ${order.customerName}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-space-lg py-2.5 rounded-full bg-secondary text-on-secondary font-label-md text-label-md hover:bg-secondary-container hover:text-on-secondary-container transition-all shadow-sm"
                >
                  <span className="material-symbols-outlined text-lg">chat</span>
                  <span>Contactar Repartidor por WhatsApp</span>
                </a>

                <button
                  onClick={() => onNavigate('agendar')}
                  className="px-space-lg py-2.5 rounded-full bg-surface-container-high text-primary font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-all"
                >
                  Agendar Otra Recogida
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-surface-container-lowest rounded-3xl p-space-xl shadow-md border border-surface-container-high text-center max-w-lg mx-auto space-y-space-sm animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-error-container text-error flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-3xl">sentiment_dissatisfied</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                Folio No Encontrado
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                No pudimos encontrar un pedido con el folio <strong>"{searchedFolio}"</strong>. Revisa que esté escrito correctamente o prueba con uno de los folios de demostración.
              </p>
              <button
                onClick={() => {
                  setFolioInput('LD-8492');
                  handleSearch('LD-8492');
                }}
                className="px-space-lg py-2 rounded-full bg-primary text-on-primary font-label-sm text-label-sm"
              >
                Probar con Folio LD-8492
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};
