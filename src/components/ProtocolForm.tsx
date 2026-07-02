import React, { DragEvent, ChangeEvent } from 'react';
import { 
  Building2, 
  Tag, 
  UploadCloud, 
  ArrowRight, 
  X, 
  Check, 
  HelpCircle,
  FileImage,
  Sparkles,
  Info
} from 'lucide-react';
import { Protocolo, Cliente, TipoOcorrencia } from '../types';
import { MOCK_CLIENTES } from '../mockData';

interface ProtocolFormProps {
  onSave: (newProtocol: Protocolo) => void;
  onCancel: () => void;
}

interface AttachedFile {
  name: string;
  size: string;
  type: string;
}

export default function ProtocolForm({ onSave, onCancel }: ProtocolFormProps) {
  // Input fields state
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCliente, setSelectedCliente] = React.useState<Cliente | null>(null);
  const [showDropdown, setShowDropdown] = React.useState(false);
  
  const [classification, setClassification] = React.useState<TipoOcorrencia>('GARANTIA');
  const [notaFiscal, setNotaFiscal] = React.useState('');
  const [valorEnvolvido, setValorEnvolvido] = React.useState('');
  const [pecaName, setPecaName] = React.useState('');
  const [chassiVin, setChassiVin] = React.useState('');
  const [defeitoDesc, setDefeitoDesc] = React.useState('');
  
  // Drag and drop attachment simulator
  const [attachedFiles, setAttachedFiles] = React.useState<AttachedFile[]>([]);
  const [isDragActive, setIsDragActive] = React.useState(false);

  // Filter clients based on query (by reason, cnpj or code)
  const filteredClientes = React.useMemo(() => {
    if (searchQuery.length < 3) return [];
    const q = searchQuery.toLowerCase();
    return MOCK_CLIENTES.filter(
      c => c.razao_social.toLowerCase().includes(q) || 
           c.cnpj.includes(q) ||
           c.codigo.includes(q)
    );
  }, [searchQuery]);

  React.useEffect(() => {
    if (filteredClientes.length > 0 && !selectedCliente) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [filteredClientes, selectedCliente]);

  // Handle Drag Over
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  // Handle Drag Leave
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  // Helper to format file sizes
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = 1;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  // Handle dropped files
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles: AttachedFile[] = [];
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        const file = e.dataTransfer.files[i];
        newFiles.push({
          name: file.name,
          size: formatBytes(file.size),
          type: file.type
        });
      }
      setAttachedFiles(prev => [...prev, ...newFiles]);
    }
  };

  // Handle manual file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles: AttachedFile[] = [];
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        newFiles.push({
          name: file.name,
          size: formatBytes(file.size),
          type: file.type
        });
      }
      setAttachedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeAttachedFile = (idx: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== idx));
  };

  // Handle click clear search client
  const clearClientSearch = () => {
    setSearchQuery('');
    setSelectedCliente(null);
    setShowDropdown(false);
  };

  // Auto-generate realistic structures on Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCliente) {
      alert('Por favor, selecione um cliente válido na busca de CNPJ ou Código.');
      return;
    }
    if (!pecaName.trim()) {
      alert('Por favor, descreva a Peça ou Conjunto envolvido no chamado.');
      return;
    }
    if (!defeitoDesc.trim()) {
      alert('Por favor, detalhe tecnicamente o defeito alegado.');
      return;
    }

    // Generate unique index sequence
    const generatedNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `APCO-${generatedNum}`;
    const claimVal = parseFloat(valorEnvolvido) || 1200.00;

    // Construct the correct schema compliant to types.ts
    const newProtocolObject: Protocolo = {
      id: newId,
      tipo_ocorrencia: classification,
      data_solicitacao: new Date().toISOString(),
      cliente: selectedCliente,
      dados_fiscais: {
        nota_fiscal: notaFiscal || 'S/NF',
        nfe_retorno_cliente: classification === 'DEVOLUÇÃO' ? `NF. DEV-${notaFiscal || 'S'}` : null,
        dacte: null,
        valor_envolvido: claimVal
      },
      detalhes_ocorrencia: {
        defeito_alegado: defeitoDesc,
        motivo_devolucao: classification === 'DEVOLUÇÃO' ? 'Erro de expedição/compras comercial' : null,
        observacoes: 'Abertura automática via assistente de garantia Center Ônibus.',
        peca_conjunto: pecaName,
        chassi_vin: chassiVin.trim().toUpperCase() || 'NÃO ATRIBUÍDO'
      },
      analise_e_status: {
        status_atual: 'Novo',
        analise_tecnica: null,
        fornecedor_responsavel: null,
        data_retorno_cliente: null
      },
      responsaveis: {
        vendedor: 'Saulo',
        comprador: 'Flávio'
      },
      logistica: {
        tipo_frete: 'FOB',
        transportadora: 'BRASPRESS'
      },
      evidencias: attachedFiles.map(af => ({
        file_name: af.name,
        file_size: af.size,
        upload_date: new Date().toISOString().split('T')[0]
      })),
      historico: [
        {
          status: 'Novo',
          titulo: 'Abertura de Protocolo Realizada',
          descricao: `Registro inicial de ocorrência para análise da peça: ${pecaName}.`,
          autor: 'Suporte Técnico (Triagem)',
          data: new Date().toISOString()
        }
      ]
    };

    onSave(newProtocolObject);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      {/* Header section with inline action link */}
      <div>
        <button
          onClick={onCancel}
          className="inline-flex items-center gap-1.5 text-slate-500 hover:text-black font-sans text-xs font-semibold mb-4 transition-colors p-1 rounded-lg"
        >
          &larr; Voltar para o Dashboard
        </button>
        <h2 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Abertura de Protocolo</h2>
        <p className="font-sans text-sm text-slate-500 mt-1">Preencha os dados abaixo para iniciar uma nova solicitação técnica e garantir agilidade na resolução.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pb-12">
        {/* Left Column: Data Entry inputs */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Section 1: Customer searching selection */}
          <section className="bg-white rounded-xl p-6 md:p-8 card-shadow space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-200">
                <Building2 size={16} className="text-slate-800" />
              </div>
              <h3 className="font-display text-base font-bold text-slate-900">Dados do Cliente</h3>
            </div>

            <div className="relative">
              <label htmlFor="client-search" className="block font-sans text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Buscar Cliente (CNPJ ou Código)
              </label>
              
              <div className="relative flex items-center">
                <input
                  id="client-search"
                  type="text"
                  autoComplete="off"
                  value={selectedCliente ? selectedCliente.razao_social : searchQuery}
                  onChange={(e) => {
                    setSelectedCliente(null);
                    setSearchQuery(e.target.value);
                  }}
                  disabled={selectedCliente !== null}
                  placeholder="Ex: MOVEBUSS ou 21.578..."
                  className={`w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg font-sans text-sm font-medium focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-400 outline-none transition-all ${
                    selectedCliente ? 'bg-slate-100/60 font-bold text-slate-800 border-emerald-200' : ''
                  }`}
                />
                
                {selectedCliente ? (
                  <button
                    type="button"
                    onClick={clearClientSearch}
                    className="absolute right-3 text-xs font-bold text-red-500 hover:underline"
                  >
                    Alterar
                  </button>
                ) : searchQuery ? (
                  <button
                    type="button"
                    onClick={clearClientSearch}
                    className="absolute right-3 text-xs font-bold text-slate-400 hover:text-black"
                  >
                    Defazer
                  </button>
                ) : null}
              </div>

              {/* Dynamic Dropdown Search Results */}
              {showDropdown && filteredClientes.length > 0 && (
                <div className="absolute left-0 right-0 mt-1 max-h-52 bg-white border border-slate-200 rounded-lg shadow-lg overflow-y-auto z-50 divide-y divide-slate-50">
                  {filteredClientes.map(c => (
                    <button
                      key={c.codigo}
                      type="button"
                      onClick={() => {
                        setSelectedCliente(c);
                        setSearchQuery('');
                        setShowDropdown(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors flex flex-col"
                    >
                      <span className="font-sans text-xs font-bold text-slate-900">{c.razao_social}</span>
                      <span className="font-sans text-[10px] text-slate-400 mt-0.5 font-medium">CNPJ: {c.cnpj} | Cód: {c.codigo}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Client specifications indicator helper */}
              {!selectedCliente && (
                <p className="font-sans text-[11px] text-slate-400 mt-2 flex items-center gap-1 font-medium">
                  <Info size={12} /> Digite ao menos 3 caracteres correspondentes para listar os clientes homologados.
                </p>
              )}

              {/* Selection details visual container */}
              {selectedCliente && (
                <div className="mt-4 p-4 rounded-lg bg-emerald-50/20 border border-emerald-100 flex items-center justify-between">
                  <div className="font-sans text-xs text-slate-600 space-y-1">
                    <p><span className="font-bold text-slate-700">Razão Social:</span> {selectedCliente.razao_social}</p>
                    <p><span className="font-bold text-slate-700">CNPJ:</span> {selectedCliente.cnpj}</p>
                    <p><span className="font-bold text-slate-700">Código de Triagem:</span> #{selectedCliente.codigo}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800">
                    <Check size={16} strokeWidth={3} />
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Section 2: Deficiency report analysis fields */}
          <section className="bg-white rounded-xl p-6 md:p-8 card-shadow space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-200">
                <Tag size={16} className="text-slate-800" />
              </div>
              <h3 className="font-display text-base font-bold text-slate-900">Detalhes da Ocorrência</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Select classification */}
              <div>
                <label htmlFor="classification" className="block font-sans text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Classificação da Entrada
                </label>
                <div className="relative">
                  <select
                    id="classification"
                    value={classification}
                    onChange={(e) => setClassification(e.target.value as TipoOcorrencia)}
                    className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-lg font-sans text-sm font-medium focus:bg-white focus:border-slate-400 outline-none transition-all cursor-pointer select-none"
                  >
                    <option value="GARANTIA">Garantia de Peça</option>
                    <option value="DEVOLUÇÃO">Devolução Comercial</option>
                    <option value="FRETE">Problema de Frete (Avaria)</option>
                  </select>
                </div>
              </div>

              {/* Origem document fiscal identifier */}
              <div>
                <label htmlFor="nota-fiscal" className="block font-sans text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Nota Fiscal Original
                </label>
                <input
                  id="nota-fiscal"
                  type="text"
                  placeholder="Número da NF-e ou faturamento"
                  value={notaFiscal}
                  onChange={(e) => setNotaFiscal(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg font-sans text-sm font-medium focus:bg-white focus:border-slate-400 outline-none transition-all"
                />
              </div>

              {/* Dynamic custom field: Part Name */}
              <div>
                <label htmlFor="peca-name" className="block font-sans text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Peça / Conjunto Reclamado
                </label>
                <input
                  id="peca-name"
                  type="text"
                  placeholder="Ex: Alternador Bosch 24V ou Compressor LK39"
                  value={pecaName}
                  onChange={(e) => setPecaName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg font-sans text-sm font-medium focus:bg-white focus:border-slate-400 outline-none transition-all"
                />
              </div>

              {/* Dynamic custom field: Valor Reclamado */}
              <div>
                <label htmlFor="valor-envolvido" className="block font-sans text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Valor Envolvido / Reclamado (R$)
                </label>
                <input
                  id="valor-envolvido"
                  type="number"
                  step="0.01"
                  placeholder="Ex: 2903.40"
                  value={valorEnvolvido}
                  onChange={(e) => setValorEnvolvido(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg font-sans text-sm font-medium focus:bg-white focus:border-slate-400 outline-none transition-all"
                />
              </div>

              {/* VIN Chassi identifier */}
              <div className="md:col-span-2">
                <label htmlFor="chassi-vin" className="block font-sans text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Número do Chassi / VIN do Ônibus (Opcional)
                </label>
                <input
                  id="chassi-vin"
                  type="text"
                  placeholder="Ex: 9BWZZZ3778T000001"
                  value={chassiVin}
                  onChange={(e) => setChassiVin(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg font-sans text-sm font-medium focus:bg-white focus:border-slate-400 outline-none transition-all"
                />
              </div>

              {/* Detailed description text */}
              <div className="md:col-span-2">
                <label htmlFor="defeito-desc" className="block font-sans text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Descrição do Defeito / Motivo Comercial
                </label>
                <textarea
                  id="defeito-desc"
                  rows={4}
                  value={defeitoDesc}
                  onChange={(e) => setDefeitoDesc(e.target.value)}
                  placeholder="Por favor, descreva detalhadamente qual o problema técnico constatado ou as razões do pedido comercial de devolução do produto..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg font-sans text-sm font-medium focus:bg-white focus:border-slate-400 outline-none transition-all resize-y"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Upload Files drag-area & Action CTA buttons */}
        <div className="lg:col-span-4 space-y-6">
          <section className="bg-white rounded-xl p-6 md:p-8 card-shadow flex flex-col justify-between">
            <div>
              <h3 className="font-display text-base font-bold text-slate-900 mb-2">Evidências</h3>
              <p className="font-sans text-xs text-slate-400 leading-relaxed mb-6">
                Anexe fotos reais do produto recebido, defeitos visíveis, danos na embalagem ou laudo laboratorial do cliente.
              </p>
            </div>

            {/* Custom Interactive File Drag Drop Area */}
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer relative group flex flex-col items-center justify-center min-h-[220px] ${
                isDragActive 
                  ? 'border-slate-905 bg-slate-105/50 font-bold scale-[1.01]' 
                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              <input
                id="file-element"
                type="file"
                multiple
                accept="image/*,application/pdf"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              
              <div className="w-12 h-12 rounded-full bg-slate-200/50 flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                <UploadCloud size={20} className="text-slate-600" />
              </div>
              
              <span className="font-sans text-xs font-bold text-slate-900 block">Clique ou arraste arquivos</span>
              <span className="font-sans text-[10px] text-slate-400 mt-1 block font-medium">Aceita PDF, JPG, PNG de até 10MB</span>
            </div>

            {/* Uploaded List previews panel */}
            {attachedFiles.length > 0 && (
              <div className="mt-6 space-y-2 max-h-48 overflow-y-auto">
                <p className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Arquivos Preparados ({attachedFiles.length})</p>
                {attachedFiles.map((af, index) => (
                  <div key={index} className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-2 min-w-0 pr-2">
                      <FileImage size={14} className="text-slate-400 shrink-0" />
                      <span className="font-sans text-xs text-slate-800 font-bold truncate max-w-[120px]" title={af.name}>{af.name}</span>
                      <span className="font-sans text-[9px] text-slate-400 shrink-0 font-semibold">{af.size}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAttachedFile(index)}
                      className="p-1 rounded-full text-slate-400 hover:text-red-650 hover:bg-slate-200 shrink-0"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Persistent Sidebar Actions buttons */}
          <div className="bg-white rounded-xl p-6 card-shadow space-y-3">
            <button
              type="submit"
              className="w-full bg-slate-900 text-white font-sans text-sm font-bold py-3.5 rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              <span>Avançar</span>
              <ArrowRight size={16} />
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="w-full bg-white text-slate-500 border border-slate-200 hover:text-black hover:bg-slate-50 font-sans text-sm font-semibold py-3 rounded-lg transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
