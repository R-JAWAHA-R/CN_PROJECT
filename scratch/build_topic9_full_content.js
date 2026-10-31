// Build complete academic content for Unit 2 Topic 9: Data Link Layer Switching & Assessment Enrichment
const fs = require('fs');
const path = require('path');

const syllabusFile = path.join(__dirname, '../js/topics_u2_syllabus.js');
const TOPICS_U2_SYLLABUS = require(syllabusFile);

const img1 = "https://images.openai.com/static-rsc-4/1_HGKh9T4tgrmMR2lqvPJnpUIpnJv8ShNgWMFr53dP3z_hMkMowIegvhR5vJdCdip6AEYKh0_BHZwVTbS0n31yP1KTHfProi8HyQX5X1vJaY0Sj0UHz6z4xQ2OouIeKWcaTGbOPR9r8APc6bmOj4-EPhRjInFZPHtgRf9AXUY8rGs2i74o8sBTkupVooap7r?purpose=fullsize";
const img2 = "https://images.openai.com/static-rsc-4/DuZgVF38ZhvT4v7VlqkCCNghRLqWgHGpmrv7afju_iSiEiIkBP_F-anNjzqKZhdkpxk3Aydz1fD2vhW39S10hs2rVyZWI57SVXePprIux8iEKeYwNoGqVrrbRKJz4r5L5N8o9CTUsVy_l7jQhCCHgfNqNaBP5Zes2MtwaPdAB4d1q6lRd2yT8ATAXeJlcwGR?purpose=fullsize";
const img3 = "https://images.openai.com/static-rsc-4/V5F_p784NFunSkSmkZNKSrrxtMzoIT27-NVKdo3nUbDpE_BgxOFY5Xaz_f8jHghsm8eQtWnAVQZIEPVmIpPe59V9VnAWfMrnG5IOrP97-ZtUrL7p0q2UUGPfNZl_1b36GzrHbuF6N7oTz_3_NQO9HecRHtRxAeOAb78YYgBC7753h0TewppsRc9yRKz8YNux?purpose=fullsize";
const img4 = "https://images.openai.com/static-rsc-4/hEN4npqMRwIDO1pTtIvcnJeqYrAl6N2BWujKlfUA4F36KcXFp2wXzhY42YMKG3rgAoecLSQiOqlRZKmzRAskNtE-KGwVTP0oakv81TSdEb1b4vQdanYlNhhTIQLZfxEuXuRx0rfnklHFV-a_3LZ0DpmUH7GfelAdY5SGL5bzurwmhETwdXPbErk60VDr3RfE?purpose=fullsize";

// ==========================================
// 1. dll-switching: Introduction to Data Link Layer Switching
// ==========================================
TOPICS_U2_SYLLABUS['dll-switching'] = {
  id: "dll-switching",
  title: "Introduction to Data Link Layer Switching",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  level: "Beginner",
  category: "switching",
  difficulty: "Core",
  readingTime: "20–25 min",
  standard: "Forouzan Ch. 15 / IEEE 802.1D",
  oneLiner: "Forwarding Ethernet frames between LAN stations based on destination MAC addresses to create dedicated collision domains.",
  quickAnswer: "Data Link Layer Switching is the process of forwarding data frames between stations in a Local Area Network (LAN) using their MAC addresses. Operating at Layer 2, a network switch examines the destination MAC address of incoming frames and forwards each frame only out the port that leads directly to the recipient, eliminating unnecessary traffic and providing dedicated collision-free bandwidth.",
  whyItMatters: "In legacy shared networks with repeaters or hubs, every transmission was broadcast to every connected machine, wasting cable bandwidth and causing severe signal collisions. Switching solves this fundamental limitation by microsegmenting the LAN into independent collision domains, unlocking wire-speed full-duplex communication.",
  prerequisitesList: [
    { concept: "MAC Address", meaning: "48-bit burned-in physical address identifying network interface cards (NICs)" },
    { concept: "Collision Domain", meaning: "Network segment where simultaneous transmissions cause frame collisions" },
    { concept: "Unicast vs Broadcast", meaning: "One-to-one frame delivery versus one-to-all station delivery" }
  ],
  learningObjectives: [
    "Define Data Link Layer switching and identify its primary layer of operation.",
    "Explain why switching is required in modern high-density Local Area Networks.",
    "Describe the 4-computer switch scenario (Computer A, B, C, D) and trace frame forwarding.",
    "Contrast shared medium broadcast behavior with switched unicast frame delivery.",
    "Evaluate the performance benefits of collision domain microsegmentation."
  ],
  infobox: {
    layer: "Layer 2 (Data Link Layer)",
    standard: "IEEE 802.1D / IEEE 802.3",
    type: "Switching & Forwarding",
    prerequisites: ["mac-address", "ethernet-mac-sublayer"],
    relatedConcepts: ["bridges", "learning-bridges", "forwarding-table", "spanning-tree"],
    compareWith: ["network-layer-routing", "hub-broadcasting"],
    primaryUses: ["Enterprise Local Area Networks, Campus Networks, Data Center Fabrics, Home Wi-Fi Router Switches"]
  },
  imageUrl: img1,
  imageCaption: "Figure: Data Link Layer Switching & Multi-Port Ethernet Frame Forwarding (Host A to Host C).",
  sections: {
    overview: `
      <p class="lead"><strong>Data Link Layer Switching</strong> is the process of forwarding data frames between interconnected devices in a Local Area Network (LAN) using their hardware <strong>MAC (Media Access Control) addresses</strong>.</p>
      
      <p>A network switch operates primarily at the <strong>Data Link Layer (Layer 2)</strong> of the OSI Reference Model. When an Ethernet frame arrives on any switch port, the switch inspects its header, reads the <strong>48-bit destination MAC address</strong>, queries its internal forwarding database (FDB), and directs the frame exclusively out the specific port leading to the destination station.</p>

      <div class="wiki-callout tip my-4">
        <div class="callout-header"><i class="fa-solid fa-lightbulb"></i> Why is Switching Needed?</div>
        <p>In a network containing dozens or hundreds of devices, transmitting every frame to every single computer creates massive network congestion, wastes processing cycles on non-target network interfaces, and poses serious eavesdropping security risks. <strong>Switching completely resolves this problem</strong> by selectively forwarding frames only to the required destination port whenever the destination location is known.</p>
      </div>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">Concrete Illustrative Example: 4 Connected Computers</h4>
      <p>Suppose four workstations are connected to a 4-port Ethernet switch:</p>
      <ul class="list-disc pl-5 space-y-1 text-xs">
        <li><strong>Computer A</strong> connected to Port 1</li>
        <li><strong>Computer B</strong> connected to Port 2</li>
        <li><strong>Computer C</strong> connected to Port 3</li>
        <li><strong>Computer D</strong> connected to Port 4</li>
      </ul>
      <p class="mt-2 text-xs leading-relaxed">
        When <strong>Computer A</strong> transmits an Ethernet frame addressed to <strong>Computer C</strong>:
        <br>1. The switch receives the frame on Port 1.
        <br>2. It reads the destination MAC address corresponding to Computer C.
        <br>3. It looks up its MAC address table, identifies that Computer C resides on Port 3, and forwards the frame <strong>through Port 3 only</strong>.
        <br>4. Computers B and D on Ports 2 and 4 receive zero traffic, meaning they can simultaneously exchange data without interference!
      </p>
    `,
    eli10: "Imagine a post office with private delivery mailboxes. Instead of shouting every letter through a megaphone to the whole town (like a hub does), the switch reads the recipient's name and places the letter directly into their private mailbox.",
    analogy: "A switch acts like a skilled telephone switchboard operator who plugs the caller's cord directly into the callee's jack, creating a private direct conversation line without broadcasting voice to every house in town.",
    howItWorks: `
      <ol class="list-decimal pl-5 space-y-2 text-xs">
        <li><strong>Frame Arrival:</strong> An Ethernet frame enters a switch interface port. The physical layer PHY serializes the bits into the port buffer.</li>
        <li><strong>Preamble Stripping & Checksum Verification:</strong> The switch synchronizes using the preamble/SFD and validates the Frame Check Sequence (CRC-32) trailer to ensure transmission integrity. Damaged frames are dropped.</li>
        <li><strong>Source Address Learning:</strong> The switch inspects the 48-bit Source MAC address and maps it to the receiving port inside its Content Addressable Memory (CAM) table, resetting the aging timer.</li>
        <li><strong>Destination Lookup & Decision:</strong> The switch reads the Destination MAC:
          <ul class="list-disc pl-5 mt-1 space-y-1">
            <li>If the destination resides on a <em>different port</em>, the frame is switched directly to that egress port (Unicast Forwarding).</li>
            <li>If the destination is on the <em>same port</em> as the ingress, the frame is dropped (Filtering).</li>
            <li>If the destination is <em>unknown or broadcast</em>, the frame is copied to all active ports except the arrival port (Flooding).</li>
          </ul>
        </li>
      </ol>
    `,
    technicalDetails: `
      <p class="text-xs leading-relaxed">Data Link Layer switches employ specialized hardware architectures to achieve high throughput and microsecond latency:</p>
      <ul class="list-disc pl-5 space-y-1 text-xs">
        <li><strong>ASIC (Application-Specific Integrated Circuit):</strong> Unlike software-based bridges, modern switches execute MAC table lookups and matrix crossbar switching using dedicated silicon hardware at line rate.</li>
        <li><strong>TCAM (Ternary Content Addressable Memory):</strong> Enables single-clock-cycle table lookups for $O(1)$ search complexity regardless of table size.</li>
        <li><strong>Switching Methods:</strong>
          <ul class="list-disc pl-5 mt-1">
            <li><em>Store-and-Forward:</em> Buffers the entire frame and verifies the FCS CRC before forwarding. Eliminates error propagation.</li>
            <li><em>Cut-Through:</em> Reads only the first 6 bytes (destination MAC) and begins transmission immediately, achieving sub-microsecond latency.</li>
            <li><em>Fragment-Free:</em> Reads the first 64 bytes (collision window) to filter runt frames before forwarding.</li>
          </ul>
        </li>
      </ul>
    `,
    workedExamples: [
      {
        title: "Example 1: Basic Unicast Forwarding Across Switch Ports",
        difficulty: "Beginner",
        problem: "In an 8-port switch, Station A (Port 1) sends a 1500-byte frame to Station B (Port 4). The switch table contains Station B on Port 4. Which ports receive the frame?",
        solution: "The switch inspects the destination MAC, finds an exact match for Port 4 in its CAM table, and forwards the frame exclusively through Port 4. Ports 2, 3, 5, 6, 7, and 8 receive zero bits. This isolates collision domains and allows concurrent traffic on other ports."
      },
      {
        title: "Example 2: Throughput Gain from Microsegmentation",
        difficulty: "Intermediate",
        problem: "A legacy 100 Mbps hub connects 10 workstations. A modern 100 Mbps full-duplex switch replaces it. Compare the total aggregate theoretical network capacity.",
        solution: "With a shared hub, all 10 stations share a single 100 Mbps half-duplex collision domain (aggregate capacity = 100 Mbps). With a 10-port full-duplex switch, each station enjoys a dedicated 100 Mbps send + 100 Mbps receive link (200 Mbps full-duplex). Total aggregate theoretical throughput across 5 concurrent conversations = 5 × 200 Mbps = 1,000 Mbps (1 Gbps) — a 10x capacity multiplier!"
      }
    ],
    advantagesLimitations: `
      <table class="wiki-table">
        <thead><tr><th>Advantage</th><th>Disadvantage / Limitation</th></tr></thead>
        <tbody>
          <tr><td><strong>Dedicated Bandwidth:</strong> Eliminates shared collisions; every port is an isolated collision domain.</td><td><strong>Cost:</strong> Switch hardware is more expensive than basic hubs or repeaters.</td></tr>
          <tr><td><strong>Full-Duplex Mode:</strong> Stations can transmit and receive simultaneously at 200% wire speed.</td><td><strong>Broadcast Domain Exposure:</strong> Does not stop Layer 2 broadcast storms without VLANs or routers.</td></tr>
          <tr><td><strong>Plug-and-Play Transparency:</strong> Stations require zero special software configuration to connect.</td><td><strong>Bridging Loops:</strong> Redundant links create catastrophic broadcast loops if STP is not enabled.</td></tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "Enterprise Campus Networks: Cisco Catalyst and Arista campus core and edge switches.",
      "Cloud Data Centers: High-bandwidth spine-and-leaf switches handling 100G/400G Ethernet.",
      "Residential Gateways: Integrated 4-port Gigabit Ethernet LAN switches inside Wi-Fi routers."
    ],
    quiz: [
      {
        question: "At which layer of the OSI model does a standard network switch primarily operate?",
        options: ["Physical Layer (Layer 1)", "Data Link Layer (Layer 2)", "Network Layer (Layer 3)", "Transport Layer (Layer 4)"],
        correct: 1,
        explanation: "Standard Ethernet switches operate at Data Link Layer (Layer 2), inspecting and switching frames based on 48-bit MAC addresses."
      },
      {
        question: "Why does an Ethernet switch forward unicast frames only to the specific destination port?",
        options: ["To encrypt the data payload", "To eliminate unnecessary traffic and isolate collision domains", "To assign dynamic IP addresses", "To prevent TCP SYN flood attacks"],
        correct: 1,
        explanation: "Forwarding only to the target port prevents wasting bandwidth on unrelated segments and creates separate, isolated collision domains."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 15: Connecting LANs.", url: "" },
      { cite: "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 4: Data Link Layer Switching.", url: "" },
      { cite: "IEEE Std 802.1D: Media Access Control (MAC) Bridges.", url: "" }
    ]
  }
};

// ==========================================
// 2. u2-bridges-overview: Bridges
// ==========================================
TOPICS_U2_SYLLABUS['u2-bridges-overview'] = {
  id: "u2-bridges-overview",
  title: "Bridges",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  level: "Beginner",
  category: "switching",
  difficulty: "Core",
  readingTime: "20–25 min",
  standard: "Forouzan Ch. 15 / IEEE 802.1D",
  oneLiner: "A Layer 2 networking device that connects two or more LAN segments and forwards frames based on MAC addresses.",
  quickAnswer: "A bridge is a networking device that connects two or more LAN segments and forwards frames between them at the Data Link Layer (Layer 2). Bridges inspect incoming frame MAC addresses to filter local segment traffic, forward inter-segment traffic, dynamically learn device locations, and divide a large shared network into smaller, more efficient collision domains.",
  whyItMatters: "Bridges were the historic foundation of switched internetworking. By breaking large broadcast buses into separate collision domains, bridges prevented signal degradation, increased network diameter, and introduced the self-learning filtering paradigm that powers all modern Ethernet switches.",
  prerequisitesList: [
    { concept: "LAN Segment", meaning: "A physical division of a local network sharing common electrical media" },
    { concept: "Frame Filtering", meaning: "Preventing local frames from crossing unnecessarily into other segments" },
    { concept: "MAC Learning", meaning: "Automatic discovery of station locations from frame source addresses" }
  ],
  learningObjectives: [
    "Define a bridge and state its operating OSI layer.",
    "Enumerate the 5 key functions of a network bridge.",
    "Explain the 5 sequential steps a bridge executes upon frame reception.",
    "Evaluate the advantages and historical limitations of legacy bridges."
  ],
  infobox: {
    layer: "Layer 2 (Data Link Layer)",
    standard: "IEEE 802.1D",
    type: "Bridging & LAN Interconnection",
    prerequisites: ["dll-switching", "ethernet-mac-sublayer"],
    relatedConcepts: ["transparent-bridges", "learning-bridges", "forwarding-filtering", "switches"],
    compareWith: ["repeaters", "routers", "hubs"],
    primaryUses: ["Connecting legacy coaxial Ethernet segments, interconnecting different physical layers, traffic isolation"]
  },
  imageUrl: img2,
  imageCaption: "Figure: Network Bridge Architecture: LAN Segmentation & Inter-Segment Filtering at Layer 2.",
  sections: {
    overview: `
      <p class="lead">A <strong>bridge</strong> is a networking device that operates at the <strong>Data Link Layer (Layer 2)</strong> of the OSI model, connecting two or more distinct LAN segments and intelligently forwarding data frames between them based on physical MAC addresses.</p>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">The 5 Core Functions of a Bridge</h4>
      <p class="text-xs">As detailed in authoritative curricula (Forouzan & Tanenbaum), a network bridge performs five essential functions:</p>
      <ul class="list-disc pl-5 space-y-1.5 text-xs">
        <li><strong>1. Frame Forwarding:</strong> Examines the destination MAC address and transmits frames to the appropriate target network segment.</li>
        <li><strong>2. Frame Filtering:</strong> Prevents frames whose destination is on the local segment from unnecessarily crossing into other segments.</li>
        <li><strong>3. MAC Address Learning:</strong> Inspects incoming source addresses to dynamically learn which stations reside on which segment without manual intervention.</li>
        <li><strong>4. Traffic Reduction:</strong> Confines intra-segment traffic locally, drastically reducing congestion on neighboring network segments.</li>
        <li><strong>5. Network Segmentation:</strong> Divides a single large collision domain into multiple smaller, independent collision domains.</li>
      </ul>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">Step-by-Step Working of a Bridge</h4>
      <p class="text-xs">Whenever a bridge receives a frame on any interface, it executes the following five operational steps:</p>
      <ol class="list-decimal pl-5 space-y-1 text-xs">
        <li><strong>Receives the frame</strong> from the physical layer of the incoming segment.</li>
        <li><strong>Reads both source and destination MAC addresses</strong> from the Layer 2 header.</li>
        <li><strong>Learns the source MAC address</strong> and records its association with the arrival port in its internal forwarding table.</li>
        <li><strong>Checks its forwarding table</strong> to determine the port corresponding to the destination MAC address.</li>
        <li><strong>Executes decision:</strong> Forwards the frame to the destination port, filters (drops) it if destination is on the incoming segment, or floods it if destination is unknown.</li>
      </ol>
    `,
    eli10: "A bridge is like a security guard standing between two rooms. If two people inside Room 1 talk to each other, the guard keeps the door shut (filtering). If someone in Room 1 wants to talk to someone in Room 2, the guard opens the door and lets them pass (forwarding).",
    analogy: "A bridge works like a toll booth connecting two islands. It checks where each car is going. If a car is simply driving to a store on Island 1, it doesn't cross the bridge. If it is traveling to Island 2, it is permitted across.",
    howItWorks: `
      <p class="text-xs leading-relaxed">Unlike a physical repeater or hub which blindly repeats raw electrical bits across all connected wires, a bridge is an intelligent store-and-forward processor:</p>
      <ul class="list-disc pl-5 space-y-1 text-xs">
        <li>It completely receives and reassembles the frame into local buffer RAM.</li>
        <li>It computes the CRC-32 Frame Check Sequence. If the frame contains errors, it is dropped immediately, protecting other segments from noise.</li>
        <li>It separates collision domains. A collision occurring on Segment 1 does not affect or propagate to Segment 2.</li>
        <li>However, it maintains a <strong>single broadcast domain</strong>: all broadcast frames (e.g., ARP requests) are flooded across all segments.</li>
      </ul>
    `,
    technicalDetails: `
      <p class="text-xs leading-relaxed">Bridge performance and characteristics:</p>
      <ul class="list-disc pl-5 space-y-1 text-xs">
        <li><strong>Forwarding Delay:</strong> Because bridges use store-and-forward processing in software, forwarding introduces modest latency ($T_{\\text{bridge}} \\approx 50\\text{--}150\\;\\mu\\text{s}$).</li>
        <li><strong>Protocol Independence:</strong> Bridges are transparent to Layer 3 protocols. They seamlessly forward IPv4, IPv6, ARP, IPX, and AppleTalk frames without understanding network layer headers.</li>
        <li><strong>Loop Susceptibility:</strong> If network engineers install multiple bridges in a ring to provide fault tolerance, loops will cause broadcast storms unless IEEE 802.1D Spanning Tree Protocol is enabled.</li>
      </ul>
    `,
    workedExamples: [
      {
        title: "Example: Inter-Segment vs. Intra-Segment Traffic",
        difficulty: "Beginner",
        problem: "Bridge B connects Segment 1 (Stations A and B) and Segment 2 (Stations C and D). Station A sends a frame to Station B. Station C sends a frame to Station A. Describe the bridge's action for both frames.",
        solution: "1. For Frame 1 (A -> B): The bridge receives the frame on Port 1. Source A is recorded on Port 1. Destination B is also on Port 1. The bridge FILTERS (drops) the frame from crossing to Segment 2. Segment 2 remains quiet.\n2. For Frame 2 (C -> A): The bridge receives the frame on Port 2. Source C is recorded on Port 2. Destination A is on Port 1. The bridge FORWARDS the frame out Port 1 onto Segment 1."
      }
    ],
    advantagesLimitations: `
      <table class="wiki-table">
        <thead><tr><th>Key Advantages</th><th>Key Disadvantages</th></tr></thead>
        <tbody>
          <tr><td>Reduces unnecessary network congestion between segments.</td><td>Generally limited to fewer ports (2–4 ports) compared to modern switches.</td></tr>
          <tr><td>Isolates collision domains, increasing effective bandwidth per segment.</td><td>Store-and-forward architecture introduces forwarding delay.</td></tr>
          <tr><td>Connects heterogeneous LAN segments (e.g., 10BASE5 coax to 10BASE-T twisted pair).</td><td>Requires loop-prevention protocols (STP) to avoid broadcast storms in redundant designs.</td></tr>
          <tr><td>Learns device locations dynamically without manual configuration.</td><td>Does not route traffic between different IP subnetworks (Layer 3 routing required).</td></tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "Industrial Ethernet: Connecting isolated machinery segments with different electrical grounding.",
      "Wireless Bridges: Outdoor point-to-point links connecting two separate school or corporate buildings.",
      "Virtualization: Linux Kernel bridging (`brctl` / `bridge-utils`) connecting VM TAP interfaces to physical NICs."
    ],
    quiz: [
      {
        question: "Which of the following is NOT a function of a Data Link Layer bridge?",
        options: ["Frame filtering", "MAC address learning", "IP packet routing", "Collision domain separation"],
        correct: 2,
        explanation: "IP packet routing is performed at Layer 3 (Network Layer) by routers, not Layer 2 bridges."
      },
      {
        question: "What happens when a bridge receives a frame whose destination is on the same segment as the sender?",
        options: ["It forwards the frame to all other segments", "It filters (discards) the frame from crossing the bridge", "It sends an error message to the sender", "It broadcasts the frame to the internet"],
        correct: 1,
        explanation: "The bridge filters the frame because the destination has already received it directly over the local physical segment."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 15.1: Bridges.", url: "" },
      { cite: "William Stallings, Data and Computer Communications, 10th Edition, Chapter 15: Local Area Networks.", url: "" }
    ]
  }
};

