/* Pa Sweet Bakery — storefront, AI Cake Studio, customer account and staff dashboard.
   Front-end build. Data is kept in this browser (localStorage) as a development store;
   see README.md + schema.sql for the production backend (PostgreSQL, multi-bakery tenancy). */
(function(){
'use strict';

/* ---------- Images (paths are swapped for inline data by the build) ---------- */
const IMG = {
  logo:'assets/logo.png', logoCard:'assets/logo-card.jpg', hero:'assets/hero.jpg',
  chocFudge:'assets/choc-fudge.jpg', strawberry:'assets/strawberry-shortcake.jpg', cupcakes:'assets/vanilla-cupcakes.jpg',
  croissants:'assets/butter-croissants.jpg', slice:'assets/cake-slice.jpg', redVelvet:'assets/red-velvet.jpg',
  brownies:'assets/brownies.jpg', doughnuts:'assets/doughnuts.jpg', bread:'assets/artisan-bread.jpg',
  box:'assets/dessert-box.jpg', macarons:'assets/macarons.jpg', studio:'assets/studio-cake.jpg',
  design:'assets/design-banner.jpg', life:'assets/life-banner.jpg', shop:'assets/shop-banner.jpg'
};

/* ---------- Verified business facts (from Pa Sweet's own logo card & WhatsApp business profile) ---------- */
const BAKERY = {
  id:'pa-sweet', name:'Pa Sweet', legal:'Pa Sweet Bakery', currency:'Le',
  address:'70 Wilkinson Road, Freetown', landmark:'Opposite Basha Restaurant',
  phones:['030 552220','088 111666'], facebook:'Pa Sweet Bakery',
  facebookUrl:'https://www.facebook.com/search/top?q=Pa%20Sweet%20Bakery',
  mapsUrl:'https://www.google.com/maps/search/?api=1&query=70+Wilkinson+Road+Freetown+Sierra+Leone',
  hours:{open:'08:00', close:'21:30'}
};

/* ---------- Icons ---------- */
const P = {
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
  cart:'<path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6"/><circle cx="10" cy="20" r="1.3"/><circle cx="17" cy="20" r="1.3"/>',
  heart:'<path d="M12 20s-7-4.4-9.2-8.6C1.2 8.3 3.1 5 6.4 5c2 0 3.3 1.1 4 2.3h3.2C14.3 6.1 15.6 5 17.6 5c3.3 0 5.2 3.3 3.6 6.4C19 15.6 12 20 12 20Z"/>',
  menu:'<path d="M4 7h16M4 12h16M4 17h16"/>', x:'<path d="M6 6l12 12M18 6 6 18"/>',
  left:'<path d="m15 5-7 7 7 7"/>', right:'<path d="m9 5 7 7-7 7"/>', arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
  plus:'<path d="M12 5v14M5 12h14"/>', minus:'<path d="M5 12h14"/>', trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
  pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
  phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/>',
  fb:'<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v7h4v-7h3l1-4h-4V8Z"/>',
  leaf:'<path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15M5 19l7-7"/>',
  cake:'<path d="M4 20h16v-7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7Z"/><path d="M4 15c2 1.5 4 1.5 5.3 0 1.4 1.5 3.4 1.5 4.7 0 1.4 1.5 3.4 1.5 6 0"/><path d="M12 11V7"/><path d="M12 4.5c.8.8.8 1.7 0 2.5-.8-.8-.8-1.7 0-2.5Z"/>',
  truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="18" r="1.8"/><circle cx="17" cy="18" r="1.8"/>',
  star:'<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z"/>',
  gift:'<path d="M4 10h16v10H4zM3 7h18v3H3zM12 7v13M12 7c-2-4-6-3-5 0M12 7c2-4 6-3 5 0"/>',
  spark:'<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
  upload:'<path d="M12 16V4M7 9l5-5 5 5M4 16v4h16v-4"/>', rotate:'<path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5"/>',
  zin:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5M11 8v6M8 11h6"/>', zout:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5M8 11h6"/>',
  play:'<path d="M7 5v14l11-7Z"/>', cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', check:'<path d="m5 12 5 5 9-10"/>',
  box:'<path d="M3 8l9-5 9 5v8l-9 5-9-5Z"/><path d="M3 8l9 5 9-5M12 13v8"/>', layers:'<path d="m12 3 9 5-9 5-9-5Z"/><path d="m3 13 9 5 9-5"/>',
  palette:'<path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 2-2s-1-1.5-1-2.5 1-1.5 2-1.5h2a4 4 0 0 0 4-4c0-4.4-4-8-9-8Z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7" r="1"/>',
  flower:'<circle cx="12" cy="12" r="2.5"/><path d="M12 9.5C10 6 12 3 12 3s2 3 0 6.5M14.5 12c3.5-2 6.5 0 6.5 0s-3 2-6.5 0M12 14.5c2 3.5 0 6.5 0 6.5s-2-3 0-6.5M9.5 12C6 14 3 12 3 12s3-2 6.5 0"/>',
  pen:'<path d="M4 20l4-1 11-11-3-3L5 16Z"/>', wand:'<path d="m4 20 12-12M14 4l1 2 2 1-2 1-1 2-1-2-2-1 2-1Z"/>', coin:'<circle cx="12" cy="12" r="9"/><path d="M15 9h-4a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4H9M12 6v2M12 16v2"/>',
  list:'<path d="M8 6h13M8 12h13M8 18h13M3 6h1M3 12h1M3 18h1"/>', grid:'<rect x="4" y="4" width="7" height="7"/><rect x="13" y="4" width="7" height="7"/><rect x="4" y="13" width="7" height="7"/><rect x="13" y="13" width="7" height="7"/>',
  logout:'<path d="M15 4h4v16h-4M10 8l-4 4 4 4M6 12h11"/>', settings:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/>',
  home:'<path d="M3 11 12 4l9 7M5 10v10h14V10"/>', filter:'<path d="M4 5h16l-6 8v6l-4-2v-4Z"/>', mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  chef:'<path d="M7 14a4 4 0 1 1 1-7.9 4.5 4.5 0 0 1 8 0A4 4 0 1 1 17 14v6H7Z"/>', alert:'<path d="M12 3 2 20h20Z"/><path d="M12 10v4M12 17v.5"/>'
};
const ic = (n, w) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"${w?` style="width:${w}px;height:${w}px"`:''} aria-hidden="true">${P[n]||''}</svg>`;

/* ---------- Utilities ---------- */
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s==null?'':s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money = n => 'Le ' + Math.round(n).toLocaleString('en-US');
const uid = p => (p||'') + Date.now().toString(36) + Math.random().toString(36).slice(2,6);
const today = () => { const d = new Date(); d.setHours(0,0,0,0); return d; };
const iso = d => { const z = new Date(d); return z.getFullYear()+'-'+String(z.getMonth()+1).padStart(2,'0')+'-'+String(z.getDate()).padStart(2,'0'); };
const addDays = (d, n) => { const z = new Date(d); z.setDate(z.getDate()+n); return z; };
const fmtDate = s => s ? new Date(s.length===10 ? s+'T12:00:00' : s).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}) : '';
const validEmail = e => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e||'');
const validPhone = p => (p||'').replace(/\D/g,'').length >= 8;

/* ---------- Store (development persistence in this browser) ---------- */
const KEY = 'pasweet.store.v1';
const DEFAULT_SETTINGS = {
  announcement:'Open 08:00 – 21:30 · 70 Wilkinson Road, opposite Basha Restaurant · Call 030 552220',
  heroTitle:'Freshly Baked\nWith Love', heroSub:'Cakes • Pastries • Cookies • Bread • More',
  pricesConfirmed:false,
  delivery:{enabled:true, zones:[{id:'z1', name:'Freetown — central (sample zone)', fee:50},{id:'z2', name:'Freetown — east/west (sample zone)', fee:80}]},
  taxRate:0,
  customLeadDays:3, maxCustomPerDay:5, maxCakesPerDay:20, blackout:[],
  loyalty:{enabled:true, pointsPer:10, note:'Sample rule: 1 point for every Le 10 on completed orders. Owner to confirm.'},
  studio:{
    sizes:[{v:'6',label:'6 inch',serves:'8–10',base:350},{v:'8',label:'8 inch',serves:'10–12',base:500},{v:'10',label:'10 inch',serves:'15–20',base:700}],
    tierPrice:400, shapeExtra:{round:0,square:100,heart:150}, maxTiers:3,
    flavours:[['Vanilla',0],['Chocolate',0],['Red velvet',50],['Lemon',0],['Strawberry',30]],
    fillings:['Chocolate ganache','Vanilla buttercream','Strawberry jam','Cream cheese','Lemon curd'],
    deco:{flowers:150,drip:80,pearls:50,sprinkles:30,berries:120,ruffle:150,candles:30,star:60}
  }
};
const SAMPLE_PRODUCTS = [
  {id:'choc-fudge', name:'Chocolate Fudge Cake', cat:'cakes', img:'chocFudge', gallery:['chocFudge','slice'], price:350,
    desc:'Rich chocolate sponge layered with smooth chocolate fudge, topped with fresh cream and chocolate shavings. A favourite for birthdays, celebrations or just because.',
    sizes:[['6 inch (8–10)',0],['8 inch (10–12)',150],['10 inch (15–20)',300]], flavours:['Chocolate'], frostings:['Chocolate ganache','Chocolate buttercream'],
    made:'order', lead:2, available:true, featured:true, tags:['chocolate','birthday','celebration'], occasion:['birthday'], added:5},
  {id:'strawberry-shortcake', name:'Strawberry Shortcake', cat:'cakes', img:'strawberry', gallery:['strawberry'], price:320,
    desc:'Light sponge with whipped cream and strawberries.', sizes:[['6 inch (8–10)',0],['8 inch (10–12)',140]], flavours:['Vanilla'], frostings:['Whipped cream'],
    made:'order', lead:2, available:true, featured:true, tags:['strawberry','fruit','cream'], occasion:['birthday','anniversary'], added:4},
  {id:'red-velvet', name:'Red Velvet Cake', cat:'cakes', img:'redVelvet', gallery:['redVelvet'], price:300,
    desc:'Red velvet layers with cream cheese frosting.', sizes:[['6 inch (8–10)',0],['8 inch (10–12)',140]], flavours:['Red velvet'], frostings:['Cream cheese frosting'],
    made:'order', lead:2, available:true, featured:false, tags:['red velvet','cream cheese'], occasion:['anniversary','birthday'], added:3},
  {id:'vanilla-cupcakes', name:'Vanilla Cupcakes', cat:'cupcakes', img:'cupcakes', gallery:['cupcakes'], price:180,
    desc:'Vanilla cupcakes with swirled buttercream.', sizes:[['Box of 6',0],['Box of 12',160]], flavours:['Vanilla'], frostings:['Vanilla buttercream','Strawberry buttercream'],
    made:'ready', lead:0, available:true, featured:true, tags:['cupcake','vanilla','party'], occasion:['birthday','baby shower'], added:6},
  {id:'butter-croissants', name:'Butter Croissants', cat:'pastries', img:'croissants', gallery:['croissants'], price:130,
    desc:'Flaky, golden butter croissants.', sizes:[['Pack of 4',0],['Pack of 8',120]], flavours:[], frostings:[],
    made:'ready', lead:0, available:true, featured:true, tags:['croissant','breakfast','butter'], occasion:[], added:2},
  {id:'chocolate-brownies', name:'Chocolate Brownies', cat:'desserts', img:'brownies', gallery:['brownies'], price:150,
    desc:'Fudgy chocolate brownies.', sizes:[['Box of 6',0],['Box of 12',140]], flavours:['Chocolate'], frostings:[],
    made:'ready', lead:0, available:true, featured:false, tags:['brownie','chocolate'], occasion:[], added:7},
  {id:'glazed-doughnuts', name:'Glazed Doughnuts', cat:'doughnuts', img:'doughnuts', gallery:['doughnuts'], price:100,
    desc:'Soft doughnuts with a sweet glaze and sprinkles.', sizes:[['Box of 4',0],['Box of 8',90]], flavours:[], frostings:['Pink glaze','Chocolate glaze'],
    made:'ready', lead:0, available:true, featured:false, tags:['doughnut','donut','sprinkles'], occasion:[], added:8},
  {id:'artisan-bread', name:'Artisan Bread', cat:'bread', img:'bread', gallery:['bread'], price:80,
    desc:'Freshly shaped crusty bread loaves.', sizes:[['1 loaf',0]], flavours:[], frostings:[],
    made:'ready', lead:0, available:true, featured:false, tags:['bread','loaf','baguette'], occasion:[], added:1},
  {id:'mixed-dessert-box', name:'Mixed Dessert Box', cat:'boxes', img:'box', gallery:['box'], price:250, builder:true,
    desc:'Build your own box — choose exactly the treats you want inside.', sizes:[['Box of 6',0],['Box of 12',200]], flavours:[], frostings:[],
    made:'order', lead:1, available:true, featured:false, tags:['gift','box','assorted'], occasion:['birthday','corporate'], added:9},
  {id:'macarons', name:'Macarons (Box of 6)', cat:'desserts', img:'macarons', gallery:['macarons'], price:220,
    desc:'Assorted pastel macarons.', sizes:[['Box of 6',0]], flavours:[], frostings:[],
    made:'order', lead:1, available:true, featured:false, tags:['macaron','gift'], occasion:['wedding','baby shower'], added:10}
].map(p => Object.assign({bakeryId:BAKERY.id, ingredients:'', allergens:'', storage:'', nutrition:''}, p));
const CATS = [
  {id:'cakes', name:'Cakes', img:'slice'}, {id:'cupcakes', name:'Cupcakes', img:'cupcakes'}, {id:'pastries', name:'Pastries', img:'croissants'},
  {id:'doughnuts', name:'Doughnuts', img:'doughnuts'}, {id:'bread', name:'Bread', img:'bread'}, {id:'desserts', name:'Desserts', img:'brownies'},
  {id:'boxes', name:'Dessert Boxes', img:'box'}
];
const BOX_ITEMS = [['Vanilla cupcake','cupcakes'],['Chocolate brownie','brownies'],['Glazed doughnut','doughnuts'],['Macaron pair','macarons'],['Mini croissant','croissants']];

function freshDB(){
  return { v:1, bakeries:[{id:BAKERY.id, name:BAKERY.name, status:'active', currency:'Le', timezone:'Africa/Freetown'}],
    settings:JSON.parse(JSON.stringify(DEFAULT_SETTINGS)), products:JSON.parse(JSON.stringify(SAMPLE_PRODUCTS)),
    cart:[], favs:[], user:null, addresses:[], orders:[], designs:[], quotes:[], celebrations:[], promos:[],
    inventory:[], movements:[], enquiries:[], subscribers:[], reviews:[], audit:[], seq:1000 };
}
let db;
try { db = JSON.parse(localStorage.getItem(KEY)) || freshDB(); } catch(e) { db = freshDB(); }
if (!db.v) db = freshDB();
db.settings = Object.assign(JSON.parse(JSON.stringify(DEFAULT_SETTINGS)), db.settings);
function save(){ try { localStorage.setItem(KEY, JSON.stringify(db)); } catch(e) {} }
function audit(what, ref){ db.audit.unshift({at:new Date().toISOString(), what, ref, role:adminRole}); db.audit = db.audit.slice(0,200); }

/* tenant-scoped access: every read goes through the active bakery */
const T = { products: () => db.products.filter(p => p.bakeryId === BAKERY.id && !p.hidden),
            orders: () => db.orders.filter(o => o.bakeryId === BAKERY.id),
            quotes: () => db.quotes.filter(q => q.bakeryId === BAKERY.id) };
const product = id => db.products.find(p => p.id === id && p.bakeryId === BAKERY.id);
const img = k => IMG[k] || k;

/* ---------- Pricing ("server" validation lives here; production recomputes on the API) ---------- */
function unitPrice(p, opts){
  if (!p) return 0;
  const s = (p.sizes||[]).find(x => x[0] === (opts||{}).size) || (p.sizes||[])[0];
  return p.price + (s ? s[1] : 0);
}
function lineTotal(l){ return l.lockedPrice != null ? l.lockedPrice * l.qty : unitPrice(product(l.productId), l.options) * l.qty; }
function cartTotals(code, zoneId, method){
  const subtotal = db.cart.reduce((a,l) => a + lineTotal(l), 0);
  let discount = 0, promoMsg = '';
  const promo = code ? db.promos.find(p => p.code.toUpperCase() === code.toUpperCase()) : null;
  if (code && !promo) promoMsg = 'That code isn’t valid.';
  else if (promo) {
    const now = iso(new Date());
    if (!promo.active) promoMsg = 'That code is no longer active.';
    else if (promo.start && now < promo.start) promoMsg = 'That code starts on ' + fmtDate(promo.start) + '.';
    else if (promo.end && now > promo.end) promoMsg = 'That code expired on ' + fmtDate(promo.end) + '.';
    else if (promo.maxUses && promo.uses >= promo.maxUses) promoMsg = 'That code has reached its usage limit.';
    else if (subtotal < (promo.minSpend||0)) promoMsg = 'Spend ' + money(promo.minSpend) + ' to use this code.';
    else discount = promo.type === 'percent' ? subtotal * promo.value/100 : Math.min(promo.value, subtotal);
  }
  const zone = (db.settings.delivery.zones||[]).find(z => z.id === zoneId);
  const deliveryFee = method === 'delivery' && zone ? zone.fee : 0;
  const tax = (subtotal - discount) * (db.settings.taxRate||0)/100;
  return {subtotal, discount, promo: discount ? promo : null, promoMsg, deliveryFee, tax, total: subtotal - discount + deliveryFee + tax};
}
const cartCount = () => db.cart.reduce((a,l) => a + l.qty, 0);

function addToCart(id, opts, qty, extra){
  const p = product(id);
  if (!p || !p.available) { toast('This item isn’t available to order right now.'); return; }
  const options = Object.assign({}, opts||{});
  if (!options.size && p.sizes && p.sizes[0]) options.size = p.sizes[0][0];
  const sig = id + '|' + JSON.stringify(options) + '|' + JSON.stringify((extra||{}).box||'');
  const ex = !extra || !extra.custom ? db.cart.find(l => l.sig === sig) : null;
  if (ex) ex.qty += qty||1;
  else db.cart.push(Object.assign({key:uid('l'), sig, productId:id, name:p.name, img:p.img, options, qty:qty||1}, extra||{}));
  save(); renderHeader(); toast(`Added ${p.name} to your cart`, 'View cart', () => go('cart'));
}

/* ---------- Router ---------- */
let route = {page:'home', params:{}};
let cleanup = null;
function go(page, params){
  if (cleanup) { try { cleanup(); } catch(e) {} cleanup = null; }
  route = {page, params: params||{}};
  closeLayer(); render(); window.scrollTo(0, 0);
}
window.PS = { go: (p, a) => go(p, a) };

/* ---------- Header / footer ---------- */
function renderHeader(){
  $('#announce').innerHTML = db.settings.announcement ? `<div class="announce">${esc(db.settings.announcement)}</div>` : '';
  const pg = route.page, on = n => pg === n ? ' on' : '';
  $('#header').innerHTML = `<div class="wrap">
    <button class="logo" data-go="home" aria-label="Pa Sweet home"><img src="${IMG.logo}" alt="Pa Sweet"></button>
    <nav class="nav" aria-label="Main">
      <div><button class="link${on('home')}" data-go="home">Home</button></div>
      <div><button class="link${on('shop')||on('product')}" data-go="shop">Shop</button>
        <div class="dropdown">${CATS.map(c => `<button data-go="shop" data-cat="${c.id}">${c.name}</button>`).join('')}<button data-go="shop" data-cat="">All products</button></div></div>
      <div><button class="link${on('studio')}" data-go="studio">Custom Cakes</button></div>
      <div><button class="link${on('about')}" data-go="about">About</button></div>
      <div><button class="link${on('contact')}" data-go="contact">Contact</button></div>
    </nav>
    <div class="hicons">
      <button class="ibtn" data-act="search" aria-label="Search">${ic('search')}</button>
      <button class="ibtn" data-go="account" data-tab="favourites" aria-label="Favourites">${ic('heart')}${db.favs.length?`<span class="badge">${db.favs.length}</span>`:''}</button>
      <button class="ibtn" data-go="account" aria-label="Account">${ic('user')}</button>
      <button class="ibtn" data-go="cart" aria-label="Cart, ${cartCount()} items">${ic('cart')}${cartCount()?`<span class="badge">${cartCount()}</span>`:''}</button>
      <button class="ibtn menu-btn" data-act="menu" aria-label="Menu">${ic('menu')}</button>
    </div></div>`;
}
function renderFooter(){
  $('#footer').innerHTML = `<div class="wrap"><div class="cols">
    <div><img src="${IMG.logo}" alt="Pa Sweet" style="height:74px;width:auto;margin-bottom:8px">
      <p class="small muted" style="margin:0 0 10px">Making life sweeter, one treat at a time.</p>
      <p class="small" style="margin:0">${esc(BAKERY.address)}<br>${esc(BAKERY.landmark)}<br>${BAKERY.phones.join(' | ')}</p>
      <a class="small" href="${BAKERY.facebookUrl}" target="_blank" rel="noopener" style="display:inline-flex;gap:6px;align-items:center;margin-top:8px">${ic('fb',16)} Facebook: Pa Sweet Bakery</a></div>
    <div><h4>Quick Links</h4>
      <button class="fl" data-go="home">Home</button><button class="fl" data-go="shop">Shop</button><button class="fl" data-go="studio">Custom Cakes</button>
      <button class="fl" data-go="account" data-tab="celebrations">Celebrations</button><button class="fl" data-go="about">About</button><button class="fl" data-go="contact">Contact</button></div>
    <div><h4>Customer Care</h4>
      <button class="fl" data-go="contact" data-tab="faq">FAQs</button><button class="fl" data-go="policy" data-tab="delivery">Delivery & Collection</button>
      <button class="fl" data-go="policy" data-tab="refunds">Refunds & Cancellations</button><button class="fl" data-go="policy" data-tab="allergy">Allergy Information</button>
      <button class="fl" data-go="policy" data-tab="terms">Terms & Conditions</button><button class="fl" data-go="policy" data-tab="privacy">Privacy Policy</button>
      <button class="fl" data-go="account" data-tab="orders">Track an Order</button><button class="fl" data-go="admin">Staff Dashboard</button></div>
    <div><h4>Newsletter</h4><p class="small muted" style="margin:0 0 10px">New treats and seasonal collections, only if you opt in.</p>
      <form id="newsForm" novalidate><input class="in" id="newsEmail" type="email" placeholder="Enter your email address" aria-label="Email address">
      <label class="check" style="margin:8px 0"><input type="checkbox" id="newsConsent"> I agree to receive emails from Pa Sweet. I can unsubscribe any time.</label>
      <button class="btn block" type="submit">Subscribe</button><div id="newsMsg" class="small" style="margin-top:6px" role="status"></div></form></div>
  </div><div class="bottom"><span>© ${new Date().getFullYear()} Pa Sweet Bakery. All rights reserved.</span><span>Pay at collection · Mobile money (online payments coming soon)</span></div></div>`;
  $('#newsForm').onsubmit = e => { e.preventDefault();
    const em = $('#newsEmail').value.trim(), c = $('#newsConsent').checked, m = $('#newsMsg');
    if (!validEmail(em)) { m.innerHTML = '<span class="err">Enter a valid email address.</span>'; return; }
    if (!c) { m.innerHTML = '<span class="err">Tick the consent box to subscribe.</span>'; return; }
    if (!db.subscribers.find(s => s.email === em)) db.subscribers.push({email:em, at:new Date().toISOString(), consent:true, bakeryId:BAKERY.id});
    save(); m.textContent = 'You’re subscribed. Thank you!'; $('#newsEmail').value = '';
  };
}

/* ---------- Layer: modal, drawer, search, toast ---------- */
function closeLayer(){ $('#layer').innerHTML = ''; document.body.style.overflow = ''; }
function modal(title, html, onMount){
  $('#layer').innerHTML = `<div class="modal-bg" data-close="1"><div class="modal fade-in" role="dialog" aria-modal="true" aria-label="${esc(title)}">
    <button class="ibtn x" data-act="close" aria-label="Close">${ic('x')}</button><h3>${esc(title)}</h3>${html}</div></div>`;
  document.body.style.overflow = 'hidden';
  const first = $('#layer .modal input, #layer .modal select, #layer .modal textarea, #layer .modal button:not(.x)'); if (first) first.focus();
  if (onMount) onMount($('#layer .modal'));
}
let toastT;
function toast(msg, actionLabel, action){
  let t = $('#toast'); if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; t.setAttribute('role','status'); document.body.appendChild(t); }
  t.innerHTML = esc(msg) + (actionLabel ? ` <button class="copy" id="toastAct" style="margin-left:10px">${esc(actionLabel)}</button>` : '');
  if (action) $('#toastAct').onclick = () => { t.remove(); action(); };
  clearTimeout(toastT); toastT = setTimeout(() => t && t.remove(), 3800);
}
function openMenu(){
  $('#layer').innerHTML = `<div class="drawer" data-close="1"><div class="panel">
    <div class="row" style="justify-content:space-between;margin-bottom:10px"><img src="${IMG.logo}" alt="Pa Sweet" style="height:50px;width:auto"><button class="ibtn" data-act="close" aria-label="Close menu">${ic('x')}</button></div>
    ${[['home','Home'],['shop','Shop'],['studio','Custom Cakes · AI Studio'],['account','My Account'],['cart','Cart'],['about','About'],['contact','Contact'],['admin','Staff Dashboard']].map(([g,l]) => `<button class="item" data-go="${g}">${l}</button>`).join('')}
    <p class="small muted" style="margin-top:16px">${esc(BAKERY.address)} · ${BAKERY.phones[0]}</p></div></div>`;
}
function lev(a,b){ if (Math.abs(a.length-b.length)>2) return 9; const m=[...Array(a.length+1)].map((_,i)=>[i]); for(let j=1;j<=b.length;j++) m[0][j]=j;
  for(let i=1;i<=a.length;i++) for(let j=1;j<=b.length;j++) m[i][j]=Math.min(m[i-1][j]+1,m[i][j-1]+1,m[i-1][j-1]+(a[i-1]===b[j-1]?0:1)); return m[a.length][b.length]; }
