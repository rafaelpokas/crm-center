import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bus, Lock, Mail, ArrowRight } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
  onNavigateRegister: () => void;
}

export default function Login({ onLogin, onNavigateRegister }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call for prototype
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-b from-slate-200/50 to-transparent blur-3xl" />
        <div className="absolute -bottom-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-t from-slate-200/50 to-transparent blur-3xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-100"
      >
        <div className="p-8 md:p-10">
          <div className="flex justify-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center shadow-lg">
              <Bus className="text-white" size={28} strokeWidth={2.5} />
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-black text-slate-900 tracking-tight">Bem-vindo de volta</h1>
            <p className="font-sans text-sm font-medium text-slate-500 mt-2">Acesse o sistema de Gestão de Garantias</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-sans text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                E-mail Profissional
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-slate-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none transition-all"
                  placeholder="admin@centeronibus.com.br"
                />
              </div>
            </div>

            <div>
              <label className="block font-sans text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex justify-end mt-2">
                <button type="button" className="font-sans text-xs font-bold text-slate-500 hover:text-black transition-colors">
                  Esqueceu a senha?
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-black hover:bg-slate-900 text-white py-4 rounded-xl font-sans text-sm font-bold shadow-lg shadow-black/10 transition-all disabled:opacity-70 disabled:cursor-not-allowed group mt-6"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Entrar no Sistema</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="bg-slate-50 border-t border-slate-100 p-6 text-center">
          <p className="font-sans text-sm font-medium text-slate-600">
            Ainda não tem acesso?{' '}
            <button 
              onClick={onNavigateRegister}
              className="font-bold text-black hover:underline"
            >
              Solicite uma conta
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
