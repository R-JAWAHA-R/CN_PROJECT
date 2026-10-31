// scratch/build_topic6_full_content.js
// Integrates comprehensive educational content for Topic 6: Ethernet MAC Sublayer Protocol
// from the 28-page PDF into js/topics_u2_syllabus.js and enriches Topic 11.

const fs = require('fs');
const path = require('path');

const syllabusPath = path.join(__dirname, '..', 'js', 'topics_u2_syllabus.js');
let rawSyllabus = fs.readFileSync(syllabusPath, 'utf8');

const startIdx = rawSyllabus.indexOf('{');
const endIdx = rawSyllabus.lastIndexOf('};');
const objStr = rawSyllabus.substring(startIdx, endIdx + 1);
let data = eval('(' + objStr + ')');

console.log("Loaded topics_u2_syllabus.js with", Object.keys(data).length, "topics.");

// =============================================================================
// SUBTOPIC 1: ethernet - Introduction to Ethernet
// =============================================================================
data["ethernet"] = {
  id: "ethernet",
  title: "Introduction to Ethernet",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 6,
  subtopicNumber: 1,
  whyItMatters: "Ethernet is the universal foundation of modern local area networking. Defined by IEEE 802.3, it connects billions of computers, servers, switches, and routers worldwide using standardized 48-bit physical addressing and high-speed framing.",
  prerequisitesList: [
    { concept: "Data Link Layer Fundamentals", meaning: "Framing, physical addressing, and error detection principles" },
    { concept: "MAC Sublayer Architecture", meaning: "Position of IEEE 802 Media Access Control above the Physical Layer" }
  ],
  learningObjectives: [
    "Define Ethernet and state its governing IEEE 802.3 standard family.",
    "List and explain the 7 main features of Ethernet technology.",
    "Identify the specifications governed by IEEE 802.3 (wiring, framing, physical addressing, medium access).",
    "Explain why modern full-duplex switched Ethernet eliminates the need for CSMA/CD.",
    "Understand the evolution of Ethernet from shared coaxial cable to high-speed fiber backbones."
  ],
  infobox: {
    layer: "Layer 2 (MAC Sublayer) & Layer 1 (Physical)",
    standard: "IEEE 802.3 / Forouzan Chapter 13",
    type: "Local Area Network Standard",
    prerequisites: ["u2-dll-intro", "u2-mac-sublayer-intro"],
    relatedConcepts: ["u2-ethernet-architecture", "mac-address", "u2-ethernet-frame-format"],
    compareWith: ["wifi-mac-sublayer", "u2-comparison-multiple-access"],
    primaryUses: ["Enterprise LANs, data center interconnects, home broadband, industrial Ethernet"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/OSI_Model_v1.svg/600px-OSI_Model_v1.svg.png",
  imageCaption: "Figure: Ethernet (IEEE 802.3) Architecture in the OSI Reference Model (Forouzan Chapter 13).",
  sections: {
    overview: `
      <p><strong>Ethernet</strong> is one of the most widely used and successful technologies for Local Area Networks (LANs). It allows computers, printers, servers, network switches, and other devices to communicate efficiently over wired networks.</p>

      <p>Originally developed at Xerox PARC in the 1970s by Robert Metcalfe and standardized jointly by DEC, Intel, and Xerox (DIX Ethernet), Ethernet is formally defined and maintained today by the <strong>IEEE 802.3</strong> working group.</p>

      <div class="p-3 my-4 bg-blue-50 dark:bg-blue-950/40 border-l-4 border-blue-500 rounded-r-lg">
        <h4 class="font-bold text-blue-900 dark:text-blue-200 text-sm mb-1">What the IEEE 802.3 Standard Specifies (PDF Section 1)</h4>
        <ul class="text-xs text-blue-800 dark:text-blue-300 space-y-1 list-disc pl-4">
          <li><strong>Physical Medium Transmission:</strong> How electronic or optical signals propagate across twisted-pair, coaxial cable, or optical fiber.</li>
          <li><strong>Frame Structure:</strong> The precise byte-level formatting of Ethernet MAC frames, delimiters, headers, and trailers.</li>
          <li><strong>Physical Addressing:</strong> The assignment, syntax, and interpretation of 48-bit hardware MAC addresses.</li>
          <li><strong>Medium Access Arbitration:</strong> How contending stations share the common wire in traditional half-duplex Ethernet using CSMA/CD.</li>
        </ul>
      </div>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Seven Core Features of Ethernet (PDF Section 1)</h3>
      <ol class="wiki-ordered-list">
        <li><strong>Universal Wired LAN Technology:</strong> Ethernet is the undisputed worldwide standard for wired office, home, and enterprise networks.</li>
        <li><strong>48-Bit Physical (MAC) Addressing:</strong> Every Ethernet network interface card (NIC) is globally identified by a permanent 6-byte hexadecimal address.</li>
        <li><strong>Flexible Communication Modes:</strong> Inherently supports <em>unicast</em> (one-to-one), <em>multicast</em> (one-to-many), and <em>broadcast</em> (one-to-all) frame delivery.</li>
        <li><strong>Traditional CSMA/CD Shared Access:</strong> Legacy bus and hub-based Ethernet utilizes Carrier Sense Multiple Access with Collision Detection to resolve medium contention.</li>
        <li><strong>Source and Destination Header Addressing:</strong> Every frame explicitly carries the sender's MAC address (SA) and recipient's MAC address (DA).</li>
        <li><strong>Robust Error Detection via CRC-32:</strong> Frames append a 4-byte Frame Check Sequence (FCS) using cyclic redundancy check to detect corrupted bits.</li>
        <li><strong>Collision-Free Switched Operation:</strong> Modern switched full-duplex Ethernet provides dedicated links per station, completely eliminating collisions and the need for CSMA/CD.</li>
      </ol>
    `,
    eli10: "In simple words: Ethernet is the universal cable system and rules that connect your computer to the internet router. It gives your computer a unique name (MAC address), wraps your data into envelopes (frames), and checks for errors with CRC.",
    analogy: "Think of Ethernet as a city postal system. The cable is the road, your computer's network card is your house with a unique physical street address (MAC address), and the Ethernet frame is an envelope with a sender address, recipient address, letter inside, and a wax seal (CRC) to prove nobody damaged the contents.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Traditional Shared Ethernet vs. Modern Switched Ethernet</h3>
      <p class="text-xs text-gray-600 dark:text-gray-400 mb-3">Understanding the historical evolution from shared collision domains to dedicated micro-segmented links is essential for networking mastery:</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-amber-600 dark:text-amber-400 block mb-1">Traditional Shared Ethernet (Half-Duplex)</span>
          <p class="text-slate-600 dark:text-slate-300 mb-2">Computers connect to a single coaxial cable or multiport repeater hub. All stations share one broadcast medium and one collision domain.</p>
          <ul class="list-disc pl-4 space-y-1 text-slate-500 dark:text-slate-400 text-[11px]">
            <li>Stations must use CSMA/CD to detect signal clashes.</li>
            <li>Communication is half-duplex (transmit OR receive, not both).</li>
            <li>Heavy traffic causes collisions and throughput degradation.</li>
          </ul>
        </div>

        <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">Modern Switched Ethernet (Full-Duplex)</span>
          <p class="text-slate-600 dark:text-slate-300 mb-2">Computers connect via dedicated twisted-pair or fiber cables to an intelligent Layer 2 switch. The switch isolates every port into its own private collision domain.</p>
          <ul class="list-disc pl-4 space-y-1 text-slate-500 dark:text-slate-400 text-[11px]">
            <li>Simultaneous transmit and receive (full-duplex).</li>
            <li><strong>Collisions are physically impossible.</strong></li>
            <li>CSMA/CD is completely disabled; maximum wire speed achieved.</li>
          </ul>
        </div>
      </div>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Five Foundational Points to Memorize (PDF Section 17)</h3>
      <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-mono space-y-2">
        <div class="flex items-center gap-2"><span class="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center font-bold text-[10px]">1</span> Ethernet is defined by IEEE 802.3.</div>
        <div class="flex items-center gap-2"><span class="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center font-bold text-[10px]">2</span> MAC addresses are exactly 48 bits (6 bytes / 12 hex digits).</div>
        <div class="flex items-center gap-2"><span class="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center font-bold text-[10px]">3</span> Standard Ethernet frame length is between 64 and 1518 bytes.</div>
        <div class="flex items-center gap-2"><span class="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center font-bold text-[10px]">4</span> Traditional shared Ethernet uses CSMA/CD with binary exponential backoff.</div>
        <div class="flex items-center gap-2"><span class="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center font-bold text-[10px]">5</span> Modern switched full-duplex Ethernet does not require CSMA/CD.</div>
      </div>
    `,
    workedExamples: {
      level1: "<strong>Question:</strong> What IEEE standard family defines Ethernet, and what does it specify?<br><br><strong>Answer:</strong> Ethernet is defined by the <strong>IEEE 802.3</strong> standard family. It specifies the physical layer transmission characteristics (cables, signaling, speeds), the 48-bit MAC addressing architecture, the 7-field frame format, and the medium access control method (CSMA/CD in half-duplex).",
      level2: "<strong>Analysis:</strong> Why did the invention of the Ethernet switch eliminate the need for the CSMA/CD protocol?<br><br><strong>Analysis:</strong> In shared Ethernet (using hubs or coaxial bus), all stations shared a single wire, so concurrent transmissions interfered and destroyed frames. An Ethernet switch creates dedicated point-to-point circuits between each station and the switch fabric. With separate transmit ($Tx$) and receive ($Rx$) wire pairs operating in full-duplex mode, signals never travel on the same conductor in opposite directions. Because each link is an isolated collision domain, collisions cannot occur, rendering CSMA/CD unnecessary.",
      level3: "<strong>Exam Question (PDF Section 15):</strong> What is the difference between DIX Ethernet and IEEE 802.3 Ethernet regarding field 5?<br><br><strong>Analysis:</strong> In the original DIX Ethernet (Version 2.0), field 5 was designated as the <strong>Type</strong> (EtherType) field, used to identify the network-layer protocol (e.g. 0x0800 for IPv4, 0x0806 for ARP). In the IEEE 802.3 standard, field 5 was redefined as the <strong>Length</strong> field (indicating payload byte count). Modern networks interpret any value $\\ge 1536$ (0x0600) as an EtherType field and any value $\\le 1500$ as a Length field, ensuring universal backward compatibility."
    },
    advantagesLimitations: `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-xs">
        <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg">
          <h4 class="font-bold text-emerald-900 dark:text-emerald-200 mb-2">Key Advantages (PDF Section 12)</h4>
          <ul class="space-y-1.5 list-disc pl-4 text-slate-700 dark:text-slate-300">
            <li><strong>Pervasive Global Adoption:</strong> Mass manufacturing makes Ethernet NICs and cables extremely inexpensive.</li>
            <li><strong>Broad Data Rate Spectrum:</strong> Scales seamlessly from 10 Mbps to 100 Mbps, 1 Gbps, 10 Gbps, 100 Gbps, and 400 Gbps.</li>
            <li><strong>Standardized Frame Format:</strong> Frame format remains consistent across all speeds, ensuring backward compatibility.</li>
            <li><strong>Seamless Switched Expansion:</strong> Multiport switches allow networks to expand without performance degradation.</li>
            <li><strong>Built-in Error Detection:</strong> 32-bit CRC detects frame corruptions with near-perfect mathematical certainty.</li>
          </ul>
        </div>
        <div class="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
          <h4 class="font-bold text-red-900 dark:text-red-200 mb-2">Key Limitations (PDF Section 12)</h4>
          <ul class="space-y-1.5 list-disc pl-4 text-slate-700 dark:text-slate-300">
            <li><strong>Shared Bus Collisions:</strong> Legacy half-duplex Ethernet suffers from throughput collapse under heavy load.</li>
            <li><strong>Distance Limitations:</strong> Copper twisted-pair Ethernet (10Base-T to 1000Base-T) is strictly limited to 100 meters per run.</li>
            <li><strong>No Built-in Error Correction:</strong> CRC detects damaged frames but simply drops them without native retransmission.</li>
            <li><strong>Wiring Infrastructure Overhead:</strong> Physical cabling must be pulled, terminated, and patched throughout buildings.</li>
          </ul>
        </div>
      </div>
    `,
    whereUsed: [
      "Enterprise corporate LAN backbones and workstation drops.",
      "Cloud hyperscale data centers connecting rack-mounted compute blades.",
      "Home fiber broadband routers and gaming PCs.",
      "Industrial automation environments running real-time EtherCAT / PROFINET."
    ],
    quiz: [
      {
        question: "Which IEEE standard family defines Ethernet?",
        options: ["IEEE 802.11", "IEEE 802.3", "IEEE 802.5", "IEEE 802.15"],
        correct: 1,
        explanation: "Ethernet is formally defined by the IEEE 802.3 standard family (while 802.11 is Wi-Fi and 802.5 is Token Ring)."
      },
      {
        question: "Which Ethernet mode does NOT require CSMA/CD?",
        options: ["Shared half-duplex coaxial", "Full-duplex switched Ethernet", "10Base2 Thin Ethernet", "10Base5 Thick Ethernet"],
        correct: 1,
        explanation: "Full-duplex switched Ethernet provides dedicated, collision-free bidirectional channels, completely eliminating the need for CSMA/CD."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 13: Wired LANs: Ethernet (Section 13.1).", url: "" },
      { cite: "IEEE Standard 802.3: Carrier Sense Multiple Access with Collision Detection (CSMA/CD) Access Method and Physical Layer Specifications.", url: "" }
    ]
  }
};

// =============================================================================
// SUBTOPIC 2: u2-ethernet-architecture - Ethernet Architecture
// =============================================================================
data["u2-ethernet-architecture"] = {
  id: "u2-ethernet-architecture",
  title: "Ethernet Architecture",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 6,
  subtopicNumber: 2,
  whyItMatters: "The IEEE 802 project elegantly divided the OSI Data Link Layer into two functional sublayers: Logical Link Control (LLC) and Media Access Control (MAC). This modular architecture allows diverse network-layer protocols to share diverse physical transmission media seamlessly.",
  prerequisitesList: [
    { concept: "OSI Layer 2 Model", meaning: "Position and responsibilities of the Data Link Layer" },
    { concept: "IEEE 802 Project", meaning: "Standardization of Local Area Network sublayers" }
  ],
  learningObjectives: [
    "Identify the two sublayers of the Data Link Layer in the IEEE 802 architecture.",
    "Detail the roles and functions of the Logical Link Control (LLC, IEEE 802.2) sublayer.",
    "Detail the roles and functions of the Media Access Control (MAC, IEEE 802.3) sublayer.",
    "Compare LLC and MAC across positioning, interfaces, addressing, and standards.",
    "Explain how the sublayer split enables protocol independence across copper and fiber media."
  ],
  infobox: {
    layer: "Layer 2: LLC (802.2) & MAC (802.3)",
    standard: "IEEE 802.2 / IEEE 802.3 / Forouzan Section 13.1",
    type: "Sublayer Architectural Model",
    prerequisites: ["ethernet", "u2-dll-osi-position"],
    relatedConcepts: ["mac-address", "u2-ethernet-frame-format", "u2-ethernet-mac-protocol"],
    compareWith: ["u2-dll-functions"],
    primaryUses: ["LAN protocol stack implementations, NIC device driver architecture"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/OSI_Model_v1.svg/600px-OSI_Model_v1.svg.png",
  imageCaption: "Figure: Decomposition of Data Link Layer into LLC (IEEE 802.2) and MAC (IEEE 802.3) Sublayers.",
  sections: {
    overview: `
      <p>Ethernet operates primarily at the <strong>Physical Layer (Layer 1)</strong> and the <strong>Data Link Layer (Layer 2)</strong> of the OSI reference model.</p>

      <p>Under the <strong>IEEE 802 LAN architecture</strong> (described in <em>Forouzan Chapter 13, Section 13.1</em>), the Data Link Layer is divided into two distinct sublayers:</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div class="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 rounded-lg">
          <div class="flex justify-between items-center mb-1">
            <h4 class="font-bold text-emerald-900 dark:text-emerald-200 text-sm">1. LLC Sublayer (Upper)</h4>
            <span class="text-[10px] font-mono bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100 px-1.5 py-0.5 rounded font-bold">IEEE 802.2</span>
          </div>
          <p class="text-xs text-emerald-800 dark:text-emerald-300">
            <strong>Logical Link Control:</strong> Provides a uniform service interface to the Network Layer (IP) regardless of the underlying physical network technology.
          </p>
        </div>

        <div class="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-300 dark:border-blue-700 rounded-lg">
          <div class="flex justify-between items-center mb-1">
            <h4 class="font-bold text-blue-900 dark:text-blue-200 text-sm">2. MAC Sublayer (Lower)</h4>
            <span class="text-[10px] font-mono bg-blue-200 dark:bg-blue-800 text-blue-900 dark:text-blue-100 px-1.5 py-0.5 rounded font-bold">IEEE 802.3</span>
          </div>
          <p class="text-xs text-blue-800 dark:text-blue-300">
            <strong>Media Access Control:</strong> Manages framing, physical 48-bit MAC addressing, error detection (CRC-32), and channel access arbitration (CSMA/CD).
          </p>
        </div>
      </div>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">2.1 Functions of the LLC Sublayer (PDF Section 2.1)</h3>
      <ul class="wiki-bullet-list">
        <li><strong>Network Layer Interface:</strong> Provides a consistent software interface to upper-layer protocols (such as IPv4, IPv6, ARP, or IPX).</li>
        <li><strong>Protocol Multiplexing & Identification:</strong> Identifies which upper-layer protocol generated the packet using Service Access Points (SAPs) or Subnetwork Access Protocol (SNAP) headers.</li>
        <li><strong>Logical Link Management:</strong> Provides optional connection-oriented or reliable flow-control and error-control services when required.</li>
      </ul>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">2.2 Functions of the MAC Sublayer (PDF Section 2.2)</h3>
      <ul class="wiki-bullet-list">
        <li><strong>Physical Addressing:</strong> Appends the 6-byte source and destination MAC addresses to frame headers.</li>
        <li><strong>Frame Encapsulation:</strong> Packages network-layer packets into valid IEEE 802.3 frames with preambles and delimiters.</li>
        <li><strong>Medium Access Arbitration:</strong> Controls when stations can transmit on a shared medium using CSMA/CD in half-duplex mode.</li>
        <li><strong>Error Detection:</strong> Computes and appends the 4-byte CRC-32 Frame Check Sequence (FCS) to detect transmission errors.</li>
      </ul>
    `,
    eli10: "In simple words: The Data Link Layer has two helpers. LLC talks upstairs to the software (IP) and doesn't care what wires you use. MAC talks downstairs to the hardware wires, puts stamps (MAC addresses) on the envelopes, and checks for collisions.",
    analogy: "Think of an international trading firm. LLC is the multilingual translator who reviews contracts from different clients (IPv4, IPv6) and prepares a standard brief. MAC is the warehouse shipping manager who packs the crates, stencils the destination shipping address, loads them onto the trucks, and inspects them for damage.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Head-to-Head Comparison: LLC vs. MAC Sublayers (PDF Section 2.3)</h3>
      <p class="text-xs text-gray-600 dark:text-gray-400 mb-3">Master syllabus comparison table distinguishing the two IEEE 802 sublayers:</p>

      <table class="wiki-table text-xs">
        <thead>
          <tr>
            <th>Comparison Parameter</th>
            <th>Logical Link Control (LLC)</th>
            <th>Media Access Control (MAC)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Sublayer Position</strong></td>
            <td><strong>Upper</strong> Data Link sublayer (Layer 2b)</td>
            <td><strong>Lower</strong> Data Link sublayer (Layer 2a)</td>
          </tr>
          <tr>
            <td><strong>Governing Standard</strong></td>
            <td><strong>IEEE 802.2</strong></td>
            <td><strong>IEEE 802.3</strong> (Ethernet), 802.11 (Wi-Fi)</td>
          </tr>
          <tr>
            <td><strong>Interface Boundary</strong></td>
            <td>Interfaces upward with the <strong>Network Layer (L3)</strong></td>
            <td>Interfaces downward with the <strong>Physical Layer (L1)</strong></td>
          </tr>
          <tr>
            <td><strong>Addressing Handled</strong></td>
            <td>Service Access Points (SSAP / DSAP)</td>
            <td><strong>48-bit Physical MAC Addresses</strong></td>
          </tr>
          <tr>
            <td><strong>Medium Dependency</strong></td>
            <td><strong>Medium-Independent:</strong> Identical across Ethernet, Wi-Fi, and Token Ring</td>
            <td><strong>Medium-Dependent:</strong> Tailored specifically to cable type, signaling, and speed</td>
          </tr>
          <tr>
            <td><strong>Core Responsibilities</strong></td>
            <td>Protocol multiplexing, flow control, link error control</td>
            <td>Frame creation, medium arbitration (CSMA/CD), CRC error detection</td>
          </tr>
        </tbody>
      </table>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Why Did IEEE Split Layer 2?</h3>
      <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
        In the original OSI model, Layer 2 was conceived as a single monolithic layer. However, the IEEE 802 Committee recognized that different physical media (coaxial, twisted pair, optical fiber, wireless RF) require vastly different access methods (CSMA/CD, CSMA/CA, Token Passing), yet the Network Layer (IP) should not need to rewrite its interface for every new cable type.
      </p>
      <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
        By isolating medium-specific operations in the <strong>MAC sublayer</strong> and providing a single standardized interface in the <strong>LLC sublayer</strong>, software applications and operating system IP stacks remain 100% agnostic to whether packets travel over 10 Gbps Ethernet, 5G cellular, or Wi-Fi 6.
      </p>
    `,
    workedExamples: {
      level1: "<strong>Question (PDF Section 15 Q1):</strong> Explain the architecture of Ethernet and its two Data Link sublayers.<br><br><strong>Answer:</strong> Ethernet spans OSI Layer 1 (Physical) and Layer 2 (Data Link). Layer 2 is divided into the <strong>Logical Link Control (LLC, IEEE 802.2)</strong> sublayer, which interfaces with Layer 3 (IP) to identify upper-layer protocols, and the <strong>Media Access Control (MAC, IEEE 802.3)</strong> sublayer, which handles physical MAC addressing, frame construction, CSMA/CD medium arbitration, and CRC-32 error detection.",
      level2: "<strong>Analysis:</strong> If a computer swaps its network adapter from a 1 Gbps wired Ethernet NIC to an 802.11ax Wi-Fi card, which sublayer changes, and which stays identical?<br><br><strong>Analysis:</strong> The <strong>MAC sublayer and Physical layer change completely</strong> &mdash; the protocol changes from IEEE 802.3 (CSMA/CD framing) to IEEE 802.11 (CSMA/CA wireless framing). However, the <strong>LLC sublayer (IEEE 802.2) remains identical</strong>, presenting the exact same interface to the IP layer so running network software experiences zero interruption.",
      level3: "<strong>Edge Case:</strong> Why do modern TCP/IP networks largely omit the IEEE 802.2 LLC header in favor of Ethernet II framing?<br><br><strong>Analysis:</strong> The original DIX Ethernet II frame used a 2-byte <em>Type</em> field directly in the MAC header to identify IP (0x0800) or ARP (0x0806). Because the Type field fulfilled LLC's primary purpose without adding 3–8 bytes of LLC/SNAP header overhead, modern Internet traffic overwhelmingly uses Ethernet II framing directly on the wire."
    },
    advantagesLimitations: `
      <div class="p-3 my-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
        <h4 class="font-bold text-slate-800 dark:text-slate-200 mb-2">Architectural Benefits of the Two-Sublayer Model</h4>
        <ul class="space-y-1.5 text-slate-600 dark:text-slate-300 list-disc pl-4">
          <li><strong>Modular Extensibility:</strong> Allows Ethernet to advance from 10 Mbps to 400 Gbps without altering network layer protocols.</li>
          <li><strong>Multi-Protocol Support:</strong> Single MAC hardware can transport IPv4, IPv6, AppleTalk, and IPX concurrently.</li>
          <li><strong>Clean Driver Separation:</strong> NIC manufacturers write hardware MAC drivers; OS vendors write protocol stacks interfacing at LLC.</li>
        </ul>
      </div>
    `,
    whereUsed: [
      "Operating system network driver architectures (NDIS in Windows, net_device in Linux).",
      "Network Interface Card (NIC) firmware and hardware ASIC designs.",
      "IEEE 802 LAN/MAN standard specifications across wired and wireless systems."
    ],
    quiz: [
      {
        question: "Which Data Link sublayer interfaces directly with the Network Layer (IP)?",
        options: ["Physical Layer", "Media Access Control (MAC)", "Logical Link Control (LLC)", "Session Layer"],
        correct: 2,
        explanation: "The Logical Link Control (LLC, IEEE 802.2) sublayer is the upper sublayer interfacing directly with the Network Layer."
      },
      {
        question: "Which sublayer is responsible for physical addressing (MAC addresses) and CRC error detection?",
        options: ["LLC Sublayer", "MAC Sublayer", "Transport Layer", "Application Layer"],
        correct: 1,
        explanation: "The Media Access Control (MAC, IEEE 802.3) sublayer handles physical 48-bit addressing, frame encapsulation, and CRC-32."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 13 (Section 13.1).", url: "" },
      { cite: "IEEE 802: IEEE Standard for Local and Metropolitan Area Networks: Overview and Architecture.", url: "" }
    ]
  }
};

console.log("Successfully prepared Subtopics 1 and 2 for Topic 6!");

// =============================================================================
// SUBTOPIC 3: mac-address - Ethernet MAC Addressing
// =============================================================================
data["mac-address"] = {
  id: "mac-address",
  title: "Ethernet MAC Addressing",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 6,
  subtopicNumber: 3,
  whyItMatters: "A MAC address is the globally unique hardware identity burned into every Network Interface Card (NIC). Understanding its 48-bit structure, OUI allocation, and unicast/multicast/broadcast bit-level encoding is foundational to all Layer 2 network switching and packet forwarding.",
  prerequisitesList: [
    { concept: "Hexadecimal Number System", meaning: "Base-16 notation (0-9, A-F)" },
    { concept: "Data Link Layer Addressing", meaning: "Hop-by-hop physical addressing across local links" }
  ],
  learningObjectives: [
    "Define a Media Access Control (MAC) address and state its size (48 bits / 6 bytes).",
    "Describe the 12-digit hexadecimal notation and byte separation convention.",
    "Differentiate between the Organizationally Unique Identifier (OUI) and NIC serial number.",
    "Categorize the 3 destination address types: Unicast, Multicast, and Broadcast.",
    "Apply Forouzan's 6-step method to identify address types by inspecting the least significant bit of the first byte.",
    "Solve numerical problems determining address bits and classification."
  ],
  infobox: {
    layer: "Layer 2 (MAC Sublayer)",
    standard: "IEEE 802.3 / IEEE EUI-48 / Forouzan Section 13.2",
    type: "Hardware Physical Addressing",
    prerequisites: ["ethernet", "u2-ethernet-architecture"],
    relatedConcepts: ["u2-ethernet-frame-format", "u2-ethernet-mac-protocol"],
    compareWith: ["u2-dll-osi-position"],
    primaryUses: ["Switch forwarding tables, ARP binding, NIC packet filtering, DHCP reservation"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/OSI_Model_v1.svg/600px-OSI_Model_v1.svg.png",
  imageCaption: "Figure: 48-Bit (6-Byte) Physical MAC Address Format and Address Classification.",
  sections: {
    overview: `
      <p>A <strong>MAC address</strong> (Media Access Control address) is a physical, hardware-level identifier permanently assigned to a network interface card (NIC) on a local network.</p>

      <p>According to <em>Behrouz A. Forouzan (Chapter 13, Section 13.2)</em>, each Ethernet station has a <strong>6-byte (48-bit) physical address</strong> burned into its ROM or firmware.</p>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Important Characteristics (PDF Section 3)</h3>
      <ul class="wiki-bullet-list">
        <li><strong>Total Length:</strong> 48 bits (6 bytes).</li>
        <li><strong>Hexadecimal Representation:</strong> Written as 12 hexadecimal digits (0–9, A–F).</li>
        <li><strong>Delimiter Formatting:</strong> Usually written with colons (e.g. <code>06:01:02:01:2C:4B</code>) or hyphens (<code>06-01-02-01-2C-4B</code>) separating the 6 bytes.</li>
        <li><strong>Bit Calculation:</strong> $6 \\text{ bytes} \\times 8 \\text{ bits/byte} = 48 \\text{ bits}$.</li>
      </ul>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Structural Partitioning: OUI vs. NIC Serial</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 my-3 text-xs">
        <div class="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg border border-indigo-200 dark:border-indigo-800">
          <span class="font-bold text-indigo-900 dark:text-indigo-200 block mb-1">First 3 Bytes (24 Bits): Organizationally Unique Identifier (OUI)</span>
          <p class="text-slate-600 dark:text-slate-300">
            Assigned by the IEEE Registration Authority to network equipment manufacturers (e.g., Cisco, Intel, Apple). Identifies the vendor who produced the NIC.
          </p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
          <span class="font-bold text-slate-800 dark:text-slate-200 block mb-1">Last 3 Bytes (24 Bits): NIC Serial / Station Identifier</span>
          <p class="text-slate-600 dark:text-slate-300">
            Assigned uniquely by the manufacturer to each individual hardware interface card, ensuring global uniqueness across the planet.
          </p>
        </div>
      </div>
    `,
    eli10: "In simple words: A MAC address is like your computer's fingerprint or passport number. It is 12 letters and numbers long, and no two computers in the entire world have the same one!",
    analogy: "Think of an automobile's Vehicle Identification Number (VIN) stamped on its engine chassis. The first few characters identify the car manufacturer (Toyota, Ford), and the remaining characters identify the specific vehicle. Even if you move to a new city (change your IP address), your car's chassis VIN (MAC address) never changes.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">The Three Types of Ethernet Destination Addresses (PDF Section 3.1)</h3>
      <p class="text-xs text-gray-600 dark:text-gray-400 mb-3">Ethernet distinguishes three categories of destination addresses:</p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-blue-600 dark:text-blue-400 block mb-1">A. Unicast Address</span>
          <p class="text-slate-600 dark:text-slate-300 text-[11px] mb-2">Identifies exactly one destination network station (one-to-one communication).</p>
          <div class="p-1.5 rounded bg-blue-50 dark:bg-blue-950/60 font-mono text-[10px] text-blue-800 dark:text-blue-200">
            <strong>Rule:</strong> LSB of first byte is <strong>0</strong>.<br>
            e.g. <code>4A:30:10:21:10:1A</code>
          </div>
        </div>

        <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-purple-600 dark:text-purple-400 block mb-1">B. Multicast Address</span>
          <p class="text-slate-600 dark:text-slate-300 text-[11px] mb-2">Identifies a selected group of destination stations (one-to-many communication).</p>
          <div class="p-1.5 rounded bg-purple-50 dark:bg-purple-950/60 font-mono text-[10px] text-purple-800 dark:text-purple-200">
            <strong>Rule:</strong> LSB of first byte is <strong>1</strong>.<br>
            e.g. <code>47:20:1B:2E:08:EE</code>
          </div>
        </div>

        <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">C. Broadcast Address</span>
          <p class="text-slate-600 dark:text-slate-300 text-[11px] mb-2">Sends the frame to all stations on the local network (one-to-all communication).</p>
          <div class="p-1.5 rounded bg-emerald-50 dark:bg-emerald-950/60 font-mono text-[10px] text-emerald-800 dark:text-emerald-200">
            <strong>Rule:</strong> All 48 bits are <strong>1</strong>.<br>
            <code>FF:FF:FF:FF:FF:FF</code>
          </div>
        </div>
      </div>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">How to Identify Address Type (Forouzan's 6-Step Method - PDF Section 3.2)</h3>
      <ol class="wiki-ordered-list text-xs">
        <li>Examine the <strong>first byte</strong> (the first two hexadecimal digits) of the MAC address.</li>
        <li>Convert the hexadecimal digits into their 8-bit binary equivalent.</li>
        <li>Inspect the <strong>least significant bit (bit 0)</strong> of the first byte (the rightmost bit of the first byte).</li>
        <li>If the bit is <code>0</code>, the address is a <strong>Unicast address</strong>.</li>
        <li>If the bit is <code>1</code>, the address is a <strong>Multicast address</strong>.</li>
        <li>If all 12 hexadecimal digits are <code>F</code> (<code>FF:FF:FF:FF:FF:FF</code>), the address is the <strong>Broadcast address</strong>.</li>
      </ol>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Comprehensive Solved Examples from Forouzan (PDF Section 3.2)</h3>

      <div class="space-y-3 text-xs">
        <!-- Example 1 -->
        <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <div class="font-bold text-slate-800 dark:text-slate-200 mb-1">Solved Example 1: Classify <code>4A:30:10:21:10:1A</code></div>
          <div class="font-mono text-slate-600 dark:text-slate-300 space-y-1">
            <div>1. First byte = $4A_{16}$.</div>
            <div>2. Convert to binary: $4_{16} = 0100_2$, $A_{16} = 1010_2 \\implies 4A_{16} = 01001010_2$.</div>
            <div>3. Least significant bit (LSB) = <code>0</code>.</div>
            <div class="text-blue-600 dark:text-blue-400 font-bold">&there4; Address is UNICAST.</div>
          </div>
        </div>

        <!-- Example 2 -->
        <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <div class="font-bold text-slate-800 dark:text-slate-200 mb-1">Solved Example 2: Classify <code>47:20:1B:2E:08:EE</code></div>
          <div class="font-mono text-slate-600 dark:text-slate-300 space-y-1">
            <div>1. First byte = $47_{16}$.</div>
            <div>2. Convert to binary: $4_{16} = 0100_2$, $7_{16} = 0111_2 \\implies 47_{16} = 01000111_2$.</div>
            <div>3. Least significant bit (LSB) = <code>1</code>.</div>
            <div class="text-purple-600 dark:text-purple-400 font-bold">&there4; Address is MULTICAST.</div>
          </div>
        </div>

        <!-- Example 3 -->
        <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <div class="font-bold text-slate-800 dark:text-slate-200 mb-1">Solved Example 3: Classify <code>FF:FF:FF:FF:FF:FF</code></div>
          <div class="font-mono text-slate-600 dark:text-slate-300 space-y-1">
            <div>1. All 12 hexadecimal digits are <code>F</code>.</div>
            <div>2. All 48 bits in binary are <code>1</code>.</div>
            <div class="text-emerald-600 dark:text-emerald-400 font-bold">&there4; Address is BROADCAST.</div>
          </div>
        </div>
      </div>
    `,
    workedExamples: {
      level1: "<strong>Numerical 1 (MAC Address Size - PDF Section 14):</strong><br>Calculate the number of bits in a 6-byte Ethernet MAC address.<br><br><strong>Solution:</strong><br>$$\\text{Total Bits} = 6 \\text{ bytes} \\times 8 \\text{ bits/byte} = 48 \\text{ bits}$$<br><strong>Answer:</strong> 48 bits.",
      level2: "<strong>Exam Problem:</strong> Determine whether the MAC address <code>E3:45:00:12:34:56</code> is unicast or multicast.<br><br><strong>Solution:</strong><br>1. First byte is $E3_{16}$.<br>2. Convert $E3_{16}$ to binary: $E_{16} = 1110_2$, $3_{16} = 0011_2 \\implies 11100011_2$.<br>3. Inspect the least significant bit (rightmost bit): it is <code>1</code>.<br><strong>Answer:</strong> Because the least significant bit of the first byte is 1, the address is a <strong>Multicast</strong> address.",
      level3: "<strong>Edge Case (Transmission Order on Wire):</strong> In what order are the 48 bits of an Ethernet MAC address transmitted across the physical cable?<br><br><strong>Analysis:</strong> Ethernet transmits bytes from left to right (byte 1 to byte 6), but within each byte, it transmits the <strong>Least Significant Bit (LSB) first</strong> (little-endian bit order). Therefore, the very first bit transmitted on the wire is the Unicast/Multicast bit (bit 0 of byte 1)! This brilliant hardware design allows receiving switches to immediately know whether a frame is unicast or multicast upon reading the very first bit."
    },
    advantagesLimitations: `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-xs">
        <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg">
          <h4 class="font-bold text-emerald-900 dark:text-emerald-200 mb-2">Advantages of 48-Bit MAC Addressing</h4>
          <ul class="space-y-1.5 list-disc pl-4 text-slate-700 dark:text-slate-300">
            <li><strong>Global Uniqueness:</strong> OUI licensing ensures no two manufactured NICs duplicate addresses.</li>
            <li><strong>Plug-and-Play Simplicity:</strong> No manual IP configuration required for Layer 2 connectivity.</li>
            <li><strong>Immediate Bit-0 Classification:</strong> Switches identify unicast vs multicast on the first transmitted bit.</li>
          </ul>
        </div>
        <div class="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
          <h4 class="font-bold text-red-900 dark:text-red-200 mb-2">Limitations of MAC Addressing</h4>
          <ul class="space-y-1.5 list-disc pl-4 text-slate-700 dark:text-slate-300">
            <li><strong>Flat (Non-Hierarchical) Address Space:</strong> Cannot be aggregated for internetwork routing like IP subnets.</li>
            <li><strong>Spoofing Vulnerability:</strong> Operating systems can override MAC addresses in software (MAC spoofing).</li>
            <li><strong>Local Scope Only:</strong> MAC addresses are stripped and replaced at each router hop across wide area networks.</li>
          </ul>
        </div>
      </div>
    `,
    whereUsed: [
      "Ethernet switch MAC Address Tables (Content Addressable Memory - CAM tables).",
      "Address Resolution Protocol (ARP) mappings between IP and hardware addresses.",
      "Wi-Fi Association and MAC filtering in wireless access points."
    ],
    quiz: [
      {
        question: "What is the exact bit length of an Ethernet MAC address?",
        options: ["16 bits", "32 bits", "48 bits", "64 bits"],
        correct: 2,
        explanation: "An Ethernet MAC address contains exactly 48 bits (6 bytes), represented as 12 hexadecimal digits."
      },
      {
        question: "How do you distinguish between a unicast and a multicast Ethernet MAC address?",
        options: [
          "Check if the last byte is zero",
          "Check the least significant bit of the first byte (0 = unicast, 1 = multicast)",
          "Check if the address contains colons",
          "Check if the first digit is an F"
        ],
        correct: 1,
        explanation: "By standard rule, if the least significant bit (bit 0) of the first byte is 0, the address is Unicast; if 1, it is Multicast."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 13 (Section 13.2: Standard Ethernet Addressing).", url: "" },
      { cite: "IEEE Guidelines for 48-bit Global Identifier (EUI-48).", url: "" }
    ]
  }
};

console.log("Successfully prepared Subtopic 3 for Topic 6!");

// =============================================================================
// SUBTOPIC 4: u2-ethernet-frame-format - Ethernet Frame Format
// =============================================================================
data["u2-ethernet-frame-format"] = {
  id: "u2-ethernet-frame-format",
  title: "Ethernet Frame Format",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 6,
  subtopicNumber: 4,
  whyItMatters: "The 7-field IEEE 802.3 Ethernet frame is the universal data packet format of wired local area networks. Understanding its minimum 64-byte and maximum 1518-byte bounds, padding mechanics, and CRC-32 Frame Check Sequence is essential for network engineering and performance troubleshooting.",
  prerequisitesList: [
    { concept: "Framing Methods", meaning: "Pointers, delimiters, headers, and trailers" },
    { concept: "Ethernet MAC Addressing", meaning: "48-bit source and destination physical addresses" }
  ],
  learningObjectives: [
    "Identify and describe all 7 fields of the standard IEEE 802.3 Ethernet frame.",
    "State the size and role of the Preamble (7B) and Start Frame Delimiter (1B).",
    "Calculate the fixed overhead of the Ethernet frame (18 bytes).",
    "Derive the minimum frame size (64 bytes / 512 bits) and minimum payload (46 bytes).",
    "Derive the maximum frame size (1518 bytes) and maximum payload (1500 bytes MTU).",
    "Explain the critical relationship between minimum frame length and CSMA/CD collision detection."
  ],
  infobox: {
    layer: "Layer 2 (MAC Sublayer)",
    standard: "IEEE 802.3-2022 / Forouzan Section 13.2",
    type: "Data Link PDU Structure",
    prerequisites: ["ethernet", "u2-ethernet-architecture", "mac-address"],
    relatedConcepts: ["u2-ethernet-mac-protocol", "u2-ethernet-csma-cd-operation", "u2-binary-exponential-backoff"],
    compareWith: ["framing"],
    primaryUses: ["Packet sniffing (Wireshark), MTU configuration, Ethernet switch ASIC parsing"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/OSI_Model_v1.svg/600px-OSI_Model_v1.svg.png",
  imageCaption: "Figure: Standard IEEE 802.3 Ethernet Frame Structure (Forouzan Figure 13.4).",
  sections: {
    overview: `
      <p>An <strong>Ethernet frame</strong> is the fundamental Protocol Data Unit (PDU) at the Data Link Layer MAC sublayer. It packages addressing information, protocol multiplexing controls, upper-layer data payloads, and error-detection checksums into a standardized byte sequence.</p>

      <p>According to <em>Behrouz A. Forouzan (Chapter 13, Section 13.2)</em>, the standard IEEE 802.3 Ethernet frame consists of <strong>seven distinct fields</strong>:</p>

      <div class="overflow-x-auto my-3">
        <table class="wiki-table text-xs">
          <thead>
            <tr>
              <th>Field Number</th>
              <th>Field Name</th>
              <th>Field Size</th>
              <th>Operational Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td class="font-bold">Preamble</td>
              <td class="font-mono text-center">7 Bytes (56 bits)</td>
              <td>Alternating <code>10101010...</code> bit pattern to synchronize receiver clock circuitry.</td>
            </tr>
            <tr>
              <td>2</td>
              <td class="font-bold">Start Frame Delimiter (SFD)</td>
              <td class="font-mono text-center">1 Byte (8 bits)</td>
              <td>Pattern <code>10101011</code>; the two consecutive 1s mark the exact start of the MAC frame.</td>
            </tr>
            <tr>
              <td>3</td>
              <td class="font-bold">Destination Address (DA)</td>
              <td class="font-mono text-center">6 Bytes (48 bits)</td>
              <td>Physical MAC address of the intended receiving station (unicast, multicast, or broadcast).</td>
            </tr>
            <tr>
              <td>4</td>
              <td class="font-bold">Source Address (SA)</td>
              <td class="font-mono text-center">6 Bytes (48 bits)</td>
              <td>Physical MAC address of the transmitting network interface card (always unicast).</td>
            </tr>
            <tr>
              <td>5</td>
              <td class="font-bold">Length or Type</td>
              <td class="font-mono text-center">2 Bytes (16 bits)</td>
              <td>Indicates upper-layer protocol (EtherType $\\ge 0x0600$) or data payload length ($\\le 1500$).</td>
            </tr>
            <tr>
              <td>6</td>
              <td class="font-bold">Data and Padding</td>
              <td class="font-mono text-center">46 to 1500 Bytes</td>
              <td>Carries the Network Layer IP packet; padded if payload is smaller than 46 bytes.</td>
            </tr>
            <tr>
              <td>7</td>
              <td class="font-bold">Cyclic Redundancy Check (CRC)</td>
              <td class="font-mono text-center">4 Bytes (32 bits)</td>
              <td>CRC-32 Frame Check Sequence (FCS) error-detection polynomial value.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p class="text-xs text-gray-500 italic mt-1">Note: Preamble and SFD are physical-layer synchronization fields and are not counted in the 64-to-1518 byte MAC frame length calculation.</p>
    `,
    eli10: "In simple words: An Ethernet frame is a standardized postal envelope. It has a 'Wake up!' whistle (Preamble), 'Here it comes!' mark (SFD), receiver address (DA), return address (SA), envelope type (IPv4), letter inside (Data), and a tamper-proof wax seal (CRC).",
    analogy: "Think of an armored security transport train. The locomotive horn warns the station (Preamble), the coupler latches the cars (SFD), the manifest lists destination and origin stations (DA & SA), the cargo cars carry between 46 and 1500 boxes (Data & Padding), and the caboose carries an inspector who verifies the cargo seals (CRC).",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Detailed Breakdown of the 7 Frame Fields (PDF Section 4.1 &ndash; 4.7)</h3>

      <div class="space-y-3 text-xs">
        <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-blue-600 dark:text-blue-400 block mb-1">1. Preamble (7 Bytes / 56 bits)</span>
          <p class="text-slate-600 dark:text-slate-300">
            Contains 56 bits of alternating 1s and 0s (<code>10101010...10101010</code>). In high-speed serial networks, receivers need a brief training period to lock their internal phase-locked loops (PLL) to the incoming bit frequency. The preamble alerts the receiver that a frame is arriving and synchronizes its timing clock.
          </p>
        </div>

        <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-amber-600 dark:text-amber-400 block mb-1">2. Start Frame Delimiter - SFD (1 Byte / 8 bits)</span>
          <p class="text-slate-600 dark:text-slate-300">
            Contains the unique binary pattern <code>10101011</code>. Notice that it continues the alternating preamble pattern until the final two bits (<code>11</code>). These two consecutive 1-bits signal to the hardware MAC controller that synchronization is ending and the very next bit is the first bit of the Destination MAC address.
          </p>
        </div>

        <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-indigo-600 dark:text-indigo-400 block mb-1">3. Destination Address - DA (6 Bytes / 48 bits)</span>
          <p class="text-slate-600 dark:text-slate-300">
            The 48-bit physical address of the receiving device. Can be a Unicast address, Multicast group address, or Broadcast address (<code>FF:FF:FF:FF:FF:FF</code>).
          </p>
        </div>

        <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-indigo-600 dark:text-indigo-400 block mb-1">4. Source Address - SA (6 Bytes / 48 bits)</span>
          <p class="text-slate-600 dark:text-slate-300">
            The 48-bit physical address of the sending NIC. Must always be a <strong>Unicast address</strong> (least significant bit of byte 1 is always 0), because a frame cannot physically originate from a group or broadcast address.
          </p>
        </div>

        <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-purple-600 dark:text-purple-400 block mb-1">5. Length or Type Field (2 Bytes / 16 bits)</span>
          <p class="text-slate-600 dark:text-slate-300">
            In DIX Ethernet II, this 2-byte field indicates the upper-layer network protocol (EtherType): <code>0x0800</code> for IPv4, <code>0x86DD</code> for IPv6, <code>0x0806</code> for ARP. In IEEE 802.3, it defines the length of the data field. Values $\ge 1536$ (0x0600) designate Type; values $\le 1500$ designate Length.
          </p>
        </div>

        <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">6. Data and Padding (46 to 1500 Bytes)</span>
          <p class="text-slate-600 dark:text-slate-300">
            Carries the upper-layer protocol payload. Standard Maximum Transmission Unit (MTU) is 1500 bytes. If an IP packet is smaller than 46 bytes (such as a 40-byte TCP ACK), padding bytes (all zeros) are appended to bring the payload up to 46 bytes, ensuring the total frame meets the mandatory 64-byte minimum length.
          </p>
        </div>

        <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-red-600 dark:text-red-400 block mb-1">7. Cyclic Redundancy Check - CRC (4 Bytes / 32 bits)</span>
          <p class="text-slate-600 dark:text-slate-300">
            Also known as the Frame Check Sequence (FCS). Calculated using the standard CRC-32 polynomial ($x^{32} + x^{26} + x^{23} + \\dots + 1$). Covers the DA, SA, Length/Type, and Data/Padding fields. If the receiver's computed CRC does not match, the damaged frame is silently discarded.
          </p>
        </div>
      </div>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Frame Length Calculations (PDF Section 5)</h3>
      <p class="text-xs text-gray-600 dark:text-gray-400 mb-2">The fixed header and trailer fields in every standard Ethernet frame sum to exactly 18 bytes:</p>

      <div class="p-2.5 my-2 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 font-mono text-center text-xs">
        $$\\text{Fixed Overhead} = 6 (\\text{DA}) + 6 (\\text{SA}) + 2 (\\text{Type/Length}) + 4 (\\text{CRC}) = 18 \\text{ bytes}$$
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-xs">
        <div class="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-800">
          <span class="font-bold text-blue-900 dark:text-blue-200 block mb-1">5.1 Minimum Frame Length Calculation</span>
          <div class="font-mono text-slate-700 dark:text-slate-300 space-y-1">
            <div>$$\\text{Minimum Frame Length} = 64 \\text{ bytes (512 bits)}$$</div>
            <div>$$\\text{Minimum Data Field} = 64 - 18 = 46 \\text{ bytes}$$</div>
            <p class="text-[10px] text-blue-800 dark:text-blue-300 mt-1 font-sans">
              Therefore, if upper-layer data is less than 46 bytes, <strong>padding is appended</strong> to prevent runt frames.
            </p>
          </div>
        </div>

        <div class="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-lg border border-purple-200 dark:border-purple-800">
          <span class="font-bold text-purple-900 dark:text-purple-200 block mb-1">5.2 Maximum Frame Length Calculation</span>
          <div class="font-mono text-slate-700 dark:text-slate-300 space-y-1">
            <div>$$\\text{Maximum Frame Length} = 1518 \\text{ bytes (12,144 bits)}$$</div>
            <div>$$\\text{Maximum Data Payload} = 1518 - 18 = 1500 \\text{ bytes (MTU)}$$</div>
            <p class="text-[10px] text-purple-800 dark:text-purple-300 mt-1 font-sans">
              Limits buffer requirements in network switches and prevents medium monopolization.
            </p>
          </div>
        </div>
      </div>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Why Is There a Minimum Frame Length? (CSMA/CD Physics)</h3>
      <div class="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-lg text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
        <strong>The CSMA/CD Condition:</strong> For a transmitting station to reliably detect a collision, it <em>must still be actively transmitting</em> when the collision echo from the most distant station arrives back. Therefore, the frame transmission time must be at least twice the round-trip propagation delay ($T_{\\text{frame}} \\ge 2 T_p$). In a 10 Mbps Ethernet network spanning 2.5 km with repeaters, round-trip delay is $\\approx 51.2\\ \\mu\\text{s}$. Transmitting at 10 Mbps for $51.2\\ \\mu\\text{s}$ produces exactly:
        $$\\text{Minimum Frame Size} = 10 \\times 10^6 \\text{ bps} \\times 51.2 \\times 10^{-6} \\text{ s} = 512 \\text{ bits} = 64 \\text{ bytes}$$
        Any frame shorter than 64 bytes is called a <strong>runt frame</strong> and is discarded as collision debris.
      </div>
    `,
    workedExamples: {
      level1: "<strong>Numerical 2 (Minimum Payload - PDF Section 14):</strong><br>Calculate the minimum data field size if the minimum Ethernet frame is 64 bytes.<br><br><strong>Solution:</strong><br>Fixed header and trailer fields = $6 (\\text{DA}) + 6 (\\text{SA}) + 2 (\\text{Length/Type}) + 4 (\\text{CRC}) = 18 \\text{ bytes}$.<br>$$\\text{Minimum Data Payload} = 64 - 18 = 46 \\text{ bytes}$$<br><strong>Answer:</strong> 46 bytes.",
      level2: "<strong>Numerical 3 (Maximum Payload - PDF Section 14):</strong><br>Calculate the maximum data field size if the maximum Ethernet frame is 1518 bytes.<br><br><strong>Solution:</strong><br>$$\\text{Maximum Payload} = 1518 - 18 = 1500 \\text{ bytes}$$<br><strong>Answer:</strong> 1500 bytes (the standard IP MTU).",
      level3: "<strong>Numerical 5 (Frame Length in Bits - PDF Section 14):</strong><br>Convert the maximum Ethernet frame length of 1518 bytes into bits.<br><br><strong>Solution:</strong><br>$$\\text{Bits} = 1518 \\times 8 = 12,144 \\text{ bits}$$<br><strong>Answer:</strong> 12,144 bits."
    },
    advantagesLimitations: `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-xs">
        <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg">
          <h4 class="font-bold text-emerald-900 dark:text-emerald-200 mb-2">Advantages of Standard Frame Format</h4>
          <ul class="space-y-1.5 list-disc pl-4 text-slate-700 dark:text-slate-300">
            <li><strong>Uniform Hardware Parsing:</strong> Hardware NICs parse fields in parallel at line rate.</li>
            <li><strong>Guaranteed Collision Detection:</strong> 64-byte floor guarantees CSMA/CD operation on shared media.</li>
            <li><strong>Standardized MTU:</strong> 1500-byte MTU avoids excessive IP packet fragmentation across routers.</li>
          </ul>
        </div>
        <div class="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
          <h4 class="font-bold text-red-900 dark:text-red-200 mb-2">Limitations &amp; Padding Overhead</h4>
          <ul class="space-y-1.5 list-disc pl-4 text-slate-700 dark:text-slate-300">
            <li><strong>Padding Waste for Small Packets:</strong> A 1-byte keystroke in Telnet requires 45 bytes of padding.</li>
            <li><strong>Fixed 1500-Byte Ceiling:</strong> In high-speed data centers, 1500 bytes causes high CPU interrupt overhead (alleviated by 9000-byte Jumbo Frames).</li>
          </ul>
        </div>
      </div>
    `,
    whereUsed: [
      "Wireshark packet capture analysis inspecting Layer 2 frames.",
      "Network adapter Maximum Transmission Unit (MTU = 1500 bytes) configuration.",
      "Layer 2 switch frame parsing and VLAN (802.1Q) tagging insertion."
    ],
    quiz: [
      {
        question: "How many bytes are in the Ethernet preamble?",
        options: ["4 bytes", "6 bytes", "7 bytes", "8 bytes"],
        correct: 2,
        explanation: "The preamble is 7 bytes (56 bits), followed by the 1-byte SFD, totaling 8 bytes of physical layer synchronization."
      },
      {
        question: "What is the binary pattern of the Start Frame Delimiter (SFD)?",
        options: ["10101010", "10101011", "11111111", "00000000"],
        correct: 1,
        explanation: "The SFD is 10101011; its last two 1s mark the end of timing synchronization and the arrival of the destination MAC address."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 13 (Section 13.2: Frame Format).", url: "" },
      { cite: "IEEE 802.3 Standard for Ethernet, Section 3: Media Access Control (MAC) frame and service specification.", url: "" }
    ]
  }
};

console.log("Successfully prepared Subtopic 4 for Topic 6!");

// =============================================================================
// SUBTOPIC 5: u2-ethernet-mac-protocol - Ethernet MAC Protocol
// =============================================================================
data["u2-ethernet-mac-protocol"] = {
  id: "u2-ethernet-mac-protocol",
  title: "Ethernet MAC Protocol",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 6,
  subtopicNumber: 5,
  whyItMatters: "The Ethernet MAC protocol bridges raw transmission media and high-level network software. It specifies hardware frame encapsulation, Interpacket Gap (IPG) pacing, packet filtering, and transmission scheduling across physical PHY transceivers.",
  prerequisitesList: [
    { concept: "Ethernet Architecture", meaning: "Division into LLC and MAC sublayers" },
    { concept: "Ethernet Frame Format", meaning: "7-field MAC frame structure" }
  ],
  learningObjectives: [
    "Define the operational role of the IEEE 802.3 MAC sublayer protocol.",
    "Explain the role and value of the Interpacket Gap (IPG / IFG = 96 bit times).",
    "Describe NIC address filtering and promiscuous mode operation.",
    "Trace the frame transmission and reception pipelines in the Ethernet MAC sublayer.",
    "Differentiate half-duplex MAC arbitration from full-duplex MAC transmission."
  ],
  infobox: {
    layer: "Layer 2 (MAC Sublayer)",
    standard: "IEEE 802.3 Clauses 2–4 / Forouzan Section 13.1",
    type: "MAC Protocol Specification",
    prerequisites: ["u2-ethernet-architecture", "u2-ethernet-frame-format"],
    relatedConcepts: ["u2-ethernet-csma-cd-operation", "u2-binary-exponential-backoff"],
    compareWith: ["u2-mac-sublayer-intro"],
    primaryUses: ["NIC controller hardware state machines, Ethernet framing controllers, Wireshark packet capture"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/OSI_Model_v1.svg/600px-OSI_Model_v1.svg.png",
  imageCaption: "Figure: Ethernet MAC Protocol Transmission Pipeline & Interpacket Gap.",
  sections: {
    overview: `
      <p>The <strong>Ethernet MAC Protocol</strong> defines the finite state machine and algorithmic rules that govern how data link frames are generated, transmitted, received, and filtered by network hardware.</p>

      <p>Situated directly below the Logical Link Control (LLC) sublayer and above the Physical Layer (PHY), the MAC protocol coordinates physical addressing, hardware timing rules, and collision recovery.</p>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Core Responsibilities of the MAC Sublayer Protocol</h3>
      <ul class="wiki-bullet-list">
        <li><strong>Frame Encapsulation:</strong> Prepending the 8-byte Preamble/SFD synchronization sequence and physical MAC addresses; calculating and appending the 4-byte CRC-32 Frame Check Sequence.</li>
        <li><strong>Frame Decapsulation:</strong> Parsing incoming bit streams, verifying SFD framing boundaries, computing the CRC-32 checksum to validate frame integrity, and stripping headers before passing payloads to the LLC sublayer.</li>
        <li><strong>Medium Access Scheduling:</strong> Implementing CSMA/CD in half-duplex networks or immediate transmission queuing in full-duplex switched connections.</li>
        <li><strong>Interpacket Gap (IPG) Enforcement:</strong> Mandating an idle spacing of 96 bit times between successive transmissions to allow transceiver recovery.</li>
      </ul>
    `,
    eli10: "In simple words: The MAC protocol is the factory worker inside your network card. It wraps up the packets from Windows or Linux, stamps the MAC address, waits a split second between frames so the wire doesn't overheat, and listens for collisions.",
    analogy: "Think of an air traffic controller sequencing airplanes on a runway. Even after an airplane takes off, the controller enforces a mandatory 2-minute safety spacing (Interpacket Gap) before the next plane can accelerate down the runway.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">The Interpacket Gap (IPG / Interframe Spacing)</h3>
      <p class="text-xs text-gray-600 dark:text-gray-400 mb-2">
        To allow receiving stations time to process an arriving frame, reset their internal receiver state machines, and allow the medium to stabilize, IEEE 802.3 requires an idle transmission silence called the <strong>Interpacket Gap (IPG)</strong>:
      </p>

      <div class="p-3 my-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-lg text-xs font-mono text-center">
        $$\\text{IPG} = 96 \\text{ bit times}$$
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-2.5 my-3 text-xs text-center font-mono">
        <div class="p-2.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <span class="text-slate-500 block text-[10px]">Standard 10 Mbps Ethernet</span>
          <span class="text-xs font-bold text-blue-600 dark:text-blue-400">9.6 &mu;s</span>
          <span class="text-[9px] text-slate-400 block mt-0.5">(96 / 10,000,000 s)</span>
        </div>
        <div class="p-2.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <span class="text-slate-500 block text-[10px]">Fast 100 Mbps Ethernet</span>
          <span class="text-xs font-bold text-emerald-600 dark:text-emerald-400">0.96 &mu;s (960 ns)</span>
          <span class="text-[9px] text-slate-400 block mt-0.5">(96 / 100,000,000 s)</span>
        </div>
        <div class="p-2.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <span class="text-slate-500 block text-[10px]">Gigabit 1000 Mbps Ethernet</span>
          <span class="text-xs font-bold text-purple-600 dark:text-purple-400">96 ns</span>
          <span class="text-[9px] text-slate-400 block mt-0.5">(96 / 1,000,000,000 s)</span>
        </div>
      </div>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">NIC Address Filtering &amp; Promiscuous Mode</h3>
      <p class="text-xs text-gray-600 dark:text-gray-400 mb-2">When a frame travels down a shared Ethernet cable, every station's NIC receives the bits. The MAC protocol hardware inspects the Destination Address (DA):</p>
      <ul class="wiki-bullet-list text-xs">
        <li><strong>Match:</strong> If the DA matches the station's permanent hardware MAC address, the broadcast address, or a subscribed multicast address, the frame is accepted and passed up to the OS.</li>
        <li><strong>Mismatch:</strong> If the DA does not match, the NIC hardware instantly drops and discards the frame without interrupting the host CPU.</li>
        <li><strong>Promiscuous Mode:</strong> In packet-sniffing software (like Wireshark), the NIC is configured into promiscuous mode, bypassing this filter and copying <em>every</em> passing frame on the wire to the operating system.</li>
      </ul>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Transmission State Machine (Full-Duplex vs. Half-Duplex)</h3>
      <table class="wiki-table text-xs">
        <thead>
          <tr>
            <th>Protocol Step</th>
            <th>Half-Duplex (Legacy Shared)</th>
            <th>Full-Duplex (Modern Switched)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Carrier Sense</strong></td>
            <td>Required (wait for wire silence)</td>
            <td><strong>Not Required</strong> (transmits immediately)</td>
          </tr>
          <tr>
            <td><strong>Collision Monitoring</strong></td>
            <td>Active transceiver voltage check</td>
            <td><strong>Disabled</strong> (collisions impossible)</td>
          </tr>
          <tr>
            <td><strong>Error Handling</strong></td>
            <td>CSMA/CD jamming signal &amp; backoff</td>
            <td>Physical link flow control (IEEE 802.3x Pause frames)</td>
          </tr>
          <tr>
            <td><strong>Effective Throughput</strong></td>
            <td>Shared capacity (fraction of wire speed)</td>
            <td><strong>200% Capacity</strong> (e.g. 1 Gbps Tx + 1 Gbps Rx = 2 Gbps)</td>
          </tr>
        </tbody>
      </table>
    `,
    workedExamples: {
      level1: "<strong>Question:</strong> What is the Interpacket Gap (IPG) in Ethernet, and what is its standard duration at 10 Mbps?<br><br><strong>Answer:</strong> The Interpacket Gap (IPG) is an idle silence period required between consecutive frame transmissions. Defined as 96 bit times, its duration at 10 Mbps is $96 / 10^7 = 9.6\\ \\mu\\text{s}$.",
      level2: "<strong>Analysis:</strong> Why does a Network Interface Card operating in standard mode discard frames whose destination MAC does not match its own?<br><br><strong>Answer:</strong> On a shared broadcast medium, all electrical signals reach all connected network cards. To save computer memory and CPU processing cycles, the NIC's onboard MAC chip performs hardware address filtering. Unless the destination address matches the card's unicast MAC, the broadcast address, or an approved multicast group, the frame is silently dropped at the hardware level.",
      level3: "<strong>Real-World Application:</strong> How does network troubleshooting software like Wireshark capture packets intended for other computers?<br><br><strong>Analysis:</strong> Network administrators place the NIC into <strong>promiscuous mode</strong>. This disables the hardware MAC filter, forcing the NIC to pass every received frame up the software stack to the operating system, allowing Wireshark to inspect all local link traffic."
    },
    advantagesLimitations: `
      <div class="p-3 my-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
        <h4 class="font-bold text-slate-800 dark:text-slate-200 mb-2">Protocol Strengths</h4>
        <ul class="space-y-1.5 text-slate-600 dark:text-slate-300 list-disc pl-4">
          <li><strong>Hardware-Level Simplicity:</strong> Enables high-speed framing logic to be implemented on inexpensive silicon ASICs.</li>
          <li><strong>Zero CPU Burden:</strong> Hardware address filtering shields the main CPU from processing irrelevant network traffic.</li>
        </ul>
      </div>
    `,
    whereUsed: [
      "Ethernet NIC controller firmware and hardware state machines.",
      "Wireshark network analyzers and intrusion detection sensors.",
      "Layer 2 switch ingress pipeline processing."
    ],
    quiz: [
      {
        question: "How long is the standard Interpacket Gap (IPG) in Ethernet bit times?",
        options: ["32 bit times", "64 bit times", "96 bit times", "512 bit times"],
        correct: 2,
        explanation: "The standard Ethernet Interpacket Gap is exactly 96 bit times (9.6 microseconds at 10 Mbps)."
      },
      {
        question: "What mode must a network interface card enter to capture all frames on a shared network segment regardless of destination MAC?",
        options: ["Broadcast mode", "Promiscuous mode", "Full-duplex mode", "Autonomous mode"],
        correct: 1,
        explanation: "Promiscuous mode disables the hardware MAC address filter, allowing the NIC to capture all passing frames."
      }
    ],
    references: [
      { cite: "IEEE 802.3 Standard for Ethernet, Section 4: Media Access Control.", url: "" },
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 13.", url: "" }
    ]
  }
};

// =============================================================================
// SUBTOPIC 6: u2-ethernet-csma-cd-operation - CSMA/CD Operation
// =============================================================================
data["u2-ethernet-csma-cd-operation"] = {
  id: "u2-ethernet-csma-cd-operation",
  title: "CSMA/CD Operation",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 6,
  subtopicNumber: 6,
  whyItMatters: "Carrier Sense Multiple Access with Collision Detection (CSMA/CD) is the legendary media access method of traditional shared Ethernet. Understanding its 8-step execution trace, 1-persistent sensing, and jamming signal broadcast is a cornerstone requirement of computer networks curricula.",
  prerequisitesList: [
    { concept: "Multiple Access Protocols", meaning: "Contention and carrier sensing principles" },
    { concept: "Ethernet Frame Format", meaning: "64-byte minimum frame size constraint" }
  ],
  learningObjectives: [
    "Define CSMA/CD and explain why it is required on shared half-duplex Ethernet.",
    "Trace the complete 8-step working principle of CSMA/CD from carrier sense to retransmission.",
    "Explain the role, length (32–48 bits), and necessity of the Jamming Signal.",
    "Analyze the decision logic of the CSMA/CD flowchart.",
    "Calculate the transmission time of a 64-byte frame at 10 Mbps (51.2 microseconds)."
  ],
  infobox: {
    layer: "Layer 2 (MAC Sublayer)",
    standard: "IEEE 802.3 Clause 4 / Forouzan Sections 13.1 & 13.2",
    type: "Contention-Based Access Protocol",
    prerequisites: ["ethernet", "u2-csma-cd"],
    relatedConcepts: ["u2-binary-exponential-backoff", "u2-ethernet-frame-format"],
    compareWith: ["u2-csma-ca", "wifi-mac-sublayer"],
    primaryUses: ["Traditional coaxial Ethernet (10Base5/10Base2), hub-based twisted-pair LANs"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/OSI_Model_v1.svg/600px-OSI_Model_v1.svg.png",
  imageCaption: "Figure: CSMA/CD Collision Detection, Jamming Signal, and Retransmission Sequence.",
  sections: {
    overview: `
      <p><strong>CSMA/CD</strong> stands for <strong>Carrier Sense Multiple Access with Collision Detection</strong>. It is the classic media access control method standardized in IEEE 802.3 for traditional, half-duplex shared Ethernet networks.</p>

      <div class="p-3 my-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-lg text-xs">
        <h4 class="font-bold text-blue-900 dark:text-blue-200 mb-1">The Three Pillars of CSMA/CD (PDF Section 6)</h4>
        <ul class="space-y-1 list-disc pl-4 text-blue-800 dark:text-blue-300">
          <li><strong>Carrier Sense (CS):</strong> Every station listens to the medium before attempting transmission (&ldquo;listen before talk&rdquo;).</li>
          <li><strong>Multiple Access (MA):</strong> Many computing stations share and compete for the exact same physical transmission channel.</li>
          <li><strong>Collision Detection (CD):</strong> Stations actively monitor the wire during transmission to detect signal interference (&ldquo;listen while transmitting&rdquo;).</li>
        </ul>
      </div>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">The 8-Step Working Principle of CSMA/CD (PDF Section 6.1)</h3>
      <ol class="wiki-ordered-list">
        <li><strong>Step 1 (Frame Preparation):</strong> A station receives network-layer data and constructs a valid Ethernet frame (minimum 64 bytes).</li>
        <li><strong>Step 2 (Carrier Sensing):</strong> The station listens to the channel. If busy, it continuously senses until clear (1-persistent CSMA). If idle, it proceeds.</li>
        <li><strong>Step 3 (Transmission):</strong> The station starts transmitting its frame onto the shared cable.</li>
        <li><strong>Step 4 (Collision Monitoring):</strong> While transmitting, the station simultaneously reads the cable voltage to monitor the channel.</li>
        <li><strong>Step 5 (Collision Detection):</strong> If two stations transmit within the propagation delay window, their signals collide, doubling the channel voltage ($V_{\\text{collision}} > 2 V_{\\text{tx}}$). The transceiver detects this voltage surge.</li>
        <li><strong>Step 6 (Jamming Signal):</strong> The station immediately aborts its frame transmission and broadcasts a <strong>32 to 48-bit jamming signal</strong> to ensure all stations detect the collision.</li>
        <li><strong>Step 7 (Backoff):</strong> The station increments its collision counter $K$ and calculates a random backoff waiting time using the <strong>Binary Exponential Backoff</strong> algorithm.</li>
        <li><strong>Step 8 (Retransmission):</strong> After the backoff timer expires, the station returns to Step 2 to retry transmission.</li>
      </ol>
    `,
    eli10: "In simple words: CSMA/CD is like an in-person meeting: 1) Listen to see if anyone is talking. 2) If quiet, start talking. 3) If someone starts talking at the exact same moment, shout 'COLLISION!' (Jamming signal), stop immediately, roll a dice to see how many seconds to wait, and try again later.",
    analogy: "Imagine two people walking into a narrow hallway from opposite ends in the dark. Before stepping in, they listen (Carrier Sense). If quiet, they begin walking while humming a tune (Transmission & Monitoring). If they bump into each other, they immediately shout 'Watch out!' (Jamming Signal), back up into their doorways, roll a dice to wait a few seconds (Exponential Backoff), and try walking through again.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">The Jamming Signal in Depth (PDF Section 7)</h3>
      <div class="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-lg text-xs text-amber-900 dark:text-amber-200 leading-relaxed mb-4">
        <h4 class="font-bold text-sm mb-1 text-amber-900 dark:text-amber-100 flex items-center gap-1.5">
          <i class="fa-solid fa-triangle-exclamation text-amber-600"></i> What is a Jamming Signal, and Why is it Necessary?
        </h4>
        <p>A <strong>jamming signal</strong> is a special high-energy bit pattern (typically <strong>32 to 48 bits</strong> of alternating 1s and 0s) broadcast by a transmitting station immediately upon detecting a collision.</p>
        <p class="mt-1"><strong>The Engineering Need:</strong> If Station A detects a collision after sending only a few bits and simply shuts off, distant stations along a long cable might not receive enough collided energy to recognize that a collision occurred. The distant station might interpret the truncated fragment as a complete transmission or normal line noise. By broadcasting 32–48 bits of garbage jamming signal, Station A guarantees that every transceiver on the entire cable experiences an unmistakable collision surge, forcing all stations to discard corrupted runt frames.</p>
      </div>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">CSMA/CD Operational Decision Flowchart (PDF Section 6.2)</h3>
      <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-700 dark:text-slate-300 space-y-1 text-center">
        <div>[ Frame Ready to Send ] &rarr; [ Sense Medium ]</div>
        <div>&darr;</div>
        <div>Medium Busy? &rarr; <strong>YES:</strong> Continue sensing continuously (1-persistent)</div>
        <div>&darr; <strong>NO (Medium Idle)</strong></div>
        <div>[ Transmit Frame Bits and Simultaneously Monitor Voltage ]</div>
        <div>&darr;</div>
        <div>Collision Detected? &rarr; <strong>NO:</strong> Finish transmission &rarr; SUCCESS!</div>
        <div class="text-red-500 font-bold">&darr; YES (Collision Occurred!)</div>
        <div class="text-red-600 dark:text-red-400 font-bold">[ Stop Frame Transmission Immediately ] &rarr; [ Broadcast 32-48 Bit Jamming Signal ]</div>
        <div>&darr;</div>
        <div>[ Increment Collision Counter K = K + 1 ]</div>
        <div>&darr;</div>
        <div>Is K &gt; 16? &rarr; <strong>YES:</strong> Abort transmission (Network Overload Error)</div>
        <div>&darr; <strong>NO</strong></div>
        <div>[ Select R from 0 to 2^min(K,10) - 1 ] &rarr; [ Wait Backoff Time T_B = R &times; 51.2 &mu;s ] &rarr; Return to Sense Medium</div>
      </div>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Slot Time and Frame Transmission Time Calculation</h3>
      <p class="text-xs text-gray-600 dark:text-gray-400 mb-2">
        In traditional 10 Mbps Ethernet, <strong>Slot Time</strong> is defined as the time required to transmit a minimum-sized 64-byte (512-bit) frame across the wire:
      </p>

      <div class="p-3 my-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg font-mono text-xs text-emerald-900 dark:text-emerald-200 text-center">
        $$T = \\frac{L}{R} = \\frac{512 \\text{ bits}}{10,000,000 \\text{ bps}} = 51.2 \\times 10^{-6} \\text{ s} = 51.2\\ \\mu\\text{s}$$
      </div>

      <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
        This $51.2\\ \\mu\\text{s}$ duration represents the maximum round-trip propagation time across a 2,500-meter coaxial Ethernet network with four repeaters, plus the time required for the transceiver to detect the collision and broadcast the jamming signal.
      </p>
    `,
    workedExamples: {
      level1: "<strong>Numerical 6 (Ethernet Transmission Time - PDF Section 14):</strong><br>Calculate the time required to transmit a 64-byte Ethernet frame at 10 Mbps. Ignore preamble and SFD.<br><br><strong>Solution:</strong><br>1. Frame size in bits $L = 64 \\times 8 = 512 \\text{ bits}$.<br>2. Data rate $R = 10,000,000 \\text{ bps}$.<br>$$T = \\frac{L}{R} = \\frac{512}{10,000,000} = 51.2\\ \\mu\\text{s}$$<br><strong>Answer:</strong> 51.2 microseconds.",
      level2: "<strong>Exam Question (PDF Section 15 Q12):</strong> What is the purpose of a jamming signal in CSMA/CD?<br><br><strong>Answer:</strong> A jamming signal (32 to 48 bits) is broadcast by a station immediately after detecting a collision to guarantee that the signal collision is noticeable to all other stations on the cable, preventing any station from falsely treating its corrupted fragment as a valid transmission.",
      level3: "<strong>Analysis Problem:</strong> Why does CSMA/CD become impractical when scaling shared networks to Gigabit speeds and long distances?<br><br><strong>Analysis:</strong> At 1 Gbps, transmitting 512 bits takes only $0.512\\ \\mu\\text{s}$. If the cable is longer than 50 meters, a frame finishes transmitting before a collision echo can return, violating the CSMA/CD detection rule ($T_{\\text{frame}} \\ge 2 T_p$). To solve this in shared Gigabit Ethernet, IEEE 802.3 had to introduce <em>Carrier Extension</em> (padding slot time to 4096 bits), which wasted massive bandwidth. Consequently, the industry abandoned shared Gigabit Ethernet in favor of full-duplex switches where collisions are impossible."
    },
    advantagesLimitations: `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-xs">
        <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg">
          <h4 class="font-bold text-emerald-900 dark:text-emerald-200 mb-2">CSMA/CD Strengths</h4>
          <ul class="space-y-1.5 list-disc pl-4 text-slate-700 dark:text-slate-300">
            <li><strong>Immediate Transmission Under Low Load:</strong> Zero latency when the channel is idle.</li>
            <li><strong>Rapid Collision Termination:</strong> Transmission aborts immediately, saving bandwidth compared to ALOHA.</li>
          </ul>
        </div>
        <div class="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
          <h4 class="font-bold text-red-900 dark:text-red-200 mb-2">CSMA/CD Limitations</h4>
          <ul class="space-y-1.5 list-disc pl-4 text-slate-700 dark:text-slate-300">
            <li><strong>Distance Bound:</strong> Cable distance is strictly limited by the 64-byte frame transmission time.</li>
            <li><strong>Throughput Collapse Under High Load:</strong> Repeated collisions degrade channel efficiency.</li>
          </ul>
        </div>
      </div>
    `,
    whereUsed: [
      "Traditional shared Ethernet hubs and coaxial cable LANs.",
      "Industrial legacy half-duplex Ethernet testbeds."
    ],
    quiz: [
      {
        question: "Which signal is broadcast immediately after an Ethernet station detects a collision?",
        options: ["ACK signal", "Jamming signal", "RTS signal", "CTS signal"],
        correct: 1,
        explanation: "The station broadcasts a 32-48 bit jamming signal to ensure all stations detect the collision and discard partial frames."
      },
      {
        question: "What is the slot time for traditional 10 Mbps Ethernet?",
        options: ["5.12 microseconds", "51.2 microseconds", "512 microseconds", "1 millisecond"],
        correct: 1,
        explanation: "The slot time is the time required to transmit 512 bits at 10 Mbps, which is exactly 51.2 microseconds."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 13 (Section 13.2).", url: "" },
      { cite: "IEEE 802.3 Standard, Clause 4: Carrier sense multiple access with collision detection (CSMA/CD).", url: "" }
    ]
  }
};

// =============================================================================
// SUBTOPIC 7: u2-binary-exponential-backoff - Binary Exponential Backoff Algorithm
// =============================================================================
data["u2-binary-exponential-backoff"] = {
  id: "u2-binary-exponential-backoff",
  title: "Binary Exponential Backoff Algorithm",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 6,
  subtopicNumber: 7,
  whyItMatters: "Binary Exponential Backoff is the dynamic stabilization algorithm of CSMA/CD networks. By exponentially doubling the contention window after each consecutive collision, it dynamically adapts to network congestion, resolving multi-station transmission deadlocks.",
  prerequisitesList: [
    { concept: "CSMA/CD Operation", meaning: "Carrier sense, collision detection, and jamming sequence" },
    { concept: "Slot Time", meaning: "51.2 microsecond unit of backoff delay in 10 Mbps Ethernet" }
  ],
  learningObjectives: [
    "Define the Binary Exponential Backoff algorithm and state its engineering purpose.",
    "State and apply the random number selection formula 0 <= R <= 2^K - 1.",
    "Calculate the backoff waiting delay using T_B = R * T_slot.",
    "Construct the complete backoff table for collision attempts K = 1 through K = 10.",
    "Distinguish between the range limit (K = 10) and the maximum attempt abort limit (K = 16).",
    "Solve numerical problems calculating exact backoff delays."
  ],
  infobox: {
    layer: "Layer 2 (MAC Sublayer)",
    standard: "IEEE 802.3 Clause 4.2.3.2.5 / Forouzan Section 13.2",
    type: "Collision Resolution Algorithm",
    prerequisites: ["u2-ethernet-csma-cd-operation", "u2-csma-cd"],
    relatedConcepts: ["u2-ethernet-frame-format", "u2-ethernet-types-evolution"],
    compareWith: ["u2-csma-1-persistent"],
    primaryUses: ["Ethernet NIC MAC controllers, CSMA/CD contention resolution, distributed systems backoff"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/OSI_Model_v1.svg/600px-OSI_Model_v1.svg.png",
  imageCaption: "Figure: Binary Exponential Backoff Algorithm Execution Table & Delay Calculation.",
  sections: {
    overview: `
      <p>The <strong>Binary Exponential Backoff algorithm</strong> is a mathematical contention resolution method used by traditional Ethernet to determine how long a station must wait after a collision before attempting retransmission.</p>

      <p>If all colliding stations attempted to retransmit immediately or waited a fixed period, they would collide again indefinitely. By having each station choose a random waiting period from a dynamically expanding range, the probability of repeated collisions drops exponentially.</p>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Working Principle (PDF Section 8)</h3>
      <ol class="wiki-ordered-list">
        <li>A station detects a collision during frame transmission.</li>
        <li>It increments its collision attempt counter: $K = K + 1$.</li>
        <li>It selects a random integer $R$ uniformly distributed in the range:
          <div class="p-2 my-1 bg-slate-50 dark:bg-slate-800 rounded font-mono text-center text-xs font-bold text-blue-600 dark:text-blue-400">
            $$0 \\le R \\le 2^K - 1$$
          </div>
        </li>
        <li>It calculates its backoff waiting delay: $T_B = R \\times T_{\\text{slot}}$.</li>
        <li>It waits for $T_B$ seconds and then senses the channel again to retry transmission.</li>
      </ol>
    `,
    eli10: "In simple words: If two people bump into each other, on the first try they flip a coin to wait 0 or 1 second. If they bump again, they pick between 0, 1, 2, or 3 seconds. The more times they bump, the bigger the number range gets, so they quickly stop bumping into each other!",
    analogy: "Imagine an automated telephone customer support queue. If two callers dial in at the same second and get a busy tone, the system tells caller A to try back in 1 minute and caller B in 2 minutes. If a hundred callers dial in simultaneously, the system expands the callback window to 30 minutes to spread out the traffic.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Backoff Formulas and Slot Time (PDF Sections 8 &amp; 9)</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-xs">
        <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-blue-600 dark:text-blue-400 block mb-1">1. Random Range Formula:</span>
          <div class="font-mono text-slate-700 dark:text-slate-300 space-y-1">
            $$0 \\le R \\le 2^K - 1$$
            <p class="text-[10px] text-slate-500 font-sans mt-1">
              Where $K$ is the number of collision attempts. For range calculation, $K$ is capped at a maximum of 10.
            </p>
          </div>
        </div>

        <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">2. Backoff Time Formula:</span>
          <div class="font-mono text-slate-700 dark:text-slate-300 space-y-1">
            $$T_B = R \\times T_{\\text{slot}}$$
            <p class="text-[10px] text-slate-500 font-sans mt-1">
              Where $T_{\\text{slot}} = 51.2\\ \\mu\\text{s}$ (time required to transmit 512 bits at 10 Mbps).
            </p>
          </div>
        </div>
      </div>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Comprehensive Step-by-Step Collision Trace (PDF Section 8)</h3>
      <ul class="wiki-bullet-list text-xs space-y-1">
        <li><strong>After 1st Collision ($K = 1$):</strong> $0 \\le R \\le 2^1 - 1 \\implies R \\in \\{0, 1\\}$. (2 choices; wait 0 or $51.2\\ \\mu\\text{s}$).</li>
        <li><strong>After 2nd Collision ($K = 2$):</strong> $0 \\le R \\le 2^2 - 1 \\implies R \\in \\{0, 1, 2, 3\\}$. (4 choices; wait up to $153.6\\ \\mu\\text{s}$).</li>
        <li><strong>After 3rd Collision ($K = 3$):</strong> $0 \\le R \\le 2^3 - 1 \\implies R \\in \\{0, 1, 2, 3, 4, 5, 6, 7\\}$. (8 choices; wait up to $358.4\\ \\mu\\text{s}$).</li>
        <li><strong>After 4th Collision ($K = 4$):</strong> $0 \\le R \\le 2^4 - 1 \\implies R \\in \\{0, 1, \\dots, 15\\}$. (16 choices).</li>
        <li><strong>After 5th Collision ($K = 5$):</strong> $0 \\le R \\le 2^5 - 1 \\implies R \\in \\{0, 1, \\dots, 31\\}$. (32 choices).</li>
        <li><strong>After 6th Collision ($K = 6$):</strong> $0 \\le R \\le 2^6 - 1 \\implies R \\in \\{0, 1, \\dots, 63\\}$. (64 choices).</li>
      </ul>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Master Binary Exponential Backoff Table (PDF Section 8 &amp; 9)</h3>
      <table class="wiki-table text-xs">
        <thead>
          <tr>
            <th>Collision Attempt $K$</th>
            <th>Formula Range</th>
            <th>Possible Values of $R$</th>
            <th>Number of Choices</th>
            <th>Maximum Backoff Delay (at 10 Mbps)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>$K = 1$</td><td>$0 \\le R \\le 2^1 - 1$</td><td class="font-mono">0, 1</td><td>2</td><td>$1 \\times 51.2 = 51.2\\ \\mu\\text{s}$</td></tr>
          <tr><td>$K = 2$</td><td>$0 \\le R \\le 2^2 - 1$</td><td class="font-mono">0, 1, 2, 3</td><td>4</td><td>$3 \\times 51.2 = 153.6\\ \\mu\\text{s}$</td></tr>
          <tr><td>$K = 3$</td><td>$0 \\le R \\le 2^3 - 1$</td><td class="font-mono">0, 1, ..., 7</td><td>8</td><td>$7 \\times 51.2 = 358.4\\ \\mu\\text{s}$</td></tr>
          <tr><td>$K = 4$</td><td>$0 \\le R \\le 2^4 - 1$</td><td class="font-mono">0, 1, ..., 15</td><td>16</td><td>$15 \\times 51.2 = 768.0\\ \\mu\\text{s}$</td></tr>
          <tr><td>$K = 5$</td><td>$0 \\le R \\le 2^5 - 1$</td><td class="font-mono">0, 1, ..., 31</td><td>32</td><td>$31 \\times 51.2 = 1.587\\ \\text{ms}$</td></tr>
          <tr><td>$K = 6$</td><td>$0 \\le R \\le 2^6 - 1$</td><td class="font-mono">0, 1, ..., 63</td><td>64</td><td>$63 \\times 51.2 = 3.226\\ \\text{ms}$</td></tr>
          <tr class="bg-amber-50 dark:bg-amber-950/40 font-bold"><td>$K = 10$ (Max Range)</td><td>$0 \\le R \\le 2^{10} - 1$</td><td class="font-mono">0, 1, ..., 1023</td><td>1024</td><td>$1023 \\times 51.2 = 52.38\\ \\text{ms}$</td></tr>
        </tbody>
      </table>

      <div class="p-3 my-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-lg text-xs text-red-900 dark:text-red-200">
        <strong>Important Exam Distinction (Forouzan Note):</strong> Do not confuse the <strong>random-number range limit ($K = 10$)</strong> with the <strong>maximum retransmission attempts limit ($K = 16$)</strong>!
        <ul class="list-disc pl-4 mt-1 space-y-0.5">
          <li>For collisions between 11 and 16, the random number range remains frozen at $0 \\le R \\le 1023$ (it does not expand further).</li>
          <li>If a frame experiences more than 16 consecutive collisions ($K > 16$), the station gives up completely and reports a transmission failure to the upper layer.</li>
        </ul>
      </div>
    `,
    workedExamples: {
      level1: "<strong>Solved Numerical (PDF Section 8):</strong><br>A traditional 10 Mbps Ethernet station selects $R = 5$. Calculate the backoff time.<br><br><strong>Given:</strong> $T_{\\text{slot}} = 51.2\\ \\mu\\text{s}$, $R = 5$.<br>$$T_B = R \\times T_{\\text{slot}} = 5 \\times 51.2 = 256\\ \\mu\\text{s}$$<br><strong>Answer:</strong> 256 microseconds.",
      level2: "<strong>Numerical 4 (Backoff Time - PDF Section 14):</strong><br>A station selects a random number $R = 3$. Calculate the waiting time for traditional 10 Mbps Ethernet.<br><br><strong>Solution:</strong><br>$$T_B = R \\times T_{\\text{slot}} = 3 \\times 51.2 = 153.6\\ \\mu\\text{s}$$<br><strong>Answer:</strong> 153.6 microseconds.",
      level3: "<strong>Exam Problem:</strong> After 4 consecutive collisions, what is the maximum backoff time an Ethernet station can wait at 10 Mbps?<br><br><strong>Solution:</strong><br>1. For $K = 4$, $R_{\\text{max}} = 2^4 - 1 = 15$.<br>2. Maximum delay $T_B = 15 \\times 51.2\\ \\mu\\text{s} = 768.0\\ \\mu\\text{s}$.<br><strong>Answer:</strong> 768.0 microseconds (0.768 ms)."
    },
    advantagesLimitations: `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-xs">
        <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg">
          <h4 class="font-bold text-emerald-900 dark:text-emerald-200 mb-2">Advantages of Exponential Backoff</h4>
          <ul class="space-y-1.5 list-disc pl-4 text-slate-700 dark:text-slate-300">
            <li><strong>Self-Regulating Stability:</strong> Automatically expands delay window during congestion spikes.</li>
            <li><strong>Low Latency on Light Traffic:</strong> First collision waits only 0 or 1 slot time ($51.2\\ \\mu\\text{s}$).</li>
            <li><strong>Fully Distributed:</strong> No centralized coordinator required to arbitrate retransmissions.</li>
          </ul>
        </div>
        <div class="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
          <h4 class="font-bold text-red-900 dark:text-red-200 mb-2">Limitations &amp; The Capture Effect</h4>
          <ul class="space-y-1.5 list-disc pl-4 text-slate-700 dark:text-slate-300">
            <li><strong>Ethernet Capture Effect:</strong> A station that recently succeeded has $K=0$ and easily dominates a station with $K>0$.</li>
            <li><strong>Non-Deterministic Delay:</strong> Cannot guarantee bounded latency for hard real-time systems.</li>
          </ul>
        </div>
      </div>
    `,
    whereUsed: [
      "IEEE 802.3 CSMA/CD network interface controller silicon ASICs.",
      "Distributed software retry mechanisms with exponential jitter.",
      "Wireless CSMA/CA Contention Window expansion algorithms."
    ],
    quiz: [
      {
        question: "What does the Binary Exponential Backoff algorithm determine?",
        options: [
          "The maximum frame length",
          "The waiting time before retransmitting after a collision",
          "The IP subnet mask",
          "The CRC error polynomial"
        ],
        correct: 1,
        explanation: "Binary Exponential Backoff calculates the random waiting delay (T_B = R * T_slot) before attempting retransmission."
      },
      {
        question: "What is the maximum value of K used in the random number range formula 0 <= R <= 2^K - 1?",
        options: ["K = 6", "K = 8", "K = 10", "K = 16"],
        correct: 2,
        explanation: "The exponent K is capped at 10 for the range formula (giving 1024 choices); 16 is the maximum attempt limit before aborting."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 13 (Section 13.2).", url: "" },
      { cite: "IEEE 802.3 Standard, Clause 4.2.3.2.5: Truncated binary exponential backoff.", url: "" }
    ]
  }
};

console.log("Successfully prepared Subtopics 5, 6, and 7 for Topic 6!");

// =============================================================================
// SUBTOPIC 8: u2-ethernet-types-evolution - Ethernet Types and Evolution
// =============================================================================
data["u2-ethernet-types-evolution"] = {
  id: "u2-ethernet-types-evolution",
  title: "Ethernet Types and Evolution",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 6,
  subtopicNumber: 8,
  whyItMatters: "From original 10 Mbps coaxial cable to 100 Mbps Fast Ethernet, 1 Gbps Gigabit Ethernet, and 10 Gbps optical backbones, Ethernet has evolved by a factor of 1000x while maintaining backward compatibility, universal 48-bit addressing, and identical frame formatting.",
  prerequisitesList: [
    { concept: "Standard Ethernet", meaning: "10 Mbps IEEE 802.3 base standard" },
    { concept: "Physical Media Types", meaning: "Coaxial, unshielded twisted-pair (UTP), and fiber optics" }
  ],
  learningObjectives: [
    "Trace the four major generations of Ethernet: Standard, Fast, Gigabit, and 10-Gigabit.",
    "Describe the 4 classic Standard Ethernet implementations: 10Base5, 10Base2, 10Base-T, 10Base-F.",
    "Explain Fast Ethernet (100Base-TX, 100Base-FX, 100Base-T4) and the role of Autonegotiation.",
    "Identify Gigabit Ethernet goals and media types (1000Base-SX, 1000Base-LX, 1000Base-T).",
    "Describe Ten-Gigabit Ethernet (10GBase-S, 10GBase-L, 10GBase-E) and its full-duplex requirement.",
    "Comprehensively compare Half-Duplex and Full-Duplex Ethernet modes."
  ],
  infobox: {
    layer: "Layer 2 (MAC) & Layer 1 (Physical)",
    standard: "IEEE 802.3u / 802.3z / 802.3ab / 802.3ae / Forouzan Sections 13.3–13.6",
    type: "Generational Evolution & Physical Implementations",
    prerequisites: ["ethernet", "u2-ethernet-architecture", "u2-ethernet-frame-format"],
    relatedConcepts: ["u2-ethernet-csma-cd-operation", "u2-ethernet-advantages-limitations"],
    compareWith: ["u2-comparison-multiple-access"],
    primaryUses: ["Data center backbones, enterprise campus switches, FTTH broadband, Cat6 cabling"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/OSI_Model_v1.svg/600px-OSI_Model_v1.svg.png",
  imageCaption: "Figure: Technological Evolution of Ethernet Across Four Decades (Forouzan Chapter 13).",
  sections: {
    overview: `
      <p>Since its inception, Ethernet has evolved through four primary generations (detailed in <em>Forouzan Chapter 13, Sections 13.2 through 13.6</em>): <strong>Standard Ethernet (10 Mbps)</strong>, <strong>Fast Ethernet (100 Mbps)</strong>, <strong>Gigabit Ethernet (1 Gbps)</strong>, and <strong>Ten-Gigabit Ethernet (10 Gbps)</strong>.</p>

      <div class="overflow-x-auto my-3">
        <table class="wiki-table text-xs">
          <thead>
            <tr>
              <th>Generation</th>
              <th>Data Rate</th>
              <th>Standard</th>
              <th>Primary Physical Media</th>
              <th>Duplex &amp; Access Mode</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="font-bold">Standard Ethernet</td>
              <td class="font-mono text-center">10 Mbps</td>
              <td>IEEE 802.3</td>
              <td>Thick/Thin Coax, Cat3/5 UTP, Fiber</td>
              <td>Half-Duplex (CSMA/CD) / Full-Duplex</td>
            </tr>
            <tr>
              <td class="font-bold text-emerald-600 dark:text-emerald-400">Fast Ethernet</td>
              <td class="font-mono text-center">100 Mbps</td>
              <td>IEEE 802.3u</td>
              <td>Cat5 UTP (2 pairs), Multimode Fiber</td>
              <td>Half / Full-Duplex (Autonegotiation)</td>
            </tr>
            <tr>
              <td class="font-bold text-purple-600 dark:text-purple-400">Gigabit Ethernet</td>
              <td class="font-mono text-center">1 Gbps (1000 Mbps)</td>
              <td>IEEE 802.3z / 802.3ab</td>
              <td>Cat5e/6 UTP (4 pairs), Fiber Optics</td>
              <td>Predominantly Full-Duplex Switched</td>
            </tr>
            <tr>
              <td class="font-bold text-amber-600 dark:text-amber-400">Ten-Gigabit Ethernet</td>
              <td class="font-mono text-center">10 Gbps</td>
              <td>IEEE 802.3ae</td>
              <td>Single-mode &amp; Multimode Optical Fiber</td>
              <td><strong>Full-Duplex Only (No CSMA/CD)</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">10.1 Standard Ethernet Implementations (10 Mbps - PDF Section 10.1)</h3>
      <table class="wiki-table text-xs">
        <thead>
          <tr>
            <th>Notation</th>
            <th>Cabling Medium</th>
            <th>Max Segment Length</th>
            <th>Topology &amp; Connector</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="font-mono font-bold">10Base5</td>
            <td>Thick Coaxial Cable (10 mm)</td>
            <td>500 meters</td>
            <td>Bus topology; vampire taps &amp; drop cables; &ldquo;Thicknet&rdquo;</td>
          </tr>
          <tr>
            <td class="font-mono font-bold">10Base2</td>
            <td>Thin Coaxial Cable (RG-58, 5 mm)</td>
            <td>185 meters</td>
            <td>Bus topology; BNC T-connectors &amp; 50 &Omega; terminators; &ldquo;Thinnet&rdquo;</td>
          </tr>
          <tr>
            <td class="font-mono font-bold text-blue-600 dark:text-blue-400">10Base-T</td>
            <td>Category 3/5 Unshielded Twisted-Pair (UTP)</td>
            <td>100 meters</td>
            <td>Star topology; RJ-45 modular connectors; central hub/switch</td>
          </tr>
          <tr>
            <td class="font-mono font-bold">10Base-F</td>
            <td>Optical Fiber (pair of fibers)</td>
            <td>2,000 meters (2 km)</td>
            <td>Point-to-point fiber link; immune to EMI noise</td>
          </tr>
        </tbody>
      </table>
    `,
    eli10: "In simple words: Ethernet started 40 years ago as thick yellow coaxial cables running at 10 Mbps. Over time, engineers made it 10 times faster (100 Mbps Fast Ethernet), 100 times faster (1 Gbps Gigabit), and 1,000 times faster (10 Gbps fiber) while keeping the same frame envelopes!",
    analogy: "Think of an interstate highway system. Standard Ethernet was a two-lane country road with a 10 mph speed limit. Fast Ethernet widened it to 100 mph. Gigabit Ethernet upgraded it to a 1,000 mph bullet train track, and 10-Gigabit made it a supersonic vacuum tube. Even though the speed increased a thousandfold, the shipping containers (Ethernet frames) remained the exact same size.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">10.2 Fast Ethernet (100 Mbps, IEEE 802.3u - PDF Section 10.2)</h3>
      <p class="text-xs text-gray-600 dark:text-gray-400 mb-2">Standardized in 1995, Fast Ethernet accelerated LAN speed by 10x while maintaining identical frame format and 48-bit MAC addressing:</p>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-2.5 my-3 text-xs">
        <div class="p-2.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-slate-800 dark:text-slate-200 block">100Base-TX</span>
          <p class="text-slate-500 text-[10px] mt-0.5">Category 5 UTP or STP; uses 2 wire pairs (one Tx, one Rx); 100m distance limit. Dominant office desktop standard.</p>
        </div>
        <div class="p-2.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-slate-800 dark:text-slate-200 block">100Base-FX</span>
          <p class="text-slate-500 text-[10px] mt-0.5">Two optical fibers (one Tx, one Rx); 2,000m length in full-duplex mode. High-noise industrial backbone standard.</p>
        </div>
        <div class="p-2.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-slate-800 dark:text-slate-200 block">100Base-T4</span>
          <p class="text-slate-500 text-[10px] mt-0.5">Legacy Category 4/3 UTP; required all 4 wire pairs using 8B6T block encoding to achieve 100 Mbps over voice-grade wire.</p>
        </div>
      </div>

      <div class="p-3 my-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs text-emerald-900 dark:text-emerald-200">
        <strong>Autonegotiation (IEEE 802.3u):</strong> A landmark feature introduced with Fast Ethernet that allows two connected devices to exchange Fast Link Pulses (FLP) to automatically negotiate the highest mutually supported speed (10 Mbps vs 100 Mbps) and duplex mode (Half vs Full Duplex).
      </div>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">10.3 Gigabit Ethernet (1000 Mbps = 1 Gbps - PDF Section 10.3)</h3>
      <p class="text-xs text-gray-600 dark:text-gray-400 mb-2">Main goals: 1 Gbps line rate, strict backward compatibility, 48-bit MAC addresses, same 64–1518 byte frame format, and autonegotiation:</p>
      <ul class="wiki-bullet-list text-xs space-y-1">
        <li><strong>1000Base-SX:</strong> Short-wavelength optical fiber (850 nm laser/LED) over multimode fiber; spans up to 550 meters.</li>
        <li><strong>1000Base-LX:</strong> Long-wavelength optical fiber (1310 nm laser) over single-mode (up to 5 km) or multimode (up to 550 m) fiber.</li>
        <li><strong>1000Base-T:</strong> Category 5e/6 UTP; uses all 4 wire pairs simultaneously in full-duplex using 4D-PAM5 encoding; 100m reach.</li>
      </ul>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">10.4 Ten-Gigabit Ethernet (10 Gbps, IEEE 802.3ae - PDF Section 10.4)</h3>
      <p class="text-xs text-gray-600 dark:text-gray-400 mb-2">Operates at 10 Gbps exclusively over fiber-optic media in <strong>full-duplex switched mode</strong>:</p>
      <ul class="wiki-bullet-list text-xs space-y-1">
        <li><strong>10GBase-S:</strong> Short-wavelength (850 nm) for multimode fiber connections up to 300 meters.</li>
        <li><strong>10GBase-L:</strong> Long-wavelength (1310 nm) for single-mode fiber campus runs up to 10 kilometers.</li>
        <li><strong>10GBase-E:</strong> Extra-long wavelength (1550 nm) for single-mode metropolitan WAN links up to 40 kilometers.</li>
      </ul>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Half-Duplex vs. Full-Duplex Ethernet (PDF Section 11)</h3>
      <p class="text-xs text-gray-600 dark:text-gray-400 mb-3">Comparing operational characteristics between half-duplex shared and full-duplex switched Ethernet:</p>

      <table class="wiki-table text-xs">
        <thead>
          <tr>
            <th>Feature</th>
            <th>Half-Duplex Ethernet</th>
            <th>Full-Duplex Ethernet</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Transmission Direction</strong></td>
            <td>One direction at a time (Transmit OR Receive)</td>
            <td><strong>Both directions simultaneously</strong> (Transmit AND Receive)</td>
          </tr>
          <tr>
            <td><strong>Physical Media Infrastructure</strong></td>
            <td>Shared medium (coax bus or repeater hub)</td>
            <td>Dedicated point-to-point switched link (2 separate wire pairs/fibers)</td>
          </tr>
          <tr>
            <td><strong>Collision Domains</strong></td>
            <td>Shared collision domain across all connected nodes</td>
            <td><strong>Micro-segmented:</strong> Each link is its own private collision domain</td>
          </tr>
          <tr>
            <td><strong>Collision Possibility</strong></td>
            <td>Collisions can occur frequently under load</td>
            <td><strong>Collisions do NOT occur during normal operation</strong></td>
          </tr>
          <tr>
            <td><strong>Access Protocol Used</strong></td>
            <td><strong>CSMA/CD is mandatory</strong></td>
            <td><strong>CSMA/CD is NOT used</strong> (disabled in hardware)</td>
          </tr>
          <tr>
            <td><strong>Effective Channel Capacity</strong></td>
            <td>Lower effective capacity due to collision waste</td>
            <td><strong>Higher effective capacity</strong> (Double wire bandwidth: 200 Mbps for Fast, 2 Gbps for Gig)</td>
          </tr>
        </tbody>
      </table>

      <div class="p-3 my-3 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 rounded-lg text-xs text-purple-900 dark:text-purple-200">
        <strong>Important Exam Point (PDF Section 11):</strong> Modern switched full-duplex Ethernet does not use CSMA/CD. CSMA/CD is historically important for understanding legacy shared Ethernet, but modern switches have rendered collisions completely obsolete.
      </div>
    `,
    workedExamples: {
      level1: "<strong>Question (PDF Section 15 Q7):</strong> Differentiate between half-duplex and full-duplex Ethernet.<br><br><strong>Answer:</strong> In half-duplex Ethernet, devices share a medium and can only transmit or receive at any one instant; collisions can occur, so CSMA/CD is required. In full-duplex Ethernet, devices connect via dedicated switched links with separate transmit and receive channels, allowing simultaneous bidirectional communication without collisions and without CSMA/CD.",
      level2: "<strong>Analysis (Autonegotiation):</strong> How does an Ethernet switch port automatically handle a connected device that only supports 10 Mbps when the switch supports 1 Gbps?<br><br><strong>Analysis:</strong> The switch port uses <strong>Autonegotiation (IEEE 802.3u)</strong>. During physical link establishment, the switch and NIC exchange Fast Link Pulse (FLP) bursts advertising their speed capabilities. The hardware automatically selects the highest common operational denominator (10 Mbps, Full-Duplex in this case), ensuring seamless plug-and-play connectivity.",
      level3: "<strong>Design Question:</strong> Why was 10-Gigabit Ethernet (IEEE 802.3ae) standardized with full-duplex operation exclusively?<br><br><strong>Analysis:</strong> At 10 Gbps, the transmission time of a 64-byte frame is only $51.2\\ \\text{ns}$. At that speed, light in fiber travels only 10 meters before the frame finishes transmitting! A half-duplex CSMA/CD collision detection loop would have restricted cable lengths to under 5 meters, making the network useless. By requiring full-duplex switched connections exclusively, CSMA/CD was discarded, allowing optical fiber links to extend up to 40 kilometers."
    },
    advantagesLimitations: `
      <div class="p-3 my-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
        <h4 class="font-bold text-slate-800 dark:text-slate-200 mb-2">Evolutionary Architecture Advantages</h4>
        <ul class="space-y-1.5 text-slate-600 dark:text-slate-300 list-disc pl-4">
          <li><strong>Investment Protection:</strong> Organizations upgrade speeds incrementally (e.g. 100M &rarr; 1G &rarr; 10G) without rewiring the entire network at once.</li>
          <li><strong>Universal Tooling:</strong> Wireshark, SNMP, and Layer 2 monitoring tools work identically across all Ethernet generations.</li>
        </ul>
      </div>
    `,
    whereUsed: [
      "Cat5e/Cat6/Cat6A structured building copper cabling plants.",
      "Data center top-of-rack (ToR) and spine-leaf fiber interconnects.",
      "Internet Exchange Points (IXPs) using 10G/40G/100G optical links."
    ],
    quiz: [
      {
        question: "What is the maximum cable segment length for 10Base5 Thick Ethernet?",
        options: ["100 meters", "185 meters", "500 meters", "2000 meters"],
        correct: 2,
        explanation: "In 10Base5, '10' means 10 Mbps, 'Base' means baseband, and '5' stands for 500 meters maximum segment length."
      },
      {
        question: "What is the data rate of Fast Ethernet?",
        options: ["10 Mbps", "100 Mbps", "1 Gbps", "10 Gbps"],
        correct: 1,
        explanation: "Fast Ethernet (IEEE 802.3u) operates at exactly 100 Mbps."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 13 (Sections 13.3–13.6).", url: "" },
      { cite: "IEEE Standard 802.3u (Fast Ethernet) & IEEE Standard 802.3z/ab (Gigabit Ethernet).", url: "" }
    ]
  }
};

// =============================================================================
// SUBTOPIC 9: u2-ethernet-advantages-limitations - Advantages and Limitations
// =============================================================================
data["u2-ethernet-advantages-limitations"] = {
  id: "u2-ethernet-advantages-limitations",
  title: "Advantages and Limitations of Ethernet",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 6,
  subtopicNumber: 9,
  whyItMatters: "A balanced architectural synthesis of Ethernet's economic, operational, and performance trade-offs. Includes the complete 16-entry syllabus terminology glossary, numerical summaries, and core exam memory aids.",
  prerequisitesList: [
    { concept: "Standard Ethernet", meaning: "IEEE 802.3 frame structure and physical addressing" },
    { concept: "CSMA/CD and Switched Ethernet", meaning: "Half-duplex vs full-duplex operation" }
  ],
  learningObjectives: [
    "List and explain the 7 core advantages of Ethernet technology (PDF Section 12).",
    "List and explain the 5 core limitations/disadvantages of Ethernet technology.",
    "Master the complete 16-entry syllabus terminology glossary (PDF Section 13).",
    "Memorize key numerical reference values (48-bit MAC, 64-1518 byte frames, 51.2 microsecond slot time).",
    "Evaluate Ethernet deployment trade-offs in modern network design."
  ],
  infobox: {
    layer: "Layer 2 (MAC) & Layer 1 (Physical)",
    standard: "IEEE 802.3 Family / Forouzan Chapter 13 Summary",
    type: "Architectural Synthesis & Evaluation",
    prerequisites: ["ethernet", "u2-ethernet-architecture", "u2-ethernet-types-evolution"],
    relatedConcepts: ["u2-comparison-multiple-access", "u2-comparison-collision-free"],
    compareWith: ["wifi-mac-sublayer"],
    primaryUses: ["Network design evaluation, enterprise procurement, competitive technology analysis"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/OSI_Model_v1.svg/600px-OSI_Model_v1.svg.png",
  imageCaption: "Figure: Comprehensive Architectural Trade-Offs and Numerical Summary of Ethernet.",
  sections: {
    overview: `
      <p>This concluding subtopic synthesizes the operational advantages, physical limitations, technical terminology, and numerical constants of Ethernet from <strong>Sections 12, 13, and 17</strong> of the syllabus curriculum.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 text-xs">
        <!-- Advantages -->
        <div class="p-3.5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg">
          <h4 class="font-bold text-xs uppercase text-emerald-900 dark:text-emerald-200 mb-2 flex items-center gap-1.5">
            <i class="fa-solid fa-circle-check text-emerald-600"></i> Seven Key Advantages of Ethernet (PDF Section 12)
          </h4>
          <ol class="wiki-ordered-list space-y-1.5 text-slate-700 dark:text-slate-300">
            <li><strong>Widely Used in Wired LANs:</strong> Massive global deployment provides unmatched hardware compatibility and low component costs.</li>
            <li><strong>Supports High Data Rates:</strong> Continuous technological scaling from 10 Mbps up to 100 Gbps and 400 Gbps.</li>
            <li><strong>Standardized Frame Formats:</strong> Universal IEEE 802.3 framing ensures seamless backward compatibility across equipment generations.</li>
            <li><strong>Robust Physical Addressing:</strong> 48-bit globally unique MAC addresses guarantee plug-and-play link establishment.</li>
            <li><strong>Flexible Communication Modes:</strong> Native hardware support for Unicast (one-to-one), Multicast (one-to-many), and Broadcast (one-to-all).</li>
            <li><strong>Easy Expansion Using Switches:</strong> Star-wired twisted-pair networks scale effortlessly by interconnecting modular Layer 2 switches.</li>
            <li><strong>Reliable Error Detection:</strong> Hardware CRC-32 Frame Check Sequence detects corrupted frames with near 100% mathematical certainty.</li>
          </ol>
        </div>

        <!-- Disadvantages -->
        <div class="p-3.5 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
          <h4 class="font-bold text-xs uppercase text-red-900 dark:text-red-200 mb-2 flex items-center gap-1.5">
            <i class="fa-solid fa-triangle-exclamation text-red-600"></i> Five Disadvantages of Ethernet (PDF Section 12)
          </h4>
          <ol class="wiki-ordered-list space-y-1.5 text-slate-700 dark:text-slate-300">
            <li><strong>Traditional Shared Collisions:</strong> Legacy half-duplex Ethernet suffers from signal collisions and exponential backoff delays under heavy traffic.</li>
            <li><strong>Shared-Medium Degradation:</strong> Performance and available per-station bandwidth decrease rapidly as more nodes contend on a shared hub.</li>
            <li><strong>Distance &amp; Length Limitations:</strong> Standard copper twisted-pair cable runs (10Base-T through 1000Base-T) cannot exceed 100 meters.</li>
            <li><strong>Physical Media Fragmentation:</strong> Different operational speeds and environments require different cable grades (Cat5e vs Cat6A vs Fiber).</li>
            <li><strong>Detection Without Error Correction:</strong> CRC detects frame bit errors but drops damaged frames without retransmission (leaving recovery to TCP).</li>
          </ol>
        </div>
      </div>
    `,
    eli10: "In simple words: Ethernet is amazing because it is cheap, super fast, and works everywhere. But copper cables can only go 100 meters, and if a frame gets damaged, Ethernet just throws it away instead of fixing it.",
    analogy: "Think of an interstate highway versus a dirt road. Ethernet is a smooth, paved multi-lane superhighway with standard road signs (frames). It's fast, reliable, and expands easily. However, you still have to build on-ramps (switches), speed is limited by physical materials (cables), and if cargo falls off a truck, the highway patrol sweeps it off the road (drops the frame) &mdash; you have to send a replacement truck from the warehouse (TCP).",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Key Ethernet Values to Remember (PDF Section 17)</h3>
      <p class="text-xs text-gray-600 dark:text-gray-400 mb-3">Core numerical constants from Section 17 of the syllabus required for exam numericals:</p>

      <table class="wiki-table text-xs">
        <thead>
          <tr>
            <th>Specification Parameter</th>
            <th>Standard Value</th>
            <th>Mathematical Unit / Equivalent</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>MAC Address Bit Length</td><td class="font-mono font-bold text-blue-600">48 bits</td><td>6 bytes / 12 hex digits</td></tr>
          <tr><td>Preamble Field Size</td><td class="font-mono">7 bytes</td><td>56 bits (alternating 10101010...)</td></tr>
          <tr><td>Start Frame Delimiter (SFD)</td><td class="font-mono">1 byte</td><td>8 bits (pattern 10101011)</td></tr>
          <tr><td>Destination Address (DA) Size</td><td class="font-mono">6 bytes</td><td>48 bits physical address</td></tr>
          <tr><td>Source Address (SA) Size</td><td class="font-mono">6 bytes</td><td>48 bits physical address</td></tr>
          <tr><td>Length or Type Field Size</td><td class="font-mono">2 bytes</td><td>16 bits (EtherType or Byte Count)</td></tr>
          <tr><td>Minimum Data Payload</td><td class="font-mono font-bold text-emerald-600">46 bytes</td><td>$64 - 18 = 46$ bytes (padded if smaller)</td></tr>
          <tr><td>Maximum Data Payload (MTU)</td><td class="font-mono font-bold text-emerald-600">1500 bytes</td><td>Standard IP Maximum Transmission Unit</td></tr>
          <tr><td>CRC Frame Check Sequence</td><td class="font-mono">4 bytes</td><td>32 bits (CRC-32 polynomial)</td></tr>
          <tr><td>Minimum Frame Length</td><td class="font-mono font-bold text-purple-600">64 bytes</td><td>512 bits (excluding Preamble &amp; SFD)</td></tr>
          <tr><td>Maximum Frame Length</td><td class="font-mono font-bold text-purple-600">1518 bytes</td><td>12,144 bits (excluding Preamble &amp; SFD)</td></tr>
          <tr><td>Slot Time (at 10 Mbps)</td><td class="font-mono font-bold text-amber-600">51.2 &mu;s</td><td>Time to transmit 512 bits at 10 Mbps</td></tr>
          <tr><td>Interpacket Gap (IPG)</td><td class="font-mono">96 bit times</td><td>9.6 &mu;s at 10 Mbps</td></tr>
        </tbody>
      </table>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Important Ethernet Terminology Glossary (PDF Section 13)</h3>
      <p class="text-xs text-gray-600 dark:text-gray-400 mb-3">All 16 official technical terminology definitions from Section 13 of the syllabus:</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
        <div class="p-2.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-slate-800 dark:text-slate-200 block">Ethernet:</span>
          <span class="text-slate-600 dark:text-slate-400">The predominant wired local area networking technology family.</span>
        </div>
        <div class="p-2.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-slate-800 dark:text-slate-200 block">IEEE 802.3:</span>
          <span class="text-slate-600 dark:text-slate-400">The international standards committee defining wired Ethernet networks.</span>
        </div>
        <div class="p-2.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-slate-800 dark:text-slate-200 block">MAC Address:</span>
          <span class="text-slate-600 dark:text-slate-400">A 48-bit unique hardware address burned into a network interface card.</span>
        </div>
        <div class="p-2.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-slate-800 dark:text-slate-200 block">NIC (Network Interface Card):</span>
          <span class="text-slate-600 dark:text-slate-400">The physical hardware adapter connecting a host to the network.</span>
        </div>
        <div class="p-2.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-slate-800 dark:text-slate-200 block">LLC (Logical Link Control):</span>
          <span class="text-slate-600 dark:text-slate-400">The upper sublayer of Layer 2 providing uniform service to the Network Layer.</span>
        </div>
        <div class="p-2.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-slate-800 dark:text-slate-200 block">MAC (Media Access Control):</span>
          <span class="text-slate-600 dark:text-slate-400">The lower sublayer handling addressing, framing, and channel arbitration.</span>
        </div>
        <div class="p-2.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-slate-800 dark:text-slate-200 block">Preamble:</span>
          <span class="text-slate-600 dark:text-slate-400">A 7-byte alternating bit pattern used to synchronize receiver clock timing.</span>
        </div>
        <div class="p-2.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-slate-800 dark:text-slate-200 block">SFD (Start Frame Delimiter):</span>
          <span class="text-slate-600 dark:text-slate-400">A 1-byte field (10101011) marking the immediate beginning of the MAC frame.</span>
        </div>
        <div class="p-2.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-slate-800 dark:text-slate-200 block">DA (Destination Address):</span>
          <span class="text-slate-600 dark:text-slate-400">The 6-byte MAC address of the destination device.</span>
        </div>
        <div class="p-2.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-slate-800 dark:text-slate-200 block">SA (Source Address):</span>
          <span class="text-slate-600 dark:text-slate-400">The 6-byte unicast MAC address of the sending station.</span>
        </div>
        <div class="p-2.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-slate-800 dark:text-slate-200 block">CRC (Cyclic Redundancy Check):</span>
          <span class="text-slate-600 dark:text-slate-400">A 4-byte polynomial checksum used for detecting bit transmission errors.</span>
        </div>
        <div class="p-2.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-slate-800 dark:text-slate-200 block">CSMA/CD:</span>
          <span class="text-slate-600 dark:text-slate-400">Carrier Sense Multiple Access with Collision Detection access method.</span>
        </div>
        <div class="p-2.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-slate-800 dark:text-slate-200 block">Jamming Signal:</span>
          <span class="text-slate-600 dark:text-slate-400">A 32 to 48 bit signal broadcast upon collision to alert all stations.</span>
        </div>
        <div class="p-2.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-slate-800 dark:text-slate-200 block">Slot Time:</span>
          <span class="text-slate-600 dark:text-slate-400">The time required to transmit 512 bits in traditional Ethernet (51.2 &mu;s).</span>
        </div>
        <div class="p-2.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-slate-800 dark:text-slate-200 block">Half-Duplex:</span>
          <span class="text-slate-600 dark:text-slate-400">Communication in one direction at a time over a shared medium.</span>
        </div>
        <div class="p-2.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-slate-800 dark:text-slate-200 block">Full-Duplex:</span>
          <span class="text-slate-600 dark:text-slate-400">Simultaneous two-way communication over dedicated switched links without collisions.</span>
        </div>
      </div>
    `,
    workedExamples: {
      level1: "<strong>Summary Problem:</strong> If an application sends a 20-byte UDP message, how many padding bytes are added, and what is the total size of the transmitted Ethernet frame on the wire (including Preamble/SFD)?<br><br><strong>Solution:</strong><br>1. Network payload = 20 bytes UDP data + 8 bytes UDP header + 20 bytes IP header = 48 bytes. (Wait, let's assume raw payload delivered to Data Link is 20 bytes).<br>2. Minimum data payload required = 46 bytes.<br>3. Padding bytes added = $46 - 20 = 26 \\text{ bytes}$.<br>4. Ethernet MAC frame length = $18 \\text{ bytes overhead} + 46 \\text{ bytes} = 64 \\text{ bytes}$.<br>5. With 7-byte Preamble and 1-byte SFD: Total on wire = $64 + 8 = 72 \\text{ bytes}$.<br><strong>Answer:</strong> 26 bytes of padding are added; total frame size on the wire is 72 bytes.",
      level2: "<strong>Exam Question (Long-Answer - PDF Section 15):</strong> Discuss the evolutionary milestones of Ethernet from 10 Mbps to 10 Gbps.<br><br><strong>Answer:</strong> Ethernet evolved through 4 primary generations: 1) Standard Ethernet (10 Mbps) using CSMA/CD over coax (10Base5/10Base2) and twisted-pair (10Base-T). 2) Fast Ethernet (100 Mbps, 802.3u) introducing 100Base-TX and Autonegotiation. 3) Gigabit Ethernet (1 Gbps, 802.3z/ab) using optical fibers (1000Base-SX/LX) and 4-pair UTP (1000Base-T), maintaining identical 48-bit MAC and 64-1518 byte frames. 4) Ten-Gigabit Ethernet (10 Gbps, 802.3ae) operating exclusively in full-duplex over optical fiber, eliminating CSMA/CD completely.",
      level3: "<strong>Design Question:</strong> Why do network architects replace unmanaged hubs with Layer 2 switches in enterprise offices?<br><br><strong>Analysis:</strong> A hub creates a single shared collision domain where all connected workstations contend for the same bandwidth using CSMA/CD half-duplex rules. An Ethernet switch breaks the network into dedicated, isolated micro-segments for every connected device. Operating in full-duplex mode, each workstation enjoys dedicated full wire bandwidth (e.g. 1 Gbps bidirectional) with zero collisions, dramatically increasing network throughput and eliminating security eavesdropping."
    },
    advantagesLimitations: `
      <div class="p-3 my-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
        <h4 class="font-bold text-slate-800 dark:text-slate-200 mb-1.5">Architectural Verdict</h4>
        <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
          Ethernet has triumphed over all competing LAN architectures (including Token Ring, FDDI, and ATM LAN Emulation) due to its open standardization, relentless cost reduction, continuous speed scaling, and seamless backward compatibility.
        </p>
      </div>
    `,
    whereUsed: [
      "Enterprise LAN architecture design and procurement specifications.",
      "Comprehensive syllabus review and competitive exam preparation.",
      "Network operations center (NOC) baseline performance monitoring."
    ],
    quiz: [
      {
        question: "What is the maximum standard Ethernet frame length described by Forouzan?",
        options: ["512 bytes", "1000 bytes", "1518 bytes", "2000 bytes"],
        correct: 2,
        explanation: "The maximum standard Ethernet frame length is exactly 1518 bytes (18 bytes of overhead + 1500 bytes of MTU payload)."
      },
      {
        question: "Which field in the Ethernet frame identifies the sender's MAC address?",
        options: ["Destination Address (DA)", "Source Address (SA)", "CRC", "Start Frame Delimiter (SFD)"],
        correct: 1,
        explanation: "The Source Address (SA) field carries the 6-byte physical MAC address of the transmitting network interface card."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 13: Wired LANs: Ethernet (Section 13.8 Summary).", url: "" },
      { cite: "Charles E. Spurgeon, Ethernet: The Definitive Guide, 2nd Edition, O'Reilly Media.", url: "" }
    ]
  }
};

console.log("Successfully prepared Subtopics 8 and 9 for Topic 6!");

// =============================================================================
// ENRICH TOPIC 11: REVISION AND ASSESSMENT WITH TOPIC 6 CONTENT
// =============================================================================

// 1. Add Numericals 17-22 to u2-numerical-problems
if (data["u2-numerical-problems"]) {
  const t6Numericals = `
    <!-- Numerical Problem 17: MAC Address Size -->
    <div class="p-4 mb-4 rounded-xl border border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-800 shadow-sm">
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
          Numerical Problem 17 &bull; Topic 6 (MAC Address Size)
        </span>
        <span class="text-xs text-slate-400 font-mono">PDF Section 14</span>
      </div>
      <p class="text-xs text-slate-800 dark:text-slate-200 font-semibold mb-2">
        <strong>Problem Statement:</strong> Calculate the number of bits in a 6-byte MAC address.
      </p>
      <div class="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg text-xs font-mono space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Calculation:</strong> $6 \\text{ bytes} \\times 8 \\text{ bits/byte} = 48 \\text{ bits}$.</div>
        <div class="text-emerald-600 dark:text-emerald-400 font-bold mt-1">
          &there4; An Ethernet MAC address contains exactly 48 bits (12 hexadecimal digits).
        </div>
      </div>
    </div>

    <!-- Numerical Problem 18: Minimum Ethernet Payload -->
    <div class="p-4 mb-4 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-white dark:bg-slate-800 shadow-sm">
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
          Numerical Problem 18 &bull; Topic 6 (Minimum Ethernet Payload)
        </span>
        <span class="text-xs text-slate-400 font-mono">PDF Section 14</span>
      </div>
      <p class="text-xs text-slate-800 dark:text-slate-200 font-semibold mb-2">
        <strong>Problem Statement:</strong> Calculate the minimum data field size if the minimum Ethernet frame is 64 bytes.
      </p>
      <div class="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg text-xs font-mono space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Fixed Fields Overhead:</strong> $6 (\\text{DA}) + 6 (\\text{SA}) + 2 (\\text{Length/Type}) + 4 (\\text{CRC}) = 18 \\text{ bytes}$.</div>
        <div><strong>Minimum Data Payload:</strong> $64 - 18 = 46 \\text{ bytes}$.</div>
        <div class="text-emerald-600 dark:text-emerald-400 font-bold mt-1">
          &there4; Minimum payload is 46 bytes. If upper-layer data is smaller, padding is appended.
        </div>
      </div>
    </div>

    <!-- Numerical Problem 19: Maximum Ethernet Payload -->
    <div class="p-4 mb-4 rounded-xl border border-purple-200 dark:border-purple-800 bg-white dark:bg-slate-800 shadow-sm">
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs font-bold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300">
          Numerical Problem 19 &bull; Topic 6 (Maximum Ethernet Payload)
        </span>
        <span class="text-xs text-slate-400 font-mono">PDF Section 14</span>
      </div>
      <p class="text-xs text-slate-800 dark:text-slate-200 font-semibold mb-2">
        <strong>Problem Statement:</strong> Calculate the maximum data field size if the maximum Ethernet frame is 1518 bytes.
      </p>
      <div class="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg text-xs font-mono space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Fixed Fields Overhead:</strong> $18 \\text{ bytes}$.</div>
        <div><strong>Maximum Data Payload:</strong> $1518 - 18 = 1500 \\text{ bytes}$.</div>
        <div class="text-emerald-600 dark:text-emerald-400 font-bold mt-1">
          &there4; Maximum payload is 1500 bytes (standard IP MTU).
        </div>
      </div>
    </div>

    <!-- Numerical Problem 20: Backoff Time Calculation -->
    <div class="p-4 mb-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-white dark:bg-slate-800 shadow-sm">
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
          Numerical Problem 20 &bull; Topic 6 (Backoff Time Calculation)
        </span>
        <span class="text-xs text-slate-400 font-mono">PDF Section 14</span>
      </div>
      <p class="text-xs text-slate-800 dark:text-slate-200 font-semibold mb-2">
        <strong>Problem Statement:</strong> A station selects a random number $R = 3$. Calculate the waiting time for traditional 10 Mbps Ethernet.
      </p>
      <div class="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg text-xs font-mono space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Given:</strong> $T_{\\text{slot}} = 51.2\\ \\mu\\text{s}$, $R = 3$.</div>
        <div><strong>Formula:</strong> $T_B = R \\times T_{\\text{slot}}$</div>
        <div><strong>Calculation:</strong> $T_B = 3 \\times 51.2 = 153.6\\ \\mu\\text{s}$.</div>
        <div class="text-emerald-600 dark:text-emerald-400 font-bold mt-1">
          &there4; Waiting time is 153.6 microseconds.
        </div>
      </div>
    </div>

    <!-- Numerical Problem 21: Ethernet Frame Size in Bits -->
    <div class="p-4 mb-4 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-white dark:bg-slate-800 shadow-sm">
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300">
          Numerical Problem 21 &bull; Topic 6 (Frame Size in Bits)
        </span>
        <span class="text-xs text-slate-400 font-mono">PDF Section 14</span>
      </div>
      <p class="text-xs text-slate-800 dark:text-slate-200 font-semibold mb-2">
        <strong>Problem Statement:</strong> Convert the maximum Ethernet frame length of 1518 bytes into bits.
      </p>
      <div class="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg text-xs font-mono space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Calculation:</strong> $1518 \\times 8 = 12,144 \\text{ bits}$.</div>
        <div class="text-emerald-600 dark:text-emerald-400 font-bold mt-1">
          &there4; The maximum standard Ethernet frame contains exactly 12,144 bits.
        </div>
      </div>
    </div>

    <!-- Numerical Problem 22: Ethernet Transmission Time -->
    <div class="p-4 mb-4 rounded-xl border border-cyan-200 dark:border-cyan-800 bg-white dark:bg-slate-800 shadow-sm">
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs font-bold px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300">
          Numerical Problem 22 &bull; Topic 6 (Frame Transmission Time)
        </span>
        <span class="text-xs text-slate-400 font-mono">PDF Section 14</span>
      </div>
      <p class="text-xs text-slate-800 dark:text-slate-200 font-semibold mb-2">
        <strong>Problem Statement:</strong> Calculate the time required to transmit a 64-byte Ethernet frame at 10 Mbps. Ignore preamble and SFD.
      </p>
      <div class="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg text-xs font-mono space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Given:</strong> $L = 64 \\times 8 = 512 \\text{ bits}$, $R = 10,000,000 \\text{ bps}$.</div>
        <div><strong>Formula:</strong> $T = \\frac{L}{R}$</div>
        <div><strong>Calculation:</strong> $T = \\frac{512}{10,000,000} = 51.2 \\times 10^{-6} \\text{ s} = 51.2\\ \\mu\\text{s}$.</div>
        <div class="text-emerald-600 dark:text-emerald-400 font-bold mt-1">
          &there4; Transmission time is 51.2 microseconds (the Ethernet slot time).
        </div>
      </div>
    </div>
  `;
  if (!data["u2-numerical-problems"].sections.overview.includes("Numerical Problem 17 &bull; Topic 6")) {
    data["u2-numerical-problems"].sections.overview += t6Numericals;
  }
}

// 2. Add Short-Answer Questions 51-65 to u2-short-answer-questions
if (data["u2-short-answer-questions"]) {
  const t6ShortQuestions = `
    <div class="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
      <h3 class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
        Topic 6 – Ethernet MAC Sublayer Protocol Short-Answer Questions (PDF Section 15, 2 Marks Each)
      </h3>
      <div class="space-y-3 text-xs">
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q51. Define Ethernet.</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> Ethernet is a standardized local area network technology defined by IEEE 802.3 that specifies physical wiring, 48-bit MAC addressing, and frame transmission.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q52. What is IEEE 802.3?</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> IEEE 802.3 is the international standard family that defines the physical layer and MAC sublayer specifications for wired Ethernet networks.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q53. What is a MAC address?</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> A MAC address is a 48-bit physical hardware identifier burned into a network interface card (NIC) to identify a device on a local network.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q54. What is the size of an Ethernet MAC address?</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> An Ethernet MAC address is 48 bits (6 bytes), typically represented as 12 hexadecimal digits separated by colons.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q55. Define unicast address.</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> A unicast address identifies a single destination station for one-to-one communication. The least significant bit of its first byte is 0.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q56. Define multicast address.</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> A multicast address identifies a specific group of destination stations for one-to-many communication. The least significant bit of its first byte is 1.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q57. What is the Ethernet broadcast address?</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> The Ethernet broadcast address is <code>FF:FF:FF:FF:FF:FF</code> (all 48 bits are 1), which delivers a frame to all stations on the local network.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q58. What is the purpose of the preamble?</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> The preamble consists of 7 bytes of alternating 1s and 0s that alert the receiver that a frame is arriving and synchronize receiver clock timing.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q59. What is the Start Frame Delimiter (SFD)?</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> The SFD is a 1-byte field with the pattern <code>10101011</code>; its final two 1s mark the end of synchronization and the exact beginning of the frame header.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q60. What is CRC?</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> Cyclic Redundancy Check (CRC) is a 4-byte Frame Check Sequence (CRC-32) appended to the frame to allow the receiving station to detect bit corruption.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q61. Define CSMA/CD.</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> CSMA/CD (Carrier Sense Multiple Access with Collision Detection) is the traditional half-duplex Ethernet protocol where stations listen before and during transmission to detect collisions.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q62. What is a jamming signal?</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> A jamming signal is a 32 to 48 bit signal sent by a station immediately upon detecting a collision to ensure all stations detect the conflict and discard partial frames.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q63. What is slot time?</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> Slot time is the time required to transmit 512 bits in traditional 10 Mbps Ethernet ($51.2\\ \\mu\\text{s}$), representing the worst-case round-trip collision detection window.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q64. Define binary exponential backoff.</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> An algorithm where a station selects a random retransmission delay from a range ($0 \\le R \\le 2^K - 1$) that doubles after each successive collision to resolve contention.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q65. What is Fast Ethernet?</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> Fast Ethernet (IEEE 802.3u) is an Ethernet generation that operates at 100 Mbps over twisted-pair (100Base-TX) or fiber (100Base-FX) and introduced Autonegotiation.</p>
        </div>
      </div>
    </div>
  `;
  if (!data["u2-short-answer-questions"].sections.overview.includes("Topic 6 – Ethernet MAC Sublayer Protocol Short-Answer")) {
    data["u2-short-answer-questions"].sections.overview += t6ShortQuestions;
  }
}

// 3. Add Medium-Answer & Long-Answer Questions to u2-long-answer-questions
if (data["u2-long-answer-questions"]) {
  const t6LongQuestions = `
    <div class="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
      <h3 class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
        Topic 6 – Ethernet MAC Sublayer Protocol Medium &amp; Long-Answer Questions (PDF Section 15)
      </h3>
      <div class="space-y-4 text-xs">
        <!-- Q19: Ethernet Architecture -->
        <div class="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-900 dark:text-white mb-1.5">
            Q19 (5 Marks). Explain Ethernet architecture and distinguish between the LLC and MAC sublayers.
          </p>
          <div class="text-slate-700 dark:text-slate-300 space-y-1 leading-relaxed">
            <p><strong>Answer:</strong> Ethernet spans Physical Layer and Data Link Layer. In the IEEE 802 model, the Data Link Layer is divided into:</p>
            <ul class="list-disc pl-4 space-y-0.5">
              <li><strong>LLC Sublayer (IEEE 802.2):</strong> Upper sublayer that interfaces with the Network Layer (IP). Identifies upper-layer protocols and provides uniform service independent of the physical transmission medium.</li>
              <li><strong>MAC Sublayer (IEEE 802.3):</strong> Lower sublayer that interfaces with the Physical Layer. Adds 48-bit source and destination physical MAC addresses, builds frames, implements CSMA/CD medium arbitration, and computes CRC-32 for error detection.</li>
            </ul>
          </div>
        </div>

        <!-- Q20: Types of MAC Addresses -->
        <div class="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-900 dark:text-white mb-1.5">
            Q20 (5 Marks). Explain the three types of Ethernet MAC addresses with classification examples.
          </p>
          <div class="text-slate-700 dark:text-slate-300 space-y-1 leading-relaxed">
            <p><strong>Answer:</strong> Ethernet defines three destination address types:</p>
            <ul class="list-disc pl-4 space-y-0.5">
              <li><strong>Unicast:</strong> Identifies one destination (one-to-one). The least significant bit (LSB) of the first byte is <code>0</code>. Example: <code>4A:30:10:21:10:1A</code> ($4A_{16} = 01001010_2$, LSB is 0).</li>
              <li><strong>Multicast:</strong> Identifies a group of destinations (one-to-many). The LSB of the first byte is <code>1</code>. Example: <code>47:20:1B:2E:08:EE</code> ($47_{16} = 01000111_2$, LSB is 1).</li>
              <li><strong>Broadcast:</strong> Delivers to all local stations (one-to-all). All 48 bits are 1: <code>FF:FF:FF:FF:FF:FF</code>.</li>
            </ul>
          </div>
        </div>

        <!-- Q21: Frame Format -->
        <div class="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-900 dark:text-white mb-1.5">
            Q21 (5 Marks). Draw and explain the Ethernet frame format with all seven fields.
          </p>
          <div class="text-slate-700 dark:text-slate-300 space-y-1 leading-relaxed">
            <p><strong>Answer:</strong> An IEEE 802.3 Ethernet frame has 7 fields:</p>
            <ol class="list-decimal pl-4 space-y-0.5">
              <li><strong>Preamble (7 Bytes):</strong> 56 bits of alternating 10101010... for clock synchronization.</li>
              <li><strong>SFD (1 Byte):</strong> Binary 10101011 marking the start of the frame.</li>
              <li><strong>Destination Address (6 Bytes):</strong> 48-bit recipient MAC address.</li>
              <li><strong>Source Address (6 Bytes):</strong> 48-bit sender MAC address.</li>
              <li><strong>Length/Type (2 Bytes):</strong> Length ($\\le 1500$) or EtherType ($\\ge 0x0600$, e.g. 0x0800 for IPv4).</li>
              <li><strong>Data and Padding (46–1500 Bytes):</strong> Network-layer payload. Padded if $< 46$ bytes.</li>
              <li><strong>CRC (4 Bytes):</strong> CRC-32 Frame Check Sequence for error detection.</li>
            </ol>
          </div>
        </div>

        <!-- Q22: Minimum and Maximum Frame Sizes -->
        <div class="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-900 dark:text-white mb-1.5">
            Q22 (5 Marks). Explain the derivation of minimum (64 bytes) and maximum (1518 bytes) Ethernet frame sizes.
          </p>
          <div class="text-slate-700 dark:text-slate-300 space-y-1 leading-relaxed">
            <p><strong>Answer:</strong></p>
            <ul class="list-disc pl-4 space-y-0.5">
              <li><strong>Minimum Frame Size (64 Bytes / 512 bits):</strong> Required so that a transmitting station is still sending when a worst-case collision echo returns ($T_{\\text{frame}} \\ge 2 T_p$). Fixed overhead = $6 + 6 + 2 + 4 = 18$ bytes $\\implies$ Minimum data = $64 - 18 = 46$ bytes.</li>
              <li><strong>Maximum Frame Size (1518 Bytes):</strong> Historically limited switch buffer memory requirements and prevented one node from monopolizing the shared medium. Maximum payload = $1518 - 18 = 1500$ bytes (standard MTU).</li>
            </ul>
          </div>
        </div>

        <!-- Q23: Binary Exponential Backoff -->
        <div class="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-900 dark:text-white mb-1.5">
            Q23 (5 Marks). Describe the Binary Exponential Backoff algorithm and its formula.
          </p>
          <div class="text-slate-700 dark:text-slate-300 space-y-1 leading-relaxed">
            <p><strong>Answer:</strong> After a collision, a station waits $T_B = R \\times T_{\\text{slot}}$, where $T_{\\text{slot}} = 51.2\\ \\mu\\text{s}$ at 10 Mbps.</p>
            <ul class="list-disc pl-4 space-y-0.5">
              <li>$R$ is chosen randomly: $0 \\le R \\le 2^K - 1$, where $K$ is the collision attempt number.</li>
              <li>At $K=1$, $R \\in \\{0, 1\\}$. At $K=2$, $R \\in \\{0, 1, 2, 3\\}$. At $K=3$, $R \\in \\{0, 1, \\dots, 7\\}$.</li>
              <li>The exponent $K$ is capped at 10 ($R \\le 1023$). If collisions exceed 16 ($K > 16$), transmission is aborted.</li>
            </ul>
          </div>
        </div>

        <!-- Q24: Half-Duplex vs Full-Duplex -->
        <div class="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-900 dark:text-white mb-1.5">
            Q24 (5 Marks). Compare Half-Duplex and Full-Duplex Ethernet. Why is CSMA/CD obsolete in modern networks?
          </p>
          <div class="text-slate-700 dark:text-slate-300 space-y-1 leading-relaxed">
            <p><strong>Answer:</strong> Half-duplex shares a medium where stations transmit or receive alternately; collisions occur and CSMA/CD is required. Full-duplex uses dedicated point-to-point switched links with separate transmit and receive wire pairs/fibers. Because data flows simultaneously in both directions without interference, collisions are physically impossible. Modern switched networks operate in full-duplex, making CSMA/CD obsolete.</p>
          </div>
        </div>

        <!-- Q25: Comprehensive Evolution (10–13 Marks) -->
        <div class="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-900 dark:text-white mb-1.5">
            Q25 (10–13 Marks). Comprehensively discuss the evolution of Ethernet across Standard, Fast, Gigabit, and Ten-Gigabit generations.
          </p>
          <div class="text-slate-700 dark:text-slate-300 space-y-1 leading-relaxed">
            <p><strong>Answer Structure:</strong></p>
            <ul class="list-disc pl-4 space-y-0.5">
              <li><strong>Standard Ethernet (10 Mbps, 802.3):</strong> Coax bus (10Base5, 10Base2) and star UTP (10Base-T). CSMA/CD half-duplex access with slot time $51.2\\ \\mu\\text{s}$.</li>
              <li><strong>Fast Ethernet (100 Mbps, 802.3u):</strong> 100Base-TX (Cat5 2-pair), 100Base-FX (fiber). Retained 48-bit MAC and 64-1518B framing; introduced Autonegotiation.</li>
              <li><strong>Gigabit Ethernet (1 Gbps, 802.3z/ab):</strong> 1000Base-T (Cat5e 4-pair 4D-PAM5) and 1000Base-SX/LX fiber. Switched architecture eliminated collision limits.</li>
              <li><strong>Ten-Gigabit Ethernet (10 Gbps, 802.3ae):</strong> 10GBase-S/L/E fiber backbones. Operates in full-duplex mode only, permanently retiring CSMA/CD.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
  if (!data["u2-long-answer-questions"].sections.overview.includes("Topic 6 – Ethernet MAC Sublayer Protocol Medium &amp; Long-Answer")) {
    data["u2-long-answer-questions"].sections.overview += t6LongQuestions;
  }
}

// 4. Add Topic 6 MCQs to u2-mcqs
if (data["u2-mcqs"]) {
  const t6Mcqs = [
    {
      question: "Which IEEE standard defines Ethernet?",
      options: ["IEEE 802.11", "IEEE 802.3", "IEEE 802.5", "IEEE 802.15"],
      correct: 1,
      explanation: "Ethernet is defined by the IEEE 802.3 standard family."
    },
    {
      question: "What is the size of an Ethernet MAC address?",
      options: ["16 bits", "32 bits", "48 bits", "64 bits"],
      correct: 2,
      explanation: "An Ethernet MAC address is 48 bits (6 bytes / 12 hexadecimal digits)."
    },
    {
      question: "What is the Ethernet broadcast address?",
      options: ["00:00:00:00:00:00", "FF:FF:FF:FF:FF:FF", "01:01:01:01:01:01", "AA:AA:AA:AA:AA:AA"],
      correct: 1,
      explanation: "The broadcast address is FF:FF:FF:FF:FF:FF (all 48 bits are 1)."
    },
    {
      question: "How many bytes are in the Ethernet preamble?",
      options: ["4", "6", "7", "8"],
      correct: 2,
      explanation: "The Ethernet preamble is 7 bytes (56 bits), followed by the 1-byte SFD."
    },
    {
      question: "What is the SFD pattern?",
      options: ["10101010", "10101011", "11111111", "00000000"],
      correct: 1,
      explanation: "The Start Frame Delimiter pattern is 10101011; the last two 1s mark the frame start."
    },
    {
      question: "What is the minimum Ethernet frame length described by Forouzan?",
      options: ["32 bytes", "46 bytes", "64 bytes", "128 bytes"],
      correct: 2,
      explanation: "The minimum standard Ethernet frame length is 64 bytes (512 bits)."
    },
    {
      question: "What is the maximum standard Ethernet frame length described by Forouzan?",
      options: ["512 bytes", "1000 bytes", "1518 bytes", "2000 bytes"],
      correct: 2,
      explanation: "The maximum standard Ethernet frame length is 1518 bytes (1500 bytes MTU + 18 bytes overhead)."
    },
    {
      question: "What is the purpose of the CRC field?",
      options: ["Addressing", "Error detection", "Flow control", "Routing"],
      correct: 1,
      explanation: "The 4-byte CRC-32 field is used by the receiving station for error detection."
    },
    {
      question: "Which access method is used by traditional shared Ethernet?",
      options: ["CSMA/CA", "Token passing", "CSMA/CD", "Polling"],
      correct: 2,
      explanation: "Traditional shared Ethernet uses Carrier Sense Multiple Access with Collision Detection (CSMA/CD)."
    },
    {
      question: "What is the slot time for traditional 10 Mbps Ethernet?",
      options: ["5.12 μs", "51.2 μs", "512 μs", "1 ms"],
      correct: 1,
      explanation: "The slot time is 512 bits / 10 Mbps = 51.2 microseconds."
    },
    {
      question: "Which signal is sent after an Ethernet collision is detected?",
      options: ["ACK", "RTS", "Jamming signal", "Token"],
      correct: 2,
      explanation: "A station broadcasts a 32-48 bit jamming signal upon detecting a collision."
    },
    {
      question: "What is the data rate of Fast Ethernet?",
      options: ["10 Mbps", "100 Mbps", "1 Gbps", "10 Gbps"],
      correct: 1,
      explanation: "Fast Ethernet (IEEE 802.3u) operates at 100 Mbps."
    },
    {
      question: "Which Ethernet mode does not require CSMA/CD?",
      options: ["Shared half-duplex", "Full-duplex switched Ethernet", "Traditional coaxial Ethernet", "All half-duplex modes"],
      correct: 1,
      explanation: "Full-duplex switched Ethernet provides collision-free dedicated links, eliminating the need for CSMA/CD."
    },
    {
      question: "Which field identifies the sender's MAC address?",
      options: ["DA", "SA", "CRC", "SFD"],
      correct: 1,
      explanation: "SA stands for Source Address, which carries the sender's 6-byte MAC address."
    },
    {
      question: "What does binary exponential backoff determine?",
      options: ["MAC address", "Frame length", "Waiting time after collision", "IP address"],
      correct: 2,
      explanation: "Binary exponential backoff determines the random waiting time (T_B = R * T_slot) before attempting retransmission."
    }
  ];

  const existingQuestions = new Set(data["u2-mcqs"].sections.quiz.map(q => q.question));
  t6Mcqs.forEach(q => {
    if (!existingQuestions.has(q.question)) {
      data["u2-mcqs"].sections.quiz.push(q);
    }
  });
}

// =============================================================================
// WRITE UPDATED SYLLABUS DATA BACK TO js/topics_u2_syllabus.js
// =============================================================================
const finalOut = `// topics_u2_syllabus.js - Master Academic Topic Content Repository for Unit 2
// Cleaned: All ASCII symbol art removed. Integrated complete Topic 2, Topic 3, Topic 4, Topic 5, & Topic 6 content.
var TOPICS_U2_SYLLABUS = ` + JSON.stringify(data, null, 2) + `;\n
if (typeof window !== 'undefined') window.TOPICS_U2_SYLLABUS = TOPICS_U2_SYLLABUS;
if (typeof global !== 'undefined') global.TOPICS_U2_SYLLABUS = TOPICS_U2_SYLLABUS;
if (typeof module !== 'undefined' && module.exports) module.exports = TOPICS_U2_SYLLABUS;
`;

fs.writeFileSync(syllabusPath, finalOut, 'utf8');
console.log("Successfully wrote updated js/topics_u2_syllabus.js with comprehensive Topic 6 content!");
