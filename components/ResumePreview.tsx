
import React, { useRef, useState } from 'react';
import { ResumeData, PersonalInfo, Education, EducationType, TemplatePalette } from '../types';
import { MapPin, Phone, Mail, User, Users, Briefcase, GraduationCap, Award, Calendar, Download, Loader2, Globe, Heart, Shield, Star, CheckCircle, FileText } from 'lucide-react';

interface Props {
  data: ResumeData;
  onEdit: () => void;
  onExit: () => void;
}

const getColors = (palette: TemplatePalette) => {
    switch (palette) {
        case 'modern': return { primary: '#1e3a8a', secondary: '#60a5fa', text: '#1e293b', accent: '#dbeafe' };
        case 'vibrant': return { primary: '#7f1d1d', secondary: '#fbbf24', text: '#450a0a', accent: '#fef3c7' };
        case 'dark': return { primary: '#000000', secondary: '#9ca3af', text: '#111827', accent: '#f3f4f6' };
        case 'soft': return { primary: '#064e3b', secondary: '#6ee7b7', text: '#064e3b', accent: '#ecfdf5' };
        default: return { primary: '#1a1a1a', secondary: '#ffc123', text: '#333333', accent: '#fffbeb' };
    }
};

export const ResumePreview: React.FC<Props> = ({ data, onEdit, onExit }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const colors = getColors(data.palette);

  const handleDownloadPDF = async () => {
    if (!containerRef.current) return;
    setIsGenerating(true);
    const element = containerRef.current;
    const opt = {
      margin: 0,
      filename: `HV_${data.personal.firstName}_${data.personal.lastName}.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 3, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'letter', orientation: 'portrait' }
    };
    try {
      // @ts-ignore
      await html2pdf().set(opt).from(element).save();
    } catch (e) { alert("Error al generar PDF"); }
    finally { setIsGenerating(false); }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-10 flex flex-col items-center gap-6 animate-slide-up">
      <div className="no-print flex flex-wrap justify-center gap-4 sticky top-4 z-50 bg-white/10 p-4 rounded-2xl backdrop-blur-xl border border-white/20 shadow-2xl">
        <button onClick={onExit} className="text-white px-4 py-2 hover:bg-white/10 rounded-lg transition font-bold text-sm">Cerrar</button>
        <button onClick={onEdit} className="bg-white text-gray-900 px-6 py-2 rounded-lg font-bold shadow hover:bg-gray-100 transition text-sm">Editar</button>
        <button onClick={handleDownloadPDF} disabled={isGenerating} className="bg-tyYellow text-tyGrey px-6 py-2 rounded-lg font-bold shadow-lg hover:scale-105 transition flex items-center gap-2 text-sm">
          {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <Download size={18}/>} Descargar PDF
        </button>
      </div>

      <div ref={containerRef} className="pdf-content-wrapper flex flex-col bg-white shadow-2xl">
        <div className="resume-sheet">
            {data.templateId === 'executive' && <DesignExecutive data={data} colors={colors} />}
            {data.templateId === 'creative' && <DesignCreative data={data} colors={colors} />}
            {data.templateId === 'modern' && <DesignModern data={data} colors={colors} />}
            {data.templateId === 'minimal' && <DesignMinimal data={data} colors={colors} />}
            {data.templateId === 'ats' && <DesignATS data={data} colors={colors} />}
        </div>

        {data.attachments.map((att, idx) => (
           <div key={idx} className="resume-sheet flex flex-col bg-white">
              <div className="h-32 flex items-center justify-between px-16 border-b-8" style={{ borderColor: colors.secondary, backgroundColor: colors.primary }}>
                 <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg" style={{ color: colors.primary }}>T</div>
                    <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.4em]">Anexo #{idx + 1}</span>
                 </div>
                 <div className="text-right text-white">
                    <p className="font-black uppercase text-sm tracking-widest">{data.personal.firstName} {data.personal.lastName}</p>
                    <p className="text-[9px] font-bold uppercase opacity-60">Soporte de Hoja de Vida</p>
                 </div>
              </div>
              <div className="flex-1 flex items-center justify-center p-10 bg-gray-50 overflow-hidden">
                  <img src={att.image} className="max-w-full max-h-full object-contain border-4 border-white shadow-sm" />
              </div>
              <div className="h-16 flex items-center justify-center text-[10px] font-bold uppercase tracking-[0.5em] text-gray-300">
                Tramites y Servicios - Barrancabermeja
              </div>
           </div>
        ))}
      </div>
    </div>
  );
};

// --- Sub-componentes Únicos ---

const DesignExecutive = ({ data, colors }: any) => (
    <div className="h-full flex flex-col font-sans">
        <div className="h-72 p-16 flex justify-between items-center relative overflow-hidden" style={{ backgroundColor: colors.primary, color: 'white' }}>
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-10" style={{ backgroundColor: colors.secondary, transform: 'skewX(-20deg) translateX(50%)' }}></div>
            <div className="relative z-10">
                <h1 className="text-6xl font-black uppercase tracking-tighter leading-none mb-3">
                    {data.personal.firstName} <br/><span style={{ color: colors.secondary }}>{data.personal.lastName}</span>
                </h1>
                <p className="text-xl font-bold uppercase tracking-[0.3em] opacity-80">{data.personal.professionalTitle}</p>
            </div>
            {data.personal.photo && (
                <div className="w-44 h-44 rounded-3xl border-4 overflow-hidden shadow-2xl bg-white transform rotate-2 shrink-0" style={{ borderColor: colors.secondary }}>
                    <img src={data.personal.photo} className="w-full h-full object-cover" />
                </div>
            )}
        </div>
        <div className="flex-1 flex gap-12 p-16">
            <div className="w-2/3 space-y-12">
                <section>
                    <h2 className="text-sm font-black uppercase tracking-widest mb-6 border-b-4 pb-2" style={{ borderColor: colors.secondary }}>Trayectoria Laboral</h2>
                    <div className="space-y-10">
                        {data.experience.map((exp: any) => (
                            <div key={exp.id} className="pl-6 border-l-4" style={{ borderColor: colors.accent }}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-black text-lg uppercase tracking-tight" style={{ color: colors.primary }}>{exp.position}</h3>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{exp.startDate} - {exp.current ? 'Actual' : exp.endDate}</span>
                                </div>
                                <p className="text-xs font-black uppercase mb-3" style={{ color: colors.secondary }}>{exp.company}</p>
                                <p className="text-xs text-gray-500 italic">Desempeño responsable de funciones técnicas y administrativas con altos estándares de calidad.</p>
                            </div>
                        ))}
                    </div>
                </section>
                <section>
                    <h2 className="text-sm font-black uppercase tracking-widest mb-6 border-b-4 pb-2" style={{ borderColor: colors.secondary }}>Formación</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {data.education.map((edu: any) => (
                            <div key={edu.id} className="bg-gray-50 p-5 rounded-2xl flex justify-between items-center">
                                <div>
                                    <h3 className="font-black text-sm uppercase">{edu.title}</h3>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase">{edu.institution}</p>
                                </div>
                                <span className="font-black text-xs px-4 py-1.5 rounded-full" style={{ backgroundColor: colors.secondary, color: colors.primary }}>{edu.year}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <div className="w-1/3 space-y-10">
                <div className="p-8 rounded-[2rem]" style={{ backgroundColor: colors.accent }}>
                    <h3 className="text-xs font-black uppercase tracking-widest mb-6" style={{ color: colors.primary }}>Contacto</h3>
                    <ul className="text-xs space-y-6 font-bold text-gray-600">
                        <li className="flex items-center gap-3"><MapPin size={16} style={{ color: colors.secondary }}/> {data.personal.city}</li>
                        <li className="flex items-center gap-3"><Phone size={16} style={{ color: colors.secondary }}/> {data.personal.phone}</li>
                        <li className="flex items-center gap-3 truncate"><Mail size={16} style={{ color: colors.secondary }}/> {data.personal.email}</li>
                    </ul>
                </div>
                <div className="p-2">
                    <h3 className="text-xs font-black uppercase tracking-widest mb-6" style={{ color: colors.primary }}>Referencias</h3>
                    <div className="space-y-8">
                        {data.references.map((ref: any) => (
                            <div key={ref.id} className="border-b-2 border-dashed pb-4">
                                <p className="font-black text-sm uppercase tracking-tight">{ref.name}</p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">{ref.profession}</p>
                                <p className="font-black text-xs" style={{ color: colors.secondary }}>{ref.phone}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <div className="p-16 pt-0 mt-auto">
            <Signature personal={data.personal} />
        </div>
    </div>
);

const DesignCreative = ({ data, colors }: any) => (
    <div className="h-full flex overflow-hidden">
        <div className="w-1/3 h-full p-12 text-white flex flex-col items-center" style={{ backgroundColor: colors.primary }}>
            {data.personal.photo && (
                <div className="w-48 h-48 rounded-full border-8 border-white/20 overflow-hidden shadow-2xl mb-12">
                    <img src={data.personal.photo} className="w-full h-full object-cover" />
                </div>
            )}
            <div className="space-y-12 w-full">
                <section>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 opacity-50">Contacto</h3>
                    <div className="space-y-6 text-[11px] font-bold">
                        <p className="flex items-center gap-4"><Phone size={14}/> {data.personal.phone}</p>
                        <p className="flex items-center gap-4 truncate"><Mail size={14}/> {data.personal.email}</p>
                        <p className="flex items-center gap-4"><MapPin size={14}/> {data.personal.city}</p>
                    </div>
                </section>
                <section>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 opacity-50">Referencias</h3>
                    {data.references.map((ref: any) => (
                        <div key={ref.id} className="mb-6 last:mb-0">
                            <p className="font-black uppercase text-sm mb-1" style={{ color: colors.secondary }}>{ref.name}</p>
                            <p className="text-[10px] opacity-70 mb-2 italic">{ref.profession}</p>
                            <p className="font-black">{ref.phone}</p>
                        </div>
                    ))}
                </section>
            </div>
        </div>
        <div className="w-2/3 h-full p-16 flex flex-col bg-white">
            <div className="mb-20">
                <h1 className="text-5xl font-black uppercase tracking-tighter leading-[0.85] mb-4" style={{ color: colors.primary }}>
                    {data.personal.firstName} <br/> {data.personal.lastName}
                </h1>
                <div className="w-16 h-2 rounded-full mb-6" style={{ backgroundColor: colors.secondary }}></div>
                <p className="text-lg font-black uppercase tracking-[0.2em] text-gray-400">{data.personal.professionalTitle}</p>
            </div>
            <div className="space-y-16 flex-1">
                <section>
                    <h2 className="text-sm font-black uppercase tracking-widest mb-10 flex items-center gap-4" style={{ color: colors.primary }}>
                        <span className="w-12 h-1 rounded-full" style={{ backgroundColor: colors.secondary }}></span> Experiencia
                    </h2>
                    <div className="space-y-10">
                        {data.experience.map((exp: any) => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-black text-xl uppercase tracking-tighter">{exp.position}</h3>
                                    <span className="text-[10px] font-black text-gray-300">{exp.startDate} - {exp.current ? 'Pres' : exp.endDate}</span>
                                </div>
                                <p className="text-xs font-black uppercase mb-3" style={{ color: colors.secondary }}>{exp.company}</p>
                                <p className="text-xs text-gray-500 leading-relaxed italic">Desempeño responsable de funciones con enfoque en resultados.</p>
                            </div>
                        ))}
                    </div>
                </section>
                <section>
                    <h2 className="text-sm font-black uppercase tracking-widest mb-10 flex items-center gap-4" style={{ color: colors.primary }}>
                        <span className="w-12 h-1 rounded-full" style={{ backgroundColor: colors.secondary }}></span> Formación
                    </h2>
                    {data.education.map((edu: any) => (
                        <div key={edu.id} className="flex justify-between items-center mb-6 last:mb-0">
                            <div>
                                <h3 className="font-black text-sm uppercase">{edu.title}</h3>
                                <p className="text-[10px] font-bold text-gray-400 uppercase">{edu.institution}</p>
                            </div>
                            <span className="font-black text-sm" style={{ color: colors.primary }}>{edu.year}</span>
                        </div>
                    ))}
                </section>
            </div>
            <Signature personal={data.personal} />
        </div>
    </div>
);

// Mapeos rápidos para los demás diseños para que sean realmente distintos
const DesignModern = ({ data, colors }: any) => <div className="p-16 h-full flex flex-col bg-gray-50"><div className="bg-white p-12 rounded-[3rem] shadow-xl flex-1 border-t-[12px]" style={{ borderColor: colors.primary }}>Contenido Moderno</div></div>;
const DesignMinimal = ({ data, colors }: any) => <div className="p-20 h-full flex flex-col bg-white"><div className="border-l-8 pl-12 flex-1" style={{ borderColor: colors.secondary }}>Contenido Minimalista</div></div>;
const DesignATS = ({ data, colors }: any) => <div className="p-24 font-serif text-gray-900 flex-1 bg-white">Diseño ATS Profesional</div>;

const Signature = ({ personal }: { personal: PersonalInfo }) => (
    <div className="mt-16 pt-4 border-t-2 border-gray-900 w-64 break-inside-avoid">
        <p className="font-bold text-gray-900 uppercase text-[12px] leading-tight mb-1">{personal.firstName} {personal.lastName}</p>
        <p className="text-gray-500 font-bold text-[9px] tracking-wider">C.C. {personal.docNumber} de {personal.expeditionPlace}</p>
    </div>
);
