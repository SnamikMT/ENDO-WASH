// js/components/modes-section.js
// <modes-section></modes-section>
const tpl = document.createElement('template')
tpl.innerHTML = `
  <style>
    :host{
      display:block;
      font-family:"Inter",system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;
      -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale;
      --fg:#0f172a; --muted:#475569; --border:#e5e7eb;
      --blue:#2563eb; --blue-700:#1d4ed8; --green:#16a34a; --indigo:#4f46e5;
      --rail:#e5e7eb; --rail-grad-start:#c7d2fe; --rail-grad-end:#60a5fa;
      --panel:#ffffff; --bg:#f8fafc;
      --radius:18px; --shadow:0 14px 38px rgba(2,6,23,.08);
      color:var(--fg);
    }

    section{
      padding:84px 0;
      background:
        radial-gradient(1000px 520px at 85% -10%, rgba(37,99,235,.10), transparent 60%),
        linear-gradient(180deg, #eef2ff 0%, #fff 95%);
    }
    .container{ max-width:1100px; margin:0 auto; padding:0 16px; }

    .eyebrow{
      display:inline-flex; align-items:center; gap:.5rem; padding:10px 14px;
      border-radius:999px; border:1px solid #bfdbfe; background:#dbeafe; color:#1e40af;
      font-family:"Manrope","Inter",system-ui; font-weight:800; font-size:.95rem;
    }
    h2{
      margin:14px 0 8px; font-size:clamp(28px,3.6vw,40px);
      font-family:"Manrope","Inter",system-ui; font-weight:800; letter-spacing:.2px;
      text-align:center;
    }
    .lead{
      color:#334155; max-width:860px; margin:0 auto 26px; text-align:center; letter-spacing:.2px; font-weight:600;
    }

    .panel{
      border:1px solid var(--border); border-radius:var(--radius); background:var(--panel); box-shadow:var(--shadow);
      overflow:hidden;
    }
    .panel-body{ padding:26px }

    /* ======= СТЕППЕР (ГОРИЗОНТАЛЬНЫЙ КОНВЕЙЕР) ======= */
    .sequence{ position:relative; }
    .rail{
      position:relative;
      overflow-x:auto; -webkit-overflow-scrolling: touch;
      scroll-snap-type:x mandatory;
      padding:40px 8px 12px;  /* место под точки */
    }
    .rail::-webkit-scrollbar{ height:10px }
    .rail::-webkit-scrollbar-thumb{ background:#cbd5e1; border-radius:999px }
    .rail::-webkit-scrollbar-track{ background:#eef2ff; border-radius:999px }

    /* линия под точками */
    .rail::before{
      content:"";
      position:absolute; left:16px; right:16px; top:46px; height:4px;
      background:linear-gradient(90deg, var(--rail-grad-start), var(--rail-grad-end));
      border-radius:999px; opacity:.85;
    }

    /* контейнер узлов */
    .nodes{
      position:relative;
      display:grid;
      grid-auto-flow:column;
      grid-auto-columns: minmax(190px, 1fr);
      gap:28px;
    }
    /* на широких — укладываем в 7 равных колонок, без скролла */
    @media (min-width: 1150px){
      .rail{ overflow:visible }
      .nodes{ grid-auto-flow: initial; grid-auto-columns:unset; grid-template-columns: repeat(7, 1fr); }
      .rail::before{ left:24px; right:24px }
    }

    .node{
      position:relative;
      display:grid; justify-items:center; gap:10px; scroll-snap-align:center;
      padding:0 4px;
    }
    .dot{
      z-index:1;
      width:44px; height:44px; border-radius:50%;
      display:grid; place-items:center;
      background:#fff; border:2px solid var(--indigo); color:var(--indigo);
      font-weight:900; font-size:14px;
      box-shadow:0 10px 20px rgba(37,99,235,.12), 0 1px 0 rgba(255,255,255,.9) inset;
    }
    .icoWrap{
      position:absolute; top:-6px; transform:translateY(-100%);
      background:#fff; border:1px solid var(--border); border-radius:12px;
      box-shadow:0 10px 24px rgba(2,6,23,.10); padding:8px;
    }
    .cap{
      text-align:center; font-weight:800; color:#0f172a; letter-spacing:.1px;
      font-size:15px; line-height:1.25;
    }
    .chip{
      margin-top:6px; display:inline-flex; align-items:center; gap:.35rem; padding:.25rem .55rem;
      border-radius:999px; font-weight:800; font-size:.78rem;
      background:#ecfdf5; color:#166534; border:1px solid #bbf7d0; white-space:nowrap;
    }

    /* ======= ПРОДАЮЩИЕ ВЫГОДЫ ======= */
    .benefits{
      display:grid; gap:14px; margin-top:22px;
      grid-template-columns: 1fr;
    }
    @media(min-width:900px){ .benefits{ grid-template-columns: repeat(3,1fr) } }
    .b{
      display:flex; align-items:center; gap:12px;
      background:linear-gradient(180deg,#ffffff,#f8fafc);
      border:1px solid var(--border); border-radius:16px; padding:14px 16px;
      box-shadow:0 10px 22px rgba(2,6,23,.06);
    }
    .b .ic{
      flex:0 0 38px; height:38px; width:38px; border-radius:12px;
      background:#eef2ff; display:grid; place-items:center; border:1px solid #c7d2fe; color:#1d4ed8;
      box-shadow: inset 0 1px 0 rgba(255,255,255,.7);
    }
    .b strong{ display:block; font-weight:900; }
    .b span{ color:var(--muted); font-weight:600; font-size:.95rem }

    /* ======= РУЧНОЙ РЕЖИМ ======= */
    .note{
      border:1px dashed #cbd5e1; border-radius:16px; background:#f8fafc; padding:18px; color:#0f172a; font-weight:600;
      margin-bottom:14px;
    }
    .cards{ display:grid; grid-template-columns:1.2fr .8fr; gap:16px; }
    @media (max-width:900px){ .cards{ grid-template-columns:1fr } }
    .card{
      border:1px solid var(--border); border-radius:16px; background:#fff; padding:18px; box-shadow:0 12px 28px rgba(15,23,42,.06);
    }
    .card h3{
      margin:0 0 10px; font-size:18px; font-weight:800; font-family:"Manrope","Inter",system-ui;
    }
    .ul{ display:grid; gap:10px }
    .li{ display:flex; align-items:flex-start; gap:12px; }
    .dotMini{ width:9px; height:9px; border-radius:999px; background:var(--green); margin-top:9px }

    /* SVG icons baseline */
    svg{ display:block }
  </style>

  <section id="modes">
    <div class="container">
      <div style="text-align:center">
        <div class="eyebrow">Режимы работы</div>
        <h2>ПОЛНЫЙ ЦИКЛ ОБРАБОТКИ ЭНДОСКОПА — 7 ПОСЛЕДОВАТЕЛЬНЫХ ЭТАПОВ</h2>
        <p class="lead">Автоматический режим обеспечивает стабильное качество, снижает человеческий фактор и документирует каждый шаг.</p>
      </div>

      <!-- Автоматический режим: наглядная последовательность -->
      <div class="panel" role="region" aria-label="Автоматический режим">
        <div class="panel-body">
          <div class="sequence">
            <div class="rail">
              <div class="nodes" data-nodes></div>
            </div>

            <!-- мини‑выгоды под степпером -->
            <div class="benefits" aria-hidden="false">
              <div class="b">
                <div class="ic">${iconGear()}</div>
                <div><strong>Автоматизация</strong><span>процесс без ручных ошибок</span></div>
              </div>
              <div class="b">
                <div class="ic">${iconShield()}</div>
                <div><strong>Защита от ошибок</strong><span>фиксированная последовательность и контроль</span></div>
              </div>
              <div class="b">
                <div class="ic">${iconPrinter()}</div>
                <div><strong>Документирование</strong><span>отчёт по каждому циклу</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Ручной режим -->
      <div class="panel" style="margin-top:16px" role="region" aria-label="Ручной режим">
        <div class="panel-body">
          <div class="note">
            <strong>Ручной режим</strong> позволяет выполнять этапы <u>в любой последовательности</u> — повторная промывка,
            дополнительная сушка и др. Оператор формирует сценарий под задачу.
          </div>
          <div class="cards">
            <div class="card">
              <h3>Дополнительные режимы</h3>
              <div class="ul">
                <div class="li"><span class="dotMini"></span><div>Окончательная очистка с однократным применением моющего средства</div></div>
                <div class="li"><span class="dotMini"></span><div>ДВУ с однократным / многократным использованием дезсредства</div></div>
              </div>
            </div>
            <div class="card">
              <h3>Сушка / спирт</h3>
              <div class="ul">
                <div class="li"><span class="dotMini"></span><div>Промывание этиловым спиртом и удаление влаги из каналов</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
`

