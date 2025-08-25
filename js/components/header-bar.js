// js/components/header-bar.js
const tpl = document.createElement('template')
tpl.innerHTML = `
  <style>
    :host {
      display:block;
      --c-bg:#fff; --c-fg:#0f172a; --c-muted:#64748b; --c-border:#e5e7eb;
      --c-blue:#2563eb; --c-blue-700:#1d4ed8;
      --radius:16px;
      --shadow:0 12px 36px rgba(37,99,235,.25);
      --nav-bg:#ffffffee;
    }
    .wrap {
      position:sticky; top:0; z-index:1000;
      background: var(--c-bg);
      backdrop-filter: blur(8px);
      border-bottom:1px solid var(--c-border);
    }
    .container { max-width:1200px; margin:0 auto; padding: 12px 20px; }
    .row { display:flex; align-items:center; justify-content:space-between; gap:20px; }

    /* Брендовая зона */
    .brand { display:flex; align-items:center; gap:14px; min-width:0 }
    .logo img{ width:140px; object-fit:contain; border-radius:10px;}
    .logoSvg {
      display:inline-flex; align-items:center; justify-content:center;
      width:40px; height:40px; border-radius:10px;
      background: radial-gradient(120% 120% at 20% 0%, #3b82f6 0%, #1d4ed8 55%, #1e3a8a 100%);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.35), 0 6px 18px rgba(29,78,216,.35);
      flex:0 0 40px;
    }
    .logoSvg svg { width:26px; height:26px; color:#fff; }
    .wordmark {
      display:flex; flex-direction:column; line-height:1;
      font-weight:900; letter-spacing:.2px; color:var(--c-fg);
    }
    .wordmark .top { font-size:16px; }
    .wordmark .bottom { font-size:11px; color:var(--c-muted); font-weight:700 }
    .tag { color:var(--c-muted); font-size:15px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis }

    /* Контакты */
    .contacts { display:flex; align-items:center; gap:14px; flex-wrap:wrap }
    .phone {
      font-weight:900; font-size:20px; 
      color:var(--c-fg); text-decoration:none; white-space:nowrap;
    }
    .phone:hover { color:var(--c-blue) }
    .email { color:var(--c-muted); text-decoration:none; font-size:15px; white-space:nowrap }
    .email:hover { text-decoration:underline }

    /* Кнопка */
    .btn {
      appearance:none; border:0; border-radius:var(--radius);
      padding:12px 18px; font-size:15px;
      background:linear-gradient(180deg, var(--c-blue), var(--c-blue-700));
      color:#fff; font-weight:800; cursor:pointer;
      transition:.25s transform, .25s box-shadow;
      box-shadow: var(--shadow);
      white-space:nowrap;
    }
    .btn:hover {
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 16px 40px rgba(37,99,235,.35);
    }

    /* Навигация */
    nav { border-top:1px solid var(--c-border); }
    .navrow { align-items:center; justify-content:space-between; padding:10px 0; }
    .menu { display:flex; gap:10px; flex-wrap:wrap }
    .link {
      text-decoration:none; color:var(--c-fg); font-weight:600; font-size:14px;
      padding:12px 14px; border-radius:10px; transition: background .2s;
    }
    .link:hover { background:#f8fafc }

    .burger {
      display:none; border:1px solid var(--c-border); background:#fff;
      border-radius:10px; padding:10px 12px; cursor:pointer; margin-bottom: 8px;
    }
    .burger:focus { outline:2px solid var(--c-blue) }

    /* Планшеты: ужимаем лишнее */
    @media (max-width:980px){
      .tag{ display:none }
      .email{ display:none }
      .phone{ font-size:18px }
    }

    /* Мобилка */
    @media (max-width:820px){
      .container { padding: 10px 16px; }
      .row { gap:12px; }
      .wordmark .top{ font-size:15px }
      .wordmark .bottom{ font-size:10px }
      .contacts { gap:10px }
      .btn { padding:11px 14px; font-size:14px; border-radius:12px }
      .phone { font-size:17px }

      /* меню превращаем в выпадающую панель */
      .menu{
        display:none; flex-direction:column; gap:0;
        position:relative;
        width:100%;
      }
      .menu.open{
        display:flex;
        background:var(--nav-bg);
        border:1px solid var(--c-border);
        border-radius:12px;
        overflow:hidden;
      }
      .link{ border-radius:0; padding:14px 12px; }
      .link + .link { border-top:1px solid var(--c-border) }

      .burger{ display:inline-flex; align-items:center; gap:8px }
    }

    /* Очень узкие: складываем контакты, растягиваем CTA */
    @media (max-width:540px){
      .contacts{ width:100%; justify-content:flex-end }
      .phone{ display:none; } /* по желанию: оставляем только CTA */
    }

    /* Тень при скролле (добавляется классом .scrolled) */
    .wrap.scrolled{
      box-shadow: 0 8px 24px rgba(2,6,23,.08);
    }
  </style>

  <div class="wrap">
    <div class="container">
      <div class="row">
        <div class="brand">
          <!-- Слот для своего SVG-логотипа -->
          <slot name="logo">
            <!-- Дефолтный SVG-логотип (капля + крест) -->
          <div class="logo">
            <img src="images/logo.svg" alt="">

          </div>
          </slot>
          <div class="tag">Качественная дезинфекция эндоскопов</div>
        </div>

        <div class="contacts">
          <a class="phone" data-phone href="#">+7 (812) 123-45-67</a>
          <button class="btn" type="button" data-callback>Заказать звонок</button>
          <a class="email" data-email href="#">info@aude.ru</a>
        </div>
      </div>
    </div>

    <nav>
      <div class="container">
        <div class="navrow">
          <button class="burger" type="button" aria-expanded="false" aria-controls="menu" aria-label="Открыть меню">
            ☰ Меню
          </button>
          <div id="menu" class="menu" role="menubar">
            <a class="link" role="menuitem" href="#home">Главная</a>
            <a class="link" role="menuitem" href="#benefits">Ключевые преимущества</a>
            <a class="link" role="menuitem" href="#modes">Режимы работы</a>
            <a class="link" role="menuitem" href="#exchange">Обмен на вашу мойку</a>
            <a class="link" role="menuitem" href="#specs">Технические характеристики</a>
            <a class="link" role="menuitem" href="#qa">Вопросы и консультация</a>
            <a class="link" role="menuitem" href="#contacts">Контакты</a>
          </div>
        </div>
      </div>
    </nav>
  </div>
`

