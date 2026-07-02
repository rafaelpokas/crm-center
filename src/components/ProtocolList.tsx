import React from 'react';
import { 
  FileText, 
  FolderSearch, 
  ChevronRight, 
  Filter, 
  Calendar, 
  DollarSign,
  Briefcase
} from 'lucide-react';
import { Protocolo, StatusProtocolo, TipoOcorrencia } from '../types';

interface ProtocolListProps {
  protocols: Protocolo[];
  onSelectProtocol: (id: string) => void;
  searchQuery: string;
}

export default function ProtocolList({ protocols, onSelectProtocol, searchQuery }: ProtocolListProps) {
  const [statusFilter, setStatusFilter] = React.useState<string>('all');
  const [typeFilter, setTypeFilter] = React.useState<string>('all');

  // Filter based on search and selected filters
  const filteredProtocols = React.useMemo(() => {
    return protocols.filter(p => {
      // 1. Status Filter
      if (statusFilter !== 'all' && p.analise_e_status.status_atual !== statusFilter) {
        return false;
      }
      
      // 2. Type Filter
      if (typeFilter !== 'all' && p.tipo_ocorrencia !== typeFilter) {
        return false;
      }

      // 3. Search query
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        p.id.toLowerCase().includes(q) ||
        p.cliente.razao_social.toLowerCase().includes(q) ||
        p.cliente.cnpj.includes(q) ||
        p.detalhes_ocorrencia.peca_conjunto.toLowerCase().includes(q) ||
        p.tipo_ocorrencia.toLowerCase().includes(q)
      );
    });
  }, [protocols, searchQuery, statusFilter, typeFilter]);

  // Color formatting helpers
  const getStatusStyle = (status: StatusProtocolo) => {
    switch (status) {
      case 'Novo':
        return 'bg-blue-100 text-blue-800';
      case 'Em Análise':
        return 'bg-amber-100 text-amber-800';
      case 'Aguardando Peça':
        return 'bg-indigo-100 text-indigo-800';
      case 'Aprovado':
        return 'bg-emerald-100 text-emerald-800';
      case 'Reprovado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-slate-100 text-slate-850';
    }
  };

  const getTypeStyle = (type: TipoOcorrencia) => {
    switch (type) {
      case 'GARANTIA':
        return 'bg-amber-50 text-amber-900 border-amber-200';
      case 'DEVOLUÇÃO':
        return 'bg-indigo-50 text-indigo-900 border-indigo-200';
      case 'FRETE':
        return 'bg-sky-50 text-sky-900 border-sky-200';
      default:
        return 'bg-slate-50 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header section */}
      <div>
        <h2 className="font-display text-2xl font-extrabold text-slate-900">Histórico de Protocolos</h2>
        <p className="font-sans text-sm text-slate-500 mt-1">Navegue na planilha unificada para auditar laudos fiscais e ocorrências comerciais.</p>
      </div>

      {/* Filter Toolbar Area */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 card-shadow flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2 text-slate-400">
            <Filter size={16} />
            <span className="font-sans text-xs font-bold text-slate-500 uppercase tracking-wider">Filtrar por:</span>
          </div>

          {/* Status filter selection */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-1 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg font-sans text-xs font-bold text-slate-700 outline-none cursor-pointer"
          >
            <option value="all">Todos os Status</option>
            <option value="Novo">Status: Novo</option>
            <option value="Em Análise">Status: Em Análise</option>
            <option value="Aguardando Peça">Status: Aguardando Peça</option>
            <option value="Aprovado">Status: Aprovado</option>
            <option value="Reprovado">Status: Reprovado</option>
          </select>

          {/* Type filter selection */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="p-1 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg font-sans text-xs font-bold text-slate-700 outline-none cursor-pointer"
          >
            <option value="all">Todas as Ocorrências</option>
            <option value="GARANTIA">Garantias</option>
            <option value="DEVOLUÇÃO">Devoluções</option>
            <option value="FRETE">Avarias em Frete</option>
          </select>
        </div>

        <span className="font-sans text-xs font-bold text-slate-400">
          Visualizando {filteredProtocols.length} de {protocols.length} itens correspondentes
        </span>
      </div>

      {/* Sheet Table list container */}
      <div className="bg-white rounded-xl border border-slate-200 card-shadow overflow-hidden">
        {filteredProtocols.length === 0 ? (
          <div className="py-16 text-center text-slate-400 flex flex-col items-center justify-center gap-2">
            <FolderSearch size={40} className="text-slate-300" />
            <p className="font-sans font-bold text-sm">Nenhum protocolo correspondente encontrado</p>
            <p className="font-sans text-xs text-slate-450">Tente ajustar seus termos de busca ou filtros selecionados.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-sans text-xs">
              <thead>
                <tr className="bg-slate-50/75 border-b border-slate-250/60 text-slate-450 uppercase font-bold text-[10px] tracking-wider select-none">
                  <th className="p-4 px-6">ID Protocolo</th>
                  <th className="p-4">Classificação</th>
                  <th className="p-4">Razão Social do Cliente</th>
                  <th className="p-4">Peça / Conjunto</th>
                  <th className="p-4">Origem Fiscal</th>
                  <th className="p-4 text-right">Valor Sinistro</th>
                  <th className="p-4 text-right">Data Triagem</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 pr-6 flex justify-end">Audit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredProtocols.map((p) => {
                  return (
                    <tr 
                      key={p.id}
                      onClick={() => onSelectProtocol(p.id)}
                      className="hover:bg-slate-50/50 cursor-pointer transition-colors"
                    >
                      {/* ID with design highlight */}
                      <td className="p-4 px-6 font-bold text-slate-900">
                        #{p.id}
                      </td>

                      {/* Code occurrence badge */}
                      <td className="p-4 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded border text-[9px] font-extrabold uppercase tracking-wide ${getTypeStyle(p.tipo_ocorrencia)}`}>
                          {p.tipo_ocorrencia}
                        </span>
                      </td>

                      {/* Client row details */}
                      <td className="p-4 max-w-[180px] truncate" title={p.cliente.razao_social}>
                        <span className="font-bold text-slate-800 block text-xs">{p.cliente.razao_social}</span>
                        <span className="text-[10px] text-slate-400 mt-0.5 font-medium block">CNPJ: {p.cliente.cnpj}</span>
                      </td>

                      {/* Piece detail */}
                      <td className="p-4 max-w-[160px] truncate font-bold text-slate-700" title={p.detalhes_ocorrencia.peca_conjunto}>
                        {p.detalhes_ocorrencia.peca_conjunto}
                      </td>

                      {/* Document invoice receipt code */}
                      <td className="p-4 whitespace-nowrap">
                        <span className="font-mono bg-slate-50 px-2 py-0.5 rounded border border-slate-200/50 text-[11px] font-bold text-slate-600 leading-none">
                          {p.dados_fiscais.nota_fiscal}
                        </span>
                      </td>

                      {/* Claims involved value */}
                      <td className="p-4 text-right font-bold text-slate-900">
                        {p.dados_fiscais.valor_envolvido.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })}
                      </td>

                      {/* Simple date notation */}
                      <td className="p-4 text-right whitespace-nowrap text-slate-450 font-bold">
                        {new Date(p.data_solicitacao).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </td>

                      {/* Status state indicator bubble */}
                      <td className="p-4 text-center whitespace-nowrap">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${getStatusStyle(p.analise_e_status.status_atual)}`}>
                          {p.analise_e_status.status_atual}
                        </span>
                      </td>

                      {/* View row button */}
                      <td className="p-4 pr-6">
                        <button
                          type="button"
                          className="p-1 text-slate-350 hover:text-black hover:bg-slate-100 rounded transition-colors flex ml-auto"
                          title="Fazer auditoria do laudo"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