function searchProducts(q){
  const toks = q.toLowerCase().split(/\s+/).filter(Boolean); if (!toks.length) return [];
  return T.products().map(p => {
    const cat = (CATS.find(c => c.id === p.cat)||{}).name || '';
    const hay = [p.name, p.desc, cat, ...(p.tags||[]), ...(p.flavours||[]), ...(p.frostings||[])].join(' ').toLowerCase();
    const words = hay.split(/[^a-z0-9]+/);
    let score = 0;
    for (const t of toks) {
      if (p.name.toLowerCase().includes(t)) score += 5; else if (hay.includes(t)) score += 2;
      else if (t.length >= 4 && words.some(w => w.length >= 3 && lev(t, w) <= 1)) score += 1; else return {p, score:0};
    }
    return {p, score};
  }).filter(x => x.score > 0).sort((a,b) => b.score - a.score).map(x => x.p);
}
function openSearch(){
  $('#layer').innerHTML = `<div class="search-ov" data-close="1"><div class="search-box fade-in">
    <div class="searchbar" style="margin:0">${ic('search')}<input id="sq" placeholder="Search cakes, cupcakes, bread…" aria-label="Search products" autocomplete="off"><button class="ibtn" data-act="close" aria-label="Close search">${ic('x')}</button></div>
    <div id="sres" style="margin-top:8px"><p class="small muted" style="padding:6px 8px;margin:0">Try “chocolate”, “croissant” or “birthday”.</p></div></div></div>`;
  const inp = $('#sq'); inp.focus();
  inp.oninput = () => {
    const r = searchProducts(inp.value);
    $('#sres').innerHTML = !inp.value.trim() ? '' : r.length ? r.slice(0,6).map(p => `<button class="sres" data-go="product" data-id="${p.id}"><img src="${img(p.img)}" alt=""><span><b>${esc(p.name)}</b><br><span class="small muted">${money(p.price)} · ${esc((CATS.find(c=>c.id===p.cat)||{}).name)}</span></span></button>`).join('')
      + `<button class="link-btn" style="margin:6px 8px" data-go="shop" data-q="${esc(inp.value)}">See all results ${ic('arrow')}</button>`
      : `<p class="small muted" style="padding:6px 8px">No products match “${esc(inp.value)}”. Try a simpler word, or <button class="link-btn" data-go="studio">design a custom cake</button>.</p>`;
  };
  inp.onkeydown = e => { if (e.key === 'Enter' && inp.value.trim()) go('shop', {q: inp.value}); };
}

/* ---------- Shared bits ---------- */
function productCard(p){
  const fav = db.favs.includes(p.id);
  return `<article class="card" data-go="product" data-id="${p.id}" tabindex="0" aria-label="${esc(p.name)}">
    <div class="ph"><img src="${img(p.img)}" alt="${esc(p.name)}" loading="lazy">
      ${!p.available ? '<span class="pill bad tag">Unavailable</span>' : p.made === 'order' ? '<span class="pill tag">Made to order</span>' : ''}
      <button class="fav${fav?' on':''}" data-act="fav" data-id="${p.id}" aria-label="${fav?'Remove from':'Add to'} favourites" aria-pressed="${fav}">${ic('heart')}</button></div>
    <div class="body"><div class="name">${esc(p.name)}</div><div class="sub">${esc((p.sizes[0]||[''])[0])}${p.sizes.length>1?` · ${p.sizes.length} sizes`:''}</div>
      <div class="foot"><span class="price num">${p.sizes.length>1?'from ':''}${money(p.price)}</span>
      <button class="add" data-act="quickadd" data-id="${p.id}" aria-label="Add ${esc(p.name)} to cart">${ic('plus')}</button></div></div></article>`;
}
function statusPill(s){
  const ok = ['Completed','Approved','Ready for collection','Converted to order','Quote prepared','Paid','Delivered'];
  const bad = ['Cancelled','Declined','Refunded','Failed','Expired'];
  const warn = ['Awaiting payment','Awaiting confirmation','Revision requested','Awaiting details','Refund pending'];
  return `<span class="pill ${ok.includes(s)?'ok':bad.includes(s)?'bad':warn.includes(s)?'warn':'info'}">${esc(s)}</span>`;
}
const samplePriceNote = () => db.settings.pricesConfirmed ? '' : '<p class="tiny muted" style="margin:4px 0 0">Prices shown are sample prices until Pa Sweet confirms its price list.</p>';

/* ---------- Pages ---------- */
const V = {};

V.home = () => {
  const slides = [
    {t:db.settings.heroTitle, s:db.settings.heroSub, img:IMG.hero, cta:['Shop Now','shop'], cta2:['Create Your Dream Cake','studio']},
    {t:'Design Your\nDream Cake', s:'Describe it, shape it in 3D, and send it to our bakers for a quote.', img:IMG.design, cta:['Start Designing','studio']},
    {t:'Life is Sweeter\nat Pa Sweet', s:'70 Wilkinson Road, opposite Basha Restaurant.', img:IMG.life, cta:['Learn More','about']}
  ];
  const feat = T.products().filter(p => p.featured && p.available).slice(0,4);
  return `<section class="hero" aria-roledescription="carousel">
    ${slides.map((s,i) => `<div class="slide${i===0?' on':''}" aria-hidden="${i!==0}"><div class="copy">
      <h1>${esc(s.t).replace(/\n/g,'<br>')}</h1><p>${esc(s.s)}</p>
      <div class="row" style="margin-top:8px"><button class="btn" data-go="${s.cta[1]}">${s.cta[0]} ${ic('arrow')}</button>${s.cta2?`<button class="btn ghost" data-go="${s.cta2[1]}">${s.cta2[0]}</button>`:''}</div></div>
      <div class="pic"><img src="${s.img}" alt="" ${i?'loading="lazy"':''}></div></div>`).join('')}
    <button class="arrow l" data-act="slide" data-d="-1" aria-label="Previous slide">${ic('left')}</button>
    <button class="arrow r" data-act="slide" data-d="1" aria-label="Next slide">${ic('right')}</button>
    <div class="dots">${slides.map((_,i) => `<button class="${i===0?'on':''}" data-act="dot" data-i="${i}" aria-label="Slide ${i+1}"></button>`).join('')}</div></section>
  <div class="wrap"><div class="features">
    ${[['leaf','Fresh Ingredients','Always'],['cake','Custom Cakes','For Every Occasion'],['truck','Delivery & Pickup','Plan your collection time'],['star','Sweet Rewards','For Loyal Customers']].map(f => `<div class="feature"><span class="ic">${ic(f[0])}</span><b>${f[1]}</b><span>${f[2]}</span></div>`).join('')}
  </div>
  <section class="section"><div class="sec-head"><h2>Our Bestsellers</h2><button class="link-btn" data-go="shop">View All ${ic('arrow')}</button></div>
    ${feat.length ? `<div class="grid c4">${feat.map(productCard).join('')}</div>` : `<div class="empty"><h3>No featured products yet</h3><p class="muted">Staff can feature products from the dashboard.</p></div>`}</section>
  <section class="banner" style="margin-top:4px"><div class="copy"><h2>Design Your Dream Cake</h2>
    <p>Create a custom cake with our easy 3D cake designer and bring your vision to life. Our bakers review every design before confirming a price.</p>
    <div><button class="btn" data-go="studio">Start Designing ${ic('arrow')}</button></div></div><div class="pic"><img src="${IMG.design}" alt="Pink cake with roses" loading="lazy"></div></section>
  <section class="section"><div class="sec-head"><h2>Popular Categories</h2></div>
    <div class="cats">${CATS.filter(c => c.id!=='desserts').map(c => `<button class="cat" data-go="shop" data-cat="${c.id}"><span class="c"><img src="${img(c.img)}" alt="" loading="lazy"></span>${c.name}</button>`).join('')}</div></section>
  <section class="banner"><div class="copy"><h2>Life is Sweeter<br>at Pa Sweet</h2><p>Cakes, pastries, doughnuts and bread from our bakery on Wilkinson Road.</p>
    <div class="row"><button class="btn" data-go="about">Learn More ${ic('arrow')}</button><button class="btn ghost" data-go="account" data-tab="rewards">Explore Rewards</button></div></div>
    <div class="pic"><img src="${IMG.life}" alt="Table of cakes and pastries" loading="lazy"></div></section>
  <section class="section"><div class="editorial">
    <div><h2 class="serif" style="font-size:clamp(26px,3vw,34px);margin-bottom:10px">Plan a celebration</h2>
      <p class="muted" style="max-width:52ch">Birthdays, weddings, anniversaries, graduations, baby showers or office treats. Save your important dates in the Celebration Memory Book and we’ll keep them ready for your next order.</p>
      <div class="chips" style="margin:14px 0">${['Birthday','Wedding','Anniversary','Graduation','Baby shower','Corporate'].map(o => `<button class="chip" data-go="studio" data-occ="${o}">${o}</button>`).join('')}</div>
      <button class="btn soft" data-go="account" data-tab="celebrations">${ic('cal')} Open Memory Book</button></div>
    <div class="grid c3">${['cupcakes','macarons','box'].map(k => `<img src="${IMG[k]}" alt="" loading="lazy" style="border-radius:14px;aspect-ratio:1;object-fit:cover">`).join('')}</div></div></section>
  </div>`;
};
let slideI = 0, slideTimer;
function showSlide(i){ const s = $$('.hero .slide'); if (!s.length) return; slideI = (i + s.length) % s.length;
  s.forEach((el,k) => { el.classList.toggle('on', k===slideI); el.setAttribute('aria-hidden', k!==slideI); });
  $$('.hero .dots button').forEach((b,k) => b.classList.toggle('on', k===slideI)); }

V.shop = (prm) => {
  const st = shopState; if (prm.cat !== undefined) { st.cats = prm.cat ? [prm.cat] : []; prm.cat = undefined; } if (prm.q !== undefined) { st.q = prm.q; prm.q = undefined; }
  return `<section class="pagebanner"><img src="${IMG.shop}" alt=""><div class="wrap"><h1>Our Bakery Shop</h1><p>Discover our fresh and delicious treats, made with love.</p></div></section>
  <div class="wrap"><div class="searchbar">${ic('search')}<input id="shopq" value="${esc(st.q)}" placeholder="Search for products…" aria-label="Search products"></div>
  <div class="caticons">${CATS.map(c => `<button class="${st.cats.includes(c.id)?'on':''}" data-act="catpick" data-cat="${c.id}"><span class="c"><img src="${img(c.img)}" alt=""></span>${c.name}</button>`).join('')}</div>
  <div class="shoplayout"><aside class="filters" id="filters" aria-label="Filters">
    <div><h4>Categories</h4>${CATS.map(c => `<label><input type="checkbox" data-f="cat" value="${c.id}" ${st.cats.includes(c.id)?'checked':''}> ${c.name} <span class="muted tiny">(${T.products().filter(p=>p.cat===c.id).length})</span></label>`).join('')}</div>
    <div><h4>Price Range</h4><input type="range" id="fprice" min="50" max="1000" step="10" value="${st.max}" aria-label="Maximum price"><div class="small muted">Up to <b id="fpv">${money(st.max)}</b></div></div>
    <div><h4>Availability</h4><label><input type="checkbox" data-f="ready" ${st.ready?'checked':''}> Ready to buy</label><label><input type="checkbox" data-f="order" ${st.order?'checked':''}> Made to order</label></div>
    <div><h4>Occasion</h4>${['birthday','anniversary','wedding','baby shower','corporate'].map(o => `<label><input type="checkbox" data-f="occ" value="${o}" ${st.occ.includes(o)?'checked':''}> ${o[0].toUpperCase()+o.slice(1)}</label>`).join('')}</div>
    <div><h4>Dietary Options</h4><p class="tiny muted" style="margin:0">Dietary labels (vegan, gluten-free, nut-free…) appear here once the bakery verifies them for a product.</p></div>
    <button class="btn soft sm" data-act="clearf">Clear filters</button></aside>
  <div><div class="toolbar"><div class="row"><button class="btn soft sm filter-toggle" data-act="togglef">${ic('filter')} Filters</button><span class="small muted" id="rcount"></span></div>
    <div class="row"><label class="small" for="sortby">Sort by</label><select class="in" id="sortby" style="width:auto;padding:7px 10px">
      ${[['rec','Recommended'],['new','Newest'],['lo','Price: low to high'],['hi','Price: high to low'],['az','Alphabetical']].map(o => `<option value="${o[0]}" ${st.sort===o[0]?'selected':''}>${o[1]}</option>`).join('')}</select>
      <div class="vtoggle"><button class="${st.view==='grid'?'on':''}" data-act="view" data-v="grid" aria-label="Grid view">${ic('grid')}</button><button class="${st.view==='list'?'on':''}" data-act="view" data-v="list" aria-label="List view">${ic('list')}</button></div></div></div>
    <div id="results"></div>${samplePriceNote()}</div></div></div>`;
};
const shopState = {q:'', cats:[], max:1000, ready:false, order:false, occ:[], sort:'rec', view:'grid'};
function shopResults(){
  const st = shopState;
  let list = st.q.trim() ? searchProducts(st.q) : T.products().slice();
  list = list.filter(p => (!st.cats.length || st.cats.includes(p.cat)) && p.price <= st.max
    && (!(st.ready||st.order) || (st.ready && p.made==='ready') || (st.order && p.made==='order'))
    && (!st.occ.length || st.occ.some(o => (p.occasion||[]).includes(o))));
  const s = {new:(a,b)=>b.added-a.added, lo:(a,b)=>a.price-b.price, hi:(a,b)=>b.price-a.price, az:(a,b)=>a.name.localeCompare(b.name)}[st.sort];
  if (s) list.sort(s); else if (!st.q.trim()) list.sort((a,b) => (b.featured-a.featured) || (b.available-a.available));
  $('#rcount').textContent = list.length + (list.length===1?' product':' products');
  $('#results').innerHTML = list.length ? `<div class="grid c3 ${st.view==='list'?'list-view':''}">${list.map(productCard).join('')}</div>`
    : `<div class="empty"><h3>Nothing matches yet</h3><p class="muted">Try clearing a filter or searching a simpler word.</p><div class="row" style="justify-content:center;margin-top:10px"><button class="btn soft" data-act="clearf">Clear filters</button><button class="btn" data-go="studio">Design a custom cake</button></div></div>`;
}

V.product = (prm) => {
  const p = product(prm.id); if (!p) return `<div class="wrap section"><div class="empty"><h3>Product not found</h3><button class="btn" data-go="shop">Back to shop</button></div></div>`;
  pdState = {id:p.id, size:p.sizes[0]&&p.sizes[0][0], flavour:p.flavours[0], frosting:p.frostings[0], qty:1, imgI:0, tab:'desc', box:{}};
  const related = T.products().filter(x => x.id !== p.id && (x.cat === p.cat || x.tags.some(t => p.tags.includes(t)))).concat(T.products().filter(x=>x.id!==p.id)).filter((x,i,a)=>a.indexOf(x)===i).slice(0,4);
  return `<div class="wrap"><div class="small muted" style="padding-top:18px"><button class="link-btn" data-go="shop">${ic('left')} Shop</button></div>
  <div class="pd"><div class="gallery" id="gallery"></div><div id="pdinfo"></div></div>
  <div style="max-width:820px"><div class="tabs" role="tablist" id="pdtabs"></div><div id="pdtab" style="padding:16px 0;font-size:14px"></div>
    <details class="acc"><summary>Nutrition Information</summary><div>${p.nutrition?esc(p.nutrition):'Nutrition information hasn’t been supplied by the bakery yet.'}</div></details>
    <details class="acc"><summary>Storage & Shelf Life</summary><div>${p.storage?esc(p.storage):'Storage guidance will be added by the bakery. Ask staff at collection.'}</div></details>
    <details class="acc"><summary>Delivery & Collection</summary><div>Collect from ${esc(BAKERY.address)} (${esc(BAKERY.landmark)}) between ${BAKERY.hours.open} and ${BAKERY.hours.close}. ${db.settings.delivery.enabled?'Delivery is available to the zones listed at checkout.':'Delivery is not offered at the moment.'} ${p.made==='order'?`This item needs at least ${p.lead} day${p.lead===1?'':'s'} notice.`:''}</div></details></div>
  <section class="section"><div class="sec-head"><h2>Related Products</h2></div><div class="grid c4">${related.map(productCard).join('')}</div></section></div>`;
};
let pdState = {};
function renderPD(){
  const p = product(pdState.id); if (!p) return;
  const g = p.gallery.map(img);
  $('#gallery').innerHTML = `<div class="main" id="pdmain"><img src="${g[pdState.imgI]}" alt="${esc(p.name)}"></div>
    ${g.length>1?`<div class="thumbs">${g.map((s,i) => `<button class="${i===pdState.imgI?'on':''}" data-act="pdimg" data-i="${i}" aria-label="Image ${i+1}"><img src="${s}" alt=""></button>`).join('')}</div>`:''}
    <p class="tiny muted" style="margin-top:6px">Tap the photo to zoom.</p>`;
  const price = unitPrice(p, {size:pdState.size});
  const fav = db.favs.includes(p.id);
  const boxCap = p.builder ? parseInt(pdState.size.match(/\d+/)[0], 10) : 0;
  const boxCount = Object.values(pdState.box).reduce((a,b)=>a+b,0);
  $('#pdinfo').innerHTML = `<h1>${esc(p.name)}</h1>
    <div class="row" style="margin-top:4px">${p.made==='order'?'<span class="pill">Made to order</span>':'<span class="pill ok">Ready to buy</span>'}${!p.available?'<span class="pill bad">Currently unavailable</span>':''}<span class="small muted">No reviews yet</span></div>
    <div class="price num">${money(price)}</div><p style="margin:0;color:var(--ink)">${esc(p.desc)}</p>${samplePriceNote()}
    ${p.sizes.length?`<div class="opt-label">Size</div><div class="chips">${p.sizes.map(s => `<button class="chip ${s[0]===pdState.size?'on':''}" data-act="pdsize" data-v="${esc(s[0])}">${esc(s[0])}${s[1]?` <span class="muted">+${money(s[1])}</span>`:''}</button>`).join('')}</div>`:''}
    ${p.flavours.length?`<div class="opt-label"><label for="pdfl">Flavour</label></div><select class="in" id="pdfl">${p.flavours.map(f => `<option ${f===pdState.flavour?'selected':''}>${esc(f)}</option>`).join('')}</select>`:''}
    ${p.frostings.length?`<div class="opt-label"><label for="pdfr">Frosting</label></div><select class="in" id="pdfr">${p.frostings.map(f => `<option ${f===pdState.frosting?'selected':''}>${esc(f)}</option>`).join('')}</select>`:''}
    ${p.builder?`<div class="opt-label">Fill your box <span class="muted">(${boxCount}/${boxCap})</span></div>
      <div style="display:grid;gap:8px">${BOX_ITEMS.map(([n,k]) => `<div class="row" style="justify-content:space-between;background:#fff;border:1px solid var(--line);border-radius:10px;padding:6px 10px"><span class="row"><img src="${IMG[k]}" alt="" style="width:34px;height:34px;border-radius:8px;object-fit:cover">${n}</span>
        <span class="qty sm"><button data-act="boxq" data-n="${n}" data-d="-1" aria-label="Fewer ${n}">${ic('minus')}</button><span>${pdState.box[n]||0}</span><button data-act="boxq" data-n="${n}" data-d="1" aria-label="More ${n}" ${boxCount>=boxCap?'disabled':''}>${ic('plus')}</button></span></div>`).join('')}</div>
      <p class="tiny muted">Items are packed together; ask staff about allergens and cross-contact before ordering.</p>`:''}
    <div class="row" style="margin-top:18px"><div class="qty"><button data-act="pdq" data-d="-1" aria-label="Decrease quantity">${ic('minus')}</button><span class="num">${pdState.qty}</span><button data-act="pdq" data-d="1" aria-label="Increase quantity">${ic('plus')}</button></div>
      <button class="btn" style="flex:1" data-act="pdadd" ${!p.available||(p.builder&&boxCount!==boxCap)?'disabled':''}>${ic('cart')} ${p.builder&&boxCount!==boxCap?`Choose ${boxCap-boxCount} more`:'Add to Cart'}</button>
      <button class="ibtn fav-l${fav?' on':''}" style="border:1.5px solid var(--wine);color:var(--wine);border-radius:10px" data-act="fav" data-id="${p.id}" aria-pressed="${fav}" aria-label="Favourite">${ic('heart')}</button></div>
    <div class="facts"><span>${ic('leaf')} Fresh ingredients</span><span>${ic('chef')} ${p.made==='order'?'Made to order':'Baked for the shop counter'}</span><span>${ic('clock')} ${p.lead?`${p.lead}–${p.lead+1} days lead time`:'Same-day collection'}</span></div>
    <p class="small muted" style="margin-top:12px">Want something different? <button class="link-btn" data-go="studio">Customise in the Cake Studio ${ic('arrow')}</button></p>`;
  const fl = $('#pdfl'); if (fl) fl.onchange = e => pdState.flavour = e.target.value;
  const fr = $('#pdfr'); if (fr) fr.onchange = e => pdState.frosting = e.target.value;
  $('#pdtabs').innerHTML = [['desc','Description'],['ing','Ingredients'],['all','Allergens'],['rev','Reviews']].map(t => `<button role="tab" aria-selected="${pdState.tab===t[0]}" class="${pdState.tab===t[0]?'on':''}" data-act="pdtab" data-t="${t[0]}">${t[1]}</button>`).join('');
  const revs = db.reviews.filter(r => r.productId === p.id && r.status === 'approved');
  const canReview = T.orders().some(o => o.status === 'Completed' && o.items.some(i => i.productId === p.id));
  $('#pdtab').innerHTML = {
    desc: `<p style="margin:0">${esc(p.desc)}</p>`,
    ing: p.ingredients ? esc(p.ingredients) : '<p class="muted" style="margin:0">The full ingredient list hasn’t been published yet. Call 030 552220 to ask before ordering.</p>',
    all: p.allergens ? `<p style="margin:0"><b>Contains:</b> ${esc(p.allergens)}</p><p class="small muted">Products are made in a kitchen that handles other allergens.</p>` : `<div class="placeholder">Allergen information for this product hasn’t been confirmed by the bakery yet. If you have an allergy, please speak to Pa Sweet on ${BAKERY.phones.join(' or ')} before ordering. We can’t guarantee any item is free from an allergen.</div>`,
    rev: (revs.length ? revs.map(r => `<div style="padding:10px 0;border-bottom:1px solid var(--line)"><b>${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</b> <span class="small muted">${esc(r.name)} · ${fmtDate(r.at)}</span><p style="margin:4px 0 0">${esc(r.text)}</p></div>`).join('') : '<p class="muted" style="margin:0">No reviews yet.</p>')
      + (canReview ? `<button class="btn soft sm" style="margin-top:10px" data-act="review" data-id="${p.id}">Write a review</button>` : '<p class="small muted">Reviews open to customers after a completed order.</p>')
  }[pdState.tab];
}

