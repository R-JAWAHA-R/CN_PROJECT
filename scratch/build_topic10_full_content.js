// Build complete academic content for Unit 2 Topic 10: Networking Devices & Assessment Enrichment
const fs = require('fs');
const path = require('path');

const syllabusFile = path.join(__dirname, '../js/topics_u2_syllabus.js');
const TOPICS_U2_SYLLABUS = require(syllabusFile);

const imgDevices = "https://upload.wikimedia.org/wikipedia/commons/4/4a/Ethernet-broadcast-collision_%28hub%29.svg";
const imgHub = "https://upload.wikimedia.org/wikipedia/commons/4/4a/Ethernet-broadcast-collision_%28hub%29.svg";
const imgSwitch = "https://upload.wikimedia.org/wikipedia/commons/0/0b/Ethernet-broadcast-collision.svg";
const imgRouter = "https://upload.wikimedia.org/wikipedia/commons/e/e6/Router_on_a_stick.png";
const imgOsi = "https://upload.wikimedia.org/wikipedia/commons/8/8d/OSI_Model_v1.svg";

// ==========================================
// 1. network-devices: Introduction to Networking Devices
// ==========================================
TOPICS_U2_SYLLABUS['network-devices'] = {
  id: "network-devices",
  title: "Introduction to Networking Devices",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  level: "Beginner",
  category: "devices",
  difficulty: "Core",
  readingTime: "20–25 min",
  standard: "Forouzan Ch. 15 / Tanenbaum Ch. 1 & 4",
  oneLiner: "Hardware connecting components that enable data transmission, internetworking, and domain management across the OSI stack.",
  quickAnswer: "Networking devices are dedicated hardware components used to connect computers, servers, and peripherals, transmit digital signals, and enable communication within local networks, across separate enterprise subnets, and to the global Internet. Each device functions at a specific layer of the OSI model: repeaters and hubs regenerate signals at Layer 1; bridges and switches forward frames via MAC addresses at Layer 2; routers direct packets via IP addresses at Layer 3; and gateways translate protocols across Layers 4 through 7.",
  whyItMatters: "Without connecting devices, modern computer networks would be restricted to isolated point-to-point cables. Networking devices create scalable topologies, eliminate signal attenuation, microsegment bandwidth, and establish global internetworking.",
  prerequisitesList: [
    { concept: "OSI 7-Layer Model", meaning: "Theoretical reference model standardizing network communication into 7 modular tiers" },
    { concept: "Signal Attenuation", meaning: "Loss of signal strength and integrity over long physical cable distances" },
    { concept: "Collision & Broadcast Domains", meaning: "Boundaries of signal interference versus broadcast packet reach" }
  ],
  learningObjectives: [
    "Define networking devices and explain their fundamental role in computer communication.",
    "Enumerate the six primary connecting devices: Repeater, Hub, Bridge, Switch, Router, Gateway.",
    "Map each networking device to its primary operating layer in the OSI Reference Model.",
    "Explain the distinction between physical signal repeating, Layer 2 frame forwarding, Layer 3 packet routing, and multi-layer protocol translation."
  ],
  infobox: {
    layer: "Layers 1 through 7 (Cross-Layer Architecture)",
    standard: "IEEE 802 / IETF / ISO 7498-1",
    type: "Hardware Architecture & Internetworking",
    prerequisites: ["osi-model", "mac-address", "ip-addressing"],
    relatedConcepts: ["repeaters", "hubs", "bridges", "switches", "routers", "gateways"],
    compareWith: ["transmission-media", "network-cables"],
    primaryUses: ["LAN/WAN Infrastructure, Enterprise Campus Networks, Data Centers, Home Internet Access"]
  },
  imageUrl: imgDevices,
  imageCaption: "Figure: Networking Devices Across OSI Layers: Repeaters/Hubs (L1), Bridges/Switches (L2), Routers (L3), Gateways (L7).",
  sections: {
    overview: `
      <p class="lead"><strong>Networking devices</strong> are hardware components used to connect computers, servers, mobile terminals, and peripheral devices, transmit digital signals, and enable communication across different segments of a network.</p>

      <p>In modern computer networks, connecting devices serve three paramount architectural functions:</p>
      <ul class="list-disc pl-5 space-y-1.5 text-xs">
        <li><strong>Local Communication:</strong> Connecting workstations within a Local Area Network (LAN) to share file storage, printers, and compute resources.</li>
        <li><strong>Inter-Network Connectivity:</strong> Bridging disparate subnets and wide area connections across branch offices and corporate campuses.</li>
        <li><strong>Internet Access:</strong> Directing traffic across Internet Service Provider (ISP) boundaries to access web servers, cloud services, and external endpoints.</li>
      </ul>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">The Six Primary Networking Devices</h4>
      <p class="text-xs">Each connecting device performs a dedicated operational task within the network architecture:</p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-2.5 my-3 text-xs">
        <div class="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
          <strong class="text-amber-800 dark:text-amber-300 block mb-1">1. Repeater (Layer 1)</strong>
          <span class="text-[11px] text-slate-600 dark:text-slate-400">Regenerates and retimes weak physical electrical/optical signals to extend transmission distance.</span>
        </div>
        <div class="p-2.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800">
          <strong class="text-red-800 dark:text-red-300 block mb-1">2. Hub (Layer 1)</strong>
          <span class="text-[11px] text-slate-600 dark:text-slate-400">A multiport repeater that blindly broadcasts incoming signals out to all other connected ports.</span>
        </div>
        <div class="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
          <strong class="text-blue-800 dark:text-blue-300 block mb-1">3. Bridge (Layer 2)</strong>
          <span class="text-[11px] text-slate-600 dark:text-slate-400">Connects 2–4 LAN segments, forwards frames via MAC addresses, and isolates collision domains.</span>
        </div>
        <div class="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
          <strong class="text-emerald-800 dark:text-emerald-300 block mb-1">4. Switch (Layer 2)</strong>
          <span class="text-[11px] text-slate-600 dark:text-slate-400">A high-performance multiport bridge with dedicated hardware ASICs providing microsegmented wire-speed forwarding.</span>
        </div>
        <div class="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
          <strong class="text-indigo-800 dark:text-indigo-300 block mb-1">5. Router (Layer 3)</strong>
          <span class="text-[11px] text-slate-600 dark:text-slate-400">Connects distinct IP networks, determines optimal routing paths, and bounds broadcast domains.</span>
        </div>
        <div class="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
          <strong class="text-purple-800 dark:text-purple-300 block mb-1">6. Gateway (L4–L7)</strong>
          <span class="text-[11px] text-slate-600 dark:text-slate-400">A multi-layer translator converting data formats, architectures, or protocols between incompatible network systems.</span>
        </div>
      </div>
    `,
    eli10: "Think of a highway system: a repeater is like a roadside fuel station keeping cars running; a hub is a town square where everyone hears everyone shout; a switch is an automated toll road with private direct lanes; a router is a highway interchange between different states; and a gateway is international customs translating foreign passports.",
    analogy: "Like communication tools in an international conference: repeaters are audio microphones; hubs are megaphones; switches are private telephone lines; routers are mail delivery vans between cities; and gateways are multi-language diplomatic interpreters.",
    howItWorks: `
      <p class="text-xs leading-relaxed">The modular hierarchy of networking devices relies on progressive protocol inspection:</p>
      <ol class="list-decimal pl-5 space-y-1.5 text-xs">
        <li><strong>Physical Layer Devices (Repeaters, Hubs):</strong> Do not inspect any headers. They treat transmissions purely as raw electrical voltages, radio waves, or light pulses. They lack intelligence to read MAC or IP addresses.</li>
        <li><strong>Data Link Layer Devices (Bridges, Switches):</strong> Reassemble bitstreams into discrete Ethernet frames. They inspect the 48-bit hardware Source and Destination MAC addresses in the Layer 2 header to filter local traffic and direct unicast frames.</li>
        <li><strong>Network Layer Devices (Routers):</strong> Strip the Layer 2 frame header to reveal the Layer 3 IP packet. They inspect the 32-bit (IPv4) or 128-bit (IPv6) logical destination IP address, consult routing tables, decrement TTL, and encapsulate the packet into a new Layer 2 frame for the next hop.</li>
        <li><strong>Upper-Layer Gateways:</strong> Reconstruct full application-level data to translate between divergent protocol syntaxes (e.g., SIP to H.323, or IPv4 NAT64 to IPv6).</li>
      </ol>
    `,
    technicalDetails: `
      <p class="text-xs leading-relaxed">Comparative performance metrics across devices:</p>
      <ul class="list-disc pl-5 space-y-1 text-xs">
        <li><strong>Throughput:</strong> Hubs offer shared half-duplex bandwidth (e.g., 100 Mbps shared by all ports). Switches offer non-blocking full-duplex backplanes (e.g., 48 Gbps wire-speed across 24 Gigabit ports).</li>
        <li><strong>Latency:</strong> Repeaters introduce negligible bit-level propagation delay ($< 1\\;\\mu\\text{s}$). Store-and-forward switches and routers introduce packet queuing and lookup delay ($5\\text{--}50\\;\\mu\\text{s}$). Application gateways introduce milliseconds of parsing and translation overhead.</li>
      </ul>
    `,
    workedExamples: [
      {
        title: "Example: Matching Requirements to Network Devices",
        difficulty: "Beginner",
        problem: "Identify which networking device is required in each scenario:\n1. Extending an Ethernet cable run beyond 100 meters without changing the LAN.\n2. Connecting 20 office PCs so they do not collide with each other.\n3. Connecting the corporate office network to the Internet ISP.\n4. Translating a legacy serial industrial Modbus network to modern IP Ethernet.",
        solution: "1. Scenario 1 requires a **Repeater** (or switch) to regenerate the degraded electrical signals.\n2. Scenario 2 requires an **Ethernet Switch** to provide microsegmentation and dedicated collision domains.\n3. Scenario 3 requires a **Router** to route packets between private IP and public ISP networks.\n4. Scenario 4 requires an **Industrial Gateway** to perform protocol and data format translation."
      }
    ],
    advantagesLimitations: `
      <table class="wiki-table">
        <thead><tr><th>Networking Device Class</th><th>Primary Architectural Strength</th><th>Primary Architectural Constraint</th></tr></thead>
        <tbody>
          <tr><td><strong>L1 (Repeaters, Hubs)</strong></td><td>Zero configuration; lowest cost; minimal hardware delay.</td><td>Blind repetition propagates noise, collisions, and security risks.</td></tr>
          <tr><td><strong>L2 (Bridges, Switches)</strong></td><td>Eliminates collisions; wire-speed dedicated bandwidth.</td><td>Does not separate broadcast domains without VLANs.</td></tr>
          <tr><td><strong>L3 (Routers)</strong></td><td>Connects disparate networks; blocks broadcast storms; path optimization.</td><td>More expensive; requires IP subnet planning; packet lookup delay.</td></tr>
          <tr><td><strong>L4–L7 (Gateways)</strong></td><td>Enables communication between totally incompatible architectures.</td><td>High computational overhead and protocol translation latency.</td></tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "Enterprise Data Centers: Multi-tier switching fabrics and spine-and-leaf core routers.",
      "Campus LANs: PoE access switches connecting PCs, Wi-Fi 6 access points, and IP security cameras.",
      "Home & Small Office: All-in-one wireless routers combining router, switch, access point, and NAT gateway."
    ],
    quiz: [
      {
        question: "Which networking device is responsible for interconnecting different IP networks using logical addresses?",
        options: ["Hub", "Switch", "Router", "Repeater"],
        correct: 2,
        explanation: "A router operates at the Network Layer (Layer 3) and uses logical IP addresses to forward packets across different networks."
      },
      {
        question: "What is the primary difference between a hub and an Ethernet switch?",
        options: ["A hub routes IP packets while a switch routes frames", "A hub repeats signals blindly to all ports while a switch forwards frames selectively based on MAC addresses", "A hub operates on fiber optic cables while a switch only operates on copper", "A hub provides full-duplex communication while a switch provides half-duplex"],
        correct: 1,
        explanation: "A hub is a Layer 1 broadcast device that repeats incoming signals to all ports, whereas a switch is a Layer 2 intelligent device that forwards frames only to the target MAC address port."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 15: Connecting Devices.", url: "" },
      { cite: "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 1 & 4.", url: "" },
      { cite: "Cisco Certified Network Associate (CCNA) Study Guide: Network Fundamentals.", url: "" }
    ]
  }
};

// ==========================================
// 2. u2-networking-device-repeaters: Repeaters
// ==========================================
TOPICS_U2_SYLLABUS['u2-networking-device-repeaters'] = {
  id: "u2-networking-device-repeaters",
  title: "Repeaters",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  level: "Beginner",
  category: "devices",
  difficulty: "Core",
  readingTime: "15–20 min",
  standard: "Forouzan Ch. 15.1 / IEEE 802.3",
  oneLiner: "A Layer 1 physical device that overcomes signal attenuation by regenerating and retransmitting electrical/optical signals.",
  quickAnswer: "A repeater is a physical layer (Layer 1) networking device that receives a weak or degraded electrical or optical signal, cleans out transmission noise, regenerates the signal to its original amplitude and timing, and retransmits it to extend the maximum geographical reach of a physical network segment.",
  whyItMatters: "Electrical signals traveling across copper twisted-pair cables attenuate significantly after 100 meters due to physical electrical resistance and dielectric losses. Without repeaters to regenerate signals, Local Area Networks would be physically constrained to single rooms or short distances.",
  prerequisitesList: [
    { concept: "Attenuation", meaning: "The progressive loss of signal energy and amplitude as it traverses a transmission medium" },
    { concept: "Signal Regeneration", meaning: "Reconstructing the clean digital wave shape (0s and 1s) rather than merely amplifying noise" },
    { concept: "Layer 1 Operation", meaning: "Operating exclusively on raw physical bits without reading frame headers or addresses" }
  ],
  learningObjectives: [
    "Define a repeater and state its primary OSI operating layer.",
    "Explain why a repeater is required to overcome signal attenuation.",
    "Describe the 3 operational working steps of a signal repeater.",
    "Contrast digital signal regeneration with simple analog amplification.",
    "Identify the key characteristics, advantages, and limitations of repeaters."
  ],
  infobox: {
    layer: "Layer 1 (Physical Layer)",
    standard: "IEEE 802.3 Physical Layer Specifications",
    type: "Signal Regeneration Hardware",
    prerequisites: ["network-devices", "attenuation"],
    relatedConcepts: ["hubs", "amplifiers", "5-4-3-rule", "collision-domain"],
    compareWith: ["analog-amplifiers", "hubs", "bridges"],
    primaryUses: ["Extending copper Ethernet runs, long-distance optical fiber transmission, submarine cable repeaters"]
  },
  imageUrl: imgHub,
  imageCaption: "Figure: Physical Layer Repeater (L1): Analog Signal Amplification, Regeneration, and Retiming.",
  sections: {
    overview: `
      <p class="lead">A <strong>repeater</strong> is a networking device that receives a weak, distorted, or attenuated signal, regenerates it to its original voltage and pulse shape, and retransmits it across another physical segment to extend total network distance.</p>

      <p>A repeater operates strictly at the <strong>Physical Layer (Layer 1)</strong> of the OSI model. It treats data entirely as a continuous stream of electrical voltages, optical pulses, or radio frequencies.</p>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">Why is a Repeater Needed? The Problem of Attenuation</h4>
      <p class="text-xs leading-relaxed">
        When digital signals propagate through copper twisted-pair wires, coaxial cables, or optical fibers, signal strength deteriorates over distance due to medium resistance, capacitance, and thermal dissipation. This physical degradation is known as <strong>attenuation</strong>.
        <br>&bull; In standard Cat5e/Cat6 copper cabling, signal degradation limits reliable transmission to exactly <strong>100 meters (328 feet)</strong>.
        <br>&bull; Beyond 100 meters, signal edges round off and voltage drops, causing receivers to misinterpret 1s as 0s (bit errors).
        <br>&bull; A repeater placed at or before the 100-meter mark regenerates crisp, full-amplitude square waves, allowing the network to span another 100 meters!
      </p>

      <div class="wiki-callout tip my-3">
        <div class="callout-header"><i class="fa-solid fa-bolt"></i> Regeneration vs. Amplification</div>
        <p class="text-xs">An <strong>amplifier</strong> blindly boosts both the signal and the accumulated noise, increasing distortion. A <strong>repeater</strong> performs digital <em>regeneration</em>: it samples the input wave, reconstructs fresh, clean digital pulses with sharp rising and falling edges, and retransmits the newly minted bits without accumulated noise!</p>
      </div>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">Working of a Repeater (3 Operational Steps)</h4>
      <ol class="list-decimal pl-5 space-y-1 text-xs">
        <li><strong>Receives a signal</strong> from one physical network segment that has degraded over cable distance.</li>
        <li><strong>Regenerates or retimes the signal:</strong> Extracts the underlying binary bitstream and reconstructs identical high-amplitude square waves aligned to the standard network clock.</li>
        <li><strong>Transmits the renewed signal</strong> onto the adjacent network segment at full original power.</li>
      </ol>
    `,
    eli10: "Imagine you are whispering a message across a giant playground. By the time it travels 50 feet, it is too faint to hear. A friend standing at 50 feet listens, understands the words, and speaks them out loud at full volume to the next friend 50 feet away.",
    analogy: "Like a relay runner in an Olympic 4x100m race: rather than one tired runner slowing down over a long distance, a fresh runner takes the baton and sprints with maximum speed and energy.",
    howItWorks: `
      <p class="text-xs leading-relaxed">Key characteristics of Layer 1 repeaters:</p>
      <ul class="list-disc pl-5 space-y-1 text-xs">
        <li><strong>No Address Inspection:</strong> Does not examine 48-bit MAC addresses or 32-bit IP addresses.</li>
        <li><strong>No Forwarding Decisions:</strong> Does not decide where frames travel; whatever enters Port 1 is regenerated and pushed out Port 2.</li>
        <li><strong>Extends Physical Reach Only:</strong> Extends the geographical span of the cable plant.</li>
        <li><strong>Single Collision Domain:</strong> Does <em>not</em> separate collision domains. If a collision occurs on Segment 1, the repeater faithfully regenerates the collision noise onto Segment 2!</li>
        <li><strong>The 5-4-3 Rule:</strong> In legacy 10 Mbps coaxial Ethernet, a network could have at most 5 segments, 4 repeaters, and only 3 populated host segments to ensure collision detection timing bounds remained intact.</li>
      </ul>
    `,
    technicalDetails: `
      <p class="text-xs leading-relaxed">Optical Repeaters / Optical Amplifiers (EDFA):</p>
      <ul class="list-disc pl-5 space-y-1 text-xs">
        <li>In transoceanic submarine fiber-optic cables, Erbium-Doped Fiber Amplifiers (EDFA) and optical regenerators are submerged every 50 to 80 km along the ocean floor to regenerate laser pulses across thousands of kilometers.</li>
        <li>In wireless networks, Wi-Fi range extenders act as wireless repeaters, receiving weak 2.4 GHz/5 GHz frames from the main router and rebroadcasting them to dead zones.</li>
      </ul>
    `,
    workedExamples: [
      {
        title: "Example: Extending a Weak Signal (PDF Solved Example 2)",
        difficulty: "Beginner",
        problem: "A signal becomes weak and degraded when travelling over a long industrial cable run between two manufacturing buildings.\nQuestion: Which networking device can regenerate the signal and what is the underlying physical reason?",
        solution: "Answer: A **Repeater**.\nPhysical Reason: As electrical signals travel through transmission media, electrical resistance and capacitance cause signal attenuation (loss of amplitude and rounded digital transitions). A repeater receives the degraded signal, reconstructs clean binary square waves, and retransmits the renewed signal at full power to extend the communication distance."
      }
    ],
    advantagesLimitations: `
      <table class="wiki-table">
        <thead><tr><th>Advantages</th><th>Disadvantages / Limitations</th></tr></thead>
        <tbody>
          <tr><td>Extends signal transmission distance significantly.</td><td>Does not filter or block any network traffic.</td></tr>
          <tr><td>Helps overcome medium attenuation and noise distortion.</td><td>Does not reduce collisions; both sides share 1 collision domain.</td></tr>
          <tr><td>Completely simple to install and operate (plug-and-play).</td><td>Cannot connect different IP networks or different MAC architectures.</td></tr>
          <tr><td>Extremely low hardware cost and minimal processing latency.</td><td>Cannot partition broadcast domains.</td></tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "Submarine Fiber-Optic Communication Links (transatlantic internet cables).",
      "Ethernet Extenders in industrial automation environments.",
      "Consumer Wi-Fi range extenders and mesh repeater nodes."
    ],
    quiz: [
      {
        question: "At which layer of the OSI model does a network repeater operate?",
        options: ["Physical Layer (Layer 1)", "Data Link Layer (Layer 2)", "Network Layer (Layer 3)", "Transport Layer (Layer 4)"],
        correct: 0,
        explanation: "A repeater operates at Layer 1 (Physical Layer), regenerating raw electrical, optical, or radio signals."
      },
      {
        question: "How does digital signal regeneration in a repeater differ from analog amplification?",
        options: ["Amplification removes noise while regeneration boosts noise", "Regeneration reconstructs clean digital square pulses while amplification boosts both signal and accumulated noise", "Regeneration converts IP packets to MAC frames", "Amplification operates at Layer 3 while regeneration operates at Layer 1"],
        correct: 1,
        explanation: "Digital regeneration reconstructs fresh, clean square waves, completely eliminating accumulated transmission noise, whereas amplifiers blindly magnify both signal and noise."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, Chapter 15.1: Repeaters.", url: "" },
      { cite: "IEEE Std 802.3 Clause 9: Repeater Unit for 10 Mb/s Baseband Networks.", url: "" }
    ]
  }
};

