
import React, { useRef, useState } from 'react';
import { ArrowLeft, Download, FileText, Loader2 } from 'lucide-react';

interface Props {
  onBack: () => void;
}

type CertType = 'PERSONAL' | 'FAMILIAR' | 'LABORAL' | 'RENUNCIA';

export const CertGenerator: React.FC<Props> = ({ onBack }) => {
  const [type, setType] = useState<CertType>('PERSONAL');
  const [isGenerating, setIsGenerating] = useState(false);
  const documentRef = useRef<HTMLDivElement>(null);
  
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

  const handleDownloadPDF = async () => {
    if (!documentRef.current) return;
    setIsGenerating(true);
    
    window.scrollTo(0, 0);

    try {
      // @ts-ignore
      const canvas = await html2canvas(documentRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: 816,
        height: 1056
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      
      // @ts-ignore
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'letter'
      });

      pdf.addImage(imgData, 'JPEG', 0, 0, 215.9, 279.4);
      pdf.save(`DOCUMENTO_${type}_${formData.referredName || 'TYS'}.pdf`);

    } catch (e) { 
      console.error(e);
      alert("Error al generar el PDF."); 
    } finally { 
      setIsGenerating(false); 
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 py-10 animate-slide-up no-print">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center mb-10">
          <button onClick={onBack} className="flex items-center gap-2 text-white/50 hover:text-tyYellow transition font-black uppercase text-xs tracking-widest">
            <ArrowLeft size={20} /> Volver al Panel
          </button>
          <button 
            onClick={handleDownloadPDF} 
            disabled={isGenerating}
            className="bg-tyYellow text-tyGrey px-12 py-4 rounded-[2rem] font-black shadow-[0_0_20px_rgba(255,193,35,0.3)] hover:scale-105 transition flex items-center gap-3 uppercase text-sm tracking-widest"
          >
             {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Download size={20} />} Descargar Documento Limpio
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
           {/* Sidebar Control */}
           <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] shadow-2xl space-y-8">
              <h2 className="font-black text-white text-2xl flex items-center gap-3 uppercase tracking-tighter">
                <FileText className="text-tyYellow" /> Generador Pro
              </h2>
              
              <div className="grid grid-cols-2 gap-3">
                {['PERSONAL', 'FAMILIAR', 'LABORAL', 'RENUNCIA'].map((t) => (
                    <button 
                        key={t}
                        onClick={() => setType(t as CertType)}
                        className={`text-[10px] font-black uppercase py-3 rounded-2xl transition border-2 ${type === t ? 'bg-tyYellow border-tyYellow text-tyGrey shadow-lg' : 'border-white/10 text-white/40 hover:border-white/20'}`}
                    >
                        {t === 'PERSONAL' ? 'Personal' : t === 'FAMILIAR' ? 'Familiar' : t === 'LABORAL' ? 'Laboral' : 'Renuncia'}
                    </button>
                ))}
              </div>
              
              <div className="space-y-6 pt-6 border-t border-white/10">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-tyYellow uppercase tracking-[0.2em] ml-2">Lugar y Fecha</label>
                    <input name="city" value={formData.city} onChange={handleChange} className="w-full bg-white/5 text-white p-4 rounded-2xl text-sm border-transparent focus:ring-2 focus:ring-tyYellow transition outline-none" placeholder="Ciudad" />
                    <input name="date" type="date" value={formData.date} onChange={handleChange} className="w-full bg-white/5 text-white p-4 rounded-2xl text-sm border-transparent focus:ring-2 focus:ring-tyYellow transition outline-none" />
                 </div>
                 
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-tyYellow uppercase tracking-[0.2em] ml-2">Datos de quien firma</label>
                    <input name="referrerName" value={formData.referrerName} onChange={handleChange} className="w-full bg-white/5 text-white p-4 rounded-2xl text-sm border-transparent focus:ring-2 focus:ring-tyYellow transition outline-none" placeholder="Nombre completo" />
                    <input name="referrerId" value={formData.referrerId} onChange={handleChange} className="w-full bg-white/5 text-white p-4 rounded-2xl text-sm border-transparent focus:ring-2 focus:ring-tyYellow transition outline-none" placeholder="Cédula" />
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-tyYellow uppercase tracking-[0.2em] ml-2">Datos del interesado</label>
                    <input name="referredName" value={formData.referredName} onChange={handleChange} className="w-full bg-white/5 text-white p-4 rounded-2xl text-sm border-transparent focus:ring-2 focus:ring-tyYellow transition outline-none" placeholder="Nombre completo" />
                    <input name="referredId" value={formData.referredId} onChange={handleChange} className="w-full bg-white/5 text-white p-4 rounded-2xl text-sm border-transparent focus:ring-2 focus:ring-tyYellow transition outline-none" placeholder="Cédula" />
                 </div>

                 {type === 'RENUNCIA' && (
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-tyYellow uppercase tracking-[0.2em] ml-2">Empresa a la que renuncia</label>
                        <input name="companyName" value={formData.companyName} onChange={handleChange} className="w-full bg-white/5 text-white p-4 rounded-2xl text-sm border-transparent focus:ring-2 focus:ring-tyYellow transition outline-none" placeholder="Nombre Empresa" />
                        <input name="position" value={formData.position} onChange={handleChange} className="w-full bg-white/5 text-white p-4 rounded-2xl text-sm border-transparent focus:ring-2 focus:ring-tyYellow transition outline-none" placeholder="Tu Cargo" />
                        <input name="lastDay" type="date" value={formData.lastDay} onChange={handleChange} className="w-full bg-white/5 text-white p-4 rounded-2xl text-sm border-transparent focus:ring-2 focus:ring-tyYellow transition outline-none" />
                    </div>
                 )}
              </div>
           </div>

           {/* Perfect Paper Preview */}
           <div className="lg:col-span-2 overflow-auto py-10 flex justify-center bg-slate-800/50 rounded-[3rem] border border-white/5">
              <div ref={documentRef} className="document-paper animate-pop">
                  <p className="mb-20 text-right font-sans text-sm font-bold uppercase tracking-widest">
                    {formData.city}, {formatFriendlyDate(formData.date)}
                  </p>
                  
                  {type === 'RENUNCIA' ? (
                     <div className="space-y-10 flex-1">
                        <div className="mb-12">
                            <p className="font-bold">Señores:</p>
                            <p className="uppercase font-bold tracking-widest text-lg">{formData.companyName || '____________________'}</p>
                            <p>E. S. D.</p>
                        </div>
                        <h2 className="text-center font-bold text-xl underline mb-12 decoration-2 underline-offset-8">ASUNTO: RENUNCIA VOLUNTARIA</h2>
                        <p>Cordial saludo,</p>
                        <p className="indent-12">Por medio de la presente, me permito presentar ante ustedes mi <strong>RENUNCIA IRREVOCABLE</strong> al cargo de <span className="font-bold uppercase underline decoration-1">{formData.position || '____________________'}</span> que he venido desempeñando en su organización.</p>
                        <p className="indent-12">Esta decisión es estrictamente personal y mi último día de labores será el <span className="font-bold">{formatFriendlyDate(formData.lastDay)}</span>. Deseo expresar mi más sincero agradecimiento por la confianza y el crecimiento profesional que obtuve durante este tiempo.</p>
                        <p className="indent-12">Quedo a su disposición para realizar el empalme necesario y la entrega formal de mi puesto.</p>
                        
                        <div className="mt-auto pt-32">
                            <p className="mb-12">Atentamente,</p>
                            <div className="border-t-2 border-black w-80 pt-4">
                                <p className="font-bold uppercase text-lg">{formData.referrerName || '____________________'}</p>
                                <p>C.C. No. {formData.referrerId || '____________________'}</p>
                                <p className="text-xs text-gray-400 mt-1">Cédula del Interesado</p>
                            </div>
                        </div>
                     </div>
                  ) : (
                     <div className="space-y-10 flex-1 flex flex-col">
                        <div className="flex-1">
                            <h2 className="text-center font-bold text-3xl mb-20 uppercase tracking-[0.25em] border-b-4 border-black inline-block mx-auto pb-4 px-12">
                                {type === 'LABORAL' ? 'Certificación Laboral' : 'Referencia Personal'}
                            </h2>
                            <h3 className="font-bold text-center mb-16 text-xl tracking-widest">A QUIEN INTERESE:</h3>
                            <p className="indent-14 text-lg leading-loose">Hago constar que conozco de vista, trato y comunicación al señor(a) <span className="font-bold uppercase underline decoration-2 underline-offset-4">{formData.referredName || '____________________'}</span>, identificado(a) con Cédula de Ciudadanía No. <span className="font-bold">{formData.referredId || '____________________'}</span>.</p>
                            <p className="indent-14 text-lg leading-loose">Durante el tiempo que le he conocido, ha demostrado ser una persona íntegra, responsable, con altos valores éticos y excelente disposición para el trabajo en equipo y el cumplimiento de metas.</p>
                            <p className="mt-12 text-lg">Se expide la presente certificación a solicitud del interesado en la ciudad de {formData.city}.</p>
                        </div>
                        
                        <div className="mt-auto pt-32">
                            <p className="mb-12">Cordialmente,</p>
                            <div className="border-t-2 border-black w-96 pt-4">
                                <p className="font-bold uppercase text-xl leading-tight mb-1">{formData.referrerName || '____________________'}</p>
                                <p className="text-sm font-bold">C.C. {formData.referrerId || '____________________'}</p>
                                <p className="text-sm uppercase tracking-widest text-gray-500 mt-1">Firma del Referente</p>
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