/* ---------- Cart ---------- */
let cartPromo = '';
V.cart = () => {
  if (!db.cart.length) return `<div class="wrap section"><div class="empty"><h3>Your cart is empty</h3><p class="muted">Browse the shop or design a custom cake.</p><div class="row" style="justify-content:center;margin-top:12px"><button class="btn" data-go="shop">Shop Now</button><button class="btn ghost" data-go="studio">Design a Cake</button></div></div></div>`;
  const t = cartTotals(cartPromo);
  const also = T.products().filter(p => p.available && !db.cart.some(l => l.productId===p.id)).slice(0,6);
  return `<div class="wrap"><div class="twocol"><section><h2 style="font-size:22px">Your Cart <span class="muted" style="font-weight:400;font-size:16px">(${cartCount()} item${cartCount()===1?'':'s'})</span></h2>
    ${db.cart.map(l => { const p = product(l.productId);
      const avail = p && p.available;
      return `<div class="line"><img src="${img(l.img)}" alt=""><div style="min-width:0"><b>${esc(l.name)}</b>
        <div class="meta">${Object.entries(l.options||{}).filter(e=>e[1]).map(e => esc(e[1])).join(' | ')}</div>
        ${l.box?`<div class="meta">${Object.entries(l.box).filter(e=>e[1]).map(e => e[1]+'× '+esc(e[0])).join(', ')}</div>`:''}
        ${l.custom?`<div class="meta">Custom design · quote ${esc(l.quoteId)} · price agreed with bakery</div>`:''}
        ${!avail?'<div class="err">No longer available — remove to continue.</div>':''}
        <div style="margin-top:8px">${l.custom?'<span class="small muted">Qty 1</span>':`<span class="qty sm"><button data-act="cq" data-k="${l.key}" data-d="-1" aria-label="Decrease">${ic('minus')}</button><span class="num">${l.qty}</span><button data-act="cq" data-k="${l.key}" data-d="1" aria-label="Increase">${ic('plus')}</button></span>`}</div></div>
        <div class="right"><b class="num">${money(lineTotal(l))}</b><button class="ibtn" data-act="crm" data-k="${l.key}" aria-label="Remove ${esc(l.name)}">${ic('trash')}</button></div></div>`; }).join('')}
    <form class="row" id="promoForm" style="margin-top:16px"><input class="in" id="promo" placeholder="Enter promo code" value="${esc(cartPromo)}" style="flex:1;max-width:280px" aria-label="Promo code"><button class="btn soft" type="submit">Apply</button><span class="small ${t.promoMsg?'err':''}" role="status">${t.promoMsg ? esc(t.promoMsg) : t.discount ? 'Code applied.' : ''}</span></form></section>
  <aside class="summary"><h3>Order Summary</h3>
    <div class="sumrow"><span>Subtotal</span><span class="num">${money(t.subtotal)}</span></div>
    ${t.discount?`<div class="sumrow"><span>Discount (${esc(t.promo.code)})</span><span class="num">−${money(t.discount)}</span></div>`:''}
    <div class="sumrow"><span>Delivery Fee</span><span class="small muted">Chosen at checkout</span></div>
    ${db.settings.taxRate?`<div class="sumrow"><span>Tax (${db.settings.taxRate}%)</span><span class="num">${money(t.tax)}</span></div>`:''}
    <div class="sumrow total"><span>Total</span><span class="num">${money(t.total)}</span></div>
    <button class="btn block" style="margin-top:12px" data-go="checkout" ${db.cart.some(l=>!product(l.productId)||!product(l.productId).available)?'disabled':''}>Proceed to Checkout ${ic('arrow')}</button>
    <p class="tiny muted" style="text-align:center;margin:8px 0 0">Prices are re-checked when you place your order.</p></aside></div>
  ${also.length?`<section class="section" style="padding-top:8px"><div class="sec-head"><h2>You May Also Like</h2></div><div class="hscroll">${also.map(productCard).join('')}</div></section>`:''}</div>`;
};

/* ---------- Checkout ---------- */
let co = null;
function coDefaults(){
  const u = db.user || {}, a = db.addresses[0] || {};
  return {name:u.name||'', phone:u.phone||'', email:u.email||'', method:'collection', zone:(db.settings.delivery.zones[0]||{}).id, address:a.text||'',
    date:'', time:'', notes:'', allergy:'', pay:'collection', agree:false, idem:uid('k'), busy:false, errors:{}};
}
function minLead(){ return db.cart.reduce((m,l) => Math.max(m, l.custom ? 0 : (product(l.productId)||{lead:0}).lead), 0); }
function slots(){ const out=[]; for (let h=8; h<=21; h++) for (const m of [0,30]) { if (h===21 && m>0) continue; if (h===8 && m===0) continue; out.push(String(h).padStart(2,'0')+':'+(m?'30':'00')); } return out; }
V.checkout = () => {
  if (!db.cart.length) return V.cart();
  if (!co) co = coDefaults();
  const lead = minLead(), minDate = iso(addDays(today(), lead));
  const t = cartTotals(cartPromo, co.zone, co.method), e = co.errors;
  const err = k => e[k] ? `<span class="err">${esc(e[k])}</span>` : '';
  return `<div class="wrap"><div class="twocol"><form id="coForm" novalidate>
    <h2 style="font-size:22px;margin-bottom:14px">Checkout</h2>
    ${!db.user?`<div class="note" style="margin-bottom:14px">Checking out as a guest. <button type="button" class="link-btn" data-go="account">Sign in</button> to save this order to your account.</div>`:''}
    <div class="step"><h3><span class="n">1</span>Your details</h3><div class="fgrid">
      <label class="f">Full name<input class="in" id="c_name" value="${esc(co.name)}" autocomplete="name">${err('name')}</label>
      <label class="f">Phone number<input class="in" id="c_phone" value="${esc(co.phone)}" autocomplete="tel" inputmode="tel">${err('phone')}</label>
      <label class="f" style="grid-column:1/-1">Email (optional, for your receipt)<input class="in" id="c_email" type="email" value="${esc(co.email)}" autocomplete="email">${err('email')}</label></div></div>
    <div class="step"><h3><span class="n">2</span>Collection or delivery</h3><div class="radio-cards">
      <label class="rc ${co.method==='collection'?'on':''}"><input type="radio" name="m" value="collection" ${co.method==='collection'?'checked':''}><span><b>Collect from the bakery</b><br><span class="small muted">${esc(BAKERY.address)} · ${esc(BAKERY.landmark)}</span></span></label>
      <label class="rc ${co.method==='delivery'?'on':''} ${db.settings.delivery.enabled?'':'dis'}"><input type="radio" name="m" value="delivery" ${co.method==='delivery'?'checked':''} ${db.settings.delivery.enabled?'':'disabled'}><span><b>Delivery</b><br><span class="small muted">${db.settings.delivery.enabled?'Fee depends on your zone':'Not available right now'}</span></span></label></div>
      ${co.method==='delivery'?`<div class="fgrid" style="margin-top:12px"><label class="f">Delivery zone<select class="in" id="c_zone">${db.settings.delivery.zones.map(z => `<option value="${z.id}" ${z.id===co.zone?'selected':''}>${esc(z.name)} — ${money(z.fee)}</option>`).join('')}</select></label>
        <label class="f">Delivery address<textarea class="in" id="c_addr" rows="2" style="min-height:60px">${esc(co.address)}</textarea>${err('address')}</label></div>`:''}</div>
    <div class="step"><h3><span class="n">3</span>Date and time</h3><div class="fgrid">
      <label class="f">Date<input class="in" type="date" id="c_date" min="${minDate}" value="${esc(co.date)}">${err('date')}</label>
      <label class="f">Time<select class="in" id="c_time"><option value="">Choose a time</option>${slots().map(s => `<option ${s===co.time?'selected':''}>${s}</option>`).join('')}</select>${err('time')}</label></div>
      <p class="small muted" style="margin:8px 0 0">${lead?`Your cart includes made-to-order items, so the earliest date is ${fmtDate(minDate)}.`:'Same-day collection is possible for ready-to-buy items, subject to stock.'} Times follow our opening hours (${BAKERY.hours.open}–${BAKERY.hours.close}). The bakery confirms your slot.</p></div>
    <div class="step"><h3><span class="n">4</span>Notes and allergies</h3>
      <label class="f">Allergy or dietary notes<textarea class="in" id="c_allergy" rows="2" style="min-height:60px" placeholder="e.g. nut allergy in the family">${esc(co.allergy)}</textarea></label>
      <p class="small muted" style="margin:6px 0 12px">Telling us about an allergy doesn’t guarantee an item is free from it or from cross-contact. The bakery will contact you if it can’t safely meet your request.</p>
      <label class="f">Order notes<textarea class="in" id="c_notes" rows="2" style="min-height:60px" placeholder="Message on the box, gate code…">${esc(co.notes)}</textarea></label></div>
    <div class="step"><h3><span class="n">5</span>Payment</h3><div class="radio-cards">
      <label class="rc ${co.pay==='collection'?'on':''}"><input type="radio" name="pay" value="collection" checked><span><b>Pay at ${co.method==='delivery'?'delivery':'collection'}</b><br><span class="small muted">Cash or mobile money when you receive your order</span></span></label>
      <label class="rc dis"><input type="radio" name="pay" value="online" disabled><span><b>Pay online (mobile money / card)</b><br><span class="small muted">Not connected yet — needs a payment provider such as Monime.</span></span></label></div></div>
    <label class="check" style="margin:6px 0 14px"><input type="checkbox" id="c_agree" ${co.agree?'checked':''}> I’ve checked my order and agree to Pa Sweet’s <button type="button" class="link-btn" data-go="policy" data-tab="terms">terms</button> and <button type="button" class="link-btn" data-go="policy" data-tab="refunds">cancellation policy</button>.</label>${err('agree')}
    <button class="btn block" type="submit" id="placeBtn" ${co.busy?'disabled':''}>${co.busy?'Placing order…':'Place order · '+money(t.total)}</button></form>
  <aside class="summary"><h3>Order Summary</h3>
    ${db.cart.map(l => `<div class="sumrow small"><span>${l.qty}× ${esc(l.name)}</span><span class="num">${money(lineTotal(l))}</span></div>`).join('')}
    <div class="sumrow" style="border-top:1px solid var(--line);margin-top:6px;padding-top:10px"><span>Subtotal</span><span class="num">${money(t.subtotal)}</span></div>
    ${t.discount?`<div class="sumrow"><span>Discount</span><span class="num">−${money(t.discount)}</span></div>`:''}
    <div class="sumrow"><span>Delivery Fee</span><span class="num">${co.method==='delivery'?money(t.deliveryFee):'Free collection'}</span></div>
    ${db.settings.taxRate?`<div class="sumrow"><span>Tax</span><span class="num">${money(t.tax)}</span></div>`:''}
    <div class="sumrow total"><span>Total</span><span class="num">${money(t.total)}</span></div>
    <p class="tiny muted" style="margin:10px 0 0">${ic('check',12)} Your order is sent to the bakery for confirmation. Nothing is charged online.</p></aside></div></div>`;
};
function readCO(){
  const v = id => ($('#'+id)||{}).value;
  Object.assign(co, {name:v('c_name')||'', phone:v('c_phone')||'', email:v('c_email')||'', date:v('c_date')||'', time:v('c_time')||'', notes:v('c_notes')||'', allergy:v('c_allergy')||'', agree:$('#c_agree').checked});
  if ($('#c_zone')) co.zone = v('c_zone'); if ($('#c_addr')) co.address = v('c_addr');
}
function placeOrder(){
  readCO(); const e = {};
  if (co.name.trim().length < 2) e.name = 'Enter your full name.';
  if (!validPhone(co.phone)) e.phone = 'Enter a phone number we can call.';
  if (co.email && !validEmail(co.email)) e.email = 'Check the email address.';
  if (co.method === 'delivery' && co.address.trim().length < 6) e.address = 'Enter the delivery address.';
  const minDate = iso(addDays(today(), minLead()));
  if (!co.date) e.date = 'Choose a date.'; else if (co.date < minDate) e.date = 'The earliest date for this order is ' + fmtDate(minDate) + '.';
  else if (db.settings.blackout.includes(co.date)) e.date = 'The bakery is closed for orders on that date. Choose another day.';
  else { const sameDay = T.orders().filter(o => o.fulfilment.date === co.date && !['Cancelled','Refunded'].includes(o.status)).reduce((a,o)=>a+o.items.reduce((b,i)=>b+i.qty,0),0);
    if (sameDay + cartCount() > db.settings.maxCakesPerDay) e.date = 'We’re fully booked on that date. Please choose another day.'; }
  if (!co.time) e.time = 'Choose a time.';
  else if (co.date === iso(new Date())) { const n = new Date(); const [h,m] = co.time.split(':').map(Number); if (h*60+m < n.getHours()*60+n.getMinutes()+60) e.time = 'Choose a time at least an hour from now.'; }
  if (!co.agree) e.agree = 'Please confirm your order details.';
  co.errors = e;
  if (Object.keys(e).length) { render(); const f = $('.err'); if (f) f.scrollIntoView({block:'center'}); return; }
  if (co.busy) return;
  if (T.orders().some(o => o.idem === co.idem)) { go('confirm', {id: T.orders().find(o=>o.idem===co.idem).id}); return; }
  co.busy = true; render();
  // "server" re-validation: recompute every price from the catalogue, never trust the cart's numbers
  const unavailable = db.cart.filter(l => !product(l.productId) || !product(l.productId).available);
  if (unavailable.length) { co.busy = false; co.errors = {}; toast('Some items are no longer available. Please review your cart.'); go('cart'); return; }
  const t = cartTotals(cartPromo, co.zone, co.method);
  const zone = db.settings.delivery.zones.find(z => z.id === co.zone);
  const order = { id:'PS-' + (++db.seq), bakeryId:BAKERY.id, idem:co.idem, createdAt:new Date().toISOString(),
    items: db.cart.map(l => ({productId:l.productId, name:l.name, img:l.img, qty:l.qty, options:l.options, box:l.box||null, custom:l.custom||null, quoteId:l.quoteId||null,
      unit: l.lockedPrice != null ? l.lockedPrice : unitPrice(product(l.productId), l.options)})),
    subtotal:t.subtotal, discount:t.discount, promo:t.promo?t.promo.code:null, deliveryFee:t.deliveryFee, tax:t.tax, total:t.total,
    pricingSnapshot:{taxRate:db.settings.taxRate, zone:zone&&co.method==='delivery'?{name:zone.name, fee:zone.fee}:null, at:new Date().toISOString()},
    customer:{name:co.name.trim(), phone:co.phone.trim(), email:co.email.trim()},
    fulfilment:{method:co.method, zone:co.method==='delivery'&&zone?zone.name:null, address:co.method==='delivery'?co.address.trim():BAKERY.address, date:co.date, time:co.time},
    notes:co.notes, allergy:co.allergy, payment:{method:'Pay at '+(co.method==='delivery'?'delivery':'collection'), status:'Awaiting payment'},
    status:'Awaiting confirmation', stage:null, assigned:'', staffNotes:'', history:[{status:'Awaiting confirmation', at:new Date().toISOString(), by:'customer'}] };
  setTimeout(() => {
    db.orders.unshift(order);
    if (t.promo) t.promo.uses = (t.promo.uses||0) + 1;
    order.items.forEach(i => { if (i.quoteId) { const q = db.quotes.find(x => x.id === i.quoteId); if (q) { q.status = 'Converted to order'; q.orderId = order.id; q.history.push({status:'Converted to order', at:order.createdAt}); } } });
    if (db.user && !db.user.phone) db.user.phone = order.customer.phone;
    db.cart = []; cartPromo = ''; save(); co = null; renderHeader(); go('confirm', {id:order.id});
  }, 500);
}
V.confirm = (prm) => {
  const o = T.orders().find(x => x.id === prm.id); if (!o) return `<div class="wrap section"><div class="empty"><h3>Order not found</h3></div></div>`;
  return `<div class="wrap section" style="max-width:760px"><div class="panelc fade-in">
    <span class="pill ok">${ic('check',13)} Order received</span><h1 class="serif" style="font-size:34px;margin:10px 0 4px">Thank you, ${esc(o.customer.name.split(' ')[0])}!</h1>
    <p class="muted" style="margin:0">Your order <b class="num" style="color:var(--cocoa)">${o.id}</b> has been sent to Pa Sweet. The bakery will call ${esc(o.customer.phone)} to confirm.</p>
    <div class="stats" style="margin:18px 0"><div class="stat"><div class="k">Status</div><div style="margin-top:6px">${statusPill(o.status)}</div></div><div class="stat"><div class="k">Payment</div><div style="margin-top:6px">${statusPill(o.payment.status)}</div></div>
      <div class="stat"><div class="k">${o.fulfilment.method==='delivery'?'Delivery':'Collection'}</div><div class="small" style="margin-top:4px"><b>${fmtDate(o.fulfilment.date)}, ${o.fulfilment.time}</b></div></div></div>
    ${o.items.map(i => `<div class="sumrow small"><span>${i.qty}× ${esc(i.name)} <span class="muted">${esc(Object.values(i.options||{}).filter(Boolean).join(' · '))}</span></span><span class="num">${money(i.unit*i.qty)}</span></div>`).join('')}
    <div class="sumrow total"><span>Total</span><span class="num">${money(o.total)}</span></div>
    <p class="small muted">${o.fulfilment.method==='delivery'?'Delivering to: '+esc(o.fulfilment.address):`Collect from ${esc(BAKERY.address)}, ${esc(BAKERY.landmark)}.`} Questions? Call ${BAKERY.phones.join(' or ')}.</p>
    <div class="note">Email and SMS confirmations aren’t connected yet, so keep this order number. You can follow its status in <b>My Account → Order History</b> on this device.</div>
    <div class="row" style="margin-top:16px"><button class="btn" data-go="account" data-tab="orders">Track this order</button><button class="btn ghost" data-go="shop">Keep shopping</button></div></div></div>`;
};

/* ---------- AI Cake Studio ---------- */
const COLORS = [['Blush pink','#F4C3CC'],['Soft pink','#F7D7DD'],['White','#FBF8F4'],['Ivory','#F5ECD9'],['Gold','#D4A548'],['Lilac','#D8C6EA'],['Baby blue','#BCD7EE'],['Deep blue','#2A4A86'],['Mint','#BFE3D0'],['Lemon','#F6E6A1'],['Peach','#F6C8A9'],['Red','#C3283E'],['Chocolate','#5A3221'],['Black','#2A2224']];
const COLOR_WORDS = {'blush':'#F4C3CC','pink':'#F4C3CC','white':'#FBF8F4','ivory':'#F5ECD9','cream':'#F5ECD9','gold':'#D4A548','golden':'#D4A548','lilac':'#D8C6EA','lavender':'#D8C6EA','purple':'#8E5BB5','blue':'#BCD7EE','baby blue':'#BCD7EE','deep blue':'#2A4A86','navy':'#22355F','royal blue':'#2A4A86','mint':'#BFE3D0','green':'#7DB38F','yellow':'#F6E6A1','lemon':'#F6E6A1','peach':'#F6C8A9','orange':'#F0A35E','red':'#C3283E','burgundy':'#7D1D3A','maroon':'#7D1D3A','chocolate':'#5A3221','brown':'#7A4A2E','black':'#2A2224','silver':'#C9CDD2','teal':'#3E8C8C'};
const TEMPLATES = [
  {name:'Blush Roses', s:{shape:'round',tiers:2,primary:'#F4C3CC',secondary:'#FBF8F4',flowers:true,flowerColor:'#F09AAE',pearls:true,pearlColor:'#D4A548',drip:false,text:'Happy Birthday',occasion:'Birthday'}},
  {name:'Golden Birthday', s:{shape:'round',tiers:2,primary:'#F5ECD9',secondary:'#F6E6A1',drip:true,dripColor:'#D4A548',pearls:true,pearlColor:'#D4A548',flowers:false,sprinkles:true,text:'Happy Birthday',occasion:'Birthday'}},
  {name:'Choco Berry', s:{shape:'round',tiers:1,primary:'#7A4A2E',secondary:'#5A3221',drip:true,dripColor:'#3A1E16',berries:true,flowers:false,pearls:false,text:'',flavour:'Chocolate',occasion:'Birthday'}},
  {name:'Lilac Dream', s:{shape:'square',tiers:2,primary:'#D8C6EA',secondary:'#FBF8F4',flowers:true,flowerColor:'#FBF8F4',sprinkles:false,pearls:true,pearlColor:'#FBF8F4',text:'',occasion:'Baby shower'}},
  {name:'Sweetheart', s:{shape:'heart',tiers:1,primary:'#C3283E',secondary:'#FBF8F4',pearls:true,pearlColor:'#FBF8F4',flowers:false,berries:true,text:'Love You',occasion:'Anniversary'}},
  {name:'Wedding Ivory', s:{shape:'round',tiers:3,primary:'#FBF8F4',secondary:'#F5ECD9',ruffle:true,flowers:true,flowerColor:'#F7D7DD',pearls:true,pearlColor:'#D4A548',text:'',occasion:'Wedding'}}
];
function baseSpec(){ return {occasion:'Birthday', shape:'round', tiers:2, size:'8', flavour:'Vanilla', filling:'Vanilla buttercream', frosting:'smooth', primary:'#F4C3CC', secondary:'#FBF8F4',
  drip:false, dripColor:'#5A3221', flowers:true, flowerColor:'#F09AAE', pearls:true, pearlColor:'#D4A548', sprinkles:false, berries:false, ruffle:false,
  text:'Happy Birthday', textColor:'#9A6A2A', topper:'none', budget:'', notes:'', description:'', ref:null, refColors:[]}; }
let studio = { spec: baseSpec(), mode:'ai', opt:'shape', view:'3d', tpl:'Blush Roses', interp:null, designId:null };

