
import React, { useState } from 'react';
import { ArrowLeft, Download, FileText, User, Briefcase, FileX, Printer } from 'lucide-react';

interface Props {
  onBack: () => void;
}

type CertType = 'PERSONAL' | 'FAMILIAR' | 'LABORAL' | 'RENUNCIA';

export const CertGenerator: React.FC<Props> = ({ onBack }) => {
  const [type, setType] = useState<CertType>('PERSONAL');
  const [formData, setFormData] = useState({
    city: 'Barrancabermeja',
    date: new Date().toISOString().split('T')[0],
    referrerName: '',
    referrerId: '',
    referredName: '',
    referredId: '',
    referrerPhone: '',
    relationshipTime: '',
    companyName: '',
    nit: '',
    position: '',
    startDate: '',
    endDate: '',
    salary: '',
    signerName: '',
    signerPosition: '',
    signerPhone: '',
    resignationReason: '',
    lastDay: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const formatFriendlyDate = (dateString: string) => {
    if (!dateString) return '____________________';
    const [year, month, day] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return date.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleDownload = () => {
    window.print(); // Usamos la impresión nativa configurada para ser limpia
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 animate-slide-up">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-8 no-print">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-tyYellow transition font-bold">
            <ArrowLeft size={20} /> Volver al Panel
          </button>
          <button onClick={handleDownload} className="bg-tyYellow text-tyGrey px-8 py-3 rounded-xl font-bold shadow-xl hover:scale-105 transition flex items-center gap-2">
             <Download size={18} /> Descargar Documento
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
           {/* Sidebar Control */}
           <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl no-print border border-gray-100 dark:border-gray-800 space-y-6">
              <h2 className="font-heading font-bold text-tyGrey dark:text-white text-xl flex items-center gap-2">
                <FileText className="text-tyYellow" /> Configuración
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {['PERSONAL', 'FAMILIAR', 'LABORAL', 'RENUNCIA'].map((t) => (
                    <button 
                        key={t}
                        onClick={() => setType(t as CertType)}
                        className={`text-[10px] font-black uppercase py-2 px-1 rounded-lg transition border-2 ${type === t ? 'bg-tyYellow border-tyYellow text-tyGrey' : 'border-gray-100 dark:border-gray-800 text-gray-400'}`}
                    >
                        {t === 'PERSONAL' ? 'Personal' : t === 'FAMILIAR' ? 'Familiar' : t === 'LABORAL' ? 'Laboral' : 'Renuncia'}
                    </button>
                ))}
              </div>
              
              <div className="space-y-4 pt-4 border-t dark:border-gray-800">
                 <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Lugar y Fecha</label>
                    <input name="city" value={formData.city} onChange={handleChange} className="w-full bg-gray-50 dark:bg-gray-800 dark:text-white p-3 rounded-xl text-sm border-transparent focus:ring-2 focus:ring-tyYellow" placeholder="Ciudad" />
                    <input name="date" type="date" value={formData.date} onChange={handleChange} className="w-full bg-gray-50 dark:bg-gray-800 dark:text-white p-3 rounded-xl text-sm border-transparent focus:ring-2 focus:ring-tyYellow" />
                 </div>
                 
                 <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Información de Firmante</label>
                    <input name="referrerName" value={formData.referrerName} onChange={handleChange} className="w-full bg-gray-50 dark:bg-gray-800 dark:text-white p-3 rounded-xl text-sm border-transparent focus:ring-2 focus:ring-tyYellow" placeholder="Nombre completo" />
                    <input name="referrerId" value={formData.referrerId} onChange={handleChange} className="w-full bg-gray-50 dark:bg-gray-800 dark:text-white p-3 rounded-xl text-sm border-transparent focus:ring-2 focus:ring-tyYellow" placeholder="Cédula" />
                 </div>

                 <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Información de Interesado</label>
                    <input name="referredName" value={formData.referredName} onChange={handleChange} className="w-full bg-gray-50 dark:bg-gray-800 dark:text-white p-3 rounded-xl text-sm border-transparent focus:ring-2 focus:ring-tyYellow" placeholder="Nombre completo" />
                    <input name="referredId" value={formData.referredId} onChange={handleChange} className="w-full bg-gray-50 dark:bg-gray-800 dark:text-white p-3 rounded-xl text-sm border-transparent focus:ring-2 focus:ring-tyYellow" placeholder="Cédula" />
                 </div>

                 {type === 'RENUNCIA' && (
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Datos de Empresa</label>
                        <input name="companyName" value={formData.companyName} onChange={handleChange} className="w-full bg-gray-50 dark:bg-gray-800 dark:text-white p-3 rounded-xl text-sm border-transparent focus:ring-2 focus:ring-tyYellow" placeholder="Nombre Empresa" />
                        <input name="position" value={formData.position} onChange={handleChange} className="w-full bg-gray-50 dark:bg-gray-800 dark:text-white p-3 rounded-xl text-sm border-transparent focus:ring-2 focus:ring-tyYellow" placeholder="Tu Cargo" />
                        <input name="lastDay" type="date" value={formData.lastDay} onChange={handleChange} className="w-full bg-gray-50 dark:bg-gray-800 dark:text-white p-3 rounded-xl text-sm border-transparent focus:ring-2 focus:ring-tyYellow" />
                    </div>
                 )}
              </div>
           </div>

           {/* Paper Preview */}
           <div className="lg:col-span-2">
              <div className="w-[215.9mm] min-h-[279.4mm] bg-white shadow-2xl mx-auto p-24 text-justify font-serif text-gray-900 leading-[1.8] flex flex-col border border-gray-100 print-shadow-none print:m-0">
                  <p className="mb-16 text-right font-sans text-sm font-bold">
                    {formData.city}, {formatFriendlyDate(formData.date)}
                  </p>
                  
                  {type === 'RENUNCIA' ? (
                     <div className="space-y-8">
                        <div className="mb-12">
                            <p className="font-bold">Señores:</p>
                            <p className="uppercase font-bold tracking-widest">{formData.companyName || '____________________'}</p>
                            <p>E. S. D.</p>
                        </div>
                        <h2 className="text-center font-bold text-lg underline mb-10 decoration-2">ASUNTO: RENUNCIA VOLUNTARIA</h2>
                        <p className="indent-12">Cordial saludo,</p>
                        <p className="indent-12">Por medio de la presente, me permito presentar ante ustedes mi <strong>RENUNCIA IRREVOCABLE</strong> al cargo de <span className="font-bold uppercase">{formData.position || '____________________'}</span> que he venido desempeñando en su organización.</p>
                        <p className="indent-12">Esta decisión es estrictamente personal y mi último día de labores será el <span className="font-bold">{formatFriendlyDate(formData.lastDay)}</span>. Deseo expresar mi más sincero agradecimiento por la confianza y el crecimiento profesional que obtuve durante este tiempo.</p>
                        <p className="indent-12">Quedo a su disposición para realizar el empalme necesario y la entrega formal de mi puesto.</p>
                        <div className="mt-32">
                            <p>Atentamente,</p>
                            <div className="mt-12 border-t border-black w-72 pt-2">
                                <p className="font-bold uppercase">{formData.referrerName || '____________________'}</p>
                                <p>C.C. No. {formData.referrerId || '____________________'}</p>
                            </div>
                        </div>
                     </div>
                  ) : (
                     <div className="space-y-8 flex-1 flex flex-col">
                        <div className="flex-1">
                            <h2 className="text-center font-bold text-2xl mb-16 uppercase tracking-[0.2em] border-b-2 border-black inline-block mx-auto pb-2 px-10">
                                {type === 'LABORAL' ? 'Certificación Laboral' : 'Referencia Personal'}
                            </h2>
                            <h3 className="font-bold text-center mb-16 text-lg tracking-widest">A QUIEN INTERESE:</h3>
                            <p className="indent-14 text-lg">Hago constar que conozco de vista, trato y comunicación al señor(a) <span className="font-bold uppercase underline decoration-1">{formData.referredName || '____________________'}</span>, identificado(a) con Cédula de Ciudadanía No. <span className="font-bold">{formData.referredId || '____________________'}</span>.</p>
                            <p className="indent-14 text-lg">Durante el tiempo que le he conocido, ha demostrado ser una persona íntegra, responsable, con altos valores éticos y excelente disposición para el trabajo en equipo y el cumplimiento de metas.</p>
                            <p className="mt-12 text-lg">Se expide la presente certificación a solicitud del interesado en la ciudad de {formData.city}.</p>
                        </div>
                        <div className="mt-32">
                            <p>Cordialmente,</p>
                            <div className="mt-12 border-t border-black w-80 pt-3">
                                <p className="font-bold uppercase text-lg leading-none mb-1">{formData.referrerName || '____________________'}</p>
                                <p className="text-sm">C.C. {formData.referrerId || '____________________'}</p>
                                <p className="text-sm">Firma Autorizada</p>
                            </div>
                        </div>
                     </div>
                  )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
