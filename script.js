(() => {
  'use strict';
  const data = window.SITE_DATA || {};
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const el = (name, className, text) => { const node = document.createElement(name); if (className) node.className = className; if (text !== undefined) node.textContent = text; return node; };
  const validHttpUrl = (value) => { try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : null; } catch { return null; } };
  let toastTimeout;

  function toast(message) {
    const node = $('#toast');
    if (!node) return;
    node.textContent = message;
    node.hidden = false;
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => { node.hidden = true; }, 3300);
  }
  window.showSiteToast = toast;

  const year = $('#current-year');
  if (year) year.textContent = String(new Date().getFullYear());

  // Main navigation
  const menuButton = $('#menu-toggle');
  const mobileMenu = $('#mobile-nav');
  function setMenu(open) {
    if (!menuButton || !mobileMenu) return;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    mobileMenu.hidden = !open;
  }
  menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  $$('a', mobileMenu || document.createElement('nav')).forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { setMenu(false); closeChat(); } });
  document.addEventListener('click', event => {
    if (mobileMenu && menuButton && !mobileMenu.hidden && !mobileMenu.contains(event.target) && !menuButton.contains(event.target)) setMenu(false);
  });
  window.addEventListener('resize', () => { if (window.innerWidth > 850) setMenu(false); });

  // Animate only once, with reduced-motion accessibility.
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('js-ready');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: .08, rootMargin: '0px 0px 35px 0px' });
    $$('.reveal').forEach(node => observer.observe(node));
  }

  // Social handles from content configuration. These were read from the supplied imagery, to be confirmed before launch.
  const instagram = data.instagram || {};
  const igUrl = validHttpUrl(instagram.url);
  if (igUrl) {
    ['#instagram-main-link','#contact-instagram-link'].forEach(id => { const node = $(id); if (node) node.href = igUrl; });
    const galleryLink = $('#gallery-instagram');
    if (galleryLink) { galleryLink.href = igUrl; galleryLink.target = '_blank'; galleryLink.rel = 'noopener noreferrer'; }
  }
  if (instagram.handle && $('#instagram-handle')) $('#instagram-handle').textContent = '@' + instagram.handle.replace(/^@/, '');

  // Share a meaningful, short campaign message without claiming unverified numbers or dates.
  $$('.share-campaign').forEach(button => button.addEventListener('click', () => {
    const message = 'Menstruar com dignidade é um direito. 💗 Conheça e apoie o Absorvendo Amor — Clube Recife. Acompanhe as ações: ' + (igUrl || 'Instagram do Clube Recife');
    window.open('https://wa.me/?text=' + encodeURIComponent(message), '_blank', 'noopener,noreferrer');
  }));

  // Pix is hidden until the key is confirmed; then the copy button actually copies it.
  const pix = data.pix || {};
  if (typeof pix.key === 'string' && pix.key.trim()) {
    const info = $('#pix-dynamic');
    if (info) {
      const box = el('div', 'pix-data');
      if (pix.recipient) box.append(el('p', '', 'Destinatário oficial: ' + pix.recipient));
      box.append(el('span', 'pix-key', pix.key.trim()));
      const button = el('button', '', 'Copiar chave Pix');
      button.type = 'button';
      button.addEventListener('click', async () => {
        try {
          if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(pix.key.trim());
          else {
            const temporary = el('textarea'); temporary.value = pix.key.trim();
            temporary.style.position = 'fixed'; temporary.style.opacity = '0';
            document.body.append(temporary); temporary.select();
            if (!document.execCommand('copy')) throw new Error('Cópia indisponível');
            temporary.remove();
          }
          toast('Chave Pix copiada. Confira o destinatário antes de transferir.');
        } catch { toast('Não foi possível copiar. Selecione a chave exibida.'); }
      });
      box.append(button); info.append(box);
    }
    const explanation = $('#pix-explanation');
    if (explanation) explanation.textContent = pix.description || 'Confira o nome do destinatário antes de concluir qualquer transferência.';
  }

  // Real collection points are only rendered when supplied by the NGO.
  const pointsContainer = $('#collection-list');
  const points = (Array.isArray(data.collectionPoints) ? data.collectionPoints : []).filter(point => point?.name && point?.address && point?.hours);
  if (pointsContainer && points.length) {
    pointsContainer.replaceChildren();
    for (const point of points) {
      const card = el('article', 'point-card');
      card.append(el('h3', '', point.name));
      card.append(el('p', '', 'Endereço: ' + point.address));
      card.append(el('p', '', 'Horário: ' + point.hours));
      if (Array.isArray(point.items) && point.items.length) card.append(el('p', '', 'Aceita: ' + point.items.join(', ')));
      const mapUrl = validHttpUrl(point.mapsUrl) || 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(point.address);
      const mapLink = el('a', 'button button-outline rose-outline', 'Abrir no Google Maps ↗');
      mapLink.href = mapUrl; mapLink.target = '_blank'; mapLink.rel = 'noopener noreferrer';
      card.append(mapLink); pointsContainer.append(card);
    }
  }

  // Contacts never render fictitious telephone numbers.
  const contactTarget = $('#contact-whatsapp-container');
  const contacts = (Array.isArray(data.contacts) ? data.contacts : []).filter(contact => /^\d{12,13}$/.test(String(contact?.whatsapp || '').replace(/\D/g, '')));
  if (contactTarget && contacts.length) {
    contactTarget.replaceChildren();
    for (const contact of contacts) {
      const phone = String(contact.whatsapp).replace(/\D/g, '');
      const person = el('div', 'contact-person');
      if (contact.name) person.append(el('strong', '', contact.name));
      if (contact.role) person.append(el('small', '', contact.role));
      const link = el('a', 'button button-cream', 'Abrir WhatsApp ↗');
      link.href = `https://wa.me/${phone}?text=${encodeURIComponent('Olá! Gostaria de saber como apoiar o Absorvendo Amor — Clube Recife.')}`;
      link.target = '_blank'; link.rel = 'noopener noreferrer';
      person.append(link); contactTarget.append(person);
    }
  }

  // Transparency never claims metrics that have not been entered.
  for (const [key, id] of [['received','#metric-received'],['delivered','#metric-delivered'],['reports','#metric-reports']]) {
    if (data.transparency?.[key] && $(id)) $(id).textContent = data.transparency[key];
  }

  // Assistant: local intent matcher, NO third-party API and NO generated factual answers.
  const launch = $('#chat-launch'), panel = $('#chat-panel'), close = $('#chat-close'), chatForm = $('#chat-form'), chatInput = $('#chat-input'), messages = $('#chat-messages');
  function openChat() { if (!panel) return; panel.hidden = false; launch?.setAttribute('aria-expanded','true'); chatInput?.focus(); }
  function closeChat() { if (!panel) return; panel.hidden = true; launch?.setAttribute('aria-expanded','false'); }
  launch?.addEventListener('click', () => panel?.hidden ? openChat() : closeChat());
  close?.addEventListener('click', () => { closeChat(); launch?.focus(); });
  $('#faq-chat-open')?.addEventListener('click', openChat);

  const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  function findReply(question) {
    const clean = normalize(question);
    const answers = data.assistant?.answers || [];
    if (!clean) return null;
    // Give precedence to the most strongly matched intent and avoid changing unknown facts into invented answers.
    let best = null, max = 0;
    for (const option of answers) {
      const score = (option.keywords || []).reduce((total, term) => {
        const normalized = normalize(term);
        if (!normalized) return total;
        const match = clean.includes(normalized);
        return total + (match ? (normalized.includes(' ') ? 3 : 1) : 0);
      }, 0);
      if (score > max) { max = score; best = option; }
    }
    if (!best) return { answer: 'Ainda não tenho uma resposta confirmada para essa pergunta. Prefiro não arriscar uma informação incorreta. Entre em contato pelos canais oficiais do Clube Recife.', link:'#contato', linkText:'Ver contato' };
    if (best.link === '#coleta' && points.length) {
      return { answer: 'Os pontos de coleta confirmados estão disponíveis na seção “Onde entregar”, com endereços, horários e itens aceitos.', link:'#coleta', linkText:'Ver pontos confirmados' };
    }
    if (best.link === '#contato' && contacts.length) {
      return { answer: 'Você encontra o contato de WhatsApp cadastrado para doações na seção “Faça parte”.', link:'#contato', linkText:'Ver contatos' };
    }
    if (clean.includes('pix') && pix.key?.trim()) {
      return { answer: 'A ONG cadastrou uma chave Pix oficial na seção “Como ajudar”. Confira o destinatário antes de transferir.', link:'#doar', linkText:'Ver Pix oficial' };
    }
    return best;
  }
  function addMessage(text, sender, link, label) {
    if (!messages) return;
    const bubble = el('div', 'chat-message ' + (sender === 'user' ? 'from-user' : 'from-bot'), text);
    if (link && label) {
      bubble.append(document.createElement('br'));
      const a = el('a', '', label + ' ↗');
      a.href = link;
      a.addEventListener('click', () => closeChat());
      bubble.append(a);
    }
    messages.append(bubble);
    messages.scrollTop = messages.scrollHeight;
  }
  function sendQuestion(value) {
    const question = String(value || '').trim().slice(0,250);
    if (!question) return;
    addMessage(question,'user');
    const reply = findReply(question);
    if (reply) addMessage(reply.answer,'bot',reply.link,reply.linkText);
  }
  chatForm?.addEventListener('submit', event => {
    event.preventDefault(); sendQuestion(chatInput.value); chatInput.value = ''; chatInput.focus();
  });
  $$('#chat-suggestions button').forEach(button => button.addEventListener('click', () => sendQuestion(button.dataset.question)));
})();
