// Main Application Controller, Router, Concept Linking Engine & Popover System

const App = {
  activeView: "home",
  activeUnit: "unit2",
  resourceFilter: "all",

  init: function() {
    App.bindNavigation();
    App.bindKeyboardShortcuts();

    window.addEventListener('hashchange', () => {
      App.handleHashRoute();
    });

    if (window.location.hash) {
      App.handleHashRoute();
    } else {
      App.loadView("home", null, false);
    }
  },

  handleHashRoute: function() {
    const rawHash = window.location.hash.replace(/^#\/?/, '').trim();
    if (!rawHash || rawHash === 'home') {
      App.loadView('home', null, false);
      return;
    }

    if (rawHash.startsWith('topic/')) {
      const topicId = rawHash.replace('topic/', '').trim();
      App.loadTopic(topicId, false);
    } else if (rawHash.startsWith('comparisons/')) {
      const compKey = rawHash.replace('comparisons/', '').trim();
      App.loadComparison(compKey, false);
    } else {
      const parts = rawHash.split('/');
      const viewName = parts[0];
      const targetParam = parts[1] || null;
      App.loadView(viewName, targetParam, false);
    }
  },

  bindNavigation: function() {
    document.querySelectorAll('[data-view]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const targetView = el.getAttribute('data-view');
        App.loadView(targetView);
      });
    });
  },

  loadTopic: function(topicId, updateHash = true) {
    App.activeView = 'topic-' + topicId;

    if (updateHash) {
      location.hash = '#/topic/' + topicId;
    }

    // Deselect sidebar links
    document.querySelectorAll('.sidebar-link').forEach(link => {
      link.classList.remove('active');
    });

    const mainContainer = document.getElementById('main-content-container');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (typeof TopicPageEngine !== 'undefined') {
      TopicPageEngine.renderTopicPage(topicId, mainContainer);
    } else {
      mainContainer.innerHTML = `<div class="study-card"><p>Loading topic ${topicId}...</p></div>`;
    }

    setTimeout(() => {
      if (window.renderMathInElement) {
        renderMathInElement(mainContainer, {
          delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '$', right: '$', display: false}
          ],
          throwOnError: false
        });
      }
      App.autoLinkConcepts(mainContainer);
    }, 60);
  },

  loadView: function(viewName, targetParam, updateHash = true) {
    App.activeView = viewName;

    if (updateHash) {
      location.hash = '#/' + viewName + (targetParam ? '/' + targetParam : '');
    }

    document.querySelectorAll('.sidebar-link').forEach(link => {
      if (link.getAttribute('data-view') === viewName) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    const mainContainer = document.getElementById('main-content-container');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (viewName === 'home') {
      App.renderHomeDashboard(mainContainer);
    } else if (viewName === 'unit1') {
      App.activeUnit = 'unit1';
      if (typeof Unit1Module !== 'undefined') Unit1Module.render(mainContainer);
    } else if (viewName === 'unit2') {
      App.activeUnit = 'unit2';
      Unit2Module.render(mainContainer);
    } else if (viewName === 'unit3') {
      App.activeUnit = 'unit3';
      Unit3Module.render(mainContainer);
    } else if (viewName === 'unit4') {
      App.activeUnit = 'unit4';
      Unit4Module.render(mainContainer);
    } else if (viewName === 'unit5') {
      App.activeUnit = 'unit5';
      Unit5Module.render(mainContainer);
    } else if (viewName === 'notebook') {
      App.renderMasterTopicDirectory(mainContainer);
    } else if (viewName === 'graph') {
      KnowledgeGraphModule.renderGraphHub(mainContainer);
    } else if (viewName === 'comparisons') {
      if (targetParam) {
        ComparisonsModule.renderComparison(mainContainer, targetParam);
      } else {
        ComparisonsModule.renderComparisonsHub(mainContainer);
      }
    } else if (viewName === 'paths') {
      LearningPathsModule.renderPathsHub(mainContainer);
    } else if (viewName === 'labs') {
      App.renderInteractiveLabsHub(mainContainer);
    } else if (viewName === 'resources') {
      App.renderResourcesHub(mainContainer);
    } else if (viewName === 'quiz') {
      QuizModule.render(mainContainer);
    }

    setTimeout(() => {
      if (window.renderMathInElement) {
        renderMathInElement(mainContainer, {
          delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '$', right: '$', display: false}
          ],
          throwOnError: false
        });
      }
      App.autoLinkConcepts(mainContainer);
    }, 60);
  },

  loadComparison: function(compKey, updateHash = true) {
    if (updateHash) {
      location.hash = '#/comparisons/' + (compKey || '');
    }
    App.loadView('comparisons', compKey, false);
  },

  // 1. HOME DASHBOARD (STUDYLY STYLE)
  renderHomeDashboard: function(container) {
    container.innerHTML = `
      <!-- Welcome Hero Banner -->
      <div class="welcome-banner">
        <div class="welcome-text">
          <h2>Good evening, Alex 👋</h2>
          <p>Ready to make a little progress today?</p>
        </div>
        <div class="welcome-scene">
          <div class="better-note">
            Better<br>Than<br>Yesterday<br>♡
          </div>
          <svg class="cozy-desk-art" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="70" width="160" height="8" rx="4" fill="#d97706" opacity="0.4"/>
            <path d="M40 70 L40 110 M160 70 L160 110" stroke="#b45309" stroke-width="4" stroke-linecap="round"/>
            <path d="M50 70 L55 45 L75 45 L80 70 Z" fill="#b45309" opacity="0.8"/>
            <path d="M65 45 C65 25, 45 20, 50 15 C65 15, 65 35, 65 45 Z" fill="#10b981"/>
            <path d="M65 45 C65 25, 85 20, 80 15 C65 15, 65 35, 65 45 Z" fill="#059669"/>
            <rect x="100" y="58" width="55" height="12" rx="3" fill="#0284c7"/>
            <rect x="105" y="44" width="45" height="12" rx="3" fill="#10b981"/>
            <rect x="110" y="32" width="40" height="10" rx="3" fill="#f59e0b"/>
            <rect x="165" y="52" width="16" height="18" rx="3" fill="#7c3aed"/>
            <path d="M181 56 C186 56, 186 64, 181 64" stroke="#7c3aed" stroke-width="2"/>
          </svg>
        </div>
      </div>

      <!-- 3 Stat Cards Row -->
      <div class="stats-cards-row">
        <!-- Card 1: Today's Progress -->
        <div class="stat-card-clean bg-green-soft">
          <div>
            <div class="stat-card-header">
              <div class="stat-card-icon" style="background: #dcfce7; color: #15803d;">🎯</div>
              <span>Today's Progress</span>
            </div>
            <div class="progress-ring-group">
              <div class="ring-wrap">
                <svg width="72" height="72" viewBox="0 0 36 36">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#d1fae5" stroke-width="3.5" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10b981" stroke-dasharray="68, 100" stroke-linecap="round" stroke-width="3.5" />
                </svg>
                <div class="ring-percent-text">68%</div>
              </div>
              <div>
                <div style="font-size: 0.95rem; font-weight: 800; color: #1e293b;">4 of 6 tasks completed</div>
                <div class="progress-bar-wrap">
                  <div class="progress-bar-fill" style="width: 68%; background: #10b981;"></div>
                </div>
                <div class="stat-subtitle">Keep going! You're doing great!</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 2: 7 Day Streak -->
        <div class="stat-card-clean bg-orange-soft">
          <div>
            <div class="stat-card-header">
              <div class="stat-card-icon" style="background: #ffedd5; color: #c2410c;">🔥</div>
              <span>7 Day Streak</span>
            </div>
            <div style="font-size: 1.15rem; font-weight: 800; color: #1e293b; margin-bottom: 0.4rem;">Keep it up!</div>
            <div style="display: flex; align-items: center; gap: 0.5rem; color: #475569; font-weight: 700; font-size: 0.95rem;">
              <span>📅</span>
              <span>2h 24m studied this week</span>
            </div>
          </div>
          <div class="stat-subtitle" style="margin-top: 1rem;">Consistent study boosts exam retention by 4x.</div>
        </div>

        <!-- Card 3: Completed Goals -->
        <div class="stat-card-clean bg-blue-soft">
          <div>
            <div class="stat-card-header">
              <div class="stat-card-icon" style="background: #e0f2fe; color: #0284c7;">🏆</div>
              <span>Completed Goals</span>
            </div>
            <div style="font-size: 1.15rem; font-weight: 800; color: #1e293b; margin-bottom: 0.4rem;">3 of 5 this month</div>
            <div class="progress-bar-wrap">
              <div class="progress-bar-fill" style="width: 60%; background: #0284c7;"></div>
            </div>
          </div>
          <div class="stat-subtitle">You're on the right track!</div>
        </div>
      </div>

      <!-- Quick Exploration Hub Bar -->
      <div style="display: flex; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap;">
        <button class="topic-nav-btn active" onclick="App.loadView('graph')" style="padding: 0.65rem 1.25rem; font-size: 0.9rem;">
          🌐 Open Interactive Knowledge Graph
        </button>
        <button class="topic-nav-btn" onclick="App.loadView('comparisons')" style="padding: 0.65rem 1.25rem; font-size: 0.9rem;">
          ⚖️ Protocol Comparisons (TCP vs UDP, etc.)
        </button>
        <button class="topic-nav-btn" onclick="App.loadView('paths')" style="padding: 0.65rem 1.25rem; font-size: 0.9rem;">
          🗺️ 5 Guided Learning Pathways
        </button>
      </div>

      <!-- Continue Learning Feature Section -->
      <div class="section-heading-row">
        <h3 class="section-title">Continue learning</h3>
        <span class="view-all-link" onclick="App.loadView('notebook')">View all topics →</span>
      </div>

      <div class="continue-card">
        <div class="continue-left">
          <div class="continue-icon-box">🌐</div>
          <div class="continue-info">
            <div class="continue-subject">Unit III • Network Layer Control Plane</div>
            <div class="continue-lesson">Dijkstra's Shortest Path Algorithm & Forwarding Tables</div>
            <div style="display: flex; align-items: center; gap: 1rem; margin-top: 0.4rem;">
              <span style="font-size: 0.85rem; font-weight: 700; color: #64748b;">Chapter 5 • 72% complete</span>
              <div class="progress-bar-wrap" style="width: 140px; margin: 0;">
                <div class="progress-bar-fill" style="width: 72%; background: #10b981;"></div>
              </div>
            </div>
          </div>
        </div>
        <button class="continue-btn" onclick="App.loadTopic('dijkstra')">
          <span>Continue Article</span>
          <span>→</span>
        </button>
      </div>

      <!-- Your Subjects / Units (Units I, II, III, IV, V) -->
      <div class="section-heading-row">
        <h3 class="section-title">Curriculum Units</h3>
        <span class="view-all-link" onclick="App.loadView('notebook')">All 64 Articles →</span>
      </div>

      <div class="units-grid-4" style="grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));">
        <div class="unit-card-pill u1" onclick="App.loadView('unit1')">
          <div>
            <div class="unit-badge-icon" style="background: #ecfdf5; color: #047857;">🌐</div>
            <h4 class="unit-card-title">Unit I: Fundamentals</h4>
            <div class="unit-card-tasks">8 dedicated articles</div>
            <div class="unit-progress-row">
              <div class="progress-bar-wrap" style="flex: 1; margin: 0;">
                <div class="progress-bar-fill" style="width: 100%; background: #047857;"></div>
              </div>
              <span style="font-size: 0.82rem; font-weight: 700; color: #047857;">100%</span>
            </div>
          </div>
          <div class="unit-card-btn-arrow">→</div>
        </div>

        <div class="unit-card-pill u2" onclick="App.loadView('unit2')">
          <div>
            <div class="unit-badge-icon" style="background: #e0f2fe; color: #0284c7;">📦</div>
            <h4 class="unit-card-title">Unit II: Data Link</h4>
            <div class="unit-card-tasks">17 dedicated articles</div>
            <div class="unit-progress-row">
              <div class="progress-bar-wrap" style="flex: 1; margin: 0;">
                <div class="progress-bar-fill" style="width: 72%; background: #0284c7;"></div>
              </div>
              <span style="font-size: 0.82rem; font-weight: 700; color: #0284c7;">72%</span>
            </div>
          </div>
          <div class="unit-card-btn-arrow">→</div>
        </div>

        <div class="unit-card-pill u3" onclick="App.loadView('unit3')">
          <div>
            <div class="unit-badge-icon" style="background: #ecfdf5; color: #10b981;">🗺️</div>
            <h4 class="unit-card-title">Unit III: Network Layer</h4>
            <div class="unit-card-tasks">12 dedicated articles</div>
            <div class="unit-progress-row">
              <div class="progress-bar-wrap" style="flex: 1; margin: 0;">
                <div class="progress-bar-fill" style="width: 56%; background: #10b981;"></div>
              </div>
              <span style="font-size: 0.82rem; font-weight: 700; color: #10b981;">56%</span>
            </div>
          </div>
          <div class="unit-card-btn-arrow">→</div>
        </div>

        <div class="unit-card-pill u4" onclick="App.loadView('unit4')">
          <div>
            <div class="unit-badge-icon" style="background: #ede7f6; color: #7c3aed;">⚡</div>
            <h4 class="unit-card-title">Unit IV: Transport Layer</h4>
            <div class="unit-card-tasks">10 dedicated articles</div>
            <div class="unit-progress-row">
              <div class="progress-bar-wrap" style="flex: 1; margin: 0;">
                <div class="progress-bar-fill" style="width: 40%; background: #7c3aed;"></div>
              </div>
              <span style="font-size: 0.82rem; font-weight: 700; color: #7c3aed;">40%</span>
            </div>
          </div>
          <div class="unit-card-btn-arrow">→</div>
        </div>

        <div class="unit-card-pill u5" onclick="App.loadView('unit5')">
          <div>
            <div class="unit-badge-icon" style="background: #fef3c7; color: #b45309;">🛡️</div>
            <h4 class="unit-card-title">Unit V: App & Security</h4>
            <div class="unit-card-tasks">17 dedicated articles</div>
            <div class="unit-progress-row">
              <div class="progress-bar-wrap" style="flex: 1; margin: 0;">
                <div class="progress-bar-fill" style="width: 63%; background: #b45309;"></div>
              </div>
              <span style="font-size: 0.82rem; font-weight: 700; color: #b45309;">63%</span>
            </div>
          </div>
          <div class="unit-card-btn-arrow">→</div>
        </div>
      </div>

      <!-- Bottom Split: Upcoming Schedule & Motivational Landscape -->
      <div class="bottom-split-grid">
        <div class="schedule-card">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 1.05rem; font-weight: 800; color: #1e293b;">
              <span>📅</span>
              <span>Study Schedule & Featured Articles</span>
            </div>
            <span class="view-all-link" onclick="App.loadView('notebook')">View all →</span>
          </div>

          <div class="schedule-list">
            <div class="schedule-item" onclick="App.loadTopic('crc')">
              <span class="schedule-time">09:00 AM</span>
              <div class="schedule-name">
                <span class="status-dot blue"></span>
                <span>Unit II • Cyclic Redundancy Check (CRC Lab)</span>
              </div>
              <span style="font-size: 0.8rem; color: #0284c7; font-weight: 700;">Read Page →</span>
            </div>

            <div class="schedule-item" onclick="App.loadTopic('dijkstra')">
              <span class="schedule-time">11:00 AM</span>
              <div class="schedule-name">
                <span class="status-dot green"></span>
                <span>Unit III • Dijkstra Shortest Path Solver</span>
              </div>
              <span style="font-size: 0.8rem; color: #10b981; font-weight: 700;">Read Page →</span>
            </div>

            <div class="schedule-item" onclick="App.loadTopic('tcp-three-way-handshake')">
              <span class="schedule-time">02:00 PM</span>
              <div class="schedule-name">
                <span class="status-dot purple"></span>
                <span>Unit IV • TCP 3-Way Handshake Animator</span>
              </div>
              <span style="font-size: 0.8rem; color: #7c3aed; font-weight: 700;">Read Page →</span>
            </div>

            <div class="schedule-item" onclick="App.loadTopic('rsa')">
              <span class="schedule-time">04:00 PM</span>
              <div class="schedule-name">
                <span class="status-dot amber"></span>
                <span>Unit V • RSA Cryptosystem & Modular Math Lab</span>
              </div>
              <span style="font-size: 0.8rem; color: #b45309; font-weight: 700;">Read Page →</span>
            </div>
          </div>
        </div>

        <div class="quote-landscape-card">
          <div class="quote-landscape-title">
            Progress,<br>not perfection.<br>♡
          </div>
          <button class="keep-going-btn" onclick="App.loadView('quiz')">
            Take Practice Quiz →
          </button>
        </div>
      </div>
    `;
  },

  // 2. MASTER TOPIC DIRECTORY (WIKIPEDIA CATALOG)
  renderMasterTopicDirectory: function(container) {
    container.innerHTML = `
      <div class="welcome-banner" style="background: linear-gradient(100deg, #f0fdf4 0%, #e0f2fe 100%);">
        <div class="welcome-text">
          <div style="font-size: 0.85rem; font-weight: 800; color: #166534; text-transform: uppercase; margin-bottom: 0.35rem;">
            Semester V Course Syllabus • Kurose & Ross Chapters 1-6
          </div>
          <h2>Master Topic Encyclopedia Directory</h2>
          <p>Every concept is an independent, dedicated Wikipedia-style article. Click any topic below to open its dedicated page with in-depth technical explanations, interactive visual labs, and practice questions.</p>
        </div>
      </div>

      <div class="content-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
        
        <!-- UNIT I DIRECTORY -->
        <div class="study-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h3 style="color: #047857; font-size: 1.25rem; font-weight: 800; margin: 0;">
              Unit I: Fundamentals & Stack
            </h3>
            <span class="badge" style="background: #ecfdf5; color: #047857; font-weight: 700; padding: 4px 10px; border-radius: 9999px;">8 Pages</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.45rem;">
            <button class="topic-nav-btn" onclick="App.loadTopic('computer-network')">1. Computer Network & Infrastructure ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('protocol')">2. Network Protocols & Rules ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('host')">3. Host Systems (Client / Server) ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('router')">4. Packet Routers ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('switch')">5. Link-Layer Switches ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('packet')">6. Packets & Payloads ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('protocol-stack')">7. 5-Layer Internet Protocol Stack ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('encapsulation')">8. Encapsulation & Decapsulation ➔</button>
          </div>
        </div>

        <!-- UNIT II DIRECTORY -->
        <div class="study-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h3 style="color: #0284c7; font-size: 1.25rem; font-weight: 800; margin: 0;">
              Unit II: Data Link, ARQ & Ethernet
            </h3>
            <span class="badge" style="background: #e0f2fe; color: #0284c7; font-weight: 700; padding: 4px 10px; border-radius: 9999px;">17 Pages</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.45rem;">
            <button class="topic-nav-btn" onclick="App.loadTopic('framing')">1. Framing & Boundaries ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('byte-stuffing')">2. Byte Stuffing (ESC 0x7D) ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('bit-stuffing')">3. HDLC Bit Stuffing ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('error-detection')">4. Error Detection vs Correction ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('parity')">5. Parity Checks (1D & 2D) ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('checksum')">6. Internet Checksum ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('crc')">7. CRC Mathematics & Interactive Lab ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('hamming-code')">8. Hamming (7,4) Code & Lab ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('flow-control')">9. Flow Control & Channel Utilization ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('stop-and-wait')">10. Stop-and-Wait ARQ & Lab ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('sliding-window')">11. Sliding Window Pipelining ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('go-back-n')">12. Go-Back-N (GBN) ARQ & Lab ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('selective-repeat')">13. Selective Repeat ARQ & Lab ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('ethernet')">14. IEEE 802.3 Ethernet & CSMA/CD ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('mac-address')">15. MAC Addressing (EUI-48) ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('arp')">16. Address Resolution Protocol (ARP) ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('vlan')">17. Virtual LANs (IEEE 802.1Q) ➔</button>
          </div>
        </div>

        <!-- UNIT III DIRECTORY -->
        <div class="study-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h3 style="color: #10b981; font-size: 1.25rem; font-weight: 800; margin: 0;">
              Unit III: Network Layer & Routing
            </h3>
            <span class="badge" style="background: #ecfdf5; color: #10b981; font-weight: 700; padding: 4px 10px; border-radius: 9999px;">12 Pages</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.45rem;">
            <button class="topic-nav-btn" onclick="App.loadTopic('network-layer')">1. Network Layer & Plane Distinction ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('forwarding')">2. Packet Forwarding Mechanism ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('routing')">3. Routing Algorithms & Protocols ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('dijkstra')">4. Dijkstra's Algorithm & Interactive Lab ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('link-state-routing')">5. Link-State Routing Architecture ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('distance-vector')">6. Distance Vector Routing & Lab ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('ospf')">7. Open Shortest Path First (OSPF) ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('bgp')">8. Border Gateway Protocol (BGP) ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('sdn')">9. Software-Defined Networking (SDN) ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('ipv4')">10. IPv4 Header (RFC 791) & Subnetting ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('ipv6')">11. IPv6 Header (RFC 8200) & Addresses ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('nat')">12. Network Address Translation (NAT) ➔</button>
          </div>
        </div>

        <!-- UNIT IV DIRECTORY -->
        <div class="study-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h3 style="color: #7c3aed; font-size: 1.25rem; font-weight: 800; margin: 0;">
              Unit IV: Transport Layer (TCP & UDP)
            </h3>
            <span class="badge" style="background: #ede7f6; color: #7c3aed; font-weight: 700; padding: 4px 10px; border-radius: 9999px;">10 Pages</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.45rem;">
            <button class="topic-nav-btn" onclick="App.loadTopic('transport-layer')">1. Transport Layer & Multiplexing ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('tcp')">2. Transmission Control Protocol (TCP) ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('udp')">3. User Datagram Protocol (UDP) ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('udp-header')">4. UDP 8-Byte Header Structure ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('tcp-three-way-handshake')">5. TCP 3-Way Handshake & Lab ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('tcp-header')">6. TCP Segment Header (RFC 9293) ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('sequence-number')">7. Sequence Numbering & Ordering ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('acknowledgement')">8. Acknowledgement Numbers (ACK) ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('tcp-flow-control')">9. TCP Flow Control (rwnd & Lab) ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('tcp-congestion-control')">10. TCP Congestion Control (AIMD & Lab) ➔</button>
          </div>
        </div>

        <!-- UNIT V DIRECTORY -->
        <div class="study-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h3 style="color: #b45309; font-size: 1.25rem; font-weight: 800; margin: 0;">
              Unit V: App Layer, Security & RSA
            </h3>
            <span class="badge" style="background: #fef3c7; color: #b45309; font-weight: 700; padding: 4px 10px; border-radius: 9999px;">17 Pages</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.45rem;">
            <button class="topic-nav-btn" onclick="App.loadTopic('application-layer')">1. Application Layer Principles ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('dns')">2. Domain Name System (DNS & Lab) ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('dns-records')">3. DNS Resource Records (A, MX, etc.) ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('http')">4. HTTP Protocol & Statelessness ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('https')">5. HTTPS & TLS (RFC 8446) ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('email-system')">6. Electronic Mail Architecture ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('smtp')">7. SMTP Protocol (Port 25/587) ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('pop3')">8. Post Office Protocol (POP3) ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('imap')">9. IMAP Protocol & Folder Sync ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('firewall')">10. Firewalls (NIST SP 800-41) ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('ids')">11. Intrusion Detection Systems (IDS) ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('ips')">12. Intrusion Prevention Systems (IPS) ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('public-key-cryptography')">13. Public-Key Cryptography Principles ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('rsa')">14. RSA Cryptosystem & Interactive Lab ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('rsa-encryption')">15. RSA Encryption & Decryption Math ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('rsa-digital-signature')">16. RSA Digital Signatures ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('rsa-padding')">17. RSA OAEP & PSS Padding ➔</button>
          </div>
        </div>

      </div>
    `;
  },

  // 3. INTERACTIVE LABS HUB
  renderInteractiveLabsHub: function(container) {
    container.innerHTML = `
      <div class="welcome-banner" style="background: linear-gradient(100deg, #e0f2fe 0%, #ede7f6 100%);">
        <div class="welcome-text">
          <div style="font-size: 0.85rem; font-weight: 800; color: #0284c7; text-transform: uppercase; margin-bottom: 0.35rem;">
            Computer Networks Virtual Laboratory
          </div>
          <h2>Interactive Solvers, Simulators & Visualizers</h2>
          <p>Launch dedicated interactive calculation labs, visual state machines, and graph pathfinders directly inside their topic pages.</p>
        </div>
      </div>

      <div class="units-grid-4" style="margin-top: 1.5rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem;">
        <div class="unit-card-pill u2" onclick="App.loadTopic('crc')">
          <div class="unit-badge-icon">➗</div>
          <h4 class="unit-card-title">CRC Modulo-2 Simulator</h4>
          <div class="unit-card-tasks">Unit II • CRC Polynomial Division</div>
          <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 1rem;">Live bitwise XOR division, remainder calculation, and syndrome verification.</p>
          <div class="unit-card-btn-arrow">Launch Lab →</div>
        </div>

        <div class="unit-card-pill u2" onclick="App.loadTopic('hamming-code')">
          <div class="unit-badge-icon">🧮</div>
          <h4 class="unit-card-title">Hamming (7,4) Corrector</h4>
          <div class="unit-card-tasks">Unit II • Error Correction</div>
          <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 1rem;">Parity bit positions, syndrome evaluation, and automatic 1-bit error localization.</p>
          <div class="unit-card-btn-arrow">Launch Lab →</div>
        </div>

        <div class="unit-card-pill u3" onclick="App.loadTopic('dijkstra')">
          <div class="unit-badge-icon">🗺️</div>
          <h4 class="unit-card-title">Dijkstra Graph Pathfinder</h4>
          <div class="unit-card-tasks">Unit III • Link State Routing</div>
          <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 1rem;">Step-by-step shortest path iteration table with forwarding table derivation.</p>
          <div class="unit-card-btn-arrow">Launch Lab →</div>
        </div>

        <div class="unit-card-pill u3" onclick="App.loadTopic('distance-vector')">
          <div class="unit-badge-icon">🔄</div>
          <h4 class="unit-card-title">Distance Vector Routing Lab</h4>
          <div class="unit-card-tasks">Unit III • Bellman-Ford Exchange</div>
          <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 1rem;">Step through neighbor distance vector exchanges until network convergence.</p>
          <div class="unit-card-btn-arrow">Launch Lab →</div>
        </div>

        <div class="unit-card-pill u2" onclick="App.loadTopic('stop-and-wait')">
          <div class="unit-badge-icon">⏱️</div>
          <h4 class="unit-card-title">Stop-and-Wait Simulator</h4>
          <div class="unit-card-tasks">Unit II • ARQ Flow Control</div>
          <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 1rem;">Simulate clean transmission, lost data packet, ACK loss, and timer timeouts.</p>
          <div class="unit-card-btn-arrow">Launch Lab →</div>
        </div>

        <div class="unit-card-pill u2" onclick="App.loadTopic('go-back-n')">
          <div class="unit-badge-icon">🔁</div>
          <h4 class="unit-card-title">Go-Back-N ARQ Lab</h4>
          <div class="unit-card-tasks">Unit II • Pipelined Retransmission</div>
          <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 1rem;">Demonstrates cumulative ACKs, dropped frames, and retransmission of entire window.</p>
          <div class="unit-card-btn-arrow">Launch Lab →</div>
        </div>

        <div class="unit-card-pill u2" onclick="App.loadTopic('selective-repeat')">
          <div class="unit-badge-icon">🎯</div>
          <h4 class="unit-card-title">Selective Repeat ARQ Lab</h4>
          <div class="unit-card-tasks">Unit II • Receiver Buffering</div>
          <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 1rem;">Demonstrates out-of-order packet buffering and retransmitting only lost packets.</p>
          <div class="unit-card-btn-arrow">Launch Lab →</div>
        </div>

        <div class="unit-card-pill u4" onclick="App.loadTopic('tcp-three-way-handshake')">
          <div class="unit-badge-icon">🤝</div>
          <h4 class="unit-card-title">TCP Handshake Animator</h4>
          <div class="unit-card-tasks">Unit IV • Transport Layer</div>
          <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 1rem;">Step-by-step SYN, SYN+ACK, and ACK state transitions with sequence numbers.</p>
          <div class="unit-card-btn-arrow">Launch Lab →</div>
        </div>

        <div class="unit-card-pill u4" onclick="App.loadTopic('tcp-flow-control')">
          <div class="unit-badge-icon">🪟</div>
          <h4 class="unit-card-title">TCP Flow Control (rwnd)</h4>
          <div class="unit-card-tasks">Unit IV • Advertised Window</div>
          <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 1rem;">Interactive simulation of receiver buffer capacity and zero-window probing.</p>
          <div class="unit-card-btn-arrow">Launch Lab →</div>
        </div>

        <div class="unit-card-pill u4" onclick="App.loadTopic('tcp-congestion-control')">
          <div class="unit-badge-icon">📈</div>
          <h4 class="unit-card-title">TCP Congestion Control (AIMD)</h4>
          <div class="unit-card-tasks">Unit IV • Reno vs Tahoe</div>
          <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 1rem;">Visualizes Slow Start, Congestion Avoidance, 3 Dup ACKs, and timeouts.</p>
          <div class="unit-card-btn-arrow">Launch Lab →</div>
        </div>

        <div class="unit-card-pill u5" onclick="App.loadTopic('dns')">
          <div class="unit-badge-icon">🧭</div>
          <h4 class="unit-card-title">DNS Resolution Tracer</h4>
          <div class="unit-card-tasks">Unit V • Application Layer</div>
          <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 1rem;">Simulate iterative name resolution queries across Root, TLD, and Authoritative servers.</p>
          <div class="unit-card-btn-arrow">Launch Lab →</div>
        </div>

        <div class="unit-card-pill u5" onclick="App.loadTopic('rsa')">
          <div class="unit-badge-icon">🔑</div>
          <h4 class="unit-card-title">RSA Key & Cipher Engine</h4>
          <div class="unit-card-tasks">Unit V • RFC 8017 Cryptography</div>
          <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 1rem;">Calculates modulus n, totient ϕ(n), public e, private d, and encrypts/decrypts live.</p>
          <div class="unit-card-btn-arrow">Launch Lab →</div>
        </div>
      </div>
    `;
  },

  // 4. RESOURCE HUB
  renderResourcesHub: function(container) {
    container.innerHTML = `
      <div class="welcome-banner" style="background: linear-gradient(100deg, #dcfce7 0%, #e0f2fe 100%);">
        <div class="welcome-text">
          <div style="font-size: 0.85rem; font-weight: 800; color: #166534; text-transform: uppercase; margin-bottom: 0.35rem;">
            Authoritative References Hub
          </div>
          <h2>All Verified Resources, Standards & Lectures</h2>
          <p>Every single link from your course document checked, working, and cataloged for semester reference.</p>
        </div>
      </div>

      <div class="subnav-bar" style="margin-top: 1rem;">
        <button class="topic-nav-btn ${App.resourceFilter === 'all' ? 'active' : ''}" onclick="App.filterResources('all')">All Resources (${RESOURCE_DATA.length})</button>
        <button class="topic-nav-btn ${App.resourceFilter === 'UMass' ? 'active' : ''}" onclick="App.filterResources('UMass')">UMass Kurose & Ross</button>
        <button class="topic-nav-btn ${App.resourceFilter === 'Standards' ? 'active' : ''}" onclick="App.filterResources('Standards')">RFC & IEEE & NIST</button>
        <button class="topic-nav-btn ${App.resourceFilter === 'University' ? 'active' : ''}" onclick="App.filterResources('University')">University Notes (CMU / IIT / WashU)</button>
      </div>

      <div class="resources-grid" id="resources-cards-grid"></div>
    `;

    App.renderResourceCards();
  },

  filterResources: function(cat) {
    App.resourceFilter = cat;
    App.renderResourcesHub(document.getElementById('main-content-container'));
  },

  renderResourceCards: function() {
    const grid = document.getElementById('resources-cards-grid');
    if (!grid) return;

    const filtered = RESOURCE_DATA.filter(r => {
      if (App.resourceFilter === 'all') return true;
      if (App.resourceFilter === 'UMass') return r.category.includes('UMass') || r.category.includes('Course');
      if (App.resourceFilter === 'Standards') return r.category.includes('IETF') || r.category.includes('Official') || r.category.includes('NIST');
      if (App.resourceFilter === 'University') return r.category.includes('University') || r.category.includes('Vendor');
      return true;
    });

    let html = "";
    filtered.forEach(res => {
      html += `
        <div class="resource-card">
          <div>
            <div class="res-tag-group">
              <span class="res-badge verified">✅ ${res.status}</span>
              <span class="res-badge unit">${res.category}</span>
              ${res.units.map(u => `<span class="res-badge" style="background: #f1f5f9; color: #475569;">${u}</span>`).join('')}
            </div>
            <h4 class="res-title">${res.title}</h4>
            <p class="res-desc">${res.description}</p>
          </div>
          <a href="${res.url}" target="_blank" rel="noopener noreferrer" class="res-action-btn">
            <span>Open Verified Link</span>
            <span>↗</span>
          </a>
        </div>
      `;
    });

    grid.innerHTML = html;
  },

  // 5. "EXPLAIN THIS" POPOVER SYSTEM
  openExplainModal: function(conceptId) {
    const c = CONCEPT_REGISTRY[conceptId];
    if (!c) return;

    let modal = document.getElementById('explain-this-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'explain-this-modal';
      modal.className = 'explain-modal-card';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-bottom: 1px solid var(--border-light); padding: 1.25rem 1.5rem; display: flex; justify-content: space-between; align-items: flex-start;">
        <div>
          <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.35rem;">
            <span class="brand-badge" style="background: #e0f2fe; color: #0284c7;">${c.unit}</span>
            <span class="brand-badge" style="background: #f1f5f9; color: #475569;">${c.category.toUpperCase()}</span>
            <span class="brand-badge" style="background: ${c.importance === 'major' ? '#dcfce7' : '#fef3c7'}; color: ${c.importance === 'major' ? '#166534' : '#b45309'};">${c.importance.toUpperCase()}</span>
          </div>
          <h3 style="font-size: 1.45rem; font-weight: 800; color: #1e293b; margin: 0;">${c.name}</h3>
        </div>
        <button onclick="App.closeExplainModal()" style="background: #ffffff; border: 1px solid var(--border-light); width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; color: #64748b; cursor: pointer; transition: all 0.15s ease; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">✕</button>
      </div>
      <div style="padding: 1.5rem; max-height: 75vh; overflow-y: auto;">
        <div style="font-size: 1rem; font-weight: 600; color: #1e293b; line-height: 1.6; margin-bottom: 1rem;">
          ${c.oneLiner}
        </div>
        <div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 0.85rem 1rem; border-radius: 8px; font-size: 0.9rem; color: #166534; margin-bottom: 1.25rem;">
          <strong>Why It Matters:</strong> ${c.whyItMatters}
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem;">
          <div>
            <div style="font-size: 0.75rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.35rem;">Prerequisites:</div>
            <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
              ${(c.prerequisites || []).map(p => {
                const preConcept = CONCEPT_REGISTRY[p];
                return `<button class="topic-nav-btn" onclick="App.openExplainModal('${p}')" style="font-size: 0.75rem; padding: 0.2rem 0.6rem; background: #ffffff; border: 1px solid #cbd5e1;">${preConcept ? preConcept.name : p}</button>`;
              }).join('')}
            </div>
          </div>
          <div>
            <div style="font-size: 0.75rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.35rem;">Used In:</div>
            <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
              ${(c.usedIn || []).map(u => `<span class="brand-badge" style="background: #f8fafc; border: 1px solid #e2e8f0; color: #334155; font-size: 0.75rem;">${u}</span>`).join('')}
            </div>
          </div>
        </div>

        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border-light);">
          <button class="continue-btn" onclick="App.closeExplainModal(); App.jumpFromConcept('${c.id}')" style="padding: 0.6rem 1.3rem; font-size: 0.9rem;">
            Open Deep-Dive Lesson →
          </button>
          ${c.comparesWith && c.comparesWith.length > 0 ? `
            <button class="sim-btn secondary" onclick="App.closeExplainModal(); App.loadComparison('${c.id}-vs-${c.comparesWith[0]}')" style="font-size: 0.85rem; padding: 0.55rem 1rem;">
              ⚖️ Compare with ${c.comparesWith[0].toUpperCase()}
            </button>
          ` : ''}
        </div>
      </div>
    `;

    document.getElementById('search-modal-overlay').classList.add('active');
    modal.classList.add('active');
  },

  closeExplainModal: function() {
    const modal = document.getElementById('explain-this-modal');
    if (modal) modal.classList.remove('active');
    document.getElementById('search-modal-overlay').classList.remove('active');
  },

  autoLinkConcepts: function(container) {
    if (!container || typeof CONCEPT_REGISTRY === 'undefined') return;
    const elements = container.querySelectorAll('.concept-explanation p, .worked-example-box p');
    const conceptKeys = Object.keys(CONCEPT_REGISTRY).sort((a, b) => b.length - a.length);

    elements.forEach(el => {
      if (el.dataset.linked === "true" || el.closest('.simulator-shell') || el.closest('.interactive-header-grid') || el.closest('table')) return;
      el.dataset.linked = "true";

      let html = el.innerHTML;
      conceptKeys.forEach(key => {
        const c = CONCEPT_REGISTRY[key];
        const namesToMatch = [c.name, ...(c.aliases || [])];
        for (const name of namesToMatch) {
          if (name.length < 3) continue;
          const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const regex = new RegExp(`(?<![<\\/\\w])${escaped}(?![\\w>="'])`, 'i');
          if (regex.test(html) && !html.includes(`App.openExplainModal('${c.id}')`)) {
            html = html.replace(regex, `<span class="concept-term" title="Click to explain: ${c.name}" onclick="App.openExplainModal('${c.id}')">$&</span>`);
            break;
          }
        }
      });
      el.innerHTML = html;
    });
  },

  jumpFromConcept: function(conceptId) {
    if (typeof TOPIC_REPOSITORY !== 'undefined' && TOPIC_REPOSITORY[conceptId]) {
      App.loadTopic(conceptId);
      return;
    }

    const map = {
      "tcp-handshake": "tcp-three-way-handshake",
      "tls": "https",
      "network-components": "computer-network",
      "architecture": "protocol-stack",
      "header": "packet",
      "frame": "framing",
      "segment": "transport-layer",
      "flow-ctrl": "tcp-flow-control",
      "congestion-control": "tcp-congestion-control"
    };

    const target = map[conceptId] || conceptId;
    if (typeof TOPIC_REPOSITORY !== 'undefined' && TOPIC_REPOSITORY[target]) {
      App.loadTopic(target);
    } else {
      App.loadView('notebook');
    }
  },

  // 6. THREE-TIER SEARCH SYSTEM (Page 47 of Blueprint)
  bindKeyboardShortcuts: function() {
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        App.openSearchModal();
      }
      if (e.key === 'Escape') {
        App.closeSearchModal();
        App.closeExplainModal();
      }
    });
  },

  openSearchModal: function() {
    document.getElementById('search-modal-overlay').classList.add('active');
    const modal = document.getElementById('search-modal-box');
    modal.classList.add('active');
    const input = document.getElementById('global-search-input');
    input.value = "";
    input.focus();
    App.handleGlobalSearch("");
  },

  closeSearchModal: function() {
    document.getElementById('search-modal-overlay').classList.remove('active');
    document.getElementById('search-modal-box').classList.remove('active');
  },

  handleGlobalSearch: function(query) {
    const q = query.toLowerCase().trim();
    const resultsContainer = document.getElementById('search-results-box');

    // Category 1: Topic Pages & Concepts
    const topicKeys = typeof TOPIC_REPOSITORY !== 'undefined' ? Object.keys(TOPIC_REPOSITORY) : [];
    const topicMatches = topicKeys.filter(k => {
      const t = TOPIC_REPOSITORY[k];
      return !q || t.title.toLowerCase().includes(q) || t.oneLiner.toLowerCase().includes(q) || (t.standard && t.standard.toLowerCase().includes(q));
    });

    // Category 2: Comparisons
    const compKeys = typeof COMPARISONS_DATA !== 'undefined' ? Object.keys(COMPARISONS_DATA) : [];
    const compMatches = compKeys.filter(k => {
      const comp = COMPARISONS_DATA[k];
      return !q || comp.title.toLowerCase().includes(q) || comp.shortAnswer.toLowerCase().includes(q);
    });

    // Category 3: Labs & Interactive Simulators
    const labMatches = [
      { name: "CRC Modulo-2 Simulator", topicId: "crc", desc: "Binary XOR polynomial division & syndrome check" },
      { name: "Hamming (7,4) Single Error Corrector", topicId: "hamming-code", desc: "Bit positioning, parity calculation & error localization" },
      { name: "Dijkstra Graph Pathfinder", topicId: "dijkstra", desc: "Shortest path iteration table & forwarding paths" },
      { name: "Distance Vector Routing Lab", topicId: "distance-vector", desc: "Step-by-step neighbor exchange & convergence" },
      { name: "Stop-and-Wait ARQ Simulator", topicId: "stop-and-wait", desc: "Packet loss, ACK loss & retransmission timeout" },
      { name: "Go-Back-N ARQ Simulator", topicId: "go-back-n", desc: "Cumulative ACKs & sliding sender window" },
      { name: "Selective Repeat ARQ Simulator", topicId: "selective-repeat", desc: "Individual ACKs & receiver buffering" },
      { name: "TCP 3-Way Handshake Animator", topicId: "tcp-three-way-handshake", desc: "Interactive SYN, SYN+ACK, ACK state transitions" },
      { name: "TCP Flow Control Simulator", topicId: "tcp-flow-control", desc: "Advertised window rwnd & receiver buffer" },
      { name: "TCP Congestion Control (AIMD)", topicId: "tcp-congestion-control", desc: "Slow Start, Congestion Avoidance, 3 Dup ACKs" },
      { name: "DNS Resolution Tracer", topicId: "dns", desc: "Iterated Root, TLD & Authoritative resolution steps" },
      { name: "RSA Key & Cipher Engine", topicId: "rsa", desc: "Euler totient, public/private keys & modular exponentiation" }
    ].filter(l => !q || l.name.toLowerCase().includes(q) || l.desc.toLowerCase().includes(q));

    let html = "";
    if (topicMatches.length === 0 && compMatches.length === 0 && labMatches.length === 0) {
      html = `<div style="text-align: center; padding: 2rem; color: var(--text-muted);">No items matching "${query}". Try searching 'TCP', 'CRC', 'Dijkstra', 'IPv6', or 'RSA'.</div>`;
    } else {
      if (topicMatches.length > 0) {
        html += `<div style="font-size: 0.75rem; font-weight: 800; color: #10b981; text-transform: uppercase; padding: 0.5rem 1rem;">1. Dedicated Topic Articles (${topicMatches.length})</div>`;
        topicMatches.slice(0, 6).forEach(k => {
          const t = TOPIC_REPOSITORY[k];
          html += `
            <div class="search-item" onclick="App.closeSearchModal(); App.loadTopic('${t.id}')">
              <div class="search-item-info">
                <h4>${t.title}</h4>
                <p>${t.oneLiner}</p>
              </div>
              <span class="brand-badge">${t.unit}</span>
            </div>
          `;
        });
      }

      if (compMatches.length > 0) {
        html += `<div style="font-size: 0.75rem; font-weight: 800; color: #7c3aed; text-transform: uppercase; padding: 0.5rem 1rem; margin-top: 0.5rem;">2. Protocol Comparisons (${compMatches.length})</div>`;
        compMatches.slice(0, 3).forEach(k => {
          const comp = COMPARISONS_DATA[k];
          html += `
            <div class="search-item" onclick="App.closeSearchModal(); App.loadComparison('${comp.id}')">
              <div class="search-item-info">
                <h4>${comp.title}</h4>
                <p>${comp.subtitle}</p>
              </div>
              <span class="brand-badge" style="background: #ede7f6; color: #7c3aed;">Comparison</span>
            </div>
          `;
        });
      }

      if (labMatches.length > 0) {
        html += `<div style="font-size: 0.75rem; font-weight: 800; color: #0284c7; text-transform: uppercase; padding: 0.5rem 1rem; margin-top: 0.5rem;">3. Interactive Virtual Labs (${labMatches.length})</div>`;
        labMatches.slice(0, 4).forEach(l => {
          html += `
            <div class="search-item" onclick="App.closeSearchModal(); App.loadTopic('${l.topicId}')">
              <div class="search-item-info">
                <h4>🔬 ${l.name}</h4>
                <p>${l.desc}</p>
              </div>
              <span class="brand-badge" style="background: #e0f2fe; color: #0284c7;">Launch Lab ➔</span>
            </div>
          `;
        });
      }
    }

    resultsContainer.innerHTML = html;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
