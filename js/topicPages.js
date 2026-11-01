// Master Topic Page Engine & Modern Interactive Article Generator
// Unifies all Unit Topic Repositories and renders the 17-Point Structural Article Template

var TOPIC_REPOSITORY = Object.assign(
  {},
  typeof TOPICS_U1 !== 'undefined' ? TOPICS_U1 : (typeof window !== 'undefined' && window.TOPICS_U1 ? window.TOPICS_U1 : {}),
  typeof TOPICS_U2 !== 'undefined' ? TOPICS_U2 : (typeof window !== 'undefined' && window.TOPICS_U2 ? window.TOPICS_U2 : {}),
  typeof TOPICS_U2_EXT !== 'undefined' ? TOPICS_U2_EXT : (typeof window !== 'undefined' && window.TOPICS_U2_EXT ? window.TOPICS_U2_EXT : {}),
  typeof TOPICS_U2_SYLLABUS !== 'undefined' ? TOPICS_U2_SYLLABUS : (typeof window !== 'undefined' && window.TOPICS_U2_SYLLABUS ? window.TOPICS_U2_SYLLABUS : {}),
  typeof TOPICS_U3 !== 'undefined' ? TOPICS_U3 : (typeof window !== 'undefined' && window.TOPICS_U3 ? window.TOPICS_U3 : {}),
  typeof TOPICS_U3_EXT !== 'undefined' ? TOPICS_U3_EXT : (typeof window !== 'undefined' && window.TOPICS_U3_EXT ? window.TOPICS_U3_EXT : {}),
  typeof TOPICS_U4 !== 'undefined' ? TOPICS_U4 : (typeof window !== 'undefined' && window.TOPICS_U4 ? window.TOPICS_U4 : {}),
  typeof TOPICS_U5 !== 'undefined' ? TOPICS_U5 : (typeof window !== 'undefined' && window.TOPICS_U5 ? window.TOPICS_U5 : {})
);

if (typeof window !== 'undefined') window.TOPIC_REPOSITORY = TOPIC_REPOSITORY;
if (typeof global !== 'undefined') global.TOPIC_REPOSITORY = TOPIC_REPOSITORY;

// Master Pedagogical Hierarchy Mapping from Syllabus PDF
const TOPIC_CHAPTER_MAP = {
  // Topic 1 – Data Link Layer Fundamentals
  "u2-dll-intro": { chapNum: 1, chapTitle: "Topic 1 – Data Link Layer Fundamentals" },
  "u2-dll-osi-position": { chapNum: 1, chapTitle: "Topic 1 – Data Link Layer Fundamentals" },
  "u2-dll-functions": { chapNum: 1, chapTitle: "Topic 1 – Data Link Layer Fundamentals" },
  "dll-design-issues": { chapNum: 1, chapTitle: "Topic 1 – Data Link Layer Fundamentals" },
  "u2-dll-services": { chapNum: 1, chapTitle: "Topic 1 – Data Link Layer Fundamentals" },
  "framing": { chapNum: 1, chapTitle: "Topic 1 – Data Link Layer Fundamentals" },
  "byte-stuffing": { chapNum: 1, chapTitle: "Topic 1 – Data Link Layer Fundamentals" },
  "bit-stuffing": { chapNum: 1, chapTitle: "Topic 1 – Data Link Layer Fundamentals" },
  "flow-control": { chapNum: 1, chapTitle: "Topic 1 – Data Link Layer Fundamentals" },
  "u2-error-control": { chapNum: 1, chapTitle: "Topic 1 – Data Link Layer Fundamentals" },
  "error-detection": { chapNum: 1, chapTitle: "Topic 1 – Data Link Layer Fundamentals" },
  "parity": { chapNum: 1, chapTitle: "Topic 1 – Data Link Layer Fundamentals" },
  "checksum": { chapNum: 1, chapTitle: "Topic 1 – Data Link Layer Fundamentals" },
  "hamming-code": { chapNum: 1, chapTitle: "Topic 1 – Data Link Layer Fundamentals" },
  "crc": { chapNum: 1, chapTitle: "Topic 1 – Data Link Layer Fundamentals" },

  // Topic 2 – Data Link Layer Protocols
  "u2-dll-protocols-intro": { chapNum: 2, chapTitle: "Topic 2 – Data Link Layer Protocols" },
  "u2-protocol-classification": { chapNum: 2, chapTitle: "Topic 2 – Data Link Layer Protocols" },
  "simplex-protocol": { chapNum: 2, chapTitle: "Topic 2 – Data Link Layer Protocols" },
  "stop-and-wait-noiseless": { chapNum: 2, chapTitle: "Topic 2 – Data Link Layer Protocols" },
  "stop-and-wait": { chapNum: 2, chapTitle: "Topic 2 – Data Link Layer Protocols" },
  "sliding-window": { chapNum: 2, chapTitle: "Topic 2 – Data Link Layer Protocols" },
  "go-back-n": { chapNum: 2, chapTitle: "Topic 2 – Data Link Layer Protocols" },
  "selective-repeat": { chapNum: 2, chapTitle: "Topic 2 – Data Link Layer Protocols" },
  "comparison-noiseless-noisy": { chapNum: 2, chapTitle: "Topic 2 – Data Link Layer Protocols" },
  "comparison-arq-protocols": { chapNum: 2, chapTitle: "Topic 2 – Data Link Layer Protocols" },

  // Topic 3 – Medium Access Control (MAC) Sublayer
  "u2-mac-sublayer-intro": { chapNum: 3, chapTitle: "Topic 3 – Medium Access Control (MAC) Sublayer" },
  "u2-need-for-mac-sublayer": { chapNum: 3, chapTitle: "Topic 3 – Medium Access Control (MAC) Sublayer" },
  "u2-mac-functions-responsibilities": { chapNum: 3, chapTitle: "Topic 3 – Medium Access Control (MAC) Sublayer" },
  "channel-allocation": { chapNum: 3, chapTitle: "Topic 3 – Medium Access Control (MAC) Sublayer" },
  "u2-fdma": { chapNum: 3, chapTitle: "Topic 3 – Medium Access Control (MAC) Sublayer" },
  "u2-tdma": { chapNum: 3, chapTitle: "Topic 3 – Medium Access Control (MAC) Sublayer" },
  "u2-dynamic-channel-allocation": { chapNum: 3, chapTitle: "Topic 3 – Medium Access Control (MAC) Sublayer" },
  "u2-static-vs-dynamic-channel-allocation": { chapNum: 3, chapTitle: "Topic 3 – Medium Access Control (MAC) Sublayer" },

  // Topic 4 – Multiple Access Protocols
  "u2-multiple-access-intro": { chapNum: 4, chapTitle: "Topic 4 – Multiple Access Protocols" },
  "u2-random-access-protocols": { chapNum: 4, chapTitle: "Topic 4 – Multiple Access Protocols" },
  "aloha": { chapNum: 4, chapTitle: "Topic 4 – Multiple Access Protocols" },
  "u2-pure-aloha": { chapNum: 4, chapTitle: "Topic 4 – Multiple Access Protocols" },
  "u2-slotted-aloha": { chapNum: 4, chapTitle: "Topic 4 – Multiple Access Protocols" },
  "csma-protocols": { chapNum: 4, chapTitle: "Topic 4 – Multiple Access Protocols" },
  "u2-csma-1-persistent": { chapNum: 4, chapTitle: "Topic 4 – Multiple Access Protocols" },
  "u2-csma-non-persistent": { chapNum: 4, chapTitle: "Topic 4 – Multiple Access Protocols" },
  "u2-csma-p-persistent": { chapNum: 4, chapTitle: "Topic 4 – Multiple Access Protocols" },
  "u2-csma-cd": { chapNum: 4, chapTitle: "Topic 4 – Multiple Access Protocols" },
  "u2-csma-ca": { chapNum: 4, chapTitle: "Topic 4 – Multiple Access Protocols" },
  "u2-comparison-multiple-access": { chapNum: 4, chapTitle: "Topic 4 – Multiple Access Protocols" },

  // Topic 5 – Collision-Free Protocols
  "u2-collision-free-intro": { chapNum: 5, chapTitle: "Topic 5 – Collision-Free Protocols" },
  "collision-free-protocols": { chapNum: 5, chapTitle: "Topic 5 – Collision-Free Protocols" },
  "u2-bit-map-protocol": { chapNum: 5, chapTitle: "Topic 5 – Collision-Free Protocols" },
  "u2-binary-countdown-protocol": { chapNum: 5, chapTitle: "Topic 5 – Collision-Free Protocols" },
  "u2-token-passing-protocol": { chapNum: 5, chapTitle: "Topic 5 – Collision-Free Protocols" },
  "u2-collision-free-working-principles": { chapNum: 5, chapTitle: "Topic 5 – Collision-Free Protocols" },
  "u2-comparison-collision-free": { chapNum: 5, chapTitle: "Topic 5 – Collision-Free Protocols" },

  // Topic 6 – Ethernet MAC Sublayer Protocol
  "ethernet": { chapNum: 6, chapTitle: "Topic 6 – Ethernet MAC Sublayer Protocol" },
  "u2-ethernet-architecture": { chapNum: 6, chapTitle: "Topic 6 – Ethernet MAC Sublayer Protocol" },
  "mac-address": { chapNum: 6, chapTitle: "Topic 6 – Ethernet MAC Sublayer Protocol" },
  "u2-ethernet-frame-format": { chapNum: 6, chapTitle: "Topic 6 – Ethernet MAC Sublayer Protocol" },
  "u2-ethernet-mac-protocol": { chapNum: 6, chapTitle: "Topic 6 – Ethernet MAC Sublayer Protocol" },
  "u2-ethernet-csma-cd-operation": { chapNum: 6, chapTitle: "Topic 6 – Ethernet MAC Sublayer Protocol" },
  "u2-binary-exponential-backoff": { chapNum: 6, chapTitle: "Topic 6 – Ethernet MAC Sublayer Protocol" },
  "u2-ethernet-types-evolution": { chapNum: 6, chapTitle: "Topic 6 – Ethernet MAC Sublayer Protocol" },
  "u2-ethernet-advantages-limitations": { chapNum: 6, chapTitle: "Topic 6 – Ethernet MAC Sublayer Protocol" },

  // Topic 7 – Wireless LAN Protocols
  "wireless-lan-protocols": { chapNum: 7, chapTitle: "Topic 7 – Wireless LAN Protocols" },
  "u2-wireless-characteristics": { chapNum: 7, chapTitle: "Topic 7 – Wireless LAN Protocols" },
  "u2-wireless-lan-architecture": { chapNum: 7, chapTitle: "Topic 7 – Wireless LAN Protocols" },
  "u2-hidden-terminal-problem": { chapNum: 7, chapTitle: "Topic 7 – Wireless LAN Protocols" },
  "u2-exposed-terminal-problem": { chapNum: 7, chapTitle: "Topic 7 – Wireless LAN Protocols" },
  "u2-wireless-multiple-access": { chapNum: 7, chapTitle: "Topic 7 – Wireless LAN Protocols" },
  "u2-wireless-lan-access-methods": { chapNum: 7, chapTitle: "Topic 7 – Wireless LAN Protocols" },
  "u2-wireless-communication-challenges": { chapNum: 7, chapTitle: "Topic 7 – Wireless LAN Protocols" },

  // Topic 8 – IEEE 802.11 MAC Sublayer Protocol
  "wifi-mac-sublayer": { chapNum: 8, chapTitle: "Topic 8 – IEEE 802.11 MAC Sublayer Protocol" },
  "u2-ieee-802-11-architecture": { chapNum: 8, chapTitle: "Topic 8 – IEEE 802.11 MAC Sublayer Protocol" },
  "u2-ieee-802-11-dcf": { chapNum: 8, chapTitle: "Topic 8 – IEEE 802.11 MAC Sublayer Protocol" },
  "u2-ieee-802-11-pcf": { chapNum: 8, chapTitle: "Topic 8 – IEEE 802.11 MAC Sublayer Protocol" },
  "u2-ieee-802-11-csma-ca": { chapNum: 8, chapTitle: "Topic 8 – IEEE 802.11 MAC Sublayer Protocol" },
  "u2-ieee-802-11-ifs": { chapNum: 8, chapTitle: "Topic 8 – IEEE 802.11 MAC Sublayer Protocol" },
  "u2-rts-cts-mechanism": { chapNum: 8, chapTitle: "Topic 8 – IEEE 802.11 MAC Sublayer Protocol" },
  "u2-network-allocation-vector": { chapNum: 8, chapTitle: "Topic 8 – IEEE 802.11 MAC Sublayer Protocol" },
  "u2-ieee-802-11-frame-formats": { chapNum: 8, chapTitle: "Topic 8 – IEEE 802.11 MAC Sublayer Protocol" },
  "u2-dcf-vs-pcf": { chapNum: 8, chapTitle: "Topic 8 – IEEE 802.11 MAC Sublayer Protocol" },

  // Topic 9 – Data Link Layer Switching
  "dll-switching": { chapNum: 9, chapTitle: "Topic 9 – Data Link Layer Switching" },
  "u2-bridges-overview": { chapNum: 9, chapTitle: "Topic 9 – Data Link Layer Switching" },
  "u2-transparent-bridges": { chapNum: 9, chapTitle: "Topic 9 – Data Link Layer Switching" },
  "u2-learning-bridges": { chapNum: 9, chapTitle: "Topic 9 – Data Link Layer Switching" },
  "u2-bridge-learning-process": { chapNum: 9, chapTitle: "Topic 9 – Data Link Layer Switching" },
  "u2-forwarding-and-filtering": { chapNum: 9, chapTitle: "Topic 9 – Data Link Layer Switching" },
  "u2-bridge-flooding": { chapNum: 9, chapTitle: "Topic 9 – Data Link Layer Switching" },
  "u2-spanning-tree-protocol": { chapNum: 9, chapTitle: "Topic 9 – Data Link Layer Switching" },
  "u2-bridges-vs-switches": { chapNum: 9, chapTitle: "Topic 9 – Data Link Layer Switching" },
  "vlan": { chapNum: 9, chapTitle: "Topic 9 – Data Link Layer Switching" },

  // Topic 10 – Networking Devices
  "network-devices": { chapNum: 10, chapTitle: "Topic 10 – Networking Devices" },
  "u2-networking-device-repeaters": { chapNum: 10, chapTitle: "Topic 10 – Networking Devices" },
  "u2-networking-device-hubs": { chapNum: 10, chapTitle: "Topic 10 – Networking Devices" },
  "u2-networking-device-bridges": { chapNum: 10, chapTitle: "Topic 10 – Networking Devices" },
  "u2-networking-device-switches": { chapNum: 10, chapTitle: "Topic 10 – Networking Devices" },
  "u2-networking-device-routers": { chapNum: 10, chapTitle: "Topic 10 – Networking Devices" },
  "u2-networking-device-gateways": { chapNum: 10, chapTitle: "Topic 10 – Networking Devices" },
  "u2-device-working-principles": { chapNum: 10, chapTitle: "Topic 10 – Networking Devices" },
  "u2-comparison-networking-devices": { chapNum: 10, chapTitle: "Topic 10 – Networking Devices" },
  "u2-device-osi-layers": { chapNum: 10, chapTitle: "Topic 10 – Networking Devices" },
  "arp": { chapNum: 10, chapTitle: "Topic 10 – Networking Devices" },

  // Topic 11 – Revision and Assessment
  "u2-definitions-terminology": { chapNum: 11, chapTitle: "Topic 11 – Revision and Assessment" },
  "u2-important-diagrams": { chapNum: 11, chapTitle: "Topic 11 – Revision and Assessment" },
  "u2-comparison-tables": { chapNum: 11, chapTitle: "Topic 11 – Revision and Assessment" },
  "u2-numerical-problems": { chapNum: 11, chapTitle: "Topic 11 – Revision and Assessment" },
  "u2-protocol-examples": { chapNum: 11, chapTitle: "Topic 11 – Revision and Assessment" },
  "u2-short-answer-questions": { chapNum: 11, chapTitle: "Topic 11 – Revision and Assessment" },
  "u2-long-answer-questions": { chapNum: 11, chapTitle: "Topic 11 – Revision and Assessment" },
  "u2-important-exam-questions": { chapNum: 11, chapTitle: "Topic 11 – Revision and Assessment" },
  "u2-mcqs": { chapNum: 11, chapTitle: "Topic 11 – Revision and Assessment" },
  "u2-practice-test": { chapNum: 11, chapTitle: "Topic 11 – Revision and Assessment" },

  // Unit 3: Master Pedagogical Hierarchy Mapping from Syllabus PDF
  // Topic 1 – IP Addresses (IPv4 and IPv6)
  "ip-addressing": { chapNum: 1, chapTitle: "Topic 1 – IP Addresses (IPv4 and IPv6)" },
  "ipv4": { chapNum: 1, chapTitle: "Topic 1 – IP Addresses (IPv4 and IPv6)" },
  "ipv4-protocol": { chapNum: 1, chapTitle: "Topic 1 – IP Addresses (IPv4 and IPv6)" },
  "subnetting": { chapNum: 1, chapTitle: "Topic 1 – IP Addresses (IPv4 and IPv6)" },
  "ipv6": { chapNum: 1, chapTitle: "Topic 1 – IP Addresses (IPv4 and IPv6)" },
  "ipv6-protocol": { chapNum: 1, chapTitle: "Topic 1 – IP Addresses (IPv4 and IPv6)" },
  "ipv4-vs-ipv6": { chapNum: 1, chapTitle: "Topic 1 – IP Addresses (IPv4 and IPv6)" },
  "nat": { chapNum: 1, chapTitle: "Topic 1 – IP Addresses (IPv4 and IPv6)" },

  // Topic 2 – Internetworking
  "internetworking": { chapNum: 2, chapTitle: "Topic 2 – Internetworking" },
  "internetwork-routing": { chapNum: 2, chapTitle: "Topic 2 – Internetworking" },
  "tunneling": { chapNum: 2, chapTitle: "Topic 2 – Internetworking" },

  // Topic 3 – Routing Algorithms
  "optimality-principle": { chapNum: 3, chapTitle: "Topic 3 – Routing Algorithms" },
  "routing-design-issues": { chapNum: 3, chapTitle: "Topic 3 – Routing Algorithms" },
  "network-layer": { chapNum: 3, chapTitle: "Topic 3 – Routing Algorithms" },
  "forwarding": { chapNum: 3, chapTitle: "Topic 3 – Routing Algorithms" },
  "routing": { chapNum: 3, chapTitle: "Topic 3 – Routing Algorithms" },
  "dijkstra": { chapNum: 3, chapTitle: "Topic 3 – Routing Algorithms" },
  "shortest-path-algorithm": { chapNum: 3, chapTitle: "Topic 3 – Routing Algorithms" },
  "flooding": { chapNum: 3, chapTitle: "Topic 3 – Routing Algorithms" },

  // Topic 4 – Distance Vector and Link State Routing
  "distance-vector": { chapNum: 4, chapTitle: "Topic 4 – Distance Vector and Link State Routing" },
  "distance-vector-routing": { chapNum: 4, chapTitle: "Topic 4 – Distance Vector and Link State Routing" },
  "link-state-routing": { chapNum: 4, chapTitle: "Topic 4 – Distance Vector and Link State Routing" },
  "routing-table-updates": { chapNum: 4, chapTitle: "Topic 4 – Distance Vector and Link State Routing" },
  "comparison-dv-ls": { chapNum: 4, chapTitle: "Topic 4 – Distance Vector and Link State Routing" },
  "count-to-infinity": { chapNum: 4, chapTitle: "Topic 4 – Distance Vector and Link State Routing" },
  "ospf": { chapNum: 4, chapTitle: "Topic 4 – Distance Vector and Link State Routing" },
  "bgp": { chapNum: 4, chapTitle: "Topic 4 – Distance Vector and Link State Routing" },
  "sdn": { chapNum: 4, chapTitle: "Topic 4 – Distance Vector and Link State Routing" },

  // Topic 5 – Congestion Control Approaches
  "traffic-aware-routing": { chapNum: 5, chapTitle: "Topic 5 – Congestion Control Approaches" },
  "congestion-control": { chapNum: 5, chapTitle: "Topic 5 – Congestion Control Approaches" },
  "admission-control": { chapNum: 5, chapTitle: "Topic 5 – Congestion Control Approaches" },
  "traffic-throttling": { chapNum: 5, chapTitle: "Topic 5 – Congestion Control Approaches" },
  "load-shedding": { chapNum: 5, chapTitle: "Topic 5 – Congestion Control Approaches" }
};

