// =============================================================================
// Unit 3 – Network Layer: Curriculum, Topic Hub & Interactive Folder Hierarchy
// Strictly Aligned with Syllabus & Textbook Notes (Tanenbaum Ch. 5, Forouzan Ch. 18-19, Kurose & Ross Ch. 4-5)
// Exactly 5 Main Topics & 20 Subtopics with Interactive Expandable Folder Tree
// =============================================================================

const Unit3Module = {
  // Data-driven hierarchical tree structure for Unit 3 – Network Layer
  hierarchy: [
    {
      id: "topic-u3-1",
      number: 1,
      title: "TOPIC 1 – IP ADDRESSES (IPv4 AND IPv6)",
      shortTitle: "Topic 1 – IP Addresses (IPv4 and IPv6)",
      desc: "Logical addressing principles, 32-bit IPv4 structure, Classful addressing (A-E), CIDR subnetting calculations, 128-bit IPv6 architecture, and IPv4 vs IPv6 comparison.",
      badge: "5 Subtopics",
      type: "folder",
      items: [
        { id: "ip-addressing", title: "IP Addressing Basics", type: "document", time: "20 min" },
        { id: "ipv4", title: "IPv4 Addressing and Classes", type: "document", time: "30 min" },
        { id: "subnetting", title: "Subnetting", type: "document", time: "35 min" },
        { id: "ipv6", title: "IPv6 Addressing", type: "document", time: "30 min" },
        { id: "ipv4-vs-ipv6", title: "IPv4 vs IPv6", type: "document", time: "25 min" }
      ]
    },
    {
      id: "topic-u3-2",
      number: 2,
      title: "TOPIC 2 – INTERNETWORKING",
      shortTitle: "Topic 2 – Internetworking",
      desc: "Connecting heterogeneous networks, virtual network abstractions, internetwork routing principles, and IP encapsulation tunneling techniques.",
      badge: "3 Subtopics",
      type: "folder",
      items: [
        { id: "internetworking", title: "Internetworking Concepts", type: "document", time: "25 min" },
        { id: "internetwork-routing", title: "Internetwork Routing", type: "document", time: "25 min" },
        { id: "tunneling", title: "Tunneling", type: "document", time: "25 min" }
      ]
    },
    {
      id: "topic-u3-3",
      number: 3,
      title: "TOPIC 3 – ROUTING ALGORITHMS",
      shortTitle: "Topic 3 – Routing Algorithms",
      desc: "Graph theory foundations, Bellman's Optimality Principle, Sink trees, Dijkstra's Shortest Path First algorithm, and Flooding techniques.",
      badge: "3 Subtopics",
      type: "folder",
      items: [
        { id: "optimality-principle", title: "Optimality Principle", type: "document", time: "25 min" },
        { id: "dijkstra", title: "Shortest Path Algorithm (Dijkstra's Algorithm)", type: "document", time: "35 min" },
        { id: "flooding", title: "Flooding", type: "document", time: "20 min" }
      ]
    },
    {
      id: "topic-u3-4",
      number: 4,
      title: "TOPIC 4 – DISTANCE VECTOR AND LINK STATE ROUTING",
      shortTitle: "Topic 4 – Distance Vector and Link State Routing",
      desc: "Distributed Bellman-Ford vs global Dijkstra SPF, table update mechanisms, head-to-head comparison, and the Count-to-Infinity problem with split horizon solutions.",
      badge: "5 Subtopics",
      type: "folder",
      items: [
        { id: "distance-vector", title: "Distance Vector Routing", type: "document", time: "30 min" },
        { id: "link-state-routing", title: "Link State Routing", type: "document", time: "35 min" },
        { id: "routing-table-updates", title: "Routing Table Updates", type: "document", time: "25 min" },
        { id: "comparison-dv-ls", title: "Comparison of Distance Vector and Link State Routing", type: "document", time: "25 min" },
        { id: "count-to-infinity", title: "Count-to-Infinity Problem", type: "document", time: "30 min" }
      ]
    },
    {
      id: "topic-u3-5",
      number: 5,
      title: "TOPIC 5 – CONGESTION CONTROL APPROACHES",
      shortTitle: "Topic 5 – Congestion Control Approaches",
      desc: "Principles of network congestion, traffic-aware multipath routing, virtual circuit admission control, choke packets/ECN throttling, and priority load shedding.",
      badge: "4 Subtopics",
      type: "folder",
      items: [
        { id: "traffic-aware-routing", title: "Traffic-Aware Routing", type: "document", time: "25 min" },
        { id: "admission-control", title: "Admission Control", type: "document", time: "25 min" },
        { id: "traffic-throttling", title: "Traffic Throttling", type: "document", time: "30 min" },
        { id: "load-shedding", title: "Load Shedding", type: "document", time: "25 min" }
      ]
    }
  ],

  // Recursive renderer for the interactive folder tree inside Unit 3 page
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
            <div class="folder-children ml-4 pl-3 py-1.5 space-y-1.5 border-l-2 ${isTopTopic ? 'border-emerald-400 dark:border-emerald-600' : 'border-teal-300 dark:border-teal-600'} transition-all duration-200">
              ${(node.items || []).map(child => renderNode(child, depth + 1)).join('')}
            </div>
          `;
        }

        return `
          <div class="unit3-folder-node rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden mb-2 transition-all duration-200" id="u3-node-${node.id}">
            <div class="unit3-folder-header flex items-center justify-between p-3 cursor-pointer select-none transition-colors hover:bg-emerald-50/60 dark:hover:bg-gray-700/60 ${containsActive ? 'bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold' : 'text-gray-900 dark:text-gray-100'}"
                 onclick="Unit3Module.toggleFolder('${node.id}')">
              <div class="flex items-center space-x-2.5 truncate">
                <i class="fa-solid fa-chevron-${isCollapsed ? 'right' : 'down'} text-xs text-gray-400 w-3.5 transition-transform duration-200"></i>
                <i class="fa-solid fa-${isCollapsed ? 'folder' : 'folder-open'} ${isTopTopic ? 'text-emerald-600 dark:text-emerald-400 text-base' : 'text-teal-500 text-sm'}"></i>
                <span class="${isTopTopic ? 'font-black text-sm tracking-tight' : 'font-bold text-xs tracking-tight'} truncate">${node.title}</span>
              </div>
              <div class="flex items-center space-x-2 shrink-0 ml-2">
                ${node.badge ? `<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">${node.badge}</span>` : ''}
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
          <div class="unit3-doc-item flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all duration-150 group ${
            isCurrent
              ? 'bg-emerald-600 text-white font-bold shadow-sm'
              : 'hover:bg-emerald-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
          }" onclick="App.loadTopic('${node.id}')">
            <div class="flex items-center space-x-2.5 truncate">
              <i class="fa-solid fa-file-lines text-xs ${isCurrent ? 'text-white' : 'text-gray-400 group-hover:text-emerald-500'}"></i>
              <span class="text-xs truncate">${node.title}</span>
            </div>
            <div class="flex items-center space-x-2 shrink-0 ml-2">
              ${node.time ? `<span class="text-[10px] ${isCurrent ? 'text-white/80' : 'text-gray-400'}"><i class="fa-regular fa-clock mr-1"></i>${node.time}</span>` : ''}
              ${isCompleted ? `<i class="fa-solid fa-circle-check text-xs ${isCurrent ? 'text-white' : 'text-emerald-500'}"></i>` : ''}
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
    const container = document.getElementById('unit3-tree-container');
    if (!container) return;
    const clean = query.trim().toLowerCase();
    container.innerHTML = this.renderTreeHtml(this.hierarchy, clean);
  },

  refreshTree: function() {
    const container = document.getElementById('unit3-tree-container');
    const input = document.getElementById('unit3-tree-search');
    if (!container) return;
    const query = input ? input.value : '';
    container.innerHTML = this.renderTreeHtml(this.hierarchy, query.trim().toLowerCase());
  },

  render: function(container) {
    const totalSubtopics = 20;

    container.innerHTML = `
      <!-- Unit Banner -->
      <div class="welcome-banner" style="background: linear-gradient(135deg, #059669 0%, #047857 50%, #064e3b 100%); color: white; border-radius: 16px; padding: 2rem; margin-bottom: 2rem; box-shadow: 0 10px 25px -5px rgba(5, 150, 105, 0.25);">
        <div class="welcome-content" style="max-width: 800px;">
          <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255, 255, 255, 0.15); padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; margin-bottom: 1rem; backdrop-filter: blur(4px);">
            <i class="fa-solid fa-network-wired"></i>
            <span>Unit 3: Core Curriculum</span>
          </div>
          <h1 style="font-size: 2.25rem; font-weight: 800; margin-bottom: 0.75rem; letter-spacing: -0.025em; line-height: 1.2;">
            UNIT 3 – NETWORK LAYER
          </h1>
          <p style="font-size: 1rem; opacity: 0.95; line-height: 1.6; margin-bottom: 1.5rem; color: #ecfdf5;">
            Master host-to-host packet delivery across heterogeneous internetworks: IP addressing (IPv4/IPv6), subnetting mathematics, Dijkstra's algorithm, Distance Vector & Link State routing, and congestion control strategies.
          </p>

          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <button onclick="App.loadTopic('ip-addressing')" style="background: white; color: #047857; border: none; padding: 10px 20px; border-radius: 10px; font-weight: 700; font-size: 0.9rem; cursor: pointer; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); transition: all 0.2s ease;">
              <i class="fa-solid fa-play"></i>
              Start Topic 1: IP Addressing
            </button>
            <button onclick="App.loadView('notebook')" style="background: rgba(255, 255, 255, 0.15); color: white; border: 1px solid rgba(255, 255, 255, 0.3); padding: 10px 20px; border-radius: 10px; font-weight: 600; font-size: 0.9rem; cursor: pointer; display: flex; align-items: center; gap: 8px; backdrop-filter: blur(4px); transition: all 0.2s ease;">
              <i class="fa-solid fa-book-open"></i>
              Browse Syllabus Hub
            </button>
          </div>
        </div>
      </div>

      <!-- Quick Stats Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center space-x-3.5">
          <div class="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-lg font-bold">
            <i class="fa-solid fa-folder-tree"></i>
          </div>
          <div>
            <div class="text-xl font-black text-gray-900 dark:text-white">5</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 font-medium">Main Topics</div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center space-x-3.5">
          <div class="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-900/60 text-teal-600 dark:text-teal-400 flex items-center justify-center text-lg font-bold">
            <i class="fa-solid fa-file-lines"></i>
          </div>
          <div>
            <div class="text-xl font-black text-gray-900 dark:text-white">20</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 font-medium">Core Subtopics</div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center space-x-3.5">
          <div class="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center text-lg font-bold">
            <i class="fa-solid fa-calculator"></i>
          </div>
          <div>
            <div class="text-xl font-black text-gray-900 dark:text-white">100%</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 font-medium">PDF Aligned</div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center space-x-3.5">
          <div class="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-400 flex items-center justify-center text-lg font-bold">
            <i class="fa-solid fa-flask"></i>
          </div>
          <div>
            <div class="text-xl font-black text-gray-900 dark:text-white">3</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 font-medium">Interactive Labs</div>
          </div>
        </div>
      </div>

      <!-- Quick Interactive Simulator Bar -->
      <div class="mb-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-4 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg shrink-0">
            <i class="fa-solid fa-route"></i>
          </div>
          <div>
            <h3 class="font-bold text-sm">Interactive Network Layer Simulators</h3>
            <p class="text-xs text-emerald-100">Step through Dijkstra pathfinding, compute CIDR subnets, and simulate Bellman-Ford vector updates.</p>
          </div>
        </div>
        <div class="flex items-center space-x-2 shrink-0">
          <button onclick="App.loadLab('dijkstra')" class="px-3 py-1.5 bg-white text-emerald-700 rounded-lg text-xs font-bold hover:bg-emerald-50 transition shadow-sm">
            <i class="fa-solid fa-play mr-1"></i> Dijkstra Lab
          </button>
          <button onclick="App.loadLab('subnetting')" class="px-3 py-1.5 bg-emerald-800 text-white rounded-lg text-xs font-bold hover:bg-emerald-900 transition">
            <i class="fa-solid fa-calculator mr-1"></i> Subnet Lab
          </button>
        </div>
      </div>

      <!-- Interactive Expandable Folder Tree Card -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden mb-8">
        <div class="p-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div class="flex items-center space-x-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <h3 class="text-base font-black text-gray-900 dark:text-white uppercase tracking-wider">Unit 3 Navigation Hierarchy</h3>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Explore all 5 Network Layer topics and 20 subtopics with expandable nested folders.</p>
            </div>
            <div class="flex items-center space-x-2">
              <button onclick="Unit3Module.expandAllFolders()" class="text-xs px-2.5 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold transition">
                <i class="fa-solid fa-angles-down mr-1 text-[10px]"></i> Expand All
              </button>
              <button onclick="Unit3Module.collapseAllFolders()" class="text-xs px-2.5 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold transition">
                <i class="fa-solid fa-angles-up mr-1 text-[10px]"></i> Collapse All
              </button>
            </div>
          </div>

          <!-- Live Tree Search Input -->
          <div class="mt-4 relative">
            <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
            <input type="text" id="unit3-tree-search"
                   placeholder="Search Unit 3 topics, subtopics, algorithms (e.g. 'Dijkstra', 'Subnetting', 'Tunneling')..."
                   oninput="Unit3Module.filterTree(this.value)"
                   class="w-full pl-9 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-xs text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" />
          </div>
        </div>

        <!-- Rendered Tree Container -->
        <div id="unit3-tree-container" class="p-4 space-y-2">
          ${this.renderTreeHtml(this.hierarchy)}
        </div>
      </div>

      <!-- Master Syllabus Topic Cards Grid (5 Core Topics) -->
      <div class="mb-4">
        <h3 class="text-base font-black text-gray-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
          <i class="fa-solid fa-graduation-cap text-emerald-600"></i>
          Detailed Syllabus Breakdown (5 Topics)
        </h3>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        ${this.hierarchy.map(topic => `
          <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  TOPIC ${topic.number}
                </span>
                <span class="text-[10px] font-mono text-gray-400">${topic.items.length} Subtopics</span>
              </div>
              <h4 class="font-bold text-sm text-gray-900 dark:text-white mb-2">${topic.title}</h4>
              <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">${topic.desc}</p>

              <div class="space-y-1.5 border-t border-gray-100 dark:border-gray-700/60 pt-3 mb-4">
                ${topic.items.map(sub => `
                  <div onclick="App.loadTopic('${sub.id}')" class="text-xs text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer flex items-center justify-between py-1 px-1.5 rounded hover:bg-emerald-50/50 dark:hover:bg-gray-700/40 transition">
                    <span class="truncate"><i class="fa-solid fa-file-lines text-[10px] text-gray-400 mr-2"></i>${sub.title}</span>
                    <i class="fa-solid fa-chevron-right text-[9px] text-gray-300"></i>
                  </div>
                `).join('')}
              </div>
            </div>

            <button onclick="App.loadTopic('${topic.items[0].id}')" class="w-full py-2 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5">
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
  window.Unit3Module = Unit3Module;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Unit3Module;
}
