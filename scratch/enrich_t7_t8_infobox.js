const fs = require('fs');
const syllabus = require('../js/topics_u2_syllabus.js');

const t7Meta = {
  "wireless-lan-protocols": {
    prerequisitesList: [
      { concept: "Data Link Layer Fundamentals", meaning: "Framing, physical addressing, and error detection principles" },
      { concept: "MAC Sublayer Architecture", meaning: "Position of IEEE 802 Media Access Control above the Physical Layer" }
    ],
    learningObjectives: [
      "Define Wireless Local Area Networks (WLAN) and understand the scope of the IEEE 802.11 standard.",
      "Analyze the fundamental differences between Wired Ethernet (802.3) and Wireless LAN (802.11).",
      "Trace the end-to-end packet transmission workflow across the 802.11 MAC and Physical layers."
    ],
    infobox: {
      layer: "Layer 2 (Data Link Layer / MAC Sublayer)",
      standard: "IEEE 802.11 / Forouzan Chapter 14",
      type: "Wireless Local Area Network Standard",
      prerequisites: ["u2-dll-intro", "u2-mac-sublayer-intro"],
      relatedConcepts: ["u2-wireless-characteristics", "u2-wireless-lan-architecture", "wifi-mac-sublayer"],
      compareWith: ["ethernet", "u2-comparison-multiple-access"],
      primaryUses: ["Campus Wi-Fi, enterprise agile workplaces, home broadband, public hotspots"]
    }
  },
  "u2-wireless-characteristics": {
    prerequisitesList: [
      { concept: "Electromagnetic Wave Propagation", meaning: "Radio frequency transmission, wavelength, and frequency relationships" },
      { concept: "Transmission Media", meaning: "Unguided atmospheric media vs. guided copper/fiber cables" }
    ],
    learningObjectives: [
      "Master the 7 core physical and electromagnetic characteristics of wireless communication links.",
      "Calculate free-space path loss (FSPL) and understand inverse-square signal attenuation.",
      "Analyze how multipath propagation causes fading, inter-symbol interference, and phase distortion."
    ],
    infobox: {
      layer: "Layer 1 (Physical) & Layer 2 (MAC)",
      standard: "Forouzan Chapter 14 / Rappaport",
      type: "Physical & Radio Frequency Characteristics",
      prerequisites: ["wireless-lan-protocols"],
      relatedConcepts: ["u2-wireless-lan-architecture", "u2-wireless-multiple-access"],
      compareWith: ["transmission-media"],
      primaryUses: ["Indoor RF planning, Wi-Fi coverage site surveys, link budgeting"]
    }
  },
  "u2-wireless-lan-architecture": {
    prerequisitesList: [
      { concept: "Network Topologies", meaning: "Star, mesh, and infrastructure network layouts" },
      { concept: "Bridging and Switching", meaning: "Connecting network segments at Layer 2" }
    ],
    learningObjectives: [
      "Distinguish between Basic Service Set (BSS) Ad Hoc mode (IBSS) and Infrastructure mode.",
      "Explain the role and architecture of an Access Point (AP) and the Distribution System (DS).",
      "Differentiate the 3 levels of station mobility: No-Transition, BSS-Transition (Roaming), and ESS-Transition."
    ],
    infobox: {
      layer: "Layer 2 (Data Link Layer Architecture)",
      standard: "IEEE 802.11 / Forouzan Chapter 14",
      type: "Hierarchical Wireless Architecture",
      prerequisites: ["wireless-lan-protocols", "u2-wireless-characteristics"],
      relatedConcepts: ["wifi-mac-sublayer", "u2-ieee-802-11-architecture"],
      compareWith: ["u2-ethernet-architecture"],
      primaryUses: ["Enterprise Wi-Fi roaming, campus wide-area coverage, hospital medical wireless networks"]
    }
  },
  "u2-hidden-terminal-problem": {
    prerequisitesList: [
      { concept: "Carrier Sensing", meaning: "Clear Channel Assessment (CCA) energy detection" },
      { concept: "RF Coverage Cells", meaning: "Transmission radius and reception sensitivity thresholds" }
    ],
    learningObjectives: [
      "Understand the root cause of the Hidden Station Problem in asymmetrical wireless topologies.",
      "Trace how simultaneous transmissions from out-of-range stations collide at the central Access Point.",
      "Master the 4-way RTS/CTS virtual carrier sensing solution and Network Allocation Vector (NAV) timers."
    ],
    infobox: {
      layer: "Layer 2 (MAC Sublayer Contention)",
      standard: "IEEE 802.11 / Forouzan Chapter 14",
      type: "Medium Access Contention Dilemma",
      prerequisites: ["wireless-lan-protocols", "u2-wireless-lan-architecture"],
      relatedConcepts: ["u2-exposed-terminal-problem", "u2-rts-cts-mechanism", "u2-network-allocation-vector"],
      compareWith: ["u2-exposed-terminal-problem"],
      primaryUses: ["High-density classrooms, auditoriums, large meeting spaces, outdoor directional links"]
    }
  },
  "u2-exposed-terminal-problem": {
    prerequisitesList: [
      { concept: "Physical Carrier Sensing", meaning: "Energy detection on antenna interfaces" },
      { concept: "Hidden Terminal Problem", meaning: "Collisions caused by under-sensing" }
    ],
    learningObjectives: [
      "Define the Exposed Station Problem and explain why it causes over-sensing and unnecessary deferrals.",
      "Calculate the spatial capacity and throughput loss resulting from exposed station starvation.",
      "Explain why standard RTS/CTS does not inherently solve exposed terminals and how Wi-Fi 6 BSS Coloring mitigates it."
    ],
    infobox: {
      layer: "Layer 2 (MAC Sublayer Contention)",
      standard: "IEEE 802.11 / Forouzan Chapter 14",
      type: "Medium Access Inefficiency Dilemma",
      prerequisites: ["u2-hidden-terminal-problem"],
      relatedConcepts: ["u2-hidden-terminal-problem", "u2-wireless-multiple-access"],
      compareWith: ["u2-hidden-terminal-problem"],
      primaryUses: ["High-density apartment complexes, enterprise wireless mesh, Wi-Fi 6 spatial reuse"]
    }
  },
  "u2-wireless-multiple-access": {
    prerequisitesList: [
      { concept: "CSMA/CD Operation", meaning: "Wired Ethernet collision detection and jamming signals" },
      { concept: "Radio Transceiver Front-End", meaning: "Transmit power, receive sensitivity, and antenna dynamic range" }
    ],
    learningObjectives: [
      "Prove the 3 fundamental reasons why CSMA/CD is physically impossible in wireless LANs.",
      "Explain how transceiver blindness (100 dB difference) prevents listening during transmission.",
      "Contrast CSMA/CD and CSMA/CA across collision handling, layer 2 ACKs, and channel utilization."
    ],
    infobox: {
      layer: "Layer 2 (MAC Sublayer Access Control)",
      standard: "IEEE 802.11 / Forouzan Chapter 14",
      type: "Multiple Access Protocol Theory",
      prerequisites: ["u2-ethernet-csma-cd-operation", "u2-wireless-characteristics"],
      relatedConcepts: ["u2-ieee-802-11-csma-ca", "u2-rts-cts-mechanism"],
      compareWith: ["u2-ethernet-csma-cd-operation", "u2-comparison-multiple-access"],
      primaryUses: ["Wireless channel arbitration, Wi-Fi firmware drivers, wireless protocol design"]
    }
  },
  "u2-wireless-lan-access-methods": {
    prerequisitesList: [
      { concept: "Multiple Access Coordination", meaning: "Contention vs. polling channel arbitration" },
      { concept: "Interframe Spaces", meaning: "Preemptive priority timing intervals" }
    ],
    learningObjectives: [
      "Compare Distributed Coordination Function (DCF) and Point Coordination Function (PCF).",
      "Analyze the IEEE 802.11 Superframe architecture (Contention-Free Period CFP + Contention Period CP).",
      "Explain how PIFS gives the Point Coordinator priority access over standard DCF stations."
    ],
    infobox: {
      layer: "Layer 2 (MAC Coordination Functions)",
      standard: "IEEE 802.11 / Forouzan Chapter 14",
      type: "Medium Access Coordination Methods",
      prerequisites: ["u2-wireless-multiple-access"],
      relatedConcepts: ["u2-ieee-802-11-dcf", "u2-ieee-802-11-pcf", "u2-dcf-vs-pcf"],
      compareWith: ["u2-dcf-vs-pcf"],
      primaryUses: ["Voice over Wi-Fi (VoWLAN), real-time streaming, enterprise multimedia QoS"]
    }
  },
  "u2-wireless-communication-challenges": {
    prerequisitesList: [
      { concept: "Wireless LAN Fundamentals", meaning: "BSS, ESS, CSMA/CA, and RF characteristics" },
      { concept: "Network Security Basics", meaning: "Encryption, authentication, and wireless perimeters" }
    ],
    learningObjectives: [
      "Synthesize the major advantages, disadvantages, and engineering trade-offs of Wireless LANs.",
      "Master the 14 essential technical terms in IEEE 802.11 wireless networking.",
      "Review high-yield exam takeaways, formulas, and structured answers for university assessments."
    ],
    infobox: {
      layer: "Layer 2 & Layer 1 (Wireless Engineering)",
      standard: "IEEE 802.11 / Forouzan Chapter 14",
      type: "Curriculum Synthesis & Trade-off Evaluation",
      prerequisites: ["wireless-lan-protocols", "u2-wireless-lan-architecture", "u2-wireless-multiple-access"],
      relatedConcepts: ["wifi-mac-sublayer", "u2-ieee-802-11-frame-formats"],
      compareWith: ["u2-ethernet-advantages-limitations"],
      primaryUses: ["University exam preparation, GATE review, enterprise Wi-Fi system evaluation"]
    }
  }
};

