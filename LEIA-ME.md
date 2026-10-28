# Absorvendo Amor — Clube Recife

Site institucional responsivo em **HTML, CSS e JavaScript**, sem framework, banco de dados ou servidor obrigatório para a primeira versão.

## Como visualizar

1. Extraia todos os arquivos do ZIP, sem mover `index.html` para fora da pasta.
2. Abra `index.html` no navegador. Para a ferramenta de textos, abra `comunicacao.html`.
3. Para publicar, envie a pasta para uma hospedagem estática (por exemplo, Cloudflare Pages, GitHub Pages ou Netlify).

Arquivos principais:

- `index.html` — página principal completa.
- `comunicacao.html` — gerador gratuito de rascunhos e ideias para campanhas.
- `styles.css` — estilos, responsividade e animações discretas.
- `script.js` — menu, botões, pontos de coleta, Pix, chat e interatividade.
- `communication.js` — gerador local de textos para a equipe.
- `site-data.js` — **arquivo central para inserir informações reais da ONG**.
- `assets/` — imagens enviadas como referência e favicon provisório.
- `robots.txt` — permissão básica de indexação.

## O que já está funcionando

- Menu adaptável a celular e computador.
- Navegação por âncoras e botão de doações sempre acessível no celular.
- Compartilhamento da causa pelo WhatsApp.
- Links para o Instagram com a arroba lida nos materiais apresentados, **pendente de confirmação antes da publicação**.
- Galeria com artes de conscientização enviadas neste projeto.
- Perguntas frequentes e assistente determinístico que consulta apenas respostas cadastradas.
- Ferramenta local que gera rascunhos de legendas, mensagens e sugestões de temas.
- Renderização automática de pontos de coleta, números de WhatsApp, Pix e resultados após inserir dados oficiais.
- Acessibilidade básica: links de salto, navegação por teclado, textos alternativos, foco visível e respeito a preferências de movimento reduzido.
- Metadados de SEO e organização semântica das páginas.

## O que preencher antes de publicar

Abra `site-data.js` em um editor de texto e preencha apenas os campos oficialmente confirmados:

**Contatos:** em `contacts`, adicione entradas com nome, função e número de WhatsApp no padrão `55 + DDD + número`, somente com autorização de divulgação pública. Exemplo de formato (não é um contato real):

```js
contacts: [
  { name: 'Nome autorizado', role: 'Doações', whatsapp: '5581999999999' }
]
```

**Pontos de coleta:** em `collectionPoints`, registre `name`, `address`, `hours` e a lista `items`. O botão de Maps será criado automaticamente a partir do endereço. Se houver um URL de localização confirmado, inclua `mapsUrl`.

```js
collectionPoints: [
  {
    name: 'Nome do ponto de coleta',
    address: 'Endereço completo e confirmado',
    hours: 'Horários confirmados',
    items: ['Absorventes novos e lacrados']
  }
]
```

**Pix:** preencha `pix.key` e `pix.recipient` apenas após verificar que a chave pertence ao destinatário correto. O site não coleta pagamentos nem dados bancários dos visitantes: oferece somente o recurso de copiar a chave oficial.

**Transparência:** preencha `transparency.received`, `.delivered` e `.reports` com período, contexto e números conferidos, preferencialmente acompanhados dos documentos e registros de origem.

**Instagram:** confirme se a arroba que aparece na arte é a conta oficial atual; atualize `instagram.handle` e `instagram.url`, se necessário.

**História:** revise os parágrafos da seção `#sobre` em `index.html` e acrescente a história oficial, nomes dos integrantes (com autorização), público atendido e cronologia das ações. Nenhuma data fundacional foi inventada.

**Imagens:** o pequeno ícone usado no cabeçalho e no favicon é uma representação gráfica **provisória**, não o arquivo oficial do logotipo. Substitua pelos arquivos originais da ONG quando disponíveis. Para registros de ações e imagens de beneficiários, confirme as autorizações de uso, com atenção especial a crianças e adolescentes. A galeria atual utiliza materiais de campanha enviados pelo solicitante, e não finge ter fotos originais de eventos que ainda não foram fornecidas.

**Vídeos:** a seção `#videos` está pronta como espaço editorial. Quando houver vídeos autorizados, substitua a mensagem provisória por links ou incorporação de vídeos dos canais oficiais.

## Inteligência artificial e custos

O **chat atual não é GPT**. É um assistente gratuito que identifica perguntas por termos e responde com informações previamente definidas em `site-data.js`. Quando não sabe, diz que não sabe e sugere os canais oficiais. Não faz consultas externas, não armazena perguntas e não tem cobrança por uso.

A ferramenta `comunicacao.html` também **não é IA generativa**: combina modelos textuais locais para criar rascunhos revisáveis e rotacionar sugestões. Não publica automaticamente e não envia dados para terceiros.

Se a ONG decidir adotar GPT futuramente, serão necessárias etapas adicionais: selecionar fornecedor e modelo, criar um backend que mantenha a chave de API em segredo, manter uma base aprovada de informações da ONG, testar respostas e limitar custos. O uso da API pode ser cobrado por consumo, conforme serviço e modelo escolhidos. **Nenhuma API paga foi ativada nesta versão.**

## SEO e publicação

O site já contém título, descrição, tags para compartilhamento e dados estruturados básicos. Depois de escolher o domínio, será necessário:

1. Definir a URL pública canônica.
2. Configurar `og:image` com URL absoluta de uma capa autorizada.
3. Gerar `sitemap.xml` com as URLs definitivas e cadastrá-lo no Google Search Console.
4. Verificar se a ONG deseja divulgar publicamente os dados de contato/organização.
5. Fazer testes de acessibilidade, desempenho e privacidade na hospedagem definitiva.

Não existe feed automático do Instagram nesta versão: foram incluídos posts fornecidos como referência. Atualização automática pode depender de permissões de plataforma e integrações futuras.

## Personalização visual

As cores estão no início de `styles.css`, em `:root`. Fontes: Outfit para títulos e DM Sans para leitura, com alternativas do navegador. Ao receber a paleta de cores e a marca oficiais, atualize os valores das variáveis CSS e o emblema.

## Limitações conhecidas e cuidados

- Não há formulário com coleta de dados de visitantes, login, banco de dados ou painel de administração.
- Não há chave Pix, telefone, ponto de coleta ou métricas fictícias: os estados vazios aparecem com transparência.
- O endereço do Instagram foi montado a partir da arroba vista nas imagens enviadas; confirme se está atualizado.
- Não há hospedagem nem domínio adquiridos. O ZIP é um site estático pronto para ser configurado e publicado.
- O acesso a fontes Google pode depender da conexão; o site possui fontes alternativas.
