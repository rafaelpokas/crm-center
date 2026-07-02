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
  },
  {
    codigo: '18720',
    razao_social: 'EXPRESSO UNIAO LTDA',
    cnpj: '19.350.180/0010-50',
    contato: 'Roberto (Frota)'
  }
];

export const INITIAL_PROTOCOLS: Protocolo[] = [
  {
    id: 'APCO-001',
    tipo_ocorrencia: 'GARANTIA',
    data_solicitacao: '2025-08-14T16:45:00Z',
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
      observacoes: 'Garantia 11873 - CO1674 - módulo comando porta',
      peca_conjunto: 'Módulo de Controle de Porta (PN: 8934-B)',
      chassi_vin: '9BW ZZZ 377 8 T 000001'
    },
    analise_e_status: {
      status_atual: 'Aprovado',
      analise_tecnica: 'Detectado curto-circuito interno no relé de acionamento do módulo. A falha é intermitente e ocorre apenas após variação térmica no compartimento. O laudo confirma vício de fabricação no lote H-402. Procedimento de substituição autorizado conforme manual da montadora.',
      fornecedor_responsavel: 'Siemens Automotive',
      data_retorno_cliente: '2025-08-20T09:15:00Z'
    },
    responsaveis: {
      vendedor: 'Saulo',
      comprador: 'Reginaldo'
    },
    logistica: {
      tipo_frete: 'FOB',
      transportadora: 'SPEEDWORK'
    },
    evidencias: [
      {
        file_name: 'foto_modulo_queimado.jpg',
        file_size: '2.4 MB',
        upload_date: '2025-08-14'
      },
      {
        file_name: 'laudo_frequencia_eletrica.pdf',
        file_size: '1.2 MB',
        upload_date: '2025-08-16'
      }
    ],
    historico: [
      {
        status: 'Aprovado',
        titulo: 'Aprovado pela Fábrica',
        descricao: 'Substituição da peça autorizada após confirmação técnica de vício de lote.',
        autor: 'Engenheiro Carlos',
        data: '2025-08-20T09:15:00Z'
      },
      {
        status: 'Em Análise',
        titulo: 'Laudo Técnico Emitido',
        descricao: 'Detectado curto-circuito no relé de acionamento do módulo por vício físico.',
        autor: 'Carlos Engenharia',
        data: '2025-08-18T14:30:00Z'
      },
      {
        status: 'Aguardando Peça',
        titulo: 'Peça Recebida na Triagem',
        descricao: 'Produto recebido para exame laboratorial de engenharia pós-vendas.',
        autor: 'Triagem Center Ônibus',
        data: '2025-08-16T10:00:00Z'
      },
      {
        status: 'Novo',
        titulo: 'Abertura do Protocolo',
        descricao: 'Abertura inicial de solicitação técnica realizada pelo portal web do cliente.',
        autor: 'Saulo (Vendas)',
        data: '2025-08-14T16:45:00Z'
      }
    ]
  },
  {
    id: 'APCO-002',
    tipo_ocorrencia: 'GARANTIA',
    data_solicitacao: '2025-08-26T10:20:00Z',
    cliente: MOCK_CLIENTES[7], // EXPRESSO UNIAO
    dados_fiscais: {
      nota_fiscal: '321840',
      nfe_retorno_cliente: 'NF. 321.840 - retorno para análise',
      dacte: null,
      valor_envolvido: 1245.00
    },
    detalhes_ocorrencia: {
      defeito_alegado: 'Válvula com vazamento de ar constante, comprometendo a suspensão pneumática',
      motivo_devolucao: null,
      observacoes: 'Ocorrência real registrada no TCC - válvula de grade do ônibus',
      peca_conjunto: 'Válvula Grade Bus (Sistema Pneumático)',
      chassi_vin: '9BW ZZZ 377 8 U 118350'
    },
    analise_e_status: {
      status_atual: 'Aprovado',
      analise_tecnica: 'Constatado defeito de vedação interna da válvula por falha de usinagem do assento. Peça dentro do prazo de garantia. Substituição aprovada e reposição enviada ao cliente.',
      fornecedor_responsavel: 'Master Válvulas Pneumáticas',
      data_retorno_cliente: '2025-09-02T15:00:00Z'
    },
    responsaveis: {
      vendedor: 'Saulo',
      comprador: 'Reginaldo'
    },
    logistica: {
      tipo_frete: 'CIF',
      transportadora: 'BRASPRESS'
    },
    evidencias: [
      {
        file_name: 'valvula_grade_vazamento.jpg',
        file_size: '2.0 MB',
        upload_date: '2025-08-26'
      }
    ],
    historico: [
      {
        status: 'Aprovado',
        titulo: 'Garantia Aprovada',
        descricao: 'Defeito de fabricação confirmado. Reposição autorizada e enviada ao cliente.',
        autor: 'Carlos Engenharia',
        data: '2025-09-02T15:00:00Z'
      },
      {
        status: 'Em Análise',
        titulo: 'Análise Técnica em Andamento',
        descricao: 'Peça em bancada para teste de estanqueidade do assento de vedação.',
        autor: 'Triagem Center Ônibus',
        data: '2025-08-29T11:00:00Z'
      },
      {
        status: 'Novo',
        titulo: 'Abertura do Protocolo',
        descricao: 'Solicitação de garantia aberta pelo SAC para o cliente Expresso União.',
        autor: 'Saulo (Vendas)',
        data: '2025-08-26T10:20:00Z'
      }
    ]
  },
  {
    id: 'APCO-003',
    tipo_ocorrencia: 'GARANTIA',
    data_solicitacao: '2025-09-05T08:00:00Z',
    cliente: MOCK_CLIENTES[1], // Viação Santa Maria
    dados_fiscais: {
      nota_fiscal: '449102',
      nfe_retorno_cliente: 'NF. 451 - retorno garantia',
      dacte: null,
      valor_envolvido: 4200.00
    },
    detalhes_ocorrencia: {
      defeito_alegado: 'Compressor travado após 3 dias de uso rodoviário',
      motivo_devolucao: null,
      observacoes: 'Substituído preventivamente no terminal rodoviário',
      peca_conjunto: 'Compressor de Ar Condicionado Denso 10P30',
      chassi_vin: '9BW ZZZ 377 8 T 992019'
    },
    analise_e_status: {
      status_atual: 'Aprovado',
      analise_tecnica: 'Confirmada falha de rolamento interno por defeito de montagem de fábrica. Garantia aprovada dentro do prazo contratual.',
      fornecedor_responsavel: 'Denso do Brasil',
      data_retorno_cliente: '2025-09-11T16:30:00Z'
    },
    responsaveis: {
      vendedor: 'Saulo',
      comprador: 'Reginaldo'
    },
    logistica: {
      tipo_frete: 'CIF',
      transportadora: 'BRASPRESS'
    },
    evidencias: [
      {
        file_name: 'carter_compressor_riscado.jpg',
        file_size: '3.1 MB',
        upload_date: '2025-09-05'
      }
    ],
    historico: [
      {
        status: 'Aprovado',
        titulo: 'Garantia Aprovada',
        descricao: 'Vício de fabricação confirmado pelo fornecedor. Reposição autorizada.',
        autor: 'Carlos Engenharia',
        data: '2025-09-11T16:30:00Z'
      },
      {
        status: 'Novo',
        titulo: 'Abertura do Protocolo',
        descricao: 'Protocolo aberto relatando travamento mecânico precoce após instalação.',
        autor: 'Admin',
        data: '2025-09-05T08:00:00Z'
      }
    ]
  },
  {
    id: 'APCO-004',
    tipo_ocorrencia: 'GARANTIA',
    data_solicitacao: '2025-09-22T14:10:00Z',
    cliente: MOCK_CLIENTES[4], // Auto Viação Gama
    dados_fiscais: {
      nota_fiscal: '190455',
      nfe_retorno_cliente: 'NF. 205 - retorno',
      dacte: null,
      valor_envolvido: 1780.00
    },
    detalhes_ocorrencia: {
      defeito_alegado: 'Farol com infiltração de água e oxidação do refletor',
      motivo_devolucao: null,
      observacoes: 'Veículo urbano parado em pátio aguardando reposição',
      peca_conjunto: 'Farol Dianteiro LED Arteb (lado esquerdo)',
      chassi_vin: '9BW ZZZ 377 8 T 445501'
    },
    analise_e_status: {
      status_atual: 'Aprovado',
      analise_tecnica: 'Falha de vedação da carcaça constatada. Defeito de fabricação confirmado. Substituição aprovada.',
      fornecedor_responsavel: 'Arteb Iluminação',
      data_retorno_cliente: '2025-09-27T10:00:00Z'
    },
    responsaveis: {
      vendedor: 'Geraldo',
      comprador: 'Reginaldo'
    },
    logistica: {
      tipo_frete: 'CIF',
      transportadora: 'EXPRESSO SÃO PAULO'
    },
    evidencias: [
      {
        file_name: 'farol_infiltracao.jpg',
        file_size: '1.7 MB',
        upload_date: '2025-09-22'
      }
    ],
    historico: [
      {
        status: 'Aprovado',
        titulo: 'Garantia Aprovada',
        descricao: 'Vício de vedação confirmado. Reposição autorizada ao cliente.',
        autor: 'Carlos Engenharia',
        data: '2025-09-27T10:00:00Z'
      },
      {
        status: 'Novo',
        titulo: 'Abertura do Protocolo',
        descricao: 'Protocolo de garantia técnica aberto via SAC.',
        autor: 'Geraldo (Vendas)',
        data: '2025-09-22T14:10:00Z'
      }
    ]
  },
  {
    id: 'APCO-005',
    tipo_ocorrencia: 'DEVOLUÇÃO',
    data_solicitacao: '2025-10-10T09:00:00Z',
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
      observacoes: 'Produto lacrado na caixa original Bosch',
      peca_conjunto: 'Módulo de Injeção Eletrônica EDC17 CO500',
      chassi_vin: '9BW ZZZ 377 8 T 090901'
    },
    analise_e_status: {
      status_atual: 'Aprovado',
      analise_tecnica: 'Selo holográfico íntegro e embalagem não violada. Devolução comercial aprovada dentro do prazo de 30 dias.',
      fornecedor_responsavel: 'Bosch do Brasil',
      data_retorno_cliente: '2025-10-14T11:00:00Z'
    },
    responsaveis: {
      vendedor: 'Reginaldo',
      comprador: 'Reginaldo'
    },
    logistica: {
      tipo_frete: 'CIF',
      transportadora: 'BRASPRESS'
    },
    evidencias: [
      {
        file_name: 'foto_caixa_lacre_bosch.jpg',
        file_size: '2.1 MB',
        upload_date: '2025-10-10'
      }
    ],
    historico: [
      {
        status: 'Aprovado',
        titulo: 'Devolução Aprovada',
        descricao: 'Embalagem íntegra e prazo regulamentar respeitado. Devolução autorizada.',
        autor: 'Comercial Center Ônibus',
        data: '2025-10-14T11:00:00Z'
      },
      {
        status: 'Em Análise',
        titulo: 'Triagem Inicial Concluída',
        descricao: 'Análise documental aprovada. Produto passou por vistoria no almoxarifado.',
        autor: 'Carlos Engenharia',
        data: '2025-10-12T10:00:00Z'
      },
      {
        status: 'Novo',
        titulo: 'Abertura do Protocolo',
        descricao: 'Pedido de devolução mercantil submetido para avaliação comercial.',
        autor: 'Geraldo Nunes (Cliente)',
        data: '2025-10-10T09:00:00Z'
      }
    ]
  },
  {
    id: 'APCO-006',
    tipo_ocorrencia: 'GARANTIA',
    data_solicitacao: '2025-10-28T11:20:00Z',
    cliente: MOCK_CLIENTES[2], // Transportes Globais
    dados_fiscais: {
      nota_fiscal: '509201',
      nfe_retorno_cliente: 'NF. 512 - retorno garantia',
      dacte: null,
      valor_envolvido: 1850.00
    },
    detalhes_ocorrencia: {
      defeito_alegado: 'Alternador não carrega a bateria após poucos dias de uso',
      motivo_devolucao: null,
      observacoes: 'Bancada confirmou baixa geração de corrente',
      peca_conjunto: 'Alternador Automotivo Bosch Heavy Duty 24V 80A',
      chassi_vin: '9BW ZZZ 377 8 T 002930'
    },
    analise_e_status: {
      status_atual: 'Aprovado',
      analise_tecnica: 'Defeito no regulador de tensão constatado em bancada. Vício de fabricação confirmado. Garantia aprovada.',
      fornecedor_responsavel: 'Bosch do Brasil',
      data_retorno_cliente: '2025-11-03T09:30:00Z'
    },
    responsaveis: {
      vendedor: 'Geraldo',
      comprador: 'Reginaldo'
    },
    logistica: {
      tipo_frete: 'FOB',
      transportadora: 'SPEEDWORK'
    },
    evidencias: [
      {
        file_name: 'alternador_bancada.png',
        file_size: '1.9 MB',
        upload_date: '2025-10-28'
      }
    ],
    historico: [
      {
        status: 'Aprovado',
        titulo: 'Garantia Aprovada',
        descricao: 'Falha no regulador de tensão confirmada. Reposição autorizada.',
        autor: 'Carlos Engenharia',
        data: '2025-11-03T09:30:00Z'
      },
      {
        status: 'Novo',
        titulo: 'Abertura do Protocolo',
        descricao: 'Abertura de reclamação técnica de garantia via SAC.',
        autor: 'Geraldo (Vendas)',
        data: '2025-10-28T11:20:00Z'
      }
    ]
  },
  {
    id: 'APCO-007',
    tipo_ocorrencia: 'DEVOLUÇÃO',
    data_solicitacao: '2025-11-12T10:30:00Z',
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
      data_retorno_cliente: '2025-11-14T16:00:00Z'
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
        upload_date: '2025-11-12'
      }
    ],
    historico: [
      {
        status: 'Reprovado',
        titulo: 'Devolução Cancelada / Reprovada',
        descricao: 'Recusa fiscal por exceder limite regulamentar de devolução comercial de peças sobressalentes.',
        autor: 'Comercial Center Ônibus',
        data: '2025-11-14T16:00:00Z'
      },
      {
        status: 'Novo',
        titulo: 'Abertura do Protocolo',
        descricao: 'Protocolo de solicitação de devolução aberto pelo cliente.',
        autor: 'Fernanda (Cliente)',
        data: '2025-11-12T10:30:00Z'
      }
    ]
  },
  {
    id: 'APCO-008',
    tipo_ocorrencia: 'GARANTIA',
    data_solicitacao: '2025-11-27T13:40:00Z',
    cliente: MOCK_CLIENTES[5], // Empresa Ômega
    dados_fiscais: {
      nota_fiscal: '338712',
      nfe_retorno_cliente: 'NF. 610 - retorno',
      dacte: null,
      valor_envolvido: 2360.00
    },
    detalhes_ocorrencia: {
      defeito_alegado: 'Cliente alega queima do motor de partida em uso normal',
      motivo_devolucao: null,
      observacoes: 'Peça apresentava marcas de superaquecimento externo',
      peca_conjunto: 'Motor de Partida ZM 24V',
      chassi_vin: '9BW ZZZ 377 8 T 771201'
    },
    analise_e_status: {
      status_atual: 'Reprovado',
      analise_tecnica: 'Laudo constatou instalação incorreta com aperto inadequado dos terminais, causando mau contato e superaquecimento. Falha por uso/instalação, fora de cobertura de garantia.',
      fornecedor_responsavel: 'ZM Sistemas de Partida',
      data_retorno_cliente: '2025-12-04T11:00:00Z'
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
        file_name: 'motor_partida_superaquecido.jpg',
        file_size: '2.6 MB',
        upload_date: '2025-11-27'
      },
      {
        file_name: 'laudo_reprovacao.pdf',
        file_size: '0.9 MB',
        upload_date: '2025-12-03'
      }
    ],
    historico: [
      {
        status: 'Reprovado',
        titulo: 'Garantia Reprovada',
        descricao: 'Falha atribuída a instalação incorreta pelo cliente. Fora de cobertura.',
        autor: 'Carlos Engenharia',
        data: '2025-12-04T11:00:00Z'
      },
      {
        status: 'Em Análise',
        titulo: 'Laudo Técnico em Andamento',
        descricao: 'Peça em análise de bancada para apuração da causa raiz.',
        autor: 'Triagem Center Ônibus',
        data: '2025-11-30T09:00:00Z'
      },
      {
        status: 'Novo',
        titulo: 'Abertura do Protocolo',
        descricao: 'Protocolo de garantia aberto via SAC.',
        autor: 'Saulo (Vendas)',
        data: '2025-11-27T13:40:00Z'
      }
    ]
  },
  {
    id: 'APCO-009',
    tipo_ocorrencia: 'GARANTIA',
    data_solicitacao: '2025-12-15T09:00:00Z',
    cliente: MOCK_CLIENTES[0], // MOVEBUSS
    dados_fiscais: {
      nota_fiscal: '341990',
      nfe_retorno_cliente: 'NF. 341.990 - retorno para análise',
      dacte: null,
      valor_envolvido: 1520.00
    },
    detalhes_ocorrencia: {
      defeito_alegado: 'Sensor de rotação apresentando leitura intermitente no painel',
      motivo_devolucao: null,
      observacoes: 'Cliente relata falha esporádica de leitura do tacógrafo',
      peca_conjunto: 'Sensor de Rotação (ABS) VDO',
      chassi_vin: '9BW ZZZ 377 8 U 000455'
    },
    analise_e_status: {
      status_atual: 'Em Análise',
      analise_tecnica: 'Peça recebida na triagem. Aguardando teste de continuidade e simulação de temperatura em bancada para reproduzir a falha intermitente.',
      fornecedor_responsavel: 'VDO Continental',
      data_retorno_cliente: null
    },
    responsaveis: {
      vendedor: 'Saulo',
      comprador: 'Reginaldo'
    },
    logistica: {
      tipo_frete: 'CIF',
      transportadora: 'BRASPRESS'
    },
    evidencias: [
      {
        file_name: 'sensor_rotacao.jpg',
        file_size: '1.4 MB',
        upload_date: '2025-12-15'
      }
    ],
    historico: [
      {
        status: 'Em Análise',
        titulo: 'Análise Técnica em Andamento',
        descricao: 'Peça em bancada para reprodução da falha intermitente sob variação térmica.',
        autor: 'Triagem Center Ônibus',
        data: '2025-12-18T10:00:00Z'
      },
      {
        status: 'Novo',
        titulo: 'Abertura do Protocolo',
        descricao: 'Solicitação de garantia aberta pelo portal do cliente.',
        autor: 'Flávio (Cliente)',
        data: '2025-12-15T09:00:00Z'
      }
    ]
  },
  {
    id: 'APCO-010',
    tipo_ocorrencia: 'FRETE',
    data_solicitacao: '2026-01-09T11:00:00Z',
    cliente: MOCK_CLIENTES[2], // Transportes Globais
    dados_fiscais: {
      nota_fiscal: '512338',
      nfe_retorno_cliente: 'Declaração de Avaria Anexa',
      dacte: '99201029302',
      valor_envolvido: 990.00
    },
    detalhes_ocorrencia: {
      defeito_alegado: 'Caixa amassada e produto com carcaça trincada na entrega',
      motivo_devolucao: 'Produto avariado no frete',
      observacoes: 'Ressalva assinada no verso do DACTE pelo motorista da transportadora',
      peca_conjunto: 'Reservatório de Expansão do Radiador',
      chassi_vin: '9BW ZZZ 377 8 U 011882'
    },
    analise_e_status: {
      status_atual: 'Em Análise',
      analise_tecnica: 'Avaria de transporte em apuração junto à transportadora. Aguardando abertura de sinistro com a seguradora do frete.',
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
        file_name: 'foto_avaria_transporte.png',
        file_size: '2.2 MB',
        upload_date: '2026-01-09'
      }
    ],
    historico: [
      {
        status: 'Em Análise',
        titulo: 'Sinistro de Frete em Apuração',
        descricao: 'Documentação de avaria enviada para abertura de sinistro junto à transportadora.',
        autor: 'Logística Center Ônibus',
        data: '2026-01-12T14:00:00Z'
      },
      {
        status: 'Novo',
        titulo: 'Abertura do Protocolo',
        descricao: 'Abertura de reclamação de frete por avaria física na entrega.',
        autor: 'Márcia (Cliente)',
        data: '2026-01-09T11:00:00Z'
      }
    ]
  },
  {
    id: 'APCO-011',
    tipo_ocorrencia: 'GARANTIA',
    data_solicitacao: '2026-01-23T14:10:00Z',
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
      comprador: 'Reginaldo'
    },
    logistica: {
      tipo_frete: 'CIF',
      transportadora: 'EXPRESSO SÃO PAULO'
    },
    evidencias: [
      {
        file_name: 'vazamento_oleo_bancada.mov',
        file_size: '9.4 MB',
        upload_date: '2026-01-24'
      }
    ],
    historico: [
      {
        status: 'Aguardando Peça',
        titulo: 'Aguardando Envio Físico',
        descricao: 'Solicitado envio físico sob regime de redespacho com frete pago pela triagem.',
        autor: 'Engenharia Triagem',
        data: '2026-01-25T11:00:00Z'
      },
      {
        status: 'Novo',
        titulo: 'Abertura do Protocolo',
        descricao: 'Protocolo de garantia técnica aberto via SAC da concessionária.',
        autor: 'Saulo (Vendas)',
        data: '2026-01-23T14:10:00Z'
      }
    ]
  },
  {
    id: 'APCO-012',
    tipo_ocorrencia: 'FRETE',
    data_solicitacao: '2026-02-06T15:30:00Z',
    cliente: MOCK_CLIENTES[1], // Viação Santa Maria
    dados_fiscais: {
      nota_fiscal: '452019',
      nfe_retorno_cliente: 'Declaração de Avaria Anexa',
      dacte: '88320194455',
      valor_envolvido: 1420.00
    },
    detalhes_ocorrencia: {
      defeito_alegado: 'Volume entregue com embalagem violada e peça faltante',
      motivo_devolucao: 'Divergência no transporte',
      observacoes: 'Conferência de recebimento apontou volume aberto',
      peca_conjunto: 'Kit de Embreagem Sachs (disco e platô)',
      chassi_vin: '9BW ZZZ 377 8 U 022019'
    },
    analise_e_status: {
      status_atual: 'Novo',
      analise_tecnica: null,
      fornecedor_responsavel: null,
      data_retorno_cliente: null
    },
    responsaveis: {
      vendedor: 'Renata',
      comprador: null
    },
    logistica: {
      tipo_frete: 'FOB',
      transportadora: 'SPEEDWORK'
    },
    evidencias: [
      {
        file_name: 'volume_violado.jpg',
        file_size: '1.8 MB',
        upload_date: '2026-02-06'
      }
    ],
    historico: [
      {
        status: 'Novo',
        titulo: 'Abertura do Protocolo',
        descricao: 'Reclamação de frete aberta por divergência e violação de embalagem no transporte.',
        autor: 'Carlos (Cliente)',
        data: '2026-02-06T15:30:00Z'
      }
    ]
  },
  {
    id: 'APCO-013',
    tipo_ocorrencia: 'GARANTIA',
    data_solicitacao: '2025-08-05T09:30:00Z',
    cliente: MOCK_CLIENTES[7], // Expresso União
    dados_fiscais: { nota_fiscal: '318920', nfe_retorno_cliente: 'NF. 319 - retorno', dacte: null, valor_envolvido: 967.80 },
    detalhes_ocorrencia: { defeito_alegado: 'Correia rompeu com menos de 30 dias de uso', motivo_devolucao: null, observacoes: 'Sem sinais de desalinhamento de polias', peca_conjunto: 'Correia Poly-V do Alternador', chassi_vin: '9BW ZZZ 377 8 U 130001' },
    analise_e_status: { status_atual: 'Aprovado', analise_tecnica: 'Ruptura por defeito de vulcanização da carcaça têxtil. Vício de fabricação confirmado. Garantia aprovada.', fornecedor_responsavel: 'Gates do Brasil', data_retorno_cliente: '2025-08-11T14:00:00Z' },
    responsaveis: { vendedor: 'Saulo', comprador: 'Reginaldo' },
    logistica: { tipo_frete: 'CIF', transportadora: 'BRASPRESS' },
    evidencias: [{ file_name: 'correia_rompida.jpg', file_size: '1.1 MB', upload_date: '2025-08-05' }],
    historico: [
      { status: 'Aprovado', titulo: 'Garantia Aprovada', descricao: 'Vício de fabricação confirmado. Reposição autorizada.', autor: 'Carlos Engenharia', data: '2025-08-11T14:00:00Z' },
      { status: 'Novo', titulo: 'Abertura do Protocolo', descricao: 'Solicitação de garantia aberta pelo SAC.', autor: 'Saulo (Vendas)', data: '2025-08-05T09:30:00Z' }
    ]
  },
  {
    id: 'APCO-014',
    tipo_ocorrencia: 'GARANTIA',
    data_solicitacao: '2025-08-19T11:15:00Z',
    cliente: MOCK_CLIENTES[0], // Movebuss
    dados_fiscais: { nota_fiscal: '320980', nfe_retorno_cliente: 'NF. 322 - retorno', dacte: null, valor_envolvido: 2820.00 },
    detalhes_ocorrencia: { defeito_alegado: 'Bomba d\'água com folga no eixo e vazamento pelo selo', motivo_devolucao: null, observacoes: 'Superaquecimento reportado pelo motorista', peca_conjunto: 'Bomba d\'Água do Motor', chassi_vin: '9BW ZZZ 377 8 U 140002' },
    analise_e_status: { status_atual: 'Aprovado', analise_tecnica: 'Folga axial do rolamento acima da tolerância de projeto. Defeito de fabricação. Garantia aprovada.', fornecedor_responsavel: 'SKF do Brasil', data_retorno_cliente: '2025-08-26T10:00:00Z' },
    responsaveis: { vendedor: 'Geraldo', comprador: 'Reginaldo' },
    logistica: { tipo_frete: 'CIF', transportadora: 'BRASPRESS' },
    evidencias: [{ file_name: 'bomba_agua_vazamento.jpg', file_size: '1.6 MB', upload_date: '2025-08-19' }],
    historico: [
      { status: 'Aprovado', titulo: 'Garantia Aprovada', descricao: 'Folga do rolamento fora de tolerância. Reposição autorizada.', autor: 'Carlos Engenharia', data: '2025-08-26T10:00:00Z' },
      { status: 'Novo', titulo: 'Abertura do Protocolo', descricao: 'Protocolo de garantia aberto via SAC.', autor: 'Flávio (Cliente)', data: '2025-08-19T11:15:00Z' }
    ]
  },
  {
    id: 'APCO-015',
    tipo_ocorrencia: 'DEVOLUÇÃO',
    data_solicitacao: '2025-09-02T14:40:00Z',
    cliente: MOCK_CLIENTES[1], // Santa Maria
    dados_fiscais: { nota_fiscal: '448210', nfe_retorno_cliente: 'NF. 449 - devolução', dacte: null, valor_envolvido: 2480.00 },
    detalhes_ocorrencia: { defeito_alegado: 'Modelo de filtro incompatível com o chassi do cliente', motivo_devolucao: 'Aplicação incorreta no pedido', observacoes: 'Produto lacrado, embalagem íntegra', peca_conjunto: 'Filtro de Ar Primário', chassi_vin: '9BW ZZZ 377 8 U 150003' },
    analise_e_status: { status_atual: 'Aprovado', analise_tecnica: 'Embalagem íntegra e dentro do prazo de 30 dias. Devolução comercial aprovada.', fornecedor_responsavel: 'Mann-Filter', data_retorno_cliente: '2025-09-06T09:00:00Z' },
    responsaveis: { vendedor: 'Renata', comprador: 'Reginaldo' },
    logistica: { tipo_frete: 'CIF', transportadora: 'BRASPRESS' },
    evidencias: [{ file_name: 'filtro_caixa_lacrada.jpg', file_size: '0.9 MB', upload_date: '2025-09-02' }],
    historico: [
      { status: 'Aprovado', titulo: 'Devolução Aprovada', descricao: 'Prazo e integridade respeitados. Devolução autorizada.', autor: 'Comercial Center Ônibus', data: '2025-09-06T09:00:00Z' },
      { status: 'Novo', titulo: 'Abertura do Protocolo', descricao: 'Pedido de devolução por aplicação incorreta.', autor: 'Carlos (Cliente)', data: '2025-09-02T14:40:00Z' }
    ]
  },
  {
    id: 'APCO-016',
    tipo_ocorrencia: 'FRETE',
    data_solicitacao: '2025-09-12T10:05:00Z',
    cliente: MOCK_CLIENTES[2], // Transportes Globais
    dados_fiscais: { nota_fiscal: '509990', nfe_retorno_cliente: 'Declaração de Avaria', dacte: '77120384991', valor_envolvido: 540.00 },
    detalhes_ocorrencia: { defeito_alegado: 'Cliente alega colmeia amassada na entrega', motivo_devolucao: 'Avaria de transporte', observacoes: 'Sem ressalva no canhoto de entrega', peca_conjunto: 'Radiador de Água (colmeia)', chassi_vin: '9BW ZZZ 377 8 U 160004' },
    analise_e_status: { status_atual: 'Reprovado', analise_tecnica: 'Sem ressalva no comprovante de entrega e sem registro fotográfico no ato do recebimento. Sinistro de frete não caracterizado. Reprovado.', fornecedor_responsavel: null, data_retorno_cliente: '2025-09-16T16:00:00Z' },
    responsaveis: { vendedor: 'Geraldo', comprador: null },
    logistica: { tipo_frete: 'FOB', transportadora: 'SPEEDWORK' },
    evidencias: [{ file_name: 'radiador_amassado.jpg', file_size: '1.3 MB', upload_date: '2025-09-12' }],
    historico: [
      { status: 'Reprovado', titulo: 'Sinistro Não Caracterizado', descricao: 'Ausência de ressalva no recebimento. Reclamação de frete reprovada.', autor: 'Logística Center Ônibus', data: '2025-09-16T16:00:00Z' },
      { status: 'Novo', titulo: 'Abertura do Protocolo', descricao: 'Reclamação de avaria de transporte aberta pelo cliente.', autor: 'Márcia (Cliente)', data: '2025-09-12T10:05:00Z' }
    ]
  },
  {
    id: 'APCO-017',
    tipo_ocorrencia: 'GARANTIA',
    data_solicitacao: '2025-09-18T08:50:00Z',
    cliente: MOCK_CLIENTES[3], // Metropolitano
    dados_fiscais: { nota_fiscal: '319780', nfe_retorno_cliente: 'NF. 320 - retorno', dacte: null, valor_envolvido: 1990.00 },
    detalhes_ocorrencia: { defeito_alegado: 'Turbina com folga excessiva e vazamento de óleo', motivo_devolucao: null, observacoes: 'Peça dentro do prazo de garantia', peca_conjunto: 'Turbocompressor', chassi_vin: '9BW ZZZ 377 8 U 170005' },
    analise_e_status: { status_atual: 'Aprovado', analise_tecnica: 'Folga radial do eixo acima do especificado por defeito de mancal. Vício de fabricação confirmado. Garantia aprovada.', fornecedor_responsavel: 'Garrett Motion', data_retorno_cliente: '2025-09-25T11:30:00Z' },
    responsaveis: { vendedor: 'Saulo', comprador: 'Reginaldo' },
    logistica: { tipo_frete: 'CIF', transportadora: 'EXPRESSO SÃO PAULO' },
    evidencias: [{ file_name: 'turbina_folga.jpg', file_size: '2.0 MB', upload_date: '2025-09-18' }],
    historico: [
      { status: 'Aprovado', titulo: 'Garantia Aprovada', descricao: 'Defeito de mancal confirmado. Reposição autorizada.', autor: 'Carlos Engenharia', data: '2025-09-25T11:30:00Z' },
      { status: 'Novo', titulo: 'Abertura do Protocolo', descricao: 'Protocolo de garantia aberto via SAC.', autor: 'Geraldo Nunes (Cliente)', data: '2025-09-18T08:50:00Z' }
    ]
  },
  {
    id: 'APCO-018',
    tipo_ocorrencia: 'GARANTIA',
    data_solicitacao: '2025-09-29T13:20:00Z',
    cliente: MOCK_CLIENTES[4], // Gama
    dados_fiscais: { nota_fiscal: '190870', nfe_retorno_cliente: 'NF. 210 - retorno', dacte: null, valor_envolvido: 3720.00 },
    detalhes_ocorrencia: { defeito_alegado: 'Bico injetor com vazamento e marcha lenta irregular', motivo_devolucao: null, observacoes: 'Motor apresentando fumaça preta', peca_conjunto: 'Bico Injetor Common Rail', chassi_vin: '9BW ZZZ 377 8 U 180006' },
    analise_e_status: { status_atual: 'Aprovado', analise_tecnica: 'Vazamento interno da agulha por defeito de usinagem. Vício de fabricação. Garantia aprovada.', fornecedor_responsavel: 'Bosch do Brasil', data_retorno_cliente: '2025-10-06T10:00:00Z' },
    responsaveis: { vendedor: 'Saulo', comprador: 'Reginaldo' },
    logistica: { tipo_frete: 'CIF', transportadora: 'EXPRESSO SÃO PAULO' },
    evidencias: [{ file_name: 'bico_injetor.jpg', file_size: '1.5 MB', upload_date: '2025-09-29' }],
    historico: [
      { status: 'Aprovado', titulo: 'Garantia Aprovada', descricao: 'Defeito de usinagem confirmado. Reposição autorizada.', autor: 'Carlos Engenharia', data: '2025-10-06T10:00:00Z' },
      { status: 'Novo', titulo: 'Abertura do Protocolo', descricao: 'Protocolo de garantia aberto via SAC.', autor: 'Sérgio (Cliente)', data: '2025-09-29T13:20:00Z' }
    ]
  },
  {
    id: 'APCO-019',
    tipo_ocorrencia: 'DEVOLUÇÃO',
    data_solicitacao: '2025-10-03T09:10:00Z',
    cliente: MOCK_CLIENTES[5], // Ômega
    dados_fiscais: { nota_fiscal: '338010', nfe_retorno_cliente: null, dacte: null, valor_envolvido: 1130.00 },
    detalhes_ocorrencia: { defeito_alegado: 'Solicitação de devolução por desistência de compra', motivo_devolucao: 'Desistência do cliente', observacoes: 'Embalagem aberta pelo cliente', peca_conjunto: 'Jogo de Pastilhas de Freio', chassi_vin: '9BW ZZZ 377 8 U 190007' },
    analise_e_status: { status_atual: 'Reprovado', analise_tecnica: 'Embalagem violada e produto manuseado. Devolução por desistência não cabível conforme política comercial. Reprovado.', fornecedor_responsavel: null, data_retorno_cliente: '2025-10-07T15:00:00Z' },
    responsaveis: { vendedor: 'Renata', comprador: null },
    logistica: { tipo_frete: 'FOB', transportadora: 'SUDOESTE EXPRESS' },
    evidencias: [{ file_name: 'pastilhas_embalagem_aberta.jpg', file_size: '1.0 MB', upload_date: '2025-10-03' }],
    historico: [
      { status: 'Reprovado', titulo: 'Devolução Reprovada', descricao: 'Produto manuseado e fora de política. Devolução recusada.', autor: 'Comercial Center Ônibus', data: '2025-10-07T15:00:00Z' },
      { status: 'Novo', titulo: 'Abertura do Protocolo', descricao: 'Pedido de devolução por desistência aberto pelo cliente.', autor: 'Paulo (Cliente)', data: '2025-10-03T09:10:00Z' }
    ]
  },
  {
    id: 'APCO-020',
    tipo_ocorrencia: 'GARANTIA',
    data_solicitacao: '2025-10-15T15:00:00Z',
    cliente: MOCK_CLIENTES[6], // Delta
    dados_fiscais: { nota_fiscal: '210900', nfe_retorno_cliente: 'NF. 215 - retorno', dacte: null, valor_envolvido: 2260.00 },
    detalhes_ocorrencia: { defeito_alegado: 'Bomba de direção com ruído e perda de assistência', motivo_devolucao: null, observacoes: 'Direção pesada em manobras', peca_conjunto: 'Bomba de Direção Hidráulica', chassi_vin: '9BW ZZZ 377 8 U 200008' },
    analise_e_status: { status_atual: 'Aprovado', analise_tecnica: 'Desgaste prematuro das palhetas por defeito de material. Vício de fabricação. Garantia aprovada.', fornecedor_responsavel: 'ZF do Brasil', data_retorno_cliente: '2025-10-22T10:00:00Z' },
    responsaveis: { vendedor: 'Geraldo', comprador: 'Reginaldo' },
    logistica: { tipo_frete: 'FOB', transportadora: 'SUDOESTE EXPRESS' },
    evidencias: [{ file_name: 'bomba_direcao.jpg', file_size: '1.4 MB', upload_date: '2025-10-15' }],
    historico: [
      { status: 'Aprovado', titulo: 'Garantia Aprovada', descricao: 'Defeito de material confirmado. Reposição autorizada.', autor: 'Carlos Engenharia', data: '2025-10-22T10:00:00Z' },
      { status: 'Novo', titulo: 'Abertura do Protocolo', descricao: 'Protocolo de garantia aberto via SAC.', autor: 'Fernanda (Cliente)', data: '2025-10-15T15:00:00Z' }
    ]
  },
  {
    id: 'APCO-021',
    tipo_ocorrencia: 'GARANTIA',
    data_solicitacao: '2025-10-21T10:30:00Z',
    cliente: MOCK_CLIENTES[7], // Expresso União
    dados_fiscais: { nota_fiscal: '322500', nfe_retorno_cliente: 'NF. 323 - retorno', dacte: null, valor_envolvido: 815.00 },
    detalhes_ocorrencia: { defeito_alegado: 'Cilindro mestre com perda de pressão no pedal', motivo_devolucao: null, observacoes: 'Pedal afundando durante frenagem', peca_conjunto: 'Cilindro Mestre de Freio', chassi_vin: '9BW ZZZ 377 8 U 210009' },
    analise_e_status: { status_atual: 'Aprovado', analise_tecnica: 'Vedação interna com falha de fabricação, gerando perda de pressão. Garantia aprovada.', fornecedor_responsavel: 'Controil', data_retorno_cliente: '2025-10-27T09:30:00Z' },
    responsaveis: { vendedor: 'Saulo', comprador: 'Reginaldo' },
    logistica: { tipo_frete: 'CIF', transportadora: 'BRASPRESS' },
    evidencias: [{ file_name: 'cilindro_mestre.jpg', file_size: '1.2 MB', upload_date: '2025-10-21' }],
    historico: [
      { status: 'Aprovado', titulo: 'Garantia Aprovada', descricao: 'Falha de vedação confirmada. Reposição autorizada.', autor: 'Carlos Engenharia', data: '2025-10-27T09:30:00Z' },
      { status: 'Novo', titulo: 'Abertura do Protocolo', descricao: 'Solicitação de garantia aberta pelo SAC.', autor: 'Roberto (Cliente)', data: '2025-10-21T10:30:00Z' }
    ]
  },
  {
    id: 'APCO-022',
    tipo_ocorrencia: 'DEVOLUÇÃO',
    data_solicitacao: '2025-11-04T14:00:00Z',
    cliente: MOCK_CLIENTES[0], // Movebuss
    dados_fiscais: { nota_fiscal: '323100', nfe_retorno_cliente: 'NF. 324 - devolução', dacte: null, valor_envolvido: 2560.00 },
    detalhes_ocorrencia: { defeito_alegado: 'Peça duplicada no pedido do cliente', motivo_devolucao: 'Duplicidade de compra', observacoes: 'Produto lacrado na embalagem original', peca_conjunto: 'Retrovisor Elétrico Externo', chassi_vin: '9BW ZZZ 377 8 U 220010' },
    analise_e_status: { status_atual: 'Aprovado', analise_tecnica: 'Embalagem íntegra e dentro do prazo. Devolução comercial aprovada.', fornecedor_responsavel: 'Metagal', data_retorno_cliente: '2025-11-08T10:00:00Z' },
    responsaveis: { vendedor: 'Renata', comprador: 'Reginaldo' },
    logistica: { tipo_frete: 'CIF', transportadora: 'BRASPRESS' },
    evidencias: [{ file_name: 'retrovisor_lacrado.jpg', file_size: '1.1 MB', upload_date: '2025-11-04' }],
    historico: [
      { status: 'Aprovado', titulo: 'Devolução Aprovada', descricao: 'Prazo e integridade respeitados. Devolução autorizada.', autor: 'Comercial Center Ônibus', data: '2025-11-08T10:00:00Z' },
      { status: 'Novo', titulo: 'Abertura do Protocolo', descricao: 'Pedido de devolução por duplicidade de compra.', autor: 'Flávio (Cliente)', data: '2025-11-04T14:00:00Z' }
    ]
  },
  {
    id: 'APCO-023',
    tipo_ocorrencia: 'FRETE',
    data_solicitacao: '2025-11-18T09:45:00Z',
    cliente: MOCK_CLIENTES[1], // Santa Maria
    dados_fiscais: { nota_fiscal: '449550', nfe_retorno_cliente: 'Declaração de Avaria', dacte: '66201938740', valor_envolvido: 1675.00 },
    detalhes_ocorrencia: { defeito_alegado: 'Parabrisa trincado dentro da embalagem', motivo_devolucao: 'Avaria de transporte', observacoes: 'Vidro entregue sem ressalva registrada', peca_conjunto: 'Parabrisa Laminado', chassi_vin: '9BW ZZZ 377 8 U 230011' },
    analise_e_status: { status_atual: 'Reprovado', analise_tecnica: 'Sem registro de ressalva no ato da entrega e prazo de comunicação excedido. Sinistro de frete não aceito. Reprovado.', fornecedor_responsavel: null, data_retorno_cliente: '2025-11-24T16:00:00Z' },
    responsaveis: { vendedor: 'Geraldo', comprador: null },
    logistica: { tipo_frete: 'FOB', transportadora: 'SPEEDWORK' },
    evidencias: [{ file_name: 'parabrisa_trincado.jpg', file_size: '1.9 MB', upload_date: '2025-11-18' }],
    historico: [
      { status: 'Reprovado', titulo: 'Sinistro Não Aceito', descricao: 'Ausência de ressalva e prazo excedido. Reclamação de frete reprovada.', autor: 'Logística Center Ônibus', data: '2025-11-24T16:00:00Z' },
      { status: 'Novo', titulo: 'Abertura do Protocolo', descricao: 'Reclamação de avaria de transporte aberta pelo cliente.', autor: 'Carlos (Cliente)', data: '2025-11-18T09:45:00Z' }
    ]
  },
  {
    id: 'APCO-024',
    tipo_ocorrencia: 'GARANTIA',
    data_solicitacao: '2025-11-24T11:30:00Z',
    cliente: MOCK_CLIENTES[2], // Transportes Globais
    dados_fiscais: { nota_fiscal: '510440', nfe_retorno_cliente: 'NF. 515 - retorno', dacte: null, valor_envolvido: 2890.00 },
    detalhes_ocorrencia: { defeito_alegado: 'Cubo de roda com rolamento ruidoso', motivo_devolucao: null, observacoes: 'Ruído metálico em curvas', peca_conjunto: 'Cubo de Roda Dianteiro', chassi_vin: '9BW ZZZ 377 8 U 240012' },
    analise_e_status: { status_atual: 'Aprovado', analise_tecnica: 'Rolamento com falha de tratamento térmico. Vício de fabricação. Garantia aprovada.', fornecedor_responsavel: 'NSK do Brasil', data_retorno_cliente: '2025-12-01T10:00:00Z' },
    responsaveis: { vendedor: 'Geraldo', comprador: 'Reginaldo' },
    logistica: { tipo_frete: 'FOB', transportadora: 'SPEEDWORK' },
    evidencias: [{ file_name: 'cubo_roda.jpg', file_size: '1.5 MB', upload_date: '2025-11-24' }],
    historico: [
      { status: 'Aprovado', titulo: 'Garantia Aprovada', descricao: 'Falha de tratamento térmico confirmada. Reposição autorizada.', autor: 'Carlos Engenharia', data: '2025-12-01T10:00:00Z' },
      { status: 'Novo', titulo: 'Abertura do Protocolo', descricao: 'Protocolo de garantia aberto via SAC.', autor: 'Márcia (Cliente)', data: '2025-11-24T11:30:00Z' }
    ]
  },
  {
    id: 'APCO-025',
    tipo_ocorrencia: 'GARANTIA',
    data_solicitacao: '2025-12-02T08:20:00Z',
    cliente: MOCK_CLIENTES[3], // Metropolitano
    dados_fiscais: { nota_fiscal: '320110', nfe_retorno_cliente: 'NF. 325 - retorno', dacte: null, valor_envolvido: 620.00 },
    detalhes_ocorrencia: { defeito_alegado: 'Sensor de temperatura com leitura incorreta', motivo_devolucao: null, observacoes: 'Painel acusando superaquecimento falso', peca_conjunto: 'Sensor de Temperatura do Motor', chassi_vin: '9BW ZZZ 377 8 U 250013' },
    analise_e_status: { status_atual: 'Aprovado', analise_tecnica: 'Elemento resistivo fora de calibração de fábrica. Vício de fabricação. Garantia aprovada.', fornecedor_responsavel: 'VDO Continental', data_retorno_cliente: '2025-12-08T09:00:00Z' },
    responsaveis: { vendedor: 'Saulo', comprador: 'Reginaldo' },
    logistica: { tipo_frete: 'CIF', transportadora: 'BRASPRESS' },
    evidencias: [{ file_name: 'sensor_temp.jpg', file_size: '0.8 MB', upload_date: '2025-12-02' }],
    historico: [
      { status: 'Aprovado', titulo: 'Garantia Aprovada', descricao: 'Sensor fora de calibração de fábrica. Reposição autorizada.', autor: 'Carlos Engenharia', data: '2025-12-08T09:00:00Z' },
      { status: 'Novo', titulo: 'Abertura do Protocolo', descricao: 'Protocolo de garantia aberto via SAC.', autor: 'Geraldo Nunes (Cliente)', data: '2025-12-02T08:20:00Z' }
    ]
  },
  {
    id: 'APCO-026',
    tipo_ocorrencia: 'GARANTIA',
    data_solicitacao: '2025-12-09T14:50:00Z',
    cliente: MOCK_CLIENTES[4], // Gama
    dados_fiscais: { nota_fiscal: '191220', nfe_retorno_cliente: 'NF. 220 - retorno', dacte: null, valor_envolvido: 3300.00 },
    detalhes_ocorrencia: { defeito_alegado: 'Caixa de direção com folga e vazamento', motivo_devolucao: null, observacoes: 'Volante com folga acentuada', peca_conjunto: 'Caixa de Direção', chassi_vin: '9BW ZZZ 377 8 U 260014' },
    analise_e_status: { status_atual: 'Aprovado', analise_tecnica: 'Vazamento por falha de vedação do setor de direção. Vício de fabricação. Garantia aprovada.', fornecedor_responsavel: 'ZF do Brasil', data_retorno_cliente: '2025-12-16T10:00:00Z' },
    responsaveis: { vendedor: 'Saulo', comprador: 'Reginaldo' },
    logistica: { tipo_frete: 'CIF', transportadora: 'EXPRESSO SÃO PAULO' },
    evidencias: [{ file_name: 'caixa_direcao.jpg', file_size: '1.7 MB', upload_date: '2025-12-09' }],
    historico: [
      { status: 'Aprovado', titulo: 'Garantia Aprovada', descricao: 'Falha de vedação confirmada. Reposição autorizada.', autor: 'Carlos Engenharia', data: '2025-12-16T10:00:00Z' },
      { status: 'Novo', titulo: 'Abertura do Protocolo', descricao: 'Protocolo de garantia aberto via SAC.', autor: 'Sérgio (Cliente)', data: '2025-12-09T14:50:00Z' }
    ]
  },
  {
    id: 'APCO-027',
    tipo_ocorrencia: 'DEVOLUÇÃO',
    data_solicitacao: '2025-12-19T10:15:00Z',
    cliente: MOCK_CLIENTES[5], // Ômega
    dados_fiscais: { nota_fiscal: '338900', nfe_retorno_cliente: null, dacte: null, valor_envolvido: 1450.00 },
    detalhes_ocorrencia: { defeito_alegado: 'Devolução por troca de fornecedor', motivo_devolucao: 'Mudança de fornecedor', observacoes: 'Faturamento há mais de 60 dias', peca_conjunto: 'Kit Reparo Pinça de Freio', chassi_vin: '9BW ZZZ 377 8 U 270015' },
    analise_e_status: { status_atual: 'Reprovado', analise_tecnica: 'Prazo regulamentar de devolução excedido (superior a 30 dias). Reprovado pelo setor fiscal.', fornecedor_responsavel: null, data_retorno_cliente: '2025-12-23T15:00:00Z' },
    responsaveis: { vendedor: 'Renata', comprador: null },
    logistica: { tipo_frete: 'FOB', transportadora: 'SUDOESTE EXPRESS' },
    evidencias: [{ file_name: 'kit_pinca.jpg', file_size: '0.9 MB', upload_date: '2025-12-19' }],
    historico: [
      { status: 'Reprovado', titulo: 'Devolução Reprovada', descricao: 'Prazo regulamentar excedido. Devolução recusada.', autor: 'Comercial Center Ônibus', data: '2025-12-23T15:00:00Z' },
      { status: 'Novo', titulo: 'Abertura do Protocolo', descricao: 'Pedido de devolução por mudança de fornecedor.', autor: 'Paulo (Cliente)', data: '2025-12-19T10:15:00Z' }
    ]
  },
  {
    id: 'APCO-028',
    tipo_ocorrencia: 'GARANTIA',
    data_solicitacao: '2026-01-05T09:00:00Z',
    cliente: MOCK_CLIENTES[6], // Delta
    dados_fiscais: { nota_fiscal: '211050', nfe_retorno_cliente: 'NF. 225 - retorno', dacte: null, valor_envolvido: 2050.00 },
    detalhes_ocorrencia: { defeito_alegado: 'Ventilador viscoso travando em alta rotação', motivo_devolucao: null, observacoes: 'Consumo elevado e ruído de ventoinha', peca_conjunto: 'Ventilador do Radiador (viscosa)', chassi_vin: '9BW ZZZ 377 8 U 280016' },
    analise_e_status: { status_atual: 'Aprovado', analise_tecnica: 'Embreagem viscosa com falha de acoplamento por defeito interno. Vício de fabricação. Garantia aprovada.', fornecedor_responsavel: 'Behr Hella', data_retorno_cliente: '2026-01-12T10:00:00Z' },
    responsaveis: { vendedor: 'Geraldo', comprador: 'Reginaldo' },
    logistica: { tipo_frete: 'FOB', transportadora: 'SUDOESTE EXPRESS' },
    evidencias: [{ file_name: 'ventilador_viscosa.jpg', file_size: '1.3 MB', upload_date: '2026-01-05' }],
    historico: [
      { status: 'Aprovado', titulo: 'Garantia Aprovada', descricao: 'Falha de acoplamento confirmada. Reposição autorizada.', autor: 'Carlos Engenharia', data: '2026-01-12T10:00:00Z' },
      { status: 'Novo', titulo: 'Abertura do Protocolo', descricao: 'Protocolo de garantia aberto via SAC.', autor: 'Fernanda (Cliente)', data: '2026-01-05T09:00:00Z' }
    ]
  },
  {
    id: 'APCO-029',
    tipo_ocorrencia: 'GARANTIA',
    data_solicitacao: '2026-01-14T11:40:00Z',
    cliente: MOCK_CLIENTES[7], // Expresso União
    dados_fiscais: { nota_fiscal: '324200', nfe_retorno_cliente: 'NF. 326 - retorno para análise', dacte: null, valor_envolvido: 780.00 },
    detalhes_ocorrencia: { defeito_alegado: 'Módulo ABS acusando erro intermitente no painel', motivo_devolucao: null, observacoes: 'Luz de ABS acende esporadicamente', peca_conjunto: 'Módulo ABS/EBS', chassi_vin: '9BW ZZZ 377 8 U 290017' },
    analise_e_status: { status_atual: 'Em Análise', analise_tecnica: 'Peça em bancada para diagnóstico eletrônico e leitura de memória de falhas. Aguardando parecer do fornecedor.', fornecedor_responsavel: 'Wabco', data_retorno_cliente: null },
    responsaveis: { vendedor: 'Saulo', comprador: 'Reginaldo' },
    logistica: { tipo_frete: 'CIF', transportadora: 'BRASPRESS' },
    evidencias: [{ file_name: 'modulo_abs.jpg', file_size: '1.1 MB', upload_date: '2026-01-14' }],
    historico: [
      { status: 'Em Análise', titulo: 'Diagnóstico Eletrônico em Andamento', descricao: 'Leitura de memória de falhas em execução na bancada.', autor: 'Triagem Center Ônibus', data: '2026-01-17T10:00:00Z' },
      { status: 'Novo', titulo: 'Abertura do Protocolo', descricao: 'Solicitação de garantia aberta pelo SAC.', autor: 'Roberto (Cliente)', data: '2026-01-14T11:40:00Z' }
    ]
  },
  {
    id: 'APCO-030',
    tipo_ocorrencia: 'GARANTIA',
    data_solicitacao: '2026-01-27T09:30:00Z',
    cliente: MOCK_CLIENTES[0], // Movebuss
    dados_fiscais: { nota_fiscal: '324980', nfe_retorno_cliente: 'NF. 327 - retorno para análise', dacte: null, valor_envolvido: 1240.00 },
    detalhes_ocorrencia: { defeito_alegado: 'Bomba injetora com baixa pressão de linha', motivo_devolucao: null, observacoes: 'Perda de potência do motor em subidas', peca_conjunto: 'Bomba Injetora Diesel', chassi_vin: '9BW ZZZ 377 8 U 300018' },
    analise_e_status: { status_atual: 'Em Análise', analise_tecnica: 'Peça encaminhada para teste em banca certificada de sistemas diesel. Aguardando laudo de vazão e pressão.', fornecedor_responsavel: 'Bosch do Brasil', data_retorno_cliente: null },
    responsaveis: { vendedor: 'Saulo', comprador: 'Reginaldo' },
    logistica: { tipo_frete: 'CIF', transportadora: 'BRASPRESS' },
    evidencias: [{ file_name: 'bomba_injetora.jpg', file_size: '1.6 MB', upload_date: '2026-01-27' }],
    historico: [
      { status: 'Em Análise', titulo: 'Teste em Banca Diesel', descricao: 'Peça em banca certificada para laudo de vazão e pressão.', autor: 'Triagem Center Ônibus', data: '2026-01-30T10:00:00Z' },
      { status: 'Novo', titulo: 'Abertura do Protocolo', descricao: 'Protocolo de garantia aberto via SAC.', autor: 'Flávio (Cliente)', data: '2026-01-27T09:30:00Z' }
    ]
  },
  {
    id: 'APCO-031',
    tipo_ocorrencia: 'DEVOLUÇÃO',
    data_solicitacao: '2026-02-11T13:10:00Z',
    cliente: MOCK_CLIENTES[1], // Santa Maria
    dados_fiscais: { nota_fiscal: '450300', nfe_retorno_cliente: null, dacte: null, valor_envolvido: 2138.36 },
    detalhes_ocorrencia: { defeito_alegado: 'Devolução por erro de especificação técnica no pedido', motivo_devolucao: 'Especificação incorreta', observacoes: 'Amortecedor incompatível com o eixo do veículo', peca_conjunto: 'Amortecedor Dianteiro', chassi_vin: '9BW ZZZ 377 8 U 310019' },
    analise_e_status: { status_atual: 'Reprovado', analise_tecnica: 'Erro de especificação atribuído ao comprador do cliente, com embalagem já aberta. Devolução não cabível. Reprovado.', fornecedor_responsavel: null, data_retorno_cliente: '2026-02-16T15:00:00Z' },
    responsaveis: { vendedor: 'Renata', comprador: null },
    logistica: { tipo_frete: 'FOB', transportadora: 'SPEEDWORK' },
    evidencias: [{ file_name: 'amortecedor_diant.jpg', file_size: '1.0 MB', upload_date: '2026-02-11' }],
    historico: [
      { status: 'Reprovado', titulo: 'Devolução Reprovada', descricao: 'Erro de especificação do cliente e embalagem aberta. Devolução recusada.', autor: 'Comercial Center Ônibus', data: '2026-02-16T15:00:00Z' },
      { status: 'Novo', titulo: 'Abertura do Protocolo', descricao: 'Pedido de devolução por especificação incorreta.', autor: 'Carlos (Cliente)', data: '2026-02-11T13:10:00Z' }
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
