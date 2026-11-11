import React, { useState } from 'react';
import { PageType } from '../types';

interface HeaderProps {
  currentPage: PageType;
  onNavigate: (page: PageType, sectionId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId?: string) => {
    if (currentPage !== 'inicio') {
      onNavigate('inicio', sectionId);
    } else if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_4px_20px_-2px_rgba(157,141,241,0.12)]">
      <div className="h-20 max-w-[1200px] mx-auto px-margin lg:px-margin-desktop flex items-center justify-between gap-space-md">
        {/* Brand Logo */}
        <div 
          className="flex items-center gap-space-sm shrink-0 cursor-pointer" 
          onClick={() => onNavigate('inicio')}
        >
          <img
            alt="Logotipo Lavandería Las Danis"
            className="h-10 w-auto object-contain rounded-lg shadow-sm"
            src="/img/Logo.jpeg"
          />
          <div className="flex flex-col">
            <span className="font-title-md text-title-md text-primary font-bold tracking-tight leading-none">Las Danis</span>
            <span className="font-label-sm text-label-sm text-secondary tracking-wide uppercase font-semibold">Lavandería Boutique</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-space-xs bg-surface-container-low px-space-xs py-1 rounded-full shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
          <button
            onClick={() => handleNavClick()}
            className={`px-space-md py-1.5 transition-all rounded-full font-label-md text-label-md ${
              currentPage === 'inicio'
                ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => handleNavClick('servicios')}
            className="px-space-md py-1.5 rounded-full font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all"
          >
            Servicios
          </button>
          <button
            onClick={() => handleNavClick('quienes-somos')}
            className="px-space-md py-1.5 rounded-full font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all"
          >
            Quiénes Somos
          </button>
          <button
            onClick={() => handleNavClick('mision-y-vision')}
            className="px-space-md py-1.5 rounded-full font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all"
          >
            Misión y Valores
          </button>
          <button
            onClick={() => onNavigate('rastreo')}
            className={`px-space-md py-1.5 rounded-full font-label-md text-label-md transition-all flex items-center gap-1 ${
              currentPage === 'rastreo'
                ? 'bg-secondary text-on-secondary font-bold shadow-sm'
                : 'text-secondary font-semibold hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-sm">travel_explore</span>
            <span>Rastrear Pedido</span>
          </button>
          <button
            onClick={() => handleNavClick('contacto')}
            className="px-space-md py-1.5 rounded-full font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all"
          >
            Contacto
          </button>
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-space-sm shrink-0">
          <a
            href="tel:+525512345678"
            className="hidden md:flex items-center gap-space-xs px-space-sm py-1 bg-surface-container-low rounded-full text-secondary font-label-md text-label-md hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-secondary text-sm">phone_in_talk</span>
            <span>+52 55 1234 5678</span>
          </a>

          <button
            onClick={() => onNavigate('agendar')}
            className={`hidden sm:inline-flex items-center gap-space-xs px-space-md py-2 rounded-full font-label-lg text-label-lg transition-all shadow-[0_6px_16px_rgba(123,104,238,0.25)] hover:shadow-[0_12px_32px_-4px_rgba(123,104,238,0.18)] active:scale-95 ${
              currentPage === 'agendar'
                ? 'bg-primary-container text-on-primary-container font-bold ring-2 ring-primary'
                : 'bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container'
            }`}
          >
            <span className="material-symbols-outlined text-base">local_laundry_service</span>
            <span>Agendar Recogida</span>
          </button>

          <button
            onClick={() => onNavigate('admin')}
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-all shadow-sm ${
              currentPage === 'admin'
                ? 'bg-primary text-on-primary ring-2 ring-primary-container'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-primary-fixed hover:text-primary'
            }`}
            title="Panel de Administrador"
            type="button"
          >
            <span className="material-symbols-outlined text-lg">admin_panel_settings</span>
          </button>

          {/* Mobile hamburger menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden w-9 h-9 flex items-center justify-center rounded-full bg-surface-container-low text-on-surface hover:bg-surface-container transition-colors ml-1"
            aria-label="Abrir menú"
          >
            <span className="material-symbols-outlined text-xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-surface-container-high bg-surface px-margin py-4 space-y-2 shadow-lg">
          <div className="flex flex-col gap-1">
            <button
              onClick={() => handleNavClick()}
              className={`text-left px-4 py-2.5 rounded-xl font-label-md text-label-md ${
                currentPage === 'inicio' ? 'bg-primary-container text-on-primary-container font-bold' : 'hover:bg-surface-container-low'
              }`}
            >
              Inicio
            </button>
            <button
              onClick={() => handleNavClick('quienes-somos')}
              className="text-left px-4 py-2.5 rounded-xl font-label-md text-label-md hover:bg-surface-container-low"
            >
              Quiénes Somos
            </button>
            <button
              onClick={() => handleNavClick('mision-y-vision')}
              className="text-left px-4 py-2.5 rounded-xl font-label-md text-label-md hover:bg-surface-container-low"
            >
              Misión y Visión
            </button>
            <button
              onClick={() => handleNavClick('valores')}
              className="text-left px-4 py-2.5 rounded-xl font-label-md text-label-md hover:bg-surface-container-low"
            >
              Valores
            </button>
            <button
              onClick={() => handleNavClick('servicios')}
              className="text-left px-4 py-2.5 rounded-xl font-label-md text-label-md hover:bg-surface-container-low"
            >
              Servicios
            </button>
            <button
              onClick={() => handleNavClick('contacto')}
              className="text-left px-4 py-2.5 rounded-xl font-label-md text-label-md hover:bg-surface-container-low"
            >
              Preguntas y Contacto
            </button>
            <button
              onClick={() => {
                onNavigate('rastreo');
                setMobileMenuOpen(false);
              }}
              className={`text-left px-4 py-2.5 rounded-xl font-label-md text-label-md flex items-center gap-2 ${
                currentPage === 'rastreo' ? 'bg-secondary text-on-secondary font-bold' : 'text-secondary hover:bg-surface-container-low font-semibold'
              }`}
            >
              <span className="material-symbols-outlined text-base">travel_explore</span>
              <span>Rastrear mi Folio</span>
            </button>
            <button
              onClick={() => {
                onNavigate('admin');
                setMobileMenuOpen(false);
              }}
              className={`text-left px-4 py-2.5 rounded-xl font-label-md text-label-md flex items-center gap-2 ${
                currentPage === 'admin' ? 'bg-primary text-on-primary font-bold' : 'hover:bg-surface-container-low text-primary font-semibold'
              }`}
            >
              <span className="material-symbols-outlined text-base">admin_panel_settings</span>
              <span>Panel de Administrador</span>
            </button>
            <button
              onClick={() => {
                onNavigate('agendar');
                setMobileMenuOpen(false);
              }}
              className="w-full mt-2 py-3 px-4 rounded-full bg-primary text-on-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">local_laundry_service</span>
              <span>Agendar Recogida a Domicilio</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