function parseDesign(text){
  const t = ' ' + text.toLowerCase() + ' ', got = {}, found = [], questions = [], unsupported = [];
  const numw = {one:1,single:1,two:2,double:2,three:3,triple:3,'1':1,'2':2,'3':3,'4':4,'5':5};
  const tm = t.match(/(one|single|two|double|three|triple|\d)[\s-]*(tier|tiered|layer|storey)/); if (tm) { got.tiers = numw[tm[1]]; found.push(got.tiers + ' tier' + (got.tiers>1?'s':'')); if (got.tiers > 3) { unsupported.push('More than 3 tiers needs a conversation with the bakery'); got.tiers = 3; } }
  for (const sh of ['heart','square','round']) if (t.includes(sh)) { got.shape = sh; found.push(sh + ' shape'); break; }
  if (!got.shape && /rectang|sheet cake/.test(t)) { unsupported.push('Rectangular/sheet shape (preview shows square)'); got.shape = 'square'; }
  const sm = t.match(/(\d{1,2})\s*(?:inch|in\b|")/); if (sm) { const s = ['6','8','10'].reduce((a,b) => Math.abs(b-sm[1]) < Math.abs(a-sm[1]) ? b : a); got.size = s; found.push(s + ' inch'); }
  const cols = []; Object.keys(COLOR_WORDS).sort((a,b)=>b.length-a.length).forEach(w => { const re = new RegExp('\\b'+w+'\\b'); const idx = t.search(re); if (idx>=0 && !cols.some(c => c.idx<=idx && idx<c.idx+c.w.length+1)) cols.push({w, idx, hex:COLOR_WORDS[w]}); });
  cols.sort((a,b)=>a.idx-b.idx);
  const nonGold = cols.filter(c => !/gold/.test(c.w));
  if (nonGold[0]) { got.primary = nonGold[0].hex; found.push(nonGold[0].w + ' base'); }
  if (nonGold[1]) { got.secondary = nonGold[1].hex; found.push(nonGold[1].w + ' accents'); }
  if (cols.some(c => /gold/.test(c.w))) { got.pearls = true; got.pearlColor = '#D4A548'; found.push('gold details'); }
  const fl = studioCfg().flavours.map(f => f[0]).find(f => t.includes(f.toLowerCase())); if (fl) { got.flavour = fl; found.push(fl + ' sponge'); }
  const fm = t.match(/(\w+(?:\s\w+)?)\s+filling/) || t.match(/filled with\s+(\w+(?:\s\w+)?)/);
  if (fm) { const f = studioCfg().fillings.find(x => x.toLowerCase().includes(fm[1].split(' ').pop())); if (f) { got.filling = f; found.push(f + ' filling'); } else unsupported.push('Filling “' + fm[1] + '” — bakery to confirm'); }
  const deco = [['flowers',/flower|rose|floral|blossom|peon/],['drip',/drip/],['pearls',/pearl|bead/],['sprinkles',/sprinkle|confetti/],['berries',/berr|strawberr|cherr|fruit/],['ruffle',/ruffle|frill/]];
  deco.forEach(([k,re]) => { if (re.test(t)) { got[k] = true; found.push(k); } });
  if (/candle/.test(t)) { got.topper = 'candles'; found.push('candles'); } else if (/star|topper/.test(t)) { got.topper = 'star'; found.push('topper'); }
  if (/naked|semi[- ]naked/.test(t)) { got.frosting = 'naked'; found.push('naked finish'); }
  const fl2 = cols.find(c => t.slice(c.idx, c.idx+30).match(/flower|rose/)); if (got.flowers && fl2) got.flowerColor = fl2.hex;
  const q = text.match(/["“'‘]([^"”'’]{2,40})["”'’]/); if (q) { got.text = q[1]; found.push('message “' + q[1] + '”'); }
  else if (/\bname\b|message|written|writing|inscription/.test(t)) questions.push('What exact words should be written on the cake?');
  const occs = [['Birthday',/birthday|bday/],['Wedding',/wedding|bride/],['Anniversary',/anniversary/],['Graduation',/graduat/],['Baby shower',/baby shower|gender reveal/],['Engagement',/engage/],['Corporate',/corporate|office|company/],['Christmas',/christmas|xmas/]];
  const oc = occs.find(o => o[1].test(t)); if (oc) { got.occasion = oc[0]; found.push(oc[0].toLowerCase()); }
  const bm = text.match(/(?:le|sll?|leones?)\s?([\d,]{3,})/i) || text.match(/budget[^\d]{0,20}([\d,]{3,})/i); if (bm) { got.budget = bm[1].replace(/,/g,''); found.push('budget ' + money(+got.budget)); }
  if (/disney|marvel|frozen|spider|elsa|barbie|paw patrol|mickey|pokemon|minecraft|sonic|peppa|batman|superman/.test(t)) unsupported.push('Branded characters can’t be copied — the bakery can suggest an original design in the same colours and spirit');
  if (!got.flavour) questions.push('Which sponge flavour would you like?');
  if (!got.size) questions.push('How many guests are you expecting? (sets the size)');
  questions.push('What date is the celebration?');
  return {got, found, questions, unsupported};
}
function studioCfg(){ return db.settings.studio; }
function estimate(s){
  const c = studioCfg(), size = c.sizes.find(x => x.v === s.size) || c.sizes[0];
  const lines = [['Base cake (' + size.label + ')', size.base]];
  if (s.tiers > 1) lines.push(['Extra tier' + (s.tiers>2?'s':'') + ' ×' + (s.tiers-1), c.tierPrice*(s.tiers-1)]);
  if (c.shapeExtra[s.shape]) lines.push([s.shape[0].toUpperCase()+s.shape.slice(1) + ' shape', c.shapeExtra[s.shape]]);
  const fl = c.flavours.find(f => f[0] === s.flavour); if (fl && fl[1]) lines.push([s.flavour + ' sponge', fl[1]]);
  ['flowers','drip','pearls','sprinkles','berries','ruffle'].forEach(k => { if (s[k] && c.deco[k]) lines.push([k[0].toUpperCase()+k.slice(1), c.deco[k] * (k==='flowers'||k==='pearls'||k==='ruffle' ? Math.max(1, s.tiers-0.5) : 1)]); });
  if (s.topper !== 'none' && c.deco[s.topper]) lines.push([s.topper === 'candles' ? 'Candles' : 'Star topper', c.deco[s.topper]]);
  const sum = lines.reduce((a,l) => a + l[1], 0);
  const review = s.tiers >= 3 || (s.shape === 'heart' && s.tiers > 1) || !!(s.ref);
  return {lines, low: Math.round(sum/50)*50, high: Math.round(sum*1.25/50)*50, review};
}
function feasibility(s, date){
  const issues = [], c = studioCfg(), lead = db.settings.customLeadDays;
  if (s.tiers > c.maxTiers) issues.push(`We can preview up to ${c.maxTiers} tiers.`);
  if (s.shape === 'heart' && s.tiers > 2) issues.push('Heart cakes are limited to 2 tiers.');
  if ((s.text||'').length > 30) issues.push('Keep the written message to 30 characters or fewer.');
  if (s.ruffle && s.shape !== 'round') issues.push('Ruffle finish is only available on round cakes.');
  if (date) {
    const min = iso(addDays(today(), lead));
    if (date < min) issues.push(`Custom cakes need at least ${lead} days notice — the earliest date is ${fmtDate(min)}.`);
    if (db.settings.blackout.includes(date)) issues.push('The bakery isn’t taking orders for that date.');
    const n = T.quotes().filter(q => q.eventDate === date && !['Declined','Expired'].includes(q.status)).length;
    if (n >= db.settings.maxCustomPerDay) issues.push('Custom cake capacity for that date is full. Please choose another day.');
  }
  return issues;
}

V.studio = (prm) => {
  if (prm.occ) { studio.spec.occasion = prm.occ; prm.occ = undefined; }
  if (prm.design) { const d = db.designs.find(x => x.id === prm.design); if (d) { studio.spec = Object.assign(baseSpec(), JSON.parse(JSON.stringify(d.spec))); studio.designId = d.id; studio.tpl = null; } prm.design = undefined; }
  return `<div class="wrap"><div class="studio">
    <section class="panelc"><h1>Design Your Dream Cake</h1>
      <p class="muted small" style="margin:6px 0 0">Describe your vision or build it option by option, then customise it in 3D. Every design is reviewed by our bakers before a price is confirmed.</p>
      <div class="seg" role="tablist"><button class="${studio.mode==='ai'?'on':''}" data-act="smode" data-m="ai" role="tab">${ic('spark')} AI Assistant</button><button class="${studio.mode==='manual'?'on':''}" data-act="smode" data-m="manual" role="tab">${ic('pen')} Manual Design</button></div>
      <div id="smain"></div></section>
    <section><div class="viewer" id="viewer">
        <div class="vtabs"><button class="${studio.view==='3d'?'on':''}" data-act="sview" data-v="3d">3D View</button><button class="${studio.view==='photos'?'on':''}" data-act="sview" data-v="photos">Preview</button></div>
        <div class="vtools" ${studio.view!=='3d'?'hidden':''}><button data-act="v3" data-c="spin" aria-label="Auto rotate">${ic('rotate')}</button><button data-act="v3" data-c="in" aria-label="Zoom in">${ic('zin')}</button><button data-act="v3" data-c="out" aria-label="Zoom out">${ic('zout')}</button><button data-act="v3" data-c="reset" aria-label="Reset view">${ic('home')}</button></div>
        <div class="stage" id="stage" ${studio.view!=='3d'?'hidden':''}></div>
        <div id="photos" ${studio.view!=='photos'?'hidden':''}></div>
        <div class="hint" ${studio.view!=='3d'?'hidden':''}>Drag to rotate · scroll or pinch to zoom · illustrative model, not the finished cake</div></div>
      <div class="templates" aria-label="Start from a template">${TEMPLATES.map(tp => `<button class="tpl ${studio.tpl===tp.name?'on':''}" data-act="tpl" data-n="${tp.name}">${miniCake(tp.s)}${tp.name}</button>`).join('')}</div>
      <div class="price-card" id="pricecard"></div></section></div></div>`;
};
function miniCake(s){
  const tiers = s.tiers||1, out = [];
  for (let i = tiers-1; i >= 0; i--) { const w = 26 + i*12; out.push(`<i style="width:${w}px;height:13px;background:${s.primary};border:1px solid rgba(0,0,0,.08);${s.shape==='heart'?'border-radius:50% 50% 4px 4px;':''}${s.drip&&i===tiers-1?`box-shadow:inset 0 4px 0 ${s.dripColor}`:''}"></i>`); }
  return `<span class="mini" aria-hidden="true">${out.join('')}<i style="width:52px;height:3px;background:#7A4A2E;border-radius:2px"></i></span>`;
}
function renderStudioMain(){
  const s = studio.spec, c = studioCfg();
  let h = '';
  if (studio.mode === 'ai') {
    h = `<label class="f" for="sdesc">Describe your cake</label>
      <textarea class="in" id="sdesc" rows="4" style="margin-top:6px">${esc(s.description || 'I want a two-tier pink and white cake with flowers, for a birthday, with the message "Happy Birthday" and a budget of Le 1,500.')}</textarea>
      <button class="btn block" style="margin-top:10px" data-act="interpret">${ic('wand')} Generate Concepts ${ic('arrow')}</button>
      <div id="interp">${studio.interp ? interpHTML(studio.interp) : ''}</div>
      <div style="margin-top:16px"><div class="opt-label" style="margin-top:0">Upload inspiration (optional)</div>
        <label class="drop" id="drop" for="refFile">${ic('upload',20)}<div>Drop a photo here or <u>choose a file</u></div><div class="tiny">JPG, PNG or WebP · up to 5 MB</div></label><input type="file" id="refFile" accept="image/jpeg,image/png,image/webp" hidden>
        <div id="refbox">${refHTML()}</div></div>`;
  }
  h += `<div class="opt-label" style="margin-top:${studio.mode==='ai'?'20px':'0'}">Design Options</div><div class="optgrid">
    ${[['shape','box','Shape & Size'],['tiers','layers','Tiers'],['flavour','cake','Flavours'],['colors','palette','Colors'],['deco','flower','Decorations'],['writing','pen','Writing'],['toppers','star','Toppers'],['budget','coin','Budget']].map(o => `<button class="opt ${studio.opt===o[0]?'on':''}" data-act="sopt" data-o="${o[0]}">${ic(o[1])}${o[2]}</button>`).join('')}</div>
    <div class="optpanel" id="optpanel">${optPanel()}</div>
    <div class="row" style="margin-top:14px"><label class="f" style="flex:1">Occasion<select class="in" data-s="occasion">${['Birthday','Wedding','Anniversary','Graduation','Baby shower','Engagement','Corporate','Christmas','Other'].map(o => `<option ${o===s.occasion?'selected':''}>${o}</option>`).join('')}</select></label></div>
    <label class="f" style="margin-top:10px">Notes for the bakery<textarea class="in" data-s="notes" rows="2" style="min-height:56px" placeholder="Anything else? Colours to match, a theme…">${esc(s.notes)}</textarea></label>`;
  $('#smain').innerHTML = h;
  wireStudioMain();
}
function interpHTML(r){
  return `<div class="note fade-in" style="margin-top:12px;background:#fff"><b>Here’s what we understood</b> <span class="tiny">(local design parser — connect an AI service for smarter reading)</span>
    <div class="spec-chips">${r.found.length ? r.found.map(f => `<span>${esc(f)}</span>`).join('') : '<span>Nothing specific yet — try adding colours, tiers or decorations</span>'}</div>
    ${r.unsupported.length?`<div style="margin-top:8px">${r.unsupported.map(u => `<div class="small" style="color:var(--warn)">${ic('alert',13)} ${esc(u)}</div>`).join('')}</div>`:''}
    ${r.questions.length?`<div style="margin-top:8px"><b class="small">Still to decide</b>${r.questions.map(q => `<div class="small">• ${esc(q)}</div>`).join('')}</div>`:''}
    <p class="tiny" style="margin:8px 0 0">Your full description is kept with the design so the bakery sees every detail. Edit anything below.</p>
    <div class="row" style="margin-top:8px"><button class="btn sm soft" data-act="interp-undo">Undo changes</button></div></div>`;
}
function refHTML(){
  const s = studio.spec; if (!s.ref) return '';
  return `<div class="refprev"><img src="${s.ref}" alt="Your inspiration photo"><div style="flex:1;min-width:0"><div class="small"><b>Inspiration added</b></div>
    <div class="row" style="margin:4px 0;gap:5px">${s.refColors.map(c => `<button class="sw" style="background:${c};width:22px;height:22px" data-act="usecol" data-c="${c}" aria-label="Use colour ${c}"></button>`).join('')}</div>
    <div class="tiny muted">Colours picked from your photo — tap one to use it. Shapes and decorations in photos are read by the bakery, not automatically.</div>
    <button class="link-btn small" data-act="refrm">Remove photo</button></div></div>`;
}
function swatches(key){ const v = studio.spec[key]; return `<div class="swatches">${COLORS.map(([n,c]) => `<button class="sw ${v===c?'on':''}" style="background:${c}" data-act="scol" data-k="${key}" data-c="${c}" aria-label="${n}" title="${n}"></button>`).join('')}<label class="sw" style="background:conic-gradient(red,yellow,lime,cyan,blue,magenta,red);position:relative" title="Custom colour"><input type="color" data-colk="${key}" value="${v}" style="opacity:0;position:absolute;inset:0;width:100%;height:100%;cursor:pointer" aria-label="Custom colour"></label></div>`; }
function tog(key, label, sub){ return `<div class="toggle"><span>${label}${sub?`<br><span class="tiny muted">${sub}</span>`:''}</span><label class="switch"><input type="checkbox" data-t="${key}" ${studio.spec[key]?'checked':''} aria-label="${label}"><span></span></label></div>`; }
function optPanel(){
  const s = studio.spec, c = studioCfg(), D = c.deco;
  switch (studio.opt) {
    case 'shape': return `<div class="opt-label" style="margin-top:0">Shape</div><div class="chips">${['round','square','heart'].map(x => `<button class="chip ${s.shape===x?'on':''}" data-act="sset" data-k="shape" data-v="${x}">${x[0].toUpperCase()+x.slice(1)}${c.shapeExtra[x]?` +${money(c.shapeExtra[x])}`:''}</button>`).join('')}</div>
      <div class="opt-label">Size (bottom tier)</div><div class="chips">${c.sizes.map(z => `<button class="chip ${s.size===z.v?'on':''}" data-act="sset" data-k="size" data-v="${z.v}">${z.label} <span class="muted">(${z.serves})</span></button>`).join('')}</div>
      <p class="tiny muted" style="margin:8px 0 0">Servings are guides and vary with slice size and tiers.</p>`;
    case 'tiers': return `<div class="opt-label" style="margin-top:0">Number of tiers</div><div class="chips">${[1,2,3].map(n => `<button class="chip ${s.tiers===n?'on':''}" data-act="sset" data-k="tiers" data-v="${n}" ${s.shape==='heart'&&n>2?'disabled':''}>${n} tier${n>1?'s':''}</button>`).join('')}</div><p class="tiny muted" style="margin:8px 0 0">3-tier and multi-tier heart cakes always need bakery review before pricing.</p>`;
    case 'flavour': return `<label class="f">Sponge<select class="in" data-s="flavour">${c.flavours.map(f => `<option ${f[0]===s.flavour?'selected':''} value="${esc(f[0])}">${esc(f[0])}${f[1]?` (+${money(f[1])})`:''}</option>`).join('')}</select></label>
      <label class="f" style="margin-top:10px">Filling<select class="in" data-s="filling">${c.fillings.map(f => `<option ${f===s.filling?'selected':''}>${esc(f)}</option>`).join('')}</select></label>
      <div class="opt-label">Finish</div><div class="chips">${[['smooth','Smooth buttercream'],['naked','Semi-naked'],['ruffle','Ruffles']].map(x => `<button class="chip ${s.frosting===x[0]||(x[0]==='ruffle'&&s.ruffle)?'on':''}" data-act="finish" data-v="${x[0]}">${x[1]}</button>`).join('')}</div>
      <p class="tiny muted" style="margin:8px 0 0">Flavour list is a sample until Pa Sweet confirms its menu.</p>`;
    case 'colors': return `<div class="opt-label" style="margin-top:0">Main colour</div>${swatches('primary')}<div class="opt-label">Accent colour</div>${swatches('secondary')}`;
    case 'deco': return `${tog('flowers','Sugar flowers',money(D.flowers)+' per tier')}${s.flowers?`<div style="padding:4px 0 10px">${swatches('flowerColor')}</div>`:''}
      ${tog('drip','Drip',money(D.drip))}${s.drip?`<div style="padding:4px 0 10px">${swatches('dripColor')}</div>`:''}
      ${tog('pearls','Pearl border',money(D.pearls)+' per tier')}${s.pearls?`<div style="padding:4px 0 10px">${swatches('pearlColor')}</div>`:''}
      ${tog('berries','Fresh berries',money(D.berries))}${tog('sprinkles','Sprinkles',money(D.sprinkles))}${tog('ruffle','Ruffle tiers','Round cakes only · '+money(D.ruffle))}`;
    case 'writing': return `<label class="f">Message on the cake<input class="in" data-s="text" maxlength="30" value="${esc(s.text)}" placeholder="e.g. Happy Birthday Aminata"></label>
      <div class="tiny muted" style="margin-top:4px"><span id="tcount">${(s.text||'').length}</span>/30 characters · piped by hand, so lettering will look different from the preview</div>
      <div class="opt-label">Lettering colour</div>${swatches('textColor')}`;
    case 'toppers': return `<div class="chips">${[['none','No topper'],['candles','Candles · '+money(D.candles)],['star','Star topper · '+money(D.star)]].map(x => `<button class="chip ${s.topper===x[0]?'on':''}" data-act="sset" data-k="topper" data-v="${x[0]}">${x[1]}</button>`).join('')}</div><p class="tiny muted" style="margin:8px 0 0">Custom name toppers can be requested in your notes; the bakery will confirm.</p>`;
    case 'budget': return `<label class="f">Your budget (optional)<input class="in" data-s="budget" inputmode="numeric" value="${esc(s.budget)}" placeholder="e.g. 1500"></label><p class="tiny muted" style="margin:6px 0 0">Helps the bakery suggest options that fit. It doesn’t change the estimate.</p>`;
  }
  return '';
}
function wireStudioMain(scope){
  scope = scope || '#smain';
  $$(scope + ' [data-s]').forEach(el => el.addEventListener('input', () => { let v = el.value; if (el.dataset.s==='budget') v = v.replace(/[^\d]/g,''); studio.spec[el.dataset.s] = v; if (el.dataset.s==='text' && $('#tcount')) $('#tcount').textContent = v.length; studio.tpl = null; updateStudio(el.dataset.s === 'text' || el.dataset.s === 'notes' ? 'soft' : 'full'); }));
  $$(scope + ' [data-t]').forEach(el => el.addEventListener('change', () => { studio.spec[el.dataset.t] = el.checked; if (el.dataset.t==='ruffle' && el.checked && studio.spec.shape!=='round') { toast('Ruffles are available on round cakes only.'); } studio.tpl = null; refreshOpt(); updateStudio('full'); }));
  $$(scope + ' [data-colk]').forEach(el => el.addEventListener('input', () => { studio.spec[el.dataset.colk] = el.value; studio.tpl = null; updateStudio('full'); }));
  const f = $('#refFile'), d = $('#drop');
  if (f && scope === '#smain') { f.onchange = () => f.files[0] && loadRef(f.files[0]);
    ['dragover','dragenter'].forEach(ev => d.addEventListener(ev, e => { e.preventDefault(); d.classList.add('over'); }));
    ['dragleave','drop'].forEach(ev => d.addEventListener(ev, e => { e.preventDefault(); d.classList.remove('over'); }));
    d.addEventListener('drop', e => { const file = e.dataTransfer.files[0]; if (file) loadRef(file); }); }
}
function refreshOpt(){ $('#optpanel').innerHTML = optPanel(); $$('.opt').forEach(b => b.classList.toggle('on', b.dataset.o === studio.opt)); wireStudioMain('#optpanel'); }
function loadRef(file){
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) { toast('Please choose a JPG, PNG or WebP image.'); return; }
  if (file.size > 5*1024*1024) { toast('That photo is over 5 MB. Please choose a smaller one.'); return; }
  const r = new FileReader(); r.onload = () => { const im = new Image(); im.onload = () => {
    const cv = document.createElement('canvas'), k = Math.min(1, 480/Math.max(im.width, im.height)); cv.width = im.width*k; cv.height = im.height*k;
    const cx = cv.getContext('2d'); cx.drawImage(im, 0, 0, cv.width, cv.height);
    studio.spec.ref = cv.toDataURL('image/jpeg', .78);
    const data = cx.getImageData(0,0,cv.width,cv.height).data, buckets = {};
    for (let i = 0; i < data.length; i += 16) { const q = [data[i],data[i+1],data[i+2]].map(v => Math.round(v/40)*40); const key = q.join(','); buckets[key] = (buckets[key]||0) + 1; }
    studio.spec.refColors = Object.entries(buckets).sort((a,b)=>b[1]-a[1]).map(e => e[0].split(',').map(Number)).filter((c,i,a) => a.findIndex(o => Math.abs(o[0]-c[0])+Math.abs(o[1]-c[1])+Math.abs(o[2]-c[2]) < 90) === i).slice(0,6).map(c => '#'+c.map(v=>Math.min(255,v).toString(16).padStart(2,'0')).join(''));
    $('#refbox').innerHTML = refHTML(); updateStudio('soft'); }; im.src = r.result; }; r.readAsDataURL(file);
}
function renderPrice(){
  const s = studio.spec, e = estimate(s), issues = feasibility(s);
  $('#pricecard').innerHTML = `<div class="row" style="justify-content:space-between;align-items:flex-start"><div><div class="small muted">Estimated Price</div>
      ${e.review ? '<div class="big" style="font-size:19px">Price requires bakery review</div><div class="small muted">Indicative range ' + money(e.low) + ' – ' + money(e.high) + '</div>' : `<div class="big num">${money(e.low)} – ${money(e.high)}</div>`}
      <div class="small muted">Final price is confirmed by the bakery after review.</div></div>
      <details style="font-size:12.5px"><summary class="link-btn" style="list-style:none">How it’s worked out</summary><div style="margin-top:6px;min-width:200px">${e.lines.map(l => `<div class="sumrow" style="padding:2px 0"><span>${esc(l[0])}</span><span class="num">${money(l[1])}</span></div>`).join('')}<div class="tiny muted">Upper figure allows for detail work. ${db.settings.pricesConfirmed?'':'Sample pricing rules.'}</div></div></details></div>
    ${s.budget && +s.budget < e.low ? `<p class="small" style="color:var(--warn);margin:8px 0 0">${ic('alert',13)} This design is above your budget of ${money(+s.budget)}. Try fewer tiers or decorations.</p>` : ''}
    ${issues.length ? issues.map(i => `<p class="small" style="color:var(--warn);margin:8px 0 0">${ic('alert',13)} ${esc(i)}</p>`).join('') : ''}
    <div class="spec-chips">${[s.tiers+' tier'+(s.tiers>1?'s':''), s.shape, (studioCfg().sizes.find(z=>z.v===s.size)||{}).label, s.flavour, s.filling, s.frosting==='naked'?'semi-naked':s.ruffle?'ruffles':'smooth'].concat(['flowers','drip','pearls','berries','sprinkles'].filter(k => s[k])).concat(s.topper!=='none'?[s.topper]:[]).concat(s.text?['“'+s.text+'”']:[]).map(x => `<span>${esc(x)}</span>`).join('')}</div>
    <div class="row" style="margin-top:14px"><button class="btn ghost" style="flex:1" data-act="savedesign">${ic('heart')} Save Design</button><button class="btn" style="flex:1" data-act="quote">Request a Quote ${ic('arrow')}</button></div>`;
}
function renderPhotos(){
  $('#photos').innerHTML = `<div class="concepts">${s_concepts().map(c => `<figure><img src="${c.src}" alt="${esc(c.cap)}"><figcaption>${esc(c.cap)}</figcaption></figure>`).join('')}</div>
    <div class="note" style="margin:0 14px 14px">AI image generation isn’t connected yet, so these are photos for inspiration${studio.spec.ref?' plus your uploaded photo':''}. Your design is shown as an interactive 3D model in the 3D View.</div>`;
}
function s_concepts(){ const a = []; if (studio.spec.ref) a.push({src:studio.spec.ref, cap:'Your inspiration photo'}); a.push({src:IMG.studio, cap:'Example: blush two-tier birthday cake'},{src:IMG.design, cap:'Example: rose-decorated cake'},{src:IMG.chocFudge, cap:'Example: chocolate drip cake'}); return a.slice(0,4); }
let updT;
function buildCake(){ if (!cake3d) return; try { cake3d.build(studio.spec); } catch(err) { console.error('3D preview failed, using 2D', err); try { cake3d.destroy(); } catch(_) {} const st = $('#stage'); if (st) { cake3d = fallback2D(st); cake3d.build(studio.spec); } } }
function updateStudio(kind){ renderPrice(); clearTimeout(updT); updT = setTimeout(buildCake, kind==='soft'?250:30); }

function quoteForm(){
  const s = studio.spec, u = db.user || {}, min = iso(addDays(today(), db.settings.customLeadDays));
  modal('Request a quote', `<p class="small muted" style="margin:0 0 14px">Our bakers check that the design can be made, confirm the price, and contact you. Nothing is charged now.</p>
    <form id="qForm" novalidate><div class="fgrid">
    <label class="f">Your name<input class="in" id="q_name" value="${esc(u.name||'')}" autocomplete="name"></label>
    <label class="f">Phone<input class="in" id="q_phone" value="${esc(u.phone||'')}" inputmode="tel" autocomplete="tel"></label>
    <label class="f">Email (optional)<input class="in" id="q_email" type="email" value="${esc(u.email||'')}"></label>
    <label class="f">Celebration date<input class="in" id="q_date" type="date" min="${min}"></label>
    <label class="f">Collection or delivery<select class="in" id="q_method"><option value="collection">Collect from bakery</option>${db.settings.delivery.enabled?'<option value="delivery">Delivery</option>':''}</select></label>
    <label class="f">Guests (approx.)<input class="in" id="q_guests" inputmode="numeric" placeholder="e.g. 30"></label></div>
    <label class="f" style="margin-top:10px">Anything else?<textarea class="in" id="q_notes" rows="2" style="min-height:56px">${esc(s.notes)}</textarea></label>
    ${s.ref?'<label class="check" style="margin-top:10px"><input type="checkbox" id="q_ref" checked> Share my inspiration photo with the bakery</label>':''}
    <label class="check" style="margin-top:10px"><input type="checkbox" id="q_consent"> Pa Sweet may contact me about this quote by phone, WhatsApp or email.</label>
    <div id="q_err" class="err" style="margin-top:8px" role="alert"></div>
    <button class="btn block" style="margin-top:12px" type="submit">Send to the bakery</button></form>`, () => {
    $('#qForm').onsubmit = e => { e.preventDefault();
      const v = id => ($('#'+id)||{}).value.trim(); const errs = [];
      if (v('q_name').length < 2) errs.push('Enter your name.'); if (!validPhone(v('q_phone'))) errs.push('Enter a phone number.');
      if (v('q_email') && !validEmail(v('q_email'))) errs.push('Check the email address.');
      if (!v('q_date')) errs.push('Choose the celebration date.'); if (!$('#q_consent').checked) errs.push('Tick the box so the bakery can contact you.');
      errs.push(...feasibility(s, v('q_date')).filter(x => /notice|date|capacity|taking/.test(x)));
      if (errs.length) { $('#q_err').innerHTML = errs.map(esc).join('<br>'); return; }
      const est = estimate(s), spec = JSON.parse(JSON.stringify(s)); if (!($('#q_ref')||{}).checked) { spec.ref = null; spec.refColors = []; }
      const q = {id:'Q-' + (++db.seq), bakeryId:BAKERY.id, createdAt:new Date().toISOString(), status:'Ready for bakery review', spec, estimate:{low:est.low, high:est.high, review:est.review, lines:est.lines},
        customer:{name:v('q_name'), phone:v('q_phone'), email:v('q_email')}, eventDate:v('q_date'), method:v('q_method'), guests:v('q_guests'), notes:v('q_notes'),
        quotedPrice:null, staffNotes:'', messages:[], history:[{status:'Ready for bakery review', at:new Date().toISOString()}]};
      db.quotes.unshift(q); if (!db.user) {} saveDesign(true, q.id); save(); closeLayer();
      modal('Sent to the bakery', `<p>Your design request <b>${q.id}</b> is with Pa Sweet. You’ll get a call on ${esc(q.customer.phone)} once it’s reviewed.</p>
        <p class="small muted">Status updates appear under <b>My Account → Saved Designs</b> on this device.</p><div class="row"><button class="btn" data-go="account" data-tab="designs">View my designs</button><button class="btn ghost" data-act="close">Keep designing</button></div>`);
    };
  });
}
function saveDesign(silent, quoteId){
  const s = studio.spec, e = estimate(s);
  let d = studio.designId && db.designs.find(x => x.id === studio.designId);
  const title = (s.occasion||'Cake') + ' · ' + s.tiers + '-tier ' + s.shape;
  if (d) { d.revisions.push({at:d.updatedAt, spec:d.spec}); d.revisions = d.revisions.slice(-5); Object.assign(d, {spec:JSON.parse(JSON.stringify(s)), updatedAt:new Date().toISOString(), estimate:[e.low,e.high]}); }
  else { d = {id:uid('d'), bakeryId:BAKERY.id, title, spec:JSON.parse(JSON.stringify(s)), createdAt:new Date().toISOString(), updatedAt:new Date().toISOString(), estimate:[e.low,e.high], revisions:[], quoteId:null}; db.designs.unshift(d); studio.designId = d.id; }
  if (quoteId) d.quoteId = quoteId;
  save(); if (!silent) toast('Design saved', 'View', () => go('account', {tab:'designs'}));
}

/* ---------- 3D cake (Three.js r128) ---------- */
let cake3d = null;
function makeCake3D(el){
  if (!window.THREE) return null;
  const THREE = window.THREE;
  let renderer;
  try { renderer = new THREE.WebGLRenderer({antialias:true, alpha:true, preserveDrawingBuffer:false}); } catch(e) { return null; }
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio||1)); renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputEncoding = THREE.sRGBEncoding; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
  el.appendChild(renderer.domElement);
  const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  scene.add(new THREE.HemisphereLight(0xfff6ef, 0xd8b6a6, 0.75));
  const key = new THREE.DirectionalLight(0xfff1e6, 1.0); key.position.set(4, 8, 6); key.castShadow = true; key.shadow.mapSize.set(1024,1024);
  Object.assign(key.shadow.camera, {left:-4, right:4, top:6, bottom:-2}); key.shadow.camera.updateProjectionMatrix(); key.shadow.bias = -0.0005; scene.add(key);
  const fill = new THREE.DirectionalLight(0xffe0e6, 0.35); fill.position.set(-5, 3, -2); scene.add(fill);
  const ground = new THREE.Mesh(new THREE.CircleGeometry(6, 48), new THREE.ShadowMaterial({opacity:0.16})); ground.rotation.x = -Math.PI/2; ground.receiveShadow = true; scene.add(ground);
  const root = new THREE.Group(); scene.add(root);
  let cakeH = 2, yaw = 0.5, pitch = 0.32, dist = 9, auto = true, raf = 0, last = performance.now();
  const lin = c => new THREE.Color(c).convertSRGBToLinear();
  const mat = (c, r, m) => new THREE.MeshStandardMaterial({color:lin(c), roughness:r==null?0.62:r, metalness:m||0});
  function heartShape(R){ const s = new THREE.Shape(), k = R/10.5, P = (x,y) => [(x-5)*k, -(y-9.5)*k];
    s.moveTo(...P(5,5)); s.bezierCurveTo(...P(5,5),...P(4,0),...P(0,0)); s.bezierCurveTo(...P(-6,0),...P(-6,7),...P(-6,7)); s.bezierCurveTo(...P(-6,11),...P(-3,15.4),...P(5,19));
    s.bezierCurveTo(...P(12,15.4),...P(16,11),...P(16,7)); s.bezierCurveTo(...P(16,7),...P(16,0),...P(10,0)); s.bezierCurveTo(...P(7,0),...P(5,5),...P(5,5)); return s; }
  function perimeter(shape, R, n, out){ out = out || 1; const pts = [];
    if (shape === 'round') for (let i=0;i<n;i++){ const a = i/n*Math.PI*2; pts.push([Math.sin(a)*R*out, Math.cos(a)*R*out, a]); }
    else if (shape === 'square') { for (let i=0;i<n;i++){ const t = i/n*4, side = Math.floor(t), f = t-side, L = R*out; let x,z;
      if (side===0){x=-L+2*L*f; z=L;} else if (side===1){x=L; z=L-2*L*f;} else if (side===2){x=L-2*L*f; z=-L;} else {x=-L; z=-L+2*L*f;} pts.push([x,z,0]); } }
    else { heartShape(R).getSpacedPoints(n).slice(0,n).forEach(p => pts.push([p.x*out, -p.y*out, 0])); }
    return pts; }
  function textTexture(txt, color){ const c = document.createElement('canvas'); c.width = 1024; c.height = 256; const x = c.getContext('2d');
    let size = 120; x.font = `italic 700 ${size}px "Playfair Display", Georgia, serif`; while (x.measureText(txt).width > 960 && size > 40) { size -= 6; x.font = `italic 700 ${size}px "Playfair Display", Georgia, serif`; }
    x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = color; x.shadowColor = 'rgba(0,0,0,.18)'; x.shadowBlur = 4; x.fillText(txt, 512, 132);
    const t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; t.anisotropy = 4; return t; }
  function rose(color, sc){ const g = new THREE.Group(), m = mat(color, 0.55), dark = mat(new THREE.Color(color).multiplyScalar(0.82).getHex(), 0.55);
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.06, 14, 10), dark); core.scale.set(1,0.8,1); g.add(core);
    for (let ring=0; ring<2; ring++) for (let i=0;i<6;i++){ const a = i/6*Math.PI*2 + ring*0.5, r = 0.07 + ring*0.05; const p = new THREE.Mesh(new THREE.SphereGeometry(0.065+ring*0.012, 12, 8), ring?m:dark);
      p.scale.set(1, 0.55, 0.8); p.position.set(Math.cos(a)*r, -0.01 - ring*0.02, Math.sin(a)*r); p.rotation.y = -a; g.add(p); }
    const leaf = mat(0x7DA77F, 0.6); for (const a of [0.6, 3.6]) { const l = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 6), leaf); l.scale.set(1.8, 0.3, 0.8); l.position.set(Math.cos(a)*0.17, -0.04, Math.sin(a)*0.17); l.rotation.y = -a; g.add(l); }
    g.scale.setScalar(sc||1); g.traverse(o => { if (o.isMesh) o.castShadow = true; }); return g; }
  function clear(){ while (root.children.length) { const c = root.children[root.children.length-1]; root.remove(c); c.traverse(o => { if (o.geometry) o.geometry.dispose(); if (o.material) { (Array.isArray(o.material)?o.material:[o.material]).forEach(m => { if (m.map) m.map.dispose(); m.dispose(); }); } }); } }
  function build(s){
    clear();
    const sizeR = {6:1.05, 8:1.3, 10:1.55}[s.size] || 1.3, h = 0.85, gap = 0.0;
    const tiers = Math.min(3, Math.max(1, s.tiers|0)), shape = s.shape || 'round';
    const naked = s.frosting === 'naked', sponge = {Chocolate:'#6B3E26','Red velvet':'#9E2B33',Lemon:'#F3DC8C',Strawberry:'#F2B6B8'}[s.flavour] || '#EFD5A4';
    // stand
    const standR = sizeR*1.28;
    const plate = new THREE.Mesh(new THREE.CylinderGeometry(standR, standR*0.98, 0.09, 64), mat('#8A5636', 0.5)); plate.position.y = 0.62; plate.castShadow = plate.receiveShadow = true; root.add(plate);
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.24, 0.55, 32), mat('#7A4A2E', 0.5)); stem.position.y = 0.3; stem.castShadow = true; root.add(stem);
    const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.72, 0.08, 48), mat('#7A4A2E', 0.5)); foot.position.y = 0.04; foot.castShadow = true; root.add(foot);
    let y = 0.665; const tops = [];
    for (let i=0;i<tiers;i++){
      const R = sizeR * Math.pow(0.72, i), body = mat(naked ? sponge : s.primary, naked?0.8:0.6);
      let geo;
      if (shape === 'round') geo = new THREE.CylinderGeometry(R, R, h, 72, 1);
      else if (shape === 'square') geo = new THREE.BoxGeometry(R*1.8, h, R*1.8, 1, 1, 1);
      else { geo = new THREE.ExtrudeGeometry(heartShape(R), {depth:h-0.06, bevelEnabled:true, bevelThickness:0.03, bevelSize:0.03, bevelSegments:3, curveSegments:40}); geo.rotateX(-Math.PI/2); geo.translate(0, -h/2+0.03, 0); }
      const m = new THREE.Mesh(geo, body); m.position.y = y + h/2; m.castShadow = m.receiveShadow = true; root.add(m);
      const Reff = shape === 'square' ? R*0.9 : shape === 'heart' ? R*0.92 : R;
      if (naked) { // frosting bands between sponge layers
        for (const fy of [0.33, 0.66]) { const band = shape==='round' ? new THREE.CylinderGeometry(R+0.006, R+0.006, 0.07, 72, 1, true) : shape==='square' ? new THREE.BoxGeometry(R*1.81, 0.07, R*1.81) : null;
          if (band) { const bm = new THREE.Mesh(band, mat(s.secondary||'#FBF8F4', 0.7)); bm.position.y = y + h*fy; root.add(bm); } }
        const topc = new THREE.Mesh(shape==='round'?new THREE.CylinderGeometry(R+0.01,R+0.01,0.05,72):shape==='square'?new THREE.BoxGeometry(R*1.82,0.05,R*1.82):new THREE.CylinderGeometry(0.01,0.01,0.01,3), mat(s.secondary||'#FBF8F4', 0.6)); topc.position.y = y + h - 0.02; root.add(topc);
      }
      if (s.ruffle && shape === 'round') for (let k=0;k<4;k++){ const tor = new THREE.Mesh(new THREE.TorusGeometry(R+0.02, 0.055, 10, 72), mat(s.primary, 0.6)); tor.rotation.x = Math.PI/2; tor.position.y = y + 0.12 + k*(h-0.2)/3; tor.castShadow = true; root.add(tor); }
      const pearlM = s.pearls ? mat(s.pearlColor, 0.25, /D4A548/i.test(s.pearlColor)?0.6:0.1) : null, pearlG = s.pearls ? new THREE.SphereGeometry(0.048, 12, 8) : null;
      if (s.pearls) perimeter(shape, Reff, Math.round(Reff*34), 1.03).forEach(p => { const b = new THREE.Mesh(pearlG, pearlM); b.position.set(p[0], y+0.045, p[1]); b.castShadow = true; root.add(b); });
      if (i === tiers-1 && s.drip) {
        const cap = shape==='round'?new THREE.CylinderGeometry(R+0.015,R+0.015,0.06,72):shape==='square'?new THREE.BoxGeometry(R*1.83,0.06,R*1.83):(()=>{const g=new THREE.ExtrudeGeometry(heartShape(R*1.01),{depth:0.06,bevelEnabled:false,curveSegments:40}); g.rotateX(-Math.PI/2); return g;})();
        const capm = new THREE.Mesh(cap, mat(s.dripColor, 0.3)); capm.position.y = shape==='heart' ? y+h-0.03 : y + h; root.add(capm);
        perimeter(shape, Reff, Math.round(Reff*20), 1.012).forEach((p,k) => { const L = 0.18 + ((Math.sin(k*12.9898)*43758.5453)%1+1)%1 * 0.36;
          const d = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, L, 10), mat(s.dripColor, 0.3)); d.position.set(p[0], y + h - L/2, p[1]); root.add(d);
          const e = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 8), mat(s.dripColor, 0.3)); e.position.set(p[0], y + h - L, p[1]); root.add(e); });
      }
      if (i < tiers-1 && !naked) { const pr = shape==='round'?new THREE.TorusGeometry(R*0.72+0.02, 0.035, 8, 64):null; if (pr && !s.pearls) { const pm = new THREE.Mesh(pr, mat(s.secondary,0.5)); pm.rotation.x = Math.PI/2; pm.position.y = y+h+0.02; root.add(pm); } }
      if (i === 0 && s.text) {
        const tex = textTexture(s.text, s.textColor || '#9A6A2A');
        const tm = new THREE.MeshStandardMaterial({map:tex, transparent:true, roughness:0.6, depthWrite:false});
        let tg, ty = y + h*0.52;
        if (shape === 'round') { tg = new THREE.CylinderGeometry(R+0.012, R+0.012, h*0.42, 64, 1, true, -Math.PI*0.42, Math.PI*0.84); }
        else if (shape === 'square') { tg = new THREE.PlaneGeometry(R*1.7, h*0.42); }
        if (tg) { const tmesh = new THREE.Mesh(tg, tm); tmesh.position.y = ty; if (shape === 'square') tmesh.position.z = R*0.9+0.012; root.add(tmesh); }
        else { const pl = new THREE.Mesh(new THREE.PlaneGeometry(R*1.2, R*0.3), tm); pl.rotation.x = -Math.PI/2; pl.position.set(0, y+h+0.04, R*0.15); root.add(pl); }
      }
      tops.push({y:y+h, R:Reff, i}); y += h + gap;
    }
    const top = tops[tops.length-1];
    if (s.flowers) {
      const n = Math.max(3, Math.round(top.R*4)); perimeter(shape, top.R, n, 0.72).forEach((p,k) => { if (shape==='heart' || k%2===0 || tiers===1) { const r = rose(s.flowerColor, 1 + (k%3)*0.15); r.position.set(p[0], top.y+0.06, p[1]); root.add(r); } });
      // cascade down the front of lower tiers
      tops.slice(0,-1).forEach(tt => { [-0.5, 0.15, 0.6].forEach((a,k) => { const r = rose(s.flowerColor, 0.9 + k*0.12); const RR = tt.R*0.72 + 0.12; r.position.set(Math.sin(a)*RR, tt.y + 0.06, Math.cos(a)*RR); root.add(r); }); });
      const big = rose(s.flowerColor, 1.6); big.position.set(top.R*0.1, top.y + 0.08, top.R*0.05); root.add(big);
    }
    if (s.berries) { const n = 7; for (let k=0;k<n;k++){ const a = k/n*Math.PI*2 + 0.3, r = top.R*0.55; const b = new THREE.Mesh(new THREE.SphereGeometry(0.085, 14, 10), mat('#C31E35', 0.3));
      b.scale.set(1,1.15,1); b.position.set(Math.sin(a)*r, top.y + 0.09, Math.cos(a)*r); b.castShadow = true; root.add(b);
      const lf = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.05, 6), mat('#4E8B4F')); lf.position.set(b.position.x, b.position.y + 0.1, b.position.z); root.add(lf); } }
    if (s.sprinkles) { const cols = ['#F49AC1','#8FD3F4','#F6E27F','#FFFFFF','#B79CED','#F59A6B'].map(c => mat(c, 0.5)), sg = new THREE.CylinderGeometry(0.012, 0.012, 0.07, 5); for (let k=0;k<110;k++){ const a = Math.random()*Math.PI*2, r = Math.sqrt(Math.random())*top.R*(shape==='heart'?0.55:0.85);
      const sp = new THREE.Mesh(sg, cols[k%cols.length]); sp.position.set(Math.sin(a)*r, top.y + 0.015, Math.cos(a)*r); sp.rotation.set(Math.PI/2, 0, Math.random()*Math.PI); root.add(sp); } }
    if (s.topper === 'candles') { for (let k=0;k<5;k++){ const a = k/5*Math.PI*2, r = top.R*0.4; const c = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.4, 10), mat(['#F49AC1','#8FD3F4','#F6E27F','#B79CED','#FFFFFF'][k], 0.5));
      c.position.set(Math.sin(a)*r, top.y + 0.2, Math.cos(a)*r); c.castShadow = true; root.add(c);
      const fl = new THREE.Mesh(new THREE.SphereGeometry(0.04, 10, 8), new THREE.MeshStandardMaterial({color:0xffb347, emissive:0xff8c1a, emissiveIntensity:1.4})); fl.scale.set(1,1.6,1); fl.position.set(c.position.x, top.y + 0.45, c.position.z); root.add(fl); } }
    if (s.topper === 'star') { const st = new THREE.Shape(); for (let k=0;k<10;k++){ const a = k/10*Math.PI*2 - Math.PI/2, r = k%2 ? 0.12 : 0.28; k ? st.lineTo(Math.cos(a)*r, -Math.sin(a)*r) : st.moveTo(Math.cos(a)*r, -Math.sin(a)*r); }
      const sg = new THREE.ExtrudeGeometry(st, {depth:0.05, bevelEnabled:true, bevelSize:0.015, bevelThickness:0.015, bevelSegments:2}); const sm = new THREE.Mesh(sg, mat('#D4A548', 0.3, 0.7));
      sm.position.set(0, top.y + 0.75, 0); sm.castShadow = true; root.add(sm); const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.012,0.012,0.5,6), mat('#D4A548',0.4)); stick.position.set(0, top.y+0.25, 0.025); root.add(stick); }
    cakeH = y; frame();
  }
  function frame(){ const w = el.clientWidth||400, hh = el.clientHeight||500; renderer.setSize(w, hh, false); cam.aspect = w/hh; cam.updateProjectionMatrix();
    const ty = cakeH*0.5 + 0.15; cam.position.set(Math.sin(yaw)*Math.cos(pitch)*dist, ty + Math.sin(pitch)*dist, Math.cos(yaw)*Math.cos(pitch)*dist); cam.lookAt(0, ty, 0); renderer.render(scene, cam); }
  function loop(t){ raf = requestAnimationFrame(loop); const dt = Math.min(0.05, (t-last)/1000); last = t; if (auto) yaw += dt*0.35; frame(); }
  raf = requestAnimationFrame(loop);
  // pointer controls
  const ptrs = new Map(); let pinch0 = 0, dist0 = dist;
  const cv = renderer.domElement;
  cv.addEventListener('pointerdown', e => { cv.setPointerCapture(e.pointerId); ptrs.set(e.pointerId, [e.clientX, e.clientY]); auto = false; if (ptrs.size === 2) { const [a,b] = [...ptrs.values()]; pinch0 = Math.hypot(a[0]-b[0], a[1]-b[1]); dist0 = dist; } });
  cv.addEventListener('pointermove', e => { if (!ptrs.has(e.pointerId)) return; const prev = ptrs.get(e.pointerId); ptrs.set(e.pointerId, [e.clientX, e.clientY]);
    if (ptrs.size === 1) { yaw -= (e.clientX-prev[0])*0.008; pitch = Math.max(-0.1, Math.min(1.35, pitch + (e.clientY-prev[1])*0.006)); }
    else if (ptrs.size === 2) { const [a,b] = [...ptrs.values()]; const d = Math.hypot(a[0]-b[0], a[1]-b[1]); dist = Math.max(4.5, Math.min(15, dist0 * pinch0 / d)); } });
  const up = e => ptrs.delete(e.pointerId); cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
  cv.addEventListener('wheel', e => { e.preventDefault(); dist = Math.max(4.5, Math.min(15, dist + e.deltaY*0.006)); auto = false; }, {passive:false});
  const ro = new ResizeObserver(() => frame()); ro.observe(el);
  return { build, cmd(c){ if (c==='spin') auto = !auto; if (c==='in') dist = Math.max(4.5, dist-1); if (c==='out') dist = Math.min(15, dist+1); if (c==='reset') { yaw = 0.5; pitch = 0.32; dist = 9; auto = true; } },
    destroy(){ cancelAnimationFrame(raf); ro.disconnect(); clear(); renderer.dispose(); if (renderer.forceContextLoss) renderer.forceContextLoss(); cv.remove(); } };
}
function fallback2D(el){
  el.innerHTML = `<div style="height:100%;display:grid;place-items:center;padding:20px;text-align:center"><div id="flat"></div></div>`;
  return { build(s){ const tiers = s.tiers, parts = []; for (let i=tiers-1;i>=0;i--) { const w = 120 + i*60; parts.push(`<div style="width:${w}px;height:70px;margin:0 auto;background:${s.frosting==='naked'?'#EFD5A4':s.primary};border-radius:${s.shape==='round'?'14px 14px 8px 8px':s.shape==='heart'?'50% 50% 10px 10px':'4px'};border-bottom:6px solid ${s.pearls?s.pearlColor:'transparent'};${s.drip&&i===tiers-1?`box-shadow:inset 0 14px 0 ${s.dripColor}`:''};display:grid;place-items:center;font-family:var(--f-display);font-style:italic;color:${s.textColor}">${i===0&&s.text?esc(s.text):''}</div>`); }
      $('#flat', el).innerHTML = parts.join('') + `<div style="width:260px;height:10px;background:#8A5636;border-radius:4px;margin:0 auto"></div><p class="small muted" style="margin-top:12px">Simple 2D preview — your browser can’t show the 3D model.</p>`; },
    cmd(){}, destroy(){ el.innerHTML = ''; } };
}
function mountStudio(){
  renderStudioMain(); renderPrice(); renderPhotos();
  const stage = $('#stage');
  if (studio.view === '3d') { let m3 = null; try { m3 = makeCake3D(stage); } catch(err) { console.error(err); } cake3d = m3 || fallback2D(stage); buildCake(); if (document.fonts && document.fonts.ready) document.fonts.ready.then(buildCake); }
  cleanup = () => { if (cake3d) { cake3d.destroy(); cake3d = null; } };
}

