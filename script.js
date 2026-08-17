const PRODUCTS = [
  {id:'p1',  name:'Luminous Skincare Set',    brand:'ShopWow', price:19.99, oldPrice:null,  cat:'skincare', badge:'new',  rating:4.8, reviews:312,  shades:['#f5d0b0','#e8a070','#c07040'], img:'assets/images/cream.webp',  emoji:'🧴', isNew:true, stock:22},
  {id:'p2',  name:'Hydrating Face Serum',     brand:'ShopWow', price:29.99, oldPrice:39.99, cat:'serum',    badge:'sale', rating:4.9, reviews:874,  shades:['#f0e8e0'],                     img:'assets/images/syrum.webp', emoji:'💧', isNew:false, stock:16},
  {id:'p3',  name:'Lip Care Kit',             brand:'ShopWow', price:39.99, oldPrice:null,  cat:'lip',      badge:'best', rating:4.7, reviews:541,  shades:['#e8a0a0','#c06060','#902020'], img:'assets/images/lipstick.webp', emoji:'💋', isNew:false, stock:12},
  {id:'p4',  name:'Revive Eye Cream',         brand:'ShopWow', price:49.99, oldPrice:64.99, cat:'eye',      badge:'sale', rating:4.6, reviews:228,  shades:[],                              img:'assets/images/eyeshadow2.webp', emoji:'👁️', isNew:false, stock:10},
  {id:'p5',  name:'Pro Makeup Bundle',        brand:'ShopWow', price:49.99, oldPrice:null,  cat:'makeup',   badge:'best', rating:4.8, reviews:1023, shades:['#f0c0a0','#d09060','#a06030','#704020'], img:'assets/images/products.webp', emoji:'💄', isNew:false, stock:18},
  {id:'p6',  name:'Velvet Matte Lipstick',    brand:'ShopWow', price:24.99, oldPrice:34.99, cat:'makeup',   badge:'sale', rating:4.5, reviews:763,  shades:['#e8a0a0','#c06080','#8b3050','#5a1a30'], img:'assets/images/lipstick.webp', emoji:'💄', isNew:false, stock:9},
  {id:'p7',  name:'Glow Highlighter Duo',     brand:'ShopWow', price:34.99, oldPrice:null,  cat:'makeup',   badge:'new',  rating:4.9, reviews:446,  shades:['#f8e8c0','#e8c890','#c0a060'], img:'assets/images/highlighter.webp', emoji:'✨', isNew:true, stock:14},
  {id:'p8',  name:'Vitamin C Brightening',    brand:'ShopWow', price:44.99, oldPrice:59.99, cat:'serum',    badge:'sale', rating:4.7, reviews:589,  shades:[],                              img:'assets/images/vitaminc.webp', emoji:'🍋', isNew:false, stock:11},
  {id:'p9',  name:'Rose Blush Palette',       brand:'ShopWow', price:22.99, oldPrice:null,  cat:'makeup',   badge:'new',  rating:4.6, reviews:192,  shades:['#f0a0a0','#e08080','#c06060'], img:'assets/images/blush.webp', emoji:'🌸', isNew:true, stock:20},
  {id:'p10', name:'Precision Eye Liner Set',  brand:'ShopWow', price:18.99, oldPrice:null,  cat:'eye',      badge:'best', rating:4.8, reviews:334,  shades:['#1a1a1a','#2a1a40','#0a3050'], img:'assets/images/allmakeup.webp', emoji:'✏️', isNew:false, stock:16},
  {id:'p11', name:'Nourishing Night Cream',   brand:'ShopWow', price:38.99, oldPrice:52.99, cat:'skincare', badge:'sale', rating:4.7, reviews:421,  shades:[],                              img:'assets/images/highlighter.webp', emoji:'🌙', isNew:false, stock:8},
  {id:'p12', name:'SPF 50 Daily Moisturiser', brand:'ShopWow', price:31.99, oldPrice:null,  cat:'skincare', badge:'new',  rating:4.8, reviews:670,  shades:[],                              img:'assets/images/vitaminc.webp', emoji:'☀️', isNew:true, stock:24},
  {id:'p13', name:'Satin Lip Gloss Set',       brand:'ShopWow', price:27.99, oldPrice:null,  cat:'lip',      badge:'new',  rating:4.5, reviews:154,  shades:['#f0c0a0','#d09060','#a06030'], img:'assets/images/lipstick2.webp', emoji:'💄', isNew:true, stock:19},

];

const SALE = [
  {name:'Rose Hip Oil Serum', cat:'skincare', now:16.99, was:28.99, disc:'42%', img:'assets/images/vitaminc.webp'},
  {name:'Matte Lipstick',     cat:'makeup',   now:12.99, was:24.99, disc:'48%', img:'assets/images/lipstick.webp'},
  {name:'Eye Cream Pro',      cat:'eye',      now:22.99, was:39.99, disc:'43%', img:'assets/images/eyeshadow2.webp'},
  {name:'Glow Foundation',    cat:'makeup',   now:18.99, was:32.99, disc:'42%', img:'assets/images/foundation.webp'},
  {name:'Night Repair Cream', cat:'skincare', now:19.99, was:34.99, disc:'43%', img:'assets/images/highlighter.webp'},
  {name:'Volumising Mascara', cat:'makeup',   now:10.99, was:18.99, disc:'42%', img:'assets/images/allmakeup.webp'},
];

let cart        = [];
let wishlist    = [];
let curFilter   = 'all';
let visible     = 8;
let currentUser = null;
let authTab     = 'login';
const PAGE          = 4;
const AUTH_STORAGE  = 'shopwow_auth';
const CART_STORAGE  = 'shopwow_cart';


function initHamburger() {
  const hdr = document.querySelector('.hdr');
  const nav = document.querySelector('.nav');
  if (!hdr || !nav) return;

  const ham = document.createElement('button');
  ham.className = 'ham-btn';
  ham.setAttribute('aria-label', 'Toggle navigation');
  ham.setAttribute('aria-expanded', 'false');
  ham.innerHTML = `
    <span class="ham-line"></span>
    <span class="ham-line"></span>
    <span class="ham-line"></span>
  `;
  hdr.insertBefore(ham, hdr.querySelector('.hdr-right'));

  const overlay = document.createElement('div');
  overlay.className = 'mobile-nav-overlay';
  document.body.appendChild(overlay);

  function toggleMenu(open) {
    const isOpen = open !== undefined ? open : !nav.classList.contains('nav-open');
    nav.classList.toggle('nav-open', isOpen);
    ham.classList.toggle('active', isOpen);
    ham.setAttribute('aria-expanded', String(isOpen));
    overlay.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  ham.addEventListener('click', () => toggleMenu());
  overlay.addEventListener('click', () => toggleMenu(false));

  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => toggleMenu(false));
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') toggleMenu(false);
  });
}


