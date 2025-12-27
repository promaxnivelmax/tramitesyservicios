
import React, { useState } from 'react';
import { MapPin, ChevronRight, Star, Sparkles, Send, Phone, Mail, Building2, MousePointer2, Zap, Layout, FileText, Globe, LogIn, UserPlus } from 'lucide-react';

interface Props {
  onStart: () => void;
  onLogin: () => void;
}

export const LandingPage: React.FC<Props> = ({ onStart, onLogin }) => {
  const [contactForm, setContactForm] = useState({ name: '', phone: '', message: '' });

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hola, mi nombre es ${contactForm.name}. Mi WhatsApp es ${contactForm.phone}. Tengo la siguiente duda: ${contactForm.message}`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/573052319414?text=${encoded}`, '_blank');
  };

  return (
    <div className="bg-white text-slate-900 selection:bg-tyYellow selection:text-tyGrey font-sans">
      {/* Dynamic Hero Section */}
      <section className="relative min-h-[95vh] flex items-center pt-20 overflow-hidden bg-[#0f172a]">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-tyYellow rounded-full blur-[180px] -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/4"></div>
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full text-xs font-black text-tyYellow shadow-xl backdrop-blur-md uppercase tracking-[0.3em] animate-pulse">
                <Zap size={14} /> El Puerto Petrolero te espera
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black leading-[0.95] tracking-tighter text-white">
                Impulsa tu <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-tyYellow via-amber-400 to-yellow-200 uppercase">Carrera.</span>
              </h1>
              
              <p className="text-xl text-slate-400 max-w-xl font-medium leading-relaxed">
                Herramientas digitales diseñadas para que el talento de <span className="text-white font-black underline decoration-tyYellow decoration-4 underline-offset-4">Barrancabermeja</span> sea el primero en ser contratado. Rápido, profesional y local.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-6">
                <button 
                  onClick={onStart}
                  className="w-full sm:w-auto bg-tyYellow text-tyGrey font-black text-xl px-12 py-6 rounded-3xl shadow-[0_0_30px_rgba(255,193,35,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-4 group"
                >
                  <UserPlus size={24} /> Registrarme Ahora
                  <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </button>
                <button 
                  onClick={onLogin}
                  className="w-full sm:w-auto bg-white/5 border border-white/10 text-white font-black text-xl px-12 py-6 rounded-3xl hover:bg-white/10 active:scale-95 transition-all duration-300 flex items-center justify-center gap-4"
                >
                  <LogIn size={24} /> Iniciar Sesión
                </button>
              </div>
            </div>
            
            {/* Service Showcase Visual */}
            <div className="flex-1 relative lg:block hidden h-[600px]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-tyYellow/10 rounded-full blur-3xl"></div>
                
                <div className="absolute top-10 right-10 w-64 p-6 bg-white rounded-3xl shadow-2xl animate-float border-b-8 border-tyYellow">
                    <FileText className="text-tyYellow mb-4" size={32} />
                    <h4 className="font-black text-tyGrey uppercase text-sm">Hojas de Vida</h4>
                    <p className="text-xs text-slate-400 font-bold">Formatos Premium para el Puerto</p>
                </div>

                <div className="absolute bottom-20 left-0 w-64 p-6 bg-slate-900 rounded-3xl shadow-2xl animate-float border-b-8 border-blue-500" style={{ animationDelay: '1s' }}>
                    <Globe className="text-blue-500 mb-4" size={32} />
                    <h4 className="font-black text-white uppercase text-sm">Certificados</h4>
                    <p className="text-xs text-slate-500 font-bold">Documentos oficiales al instante</p>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 p-6 bg-white rounded-3xl shadow-2xl animate-float border-b-8 border-green-500" style={{ animationDelay: '2s' }}>
                    <Layout className="text-green-500 mb-4" size={32} />
                    <h4 className="font-black text-tyGrey uppercase text-sm">Cartas Pro</h4>
                    <p className="text-xs text-slate-400 font-bold">Referencias y Renuncias</p>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Features Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <div className="text-center mb-24 space-y-4">
                <h2 className="text-4xl md:text-6xl font-black text-tyGrey tracking-tighter uppercase">Servicio Digital <span className="text-tyYellow">100% Barranqueño</span></h2>
                <div className="w-24 h-2 bg-tyYellow mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <FeatureCard 
                    icon={<MousePointer2 size={32} />}
                    title="Control Total"
                    desc="Edita tus datos en cualquier momento. Tu perfil vive en la nube, siempre listo para el próximo empleo."
                    color="bg-tyYellow"
                />
                <FeatureCard 
                    icon={<Building2 size={32} />}
                    title="ADN Industrial"
                    desc="Nuestros formatos están pensados para el sector petrolero y comercial de la región. Directo al grano."
                    color="bg-blue-500 text-white"
                />
                <FeatureCard 
                    icon={<Sparkles size={32} />}
                    title="Calidad 4K"
                    desc="Descargas en PDF de alta resolución. Olvida los documentos borrosos o mal centrados."
                    color="bg-slate-900 text-white"
                />
            </div>
        </div>
      </section>

      {/* Where are we located? */}
      <section className="py-32 bg-slate-50">
        <div className="container mx-auto px-6 max-w-7xl">
            <h2 className="text-4xl font-black text-center mb-16 uppercase tracking-tighter">Nuestros Puntos de <span className="text-tyYellow">Atención</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <LocationCard 
                    title="Internet la 52"
                    address="Calle 52 # 18-34, La 52"
                    city="Barrancabermeja, Santander"
                    phone="+57 305 231 9414"
                />
                <LocationCard 
                    title="Sector Comercial (Laura)"
                    address="Calle 51 # 5-15, Sector Comercial"
                    city="Barrancabermeja, Santander"
                    phone="+57 305 224 5939"
                />
            </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
            <div className="bg-slate-900 rounded-[3rem] p-12 md:p-16 shadow-3xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-tyYellow rounded-bl-full opacity-10"></div>
                
                <h2 className="text-4xl font-black mb-4 text-center uppercase tracking-tighter">¿Tienes Dudas?</h2>
                <p className="text-slate-400 text-center mb-12 font-bold uppercase tracking-widest text-xs">Escríbenos y te atenderemos por WhatsApp</p>
                
                <form className="space-y-6" onSubmit={handleWhatsApp}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input 
                          required
                          placeholder="Nombre Completo" 
                          value={contactForm.name}
                          onChange={e => setContactForm({...contactForm, name: e.target.value})}
                          className="bg-white/5 border border-white/10 p-4 rounded-2xl w-full focus:ring-2 focus:ring-tyYellow focus:bg-white/10 transition outline-none text-white" 
                        />
                        <input 
                          required
                          placeholder="Tu número WhatsApp" 
                          value={contactForm.phone}
                          onChange={e => setContactForm({...contactForm, phone: e.target.value})}
                          className="bg-white/5 border border-white/10 p-4 rounded-2xl w-full focus:ring-2 focus:ring-tyYellow focus:bg-white/10 transition outline-none text-white" 
                        />
                    </div>
                    <textarea 
                      required
                      placeholder="Escribe aquí tu pregunta..." 
                      rows={4} 
                      value={contactForm.message}
                      onChange={e => setContactForm({...contactForm, message: e.target.value})}
                      className="bg-white/5 border border-white/10 p-4 rounded-2xl w-full focus:ring-2 focus:ring-tyYellow focus:bg-white/10 transition outline-none text-white"
                    ></textarea>
                    <button type="submit" className="w-full bg-tyYellow text-tyGrey py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-105 transition shadow-2xl">
                        Enviar Consulta <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc, color }: any) => (
    <div className="group p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-4">
        <div className={`w-16 h-16 ${color} rounded-3xl flex items-center justify-center mb-8 shadow-lg group-hover:rotate-12 transition-transform`}>
            {icon}
        </div>
        <h3 className="text-2xl font-black mb-4 text-tyGrey tracking-tight uppercase">{title}</h3>
        <p className="text-slate-500 font-medium leading-relaxed">{desc}</p>
    </div>
);

const LocationCard = ({ title, address, city, phone }: any) => (
    <div className="bg-white p-8 rounded-[2rem] border-l-8 border-tyYellow shadow-xl flex items-start gap-6 hover:scale-[1.02] transition">
        <div className="bg-yellow-50 p-4 rounded-2xl text-tyYellow">
            <MapPin size={32} />
        </div>
        <div>
            <h3 className="text-xl font-black mb-2 text-tyGrey">{title}</h3>
            <p className="text-slate-500 font-bold text-sm mb-1">{address}</p>
            <p className="text-slate-400 text-xs mb-4 uppercase font-black">{city}</p>
            <div className="flex items-center gap-2 text-tyYellow font-black text-sm">
                <Phone size={16} /> {phone}
            </div>
        </div>
    </div>
);
