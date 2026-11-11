# Lavandería Las Danis - Web Boutique

Sitio web oficial interactivo para **Lavandería Las Danis**, diseñado a partir del prototipo de Google Stitch ("Warm Pastel Freshness") y construido con **React 18**, **TypeScript**, **Vite** y **Tailwind CSS**.

---

## 🚀 Características y Secciones Implementadas

### 1. Ventana 1: Página de Inicio (`HomePage`)
- **Header boutique con navegación responsive**: Logotipo oficial, selector de páginas, enlace directo a "Rastrear Pedido" y acceso al "Panel Admin".
- **Hero interactivo**: Botón directo para Agendar y botón para Rastrear Folio, con imagen principal oficial (`Lavanderia_Precios.jpeg`) y badges de satisfacción.
- **Quiénes Somos / Esencia**: Historia familiar con imagen del taller (`Img_1.jpeg`) y los 3 pilares de servicio (Cuidado Especializado, Planchado Artesanal, Empaque Sustentable).
- **Misión y Visión**: Compromiso ecológico con -42% de ahorro de agua y objetivos sustentables.
- **Valores**: Cuadrícula de 6 tarjetas con pilares del negocio.
- **Catálogo de Servicios y Tarifario en Pesos Mexicanos ($ MXN)**:
  - Ropa por kilo: **$18 MXN** normal / **$22 MXN** express mismo día.
  - Cobijas y Edredones: Individual **$40 MXN**, Matrimonial **$45 MXN**, King Size **$50 MXN**.
  - Tenis y Zapatos: **$30 MXN** / par.
  - Peluches: Cotización según tamaño (Chico, Mediano, Grande, Gigante).

### 2. Ventana 2: Agendar Recogida a Domicilio (`AgendarPage`)
- **Generación automática de Folio único** (ej: `LD-8492`) para cada pedido agendado.
- **Calendario Accesible**: Selector con fecha mínima hoy (`YYYY-MM-DD`), botones rápidos ("Hoy", "Mañana", "En 2 días") y franjas horarias claras.
- **Validaciones obligatorias**: Nombre completo, teléfono/WhatsApp de contacto, dirección y al menos una prenda o kilo seleccionado.
- **Modal de confirmación interactivo**: Muestra el folio en tamaño grande con botón de "Copiar Folio", botón directo a "Rastrear Folio Ahora" y confirmación por WhatsApp.

### 3. Ventana 3: Rastreo de Folio en Tiempo Real (`RastreoPage`)
- Buscador accesible por Folio.
- Barra de progreso visual con las 6 etapas del ciclo de lavado:
  1. *Recogida Agendada*
  2. *Repartidor en Camino*
  3. *En Lavado y Cuidado*
  4. *Secado y Planchado*
  5. *Listo para Entrega*
  6. *Entregado con Éxito*
- Desglose completo de prendas, total a pagar en `$ MXN` y notas del repartidor/taller.

### 4. Ventana 4: Panel de Administrador (`AdminPage`)
- **Acceso Protegido por Contraseña**:
  - **Usuario:** `admin`
  - **Contraseña:** `admin`
- **Métricas en tiempo real**: Total de pedidos, en proceso, entregados e ingresos acumulados en `$ MXN`.
- **Selector de Estado en Vivo**: El administrador puede cambiar en un clic el estado de cada prenda y guardar notas internas (las cuales se reflejan de inmediato al cliente cuando consulta su folio).
- **Exportación a CSV**: Botón para descargar el archivo `pedidos_lavanderia_YYYY-MM-DD.csv` con todos los datos y pedidos registrados.

---

## 🛠️ Tecnologías Utilizadas

- **React 18** (Functional Components, Hooks)
- **TypeScript** (Tipado estricto)
- **Vite** (Compilación y HMR)
- **Tailwind CSS v3**
- **LocalStorage & CSV Exporter** (Persistencia local para demostración y exportación a hoja de cálculo sin necesidad de base de datos)

---

## 💻 Instrucciones para Ejecutar Localmente

```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
```
Abre tu navegador en `http://localhost:5173`.
