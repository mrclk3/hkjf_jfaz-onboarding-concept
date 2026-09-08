document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initNavDropdowns();
  initPersonaMode();
  initTravelTabs();
  initCampusExplorer();
  initCappelFilter();
  initScheduleTabs();
  initPacklist();
  initFaqAccordion();
  initFaqSearch();
});

/* ==========================================================================
   1. Navigation & Dropdowns
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('navToggle');
  const nav = document.getElementById('siteNav');

  if (!toggleBtn || !nav) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('.dropdown-link, .nav-link:not(.dropdown-toggle)').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

function initNavDropdowns() {
  const dropdownItems = document.querySelectorAll('.nav-item.has-dropdown');

  dropdownItems.forEach(item => {
    const toggle = item.querySelector('.dropdown-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', (e) => {
      // Toggle dropdown on click
      e.preventDefault();
      const wasOpen = item.classList.contains('is-open');

      // Close all other open dropdowns
      dropdownItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('is-open');
          const t = other.querySelector('.dropdown-toggle');
          if (t) t.setAttribute('aria-expanded', 'false');
        }
      });

      if (wasOpen) {
        item.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });

    // Close when clicking dropdown links
    item.querySelectorAll('.dropdown-link').forEach(dLink => {
      dLink.addEventListener('click', () => {
        item.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item.has-dropdown')) {
      dropdownItems.forEach(item => {
        item.classList.remove('is-open');
        const toggle = item.querySelector('.dropdown-toggle');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      });
    }
  });
}

/* ==========================================================================
   2. Persona / Modus Switcher (Erstteilnehmer vs. Wiederholer)
   ========================================================================== */
function initPersonaMode() {
  const btnNewcomer = document.getElementById('modeNewcomer');
  const btnReturner = document.getElementById('modeReturner');
  const panelNewcomer = document.getElementById('newcomerGuide');
  const panelReturner = document.getElementById('returnerGuide');

  if (!btnNewcomer || !btnReturner) return;

  const setMode = (mode) => {
    if (mode === 'returner') {
      btnReturner.classList.add('active');
      btnReturner.setAttribute('aria-selected', 'true');
      btnNewcomer.classList.remove('active');
      btnNewcomer.setAttribute('aria-selected', 'false');
      if (panelNewcomer) panelNewcomer.style.display = 'none';
      if (panelReturner) panelReturner.style.display = 'flex';
      showToast('Modus: Schnelle Übersicht für erfahrene Teilnehmer aktiviert!');
    } else {
      btnNewcomer.classList.add('active');
      btnNewcomer.setAttribute('aria-selected', 'true');
      btnReturner.classList.remove('active');
      btnReturner.setAttribute('aria-selected', 'false');
      if (panelReturner) panelReturner.style.display = 'none';
      if (panelNewcomer) panelNewcomer.style.display = 'flex';
      showToast('Modus: Schritt-für-Schritt Begleitung für Neulinge aktiviert!');
    }
    localStorage.setItem('jfaz_onboarding_mode', mode);
  };

  btnNewcomer.addEventListener('click', () => setMode('newcomer'));
  btnReturner.addEventListener('click', () => setMode('returner'));

  const savedMode = localStorage.getItem('jfaz_onboarding_mode');
  if (savedMode === 'returner') {
    setMode('returner');
  }
}

/* ==========================================================================
   3. Travel Tabs (PKW, ÖPNV, Check-In Flow)
   ========================================================================== */
function initTravelTabs() {
  const tabButtons = document.querySelectorAll('.travel-tab');
  const tabPanes = document.querySelectorAll('.travel-pane');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabPanes.forEach(p => (p.style.display = 'none'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.style.display = 'block';
    });
  });
}

/* ==========================================================================
   4. Interactive Campus Explorer
   ========================================================================== */
