export type TipoOcorrencia = 'GARANTIA' | 'DEVOLUÇÃO' | 'FRETE';

export type StatusProtocolo = 'Novo' | 'Em Análise' | 'Aguardando Peça' | 'Aprovado' | 'Reprovado';

export interface Cliente {
  codigo: string;
  razao_social: string;
  cnpj: string;
  contato: string;
}

export interface DadosFiscais {
  nota_fiscal: string;
  nfe_retorno_cliente: string | null;
  dacte: string | null;
  valor_envolvido: number;
}

export interface DetalhesOcorrencia {
  defeito_alegado: string;
  motivo_devolucao: string | null;
  observacoes: string | null;
  peca_conjunto: string;
  chassi_vin: string;
}

export interface AnaliseEStatus {
  status_atual: StatusProtocolo;
  analise_tecnica: string | null;
  fornecedor_responsavel: string | null;
  data_retorno_cliente: string | null;
}

export interface Responsaveis {
  vendedor: string;
  comprador: string | null;
}

export interface Logistica {
  tipo_frete: 'FOB' | 'CIF';
  transportadora: string;
}

export interface Evidencia {
  file_name: string;
  file_size: string;
  upload_date: string;
}

export interface HistoricoItem {
  status: StatusProtocolo | 'Outro';
  titulo: string;
  descricao: string;
  autor: string;
  data: string; // ISO String
}

export interface Protocolo {
  id: string; // e.g., "APCO-001"
  tipo_ocorrencia: TipoOcorrencia;
  data_solicitacao: string; // ISO String
  cliente: Cliente;
  dados_fiscais: DadosFiscais;
  detalhes_ocorrencia: DetalhesOcorrencia;
  analise_e_status: AnaliseEStatus;
  responsaveis: Responsaveis;
  logistica: Logistica;
  evidencias: Evidencia[];
  historico: HistoricoItem[];
}