class HeaderBar extends HTMLElement{
  constructor(){ 
    super(); 
    this.attachShadow({mode:'open'}).appendChild(tpl.content.cloneNode(true)) 
    this._onScroll = this._onScroll.bind(this)
  }

  connectedCallback(){
    const $ = (sel)=>this.shadowRoot.querySelector(sel)

    const disp = this.getAttribute('phone') || '+7 (812) 123-45-67'
    const href = this.getAttribute('phonehref') || '+78121234567'
    const mail = this.getAttribute('email') || 'info@aude.ru'
    $('[data-phone]').textContent = disp
    $('[data-phone]').setAttribute('href', `tel:${href}`)
    $('[data-email]').textContent = mail
    $('[data-email]').setAttribute('href', `mailto:${mail}`)

    const burger = this.shadowRoot.querySelector('.burger')
    const menu = this.shadowRoot.querySelector('#menu')
    burger.addEventListener('click', ()=> {
      const open = menu.classList.toggle('open')
      burger.setAttribute('aria-expanded', String(open))
    })
    menu.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', (e)=>{
        const id = a.getAttribute('href')
        const target = document.querySelector(id)
        if (!target) return
        e.preventDefault()

        // оффсет на высоту шапки
        const stickyH = this.getBoundingClientRect().height || 80
        const y = target.getBoundingClientRect().top + window.pageYOffset - stickyH
        window.scrollTo({ top: y, behavior: 'smooth' })

        if (menu.classList.contains('open')) {
          menu.classList.remove('open')
          burger.setAttribute('aria-expanded','false')
        }
      })
    })

    this.shadowRoot.querySelector('[data-callback]').addEventListener('click', ()=> {
      this.dispatchEvent(new CustomEvent('open-callback', {bubbles:true}))
      // TODO: заменить на открытие твоего модального окна
      alert('Откроем модалку «Заказать звонок».')
    })

    // тень при скролле
    window.addEventListener('scroll', this._onScroll, { passive:true })
    this._onScroll()
  }

  disconnectedCallback(){
    window.removeEventListener('scroll', this._onScroll)
  }

  _onScroll(){
    const wrap = this.shadowRoot.querySelector('.wrap')
    if (!wrap) return
    if (window.scrollY > 6) wrap.classList.add('scrolled')
    else wrap.classList.remove('scrolled')
  }
}
customElements.define('header-bar', HeaderBar)