// ==========================================
// 3. u2-transparent-bridges: Transparent Bridges
// ==========================================
TOPICS_U2_SYLLABUS['u2-transparent-bridges'] = {
  id: "u2-transparent-bridges",
  title: "Transparent Bridges",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  level: "Intermediate",
  category: "switching",
  difficulty: "Core",
  readingTime: "20–25 min",
  standard: "IEEE 802.1D / Forouzan Ch. 15",
  oneLiner: "A bridge that automatically learns device locations and forwards frames without connected stations knowing the bridge exists.",
  quickAnswer: "A transparent bridge is an IEEE 802.1D standard bridge that forwards and filters Ethernet frames completely invisibly to end stations. Stations send frames as if they were on a single shared cable, requiring zero hardware modifications or network configuration. Transparent bridges achieve this autonomy through three concurrent operations: dynamic learning, selective forwarding, and local filtering.",
  whyItMatters: "Transparent bridging made Ethernet's exponential scaling possible. When network administrators added bridges or replaced hubs with switches, existing computers, servers, and software continued operating without a reboot or reconfiguration, establishing true plug-and-play local networking.",
  prerequisitesList: [
    { concept: "Transparency in Networking", meaning: "A device or protocol operating completely undetected by end hosts" },
    { concept: "Forwarding Table", meaning: "Dynamic database mapping MAC addresses to bridge port interfaces" },
    { concept: "IEEE 802.1D", meaning: "The international standard defining MAC bridges and transparent operation" }
  ],
  learningObjectives: [
    "Define a transparent bridge and explain why it is called 'transparent'.",
    "Identify the 6 core characteristics of an IEEE 802.1D transparent bridge.",
    "Explain the three fundamental operations: Learning, Forwarding, and Filtering.",
    "Describe how transparent bridges prevent operational disruption during host mobility."
  ],
  infobox: {
    layer: "Layer 2 (Data Link Layer)",
    standard: "IEEE 802.1D",
    type: "Transparent Bridging",
    prerequisites: ["u2-bridges-overview", "mac-address"],
    relatedConcepts: ["learning-bridges", "forwarding-and-filtering", "spanning-tree-protocol"],
    compareWith: ["source-routing-bridges", "transparent-firewalls"],
    primaryUses: ["Standard Ethernet LANs, IEEE 802.3 networks, plug-and-play switch interconnects"]
  },
  imageUrl: img2,
  imageCaption: "Figure: Transparent Bridge Operation: Automatic Self-Learning and Plug-and-Play Transparency.",
  sections: {
    overview: `
      <p class="lead">A <strong>transparent bridge</strong> is a bridge that automatically learns the physical locations of all active devices and forwards frames across segments without requiring connected computers to have any awareness of the bridge's presence.</p>

      <p>The term <strong>"transparent"</strong> signifies that stations communicate exactly as if they were sharing a single uninterrupted cable. Stations do not format frames differently, do not specify bridge intermediate hops, and require zero special driver or protocol configurations. You can insert or remove a transparent bridge from a live network without reconfiguring any host!</p>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">Core Characteristics of Transparent Bridges</h4>
      <ul class="list-disc pl-5 space-y-1.5 text-xs">
        <li><strong>Layer 2 Operation:</strong> Operates strictly at the Data Link Layer, completely oblivious to higher-layer protocols (IP, IPX, TCP, UDP).</li>
        <li><strong>MAC-Based Decision:</strong> Uses 48-bit hardware MAC addresses for all forwarding and filtering decisions.</li>
        <li><strong>Automatic Location Learning:</strong> Inspects the source MAC of incoming frames to autonomously construct and refresh its forwarding database.</li>
        <li><strong>Dynamic Forwarding Table:</strong> Maintains an internal database of MAC addresses, port mappings, and timestamps.</li>
        <li><strong>Destination-Based Delivery:</strong> Delivers frames selectively to the appropriate port when destination location is known.</li>
        <li><strong>STP Compatibility:</strong> Integrates the IEEE 802.1D Spanning Tree Protocol to eliminate fatal forwarding loops in redundant network topologies.</li>
      </ul>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">The Three Pillars of Transparent Bridge Operation</h4>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 my-3 text-xs">
        <div class="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
          <strong class="text-blue-800 dark:text-blue-300 block mb-1"><i class="fa-solid fa-graduation-cap"></i> 1. Learning</strong>
          <p class="text-[11px] text-slate-600 dark:text-slate-400">Observes the source MAC address of every arriving frame and records its incoming port to know where stations reside.</p>
        </div>
        <div class="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
          <strong class="text-emerald-800 dark:text-emerald-300 block mb-1"><i class="fa-solid fa-arrow-right"></i> 2. Forwarding</strong>
          <p class="text-[11px] text-slate-600 dark:text-slate-400">Directs frames destined for a station on another port out through that specific port only.</p>
        </div>
        <div class="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
          <strong class="text-amber-800 dark:text-amber-300 block mb-1"><i class="fa-solid fa-filter"></i> 3. Filtering</strong>
          <p class="text-[11px] text-slate-600 dark:text-slate-400">Discards frames whose destination is located on the same segment as the sender to keep external segments silent.</p>
        </div>
      </div>
    `,
    eli10: "Transparent means invisible. It's like an invisible magic wall that catches tennis balls hit to someone on your side of the net, but lets balls hit to the other side fly right through — without players ever knowing the magic wall is there.",
    analogy: "Like a transparent glass revolving door in an office building: visitors walk in and out naturally without changing how they walk or having to know how the door's automatic sensors work.",
    howItWorks: `
      <p class="text-xs leading-relaxed">The transparent bridge constantly executes an event-driven loop on every arriving frame:</p>
      <ol class="list-decimal pl-5 space-y-1 text-xs">
        <li>A frame is picked up from an interface port.</li>
        <li>The bridge extracts the <strong>Source MAC</strong>. If not present in the table, it adds an entry <code>(Source MAC, Port, Timestamp)</code>. If already present, it refreshes the timestamp.</li>
        <li>The bridge extracts the <strong>Destination MAC</strong>.
          <ul class="list-disc pl-5 mt-1">
            <li>If destination matches a broadcast/multicast address &rarr; Flood.</li>
            <li>If destination is in table with <em>different port</em> &rarr; Forward out that port.</li>
            <li>If destination is in table with <em>same port</em> &rarr; Filter (discard).</li>
            <li>If destination is not in table &rarr; Flood out all ports except arrival port.</li>
          </ul>
        </li>
      </ol>
    `,
    technicalDetails: `
      <p class="text-xs leading-relaxed">Contrast with Token Ring <strong>Source Routing Bridges (SRB)</strong>: In IBM Token Ring networks, end stations were non-transparent; they discovered routes by sending discovery frames and inserted explicit routing information fields (RIF) inside every packet header. Transparent bridging completely conquered the market because it eliminated host protocol complexity.</p>
    `,
    workedExamples: [
      {
        title: "Example: Host Relocation Across Ports",
        difficulty: "Intermediate",
        problem: "Laptop L (MAC: 11:22:33:44:55:66) was plugged into Port 1. The user unplugs it and connects to Port 3. What happens when Laptop L transmits its first frame from Port 3?",
        solution: "1. The frame arrives on Port 3.\n2. The transparent bridge reads the Source MAC: 11:22:33:44:55:66.\n3. It checks its table and finds the old mapping (Port 1).\n4. The bridge immediately updates the entry: Table[11:22:33:44:55:66] = Port 3, resetting the aging timer.\n5. Future frames for Laptop L are now accurately forwarded to Port 3 without network administrator intervention."
      }
    ],
    advantagesLimitations: `
      <table class="wiki-table">
        <thead><tr><th>Transparent Bridging Strengths</th><th>Engineering Challenges</th></tr></thead>
        <tbody>
          <tr><td>Complete plug-and-play; zero host software modification.</td><td>Vulnerable to catastrophic loops in mesh topologies.</td></tr>
          <tr><td>Automatic adaptation to dynamic host additions and mobility.</td><td>Flooding unknown unicasts consumes temporary link bandwidth.</td></tr>
          <tr><td>Isolates local segment errors and signal collisions.</td><td>Cannot partition broadcast domains (requires VLANs / routers).</td></tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "Standard IEEE 802.3 Ethernet Local Area Networks worldwide.",
      "Wi-Fi to Ethernet Access Point Bridging.",
      "Docker Bridge Networking (`docker0` default container network)."
    ],
    quiz: [
      {
        question: "Why is a transparent bridge referred to as 'transparent'?",
        options: ["Because its physical casing is made of clear plastic", "Because connected host computers are completely unaware of its existence", "Because it does not filter or block any frames", "Because it can transmit optical light signals"],
        correct: 1,
        explanation: "It is called transparent because end stations require zero configuration and operate unaware that a bridge is actively segmenting the network."
      }
    ],
    references: [
      { cite: "IEEE Std 802.1D: Media Access Control (MAC) Bridges, IEEE Computer Society.", url: "" },
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, Chapter 15.", url: "" }
    ]
  }
};

// ==========================================
// 4. u2-learning-bridges: Learning Bridges
// ==========================================
TOPICS_U2_SYLLABUS['u2-learning-bridges'] = {
  id: "u2-learning-bridges",
  title: "Learning Bridges",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  level: "Intermediate",
  category: "switching",
  difficulty: "Core",
  readingTime: "20–25 min",
  standard: "Forouzan Ch. 15 / IEEE 802.1D",
  oneLiner: "A bridge that dynamically builds its forwarding table by inspecting source MAC addresses of incoming frames.",
  quickAnswer: "A learning bridge is a bridge that autonomously builds and maintains its forwarding database (FDB) by inspecting the source MAC address and arrival port of incoming frames. It completely eliminates manual table entry by administrators. If a destination address is unknown, it temporarily floods the frame, but as soon as the target replies, the bridge learns its location and switches to precise unicast forwarding.",
  whyItMatters: "Manual entry of MAC addresses in large corporate networks with thousands of dynamic laptops and phones would be impossible to maintain. Self-learning bridges turn network expansion into zero-touch plug-and-play engineering.",
  prerequisitesList: [
    { concept: "Source MAC Address", meaning: "The physical address of the station that generated the frame" },
    { concept: "Forwarding Database (FDB)", meaning: "Lookup table mapping MAC addresses to bridge port interfaces" },
    { concept: "Flooding", meaning: "Forwarding a frame out all ports except the arrival port" }
  ],
  learningObjectives: [
    "Define a learning bridge and its primary automation mechanism.",
    "Explain how inspecting source MAC addresses builds the forwarding database.",
    "Trace the 3-segment bridge example (Ports 1, 2, 3 with MACs AA, BB, CC).",
    "Describe what happens when an entry is missing vs when it has been learned."
  ],
  infobox: {
    layer: "Layer 2 (Data Link Layer)",
    standard: "IEEE 802.1D",
    type: "Self-Learning Protocol",
    prerequisites: ["u2-transparent-bridges", "mac-address"],
    relatedConcepts: ["bridge-learning-process", "forwarding-and-filtering", "cam-table"],
    compareWith: ["static-mac-tables", "routing-tables"],
    primaryUses: ["Enterprise Ethernet Switches, Learning Bridges, Wireless Access Points, Virtual Switches"]
  },
  imageUrl: img3,
  imageCaption: "Figure: Self-Learning Bridge Process: Dynamic MAC Table Construction & Port Mapping (AA, BB, CC).",
  sections: {
    overview: `
      <p class="lead">A <strong>learning bridge</strong> is a bridge that automatically creates and updates its forwarding table by examining the <strong>source MAC addresses</strong> of incoming frames.</p>

      <p>In early network designs, bridges required manual static configuration of device tables. A learning bridge removes this requirement completely: it boots with an empty forwarding table and populates it dynamically as stations transmit data.</p>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">How Does a Learning Bridge Work?</h4>
      <p class="text-xs">Whenever an Ethernet frame arrives on any port:</p>
      <ol class="list-decimal pl-5 space-y-1 text-xs">
        <li><strong>Reads the Source MAC address:</strong> The bridge identifies which device generated the transmission.</li>
        <li><strong>Identifies the arrival port:</strong> The bridge notes the physical port on which the frame was received.</li>
        <li><strong>Stores/Refreshes the entry:</strong> It saves the pair <code>(Source MAC, Port Number)</code> into its forwarding table and restarts the timer.</li>
        <li><strong>Checks the Destination MAC:</strong> It queries the table for the destination address.</li>
        <li><strong>Decides action:</strong> Forwards to target port if known; filters if destination is on arrival port; or floods to all other ports if unknown.</li>
      </ol>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">Concrete Multi-Segment Example from Syllabus</h4>
      <p class="text-xs">Consider a 3-port bridge connecting three distinct LAN segments:</p>
      <div class="overflow-x-auto my-3">
        <table class="wiki-table text-xs">
          <thead><tr class="bg-slate-100 dark:bg-slate-800"><th>MAC Address</th><th>Port</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td><code>AA:AA:AA:AA:AA:AA</code></td><td><strong>Port 1</strong></td><td>Learned dynamically from Segment 1</td></tr>
            <tr><td><code>BB:BB:BB:BB:BB:BB</code></td><td><strong>Port 2</strong></td><td>Learned dynamically from Segment 2</td></tr>
            <tr><td><code>CC:CC:CC:CC:CC:CC</code></td><td><strong>Port 3</strong></td><td>Learned dynamically from Segment 3</td></tr>
          </tbody>
        </table>
      </div>
      <p class="text-xs leading-relaxed">
        If a frame arrives on <strong>Port 1</strong> with source MAC <code>AA:...</code> and destination MAC <code>BB:...</code>:
        <br>&bull; The bridge learns that Station AA is reachable through <strong>Port 1</strong>.
        <br>&bull; It checks its forwarding table for Station BB, finds that BB is on <strong>Port 2</strong>.
        <br>&bull; It forwards the frame directly through <strong>Port 2 only</strong>. Port 3 receives zero traffic!
      </p>
    `,
    eli10: "A learning bridge is like a new receptionist at an office. When someone walks in through Door 1 and says 'Hi, I am Alice', the receptionist writes down 'Alice is at Door 1'. From then on, whenever mail arrives for Alice, the receptionist knows to send it to Door 1.",
    analogy: "Like a postal worker who learns where people live by looking at the return address on envelopes they send out.",
    howItWorks: `
      <p class="text-xs leading-relaxed">A learning bridge performs backward learning:</p>
      <ul class="list-disc pl-5 space-y-1 text-xs">
        <li><strong>Backward Learning:</strong> Bridges never learn from the destination MAC (which only states where the frame is going, not where the destination currently sits). They learn exclusively from the <em>source MAC</em>, which proves beyond doubt that the station is currently located behind that specific port.</li>
        <li><strong>Cold Start (Empty Table):</strong> When powered on, the table is blank. The first few frames are flooded. However, within seconds of normal network operation (e.g., ARP, DHCP, DNS), the table fills and the network operates almost entirely via unicast forwarding.</li>
      </ul>
    `,
    technicalDetails: `
      <p class="text-xs leading-relaxed">Forwarding table scaling and hash collisions:</p>
      <ul class="list-disc pl-5 space-y-1 text-xs">
        <li>Forwarding tables are implemented as <strong>hash tables</strong> in RAM or dedicated <strong>CAM (Content Addressable Memory)</strong> in hardware switches.</li>
        <li>Search time in CAM is $O(1)$ independent of whether the table contains 10 or 100,000 entries.</li>
        <li>Entry capacity: Enterprise switches typically support between 16,000 and 128,000 learned MAC addresses. If table capacity is exceeded, new addresses cause MAC flooding (CAM Table Overflow vulnerability).</li>
      </ul>
    `,
    workedExamples: [
      {
        title: "Example: Cold Start Frame Exchange Sequence",
        difficulty: "Intermediate",
        problem: "A learning bridge connects 3 stations: A on Port 1, B on Port 2, C on Port 3. The table is initially empty. Trace table states and port outputs when:\n1. A sends to B\n2. B replies to A",
        solution: "Step 1: Frame A -> B arrives on Port 1.\n- Bridge learns A is on Port 1. Table: [A: Port 1].\n- Bridge looks up B: Not found! Bridge FLOODS frame out Ports 2 and 3.\n- Station B receives the frame on Port 2 (Station C discards it).\n\nStep 2: Reply B -> A arrives on Port 2.\n- Bridge learns B is on Port 2. Table: [A: Port 1, B: Port 2].\n- Bridge looks up A: Found on Port 1!\n- Bridge FORWARDS frame out Port 1 ONLY. Port 3 receives nothing!\nFlooding is now eliminated for all future communication between A and B."
      }
    ],
    advantagesLimitations: `
      <table class="wiki-table">
        <thead><tr><th>Strengths of Dynamic Learning</th><th>System Challenges</th></tr></thead>
        <tbody>
          <tr><td>Zero manual configuration; pure plug-and-play.</td><td>Initial frames undergo flooding before addresses are learned.</td></tr>
          <tr><td>Automatically accommodates topology changes and cable swaps.</td><td>MAC table flooding attacks (CAM overflow) can force a switch into hub mode.</td></tr>
          <tr><td>Maintains optimal local forwarding tables per switch.</td><td>Requires aging timers to purge inactive or disconnected devices.</td></tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "All standard commercial Ethernet switches (Cisco, Juniper, HPE, Netgear).",
      "Software SDN switches (Open vSwitch, Linux Bridge).",
      "Enterprise Wi-Fi controller AP client tracking."
    ],
    quiz: [
      {
        question: "Which address field in an Ethernet frame does a learning bridge use to populate its forwarding database?",
        options: ["Destination MAC address", "Source MAC address", "Destination IP address", "Frame Check Sequence"],
        correct: 1,
        explanation: "A learning bridge inspects the Source MAC address, because it confirms that the transmitting device is connected to the receiving port."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, Chapter 15.1.", url: "" },
      { cite: "Cisco Networking Academy: CCNA Switching Essentials — MAC Address Table Operations.", url: "" }
    ]
  }
};

