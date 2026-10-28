/*
 * CONFIGURAÇÃO CENTRAL DO SITE
 * Edite apenas valores que tenham sido oficialmente confirmados pela ONG.
 * Mantenha campos desconhecidos vazios: o site mostrará estados informativos.
 */
window.SITE_DATA = {
  name: 'Absorvendo Amor — Clube Recife',
  instagram: {
    // Arroba lida no material fornecido. Confirmar com a equipe antes de publicar.
    handle: 'absorvendoamorcluberecife',
    url: 'https://www.instagram.com/absorvendoamorcluberecife/'
  },
  // Use apenas dígitos com DDI 55; ex.: 5581999999999. Não publique dados privados.
  contacts: [
    // { name: 'Responsável pelas doações', role: 'Pontos de coleta', whatsapp: '5581XXXXXXXXX' }
  ],
  pix: {
    key: '',              // Chave Pix oficial da ONG
    recipient: '',        // Nome oficial do destinatário
    description: ''
  },
  collectionPoints: [
    // {
    //   name: 'Nome oficial do ponto',
    //   address: 'Rua, número, bairro, Recife - PE',
    //   hours: 'Segunda a sexta, 9h às 17h',
    //   items: ['Absorventes novos e lacrados'],
    //   mapsUrl: 'https://www.google.com/maps/search/?api=1&query=ENDERECO_URL_ENCODED'
    // }
  ],
  transparency: {
    received: '',         // Ex.: '120 pacotes recebidos em maio/2026'
    delivered: '',        // Ex.: '80 pacotes destinados em maio/2026'
    reports: ''           // Ex.: 'Relatório de maio disponível no Instagram'
  },
  assistant: {
    // Respostas determinísticas, com informações já conhecidas.
    answers: [
      { keywords: ['doar','doacao','doações','doacoes','ajudar','contribuir','absorvente','produtos'], answer: 'Você pode apoiar com absorventes novos e lacrados. Para combinar a entrega ou confirmar outros materiais aceitos, entre em contato pelos canais oficiais da ONG. Veja também a seção “Como ajudar”.', link: '#doar', linkText: 'Ver como ajudar' },
      { keywords: ['coleta','endereço','endereco','entregar','local','locais','ponto','pontos','horario'], answer: 'Ainda não temos endereços e horários de pontos de coleta confirmados para publicar no site. Consulte os canais oficiais antes de sair para entregar uma doação.', link: '#coleta', linkText: 'Ver pontos de coleta' },
      { keywords: ['pix','dinheiro','transferencia','transferência','pagar','chave'], answer: 'Uma chave Pix oficial ainda não foi informada para este site. Não envie transferências para dados que não tenham sido confirmados diretamente pela ONG.', link: '#doar', linkText: 'Ver informações de doação' },
      { keywords: ['instagram','rede social','redes sociais','perfil','publicacoes','publicações'], answer: 'Você pode acompanhar o Clube Recife no Instagram pelo botão da seção “Nas redes”.', link: '#instagram', linkText: 'Acessar seção Instagram' },
      { keywords: ['contato','whatsapp','telefone','responsavel','responsável','falar'], answer: 'Os números de WhatsApp dos responsáveis ainda não foram cadastrados. Enquanto isso, você pode falar pelo Instagram informado no site.', link: '#contato', linkText: 'Ver canais de contato' },
      { keywords: ['quem','ong','historia','história','projeto','missão','objetivo','pobreza','menstrual','beneficiadas'], answer: 'O Absorvendo Amor — Clube Recife é uma iniciativa de mobilização e conscientização pelo direito à dignidade menstrual. Trabalha com informação, escuta e incentivo à arrecadação de absorventes.', link: '#sobre', linkText: 'Conhecer o projeto' },
      { keywords: ['voluntario','voluntário','voluntaria','voluntária','participar','parceria','parceiro'], answer: 'Que bom que você quer participar! A equipe pode orientar sobre formas atuais de apoio e parcerias pelos canais oficiais.', link: '#contato', linkText: 'Falar com a equipe' }
    ]
  }
};