/* ---------- Account ---------- */
V.account = (prm) => {
  const tab = prm.tab || 'profile';
  const tabs = [['profile','user','Profile'],['orders','box','Order History'],['favourites','heart','Favorites'],['designs','cake','Saved Designs'],['rewards','star','Rewards'],['celebrations','cal','Celebrations'],['addresses','pin','Addresses'],['settings','settings','Settings']];
  const u = db.user;
  const side = `<nav class="side" aria-label="Account">${tabs.map(t => `<button class="${tab===t[0]?'on':''}" data-go="account" data-tab="${t[0]}">${ic(t[1])}${t[2]}</button>`).join('')}${u?`<button data-act="logout">${ic('logout')}Logout</button>`:''}</nav>`;
  return `<div class="wrap"><div class="acct">${side}<section style="min-width:0">${acctTab(tab)}</section></div></div>`;
};
function loyaltyPoints(){ const L = db.settings.loyalty; if (!L.enabled) return 0; return T.orders().filter(o => o.status === 'Completed').reduce((a,o) => a + Math.floor(o.subtotal / L.pointsPer), 0); }
function acctTab(tab){
  const u = db.user, orders = T.orders();
  const signIn = `<div class="panelc" style="max-width:520px"><h2 class="serif" style="font-size:28px">Welcome to Pa Sweet</h2><p class="muted small">Create a profile to keep your orders, designs and celebrations together.</p>
    <form id="signForm" novalidate><div style="display:grid;gap:10px"><label class="f">Name<input class="in" id="s_name" autocomplete="name"></label><label class="f">Email<input class="in" id="s_email" type="email" autocomplete="email"></label><label class="f">Phone (optional)<input class="in" id="s_phone" inputmode="tel" autocomplete="tel"></label>
    <label class="check"><input type="checkbox" id="s_mk"> Send me Pa Sweet news and offers (optional)</label><div id="s_err" class="err" role="alert"></div><button class="btn" type="submit">Continue</button></div></form>
    <div class="note" style="margin-top:14px"><b>Preview mode:</b> this profile is saved on this device only. Secure sign-in with passwords and email verification needs the backend described in the README.</div></div>`;
  if (!u && ['profile','addresses','settings'].includes(tab)) return signIn;
  switch (tab) {
    case 'profile': {
      const upcoming = db.celebrations.filter(c => c.date >= iso(today())).length;
      return `<h2 class="serif" style="font-size:30px;margin-bottom:14px">My Account</h2>
        <div class="panelc row" style="justify-content:space-between"><div class="row"><span style="width:58px;height:58px;border-radius:50%;background:var(--blush);display:grid;place-items:center;color:var(--wine);font-family:var(--f-display);font-size:24px;font-weight:700">${esc(u.name[0]||'?')}</span>
          <div><b style="font-size:17px">Hello, ${esc(u.name.split(' ')[0])}!</b><div class="small muted">${esc(u.email)}</div></div></div><button class="btn soft sm" data-go="account" data-tab="settings">Edit Profile</button></div>
        <h3 style="font-size:16px;margin:22px 0 10px">Quick Stats</h3><div class="stats"><div class="stat"><div class="k">Total Orders</div><div class="v">${orders.length}</div></div>
          <div class="stat"><div class="k">Loyalty Points</div><div class="v">${db.settings.loyalty.enabled?loyaltyPoints():'—'}</div></div><div class="stat"><div class="k">Upcoming Events</div><div class="v">${upcoming}</div></div><div class="stat"><div class="k">Saved Designs</div><div class="v">${db.designs.length}</div></div></div>
        <div class="row" style="margin-top:16px">${[['shop','Shop now'],['studio','Create a custom cake'],['contact','Contact the bakery']].map(a => `<button class="btn soft sm" data-go="${a[0]}">${a[1]}</button>`).join('')}</div>
        <h3 style="font-size:16px;margin:22px 0 4px">Recent Orders</h3>${ordersList(orders.slice(0,3))}${orders.length>3?`<button class="link-btn" data-go="account" data-tab="orders">View All Orders ${ic('arrow')}</button>`:''}`; }
    case 'orders': return `<h2 class="serif" style="font-size:28px;margin-bottom:10px">Order History</h2>${ordersList(orders)}`;
    case 'favourites': { const f = db.favs.map(product).filter(Boolean); return `<h2 class="serif" style="font-size:28px;margin-bottom:14px">Favorites</h2>${f.length?`<div class="grid c3">${f.map(productCard).join('')}</div>`:`<div class="empty"><h3>No favourites yet</h3><p class="muted">Tap the heart on any treat to save it here.</p><button class="btn" data-go="shop">Browse the shop</button></div>`}`; }
    case 'designs': return `<h2 class="serif" style="font-size:28px;margin-bottom:14px">Saved Designs & Quotes</h2>
      ${db.designs.length ? `<div style="display:grid;gap:12px">${db.designs.map(d => { const q = d.quoteId && db.quotes.find(x => x.id === d.quoteId);
        return `<div class="panelc" style="padding:16px"><div class="row" style="justify-content:space-between;align-items:flex-start"><div class="row">${miniCake(d.spec)}<div><b>${esc(d.title)}</b><div class="small muted">Saved ${fmtDate(d.updatedAt)} · estimate ${money(d.estimate[0])} – ${money(d.estimate[1])}</div></div></div>${q?statusPill(q.status):'<span class="pill">Draft</span>'}</div>
        ${q?`<div class="small" style="margin-top:8px">Quote <b>${q.id}</b> for ${fmtDate(q.eventDate)}${q.quotedPrice?` · <b>Bakery price: ${money(q.quotedPrice)}</b>`:''}${q.staffNotes?`<div class="note" style="margin-top:6px">${esc(q.staffNotes)}</div>`:''}</div>`:''}
        <div class="row" style="margin-top:10px"><button class="btn soft sm" data-go="studio" data-design="${d.id}">Open in Studio</button><button class="btn soft sm" data-act="dupdesign" data-id="${d.id}">Duplicate</button>
        ${q && q.status==='Quote prepared' ? `<button class="btn sm" data-act="acceptquote" data-id="${q.id}">Accept quote & checkout</button>` : ''}<button class="btn ghost sm" data-act="deldesign" data-id="${d.id}">Delete</button></div></div>`; }).join('')}</div>`
      : `<div class="empty"><h3>No saved designs yet</h3><p class="muted">Designs you save in the Cake Studio appear here.</p><button class="btn" data-go="studio">Design a cake</button></div>`}`;
    case 'rewards': { const L = db.settings.loyalty, pts = loyaltyPoints();
      return `<h2 class="serif" style="font-size:28px;margin-bottom:14px">Sweet Rewards</h2>${!L.enabled?'<div class="empty"><h3>Rewards are coming soon</h3><p class="muted">Pa Sweet hasn’t switched the rewards programme on yet.</p></div>':`
        <div class="stats"><div class="stat"><div class="k">Current points</div><div class="v">${pts}</div></div><div class="stat"><div class="k">Completed orders</div><div class="v">${orders.filter(o=>o.status==='Completed').length}</div></div></div>
        <div class="panelc" style="margin-top:14px"><b>How it works</b><p class="small muted" style="margin:6px 0 0">You earn 1 point for every ${money(L.pointsPer)} spent on completed orders. Points appear once the bakery marks your order completed, and are removed if an order is refunded.</p><p class="tiny muted">${esc(L.note)} Rewards to redeem will be announced by Pa Sweet.</p></div>
        <h3 style="font-size:16px;margin:18px 0 8px">Points history</h3>${orders.filter(o=>o.status==='Completed').map(o => `<div class="sumrow small"><span>${o.id} · ${fmtDate(o.createdAt)}</span><span class="num">+${Math.floor(o.subtotal/L.pointsPer)}</span></div>`).join('') || '<p class="small muted">No points yet.</p>'}`}`; }
    case 'celebrations': return `<h2 class="serif" style="font-size:28px;margin-bottom:6px">Celebration Memory Book</h2><p class="muted small" style="margin:0 0 14px">Keep birthdays and anniversaries here with the cake they love, ready to reorder.</p>
      <form id="celForm" class="panelc" novalidate><div class="fgrid"><label class="f">Event<input class="in" id="ce_name" placeholder="e.g. Mum’s birthday"></label><label class="f">Date<input class="in" id="ce_date" type="date"></label>
        <label class="f">Favourite cake / flavour<input class="in" id="ce_pref" placeholder="e.g. Red velvet, pink roses"></label><label class="f">Remind me<select class="in" id="ce_rem"><option value="0">No reminder</option><option value="7">1 week before</option><option value="14">2 weeks before</option></select></label></div>
        <div id="ce_err" class="err" role="alert"></div><button class="btn" style="margin-top:12px" type="submit">Save to Memory Book</button>
        <p class="tiny muted" style="margin:8px 0 0">Reminders show here and on your dashboard. Email/SMS reminders need a notification service and your consent.</p></form>
      <div style="display:grid;gap:10px;margin-top:14px">${db.celebrations.slice().sort((a,b)=>a.date.localeCompare(b.date)).map(c => { const days = Math.round((new Date(c.date+'T12:00:00')-today())/864e5);
        return `<div class="panelc row" style="justify-content:space-between;padding:14px 16px"><div><b>${esc(c.name)}</b> <span class="small muted">${fmtDate(c.date)}${days>=0?` · in ${days} day${days===1?'':'s'}`:' · passed'}</span>${c.pref?`<div class="small muted">${esc(c.pref)}</div>`:''}
        ${c.rem && days>=0 && days<=+c.rem?`<div class="small" style="color:var(--warn)">${ic('alert',13)} Time to order — custom cakes need ${db.settings.customLeadDays} days notice.</div>`:''}</div>
        <div class="row"><button class="btn soft sm" data-go="studio" data-occ="${/wedding/i.test(c.name)?'Wedding':/anniv/i.test(c.name)?'Anniversary':'Birthday'}">Design cake</button><button class="ibtn" data-act="delcel" data-id="${c.id}" aria-label="Delete">${ic('trash')}</button></div></div>`; }).join('')}</div>`;
    case 'addresses': return `<h2 class="serif" style="font-size:28px;margin-bottom:14px">Addresses</h2>
      ${db.addresses.map(a => `<div class="panelc row" style="justify-content:space-between;padding:14px 16px;margin-bottom:10px"><div><b>${esc(a.label)}</b><div class="small muted">${esc(a.text)}</div></div><button class="ibtn" data-act="deladdr" data-id="${a.id}" aria-label="Delete address">${ic('trash')}</button></div>`).join('')}
      <form id="addrForm" class="panelc" novalidate><div class="fgrid"><label class="f">Label<input class="in" id="ad_label" placeholder="Home"></label><label class="f">Address<input class="in" id="ad_text" placeholder="Street, area, landmark"></label></div><button class="btn" style="margin-top:12px" type="submit">Add address</button></form>`;
    case 'settings': return `<h2 class="serif" style="font-size:28px;margin-bottom:14px">Settings</h2>
      <form id="profForm" class="panelc" novalidate><div class="fgrid"><label class="f">Name<input class="in" id="p_name" value="${esc(u.name)}"></label><label class="f">Email<input class="in" id="p_email" type="email" value="${esc(u.email)}"></label><label class="f">Phone<input class="in" id="p_phone" value="${esc(u.phone||'')}"></label></div>
      <label class="check" style="margin-top:12px"><input type="checkbox" id="p_mk" ${u.marketing?'checked':''}> Email me news and offers</label><div id="p_err" class="err"></div><button class="btn" style="margin-top:12px" type="submit">Save changes</button></form>
      <div class="panelc" style="margin-top:14px"><b>Your data</b><p class="small muted">Download everything stored on this device, or erase it.</p><div class="row"><button class="btn soft sm" data-act="export">Show my data</button><button class="btn ghost sm" data-act="erase">Erase my data</button></div><div id="dataout"></div></div>`;
  }
  return '';
}
function ordersList(list){
  if (!list.length) return `<div class="empty" style="margin-top:10px"><h3>No orders yet</h3><p class="muted">Orders you place on this device appear here.</p><button class="btn" data-go="shop">Start shopping</button></div>`;
  return list.map(o => `<div class="orderrow"><div><b class="num">#${o.id}</b><div class="small muted">${fmtDate(o.createdAt)} · ${o.items.reduce((a,i)=>a+i.qty,0)} item(s) · ${money(o.total)}</div></div>${statusPill(o.status)}<button class="btn soft sm" data-act="vieworder" data-id="${o.id}">View</button></div>`).join('');
}
function orderModal(o, staff){
  const steps = ['Awaiting confirmation','Confirmed','In preparation','Ready for collection','Completed'];
  const si = steps.indexOf(o.status === 'Out for delivery' ? 'Ready for collection' : o.status);
  modal('Order #' + o.id, `<div class="row" style="margin-bottom:10px">${statusPill(o.status)}${statusPill(o.payment.status)}</div>
    ${si>=0?`<div style="display:grid;grid-template-columns:repeat(${steps.length},1fr);gap:4px;margin:6px 0 14px">${steps.map((s,i) => `<div><div style="height:5px;border-radius:3px;background:${i<=si?'var(--wine)':'var(--line)'}"></div><div class="tiny ${i<=si?'':'muted'}" style="margin-top:4px">${s.replace('Awaiting confirmation','Received')}</div></div>`).join('')}</div>`:''}
    ${o.items.map(i => `<div class="sumrow small"><span>${i.qty}× ${esc(i.name)} <span class="muted">${esc(Object.values(i.options||{}).filter(Boolean).join(' · '))}${i.box?' · '+esc(Object.entries(i.box).filter(e=>e[1]).map(e=>e[1]+'× '+e[0]).join(', ')):''}</span></span><span class="num">${money(i.unit*i.qty)}</span></div>`).join('')}
    <div class="sumrow total"><span>Total</span><span class="num">${money(o.total)}</span></div>
    <p class="small"><b>${o.fulfilment.method==='delivery'?'Delivery':'Collection'}:</b> ${fmtDate(o.fulfilment.date)} at ${o.fulfilment.time}<br>${esc(o.fulfilment.address)}${o.fulfilment.zone?' ('+esc(o.fulfilment.zone)+')':''}</p>
    ${o.allergy?`<p class="small"><b>Allergy notes:</b> ${esc(o.allergy)}</p>`:''}${o.notes?`<p class="small"><b>Notes:</b> ${esc(o.notes)}</p>`:''}
    ${staff?`<p class="small"><b>Customer:</b> ${esc(o.customer.name)} · ${esc(o.customer.phone)} ${o.customer.email?'· '+esc(o.customer.email):''}</p>`:''}
    <details class="acc"><summary>Status history</summary><div>${o.history.map(h => `<div>${fmtDate(h.at)} ${new Date(h.at).toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})} — ${esc(h.status)}${h.by?' ('+esc(h.by)+')':''}</div>`).join('')}</div></details>
    ${!staff?`<div class="row" style="margin-top:14px"><button class="btn soft" data-act="reorder" data-id="${o.id}">Reorder</button><button class="btn ghost" data-go="contact">Contact the bakery</button></div>`:''}`);
}