const t8Meta = {
  "wifi-mac-sublayer": {
    prerequisitesList: [
      { concept: "Data Link Layer Architecture", meaning: "Division of Layer 2 into LLC and MAC sublayers" },
      { concept: "Wireless LAN Fundamentals", meaning: "Radio frequencies, BSS, and Access Point coordination" }
    ],
    learningObjectives: [
      "Define the IEEE 802.11 MAC Sublayer and understand its position within the OSI model.",
      "Detail the 8 primary responsibilities of the wireless MAC sublayer.",
      "Compare Ethernet MAC (802.3) and Wireless MAC (802.11) across framing, addressing, and collision handling."
    ],
    infobox: {
      layer: "Layer 2 (MAC Sublayer)",
      standard: "IEEE 802.11 / Forouzan Chapter 14",
      type: "MAC Sublayer Architecture",
      prerequisites: ["wireless-lan-protocols", "u2-mac-sublayer-intro"],
      relatedConcepts: ["u2-ieee-802-11-architecture", "u2-ieee-802-11-frame-formats"],
      compareWith: ["ethernet", "u2-ethernet-mac-protocol"],
      primaryUses: ["Wireless network interface cards, Access Point controller firmware, Wi-Fi drivers"]
    }
  },
  "u2-ieee-802-11-architecture": {
    prerequisitesList: [
      { concept: "MAC Sublayer Roles", meaning: "Coordination functions and channel access arbitration" },
      { concept: "LLC Sublayer (802.2)", meaning: "Multiplexing network protocols above the MAC layer" }
    ],
    learningObjectives: [
      "Analyze the dual-coordination architecture of the 802.11 MAC sublayer (DCF and PCF).",
      "Explain the interaction between the Logical Link Control (LLC) sublayer and the Physical Layer.",
      "Understand how PIFS allows PCF to seize priority channel access over standard DCF."
    ],
    infobox: {
      layer: "Layer 2 (MAC Architecture)",
      standard: "IEEE 802.11 / Forouzan Chapter 14",
      type: "Protocol Stack Architecture",
      prerequisites: ["wifi-mac-sublayer"],
      relatedConcepts: ["u2-ieee-802-11-dcf", "u2-ieee-802-11-pcf", "u2-dcf-vs-pcf"],
      compareWith: ["u2-ethernet-architecture"],
      primaryUses: ["Wi-Fi system architecture design, multimedia streaming scheduling, QoS queues"]
    }
  },
  "u2-ieee-802-11-dcf": {
    prerequisitesList: [
      { concept: "CSMA/CA Principles", meaning: "Carrier sensing and collision avoidance mechanics" },
      { concept: "Contention Windows", meaning: "Random backoff slot intervals and timer freezing" }
    ],
    learningObjectives: [
      "Master the 7-step working mechanism of the Distributed Coordination Function (DCF).",
      "Explain the operation of the Contention Window, backoff countdown, and counter freezing.",
      "Analyze the exponential backoff window expansion upon frame collision or missing ACK."
    ],
    infobox: {
      layer: "Layer 2 (MAC Contention Access)",
      standard: "IEEE 802.11 / Forouzan Chapter 14",
      type: "Distributed Contention Access Protocol",
      prerequisites: ["wifi-mac-sublayer", "u2-ieee-802-11-architecture"],
      relatedConcepts: ["u2-ieee-802-11-csma-ca", "u2-ieee-802-11-ifs", "u2-dcf-vs-pcf"],
      compareWith: ["u2-ieee-802-11-pcf", "u2-dcf-vs-pcf"],
      primaryUses: ["Standard asynchronous data delivery in Wi-Fi (HTTP, email, file downloads)"]
    }
  },
  "u2-ieee-802-11-pcf": {
    prerequisitesList: [
      { concept: "Access Point Roles", meaning: "Point Coordinator centralized scheduling in Infrastructure mode" },
      { concept: "Interframe Spaces", meaning: "Preemptive priority timing via PIFS" }
    ],
    learningObjectives: [
      "Explain the centralized polling operation of the Point Coordination Function (PCF).",
      "Analyze the IEEE 802.11 Superframe structure (Beacon, CFP, and CP periods).",
      "Evaluate the advantages, limitations, and reasons why PCF was superseded by 802.11e EDCA."
    ],
    infobox: {
      layer: "Layer 2 (MAC Contention-Free Access)",
      standard: "IEEE 802.11 / Forouzan Chapter 14",
      type: "Centralized Polling Access Protocol",
      prerequisites: ["u2-ieee-802-11-architecture", "u2-ieee-802-11-dcf"],
      relatedConcepts: ["u2-ieee-802-11-ifs", "u2-dcf-vs-pcf"],
      compareWith: ["u2-ieee-802-11-dcf", "u2-dcf-vs-pcf"],
      primaryUses: ["Time-sensitive voice and video polling, specialized industrial Wi-Fi automation"]
    }
  },
  "u2-ieee-802-11-csma-ca": {
    prerequisitesList: [
      { concept: "Physical Carrier Sensing", meaning: "Clear Channel Assessment energy measurement" },
      { concept: "Virtual Carrier Sensing", meaning: "Network Allocation Vector (NAV) reservation" }
    ],
    learningObjectives: [
      "Master the 6 cooperating components of CSMA/CA in wireless networking.",
      "Calculate collision probability during simultaneous random backoff slot selection.",
      "Compare CSMA/CA and CSMA/CD across operational timing, backoff trigger, and recovery."
    ],
    infobox: {
      layer: "Layer 2 (MAC Access Control)",
      standard: "IEEE 802.11 / Forouzan Chapter 14",
      type: "Carrier Sense Multiple Access Protocol",
      prerequisites: ["wifi-mac-sublayer", "u2-ieee-802-11-dcf"],
      relatedConcepts: ["u2-rts-cts-mechanism", "u2-network-allocation-vector"],
      compareWith: ["u2-ethernet-csma-cd-operation", "u2-comparison-multiple-access"],
      primaryUses: ["Wi-Fi channel contention, Zigbee radio links, wireless IoT sensor networks"]
    }
  },
  "u2-ieee-802-11-ifs": {
    prerequisitesList: [
      { concept: "Slot Time", meaning: "Basic time slice determined by physical layer propagation and RF switching" },
      { concept: "Priority Scheduling", meaning: "Using shorter time delays to achieve preemptive access" }
    ],
    learningObjectives: [
      "Define all four IEEE 802.11 Interframe Spaces: SIFS, PIFS, DIFS, and EIFS.",
      "Calculate PIFS and DIFS using standard formulas from SIFS and Slot Time.",
      "Explain why SIFS is the shortest interval and how it preserves atomic frame exchanges."
    ],
    infobox: {
      layer: "Layer 2 (MAC Timing & Priority)",
      standard: "IEEE 802.11 / Forouzan Chapter 14",
      type: "Interframe Timing Hierarchy",
      prerequisites: ["wifi-mac-sublayer", "u2-ieee-802-11-csma-ca"],
      relatedConcepts: ["u2-ieee-802-11-dcf", "u2-ieee-802-11-pcf"],
      compareWith: ["u2-ethernet-csma-cd-operation"],
      primaryUses: ["MAC timing engines, wireless frame prioritization, Wi-Fi chip hardware clocks"]
    }
  },
  "u2-rts-cts-mechanism": {
    prerequisitesList: [
      { concept: "Hidden Station Problem", meaning: "Collisions occurring at the receiver from hidden nodes" },
      { concept: "Control Frames", meaning: "Short MAC frames used for channel coordination" }
    ],
    learningObjectives: [
      "Trace the complete 4-way RTS/CTS frame exchange: RTS &rarr; SIFS &rarr; CTS &rarr; SIFS &rarr; DATA &rarr; SIFS &rarr; ACK.",
      "Calculate the total exchange duration and Duration field reservation value.",
      "Explain the trade-offs of the RTS Threshold parameter for small vs. large frames."
    ],
    infobox: {
      layer: "Layer 2 (MAC Virtual Sensing Handshake)",
      standard: "IEEE 802.11 / Forouzan Chapter 14",
      type: "4-Way Virtual Carrier Sensing Handshake",
      prerequisites: ["u2-hidden-terminal-problem", "u2-ieee-802-11-csma-ca"],
      relatedConcepts: ["u2-network-allocation-vector", "u2-ieee-802-11-frame-formats"],
      compareWith: ["u2-hidden-terminal-problem"],
      primaryUses: ["Dense enterprise auditoriums, large data file transfers, outdoor Wi-Fi backhauls"]
    }
  },
  "u2-network-allocation-vector": {
    prerequisitesList: [
      { concept: "RTS/CTS Duration Field", meaning: "Time value written into MAC control frames" },
      { concept: "Physical vs. Virtual Sensing", meaning: "RF energy measurement vs. contract reservation" }
    ],
    learningObjectives: [
      "Define the Network Allocation Vector (NAV) and explain its virtual carrier-sensing role.",
      "Explain the mathematical rules for updating the NAV countdown timer upon overhearing frames.",
      "Contrast physical carrier sensing (CCA) with virtual carrier sensing (NAV) in a comparison table."
    ],
    infobox: {
      layer: "Layer 2 (MAC Virtual Carrier Sensing)",
      standard: "IEEE 802.11 / Forouzan Chapter 14",
      type: "Virtual Carrier Sensing Timer",
      prerequisites: ["u2-rts-cts-mechanism"],
      relatedConcepts: ["u2-ieee-802-11-csma-ca", "u2-hidden-terminal-problem"],
      compareWith: ["u2-hidden-terminal-problem"],
      primaryUses: ["Wi-Fi MAC state machines, collision prevention, hidden terminal protection"]
    }
  },
  "u2-ieee-802-11-frame-formats": {
    prerequisitesList: [
      { concept: "MAC Frame Structure", meaning: "Headers, addressing, payloads, and CRC checksums" },
      { concept: "Distribution System Routing", meaning: "Bridging frames between wireless stations and wired LANs" }
    ],
    learningObjectives: [
      "Identify and explain all 9 fields of the general IEEE 802.11 MAC frame.",
      "Detail the 11 subfields within the 16-bit Frame Control field.",
      "Master the interpretation of the 4 address fields based on the To DS and From DS bits."
    ],
    infobox: {
      layer: "Layer 2 (MAC Frame Structure & Addressing)",
      standard: "IEEE 802.11 / Forouzan Chapter 14",
      type: "Data Link Frame Specification",
      prerequisites: ["wifi-mac-sublayer", "u2-ethernet-frame-format"],
      relatedConcepts: ["u2-ieee-802-11-architecture", "u2-rts-cts-mechanism"],
      compareWith: ["u2-ethernet-frame-format"],
      primaryUses: ["Wireshark 802.11 packet capture analysis, wireless router firmware, bridge routing"]
    }
  },
  "u2-dcf-vs-pcf": {
    prerequisitesList: [
      { concept: "Distributed Coordination Function", meaning: "Contention CSMA/CA access" },
      { concept: "Point Coordination Function", meaning: "Centralized contention-free polling access" }
    ],
    learningObjectives: [
      "Compare DCF and PCF across 12 comprehensive architectural and performance parameters.",
      "Analyze why DCF is mandatory and works in Ad Hoc, while PCF is optional and requires an AP.",
      "Understand the modern evolution of DCF and PCF into 802.11e EDCA and Wi-Fi 6 OFDMA."
    ],
    infobox: {
      layer: "Layer 2 (MAC Coordination Comparison)",
      standard: "IEEE 802.11 / Forouzan Chapter 14",
      type: "Comparative Architectural Analysis",
      prerequisites: ["u2-ieee-802-11-dcf", "u2-ieee-802-11-pcf"],
      relatedConcepts: ["u2-ieee-802-11-architecture", "u2-wireless-lan-access-methods"],
      compareWith: ["u2-wireless-lan-access-methods"],
      primaryUses: ["Academic examinations, GATE preparation, Wi-Fi QoS architecture evaluation"]
    }
  }
};