const SEARCH_RECENT_KEY = 'shopwow_recent_searches';
const SEARCH_MAX_RECENT = 6;
const SEARCH_DROPDOWN_MAX = 6;

let _srchQuery      = '';
let _srchKbdIdx     = -1;
let _srchItems      = [];   
let _srchMobOpen    = false;
let _srchDesktopOpen = false;


function srchGetRecent() {
  try { return JSON.parse(localStorage.getItem(SEARCH_RECENT_KEY) || '[]'); } catch { return []; }
}
function srchSaveRecent(q) {
  if (!q.trim()) return;
  let r = srchGetRecent().filter(x => x.toLowerCase() !== q.toLowerCase());
  r.unshift(q.trim());
  r = r.slice(0, SEARCH_MAX_RECENT);
  localStorage.setItem(SEARCH_RECENT_KEY, JSON.stringify(r));
}
function srchRemoveRecent(q) {
  const r = srchGetRecent().filter(x => x !== q);
  localStorage.setItem(SEARCH_RECENT_KEY, JSON.stringify(r));
}
function srchClearRecent() {
  localStorage.removeItem(SEARCH_RECENT_KEY);
}


function srchHighlight(text, q) {
  if (!q) return text;
  const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(re, '<mark>$1</mark>');
}


function srchScore(p, q) {
  const ql = q.toLowerCase();
  const nl = p.name.toLowerCase();
  const cl = p.cat.toLowerCase();
  const bl = p.brand.toLowerCase();
  if (nl.startsWith(ql))  return 100;
  if (nl.includes(ql))    return 80;
  if (cl.includes(ql))    return 60;
  if (bl.includes(ql))    return 40;
  return 0;
}