/* ---------- Contact / About / Policy ---------- */
V.contact = (prm) => `<section class="pagebanner center"><img src="${IMG.life}" alt=""><div class="wrap"><h1>Get in Touch</h1><p>We’d love to hear from you!</p></div></section>
  <div class="wrap"><div class="contact"><div><div class="cinfo">
    <div class="ci"><span class="ic">${ic('pin')}</span><div><b>Visit Us</b><span>${esc(BAKERY.address)}, Sierra Leone<br>${esc(BAKERY.landmark)}</span></div></div>
    <div class="ci"><span class="ic">${ic('phone')}</span><div><b>Call Us</b>${BAKERY.phones.map(p => `<span class="num">${p}</span><button class="copy" data-act="copy" data-v="${p}">Copy</button><br>`).join('')}</div></div>
    <div class="ci"><span class="ic">${ic('clock')}</span><div><b>Opening Hours</b><span>${BAKERY.hours.open} – ${BAKERY.hours.close}</span></div></div>
    <div class="ci"><span class="ic">${ic('fb')}</span><div><b>Follow Us</b><a href="${BAKERY.facebookUrl}" target="_blank" rel="noopener">Facebook: Pa Sweet Bakery</a></div></div></div>
    <div class="map" aria-label="Map of 70 Wilkinson Road">${mapSVG()}</div><a class="small" href="${BAKERY.mapsUrl}" target="_blank" rel="noopener" style="display:inline-block;margin-top:8px">Open in Google Maps ↗</a></div>
  <div class="panelc"><h2 style="font-size:20px;margin-bottom:14px">Send Us a Message</h2><form id="contactForm" novalidate><div style="display:grid;gap:10px">
    <label class="f">Name<input class="in" id="m_name" autocomplete="name"></label><div class="fgrid"><label class="f">Email<input class="in" id="m_email" type="email" autocomplete="email"></label><label class="f">Phone Number (optional)<input class="in" id="m_phone" inputmode="tel"></label></div>
    <div class="fgrid"><label class="f">Topic<select class="in" id="m_cat">${['General question','Custom cake','Order enquiry','Delivery or collection','Celebration order','Product information','Corporate or bulk order','Other'].map(c => `<option>${c}</option>`).join('')}</select></label><label class="f">Order reference (optional)<input class="in" id="m_ref" placeholder="PS-1001"></label></div>
    <label class="f">Message<textarea class="in" id="m_msg" rows="5"></textarea></label><label class="check"><input type="checkbox" id="m_ok"> Pa Sweet may contact me about this message.</label>
    <div id="m_err" class="err" role="alert"></div><button class="btn" type="submit">Send Message</button>
    <p class="tiny muted" style="margin:0">Messages go to the bakery’s staff inbox. Email notifications aren’t connected yet — for urgent orders please call.</p></div></form></div></div>
  <section class="section" id="faq"><div class="sec-head"><h2>FAQs</h2></div>
    ${[['How far ahead should I order a custom cake?',`At least ${db.settings.customLeadDays} days. Larger or tiered cakes may need longer — the bakery confirms when it reviews your design.`],
       ['Can I collect the same day?','Ready-to-buy items can usually be collected the same day during opening hours, subject to stock.'],
       ['Do you deliver?', db.settings.delivery.enabled ? 'Yes, to the zones shown at checkout. The bakery confirms your delivery slot by phone.' : 'Not at the moment — collection only.'],
       ['How do I pay?','Pay in person when you collect or receive your order. Online payment will be added later.'],
       ['Is the AI Cake Studio price final?','No. It’s an estimate from the bakery’s pricing rules. Our bakers confirm the final price after reviewing your design.'],
       ['Can you make a cake free from allergens?','Tell us about any allergy before ordering. We can’t guarantee items are free from allergens or cross-contact, and we’ll tell you honestly if we can’t meet a request.']].map(f => `<details class="acc"><summary>${esc(f[0])}</summary><div>${esc(f[1])}</div></details>`).join('')}</section></div>`;
function mapSVG(){
  return `<svg viewBox="0 0 600 260" role="img" aria-label="Stylised map showing Pa Sweet on Wilkinson Road"><rect width="600" height="260" fill="#F3EDE6"/>
    <path d="M-10 70 Q 200 40 320 110 T 620 120" stroke="#fff" stroke-width="22" fill="none"/><path d="M-10 70 Q 200 40 320 110 T 620 120" stroke="#E7D9CC" stroke-width="1.5" fill="none"/>
    <path d="M150 -10 L 210 280" stroke="#fff" stroke-width="14"/><path d="M420 -10 Q 400 120 460 280" stroke="#fff" stroke-width="12"/><path d="M-10 210 L 620 190" stroke="#fff" stroke-width="10"/>
    <rect x="40" y="110" width="80" height="60" rx="6" fill="#E4EFE0"/><rect x="480" y="20" width="90" height="60" rx="6" fill="#E4EFE0"/>
    <text x="250" y="92" font-family="DM Sans, sans-serif" font-size="13" fill="#8B6E64" transform="rotate(10 250 92)">Wilkinson Road</text>
    <g transform="translate(330 104)"><circle r="20" fill="#7D1D3A" opacity=".15"/><path d="M0 -34c-10 0-17 7-17 16 0 12 17 27 17 27s17-15 17-27c0-9-7-16-17-16Z" fill="#7D1D3A"/><circle cy="-18" r="6" fill="#fff"/></g>
    <rect x="352" y="64" width="150" height="40" rx="8" fill="#fff"/><text x="364" y="82" font-family="DM Sans, sans-serif" font-size="13" font-weight="700" fill="#3A1E16">Pa Sweet Bakery</text><text x="364" y="97" font-family="DM Sans, sans-serif" font-size="11" fill="#8B6E64">70 Wilkinson Road</text>
    <text x="268" y="150" font-family="DM Sans, sans-serif" font-size="11" fill="#8B6E64">Basha Restaurant (opposite)</text></svg>`;
}
V.about = () => `<section class="pagebanner"><img src="${IMG.life}" alt=""><div class="wrap"><h1>About Pa Sweet</h1><p>A bakery on Wilkinson Road, Freetown.</p></div></section>
  <div class="wrap section"><div class="editorial"><div><h2 class="serif" style="font-size:34px;margin-bottom:12px">Making life sweeter, one treat at a time</h2>
    <p>Pa Sweet bakes cakes, pastries, doughnuts and bread at <b>${esc(BAKERY.address)}</b>, ${esc(BAKERY.landmark.toLowerCase())}. Drop in between ${BAKERY.hours.open} and ${BAKERY.hours.close}, or call ${BAKERY.phones.join(' / ')}.</p>
    <div class="placeholder" style="margin:16px 0">Owner to complete: the Pa Sweet story — when it started, who founded it, and what makes the bakes special. This text is a placeholder and won’t be published as fact.</div>
    <div class="row"><button class="btn" data-go="shop">Shop our treats</button><button class="btn ghost" data-go="studio">Design a cake</button></div></div>
    <img src="${IMG.logoCard}" alt="Pa Sweet logo card with address and phone numbers" style="border-radius:18px;box-shadow:var(--shadow);max-width:440px;justify-self:center;width:100%"></div>
  <div class="grid c3" style="margin-top:40px">${[['Baking philosophy','How Pa Sweet chooses ingredients and bakes each day.'],['Custom cake design','Tell us your idea and our decorators bring it to life.'],['Our team','Meet the bakers and decorators behind the counter.']].map(c => `<div class="panelc"><h3 style="font-size:18px;margin-bottom:6px">${c[0]}</h3><p class="small muted" style="margin:0 0 8px">${c[1]}</p><div class="placeholder tiny">Owner to add details and photos.</div></div>`).join('')}</div></div>`;
V.policy = (prm) => {
  const t = prm.tab || 'terms'; const names = {terms:'Terms & Conditions', privacy:'Privacy Policy', refunds:'Refunds & Cancellations', delivery:'Delivery & Collection', allergy:'Allergy Information'};
  const known = {delivery:`<p>Collection: ${esc(BAKERY.address)} (${esc(BAKERY.landmark)}), ${BAKERY.hours.open}–${BAKERY.hours.close}.</p><p>${db.settings.delivery.enabled?'Delivery zones and fees are shown at checkout.':'Delivery is currently unavailable.'} Made-to-order items need notice; custom cakes need at least ${db.settings.customLeadDays} days.</p>`,
    allergy:`<p>Allergen details are shown on each product once the bakery confirms them. Please tell us about any allergy before ordering — we can’t guarantee any product is free from allergens or cross-contact.</p>`,
    privacy:`<p>In this preview, your profile, cart, orders and designs are stored only in this browser. Uploaded inspiration photos are shared with the bakery only if you tick the sharing box when requesting a quote, and are never used to train AI models.</p>`};
  return `<div class="wrap section" style="max-width:780px"><div class="tabs" style="margin-bottom:20px">${Object.entries(names).map(([k,v]) => `<button class="${k===t?'on':''}" data-go="policy" data-tab="${k}">${v}</button>`).join('')}</div>
    <h1 class="serif" style="font-size:34px;margin-bottom:12px">${names[t]}</h1>${known[t]||''}<div class="placeholder">Full ${names[t].toLowerCase()} text to be supplied by Pa Sweet and reviewed against Sierra Leone consumer and data-protection requirements before launch.</div></div>`;
};

/* ---------- Staff dashboard ---------- */
let adminRole = 'Owner';
const ROLES = {Owner:['overview','orders','production','requests','products','inventory','promos','customers','enquiries','settings','bakeries'],
  Manager:['overview','orders','production','requests','products','inventory','promos','customers','enquiries'],
  Baker:['overview','production','requests','inventory'], Support:['overview','orders','customers','enquiries']};
