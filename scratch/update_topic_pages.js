const fs = require('fs');
let content = fs.readFileSync('js/topicPages.js', 'utf8');

const target1 = 'typeof TOPICS_U2_EXT !== \'undefined\' ? TOPICS_U2_EXT : (typeof window !== \'undefined\' && window.TOPICS_U2_EXT ? window.TOPICS_U2_EXT : {}),';
const repl1 = target1 + '\r\n  typeof TOPICS_U2_SYLLABUS !== \'undefined\' ? TOPICS_U2_SYLLABUS : (typeof window !== \'undefined\' && window.TOPICS_U2_SYLLABUS ? window.TOPICS_U2_SYLLABUS : {}),';

if (!content.includes('TOPICS_U2_SYLLABUS')) {
  if (content.includes(target1)) {
    content = content.replace(target1, repl1);
  } else {
    // try with LF
    const target1LF = target1.replace(/\r\n/g, '\n');
    content = content.replace(target1LF, repl1.replace(/\r\n/g, '\n'));
  }
}

// Update TOPIC_CHAPTER_MAP for Unit 2
const oldUnit2MapStart = 'const TOPIC_CHAPTER_MAP = {';
const oldUnit2MapEnd = '// Unit 3: Master Pedagogical Hierarchy Mapping from Syllabus PDF';

const newUnit2Map = `const TOPIC_CHAPTER_MAP = {
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

  `;

const startIdx = content.indexOf(oldUnit2MapStart);
const endIdx = content.indexOf(oldUnit2MapEnd);

if (startIdx === -1 || endIdx === -1) {
  console.error('Map boundaries not found');
  process.exit(1);
}

content = content.slice(0, startIdx) + newUnit2Map + content.slice(endIdx);
fs.writeFileSync('js/topicPages.js', content, 'utf8');
console.log('Successfully updated js/topicPages.js');