/* ------- ИКОНКИ (чистые inline SVG) ------- */
function iconDrop(){ return `
<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
  <path fill="currentColor" d="M12 2c2.8 3.9 6 7.7 6 11.1A6 6 0 1 1 6 13.1C6 9.7 9.2 5.9 12 2Z"/>
</svg>`}
function iconBubbles(){ return `
<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
  <circle cx="7" cy="12" r="3" fill="currentColor"/><circle cx="14.5" cy="8" r="2.5" fill="currentColor"/><circle cx="17" cy="15.5" r="2" fill="currentColor"/>
</svg>`}
function iconShield(){ return `
<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
  <path fill="currentColor" d="M12 2l7 3v6c0 5-3.7 9.7-7 11c-3.3-1.3-7-6-7-11V5l7-3z"/>
</svg>`}
function iconFan(){ return `
<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
  <path fill="currentColor" d="M12 3a3 3 0 110 6 3 3 0 010-6zm6.6 10.2a3 3 0 11-3.6 4.8 3 3 0 013.6-4.8zM5.4 13.2a3 3 0 103.6 4.8 3 3 0 00-3.6-4.8z"/>
</svg>`}
function iconGear(){ return `
<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
  <path fill="currentColor" d="M19.4 12.9c.04-.3.06-.6.06-.9s-.02-.6-.06-.9l2-1.6a.5.5 0 00.12-.64l-1.9-3.3a.5.5 0 00-.6-.22l-2.3.9a7.4 7.4 0 00-1.6-.9L14.8 2a.5.5 0 00-.5-.4h-3.6a.5.5 0 00-.5.4L9 4.5c-.56.22-1.1.52-1.6.9l-2.3-.9a.5.5 0 00-.6.22L2.6 8.02a.5.5 0 00.12.64l2 1.6c-.04.3-.06.6-.06.9s.02.6.06.9l-2 1.6a.5.5 0 00-.12.64l1.9 3.3a.5.5 0 00.6.22l2.3-.9c.5.38 1.04.68 1.6.9l1.2 2.5a.5.5 0 00.5.4h3.6a.5.5 0 00.5-.4l1.2-2.5c.56-.22 1.1-.52 1.6-.9l2.3.9a.5.5 0 00.6-.22l1.9-3.3a.5.5 0 00-.12-.64l-2-1.6zM12 15.5A3.5 3.5 0 1112 8a3.5 3.5 0 010 7.5z"/>
</svg>`}
function iconPrinter(){ return `
<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
  <path fill="currentColor" d="M6 9V3h12v6h1a3 3 0 013 3v5a2 2 0 01-2 2h-2v-4H6v4H4a2 2 0 01-2-2v-5a3 3 0 013-3h1zm2-4h8v4H8V5zm0 12h8v4H8v-4z"/>
</svg>`}

