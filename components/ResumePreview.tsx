import React from 'react';
import { ResumeData } from '../types';
import { MapPin, Phone, Mail, Calendar, User, Briefcase, GraduationCap, Users } from 'lucide-react';

interface Props {
  data: ResumeData;
  onEdit: () => void;
  onExit: () => void;
}

export const ResumePreview: React.FC<Props> = ({ data, onEdit, onExit }) => {
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-800 py-10 flex flex-col items-center justify-center gap-6 animate-slide-up">
      <div className="no-print flex gap-4 sticky top-4 z-50 bg-gray-800/90 p-4 rounded-xl backdrop-blur-md border border-gray-700 shadow-2xl">
        <button 
          onClick={onExit}
          className="text-gray-300 px-4 py-2 hover:text-white transition font-medium"
        >
          Guardar y Salir
        </button>
         <button 
          onClick={onEdit}
          className="bg-white/10 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-white/20 transition backdrop-blur-sm border border-white/10"
        >
          Editar
        </button>
        <button 
          onClick={handlePrint}
          className="bg-tyYellow text-tyGrey px-6 py-2 rounded-lg font-bold shadow-lg hover:bg-yellow-400 transition transform hover:scale-105"
        >
          Descargar PDF
        </button>
      </div>

      {/* A4 Container - Main Resume */}
      <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl mx-auto print-area relative overflow-hidden">
        {data.templateId === 'design-a' ? (
          <DesignAMasculine data={data} />
        ) : (
          <DesignBFeminine data={data} />
        )}
      </div>

      {/* Attachments Pages */}
      {data.attachments && data.attachments.map((att, index) => (
         <div key={index} className="w-[210mm] min-h-[297mm] bg-white shadow-2xl mx-auto print-area relative overflow-hidden flex flex-col page-break mt-10 print:mt-0">
            {/* Clean Modern Header for Attachments */}
            <div className="bg-gray-50 border-b border-gray-200 p-8 flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 uppercase tracking-widest">Soporte #{index + 1}</h2>
                    <p className="text-gray-500 text-sm mt-1">{att.title}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{data.personal.firstName} {data.personal.lastName}</p>
                    <p className="text-gray-400 text-xs">C.C. {data.personal.docNumber}</p>
                  </div>
            </div>
            
            {/* Image Container */}
            <div className="flex-grow flex items-center justify-center p-10 bg-white">
                <img src={att.image} alt="Soporte" className="max-w-full max-h-[230mm] object-contain" />
            </div>
         </div>
      ))}
    </div>
  );
};

