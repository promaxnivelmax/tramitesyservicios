import React from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

interface Props {
  onGoToTraining?: () => void;
}

export const Footer: React.FC<Props> = ({ onGoToTraining }) => {
  return (
    <footer className="bg-tyGrey text-white pt-10 pb-6 no-print mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Info Column */}
        <div>
          <h3 className="text-xl font-heading font-bold text-tyYellow mb-4">Tramites y Servicios</h3>
          <p className="text-gray-300 text-sm mb-4">
            Potenciando el talento de Barrancabermeja. Plataforma oficial para la gestión de hojas de vida y servicios profesionales en el Puerto Petrolero.
          </p>
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <MapPin size={16} className="text-tyYellow" />
            <span>Barrancabermeja, Santander</span>
          </div>
        </div>

        {/* Links Column */}
        <div>
          <h3 className="text-lg font-heading font-bold text-white mb-4">Servicios</h3>
          <ul className="text-gray-300 text-sm space-y-2">
            <li><a href="#" className="hover:text-tyYellow transition">Diseño de Hojas de Vida</a></li>
            <li><a href="#" className="hover:text-tyYellow transition">Bolsa de Empleo (Próximamente)</a></li>
            <li>
              <button onClick={onGoToTraining} className="hover:text-tyYellow transition text-left">
                Capacitaciones y Certificaciones
              </button>
            </li>
            <li><a href="#" className="hover:text-tyYellow transition">Soporte</a></li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
          <h3 className="text-lg font-heading font-bold text-white mb-4">Contáctanos</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <Phone size={16} className="text-tyYellow" />
              <span>+57 305 231 9414 - +57 305 224 5939</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <Mail size={16} className="text-tyYellow" />
              <span>serviciossectorcomercial@gmail.com</span>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-tyYellow hover:text-tyGrey transition transform hover:scale-110"><Facebook size={20} /></a>
            <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-tyYellow hover:text-tyGrey transition transform hover:scale-110"><Instagram size={20} /></a>
            <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-tyYellow hover:text-tyGrey transition transform hover:scale-110"><Twitter size={20} /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} Tramites y Servicios Barrancabermeja. Todos los derechos reservados.
      </div>
    </footer>
  );
};
