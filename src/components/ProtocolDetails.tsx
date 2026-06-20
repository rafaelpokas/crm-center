/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  ArrowLeft, 
  Printer, 
  CheckCircle2, 
  FileText, 
  Settings, 
  Wrench, 
  Check, 
  User, 
  FileCheck,
  ChevronDown,
  Clock,
  Briefcase,
  XCircle,
  FileSpreadsheet
} from 'lucide-react';
import { Protocolo, StatusProtocolo, HistoricoItem } from '../types';

interface ProtocolDetailsProps {
  protocol: Protocolo;
  onBack: () => void;
  onUpdateStatus: (id: string, newStatus: StatusProtocolo) => void;
  onAddHistoryItem: (id: string, item: HistoricoItem) => void;
}

export default function ProtocolDetails({ protocol, onBack, onUpdateStatus, onAddHistoryItem }: ProtocolDetailsProps) {
  const [commentText, setCommentText] = React.useState('');
  const [techName, setTechName] = React.useState('Carlos Engenharia');
  const [showStatusChanger, setShowStatusChanger] = React.useState(false);

  // Print support
  const handlePrint = () => {
    window.print();
  };

  // Post a new comment
  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) {
      alert('Por favor, informe suas conclusões regulamentares no parecer.');
      return;
    }

    const newHistory: HistoricoItem = {
      status: 'Outro',
      titulo: 'Parecer Técnico Postado',
      descricao: commentText.trim(),
      autor: techName,
      data: new Date().toISOString()
    };

    onAddHistoryItem(protocol.id, newHistory);
    setCommentText('');
    alert('Parecer Técnico adicionado ao prontuário e integrado no histórico com sucesso!');
  };

  // Status Badge Helper
  const getStatusBadgeStyle = (st: StatusProtocolo) => {
    switch (st) {
      case 'Novo':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Em Análise':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Aguardando Peça':
        return 'bg-indigo-50 text-indigo-800 border-indigo-200';
      case 'Aprovado':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Reprovado':
        return 'bg-red-50 text-red-800 border-red-200';
      default:
        return 'bg-slate-50 text-slate-800 border-slate-200';
    }
  };

  // Timeline item status coloring
  const getTimelineIndicatorStyle = (st: string) => {
    switch (st) {
      case 'Aprovado':
        return 'bg-emerald-600 ring-emerald-100';
      case 'Reprovado':
        return 'bg-red-600 ring-red-100';
      case 'Novo':
        return 'bg-blue-600 ring-blue-100';
      case 'Em Análise':
        return 'bg-amber-600 ring-amber-100';
      case 'Aguardando Peça':
        return 'bg-indigo-600 ring-indigo-100';
      default:
        return 'bg-slate-500 ring-slate-100';
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in print:p-0">
      {/* Top Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-150 pb-5 print:hidden">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-slate-500 hover:text-black font-sans text-xs font-semibold mb-3 transition-colors p-1 rounded-lg"
          >
            <ArrowLeft size={12} strokeWidth={2.5} />
            Voltar para Protocolos
          </button>
          
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Protocolo {protocol.id}
            </h1>
            <span className={`px-3 py-1 rounded-full text-xs font-extrabold border uppercase tracking-wider ${getStatusBadgeStyle(protocol.analise_e_status.status_atual)}`}>
              {protocol.analise_e_status.status_atual}
            </span>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-2 relative">
          <button
            onClick={handlePrint}
            className="p-2 px-4 rounded-lg border border-slate-200 hover:bg-slate-50 font-sans text-xs font-semibold text-slate-700 transition-colors flex items-center gap-2"
            title="Exportar em formato folha A4"
          >
            <Printer size={14} />
            <span>Imprimir</span>
          </button>

          {/* Alterar Status drop-button */}
          <div className="relative">
            <button
              onClick={() => setShowStatusChanger(!showStatusChanger)}
              className="p-2 px-4 rounded-lg bg-black text-white hover:bg-slate-900 font-sans text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
            >
              <span>Concluir / Alterar Status</span>
              <ChevronDown size={14} />
            </button>

            {showStatusChanger && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg py-1.5 z-50 divide-y divide-slate-50 animate-fade-in">
                <div className="px-3 py-1 font-sans text-[9px] font-bold text-slate-400 uppercase tracking-wider">Mudar status para:</div>
                <button
                  type="button"
                  onClick={() => {
                    onUpdateStatus(protocol.id, 'Novo');
                    setShowStatusChanger(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-50 font-sans text-xs font-medium text-slate-700 flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-600 block"></span> Novo
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onUpdateStatus(protocol.id, 'Em Análise');
                    setShowStatusChanger(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-50 font-sans text-xs font-medium text-slate-700 flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-600 block"></span> Em Análise
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onUpdateStatus(protocol.id, 'Aguardando Peça');
                    setShowStatusChanger(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-50 font-sans text-xs font-medium text-slate-700 flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-indigo-600 block"></span> Aguardando Peça
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onUpdateStatus(protocol.id, 'Aprovado');
                    setShowStatusChanger(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-emerald-50 font-sans text-xs font-bold text-emerald-800 flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-600 block"></span> Autorizar (Aprovado)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onUpdateStatus(protocol.id, 'Reprovado');
                    setShowStatusChanger(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-red-50 font-sans text-xs font-bold text-red-800 flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-red-600 block"></span> Indeferir (Reprovado)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Printed document header block */}
      <div className="hidden print:flex flex-col border-b-2 border-slate-900 pb-4 mb-6">
        <h1 className="font-display text-2xl font-black">CENTER ÔNIBUS DISTRIBUIDORA DE AUTO PEÇAS</h1>
        <p className="font-sans text-sm font-bold uppercase mt-1">Laudo Técnico de Vistoria de Siniestro — Protocolo #{protocol.id}</p>
        <span className="font-sans text-xs text-slate-500 mt-1">Impresso em {new Date().toLocaleDateString('pt-BR')} por pokasconversa@gmail.com</span>
      </div>

      {/* Content Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Primary Column: Report Summaries & Technical comments */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Executive Overview summary */}
          <div className="bg-white rounded-xl p-6 md:p-8 card-shadow space-y-6">
            <h2 className="font-display text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3">Resumo do Sinistro</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Defeito Relatado / Observado</h3>
                <div className="font-sans text-xs font-medium text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-200/60 leading-relaxed italic">
                  "{protocol.detalhes_ocorrencia.defeito_alegado}"
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <h3 className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Valor Reclamado</h3>
                  <p className="font-display text-xl font-black text-slate-900">
                    {protocol.dados_fiscais.valor_envolvido.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Peça / Conjunto</h3>
                  <p className="font-sans text-xs font-bold text-slate-800 flex items-center gap-2">
                    <Settings size={14} className="text-slate-400 mt-0.5" />
                    {protocol.detalhes_ocorrencia.peca_conjunto}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Technical comment analysis block */}
          <div className="bg-white rounded-xl p-6 md:p-8 card-shadow space-y-6">
            <h2 className="font-display text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Wrench size={16} className="text-slate-800 mt-0.5" />
              <span>Análise Técnica e Laudo</span>
            </h2>

            {/* Simulated technicians list stream */}
            <div className="space-y-6">
              {/* Technical feedback comment */}
              {protocol.analise_e_status.analise_tecnica ? (
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                    <User size={16} className="text-slate-600" />
                  </div>
                  <div className="flex-1 bg-slate-50 border border-slate-200/60 rounded-xl p-4 md:p-5">
                    <div className="flex justify-between items-center mb-2 gap-2 flex-wrap">
                      <span className="font-sans text-xs font-bold text-slate-800">Assentamento de Engenharia</span>
                      <span className="font-sans text-[10px] text-slate-400 font-semibold">Triagem Regulamentar</span>
                    </div>
                    <p className="font-sans text-xs font-medium text-slate-600 leading-relaxed">
                      {protocol.analise_e_status.analise_tecnica}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-amber-50/20 border border-amber-100 p-4 rounded-lg text-xs font-sans text-amber-800 font-medium">
                  Nenhum laudo fiscalizado foi postado ainda. Preencha o parecer técnico abaixo para documentar as conclusões laboratoriais.
                </div>
              )}

              {/* Dynamic attachments links list */}
              {protocol.evidencias.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <h4 className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Anexos Vinculados</h4>
                  <div className="flex flex-wrap gap-2">
                    {protocol.evidencias.map((ev, index) => (
                      <button
                        key={index}
                        onClick={() => alert(`Visualizando simulated file: ${ev.file_name} (${ev.file_size})`)}
                        className="px-3 py-1.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded text-xs font-sans text-slate-600 font-semibold flex items-center gap-1.5 transition-colors print:border"
                      >
                        <FileText size={12} className="text-slate-400" />
                        <span>{ev.file_name}</span>
                        <span className="text-[10px] text-slate-400">({ev.file_size})</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input for new technicians review Comments - print-hidden */}
              <form onSubmit={handlePostComment} className="border-t border-slate-100 pt-6 space-y-4 print:hidden">
                <label className="block font-sans text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Postar Laudo / Parecer Técnico Auxiliar
                </label>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="md:col-span-1">
                    <input
                      type="text"
                      value={techName}
                      onChange={(e) => setTechName(e.target.value)}
                      placeholder="Identificação do inspetor"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg font-sans text-xs font-semibold focus:outline-none focus:border-slate-400 bg-slate-50"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <textarea
                      rows={3}
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Conclusões observadas no lote de pós-venda para anotação no histórico..."
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg font-sans text-xs font-medium focus:outline-none focus:border-slate-400 bg-slate-50"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-black text-white hover:bg-slate-900 font-sans text-xs font-bold p-2.5 px-4 rounded-lg flex items-center gap-1.5 transition-all shadow-sm ml-auto"
                >
                  <FileCheck size={14} />
                  <span>Postar Parecer</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right Sidebar Column: Customer specifics & Timeline histories */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Customer info card */}
          <div className="bg-white rounded-xl p-6 card-shadow space-y-5">
            <h2 className="font-display text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3">Dados do Cliente</h2>
            
            <div className="space-y-4 font-sans text-xs leading-relaxed">
              <div>
                <p className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-0.5">Razão Social</p>
                <p className="text-slate-800 font-bold">{protocol.cliente.razao_social}</p>
                <p className="text-[11px] text-slate-400 font-medium">CNPJ: {protocol.cliente.cnpj} | Código: #{protocol.cliente.codigo}</p>
              </div>

              {protocol.dados_fiscais.nota_fiscal && (
                <div className="pt-3 border-t border-slate-100">
                  <p className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-1">Nota Fiscal de Origem</p>
                  <div className="font-mono text-xs text-slate-700 bg-slate-50 p-2 border border-slate-200/60 rounded flex items-center gap-2 w-fit">
                    <FileText size={12} className="text-slate-400" />
                    <span>{protocol.dados_fiscais.nota_fiscal}</span>
                  </div>
                </div>
              )}

              {protocol.detalhes_ocorrencia.chassi_vin && (
                <div className="pt-3 border-t border-slate-100">
                  <p className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-1">Chassi (VIN)</p>
                  <span className="font-mono text-xs text-slate-700 bg-slate-100 px-2.5 py-1 rounded border border-slate-200 w-fit block font-bold leading-none">
                    {protocol.detalhes_ocorrencia.chassi_vin}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Historical timeline logs tracker */}
          <div className="bg-white rounded-xl p-6 card-shadow space-y-5">
            <h2 className="font-display text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3">Histórico do Protocolo</h2>
            
            <div className="relative pl-5 space-y-5 border-l-2 border-slate-100 ml-2">
              {protocol.historico.length === 0 ? (
                <p className="font-sans text-xs text-slate-400 italic">Nenhum evento registrado ainda.</p>
              ) : (
                protocol.historico.map((h, i) => (
                  <div key={i} className="relative">
                    {/* Ring indicator circle */}
                    <div className={`absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full border-2 border-white ring-4 z-10 ${getTimelineIndicatorStyle(h.status)}`} />
                    
                    <div className="space-y-1">
                      <div className="font-sans text-xs font-bold text-slate-900 leading-tight">
                        {h.titulo}
                      </div>
                      <p className="font-sans text-[11px] text-slate-600 leading-relaxed font-semibold">
                        {h.descricao}
                      </p>
                      <div className="flex items-center gap-1 font-sans text-[9px] text-slate-400 font-bold">
                        <Clock size={10} />
                        <span>
                          {new Date(h.data).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })} - {new Date(h.data).toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                        <span>•</span>
                        <span className="text-slate-500 font-bold">{h.autor}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
