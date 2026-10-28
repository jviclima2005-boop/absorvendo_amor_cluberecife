(() => {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const ideas = [
    ['O que é pobreza menstrual?', 'Crie um carrossel simples explicando a questão e por que o acesso a cuidados menstruais importa.'],
    ['Como fazer uma doação responsável', 'Explique quais produtos estão confirmados para arrecadação e oriente o público a consultar os pontos oficiais.'],
    ['Mitos e verdades sobre menstruação', 'Convide uma profissional qualificada para revisar conteúdos educativos antes da publicação.'],
    ['Quem está por trás do projeto?', 'Apresente a equipe e os voluntários, com autorização, explicando a motivação da iniciativa.'],
    ['Diário de uma ação', 'Mostre etapas e aprendizados de uma atividade real, preservando privacidade e imagem dos participantes.'],
    ['Muito além do absorvente', 'Fale sobre a relação entre informação, acesso à higiene, dignidade e solidariedade.'],
    ['Antes e depois de uma arrecadação', 'Publique números somente se houver registros conferidos, com período e destinação claramente identificados.']
  ];
  let ideaIndex = 0;
  let currentText = '';
  function toast(message) { const node=$('#toast'); node.textContent=message; node.hidden=false; clearTimeout(toast.timer); toast.timer=setTimeout(()=>node.hidden=true,3000); }
  function generate(event) {
    event.preventDefault();
    const purpose=$('#copy-purpose').value, channel=$('#copy-channel').value, details=$('#copy-extra').value.trim();
    const intros={
      arrecadacao:'Menstruar com dignidade é um direito. 💗\n\nUma doação de absorventes novos e lacrados pode fortalecer as ações do Absorvendo Amor — Clube Recife.',
      conscientizacao:'Dignidade menstrual é assunto de todo mundo. 💗\n\nFalar sobre acesso à informação, cuidados e produtos menstruais é parte da transformação que queremos construir.',
      voluntariado:'Cuidar também é se envolver. 💗\n\nO Absorvendo Amor — Clube Recife acredita no poder de quem se mobiliza para ampliar a conversa sobre dignidade menstrual.'
    };
    const endings={
      arrecadacao:'Quer contribuir? Fale com nossa equipe pelos canais oficiais para confirmar os pontos de entrega.',
      conscientizacao:'Compartilhe esta mensagem e ajude a levar a conversa mais longe.',
      voluntariado:'Quer saber como apoiar? Entre em contato com a equipe e acompanhe nossas ações.'
    };
    const call=channel==='instagram'?'\n\n#DignidadeMenstrual #AbsorvendoAmor #Recife':'\n\nSe puder, compartilhe esta mensagem com outras pessoas. 💕';
    currentText=intros[purpose]+(details?'\n\nInformações confirmadas da campanha: '+details:'')+'\n\n'+endings[purpose]+call;
    $('#copy-output').textContent=currentText;
  }
  async function copyText(text) {
    if (!text) { toast('Gere um texto primeiro.'); return; }
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text);
      else {
        const tmp=document.createElement('textarea'); tmp.value=text; tmp.style.position='fixed'; tmp.style.opacity='0'; document.body.append(tmp); tmp.select();
        if (!document.execCommand('copy')) throw new Error('Falha de cópia'); tmp.remove();
      }
      toast('Texto copiado! Revise antes de publicar.');
    } catch { toast('Selecione o texto para copiá-lo manualmente.'); }
  }
  function renderIdea() {
    const [title,description]=ideas[ideaIndex];
    const card=$('#idea-card'); card.querySelector('.section-label').textContent='IDEIA '+String(ideaIndex+1).padStart(2,'0');
    card.querySelector('h3').textContent=title; card.querySelector('p').textContent=description;
  }
  $('#copy-form')?.addEventListener('submit',generate);
  $('#copy-text')?.addEventListener('click',()=>copyText(currentText));
  $('#next-idea')?.addEventListener('click',()=>{ideaIndex=(ideaIndex+1)%ideas.length;renderIdea();});
  $('#copy-idea')?.addEventListener('click',()=>copyText(ideas[ideaIndex].join('\n\n')));
})();
