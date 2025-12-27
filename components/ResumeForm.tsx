
import React, { useState } from 'react';
import { ResumeData, EducationType, Education, Experience, Reference, NeutralPalette } from '../types';
import { Plus, Trash2, ArrowRight, Save, Upload, FileText, Briefcase, GraduationCap, Users, Layout, Loader2, CheckCircle, User, Star, MapPin, Palette } from 'lucide-react';

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
    return new Promise((resolve) => {
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

  const handleChangePersonal = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setData({ ...data, personal: { ...data.personal, [e.target.name]: e.target.value } });
  };

  const addEducation = () => setData({ ...data, education: [...data.education, { id: Date.now().toString(), type: EducationType.SECUNDARIA, institution: '', title: '', year: '2024', city: '' }] });
  const updateEducation = (id: string, field: keyof Education, value: string) => setData({ ...data, education: data.education.map(e => e.id === id ? { ...e, [field]: value } : e) });
  
  const addExperience = () => setData({ ...data, experience: [...data.experience, { id: Date.now().toString(), company: '', position: '', startDate: '', endDate: '', city: '', current: false }] });
  const updateExperience = (id: string, field: keyof Experience, value: any) => setData({ ...data, experience: data.experience.map(e => e.id === id ? { ...e, [field]: value } : e) });
  
  const addReference = () => setData({ ...data, references: [...data.references, { id: Date.now().toString(), type: 'Personal', name: '', profession: '', phone: '' }] });
  const updateReference = (id: string, field: keyof Reference, value: string) => setData({ ...data, references: data.references.map(r => r.id === id ? { ...r, [field]: value } : r) });

  const handleFinish = () => {
    setIsProcessing(true);
    const sortedEdu = [...data.education].sort((a, b) => parseInt(a.year) - parseInt(b.year));
    const sortedExp = [...data.experience].sort((a, b) => {
        if (a.current) return 1;
        if (b.current) return -1;
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });
    
    const finalData = {
      ...data,
      education: sortedEdu,
      experience: sortedExp
    };

    setTimeout(() => {
      onComplete(finalData);
      setIsProcessing(false);
    }, 600);
  };

  const palettes: { id: NeutralPalette; color: string }[] = [
    { id: 'verde', color: 'bg-green-600' },
    { id: 'naranja', color: 'bg-orange-600' },
    { id: 'rojo', color: 'bg-red-600' },
    { id: 'amarillo', color: 'bg-yellow-400' },
    { id: 'rosado', color: 'bg-pink-400' },
    { id: 'negro', color: 'bg-black' },
    { id: 'cian', color: 'bg-cyan-500' },
    { id: 'violeta', color: 'bg-violet-600' },
    { id: 'lima', color: 'bg-lime-500' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row animate-slide-up font-sans">
      <div className="hidden md:flex w-64 bg-white border-r border-slate-200 flex-col sticky top-0 h-screen no-print">
         <div className="p-6 border-b border-slate-100 bg-slate-50/50">
             <h2 className="font-black text-tyGrey text-sm uppercase tracking-[0.2em] mb-1">Editor HV</h2>
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Paso {step} de 5</p>
         </div>
         <div className="flex-1 py-4">
            {[
              { n: 1, t: "Datos Personales", i: <FileText size={16}/> },
              { n: 2, t: "Estudios", i: <GraduationCap size={16}/> },
              { n: 3, t: "Experiencia", i: <Briefcase size={16}/> },
              { n: 4, t: "Referencias", i: <Users size={16}/> },
              { n: 5, t: "Elegir Diseño", i: <Layout size={16}/> }
            ].map(s => (
               <button key={s.n} onClick={() => setStep(s.n)} className={`w-full flex items-center gap-3 px-6 py-4 transition-all text-left ${step === s.n ? 'bg-tyYellow/10 text-tyGrey font-bold border-r-4 border-tyYellow' : 'text-slate-400 hover:bg-slate-50'}`}>
                 <span className={`${step === s.n ? 'text-tyYellow' : 'text-slate-300'}`}>{s.i}</span>
                 <span className="text-xs uppercase tracking-wider">{s.t}</span>
               </button>
            ))}
         </div>
         <div className="p-6 border-t border-slate-100">
             <button onClick={onCancel} className="w-full py-3 text-slate-400 hover:text-red-500 text-[10px] font-black uppercase tracking-widest transition">Cerrar Editor</button>
         </div>
      </div>

      <div className="flex-1 flex flex-col h-full min-h-screen pb-32">
         <div className="flex-1 p-6 md:p-12 max-w-4xl mx-auto w-full">
            {step === 1 && (
              <div className="space-y-8 animate-pop">
                  <header className="border-b pb-4 mb-6">
                      <h2 className="text-2xl font-black text-slate-900 tracking-tight">Datos Personales</h2>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Llene los datos básicos de su perfil</p>
                  </header>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2 flex justify-center">
                         <div className="relative group w-32 h-32 rounded-3xl overflow-hidden bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center transition-all hover:border-tyYellow shadow-inner">
                            {data.personal.photo ? <img src={data.personal.photo} className="w-full h-full object-cover" /> : <Upload className="text-slate-300" size={24} />}
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={async (e) => {
                               if(e.target.files?.[0]) {
                                 const comp = await compressImage(e.target.files[0], 400);
                                 setData({...data, personal: {...data.personal, photo: comp}});
                               }
                            }} />
                         </div>
                      </div>
                      <ModernInput label="Nombres" name="firstName" value={data.personal.firstName} onChange={handleChangePersonal} />
                      <ModernInput label="Apellidos" name="lastName" value={data.personal.lastName} onChange={handleChangePersonal} />
                      <div className="md:col-span-2">
                        <ModernInput label="Perfil o Profesión" name="professionalTitle" value={data.personal.professionalTitle} onChange={handleChangePersonal} placeholder="Ej: Soldador, Ayudante, Secretaria..." />
                      </div>
                      <ModernInput label="Cédula de Ciudadanía" name="docNumber" value={data.personal.docNumber} onChange={handleChangePersonal} />
                      <ModernInput label="Lugar de Expedición" name="expeditionPlace" value={data.personal.expeditionPlace} onChange={handleChangePersonal} />
                      <ModernInput label="Fecha de Nacimiento" name="birthDate" type="date" value={data.personal.birthDate} onChange={handleChangePersonal} />
                      <ModernInput label="Celular" name="phone" value={data.personal.phone} onChange={handleChangePersonal} />
                      <ModernInput label="Email" name="email" value={data.personal.email} onChange={handleChangePersonal} />
                      <ModernInput label="Dirección de Casa" name="address" value={data.personal.address} onChange={handleChangePersonal} />
                      <ModernInput label="Barrio" name="neighborhood" value={data.personal.neighborhood} onChange={handleChangePersonal} />
                      <ModernInput label="Ciudad de Residencia" name="city" value={data.personal.city} onChange={handleChangePersonal} />
                  </div>
              </div>
            )}

            {step === 5 && (
                <div className="space-y-8 animate-pop">
                    <header className="border-b pb-4 mb-6">
                      <h2 className="text-2xl font-black text-slate-900 tracking-tight">Elegir Diseño Maestro</h2>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Formatos optimizados para impresión en tamaño carta</p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SelectionButton 
                          active={data.templateId === 'masculino'} 
                          onClick={() => setData({...data, templateId: 'masculino'})}
                          title="Diseño Masculino"
                          desc="Sólido y Corporativo (Azul/Oro)"
                          icon={<User className="text-blue-500" />}
                        />
                        <SelectionButton 
                          active={data.templateId === 'femenino'} 
                          onClick={() => setData({...data, templateId: 'femenino'})}
                          title="Diseño Femenino"
                          desc="Elegante y Sofisticado (Rosa Gold)"
                          icon={<Star className="text-pink-400" />}
                        />
                        <SelectionButton 
                          active={data.templateId === 'ats'} 
                          onClick={() => setData({...data, templateId: 'ats'})}
                          title="Formato ATS"
                          desc="Texto limpio para lectura rápida"
                          icon={<Layout className="text-slate-500" />}
                        />
                        <SelectionButton 
                          active={data.templateId === 'neutro'} 
                          onClick={() => setData({...data, templateId: 'neutro'})}
                          title="Diseño Neutro"
                          desc="Minimalista con Color Ajustable"
                          icon={<Palette className="text-green-500" />}
                        />
                    </div>

                    {data.templateId === 'neutro' && (
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm animate-pop">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 text-center">Colores Disponibles para Neutro</p>
                            <div className="flex flex-wrap justify-center gap-4">
                                {palettes.map(p => (
                                    <button 
                                        key={p.id} 
                                        onClick={() => setData({...data, neutralPalette: p.id})}
                                        className={`w-10 h-10 rounded-full transition-all border-4 ${p.color} ${data.neutralPalette === p.id ? 'border-slate-800 scale-125' : 'border-transparent shadow-sm'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {step === 2 && <StepEducation data={data} setData={setData} updateEducation={updateEducation} addEducation={addEducation} />}
            {step === 3 && <StepExperience data={data} setData={setData} updateExperience={updateExperience} addExperience={addExperience} />}
            {step === 4 && <StepReferences data={data} setData={setData} updateReference={updateReference} addReference={addReference} />}
         </div>

         <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 flex justify-between items-center px-10 z-50 shadow-lg no-print">
              <button onClick={() => setStep(Math.max(1, step - 1))} className={`text-slate-400 font-black uppercase text-[10px] tracking-widest transition ${step === 1 ? 'opacity-0 pointer-events-none' : 'hover:text-tyGrey'}`}>Atrás</button>
              <div className="flex gap-3">
                  {step < 5 ? (
                      <button onClick={() => setStep(step + 1)} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:bg-black transition-all shadow-md">Siguiente <ArrowRight size={14} /></button>
                  ) : (
                      <button onClick={handleFinish} disabled={isProcessing} className="bg-tyYellow text-tyGrey px-12 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-lg hover:scale-105 transition flex items-center gap-2">
                        {isProcessing ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />} Generar Hoja de Vida
                      </button>
                  )}
              </div>
         </div>
      </div>
    </div>
  );
};

const SelectionButton = ({ active, onClick, title, desc, icon }: any) => (
    <button onClick={onClick} className={`p-5 rounded-2xl border-2 text-left transition-all ${active ? 'border-tyYellow bg-yellow-50 shadow-md' : 'border-slate-100 bg-white hover:border-slate-200'}`}>
        <div className="flex justify-between items-start mb-2">
            <div className={`p-2 rounded-xl ${active ? 'bg-tyYellow text-tyGrey' : 'bg-slate-50 text-slate-300'}`}>{icon}</div>
            {active && <CheckCircle className="text-tyYellow" size={18}/>}
        </div>
        <h4 className="font-black text-sm text-slate-900">{title}</h4>
        <p className="text-[10px] text-slate-400 font-bold uppercase">{desc}</p>
    </button>
);

const ModernInput: React.FC<any> = ({ label, ...props }) => (
  <div className="w-full">
    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">{label}</label>
    <input className="w-full bg-slate-50 border border-slate-200 text-sm font-bold rounded-xl focus:ring-2 focus:ring-tyYellow focus:bg-white p-3 transition-all text-slate-900" {...props} />
  </div>
);

const StepEducation = ({ data, setData, updateEducation, addEducation }: any) => (
    <div className="space-y-6 animate-pop">
        <header className="border-b pb-4 mb-6">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Estudios</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Empiece por el más antiguo hasta llegar al más reciente</p>
        </header>
        <button onClick={addEducation} className="w-full bg-slate-100 text-slate-900 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-tyYellow transition flex items-center justify-center gap-2"><Plus size={14}/> Nuevo Estudio</button>
        <div className="space-y-4">
            {data.education.map((edu: any) => (
                <div key={edu.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative animate-slide-up">
                    <button onClick={() => setData({...data, education: data.education.filter((e: any) => e.id !== edu.id)})} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-all"><Trash2 size={18}/></button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ModernInput label="Título Obtenido" value={edu.title} onChange={(e: any) => updateEducation(edu.id, 'title', e.target.value)} />
                        <ModernInput label="Institución" value={edu.institution} onChange={(e: any) => updateEducation(edu.id, 'institution', e.target.value)} />
                        <ModernInput label="Año de Grado" value={edu.year} onChange={(e: any) => updateEducation(edu.id, 'year', e.target.value)} />
                        <ModernInput label="Ciudad" value={edu.city} onChange={(e: any) => updateEducation(edu.id, 'city', e.target.value)} />
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const StepExperience = ({ data, setData, updateExperience, addExperience }: any) => (
    <div className="space-y-6 animate-pop">
        <header className="border-b pb-4 mb-6">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Experiencia Laboral</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Relacione sus empleos anteriores</p>
        </header>
        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl mb-4 border border-slate-200">
            <button onClick={() => setData({...data, hasExperience: !data.hasExperience})} className={`w-12 h-6 rounded-full transition-all relative ${data.hasExperience ? 'bg-tyYellow' : 'bg-slate-300'}`}>
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${data.hasExperience ? 'left-7' : 'left-1'}`}></div>
            </button>
            <span className="font-black text-[10px] uppercase text-slate-500 tracking-widest">¿Incluir experiencia en el PDF?</span>
        </div>
        {data.hasExperience && (
            <div className="space-y-4">
                <button onClick={addExperience} className="w-full bg-slate-100 text-slate-900 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-tyYellow transition flex items-center justify-center gap-2"><Plus size={14}/> Agregar Cargo</button>
                {data.experience.map((exp: any) => (
                    <div key={exp.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative animate-slide-up">
                        <button onClick={() => setData({...data, experience: data.experience.filter((e: any) => e.id !== exp.id)})} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-all"><Trash2 size={18}/></button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <ModernInput label="Cargo Desempeñado" value={exp.position} onChange={(e: any) => updateExperience(exp.id, 'position', e.target.value)} />
                            <ModernInput label="Empresa" value={exp.company} onChange={(e: any) => updateExperience(exp.id, 'company', e.target.value)} />
                            <div className="md:col-span-2 flex items-center gap-3 mb-2">
                                <input type="checkbox" checked={exp.current} onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)} className="w-4 h-4 accent-tyYellow"/>
                                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Trabajo aquí actualmente</span>
                            </div>
                            <ModernInput label="Fecha de Inicio" type="date" value={exp.startDate} onChange={(e: any) => updateExperience(exp.id, 'startDate', e.target.value)} />
                            <ModernInput label="Fecha de Retiro" type="date" value={exp.endDate} disabled={exp.current} onChange={(e: any) => updateExperience(exp.id, 'endDate', e.target.value)} />
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
);

const StepReferences = ({ data, setData, updateReference, addReference }: any) => (
    <div className="space-y-6 animate-pop">
        <header className="border-b pb-4 mb-6">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Referencias</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Personas que certifiquen su cumplimiento</p>
        </header>
        <button onClick={addReference} className="w-full bg-slate-100 text-slate-900 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-tyYellow transition flex items-center justify-center gap-2"><Plus size={14}/> Nueva Referencia</button>
        <div className="space-y-4">
            {data.references.map((ref: any) => (
                <div key={ref.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative group animate-slide-up">
                    <button onClick={() => setData({...data, references: data.references.filter((r: any) => r.id !== ref.id)})} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-all"><Trash2 size={18}/></button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ModernInput label="Nombre de Referencia" value={ref.name} onChange={(e: any) => updateReference(ref.id, 'name', e.target.value)} />
                        <ModernInput label="Ocupación o Profesión" value={ref.profession} onChange={(e: any) => updateReference(ref.id, 'profession', e.target.value)} />
                        <ModernInput label="Número Telefónico" value={ref.phone} onChange={(e: any) => updateReference(ref.id, 'phone', e.target.value)} />
                    </div>
                </div>
            ))}
        </div>
    </div>
);