function srchBuildDropdown(q, dropEl) {
  _srchKbdIdx = -1;
  _srchItems  = [];

  if (!q.trim()) {

    const recents = srchGetRecent();
    if (!recents.length) { dropEl.innerHTML = ''; return false; }

    let html = `<div class="srch-section-hd">
      <span>Recent Searches</span>
      <button onclick="srchClearAllRecent()">Clear all</button>
    </div><div class="srch-recent-pills">`;
    recents.forEach(r => {
      html += `<span class="srch-recent-pill" onclick="srchPickRecent('${r.replace(/'/g,"\\'")}')">
        <i class="fa-solid fa-clock-rotate-left"></i>${r}
        <button class="srch-pill-rm" onclick="event.stopPropagation();srchRemoveRecentUI('${r.replace(/'/g,"\\'")}')">✕</button>
      </span>`;
    });
    html += '</div>';
    dropEl.innerHTML = html;
    return true;
  }

  const matches = PRODUCTS
    .map(p => ({ p, score: srchScore(p, q) }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, SEARCH_DROPDOWN_MAX)
    .map(x => x.p);

  if (!matches.length) {
    dropEl.innerHTML = `
      <div class="srch-empty">
        <i class="fa-solid fa-magnifying-glass"></i>
        No products found for <strong>"${q}"</strong><br>
        <span style="font-size:12px;margin-top:4px;display:block">Try skincare, serum, lip, eye…</span>
      </div>`;
    return true;
  }

  let html = `<div class="srch-section-hd"><span>Products (${matches.length}${PRODUCTS.filter(p=>srchScore(p,q)>0).length > SEARCH_DROPDOWN_MAX ? '+' : ''})</span></div>`;
  matches.forEach((p, i) => {
    const stars = '★'.repeat(Math.round(p.rating));
    html += `<div class="srch-item" role="option" tabindex="-1" data-srch-idx="${i}" onclick="srchPickProduct('${p.id}')">
      <div class="srch-item-thumb">
        <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.style.display='none'">
      </div>
      <div class="srch-item-text">
        <div class="srch-item-name">${srchHighlight(p.name, q)}</div>
        <div class="srch-item-meta">
          <span class="srch-item-cat">${p.cat}</span>
          <span class="srch-item-price">$${p.price.toFixed(2)}</span>
          <span style="color:var(--c3);font-size:10px">${stars}</span>
        </div>
      </div>
    </div>`;
    _srchItems.push({ type: 'product', id: p.id });
  });

  const totalMatches = PRODUCTS.filter(p => srchScore(p, q) > 0).length;
  if (totalMatches > SEARCH_DROPDOWN_MAX) {
    html += `<div class="srch-see-all" onclick="srchSeeAll('${q.replace(/'/g,"\\'")}')">
      <i class="fa-solid fa-arrow-right"></i> See all ${totalMatches} results for "${q}"
    </div>`;
  }

  dropEl.innerHTML = html;
  return true;
}

function srchOpenDesktop() {
  const wrap = document.getElementById('srch-wrap');
  const drop = document.getElementById('srch-dropdown');
  if (!wrap || !drop) return;

  const rect = wrap.getBoundingClientRect();
  drop.style.top    = (rect.bottom + 8) + 'px';
  drop.style.left   = rect.left + 'px';
  drop.style.width  = Math.max(rect.width, 320) + 'px';

  const hasContent = srchBuildDropdown(_srchQuery, drop);
  if (!hasContent) { srchCloseDesktop(); return; }

  drop.classList.add('open');
  _srchDesktopOpen = true;

  const input = document.getElementById('srch-in');
  if (input) input.setAttribute('aria-expanded', 'true');
}
function srchCloseDesktop() {
  const drop  = document.getElementById('srch-dropdown');
  const input = document.getElementById('srch-in');
  if (drop)  { drop.classList.remove('open'); drop.innerHTML = ''; }
  if (input) input.setAttribute('aria-expanded', 'false');
  _srchDesktopOpen = false;
  _srchKbdIdx = -1;
}

function srchOpenMobile() {
  const bar   = document.getElementById('srch-fullbar');
  const scrim = document.getElementById('srch-scrim');
  const input = document.getElementById('srch-fullbar-input');
  if (!bar) return;
  bar.classList.add('open');
  scrim && scrim.classList.add('open');
  _srchMobOpen = true;
  document.body.style.overflow = 'hidden';
  setTimeout(() => { if (input) { input.focus(); srchMobRender(); } }, 80);

  document.getElementById('srch-mob-btn')?.classList.add('active');
}
function srchCloseMobile() {
  const bar   = document.getElementById('srch-fullbar');
  const drop  = document.getElementById('srch-dropdown-mobile');
  const scrim = document.getElementById('srch-scrim');
  if (bar)   bar.classList.remove('open');
  if (drop)  { drop.classList.remove('open'); drop.innerHTML = ''; }
  if (scrim) scrim.classList.remove('open');
  _srchMobOpen = false;
  document.body.style.overflow = '';
  document.getElementById('srch-mob-btn')?.classList.remove('active');

  const input = document.getElementById('srch-fullbar-input');
  const clear = document.getElementById('srch-fullbar-clear');
  if (input) input.value = '';
  if (clear) clear.classList.remove('visible');
}
function srchMobRender() {
  const drop  = document.getElementById('srch-dropdown-mobile');
  const input = document.getElementById('srch-fullbar-input');
  if (!drop || !input) return;
  const q = input.value.trim();
  const hasContent = srchBuildDropdown(q, drop);
  if (hasContent) drop.classList.add('open');
  else { drop.classList.remove('open'); drop.innerHTML = ''; }
}

function srchKbdMove(dir) {
  const container = _srchMobOpen
    ? document.getElementById('srch-dropdown-mobile')
    : document.getElementById('srch-dropdown');
  if (!container) return;
  const rows = [...container.querySelectorAll('.srch-item')];
  if (!rows.length) return;
  rows.forEach(r => r.classList.remove('kbd-focus'));
  _srchKbdIdx = Math.max(0, Math.min(rows.length - 1, _srchKbdIdx + dir));
  rows[_srchKbdIdx].classList.add('kbd-focus');
  rows[_srchKbdIdx].scrollIntoView({ block: 'nearest' });
}
function srchKbdEnter() {
  const container = _srchMobOpen
    ? document.getElementById('srch-dropdown-mobile')
    : document.getElementById('srch-dropdown');
  if (!container) return;
  const focused = container.querySelector('.srch-item.kbd-focus');
  if (focused) { focused.click(); return; }

  const q = _srchMobOpen
    ? (document.getElementById('srch-fullbar-input')?.value || '')
    : (document.getElementById('srch-in')?.value || '');
  if (q.trim()) srchSeeAll(q.trim());
}

function srchPickProduct(id) {
  const q = _srchMobOpen
    ? (document.getElementById('srch-fullbar-input')?.value || '')
    : (document.getElementById('srch-in')?.value || '');
  srchSaveRecent(q.trim() || PRODUCTS.find(p => p.id === id)?.name || '');
  srchCloseDesktop();
  srchCloseMobile();
  openProductDetail(id);
}

function srchSeeAll(q) {
  srchSaveRecent(q);
  srchCloseDesktop();
  srchCloseMobile();

  const inp = document.getElementById('srch-in');
  if (inp) inp.value = q;
  liveSearch(q);
  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  showToast(`🔍 Showing results for "${q}"`);
}

function srchPickRecent(q) {
  if (_srchMobOpen) {
    const input = document.getElementById('srch-fullbar-input');
    const clear = document.getElementById('srch-fullbar-clear');
    if (input) { input.value = q; input.focus(); }
    if (clear) clear.classList.toggle('visible', !!q);
    srchMobRender();
  } else {
    const input = document.getElementById('srch-in');
    if (input) { input.value = q; input.focus(); }
    _srchQuery = q;
    srchOpenDesktop();
  }
  liveSearch(q);
}

function srchRemoveRecentUI(q) {
  srchRemoveRecent(q);

  if (_srchMobOpen) srchMobRender();
  else srchOpenDesktop();
}

function srchClearAllRecent() {
  srchClearRecent();
  if (_srchMobOpen) srchMobRender();
  else srchOpenDesktop();
}

function initSearch() {
  const wrap  = document.getElementById('srch-wrap');
  const input = document.getElementById('srch-in');
  const clear = document.getElementById('srch-clear');
  const drop  = document.getElementById('srch-dropdown');
  if (!input) return;

  input.addEventListener('input', () => {
    _srchQuery = input.value;
    clear.classList.toggle('visible', !!input.value);
    liveSearch(input.value);
    if (_srchDesktopOpen || document.activeElement === input) srchOpenDesktop();
  });

  input.addEventListener('focus', () => srchOpenDesktop());

  input.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown')  { e.preventDefault(); srchKbdMove(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); srchKbdMove(-1); }
    else if (e.key === 'Enter')   { e.preventDefault(); srchKbdEnter(); }
    else if (e.key === 'Escape')  { srchCloseDesktop(); input.blur(); }
  });

  clear.addEventListener('click', () => {
    input.value  = '';
    _srchQuery   = '';
    clear.classList.remove('visible');
    liveSearch('');
    input.focus();
    srchOpenDesktop();
  });

  document.addEventListener('mousedown', e => {
    if (!wrap.contains(e.target) && !drop.contains(e.target)) srchCloseDesktop();
  }, { passive: true });

  window.addEventListener('resize', () => { if (_srchDesktopOpen) srchOpenDesktop(); }, { passive: true });

  const mobBtn = document.getElementById('srch-mob-btn');
  if (mobBtn) mobBtn.addEventListener('click', () => {
    _srchMobOpen ? srchCloseMobile() : srchOpenMobile();
  });

  document.getElementById('srch-scrim')?.addEventListener('click', srchCloseMobile);

  document.getElementById('srch-fullbar-cancel')?.addEventListener('click', srchCloseMobile);

  
  const fbInput = document.getElementById('srch-fullbar-input');
  const fbClear = document.getElementById('srch-fullbar-clear');
  if (fbInput) {
    fbInput.addEventListener('input', () => {
      const q = fbInput.value;
      if (fbClear) fbClear.classList.toggle('visible', !!q);
      liveSearch(q);
      srchMobRender();
    });
    fbInput.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown')  { e.preventDefault(); srchKbdMove(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); srchKbdMove(-1); }
      else if (e.key === 'Enter')   { e.preventDefault(); srchKbdEnter(); }
      else if (e.key === 'Escape')  { srchCloseMobile(); }
    });
  }
  if (fbClear) {
    fbClear.addEventListener('click', () => {
      if (fbInput) { fbInput.value = ''; fbInput.focus(); }
      fbClear.classList.remove('visible');
      liveSearch('');
      srchMobRender();
    });
  }
}


