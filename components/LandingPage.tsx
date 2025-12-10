import React from 'react';
import { FileText, MapPin, CheckCircle, ChevronRight, PenTool, UserCircle } from 'lucide-react';

interface Props {
  onStart: () => void;
  onLogin: () => void;
}

export const LandingPage: React.FC<Props> = ({ onStart, onLogin }) => {
  return (
    <div className="animate-slide-up">
      {/* Hero Section */}
      <div className="relative bg-tyGrey text-white py-24 px-4 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
        </div>

        <div className="container mx-auto max-w-5xl relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 bg-tyYellow text-tyGrey px-3 py-1 rounded-full text-sm font-bold animate-pulse">
              <MapPin size={16} /> Barrancabermeja, Santander
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold leading-tight">
              Tramites y Servicios <span className="text-tyYellow">Oficiales</span>
            </h1>
            <p className="text-lg text-gray-300">
              La plataforma ideal para crear tu hoja de vida profesional. Diseños modernos, guardado automático y optimizados para el empleo en Barrancabermeja.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onLogin}
                className="bg-white text-tyGrey font-bold text-lg px-8 py-4 rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <UserCircle size={20} /> Iniciar Sesión / Registro
              </button>
            </div>
            <p className="text-sm text-gray-400 italic mt-2">* Crea una cuenta para guardar y editar tus documentos más tarde.</p>
          </div>
          
          <div className="flex-1 flex justify-center animate-float">
             <div className="relative w-80 h-96 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4 transform rotate-3 shadow-2xl">
                <div className="w-full h-full bg-white rounded flex flex-col p-4 relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-20 h-20 bg-tyYellow rounded-bl-full z-0 opacity-20"></div>
                   <div className="w-20 h-20 bg-gray-200 rounded-full mb-4 z-10 border-4 border-white shadow"></div>
                   <div className="w-3/4 h-4 bg-gray-800 rounded mb-2 z-10"></div>
                   <div className="w-1/2 h-3 bg-tyYellow rounded mb-6 z-10"></div>
                   <div className="space-y-2 z-10">
                      <div className="w-full h-2 bg-gray-100 rounded"></div>
                      <div className="w-full h-2 bg-gray-100 rounded"></div>
                      <div className="w-full h-2 bg-gray-100 rounded"></div>
                      <div className="w-full h-2 bg-gray-100 rounded"></div>
                   </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-tyYellow rounded-full flex items-center justify-center text-tyGrey font-bold text-xs shadow-lg animate-bounce">
                  PDF
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-white">
         <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-heading font-bold text-tyGrey mb-12">¿Por qué usar <span className="text-tyYellow">Tramites y Servicios</span>?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <FeatureCard 
                 icon={<FileText size={40} className="text-tyYellow"/>}
                 title="Diseños Exclusivos"
                 desc="Plantillas profesionales con opción de fotografía. Estilos masculinos ejecutivos y femeninos elegantes."
               />
               <FeatureCard 
                 icon={<UserCircle size={40} className="text-tyYellow"/>}
                 title="Perfil Digital"
                 desc="Crea tu cuenta, guarda tus datos y edita tu hoja de vida cuando la necesites sin empezar de cero."
               />
               <FeatureCard 
                 icon={<CheckCircle size={40} className="text-tyYellow"/>}
                 title="Fácil y Rápido"
                 desc="Formulario intuitivo paso a paso. Genera tu PDF listo para imprimir en minutos."
               />
            </div>
         </div>
      </section>

      {/* City Info Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
           <div className="flex-1">
             <img src="https://img.lalr.co/cms/2023/10/18143930/Barrancabermeja.jpg?size=xl" alt="Barrancabermeja Paisaje" className="rounded-lg shadow-xl grayscale hover:grayscale-0 transition duration-500" />
           </div>
           <div className="flex-1 space-y-4">
              <h3 className="text-sm font-bold text-tyYellow uppercase tracking-wider">Nuestra Ciudad</h3>
              <h2 className="text-3xl font-heading font-bold text-tyGrey">Barrancabermeja: Corazón Energético</h2>
              <p className="text-gray-600">
                Tramites y Servicios es una iniciativa para fortalecer la empleabilidad en el Puerto Petrolero. 
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-tyYellow rounded-full"></div> Capital Petrolera de Colombia</li>
                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-tyYellow rounded-full"></div> Centro logístico del Río Magdalena</li>
                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-tyYellow rounded-full"></div> Talento calificado</li>
              </ul>
           </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard: React.FC<{icon: React.ReactNode, title: string, desc: string}> = ({ icon, title, desc }) => (
  <div className="p-8 bg-white border border-gray-100 shadow-lg rounded-xl hover:-translate-y-2 transition-transform duration-300 group hover:border-tyYellow">
    <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform">{icon}</div>
    <h3 className="text-xl font-bold text-tyGrey mb-2">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </div>
);