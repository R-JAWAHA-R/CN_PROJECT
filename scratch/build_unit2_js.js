const fs = require('fs');
const path = require('path');

const unit2JsContent = `// =============================================================================
// Unit 2 – Data Link Layer: Curriculum, Topic Hub & Interactive Folder Hierarchy
// Strictly aligned with Master Syllabus & Textbook Notes (Forouzan Ch. 11-12, Tanenbaum Ch. 3-4)
// Features Interactive Expandable Folder Tree with Nested Subfolders & Live Search
// =============================================================================

const Unit2Module = {
  // Data-driven hierarchical tree structure for Unit 2
  hierarchy: [
    {
      id: "topic-u2-1",
      number: 1,
      title: "TOPIC 1 – DATA LINK LAYER FUNDAMENTALS",
      shortTitle: "Topic 1 – DLL Fundamentals",
      desc: "Node-to-node frame delivery, position in OSI, 5 responsibilities, framing, flow and error control.",
      badge: "8 Subtopics",
      type: "folder",
      items: [
        { id: "u2-dll-intro", title: "Introduction to Data Link Layer", type: "document", time: "15 min" },
        { id: "u2-dll-osi-position", title: "Position in the OSI Model", type: "document", time: "15 min" },
        { id: "u2-dll-functions", title: "Functions and Responsibilities", type: "document", time: "20 min" },
        { id: "dll-design-issues", title: "Design Issues", type: "document", time: "25 min" },
        { id: "u2-dll-services", title: "Services Provided to the Network Layer", type: "document", time: "20 min" },
        { id: "framing", title: "Framing Methods", type: "document", time: "25 min" },
        { id: "flow-control", title: "Flow Control", type: "document", time: "20 min" },
        { id: "u2-error-control", title: "Error Control", type: "document", time: "25 min" }
      ]
    },
    {
      id: "topic-u2-2",
      number: 2,
      title: "TOPIC 2 – DATA LINK LAYER PROTOCOLS",
      shortTitle: "Topic 2 – DLL Protocols",
      desc: "Noiseless and noisy channel protocols, Stop-and-Wait, Go-Back-N, and Selective Repeat ARQ.",
      badge: "9 Subtopics • 2 Folders",
      type: "folder",
      items: [
        { id: "u2-dll-protocols-intro", title: "Introduction to Data Link Layer Protocols", type: "document", time: "15 min" },
        { id: "u2-protocol-classification", title: "Classification of Protocols", type: "document", time: "15 min" },
        {
          id: "folder-noiseless-protocols",
          title: "Protocols for Noiseless Channels",
          type: "folder",
          desc: "Ideal theoretical channels without bit corruption or frame loss",
          items: [
            { id: "simplex-protocol", title: "Simplest Protocol", type: "document", time: "15 min" },
            { id: "stop-and-wait-noiseless", title: "Stop-and-Wait Protocol", type: "document", time: "20 min" }
          ]
        },
        {
          id: "folder-noisy-protocols",
          title: "Protocols for Noisy Channels",
          type: "folder",
          desc: "Sliding window Automatic Repeat Request (ARQ) retransmission protocols",
          items: [
            { id: "stop-and-wait", title: "Stop-and-Wait ARQ", type: "document", time: "25 min" },
            { id: "go-back-n", title: "Go-Back-N ARQ", type: "document", time: "30 min" },
            { id: "selective-repeat", title: "Selective Repeat ARQ", type: "document", time: "30 min" }
          ]
        },
        { id: "comparison-noiseless-noisy", title: "Comparison of Noiseless and Noisy Channel Protocols", type: "document", time: "15 min" },
        { id: "comparison-arq-protocols", title: "Comparison of ARQ Protocols", type: "document", time: "20 min" }
      ]
    },
    {
      id: "topic-u2-3",
      number: 3,
      title: "TOPIC 3 – MEDIUM ACCESS CONTROL (MAC) SUBLAYER",
      shortTitle: "Topic 3 – MAC Sublayer",
      desc: "Channel allocation problem, 5 assumptions, static FDMA/TDMA vs dynamic allocation.",
      badge: "7 Subtopics • 1 Folder",
      type: "folder",
      items: [
        { id: "u2-mac-sublayer-intro", title: "Introduction to MAC Sublayer", type: "document", time: "15 min" },
        { id: "u2-need-for-mac-sublayer", title: "Need for MAC Sublayer", type: "document", time: "15 min" },
        { id: "u2-mac-functions-responsibilities", title: "Functions and Responsibilities", type: "document", time: "20 min" },
        { id: "channel-allocation", title: "Channel Allocation Problem", type: "document", time: "25 min" },
        {
          id: "folder-static-channel-allocation",
          title: "Static Channel Allocation",
          type: "folder",
          desc: "Fixed bandwidth subdivision without contention",
          items: [
            { id: "u2-fdma", title: "Frequency Division Multiple Access (FDMA)", type: "document", time: "20 min" },
            { id: "u2-tdma", title: "Time Division Multiple Access (TDMA)", type: "document", time: "20 min" }
          ]
        },
        { id: "u2-dynamic-channel-allocation", title: "Dynamic Channel Allocation", type: "document", time: "20 min" },
        { id: "u2-static-vs-dynamic-channel-allocation", title: "Static vs Dynamic Channel Allocation", type: "document", time: "15 min" }
      ]
    },
    {
      id: "topic-u2-4",
      number: 4,
      title: "TOPIC 4 – MULTIPLE ACCESS PROTOCOLS",
      shortTitle: "Topic 4 – Multiple Access Protocols",
      desc: "Random access protocols, Pure & Slotted ALOHA, 1-p/non-p/p-persistent CSMA, CSMA/CD, and CSMA/CA.",
      badge: "10 Subtopics • 2 Folders",
      type: "folder",
      items: [
        { id: "u2-multiple-access-intro", title: "Introduction to Multiple Access Protocols", type: "document", time: "15 min" },
        { id: "u2-random-access-protocols", title: "Random Access Protocols", type: "document", time: "20 min" },
        {
          id: "folder-aloha",
          title: "ALOHA",
          type: "folder",
          desc: "Pioneering packet radio contention protocols",
          items: [
            { id: "u2-pure-aloha", title: "Pure ALOHA", type: "document", time: "20 min" },
            { id: "u2-slotted-aloha", title: "Slotted ALOHA", type: "document", time: "20 min" }
          ]
        },
        {
          id: "folder-csma",
          title: "Carrier Sense Multiple Access (CSMA)",
          type: "folder",
          desc: "Listen before talk carrier sensing strategies",
          items: [
            { id: "u2-csma-1-persistent", title: "1-Persistent CSMA", type: "document", time: "20 min" },
            { id: "u2-csma-non-persistent", title: "Non-Persistent CSMA", type: "document", time: "20 min" },
            { id: "u2-csma-p-persistent", title: "p-Persistent CSMA", type: "document", time: "20 min" }
          ]
        },
        { id: "u2-csma-cd", title: "CSMA with Collision Detection (CSMA/CD)", type: "document", time: "30 min" },
        { id: "u2-csma-ca", title: "CSMA with Collision Avoidance (CSMA/CA)", type: "document", time: "25 min" },
        { id: "u2-comparison-multiple-access", title: "Comparison of Multiple Access Protocols", type: "document", time: "20 min" }
      ]
    },
    {
      id: "topic-u2-5",
      number: 5,
      title: "TOPIC 5 – COLLISION-FREE PROTOCOLS",
      shortTitle: "Topic 5 – Collision-Free Protocols",
      desc: "Reservation and token-based media access protocols guaranteeing zero collisions under high load.",
      badge: "6 Subtopics",
      type: "folder",
      items: [
        { id: "u2-collision-free-intro", title: "Introduction to Collision-Free Protocols", type: "document", time: "15 min" },
        { id: "u2-bit-map-protocol", title: "Bit-Map Protocol", type: "document", time: "20 min" },
        { id: "u2-binary-countdown-protocol", title: "Binary Countdown Protocol", type: "document", time: "20 min" },
        { id: "u2-token-passing-protocol", title: "Token Passing Protocol", type: "document", time: "25 min" },
        { id: "u2-collision-free-working-principles", title: "Working Principles and Examples", type: "document", time: "20 min" },
        { id: "u2-comparison-collision-free", title: "Comparison of Collision-Free Protocols", type: "document", time: "15 min" }
      ]
    },
    {
      id: "topic-u2-6",
      number: 6,
      title: "TOPIC 6 – ETHERNET MAC SUBLAYER PROTOCOL",
      shortTitle: "Topic 6 – Ethernet MAC Protocol",
      desc: "IEEE 802.3 Ethernet, 48-bit MAC addresses, frame formats, CSMA/CD operation, and binary backoff.",
      badge: "9 Subtopics",
      type: "folder",
      items: [
        { id: "ethernet", title: "Introduction to Ethernet", type: "document", time: "25 min" },
        { id: "u2-ethernet-architecture", title: "Ethernet Architecture", type: "document", time: "20 min" },
        { id: "mac-address", title: "Ethernet MAC Addressing", type: "document", time: "20 min" },
        { id: "u2-ethernet-frame-format", title: "Ethernet Frame Format", type: "document", time: "25 min" },
        { id: "u2-ethernet-mac-protocol", title: "Ethernet MAC Protocol", type: "document", time: "20 min" },
        { id: "u2-ethernet-csma-cd-operation", title: "CSMA/CD Operation", type: "document", time: "25 min" },
        { id: "u2-binary-exponential-backoff", title: "Binary Exponential Backoff Algorithm", type: "document", time: "25 min" },
        { id: "u2-ethernet-types-evolution", title: "Ethernet Types and Evolution", type: "document", time: "20 min" },
        { id: "u2-ethernet-advantages-limitations", title: "Advantages and Limitations", type: "document", time: "15 min" }
      ]
    },
    {
      id: "topic-u2-7",
      number: 7,
      title: "TOPIC 7 – WIRELESS LAN PROTOCOLS",
      shortTitle: "Topic 7 – Wireless LAN Protocols",
      desc: "Wireless physical characteristics, architecture, hidden & exposed terminal problems, and access methods.",
      badge: "8 Subtopics",
      type: "folder",
      items: [
        { id: "wireless-lan-protocols", title: "Introduction to Wireless LANs", type: "document", time: "25 min" },
        { id: "u2-wireless-characteristics", title: "Characteristics of Wireless Communication", type: "document", time: "20 min" },
        { id: "u2-wireless-lan-architecture", title: "Wireless LAN Architecture", type: "document", time: "20 min" },
        { id: "u2-hidden-terminal-problem", title: "Hidden Terminal Problem", type: "document", time: "25 min" },
        { id: "u2-exposed-terminal-problem", title: "Exposed Terminal Problem", type: "document", time: "20 min" },
        { id: "u2-wireless-multiple-access", title: "Multiple Access in Wireless Networks", type: "document", time: "20 min" },
        { id: "u2-wireless-lan-access-methods", title: "Wireless LAN Access Methods", type: "document", time: "20 min" },
        { id: "u2-wireless-communication-challenges", title: "Challenges in Wireless Communication", type: "document", time: "15 min" }
      ]
    },
    {
      id: "topic-u2-8",
      number: 8,
      title: "TOPIC 8 – IEEE 802.11 MAC SUBLAYER PROTOCOL",
      shortTitle: "Topic 8 – IEEE 802.11 MAC Protocol",
      desc: "Wi-Fi architecture, DCF, PCF, CSMA/CA, Interframe Spaces (IFS), RTS/CTS, and NAV virtual sensing.",
      badge: "10 Subtopics",
      type: "folder",
      items: [
        { id: "wifi-mac-sublayer", title: "Introduction to IEEE 802.11", type: "document", time: "30 min" },
        { id: "u2-ieee-802-11-architecture", title: "IEEE 802.11 Architecture", type: "document", time: "20 min" },
        { id: "u2-ieee-802-11-dcf", title: "Distributed Coordination Function (DCF)", type: "document", time: "25 min" },
        { id: "u2-ieee-802-11-pcf", title: "Point Coordination Function (PCF)", type: "document", time: "20 min" },
        { id: "u2-ieee-802-11-csma-ca", title: "CSMA/CA in IEEE 802.11", type: "document", time: "25 min" },
        { id: "u2-ieee-802-11-ifs", title: "Interframe Spaces (IFS)", type: "document", time: "20 min" },
        { id: "u2-rts-cts-mechanism", title: "RTS/CTS Mechanism", type: "document", time: "25 min" },
        { id: "u2-network-allocation-vector", title: "Network Allocation Vector (NAV)", type: "document", time: "20 min" },
        { id: "u2-ieee-802-11-frame-formats", title: "IEEE 802.11 Frame Formats", type: "document", time: "25 min" },
        { id: "u2-dcf-vs-pcf", title: "DCF vs PCF", type: "document", time: "15 min" }
      ]
    },
    {
      id: "topic-u2-9",
      number: 9,
      title: "TOPIC 9 – DATA LINK LAYER SWITCHING",
      shortTitle: "Topic 9 – DLL Switching",
      desc: "Bridges, transparent learning bridges, CAM tables, flooding, Spanning Tree Protocol (STP), and switches.",
      badge: "9 Subtopics",
      type: "folder",
      items: [
        { id: "dll-switching", title: "Introduction to Data Link Layer Switching", type: "document", time: "25 min" },
        { id: "u2-bridges-overview", title: "Bridges", type: "document", time: "20 min" },
        { id: "u2-transparent-bridges", title: "Transparent Bridges", type: "document", time: "20 min" },
        { id: "u2-learning-bridges", title: "Learning Bridges", type: "document", time: "25 min" },
        { id: "u2-bridge-learning-process", title: "Bridge Learning Process", type: "document", time: "20 min" },
        { id: "u2-forwarding-and-filtering", title: "Forwarding and Filtering", type: "document", time: "20 min" },
        { id: "u2-bridge-flooding", title: "Flooding", type: "document", time: "15 min" },
        { id: "u2-spanning-tree-protocol", title: "Spanning Tree Protocol (STP)", type: "document", time: "30 min" },
        { id: "u2-bridges-vs-switches", title: "Bridges vs Switches", type: "document", time: "20 min" }
      ]
    },
    {
      id: "topic-u2-10",
      number: 10,
      title: "TOPIC 10 – NETWORKING DEVICES",
      shortTitle: "Topic 10 – Networking Devices",
      desc: "Comprehensive 5-layer connecting devices: Repeaters, Hubs, Bridges, Switches, Routers, and Gateways.",
      badge: "10 Subtopics",
      type: "folder",
      items: [
        { id: "network-devices", title: "Introduction to Networking Devices", type: "document", time: "25 min" },
        { id: "u2-networking-device-repeaters", title: "Repeaters", type: "document", time: "15 min" },
        { id: "u2-networking-device-hubs", title: "Hubs", type: "document", time: "15 min" },
        { id: "u2-networking-device-bridges", title: "Bridges", type: "document", time: "20 min" },
        { id: "u2-networking-device-switches", title: "Switches", type: "document", time: "25 min" },
        { id: "u2-networking-device-routers", title: "Routers", type: "document", time: "25 min" },
        { id: "u2-networking-device-gateways", title: "Gateways", type: "document", time: "20 min" },
        { id: "u2-device-working-principles", title: "Working Principles of Each Device", type: "document", time: "25 min" },
        { id: "u2-comparison-networking-devices", title: "Comparison of Networking Devices", type: "document", time: "20 min" },
        { id: "u2-device-osi-layers", title: "OSI Layers at Which Networking Devices Operate", type: "document", time: "15 min" }
      ]
    },
    {
      id: "topic-u2-11",
      number: 11,
      title: "TOPIC 11 – REVISION AND ASSESSMENT",
      shortTitle: "Topic 11 – Revision & Assessment",
      desc: "Definitions, diagram gallery, comparison tables, numericals, exam questions, 8-question MCQ check, and tests.",
      badge: "10 Subtopics • Exam Ready",
      type: "folder",
      items: [
        { id: "u2-definitions-terminology", title: "Important Definitions and Terminology", type: "document", time: "15 min" },
        { id: "u2-important-diagrams", title: "Important Diagrams", type: "document", time: "20 min" },
        { id: "u2-comparison-tables", title: "Comparison Tables", type: "document", time: "20 min" },
        { id: "u2-numerical-problems", title: "Numerical Problems", type: "document", time: "30 min" },
        { id: "u2-protocol-examples", title: "Step-by-Step Protocol Examples", type: "document", time: "25 min" },
        { id: "u2-short-answer-questions", title: "Short-Answer Questions", type: "document", time: "20 min" },
        { id: "u2-long-answer-questions", title: "Long-Answer Questions", type: "document", time: "30 min" },
        { id: "u2-important-exam-questions", title: "Important Exam Questions", type: "document", time: "25 min" },
        { id: "u2-mcqs", title: "Multiple-Choice Questions (MCQs)", type: "document", time: "15 min" },
        { id: "u2-practice-test", title: "Practice Test", type: "document", time: "35 min" }
      ]
    }
  ],

  // Recursive renderer for the interactive folder tree inside Unit 2 page
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
          const childMatch = descendants.some(d => d.title.toLowerCase().includes(cleanFilter) || d.id.toLowerCase().includes(cleanFilter));
          if (!selfMatch && !childMatch) return '';
        }

        const containsActive = descendants.some(d => d.id === activeId);
        const isCollapsed = !cleanFilter && (collapsed[node.id] === true || (collapsed[node.id] === undefined && !containsActive));
        const isTopTopic = depth === 0;

        let childrenHtml = '';
        if (!isCollapsed) {
          childrenHtml = \`
            <div class="folder-children ml-4 pl-3 py-1.5 space-y-1.5 border-l-2 \${isTopTopic ? 'border-blue-400 dark:border-blue-600' : 'border-amber-300 dark:border-amber-600'} transition-all duration-200">
              \${(node.items || []).map(child => renderNode(child, depth + 1)).join('')}
            </div>
          \`;
        }

        return \`
          <div class="unit2-folder-node rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden mb-2 transition-all duration-200" id="u2-node-\${node.id}">
            <div class="unit2-folder-header flex items-center justify-between p-3 cursor-pointer select-none transition-colors hover:bg-blue-50/60 dark:hover:bg-gray-700/60 \${containsActive ? 'bg-blue-50/80 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300' : 'text-gray-900 dark:text-gray-100'}"
                 onclick="Unit2Module.toggleFolder('\${node.id}')">
              <div class="flex items-center space-x-2.5 truncate">
                <i class="fa-solid fa-chevron-\${isCollapsed ? 'right' : 'down'} text-xs text-gray-400 w-3.5 transition-transform duration-200"></i>
                <i class="fa-solid fa-\${isCollapsed ? 'folder' : 'folder-open'} \${isTopTopic ? 'text-blue-600 text-base' : 'text-amber-500 text-sm'}"></i>
                <span class="\${isTopTopic ? 'font-black text-sm tracking-tight' : 'font-bold text-xs tracking-tight'} truncate">\${node.title}</span>
              </div>
              <div class="flex items-center space-x-2 shrink-0 ml-2">
                \${node.badge ? \`<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">\${node.badge}</span>\` : ''}
                <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">\${descendants.length} items</span>
              </div>
            </div>
            \${childrenHtml}
          </div>
        \`;
      } else {
        // Document (Learning Page)
        if (cleanFilter) {
          const match = (node.title && node.title.toLowerCase().includes(cleanFilter)) ||
                        (node.id && node.id.toLowerCase().includes(cleanFilter));
          if (!match) return '';
        }

        const isCurrent = activeId === node.id;
        const isCompleted = typeof completedTopics !== 'undefined' && Array.isArray(completedTopics) && completedTopics.includes(node.id);

        return \`
          <div class="unit2-doc-item flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all duration-150 group \${
            isCurrent
              ? 'bg-gfg-green text-white font-bold shadow-sm'
              : 'hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
          }" onclick="App.loadTopic('\${node.id}')">
            <div class="flex items-center space-x-2.5 truncate">
              <i class="fa-solid fa-file-lines text-xs \${isCurrent ? 'text-white' : 'text-gray-400 group-hover:text-blue-500'}"></i>
              <span class="text-xs truncate">\${node.title}</span>
            </div>
            <div class="flex items-center space-x-2 shrink-0 ml-2">
              \${node.time ? \`<span class="text-[10px] \${isCurrent ? 'text-white/80' : 'text-gray-400'}"><i class="fa-regular fa-clock mr-1"></i>\${node.time}</span>\` : ''}
              \${isCompleted ? \`<i class="fa-solid fa-circle-check text-xs \${isCurrent ? 'text-white' : 'text-gfg-green'}"></i>\` : ''}
            </div>
          </div>
        \`;
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
    const container = document.getElementById('unit2-tree-container');
    if (!container) return;
    const clean = query.trim().toLowerCase();
    container.innerHTML = this.renderTreeHtml(this.hierarchy, clean);
  },

  refreshTree: function() {
    const container = document.getElementById('unit2-tree-container');
    const input = document.getElementById('unit2-tree-search');
    if (!container) return;
    const query = input ? input.value : '';
    container.innerHTML = this.renderTreeHtml(this.hierarchy, query.trim().toLowerCase());
  },

  render: function(container) {
    const totalSubtopics = 83;

    container.innerHTML = \`
      <!-- Unit Banner -->
      <div class="welcome-banner" style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 50%, #075985 100%); color: white; border-radius: 16px; padding: 2rem; margin-bottom: 2rem; box-shadow: 0 10px 25px -5px rgba(2, 132, 199, 0.25);">
        <div class="welcome-text">
          <div style="font-size: 0.8rem; font-weight: 800; color: #bae6fd; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
            <span style="background: rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 4px;">UNIT 2</span>
            <span>Computer Networks • Prescribed Curriculum & Master Syllabus Notes</span>
          </div>
          <h2 style="font-size: 2rem; font-weight: 900; margin-bottom: 0.75rem; letter-spacing: -0.02em;">
            UNIT 2 – DATA LINK LAYER
          </h2>
          <p style="font-size: 0.95rem; line-height: 1.6; color: #e0f2fe; max-width: 900px;">
            The comprehensive Layer 2 curriculum structured into <strong>11 Master Topics</strong> with interactive expandable folders, nested subfolders, practical protocol simulations, and complete syllabus revision notes.
          </p>
        </div>

        <!-- Quick Interactive Simulators Launcher Bar -->
        <div style="margin-top: 1.5rem; padding-top: 1.25rem; border-top: 1px solid rgba(255,255,255,0.2);">
          <div style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #bae6fd; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.4rem;">
            <i class="fa-solid fa-flask"></i> Live Interactive Visual Laboratories (Unit 2)
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <button class="sim-btn" style="background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); color: white;" onclick="App.loadTopic('framing')">
              ✂️ Byte & Bit Stuffing Studio
            </button>
            <button class="sim-btn" style="background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); color: white;" onclick="App.loadTopic('crc')">
              🔢 CRC Modulo-2 Division
            </button>
            <button class="sim-btn" style="background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); color: white;" onclick="App.loadTopic('hamming-code')">
              🛡️ Hamming Code (7,4) Lab
            </button>
            <button class="sim-btn" style="background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); color: white;" onclick="App.loadTopic('sliding-window')">
              🪟 Sliding Window Studio
            </button>
            <button class="sim-btn" style="background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); color: white;" onclick="App.loadTopic('aloha')">
              📡 ALOHA & CSMA Contention
            </button>
            <button class="sim-btn" style="background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); color: white;" onclick="App.loadTopic('ethernet')">
              🌐 Ethernet Frame Explorer
            </button>
          </div>
        </div>
      </div>

      <!-- INTERACTIVE EXPANDABLE FOLDER HIERARCHY (CORE REQUIREMENT) -->
      <div class="study-card mb-8 border-2 border-blue-200 dark:border-blue-900 shadow-md">
        <div class="study-card-header flex flex-wrap justify-between items-center gap-3 pb-3 mb-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            <div class="flex items-center gap-2">
              <span class="topic-number-badge bg-blue-600 text-white font-black text-xs uppercase px-2.5 py-1 rounded">Interactive Navigation</span>
              <span class="text-xs font-bold text-gray-500 uppercase tracking-wide">Expandable Tree</span>
            </div>
            <h3 class="text-lg font-black text-gray-900 dark:text-white mt-1 flex items-center gap-2">
              <i class="fa-solid fa-folder-tree text-blue-600"></i> UNIT 2 – DATA LINK LAYER (11 Topics)
            </h3>
          </div>
          <div class="flex items-center gap-2">
            <button class="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-blue-50 dark:bg-gray-800 text-blue-700 dark:text-blue-300 hover:bg-blue-100 transition-colors border border-blue-200 dark:border-blue-800" onclick="Unit2Module.expandAllFolders()">
              <i class="fa-solid fa-folder-open mr-1"></i> Expand All
            </button>
            <button class="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 transition-colors border border-gray-200 dark:border-gray-700" onclick="Unit2Module.collapseAllFolders()">
              <i class="fa-solid fa-folder mr-1"></i> Collapse All
            </button>
          </div>
        </div>

        <!-- Search Bar for Unit 2 Hierarchy -->
        <div class="mb-4">
          <div class="relative">
            <i class="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-xs text-gray-400"></i>
            <input type="text" id="unit2-tree-search"
                   placeholder="Search topics and subtopics inside Unit 2 (e.g. framing, CSMA, ALOHA, ARQ, bridges, Wi-Fi)..."
                   class="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                   oninput="Unit2Module.filterTree(this.value)">
          </div>
        </div>

        <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">
          Explore the official syllabus hierarchy. Click any folder to expand/collapse. Click any subtopic document to open its comprehensive educational lesson page.
        </p>

        <!-- Dynamic Folder Tree Container -->
        <div id="unit2-tree-container">
          \${this.renderTreeHtml(this.hierarchy)}
        </div>
      </div>

      <!-- Quick Topic Jumper Bar -->
      <div class="topic-navigator-bar mb-8 sticky top-16 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur p-3 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <div class="nav-bar-title mb-2 flex items-center justify-between">
          <span class="font-bold text-xs uppercase tracking-wide text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
            <i class="fa-solid fa-list-ol text-blue-600"></i> Direct Topic Access:
          </span>
          <span style="color: #0284c7; font-size: 0.75rem; font-weight: 700;">11 Topics Prescribed in Syllabus</span>
        </div>
        <div class="flex flex-wrap gap-1.5">
          \${this.hierarchy.map(t => \`
            <button onclick="Unit2Module.scrollToTopic('\${t.id}')" class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors">
              \${t.shortTitle}
            </button>
          \`).join('')}
        </div>
      </div>

      <!-- MASTER TOPIC STUDY CARDS (TOPICS 1 to 11) -->
      <div class="space-y-8">
        \${this.hierarchy.map(topic => \`
          <div id="\${topic.id}" class="chapter-block pt-2">
            <div class="flex items-center justify-between pb-2 mb-4 border-b-2 border-blue-500">
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-1 rounded bg-blue-600 text-white font-black text-xs">\${topic.shortTitle.split(' – ')[0].toUpperCase()}</span>
                <h3 class="text-base font-extrabold text-gray-900 dark:text-white">\${topic.title}</h3>
              </div>
              <span class="text-xs text-gray-500 dark:text-gray-400 font-medium">\${topic.badge}</span>
            </div>
            <p class="text-xs text-gray-600 dark:text-gray-300 mb-3">\${topic.desc}</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              \${(topic.items || []).map(item => {
                if (item.type === 'folder' || item.items) {
                  return \`
                    <div class="study-card p-3 rounded-xl border border-amber-200 dark:border-amber-800/60 bg-amber-50/30 dark:bg-amber-950/20 col-span-full">
                      <div class="flex items-center gap-2 font-bold text-xs text-amber-800 dark:text-amber-200 mb-2">
                        <i class="fa-solid fa-folder text-amber-500"></i> \${item.title}
                        <span class="text-[10px] text-gray-500 font-normal">(\${item.desc || 'Sub-folder'})</span>
                      </div>
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                        \${item.items.map(sub => \`
                          <div class="study-card topic-catalog-card p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 cursor-pointer hover:border-blue-500 transition-all" onclick="App.loadTopic('\${sub.id}')">
                            <div class="flex justify-between items-center mb-1">
                              <span class="text-[10px] font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                                <i class="fa-solid fa-file-lines"></i> Lesson
                              </span>
                              \${sub.time ? \`<span class="text-[10px] text-gray-400">\${sub.time}</span>\` : ''}
                            </div>
                            <div class="font-bold text-xs text-gray-900 dark:text-white truncate">\${sub.title}</div>
                          </div>
                        \`).join('')}
                      </div>
                    </div>
                  \`;
                } else {
                  return \`
                    <div class="study-card topic-catalog-card p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 cursor-pointer hover:border-blue-500 hover:shadow-sm transition-all" onclick="App.loadTopic('\${item.id}')">
                      <div class="flex justify-between items-center mb-1.5">
                        <span class="text-[10px] font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                          <i class="fa-solid fa-file-lines"></i> Lesson
                        </span>
                        \${item.time ? \`<span class="text-[10px] text-gray-400">\${item.time}</span>\` : ''}
                      </div>
                      <div class="font-bold text-xs text-gray-900 dark:text-white mb-1">\${item.title}</div>
                      <div class="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1">Explore definitions, diagrams & practice questions.</div>
                    </div>
                  \`;
                }
              }).join('')}
            </div>
          </div>
        \`).join('')}
      </div>
    \`;
  },

  scrollToTopic: function(topicId) {
    const el = document.getElementById(topicId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
};

if (typeof window !== 'undefined') window.Unit2Module = Unit2Module;
if (typeof global !== 'undefined') global.Unit2Module = Unit2Module;
`;

fs.writeFileSync(path.join(__dirname, '../js/unit2.js'), unit2JsContent, 'utf8');
console.log("Successfully rebuilt js/unit2.js!");