function initScrollTop() {
  const btn = document.createElement('button');
  btn.className = 'scroll-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


function initHeaderScroll() {
  const hdr = document.querySelector('.hdr');
  if (!hdr) return;
  window.addEventListener('scroll', () => {
    hdr.classList.toggle('hdr-scrolled', window.scrollY > 60);
  }, { passive: true });
}


function initKeyboardNav() {
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (_srchMobOpen)   { srchCloseMobile(); return; }
    if (_srchDesktopOpen) { srchCloseDesktop(); return; }
    if (_pdCurrentId)   { closePdPanel(); return; }
    const cdraw = document.getElementById('cdraw');
    if (cdraw && cdraw.classList.contains('open')) { closeCart(); return; }
    const sov = document.getElementById('sov');
    if (sov && sov.classList.contains('open')) { closeSale(); return; }
  });
}


function initTrendingTags() {
  document.querySelectorAll('.ttag').forEach(tag => {
    tag.style.cursor = 'pointer';
    tag.addEventListener('click', () => {
      srchSeeAll(tag.textContent.trim());
    });
  });
}


function getFiltered(f) {
  if (f === 'all')  return PRODUCTS;
  if (f === 'sale') return PRODUCTS.filter(p => p.badge === 'sale');
  return PRODUCTS.filter(p => p.cat === f);
}

function sorted(arr, s) {
  const a = [...arr];
  if (s === 'price-asc')  a.sort((x,y) => x.price - y.price);
  if (s === 'price-desc') a.sort((x,y) => y.price - x.price);
  if (s === 'rating')     a.sort((x,y) => y.rating - x.rating);
  if (s === 'newest')     a.sort((x,y) => y.isNew - x.isNew);
  return a;
}

function card(p) {
  const inW    = wishlist.includes(p.id);
  const soldOut = p.stock <= 0;
  const st  = '★'.repeat(Math.round(p.rating)) + '☆'.repeat(5 - Math.round(p.rating));
  const sh  = p.shades.length
    ? `<div class="cshades">${p.shades.slice(0,4).map(s=>`<div class="sdot" style="background:${s}" title="${s}"></div>`).join('')}${p.shades.length>4?`<span class="smore">+${p.shades.length-4}</span>`:''}</div>`
    : '<div style="height:22px;margin-bottom:9px"></div>';
  const bl  = p.badge
    ? `<span class="cbadge-card b-${p.badge==='sale'?'sale':p.badge==='new'?'new':'best'}">${p.badge==='sale'?'Sale':p.badge==='new'?'New':'⭐ Best'}</span>` : '';
  return `<div class="pcard" data-id="${p.id}" onclick="openProductDetail('${p.id}')">
    <div class="cimgw">
      <img src="${p.img}" alt="${p.name}" loading="lazy"
           onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
      <div class="img-fb">${p.emoji}</div>
      ${bl}
      <button class="cwish${inW?' active':''}" onclick="toggleWish('${p.id}',this,event)" aria-label="Wishlist">
        <i class="fa-${inW?'solid':'regular'} fa-heart"></i>
      </button>
      <div class="cquick" onclick="event.stopPropagation();addCart('${p.id}')">⚡ Quick Add to Bag</div>
      ${soldOut ? '<div class="sold-out">Sold Out</div>' : ''}
    </div>
    <div class="cbody">
      <div class="cbrand">${p.brand}</div>
      <div class="cname">${p.name}</div>
      ${sh}
      <div class="cstars"><span class="stars">${st}</span><span class="rct">(${p.reviews.toLocaleString()})</span></div>
      <div class="cfooter">
        <div class="cprice">$${p.price.toFixed(2)}${p.oldPrice?` <del>$${p.oldPrice.toFixed(2)}</del>`:''}</div>
        <button class="atc" onclick="event.stopPropagation();addCart('${p.id}')" ${soldOut ? 'disabled' : ''}>${soldOut ? 'Sold Out' : '+ Add'}</button>
      </div>
    </div>
  </div>`;
}

function renderProds(f='all', s='', reset=true) {
  if (reset) { curFilter = f; visible = 8; }
  const items  = sorted(getFiltered(f), s);
  const g      = document.getElementById('pgrid');
  const w      = document.getElementById('vmwrap');
  const shown  = items.slice(0, visible);
  if (!g) return; 
  g.innerHTML  = shown.length
    ? shown.map(card).join('')
    : '<p style="color:var(--text-muted);grid-column:1/-1;text-align:center;padding:48px">No products found.</p>';
  const rem    = items.length - visible;
  if (w) {
    if (rem > 0) { w.style.display = 'block'; const vmc = document.getElementById('vmcount'); if (vmc) vmc.textContent = `+${rem} more`; }
    else          { w.style.display = 'none'; }
  }
}

function loadMore() {
  const btn = document.getElementById('vmbtn');
  if (btn) {
    btn.classList.add('loading');
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Loading…';
  }
  setTimeout(() => {
    visible += PAGE;
    renderProds(curFilter, document.getElementById('ssort').value, false);
    if (btn) {
      btn.classList.remove('loading');
      btn.innerHTML = `<i class="fa-solid fa-chevron-down"></i> View More Products <span class="vm-count" id="vmcount"></span>`;
    }
    const rem = sorted(getFiltered(curFilter), (document.getElementById('ssort') || {}).value).length - visible;
    const vc  = document.getElementById('vmcount');
    if (vc) vc.textContent = rem > 0 ? `+${rem} more` : '';
  }, 700);
}

function filterProducts(f, el) {
  curFilter = f;
  document.querySelectorAll('.fpill').forEach(p => p.classList.remove('active'));
  if (el) el.classList.add('active');
  renderProds(f, document.getElementById('ssort').value);
}

function sortProducts(v) { renderProds(curFilter, v); }

