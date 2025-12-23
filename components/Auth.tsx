
import React, { useState } from 'react';
import { User } from '../types';
import { UserPlus, LogIn, Key, User as UserIcon, Loader } from 'lucide-react';
import { StorageService } from '../services/storage';

interface Props {
  onLoginSuccess: (user: User) => void;
  onCancel: () => void;
}

export const Auth: React.FC<Props> = ({ onLoginSuccess, onCancel }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
    <div className="min-h-screen bg-tyLightGrey dark:bg-gray-950 flex items-center justify-center px-4 animate-slide-up transition-colors duration-500">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-transparent dark:border-gray-800">
        
        <div className="bg-tyGrey dark:bg-black p-6 text-center relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-tyYellow"></div>
          <h2 className="text-2xl font-heading font-bold text-white mb-2">
            {isRegistering ? 'Crear Cuenta' : 'Bienvenido'}
          </h2>
          <p className="text-gray-400 text-sm">
            {isRegistering ? 'Regístrate para guardar tus hojas de vida' : 'Inicia sesión para acceder a tus documentos'}
          </p>
        </div>

        <div className="p-8">
          <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre de Usuario</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon size={18} className="text-gray-400" />
                </div>
                <input 
                  type="text" 
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-tyYellow focus:border-transparent bg-white dark:bg-gray-800 dark:text-white transition"
                  placeholder="Tu usuario"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contraseña</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key size={18} className="text-gray-400" />
                </div>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-tyYellow focus:border-transparent bg-white dark:bg-gray-800 dark:text-white transition"
                  placeholder="******"
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm text-center animate-bounce">{error}</p>}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-tyYellow text-tyGrey font-bold py-3 rounded-lg hover:bg-yellow-500 transition shadow-lg transform hover:-translate-y-1 flex justify-center gap-2 items-center disabled:opacity-50"
            >
              {loading ? <Loader size={20} className="animate-spin" /> : (
                 <>
                   {isRegistering ? <UserPlus size={20}/> : <LogIn size={20}/>}
                   {isRegistering ? 'Registrarse' : 'Ingresar'}
                 </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center border-t border-gray-100 dark:border-gray-800 pt-4">
            <button 
              onClick={() => { setIsRegistering(!isRegistering); setError(''); }}
              className="text-tyGrey dark:text-gray-400 text-sm hover:underline font-medium"
            >
              {isRegistering ? '¿Ya tienes cuenta? Inicia Sesión' : '¿No tienes cuenta? Regístrate gratis'}
            </button>
          </div>
           <div className="mt-4 text-center">
            <button onClick={onCancel} className="text-gray-400 text-xs hover:text-gray-600">Volver al inicio</button>
           </div>
        </div>
      </div>
    </div>
  );
};
