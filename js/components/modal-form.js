// js/components/modal-form.js
// <modal-form 
//   form-title="Заголовок формы" 
//   product-name="Название продукта (опционально)"
//   email="info@aude.ru"
//   bot-token="8008327245:AAECnxOeBHe5MoblkEA72UXH2cA--DOejWo"
//   chat-id="ВАШ_CHAT_ID"
// ></modal-form>

const modalTpl = document.createElement('template');
modalTpl.innerHTML = `
  <style>
    :host {
      --blue:#2563eb; --blue-700:#1d4ed8;
      --border:#e5e7eb; --radius: 14px;
      --shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      font-family: 'Segoe UI', 'Inter', sans-serif;
    }

    .modal-backdrop {
      position: fixed;
      top: 0; right: 0; bottom: 0; left: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
      padding: 1rem;
    }
    .modal-backdrop.active {
      opacity: 1;
      pointer-events: all;
    }

    .modal-container {
      background: white;
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      width: 100%;
      max-width: 500px;
      max-height: 90vh;
      overflow-y: auto;
      transform: translateY(20px);
      transition: transform 0.3s ease;
    }
    .modal-backdrop.active .modal-container {
      transform: translateY(0);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.25rem 1.5rem 0;
    }
    .modal-title {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 700;
      color: #0f172a;
    }
    .close-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #64748b;
      padding: 0;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .close-btn:hover {
      color: #0f172a;
    }

    .modal-body {
      padding: 1.5rem;
    }

    /* Стили формы */
    form { display: grid; gap: 1rem; }
    .row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
    @media (max-width: 480px) { .row { grid-template-columns: 1fr; } }

    label { display: block; font-weight: 600; font-size: 0.9rem; margin-bottom: 0.35rem; color: #374151; }
    .control {
      display: flex; align-items: center; gap: 0.5rem;
      border: 1px solid var(--border); border-radius: 12px; background: #fff; padding: 0.75rem 1rem;
    }
    .control:focus-within { border-color: #93c5fd; outline: 2px solid #bfdbfe; outline-offset: 2px; }
    input { border: 0; outline: 0; width: 100%; font: inherit; color: inherit; background: transparent; }

    .submit-btn {
      appearance: none;
      border: 0;
      border-radius: 12px;
      padding: 1rem 1.5rem;
      font-weight: 700;
      font-size: 1rem;
      cursor: pointer;
      background: linear-gradient(180deg, var(--blue), var(--blue-700));
      color: white;
      margin-top: 0.5rem;
      width: 100%;
      transition: all 0.3s ease;
    }
    .submit-btn:hover { filter: brightness(1.05); }
    .submit-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      transform: none !important;
    }

    /* Сообщения */
    .msg {
      padding: 0.75rem;
      border-radius: 8px;
      font-weight: 600;
      margin-top: 1rem;
      display: none;
    }
    .msg.ok { 
      background: #dcfce7; 
      color: #166534; 
      border: 1px solid #bbf7d0; 
      display: none;
    }
    .msg.err { 
      background: #fee2e2; 
      color: #991b1b; 
      border: 1px solid #fecaca; 
      display: none;
    }

    .hp { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }
  </style>

  <div class="modal-backdrop">
    <div class="modal-container">
      <div class="modal-header">
        <h2 class="modal-title" data-title>Заголовок формы</h2>
        <button class="close-btn">&times;</button>
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
                <input id="modal-phone" name="phone" type="tel" placeholder="+7 (___) ___‑__‑__" autocomplete="tel" required>
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
    this.attachShadow({ mode: 'open' }).appendChild(modalTpl.content.cloneNode(true));
    this._isOpen = false;
  }

  connectedCallback() {
    this._applyAttributes();
    this._bindEvents();
  }

  static get observedAttributes() { 
    return ['form-title', 'product-name', 'email', 'bot-token', 'chat-id']; 
  }

  attributeChangedCallback() { this._applyAttributes(); }

  _applyAttributes() {
    let title = this.getAttribute('form-title') || 'Оставить заявку';
    const productName = this.getAttribute('product-name');

    if (productName) {
      title += ` по ${productName}`;
    }

    this.shadowRoot.querySelector('[data-title]').textContent = title;
  }

  _bindEvents() {
    const form = this.shadowRoot.querySelector('form');
    const okMsg = this.shadowRoot.querySelector('[data-ok]');
    const errMsg = this.shadowRoot.querySelector('[data-err]');
    const backdrop = this.shadowRoot.querySelector('.modal-backdrop');
    const closeBtn = this.shadowRoot.querySelector('.close-btn');
    const phoneInput = this.shadowRoot.querySelector('#modal-phone');
    const submitBtn = this.shadowRoot.querySelector('.submit-btn');

    // Маска для телефона
    phoneInput.addEventListener('input', (e) => {
      const d = e.target.value.replace(/\D/g, '').replace(/^8/, '7');
      let v = '+7 ';
      if (d.length > 1) v += '(' + d.slice(1, 4);
      if (d.length >= 4) v += ') ' + d.slice(4, 7);
      if (d.length >= 7) v += '‑' + d.slice(7, 9);
      if (d.length >= 9) v += '‑' + d.slice(9, 11);
      e.target.value = v;
    }, { passive: true });

    // Закрытие
    closeBtn.addEventListener('click', () => this.close());
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) this.close();
    });

    // Отправка формы
    form.addEventListener('submit', async (ev) => {
      ev.preventDefault();
      this._hideMessages();

      if (form.elements['_gotcha'].value) return;

      const name = form.elements.name;
      const tel = form.elements.phone;
      const email = form.elements.email;

      // Валидация
      if (!this._validateForm(name, tel, email)) {
        this._showError('Пожалуйста, корректно заполните все обязательные поля.');
        return;
      }

      // Показываем загрузку
      this._setLoading(true, submitBtn);

      try {
        // Пробуем отправить через Telegram
        const success = await this._sendToTelegram({
          name: name.value.trim(),
          phone: tel.value,
          email: email.value.trim(),
          formType: this.getAttribute('form-title'),
          product: this.getAttribute('product-name') || ''
        });

        if (success) {
          this._showSuccess();
          form.reset();
          setTimeout(() => this.close(), 2000);
        } else {
          // Fallback на mailto
          this._sendViaMailto({
            name: name.value.trim(),
            phone: tel.value,
            email: email.value.trim(),
            formType: this.getAttribute('form-title'),
            product: this.getAttribute('product-name') || ''
          });
          this._showSuccess();
          form.reset();
          setTimeout(() => this.close(), 2000);
        }
      } catch (error) {
        this._showError('Ошибка отправки. Попробуйте позже.');
      } finally {
        this._setLoading(false, submitBtn);
      }
    });

    // Закрытие по Esc
    document.addEventListener('keydown', (e) => {
      if (this._isOpen && e.key === 'Escape') {
        this.close();
      }
    });
  }

  _validateForm(name, tel, email) {
    return name.value.trim().length >= 2 &&
           /\d/.test(tel.value) &&
           /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
  }

  async _sendToTelegram(formData) {
    const botToken = this.getAttribute('bot-token') || '8008327245:AAECnxOeBHe5MoblkEA72UXH2cA--DOejWo';
    const chatId = this.getAttribute('chat-id');

    // Если chat-id не указан, используем fallback
    if (!chatId || chatId === 'ВАШ_CHAT_ID') {
      console.warn('Chat ID не настроен. Используется fallback на mailto.');
      return false;
    }

    const message = `
