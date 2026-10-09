// Unit I Topics Database: Networking Fundamentals
const TOPICS_U1 = {
  "computer-network": {
    id: "computer-network",
    title: "Computer Network",
    unit: "Unit I: Networking Fundamentals",
    unitId: "unit1",
    level: "Level 1 — Concept Card",
    category: "fundamentals",
    difficulty: "Foundation",
    readingTime: "5 min read",
    standard: "IEEE / IETF Foundations",
    oneLiner: "An interconnected collection of autonomous computing devices capable of exchanging data and sharing resources.",
    quickAnswer: "A computer network links multiple computing systems together via transmission media and communication protocols, transforming isolated machines into a unified information-sharing infrastructure.",
    whyItMatters: "Networks enable statistical multiplexing of shared communication channels without requiring dedicated physical circuits for every pair of communicating endpoints.",
    infobox: {
      layer: "All Layers (L1 - L7)",
      standard: "IEEE 802, IETF RFCs",
      type: "Distributed Infrastructure",
      keyFormula: "Throughput \\le \\min(R_{\\text{access}}, R_{\\text{bottleneck}})",
      prerequisites: ["None"],
      relatedConcepts: ["host", "router", "switch", "packet", "protocol"],
      compareWith: ["telecom-circuit"],
      primaryUses: ["Global Internet", "Local Area Networks (LANs)", "Cloud Data Centers", "5G Cellular"]
    },
    sections: {
      overview: `A <strong>computer network</strong> is an interconnected system of computing nodes that communicate using standard protocols over physical transmission media. The Internet is a <em>network of networks</em>, tying together hundreds of thousands of independent Autonomous Systems.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Data Generation:</strong> An end host generates digital information (web request, video stream).</li>
          <li><strong>Packetization & Header Stamping:</strong> OS protocol stack slices data and prepends control headers.</li>
          <li><strong>Transmission:</strong> Bits are modulated as electromagnetic or optical pulses onto links.</li>
          <li><strong>Store-and-Forward Routing:</strong> Routers examine headers and forward packets hop-by-hop.</li>
          <li><strong>Reassembly:</strong> The destination host checks integrity and delivers data to the destination process.</li>
        </ol>`,
      diagram: `
+------------+       Physical Link       +------------+
|  Host A    |===========================|  Router R1 |
| (Client)   |                           | (Core Net) |
+------------+                           +------------+
      |                                        |
      | Packet: [Hdr | Payload]                | Forwarding
      v                                        v
+------------+       Switched LAN        +------------+
|  Switch S1 |---------------------------|  Host B    |
|  (Layer 2) |                           |  (Server)  |
+------------+                           +------------+`,
      technicalDetails: `Networks are categorized by geographical scale:
        <ul class="wiki-bullet-list">
          <li><strong>LAN (Local Area Network):</strong> Covers homes or campus buildings (Ethernet, Wi-Fi). High speed (1-10 Gbps), low latency, private management.</li>
          <li><strong>WAN (Wide Area Network):</strong> Spans countries or continents (the Internet). Utilizes fiber backbones and submarine cables.</li>
          <li><strong>Edge vs Core:</strong> Edge consists of hosts and servers; core consists of mesh routers and switches that forward packets.</li>
        </ul>`,
      workedExample: `Sending 10 MB over a link with rate $R = 100\\text{ Mbps}$ and distance $d = 3000\\text{ km}$ ($s = 2 \\times 10^8\\text{ m/s}$):
        <br>• Transmission Delay: $d_{\\text{trans}} = \\frac{10 \\times 10^6 \\times 8}{100 \\times 10^6} = 0.8\\text{ s}$
        <br>• Propagation Delay: $d_{\\text{prop}} = \\frac{3 \\times 10^6}{2 \\times 10^8} = 0.015\\text{ s}$ (15 ms)
        <br>• Total Delay: $0.8 + 0.015 = 0.815\\text{ s}$.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Resource and data sharing worldwide</td><td>Queuing delays and network congestion</td></tr>
            <tr><td>Redundant fault-tolerant paths</td><td>Security attack surface</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["World Wide Web and cloud platforms", "Enterprise intranets and VPNs", "Smart IoT devices and sensors"],
      commonMistakes: "Confusing transmission delay ($L/R$) with propagation delay ($d/s$). Transmission delay depends on bandwidth and packet size; propagation delay depends strictly on physical link distance.",
      compareWith: { title: "Packet Switching vs Circuit Switching", note: "Circuit switching reserves fixed dedicated circuits. Packet switching dynamically shares bandwidth on demand." },
      practice: {
        question: "A 1,000-byte packet is sent over a 10 Mbps point-to-point link. What is the transmission delay?",
        choices: ["0.8 ms", "8 ms", "0.08 ms", "100 microseconds"],
        correctIndex: 0,
        explanation: "$d_{\\text{trans}} = L/R = (1000 \\times 8) / (10 \\times 10^6) = 0.0008\\text{ s} = 0.8\\text{ ms}$."
      },
      references: [
        { cite: "Kurose & Ross, Chapter 1.1: What is the Internet?", url: "https://gaia.cs.umass.edu/kurose_ross/" }
      ]
    },
    prevTopicId: null,
    nextTopicId: "protocol"
  },

  "protocol": {
    id: "protocol",
    title: "Network Protocol",
    unit: "Unit I: Networking Fundamentals",
    unitId: "unit1",
    level: "Level 1 — Concept Card",
    category: "fundamentals",
    difficulty: "Foundation",
    readingTime: "5 min read",
    standard: "IETF Standards Track RFCs",
    oneLiner: "A formal specification of rules, message formats, and actions governing communication between network entities.",
    quickAnswer: "A protocol defines what is communicated, how messages are formatted, when they are sent, and what actions are taken upon message arrival.",
    whyItMatters: "Heterogeneous devices running diverse operating systems require standardized protocols with strict syntax and semantics to interoperate seamlessly.",
    infobox: {
      layer: "All Layers (L1 - L7)",
      standard: "IETF RFCs, IEEE 802",
      type: "Communication Specification",
      keyFormula: "\\text{Protocol} = \\text{Syntax} + \\text{Semantics} + \\text{Timing}",
      prerequisites: ["computer-network"],
      relatedConcepts: ["packet", "host", "protocol-stack", "encapsulation"],
      compareWith: ["architecture"],
      primaryUses: ["TCP, IP, HTTP, DNS, Ethernet, Wi-Fi, BGP"]
    },
    sections: {
      overview: `A <strong>protocol</strong> defines the format and the order of messages exchanged between two or more communicating entities, as well as the actions taken on the transmission or receipt of a message.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Syntax:</strong> Field layouts, bit lengths, offsets, and delimiters.</li>
          <li><strong>Semantics:</strong> Meaning of each field (e.g. SYN flag means initiate connection).</li>
          <li><strong>Timing:</strong> Synchronization, timeout triggers, and speed matching.</li>
        </ol>`,
      diagram: `
Sender                                Receiver
  |                                      |
  | ----- [SYN: Initiate Request] -----> |
  |                                      |
  | <---- [SYN+ACK: Confirm/Ready] ----- |
  |                                      |
  | ----- [ACK: Ready for Data] -------> |
    `,
      technicalDetails: `Key classifications:
        <ul class="wiki-bullet-list">
          <li><strong>Connection-oriented (TCP):</strong> State is negotiated before payload transfer.</li>
          <li><strong>Connectionless (UDP, IP):</strong> Packets are sent independently without state setup.</li>
        </ul>`,
      workedExample: `HTTP GET Request:
        <pre class="wiki-code-block">GET /index.html HTTP/1.1\\r\\n
Host: example.com\\r\\n\\r\\n</pre>
        The server interprets \`GET /index.html\` semantically as a resource fetch and returns status code \`200 OK\`.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Guarantees multi-vendor interoperability</td><td>Header overhead consumes link bandwidth</td></tr>
            <tr><td>Deterministic error recovery</td><td>Protocol ossification in legacy systems</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Web browsers (HTTP/HTTPS)", "Domain resolution (DNS)", "Transport streaming (TCP/UDP)"],
      commonMistakes: "Confusing protocol specification with implementation. A protocol is an RFC document; the implementation is code in OS kernels.",
      compareWith: { title: "Protocol vs Service", note: "Protocols define rules between peer entities across the network. Services define interfaces between adjacent layers on the same host." },
      practice: {
        question: "Which component of a network protocol dictates the meaning of each bit field in a packet header?",
        choices: ["Syntax", "Semantics", "Timing", "Encapsulation"],
        correctIndex: 1,
        explanation: "Semantics defines the interpretation and meaning assigned to bit patterns and headers."
      },
      references: [
        { cite: "RFC 1122: Requirements for Internet Hosts", url: "https://datatracker.ietf.org/doc/html/rfc1122" }
      ]
    },
    prevTopicId: "computer-network",
    nextTopicId: "host"
  },

  "host": {
    id: "host",
    title: "Host System (Clients & Servers)",
    unit: "Unit I: Networking Fundamentals",
    unitId: "unit1",
    level: "Level 1 — Concept Card",
    category: "fundamentals",
    difficulty: "Core",
    readingTime: "4 min read",
    standard: "RFC 1122 / RFC 1123",
    oneLiner: "An end-system computing device connected to a network running application software.",
    quickAnswer: "A host is any computing device (laptop, smartphone, cloud server, IoT node) residing at the network edge running application software.",
    whyItMatters: "The Internet's end-to-end principle keeps core routers simple and fast, placing application logic, state, and reliability entirely within hosts.",
    infobox: {
      layer: "Network Edge (L1 - L7)",
      standard: "RFC 1122",
      type: "End System Device",
      keyFormula: "\\text{Socket} = (\\text{IP Address}, \\text{Port Number})",
      prerequisites: ["computer-network"],
      relatedConcepts: ["router", "packet", "protocol"],
      compareWith: ["router"],
      primaryUses: ["Browsers, Web Servers, Database Nodes, Mobile Apps"]
    },
    sections: {
      overview: `A <strong>host</strong> (or end system) executes application programs and connects to the network via a Network Interface Card (NIC). Hosts are partitioned into clients (requesting services) and servers (providing resources).`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>NIC:</strong> Hardware card possessing a globally unique 48-bit MAC address.</li>
          <li><strong>Kernel Stack:</strong> OS manages socket buffers, routing tables, and TCP state.</li>
          <li><strong>Socket Interface:</strong> Application API combining an IP address with a 16-bit port.</li>
        </ol>`,
      diagram: `
+----------------------------------------------------+
|                    HOST SYSTEM                     |
|  [ User Application: Web Browser / Python App ]    |
|                         | Socket API               |
|  [ OS Kernel: TCP / UDP / IP Protocol Stack ]      |
|                         | Device Driver            |
|  [ Network Interface Card (NIC) with MAC Address ] |
+----------------------------------------------------+`,
      technicalDetails: `Saltzer's End-to-End Argument (1981): Reliability, encryption, and flow control belong at the application-aware end hosts, leaving intermediate network routers stateless and simple.`,
      workedExample: `When establishing a connection to \`93.184.216.34:80\`, the host assigns ephemeral source port \`51234\`. The connection socket 4-tuple is: \`(192.168.1.100, 51234, 93.184.216.34, 80)\`.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Full software programmability</td><td>Requires memory buffer management in OS kernel</td></tr>
            <tr><td>End-to-end cryptographic control</td><td>Potential bufferbloat under high connection loads</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Personal laptops and smartphones", "Cloud compute nodes in AWS/GCP", "Embedded IoT devices"],
      commonMistakes: "Assuming routers are hosts. Routers forward packets at Layer 3; hosts originate and terminate data at Layer 7.",
      compareWith: { title: "Host vs Router", note: "Hosts run application processes. Routers operate inside the network core forwarding packets without examining application payloads." },
      practice: {
        question: "According to the end-to-end principle, where should reliable data transfer primarily reside?",
        choices: ["In core routers", "In intermediate switches", "Within end hosts", "In physical transmission cables"],
        correctIndex: 2,
        explanation: "Reliable transfer and application state belong at the end hosts to keep the core network fast and simple."
      },
      references: [
        { cite: "Saltzer et al. (1984): End-to-End Arguments in System Design", url: "https://web.mit.edu/Saltzer/www/publications/endtoend/endtoend.pdf" }
      ]
    },
    prevTopicId: "protocol",
    nextTopicId: "router"
  },

  "router": {
    id: "router",
    title: "Router & Forwarding Engine",
    unit: "Unit I: Networking Fundamentals",
    unitId: "unit1",
    level: "Level 2 — Standard Topic",
    category: "network",
    difficulty: "Core",
    readingTime: "6 min read",
    standard: "RFC 1812",
    oneLiner: "A Layer-3 packet-switching device that connects multiple networks and directs packets along optimal paths.",
    quickAnswer: "A router reads destination IP addresses, performs longest-prefix match lookups in its forwarding table, and transfers packets across its switching fabric to outgoing links.",
    whyItMatters: "Routers interconnect independent networks into the global Internet, isolating broadcast domains and steering traffic around link failures.",
    infobox: {
      layer: "Layer 3 (Network Layer)",
      standard: "RFC 1812, RFC 791, RFC 8200",
      type: "Core Forwarding Appliance",
      keyFormula: "\\text{Lookup} = \\text{Longest Prefix Match (TCAM)}",
      prerequisites: ["packet", "host"],
      relatedConcepts: ["forwarding", "routing", "dijkstra", "ospf", "bgp"],
      compareWith: ["switch"],
      primaryUses: ["Internet Backbones, Enterprise Gateways, Edge Routers"]
    },
    sections: {
      overview: `A <strong>router</strong> is a specialized computer that forwards packets between computer networks at Layer 3. Routers maintain forwarding tables built by routing protocols (OSPF, BGP) to route packets efficiently.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Input Port:</strong> Decapsulates Layer-2 frame and extracts Layer-3 IP datagram.</li>
          <li><strong>Forwarding Lookup:</strong> Searches forwarding table using hardware TCAM for Longest Prefix Match.</li>
          <li><strong>Switching Fabric:</strong> Transfers packet to designated output port via crossbar matrix.</li>
          <li><strong>Output Port:</strong> Decrements TTL, recalculates checksum, encapsulates into frame, and transmits.</li>
        </ol>`,
      diagram: `
+----------------------------------------------------+
|                ROUTER ARCHITECTURE                 |
|  [Input Port 1] ---> [               ] ---> [Out 1]|
|                      [  Crossbar     ]             |
|  [Input Port 2] ---> [  Switching    ] ---> [Out 2]|
|                      [  Fabric       ]             |
|  [Input Port 3] ---> [               ] ---> [Out 3]|
|                             ^                      |
|                             | FIB Updates          |
|                 [ Routing Processor / CPU ]        |
+----------------------------------------------------+`,
      technicalDetails: `Architectural split:
        <ul class="wiki-bullet-list">
          <li><strong>Data Plane (Hardware):</strong> Nanosecond packet forwarding performed in line-card ASICs.</li>
          <li><strong>Control Plane (Software):</strong> Millisecond routing protocol computation executed on router CPU.</li>
        </ul>`,
      workedExample: `Incoming destination IP: \`128.9.16.14\`.
        <br>Forwarding Table entries:
        <br>1. \`128.9.0.0/16\` $\\to$ Interface 1 (16-bit match)
        <br>2. \`128.9.16.0/24\` $\\to$ Interface 2 (24-bit match)
        <br><strong>Result:</strong> Selects <strong>Interface 2</strong> (Longest Prefix Match).`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Connects heterogeneous subnets</td><td>Higher per-packet latency than switches</td></tr>
            <tr><td>Stops network broadcast storms</td><td>Head-of-Line blocking in input queues</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Tier-1 ISP core transit networks", "Enterprise edge gateways", "Residential broadband routers"],
      commonMistakes: "Believing routers change the packet destination IP. Routers only modify the TTL and Link-layer destination MAC address hop-by-hop (unless NAT is active).",
      compareWith: { title: "Router (L3) vs Switch (L2)", note: "Routers forward packets based on IP addresses across subnets. Switches forward frames based on MAC addresses within one subnet." },
      practice: {
        question: "Which criteria does an IP router use to resolve matching routing table entries?",
        choices: ["First match in table", "Shortest prefix match", "Longest prefix match", "Random tie-breaking"],
        correctIndex: 2,
        explanation: "Routers always select the longest prefix match because it represents the most specific route."
      },
      references: [
        { cite: "RFC 1812: Requirements for IP Version 4 Routers", url: "https://datatracker.ietf.org/doc/html/rfc1812" }
      ]
    },
    prevTopicId: "host",
    nextTopicId: "switch"
  },

  "switch": {
    id: "switch",
    title: "Link-Layer Switch",
    unit: "Unit I: Networking Fundamentals",
    unitId: "unit1",
    level: "Level 2 — Standard Topic",
    category: "datalink",
    difficulty: "Core",
    readingTime: "5 min read",
    standard: "IEEE 802.1D / IEEE 802.1Q",
    oneLiner: "A Layer-2 multi-port forwarding device that isolates collision domains using a self-learning MAC table.",
    quickAnswer: "A switch forwards frames based on 48-bit MAC addresses, automatically learning host locations to avoid broadcasting.",
    whyItMatters: "Switches replaced legacy hubs, eliminating packet collisions and providing dedicated full-duplex bandwidth per port.",
    infobox: {
      layer: "Layer 2 (Data Link Layer)",
      standard: "IEEE 802.1D, IEEE 802.1Q",
      type: "Subnet Forwarding Appliance",
      keyFormula: "\\text{Forwarding Rule} = \\text{Match MAC in Filtering Table}",
      prerequisites: ["router", "host"],
      relatedConcepts: ["ethernet", "mac-address", "arp", "vlan"],
      compareWith: ["hub"],
      primaryUses: ["Campus LANs, Data Center Spine-Leaf fabrics, Home LANs"]
    },
    sections: {
      overview: `A <strong>link-layer switch</strong> is a Layer-2 multi-port bridge that inspects MAC addresses and switches frames directly between ports without colliding with other traffic.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Self-Learning:</strong> Inspects incoming source MAC address and records (MAC, incoming port, timestamp).</li>
          <li><strong>Selective Forwarding:</strong> If destination MAC is in table, sends frame strictly to mapped port.</li>
          <li><strong>Flooding:</strong> If destination MAC is unknown or broadcast (\`FF:FF:FF:FF:FF:FF\`), floods all ports except arrival port.</li>
          <li><strong>Aging:</strong> Inactive entries are purged after timeout (typically 300 s).</li>
      </ol>`,
      diagram: `
+------------------------------------+
|        SWITCH FORWARDING TABLE     |
| MAC Address       | Physical Port  |
|-------------------|----------------|
| AA:BB:CC:11:22:33 | Port 1         |
| AA:BB:CC:44:55:66 | Port 2         |
+------------------------------------+
        |                  |
     [Port 1]           [Port 2]
        |                  |
     Host A             Host B`,
      technicalDetails: `Features:
        <ul class="wiki-bullet-list">
          <li><strong>Collision Domain Isolation:</strong> Every port is an independent collision domain.</li>
          <li><strong>Spanning Tree Protocol (STP):</strong> Prevents loops and broadcast storms in redundant topologies.</li>
          <li><strong>VLANs:</strong> Logical segmentation of broadcast domains across the same physical hardware.</li>
        </ul>`,
      workedExample: `Host A sends to Host B on empty switch.
        <br>1. Switch learns: \`Host A MAC $\\to$ Port 1\`.
        <br>2. Floods frame to Ports 2, 3, 4.
        <br>3. Host B replies.
        <br>4. Switch learns: \`Host B MAC $\\to$ Port 2\`.
        <br>5. Next frames between A and B are forwarded directly with zero flooding.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Dedicated bandwidth per port, zero collisions</td><td>Cannot route between different IP subnets</td></tr>
            <tr><td>Plug-and-play zero configuration</td><td>Vulnerable to MAC flooding attacks</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Enterprise LANs", "Cloud data centers", "Home wired networking"],
      commonMistakes: "Confusing hubs and switches. Hubs replicate electrical signals to all ports (one collision domain); switches isolate collision domains per port.",
      compareWith: { title: "Switch vs Hub", note: "Hubs broadcast every bit to all ports. Switches inspect frames and forward selectively to the destination port." },
      practice: {
        question: "What does a switch do when receiving a frame for an unknown MAC address?",
        choices: ["Drops the frame", "Floods it out all ports except arrival port", "Sends an error message to sender", "Queues the frame permanently"],
        correctIndex: 1,
        explanation: "Unknown destination MAC addresses are flooded across all other ports until the target responds."
      },
      references: [
        { cite: "IEEE 802.1D Standard for Local and metropolitan area networks", url: "https://standards.ieee.org/" }
      ]
    },
    prevTopicId: "router",
    nextTopicId: "packet"
  },

  "packet": {
    id: "packet",
    title: "Packet & Statistical Multiplexing",
    unit: "Unit I: Networking Fundamentals",
    unitId: "unit1",
    level: "Level 1 — Concept Card",
    category: "network",
    difficulty: "Core",
    readingTime: "5 min read",
    standard: "RFC 791 / RFC 8200",
    oneLiner: "A formatted block of digital data carried across a computer network containing control headers and user payload.",
    quickAnswer: "A packet slices large application data streams into chunks with headers containing routing metadata, enabling statistical multiplexing of shared communication channels.",
    whyItMatters: "Packet switching eliminates the need for dedicated physical circuits, maximizing link utilization through statistical sharing.",
    infobox: {
      layer: "Layer 3 (Network Layer)",
      standard: "RFC 791 (IPv4), RFC 8200 (IPv6)",
      type: "Fundamental Data Unit",
      keyFormula: "\\text{Packet} = \\text{Header (Control)} + \\text{Payload (Data)}",
      prerequisites: ["protocol"],
      relatedConcepts: ["frame", "segment", "router", "encapsulation"],
      compareWith: ["frame"],
      primaryUses: ["IP Datagrams, Internet Routing, Distributed File Transfers"]
    },
    sections: {
      overview: `A <strong>packet</strong> is the fundamental unit of data routed over a packet-switched network. Messages are divided into packets that travel independently across shared links.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Segmentation:</strong> Large application messages are sliced into payload chunks.</li>
          <li><strong>Header Attachment:</strong> Layer-3 appends source and destination IP addresses, TTL, and protocol flags.</li>
          <li><strong>Store-and-Forward:</strong> Routers receive complete packets, verify checksums, and forward them hop-by-hop.</li>
        </ol>`,
      diagram: `
+------------------------------------------------+
|                   IP PACKET                    |
|  [ Header: 20-60 Bytes (Source/Dest IP, TTL) ] |
|  [ Payload: TCP Segment / UDP Datagram       ] |
+------------------------------------------------+`,
      technicalDetails: `Statistical multiplexing allows many bursty users to share a link: capacity is dynamically allocated on demand rather than reserving idle slices.`,
      workedExample: `A 1 Gbps link shared by users requiring 100 Mbps only 10% of the time. Circuit switching supports 10 users. Packet switching supports 35 users with less than 0.04% probability of link congestion.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>High bandwidth utilization via statistical sharing</td><td>Queuing delays and jitter under high load</td></tr>
            <tr><td>Robust dynamic rerouting</td><td>Packets may arrive out-of-order</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Global IP routing", "Internet web transfers", "VoIP and video streaming"],
      commonMistakes: "Using 'packet', 'segment', and 'frame' interchangeably. Segments are L4, packets are L3, frames are L2.",
      compareWith: { title: "Packet vs Frame", note: "Packets are Layer 3 (IP). Frames are Layer 2 (Ethernet) containing MAC headers and CRC trailers." },
      practice: {
        question: "Why does packet switching support more bursty users than circuit switching?",
        choices: ["Packets bypass queueing", "Bandwidth is dynamically shared only when data is actively sent", "Packets travel faster", "Headers compress the data"],
        correctIndex: 1,
        explanation: "Statistical multiplexing allocates link bandwidth on demand, allowing many bursty users to share capacity."
      },
      references: [
        { cite: "Kurose & Ross Chapter 1.3: Packet Switching", url: "https://gaia.cs.umass.edu/kurose_ross/" }
      ]
    },
    prevTopicId: "switch",
    nextTopicId: "protocol-stack"
  },

  "protocol-stack": {
    id: "protocol-stack",
    title: "Internet Protocol Stack & OSI Model",
    unit: "Unit I: Networking Fundamentals",
    unitId: "unit1",
    level: "Level 2 — Standard Topic",
    category: "fundamentals",
    difficulty: "Core",
    readingTime: "7 min read",
    standard: "ISO/IEC 7498-1 / RFC 1122",
    oneLiner: "The layered software and hardware architecture organizing network communication into modular abstraction boundaries.",
    quickAnswer: "The Internet uses a 5-layer stack (Application, Transport, Network, Link, Physical), contrasting with the theoretical 7-layer OSI model.",
    whyItMatters: "Layering provides modularity: higher layers don't care how lower layers are physically implemented, enabling independent upgrades across the stack.",
    infobox: {
      layer: "All 5 Layers",
      standard: "RFC 1122, ISO/IEC 7498-1",
      type: "Layered Architectural Model",
      keyFormula: "\\text{Stack} = [\\text{App, Trans, Net, Link, Phys}]",
      prerequisites: ["protocol", "packet"],
      relatedConcepts: ["encapsulation", "tcp", "ip", "ethernet"],
      compareWith: ["osi-model"],
      primaryUses: ["Entire Internet Architecture"]
    },
    sections: {
      overview: `Network functionality is structured into layers. The pragmatic 5-layer Internet protocol stack collapses OSI's Presentation and Session layers into the Application layer.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Application (L5):</strong> HTTP, DNS, SMTP (Message).</li>
          <li><strong>Transport (L4):</strong> TCP, UDP (Segment).</li>
          <li><strong>Network (L3):</strong> IPv4, IPv6 (Datagram / Packet).</li>
          <li><strong>Link (L2):</strong> Ethernet, Wi-Fi (Frame).</li>
          <li><strong>Physical (L1):</strong> Copper, Fiber, Radio (Bits).</li>
        </ol>`,
      diagram: `
+--------------------+--------------------+
| 5-LAYER INTERNET   | 7-LAYER OSI        |
+--------------------+--------------------+
| Application        | Application        |
|                    | Presentation       |
|                    | Session            |
+--------------------+--------------------+
| Transport          | Transport          |
+--------------------+--------------------+
| Network            | Network            |
+--------------------+--------------------+
| Data Link          | Data Link          |
+--------------------+--------------------+
| Physical           | Physical           |
+--------------------+--------------------+`,
      technicalDetails: `The Internet design opted for simplicity: encryption and compression (OSI Presentation) and dialogue state (OSI Session) are implemented inside application libraries (like TLS/SSL) rather than kernel stack layers.`,
      workedExample: `Browser fetches \`https://site.com\`:
      <br>1. App: HTTP GET
      <br>2. Transport: TCP segment (ports 54321 $\\to$ 443)
      <br>3. Network: IP packet (source $\\to$ dest IP)
      <br>4. Link: Ethernet frame (source $\\to$ router MAC)
      <br>5. Physical: Light pulses on fiber.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Modularity and clear abstraction boundaries</td><td>Processing overhead at every layer</td></tr>
            <tr><td>Independent protocol evolution</td><td>Cross-layer optimization restrictions</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Every modern operating system (Linux, Windows, macOS, Android, iOS)"],
      commonMistakes: "Assuming OSI is the protocol running on the Internet. OSI is a conceptual model; the actual running protocols are TCP/IP.",
      compareWith: { title: "TCP/IP vs OSI", note: "OSI includes dedicated Presentation and Session layers; TCP/IP collapses them into the Application layer." },
      practice: {
        question: "Which layer of the Internet stack handles process-to-process communication?",
        choices: ["Network Layer", "Transport Layer", "Link Layer", "Physical Layer"],
        correctIndex: 1,
        explanation: "The Transport Layer (TCP/UDP) handles process-to-process communication using port numbers."
      },
      references: [
        { cite: "RFC 1122: Requirements for Internet Hosts", url: "https://datatracker.ietf.org/doc/html/rfc1122" }
      ]
    },
    prevTopicId: "packet",
    nextTopicId: "encapsulation"
  },

  "encapsulation": {
    id: "encapsulation",
    title: "Encapsulation & Decapsulation",
    unit: "Unit I: Networking Fundamentals",
    unitId: "unit1",
    level: "Level 3 — Major Topic / Module",
    category: "fundamentals",
    difficulty: "Advanced",
    readingTime: "6 min read",
    standard: "RFC 1122 Architectural Model",
    oneLiner: "The recursive process of wrapping higher-layer data units inside lower-layer headers as information descends the protocol stack.",
    quickAnswer: "Encapsulation wraps application messages with headers at each lower layer, and decapsulation peels them off upon arrival.",
    whyItMatters: "Encapsulation ensures routers inspect only Layer-3 headers, switches inspect only Layer-2 headers, and applications inspect only Layer-7 messages.",
    infobox: {
      layer: "All Layers (L7 down to L1)",
      standard: "RFC 1122",
      type: "Data Formatting Pipeline",
      keyFormula: "\\text{Frame} = H_2 + [H_3 + (H_4 + \\text{Data}) + T_2]",
      prerequisites: ["protocol-stack", "packet"],
      relatedConcepts: ["packet", "framing", "tcp-header", "ethernet"],
      compareWith: ["decapsulation"],
      primaryUses: ["All Internet Transfers, VPN Tunnels, Overlay Networks"]
    },
    sections: {
      overview: `<strong>Encapsulation</strong> treats higher-layer data as an opaque payload, prepending headers as it moves down the stack. <strong>Decapsulation</strong> reverses the process at the destination.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>App:</strong> Produces Message $M$.</li>
          <li><strong>Transport:</strong> Appends $H_t$ (TCP) $\\to$ <strong>Segment</strong>: $[H_t \\mid M]$.</li>
          <li><strong>Network:</strong> Appends $H_n$ (IP) $\\to$ <strong>Packet</strong>: $[H_n \\mid H_t \\mid M]$.</li>
          <li><strong>Link:</strong> Appends $H_l$ and trailer $T_l$ $\\to$ <strong>Frame</strong>: $[H_l \\mid H_n \\mid H_t \\mid M \\mid T_l]$.</li>
          <li><strong>Physical:</strong> Transmits frame as raw bits.</li>
        </ol>`,
      diagram: `
+----+--------------------------------+
| Ht | Application Data               |  TCP Segment
+----+--------------------------------+
  |
  v
+----+----+---------------------------+
| Hn | Ht | Application Data          |  IP Packet
+----+----+---------------------------+
  |
  v
+----+----+----+----------------------+----+
| Hl | Hn | Ht | Application Data     | Tl |  Ethernet Frame
+----+----+----+----------------------+----+`,
      technicalDetails: `Header overhead: Ethernet (14B hdr + 4B FCS) + IPv4 (20B) + TCP (20B) = 58 bytes minimum overhead. With MTU = 1500 bytes, MSS = 1460 bytes.`,
      workedExample: `A 100-byte application message results in:
        <br>• TCP Segment: $100 + 20 = 120\\text{ bytes}$
        <br>• IP Packet: $120 + 20 = 140\\text{ bytes}$
        <br>• Ethernet Frame: $140 + 18 = 158\\text{ bytes}$.
        <br>Efficiency is $\\frac{100}{158} = 63.3\\%$.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Complete protocol modularity</td><td>Header overhead on small payloads</td></tr>
            <tr><td>Enables VPN tunneling</td><td>Parsing latency across multiple headers</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Standard Internet traffic", "IPsec and WireGuard VPN tunnels", "VLAN (802.1Q) and VXLAN encapsulation"],
      commonMistakes: "Thinking intermediate Layer-2 switches decapsulate IP headers. Switches examine only Layer-2 MAC headers.",
      compareWith: { title: "Encapsulation vs Tunneling", note: "Tunneling encapsulates a packet inside another packet of the same layer (e.g. IPv6 inside IPv4)." },
      practice: {
        question: "If MTU is 1500 bytes, IP header is 20 bytes, and TCP header is 20 bytes, what is MSS?",
        choices: ["1500 bytes", "1460 bytes", "1480 bytes", "1440 bytes"],
        correctIndex: 1,
        explanation: "MSS = MTU - (IP header + TCP header) = 1500 - 40 = 1460 bytes."
      },
      references: [
        { cite: "RFC 1122: Requirements for Internet Hosts", url: "https://datatracker.ietf.org/doc/html/rfc1122" }
      ]
    },
    prevTopicId: "protocol-stack",
    nextTopicId: "framing"
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = TOPICS_U1;
}