console.log("Built Topics 1 and 2 for Topic 10.");

// ==========================================
// 3. u2-networking-device-hubs: Hubs
// ==========================================
TOPICS_U2_SYLLABUS['u2-networking-device-hubs'] = {
  id: "u2-networking-device-hubs",
  title: "Hubs",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  level: "Beginner",
  category: "devices",
  difficulty: "Core",
  readingTime: "15–20 min",
  standard: "Forouzan Ch. 15.1 / Tanenbaum Ch. 4",
  oneLiner: "A multiport physical layer broadcast device that repeats incoming signals to all other connected ports.",
  quickAnswer: "A hub is a basic multiport physical layer (Layer 1) networking device used to connect multiple computers in a Local Area Network. When an electrical signal enters any hub port, the hub blindly replicates and repeats the signal out through all other connected ports. All devices connected to a hub share a single common collision domain and a single broadcast domain, operating strictly in half-duplex mode.",
  whyItMatters: "Hubs were the dominant central wiring device of 10BASE-T Ethernet in the 1990s, replacing fragile coaxial daisy-chains with star cabling. Understanding hubs is essential to appreciate why modern Ethernet switches were invented to replace them.",
  prerequisitesList: [
    { concept: "Multiport Repeater", meaning: "A device that functions like a repeater across multiple physical interfaces" },
    { concept: "Shared Collision Domain", meaning: "A network segment where simultaneous transmissions from any two hosts collide" },
    { concept: "Half-Duplex", meaning: "A communication channel where devices can transmit or receive, but not both at the same time" }
  ],
  learningObjectives: [
    "Define an Ethernet hub and state its operating OSI layer.",
    "Explain the step-by-step working of a hub with the 4-computer scenario (Computer A, B, C, D).",
    "Identify and compare the 3 types of hubs: Passive Hub, Active Hub, and Intelligent Hub.",
    "Evaluate the major disadvantages of hubs: shared bandwidth, collisions, and security risks."
  ],
  infobox: {
    layer: "Layer 1 (Physical Layer)",
    standard: "IEEE 802.3 (10BASE-T / 100BASE-TX Hubs)",
    type: "Multiport Broadcast Concentrator",
    prerequisites: ["u2-networking-device-repeaters"],
    relatedConcepts: ["switches", "collision-domain", "half-duplex", "csma-cd"],
    compareWith: ["switches", "bridges", "repeaters"],
    primaryUses: ["Legacy 10BASE-T star networks, low-cost network taps for packet analysis, legacy test labs"]
  },
  imageUrl: imgHub,
  imageCaption: "Figure: Multiport Hub (L1): Electrical Signal Repeating: Single Collision Domain, Single Broadcast Domain.",
  sections: {
    overview: `
      <p class="lead">A <strong>hub</strong> is a basic networking device used to interconnect multiple computers and devices in a Local Area Network (LAN). It is fundamentally a <strong>multiport repeater</strong> operating at the <strong>Physical Layer (Layer 1)</strong> of the OSI model.</p>

      <p>A hub receives incoming electrical signals on any port and immediately repeats and broadcasts them out through all of its other ports without inspecting packet contents or addresses.</p>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">Step-by-Step Working of a Hub (From Syllabus)</h4>
      <p class="text-xs">Suppose four computers (A, B, C, and D) are connected to a 4-port hub:</p>
      <ul class="list-disc pl-5 space-y-1 text-xs">
        <li><strong>Step 1:</strong> Computer A sends an Ethernet data frame intended specifically for Computer C.</li>
        <li><strong>Step 2:</strong> The hub receives the electrical signal from Computer A on Port 1.</li>
        <li><strong>Step 3:</strong> The hub does <em>not</em> read Computer C's MAC address; it blindly <strong>repeats the signal through all other ports (Ports 2, 3, and 4)</strong>.</li>
        <li><strong>Step 4:</strong> Computers B, C, and D all receive the physical signal simultaneously!</li>
        <li><strong>Step 5:</strong> Computer C checks the destination MAC address, sees a match, and processes the frame. Computers B and D inspect the destination MAC, see that it does not match their hardware addresses, and silently discard the frame.</li>
      </ul>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">The Three Types of Hubs</h4>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-2.5 my-3 text-xs">
        <div class="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <strong class="text-slate-800 dark:text-slate-200 block mb-1">1. Passive Hub</strong>
          <ul class="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-400 text-[11px]">
            <li>Acts purely as a physical connection point.</li>
            <li>Does <strong>not</strong> regenerate or amplify signals.</li>
            <li>Requires no external electrical power.</li>
            <li>Merely splits/distributes the electrical signal across connected pins.</li>
          </ul>
        </div>
        <div class="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
          <strong class="text-blue-800 dark:text-blue-300 block mb-1">2. Active Hub</strong>
          <ul class="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-400 text-[11px]">
            <li>Regenerates and amplifies signals like a multiport repeater.</li>
            <li>Requires an external power supply.</li>
            <li>Overcomes cable attenuation and extends the maximum network diameter.</li>
            <li>Helps clean out transmission noise before repeating to other ports.</li>
          </ul>
        </div>
        <div class="p-3 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
          <strong class="text-purple-800 dark:text-purple-300 block mb-1">3. Intelligent Hub (Smart Hub)</strong>
          <ul class="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-400 text-[11px]">
            <li>Includes built-in microprocessor and memory.</li>
            <li>Provides network monitoring, port mirroring, and SNMP management.</li>
            <li>Allows network administrators to remotely enable, disable, or monitor individual ports.</li>
          </ul>
        </div>
      </div>
    `,
    eli10: "A hub is like a megaphone in a crowded classroom. When Alice wants to tell Bob a secret, she has to shout it through the megaphone so Charlie and David hear it too. Bob listens, while Charlie and David try to ignore it.",
    analogy: "Like a multipin electrical power strip: whatever voltage enters the main cord is delivered equally to every single outlet plugged into the strip.",
    howItWorks: `
      <p class="text-xs leading-relaxed">Core operational characteristics of hubs:</p>
      <ul class="list-disc pl-5 space-y-1 text-xs">
        <li><strong>Layer 1 Device:</strong> Operates strictly at the physical layer; completely unaware of MAC addresses, IP addresses, or frame formats.</li>
        <li><strong>Single Collision Domain:</strong> All connected devices reside in the exact same collision domain. If Computer A and Computer B transmit at the same instant, their signals collide on the hub's internal shared bus.</li>
        <li><strong>Half-Duplex Only:</strong> A station cannot transmit and receive simultaneously. All stations must run CSMA/CD backoff algorithms.</li>
        <li><strong>Shared Bandwidth:</strong> If a hub is rated for 100 Mbps, that 100 Mbps is shared among all connected stations. If 10 computers transmit, each gets an average of only 10 Mbps!</li>
      </ul>
    `,
    technicalDetails: `
      <p class="text-xs leading-relaxed">Security vulnerabilities of hub networks:</p>
      <ul class="list-disc pl-5 space-y-1 text-xs">
        <li><strong>Eavesdropping (Packet Sniffing):</strong> Because the hub broadcasts every frame to every port, any workstation running Wireshark or <code>tcpdump</code> in promiscuous mode can capture and read all unencrypted network traffic (passwords, emails, files) intended for other computers.</li>
        <li>This fundamental architectural flaw led to the complete phaseout of hubs in commercial networks in favor of secure Layer 2 switches.</li>
      </ul>
    `,
    workedExamples: [
      {
        title: "Example: Hub Distribution Behavior (PDF Solved Example 4)",
        difficulty: "Beginner",
        problem: "A hub connects five computers. If Computer A sends a data frame intended for Computer C, how does the hub distribute it, and what do the other computers do?",
        solution: "1. The hub receives the physical signal from Computer A on its port.\n2. Since the hub operates at Layer 1 and cannot read MAC addresses, it repeats the incoming signal through all other 4 ports.\n3. All connected computers (B, C, D, and E) receive the physical frame.\n4. Computer C identifies that the destination MAC matches its own network card and processes the payload.\n5. Computers B, D, and E see that the destination MAC does not match their hardware address and discard the frame."
      }
    ],
    advantagesLimitations: `
      <table class="wiki-table">
        <thead><tr><th>Hub Advantages</th><th>Hub Disadvantages</th></tr></thead>
        <tbody>
          <tr><td>Extremely simple network connectivity and plug-and-play installation.</td><td>Sends all traffic to every connected device, wasting network bandwidth.</td></tr>
          <tr><td>Very inexpensive compared to intelligent switches.</td><td>Shares total bandwidth among all connected devices.</td></tr>
          <tr><td>Easily interconnects small clusters of devices in simple legacy setups.</td><td>Frequent collisions occur, drastically degrading throughput under heavy load.</td></tr>
          <tr><td>Can serve as a cheap hardware network tap for packet inspection.</td><td>Severe security vulnerability (any station can sniff all frames).</td></tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "Legacy 1990s 10BASE-T and 100BASE-TX Ethernet Local Area Networks.",
      "Hardware network tapping in educational or security penetration testing labs.",
      "Industrial automation legacy diagnostic points."
    ],
    quiz: [
      {
        question: "How many collision domains does a 16-port Ethernet hub create?",
        options: ["1 collision domain", "8 collision domains", "16 collision domains", "32 collision domains"],
        correct: 0,
        explanation: "All ports on a hub share a single internal bus, forming exactly ONE shared collision domain."
      },
      {
        question: "Which type of hub does NOT require external electrical power and does not regenerate signals?",
        options: ["Active hub", "Passive hub", "Intelligent hub", "Layer 3 hub"],
        correct: 1,
        explanation: "A passive hub merely serves as a physical connection point without signal regeneration and requires no power."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, Chapter 15.1: Hubs.", url: "" },
      { cite: "Andrew S. Tanenbaum, Computer Networks, 6th Edition, Chapter 4.", url: "" }
    ]
  }
};

// ==========================================
// 4. u2-networking-device-bridges: Bridges
// ==========================================
TOPICS_U2_SYLLABUS['u2-networking-device-bridges'] = {
  id: "u2-networking-device-bridges",
  title: "Bridges",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  level: "Beginner",
  category: "devices",
  difficulty: "Core",
  readingTime: "20–25 min",
  standard: "Forouzan Ch. 15 / IEEE 802.1D",
  oneLiner: "A Layer 2 networking device that connects LAN segments and filters frames based on MAC addresses to partition collision domains.",
  quickAnswer: "A bridge is a Data Link Layer (Layer 2) networking device that connects two or more LAN segments and forwards frames between them using physical MAC addresses. A bridge examines incoming frames, dynamically learns device locations in its forwarding database, forwards frames across segments when necessary, and filters (drops) intra-segment frames to eliminate unnecessary traffic and separate collision domains.",
  whyItMatters: "Bridges introduced intelligent packet filtering to Local Area Networks. By dividing large shared buses into distinct collision domains, bridges multiplied network bandwidth, extended maximum network diameter, and paved the way for modern Ethernet switches.",
  prerequisitesList: [
    { concept: "MAC Address", meaning: "48-bit unique hardware identifier burned into each network interface" },
    { concept: "Collision Domain Segmentation", meaning: "Dividing a single large collision domain into isolated smaller segments" },
    { concept: "Forwarding Table", meaning: "Dynamic database mapping station MAC addresses to bridge port interfaces" }
  ],
  learningObjectives: [
    "Define a bridge and state its operating OSI layer.",
    "Enumerate the 5 key functions of a bridge.",
    "Describe the 5 sequential working steps of a bridge upon receiving an Ethernet frame.",
    "Explain how bridges isolate collision domains while maintaining a single broadcast domain."
  ],
  infobox: {
    layer: "Layer 2 (Data Link Layer)",
    standard: "IEEE 802.1D",
    type: "Segment Interconnection & Filtering",
    prerequisites: ["network-devices", "u2-networking-device-hubs"],
    relatedConcepts: ["switches", "transparent-bridges", "forwarding-and-filtering", "stp"],
    compareWith: ["hubs", "switches", "routers"],
    primaryUses: ["Connecting legacy coaxial segments, segmenting collision domains, wireless bridging"]
  },
  imageUrl: imgSwitch,
  imageCaption: "Figure: Layer 2 Bridge: Separating Collision Domains while Maintaining a Single Broadcast Domain.",
  sections: {
    overview: `
      <p class="lead">A <strong>bridge</strong> is a networking device that operates at the <strong>Data Link Layer (Layer 2)</strong> of the OSI model, connecting two or more distinct LAN segments and intelligently forwarding data frames between them based on physical MAC addresses.</p>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">The 5 Essential Functions of a Bridge</h4>
      <ul class="list-disc pl-5 space-y-1.5 text-xs">
        <li><strong>1. Connects LAN Segments:</strong> Bridges physical boundaries between different segments (e.g., connecting a fiber link to a copper link).</li>
        <li><strong>2. Learns MAC Addresses:</strong> Dynamically builds a forwarding table by inspecting the source MAC address of incoming frames.</li>
        <li><strong>3. Forwards Frames:</strong> Transmits frames to the appropriate destination segment when the recipient is located across the bridge.</li>
        <li><strong>4. Filters Unnecessary Frames:</strong> Discards frames whose destination is on the local segment, keeping remote segments silent.</li>
        <li><strong>5. Reduces Inter-Segment Traffic:</strong> Confines intra-segment chatter locally, increasing overall network throughput.</li>
      </ul>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">Working of a Bridge (From Syllabus)</h4>
      <ol class="list-decimal pl-5 space-y-1 text-xs">
        <li><strong>Receives an Ethernet frame</strong> from the physical layer of the incoming segment.</li>
        <li><strong>Reads both source and destination MAC addresses</strong> from the Layer 2 header.</li>
        <li><strong>Learns the source address</strong> and incoming port, updating its forwarding database.</li>
        <li><strong>Checks its forwarding table</strong> to determine the port mapped to the destination MAC address.</li>
        <li><strong>Executes action:</strong> Forwards the frame to the destination port, filters (drops) it if destination is on the same port, or floods it if destination is unknown.</li>
      </ol>
    `,
    eli10: "A bridge is like a smart door between two rooms. If two people in Room A talk, the door stays shut. If someone in Room A wants to send a note to Room B, the bridge opens the door and hands the note across.",
    analogy: "Like a traffic control checkpoint between two city districts: cars staying within District 1 are turned away from the bridge (filtering), while cars heading to District 2 are permitted to cross.",
    howItWorks: `
      <p class="text-xs leading-relaxed">Collision and broadcast domain separation:</p>
      <ul class="list-disc pl-5 space-y-1 text-xs">
        <li><strong>Collision Domain Separation:</strong> A bridge divides a single collision domain into multiple independent collision domains. Collisions on Segment 1 do not propagate to Segment 2.</li>
        <li><strong>Single Broadcast Domain:</strong> A bridge does <em>not</em> separate broadcast domains. Broadcast frames (such as ARP requests) are flooded across all segments so that all stations receive them.</li>
      </ul>
    `,
    technicalDetails: `
      <p class="text-xs leading-relaxed">Bridge limitations compared to modern switches:</p>
      <ul class="list-disc pl-5 space-y-1 text-xs">
        <li>Traditional bridges were software-based, using a general-purpose processor to inspect frames in system memory, limiting throughput to tens of thousands of frames per second.</li>
        <li>Traditional bridges offered very few ports (typically 2 to 4 ports), whereas modern switches offer dozens of hardware ASIC ports.</li>
      </ul>
    `,
    workedExamples: [
      {
        title: "Example: Forwarding vs Filtering on Bridge Ports",
        difficulty: "Beginner",
        problem: "Bridge B connects Segment 1 (Hosts A and B) and Segment 2 (Hosts C and D). Host A transmits a frame destined for Host B. Describe the bridge's operation.",
        solution: "1. The frame arrives on Port 1 from Host A.\n2. Bridge B inspects its table: Host B is on Port 1.\n3. Since destination port (Port 1) == incoming arrival port (Port 1), Bridge B FILTERS (discards) the frame.\n4. Host B has already received the frame directly over Segment 1's shared wire. Segment 2 is spared from unnecessary traffic."
      }
    ],
    advantagesLimitations: `
      <table class="wiki-table">
        <thead><tr><th>Bridge Advantages</th><th>Bridge Disadvantages</th></tr></thead>
        <tbody>
          <tr><td>Reduces unnecessary traffic between LAN segments.</td><td>Traditional bridges have very limited port capacity (2–4 ports).</td></tr>
          <tr><td>Separates collision domains, multiplying available bandwidth.</td><td>Software frame inspection can introduce forwarding delays.</td></tr>
          <tr><td>Learns MAC addresses automatically in learning bridges.</td><td>Redundant connections can create fatal broadcast loops without STP.</td></tr>
          <tr><td>Connects heterogeneous physical media (coaxial to twisted pair).</td><td>Does not separate broadcast domains.</td></tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "Legacy 10BASE5 / 10BASE-T campus interconnects.",
      "Wireless Point-to-Point bridges connecting distant office buildings.",
      "Linux container network bridging (`br0` interface)."
    ],
    quiz: [
      {
        question: "How does a bridge affect collision domains and broadcast domains?",
        options: ["Separates collision domains; maintains a single broadcast domain", "Separates broadcast domains; maintains a single collision domain", "Separates both collision and broadcast domains", "Does not separate either domain"],
        correct: 0,
        explanation: "A bridge separates collision domains between its ports, but maintains a single shared broadcast domain."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, Chapter 15.1: Bridges.", url: "" },
      { cite: "IEEE Std 802.1D: MAC Bridges.", url: "" }
    ]
  }
};