// ==========================================
// DESIGN A: MODERN EXECUTIVE (CANVA STYLE)
// ==========================================
const DesignAMasculine: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div className="flex w-full h-full min-h-[297mm]">
      {/* Sidebar - Dark Modern */}
      <div className="w-[32%] bg-[#1a1a1a] text-white p-8 flex flex-col gap-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-tyYellow opacity-10 rounded-bl-full"></div>

        {/* Photo */}
        <div className="w-40 h-40 mx-auto rounded-full border-[6px] border-[#2a2a2a] overflow-hidden shadow-2xl relative z-10 mt-6">
            {data.personal.photo ? (
               <img src={data.personal.photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
               <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-500"><User size={40}/></div>
            )}
        </div>

        {/* Contact Info */}
        <div className="space-y-6 mt-4">
           <h3 className="text-tyYellow font-bold uppercase tracking-widest text-xs border-b border-gray-700 pb-2">Contacto</h3>
           
           <div className="space-y-4 text-sm font-light text-gray-300">
             <div className="flex gap-3">
                 <div className="mt-1 text-tyYellow"><MapPin size={14}/></div>
                 <div>
                    <p className="text-white font-medium">Ubicación</p>
                    <p>{data.personal.address}</p>
                    <p>{data.personal.city}</p>
                 </div>
             </div>
             <div className="flex gap-3">
                 <div className="mt-1 text-tyYellow"><Phone size={14}/></div>
                 <div>
                    <p className="text-white font-medium">Teléfono</p>
                    <p>{data.personal.phone}</p>
                 </div>
             </div>
             <div className="flex gap-3">
                 <div className="mt-1 text-tyYellow"><Mail size={14}/></div>
                 <div>
                    <p className="text-white font-medium">Email</p>
                    <p className="break-all">{data.personal.email}</p>
                 </div>
             </div>
           </div>
        </div>

        {/* Personal Details */}
        <div className="space-y-4">
           <h3 className="text-tyYellow font-bold uppercase tracking-widest text-xs border-b border-gray-700 pb-2">Información</h3>
           <div className="text-sm font-light text-gray-300 space-y-2">
              <p><span className="text-white font-medium">CC:</span> {data.personal.docNumber}</p>
              <p><span className="text-white font-medium">Expedición:</span> {data.personal.expeditionPlace}</p>
              <p><span className="text-white font-medium">Nacimiento:</span> {data.personal.birthDate}</p>
           </div>
        </div>

        {/* References in Sidebar */}
        {data.references.length > 0 && (
          <div className="mt-auto">
            <h3 className="text-tyYellow font-bold uppercase tracking-widest text-xs border-b border-gray-700 pb-2 mb-4">Referencias</h3>
            <div className="space-y-4">
              {data.references.map(ref => (
                <div key={ref.id} className="text-sm">
                  <p className="font-bold text-white">{ref.name}</p>
                  <p className="text-gray-400 text-xs uppercase tracking-wider">{ref.profession}</p>
                  <p className="text-tyYellow text-xs mt-1">{ref.phone}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content - Clean & Structured */}
      <div className="w-[68%] p-12 bg-white text-gray-800">
        
        {/* Name Header */}
        <div className="mb-12 border-l-8 border-tyYellow pl-6 py-2">
            <h1 className="text-5xl font-heading font-bold text-gray-900 leading-none uppercase">
              {data.personal.firstName} <br/> <span className="text-gray-400">{data.personal.lastName}</span>
            </h1>
            <p className="text-gray-500 uppercase tracking-widest mt-2 font-medium">Hoja de Vida Profesional</p>
        </div>

        <div className="space-y-12">
            {/* Experience */}
            {data.hasExperience && (
              <section>
                 <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gray-100 p-2 rounded text-gray-800"><Briefcase size={20}/></div>
                    <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">Experiencia Laboral</h2>
                 </div>
                 
                 <div className="space-y-8 pl-2">
                    {data.experience.map(exp => (
                      <div key={exp.id} className="relative pl-8 border-l-2 border-gray-200">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-tyYellow border-2 border-white"></div>
                        <h3 className="font-bold text-xl text-gray-900">{exp.position}</h3>
                        <p className="text-tyYellow font-bold uppercase text-sm mb-1">{exp.company}</p>
                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">
                           {exp.startDate} — {exp.current ? 'ACTUALIDAD' : exp.endDate} | {exp.city}
                        </p>
                      </div>
                    ))}
                 </div>
              </section>
            )}

            {/* Education */}
            <section>
                 <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gray-100 p-2 rounded text-gray-800"><GraduationCap size={20}/></div>
                    <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">Educación</h2>
                 </div>
                 
                 <div className="grid grid-cols-1 gap-6">
                    {data.education.map(edu => (
                      <div key={edu.id} className="bg-gray-50 p-5 rounded-lg border-l-4 border-gray-800">
                        <h3 className="font-bold text-lg text-gray-900">{edu.title}</h3>
                        <p className="text-gray-600 font-medium">{edu.institution}</p>
                        <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200 text-xs text-gray-500">
                           <span className="bg-white px-2 py-1 rounded shadow-sm">{edu.type}</span>
                           <span>{edu.year}</span>
                        </div>
                      </div>
                    ))}
                    {data.education.length === 0 && <p className="text-gray-400 italic">No registrada</p>}
                 </div>
            </section>
        </div>

        {/* Signature */}
        <div className="mt-24 pt-8 border-t border-gray-200">
            <div className="flex items-end gap-4">
                <div className="h-16 w-40 border-b border-black"></div>
                <div>
                   <p className="font-bold text-lg">{data.personal.firstName} {data.personal.lastName}</p>
                   <p className="text-gray-500">C.C. {data.personal.docNumber}</p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

// ==========================================
// DESIGN B: ELEGANT & CREATIVE (CANVA STYLE)
// ==========================================
const DesignBFeminine: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div className="w-full h-full min-h-[297mm] bg-white relative">
      
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-tySoftPink rounded-bl-full opacity-50 z-0"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gray-50 rounded-tr-full z-0"></div>

      <div className="relative z-10 p-12 h-full flex flex-col">
          
          {/* Creative Header */}
          <div className="flex items-center justify-between mb-16">
             <div>
                <p className="text-tyLilac font-bold tracking-[0.2em] uppercase mb-2">Curriculum Vitae</p>
                <h1 className="text-6xl font-heading text-tyPurple leading-none">
                   <span className="font-light block">{data.personal.firstName}</span>
                   <span className="font-bold">{data.personal.lastName}</span>
                </h1>
                <div className="mt-4 flex gap-4 text-sm text-gray-500">
                   <span className="flex items-center gap-1"><Phone size={12}/> {data.personal.phone}</span>
                   <span className="flex items-center gap-1"><Mail size={12}/> {data.personal.email}</span>
                </div>
             </div>
             {data.personal.photo && (
                <div className="w-48 h-48 rounded-full border-4 border-white shadow-2xl overflow-hidden shrink-0">
                   <img src={data.personal.photo} alt="Profile" className="w-full h-full object-cover" />
                </div>
             )}
          </div>

          <div className="flex gap-12 flex-grow">
             
             {/* Left Column (Main Info) */}
             <div className="w-[60%] space-y-10">
                
                {data.hasExperience && (
                  <section>
                     <h2 className="text-2xl font-heading font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <span className="w-8 h-1 bg-tyPurple rounded-full"></span> Experiencia
                     </h2>
                     <div className="space-y-8">
                        {data.experience.map(exp => (
                           <div key={exp.id}>
                              <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                              <div className="flex justify-between items-baseline mb-2">
                                 <p className="text-tyPurple font-medium">{exp.company}</p>
                                 <p className="text-gray-400 text-xs italic">{exp.startDate} - {exp.current ? 'Presente' : exp.endDate}</p>
                              </div>
                              <p className="text-sm text-gray-600 leading-relaxed">
                                 Experiencia desarrollada en la ciudad de {exp.city}, desempeñando funciones clave para el cargo.
                              </p>
                           </div>
                        ))}
                     </div>
                  </section>
                )}

                <section>
                     <h2 className="text-2xl font-heading font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <span className="w-8 h-1 bg-tyPurple rounded-full"></span> Formación
                     </h2>
                     <div className="grid grid-cols-1 gap-4">
                        {data.education.map(edu => (
                           <div key={edu.id} className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
                              <h3 className="font-bold text-gray-900">{edu.title}</h3>
                              <p className="text-tyLilac text-sm">{edu.institution}</p>
                              <p className="text-xs text-gray-400 mt-1">{edu.year} | {edu.city}</p>
                           </div>
                        ))}
                     </div>
                </section>
             </div>

             {/* Right Column (Sidebar Style) */}
             <div className="w-[40%] space-y-10 pt-2">
                
                <div className="bg-white/80 backdrop-blur p-6 rounded-xl border border-tySoftPink shadow-sm">
                   <h3 className="font-bold text-tyPurple uppercase tracking-widest text-sm mb-4">Información Personal</h3>
                   <ul className="space-y-3 text-sm text-gray-600">
                      <li className="flex flex-col border-b border-gray-100 pb-2">
                         <span className="font-bold text-gray-400 text-xs">DIRECCIÓN</span>
                         <span>{data.personal.address}</span>
                         <span>{data.personal.neighborhood}</span>
                      </li>
                      <li className="flex flex-col border-b border-gray-100 pb-2">
                         <span className="font-bold text-gray-400 text-xs">DOCUMENTO</span>
                         <span>{data.personal.docType} {data.personal.docNumber}</span>
                      </li>
                      <li className="flex flex-col">
                         <span className="font-bold text-gray-400 text-xs">ORIGEN</span>
                         <span>{data.personal.birthPlace}</span>
                         <span>{data.personal.birthDate}</span>
                      </li>
                   </ul>
                </div>

                <div>
                   <h3 className="font-bold text-tyPurple uppercase tracking-widest text-sm mb-4">Referencias</h3>
                   <div className="space-y-4">
                      {data.references.map(ref => (
                         <div key={ref.id} className="flex items-start gap-3">
                            <div className="mt-1 text-tyLilac"><User size={16}/></div>
                            <div>
                               <p className="font-bold text-gray-800 text-sm">{ref.name}</p>
                               <p className="text-xs text-gray-500">{ref.profession}</p>
                               <p className="text-xs font-bold text-tyPurple">{ref.phone}</p>
                            </div>
                         </div>
                      ))}
                   </div>
                </div>

             </div>

          </div>
      </div>
    </div>
  );
};