const campusData = {
  hauptgebaeude: {
    badge: 'Zentralbereich',
    image: 'assets/jfaz_room.jpg',
    title: 'Hauptgebäude & Seminarräume',
    desc: 'Hier beginnt dein Lehrgang! Im Erdgeschoss findest du das Foyer mit dem zentralen Infobrett, die HKJF-Geschäftsstelle sowie die Seminarräume Hessen 1, Hessen 2 und die Gruppenarbeitsräume.',
    features: [
      { icon: '📌', title: 'Infopoint & Schwarzes Brett', text: 'Hier hängen die aktuellen Raumverteilungen und der Tagesplan aus.' },
      { icon: '☕', title: 'Kaffeestation', text: 'Für die Pausen steht frischer Kaffee, Tee und Wasser bereit.' },
      { icon: '♿', title: 'Barrierefreiheit', text: 'Erdgeschoss und Seminarräume sind ebenerdig und barrierearm erreichbar.' },
      { icon: '🤝', title: 'HKJF Geschäftsstelle', text: 'Bei allen Fragen findest du hier das freundliche HKJF-Team vor Ort.' }
    ]
  },
  bettenhaus: {
    badge: 'Übernachtung & Erholung',
    image: 'assets/jfaz_hero.jpg',
    title: 'Bettenhaus (Zimmer & Erholung)',
    desc: 'Dein Rückzugsort für die Nacht. Die Zimmer sind modern eingerichtet und bieten Ruhe nach einem spannenden Seminartag. Bettwäsche ist immer frisch bezogen!',
    features: [
      { icon: '🛏️', title: 'Zimmerausstattung', text: 'Freundliche 1- bis 2-Bett-Zimmer mit Schreibtisch, Schrank und Leselampe.' },
      { icon: '🚿', title: 'Bad / Sanitär', text: 'Zimmer mit eigenem oder angrenzendem Duschbad und WC.' },
      { icon: '🤫', title: 'Nachtruhe', text: 'Ab 22:00 Uhr Zimmerruhe für einen erholsamen Schlaf aller Teilnehmer.' },
      { icon: '🧼', title: 'Handtuch-Tipp', text: 'Handtücher bitte selbst mitbringen (oder in der Geschäftsstelle nachfragen).' }
    ]
  },
  speisesaal: {
    badge: 'Verpflegung',
    image: 'assets/jfaz_room.jpg',
    title: 'Speisesaal & Mensa',
    desc: 'Gutes Essen hält Leib und Seele zusammen! Das Küchenteam der HLFS versorgt uns täglich mit frischen, abwechslungsreichen Buffets.',
    features: [
      { icon: '🥐', title: 'Frühstücksbuffet', text: '07:30 – 08:30 Uhr: Brötchen, Müsli, Aufschnitt, Obst, Kaffee & Tee.' },
      { icon: '🍲', title: 'Mittagessen', text: '12:30 – 13:30 Uhr: Warmes Hauptgericht mit großem Salatbuffet & Dessert.' },
      { icon: '☕', title: 'Nachmittagskaffee', text: 'Ca. 15:30 Uhr: Frischer Kuchen und Heißgetränke für den Energieschub.' },
      { icon: '🥗', title: 'Vegetarisch & Allergien', text: 'Kennzeichnung aller Allergene, pflanzliche & Halal-Optionen immer vorhanden.' }
    ]
  },
  freizeit: {
    badge: 'Gemeinschaft & Abend',
    image: 'assets/jfaz_room.jpg',
    title: 'Bistro / Kellerbar & Kaminzimmer',
    desc: 'Der perfekte Ort, um nach dem Seminar den Abend gemeinsam mit anderen Feuerwehrleuten ausklingen zu lassen, Kontakte zu knüpfen und zu lachen.',
    features: [
      { icon: '⚽', title: 'Kicker & Billard', text: 'Spiele und Tischkicker für spannende Duelle unter Kameraden.' },
      { icon: '🔥', title: 'Kaminzimmer', text: 'Gemütliche Sofas und Sessel für ruhige Gespräche und Austausch.' },
      { icon: '🥤', title: 'Getränke & Snacks', text: 'Gekühlte Getränke und Snacks zu fairen Teilnehmerpreisen.' },
      { icon: '🎵', title: 'Wohlfühlatmosphäre', text: 'Kein Zwang: Du entscheidest selbst, wie lange du dich austauschen möchtest.' }
    ]
  },
  sporthalle: {
    badge: 'Bewegung & Natur',
    image: 'assets/jfaz_hero.jpg',
    title: 'Sporthalle & Zeltplatzgelände',
    desc: 'Rund um das JFAZ gibt es viel Platz für Bewegung an der frischen Luft sowie die Sporthalle der Landesfeuerwehrschule.',
    features: [
      { icon: '🏀', title: 'Sporthalle', text: 'Für sportliche Ausbildungsmodule, Kooperationsspiele und Abend-Sport.' },
      { icon: '🏕️', title: 'Zeltplatzgelände', text: 'Großes Außengelände für Erlebnispädagogik und Lagerfeuer-Abende.' },
      { icon: '🌲', title: 'Wald & Lahnauen', text: 'Schöne Spazierwege direkt am Campus für eine Pause im Grünen.' },
      { icon: '👟', title: 'Hallenschuhe', text: 'Für die Nutzung der Sporthalle bitte saubere Hallenschuhe einpacken.' }
    ]
  }
};

