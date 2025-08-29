// js/components/qa-form.js
// <qa-form
//   email="info@aude.ru"                 // адрес для mailto (если нет action)
//   phone="+7 (812) 123-45-67"           // отобразим слева
//   phonehref="+78121234567"             // tel: ссылка
//   action="/form-handler"               // если задано — обычный submit на сервер
//   method="POST"                        // метод submit (по умолчанию POST)
//   title="Ответим на ваши вопросы"
//   subtitle="Получите консультацию по дезинфекции гибких эндоскопов…"
// ></qa-form>

const tpl = document.createElement('template')
tpl.innerHTML = `
  <style>
    :host{
      display:block;
      font-family:"Inter",system-ui,-apple-system,"Segoe UI",Roboto,Arial,"Noto Sans","Liberation Sans",sans-serif;
      -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale;
      --fg:#0f172a; --muted:#475569; --border:#e5e7eb; --soft:#f8fafc;
      --blue:#2563eb; --blue-700:#1d4ed8; --green:#16a34a; --red:#dc2626;
      --bg:#f1f5ff; --radius:18px; --shadow:0 16px 40px rgba(2,6,23,.08);
      color:var(--fg);
    }

    section{
      padding:84px 0;
      background: radial-gradient(800px 420px at 85% -10%, rgba(37,99,235,.08), transparent 60%),
                  linear-gradient(180deg, var(--bg) 0%, #ffffff 70%);
    }
    .container{ max-width:1100px; margin:0 auto; padding:0 16px; }

    .grid{ display:grid; gap:24px; grid-template-columns: 1.05fr .95fr; align-items:stretch }
    @media (max-width: 980px){ .grid{ grid-template-columns:1fr } }

    /* Левый инфоблок — насыщаем контентом */
    .left{
      border:1px solid var(--border); border-radius:var(--radius);
      background:linear-gradient(180deg,#fff,#f8fafc);
      padding:24px; box-shadow:var(--shadow);
      display:grid; gap:16px; align-content:start;
    }
    .eyebrow{
      display:inline-flex; align-items:center; gap:.5rem; padding:10px 14px;
      border-radius:999px; border:1px solid #bbf7d0; background:#ecfdf5; color:#166534; font-weight:800;
      margin-bottom:4px;
    }
    h2{
      margin:0 0 6px; font-size:clamp(26px,3.2vw,52px);
      font-family:"Manrope","Inter",system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif; font-weight:800;
      letter-spacing:.2px; text-transform: uppercase;
    }
    .lead{ color:#334155; font-weight:600; letter-spacing:.2px; line-height:1.55; }

    .bullets{
      display:grid; gap:10px; margin-top:2px;
    }
    .b{
      display:flex; gap:10px; align-items:flex-start;
      background:#fff; border:1px solid var(--border); border-radius:12px; padding:10px 12px;
    }
    .b .dot{
      flex:0 0 10px; width:10px; height:10px; margin-top:6px; border-radius:999px; background:#22c55e;
    }
    .b .txt{ font-weight:600; color:#0f172a; }

    .contact{
      display:grid; gap:10px;
      border:1px solid #bbf7d0; background:#ecfdf5; border-radius:14px; padding:12px;
    }
    .contact .row{ display:flex; gap:10px; align-items:center; }
    .contact a{ color:#065f46; text-decoration:none; font-weight:800 }
    .contact a:hover{ text-decoration:underline }

    .sla{
      display:inline-flex; align-items:center; gap:.5rem;
      padding:.35rem .6rem; border-radius:999px; font-weight:800; font-size:.85rem;
      background:#eef2ff; color:#1d4ed8; border:1px solid #c7d2fe; width:max-content;
    }

    /* Правая карточка (форма) */
    .card{
      border:1px solid var(--border); border-radius:var(--radius); background:#fff; box-shadow:var(--shadow);
      padding:22px; display:flex; flex-direction:column; gap:14px;
    }
    form{ display:grid; gap:14px }
    .row{ display:grid; grid-template-columns: 1fr 1fr; gap:12px }
    @media (max-width:560px){ .row{ grid-template-columns:1fr } }

    label{ display:block; font-weight:700; font-size:.95rem; margin-bottom:6px; color:#0f172a }
    .control{
      display:flex; align-items:center; gap:10px;
      border:1px solid var(--border); border-radius:14px; background:#fff; padding:12px 14px;
      transition:border-color .15s ease, box-shadow .15s ease;
    }
    .control:focus-within{ border-color:#bfdbfe; box-shadow:0 0 0 4px rgba(59,130,246,.12) }
    input, textarea{ border:0; outline:0; width:100%; font:inherit; color:inherit; background:transparent; }
    textarea{ resize:vertical; min-height:110px; line-height:1.45 }

    .btn{
      appearance:none; border:0; border-radius:14px; padding:16px 22px; font-weight:800; font-size:17px;
      cursor:pointer; text-decoration:none; display:inline-flex; align-items:center; justify-content:center; gap:.6rem;
      color:#fff; background:linear-gradient(180deg, var(--blue), var(--blue-700)); box-shadow:0 12px 28px rgba(37,99,235,.30);
      transition:.2s transform,.2s box-shadow;
    }
    .btn:hover{ transform: translateY(-1px); box-shadow:0 16px 36px rgba(37,99,235,.38) }

    .msg{ display:none; padding:12px 14px; border-radius:12px; font-weight:700 }
    .msg.ok{ display:block; background:#ecfdf5; color:#14532d; border:1px solid #bbf7d0 }
    .msg.err{ display:block; background:#fef2f2; color:#991b1b; border:1px solid #fecaca }

    .hp{ position:absolute; left:-9999px; width:1px; height:1px; overflow:hidden }
    .mono{ font-variant-numeric: tabular-nums; }
  </style>

  <section id="qa">
    <div class="container">
      <div class="grid">
        <!-- Левая колонка -->
        <aside class="left">
          <div class="eyebrow">Ответим на ваши вопросы</div>
          <h2 data-title>Ответим на ваши вопросы</h2>
          <p class="lead" data-subtitle>
            Получите консультацию по дезинфекции гибких эндоскопов с помощью автоматической
            установки ПРОФИ‑АУДЭ.
          </p>

          <div class="bullets">
            <div class="b"><span class="dot"></span><div class="txt">Подберём режимы обработки и расходники</div></div>
            <div class="b"><span class="dot"></span><div class="txt">Поможем с подключением и запуском</div></div>
            <div class="b"><span class="dot"></span><div class="txt">Сориентируем по срокам поставки и сервису</div></div>
          </div>

          <div class="contact">
            <div class="row">📞 <a data-phonehref target="_blank" rel="noopener"> <span data-phone>+7 (812) 123‑45‑67</span></a></div>
            <div class="row">✉️ <a data-emailhref> <span data-email>info@aude.ru</span></a></div>
          </div>

          <div class="sla">Среднее время ответа ~ 15 минут</div>
        </aside>

        <!-- Правая форма -->
        <div class="card">
          <form novalidate>
            <input type="text" name="_gotcha" class="hp" tabindex="-1" autocomplete="off" />

            <div>
              <label for="q">Ваш вопрос</label>
              <div class="control">
                <textarea id="q" name="question" placeholder="Опишите задачу или уточните интересующий режим работы…"></textarea>
              </div>
            </div>

            <div class="row">
              <div>
                <label for="name">Ваше имя</label>
                <div class="control">
                  <input id="name" name="name" type="text" placeholder="Иван Петров" autocomplete="name" required>
                </div>
              </div>
              <div>
                <label for="phone">Ваш телефон</label>
                <div class="control">
                  <input id="phone" name="phone" type="tel" class="mono" placeholder="+7 (___) ___‑__‑__" autocomplete="tel" required>
                </div>
              </div>
            </div>

            <div>
              <label for="email">Ваш email</label>
              <div class="control">
                <input id="email" name="email" type="email" placeholder="you@example.com" autocomplete="email" required>
              </div>
            </div>

            <button class="btn" type="submit">Задать вопрос</button>

            <div class="msg ok" data-ok>Спасибо! Мы свяжемся с вами в ближайшее время.</div>
            <div class="msg err" data-err>Не получилось отправить. Проверьте поля или попробуйте позже.</div>
          </form>
        </div>
      </div>
    </div>
  </section>
`

