/* Clima Code: page behaviour. Reads --sc-p from the engine's acts; never edits the engine. */
(function () {
  'use strict';

  // Troque pelo número real (DDI + DDD + número, só dígitos).
  var WHATSAPP = '5500000000000';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  var narrow = window.matchMedia('(max-width: 860px)');

  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function seg(p, a, b) { return clamp((p - a) / (b - a), 0, 1); }
  function easeInOut(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function readP(el) { var v = parseFloat(el.style.getPropertyValue('--sc-p')); return isNaN(v) ? 0 : v; }

  // Scroll to the point inside a pinned act where its progress equals p.
  function scrollToP(act, p) {
    var top = act.getBoundingClientRect().top + window.scrollY;
    var travel = act.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + travel * p, behavior: reduce.matches ? 'auto' : 'smooth' });
  }

  /* ------------------------------------------------------------ pointer -- */
  var mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  window.addEventListener('pointermove', function (e) {
    if (!finePointer.matches || reduce.matches) return;
    mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.ty = (e.clientY / window.innerHeight) * 2 - 1;
  }, { passive: true });

  /* --------------------------------------------------------------- hero -- */
  var hero = document.getElementById('hero');
  var heroStage = hero.querySelector('.hero__stage');
  var heroTemp = document.getElementById('heroTemp');
  var heroDisp = document.getElementById('heroDisp');
  var heroLayers = Array.prototype.slice.call(hero.querySelectorAll('[data-depth]'));
  var lastTemp = null;

  function drawHero() {
    var p = readP(hero);
    var cool = easeInOut(seg(p, 0.02, 0.8));
    heroStage.style.setProperty('--heat', (1 - cool).toFixed(3));
    var t = Math.round(31 - 9 * cool);
    if (t !== lastTemp) { heroTemp.textContent = t + '°'; heroDisp.textContent = t + '°'; lastTemp = t; }
    for (var i = 0; i < heroLayers.length; i++) {
      var d = parseFloat(heroLayers[i].getAttribute('data-depth'));
      var lift = -p * d * 2.2;
      heroLayers[i].style.transform = 'translate3d(' + (mouse.x * d).toFixed(2) + 'px,' + (mouse.y * d * 0.6 + lift).toFixed(2) + 'px,0)';
    }
  }

  /* ----------------------------------------------------------- services -- */
  var svc = document.getElementById('servicos');
  var svcBtns = Array.prototype.slice.call(document.querySelectorAll('#svcList button'));
  var svcCards = Array.prototype.slice.call(document.querySelectorAll('#svcDetail .svc__card'));
  var N = svcBtns.length;
  var svcScrollIdx = 0, svcHover = -1, svcShown = -1;

  function showSvc(i) {
    if (i === svcShown) return;
    svcShown = i;
    for (var k = 0; k < N; k++) {
      svcBtns[k].classList.toggle('is-on', k === i);
      svcBtns[k].setAttribute('aria-pressed', k === i ? 'true' : 'false');
      svcCards[k].classList.toggle('is-on', k === i);
    }
  }
  svcBtns.forEach(function (b, i) {
    b.addEventListener('mouseenter', function () { if (finePointer.matches) svcHover = i; });
    b.addEventListener('focus', function () { svcHover = i; });
    b.addEventListener('click', function () {
      svcHover = -1;
      scrollToP(svc, (i + 0.5) / N);
      showSvc(i);
    });
  });
  document.getElementById('svcList').addEventListener('mouseleave', function () { svcHover = -1; });
  svcCards.forEach(function (c, i) {
    c.addEventListener('mouseenter', function () { if (finePointer.matches && svcHover === -1) svcHover = i; });
  });

  function drawServices() {
    var idx = Math.min(N - 1, Math.floor(readP(svc) * N));
    if (idx !== svcScrollIdx) { svcScrollIdx = idx; svcHover = -1; } // scroll retakes control
    showSvc(svcHover > -1 ? svcHover : svcScrollIdx);
  }

  /* --------------------------------------------- exploded view (peak) -- */
  var xp = document.getElementById('por-dentro');
  var scene = document.getElementById('xpScene');
  var view = document.getElementById('xpView');
  var parts = Array.prototype.slice.call(scene.querySelectorAll('.part'));
  var partById = [];
  parts.forEach(function (el) { partById[+el.getAttribute('data-part')] = el; });

  var INFO = [
    ['Tampa e gabinete', 'A carcaça que protege tudo. Sai inteira na higienização, e é nela que a sujeira de fora para primeiro.'],
    ['Defletores', 'As aletas que mandam o ar para cima, para baixo e para os lados. Quando travam, o motor de passo costuma ser o culpado.'],
    ['Filtros de ar', 'A primeira barreira contra poeira e pelos. Filtro entupido faz o aparelho gastar mais energia e gelar menos.'],
    ['Placa eletrônica', 'O cérebro do aparelho: lê o sensor de temperatura, recebe o controle remoto e comanda os motores. Os códigos de erro saem daqui.'],
    ['Serpentina evaporadora', 'Tubos de cobre com aletas de alumínio onde o gás troca calor com o ar. É ela que gela. Suja, vira foco de fungo e mau cheiro.'],
    ['Turbina e motor', 'O cilindro que puxa o ar pela serpentina e devolve para o ambiente. Gordura e poeira nas pás causam barulho e vibração.'],
    ['Bandeja de dreno', 'Recolhe a água que condensa na serpentina e leva até a mangueira. Entupida, é uma das causas mais comuns de aparelho pingando.'],
    ['Chassi e suporte', 'A base presa na parede. Precisa estar nivelada, senão a água escorre para o lado errado e pinga.']
  ];
  var FINAL = ['Oito peças, um aparelho', 'Na higienização e na manutenção, cada uma dessas peças é limpa, testada e volta para o lugar certo. Passe o mouse em qualquer peça para rever o que ela faz.'];
  var FINAL_TOUCH = 'Na higienização e na manutenção, cada uma dessas peças é limpa, testada e volta para o lugar certo.';

  // Final offsets [dx, dy, dz] per part, art-directed separately for wide and narrow stages.
  var VEC_WIDE = [
    [-40, -290, 300], // tampa
    [-20, 190, 250],  // defletores
    [-10, -150, 190], // filtros
    [360, -40, 120],  // placa
    [0, -10, 60],     // serpentina
    [0, 150, -40],    // turbina
    [0, 290, -80],    // bandeja
    [60, -40, -300]   // chassi
  ];
  var VEC_NARROW = [
    [0, -420, 130],
    [0, 300, 110],
    [0, -300, 90],
    [-280, -150, 60],
    [0, -120, 30],
    [0, 230, -10],
    [0, 400, -30],
    [0, 40, -200]
  ];
  var START = 0.1, STEP = 0.095; // part k moves during [START + k*STEP, START + (k+1)*STEP]
  var END = START + STEP * 8;

  // Build captions + legend from INFO so the copy lives in one place.
  var capsEl = document.getElementById('xpCaptions');
  var legendEl = document.getElementById('xpLegend');
  var caps = [], legend = [];
  INFO.concat([FINAL]).forEach(function (row, i) {
    var a = document.createElement('article');
    a.className = 'xp__cap';
    var h = document.createElement('h3'); h.textContent = row[0];
    var p = document.createElement('p'); p.textContent = row[1];
    if (i === INFO.length) p.className = 'xp__final';
    a.appendChild(h); a.appendChild(p); capsEl.appendChild(a); caps.push(a);
    if (i < INFO.length) {
      var li = document.createElement('li');
      var b = document.createElement('button'); b.type = 'button'; b.textContent = row[0];
      b.addEventListener('mouseenter', function () { xpHover = i; });
      b.addEventListener('mouseleave', function () { xpHover = -1; });
      b.addEventListener('focus', function () { xpHover = i; });
      b.addEventListener('blur', function () { xpHover = -1; });
      b.addEventListener('click', function () { goToPart(i); });
      li.appendChild(b); legendEl.appendChild(li); legend.push(b);
    }
  });
  var finalP = capsEl.querySelector('.xp__final');

  function goToPart(i) { scrollToP(xp, START + STEP * (i + 0.85)); }

  var xpHover = -1;
  parts.forEach(function (el) {
    var id = +el.getAttribute('data-part');
    el.addEventListener('mouseenter', function () { if (finePointer.matches) xpHover = id; });
    el.addEventListener('mouseleave', function () { if (xpHover === id) xpHover = -1; });
  });
  view.addEventListener('mouseleave', function () { xpHover = -1; });

  var xpP = 0, xpShown = -2, rot = { x: 0, y: 0 };

  function sceneScale() {
    var w = xp.clientWidth, h = window.innerHeight;
    if (narrow.matches) return Math.min((w * 0.86) / 720, (h * 0.5) / 1100);
    return Math.min((w * 0.56) / 1180, (h * 0.78) / 820, 1.05);
  }

  function drawXp() {
    var target = readP(xp);
    xpP = reduce.matches ? target : xpP + (target - xpP) * 0.16;
    if (Math.abs(target - xpP) < 0.0004) xpP = target;
    var p = xpP;
    var vec = narrow.matches ? VEC_NARROW : VEC_WIDE;

    // Which part is "speaking": the one in motion, else the last that moved.
    var active = -1;
    for (var k = 0; k < 8; k++) {
      var e = easeInOut(seg(p, START + k * STEP, START + (k + 1) * STEP));
      if (p >= START + k * STEP) active = k;
      var v = vec[k], el = partById[k];
      el.style.transform = 'translate3d(' + (v[0] * e).toFixed(1) + 'px,' + (v[1] * e).toFixed(1) + 'px,calc(var(--z) + ' + (v[2] * e).toFixed(1) + 'px))';
      el.classList.toggle('is-out', e > 0.5);
    }
    var done = p >= END;
    var open = p >= START * 0.6;
    var shown = xpHover > -1 ? xpHover : done ? 8 : active;

    // Camera: slow orbit across the act, plus pointer tilt.
    var s = sceneScale();
    var baseY = narrow.matches ? -16 : -26;
    var baseX = narrow.matches ? -16 : -13;
    var ry = baseY - 12 * easeInOut(seg(p, 0.05, 1)) + rot.y;
    var rx = baseX - 3 * easeInOut(seg(p, 0.05, 1)) + rot.x;
    scene.style.transform = 'scale(' + s.toFixed(3) + ') rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg)';

    xp.classList.toggle('is-open', open);
    xp.classList.toggle('is-done', done);
    if (shown !== xpShown) {
      xpShown = shown;
      caps.forEach(function (c, i) { c.classList.toggle('is-on', i === shown); });
      legend.forEach(function (b, i) { b.classList.toggle('is-on', i === shown); });
      parts.forEach(function (el) {
        var id = +el.getAttribute('data-part');
        el.classList.toggle('is-on', id === shown);
        el.classList.toggle('is-dim', shown > -1 && shown < 8 && id !== shown);
      });
    }
    legend.forEach(function (b, i) { b.classList.toggle('is-out', p >= START + i * STEP); });
  }

  function syncFinalCopy() { finalP.textContent = finePointer.matches ? FINAL[1] : FINAL_TOUCH; }
  syncFinalCopy();
  if (finePointer.addEventListener) finePointer.addEventListener('change', syncFinalCopy);

  /* -------------------------------------------- signs → exploded view -- */
  Array.prototype.forEach.call(document.querySelectorAll('.signs__list li'), function (li) {
    li.tabIndex = 0;
    li.setAttribute('role', 'link');
    function go() { goToPart(+li.getAttribute('data-goto')); }
    li.addEventListener('click', go);
    li.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
  });

  /* --------------------------------------------------- bar over dark -- */
  var bar = document.getElementById('bar');
  function drawBar() {
    var r = xp.getBoundingClientRect();
    bar.classList.toggle('is-dark', r.top < 40 && r.bottom > 40);
  }

  /* -------------------------------------------------------------- loop -- */
  function frame() {
    mouse.x += (mouse.tx - mouse.x) * 0.08;
    mouse.y += (mouse.ty - mouse.y) * 0.08;
    rot.x += ((finePointer.matches && !reduce.matches ? -mouse.y * 5 : 0) - rot.x) * 0.1;
    rot.y += ((finePointer.matches && !reduce.matches ? mouse.x * 9 : 0) - rot.y) * 0.1;
    drawHero();
    drawServices();
    drawXp();
    drawBar();
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  /* ------------------------------------------------------------- form -- */
  var form = document.getElementById('book');
  var note = document.getElementById('bookNote');
  var noteDefault = note.textContent;
  svcBtns.forEach(function (b, i) { b.addEventListener('click', function () { document.getElementById('bookSvc').selectedIndex = i; }); });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var bad = null;
    Array.prototype.forEach.call(form.querySelectorAll('input[required]'), function (inp) {
      var empty = !inp.value.trim();
      inp.setAttribute('aria-invalid', empty ? 'true' : 'false');
      if (empty && !bad) bad = inp;
    });
    if (bad) { note.textContent = 'Preencha seu nome e o bairro ou cidade.'; bad.focus(); return; }
    note.textContent = noteDefault;
    var d = new FormData(form);
    var msg = 'Olá, Clima Code! Sou ' + d.get('nome').trim() + ', de ' + d.get('local').trim() +
      '. Gostaria de agendar: ' + d.get('servico') + '.';
    window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
  });
})();
