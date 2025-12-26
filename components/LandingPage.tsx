
import React from 'react';
import { FileText, MapPin, CheckCircle, ChevronRight, PenTool, UserCircle, Sparkles, ShieldCheck, Zap, ArrowUpRight, Globe, Star } from 'lucide-react';

interface Props {
  onStart: () => void;
  onLogin: () => void;
}

export const LandingPage: React.FC<Props> = ({ onStart, onLogin }) => {
  return (
    <div className="bg-tyGrey text-white selection:bg-tyYellow selection:text-tyGrey">
      {/* Dynamic Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden mesh-gradient">
        {/* Floating Background Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            <div className="absolute top-1/4 left-1/4 animate-float blur-sm"><FileText size={120} className="text-tyYellow" /></div>
            <div className="absolute bottom-1/4 right-1/4 animate-float blur-md" style={{ animationDelay: '2s' }}><Zap size={180} className="text-white" /></div>
            <div className="absolute top-1/2 right-1/3 animate-pulse-slow"><Star size={60} className="text-tyYellow" /></div>
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full border border-white/10 text-sm font-semibold tracking-wide">
                <span className="flex h-2 w-2 rounded-full bg-tyYellow animate-ping"></span>
                <span className="text-tyYellow">Impulsa tu carrera hoy</span>
              </div>
              
              <h1 className="text-5xl md:text-8xl font-black leading-tight tracking-tighter">
                Diseña tu futuro <br/>
                <span className="text-gradient">profesional.</span>
              </h1>
              
              <p className="text-xl text-gray-400 max-w-2xl font-medium leading-relaxed">
                La plataforma inteligente para <span className="text-white">Barrancabermeja</span>. Crea, gestiona y descarga documentos laborales con estándares internacionales en segundos.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-4">
                <button 
                  onClick={onLogin}
                  className="w-full sm:w-auto bg-tyYellow text-tyGrey font-black text-lg px-10 py-5 rounded-2xl shadow-[0_20px_50px_rgba(255,193,35,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 group"
                >
                  <UserCircle size={24} /> 
                  Empezar ahora
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center gap-4 text-sm font-bold text-gray-400">
                    <div className="flex -space-x-3">
                        {[1,2,3,4].map(i => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-tyGrey bg-slate-800 flex items-center justify-center overflow-hidden">
                                <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                            </div>
                        ))}
                    </div>
                    <p>+2.5k usuarios activos</p>
                </div>
              </div>
            </div>
            
            <div className="flex-1 relative lg:block hidden">
                <div className="absolute -inset-10 bg-tyYellow/20 blur-[120px] rounded-full"></div>
                <div className="relative z-10 transform hover:rotate-2 transition-transform duration-700">
                    <div className="glass p-4 rounded-[2.5rem] border border-white/10 shadow-2xl">
                        <div className="bg-white rounded-[2rem] p-8 space-y-6 text-tyGrey">
                            <div className="flex items-center justify-between">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>
                                <div className="px-3 py-1 bg-tyGrey text-white rounded-full text-[10px] font-black uppercase tracking-widest">Premium Template</div>
                            </div>
                            <div className="flex gap-6 items-center">
                                <div className="w-24 h-24 bg-slate-100 rounded-2xl flex items-center justify-center"><UserCircle size={48} className="text-slate-300" /></div>
                                <div className="space-y-2 flex-1">
                                    <div className="h-4 w-3/4 bg-slate-200 rounded"></div>
                                    <div className="h-3 w-1/2 bg-slate-100 rounded"></div>
                                </div>
                            </div>
                            <div className="space-y-4 pt-4">
                                <div className="h-2 w-full bg-slate-50 rounded"></div>
                                <div className="h-2 w-full bg-slate-50 rounded"></div>
                                <div className="h-2 w-5/6 bg-slate-50 rounded"></div>
                                <div className="grid grid-cols-2 gap-4 mt-8">
                                    <div className="h-24 bg-tyYellow/10 rounded-2xl border-2 border-dashed border-tyYellow/30 flex items-center justify-center flex-col gap-2">
                                        <ShieldCheck size={24} className="text-tyYellow" />
                                        <span className="text-[10px] font-black uppercase">Verificado</span>
                                    </div>
                                    <div className="h-24 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center flex-col gap-2">
                                        <Zap size={24} className="text-slate-300" />
                                        <span className="text-[10px] font-black uppercase opacity-20">Soporte</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid "Bento Style" */}
      <section className="py-32 bg-slate-950 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-24 space-y-4">
                <h2 className="text-sm font-black text-tyYellow uppercase tracking-[0.4em]">Nuestro Ecosistema</h2>
                <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Todo lo que necesitas para <br/> tu próxima gran oportunidad.</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full md:h-[600px]">
                {/* CV Card */}
                <div className="md:col-span-8 glass rounded-[3rem] p-12 flex flex-col justify-between group hover:border-tyYellow/50 transition-all cursor-pointer overflow-hidden relative">
                    <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-tyYellow/20 blur-[80px] rounded-full group-hover:bg-tyYellow/40 transition-all"></div>
                    <div className="space-y-4 relative z-10">
                        <div className="bg-tyYellow text-tyGrey w-14 h-14 rounded-2xl flex items-center justify-center"><FileText size={32} /></div>
                        <h4 className="text-4xl font-black">Hojas de Vida Inteligentes</h4>
                        <p className="text-gray-400 max-w-md text-lg">Más de 5 plantillas exclusivas estilo Canva diseñadas para captar la atención de reclutadores en milisegundos.</p>
                    </div>
                    <div className="flex items-center gap-4 pt-8">
                        <span className="text-tyYellow font-black uppercase text-sm tracking-widest">Explorar plantillas</span>
                        <ArrowUpRight className="text-tyYellow" />
                    </div>
                </div>

                {/* Cert Card */}
                <div className="md:col-span-4 bg-tyYellow rounded-[3rem] p-12 flex flex-col justify-between text-tyGrey group hover:scale-[1.02] transition-transform cursor-pointer">
                    <div className="space-y-4">
                        <div className="bg-tyGrey text-white w-14 h-14 rounded-2xl flex items-center justify-center"><PenTool size={32} /></div>
                        <h4 className="text-3xl font-black leading-none">Generador de Soportes</h4>
                    </div>
                    <p className="font-bold text-tyGrey/60">Cartas de recomendación, certificaciones y renuncias automáticas.</p>
                    <div className="flex justify-end"><ArrowUpRight size={32} /></div>
                </div>

                {/* Stats Card */}
                <div className="md:col-span-5 glass rounded-[3rem] p-10 flex items-center gap-8 group">
                    <div className="text-5xl font-black text-tyYellow group-hover:scale-110 transition-transform tracking-tighter">98%</div>
                    <div className="space-y-1">
                        <p className="text-white font-bold">Índice de Aceptación</p>
                        <p className="text-sm text-gray-500 font-medium">Documentos bajo normativa técnica.</p>
                    </div>
                </div>

                {/* Links Card */}
                <div className="md:col-span-7 bg-white rounded-[3rem] p-10 flex items-center justify-between text-tyGrey group cursor-pointer hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-6">
                        <div className="bg-slate-100 p-4 rounded-2xl"><Globe size={32} /></div>
                        <div>
                            <p className="text-xl font-black">Central de Trámites</p>
                            <p className="text-sm font-medium text-slate-400">Policía, Procuraduría y EPS en un clic.</p>
                        </div>
                    </div>
                    <ArrowUpRight size={24} className="opacity-0 group-hover:opacity-100 transition-all" />
                </div>
            </div>
        </div>
      </section>

      {/* City Section - Artistic */}
      <section className="py-32 bg-white text-tyGrey relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex flex-col lg:flex-row items-center gap-20">
                <div className="flex-1 space-y-8 order-2 lg:order-1">
                    <div className="w-12 h-1.5 bg-tyYellow mb-10"></div>
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-tyGrey">
                        Potencia el <br/> talento del <br/> <span className="text-tyYellow">Puerto.</span>
                    </h2>
                    <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-lg">
                        Barrancabermeja es una ciudad de oportunidades. Nuestra misión es que ningún perfil talentoso se pierda por una mala presentación documental.
                    </p>
                    <div className="flex gap-10 pt-6">
                        <div>
                            <p className="text-4xl font-black text-tyGrey leading-none">Distrito</p>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">Especial</p>
                        </div>
                        <div className="w-px h-16 bg-slate-100"></div>
                        <div>
                            <p className="text-4xl font-black text-tyGrey leading-none">100%</p>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">Barranqueño</p>
                        </div>
                    </div>
                </div>
                
                <div className="flex-1 order-1 lg:order-2">
                    <div className="relative">
                        <div className="absolute -inset-4 bg-tyYellow rounded-[4rem] rotate-3 opacity-10"></div>
                        <div className="relative rounded-[3rem] overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-700">
                             <img src="https://img.lalr.co/cms/2023/10/18143930/Barrancabermeja.jpg?size=xl" alt="Barrancabermeja" className="w-full h-[600px] object-cover scale-110 hover:scale-100 transition-transform duration-[2s]" />
                             <div className="absolute inset-0 bg-gradient-to-t from-tyGrey/80 to-transparent flex items-end p-12">
                                <div className="text-white">
                                    <p className="text-sm font-black uppercase tracking-[0.5em] mb-2 opacity-60">Barrancabermeja</p>
                                    <p className="text-4xl font-black">Santander, Colombia</p>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Trust Footer CTA */}
      <section className="py-24 bg-tyYellow text-tyGrey text-center">
        <div className="container mx-auto px-6 max-w-4xl space-y-10">
            <h4 className="text-4xl md:text-6xl font-black tracking-tighter">¿Listo para dar el siguiente paso en tu carrera?</h4>
            <button 
                onClick={onLogin}
                className="bg-tyGrey text-white px-12 py-6 rounded-3xl font-black text-xl hover:bg-black transition-all shadow-2xl flex items-center gap-4 mx-auto group"
            >
                Empezar Gratuitamente 
                <Zap size={24} className="fill-tyYellow text-tyYellow group-hover:scale-125 transition-transform" />
            </button>
            <p className="text-sm font-bold opacity-40 uppercase tracking-widest">No se requiere tarjeta de crédito</p>
        </div>
      </section>
    </div>
  );
};