// ==========================================
// 5. u2-networking-device-switches: Switches
// ==========================================
TOPICS_U2_SYLLABUS['u2-networking-device-switches'] = {
  id: "u2-networking-device-switches",
  title: "Switches",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  level: "Beginner",
  category: "devices",
  difficulty: "Core",
  readingTime: "20–25 min",
  standard: "Forouzan Ch. 15 / IEEE 802.3",
  oneLiner: "A high-performance multiport bridge that forwards frames at wire speed using hardware ASICs, providing dedicated collision domains per port.",
  quickAnswer: "A switch is a high-speed networking device that connects multiple computers and devices in a Local Area Network and forwards frames using MAC addresses. Operating primarily at the Data Link Layer (Layer 2), an Ethernet switch provides dedicated full-duplex bandwidth to each port (microsegmentation), eliminating collisions completely. Advanced multilayer switches can also perform Layer 3 IP routing between VLANs.",
  whyItMatters: "The Ethernet switch is the indispensable foundation of all modern wired LANs. By replacing shared hubs with dedicated full-duplex ASIC switching fabrics, switches enabled the transition from 10 Mbps shared networks to 100 Gbps wire-speed cloud data centers.",
  prerequisitesList: [
    { concept: "CAM Table", meaning: "Content Addressable Memory table mapping MAC addresses to switch ports" },
    { concept: "Microsegmentation", meaning: "Isolating every single switch port into its own private collision domain" },
    { concept: "VLAN", meaning: "Virtual Local Area Network partitioning broadcast domains within a switch" }
  ],
  learningObjectives: [
    "Define an Ethernet switch and identify its operating OSI layers.",
    "Explain the step-by-step working of a switch including MAC learning and CAM lookup.",
    "Compare the 3 types of switches: Unmanaged Switch, Managed Switch, and Layer 3 Switch.",
    "Explain the concept and performance benefits of microsegmentation and full-duplex operation."
  ],
  infobox: {
    layer: "Layer 2 (Data Link Layer) & Layer 3 (Multilayer)",
    standard: "IEEE 802.3 / IEEE 802.1Q",
    type: "Multiport Wire-Speed Switching",
    prerequisites: ["u2-networking-device-bridges", "dll-switching"],
    relatedConcepts: ["vlan", "cam-table", "stp", "layer3-switch"],
    compareWith: ["hubs", "bridges", "routers"],
    primaryUses: ["Enterprise campus access/distribution/core, data center leaf-spine fabrics, home LANs"]
  },
  imageUrl: imgSwitch,
  imageCaption: "Figure: Multiport Layer 2 Switch: Dedicated Collision Domain per Port with Full-Duplex Microsegmentation.",
  sections: {
    overview: `
      <p class="lead">A <strong>switch</strong> is a high-speed networking device that connects multiple devices in a Local Area Network (LAN) and intelligently forwards data frames using <strong>hardware MAC addresses</strong>.</p>

      <p>A traditional Ethernet switch operates primarily at the <strong>Data Link Layer (Layer 2)</strong>. It is architecturally a high-performance, wire-speed multiport bridge. In modern networks, <strong>multilayer switches (Layer 3 switches)</strong> can also inspect IP headers and perform inter-VLAN routing at hardware wire speed.</p>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">Step-by-Step Working of a Switch (From Syllabus)</h4>
      <ol class="list-decimal pl-5 space-y-1 text-xs">
        <li><strong>Receives a frame</strong> on an ingress port.</li>
        <li><strong>Reads the Source MAC address:</strong> Identifies which device transmitted the frame.</li>
        <li><strong>Learns the Source MAC and incoming port:</strong> Records the mapping into its high-speed CAM table, resetting its aging timer.</li>
        <li><strong>Checks the Destination MAC address:</strong> Queries the CAM table for the destination address.</li>
        <li><strong>Forwards the frame:</strong> If destination is known on another port, directs the frame exclusively through that port.</li>
        <li><strong>Floods the frame:</strong> If destination is unknown or broadcast, floods copies to all active ports (except incoming port) within the applicable VLAN.</li>
      </ol>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">The Three Main Types of Switches</h4>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-2.5 my-3 text-xs">
        <div class="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <strong class="text-slate-800 dark:text-slate-200 block mb-1">1. Unmanaged Switch</strong>
          <p class="text-[11px] text-slate-600 dark:text-slate-400">Works with zero configuration (plug-and-play). Fixed settings, no VLANs or remote monitoring. Ideal for home networks and small offices.</p>
        </div>
        <div class="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
          <strong class="text-blue-800 dark:text-blue-300 block mb-1">2. Managed Switch</strong>
          <p class="text-[11px] text-slate-600 dark:text-slate-400">Supports extensive configuration and monitoring (CLI, Web, SNMP). Supports VLANs (802.1Q), STP loop prevention, QoS prioritization, and port security.</p>
        </div>
        <div class="p-3 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
          <strong class="text-purple-800 dark:text-purple-300 block mb-1">3. Layer 3 Switch</strong>
          <p class="text-[11px] text-slate-600 dark:text-slate-400">Combines high-density Layer 2 switching with hardware-based Layer 3 IP routing. Routes traffic between VLANs at wire speed without bottlenecking an external router.</p>
        </div>
      </div>
    `,
    eli10: "A switch is like a private telephone exchange. When you call your friend in Room 3, the switch creates a private direct connection between you two, allowing 20 other people in other rooms to make private calls at the exact same moment without interference.",
    analogy: "Like a private courier sorting hub with dedicated conveyor belts: instead of dumping all packages into a central pile, robotic scanners read each package's barcode and route it down a private track directly to the delivery truck.",
    howItWorks: `
      <p class="text-xs leading-relaxed">Microsegmentation and Full-Duplex wire speed:</p>
      <ul class="list-disc pl-5 space-y-1 text-xs">
        <li><strong>Microsegmentation:</strong> Every single port on a switch is its own private collision domain. When a computer is connected directly to a switch port, only two devices exist on that link (the computer's NIC and the switch port).</li>
        <li><strong>Full-Duplex Mode:</strong> Because collision risks are eliminated, the link operates in full-duplex mode: separate pairs of wires are used for transmitting and receiving, doubling link capacity (e.g., 1000 Mbps send + 1000 Mbps receive = 2000 Mbps bandwidth).</li>
      </ul>
    `,
    technicalDetails: `
      <p class="text-xs leading-relaxed">Switching forwarding modes:</p>
      <ul class="list-disc pl-5 space-y-1 text-xs">
        <li><strong>Store-and-Forward:</strong> Completely receives and buffers the frame, validates the 32-bit CRC checksum, and drops corrupted frames. Standard in enterprise switches.</li>
        <li><strong>Cut-Through:</strong> Reads only the first 6 bytes (destination MAC) and immediately forwards the frame before the rest arrives, achieving $< 1\\;\\mu\\text{s}$ latency.</li>
        <li><strong>Fragment-Free:</strong> Checks the first 64 bytes (Ethernet collision window) to filter runt frames before forwarding.</li>
      </ul>
    `,
    workedExamples: [
      {
        title: "Example: Connecting 30 Computers in a LAN (PDF Solved Example 3)",
        difficulty: "Beginner",
        problem: "A computer laboratory has 30 computers that need to communicate reliably and fast within the same Local Area Network.\nQuestion: Which networking device is most suitable, and what is the technical reason?",
        solution: "Answer: An **Ethernet Switch**.\nTechnical Reason: An Ethernet switch connects multiple devices, maintains a dynamic CAM table, and forwards frames specifically to destination ports using MAC addresses. Furthermore, it provides a dedicated collision domain for each of the 30 computers, enabling full-duplex, collision-free communication."
      }
    ],
    advantagesLimitations: `
      <table class="wiki-table">
        <thead><tr><th>Switch Advantages</th><th>Switch Disadvantages</th></tr></thead>
        <tbody>
          <tr><td>Reduces unnecessary traffic by directing unicast frames only to target ports.</td><td>More expensive than basic unmanaged hubs.</td></tr>
          <tr><td>Provides a dedicated collision domain for each switch port.</td><td>Requires knowledgeable configuration for VLANs, trunks, and security.</td></tr>
          <tr><td>Supports full-duplex simultaneous transmission and reception.</td><td>Incorrect configuration (e.g., VLAN mismatch) can disrupt communication.</td></tr>
          <tr><td>Drastically improves LAN performance, scalability, and security.</td><td>Broadcast traffic still floods across the VLAN and must be managed.</td></tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "Access Layer Switches connecting office PCs, printers, and phones.",
      "Data Center Top-of-Rack (ToR) 10G/25G/100G switches.",
      "Smart Home Gigabit switches connecting gaming PCs, NAS storage, and smart TVs."
    ],
    quiz: [
      {
        question: "What is the primary benefit of microsegmentation provided by an Ethernet switch?",
        options: ["It compresses data frames to reduce size", "Each port becomes its own isolated collision domain, eliminating collisions", "It assigns static IP addresses automatically", "It encrypts frame payloads with AES-256"],
        correct: 1,
        explanation: "Microsegmentation isolates every switch port into an independent collision domain, allowing full-duplex communication without collisions."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, Chapter 15.", url: "" },
      { cite: "Cisco Networking Academy: CCNA Switch Operations and Architecture.", url: "" }
    ]
  }
};

// Write partial checkpoint
console.log("Built Topics 1 to 5 for Topic 10.");

// ==========================================
// 6. u2-networking-device-routers: Routers
// ==========================================
TOPICS_U2_SYLLABUS['u2-networking-device-routers'] = {
  id: "u2-networking-device-routers",
  title: "Routers",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  level: "Intermediate",
  category: "devices",
  difficulty: "Core",
  readingTime: "25–30 min",
  standard: "Forouzan Ch. 15 / Kurose & Ross Ch. 4",
  oneLiner: "A Layer 3 internetworking device that connects different IP networks and forwards packets using logical routing tables.",
  quickAnswer: "A router is a Network Layer (Layer 3) networking device that connects two or more different IP networks (such as a local LAN and an ISP WAN) and forwards data packets between them using logical IP addresses. A router inspects the destination IP address of incoming packets, consults its routing table, calculates the optimal path using routing algorithms, decrements the TTL, and forwards the packet out the appropriate interface, separating broadcast domains.",
  whyItMatters: "While switches interconnect machines within a single subnetwork, routers are the architects of the global Internet. Routers bind millions of independent heterogeneous networks together into a single cohesive worldwide internetwork.",
  prerequisitesList: [
    { concept: "Logical IP Address", meaning: "Hierarchical 32-bit (IPv4) or 128-bit (IPv6) network layer address" },
    { concept: "Routing Table", meaning: "Database of known network prefixes, subnet masks, next-hop IPs, and interface metrics" },
    { concept: "Broadcast Domain Boundary", meaning: "Routers block Layer 2 broadcast frames, confining broadcasts to the local subnet" }
  ],
  learningObjectives: [
    "Define a router and identify its primary operating layer in the OSI Reference Model.",
    "Explain why a router is required to connect different IP networks.",
    "Describe the 5 operational steps a router executes upon receiving an IP packet.",
    "Identify and compare the 4 main types of routers: Wired, Wireless, Core, and Edge routers.",
    "Explain the role of routers in separating broadcast domains and providing NAT/DHCP/firewall services."
  ],
  infobox: {
    layer: "Layer 3 (Network Layer)",
    standard: "IETF IPv4 (RFC 791) / IPv6 (RFC 8200) / OSPF / BGP",
    type: "Network Layer Routing & Path Determination",
    prerequisites: ["network-devices", "ip-addressing"],
    relatedConcepts: ["routing-table", "default-gateway", "nat", "broadcast-domain"],
    compareWith: ["switches", "gateways", "layer3-switches"],
    primaryUses: ["Internet WAN routing, campus core routing, branch office SD-WAN, residential internet gateways"]
  },
  imageUrl: imgRouter,
  imageCaption: "Figure: Layer 3 Router: Logical IP Addressing, Path Determination, and Broadcast Domain Separation.",
  sections: {
    overview: `
      <p class="lead">A <strong>router</strong> is a networking device that connects different IP networks and forwards data packets between them using <strong>logical IP addresses</strong>.</p>

      <p>A router operates at the <strong>Network Layer (Layer 3)</strong> of the OSI model. Whereas a switch connects devices within a single local LAN, a router allows devices on one local network to communicate with devices on completely different subnets, remote branches, or across the global Internet.</p>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">Why is a Router Needed?</h4>
      <p class="text-xs leading-relaxed">
        Switches only understand flat 48-bit MAC addresses and broadcast frames across their local VLAN. If an entire city were connected with switches, broadcast storms would instantly paralyze the network!
        <br>&bull; A router <strong>blocks Layer 2 broadcasts</strong>, terminating the broadcast domain at each of its routed interfaces.
        <br>&bull; A router understands <strong>hierarchical IP addressing</strong> (network ID + host ID), enabling scalable packet forwarding across millions of networks worldwide.
        <br>&bull; For example, your home wireless router connects your private home LAN (e.g., <code><code>192.168.1.0/24</code></code>') to your Internet Service Provider's public routing network.
      </p>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">Working of a Router (5 Operational Steps)</h4>
      <ol class="list-decimal pl-5 space-y-1 text-xs">
        <li><strong>Receives an incoming frame</strong> and strips off the Layer 2 Ethernet header and trailer to extract the enclosed IP packet.</li>
        <li><strong>Examines the Destination IP address</strong> inside the Layer 3 header.</li>
        <li><strong>Checks its Routing Table</strong> to find the longest matching network prefix.</li>
        <li><strong>Selects the best available route:</strong> Determines the next-hop router IP and the corresponding outgoing physical interface.</li>
        <li><strong>Re-encapsulates & Forwards:</strong> Decrements the Time-to-Live (TTL) field, recalculates the IP header checksum, builds a brand-new Layer 2 frame addressed to the next-hop MAC, and transmits it out the selected interface.</li>
      </ol>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">The Four Types of Routers</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 my-3 text-xs">
        <div class="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
          <strong class="text-blue-800 dark:text-blue-300 block mb-1">1. Wired Router</strong>
          <p class="text-[11px] text-slate-600 dark:text-slate-400">Connects devices and networks through high-speed wired interfaces (Ethernet, Gigabit fiber, serial T1/E1 lines).</p>
        </div>
        <div class="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
          <strong class="text-emerald-800 dark:text-emerald-300 block mb-1">2. Wireless Router</strong>
          <p class="text-[11px] text-slate-600 dark:text-slate-400">Combines IP routing with Wi-Fi wireless access point functionality, commonly used in residential homes and small offices.</p>
        </div>
        <div class="p-3 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
          <strong class="text-purple-800 dark:text-purple-300 block mb-1">3. Core Router</strong>
          <p class="text-[11px] text-slate-600 dark:text-slate-400">High-capacity backbone routers deployed within the core of ISPs, telecom carriers, and cloud providers forwarding Terabits of data per second.</p>
        </div>
        <div class="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
          <strong class="text-amber-800 dark:text-amber-300 block mb-1">4. Edge / Border Router</strong>
          <p class="text-[11px] text-slate-600 dark:text-slate-400">Positioned at the boundary of an enterprise network to connect the internal organization to external ISP connections and WAN links.</p>
        </div>
      </div>
    `,
    eli10: "A switch is like a mail carrier who delivers letters inside your apartment building. A router is like an airport air-traffic controller who sends airplanes between different cities across the world.",
    analogy: "Like an international postal sorting hub: it reads the country and city name on the envelope, decides whether to put it on a train, plane, or truck, and hands it to the next postal hub along the best highway route.",
    howItWorks: `
      <p class="text-xs leading-relaxed">Integrated services in modern routers:</p>
      <ul class="list-disc pl-5 space-y-1 text-xs">
        <li><strong>NAT (Network Address Translation):</strong> Translates multiple private non-routable IP addresses (e.g., <code><code>192.168.1.0/24</code></code>') into a single publicly routable IP address provided by the ISP.</li>
        <li><strong>DHCP Server:</strong> Automatically assigns dynamic IP addresses, subnet masks, DNS servers, and default gateways to client computers upon connection.</li>
        <li><strong>Stateful Firewall & ACLs:</strong> Inspects packet headers to block unauthorized inbound traffic and safeguard local devices.</li>
      </ul>
    `,
    technicalDetails: `
      <p class="text-xs leading-relaxed">Dynamic Routing Protocols:</p>
      <ul class="list-disc pl-5 space-y-1 text-xs">
        <li>Routers automatically discover network topologies and adapt to cable cuts using interior routing protocols (OSPF, IS-IS, EIGRP) and the global exterior routing protocol (BGP-4).</li>
        <li>Longest Prefix Match (LPM): When multiple routing entries match a destination IP, the router chooses the entry with the most specific (longest) subnet mask prefix.</li>
      </ul>
    `,
    workedExamples: [
      {
        title: "Example: Choosing the Correct Device (PDF Solved Example 1)",
        difficulty: "Beginner",
        problem: "A company wants to connect two completely different IP networks: Network 1 (192.168.10.0/24) in Building A, and Network 2 (172.16.50.0/24) in Building B.\nQuestion: Which networking device should be used, and what is the technical reason?",
        solution: "Answer: A **Router**.\nTechnical Reason: A switch connects devices within the same IP subnet using MAC addresses. Because the two buildings operate on distinct logical IP network prefixes (192.168.10.0/24 and 172.16.50.0/24), a Layer 3 Router is required to maintain routing tables, translate Layer 2 framing, and forward packets between the two different IP networks."
      }
    ],
    advantagesLimitations: `
      <table class="wiki-table">
        <thead><tr><th>Router Advantages</th><th>Router Disadvantages</th></tr></thead>
        <tbody>
          <tr><td>Connects disparate IP networks and WAN technologies.</td><td>Significantly more complex to configure and manage than switches.</td></tr>
          <tr><td>Selects the best available path using dynamic metrics.</td><td>More expensive per interface port than Layer 2 switches.</td></tr>
          <tr><td>Separates broadcast domains, eliminating broadcast storms.</td><td>Header parsing and routing table lookups introduce packet latency.</td></tr>
          <tr><td>Provides robust network security (NAT, ACLs, firewalls).</td><td>Incorrect routing configurations (e.g., loops) can cause blackholes.</td></tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "Enterprise Branch Offices connecting to corporate SD-WANs and cloud services.",
      "ISP Backbone Networks: Cisco 8000 / Juniper PTX core routers.",
      "Consumer Home Broadband: Wi-Fi 6 cable/fiber optic wireless gateways."
    ],
    quiz: [
      {
        question: "What happens to the Layer 2 header of an Ethernet frame when it passes through a router?",
        options: ["The router preserves the Layer 2 header unchanged", "The router strips the incoming Layer 2 header and builds a brand-new Layer 2 header with the next-hop MAC address", "The router converts the MAC address into an IP address", "The router encrypts the Layer 2 header"],
        correct: 1,
        explanation: "Routers strip the old Layer 2 header at each hop, decrement the IP TTL, and build a new Layer 2 header corresponding to the next-hop physical medium."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, Chapter 15: Connecting LANs and Routers.", url: "" },
      { cite: "James Kurose & Keith Ross, Computer Networks: A Top-Down Approach, Chapter 4: The Network Layer.", url: "" }
    ]
  }
};

// ==========================================
// 7. u2-networking-device-gateways: Gateways
// ==========================================
TOPICS_U2_SYLLABUS['u2-networking-device-gateways'] = {
  id: "u2-networking-device-gateways",
  title: "Gateways",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  level: "Intermediate",
  category: "devices",
  difficulty: "Core",
  readingTime: "20–25 min",
  standard: "Forouzan Ch. 15 / ISO 7498-1",
  oneLiner: "A multi-layer protocol converter that connects networks utilizing completely different architectures, formats, or protocols.",
  quickAnswer: "A gateway is a networking device or software system that connects networks operating on different protocols, architectures, or data communication formats. Unlike repeaters, switches, or routers which pass data payloads transparently, a gateway actively translates data at the Transport, Session, Presentation, or Application layers. In everyday consumer networking, the term 'default gateway' refers to the local router that provides an exit point from the local subnet to external networks.",
  whyItMatters: "Different computing platforms, cloud environments, industrial automation buses, and legacy mainframes speak entirely incompatible communication protocols. Gateways make heterogeneous internetworking possible by acting as universal multi-layer protocol translators.",
  prerequisitesList: [
    { concept: "Protocol Translation", meaning: "Converting message syntax, encoding, and control structures between divergent protocols" },
    { concept: "Default Gateway", meaning: "The local router IP address configured on end hosts to reach external IP destinations" },
    { concept: "Application Proxy", meaning: "An intermediary server that terminates client requests, inspects data, and re-initiates server requests" }
  ],
  learningObjectives: [
    "Define a gateway and distinguish it from repeaters, switches, and routers.",
    "Explain why a gateway is not restricted to a single OSI layer.",
    "Identify and compare the 3 types of gateways: Default Gateway, Protocol Gateway, and Application Gateway.",
    "Describe the working of a default gateway in everyday TCP/IP host communication.",
    "Evaluate the advantages and latency trade-offs of protocol translation gateways."
  ],
  infobox: {
    layer: "Layers 4 through 7 (Multi-Layer / Application Layer)",
    standard: "IETF / ITU-T / ISO Cross-Layer Specifications",
    type: "Protocol & Architecture Translation",
    prerequisites: ["network-devices", "u2-networking-device-routers"],
    relatedConcepts: ["default-gateway", "api-gateway", "nat64", "application-proxy"],
    compareWith: ["routers", "firewalls", "proxies"],
    primaryUses: ["Connecting legacy systems to IP networks, VoIP SIP-to-PSTN gateways, cloud API gateways, IoT sensor gateways"]
  },
  imageUrl: imgRouter,
  imageCaption: "Figure: Protocol Gateway: Multi-Layer Translation between Incompatible Application and Transport Protocols.",
  sections: {
    overview: `
      <p class="lead">A <strong>gateway</strong> is a device or software system that connects networks that may use completely different communication protocols, architectures, or data formats.</p>

      <p>While repeaters operate at Layer 1, bridges/switches at Layer 2, and routers at Layer 3, <strong>a gateway is not restricted to any single OSI layer</strong>. Depending on its function, a gateway can operate across Layers 4, 5, 6, and 7, parsing and actively translating full data payloads.</p>

      <div class="wiki-callout note my-3">
        <div class="callout-header"><i class="fa-solid fa-network-wired"></i> Everyday Networking: The Default Gateway</div>
        <p class="text-xs">In everyday IP networking, the term <strong>default gateway</strong> refers specifically to the local router or Layer 3 switch interface configured on a computer (e.g., <code><code>192.168.1.1</code></code>'). Whenever a host wants to send a packet to an IP address outside its local subnet, it sends the packet directly to its default gateway for forwarding.</p>
      </div>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">The Three Main Types of Gateways</h4>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-2.5 my-3 text-xs">
        <div class="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
          <strong class="text-blue-800 dark:text-blue-300 block mb-1">1. Default Gateway</strong>
          <p class="text-[11px] text-slate-600 dark:text-slate-400">The local Layer 3 router interface that an end-host uses as its next hop to reach destinations outside its local IP subnetwork.</p>
        </div>
        <div class="p-3 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
          <strong class="text-purple-800 dark:text-purple-300 block mb-1">2. Protocol Gateway</strong>
          <p class="text-[11px] text-slate-600 dark:text-slate-400">Translates or adapts communication between two fundamentally different protocol suites (e.g., converting IPv4 packets to IPv6 via NAT64, or industrial Modbus to Ethernet TCP/IP).</p>
        </div>
        <div class="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
          <strong class="text-emerald-800 dark:text-emerald-300 block mb-1">3. Application Gateway (Proxy)</strong>
          <p class="text-[11px] text-slate-600 dark:text-slate-400">Provides communication and security translation at the Application Layer (Layer 7). Examples include VoIP SIP gateways, Web Application Firewalls (WAF), and Cloud API Gateways.</p>
        </div>
      </div>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">Step-by-Step Working of a Gateway</h4>
      <ol class="list-decimal pl-5 space-y-1 text-xs">
        <li><strong>Receives data</strong> from one network or communication system.</li>
        <li><strong>Examines destination & communication requirements:</strong> Determines the protocol and encoding used by the destination system.</li>
        <li><strong>Performs protocol & format translation:</strong> Reassembles the payload, strips source protocol headers, maps data fields, and translates character encoding (e.g., ASCII to EBCDIC) or message formatting (e.g., XML to JSON).</li>
        <li><strong>Encapsulates & Transmits:</strong> Repackages the translated data into the destination network's protocol stack and sends it on its way.</li>
      </ol>
    `,
    eli10: "A gateway is like an international diplomatic translator. When the French ambassador wants to talk to the Japanese ambassador, they can't understand each other directly. The gateway listens to French, translates the meaning, and speaks Japanese so both can cooperate.",
    analogy: "Like an electrical plug travel adapter that also converts voltage: when traveling from the US (110V flat prongs) to Europe (230V round prongs), the gateway adapter changes both the physical plug shape and the electrical voltage so your laptop doesn't fry.",
    howItWorks: `
      <p class="text-xs leading-relaxed">Functions performed by modern gateways:</p>
      <ul class="list-disc pl-5 space-y-1 text-xs">
        <li><strong>Protocol Conversion:</strong> Mapping commands and acknowledgments between dissimilar protocol state machines.</li>
        <li><strong>Data Format Transformation:</strong> Converting between legacy binary formats and modern REST/JSON microservices.</li>
        <li><strong>Entry and Exit Control:</strong> Enforcing authentication, TLS encryption offloading, rate limiting, and access policies.</li>
      </ul>
    `,
    technicalDetails: `
      <p class="text-xs leading-relaxed">API Gateways and Cloud Architectures:</p>
      <ul class="list-disc pl-5 space-y-1 text-xs">
        <li>In modern cloud computing, <strong>API Gateways</strong> (e.g., AWS API Gateway, Kong, Envoy) serve as the unified entry point for mobile and web clients, routing HTTP requests to internal gRPC or microservice endpoints, terminating SSL, and handling token verification.</li>
      </ul>
    `,
    workedExamples: [
      {
        title: "Example: Identifying a Default Gateway (PDF Solved Example 5)",
        difficulty: "Beginner",
        problem: "A computer has an IP address of `<code><code>192.168.1.1</code>0</code>`, subnet mask `<code>255.255.255.0</code>`, and a default gateway of `<code>192.168.1.1</code>`. The computer wants to open a web page on `<code>142.250.190.46</code>` (Google).\nQuestion: What is the specific operational purpose of the default gateway in this transaction?",
        solution: "1. The computer compares the destination IP (`<code>142.250.190.46</code>`) with its own subnet mask (`<code>255.255.255.0</code>`).\n2. It determines that the destination resides on a remote network outside its local subnet.\n3. The computer cannot deliver the frame directly via Layer 2 MAC address. Therefore, it transmits the IP packet to its **Default Gateway (`<code>192.168.1.1</code>`)**.\n4. The default gateway router receives the packet, inspects its routing table, and forwards the packet out to the ISP WAN to reach Google."
      }
    ],
    advantagesLimitations: `
      <table class="wiki-table">
        <thead><tr><th>Gateway Advantages</th><th>Gateway Disadvantages</th></tr></thead>
        <tbody>
          <tr><td>Enables communication between completely incompatible architectures.</td><td>Deep protocol and format translation introduces significant latency.</td></tr>
          <tr><td>Can translate between divergent network protocols and encodings.</td><td>Complex to configure, troubleshoot, and maintain.</td></tr>
          <tr><td>Provides powerful application-level security and filtering.</td><td>Can become a bottleneck and single point of failure without redundancy.</td></tr>
          <tr><td>Supports hybrid legacy-to-cloud network migrations.</td><td>Requires high processing power and memory for full payload buffering.</td></tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "VoIP Telecom Gateways connecting digital IP phone networks to traditional analog PSTN telephone lines.",
      "Cloud Microservices API Gateways (Kong, Envoy, Apigee, AWS API Gateway).",
      "Industrial IoT Gateways converting Zigbee/LoRaWAN sensor readings into MQTT/HTTP cloud packets."
    ],
    quiz: [
      {
        question: "Why is a gateway not restricted to a single specific layer of the OSI model?",
        options: ["Because gateways do not use electricity", "Because a gateway can operate across Layers 4 through 7 depending on the required protocol and format translation", "Because gateways only operate at the Physical Layer", "Because gateways bypass all networking standards"],
        correct: 1,
        explanation: "A gateway translates protocols, data formats, or application semantics, allowing it to function at Transport, Session, Presentation, or Application layers."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, Chapter 15.1: Gateways.", url: "" },
      { cite: "ISO/IEC 7498-1: Open Systems Interconnection Basic Reference Model.", url: "" }
    ]
  }
};

// ==========================================
// 8. u2-device-working-principles: Working Principles of Each Networking Device
// ==========================================
TOPICS_U2_SYLLABUS['u2-device-working-principles'] = {
  id: "u2-device-working-principles",
  title: "Working Principles of Each Networking Device",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  level: "Intermediate",
  category: "devices",
  difficulty: "Core",
  readingTime: "25–30 min",
  standard: "Forouzan Ch. 15 / Tanenbaum Ch. 4",
  oneLiner: "The operational mechanisms of connecting devices and their precise demarcation of collision and broadcast domains.",
  quickAnswer: "The working principles of networking devices reflect their operating OSI layer: Repeaters regenerate physical signals; Hubs repeat bits to all ports; Bridges filter and forward frames via MAC addresses; Switches microsegment traffic in hardware ASICs; Routers route packets between IP subnets; and Gateways translate protocols. Crucially, Hubs share 1 collision and 1 broadcast domain; Bridges and Switches provide separate collision domains per port but 1 broadcast domain per VLAN; while Routers separate both collision and broadcast domains.",
  whyItMatters: "Mastering collision and broadcast domain boundaries is the single most tested concept in undergraduate computer networking examinations and industrial network engineering certifications (CCNA/Network+).",
  prerequisitesList: [
    { concept: "Collision Domain", meaning: "A logical network area where simultaneous frame transmissions collide on a shared physical medium" },
    { concept: "Broadcast Domain", meaning: "The collection of all network interfaces that receive a Layer 2 broadcast frame" },
    { concept: "Split Horizon", meaning: "The operational rule preventing a device from sending a frame back out the arrival port" }
  ],
  learningObjectives: [
    "Define collision domain and broadcast domain with absolute clarity.",
    "Explain how hubs, switches, and routers partition collision and broadcast boundaries.",
    "Reproduce the definitive Domain Boundary Comparison Table from the curriculum.",
    "Solve network topology analysis problems calculating total collision and broadcast domains."
  ],
  infobox: {
    layer: "Layers 1, 2, and 3",
    standard: "IEEE 802.3 / IEEE 802.1D / IETF IP",
    type: "Comparative Principles & Domain Boundaries",
    prerequisites: ["network-devices", "u2-networking-device-hubs", "u2-networking-device-switches"],
    relatedConcepts: ["microsegmentation", "vlan", "broadcast-storm", "cam-table"],
    compareWith: ["collision-domain-vs-broadcast-domain"],
    primaryUses: ["Network topology design, collision elimination, broadcast containment, exam numericals"]
  },
  imageUrl: imgDevices,
  imageCaption: "Figure: Comparative Working Principles of Hubs, Switches, and Routers.",
  sections: {
    overview: `
      <p class="lead">Understanding <strong>collision domains</strong> and <strong>broadcast domains</strong> is the fundamental theoretical key to understanding the differences between repeaters, hubs, bridges, switches, and routers.</p>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">1. What is a Collision Domain?</h4>
      <p class="text-xs leading-relaxed">
        A <strong>collision domain</strong> is a network segment in which simultaneous transmissions from two or more stations can interfere and collide with each other on a shared communication medium.
        <br>&bull; <strong>Hubs:</strong> A hub places all its connected devices into <strong>one single shared collision domain</strong>. If any two computers transmit at once, a collision occurs.
        <br>&bull; <strong>Switches & Bridges:</strong> Each individual switch port is typically a <strong>separate, isolated collision domain</strong> (microsegmentation). With full-duplex cabling, collisions are mathematically impossible!
        <br>&bull; <strong>Routers:</strong> Routers completely isolate collision domains across every routed interface.
      </p>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">2. What is a Broadcast Domain?</h4>
      <p class="text-xs leading-relaxed">
        A <strong>broadcast domain</strong> is the complete set of all connected network devices that receive a Layer 2 broadcast frame (destination MAC: <code>FF:FF:FF:FF:FF:FF</code>').
        <br>&bull; <strong>Hubs:</strong> Do not separate broadcast domains (all ports receive all broadcasts).
        <br>&bull; <strong>Switches:</strong> A standard Layer 2 switch forwards broadcast frames to all ports within the same VLAN. Thus, by default, a switch maintains <strong>one single broadcast domain</strong> per VLAN.
        <br>&bull; <strong>Routers:</strong> <strong>Routers break and separate broadcast domains</strong> between their interfaces! By default, routers never forward Layer 2 broadcast frames to other networks.
      </p>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">The Definitive Domain Comparison Table (From Syllabus)</h4>
      <div class="overflow-x-auto my-3">
        <table class="wiki-table text-xs">
          <thead>
            <tr class="bg-slate-100 dark:bg-slate-800">
              <th>Networking Device</th>
              <th>Operating Layer</th>
              <th>Collision Domains</th>
              <th>Broadcast Domains</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Hub</strong></td>
              <td>Layer 1 (Physical)</td>
              <td><span class="text-red-600 font-bold">1 Shared Domain</span> (for all ports)</td>
              <td><span class="text-red-600 font-bold">1 Shared Domain</span> (for all ports)</td>
            </tr>
            <tr>
              <td><strong>Bridge</strong></td>
              <td>Layer 2 (Data Link)</td>
              <td><span class="text-emerald-600 font-bold">1 per segment / port</span></td>
              <td>Normally 1 shared broadcast domain</td>
            </tr>
            <tr>
              <td><strong>Switch</strong></td>
              <td>Layer 2 (Data Link)</td>
              <td><span class="text-emerald-600 font-bold">1 per individual port</span> (Microsegmented)</td>
              <td>Normally 1 shared domain per active VLAN</td>
            </tr>
            <tr>
              <td><strong>Router</strong></td>
              <td>Layer 3 (Network)</td>
              <td><span class="text-emerald-600 font-bold">Separates connected segments</span></td>
              <td><span class="text-emerald-600 font-bold">Separates broadcast domains</span> (1 per interface)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="text-[11px] text-slate-500 italic mt-1">Note: VLAN configuration, switch architecture, and network topology can affect the exact broadcast boundaries.</p>
    `,
    eli10: "A collision domain is a room where people shout: if two people shout at once, their voices crash. A broadcast domain is the entire house: when someone rings the front doorbell, every room in the house hears it.",
    analogy: "Think of an apartment complex: each private apartment is a collision domain (you can talk privately inside your apartment without disturbing neighbors). The entire apartment building is a broadcast domain: if the building fire alarm sounds, every apartment hears it.",
    howItWorks: `
      <p class="text-xs leading-relaxed">Domain boundary rules for exam calculations:</p>
      <ul class="list-disc pl-5 space-y-1 text-xs">
        <li><strong>Rule 1:</strong> To count collision domains, count every active link connected directly to a switch port, bridge port, or router interface. Hubs do NOT create new collision domains; all ports on a hub count as 1 collision domain.</li>
        <li><strong>Rule 2:</strong> To count broadcast domains, count every active router interface (or configured VLAN). Switches and hubs do NOT separate broadcast domains.</li>
      </ul>
    `,
    technicalDetails: `
      <p class="text-xs leading-relaxed">Broadcast containment via VLANs:</p>
      <ul class="list-disc pl-5 space-y-1 text-xs">
        <li>Although Layer 2 switches forward broadcasts to all ports by default, configuring <strong>VLANs (IEEE 802.1Q)</strong> logically divides a single physical switch into multiple virtual broadcast domains.</li>
        <li>Frames broadcast inside VLAN 10 (Sales) are physically blocked from reaching ports assigned to VLAN 20 (Engineering) without a Layer 3 router.</li>
      </ul>
    `,
    workedExamples: [
      {
        title: "Example: Topology Domain Calculation",
        difficulty: "Intermediate",
        problem: "A network consists of 1 Router with 2 interfaces. Interface 1 connects to a 12-port Switch with 10 PCs attached. Interface 2 connects to an 8-port Hub with 6 PCs attached.\n1. How many collision domains exist in the entire network?\n2. How many broadcast domains exist in the entire network?",
        solution: "1. Collision Domains:\n- On the Switch side: Each connected PC has its own collision domain (10 domains) + link from switch to router (1 domain) = 11 collision domains.\n- On the Hub side: The entire hub and all 6 PCs share 1 collision domain + link from hub to router (shared) = 1 collision domain.\n- Total Collision Domains = 11 + 1 = **12 collision domains**.\n\n2. Broadcast Domains:\n- The Router has 2 active interfaces, and routers break broadcast domains.\n- Interface 1 (Switch side) forms Broadcast Domain 1.\n- Interface 2 (Hub side) forms Broadcast Domain 2.\n- Total Broadcast Domains = **2 broadcast domains**."
      }
    ],
    advantagesLimitations: `
      <table class="wiki-table">
        <thead><tr><th>Domain Optimization Strategy</th><th>Primary Advantage</th><th>Trade-off</th></tr></thead>
        <tbody>
          <tr><td><strong>Microsegmentation (Switches)</strong></td><td>Eliminates all collisions; enables full-duplex 200% wire speed.</td><td>Requires high-density switch hardware.</td></tr>
          <tr><td><strong>Subnetting & Routing (Routers)</strong></td><td>Blocks broadcast storms; isolates security boundaries.</td><td>Introduces packet header routing latency.</td></tr>
          <tr><td><strong>VLAN Segmentation</strong></td><td>Divides broadcast domains without purchasing extra physical routers.</td><td>Requires Layer 3 inter-VLAN routing for cross-talk.</td></tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "Enterprise Campus Network Planning: Sizing subnets to keep broadcast traffic under 20% of link capacity.",
      "Industrial Control Networks: Eliminating collision jitter for deterministic manufacturing.",
      "Computer Science University Examinations: Standard quantitative topology analysis questions."
    ],
    quiz: [
      {
        question: "How many collision domains and broadcast domains are created by a 16-port switch with 16 connected hosts (no VLANs configured)?",
        options: ["1 collision domain, 16 broadcast domains", "16 collision domains, 1 broadcast domain", "16 collision domains, 16 broadcast domains", "1 collision domain, 1 broadcast domain"],
        correct: 1,
        explanation: "Each switch port forms its own collision domain (16 collision domains), but without VLANs, all ports share 1 broadcast domain."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, Chapter 15.", url: "" },
      { cite: "Andrew S. Tanenbaum, Computer Networks, 6th Edition, Chapter 4.", url: "" }
    ]
  }
};

// ==========================================
// 9. u2-comparison-networking-devices: Comparison of Networking Devices
// ==========================================
TOPICS_U2_SYLLABUS['u2-comparison-networking-devices'] = {
  id: "u2-comparison-networking-devices",
  title: "Comparison of Networking Devices",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  level: "Intermediate",
  category: "devices",
  difficulty: "Core",
  readingTime: "20–25 min",
  standard: "Forouzan Ch. 15 / Tanenbaum Ch. 4",
  oneLiner: "The master architectural comparison matrix evaluating Repeaters, Hubs, Bridges, Switches, Routers, and Gateways across all operational metrics.",
  quickAnswer: "The comprehensive comparison of networking devices synthesizes the entire connecting hardware spectrum: Repeaters and Hubs operate at Layer 1 using raw signals; Bridges and Switches operate at Layer 2 using hardware MAC addresses; Routers operate at Layer 3 using logical IP addresses; and Gateways operate across Layers 4–7 performing multi-layer protocol translation. Each device trades architectural complexity against filtering precision, domain isolation, and forwarding intelligence.",
  whyItMatters: "A master comparative understanding of connecting hardware allows network architects to select the right device for every tier of an enterprise network, ensuring optimal performance, security, and return on investment.",
  prerequisitesList: [
    { concept: "OSI Layer Mapping", meaning: "Aligning device operations with the 7-layer reference model" },
    { concept: "Addressing Mechanisms", meaning: "Raw electrical bits vs 48-bit MAC addresses vs 32-bit IP addresses" },
    { concept: "Domain Management", meaning: "Control of collision boundaries and broadcast containment" }
  ],
  learningObjectives: [
    "Reproduce the Master Comparison Table across all 6 networking devices.",
    "Compare devices based on operating layer, main function, addressing used, and domain behavior.",
    "Evaluate the main advantage versus the main limitation of each networking device.",
    "Synthesize selection criteria for real-world campus and enterprise networking designs."
  ],
  infobox: {
    layer: "Layers 1 through 7 (Complete Comparison Matrix)",
    standard: "IEEE 802.3 / IEEE 802.1D / IETF RFCs",
    type: "Master Comparative Analysis",
    prerequisites: ["network-devices", "u2-device-working-principles"],
    relatedConcepts: ["repeaters", "hubs", "bridges", "switches", "routers", "gateways"],
    compareWith: ["all-networking-devices"],
    primaryUses: ["Curriculum review, university finals, network architecture design, certification exam prep"]
  },
  imageUrl: imgSwitch,
  imageCaption: "Figure: Comparison of Networking Devices: Operating Layer, Forwarding Decision, and Filtering Capabilities.",
  sections: {
    overview: `
      <p class="lead">The following master tables summarize the major technical, architectural, and operational differences between all primary networking devices as detailed in the official curriculum.</p>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">Master Comparison Table 1: Layer, Function & Addressing (From Syllabus Page 11)</h4>
      <div class="overflow-x-auto my-3">
        <table class="wiki-table text-xs">
          <thead>
            <tr class="bg-slate-100 dark:bg-slate-800">
              <th>Device</th>
              <th>OSI Layer</th>
              <th>Main Function</th>
              <th>Address or Signal Used</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Repeater</strong></td>
              <td>Physical (L1)</td>
              <td>Regenerates and retimes weak/attenuated signals</td>
              <td>Raw electrical / optical signals</td>
            </tr>
            <tr>
              <td><strong>Hub</strong></td>
              <td>Physical (L1)</td>
              <td>Repeats signals blindly to all other ports</td>
              <td>Raw electrical / optical signals</td>
            </tr>
            <tr>
              <td><strong>Bridge</strong></td>
              <td>Data Link (L2)</td>
              <td>Connects and filters LAN segments</td>
              <td>48-bit MAC addresses</td>
            </tr>
            <tr>
              <td><strong>Switch</strong></td>
              <td>Mainly Data Link (L2)</td>
              <td>Forwards frames between LAN devices at wire speed</td>
              <td>48-bit MAC addresses</td>
            </tr>
            <tr>
              <td><strong>Router</strong></td>
              <td>Network (L3)</td>
              <td>Connects and routes packets between different IP networks</td>
              <td>32-bit IPv4 / 128-bit IPv6 addresses</td>
            </tr>
            <tr>
              <td><strong>Gateway</strong></td>
              <td>Depends on implementation (L4–L7)</td>
              <td>Connects or translates between incompatible systems</td>
              <td>Varies (Port numbers, URLs, data encodings)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="wiki-callout tip my-3">
        <div class="callout-header"><i class="fa-solid fa-lightbulb"></i> Crucial Exam Rule: Gateway Layer Flexibility</div>
        <p class="text-xs"><strong>A gateway is not restricted to one OSI layer.</strong> Its operating layer depends entirely on the type of gateway and the specific translation function it performs (e.g., L3 default gateway, L4 transport proxy, L7 API gateway).</p>
      </div>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">Master Comparison Table 2: Advantages vs. Limitations (From Syllabus Page 14)</h4>
      <div class="overflow-x-auto my-3">
        <table class="wiki-table text-xs">
          <thead>
            <tr class="bg-slate-100 dark:bg-slate-800">
              <th>Device</th>
              <th>Main Advantage</th>
              <th>Main Limitation</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><strong>Repeater</strong></td><td>Extends physical signal transmission reach</td><td>Does not filter or block any traffic</td></tr>
            <tr><td><strong>Hub</strong></td><td>Simple, inexpensive connectivity</td><td>Sends signals to all other ports (collisions)</td></tr>
            <tr><td><strong>Bridge</strong></td><td>Connects and filters LAN segments</td><td>Limited port capacity compared with modern switches</td></tr>
            <tr><td><strong>Switch</strong></td><td>Efficient wire-speed LAN frame forwarding</td><td>Requires suitable configuration for advanced features</td></tr>
            <tr><td><strong>Router</strong></td><td>Connects different IP networks & blocks broadcast storms</td><td>More complex configuration and routing latency</td></tr>
            <tr><td><strong>Gateway</strong></td><td>Enables communication between different systems</td><td>Protocol translation can add complexity and delay</td></tr>
          </tbody>
        </table>
      </div>
    `,
    eli10: "If you want to reach farther: use a Repeater. If you want everyone to hear: use a Hub. If you want to connect two rooms: use a Bridge. If you want everyone to have private direct lines: use a Switch. If you want to talk to another school: use a Router. If you want to talk to an alien speaking Martian: use a Gateway.",
    analogy: "Like tools in transportation: repeaters are gas refuelers; hubs are public buses; bridges are river ferries; switches are express multi-lane highways; routers are airports; and gateways are international customs processing centers.",
    howItWorks: `
      <p class="text-xs leading-relaxed">Synthesis of architectural transitions:</p>
      <ul class="list-disc pl-5 space-y-1 text-xs">
        <li><strong>From Hubs to Switches:</strong> Transitioned local networks from shared collision buses (half-duplex) to dedicated microsegmentation (full-duplex).</li>
        <li><strong>From Bridges to Routers:</strong> Transitioned internetworking from flat bridged broadcast domains to hierarchical scalable IP routed autonomous systems.</li>
      </ul>
    `,
    technicalDetails: `
      <p class="text-xs leading-relaxed">Multilayer Convergence:</p>
      <ul class="list-disc pl-5 space-y-1 text-xs">
        <li>Modern high-end enterprise hardware frequently blurs traditional device boundaries: <strong>Layer 3 Switches</strong> perform both L2 switching and L3 routing; <strong>Next-Generation Firewalls (NGFW)</strong> perform routing, switching, and L7 application gateway inspection inside a single chassis.</li>
      </ul>
    `,
    workedExamples: [
      {
        title: "Example: Comprehensive Comparative Scenario Analysis",
        difficulty: "Intermediate",
        problem: "Classify which device matches each description:\n1. Operates at Layer 2 and maintains a dynamic CAM table.\n2. Operates at Layer 1 and blind-broadcasts all signals to all ports.\n3. Operates across Layers 4–7 to translate XML payloads to JSON.\n4. Connects distinct IP subnets and maintains dynamic BGP routing tables.",
        solution: "1. **Switch** (Layer 2 CAM table forwarding).\n2. **Hub** (Layer 1 blind broadcast).\n3. **Application Gateway** (Layer 4–7 payload translation).\n4. **Router** (Layer 3 IP routing table path selection)."
      }
    ],
    advantagesLimitations: `
      <table class="wiki-table">
        <thead><tr><th>Device Family</th><th>Sweet Spot Application</th><th>Anti-Pattern / Do Not Use When</th></tr></thead>
        <tbody>
          <tr><td><strong>Hubs & Repeaters</strong></td><td>Simple test labs and signal boosting.</td><td>Do not use in modern production enterprise LANs.</td></tr>
          <tr><td><strong>Switches</strong></td><td>High-density campus access and data centers.</td><td>Cannot connect separate IP networks without routing.</td></tr>
          <tr><td><strong>Routers</strong></td><td>Inter-VLAN, WAN, and Internet boundary routing.</td><td>Do not use for local host-to-host desktop connectivity.</td></tr>
          <tr><td><strong>Gateways</strong></td><td>Legacy integration and cloud API mediation.</td><td>Do not use when standard direct IP routing is sufficient.</td></tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "Enterprise Network Architecture Blueprints.",
      "Cisco CCNA / CompTIA Network+ Certification Exams.",
      "University Computer Science Final Examinations."
    ],
    quiz: [
      {
        question: "Which networking device is correctly matched with its primary limitation?",
        options: ["Switch — cannot operate in full duplex", "Hub — sends signals to all other ports and shares bandwidth", "Router — cannot connect different IP networks", "Repeater — requires complex IP configuration"],
        correct: 1,
        explanation: "A hub blindly repeats incoming signals out all other ports, causing signal collisions and wasting bandwidth."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, Chapter 15.", url: "" },
      { cite: "William Stallings, Data and Computer Communications, Chapter 15.", url: "" }
    ]
  }
};

// ==========================================
// 10. u2-device-osi-layers: OSI Layers at Which Networking Devices Operate
// ==========================================
TOPICS_U2_SYLLABUS['u2-device-osi-layers'] = {
  id: "u2-device-osi-layers",
  title: "OSI Layers at Which Networking Devices Operate",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  level: "Intermediate",
  category: "devices",
  difficulty: "Core",
  readingTime: "20–25 min",
  standard: "Forouzan Ch. 15 / Tanenbaum Ch. 1",
  oneLiner: "The definitive 7-layer mapping of connecting devices across the OSI Reference Model with real-world network architectures.",
  quickAnswer: "Networking devices are mapped directly to specific layers of the OSI model based on the highest protocol header they inspect: Repeaters and Hubs operate at Layer 1 (Physical); Bridges and standard Switches operate at Layer 2 (Data Link); Routers and Layer 3 Switches operate at Layer 3 (Network); Layer 4 Switches operate at Layer 4 (Transport); and Protocol/Application Gateways operate across Layers 5, 6, and 7 (Session, Presentation, Application). Real-world networks combine these devices in hierarchical tiers.",
  whyItMatters: "Understanding the exact OSI layer of each connecting device enables network engineers to troubleshoot network faults systematically: Layer 1 cable issues vs Layer 2 MAC loops vs Layer 3 IP routing failures vs Layer 7 gateway proxy errors.",
  prerequisitesList: [
    { concept: "OSI Reference Model", meaning: "The 7-layer theoretical networking framework created by ISO" },
    { concept: "Encapsulation & Decapsulation", meaning: "Wrapping data with layer-specific headers and stripping them upon reception" },
    { concept: "PDU (Protocol Data Unit)", meaning: "Bits (L1), Frames (L2), Packets (L3), Segments (L4), Data (L5–L7)" }
  ],
  learningObjectives: [
    "Map all 6 primary networking devices to their respective OSI layers.",
    "State the definitive device-to-layer correspondence rules.",
    "Describe the 3 real-world network deployment examples: Home Network, College Computer Lab, and Large Enterprise Network.",
    "Synthesize how layered devices collaborate in multi-tier enterprise network topologies."
  ],
  infobox: {
    layer: "Layers 1 through 7 (Complete Architectural Hierarchy)",
    standard: "ISO/IEC 7498-1 / IEEE 802 / IETF",
    type: "OSI Hierarchy & Real-World Deployments",
    prerequisites: ["network-devices", "u2-comparison-networking-devices"],
    relatedConcepts: ["pdu", "encapsulation", "enterprise-topology", "home-gateway"],
    compareWith: ["tcp-ip-model"],
    primaryUses: ["Systematic network troubleshooting, enterprise architecture design, university examinations"]
  },
  imageUrl: imgOsi,
  imageCaption: "Figure: OSI Model Layers at Which Networking Devices Operate (L1 Repeater/Hub, L2 Switch/Bridge, L3 Router, L7 Gateway).",
  sections: {
    overview: `
      <p class="lead">Networking devices are intrinsically associated with specific operational layers of the <strong>OSI (Open Systems Interconnection) 7-Layer Reference Model</strong> based on the depth of protocol headers they inspect and process.</p>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">Definitive OSI Layer Mapping Table (From Syllabus Page 13)</h4>
      <div class="overflow-x-auto my-3">
        <table class="wiki-table text-xs">
          <thead>
            <tr class="bg-slate-100 dark:bg-slate-800">
              <th>OSI Layer Name</th>
              <th>Layer #</th>
              <th>Protocol Data Unit</th>
              <th>Related Networking Devices</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Application</strong></td>
              <td>Layer 7</td>
              <td>Messages / Data</td>
              <td>Application gateways, application proxies, WAFs</td>
            </tr>
            <tr>
              <td><strong>Presentation</strong></td>
              <td>Layer 6</td>
              <td>Formatted Data</td>
              <td>Gateways performing presentation or data-format translation (e.g., encryption/compression)</td>
            </tr>
            <tr>
              <td><strong>Session</strong></td>
              <td>Layer 5</td>
              <td>Session Data</td>
              <td>Session-level gateways, RPC/SOCKS gateways</td>
            </tr>
            <tr>
              <td><strong>Transport</strong></td>
              <td>Layer 4</td>
              <td>Segments / Datagrams</td>
              <td>Layer 4 switches (port-based load balancers), stateful firewalls</td>
            </tr>
            <tr>
              <td><strong>Network</strong></td>
              <td>Layer 3</td>
              <td>Packets</td>
              <td><strong>Routers</strong>, Layer 3 switches</td>
            </tr>
            <tr>
              <td><strong>Data Link</strong></td>
              <td>Layer 2</td>
              <td>Frames</td>
              <td><strong>Bridges</strong>, Layer 2 switches</td>
            </tr>
            <tr>
              <td><strong>Physical</strong></td>
              <td>Layer 1</td>
              <td>Bits</td>
              <td><strong>Repeaters</strong>, hubs</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="wiki-callout tip my-3">
        <div class="callout-header"><i class="fa-solid fa-bookmark"></i> Core Principles to Memorize (From Syllabus)</div>
        <ul class="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Repeater and Hub &rarr; Physical Layer (Layer 1)</strong></li>
          <li><strong>Bridge and Traditional Switch &rarr; Data Link Layer (Layer 2)</strong></li>
          <li><strong>Router &rarr; Network Layer (Layer 3)</strong></li>
          <li><strong>Gateway &rarr; Operates at different layers (Layers 4 to 7) depending on its purpose</strong></li>
        </ul>
      </div>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">Real-World Deployment Examples (From Syllabus Pages 13–14)</h4>
      
      <div class="space-y-3 my-3 text-xs">
        <!-- Example 1: Home Network -->
        <div class="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
          <strong class="text-blue-700 dark:text-blue-400 text-sm block mb-1 flex items-center gap-1.5">
            <i class="fa-solid fa-house"></i> Example 1: Home Network Architecture
          </strong>
          <p class="text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
            A typical modern home network integrates multiple device functions inside a single all-in-one residential gateway:
            <br>&bull; A <strong>Wireless Router</strong> connecting the private home network to the Internet ISP via optical fiber or cable modem.
            <br>&bull; A built-in <strong>4-Port Ethernet Switch</strong> connecting smart TVs, gaming consoles, and desktop PCs with dedicated Gigabit wires.
            <br>&bull; A built-in <strong>Wi-Fi Access Point</strong> connecting smartphones, laptops, and smart home IoT sensors.
            <br>&bull; A <strong>NAT / Default Gateway</strong> translating private IPs (<code>192.168.1.0/24</code>) to a single public IP.
          </p>
        </div>

        <!-- Example 2: College Lab -->
        <div class="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
          <strong class="text-emerald-700 dark:text-emerald-400 text-sm block mb-1 flex items-center gap-1.5">
            <i class="fa-solid fa-graduation-cap"></i> Example 2: College Computer Laboratory
          </strong>
          <p class="text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
            A university computer lab connects 60 to 120 workstations:
            <br>&bull; <strong>Managed Ethernet Switches</strong> (24-port / 48-port) connect all lab computers, providing dedicated full-duplex wire speed and isolating student workstations into separate collision domains.
            <br>&bull; A <strong>Departmental Router</strong> connects the lab network to the campus core network, internet gateway, and central college servers while blocking local broadcast traffic.
          </p>
        </div>

        <!-- Example 3: Large Enterprise Network -->
        <div class="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
          <strong class="text-purple-700 dark:text-purple-400 text-sm block mb-1 flex items-center gap-1.5">
            <i class="fa-solid fa-building"></i> Example 3: Large Enterprise Network
          </strong>
          <p class="text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
            A large multi-building corporation deploys a structured 3-tier hierarchical architecture:
            <br>&bull; <strong>Access Layer Switches:</strong> Connect employee desktop PCs, VoIP phones, and Wi-Fi access points.
            <br>&bull; <strong>Distribution Layer 3 Switches:</strong> Route traffic between different departmental VLANs at hardware wire speed.
            <br>&bull; <strong>Core Routers:</strong> High-bandwidth backbone routers connecting remote branch offices, disaster recovery data centers, and external internet ISPs.
            <br>&bull; <strong>Application Gateways & Proxies:</strong> Secure web gateways, reverse proxies, and VPN concentrators authenticating remote workers and filtering malicious application payloads.
          </p>
        </div>
      </div>
    `,
    eli10: "Just like a school has students (bits), teachers (frames), principals (packets), and the school board (gateways), each network device handles information at its own grade level in the OSI school.",
    analogy: "Like traveling internationally: at the physical layer, the road is paved (L1); at the data link layer, your car stays in its lane (L2); at the network layer, highway signs guide you between cities (L3); and at the application gateway, customs translates your language and inspects your passport (L7).",
    howItWorks: `
      <p class="text-xs leading-relaxed">Systematic OSI Troubleshooting Methodology:</p>
      <ul class="list-disc pl-5 space-y-1 text-xs">
        <li><strong>Step 1 (Physical):</strong> Check link LEDs and cables (Repeater/Hub layer).</li>
        <li><strong>Step 2 (Data Link):</strong> Check MAC address tables, port duplex settings, and STP blocked ports (Switch/Bridge layer).</li>
        <li><strong>Step 3 (Network):</strong> Verify IP addresses, subnet masks, default gateways, and ping next-hop routers (Router layer).</li>
        <li><strong>Step 4–7 (Application):</strong> Check proxy settings, DNS resolution, and TLS certificates (Gateway layer).</li>
      </ul>
    `,
    technicalDetails: `
      <p class="text-xs leading-relaxed">Cross-Layer Hardware Acceleration:</p>
      <ul class="list-disc pl-5 space-y-1 text-xs">
        <li>Modern data center switches implement <strong>ASIC pipeline stages</strong> that simultaneously inspect Layer 2 MAC addresses, Layer 3 IP headers, and Layer 4 TCP/UDP port numbers in a single clock cycle without software CPU intervention.</li>
      </ul>
    `,
    workedExamples: [
      {
        title: "Example: Real-World Enterprise Device Selection",
        difficulty: "Intermediate",
        problem: "An IT architect is designing a network for a 5-story corporate building with 500 employees. Which devices should be placed at the Access, Distribution, and Core/Perimeter tiers?",
        solution: "- **Access Tier (Floors 1–5):** 24-port/48-port Managed PoE Layer 2 Switches to connect desktop computers, IP phones, and Wi-Fi access points with dedicated collision-free bandwidth.\n- **Distribution Tier:** High-performance Layer 3 Switches to aggregate access switches and route inter-VLAN traffic at wire speed.\n- **Core / Perimeter Tier:** Redundant Core Routers and Next-Generation Firewalls (acting as Security Gateways) to connect to ISP internet links, run BGP routing, and inspect application traffic."
      }
    ],
    advantagesLimitations: `
      <table class="wiki-table">
        <thead><tr><th>Network Tier</th><th>Devices Used</th><th>Core Architectural Responsibility</th></tr></thead>
        <tbody>
          <tr><td><strong>Access Tier</strong></td><td>L2 Switches, APs</td><td>Workstation connectivity, port security, PoE delivery.</td></tr>
          <tr><td><strong>Distribution Tier</strong></td><td>L3 Switches, Routers</td><td>Inter-VLAN routing, policy enforcement, broadcast isolation.</td></tr>
          <tr><td><strong>Core Tier</strong></td><td>High-Speed Core Routers</td><td>Fast packet transport across backbone without packet filtering.</td></tr>
          <tr><td><strong>Perimeter Tier</strong></td><td>Edge Routers, Gateways</td><td>ISP connectivity, NAT translation, firewalling, and proxy inspection.</td></tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "Campus Network Hierarchical Design (Cisco 3-tier architecture).",
      "Cloud Data Center Spine-and-Leaf Clos Network fabrics.",
      "Telecommunication and Internet Service Provider points of presence (PoP)."
    ],
    quiz: [
      {
        question: "Which of the following networking devices operates across Layers 4 through 7 of the OSI Reference Model?",
        options: ["Hub", "Switch", "Router", "Gateway"],
        correct: 3,
        explanation: "A gateway operates at the upper layers (Transport, Session, Presentation, Application) to translate protocols and data formats."
      },
      {
        question: "Which pair of devices operates strictly at Layer 1 (Physical Layer) of the OSI model?",
        options: ["Repeater and Hub", "Bridge and Switch", "Router and Gateway", "Switch and Hub"],
        correct: 0,
        explanation: "Repeaters and hubs operate exclusively at Layer 1 (Physical Layer), repeating and regenerating raw physical signals."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, Chapter 15: Connecting Devices and Virtual LANs.", url: "" },
      { cite: "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, Chapter 1: The Reference Models.", url: "" }
    ]
  }
};

console.log("Successfully built all 10 subtopics for Topic 10!");

// ==========================================
// 11. ENRICH TOPIC 11 REVISION & ASSESSMENT
// ==========================================

// A. Enrich Short-Answer Questions with Q103 to Q112 from PDF Page 16
const t10ShortQuestions = `
  <div class="faq-item p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-xs mb-2">
    <div class="faq-question font-bold text-xs text-blue-700 dark:text-blue-400">Q103. Define a repeater.</div>
    <div class="faq-answer text-xs text-gray-600 dark:text-gray-300 mt-1">A repeater is a Physical Layer (Layer 1) device that receives a weak or degraded signal, cleans and regenerates it, and retransmits it to extend the communication distance.</div>
  </div>
  <div class="faq-item p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-xs mb-2">
    <div class="faq-question font-bold text-xs text-blue-700 dark:text-blue-400">Q104. What is a hub?</div>
    <div class="faq-answer text-xs text-gray-600 dark:text-gray-300 mt-1">A hub is a multiport physical layer device that connects multiple computers in a LAN by blindly repeating all incoming signals out through all its other ports.</div>
  </div>
  <div class="faq-item p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-xs mb-2">
    <div class="faq-question font-bold text-xs text-blue-700 dark:text-blue-400">Q105. Explain the working of a bridge.</div>
    <div class="faq-answer text-xs text-gray-600 dark:text-gray-300 mt-1">A bridge operates at Layer 2, reads source MAC addresses to dynamically build a forwarding table, forwards frames to destination segments, and filters frames whose destination is on the incoming segment.</div>
  </div>
  <div class="faq-item p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-xs mb-2">
    <div class="faq-question font-bold text-xs text-blue-700 dark:text-blue-400">Q106. Define a network switch.</div>
    <div class="faq-answer text-xs text-gray-600 dark:text-gray-300 mt-1">A switch is a high-performance Layer 2 multiport bridge that connects devices in a LAN and forwards frames using MAC addresses at wire speed, providing a dedicated collision domain per port.</div>
  </div>
  <div class="faq-item p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-xs mb-2">
    <div class="faq-question font-bold text-xs text-blue-700 dark:text-blue-400">Q107. What is a router?</div>
    <div class="faq-answer text-xs text-gray-600 dark:text-gray-300 mt-1">A router is a Network Layer (Layer 3) device that connects different IP networks, maintains routing tables, selects optimal paths, and forwards packets between networks using IP addresses.</div>
  </div>
  <div class="faq-item p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-xs mb-2">
    <div class="faq-question font-bold text-xs text-blue-700 dark:text-blue-400">Q108. Define a gateway.</div>
    <div class="faq-answer text-xs text-gray-600 dark:text-gray-300 mt-1">A gateway is a multi-layer device or software system that connects networks utilizing completely different protocols, architectures, or data communication formats, performing active translation.</div>
  </div>
  <div class="faq-item p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-xs mb-2">
    <div class="faq-question font-bold text-xs text-blue-700 dark:text-blue-400">Q109. Which OSI layer does a repeater operate at?</div>
    <div class="faq-answer text-xs text-gray-600 dark:text-gray-300 mt-1">A repeater operates at the Physical Layer (Layer 1) of the OSI Reference Model, operating purely on physical signals and bits without inspecting headers.</div>
  </div>
  <div class="faq-item p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-xs mb-2">
    <div class="faq-question font-bold text-xs text-blue-700 dark:text-blue-400">Q110. What is a collision domain?</div>
    <div class="faq-answer text-xs text-gray-600 dark:text-gray-300 mt-1">A collision domain is a network segment where simultaneous frame transmissions from multiple devices interfere and collide with each other on a shared communication medium.</div>
  </div>
  <div class="faq-item p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-xs mb-2">
    <div class="faq-question font-bold text-xs text-blue-700 dark:text-blue-400">Q111. What is a broadcast domain?</div>
    <div class="faq-answer text-xs text-gray-600 dark:text-gray-300 mt-1">A broadcast domain is the complete set of all connected network devices that receive a Layer 2 broadcast frame (FF:FF:FF:FF:FF:FF). Routers separate broadcast domains.</div>
  </div>
  <div class="faq-item p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-xs mb-2">
    <div class="faq-question font-bold text-xs text-blue-700 dark:text-blue-400">Q112. What is the function of a default gateway?</div>
    <div class="faq-answer text-xs text-gray-600 dark:text-gray-300 mt-1">A default gateway is the local Layer 3 router interface that an end host uses as its next hop to reach destinations outside its local IP subnet.</div>
  </div>
`;

if (!TOPICS_U2_SYLLABUS['u2-short-answer-questions'].sections.overview.includes('Q103. Define a repeater.')) {
  TOPICS_U2_SYLLABUS['u2-short-answer-questions'].sections.overview += t10ShortQuestions;
  console.log("Added Q103-Q112 to u2-short-answer-questions!");
}

// B. Enrich Long-Answer Questions with Q38 to Q41
const t10LongQuestions = `
  <div class="faq-item p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xs mb-3">
    <div class="faq-question font-bold text-sm text-purple-700 dark:text-purple-400 mb-1">Q38. Explain the working principles and operating layers of the six primary networking devices.</div>
    <div class="faq-answer text-xs text-gray-600 dark:text-gray-300 space-y-2">
      <p>(1) <strong>Repeater (L1):</strong> Overcomes cable attenuation by regenerating and retiming electrical/optical signals without inspecting addresses. (2) <strong>Hub (L1):</strong> Multiport repeater that broadcasts all incoming signals out through all other ports. (3) <strong>Bridge (L2):</strong> Connects LAN segments, builds a dynamic forwarding table via source MACs, forwards inter-segment frames, and filters intra-segment traffic. (4) <strong>Switch (L2):</strong> High-performance multiport bridge with dedicated hardware ASICs providing microsegmented wire-speed forwarding. (5) <strong>Router (L3):</strong> Connects different IP subnets, determines optimal paths via routing tables, and breaks broadcast domains. (6) <strong>Gateway (L4–L7):</strong> Multi-layer translator enabling communication between incompatible protocol suites and architectures.</p>
    </div>
  </div>
  <div class="faq-item p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xs mb-3">
    <div class="faq-question font-bold text-sm text-purple-700 dark:text-purple-400 mb-1">Q39. Differentiate comprehensively between Collision Domains and Broadcast Domains.</div>
    <div class="faq-answer text-xs text-gray-600 dark:text-gray-300 space-y-2">
      <p>A <strong>collision domain</strong> is a physical segment where simultaneous transmissions cause collisions. Hubs share 1 collision domain; bridges and switches separate collision domains per port (microsegmentation); routers separate collision domains per interface. A <strong>broadcast domain</strong> is the group of devices that receive a Layer 2 broadcast frame. Hubs, bridges, and switches maintain 1 shared broadcast domain per VLAN; routers break and separate broadcast domains across all interfaces.</p>
    </div>
  </div>
  <div class="faq-item p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xs mb-3">
    <div class="faq-question font-bold text-sm text-purple-700 dark:text-purple-400 mb-1">Q40. Compare Hubs, Switches, and Routers across architecture, addressing, performance, and domains.</div>
    <div class="faq-answer text-xs text-gray-600 dark:text-gray-300 space-y-2">
      <p>A <strong>Hub</strong> operates at Layer 1 using raw signals, creates 1 collision domain and 1 broadcast domain, and runs in half-duplex. A <strong>Switch</strong> operates at Layer 2 using 48-bit MAC addresses, creates a separate collision domain for every port, provides full-duplex wire speed, but maintains a single broadcast domain per VLAN. A <strong>Router</strong> operates at Layer 3 using logical IP addresses, routes packets between different networks, and separates both collision and broadcast domains.</p>
    </div>
  </div>
  <div class="faq-item p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xs mb-3">
    <div class="faq-question font-bold text-sm text-purple-700 dark:text-purple-400 mb-1">Q41. Explain the roles of networking devices in real-world Home, College Lab, and Enterprise networks.</div>
    <div class="faq-answer text-xs text-gray-600 dark:text-gray-300 space-y-2">
      <p><strong>Home Network:</strong> Uses an integrated wireless router combining routing, a 4-port Gigabit switch, Wi-Fi AP, and NAT/DHCP gateway. <strong>College Lab:</strong> Uses managed 24/48-port Ethernet switches for desktop microsegmentation connected to a departmental router providing campus and Internet access. <strong>Enterprise Network:</strong> Employs a 3-tier hierarchy: Layer 2 Access Switches at desks, Layer 3 Distribution Switches for inter-VLAN routing, Core Routers for WAN backbone transport, and Perimeter Application Gateways/Firewalls for security.</p>
    </div>
  </div>
`;

if (!TOPICS_U2_SYLLABUS['u2-long-answer-questions'].sections.overview.includes('Q38. Explain the working principles')) {
  TOPICS_U2_SYLLABUS['u2-long-answer-questions'].sections.overview += t10LongQuestions;
  console.log("Added Q38-Q41 to u2-long-answer-questions!");
}

// C. Enrich Numerical Problems with Solved Examples 1 to 5 from PDF Pages 14–15
const t10Numericals = [
  {
    title: "Problem 32: Choosing the Correct Device for Connecting Different IP Networks",
    difficulty: "Beginner",
    problem: "A company wants to connect two different IP networks: Subnet A (10.0.1.0/24) and Subnet B (10.0.2.0/24). Which networking device should be used and why?",
    solution: "Answer: A **Router**.\nReason: A router operates at the Network Layer (Layer 3) of the OSI model and forwards packets between different IP networks using destination logical IP addresses and routing tables. A Layer 2 switch cannot route between different subnets without routing functionality."
  },
  {
    title: "Problem 33: Extending a Weak Signal Over a Long Cable",
    difficulty: "Beginner",
    problem: "A digital signal becomes weak and corrupted due to attenuation when travelling over an extended 150-meter copper cable. Which device can regenerate the signal and why?",
    solution: "Answer: A **Repeater**.\nReason: As electrical signals travel through transmission media, resistance and capacitance cause signal attenuation. A repeater operates at Layer 1 to receive the degraded signal, reconstruct clean binary square waves, and retransmit the renewed signal to extend the communication distance."
  },
  {
    title: "Problem 34: Connecting 30 Computers in a High-Speed LAN",
    difficulty: "Beginner",
    problem: "A computer laboratory has 30 computers that need to communicate within the same Local Area Network with dedicated bandwidth and zero collisions. Which device is suitable?",
    solution: "Answer: An **Ethernet Switch**.\nReason: An Ethernet switch connects multiple devices and forwards frames using MAC addresses. By providing a dedicated collision domain per port (microsegmentation), each of the 30 computers enjoys full-duplex, collision-free wire speed."
  },
  {
    title: "Problem 35: Understanding Hub Signal Distribution Behavior",
    difficulty: "Beginner",
    problem: "A 5-port hub connects five computers (A, B, C, D, E). If Computer A sends a frame intended for Computer C, how does the hub distribute it, and what happens at the receivers?",
    solution: "Answer: The hub operates at Layer 1 and cannot read MAC addresses. It repeats the incoming signal through all other ports (Ports B, C, D, E). Connected computers B, D, and E receive the frame, see that the destination MAC does not match, and discard it; Computer C processes the frame."
  },
  {
    title: "Problem 36: Identifying the Purpose of a Default Gateway",
    difficulty: "Beginner",
    problem: "A computer has IP address <code><code>192.168.1.1</code>0</code> and a default gateway of <code>192.168.1.1</code>. What is the operational purpose of the default gateway when the computer connects to an external web server?",
    solution: "Answer: The default gateway provides the next hop for all traffic destined for networks outside the computer's local IP subnet. The computer sends the packet to <code>192.168.1.1</code>, which routes the packet across external networks to the destination."
  }
];

if (Array.isArray(TOPICS_U2_SYLLABUS['u2-numerical-problems'].sections.workedExamples)) {
  t10Numericals.forEach(num => {
    const exists = TOPICS_U2_SYLLABUS['u2-numerical-problems'].sections.workedExamples.some(e => e.title === num.title);
    if (!exists) {
      TOPICS_U2_SYLLABUS['u2-numerical-problems'].sections.workedExamples.push(num);
    }
  });
  console.log("Total Numericals in u2-numerical-problems is now:", TOPICS_U2_SYLLABUS['u2-numerical-problems'].sections.workedExamples.length);
}

// D. Enrich Practice MCQs with 15 questions for Topic 10
const t10MCQs = [
  {
    question: "At which layer of the OSI Reference Model does a network repeater operate?",
    options: ["Physical Layer (Layer 1)", "Data Link Layer (Layer 2)", "Network Layer (Layer 3)", "Transport Layer (Layer 4)"],
    correct: 0,
    explanation: "A repeater operates at Layer 1 (Physical Layer), regenerating electrical or optical signals to overcome attenuation."
  },
  {
    question: "How does a passive hub differ from an active hub?",
    options: ["A passive hub routes IP packets while an active hub routes frames", "A passive hub does not regenerate or amplify signals and requires no power, while an active hub regenerates signals and requires power", "A passive hub operates at Layer 3 while an active hub operates at Layer 2", "A passive hub supports full duplex while an active hub supports half duplex"],
    correct: 1,
    explanation: "A passive hub merely serves as a physical connection point without signal regeneration, whereas an active hub amplifies signals and requires electrical power."
  },
  {
    question: "How many collision domains are formed by a single 8-port Ethernet hub?",
    options: ["1 collision domain", "4 collision domains", "8 collision domains", "16 collision domains"],
    correct: 0,
    explanation: "All ports on a hub share a single internal bus, forming exactly ONE shared collision domain."
  },
  {
    question: "Which networking device separates collision domains while maintaining a single broadcast domain by default?",
    options: ["Repeater", "Hub", "Layer 2 Switch", "Router"],
    correct: 2,
    explanation: "A Layer 2 switch isolates collision domains on each port (microsegmentation), but broadcasts flood to all ports within the same VLAN."
  },
  {
    question: "Which networking device operates at Layer 3 and connects different IP networks?",
    options: ["Bridge", "Hub", "Router", "Repeater"],
    correct: 2,
    explanation: "A router operates at Layer 3 (Network Layer) and connects different IP subnets using logical IP routing tables."
  },
  {
    question: "What is the primary function of a Default Gateway configured on an end host?",
    options: ["Assigning MAC addresses to new network adapters", "Providing the next-hop router address for traffic destined outside the local subnet", "Encrypting local Wi-Fi passwords", "Filtering physical electrical noise on the copper cable"],
    correct: 1,
    explanation: "The default gateway is the local router interface used by hosts to exit their local subnet and reach external IP networks."
  },
  {
    question: "Why is a gateway not restricted to a single OSI layer?",
    options: ["Because gateways do not follow any standards", "Because gateways can operate across Layers 4 through 7 depending on the required protocol and format translation", "Because gateways only operate at the Physical Layer", "Because gateways are purely software virtual machines"],
    correct: 1,
    explanation: "Gateways perform translation across Transport, Session, Presentation, and Application layers depending on their architectural purpose."
  },
  {
    question: "What happens when an Ethernet switch receives a frame destined for an address present in its CAM table on a different port?",
    options: ["It floods the frame to all ports", "It filters and drops the frame", "It forwards the frame exclusively out that destination port", "It converts the frame to an IP packet"],
    correct: 2,
    explanation: "When the destination MAC is known on another port, the switch forwards the frame directly and exclusively through that target port."
  },
  {
    question: "How many broadcast domains are created by a router with 4 active routed interfaces?",
    options: ["1 broadcast domain", "2 broadcast domains", "4 broadcast domains", "16 broadcast domains"],
    correct: 2,
    explanation: "Routers break and separate broadcast domains across all interfaces. A router with 4 active routed interfaces creates 4 separate broadcast domains."
  },
  {
    question: "Which type of switch allows remote configuration of VLANs, STP, and SNMP monitoring?",
    options: ["Unmanaged switch", "Passive switch", "Managed switch", "Repeater hub"],
    correct: 2,
    explanation: "A managed switch provides comprehensive administrative configuration for VLANs, Spanning Tree, QoS, and SNMP monitoring."
  },
  {
    question: "What is the primary role of a Core Router in an enterprise or ISP network?",
    options: ["Connecting individual desktop PCs with PoE", "Routing massive volumes of backbone traffic at high speed within the network interior", "Providing Wi-Fi access in meeting rooms", "Translating ASCII text to EBCDIC"],
    correct: 1,
    explanation: "Core routers are high-capacity backbone routers deployed within the interior of large networks to forward massive traffic volumes between distribution networks."
  },
  {
    question: "What is the maximum recommended cable distance for standard Category 5e/6 copper Ethernet before requiring a repeater or switch?",
    options: ["10 meters", "50 meters", "100 meters", "500 meters"],
    correct: 2,
    explanation: "Standard copper twisted-pair Ethernet (10BASE-T through 1000BASE-T) has a maximum physical segment limit of 100 meters (328 feet) due to signal attenuation."
  },
  {
    question: "Which of the following devices operates at Layer 4 and performs port-based traffic distribution?",
    options: ["Passive Hub", "Layer 4 Switch / Load Balancer", "Repeater", "Layer 1 Transceiver"],
    correct: 1,
    explanation: "Layer 4 switches inspect TCP/UDP port numbers at the Transport Layer to balance application traffic across server pools."
  },
  {
    question: "What is an Application Gateway (Proxy)?",
    options: ["A hardware hub repeating electrical pulses", "A Layer 7 system that translates or inspects protocols at the application level", "A fiber optic cable connector", "A MAC address table in RAM"],
    correct: 1,
    explanation: "An Application Gateway operates at Layer 7 (Application Layer) to translate, inspect, or proxy application-specific protocols (e.g., SIP VoIP gateways, WAFs)."
  },
  {
    question: "If a network contains 1 Router (2 interfaces), 2 Switches (each with 10 PCs), and 1 Hub (with 5 PCs connected to one switch port), how many broadcast domains exist?",
    options: ["1 broadcast domain", "2 broadcast domains", "25 broadcast domains", "27 broadcast domains"],
    correct: 1,
    explanation: "Broadcast domains are separated only by routers. With 2 active router interfaces, the network contains exactly 2 broadcast domains regardless of the number of switches and hubs."
  }
];

if (!TOPICS_U2_SYLLABUS['u2-mcqs'].sections.quiz) {
  TOPICS_U2_SYLLABUS['u2-mcqs'].sections.quiz = [];
}
t10MCQs.forEach(q => {
  const exists = TOPICS_U2_SYLLABUS['u2-mcqs'].sections.quiz.some(existing => existing.question === q.question);
  if (!exists) {
    TOPICS_U2_SYLLABUS['u2-mcqs'].sections.quiz.push(q);
  }
});
console.log("Total MCQs in u2-mcqs is now:", TOPICS_U2_SYLLABUS['u2-mcqs'].sections.quiz.length);

// Write the complete updated TOPICS_U2_SYLLABUS back to disk
const fullCode = `// =============================================================================
// UNIT 2: DATA LINK LAYER & MAC SUBLAYER - COMPLETE CURRICULUM SYLLABUS TOPICS
// Aligned with Forouzan (4th & 6th Ed. Ch. 11-15), Tanenbaum (6th Ed. Ch. 3-4), Kurose & Ross
// Full 17-Point Structural Article Schema with Real-World Diagrams, Worked Examples & Practice Quizzes
// =============================================================================

const TOPICS_U2_SYLLABUS = ` + JSON.stringify(TOPICS_U2_SYLLABUS, null, 2) + `;

if (typeof window !== 'undefined') {
  window.TOPICS_U2_SYLLABUS = TOPICS_U2_SYLLABUS;
  if (window.TOPIC_REPOSITORY) {
    Object.assign(window.TOPIC_REPOSITORY, TOPICS_U2_SYLLABUS);
  }
}
if (typeof global !== 'undefined') {
  global.TOPICS_U2_SYLLABUS = TOPICS_U2_SYLLABUS;
  if (global.TOPIC_REPOSITORY) {
    Object.assign(global.TOPIC_REPOSITORY, TOPICS_U2_SYLLABUS);
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = TOPICS_U2_SYLLABUS;
}
`;

fs.writeFileSync(syllabusFile, fullCode, 'utf8');
console.log("Successfully written complete updated topics_u2_syllabus.js with Topic 10 content!");
