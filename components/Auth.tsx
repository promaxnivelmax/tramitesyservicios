
import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { UserPlus, LogIn, Key, User as UserIcon, Loader } from 'lucide-react';
import { StorageService } from '../services/storage';

interface Props {
  onLoginSuccess: (user: User) => void;
  onCancel: () => void;
  initialMode?: 'login' | 'register';
}

export const Auth: React.FC<Props> = ({ onLoginSuccess, onCancel, initialMode = 'login' }) => {
  const [isRegistering, setIsRegistering] = useState(initialMode === 'register');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsRegistering(initialMode === 'register');
  }, [initialMode]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await StorageService.login(username, password);
      if (user) {
        onLoginSuccess(user);
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await StorageService.register(username, password);
      if (result.success && result.user) {
         onLoginSuccess(result.user);
      } else {
         setError(result.message || 'Error al registrar');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 flex items-center justify-center px-4 animate-slide-up transition-colors duration-500">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-transparent dark:border-gray-800">
        
        <div className="bg-tyGrey dark:bg-black p-8 text-center relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-tyYellow"></div>
          <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">
            {isRegistering ? 'Crear Cuenta' : 'Bienvenido'}
          </h2>
          <p className="text-gray-400 text-sm font-bold uppercase tracking-widest text-[10px]">
            {isRegistering ? 'Únete a Tramites y Servicios' : 'Accede a tu Panel Maestro'}
          </p>
        </div>

        <div className="p-8">
          <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Nombre de Usuario</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <UserIcon size={18} className="text-gray-400" />
                </div>
                <input 
                  type="text" 
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-12 w-full border border-gray-100 dark:border-gray-700 rounded-2xl p-4 focus:ring-2 focus:ring-tyYellow focus:border-transparent bg-slate-50 dark:bg-gray-800 dark:text-white transition font-bold"
                  placeholder="Tu usuario"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Contraseña</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Key size={18} className="text-gray-400" />
                </div>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 w-full border border-gray-100 dark:border-gray-700 rounded-2xl p-4 focus:ring-2 focus:ring-tyYellow focus:border-transparent bg-slate-50 dark:bg-gray-800 dark:text-white transition font-bold"
                  placeholder="******"
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-xs font-black uppercase text-center animate-bounce">{error}</p>}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-tyYellow text-tyGrey font-black py-5 rounded-2xl hover:bg-yellow-500 transition shadow-xl transform hover:-translate-y-1 flex justify-center gap-3 items-center disabled:opacity-50 uppercase tracking-widest text-sm"
            >
              {loading ? <Loader size={20} className="animate-spin" /> : (
                 <>
                   {isRegistering ? <UserPlus size={20}/> : <LogIn size={20}/>}
                   {isRegistering ? 'Registrarse' : 'Ingresar'}
                 </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-gray-100 dark:border-gray-800 pt-6">
            <button 
              onClick={() => { setIsRegistering(!isRegistering); setError(''); }}
              className="text-tyGrey dark:text-gray-400 text-xs hover:text-tyYellow font-black uppercase tracking-widest transition"
            >
              {isRegistering ? '¿Ya tienes cuenta? Inicia Sesión' : '¿No tienes cuenta? Regístrate gratis'}
            </button>
          </div>
           <div className="mt-4 text-center">
            <button onClick={onCancel} className="text-gray-400 text-[10px] font-bold uppercase tracking-widest hover:text-tyGrey transition">Volver al inicio</button>
           </div>
        </div>
      </div>
    </div>
  );
};
