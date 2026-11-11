import { useState, useEffect } from 'react';
import { PageType } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AgendarPage } from './pages/AgendarPage';

export function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('inicio');

  useEffect(() => {
    // Check initial hash
    const hash = window.location.hash.replace('#', '');
    if (hash === 'agendar') {
      setCurrentPage('agendar');
    }
  }, []);

  const handleNavigate = (page: PageType, sectionId?: string) => {
    setCurrentPage(page);
    window.location.hash = page === 'agendar' ? 'agendar' : sectionId ? sectionId : '';
    
    if (page === 'inicio') {
      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-1 pt-20">
        {currentPage === 'inicio' ? (
          <HomePage onNavigate={handleNavigate} />
        ) : (
          <AgendarPage onNavigate={handleNavigate} />
        )}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
