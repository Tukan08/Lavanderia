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
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida/ALJJyrCd1F6-G9UpWc0atdkT2uFx10gHLzp8yTY9ilf0fpUoHpqcsZdqZOuFuUArPge92ZqKU6z5ibCc6WKJ5QJk1dVZ7madmk1eDUNBJ4d93ngI18ozPRmOf0mwfqtVpZb8fpZ97D6pf6gW0jdBtCeahDiOGAIZNZflCMMNF8bLFZT11nhdc46XReUHQ8eC8x9Z3vgOT5vbK3I2ILCxhbYT8Bhz09FtkhJVOWdaLiS9A9sd"
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
            onClick={() => handleNavClick('quienes-somos')}
            className="px-space-md py-1.5 rounded-full font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all"
          >
            Quiénes Somos
          </button>
          <button
            onClick={() => handleNavClick('mision-y-vision')}
            className="px-space-md py-1.5 rounded-full font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all"
          >
            Misión y Visión
          </button>
          <button
            onClick={() => handleNavClick('valores')}
            className="px-space-md py-1.5 rounded-full font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all"
          >
            Valores
          </button>
          <button
            onClick={() => handleNavClick('servicios')}
            className="px-space-md py-1.5 rounded-full font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all"
          >
            Servicios
          </button>
          <button
            onClick={() => handleNavClick('contacto')}
            className="px-space-md py-1.5 rounded-full font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all"
          >
            Preguntas y Contacto
          </button>
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-space-sm shrink-0">
          <a
            href="tel:+34900123456"
            className="hidden md:flex items-center gap-space-xs px-space-sm py-1 bg-surface-container-low rounded-full text-secondary font-label-md text-label-md hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-secondary text-sm">phone_in_talk</span>
            <span>+34 900 123 456</span>
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

          <div className="flex items-center gap-space-xs pl-space-xs">
            <button
              onClick={() => handleNavClick('contacto')}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
              title="Ubicación de tienda"
              type="button"
            >
              <span className="material-symbols-outlined text-base">location_on</span>
            </button>
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover shadow-[0_2px_8px_rgba(123,104,238,0.15)]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdSGE2uFcgelAnm3Loq0LS_C5fsngPFV6E2pTjCWDc266nn_7z8qFDXCnz9OBkVFICx5GvSRS2o7YZEb6n4ofsHtQSFKCYzAvdCdv5d5iXloMvqW1isIm64Ebu4fFFUJVAtveAOR6jUcKr9HT80w2bxRYVOZa8GjR0KhfudYEi-Wmd-P-4uHGr6ZRhRqrWAtJg-SCwnCes35FaIOfSOywoZCUlJfso50JMI-0xJuE"
            />
          </div>

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
