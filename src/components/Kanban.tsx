/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Calendar, 
  User, 
  CheckCircle, 
  XCircle, 
  Lock, 
  ArrowLeftRight,
  ChevronLeft,
  ChevronRight,
  Eye,
  Plus
} from 'lucide-react';
import { Protocolo, StatusProtocolo } from '../types';

interface KanbanProps {
  protocols: Protocolo[];
  onUpdateStatus: (id: string, newStatus: StatusProtocolo) => void;
  onSelectProtocol: (id: string) => void;
  onOpenNewForm: () => void;
  searchQuery: string;
}

export default function Kanban({ protocols, onUpdateStatus, onSelectProtocol, onOpenNewForm, searchQuery }: KanbanProps) {
  const columns: { id: StatusProtocolo; label: string; dotColor: string }[] = [
    { id: 'Novo', label: 'Novo', dotColor: 'bg-blue-500' },
    { id: 'Em Análise', label: 'Em Análise', dotColor: 'bg-amber-500' },
    { id: 'Aguardando Peça', label: 'Aguardando Peça', dotColor: 'bg-indigo-500' },
    { id: 'Aprovado', label: 'Aprovado', dotColor: 'bg-emerald-500' },
    { id: 'Reprovado', label: 'Reprovado', dotColor: 'bg-red-500' },
  ];

  // Filter protocols according to global header search query
  const filteredProtocols = protocols.filter(p => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      p.id.toLowerCase().includes(query) ||
      p.cliente.razao_social.toLowerCase().includes(query) ||
      p.cliente.cnpj.includes(query) ||
      p.detalhes_ocorrencia.peca_conjunto.toLowerCase().includes(query) ||
      p.tipo_ocorrencia.toLowerCase().includes(query)
    );
  });

  // Slide to next status
  const getNextStatus = (current: StatusProtocolo): StatusProtocolo | null => {
    const order: StatusProtocolo[] = ['Novo', 'Em Análise', 'Aguardando Peça', 'Aprovado', 'Reprovado'];
    const idx = order.indexOf(current);
    if (idx < order.length - 1) return order[idx + 1];
    return null;
  };

  // Slide to previous status
  const getPrevStatus = (current: StatusProtocolo): StatusProtocolo | null => {
    const order: StatusProtocolo[] = ['Novo', 'Em Análise', 'Aguardando Peça', 'Aprovado', 'Reprovado'];
    const idx = order.indexOf(current);
    if (idx > 0) return order[idx - 1];
    return null;
  };

  return (
    <div className="space-y-6 flex flex-col h-full animate-fade-in">
      {/* Header Info */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-slate-900">Quadro de Ocorrências</h2>
          <p className="font-sans text-sm text-slate-500 mt-1">Gerencie o fluxo operacional de triagem operacional e laudos técnicos.</p>
        </div>
        <button
          onClick={onOpenNewForm}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-black font-sans text-xs font-semibold flex items-center gap-2 shadow-sm transition-all shrink-0"
        >
          <Plus size={14} strokeWidth={2.5} />
          <span>Cadastrar Protocolo</span>
        </button>
      </div>

      {searchQuery && (
        <div className="bg-slate-100 px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 inline-block self-start font-sans">
          Filtrando por: "{searchQuery}" — {filteredProtocols.length} de {protocols.length} itens encontrados
        </div>
      )}

      {/* Kanban Board Container */}
      <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-thin select-none snap-x h-[calc(100vh-14rem)] min-h-[500px]">
        {columns.map((col) => {
          const colProtocols = filteredProtocols.filter(p => p.analise_e_status.status_atual === col.id);
          const hasPrev = getPrevStatus(col.id) !== null;
          const hasNext = getNextStatus(col.id) !== null;

          return (
            <div 
              key={col.id} 
              className="flex flex-col w-72 md:w-80 shrink-0 bg-slate-50 rounded-xl p-4 border border-slate-200 snap-center"
            >
              {/* Column Header */}
              <div className="flex justify-between items-center mb-4 px-1 shrink-0">
                <h3 className="font-display text-sm font-extrabold text-slate-800 flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${col.dotColor}`}></span>
                  <span>{col.label}</span>
                </h3>
                <span className="bg-slate-200/80 text-slate-700 font-sans text-xs font-semibold px-2 py-0.5 rounded-full">
                  {colProtocols.length}
                </span>
              </div>

              {/* Column Cards Feed Area */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
                {colProtocols.length === 0 ? (
                  <div className="h-28 border border-dashed border-slate-200 rounded-xl flex items-center justify-center text-center p-4">
                    <p className="font-sans text-slate-400 text-xs font-medium">Nenhum protocolo neste status</p>
                  </div>
                ) : (
                  colProtocols.map((p) => {
                    const nextSt = getNextStatus(p.analise_e_status.status_atual);
                    const prevSt = getPrevStatus(p.analise_e_status.status_atual);
                    
                    return (
                      <div
                        key={p.id}
                        className={`bg-white p-4 rounded-xl shadow-sm border transition-all ${
                          col.id === 'Aprovado' 
                            ? 'border-l-4 border-l-emerald-500 border-slate-200 bg-emerald-50/10' 
                            : col.id === 'Reprovado' 
                              ? 'border-l-4 border-l-red-500 border-slate-200 bg-red-50/10' 
                              : 'border-slate-200 hover:border-slate-350 hover:shadow-md'
                        }`}
                      >
                        {/* Tags and ID */}
                        <div className="flex justify-between items-start mb-2 gap-2">
                          <button
                            onClick={() => onSelectProtocol(p.id)}
                            className="font-display text-xs font-extrabold text-slate-900 hover:underline hover:text-black shrink-0 text-left"
                          >
                            {p.id}
                          </button>
                          
                          <span className={`px-2 py-0.5 rounded font-sans text-[10px] font-extrabold uppercase tracking-wider ${
                            p.tipo_ocorrencia === 'GARANTIA'
                              ? 'bg-amber-100 text-amber-800'
                              : p.tipo_ocorrencia === 'DEVOLUÇÃO'
                                ? 'bg-indigo-100 text-indigo-800'
                                : 'bg-sky-100 text-sky-800'
                          }`}>
                            {p.tipo_ocorrencia}
                          </span>
                        </div>

                        {/* Title Part */}
                        <h4 className="font-display text-sm font-bold text-slate-800 line-clamp-1">
                          {p.cliente.razao_social}
                        </h4>
                        <p className="font-sans text-xs text-slate-400 mt-0.5 font-medium line-clamp-2">
                          {p.detalhes_ocorrencia.peca_conjunto}
                        </p>

                        {/* Footer card fields: Date & User initials */}
                        <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100 text-slate-400">
                          <div className="flex items-center gap-1.5 font-sans text-xs font-semibold">
                            <Calendar size={12} />
                            <span>
                              {new Date(p.data_solicitacao).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: 'short'
                              })}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* View complete ticket button */}
                            <button
                              onClick={() => onSelectProtocol(p.id)}
                              className="p-1 rounded text-slate-400 hover:text-black hover:bg-slate-50"
                              title="Visualizar Detalhes"
                            >
                              <Eye size={12} />
                            </button>
                            
                            <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-sans text-[10px] font-bold border border-slate-200">
                              {p.responsaveis.vendedor ? p.responsaveis.vendedor.slice(0, 2).toUpperCase() : 'CO'}
                            </div>
                          </div>
                        </div>

                        {/* Column Quick Navigation Toggles */}
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-dashed border-slate-150 gap-1">
                          <button
                            onClick={() => prevSt && onUpdateStatus(p.id, prevSt)}
                            disabled={!prevSt}
                            className={`p-1 rounded flex items-center justify-center transition-all ${
                              prevSt 
                                ? 'text-slate-500 hover:text-black hover:bg-slate-100 cursor-pointer' 
                                : 'text-slate-200 cursor-not-allowed'
                            }`}
                            title={prevSt ? `Mover para ${prevSt}` : 'Início do fluxo'}
                          >
                            <ChevronLeft size={16} />
                          </button>
                          
                          <span className="font-sans text-[10px] font-semibold text-slate-400">
                            Ações de Triagem
                          </span>

                          <button
                            onClick={() => nextSt && onUpdateStatus(p.id, nextSt)}
                            disabled={!nextSt}
                            className={`p-1 rounded flex items-center justify-center transition-all ${
                              nextSt 
                                ? 'text-slate-500 hover:text-black hover:bg-slate-100 cursor-pointer' 
                                : 'text-slate-200 cursor-not-allowed'
                            }`}
                            title={nextSt ? `Mover para ${nextSt}` : 'Fim do fluxo'}
                          >
                            <ChevronRight size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