// ==========================================
// 5. u2-bridge-learning-process: Bridge Learning Process & Algorithm
// ==========================================
TOPICS_U2_SYLLABUS['u2-bridge-learning-process'] = {
  id: "u2-bridge-learning-process",
  title: "Bridge Learning Process",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  level: "Intermediate",
  category: "switching",
  difficulty: "Core",
  readingTime: "20–25 min",
  standard: "IEEE 802.1D / Forouzan Ch. 15",
  oneLiner: "The formal algorithmic rules governing MAC address table insertion, refresh, lookup, and aging timer eviction.",
  quickAnswer: "The Bridge Learning Process is the formal algorithmic routine that executes on every frame arrival: the bridge reads Source MAC S on arrival port P and updates Table[S] = P with a refreshed aging timer; then it looks up Destination MAC D: if D is on another port, it forwards; if D is on port P, it filters; if D is unknown or broadcast, it floods out all other ports.",
  whyItMatters: "Understanding the exact pseudocode and decision tree of the bridge learning algorithm is essential for computer networks students to solve forwarding trace problems, analyze network captures in Wireshark, and prevent Layer 2 security vulnerabilities.",
  prerequisitesList: [
    { concept: "Forwarding Table", meaning: "Internal hash map containing (MAC, Port, AgingTimer) tuples" },
    { concept: "Aging Timer", meaning: "Countdown timer (typically 300s) after which inactive entries are deleted" },
    { concept: "Filter vs Flood", meaning: "Discarding local traffic vs copying unknown traffic to all other ports" }
  ],
  learningObjectives: [
    "State the formal bridge learning algorithm for frame ingress at port P.",
    "Trace and write the standard algorithmic pseudocode.",
    "Explain the 4 condition-action decision rules for destination forwarding.",
    "Describe the function and operational necessity of the MAC address aging timer."
  ],
  infobox: {
    layer: "Layer 2 (Data Link Layer)",
    standard: "IEEE 802.1D",
    type: "Formal Algorithm",
    prerequisites: ["u2-learning-bridges"],
    relatedConcepts: ["forwarding-and-filtering", "cam-table-aging", "cam-overflow"],
    compareWith: ["dijkstra-routing-algorithm", "distance-vector"],
    primaryUses: ["Switching ASIC microcode, software bridge kernel drivers, network simulation tools"]
  },
  imageUrl: img3,
  imageCaption: "Figure: Bridge Learning Algorithm: Source Address Table Insertion and Aging Timer Lifecycle.",
  sections: {
    overview: `
      <p class="lead">The <strong>Bridge Learning Algorithm</strong> is the formal algorithmic procedure used by bridges and switches to automatically identify and maintain the port connected to each network device.</p>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">The Standard Learning & Forwarding Algorithm</h4>
      <p class="text-xs">When a frame arrives on port <code>P</code>:</p>
      <ol class="list-decimal pl-5 space-y-1 text-xs">
        <li>Read the source MAC address <code>S</code>.</li>
        <li>Store or update the table entry for <code>S</code> with port <code>P</code>, resetting its aging timer.</li>
        <li>Read the destination MAC address <code>D</code>.</li>
        <li>Search for <code>D</code> in the forwarding table.</li>
        <li>Apply the condition-action decision rules:</li>
      </ol>

      <div class="overflow-x-auto my-3">
        <table class="wiki-table text-xs">
          <thead><tr class="bg-slate-100 dark:bg-slate-800"><th>Condition</th><th>Action Executed</th></tr></thead>
          <tbody>
            <tr><td><strong>Destination is known on another port ($Q \neq P$)</strong></td><td><strong class="text-emerald-600 dark:text-emerald-400">Forward</strong> through that port $Q$.</td></tr>
            <tr><td><strong>Destination is known on the incoming port ($Q == P$)</strong></td><td><strong class="text-amber-600 dark:text-amber-400">Filter</strong> (drop) the frame.</td></tr>
            <tr><td><strong>Destination is unknown ($D \notin \text{Table}$)</strong></td><td><strong class="text-blue-600 dark:text-blue-400">Flood</strong> to all ports except incoming port $P$.</td></tr>
            <tr><td><strong>Destination is a broadcast address (<code>FF:FF:FF:FF:FF:FF</code>)</strong></td><td><strong class="text-blue-600 dark:text-blue-400">Flood</strong> to all ports except incoming port $P$.</td></tr>
          </tbody>
        </table>
      </div>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">Formal Algorithmic Pseudocode</h4>
      <div class="code-block-wrapper my-2">
        <pre class="bg-slate-900 text-slate-200 p-3 rounded-lg text-xs font-mono">
When a frame arrives on port P:
  S = Source MAC address
  D = Destination MAC address

  // Phase 1: Learn / Update
  ForwardingTable[S] = P
  ResetAgingTimer(S)

  // Phase 2: Forward / Filter / Flood
  if (D is Broadcast OR D is Multicast):
      Flood frame through all ports except P
  else if (D is found in ForwardingTable):
      if (ForwardingTable[D] != P):
          Forward frame through ForwardingTable[D]
      else:
          Discard (Filter) the frame
  else:
      Flood frame through all ports except P
        </pre>
      </div>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">Importance of the MAC Address Aging Timer</h4>
      <p class="text-xs leading-relaxed">
        Real switches never keep learned entries indefinitely. Every entry in the forwarding database is tagged with an <strong>aging timer</strong> (default: <strong>300 seconds / 5 minutes</strong> in Cisco switches).
        <br>&bull; Whenever a frame from <code>S</code> is received, its timer resets to 300s.
        <br>&bull; If a device goes offline or is unplugged, its timer counts down to 0, and the switch silently flushes the entry.
        <br>&bull; If the device is reconnected to a different port, the new frame arrival immediately updates the table with the new port mapping, preventing persistent misdirection.
      </p>
    `,
    eli10: "It's like a computer doing a 2-step chore every time an envelope arrives: Step 1: Note who sent it and where they sit. Step 2: Look up where the recipient sits and hand it over, drop it if they already heard it, or ask everyone if you don't know.",
    analogy: "Like a restaurant hostess who checks people in: 'Table 4 belongs to the Smith family.' If someone arrives asking for the Smiths, she points them straight to Table 4. If nobody sits at Table 4 for 5 hours, she clears the reservation card.",
    howItWorks: `
      <p class="text-xs leading-relaxed">Memory management in learning bridges:</p>
      <ul class="list-disc pl-5 space-y-1 text-xs">
        <li>The table is structured as a hash map indexed by MAC address.</li>
        <li>Entries contain: <code>[MAC: 48 bits, Port: 8 bits, VLAN ID: 12 bits, Type: Dynamic/Static, TTL: 16 bits]</code>.</li>
        <li>An asynchronous timer interrupt decrements the TTL of all dynamic entries once per second. Entries hitting 0 are evicted.</li>
      </ul>
    `,
    technicalDetails: `
      <p class="text-xs leading-relaxed">Edge conditions and failure modes:</p>
      <ul class="list-disc pl-5 space-y-1 text-xs">
        <li><strong>MAC Flapping:</strong> If the switch sees the same MAC address rapidly alternating between Port 1 and Port 2 within milliseconds, it logs a <em>MAC flap notification</em> — a definite indicator of an active Layer 2 switching loop or duplicate NIC hardware address!</li>
        <li><strong>Aging Timer Adjustment:</strong> During Spanning Tree topology recalculations, switches temporarily reduce the aging timer to <code>Forward Delay</code> (15 seconds) to quickly purge obsolete paths.</li>
      </ul>
    `,
    workedExamples: [
      {
        title: "Example: Trace Table Updates and Aging",
        difficulty: "Intermediate",
        problem: "At T=0s, Host X transmits on Port 1. At T=100s, Host X transmits again on Port 1. At T=350s, Host Y transmits to Host X. Assuming a 300s aging timer, describe the bridge's action at T=350s.",
        solution: "- At T=0s: Entry (X: Port 1) is created with timer=300s.\n- At T=100s: Frame arrives from X. Timer resets to 300s (expires at T=400s).\n- At T=350s: Host Y sends to X. The entry for X is still valid (50s remaining before expiration).\n- Therefore, the bridge forwards the frame directly out Port 1 as a unicast. No flooding occurs."
      }
    ],
    advantagesLimitations: `
      <table class="wiki-table">
        <thead><tr><th>Algorithm Strengths</th><th>Engineering Constraints</th></tr></thead>
        <tbody>
          <tr><td>Deterministic $O(1)$ decision complexity.</td><td>Requires memory resources for thousands of MAC table rows.</td></tr>
          <tr><td>Auto-recovering: adapts gracefully when users move cables.</td><td>Aging timers must balance quick adaptation against unnecessary flooding.</td></tr>
          <tr><td>Separates local segment traffic automatically.</td><td>Broadcast and unknown frames still flood throughout the VLAN.</td></tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "Ethernet switch firmware (Cisco IOS, Arista EOS, Junos).",
      "Linux kernel networking subsystem (`net/bridge/br_fdb.c`).",
      "Embedded network adapters and industrial programmable logic controllers."
    ],
    quiz: [
      {
        question: "What is the primary purpose of the MAC address aging timer in a switch?",
        options: ["To encrypt old MAC addresses", "To remove inactive or relocated devices from the forwarding database", "To speed up physical signal propagation", "To reduce power consumption on inactive ports"],
        correct: 1,
        explanation: "The aging timer automatically purges inactive entries so that if a device is disconnected or moved to another port, the switch learns its new location."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, Chapter 15.", url: "" },
      { cite: "IEEE Std 802.1D Section 7.8: The Learning Process.", url: "" }
    ]
  }
};

// ==========================================
// 6. u2-forwarding-and-filtering: Forwarding and Filtering
// ==========================================
TOPICS_U2_SYLLABUS['u2-forwarding-and-filtering'] = {
  id: "u2-forwarding-and-filtering",
  title: "Forwarding and Filtering",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  level: "Intermediate",
  category: "switching",
  difficulty: "Core",
  readingTime: "20–25 min",
  standard: "Forouzan Ch. 15 / IEEE 802.1D",
  oneLiner: "The twin decision mechanisms of bridges: sending frames across ports vs. blocking frames from crossing segments.",
  quickAnswer: "Forwarding and Filtering are the two fundamental operational decisions made by bridges and switches. Forwarding means transmitting a received frame out the specific port leading to its destination station. Filtering means dropping/discarding a frame when its destination resides on the same segment as the sender, preventing local traffic from consuming external bandwidth.",
  whyItMatters: "Filtering is what makes bridging superior to repeaters and hubs. By blocking intra-segment frames from crossing to other cables, bridges conserve overall bandwidth, eliminate remote collisions, and allow simultaneous independent transmissions across different segments.",
  prerequisitesList: [
    { concept: "Forwarding", meaning: "Transmitting a frame out an egress port towards its destination" },
    { concept: "Filtering", meaning: "Discarding a frame because destination is on the ingress segment" },
    { concept: "Collision Domain Isolation", meaning: "Preventing collisions on one segment from impacting another" }
  ],
  learningObjectives: [
    "Differentiate precisely between forwarding, filtering, and flooding.",
    "Explain the specific condition that triggers frame filtering.",
    "Solve port forwarding exercises using MAC-to-port lookup tables.",
    "Evaluate how filtering improves overall LAN aggregate capacity."
  ],
  infobox: {
    layer: "Layer 2 (Data Link Layer)",
    standard: "IEEE 802.1D",
    type: "Switching Decision Logic",
    prerequisites: ["u2-bridge-learning-process"],
    relatedConcepts: ["flooding", "collision-domain", "packet-filtering-firewall"],
    compareWith: ["routing-vs-switching", "layer3-filtering"],
    primaryUses: ["Local LAN traffic isolation, network efficiency optimization, collision reduction"]
  },
  imageUrl: img1,
  imageCaption: "Figure: Frame Forwarding vs. Local Segment Filtering Based on Destination MAC Match.",
  sections: {
    overview: `
      <p class="lead"><strong>Forwarding</strong> and <strong>filtering</strong> are the two foundational decisions executed by bridges and switches to control frame propagation across local networks.</p>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">1. Forwarding</h4>
      <p class="text-xs leading-relaxed">
        <strong>Forwarding</strong> means sending a received frame out through the specific port that leads toward its intended destination station.
        <br><em>Condition:</em> Destination MAC is present in the table, and its mapped port is <strong>different</strong> from the incoming arrival port ($Q \neq P$).
      </p>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">2. Filtering</h4>
      <p class="text-xs leading-relaxed">
        <strong>Filtering</strong> means preventing a frame from being forwarded across the bridge when the destination station is reachable through the very same port/segment on which the frame arrived.
        <br><em>Condition:</em> Destination MAC is present in the table, and its mapped port is <strong>identical</strong> to the incoming arrival port ($Q == P$).
        <br><em>Action:</em> The bridge quietly drops the frame from its buffer. Why? Because on a shared physical segment (or hub), the recipient station has already received the electrical signal directly over the wire!
      </p>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">3. Flooding</h4>
      <p class="text-xs leading-relaxed">
        <strong>Flooding</strong> occurs when the destination MAC address is unknown (not present in the table) or is the broadcast address. The switch replicates and transmits the frame out through all relevant ports except the port on which it arrived.
      </p>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">Detailed Example from Syllabus</h4>
      <p class="text-xs">Suppose a bridge maintains the following forwarding table:</p>
      <div class="overflow-x-auto my-3">
        <table class="wiki-table text-xs">
          <thead><tr class="bg-slate-100 dark:bg-slate-800"><th>MAC Address</th><th>Port</th></tr></thead>
          <tbody>
            <tr><td><code>MAC-A</code></td><td>Port 1</td></tr>
            <tr><td><code>MAC-B</code></td><td>Port 2</td></tr>
            <tr><td><code>MAC-C</code></td><td>Port 3</td></tr>
          </tbody>
        </table>
      </div>
      <ul class="list-disc pl-5 space-y-1.5 text-xs">
        <li><strong>Forwarding Case:</strong> A frame arrives on <strong>Port 1</strong> destined for <code>MAC-B</code>. The bridge inspects its table, sees MAC-B on Port 2 ($2 \neq 1$), and forwards the frame out <strong>Port 2</strong>.</li>
        <li><strong>Filtering Case:</strong> A frame arrives on <strong>Port 1</strong> destined for <code>MAC-A</code>. The table shows MAC-A is on Port 1 ($1 == 1$). The bridge <strong>filters (discards)</strong> the frame. No transmission occurs on Ports 2 or 3!</li>
      </ul>
    `,
    eli10: "Forwarding is opening the door because the person lives in the next room. Filtering is keeping the door shut because the person is already standing in the same room with you.",
    analogy: "Like a soundproof divider in a large conference hall. If two people at Table 1 whisper to each other, the soundproof partition blocks the sound from disturbing Table 2 (filtering). If someone at Table 1 calls for someone at Table 2, the partition door opens to let the message through (forwarding).",
    howItWorks: `
      <p class="text-xs leading-relaxed">Decision logic comparison:</p>
      <table class="wiki-table text-xs">
        <thead><tr><th>Scenario</th><th>Input Port</th><th>Dest Port in Table</th><th>Bridge Decision</th></tr></thead>
        <tbody>
          <tr><td>Sender & Receiver on different ports</td><td>Port 1</td><td>Port 3</td><td><strong>FORWARD</strong> to Port 3</td></tr>
          <tr><td>Sender & Receiver on same segment</td><td>Port 2</td><td>Port 2</td><td><strong>FILTER</strong> (drop frame)</td></tr>
          <tr><td>Receiver location not in table</td><td>Port 1</td><td>Not Found</td><td><strong>FLOOD</strong> to Ports 2, 3, 4...</td></tr>
          <tr><td>Broadcast frame (FF:FF:FF:FF:FF:FF)</td><td>Port 1</td><td>All Ports</td><td><strong>FLOOD</strong> to Ports 2, 3, 4...</td></tr>
        </tbody>
      </table>
    `,
    technicalDetails: `
      <p class="text-xs leading-relaxed">Hardware implementation:</p>
      <ul class="list-disc pl-5 space-y-1 text-xs">
        <li>In modern ASIC switches, forwarding and filtering decisions occur in hardware within nanoseconds using an egress port bitmask.</li>
        <li>If an ingress frame is filtered, the buffer pointer is returned to the free pool without transmitting any electrical bits.</li>
      </ul>
    `,
    workedExamples: [
      {
        title: "Example: Solving Solved Examples 2 & 3 from Syllabus",
        difficulty: "Beginner",
        problem: "Given forwarding table: [A: P1, B: P2, C: P3].\n1. Frame arrives on P1 with Dest B. What action occurs?\n2. Frame arrives on P2 with Dest C, but the table actually shows C is on P2. What action occurs?",
        solution: "1. Frame arrives on P1 with Dest B. Table lookup maps B to P2. Since P2 != P1, the switch FORWARDS the frame through Port 2 only.\n2. Frame arrives on P2 with Dest C. Table shows C is on P2. Since destination port P2 == arrival port P2, the switch FILTERS the frame because Station C already received it directly over the local wire."
      }
    ],
    advantagesLimitations: `
      <table class="wiki-table">
        <thead><tr><th>Filtering Benefits</th><th>Network Trade-offs</th></tr></thead>
        <tbody>
          <tr><td>Saves massive bandwidth by containing local traffic.</td><td>Requires processing every incoming frame header.</td></tr>
          <tr><td>Enables concurrent simultaneous conversations in other segments.</td><td>Does not filter broadcast frames (all broadcasts cross).</td></tr>
          <tr><td>Enhances security by not leaking local frames to other ports.</td><td>Misconfigured tables can cause false drops until re-learned.</td></tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "Ethernet switch port forwarding engines.",
      "Wireless LAN client isolation features in Wi-Fi APs.",
      "VLAN boundary traffic segmenting in enterprise campus networks."
    ],
    quiz: [
      {
        question: "When does an Ethernet bridge filter a received frame?",
        options: ["When the destination MAC address is unknown", "When the destination station is located on the same port as the incoming frame", "When the frame payload exceeds 1500 bytes", "When the frame arrives from an unauthorized IP address"],
        correct: 1,
        explanation: "The bridge filters the frame when the destination station is on the incoming port, preventing unnecessary duplicate transmission across other segments."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, Chapter 15.", url: "" },
      { cite: "IEEE Std 802.1D Section 7.7: The Forwarding Process.", url: "" }
    ]
  }
};

