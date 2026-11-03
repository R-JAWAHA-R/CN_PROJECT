const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'js', 'topicPages.js');
let content = fs.readFileSync(filePath, 'utf8');

// Find boundaries
const startMarker = '"transport-layer": {';
const endMarker = '"tcp-congestion-control": {';

const startIndex = content.indexOf(startMarker);
if (startIndex === -1) {
    console.error("Could not find startMarker!");
    process.exit(1);
}

const endPartIndex = content.indexOf(endMarker, startIndex);
if (endPartIndex === -1) {
    console.error("Could not find endMarker!");
    process.exit(1);
}

// Find closing brace and comma of tcp-congestion-control
const closeBraceIndex = content.indexOf('},', endPartIndex);
const endIndex = closeBraceIndex + 2;

console.log("Replacing from", startIndex, "to", endIndex);
console.log("Replaced text preview:", content.substring(startIndex, startIndex + 60));

const newBlock = `// ================= UNIT 4 - TRANSPORT LAYER =================
  // TOPIC 1 – TRANSPORT LAYER SERVICES AND BERKELEY SOCKETS
  "u4-transport-services": {
      "chapNum": 1,
      "chapTitle": "Topic 1 – Transport Layer Services and Berkeley Sockets",
      "unitId": "unit4",
      "unit": "Unit 4 – Transport Layer"
  },
  "u4-berkeley-sockets": {
      "chapNum": 1,
      "chapTitle": "Topic 1 – Transport Layer Services and Berkeley Sockets",
      "unitId": "unit4",
      "unit": "Unit 4 – Transport Layer"
  },
  "u4-socket-programming-example": {
      "chapNum": 1,
      "chapTitle": "Topic 1 – Transport Layer Services and Berkeley Sockets",
      "unitId": "unit4",
      "unit": "Unit 4 – Transport Layer"
  },
  "transport-layer": {
      "chapNum": 1,
      "chapTitle": "Topic 1 – Transport Layer Services and Berkeley Sockets",
      "unitId": "unit4",
      "unit": "Unit 4 – Transport Layer"
  },

  // TOPIC 2 – ELEMENTS OF TRANSPORT PROTOCOLS
  "u4-transport-addressing": {
      "chapNum": 2,
      "chapTitle": "Topic 2 – Elements of Transport Protocols",
      "unitId": "unit4",
      "unit": "Unit 4 – Transport Layer"
  },
  "u4-connection-establishment": {
      "chapNum": 2,
      "chapTitle": "Topic 2 – Elements of Transport Protocols",
      "unitId": "unit4",
      "unit": "Unit 4 – Transport Layer"
  },
  "u4-connection-release": {
      "chapNum": 2,
      "chapTitle": "Topic 2 – Elements of Transport Protocols",
      "unitId": "unit4",
      "unit": "Unit 4 – Transport Layer"
  },
  "u4-flow-control-buffering": {
      "chapNum": 2,
      "chapTitle": "Topic 2 – Elements of Transport Protocols",
      "unitId": "unit4",
      "unit": "Unit 4 – Transport Layer"
  },

  // TOPIC 3 – UDP (USER DATAGRAM PROTOCOL)
  "u4-intro-udp": {
      "chapNum": 3,
      "chapTitle": "Topic 3 – UDP (User Datagram Protocol)",
      "unitId": "unit4",
      "unit": "Unit 4 – Transport Layer"
  },
  "u4-udp-services-characteristics": {
      "chapNum": 3,
      "chapTitle": "Topic 3 – UDP (User Datagram Protocol)",
      "unitId": "unit4",
      "unit": "Unit 4 – Transport Layer"
  },
  "u4-udp-segment-format": {
      "chapNum": 3,
      "chapTitle": "Topic 3 – UDP (User Datagram Protocol)",
      "unitId": "unit4",
      "unit": "Unit 4 – Transport Layer"
  },
  "u4-udp-vs-tcp": {
      "chapNum": 3,
      "chapTitle": "Topic 3 – UDP (User Datagram Protocol)",
      "unitId": "unit4",
      "unit": "Unit 4 – Transport Layer"
  },
  "udp": {
      "chapNum": 3,
      "chapTitle": "Topic 3 – UDP (User Datagram Protocol)",
      "unitId": "unit4",
      "unit": "Unit 4 – Transport Layer"
  },
  "udp-header": {
      "chapNum": 3,
      "chapTitle": "Topic 3 – UDP (User Datagram Protocol)",
      "unitId": "unit4",
      "unit": "Unit 4 – Transport Layer"
  },

  // TOPIC 4 – TCP (TRANSMISSION CONTROL PROTOCOL)
  "u4-intro-tcp": {
      "chapNum": 4,
      "chapTitle": "Topic 4 – TCP (Transmission Control Protocol)",
      "unitId": "unit4",
      "unit": "Unit 4 – Transport Layer"
  },
  "u4-tcp-segment-header": {
      "chapNum": 4,
      "chapTitle": "Topic 4 – TCP (Transmission Control Protocol)",
      "unitId": "unit4",
      "unit": "Unit 4 – Transport Layer"
  },
  "u4-tcp-connection-establishment": {
      "chapNum": 4,
      "chapTitle": "Topic 4 – TCP (Transmission Control Protocol)",
      "unitId": "unit4",
      "unit": "Unit 4 – Transport Layer"
  },
  "u4-tcp-connection-release": {
      "chapNum": 4,
      "chapTitle": "Topic 4 – TCP (Transmission Control Protocol)",
      "unitId": "unit4",
      "unit": "Unit 4 – Transport Layer"
  },
  "u4-tcp-sliding-window": {
      "chapNum": 4,
      "chapTitle": "Topic 4 – TCP (Transmission Control Protocol)",
      "unitId": "unit4",
      "unit": "Unit 4 – Transport Layer"
  },
  "u4-tcp-timer-management": {
      "chapNum": 4,
      "chapTitle": "Topic 4 – TCP (Transmission Control Protocol)",
      "unitId": "unit4",
      "unit": "Unit 4 – Transport Layer"
  },
  "tcp": {
      "chapNum": 4,
      "chapTitle": "Topic 4 – TCP (Transmission Control Protocol)",
      "unitId": "unit4",
      "unit": "Unit 4 – Transport Layer"
  },
  "tcp-three-way-handshake": {
      "chapNum": 4,
      "chapTitle": "Topic 4 – TCP (Transmission Control Protocol)",
      "unitId": "unit4",
      "unit": "Unit 4 – Transport Layer"
  },
  "tcp-header": {
      "chapNum": 4,
      "chapTitle": "Topic 4 – TCP (Transmission Control Protocol)",
      "unitId": "unit4",
      "unit": "Unit 4 – Transport Layer"
  },
  "sequence-number": {
      "chapNum": 4,
      "chapTitle": "Topic 4 – TCP (Transmission Control Protocol)",
      "unitId": "unit4",
      "unit": "Unit 4 – Transport Layer"
  },
  "acknowledgement": {
      "chapNum": 4,
      "chapTitle": "Topic 4 – TCP (Transmission Control Protocol)",
      "unitId": "unit4",
      "unit": "Unit 4 – Transport Layer"
  },
  "tcp-flow-control": {
      "chapNum": 4,
      "chapTitle": "Topic 4 – TCP (Transmission Control Protocol)",
      "unitId": "unit4",
      "unit": "Unit 4 – Transport Layer"
  },

  // TOPIC 5 – CONGESTION CONTROL
  "u4-intro-congestion-control": {
      "chapNum": 5,
      "chapTitle": "Topic 5 – Congestion Control",
      "unitId": "unit4",
      "unit": "Unit 4 – Transport Layer"
  },
  "u4-congestion-control-mechanisms": {
      "chapNum": 5,
      "chapTitle": "Topic 5 – Congestion Control",
      "unitId": "unit4",
      "unit": "Unit 4 – Transport Layer"
  },
  "u4-tcp-congestion-control": {
      "chapNum": 5,
      "chapTitle": "Topic 5 – Congestion Control",
      "unitId": "unit4",
      "unit": "Unit 4 – Transport Layer"
  },
  "u4-congestion-network-performance": {
      "chapNum": 5,
      "chapTitle": "Topic 5 – Congestion Control",
      "unitId": "unit4",
      "unit": "Unit 4 – Transport Layer"
  },
  "tcp-congestion-control": {
      "chapNum": 5,
      "chapTitle": "Topic 5 – Congestion Control",
      "unitId": "unit4",
      "unit": "Unit 4 – Transport Layer"
  },`;

content = content.substring(0, startIndex) + newBlock + content.substring(endIndex);
fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully updated js/topicPages.js!");