📋 *Новая заявка с сайта*

*Тип:* ${formData.formType}
${formData.product ? '*Продукт:* ' + formData.product + '\n' : ''}
*Имя:* ${formData.name}
*Телефон:* ${formData.phone}
*Email:* ${formData.email}

*Время:* ${new Date().toLocaleString('ru-RU')}
*Страница:* ${window.location.href}
    `.trim();

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown'
        })
      });

      return response.ok;
    } catch (error) {
      console.error('Ошибка отправки в Telegram:', error);
      return false;
    }
  }

  _sendViaMailto(formData) {
    const to = this.getAttribute('email') || 'info@aude.ru';
    const subject = `Заявка с сайта: ${formData.formType} ${formData.product ? 'по ' + formData.product : ''}`;
    const body = `
Новая заявка с сайта:

Тип: ${formData.formType}
${formData.product ? 'Продукт: ' + formData.product + '\n' : ''}
Имя: ${formData.name}
Телефон: ${formData.phone}
Email: ${formData.email}

Дата: ${new Date().toLocaleString('ru-RU')}
Страница: ${window.location.href}
    `.trim();

    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);

    window.location.href = `mailto:${to}?subject=${encodedSubject}&body=${encodedBody}`;
  }

  _setLoading(loading, button) {
    if (loading) {
      button.disabled = true;
      button.textContent = 'Отправка...';
    } else {
      button.disabled = false;
      button.textContent = 'Отправить заявку';
    }
  }

  _showSuccess() {
    this._hideMessages();
    this.shadowRoot.querySelector('[data-ok]').style.display = 'block';
  }

  _showError(message) {
    this._hideMessages();
    const errElement = this.shadowRoot.querySelector('[data-err]');
    errElement.textContent = message;
    errElement.style.display = 'block';
  }

  _hideMessages() {
    this.shadowRoot.querySelector('[data-ok]').style.display = 'none';
    this.shadowRoot.querySelector('[data-err]').style.display = 'none';
  }

  open() {
    this._isOpen = true;
    this.shadowRoot.querySelector('.modal-backdrop').classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => this.shadowRoot.querySelector('#modal-name').focus(), 100);
  }

  close() {
    this._isOpen = false;
    this.shadowRoot.querySelector('.modal-backdrop').classList.remove('active');
    document.body.style.overflow = '';
    this._hideMessages();
    
    // Сбрасываем форму при закрытии
    const form = this.shadowRoot.querySelector('form');
    if (form) form.reset();
  }
}

customElements.define('modal-form', ModalForm);