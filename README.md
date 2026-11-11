# Lavandería Las Danis - Web Boutique

Sitio web oficial interactivo para **Lavandería Las Danis**, diseñado a partir del prototipo de Google Stitch ("Warm Pastel Freshness") y construido con **React 18**, **TypeScript**, **Vite** y **Tailwind CSS**.

---

## 🚀 Características y Secciones Implementadas

### 1. Ventana 1: Página de Inicio (`HomePage`)
- **Header persistente con navegación suave y responsive**: logotipo oficial, selector de páginas, enlaces anclados y botón directo "Agendar Recogida".
- **Hero interactivo**: Badges de confianza (Detergentes hipoalergénicos, entrega en 24h, recogida gratis), llamadas a la acción, fotografía boutique y métricas flotantes animadas.
- **Quiénes Somos / Esencia**: Historia familiar, foto de atelier y los tres pilares de servicio (Cuidado Especializado, Planchado Artesanal, Empaque Sustentable).
- **Misión y Visión**: Grandes tarjetas con degradados pasteles sutiles, detalles de compromisos, ahorro de agua (-42%) y metas de sostenibilidad.
- **Valores**: Cuadrícula de 6 tarjetas (Cariño y Dedicación, Compromiso Ecológico, Honestidad y Confianza, Calidad Impecable, Puntualidad Absoluta, Calidez Familiar).
- **Catálogo de Servicios**: Bento grid con imágenes de alta definición y precios de lavado por kilo, prendas delicadas, nórdicos y servicio exprés.
- **Testimonios de clientes** con puntuación de 5 estrellas.
- **Banner CTA y Formulario de Solicitud Rápida** con validación y confirmación en pantalla.

### 2. Ventana 2: Agendar Recogida a Domicilio (`AgendarPage`)
- **Stepper Visual de 4 Pasos**: Servicios & Prendas ➔ Dirección & Contacto ➔ Horario de Entrega ➔ Pago Flexible.
- **Selección de Servicios reactiva**:
  - Bolsa Diaria (5 kg) con control de cantidad en tiempo real.
  - Bolsa Grande XL (10 kg).
  - Delicadas & Trajes (por prenda).
  - Blancos & Edredones (por unidad).
  - Pack opcional de Planchado Artesanal (+12,00 €).
- **Preferencias de Cuidado**:
  - Tipo de detergente (Hipoalergénico de lavanda, Neutro, Especial lanas).
  - Filtros de agua fría y suavizante vegetal.
- **Formulario de Dirección y Contacto**: Validación de datos, teléfono, portal, piso y notas para el conserje.
- **Selector de Días y Franjas Horarias**: Botones para Hoy, Mañana, Sábado, Lunes y franjas (Mañana, Mediodía, Tarde, Noche).
- **Selector de Velocidad**: Estándar 48h (Gratis) o Exprés 24h (+3,00 €).
- **Resumen de Pedido Flotante (Sticky)**:
  - Cálculo dinámico de subtotal.
  - Descuento de bienvenida (-10% automático).
  - Recogida y entrega gratuita.
  - Total actualizado al instante.
  - Selección de método de pago (Tarjeta, Bizum, En mano).
  - Modal interactivo de confirmación de pedido con detalles de entrega.

---

## 🛠️ Tecnologías Utilizadas

- **React 18** (Functional Components, Hooks)
- **TypeScript** (Tipado estricto para modelos de datos y formularios)
- **Vite** (Compilación ultrarrápida y HMR)
- **Tailwind CSS v3** (Configurado con la paleta exacta, tipografías y sombras del sistema de diseño)
- **Google Fonts** (*Plus Jakarta Sans* y *Material Symbols Outlined*)

---

## 💻 Instrucciones para Ejecutar Localmente

### 1. Iniciar el servidor de desarrollo
```bash
npm run dev
```
Abre tu navegador en `http://localhost:5173`.

### 2. Compilar para producción
```bash
npm run build
```

### 3. Previsualizar la compilación
```bash
npm run preview
```
