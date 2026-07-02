import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Sidebar from './components/Sidebar';
import TopNavBar from './components/TopNavBar';
import Dashboard from './components/Dashboard';
import Kanban from './components/Kanban';
import ProtocolForm from './components/ProtocolForm';
import ProtocolDetails from './components/ProtocolDetails';
import ProtocolList from './components/ProtocolList';
import SettingsView from './components/Settings';
import { Protocolo, StatusProtocolo, HistoricoItem } from './types';
import { getProtocols, saveProtocols, INITIAL_PROTOCOLS } from './mockData';

export default function App() {
  const [activeTab, setActiveTab] = React.useState<string>('dashboard');
  const [protocols, setProtocols] = React.useState<Protocolo[]>(() => getProtocols());
  const [selectedProtocolId, setSelectedProtocolId] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  
  // Custom toast notification microstate
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  // Sync state to LocalStorage
  const updateProtocolsState = (newProtocols: Protocolo[]) => {
    setProtocols(newProtocols);
    saveProtocols(newProtocols);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // 1. Create action
  const handleSaveProtocol = (newProtocol: Protocolo) => {
    const updated = [newProtocol, ...protocols];
    updateProtocolsState(updated);
    showToast(`✓ Protocolo ${newProtocol.id} cadastrado com sucesso!`);
    
    // Redirect immediately to its details page to simulate realistic flow
    setSelectedProtocolId(newProtocol.id);
    setActiveTab('protocol-details');
  };

  // 2. Status updater action
  const handleUpdateStatus = (id: string, newStatus: StatusProtocolo) => {
    const updated = protocols.map(p => {
      if (p.id === id) {
        // Append a timeline log tracking this automatic state change
        const log: HistoricoItem = {
          status: newStatus,
          titulo: `Status alterado para ${newStatus}`,
          descricao: `Mudança de estágio realizada manualmente no painel de controle de triagem de pós-vendas.`,
          autor: 'João Silva (Auditor)',
          data: new Date().toISOString()
        };

        return {
          ...p,
          analise_e_status: {
            ...p.analise_e_status,
            status_atual: newStatus,
            data_retorno_cliente: newStatus === 'Aprovado' || newStatus === 'Reprovado' ? new Date().toISOString() : p.analise_e_status.data_retorno_cliente
          },
          historico: [log, ...p.historico]
        };
      }
      return p;
    });

    updateProtocolsState(updated);
    showToast(`⚡ Protocolo #${id} alterado para status "${newStatus}"!`);
  };

  // 3. Add custom history comment
  const handleAddHistoryItem = (id: string, item: HistoricoItem) => {
    const updated = protocols.map(p => {
      if (p.id === id) {
        return {
          ...p,
          analise_e_status: {
            ...p.analise_e_status,
            analise_tecnica: item.descricao // Update core engineer report
          },
          historico: [item, ...p.historico]
        };
      }
      return p;
    });

    updateProtocolsState(updated);
    showToast(`✓ Parecer técnico documentado no histórico!`);
  };

  // 3. Reset database action handler
  const handleResetData = () => {
    updateProtocolsState(INITIAL_PROTOCOLS);
    setActiveTab('dashboard');
    setSelectedProtocolId(null);
    setSearchQuery('');
    showToast('⚙ Banco de dados redefinido para as configurações de fábrica.');
  };

  // Count elements on status "Novo"
  const countNovo = protocols.filter(p => p.analise_e_status.status_atual === 'Novo').length;

  const currentProtocol = protocols.find(p => p.id === selectedProtocolId);

  // Selector function helper to swap tabs
  const handleNavigateToProtocol = (id: string) => {
    setSelectedProtocolId(id);
    setActiveTab('protocol-details');
  };

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-800 antialiased font-sans">
      
      {/* Sidebar Nav panel */}
      <Sidebar 
        activeTab={activeTab === 'protocol-details' ? 'protocolos' : activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedProtocolId(null);
        }} 
        countNovo={countNovo}
      />

      {/* Main Content Area columns wrapper */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-64 w-full">
        
        {/* Top bar indicators */}
        <TopNavBar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          activeTab={activeTab}
        />

        {/* Global Toast micro-indicators */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="fixed top-20 right-6 z-50 bg-slate-900 border border-slate-700 text-white font-sans text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-3"
            >
              <span>{toastMessage}</span>
              <button 
                onClick={() => setToastMessage(null)}
                className="hover:text-amber-400 p-0.5 text-slate-400"
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Canvas body content */}
        <main className="flex-1 p-6 md:p-10 max-w-[1240px] w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + (selectedProtocolId || '')}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {/* Tab component router mapping */}
              {activeTab === 'dashboard' && (
                <Dashboard 
                  protocols={protocols} 
                  onSelectProtocol={handleNavigateToProtocol}
                  onOpenNewForm={() => setActiveTab('novo-protocolo')}
                />
              )}

              {activeTab === 'garantias' && (
                <Kanban 
                  protocols={protocols}
                  onUpdateStatus={handleUpdateStatus}
                  onSelectProtocol={handleNavigateToProtocol}
                  onOpenNewForm={() => setActiveTab('novo-protocolo')}
                  searchQuery={searchQuery}
                />
              )}

              {activeTab === 'protocolos' && (
                <ProtocolList 
                  protocols={protocols}
                  onSelectProtocol={handleNavigateToProtocol}
                  searchQuery={searchQuery}
                />
              )}

              {activeTab === 'novo-protocolo' && (
                <ProtocolForm 
                  onSave={handleSaveProtocol}
                  onCancel={() => {
                    setActiveTab('dashboard');
                  }}
                />
              )}

              {activeTab === 'protocol-details' && currentProtocol ? (
                <ProtocolDetails 
                  protocol={currentProtocol}
                  onBack={() => {
                    // Check if we came from list or dashboard
                    setActiveTab('protocolos');
                    setSelectedProtocolId(null);
                  }}
                  onUpdateStatus={handleUpdateStatus}
                  onAddHistoryItem={handleAddHistoryItem}
                />
              ) : activeTab === 'protocol-details' ? (
                <div className="py-20 text-center text-slate-400">
                  <p className="font-bold">Protocolo solicitado inexistente ou desvinculado.</p>
                  <button 
                    onClick={() => setActiveTab('dashboard')}
                    className="mt-4 px-4 py-2 bg-slate-900 text-white rounded font-sans text-xs font-bold"
                  >
                    Voltar ao Início
                  </button>
                </div>
              ) : null}

              {activeTab === 'configuracoes' && (
                <SettingsView onResetData={handleResetData} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

