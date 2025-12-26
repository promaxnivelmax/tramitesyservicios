
import React, { useState } from 'react';
import { ResumeData, EducationType, Education, Experience, Reference, Attachment, TemplatePalette } from '../types';
import { Plus, Trash2, ArrowRight, ArrowLeft, Check, Save, Upload, X, AlertCircle, FileText, Briefcase, GraduationCap, Users, Layout, Image as ImageIcon, Loader2, Clock, ChevronUp, ChevronDown, Palette } from 'lucide-react';

interface Props {
  initialData: ResumeData;
  onComplete: (data: ResumeData) => void;
  onCancel: () => void;
}

export const ResumeForm: React.FC<Props> = ({ initialData, onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<ResumeData>(initialData);
  const [isProcessing, setIsProcessing] = useState(false);

  const compressImage = (file: File, maxWidth = 1200): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          if (width > maxWidth) {
            height = (maxWidth / width) * height;
            width = maxWidth;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.8));
        };
      };
    });
  };

  const processFiles = async (files: File[]) => {
    setIsProcessing(true);
    const newAttachments: Attachment[] = [];
    for (const file of files) {
      try {
        const compressed = await compressImage(file);
        newAttachments.push({
          id: Math.random().toString(36).substr(2, 9),
          title: file.name,
          image: compressed,
          type: 'image'
        });
      } catch (e) { console.error(e); }
    }
    setData(prev => ({ ...prev, attachments: [...prev.attachments, ...newAttachments] }));
    setIsProcessing(false);
  };

  const moveAttachment = (index: number, direction: 'up' | 'down') => {
    const newAttachments = [...data.attachments];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newAttachments.length) {
      [newAttachments[index], newAttachments[targetIndex]] = [newAttachments[targetIndex], newAttachments[index]];
      setData({ ...data, attachments: newAttachments });
    }
  };

  const handleChangePersonal = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setData({ ...data, personal: { ...data.personal, [e.target.name]: e.target.value } });
  };

  const addEducation = () => setData({ ...data, education: [...data.education, { id: Date.now().toString(), type: EducationType.SECUNDARIA, institution: '', title: '', year: '2024', city: '' }] });
  const updateEducation = (id: string, field: keyof Education, value: string) => setData({ ...data, education: data.education.map(e => e.id === id ? { ...e, [field]: value } : e) });
  const addExperience = () => setData({ ...data, experience: [...data.experience, { id: Date.now().toString(), company: '', position: '', startDate: '', endDate: '', city: '', current: false }] });
  const updateExperience = (id: string, field: keyof Experience, value: any) => setData({ ...data, experience: data.experience.map(e => e.id === id ? { ...e, [field]: value } : e) });
  const addReference = () => setData({ ...data, references: [...data.references, { id: Date.now().toString(), type: 'Personal', name: '', profession: '', phone: '' }] });
  const updateReference = (id: string, field: keyof Reference, value: string) => setData({ ...data, references: data.references.map(r => r.id === id ? { ...r, [field]: value } : r) });

  const palettes: { id: TemplatePalette; name: string; colors: string[] }[] = [
    { id: 'classic', name: 'Corporativo', colors: ['bg-slate-800', 'bg-tyYellow'] },
    { id: 'modern', name: 'Elegante', colors: ['bg-blue-900', 'bg-blue-400'] },
    { id: 'vibrant', name: 'Impacto', colors: ['bg-red-900', 'bg-amber-400'] },
    { id: 'dark', name: 'Premium', colors: ['bg-black', 'bg-gray-400'] },
    { id: 'soft', name: 'Minimal', colors: ['bg-emerald-900', 'bg-emerald-200'] }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row animate-slide-up">
      <div className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col sticky top-0 h-screen">
         <div className="p-6 border-b border-gray-100">
             <h2 className="font-heading font-black text-tyGrey text-xl">Editor HV</h2>
             <p className="text-xs text-gray-400">Paso {step} de 6</p>
         </div>
         <div className="flex-1 py-4 overflow-y-auto">
            {[
              { n: 1, t: "Personal", i: <FileText size={18}/> },
              { n: 2, t: "Estudios", i: <GraduationCap size={18}/> },
              { n: 3, t: "Laboral", i: <Briefcase size={18}/> },
              { n: 4, t: "Referencias", i: <Users size={18}/> },
              { n: 5, t: "Diseño", i: <Layout size={18}/> },
              { n: 6, t: "Soportes", i: <ImageIcon size={18}/> }
            ].map(s => (
               <button key={s.n} onClick={() => setStep(s.n)} className={`w-full flex items-center gap-3 px-6 py-4 transition-all border-l-4 ${step === s.n ? 'border-tyYellow bg-yellow-50 text-tyGrey font-bold' : 'border-transparent text-gray-400 hover:bg-gray-50'}`}>
                 <div className={`p-2 rounded-lg ${step === s.n ? 'bg-white shadow-sm text-tyYellow' : 'bg-gray-100'}`}>{s.i}</div>
                 <span className="text-sm">{s.t}</span>
               </button>
            ))}
         </div>
         <div className="p-6 border-t border-gray-100">
             <button onClick={onCancel} className="w-full py-2 text-gray-400 hover:text-red-500 text-xs font-bold uppercase tracking-widest transition">Cancelar</button>
         </div>
      </div>

      <div className="flex-1 flex flex-col h-full min-h-screen pb-24">
         <div className="flex-1 p-6 md:p-12 max-w-4xl mx-auto w-full">
            {step === 1 && (
              <div className="space-y-8 animate-pop">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2 flex flex-col items-center">
                         <div className="relative group w-32 h-32 rounded-2xl overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                            {data.personal.photo ? <img src={data.personal.photo} className="w-full h-full object-cover" /> : <Upload className="text-gray-300" />}
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={async (e) => {
                               if(e.target.files?.[0]) {
                                 const comp = await compressImage(e.target.files[0], 400);
                                 setData({...data, personal: {...data.personal, photo: comp}});
                               }
                            }} />
                         </div>
                         <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase">Foto de Perfil</p>
                      </div>
                      <ModernInput label="Nombres" name="firstName" value={data.personal.firstName} onChange={handleChangePersonal} />
                      <ModernInput label="Apellidos" name="lastName" value={data.personal.lastName} onChange={handleChangePersonal} />
                      <div className="md:col-span-2">
                        <ModernInput label="Perfil Profesional" name="professionalTitle" value={data.personal.professionalTitle} onChange={handleChangePersonal} placeholder="Ej: Auxiliar Administrativo" />
                      </div>
                      <ModernInput label="Cédula" name="docNumber" value={data.personal.docNumber} onChange={handleChangePersonal} />
                      <ModernInput label="Celular" name="phone" value={data.personal.phone} onChange={handleChangePersonal} />
                      <ModernInput label="Correo" name="email" value={data.personal.email} onChange={handleChangePersonal} />
                      <ModernInput label="Ciudad" name="city" value={data.personal.city} onChange={handleChangePersonal} />
                  </div>
              </div>
            )}

            {step === 2 && (
               <div className="space-y-6 animate-pop">
                  <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-tyGrey">Estudios Realizados</h3>
                    <button onClick={addEducation} className="bg-tyYellow text-tyGrey px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2"><Plus size={14}/> Agregar</button>
                  </div>
                  {data.education.map(edu => (
                    <div key={edu.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative">
                       <button onClick={() => setData({...data, education: data.education.filter(e => e.id !== edu.id)})} className="absolute top-4 right-4 text-red-300 hover:text-red-500"><X size={18}/></button>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <ModernInput label="Título" value={edu.title} onChange={(e: any) => updateEducation(edu.id, 'title', e.target.value)} />
                          <ModernInput label="Institución" value={edu.institution} onChange={(e: any) => updateEducation(edu.id, 'institution', e.target.value)} />
                          <ModernInput label="Año" value={edu.year} onChange={(e: any) => updateEducation(edu.id, 'year', e.target.value)} />
                       </div>
                    </div>
                  ))}
               </div>
            )}

            {step === 3 && (
                <div className="space-y-6 animate-pop">
                   <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                      <button onClick={() => setData({...data, hasExperience: !data.hasExperience})} className={`w-12 h-6 rounded-full transition-colors ${data.hasExperience ? 'bg-tyYellow' : 'bg-gray-300'}`}>
                          <div className={`w-4 h-4 bg-white rounded-full transform transition mx-1 ${data.hasExperience ? 'translate-x-6' : ''}`}></div>
                      </button>
                      <span className="font-bold text-sm text-gray-600">¿Incluir experiencia laboral?</span>
                   </div>
                   {data.hasExperience && (
                      <div className="space-y-4">
                        <button onClick={addExperience} className="bg-tyGrey text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 ml-auto"><Plus size={14}/> Nueva Empresa</button>
                        {data.experience.map(exp => (
                           <div key={exp.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative">
                              <button onClick={() => setData({...data, experience: data.experience.filter(e => e.id !== exp.id)})} className="absolute top-4 right-4 text-red-300 hover:text-red-500"><X size={18}/></button>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <ModernInput label="Cargo" value={exp.position} onChange={(e: any) => updateExperience(exp.id, 'position', e.target.value)} />
                                 <ModernInput label="Empresa" value={exp.company} onChange={(e: any) => updateExperience(exp.id, 'company', e.target.value)} />
                                 <ModernInput label="Inicio" type="date" value={exp.startDate} onChange={(e: any) => updateExperience(exp.id, 'startDate', e.target.value)} />
                                 <div className="flex items-end pb-3">
                                    <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase cursor-pointer">
                                        <input type="checkbox" checked={exp.current} onChange={e => updateExperience(exp.id, 'current', e.target.checked)} className="rounded text-tyYellow" /> Actual
                                    </label>
                                 </div>
                              </div>
                           </div>
                        ))}
                      </div>
                   )}
                </div>
            )}

            {step === 4 && (
                <div className="space-y-6 animate-pop">
                    <button onClick={addReference} className="bg-tyYellow text-tyGrey px-6 py-2 rounded-xl text-xs font-bold flex items-center gap-2 ml-auto"><Plus size={16}/> Nueva Referencia</button>
                    {data.references.map(ref => (
                        <div key={ref.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative">
                             <button onClick={() => setData({...data, references: data.references.filter(r => r.id !== ref.id)})} className="absolute top-4 right-4 text-red-300 hover:text-red-500"><X size={18}/></button>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <ModernInput label="Nombre" value={ref.name} onChange={(e: any) => updateReference(ref.id, 'name', e.target.value)} />
                                <ModernInput label="Teléfono" value={ref.phone} onChange={(e: any) => updateReference(ref.id, 'phone', e.target.value)} />
                             </div>
                        </div>
                    ))}
                </div>
            )}

            {step === 5 && (
                <div className="space-y-12 animate-pop">
                    <div className="space-y-4">
                      <h3 className="font-black text-tyGrey uppercase tracking-widest text-sm flex items-center gap-2"><Layout className="text-tyYellow" /> Elija el Estilo Base</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {[
                            { id: 'executive', name: 'Ejecutiva', desc: 'Seria y Moderna' },
                            { id: 'creative', name: 'Creativa', desc: 'Impacto Visual' },
                            { id: 'modern', name: 'Canva Modern', desc: 'Limpia y Fluida' },
                            { id: 'minimal', name: 'Minimalista', desc: 'Elegancia Pura' },
                            { id: 'ats', name: 'Profesional ATS', desc: 'Fácil Lectura' }
                          ].map(t => (
                            <button key={t.id} onClick={() => setData({...data, templateId: t.id as any})} className={`p-4 rounded-2xl border-2 text-left transition ${data.templateId === t.id ? 'border-tyYellow bg-yellow-50 shadow-md' : 'border-gray-100 hover:border-gray-300'}`}>
                                <p className="font-bold text-sm text-tyGrey">{t.name}</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase">{t.desc}</p>
                            </button>
                          ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-black text-tyGrey uppercase tracking-widest text-sm flex items-center gap-2"><Palette className="text-tyYellow" /> Personalice el Color</h3>
                      <div className="flex flex-wrap gap-4">
                          {palettes.map(p => (
                            <button key={p.id} onClick={() => setData({...data, palette: p.id})} className={`flex items-center gap-3 p-3 rounded-2xl border-2 transition ${data.palette === p.id ? 'border-tyYellow bg-yellow-50' : 'border-gray-100 hover:border-gray-200'}`}>
                                <div className="flex gap-1">
                                    <div className={`w-4 h-4 rounded-full ${p.colors[0]}`}></div>
                                    <div className={`w-4 h-4 rounded-full ${p.colors[1]}`}></div>
                                </div>
                                <span className="text-[10px] font-black uppercase text-gray-500">{p.name}</span>
                            </button>
                          ))}
                      </div>
                    </div>
                </div>
            )}

            {step === 6 && (
                <div className="space-y-8 animate-pop">
                    <div className="bg-white p-8 rounded-[2rem] border-4 border-dashed border-gray-200 flex flex-col items-center justify-center text-center hover:bg-white/50 transition cursor-pointer relative" onClick={() => document.getElementById('attachments-upload')?.click()}>
                        <ImageIcon size={48} className="text-gray-200 mb-4" />
                        <h4 className="font-bold text-lg text-tyGrey">Subir Certificados y Soportes</h4>
                        <p className="text-xs text-gray-400">Las imágenes se ajustarán automáticamente al diseño seleccionado.</p>
                        <input id="attachments-upload" type="file" multiple accept="image/*" className="hidden" onChange={(e) => e.target.files && processFiles(Array.from(e.target.files))} />
                        {isProcessing && <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-[2rem]"><Loader2 className="animate-spin text-tyYellow" /></div>}
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-black text-tyGrey uppercase tracking-widest text-[10px] text-gray-400">Organice sus documentos (arrastre no disponible, use flechas)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {data.attachments.map((att, idx) => (
                                <div key={att.id} className="bg-white p-3 rounded-2xl border border-gray-100 flex items-center gap-4 group shadow-sm">
                                    <img src={att.image} className="w-16 h-20 object-cover rounded-lg shadow-inner" />
                                    <div className="flex-1 overflow-hidden">
                                        <p className="text-[10px] font-bold text-tyGrey truncate">{att.title}</p>
                                        <p className="text-[9px] text-gray-400 font-bold uppercase">Soporte #{idx + 1}</p>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <button disabled={idx === 0} onClick={() => moveAttachment(idx, 'up')} className="p-1 hover:bg-gray-100 rounded disabled:opacity-20"><ChevronUp size={16}/></button>
                                        <button disabled={idx === data.attachments.length - 1} onClick={() => moveAttachment(idx, 'down')} className="p-1 hover:bg-gray-100 rounded disabled:opacity-20"><ChevronDown size={16}/></button>
                                    </div>
                                    <button onClick={() => setData({...data, attachments: data.attachments.filter(a => a.id !== att.id)})} className="p-2 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition"><Trash2 size={18}/></button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
         </div>

         <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-white/90 backdrop-blur border-t border-gray-100 p-4 shadow-2xl flex justify-between items-center px-6 md:px-12 z-50">
              <button onClick={() => setStep(Math.max(1, step - 1))} className={`px-6 py-2 rounded-xl text-gray-400 font-bold uppercase text-[10px] tracking-widest transition ${step === 1 ? 'opacity-0 pointer-events-none' : 'hover:bg-gray-100'}`}>Atrás</button>
              <div className="flex gap-4">
                  {step < 6 ? (
                      <button onClick={() => setStep(step + 1)} className="bg-tyGrey text-white px-8 py-3 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center gap-2 shadow-lg hover:scale-105 transition">Siguiente <ArrowRight size={16} /></button>
                  ) : (
                      <button onClick={() => onComplete(data)} disabled={isProcessing} className="bg-tyYellow text-tyGrey px-12 py-3 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl hover:scale-110 transition flex items-center gap-2">
                        {isProcessing ? <Loader2 className="animate-spin" /> : <Save size={18} />} Finalizar
                      </button>
                  )}
              </div>
         </div>
      </div>
    </div>
  );
};

const ModernInput: React.FC<any> = ({ label, ...props }) => (
  <div className="w-full">
    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">{label}</label>
    <input className="w-full bg-gray-50 border-2 border-transparent text-sm rounded-xl focus:ring-0 focus:border-tyYellow focus:bg-white p-3 shadow-inner transition-all placeholder:text-gray-300" {...props} />
  </div>
);
