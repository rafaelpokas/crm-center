import React from 'react';
import { 
  CheckCircle2, 
  Timer, 
  AlertTriangle, 
  CheckSquare, 
  TrendingDown,
  ChevronRight,
  HelpCircle,
  FileSpreadsheet,
  DollarSign
} from 'lucide-react';
import { Protocolo } from '../types';

interface DashboardProps {
  protocols: Protocolo[];
  onSelectProtocol: (id: string) => void;
  onOpenNewForm: () => void;
}

export default function Dashboard({ protocols, onSelectProtocol, onOpenNewForm }: DashboardProps) {
  // 1. Dynamic Metric Calculations
  const totalProtocols = protocols.length;
  
  // Active protocols are anything not Approved / Reproved
  const activeProtocols = protocols.filter(
    p => p.analise_e_status.status_atual !== 'Aprovado' && p.analise_e_status.status_atual !== 'Reprovado'
  );
  const countActive = activeProtocols.length;
  
  // Resolved protocols
  const resolvedProtocols = protocols.filter(
    p => p.analise_e_status.status_atual === 'Aprovado' || p.analise_e_status.status_atual === 'Reprovado'
  );
  const countResolved = resolvedProtocols.length;
  
  // Indice de Procedencia — mesmo criterio do TCC: aprovados sobre o TOTAL de ocorrencias
  // do periodo (nao sobre os resolvidos), para que sistema e trabalho escrito falem o mesmo numero.
  const approvedCount = protocols.filter(p => p.analise_e_status.status_atual === 'Aprovado').length;
  const indexProcedencia = totalProtocols > 0
    ? parseFloat(((approvedCount / totalProtocols) * 100).toFixed(1))
    : 0;

  const countEmAnalise = protocols.filter(p => p.analise_e_status.status_atual === 'Em Análise').length;
  const percentEmAnalise = countActive > 0
    ? Math.round((countEmAnalise / countActive) * 100)
    : 65;

  // Ciclo Médio de Garantia (dias) — média entre a abertura e o retorno ao cliente (Tabela 2 do TCC)
  const cycleDurations = protocols
    .filter(p => p.analise_e_status.data_retorno_cliente)
    .map(p => {
      const abertura = new Date(p.data_solicitacao).getTime();
      const retorno = new Date(p.analise_e_status.data_retorno_cliente as string).getTime();
      return (retorno - abertura) / (1000 * 60 * 60 * 24);
    })
    .filter(dias => dias >= 0);
  const cicloMedio = cycleDurations.length > 0
    ? (cycleDurations.reduce((a, b) => a + b, 0) / cycleDurations.length).toFixed(1)
    : '0.0';

  // Custo da Não-Qualidade — soma dos valores envolvidos nas ocorrências
  const custoNaoQualidade = protocols.reduce((sum, p) => sum + (p.dados_fiscais.valor_envolvido || 0), 0);
  const custoFormatado = custoNaoQualidade.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  // 2. Classifications Chart Calculation (%)
  const countGarantia = protocols.filter(p => p.tipo_ocorrencia === 'GARANTIA').length;
  const countDevolucao = protocols.filter(p => p.tipo_ocorrencia === 'DEVOLUÇÃO').length;
  const countFrete = protocols.filter(p => p.tipo_ocorrencia === 'FRETE').length;
  
  const pctGarantia = totalProtocols > 0 ? Math.round((countGarantia / totalProtocols) * 100) : 60;
  const pctDevolucao = totalProtocols > 0 ? Math.round((countDevolucao / totalProtocols) * 100) : 25;
  const pctFrete = totalProtocols > 0 ? Math.round((countFrete / totalProtocols) * 100) : 15;

  // Recent warranties to display (ordered by date descending)
  const sortedRecents = [...protocols].sort(
    (a, b) => new Date(b.data_solicitacao).getTime() - new Date(a.data_solicitacao).getTime()
  );

  // Status Badge Renderer
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'Novo':
        return (
          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-800 font-sans text-xs font-semibold border border-blue-100 flex items-center justify-center gap-1.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 block"></span>
            Novo
          </span>
        );
      case 'Em Análise':
        return (
          <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 font-sans text-xs font-semibold border border-amber-100 flex items-center justify-center gap-1.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 block animate-pulse"></span>
            Em Análise
          </span>
        );
      case 'Aguardando Peça':
        return (
          <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 font-sans text-xs font-semibold border border-indigo-100 flex items-center justify-center gap-1.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 block"></span>
            Aguardando Peça
          </span>
        );
      case 'Aprovado':
        return (
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-sans text-xs font-semibold border border-emerald-100 flex items-center justify-center gap-1.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 block"></span>
            Aprovado
          </span>
        );
      case 'Reprovado':
        return (
          <span className="px-3 py-1 rounded-full bg-red-50 text-red-800 font-sans text-xs font-semibold border border-red-100 flex items-center justify-center gap-1.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 block"></span>
            Reprovado
          </span>
        );
      default:
        return null;
    }
  };

  // Bar chart state hover values
  const [hoveredBar, setHoveredBar] = React.useState<number | null>(null);

  // Fluxo mensal derivado dos protocolos reais (últimos 4 meses com registros)
  const barColors = ['bg-slate-300', 'bg-slate-900', 'bg-slate-200', 'bg-sky-200'];
  const monthlyMap = new Map<string, number>();
  [...protocols]
    .sort((a, b) => new Date(a.data_solicitacao).getTime() - new Date(b.data_solicitacao).getTime())
    .forEach(p => {
      const key = new Date(p.data_solicitacao).toLocaleDateString('pt-BR', { month: 'short' });
      monthlyMap.set(key, (monthlyMap.get(key) || 0) + 1);
    });
  const barData = Array.from(monthlyMap.entries())
    .slice(-4)
    .map(([week, count], index) => ({ week, count, colorClass: barColors[index % barColors.length] }));
  const maxBarCount = Math.max(...barData.map(b => b.count), 1);

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Visão Executiva</h2>
          <p className="font-sans text-sm md:text-base text-slate-500 mt-1">Acompanhamento em tempo real de performance de garantias, fluxos de devolução e SLA.</p>
        </div>
        <button
          onClick={onOpenNewForm}
          className="bg-black hover:bg-slate-900 text-white font-sans text-xs font-bold py-2.5 px-4 rounded-lg flex items-center gap-2 shadow-sm transition-all self-start md:self-auto"
        >
          Novo Protocolo
        </button>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {/* KPI 1 */}
        <div className="bg-white rounded-xl p-6 card-shadow flex flex-col justify-between transition-all duration-200 hover:-translate-y-1">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="font-sans text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Índice de Procedência</p>
              <h3 className="font-display text-3xl font-extrabold text-slate-900">{indexProcedencia}%</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="flex items-center gap-1.5 font-sans text-xs font-semibold text-slate-500">
            <CheckCircle2 size={14} />
            <span>{approvedCount} de {totalProtocols} ocorrências do período</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white rounded-xl p-6 card-shadow flex flex-col justify-between transition-all duration-200 hover:-translate-y-1">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="font-sans text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Ciclo Médio de Garantia</p>
              <h3 className="font-display text-3xl font-extrabold text-slate-900">{cicloMedio} <span className="text-sm font-medium text-slate-400">dias</span></h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700">
              <Timer size={18} />
            </div>
          </div>
          <div className="flex items-center gap-1 font-sans text-xs font-semibold text-slate-500">
            <TrendingDown size={14} />
            <span>Da abertura ao retorno ao cliente</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white rounded-xl p-6 card-shadow flex flex-col justify-between border-l-4 border-l-amber-500 transition-all duration-200 hover:-translate-y-1">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="font-sans text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Ocorrências Ativas</p>
              <h3 className="font-display text-3xl font-extrabold text-slate-900">{countActive}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700">
              <AlertTriangle size={18} />
            </div>
          </div>
          <div className="w-full">
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
              <div 
                className="bg-amber-500 h-full transition-all duration-500" 
                style={{ width: `${percentEmAnalise}%` }}
              ></div>
            </div>
            <p className="font-sans text-[10px] font-semibold text-slate-400 mt-2">{percentEmAnalise}% em análise técnica</p>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white rounded-xl p-6 card-shadow flex flex-col justify-between transition-all duration-200 hover:-translate-y-1">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="font-sans text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Resolvido</p>
              <h3 className="font-display text-3xl font-extrabold text-slate-900">{countResolved}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700">
              <CheckSquare size={18} />
            </div>
          </div>
          <p className="font-sans text-[10px] font-semibold text-slate-400">Protocolos aprovados ou reprovados</p>
        </div>

        {/* KPI 5 */}
        <div className="bg-white rounded-xl p-6 card-shadow flex flex-col justify-between transition-all duration-200 hover:-translate-y-1">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="font-sans text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Custo da Não-Qualidade</p>
              <h3 className="font-display text-2xl font-extrabold text-slate-900">{custoFormatado}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700">
              <DollarSign size={18} />
            </div>
          </div>
          <p className="font-sans text-[10px] font-semibold text-slate-400">Valor total envolvido nas ocorrências</p>
        </div>
      </div>

      {/* Metrics Bento Grid (Charts) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Protocol flow (Faux premium bar container) */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 card-shadow flex flex-col justify-between">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-display text-base font-bold text-slate-900">Fluxo de Protocolos</h3>
              <p className="font-sans text-xs text-slate-400 mt-0.5">Distribuição mensal de entradas triadas</p>
            </div>
            <span className="font-sans text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
              Últimos meses
            </span>
          </div>

          {/* Interactive Custom SVG Chart Area */}
          <div className="h-64 relative flex items-end justify-around border-b border-slate-100 pb-4">
            {/* Grid background details */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-4">
              <div className="border-b border-dashed border-slate-100 w-full h-0" />
              <div className="border-b border-dashed border-slate-100 w-full h-0" />
              <div className="border-b border-dashed border-slate-100 w-full h-0" />
              <div className="border-b border-dashed border-slate-100 w-full h-0" />
            </div>

            {/* Bars */}
            {barData.map((bar, index) => {
              // Convert count to percentage height relative to the busiest month
              const heightPercent = `${(bar.count / maxBarCount) * 100}%`;
              const isHovered = hoveredBar === index;

              return (
                <div 
                  key={bar.week}
                  className="flex flex-col items-center gap-3 w-16 group z-10"
                  onMouseEnter={() => setHoveredBar(index)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  <div className="w-full relative flex justify-center">
                    {/* Tooltip */}
                    <div 
                      className={`absolute bottom-full mb-2 bg-slate-950 text-white font-sans text-xs font-bold px-2 px-2.5 py-1 rounded shadow-md pointer-events-none transition-all ${
                        isHovered ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                      }`}
                    >
                      {bar.count} itens
                    </div>
                    {/* Bar graphic */}
                    <div 
                      className={`w-10 rounded-t-sm transition-all duration-300 cursor-pointer ${bar.colorClass} ${
                        isHovered ? 'brightness-95 scale-x-105 shadow-sm' : ''
                      }`}
                      style={{ height: heightPercent, minHeight: '30px' }}
                    />
                  </div>
                  <span className="font-sans text-xs font-bold text-slate-400">{bar.week}</span>
                </div>
              );
            })}
          </div>

          {/* Legend indicators */}
          <div className="flex justify-center gap-6 mt-6 pt-4 border-t border-slate-50">
            <div className="flex items-center gap-2 font-sans text-xs font-semibold text-slate-500">
              <div className="w-3 h-3 rounded-full bg-slate-900"></div> Em Análise
            </div>
            <div className="flex items-center gap-2 font-sans text-xs font-semibold text-slate-500">
              <div className="w-3 h-3 rounded-full bg-sky-200"></div> Resolvido
            </div>
          </div>
        </div>

        {/* Chart 2: Types percentage layout */}
        <div className="bg-white rounded-xl p-6 card-shadow flex flex-col justify-between">
          <div>
            <h3 className="font-display text-base font-bold text-slate-900">Tipos de Ocorrência</h3>
            <p className="font-sans text-xs text-slate-400 mt-0.5">Percentual por canal de triagem</p>
          </div>

          <div className="space-y-6 my-auto pt-6 lg:pt-0">
            {/* Progress item 1: Garantia */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-sans text-xs font-bold text-slate-700">Garantia de Peças</span>
                <span className="font-sans text-xs font-extrabold text-slate-900">{pctGarantia}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-slate-900 rounded-full transition-all duration-500" 
                  style={{ width: `${pctGarantia}%` }}
                />
              </div>
              <p className="font-sans text-[10px] text-slate-400 mt-1 font-medium">{countGarantia} ocorrências ativas</p>
            </div>

            {/* Progress item 2: Devolução */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-sans text-xs font-bold text-slate-700">Devolução Comercial</span>
                <span className="font-sans text-xs font-extrabold text-slate-900">{pctDevolucao}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-slate-400 rounded-full transition-all duration-500" 
                  style={{ width: `${pctDevolucao}%` }}
                />
              </div>
              <p className="font-sans text-[10px] text-slate-400 mt-1 font-medium">{countDevolucao} solicitações mercantis</p>
            </div>

            {/* Progress item 3: Frete */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-sans text-xs font-bold text-slate-700">Frete & Avaria</span>
                <span className="font-sans text-xs font-extrabold text-slate-900">{pctFrete}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-sky-200 rounded-full transition-all duration-500" 
                  style={{ width: `${pctFrete}%` }}
                />
              </div>
              <p className="font-sans text-[10px] text-slate-400 mt-1 font-medium">{countFrete} avarias registradas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-display text-base font-bold text-slate-900">Garantias Recentes (Análise)</h3>
          <span className="font-sans text-xs font-extrabold text-slate-400">{sortedRecents.length} protocolos cadastrados</span>
        </div>

        <div className="flex flex-col gap-3">
          {sortedRecents.map((p) => {
            // Get client initials
            const clientInitials = p.cliente.razao_social
              ? p.cliente.razao_social.split(' ').map(n => n[0]).filter(Boolean).slice(0, 2).join('')
              : 'CO';
              
            return (
              <div
                key={p.id}
                onClick={() => onSelectProtocol(p.id)}
                className="bg-white rounded-xl p-5 card-shadow flex flex-col md:flex-row md:items-center justify-between hover:border-slate-400 transition-all cursor-pointer group gap-4"
              >
                <div className="flex items-center gap-4">
                  {/* Avatar with dynamic color based on occurrence type */}
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-display font-black text-sm shrink-0 border ${
                    p.tipo_ocorrencia === 'GARANTIA' 
                      ? 'bg-slate-50 border-slate-200 text-slate-800' 
                      : p.tipo_ocorrencia === 'DEVOLUÇÃO'
                        ? 'bg-slate-50 border-slate-200 text-slate-500'
                        : 'bg-sky-50 border-sky-100 text-sky-800'
                  }`}>
                    {clientInitials}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-display text-sm font-bold text-slate-900 group-hover:text-black transition-colors leading-tight truncate">
                      {p.detalhes_ocorrencia.peca_conjunto}
                    </h4>
                    <p className="font-sans text-xs font-semibold text-slate-400 mt-1 truncate">
                      Prot: #{p.id} • Chassi: {p.detalhes_ocorrencia.chassi_vin} • {p.cliente.razao_social}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 border-t border-slate-50 pt-3 md:border-transparent md:pt-0 shrink-0">
                  <div className="text-left md:text-right">
                    <p className="font-sans text-[9px] font-bold text-slate-400 uppercase tracking-wider">Abertura</p>
                    <p className="font-sans text-xs font-bold text-slate-700">
                      {new Date(p.data_solicitacao).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {renderStatusBadge(p.analise_e_status.status_atual)}
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-900 transition-colors hidden sm:block" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
