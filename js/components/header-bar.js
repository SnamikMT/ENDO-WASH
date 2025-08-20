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
    }
    .wrap {
      position:sticky; top:0; z-index:1000;
      background: var(--c-bg);
      backdrop-filter: blur(8px);
      border-bottom:1px solid var(--c-border);
    }
    .container { max-width:1200px; margin:0 auto; padding: 14px 20px; }
    .row { display:flex; align-items:center; justify-content:space-between; gap:20px; }

    /* Логотип и теглайн */
    .brand { display:flex; align-items:center; gap:14px; min-width:0 }
    .logo {
      display:inline-flex; align-items:center; gap:6px;
      font-weight:900; letter-spacing:.4px; font-size:22px; color:var(--c-blue);
    }
    .amp { color:var(--c-fg) }
    .tag { color:var(--c-muted); font-size:15px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis }

    /* Контакты */
    .contacts { display:flex; align-items:center; gap:16px; flex-wrap:wrap }
    .phone {
      font-weight:900; font-size:22px; 
      color:var(--c-fg); text-decoration:none; white-space:nowrap;
    }
    .phone:hover { color:var(--c-blue) }
    .email { color:var(--c-muted); text-decoration:none; font-size:15px; white-space:nowrap }
    .email:hover { text-decoration:underline }

    /* Кнопка */
    .btn {
      appearance:none; border:0; border-radius:var(--radius);
      padding:14px 24px; font-size:16px;
      background:linear-gradient(180deg, var(--c-blue), var(--c-blue-700));
      color:#fff; font-weight:800; cursor:pointer;
      transition:.25s transform, .25s box-shadow;
      box-shadow: var(--shadow);
    }
    .btn:hover {
      transform: translateY(-2px) scale(1.03);
      box-shadow: 0 16px 40px rgba(37,99,235,.35);
    }

    /* Навигация */
    nav { border-top:1px solid var(--c-border); }
    .navrow { display:flex; align-items:center; justify-content:space-between; padding:10px 0; }
    .menu { display:flex; gap:10px; flex-wrap:wrap }
    .link {
      text-decoration:none; color:var(--c-fg); font-weight:600; font-size:14px;
      padding:12px 14px; border-radius:10px; transition: background .2s;
    }
    .link:hover { background:#f8fafc }
    .burger {
      display:none; border:1px solid var(--c-border); background:#fff;
      border-radius:10px; padding:10px 12px; cursor:pointer;
    }
    .burger:focus { outline:2px solid var(--c-blue) }

    @media (max-width:980px){ .tag{ display:none } .email{ display:none } }
    @media (max-width:820px){
      .menu{ display:none; flex-direction:column; gap:0 }
      .menu.open{ display:flex }
      .link{ border-radius:0; padding:14px }
      .burger{ display:inline-flex }
    }
  </style>

  <div class="wrap">
    <div class="container">
      <div class="row">
        <div class="brand">
          <div class="logo">ENDO <span class="amp">&amp;</span> WASH</div>
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
          <button class="burger" type="button" aria-expanded="false" aria-controls="menu">☰ Меню</button>
          <div id="menu" class="menu" role="menubar">
            <a class="link" href="#home">Главная</a>
            <a class="link" href="#benefits">Ключевые преимущества</a>
            <a class="link" href="#modes">Режимы работы</a>
            <a class="link" href="#exchange">Обмен на вашу мойку</a>
            <a class="link" href="#specs">Технические характеристики</a>
            <a class="link" href="#qa">Вопросы и консультация</a>
            <a class="link" href="#contacts">Контакты</a>
          </div>
        </div>
      </div>
    </nav>
  </div>
`

class HeaderBar extends HTMLElement{
  constructor(){ super(); this.attachShadow({mode:'open'}).appendChild(tpl.content.cloneNode(true)) }
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
        const header = this.shadowRoot.host; // сам <header-bar>
        const stickyH = this.getBoundingClientRect().height || 80; // fallback
        const y = target.getBoundingClientRect().top + window.pageYOffset - stickyH;

        window.scrollTo({ top: y, behavior: 'smooth' })

        if (menu.classList.contains('open')) {
          menu.classList.remove('open');
          burger.setAttribute('aria-expanded','false')
        }
      })
    })

    this.shadowRoot.querySelector('[data-callback]').addEventListener('click', ()=> {
      this.dispatchEvent(new CustomEvent('open-callback', {bubbles:true}))
      alert('Откроем модалку «Заказать звонок».')
    })
  }
}
customElements.define('header-bar', HeaderBar)
