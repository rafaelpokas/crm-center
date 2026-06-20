/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Bus, 
  Plus, 
  LayoutDashboard, 
  KanbanSquare, 
  FileText, 
  Settings, 
  LifeBuoy, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  countNovo: number;
}

export default function Sidebar({ activeTab, setActiveTab, countNovo }: SidebarProps) {
  const [isOpenMobile, setIsOpenMobile] = React.useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'garantias', label: 'Garantias', icon: KanbanSquare, badge: null },
    { id: 'protocolos', label: 'Protocolos', icon: FileText, badge: null },
    { id: 'configuracoes', label: 'Configurações', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden fixed top-3 left-4 z-50">
        <button
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className="p-2 rounded-lg bg-white card-shadow text-slate-700 hover:text-black hover:bg-slate-50 transition-colors"
          title="Alternar menu"
        >
          {isOpenMobile ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Backdrop for mobile */}
      {isOpenMobile && (
        <div 
          className="md:hidden fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={() => setIsOpenMobile(false)}
        />
      )}

      {/* Main Sidebar Panel */}
      <aside 
        className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 py-6 px-4 z-40 flex flex-col justify-between transition-transform duration-300 md:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Header Logo */}
          <div className="flex items-center gap-3 mb-8 px-2 pt-2 md:pt-0">
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200">
              <Bus className="text-black" size={22} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold text-black tracking-tight leading-none">Center Ônibus</h1>
              <p className="font-sans text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-1">Gestão de Garantias</p>
            </div>
          </div>

          {/* CTA: Novo Protocolo */}
          <button
            onClick={() => {
              setActiveTab('novo-protocolo');
              setIsOpenMobile(false);
            }}
            className={`w-full py-3 px-4 rounded-lg font-sans text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 shadow-sm ${
              activeTab === 'novo-protocolo'
                ? 'bg-slate-900 text-white hover:bg-slate-800'
                : 'bg-black text-white hover:bg-slate-900 hover:shadow'
            }`}
          >
            <Plus size={16} strokeWidth={2.5} />
            Novo Protocolo
          </button>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 mt-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpenMobile(false);
                  }}
                  className={`flex items-center justify-between w-full px-4 py-2.5 rounded-lg font-sans text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'text-black bg-slate-100 font-bold border-r-4 border-black'
                      : 'text-slate-600 hover:text-black hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge !== null && (
                    <span className="bg-slate-200 text-slate-700 font-sans text-[11px] font-semibold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Support and Sair */}
        <div className="border-t border-slate-100 pt-4">
          <ul className="flex flex-col gap-1">
            <li>
              <button
                onClick={() => {
                  alert('Suporte Comercial Center Ônibus\n\n🕒 Horário: Seg. a Sex. - 8h às 18h\n📞 Central: (11) 3203-3500\n✉️ E-mail: posvendas@centeronibus.com.br');
                }}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-600 hover:text-black hover:bg-slate-50 transition-colors w-full text-left font-sans text-sm font-medium"
              >
                <LifeBuoy size={18} />
                <span>Suporte</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  if (confirm('Deseja realmente sair do sistema?')) {
                    alert('Logoff simulado com sucesso. Para fins de demonstração, o sistema continuará ativo.');
                  }
                }}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors w-full text-left font-sans text-sm font-medium"
              >
                <LogOut size={18} />
                <span>Sair</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