function filterAndScroll(f) {
  filterProducts(f);
  document.querySelectorAll('.fpill').forEach(p => {
    p.classList.toggle('active', p.textContent.trim().toLowerCase().replace(/\s/g,'').startsWith(f.substring(0,3)));
  });
  document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

function setStrip(el) {
  document.querySelectorAll('.cstrip a').forEach(a => a.classList.remove('active'));
  el.classList.add('active');
}

function liveSearch(q) {
  const pgrid = document.getElementById('pgrid');
  if (!pgrid) return;
  if (!q || !q.trim()) {
    renderProds(curFilter);
    return;
  }
  const ql = q.toLowerCase();
  const m = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(ql)  ||
    p.cat.toLowerCase().includes(ql)   ||
    p.brand.toLowerCase().includes(ql)
  );
  const vmwrap = document.getElementById('vmwrap');
  if (vmwrap) vmwrap.style.display = 'none';
  pgrid.innerHTML = m.length
    ? m.map(card).join('')
    : `<p style="color:var(--text-muted);grid-column:1/-1;text-align:center;padding:48px 20px">
         <i class="fa-solid fa-magnifying-glass" style="font-size:28px;display:block;margin-bottom:12px;color:var(--c4)"></i>
         No products match <strong>"${q}"</strong>
       </p>`;
}


function saveCart() {
  try {
    localStorage.setItem(CART_STORAGE, JSON.stringify(cart));
  } catch (e) {
  }
}

function loadCart() {
  try {
    const saved = localStorage.getItem(CART_STORAGE);
    if (saved) cart = JSON.parse(saved);
  } catch (e) {
    cart = [];
  }
  updateCartUI();
}

function addCart(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const ex = cart.find(x => x.id === id);
  if (ex) {
    if (p.stock && ex.qty + 1 > p.stock) {
      showToast('Not enough stock available for this item.');
      return;
    }
    ex.qty++;
  } else {
    if (p.stock && p.stock < 1) {
      showToast('This item is sold out.');
      return;
    }
    cart.push({...p, qty: 1});
  }
  updateCartUI();
  saveCart();
  showToast(`🛍 ${p.name} added to your bag!`);
  const btn = document.getElementById('cart-ibtn');
  if (btn) {
    btn.style.transform = 'scale(1.3)';
    setTimeout(() => btn.style.transform = '', 220);
  }
}

function removeCart(id)  { cart = cart.filter(x => x.id !== id); updateCartUI(); renderCartItems(); saveCart(); }

function chgQty(id, d) {
  const i = cart.find(x => x.id === id); if (!i) return;
  i.qty += d;
  if (i.qty < 1) { removeCart(id); return; }
  updateCartUI(); renderCartItems(); saveCart();
}

function updateCartUI() {
  const tot = cart.reduce((s,i) => s + i.price * i.qty, 0);
  const cnt = cart.reduce((s,i) => s + i.qty, 0);
  const cc = document.getElementById('cart-count'); if (cc) cc.textContent = cnt;
  const ctot = document.getElementById('ctotal'); if (ctot) ctot.textContent = '$' + tot.toFixed(2);
  const cl = document.getElementById('clbl'); if (cl) cl.textContent = cnt ? `(${cnt} item${cnt>1?'s':''})` : '';
}

function renderCartItems() {
  const el = document.getElementById('citems');
  if (!cart.length) {
    el.innerHTML = '<div class="cempty"><i class="fa-solid fa-bag-shopping"></i><p>Your bag is empty</p><p style="font-size:12px;margin-top:6px">Add some products to get started!</p></div>';
    return;
  }
  el.innerHTML = cart.map(i => `<div class="citem">
    <div class="ciimg"><img src="${i.img}" alt="${i.name}" onerror="this.style.display='none'"></div>
    <div class="cinfo">
      <div class="cinm">${i.name}</div>
      <div class="cipr">$${(i.price * i.qty).toFixed(2)}</div>
      <div class="ciqty">
        <button onclick="chgQty('${i.id}',-1)">−</button>
        <span>${i.qty}</span>
        <button onclick="chgQty('${i.id}',1)">+</button>
        <span class="cirm" onclick="removeCart('${i.id}')">Remove</span>
      </div>
    </div>
  </div>`).join('');
}

function openCart()  { document.getElementById('cov').classList.add('open'); document.getElementById('cdraw').classList.add('open'); renderCartItems(); }
function closeCart() { document.getElementById('cov').classList.remove('open'); document.getElementById('cdraw').classList.remove('open'); }


function checkoutOrder() {
  if (!cart.length) {
    showToast('Your bag is empty.');
    return;
  }

  const name    = document.getElementById('pay-name')?.value.trim();
  const address = document.getElementById('pay-address')?.value.trim();

  if (!name || !address) {
    showToast('Please enter your name and shipping address.');
    return;
  }

  const orders = JSON.parse(localStorage.getItem('shopwow_orders') || '[]');
  orders.push({
    id: Date.now(),
    items: cart.map(i => ({ id: i.id, name: i.name, qty: i.qty, price: i.price })),
    total: cart.reduce((s,i) => s + i.price * i.qty, 0),
    name,
    address,
    createdAt: new Date().toISOString()
  });
  localStorage.setItem('shopwow_orders', JSON.stringify(orders));

  
  cart = [];
  updateCartUI();
  saveCart();
  closeCart();

  document.getElementById('main-content').style.display = 'none';
  const sp = document.getElementById('success-page');
  sp.style.display = 'flex';
}


function toggleWish(id, btn, e) {
  e.stopPropagation();
  const idx = wishlist.indexOf(id);
  if (idx === -1) {
    wishlist.push(id);
    btn.classList.add('active');
    btn.innerHTML = '<i class="fa-solid fa-heart"></i>';
    showToast('💚 Added to wishlist!');
  } else {
    wishlist.splice(idx,1);
    btn.classList.remove('active');
    btn.innerHTML = '<i class="fa-regular fa-heart"></i>';
    showToast('Removed from wishlist');
  }
  const wb = document.getElementById('wbadge');
  wb.textContent = wishlist.length;
  wb.classList.toggle('show', wishlist.length > 0);
}

function openWishlist() {
  showToast(wishlist.length
    ? `💚 You have ${wishlist.length} item${wishlist.length>1?'s':''} saved`
    : '💚 Your wishlist is empty — add some products!');
}


function renderSale(cat = 'all') {
  const items = cat === 'all' ? SALE : SALE.filter(i => i.cat === cat);
  const spg = document.getElementById('spgrid');
  if (!spg) return;
  spg.innerHTML = items.map(i => `<div class="scard" onclick="showToast('🛍 ${i.name} added!')">
    <div class="scard-img"><img src="${i.img}" alt="${i.name}" loading="lazy" onerror="this.style.display='none'"></div>
    <div class="scard-b">
      <h3>${i.name}</h3>
      <div class="sprs"><span class="snow">$${i.now}</span><span class="swas">$${i.was}</span><span class="sdisc">-${i.disc}</span></div>
    </div>
  </div>`).join('');
}

