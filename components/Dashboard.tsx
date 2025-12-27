
import React, { useState } from 'react';
import { ResumeData, User } from '../types';
import { Plus, FileText, Edit, Trash2, Briefcase, FileCheck, Globe, GraduationCap, Search as SearchIcon } from 'lucide-react';

interface Props {
  user: User;
  onNewResume: () => void;
  onEditResume: (resume: ResumeData) => void;
  onDeleteResume: (id: string) => void;
  onLogout: () => void;
  onGoToLinks: () => void;
  onGoToCertGen: () => void;
  onGoToTraining: () => void;
}

export const Dashboard: React.FC<Props> = ({ user, onNewResume, onEditResume, onDeleteResume, onGoToLinks, onGoToCertGen, onGoToTraining }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResumes = user.resumes.filter(resume => {
     const positionMatch = resume.experience.some(exp => exp.position.toLowerCase().includes(searchTerm.toLowerCase()));
     const nameMatch = (resume.personal.firstName + ' ' + resume.personal.lastName).toLowerCase().includes(searchTerm.toLowerCase());
     if (searchTerm === '') return true;
     return positionMatch || nameMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 animate-slide-up pb-20 transition-colors duration-500">
      
      <div className="bg-tyGrey dark:bg-gray-900 text-white py-16 px-4 shadow-lg border-b-8 border-tyYellow">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-4xl font-heading font-black tracking-tighter uppercase">Hola, <span className="text-tyYellow">{user.username}</span></h1>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-2">Panel Maestro - Barrancabermeja</p>
          </div>
          <div className="hidden md:flex flex-col items-end">
            <p className="text-xs font-black text-tyYellow uppercase tracking-[0.3em]">Tramites y Servicios</p>
            <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">Santander, Colombia</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 space-y-12">
        
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               <div onClick={onNewResume} className="bg-white dark:bg-gray-900 p-8 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all cursor-pointer border-b-8 border-tyYellow group dark:border-gray-800 hover:-translate-y-2">
                  <div className="p-5 bg-yellow-50 dark:bg-yellow-900/10 rounded-2xl text-tyYellow group-hover:bg-tyYellow group-hover:text-tyGrey transition-all inline-block mb-6 shadow-sm">
                        <Plus size={40} strokeWidth={3} />
                  </div>
                  <h3 className="font-black text-xl text-tyGrey dark:text-white mb-2 uppercase tracking-tight">Nueva Hoja de Vida</h3>
                  <p className="text-sm text-slate-500 dark:text-gray-400 leading-snug">Diseños modernos y profesionales.</p>
              </div>

              <div onClick={onGoToCertGen} className="bg-white dark:bg-gray-900 p-8 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all cursor-pointer border-b-8 border-green-500 group dark:border-gray-800 hover:-translate-y-2">
                  <div className="p-5 bg-green-50 dark:bg-green-900/10 rounded-2xl text-green-500 group-hover:bg-green-500 group-hover:text-white transition-all inline-block mb-6 shadow-sm">
                        <FileCheck size={40} />
                  </div>
                  <h3 className="font-black text-xl text-tyGrey dark:text-white mb-2 uppercase tracking-tight">Generar Documentos</h3>
                  <p className="text-sm text-slate-500 dark:text-gray-400 leading-snug">Cartas de referencia y renuncias.</p>
              </div>

              <div onClick={onGoToLinks} className="bg-white dark:bg-gray-900 p-8 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all cursor-pointer border-b-8 border-blue-500 group dark:border-gray-800 hover:-translate-y-2">
                  <div className="p-5 bg-blue-50 dark:bg-blue-900/10 rounded-2xl text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all inline-block mb-6 shadow-sm">
                        <Globe size={40} />
                  </div>
                  <h3 className="font-black text-xl text-tyGrey dark:text-white mb-2 uppercase tracking-tight">Consultas y Soportes</h3>
                  <p className="text-sm text-slate-500 dark:text-gray-400 leading-snug">Pensiones, Salud y Antecedentes.</p>
              </div>

              <div onClick={onGoToTraining} className="bg-white dark:bg-gray-900 p-8 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all cursor-pointer border-b-8 border-purple-500 group dark:border-gray-800 hover:-translate-y-2">
                  <div className="p-5 bg-purple-50 dark:bg-purple-900/10 rounded-2xl text-purple-500 group-hover:bg-purple-600 group-hover:text-white transition-all inline-block mb-6 shadow-sm">
                        <GraduationCap size={40} />
                  </div>
                  <h3 className="font-black text-xl text-tyGrey dark:text-white mb-2 uppercase tracking-tight">Academia Digital</h3>
                  <p className="text-sm text-slate-500 dark:text-gray-400 leading-snug">Cursos con certificado oficial.</p>
              </div>
          </div>
        </section>

        <section>
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 mb-8 flex flex-col md:flex-row justify-between items-center gap-6 border border-transparent dark:border-gray-800">
             <h2 className="text-2xl font-black text-tyGrey dark:text-white flex items-center gap-3 uppercase tracking-tighter">
                <FileText size={28} className="text-tyYellow"/> Mis Documentos Guardados
             </h2>
             
             <div className="relative w-full md:w-[450px]">
                <SearchIcon size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar por cargo o nombre..." 
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-4 focus:ring-tyYellow/20 transition-all text-sm font-bold"
                />
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResumes.length === 0 ? (
              <div className="col-span-full text-center py-32 bg-white dark:bg-gray-900 rounded-[3.5rem] border-4 border-dashed border-slate-100 dark:border-gray-800">
                <div className="bg-slate-50 dark:bg-gray-800 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                    <FileText size={40} />
                </div>
                <p className="text-slate-400 font-black uppercase text-sm tracking-widest">No hay documentos en tu lista</p>
              </div>
            ) : (
              filteredResumes.map((resume, index) => (
                <div key={resume.id || index} className="bg-white dark:bg-gray-900 rounded-[3rem] shadow-xl overflow-hidden border border-slate-100 dark:border-gray-800 group hover:shadow-2xl transition-all">
                  <div className="h-4 bg-tyYellow"></div>
                  <div className="p-10">
                      <h3 className="font-black text-2xl text-tyGrey dark:text-white mb-2 truncate">{resume.personal.firstName} {resume.personal.lastName}</h3>
                      <p className="text-tyYellow text-[11px] font-black uppercase tracking-[0.2em] mb-8 truncate bg-yellow-50 dark:bg-yellow-900/10 inline-block px-5 py-1.5 rounded-full">
                         {resume.personal.professionalTitle || 'Sin Título'}
                      </p>
                      <div className="flex gap-4">
                        <button onClick={() => onEditResume(resume)} className="flex-1 bg-tyGrey dark:bg-slate-800 hover:bg-black text-white py-4 rounded-2xl font-black transition-all flex justify-center items-center gap-3 text-xs uppercase tracking-widest shadow-lg">
                          <Edit size={16} /> Ver y Editar
                        </button>
                        <button onClick={() => onDeleteResume(resume.id!)} className="w-14 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl flex items-center justify-center transition-all border border-red-100 shadow-sm">
                          <Trash2 size={22} />
                        </button>
                      </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
