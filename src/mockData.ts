/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Protocolo, Cliente } from './types';

export const MOCK_CLIENTES: Cliente[] = [
  {
    codigo: '19046',
    razao_social: 'MOVEBUSS SOLUCOES EM MOBILIDADE URBANA LTDA',
    cnpj: '21.578.642/0001-42',
    contato: 'Flávio (Manutenção)'
  },
  {
    codigo: '12042',
    razao_social: 'VIAÇÃO SANTA MARIA LTDA',
    cnpj: '08.432.190/0001-50',
    contato: 'Carlos (Suprimentos)'
  },
  {
    codigo: '09485',
    razao_social: 'TRANSPORTES GLOBAIS S.A.',
    cnpj: '45.109.840/0002-33',
    contato: 'Márcia Silva'
  },
  {
    codigo: '10392',
    razao_social: 'EXPRESSO METROPOLITANO LTDA',
    cnpj: '14.883.201/0001-11',
    contato: 'Geraldo Nunes'
  },
  {
    codigo: '10301',
    razao_social: 'AUTO VIAÇÃO GAMA',
    cnpj: '03.921.401/0001-99',
    contato: 'Sérgio Reis'
  },
  {
    codigo: '10257',
    razao_social: 'EMPRESA ÔMEGA VIAGENS',
    cnpj: '11.233.444/0001-55',
    contato: 'Paulo Santos'
  },
  {
    codigo: '10214',
    razao_social: 'VIAÇÃO DELTA SUDOESTE',
    cnpj: '56.789.012/0001-34',
    contato: 'Fernanda Lima'
  }
];