const STAGES = ['Confirmed','Ingredients prepared','Baking','Cooling','Decorating','Quality review','Packaging','Ready for collection'];
V.admin = (prm) => {
  const allowed = ROLES[adminRole]; let tab = prm.tab || 'overview'; if (!allowed.includes(tab)) tab = 'overview';
  const names = {overview:'Overview',orders:'Orders',production:'Production',requests:'Custom Cake Requests',products:'Products',inventory:'Inventory',promos:'Promotions',customers:'Customers',enquiries:'Enquiries',settings:'Settings',bakeries:'Bakeries'};
  return `<div class="admin-top"><div class="wrap"><b>Pa Sweet · Staff Dashboard</b><label>Viewing as <select id="roleSel" aria-label="Staff role">${Object.keys(ROLES).map(r => `<option ${r===adminRole?'selected':''}>${r}</option>`).join('')}</select></label></div></div>
    <div class="wrap"><div class="note" style="margin-top:14px">Preview mode: staff tools run on this device’s data. In production, sign-in and role permissions are enforced by the server (see README).</div>
    <div class="acct"><nav class="side" aria-label="Dashboard">${allowed.map(k => `<button class="${tab===k?'on':''}" data-go="admin" data-tab="${k}">${names[k]}${k==='requests'&&T.quotes().filter(q=>q.status==='Ready for bakery review').length?` <span class="pill warn" style="margin-left:auto">${T.quotes().filter(q=>q.status==='Ready for bakery review').length}</span>`:''}</button>`).join('')}</nav>
    <section style="min-width:0">${adminTab(tab)}</section></div></div>`;
};
function adminTab(tab){
  const orders = T.orders(), quotes = T.quotes(), tdy = iso(new Date()), soon = iso(addDays(today(),3));
  switch (tab) {
    case 'overview': { const low = db.inventory.filter(i => i.qty <= i.min);
      const st = [['New orders', orders.filter(o=>o.status==='Awaiting confirmation').length, 'orders'],['Due today', orders.filter(o=>o.fulfilment.date===tdy && !['Completed','Cancelled'].includes(o.status)).length, 'production'],
        ['Due in 3 days', orders.filter(o=>o.fulfilment.date>tdy && o.fulfilment.date<=soon && !['Completed','Cancelled'].includes(o.status)).length, 'production'],['Cake requests to review', quotes.filter(q=>q.status==='Ready for bakery review').length, 'requests'],
        ['Awaiting payment', orders.filter(o=>o.payment.status==='Awaiting payment' && o.status!=='Cancelled').length, 'orders'],['Ready for collection', orders.filter(o=>o.status==='Ready for collection').length, 'orders'],
        ['Low-stock ingredients', low.length, 'inventory'],['Unavailable products', T.products().filter(p=>!p.available).length, 'products']];
      return `<h2 class="serif" style="font-size:28px;margin-bottom:14px">Today at Pa Sweet</h2><div class="stats">${st.map(s => `<button class="stat ${s[1]&&/review|Low|New/.test(s[0])?'alert':''}" style="text-align:left;cursor:pointer" data-go="admin" data-tab="${s[2]}"><div class="k">${s[0]}</div><div class="v">${s[1]}</div></button>`).join('')}</div>
        <h3 style="font-size:16px;margin:22px 0 8px">Latest orders</h3>${orders.length ? adminOrderTable(orders.slice(0,5)) : '<div class="empty"><h3>No orders yet</h3><p class="muted">Orders placed on the website appear here.</p></div>'}
        <h3 style="font-size:16px;margin:22px 0 8px">Recent activity</h3>${db.audit.slice(0,8).map(a => `<div class="small" style="padding:4px 0;border-bottom:1px solid var(--line)">${fmtDate(a.at)} · ${esc(a.role||'')} · ${esc(a.what)} ${a.ref?'<b>'+esc(a.ref)+'</b>':''}</div>`).join('') || '<p class="small muted">No staff activity yet.</p>'}`; }
    case 'orders': return `<h2 class="serif" style="font-size:28px;margin-bottom:14px">Orders</h2>${orders.length ? adminOrderTable(orders) : '<div class="empty"><h3>No orders yet</h3></div>'}`;
    case 'production': { const active = orders.filter(o => ['Confirmed','In preparation'].includes(o.status) || (o.stage && o.status!=='Completed' && o.status!=='Cancelled'));
      return `<h2 class="serif" style="font-size:28px;margin-bottom:6px">Production board</h2><p class="small muted" style="margin:0 0 14px">Confirmed orders by stage, earliest due first. Capacity: ${db.settings.maxCakesPerDay} items/day · ${db.settings.maxCustomPerDay} custom cakes/day.</p>
        ${active.length ? `<div class="kanban">${STAGES.map(s => { const list = active.filter(o => (o.stage||'Confirmed') === s).sort((a,b) => (a.fulfilment.date+a.fulfilment.time).localeCompare(b.fulfilment.date+b.fulfilment.time));
          return `<div class="kcol"><h5>${s}<span>${list.length}</span></h5>${list.map(o => `<div class="kcard"><b>#${o.id}</b> · ${fmtDate(o.fulfilment.date)} ${o.fulfilment.time}<div class="muted">${o.items.map(i => i.qty+'× '+esc(i.name)).join(', ')}</div>${o.allergy?`<div style="color:var(--bad)">${ic('alert',12)} Allergy note</div>`:''}
            <div class="row" style="margin-top:6px;gap:4px">${STAGES.indexOf(s)>0?`<button class="btn soft sm" data-act="stage" data-id="${o.id}" data-d="-1" aria-label="Back a stage">${ic('left',12)}</button>`:''}${STAGES.indexOf(s)<STAGES.length-1?`<button class="btn sm" data-act="stage" data-id="${o.id}" data-d="1">Next ${ic('right',12)}</button>`:''}</div></div>`).join('')}</div>`; }).join('')}</div>` : '<div class="empty"><h3>Nothing in production</h3><p class="muted">Confirm an order to add it to the board.</p></div>'}`; }
    case 'requests': return `<h2 class="serif" style="font-size:28px;margin-bottom:14px">Custom Cake Requests</h2>${quotes.length ? quotes.map(q => `<div class="panelc" style="margin-bottom:12px;padding:16px">
        <div class="row" style="justify-content:space-between"><div class="row">${miniCake(q.spec)}<div><b>${q.id}</b> · ${esc(q.customer.name)} · ${esc(q.customer.phone)}<div class="small muted">For ${fmtDate(q.eventDate)} · ${q.method} · ${q.guests?esc(q.guests)+' guests · ':''}estimate ${money(q.estimate.low)}–${money(q.estimate.high)}${q.estimate.review?' (needs review)':''}</div></div></div>${statusPill(q.status)}</div>
        <div class="spec-chips">${[q.spec.occasion, q.spec.tiers+' tiers', q.spec.shape, q.spec.size+' inch', q.spec.flavour, q.spec.filling, q.spec.frosting].concat(['flowers','drip','pearls','berries','sprinkles','ruffle'].filter(k=>q.spec[k])).concat(q.spec.topper!=='none'?[q.spec.topper]:[]).concat(q.spec.text?['“'+q.spec.text+'”']:[]).map(x => `<span>${esc(x)}</span>`).join('')}</div>
        ${q.spec.description?`<p class="small" style="margin:8px 0 0"><b>Customer’s words:</b> ${esc(q.spec.description)}</p>`:''}${q.notes?`<p class="small" style="margin:4px 0 0"><b>Notes:</b> ${esc(q.notes)}</p>`:''}
        ${q.spec.ref?`<img src="${q.spec.ref}" alt="Inspiration photo" style="width:90px;height:90px;object-fit:cover;border-radius:10px;margin-top:8px">`:''}
        ${feasibility(q.spec, q.eventDate).length?`<div class="small" style="color:var(--warn);margin-top:6px">${feasibility(q.spec, q.eventDate).map(esc).join('<br>')}</div>`:''}
        ${!['Converted to order','Declined'].includes(q.status) && can('requests') ? `<div class="fgrid" style="margin-top:10px"><label class="f">Quoted price (Le)<input class="in" id="qp_${q.id}" inputmode="numeric" value="${q.quotedPrice||''}" placeholder="${q.estimate.low}"></label><label class="f">Message to customer<input class="in" id="qn_${q.id}" value="${esc(q.staffNotes)}" placeholder="Feasibility notes, suggestions…"></label></div>
        <div class="row" style="margin-top:10px"><button class="btn sm" data-act="qsend" data-id="${q.id}" ${adminRole==='Baker'?'disabled title="Managers send prices"':''}>Send quote</button><button class="btn soft sm" data-act="qrev" data-id="${q.id}">Request changes</button><button class="btn soft sm" data-act="qopen" data-id="${q.id}">Open in Studio</button><button class="btn ghost sm" data-act="qdecline" data-id="${q.id}">Decline</button></div>` : q.orderId ? `<p class="small">Became order <b>#${q.orderId}</b>.</p>` : ''}</div>`).join('') : '<div class="empty"><h3>No requests yet</h3><p class="muted">Designs sent from the Cake Studio arrive here for review.</p></div>'}`;
    case 'products': return `<h2 class="serif" style="font-size:28px;margin-bottom:6px">Products</h2><p class="small muted" style="margin:0 0 12px">Changes publish to the shop straight away.</p>
      <label class="check" style="margin-bottom:12px"><input type="checkbox" id="pconf" ${db.settings.pricesConfirmed?'checked':''}> Prices are confirmed (hides the “sample prices” notice)</label>
      <div class="tbl-wrap"><table class="t"><thead><tr><th>Product</th><th>Base price (Le)</th><th>Lead days</th><th>On sale</th><th>Featured</th><th>Allergens (verified)</th><th></th></tr></thead><tbody>
      ${T.products().map(p => `<tr><td><div class="row" style="flex-wrap:nowrap"><img src="${img(p.img)}" alt="" style="width:40px;height:40px;border-radius:8px;object-fit:cover"><span><b>${esc(p.name)}</b><br><span class="tiny muted">${esc((CATS.find(c=>c.id===p.cat)||{}).name)}</span></span></div></td>
        <td><input class="in num" style="width:90px" data-pf="price" data-id="${p.id}" value="${p.price}" inputmode="numeric" aria-label="Price"></td><td><input class="in num" style="width:60px" data-pf="lead" data-id="${p.id}" value="${p.lead}" inputmode="numeric" aria-label="Lead days"></td>
        <td><input type="checkbox" data-pf="available" data-id="${p.id}" ${p.available?'checked':''} aria-label="On sale"></td><td><input type="checkbox" data-pf="featured" data-id="${p.id}" ${p.featured?'checked':''} aria-label="Featured"></td>
        <td><input class="in" style="min-width:160px" data-pf="allergens" data-id="${p.id}" value="${esc(p.allergens)}" placeholder="e.g. wheat, egg, milk" aria-label="Allergens"></td><td><button class="btn soft sm" data-act="pedit" data-id="${p.id}">More</button></td></tr>`).join('')}</tbody></table></div>
      <button class="btn" style="margin-top:14px" data-act="padd">${ic('plus')} Add product</button>`;
    case 'inventory': { return `<h2 class="serif" style="font-size:28px;margin-bottom:6px">Ingredient Inventory</h2><p class="small muted" style="margin:0 0 12px">Record real stock. Alerts appear when an item falls to its reorder level.</p>
      ${db.inventory.length ? `<div class="tbl-wrap"><table class="t"><thead><tr><th>Ingredient</th><th>In stock</th><th>Reorder at</th><th>Supplier</th><th>Record</th></tr></thead><tbody>${db.inventory.map(i => `<tr><td><b>${esc(i.name)}</b>${i.qty<=i.min?' <span class="pill warn">Low</span>':''}</td><td class="num">${fmtQty(i.qty, i.unit)}</td><td class="num">${fmtQty(i.min, i.unit)}</td><td>${esc(i.supplier||'—')}</td>
        <td><div class="row" style="flex-wrap:nowrap;gap:4px"><input class="in num" id="mv_${i.id}" style="width:80px" inputmode="decimal" placeholder="${i.unit}" aria-label="Amount"><button class="btn soft sm" data-act="mv" data-id="${i.id}" data-d="1">+ In</button><button class="btn soft sm" data-act="mv" data-id="${i.id}" data-d="-1">− Used</button><button class="btn ghost sm" data-act="mv" data-id="${i.id}" data-d="-2">Waste</button></div></td></tr>`).join('')}</tbody></table></div>`
        : '<div class="empty"><h3>No ingredients recorded</h3><p class="muted">Add your first ingredient below.</p></div>'}
      <form id="invForm" class="panelc" style="margin-top:14px" novalidate><b>Add ingredient</b><div class="fgrid" style="margin-top:10px"><label class="f">Name<input class="in" id="iv_name" placeholder="Flour"></label><label class="f">Unit<select class="in" id="iv_unit"><option value="kg">kg</option><option value="g">g</option><option value="l">litres</option><option value="ml">ml</option><option value="pcs">pieces</option></select></label>
        <label class="f">Current stock<input class="in" id="iv_qty" inputmode="decimal"></label><label class="f">Reorder at<input class="in" id="iv_min" inputmode="decimal"></label><label class="f">Supplier (optional)<input class="in" id="iv_sup"></label></div><div id="iv_err" class="err"></div><button class="btn" style="margin-top:10px" type="submit">Add</button></form>
      ${db.movements.length?`<h3 style="font-size:15px;margin:18px 0 6px">Stock movements</h3>${db.movements.slice(0,10).map(m => `<div class="small" style="padding:3px 0">${fmtDate(m.at)} · ${esc(m.name)} · ${m.type} ${fmtQty(Math.abs(m.amount), m.unit)}</div>`).join('')}`:''}`; }
    case 'promos': return `<h2 class="serif" style="font-size:28px;margin-bottom:14px">Promotions</h2>
      ${db.promos.length?`<div class="tbl-wrap"><table class="t"><thead><tr><th>Code</th><th>Discount</th><th>Min spend</th><th>Dates</th><th>Used</th><th>Active</th></tr></thead><tbody>${db.promos.map(p => `<tr><td><b>${esc(p.code)}</b></td><td>${p.type==='percent'?p.value+'%':money(p.value)}</td><td>${p.minSpend?money(p.minSpend):'—'}</td><td class="small">${p.start?fmtDate(p.start):'—'} → ${p.end?fmtDate(p.end):'—'}</td><td class="num">${p.uses||0}${p.maxUses?'/'+p.maxUses:''}</td><td><input type="checkbox" data-act="ptoggle" data-code="${esc(p.code)}" ${p.active?'checked':''} aria-label="Active"></td></tr>`).join('')}</tbody></table></div>`:'<p class="muted small">No promo codes yet.</p>'}
      <form id="promoAdd" class="panelc" style="margin-top:14px" novalidate><b>New code</b><div class="fgrid" style="margin-top:10px"><label class="f">Code<input class="in" id="pr_code" placeholder="SWEET10"></label><label class="f">Type<select class="in" id="pr_type"><option value="percent">Percent off</option><option value="fixed">Amount off (Le)</option></select></label>
        <label class="f">Value<input class="in" id="pr_val" inputmode="numeric"></label><label class="f">Minimum spend (Le)<input class="in" id="pr_min" inputmode="numeric"></label><label class="f">Starts<input class="in" id="pr_start" type="date"></label><label class="f">Ends<input class="in" id="pr_end" type="date"></label><label class="f">Max uses<input class="in" id="pr_max" inputmode="numeric"></label></div><div id="pr_err" class="err"></div><button class="btn" style="margin-top:10px" type="submit">Create code</button></form>`;
    case 'customers': { const map = {}; orders.forEach(o => { const k = o.customer.phone; map[k] = map[k] || {name:o.customer.name, phone:k, email:o.customer.email, n:0, spent:0}; map[k].n++; map[k].spent += o.total; });
      const list = Object.values(map); return `<h2 class="serif" style="font-size:28px;margin-bottom:14px">Customers</h2>${list.length?`<div class="tbl-wrap"><table class="t"><thead><tr><th>Name</th><th>Phone</th><th>Orders</th><th>Spent</th></tr></thead><tbody>${list.map(c => `<tr><td>${esc(c.name)}</td><td>${esc(c.phone)}</td><td class="num">${c.n}</td><td class="num">${money(c.spent)}</td></tr>`).join('')}</tbody></table></div>`:'<div class="empty"><h3>No customers yet</h3></div>'}
        <p class="small muted" style="margin-top:12px">Newsletter subscribers who opted in: <b>${db.subscribers.length}</b></p>`; }
    case 'enquiries': return `<h2 class="serif" style="font-size:28px;margin-bottom:14px">Enquiries</h2>${db.enquiries.length ? db.enquiries.map(e => `<div class="panelc" style="margin-bottom:10px;padding:14px 16px"><div class="row" style="justify-content:space-between"><b>${esc(e.name)} · ${esc(e.cat)}</b><span class="small muted">${fmtDate(e.at)}</span></div><div class="small muted">${esc(e.email)} ${e.phone?'· '+esc(e.phone):''} ${e.ref?'· ref '+esc(e.ref):''}</div><p style="margin:6px 0 0;white-space:pre-wrap">${esc(e.msg)}</p>
      <div class="row" style="margin-top:8px">${e.done?'<span class="pill ok">Handled</span>':`<button class="btn soft sm" data-act="enqdone" data-id="${e.id}">Mark handled</button>`}</div></div>`).join('') : '<div class="empty"><h3>No messages yet</h3></div>'}`;
    case 'settings': { const S = db.settings; return `<h2 class="serif" style="font-size:28px;margin-bottom:14px">Bakery Settings</h2><form id="setForm" novalidate style="display:grid;gap:14px">
      <div class="panelc"><b>Homepage</b><div style="display:grid;gap:10px;margin-top:10px"><label class="f">Announcement bar (leave empty to hide)<input class="in" id="st_ann" value="${esc(S.announcement)}"></label><label class="f">Hero headline<input class="in" id="st_ht" value="${esc(S.heroTitle.replace(/\n/g,' / '))}"></label><label class="f">Hero subtitle<input class="in" id="st_hs" value="${esc(S.heroSub)}"></label></div></div>
      <div class="panelc"><b>Ordering</b><div class="fgrid" style="margin-top:10px"><label class="f">Custom cake notice (days)<input class="in" id="st_lead" inputmode="numeric" value="${S.customLeadDays}"></label><label class="f">Max custom cakes per day<input class="in" id="st_maxc" inputmode="numeric" value="${S.maxCustomPerDay}"></label>
        <label class="f">Max items per day<input class="in" id="st_maxi" inputmode="numeric" value="${S.maxCakesPerDay}"></label><label class="f">Tax rate %<input class="in" id="st_tax" inputmode="decimal" value="${S.taxRate}"></label>
        <label class="f" style="grid-column:1/-1">Closed dates (YYYY-MM-DD, comma separated)<input class="in" id="st_bl" value="${esc(S.blackout.join(', '))}"></label></div></div>
      <div class="panelc"><b>Delivery</b><label class="check" style="margin:10px 0"><input type="checkbox" id="st_del" ${S.delivery.enabled?'checked':''}> Offer delivery</label>${S.delivery.zones.map((z,i) => `<div class="fgrid" style="margin-bottom:8px"><label class="f">Zone ${i+1}<input class="in" data-zn="${i}" value="${esc(z.name)}"></label><label class="f">Fee (Le)<input class="in" data-zf="${i}" inputmode="numeric" value="${z.fee}"></label></div>`).join('')}</div>
      <div class="panelc"><b>Rewards</b><label class="check" style="margin:10px 0"><input type="checkbox" id="st_loy" ${S.loyalty.enabled?'checked':''}> Rewards programme on</label><label class="f">Le spent per point<input class="in" id="st_pp" inputmode="numeric" value="${S.loyalty.pointsPer}"></label></div>
      <div class="panelc"><b>Custom cake pricing rules</b><div class="fgrid" style="margin-top:10px">${S.studio.sizes.map((z,i) => `<label class="f">${z.label} base<input class="in" data-sz="${i}" inputmode="numeric" value="${z.base}"></label>`).join('')}<label class="f">Each extra tier<input class="in" id="st_tier" inputmode="numeric" value="${S.studio.tierPrice}"></label>
        ${Object.entries(S.studio.deco).map(([k,v]) => `<label class="f">${k[0].toUpperCase()+k.slice(1)}<input class="in" data-dc="${k}" inputmode="numeric" value="${v}"></label>`).join('')}</div></div>
      <div class="row"><button class="btn" type="submit">Save settings</button><button class="btn ghost" type="button" data-act="resetdemo">Reset all data on this device</button></div><div id="st_msg" class="small" role="status"></div></form>`; }
    case 'bakeries': return `<h2 class="serif" style="font-size:28px;margin-bottom:6px">Bakeries</h2><p class="small muted" style="margin:0 0 14px">The platform keeps each bakery’s products, orders, customers and settings separate. Pa Sweet is the active storefront.</p>
      ${db.bakeries.map(b => `<div class="panelc row" style="justify-content:space-between;margin-bottom:10px;padding:14px 16px"><div><b>${esc(b.name)}</b><div class="small muted">${esc(b.id)} · ${esc(b.currency)} · ${esc(b.timezone)}</div></div>${b.status==='active'?'<span class="pill ok">Active storefront</span>':'<span class="pill warn">Onboarding — not published</span>'}</div>`).join('')}
      <form id="bkForm" class="panelc" novalidate><b>Start onboarding a bakery</b><div class="fgrid" style="margin-top:10px"><label class="f">Bakery name<input class="in" id="bk_name"></label><label class="f">Currency<input class="in" id="bk_cur" value="Le"></label></div><div id="bk_err" class="err"></div><button class="btn soft" style="margin-top:10px" type="submit">Create draft bakery</button>
      <p class="tiny muted" style="margin:8px 0 0">New bakeries stay unpublished until their details, products, payment and delivery settings are validated.</p></form>`;
  }
  return '';
}
function can(t){ return ROLES[adminRole].includes(t); }
function fmtQty(q, u){ return (Math.round(q*100)/100) + ' ' + u; }
function adminOrderTable(list){
  const next = ['Awaiting confirmation','Confirmed','In preparation','Ready for collection','Out for delivery','Completed','Cancelled'];
  return `<div class="tbl-wrap"><table class="t"><thead><tr><th>Order</th><th>Customer</th><th>Due</th><th>Total</th><th>Payment</th><th>Status</th><th></th></tr></thead><tbody>
  ${list.map(o => `<tr><td><b class="num">#${o.id}</b><div class="tiny muted">${o.items.reduce((a,i)=>a+i.qty,0)} item(s)${o.allergy?' · <span style="color:var(--bad)">allergy</span>':''}</div></td><td>${esc(o.customer.name)}<div class="tiny muted">${esc(o.customer.phone)}</div></td><td class="small">${fmtDate(o.fulfilment.date)}<br>${o.fulfilment.time} · ${o.fulfilment.method}</td><td class="num">${money(o.total)}</td>
    <td>${statusPill(o.payment.status)}${o.payment.status==='Awaiting payment' && ['Owner','Manager'].includes(adminRole) && o.status!=='Cancelled' ? `<br><button class="link-btn tiny" data-act="paid" data-id="${o.id}">Record payment received</button>` : ''}</td>
    <td>${can('orders')?`<select class="in" style="width:auto;padding:5px 8px" data-act="ostatus" data-id="${o.id}" aria-label="Order status">${next.filter(s => o.fulfilment.method==='delivery' || s!=='Out for delivery').map(s => `<option ${s===o.status?'selected':''}>${s}</option>`).join('')}</select>`:statusPill(o.status)}</td>
    <td><button class="btn soft sm" data-act="vieworder-staff" data-id="${o.id}">Open</button></td></tr>`).join('')}</tbody></table></div>`;
}

