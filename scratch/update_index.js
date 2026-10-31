const fs = require('fs');
const path = require('path');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Script inclusion
const oldScriptTag = '<script src="js/topics_u2_extended.js"></script>';
const newScriptTag = '<script src="js/topics_u2_extended.js"></script>\r\n    <script src="js/topics_u2_syllabus.js"></script>';

if (!html.includes('topics_u2_syllabus.js')) {
  if (html.includes(oldScriptTag)) {
    html = html.replace(oldScriptTag, newScriptTag);
  } else {
    const oldScriptTagLF = oldScriptTag.replace(/\r\n/g, '\n');
    html = html.replace(oldScriptTagLF, '<script src="js/topics_u2_extended.js"></script>\n    <script src="js/topics_u2_syllabus.js"></script>');
  }
}

// 2. Unit 2 in syllabusModules definition
const unit2Tree = {
  id: "unit2",
  module: "Unit 2 – Data Link Layer",
  badge: "11 Topics",
  chapters: [
    {
      id: "topic-u2-1",
      number: 1,
      title: "TOPIC 1 – DATA LINK LAYER FUNDAMENTALS",
      shortTitle: "Topic 1 – DLL Fundamentals",
      type: "folder",
      items: [
        { id: "u2-dll-intro", title: "Introduction to Data Link Layer", type: "document" },
        { id: "u2-dll-osi-position", title: "Position in the OSI Model", type: "document" },
        { id: "u2-dll-functions", title: "Functions and Responsibilities", type: "document" },
        { id: "dll-design-issues", title: "Design Issues", type: "document" },
        { id: "u2-dll-services", title: "Services Provided to the Network Layer", type: "document" },
        { id: "framing", title: "Framing Methods", type: "document" },
        { id: "flow-control", title: "Flow Control", type: "document" },
        { id: "u2-error-control", title: "Error Control", type: "document" }
      ],
      subtopicIds: ["u2-dll-intro", "u2-dll-osi-position", "u2-dll-functions", "dll-design-issues", "u2-dll-services", "framing", "flow-control", "u2-error-control"]
    },
    {
      id: "topic-u2-2",
      number: 2,
      title: "TOPIC 2 – DATA LINK LAYER PROTOCOLS",
      shortTitle: "Topic 2 – DLL Protocols",
      type: "folder",
      items: [
        { id: "u2-dll-protocols-intro", title: "Introduction to Data Link Layer Protocols", type: "document" },
        { id: "u2-protocol-classification", title: "Classification of Protocols", type: "document" },
        {
          id: "folder-noiseless-protocols",
          title: "Protocols for Noiseless Channels",
          type: "folder",
          items: [
            { id: "simplex-protocol", title: "Simplest Protocol", type: "document" },
            { id: "stop-and-wait-noiseless", title: "Stop-and-Wait Protocol", type: "document" }
          ]
        },
        {
          id: "folder-noisy-protocols",
          title: "Protocols for Noisy Channels",
          type: "folder",
          items: [
            { id: "stop-and-wait", title: "Stop-and-Wait ARQ", type: "document" },
            { id: "go-back-n", title: "Go-Back-N ARQ", type: "document" },
            { id: "selective-repeat", title: "Selective Repeat ARQ", type: "document" }
          ]
        },
        { id: "comparison-noiseless-noisy", title: "Comparison of Noiseless and Noisy Channel Protocols", type: "document" },
        { id: "comparison-arq-protocols", title: "Comparison of ARQ Protocols", type: "document" }
      ],
      subtopicIds: ["u2-dll-protocols-intro", "u2-protocol-classification", "simplex-protocol", "stop-and-wait-noiseless", "stop-and-wait", "go-back-n", "selective-repeat", "comparison-noiseless-noisy", "comparison-arq-protocols"]
    },
    {
      id: "topic-u2-3",
      number: 3,
      title: "TOPIC 3 – MEDIUM ACCESS CONTROL (MAC) SUBLAYER",
      shortTitle: "Topic 3 – MAC Sublayer",
      type: "folder",
      items: [
        { id: "u2-mac-sublayer-intro", title: "Introduction to MAC Sublayer", type: "document" },
        { id: "u2-need-for-mac-sublayer", title: "Need for MAC Sublayer", type: "document" },
        { id: "u2-mac-functions-responsibilities", title: "Functions and Responsibilities", type: "document" },
        { id: "channel-allocation", title: "Channel Allocation Problem", type: "document" },
        {
          id: "folder-static-channel-allocation",
          title: "Static Channel Allocation",
          type: "folder",
          items: [
            { id: "u2-fdma", title: "Frequency Division Multiple Access (FDMA)", type: "document" },
            { id: "u2-tdma", title: "Time Division Multiple Access (TDMA)", type: "document" }
          ]
        },
        { id: "u2-dynamic-channel-allocation", title: "Dynamic Channel Allocation", type: "document" },
        { id: "u2-static-vs-dynamic-channel-allocation", title: "Static vs Dynamic Channel Allocation", type: "document" }
      ],
      subtopicIds: ["u2-mac-sublayer-intro", "u2-need-for-mac-sublayer", "u2-mac-functions-responsibilities", "channel-allocation", "u2-fdma", "u2-tdma", "u2-dynamic-channel-allocation", "u2-static-vs-dynamic-channel-allocation"]
    },
    {
      id: "topic-u2-4",
      number: 4,
      title: "TOPIC 4 – MULTIPLE ACCESS PROTOCOLS",
      shortTitle: "Topic 4 – Multiple Access Protocols",
      type: "folder",
      items: [
        { id: "u2-multiple-access-intro", title: "Introduction to Multiple Access Protocols", type: "document" },
        { id: "u2-random-access-protocols", title: "Random Access Protocols", type: "document" },
        {
          id: "folder-aloha",
          title: "ALOHA",
          type: "folder",
          items: [
            { id: "u2-pure-aloha", title: "Pure ALOHA", type: "document" },
            { id: "u2-slotted-aloha", title: "Slotted ALOHA", type: "document" }
          ]
        },
        {
          id: "folder-csma",
          title: "Carrier Sense Multiple Access (CSMA)",
          type: "folder",
          items: [
            { id: "u2-csma-1-persistent", title: "1-Persistent CSMA", type: "document" },
            { id: "u2-csma-non-persistent", title: "Non-Persistent CSMA", type: "document" },
            { id: "u2-csma-p-persistent", title: "p-Persistent CSMA", type: "document" }
          ]
        },
        { id: "u2-csma-cd", title: "CSMA with Collision Detection (CSMA/CD)", type: "document" },
        { id: "u2-csma-ca", title: "CSMA with Collision Avoidance (CSMA/CA)", type: "document" },
        { id: "u2-comparison-multiple-access", title: "Comparison of Multiple Access Protocols", type: "document" }
      ],
      subtopicIds: ["u2-multiple-access-intro", "u2-random-access-protocols", "u2-pure-aloha", "u2-slotted-aloha", "u2-csma-1-persistent", "u2-csma-non-persistent", "u2-csma-p-persistent", "u2-csma-cd", "u2-csma-ca", "u2-comparison-multiple-access"]
    },
    {
      id: "topic-u2-5",
      number: 5,
      title: "TOPIC 5 – COLLISION-FREE PROTOCOLS",
      shortTitle: "Topic 5 – Collision-Free Protocols",
      type: "folder",
      items: [
        { id: "u2-collision-free-intro", title: "Introduction to Collision-Free Protocols", type: "document" },
        { id: "u2-bit-map-protocol", title: "Bit-Map Protocol", type: "document" },
        { id: "u2-binary-countdown-protocol", title: "Binary Countdown Protocol", type: "document" },
        { id: "u2-token-passing-protocol", title: "Token Passing Protocol", type: "document" },
        { id: "u2-collision-free-working-principles", title: "Working Principles and Examples", type: "document" },
        { id: "u2-comparison-collision-free", title: "Comparison of Collision-Free Protocols", type: "document" }
      ],
      subtopicIds: ["u2-collision-free-intro", "u2-bit-map-protocol", "u2-binary-countdown-protocol", "u2-token-passing-protocol", "u2-collision-free-working-principles", "u2-comparison-collision-free"]
    },
    {
      id: "topic-u2-6",
      number: 6,
      title: "TOPIC 6 – ETHERNET MAC SUBLAYER PROTOCOL",
      shortTitle: "Topic 6 – Ethernet MAC Protocol",
      type: "folder",
      items: [
        { id: "ethernet", title: "Introduction to Ethernet", type: "document" },
        { id: "u2-ethernet-architecture", title: "Ethernet Architecture", type: "document" },
        { id: "mac-address", title: "Ethernet MAC Addressing", type: "document" },
        { id: "u2-ethernet-frame-format", title: "Ethernet Frame Format", type: "document" },
        { id: "u2-ethernet-mac-protocol", title: "Ethernet MAC Protocol", type: "document" },
        { id: "u2-ethernet-csma-cd-operation", title: "CSMA/CD Operation", type: "document" },
        { id: "u2-binary-exponential-backoff", title: "Binary Exponential Backoff Algorithm", type: "document" },
        { id: "u2-ethernet-types-evolution", title: "Ethernet Types and Evolution", type: "document" },
        { id: "u2-ethernet-advantages-limitations", title: "Advantages and Limitations", type: "document" }
      ],
      subtopicIds: ["ethernet", "u2-ethernet-architecture", "mac-address", "u2-ethernet-frame-format", "u2-ethernet-mac-protocol", "u2-ethernet-csma-cd-operation", "u2-binary-exponential-backoff", "u2-ethernet-types-evolution", "u2-ethernet-advantages-limitations"]
    },
    {
      id: "topic-u2-7",
      number: 7,
      title: "TOPIC 7 – WIRELESS LAN PROTOCOLS",
      shortTitle: "Topic 7 – Wireless LAN Protocols",
      type: "folder",
      items: [
        { id: "wireless-lan-protocols", title: "Introduction to Wireless LANs", type: "document" },
        { id: "u2-wireless-characteristics", title: "Characteristics of Wireless Communication", type: "document" },
        { id: "u2-wireless-lan-architecture", title: "Wireless LAN Architecture", type: "document" },
        { id: "u2-hidden-terminal-problem", title: "Hidden Terminal Problem", type: "document" },
        { id: "u2-exposed-terminal-problem", title: "Exposed Terminal Problem", type: "document" },
        { id: "u2-wireless-multiple-access", title: "Multiple Access in Wireless Networks", type: "document" },
        { id: "u2-wireless-lan-access-methods", title: "Wireless LAN Access Methods", type: "document" },
        { id: "u2-wireless-communication-challenges", title: "Challenges in Wireless Communication", type: "document" }
      ],
      subtopicIds: ["wireless-lan-protocols", "u2-wireless-characteristics", "u2-wireless-lan-architecture", "u2-hidden-terminal-problem", "u2-exposed-terminal-problem", "u2-wireless-multiple-access", "u2-wireless-lan-access-methods", "u2-wireless-communication-challenges"]
    },
    {
      id: "topic-u2-8",
      number: 8,
      title: "TOPIC 8 – IEEE 802.11 MAC SUBLAYER PROTOCOL",
      shortTitle: "Topic 8 – IEEE 802.11 MAC Protocol",
      type: "folder",
      items: [
        { id: "wifi-mac-sublayer", title: "Introduction to IEEE 802.11", type: "document" },
        { id: "u2-ieee-802-11-architecture", title: "IEEE 802.11 Architecture", type: "document" },
        { id: "u2-ieee-802-11-dcf", title: "Distributed Coordination Function (DCF)", type: "document" },
        { id: "u2-ieee-802-11-pcf", title: "Point Coordination Function (PCF)", type: "document" },
        { id: "u2-ieee-802-11-csma-ca", title: "CSMA/CA in IEEE 802.11", type: "document" },
        { id: "u2-ieee-802-11-ifs", title: "Interframe Spaces (IFS)", type: "document" },
        { id: "u2-rts-cts-mechanism", title: "RTS/CTS Mechanism", type: "document" },
        { id: "u2-network-allocation-vector", title: "Network Allocation Vector (NAV)", type: "document" },
        { id: "u2-ieee-802-11-frame-formats", title: "IEEE 802.11 Frame Formats", type: "document" },
        { id: "u2-dcf-vs-pcf", title: "DCF vs PCF", type: "document" }
      ],
      subtopicIds: ["wifi-mac-sublayer", "u2-ieee-802-11-architecture", "u2-ieee-802-11-dcf", "u2-ieee-802-11-pcf", "u2-ieee-802-11-csma-ca", "u2-ieee-802-11-ifs", "u2-rts-cts-mechanism", "u2-network-allocation-vector", "u2-ieee-802-11-frame-formats", "u2-dcf-vs-pcf"]
    },
    {
      id: "topic-u2-9",
      number: 9,
      title: "TOPIC 9 – DATA LINK LAYER SWITCHING",
      shortTitle: "Topic 9 – DLL Switching",
      type: "folder",
      items: [
        { id: "dll-switching", title: "Introduction to Data Link Layer Switching", type: "document" },
        { id: "u2-bridges-overview", title: "Bridges", type: "document" },
        { id: "u2-transparent-bridges", title: "Transparent Bridges", type: "document" },
        { id: "u2-learning-bridges", title: "Learning Bridges", type: "document" },
        { id: "u2-bridge-learning-process", title: "Bridge Learning Process", type: "document" },
        { id: "u2-forwarding-and-filtering", title: "Forwarding and Filtering", type: "document" },
        { id: "u2-bridge-flooding", title: "Flooding", type: "document" },
        { id: "u2-spanning-tree-protocol", title: "Spanning Tree Protocol (STP)", type: "document" },
        { id: "u2-bridges-vs-switches", title: "Bridges vs Switches", type: "document" }
      ],
      subtopicIds: ["dll-switching", "u2-bridges-overview", "u2-transparent-bridges", "u2-learning-bridges", "u2-bridge-learning-process", "u2-forwarding-and-filtering", "u2-bridge-flooding", "u2-spanning-tree-protocol", "u2-bridges-vs-switches"]
    },
    {
      id: "topic-u2-10",
      number: 10,
      title: "TOPIC 10 – NETWORKING DEVICES",
      shortTitle: "Topic 10 – Networking Devices",
      type: "folder",
      items: [
        { id: "network-devices", title: "Introduction to Networking Devices", type: "document" },
        { id: "u2-networking-device-repeaters", title: "Repeaters", type: "document" },
        { id: "u2-networking-device-hubs", title: "Hubs", type: "document" },
        { id: "u2-networking-device-bridges", title: "Bridges", type: "document" },
        { id: "u2-networking-device-switches", title: "Switches", type: "document" },
        { id: "u2-networking-device-routers", title: "Routers", type: "document" },
        { id: "u2-networking-device-gateways", title: "Gateways", type: "document" },
        { id: "u2-device-working-principles", title: "Working Principles of Each Device", type: "document" },
        { id: "u2-comparison-networking-devices", title: "Comparison of Networking Devices", type: "document" },
        { id: "u2-device-osi-layers", title: "OSI Layers at Which Networking Devices Operate", type: "document" }
      ],
      subtopicIds: ["network-devices", "u2-networking-device-repeaters", "u2-networking-device-hubs", "u2-networking-device-bridges", "u2-networking-device-switches", "u2-networking-device-routers", "u2-networking-device-gateways", "u2-device-working-principles", "u2-comparison-networking-devices", "u2-device-osi-layers"]
    },
    {
      id: "topic-u2-11",
      number: 11,
      title: "TOPIC 11 – REVISION AND ASSESSMENT",
      shortTitle: "Topic 11 – Revision & Assessment",
      type: "folder",
      items: [
        { id: "u2-definitions-terminology", title: "Important Definitions and Terminology", type: "document" },
        { id: "u2-important-diagrams", title: "Important Diagrams", type: "document" },
        { id: "u2-comparison-tables", title: "Comparison Tables", type: "document" },
        { id: "u2-numerical-problems", title: "Numerical Problems", type: "document" },
        { id: "u2-protocol-examples", title: "Step-by-Step Protocol Examples", type: "document" },
        { id: "u2-short-answer-questions", title: "Short-Answer Questions", type: "document" },
        { id: "u2-long-answer-questions", title: "Long-Answer Questions", type: "document" },
        { id: "u2-important-exam-questions", title: "Important Exam Questions", type: "document" },
        { id: "u2-mcqs", title: "Multiple-Choice Questions (MCQs)", type: "document" },
        { id: "u2-practice-test", title: "Practice Test", type: "document" }
      ],
      subtopicIds: ["u2-definitions-terminology", "u2-important-diagrams", "u2-comparison-tables", "u2-numerical-problems", "u2-protocol-examples", "u2-short-answer-questions", "u2-long-answer-questions", "u2-important-exam-questions", "u2-mcqs", "u2-practice-test"]
    }
  ],
  topicIds: [
    "u2-dll-intro", "u2-dll-osi-position", "u2-dll-functions", "dll-design-issues", "u2-dll-services", "framing", "flow-control", "u2-error-control",
    "u2-dll-protocols-intro", "u2-protocol-classification", "simplex-protocol", "stop-and-wait-noiseless", "stop-and-wait", "go-back-n", "selective-repeat", "comparison-noiseless-noisy", "comparison-arq-protocols",
    "u2-mac-sublayer-intro", "u2-need-for-mac-sublayer", "u2-mac-functions-responsibilities", "channel-allocation", "u2-fdma", "u2-tdma", "u2-dynamic-channel-allocation", "u2-static-vs-dynamic-channel-allocation",
    "u2-multiple-access-intro", "u2-random-access-protocols", "u2-pure-aloha", "u2-slotted-aloha", "u2-csma-1-persistent", "u2-csma-non-persistent", "u2-csma-p-persistent", "u2-csma-cd", "u2-csma-ca", "u2-comparison-multiple-access",
    "u2-collision-free-intro", "u2-bit-map-protocol", "u2-binary-countdown-protocol", "u2-token-passing-protocol", "u2-collision-free-working-principles", "u2-comparison-collision-free",
    "ethernet", "u2-ethernet-architecture", "mac-address", "u2-ethernet-frame-format", "u2-ethernet-mac-protocol", "u2-ethernet-csma-cd-operation", "u2-binary-exponential-backoff", "u2-ethernet-types-evolution", "u2-ethernet-advantages-limitations",
    "wireless-lan-protocols", "u2-wireless-characteristics", "u2-wireless-lan-architecture", "u2-hidden-terminal-problem", "u2-exposed-terminal-problem", "u2-wireless-multiple-access", "u2-wireless-lan-access-methods", "u2-wireless-communication-challenges",
    "wifi-mac-sublayer", "u2-ieee-802-11-architecture", "u2-ieee-802-11-dcf", "u2-ieee-802-11-pcf", "u2-ieee-802-11-csma-ca", "u2-ieee-802-11-ifs", "u2-rts-cts-mechanism", "u2-network-allocation-vector", "u2-ieee-802-11-frame-formats", "u2-dcf-vs-pcf",
    "dll-switching", "u2-bridges-overview", "u2-transparent-bridges", "u2-learning-bridges", "u2-bridge-learning-process", "u2-forwarding-and-filtering", "u2-bridge-flooding", "u2-spanning-tree-protocol", "u2-bridges-vs-switches",
    "network-devices", "u2-networking-device-repeaters", "u2-networking-device-hubs", "u2-networking-device-bridges", "u2-networking-device-switches", "u2-networking-device-routers", "u2-networking-device-gateways", "u2-device-working-principles", "u2-comparison-networking-devices", "u2-device-osi-layers",
    "u2-definitions-terminology", "u2-important-diagrams", "u2-comparison-tables", "u2-numerical-problems", "u2-protocol-examples", "u2-short-answer-questions", "u2-long-answer-questions", "u2-important-exam-questions", "u2-mcqs", "u2-practice-test",
    "byte-stuffing", "bit-stuffing", "error-detection", "parity", "checksum", "hamming-code", "crc", "sliding-window", "arp", "vlan"
  ]
};