function filterSale(cat, el) {
  document.querySelectorAll('.stab').forEach(t => t.classList.remove('active'));
  if (el) el.classList.add('active');
  renderSale(cat);
}

function openSale()  { renderSale(); document.getElementById('sov').classList.add('open'); }
function closeSale() { document.getElementById('sov').classList.remove('open'); }



let _toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  const tmsg = document.getElementById('tmsg');
  if (!t || !tmsg) {
    console.warn('Toast element missing:', msg);
    return;
  }
  tmsg.textContent = msg;
  t.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
}


function loadAuth() {
  try {
    const saved = localStorage.getItem(AUTH_STORAGE);
    if (!saved) return;
    const data = JSON.parse(saved);
    if (data?.user) {
      currentUser = data.user;
      updateAccountUI();
    }
  } catch (e) {
    localStorage.removeItem(AUTH_STORAGE);
  }
}

function saveAuth(user) {
  currentUser = user;
  localStorage.setItem(AUTH_STORAGE, JSON.stringify({ user }));
  updateAccountUI();
}

function clearAuth() {
  currentUser = null;
  localStorage.removeItem(AUTH_STORAGE);
  updateAccountUI();
}

function updateAccountUI() {
  const tip = document.getElementById('account-tip');
  const btn = document.getElementById('account-btn');
  if (currentUser) {
    if (tip) tip.textContent = currentUser.email;
    btn.classList.add('active');
  } else {
    if (tip) tip.textContent = 'Account';
    btn.classList.remove('active');
  }
}

function openAuth() {
  document.getElementById('auth-ov').classList.add('active');
  const modal = document.getElementById('auth-modal');
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  modal.inert = false;
  if (currentUser) {
    displayAccountPanel();
  } else {
    document.getElementById('auth-form').style.display = 'block';
    document.getElementById('auth-info').style.display = 'none';
    setAuthTab('login');
  }
}

function closeAuth() {
  document.getElementById('auth-ov').classList.remove('active');
  const modal = document.getElementById('auth-modal');
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  modal.inert = true;
  showAuthMessage('');
}

function setAuthTab(type) {
  authTab = type;
  const loginTab    = document.getElementById('login-tab');
  const registerTab = document.getElementById('register-tab');
  const nameRow     = document.querySelector('.auth-name-row');
  if (loginTab && registerTab) {
    loginTab.classList.toggle('active', type === 'login');
    registerTab.classList.toggle('active', type === 'register');
  }
  if (nameRow) nameRow.style.display = type === 'register' ? 'block' : 'none';
  const sub = document.getElementById('auth-submit');
  if (sub) sub.textContent = type === 'login' ? 'Sign In' : 'Create Account';
  showAuthMessage('');
}

function showAuthMessage(message, isError = false) {
  const msg = document.getElementById('auth-msg');
  if (!msg) return;
  msg.textContent = message;
  msg.style.color = isError ? '#c2185b' : '#1f7a3e';
}

function authSubmit() {
  const email    = document.getElementById('auth-email')?.value.trim();
  const password = document.getElementById('auth-password')?.value.trim();

  if (!email || !password) {
    showAuthMessage('Email and password are required.', true);
    return;
  }
  if (!email.includes('@')) {
    showAuthMessage('Please enter a valid email address.', true);
    return;
  }
  if (password.length < 6) {
    showAuthMessage('Password must be at least 6 characters.', true);
    return;
  }

  // NOTE: This is a frontend-only demo. No password is stored, hashed, or
  // validated against any account record — this is a UI flow demonstration only.

  if (authTab === 'register') {
    const name = document.getElementById('auth-name')?.value.trim();
    if (!name) { showAuthMessage('Please provide your full name.', true); return; }

    saveAuth({ email, name });
    showToast('Welcome! Your account has been created.');
    closeAuth();
    return;
  }

  saveAuth({ email, name: email.split('@')[0] });
  showToast('Signed in successfully.');
  closeAuth();
}

function displayAccountPanel() {
  const af = document.getElementById('auth-form'); if (af) af.style.display = 'none';
  const ai = document.getElementById('auth-info'); if (ai) ai.style.display = 'block';
  const aemail = document.getElementById('auth-user-email'); if (aemail) aemail.textContent = currentUser?.email || '';
  showAuthMessage('');


  const list   = document.getElementById('auth-orders');
  if (!list) return;
  const orders = JSON.parse(localStorage.getItem('shopwow_orders') || '[]');
  list.innerHTML = '<h4>Recent orders</h4>' + (orders.length
    ? orders.slice().reverse().map(o =>
        `<div class="auth-order">
          <strong>Order #${o.id}</strong>
          <p>${o.items.length} item(s) · $${o.total.toFixed(2)}</p>
          <p>${new Date(o.createdAt).toLocaleString()}</p>
        </div>`).join('')
    : '<p style="font-size:13px;color:var(--text-muted)">No orders yet.</p>');
}

function logoutUser() {
  clearAuth();
  closeAuth();
  showToast('Signed out successfully.');
}


function subscribe(id = 'nl-in') {
  const el = document.getElementById(id);
  if (!el || !el.value.trim().includes('@')) { showToast('⚠️ Please enter a valid email'); return; }
  el.value = '';
  const fb = document.getElementById('nlfb');
  if (fb) fb.textContent = "✓ You're subscribed! A welcome gift is on its way.";
  showToast('🎉 Subscribed! Check your inbox.');
}


function startCd(secs, ...ids) {
  function tick() {
    if (secs < 0) secs = 8 * 3600;
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    [h, m, s].forEach((v, i) => {
      const el = document.getElementById(ids[i]);
      if (el) el.textContent = String(v).padStart(2, '0');
    });
    secs--;
  }
  tick();
  setInterval(tick, 1000);
}


document.addEventListener('DOMContentLoaded', () => {

  
  const urlParams = new URLSearchParams(window.location.search);
  const status    = urlParams.get('status');
  if (status === 'success') {
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('success-page').style.display = 'flex';
    return;
  } else if (status === 'cancel') {
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('cancel-page').style.display = 'flex';
    return;
  }

  
  document.getElementById('sov').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeSale();
  });

  
  document.getElementById('pdov').addEventListener('click', closePdPanel);

  
  setTimeout(() => {
    document.getElementById('skel-grid').style.display = 'none';
    document.getElementById('pgrid').style.display     = 'grid';
    renderProds('all', '', true);
  }, 300);

  
  const S0 = 8 * 3600 + 24 * 60;
  startCd(S0, 'fh', 'fm', 'fs');
  startCd(S0, 'sfh', 'sfm', 'sfs');

  loadAuth();
  loadCart();

  
  initHamburger();
  initSearch();
  initScrollTop();
  initHeaderScroll();
  initKeyboardNav();
  initTrendingTags();
});