// js/components/qa-form.js
class QAForm extends HTMLElement{
  constructor(){ 
    super(); 
    this.attachShadow({mode:'open'}).appendChild(tpl.content.cloneNode(true)) 
  }
  
  static get observedAttributes(){ 
    return ['email','phone','phonehref','action','method','title','subtitle','bot-token','chat-id'] 
  }
  
  connectedCallback(){ 
    this._apply(); 
    this._bind(); 
  }
  
  attributeChangedCallback(){ this._apply(); }

  $(s){ return this.shadowRoot.querySelector(s) }

  _apply(){
    const title    = this.getAttribute('title')    || 'Ответим на ваши вопросы'
    const subtitle = this.getAttribute('subtitle') || 'Получите консультацию по дезинфекции гибких эндоскопов с помощью автоматической установки ПРОФИ‑АУДЭ.'
    const phone    = this.getAttribute('phone')    || '+7 (812) 123‑45‑67'
    const phonehref= this.getAttribute('phonehref')|| '+78121234567'
    const email    = this.getAttribute('email')    || 'info@aude.ru'

    this.$('[data-title]').textContent    = title
    this.$('[data-subtitle]').textContent = subtitle

    this.$('[data-phone]').textContent = phone
    this.$('[data-phonehref]').setAttribute('href', `tel:${phonehref}`)
    this.$('[data-email]').textContent = email
    this.$('[data-emailhref]').setAttribute('href', `mailto:${email}`)
  }

