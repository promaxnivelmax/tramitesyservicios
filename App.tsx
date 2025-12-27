
import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { ResumeForm } from './components/ResumeForm';
import { ResumePreview } from './components/ResumePreview';
import { Auth } from './components/Auth';
import { Dashboard } from './components/Dashboard';
import { Footer } from './components/Footer';
import { ExternalLinks } from './components/ExternalLinks';
import { CertGenerator } from './components/CertGenerator';
import { TrainingCenter } from './components/TrainingCenter';
import { ResumeData, INITIAL_DATA, User } from './types';
import { StorageService } from './services/storage';
import { Sun, Moon, Sparkles, Loader2, Star, Briefcase } from 'lucide-react';

type ViewState = 'LANDING' | 'AUTH' | 'DASHBOARD' | 'FORM' | 'PREVIEW' | 'LINKS' | 'CERT_GEN' | 'TRAINING';

const Logo = ({ size = "normal" }: { size?: "small" | "normal" | "large" }) => {
  const containerClass = size === "small" ? "w-8 h-8 text-sm" : size === "large" ? "w-20 h-20 text-3xl" : "w-10 h-10 text-xl";
  return (
    <div className={`${containerClass} bg-tyYellow rounded-xl flex items-center justify-center font-black text-tyGrey shadow-lg transition-transform hover:scale-110 active:scale-95 border-b-4 border-tyGrey/10`}>
      T
    </div>
  );
};

const MinimalLoading = () => (
  <div className="min-h-screen minimal-loader flex items-center justify-center flex-col gap-6">
    <div className="relative">
      <Logo size="large" />
      <div className="absolute -inset-4 border-2 border-tyYellow/30 rounded-3xl animate-spin-slow"></div>
      <div className="absolute -inset-1 border border-tyGrey/5 rounded-2xl animate-pulse"></div>
    </div>
    <div className="text-center space-y-3">
      <h2 className="text-tyGrey dark:text-white font-heading font-black uppercase tracking-[0.5em] text-xs">Sincronizando</h2>
      <div className="flex justify-center gap-1.5">
        <div className="w-2 h-2 bg-tyYellow rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-tyYellow rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
        <div className="w-2 h-2 bg-tyYellow rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
      </div>
    </div>
  </div>
);

export default function App() {
  const [view, setView] = useState<ViewState>('LANDING');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentResume, setCurrentResume] = useState<ResumeData>(INITIAL_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingRedirect, setPendingRedirect] = useState<ViewState | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('ty_theme') as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('ty_theme', theme);
  }, [theme]);

  useEffect(() => {
    const sessionUserStr = sessionStorage.getItem('ty_session_user');
    if (sessionUserStr) {
      const sessionUser = JSON.parse(sessionUserStr);
      refreshUser(sessionUser);
    }
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const refreshUser = async (user: User) => {
    setIsLoading(true);
    const updatedUser = await StorageService.syncUserData(user);
    if (updatedUser) {
       setCurrentUser(updatedUser);
       sessionStorage.setItem('ty_session_user', JSON.stringify(updatedUser));
       if (view === 'LANDING') setView('DASHBOARD');
    }
    setTimeout(() => setIsLoading(false), 350);
  }

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    sessionStorage.setItem('ty_session_user', JSON.stringify(user));
    if (pendingRedirect) {
      setView(pendingRedirect);
      setPendingRedirect(null);
    } else {
      setView('DASHBOARD');
    }
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

  const handleGoToAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setView('AUTH');
  };

  if (isLoading) {
     return <MinimalLoading />;
  }

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm py-4 px-6 sticky top-0 z-50 no-print border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
           <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setView(currentUser ? 'DASHBOARD' : 'LANDING')}>
             <Logo />
             <div className="leading-none">
               <span className="block text-xl font-heading font-black text-tyGrey dark:text-white uppercase tracking-tighter group-hover:text-tyYellow transition-colors">Tramites y</span>
               <span className="block text-[10px] font-heading font-black text-tyYellow tracking-[0.25em] uppercase">Servicios</span>
             </div>
           </div>
           
           <div className="flex items-center gap-6">
             <button 
               onClick={toggleTheme}
               title="Cambiar Tema"
               className="relative p-2 rounded-xl overflow-hidden transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 group focus:outline-none"
             >
                <div className={`relative z-10 transition-transform duration-500 transform ${theme === 'dark' ? 'rotate-180 scale-110' : 'rotate-0'}`}>
                   {theme === 'light' ? <Sun className="text-amber-500" size={20} /> : <Moon className="text-indigo-400" size={20} fill="currentColor" />}
                </div>
             </button>

             {currentUser ? (
               <div className="flex items-center gap-4 border-l pl-6 dark:border-gray-800">
                  <div className="hidden md:block text-right">
                    <p className="text-[10px] font-black uppercase text-gray-400 leading-none mb-1">Usuario Activo</p>
                    <p className="text-xs font-bold text-tyGrey dark:text-white">{currentUser.username}</p>
                  </div>
                  <button onClick={handleLogout} className="text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-600 transition p-2 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg">Salir</button>
               </div>
             ) : (
               <div className="flex items-center gap-3">
                  <button onClick={() => handleGoToAuth('login')} className="text-[10px] font-black uppercase tracking-widest text-tyGrey dark:text-white hover:text-tyYellow transition">Iniciar Sesión</button>
                  <button onClick={() => handleGoToAuth('register')} className="bg-tyYellow text-tyGrey px-4 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest hover:scale-105 transition">Registro</button>
               </div>
             )}
           </div>
        </div>
      </nav>

      <main className="flex-grow">
        {view === 'LANDING' && <LandingPage onStart={() => handleGoToAuth('register')} onLogin={() => handleGoToAuth('login')} />}
        {view === 'AUTH' && <Auth onLoginSuccess={handleLoginSuccess} onCancel={() => setView('LANDING')} initialMode={authMode} />}
        {view === 'DASHBOARD' && currentUser && (
          <Dashboard 
             user={currentUser}
             onNewResume={handleNewResume}
             onEditResume={handleEditResumeFromDashboard}
             onDeleteResume={handleDeleteResume}
             onLogout={handleLogout}
             onGoToLinks={() => setView('LINKS')}
             onGoToCertGen={() => setView('CERT_GEN')}
             onGoToTraining={() => setView('TRAINING')}
          />
        )}
        {view === 'LINKS' && <ExternalLinks onBack={() => setView('DASHBOARD')} />}
        {view === 'CERT_GEN' && <CertGenerator onBack={() => setView('DASHBOARD')} />}
        {view === 'TRAINING' && <TrainingCenter onBack={() => setView('DASHBOARD')} />}
        {view === 'FORM' && <ResumeForm initialData={currentResume} onComplete={handleFormComplete} onCancel={() => setView('DASHBOARD')} />}
        {view === 'PREVIEW' && <ResumePreview data={currentResume} onEdit={() => setView('FORM')} onExit={() => setView('DASHBOARD')} />}
      </main>

      {view !== 'PREVIEW' && view !== 'CERT_GEN' && view !== 'TRAINING' && <Footer onGoToTraining={() => setView('TRAINING')} />}
    </div>
  );
}