const PRODUCT_DESCRIPTIONS = {
  p1:  'Elevate your daily ritual with this luxurious skincare set. Packed with hyaluronic acid and botanical extracts, it deeply hydrates, plumps, and restores your skin\'s natural radiance. Ideal for all skin types, including sensitive.',
  p2:  'This lightweight hydrating serum penetrates deep into the dermis to lock in moisture all day long. Formulated with 5 forms of hyaluronic acid and vitamin B5, it leaves skin soft, dewy, and visibly plump.',
  p3:  'A complete lip care ritual in one kit. Includes an exfoliating sugar scrub, a nourishing overnight mask, and three stunning tinted balms. Say goodbye to dry, chapped lips forever.',
  p4:  'Combat dark circles, puffiness, and fine lines with this powerful eye cream. Enriched with retinol, caffeine, and peptides to visibly firm and brighten the delicate under-eye area.',
  p5:  'Everything you need for a flawless, professional-finish look. This curated bundle includes foundation, concealer, setting powder, and a blending sponge — all dermatologist-tested and suitable for all skin tones.',
  p6:  'A velvety, long-wearing matte formula that glides on effortlessly and delivers rich, saturated colour with zero feathering. Lasts up to 16 hours without touch-ups.',
  p7:  'Achieve a blinding, lit-from-within glow with this cult-favourite duo. One shade is a golden champagne; the other a cool rose. Buildable formula for a subtle sheen or full-on radiance.',
  p8:  'Harness the brightening power of stable Vitamin C (15%) combined with ferulic acid and niacinamide. This serum fades dark spots, evens skin tone and visibly reduces dullness within 4 weeks.',
  p9:  'A dreamy blush palette with three perfectly curated shades — from sheer petal pink to a deep berry. Silky, finely-milled powder blends seamlessly for a natural, healthy flush.',
  p10: 'Precision-crafted liners in three essential shades. Waterproof, smudge-proof, and intensely pigmented for a sharp wing or a dramatic smoky look that lasts all day.',
  p11: 'Wake up to transformed skin. This rich overnight cream harnesses the power of retinol, ceramides, and peptides to repair, renew and deeply nourish while you sleep.',
  p12: 'Your daily UV shield that doubles as a moisturiser. Broad-spectrum SPF 50 protection in an ultra-light, non-greasy formula that leaves zero white cast — perfect under makeup.',
  p13: 'Achieve seriously dramatic lashes with this volumising mascara. The hourglass wand lifts, separates and adds intense volume from root to tip. Buildable and transfer-resistant.',
  p14: 'Hydration meets a hint of colour. These tinted lip balms feel weightless on lips, delivering 24-hour moisture with a subtle wash of your favourite shade.',
  p15: 'The gold standard of anti-ageing serums. Encapsulated retinol is slowly released to minimise irritation while maximising results — smoother texture, smaller pores, firmer skin.',
  p16: 'The ultimate gift for any beauty lover. This luxurious set includes six full-size bestsellers beautifully presented in a keepsake box — perfect for gifting or treating yourself.',
};


const PRODUCT_EXTRA_IMGS = {
  p1:  ['assets/images/cream.webp','assets/images/products.webp'],
  p2:  ['assets/images/syrum.webp','assets/images/syrum2.webp'],
  p3:  ['assets/images/lipstick.webp','assets/images/lipstick2.webp'],
  p4:  ['assets/images/eyeshadow.webp','assets/images/eyeshadow2.webp'],
  p5:  ['assets/images/foundation.webp','assets/images/cream.webp'],
  p6:  ['assets/images/makeup2.webp','assets/images/makeup.webp'],
  p7:  ['assets/images/blush.webp','assets/images/brushes.webp'],
  p8:  ['assets/images/syrum.webp','assets/images/perfume.webp'],
  p9:  ['assets/images/products.webp','assets/images/allmakeup.webp'],
  p10: ['assets/images/vitaminc.webp','assets/images/highlighter.webp'],
  p11: ['assets/images/items.webp','assets/images/makeup2.webp'],
  p12: ['assets/images/foundation.webp','assets/images/syrum.webp'],
  p13: ['assets/images/makeup.webp','assets/images/makeup2.webp'],
};

let _pdCurrentId = null;

