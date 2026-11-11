import React, { useState, useEffect } from 'react';
import { PageType, Order, OrderStatus } from '../types';
import { getOrders, updateOrderStatus, downloadOrdersCSV, STATUS_CONFIG } from '../utils/orderStorage';

interface AdminPageProps {
  onNavigate: (page: PageType, sectionId?: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('lavanderia_admin_auth') === 'true';
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [activeEditingNoteFolio, setActiveEditingNoteFolio] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState('');

  const loadOrders = () => {
    setOrders(getOrders());
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadOrders();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === 'admin' && password.trim() === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('lavanderia_admin_auth', 'true');
      setLoginError('');
      loadOrders();
    } else {
      setLoginError('Credenciales incorrectas. Usa admin / admin.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('lavanderia_admin_auth');
    setUsername('');
    setPassword('');
  };

  const handleStatusChange = (folio: string, newStatus: OrderStatus) => {
    updateOrderStatus(folio, newStatus);
    loadOrders();
  };

  const handleSaveNote = (folio: string) => {
    updateOrderStatus(folio, orders.find(o => o.folio === folio)?.status || 'AGENDADO', noteDraft);
    setActiveEditingNoteFolio(null);
    loadOrders();
  };

  const formatCurrency = (val: number) => `$${val.toFixed(2)} MXN`;

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.folio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerPhone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.address.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || o.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Analytics Metrics
  const totalOrders = orders.length;
  const inProgressOrders = orders.filter(o => o.status !== 'ENTREGADO').length;
  const deliveredOrders = orders.filter(o => o.status === 'ENTREGADO').length;
  const totalRevenue = orders.reduce((acc, curr) => acc + curr.total, 0);

  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
        <div className="bg-surface-container-lowest max-w-md w-full p-space-xl rounded-3xl shadow-xl border border-surface-container-high space-y-space-md animate-fade-in">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-primary text-on-primary flex items-center justify-center mx-auto shadow-md">
              <span className="material-symbols-outlined text-3xl">admin_panel_settings</span>
            </div>
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Acceso Administrativo
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Inicia sesión para gestionar pedidos, actualizar estados de lavado y descargar el registro en CSV.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-space-sm pt-2">
            {loginError && (
              <div className="p-3 rounded-xl bg-error-container text-on-error-container text-xs font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">error</span>
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block font-label-sm text-label-sm text-on-surface font-semibold mb-1">Usuario</label>
              <input
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-surface border border-outline-variant"
                required
              />
            </div>

            <div>
              <label className="block font-label-sm text-label-sm text-on-surface font-semibold mb-1">Contraseña</label>
              <input
                type="password"
                placeholder="admin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-surface border border-outline-variant"
                required
              />
            </div>

            <div className="p-2.5 rounded-xl bg-surface-container text-xs text-on-surface-variant flex items-center justify-between">
              <span>Credenciales demo:</span>
              <span className="font-mono bg-surface-container-high px-2 py-0.5 rounded text-primary font-bold">
                admin / admin
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-primary text-on-primary font-label-lg font-bold shadow-md hover:bg-primary-container transition-all active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">login</span>
              <span>Entrar al Panel</span>
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              onClick={() => onNavigate('inicio')}
              className="text-xs text-on-surface-variant hover:text-primary transition-colors"
            >
              ← Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-space-xl">
      <div className="max-w-[1240px] mx-auto px-margin lg:px-margin-desktop py-space-md lg:py-space-lg w-full space-y-space-lg">
        {/* Top Navbar Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-surface-container-high">
          <div className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-xl">tune</span>
            </div>
            <div>
              <h1 className="font-title-md text-title-md font-bold text-on-surface leading-tight">
                Panel de Administración
              </h1>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                Control de estados de ropa y exportación de pedidos en CSV
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-space-xs">
            <button
              onClick={() => downloadOrdersCSV(orders)}
              className="inline-flex items-center gap-1.5 px-space-md py-2 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md hover:bg-secondary hover:text-on-secondary transition-all shadow-sm font-semibold"
              title="Descargar todos los registros a archivo CSV"
            >
              <span className="material-symbols-outlined text-base">download</span>
              <span>Descargar CSV</span>
            </button>

            <button
              onClick={() => onNavigate('rastreo')}
              className="inline-flex items-center gap-1.5 px-space-md py-2 rounded-full bg-surface-container-high text-on-surface font-label-md text-label-md hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-base">visibility</span>
              <span>Vista de Rastreo</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-space-md py-2 rounded-full bg-surface-container text-error font-label-md text-label-md hover:bg-error-container hover:text-on-error-container transition-all"
            >
              <span className="material-symbols-outlined text-base">logout</span>
              <span>Salir</span>
            </button>
          </div>
        </div>

        {/* 4 Analytics Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm sm:gap-space-md">
          <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-surface-container-high space-y-1">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Total Pedidos</span>
            <p className="font-headline-md text-headline-md font-bold text-on-surface">{totalOrders}</p>
          </div>
          <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-surface-container-high space-y-1">
            <span className="font-label-sm text-label-sm text-on-surface-variant">En Proceso</span>
            <p className="font-headline-md text-headline-md font-bold text-secondary">{inProgressOrders}</p>
          </div>
          <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-surface-container-high space-y-1">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Entregados</span>
            <p className="font-headline-md text-headline-md font-bold text-primary">{deliveredOrders}</p>
          </div>
          <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-surface-container-high space-y-1">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Ingresos Registrados</span>
            <p className="font-headline-md text-headline-md font-bold text-on-surface">
              {formatCurrency(totalRevenue)}
            </p>
          </div>
        </div>

        {/* Search & Status Filters */}
        <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-surface-container-high flex flex-col md:flex-row gap-space-sm items-center justify-between">
          <div className="relative w-full md:w-96">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
              search
            </span>
            <input
              type="text"
              placeholder="Buscar por folio, cliente, teléfono..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-surface-container-low text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-surface border border-outline-variant"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <span className="font-label-sm text-label-sm text-on-surface-variant shrink-0">Filtrar:</span>
            {[
              { key: 'ALL', label: 'Todos' },
              { key: 'AGENDADO', label: 'Agendados' },
              { key: 'EN_CAMINO', label: 'En Camino' },
              { key: 'EN_LAVADO', label: 'En Lavado' },
              { key: 'PLANCHADO', label: 'Planchado' },
              { key: 'LISTO', label: 'Listos' },
              { key: 'ENTREGADO', label: 'Entregados' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setStatusFilter(tab.key)}
                className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm transition-colors shrink-0 ${
                  statusFilter === tab.key
                    ? 'bg-primary text-on-primary font-bold shadow-sm'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-surface-container-lowest rounded-3xl shadow-sm border border-surface-container-high overflow-hidden">
          <div className="p-space-md border-b border-surface-container-high flex items-center justify-between">
            <h2 className="font-title-md text-title-md font-bold text-on-surface">
              Listado de Recogidas y Estados ({filteredOrders.length})
            </h2>
            <span className="text-xs text-on-surface-variant">
              Actualiza el menú desplegable para cambiar el estado visible al cliente
            </span>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="p-space-xl text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-4xl mb-2">inbox</span>
              <p>No se encontraron pedidos con los filtros aplicados.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-body-sm border-collapse">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider border-b border-surface-container-high">
                    <th className="py-3 px-4">Folio</th>
                    <th className="py-3 px-4">Cliente & Contacto</th>
                    <th className="py-3 px-4">Prendas / Solicitud</th>
                    <th className="py-3 px-4">Fecha Recogida</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Estado Actual (Actualizable)</th>
                    <th className="py-3 px-4">Notas & Repartidor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-high">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.folio} className="hover:bg-surface-container-low/50 transition-colors">
                      {/* Folio */}
                      <td className="py-3.5 px-4 font-mono font-bold text-primary whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <span>{ord.folio}</span>
                          {ord.speed === 'express' && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary-fixed text-primary font-bold">
                              EXP
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Cliente */}
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-on-surface leading-tight">{ord.customerName}</p>
                        <div className="flex items-center gap-1.5 text-xs text-on-surface-variant mt-0.5">
                          <span>{ord.customerPhone}</span>
                          <a
                            href={`https://wa.me/52${ord.customerPhone.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-secondary hover:underline inline-flex items-center gap-0.5"
                            title="Abrir WhatsApp"
                          >
                            <span className="material-symbols-outlined text-xs">chat</span>
                          </a>
                        </div>
                        <p className="text-[11px] text-on-surface-variant truncate max-w-[200px]" title={ord.address}>
                          {ord.address}
                        </p>
                      </td>

                      {/* Prendas */}
                      <td className="py-3.5 px-4 text-xs space-y-0.5">
                        {ord.quantities.kilosRopa > 0 && (
                          <span className="inline-block px-2 py-0.5 rounded bg-surface-container text-on-surface mr-1 mb-1">
                            {ord.quantities.kilosRopa} kg Ropa
                          </span>
                        )}
                        {ord.quantities.cobijaIndividual > 0 && (
                          <span className="inline-block px-2 py-0.5 rounded bg-surface-container text-on-surface mr-1 mb-1">
                            {ord.quantities.cobijaIndividual} Cob. Ind
                          </span>
                        )}
                        {ord.quantities.cobijaMatrimonial > 0 && (
                          <span className="inline-block px-2 py-0.5 rounded bg-surface-container text-on-surface mr-1 mb-1">
                            {ord.quantities.cobijaMatrimonial} Cob. Mat
                          </span>
                        )}
                        {ord.quantities.cobijaKing > 0 && (
                          <span className="inline-block px-2 py-0.5 rounded bg-surface-container text-on-surface mr-1 mb-1">
                            {ord.quantities.cobijaKing} Cob. King
                          </span>
                        )}
                        {ord.quantities.tenisZapatos > 0 && (
                          <span className="inline-block px-2 py-0.5 rounded bg-surface-container text-on-surface mr-1 mb-1">
                            {ord.quantities.tenisZapatos} par Tenis
                          </span>
                        )}
                        {ord.quantities.peluches > 0 && (
                          <span className="inline-block px-2 py-0.5 rounded bg-surface-container text-primary mr-1 mb-1 font-semibold">
                            {ord.quantities.peluches} Peluches ({ord.pelucheSize || 'Med'})
                          </span>
                        )}
                      </td>

                      {/* Fecha Recogida */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-xs">
                        <p className="font-semibold text-on-surface">{ord.pickupDate}</p>
                        <p className="text-on-surface-variant">{ord.pickupSlot.split(' ')[0]}</p>
                      </td>

                      {/* Total */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <p className="font-bold text-primary">{formatCurrency(ord.total)}</p>
                        <p className="text-[10px] text-on-surface-variant uppercase">{ord.paymentMethod}</p>
                      </td>

                      {/* Status Selector */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <select
                          value={ord.status}
                          onChange={(e) => handleStatusChange(ord.folio, e.target.value as OrderStatus)}
                          className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm font-bold border focus:outline-none cursor-pointer shadow-sm ${STATUS_CONFIG[ord.status].color}`}
                        >
                          <option value="AGENDADO">1. Recogida Agendada</option>
                          <option value="EN_CAMINO">2. Repartidor en Camino</option>
                          <option value="EN_LAVADO">3. En Lavado y Cuidado</option>
                          <option value="PLANCHADO">4. Secado y Planchado</option>
                          <option value="LISTO">5. Listo para Entrega</option>
                          <option value="ENTREGADO">6. Entregado con Éxito</option>
                        </select>
                      </td>

                      {/* Notes / Repartidor */}
                      <td className="py-3.5 px-4 max-w-[220px]">
                        {activeEditingNoteFolio === ord.folio ? (
                          <div className="space-y-1">
                            <input
                              type="text"
                              value={noteDraft}
                              onChange={(e) => setNoteDraft(e.target.value)}
                              placeholder="Ej. Asignado a Juan"
                              className="w-full text-xs px-2 py-1 rounded bg-surface border border-outline-variant focus:outline-none"
                              autoFocus
                            />
                            <div className="flex gap-1">
                              <button
                                onClick={() => handleSaveNote(ord.folio)}
                                className="px-2 py-0.5 rounded bg-primary text-on-primary text-[10px] font-bold"
                              >
                                Guardar
                              </button>
                              <button
                                onClick={() => setActiveEditingNoteFolio(null)}
                                className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-[10px]"
                              >
                                Cancelar
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div
                            onClick={() => {
                              setActiveEditingNoteFolio(ord.folio);
                              setNoteDraft(ord.adminNotes || '');
                            }}
                            className="cursor-pointer group flex items-start gap-1"
                            title="Clic para editar nota"
                          >
                            <p className="text-xs text-on-surface-variant italic truncate max-w-[180px]">
                              {ord.adminNotes || '+ Agregar nota'}
                            </p>
                            <span className="material-symbols-outlined text-xs text-outline opacity-0 group-hover:opacity-100 transition-opacity">
                              edit
                            </span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
