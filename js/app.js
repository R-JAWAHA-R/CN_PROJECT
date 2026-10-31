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

    const mainContainer = document.getElementById('main-content') || document.getElementById('main-content-container');
    if (mainContainer) mainContainer.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (typeof trackTopicViewed === 'function') {
      trackTopicViewed(topicId);
    }
    if (typeof highlightSyllabusTopic === 'function') {
      highlightSyllabusTopic(topicId);
    }
    if (typeof updateTopicMetaCard === 'function') {
      updateTopicMetaCard(topicId);
    }

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
      if (typeof buildToc === 'function') {
        buildToc();
      }
    }, 80);
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

    const mainContainer = document.getElementById('main-content') || document.getElementById('main-content-container');
    if (mainContainer) mainContainer.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (typeof updateTopicMetaCard === 'function') {
      updateTopicMetaCard(null);
    }

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
      if (typeof buildToc === 'function') {
        buildToc();
      }
    }, 80);
  },

  loadComparison: function(compKey, updateHash = true) {
    if (updateHash) {
      location.hash = '#/comparisons/' + (compKey || '');
    }
    App.loadView('comparisons', compKey, false);
  },

  // 1. HOME DASHBOARD (GEEKSFORGEEKS PORTAL STYLE)
  renderHomeDashboard: function(container) {
    const totalCount = typeof getTotalTopicsCount === 'function' ? getTotalTopicsCount() : 90;
    const completed = (typeof completedTopics !== 'undefined' ? completedTopics.length : 0);
    const pct = Math.round((completed / totalCount) * 100);

    container.innerHTML = `
      <!-- GeeksforGeeks Welcome Hero Banner -->
      <div class="p-6 md:p-8 rounded-xl bg-gradient-to-r from-green-50 via-white to-emerald-50 dark:from-gfg-darkcard dark:via-gray-900 dark:to-gfg-darkcard border border-green-200 dark:border-gray-800 shadow-sm mb-6">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="space-y-2 max-w-2xl">
            <div class="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-gfg-light dark:bg-gray-800 text-gfg-green border border-gfg-green/30 text-[11px] font-bold uppercase tracking-wider">
              <span>GFG Portal</span>
              <span>•</span>
              <span>Semester V Academic Syllabus</span>
            </div>
            <h2 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Computer Networks Encyclopedia</h2>
            <p class="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              University-grade study portal and interactive practice suite covering all 5 curricular units, 90 comprehensive encyclopedic articles, interactive protocol laboratories, and GATE exam test sets.
            </p>
            <div class="flex flex-wrap gap-2 pt-2">
              <button onclick="App.loadView('unit1')" class="px-4 py-2 bg-gfg-green hover:bg-gfg-dark text-white rounded text-xs font-semibold shadow-sm transition-all flex items-center space-x-1.5">
                <span>Start Unit I (Fundamentals)</span>
                <i class="fa-solid fa-arrow-right text-[10px]"></i>
              </button>
              <button onclick="openModal('subnet')" class="px-3.5 py-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded text-xs font-semibold transition-all flex items-center space-x-1.5">
                <i class="fa-solid fa-calculator text-gfg-green"></i>
                <span>Subnet Tool</span>
              </button>
              <button onclick="App.loadView('graph')" class="px-3.5 py-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded text-xs font-semibold transition-all flex items-center space-x-1.5">
                <i class="fa-solid fa-diagram-project text-gfg-green"></i>
                <span>Knowledge Graph</span>
              </button>
              <button onclick="App.loadView('quiz')" class="px-3.5 py-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded text-xs font-semibold transition-all flex items-center space-x-1.5">
                <i class="fa-solid fa-graduation-cap text-gfg-green"></i>
                <span>Exam Quizzes</span>
              </button>
            </div>
          </div>

          <!-- Live Circular Progress Badge -->
          <div class="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col items-center justify-center shrink-0 w-48 text-center">
            <div class="w-16 h-16 rounded-full border-4 border-gfg-green/20 border-t-gfg-green flex items-center justify-center font-extrabold text-base text-gfg-green mb-2">
              ${pct}%
            </div>
            <div class="text-xs font-bold text-gray-800 dark:text-gray-200">Syllabus Progress</div>
            <div class="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">${completed} of ${totalCount} read</div>
          </div>
        </div>
      </div>

      <!-- 4 Core Metric Stat Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div class="bg-white dark:bg-gfg-darkcard p-4 rounded-lg border border-gray-200 dark:border-gfg-darkborder shadow-sm flex items-center space-x-3">
          <div class="w-10 h-10 rounded-lg bg-gfg-light dark:bg-gray-800 text-gfg-green flex items-center justify-center text-lg">
            <i class="fa-solid fa-book-open"></i>
          </div>
          <div>
            <div class="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase">Curriculum</div>
            <div class="text-base font-extrabold text-gray-900 dark:text-white">90 Full Topics</div>
          </div>
        </div>

        <div class="bg-white dark:bg-gfg-darkcard p-4 rounded-lg border border-gray-200 dark:border-gfg-darkborder shadow-sm flex items-center space-x-3">
          <div class="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-500 flex items-center justify-center text-lg">
            <i class="fa-solid fa-toolbox"></i>
          </div>
          <div>
            <div class="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase">Interactive Tools</div>
            <div class="text-base font-extrabold text-gray-900 dark:text-white">5 Simulators</div>
          </div>
        </div>

        <div class="bg-white dark:bg-gfg-darkcard p-4 rounded-lg border border-gray-200 dark:border-gfg-darkborder shadow-sm flex items-center space-x-3">
          <div class="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-500 flex items-center justify-center text-lg">
            <i class="fa-solid fa-graduation-cap"></i>
          </div>
          <div>
            <div class="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase">Exam Practice</div>
            <div class="text-base font-extrabold text-gray-900 dark:text-white">50+ GATE MCQs</div>
          </div>
        </div>

        <div class="bg-white dark:bg-gfg-darkcard p-4 rounded-lg border border-gray-200 dark:border-gfg-darkborder shadow-sm flex items-center space-x-3">
          <div class="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-900/30 text-amber-500 flex items-center justify-center text-lg">
            <i class="fa-solid fa-scale-balanced"></i>
          </div>
          <div>
            <div class="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase">Comparisons</div>
            <div class="text-base font-extrabold text-gray-900 dark:text-white">12 Matrices</div>
          </div>
        </div>
      </div>

      <!-- Curriculum Units (5 Units Grid) -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-bold text-sm uppercase tracking-wider text-gray-800 dark:text-gray-200 flex items-center">
            <i class="fa-solid fa-layer-group text-gfg-green mr-2"></i> Course Syllabus Units
          </h3>
          <span class="text-xs text-gfg-green font-semibold cursor-pointer hover:underline" onclick="App.loadView('notebook')">Browse All Directory →</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Unit 1 -->
          <div onclick="App.loadView('unit1')" class="bg-white dark:bg-gfg-darkcard p-4 rounded-lg border border-gray-200 dark:border-gfg-darkborder hover:border-gfg-green dark:hover:border-gfg-green transition-all cursor-pointer group shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="px-2 py-0.5 rounded bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-[10px] font-bold">Unit I</span>
                <span class="text-[11px] text-gray-500">8 Articles</span>
              </div>
              <h4 class="font-bold text-sm text-gray-900 dark:text-white group-hover:text-gfg-green transition-colors">Networking Fundamentals</h4>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">Network topologies, switching techniques, physical media, OSI and TCP/IP protocol architectures.</p>
            </div>
            <div class="pt-3 border-t border-gray-100 dark:border-gray-800 mt-3 flex items-center justify-between text-xs text-gfg-green font-semibold">
              <span>View Module</span>
              <i class="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
            </div>
          </div>

          <!-- Unit 2 -->
          <div onclick="App.loadView('unit2')" class="bg-white dark:bg-gfg-darkcard p-4 rounded-lg border border-gray-200 dark:border-gfg-darkborder hover:border-gfg-green dark:hover:border-gfg-green transition-all cursor-pointer group shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-[10px] font-bold">Unit II</span>
                <span class="text-[11px] text-gray-500">11 Topics • 83 Lessons</span>
              </div>
              <h4 class="font-bold text-sm text-gray-900 dark:text-white group-hover:text-gfg-green transition-colors">Unit 2 – Data Link Layer</h4>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">Framing, byte/bit stuffing, CRC polynomial division, Hamming codes, ARQ protocols, Ethernet and CSMA/CD.</p>
            </div>
            <div class="pt-3 border-t border-gray-100 dark:border-gray-800 mt-3 flex items-center justify-between text-xs text-gfg-green font-semibold">
              <span>View Module</span>
              <i class="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
            </div>
          </div>

          <!-- Unit 3 -->
          <div onclick="App.loadView('unit3')" class="bg-white dark:bg-gfg-darkcard p-4 rounded-lg border border-gray-200 dark:border-gfg-darkborder hover:border-gfg-green dark:hover:border-gfg-green transition-all cursor-pointer group shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">Unit III</span>
                <span class="text-[11px] text-gray-500">28 Articles</span>
              </div>
              <h4 class="font-bold text-sm text-gray-900 dark:text-white group-hover:text-gfg-green transition-colors">Network Layer &amp; Routing</h4>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">IPv4/IPv6, CIDR Subnetting, Dijkstra SPF, Distance Vector, OSPF, BGP-4, NAT, and congestion control.</p>
            </div>
            <div class="pt-3 border-t border-gray-100 dark:border-gray-800 mt-3 flex items-center justify-between text-xs text-gfg-green font-semibold">
              <span>View Module</span>
              <i class="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
            </div>
          </div>

          <!-- Unit 4 -->
          <div onclick="App.loadView('unit4')" class="bg-white dark:bg-gfg-darkcard p-4 rounded-lg border border-gray-200 dark:border-gfg-darkborder hover:border-gfg-green dark:hover:border-gfg-green transition-all cursor-pointer group shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-[10px] font-bold">Unit IV</span>
                <span class="text-[11px] text-gray-500">10 Articles</span>
              </div>
              <h4 class="font-bold text-sm text-gray-900 dark:text-white group-hover:text-gfg-green transition-colors">Transport Layer &amp; Reliability</h4>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">UDP vs TCP, 3-way handshake, sequence numbers, flow control window (rwnd), AIMD, and Slow Start congestion.</p>
            </div>
            <div class="pt-3 border-t border-gray-100 dark:border-gray-800 mt-3 flex items-center justify-between text-xs text-gfg-green font-semibold">
              <span>View Module</span>
              <i class="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
            </div>
          </div>

          <!-- Unit 5 -->
          <div onclick="App.loadView('unit5')" class="bg-white dark:bg-gfg-darkcard p-4 rounded-lg border border-gray-200 dark:border-gfg-darkborder hover:border-gfg-green dark:hover:border-gfg-green transition-all cursor-pointer group shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-[10px] font-bold">Unit V</span>
                <span class="text-[11px] text-gray-500">17 Articles</span>
              </div>
              <h4 class="font-bold text-sm text-gray-900 dark:text-white group-hover:text-gfg-green transition-colors">Application Layer &amp; Security</h4>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">DNS, HTTP/2 &amp; HTTP/3, SMTP/IMAP, Firewalls, IDS/IPS, Public-Key Cryptography, and RSA encryption algorithms.</p>
            </div>
            <div class="pt-3 border-t border-gray-100 dark:border-gray-800 mt-3 flex items-center justify-between text-xs text-gfg-green font-semibold">
              <span>View Module</span>
              <i class="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
            </div>
          </div>

          <!-- Quick Interactive Simulators Card -->
          <div onclick="openModal('subnet')" class="bg-gradient-to-br from-gfg-green to-emerald-700 text-white p-4 rounded-lg shadow-sm flex flex-col justify-between cursor-pointer hover:shadow-md transition-all">
            <div>
              <div class="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-wider bg-black/20 px-2 py-0.5 rounded w-fit mb-2">
                <span>Interactive Tools</span>
              </div>
              <h4 class="font-extrabold text-sm mb-1">Subnet &amp; Protocol Simulators</h4>
              <p class="text-xs text-white/90 leading-relaxed">Calculate CIDR masks, simulate CRC binary division, and visualize IPv4 / TCP packet bit grids live.</p>
            </div>
            <div class="pt-3 mt-3 flex items-center justify-between text-xs font-bold text-white">
              <span>Launch Subnet Tool</span>
              <i class="fa-solid fa-calculator"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Featured Core Articles -->
      <div>
        <h3 class="font-bold text-sm uppercase tracking-wider text-gray-800 dark:text-gray-200 mb-3 flex items-center">
          <i class="fa-solid fa-star text-amber-500 mr-2"></i> Must-Read Core Articles
        </h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div onclick="App.loadTopic('ip-addressing')" class="p-3 bg-white dark:bg-gfg-darkcard rounded border border-gray-200 dark:border-gfg-darkborder hover:border-gfg-green transition-colors cursor-pointer group">
            <div class="text-[10px] font-mono text-gfg-green font-bold mb-1">Unit III • Network Layer</div>
            <div class="font-bold text-xs text-gray-900 dark:text-white group-hover:text-gfg-green">IPv4 Addresses, CIDR &amp; Subnetting</div>
            <p class="text-[11px] text-gray-500 dark:text-gray-400 mt-1">Classless addressing, subnet masks, wildcard math, and host IP calculations.</p>
          </div>

          <div onclick="App.loadTopic('crc')" class="p-3 bg-white dark:bg-gfg-darkcard rounded border border-gray-200 dark:border-gfg-darkborder hover:border-gfg-green transition-colors cursor-pointer group">
            <div class="text-[10px] font-mono text-blue-500 font-bold mb-1">Unit II • Data Link</div>
            <div class="font-bold text-xs text-gray-900 dark:text-white group-hover:text-gfg-green">Cyclic Redundancy Check (CRC)</div>
            <p class="text-[11px] text-gray-500 dark:text-gray-400 mt-1">Polynomial modulo-2 binary division and error detection codewords.</p>
          </div>

          <div onclick="App.loadTopic('tcp-three-way-handshake')" class="p-3 bg-white dark:bg-gfg-darkcard rounded border border-gray-200 dark:border-gfg-darkborder hover:border-gfg-green transition-colors cursor-pointer group">
            <div class="text-[10px] font-mono text-purple-500 font-bold mb-1">Unit IV • Transport</div>
            <div class="font-bold text-xs text-gray-900 dark:text-white group-hover:text-gfg-green">TCP 3-Way Handshake (SYN, ACK)</div>
            <p class="text-[11px] text-gray-500 dark:text-gray-400 mt-1">Reliable sequence number exchange and state machine transitions.</p>
          </div>

          <div onclick="App.loadTopic('rsa')" class="p-3 bg-white dark:bg-gfg-darkcard rounded border border-gray-200 dark:border-gfg-darkborder hover:border-gfg-green transition-colors cursor-pointer group">
            <div class="text-[10px] font-mono text-amber-500 font-bold mb-1">Unit V • Security</div>
            <div class="font-bold text-xs text-gray-900 dark:text-white group-hover:text-gfg-green">RSA Cryptosystem &amp; Modular Math</div>
            <p class="text-[11px] text-gray-500 dark:text-gray-400 mt-1">Euler totient theorem, keypair generation, and modular exponentiation.</p>
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
              Unit 2 – Data Link Layer
            </h3>
            <span class="badge" style="background: #e0f2fe; color: #0284c7; font-weight: 700; padding: 4px 10px; border-radius: 9999px;">11 Topics</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.45rem;">
            <button class="topic-nav-btn" onclick="App.loadTopic('u2-dll-intro')">Topic 1 – Data Link Layer Fundamentals →</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('u2-dll-protocols-intro')">Topic 2 – Data Link Layer Protocols →</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('u2-mac-sublayer-intro')">Topic 3 – Medium Access Control (MAC) Sublayer →</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('u2-multiple-access-intro')">Topic 4 – Multiple Access Protocols →</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('u2-collision-free-intro')">Topic 5 – Collision-Free Protocols →</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('ethernet')">Topic 6 – Ethernet MAC Sublayer Protocol →</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('wireless-lan-protocols')">Topic 7 – Wireless LAN Protocols →</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('wifi-mac-sublayer')">Topic 8 – IEEE 802.11 MAC Sublayer Protocol →</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('dll-switching')">Topic 9 – Data Link Layer Switching →</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('network-devices')">Topic 10 – Networking Devices →</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('u2-definitions-terminology')">Topic 11 – Revision and Assessment →</button>
          </div>
        </div>

        <!-- UNIT III DIRECTORY -->
        <div class="study-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h3 style="color: #10b981; font-size: 1.25rem; font-weight: 800; margin: 0;">
              Unit III: Network Layer, Routing & Internetworking
            </h3>
            <span class="badge" style="background: #ecfdf5; color: #10b981; font-weight: 700; padding: 4px 10px; border-radius: 9999px;">20 Pages</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.45rem;">
            <button class="topic-nav-btn" onclick="App.loadTopic('routing-design-issues')">1. Network Layer Design Issues ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('optimality-principle')">2. Optimality Principle & Sink Trees ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('shortest-path-algorithm')">3. Shortest Path (Dijkstra SPF) ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('flooding')">4. Flooding Routing & Damping ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('distance-vector-routing')">5. Distance Vector & Count-to-Infinity ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('link-state-routing')">6. Link State Routing & Reliable Flooding ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('congestion-control')">7. Congestion Control Principles ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('traffic-aware-routing')">8. Traffic-Aware Routing & Oscillation ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('admission-control')">9. Admission Control & Traffic Shaping ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('traffic-throttling')">10. Traffic Throttling, Choke Packets & ECN ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('load-shedding')">11. Load Shedding: Wine vs Milk Policies ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('internetworking')">12. Internetworking Architecture ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('tunneling')">13. Tunneling & Protocol Encapsulation ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('internetwork-routing')">14. Internetwork & Hierarchical Routing ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('ipv4-protocol')">15. IPv4 Protocol & Header Architecture ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('ip-addressing')">16. IPv4 Addresses, CIDR & Subnetting ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('ipv6-protocol')">17. IPv6 Architecture & 128-Bit Addressing ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('ospf')">18. Open Shortest Path First (OSPF) ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('bgp')">19. Border Gateway Protocol (BGP-4) ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('nat')">20. Network Address Translation (NAT) ➔</button>
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

    const overlay = document.getElementById('search-modal-overlay');
    if (overlay) overlay.classList.add('active');
    modal.classList.add('active');
  },

  closeExplainModal: function() {
    const modal = document.getElementById('explain-this-modal');
    if (modal) modal.classList.remove('active');
    const overlay = document.getElementById('search-modal-overlay');
    if (overlay) overlay.classList.remove('active');
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
    const overlay = document.getElementById('search-modal-overlay');
    if (overlay) overlay.classList.add('active');
    const modal = document.getElementById('search-modal-box');
    if (modal) modal.classList.add('active');
    const input = document.getElementById('global-search-input');
    if (input) {
      input.value = "";
      input.focus();
    }
    App.handleGlobalSearch("");
  },

  closeSearchModal: function() {
    const overlay = document.getElementById('search-modal-overlay');
    if (overlay) overlay.classList.remove('active');
    const modal = document.getElementById('search-modal-box');
    if (modal) modal.classList.remove('active');
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