class ModesSection extends HTMLElement{
  constructor(){ super(); this.attachShadow({mode:'open'}).appendChild(tpl.content.cloneNode(true)) }

  connectedCallback(){
    const nodesBox = this.shadowRoot.querySelector('[data-nodes]')

    // 7 последовательных шагов — НОМЕР + ИКОНКА + ПОДПИСЬ
    const steps = [
      { t:"Ополаскивание",                icon: iconDrop()    },
      { t:"Окончательная очистка",        icon: iconBubbles() },
      { t:"Ополаскивание",                icon: iconDrop()    },
      { t:"Дезинфекция высокого уровня", icon: iconShield(), chip:"ДВУ" },
      { t:"Ополаскивание",                icon: iconDrop()    },
      { t:"Ополаскивание",                icon: iconDrop()    },
      { t:"Сушка — удаление влаги",       icon: iconFan()     },
    ]

    nodesBox.innerHTML = steps.map((s, i)=>`
      <div class="node" role="group" aria-label="Шаг ${i+1}: ${s.t}">
        <div class="icoWrap" aria-hidden="true" title="${s.t}">
          ${s.icon}
        </div>
        <div class="dot" aria-label="Шаг ${i+1}">${i+1}</div>
        <div class="cap">
          ${s.t}
          ${s.chip ? `<div class="chip">${s.chip}</div>` : ``}
        </div>
      </div>
    `).join('')
  }
}
customElements.define('modes-section', ModesSection)
