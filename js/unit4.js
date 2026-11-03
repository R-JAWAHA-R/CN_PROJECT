// =============================================================================
// Unit 4 – Transport Layer: Curriculum, Topic Hub & Interactive Folder Hierarchy
// Strictly Aligned with Syllabus & Textbook Notes (Forouzan Ch. 23-24, Tanenbaum Ch. 6, RFC 9293)
// Exactly 5 Main Topics & 21 Subtopics with Interactive Expandable Folder Tree
// =============================================================================

const Unit4Module = {
  // Data-driven hierarchical tree structure for Unit 4 – Transport Layer
  hierarchy: [
    {
      id: "topic-u4-1",
      number: 1,
      title: "TOPIC 1 – TRANSPORT LAYER SERVICES AND BERKELEY SOCKETS",
      shortTitle: "Topic 1 – Services & Berkeley Sockets",
      desc: "Process-to-process delivery, client-server paradigm, multiplexing and demultiplexing, connectionless vs connection-oriented service, and Berkeley Sockets API architecture with working examples.",
      badge: "3 Subtopics",
      type: "folder",
      items: [
        { id: "u4-transport-services", title: "Transport Layer Services", type: "document", time: "20 min" },
        { id: "u4-berkeley-sockets", title: "Berkeley Sockets", type: "document", time: "25 min" },
        { id: "u4-socket-programming-example", title: "Socket Programming Example", type: "document", time: "30 min" }
      ]
    },
    {
      id: "topic-u4-2",
      number: 2,
      title: "TOPIC 2 – ELEMENTS OF TRANSPORT PROTOCOLS",
      shortTitle: "Topic 2 – Elements of Transport Protocols",
      desc: "Transport layer addressing (TSAPs, ICANN port ranges, socket addresses), connection establishment (Two-Way failure vs Three-Way Handshake with ISNs), symmetric release (Two-Army Problem, 4-Way FIN, TIME-WAIT 2MSL), and flow control with circular buffering and Silly Window Syndrome solutions.",
      badge: "4 Subtopics",
      type: "folder",
      items: [
        { id: "u4-transport-addressing", title: "Addressing", type: "document", time: "20 min" },
        { id: "u4-connection-establishment", title: "Connection Establishment", type: "document", time: "25 min" },
        { id: "u4-connection-release", title: "Connection Release", type: "document", time: "25 min" },
        { id: "u4-flow-control-buffering", title: "Flow Control and Buffering", type: "document", time: "25 min" }
      ]
    },
    {
      id: "topic-u4-3",
      number: 3,
      title: "TOPIC 3 – UDP (USER DATAGRAM PROTOCOL)",
      shortTitle: "Topic 3 – UDP (User Datagram Protocol)",
      desc: "Lightweight connectionless transport, RFC 768 design philosophy, 8-byte fixed header format, 12-byte IPv4 Pseudo-Header checksum, message boundary preservation, and comprehensive 12-point head-to-head comparison with TCP.",
      badge: "4 Subtopics",
      type: "folder",
      items: [
        { id: "u4-intro-udp", title: "Introduction to UDP", type: "document", time: "15 min" },
        { id: "u4-udp-services-characteristics", title: "UDP Services and Characteristics", type: "document", time: "20 min" },
        { id: "u4-udp-segment-format", title: "UDP Segment Format", type: "document", time: "25 min" },
        { id: "u4-udp-vs-tcp", title: "UDP vs TCP", type: "document", time: "20 min" }
      ]
    },
    {
      id: "topic-u4-4",
      number: 4,
      title: "TOPIC 4 – TCP (TRANSMISSION CONTROL PROTOCOL)",
      shortTitle: "Topic 4 – TCP (Transmission Control Protocol)",
      desc: "Reliable byte-stream transport (RFC 9293), 20 to 60-byte header format with 6 control flags, Three-Way Handshake connection setup with ISN randomization, Four-Way Handshake graceful release, byte-level sliding window dynamics, and the four core timers (RTO, Persistence, Keepalive, 2MSL).",
      badge: "6 Subtopics",
      type: "folder",
      items: [
        { id: "u4-intro-tcp", title: "Introduction to TCP", type: "document", time: "20 min" },
        { id: "u4-tcp-segment-header", title: "TCP Segment Header", type: "document", time: "30 min" },
        { id: "u4-tcp-connection-establishment", title: "TCP Connection Establishment (Three-Way Handshake)", type: "document", time: "25 min" },
        { id: "u4-tcp-connection-release", title: "TCP Connection Release", type: "document", time: "25 min" },
        { id: "u4-tcp-sliding-window", title: "Sliding Window", type: "document", time: "30 min" },
        { id: "u4-tcp-timer-management", title: "Timer Management", type: "document", time: "25 min" }
      ]
    },
    {
      id: "topic-u4-5",
      number: 5,
      title: "TOPIC 5 – CONGESTION CONTROL",
      shortTitle: "Topic 5 – Congestion Control",
      desc: "Network congestion foundations, traffic descriptors, Open-Loop prevention policies vs Closed-Loop feedback (Backpressure, Choke Packets, Implicit Loss Signaling, ECN), TCP Reno/Tahoe AIMD algorithms (Slow Start, Congestion Avoidance, Fast Retransmit, Fast Recovery), and Throughput/Delay performance curves with AQM/RED.",
      badge: "4 Subtopics",
      type: "folder",
      items: [
        { id: "u4-intro-congestion-control", title: "Introduction to Congestion Control", type: "document", time: "20 min" },
        { id: "u4-congestion-control-mechanisms", title: "Congestion Control Mechanisms", type: "document", time: "25 min" },
        { id: "u4-tcp-congestion-control", title: "TCP Congestion Control", type: "document", time: "30 min" },
        { id: "u4-congestion-network-performance", title: "Congestion Control and Network Performance", type: "document", time: "25 min" }
      ]
    }
  ],

  // Recursive renderer for the interactive folder tree inside Unit 4 page
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
            <div class="folder-children ml-4 pl-3 py-1.5 space-y-1.5 border-l-2 ${isTopTopic ? 'border-purple-400 dark:border-purple-600' : 'border-indigo-300 dark:border-indigo-600'} transition-all duration-200">
              ${(node.items || []).map(child => renderNode(child, depth + 1)).join('')}
            </div>
          `;
        }

        return `
          <div class="unit4-folder-node rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden mb-2 transition-all duration-200" id="u4-node-${node.id}">
            <div class="unit4-folder-header flex items-center justify-between p-3 cursor-pointer select-none transition-colors hover:bg-purple-50/60 dark:hover:bg-gray-700/60 ${containsActive ? 'bg-purple-50/80 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 font-bold' : 'text-gray-900 dark:text-gray-100'}"
                 onclick="Unit4Module.toggleFolder('${node.id}')">
              <div class="flex items-center space-x-2.5 truncate">
                <i class="fa-solid fa-chevron-${isCollapsed ? 'right' : 'down'} text-xs text-gray-400 w-3.5 transition-transform duration-200"></i>
                <i class="fa-solid fa-${isCollapsed ? 'folder' : 'folder-open'} ${isTopTopic ? 'text-purple-600 dark:text-purple-400 text-base' : 'text-indigo-500 text-sm'}"></i>
                <span class="${isTopTopic ? 'font-black text-sm tracking-tight' : 'font-bold text-xs tracking-tight'} truncate">${node.title}</span>
              </div>
              <div class="flex items-center space-x-2 shrink-0 ml-2">
                ${node.badge ? `<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300">${node.badge}</span>` : ''}
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
          <div class="unit4-doc-item flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all duration-150 group ${
            isCurrent
              ? 'bg-purple-600 text-white font-bold shadow-sm'
              : 'hover:bg-purple-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
          }" onclick="App.loadTopic('${node.id}')">
            <div class="flex items-center space-x-2.5 truncate">
              <i class="fa-solid fa-file-lines text-xs ${isCurrent ? 'text-white' : 'text-gray-400 group-hover:text-purple-500'}"></i>
              <span class="text-xs truncate">${node.title}</span>
            </div>
            <div class="flex items-center space-x-2 shrink-0 ml-2">
              ${node.time ? `<span class="text-[10px] ${isCurrent ? 'text-white/80' : 'text-gray-400'}"><i class="fa-regular fa-clock mr-1"></i>${node.time}</span>` : ''}
              ${isCompleted ? `<i class="fa-solid fa-circle-check text-xs ${isCurrent ? 'text-white' : 'text-purple-500'}"></i>` : ''}
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
    const clean = query.trim().toLowerCase();
    const container = document.getElementById('unit4-tree-container');
    if (!container) return;

    if (!clean) {
      this.refreshTree();
      return;
    }

    const html = this.renderTreeHtml(this.hierarchy, clean);
    if (!html.trim()) {
      container.innerHTML = `
        <div class="p-6 text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
          <i class="fa-solid fa-magnifying-glass text-2xl mb-2 text-gray-400"></i>
          <p class="text-sm font-semibold">No transport layer topics match "${query}"</p>
          <p class="text-xs text-gray-400 mt-1">Try searching for "TCP", "UDP", "Socket", "Handshake", "Window", or "Congestion".</p>
        </div>
      `;
    } else {
      container.innerHTML = html;
    }
  },

  refreshTree: function() {
    const container = document.getElementById('unit4-tree-container');
    const searchInput = document.getElementById('unit4-search-input');
    const query = searchInput ? searchInput.value : '';
    if (container) {
      container.innerHTML = this.renderTreeHtml(this.hierarchy, query.trim().toLowerCase());
    }
  },

  // Main entry point called by App.loadView('unit4')
  render: function(container) {
    const totalSubtopics = this.hierarchy.reduce((acc, top) => acc + (top.items ? top.items.length : 0), 0);

    container.innerHTML = `
      <!-- Unit Banner -->
      <div class="welcome-banner" style="background: linear-gradient(135deg, #4c1d95 0%, #6d28d9 45%, #7c3aed 100%); color: #ffffff; padding: 2rem; border-radius: 1rem; margin-bottom: 1.5rem; position: relative; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(124, 58, 237, 0.3);">
        <div class="welcome-text" style="position: relative; z-index: 2;">
          <div style="font-size: 0.8rem; font-weight: 800; color: #e9d5ff; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.4rem;">
            Semester V • Computer Networks • Behrouz A. Forouzan Ch 23-24, Tanenbaum Ch 6 &amp; RFC 9293
          </div>
          <h2 style="font-size: 1.85rem; font-weight: 900; margin-bottom: 0.5rem; letter-spacing: -0.02em;">Unit IV – Transport Layer</h2>
          <p style="font-size: 0.92rem; color: #ede9fe; max-width: 780px; line-height: 1.5;">
            Master process-to-process delivery, Berkeley Sockets API, protocol elements (addressing, 3-way handshake connection establishment, 4-way release, sliding window buffering), UDP datagram framing, TCP reliable byte-stream architecture, and global AIMD congestion control.
          </p>
          <div style="display: flex; gap: 0.75rem; margin-top: 1rem; flex-wrap: wrap;">
            <span style="background: rgba(255,255,255,0.18); backdrop-filter: blur(8px); padding: 4px 12px; border-radius: 9999px; font-size: 0.75rem; font-weight: 700;">5 Core Topics</span>
            <span style="background: rgba(255,255,255,0.18); backdrop-filter: blur(8px); padding: 4px 12px; border-radius: 9999px; font-size: 0.75rem; font-weight: 700;">21 Educational Subtopics</span>
            <span style="background: rgba(255,255,255,0.18); backdrop-filter: blur(8px); padding: 4px 12px; border-radius: 9999px; font-size: 0.75rem; font-weight: 700;">Interactive Folder Tree</span>
            <span style="background: rgba(255,255,255,0.18); backdrop-filter: blur(8px); padding: 4px 12px; border-radius: 9999px; font-size: 0.75rem; font-weight: 700;">Full Forouzan Alignment</span>
          </div>
        </div>
      </div>

      <!-- Quick Action Controls & Search Toolbar -->
      <div class="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm mb-4">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div class="relative w-full sm:w-80">
            <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
            <input type="text" id="unit4-search-input"
                   placeholder="Search Transport Layer topics, RFCs..."
                   oninput="Unit4Module.filterTree(this.value)"
                   class="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg pl-9 pr-8 py-2 text-xs text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all">
            <button onclick="document.getElementById('unit4-search-input').value=''; Unit4Module.refreshTree();"
                    class="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xs"
                    title="Clear search">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div class="flex items-center space-x-2 w-full sm:w-auto justify-end">
            <button onclick="Unit4Module.expandAllFolders()"
                    class="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 transition-colors">
              <i class="fa-solid fa-folder-open text-xs"></i>
              <span>Expand All</span>
            </button>
            <button onclick="Unit4Module.collapseAllFolders()"
                    class="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-200 transition-colors">
              <i class="fa-solid fa-folder text-xs"></i>
              <span>Collapse All</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Quick Topic Navigator Pills -->
      <div class="topic-navigator-bar mb-4 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-bold text-gray-700 dark:text-gray-300">⚡ Direct Topic Jump:</span>
          <span class="text-[11px] font-bold text-purple-600 dark:text-purple-400">5 Main Topics</span>
        </div>
        <div class="flex flex-wrap gap-2">
          <button class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 transition-all"
                  onclick="App.loadTopic('u4-transport-services')">1. Services &amp; Sockets</button>
          <button class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 transition-all"
                  onclick="App.loadTopic('u4-transport-addressing')">2. Elements of Protocols</button>
          <button class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 transition-all"
                  onclick="App.loadTopic('u4-intro-udp')">3. UDP Protocol</button>
          <button class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 transition-all"
                  onclick="App.loadTopic('u4-intro-tcp')">4. TCP Protocol</button>
          <button class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 transition-all"
                  onclick="App.loadTopic('u4-intro-congestion-control')">5. Congestion Control</button>
        </div>
      </div>

      <!-- Interactive Expandable Folder Tree Container -->
      <div id="unit4-tree-container" class="space-y-2">
        ${this.renderTreeHtml(this.hierarchy)}
      </div>
    `;
  }
};

if (typeof window !== 'undefined') {
  window.Unit4Module = Unit4Module;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Unit4Module };
}
