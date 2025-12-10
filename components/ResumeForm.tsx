import React, { useState } from 'react';
import { ResumeData, EducationType, Education, Experience, Reference, Attachment } from '../types';
import { Plus, Trash2, ArrowRight, ArrowLeft, Check, Save, Upload, X, AlertCircle, FileText, Briefcase, GraduationCap, Users, Layout, Image as ImageIcon } from 'lucide-react';

interface Props {
  initialData: ResumeData;
  onComplete: (data: ResumeData) => void;
  onCancel: () => void;
}

export const ResumeForm: React.FC<Props> = ({ initialData, onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<ResumeData>(initialData);
  const [isDragging, setIsDragging] = useState(false);

  // --- Handlers ---
  const handleChangePersonal = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setData({
      ...data,
      personal: { ...data.personal, [e.target.name]: e.target.value }
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData({
          ...data,
          personal: { ...data.personal, photo: reader.result as string }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setData({ ...data, personal: { ...data.personal, photo: undefined } });
  }

  const processFiles = (files: File[]) => {
    files.forEach(file => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onloadend = () => {
        setData(prevData => {
            const newAttachment: Attachment = {
                id: Date.now().toString() + Math.random().toString().substr(2, 9),
                title: file.name,
                image: reader.result as string
            };
            return {
                ...prevData,
                attachments: [...(prevData.attachments || []), newAttachment]
            };
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAttachmentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(Array.from(e.target.files));
      e.target.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation(); setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) processFiles(Array.from(e.dataTransfer.files));
  }

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); }
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); }

  const removeAttachment = (id: string) => {
      setData({ ...data, attachments: data.attachments.filter(a => a.id !== id) })
  }

  const moveAttachment = (index: number, direction: 'UP' | 'DOWN') => {
      const newAttachments = [...(data.attachments || [])];
      if (direction === 'UP' && index > 0) {
          [newAttachments[index], newAttachments[index - 1]] = [newAttachments[index - 1], newAttachments[index]];
      } else if (direction === 'DOWN' && index < newAttachments.length - 1) {
          [newAttachments[index], newAttachments[index + 1]] = [newAttachments[index + 1], newAttachments[index]];
      }
      setData({...data, attachments: newAttachments});
  }

  // --- List Handlers ---
  const addEducation = () => setData({ ...data, education: [...data.education, { id: Date.now().toString(), type: EducationType.SECUNDARIA, institution: '', title: '', year: '', city: '' }] });
  const removeEducation = (id: string) => setData({ ...data, education: data.education.filter(e => e.id !== id) });
  const updateEducation = (id: string, field: keyof Education, value: string) => setData({ ...data, education: data.education.map(e => e.id === id ? { ...e, [field]: value } : e) });

  const addExperience = () => setData({ ...data, experience: [...data.experience, { id: Date.now().toString(), company: '', position: '', startDate: '', endDate: '', city: '', current: false }] });
  const removeExperience = (id: string) => setData({ ...data, experience: data.experience.filter(e => e.id !== id) });
  const updateExperience = (id: string, field: keyof Experience, value: any) => setData({ ...data, experience: data.experience.map(e => e.id === id ? { ...e, [field]: value } : e) });

  const addReference = () => setData({ ...data, references: [...data.references, { id: Date.now().toString(), type: 'Personal', name: '', profession: '', phone: '' }] });
  const removeReference = (id: string) => setData({ ...data, references: data.references.filter(r => r.id !== id) });
  const updateReference = (id: string, field: keyof Reference, value: string) => setData({ ...data, references: data.references.map(r => r.id === id ? { ...r, [field]: value } : r) });

  const steps = [
    { num: 1, title: "Personal", icon: <FileText size={18}/> },
    { num: 2, title: "Estudios", icon: <GraduationCap size={18}/> },
    { num: 3, title: "Laboral", icon: <Briefcase size={18}/> },
    { num: 4, title: "Referencias", icon: <Users size={18}/> },
    { num: 5, title: "Diseño", icon: <Layout size={18}/> },
    { num: 6, title: "Soportes", icon: <ImageIcon size={18}/> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row animate-slide-up font-sans">
      
      {/* Sidebar Navigation (Desktop) */}
      <div className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col sticky top-0 h-screen overflow-y-auto">
         <div className="p-6 border-b border-gray-100">
             <h2 className="font-heading font-bold text-tyGrey text-xl">Editor de CV</h2>
             <p className="text-xs text-gray-400">Paso {step} de 6</p>
         </div>
         <div className="flex-1 py-4">
            {steps.map((s) => (
               <button 
                 key={s.num}
                 onClick={() => setStep(s.num)}
                 className={`w-full flex items-center gap-3 px-6 py-4 transition-all duration-300 border-l-4 ${step === s.num ? 'border-tyYellow bg-yellow-50 text-tyGrey font-bold' : 'border-transparent text-gray-400 hover:bg-gray-50 hover:text-gray-600'}`}
               >
                 <div className={`p-2 rounded-lg ${step === s.num ? 'bg-white shadow-sm text-tyYellow' : 'bg-gray-100'}`}>
                    {s.num < step ? <Check size={16} /> : s.icon}
                 </div>
                 <span>{s.title}</span>
               </button>
            ))}
         </div>
         <div className="p-6 border-t border-gray-100">
             <button onClick={onCancel} className="w-full py-2 text-gray-500 hover:text-red-500 text-sm font-medium transition">
                Salir sin guardar
             </button>
         </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full min-h-screen relative">
         
         {/* Mobile Header Nav */}
         <div className="md:hidden bg-white p-4 shadow-sm flex items-center justify-between sticky top-0 z-20">
             <span className="font-bold text-tyGrey">Paso {step}: {steps[step-1].title}</span>
             <div className="flex gap-2">
                 <button onClick={() => setStep(Math.max(1, step-1))} disabled={step===1} className="p-2 bg-gray-100 rounded-full disabled:opacity-50"><ArrowLeft size={16}/></button>
                 <button onClick={() => setStep(Math.min(6, step+1))} disabled={step===6} className="p-2 bg-tyYellow rounded-full text-white disabled:opacity-50"><ArrowRight size={16}/></button>
             </div>
         </div>

         <div className="flex-1 p-4 md:p-10 max-w-5xl mx-auto w-full pb-24">
            
            {/* STEP 1: PERSONAL */}
            {step === 1 && (
              <div className="space-y-8 animate-pop">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                      {/* Photo Section */}
                      <div className="w-full md:w-1/3 flex flex-col items-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                          <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-gray-50 shadow-inner mb-4 bg-gray-100 flex items-center justify-center group">
                              {data.personal.photo ? (
                                <img src={data.personal.photo} alt="Profile" className="w-full h-full object-cover" />
                              ) : (
                                <UserIconPlaceholder />
                              )}
                              <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white cursor-pointer transition-all duration-300">
                                  <Upload size={24} className="mb-1"/>
                                  <span className="text-xs font-bold">Cambiar Foto</span>
                                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                              </label>
                          </div>
                          {data.personal.photo && (
                              <button onClick={removePhoto} className="text-red-400 text-xs font-bold hover:text-red-600 flex items-center gap-1">
                                  <Trash2 size={12}/> Eliminar Foto
                              </button>
                          )}
                          <p className="text-center text-gray-400 text-xs mt-4">Recomendado: Fondo blanco, rostro descubierto, buena iluminación.</p>
                      </div>

                      {/* Inputs Section */}
                      <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-5">
                          <ModernInput label="Nombres" name="firstName" value={data.personal.firstName} onChange={handleChangePersonal} placeholder="Ej. Juan Carlos" />
                          <ModernInput label="Apellidos" name="lastName" value={data.personal.lastName} onChange={handleChangePersonal} placeholder="Ej. Pérez Gómez" />
                          
                          <div className="col-span-1">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Tipo Documento</label>
                            <div className="relative">
                                <select 
                                    name="docType" 
                                    value={data.personal.docType} 
                                    onChange={handleChangePersonal} 
                                    className="w-full bg-white border border-gray-200 text-gray-800 text-sm rounded-xl focus:ring-2 focus:ring-tyYellow focus:border-transparent block p-3 appearance-none shadow-sm transition-all"
                                >
                                    <option value="CC">Cédula de Ciudadanía</option>
                                    <option value="TI">Tarjeta de Identidad</option>
                                    <option value="CE">Cédula de Extranjería</option>
                                    <option value="PAS">Pasaporte</option>
                                </select>
                            </div>
                          </div>
                          <ModernInput label="Número Documento" name="docNumber" value={data.personal.docNumber} onChange={handleChangePersonal} />
                          <ModernInput label="Expedido en" name="expeditionPlace" value={data.personal.expeditionPlace} onChange={handleChangePersonal} />
                          <ModernInput label="Fecha Nacimiento" type="date" name="birthDate" value={data.personal.birthDate} onChange={handleChangePersonal} />
                          <ModernInput label="Lugar Nacimiento" name="birthPlace" value={data.personal.birthPlace} onChange={handleChangePersonal} />
                          <ModernInput label="Celular / WhatsApp" name="phone" value={data.personal.phone} onChange={handleChangePersonal} />
                          <ModernInput label="Email" type="email" name="email" value={data.personal.email} onChange={handleChangePersonal} />
                          <ModernInput label="Ciudad Residencia" name="city" value={data.personal.city} onChange={handleChangePersonal} />
                          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5">
                             <ModernInput label="Dirección" name="address" value={data.personal.address} onChange={handleChangePersonal} />
                             <ModernInput label="Barrio" name="neighborhood" value={data.personal.neighborhood} onChange={handleChangePersonal} />
                          </div>
                      </div>
                  </div>
              </div>
            )}

            {/* STEP 2: EDUCATION */}
            {step === 2 && (
               <div className="space-y-6 animate-pop max-w-3xl mx-auto">
                  <div className="flex justify-between items-center bg-blue-50 p-4 rounded-xl border border-blue-100">
                     <div>
                        <h3 className="font-bold text-blue-900">Historial Académico</h3>
                        <p className="text-xs text-blue-600">Agrega tus estudios desde el más reciente.</p>
                     </div>
                     <button onClick={addEducation} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md transition transform hover:scale-105 flex items-center gap-2">
                        <Plus size={16}/> Agregar
                     </button>
                  </div>

                  {data.education.map((edu, idx) => (
                      <div key={edu.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative group hover:shadow-md transition">
                          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition">
                              <button onClick={() => removeEducation(edu.id)} className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition"><Trash2 size={18}/></button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                             <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Nivel Educativo</label>
                                <select 
                                  value={edu.type} 
                                  onChange={(e) => updateEducation(edu.id, 'type', e.target.value)} 
                                  className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-tyYellow rounded-lg p-2.5 text-sm transition-all"
                                >
                                  {Object.values(EducationType).map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                             </div>
                             <ModernInput label="Institución Educativa" value={edu.institution} onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)} />
                             <ModernInput label="Título Obtenido" value={edu.title} onChange={(e) => updateEducation(edu.id, 'title', e.target.value)} />
                             <ModernInput label="Año Finalización" value={edu.year} onChange={(e) => updateEducation(edu.id, 'year', e.target.value)} />
                             <ModernInput label="Ciudad" value={edu.city} onChange={(e) => updateEducation(edu.id, 'city', e.target.value)} />
                          </div>
                      </div>
                  ))}
                  {data.education.length === 0 && <EmptyState text="No hay estudios registrados" icon={<GraduationCap size={40}/>} />}
               </div>
            )}

            {/* STEP 3: EXPERIENCE */}
            {step === 3 && (
                <div className="space-y-6 animate-pop max-w-3xl mx-auto">
                   <div className="flex items-center gap-4 mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                      <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 ${data.hasExperience ? 'bg-tyYellow' : 'bg-gray-300'}`} onClick={() => setData({...data, hasExperience: !data.hasExperience})}>
                          <div className={`w-4 h-4 bg-white rounded-full shadow-md transform duration-300 ${data.hasExperience ? 'translate-x-6' : 'translate-x-0'}`}></div>
                      </div>
                      <span className="font-bold text-gray-700">¿Tienes experiencia laboral?</span>
                   </div>

                   {data.hasExperience && (
                      <>
                        <div className="flex justify-end">
                            <button onClick={addExperience} className="bg-tyGrey hover:bg-black text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md transition transform hover:scale-105 flex items-center gap-2">
                                <Plus size={16}/> Nueva Experiencia
                            </button>
                        </div>
                        {data.experience.map((exp) => (
                           <div key={exp.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative group hover:shadow-md transition">
                              <button onClick={() => removeExperience(exp.id)} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition"><Trash2 size={18}/></button>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                 <ModernInput label="Empresa" value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} />
                                 <ModernInput label="Cargo" value={exp.position} onChange={(e) => updateExperience(exp.id, 'position', e.target.value)} />
                                 <ModernInput label="Ciudad" value={exp.city} onChange={(e) => updateExperience(exp.id, 'city', e.target.value)} />
                                 <div className="flex items-end pb-2">
                                    <label className="flex items-center gap-2 text-sm text-gray-700 font-medium cursor-pointer select-none">
                                        <input type="checkbox" checked={exp.current} onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)} className="w-4 h-4 text-tyYellow rounded focus:ring-tyYellow" />
                                        Trabajo actual
                                    </label>
                                 </div>
                                 <ModernInput label="Fecha Inicio" type="date" value={exp.startDate} onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)} />
                                 {!exp.current && (
                                    <ModernInput label="Fecha Fin" type="date" value={exp.endDate} onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)} />
                                 )}
                              </div>
                           </div>
                        ))}
                      </>
                   )}
                </div>
            )}

            {/* STEP 4: REFERENCES */}
            {step === 4 && (
                <div className="space-y-6 animate-pop max-w-3xl mx-auto">
                    <div className="flex justify-between items-center bg-green-50 p-4 rounded-xl border border-green-100">
                        <div>
                            <h3 className="font-bold text-green-900">Referencias Personales / Familiares</h3>
                            <p className="text-xs text-green-600">Recomendamos incluir al menos 2 referencias.</p>
                        </div>
                        <button onClick={addReference} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md transition transform hover:scale-105 flex items-center gap-2">
                            <Plus size={16}/> Agregar
                        </button>
                    </div>
                    {data.references.map((ref) => (
                        <div key={ref.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative group hover:shadow-md transition">
                             <button onClick={() => removeReference(ref.id)} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition"><Trash2 size={18}/></button>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Tipo</label>
                                    <select 
                                      value={ref.type} 
                                      onChange={(e) => updateReference(ref.id, 'type', e.target.value)} 
                                      className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-tyYellow rounded-lg p-2.5 text-sm transition-all"
                                    >
                                        <option value="Personal">Personal</option>
                                        <option value="Familiar">Familiar</option>
                                    </select>
                                </div>
                                <ModernInput label="Nombre Completo" value={ref.name} onChange={(e) => updateReference(ref.id, 'name', e.target.value)} />
                                <ModernInput label="Ocupación / Profesión" value={ref.profession} onChange={(e) => updateReference(ref.id, 'profession', e.target.value)} />
                                <ModernInput label="Teléfono" value={ref.phone} onChange={(e) => updateReference(ref.id, 'phone', e.target.value)} />
                             </div>
                        </div>
                    ))}
                    {data.references.length === 0 && <EmptyState text="Agrega tus referencias" icon={<Users size={40}/>} />}
                </div>
            )}

            {/* STEP 5: DESIGN SELECTION */}
            {step === 5 && (
                <div className="animate-pop">
                    <h2 className="text-2xl font-heading font-bold text-center text-tyGrey mb-10">Elige el estilo de tu Hoja de Vida</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        
                        {/* Design A Card */}
                        <div 
                           onClick={() => setData({...data, templateId: 'design-a'})}
                           className={`group cursor-pointer rounded-2xl overflow-hidden border-4 transition-all duration-300 relative ${data.templateId === 'design-a' ? 'border-tyYellow shadow-2xl scale-105' : 'border-transparent shadow-lg hover:shadow-xl hover:scale-105'}`}
                        >
                            <div className="h-80 bg-gray-100 relative">
                                {/* Simulated Preview */}
                                <div className="absolute inset-4 bg-white shadow flex flex-row overflow-hidden rounded-sm pointer-events-none">
                                    <div className="w-1/3 bg-tyGrey h-full p-2 flex flex-col gap-2">
                                        <div className="w-10 h-10 rounded-full bg-tyYellow mx-auto"></div>
                                        <div className="w-full h-2 bg-gray-600 rounded"></div>
                                        <div className="w-3/4 h-2 bg-gray-600 rounded mx-auto"></div>
                                        <div className="mt-4 w-full h-1 bg-gray-700"></div>
                                        <div className="w-full h-1 bg-gray-700"></div>
                                    </div>
                                    <div className="w-2/3 p-2 flex flex-col gap-2">
                                        <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
                                        <div className="w-full h-16 bg-gray-50 rounded border border-gray-100"></div>
                                        <div className="w-full h-16 bg-gray-50 rounded border border-gray-100"></div>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-tyGrey/0 group-hover:bg-tyGrey/10 transition-colors"></div>
                                {data.templateId === 'design-a' && (
                                    <div className="absolute top-4 right-4 bg-tyYellow text-tyGrey p-2 rounded-full shadow-lg">
                                        <Check size={20} strokeWidth={3} />
                                    </div>
                                )}
                            </div>
                            <div className="p-6 bg-white">
                                <h3 className="font-bold text-xl text-tyGrey mb-1">Ejecutivo Moderno</h3>
                                <p className="text-sm text-gray-500">Ideal para perfiles administrativos y operativos. Alto contraste y estructura clara.</p>
                            </div>
                        </div>

                        {/* Design B Card */}
                        <div 
                           onClick={() => setData({...data, templateId: 'design-b'})}
                           className={`group cursor-pointer rounded-2xl overflow-hidden border-4 transition-all duration-300 relative ${data.templateId === 'design-b' ? 'border-tyLilac shadow-2xl scale-105' : 'border-transparent shadow-lg hover:shadow-xl hover:scale-105'}`}
                        >
                            <div className="h-80 bg-gray-100 relative">
                                {/* Simulated Preview */}
                                <div className="absolute inset-4 bg-white shadow flex flex-col overflow-hidden rounded-sm pointer-events-none">
                                    <div className="h-16 bg-tySoftPink flex items-center px-4 gap-2 border-b-2 border-tyLilac">
                                        <div className="w-10 h-10 rounded-full bg-white border-2 border-tyLilac"></div>
                                        <div className="flex-1">
                                            <div className="w-20 h-2 bg-tyPurple rounded mb-1"></div>
                                            <div className="w-12 h-1 bg-tyLilac/50 rounded"></div>
                                        </div>
                                    </div>
                                    <div className="flex-1 p-2 grid grid-cols-2 gap-2">
                                        <div className="space-y-1">
                                            <div className="w-full h-2 bg-gray-100 rounded"></div>
                                            <div className="w-full h-2 bg-gray-100 rounded"></div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="w-full h-10 bg-tySoftPink/30 rounded border border-tySoftPink"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-tyLilac/0 group-hover:bg-tyLilac/5 transition-colors"></div>
                                {data.templateId === 'design-b' && (
                                    <div className="absolute top-4 right-4 bg-tyLilac text-white p-2 rounded-full shadow-lg">
                                        <Check size={20} strokeWidth={3} />
                                    </div>
                                )}
                            </div>
                            <div className="p-6 bg-white">
                                <h3 className="font-bold text-xl text-tyPurple mb-1">Creativo & Elegante</h3>
                                <p className="text-sm text-gray-500">Diseño sofisticado con toques de color suaves. Perfecto para destacar personalidad.</p>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {/* STEP 6: ATTACHMENTS */}
            {step === 6 && (
                <div className="animate-pop max-w-4xl mx-auto">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex gap-3">
                         <AlertCircle className="text-blue-500 shrink-0" />
                         <div>
                             <p className="text-sm text-blue-800 font-bold mb-1">Importante</p>
                             <p className="text-sm text-blue-700">Arrastra tus soportes aquí. El orden en que aparezcan será el orden en el PDF final. Usa las flechas para organizar.</p>
                         </div>
                    </div>

                    <div 
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onClick={() => document.getElementById('file-upload-attachments')?.click()}
                        className={`border-3 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 min-h-[250px] mb-8 ${isDragging ? 'border-tyYellow bg-yellow-50 scale-102' : 'border-gray-300 bg-gray-50 hover:bg-white hover:border-gray-400 hover:shadow-lg'}`}
                    >
                         <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors ${isDragging ? 'bg-tyYellow text-white' : 'bg-gray-200 text-gray-400'}`}>
                            <Upload size={32} />
                         </div>
                         <h3 className="text-lg font-bold text-tyGrey">Sube tus documentos</h3>
                         <p className="text-sm text-gray-500 mt-1">Imágenes (JPG, PNG) de tus certificados, diplomas, cédula, etc.</p>
                         <input id="file-upload-attachments" type="file" accept="image/*" multiple className="hidden" onChange={handleAttachmentUpload} />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {data.attachments && data.attachments.map((att, index) => (
                            <div key={att.id} className="relative group bg-white p-2 rounded-xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
                                <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-2 relative">
                                    <img src={att.image} alt={att.title} className="w-full h-full object-cover" />
                                    {/* Overlay Controls */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                                        <button onClick={(e) => {e.stopPropagation(); moveAttachment(index, 'UP')}} disabled={index === 0} className="p-1.5 bg-white/20 hover:bg-white/40 rounded text-white disabled:opacity-30"><ArrowLeft size={16} className="rotate-90 md:rotate-0"/></button>
                                        <button onClick={(e) => {e.stopPropagation(); moveAttachment(index, 'DOWN')}} disabled={index === data.attachments.length - 1} className="p-1.5 bg-white/20 hover:bg-white/40 rounded text-white disabled:opacity-30"><ArrowRight size={16} className="rotate-90 md:rotate-0"/></button>
                                    </div>
                                </div>
                                <button onClick={() => removeAttachment(att.id)} className="absolute -top-2 -right-2 bg-white text-red-500 border border-gray-100 p-1.5 rounded-full shadow-md hover:bg-red-50 transition z-10"><X size={14}/></button>
                                <div className="px-1">
                                    <p className="text-xs font-bold text-gray-400 mb-0.5">Página {index + 1}</p>
                                    <p className="text-xs font-medium text-gray-700 truncate">{att.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
         </div>

         {/* Bottom Action Bar */}
         <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 shadow-lg z-30 flex justify-between items-center md:px-10">
              <button 
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className="px-6 py-2.5 rounded-lg text-gray-600 font-bold hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent transition"
              >
                Atrás
              </button>

              <div className="flex gap-4">
                  {step < 6 ? (
                      <button 
                        onClick={() => setStep(Math.min(6, step + 1))}
                        className="bg-tyGrey text-white px-8 py-2.5 rounded-lg font-bold hover:bg-gray-800 shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 flex items-center gap-2"
                      >
                        Siguiente <ArrowRight size={18} />
                      </button>
                  ) : (
                      <button 
                        onClick={() => onComplete(data)}
                        className="bg-tyYellow text-tyGrey px-8 py-2.5 rounded-lg font-bold hover:bg-yellow-500 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 flex items-center gap-2 animate-pulse"
                      >
                        <Save size={18} /> Guardar Hoja de Vida
                      </button>
                  )}
              </div>
         </div>

      </div>
    </div>
  );
};

// --- Modern UI Components ---

const ModernInput: React.FC<any> = ({ label, ...props }) => (
  <div className="w-full group">
    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 group-focus-within:text-tyYellow transition-colors">{label}</label>
    <input 
      className="w-full bg-gray-50 border border-transparent text-gray-800 text-sm rounded-xl focus:ring-2 focus:ring-tyYellow focus:bg-white focus:border-transparent block p-3 shadow-sm placeholder-gray-400 transition-all duration-300"
      {...props}
    />
  </div>
);

const EmptyState: React.FC<{text: string, icon: React.ReactNode}> = ({ text, icon }) => (
    <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
        <div className="text-gray-300 mb-3">{icon}</div>
        <p className="text-gray-400 font-medium text-sm">{text}</p>
    </div>
);

const UserIconPlaceholder = () => (
    <svg className="w-20 h-20 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);