export const INITIAL_PROTOCOLS: Protocolo[] = [
  {
    id: 'APCO-001',
    tipo_ocorrencia: 'GARANTIA',
    data_solicitacao: '2023-10-20T16:45:00Z',
    cliente: MOCK_CLIENTES[0], // MOVEBUSS
    dados_fiscais: {
      nota_fiscal: '320335',
      nfe_retorno_cliente: 'NF. 320.335 APCO - parcial',
      dacte: null,
      valor_envolvido: 2903.40
    },
    detalhes_ocorrencia: {
      defeito_alegado: 'Qdo liga e desliga o carro a porta não abre mais',
      motivo_devolucao: null,
      observacoes: 'Garantia 11873 - 26/08/25 - CO1674 - modulo comando porta - 967,80',
      peca_conjunto: 'Módulo de Controle de Porta (PN: 8934-B)',
      chassi_vin: '9BW ZZZ 377 8 T 000001'
    },
    analise_e_status: {
      status_atual: 'Aprovado',
      analise_tecnica: 'Detectado curto-circuito interno no relé de acionamento do módulo. A falha é intermitente e ocorre apenas após variação térmica no compartimento. O laudo confirma vício de fabricação no lote H-402. Procedimento de substituição autorizado conforme manual da montadora.',
      fornecedor_responsavel: 'Siemens Automotive',
      data_retorno_cliente: '2023-10-25T09:15:00Z'
    },
    responsaveis: {
      vendedor: 'Saulo',
      comprador: null
    },
    logistica: {
      tipo_frete: 'FOB',
      transportadora: 'SPEEDWORK'
    },
    evidencias: [
      {
        file_name: 'foto_modulo_queimado.jpg',
        file_size: '2.4 MB',
        upload_date: '2023-10-20'
      },
      {
        file_name: 'laudo_frequencia_eletrica.pdf',
        file_size: '1.2 MB',
        upload_date: '2023-10-22'
      }
    ],
    historico: [
      {
        status: 'Aprovado',
        titulo: 'Aprovado pela Fábrica',
        descricao: 'Substituição da peça autorizada após confirmação técnica de vício de lote.',
        autor: 'Engenheiro Carlos',
        data: '2023-10-25T09:15:00Z'
      },
      {
        status: 'Em Análise',
        titulo: 'Laudo Técnico Emitido',
        descricao: 'Detectado curto-circuito no relé de acionamento do módulo por vício físico.',
        autor: 'Carlos Engenharia',
        data: '2023-10-24T14:30:00Z'
      },
      {
        status: 'Aguardando Peça',
        titulo: 'Peça Recebida na Triagem',
        descricao: 'Produto recebido para exame laboratorial de engenharia pós-vendas.',
        autor: 'Triagem Center Ônibus',
        data: '2023-10-22T10:00:00Z'
      },
      {
        status: 'Novo',
        titulo: 'Abertura do Protocolo',
        descricao: 'Abertura inicial de solicitação técnica realizada pelo portal web do cliente.',
        autor: 'Saulo (Vendas)',
        data: '2023-10-20T16:45:00Z'
      }
    ]
  },
  {
    id: 'APCO-1042',
    tipo_ocorrencia: 'GARANTIA',
    data_solicitacao: '2023-10-24T08:00:00Z',
    cliente: MOCK_CLIENTES[1], // Viação Santa Maria
    dados_fiscais: {
      nota_fiscal: '449102',
      nfe_retorno_cliente: null,
      dacte: null,
      valor_envolvido: 4200.00
    },
    detalhes_ocorrencia: {
      defeito_alegado: 'Compressor travado após 3 dias de uso rodoviário',
      motivo_devolucao: null,
      observacoes: 'Substituído preventivamente no terminal rodoviário paratodos',
      peca_conjunto: 'Compressor de Ar Condicionado Denso 10P30',
      chassi_vin: '9BW ZZZ 377 8 T 992019'
    },
    analise_e_status: {
      status_atual: 'Novo',
      analise_tecnica: null,
      fornecedor_responsavel: null,
      data_retorno_cliente: null
    },
    responsaveis: {
      vendedor: 'Saulo',
      comprador: null
    },
    logistica: {
      tipo_frete: 'CIF',
      transportadora: 'BRASPRESS'
    },
    evidencias: [
      {
        file_name: 'carter_compressor_riscado.jpg',
        file_size: '3.1 MB',
        upload_date: '2023-10-24'
      }
    ],
    historico: [
      {
        status: 'Novo',
        titulo: 'Abertura do Protocolo',
        descricao: 'Protocolo aberto relatando travamento mecânico precoce após instalação externa.',
        autor: 'Admin',
        data: '2023-10-24T08:00:00Z'
      }
    ]
  },
  {
    id: 'APCO-1043',
    tipo_ocorrencia: 'FRETE',
    data_solicitacao: '2023-10-25T11:20:00Z',
    cliente: MOCK_CLIENTES[2], // Transportes Globais
    dados_fiscais: {
      nota_fiscal: '509201',
      nfe_retorno_cliente: 'Declaração de Avaria Anexa',
      dacte: '99201029302',
      valor_envolvido: 1850.00
    },
    detalhes_ocorrencia: {
      defeito_alegado: 'Carcaça quebrada durante transporte FOB e descarga incorreta',
      motivo_devolucao: 'Produto avariado no frete',
      observacoes: 'Ressalva assinada no verso do DACTE pelo motorista da transportadora',
      peca_conjunto: 'Alternador Automotivo Bosch Heavy Duty 24V 80A',
      chassi_vin: '9BW ZZZ 377 8 T 002930'
    },
    analise_e_status: {
      status_atual: 'Novo',
      analise_tecnica: null,
      fornecedor_responsavel: null,
      data_retorno_cliente: null
    },
    responsaveis: {
      vendedor: 'Geraldo',
      comprador: null
    },
    logistica: {
      tipo_frete: 'FOB',
      transportadora: 'SPEEDWORK'
    },
    evidencias: [
      {
        file_name: 'foto_avaria_bobina.png',
        file_size: '1.9 MB',
        upload_date: '2023-10-25'
      }
    ],
    historico: [
      {
        status: 'Novo',
        titulo: 'Abertura do Protocolo',
        descricao: 'Abertura de reclamação de frete por impacto físico na descarga de mercadoria.',
        autor: 'Saulo (Vendas)',
        data: '2023-10-25T11:20:00Z'
      }
    ]
  },
  {
    id: 'APCO-1039',
    tipo_ocorrencia: 'DEVOLUÇÃO',
    data_solicitacao: '2023-10-22T09:00:00Z',
    cliente: MOCK_CLIENTES[3], // Expresso Metropolitano
    dados_fiscais: {
      nota_fiscal: '319201',
      nfe_retorno_cliente: 'NF. 441 - devolução integral',
      dacte: null,
      valor_envolvido: 3400.00
    },
    detalhes_ocorrencia: {
      defeito_alegado: 'Peça comprada equivocadamente pelo comprador do cliente. Sem avaria física.',
      motivo_devolucao: 'Erro de compras do cliente',
      observacoes: 'Produto encontra-se lacrado na caixa original Bosch',
      peca_conjunto: 'Módulo de Injeção Eletrônica EDC17 CO500',
      chassi_vin: '9BW ZZZ 377 8 T 090901'
    },
    analise_e_status: {
      status_atual: 'Em Análise',
      analise_tecnica: 'Aguardando verificação física do selo holográfico para atestar que a embalagem não foi violada.',
      fornecedor_responsavel: 'Bosch do Brasil',
      data_retorno_cliente: null
    },
    responsaveis: {
      vendedor: 'Reginaldo',
      comprador: null
    },
    logistica: {
      tipo_frete: 'CIF',
      transportadora: 'BRASPRESS'
    },
    evidencias: [
      {
        file_name: 'foto_caixa_lacre_bosch.jpg',
        file_size: '2.1 MB',
        upload_date: '2023-10-22'
      }
    ],
    historico: [
      {
        status: 'Em Análise',
        titulo: 'Triagem Inicial Concluída',
        descricao: 'Análise documental aprovada. Produto passará por vistoria regulamentar no almoxarifado.',
        autor: 'Carlos Engenharia',
        data: '2023-10-23T10:00:00Z'
      },
      {
        status: 'Novo',
        titulo: 'Abertura do Protocolo',
        descricao: 'Pedido de devolução mercantil submetido para avaliação comercial.',
        autor: 'Geraldo Nunes (Cliente)',
        data: '2023-10-22T09:00:00Z'
      }
    ]
  },
  {
    id: 'APCO-1030',
    tipo_ocorrencia: 'GARANTIA',
    data_solicitacao: '2023-10-15T14:10:00Z',
    cliente: MOCK_CLIENTES[4], // Auto Viação Gama
    dados_fiscais: {
      nota_fiscal: '190201',
      nfe_retorno_cliente: null,
      dacte: null,
      valor_envolvido: 6200.00
    },
    detalhes_ocorrencia: {
      defeito_alegado: 'Vazamento de óleo excessivo na junta traseira após 15 dias de operação',
      motivo_devolucao: null,
      observacoes: 'Cliente reclama que paralisou veículo urbano gerando multa de linha',
      peca_conjunto: 'Compressor de Ar Knorr-Bremse LK39',
      chassi_vin: '9BW ZZZ 377 8 T 881029'
    },
    analise_e_status: {
      status_atual: 'Aguardando Peça',
      analise_tecnica: 'Laudo preliminar de bancada efetuado. Necessário o envio da peça física para a fábrica para atestar defeito de moldagem do retentor.',
      fornecedor_responsavel: 'Knorr-Bremse',
      data_retorno_cliente: null
    },
    responsaveis: {
      vendedor: 'Saulo',
      comprador: null
    },
    logistica: {
      tipo_frete: 'CIF',
      transportadora: 'EXPRESSO SÃO PAULO'
    },
    evidencias: [
      {
        file_name: 'vazamento_oleo_bancada.mov',
        file_size: '9.4 MB',
        upload_date: '2023-10-16'
      }
    ],
    historico: [
      {
        status: 'Aguardando Peça',
        titulo: 'Aguardando Envio Físico',
        descricao: 'Solicitado envio físico sob regime de redespacho com frete pago pela triagem.',
        autor: 'Engenharia Triagem',
        data: '2023-10-17T11:00:00Z'
      },
      {
        status: 'Novo',
        titulo: 'Abertura do Protocolo',
        descricao: 'Protocolo de garantia técnica aberto via SAC da concessionária.',
        autor: 'Saulo (Vendas)',
        data: '2023-10-15T14:10:00Z'
      }
    ]
  },
  {
    id: 'APCO-1021',
    tipo_ocorrencia: 'DEVOLUÇÃO',
    data_solicitacao: '2023-10-05T10:30:00Z',
    cliente: MOCK_CLIENTES[6], // Viação Delta Sudoeste
    dados_fiscais: {
      nota_fiscal: '210345',
      nfe_retorno_cliente: null,
      dacte: null,
      valor_envolvido: 850.00
    },
    detalhes_ocorrencia: {
      defeito_alegado: 'Solicitada devolução comercial após prazo regulamentar excedido (45 dias)',
      motivo_devolucao: 'Prazo excedido',
      observacoes: 'Produto sem avarias, mas faturamento ocorreu no trimestre anterior',
      peca_conjunto: 'Amortecedor Traseiro Cofap Turbogás Mercedes OF',
      chassi_vin: '9BW ZZZ 377 8 T 004123'
    },
    analise_e_status: {
      status_atual: 'Reprovado',
      analise_tecnica: 'Reprovado pelo setor fiscal. Devoluções de mercadorias faturadas a mais de 30 dias não são cabíveis por regulamento comercial interno da distribuidora.',
      fornecedor_responsavel: null,
      data_retorno_cliente: '2023-10-07T16:00:00Z'
    },
    responsaveis: {
      vendedor: 'Renata',
      comprador: null
    },
    logistica: {
      tipo_frete: 'FOB',
      transportadora: 'SUDOESTE EXPRESS'
    },
    evidencias: [
      {
        file_name: 'amortecedor_caixa_poeira.jpg',
        file_size: '1.2 MB',
        upload_date: '2023-10-05'
      }
    ],
    historico: [
      {
        status: 'Reprovado',
        titulo: 'Devolução Cancelada / Reprovada',
        descricao: 'Recusa fiscal por exceder limite regulamentar de devolução comercial de peças sobressalentes.',
        autor: 'Comercial Center Ônibus',
        data: '2023-10-07T16:00:00Z'
      },
      {
        status: 'Novo',
        titulo: 'Abertura do Protocolo',
        descricao: 'Protocolo de solicitação de devolução aberto pelo cliente.',
        autor: 'Fernanda (Cliente)',
        data: '2023-10-05T10:30:00Z'
      }
    ]
  }
];

export function getProtocols(): Protocolo[] {
  const data = localStorage.getItem('CENTER_ONIBUS_PROTOCOLS');
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('Falha ao restaurar dados do LocalStorage, usando mocks', e);
    }
  }
  return INITIAL_PROTOCOLS;
}

export function saveProtocols(protocols: Protocolo[]): void {
  localStorage.setItem('CENTER_ONIBUS_PROTOCOLS', JSON.stringify(protocols));
}
