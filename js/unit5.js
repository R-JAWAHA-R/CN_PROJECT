// =============================================================================
// Unit 5 – Application Layer: Curriculum, Topic Hub & Interactive Folder Hierarchy
// Strictly Aligned with McGraw-Hill Behrouz A. Forouzan (Ch. 25-27, 30-32)
// Exactly 5 Main Topics & 19 Subtopics with Interactive Expandable Folder Tree
// =============================================================================

const Unit5Module = {
  // Data-driven hierarchical tree structure for Unit 5 – Application Layer
  hierarchy: [
    {
      id: "topic-u5-1",
      number: 1,
      title: "TOPIC 1 – DNS, E-MAIL AND WWW",
      shortTitle: "Topic 1 – DNS, E-Mail & WWW",
      desc: "Distributed Domain Name Space (Root, TLD, Auth), recursive/iterative resolution, multi-stage E-Mail architecture (UA, MTA/SMTP, MAA/POP3/IMAP4), and World Wide Web client-server hypermedia architecture.",
      badge: "3 Subtopics",
      type: "folder",
      items: [
        { id: "dns", title: "DNS (Domain Name System)", type: "document", time: "25 min" },
        { id: "email-architecture", title: "E-Mail Architecture", type: "document", time: "25 min" },
        { id: "www", title: "WWW (World Wide Web)", type: "document", time: "20 min" }
      ]
    },
    {
      id: "topic-u5-2",
      number: 2,
      title: "TOPIC 2 – HTTP (HYPERTEXT TRANSFER PROTOCOL)",
      shortTitle: "Topic 2 – HTTP",
      desc: "Client-server web communications, stateless protocol design, ASCII Request/Response message structure (methods, status codes, headers), and operational performance (persistent keep-alive vs non-persistent, pipelining, caching).",
      badge: "4 Subtopics",
      type: "folder",
      items: [
        { id: "http-intro", title: "Introduction to HTTP", type: "document", time: "20 min" },
        { id: "http-architecture", title: "HTTP Architecture", type: "document", time: "25 min" },
        { id: "http-request-response", title: "HTTP Request and Response", type: "document", time: "30 min" },
        { id: "http-working", title: "Working of HTTP", type: "document", time: "25 min" }
      ]
    },
    {
      id: "topic-u5-3",
      number: 3,
      title: "TOPIC 3 – CONTENT DELIVERY AND WEB ARCHITECTURE",
      shortTitle: "Topic 3 – Content Delivery & Web Architecture",
      desc: "Global Content Delivery Networks (CDNs), edge caching PoPs, Geo-DNS request redirection, scalable multi-tier server farms with L4/L7 load balancing, and forward, reverse & transparent caching web proxies.",
      badge: "3 Subtopics",
      type: "folder",
      items: [
        { id: "content-delivery", title: "Content Delivery", type: "document", time: "25 min" },
        { id: "server-farms", title: "Server Farms", type: "document", time: "25 min" },
        { id: "web-proxies", title: "Web Proxies", type: "document", time: "25 min" }
      ]
    },
    {
      id: "topic-u5-4",
      number: 4,
      title: "TOPIC 4 – PEER-TO-PEER NETWORKS AND NETWORK PROTECTION",
      shortTitle: "Topic 4 – P2P & Network Protection",
      desc: "Peer-to-Peer decentralized file sharing, BitTorrent swarms, self-scaling upload bandwidth, packet-filtering/stateful/proxy firewalls with DMZ architecture, and Host vs Network Intrusion Detection Systems (IDS vs IPS).",
      badge: "3 Subtopics",
      type: "folder",
      items: [
        { id: "p2p-networks", title: "Peer-to-Peer Networks", type: "document", time: "25 min" },
        { id: "firewalls", title: "Firewalls", type: "document", time: "30 min" },
        { id: "ids", title: "Intrusion Detection System (IDS)", type: "document", time: "25 min" }
      ]
    },
    {
      id: "topic-u5-5",
      number: 5,
      title: "TOPIC 5 – NETWORK SECURITY AND CRYPTOGRAPHY",
      shortTitle: "Topic 5 – Network Security & Cryptography",
      desc: "Foundations of cryptology, classical substitution ciphers (Caesar, Vigenère), transposition ciphers (Rail Fence, Columnar), modern symmetric algorithms (DES Feistel, AES SPN), asymmetric key principles (Diffie-Hellman), and RSA key generation/encryption/decryption.",
      badge: "6 Subtopics",
      type: "folder",
      items: [
        { id: "intro-cryptography", title: "Introduction to Cryptography", type: "document", time: "25 min" },
        { id: "substitution-ciphers", title: "Substitution Ciphers", type: "document", time: "30 min" },
        { id: "transposition-ciphers", title: "Transposition Ciphers", type: "document", time: "30 min" },
        { id: "symmetric-algorithms", title: "Symmetric Algorithms", type: "document", time: "35 min" },
        { id: "public-key-algorithms", title: "Public Key Algorithms", type: "document", time: "30 min" },
        { id: "rsa-algorithm", title: "RSA Algorithm", type: "document", time: "40 min" }
      ]
    }
  ],

  // Recursive renderer for the interactive folder tree inside Unit 5 page
  renderTreeHtml: function(nodes, cleanFilter = '') {
    const collapsed = JSON.parse(localStorage.getItem('gfg_collapsed_chapters') || '{}');
    const repo = window.TOPIC_REPOSITORY || {};
    const activeId = typeof activeTopicId !== 'undefined' ? activeTopicId : '';

    function getDescendants(n) {
      let res = [];
      if (n.items) {
        n.items.forEach(c => {
          if (c.type === 'folder' || c.items) res = res.concat(getDescendants(c));
          else res.push(c);
        });
      }
      return res;
    }

    function renderNode(node, depth = 0) {
      const isFolder = node.type === 'folder' || (node.items && node.items.length > 0);

      if (isFolder) {
        const descendants = getDescendants(node);
        if (cleanFilter) {
          const selfMatch = (node.title && node.title.toLowerCase().includes(cleanFilter)) ||
                            (node.shortTitle && node.shortTitle.toLowerCase().includes(cleanFilter));
          const childMatch = descendants.some(d => (d.title && d.title.toLowerCase().includes(cleanFilter)) || (d.id && d.id.toLowerCase().includes(cleanFilter)));
          if (!selfMatch && !childMatch) return '';
        }

        const containsActive = descendants.some(d => d.id === activeId);
        const isCollapsed = !cleanFilter && (collapsed[node.id] === true || (collapsed[node.id] === undefined && !containsActive));
        const isTopTopic = depth === 0;

        let childrenHtml = '';
        if (!isCollapsed) {
          childrenHtml = `
            <div class="folder-children ml-4 pl-3 py-1.5 space-y-1.5 border-l-2 ${isTopTopic ? 'border-amber-400 dark:border-amber-600' : 'border-amber-300 dark:border-amber-700'} transition-all duration-200">
              ${(node.items || []).map(child => renderNode(child, depth + 1)).join('')}
            </div>
          `;
        }

        return `
          <div class="unit5-folder-node rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden mb-2 transition-all duration-200" id="u5-node-${node.id}">
            <div class="unit5-folder-header flex items-center justify-between p-3 cursor-pointer select-none transition-colors hover:bg-amber-50/60 dark:hover:bg-gray-700/60 ${containsActive ? 'bg-amber-50/80 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-bold' : 'text-gray-900 dark:text-gray-100'}"
                 onclick="Unit5Module.toggleFolder('${node.id}')">
              <div class="flex items-center space-x-2.5 truncate">
                <i class="fa-solid fa-chevron-${isCollapsed ? 'right' : 'down'} text-xs text-gray-400 w-3.5 transition-transform duration-200"></i>
                <i class="fa-solid fa-${isCollapsed ? 'folder' : 'folder-open'} ${isTopTopic ? 'text-amber-600 dark:text-amber-400 text-base' : 'text-amber-500 text-sm'}"></i>
                <span class="${isTopTopic ? 'font-black text-sm tracking-tight' : 'font-bold text-xs tracking-tight'} truncate">${node.title}</span>
              </div>
              <div class="flex items-center space-x-2 shrink-0 ml-2">
                ${node.badge ? `<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300">${node.badge}</span>` : ''}
                <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">${descendants.length} items</span>
              </div>
            </div>
            ${childrenHtml}
          </div>
        `;
      } else {
        // Document (Learning Page)
        if (cleanFilter) {
          const match = (node.title && node.title.toLowerCase().includes(cleanFilter)) ||
                        (node.id && node.id.toLowerCase().includes(cleanFilter));
          if (!match) return '';
        }

        const isCurrent = activeId === node.id;
        const isCompleted = typeof completedTopics !== 'undefined' && Array.isArray(completedTopics) && completedTopics.includes(node.id);

        return `
          <div class="unit5-doc-item flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all duration-150 group ${
            isCurrent
              ? 'bg-amber-600 text-white font-bold shadow-sm'
              : 'hover:bg-amber-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
          }" onclick="App.loadTopic('${node.id}')">
            <div class="flex items-center space-x-2.5 truncate">
              <i class="fa-solid fa-file-lines text-xs ${isCurrent ? 'text-white' : 'text-gray-400 group-hover:text-amber-500'}"></i>
              <span class="text-xs truncate">${node.title}</span>
            </div>
            <div class="flex items-center space-x-2 shrink-0 ml-2">
              ${node.time ? `<span class="text-[10px] ${isCurrent ? 'text-white/80' : 'text-gray-400'}"><i class="fa-regular fa-clock mr-1"></i>${node.time}</span>` : ''}
              ${isCompleted ? `<i class="fa-solid fa-circle-check text-xs ${isCurrent ? 'text-white' : 'text-amber-500'}"></i>` : ''}
            </div>
          </div>
        `;
      }
    }

    return nodes.map(n => renderNode(n, 0)).join('');
  },

  toggleFolder: function(folderId) {
    const collapsed = JSON.parse(localStorage.getItem('gfg_collapsed_chapters') || '{}');
    collapsed[folderId] = !collapsed[folderId];
    localStorage.setItem('gfg_collapsed_chapters', JSON.stringify(collapsed));
    this.refreshTree();
    if (typeof renderSidebar === 'function') {
      renderSidebar(document.getElementById('sidebar-filter')?.value || '');
    }
  },

  expandAllFolders: function() {
    const collapsed = JSON.parse(localStorage.getItem('gfg_collapsed_chapters') || '{}');
    function setAll(nodes) {
      nodes.forEach(n => {
        collapsed[n.id] = false;
        if (n.items) setAll(n.items);
      });
    }
    setAll(this.hierarchy);
    localStorage.setItem('gfg_collapsed_chapters', JSON.stringify(collapsed));
    this.refreshTree();
    if (typeof renderSidebar === 'function') renderSidebar();
  },

  collapseAllFolders: function() {
    const collapsed = JSON.parse(localStorage.getItem('gfg_collapsed_chapters') || '{}');
    function setAll(nodes) {
      nodes.forEach(n => {
        collapsed[n.id] = true;
        if (n.items) setAll(n.items);
      });
    }
    setAll(this.hierarchy);
    localStorage.setItem('gfg_collapsed_chapters', JSON.stringify(collapsed));
    this.refreshTree();
    if (typeof renderSidebar === 'function') renderSidebar();
  },

  filterTree: function(query) {
    const container = document.getElementById('unit5-tree-container');
    if (!container) return;
    const clean = query.trim().toLowerCase();
    container.innerHTML = this.renderTreeHtml(this.hierarchy, clean);
  },

  refreshTree: function() {
    const container = document.getElementById('unit5-tree-container');
    const input = document.getElementById('unit5-tree-search');
    if (!container) return;
    const query = input ? input.value : '';
    container.innerHTML = this.renderTreeHtml(this.hierarchy, query.trim().toLowerCase());
  },

  render: function(container) {
    const totalSubtopics = 19;

    container.innerHTML = `
      <!-- Unit Banner -->
      <div class="welcome-banner" style="background: linear-gradient(135deg, #b45309 0%, #92400e 50%, #78350f 100%); color: white; border-radius: 16px; padding: 2rem; margin-bottom: 2rem; box-shadow: 0 10px 25px -5px rgba(180, 83, 9, 0.25);">
        <div class="welcome-content" style="max-width: 800px;">
          <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255, 255, 255, 0.15); padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; margin-bottom: 1rem; backdrop-filter: blur(4px);">
            <i class="fa-solid fa-shield-halved"></i>
            <span>Unit 5: Core Syllabus &amp; McGraw-Hill Forouzan Curriculum</span>
          </div>
          <h1 style="font-size: 2.25rem; font-weight: 800; margin-bottom: 0.75rem; letter-spacing: -0.025em; line-height: 1.2;">
            UNIT 5 – APPLICATION LAYER
          </h1>
          <p style="font-size: 1rem; opacity: 0.95; line-height: 1.6; margin-bottom: 1.5rem; color: #fef3c7;">
            Master user-facing network services, Web protocols, content delivery, distributed P2P architectures, perimeter defense firewalls, and modern cryptographic algorithms (Classical Ciphers, Symmetric DES/AES, and Asymmetric RSA).
          </p>

          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <button onclick="App.loadTopic('dns')" style="background: white; color: #92400e; border: none; padding: 10px 20px; border-radius: 10px; font-weight: 700; font-size: 0.9rem; cursor: pointer; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); transition: all 0.2s ease;">
              <i class="fa-solid fa-play"></i>
              Start TOPIC 1: DNS, E-Mail &amp; WWW
            </button>
            <button onclick="App.loadTopic('rsa-algorithm')" style="background: rgba(255, 255, 255, 0.15); color: white; border: 1px solid rgba(255, 255, 255, 0.3); padding: 10px 20px; border-radius: 10px; font-weight: 600; font-size: 0.9rem; cursor: pointer; display: flex; align-items: center; gap: 8px; backdrop-filter: blur(4px); transition: all 0.2s ease;">
              <i class="fa-solid fa-key"></i>
              Jump to RSA Algorithm
            </button>
          </div>
        </div>
      </div>

      <!-- Quick Stats Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center space-x-3.5">
          <div class="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-400 flex items-center justify-center text-lg font-bold">
            <i class="fa-solid fa-folder-tree"></i>
          </div>
          <div>
            <div class="text-xl font-black text-gray-900 dark:text-white">5</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 font-medium">Main Topics</div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center space-x-3.5">
          <div class="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/60 text-orange-600 dark:text-orange-400 flex items-center justify-center text-lg font-bold">
            <i class="fa-solid fa-file-lines"></i>
          </div>
          <div>
            <div class="text-xl font-black text-gray-900 dark:text-white">19</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 font-medium">Core Subtopics</div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center space-x-3.5">
          <div class="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center text-lg font-bold">
            <i class="fa-solid fa-book"></i>
          </div>
          <div>
            <div class="text-xl font-black text-gray-900 dark:text-white">100%</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 font-medium">Forouzan Aligned</div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center space-x-3.5">
          <div class="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-lg font-bold">
            <i class="fa-solid fa-shield-halved"></i>
          </div>
          <div>
            <div class="text-xl font-black text-gray-900 dark:text-white">18</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 font-medium">Technical Diagrams</div>
          </div>
        </div>
      </div>

      <!-- Quick Interactive Feature Bar -->
      <div class="mb-6 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl p-4 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg shrink-0">
            <i class="fa-solid fa-lock"></i>
          </div>
          <div>
            <h3 class="font-bold text-sm">Application Layer &amp; Network Security Hub</h3>
            <p class="text-xs text-amber-100">Step through DNS iterative resolution, examine HTTP request/response headers, and calculate RSA modular keys.</p>
          </div>
        </div>
        <div class="flex items-center space-x-2 shrink-0">
          <button onclick="App.loadTopic('rsa-algorithm')" class="px-3 py-1.5 bg-white text-amber-700 rounded-lg text-xs font-bold hover:bg-amber-50 transition shadow-sm">
            <i class="fa-solid fa-calculator mr-1"></i> RSA Calculations
          </button>
          <button onclick="App.loadTopic('http-request-response')" class="px-3 py-1.5 bg-amber-800 text-white rounded-lg text-xs font-bold hover:bg-amber-900 transition">
            <i class="fa-solid fa-network-wired mr-1"></i> HTTP Inspector
          </button>
        </div>
      </div>

      <!-- Interactive Expandable Folder Tree Card -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden mb-8">
        <div class="p-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div class="flex items-center space-x-2">
                <span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <h3 class="text-base font-black text-gray-900 dark:text-white uppercase tracking-wider">Unit 5 Navigation Hierarchy</h3>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Explore all 5 Application Layer topics and 19 subtopics with expandable nested folders.</p>
            </div>
            <div class="flex items-center space-x-2">
              <button onclick="Unit5Module.expandAllFolders()" class="text-xs px-2.5 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold transition">
                <i class="fa-solid fa-angles-down mr-1 text-[10px]"></i> Expand All
              </button>
              <button onclick="Unit5Module.collapseAllFolders()" class="text-xs px-2.5 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold transition">
                <i class="fa-solid fa-angles-up mr-1 text-[10px]"></i> Collapse All
              </button>
            </div>
          </div>

          <!-- Live Tree Search Input -->
          <div class="mt-4 relative">
            <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
            <input type="text" id="unit5-tree-search"
                   placeholder="Search Unit 5 topics, subtopics, algorithms (e.g. 'DNS', 'HTTP', 'CDN', 'Firewalls', 'RSA', 'Ciphers')..."
                   oninput="Unit5Module.filterTree(this.value)"
                   class="w-full pl-9 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-xs text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all" />
          </div>
        </div>

        <!-- Rendered Tree Container -->
        <div id="unit5-tree-container" class="p-4 space-y-2">
          ${this.renderTreeHtml(this.hierarchy)}
        </div>
      </div>

      <!-- Master Syllabus Topic Cards Grid (5 Core Topics) -->
      <div class="mb-4">
        <h3 class="text-base font-black text-gray-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
          <i class="fa-solid fa-graduation-cap text-amber-600"></i>
          Detailed Syllabus Breakdown (5 Topics)
        </h3>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        ${this.hierarchy.map(topic => `
          <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                  TOPIC ${topic.number}
                </span>
                <span class="text-[10px] font-mono text-gray-400">${topic.items.length} Subtopics</span>
              </div>
              <h4 class="font-bold text-sm text-gray-900 dark:text-white mb-2">${topic.title}</h4>
              <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">${topic.desc}</p>

              <div class="space-y-1.5 border-t border-gray-100 dark:border-gray-700/60 pt-3 mb-4">
                ${topic.items.map(sub => `
                  <div onclick="App.loadTopic('${sub.id}')" class="text-xs text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 cursor-pointer flex items-center justify-between py-1 px-1.5 rounded hover:bg-amber-50/50 dark:hover:bg-gray-700/40 transition">
                    <span class="truncate"><i class="fa-solid fa-file-lines text-[10px] text-gray-400 mr-2"></i>${sub.title}</span>
                    <i class="fa-solid fa-chevron-right text-[9px] text-gray-300"></i>
                  </div>
                `).join('')}
              </div>
            </div>

            <button onclick="App.loadTopic('${topic.items[0].id}')" class="w-full py-2 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-300 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5">
              <span>Start TOPIC ${topic.number}</span>
              <i class="fa-solid fa-arrow-right text-[10px]"></i>
            </button>
          </div>
        `).join('')}
      </div>
    `;
  }
};

if (typeof window !== 'undefined') {
  window.Unit5Module = Unit5Module;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Unit5Module;
}
