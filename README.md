# CRM Center — Gestão de Garantias no Pós-Vendas

Protótipo de sistema de SAC para gestão de garantias, devoluções e ocorrências de frete,
desenvolvido como parte do TCC (FGV MBA) sobre padronização de processos de pós-vendas
na Auto Peças Center Ônibus.

## Executar localmente

**Pré-requisitos:** Node.js

1. Instale as dependências:
   `npm install`
2. Rode a aplicação:
   `npm run dev`

## Build de produção

`npm run build`

Os arquivos estáticos são gerados em `dist/`.

## Deploy (Netlify)

O arquivo `netlify.toml` já configura o build (`npm run build`), o diretório de
publicação (`dist`) e o redirecionamento de SPA. Basta conectar o repositório à Netlify.