function initCampusExplorer() {
  const navButtons = document.querySelectorAll('.campus-nav-btn');
  const areaBadge = document.getElementById('areaBadge');
  const areaTitle = document.getElementById('areaTitle');
  const areaDesc = document.getElementById('areaDesc');
  const areaFeatures = document.getElementById('areaFeatures');
  const areaImage = document.getElementById('areaImage');
  const areaCard = document.getElementById('areaContent');

  if (!navButtons.length || !areaCard) return;

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const areaKey = btn.getAttribute('data-area');
      const data = campusData[areaKey];
      if (!data) return;

      navButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      areaCard.style.opacity = '0.4';
      setTimeout(() => {
        if (areaBadge) areaBadge.textContent = data.badge;
        if (areaTitle) areaTitle.textContent = data.title;
        if (areaDesc) areaDesc.textContent = data.desc;
        if (areaImage && data.image) areaImage.src = data.image;

        if (areaFeatures) {
          areaFeatures.innerHTML = data.features.map(f => `
            <div class="feature-item-card">
              <div class="f-icon">${f.icon}</div>
              <div class="f-text">
                <strong>${f.title}</strong>
                <span>${f.text}</span>
              </div>
            </div>
          `).join('');
        }
        areaCard.style.opacity = '1';
      }, 120);
    });
  });
}

/* ==========================================================================
   4b. Cappel-Guide Category Filter
   ========================================================================== */
function initCappelFilter() {
  const filterChips = document.querySelectorAll('.cappel-chip');
  const locationCards = document.querySelectorAll('.location-card');

  if (!filterChips.length || !locationCards.length) return;

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const filter = chip.getAttribute('data-filter');

      filterChips.forEach(c => {
        c.classList.remove('active');
        c.setAttribute('aria-selected', 'false');
      });
      chip.classList.add('active');
      chip.setAttribute('aria-selected', 'true');

      locationCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. Schedule & Timetable Tabs
   ========================================================================== */
function initScheduleTabs() {
  const schedTabs = document.querySelectorAll('.sched-day-btn');
  const dayPanels = document.querySelectorAll('.day-timeline-pane');

  schedTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const day = tab.getAttribute('data-day');

      schedTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      dayPanels.forEach(p => (p.style.display = 'none'));

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const targetPanel = document.getElementById(`day-${day}`);
      if (targetPanel) targetPanel.style.display = 'flex';
    });
  });
}

/* ==========================================================================
   6. Interactive Packliste mit LocalStorage
   ========================================================================== */