  _bind(){
    const form  = this.$('form')
    const okMsg = this.$('[data-ok]')
    const erMsg = this.$('[data-err]')
    const phone = this.$('#phone')
    const submitBtn = this.$('button[type="submit"]')

    // мягкая маска телефона
    phone.addEventListener('input', (e)=>{
      const d = e.target.value.replace(/\D/g,'').replace(/^8/, '7')
      let v = '+7 '
      if (d.length > 1) v += '(' + d.slice(1,4)
      if (d.length >= 4) v += ') ' + d.slice(4,7)
      if (d.length >= 7) v += '‑' + d.slice(7,9)
      if (d.length >= 9) v += '‑' + d.slice(9,11)
      e.target.value = v
    }, { passive:true })

    form.addEventListener('submit', async (ev)=>{
      ev.preventDefault()
      okMsg.style.display = 'none'
      erMsg.style.display = 'none'
      
      // Показываем loading state
      const originalText = submitBtn.textContent
      submitBtn.textContent = 'Отправка...'
      submitBtn.disabled = true

      if (form.elements['_gotcha'].value) { 
        submitBtn.textContent = originalText
        submitBtn.disabled = false
        return 
      }

      const name  = this.$('#name')
      const tel   = this.$('#phone')
      const email = this.$('#email')
      const question = this.$('#q')

      const valid = name.value.trim().length >= 2 &&
                    /\d/.test(tel.value) &&
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())

      if (!valid){
        erMsg.textContent = 'Пожалуйста, корректно заполните все обязательные поля.'
        erMsg.style.display = 'block'
        submitBtn.textContent = originalText
        submitBtn.disabled = false
        return
      }

      try {
        // Пробуем отправить через Telegram
        const success = await this._sendToTelegram({
          name: name.value.trim(),
          phone: tel.value,
          email: email.value.trim(),
          question: question.value.trim(),
          formType: 'Вопрос с сайта'
        })

        if (success) {
          okMsg.style.display = 'block'
          form.reset()
          // Прокручиваем к сообщению об успехе
          okMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        } else {
          throw new Error('Не удалось отправить через Telegram')
        }
      } catch (error) {
        // Fallback на mailto
        this._sendViaMailto({
          name: name.value.trim(),
          phone: tel.value,
          email: email.value.trim(),
          question: question.value.trim()
        })
        okMsg.style.display = 'block'
        form.reset()
      } finally {
        submitBtn.textContent = originalText
        submitBtn.disabled = false
      }
    })
  }

  async _sendToTelegram(formData) {
    const botToken = this.getAttribute('bot-token') || 'YOUR_BOT_TOKEN';
    const chatId = this.getAttribute('chat-id') || 'YOUR_CHAT_ID';
    
    // Если токен и chatId не настроены, пропускаем Telegram
    if (botToken === 'YOUR_BOT_TOKEN' || chatId === 'YOUR_CHAT_ID') {
      return false;
    }

    const message = `
📋 *Новый вопрос с сайта*

*Тип:* ${formData.formType}
*Имя:* ${formData.name}
*Телефон:* ${formData.phone}
*Email:* ${formData.email}
*Вопрос:* ${formData.question || 'Не указан'}

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
      console.error('Telegram error:', error);
      return false;
    }
  }

  _sendViaMailto(formData) {
    const to = this.getAttribute('email') || 'info@aude.ru';
    const subject = encodeURIComponent('Вопрос с сайта — ПРОФИ‑АУДЭ');
    const body = encodeURIComponent(`
Вопрос: ${formData.question || '(не указан)'}

Контактные данные:
Имя: ${formData.name}
Телефон: ${formData.phone}
Email: ${formData.email}

Время отправки: ${new Date().toLocaleString('ru-RU')}
Страница: ${window.location.href}
    `.trim());

    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  }
}

customElements.define('qa-form', QAForm)