import React, { useState } from 'react';
import { ArrowLeft, Printer, FileText, User, Briefcase } from 'lucide-react';

interface Props {
  onBack: () => void;
}

type CertType = 'PERSONAL' | 'FAMILIAR' | 'LABORAL';

export const CertGenerator: React.FC<Props> = ({ onBack }) => {
  const [type, setType] = useState<CertType>('PERSONAL');
  const [formData, setFormData] = useState({
    city: 'Barrancabermeja',
    date: new Date().toISOString().split('T')[0],
    // For Reference
    referrerName: '',
    referrerId: '',
    referredName: '',
    referredId: '',
    referrerPhone: '',
    relationshipTime: '',
    // For Laboral
    companyName: '',
    nit: '',
    position: '',
    startDate: '',
    endDate: '',
    salary: '',
    signerName: '',
    signerPosition: '',
    signerPhone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 animate-slide-up">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex justify-between items-center mb-6 no-print">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-tyYellow transition">
            <ArrowLeft size={20} /> Volver
          </button>
          <button onClick={handlePrint} className="flex items-center gap-2 bg-tyYellow text-tyGrey px-4 py-2 rounded font-bold hover:bg-yellow-500 transition shadow">
             <Printer size={18} /> Imprimir Certificado
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {/* Controls - No Print */}
           <div className="bg-white p-6 rounded-xl shadow-lg h-fit no-print">
              <h2 className="font-bold text-tyGrey mb-4 text-lg">Configuración</h2>
              
              <div className="mb-6">
                 <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Certificado</label>
                 <div className="space-y-2">
                    <button 
                      onClick={() => setType('PERSONAL')}
                      className={`w-full text-left px-4 py-2 rounded flex items-center gap-2 ${type === 'PERSONAL' ? 'bg-tyYellow text-tyGrey font-bold' : 'bg-gray-100 text-gray-600'}`}
                    >
                       <User size={16}/> Ref. Personal
                    </button>
                    <button 
                      onClick={() => setType('FAMILIAR')}
                      className={`w-full text-left px-4 py-2 rounded flex items-center gap-2 ${type === 'FAMILIAR' ? 'bg-tyYellow text-tyGrey font-bold' : 'bg-gray-100 text-gray-600'}`}
                    >
                       <User size={16}/> Ref. Familiar
                    </button>
                    <button 
                      onClick={() => setType('LABORAL')}
                      className={`w-full text-left px-4 py-2 rounded flex items-center gap-2 ${type === 'LABORAL' ? 'bg-tyYellow text-tyGrey font-bold' : 'bg-gray-100 text-gray-600'}`}
                    >
                       <Briefcase size={16}/> Cert. Laboral
                    </button>
                 </div>
              </div>

              <div className="space-y-4">
                 <div>
                    <label className="text-xs font-bold text-gray-500">Ciudad y Fecha</label>
                    <input name="city" value={formData.city} onChange={handleChange} className="w-full border p-1 rounded mb-1 text-sm" placeholder="Ciudad" />
                    <input name="date" type="date" value={formData.date} onChange={handleChange} className="w-full border p-1 rounded text-sm" />
                 </div>
                 
                 {type !== 'LABORAL' ? (
                   <>
                     <div className="border-t pt-2">
                        <label className="text-xs font-bold text-gray-500">Quien Certifica (Referente)</label>
                        <input name="referrerName" value={formData.referrerName} onChange={handleChange} className="w-full border p-1 rounded mb-1 text-sm" placeholder="Nombre Completo" />
                        <input name="referrerId" value={formData.referrerId} onChange={handleChange} className="w-full border p-1 rounded mb-1 text-sm" placeholder="Cédula" />
                        <input name="referrerPhone" value={formData.referrerPhone} onChange={handleChange} className="w-full border p-1 rounded text-sm" placeholder="Celular" />
                     </div>
                     <div className="border-t pt-2">
                        <label className="text-xs font-bold text-gray-500">A quien Refiere (Interesado)</label>
                        <input name="referredName" value={formData.referredName} onChange={handleChange} className="w-full border p-1 rounded mb-1 text-sm" placeholder="Nombre Completo" />
                        <input name="referredId" value={formData.referredId} onChange={handleChange} className="w-full border p-1 rounded mb-1 text-sm" placeholder="Cédula" />
                        <input name="relationshipTime" value={formData.relationshipTime} onChange={handleChange} className="w-full border p-1 rounded text-sm" placeholder="Tiempo (ej. 5 años)" />
                     </div>
                   </>
                 ) : (
                   <>
                     <div className="border-t pt-2">
                        <label className="text-xs font-bold text-gray-500">Empresa</label>
                        <input name="companyName" value={formData.companyName} onChange={handleChange} className="w-full border p-1 rounded mb-1 text-sm" placeholder="Nombre Empresa" />
                        <input name="nit" value={formData.nit} onChange={handleChange} className="w-full border p-1 rounded text-sm" placeholder="NIT" />
                     </div>
                     <div className="border-t pt-2">
                        <label className="text-xs font-bold text-gray-500">Empleado</label>
                        <input name="referredName" value={formData.referredName} onChange={handleChange} className="w-full border p-1 rounded mb-1 text-sm" placeholder="Nombre Empleado" />
                        <input name="referredId" value={formData.referredId} onChange={handleChange} className="w-full border p-1 rounded text-sm" placeholder="Cédula" />
                     </div>
                     <div className="border-t pt-2">
                        <label className="text-xs font-bold text-gray-500">Detalles</label>
                        <input name="position" value={formData.position} onChange={handleChange} className="w-full border p-1 rounded mb-1 text-sm" placeholder="Cargo" />
                        <input name="salary" value={formData.salary} onChange={handleChange} className="w-full border p-1 rounded mb-1 text-sm" placeholder="Salario" />
                        <div className="flex gap-2">
                           <input name="startDate" type="date" value={formData.startDate} onChange={handleChange} className="w-1/2 border p-1 rounded text-sm" />
                           <input name="endDate" type="date" value={formData.endDate} onChange={handleChange} className="w-1/2 border p-1 rounded text-sm" />
                        </div>
                     </div>
                     <div className="border-t pt-2">
                        <label className="text-xs font-bold text-gray-500">Firmante (Jefe/RH)</label>
                        <input name="signerName" value={formData.signerName} onChange={handleChange} className="w-full border p-1 rounded mb-1 text-sm" placeholder="Nombre Firmante" />
                        <input name="signerPosition" value={formData.signerPosition} onChange={handleChange} className="w-full border p-1 rounded mb-1 text-sm" placeholder="Cargo Firmante" />
                        <input name="signerPhone" value={formData.signerPhone} onChange={handleChange} className="w-full border p-1 rounded text-sm" placeholder="Teléfono" />
                     </div>
                   </>
                 )}
              </div>
           </div>

           {/* Preview Area (A4) */}
           <div className="col-span-1 md:col-span-2">
              <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl mx-auto print-area p-20 relative text-justify font-sans text-gray-800 leading-relaxed flex flex-col">
                  
                  {/* Header */}
                  <div className="text-center mb-16">
                     <h1 className="text-2xl font-bold uppercase tracking-wide">
                        {type === 'LABORAL' ? 'CERTIFICACIÓN LABORAL' : type === 'PERSONAL' ? 'REFERENCIA PERSONAL' : 'REFERENCIA FAMILIAR'}
                     </h1>
                  </div>

                  {/* Body */}
                  <div className="flex-grow">
                     <p className="mb-8">
                        {formData.city}, {new Date(formData.date).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}
                     </p>
                     
                     <h3 className="font-bold mb-8">A QUIEN INTERESE:</h3>

                     {type !== 'LABORAL' ? (
                        <p>
                           Por medio de la presente hago constar que conozco de vista, trato y comunicación a 
                           <span className="font-bold"> {formData.referredName || '____________________'}</span>, 
                           identificado(a) con Cédula de Ciudadanía No. <span className="font-bold">{formData.referredId || '____________________'}</span>, 
                           desde hace aproximadamente <span className="font-bold">{formData.relationshipTime || '_____'}</span>.
                           <br/><br/>
                           Durante este tiempo ha demostrado ser una persona responsable, honesta y cumplidora de sus deberes 
                           {type === 'FAMILIAR' ? ' familiares y sociales' : ' personales y sociales'}, por lo cual no dudo en dar fe de su buena conducta moral.
                        </p>
                     ) : (
                        <p>
                           La empresa <span className="font-bold">{formData.companyName || '____________________'}</span> con NIT <span className="font-bold">{formData.nit || '____________________'}</span>, 
                           CERTIFICA QUE:
                           <br/><br/>
                           El señor(a) <span className="font-bold">{formData.referredName || '____________________'}</span>, 
                           identificado(a) con Cédula de Ciudadanía No. <span className="font-bold">{formData.referredId || '____________________'}</span>, 
                           labora(ó) en nuestra compañía desempeñando el cargo de <span className="font-bold">{formData.position || '____________________'}</span>.
                           <br/><br/>
                           Tipo de Contrato: Término {formData.endDate ? 'Fijo/Obra' : 'Indefinido'}.<br/>
                           Fecha de Ingreso: {formData.startDate}.<br/>
                           {formData.endDate && <>Fecha de Retiro: {formData.endDate}.<br/></>}
                           Asignación Salarial: <span className="font-bold">{formData.salary}</span>.
                        </p>
                     )}
                     
                     <p className="mt-8">
                        Se expide la presente a solicitud del interesado.
                     </p>
                  </div>

                  {/* Footer / Signatures */}
                  <div className="mt-20">
                      <div className="border-t border-black w-1/2 pt-2">
                         {type !== 'LABORAL' ? (
                            <>
                              <p className="font-bold">{formData.referrerName || 'Firma'}</p>
                              <p>C.C. {formData.referrerId}</p>
                              <p>Teléfono: {formData.referrerPhone}</p>
                            </>
                         ) : (
                            <>
                              <p className="font-bold">{formData.signerName || 'Firma Autorizada'}</p>
                              <p>{formData.signerPosition || 'Cargo'}</p>
                              <p>{formData.companyName}</p>
                              <p>Tel: {formData.signerPhone}</p>
                            </>
                         )}
                      </div>
                  </div>

              </div>
           </div>
        </div>
      </div>
    </div>
  );
};