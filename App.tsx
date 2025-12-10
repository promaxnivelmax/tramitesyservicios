import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { ResumeForm } from './components/ResumeForm';
import { ResumePreview } from './components/ResumePreview';
import { Auth } from './components/Auth';
import { Dashboard } from './components/Dashboard';
import { Footer } from './components/Footer';
import { ExternalLinks } from './components/ExternalLinks';
import { CertGenerator } from './components/CertGenerator';
import { ResumeData, INITIAL_DATA, User } from './types';
import { StorageService } from './services/storage';

type ViewState = 'LANDING' | 'AUTH' | 'DASHBOARD' | 'FORM' | 'PREVIEW' | 'LINKS' | 'CERT_GEN';

export default function App() {
  const [view, setView] = useState<ViewState>('LANDING');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentResume, setCurrentResume] = useState<ResumeData>(INITIAL_DATA);
  const [isLoading, setIsLoading] = useState(false);

  // Check for session
  useEffect(() => {
    const sessionUserStr = sessionStorage.getItem('ty_session_user');
    if (sessionUserStr) {
      const sessionUser = JSON.parse(sessionUserStr);
      // Try to sync with DB to get latest resumes
      refreshUser(sessionUser);
    }
  }, []);

  const refreshUser = async (user: User) => {
    setIsLoading(true);
    const updatedUser = await StorageService.syncUserData(user);
    if (updatedUser) {
       setCurrentUser(updatedUser);
       sessionStorage.setItem('ty_session_user', JSON.stringify(updatedUser));
       if (view === 'LANDING') setView('DASHBOARD');
    }
    setIsLoading(false);
  }

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    sessionStorage.setItem('ty_session_user', JSON.stringify(user));
    setView('DASHBOARD');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem('ty_session_user');
    setView('LANDING');
  };

  const handleNewResume = () => {
    const newResume = { ...INITIAL_DATA, id: Date.now().toString() };
    setCurrentResume(newResume);
    setView('FORM');
  };

  const handleEditResumeFromDashboard = (resume: ResumeData) => {
    setCurrentResume(resume);
    setView('PREVIEW');
  };

  const handleFormComplete = async (data: ResumeData) => {
    if (!currentUser) return;
    setIsLoading(true);
    
    const updatedResume = { ...data };
    await StorageService.saveResume(currentUser, updatedResume);
    
    // Refresh user data to show new resume in dashboard immediately if we go back
    await refreshUser(currentUser);
    
    setCurrentResume(updatedResume);
    setIsLoading(false);
    setView('PREVIEW');
  };

  const handleDeleteResume = async (id: string) => {
    if (!currentUser) return;
    if(!confirm("¿Estás seguro de que quieres eliminar esta hoja de vida?")) return;

    setIsLoading(true);
    await StorageService.deleteResume(currentUser, id);
    await refreshUser(currentUser);
    setIsLoading(false);
  };

  if (isLoading) {
     return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center flex-col gap-4">
           <div className="w-12 h-12 border-4 border-tyYellow border-t-tyGrey rounded-full animate-spin"></div>
           <p className="text-tyGrey font-bold animate-pulse">Sincronizando...</p>
        </div>
     );
  }

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm py-4 px-6 sticky top-0 z-50 no-print transition-all duration-300">
        <div className="container mx-auto flex justify-between items-center">
           <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView(currentUser ? 'DASHBOARD' : 'LANDING')}>
             <div className="w-10 h-10 bg-tyYellow rounded-br-xl rounded-tl-xl flex items-center justify-center font-bold text-tyGrey text-xl shadow-md">T</div>
             <div className="leading-none">
               <span className="block text-lg font-heading font-bold text-tyGrey">Tramites y</span>
               <span className="block text-sm font-heading font-bold text-tyYellow tracking-wider">SERVICIOS</span>
             </div>
           </div>
           
           <div className="flex gap-4">
             {currentUser && view !== 'DASHBOARD' && (
               <button onClick={() => setView('DASHBOARD')} className="text-sm font-medium text-gray-500 hover:text-tyYellow transition">
                 Ir al Panel
               </button>
             )}
             {view === 'FORM' && (
               <button onClick={() => setView('DASHBOARD')} className="text-sm text-red-400 hover:text-red-600">
                 Cancelar
               </button>
             )}
           </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {view === 'LANDING' && <LandingPage onStart={() => setView('AUTH')} onLogin={() => setView('AUTH')} />}
        
        {view === 'AUTH' && (
          <Auth 
            onLoginSuccess={handleLoginSuccess} 
            onCancel={() => setView('LANDING')}
          />
        )}
        
        {view === 'DASHBOARD' && currentUser && (
          <Dashboard 
             user={currentUser}
             onNewResume={handleNewResume}
             onEditResume={handleEditResumeFromDashboard}
             onDeleteResume={handleDeleteResume}
             onLogout={handleLogout}
             onGoToLinks={() => setView('LINKS')}
             onGoToCertGen={() => setView('CERT_GEN')}
          />
        )}

        {view === 'LINKS' && (
          <ExternalLinks onBack={() => setView('DASHBOARD')} />
        )}

        {view === 'CERT_GEN' && (
          <CertGenerator onBack={() => setView('DASHBOARD')} />
        )}

        {view === 'FORM' && (
          <ResumeForm 
            initialData={currentResume} 
            onComplete={handleFormComplete} 
            onCancel={() => setView('DASHBOARD')}
          />
        )}
        
        {view === 'PREVIEW' && (
          <ResumePreview 
            data={currentResume} 
            onEdit={() => setView('FORM')}
            onExit={() => setView('DASHBOARD')}
          />
        )}
      </main>

      {/* Footer */}
      {view !== 'PREVIEW' && view !== 'CERT_GEN' && <Footer />}
    </div>
  );
}