// Locate Unit 2 in syllabusModules in index.html
const unit2Regex = /\{\s*id:\s*"unit2",[\s\S]*?topicIds:\s*\[[\s\S]*?\]\s*\}/;

if (!unit2Regex.test(html)) {
  console.error("Could not find unit2 in index.html");
  process.exit(1);
}

const formattedUnit2 = JSON.stringify(unit2Tree, null, 16).replace(/"([^"]+)":/g, '$1:');
html = html.replace(unit2Regex, formattedUnit2);

// 3. Update renderSidebar & highlightSyllabusTopic to support recursive tree nodes
const oldRenderSidebarStart = 'function renderSidebar(filterQuery = \'\') {';
const oldRenderSidebarEnd = '// BUILD RIGHT SIDEBAR TABLE OF CONTENTS';

const newSidebarCode = `function getFolderDescendantDocs(node, repo) {
            let docs = [];
            if (node.items && node.items.length > 0) {
                node.items.forEach(child => {
                    if (child.type === 'folder' || child.items) {
                        docs = docs.concat(getFolderDescendantDocs(child, repo));
                    } else {
                        docs.push(repo[child.id] || { id: child.id, title: child.title || child.id });
                    }
                });
            } else if (node.subtopicIds) {
                docs = node.subtopicIds.map(id => repo[id] || { id, title: id });
            }
            return docs;
        }

        function isNodeAncestorOf(node, targetId) {
            if (!node) return false;
            if (node.id === targetId) return true;
            if (node.items) {
                return node.items.some(child => isNodeAncestorOf(child, targetId));
            }
            if (node.subtopicIds) {
                return node.subtopicIds.includes(targetId);
            }
            return false;
        }

        // RENDER SYLLABUS NAVIGATION ACCORDION WITH MULTI-LEVEL HIERARCHICAL TREE SUPPORT
        function renderSidebar(filterQuery = '') {
            const nav = document.getElementById('syllabus-nav');
            if (!nav) return;
            nav.innerHTML = '';
            updateProgressDisplay();

            const repo = window.TOPIC_REPOSITORY || {};
            const cleanQuery = filterQuery.trim().toLowerCase();

            syllabusModules.forEach(mod => {
                const topicsList = mod.topicIds.map(id => repo[id] || { id, title: id }).filter(Boolean);
                const filtered = cleanQuery
                    ? topicsList.filter(t => (t.title && t.title.toLowerCase().includes(cleanQuery)) || (t.oneLiner && t.oneLiner.toLowerCase().includes(cleanQuery)) || (t.id && t.id.toLowerCase().includes(cleanQuery)))
                    : topicsList;

                if (cleanQuery && filtered.length === 0) return;

                const modDiv = document.createElement('div');
                modDiv.className = 'space-y-1 mb-2';

                const isCollapsed = !cleanQuery && !!collapsedModules[mod.id];

                // Module Section Header
                const modHeader = document.createElement('div');
                modHeader.className = 'text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide px-2.5 py-1.5 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-between cursor-pointer select-none hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm';
                modHeader.innerHTML = \`
                    <div class="flex items-center space-x-2 truncate">
                        <i class="fa-solid fa-chevron-\${isCollapsed ? 'right' : 'down'} text-[10px] text-gray-400 transition-transform"></i>
                        <span class="truncate">\${mod.module}</span>
                    </div>
                    <span class="text-[10px] font-mono text-gray-500 dark:text-gray-400 ml-1 shrink-0 bg-white/70 dark:bg-gray-900/60 px-1.5 py-0.5 rounded">\${filtered.length}</span>
                \`;
                modHeader.onclick = () => toggleModule(mod.id);
                modDiv.appendChild(modHeader);

                if (!isCollapsed) {
                    if (mod.chapters && mod.chapters.length > 0) {
                        const chapContainer = document.createElement('div');
                        chapContainer.className = 'space-y-1 pt-0.5 pl-1';

                        // Recursive Tree Renderer for Chapters and Nested Folders
                        function renderNavNode(node, containerEl, depth = 0) {
                            const isFolder = node.type === 'folder' || (node.items && node.items.length > 0) || (node.subtopicIds && !node.type);

                            if (isFolder) {
                                const descendantDocs = getFolderDescendantDocs(node, repo);
                                if (cleanQuery) {
                                    const matchesSelf = (node.title && node.title.toLowerCase().includes(cleanQuery)) ||
                                                        (node.shortTitle && node.shortTitle.toLowerCase().includes(cleanQuery));
                                    const hasMatchingDescendant = descendantDocs.some(d =>
                                        (d.title && d.title.toLowerCase().includes(cleanQuery)) ||
                                        (d.oneLiner && d.oneLiner.toLowerCase().includes(cleanQuery)) ||
                                        (d.id && d.id.toLowerCase().includes(cleanQuery))
                                    );
                                    if (!matchesSelf && !hasMatchingDescendant) return;
                                }

                                const containsActive = descendantDocs.some(d => d.id === activeTopicId);
                                const isChapCollapsed = !cleanQuery && (
                                    collapsedChapters[node.id] === true ||
                                    (collapsedChapters[node.id] === undefined && !containsActive)
                                );

                                const folderDiv = document.createElement('div');
                                folderDiv.className = \`rounded border border-gray-100 dark:border-gray-800/80 bg-white/60 dark:bg-gray-800/40 overflow-hidden mb-1 transition-all duration-200 \${depth > 0 ? 'ml-1.5' : ''}\`;

                                const folderHeader = document.createElement('div');
                                const isTopFolder = depth === 0;
                                folderHeader.className = \`text-[11px] font-bold px-2 py-1.5 flex items-center justify-between cursor-pointer select-none transition-colors duration-150 \${
                                    containsActive
                                        ? 'bg-blue-50/80 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300'
                                        : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100/70 dark:hover:bg-gray-700/60'
                                }\`;
                                folderHeader.innerHTML = \`
                                    <div class="flex items-center space-x-1.5 truncate">
                                        <i class="fa-solid fa-chevron-\${isChapCollapsed ? 'right' : 'down'} text-[9px] \${containsActive ? 'text-blue-500' : 'text-gray-400'} w-3 transition-transform"></i>
                                        <i class="fa-solid fa-\${isChapCollapsed ? 'folder' : 'folder-open'} text-[11px] \${isTopFolder ? 'text-blue-500' : 'text-amber-500'}"></i>
                                        <span class="truncate tracking-tight">\${node.shortTitle || node.title}</span>
                                    </div>
                                    <span class="text-[9px] font-mono px-1 py-0.2 rounded bg-gray-100 dark:bg-gray-700/60 text-gray-500 dark:text-gray-400 ml-1 shrink-0">\${descendantDocs.length}</span>
                                \`;
                                folderHeader.onclick = (e) => {
                                    e.stopPropagation();
                                    toggleChapter(node.id);
                                };
                                folderDiv.appendChild(folderHeader);

                                if (!isChapCollapsed) {
                                    const childrenContainer = document.createElement('div');
                                    childrenContainer.className = 'ml-2 pl-1.5 py-1 space-y-0.5 border-l-2 border-blue-200 dark:border-blue-900/60 animate-fadeIn';

                                    const children = node.items || (node.subtopicIds ? node.subtopicIds.map(id => ({ id, type: 'document' })) : []);
                                    children.forEach(child => {
                                        renderNavNode(child, childrenContainer, depth + 1);
                                    });

                                    folderDiv.appendChild(childrenContainer);
                                }

                                containerEl.appendChild(folderDiv);
                            } else {
                                // Leaf node: Document (Educational Content Page)
                                const doc = repo[node.id] || { id: node.id, title: node.title || node.id };
                                if (cleanQuery) {
                                    const matches = (doc.title && doc.title.toLowerCase().includes(cleanQuery)) ||
                                                    (doc.oneLiner && doc.oneLiner.toLowerCase().includes(cleanQuery)) ||
                                                    (doc.id && doc.id.toLowerCase().includes(cleanQuery));
                                    if (!matches) return;
                                }

                                const isCurrent = activeTopicId === doc.id;
                                const isRead = completedTopics.includes(doc.id);
                                const btn = document.createElement('button');
                                btn.id = 'sidebar-topic-' + doc.id;
                                btn.className = \`w-full text-left px-2 py-1.5 rounded text-xs transition-all flex items-center justify-between group \${
                                    isCurrent
                                        ? 'bg-gfg-green text-white font-bold shadow-sm'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gfg-light dark:hover:bg-gray-800 hover:text-gfg-green'
                                }\`;

                                btn.innerHTML = \`
                                    <div class="flex items-center space-x-2 truncate">
                                        <i class="fa-solid fa-file-lines text-[10px] \${isCurrent ? 'text-white' : 'text-gray-400 group-hover:text-gfg-green'}"></i>
                                        <span class="truncate">\${node.title || doc.title}</span>
                                    </div>
                                    <div class="flex items-center space-x-1 shrink-0 ml-1">
                                        \${isRead ? \`<i class="fa-solid fa-check text-[10px] \${isCurrent ? 'text-white' : 'text-gfg-green'}" title="Completed"></i>\` : ''}
                                    </div>
                                \`;

                                btn.onclick = (e) => {
                                    e.stopPropagation();
                                    App.loadTopic(doc.id);
                                    if (window.innerWidth < 1024 && typeof toggleLeftSidebar === 'function') {
                                        toggleLeftSidebar(false);
                                    }
                                };

                                containerEl.appendChild(btn);
                            }
                        }

                        mod.chapters.forEach(chap => {
                            renderNavNode(chap, chapContainer, 0);
                        });

                        modDiv.appendChild(chapContainer);
                    } else {
                        // Flat topics list for modules without chapters
                        const listContainer = document.createElement('div');
                        listContainer.className = 'space-y-0.5 pt-0.5 pl-1';

                        filtered.forEach(topic => {
                            const isCurrent = activeTopicId === topic.id;
                            const isRead = completedTopics.includes(topic.id);
                            const btn = document.createElement('button');
                            btn.id = 'sidebar-topic-' + topic.id;
                            btn.className = \`w-full text-left px-2.5 py-1.5 rounded text-xs transition-all flex items-center justify-between group \${
                                isCurrent
                                    ? 'bg-gfg-green text-white font-bold shadow-sm'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gfg-light dark:hover:bg-gray-800 hover:text-gfg-green'
                            }\`;

                            btn.innerHTML = \`
                                <div class="flex items-center space-x-2 truncate">
                                    <i class="fa-solid fa-file-lines text-[10px] \${isCurrent ? 'text-white' : 'text-gray-400 group-hover:text-gfg-green'}"></i>
                                    <span class="truncate">\${topic.title}</span>
                                </div>
                                <div class="flex items-center space-x-1 shrink-0 ml-1">
                                    \${isRead ? \`<i class="fa-solid fa-check text-[10px] \${isCurrent ? 'text-white' : 'text-gfg-green'}" title="Completed"></i>\` : ''}
                                </div>
                            \`;

                            btn.onclick = () => {
                                App.loadTopic(topic.id);
                                if (window.innerWidth < 1024 && typeof toggleLeftSidebar === 'function') toggleLeftSidebar(false);
                            };

                            listContainer.appendChild(btn);
                        });

                        modDiv.appendChild(listContainer);
                    }
                }

                nav.appendChild(modDiv);
            });
        }

        function highlightSyllabusTopic(topicId) {
            activeTopicId = topicId;

            // Ensure all ancestor folders (chapters and nested subfolders) are expanded
            syllabusModules.forEach(mod => {
                if (mod.chapters) {
                    function expandAncestors(node) {
                        if (isNodeAncestorOf(node, topicId)) {
                            if (collapsedChapters[node.id]) {
                                collapsedChapters[node.id] = false;
                            }
                            if (node.items) {
                                node.items.forEach(child => expandAncestors(child));
                            }
                        }
                    }
                    mod.chapters.forEach(chap => expandAncestors(chap));
                }
            });
            localStorage.setItem('gfg_collapsed_chapters', JSON.stringify(collapsedChapters));
            renderSidebar(document.getElementById('sidebar-filter')?.value || '');

            document.querySelectorAll('#syllabus-nav button').forEach(b => {
                b.classList.remove('bg-gfg-green', 'text-white', 'font-bold', 'shadow-sm');
                b.classList.add('text-gray-700', 'dark:text-gray-300');
                const icon = b.querySelector('.fa-file-lines');
                if (icon) {
                    icon.classList.remove('text-white');
                    icon.classList.add('text-gray-400');
                }
            });

            const activeBtn = document.getElementById('sidebar-topic-' + topicId);
            if (activeBtn) {
                activeBtn.classList.remove('text-gray-700', 'dark:text-gray-300');
                activeBtn.classList.add('bg-gfg-green', 'text-white', 'font-bold', 'shadow-sm');
                const icon = activeBtn.querySelector('.fa-file-lines');
                if (icon) {
                    icon.classList.remove('text-gray-400');
                    icon.classList.add('text-white');
                }
                activeBtn.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }
        }

        `;

const startSidebarIdx = html.indexOf(oldRenderSidebarStart);
const endSidebarIdx = html.indexOf(oldRenderSidebarEnd);

if (startSidebarIdx === -1 || endSidebarIdx === -1) {
  console.error("Could not find renderSidebar boundaries in index.html");
  process.exit(1);
}

html = html.slice(0, startSidebarIdx) + newSidebarCode + html.slice(endSidebarIdx);
fs.writeFileSync('index.html', html, 'utf8');
console.log("Successfully updated index.html!");

