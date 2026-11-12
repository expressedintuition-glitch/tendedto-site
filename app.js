// Tended To by Tai — Home page: categories, service lists, add-on panel
(function () {
  var BOOK = 'https://tendedto.as.me/schedule/cf6c2302';

  var SERVICES = [
    { cat: 'Facials', name: 'The Reset Facial', price: '$55', time: '30 min', desc: 'Five-step facial to cleanse, exfoliate and hydrate.' },
    { cat: 'Facials', name: 'Targeted Facial', price: '$75', time: '50 min', desc: 'Customized to what your skin needs most — oil, breakouts, dryness or texture.' },
    { cat: 'Facials', name: 'Reverse The Clock', price: '$85', time: '50 min', desc: 'Anti-aging facial for fine lines and firmness. Includes high frequency and enzyme exfoliation.' },
    { cat: 'Facials', name: 'Halo Facial', price: '$85', time: '45 min', desc: 'Evens tone and dark spots. Includes microdermabrasion, LED light therapy and enzyme exfoliation.' },
    { cat: 'Facials', name: 'Bacial', price: '$55', time: '30 min', desc: 'Back facial that clears clogged pores, dryness and uneven texture.' },
    { cat: 'Waxing', name: 'ManZillian', price: '$65', time: '30 min', desc: 'Hard wax only. Discreet, professional, built around comfort.' },
    { cat: 'Waxing', name: 'Brazilian', price: '$65', time: '30 min', desc: 'Hard wax only. Smooth, long-lasting results.' },
    { cat: 'Waxing', name: 'Full Back Wax', price: '$60', time: '30 min', desc: 'Hard wax only. Clean, smooth results that last.' },
    { cat: 'Waxing', name: 'Leg Wax', price: '$35', time: '30 min', desc: 'Hard wax only.' },
    { cat: 'Waxing', name: 'Arm Wax', price: '$35', time: '30 min', desc: 'Hard wax only.' },
    { cat: 'Body & Massage', name: 'Lymphatic Drainage', price: '$70', time: '30 min', desc: 'Light, rhythmic massage to reduce fluid retention and improve circulation.' },
    { cat: 'Body & Massage', name: 'Sculpt & Smooth', price: '$100', time: '1 hr', desc: 'Non-invasive body contouring for stubborn areas and skin texture.' },
    { cat: 'Packages', name: '6 Pack Wax Bundle', price: '$330', time: 'bundle', desc: 'Six Brazilian or ManZillian waxes at a package rate.' },
    { cat: 'Packages', name: 'Sculpt & Smooth Bundle', price: '$500', time: 'bundle', desc: 'Multiple contouring sessions paired with lymphatic drainage.' },
    { cat: 'Packages', name: '[SUBSCRIPTION NAME]', price: '[PRICE]/mo', time: 'monthly', desc: '[What is included each month — e.g. one facial plus member pricing on add-ons]' }
  ];

  var CATEGORIES = [
    { key: 'Facials', label: 'Facials' },
    { key: 'Waxing', label: 'Waxing' },
    { key: 'Body & Massage', label: 'Massage' },
    { key: 'Packages', label: 'Packages' }
  ];

  var PICKS = [
    { label: 'FOR HIM', line: 'Smooth shave, clear back, no bumps.', items: ['Targeted Facial', 'Bacial', 'ManZillian', 'Full Back Wax'] },
    { label: 'FOR HER', line: 'Glow, tone, and a little you-time.', items: ['Halo Facial', 'Reverse The Clock', 'Brazilian', 'Lymphatic Drainage'] }
  ];

  var ADDONS = [
    { name: 'Microdermabrasion', desc: 'Buffs away dead skin for smoother texture.', price: '[PRICE]' },
    { name: 'LED Light Therapy', desc: 'Calms redness and helps clear breakouts.', price: '[PRICE]' },
    { name: 'High Frequency', desc: 'Targets acne and tightens pores.', price: '[PRICE]' },
    { name: 'Enzyme Exfoliation', desc: 'Gentle peel for brighter, even tone.', price: '[PRICE]' }
  ];

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function byName(n) { return SERVICES.filter(function (s) { return s.name === n; })[0]; }

  // ---- Categories
  var grid = document.getElementById('cat-grid');
  var list = document.getElementById('svc-list');
  var current = null;

  CATEGORIES.forEach(function (c) {
    var count = SERVICES.filter(function (s) { return s.cat === c.key; }).length;
    var b = el('button', 'cat-tile');
    b.type = 'button';
    b.setAttribute('aria-pressed', 'false');
    b.setAttribute('aria-controls', 'svc-list');
    b.appendChild(el('span', 'name', c.label));
    b.addEventListener('click', function () { toggle(c.key, b); });
    grid.appendChild(b);
  });

  function toggle(key, btn) {
    var open = current !== key;
    current = open ? key : null;
    Array.prototype.forEach.call(grid.children, function (t) { t.setAttribute('aria-pressed', 'false'); });
    list.innerHTML = '';
    if (!open) { list.hidden = true; return; }
    btn.setAttribute('aria-pressed', 'true');
    SERVICES.filter(function (s) { return s.cat === key; }).forEach(function (s) {
      var row = el('div', 'svc');
      var b = el('button', 'svc-btn');
      b.type = 'button';
      b.appendChild(el('span', null, s.name));
      b.appendChild(el('span', 'time', '(' + s.time + ')'));
      b.appendChild(el('span', 'price', s.price));
      b.addEventListener('click', function () { openPanel(s, b); });
      row.appendChild(b);
      row.appendChild(el('p', null, s.desc));
      list.appendChild(row);
    });
    list.hidden = false;
    // on phones, bring the list into view so people see what they tapped
    if (window.matchMedia('(max-width: 760px)').matches) {
      list.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // ---- Top performers
  var picks = document.getElementById('pick-grid');
  PICKS.forEach(function (p) {
    var card = el('div', 'pick');
    card.appendChild(el('span', 'eyebrow', p.label));
    card.appendChild(el('span', 'line', p.line));
    var wrap = el('div');
    wrap.style.display = 'flex';
    wrap.style.flexDirection = 'column';
    p.items.map(byName).forEach(function (s) {
      var b = el('button', 'pick-btn');
      b.type = 'button';
      b.appendChild(el('span', 'n', s.name));
      b.appendChild(el('span', 'p', '(' + s.time + ') ' + s.price));
      b.addEventListener('click', function () { openPanel(s, b); });
      wrap.appendChild(b);
    });
    card.appendChild(wrap);
    picks.appendChild(card);
  });

  // ---- Add-on panel
  var modal = document.getElementById('addon-modal');
  var selName = document.getElementById('sel-name');
  var selMeta = document.getElementById('sel-meta');
  var addonsBox = document.getElementById('addons');
  var cta = document.getElementById('cta');
  var noThanks = document.getElementById('no-thanks');
  var lastFocus = null;

  ADDONS.forEach(function (a) {
    var b = el('button', 'addon');
    b.type = 'button';
    b.setAttribute('aria-pressed', 'false');
    var box = el('span', 'box'); box.setAttribute('aria-hidden', 'true');
    var txt = el('span', 'txt');
    txt.appendChild(el('span', 'an', a.name));
    txt.appendChild(el('span', 'ad', a.desc));
    b.appendChild(box);
    b.appendChild(txt);
    b.appendChild(el('span', 'ap', '+' + a.price));
    b.addEventListener('click', function () {
      var on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      box.textContent = on ? '✓' : '';
      updateCta();
    });
    addonsBox.appendChild(b);
  });

  function updateCta() {
    var n = addonsBox.querySelectorAll('[aria-pressed="true"]').length;
    cta.textContent = n ? 'CONTINUE TO BOOKING · ' + n + ' ADD-ON' + (n > 1 ? 'S' : '') : 'CONTINUE TO BOOKING';
  }

  function openPanel(s, from) {
    lastFocus = from;
    selName.textContent = s.name;
    selMeta.textContent = '(' + s.time + ') · ' + s.price;
    noThanks.textContent = 'No thanks, book without add-ons';
    Array.prototype.forEach.call(addonsBox.children, function (b) {
      b.setAttribute('aria-pressed', 'false');
      b.querySelector('.box').textContent = '';
    });
    updateCta();
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    document.getElementById('close-modal').focus();
  }
  function closePanel() {
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  cta.href = BOOK;
  document.getElementById('close-modal').addEventListener('click', closePanel);
  noThanks.addEventListener('click', function () { window.location.href = BOOK; });
  modal.addEventListener('click', function (e) { if (e.target === modal) closePanel(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) closePanel(); });
})();

// ---- Hero slideshow: /slide-01.jpg ... /slide-20.jpg, one second each
(function () {
  var box = document.getElementById('hero-show');
  if (!box) return;
  var CODES = 'DfKZuuchCng DemxYNfOUtu Dee5olPN9aK DfpNFS3u0_Z DfkhAEEtVbr DfaBeQOuiJ7 DfXNVYQALgv DfU_7i2lhBz DfSkPLGuTka DdPclLDtBSl DfApDfduIdq DfPwPULs_tW DfSL2o7hSs5 DeXIpMzxPXb DfCbVHwgREI De_yWSHh29O DfFigjuBqUJ De9j9NYPm5M Deuxcewut9S Deua6wgJ7Xn'.split(' ');
  var N = CODES.length, shown = [], loaded = 0, done = 0;
  for (var i = 1; i <= N; i++) {
    (function (src) {
      var img = new Image();
      img.alt = '';
      img.onload = function () { shown.push(img); box.appendChild(img); finish(); };
      img.onerror = finish;
      img.src = src;
    })('/api/ig?c=' + CODES[i - 1]);
  }
  var started = false;
  function finish() {
    done++;
    if (!started && shown.length) { started = true; box.hidden = false; shown[0].classList.add('on'); run(); }
  }
  function run() {
    var k = 0;
    setInterval(function () {
      if (shown.length < 2) return;
      shown[k % shown.length].classList.remove('on');
      k = (k + 1) % shown.length;
      shown[k].classList.add('on');
    }, 2000);
  }
})();

// lets phones show the pop effect while a finger is on a tile
document.addEventListener('touchstart', function () {}, { passive: true });
