import React from 'react';
import { ExternalLink, Shield, Heart, Briefcase, ArrowLeft } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export const ExternalLinks: React.FC<Props> = ({ onBack }) => {
  const links = [
    {
      category: "Antecedentes y Judiciales",
      icon: <Shield className="text-blue-500" size={24} />,
      items: [
        { name: "Policía Nacional", url: "https://antecedentes.policia.gov.co:7005/WebJudicial/" },
        { name: "Procuraduría", url: "https://www.procuraduria.gov.co/Pages/Certificado-antecedentes.aspx" },
        { name: "Contraloría", url: "https://www.contraloria.gov.co/web/guest/certificado-de-antecedentes-fiscales" },
        { name: "Medidas Correctivas (RNMC)", url: "https://srvcnpc.policia.gov.co/PSC/frm_cnp_consulta.aspx" }
      ]
    },
    {
      category: "Seguridad Social (EPS)",
      icon: <Heart className="text-red-500" size={24} />,
      items: [
        { name: "ADRES (Consulta EPS)", url: "https://www.adres.gov.co/consulte-su-eps" },
        { name: "Nueva EPS", url: "https://www.nuevaeps.com.co/" },
        { name: "Sanitas", url: "https://www.epsanitas.com/" },
        { name: "Sura", url: "https://www.epssura.com/" },
        { name: "Salud Total", url: "https://www.saludtotal.com.co/" },
        { name: "Coosalud", url: "https://coosalud.com/" }
      ]
    },
    {
      category: "Pensiones y Cesantías",
      icon: <Briefcase className="text-yellow-600" size={24} />,
      items: [
        { name: "Colpensiones", url: "https://www.colpensiones.gov.co/" },
        { name: "Porvenir", url: "https://www.porvenir.com.co/" },
        { name: "Protección", url: "https://www.proteccion.com/" },
        { name: "Colfondos", url: "https://www.colfondos.com.co/" },
        { name: "Fondo Nacional del Ahorro", url: "https://www.fna.gov.co/" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 animate-slide-up">
      <div className="container mx-auto px-4 max-w-5xl">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-tyYellow mb-6 transition">
          <ArrowLeft size={20} /> Volver al Panel
        </button>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-8">
           <div className="bg-tyGrey p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h1 className="text-3xl font-heading font-bold mb-2">Portafolio de Certificados</h1>
                <p className="text-gray-300">Descarga aquí tus soportes oficiales. Guarda los archivos (preferiblemente imágenes) y adjúntalos a tu Hoja de Vida en el paso "Soportes".</p>
              </div>
              <div className="absolute right-0 top-0 h-full w-1/3 bg-tyYellow transform skew-x-12 opacity-20"></div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {links.map((section, idx) => (
             <div key={idx} className="bg-white rounded-xl shadow-md p-6 border-t-4 border-tyYellow hover:shadow-lg transition">
                <div className="flex items-center gap-3 mb-6 border-b pb-4">
                   <div className="bg-gray-100 p-2 rounded-full">{section.icon}</div>
                   <h2 className="font-bold text-lg text-tyGrey">{section.category}</h2>
                </div>
                <ul className="space-y-3">
                   {section.items.map((link, i) => (
                     <li key={i}>
                       <a 
                         href={link.url} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="flex items-center justify-between p-2 rounded hover:bg-tyLightGrey text-gray-700 hover:text-tyYellow transition group"
                       >
                         <span className="font-medium text-sm">{link.name}</span>
                         <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition" />
                       </a>
                     </li>
                   ))}
                </ul>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};