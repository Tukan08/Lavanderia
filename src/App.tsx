import { useState, useEffect } from 'react';
import { PageType } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AgendarPage } from './pages/AgendarPage';
import { RastreoPage } from './pages/RastreoPage';
import { AdminPage } from './pages/AdminPage';

export function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('inicio');
  const [trackingFolio, setTrackingFolio] = useState<string>('');

  useEffect(() => {
    // Check initial hash
    const hash = window.location.hash.replace('#', '');
    if (hash === 'agendar') {
      setCurrentPage('agendar');
    } else if (hash.startsWith('rastreo')) {
      setCurrentPage('rastreo');
      const parts = hash.split('/');
      if (parts[1]) {
        setTrackingFolio(parts[1]);
      }
    } else if (hash === 'admin') {
      setCurrentPage('admin');
    }
  }, []);

  const handleNavigate = (page: PageType, param?: string) => {
    setCurrentPage(page);

    if (page === 'rastreo') {
      if (param) {
        setTrackingFolio(param);
        window.location.hash = `rastreo/${param}`;
      } else {
        window.location.hash = 'rastreo';
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'agendar') {
      window.location.hash = 'agendar';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'admin') {
      window.location.hash = 'admin';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // inicio
      window.location.hash = param ? param : '';
      if (param) {
        setTimeout(() => {
          const el = document.getElementById(param);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-1 pt-20">
        {currentPage === 'inicio' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'agendar' && (
          <AgendarPage
            onNavigate={handleNavigate}
            onOrderCreated={(folio) => setTrackingFolio(folio)}
          />
        )}
        {currentPage === 'rastreo' && (
          <RastreoPage onNavigate={handleNavigate} initialFolio={trackingFolio} />
        )}
        {currentPage === 'admin' && <AdminPage onNavigate={handleNavigate} />}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
