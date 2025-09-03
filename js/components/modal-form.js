// js/components/modal-form.js
// Требуется <script src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script> в <head>

(function(){
  // --- helpers (локальные, без импортов) ---
  function escapeHtml(s=''){
    return s.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }
  async function sendEmailJSInline({ serviceId, templateId, publicKey, templateData = {} }) {
    if (!window.emailjs) return { ok:false, error:'EmailJS not loaded' };
    try {
      window.emailjs.init(publicKey);
      const resp = await window.emailjs.send(serviceId, templateId, templateData);
      return { ok:true, resp };
    } catch(e){
      console.error('EmailJS error:', e);
      return { ok:false, error:String(e) };
    }
  }

  const modalTpl = document.createElement('template');
  modalTpl.innerHTML = `
    <style>
      :host {
        --blue:#2563eb; --blue-700:#1d4ed8;
        --border:#e5e7eb; --radius: 14px;
        --shadow: 0 25px 50px -12px rgba(0,0,0,.25);
        font-family: 'Segoe UI','Inter',sans-serif;
      }
      .modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;z-index:9999;opacity:0;pointer-events:none;transition:.3s;padding:1rem}
      .modal-backdrop.active{opacity:1;pointer-events:all}
      .modal-container{background:#fff;border-radius:var(--radius);box-shadow:var(--shadow);width:100%;max-width:500px;max-height:90vh;overflow:auto;transform:translateY(20px);transition:.3s}
      .modal-backdrop.active .modal-container{transform:translateY(0)}
      .modal-header{display:flex;justify-content:space-between;align-items:center;padding:1.25rem 1.5rem 0}
      .modal-title{margin:0;font-size:1.5rem;font-weight:700;color:#0f172a}
      .close-btn{background:none;border:0;font-size:1.5rem;cursor:pointer;color:#64748b;width:30px;height:30px;display:flex;align-items:center;justify-content:center}
      .close-btn:hover{color:#0f172a}
      .modal-body{padding:1.5rem}
      form{display:grid;gap:1rem}
      .row{display:grid;grid-template-columns:1fr 1fr;gap:.75rem}
      @media (max-width:480px){.row{grid-template-columns:1fr}}
      label{display:block;font-weight:600;font-size:.9rem;margin-bottom:.35rem;color:#374151}
      .control{display:flex;align-items:center;gap:.5rem;border:1px solid var(--border);border-radius:12px;background:#fff;padding:.75rem 1rem}
      .control:focus-within{border-color:#93c5fd;outline:2px solid #bfdbfe;outline-offset:2px}
      input{border:0;outline:0;width:100%;font:inherit;color:inherit;background:transparent}
      .submit-btn{appearance:none;border:0;border-radius:12px;padding:1rem 1.5rem;font-weight:700;font-size:1rem;cursor:pointer;background:linear-gradient(180deg,var(--blue),var(--blue-700));color:#fff;margin-top:.5rem;width:100%;transition:.3s}
      .submit-btn:hover{filter:brightness(1.05)}
      .submit-btn:disabled{opacity:.7;cursor:not-allowed}
      .msg{padding:.75rem;border-radius:8px;font-weight:600;margin-top:1rem;display:none}
      .msg.ok{background:#dcfce7;color:#166534;border:1px solid #bbf7d0}
      .msg.err{background:#fee2e2;color:#991b1b;border:1px solid #fecaca}
      .hp{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}
    </style>

    <div class="modal-backdrop" aria-hidden="true">
      <div class="modal-container" role="dialog" aria-modal="true" aria-labelledby="mf-title">
        <div class="modal-header">
          <h2 id="mf-title" class="modal-title" data-title>Заголовок формы</h2>
          <button class="close-btn" aria-label="Закрыть">&times;</button>
        </div>
        <div class="modal-body">
          <form novalidate>
            <input type="text" name="_gotcha" class="hp" tabindex="-1" autocomplete="off" />

            <div class="row">
              <div>
                <label for="modal-name">Ваше имя *</label>
                <div class="control">
                  <input id="modal-name" name="name" type="text" placeholder="Иван Петров" autocomplete="name" required>
                </div>
              </div>
              <div>
                <label for="modal-phone">Ваш телефон *</label>
                <div class="control">
                  <input id="modal-phone" name="phone" type="tel" placeholder="+7 (___) ___-__-__" autocomplete="tel" required>
                </div>
              </div>
            </div>

            <div>
              <label for="modal-email">Ваш email *</label>
              <div class="control">
                <input id="modal-email" name="email" type="email" placeholder="you@example.com" autocomplete="email" required>
              </div>
            </div>

            <button class="submit-btn" type="submit">Отправить заявку</button>

            <div class="msg ok" data-ok>Спасибо! Мы свяжемся с вами в ближайшее время.</div>
            <div class="msg err" data-err>Не получилось отправить. Проверьте поля или попробуйте позже.</div>
          </form>
        </div>
      </div>
    </div>
  `;

  class ModalForm extends HTMLElement {
    constructor() {
      super();
      this._attrSync = false; // защищает от рекурсии
      this.attachShadow({ mode: 'open' }).appendChild(modalTpl.content.cloneNode(true));
      this._isOpen = false;
      this._escHandler = (e)=>{ if(this._isOpen && e.key==='Escape') this.close(); };
    }

    static get observedAttributes() { 
      return ['form-title','product-name','email','bot-token','chat-id','emailjs-service','emailjs-template','emailjs-user','open']; 
    }

    connectedCallback() {
      this._applyAttributes();
      this._bindEvents();
      if (this.hasAttribute('open')) this.open();
    }

  // 2) attributeChangedCallback — больше НЕ вызывает open()/close(),
    // а только применяет UI, и игнорит изменения, запущенные нами же
    attributeChangedCallback(name, oldVal, newVal) {
      if (name === 'open') {
        if (this._attrSync) return;           // не реагируем на свои же set/removeAttribute
        if (newVal !== null) this._openUI();  // просто открыть UI, без модификации атрибута
        else this._closeUI();                 // просто закрыть UI
        return;
      }
      this._applyAttributes();
    }

    _applyAttributes() {
      let title = this.getAttribute('form-title') || 'Оставить заявку';
      const productName = this.getAttribute('product-name');
      if (productName) title += ` по ${productName}`;
      const t = this.shadowRoot.querySelector('[data-title]');
      if (t) t.textContent = title;
    }

    _bindEvents() {
      const form = this.shadowRoot.querySelector('form');
      const backdrop = this.shadowRoot.querySelector('.modal-backdrop');
      const closeBtn = this.shadowRoot.querySelector('.close-btn');
      const phoneInput = this.shadowRoot.querySelector('#modal-phone');
      const submitBtn = this.shadowRoot.querySelector('.submit-btn');

      // Маска телефона
      phoneInput.addEventListener('input', (e) => {
        const d = e.target.value.replace(/\D/g, '').replace(/^8/, '7');
        let v = '+7 ';
        if (d.length > 1) v += '(' + d.slice(1, 4);
        if (d.length >= 4) v += ') ' + d.slice(4, 7);
        if (d.length >= 7) v += '-' + d.slice(7, 9);
        if (d.length >= 9) v += '-' + d.slice(9, 11);
        e.target.value = v;
      }, { passive: true });

      // Закрытие
      closeBtn.addEventListener('click', () => this.close());
      backdrop.addEventListener('click', (e) => { if (e.target === backdrop) this.close(); });

      // Submit
      form.addEventListener('submit', async (ev) => {
        ev.preventDefault();
        this._hideMessages();

        if (form.elements['_gotcha'].value) return;

        const name  = form.elements.name;
        const tel   = form.elements.phone;
        const email = form.elements.email;

        if (!this._validateForm(name, tel, email)) {
          this._showError('Пожалуйста, корректно заполните все обязательные поля.');
          return;
        }

        this._setLoading(true, submitBtn);

        const payload = {
          name: name.value.trim(),
          phone: tel.value.trim(),
          email: email.value.trim(),
          formType: this.getAttribute('form-title') || 'Заявка',
          product: this.getAttribute('product-name') || ''
        };

        try {
          const tgOk   = await this._sendToTelegram(payload);
          const mailOk = await this._sendViaEmailJS(payload);

          if (tgOk || mailOk) {
            this._showSuccess();
            form.reset();
            setTimeout(() => this.close(), 1600);
          } else {
            // финальный фолбэк
            this._sendViaMailto(payload);
            this._showSuccess();
            form.reset();
            setTimeout(() => this.close(), 1600);
          }
        } catch (err) {
          console.error(err);
          this._showError('Ошибка отправки. Попробуйте позже.');
        } finally {
          this._setLoading(false, submitBtn);
        }
      });

      // Esc
      document.addEventListener('keydown', this._escHandler);
    }

    disconnectedCallback(){
      document.removeEventListener('keydown', this._escHandler);
    }

    _validateForm(name, tel, email) {
      return name.value.trim().length >= 2 &&
             /\d/.test(tel.value) &&
             /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    }

    async _sendToTelegram(data) {
      const botToken = this.getAttribute('bot-token');
      const chatId   = this.getAttribute('chat-id');

      if (!botToken || !chatId || chatId === 'ВАШ_CHAT_ID') {
        console.warn('Telegram не настроен, пропускаем.');
        return false;
      }

      const message = `
📋 *Новая заявка с сайта*

*Тип:* ${escapeHtml(data.formType)}
${data.product ? '*Продукт:* ' + escapeHtml(data.product) + '\\n' : ''}
*Имя:* ${escapeHtml(data.name)}
*Телефон:* ${escapeHtml(data.phone)}
*Email:* ${escapeHtml(data.email)}

*Время:* ${new Date().toLocaleString('ru-RU')}
*Страница:* ${window.location.href}
      `.trim();

      try {
        const r = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method:'POST',
          headers:{ 'Content-Type':'application/json' },
          body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'Markdown' })
        });
        return r.ok;
      } catch (e) {
        console.error('Ошибка Telegram:', e);
        return false;
      }
    }

    async _sendViaEmailJS(data) {
      const serviceId = this.getAttribute('emailjs-service');
      const templateId = this.getAttribute('emailjs-template');
      const publicKey  = this.getAttribute('emailjs-user');

      if (!window.emailjs || !serviceId || !templateId || !publicKey) {
        console.warn('EmailJS не сконфигурирован, пропускаем.');
        return false;
      }

      const res = await sendEmailJSInline({
        serviceId,
        templateId,
        publicKey,
        templateData: {
          // ДОЛЖНО СОВПАДАТЬ с {{...}} в шаблоне EmailJS
          user_name:  data.name,
          user_phone: data.phone,
          user_email: data.email,
          message:    `Заявка: ${data.formType}${data.product ? ` / ${data.product}` : ''}`,
          page_url:   window.location.href,
          sent_at:    new Date().toLocaleString('ru-RU')
        }
      });

      if (!res.ok) {
        console.warn('EmailJS send failed:', res.error);
        return false;
      }
      return true;
    }

    _sendViaMailto(data) {
      const to = this.getAttribute('email') || 'info@aude.ru';
      let subject = `Заявка с сайта: ${data.formType}`;
      let body = `
Новая заявка с сайта:

Тип: ${data.formType}
${data.product ? 'Продукт: ' + data.product + '\n' : ''}
Имя: ${data.name}
Телефон: ${data.phone}
Email: ${data.email}

Дата: ${new Date().toLocaleString('ru-RU')}
Страница: ${window.location.href}
      `.trim();

      const encodedSubject = encodeURIComponent(subject);
      const encodedBody = encodeURIComponent(body);

      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.onload = () => setTimeout(() => document.body.removeChild(iframe), 800);
      document.body.appendChild(iframe);
      iframe.contentWindow.location.href = `mailto:${to}?subject=${encodedSubject}&body=${encodedBody}`;
    }

    _setLoading(loading, btn){
      btn.disabled = !!loading;
      btn.textContent = loading ? 'Отправка...' : 'Отправить заявку';
    }
    _showSuccess(){ this._hideMessages(); this.shadowRoot.querySelector('[data-ok]').style.display = 'block'; }
    _showError(msg){ this._hideMessages(); const el = this.shadowRoot.querySelector('[data-err]'); el.textContent = msg; el.style.display='block'; }
    _hideMessages(){ this.shadowRoot.querySelector('[data-ok]').style.display='none'; this.shadowRoot.querySelector('[data-err]').style.display='none'; }

    // 3) разделяем open/close на: публичные методы + внутренние UI-методы

open(){
  if (this._isOpen) return;
  this._isOpen = true;
  this._openUI();                              // только UI
  if (!this.hasAttribute('open')) {            // аккуратно синхронизируем атрибут
    this._attrSync = true;
    this.setAttribute('open','');
    this._attrSync = false;
  }
}

close(){
  if (!this._isOpen) return;
  this._isOpen = false;
  this._closeUI();                             // только UI
  if (this.hasAttribute('open')) {
    this._attrSync = true;
    this.removeAttribute('open');
    this._attrSync = false;
  }
}

// 4) вынеси "визуальные" действия сюда и НЕ трогай атрибут внутри
_openUI(){
  const bd = this.shadowRoot.querySelector('.modal-backdrop');
  bd.classList.add('active');
  bd.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
  setTimeout(()=> this.shadowRoot.querySelector('#modal-name')?.focus(), 80);
}

_closeUI(){
  const bd = this.shadowRoot.querySelector('.modal-backdrop');
  bd.classList.remove('active');
  bd.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
  this._hideMessages();
  const form = this.shadowRoot.querySelector('form');
  if (form) form.reset();
}

  }

  customElements.define('modal-form', ModalForm);
})();
