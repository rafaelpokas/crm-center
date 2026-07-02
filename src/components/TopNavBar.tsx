import React from 'react';
import { Search, Bell, HelpCircle, User } from 'lucide-react';

interface TopNavBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTab: string;
}

export default function TopNavBar({ searchQuery, setSearchQuery, activeTab }: TopNavBarProps) {
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [unreadCount, setUnreadCount] = React.useState(2);

  const notificationList = [
    { id: 1, text: 'Protocolo APCO-1043 foi aberto via Frete.', time: 'há 10 min' },
    { id: 2, text: 'Lauto Técnico do compressor APCO-001 foi homologado.', time: 'há 2 horas' }
  ];

  return (
    <header className="sticky top-0 z-30 flex justify-between items-center px-6 md:px-10 bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 w-full gap-4 print:hidden">
      {/* Search Bar - Hidden on creation forms, active elsewhere */}
      <div className="flex-1 max-w-sm pl-8 md:pl-0">
        <div className="relative flex items-center w-full h-10 rounded-full bg-slate-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-slate-200 border border-transparent transition-all overflow-hidden">
          <div className="grid place-items-center h-full w-10 text-slate-400">
            <Search size={16} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              activeTab === 'garantias' 
                ? "Buscar no quadro..." 
                : activeTab === 'protocolos'
                  ? "Buscar na planilha..."
                  : "Pesquisar protocolos, peças..."
            }
            className="h-full w-full outline-none text-sm text-slate-800 bg-transparent pr-4 font-sans font-medium placeholder-slate-400"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="text-xs text-slate-400 hover:text-slate-900 pr-3 font-semibold"
            >
              Limpar
            </button>
          )}
        </div>
      </div>

      {/* Action Badges & Profile */}
      <div className="flex items-center gap-2 md:gap-4 shrink-0">
        <button 
          onClick={() => {
            alert('Ajuda Center Ônibus\n\nEste é o sistema inteligente para tratamento técnico-comercial de garantia de peças, devoluções mercantis e avarias em fretes. Pesquise por clientes ou abra solicitações diretamente pelo botão "Novo Protocolo".');
          }}
          className="text-slate-500 hover:text-black transition-all p-2 rounded-full hover:bg-slate-100"
          title="Ajuda"
        >
          <HelpCircle size={18} />
        </button>

        {/* Notifications Dropdown Container */}
        <div className="relative">
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications);
              setUnreadCount(0); // Mark all as read
            }}
            className="text-slate-500 hover:text-black transition-all p-2 rounded-full hover:bg-slate-100 relative"
            title="Notificações"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-100 font-sans text-xs font-bold text-slate-400 uppercase tracking-wider">
                Notificações Recentes
              </div>
              <ul className="divide-y divide-slate-50">
                {notificationList.map((notif) => (
                  <li key={notif.id} className="px-4 py-3 hover:bg-slate-50 transition-colors">
                    <p className="font-sans text-xs text-slate-700 leading-relaxed">{notif.text}</p>
                    <span className="font-sans text-[10px] text-slate-400 mt-1 block font-medium">{notif.time}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => setShowNotifications(false)}
                className="w-full text-center py-2 text-xs font-bold text-slate-600 hover:text-black hover:bg-slate-50 mt-1 border-t border-slate-100"
              >
                Fechar
              </button>
            </div>
          )}
        </div>

        {/* Vertical divider */}
        <div className="h-6 w-px bg-slate-200" />

        {/* Profile Pill */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col items-end">
            <span className="font-sans text-xs font-semibold text-slate-900 leading-none">João Silva</span>
            <span className="font-sans text-[10px] text-slate-400 mt-0.5 font-medium">Analista Senior</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white font-sans text-xs font-semibold hover:opacity-90 cursor-default border border-slate-200">
            JS
          </div>
        </div>
      </div>
    </header>
  );
}
