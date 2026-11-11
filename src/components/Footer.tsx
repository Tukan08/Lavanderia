import React from 'react';
import { PageType } from '../types';

interface FooterProps {
  onNavigate: (page: PageType, sectionId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-surface-container-low shadow-[0_-4px_24px_rgba(157,141,241,0.06)]" id="contacto">
      <div className="max-w-[1200px] mx-auto px-margin lg:px-margin-desktop pt-space-xl pb-space-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop">
          {/* Col 1: Brand Info & Socials */}
          <div className="space-y-space-sm">
            <div 
              className="flex items-center gap-space-xs cursor-pointer" 
              onClick={() => onNavigate('inicio')}
            >
              <img
                alt="Logotipo Lavandería Las Danis"
                className="h-9 w-auto object-contain rounded-lg shadow-sm"
                src="/img/Logo.jpeg"
              />
              <span className="font-title-md text-title-md text-primary font-bold">Las Danis</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Cuidado textil artesanal con tecnología sustentable y atención personalizada para que disfrutes de tu ropa siempre impecable y fresca.
            </p>
            <div className="flex items-center gap-space-xs pt-space-xs">
              <a
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-secondary hover:bg-secondary hover:text-on-secondary transition-all shadow-[0_2px_8px_rgba(0,98,160,0.15)]"
                href="https://wa.me/34612345678"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp"
              >
                <span className="material-symbols-outlined text-lg">chat</span>
              </a>
              <a
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all shadow-[0_2px_8px_rgba(123,104,238,0.15)]"
                href="#"
                title="Instagram"
              >
                <span className="material-symbols-outlined text-lg">photo_camera</span>
              </a>
              <a
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-tertiary hover:bg-tertiary hover:text-on-tertiary transition-all shadow-[0_2px_8px_rgba(93,77,172,0.15)]"
                href="mailto:contacto@lasdanis.es"
                title="Email"
              >
                <span className="material-symbols-outlined text-lg">mail</span>
              </a>
            </div>
          </div>

          {/* Col 2: Business Hours */}
          <div className="space-y-space-sm">
            <h4 className="font-title-md text-title-md text-on-surface font-semibold">Horario de Atención</h4>
            <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <li><span className="font-semibold text-on-surface">Lunes a Viernes:</span> 08:00 - 20:30</li>
              <li><span className="font-semibold text-on-surface">Sábados:</span> 09:00 - 15:00</li>
              <li><span className="font-semibold text-on-surface">Domingos:</span> Descanso semanal</li>
              <li><span className="font-semibold text-secondary">Servicio Express 24h</span> bajo cita previa</li>
            </ul>
          </div>

          {/* Col 3: Location & Direct Contact */}
          <div className="space-y-space-sm">
            <h4 className="font-title-md text-title-md text-on-surface font-semibold">Ubicación & Contacto</h4>
            <div className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <div className="flex items-start gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-base shrink-0 mt-0.5">location_on</span>
                <span>Av. Insurgentes Sur 450, Col. Roma Sur, CDMX</span>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-base shrink-0">call</span>
                <span>+52 55 1234 5678</span>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-base shrink-0">mark_chat_unread</span>
                <span className="text-secondary font-medium">WhatsApp Directo: +52 55 9876 5432</span>
              </div>
            </div>
          </div>

          {/* Col 4: Quick Navigation & Eco Badge */}
          <div className="space-y-space-sm">
            <h4 className="font-title-md text-title-md text-on-surface font-semibold">Navegación Rápida</h4>
            <div className="grid grid-cols-2 gap-space-xs font-body-sm text-body-sm">
              <button
                onClick={() => onNavigate('inicio')}
                className="text-left text-on-surface-variant hover:text-primary transition-colors"
              >
                Inicio
              </button>
              <button
                onClick={() => onNavigate('inicio', 'servicios')}
                className="text-left text-on-surface-variant hover:text-primary transition-colors"
              >
                Servicios
              </button>
              <button
                onClick={() => onNavigate('inicio', 'quienes-somos')}
                className="text-left text-on-surface-variant hover:text-primary transition-colors"
              >
                Nosotros
              </button>
              <button
                onClick={() => onNavigate('inicio', 'mision-y-vision')}
                className="text-left text-on-surface-variant hover:text-primary transition-colors"
              >
                Misión
              </button>
              <button
                onClick={() => onNavigate('inicio', 'valores')}
                className="text-left text-on-surface-variant hover:text-primary transition-colors"
              >
                Valores
              </button>
              <button
                onClick={() => onNavigate('rastreo')}
                className="text-left text-secondary font-medium hover:underline flex items-center gap-1"
              >
                <span>Rastrear Pedido</span>
              </button>
              <button
                onClick={() => onNavigate('agendar')}
                className="text-left text-primary font-medium hover:underline"
              >
                Agendar
              </button>
              <button
                onClick={() => onNavigate('admin')}
                className="text-left text-on-surface-variant hover:text-primary transition-colors text-xs"
              >
                Panel Admin
              </button>
            </div>
            <div className="pt-space-xs">
              <span className="inline-block px-space-sm py-1 bg-surface-container rounded-full font-label-sm text-label-sm text-primary font-medium">
                🌿 Detergentes Hipoalergénicos
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-space-xl pt-space-md flex flex-col md:flex-row items-center justify-between gap-space-sm font-label-sm text-label-sm text-on-surface-variant bg-surface-container/50 px-space-md py-space-sm rounded-xl">
          <p>© 2025 Lavandería Las Danis. Todos los derechos reservados.</p>
          <div className="flex items-center gap-space-md">
            <a className="hover:text-primary transition-colors" href="#">Aviso Legal</a>
            <a className="hover:text-primary transition-colors" href="#">Política de Privacidad</a>
            <a className="hover:text-primary transition-colors" href="#">Términos del Servicio</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
