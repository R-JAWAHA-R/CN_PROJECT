// Unit II Extended Topics Database: Data Link Layer, MAC Sublayer & Network Devices
// Aligned with Tanenbaum & Wetherall (6th Ed.), Forouzan (6th Ed.), and Kurose & Ross
// Full 17-Point Structural Article Architecture with Multi-Question Quizzes & Progressive Examples

const TOPICS_U2_EXT = {

  // =========================================================================
  // TOPIC 18: DLL DESIGN ISSUES & SERVICES (Topic 1 in PDF, pp. 19-48)
  // =========================================================================
  "dll-design-issues": {
    id: "dll-design-issues",
    title: "Design Issues of the Data Link Layer",
    unit: "Unit II: Data Link Layer & MAC Sublayer",
    unitId: "unit2",
    level: "Beginner → Intermediate",
    category: "datalink",
    difficulty: "Core",
    readingTime: "25–35 min",
    standard: "OSI Layer 2 / IEEE 802 / Tanenbaum Ch. 3",
    oneLiner: "The four pillars of Layer 2: services provided to Network Layer, framing, error control, and flow control.",
    quickAnswer: "The Data Link Layer transforms raw, unreliable physical bitstreams into discrete, error-checked frames, providing services to the network layer, framing boundaries, error detection/correction, and receiver flow pacing.",
    whyItMatters: "The physical layer only transmits unstructured bit pulses. Without Layer 2 design mechanisms, receivers cannot identify frame boundaries, know which device should receive data, detect electrical noise corruption, or prevent buffer overflow.",
    prerequisitesList: [
      { concept: "Bit", meaning: "A binary digit: 0 or 1." },
      { concept: "Byte", meaning: "A group of 8 bits (octet)." },
      { concept: "Packet", meaning: "A unit of data handled by the Network Layer (OSI Layer 3)." },
      { concept: "Frame", meaning: "A unit of data organized by the Data Link Layer (OSI Layer 2)." },
      { concept: "Network Layer", meaning: "OSI Layer 3, responsible for host-to-host packet delivery across networks." },
      { concept: "Physical Layer", meaning: "OSI Layer 1, responsible for transmitting raw signals representing bits." }
    ],
    learningObjectives: [
      "Define the Data Link Layer and explain its architectural purpose.",
      "Identify the four major design issues: Services, Framing, Error Control, Flow Control.",
      "Explain the three classic services offered to the Network Layer.",
      "Describe and compare the four main framing methods.",
      "Distinguish flow control from error control and congestion control.",
      "Apply these concepts to real networking technologies (Ethernet, Wi-Fi, HDLC)."
    ],
    infobox: {
      layer: "Layer 2 (Data Link Layer)",
      standard: "ISO/IEC 7498-1 (OSI), IEEE 802",
      type: "Architectural Foundations",
      keyFormula: "\\text{L2 Services} = \\{\\text{Unack Connectionless}, \\text{Ack Connectionless}, \\text{Ack Connection-Oriented}\\}",
      prerequisites: ["protocol-stack", "encapsulation"],
      relatedConcepts: ["framing", "error-detection", "flow-control", "ethernet"],
      compareWith: ["network-layer"],
      primaryUses: ["Ethernet links, Wi-Fi associations, Point-to-Point serial links, cellular radio links"]
    },
    image: {
      url: "assets/images/topic1/dll-design-issues-architecture.svg",
      caption: "Figure: Data Link Layer Design Issues & Frame Encapsulation across Intermediate Network Nodes."
    },
    "imageUrl": "assets/images/topic1/dll-design-issues-architecture.svg",
    "imageCaption": "Figure 1.7: Major Design Issues of the Data Link Layer (Services, Framing, Flow, and Error Control).",
    sections: {
      overview: "",
      interactiveLabKey: "stuffing",
      technicalDetails: "",
      interactiveLabKey: "aloha-csma",
      technicalDetails: "",
      interactiveLabKey: "frame-explorer",
      technicalDetails: "",
      interactiveLabKey: "frame-explorer",
      technicalDetails: "",
      interactiveLabKey: "frame-explorer",
      technicalDetails: `
        <table class="wiki-table">
          <thead><tr><th>Device</th><th>OSI Layer</th><th>Intelligence</th><th>Addressing Used</th><th>Key Advantage</th></tr></thead>
          <tbody>
            <tr><td>Repeater</td><td>Layer 1</td><td>None (Physical)</td><td>None</td><td>Extends physical distance</td></tr>
            <tr><td>Hub</td><td>Layer 1</td><td>None (Broadcasts bits)</td><td>None</td><td>Inexpensive multiport wiring</td></tr>
            <tr><td>Bridge</td><td>Layer 2</td><td>Software / Hardware</td><td>48-bit MAC</td><td>Divides large LAN into 2 collision zones</td></tr>
            <tr><td>Switch</td><td>Layer 2</td><td>Hardware ASIC (Fast)</td><td>48-bit MAC</td><td>Dedicated full-duplex bandwidth per port</td></tr>
            <tr><td>Router</td><td>Layer 3</td><td>Routing tables (Software/ASIC)</td><td>32b/128b IP</td><td>Connects disparate networks; stops broadcasts</td></tr>
            <tr><td>Gateway</td><td>Layers 4–7</td><td>Application protocol logic</td><td>Port / URI / Protocol</td><td>Translates incompatible protocols</td></tr>
          </tbody>
        </table>`,
      workedExamples: {
        level1: `<strong>Problem:</strong> A network administrator replaces a 16-port Hub with a 16-port Switch. What changes regarding collision and broadcast domains?<br><br>
<strong>Solution:</strong><br>
- <strong>Collision Domains:</strong> Changed from <strong>1 shared collision domain</strong> to <strong>16 isolated collision domains</strong> (one per port). Collisions are completely eliminated.<br>
- <strong>Broadcast Domains:</strong> Remains <strong>1 single broadcast domain</strong> (switches flood broadcasts to all ports).`,
        level2: `<strong>Problem:</strong> Which device must be used to connect an internal private LAN (<code>192.168.1.0/24</code>) to the public Internet, and why?<br><br>
<strong>Working:</strong><br>
A <strong>Router</strong> (Layer 3). Switches cannot forward between different IP network subnets because switches only inspect Layer 2 MAC addresses. A Router inspects the Layer 3 destination IP, performs Network Address Translation (NAT), and consults its routing table to forward packets across network boundaries.`,
        level3: `<strong>Problem:</strong> Explain what a "Layer 3 Switch" is and how it differs from a traditional router.<br><br>
<strong>Analysis:</strong><br>
A Layer 3 Switch combines high-density Layer 2 Ethernet switching with hardware-based IP routing performed directly in specialized silicon (ASIC chips). While traditional software routers are designed for WAN connectivity with diverse interfaces (T1, DSL, cellular), Layer 3 switches provide ultra-fast gigabit line-rate routing between internal campus VLANs.`
      },
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Device</th><th>Collision Domains</th><th>Broadcast Domains</th><th>Primary Function</th></tr></thead>
          <tbody>
            <tr><td>Hub</td><td>Does NOT separate</td><td>Does NOT separate</td><td>Multiport physical repeater</td></tr>
            <tr><td>Switch</td><td>Separates per port</td><td>Does NOT separate (without VLANs)</td><td>Layer 2 MAC forwarding</td></tr>
            <tr><td>Router</td><td>Separates per port</td><td>Separates per port</td><td>Layer 3 IP routing & packet filtering</td></tr>
          </tbody>
        </table>`,
      whereUsed: [
        "Home Wi-Fi routers (combines 4 devices: switch, router, AP, and NAT gateway).",
        "Data center spine switches (Layer 3 switches).",
        "Edge border routers connecting enterprises to ISPs."
      ],
      commonMistakes: `
        <ul class="wiki-bullet-list">
          <li><strong>Thinking switches separate broadcast domains:</strong> Standard Layer 2 switches do NOT separate broadcast domains. An ARP broadcast floods to all ports unless partitioned into separate VLANs.</li>
          <li><strong>Confusing a Gateway with a Router:</strong> A router routes packets between identical protocols (IP to IP). A gateway translates between <em>incompatible protocols</em> (e.g. SIP VoIP to PSTN analog telephone).</li>
        </ul>`,
      quiz: [
        {
          question: "Which of the following devices operates strictly at Layer 1 (Physical Layer)?",
          options: ["Hub", "Switch", "Router", "Bridge"],
          correctIndex: 0,
          explanation: "Hubs and repeaters operate at Layer 1, regenerating electrical/optical signals without inspecting frames or packets."
        },
        {
          question: "Which device separates both collision domains AND broadcast domains?",
          options: ["Repeater", "Hub", "Layer 2 Switch", "Router"],
          correctIndex: 3,
          explanation: "Routers operate at Layer 3 and do not forward Layer 2 broadcast frames, creating separate broadcast domains on each interface."
        },
        {
          question: "What is the primary difference between a bridge and a switch?",
          options: ["A bridge operates at Layer 3; a switch operates at Layer 1", "A switch is essentially a high-port-density, hardware-accelerated bridge", "A bridge encrypts packets", "A switch cannot connect to PCs"],
          correctIndex: 1,
          explanation: "Historically, bridges had 2 to 4 ports and relied on software; modern switches have dozens of ports with wire-speed ASIC hardware forwarding."
        }
      ],
      references: [
        { cite: "Forouzan, B. A. Data Communications and Networking (6th Ed.) - Chapter 15: Connecting Devices.", url: "https://www.mheducation.com" },
        { cite: "Tanenbaum & Wetherall, Computer Networks (6th Ed.) - Section 4.7.", url: "https://www.pearson.com" }
      ]
    },
    prevTopicId: "dll-switching", nextTopicId: "arp"
  }
};

// Merge with existing TOPICS_U2 if loaded
if (typeof TOPICS_U2 !== 'undefined') {
  Object.assign(TOPICS_U2, TOPICS_U2_EXT);
}
if (typeof window !== 'undefined') {
  if (window.TOPICS_U2) {
    Object.assign(window.TOPICS_U2, TOPICS_U2_EXT);
  } else {
    window.TOPICS_U2 = Object.assign({}, TOPICS_U2_EXT);
  }
  window.TOPICS_U2_EXT = TOPICS_U2_EXT;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TOPICS_U2_EXT;
}
