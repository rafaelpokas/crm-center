import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bus, User, Mail, Lock, Building, ArrowRight, ArrowLeft } from 'lucide-react';

interface RegisterProps {
  onRegister: () => void;
  onNavigateLogin: () => void;
}

export default function Register({ onRegister, onNavigateLogin }: RegisterProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call for prototype
    setTimeout(() => {
      setIsLoading(false);
      onRegister();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-slate-200/40 to-transparent blur-3xl" />
        <div className="absolute bottom-[10%] right-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tl from-slate-200/40 to-transparent blur-3xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-100"
      >
        <div className="p-8 md:p-10">
          <button 
            onClick={onNavigateLogin}
            className="flex items-center gap-2 text-slate-400 hover:text-black transition-colors font-sans text-xs font-bold mb-6"
          >
            <ArrowLeft size={16} /> Voltar para o Login
          </button>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center shadow-md">
                <Bus className="text-white" size={20} strokeWidth={2.5} />
              </div>
              <h1 className="font-display text-2xl font-black text-slate-900 tracking-tight">Criar nova conta</h1>
            </div>
            <p className="font-sans text-sm font-medium text-slate-500">
              Solicite acesso ao portal de Gestão de Garantias da Center Ônibus.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                  Nome Completo
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={16} className="text-slate-400" />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="block w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none transition-all"
                    placeholder="João Silva"
                  />
                </div>
              </div>

              <div>
                <label className="block font-sans text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                  Empresa
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building size={16} className="text-slate-400" />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="block w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none transition-all"
                    placeholder="Viação Exemplo"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block font-sans text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                E-mail Profissional
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={16} className="text-slate-400" />
                </div>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="block w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none transition-all"
                  placeholder="joao@empresa.com.br"
                />
              </div>
            </div>

            <div>
              <label className="block font-sans text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={16} className="text-slate-400" />
                </div>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="block w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none transition-all"
                  placeholder="Mínimo 6 caracteres"
                />
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
                  <span>Solicitar Cadastro</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