var TopicPageEngine = {
  renderTopicPage: function(topicId, container) {
    const topic = TOPIC_REPOSITORY[topicId];
    if (!topic) {
      container.innerHTML = `
        <div class="study-card" style="text-align: center; padding: 3rem 1.5rem;">
          <h3 style="color: #ef4444; margin-bottom: 1rem;">Topic Not Found</h3>
          <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">The topic with ID "<code>${topicId}</code>" could not be located in the encyclopedia database.</p>
          <button class="sim-btn" onclick="App.loadView('notebook')">Browse All Topics →</button>
        </div>
      `;
      return;
    }

    const prevTopic = topic.prevTopicId ? TOPIC_REPOSITORY[topic.prevTopicId] : null;
    const nextTopic = topic.nextTopicId ? TOPIC_REPOSITORY[topic.nextTopicId] : null;
    const isCompleted = typeof completedTopics !== 'undefined' && Array.isArray(completedTopics) && completedTopics.includes(topicId);

    // Build Infobox Prerequisites & Related Links
    const prereqLinks = (topic.infobox.prerequisites || []).map(pId => {
      const p = TOPIC_REPOSITORY[pId];
      if (p) return `<a class="wiki-link" onclick="App.loadTopic('${p.id}')">${p.title}</a>`;
      return pId;
    }).join(", ");

    const relatedLinks = (topic.infobox.relatedConcepts || []).map(rId => {
      const r = TOPIC_REPOSITORY[rId];
      if (r) return `<a class="wiki-link" onclick="App.loadTopic('${r.id}')">${r.title}</a>`;
      return rId;
    }).join(", ");

    const compareLinks = (topic.infobox.compareWith || []).map(cKey => {
      if (typeof COMPARISONS_DATA !== 'undefined' && COMPARISONS_DATA[cKey]) {
        return `<a class="wiki-link" onclick="App.loadComparison('${cKey}')">${COMPARISONS_DATA[cKey].title}</a>`;
      }
      return cKey;
    }).join(", ");

    const primaryUsesList = (topic.infobox.primaryUses || []).map(u => `<li>${u}</li>`).join("");
    const whereUsedList = (topic.sections.whereUsed || []).map(u => `<li>✨ ${u}</li>`).join("");

    const referencesList = (topic.sections.references || []).map((ref, idx) => `
      <li class="ref-item">
        <span class="ref-num">[${idx + 1}]</span>
        <span class="ref-text">${ref.cite}</span>
        ${ref.url ? `<a href="${ref.url}" target="_blank" class="ref-link">Source ↗</a>` : ''}
      </li>
    `).join("");

    // Build interactive simulation embed if available
    let labEmbedHtml = "";
    if (topic.sections.interactiveLabKey) {
      labEmbedHtml = TopicPageEngine.getLabEmbedHtml(topic.sections.interactiveLabKey, topic);
    }

    // Build Prerequisites Table if present
    let prereqTableHtml = "";
    if (topic.prerequisitesList && topic.prerequisitesList.length) {
      prereqTableHtml = `
        <div class="wiki-prereq-box mb-6 bg-white dark:bg-gray-800 p-4 rounded-xl border border-blue-200 dark:border-blue-900 shadow-sm">
          <div class="flex items-center space-x-2 text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider mb-2">
            <i class="fa-solid fa-list-check"></i>
            <span>Essential Prerequisites</span>
          </div>
          <table class="wiki-table w-full text-xs">
            <thead>
              <tr class="bg-blue-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
                <th style="width: 25%;">Concept</th>
                <th>Meaning & Requirement</th>
              </tr>
            </thead>
            <tbody>
              ${topic.prerequisitesList.map(item => `
                <tr>
                  <td class="font-bold text-gray-900 dark:text-white">${item.concept}</td>
                  <td>${item.meaning}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `;
    }

    // Build Learning Objectives if present
    let learningObjectivesHtml = "";
    if (topic.learningObjectives && topic.learningObjectives.length) {
      learningObjectivesHtml = `
        <div class="wiki-callout note mb-6">
          <div class="callout-header"><i class="fa-solid fa-bullseye text-gfg-green mr-1"></i> Learning Objectives</div>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">By the end of this lesson, you will be able to:</p>
          <ul class="list-disc pl-5 space-y-1 text-xs">
            ${topic.learningObjectives.map(obj => `<li>${obj}</li>`).join("")}
          </ul>
        </div>
      `;
    }

    // Build Worked Examples: either 3-Level Progressive or Single
    let workedExamplesHtml = "";
    if (topic.sections.workedExamples) {
      const we = topic.sections.workedExamples;
      workedExamplesHtml = `
        <div class="progressive-examples-wrapper">
          <div class="flex space-x-2 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
            <button id="tab-btn-lvl1-${topic.id}" class="px-3 py-1.5 text-xs font-bold rounded-lg bg-blue-600 text-white shadow-sm transition-all" onclick="TopicPageEngine.switchExampleLevel('${topic.id}', 'lvl1')">
              Level 1: Beginner (Understand)
            </button>
            <button id="tab-btn-lvl2-${topic.id}" class="px-3 py-1.5 text-xs font-bold rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 transition-all" onclick="TopicPageEngine.switchExampleLevel('${topic.id}', 'lvl2')">
              Level 2: Intermediate (Apply)
            </button>
            <button id="tab-btn-lvl3-${topic.id}" class="px-3 py-1.5 text-xs font-bold rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 transition-all" onclick="TopicPageEngine.switchExampleLevel('${topic.id}', 'lvl3')">
              Level 3: Advanced (Analyze)
            </button>
          </div>
          
          <div id="tab-content-lvl1-${topic.id}" class="worked-example-box blue">
            <div class="example-title">🌱 Level 1: Conceptual Understanding</div>
            <div class="text-xs leading-relaxed">${we.level1}</div>
          </div>

          <div id="tab-content-lvl2-${topic.id}" class="worked-example-box green hidden">
            <div class="example-title">⚙️ Level 2: Numerical Calculation & Step-by-Step Working</div>
            <div class="text-xs leading-relaxed">${we.level2}</div>
          </div>

          <div id="tab-content-lvl3-${topic.id}" class="worked-example-box purple hidden">
            <div class="example-title">🔬 Level 3: Protocol Analysis & Failure Recovery</div>
            <div class="text-xs leading-relaxed">${we.level3}</div>
          </div>
        </div>
      `;
    } else if (topic.sections.workedExample) {
      workedExamplesHtml = `
        <div class="worked-example-box blue">
          <div class="example-title">📝 Step-by-Step Walkthrough</div>
          <div class="text-xs leading-relaxed">${topic.sections.workedExample}</div>
        </div>
      `;
    }

    // Build Quiz Section: Multi-question bank or single practice
    let quizSectionHtml = "";
    if (topic.sections.quiz && topic.sections.quiz.length) {
      quizSectionHtml = `
        <div class="quiz-container bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div class="flex items-center justify-between pb-3 mb-4 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h3 class="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                <i class="fa-solid fa-graduation-cap text-gfg-green"></i>
                Interactive Knowledge Check (${topic.sections.quiz.length} Questions)
              </h3>
              <p class="text-[11px] text-gray-500">Test your mastery before advancing. Immediate feedback with detailed explanations.</p>
            </div>
            <div id="quiz-score-${topic.id}" class="text-xs font-mono font-bold bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-gray-700 dark:text-gray-300">
              0 / ${topic.sections.quiz.length} Answered
            </div>
          </div>

          <div class="space-y-6">
            ${topic.sections.quiz.map((q, qIdx) => `
              <div class="quiz-item p-3.5 rounded-lg bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800">
                <div class="font-semibold text-xs text-gray-900 dark:text-white mb-2">
                  <span class="text-gfg-green font-bold mr-1">Q${qIdx + 1}.</span> ${q.question}
                </div>
                <div class="space-y-1.5">
                  ${q.options.map((opt, oIdx) => `
                    <label class="flex items-start space-x-2.5 p-2 rounded cursor-pointer hover:bg-white dark:hover:bg-gray-800 transition-colors text-xs text-gray-700 dark:text-gray-300">
                      <input type="radio" name="topic_quiz_${topic.id}_${qIdx}" value="${oIdx}" class="mt-0.5 text-gfg-green focus:ring-gfg-green">
                      <span>${opt}</span>
                    </label>
                  `).join("")}
                </div>
                <div id="quiz-feedback-${topic.id}-${qIdx}" class="mt-2.5 p-2.5 rounded text-xs leading-relaxed hidden"></div>
              </div>
            `).join("")}
          </div>

          <div class="mt-5 flex gap-3 items-center">
            <button class="sim-btn" onclick="TopicPageEngine.checkTopicQuiz('${topic.id}')">
              <i class="fa-solid fa-check-circle mr-1"></i> Check All Answers
            </button>
            <button class="sim-btn secondary" onclick="TopicPageEngine.resetTopicQuiz('${topic.id}')">
              <i class="fa-solid fa-rotate-left mr-1"></i> Reset Quiz
            </button>
          </div>
        </div>
      `;
    } else if (topic.sections.practice) {
      quizSectionHtml = `
        <div class="practice-interactive-card">
          <div class="practice-q-text">
            <strong>Question:</strong> ${topic.sections.practice.question}
          </div>
          <div class="practice-options-list">
            ${topic.sections.practice.choices.map((opt, oIdx) => `
              <label class="practice-opt-label">
                <input type="radio" name="practice_q_${topic.id}" value="${oIdx}">
                <span>${opt}</span>
              </label>
            `).join("")}
          </div>
          <div style="margin-top: 1.25rem; display: flex; gap: 0.75rem; align-items: center;">
            <button class="sim-btn" onclick="TopicPageEngine.checkPracticeAnswer('${topic.id}', ${topic.sections.practice.correctIndex})">
              Check Answer
            </button>
            <button class="sim-btn secondary" onclick="TopicPageEngine.togglePracticeExplanation('${topic.id}')">
              Show Solution & Explanation
            </button>
          </div>
          <div id="practice-feedback-${topic.id}" class="practice-feedback-box" style="display: none;">
            <div id="practice-status-${topic.id}" style="font-weight: 800; margin-bottom: 0.5rem;"></div>
            <p>${topic.sections.practice.explanation}</p>
          </div>
        </div>
      `;
    }

    // Universal Wikipedia Topic Template HTML
    container.innerHTML = `
      <article class="wiki-article-container" id="wiki-top">
        
        <!-- Breadcrumbs Navigation -->
        <nav class="wiki-breadcrumbs">
          <a onclick="App.loadView('home')">Home</a>
          <span class="bc-sep">/</span>
          <a onclick="App.loadView('${topic.unitId}')">${topic.unit}</a>
          ${TOPIC_CHAPTER_MAP[topic.id] ? `
            <span class="bc-sep">/</span>
            <span class="cursor-pointer text-blue-600 dark:text-blue-400 font-semibold hover:underline" onclick="App.loadView('${topic.unitId}')">${TOPIC_CHAPTER_MAP[topic.id].chapTitle}</span>
          ` : ''}
          <span class="bc-sep">/</span>
          <span class="bc-current">${topic.title}</span>
        </nav>

        <!-- Article Header -->
        <header class="wiki-article-header">
          <div class="wiki-header-meta">
            <span class="wiki-badge-unit">${topic.unit}</span>
            <span class="wiki-badge-level">${topic.level}</span>
            <span class="badge-difficulty ${(topic.difficulty || 'Core').toLowerCase()}">${topic.difficulty || 'Core'}</span>
            <span class="wiki-read-time">⏱️ ${topic.readingTime}</span>
            ${topic.standard ? `<span class="wiki-badge-standard">📜 ${topic.standard}</span>` : ''}
          </div>

          <h1 class="wiki-article-title">${topic.title}</h1>
          <p class="wiki-article-tagline">${topic.oneLiner}</p>

          <!-- Quick Action Bar -->
          <div class="wiki-quick-actions">
            <button class="wiki-action-btn active" onclick="document.getElementById('sec-overview').scrollIntoView({behavior: 'smooth'})">
              📖 Overview
            </button>
            ${topic.sections.interactiveLabKey ? `
              <button class="wiki-action-btn lab-btn" onclick="document.getElementById('sec-lab').scrollIntoView({behavior: 'smooth'})">
                🧪 Interactive Lab
              </button>
            ` : ''}
            ${topic.sections.compareWith ? `
              <button class="wiki-action-btn compare-btn" onclick="document.getElementById('sec-comparison').scrollIntoView({behavior: 'smooth'})">
                ⚖️ Compare
              </button>
            ` : ''}
            <button class="wiki-action-btn" onclick="document.getElementById('sec-practice').scrollIntoView({behavior: 'smooth'})">
              🎯 Knowledge Check
            </button>
            <button id="toggle-complete-btn-${topic.id}" class="wiki-action-btn ${isCompleted ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-gray-100 text-gray-700 hover:bg-emerald-50 dark:bg-gray-800 dark:text-gray-300'}" onclick="TopicPageEngine.handleToggleComplete('${topic.id}')" title="Mark this lesson completed">
              ${isCompleted ? '✅ Completed' : '⭕ Mark as Complete'}
            </button>
            <button class="wiki-action-btn secondary" onclick="App.loadView('${topic.unitId}')">
              ⬅ Back to ${topic.unit.split(':')[0]}
            </button>
          </div>
        </header>

        <!-- Main Body Grid: Article Content + Floating Infobox -->
        <div class="wiki-body-layout">
          
          <!-- LEFT / MAIN COLUMN -->
          <div class="wiki-main-column">
            
            <!-- Lead Section -->
            <div class="wiki-lead-section">
              <p class="wiki-lead-text">
                In computer networking, <strong>${topic.title}</strong> is ${topic.sections.overview}
              </p>
              
              <div class="wiki-callout note">
                <div class="callout-header">💡 Quick Answer</div>
                <p>${topic.quickAnswer}</p>
              </div>

              <div class="wiki-callout info">
                <div class="callout-header">🎯 Motivation & Problem Solved</div>
                <p>${topic.whyItMatters}</p>
              </div>

              ${topic.sections.eli10 ? `
                <div class="wiki-callout eli10 bg-amber-50 dark:bg-amber-950/40 border-l-4 border-amber-500 p-4 rounded-r-lg mb-4 text-xs">
                  <div class="callout-header text-amber-800 dark:text-amber-300 font-bold mb-1 flex items-center gap-1.5">
                    <span>🎈 Explain Like I'm 10 (ELI10)</span>
                  </div>
                  <p class="text-amber-900 dark:text-amber-200 leading-relaxed">${topic.sections.eli10}</p>
                </div>
              ` : ''}

              ${topic.sections.analogy ? `
                <div class="wiki-callout analogy bg-emerald-50 dark:bg-emerald-950/40 border-l-4 border-emerald-500 p-4 rounded-r-lg mb-4 text-xs">
                  <div class="callout-header text-emerald-800 dark:text-emerald-300 font-bold mb-1 flex items-center gap-1.5">
                    <span>🚚 Real-World Analogy</span>
                  </div>
                  <p class="text-emerald-900 dark:text-emerald-200 leading-relaxed">${topic.sections.analogy}</p>
                </div>
              ` : ''}
            </div>

            <!-- Prerequisites & Learning Objectives -->
            ${prereqTableHtml}
            ${learningObjectivesHtml}

            <!-- Wikipedia Table of Contents Box -->
            <div class="wiki-toc-box">
              <div class="wiki-toc-header">
                <span class="toc-title">Contents</span>
                <button class="toc-toggle-btn" onclick="TopicPageEngine.toggleTOC(this)">[hide]</button>
              </div>
              <ol class="wiki-toc-list" id="wiki-toc-content">
                <li><a href="#sec-overview">1. Overview & Technical Definition</a></li>
                <li><a href="#sec-how-it-works">2. Step-by-Step Working & Protocol Rules</a></li>
                <li><a href="#sec-diagram">3. Architecture Diagram</a></li>
                ${topic.sections.interactiveLabKey ? `<li><a href="#sec-lab">4. Interactive Simulation Lab</a></li>` : ''}
                <li><a href="#sec-technical">5. Technical Details, Algorithms & Formulas</a></li>
                <li><a href="#sec-worked-example">6. Worked Examples (Progressive Difficulty)</a></li>
                <li><a href="#sec-advantages">7. Advantages, Disadvantages & Limitations</a></li>
                <li><a href="#sec-applications">8. Real-World Applications & Industry Standards</a></li>
                <li><a href="#sec-common-mistakes">9. Common Misconceptions & Exam Traps</a></li>
                ${topic.sections.compareWith ? `<li><a href="#sec-comparison">10. Comparison With Related Concepts</a></li>` : ''}
                <li><a href="#sec-practice">11. Interactive Practice Quiz & Self-Assessment</a></li>
                <li><a href="#sec-references">12. Authoritative References & Next Steps</a></li>
              </ol>
            </div>

            <!-- SECTION 1: OVERVIEW & TECHNICAL DEFINITION -->
            <section class="wiki-section" id="sec-overview">
              <h2 class="wiki-section-heading">1. Overview & Technical Definition</h2>
              <div class="wiki-section-body">
                ${topic.sections.overview}
              </div>
            </section>

            <!-- SECTION 2: HOW IT WORKS -->
            <section class="wiki-section" id="sec-how-it-works">
              <h2 class="wiki-section-heading">2. Step-by-Step Working & Protocol Rules</h2>
              <div class="wiki-section-body">
                ${topic.sections.howItWorks}
              </div>
            </section>

            <!-- SECTION 3: ARCHITECTURE DIAGRAM -->
            <section class="wiki-section" id="sec-diagram">
              <h2 class="wiki-section-heading">3. Architecture Diagram & Visual Schematic</h2>
              <div class="wiki-section-body space-y-4">
                ${(topic.sections?.imageUrl || topic.imageUrl) ? `
                  <div class="wiki-img-container mb-4 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm p-4 flex flex-col items-center transition-all hover:shadow-md">
                    <div class="w-full flex items-center justify-between pb-2 mb-2 border-b border-gray-100 dark:border-gray-800 text-[10px] text-gray-500 font-mono">
                      <span class="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">
                        <i class="fa-solid fa-network-wired"></i> Architecture Illustration
                      </span>
                      <a href="${topic.sections?.imageUrl || topic.imageUrl}" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-blue-500 flex items-center gap-1 transition-colors" title="Open full resolution in new tab">
                        <span>Full Res</span>
                        <i class="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
                      </a>
                    </div>
                    <div class="relative w-full flex items-center justify-center p-3 bg-slate-50/70 dark:bg-slate-950/50 rounded-lg overflow-hidden group">
                      <img src="${topic.sections?.imageUrl || topic.imageUrl}" 
                           alt="${topic.title} Architecture Diagram" 
                           loading="lazy" 
                           referrerpolicy="no-referrer"
                           class="max-w-full h-auto max-h-[460px] object-contain rounded cursor-pointer transition-transform duration-300 group-hover:scale-[1.01]"
                           onclick="window.open('${topic.sections?.imageUrl || topic.imageUrl}', '_blank')"
                           onerror="this.onerror=null; this.closest('.wiki-img-container').classList.add('hidden');" />
                    </div>
                    ${(topic.sections?.imageCaption || topic.imageCaption) ? `
                      <p class="text-xs text-gray-600 dark:text-gray-300 text-center mt-3 font-medium flex items-center justify-center gap-1.5 px-3">
                        <i class="fa-solid fa-circle-info text-blue-500 text-[11px] shrink-0"></i>
                        <span>${topic.sections?.imageCaption || topic.imageCaption}</span>
                      </p>
                    ` : ''}
                  </div>
                ` : ''}

                <!-- Clean Modern Architecture Diagram (Replaces ASCII/symbols art) -->
                ${(typeof CleanDiagramEngine !== 'undefined' ? CleanDiagramEngine.getDiagramHtml(topic) : (typeof window !== 'undefined' && window.CleanDiagramEngine ? window.CleanDiagramEngine.getDiagramHtml(topic) : ''))}
              </div>
            </section>

            <!-- SECTION 4: INTERACTIVE LAB (If applicable) -->
            ${topic.sections.interactiveLabKey ? `
              <section class="wiki-section" id="sec-lab">
                <h2 class="wiki-section-heading">4. Interactive Simulation Lab</h2>
                <div class="wiki-section-body">
                  ${labEmbedHtml}
                </div>
              </section>
            ` : ''}

            <!-- SECTION 5: TECHNICAL DETAILS & FORMULAS -->
            <section class="wiki-section" id="sec-technical">
              <h2 class="wiki-section-heading">5. Technical Details, Algorithms & Formal Formulas</h2>
              <div class="wiki-section-body">
                ${topic.sections.technicalDetails}
              </div>
            </section>

            <!-- SECTION 6: WORKED EXAMPLE -->
            <section class="wiki-section" id="sec-worked-example">
              <h2 class="wiki-section-heading">6. Worked Examples (Progressive Difficulty)</h2>
              <div class="wiki-section-body">
                ${workedExamplesHtml}
              </div>
            </section>

            <!-- SECTION 7: ADVANTAGES & LIMITATIONS -->
            <section class="wiki-section" id="sec-advantages">
              <h2 class="wiki-section-heading">7. Advantages, Disadvantages & Limitations</h2>
              <div class="wiki-section-body">
                ${topic.sections.advantagesLimitations}
              </div>
            </section>

            <!-- SECTION 8: APPLICATIONS -->
            <section class="wiki-section" id="sec-applications">
              <h2 class="wiki-section-heading">8. Real-World Applications ("Where Is This Used?")</h2>
              <div class="wiki-section-body">
                <ul class="wiki-bullet-list">
                  ${whereUsedList}
                </ul>
              </div>
            </section>

            <!-- SECTION 9: COMMON MISTAKES -->
            <section class="wiki-section" id="sec-common-mistakes">
              <h2 class="wiki-section-heading">9. Common Misconceptions & Exam Traps</h2>
              <div class="wiki-section-body">
                <div class="wiki-callout warning">
                  <div class="callout-header">⚠️ Warning / Common Misconceptions</div>
                  <div>${topic.sections.commonMistakes}</div>
                </div>
              </div>
            </section>

            <!-- SECTION 10: COMPARISON (If available) -->
            ${topic.sections.compareWith ? `
              <section class="wiki-section" id="sec-comparison">
                <h2 class="wiki-section-heading">10. Compare With Related Concepts</h2>
                <div class="wiki-section-body">
                  <div class="comparison-teaser-card">
                    <div class="comp-teaser-header">
                      <h4>⚖️ ${topic.sections.compareWith.title}</h4>
                      <span class="badge" style="background: #e0f2fe; color: #0284c7; font-weight: 700;">Deep Comparison</span>
                    </div>
                    <p style="color: var(--text-secondary); margin-bottom: 1rem;">${topic.sections.compareWith.note}</p>
                    ${topic.infobox.compareWith && topic.infobox.compareWith.length ? `
                      <button class="sim-btn secondary" onclick="App.loadComparison('${topic.infobox.compareWith[0]}')">
                        Open Side-by-Side Comparison Matrix →
                      </button>
                    ` : ''}
                  </div>
                </div>
              </section>
            ` : ''}

            <!-- SECTION 11: PRACTICE QUIZ -->
            <section class="wiki-section" id="sec-practice">
              <h2 class="wiki-section-heading">11. Interactive Practice Quiz & Self-Assessment</h2>
              <div class="wiki-section-body">
                ${quizSectionHtml}
              </div>
            </section>

            <!-- SECTION 12: REFERENCES & NEXT STEPS -->
            <section class="wiki-section" id="sec-references">
              <h2 class="wiki-section-heading">12. Authoritative References & Citations</h2>
              <div class="wiki-section-body">
                <ol class="wiki-references-list">
                  ${referencesList}
                </ol>
                ${topic.nextTopicId && TOPIC_REPOSITORY[topic.nextTopicId] ? `
                  <div class="mt-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 border border-blue-200 dark:border-blue-900 flex items-center justify-between">
                    <div>
                      <div class="text-[10px] uppercase tracking-wider text-blue-600 font-bold">Recommended Next Lesson</div>
                      <div class="font-bold text-sm text-gray-900 dark:text-white">${TOPIC_REPOSITORY[topic.nextTopicId].title}</div>
                    </div>
                    <button class="sim-btn" onclick="App.loadTopic('${topic.nextTopicId}')">
                      Proceed to Lesson →
                    </button>
                  </div>
                ` : ''}
              </div>
            </section>

            <!-- Lesson Completion Banner -->
            <div class="completion-banner my-8 p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-r from-emerald-50/60 to-blue-50/60 dark:from-gray-800 dark:to-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full flex items-center justify-center text-lg ${isCompleted ? 'bg-emerald-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}">
                  <i class="fa-solid ${isCompleted ? 'fa-check' : 'fa-graduation-cap'}"></i>
                </div>
                <div>
                  <h4 class="font-bold text-sm text-gray-900 dark:text-white">
                    ${isCompleted ? 'Lesson Mastered!' : 'Finished Reading & Practicing?'}
                  </h4>
                  <p class="text-xs text-gray-600 dark:text-gray-300">
                    ${isCompleted ? 'You have marked this lesson as complete. Click below if you want to revise again later.' : 'Track your academic syllabus progress by marking this topic complete.'}
                  </p>
                </div>
              </div>
              <button id="toggle-complete-footer-btn-${topic.id}" class="px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm ${isCompleted ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-gfg-green text-white hover:bg-gfg-dark'}" onclick="TopicPageEngine.handleToggleComplete('${topic.id}')">
                <i class="fa-solid ${isCompleted ? 'fa-check-circle' : 'fa-circle-check'} mr-1.5"></i>
                ${isCompleted ? 'Marked Completed (Undo)' : 'Mark Topic as Completed'}
              </button>
            </div>

            <!-- BOTTOM PAGINATION: PREV & NEXT TOPIC -->
            <nav class="wiki-pager-nav">
              ${prevTopic ? `
                <div class="wiki-pager-card prev" onclick="App.loadTopic('${prevTopic.id}')">
                  <span class="pager-label">← Previous Topic</span>
                  <span class="pager-title">${prevTopic.title}</span>
                </div>
              ` : `<div></div>`}
              
              ${nextTopic ? `
                <div class="wiki-pager-card next" onclick="App.loadTopic('${nextTopic.id}')">
                  <span class="pager-label">Next Topic →</span>
                  <span class="pager-title">${nextTopic.title}</span>
                </div>
              ` : `<div></div>`}
            </nav>

          </div>

          <!-- RIGHT COLUMN: WIKIPEDIA INFOBOX -->
          <aside class="wiki-infobox-column">
            <div class="wiki-infobox">
              <div class="infobox-header">
                <h3>${topic.title}</h3>
                <div class="infobox-sub">${topic.unit.split(':')[0]}</div>
              </div>
              <table class="infobox-table">
                <tbody>
                  <tr>
                    <th>OSI / Stack Layer</th>
                    <td>${topic.infobox.layer}</td>
                  </tr>
                  <tr>
                    <th>Standardization</th>
                    <td>${topic.infobox.standard}</td>
                  </tr>
                  <tr>
                    <th>Architecture</th>
                    <td>${topic.infobox.type}</td>
                  </tr>
                  ${topic.infobox.keyFormula ? `
                    <tr>
                      <th>Key Formula</th>
                      <td><code>$${topic.infobox.keyFormula}$</code></td>
                    </tr>
                  ` : ''}
                  <tr>
                    <th>Prerequisites</th>
                    <td>${prereqLinks || 'None'}</td>
                  </tr>
                  <tr>
                    <th>Related Topics</th>
                    <td>${relatedLinks || 'None'}</td>
                  </tr>
                  ${compareLinks ? `
                    <tr>
                      <th>Compare With</th>
                      <td>${compareLinks}</td>
                    </tr>
                  ` : ''}
                  <tr>
                    <th>Primary Usage</th>
                    <td><ul style="padding-left: 1rem; margin: 0; font-size: 0.82rem;">${primaryUsesList}</ul></td>
                  </tr>
                </tbody>
              </table>
              <div class="infobox-footer">
                <span>Computer Networks Encyclopedia</span>
              </div>
            </div>
          </aside>

        </div>

      </article>
    `;

    // Initialize interactive simulator scripts if needed
    if (topic.sections.interactiveLabKey) {
      setTimeout(() => {
        TopicPageEngine.initLab(topic.sections.interactiveLabKey);
      }, 50);
    }
  },

  handleToggleComplete: function(topicId) {
    let completed = false;
    if (typeof toggleTopicCompleted === 'function') {
      completed = toggleTopicCompleted(topicId);
    } else {
      let completedTopics = JSON.parse(localStorage.getItem('gfg_completed_topics') || '[]');
      const idx = completedTopics.indexOf(topicId);
      if (idx === -1) {
        completedTopics.push(topicId);
        completed = true;
      } else {
        completedTopics.splice(idx, 1);
        completed = false;
      }
      localStorage.setItem('gfg_completed_topics', JSON.stringify(completedTopics));
      if (typeof updateProgressDisplay === 'function') updateProgressDisplay();
      if (typeof renderSidebar === 'function') renderSidebar();
    }

    const headerBtn = document.getElementById(`toggle-complete-btn-${topicId}`);
    if (headerBtn) {
      if (completed) {
        headerBtn.className = "wiki-action-btn bg-emerald-600 text-white hover:bg-emerald-700";
        headerBtn.innerHTML = "✅ Completed";
      } else {
        headerBtn.className = "wiki-action-btn bg-gray-100 text-gray-700 hover:bg-emerald-50 dark:bg-gray-800 dark:text-gray-300";
        headerBtn.innerHTML = "⭕ Mark as Complete";
      }
    }

    const footerBtn = document.getElementById(`toggle-complete-footer-btn-${topicId}`);
    if (footerBtn) {
      if (completed) {
        footerBtn.className = "px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm bg-emerald-600 text-white hover:bg-emerald-700";
        footerBtn.innerHTML = '<i class="fa-solid fa-check-circle mr-1.5"></i> Marked Completed (Undo)';
      } else {
        footerBtn.className = "px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm bg-gfg-green text-white hover:bg-gfg-dark";
        footerBtn.innerHTML = '<i class="fa-solid fa-circle-check mr-1.5"></i> Mark Topic as Completed';
      }
    }
  },

  switchExampleLevel: function(topicId, levelId) {
    ['lvl1', 'lvl2', 'lvl3'].forEach(lvl => {
      const btn = document.getElementById(`tab-btn-${lvl}-${topicId}`);
      const box = document.getElementById(`tab-content-${lvl}-${topicId}`);
      if (!btn || !box) return;
      if (lvl === levelId) {
        btn.className = "px-3 py-1.5 text-xs font-bold rounded-lg bg-blue-600 text-white shadow-sm transition-all";
        box.classList.remove('hidden');
      } else {
        btn.className = "px-3 py-1.5 text-xs font-bold rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 transition-all";
        box.classList.add('hidden');
      }
    });
    const container = document.getElementById('sec-worked-example');
    if (container && window.renderMathInElement) {
      renderMathInElement(container, {
        delimiters: [{left: '$', right: '$', display: false}],
        throwOnError: false
      });
    }
  },

  checkTopicQuiz: function(topicId) {
    const topic = TOPIC_REPOSITORY[topicId];
    if (!topic || !topic.sections.quiz) return;

    let score = 0;
    const total = topic.sections.quiz.length;

    topic.sections.quiz.forEach((q, qIdx) => {
      const selected = document.querySelector(`input[name="topic_quiz_${topicId}_${qIdx}"]:checked`);
      const feedbackBox = document.getElementById(`quiz-feedback-${topicId}-${qIdx}`);
      if (!feedbackBox) return;

      feedbackBox.classList.remove('hidden');

      if (!selected) {
        feedbackBox.className = "mt-2.5 p-2.5 rounded text-xs leading-relaxed bg-amber-50 dark:bg-amber-950/40 border border-amber-300 text-amber-800 dark:text-amber-300";
        feedbackBox.innerHTML = `⚠️ <em>Not answered yet.</em> Please select an option above.`;
        return;
      }

      const userAns = parseInt(selected.value);
      if (userAns === q.correctIndex) {
        score++;
        feedbackBox.className = "mt-2.5 p-2.5 rounded text-xs leading-relaxed bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-emerald-800 dark:text-emerald-300";
        feedbackBox.innerHTML = `✅ <strong>Correct!</strong> ${q.explanation}`;
      } else {
        feedbackBox.className = "mt-2.5 p-2.5 rounded text-xs leading-relaxed bg-rose-50 dark:bg-rose-950/40 border border-rose-300 text-rose-800 dark:text-rose-300";
        feedbackBox.innerHTML = `❌ <strong>Incorrect.</strong> Correct answer: <em>${q.options[q.correctIndex]}</em>.<br><span class="text-gray-600 dark:text-gray-300 mt-1 block">${q.explanation}</span>`;
      }
    });

    const scoreBadge = document.getElementById(`quiz-score-${topicId}`);
    if (scoreBadge) {
      scoreBadge.textContent = `Score: ${score} / ${total} (${Math.round((score/total)*100)}%)`;
      if (score === total) {
        scoreBadge.className = "text-xs font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200 px-3 py-1 rounded-full animate-bounce";
      } else {
        scoreBadge.className = "text-xs font-mono font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200 px-3 py-1 rounded-full";
      }
    }
  },

  resetTopicQuiz: function(topicId) {
    const topic = TOPIC_REPOSITORY[topicId];
    if (!topic || !topic.sections.quiz) return;

    topic.sections.quiz.forEach((q, qIdx) => {
      const inputs = document.querySelectorAll(`input[name="topic_quiz_${topicId}_${qIdx}"]`);
      inputs.forEach(inp => inp.checked = false);
      const feedbackBox = document.getElementById(`quiz-feedback-${topicId}-${qIdx}`);
      if (feedbackBox) feedbackBox.classList.add('hidden');
    });

    const scoreBadge = document.getElementById(`quiz-score-${topicId}`);
    if (scoreBadge) {
      scoreBadge.textContent = `0 / ${topic.sections.quiz.length} Answered`;
      scoreBadge.className = "text-xs font-mono font-bold bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-gray-700 dark:text-gray-300";
    }
  },

  toggleTOC: function(btn) {
    const content = document.getElementById('wiki-toc-content');
    if (!content) return;
    if (content.style.display === 'none') {
      content.style.display = 'block';
      btn.innerText = '[hide]';
    } else {
      content.style.display = 'none';
      btn.innerText = '[show]';
    }
  },

  checkPracticeAnswer: function(topicId, correctIdx) {
    const selected = document.querySelector(`input[name="practice_q_${topicId}"]:checked`);
    const feedbackBox = document.getElementById(`practice-feedback-${topicId}`);
    const statusBox = document.getElementById(`practice-status-${topicId}`);
    if (!feedbackBox || !statusBox) return;

    feedbackBox.style.display = 'block';
    if (!selected) {
      statusBox.innerHTML = `<span style="color: #f59e0b;">⚠️ Please select an answer option first!</span>`;
      return;
    }

    if (parseInt(selected.value) === correctIdx) {
      statusBox.innerHTML = `<span style="color: #10b981;">🎉 Correct! Well done.</span>`;
      feedbackBox.style.background = "#f0fdf4";
      feedbackBox.style.borderColor = "#86efac";
    } else {
      statusBox.innerHTML = `<span style="color: #ef4444;">❌ Incorrect. Review the explanation below:</span>`;
      feedbackBox.style.background = "#fff1f2";
      feedbackBox.style.borderColor = "#fecdd3";
    }
  },

  togglePracticeExplanation: function(topicId) {
    const feedbackBox = document.getElementById(`practice-feedback-${topicId}`);
    const statusBox = document.getElementById(`practice-status-${topicId}`);
    if (!feedbackBox) return;
    feedbackBox.style.display = feedbackBox.style.display === 'none' ? 'block' : 'none';
    if (statusBox) statusBox.innerHTML = `<span style="color: #0284c7;">💡 Solution & Explanation:</span>`;
    feedbackBox.style.background = "#f0f9ff";
    feedbackBox.style.borderColor = "#bae6fd";
  },

  // -------------------------------------------------------------
  // INTERACTIVE LAB EMBEDS & LOGIC
  // -------------------------------------------------------------
  getLabEmbedHtml: function(labKey, topic) {
    // 1. HAMMING CODE PLAYGROUND
    if (labKey === 'hamming') {
      return `
        <div class="simulator-shell">
          <div class="sim-header">
            <div class="sim-title">🔬 Interactive Hamming (7,4) Code & Syndrome Explorer</div>
            <div class="sim-controls">
              <button class="sim-btn secondary" onclick="TopicPageEngine.setHammingPreset('1011')">Preset "1011"</button>
              <button class="sim-btn secondary" onclick="TopicPageEngine.setHammingPreset('1100')">Preset "1100"</button>
              <button class="sim-btn secondary" onclick="TopicPageEngine.setHammingPreset('0110')">Preset "0110"</button>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div class="p-3 bg-gray-50 dark:bg-gray-800/80 rounded-lg border border-gray-200 dark:border-gray-700">
              <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Enter 4 Data Bits ($D_1 D_2 D_3 D_4$):</label>
              <div class="flex gap-2">
                <input type="text" id="topic-hamming-data" class="sim-input flex-1" maxlength="4" value="1011" oninput="TopicPageEngine.runHammingEncoder()">
                <button class="sim-btn" onclick="TopicPageEngine.runHammingEncoder()">Encode</button>
              </div>
              <div class="text-[11px] text-gray-500 mt-1">Positions: Pos 3 ($D_1$), Pos 5 ($D_2$), Pos 6 ($D_3$), Pos 7 ($D_4$)</div>
            </div>

            <div class="p-3 bg-gray-50 dark:bg-gray-800/80 rounded-lg border border-gray-200 dark:border-gray-700">
              <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Formula Verification ($2^r \\ge m + r + 1$):</label>
              <div class="text-xs font-mono text-gray-700 dark:text-gray-300">
                Data bits $m = 4$ &rarr; Required parity $r = 3$<br>
                $2^3 = 8 \\ge 4 + 3 + 1 = 8$ <span class="text-emerald-600 font-bold">✓ Satisfied!</span>
              </div>
            </div>
          </div>

          <div id="topic-hamming-interactive-board" class="p-4 bg-slate-900 text-white rounded-xl mb-3">
            <!-- Rendered by runHammingEncoder() -->
          </div>

          <div id="topic-hamming-syndrome-result" class="p-3.5 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-lg text-xs font-mono leading-relaxed">
            <!-- Syndrome calculation text -->
          </div>
        </div>
      `;
    }

    // 2. CRC CALCULATOR
    if (labKey === 'crc') {
      return `
        <div class="simulator-shell">
          <div class="sim-header">
            <div class="sim-title">⚡ Live CRC Modulo-2 XOR Division Calculator & Verifier</div>
            <div class="sim-controls">
              <button class="sim-btn secondary" onclick="TopicPageEngine.setCRCPreset('1101', '1011')">Tanenbaum (1101 / 1011)</button>
              <button class="sim-btn secondary" onclick="TopicPageEngine.setCRCPreset('1101011011', '10011')">Standard 4-bit Gen</button>
              <button class="sim-btn secondary" onclick="TopicPageEngine.setCRCPreset('100100', '1101')">Short Example</button>
            </div>
          </div>
          <div class="sim-input-row">
            <div class="sim-field">
              <label>Dataword (Binary Bits):</label>
              <input type="text" id="topic-crc-data" class="sim-input" value="1101">
            </div>
            <div class="sim-field">
              <label>Generator Polynomial $G(x)$ (Binary):</label>
              <input type="text" id="topic-crc-gen" class="sim-input" value="1011">
            </div>
            <button class="sim-btn" onclick="TopicPageEngine.runCRCCalculator()">Compute Modulo-2 Division</button>
          </div>

          <div class="flex gap-2 mb-3">
            <button class="px-2.5 py-1 text-xs rounded bg-red-100 hover:bg-red-200 text-red-700 font-bold transition-colors" onclick="TopicPageEngine.injectCRCError()">
              💥 Inject 1-Bit Error in Codeword
            </button>
            <button class="px-2.5 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors" onclick="TopicPageEngine.runCRCCalculator()">
              🔄 Re-verify Clean Codeword
            </button>
          </div>

          <div id="topic-crc-output" class="sim-display-area" style="font-family: var(--font-mono); font-size: 0.85rem; line-height: 1.6; background: #0f172a; color: #f8fafc; padding: 1.25rem; border-radius: 8px; min-height: 120px; overflow-x: auto;">
            Click "Compute Modulo-2 Division" to trace polynomial XOR steps.
          </div>
        </div>
      `;
    }

    // 3. SLIDING WINDOW & ARQ SIMULATOR
    if (labKey === 'sliding-window' || labKey === 'stop-and-wait' || labKey === 'gbn' || labKey === 'sr') {
      const defaultProto = labKey === 'sliding-window' ? 'gbn' : labKey;
      return `
        <div class="simulator-shell">
          <div class="sim-header">
            <div class="sim-title">⚡ Interactive Sliding Window & ARQ Protocol Studio</div>
            <div class="sim-controls flex items-center gap-2">
              <span class="text-xs text-gray-500 font-bold">Protocol:</span>
              <select id="topic-sw-proto" class="sim-input text-xs py-1 px-2" onchange="TopicPageEngine.updateSWProtocol()">
                <option value="stop-and-wait" ${defaultProto === 'stop-and-wait' ? 'selected' : ''}>Stop-and-Wait ARQ (W = 1)</option>
                <option value="gbn" ${defaultProto === 'gbn' ? 'selected' : ''}>Go-Back-N ARQ (W ≤ 2^k - 1)</option>
                <option value="sr" ${defaultProto === 'sr' ? 'selected' : ''}>Selective Repeat ARQ (W ≤ 2^(k-1))</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 p-3 bg-gray-50 dark:bg-gray-800/80 rounded-lg text-xs">
            <div>
              <label class="block font-bold text-gray-500">Sender Window Size ($W$):</label>
              <input type="number" id="topic-sw-winsize" class="sim-input w-full mt-1" value="${defaultProto === 'stop-and-wait' ? '1' : '4'}" min="1" max="8" onchange="TopicPageEngine.calcSWUtilization()">
            </div>
            <div>
              <label class="block font-bold text-gray-500">Propagation Delay $T_p$ (ms):</label>
              <input type="number" id="topic-sw-tp" class="sim-input w-full mt-1" value="9" min="1" max="100" onchange="TopicPageEngine.calcSWUtilization()">
            </div>
            <div>
              <label class="block font-bold text-gray-500">Transmission Time $T_f$ (ms):</label>
              <input type="number" id="topic-sw-tf" class="sim-input w-full mt-1" value="1" min="1" max="20" onchange="TopicPageEngine.calcSWUtilization()">
            </div>
          </div>

          <div id="topic-sw-utilization-badge" class="mb-3 p-2.5 bg-blue-50 dark:bg-blue-950/40 rounded-lg text-xs font-mono border border-blue-200 dark:border-blue-900">
            <!-- Computed by calcSWUtilization -->
          </div>

          <div class="flex gap-2 mb-3">
            <button class="sim-btn" onclick="TopicPageEngine.runSWSingleClean()">
              🚀 Transmit Window (Clean Channel)
            </button>
            <button class="sim-btn" style="background: #ef4444;" onclick="TopicPageEngine.runSWLossScenario()">
              💥 Simulate Frame Loss (Drop Frame 2)
            </button>
          </div>

          <div id="topic-arq-timeline" class="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs leading-relaxed min-h-[160px] overflow-x-auto">
            Ready to simulate. Select an action above to observe event timing, buffer states, and retransmissions.
          </div>
        </div>
      `;
    }

    // 4. ALOHA & CSMA CONTENTION SIMULATOR
    if (labKey === 'aloha-csma') {
      return `
        <div class="simulator-shell">
          <div class="sim-header">
            <div class="sim-title">📡 Multiple Access Protocols: Contention & Throughput Lab</div>
            <div class="sim-controls">
              <select id="topic-aloha-type" class="sim-input text-xs py-1" onchange="TopicPageEngine.runAlohaSim()">
                <option value="pure">Pure ALOHA (Vulnerable = 2T, S = G·e^-2G)</option>
                <option value="slotted">Slotted ALOHA (Vulnerable = T, S = G·e^-G)</option>
                <option value="1persistent">1-Persistent CSMA (Continuous Listen, P=1)</option>
                <option value="nonpersistent">Non-Persistent CSMA (Random Backoff on Busy)</option>
                <option value="ppersistent">p-Persistent CSMA (Slotted with Probability p)</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 p-3 bg-gray-50 dark:bg-gray-800/80 rounded-lg text-xs">
            <div>
              <label class="block font-bold text-gray-500">Offered Traffic Load ($G$ attempts/frame time):</label>
              <div class="flex items-center gap-3 mt-1">
                <input type="range" id="topic-aloha-g" min="0.1" max="3.0" step="0.1" value="0.5" class="flex-1" oninput="TopicPageEngine.runAlohaSim()">
                <span id="topic-aloha-g-val" class="font-mono font-bold text-gfg-green">0.5</span>
              </div>
            </div>
            <div>
              <label class="block font-bold text-gray-500">Number of Competing Stations ($N$):</label>
              <div class="flex items-center gap-3 mt-1">
                <input type="range" id="topic-aloha-n" min="2" max="10" step="1" value="4" class="flex-1" oninput="TopicPageEngine.runAlohaSim()">
                <span id="topic-aloha-n-val" class="font-mono font-bold text-gfg-green">4</span>
              </div>
            </div>
          </div>

          <div id="topic-aloha-metrics" class="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4 font-mono text-xs">
            <!-- Computed metrics -->
          </div>

          <div class="mb-2 flex justify-between items-center text-xs">
            <span class="font-bold text-gray-700 dark:text-gray-300">Shared Channel Activity Visualizer:</span>
            <button class="sim-btn secondary text-xs py-0.5 px-2" onclick="TopicPageEngine.runAlohaSim()">Re-roll Contention Trials</button>
          </div>

          <div id="topic-aloha-timeline-canvas" class="p-3 bg-slate-900 rounded-xl min-h-[140px] flex flex-col justify-center gap-2">
            <!-- Channels / time slots -->
          </div>
        </div>
      `;
    }

    // 5. FRAME EXPLORER (Ethernet 802.3 & 802.11)
    if (labKey === 'frame-explorer') {
      return `
        <div class="simulator-shell">
          <div class="sim-header">
            <div class="sim-title">🔍 Interactive Layer 2 Frame Inspector</div>
            <div class="sim-controls">
              <button id="fe-tab-eth" class="sim-btn" onclick="TopicPageEngine.switchFrameType('eth')">IEEE 802.3 Ethernet</button>
              <button id="fe-tab-wifi" class="sim-btn secondary" onclick="TopicPageEngine.switchFrameType('wifi')">IEEE 802.11 Wi-Fi</button>
              <button id="fe-tab-ppp" class="sim-btn secondary" onclick="TopicPageEngine.switchFrameType('ppp')">PPP / HDLC Frame</button>
            </div>
          </div>

          <p class="text-xs text-gray-500 mb-3">Click on any frame block below to inspect its exact byte size, hexadecimal field values, and protocol handling rules:</p>

          <div id="fe-blocks-container" class="flex flex-wrap gap-1 p-3 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-300 dark:border-gray-700 mb-4 select-none">
            <!-- Rendered by switchFrameType -->
          </div>

          <div id="fe-field-inspector" class="p-4 bg-white dark:bg-gray-900 border border-blue-200 dark:border-blue-900 rounded-xl text-xs shadow-sm">
            <div class="font-bold text-blue-700 dark:text-blue-400 text-sm mb-1" id="fe-field-title">Destination MAC Address</div>
            <div class="text-gray-500 font-mono mb-2" id="fe-field-meta">Field Size: 6 Bytes (48 Bits) | Offset: Bytes 0-5</div>
            <div class="text-gray-700 dark:text-gray-300 leading-relaxed" id="fe-field-desc">
              Identifies the destination network interface on the local broadcast link. Can be Unicast (Bit 0 of 1st byte is 0), Multicast (Bit 0 is 1), or Broadcast (FF:FF:FF:FF:FF:FF).
            </div>
          </div>
        </div>
      `;
    }

    // 6. BYTE STUFFING & BIT STUFFING PLAYGROUND
    if (labKey === 'stuffing') {
      return `
        <div class="simulator-shell">
          <div class="sim-header">
            <div class="sim-title">✂️ Live Byte Stuffing & Bit Stuffing Demonstrator</div>
            <div class="sim-controls">
              <button id="st-tab-byte" class="sim-btn" onclick="TopicPageEngine.switchStuffingType('byte')">Byte Stuffing (Sentinel / PPP)</button>
              <button id="st-tab-bit" class="sim-btn secondary" onclick="TopicPageEngine.switchStuffingType('bit')">Bit Stuffing (HDLC 5-Ones)</button>
            </div>
          </div>

          <div id="st-panel-byte">
            <div class="p-3 bg-gray-50 dark:bg-gray-800/80 rounded-lg border border-gray-200 dark:border-gray-700 mb-3 text-xs">
              <label class="block font-bold text-gray-500 uppercase mb-1">Payload Character Stream:</label>
              <div class="flex gap-2">
                <input type="text" id="topic-st-byte-in" class="sim-input flex-1" value="A, FLAG, B, ESC, C" oninput="TopicPageEngine.runByteStuffing()">
                <button class="sim-btn" onclick="TopicPageEngine.runByteStuffing()">Stuff Bytes</button>
              </div>
              <div class="flex gap-2 mt-2">
                <button class="text-[11px] px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300" onclick="TopicPageEngine.insertByteChar('FLAG')">+ Insert FLAG</button>
                <button class="text-[11px] px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300" onclick="TopicPageEngine.insertByteChar('ESC')">+ Insert ESC</button>
                <button class="text-[11px] px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300" onclick="document.getElementById('topic-st-byte-in').value='X, FLAG, Y'; TopicPageEngine.runByteStuffing();">Tanenbaum Example (X, FLAG, Y)</button>
              </div>
            </div>

            <div id="topic-st-byte-out" class="p-4 bg-slate-900 text-white rounded-xl font-mono text-xs leading-relaxed">
              <!-- Rendered by runByteStuffing -->
            </div>
          </div>

          <div id="st-panel-bit" class="hidden">
            <div class="p-3 bg-gray-50 dark:bg-gray-800/80 rounded-lg border border-gray-200 dark:border-gray-700 mb-3 text-xs">
              <label class="block font-bold text-gray-500 uppercase mb-1">Payload Binary Bit Stream:</label>
              <div class="flex gap-2">
                <input type="text" id="topic-st-bit-in" class="sim-input flex-1" value="01111110" oninput="TopicPageEngine.runBitStuffing()">
                <button class="sim-btn" onclick="TopicPageEngine.runBitStuffing()">Stuff Bits</button>
              </div>
              <div class="flex gap-2 mt-2">
                <button class="text-[11px] px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300" onclick="document.getElementById('topic-st-bit-in').value='01111110'; TopicPageEngine.runBitStuffing();">Flag Pattern (01111110)</button>
                <button class="text-[11px] px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300" onclick="document.getElementById('topic-st-bit-in').value='011011111111111111110010'; TopicPageEngine.runBitStuffing();">Consecutive 1s Run (15 ones)</button>
              </div>
            </div>

            <div id="topic-st-bit-out" class="p-4 bg-slate-900 text-white rounded-xl font-mono text-xs leading-relaxed">
              <!-- Rendered by runBitStuffing -->
            </div>
          </div>
        </div>
      `;
    }

    // -------------------------------------------------------------
    // MODULE 3: INTERACTIVE LAB SUITE
    // -------------------------------------------------------------

    // LAB 1: DIJKSTRA SHORTEST PATH & SPF SOLVER (PDF Pages 23-25)
    if (labKey === 'dijkstra') {
      return `
        <div class="simulator-shell">
          <div class="sim-header">
            <div class="sim-title">🗺️ Interactive Dijkstra SPF Solver & Step-by-Step Graph Tracer</div>
            <div class="sim-controls flex flex-wrap gap-2">
              <button class="sim-btn secondary text-xs" onclick="TopicPageEngine.setDijkstraPreset('pdf')">📖 PDF Worked Example (A &rarr; E, Cost=10)</button>
              <button class="sim-btn secondary text-xs" onclick="TopicPageEngine.setDijkstraPreset('tanenbaum')">🌐 6-Router Subnet (A &rarr; F)</button>
            </div>
          </div>

          <div class="p-3 bg-gray-50 dark:bg-gray-800/80 rounded-lg border border-gray-200 dark:border-gray-700 mb-4">
            <div class="flex flex-wrap items-center justify-between gap-3 text-xs">
              <div class="flex items-center gap-2">
                <label class="font-bold text-gray-700 dark:text-gray-300">Source Node:</label>
                <select id="topic-dijkstra-src" class="sim-input py-1 px-2 text-xs" onchange="TopicPageEngine.initDijkstraGraph()">
                  <option value="A" selected>Router A</option>
                  <option value="B">Router B</option>
                  <option value="C">Router C</option>
                  <option value="D">Router D</option>
                  <option value="E">Router E</option>
                </select>
                <span class="text-gray-400 font-bold">&rarr;</span>
                <label class="font-bold text-gray-700 dark:text-gray-300">Target Node:</label>
                <select id="topic-dijkstra-dst" class="sim-input py-1 px-2 text-xs" onchange="TopicPageEngine.initDijkstraGraph()">
                  <option value="E" selected>Router E</option>
                  <option value="D">Router D</option>
                  <option value="C">Router C</option>
                  <option value="B">Router B</option>
                  <option value="A">Router A</option>
                </select>
              </div>
              <div class="flex gap-2">
                <button class="sim-btn text-xs py-1 px-3" onclick="TopicPageEngine.stepDijkstra()">
                  ▶️ Step Forward
                </button>
                <button class="sim-btn text-xs py-1 px-3 bg-emerald-600 hover:bg-emerald-700 text-white" onclick="TopicPageEngine.runAllDijkstra()">
                  ⏩ Run All Steps
                </button>
                <button class="sim-btn secondary text-xs py-1 px-2" onclick="TopicPageEngine.resetDijkstra()">
                  🔄 Reset
                </button>
              </div>
            </div>
          </div>

          <!-- Step Trace & Status Banner -->
          <div id="topic-dijkstra-status-banner" class="mb-3 p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-lg text-xs leading-relaxed">
            <!-- Rendered by stepDijkstra -->
          </div>

          <!-- Visual Graph & Tentative Vector Table -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-3">
            <div class="p-3 bg-slate-900 text-white rounded-xl font-mono text-xs">
              <div class="text-[11px] font-bold text-sky-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Network Graph Topology & Link Weights</span>
                <span class="text-xs text-gray-400" id="topic-dijkstra-step-counter">Step: 0</span>
              </div>
              <div id="topic-dijkstra-graph-visual" class="p-2 border border-slate-700 rounded-lg bg-slate-950/80 min-h-[140px] flex flex-col justify-center gap-1.5 text-xs">
                <!-- ASCII / Visual node layout -->
              </div>
            </div>

            <div class="p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-xs overflow-x-auto">
              <div class="text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                Tentative Distance Vector Table & Predecessors
              </div>
              <table class="wiki-table w-full text-xs">
                <thead>
                  <tr class="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
                    <th>Node</th>
                    <th>Distance $D(v)$</th>
                    <th>Predecessor $P(v)$</th>
                    <th>State</th>
                  </tr>
                </thead>
                <tbody id="topic-dijkstra-table-body">
                  <!-- Dynamic rows -->
                </tbody>
              </table>
            </div>
          </div>

          <div id="topic-dijkstra-final-path" class="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl text-xs font-mono leading-relaxed">
            <!-- Final shortest path and cost -->
          </div>
        </div>
      `;
    }

    // LAB 2: CIDR & SUBNET CALCULATOR (PDF Pages 91-97)
    if (labKey === 'cidr-calc') {
      return `
        <div class="simulator-shell">
          <div class="sim-header">
            <div class="sim-title">🧮 Interactive IPv4 CIDR, Subnet Mask & Division Lab</div>
            <div class="sim-controls flex flex-wrap gap-2">
              <button class="sim-btn secondary text-xs" onclick="TopicPageEngine.setCIDRPreset('192.168.1.0', 26)">📖 PDF /24 to 4x /26 Subnets (Page 96)</button>
              <button class="sim-btn secondary text-xs" onclick="TopicPageEngine.setCIDRPreset('192.168.1.0', 24)">Class C /24 (254 Hosts)</button>
              <button class="sim-btn secondary text-xs" onclick="TopicPageEngine.setCIDRPreset('172.16.0.0', 16)">Class B /16 (65,534 Hosts)</button>
              <button class="sim-btn secondary text-xs" onclick="TopicPageEngine.setCIDRPreset('10.0.0.0', 8)">Class A /8 (16.7M Hosts)</button>
              <button class="sim-btn secondary text-xs" onclick="TopicPageEngine.setCIDRPreset('10.0.0.0', 30)">WAN Link /30 (2 Hosts)</button>
            </div>
          </div>

          <!-- Input Controls -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 dark:bg-gray-800/80 rounded-lg text-xs">
            <div>
              <label class="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">IPv4 Network IP Address:</label>
              <input type="text" id="topic-cidr-ip" class="sim-input w-full" value="192.168.1.0" oninput="TopicPageEngine.runCIDRCalculator()">
              <div class="text-[11px] text-gray-500 mt-1">Dotted decimal format (e.g. 192.168.1.0 or 10.0.0.0)</div>
            </div>
            <div>
              <div class="flex justify-between items-center mb-1">
                <label class="font-bold text-gray-700 dark:text-gray-300 uppercase">Prefix Length (/p):</label>
                <span id="topic-cidr-prefix-badge" class="font-mono font-bold text-blue-600 dark:text-blue-400 text-sm">/24</span>
              </div>
              <input type="range" id="topic-cidr-prefix-slider" min="8" max="30" step="1" value="24" class="w-full" oninput="TopicPageEngine.syncCIDRSlider(this.value)">
              <div class="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>/8 (Class A)</span>
                <span>/16 (Class B)</span>
                <span>/24 (Class C)</span>
                <span>/26 (Subnet)</span>
                <span>/30 (Point-to-Point)</span>
              </div>
            </div>
          </div>

          <!-- Live Metrics Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-xs font-mono">
            <div class="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-lg">
              <span class="text-gray-500 block text-[10px] uppercase font-bold">Subnet Mask</span>
              <strong id="topic-cidr-mask" class="text-blue-700 dark:text-blue-300 text-sm">255.255.255.0</strong>
            </div>
            <div class="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-lg">
              <span class="text-gray-500 block text-[10px] uppercase font-bold">Total Addresses ($2^{32-p}$)</span>
              <strong id="topic-cidr-total" class="text-emerald-700 dark:text-emerald-300 text-sm">256</strong>
            </div>
            <div class="p-3 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900 rounded-lg">
              <span class="text-gray-500 block text-[10px] uppercase font-bold">Usable Hosts ($2^{32-p}-2$)</span>
              <strong id="topic-cidr-usable" class="text-purple-700 dark:text-purple-300 text-sm">254</strong>
            </div>
            <div class="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-lg">
              <span class="text-gray-500 block text-[10px] uppercase font-bold">Host Bits ($h = 32-p$)</span>
              <strong id="topic-cidr-hbits" class="text-amber-700 dark:text-amber-300 text-sm">8 bits</strong>
            </div>
          </div>

          <!-- Binary Mask & Address Range Breakdown -->
          <div class="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs leading-relaxed mb-4 space-y-2">
            <div class="flex flex-wrap justify-between items-center border-b border-slate-700 pb-2">
              <span class="text-gray-400">Network ID:</span>
              <span id="topic-cidr-netid" class="text-emerald-400 font-bold">192.168.1.0</span>
            </div>
            <div class="flex flex-wrap justify-between items-center border-b border-slate-700 pb-2">
              <span class="text-gray-400">Usable Host Range:</span>
              <span id="topic-cidr-range" class="text-sky-300 font-bold">192.168.1.1 &ndash; 192.168.1.254</span>
            </div>
            <div class="flex flex-wrap justify-between items-center border-b border-slate-700 pb-2">
              <span class="text-gray-400">Directed Broadcast:</span>
              <span id="topic-cidr-bcast" class="text-rose-400 font-bold">192.168.1.255</span>
            </div>
            <div class="flex flex-wrap justify-between items-center pt-1">
              <span class="text-gray-400">Binary Mask:</span>
              <span id="topic-cidr-binary-mask" class="text-amber-300">11111111.11111111.11111111.00000000</span>
            </div>
          </div>

          <!-- PDF Page 96 Subnet Divider Table -->
          <div class="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-xs">
            <div class="flex justify-between items-center mb-2">
              <span class="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px]">
                📑 PDF Page 96 Subnet Partitioning Table: Divide /24 into 4 Equally-Sized /26 Subnets ($2^s = 2^2 = 4$)
              </span>
              <span class="px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200 font-bold text-[10px]">62 Hosts Each</span>
            </div>
            <table class="wiki-table w-full text-xs">
              <thead>
                <tr class="bg-gray-100 dark:bg-gray-900">
                  <th>Subnet #</th>
                  <th>Subnet Network Address</th>
                  <th>Usable Host Range</th>
                  <th>Directed Broadcast</th>
                  <th>Usable Hosts</th>
                </tr>
              </thead>
              <tbody id="topic-cidr-subnets-table">
                <!-- Dynamically populated -->
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // LAB 3: DISTANCE VECTOR & COUNT-TO-INFINITY (PDF Pages 28-32)
    if (labKey === 'distance-vector') {
      return `
        <div class="simulator-shell">
          <div class="sim-header">
            <div class="sim-title">🔄 Distance Vector & Count-to-Infinity Demonstrator (Bellman-Ford)</div>
            <div class="sim-controls flex flex-wrap gap-2">
              <button class="sim-btn secondary text-xs" onclick="TopicPageEngine.setDVPreset('normal')">✅ Stable Convergence</button>
              <button class="sim-btn secondary text-xs" onclick="TopicPageEngine.setDVPreset('failure')">⚠️ Link Failure Scenario</button>
            </div>
          </div>

          <!-- Formula & Settings Header -->
          <div class="p-3 bg-gray-50 dark:bg-gray-800/80 rounded-lg border border-gray-200 dark:border-gray-700 mb-4 text-xs">
            <div class="flex flex-wrap justify-between items-center gap-3">
              <div class="font-mono text-gray-700 dark:text-gray-300">
                <strong>Bellman-Ford Recurrence:</strong> $D_x(y) = \\min_{v \\in N(x)} [c(x, v) + D_v(y)]$
              </div>
              <div class="flex items-center gap-4">
                <label class="flex items-center gap-1.5 cursor-pointer font-bold text-gray-700 dark:text-gray-300">
                  <input type="checkbox" id="topic-dv-split-horizon" onchange="TopicPageEngine.renderDVTables()">
                  <span>Split Horizon</span>
                </label>
                <label class="flex items-center gap-1.5 cursor-pointer font-bold text-gray-700 dark:text-gray-300">
                  <input type="checkbox" id="topic-dv-poison-reverse" onchange="TopicPageEngine.renderDVTables()">
                  <span>Poison Reverse ($\\\\infty = 16$)</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Controls Bar -->
          <div class="flex flex-wrap gap-2 mb-3">
            <button class="sim-btn text-xs py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white" onclick="TopicPageEngine.stepDVIteration()">
              🔄 Step Exchange Vector Round
            </button>
            <button class="sim-btn text-xs py-1.5 px-3 bg-rose-600 hover:bg-rose-700 text-white" onclick="TopicPageEngine.triggerDVLinkFailure()">
              💥 Break Link to Destination X (Trigger Count-to-Infinity)
            </button>
            <button class="sim-btn secondary text-xs py-1.5 px-3" onclick="TopicPageEngine.resetDV()">
              🔄 Reset Network
            </button>
          </div>

          <!-- Router Tables Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <!-- Router A Table -->
            <div class="p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-xs">
              <div class="flex justify-between items-center mb-2 pb-1 border-b border-gray-200 dark:border-gray-700">
                <strong class="text-blue-700 dark:text-blue-400">Router A Routing Table</strong>
                <span class="text-[10px] text-gray-400">Neighbors: Router B</span>
              </div>
              <table class="wiki-table w-full text-xs">
                <thead><tr class="bg-blue-50 dark:bg-gray-900"><th>Dest</th><th>Distance</th><th>Next Hop</th></tr></thead>
                <tbody id="topic-dv-table-a"></tbody>
              </table>
            </div>

            <!-- Router B Table -->
            <div class="p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-xs">
              <div class="flex justify-between items-center mb-2 pb-1 border-b border-gray-200 dark:border-gray-700">
                <strong class="text-purple-700 dark:text-purple-400">Router B Routing Table</strong>
                <span class="text-[10px] text-gray-400">Neighbors: Router A, Dest X</span>
              </div>
              <table class="wiki-table w-full text-xs">
                <thead><tr class="bg-purple-50 dark:bg-gray-900"><th>Dest</th><th>Distance</th><th>Next Hop</th></tr></thead>
                <tbody id="topic-dv-table-b"></tbody>
              </table>
            </div>
          </div>

          <!-- Step Trace Log -->
          <div id="topic-dv-log" class="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs leading-relaxed min-h-[120px] max-h-[220px] overflow-y-auto">
            Ready to simulate. Click "Step Exchange Vector Round" or "Break Link to Destination X" to observe routing convergence and loop prevention.
          </div>
        </div>
      `;
    }

    // LAB 4: TRAFFIC SHAPING & CONGESTION CONTROL (PDF Pages 42-58)
    if (labKey === 'congestion-shaper') {
      return `
        <div class="simulator-shell">
          <div class="sim-header">
            <div class="sim-title">🚦 Live Traffic Shaping & Congestion Control Lab</div>
            <div class="sim-controls flex flex-wrap gap-2">
              <button id="cs-btn-leaky" class="sim-btn text-xs py-1 px-3" onclick="TopicPageEngine.setShaperMode('leaky')">🚰 Leaky Bucket (Constant Rate)</button>
              <button id="cs-btn-token" class="sim-btn secondary text-xs py-1 px-3" onclick="TopicPageEngine.setShaperMode('token')">🪙 Token Bucket (Bursts Permitted)</button>
            </div>
          </div>

          <!-- Parameter Sliders -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 p-3 bg-gray-50 dark:bg-gray-800/80 rounded-lg text-xs">
            <div>
              <label class="block font-bold text-gray-500 mb-1">Bucket Capacity ($B$ packets):</label>
              <input type="range" id="topic-shaper-cap" min="5" max="25" step="1" value="10" class="w-full" oninput="TopicPageEngine.updateShaperParams()">
              <span id="topic-shaper-cap-val" class="font-mono font-bold text-blue-600">10 pkts</span>
            </div>
            <div>
              <label class="block font-bold text-gray-500 mb-1">Output Leak / Token Rate ($R$ pkts/s):</label>
              <input type="range" id="topic-shaper-rate" min="1" max="10" step="1" value="3" class="w-full" oninput="TopicPageEngine.updateShaperParams()">
              <span id="topic-shaper-rate-val" class="font-mono font-bold text-emerald-600">3 pkts/s</span>
            </div>
            <div>
              <label class="block font-bold text-gray-500 mb-1">ECN Congestion Marking:</label>
              <div class="flex items-center gap-2 mt-2">
                <input type="checkbox" id="topic-shaper-ecn" checked onchange="TopicPageEngine.updateShaperParams()">
                <span class="text-xs font-semibold text-gray-700 dark:text-gray-300">Mark ECN CE-bit at &gt; 70% Buffer</span>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap gap-2 mb-4">
            <button class="sim-btn text-xs py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white" onclick="TopicPageEngine.injectShaperBurst(5)">
              🚀 Inject Traffic Burst (+5 Pkts)
            </button>
            <button class="sim-btn text-xs py-1.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white" onclick="TopicPageEngine.injectShaperBurst(10)">
              🌊 Massive Surge (+10 Pkts)
            </button>
            <button class="sim-btn text-xs py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white" onclick="TopicPageEngine.stepShaperClock()">
              ⏱️ Tick Clock (+1 Sec)
            </button>
            <button class="sim-btn secondary text-xs py-1.5 px-3" onclick="TopicPageEngine.resetShaper()">
              🔄 Reset Shaper
            </button>
          </div>

          <!-- Animated Queue Buffer Meter -->
          <div class="p-4 bg-slate-900 rounded-xl text-white font-mono text-xs mb-4">
            <div class="flex justify-between items-center mb-1 text-[11px] text-gray-400">
              <span>Router Buffer Occupancy</span>
              <span id="topic-shaper-occupancy-label" class="font-bold text-sky-400">0 / 10 Pkts (0%)</span>
            </div>
            <div class="w-full bg-slate-800 rounded-full h-4 overflow-hidden border border-slate-700">
              <div id="topic-shaper-bar" class="h-full bg-emerald-500 transition-all duration-300" style="width: 0%;"></div>
            </div>
          </div>

          <!-- Metrics Counters -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div class="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-lg text-center">
              <div class="text-[10px] uppercase font-bold text-gray-500">Total Arrived</div>
              <strong id="topic-shaper-stat-in" class="text-blue-700 dark:text-blue-300 text-lg">0</strong>
            </div>
            <div class="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-lg text-center">
              <div class="text-[10px] uppercase font-bold text-gray-500">Transmitted (Conformed)</div>
              <strong id="topic-shaper-stat-out" class="text-emerald-700 dark:text-emerald-300 text-lg">0</strong>
            </div>
            <div class="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-lg text-center">
              <div class="text-[10px] uppercase font-bold text-gray-500">Dropped (Tail Drop)</div>
              <strong id="topic-shaper-stat-drop" class="text-rose-700 dark:text-rose-300 text-lg">0</strong>
            </div>
            <div class="p-3 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900 rounded-lg text-center">
              <div class="text-[10px] uppercase font-bold text-gray-500">ECN CE-Marked</div>
              <strong id="topic-shaper-stat-ecn" class="text-purple-700 dark:text-purple-300 text-lg">0</strong>
            </div>
          </div>
        </div>
      `;
    }

    // LAB 5: LAYER 3 HEADER INSPECTOR (IPv4 vs IPv6) (PDF Pages 84-102)
    if (labKey === 'ip-header') {
      return `
        <div class="simulator-shell">
          <div class="sim-header">
            <div class="sim-title">🔍 Layer 3 Header Inspector (IPv4 20-60B vs IPv6 Fixed 40B)</div>
            <div class="sim-controls flex flex-wrap gap-2">
              <button id="iph-tab-v4" class="sim-btn text-xs py-1 px-3" onclick="TopicPageEngine.switchIPHeaderType('v4')">IPv4 Header (20-60 Bytes)</button>
              <button id="iph-tab-v6" class="sim-btn secondary text-xs py-1 px-3" onclick="TopicPageEngine.switchIPHeaderType('v6')">IPv6 Base Header (Fixed 40 Bytes)</button>
            </div>
          </div>

          <p class="text-xs text-gray-500 mb-3">Click on any header field below to view its bit-width, protocol function, and key RFC engineering rationale:</p>

          <div id="iph-blocks-container" class="space-y-1.5 p-3 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-300 dark:border-gray-700 mb-4 select-none">
            <!-- Dynamic header grid -->
          </div>

          <div id="iph-field-inspector" class="p-4 bg-white dark:bg-gray-900 border border-blue-200 dark:border-blue-900 rounded-xl text-xs shadow-sm">
            <div class="font-bold text-blue-700 dark:text-blue-400 text-sm mb-1" id="iph-field-title">Version Field</div>
            <div class="text-gray-500 font-mono mb-2" id="iph-field-meta">Width: 4 Bits | Value: 0100 (4) | Offset: Bit 0-3</div>
            <div class="text-gray-700 dark:text-gray-300 leading-relaxed" id="iph-field-desc">
              Identifies the protocol version. For IPv4, this 4-bit nibble is always set to 4 (binary 0100). Routers discard any datagram whose version does not match their software stack.
            </div>
          </div>
        </div>
      `;
    }

    // Fallbacks for Modules 4 & 5
    if (labKey === 'handshake') {

      return `
        <div class="simulator-shell">
          <div class="sim-header">
            <div class="sim-title">🤝 TCP 3-Way Handshake State Animator</div>
            <button class="sim-btn" onclick="TopicPageEngine.stepHandshake()">Step Forward Handshake ➔</button>
            <button class="sim-btn secondary" onclick="TopicPageEngine.resetHandshake()">Reset</button>
          </div>
          <div id="topic-handshake-canvas" style="background: #f8fafc; border: 1px solid var(--border-light); border-radius: 12px; padding: 1.5rem; min-height: 180px;">
            <div style="display: flex; justify-content: space-between; font-weight: 800; color: #1e293b; margin-bottom: 1rem;">
              <span>CLIENT (192.168.1.10:52341)</span>
              <span id="handshake-phase-label" style="color: #7c3aed;">Ready: Click "Step Forward"</span>
              <span>SERVER (93.184.216.34:80)</span>
            </div>
            <div id="handshake-steps-list" style="display: flex; flex-direction: column; gap: 0.75rem;">
              <div style="font-size: 0.88rem; color: #64748b;">Waiting to initiate TCP connection...</div>
            </div>
          </div>
        </div>
      `;
    }
    if (labKey === 'dns') {
      return `
        <div class="simulator-shell">
          <div class="sim-header">
            <div class="sim-title">🔍 Iterative DNS Resolution Simulator</div>
            <div class="sim-controls">
              <input type="text" id="topic-dns-query" class="sim-input" value="www.wikipedia.org" style="width: 220px;">
              <button class="sim-btn" onclick="TopicPageEngine.runDNSSimulator()">Trace Resolution</button>
            </div>
          </div>
          <div id="topic-dns-output" style="background: #0f172a; color: #f8fafc; border-radius: 12px; padding: 1.25rem; font-family: var(--font-mono); font-size: 0.88rem; line-height: 1.8; min-height: 140px;">
            Enter a hostname and click "Trace Resolution" to step through Root, TLD, and Authoritative nameservers.
          </div>
        </div>
      `;
    }
    if (labKey === 'rsa') {
      return `
        <div class="simulator-shell">
          <div class="sim-header">
            <div class="sim-title">🔐 Live RSA Keygen & Modular Exponentiation Calculator</div>
          </div>
          <div class="sim-input-row">
            <div class="sim-field">
              <label>Prime p:</label>
              <input type="number" id="topic-rsa-p" class="sim-input" value="61">
            </div>
            <div class="sim-field">
              <label>Prime q:</label>
              <input type="number" id="topic-rsa-q" class="sim-input" value="53">
            </div>
            <div class="sim-field">
              <label>Message M (Integer &lt; n):</label>
              <input type="number" id="topic-rsa-msg" class="sim-input" value="65">
            </div>
            <button class="sim-btn" onclick="TopicPageEngine.runRSACalculator()">Compute RSA</button>
          </div>
          <div id="topic-rsa-output" style="background: #f8fafc; border: 1px solid var(--border-light); border-radius: 12px; padding: 1.25rem; font-family: var(--font-mono); font-size: 0.88rem; line-height: 1.8;">
            Click "Compute RSA" to calculate modulus n, totient phi(n), public exponent e, private exponent d, ciphertext C, and decrypted message M.
          </div>
        </div>
      `;
    }
    return "";
  },

  initLab: function(labKey) {
    if (typeof document === 'undefined') return;
    if (labKey === 'hamming') TopicPageEngine.runHammingEncoder();
    if (labKey === 'crc') TopicPageEngine.runCRCCalculator();
    if (labKey === 'sliding-window' || labKey === 'stop-and-wait' || labKey === 'gbn' || labKey === 'sr') {
      TopicPageEngine.calcSWUtilization();
      TopicPageEngine.runSWSingleClean();
    }
    if (labKey === 'aloha-csma') TopicPageEngine.runAlohaSim();
    if (labKey === 'frame-explorer') TopicPageEngine.switchFrameType('eth');
    if (labKey === 'stuffing') TopicPageEngine.runByteStuffing();
    // Unit 3 Interactive Laboratories
    if (labKey === 'dijkstra') TopicPageEngine.initDijkstraGraph();
    if (labKey === 'cidr-calc') TopicPageEngine.runCIDRCalculator();
    if (labKey === 'distance-vector') TopicPageEngine.initDistanceVector();
    if (labKey === 'congestion-shaper') TopicPageEngine.initCongestionShaper();
    if (labKey === 'ip-header') TopicPageEngine.switchIPHeaderType('v4');
    // Transport & Application Labs
    if (labKey === 'dns') TopicPageEngine.runDNSSimulator();
    if (labKey === 'rsa') TopicPageEngine.runRSACalculator();
  },

  // -------------------------------------------------------------
  // 1. HAMMING CODE SIMULATOR LOGIC
  // -------------------------------------------------------------
  hammingCurrentCodeword: [0, 1, 1, 0, 0, 1, 1], // positions 1..7 (0-indexed 0..6)
  hammingCleanCodeword: [0, 1, 1, 0, 0, 1, 1],
  
  setHammingPreset: function(data4) {
    const dIn = document.getElementById('topic-hamming-data');
    if (dIn) {
      dIn.value = data4;
      TopicPageEngine.runHammingEncoder();
    }
  },

  runHammingEncoder: function() {
    const dIn = document.getElementById('topic-hamming-data');
    const board = document.getElementById('topic-hamming-interactive-board');
    if (!dIn || !board) return;

    let val = dIn.value.trim().replace(/[^01]/g, '');
    if (val.length < 4) val = (val + "0000").slice(0, 4);
    if (val.length > 4) val = val.slice(0, 4);
    dIn.value = val;

    // Data bits: D1=val[0], D2=val[1], D3=val[2], D4=val[3]
    const d1 = parseInt(val[0]);
    const d2 = parseInt(val[1]);
    const d3 = parseInt(val[2]);
    const d4 = parseInt(val[3]);

    // Even parity checks:
    // P1 checks 1, 3, 5, 7 -> P1 = d1 ^ d2 ^ d4
    const p1 = d1 ^ d2 ^ d4;
    // P2 checks 2, 3, 6, 7 -> P2 = d1 ^ d3 ^ d4
    const p2 = d1 ^ d3 ^ d4;
    // P4 checks 4, 5, 6, 7 -> P4 = d2 ^ d3 ^ d4
    const p4 = d2 ^ d3 ^ d4;

    TopicPageEngine.hammingCleanCodeword = [p1, p2, d1, p4, d2, d3, d4];
    TopicPageEngine.hammingCurrentCodeword = [...TopicPageEngine.hammingCleanCodeword];

    TopicPageEngine.renderHammingBoard();
  },

  renderHammingBoard: function() {
    const board = document.getElementById('topic-hamming-interactive-board');
    if (!board) return;

    const cw = TopicPageEngine.hammingCurrentCodeword;
    const clean = TopicPageEngine.hammingCleanCodeword;
    const posMeta = [
      { name: "P₁", pos: 1, type: "parity", group: "1, 3, 5, 7" },
      { name: "P₂", pos: 2, type: "parity", group: "2, 3, 6, 7" },
      { name: "D₁", pos: 3, type: "data", group: "Payload Bit 1" },
      { name: "P₄", pos: 4, type: "parity", group: "4, 5, 6, 7" },
      { name: "D₂", pos: 5, type: "data", group: "Payload Bit 2" },
      { name: "D₃", pos: 6, type: "data", group: "Payload Bit 3" },
      { name: "D₄", pos: 7, type: "data", group: "Payload Bit 4" }
    ];

    let cellsHtml = posMeta.map((m, i) => {
      const bit = cw[i];
      const isFlipped = bit !== clean[i];
      const colorBg = isFlipped ? 'bg-rose-600 text-white animate-pulse' : (m.type === 'parity' ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white');
      return `
        <div class="flex flex-col items-center p-2 rounded-lg bg-slate-800 border border-slate-700 min-w-[55px]">
          <span class="text-[10px] text-slate-400 font-mono">Pos ${m.pos}</span>
          <span class="text-xs font-bold ${m.type === 'parity' ? 'text-indigo-400' : 'text-emerald-400'}">${m.name}</span>
          <div class="w-9 h-9 my-1 rounded-md flex items-center justify-center font-mono text-lg font-extrabold ${colorBg}">
            ${bit}
          </div>
          <button class="mt-1 px-1.5 py-0.5 rounded text-[10px] bg-slate-700 hover:bg-rose-500 hover:text-white transition-colors" onclick="TopicPageEngine.flipHammingBit(${i})" title="Flip bit to simulate channel error">
            ${isFlipped ? 'Unflip' : 'Flip ⚡'}
          </button>
        </div>
      `;
    }).join('');

    board.innerHTML = `
      <div class="flex items-center justify-between mb-3 border-b border-slate-700 pb-2">
        <span class="text-xs font-bold text-slate-200">7-Bit Transmitted Codeword: <code class="text-sky-400 text-sm ml-1">${cw.join('')}</code></span>
        <button class="text-xs px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-slate-200" onclick="TopicPageEngine.runHammingEncoder()">Reset Errors</button>
      </div>
      <div class="flex flex-wrap gap-2 justify-center">
        ${cellsHtml}
      </div>
    `;

    TopicPageEngine.calcHammingSyndrome();
  },

  flipHammingBit: function(index) {
    TopicPageEngine.hammingCurrentCodeword[index] ^= 1;
    TopicPageEngine.renderHammingBoard();
  },

  calcHammingSyndrome: function() {
    const resBox = document.getElementById('topic-hamming-syndrome-result');
    if (!resBox) return;

    const b = TopicPageEngine.hammingCurrentCodeword;
    // Parity checks (even parity):
    // s1 = b[0] ^ b[2] ^ b[4] ^ b[6]  (pos 1, 3, 5, 7)
    // s2 = b[1] ^ b[2] ^ b[5] ^ b[6]  (pos 2, 3, 6, 7)
    // s4 = b[3] ^ b[4] ^ b[5] ^ b[6]  (pos 4, 5, 6, 7)
    const s1 = b[0] ^ b[2] ^ b[4] ^ b[6];
    const s2 = b[1] ^ b[2] ^ b[5] ^ b[6];
    const s4 = b[3] ^ b[4] ^ b[5] ^ b[6];

    const syndromeDecimal = (s4 << 2) | (s2 << 1) | s1;
    const syndromeBinary = `${s4}${s2}${s1}`;

    if (syndromeDecimal === 0) {
      resBox.className = "p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-lg text-xs font-mono leading-relaxed text-emerald-900 dark:text-emerald-200";
      resBox.innerHTML = `
        <div class="font-bold text-sm text-emerald-700 dark:text-emerald-400 mb-1 flex items-center gap-1.5">
          <i class="fa-solid fa-circle-check"></i> Syndrome s₄s₂s₁ = 000₂ (Decimal 0) — Valid Codeword!
        </div>
        All 3 parity checks passed ($P_1$: pass, $P_2$: pass, $P_4$: pass).<br>
        Extracted Payload Data ($D_1 D_2 D_3 D_4$ at Pos 3, 5, 6, 7): <strong class="text-emerald-600 text-sm">${b[2]}${b[4]}${b[5]}${b[6]}</strong>
      `;
    } else {
      resBox.className = "p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 rounded-lg text-xs font-mono leading-relaxed text-rose-900 dark:text-rose-200";
      resBox.innerHTML = `
        <div class="font-bold text-sm text-rose-700 dark:text-rose-400 mb-1 flex items-center gap-1.5">
          <i class="fa-solid fa-triangle-exclamation"></i> Error Detected at Bit Position ${syndromeDecimal}! (Syndrome = ${syndromeBinary}₂)
        </div>
        Failed Checks: ${s1 ? 's₁ (1,3,5,7) ' : ''}${s2 ? 's₂ (2,3,6,7) ' : ''}${s4 ? 's₄ (4,5,6,7)' : ''}<br>
        Receiver Action: Automatic Bit Inversion on Position ${syndromeDecimal} (${b[syndromeDecimal - 1]} &rarr; ${b[syndromeDecimal - 1] ^ 1}).<br>
        Corrected Dataword: <strong class="text-sky-600 font-bold">${TopicPageEngine.hammingCleanCodeword[2]}${TopicPageEngine.hammingCleanCodeword[4]}${TopicPageEngine.hammingCleanCodeword[5]}${TopicPageEngine.hammingCleanCodeword[6]}</strong> (Successfully Restored!)
      `;
    }
  },

  // -------------------------------------------------------------
  // 2. CRC CALCULATOR WITH ERROR INJECTION
  // -------------------------------------------------------------
  crcLastCodeword: "",
  setCRCPreset: function(data, gen) {
    const dIn = document.getElementById('topic-crc-data');
    const gIn = document.getElementById('topic-crc-gen');
    if (dIn) dIn.value = data;
    if (gIn) gIn.value = gen;
    TopicPageEngine.runCRCCalculator();
  },

  runCRCCalculator: function() {
    const dataIn = document.getElementById('topic-crc-data');
    const genIn = document.getElementById('topic-crc-gen');
    const out = document.getElementById('topic-crc-output');
    if (!dataIn || !genIn || !out) return;

    const data = dataIn.value.trim();
    const gen = genIn.value.trim();
    if (!/^[01]+$/.test(data) || !/^[01]+$/.test(gen) || gen.length < 2 || gen[0] !== '1') {
      out.innerHTML = `<span style="color: #ef4444;">Error: Data and Generator must consist of valid binary 0s and 1s, and Generator must begin with 1!</span>`;
      return;
    }

    const r = gen.length - 1;
    const paddedData = data + "0".repeat(r);
    let remArr = paddedData.split('').map(Number);
    const genArr = gen.split('').map(Number);

    let traceSteps = [];
    traceSteps.push(`Dividend (Data + ${r} zeros): ${paddedData}`);
    traceSteps.push(`Divisor  (Generator Polynomial): ${gen} (Degree r = ${r})`);
    traceSteps.push(`--------------------------------------------------`);

    for (let i = 0; i <= remArr.length - genArr.length; i++) {
      if (remArr[i] === 1) {
        let stepStr = " ".repeat(i) + gen;
        traceSteps.push(stepStr + `  [XOR at bit ${i}]`);
        for (let j = 0; j < genArr.length; j++) {
          remArr[i + j] ^= genArr[j];
        }
      }
    }

    const remainder = remArr.slice(remArr.length - r).join('');
    const transmitted = data + remainder;
    TopicPageEngine.crcLastCodeword = transmitted;

    traceSteps.push(`--------------------------------------------------`);
    traceSteps.push(`Final Remainder (FCS): ${remainder}`);
    traceSteps.push(`Transmitted Codeword:   ${transmitted}`);
    traceSteps.push(`Receiver Verification:  Divide [${transmitted}] by [${gen}]`);
    traceSteps.push(`Receiver Remainder:     ${"0".repeat(r)} ===> [NO ERROR DETECTED ✓]`);

    out.innerHTML = `<pre class="text-xs font-mono leading-relaxed text-sky-300">${traceSteps.join('\n')}</pre>`;
  },

  injectCRCError: function() {
    const out = document.getElementById('topic-crc-output');
    const genIn = document.getElementById('topic-crc-gen');
    if (!out || !genIn || !TopicPageEngine.crcLastCodeword) return;

    const gen = genIn.value.trim();
    const r = gen.length - 1;
    let cwArr = TopicPageEngine.crcLastCodeword.split('');
    // Flip 3rd bit from right
    const flipIdx = Math.max(0, cwArr.length - 3);
    cwArr[flipIdx] = cwArr[flipIdx] === '1' ? '0' : '1';
    const corrupted = cwArr.join('');

    // Compute receiver remainder on corrupted
    let remArr = corrupted.split('').map(Number);
    const genArr = gen.split('').map(Number);
    for (let i = 0; i <= remArr.length - genArr.length; i++) {
      if (remArr[i] === 1) {
        for (let j = 0; j < genArr.length; j++) {
          remArr[i + j] ^= genArr[j];
        }
      }
    }
    const badRem = remArr.slice(remArr.length - r).join('');

    out.innerHTML = `
      <pre class="text-xs font-mono leading-relaxed text-rose-300">
💥 CHANNEL ERROR INJECTED!
Clean Codeword:     ${TopicPageEngine.crcLastCodeword}
Corrupted Codeword: ${corrupted} (Bit flipped at position ${flipIdx})
Divisor:            ${gen}

Receiver Modulo-2 Division on Corrupted Codeword:
Resulting Remainder: <span class="text-rose-400 font-extrabold text-sm">${badRem}</span> (NON-ZERO!)

🚨 RESULT: CRC CHECK FAILED!
Receiver detects transmission corruption and discards the damaged frame.
      </pre>
    `;
  },

  // -------------------------------------------------------------
  // 3. SLIDING WINDOW & ARQ PROTOCOL STUDIO LOGIC
  // -------------------------------------------------------------
  updateSWProtocol: function() {
    const proto = document.getElementById('topic-sw-proto').value;
    const winInput = document.getElementById('topic-sw-winsize');
    if (winInput) {
      if (proto === 'stop-and-wait') {
        winInput.value = 1;
        winInput.disabled = true;
      } else {
        winInput.disabled = false;
        if (winInput.value === '1') winInput.value = 4;
      }
    }
    TopicPageEngine.calcSWUtilization();
    TopicPageEngine.runSWSingleClean();
  },

  calcSWUtilization: function() {
    const protoEl = document.getElementById('topic-sw-proto');
    const wEl = document.getElementById('topic-sw-winsize');
    const tpEl = document.getElementById('topic-sw-tp');
    const tfEl = document.getElementById('topic-sw-tf');
    const badge = document.getElementById('topic-sw-utilization-badge');
    if (!badge || !wEl || !tpEl || !tfEl) return;

    const W = parseInt(wEl.value) || 1;
    const Tp = parseFloat(tpEl.value) || 9;
    const Tf = parseFloat(tfEl.value) || 1;
    const a = Tp / Tf;

    let U = 0;
    if (protoEl.value === 'stop-and-wait') {
      U = 1 / (1 + 2 * a);
    } else {
      U = Math.min(1, W / (1 + 2 * a));
    }
    const pct = (U * 100).toFixed(2);

    badge.innerHTML = `
      <strong>Theoretical Channel Utilization ($U$):</strong><br>
      $a = \\frac{T_p}{T_f} = \\frac{${Tp}\\text{ ms}}{${Tf}\\text{ ms}} = ${a.toFixed(1)}$ &nbsp;|&nbsp; 
      Formula: $U = \\min\\left(1, \\frac{W}{1+2a}\\right) = \\frac{${W}}{1+2(${a.toFixed(1)})} = \\frac{${W}}{${(1+2*a).toFixed(1)}}$ &nbsp;&rarr;&nbsp; 
      <strong class="text-emerald-600 dark:text-emerald-400 text-sm font-extrabold">${pct}% Efficiency</strong>
    `;

    if (window.renderMathInElement) {
      renderMathInElement(badge, {
        delimiters: [{left: '$', right: '$', display: false}],
        throwOnError: false
      });
    }
  },

  runSWSingleClean: function() {
    const proto = document.getElementById('topic-sw-proto').value;
    const box = document.getElementById('topic-arq-timeline');
    const wVal = parseInt(document.getElementById('topic-sw-winsize').value) || 1;
    if (!box) return;

    if (proto === 'stop-and-wait') {
      box.innerHTML = `
        <span class="text-emerald-400 font-bold">[Stop-and-Wait Clean Transmission Cycle]:</span><br>
        T = 0.0 ms: Sender transmits [Frame 0], starts Timer.<br>
        T = 1.0 ms: Frame 0 leaves wire ($T_f = 1$ ms).<br>
        T = 10.0 ms: Receiver gets Frame 0, sends [ACK 1] ($T_p = 9$ ms).<br>
        T = 19.0 ms: Sender receives [ACK 1], advances window, sends [Frame 1].<br>
        <span class="text-amber-300">Link was idle for 18 ms waiting for round-trip acknowledgment. Utilization = 5.26%.</span>
      `;
    } else {
      box.innerHTML = `
        <span class="text-emerald-400 font-bold">[Pipelined Sliding Window ($W=${wVal}$) Clean Transmission]:</span><br>
        T = 0.0 ms: Sender transmits [Frame 0]<br>
        T = 1.0 ms: Sender transmits [Frame 1] (without waiting for ACK 0!)<br>
        T = 2.0 ms: Sender transmits [Frame 2]<br>
        T = 3.0 ms: Sender transmits [Frame 3] (Window full: 4 frames in flight)<br>
        T = 10.0 ms: Receiver gets Frame 0 &rarr; sends [ACK 1]<br>
        T = 19.0 ms: Sender gets [ACK 1] &rarr; window slides rightward! Dispatches [Frame 4].<br>
        <span class="text-emerald-300 font-bold">Continuous data flow achieved; high link utilization maintained!</span>
      `;
    }
  },

  runSWLossScenario: function() {
    const proto = document.getElementById('topic-sw-proto').value;
    const box = document.getElementById('topic-arq-timeline');
    if (!box) return;

    if (proto === 'stop-and-wait') {
      box.innerHTML = `
        <span class="text-rose-400 font-bold">[Stop-and-Wait Frame Loss Scenario]:</span><br>
        T = 0.0 ms: Sender dispatches [Frame 0], starts Timer (50 ms).<br>
        T = 5.0 ms: <strong class="text-rose-500">💥 Noise burst flips bits! Frame 0 dropped in transit!</strong><br>
        T = 50.0 ms: ⏱️ <strong>TIMEOUT EXPIRED at Sender!</strong> (No ACK received).<br>
        T = 50.1 ms: Sender retransmits [Frame 0].<br>
        T = 59.1 ms: Receiver safely accepts Frame 0, sends [ACK 1]. Recovery complete!
      `;
    } else if (proto === 'gbn') {
      box.innerHTML = `
        <span class="text-rose-400 font-bold">[Go-Back-N Loss of Frame 2 (Receiver Window = 1)]:</span><br>
        T = 0.0 ms: Sender transmits window: [F0, F1, F2, F3, F4]<br>
        T = 10.0 ms: Receiver accepts F0 &rarr; sends ACK 1<br>
        T = 11.0 ms: Receiver accepts F1 &rarr; sends ACK 2<br>
        T = 12.0 ms: <strong class="text-rose-500">💥 Frame 2 is LOST due to transmission error!</strong><br>
        T = 13.0 ms: Frame 3 arrives &rarr; <span class="text-amber-400">Receiver DISCARDS Frame 3!</span> (Expecting F2 only). Sends duplicate ACK 2.<br>
        T = 14.0 ms: Frame 4 arrives &rarr; <span class="text-amber-400">Receiver DISCARDS Frame 4!</span> Sends duplicate ACK 2.<br>
        T = 60.0 ms: ⏱️ <strong>TIMEOUT on Frame 2 at Sender!</strong><br>
        T = 60.1 ms: <strong class="text-rose-400">Sender must "Go-Back" and retransmit ALL [F2, F3, F4]!</strong>
      `;
    } else {
      box.innerHTML = `
        <span class="text-sky-400 font-bold">[Selective Repeat Loss of Frame 2 (Receiver Buffering)]:</span><br>
        T = 0.0 ms: Sender transmits window: [F0, F1, F2, F3, F4]<br>
        T = 10.0 ms: Receiver accepts F0 &rarr; sends ACK 1<br>
        T = 11.0 ms: Receiver accepts F1 &rarr; sends ACK 2<br>
        T = 12.0 ms: <strong class="text-rose-500">💥 Frame 2 is LOST!</strong><br>
        T = 13.0 ms: Frame 3 arrives &rarr; <span class="text-emerald-400">Receiver BUFFERS Frame 3!</span> Sends ACK 3.<br>
        T = 14.0 ms: Frame 4 arrives &rarr; <span class="text-emerald-400">Receiver BUFFERS Frame 4!</span> Sends ACK 4.<br>
        T = 60.0 ms: ⏱️ <strong>TIMEOUT on Frame 2 only!</strong><br>
        T = 60.1 ms: <strong class="text-emerald-300">Sender retransmits ONLY [Frame 2]!</strong> (F3 & F4 are NOT retransmitted).<br>
        T = 69.1 ms: Receiver gets F2, combines buffered [F2, F3, F4], and delivers to network layer!
      `;
    }
  },

  // -------------------------------------------------------------
  // 4. ALOHA & CSMA CONTENTION SIMULATOR LOGIC
  // -------------------------------------------------------------
  runAlohaSim: function() {
    const typeEl = document.getElementById('topic-aloha-type');
    const gEl = document.getElementById('topic-aloha-g');
    const nEl = document.getElementById('topic-aloha-n');
    const gValSpan = document.getElementById('topic-aloha-g-val');
    const nValSpan = document.getElementById('topic-aloha-n-val');
    const metricsBox = document.getElementById('topic-aloha-metrics');
    const canvas = document.getElementById('topic-aloha-timeline-canvas');
    if (!typeEl || !gEl || !metricsBox || !canvas) return;

    const G = parseFloat(gEl.value);
    const N = parseInt(nEl.value);
    if (gValSpan) gValSpan.textContent = G.toFixed(1);
    if (nValSpan) nValSpan.textContent = N;

    const mode = typeEl.value;
    let throughput = 0;
    let vulnPeriod = "";
    let peakG = 0;
    let peakS = 0;

    if (mode === 'pure') {
      throughput = G * Math.exp(-2 * G);
      vulnPeriod = "2T";
      peakG = 0.5;
      peakS = 18.4;
    } else if (mode === 'slotted') {
      throughput = G * Math.exp(-G);
      vulnPeriod = "T";
      peakG = 1.0;
      peakS = 36.8;
    } else if (mode === '1persistent') {
      const a = 0.05;
      throughput = (G * Math.exp(-G)) / (G + Math.exp(-G) + 0.1);
      vulnPeriod = "Propagation Delay τ";
      peakG = 1.2;
      peakS = 53.0;
    } else {
      throughput = Math.min(0.85, (G / (1 + G)) * 0.9);
      vulnPeriod = "Slot Contention Window";
      peakG = 2.0;
      peakS = 82.0;
    }

    const sPct = (throughput * 100).toFixed(1);

    metricsBox.innerHTML = `
      <div class="p-2.5 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <span class="text-gray-400 text-[10px] uppercase block">Normalized Throughput (S)</span>
        <span class="text-lg font-bold text-gfg-green">${sPct}%</span>
      </div>
      <div class="p-2.5 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <span class="text-gray-400 text-[10px] uppercase block">Vulnerable Period</span>
        <span class="text-lg font-bold text-blue-600 dark:text-blue-400">${vulnPeriod}</span>
      </div>
      <div class="p-2.5 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <span class="text-gray-400 text-[10px] uppercase block">Theoretical Peak</span>
        <span class="text-lg font-bold text-purple-600 dark:text-purple-400">${peakS}% (at G=${peakG})</span>
      </div>
    `;

    // Generate random stations timeline
    let stationRows = [];
    for (let st = 1; st <= Math.min(N, 5); st++) {
      let slots = [];
      for (let s = 0; s < 10; s++) {
        const transmits = Math.random() < (G / N);
        slots.push(transmits);
      }
      stationRows.push(slots);
    }

    // Determine collisions
    let slotCollisions = [];
    for (let s = 0; s < 10; s++) {
      let count = 0;
      for (let st = 0; st < stationRows.length; st++) {
        if (stationRows[st][s]) count++;
      }
      slotCollisions.push(count);
    }

    let timelineHtml = `
      <div class="text-[11px] text-slate-400 mb-1 flex justify-between font-mono">
        <span>Timeline Slots [0 &rarr; 9]</span>
        <span class="flex items-center gap-2">
          <span class="inline-block w-3 h-3 bg-emerald-500 rounded-sm"></span> Success
          <span class="inline-block w-3 h-3 bg-rose-500 rounded-sm"></span> Collision
          <span class="inline-block w-3 h-3 bg-slate-700 rounded-sm"></span> Idle
        </span>
      </div>
    `;

    stationRows.forEach((row, stIdx) => {
      timelineHtml += `
        <div class="flex items-center gap-2 font-mono text-[10px]">
          <span class="w-16 text-slate-400 truncate">Station ${stIdx + 1}:</span>
          <div class="flex-1 grid grid-cols-10 gap-1">
            ${row.map((tx, slotIdx) => {
              if (!tx) return `<div class="h-6 bg-slate-800 rounded flex items-center justify-center text-slate-600">-</div>`;
              const isCollision = slotCollisions[slotIdx] > 1;
              return `
                <div class="h-6 rounded flex items-center justify-center font-bold text-white ${isCollision ? 'bg-rose-600 animate-pulse' : 'bg-emerald-600'}">
                  ${isCollision ? '💥' : '✓'}
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    });

    canvas.innerHTML = timelineHtml;
  },

  // -------------------------------------------------------------
  // 5. FRAME EXPLORER LOGIC
  // -------------------------------------------------------------
  frameTypesData: {
    eth: {
      name: "Ethernet II (IEEE 802.3)",
      fields: [
        { id: "pre", label: "Preamble", size: "7 Bytes", hex: "0xAA...AA", desc: "7 bytes of alternating 10101010 bits used by physical transceivers to synchronize clock receivers." },
        { id: "sfd", label: "SFD", size: "1 Byte", hex: "0xAB (10101011)", desc: "Start Frame Delimiter. The final 11 sequence signals the receiver that the Destination MAC address begins on the next bit." },
        { id: "dmac", label: "Dest MAC", size: "6 Bytes (48b)", hex: "00:1A:2B:3C:4D:5E", desc: "Hardware MAC address of the destination device. Can be Unicast, Multicast, or Broadcast (FF:FF:FF:FF:FF:FF)." },
        { id: "smac", label: "Src MAC", size: "6 Bytes (48b)", hex: "A4:83:E7:12:34:56", desc: "Hardware MAC address of transmitting interface. Switch inspects this to populate its MAC address learning table." },
        { id: "type", label: "EtherType", size: "2 Bytes", hex: "0x0800 (IPv4)", desc: "Identifies upper layer network protocol. 0x0800 = IPv4, 0x86DD = IPv6, 0x0806 = ARP. Values ≤ 1500 represent IEEE 802.3 length." },
        { id: "data", label: "Data / Payload", size: "46–1500 Bytes", hex: "[IP Datagram]", desc: "Carries the encapsulated packet. Must be at least 46 bytes to satisfy the 64-byte minimum frame size (padded if smaller)." },
        { id: "fcs", label: "FCS (CRC-32)", size: "4 Bytes (32b)", hex: "0xC24183A5", desc: "Frame Check Sequence calculated using CRC-32 polynomial over Dest MAC, Src MAC, Type, and Data. If corrupted, frame is discarded." }
      ]
    },
    wifi: {
      name: "IEEE 802.11 Wi-Fi MAC Frame",
      fields: [
        { id: "fc", label: "Frame Control", size: "2 Bytes", hex: "0x0842 (Data)", desc: "Contains Protocol Version, Type (Management, Control, Data), Subtype, To DS / From DS flags, More Frag, Retry, and Protected Frame flags." },
        { id: "dur", label: "Duration / ID", size: "2 Bytes", hex: "0x003A (58 µs)", desc: "Virtual Carrier Sensing: announces channel reservation time to other stations to update their Network Allocation Vector (NAV)." },
        { id: "a1", label: "Address 1 (RA)", size: "6 Bytes", hex: "Receiving Station", desc: "Immediate receiver address (e.g. AP BSSID or client station)." },
        { id: "a2", label: "Address 2 (TA)", size: "6 Bytes", hex: "Transmitting Station", desc: "Immediate transmitter address." },
        { id: "a3", label: "Address 3 (DA/SA)", size: "6 Bytes", hex: "Original Source/Dest", desc: "Final destination address or original source depending on To DS / From DS bits." },
        { id: "seq", label: "Sequence Ctrl", size: "2 Bytes", hex: "Seq & Frag No", desc: "4-bit Fragment Number and 12-bit Sequence Number to filter duplicate frames." },
        { id: "a4", label: "Address 4", size: "6 Bytes (Optional)", hex: "Used in Mesh / WDS", desc: "Only present in Wireless Distribution Systems (WDS) when both To DS = 1 and From DS = 1." },
        { id: "body", label: "Frame Body", size: "0–2312 Bytes", hex: "[Payload Data]", desc: "Upper layer data or management information elements." },
        { id: "fcs", label: "FCS (CRC-32)", size: "4 Bytes", hex: "32-bit CRC", desc: "32-bit CRC covering MAC header and frame body." }
      ]
    },
    ppp: {
      name: "PPP in HDLC-like Framing (RFC 1662)",
      fields: [
        { id: "flag1", label: "Flag", size: "1 Byte", hex: "0x7E (01111110)", desc: "Frame opening delimiter sentinel byte." },
        { id: "addr", label: "Address", size: "1 Byte", hex: "0xFF (All-stations)", desc: "Standard broadcast address in HDLC; PPP does not assign individual station addresses." },
        { id: "ctrl", label: "Control", size: "1 Byte", hex: "0x03 (Unnumbered)", desc: "HDLC Unnumbered Information (UI) command with Poll/Final bit set to 0." },
        { id: "proto", label: "Protocol", size: "1–2 Bytes", hex: "0x0021 (IPv4)", desc: "Identifies protocol in information field (0x0021 = IPv4, 0x8021 = IPCP, 0xC021 = LCP)." },
        { id: "info", label: "Information", size: "Variable (≤ 1500B)", hex: "[Payload]", desc: "Transmitted with byte stuffing (0x7D escape inserted before any 0x7E or 0x7D)." },
        { id: "fcs", label: "FCS", size: "2–4 Bytes", hex: "16-bit CRC (CRC-CCITT)", desc: "Frame Check Sequence verifying frame integrity." },
        { id: "flag2", label: "Flag", size: "1 Byte", hex: "0x7E (01111110)", desc: "Frame closing delimiter sentinel byte." }
      ]
    }
  },

  switchFrameType: function(typeKey) {
    const data = TopicPageEngine.frameTypesData[typeKey];
    if (!data) return;

    ['eth', 'wifi', 'ppp'].forEach(k => {
      const btn = document.getElementById(`fe-tab-${k}`);
      if (btn) btn.className = k === typeKey ? "sim-btn" : "sim-btn secondary";
    });

    const container = document.getElementById('fe-blocks-container');
    if (!container) return;

    container.innerHTML = data.fields.map((f, idx) => `
      <div class="flex-1 min-w-[90px] p-2.5 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:shadow-md cursor-pointer transition-all text-center group" onclick="TopicPageEngine.selectFrameField('${typeKey}', ${idx})">
        <div class="text-[11px] font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">${f.label}</div>
        <div class="text-[10px] text-gray-500 font-mono mt-0.5">${f.size}</div>
      </div>
    `).join('');

    TopicPageEngine.selectFrameField(typeKey, 0);
  },

  selectFrameField: function(typeKey, fieldIdx) {
    const data = TopicPageEngine.frameTypesData[typeKey];
    if (!data || !data.fields[fieldIdx]) return;
    const f = data.fields[fieldIdx];

    const titleEl = document.getElementById('fe-field-title');
    const metaEl = document.getElementById('fe-field-meta');
    const descEl = document.getElementById('fe-field-desc');
    if (titleEl) titleEl.textContent = `${data.name} &rarr; ${f.label}`;
    if (metaEl) metaEl.textContent = `Size: ${f.size} | Example Value: ${f.hex}`;
    if (descEl) descEl.textContent = f.desc;
  },

  // -------------------------------------------------------------
  // 6. STUFFING PLAYGROUND LOGIC
  // -------------------------------------------------------------
  switchStuffingType: function(type) {
    const pByte = document.getElementById('st-panel-byte');
    const pBit = document.getElementById('st-panel-bit');
    const bByte = document.getElementById('st-tab-byte');
    const bBit = document.getElementById('st-tab-bit');
    if (!pByte || !pBit) return;

    if (type === 'byte') {
      pByte.classList.remove('hidden');
      pBit.classList.add('hidden');
      bByte.className = "sim-btn";
      bBit.className = "sim-btn secondary";
      TopicPageEngine.runByteStuffing();
    } else {
      pBit.classList.remove('hidden');
      pByte.classList.add('hidden');
      bBit.className = "sim-btn";
      bByte.className = "sim-btn secondary";
      TopicPageEngine.runBitStuffing();
    }
  },

  insertByteChar: function(ch) {
    const input = document.getElementById('topic-st-byte-in');
    if (!input) return;
    input.value += (input.value ? ", " : "") + ch;
    TopicPageEngine.runByteStuffing();
  },

  runByteStuffing: function() {
    const input = document.getElementById('topic-st-byte-in');
    const out = document.getElementById('topic-st-byte-out');
    if (!input || !out) return;

    const raw = input.value;
    const tokens = raw.split(',').map(s => s.trim()).filter(Boolean);

    let stuffedTokens = [];
    tokens.forEach(tok => {
      if (tok.toUpperCase() === 'FLAG') {
        stuffedTokens.push('<span class="text-rose-400 font-bold">ESC</span>');
        stuffedTokens.push('<span class="text-amber-400 font-bold">FLAG</span>');
      } else if (tok.toUpperCase() === 'ESC') {
        stuffedTokens.push('<span class="text-rose-400 font-bold">ESC</span>');
        stuffedTokens.push('<span class="text-rose-300 font-bold">ESC</span>');
      } else {
        stuffedTokens.push(tok);
      }
    });

    out.innerHTML = `
      <div class="space-y-2">
        <div><strong>Original Payload:</strong> [ ${tokens.join(' , ')} ]</div>
        <div><strong>Transmitted Frame:</strong> <span class="text-emerald-400 font-bold">FLAG</span> &rarr; [ ${stuffedTokens.join(' , ')} ] &rarr; <span class="text-emerald-400 font-bold">FLAG</span></div>
        <div class="text-slate-400 text-[11px] pt-2 border-t border-slate-700">
          Receiver Logic: Whenever <span class="text-rose-400">ESC</span> is encountered, it is stripped and the following byte is treated strictly as payload data, never as a frame delimiter boundary.
        </div>
      </div>
    `;
  },

  runBitStuffing: function() {
    const input = document.getElementById('topic-st-bit-in');
    const out = document.getElementById('topic-st-bit-out');
    if (!input || !out) return;

    let bits = input.value.trim().replace(/[^01]/g, '');
    input.value = bits;

    let onesCount = 0;
    let stuffedBits = [];
    let stuffedIndices = [];

    for (let i = 0; i < bits.length; i++) {
      const b = bits[i];
      stuffedBits.push(b);
      if (b === '1') {
        onesCount++;
        if (onesCount === 5) {
          // Stuff a 0
          stuffedBits.push('<span class="text-emerald-400 font-extrabold text-sm underline">0</span>');
          onesCount = 0;
        }
      } else {
        onesCount = 0;
      }
    }

    out.innerHTML = `
      <div class="space-y-2">
        <div><strong>Original Bitstream:</strong> <code class="text-sky-300">${bits}</code> (${bits.length} bits)</div>
        <div><strong>Stuffed Bitstream:</strong> <code class="text-amber-300">${stuffedBits.join('')}</code></div>
        <div><strong>Final Transmitted Frame:</strong> <span class="text-indigo-400">01111110</span> + [Stuffed Stream] + <span class="text-indigo-400">01111110</span></div>
        <div class="text-slate-400 text-[11px] pt-2 border-t border-slate-700">
          HDLC Rule: After every sequence of <strong>five consecutive 1s</strong>, a <strong>0</strong> is automatically inserted. The receiver strips any 0 directly following five consecutive 1s to restore original user payload!
        </div>
      </div>
    `;
  },

  // =============================================================
  // MODULE 3: INTERACTIVE SIMULATION ENGINES
  // =============================================================

  // 1. DIJKSTRA SPF GRAPH SOLVER (PDF Pages 23-25)
  dijkstraData: {
    preset: 'pdf',
    src: 'A',
    dst: 'E',
    stepIdx: 0,
    graph: null,
    nodes: [],
    dist: {},
    prev: {},
    visited: [],
    unvisited: [],
    stepsHistory: []
  },

  setDijkstraPreset: function(presetKey) {
    TopicPageEngine.dijkstraData.preset = presetKey;
    const srcSel = document.getElementById('topic-dijkstra-src');
    const dstSel = document.getElementById('topic-dijkstra-dst');
    if (presetKey === 'pdf') {
      if (srcSel) srcSel.value = 'A';
      if (dstSel) dstSel.value = 'E';
    } else {
      if (srcSel) srcSel.value = 'A';
      if (dstSel) dstSel.value = 'F';
    }
    TopicPageEngine.initDijkstraGraph();
  },

  initDijkstraGraph: function() {
    const srcSel = document.getElementById('topic-dijkstra-src');
    const dstSel = document.getElementById('topic-dijkstra-dst');
    const src = srcSel ? srcSel.value : 'A';
    const dst = dstSel ? dstSel.value : 'E';

    let graph = {};
    if (TopicPageEngine.dijkstraData.preset === 'pdf') {
      // PDF Page 23-24 Worked Example
      graph = {
        'A': { 'B': 4, 'C': 2 },
        'B': { 'A': 4, 'C': 1, 'D': 5 },
        'C': { 'A': 2, 'B': 1, 'D': 8, 'E': 10 },
        'D': { 'B': 5, 'C': 8, 'E': 2 },
        'E': { 'C': 10, 'D': 2 }
      };
    } else {
      graph = {
        'A': { 'B': 2, 'C': 5, 'D': 1 },
        'B': { 'A': 2, 'C': 3, 'E': 2 },
        'C': { 'A': 5, 'B': 3, 'D': 3, 'E': 1, 'F': 5 },
        'D': { 'A': 1, 'C': 3, 'F': 2 },
        'E': { 'B': 2, 'C': 1, 'F': 1 },
        'F': { 'D': 2, 'C': 5, 'E': 1 }
      };
    }

    const nodes = Object.keys(graph);
    const dist = {};
    const prev = {};
    nodes.forEach(n => {
      dist[n] = Infinity;
      prev[n] = null;
    });
    dist[src] = 0;

    TopicPageEngine.dijkstraData = {
      preset: TopicPageEngine.dijkstraData.preset,
      src: src,
      dst: dst,
      stepIdx: 0,
      graph: graph,
      nodes: nodes,
      dist: dist,
      prev: prev,
      visited: [],
      unvisited: [...nodes],
      stepsHistory: [`Step 0: Initialized source router ${src} with distance 0. All other nodes set to &infin;.`]
    };

    TopicPageEngine.renderDijkstraState();
  },

  stepDijkstra: function() {
    const d = TopicPageEngine.dijkstraData;
    if (!d.graph || d.unvisited.length === 0) return;

    // Find unvisited node with minimum tentative distance
    let u = null;
    let minVal = Infinity;
    d.unvisited.forEach(n => {
      if (d.dist[n] < minVal) {
        minVal = d.dist[n];
        u = n;
      }
    });

    if (!u || minVal === Infinity) {
      d.stepsHistory.push("Remaining nodes are unreachable. Dijkstra execution complete.");
      TopicPageEngine.renderDijkstraState();
      return;
    }

    // Mark u as visited
    d.unvisited = d.unvisited.filter(n => n !== u);
    d.visited.push(u);
    d.stepIdx++;

    let stepLog = `<strong>Step ${d.stepIdx}:</strong> Visited router <strong>${u}</strong> (Current min tentative cost = ${minVal}).`;
    const relaxed = [];

    // Relax all neighbors
    for (let v in d.graph[u]) {
      if (!d.visited.includes(v)) {
        let edgeCost = d.graph[u][v];
        let alt = d.dist[u] + edgeCost;
        if (alt < d.dist[v]) {
          let old = d.dist[v] === Infinity ? '&infin;' : d.dist[v];
          d.dist[v] = alt;
          d.prev[v] = u;
          relaxed.push(`Neighbor <strong>${v}</strong> updated: ${old} &rarr; <strong>${alt}</strong> via ${u}`);
        }
      }
    }

    if (relaxed.length > 0) {
      stepLog += "<br>&nbsp;&nbsp;&bull; " + relaxed.join("<br>&nbsp;&nbsp;&bull; ");
    } else {
      stepLog += "<br>&nbsp;&nbsp;&bull; No neighbor distances improved.";
    }

    d.stepsHistory.push(stepLog);
    TopicPageEngine.renderDijkstraState();
  },

  runAllDijkstra: function() {
    const d = TopicPageEngine.dijkstraData;
    while (d.unvisited && d.unvisited.length > 0) {
      let prevLen = d.unvisited.length;
      TopicPageEngine.stepDijkstra();
      if (d.unvisited.length === prevLen) break;
    }
  },

  resetDijkstra: function() {
    TopicPageEngine.initDijkstraGraph();
  },

  renderDijkstraState: function() {
    const d = TopicPageEngine.dijkstraData;
    if (!d.graph) return;

    const banner = document.getElementById('topic-dijkstra-status-banner');
    const graphBox = document.getElementById('topic-dijkstra-graph-visual');
    const tableBody = document.getElementById('topic-dijkstra-table-body');
    const pathBox = document.getElementById('topic-dijkstra-final-path');
    const stepCountEl = document.getElementById('topic-dijkstra-step-counter');

    if (stepCountEl) stepCountEl.textContent = `Step: ${d.stepIdx} / ${d.nodes.length}`;
    if (banner) {
      banner.innerHTML = d.stepsHistory[d.stepsHistory.length - 1];
    }

    // Render topology representation
    if (graphBox) {
      let visualHtml = `<div class="flex flex-wrap gap-2 justify-center mb-2">`;
      d.nodes.forEach(n => {
        let isVis = d.visited.includes(n);
        let isSrc = n === d.src;
        let isDst = n === d.dst;
        let bg = isVis ? "bg-emerald-600 border-emerald-400" : (d.dist[n] < Infinity ? "bg-amber-600 border-amber-400" : "bg-slate-700 border-slate-600");
        let badge = isSrc ? "(SRC)" : (isDst ? "(DST)" : "");
        visualHtml += `
          <div class="px-2.5 py-1.5 rounded-lg border text-center font-bold text-xs ${bg}">
            <div>Node ${n} ${badge}</div>
            <div class="text-[10px] font-normal text-slate-200">D=${d.dist[n] === Infinity ? '&infin;' : d.dist[n]} | P=${d.prev[n] || '-'}</div>
          </div>
        `;
      });
      visualHtml += `</div>`;

      // Draw active links
      visualHtml += `<div class="text-[11px] text-slate-400 pt-2 border-t border-slate-800">`;
      visualHtml += `<strong>Links & Costs:</strong> `;
      const edges = [];
      d.nodes.forEach(u => {
        for (let v in d.graph[u]) {
          if (u < v) edges.push(`${u}—${v} (cost ${d.graph[u][v]})`);
        }
      });
      visualHtml += edges.join(', ');
      visualHtml += `</div>`;
      graphBox.innerHTML = visualHtml;
    }

    // Render Tentative Table
    if (tableBody) {
      let tHtml = "";
      d.nodes.forEach(n => {
        let isVis = d.visited.includes(n);
        let statusBadge = isVis 
          ? `<span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200 font-bold text-[10px]">Permanent (Visited)</span>`
          : `<span class="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200 font-bold text-[10px]">Tentative</span>`;
        tHtml += `
          <tr class="${isVis ? 'bg-emerald-50/40 dark:bg-emerald-950/20' : ''}">
            <td class="font-bold">Router ${n}</td>
            <td class="font-mono font-bold ${d.dist[n] < Infinity ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}">
              ${d.dist[n] === Infinity ? '&infin;' : d.dist[n]}
            </td>
            <td class="font-mono">${d.prev[n] || '-'}</td>
            <td>${statusBadge}</td>
          </tr>
        `;
      });
      tableBody.innerHTML = tHtml;
    }

    // Render Final Shortest Path if target reached or all nodes visited
    if (pathBox) {
      if (d.dist[d.dst] < Infinity) {
        let curr = d.dst;
        const pathArr = [];
        while (curr) {
          pathArr.unshift(curr);
          curr = d.prev[curr];
        }
        let isComplete = d.unvisited.length === 0 || d.visited.includes(d.dst);
        let equationText = "";
        if (d.preset === 'pdf' && d.src === 'A' && d.dst === 'E') {
          equationText = `<br><span class="text-xs text-gray-500 dark:text-gray-400">&bull; PDF Page 25 Equation: $2 + 1 + 5 + 2 = \\mathbf{10}$ (Via A &rarr; C &rarr; B &rarr; D &rarr; E)</span>`;
        }
        pathBox.innerHTML = `
          <div class="flex items-center justify-between">
            <div>
              <span class="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400">Shortest Path (${d.src} &rarr; ${d.dst}):</span>
              <div class="text-sm font-bold text-gray-900 dark:text-white mt-0.5">
                ${pathArr.join(' &rarr; ')} &nbsp; | &nbsp; Total Cost = <span class="text-emerald-600 dark:text-emerald-400 font-black">${d.dist[d.dst]}</span>
              </div>
              ${equationText}
            </div>
            <span class="px-2.5 py-1 rounded bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100 font-black text-xs">
              ${isComplete ? 'Optimal Route Verified' : 'In Progress...'}
            </span>
          </div>
        `;
      } else {
        pathBox.innerHTML = `<span class="text-gray-500">Destination ${d.dst} not yet reached from ${d.src}.</span>`;
      }
    }
  },

  // 2. CIDR & SUBNET CALCULATOR ENGINE (PDF Pages 91-97)
  setCIDRPreset: function(ip, p) {
    const ipIn = document.getElementById('topic-cidr-ip');
    const slider = document.getElementById('topic-cidr-prefix-slider');
    if (ipIn) ipIn.value = ip;
    if (slider) slider.value = p;
    TopicPageEngine.syncCIDRSlider(p);
  },

  syncCIDRSlider: function(val) {
    const p = parseInt(val);
    const badge = document.getElementById('topic-cidr-prefix-badge');
    if (badge) badge.textContent = `/${p}`;
    TopicPageEngine.runCIDRCalculator();
  },

  runCIDRCalculator: function() {
    const ipIn = document.getElementById('topic-cidr-ip');
    const slider = document.getElementById('topic-cidr-prefix-slider');
    if (!ipIn || !slider) return;

    let ipStr = ipIn.value.trim();
    let parts = ipStr.split('.').map(x => parseInt(x) || 0);
    while (parts.length < 4) parts.push(0);
    parts = parts.slice(0, 4).map(x => Math.min(255, Math.max(0, x)));

    const p = parseInt(slider.value) || 24;
    const hostBits = 32 - p;
    const totalIPs = Math.pow(2, hostBits);
    const usableHosts = (p >= 31) ? (p === 31 ? 2 : 1) : Math.max(0, totalIPs - 2);

    // Calculate 32-bit integer for mask and IP
    let ipInt = ((parts[0] << 24) >>> 0) + ((parts[1] << 16) >>> 0) + ((parts[2] << 8) >>> 0) + (parts[3] >>> 0);
    let maskInt = p === 0 ? 0 : ((0xFFFFFFFF << (32 - p)) >>> 0);
    let netInt = (ipInt & maskInt) >>> 0;
    let bcastInt = (netInt | (~maskInt >>> 0)) >>> 0;

    function intToIP(num) {
      return [
        (num >>> 24) & 255,
        (num >>> 16) & 255,
        (num >>> 8) & 255,
        num & 255
      ].join('.');
    }

    function intToBinary(num) {
      return [
        ((num >>> 24) & 255).toString(2).padStart(8, '0'),
        ((num >>> 16) & 255).toString(2).padStart(8, '0'),
        ((num >>> 8) & 255).toString(2).padStart(8, '0'),
        (num & 255).toString(2).padStart(8, '0')
      ].join('.');
    }

    const maskStr = intToIP(maskInt);
    const netStr = intToIP(netInt);
    const bcastStr = intToIP(bcastInt);
    const firstHost = (p >= 31) ? netStr : intToIP(netInt + 1);
    const lastHost = (p >= 31) ? bcastStr : intToIP(bcastInt - 1);
    const binaryMaskStr = intToBinary(maskInt);

    // Update DOM metrics
    const maskEl = document.getElementById('topic-cidr-mask');
    const totalEl = document.getElementById('topic-cidr-total');
    const usableEl = document.getElementById('topic-cidr-usable');
    const hbitsEl = document.getElementById('topic-cidr-hbits');
    const netidEl = document.getElementById('topic-cidr-netid');
    const rangeEl = document.getElementById('topic-cidr-range');
    const bcastEl = document.getElementById('topic-cidr-bcast');
    const binMaskEl = document.getElementById('topic-cidr-binary-mask');

    if (maskEl) maskEl.textContent = maskStr;
    if (totalEl) totalEl.textContent = totalIPs.toLocaleString();
    if (usableEl) usableEl.textContent = usableHosts.toLocaleString();
    if (hbitsEl) hbitsEl.textContent = `${hostBits} bits`;
    if (netidEl) netidEl.textContent = `${netStr}/${p}`;
    if (rangeEl) rangeEl.textContent = `${firstHost} – ${lastHost}`;
    if (bcastEl) bcastEl.textContent = bcastStr;
    if (binMaskEl) binMaskEl.textContent = binaryMaskStr;

    // Populate PDF Page 96 Subnet Divider Table
    const subTable = document.getElementById('topic-cidr-subnets-table');
    if (subTable) {
      // Subdivide base network into 4 equal subnets (borrowing 2 bits: s = 2, subnets = 4)
      const subPrefix = Math.min(30, p + 2);
      const numSubnets = 4;
      const subSize = Math.pow(2, 32 - subPrefix);
      const subUsable = (subPrefix >= 31) ? (subPrefix === 31 ? 2 : 1) : subSize - 2;

      let rowsHtml = "";
      for (let s = 0; s < numSubnets; s++) {
        let sNet = (netInt + s * subSize) >>> 0;
        let sBcast = (sNet + subSize - 1) >>> 0;
        let sFirst = (subPrefix >= 31) ? intToIP(sNet) : intToIP(sNet + 1);
        let sLast = (subPrefix >= 31) ? intToIP(sBcast) : intToIP(sBcast - 1);

        rowsHtml += `
          <tr class="hover:bg-blue-50/40 dark:hover:bg-gray-700/40">
            <td class="font-bold text-center text-blue-600 dark:text-blue-400">Subnet ${s + 1}</td>
            <td class="font-mono font-bold text-gray-900 dark:text-white">${intToIP(sNet)}/${subPrefix}</td>
            <td class="font-mono text-emerald-600 dark:text-emerald-400">${sFirst} &ndash; ${sLast}</td>
            <td class="font-mono text-rose-600 dark:text-rose-400">${intToIP(sBcast)}</td>
            <td class="font-bold">${subUsable} Hosts</td>
          </tr>
        `;
      }
      subTable.innerHTML = rowsHtml;
    }
  },

  // 3. DISTANCE VECTOR & COUNT-TO-INFINITY ENGINE (PDF Pages 28-32)
  dvState: {
    round: 0,
    linkFailed: false,
    aDistX: 2,
    aNextX: 'B',
    bDistX: 1,
    bNextX: 'Direct',
    log: []
  },

  setDVPreset: function(mode) {
    if (mode === 'normal') {
      TopicPageEngine.resetDV();
    } else {
      TopicPageEngine.triggerDVLinkFailure();
    }
  },

  resetDV: function() {
    TopicPageEngine.dvState = {
      round: 0,
      linkFailed: false,
      aDistX: 2,
      aNextX: 'B',
      bDistX: 1,
      bNextX: 'Direct',
      log: ["Network initialized in stable state: Router A reaches Dest X via Router B (Cost = 2). Router B has direct link to X (Cost = 1)."]
    };
    TopicPageEngine.renderDVTables();
  },

  triggerDVLinkFailure: function() {
    const s = TopicPageEngine.dvState;
    s.linkFailed = true;
    s.round++;
    s.log.push(`<strong>[Round ${s.round}] LINK FAILURE:</strong> Physical link between Router B and Destination X went down! c(B, X) = &infin;`);
    TopicPageEngine.renderDVTables();
  },

  stepDVIteration: function() {
    const s = TopicPageEngine.dvState;
    s.round++;

    const splitHorizon = document.getElementById('topic-dv-split-horizon')?.checked;
    const poisonReverse = document.getElementById('topic-dv-poison-reverse')?.checked;

    if (!s.linkFailed) {
      s.log.push(`<strong>[Round ${s.round}] Stable Periodic Advertisement:</strong> Routers exchange vectors. No topology changes; distances remain A=2, B=1.`);
      TopicPageEngine.renderDVTables();
      return;
    }

    // Link is failed: evaluate Count-to-Infinity vs Split Horizon
    if (splitHorizon || poisonReverse) {
      // Loop Prevention Active!
      if (poisonReverse) {
        s.log.push(`<strong>[Round ${s.round}] Poison Reverse Active:</strong> Router A learned route to X through B, so A advertises $D_A(X) = 16$ (&infin;) back to B.<br>&bull; Router B sees direct link failed AND neighbor A advertises &infin;. B immediately sets $D_B(X) = 16$. Loop prevented in 1 round!`);
      } else {
        s.log.push(`<strong>[Round ${s.round}] Split Horizon Active:</strong> Router A learned route to X via B, so A suppresses advertising X back to B.<br>&bull; Router B has no alternate neighbor route to X. B immediately sets $D_B(X) = 16$ (&infin;). Loop prevented in 1 round!`);
      }
      s.bDistX = 16;
      s.bNextX = 'None (Unreachable)';
      s.aDistX = 16;
      s.aNextX = 'None (Unreachable)';
    } else {
      // Classic Count-to-Infinity (PDF Pages 30-31)
      if (s.bDistX < 16) {
        s.bDistX = s.aDistX + 1;
        s.bNextX = 'A';
        s.log.push(`<strong>[Round ${s.round}] Count-to-Infinity Step:</strong> Router B falsely believes it can reach X through Router A! Sets $D_B(X) = c(B, A) + D_A(X) = 1 + ${s.aDistX} = ${s.bDistX}$ via A.`);
        
        s.aDistX = s.bDistX + 1;
        s.aNextX = 'B';
        s.log.push(`&nbsp;&nbsp;&bull; Router A then hears B's new distance and updates $D_A(X) = c(A, B) + D_B(X) = 1 + ${s.bDistX} = ${s.aDistX}$ via B.`);

        if (s.aDistX >= 16 || s.bDistX >= 16) {
          s.aDistX = 16;
          s.bDistX = 16;
          s.aNextX = 'None (&infin;)';
          s.bNextX = 'None (&infin;)';
          s.log.push(`&nbsp;&nbsp;&bull; <strong>RIP Metric Limit Reached:</strong> Both routers reached distance 16 (&infin;). Destination X marked unreachable.`);
        }
      } else {
        s.log.push(`<strong>[Round ${s.round}]</strong> Convergence complete at infinity (16).`);
      }
    }

    TopicPageEngine.renderDVTables();
  },

  renderDVTables: function() {
    const s = TopicPageEngine.dvState;
    const tA = document.getElementById('topic-dv-table-a');
    const tB = document.getElementById('topic-dv-table-b');
    const logBox = document.getElementById('topic-dv-log');

    if (tA) {
      tA.innerHTML = `
        <tr><td>Dest B</td><td class="font-bold text-blue-600">1</td><td>Direct</td></tr>
        <tr class="${s.aDistX >= 16 ? 'bg-rose-50 dark:bg-rose-950/40' : (s.linkFailed ? 'bg-amber-50 dark:bg-amber-950/40' : '')}">
          <td class="font-bold">Dest X</td>
          <td class="font-mono font-black ${s.aDistX >= 16 ? 'text-rose-600' : 'text-blue-600'}">${s.aDistX >= 16 ? '16 (&infin;)' : s.aDistX}</td>
          <td class="font-mono">${s.aNextX}</td>
        </tr>
      `;
    }

    if (tB) {
      tB.innerHTML = `
        <tr><td>Dest A</td><td class="font-bold text-purple-600">1</td><td>Direct</td></tr>
        <tr class="${s.bDistX >= 16 ? 'bg-rose-50 dark:bg-rose-950/40' : (s.linkFailed ? 'bg-amber-50 dark:bg-amber-950/40' : '')}">
          <td class="font-bold">Dest X</td>
          <td class="font-mono font-black ${s.bDistX >= 16 ? 'text-rose-600' : 'text-purple-600'}">${s.bDistX >= 16 ? '16 (&infin;)' : s.bDistX}</td>
          <td class="font-mono">${s.bNextX}</td>
        </tr>
      `;
    }

    if (logBox) {
      logBox.innerHTML = s.log.map(entry => `<div class="mb-1.5 pb-1 border-b border-slate-800 last:border-0">${entry}</div>`).join("");
      logBox.scrollTop = logBox.scrollHeight;
    }
  },

  // 4. CONGESTION CONTROL & TRAFFIC SHAPER (PDF Pages 42-58)
  shaperState: {
    mode: 'leaky', // 'leaky' or 'token'
    capacity: 10,
    rate: 3,
    buffer: 0,
    tokens: 10,
    totalIn: 0,
    totalOut: 0,
    totalDrop: 0,
    totalECN: 0
  },

  initCongestionShaper: function() {
    TopicPageEngine.updateShaperParams();
    TopicPageEngine.renderShaperState();
  },

  setShaperMode: function(mode) {
    TopicPageEngine.shaperState.mode = mode;
    const btnL = document.getElementById('cs-btn-leaky');
    const btnT = document.getElementById('cs-btn-token');
    if (btnL && btnT) {
      if (mode === 'leaky') {
        btnL.className = "sim-btn text-xs py-1 px-3";
        btnT.className = "sim-btn secondary text-xs py-1 px-3";
      } else {
        btnL.className = "sim-btn secondary text-xs py-1 px-3";
        btnT.className = "sim-btn text-xs py-1 px-3";
      }
    }
    TopicPageEngine.renderShaperState();
  },

  updateShaperParams: function() {
    const capEl = document.getElementById('topic-shaper-cap');
    const rateEl = document.getElementById('topic-shaper-rate');
    const capVal = document.getElementById('topic-shaper-cap-val');
    const rateVal = document.getElementById('topic-shaper-rate-val');

    if (capEl && rateEl) {
      TopicPageEngine.shaperState.capacity = parseInt(capEl.value) || 10;
      TopicPageEngine.shaperState.rate = parseInt(rateEl.value) || 3;
      if (capVal) capVal.textContent = `${TopicPageEngine.shaperState.capacity} pkts`;
      if (rateVal) rateVal.textContent = `${TopicPageEngine.shaperState.rate} pkts/s`;
    }
    TopicPageEngine.renderShaperState();
  },

  injectShaperBurst: function(count) {
    const s = TopicPageEngine.shaperState;
    const ecnChecked = document.getElementById('topic-shaper-ecn')?.checked;
    s.totalIn += count;

    if (s.mode === 'leaky') {
      let space = s.capacity - s.buffer;
      let accepted = Math.min(count, space);
      let dropped = count - accepted;
      s.buffer += accepted;
      s.totalDrop += dropped;
      if (ecnChecked && (s.buffer / s.capacity) >= 0.7) {
        s.totalECN += accepted;
      }
    } else {
      // Token Bucket: tokens allow immediate transmission
      let tokensUsed = Math.min(count, s.tokens);
      s.tokens -= tokensUsed;
      s.totalOut += tokensUsed;
      let remaining = count - tokensUsed;
      let space = s.capacity - s.buffer;
      let accepted = Math.min(remaining, space);
      s.buffer += accepted;
      s.totalDrop += (remaining - accepted);
      if (ecnChecked && (s.buffer / s.capacity) >= 0.7) {
        s.totalECN += accepted;
      }
    }

    TopicPageEngine.renderShaperState();
  },

  stepShaperClock: function() {
    const s = TopicPageEngine.shaperState;
    if (s.mode === 'leaky') {
      // Leaks packets out at constant rate
      let leaked = Math.min(s.buffer, s.rate);
      s.buffer -= leaked;
      s.totalOut += leaked;
    } else {
      // Generates tokens at rate R up to capacity
      s.tokens = Math.min(s.capacity, s.tokens + s.rate);
      // Drains queued buffer using available tokens
      let drained = Math.min(s.buffer, s.tokens);
      s.buffer -= drained;
      s.tokens -= drained;
      s.totalOut += drained;
    }
    TopicPageEngine.renderShaperState();
  },

  resetShaper: function() {
    TopicPageEngine.shaperState.buffer = 0;
    TopicPageEngine.shaperState.tokens = TopicPageEngine.shaperState.capacity;
    TopicPageEngine.shaperState.totalIn = 0;
    TopicPageEngine.shaperState.totalOut = 0;
    TopicPageEngine.shaperState.totalDrop = 0;
    TopicPageEngine.shaperState.totalECN = 0;
    TopicPageEngine.renderShaperState();
  },

  renderShaperState: function() {
    const s = TopicPageEngine.shaperState;
    const bar = document.getElementById('topic-shaper-bar');
    const lbl = document.getElementById('topic-shaper-occupancy-label');
    const inEl = document.getElementById('topic-shaper-stat-in');
    const outEl = document.getElementById('topic-shaper-stat-out');
    const dropEl = document.getElementById('topic-shaper-stat-drop');
    const ecnEl = document.getElementById('topic-shaper-stat-ecn');

    const pct = Math.min(100, Math.round((s.buffer / s.capacity) * 100));
    if (bar) {
      bar.style.width = `${pct}%`;
      if (pct > 80) bar.className = "h-full bg-rose-500 transition-all duration-300";
      else if (pct > 60) bar.className = "h-full bg-amber-500 transition-all duration-300";
      else bar.className = "h-full bg-emerald-500 transition-all duration-300";
    }

    if (lbl) {
      if (s.mode === 'leaky') {
        lbl.textContent = `${s.buffer} / ${s.capacity} Pkts in Queue (${pct}%)`;
      } else {
        lbl.textContent = `Queue: ${s.buffer}/${s.capacity} Pkts | Tokens Available: ${s.tokens}/${s.capacity}`;
      }
    }

    if (inEl) inEl.textContent = s.totalIn;
    if (outEl) outEl.textContent = s.totalOut;
    if (dropEl) dropEl.textContent = s.totalDrop;
    if (ecnEl) ecnEl.textContent = s.totalECN;
  },

  // 5. LAYER 3 HEADER INSPECTOR (IPv4 vs IPv6) (PDF Pages 84-102)
  ipHeaderData: {
    v4: [
      { name: "Version", bits: 4, val: "0100 (4)", offset: "0-3", desc: "Always set to 4 for IPv4 datagrams. Discarded if protocol stack does not match." },
      { name: "IHL (Header Length)", bits: 4, val: "0101 (5 words = 20B)", offset: "4-7", desc: "Internet Header Length measured in 32-bit (4-byte) words. Minimum is 5 (20 bytes); maximum is 15 (60 bytes)." },
      { name: "DSCP / ToS & ECN", bits: 8, val: "0000 0000", offset: "8-15", desc: "Differentiated Services Code Point (6 bits) for QoS traffic class priority + Explicit Congestion Notification (2 bits: ECT, CE)." },
      { name: "Total Length", bits: 16, val: "1500 (Bytes)", offset: "16-31", desc: "Entire datagram size (header + payload) in bytes. Maximum theoretical size is 65,535 bytes." },
      { name: "Identification", bits: 16, val: "0x1A2B (6699)", offset: "32-47", desc: "Unique datagram ID assigned by source host, copied to all fragments so reassembly engine can unite them." },
      { name: "Flags (DF, MF)", bits: 3, val: "010 (DF=1, MF=0)", offset: "48-50", desc: "Bit 0: Reserved (0). Bit 1: DF (Don't Fragment). Bit 2: MF (More Fragments - 1 if intermediate fragment, 0 if last)." },
      { name: "Fragment Offset", bits: 13, val: "0 (Units of 8B)", offset: "51-63", desc: "Specifies where in original datagram this fragment belongs, measured in 8-byte (64-bit) units." },
      { name: "TTL (Time to Live)", bits: 8, val: "64 (Hops)", offset: "64-71", desc: "Hop counter decremented by 1 at every router. If TTL reaches 0, router drops packet and sends ICMP Time Exceeded (Type 11) to prevent routing loops." },
      { name: "Protocol", bits: 8, val: "6 (TCP) / 17 (UDP)", offset: "72-79", desc: "Identifies demultiplexing target protocol at destination: 1=ICMP, 6=TCP, 17=UDP, 89=OSPF." },
      { name: "Header Checksum", bits: 16, val: "0x4A6C (1's Compl)", offset: "80-95", desc: "1's complement sum covering ONLY the IP header. Must be recomputed at every router because TTL changes! Removed in IPv6." },
      { name: "Source IP Address", bits: 32, val: "192.168.1.10", offset: "96-127", desc: "32-bit logical address of sending host interface." },
      { name: "Destination IP Address", bits: 32, val: "203.0.113.20", offset: "128-159", desc: "32-bit logical address of ultimate target interface. Used by routers for forwarding table longest-prefix lookup." }
    ],
    v6: [
      { name: "Version", bits: 4, val: "0110 (6)", offset: "0-3", desc: "Always set to 6 (binary 0110) for IPv6." },
      { name: "Traffic Class", bits: 8, val: "0000 0000", offset: "4-11", desc: "Equivalent to IPv4 DSCP + ECN fields for QoS packet classification and congestion marking." },
      { name: "Flow Label", bits: 20, val: "0x3FA91", offset: "12-31", desc: "Identifies packets belonging to same communication flow (e.g. real-time audio/video streaming) for non-default per-flow routing." },
      { name: "Payload Length", bits: 16, val: "1460 (Bytes)", offset: "32-47", desc: "Size of payload in bytes following the fixed 40-byte base header (includes extension headers)." },
      { name: "Next Header", bits: 8, val: "6 (TCP) / 58 (ICMPv6)", offset: "48-55", desc: "Replaces IPv4 Protocol field. Identifies either the upper-layer protocol (TCP/UDP) or the next daisy-chained extension header (Routing, Fragment, Hop-by-Hop)." },
      { name: "Hop Limit", bits: 8, val: "64", offset: "56-63", desc: "Replaces IPv4 TTL. Decremented by 1 at each router. Discarded with ICMPv6 Time Exceeded if it hits 0." },
      { name: "Source IPv6 Address", bits: 128, val: "2001:db8:acad::1", offset: "64-191", desc: "128-bit globally routable or link-local address of originating interface." },
      { name: "Destination IPv6 Address", bits: 128, val: "2001:db8:85a3::8a2e", offset: "192-319", desc: "128-bit unicast, multicast, or anycast address of final destination." }
    ]
  },

  switchIPHeaderType: function(type) {
    const btnV4 = document.getElementById('iph-tab-v4');
    const btnV6 = document.getElementById('iph-tab-v6');
    const container = document.getElementById('iph-blocks-container');
    if (!container) return;

    if (btnV4 && btnV6) {
      if (type === 'v4') {
        btnV4.className = "sim-btn text-xs py-1 px-3";
        btnV6.className = "sim-btn secondary text-xs py-1 px-3";
      } else {
        btnV4.className = "sim-btn secondary text-xs py-1 px-3";
        btnV6.className = "sim-btn text-xs py-1 px-3";
      }
    }

    const fields = TopicPageEngine.ipHeaderData[type];
    let html = `<div class="grid grid-cols-4 gap-1 text-center font-mono text-[11px]">`;
    fields.forEach((f, idx) => {
      let colSpan = "col-span-1";
      if (f.bits === 16) colSpan = "col-span-2";
      if (f.bits === 20) colSpan = "col-span-2";
      if (f.bits === 32) colSpan = "col-span-4";
      if (f.bits === 128) colSpan = "col-span-4";

      html += `
        <div class="${colSpan} p-2 rounded border border-blue-300 dark:border-blue-800 bg-white dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 cursor-pointer shadow-sm transition-colors" onclick="TopicPageEngine.inspectIPField('${type}', ${idx})">
          <div class="font-bold text-gray-900 dark:text-white truncate">${f.name}</div>
          <div class="text-[10px] text-blue-600 dark:text-blue-300">${f.bits}b &bull; ${f.val}</div>
        </div>
      `;
    });
    html += `</div>`;
    container.innerHTML = html;

    TopicPageEngine.inspectIPField(type, 0);
  },

  inspectIPField: function(type, idx) {
    const f = TopicPageEngine.ipHeaderData[type][idx];
    const tEl = document.getElementById('iph-field-title');
    const mEl = document.getElementById('iph-field-meta');
    const dEl = document.getElementById('iph-field-desc');
    if (!f || !tEl) return;

    tEl.textContent = `${f.name} Field`;
    if (mEl) mEl.textContent = `Width: ${f.bits} Bits | Value: ${f.val} | Offset: Bits ${f.offset}`;
    if (dEl) {
      let extraNote = "";
      if (type === 'v6' && f.name === 'Next Header') {
        extraNote = `<br><span class="text-blue-600 dark:text-blue-400 font-bold">&bull; IPv6 Innovation:</span> Extension headers (Fragment, Routing, Hop-by-Hop) are linked in a singly linked list!`;
      }
      if (type === 'v4' && f.name === 'Header Checksum') {
        extraNote = `<br><span class="text-amber-600 dark:text-amber-400 font-bold">&bull; Removed in IPv6:</span> Link-layer CRC (Layer 2) and TCP/UDP checksums (Layer 4) already ensure data integrity; dropping Layer 3 checksum dramatically accelerates router throughput!`;
      }
      dEl.innerHTML = `${f.desc} ${extraNote}`;
    }
  },


  handshakeStepCount: 0,
  stepHandshake: function() {
    TopicPageEngine.handshakeStepCount++;
    const list = document.getElementById('handshake-steps-list');
    const label = document.getElementById('handshake-phase-label');
    if (!list || !label) return;

    if (TopicPageEngine.handshakeStepCount === 1) {
      label.innerText = "Step 1: Client SYN";
      label.style.color = "#0284c7";
      list.innerHTML = `
        <div style="background: #e0f2fe; border: 1px solid #7dd3fc; padding: 0.75rem; border-radius: 8px;">
          <strong>[Step 1] Client ➔ Server:</strong> <code>SYN = 1, Seq = 1000, MSS = 1460</code><br>
          <span style="font-size: 0.8rem; color: #0369a1;">Client transitions to <strong>SYN_SENT</strong>. Initiates connection.</span>
        </div>
      `;
    } else if (TopicPageEngine.handshakeStepCount === 2) {
      label.innerText = "Step 2: Server SYN+ACK";
      label.style.color = "#f59e0b";
      list.innerHTML += `
        <div style="background: #fef3c7; border: 1px solid #fcd34d; padding: 0.75rem; border-radius: 8px;">
          <strong>[Step 2] Server ➔ Client:</strong> <code>SYN = 1, ACK = 1, Seq = 5000, Ack = 1001</code><br>
          <span style="font-size: 0.8rem; color: #b45309;">Server transitions to <strong>SYN_RCVD</strong>. Confirms client SYN, establishes return sequence.</span>
        </div>
      `;
    } else if (TopicPageEngine.handshakeStepCount === 3) {
      label.innerText = "Step 3: Client ACK (ESTABLISHED)";
      label.style.color = "#10b981";
      list.innerHTML += `
        <div style="background: #dcfce7; border: 1px solid #86efac; padding: 0.75rem; border-radius: 8px;">
          <strong>[Step 3] Client ➔ Server:</strong> <code>ACK = 1, Seq = 1001, Ack = 5001</code><br>
          <span style="font-size: 0.8rem; color: #15803d;">Both endpoints in <strong>ESTABLISHED</strong> state! Payload data transfer can now begin.</span>
        </div>
      `;
    } else {
      TopicPageEngine.resetHandshake();
    }
  },

  resetHandshake: function() {
    TopicPageEngine.handshakeStepCount = 0;
    const list = document.getElementById('handshake-steps-list');
    const label = document.getElementById('handshake-phase-label');
    if (list) list.innerHTML = `<div style="font-size: 0.88rem; color: #64748b;">Ready: Click "Step Forward Handshake ➔"</div>`;
    if (label) {
      label.innerText = "Ready to Begin";
      label.style.color = "#7c3aed";
    }
  },

  runDNSSimulator: function() {
    const qEl = document.getElementById('topic-dns-query');
    const out = document.getElementById('topic-dns-output');
    if (!qEl || !out) return;

    const query = qEl.value.trim() || "www.wikipedia.org";
    out.innerHTML = `
      <span style="color: #38bdf8;">[1] Client ➔ Local Recursive Resolver (8.8.8.8):</span> "Resolve ${query}"<br>
      <span style="color: #facc15;">[2] Resolver ➔ Root Server (198.41.0.4 [a.root-servers.net]):</span> "Where is ${query}?"<br>
      &nbsp;&nbsp;&nbsp;&nbsp;↳ Root replies: "Referral: Consult .ORG TLD Server at 199.19.56.1"<br>
      <span style="color: #facc15;">[3] Resolver ➔ .ORG TLD Server (199.19.56.1):</span> "Where is ${query}?"<br>
      &nbsp;&nbsp;&nbsp;&nbsp;↳ TLD replies: "Referral: Consult Authoritative ns0.wikimedia.org at 208.80.154.238"<br>
      <span style="color: #facc15;">[4] Resolver ➔ Authoritative Server (208.80.154.238):</span> "What is Type A for ${query}?"<br>
      &nbsp;&nbsp;&nbsp;&nbsp;↳ Authoritative replies: <strong>Type A: 208.80.154.224, TTL = 3600</strong><br>
      <span style="color: #10b981; font-weight: 800;">[5] Resolver ➔ Client:</span> Success! IP Address is <strong>208.80.154.224</strong> (Cached for 1 hour).
    `;
  },

  runRSACalculator: function() {
    const pEl = document.getElementById('topic-rsa-p');
    const qEl = document.getElementById('topic-rsa-q');
    const mEl = document.getElementById('topic-rsa-msg');
    const out = document.getElementById('topic-rsa-output');
    if (!pEl || !qEl || !mEl || !out) return;

    const p = parseInt(pEl.value) || 61;
    const q = parseInt(qEl.value) || 53;
    const m = parseInt(mEl.value) || 65;

    const n = p * q;
    const phi = (p - 1) * (q - 1);

    function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
    let e = 17;
    while (gcd(e, phi) !== 1 && e < phi) {
      e += 2;
    }

    function extGCD(a, b) {
      if (b === 0) return { g: a, x: 1, y: 0 };
      const d = extGCD(b, a % b);
      return { g: d.g, x: d.y, y: d.x - Math.floor(a / b) * d.y };
    }
    let res = extGCD(e, phi);
    let d = ((res.x % phi) + phi) % phi;

    function modPow(base, exp, mod) {
      let r = 1n;
      let b = BigInt(base) % BigInt(mod);
      let e = BigInt(exp);
      let m = BigInt(mod);
      while (e > 0n) {
        if (e % 2n === 1n) r = (r * b) % m;
        b = (b * b) % m;
        e = e / 2n;
      }
      return Number(r);
    }

    const c = modPow(m, e, n);
    const decrypted = modPow(c, d, n);

    out.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
        <div>
          <strong>1. Modulus:</strong> $n = p \\times q = ${p} \\times ${q} = ${n}$<br>
          <strong>2. Totient:</strong> $\\phi(n) = (${p}-1)(${q}-1) = ${phi}$<br>
          <strong>3. Public Exponent:</strong> $e = ${e}$ (coprime to $\\phi(n)$)<br>
          <strong>4. Private Exponent:</strong> $d = ${d}$ ($e \\cdot d \\equiv 1 \\pmod{\\phi(n)}$)
        </div>
        <div>
          <strong>PUBLIC KEY:</strong> $(n = ${n}, e = ${e})$<br>
          <strong>PRIVATE KEY:</strong> $(n = ${n}, d = ${d})$<br>
          <strong>ENCRYPTION:</strong> $C = ${m}^{${e}} \\pmod{${n}} =$ <strong style="color: #7c3aed;">${c}</strong><br>
          <strong>DECRYPTION:</strong> $M = ${c}^{${d}} \\pmod{${n}} =$ <strong style="color: #10b981;">${decrypted}</strong> (Matches original ${m}!)
        </div>
      </div>
    `;

    setTimeout(() => {
      if (window.renderMathInElement) {
        renderMathInElement(out, {
          delimiters: [{left: '$', right: '$', display: false}],
          throwOnError: false
        });
      }
    }, 20);
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TOPIC_REPOSITORY, TopicPageEngine };
}
