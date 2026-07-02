import React from 'react';
import { 
  Settings, 
  RotateCcw, 
  Database, 
  ToggleLeft, 
  ToggleRight, 
  Check, 
  Info,
  Sliders
} from 'lucide-react';
import { INITIAL_PROTOCOLS, saveProtocols } from '../mockData';

interface SettingsProps {
  onResetData: () => void;
}

export default function SettingsView({ onResetData }: SettingsProps) {
  const [successMsg, setSuccessMsg] = React.useState(false);
  const [autoSla, setAutoSla] = React.useState(true);
  const [allowRealtime, setAllowRealtime] = React.useState(true);

  const handleReset = () => {
    if (confirm('Deseja realmente redefinir o banco de dados? Isso apagará todos os novos protocolos inseridos e restaurará os registros originais das capturas.')) {
      onResetData();
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 3000);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-fade-in">
      <div>
        <h2 className="font-display text-2xl font-extrabold text-slate-900">Configurações do Sistema</h2>
        <p className="font-sans text-sm text-slate-500 mt-1">Configure parâmetros operacionais de triagem, SLA automatizados e logs de persistência local.</p>
      </div>

      <div className="space-y-6">
        {/* Core database controller */}
        <section className="bg-white rounded-xl p-6 md:p-8 card-shadow space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-200">
              <Database size={16} className="text-slate-800" />
            </div>
            <h3 className="font-display text-base font-bold text-slate-900 font-bold">Gerenciamento de Dados</h3>
          </div>

          <p className="font-sans text-xs text-slate-500 leading-relaxed">
            Todas as alterações de status, laudos postados e cadastros de novos chamados nesta demonstração utilizam persistência integrada no sandbox 
            do seu navegador via <strong className="text-slate-800">LocalStorage</strong>. Se deseja restaurar o banco de dados de volta aos 6 registros homologados das especificações, acione o botão abaixo.
          </p>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={handleReset}
              className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 font-sans text-xs font-bold py-2.5 px-4 rounded-lg flex items-center gap-2 transition-all shadow-sm"
            >
              <RotateCcw size={14} />
              Resetar Banco de Dados Mocks
            </button>
            
            {successMsg && (
              <span className="font-sans text-xs font-bold text-emerald-600 flex items-center gap-1">
                <Check size={14} strokeWidth={2.5} />
                Banco de Dados Redefinido com Sucesso!
              </span>
            )}
          </div>
        </section>

        {/* Custom automation triggers */}
        <section className="bg-white rounded-xl p-6 md:p-8 card-shadow space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-200">
              <Sliders size={16} className="text-slate-800" />
            </div>
            <h3 className="font-display text-base font-bold text-slate-900 font-bold">Parâmetros Operacionais</h3>
          </div>

          <div className="space-y-4 pt-2">
            {/* SLA trigger option */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-sans text-xs font-bold text-slate-900">Configuração de SLA Inteligente</p>
                <p className="font-sans text-[11px] text-slate-400 mt-0.5">Alertar automaticamente equipe técnica caso a triagem passe de 5 dias úteis sem parecer.</p>
              </div>
              <button onClick={() => setAutoSla(!autoSla)} className="text-slate-500 hover:opacity-90">
                {autoSla ? <ToggleRight size={36} className="text-slate-900" /> : <ToggleLeft size={36} className="text-slate-300" />}
              </button>
            </div>

            {/* Persistence realtime toggle */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div>
                <p className="font-sans text-xs font-bold text-slate-900">Sincronização em Tempo Real</p>
                <p className="font-sans text-[11px] text-slate-400 mt-0.5">Integrar e disparar alertas fiscais na triagem automática de novos faturamentos.</p>
              </div>
              <button onClick={() => setAllowRealtime(!allowRealtime)} className="text-slate-500 hover:opacity-90">
                {allowRealtime ? <ToggleRight size={36} className="text-slate-900" /> : <ToggleLeft size={36} className="text-slate-300" />}
              </button>
            </div>
          </div>
        </section>

        {/* Informative credentials section */}
        <section className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-3 font-sans text-xs">
          <h4 className="font-bold text-slate-900 flex items-center gap-1.5 font-display text-sm">
            <Info size={16} /> Sobre o Sistema
          </h4>
          <p className="text-slate-600 leading-relaxed">
            Esta interface foi desenhada minuciosamente em paridade visual com os layouts de laudo da 
            <strong className="text-slate-800"> Auto Peças Center Ônibus - Gestão de Garantias</strong>.
          </p>
          <div className="space-y-1 pt-1 font-semibold text-slate-400 text-[10px] uppercase tracking-wider">
            <p>Operador Autenticado: pokasconversa@gmail.com</p>
            <p>Versão de compilação: 1.0.0-Stable</p>
            <p>Ambiente: Cloud Run Microcontainer</p>
          </div>
        </section>
      </div>
    </div>
  );
}