/* ---------- Event wiring ---------- */
document.addEventListener('click', e => {
  const el = e.target.closest('[data-act],[data-go],[data-close]');
  if (!el) return;
  if (el.dataset.close && e.target === el) { closeLayer(); return; }
  if (el.dataset.close && !el.dataset.act && !el.dataset.go) return;
  const a = el.dataset.act;
  if (!a && el.dataset.go) { e.preventDefault(); const p = {}; ['id','cat','tab','q','design','occ'].forEach(k => { if (el.dataset[k] !== undefined) p[k] = el.dataset[k]; }); go(el.dataset.go, p); return; }
  if (!a) return;
  e.stopPropagation();
  const id = el.dataset.id;
  const handlers = {
    close: closeLayer, search: openSearch, menu: openMenu,
    slide: () => { showSlide(slideI + +el.dataset.d); restartSlides(); }, dot: () => { showSlide(+el.dataset.i); restartSlides(); },
    fav: () => { const i = db.favs.indexOf(id); i>=0 ? db.favs.splice(i,1) : db.favs.push(id); save(); renderHeader();
      $$(`[data-act="fav"][data-id="${id}"]`).forEach(b => { b.classList.toggle('on', i<0); b.setAttribute('aria-pressed', i<0); }); toast(i<0 ? 'Saved to favourites' : 'Removed from favourites'); if (route.page==='account') render(); },
    quickadd: () => { const p = product(id); if (p.builder) go('product', {id}); else addToCart(id, {flavour:p.flavours[0], frosting:p.frostings[0]}, 1); },
    catpick: () => { const c = el.dataset.cat, i = shopState.cats.indexOf(c); if (i>=0) shopState.cats.splice(i,1); else shopState.cats = [c]; render(); },
    clearf: () => { Object.assign(shopState, {q:'', cats:[], max:1000, ready:false, order:false, occ:[]}); render(); },
    togglef: () => $('#filters').classList.toggle('open'),
    view: () => { shopState.view = el.dataset.v; render(); },
    pdimg: () => { pdState.imgI = +el.dataset.i; renderPD(); }, pdsize: () => { pdState.size = el.dataset.v; pdState.box = {}; renderPD(); },
    pdq: () => { pdState.qty = Math.max(1, Math.min(20, pdState.qty + +el.dataset.d)); renderPD(); },
    pdtab: () => { pdState.tab = el.dataset.t; renderPD(); },
    boxq: () => { const n = el.dataset.n; pdState.box[n] = Math.max(0, (pdState.box[n]||0) + +el.dataset.d); renderPD(); },
    pdadd: () => { const p = product(pdState.id); addToCart(p.id, {size:pdState.size, flavour:pdState.flavour, frosting:pdState.frosting}, pdState.qty, p.builder ? {box:Object.assign({}, pdState.box)} : null); },
    review: () => modal('Write a review', `<form id="revForm" novalidate><label class="f">Rating<select class="in" id="rv_r">${[5,4,3,2,1].map(n => `<option value="${n}">${n} star${n>1?'s':''}</option>`).join('')}</select></label><label class="f" style="margin-top:10px">Your review<textarea class="in" id="rv_t"></textarea></label><div id="rv_e" class="err"></div><button class="btn" style="margin-top:10px">Submit for approval</button></form>`, () => {
      $('#revForm').onsubmit = ev => { ev.preventDefault(); const t = $('#rv_t').value.trim(); if (t.length < 5) { $('#rv_e').textContent = 'Write a few words about your order.'; return; }
        db.reviews.push({id:uid('r'), productId:id, rating:+$('#rv_r').value, text:t, name:(db.user||{}).name||'Customer', at:new Date().toISOString(), status:'pending'}); save(); closeLayer(); toast('Thanks! Your review will appear once the bakery approves it.'); }; }),
    cq: () => { const l = db.cart.find(x => x.key === el.dataset.k); l.qty = Math.max(1, Math.min(50, l.qty + +el.dataset.d)); save(); renderHeader(); render(); },
    crm: () => { db.cart = db.cart.filter(x => x.key !== el.dataset.k); save(); renderHeader(); render(); },
    smode: () => { studio.mode = el.dataset.m; $$('.seg button').forEach(b => b.classList.toggle('on', b.dataset.m === studio.mode)); renderStudioMain(); },
    sopt: () => { studio.opt = el.dataset.o; refreshOpt(); },
    sset: () => { const k = el.dataset.k; let v = el.dataset.v; if (k === 'tiers') v = +v; studio.spec[k] = v; if (k==='shape' && v==='heart' && studio.spec.tiers>2) studio.spec.tiers = 2; if (k==='shape' && v!=='round') studio.spec.ruffle = false; studio.tpl = null; refreshOpt(); updateStudio('full'); },
    finish: () => { const v = el.dataset.v; studio.spec.ruffle = v === 'ruffle' && studio.spec.shape === 'round'; studio.spec.frosting = v === 'naked' ? 'naked' : 'smooth'; if (v==='ruffle' && studio.spec.shape!=='round') toast('Ruffles are available on round cakes only.'); refreshOpt(); updateStudio('full'); },
    scol: () => { studio.spec[el.dataset.k] = el.dataset.c; studio.tpl = null; refreshOpt(); updateStudio('full'); },
    usecol: () => { studio.spec.primary = el.dataset.c; studio.opt = 'colors'; refreshOpt(); updateStudio('full'); toast('Main colour updated from your photo'); },
    refrm: () => { studio.spec.ref = null; studio.spec.refColors = []; $('#refbox').innerHTML = ''; $('#refFile').value = ''; updateStudio('soft'); },
    interpret: () => { const txt = $('#sdesc').value.trim(); if (txt.length < 8) { toast('Describe your cake in a sentence or two first.'); return; }
      studio.before = JSON.parse(JSON.stringify(studio.spec)); const r = parseDesign(txt); Object.assign(studio.spec, r.got, {description:txt}); studio.interp = r; studio.tpl = null;
      $('#interp').innerHTML = interpHTML(r); refreshOpt(); updateStudio('full'); if (studio.view !== '3d') { studio.view = '3d'; render(); } },
    'interp-undo': () => { if (studio.before) { studio.spec = studio.before; studio.interp = null; renderStudioMain(); updateStudio('full'); } },
    sview: () => { studio.view = el.dataset.v; render(); },
    v3: () => cake3d && cake3d.cmd(el.dataset.c),
    tpl: () => { const tp = TEMPLATES.find(t => t.name === el.dataset.n); studio.spec = Object.assign(baseSpec(), {flowers:false,pearls:false,drip:false,sprinkles:false,berries:false,ruffle:false,topper:'none'}, JSON.parse(JSON.stringify(tp.s)), {description:studio.spec.description, ref:studio.spec.ref, refColors:studio.spec.refColors}); studio.tpl = tp.name; studio.interp = null; studio.designId = null;
      $$('.tpl').forEach(b => b.classList.toggle('on', b.dataset.n === tp.name)); renderStudioMain(); updateStudio('full'); },
    savedesign: () => saveDesign(false), quote: () => { const iss = feasibility(studio.spec); if (iss.length) { toast(iss[0]); return; } quoteForm(); },
    dupdesign: () => { const d = db.designs.find(x => x.id === id); db.designs.unshift(Object.assign(JSON.parse(JSON.stringify(d)), {id:uid('d'), title:d.title+' (copy)', quoteId:null, createdAt:new Date().toISOString(), updatedAt:new Date().toISOString(), revisions:[]})); save(); render(); },
    deldesign: () => { db.designs = db.designs.filter(x => x.id !== id); save(); render(); },
    acceptquote: () => { const q = db.quotes.find(x => x.id === id); if (!q || q.status !== 'Quote prepared') return;
      if (db.cart.some(l => l.quoteId === q.id)) { go('cart'); return; }
      db.cart.push({key:uid('l'), sig:'q'+q.id, productId:'__custom', name:'Custom cake · ' + q.spec.occasion, img:'studio', options:{size:q.spec.size+' inch', flavour:q.spec.flavour}, qty:1, lockedPrice:q.quotedPrice, custom:true, quoteId:q.id});
      q.status = 'Approved'; q.history.push({status:'Approved', at:new Date().toISOString(), by:'customer'}); save(); renderHeader(); go('cart'); },
    logout: () => { db.user = null; save(); go('account'); },
    delcel: () => { db.celebrations = db.celebrations.filter(c => c.id !== id); save(); render(); },
    deladdr: () => { db.addresses = db.addresses.filter(a => a.id !== id); save(); render(); },
    export: () => { const d = {profile:db.user, addresses:db.addresses, orders:T.orders(), designs:db.designs, quotes:T.quotes(), celebrations:db.celebrations, favourites:db.favs};
      $('#dataout').innerHTML = `<textarea class="in" style="margin-top:10px;min-height:160px;font-family:monospace;font-size:12px" readonly>${esc(JSON.stringify(d, null, 2))}</textarea><button class="btn soft sm" style="margin-top:6px" data-act="copy" data-src="dataout">Copy</button>`; },
    erase: () => { $('#dataout').innerHTML = `<div class="note" style="margin-top:10px">This removes your profile, addresses, designs and celebrations from this device. Orders stay with the bakery. <button class="btn sm" data-act="erase2">Yes, erase</button></div>`; },
    erase2: () => { Object.assign(db, {user:null, addresses:[], designs:[], celebrations:[], favs:[], cart:[]}); save(); renderHeader(); go('account'); toast('Your data was erased from this device.'); },
    vieworder: () => orderModal(T.orders().find(o => o.id === id), false), 'vieworder-staff': () => orderModal(T.orders().find(o => o.id === id), true),
    reorder: () => { const o = T.orders().find(x => x.id === id); let n = 0; o.items.forEach(i => { if (i.custom) return; const p = product(i.productId); if (p && p.available) { db.cart.push({key:uid('l'), sig:uid('s'), productId:i.productId, name:p.name, img:p.img, options:i.options, qty:i.qty, box:i.box}); n++; } });
      save(); renderHeader(); closeLayer(); toast(n ? 'Added available items to your cart at today’s prices.' : 'None of these items are available right now.'); if (n) go('cart'); },
    copy: () => { const v = el.dataset.src ? $('#'+el.dataset.src+' textarea').value : el.dataset.v;
      try { navigator.clipboard.writeText(v).then(() => toast('Copied'), () => toast('Select the text to copy it')); } catch(err) { toast('Select the text to copy it'); } },
    paid: () => { const o = db.orders.find(x => x.id === id); o.payment.status = 'Paid'; o.history.push({status:'Payment recorded', at:new Date().toISOString(), by:adminRole}); audit('Recorded payment for', o.id); save(); render(); },
    stage: () => { const o = db.orders.find(x => x.id === id), i = STAGES.indexOf(o.stage||'Confirmed') + +el.dataset.d; o.stage = STAGES[Math.max(0, Math.min(STAGES.length-1, i))];
      o.status = o.stage === 'Ready for collection' ? 'Ready for collection' : o.stage === 'Confirmed' ? 'Confirmed' : 'In preparation'; o.history.push({status:o.stage, at:new Date().toISOString(), by:adminRole}); audit('Moved to '+o.stage, o.id); save(); render(); },
    qsend: () => { const q = db.quotes.find(x => x.id === id), p = parseInt(($('#qp_'+id).value||'').replace(/\D/g,''),10); if (!p) { toast('Enter the quoted price first.'); return; }
      Object.assign(q, {quotedPrice:p, staffNotes:$('#qn_'+id).value.trim(), status:'Quote prepared'}); q.history.push({status:'Quote prepared', at:new Date().toISOString(), by:adminRole}); audit('Sent quote '+money(p)+' for', q.id); save(); render(); toast('Quote saved. Call the customer to let them know it’s ready.'); },
    qrev: () => { const q = db.quotes.find(x => x.id === id); q.staffNotes = $('#qn_'+id).value.trim() || 'The bakery has a question about your design — we’ll call you.'; q.status = 'Revision requested'; q.history.push({status:'Revision requested', at:new Date().toISOString(), by:adminRole}); audit('Requested changes on', q.id); save(); render(); },
    qdecline: () => { const q = db.quotes.find(x => x.id === id); q.staffNotes = $('#qn_'+id).value.trim(); q.status = 'Declined'; q.history.push({status:'Declined', at:new Date().toISOString(), by:adminRole}); audit('Declined', q.id); save(); render(); },
    qopen: () => { const q = db.quotes.find(x => x.id === id); studio.spec = Object.assign(baseSpec(), JSON.parse(JSON.stringify(q.spec))); studio.tpl = null; studio.designId = null; go('studio'); },
    mv: () => { const it = db.inventory.find(x => x.id === id), amt = parseFloat($('#mv_'+id).value); if (!(amt > 0)) { toast('Enter an amount in '+it.unit+'.'); return; }
      const d = +el.dataset.d, delta = d === 1 ? amt : -amt; if (it.qty + delta < 0) { toast('That’s more than is in stock.'); return; } it.qty += delta;
      db.movements.unshift({at:new Date().toISOString(), name:it.name, unit:it.unit, amount:delta, type:d===1?'received':d===-1?'used':'wasted'}); audit((d===1?'Received ':'Used ')+fmtQty(amt,it.unit)+' of', it.name); save(); render(); },
    pedit: () => productEditor(id), padd: () => productEditor(null),
    enqdone: () => { const e2 = db.enquiries.find(x => x.id === id); e2.done = true; audit('Handled enquiry from', e2.name); save(); render(); },
    resetdemo: () => { $('#st_msg').innerHTML = `This deletes every order, design and setting on this device. <button type="button" class="btn sm" data-act="resetdemo2">Delete everything</button>`; },
    resetdemo2: () => { db = freshDB(); save(); renderHeader(); go('admin'); toast('All data on this device was reset.'); }
  };
  if (handlers[a]) handlers[a]();
});
document.addEventListener('change', e => {
  const el = e.target;
  if (el.dataset.act === 'ostatus') { const o = db.orders.find(x => x.id === el.dataset.id); o.status = el.value; if (el.value === 'Confirmed' && !o.stage) o.stage = 'Confirmed'; if (el.value === 'Cancelled' && o.payment.status === 'Paid') o.payment.status = 'Refund pending';
    o.history.push({status:el.value, at:new Date().toISOString(), by:adminRole}); audit('Set status '+el.value+' on', o.id); save(); render(); }
  if (el.dataset.act === 'ptoggle') { const p = db.promos.find(x => x.code === el.dataset.code); p.active = el.checked; save(); }
  if (el.dataset.pf) { const p = db.products.find(x => x.id === el.dataset.id && x.bakeryId === BAKERY.id); const k = el.dataset.pf;
    if (k === 'available' || k === 'featured') p[k] = el.checked; else if (k === 'price' || k === 'lead') { const n = parseInt(el.value,10); if (n >= 0) p[k] = n; else el.value = p[k]; } else p[k] = el.value.trim();
    audit('Updated '+k+' of', p.name); save(); }
  if (el.id === 'pconf') { db.settings.pricesConfirmed = el.checked; save(); }
  if (el.id === 'roleSel') { adminRole = el.value; render(); }
});

function productEditor(id){
  const p = id ? product(id) : {id:'', name:'', cat:'cakes', price:0, desc:'', sizes:[['Standard',0]], flavours:[], frostings:[], made:'ready', lead:0, available:false, featured:false, tags:[], img:'slice', gallery:['slice'], ingredients:'', allergens:'', storage:'', nutrition:'', occasion:[]};
  modal(id ? 'Edit ' + p.name : 'Add product', `<form id="peForm" novalidate><div style="display:grid;gap:10px">
    <label class="f">Name<input class="in" id="pe_name" value="${esc(p.name)}"></label>
    <div class="fgrid"><label class="f">Category<select class="in" id="pe_cat">${CATS.map(c => `<option value="${c.id}" ${c.id===p.cat?'selected':''}>${c.name}</option>`).join('')}</select></label><label class="f">Type<select class="in" id="pe_made"><option value="ready" ${p.made==='ready'?'selected':''}>Ready to buy</option><option value="order" ${p.made==='order'?'selected':''}>Made to order</option></select></label></div>
    <label class="f">Description<textarea class="in" id="pe_desc">${esc(p.desc)}</textarea></label>
    <label class="f">Sizes and extra price (one per line, e.g. “8 inch | 150”)<textarea class="in" id="pe_sizes">${esc(p.sizes.map(s => s[0]+' | '+s[1]).join('\n'))}</textarea></label>
    <div class="fgrid"><label class="f">Flavours (comma separated)<input class="in" id="pe_fl" value="${esc(p.flavours.join(', '))}"></label><label class="f">Frostings (comma separated)<input class="in" id="pe_fr" value="${esc(p.frostings.join(', '))}"></label></div>
    <label class="f">Ingredients (as verified by the bakery)<textarea class="in" id="pe_ing">${esc(p.ingredients)}</textarea></label>
    <div class="fgrid"><label class="f">Storage & shelf life<input class="in" id="pe_sto" value="${esc(p.storage)}"></label><label class="f">Search tags (comma separated)<input class="in" id="pe_tags" value="${esc(p.tags.join(', '))}"></label></div>
    <label class="f">Photo<input class="in" type="file" id="pe_img" accept="image/jpeg,image/png,image/webp"></label>
    <div id="pe_err" class="err"></div><button class="btn" type="submit">${id?'Save product':'Add product (unpublished)'}</button></div></form>`, () => {
    $('#peForm').onsubmit = ev => { ev.preventDefault(); const name = $('#pe_name').value.trim(); if (name.length < 2) { $('#pe_err').textContent = 'Give the product a name.'; return; }
      const sizes = $('#pe_sizes').value.split('\n').map(l => l.split('|').map(s => s.trim())).filter(l => l[0]).map(l => [l[0], parseInt(l[1]||'0',10)||0]);
      if (!sizes.length) { $('#pe_err').textContent = 'Add at least one size.'; return; }
      const list = s => s.split(',').map(x => x.trim()).filter(Boolean);
      const finish = (imgData) => { const target = id ? db.products.find(x => x.id === id && x.bakeryId === BAKERY.id) : Object.assign({}, p, {id:name.toLowerCase().replace(/[^a-z0-9]+/g,'-')+'-'+Date.now().toString(36).slice(-4), bakeryId:BAKERY.id, added:Date.now()});
        Object.assign(target, {name, cat:$('#pe_cat').value, made:$('#pe_made').value, desc:$('#pe_desc').value.trim(), sizes, flavours:list($('#pe_fl').value), frostings:list($('#pe_fr').value), ingredients:$('#pe_ing').value.trim(), storage:$('#pe_sto').value.trim(), tags:list($('#pe_tags').value)});
        if (imgData) { target.img = imgData; target.gallery = [imgData]; }
        if (!id) db.products.push(target); audit((id?'Edited ':'Added ')+'product', name); save(); closeLayer(); render(); toast(id ? 'Product saved' : 'Product added. Tick “On sale” to publish it.'); };
      const f = $('#pe_img').files[0];
      if (f) { if (f.size > 4*1024*1024) { $('#pe_err').textContent = 'Photo must be under 4 MB.'; return; } const r = new FileReader(); r.onload = () => { const im = new Image(); im.onload = () => { const c = document.createElement('canvas'), k = Math.min(1, 700/Math.max(im.width, im.height)); c.width = im.width*k; c.height = im.height*k; c.getContext('2d').drawImage(im,0,0,c.width,c.height); finish(c.toDataURL('image/jpeg', .8)); }; im.src = r.result; }; r.readAsDataURL(f); }
      else finish(null); };
  });
}

/* ---------- Page-level wiring after render ---------- */
document.addEventListener('submit', e => {
  const f = e.target, v = id => (($('#'+id)||{}).value||'').trim();
  if (f.id === 'promoForm') { e.preventDefault(); cartPromo = v('promo'); render(); }
  if (f.id === 'coForm') { e.preventDefault(); placeOrder(); }
  if (f.id === 'signForm') { e.preventDefault(); const n = v('s_name'), em = v('s_email');
    if (n.length < 2 || !validEmail(em)) { $('#s_err').textContent = 'Enter your name and a valid email.'; return; }
    db.user = {name:n, email:em, phone:v('s_phone'), marketing:$('#s_mk').checked, since:new Date().toISOString()};
    if ($('#s_mk').checked && !db.subscribers.find(s => s.email === em)) db.subscribers.push({email:em, at:new Date().toISOString(), consent:true, bakeryId:BAKERY.id});
    save(); render(); toast('Welcome, ' + n.split(' ')[0] + '!'); }
  if (f.id === 'profForm') { e.preventDefault(); if (v('p_name').length < 2 || !validEmail(v('p_email'))) { $('#p_err').textContent = 'Enter your name and a valid email.'; return; }
    Object.assign(db.user, {name:v('p_name'), email:v('p_email'), phone:v('p_phone'), marketing:$('#p_mk').checked}); save(); toast('Profile saved'); render(); }
  if (f.id === 'addrForm') { e.preventDefault(); if (v('ad_text').length < 6) { toast('Enter the full address.'); return; } db.addresses.push({id:uid('a'), label:v('ad_label')||'Address', text:v('ad_text')}); save(); render(); }
  if (f.id === 'celForm') { e.preventDefault(); if (!v('ce_name') || !v('ce_date')) { $('#ce_err').textContent = 'Add the event name and date.'; return; }
    db.celebrations.push({id:uid('c'), name:v('ce_name'), date:v('ce_date'), pref:v('ce_pref'), rem:v('ce_rem')}); save(); render(); toast('Saved to your Memory Book'); }
  if (f.id === 'contactForm') { e.preventDefault(); const errs = [];
    if (v('m_name').length < 2) errs.push('Enter your name.'); if (!validEmail(v('m_email'))) errs.push('Enter a valid email so we can reply.'); if (v('m_msg').length < 5) errs.push('Write your message.'); if (!$('#m_ok').checked) errs.push('Tick the box so we can reply to you.');
    if (errs.length) { $('#m_err').innerHTML = errs.map(esc).join('<br>'); return; }
    db.enquiries.unshift({id:uid('e'), bakeryId:BAKERY.id, at:new Date().toISOString(), name:v('m_name'), email:v('m_email'), phone:v('m_phone'), cat:v('m_cat'), ref:v('m_ref'), msg:v('m_msg'), done:false}); save();
    f.outerHTML = `<div class="note fade-in" style="background:#fff"><b>Message received.</b> It’s in Pa Sweet’s staff inbox. For anything urgent, call ${BAKERY.phones[0]}.</div>`; }
  if (f.id === 'invForm') { e.preventDefault(); const q = parseFloat(v('iv_qty')), m = parseFloat(v('iv_min'));
    if (!v('iv_name') || !(q >= 0) || !(m >= 0)) { $('#iv_err').textContent = 'Enter a name, current stock and reorder level.'; return; }
    db.inventory.push({id:uid('i'), bakeryId:BAKERY.id, name:v('iv_name'), unit:v('iv_unit'), qty:q, min:m, supplier:v('iv_sup')}); audit('Added ingredient', v('iv_name')); save(); render(); }
  if (f.id === 'promoAdd') { e.preventDefault(); const code = v('pr_code').toUpperCase().replace(/\s/g,''), val = parseFloat(v('pr_val'));
    if (!/^[A-Z0-9]{3,20}$/.test(code)) { $('#pr_err').textContent = 'Codes use 3–20 letters or numbers.'; return; } if (db.promos.find(p => p.code === code)) { $('#pr_err').textContent = 'That code already exists.'; return; }
    if (!(val > 0) || (v('pr_type')==='percent' && val > 90)) { $('#pr_err').textContent = 'Enter a valid discount (percent up to 90).'; return; }
    db.promos.push({code, type:v('pr_type'), value:val, minSpend:parseFloat(v('pr_min'))||0, start:v('pr_start'), end:v('pr_end'), maxUses:parseInt(v('pr_max'),10)||0, uses:0, active:true, bakeryId:BAKERY.id}); audit('Created promo', code); save(); render(); }
  if (f.id === 'setForm') { e.preventDefault(); const S = db.settings, n = (id, def) => { const x = parseFloat(v(id)); return x >= 0 ? x : def; };
    S.announcement = v('st_ann'); S.heroTitle = v('st_ht').split('/').map(s => s.trim()).join('\n') || S.heroTitle; S.heroSub = v('st_hs');
    S.customLeadDays = n('st_lead', S.customLeadDays); S.maxCustomPerDay = n('st_maxc', S.maxCustomPerDay); S.maxCakesPerDay = n('st_maxi', S.maxCakesPerDay); S.taxRate = n('st_tax', S.taxRate);
    S.blackout = v('st_bl').split(',').map(s => s.trim()).filter(s => /^\d{4}-\d{2}-\d{2}$/.test(s));
    S.delivery.enabled = $('#st_del').checked; $$('[data-zn]').forEach(i => S.delivery.zones[+i.dataset.zn].name = i.value.trim() || S.delivery.zones[+i.dataset.zn].name); $$('[data-zf]').forEach(i => { const x = parseFloat(i.value); if (x >= 0) S.delivery.zones[+i.dataset.zf].fee = x; });
    S.loyalty.enabled = $('#st_loy').checked; S.loyalty.pointsPer = Math.max(1, n('st_pp', S.loyalty.pointsPer));
    $$('[data-sz]').forEach(i => { const x = parseFloat(i.value); if (x >= 0) S.studio.sizes[+i.dataset.sz].base = x; }); S.studio.tierPrice = n('st_tier', S.studio.tierPrice);
    $$('[data-dc]').forEach(i => { const x = parseFloat(i.value); if (x >= 0) S.studio.deco[i.dataset.dc] = x; });
    audit('Updated bakery settings', ''); save(); renderHeader(); $('#st_msg').textContent = 'Settings saved.'; }
  if (f.id === 'bkForm') { e.preventDefault(); const n = v('bk_name'); if (n.length < 2) { $('#bk_err').textContent = 'Enter the bakery name.'; return; }
    db.bakeries.push({id:n.toLowerCase().replace(/[^a-z0-9]+/g,'-'), name:n, status:'onboarding', currency:v('bk_cur')||'Le', timezone:'Africa/Freetown'}); audit('Started onboarding', n); save(); render(); }
});

let slideRun;
function restartSlides(){ clearInterval(slideRun); if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) slideRun = setInterval(() => showSlide(slideI+1), 6500); }
function render(){
  if (cleanup) { try { cleanup(); } catch(e) {} cleanup = null; }
  if (route.page === 'checkout' && !db.cart.length) route.page = 'cart';
  $('#app').innerHTML = `<div class="fade-in">${(V[route.page]||V.home)(route.params)}</div>`;
  renderHeader();
  clearInterval(slideRun);
  if (route.page === 'home') { slideI = 0; restartSlides(); }
  if (route.page === 'shop') { shopResults();
    const q = $('#shopq'); let t; q.oninput = () => { clearTimeout(t); t = setTimeout(() => { shopState.q = q.value; shopResults(); }, 150); };
    $('#fprice').oninput = e => { shopState.max = +e.target.value; $('#fpv').textContent = money(shopState.max); shopResults(); };
    $('#sortby').onchange = e => { shopState.sort = e.target.value; shopResults(); };
    $$('#filters input[type=checkbox]').forEach(cb => cb.onchange = () => { const f = cb.dataset.f;
      if (f === 'cat') shopState.cats = $$('#filters [data-f=cat]:checked').map(x => x.value); else if (f === 'occ') shopState.occ = $$('#filters [data-f=occ]:checked').map(x => x.value); else shopState[f] = cb.checked;
      $$('.caticons button').forEach(b => b.classList.toggle('on', shopState.cats.includes(b.dataset.cat))); shopResults(); }); }
  if (route.page === 'product') { renderPD(); $('#gallery').addEventListener('click', ev => { const m = ev.target.closest('#pdmain'); if (m) m.classList.toggle('zoom'); }); }
  if (route.page === 'checkout') { $$('input[name=m]').forEach(r => r.onchange = () => { readCO(); co.method = r.value; render(); }); const z = $('#c_zone'); if (z) z.onchange = () => { readCO(); render(); }; }
  if (route.page === 'studio') mountStudio();
  if (route.page === 'contact' && route.params.tab === 'faq') { const f = $('#faq'); if (f) setTimeout(() => f.scrollIntoView(), 50); }
  document.title = ({home:'Pa Sweet Bakery', shop:'Shop · Pa Sweet', product:((product(route.params.id)||{}).name||'Product')+' · Pa Sweet', studio:'Cake Studio · Pa Sweet', cart:'Cart · Pa Sweet', checkout:'Checkout · Pa Sweet', account:'My Account · Pa Sweet', contact:'Contact · Pa Sweet', about:'About · Pa Sweet', admin:'Staff · Pa Sweet'})[route.page] || 'Pa Sweet Bakery';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape' && $('#layer').innerHTML) closeLayer();
  if (e.key === 'Enter' && e.target.classList && e.target.classList.contains('card')) e.target.click(); });

/* custom quote line uses a virtual (hidden) product so the cart and checkout can validate it */
if (!db.products.find(p => p.id === '__custom')) db.products.push({id:'__custom', bakeryId:BAKERY.id, name:'Custom cake', cat:'__hidden', img:'studio', gallery:['studio'], price:0, sizes:[], flavours:[], frostings:[], made:'order', lead:0, available:true, featured:false, tags:[], hidden:true, desc:'', ingredients:'', allergens:'', storage:'', nutrition:'', occasion:[]});

renderFooter(); render();
if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) window.addEventListener('load', () => { try { navigator.serviceWorker.register('sw.js').catch(() => {}); } catch(e) {} });
})();
