
import React, { useState } from 'react';
import { ResumeData, User } from '../types';
import { Plus, FileText, Edit, Trash2, LogOut, Briefcase, FileCheck, ExternalLink, Shield, Search, GraduationCap } from 'lucide-react';

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

export const Dashboard: React.FC<Props> = ({ user, onNewResume, onEditResume, onDeleteResume, onLogout, onGoToLinks, onGoToCertGen, onGoToTraining }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResumes = user.resumes.filter(resume => {
     const positionMatch = resume.experience.some(exp => exp.position.toLowerCase().includes(searchTerm.toLowerCase()));
     const nameMatch = (resume.personal.firstName + ' ' + resume.personal.lastName).toLowerCase().includes(searchTerm.toLowerCase());
     if (searchTerm === '') return true;
     return positionMatch || nameMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 animate-slide-up pb-20 transition-colors duration-500">
      
      <div className="bg-tyGrey dark:bg-gray-900 text-white py-12 px-4 shadow-lg border-b-4 border-tyYellow">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold">Hola, <span className="text-tyYellow">{user.username}</span></h1>
            <p className="text-gray-300 dark:text-gray-400">Bienvenido a tu panel de gestión profesional.</p>
          </div>
          <button onClick={onLogout} className="flex items-center gap-2 bg-gray-700 dark:bg-gray-800 hover:bg-gray-600 dark:hover:bg-gray-700 px-4 py-2 rounded transition text-sm font-medium border border-gray-600 dark:border-gray-700">
            <LogOut size={16} /> Cerrar Sesión
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 space-y-12">
        
        <section>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 mb-6 border border-transparent dark:border-gray-800 transition-colors">
             <h2 className="text-xl font-bold text-tyGrey dark:text-white flex items-center gap-2">
                <Briefcase size={24} className="text-tyYellow"/> Herramientas de Gestión
             </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               <div onClick={onNewResume} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer border-b-4 border-tyYellow group relative overflow-hidden dark:border-gray-800">
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg text-yellow-600 dark:text-tyYellow group-hover:bg-tyYellow group-hover:text-tyGrey transition inline-block mb-4">
                        <Plus size={28} strokeWidth={3} />
                  </div>
                  <h3 className="font-bold text-lg text-tyGrey dark:text-white mb-2">Crear Hoja de Vida</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Diseña tu CV profesional con nuestras plantillas optimizadas.</p>
              </div>

              <div onClick={onGoToCertGen} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer border-b-4 border-green-500 group dark:border-gray-800">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400 group-hover:bg-green-600 group-hover:text-white transition inline-block mb-4">
                        <FileCheck size={28} />
                  </div>
                  <h3 className="font-bold text-lg text-tyGrey dark:text-white mb-2">Generador de Documentos</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Cartas laborales, de renuncia y referencias personales.</p>
              </div>

              <div onClick={onGoToLinks} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer border-b-4 border-blue-500 group dark:border-gray-800">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition inline-block mb-4">
                        <ExternalLink size={28} />
                  </div>
                  <h3 className="font-bold text-lg text-tyGrey dark:text-white mb-2">Portafolio de Descargas</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Enlaces a Policía, Procuraduría y EPS para tus soportes.</p>
              </div>

              <div onClick={onGoToTraining} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer border-b-4 border-purple-500 group dark:border-gray-800">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition inline-block mb-4">
                        <GraduationCap size={28} />
                  </div>
                  <h3 className="font-bold text-lg text-tyGrey dark:text-white mb-2">Capacitaciones</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Cursos didácticos y certificaciones para tu perfil laboral.</p>
              </div>
          </div>
        </section>

        <section>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 mb-6 flex flex-col md:flex-row justify-between items-center gap-4 border border-transparent dark:border-gray-800 transition-colors">
             <h2 className="text-xl font-bold text-tyGrey dark:text-white flex items-center gap-2">
                <FileText size={24} className="text-tyYellow"/> Mis Hojas de Vida Guardadas
             </h2>
             
             <div className="relative w-full md:w-96">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar por cargo o nombre..." 
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-tyYellow focus:border-transparent text-sm bg-gray-50 dark:bg-gray-800 dark:text-white focus:bg-white dark:focus:bg-gray-900 transition"
                />
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResumes.length === 0 ? (
              <div className="col-span-full text-center py-16 bg-white dark:bg-gray-900 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-800">
                <p className="text-gray-400 dark:text-gray-600 font-medium">No se encontraron hojas de vida.</p>
              </div>
            ) : (
              filteredResumes.map((resume, index) => (
                <div key={resume.id || index} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800 group">
                  <div className="h-2 bg-tyYellow"></div>
                  <div className="p-6">
                      <h3 className="font-bold text-lg text-tyGrey dark:text-white mb-1 truncate">{resume.personal.firstName} {resume.personal.lastName}</h3>
                      <p className="text-tyYellow text-xs font-bold uppercase tracking-wider mb-4 truncate">
                         {resume.personal.professionalTitle || (resume.experience.length > 0 ? resume.experience[0].position : 'Candidato')}
                      </p>
                      <div className="flex gap-2">
                        <button onClick={() => onEditResume(resume)} className="flex-1 bg-tyGrey dark:bg-gray-800 hover:bg-black dark:hover:bg-gray-700 text-white py-2 rounded font-medium transition flex justify-center items-center gap-2 text-sm">
                          <Edit size={14} /> Gestionar
                        </button>
                        <button onClick={() => onDeleteResume(resume.id!)} className="w-10 bg-red-50 dark:bg-red-900/10 hover:bg-red-500 text-red-500 hover:text-white rounded flex items-center justify-center transition border border-red-100 dark:border-red-900/20">
                          <Trash2 size={16} />
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