// ==========================================
// 7. u2-bridge-flooding: Flooding
// ==========================================
TOPICS_U2_SYLLABUS['u2-bridge-flooding'] = {
  id: "u2-bridge-flooding",
  title: "Flooding",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  level: "Intermediate",
  category: "switching",
  difficulty: "Core",
  readingTime: "15–20 min",
  standard: "Forouzan Ch. 15 / IEEE 802.1D",
  oneLiner: "The broadcasting fallback mechanism of forwarding a frame out all active switch ports except the arrival port.",
  quickAnswer: "Flooding is a Data Link Layer forwarding behavior where a switch replicates an incoming frame and transmits a copy out of every active port except the port on which the frame arrived. Flooding occurs under two specific circumstances: (1) Unknown Unicast frames where the destination MAC is not yet learned in the forwarding table, and (2) Broadcast or Multicast frames (such as ARP requests).",
  whyItMatters: "Flooding guarantees that frames reach their destination even when the switch has zero prior knowledge of where the destination lives. However, if redundant physical loops exist, uncontrolled flooding creates catastrophic broadcast storms that crash entire networks within seconds.",
  prerequisitesList: [
    { concept: "Unknown Unicast", meaning: "A frame addressed to a single host whose MAC is absent from the FDB" },
    { concept: "Broadcast Address", meaning: "48-bit address FF:FF:FF:FF:FF:FF destined for every station in the LAN" },
    { concept: "Broadcast Domain", meaning: "The set of all network ports that receive a flooded broadcast frame" }
  ],
  learningObjectives: [
    "Define flooding and identify the two primary triggers for flooded frames.",
    "Explain why incoming arrival ports are strictly excluded from flooding.",
    "Contrast unknown unicast flooding with broadcast frame flooding.",
    "Analyze the operational risks of uncontrolled flooding and broadcast storms."
  ],
  infobox: {
    layer: "Layer 2 (Data Link Layer)",
    standard: "IEEE 802.1D",
    type: "Forwarding Behavior",
    prerequisites: ["u2-forwarding-and-filtering"],
    relatedConcepts: ["broadcast-storm", "spanning-tree-protocol", "vlan", "arp"],
    compareWith: ["multicast-pruning", "unicast-forwarding"],
    primaryUses: ["Resolving ARP requests, initial station discovery, broadcast announcements, DHCP discovery"]
  },
  imageUrl: img1,
  imageCaption: "Figure: Unknown Unicast and Broadcast Flooding across Non-Ingress Ports.",
  sections: {
    overview: `
      <p class="lead"><strong>Flooding</strong> occurs when a bridge or switch replicates an incoming data frame and transmits it through <strong>all active ports except the incoming port</strong> on which the frame was received.</p>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">When Does Flooding Occur?</h4>
      <p class="text-xs">A switch triggers flooding under two fundamental conditions:</p>
      <ul class="list-disc pl-5 space-y-1.5 text-xs">
        <li><strong>1. Unknown Destination (Unknown Unicast):</strong> The incoming frame has a unicast destination MAC address, but the switch has never seen this MAC before (or its entry expired from the aging timer). The switch must flood to ensure delivery.</li>
        <li><strong>2. Broadcast / Multicast Address:</strong> The frame is explicitly addressed to the Layer 2 broadcast address (<code>FF:FF:FF:FF:FF:FF</code>) or a multicast group. Every station in the broadcast domain (or VLAN) is expected to receive it.</li>
      </ul>

      <div class="wiki-callout note my-3">
        <div class="callout-header"><i class="fa-solid fa-circle-question"></i> Why is the Incoming Port Excluded?</div>
        <p class="text-xs">The incoming port is excluded (<em>split horizon principle</em>) because the sender and all other stations on that local physical segment have already received the electrical transmission directly. Sending it back would cause echo interference and waste bandwidth.</p>
      </div>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">Concrete Syllabus Example (Unknown Destination)</h4>
      <p class="text-xs leading-relaxed">
        Consider a switch with ports P1, P2, and P3:
        <br>&bull; A frame arrives on <strong>Port 3</strong> with Destination MAC <code>DD:DD:DD:DD:DD:DD</code>.
        <br>&bull; The switch queries its table: Destination MAC <code>DD:...</code> is <strong>not found</strong>!
        <br>&bull; <em>Action:</em> The switch updates its table with the frame's source address on Port 3, and then <strong>floods the frame out through Port 1 and Port 2</strong>.
      </p>
    `,
    eli10: "If the mail carrier arrives at a 4-house cul-de-sac with a letter for 'Bob', and has never met Bob before, they knock on doors 2, 3, and 4 asking 'Are you Bob?' Once Bob answers, the mail carrier remembers where he lives and never has to knock on all doors again.",
    analogy: "Like paging someone over a school intercom: when the office doesn't know which classroom a student is currently in, they announce the name school-wide so the student can respond.",
    howItWorks: `
      <p class="text-xs leading-relaxed">The lifecycle of an unknown unicast flood:</p>
      <ol class="list-decimal pl-5 space-y-1 text-xs">
        <li>Host A sends a frame to Host B. Host B's MAC is not in the switch table.</li>
        <li>Switch floods the frame out all other ports.</li>
        <li>Host C and Host D receive the frame, check the destination MAC, see it doesn't match their NIC address, and silently discard it.</li>
        <li>Host B receives the frame, matches its NIC MAC, processes the payload, and sends a reply frame back to Host A.</li>
        <li>The reply frame enters the switch! The switch instantly reads Host B's Source MAC and records its port.</li>
        <li>From this exact millisecond forward, flooding stops: all traffic between A and B is switched via direct unicast!</li>
      </ol>
    `,
    technicalDetails: `
      <p class="text-xs leading-relaxed">VLAN boundaries and flooding containment:</p>
      <ul class="list-disc pl-5 space-y-1 text-xs">
        <li><strong>VLAN Isolation:</strong> Flooding is strictly bounded by the active <strong>VLAN (Virtual Local Area Network)</strong>. Broadcast or unknown frames received on a Port assigned to VLAN 10 are only flooded out ports belonging to VLAN 10.</li>
        <li><strong>Security Risk (MAC Flooding Attack):</strong> Attackers use tools like <code>macof</code> to flood thousands of fake source MAC addresses into a switch. When the CAM table fills up, the switch fails open and begins flooding every packet to all ports, turning the switch into a dumb hub and allowing eavesdropping!</li>
      </ul>
    `,
    workedExamples: [
      {
        title: "Example: Solving Solved Examples 1 & 4 from Syllabus",
        difficulty: "Beginner",
        problem: "1. Switch has ports P1, P2, P3. Frame arrives on P1 with Source A, Destination B. Destination B is unknown. What happens?\n2. Frame arrives on P3 with Dest D. D is not in MAC table. What happens?",
        solution: "1. The switch learns Source A -> Port 1. Since Destination B is unknown, it FLOODS the frame through Port 2 and Port 3 (all ports except incoming P1).\n2. The switch learns the source address on Port 3. Since Destination D is not in the table, it FLOODS the frame through all relevant ports except incoming P3 (i.e., Ports 1 and 2)."
      }
    ],
    advantagesLimitations: `
      <table class="wiki-table">
        <thead><tr><th>Flooding Advantages</th><th>Flooding Hazards</th></tr></thead>
        <tbody>
          <tr><td>Guarantees packet delivery without prior topology knowledge.</td><td>Consumes link bandwidth and CPU cycles on all non-target hosts.</td></tr>
          <tr><td>Essential for bootstrap protocols (DHCP, ARP, mDNS).</td><td>Can cause catastrophic broadcast storms if switching loops exist.</td></tr>
          <tr><td>Allows seamless self-learning of newly connected devices.</td><td>Exploitable via MAC flooding / CAM table overflow attacks.</td></tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "Address Resolution Protocol (ARP) IP-to-MAC resolution broadcasts.",
      "DHCP Discover client broadcast requests.",
      "Initial unicast frame exchanges prior to CAM table learning."
    ],
    quiz: [
      {
        question: "What does an Ethernet switch do when it receives a frame addressed to an unknown unicast MAC address?",
        options: ["It drops the frame immediately and sends an ICMP error", "It sends the frame only back to the sending port", "It floods the frame out all ports except the arrival port", "It routes the frame to the default gateway"],
        correct: 2,
        explanation: "The switch floods the frame out all ports except the arrival port so that the unknown destination can receive it and reply."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, Chapter 15.", url: "" },
      { cite: "Andrew S. Tanenbaum, Computer Networks, 6th Edition, Chapter 4.", url: "" }
    ]
  }
};

// ==========================================
// 8. u2-spanning-tree-protocol: Spanning Tree Protocol (STP)
// ==========================================
TOPICS_U2_SYLLABUS['u2-spanning-tree-protocol'] = {
  id: "u2-spanning-tree-protocol",
  title: "Spanning Tree Protocol (STP)",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  level: "Advanced",
  category: "switching",
  difficulty: "Core",
  readingTime: "30–35 min",
  standard: "IEEE 802.1D / IEEE 802.1w",
  oneLiner: "A Layer 2 protocol that prevents switching loops and broadcast storms by disabling redundant paths while maintaining backup availability.",
  quickAnswer: "The Spanning Tree Protocol (STP, standardized as IEEE 802.1D) is a foundational Layer 2 protocol designed by Radia Perlman that creates a loop-free logical topology in switched Ethernet networks. Redundant physical connections are necessary to prevent single points of failure, but redundant Layer 2 links create catastrophic broadcast loops, duplicate frames, and MAC table thrashing. STP solves this by electing a Root Bridge, calculating shortest paths, and dynamically placing redundant ports into a Blocked state.",
  whyItMatters: "Unlike Layer 3 IP packets which have a Time-To-Live (TTL) hop counter that terminates looping packets, standard Layer 2 Ethernet frames have NO TTL field! A looping Ethernet frame will circulate forever at wire speed, multiplying exponentially until the entire enterprise network collapses. STP is the ultimate safeguard against this fatal vulnerability.",
  prerequisitesList: [
    { concept: "Switching Loop", meaning: "A physical ring or redundant path between bridges that allows frames to cycle infinitely" },
    { concept: "Broadcast Storm", meaning: "Exponential multiplication of looping broadcast frames saturating 100% of network capacity" },
    { concept: "Bridge Protocol Data Unit (BPDU)", meaning: "Special control frames exchanged by bridges every 2 seconds to calculate the spanning tree" }
  ],
  learningObjectives: [
    "Explain why Layer 2 switching loops cause catastrophic network collapse (broadcast storms, duplicate frames, MAC table flapping).",
    "Identify why Ethernet frames cannot self-terminate loops (absence of a TTL field).",
    "Describe the 5 core STP terms: Root Bridge, Root Port, Designated Port, Blocked Port, BPDU.",
    "Trace the STP tree calculation process and port state transitions.",
    "Evaluate the benefits and convergence characteristics of IEEE 802.1D Spanning Tree."
  ],
  infobox: {
    layer: "Layer 2 (Data Link Layer)",
    standard: "IEEE 802.1D / IEEE 802.1w (RSTP)",
    type: "Loop Prevention Protocol",
    prerequisites: ["u2-bridges-overview", "dll-switching"],
    relatedConcepts: ["bpdu", "root-bridge", "designated-port", "rstp-802-1w", "broadcast-storm"],
    compareWith: ["trill", "shortest-path-bridging-802-1aq", "ip-ttl"],
    primaryUses: ["Enterprise redundant switched topologies, data center leaf-spine fabrics, campus backbone switches"]
  },
  imageUrl: img4,
  imageCaption: "Figure: Spanning Tree Protocol (IEEE 802.1D): Root Bridge Election, Designated Ports, and Loop Elimination via Blocked Ports.",
  sections: {
    overview: `
      <p class="lead">The <strong>Spanning Tree Protocol (STP)</strong> is a standardized Layer 2 protocol (<strong>IEEE 802.1D</strong>) invented by Dr. Radia Perlman that creates a loop-free logical topology in switched Ethernet networks containing redundant physical cabling.</p>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">Why are Switching Loops a Fatal Problem?</h4>
      <p class="text-xs">Network engineers intentionally deploy redundant switches and dual cables between racks to provide backup paths against hardware failure. However, without STP, these physical loops create catastrophic Layer 2 hazards:</p>

      <div class="wiki-callout alert my-3">
        <div class="callout-header"><i class="fa-solid fa-triangle-exclamation"></i> The Fundamental Flaw: No Time-to-Live (TTL) in Ethernet!</div>
        <p class="text-xs">While Layer 3 IPv4 and IPv6 packets contain a TTL / Hop Limit field that decrements at every router and discards packets after a loop, <strong>standard Layer 2 Ethernet frames have NO TTL field</strong>! Once an Ethernet frame begins circulating around a switch loop, it will circulate indefinitely until switches are powered off.</p>
      </div>

      <p class="text-xs font-bold text-slate-800 dark:text-slate-200 mt-3 mb-1">A Layer 2 switching loop causes three fatal failures:</p>
      <ul class="list-disc pl-5 space-y-1.5 text-xs">
        <li><strong>1. Broadcast Storms:</strong> When a broadcast frame (e.g., an ARP request) enters a loop, every switch floods it out all ports. The frame is re-received, re-flooded, and multiplies exponentially. Within seconds, link utilization hits 100%, device CPUs freeze, and all legitimate network communication drops.</li>
        <li><strong>2. Multiple Frame Duplication:</strong> Unicast frames with destinations unknown to the switches are flooded endlessly, causing the recipient station to receive thousands of duplicate copies of the same packet.</li>
        <li><strong>3. MAC Address Table Instability (Flapping / Thrashing):</strong> As copies of a frame arrive at Switch A from Port 1 and Port 2 alternately every microsecond, the switch continuously overwrites the port entry for that MAC address, destroying the forwarding database.</li>
      </ul>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">Important STP Terminology</h4>
      <div class="overflow-x-auto my-3">
        <table class="wiki-table text-xs">
          <thead><tr class="bg-slate-100 dark:bg-slate-800"><th>Term</th><th>Technical Meaning & Function</th></tr></thead>
          <tbody>
            <tr><td><strong>Root Bridge</strong></td><td>The central logical reference bridge of the network, elected because it has the <em>lowest Bridge ID (BID = Priority + MAC)</em>.</td></tr>
            <tr><td><strong>Root Port (RP)</strong></td><td>On every non-root bridge, the single port that provides the lowest cumulative path cost to reach the Root Bridge. Always in Forwarding state.</td></tr>
            <tr><td><strong>Designated Port (DP)</strong></td><td>On each network segment, the port that has the lowest path cost to the Root Bridge. Forwards traffic for that segment. Always in Forwarding state.</td></tr>
            <tr><td><strong>Blocked Port (Alternate)</strong></td><td>A redundant port prevented from forwarding ordinary user data frames to break the physical loop. Drops all user traffic but continues listening to BPDUs.</td></tr>
            <tr><td><strong>BPDU (Bridge Protocol Data Unit)</strong></td><td>Special control frames exchanged by switches every 2 seconds to exchange bridge priority, root path costs, and topology change notices.</td></tr>
          </tbody>
        </table>
      </div>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">How STP Works (The 5-Step Process)</h4>
      <ol class="list-decimal pl-5 space-y-1 text-xs">
        <li><strong>Electing a Root Bridge:</strong> Switches exchange BPDUs. The switch with the lowest Bridge Priority (default: 32768, configurable in steps of 4096) and lowest MAC address becomes the Root Bridge.</li>
        <li><strong>Selecting Root Ports:</strong> Each non-root switch determines which of its ports has the lowest cumulative link cost to the Root Bridge (e.g., 100M cost=19, 1G cost=4, 10G cost=2).</li>
        <li><strong>Selecting Designated Ports:</strong> On every link segment, one switch port is chosen to forward traffic. All ports on the Root Bridge are Designated Ports.</li>
        <li><strong>Blocking Redundant Paths:</strong> All remaining ports that are neither Root Ports nor Designated Ports are placed into the <strong>BLOCKED state</strong>, breaking all loops!</li>
        <li><strong>Automatic Recalculation on Topology Change:</strong> If an active cable is severed, the blocked port detects the loss of BPDUs and transitions to Forwarding state, restoring connectivity.</li>
      </ol>
    `,
    eli10: "STP is like a team of firefighters creating a tree map of a building with multiple circular hallways. To prevent people from running around in endless circles during an evacuation, the firefighters padlock one door. If another hallway collapses, they immediately unlock the padlocked door.",
    analogy: "Like a tree in nature: a tree has branches that spread out in every direction, but branches never loop back into each other to form a closed ring. STP prunes closed loops so network links resemble a single tree branching out from a root trunk.",
    howItWorks: `
      <p class="text-xs leading-relaxed">IEEE 802.1D Port State Progression (Total Convergence Time = 30–50 seconds):</p>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-2 my-2 text-xs font-mono">
        <div class="p-2 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
          <span class="font-bold text-slate-700 dark:text-slate-300 block">1. Blocking</span>
          <span class="text-[10px] text-slate-500 font-sans">Drops user data; receives BPDUs only.</span>
        </div>
        <div class="p-2 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800">
          <span class="font-bold text-amber-800 dark:text-amber-300 block">2. Listening (15s)</span>
          <span class="text-[10px] text-amber-700 dark:text-amber-400 font-sans">Processes BPDUs; no MAC learning or forwarding.</span>
        </div>
        <div class="p-2 rounded bg-blue-50 dark:bg-blue-950/40 border border-blue-300 dark:border-blue-800">
          <span class="font-bold text-blue-800 dark:text-blue-300 block">3. Learning (15s)</span>
          <span class="text-[10px] text-blue-700 dark:text-blue-400 font-sans">Learns MAC addresses into FDB; no data forwarding.</span>
        </div>
        <div class="p-2 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800">
          <span class="font-bold text-emerald-800 dark:text-emerald-300 block">4. Forwarding</span>
          <span class="text-[10px] text-emerald-700 dark:text-emerald-400 font-sans">Fully operational; forwards data frames and BPDUs.</span>
        </div>
      </div>
    `,
    technicalDetails: `
      <p class="text-xs leading-relaxed">Bridge ID (BID) and Path Costs:</p>
      <ul class="list-disc pl-5 space-y-1 text-xs">
        <li><strong>Bridge ID Format (8 bytes):</strong> 2-byte Bridge Priority (typically 32768 + VLAN ID in PVST+) + 6-byte Switch Base MAC Address.</li>
        <li><strong>Standard IEEE Path Costs:</strong> 10 Mbps = 100, 100 Mbps = 19, 1 Gbps = 4, 10 Gbps = 2.</li>
        <li><strong>Evolution:</strong> Legacy 802.1D took 30–50 seconds to converge. <strong>Rapid Spanning Tree Protocol (RSTP - IEEE 802.1w)</strong> reduced convergence to under 1 second using explicit handshakes (Proposal/Agreement) instead of timers.</li>
      </ul>
    `,
    workedExamples: [
      {
        title: "Example: 3-Switch Triangle Root Election & Port Roles",
        difficulty: "Advanced",
        problem: "Three switches (SW1, SW2, SW3) form a triangle with 1 Gbps links (Cost = 4).\n- SW1: Priority 4096, MAC 00:01\n- SW2: Priority 32768, MAC 00:02\n- SW3: Priority 32768, MAC 00:03\nIdentify: 1. Root Bridge, 2. Root Ports on SW2 and SW3, 3. Which port is blocked?",
        solution: "1. Root Bridge Election: SW1 has priority 4096 (lower than 32768). SW1 is elected ROOT BRIDGE. All ports on SW1 become Designated Ports (Forwarding).\n\n2. Root Ports: SW2's direct link to SW1 has cost 4 (via Port 1). SW3's direct link to SW1 has cost 4 (via Port 1). Thus, Port 1 on SW2 and Port 1 on SW3 become ROOT PORTS.\n\n3. Redundant Link (SW2 to SW3): SW2 and SW3 both have path cost 4 to the Root Bridge. Tiebreaker is lower Bridge ID: SW2 has MAC 00:02 which is lower than SW3's MAC 00:03. Therefore, SW2's port becomes Designated, and SW3's port is placed into the BLOCKED state, breaking the loop!"
      }
    ],
    advantagesLimitations: `
      <table class="wiki-table">
        <thead><tr><th>STP Advantages</th><th>STP Limitations</th></tr></thead>
        <tbody>
          <tr><td>Completely prevents catastrophic broadcast storms and MAC thrashing.</td><td>Blocked links represent unused bandwidth during normal operation.</td></tr>
          <tr><td>Enables physical cable and switch redundancy for high availability.</td><td>Legacy 802.1D convergence is slow (30 to 50 seconds outage).</td></tr>
          <tr><td>Autonomous failover: unlocks backup paths if a primary link fails.</td><td>Misconfigured bridge priorities can cause suboptimal traffic paths.</td></tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "Enterprise Switched Networks: Cisco Per-VLAN Spanning Tree Plus (PVST+ / R-PVST+).",
      "Data Center Networks: Multiple Spanning Tree Protocol (MSTP - IEEE 802.1s).",
      "Carrier Ethernet: Protecting ring topologies in metropolitan access networks."
    ],
    quiz: [
      {
        question: "What is the primary danger that the Spanning Tree Protocol (STP) prevents in Ethernet networks?",
        options: ["IP address exhaustion", "Layer 2 broadcast storms caused by switching loops", "TCP SYN flood attacks", "Optical signal attenuation"],
        correct: 1,
        explanation: "STP prevents Layer 2 switching loops, which cause broadcast storms, duplicate frames, and MAC address table thrashing."
      },
      {
        question: "Which switch is chosen as the Root Bridge in an IEEE 802.1D STP network?",
        options: ["The switch with the highest IP address", "The switch with the lowest Bridge ID (Priority + MAC)", "The switch with the largest number of connected ports", "The switch that boots up first"],
        correct: 1,
        explanation: "The switch with the lowest Bridge ID (composed of Bridge Priority and Base MAC address) is elected Root Bridge."
      }
    ],
    references: [
      { cite: "IEEE Std 802.1D: Media Access Control (MAC) Bridges and Spanning Tree Protocol.", url: "" },
      { cite: "Radia Perlman, 'An Algorithm for Distributed Computation of a Spanning Tree in an Extended LAN', ACM SIGCOMM.", url: "" },
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, Chapter 15.2.", url: "" }
    ]
  }
};

