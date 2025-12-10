import React from 'react';
import { ResumeData, User } from '../types';
import { Plus, FileText, Edit, Trash2, LogOut, Briefcase, FileCheck, ExternalLink, Shield } from 'lucide-react';

interface Props {
  user: User;
  onNewResume: () => void;
  onEditResume: (resume: ResumeData) => void;
  onDeleteResume: (id: string) => void;
  onLogout: () => void;
  onGoToLinks: () => void;
  onGoToCertGen: () => void;
}

export const Dashboard: React.FC<Props> = ({ user, onNewResume, onEditResume, onDeleteResume, onLogout, onGoToLinks, onGoToCertGen }) => {
  return (
    <div className="min-h-screen bg-gray-50 animate-slide-up pb-20">
      
      {/* Dashboard Header */}
      <div className="bg-tyGrey text-white py-12 px-4 shadow-lg">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold">Hola, <span className="text-tyYellow">{user.username}</span></h1>
            <p className="text-gray-300">Bienvenido a tu panel de Tramites y Servicios.</p>
          </div>
          <button onClick={onLogout} className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded transition text-sm">
            <LogOut size={16} /> Cerrar Sesión
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 space-y-12">
        
        {/* SERVICES SECTION */}
        <section>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
             <h2 className="text-xl font-bold text-tyGrey flex items-center gap-2">
                <Briefcase size={24} className="text-tyYellow"/> Herramientas y Trámites
             </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Tool 1: External Links */}
              <div onClick={onGoToLinks} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer border-b-4 border-blue-500 group">
                  <div className="flex justify-between items-start mb-4">
                     <div className="p-3 bg-blue-100 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
                        <ExternalLink size={28} />
                     </div>
                  </div>
                  <h3 className="font-bold text-lg text-tyGrey mb-2">Portafolio de Descargas</h3>
                  <p className="text-sm text-gray-500">Enlaces directos a Policía, Procuraduría, EPS y Fondos de Pensiones para descargar tus certificados.</p>
              </div>

              {/* Tool 2: Cert Generator */}
              <div onClick={onGoToCertGen} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer border-b-4 border-green-500 group">
                  <div className="flex justify-between items-start mb-4">
                     <div className="p-3 bg-green-100 rounded-lg text-green-600 group-hover:bg-green-600 group-hover:text-white transition">
                        <FileCheck size={28} />
                     </div>
                  </div>
                  <h3 className="font-bold text-lg text-tyGrey mb-2">Generador de Referencias</h3>
                  <p className="text-sm text-gray-500">Crea certificados laborales, referencias personales y familiares listos para imprimir.</p>
              </div>

               {/* Tool 3: Resume Builder (Visual shortcut) */}
               <div onClick={onNewResume} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer border-b-4 border-tyYellow group">
                  <div className="flex justify-between items-start mb-4">
                     <div className="p-3 bg-yellow-100 rounded-lg text-yellow-600 group-hover:bg-tyYellow group-hover:text-tyGrey transition">
                        <FileText size={28} />
                     </div>
                  </div>
                  <h3 className="font-bold text-lg text-tyGrey mb-2">Crear Hoja de Vida</h3>
                  <p className="text-sm text-gray-500">Diseña tu CV profesional y adjunta los soportes descargados en un solo PDF.</p>
              </div>
          </div>
        </section>

        {/* MY DOCUMENTS SECTION */}
        <section>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex justify-between items-center">
             <h2 className="text-xl font-bold text-tyGrey flex items-center gap-2">
                <FileText size={24} className="text-tyYellow"/> Mis Hojas de Vida Guardadas
             </h2>
             <button 
               onClick={onNewResume}
               className="bg-tyGrey text-white px-4 py-2 rounded font-bold text-sm hover:bg-gray-700 transition flex items-center gap-2"
             >
               <Plus size={16} /> Nueva
             </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.resumes.length === 0 ? (
              <div className="col-span-full text-center py-10 bg-white rounded-xl border-2 border-dashed border-gray-300">
                <p className="text-gray-400">No tienes documentos creados.</p>
              </div>
            ) : (
              user.resumes.map((resume, index) => (
                <div 
                  key={resume.id || index} 
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 group"
                >
                  <div className={`h-32 ${resume.templateId === 'design-a' ? 'bg-tyGrey' : 'bg-tyLilac'} relative flex items-center justify-center`}>
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition"></div>
                      <FileText size={40} className="text-white relative z-10" />
                      <span className="absolute bottom-2 right-2 bg-white/90 text-xs px-2 py-1 rounded font-bold text-tyGrey shadow">
                        {resume.templateId === 'design-a' ? 'Moderno' : 'Elegante'}
                      </span>
                  </div>
                  
                  <div className="p-6">
                      <h3 className="font-bold text-lg text-tyGrey mb-1 truncate">
                        {resume.personal.firstName ? `${resume.personal.firstName} ${resume.personal.lastName}` : 'Sin Título'}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">{resume.personal.docNumber || 'Borrador'}</p>
                      
                      <div className="flex gap-2">
                        <button 
                          onClick={() => onEditResume(resume)}
                          className="flex-1 bg-tyLightGrey hover:bg-gray-200 text-tyGrey py-2 rounded font-medium transition flex justify-center items-center gap-2"
                        >
                          <Edit size={16} /> Editar
                        </button>
                        <button 
                          onClick={() => onDeleteResume(resume.id!)}
                          className="w-10 bg-red-50 hover:bg-red-100 text-red-500 rounded flex items-center justify-center transition"
                        >
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