
import React, { useRef, useState } from 'react';
import { ResumeData, NeutralPalette } from '../types';
import { MapPin, Phone, Mail, Download, Loader2, User, Briefcase, GraduationCap, Users, Calendar, Home } from 'lucide-react';

interface Props {
  data: ResumeData;
  onEdit: () => void;
  onExit: () => void;
}

const NEUTRAL_PALETTES: Record<NeutralPalette, string> = {
  verde: '#059669',
  naranja: '#ea580c',
  rojo: '#dc2626',
  amarillo: '#ca8a04',
  rosado: '#db2777',
  negro: '#111827',
  cian: '#06b6d4',
  violeta: '#7c3aed',
  lima: '#84cc16'
};

export const ResumePreview: React.FC<Props> = ({ data, onEdit, onExit }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    if (!containerRef.current) return;
    setIsGenerating(true);
    
    window.scrollTo(0, 0);

    try {
      // @ts-ignore
      const canvas = await html2canvas(containerRef.current, {
        scale: 3, 
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: 816, 
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      
      // @ts-ignore
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'letter' 
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`HV_${data.personal.firstName}_${data.personal.lastName}.pdf`);

    } catch (e) { 
      console.error(e);
      alert("Hubo un error al procesar el archivo. Por favor intente de nuevo."); 
    } finally { 
      setIsGenerating(false); 
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 py-10 flex flex-col items-center gap-6 animate-slide-up no-print">
      <div className="flex flex-wrap justify-center gap-4 sticky top-4 z-50 bg-white/10 p-4 rounded-3xl backdrop-blur-xl border border-white/20 shadow-2xl">
        <button onClick={onExit} className="bg-white text-slate-900 px-8 py-2 rounded-xl font-bold shadow hover:bg-slate-100 transition">Cerrar</button>
        <button onClick={onEdit} className="text-white px-6 py-2 hover:bg-white/10 rounded-xl transition font-bold">Editar</button>
        <button onClick={handleDownloadPDF} disabled={isGenerating} className="bg-tyYellow text-tyGrey px-10 py-2 rounded-xl font-black shadow-lg hover:scale-105 transition flex items-center gap-2">
          {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Download size={20}/>} Descargar PDF
        </button>
      </div>

      <div className="pdf-container p-4">
        <div ref={containerRef} className="resume-sheet h-auto min-h-[279.4mm] overflow-visible bg-white">
            {data.templateId === 'masculino' && <DesignMasculino data={data} />}
            {data.templateId === 'femenino' && <DesignFemenino data={data} />}
            {data.templateId === 'ats' && <DesignATS data={data} />}
            {data.templateId === 'neutro' && <DesignNeutro data={data} palette={NEUTRAL_PALETTES[data.neutralPalette || 'negro']} />}
        </div>
      </div>
    </div>
  );
};

const DesignMasculino = ({ data }: { data: ResumeData }) => (
    <div className="h-full w-full flex flex-col font-sans text-slate-900 bg-white min-h-[279.4mm]">
        <div className="h-[20%] bg-[#0f172a] p-10 flex justify-between items-center relative overflow-hidden text-white shrink-0">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[#1e293b] opacity-20" style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' }}></div>
            <div className="relative z-10 flex-1 pr-10 overflow-hidden text-left">
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight mb-2">
                    {data.personal.firstName} <br/><span className="text-tyYellow">{data.personal.lastName}</span>
                </h1>
                <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-tyYellow/80 border-l-2 border-tyYellow pl-4">{data.personal.professionalTitle}</p>
            </div>
            {data.personal.photo && (
                <div className="w-44 h-44 rounded-2xl border-4 border-white/20 overflow-hidden shadow-2xl shrink-0 bg-slate-800">
                    <img src={data.personal.photo} className="w-full h-full object-cover" />
                </div>
            )}
        </div>
        <div className="flex-1 flex p-10 gap-10 bg-white min-h-0">
            <div className="w-[32%] flex flex-col text-[11px] text-left min-h-full">
                <div className="flex-1 space-y-5">
                    <section>
                        <h3 className="font-black uppercase tracking-widest mb-3 text-tyYellow border-b border-slate-100 pb-1">Datos Personales</h3>
                        <div className="space-y-2.5 font-bold text-slate-600">
                            <p className="flex items-center gap-2"><Phone size={12} className="text-tyYellow shrink-0"/> {data.personal.phone}</p>
                            <p className="flex items-center gap-2"><Mail size={12} className="text-tyYellow shrink-0"/> {data.personal.email}</p>
                            <p className="flex items-center gap-2"><MapPin size={12} className="text-tyYellow shrink-0"/> {data.personal.city}</p>
                            <p className="flex items-center gap-2"><Home size={12} className="text-tyYellow shrink-0"/> {data.personal.neighborhood}</p>
                            <p className="flex items-center gap-2"><Calendar size={12} className="text-tyYellow shrink-0"/> {data.personal.birthDate}</p>
                        </div>
                    </section>
                    <section>
                        <h3 className="font-black uppercase tracking-widest mb-3 text-tyYellow border-b border-slate-100 pb-1">Referencias</h3>
                        <div className="space-y-3">
                            {data.references.map(ref => (
                                <div key={ref.id} className="bg-slate-50 p-2.5 rounded-xl border-l-2 border-tyYellow">
                                    <p className="font-black uppercase text-[10px]">{ref.name}</p>
                                    <p className="text-[8px] font-bold text-slate-400 uppercase mb-0.5">{ref.profession}</p>
                                    <p className="font-black text-slate-900 text-[10px]">{ref.phone}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
                <div className="mt-auto pt-10 pb-12">
                    <Signature data={data} border="#0f172a" />
                </div>
            </div>
            <div className="w-[68%] space-y-6 text-left pb-16">
                <section>
                    <h3 className="font-black uppercase tracking-widest mb-4 flex items-center gap-2 text-slate-400"><Briefcase size={14} className="text-tyYellow"/> Experiencia Profesional</h3>
                    <div className="space-y-4">
                        {data.experience.map(exp => (
                            <div key={exp.id} className="relative pl-8 border-l-2 border-slate-100 pb-1">
                                <div className="absolute -left-[7px] top-0 w-3 h-3 rounded-full border-2 border-[#0f172a] bg-white z-10"></div>
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <h3 className="font-black text-[13px] uppercase text-[#0f172a] leading-tight pr-4">{exp.position}</h3>
                                    <span className="text-[8px] font-black text-slate-400 uppercase shrink-0">{exp.startDate} / {exp.current ? 'ACT' : exp.endDate}</span>
                                </div>
                                <p className="font-bold text-tyYellow text-[10px] uppercase">{exp.company}</p>
                            </div>
                        ))}
                    </div>
                </section>
                <section>
                    <h3 className="font-black uppercase tracking-widest mb-4 flex items-center gap-2 text-slate-400"><GraduationCap size={14} className="text-tyYellow"/> Formación</h3>
                    <div className="grid grid-cols-1 gap-2">
                        {data.education.map(edu => (
                            <div key={edu.id} className="flex justify-between items-center bg-[#f8fafc] p-3 rounded-xl border border-slate-100">
                                <div className="flex-1 pr-4">
                                    <h3 className="font-black text-[11px] uppercase text-slate-800 leading-tight">{edu.title}</h3>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">{edu.institution}</p>
                                </div>
                                <span className="font-black text-base text-[#0f172a] shrink-0">{edu.year}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    </div>
);

const DesignFemenino = ({ data }: { data: ResumeData }) => (
    <div className="h-full w-full flex flex-col font-serif bg-[#fffaf5] text-[#5c4a40] min-h-[279.4mm]">
        <div className="h-[20%] p-6 flex flex-col items-center justify-center text-center border-b-[6px] border-[#e8d5c8] shrink-0 bg-white">
            <div className="flex flex-col gap-0 mb-2">
                <h1 className="text-4xl font-black uppercase tracking-[0.15em] text-[#4a3a30] leading-none">
                    {data.personal.firstName}
                </h1>
                <h1 className="text-4xl font-black uppercase tracking-[0.15em] text-[#b08d70] leading-none mt-2">
                    {data.personal.lastName}
                </h1>
            </div>
            <div className="w-16 h-0.5 bg-[#b08d70] mb-2"></div>
            <p className="text-[10px] font-sans font-black uppercase tracking-[0.5em] text-[#a08070]">{data.personal.professionalTitle}</p>
        </div>
        <div className="flex-1 flex bg-[#fffaf5] min-h-0">
            <div className="w-[36%] bg-white border-r border-[#f3e3d8] p-8 flex flex-col shrink-0 text-left min-h-full">
                 <div className="flex-1 space-y-6 text-[11px]">
                    {data.personal.photo && (
                        <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-[#e8d5c8] shadow-lg p-1 bg-white mb-6">
                            <img src={data.personal.photo} className="w-full h-full object-cover rounded-full" />
                        </div>
                    )}
                    <section className="font-sans">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-3 text-[#b08d70] border-b border-[#f3e3d8] pb-1">Datos Personales</h3>
                        <div className="space-y-3 font-bold text-[#8a7060]">
                            <p className="flex items-center gap-3"><Phone size={12} className="text-[#b08d70] shrink-0"/> {data.personal.phone}</p>
                            <p className="flex items-center gap-3"><Mail size={12} className="text-[#b08d70] shrink-0"/> {data.personal.email}</p>
                            <p className="flex items-center gap-3"><MapPin size={12} className="text-[#b08d70] shrink-0"/> {data.personal.city}</p>
                            <p className="flex items-center gap-3"><Home size={12} className="text-[#b08d70] shrink-0"/> {data.personal.neighborhood}</p>
                        </div>
                    </section>
                    <section className="font-sans">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-3 text-[#b08d70] border-b border-[#f3e3d8] pb-1">Referencias</h3>
                        <div className="space-y-3">
                            {data.references.map(ref => (
                                <div key={ref.id} className="bg-[#fffaf5] p-3 rounded-2xl border border-[#f3e3d8]">
                                    <p className="font-black text-[#4a3a30] uppercase text-[10px] mb-0.5">{ref.name}</p>
                                    <p className="text-[8px] font-bold text-[#a08070] uppercase mb-0.5">{ref.profession}</p>
                                    <p className="text-[11px] font-black text-[#b08d70]">{ref.phone}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                 </div>
                 <div className="mt-auto pt-10 pb-12">
                    <Signature data={data} border="#b08d70" />
                 </div>
            </div>
            <div className="w-[64%] p-10 space-y-8 font-sans text-left pb-24">
                <section>
                    <h2 className="text-xl font-black uppercase tracking-tight text-[#4a3a30] mb-5 pb-1 border-b border-[#f3e3d8]">Historia Laboral</h2>
                    <div className="space-y-6">
                        {data.experience.map(exp => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <h3 className="text-[13px] font-black text-[#4a3a30] pr-4">{exp.position}</h3>
                                    <span className="text-[9px] font-black text-[#b08d70] uppercase shrink-0">{exp.startDate} – {exp.current ? 'ACT' : exp.endDate}</span>
                                </div>
                                <p className="text-[10px] font-black uppercase text-[#b08d70]">{exp.company}</p>
                            </div>
                        ))}
                    </div>
                </section>
                <section>
                    <h2 className="text-xl font-black uppercase tracking-tight text-[#4a3a30] mb-5 pb-1 border-b border-[#f3e3d8]">Educación</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {data.education.map(edu => (
                            <div key={edu.id} className="flex gap-4 items-center bg-white p-3 rounded-xl shadow-sm border border-[#f3e3d8]">
                                <div className="w-10 h-10 rounded-full bg-[#faf5f0] border-2 border-[#e8d5c8] flex items-center justify-center font-black text-xs text-[#b08d70] shrink-0">{edu.year.slice(-2)}</div>
                                <div className="flex-1">
                                    <p className="font-black text-[#4a3a30] text-[12px] uppercase">{edu.title}</p>
                                    <p className="text-[8px] font-bold text-[#a08070] uppercase">{edu.institution}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    </div>
);

const DesignATS = ({ data }: { data: ResumeData }) => (
    <div className="h-full w-full p-16 font-sans text-slate-800 bg-white flex flex-col min-h-[279.4mm] text-left">
        <div className="border-b-4 border-slate-900 pb-6 mb-8 shrink-0">
            <h1 className="text-4xl font-black uppercase mb-1 tracking-tight">{data.personal.firstName} {data.personal.lastName}</h1>
            <p className="text-sm font-black uppercase tracking-widest text-slate-500 mb-4">{data.personal.professionalTitle}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-[11px] font-bold text-slate-500 uppercase">
                <span className="flex items-center gap-1"><MapPin size={12}/> {data.personal.city}</span>
                <span className="flex items-center gap-1"><Phone size={12}/> {data.personal.phone}</span>
                <span className="flex items-center gap-1"><Mail size={12}/> {data.personal.email}</span>
                <span className="flex items-center gap-1"><User size={12}/> C.C. {data.personal.docNumber}</span>
            </div>
        </div>
        <div className="flex-1 space-y-10">
            <section>
                <h2 className="text-[12px] font-black uppercase border-b-2 border-slate-200 mb-4 tracking-[0.2em] text-slate-900 pb-1">Experiencia Laboral</h2>
                {data.experience.map(exp => (
                    <div key={exp.id} className="mb-4">
                        <div className="flex justify-between font-black text-[13px] mb-1">
                            <span className="uppercase pr-4">{exp.company} — {exp.position}</span>
                            <span className="text-slate-400 shrink-0">{exp.startDate} / {exp.current ? 'ACT' : exp.endDate}</span>
                        </div>
                    </div>
                ))}
            </section>
            <section>
                <h2 className="text-[12px] font-black uppercase border-b-2 border-slate-200 mb-4 tracking-[0.2em] text-slate-900 pb-1">Formación</h2>
                {data.education.map(edu => (
                    <div key={edu.id} className="flex justify-between items-baseline text-[11px] mb-2 font-bold uppercase">
                        <span className="text-slate-900 pr-4">{edu.title} — {edu.institution}</span>
                        <span className="text-slate-400 shrink-0">{edu.year}</span>
                    </div>
                ))}
            </section>
            <section>
                <h2 className="text-[12px] font-black uppercase border-b-2 border-slate-200 mb-4 tracking-[0.2em] text-slate-900 pb-1">Referencias</h2>
                <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                    {data.references.map(ref => (
                        <div key={ref.id} className="text-[11px]">
                            <p className="font-black text-slate-900 uppercase">{ref.name}</p>
                            <p className="text-slate-400 uppercase text-[9px] font-bold">{ref.profession}</p>
                            <p className="font-black mt-1">CEL: {ref.phone}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
        <div className="px-0 pb-16 pt-8 bg-white border-t-2 border-slate-100 mt-auto">
            <Signature data={data} border="#000" />
        </div>
    </div>
);

const DesignNeutro = ({ data, palette }: { data: ResumeData, palette: string }) => (
    <div className="h-full w-full flex flex-col font-sans text-slate-800 bg-white min-h-[279.4mm] text-left">
        <div className="h-[18%] flex items-center px-12 border-b-8 shrink-0 bg-slate-50/50" style={{ borderBottomColor: palette }}>
            <div className="flex-1 pr-6">
                <h1 className="text-4xl font-black uppercase tracking-tight mb-1" style={{ color: palette }}>
                    {data.personal.firstName} {data.personal.lastName}
                </h1>
                <p className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">{data.personal.professionalTitle}</p>
            </div>
            {data.personal.photo && (
                <div className="w-40 h-40 rounded-3xl border-4 overflow-hidden shadow-lg shrink-0" style={{ borderColor: palette }}>
                    <img src={data.personal.photo} className="w-full h-full object-cover" />
                </div>
            )}
        </div>
        <div className="flex-1 flex bg-white min-h-0">
            <div className="w-[32%] bg-slate-50 p-8 flex flex-col border-r border-slate-100 shrink-0 min-h-full">
                <div className="flex-1 space-y-10 text-[11px] font-bold text-slate-500">
                  <section>
                      <h3 className="uppercase tracking-widest mb-4 pb-1 border-b-2" style={{ borderBottomColor: palette, color: palette }}>Datos Personales</h3>
                      <div className="space-y-4">
                          <p className="flex items-center gap-3"><Phone size={14} style={{ color: palette }} className="shrink-0"/> {data.personal.phone}</p>
                          <p className="flex items-center gap-3"><Mail size={14} style={{ color: palette }} className="shrink-0"/> {data.personal.email}</p>
                          <p className="flex items-center gap-3"><MapPin size={14} style={{ color: palette }} className="shrink-0"/> {data.personal.city}</p>
                          <p className="flex items-center gap-3"><Calendar size={14} style={{ color: palette }} className="shrink-0"/> {data.personal.birthDate}</p>
                      </div>
                  </section>
                  <section>
                      <h3 className="uppercase tracking-widest mb-4 pb-1 border-b-2" style={{ borderBottomColor: palette, color: palette }}>Referencias</h3>
                      <div className="space-y-6">
                          {data.references.map(ref => (
                              <div key={ref.id}>
                                  <p className="text-slate-900 uppercase leading-tight font-black">{ref.name}</p>
                                  <p className="text-[9px] uppercase font-bold text-slate-400 mt-0.5">{ref.profession}</p>
                                  <p className="mt-1 font-black" style={{ color: palette }}>{ref.phone}</p>
                              </div>
                          ))}
                      </div>
                  </section>
                </div>
                <div className="mt-auto pt-10 pb-12">
                    <Signature data={data} border={palette} />
                </div>
            </div>
            <div className="w-[68%] p-10 space-y-8 bg-white pb-24">
                <section>
                    <h2 className="text-xl font-black uppercase mb-5 flex items-center gap-3" style={{ color: palette }}>
                        <Briefcase size={20} className="shrink-0"/> Experiencia
                    </h2>
                    <div className="space-y-8">
                        {data.experience.map(exp => (
                            <div key={exp.id}>
                                <div className="flex justify-between font-black text-[13px] text-slate-900 mb-1">
                                    <span className="uppercase pr-4">{exp.position}</span>
                                    <span className="text-[9px] text-slate-400 shrink-0 ml-4">{exp.startDate} - {exp.current ? 'ACT' : exp.endDate}</span>
                                </div>
                                <p className="text-[11px] font-bold uppercase" style={{ color: palette }}>{exp.company}</p>
                            </div>
                        ))}
                    </div>
                </section>
                <section>
                    <h2 className="text-xl font-black uppercase mb-5 flex items-center gap-3" style={{ color: palette }}>
                        <GraduationCap size={20} className="shrink-0"/> Estudios
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                        {data.education.map(edu => (
                            <div key={edu.id} className="flex justify-between items-center p-4 rounded-xl border-l-4 bg-slate-50" style={{ borderLeftColor: palette }}>
                                <div className="flex-1 pr-4">
                                    <p className="font-black text-[12px] uppercase text-slate-900 leading-tight">{edu.title}</p>
                                    <p className="text-[10px] font-bold uppercase text-slate-400">{edu.institution}</p>
                                </div>
                                <span className="font-black text-slate-900 text-lg ml-4 shrink-0">{edu.year}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    </div>
);

const Signature = ({ data, border }: { data: ResumeData, border: string }) => (
    <div className="pt-3 border-t-2 min-w-[170px] max-w-full inline-block shrink-0 overflow-visible" style={{ borderColor: border }}>
        <p className="font-black uppercase text-[13px] leading-tight mb-0.5 whitespace-nowrap overflow-visible">
          {data.personal.firstName}
        </p>
        <p className="font-black uppercase text-[13px] leading-tight mb-1 whitespace-nowrap overflow-visible">
          {data.personal.lastName}
        </p>
        <p className="text-slate-400 font-bold text-[8px] tracking-wider uppercase whitespace-nowrap overflow-visible">
          C.C. {data.personal.docNumber}
        </p>
    </div>
);