// ==========================================
// 9. u2-bridges-vs-switches: Bridges vs Switches
// ==========================================
TOPICS_U2_SYLLABUS['u2-bridges-vs-switches'] = {
  id: "u2-bridges-vs-switches",
  title: "Bridges vs Switches",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  level: "Beginner",
  category: "switching",
  difficulty: "Core",
  readingTime: "20–25 min",
  standard: "Forouzan Ch. 15 / Tanenbaum Ch. 4",
  oneLiner: "The architectural comparison between software-based 2-port bridges and modern hardware-based multi-port ASIC switches.",
  quickAnswer: "Both bridges and switches operate primarily at the Data Link Layer (Layer 2) and use MAC addresses to forward frames. However, they differ radically in architecture, port density, and performance: a bridge is typically a software-driven device with 2 to 4 ports connecting LAN segments, whereas a modern switch is a high-performance multiport bridge implemented in dedicated hardware ASICs, providing dedicated collision-free bandwidth to dozens or hundreds of ports simultaneously.",
  whyItMatters: "Understanding the distinction between bridges and switches clarifies the history of Local Area Networking and highlights why modern high-speed campus networks and cloud data centers rely exclusively on wire-speed ASIC switching fabrics.",
  prerequisitesList: [
    { concept: "Layer 2 Forwarding", meaning: "Transmitting frames based on 48-bit MAC addresses" },
    { concept: "ASIC Hardware", meaning: "Application-Specific Integrated Circuits for wire-speed packet processing" },
    { concept: "Multiport Architecture", meaning: "A switch design where every single port has its own dedicated MAC controller" }
  ],
  learningObjectives: [
    "Compare bridges and switches across all 8 standard technical dimensions.",
    "Explain the famous architectural dictum: 'A switch is a high-performance multiport bridge'.",
    "Analyze the advantages and disadvantages of Data Link Layer switching.",
    "Evaluate solved exam comparison problems."
  ],
  infobox: {
    layer: "Layer 2 (Data Link Layer)",
    standard: "IEEE 802.3 / IEEE 802.1D",
    type: "Hardware & Architectural Comparison",
    prerequisites: ["u2-bridges-overview", "dll-switching"],
    relatedConcepts: ["asic-forwarding", "collision-domains", "microsegmentation"],
    compareWith: ["routers-vs-switches", "hubs-vs-switches"],
    primaryUses: ["Campus network design, device selection, data center fabric engineering, computer science exam preparation"]
  },
  imageUrl: img2,
  imageCaption: "Figure: Structural Comparison: Legacy Software Bridges vs. Modern High-Density Hardware Switches.",
  sections: {
    overview: `
      <p class="lead">Both <strong>bridges</strong> and <strong>switches</strong> operate primarily at the <strong>Data Link Layer (Layer 2)</strong> of the OSI model and use MAC addresses to make intelligent forwarding decisions. However, they differ significantly in design, performance, and application.</p>

      <div class="wiki-callout note my-3">
        <div class="callout-header"><i class="fa-solid fa-quote-left"></i> The Core Identity</div>
        <p class="text-xs"><strong>"A switch can be understood as a high-performance multiport bridge."</strong><br>Every modern Ethernet switch is fundamentally a bridge whose forwarding logic has been cast into silicon ASICs across dozens of parallel ports.</p>
      </div>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">Comprehensive Comparison Table (From Syllabus)</h4>
      <div class="overflow-x-auto my-3">
        <table class="wiki-table text-xs">
          <thead>
            <tr class="bg-slate-100 dark:bg-slate-800">
              <th>Feature</th>
              <th>Bridge</th>
              <th>Switch</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><strong>OSI Layer</strong></td><td>Layer 2 (Data Link Layer)</td><td>Primarily Layer 2 (L3 switches also route IP)</td></tr>
            <tr><td><strong>Main Purpose</strong></td><td>Connect 2–4 separate LAN segments</td><td>Connect dozens of individual LAN host devices</td></tr>
            <tr><td><strong>Number of Ports</strong></td><td>Usually fewer (typically 2 to 4 ports)</td><td>Usually more (24, 48, 96 to hundreds of ports)</td></tr>
            <tr><td><strong>Forwarding Method</strong></td><td>MAC-based (processed via software CPU)</td><td>MAC-based (processed via dedicated hardware ASICs)</td></tr>
            <tr><td><strong>Performance & Latency</strong></td><td>Lower throughput; higher store-and-forward latency</td><td>Massive throughput (wire-speed); sub-microsecond latency</td></tr>
            <tr><td><strong>Collision Domains</strong></td><td>Separates network into 2–4 larger collision domains</td><td>Each individual port is its own dedicated collision domain</td></tr>
            <tr><td><strong>Transmission Mode</strong></td><td>Mostly half-duplex shared access</td><td>Full-duplex dedicated links (zero collisions)</td></tr>
            <tr><td><strong>Common Use</strong></td><td>Older, legacy, or specialized industrial LANs</td><td>Modern campus, enterprise, and data center Ethernet LANs</td></tr>
          </tbody>
        </table>
      </div>

      <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">Advantages and Disadvantages of Data Link Layer Switching</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 my-3 text-xs">
        <div class="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
          <strong class="text-emerald-800 dark:text-emerald-300 block mb-1.5"><i class="fa-solid fa-thumbs-up"></i> Key Advantages</strong>
          <ul class="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300 text-[11px]">
            <li><strong>Reduced Unnecessary Traffic:</strong> Known unicast frames travel only to the intended recipient port.</li>
            <li><strong>Improved Performance:</strong> Separate switch ports create separate collision domains (microsegmentation).</li>
            <li><strong>Automatic Learning:</strong> Switches learn MAC addresses dynamically without manual configuration.</li>
            <li><strong>Scalability:</strong> High port density allows hundreds of devices to be interconnected easily.</li>
            <li><strong>Full-Duplex Communication:</strong> Simultaneous send and receive without CSMA/CD collisions.</li>
            <li><strong>Loop Prevention:</strong> Integrated STP/RSTP prevents switching loops in redundant topologies.</li>
          </ul>
        </div>
        <div class="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800">
          <strong class="text-red-800 dark:text-red-300 block mb-1.5"><i class="fa-solid fa-thumbs-down"></i> Key Disadvantages</strong>
          <ul class="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300 text-[11px]">
            <li><strong>Higher Cost:</strong> Switches are significantly more expensive than simple repeaters or hubs.</li>
            <li><strong>Configuration Complexity:</strong> Misconfigured VLANs, trunks, or STP can cause serious outages.</li>
            <li><strong>Switching Loops:</strong> If STP fails or is disabled, catastrophic broadcast storms take down the LAN.</li>
            <li><strong>Broadcast Domain Exposure:</strong> Broadcast traffic still reaches every device within the same VLAN.</li>
            <li><strong>Hardware Capacity Limits:</strong> MAC address table (CAM) size is finite and vulnerable to overflow attacks.</li>
          </ul>
        </div>
      </div>
    `,
    eli10: "A bridge is like a two-lane toll bridge connecting two small towns. A switch is like a giant multi-story highway interchange with 48 private express lanes so every car drives at top speed without traffic jams.",
    analogy: "A bridge is like a general doctor who handles everything slowly in their head (software). A switch is like a specialized automated robotic surgery center (hardware ASIC) that handles 48 patients at once at the speed of light.",
    howItWorks: `
      <p class="text-xs leading-relaxed">Hardware switching fabric architecture:</p>
      <ul class="list-disc pl-5 space-y-1 text-xs">
        <li><strong>Crossbar Switching Matrix:</strong> Connects $N$ input ports to $N$ output ports through a grid of electronic semiconductor switches, allowing multiple frame transfers simultaneously as long as destinations do not conflict.</li>
        <li><strong>Shared Memory Architecture:</strong> Frames enter a central high-speed memory pool where the ASIC scheduler maps pointers to egress queues.</li>
        <li><strong>Cut-Through Switching:</strong> The switch reads the 6-byte destination MAC and begins transmitting the frame onto the destination wire before the rest of the frame has even arrived, reducing latency to ~1 microsecond!</li>
      </ul>
    `,
    technicalDetails: `
      <p class="text-xs leading-relaxed">Comparison with Layer 3 Routers:</p>
      <ul class="list-disc pl-5 space-y-1 text-xs">
        <li>Bitches/Switches forward frames based on <strong>flat MAC addresses</strong> within a single local network. They do NOT modify the MAC header.</li>
        <li>Routers forward packets based on <strong>hierarchical IP addresses</strong> across different networks. They strip the incoming Layer 2 frame, decrement TTL, and build a brand-new Layer 2 frame with the next-hop MAC.</li>
      </ul>
    `,
    workedExamples: [
      {
        title: "Example: Port Density and Collision Domain Calculation",
        difficulty: "Intermediate",
        problem: "Network A uses two 2-port bridges to connect 4 legacy Ethernet hubs, each hub hosting 8 computers. Network B replaces all equipment with a single 32-port Ethernet switch connecting all 32 computers directly.\n1. How many collision domains exist in Network A vs Network B?\n2. What is the collision domain size (number of hosts) in each?",
        solution: "1. In Network A: Each bridge port connects to a hub (shared bus). Two 2-port bridges connecting 4 hubs create 4 collision domains.\n   In Network B: With a 32-port switch, every port is an independent collision domain. Therefore, Network B has 32 separate collision domains!\n\n2. In Network A, each collision domain has 8 hosts competing for shared bandwidth (half-duplex, collisions occur).\n   In Network B, each collision domain contains exactly 1 host (microsegmentation, full-duplex, zero collisions)!"
      }
    ],
    advantagesLimitations: `
      <table class="wiki-table">
        <thead><tr><th>Evolutionary Metric</th><th>Bridge (Legacy)</th><th>Switch (Modern)</th></tr></thead>
        <tbody>
          <tr><td>Forwarding Engine</td><td>Software CPU</td><td>Hardware ASIC / Crossbar</td></tr>
          <tr><td>Typical Latency</td><td>100–500 &mu;s</td><td>0.5–5 &mu;s</td></tr>
          <tr><td>Port Density</td><td>2 to 4</td><td>24 to 384+</td></tr>
          <tr><td>Cost per Port</td><td>Expensive in 1980s</td><td>Extremely economical today</td></tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "Modern Enterprise Data Centers: Top-of-Rack (ToR) and Spine switches.",
      "Office LANs: Power-over-Ethernet (PoE) access layer switches connecting IP phones and PCs.",
      "Smart Home Networks: Unmanaged desktop Gigabit switches."
    ],
    quiz: [
      {
        question: "Why is a modern Ethernet switch capable of significantly higher performance than a traditional bridge?",
        options: ["Because switches use software CPU interrupts to inspect frames", "Because switches execute MAC forwarding in hardware ASICs across multiple dedicated ports", "Because switches compress the frame payload", "Because switches operate only over optical fiber"],
        correct: 1,
        explanation: "Modern switches use dedicated Application-Specific Integrated Circuits (ASICs) to forward frames in hardware at wire speed with minimal latency."
      },
      {
        question: "How many collision domains are created by a 24-port Ethernet switch with 24 connected computers?",
        options: ["1 collision domain", "2 collision domains", "12 collision domains", "24 collision domains"],
        correct: 3,
        explanation: "Each individual port on an Ethernet switch constitutes an independent, isolated collision domain (24 ports = 24 collision domains)."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, Chapter 15: Connecting LANs.", url: "" },
      { cite: "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, Chapter 4: Data Link Layer Switching.", url: "" }
    ]
  }
};

console.log("Successfully built all 9 subtopics for Topic 9!");

// ==========================================
// 10. ENRICH TOPIC 11 REVISION & ASSESSMENT
// ==========================================

// A. Enrich Short-Answer Questions with Q93 to Q102 from PDF Page 11-12
const t9ShortQuestions = `
  <div class="faq-item p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-xs mb-2">
    <div class="faq-question font-bold text-xs text-blue-700 dark:text-blue-400">Q93. Define a bridge.</div>
    <div class="faq-answer text-xs text-gray-600 dark:text-gray-300 mt-1">A bridge is a Data Link Layer (Layer 2) networking device that connects two or more LAN segments and forwards frames between them using MAC addresses, dividing a network into smaller collision domains.</div>
  </div>
  <div class="faq-item p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-xs mb-2">
    <div class="faq-question font-bold text-xs text-blue-700 dark:text-blue-400">Q94. What is a transparent bridge?</div>
    <div class="faq-answer text-xs text-gray-600 dark:text-gray-300 mt-1">A transparent bridge is an IEEE 802.1D bridge that automatically learns device locations and forwards frames without connected computers having any awareness of the bridge's presence.</div>
  </div>
  <div class="faq-item p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-xs mb-2">
    <div class="faq-question font-bold text-xs text-blue-700 dark:text-blue-400">Q95. What is a learning bridge?</div>
    <div class="faq-answer text-xs text-gray-600 dark:text-gray-300 mt-1">A learning bridge is a bridge that automatically builds and updates its forwarding table by inspecting the source MAC addresses of incoming frames without requiring manual administrator configuration.</div>
  </div>
  <div class="faq-item p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-xs mb-2">
    <div class="faq-question font-bold text-xs text-blue-700 dark:text-blue-400">Q96. Explain MAC address learning.</div>
    <div class="faq-answer text-xs text-gray-600 dark:text-gray-300 mt-1">When a frame arrives on a port, the bridge reads the source MAC address and associates it with that port in its forwarding database, resetting the aging timer to keep track of dynamic host locations.</div>
  </div>
  <div class="faq-item p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-xs mb-2">
    <div class="faq-question font-bold text-xs text-blue-700 dark:text-blue-400">Q97. What is a forwarding table?</div>
    <div class="faq-answer text-xs text-gray-600 dark:text-gray-300 mt-1">A forwarding table (also called a Forwarding Database or CAM table) is an internal database maintained by a bridge or switch that maps hardware MAC addresses to specific physical switch ports.</div>
  </div>
  <div class="faq-item p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-xs mb-2">
    <div class="faq-question font-bold text-xs text-blue-700 dark:text-blue-400">Q98. Differentiate forwarding and filtering.</div>
    <div class="faq-answer text-xs text-gray-600 dark:text-gray-300 mt-1">Forwarding transmits a frame out through the specific port leading to its destination on another segment. Filtering prevents/discards a frame when its destination resides on the very same segment as the sender.</div>
  </div>
  <div class="faq-item p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-xs mb-2">
    <div class="faq-question font-bold text-xs text-blue-700 dark:text-blue-400">Q99. What is flooding in bridges?</div>
    <div class="faq-answer text-xs text-gray-600 dark:text-gray-300 mt-1">Flooding is the process of copying and transmitting an incoming frame out through all active ports except the port on which it arrived, used when the destination MAC is unknown or broadcast.</div>
  </div>
  <div class="faq-item p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-xs mb-2">
    <div class="faq-question font-bold text-xs text-blue-700 dark:text-blue-400">Q100. Define Spanning Tree Protocol (STP).</div>
    <div class="faq-answer text-xs text-gray-600 dark:text-gray-300 mt-1">STP (IEEE 802.1D) is a Layer 2 protocol designed to prevent catastrophic switching loops and broadcast storms in networks with redundant connections by placing redundant paths into a blocked state.</div>
  </div>
  <div class="faq-item p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-xs mb-2">
    <div class="faq-question font-bold text-xs text-blue-700 dark:text-blue-400">Q101. What is a Root Bridge?</div>
    <div class="faq-answer text-xs text-gray-600 dark:text-gray-300 mt-1">A Root Bridge is the central reference bridge in an STP topology, elected by switches because it has the lowest Bridge ID (Priority + MAC address). All its active ports are Designated Ports.</div>
  </div>
  <div class="faq-item p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-xs mb-2">
    <div class="faq-question font-bold text-xs text-blue-700 dark:text-blue-400">Q102. What is a MAC address aging timer?</div>
    <div class="faq-answer text-xs text-gray-600 dark:text-gray-300 mt-1">An aging timer (typically 300 seconds) is a countdown mechanism in switches that automatically removes inactive learned MAC address entries from the forwarding table after a period of inactivity.</div>
  </div>
`;

if (!TOPICS_U2_SYLLABUS['u2-short-answer-questions'].sections.overview.includes('Q93. Define a bridge.')) {
  TOPICS_U2_SYLLABUS['u2-short-answer-questions'].sections.overview += t9ShortQuestions;
  console.log("Added Q93-Q102 to u2-short-answer-questions!");
}

// B. Enrich Long-Answer Questions with Q32 to Q37 from PDF Page 12
const t9LongQuestions = `
  <div class="faq-item p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xs mb-3">
    <div class="faq-question font-bold text-sm text-purple-700 dark:text-purple-400 mb-1">Q32. Explain the working of a transparent bridge with a neat architectural diagram.</div>
    <div class="faq-answer text-xs text-gray-600 dark:text-gray-300 space-y-2">
      <p>A transparent bridge connects multiple LAN segments at Layer 2 without requiring end stations to be configured or even know of the bridge's presence. It operates via three synchronized processes: (1) <strong>Learning:</strong> Inspects the source MAC address of every arriving frame and records its incoming port in the forwarding table. (2) <strong>Forwarding:</strong> Reads destination MAC; if in table on a different port, transmits out that port. (3) <strong>Filtering:</strong> If destination MAC is on the same port as arrival, drops the frame. Unknown and broadcast frames are flooded to all ports except incoming.</p>
    </div>
  </div>
  <div class="faq-item p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xs mb-3">
    <div class="faq-question font-bold text-sm text-purple-700 dark:text-purple-400 mb-1">Q33. Describe the learning bridge algorithm with a concrete multi-segment example.</div>
    <div class="faq-answer text-xs text-gray-600 dark:text-gray-300 space-y-2">
      <p>When a frame arrives on port P: (1) S = Source MAC, D = Destination MAC. (2) Set ForwardingTable[S] = P, reset aging timer. (3) Query D in table: If D on port Q != P &rarr; Forward out Q. If D on port P &rarr; Filter (drop). If D unknown or broadcast &rarr; Flood out all ports except P. Example: Bridge connects P1 (Station A), P2 (Station B), P3 (Station C). A sends to B &rarr; Bridge learns A on P1; B not in table &rarr; Floods to P2, P3. B replies to A &rarr; Bridge learns B on P2; A is in table on P1 &rarr; Forwards directly out P1 only.</p>
    </div>
  </div>
  <div class="faq-item p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xs mb-3">
    <div class="faq-question font-bold text-sm text-purple-700 dark:text-purple-400 mb-1">Q34. Explain Forwarding, Filtering, and Flooding decisions in Layer 2 switches.</div>
    <div class="faq-answer text-xs text-gray-600 dark:text-gray-300 space-y-2">
      <p>Forwarding transmits an incoming frame through a specific port when destination MAC is known on a different port. Filtering drops the frame when destination MAC is associated with the ingress port, conserving network bandwidth. Flooding replicates the frame across all ports except ingress when destination MAC is unknown or broadcast.</p>
    </div>
  </div>
  <div class="faq-item p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xs mb-3">
    <div class="faq-question font-bold text-sm text-purple-700 dark:text-purple-400 mb-1">Q35. Explain the working and importance of Spanning Tree Protocol (STP).</div>
    <div class="faq-answer text-xs text-gray-600 dark:text-gray-300 space-y-2">
      <p>STP (IEEE 802.1D) prevents Layer 2 switching loops that cause broadcast storms, duplicate frames, and MAC table thrashing (because Ethernet frames lack a TTL field). It operates by electing a Root Bridge (lowest Bridge ID), finding shortest path Root Ports on all other switches, selecting Designated Ports per segment, and placing redundant links into a Blocked state. If a link fails, blocked ports dynamically transition to forwarding.</p>
    </div>
  </div>
  <div class="faq-item p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xs mb-3">
    <div class="faq-question font-bold text-sm text-purple-700 dark:text-purple-400 mb-1">Q36. Compare bridges and switches across architectural, performance, and operational dimensions.</div>
    <div class="faq-answer text-xs text-gray-600 dark:text-gray-300 space-y-2">
      <p>A bridge is typically a software-based device with 2 to 4 ports connecting LAN segments, introducing 100-500 &mu;s latency. A switch is a hardware ASIC-based multiport bridge with 24 to 48+ ports, offering sub-microsecond cut-through forwarding, dedicated microsegmentation per port, and wire-speed full-duplex operation.</p>
    </div>
  </div>
  <div class="faq-item p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xs mb-3">
    <div class="faq-question font-bold text-sm text-purple-700 dark:text-purple-400 mb-1">Q37. Explain how switches build and maintain MAC address tables, including aging timers.</div>
    <div class="faq-answer text-xs text-gray-600 dark:text-gray-300 space-y-2">
      <p>Switches inspect the Source MAC of arriving frames, mapping MAC addresses to ingress ports in their CAM table. Every entry is initialized with an aging timer (default: 300s). Inactive entries are purged upon timer expiration. If a device moves to a new port, its next transmission immediately updates the table to the new port.</p>
    </div>
  </div>
`;

if (!TOPICS_U2_SYLLABUS['u2-long-answer-questions'].sections.overview.includes('Q32. Explain the working of a transparent bridge')) {
  TOPICS_U2_SYLLABUS['u2-long-answer-questions'].sections.overview += t9LongQuestions;
  console.log("Added Q32-Q37 to u2-long-answer-questions!");
}

// C. Enrich Practice MCQs with 15 questions (including all 6 from PDF Pages 12-13)
const t9MCQs = [
  {
    question: "At which OSI layer does a traditional Ethernet bridge operate?",
    options: ["Physical Layer", "Data Link Layer", "Network Layer", "Transport Layer"],
    correct: 1,
    explanation: "A traditional Ethernet bridge operates at the Data Link Layer (Layer 2) of the OSI Reference Model."
  },
  {
    question: "Which address does a learning bridge use to build its forwarding table?",
    options: ["Destination IP address", "Source MAC address", "Destination IP address and port", "Source port number"],
    correct: 1,
    explanation: "A learning bridge inspects the Source MAC address of arriving frames to identify which device resides on which port."
  },
  {
    question: "What happens when a switch receives a frame with an unknown unicast destination?",
    options: ["It drops it immediately", "It sends it only to the incoming port", "It floods relevant ports except the incoming port", "It sends it to the router only"],
    correct: 2,
    explanation: "When the unicast destination is unknown, the switch floods the frame out all active ports except the incoming arrival port."
  },
  {
    question: "What is the main purpose of the Spanning Tree Protocol (STP)?",
    options: ["Assign IP addresses to host stations", "Prevent Layer 2 switching loops and broadcast storms", "Encrypt Ethernet frame payloads", "Increase maximum copper cable length"],
    correct: 1,
    explanation: "STP prevents Layer 2 switching loops and broadcast storms by placing redundant paths into a blocked state."
  },
  {
    question: "What does a switch do if the destination MAC address is learned on the incoming port?",
    options: ["Floods the frame", "Filters (drops) the frame", "Sends it to every port", "Changes the source MAC address"],
    correct: 1,
    explanation: "The switch filters (drops) the frame because the recipient has already received it directly over the local shared wire."
  },
  {
    question: "What does a switch's MAC address table map?",
    options: ["IP addresses to routers", "MAC addresses to switch ports", "Port numbers to IP networks", "Domain names to IP addresses"],
    correct: 1,
    explanation: "A MAC address table (CAM table) maps hardware MAC addresses to specific switch physical ports."
  },
  {
    question: "Why do Layer 2 Ethernet switching loops cause fatal network broadcast storms?",
    options: ["Ethernet frames have no Time-to-Live (TTL) field to terminate loops", "Switches automatically invert binary bits", "Collision detection is disabled in fiber cables", "IP routers refuse to accept Ethernet frames"],
    correct: 0,
    explanation: "Standard Layer 2 Ethernet headers contain no TTL field, meaning looping frames circulate indefinitely until bandwidth is 100% saturated."
  },
  {
    question: "Which port role on an STP non-root switch provides the lowest path cost back to the Root Bridge?",
    options: ["Designated Port", "Root Port", "Alternate Port", "Backup Port"],
    correct: 1,
    explanation: "The Root Port on a non-root switch is the single interface that offers the lowest cumulative path cost to reach the Root Bridge."
  },
  {
    question: "What is the default MAC address aging timer in most commercial Ethernet switches?",
    options: ["10 seconds", "60 seconds", "300 seconds (5 minutes)", "3600 seconds (1 hour)"],
    correct: 2,
    explanation: "The standard default MAC address aging timer in IEEE 802.1D and Cisco switches is 300 seconds (5 minutes)."
  },
  {
    question: "In what state does an STP blocked port operate regarding user data frames?",
    options: ["It transmits user data at half speed", "It drops all user data frames but continues receiving BPDUs", "It converts frames into IP packets", "It forwards frames only to the Root Bridge"],
    correct: 1,
    explanation: "A blocked port discards all user data frames to break the loop, but keeps listening to BPDUs to detect link failures."
  },
  {
    question: "What special control frame is exchanged by bridges every 2 seconds to maintain the Spanning Tree?",
    options: ["ARP Request", "ICMP Echo", "Bridge Protocol Data Unit (BPDU)", "RTS/CTS Frame"],
    correct: 2,
    explanation: "Bridges exchange Bridge Protocol Data Units (BPDUs) every 2 seconds (Hello Timer) to build and maintain the loop-free spanning tree."
  },
  {
    question: "How does a modern Ethernet switch forward frames compared to a legacy bridge?",
    options: ["In software using CPU interrupts", "In hardware at wire speed using dedicated ASICs", "By routing IP packets through software kernels", "By broadcasting all frames as optical pulses"],
    correct: 1,
    explanation: "Modern switches use Application-Specific Integrated Circuits (ASICs) and crossbar matrix fabrics to forward frames at hardware wire speed."
  },
  {
    question: "What is microsegmentation in an Ethernet switch?",
    options: ["Dividing frames into 64-byte fragments", "Each switch port forming an independent, isolated collision domain", "Connecting multiple hubs to a single port", "Reducing MAC address length from 48 to 24 bits"],
    correct: 1,
    explanation: "Microsegmentation means dedicating each switch port as an isolated collision domain, enabling full-duplex transmission without collisions."
  },
  {
    question: "What is the consequence of a CAM Table Overflow (MAC flooding) attack against a switch?",
    options: ["The switch shuts down all ports permanently", "The switch table fills up, causing it to fail open and flood all frames like a hub", "The switch upgrades all links to 100 Gbps", "The switch reboots into recovery mode"],
    correct: 1,
    explanation: "When an attacker overflows the CAM table with thousands of fake MACs, the switch cannot learn new addresses and floods all incoming traffic out all ports, allowing packet sniffing."
  },
  {
    question: "In an STP topology, which ports are always in the Forwarding state on the Root Bridge?",
    options: ["Root Ports", "Designated Ports", "Alternate Ports", "Blocked Ports"],
    correct: 1,
    explanation: "All active ports on the Root Bridge are Designated Ports, and Designated Ports are always in the Forwarding state."
  }
];

if (!TOPICS_U2_SYLLABUS['u2-mcqs'].sections.quiz) {
  TOPICS_U2_SYLLABUS['u2-mcqs'].sections.quiz = [];
}
// Add only new ones if not present
t9MCQs.forEach(q => {
  const exists = TOPICS_U2_SYLLABUS['u2-mcqs'].sections.quiz.some(existing => existing.question === q.question);
  if (!exists) {
    TOPICS_U2_SYLLABUS['u2-mcqs'].sections.quiz.push(q);
  }
});
console.log("Total MCQs in u2-mcqs is now:", TOPICS_U2_SYLLABUS['u2-mcqs'].sections.quiz.length);

// D. Enrich Numerical Problems with Solved Examples 1 to 4 from Syllabus Page 10-11
const t9Numericals = [
  {
    title: "Problem 28: MAC Address Learning & Unknown Destination Flooding",
    difficulty: "Beginner",
    problem: "A 3-port switch has empty tables. A frame arrives on Port 1 with Source MAC A and Destination MAC B. (1) What does the switch learn? (2) Through which ports is the frame transmitted?",
    solution: "1. The switch inspects the Source MAC and records: Table[A] = Port 1 with timer = 300s.\n2. The switch checks its table for Destination MAC B. B is not found.\n3. The switch FLOODS the frame through Port 2 and Port 3 (all active ports except incoming Port 1)."
  },
  {
    title: "Problem 29: Known Destination Unicast Forwarding",
    difficulty: "Beginner",
    problem: "A switch has the forwarding table: [A: Port 1, B: Port 2, C: Port 3]. A frame arrives on Port 1 with Destination MAC B. Describe the switch forwarding decision.",
    solution: "The switch looks up Destination MAC B in its forwarding database. B maps to Port 2. Since Port 2 != Port 1 (incoming port), the switch FORWARDS the frame exclusively through Port 2. Ports 1 and 3 receive no transmission."
  },
  {
    title: "Problem 30: Local Segment Filtering on Ingress Port",
    difficulty: "Beginner",
    problem: "A switch forwarding table contains: [A: Port 1, B: Port 2, C: Port 2]. A frame arrives on Port 2 with Destination MAC C. Describe the switch action.",
    solution: "The switch checks Destination MAC C, which maps to Port 2. Since the mapped destination port (Port 2) is identical to the incoming arrival port (Port 2), the switch FILTERS (discards) the frame. Station C has already received the frame directly over the shared local wire."
  },
  {
    title: "Problem 31: Dynamic Unknown Destination with Multiple Segment Ports",
    difficulty: "Intermediate",
    problem: "A frame arrives on Port 3 with Destination MAC D. The switch table currently contains: [A: Port 1, B: Port 2, C: Port 2]. Host D is not present in the table. Detail the switch operations.",
    solution: "1. The switch reads the Source MAC from the frame and binds it to Port 3 in its table: Table[Src] = Port 3.\n2. It queries Destination MAC D. D is absent from the table.\n3. The switch FLOODS the frame through all other active ports (Port 1 and Port 2). It does NOT transmit back out Port 3."
  }
];

if (Array.isArray(TOPICS_U2_SYLLABUS['u2-numerical-problems'].sections.workedExamples)) {
  t9Numericals.forEach(num => {
    const exists = TOPICS_U2_SYLLABUS['u2-numerical-problems'].sections.workedExamples.some(e => e.title === num.title);
    if (!exists) {
      TOPICS_U2_SYLLABUS['u2-numerical-problems'].sections.workedExamples.push(num);
    }
  });
  console.log("Total Numericals in u2-numerical-problems is now:", TOPICS_U2_SYLLABUS['u2-numerical-problems'].sections.workedExamples.length);
}

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
console.log("Successfully written complete updated topics_u2_syllabus.js!");
