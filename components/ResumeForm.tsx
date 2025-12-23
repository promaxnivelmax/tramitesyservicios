
import React, { useState, useCallback } from 'react';
import { ResumeData, EducationType, Education, Experience, Reference, Attachment } from '../types';
import { Plus, Trash2, ArrowRight, ArrowLeft, Check, Save, Upload, X, AlertCircle, FileText, Briefcase, GraduationCap, Users, Layout, Image as ImageIcon, Award, Loader2, Clock } from 'lucide-react';

interface Props {
  initialData: ResumeData;
  onComplete: (data: ResumeData) => void;
  onCancel: () => void;
}

interface ProcessingItem {
  id: string;
  name: string;
  progress: number;
  status: 'pending' | 'processing' | 'done' | 'error';
}

export const ResumeForm: React.FC<Props> = ({ initialData, onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<ResumeData>(initialData);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingQueue, setProcessingQueue] = useState<ProcessingItem[]>([]);

  // --- Image Compression Utility (Optimized) ---
  const compressImage = (file: File, maxWidth = 1200): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          // Wrap canvas operations in requestAnimationFrame to ensure we don't block frame rendering
          requestAnimationFrame(() => {
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
            
            // Incremental yield to prevent blocking
            setTimeout(() => {
              const compressedBase64 = canvas.toDataURL('image/jpeg', 0.75); // Slightly lower quality for better speed/size
              resolve(compressedBase64);
            }, 0);
          });
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  };

  const handleChangePersonal = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setData({
      ...data,
      personal: { ...data.personal, [e.target.name]: e.target.value }
    });
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsProcessing(true);
      try {
        const compressed = await compressImage(file, 600);
        setData({
          ...data,
          personal: { ...data.personal, photo: compressed }
        });
      } catch (err) {
        console.error("Image processing error", err);
        alert("Error al procesar la imagen");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  // Improved processFiles with incremental updates and non-blocking loop
  const processFiles = async (files: File[]) => {
    const imageFiles = files.filter(f => f.type.startsWith('image/'));
    if (imageFiles.length === 0) return;

    setIsProcessing(true);
    
    // Initialize queue
    const initialQueue: ProcessingItem[] = imageFiles.map(f => ({
      id: Math.random().toString(36).substr(2, 9),
      name: f.name,
      progress: 0,
      status: 'pending'
    }));
    setProcessingQueue(prev => [...prev, ...initialQueue]);

    // Fixed: replaced .size with .length for array iteration
    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      const queueId = initialQueue[i].id;

      setProcessingQueue(prev => prev.map(item => 
        item.id === queueId ? { ...item, status: 'processing', progress: 30 } : item
      ));

      try {
        const compressed = await compressImage(file, 1200);
        
        const newAttachment: Attachment = {
          id: Date.now().toString() + Math.random().toString().substr(2, 9),
          title: file.name,
          image: compressed
        };

        // Update main data incrementally so user sees progress
        setData(prev => ({
          ...prev,
          attachments: [...(prev.attachments || []), newAttachment]
        }));

        setProcessingQueue(prev => prev.map(item => 
          item.id === queueId ? { ...item, status: 'done', progress: 100 } : item
        ));
      } catch (err) {
        console.error("Processing error for file:", file.name, err);
        setProcessingQueue(prev => prev.map(item => 
          item.id === queueId ? { ...item, status: 'error' } : item
        ));
      }

      // Small delay to allow UI to breathe between files
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    // Clean up finished items from queue after a short delay
    setTimeout(() => {
      setProcessingQueue(prev => prev.filter(item => item.status !== 'done'));
      if (processingQueue.length === 0) setIsProcessing(false);
    }, 2000);
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

  const addEducation = (isComplementary: boolean = false) => {
     setData({ 
        ...data, 
        education: [
            ...data.education, 
            { 
                id: Date.now().toString(), 
                type: isComplementary ? EducationType.CURSO : EducationType.SECUNDARIA, 
                institution: '', 
                title: '', 
                year: new Date().getFullYear().toString(), 
                city: '' 
            }
        ] 
     });
  };
  
  const removeEducation = (id: string) => setData({ ...data, education: data.education.filter(e => e.id !== id) });
  const updateEducation = (id: string, field: keyof Education, value: string) => {
      setData({ ...data, education: data.education.map(e => e.id === id ? { ...e, [field]: value } : e) });
  };

  const addExperience = () => setData({ ...data, experience: [...data.experience, { id: Date.now().toString(), company: '', position: '', startDate: '', endDate: '', city: '', current: false }] });
  const removeExperience = (id: string) => setData({ ...data, experience: data.experience.filter(o => o.id !== id) });
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
      
      {/* Sidebar Navigation */}
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
         
         <div className="md:hidden bg-white p-4 shadow-sm flex items-center justify-between sticky top-0 z-20">
             <span className="font-bold text-tyGrey">Paso {step}: {steps[step-1].title}</span>
             <div className="flex gap-2">
                 <button onClick={() => setStep(Math.max(1, step-1))} disabled={step===1} className="p-2 bg-gray-100 rounded-full disabled:opacity-50"><ArrowLeft size={16}/></button>
                 <button onClick={() => setStep(Math.min(6, step+1))} disabled={step===6} className="p-2 bg-tyYellow rounded-full text-white disabled:opacity-50"><ArrowRight size={16}/></button>
             </div>
         </div>

         <div className="flex-1 p-4 md:p-10 max-w-5xl mx-auto w-full pb-24">
            
            {step === 1 && (
              <div className="space-y-8 animate-pop">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                      <div className="w-full md:w-1/3 flex flex-col items-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                          <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-gray-50 shadow-inner mb-4 bg-gray-100 flex items-center justify-center group">
                              {data.personal.photo ? (
                                <img src={data.personal.photo} alt="Profile" className="w-full h-full object-cover" />
                              ) : (
                                isProcessing ? <Loader2 className="animate-spin text-tyYellow" size={40}/> : <Users className="text-gray-400" size={48} />
                              )}
                              <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white cursor-pointer transition-all duration-300">
                                  <Upload size={24} className="mb-1"/>
                                  <span className="text-xs font-bold">Cambiar Foto</span>
                                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                              </label>
                          </div>
                          {data.personal.photo && (
                              <button onClick={() => setData({...data, personal: {...data.personal, photo: undefined}})} className="text-red-400 text-xs font-bold hover:text-red-600 flex items-center gap-1">
                                  <Trash2 size={12}/> Eliminar Foto
                              </button>
                          )}
                      </div>

                      <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-5">
                          <ModernInput label="Nombres" name="firstName" value={data.personal.firstName} onChange={handleChangePersonal} />
                          <ModernInput label="Apellidos" name="lastName" value={data.personal.lastName} onChange={handleChangePersonal} />
                          <div className="md:col-span-2">
                             <ModernInput label="Título o Perfil Profesional" name="professionalTitle" value={data.personal.professionalTitle} onChange={handleChangePersonal} placeholder="Ej. Contador Público / Auxiliar de Bodega" />
                          </div>
                          <div className="col-span-1">
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Tipo Documento</label>
                            <select name="docType" value={data.personal.docType} onChange={handleChangePersonal} className="w-full bg-gray-50 border border-transparent text-sm rounded-xl focus:ring-2 focus:ring-tyYellow focus:bg-white p-3 shadow-sm appearance-none transition-all">
                                <option value="CC">Cédula de Ciudadanía</option>
                                <option value="TI">Tarjeta de Identidad</option>
                                <option value="CE">Cédula de Extranjería</option>
                                <option value="PAS">Pasaporte</option>
                            </select>
                          </div>
                          <ModernInput label="Número Documento" name="docNumber" value={data.personal.docNumber} onChange={handleChangePersonal} />
                          <ModernInput label="Expedido en" name="expeditionPlace" value={data.personal.expeditionPlace} onChange={handleChangePersonal} />
                          <ModernInput label="Fecha Nacimiento" type="date" name="birthDate" value={data.personal.birthDate} onChange={handleChangePersonal} />
                          <ModernInput label="Celular" name="phone" value={data.personal.phone} onChange={handleChangePersonal} />
                          <ModernInput label="Email" type="email" name="email" value={data.personal.email} onChange={handleChangePersonal} />
                          <ModernInput label="Ciudad" name="city" value={data.personal.city} onChange={handleChangePersonal} />
                          <ModernInput label="Dirección" name="address" value={data.personal.address} onChange={handleChangePersonal} />
                          <ModernInput label="Barrio" name="neighborhood" value={data.personal.neighborhood} onChange={handleChangePersonal} />
                      </div>
                  </div>
              </div>
            )}

            {step === 2 && (
               <div className="space-y-10 animate-pop max-w-3xl mx-auto">
                  <div className="space-y-4">
                      <div className="flex justify-between items-center bg-blue-50 p-4 rounded-xl border border-blue-100">
                         <h3 className="font-bold text-blue-900 text-sm">Formación Académica</h3>
                         <button onClick={() => addEducation(false)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2"><Plus size={14}/> Agregar</button>
                      </div>
                      {data.education.filter(e => ![EducationType.DIPLOMADO, EducationType.CURSO, EducationType.COMPETENCIA].includes(e.type)).map((edu) => (
                          <div key={edu.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative group">
                              <button onClick={() => removeEducation(edu.id)} className="absolute top-4 right-4 text-red-400 hover:text-red-600"><Trash2 size={18}/></button>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                 <div className="md:col-span-2">
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Nivel</label>
                                    <select value={edu.type} onChange={(e) => updateEducation(edu.id, 'type', e.target.value as EducationType)} className="w-full bg-gray-50 border border-transparent text-sm rounded-xl focus:ring-2 focus:ring-tyYellow focus:bg-white p-3 shadow-sm transition-all">
                                      {Object.values(EducationType).filter(v => ![EducationType.DIPLOMADO, EducationType.CURSO, EducationType.COMPETENCIA].includes(v)).map(v => (
                                        <option key={v} value={v}>{v}</option>
                                      ))}
                                    </select>
                                 </div>
                                 <ModernInput label="Institución" value={edu.institution} onChange={(e: any) => updateEducation(edu.id, 'institution', e.target.value)} />
                                 <ModernInput label="Título" value={edu.title} onChange={(e: any) => updateEducation(edu.id, 'title', e.target.value)} />
                                 <ModernInput label="Año" value={edu.year} onChange={(e: any) => updateEducation(edu.id, 'year', e.target.value)} />
                                 <ModernInput label="Ciudad" value={edu.city} onChange={(e: any) => updateEducation(edu.id, 'city', e.target.value)} />
                              </div>
                          </div>
                      ))}
                  </div>
               </div>
            )}

            {step === 3 && (
                <div className="space-y-6 animate-pop max-w-3xl mx-auto">
                   <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                      <button onClick={() => setData({...data, hasExperience: !data.hasExperience})} className={`w-12 h-6 rounded-full p-1 transition-colors ${data.hasExperience ? 'bg-tyYellow' : 'bg-gray-300'}`}>
                          <div className={`w-4 h-4 bg-white rounded-full transform transition ${data.hasExperience ? 'translate-x-6' : 'translate-x-0'}`}></div>
                      </button>
                      <span className="font-bold text-gray-700">¿Tienes experiencia laboral?</span>
                   </div>
                   {data.hasExperience && (
                      <div className="space-y-6">
                        <button onClick={addExperience} className="bg-tyGrey text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 ml-auto"><Plus size={14}/> Nueva Experiencia</button>
                        {data.experience.map((exp) => (
                           <div key={exp.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative group">
                              <button onClick={() => removeExperience(exp.id)} className="absolute top-4 right-4 text-red-400 hover:text-red-600"><Trash2 size={18}/></button>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                 <ModernInput label="Empresa" value={exp.company} onChange={(e: any) => updateExperience(exp.id, 'company', e.target.value)} />
                                 <ModernInput label="Cargo" value={exp.position} onChange={(e: any) => updateExperience(exp.id, 'position', e.target.value)} />
                                 <ModernInput label="Ciudad" value={exp.city} onChange={(e: any) => updateExperience(exp.id, 'city', e.target.value)} />
                                 <div className="flex items-end pb-2">
                                    <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                        <input type="checkbox" checked={exp.current} onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)} className="w-4 h-4 text-tyYellow rounded" />
                                        Trabajo actual
                                    </label>
                                 </div>
                                 <ModernInput label="Fecha Inicio" type="date" value={exp.startDate} onChange={(e: any) => updateExperience(exp.id, 'startDate', e.target.value)} />
                                 {!exp.current && <ModernInput label="Fecha Fin" type="date" value={exp.endDate} onChange={(e: any) => updateExperience(exp.id, 'endDate', e.target.value)} />}
                              </div>
                           </div>
                        ))}
                      </div>
                   )}
                </div>
            )}

            {step === 4 && (
                <div className="space-y-6 animate-pop max-w-3xl mx-auto">
                    <div className="flex justify-between items-center bg-green-50 p-4 rounded-xl border border-green-100">
                        <h3 className="font-bold text-green-900 text-sm">Referencias</h3>
                        <button onClick={addReference} className="bg-green-600 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2"><Plus size={14}/> Agregar</button>
                    </div>
                    {data.references.map((ref) => (
                        <div key={ref.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative group">
                             <button onClick={() => removeReference(ref.id)} className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition"><Trash2 size={18}/></button>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <ModernInput label="Nombre" value={ref.name} onChange={(e: any) => updateReference(ref.id, 'name', e.target.value)} />
                                <ModernInput label="Profesión" value={ref.profession} onChange={(e: any) => updateReference(ref.id, 'profession', e.target.value)} />
                                <ModernInput label="Teléfono" value={ref.phone} onChange={(e: any) => updateReference(ref.id, 'phone', e.target.value)} />
                             </div>
                        </div>
                    ))}
                </div>
            )}

            {step === 5 && (
                <div className="animate-pop">
                    <h2 className="text-xl font-heading font-bold text-center text-tyGrey mb-10 uppercase tracking-widest">Elige tu Diseño</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <DesignCard id="design-a" current={data.templateId} onSelect={() => setData({...data, templateId: 'design-a'})} color="bg-[#1a1a1a]" title="Ejecutivo" desc="Sobrio y de alto impacto." />
                        <DesignCard id="design-red" current={data.templateId} onSelect={() => setData({...data, templateId: 'design-red'})} color="bg-red-800" title="Dinámico" desc="Energético y llamativo." />
                        <DesignCard id="design-green" current={data.templateId} onSelect={() => setData({...data, templateId: 'design-green'})} color="bg-emerald-900" title="Salud/Eco" desc="Tonos verdes relajantes." />
                        <DesignCard id="design-orange" current={data.templateId} onSelect={() => setData({...data, templateId: 'design-orange'})} color="bg-orange-600" title="Impacto" desc="Naranja profesional." />
                        <DesignCard id="ats" current={data.templateId} onSelect={() => setData({...data, templateId: 'ats'})} color="bg-black" title="ATS" desc="Formato de lectura fácil." />
                    </div>
                </div>
            )}

            {step === 6 && (
                <div className="animate-pop max-w-4xl mx-auto">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex gap-3 items-center">
                         <AlertCircle className="text-blue-500 shrink-0" />
                         <p className="text-sm text-blue-700 font-bold">Tus documentos se optimizan al subirse para garantizar una carga ultra-rápida y sin bloqueos.</p>
                    </div>

                    {/* Processing Queue UI */}
                    {processingQueue.length > 0 && (
                      <div className="mb-6 space-y-3">
                        <h4 className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2"><Clock size={14}/> Procesando en segundo plano</h4>
                        <div className="space-y-2">
                          {processingQueue.map(item => (
                            <div key={item.id} className="bg-white p-3 rounded-xl border border-gray-100 flex items-center justify-between shadow-sm animate-pulse">
                              <div className="flex items-center gap-3 overflow-hidden">
                                {item.status === 'processing' ? <Loader2 size={16} className="animate-spin text-tyYellow shrink-0" /> : <Clock size={16} className="text-gray-300" />}
                                <span className="text-xs font-medium text-gray-600 truncate">{item.name}</span>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                  <div className="h-full bg-tyYellow transition-all duration-300" style={{ width: `${item.progress}%` }}></div>
                                </div>
                                <span className={`text-[10px] font-bold uppercase ${item.status === 'done' ? 'text-green-500' : item.status === 'error' ? 'text-red-500' : 'text-gray-400'}`}>
                                  {item.status === 'done' ? 'Listo' : item.status === 'error' ? 'Error' : 'Compriendo...'}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div 
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onClick={() => document.getElementById('file-upload-attachments')?.click()}
                        className={`border-3 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all min-h-[200px] mb-8 ${isDragging ? 'border-tyYellow bg-yellow-50' : 'border-gray-300 bg-gray-50 hover:bg-white'}`}
                    >
                         <Upload size={32} className="text-gray-400 mb-4" />
                         <h3 className="text-lg font-bold text-tyGrey">Sube tus soportes</h3>
                         <p className="text-xs text-gray-400 mt-1">Arrastra tus fotos o haz clic aquí. Se procesarán individualmente para evitar errores.</p>
                         <input id="file-upload-attachments" type="file" accept="image/*" multiple className="hidden" onChange={handleAttachmentUpload} />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {data.attachments && data.attachments.map((att) => (
                            <div key={att.id} className="relative group bg-white p-2 rounded-xl shadow-sm border border-gray-100 h-fit">
                                <img src={att.image} alt={att.title} className="aspect-[3/4] w-full object-cover rounded-lg" />
                                <button onClick={() => removeAttachment(att.id)} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition"><X size={14}/></button>
                                <p className="text-[10px] mt-1 truncate text-gray-400 font-bold px-1">{att.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
         </div>

         {/* Bottom Action Bar */}
         <div className="sticky bottom-0 bg-white border-t p-4 shadow-lg z-30 flex justify-between items-center md:px-10">
              <button onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1} className="px-6 py-2 rounded-lg text-gray-500 font-bold hover:bg-gray-100 disabled:opacity-30 transition">Atrás</button>
              <div className="flex gap-4">
                  {step < 6 ? (
                      <button onClick={() => setStep(step + 1)} className="bg-tyGrey text-white px-8 py-2 rounded-lg font-bold flex items-center gap-2 shadow-md">Siguiente <ArrowRight size={18} /></button>
                  ) : (
                      <button onClick={() => onComplete(data)} disabled={isProcessing} className="bg-tyYellow text-tyGrey px-8 py-2 rounded-lg font-bold shadow-lg hover:scale-105 transition flex items-center gap-2 disabled:opacity-50">
                        {isProcessing ? <Loader2 className="animate-spin" size={18}/> : <Save size={18} />} Finalizar
                      </button>
                  )}
              </div>
         </div>
      </div>
    </div>
  );
};

const DesignCard: React.FC<any> = ({ id, current, onSelect, color, title, desc }) => (
    <div onClick={onSelect} className={`cursor-pointer rounded-xl overflow-hidden border-2 transition h-40 flex flex-col bg-white ${current === id ? 'border-tyYellow shadow-xl scale-105' : 'border-gray-100'}`}>
        <div className={`h-20 ${color}`}></div>
        <div className="p-3 text-center flex-1">
            <h3 className="font-bold text-tyGrey text-xs mb-1">{title}</h3>
            <p className="text-[10px] text-gray-400">{desc}</p>
        </div>
    </div>
);

const ModernInput: React.FC<any> = ({ label, ...props }) => (
  <div className="w-full">
    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</label>
    <input className="w-full bg-gray-50 border border-transparent text-sm rounded-xl focus:ring-2 focus:ring-tyYellow focus:bg-white p-3 shadow-sm transition-all" {...props} />
  </div>
);
