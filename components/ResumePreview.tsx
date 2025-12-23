
import React, { useRef, useState } from 'react';
import { ResumeData, PersonalInfo, Education, EducationType } from '../types';
import { MapPin, Phone, Mail, User, Users, Briefcase, GraduationCap, Award, Calendar, Download, Loader2, Globe, Heart, Shield, Star, CheckCircle, FileText } from 'lucide-react';

interface Props {
  data: ResumeData;
  onEdit: () => void;
  onExit: () => void;
}

export const ResumePreview: React.FC<Props> = ({ data, onEdit, onExit }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const sortedExperience = [...data.experience].sort((a, b) => {
      const dateA = new Date(a.startDate).getTime();
      const dateB = new Date(b.startDate).getTime();
      return dateB - dateA;
  });

  const formalEducation = data.education.filter(e => 
    [EducationType.PRIMARIA, EducationType.SECUNDARIA, EducationType.TECNICO, EducationType.TECNOLOGICO, EducationType.UNIVERSITARIO, EducationType.ESPECIALISTA, EducationType.MAGISTER].includes(e.type)
  ).sort((a, b) => parseInt(b.year) - parseInt(a.year));

  const displayData: ResumeData = {
      ...data,
      experience: sortedExperience,
  };

  const handleDownloadPDF = async () => {
    if (!containerRef.current) return;
    setIsGenerating(true);

    const element = containerRef.current;
    
    const opt = {
      margin: 0,
      filename: `HV_${data.personal.firstName}_${data.personal.lastName}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2.5, 
        useCORS: true, 
        letterRendering: true,
        logging: false,
        backgroundColor: '#ffffff'
      },
      jsPDF: { unit: 'mm', format: 'letter', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'legacy'] }
    };

    try {
      // @ts-ignore
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("PDF Error:", error);
      alert("Error al generar el documento.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-10 flex flex-col items-center justify-center gap-6 animate-slide-up">
      <div className="no-print flex flex-wrap justify-center gap-4 sticky top-4 z-50 bg-white/10 p-4 rounded-2xl backdrop-blur-xl border border-white/20 shadow-2xl">
        <button onClick={onExit} className="text-white px-4 py-2 hover:bg-white/10 rounded-lg transition font-bold text-sm">Cerrar</button>
        <button onClick={onEdit} className="bg-white text-gray-900 px-6 py-2 rounded-lg font-bold shadow hover:bg-gray-100 transition text-sm">Editar Información</button>
        <button 
          onClick={handleDownloadPDF}
          disabled={isGenerating}
          className="bg-tyYellow text-tyGrey px-6 py-2 rounded-lg font-bold shadow-lg hover:scale-105 transition flex items-center gap-2 text-sm disabled:opacity-50"
        >
          {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <Download size={18}/>}
          {isGenerating ? 'Exportando...' : 'Descargar PDF'}
        </button>
      </div>

      <div ref={containerRef} className="pdf-content-wrapper flex flex-col gap-0 bg-white shadow-2xl">
        <div className="resume-sheet">
            {data.templateId === 'design-a' && <DesignExecutive data={displayData} formal={formalEducation} />}
            {data.templateId === 'design-red' && <DesignSidebarTemplate data={displayData} formal={formalEducation} color="#8B0000" accent="#FFD700" />}
            {data.templateId === 'design-green' && <DesignSidebarTemplate data={displayData} formal={formalEducation} color="#064e3b" accent="#10b981" />}
            {data.templateId === 'design-orange' && <DesignSidebarTemplate data={displayData} formal={formalEducation} color="#c2410c" accent="#fbbf24" />}
            {data.templateId === 'ats' && <DesignATS data={displayData} formal={formalEducation} />}
            {/* Fallback for old design IDs */}
            {!['design-a', 'design-red', 'design-green', 'design-orange', 'ats'].includes(data.templateId) && <DesignExecutive data={displayData} formal={formalEducation} />}
        </div>

        {data.attachments && data.attachments.map((att, index) => (
           <div key={index} className="resume-sheet flex flex-col bg-white">
              <div className="h-28 bg-gray-100 flex items-center justify-between px-16 border-b-4 border-tyYellow">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-tyGrey rounded-xl flex items-center justify-center font-black text-tyYellow text-xl shadow-lg">T</div>
                    <span className="text-xs font-black text-gray-500 uppercase tracking-[0.4em]">Soporte Oficial</span>
                 </div>
                 <div className="text-right">
                    <p className="font-bold text-tyGrey uppercase text-sm tracking-widest leading-none mb-1">{data.personal.firstName} {data.personal.lastName}</p>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Identificación: {data.personal.docNumber}</p>
                 </div>
              </div>
              <div className="flex-1 flex items-center justify-center p-16 bg-white overflow-hidden">
                  <img src={att.image} alt="Soporte" className="max-w-full max-h-[90%] object-contain shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)] border-2 border-gray-100 rounded-sm" />
              </div>
              <div className="h-20 flex items-center justify-center text-[10px] text-gray-300 font-bold uppercase tracking-[0.5em] border-t mx-16">
                Tramites y Servicios - Distrito de Barrancabermeja
              </div>
           </div>
        ))}
      </div>
    </div>
  );
};

// --- Signature Utility ---
const Signature = ({ personal }: { personal: PersonalInfo }) => (
    <div className="mt-20 pt-6 border-t-2 border-tyGrey w-80 break-inside-avoid">
        <p className="font-bold text-tyGrey uppercase text-[14px] leading-tight mb-1 tracking-tight">{personal.firstName} {personal.lastName}</p>
        <p className="text-gray-500 font-bold text-[11px] tracking-wider">C.C. {personal.docNumber} de {personal.expeditionPlace}</p>
        <div className="h-1 w-12 bg-tyYellow mt-4"></div>
    </div>
);

// --- Layout 1: Executive (Black & Yellow) ---
const DesignExecutive: React.FC<{data: ResumeData, formal: Education[]}> = ({ data, formal }) => (
    <div className="h-full flex flex-col bg-white font-sans text-gray-800">
        <div className="bg-[#1a1a1a] text-white p-16 flex justify-between items-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-full bg-tyYellow/5 -skew-x-12 translate-x-24"></div>
            <div className="relative z-10 flex-1">
                <h1 className="text-6xl font-black uppercase tracking-tighter leading-[0.85] mb-4">
                    {data.personal.firstName} <br/><span className="text-tyYellow">{data.personal.lastName}</span>
                </h1>
                <div className="flex items-center gap-4">
                    <div className="h-1 w-16 bg-tyYellow"></div>
                    <p className="text-xl text-gray-400 font-black uppercase tracking-[0.3em]">{data.personal.professionalTitle}</p>
                </div>
            </div>
            {data.personal.photo && (
                <div className="relative z-10 w-48 h-48 rounded-3xl border-4 border-tyYellow overflow-hidden shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] bg-white shrink-0 ml-12 transform rotate-1">
                    <img src={data.personal.photo} className="w-full h-full object-cover" />
                </div>
            )}
        </div>
        <div className="flex flex-1 p-16 gap-16 bg-white">
            <div className="w-2/3 space-y-16">
                {data.hasExperience && (
                    <section>
                        <h2 className="text-[14px] font-black uppercase tracking-[0.3em] mb-8 border-b-2 border-tyYellow pb-2 inline-block">Experiencia</h2>
                        <div className="space-y-12">
                            {data.experience.map((exp: any) => (
                                <div key={exp.id} className="break-inside-avoid relative pl-8 before:absolute before:left-0 before:top-1.5 before:w-3 before:h-3 before:bg-tyYellow before:rounded-full after:absolute after:left-[5px] after:top-6 after:w-[2px] after:h-[calc(100%-8px)] after:bg-gray-100">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="text-[16px] font-black text-tyGrey uppercase leading-none">{exp.position}</h3>
                                        <span className="text-[11px] font-black text-gray-400 bg-gray-50 px-2 py-0.5 rounded uppercase tracking-tighter">{exp.startDate} - {exp.current ? 'Actual' : exp.endDate}</span>
                                    </div>
                                    <p className="text-[12px] font-black text-tyYellow uppercase mb-3 tracking-widest">{exp.company} • {exp.city}</p>
                                    <p className="text-[11px] text-gray-500 leading-relaxed font-medium">Ejecución integral de procesos operativos y administrativos, garantizando la eficiencia organizacional y el cumplimiento de metas establecidas bajo estándares de calidad.</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
                <section>
                    <h2 className="text-[14px] font-black uppercase tracking-[0.3em] mb-8 border-b-2 border-tyYellow pb-2 inline-block">Educación</h2>
                    <div className="grid grid-cols-1 gap-6">
                        {formal.map((edu: any) => (
                            <div key={edu.id} className="flex justify-between items-center break-inside-avoid bg-gray-50/70 p-6 rounded-2xl border border-gray-100 transition hover:bg-gray-50">
                                <div className="space-y-1">
                                    <h3 className="text-[14px] font-black text-tyGrey uppercase tracking-tight">{edu.title}</h3>
                                    <p className="text-[11px] text-gray-400 font-black uppercase tracking-widest">{edu.institution} | {edu.city}</p>
                                </div>
                                <div className="text-right shrink-0">
                                    <span className="text-[12px] font-black text-tyGrey bg-tyYellow px-5 py-2 rounded-xl shadow-sm">{edu.year}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                <div className="flex-1 flex flex-col justify-end">
                    <Signature personal={data.personal} />
                </div>
            </div>
            <div className="w-1/3 space-y-14 border-l pl-14 border-gray-100">
                <section>
                    <h3 className="text-[11px] font-black uppercase text-tyYellow mb-10 bg-[#1a1a1a] py-4 text-center rounded-2xl shadow-xl tracking-[0.3em]">Contacto</h3>
                    <ul className="text-[11px] space-y-8 font-bold text-gray-600">
                        <li className="flex items-center gap-5"><div className="bg-tyYellow/10 p-2.5 rounded-xl text-tyYellow"><MapPin size={18}/></div> {data.personal.city}</li>
                        <li className="flex items-center gap-5"><div className="bg-tyYellow/10 p-2.5 rounded-xl text-tyYellow"><Phone size={18}/></div> {data.personal.phone}</li>
                        <li className="flex items-center gap-5 truncate"><div className="bg-tyYellow/10 p-2.5 rounded-xl text-tyYellow"><Mail size={18}/></div> {data.personal.email}</li>
                        <li className="flex items-center gap-5"><div className="bg-tyYellow/10 p-2.5 rounded-xl text-tyYellow"><FileText size={18}/></div> C.C. {data.personal.docNumber}</li>
                    </ul>
                </section>
                <section>
                    <h3 className="text-[11px] font-black uppercase text-tyYellow mb-10 bg-[#1a1a1a] py-4 text-center rounded-2xl shadow-xl tracking-[0.3em]">Referencias</h3>
                    <div className="space-y-10">
                        {data.references.map((ref: any) => (
                            <div key={ref.id} className="text-[11px] border-b border-gray-50 pb-5 last:border-0">
                                <p className="font-black text-tyGrey uppercase leading-none mb-2 tracking-tighter text-[14px]">{ref.name}</p>
                                <p className="text-gray-400 font-black text-[10px] mb-2 uppercase tracking-widest">{ref.profession}</p>
                                <div className="flex items-center gap-2 text-tyYellow font-black">
                                    <Phone size={14} />
                                    <span>{ref.phone}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    </div>
);

// --- Layout 2: Sidebar Template (Dynamic Red, Eco Green, Impact Orange) ---
const DesignSidebarTemplate: React.FC<{data: ResumeData, formal: Education[], color: string, accent: string}> = ({ data, formal, color, accent }) => (
    <div className="h-full flex flex-col bg-white font-sans overflow-hidden">
        <div className="flex h-full">
            <div style={{ backgroundColor: color }} className="w-[35%] text-white p-14 flex flex-col relative">
                <div style={{ backgroundColor: accent }} className="absolute top-0 left-0 w-full h-2"></div>
                <div className="mb-14 flex flex-col items-center">
                    {data.personal.photo && (
                        <div className="w-52 h-52 rounded-full border-4 border-white overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] bg-white mb-10 transform scale-110">
                            <img src={data.personal.photo} className="w-full h-full object-cover" />
                        </div>
                    )}
                    <h2 className="text-4xl font-black uppercase text-center leading-[0.8] tracking-tighter mb-4 pt-4">
                        {data.personal.firstName} <br/> <span style={{ color: accent }}>{data.personal.lastName}</span>
                    </h2>
                    <div style={{ backgroundColor: accent }} className="w-16 h-1.5 my-6 rounded-full opacity-60"></div>
                    <p className="text-[11px] font-black text-white uppercase tracking-[0.35em] text-center px-6 bg-black/20 py-3 rounded-2xl">{data.personal.professionalTitle}</p>
                </div>
                
                <div className="space-y-14 flex-1">
                    <section>
                        <h3 className="text-[12px] font-black uppercase border-b-2 border-white/20 pb-2 mb-8 tracking-[0.3em] flex items-center gap-2">Contacto</h3>
                        <div className="text-[11px] space-y-6 font-bold opacity-90">
                            <p className="flex items-center gap-4"><Phone size={18} style={{ color: accent }}/> {data.personal.phone}</p>
                            <p className="flex items-center gap-4 truncate"><Mail size={18} style={{ color: accent }}/> {data.personal.email}</p>
                            <p className="flex items-center gap-4"><MapPin size={18} style={{ color: accent }}/> {data.personal.city}</p>
                            <p className="flex items-center gap-4"><FileText size={18} style={{ color: accent }}/> C.C. {data.personal.docNumber}</p>
                        </div>
                    </section>
                    
                    <section>
                        <h3 className="text-[12px] font-black uppercase border-b-2 border-white/20 pb-2 mb-8 tracking-[0.3em] flex items-center gap-2">Referencias</h3>
                        <div className="space-y-8">
                            {data.references.slice(0, 2).map((ref: any) => (
                                <div key={ref.id} className="text-[11px] opacity-90 bg-black/10 p-5 rounded-2xl border border-white/10">
                                    <p className="font-black uppercase mb-1 tracking-tight text-[13px]" style={{ color: accent }}>{ref.name}</p>
                                    <p className="italic text-[10px] mb-2 font-medium">{ref.profession}</p>
                                    <p className="font-black flex items-center gap-2 text-white"><Phone size={12}/> {ref.phone}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
                <div style={{ color: accent }} className="mt-auto text-[10px] font-black uppercase tracking-[0.5em] text-center opacity-40">
                    BARRANCABERMEJA
                </div>
            </div>
            
            <div className="w-[65%] p-16 flex flex-col bg-white">
                <div className="flex-1 space-y-16">
                    {data.hasExperience && (
                        <section>
                            <h2 style={{ color: color }} className="text-[16px] font-black uppercase tracking-[0.4em] mb-10 border-b-2 border-gray-100 pb-3">Perfil Laboral</h2>
                            <div className="space-y-12">
                                {data.experience.map((exp: any) => (
                                    <div key={exp.id} style={{ borderColor: color }} className="break-inside-avoid border-l-4 pl-8 relative">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-[18px] font-black text-tyGrey uppercase leading-none tracking-tight">{exp.position}</h3>
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{exp.startDate} - {exp.current ? 'Pres.' : exp.endDate}</span>
                                        </div>
                                        <p style={{ color: color }} className="text-[12px] font-black uppercase mb-4 tracking-widest">{exp.company} | {exp.city}</p>
                                        <p className="text-[12px] text-gray-500 leading-relaxed font-medium">Asumo con profesionalismo y alto compromiso las tareas designadas, garantizando la excelencia operativa y el cumplimiento de objetivos empresariales.</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                    
                    <section>
                        <h2 style={{ color: color }} className="text-[16px] font-black uppercase tracking-[0.4em] mb-10 border-b-2 border-gray-100 pb-3">Educación</h2>
                        <div className="space-y-6">
                            {formal.map((edu: any) => (
                                <div key={edu.id} style={{ borderLeftColor: color }} className="break-inside-avoid flex justify-between items-center p-6 bg-gray-50 rounded-[2.5rem] border-l-[12px] shadow-sm">
                                    <div className="space-y-1">
                                        <h3 className="text-[14px] font-black text-tyGrey uppercase tracking-tight">{edu.title}</h3>
                                        <p className="text-[11px] text-gray-400 font-black uppercase tracking-widest">{edu.institution}</p>
                                    </div>
                                    <span style={{ color: color }} className="text-[13px] font-black ml-6 bg-white px-5 py-2 rounded-full shadow-inner">{edu.year}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                    
                    <div className="flex-1 flex flex-col justify-end">
                        <Signature personal={data.personal} />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// --- Layout 3: Clean ATS (Classic Mono) ---
const DesignATS: React.FC<{data: ResumeData, formal: Education[]}> = ({ data, formal }) => (
    <div className="p-24 font-serif text-gray-900 h-full max-w-full mx-auto text-[14px] leading-relaxed flex flex-col bg-white">
        <div className="text-center mb-16 border-b-2 border-tyGrey pb-12">
            <h1 className="text-5xl font-bold uppercase mb-4 tracking-tighter">{data.personal.firstName} {data.personal.lastName}</h1>
            <p className="font-bold text-gray-600 text-[16px] mb-4 uppercase tracking-[0.4em] font-sans">{data.personal.professionalTitle}</p>
            <div className="h-0.5 w-40 bg-gray-200 mx-auto mb-6"></div>
            <p className="text-[13px] font-medium font-sans text-gray-500 tracking-wide">
                {data.personal.city} • {data.personal.phone} • {data.personal.email} • C.C. {data.personal.docNumber}
            </p>
        </div>
        <div className="space-y-16 flex-1">
             <section>
                <h2 className="text-[15px] font-bold uppercase border-b border-tyGrey mb-10 tracking-[0.3em] font-sans">Trayectoria Profesional</h2>
                <div className="space-y-12">
                    {data.experience.map((exp: any) => (
                        <div key={exp.id} className="break-inside-avoid">
                            <div className="flex justify-between font-bold text-[15px] mb-2">
                                <span className="uppercase">{exp.company}</span>
                                <span className="font-medium text-gray-500">{exp.startDate} – {exp.current ? 'Presente' : exp.endDate}</span>
                            </div>
                            <div className="flex justify-between italic mb-4 text-gray-700">
                                <span className="font-bold text-gray-900">{exp.position}</span>
                                <span className="not-italic font-bold text-[12px] uppercase text-gray-400 tracking-widest">{exp.city}</span>
                            </div>
                            <p className="text-gray-600 leading-snug">Garantizo la excelencia en cada proceso mediante el cumplimiento responsable de mis funciones, bajo criterios de honestidad y eficiencia organizacional.</p>
                        </div>
                    ))}
                </div>
             </section>
             <section>
                <h2 className="text-[15px] font-bold uppercase border-b border-tyGrey mb-10 tracking-[0.3em] font-sans">Estudios Realizados</h2>
                <div className="space-y-6">
                    {formal.map((edu: any) => (
                        <div key={edu.id} className="break-inside-avoid flex justify-between items-baseline group">
                            <div className="flex-1">
                                <span className="font-bold text-[14px]">{edu.title.toUpperCase()}</span>
                                <span className="mx-4 text-gray-300">•</span>
                                <span className="italic text-gray-600">{edu.institution}</span>
                            </div>
                            <span className="shrink-0 ml-8 font-bold text-tyGrey">{edu.year}</span>
                        </div>
                    ))}
                </div>
             </section>
             <section className="break-inside-avoid pt-12">
                <h2 className="text-[15px] font-bold uppercase border-b border-tyGrey mb-10 tracking-[0.3em] font-sans">Referencias</h2>
                <div className="grid grid-cols-2 gap-16">
                    {data.references.map((ref: any) => (
                        <div key={ref.id} className="border-l-2 pl-8 border-gray-100">
                            <p className="font-bold leading-tight uppercase mb-2 tracking-tight text-[15px]">{ref.name}</p>
                            <p className="text-[12px] text-gray-400 font-bold uppercase mb-2 tracking-widest font-sans">{ref.profession}</p>
                            <p className="text-[13px] font-bold font-sans">Tel: {ref.phone}</p>
                        </div>
                    ))}
                </div>
             </section>
             <div className="flex-1 flex flex-col justify-end pt-24">
                <Signature personal={data.personal} />
             </div>
        </div>
    </div>
);