function initPacklist() {
  const checkboxes = document.querySelectorAll('.packlist-cards-grid input[type="checkbox"]');
  const savedState = JSON.parse(localStorage.getItem('jfaz_packlist_state') || '{}');

  checkboxes.forEach(cb => {
    const id = cb.getAttribute('data-id');
    if (savedState[id] !== undefined && !cb.disabled) {
      cb.checked = savedState[id];
    }
  });

  updateProgress();
}

window.updatePacklist = function (checkbox) {
  const checkboxes = document.querySelectorAll('.packlist-cards-grid input[type="checkbox"]');
  const state = {};

  checkboxes.forEach(cb => {
    const id = cb.getAttribute('data-id');
    if (id) {
      state[id] = cb.checked;
    }
  });

  localStorage.setItem('jfaz_packlist_state', JSON.stringify(state));
  updateProgress();

  if (checkbox && checkbox.checked) {
    showToast('Abgehakt! Dein Fortschritt ist gespeichert.');
  }
};

function updateProgress() {
  const checkboxes = document.querySelectorAll('.packlist-cards-grid input[type="checkbox"]');
  const total = checkboxes.length;
  let checkedCount = 0;

  checkboxes.forEach(cb => {
    if (cb.checked) checkedCount++;
  });

  const percent = Math.round((checkedCount / total) * 100);
  const progressBar = document.getElementById('progressBar');
  const progressPercent = document.getElementById('progressPercent');

  if (progressBar) progressBar.style.width = `${percent}%`;
  if (progressPercent) {
    progressPercent.textContent = `${percent}% (${checkedCount} von ${total} eingepackt)`;
  }
}

window.resetPacklist = function () {
  if (confirm('Möchtest du die Packliste wirklich zurücksetzen?')) {
    localStorage.removeItem('jfaz_packlist_state');
    const checkboxes = document.querySelectorAll('.packlist-cards-grid input[type="checkbox"]');
    checkboxes.forEach(cb => {
      if (!cb.disabled) cb.checked = false;
    });
    updateProgress();
    showToast('Packliste zurückgesetzt.');
  }
};

/* ==========================================================================
   7. FAQ Accordion & Live Search
   ========================================================================== */
function initFaqAccordion() {
  const triggers = document.querySelectorAll('.faq-trigger');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-card-item');
      const isOpen = item.classList.contains('active');

      document.querySelectorAll('.faq-card-item').forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          other.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

function initFaqSearch() {
  const searchInput = document.getElementById('faqSearch');
  const faqItems = document.querySelectorAll('.faq-card-item');

  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();

    faqItems.forEach(item => {
      const text = item.innerText.toLowerCase();
      if (text.includes(term)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
}

/* ==========================================================================
   8. Startklar-Quiz
   ========================================================================== */
window.evaluateQuiz = function () {
  const form = document.getElementById('readyQuizForm');
  const resultBox = document.getElementById('quizResult');

  const q1 = form.querySelector('input[name="q1"]:checked');
  const q2 = form.querySelector('input[name="q2"]:checked');
  const q3 = form.querySelector('input[name="q3"]:checked');

  if (!q1 || !q2 || !q3) {
    showToast('Bitte beantworte alle 3 Fragen, um dein Ergebnis zu sehen!');
    return;
  }

  form.style.display = 'none';
  resultBox.style.display = 'block';
  resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
  showToast('🎉 Du bist offiziell startklar fürs JFAZ!');
};

window.resetQuiz = function () {
  const form = document.getElementById('readyQuizForm');
  const resultBox = document.getElementById('quizResult');
  form.reset();
  resultBox.style.display = 'none';
  form.style.display = 'flex';
};

/* ==========================================================================
   9. Helper: Copy Address & Toast Notifications
   ========================================================================== */
window.copyAddress = function () {
  const text = document.getElementById('naviAddress').innerText;
  navigator.clipboard.writeText(text).then(() => {
    showToast('📍 Adresse in die Zwischenablage kopiert!');
  }).catch(() => {
    showToast('Adresse: Lintzingsweg 1a, 35043 Marburg');
  });
};

function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
