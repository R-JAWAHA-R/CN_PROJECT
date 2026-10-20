// Unit I Topics Database: Networking Fundamentals & Physical Layer
// Comprehensive Academic Curriculum based on Kurose & Ross (8th Ed.), Tanenbaum & Wetherall (6th Ed.), Forouzan (6th Ed.)
// Standard specifications: ISO/IEC 7498-1 (OSI), RFC 1122 (Host Requirements), IEEE 802.3, IETF RFCs

const TOPICS_U1 = {
  "computer-network": {
    id: "computer-network",
    title: "Computer Networks & The Global Internet Architecture",
    unit: "Unit I: Networking Fundamentals",
    unitId: "unit1",
    level: "Level 1 — Foundational Concept",
    category: "fundamentals",
    difficulty: "Core",
    readingTime: "7 min read",
    standard: "Kurose & Ross Ch 1.1 / Tanenbaum Ch 1.1 / IETF RFC 1122",
    oneLiner: "An interconnected collection of autonomous computing hosts capable of exchanging digital information over shared communication channels using standardized protocol suites.",
    quickAnswer: "A computer network links independent computing nodes via transmission media and standardized protocols. The modern Internet represents a hierarchical network-of-networks connecting tier-1 global transit providers, regional ISPs, content delivery networks (CDNs), and billions of edge devices via statistical packet multiplexing.",
    whyItMatters: "Networks transform standalone computing systems into collaborative global infrastructures. Statistical packet multiplexing allows millions of concurrent distributed processes to share physical optical and wireless links without reserving costly dedicated physical circuits.",
    infobox: {
      layer: "All Layers (L1 - L7 Overview)",
      standard: "IETF RFC 1122, ISO/IEC 7498-1",
      type: "Distributed Infrastructure & Network Hierarchy",
      keyFormula: "\\text{Throughput} \\le \\min(R_{\\text{access}}, R_{\\text{bottleneck}}, R_{\\text{server}})",
      prerequisites: ["None"],
      relatedConcepts: ["protocol", "network-edge-core", "hosts-routers-switches", "packet", "circuit-vs-packet-switching"],
      compareWith: ["circuit-vs-packet-switching"],
      primaryUses: ["Global Internet Web & Cloud", "Enterprise LANs/WANs", "5G/6G Cellular Fabrics", "Data Center Fabrics"]
    },
    sections: {
      overview: `<p>A <strong>computer network</strong> is defined as an interconnected collection of autonomous computers. Two computers are said to be interconnected if they are capable of exchanging information. The connection need not be a single continuous copper wire; fiber optics, microwave links, communication satellites, and wireless cellular radios are extensively employed.</p>
      <p>The global Internet is fundamentally a <em>network of networks</em>. At the lowest level are end systems or hosts (smartphones, PCs, cloud virtual machines, IoT actuators). These edge devices connect through access networks (FTTH fiber, 5G, DOCSIS cable, Wi-Fi) to Local Internet Service Providers (ISPs), which aggregate into Regional ISPs, and ultimately interconnect through <strong>Internet Exchange Points (IXPs)</strong> and peering links to multi-continent <strong>Tier-1 Transit Providers</strong> (e.g., Lumen, AT&T, Telia, NTT).</p>`,
      howItWorks: `<h5 class="text-emerald-700 dark:text-emerald-400 font-bold mb-2">Life of a Packet Across Network Tiers:</h5>
      <ol class="wiki-ordered-list">
        <li><strong>Generation at Edge Host:</strong> An application process (e.g., a web browser) issues a request. The host OS protocol stack slices the byte stream into discrete segments, stamps TCP/IP headers, and serializes the resulting frames onto the access medium.</li>
        <li><strong>Access Network Aggregation:</strong> An access router or wireless base station multiplexes the digital signal into optical pulses across passive optical networks (PON) or coaxial distribution hubs.</li>
        <li><strong>Core Routing & Autonomous Systems:</strong> Core routers examine the 32-bit (IPv4) or 128-bit (IPv6) destination IP address and perform Longest Prefix Matching (LPM) in hardware forwarding tables (FIB) to switch packets across multi-terabit internal crossbar fabrics.</li>
        <li><strong>Transit & Peering Traversal:</strong> Traffic traverses border routers running the Border Gateway Protocol (BGP-4) across Autonomous System (AS) boundaries without centralized control.</li>
        <li><strong>Destination Delivery:</strong> The final access network demultiplexes the packet, decapsulates headers, verifies CRC integrity, and passes the payload to the listening socket buffer.</li>
      </ol>`,
      diagram: `
+---------------------------------------------------------------------------------+
|                  GLOBAL INTERNET HIERARCHICAL TOPOLOGY                          |
|                                                                                 |
|                  +-----------------------+   IXP Peering   +------------------+ |
|                  |   Tier-1 ISP (AT&T)   |<===============>| Tier-1 ISP (NTT) | |
|                  +-----------------------+                 +------------------+ |
|                             |                                        |          |
|                       Transit Fee                               Transit Fee     |
|                             v                                        v          |
|                  +-----------------------+                 +------------------+ |
|                  | Regional ISP (Midwest)|                 | Regional ISP(EU) | |
|                  +-----------------------+                 +------------------+ |
|                             |                                        |          |
|                             v                                        v          |
|                  +-----------------------+                 +------------------+ |
|                  |   Access ISP (Local)  |                 | Campus Access LAN| |
|                  +-----------------------+                 +------------------+ |
|                        /           \\                                 |          |
|                       v             v                                v          |
|               [Residential PC]   [Smartphone]                   [Web Server]    |
+---------------------------------------------------------------------------------+`,
      technicalDetails: `<p>Geographical and architectural classifications of networks include:</p>
      <ul class="wiki-bullet-list">
        <li><strong>PAN (Personal Area Network):</strong> Interconnects personal consumer devices within 10 meters (Bluetooth IEEE 802.15.1, Zigbee 802.15.4, UWB).</li>
        <li><strong>LAN (Local Area Network):</strong> Covers an office, laboratory, or building campus (Ethernet IEEE 802.3 at 1-100 Gbps, Wi-Fi IEEE 802.11ax/be). Characterized by high data rates, low propagation delay (&lt; 1 ms), and private ownership.</li>
        <li><strong>MAN (Metropolitan Area Network):</strong> Spans a city or municipal district (e.g., cable television networks, Metro Ethernet 802.17).</li>
        <li><strong>WAN (Wide Area Network):</strong> Encompasses broad geographical expanses across countries or continents. Operated by commercial telecommunication carriers using dense wavelength division multiplexing (DWDM) fiber links.</li>
        <li><strong>SAN (Storage Area Network):</strong> High-speed dedicated sub-networks linking servers to shared block-level storage arrays (Fibre Channel, iSCSI, NVMe-over-Fabrics).</li>
      </ul>`,
      workedExample: `<div class="worked-example-box">
        <strong>End-to-End Bottleneck Bandwidth Calculation:</strong><br>
        Suppose Host A transmits a video stream to Host B through a path traversing three links with transmission rates:
        $$R_1 = 100\\text{ Mbps (Access Fiber)}, \\quad R_2 = 1.5\\text{ Gbps (Core Backbone)}, \\quad R_3 = 20\\text{ Mbps (Mobile Wireless Access)}$$
        Assuming no other traffic exists on the network:
        <br>1. The end-to-end throughput is bounded by the <em>bottleneck link</em>:
        $$\\text{Throughput} = \\min(R_1, R_2, R_3) = \\min(100, 1500, 20) = 20\\text{ Mbps}$$
        <br>2. Time required to transfer a file of size $F = 50\\text{ MB} = 50 \\times 8 \\times 10^6\\text{ bits} = 400\\text{ Mbits}$:
        $$T = \\frac{F}{\\text{Throughput}} = \\frac{400\\text{ Mbits}}{20\\text{ Mbps}} = 20.0\\text{ seconds}$$
        Notice that increasing the core link $R_2$ from 1.5 Gbps to 100 Gbps produces zero improvement in transfer time because the bottleneck resides entirely at the receiver access link.
      </div>`,
      advantagesLimitations: `<table class="wiki-table">
        <thead><tr><th>Network Characteristic</th><th>Advantages</th><th>Architectural Trade-offs & Limitations</th></tr></thead>
        <tbody>
          <tr><td>Statistical Multiplexing</td><td>High efficiency; bandwidth dynamically shared on demand</td><td>Potential for queuing delays and buffer packet drops during congestion</td></tr>
          <tr><td>Decentralized Mesh Routing</td><td>Fault-tolerance; alternative paths automatically computed</td><td>Complex routing protocols (BGP, OSPF); potential transient routing loops</td></tr>
          <tr><td>Layered Protocol Stacks</td><td>Modularity; hardware/software components evolve independently</td><td>Header encapsulation overhead; cross-layer optimization challenges</td></tr>
        </tbody>
      </table>`,
      whereUsed: ["Global World Wide Web and cloud platforms (AWS, Azure, GCP)", "Financial high-frequency electronic trading networks", "Content Delivery Networks (Cloudflare, Akamai) distributing 80% of consumer video"],
      commonMistakes: "Equating network bandwidth with propagation speed. Higher bandwidth link (e.g., 10 Gbps vs 10 Mbps) means bits are injected onto the link at a faster rate, but each individual electromagnetic bit travels through physical fiber at the exact same physical propagation speed ($c \\approx 2 \\times 10^8\\text{ m/s}$).",
      compareWith: {
        title: "Computer Networks vs Telecommunication Circuit Networks",
        note: "Traditional circuit networks (PSTN) dedicate permanent physical frequency/time slices per call regardless of silence, while computer networks employ packet switching to multiplex independent streams over shared links dynamically."
      },
      practice: {
        question: "Host A transmits a 25 MB file to Host B across a two-hop path with link rates R1 = 50 Mbps and R2 = 10 Mbps. Neglecting protocol headers and propagation delay, what is the minimum transfer time?",
        choices: ["4.0 seconds", "20.0 seconds", "0.5 seconds", "2.5 seconds"],
        correctIndex: 1,
        explanation: "File size = 25 MB = 200 Mb. The bottleneck link rate is min(50 Mbps, 10 Mbps) = 10 Mbps. Minimum transfer time = 200 Mb / 10 Mbps = 20.0 seconds."
      },
      references: [
        { cite: "Kurose, J. F., & Ross, K. W. (2021). Computer Networking: A Top-Down Approach (8th Ed.). Pearson, Chapter 1.1.", url: "https://gaia.cs.umass.edu/kurose_ross/" },
        { cite: "Tanenbaum, A. S., Wetherall, D. J., & Feamster, N. (2021). Computer Networks (6th Ed.). Pearson, Chapter 1.1-1.3.", url: "https://www.pearson.com/" }
      ]
    },
    prevTopicId: null,
    nextTopicId: "network-edge-core"
  },

  "network-edge-core": {
    id: "network-edge-core",
    title: "Network Edge, Core & Access Networks",
    unit: "Unit I: Networking Fundamentals",
    unitId: "unit1",
    level: "Level 1 — Fundamental Architecture",
    category: "fundamentals",
    difficulty: "Core",
    readingTime: "8 min read",
    standard: "Kurose & Ross Ch 1.2 & 1.3 / Tanenbaum Ch 1.4",
    oneLiner: "The fundamental architectural division between end systems running distributed applications at the network edge and interconnected packet-switching meshes forming the network core.",
    quickAnswer: "The network edge consists of hosts, clients, servers, and IoT sensors executing application software. Access networks physically connect edge devices to the first edge router. The network core is a mesh of interconnected routers and packet switches responsible for store-and-forward packet switching.",
    whyItMatters: "The Internet's famous 'end-to-end principle' mandates that network intelligence resides at the edge (in host endpoints), keeping the core routers simple, robust, and optimized strictly for ultra-fast packet forwarding.",
    infobox: {
      layer: "Physical, Data Link & Network Layers",
      standard: "IEEE 802.3, ITU-T G.984 (GPON), DOCSIS 3.1",
      type: "Architectural Topology & Boundary",
      keyFormula: "\\text{Access Tech: } \\text{FTTH (Gbps)} \\gg \\text{DOCSIS Cable (Mbps)} > \\text{DSL (Mbps)}",
      prerequisites: ["computer-network"],
      relatedConcepts: ["hosts-routers-switches", "circuit-vs-packet-switching", "transmission-media", "network-delay-loss"],
      compareWith: ["circuit-vs-packet-switching"],
      primaryUses: ["Residential Broadband", "Enterprise Campus Networks", "Mobile 4G/5G Radio Access Networks (RAN)"]
    },
    sections: {
      overview: `<p>A computer network can be decomposed structurally into two primary components:</p>
      <ul class="wiki-bullet-list">
        <li><strong>Network Edge:</strong> Hosts (end systems) that run user applications, web servers, databases, and smartphones. All application-layer logic resides strictly at the edge.</li>
        <li><strong>Network Core:</strong> The mesh of packet switches, routers, and optical transmission links that interconnect access networks worldwide. Core routers do not execute user applications; their primary function is to forward packets across routing hops based on IP destination addresses.</li>
        <li><strong>Access Networks:</strong> The physical links that connect an end system to the very first edge router (also known as the default gateway).</li>
      </ul>`,
      howItWorks: `<h5 class="text-emerald-700 dark:text-emerald-400 font-bold mb-2">Access Network Technologies:</h5>
      <ul class="wiki-bullet-list">
        <li><strong>FTTH (Fiber to the Home):</strong> Optical fibers run directly to residences. Utilizes <strong>GPON (Gigabit Passive Optical Network)</strong> or XGS-PON. An Optical Line Terminal (OLT) at the central office connects via optical splitters to Optical Network Terminals (ONT) in individual residences, delivering symmetrical gigabit throughput.</li>
        <li><strong>Cable Broadband (DOCSIS):</strong> Operates over hybrid fiber-coax (HFC) infrastructure. Cable modems share broadcast coaxial cables connecting hundreds of homes to a Cable Modem Termination System (CMTS). Because the medium is shared, downstream throughput varies with neighborhood utilization.</li>
        <li><strong>DSL (Digital Subscriber Line):</strong> Operates over legacy twisted-pair telephone copper wires. Uses Frequency Division Multiplexing (FDM) to separate voice (&lt; 4 kHz) from upstream and downstream data channels. Speed degrades rapidly with distance from the Digital Subscriber Line Access Multiplexer (DSLAM).</li>
        <li><strong>Wireless Radio Access Networks:</strong> Wi-Fi (IEEE 802.11 inside tens of meters) and Cellular 4G/5G (base stations covering kilometers using licensed RF spectrum).</li>
      </ul>`,
      diagram: `
+---------------------------------------------------------------------------------+
|                       NETWORK EDGE VS NETWORK CORE                              |
|                                                                                 |
|   +-------------------+                                  +------------------+   |
|   |  NETWORK EDGE     |                                  |   NETWORK EDGE   |   |
|   |  (End Systems)    |                                  |   (Data Center)  |   |
|   | [Client Browser]  |                                  | [Database Server]|   |
|   +---------+---------+                                  +--------+---------+   |
|             | Access Link (FTTH/5G)                               | Gigabit Link|
|             v                                                     v             |
|       (Edge Router 1)                                       (Edge Router 2)     |
|             \\                                                    /              |
|              ================== NETWORK CORE ===================                |
|             /      (Store-and-Forward Mesh of Core Routers)     \\               |
|            v                                                     v              |
|       [Router A] ---------------- [Router B] ---------------- [Router C]        |
|             \\                         |                         /               |
|              +------------------- [Router D] ------------------+                |
+---------------------------------------------------------------------------------+`,
      technicalDetails: `<p><strong>Store-and-Forward Transmission:</strong> Core packet switches utilize store-and-forward transmission. A switch must receive an entire packet of $L$ bits before it can begin transmitting the first bit of the packet onto the outgoing link of capacity $R$.</p>
      <p>If a packet of length $L$ traverses $Q$ router links of rate $R$, the total transmission delay experienced is:</p>
      $$d_{\\text{trans, total}} = Q \\times \\frac{L}{R}$$
      <p>Contrast this with cut-through switching, where a switch examines only the destination header before forwarding bits before the entire packet arrives (used primarily in ultra-low latency financial data center switches).</p>`,
      workedExample: `<div class="worked-example-box">
        <strong>Pipelined Packet Switching vs Monolithic Transmission:</strong><br>
        Suppose an edge host needs to send a large file of $F = 6000\\text{ bytes}$ across a path of $N = 3$ identical router hops, each with link speed $R = 10\\text{ Mbps} = 10^7\\text{ bps}$. Ignore propagation and processing delays.
        <br><strong>Case 1: Sending file as 1 single giant packet ($L = 48,000\\text{ bits}$):</strong>
        <br>Transmission delay per hop: $T_{\\text{hop}} = \\frac{48,000}{10^7} = 4.8\\text{ ms}$.
        <br>Since each router must store the entire packet before forwarding:
        $$\\text{Total Time} = 3 \\times 4.8\\text{ ms} = 14.4\\text{ ms}$$
        <br><strong>Case 2: Packetizing into 6 small packets of $L = 1000\\text{ bytes} = 8000\\text{ bits}$ each:</strong>
        <br>Transmission delay per small packet per hop: $t = \\frac{8000}{10^7} = 0.8\\text{ ms}$.
        <br>Packet 1 arrives at destination at $t_1 = 3 \\times 0.8\\text{ ms} = 2.4\\text{ ms}$.
        <br>Because transmission is pipelined, each subsequent packet arrives $0.8\\text{ ms}$ later:
        $$\\text{Total Time} = 2.4\\text{ ms} + (6 - 1) \\times 0.8\\text{ ms} = 2.4 + 4.0 = 6.4\\text{ ms}$$
        <em>Conclusion:</em> Packetization reduced overall delay from 14.4 ms to 6.4 ms (over 55% reduction) due to concurrent link pipelining!
      </div>`,
      advantagesLimitations: `<table class="wiki-table">
        <thead><tr><th>Access Technology</th><th>Downstream Throughput</th><th>Upstream Throughput</th><th>Medium Characteristics</th></tr></thead>
        <tbody>
          <tr><td>FTTH (GPON)</td><td>Up to 2.5 - 10 Gbps</td><td>Up to 1.25 - 10 Gbps</td><td>Dedicated optical fiber, noise-immune, symmetrical speeds</td></tr>
          <tr><td>DOCSIS 3.1 Cable</td><td>Up to 1 - 2 Gbps</td><td>Up to 50 - 200 Mbps</td><td>Shared coaxial cable, asymmetrical, downstream contention</td></tr>
          <tr><td>VDSL2 (Copper)</td><td>Up to 50 - 100 Mbps</td><td>Up to 10 - 20 Mbps</td><td>Dedicated twisted copper, severe attenuation beyond 1 km</td></tr>
          <tr><td>5G mmWave</td><td>Up to 1 - 4 Gbps</td><td>Up to 100 - 300 Mbps</td><td>Shared radio spectrum, high attenuation through walls</td></tr>
        </tbody>
      </table>`,
      whereUsed: ["ISPs deploying FTTH PON splitters to replace copper plant", "Cloud data centers connecting edge front-ends to backend database clusters"],
      commonMistakes: "Assuming that routers in the network core examine application data (like HTTP URLs). Traditional core IP routers inspect only the Layer 3 IP header destination address to determine the outgoing interface.",
      compareWith: {
        title: "Network Edge vs Network Core",
        note: "The edge hosts execute application software and maintain state (TCP connections, authentication). The core switches packets between links statelessly and rapidly."
      },
      practice: {
        question: "Why does packetization of large files reduce the end-to-end transmission delay over multi-hop network paths?",
        choices: [
          "It compresses the payload data automatically at the physical layer.",
          "It enables pipelining, allowing upstream routers to transmit earlier packets while downstream routers process subsequent packets concurrently.",
          "It eliminates the need for CRC checksum verification on intermediate links.",
          "It converts store-and-forward switching into circuit switching."
        ],
        correctIndex: 1,
        explanation: "Packetization allows pipelining: multiple links in a path can transmit different packets of the same file simultaneously, significantly reducing total delivery time."
      },
      references: [
        { cite: "Kurose & Ross (8th Ed.), Chapter 1.2: The Network Edge, and Chapter 1.3: The Network Core.", url: "https://gaia.cs.umass.edu/kurose_ross/" }
      ]
    },
    prevTopicId: "computer-network",
    nextTopicId: "hosts-routers-switches"
  },

  "hosts-routers-switches": {
    id: "hosts-routers-switches",
    title: "Network Hardware: Hosts, Routers, Switches & Interface Cards",
    unit: "Unit I: Networking Fundamentals",
    unitId: "unit1",
    level: "Level 1 — Device Classification",
    category: "fundamentals",
    difficulty: "Core",
    readingTime: "7 min read",
    standard: "IEEE 802.3 / IETF RFC 1812 / ISO/IEC 7498-1",
    oneLiner: "The physical and logical computing systems that originate, terminate, switch, and route digital information across layered network fabrics.",
    quickAnswer: "Network devices are classified by the highest protocol layer they operate upon: Network Interface Cards (NICs) at Layer 1/2, Hubs/Repeaters at Layer 1, Switches/Bridges at Layer 2 (MAC addressing), Routers at Layer 3 (IP routing), and Gateways/Firewalls at Layer 4 through 7.",
    whyItMatters: "Mixing up the roles of switches and routers is the most frequent beginner error. Switches forward traffic within the same local broadcast domain (LAN); routers interconnect disparate broadcast domains across the global Internet.",
    infobox: {
      layer: "Layer 1 (Physical) through Layer 7 (Application)",
      standard: "IEEE 802.3 (Ethernet), RFC 1812 (IPv4 Router Requirements)",
      type: "Hardware Architecture & Forwarding Planes",
      keyFormula: "\\text{Forwarding Decision: L2 MAC (Switch)} \\neq \\text{L3 IP Route (Router)}",
      prerequisites: ["computer-network", "network-edge-core"],
      relatedConcepts: ["switch", "router", "protocol-stack", "encapsulation"],
      compareWith: ["hub-vs-bridge-vs-switch-vs-router"],
      primaryUses: ["Campus LAN Switching", "WAN Routing", "Data Center Top-of-Rack (ToR) Switching"]
    },
    sections: {
      overview: `<p>A network consists of specialized hardware devices operating at distinct layers of the protocol hierarchy:</p>
      <ul class="wiki-bullet-list">
        <li><strong>Hosts (End Systems):</strong> PCs, mobile phones, database servers, and IoT microcontrollers that generate or consume payload data. Hosts implement all seven layers of the OSI stack.</li>
        <li><strong>NIC (Network Interface Card):</strong> The physical hardware controller (Ethernet chip, Wi-Fi radio) implementing Layer 1 (signal encoding, transceiver) and Layer 2 (MAC framing, CRC calculation). Each Ethernet NIC carries a factory-burned 48-bit MAC address.</li>
        <li><strong>Repeater / Hub (Layer 1):</strong> Pure physical layer devices. A hub blindly re-amplifies and broadcasts electrical bits arriving on one port out all other ports. All ports share a single collision domain. (Obsolete in modern networks).</li>
        <li><strong>Bridge / Switch (Layer 2):</strong> Multiport devices that inspect 48-bit MAC addresses. A switch dynamically learns MAC-to-port mappings and forward frames only to the designated port, isolating collision domains.</li>
        <li><strong>Router (Layer 3):</strong> Network layer gateway. Inspects destination IP addresses, runs dynamic routing algorithms (OSPF, BGP), decrements TTL, recomputes checksums, and forwards packets between different subnets.</li>
      </ul>`,
      howItWorks: `<h5 class="text-emerald-700 dark:text-emerald-400 font-bold mb-2">Device Operational Comparison:</h5>
      <table class="wiki-table">
        <thead><tr><th>Device</th><th>OSI Layer</th><th>Addressing Used</th><th>Collision Domains</th><th>Broadcast Domains</th></tr></thead>
        <tbody>
          <tr><td><strong>Repeater / Hub</strong></td><td>Layer 1 (Physical)</td><td>None (raw electrical bits)</td><td>1 shared domain (all ports collide)</td><td>1 shared domain</td></tr>
          <tr><td><strong>Bridge / Switch</strong></td><td>Layer 2 (Data Link)</td><td>48-bit MAC Addresses</td><td>Separates collision domains per port</td><td>1 shared domain (broadcasts leak)</td></tr>
          <tr><td><strong>Router</strong></td><td>Layer 3 (Network)</td><td>32-bit IPv4 / 128-bit IPv6</td><td>Separates collision domains per port</td><td>Separates broadcast domains per subnet</td></tr>
          <tr><td><strong>Application Gateway</strong></td><td>Layer 4-7 (App)</td><td>URLs, Ports, TLS Certs</td><td>Isolated</td><td>Isolated</td></tr>
        </tbody>
      </table>`,
      diagram: `
+---------------------------------------------------------------------------------+
|                       DEVICE CLASSIFICATION AT OSI LAYERS                       |
|                                                                                 |
|   OSI Layer            Active Hardware Devices          Forwarding Identity     |
|   +------------------+ +------------------------------+ +---------------------+ |
|   | L7. Application  | | Proxies, Gateways, WAF       | | HTTP URLs, RPCs     | |
|   | L4. Transport    | | Layer 4 Load Balancers, NAT  | | TCP/UDP Port Numbers| |
|   | L3. Network      | | Core Routers, L3 Switches    | | 32-bit / 128-bit IP | |
|   | L2. Data Link    | | Ethernet Switches, AP Bridges| | 48-bit MAC Address  | |
|   | L1. Physical     | | Repeaters, Hubs, Transceivers| | Electrical/Opt Bits | |
|   +------------------+ +------------------------------+ +---------------------+ |
+---------------------------------------------------------------------------------+`,
      technicalDetails: `<p><strong>Modern Router Internals:</strong> A high-end core router contains three key subsystems:</p>
      <ol class="wiki-ordered-list">
        <li><strong>Input Ports:</strong> Perform physical layer termination, data link decapsulation, and lookup in a hardware Forwarding Information Base (FIB) implemented in <strong>TCAM (Ternary Content Addressable Memory)</strong> in tens of nanoseconds.</li>
        <li><strong>Switching Fabric:</strong> Connects input ports to output ports at multi-terabit speeds using crossbar matrices or multistage Banyan switching networks.</li>
        <li><strong>Routing Processor:</strong> Traditional CPU executing routing protocol daemons (BGP, OSPF), managing link-state databases, and programming hardware FIB line cards.</li>
      </ol>`,
      workedExample: `<div class="worked-example-box">
        <strong>Broadcast and Collision Domain Counting:</strong><br>
        Consider a corporate network topology containing:
        <br>• 1 Central Router with 3 active Gigabit interfaces.
        <br>• Interface 1 connects to a 24-port Ethernet Switch (with 20 connected PCs).
        <br>• Interface 2 connects to a 16-port Ethernet Switch (with 10 connected servers).
        <br>• Interface 3 connects to a legacy 8-port Hub (with 6 connected printers).
        <br><strong>Question:</strong> How many collision domains and broadcast domains exist?
        <br><strong>Solution:</strong>
        <br>1. <em>Broadcast Domains:</em> Routers break broadcast domains; switches and hubs forward broadcasts. Since the router has 3 independent interfaces, there are exactly <strong>3 broadcast domains</strong>.
        <br>2. <em>Collision Domains:</em>
        <br>• On Switch 1: each connected port is an isolated collision domain = 20 (PCs) + 1 (router uplink) = 21 domains.
        <br>• On Switch 2: each connected port is an isolated collision domain = 10 (servers) + 1 (router uplink) = 11 domains.
        <br>• On Hub 3: all hub ports share a single collision domain = 1 domain.
        <br>$$\\text{Total Collision Domains} = 21 + 11 + 1 = 33\\text{ collision domains}$$
      </div>`,
      advantagesLimitations: `<p><strong>Switching vs Routing Trade-offs:</strong> Layer 2 switches are extremely fast, inexpensive, and plug-and-play (requiring no IP configuration), but cannot scale to large topologies due to spanning-tree link blocking and broadcast storms. Layer 3 routers prevent loops dynamically, support arbitrary mesh topologies, and segment security policies, but require per-packet IP header processing and administrative configuration.</p>`,
      whereUsed: ["Enterprise campus networks deploy L2 switches in wiring closets and L3 core switches in data centers", "Internet Service Providers deploy core chassis routers handling 100+ Tbps"],
      commonMistakes: "Believing that a network switch isolates broadcast packets. A Layer 2 switch isolates collision domains, but it broadcasts all L2 broadcast frames (e.g., ARP requests to FF:FF:FF:FF:FF:FF) out every single active port in that VLAN.",
      compareWith: {
        title: "Hub vs Switch vs Router",
        note: "Hub broadcasts physical bits to everyone (1 collision domain). Switch sends frames to specific MAC addresses (isolates collision domains). Router forwards packets between subnets (isolates broadcast domains)."
      },
      practice: {
        question: "A network consists of one router with 4 interfaces. Each interface connects to an 8-port switch with 5 hosts attached. How many broadcast domains and collision domains exist in total?",
        choices: [
          "1 broadcast domain, 20 collision domains",
          "4 broadcast domains, 24 collision domains",
          "4 broadcast domains, 4 collision domains",
          "8 broadcast domains, 32 collision domains"
        ],
        correctIndex: 1,
        explanation: "The router creates 4 broadcast domains (one per interface). Each switch isolates collisions per port: 5 hosts + 1 router uplink = 6 collision domains per switch. Total collision domains = 4 * 6 = 24."
      },
      references: [
        { cite: "RFC 1812: Requirements for IP Version 4 Routers", url: "https://datatracker.ietf.org/doc/html/rfc1812" },
        { cite: "IEEE 802.3 Ethernet Standards Collection", url: "https://standards.ieee.org/standard/802_3-2022.html" }
      ]
    },
    prevTopicId: "network-edge-core",
    nextTopicId: "protocol"
  },

  "protocol": {
    id: "protocol",
    title: "Network Protocols, Services & Interfaces",
    unit: "Unit I: Networking Fundamentals",
    unitId: "unit1",
    level: "Level 1 — Theoretical Principle",
    category: "fundamentals",
    difficulty: "Foundation",
    readingTime: "6 min read",
    standard: "ISO/IEC 7498-1 / IETF Standards Track RFCs",
    oneLiner: "A formal specification of syntax, semantics, and synchronization rules governing communication between peer network entities.",
    quickAnswer: "A protocol defines what is communicated, how messages are structured (syntax), what each field means (semantics), and when messages are transmitted (timing). It is distinct from a service, which is what a layer provides to the layer above it through a well-defined Service Access Point (SAP).",
    whyItMatters: "Without standardized protocols, heterogeneous computing devices produced by competing vendors and running diverse operating systems could never exchange a single intelligible byte.",
    infobox: {
      layer: "All Layers (L1 - L7)",
      standard: "RFC 2026 (Internet Standards Process)",
      type: "Formal Protocol Specification",
      keyFormula: "\\text{Protocol} = \\text{Syntax (Format)} + \\text{Semantics (Meaning)} + \\text{Timing (Sequencing)}",
      prerequisites: ["computer-network"],
      relatedConcepts: ["protocol-stack", "osi-model", "encapsulation", "hosts-routers-switches"],
      compareWith: ["osi-vs-tcp-ip"],
      primaryUses: ["IETF RFC Standards (HTTP, TCP, IP, BGP)", "IEEE LAN Standards (802.3, 802.11)"]
    },
    sections: {
      overview: `<p>A <strong>network protocol</strong> is a formal system of rules that allows two or more entities of a communications system to transmit information via any kind of physical medium. The protocol defines the rules, syntax, semantics, and synchronization of communication and possible error recovery methods.</p>
      <p>As formalized in <em>Tanenbaum (6th Ed., Ch. 1.2)</em>, every protocol specification comprises three essential dimensions:</p>
      <ul class="wiki-bullet-list">
        <li><strong>Syntax:</strong> Concerns the format and encoding of data blocks, including bit offsets, field widths, delimiter characters, and binary representations.</li>
        <li><strong>Semantics:</strong> Defines the meaning of each section of bits. For example, what does an error control bit pattern signify, and what action must an entity perform upon receiving a packet with the FIN control bit set?</li>
        <li><strong>Timing (Synchronization):</strong> Includes speed matching between sender and receiver, sequencing of messages, and timeout durations for retransmission.</li>
      </ul>`,
      howItWorks: `<h5 class="text-emerald-700 dark:text-emerald-400 font-bold mb-2">Protocols vs Services vs Interfaces:</h5>
      <p>A crucial academic distinction formalized by the ISO OSI model:</p>
      <ul class="wiki-bullet-list">
        <li><strong>Service:</strong> A set of operations (primitives) that a layer provides to the layer directly above it. The service defines <em>what</em> the layer is prepared to do on behalf of its users, but says nothing about <em>how</em> that service is implemented.</li>
        <li><strong>Protocol:</strong> A set of rules governing the format and meaning of frames, packets, or messages that are exchanged by the <strong>peer entities</strong> within the same layer. Entities use protocols to implement their service definitions.</li>
        <li><strong>Interface:</strong> The Service Access Point (SAP) across which an adjacent upper layer accesses services (e.g., the Berkeley Sockets API between application and transport layers).</li>
      </ul>`,
      diagram: `
+---------------------------------------------------------------------------------+
|                       SERVICE VS PROTOCOL ARCHITECTURE                          |
|                                                                                 |
|   Host A (Source)                                            Host B (Destination)|
|  +--------------------+                                     +------------------+ |
|  | Layer N+1 Entity   |                                     | Layer N+1 Entity | |
|  +---------+----------+                                     +--------+---------+ |
|            | Service Interface (SAP)                                 | SAP       |
|            v                                                         v           |
|  +--------------------+      Peer-to-Peer Protocol (Layer N)  +------------------+ |
|  | Layer N Entity     |<===================================>| Layer N Entity   | |
|  +---------+----------+      Virtual Horizontal Communication+--------+---------+ |
|            | Service Interface (SAP)                                 | SAP       |
|            v                                                         v           |
|  +--------------------+                                     +------------------+ |
|  | Layer N-1 Entity   |                                     | Layer N-1 Entity | |
|  +--------------------+                                     +------------------+ |
+---------------------------------------------------------------------------------+`,
      technicalDetails: `<p><strong>Service Primitives:</strong> Formal communication between adjacent layers occurs via four standardized service primitive operations:</p>
      <ol class="wiki-ordered-list">
        <li><strong>Request:</strong> Layer $N+1$ calls Layer $N$ to perform a service (e.g., connect, send data).</li>
        <li><strong>Indication:</strong> Layer $N$ informs Layer $N+1$ of an event (e.g., connection requested, data arrived).</li>
        <li><strong>Response:</strong> Layer $N+1$ replies to an indication event.</li>
        <li><strong>Confirm:</strong> Layer $N$ informs the requesting Layer $N+1$ that its initial request has completed.</li>
      </ol>`,
      workedExample: `<div class="worked-example-box">
        <strong>Human Protocol vs Machine Protocol Analogy:</strong><br>
        • <em>Human Dialogue:</em> "Hello" &rarr; (Receive "Hello") &rarr; "What time is it?" &rarr; (Receive "2:00 PM"). If the receiver does not respond within 5 seconds, the speaker repeats: "Excuse me, what time is it?"<br>
        • <em>TCP Protocol:</em> Client sends SYN (seq=x) &rarr; Server sends SYN-ACK (seq=y, ack=x+1) &rarr; Client sends ACK (ack=y+1) + HTTP GET Request. If the server response is not received before the Retransmission Timeout (RTO) expires, the client retransmits the SYN segment.<br>
        Both systems require predefined syntax, mutual semantic interpretation, and timeout recovery rules.
      </div>`,
      advantagesLimitations: `<p>Standardized open protocols (IETF RFCs) allow vendor interoperability, prevent market monopolization, and facilitate public academic auditing. However, strict adherence to legacy backward-compatibility constraints can perpetuate historical inefficiencies (e.g., the 20-byte IPv4 header checksum recalculated at every router).</p>`,
      whereUsed: ["IETF RFC Standards Track (RFC 791 IPv4, RFC 9293 TCP, RFC 9110 HTTP)", "ITU-T Telecommunication Standards"],
      commonMistakes: "Confusing a protocol with an implementation. TCP is a standardized specification (RFC 9293); Linux TCP stack, Windows TCP/IP, and FreeBSD TCP are three completely distinct software implementations that flawlessly interoperate because they strictly obey the identical protocol specification.",
      compareWith: {
        title: "Protocol vs Service",
        note: "A service is vertical (provided to the upper layer across an interface); a protocol is horizontal (exchanged between peer entities on different machines)."
      },
      practice: {
        question: "Which component of a protocol specification defines the exact bit-level formatting and field alignments of transmitted message headers?",
        choices: ["Semantics", "Syntax", "Timing", "Encapsulation"],
        correctIndex: 1,
        explanation: "Syntax defines the structural format, bit widths, and encoding of transmitted data. Semantics defines what the bits mean, and timing coordinates synchronization."
      },
      references: [
        { cite: "Tanenbaum, A. S. (2021). Computer Networks (6th Ed.), Chapter 1.2: Network Software.", url: "https://www.pearson.com/" },
        { cite: "RFC 2026: The Internet Standards Process", url: "https://datatracker.ietf.org/doc/html/rfc2026" }
      ]
    },
    prevTopicId: "hosts-routers-switches",
    nextTopicId: "osi-model"
  },

  "osi-model": {
    id: "osi-model",
    title: "The 7-Layer OSI Reference Model (ISO/IEC 7498-1)",
    unit: "Unit I: Networking Fundamentals",
    unitId: "unit1",
    level: "Level 1 — Canonical Architecture",
    category: "fundamentals",
    difficulty: "Core",
    readingTime: "9 min read",
    standard: "ISO/IEC 7498-1:1994 (Open Systems Interconnection)",
    oneLiner: "The internationally standardized seven-layer architectural framework defining functional partitions for open telecommunication systems.",
    quickAnswer: "The Open Systems Interconnection (OSI) model decomposes network communication into 7 distinct layers: Physical (bits), Data Link (frames), Network (packets), Transport (end-to-end segments), Session (dialogue control), Presentation (data representation & encryption), and Application (user interfaces).",
    whyItMatters: "Although the practical Internet runs on the TCP/IP suite, the OSI model remains the universal academic taxonomy and vocabulary for network architecture, troubleshooting, and certifications worldwide.",
    infobox: {
      layer: "All 7 Layers (Physical up to Application)",
      standard: "ISO/IEC 7498-1:1994",
      type: "Architectural Reference Model",
      keyFormula: "\\text{Mnemonic: } \\text{Please Do Not Throw Sausage Pizza Away (L1 } \\to \\text{ L7)}",
      prerequisites: ["protocol", "hosts-routers-switches"],
      relatedConcepts: ["tcp-ip-model", "protocol-stack", "encapsulation", "network-edge-core"],
      compareWith: ["osi-vs-tcp-ip"],
      primaryUses: ["Universal Network Taxonomy", "ISO Networking Standards", "Layered Network Troubleshooting"]
    },
    sections: {
      overview: `<p>The <strong>OSI Reference Model</strong> was developed by the International Organization for Standardization (ISO) in 1984 to facilitate open communications between heterogeneous computer systems without requiring changes to underlying hardware or software logic.</p>
      <p>ISO established three primary design principles for the layer decomposition:</p>
      <ol class="wiki-ordered-list">
        <li>A layer should be created where a different abstraction level is needed.</li>
        <li>Each layer should perform a well-defined function.</li>
        <li>The boundary between layers should be chosen to minimize information flow across interfaces.</li>
      </ol>`,
      howItWorks: `<h5 class="text-emerald-700 dark:text-emerald-400 font-bold mb-2">Detailed Breakdown of All Seven OSI Layers:</h5>
      <table class="wiki-table">
        <thead><tr><th>#</th><th>Layer Name</th><th>PDU</th><th>Primary Responsibilities</th><th>Protocols / Standards</th></tr></thead>
        <tbody>
          <tr><td>7</td><td><strong>Application</strong></td><td>Data</td><td>Provides user applications with access to network services (file transfer, web, email).</td><td>HTTP, DNS, SMTP, SSH, FTP</td></tr>
          <tr><td>6</td><td><strong>Presentation</strong></td><td>Data</td><td>Syntax and semantics: data compression, character encoding (ASCII/Unicode), encryption/decryption.</td><td>TLS/SSL, JPEG, MPEG, ASN.1</td></tr>
          <tr><td>5</td><td><strong>Session</strong></td><td>Data</td><td>Dialogue control, token management, synchronization checkpoints, recovery of broken sessions.</td><td>NetBIOS, RPC, Sockets, PPTP</td></tr>
          <tr><td>4</td><td><strong>Transport</strong></td><td>Segment</td><td>End-to-end process-to-process delivery, port multiplexing, segmentation, error control, flow control.</td><td>TCP, UDP, SCTP</td></tr>
          <tr><td>3</td><td><strong>Network</strong></td><td>Packet</td><td>Source-to-destination packet routing across multiple networks, logical addressing, subnet management.</td><td>IPv4, IPv6, ICMP, OSPF, BGP</td></tr>
          <tr><td>2</td><td><strong>Data Link</strong></td><td>Frame</td><td>Hop-to-hop node delivery across a physical link, framing, physical MAC addressing, CRC error detection.</td><td>Ethernet (802.3), Wi-Fi (802.11), PPP</td></tr>
          <tr><td>1</td><td><strong>Physical</strong></td><td>Bits</td><td>Transmission of raw unstructured bitstream over physical media, voltage levels, bit timing, modulation.</td><td>1000BASE-T RJ45, Single-Mode Fiber</td></tr>
        </tbody>
      </table>`,
      diagram: `
+---------------------------------------------------------------------------------+
|                       THE 7-LAYER OSI REFERENCE MODEL                           |
|                                                                                 |
|   Layer               Protocol Data Unit (PDU)   Function Scope                 |
|   +-----------------+ +------------------------+ +----------------------------+ |
|   | 7. Application  | | Application Data       | | Network software interfaces| |
|   | 6. Presentation | | Formatted/Encrypted    | | Syntax, compression, crypto| |
|   | 5. Session      | | Synced Session Data    | | Dialogue checkpoints       | |
|   | 4. Transport    | | Segment / Datagram     | | End-to-end process delivery| |
|   | 3. Network      | | Packet / Datagram      | | Host-to-host path routing  | |
|   | 2. Data Link    | | Frame                  | | Node-to-node hop delivery  | |
|   | 1. Physical     | | Raw Bits               | | Modulation & electrical RF | |
|   +-----------------+ +------------------------+ +----------------------------+ |
+---------------------------------------------------------------------------------+`,
      technicalDetails: `<p><strong>Peer-to-Peer Protocol Communication:</strong> In the OSI model, data does not pass directly from Layer 7 of Host A to Layer 7 of Host B. Instead, data descends through each successive layer on the sending host (encapsulation), passes across the physical transmission medium as bits, and ascends through each layer on the receiving host (decapsulation). Each layer adds its own Protocol Control Information (PCI) header.</p>`,
      workedExample: `<div class="worked-example-box">
        <strong>Trace of Layer Responsibilities during Secure Web Request:</strong><br>
        1. <strong>Application (L7):</strong> User enters URL; browser constructs HTTP GET request string.<br>
        2. <strong>Presentation (L6):</strong> Encrypts the HTTP plaintext using TLS AES-GCM cipher into ciphertext.<br>
        3. <strong>Session (L5):</strong> Manages the TLS session key state and connection keepalive dialogue.<br>
        4. <strong>Transport (L4):</strong> Chunks data into 1460-byte segments, appends TCP header with Source Port 52104 and Destination Port 443.<br>
        5. <strong>Network (L3):</strong> Prepends IPv4 header with Source IP 192.168.1.15 and Destination IP 93.184.216.34; assigns TTL=64.<br>
        6. <strong>Data Link (L2):</strong> Wraps IP packet into Ethernet frame with Source MAC and Gateway Router MAC; calculates 32-bit CRC.<br>
        7. <strong>Physical (L1):</strong> Converts frame bits into PAM-5 electrical voltages across Category 6 twisted copper wire at 1 Gbps.
      </div>`,
      advantagesLimitations: `<p><strong>Why Did OSI Not Dominate the Real World?</strong> As David Clark famously observed: <em>"We reject: kings, presidents, and voting. We believe in: rough consensus and running code."</em> The OSI committee finalized standards after monumental bureaucratic debates, resulting in complex and inefficient protocols. Meanwhile, the TCP/IP suite had working software running freely in Berkeley UNIX (4.2BSD), capturing the global market before OSI could produce competitive commercial implementations.</p>`,
      whereUsed: ["Networking curriculum, Cisco CCNA, CompTIA Network+ certifications", "Troubleshooting methodology ('Check physical Layer 1 first before debugging L3 routing')"],
      commonMistakes: "Assuming routers implement all 7 OSI layers. Standard network routers operate strictly up to Layer 3 (Physical, Data Link, Network). Only end hosts and application proxies process Layers 4 through 7.",
      compareWith: {
        title: "OSI vs TCP/IP Models",
        note: "OSI has 7 strict layers (separating Session and Presentation); TCP/IP has 4 or 5 practical layers, collapsing Session and Presentation into the Application layer."
      },
      practice: {
        question: "Which OSI layer is responsible for dialogue control, checkpointing, and token arbitration between communicating distributed processes?",
        choices: ["Transport Layer (L4)", "Session Layer (L5)", "Presentation Layer (L6)", "Data Link Layer (L2)"],
        correctIndex: 1,
        explanation: "The Session Layer (Layer 5) establishes, manages, and terminates dialogue sessions between applications, providing synchronization checkpoints."
      },
      references: [
        { cite: "ISO/IEC 7498-1:1994 Information technology — Open Systems Interconnection — Basic Reference Model", url: "https://www.iso.org/standard/20269.html" },
        { cite: "Kurose & Ross (8th Ed.), Chapter 1.5: Protocol Layers and Their Service Models.", url: "https://gaia.cs.umass.edu/kurose_ross/" }
      ]
    },
    prevTopicId: "protocol",
    nextTopicId: "tcp-ip-model"
  },

  "tcp-ip-model": {
    id: "tcp-ip-model",
    title: "The TCP/IP Protocol Architecture & The Hourglass Model",
    unit: "Unit I: Networking Fundamentals",
    unitId: "unit1",
    level: "Level 1 — Practical Architecture",
    category: "fundamentals",
    difficulty: "Core",
    readingTime: "8 min read",
    standard: "IETF RFC 1122 (Requirements for Internet Hosts) / RFC 791 / RFC 793",
    oneLiner: "The four-layer architectural model that powers the global Internet, celebrated for its pragmatic 'hourglass' design with IP at the waist.",
    quickAnswer: "The TCP/IP model defines four layers: Network Access (Link), Internet (IP), Transport (TCP/UDP), and Application. Its defining architectural virtue is the 'hourglass' structure: thousands of diverse applications run over a single unifying Internet Protocol (IP), which in turn runs over any arbitrary physical link technology.",
    whyItMatters: "Every packet transmitted across the Internet today adheres to the TCP/IP protocol suite. Understanding its design philosophy explains why the Internet scaled from a dozen ARPANET nodes to billions of connected devices.",
    infobox: {
      layer: "4 Layers (Link, Internet, Transport, Application)",
      standard: "IETF RFC 1122, RFC 1123",
      type: "Practical Protocol Suite Architecture",
      keyFormula: "\\text{Hourglass: Thousands of Apps } \\to \\text{ONE Protocol (IP)} \\to \\text{All Media}",
      prerequisites: ["osi-model", "protocol"],
      relatedConcepts: ["osi-model", "protocol-stack", "encapsulation", "computer-network"],
      compareWith: ["osi-vs-tcp-ip"],
      primaryUses: ["All Modern Operating System Network Stacks", "Global Internet Protocol Communications"]
    },
    sections: {
      overview: `<p>The <strong>TCP/IP Protocol Suite</strong> was designed in the 1970s by DARPA researchers Vint Cerf and Bob Kahn. Unlike the OSI model, which was created by an international committee before protocols were implemented, the TCP/IP model was designed after the protocols were already written, tested, and operational on the ARPANET.</p>
      <p>The IETF formal specification in <strong>RFC 1122</strong> defines four operational layers:</p>
      <ol class="wiki-ordered-list">
        <li><strong>Application Layer:</strong> Encompasses all higher-level protocols (HTTP, DNS, SSH, SMTP). Combines the functions of OSI Layers 5, 6, and 7.</li>
        <li><strong>Transport Layer:</strong> Provides end-to-end communication services for applications. Implements connection-oriented reliable byte-streams (TCP) or connectionless datagrams (UDP).</li>
        <li><strong>Internet Layer:</strong> Anchored by the <strong>Internet Protocol (IP)</strong>. Handles packet addressing, packaging, and routing across heterogeneous networks using a connectionless, best-effort datagram delivery model.</li>
        <li><strong>Link (Network Access) Layer:</strong> Manages physical media access, network hardware interfaces, and local frame transmission (Ethernet, Wi-Fi, DOCSIS, LTE/5G).</li>
      </ol>`,
      howItWorks: `<h5 class="text-emerald-700 dark:text-emerald-400 font-bold mb-2">The Internet Hourglass Architecture:</h5>
      <p>The central genius of TCP/IP is the <strong>Hourglass Architecture</strong>:</p>
      <ul class="wiki-bullet-list">
        <li><em>Top (Wide):</em> A massive, evolving variety of Application Layer protocols (Web, Email, Video Streaming, Gaming, P2P, IoT).</li>
        <li><em>Waist (Narrow):</em> A single, universal protocol: <strong>Internet Protocol (IPv4/IPv6)</strong>. Everything above IP runs over IP; everything below IP carries IP.</li>
        <li><em>Bottom (Wide):</em> An arbitrary, evolving variety of Link and Physical media (Ethernet, Wi-Fi, Satellite, Single-Mode Fiber, 5G NR, Submarine cables).</li>
      </ul>
      <p>Because there is only one protocol at the waist, adding a new application requires no changes to physical hardware; adding a new transmission medium requires no changes to applications!</p>`,
      diagram: `
+---------------------------------------------------------------------------------+
|                    THE FAMOUS INTERNET HOURGLASS MODEL                          |
|                                                                                 |
|   APPLICATIONS      [ HTTP ]  [ SMTP ]  [ DNS ]  [ SSH ]  [ QUIC ]  [ RTP ]     |
|                              \\     |       |       |      /                     |
|   TRANSPORT                      [ TCP ]       [ UDP ]                          |
|                                     \\             /                             |
|                                      v           v                              |
|   THE NARROW WAIST                +-----------------+                           |
|                                   |  INTERNET (IP)  |                           |
|                                   +-----------------+                           |
|                                      /           \\                              |
|   LINK & PHYSICAL                   v             v                             |
|                    [ Ethernet ]  [ Wi-Fi ]  [ Fiber DWDM ]  [ 5G NR ]  [ DOCSIS]|
+---------------------------------------------------------------------------------+`,
      technicalDetails: `<p><strong>Comparison of Layer Mapping:</strong></p>
      <table class="wiki-table">
        <thead><tr><th>OSI 7-Layer Model</th><th>TCP/IP 4-Layer (RFC 1122)</th><th>Modern 5-Layer Hybrid Teaching Model</th><th>Standard Protocols</th></tr></thead>
        <tbody>
          <tr><td>7. Application<br>6. Presentation<br>5. Session</td><td>Application Layer</td><td>5. Application Layer</td><td>HTTP/3, DNS, SSH, SMTP, BGP</td></tr>
          <tr><td>4. Transport</td><td>Transport Layer</td><td>4. Transport Layer</td><td>TCP (RFC 9293), UDP (RFC 768), QUIC</td></tr>
          <tr><td>3. Network</td><td>Internet Layer</td><td>3. Network Layer</td><td>IPv4 (RFC 791), IPv6 (RFC 8200), ICMP</td></tr>
          <tr><td>2. Data Link</td><td rowspan=\"2\">Link (Network Access) Layer</td><td>2. Data Link Layer</td><td>Ethernet (802.3), Wi-Fi (802.11), ARP</td></tr>
          <tr><td>1. Physical</td><td>1. Physical Layer</td><td>1000BASE-T, DWDM, RF Modulation</td></tr>
        </tbody>
      </table>`,
      workedExample: `<div class="worked-example-box">
        <strong>The End-to-End Principle in Practice:</strong><br>
        Suppose an application requires guaranteed in-order file delivery with zero corrupt bytes.
        <br>• <em>OSI Philosophy:</em> Would attempt to make every single intermediate physical link, network router, and session bridge 100% reliable through hop-by-hop error checking.
        <br>• <em>TCP/IP Philosophy (Saltzer, Reed, & Clark, 1984):</em> Intermediate links can be lossy and best-effort. The end hosts running TCP perform sequence tracking, timeout detection, and end-to-end retransmission. Providing complex reliability mechanisms in intermediate routers is redundant and penalizes applications that do not need reliability (like real-time voice VoIP).
      </div>`,
      advantagesLimitations: `<p>TCP/IP's simple best-effort datagram model enabled unprecedented global scalability. However, because IP was designed without native authentication or encryption, security features (IPsec, TLS, DNSSEC) had to be retrofitted onto the protocol stack decades later.</p>`,
      whereUsed: ["Entire worldwide Internet, operating system network stacks (Linux kernel, Windows, macOS, iOS, Android)"],
      commonMistakes: "Believing that the TCP/IP model has a Presentation or Session layer. In TCP/IP, any data formatting, compression, or encryption is considered part of the user application itself (or implemented via shared user-space libraries like OpenSSL).",
      compareWith: {
        title: "TCP/IP vs OSI",
        note: "OSI is a strict conceptual reference model created prior to implementation; TCP/IP is an open implementation-driven standard based on running code."
      },
      practice: {
        question: "What is the primary architectural significance of the 'narrow waist' in the Internet's hourglass model?",
        choices: [
          "It forces all network routers to implement hardware encryption.",
          "It allows diverse applications and diverse transmission media to interoperate through a single universal protocol (IP).",
          "It limits the maximum packet size of all Internet frames strictly to 1500 bytes.",
          "It restricts the number of concurrent TCP connections a server can accept."
        ],
        correctIndex: 1,
        explanation: "The narrow waist represents the Internet Protocol (IP). By standardizing on a single protocol at Layer 3, any application above can run over any transmission medium below."
      },
      references: [
        { cite: "RFC 1122: Requirements for Internet Hosts — Communication Layers", url: "https://datatracker.ietf.org/doc/html/rfc1122" },
        { cite: "Saltzer, J. H., Reed, D. P., & Clark, D. D. (1984). End-to-end arguments in system design. ACM TOCS.", url: "https://web.mit.edu/Saltzer/www/publications/endtoend/endtoend.pdf" }
      ]
    },
    prevTopicId: "osi-model",
    nextTopicId: "protocol-stack"
  },

  "protocol-stack": {
    id: "protocol-stack",
    title: "Protocol Stacks & Layered Architecture",
    unit: "Unit I: Networking Fundamentals",
    unitId: "unit1",
    level: "Level 1 — Structural Principle",
    category: "fundamentals",
    difficulty: "Core",
    readingTime: "6 min read",
    standard: "ISO/IEC 7498-1 / Kurose & Ross Ch 1.5",
    oneLiner: "The hierarchical organization of network software and hardware into modular layers, where each layer provides specific services to the layer above.",
    quickAnswer: "A protocol stack organizes communication tasks into a vertical hierarchy of independent modules. Lower layers hide physical transmission complexities and present abstract communication primitives to upper layers, allowing hardware upgrades or protocol changes without modifying application software.",
    whyItMatters: "Layering enables information hiding and modularity. A software engineer can write a web application in JavaScript without needing to know whether the underlying physical medium is 5G wireless, transatlantic optical fiber, or twisted-pair copper.",
    infobox: {
      layer: "All Layers (L1 - L5/L7)",
      standard: "ISO/IEC 7498-1",
      type: "Software Architecture & Modularity",
      keyFormula: "\\text{Modularity: Layer } N \\text{ depends ONLY on Layer } N-1",
      prerequisites: ["protocol", "osi-model", "tcp-ip-model"],
      relatedConcepts: ["encapsulation", "protocol", "hosts-routers-switches"],
      compareWith: ["osi-vs-tcp-ip"],
      primaryUses: ["OS Kernel Network Stacks", "Embedded Protocol Engines", "Microservices Networking"]
    },
    sections: {
      overview: `<p>To reduce design complexity, most networks are organized as a series of <strong>layers</strong> or <strong>levels</strong>, each built upon the one below it. The number of layers, the name of each layer, the contents of each layer, and the function of each layer differ from network to network.</p>
      <p>The purpose of each layer is to offer certain services to the higher layers, while shielding those layers from the details of how the offered services are actually implemented. The set of layers and protocols is called the <strong>network architecture</strong>. A list of protocols used by a certain system, one protocol per layer, is called a <strong>protocol stack</strong>.</p>`,
      howItWorks: `<h5 class="text-emerald-700 dark:text-emerald-400 font-bold mb-2">Layer Independence and Modularity:</h5>
      <p>Consider the relationship between Layer $N$ and Layer $N-1$:</p>
      <ul class="wiki-bullet-list">
        <li>Layer $N$ on the sending host conducts a <em>virtual peer communication</em> with Layer $N$ on the receiving host.</li>
        <li>To send data to its peer, Layer $N$ does not transmit directly across; it calls the service interface of Layer $N-1$ immediately beneath it.</li>
        <li>Layer $N-1$ accepts the Service Data Unit (SDU), adds its own header to create a Protocol Data Unit (PDU), and passes it down to Layer $N-2$.</li>
        <li>Only at Layer 1 (the Physical Layer) does actual physical electromagnetic or optical energy pass across the wire.</li>
      </ul>`,
      diagram: `
+---------------------------------------------------------------------------------+
|                       VIRTUAL VS PHYSICAL COMMUNICATION                         |
|                                                                                 |
|   Host A (Sender)                                            Host B (Receiver)  |
|  +--------------------+   Layer 5 Virtual Dialogue          +-----------------+ |
|  | Application (L5)   |< - - - - - - - - - - - - - - - - - >| Application(L5) | |
|  +---------+----------+                                     +--------+--------+ |
|            | SDU down                                                ^ PDU up   |
|            v                                                         |          |
|  +--------------------+   Layer 4 Virtual Transport         +-----------------+ |
|  | Transport (L4)     |< - - - - - - - - - - - - - - - - - >| Transport (L4)  | |
|  +---------+----------+                                     +--------+--------+ |
|            | SDU down                                                ^ PDU up   |
|            v                                                         |          |
|  +--------------------+   Layer 3 Virtual Routing           +-----------------+ |
|  | Network (L3)       |< - - - - - - - - - - - - - - - - - >| Network (L3)    | |
|  +---------+----------+                                     +--------+--------+ |
|            | SDU down                                                ^ PDU up   |
|            v                                                         |          |
|  +--------------------+   Layer 2 Virtual Hop               +-----------------+ |
|  | Data Link (L2)     |< - - - - - - - - - - - - - - - - - >| Data Link (L2)  | |
|  +---------+----------+                                     +--------+--------+ |
|            | Bits                                                    ^ Bits     |
|            v                                                         |          |
|  +--------------------+      Actual Physical Cable          +-----------------+ |
|  | Physical (L1)      |====================================>| Physical (L1)   | |
|  +--------------------+                                     +-----------------+ |
+---------------------------------------------------------------------------------+`,
      technicalDetails: `<p><strong>Layering Overhead & Costs:</strong> While layering provides exceptional modularity, it incurs performance costs:</p>
      <ul class="wiki-bullet-list">
        <li><strong>Header Overhead:</strong> Each layer prepends its own header (e.g., 20B IP + 20B TCP + 14B Ethernet = 54 bytes minimum overhead per packet).</li>
        <li><strong>Processing Latency:</strong> Passing data across kernel layer boundaries requires context switches, buffer copying, and cache invalidation.</li>
        <li><strong>Cross-Layer Optimization Barriers:</strong> Lower layers cannot easily utilize application knowledge (e.g., a wireless link layer retransmitting lost video frames that have already expired at the application layer).</li>
      </ul>`,
      workedExample: `<div class="worked-example-box">
        <strong>Protocol Efficiency Calculation:</strong><br>
        Suppose an application transmits a small sensor reading of payload size $P = 40\\text{ bytes}$ over standard IPv4 and TCP across an Ethernet link (MTU = 1500 bytes).
        <br>• Application Payload: $40\\text{ bytes}$
        <br>• TCP Header: $20\\text{ bytes}$
        <br>• IPv4 Header: $20\\text{ bytes}$
        <br>• Ethernet Header & Trailer: $14\\text{ bytes (Header)} + 4\\text{ bytes (FCS)} = 18\\text{ bytes}$
        <br>$$\\text{Total Frame Size} = 40 + 20 + 20 + 18 = 98\\text{ bytes}$$
        $$\\text{Protocol Efficiency} = \\frac{\\text{Payload Bytes}}{\\text{Total Frame Bytes}} = \\frac{40}{98} \\approx 40.8\\%$$
        Over 59% of the transmitted bits are control overhead! For large payloads (e.g., 1460 bytes payload in 1518 byte frame), efficiency rises to $\\frac{1460}{1518} \\approx 96.2\\%$.
      </div>`,
      advantagesLimitations: `<p>Layering allows independent hardware and software evolution, simplified standard debugging, and reusable protocol code across applications. Its primary limitation is potential performance overhead from redundant error checks and cross-boundary memory copying.</p>`,
      whereUsed: ["Linux socket buffer (sk_buff) architecture", "FreeBSD network subsystem", "Zero-copy kernel bypass frameworks (DPDK)"],
      commonMistakes: "Assuming each layer communicates directly with its peer on the remote computer through physical cables. Peer-to-peer communication is entirely virtual; data must physically descend all the way to Layer 1, cross the medium, and ascend the remote stack.",
      compareWith: {
        title: "Layered vs Monolithic Network Stacks",
        note: "Monolithic stacks optimize raw CPU cycles by merging functions, but are nearly impossible to upgrade or secure. Layered stacks prioritize maintainability, vendor interoperability, and modularity."
      },
      practice: {
        question: "In layered protocol communication, what is the term for the data unit passed down from Layer N to Layer N-1 before Layer N-1 prepends its own header?",
        choices: ["Protocol Data Unit (PDU)", "Service Data Unit (SDU)", "Frame Check Sequence (FCS)", "Maximum Transmission Unit (MTU)"],
        correctIndex: 1,
        explanation: "The data unit received from an upper layer is the Service Data Unit (SDU). Once the current layer prepends its control header, it becomes a Protocol Data Unit (PDU)."
      },
      references: [
        { cite: "Tanenbaum, A. S. (2021). Computer Networks (6th Ed.), Chapter 1.2.1: Protocol Hierarchies.", url: "https://www.pearson.com/" }
      ]
    },
    prevTopicId: "tcp-ip-model",
    nextTopicId: "encapsulation"
  },

  "encapsulation": {
    id: "encapsulation",
    title: "Encapsulation, Decapsulation & Multiplexing",
    unit: "Unit I: Networking Fundamentals",
    unitId: "unit1",
    level: "Level 1 — Core Mechanism",
    category: "fundamentals",
    difficulty: "Core",
    readingTime: "7 min read",
    standard: "IETF RFC 1122 / IEEE 802.3",
    oneLiner: "The process of wrapping higher-layer data with lower-layer control headers and trailers as it descends the protocol stack.",
    quickAnswer: "Encapsulation packages application data into transport segments (adding port numbers), then into network packets (adding IP addresses), and finally into data link frames (adding MAC addresses and CRC checksum trailers). At the receiver, decapsulation strips each header in reverse order.",
    whyItMatters: "Encapsulation provides layer independence and modular multiplexing: an Ethernet frame does not care whether its payload contains IPv4, IPv6, or ARP; an IP datagram does not care whether its payload contains TCP or UDP.",
    infobox: {
      layer: "All Layers (L1 - L7)",
      standard: "IETF RFC 791, RFC 793, IEEE 802.3",
      type: "Data Formatting & Header Wrapping",
      keyFormula: "\\text{PDU}_N = \\text{Header}_N + \\text{SDU}_{N+1} + \\text{Trailer}_N",
      prerequisites: ["protocol-stack", "hosts-routers-switches"],
      relatedConcepts: ["packet", "protocol", "protocol-stack"],
      compareWith: ["osi-model"],
      primaryUses: ["Packet Serialization", "VLAN Tagging (802.1Q)", "VPN Tunneling (IPsec, GRE)"]
    },
    sections: {
      overview: `<p><strong>Encapsulation</strong> is the foundational data-packaging mechanism in layered computer networks. When an application process transmits data, that data travels downward through the protocol stack. At each layer, the protocol adds a header (and occasionally a trailer) containing control information intended for its peer entity on the receiving host.</p>
      <p>The reverse process on the receiving host is <strong>decapsulation</strong>: as bits arrive from the physical wire, each layer inspects its own header, verifies integrity, strips the header, and demultiplexes the remaining payload to the appropriate protocol entity in the layer above.</p>`,
      howItWorks: `<h5 class="text-emerald-700 dark:text-emerald-400 font-bold mb-2">The Complete Journey of Encapsulated Data:</h5>
      <ol class="wiki-ordered-list">
        <li><strong>Application Layer:</strong> An HTTP process generates an HTTP Request: <code>GET /index.html HTTP/1.1</code>. This raw text is the Application Payload.</li>
        <li><strong>Transport Layer (TCP):</strong> The OS socket buffer prepends a <strong>TCP Header</strong> (minimum 20 bytes) containing Source Port, Destination Port, Sequence Number, and ACK Number. The resulting entity is a <strong>TCP Segment</strong>.</li>
        <li><strong>Network Layer (IP):</strong> The IP module prepends an <strong>IPv4 Header</strong> (minimum 20 bytes) containing Source IP, Destination IP, TTL, and Protocol identifier (6 for TCP). The resulting entity is an <strong>IP Packet (Datagram)</strong>.</li>
        <li><strong>Data Link Layer (Ethernet):</strong> The network driver prepends an <strong>Ethernet Header</strong> (14 bytes: Dest MAC, Source MAC, EtherType 0x0800) and appends a 4-byte <strong>Frame Check Sequence (FCS/CRC-32) Trailer</strong>. The resulting entity is an <strong>Ethernet Frame</strong>.</li>
        <li><strong>Physical Layer:</strong> Appends a 7-byte Preamble and 1-byte Start Frame Delimiter (SFD), modulating the bits into electrical voltages or optical laser pulses.</li>
      </ol>`,
      diagram: `
+---------------------------------------------------------------------------------+
|                    THE STEP-BY-STEP ENCAPSULATION PROCESS                       |
|                                                                                 |
|  [ Application Layer ]     [ User Application Data ]                            |
|                                       |                                         |
|                                       v Prepend TCP Header                      |
|  [ Transport Layer ]       [ TCP Hdr | Application Data ]                       |
|                                       |                                         |
|                                       v Prepend IPv4 Header                     |
|  [ Network Layer ]         [ IP Hdr  | TCP Hdr | App Data ]                     |
|                                       |                                         |
|                                       v Prepend Ethernet Hdr & Append FCS       |
|  [ Data Link Layer ]       [ Eth Hdr | IP Hdr  | TCP Hdr | App Data | Eth FCS ] |
|                                       |                                         |
|                                       v Convert to Bitstream                    |
|  [ Physical Layer ]        010010101110101001010101110101010010101110101001101  |
+---------------------------------------------------------------------------------+`,
      technicalDetails: `<p><strong>Demultiplexing Keys Across Layers:</strong> How does each receiving layer know which upper-layer protocol should receive the decapsulated payload? Each layer's header contains a <em>demultiplexing key</em>:</p>
      <ul class="wiki-bullet-list">
        <li><strong>Ethernet Frame:</strong> The 16-bit <code>EtherType</code> field (e.g., <code>0x0800</code> for IPv4, <code>0x86DD</code> for IPv6, <code>0x0806</code> for ARP).</li>
        <li><strong>IPv4 Datagram:</strong> The 8-bit <code>Protocol</code> field (e.g., <code>6</code> for TCP, <code>17</code> for UDP, <code>1</code> for ICMP).</li>
        <li><strong>TCP/UDP Segment:</strong> The 16-bit <code>Destination Port</code> field (e.g., <code>80</code> for HTTP, <code>443</code> for HTTPS, <code>53</code> for DNS).</li>
      </ul>`,
      workedExample: `<div class="worked-example-box">
        <strong>Encapsulation Overhead Calculation:</strong><br>
        Suppose an application sends an 80-byte message over standard Ethernet.
        <br>• Application Payload = 80 bytes
        <br>• Transport Layer (TCP Header) = 20 bytes
        <br>• Network Layer (IPv4 Header) = 20 bytes
        <br>• Link Layer (Ethernet Header + CRC Trailer) = 14 + 4 = 18 bytes
        <br>$$\\text{Total Frame Transmitted} = 80 + 20 + 20 + 18 = 138\\text{ bytes}$$
        $$\\text{Overhead Fraction} = \\frac{138 - 80}{138} = \\frac{58}{138} \\approx 42.0\\%$$
      </div>`,
      advantagesLimitations: `<p>Encapsulation provides strict protocol isolation and enables tunneling (e.g., encapsulating IPv6 packets inside IPv4 datagrams, or encrypting entire IP packets inside IPsec ESP headers). Its drawback is protocol overhead and MTU fragmentation when header stacking exceeds link limits.</p>`,
      whereUsed: ["Wireshark packet dissectors showing nested protocol trees", "VPN tunneling protocols (VXLAN, IPsec, GRE, WireGuard)"],
      commonMistakes: "Thinking routers decapsulate all the way to the application layer. Standard routers decapsulate only up to Layer 2 (stripping the incoming Ethernet frame), inspect the Layer 3 IP header to make a forwarding decision, and encapsulate the IP packet into a brand new Layer 2 frame for the next hop.",
      compareWith: {
        title: "Encapsulation vs Decapsulation",
        note: "Encapsulation prepends headers as data descends from Application to Physical; decapsulation strips headers as data ascends from Physical to Application."
      },
      practice: {
        question: "Which field in an IPv4 header allows the receiver network layer to correctly demultiplex the decapsulated payload to TCP or UDP?",
        choices: ["Time to Live (TTL)", "Protocol Number", "Type of Service (DSCP)", "Header Checksum"],
        correctIndex: 1,
        explanation: "The 8-bit Protocol field identifies the next-level protocol: value 6 indicates TCP, value 17 indicates UDP, and value 1 indicates ICMP."
      },
      references: [
        { cite: "Kurose & Ross (8th Ed.), Chapter 1.5.2: Encapsulation.", url: "https://gaia.cs.umass.edu/kurose_ross/" }
      ]
    },
    prevTopicId: "protocol-stack",
    nextTopicId: "network-topologies"
  },

  "network-topologies": {
    id: "network-topologies",
    title: "Network Topologies: Mesh, Star, Bus, Ring & Hybrid",
    unit: "Unit I: Networking Fundamentals",
    unitId: "unit1",
    level: "Level 1 — Geometric Layout",
    category: "fundamentals",
    difficulty: "Core",
    readingTime: "7 min read",
    standard: "IEEE 802.3 / IEEE 802.5 / Forouzan Ch 1.3",
    oneLiner: "The geometric, physical, and logical arrangement of computing nodes, links, and switches in a network.",
    quickAnswer: "Network topologies define how devices are interconnected. Common physical layouts include Mesh (fully redundant, $N(N-1)/2$ links), Star (central switch, dominant in modern LANs), Bus (single shared backbone cable), Ring (closed loop token passing), and Tree/Hybrid (hierarchical aggregation).",
    whyItMatters: "Topology selection governs installation cost, fault tolerance, bandwidth contention, and failure blast radiuses. Modern enterprise networks utilize Star-Wired topologies for physical wiring while routing as logical meshes.",
    infobox: {
      layer: "Physical Layer (L1) & Data Link (L2)",
      standard: "IEEE 802.3 (Star Ethernet), IEEE 802.5 (Token Ring)",
      type: "Physical & Logical Topology Layout",
      keyFormula: "\\text{Full Mesh Links: } L = \\frac{N(N - 1)}{2}, \\quad \\text{Ports per node: } N - 1",
      prerequisites: ["computer-network", "hosts-routers-switches"],
      relatedConcepts: ["transmission-media", "switch", "dll-switching"],
      compareWith: ["hub-vs-bridge-vs-switch-vs-router"],
      primaryUses: ["Campus Structured Cabling", "Core ISP WAN Backbones", "Data Center Leaf-Spine Topologies"]
    },
    sections: {
      overview: `<p>The <strong>topology</strong> of a network refers to the way in which a network of computers is laid out physically or logically. Two or more devices connect to a link; two or more links form a topology. The topology is the geometric representation of the relationship of all the links and linking nodes to one another.</p>
      <p>Distinguish carefully between <em>physical topology</em> (the actual layout of physical cables) and <em>logical topology</em> (how data flows between nodes regardless of physical wire layout). For instance, 10BASE-T Ethernet is physically wired as a star around a central hub, but operates logically as a broadcast bus.</p>`,
      howItWorks: `<h5 class="text-emerald-700 dark:text-emerald-400 font-bold mb-2">Core Network Topologies:</h5>
      <ul class="wiki-bullet-list">
        <li><strong>Mesh Topology:</strong> Every node has a dedicated point-to-point link to every other node in the network. For $N$ nodes, exactly $\\frac{N(N-1)}{2}$ links are required. Provides supreme fault tolerance and privacy, but installation cost scales as $O(N^2)$. Used in core ISP backbones.</li>
        <li><strong>Star Topology:</strong> Each node has a dedicated point-to-point cable connection to a central controller (switch or hub). Dominant in modern Ethernet LANs. If one host cable fails, only that host is disconnected. Central switch represents a single point of failure.</li>
        <li><strong>Bus Topology:</strong> All stations tap into a single continuous coaxial backbone cable with terminators at both ends (e.g., legacy 10BASE2/10BASE5). Prone to reflections and cable breaks that disable the entire network.</li>
        <li><strong>Ring Topology:</strong> Each node connects strictly to its two immediate neighbors, forming an unbroken circular loop. Data circulates in one direction via circulating tokens (IEEE 802.5 Token Ring, FDDI). A break in the ring disables the network unless dual counter-rotating rings are deployed.</li>
        <li><strong>Tree / Hierarchical Topology:</strong> Nodes are arranged in a tree hierarchy (Access layer &rarr; Distribution layer &rarr; Core layer). Standard in enterprise campus designs.</li>
      </ul>`,
      diagram: `
+---------------------------------------------------------------------------------+
|                       COMMON PHYSICAL NETWORK TOPOLOGIES                        |
|                                                                                 |
|      [MESH]                     [STAR]                        [BUS]             |
|     (A)---(B)                    (A)   (B)              (A)  (B)  (C)  (D)      |
|     | \\ / |                      \\   /                |    |    |    |        |
|     |  X  |                       [Switch]             ===================      |
|     | / \\ |                      /   \\                  Terminator  Terminator  |
|     (C)---(D)                    (C)   (D)                                      |
|  N(N-1)/2 Links              Single Switch Hub          Single Shared Backbone  |
+---------------------------------------------------------------------------------+`,
      technicalDetails: `<p><strong>Topology Comparison Matrix:</strong></p>
      <table class="wiki-table">
        <thead><tr><th>Topology</th><th>Total Cable Links</th><th>Hardware Ports / Node</th><th>Fault Tolerance</th><th>Installation Cost</th></tr></thead>
        <tbody>
          <tr><td><strong>Full Mesh</strong></td><td>$\\frac{N(N-1)}{2}$</td><td>$N - 1$</td><td>Highest (multiple redundant paths)</td><td>Extremely High ($O(N^2)$)</td></tr>
          <tr><td><strong>Star</strong></td><td>$N$</td><td>1</td><td>High (single node cable failure isolated)</td><td>Low to Moderate</td></tr>
          <tr><td><strong>Bus</strong></td><td>1 shared cable</td><td>1 tap</td><td>Very Low (cable cut halts entire network)</td><td>Lowest</td></tr>
          <tr><td><strong>Ring</strong></td><td>$N$</td><td>2 (in/out)</td><td>Moderate (broken ring halts loop)</td><td>Moderate</td></tr>
        </tbody>
      </table>`,
      workedExample: `<div class="worked-example-box">
        <strong>Mesh Topology Link and Port Scalability:</strong><br>
        A university hospital is designing a mission-critical network interconnecting $N = 12$ regional medical centers:
        <br>1. If a <strong>Full Mesh</strong> topology is used:
        $$\\text{Number of Links} = \\frac{12 \\times (12 - 1)}{2} = \\frac{12 \\times 11}{2} = 66\\text{ dedicated fiber links}$$
        Each router requires $N - 1 = 11$ high-speed WAN interface ports.
        <br>2. If a <strong>Star</strong> topology with a central core data center switch is used:
        $$\\text{Number of Links} = 12\\text{ links}$$
        Each remote router requires only 1 port.
        <br><em>Design Choice:</em> The hospital selects a <em>Partial Mesh</em> topology with 2 core hubs, balancing cost with redundancy.
      </div>`,
      advantagesLimitations: `<p>While Mesh topology provides theoretical perfection against multiple simultaneous link failures, its quadratic $O(N^2)$ link cost makes it impractical for large LANs. Modern networks overwhelmingly standardize on Star-wired Ethernet for physical convenience and manageability.</p>`,
      whereUsed: ["Spine-and-leaf Clos network architectures in cloud data centers", "Undersea submarine cable mesh backbones"],
      commonMistakes: "Confusing physical star with logical star. A legacy 10BASE-T hub uses physical star cabling (cables running to a central box), but the internal hub circuitry ties all lines together into a shared logical bus where collisions occur across all ports.",
      compareWith: {
        title: "Star vs Mesh Topologies",
        note: "Star requires only N links and 1 port per host (cheaper, central switch dependency). Mesh requires N(N-1)/2 links and N-1 ports per host (costly, supreme redundancy)."
      },
      practice: {
        question: "How many physical transmission links are required to connect 8 routers in a fully connected mesh network?",
        choices: ["8 links", "16 links", "28 links", "64 links"],
        correctIndex: 2,
        explanation: "In a fully connected mesh topology, the number of links is N(N-1)/2 = 8 * 7 / 2 = 28 links."
      },
      references: [
        { cite: "Forouzan, B. A. (2022). Data Communications and Networking (6th Ed.), Chapter 1.3: Network Topologies.", url: "https://www.mheducation.com/" }
      ]
    },
    prevTopicId: "encapsulation",
    nextTopicId: "circuit-vs-packet-switching"
  },

  "circuit-vs-packet-switching": {
    id: "circuit-vs-packet-switching",
    title: "Circuit Switching vs Packet Switching",
    unit: "Unit I: Networking Fundamentals",
    unitId: "unit1",
    level: "Level 1 — Foundational Paradigm",
    category: "fundamentals",
    difficulty: "Core",
    readingTime: "8 min read",
    standard: "Kurose & Ross Ch 1.3 / Tanenbaum Ch 2.5",
    oneLiner: "The fundamental comparison between dedicated end-to-end resource reservation (circuit switching) and statistical on-demand packet multiplexing (packet switching).",
    quickAnswer: "Circuit switching establishes a dedicated, reserved physical transmission channel for the entire duration of a session (e.g., traditional PSTN phone calls). Packet switching divides data into discrete packets that share bandwidth dynamically on demand without reservations, maximizing link utilization for bursty data traffic.",
    whyItMatters: "The decision to build the Internet on packet switching rather than circuit switching is the single most significant architectural choice in networking history, enabling cheap, scalable, and resilient digital communications.",
    infobox: {
      layer: "Physical Layer (L1) through Network Layer (L3)",
      standard: "PSTN, ATM vs IETF IP (RFC 791)",
      type: "Communication Switching Paradigms",
      keyFormula: "\\text{Statistical Gain: Packet switching supports } 3\\times \\text{ more users than circuit switching}",
      prerequisites: ["computer-network", "network-edge-core"],
      relatedConcepts: ["network-delay-loss", "multiplexing", "packet"],
      compareWith: ["circuit-switching-vs-packet-switching"],
      primaryUses: ["Global Internet (Packet Switching)", "Legacy Landline Telephony (Circuit Switching)", "Optical DWDM Circuit Provisioning"]
    },
    sections: {
      overview: `<p>There are two fundamental approaches to transferring data across a network of interconnected nodes: <strong>circuit switching</strong> and <strong>packet switching</strong>.</p>
      <p>In <strong>circuit-switched networks</strong>, the resources needed along a path (buffers, link transmission rate) to provide communication between end systems are <em>reserved</em> for the duration of the communication session. In <strong>packet-switched networks</strong>, these resources are <em>not reserved</em>; session requests use resources on demand, and as a consequence, packets may have to wait (queue) for access to a transmission link.</p>`,
      howItWorks: `<h5 class="text-emerald-700 dark:text-emerald-400 font-bold mb-2">Architectural Comparison:</h5>
      <ul class="wiki-bullet-list">
        <li><strong>Circuit Switching:</strong> A three-phase operation: Call Setup &rarr; Data Transfer &rarr; Circuit Teardown. Bandwidth is multiplexed using either <strong>FDM (Frequency Division Multiplexing)</strong> or <strong>TDM (Time Division Multiplexing)</strong>. When a circuit is idle (e.g., caller pauses speaking), the reserved channel capacity remains unused and wasted.</li>
        <li><strong>Packet Switching:</strong> No reservation. Data is sliced into packets with destination headers. Routers forward packets on a store-and-forward basis. If an output link is busy, packets queue in first-in-first-out (FIFO) buffers. If buffers fill, packet drops occur.</li>
      </ul>`,
      diagram: `
+---------------------------------------------------------------------------------+
|                    CIRCUIT SWITCHING VS PACKET SWITCHING                        |
|                                                                                 |
|   CIRCUIT SWITCHING (Dedicated Reserved Highway Lane):                          |
|   [Host A] ======= Reserved Constant Bandwidth (e.g., 64 kbps) ======> [Host B] |
|   * Silent pauses waste 100% of reserved capacity. Zero queuing delay.          |
|                                                                                 |
|   PACKET SWITCHING (Shared Statistical Traffic):                                |
|   [Host A] --[P1]-->   [ ROUTER ]   --[P1]--[P2]--[P3]--> [Host B]              |
|   [Host C] --[P2]-->   [ Buffer ]                                               |
|   * Packets share link on demand. Bursty traffic accommodated efficiently.       |
+---------------------------------------------------------------------------------+`,
      technicalDetails: `<p><strong>Mathematical Derivation of Statistical Multiplexing Gain:</strong></p>
      <p>Consider a $1\\text{ Mbps}$ transmission link. Suppose each user generates traffic at $100\\text{ kbps}$ when active, but is active only $10\\%$ of the time ($p = 0.10$):</p>
      <ul class="wiki-bullet-list">
        <li><em>Circuit Switching:</em> Each user requires a reserved $100\\text{ kbps}$. The link can support strictly:
        $$N_{\\text{circuit}} = \\frac{1000\\text{ kbps}}{100\\text{ kbps}} = 10\\text{ users}$$</li>
        <li><em>Packet Switching:</em> Suppose we allow $M = 35$ users on the link. The probability that more than 10 users are active simultaneously is given by the Binomial Distribution:
        $$P(\\text{active users} > 10) = \\sum_{k=11}^{35} \\binom{35}{k} (0.10)^k (0.90)^{35-k} \\approx 0.0004\\text{ (0.04\\%)}$$</li>
      </ul>
      <p>With packet switching, <strong>35 users</strong> can be supported with a 99.96% probability that all active packets experience zero buffer queuing! Packet switching supports over $3.5\\times$ more users than circuit switching on identical hardware.</p>`,
      workedExample: `<div class="worked-example-box">
        <strong>Call Setup Delay in Circuit Switching vs Store-and-Forward Delay:</strong><br>
        Suppose two hosts communicate over $k = 4$ hops with link bandwidth $R = 100\\text{ Mbps}$ and distance $d = 1000\\text{ km}$ per hop ($s = 2 \\times 10^8\\text{ m/s}$).
        <br>Propagation delay per hop: $t_{\\text{prop}} = \\frac{10^6}{2 \\times 10^8} = 5\\text{ ms}$.
        <br>• In Circuit Switching, a setup control packet must travel round-trip before data transfer begins:
        $$T_{\\text{setup}} = 2 \\times (4 \\times 5\\text{ ms}) = 40\\text{ ms}$$
        • In Packet Switching, the first data packet is transmitted immediately at $t = 0$ with zero call setup latency!
      </div>`,
      advantagesLimitations: `<table class="wiki-table">
        <thead><tr><th>Dimension</th><th>Circuit Switching</th><th>Packet Switching</th></tr></thead>
        <tbody>
          <tr><td>Resource Allocation</td><td>Dedicated, pre-allocated per call</td><td>Dynamic, on-demand statistical sharing</td></tr>
          <tr><td>Bandwidth Waste</td><td>High during idle periods</td><td>Minimal; link active whenever packets queue</td></tr>
          <tr><td>QoS / Guarantees</td><td>Strict predictable latency and bandwidth</td><td>Best-effort; variable queuing jitter and loss</td></tr>
          <tr><td>Congestion Behavior</td><td>Call blocked if busy (busy tone)</td><td>Packets queued; potential packet drops</td></tr>
        </tbody>
      </table>`,
      whereUsed: ["Internet IP networks (Packet switching)", "Traditional telephone network (PSTN), cellular voice circuits (Circuit switching)"],
      commonMistakes: "Believing that circuit switching means physical copper wires are moved by human operators. Modern circuit switching uses electronic time-division crossbars and wavelength-selective switches (WSS) in optical networks.",
      compareWith: {
        title: "Circuit vs Packet Switching",
        note: "Circuit switching guarantees constant performance at high waste. Packet switching maximizes bandwidth efficiency but introduces queuing jitter and loss."
      },
      practice: {
        question: "Why is packet switching substantially more efficient than circuit switching for typical Internet traffic such as web browsing and email?",
        choices: [
          "Internet traffic is continuous and never exhibits silent pauses.",
          "Internet traffic is bursty: users alternate between active data transfers and long idle thinking periods.",
          "Packet switching eliminates the need for IP addressing.",
          "Packet switching increases physical signal propagation velocity through copper."
        ],
        correctIndex: 1,
        explanation: "Internet traffic is highly bursty. Packet switching dynamically reallocates shared link bandwidth during idle periods, whereas circuit switching leaves reserved channels idle and wasted."
      },
      references: [
        { cite: "Kurose & Ross (8th Ed.), Chapter 1.3.1: Circuit Switching versus Packet Switching.", url: "https://gaia.cs.umass.edu/kurose_ross/" }
      ]
    },
    prevTopicId: "network-topologies",
    nextTopicId: "transmission-media"
  },

  "transmission-media": {
    id: "transmission-media",
    title: "Physical Layer Transmission Media: Guided & Unguided",
    unit: "Unit I: Networking Fundamentals",
    unitId: "unit1",
    level: "Level 1 — Physical Substrate",
    category: "fundamentals",
    difficulty: "Core",
    readingTime: "8 min read",
    standard: "IEEE 802.3 / TIA/EIA-568 / ITU-T G.652 (Single Mode Fiber)",
    oneLiner: "The physical transmission pathways that carry encoded electromagnetic, optical, or radio signals between network nodes.",
    quickAnswer: "Transmission media are divided into Guided (cables: Twisted Pair, Coaxial, Fiber Optic) and Unguided (wireless: Radio, Microwave, Infrared). Twisted pair uses cancellation to mitigate electromagnetic interference (EMI); fiber optics uses total internal reflection for ultra-high bandwidth over tens of kilometers.",
    whyItMatters: "The physical medium sets the ultimate upper bound on network throughput, maximum distance without repeaters, electromagnetic noise susceptibility, and financial deployment cost.",
    infobox: {
      layer: "Layer 1 (Physical Layer)",
      standard: "TIA/EIA-568 (Twisted Pair), ITU-T G.652 (SMF), IEEE 802.11",
      type: "Physical Waveguides & Wireless Propagation",
      keyFormula: "\\text{Propagation Speed: } s = \\frac{c}{n} \\approx 2 \\times 10^8\\text{ m/s in glass/copper}",
      prerequisites: ["computer-network", "analog-digital-signals"],
      relatedConcepts: ["analog-digital-signals", "network-delay-loss", "hosts-routers-switches"],
      compareWith: ["network-edge-core"],
      primaryUses: ["Structured Office Cabling (Cat6/Cat6a)", "Intercontinental Submarine Cables (DWDM SMF)", "Campus Wi-Fi & 5G Cellular"]
    },
    sections: {
      overview: `<p>A transmission medium is the physical path between transmitter and receiver in a data transmission system. It is classified into two broad categories:</p>
      <ul class="wiki-bullet-list">
        <li><strong>Guided Media:</strong> Electromagnetic waves are guided along a solid, physical conduit (copper wires, optical fibers).</li>
        <li><strong>Unguided Media:</strong> Wireless transmission through the atmosphere, vacuum, or water via electromagnetic radiation (radio waves, microwaves, infrared).</li>
      </ul>`,
      howItWorks: `<h5 class="text-emerald-700 dark:text-emerald-400 font-bold mb-2">Detailed Guided Media Architectures:</h5>
      <ul class="wiki-bullet-list">
        <li><strong>Twisted Pair Cable:</strong> Consists of two insulated copper wires twisted together in a helical spiral. Twisting ensures that both wires receive approximately equal electromagnetic interference (EMI); differential signaling at the receiver cancels the common-mode noise ($V_{\\text{diff}} = V_+ - V_-$). Categorized by TIA/EIA standards:
          <br>• <em>Cat 5e:</em> Up to 100 MHz, supports 1 Gbps up to 100 m.
          <br>• <em>Cat 6:</em> Up to 250 MHz, supports 10 Gbps up to 55 m.
          <br>• <em>Cat 6a:</em> Up to 500 MHz, supports 10 Gbps up to full 100 m with shielded foil.</li>
        <li><strong>Coaxial Cable:</strong> A central copper conductor surrounded by a concentric dielectric insulator, braided wire shielding, and outer jacket. Offers superior shielding compared to unshielded twisted pair. Widely used in DOCSIS cable television systems.</li>
        <li><strong>Optical Fiber:</strong> Transmits digital light pulses generated by LEDs or injection laser diodes. Operates via <strong>Total Internal Reflection</strong>: light traveling through a high-refractive-index core ($n_1$) reflects off a lower-refractive-index cladding ($n_2$):
          <br>• <em>Multimode Fiber (MMF):</em> Large core (50-62.5 $\\mu$m). Multiple light modes bounce at different angles, causing modal dispersion. Restricted to short campus runs (&lt; 500 m).
          <br>• <em>Single-Mode Fiber (SMF):</em> Tiny core (8-10 $\\mu$m). Only a single fundamental light mode propagates straight down the fiber. Eliminates modal dispersion, enabling transmission over 100+ km without amplification.</li>
      </ul>`,
      diagram: `
+---------------------------------------------------------------------------------+
|                       OPTICAL FIBER TOTAL INTERNAL REFLECTION                   |
|                                                                                 |
|       Cladding Glass (Refractive Index n2 = 1.46)                               |
|   +-------------------------------------------------------------------------+   |
|   |   \\           /             \\             /             \\              |   |
|   |    \\ Light   /               \\           /               \\             |   |
|   |=====\\=======/=================\\=========/=================\\============|   |
|   |      \\     /                   \\       /                   \\  Core (n1) |   |
|   +-------------------------------------------------------------------------+   |
|       Cladding Glass (n2 < n1)                                                  |
|       Condition for Total Internal Reflection: Angle of Incidence theta > theta_c|
+---------------------------------------------------------------------------------+`,
      technicalDetails: `<p><strong>Comparison of Physical Transmission Media:</strong></p>
      <table class="wiki-table">
        <thead><tr><th>Medium</th><th>Bandwidth / Data Rate</th><th>Max Distance (No Repeater)</th><th>Noise Immunity (EMI)</th><th>Cost</th></tr></thead>
        <tbody>
          <tr><td>Unshielded Twisted Pair (Cat 6a)</td><td>10 Gbps</td><td>100 meters</td><td>Moderate (differential twists)</td><td>Low</td></tr>
          <tr><td>Coaxial Cable (RG-6)</td><td>1 - 2 Gbps (DOCSIS)</td><td>500 meters</td><td>High (braided outer shield)</td><td>Moderate</td></tr>
          <tr><td>Multimode Optical Fiber</td><td>10 - 100 Gbps</td><td>300 - 550 meters</td><td>Immune (photons unaffected by EMI)</td><td>Moderate</td></tr>
          <tr><td>Single-Mode Optical Fiber</td><td>100 Gbps - 40+ Tbps</td><td>40 - 100+ kilometers</td><td>Immune to electromagnetic fields</td><td>High</td></tr>
          <tr><td>Free-Space Wireless (Wi-Fi 6)</td><td>1 - 9.6 Gbps (Shared)</td><td>30 - 70 meters</td><td>Low (multipath fading, interference)</td><td>Low</td></tr>
        </tbody>
      </table>`,
      workedExample: `<div class="worked-example-box">
        <strong>Signal Attenuation in Optical Fiber:</strong><br>
        Optical attenuation is measured in decibels per kilometer ($dB/km$):
        $$\\text{Attenuation (dB)} = 10 \\log_{10}\\left(\\frac{P_{\\text{in}}}{P_{\\text{out}}}\\right)$$
        Suppose a single-mode fiber link has an attenuation coefficient $\\alpha = 0.2\\text{ dB/km}$ at wavelength $\\lambda = 1550\\text{ nm}$. If the transmitter injects $P_{\\text{in}} = 10\\text{ mW}$ of laser power across a $L = 50\\text{ km}$ span:
        <br>1. Total loss in decibels:
        $$\\text{Loss} = \\alpha \\times L = 0.2\\text{ dB/km} \\times 50\\text{ km} = 10\\text{ dB}$$
        <br>2. Received optical power $P_{\\text{out}}$:
        $$10 = 10 \\log_{10}\\left(\\frac{10\\text{ mW}}{P_{\\text{out}}}\\right) \\implies \\log_{10}\\left(\\frac{10}{P_{\\text{out}}}\\right) = 1 \\implies \\frac{10}{P_{\\text{out}}} = 10 \\implies P_{\\text{out}} = 1.0\\text{ mW}$$
        Exactly 10% of the input power reaches the receiver, which is well above typical photodiode receiver sensitivity thresholds ($-20\\text{ dBm} = 0.01\\text{ mW}$).
      </div>`,
      advantagesLimitations: `<p>Optical fiber offers virtually unlimited bandwidth, zero EMI susceptibility, thin lightweight form-factor, and no electrical spark risk in hazardous environments. Its limitations are high splicing termination costs and vulnerability to physical cable shears.</p>`,
      whereUsed: ["Trans-Pacific and Trans-Atlantic submarine cables", "Data center inter-rack optical links"],
      commonMistakes: "Believing light travels through fiber optic glass at the speed of light in vacuum ($c = 3 \\times 10^8\\text{ m/s}$). Due to the glass refractive index ($n \\approx 1.5$), light propagates at $s = c/n \\approx 2 \\times 10^8\\text{ m/s}$ (about 5 microseconds per kilometer).",
      compareWith: {
        title: "Single-Mode vs Multi-Mode Fiber",
        note: "Single-mode has a tiny 9 um core and zero modal dispersion for long distances. Multi-mode has a 50 um core and uses cheap LEDs, but suffers modal dispersion limiting it to short campus spans."
      },
      practice: {
        question: "Why does Single-Mode Optical Fiber support significantly longer transmission distances than Multimode Optical Fiber without repeaters?",
        choices: [
          "It uses thicker glass that blocks ambient electromagnetic noise.",
          "Its narrow core diameter allows only a single spatial light mode, eliminating modal dispersion.",
          "It operates at lower optical frequencies than multimode fiber.",
          "It uses copper wire reinforcement along the cladding."
        ],
        correctIndex: 1,
        explanation: "Single-mode fiber has a core diameter (8-10 microns) comparable to the wavelength of light, forcing light to travel in a single mode and eliminating modal dispersion."
      },
      references: [
        { cite: "Tanenbaum, A. S. (2021). Computer Networks (6th Ed.), Chapter 2.2: Guided Transmission Media.", url: "https://www.pearson.com/" },
        { cite: "ITU-T G.652: Characteristics of a single-mode optical fibre cable", url: "https://www.itu.int/rec/T-REC-G.652" }
      ]
    },
    prevTopicId: "circuit-vs-packet-switching",
    nextTopicId: "network-delay-loss"
  },

  "network-delay-loss": {
    id: "network-delay-loss",
    title: "Network Performance: Delays, Loss & Bandwidth-Delay Product",
    unit: "Unit I: Networking Fundamentals",
    unitId: "unit1",
    level: "Level 1 — Quantitative Metrics",
    category: "fundamentals",
    difficulty: "Core",
    readingTime: "9 min read",
    standard: "Kurose & Ross Ch 1.4 / RFC 2681",
    oneLiner: "The four components of total nodal delay—processing, queuing, transmission, and propagation—and their role in buffer overflow and throughput.",
    quickAnswer: "Total nodal delay is the sum of four components: d_nodal = d_proc + d_queue + d_trans + d_prop. Transmission delay (L/R) depends on packet length and link rate; propagation delay (d/s) depends on distance and speed of light in the medium. The Bandwidth-Delay Product (BDP) defines the total bit capacity 'in flight' within the link pipe.",
    whyItMatters: "Confusing transmission delay with propagation delay is the single most common numerical error in networking examinations. Calculating end-to-end delay and BDP is required to tune TCP window sizes and prevent throughput starvation.",
    infobox: {
      layer: "All Layers (L1 - L4 Performance)",
      standard: "IETF RFC 2681 (Round Trip Delay Metric)",
      type: "Mathematical Performance Metrics",
      keyFormula: "d_{\\text{nodal}} = d_{\\text{proc}} + d_{\\text{queue}} + \\frac{L}{R} + \\frac{d}{s}, \\quad \\text{BDP} = R \\times \\text{RTT}",
      prerequisites: ["computer-network", "transmission-media"],
      relatedConcepts: ["transmission-media", "circuit-vs-packet-switching", "tcp-flow-control"],
      compareWith: ["flow-control-vs-congestion-control"],
      primaryUses: ["TCP Buffer Tuning", "Audio/Video Latency Budgeting", "Network SLA Verification"]
    },
    sections: {
      overview: `<p>As a packet travels from a source host across intermediate routers to a destination host, it experiences various delays at each node along the path. The total delay experienced by a packet at a single router hop is called the <strong>nodal delay</strong> ($d_{\\text{nodal}}$), composed of four distinct components:</p>
      $$d_{\\text{nodal}} = d_{\\text{proc}} + d_{\\text{queue}} + d_{\\text{trans}} + d_{\\text{prop}}$$`,
      howItWorks: `<h5 class="text-emerald-700 dark:text-emerald-400 font-bold mb-2">The Four Components of Nodal Delay:</h5>
      <ol class="wiki-ordered-list">
        <li><strong>Nodal Processing Delay ($d_{\\text{proc}}$):</strong> Time required by the router to examine the packet header, check for bit-level errors using checksums, and determine the output interface using forwarding table lookups. Typically microseconds in hardware TCAMs.</li>
        <li><strong>Queuing Delay ($d_{\\text{queue}}$):</strong> Time the packet spends waiting in the router's output buffer queue for the transmission link to become available. Highly variable; depends on real-time traffic intensity:
          $$I = \\frac{L \\cdot a}{R}$$
          where $L$ is packet size (bits), $a$ is average arrival rate (packets/sec), and $R$ is link rate (bps). If $I > 1$, queuing delay approaches infinity and packets are dropped (packet loss).</li>
        <li><strong>Transmission Delay ($d_{\\text{trans}}$):</strong> The time required for the router to push (serialize) all $L$ bits of the packet onto the link of transmission rate $R$:
          $$d_{\\text{trans}} = \\frac{L}{R}$$</li>
        <li><strong>Propagation Delay ($d_{\\text{prop}}$):</strong> The time required for a physical electromagnetic bit to travel from the beginning of the link to the destination router over physical distance $d$ at propagation speed $s$ ($s \\approx 2 \\times 10^8\\text{ m/s}$ in copper and glass):
          $$d_{\\text{prop}} = \\frac{d}{s}$$</li>
      </ol>`,
      diagram: `
+---------------------------------------------------------------------------------+
|                       THE FOUR COMPONENTS OF NODAL DELAY                        |
|                                                                                 |
|                   +------------------ ROUTER -----------------+                 |
|                   |                                           |                 |
|   Packet Arrives  | [1. Processing] --> [2. Queuing Buffer]   |                 |
|  ================>| Header check,       Packets wait in       |                 |
|                   | routing lookup      FIFO queue            |                 |
|                   | (d_proc ~ us)       (d_queue: variable)   |                 |
|                   +-----------------------+-------------------+                 |
|                                           |                                     |
|                                           v                                     |
|                                    [3. Transmission]                            |
|                                    Bits pushed onto link (d_trans = L/R)        |
|                                           |                                     |
|                                           v                                     |
|                   =================== LINK ====================> Next Hop       |
|                   [4. Propagation] Bits travel across physical cable (d/s)     |
+---------------------------------------------------------------------------------+`,
      technicalDetails: `<p><strong>The Bandwidth-Delay Product (BDP):</strong></p>
      <p>The product of the link capacity $R$ and the round-trip propagation time $\\text{RTT}$ defines the volume of bits that can be "in flight" inside the physical communication pipe at any instant:</p>
      $$\\text{BDP} = R \\times \\text{RTT}$$
      <p>If a sender's transmission window is smaller than the BDP, the sender will finish transmitting and stall waiting for acknowledgments, leaving the link completely idle and underutilized.</p>`,
      workedExample: `<div class="worked-example-box">
        <strong>Comprehensive End-to-End Delay Calculation:</strong><br>
        Suppose a host sends a packet of size $L = 1500\\text{ bytes} = 12,000\\text{ bits}$ across a link with transmission rate $R = 100\\text{ Mbps} = 10^8\\text{ bps}$ and distance $d = 2,500\\text{ km}$ ($2.5 \\times 10^6\\text{ m}$). Propagation speed $s = 2 \\times 10^8\\text{ m/s}$. Router processing delay $d_{\\text{proc}} = 10\\text{ }\\mu\\text{s}$. The router buffer currently holds 2 packets ahead of this packet.
        <br>1. <strong>Transmission Delay:</strong>
        $$d_{\\text{trans}} = \\frac{12,000\\text{ bits}}{10^8\\text{ bps}} = 0.00012\\text{ s} = 0.12\\text{ ms} = 120\\text{ }\\mu\\text{s}$$
        <br>2. <strong>Queuing Delay:</strong> (Must wait for 2 ahead packets to transmit):
        $$d_{\\text{queue}} = 2 \\times d_{\\text{trans}} = 2 \\times 0.12\\text{ ms} = 0.24\\text{ ms}$$
        <br>3. <strong>Propagation Delay:</strong>
        $$d_{\\text{prop}} = \\frac{2.5 \\times 10^6\\text{ m}}{2 \\times 10^8\\text{ m/s}} = 0.0125\\text{ s} = 12.5\\text{ ms}$$
        <br>4. <strong>Total Nodal Delay:</strong>
        $$d_{\\text{nodal}} = 0.010\\text{ ms (proc)} + 0.240\\text{ ms (queue)} + 0.120\\text{ ms (trans)} + 12.500\\text{ ms (prop)} = 12.870\\text{ ms}$$
        Notice that propagation delay (12.5 ms) dominates over transmission delay (0.12 ms) by a factor of 100!
      </div>`,
      advantagesLimitations: `<p>Throughput can be maximized by keeping pipeline windows equal to BDP. However, large buffer sizing (bufferbloat) causes excessive queuing latency for interactive traffic.</p>`,
      whereUsed: ["TCP Window Scaling (RFC 7323) for high-BDP satellite and 100G research links", "Real-time gaming latency optimization"],
      commonMistakes: "Thinking that upgrading a 10 Mbps home broadband link to a 1 Gbps link will reduce ping time (latency) to a game server 5,000 km away. Ping time is dominated by propagation delay (speed of light over distance), which is completely unaffected by bandwidth rate upgrades.",
      compareWith: {
        title: "Transmission Delay vs Propagation Delay",
        note: "Transmission delay (L/R) is the time to push bits onto the link; propagation delay (d/s) is the time for one bit to travel through the physical cable."
      },
      practice: {
        question: "A sender transmits 10,000-bit packets over a 1 Gbps link spanning 2,000 km (speed = 200,000 km/s). What are the transmission delay and propagation delay, respectively?",
        choices: [
          "d_trans = 10 ms, d_prop = 10 ms",
          "d_trans = 10 microseconds, d_prop = 10 ms",
          "d_trans = 10 ms, d_prop = 10 microseconds",
          "d_trans = 1 microsecond, d_prop = 1 second"
        ],
        correctIndex: 1,
        explanation: "d_trans = 10,000 / 10^9 = 10^-5 s = 10 microseconds. d_prop = 2,000 km / 200,000 km/s = 0.01 s = 10 ms."
      },
      references: [
        { cite: "Kurose & Ross (8th Ed.), Chapter 1.4: Delay, Loss, and Throughput in Packet-Switched Networks.", url: "https://gaia.cs.umass.edu/kurose_ross/" }
      ]
    },
    prevTopicId: "transmission-media",
    nextTopicId: "multiplexing"
  },

  "multiplexing": {
    id: "multiplexing",
    title: "Multiplexing Techniques: FDM, TDM, WDM & STDM",
    unit: "Unit I: Networking Fundamentals",
    unitId: "unit1",
    level: "Level 1 — Physical Layer Technique",
    category: "fundamentals",
    difficulty: "Core",
    readingTime: "7 min read",
    standard: "ITU-T G.694.1 (DWDM) / Forouzan Ch 6",
    oneLiner: "Techniques allowing multiple independent signal streams to simultaneously share a single high-capacity physical transmission medium.",
    quickAnswer: "Multiplexing combines multiple digital or analog channels over a single physical link. Frequency Division Multiplexing (FDM) splits frequency spectrum; Time Division Multiplexing (TDM) allocates recurring time slots; Wavelength Division Multiplexing (WDM) transmits multiple light colors through optical fiber; Statistical TDM allocates slots dynamically on demand.",
    whyItMatters: "Deploying physical cables across oceans or underground trenches costs billions of dollars. Multiplexing allows a single fiber strand to carry tens of terabits per second across thousands of simultaneous independent communications.",
    infobox: {
      layer: "Layer 1 (Physical Layer)",
      standard: "ITU-T G.694.1 (Dense Wavelength Division Multiplexing)",
      type: "Channel Sharing & Capacity Multiplication",
      keyFormula: "\\text{Aggregate Capacity: } C_{\\text{total}} = \\sum_{i=1}^N C_i",
      prerequisites: ["transmission-media", "analog-digital-signals"],
      relatedConcepts: ["analog-digital-signals", "circuit-vs-packet-switching", "transmission-media"],
      compareWith: ["circuit-vs-packet-switching"],
      primaryUses: ["Long-Haul Optical DWDM Systems", "Cellular 4G/5G OFDMA", "Broadband Cable Systems"]
    },
    sections: {
      overview: `<p><strong>Multiplexing</strong> is the set of techniques that allows the simultaneous transmission of multiple signals across a single data link. Whenever the bandwidth of a medium linking two devices is greater than the bandwidth requirements of the individual devices, the link can be shared.</p>
      <p>A multiplexer (MUX) combines the individual data lines into a single composite stream at the transmitter; a demultiplexer (DEMUX) separates the stream into its constituent components at the receiver.</p>`,
      howItWorks: `<h5 class="text-emerald-700 dark:text-emerald-400 font-bold mb-2">Primary Multiplexing Paradigms:</h5>
      <ul class="wiki-bullet-list">
        <li><strong>FDM (Frequency Division Multiplexing):</strong> An analog technique applied when the medium bandwidth is larger than the combined signal bandwidths. Signals are modulated onto distinct carrier frequencies separated by unallocated guard bands to prevent inter-channel cross-talk (e.g., commercial radio broadcast, cable TV).</li>
        <li><strong>TDM (Time Division Multiplexing):</strong> A digital technique where multiple connections share the entire bandwidth by taking turns in recurring time slots. In <em>Synchronous TDM</em>, each connection is allocated a fixed slot in every frame even if it has no data to send (wasting bandwidth).</li>
        <li><strong>STDM (Statistical TDM):</strong> Dynamically allocates time slots only to active channels on demand, prepending channel address headers to avoid idle slot waste.</li>
        <li><strong>WDM (Wavelength Division Multiplexing):</strong> FDM applied to optical frequencies. Multiple optical carrier lasers of distinct wavelengths (colors of light) are combined into a single optical fiber:
          <br>• <em>CWDM (Coarse WDM):</em> Up to 18 channels with 20 nm channel spacing.
          <br>• <em>DWDM (Dense WDM):</em> Up to 80-160 channels spaced 0.8 nm (100 GHz) or 0.4 nm (50 GHz) apart, enabling 40+ Terabits/sec over a single fiber pair!</li>
      </ul>`,
      diagram: `
+---------------------------------------------------------------------------------+
|                       FDM VS TDM CHANNEL ALLOCATION                             |
|                                                                                 |
|   FREQUENCY DIVISION MULTIPLEXING (FDM):        TIME DIVISION MULTIPLEXING (TDM)|
|   Frequency                                     Frequency                       |
|   ^                                             ^                               |
|   | [Channel 3: 104-108 MHz]                    |                               |
|   | ------------------------ (Guard Band)       |  All frequencies shared       |
|   | [Channel 2: 96-100 MHz]                     |  by all channels in turn:     |
|   | ------------------------ (Guard Band)       |                               |
|   | [Channel 1: 88-92 MHz]                      | [Ch1][Ch2][Ch3][Ch1][Ch2][Ch3]|
|   +-----------------------------> Time          +-----------------------------> |
|                                                    Slot 1 Slot 2 Slot 3 (Time)  |
+---------------------------------------------------------------------------------+`,
      technicalDetails: `<p><strong>Comparison of Multiplexing Technologies:</strong></p>
      <table class="wiki-table">
        <thead><tr><th>Technique</th><th>Signal Type</th><th>Dividing Dimension</th><th>Primary Media</th><th>Slot Efficiency</th></tr></thead>
        <tbody>
          <tr><td><strong>FDM</strong></td><td>Analog</td><td>Frequency Spectrum</td><td>Coaxial, Radio Spectrum</td><td>Guard bands required</td></tr>
          <tr><td><strong>TDM (Sync)</strong></td><td>Digital</td><td>Time Slices</td><td>T1/E1 Copper, SONET/SDH</td><td>Wastes slots when sources idle</td></tr>
          <tr><td><strong>Statistical TDM</strong></td><td>Digital</td><td>On-demand Time Slices</td><td>Packet Switching, ATM</td><td>High (dynamic allocation)</td></tr>
          <tr><td><strong>WDM / DWDM</strong></td><td>Optical</td><td>Light Wavelengths ($\\lambda$)</td><td>Single-Mode Optical Fiber</td><td>Massive aggregate bandwidth</td></tr>
        </tbody>
      </table>`,
      workedExample: `<div class="worked-example-box">
        <strong>Synchronous TDM Frame Rate and Bit Rate:</strong><br>
        Suppose $N = 4$ digital voice sources are multiplexed using Synchronous TDM. Each source produces standard telephone audio sampled at $8000\\text{ samples/s}$ with $8\\text{ bits/sample}$ ($64\\text{ kbps}$ per channel). A 1-bit framing synchronization bit is added to each TDM frame.
        <br>1. Bits per frame = $(4 \\times 8\\text{ bits}) + 1\\text{ framing bit} = 33\\text{ bits/frame}$.
        <br>2. Since each source produces 8000 samples/sec, the multiplexer must send $8000\\text{ frames/s}$.
        <br>3. Aggregate transmission bit rate:
        $$R_{\\text{TDM}} = 8000\\text{ frames/s} \\times 33\\text{ bits/frame} = 264,000\\text{ bps} = 264\\text{ kbps}$$
      </div>`,
      advantagesLimitations: `<p>Multiplexing drastically lowers per-bit infrastructure costs. However, FDM requires guard bands that reduce usable spectrum, and synchronous TDM suffers severe capacity waste when bursty sources fall silent.</p>`,
      whereUsed: ["Dense WDM in transoceanic cables", "OFDMA in 4G LTE, 5G NR, and Wi-Fi 6 (802.11ax)"],
      commonMistakes: "Thinking that WDM and FDM are fundamentally different concepts. WDM is literally FDM operating in the optical frequency domain (hundreds of Terahertz) rather than the radio frequency domain (Megahertz/Gigahertz).",
      compareWith: {
        title: "Synchronous TDM vs Statistical TDM",
        note: "Synchronous TDM reserves a slot for every channel in every frame (wasting empty slots). Statistical TDM assigns slots dynamically only to active channels."
      },
      practice: {
        question: "In Frequency Division Multiplexing (FDM), what is the purpose of allocating unassigned frequency intervals called 'guard bands' between adjacent channels?",
        choices: [
          "To provide power amplification to optical signals.",
          "To prevent signal overlap and cross-talk interference between adjacent channels.",
          "To synchronize receiver clock frequencies with the transmitter.",
          "To store packet headers during store-and-forward switching."
        ],
        correctIndex: 1,
        explanation: "Guard bands are narrow unallocated frequency buffers placed between channels to prevent signal distortion and cross-talk caused by filter roll-off."
      },
      references: [
        { cite: "Forouzan, B. A. (2022). Data Communications and Networking (6th Ed.), Chapter 6: Multiplexing.", url: "https://www.mheducation.com/" },
        { cite: "ITU-T G.694.1: Spectral grids for WDM applications: DWDM frequency grid", url: "https://www.itu.int/rec/T-REC-G.694.1" }
      ]
    },
    prevTopicId: "network-delay-loss",
    nextTopicId: "analog-digital-signals"
  },

  "analog-digital-signals": {
    id: "analog-digital-signals",
    title: "Signal Fundamentals: Bandwidth, Nyquist Rate & Shannon Capacity",
    unit: "Unit I: Networking Fundamentals",
    unitId: "unit1",
    level: "Level 1 — Mathematical Foundations",
    category: "fundamentals",
    difficulty: "Advanced",
    readingTime: "9 min read",
    standard: "Nyquist (1928) / Shannon (1948) / Tanenbaum Ch 2.1",
    oneLiner: "The mathematical laws governing physical transmission channels, maximum signaling rates, and upper theoretical channel capacities in the presence of thermal noise.",
    quickAnswer: "Analog signals are continuous waveforms; digital signals are discrete voltage pulses. The Nyquist Theorem sets the maximum data rate for noiseless channels: C = 2B log2(M). Shannon's Capacity Theorem establishes the absolute theoretical capacity of noisy channels: C = B log2(1 + SNR), proving that higher data rates require wider bandwidth or improved signal-to-noise ratios.",
    whyItMatters: "Nyquist and Shannon capacities represent the fundamental physical limits of communication over any medium. Every modem, Wi-Fi standard, 5G cellular modulation scheme, and submarine fiber link is engineered around these two theorems.",
    infobox: {
      layer: "Layer 1 (Physical Layer Foundations)",
      standard: "Claude Shannon (1948), Harry Nyquist (1928)",
      type: "Information Theory & Physical Channel Limits",
      keyFormula: "C_{\\text{Nyquist}} = 2B \\log_2(M), \\quad C_{\\text{Shannon}} = B \\log_2(1 + \\text{SNR})",
      prerequisites: ["transmission-media"],
      relatedConcepts: ["transmission-media", "multiplexing", "network-delay-loss"],
      compareWith: ["transmission-media"],
      primaryUses: ["5G QAM Modulation Limits", "DSL Line Coding", "Fiber Optic DWDM Spectral Efficiency"]
    },
    sections: {
      overview: `<p>All computer information is transmitted across physical media as electromagnetic signals. An <strong>analog signal</strong> is a continuously varying electromagnetic wave that can propagate over a variety of media (wire, fiber, space). A <strong>digital signal</strong> is a sequence of discrete voltage pulses where each pulse represents a bit.</p>
      <p>Two landmark theorems in telecommunication physics define the maximum data rate that can be pushed across any physical transmission channel: the <strong>Nyquist Bit Rate</strong> for noiseless channels and the <strong>Shannon Channel Capacity</strong> for noisy channels.</p>`,
      howItWorks: `<h5 class="text-emerald-700 dark:text-emerald-400 font-bold mb-2">The Two Fundamental Channel Capacity Theorems:</h5>
      <ul class="wiki-bullet-list">
        <li><strong>1. Nyquist Bit Rate (Noiseless Channels):</strong> Formulated by Harry Nyquist in 1928. If an arbitrary signal passes through a low-pass filter of bandwidth $B$ Hertz, the filtered signal can be completely reconstructed by taking $2B$ samples per second. If the signal uses $M$ discrete signaling voltage levels:
          $$C_{\\text{Nyquist}} = 2B \\log_2(M) \\quad \\text{bits/second}$$
          Increasing the number of signaling levels $M$ increases data rate, but receiver electronics eventually cannot distinguish adjacent levels due to noise.</li>
        <li><strong>2. Shannon Capacity Theorem (Noisy Channels):</strong> Formulated by Claude Shannon in 1948. Real channels always suffer from thermal noise. The maximum theoretical channel capacity $C$ of a channel of bandwidth $B$ perturbed by additive white Gaussian noise (AWGN) is:
          $$C_{\\text{Shannon}} = B \\log_2\\left(1 + \\frac{S}{N}\\right) \\quad \\text{bits/second}$$
          where $\\text{SNR} = S/N$ is the ratio of signal power to noise power. Decibel representation: $\\text{SNR}_{\\text{dB}} = 10 \\log_{10}(S/N)$.</li>
      </ul>`,
      diagram: `
+---------------------------------------------------------------------------------+
|                  NYQUIST SAMPLING & SHANNON CAPACITY FRONTIER                   |
|                                                                                 |
|   ANALOG CONTINUOUS WAVEFORM:               DIGITAL DISCRETE LEVELS (M=4):      |
|   Voltage                                   Voltage                             |
|   ^        _--_                             ^                                   |
|   |       /    \\       _--_                 |  3 (Level 11)   --+               |
|   |  ____/      \\_____/    \\                |  2 (Level 10)     +--             |
|   |                                         |  1 (Level 01)        +--          |
|   +----------------------------> Time       |  0 (Level 00)           +--       |
|                                             +----------------------------> Time |
|                                                                                 |
|   SHANNON LIMIT: C = B * log2(1 + S/N)                                          |
|   * No encoding scheme can transmit error-free above C.                         |
+---------------------------------------------------------------------------------+`,
      technicalDetails: `<p><strong>Converting Decibels to Linear SNR:</strong> Engineers measure signal-to-noise ratio in decibels ($dB$):</p>
      $$\\text{SNR}_{\\text{dB}} = 10 \\log_{10}(\\text{SNR}) \\implies \\text{SNR} = 10^{\\frac{\\text{SNR}_{\\text{dB}}}{10}}$$
      <p>For example, a $30\\text{ dB}$ SNR corresponds to a linear power ratio of:</p>
      $$\\text{SNR} = 10^{30/10} = 10^3 = 1000$$`,
      workedExample: `<div class="worked-example-box">
        <strong>Classic GATE Examination Problem on Shannon Capacity:</strong><br>
        A telephone transmission line has a bandwidth $B = 3000\\text{ Hz}$ ($3\\text{ kHz}$) and a signal-to-noise ratio of $30\\text{ dB}$.
        <br><strong>Step 1: Calculate linear SNR:</strong>
        $$\\text{SNR} = 10^{30/10} = 1000$$
        <br><strong>Step 2: Apply Shannon's Formula:</strong>
        $$C = B \\log_2(1 + \\text{SNR}) = 3000 \\times \\log_2(1 + 1000) = 3000 \\times \\log_2(1001)$$
        Since $2^{10} = 1024 \\approx 1001$, $\\log_2(1001) \\approx 9.967$:
        $$C \\approx 3000 \\times 9.967 = 29,901\\text{ bps} \\approx 30\\text{ kbps}$$
        This single formula explained why dial-up V.34 modems over analog telephone lines could never exceed $\\approx 33.6\\text{ kbps}$ without digital line circumvention!
        <br><strong>Step 3: Finding Required Signaling Levels (Nyquist):</strong>
        To achieve this $30\\text{ kbps}$ data rate over the same $3000\\text{ Hz}$ line:
        $$C = 2B \\log_2(M) \\implies 30,000 = 2(3000) \\log_2(M) \\implies 5 = \\log_2(M) \\implies M = 2^5 = 32\\text{ signaling levels}$$
      </div>`,
      advantagesLimitations: `<p>Shannon's theorem provides an absolute mathematical bound, but does not specify how to build error-correcting codes to reach that limit. Modern coding schemes (LDPC, Turbo codes, Polar codes in 5G) operate within 0.1 dB of the Shannon capacity limit.</p>`,
      whereUsed: ["5G NR Adaptive Modulation and Coding (QPSK up to 256-QAM and 1024-QAM)", "DSL vectoring algorithms", "Deep space NASA radio communications"],
      commonMistakes: "Plugging the decibel value directly into Shannon's formula! Writing $C = B \\log_2(1 + 30)$ instead of converting $30\\text{ dB}$ to linear ratio $1000$ produces an answer that is completely wrong.",
      compareWith: {
        title: "Nyquist Rate vs Shannon Capacity",
        note: "Nyquist governs noiseless channels and states how many discrete signal levels (M) are needed; Shannon governs noisy channels and sets the physical upper bound regardless of levels."
      },
      practice: {
        question: "A noiseless channel has a bandwidth of 4 kHz. If digital transmission uses 16 distinct voltage levels, what is the maximum achievable bit rate according to Nyquist's theorem?",
        choices: ["16 kbps", "32 kbps", "64 kbps", "128 kbps"],
        correctIndex: 1,
        explanation: "C = 2 * B * log2(M) = 2 * 4000 * log2(16) = 8000 * 4 = 32,000 bps = 32 kbps."
      },
      references: [
        { cite: "Shannon, C. E. (1948). A Mathematical Theory of Communication. Bell System Technical Journal, 27(3), 379-423.", url: "https://ieeexplore.ieee.org/document/6773024" },
        { cite: "Tanenbaum, A. S. (2021). Computer Networks (6th Ed.), Chapter 2.1: Theoretical Basis for Data Communication.", url: "https://www.pearson.com/" }
      ]
    },
    prevTopicId: "multiplexing",
    nextTopicId: null
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = TOPICS_U1;
}