const defaultReferences = [
  { cite: "Behrouz A. Forouzan, Data Communications and Networking (5th Ed.), Chapter 14: Wireless LANs.", url: "" },
  { cite: "IEEE 802.11-2020 Standard for Information Technology—Telecommunications and Information Exchange Between Systems.", url: "" }
];

const defaultWhereUsed = [
  "Enterprise campus Wi-Fi networks",
  "Smartphones, laptops, and mobile wireless clients",
  "Wireless mesh nodes and residential access points"
];

// Enrich Topic 7
for (const [key, meta] of Object.entries(t7Meta)) {
  if (syllabus[key]) {
    syllabus[key].infobox = meta.infobox;
    syllabus[key].prerequisitesList = meta.prerequisitesList;
    syllabus[key].learningObjectives = meta.learningObjectives;
    syllabus[key].sections = syllabus[key].sections || {};
    syllabus[key].sections.whereUsed = defaultWhereUsed;
    syllabus[key].sections.references = defaultReferences;
    console.log(`Enriched Topic 7 subtopic: ${key}`);
  }
}

// Enrich Topic 8
for (const [key, meta] of Object.entries(t8Meta)) {
  if (syllabus[key]) {
    syllabus[key].infobox = meta.infobox;
    syllabus[key].prerequisitesList = meta.prerequisitesList;
    syllabus[key].learningObjectives = meta.learningObjectives;
    syllabus[key].sections = syllabus[key].sections || {};
    syllabus[key].sections.whereUsed = defaultWhereUsed;
    syllabus[key].sections.references = defaultReferences;
    console.log(`Enriched Topic 8 subtopic: ${key}`);
  }
}

const outContent = `// topics_u2_syllabus.js - Master Academic Topic Content Repository for Unit 2
// Cleaned: All ASCII symbol art removed. Integrated complete Topic 2, Topic 3, Topic 4, Topic 5, Topic 6, Topic 7, & Topic 8 content.
var TOPICS_U2_SYLLABUS = ${JSON.stringify(syllabus, null, 2)};

if (typeof window !== 'undefined') window.TOPICS_U2_SYLLABUS = TOPICS_U2_SYLLABUS;
if (typeof global !== 'undefined') global.TOPICS_U2_SYLLABUS = TOPICS_U2_SYLLABUS;
if (typeof module !== 'undefined' && module.exports) module.exports = TOPICS_U2_SYLLABUS;
`;

fs.writeFileSync('js/topics_u2_syllabus.js', outContent, 'utf8');
console.log('Successfully written enriched topics_u2_syllabus.js with complete infobox and metadata!');

