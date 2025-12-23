import React from 'react';
import { FileText, MapPin, CheckCircle, ChevronRight, PenTool, UserCircle } from 'lucide-react';

interface Props {
  onStart: () => void;
  onLogin: () => void;
}

export const LandingPage: React.FC<Props> = ({ onStart, onLogin }) => {
  return (
    <div className="animate-slide-up bg-gray-100">
      {/* Hero Section */}
      <div className="relative bg-[#222222] text-white py-24 px-4 overflow-hidden border-b-8 border-tyYellow">
        {/* Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 bg-white text-tyGrey px-4 py-2 rounded-full text-sm font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)] animate-pulse">
              <span className="w-2 h-2 bg-tyYellow rounded-full"></span> ¡Gestión Documental al Día!
            </div>
            
            <h1 className="text-4xl md:text-6xl font-heading font-bold leading-tight text-gray-100">
              Trámites y Servicios <br/>
              <span className="text-tyYellow relative inline-block">
                Barrancabermeja
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-tyYellow opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 font-light max-w-lg">
              Plataforma oficial para la creación de hojas de vida, cartas laborales y gestión de soportes profesionales en el Distrito.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={onLogin}
                className="bg-tyYellow text-tyGrey font-bold text-lg px-8 py-4 rounded-lg shadow-lg hover:bg-yellow-400 hover:shadow-yellow-400/20 transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-1"
              >
                <UserCircle size={22} /> Ingresar al Portal
              </button>
            </div>
          </div>
          
          <div className="flex-1 flex justify-center animate-float">
             <div className="relative w-80 h-[450px] bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl border border-gray-600 p-6 transform rotate-3 shadow-2xl flex flex-col">
                {/* Mockup UI */}
                <div className="flex items-center gap-2 mb-6 border-b border-gray-600 pb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                
                <div className="flex-1 bg-white rounded-lg p-4 relative overflow-hidden shadow-inner">
                   <div className="flex gap-3 mb-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                      <div className="flex-1 space-y-2 py-2">
                          <div className="w-3/4 h-3 bg-tyGrey rounded"></div>
                          <div className="w-1/2 h-2 bg-gray-300 rounded"></div>
                      </div>
                   </div>
                   <div className="space-y-3">
                      <div className="h-2 w-full bg-gray-100 rounded"></div>
                      <div className="h-2 w-full bg-gray-100 rounded"></div>
                      <div className="h-2 w-5/6 bg-gray-100 rounded"></div>
                      <div className="h-20 w-full bg-blue-50 border border-blue-100 rounded mt-4"></div>
                      <div className="h-20 w-full bg-yellow-50 border border-yellow-100 rounded mt-2"></div>
                   </div>
                   
                   {/* Floating Elements */}
                   <div className="absolute bottom-4 right-4 bg-tyYellow text-tyGrey text-xs font-bold px-3 py-1 rounded shadow">
                      100% Editable
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-gray-100">
         <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-heading font-bold text-tyGrey mb-12">Herramientas Profesionales</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <FeatureCard 
                 icon={<FileText size={40} className="text-tyYellow"/>}
                 title="Hojas de Vida"
                 desc="Plantillas modernas, ejecutivas y minimalistas. Elige el diseño que mejor se adapte a tu perfil laboral."
               />
               <FeatureCard 
                 icon={<PenTool size={40} className="text-tyYellow"/>}
                 title="Generador Documental"
                 desc="Crea cartas de recomendación, certificaciones laborales y cartas de renuncia en segundos."
               />
               <FeatureCard 
                 icon={<CheckCircle size={40} className="text-tyYellow"/>}
                 title="Soportes en Orden"
                 desc="Organiza tus certificados, diplomas y antecedentes en un solo archivo PDF listo para enviar."
               />
            </div>
         </div>
      </section>

      {/* City Info Section */}
      <section className="py-20 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
           <div className="flex-1 relative">
             <div className="absolute -inset-4 bg-tyYellow/20 rounded-lg transform -rotate-2"></div>
             <img src="https://img.lalr.co/cms/2023/10/18143930/Barrancabermeja.jpg?size=xl" alt="Barrancabermeja Paisaje" className="relative rounded-lg shadow-xl grayscale hover:grayscale-0 transition duration-500 z-10" />
           </div>
           <div className="flex-1 space-y-6">
              <h3 className="text-sm font-bold text-tyYellow uppercase tracking-wider">Gestión Local</h3>
              <h2 className="text-4xl font-heading font-bold text-tyGrey">Barrancabermeja <br/><span className="text-gray-400">Distrito Especial</span></h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Facilitamos los procesos de contratación en el Puerto Petrolero. Nuestra plataforma asegura que tu hoja de vida cumpla con los estándares de presentación requeridos por las empresas de la región.
              </p>
              <ul className="space-y-3 text-gray-700 mt-4">
                <li className="flex items-center gap-3"><div className="w-2 h-2 bg-tyGrey rounded-full"></div> Formatos estandarizados</li>
                <li className="flex items-center gap-3"><div className="w-2 h-2 bg-tyGrey rounded-full"></div> Descarga rápida de antecedentes</li>
                <li className="flex items-center gap-3"><div className="w-2 h-2 bg-tyGrey rounded-full"></div> Generación de renuncias y referencias</li>
              </ul>
           </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard: React.FC<{icon: React.ReactNode, title: string, desc: string}> = ({ icon, title, desc }) => (
  <div className="p-8 bg-white border border-gray-200 shadow-sm rounded-xl hover:-translate-y-2 transition-transform duration-300 group hover:border-tyYellow hover:shadow-xl">
    <div className="mb-6 flex justify-center group-hover:scale-110 transition-transform bg-gray-50 w-20 h-20 mx-auto rounded-full items-center border border-gray-100">{icon}</div>
    <h3 className="text-xl font-bold text-tyGrey mb-3">{title}</h3>
    <p className="text-gray-500 leading-relaxed">{desc}</p>
  </div>
);
