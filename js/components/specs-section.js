// js/components/specs-section.js
// <specs-section></specs-section>
const tpl = document.createElement('template')
tpl.innerHTML = `
  <style>
    :host{
      display:block;
      font-family:"Inter",system-ui,-apple-system,"Segoe UI",Roboto,Arial,"Noto Sans",sans-serif;
      -webkit-font-smoothing:antialiased;
      --fg:#0f172a; --muted:#475569;
      --border:rgba(255,255,255,.18);
      --radius:16px; --shadow:0 14px 38px rgba(0,0,0,.25);
      color:#fff;
    }

    section{ 
      padding:84px 0; 
      background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%);
      color:#fff;
      position:relative;
      overflow:hidden;
    }

    /* декоративные круги */
    section::before, section::after{
      content:""; position:absolute; border-radius:50%; filter:blur(140px);
      opacity:.35; z-index:0;
    }
    section::before{
      width:520px; height:520px;
      top:-200px; left:-120px;
      background:#3b82f6;
    }
    section::after{
      width:520px; height:520px;
      bottom:-200px; right:-160px;
      background:#2563eb;
    }

    .container{ max-width:1200px; margin:0 auto; padding:0 16px; position:relative; z-index:1; }

    .eyebrow{
      display:inline-flex; align-items:center; gap:.5rem; padding:10px 14px;
      border-radius:999px; border:1px solid rgba(255,255,255,.3);
      background:rgba(255,255,255,.1); color:#fff;
      font-weight:800; font-size:.95rem;
    }
    h2{
      margin:14px 0 8px;
      font-size:clamp(28px,3.6vw,52px);
      font-weight:800;
      text-align:center;
      text-transform: uppercase;
      color:#fff;
    }
    .lead{
      color:rgba(255,255,255,.85);
      max-width:880px;
      margin:0 auto 28px;
      text-align:center;
      font-weight:600;
    }

    .grid{ display:grid; gap:24px; grid-template-columns:1fr 1fr; }
    @media(max-width:980px){ .grid{ grid-template-columns:1fr } }

    .card{
      background:#fff;
      border:1px solid var(--border);
      border-radius:var(--radius);
      box-shadow:var(--shadow);
      overflow:hidden;
      position:relative;
      z-index:1;
      color:#0f172a;
    }
    .card-hd{
      padding:16px 18px;
      background:linear-gradient(180deg,#f8fafc,#fff);
      border-bottom:1px solid #e5e7eb;
    }
    .card-title{ margin:0; font-size:18px; font-weight:800; }

    .tbl{ width:100%; border-collapse:separate; border-spacing:0; }
    .tbl thead th{
      text-align:left; font-weight:800; font-size:13.5px; color:#0f172a;
      padding:12px 14px; border-bottom:2px solid #e5e7eb;
      background:#f9fafb;
    }
    .tbl tbody tr:nth-child(odd){ background:#f9fafb }
    .tbl tbody tr:nth-child(even){ background:#ffffff }
    .tbl tbody tr:hover{ background:#f1f5f9; transition:.2s }

    .tbl td{
      padding:12px 14px;
      font-size:14.5px;
      border-bottom:1px dashed #e5e7eb;
    }
    .tbl tr:last-child td{ border-bottom:0 }

    .col-name{ background:#eff6ff; font-weight:700; }
    .col-val { background:#f0fdf4; font-weight:600; }
    .tbl td.col-name, .tbl td.col-val{ border-right:1px solid #e5e7eb }
    .tbl td.col-val{ border-right:0 }
  </style>

  <section id="specs">
    <div class="container">
      <div style="text-align:center">
        <div class="eyebrow">Технические характеристики</div>
        <h2>Технические характеристики и комплектация поставки</h2>
        <p class="lead">Ключевые параметры установки и комплект поставки для запуска системы «из коробки».</p>
      </div>

      <div class="grid">
        <article class="card">
          <header class="card-hd"><h3 class="card-title">Характеристики</h3></header>
          <table class="tbl">
            <thead><tr><th>Характеристика</th><th>Показатель</th></tr></thead>
            <tbody>
              <tr><td class="col-name">Максимальное количество обрабатываемых эндоскопов</td><td class="col-val">2&nbsp;шт</td></tr>
              <tr><td class="col-name">Габаритные размеры моечной ванны</td><td class="col-val">480×390×150&nbsp;мм</td></tr>
              <tr><td class="col-name">Рабочий объём ванны</td><td class="col-val">15&nbsp;л</td></tr>
              <tr><td class="col-name">Объём ёмкости моюще-дезинфицирующего средства</td><td class="col-val">1&nbsp;л</td></tr>
              <tr><td class="col-name">Объём ёмкости дезинфицирующего средства</td><td class="col-val">20&nbsp;л</td></tr>
              <tr><td class="col-name">Производительность прокачки рабочей жидкости</td><td class="col-val">1&nbsp;л/мин</td></tr>
              <tr><td class="col-name">Фильтрация рабочего раствора</td><td class="col-val">≥&nbsp;50&nbsp;мкм</td></tr>
              <tr><td class="col-name">Механическая фильтрация воды</td><td class="col-val">≥&nbsp;50&nbsp;мкм</td></tr>
              <tr><td class="col-name">Диапазон измерения температуры</td><td class="col-val">10–70&nbsp;°C</td></tr>
            </tbody>
          </table>
        </article>

        <article class="card">
          <header class="card-hd"><h3 class="card-title">Комплектация</h3></header>
          <table class="tbl">
            <thead><tr><th>Наименование</th><th>Кол-во</th></tr></thead>
            <tbody>
              <tr><td class="col-name">Установка автоматическая АУДЭ-ПРОФИ</td><td class="col-val">1</td></tr>
              <tr><td class="col-name">Блок питания</td><td class="col-val">1</td></tr>
              <tr><td class="col-name">Шланг подключения</td><td class="col-val">1</td></tr>
              <tr><td class="col-name">Шланг слива в канализацию</td><td class="col-val">1</td></tr>
              <tr><td class="col-name">Комплект магистралей</td><td class="col-val">1</td></tr>
              <tr><td class="col-name">Ёмкости для спирта и принадлежностей</td><td class="col-val">1</td></tr>
              <tr><td class="col-name">Полимерный контейнер КДС</td><td class="col-val">1</td></tr>
              <tr><td class="col-name">Адаптеры для эндоскопов</td><td class="col-val">10</td></tr>
              <tr><td class="col-name">Фильтрующие элементы</td><td class="col-val">12</td></tr>
              <tr><td class="col-name">Инструкция по применению</td><td class="col-val">1</td></tr>
              <tr><td class="col-name">Руководство по эксплуатации</td><td class="col-val">1</td></tr>
            </tbody>
          </table>
        </article>
      </div>
    </div>
  </section>
`

class SpecsSection extends HTMLElement{
  constructor(){
    super()
    this.attachShadow({mode:'open'}).appendChild(tpl.content.cloneNode(true))
  }
}
customElements.define('specs-section', SpecsSection)