function openProductDetail(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  _pdCurrentId = id;

  const panel = document.getElementById('pdpanel');
  const ov    = document.getElementById('pdov');

  
  const mainImg = document.getElementById('pd-mainimg');
  const mainFb  = document.getElementById('pd-mainimg-fb');
  mainImg.src = p.img;
  mainImg.alt = p.name;
  mainImg.style.display = 'block';
  mainFb.style.display  = 'none';
  mainFb.textContent    = p.emoji;
  mainImg.onerror = function() {
    this.style.display = 'none';
    mainFb.style.display = 'flex';
  };

  
  const badge = document.getElementById('pd-badge');
  if (p.badge) {
    badge.textContent = p.badge === 'sale' ? 'Sale' : p.badge === 'new' ? 'New' : '⭐ Best';
    badge.className   = `pd-badge show b-${p.badge === 'best' ? 'best' : p.badge}`;
  } else {
    badge.className = 'pd-badge';
  }

  
  const extraImgs  = PRODUCT_EXTRA_IMGS[id] || [];
  const allImgs    = [p.img, ...extraImgs];
  const thumbsEl   = document.getElementById('pd-thumbs');
  thumbsEl.innerHTML = allImgs.map((src, i) => `
    <div class="pd-thumb${i === 0 ? ' active' : ''}" onclick="pdSwitchImg('${src}', this)" data-src="${src}">
      <img src="${src}" alt="${p.name} view ${i + 1}" loading="lazy"
           onerror="this.style.display='none';this.parentElement.querySelector('.pd-thumb-fb').style.display='flex'">
      <div class="pd-thumb-fb" style="display:none">${p.emoji}</div>
    </div>`).join('');

  
  document.getElementById('pd-brand').textContent = p.brand;
  document.getElementById('pd-name').textContent  = p.name;

  
  const st = '★'.repeat(Math.round(p.rating)) + '☆'.repeat(5 - Math.round(p.rating));
  document.getElementById('pd-stars').innerHTML =
    `<span class="stars">${st}</span><span style="color:var(--text-muted)">&nbsp;${p.rating} · ${p.reviews.toLocaleString()} reviews</span>`;

  
  const saveAmt = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  document.getElementById('pd-price').innerHTML =
    `$${p.price.toFixed(2)}` +
    (p.oldPrice ? ` <del>$${p.oldPrice.toFixed(2)}</del> <span class="pd-save">Save ${saveAmt}%</span>` : '');

  
  document.getElementById('pd-desc').textContent =
    PRODUCT_DESCRIPTIONS[id] || `Premium ${p.cat} product by ${p.brand}. Crafted with high-quality ingredients for exceptional results.`;

  
  const shadesWrap = document.getElementById('pd-shades-wrap');
  const shadesEl   = document.getElementById('pd-shades');
  if (p.shades && p.shades.length) {
    shadesWrap.style.display = 'block';
    shadesEl.innerHTML = p.shades.map((s, i) =>
      `<div class="pd-sdot${i === 0 ? ' active' : ''}" style="background:${s}" title="${s}"
            onclick="this.parentElement.querySelectorAll('.pd-sdot').forEach(d=>d.classList.remove('active'));this.classList.add('active')"></div>`
    ).join('');
  } else {
    shadesWrap.style.display = 'none';
  }

  
  const stockEl = document.getElementById('pd-stock');
  if (p.stock <= 0) {
    stockEl.textContent = 'Out of stock';
    stockEl.className = 'pd-stock low';
    stockEl.style.setProperty('--dot-bg','#ef4444');
  } else if (p.stock <= 5) {
    stockEl.textContent = `Only ${p.stock} left in stock!`;
    stockEl.className = 'pd-stock low';
  } else {
    stockEl.textContent = `In stock (${p.stock} available)`;
    stockEl.className = 'pd-stock';
  }

  
  const atcBtn = document.getElementById('pd-atc-btn');
  if (p.stock <= 0) {
    atcBtn.disabled = true;
    atcBtn.innerHTML = 'Sold Out';
  } else {
    atcBtn.disabled = false;
    atcBtn.innerHTML = '<i class="fa-solid fa-bag-shopping"></i> Add to Bag';
    atcBtn.onclick = () => { addCart(id); showToast(`🛍 ${p.name} added to your bag!`); };
  }

  
  const wishBtn = document.getElementById('pd-wish-btn');
  const inW     = wishlist.includes(id);
  wishBtn.className = 'pd-wish-btn' + (inW ? ' active' : '');
  wishBtn.innerHTML = `<i class="fa-${inW ? 'solid' : 'regular'} fa-heart"></i>`;
  wishBtn.onclick   = () => pdToggleWish(id);

  
  const recs = PRODUCTS
    .filter(x => x.id !== id && (x.cat === p.cat || x.badge === p.badge))
    .slice(0, 4);
  const recGrid = document.getElementById('pd-rec-grid');
  recGrid.innerHTML = recs.map(r => {
    const rst = '★'.repeat(Math.round(r.rating)) + '☆'.repeat(5 - Math.round(r.rating));
    return `<div class="pd-rec-card" onclick="openProductDetail('${r.id}')">
      <div class="pd-rec-img">
        <img src="${r.img}" alt="${r.name}" loading="lazy"
             onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <div class="pd-rec-img-fb">${r.emoji}</div>
      </div>
      <div class="pd-rec-body">
        <div class="pd-rec-brand">${r.brand}</div>
        <div class="pd-rec-name">${r.name}</div>
        <div class="pd-rec-foot">
          <div class="pd-rec-price">$${r.price.toFixed(2)}</div>
          <button class="pd-rec-atc" onclick="event.stopPropagation();addCart('${r.id}');showToast('🛍 ${r.name} added!')">+ Add</button>
        </div>
      </div>
    </div>`;
  }).join('');

  
  ov.classList.add('open');
  panel.classList.add('open');
  panel.setAttribute('aria-hidden', 'false');
  panel.inert = false;
  panel.scrollTop = 0;
  document.body.style.overflow = 'hidden';
}

function pdSwitchImg(src, thumbEl) {
  const mainImg = document.getElementById('pd-mainimg');
  const mainFb  = document.getElementById('pd-mainimg-fb');
  const p       = PRODUCTS.find(x => x.id === _pdCurrentId);

  
  mainImg.style.opacity = '0';
  setTimeout(() => {
    mainImg.src = src;
    mainImg.style.display = 'block';
    mainFb.style.display  = 'none';
    mainImg.onerror = function() {
      this.style.display = 'none';
      mainFb.style.display = 'flex';
      mainFb.textContent = p ? p.emoji : '✨';
    };
    mainImg.style.opacity = '1';
  }, 200);

  
  document.querySelectorAll('.pd-thumb').forEach(t => t.classList.remove('active'));
  if (thumbEl) thumbEl.classList.add('active');
}

function pdToggleWish(id) {
  const btn = document.getElementById('pd-wish-btn');
  const idx = wishlist.indexOf(id);
  if (idx === -1) {
    wishlist.push(id);
    btn.className = 'pd-wish-btn active';
    btn.innerHTML = '<i class="fa-solid fa-heart"></i>';
    showToast('💚 Added to wishlist!');
  } else {
    wishlist.splice(idx, 1);
    btn.className = 'pd-wish-btn';
    btn.innerHTML = '<i class="fa-regular fa-heart"></i>';
    showToast('Removed from wishlist');
  }
  const wb = document.getElementById('wbadge');
  if (wb) { wb.textContent = wishlist.length; wb.classList.toggle('show', wishlist.length > 0); }

  
  const gridBtn = document.querySelector(`.pcard[data-id="${id}"] .cwish`);
  if (gridBtn) {
    gridBtn.classList.toggle('active', wishlist.includes(id));
    gridBtn.innerHTML = wishlist.includes(id)
      ? '<i class="fa-solid fa-heart"></i>'
      : '<i class="fa-regular fa-heart"></i>';
  }
}

function closePdPanel() {
  const panel = document.getElementById('pdpanel');
  const ov    = document.getElementById('pdov');
  panel.classList.remove('open');
  ov.classList.remove('open');
  panel.setAttribute('aria-hidden', 'true');
  panel.inert = true;
  document.body.style.overflow = '';
  _pdCurrentId = null;
}
