/**
 * Unit 4 Topic 2 Builder: Elements of Transport Protocols
 * Subtopics:
 * 1. u4-transport-addressing
 * 2. u4-connection-establishment
 * 3. u4-connection-release
 * 4. u4-flow-control-buffering
 */

const TOPIC2_ITEMS = {
  "u4-transport-addressing": {
    id: "u4-transport-addressing",
    title: "Addressing",
    unit: "Unit 4 – Transport Layer",
    unitId: "unit4",
    level: "Level 1 — Fundamental",
    category: "transport",
    difficulty: "Core",
    readingTime: "20 min read",
    standard: "Forouzan 4th Ed. Ch 23.1, pp. 704-706 / Tanenbaum Ch 6.1.1 / RFC 6335",
    oneLiner: "Transport layer addressing principles defining Service Access Points (TSAPs), 16-bit Port numbers, and ICANN allocation ranges.",
    quickAnswer: "In the Transport Layer, addressing is achieved through 16-bit integer identifiers called Port Numbers (or Transport Service Access Points - TSAPs). While IP addresses identify a physical or virtual host on a network, port numbers identify the specific application process running inside that host. The combination of an IP address and a port number forms a globally unique Socket Address.",
    whyItMatters: "Without transport addressing, packet delivery would stop at the host boundary. An operating system running hundreds of network processes simultaneously would have no mechanism to route incoming packets to their rightful owners. Port numbers provide the addressing coordinates that make modern multitasking network operating systems possible.",
    infobox: {
      prerequisites: ["u4-transport-services", "ip-addressing"],
      relatedConcepts: ["u4-berkeley-sockets", "u4-connection-establishment", "u4-intro-udp", "u4-intro-tcp"],
      compareWith: ["ip-address-vs-port-number"],
      primaryUses: [
        "Identifying specific application processes on a host",
        "Demultiplexing incoming segments to socket buffers",
        "Standardizing service locations (e.g. HTTP on port 80)",
        "Network Address and Port Translation (NAPT/PAT)"
      ],
      standardRfc: "RFC 6335 (Internet Assigned Numbers Authority Port Number Procedures)"
    },
    learningObjectives: [
      "Understand why both an IP address and a port number are required for end-to-end communication",
      "Explain the 3 official ICANN/IANA port ranges: Well-Known (0-1023), Registered (1024-49151), and Ephemeral (49152-65535)",
      "Define Socket Address and explain how a 4-tuple uniquely identifies a connection",
      "Trace how operating systems maintain socket binding tables for packet demultiplexing",
      "Calculate port number capacity and understand ephemeral port exhaustion"
    ],
    prerequisitesList: [
      { concept: "IP Addressing", meaning: "Knowledge that IP addresses identify hosts across networks" },
      { concept: "Operating System Processes", meaning: "Understanding that multiple programs execute concurrently" }
    ],
    imageUrl: "assets/images/unit4/topic2-elements-protocols/transport-addressing-ports.svg",
    imageCaption: "Figure 4.4: 16-Bit Port Number Space & ICANN Ranges — Well-Known, Registered, and Ephemeral Port Allocations [Forouzan Figure 23.4]",
    sections: {
      overview: `
        <p class="mb-3">
          When an application wants to communicate across the network, it must specify where the remote host is located and which application program on that host should receive the message.
        </p>
        <p class="mb-3">
          To solve this problem, transport protocols use a hierarchical addressing scheme:
        </p>
        <ul class="list-disc pl-5 space-y-1.5 text-xs mb-3">
          <li><strong>Network Layer:</strong> Uses the <strong>IP Address</strong> to deliver data to the correct destination host.</li>
          <li><strong>Transport Layer:</strong> Uses the <strong>Port Number</strong> (16 bits, ranging from 0 to 65,535) to deliver data to the correct process within that destination host.</li>
        </ul>
        <div class="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-lg text-xs font-mono mb-3">
          Postal Analogy: The IP address is the street address of a large apartment building; the Port number is the specific apartment number inside!
        </div>
      `,
      howItWorks: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">1. The Three IANA/ICANN Port Number Ranges</h3>
        <p class="mb-3">
          Because port numbers are 16-bit integers ($2^{16} = 65,536$), the total available port space ranges from <strong>0 to 65,535</strong>. The Internet Assigned Numbers Authority (IANA/ICANN) divides this space into three distinct categories:
        </p>
        <div class="space-y-3 text-xs mb-4">
          <div class="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
            <strong class="text-blue-600 dark:text-blue-400">A. Well-Known Ports (0 to 1,023 — 1,024 Ports):</strong>
            <p class="mt-1 text-slate-600 dark:text-slate-300">Strictly assigned and controlled by IANA. Used by universal, system-level server applications. On Unix and Linux systems, binding to a well-known port requires administrative (root) privileges to prevent unauthorized processes from masquerading as system services.</p>
            <div class="mt-2 text-[11px] font-mono text-slate-500">Examples: Port 20/21 (FTP), 22 (SSH), 23 (Telnet), 25 (SMTP), 53 (DNS), 80 (HTTP), 110 (POP3), 123 (NTP), 443 (HTTPS).</div>
          </div>

          <div class="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
            <strong class="text-cyan-600 dark:text-cyan-400">B. Registered Ports (1,024 to 49,151 — 48,128 Ports):</strong>
            <p class="mt-1 text-slate-600 dark:text-slate-300">Registered with IANA by vendors, corporations, and open-source projects to avoid port conflicts for custom services. Standard user processes can bind to these ports without root privileges.</p>
            <div class="mt-2 text-[11px] font-mono text-slate-500">Examples: Port 1433 (Microsoft SQL), 1521 (Oracle DB), 3306 (MySQL), 5432 (PostgreSQL), 6379 (Redis), 8080 (HTTP Alternate/Tomcat).</div>
          </div>

          <div class="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
            <strong class="text-purple-600 dark:text-purple-400">C. Dynamic / Ephemeral Ports (49,152 to 65,535 — 16,384 Ports):</strong>
            <p class="mt-1 text-slate-600 dark:text-slate-300">Neither registered nor controlled. Assigned dynamically by the client host's operating system kernel whenever an outbound connection is initiated. Once the connection terminates, the OS frees the ephemeral port for reuse.</p>
          </div>
        </div>
      `,
      technicalDetails: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">2. IP Address vs. Port Number</h3>
        <table class="wiki-table w-full text-xs mb-4">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-800">
              <th>Dimension</th>
              <th>IP Address</th>
              <th>Port Number</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="font-bold">Operating Layer</td>
              <td>Network Layer (OSI Layer 3)</td>
              <td>Transport Layer (OSI Layer 4)</td>
            </tr>
            <tr>
              <td class="font-bold">Length</td>
              <td>IPv4: 32 bits (4 bytes) | IPv6: 128 bits (16 bytes)</td>
              <td>16 bits (2 bytes) — 0 to 65,535</td>
            </tr>
            <tr>
              <td class="font-bold">Primary Scope</td>
              <td>Identifies the host machine or interface on a network</td>
              <td>Identifies the specific software process on the host</td>
            </tr>
            <tr>
              <td class="font-bold">Header Placement</td>
              <td>Encapsulated in the IP Header</td>
              <td>Encapsulated in the TCP or UDP Header</td>
            </tr>
            <tr>
              <td class="font-bold">Assignment</td>
              <td>Assigned by network administrator / DHCP / ISP</td>
              <td>Assigned by IANA (well-known) or OS kernel (ephemeral)</td>
            </tr>
          </tbody>
        </table>
      `,
      workedExamples: {
        level1: `
          <strong>Examining Well-Known Ports in Unix /etc/services:</strong><br/>
          In Linux and macOS, standard well-known and registered port mappings are stored in the system file <code>/etc/services</code>:<br/>
          <pre class="bg-slate-900 text-emerald-400 p-2 rounded text-[11px] font-mono mt-1">
ssh         22/tcp          # SSH Remote Login Protocol
smtp        25/tcp          # Simple Mail Transfer Protocol
domain      53/udp          # Domain Name Server
domain      53/tcp          # Domain Name Server (Zone transfer)
http        80/tcp          # World Wide Web HTTP
https       443/tcp         # HTTP over TLS/SSL</pre>
        `,
        level2: `
          <strong>Connection Demultiplexing with 4-Tuples:</strong><br/>
          A web server (IP 203.0.113.10) runs an HTTP service on port 80.<br/>
          Two different clients connect simultaneously:<br/>
          • Client A: IP 198.51.100.5, Ephemeral Port 50021<br/>
          • Client B: IP 198.51.100.99, Ephemeral Port 50021 (Notice: same port number, different IP!)<br/>
          Can the server distinguish between them?<br/>
          <strong>Yes!</strong><br/>
          • Connection A 4-Tuple: <code>(198.51.100.5, 50021, 203.0.113.10, 80)</code><br/>
          • Connection B 4-Tuple: <code>(198.51.100.99, 50021, 203.0.113.10, 80)</code><br/>
          Because the source IP addresses differ, the 4-tuples are completely unique!
        `,
        level3: `
          <strong>Calculating Port Capacity Under NAPT (Network Address Port Translation):</strong><br/>
          A home Wi-Fi router has 1 public IPv4 address and uses NAPT to translate private LAN traffic.<br/>
          If the router reserves ports 10,000 to 65,000 for NAT mapping:<br/>
          <code>Available NAT Ports = 65,000 - 10,000 + 1 = 55,001 concurrent outbound sessions</code>.<br/>
          If internal hosts open 55,001 active connections to remote servers, any further outbound TCP connection attempt will fail until an idle session expires.
        `
      },
      advantagesLimitations: `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <h4 class="font-bold text-emerald-800 dark:text-emerald-300 mb-2">Advantages</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Enables full multitasking over a single physical IP network connection.</li>
              <li>Fixed well-known ports make service discovery predictable worldwide.</li>
              <li>Dynamic ephemeral allocation prevents port reservation conflicts between clients.</li>
            </ul>
          </div>
          <div class="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800">
            <h4 class="font-bold text-rose-800 dark:text-rose-300 mb-2">Security Considerations</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Port scanning (e.g. Nmap) reveals running network services to attackers.</li>
              <li>Predictable ephemeral port assignment enables blind connection spoofing/reset attacks.</li>
            </ul>
          </div>
        </div>
      `,
      whereUsed: [
        "Operating system socket multiplexers",
        "Firewall packet filtering rules (e.g., allow TCP on 443, drop UDP on 53)",
        "NAT/PAT routers mapping private LAN IP:Port to public IP:Port",
        "Load balancers directing traffic across server clusters"
      ],
      commonMistakes: `
        <ul class="space-y-2 text-xs">
          <li><strong>Confusing port number with physical hardware port:</strong> A network port number is a 16-bit software integer identifier, NOT a physical RJ-45 Ethernet jack!</li>
          <li><strong>Believing TCP and UDP share the same port space:</strong> TCP port 80 and UDP port 80 are completely independent and separate! A machine can run a TCP server and a UDP server on the exact same port number simultaneously without conflict.</li>
        </ul>
      `,
      quiz: [
        {
          question: "What is the size of a transport layer port number in the TCP/IP protocol suite?",
          options: [
            "8 bits (0 to 255)",
            "16 bits (0 to 65,535)",
            "32 bits (0 to 4,294,967,295)",
            "48 bits"
          ],
          answer: 1,
          explanation: "Port numbers are 16-bit unsigned integers, providing a range from 0 to 65,535."
        },
        {
          question: "Which port number range is designated as 'Well-Known Ports' controlled by IANA?",
          options: [
            "0 to 1,023",
            "1,024 to 49,151",
            "49,152 to 65,535",
            "8,000 to 9,000"
          ],
          answer: 0,
          explanation: "Ports 0 to 1,023 are Well-Known Ports reserved for standard universal system services."
        },
        {
          question: "What is a Socket Address?",
          options: [
            "A MAC address combined with an IP address",
            "The combination of an IP address and a Port number",
            "The hardware address of the CPU socket",
            "The subnet mask combined with the default gateway"
          ],
          answer: 1,
          explanation: "A Socket Address is the combination of an IP address and a 16-bit port number (e.g. 192.168.1.1:80)."
        }
      ],
      references: [
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, Chapter 23.1: Port Numbers, pp. 704-706", url: "" },
        { cite: "RFC 6335: Internet Assigned Numbers Authority (IANA) Procedures for Port Number Management", url: "https://datatracker.ietf.org/doc/html/rfc6335" }
      ]
    }
  },

  "u4-connection-establishment": {
    id: "u4-connection-establishment",
    title: "Connection Establishment",
    unit: "Unit 4 – Transport Layer",
    unitId: "unit4",
    level: "Level 2 — Core Architecture",
    category: "transport",
    difficulty: "Core",
    readingTime: "25 min read",
    standard: "RFC 9293 Section 3.4 / Forouzan Ch 23.3, pp. 723-726 / Tanenbaum Ch 6.1.3",
    oneLiner: "Principles and mechanisms for establishing transport layer connections across unreliable networks using the Three-Way Handshake.",
    quickAnswer: "Connection establishment is the procedure by which two transport entities synchronize sequence numbers, allocate buffer resources, agree on maximum segment sizes (MSS), and verify bidirectional reachability before transmitting user data. In TCP, this is performed using the Three-Way Handshake (SYN → SYN+ACK → ACK).",
    whyItMatters: "Establishing connections across packet-switched networks is complicated because old duplicate packets from previously closed connections can wander through network router loops and arrive long after the original session closed. The Three-Way Handshake, developed by Ray Tomlinson in 1975, mathematically guarantees that old delayed duplicates cannot fool the server into establishing ghost connections.",
    infobox: {
      prerequisites: ["u4-transport-services", "u4-transport-addressing"],
      relatedConcepts: ["u4-connection-release", "u4-tcp-segment-header", "u4-tcp-connection-establishment"],
      compareWith: ["two-way-handshake-vs-three-way-handshake"],
      primaryUses: [
        "Synchronizing Initial Sequence Numbers (ISNs) in both directions",
        "Allocating kernel memory and transmission buffers",
        "Negotiating TCP options (MSS, Window Scale, SACK)",
        "Defending against delayed duplicate packet interference"
      ],
      standardRfc: "RFC 9293 Section 3.4 (TCP Connection Establishment), RFC 6528"
    },
    learningObjectives: [
      "Explain the challenges of establishing connections over an unreliable network with packet duplication",
      "Demonstrate why a simple Two-Way Handshake fails (the delayed duplicate SYN anomaly)",
      "Trace the 3 steps of the TCP Three-Way Handshake: SYN, SYN+ACK, and final ACK",
      "Explain Initial Sequence Number (ISN) selection and why clock-based randomization is mandatory",
      "Understand SYN Flood DoS attacks and how SYN Cookies provide defense without allocating server memory"
    ],
    prerequisitesList: [
      { concept: "Transport Addressing", meaning: "Understanding client-server port binding" },
      { concept: "Packet Routing", meaning: "Knowledge that packets can take different paths and be arbitrarily delayed" }
    ],
    imageUrl: "assets/images/unit4/topic2-elements-protocols/connection-establishment-3way.svg",
    imageCaption: "Figure 4.5: Connection Establishment Mechanics — Delayed Duplicate Problem and the Three-Way Handshake Solution [Forouzan Figure 23.18]",
    sections: {
      overview: `
        <p class="mb-3">
          At first glance, establishing a transport connection seems simple: host A sends a connection request to host B, host B accepts, and communication begins. This is known as a <strong>Two-Way Handshake</strong>.
        </p>
        <p class="mb-3">
          However, in real-world packet-switched internetworks (like the Internet), packets can be <strong>delayed</strong> by congested routers, duplicated by retransmissions, or delivered completely out of order. A delayed packet can arrive minutes after the connection that generated it has closed!
        </p>
        <div class="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-lg text-xs font-mono mb-3">
          The Two-Way Handshake Failure Scenario:<br/>
          1. Client A sends a connection request (SYN) to Server B.<br/>
          2. The packet is delayed in a router loop; Client A times out and abandons the request.<br/>
          3. Much later, the delayed duplicate SYN arrives at Server B!<br/>
          4. If a 2-way handshake were used, Server B would reply "ACK", allocate buffers, and wait for data forever.<br/>
          5. Server B believes a valid connection is active, while Client A has no idea B is waiting!
        </div>
      `,
      howItWorks: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">1. The Three-Way Handshake Solution</h3>
        <p class="mb-3">
          To prevent delayed duplicates from creating false connections, TCP uses a <strong>Three-Way Handshake</strong>:
        </p>
        <div class="space-y-3 text-xs mb-4">
          <div class="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
            <strong class="text-blue-700 dark:text-blue-300">Step 1: Client Active Open (SYN)</strong>
            <p class="mt-1">Client sends a segment with control flag <code>SYN = 1</code> and chooses a pseudo-random Initial Sequence Number (<code>client_isn</code>). This segment consumes 1 sequence number but contains NO user data.</p>
            <div class="mt-1 font-mono text-[11px] text-blue-900 dark:text-blue-200">SYN=1, ACK=0, Seq = client_isn (e.g., 8000)</div>
          </div>

          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg">
            <strong class="text-emerald-700 dark:text-emerald-300">Step 2: Server Passive Open (SYN + ACK)</strong>
            <p class="mt-1">Server acknowledges the client's SYN by returning <code>Ack = client_isn + 1</code>, and simultaneously sends its own SYN with its chosen Initial Sequence Number (<code>server_isn</code>).</p>
            <div class="mt-1 font-mono text-[11px] text-emerald-900 dark:text-emerald-200">SYN=1, ACK=1, Seq = server_isn (e.g., 15000), Ack = 8001</div>
          </div>

          <div class="p-3 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg">
            <strong class="text-purple-700 dark:text-purple-300">Step 3: Client Final ACK</strong>
            <p class="mt-1">Client confirms receipt of server's SYN by sending an ACK segment with <code>Ack = server_isn + 1</code>. This segment can optionally carry the first chunk of application payload data!</p>
            <div class="mt-1 font-mono text-[11px] text-purple-900 dark:text-purple-200">ACK=1, SYN=0, Seq = 8001, Ack = 15001</div>
          </div>
        </div>

        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">2. How Three-Way Handshake Defeats Delayed Duplicates</h3>
        <p class="mb-3">
          If an old duplicate SYN arrives at Server B, Server B sends a SYN+ACK acknowledging that old sequence number. When Client A receives a SYN+ACK for a connection it never requested (or for an obsolete sequence number), Client A sends a <strong>Reset segment (<code>RST = 1</code>)</strong>. Server B immediately destroys the half-open connection and frees all allocated buffers!
        </p>
      `,
      technicalDetails: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">3. Initial Sequence Number (ISN) Selection</h3>
        <p class="mb-3">
          Why shouldn't sequence numbers always start at 0?
        </p>
        <ul class="list-disc pl-5 space-y-1 text-xs mb-3">
          <li><strong>Preventing Packet Intermixing:</strong> If two successive connections used the exact same IP:Port pair starting at 0, a delayed segment from connection 1 could be accepted as valid data by connection 2!</li>
          <li><strong>Security Against TCP Hijacking (RFC 6528):</strong> If sequence numbers were predictable, a remote attacker could forge IP packets and inject malicious data into a connection without seeing the server's replies.</li>
        </ul>
        <div class="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-mono mb-3">
          RFC 6528 Formula: ISN = M + H(LocalIP, LocalPort, RemoteIP, RemotePort, SecretKey)<br/>
          Where M is a 4-microsecond clock counter and H is a cryptographic keyed hash (e.g. SHA-256).
        </div>
      `,
      workedExamples: {
        level1: `
          <strong>Numerical Handshake Tracing:</strong><br/>
          Client chooses ISN = 5,000; Server chooses ISN = 9,000.<br/>
          • Step 1 (Client → Server): <code>SYN=1, ACK=0, Seq=5000</code><br/>
          • Step 2 (Server → Client): <code>SYN=1, ACK=1, Seq=9000, Ack=5001</code><br/>
          • Step 3 (Client → Server): <code>SYN=0, ACK=1, Seq=5001, Ack=9001</code><br/>
          Notice: The SYN bit consumes 1 sequence number even though it carries 0 bytes of user data!
        `,
        level2: `
          <strong>Handling a SYN Flood Attack with SYN Cookies:</strong><br/>
          In a <strong>SYN Flood DoS attack</strong>, an attacker sends thousands of spoofed SYN packets with fake source IPs. The server sends SYN+ACK and allocates a Transmission Control Block (TCB) in memory, waiting for step 3. The server's memory quickly exhausts, denying service to legitimate users.<br/>
          <strong>The SYN Cookie Defense (RFC 4987):</strong><br/>
          • The server does NOT allocate any memory when a SYN arrives!<br/>
          • Instead, the server encodes the connection parameters (MSS, timestamp, secret key) directly into its Initial Sequence Number (<code>server_isn = cookie</code>).<br/>
          • If a legitimate client completes Step 3 by sending <code>Ack = cookie + 1</code>, the server extracts the cookie, reconstructs the connection parameters, and only then allocates memory!
        `,
        level3: `
          <strong>Simultaneous Active Open:</strong><br/>
          What happens if two hosts simultaneously execute <code>connect()</code> to each other on pre-agreed ports?<br/>
          • Host A sends: <code>SYN=1, Seq=1000</code> (enters SYN_SENT)<br/>
          • Host B sends: <code>SYN=1, Seq=2000</code> (enters SYN_SENT)<br/>
          • Both hosts receive a SYN instead of SYN+ACK! Both transition to <code>SYN_RCVD</code>.<br/>
          • Host A sends: <code>SYN=1, ACK=1, Seq=1000, Ack=2001</code><br/>
          • Host B sends: <code>SYN=1, ACK=1, Seq=2000, Ack=1001</code><br/>
          • Both enter <code>ESTABLISHED</code>. Exactly ONE TCP connection is formed!
        `
      },
      advantagesLimitations: `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <h4 class="font-bold text-emerald-800 dark:text-emerald-300 mb-2">Strengths of 3-Way Handshake</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Mathematically proves bidirectional reachability before transmitting data.</li>
              <li>Allows bilateral negotiation of MSS, Window Scaling, and Selective ACKs (SACK).</li>
              <li>Completely eliminates phantom connections caused by delayed duplicate packets.</li>
            </ul>
          </div>
          <div class="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800">
            <h4 class="font-bold text-rose-800 dark:text-rose-300 mb-2">Inherent Overhead</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Adds a 1-RTT (Round Trip Time) latency penalty before user data can be exchanged.</li>
              <li>Vulnerable to SYN Flood exhaustion attacks unless SYN Cookies are enabled.</li>
            </ul>
          </div>
        </div>
      `,
      whereUsed: [
        "Every TCP connection initiated worldwide (billions per second)",
        "HTTP/1.1 and HTTP/2 over TLS",
        "SSH, SFTP, and Telnet remote management sessions",
        "Database driver connection pool establishment"
      ],
      commonMistakes: `
        <ul class="space-y-2 text-xs">
          <li><strong>Assuming SYN packets carry payload data:</strong> Standard SYN packets contain TCP headers and options only, but no application data (TCP Fast Open is an optional exception).</li>
          <li><strong>Believing sequence numbers start at 1:</strong> Initial Sequence Numbers are randomized across the full 32-bit integer range to prevent collision and spoofing.</li>
        </ul>
      `,
      quiz: [
        {
          question: "Why does TCP use a Three-Way Handshake instead of a Two-Way Handshake?",
          options: [
            "To encrypt the data payload with a triple-DES key",
            "To prevent old delayed duplicate connection requests from establishing ghost connections",
            "To measure the physical distance of the fiber-optic cable",
            "To compress the TCP header from 20 bytes to 8 bytes"
          ],
          answer: 1,
          explanation: "The 3-way handshake ensures that if an old delayed duplicate SYN arrives at a server, the server's reply will be rejected by the client with an RST segment."
        },
        {
          question: "How many sequence numbers does a SYN segment consume?",
          options: [
            "0 sequence numbers",
            "Exactly 1 sequence number",
            "Equal to the MSS value",
            "32 sequence numbers"
          ],
          answer: 1,
          explanation: "Control flags like SYN and FIN consume exactly 1 sequence number in the byte stream even if they carry 0 bytes of application payload."
        },
        {
          question: "What defense mechanism allows a TCP server to survive SYN Flood attacks without allocating memory buffers for incomplete connections?",
          options: [
            "Nagle's Algorithm",
            "Jacobson's Equation",
            "SYN Cookies",
            "Clark's Solution"
          ],
          answer: 2,
          explanation: "SYN Cookies encode connection parameters cryptographically into the server's Initial Sequence Number, delaying buffer allocation until the client completes Step 3."
        }
      ],
      references: [
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, Chapter 23.3: A TCP Connection, pp. 723-726", url: "" },
        { cite: "RFC 9293: Transmission Control Protocol (TCP), Section 3.4: Connection Establishment", url: "https://datatracker.ietf.org/doc/html/rfc9293#section-3.4" },
        { cite: "RFC 6528: Defending against Sequence Number Attacks", url: "https://datatracker.ietf.org/doc/html/rfc6528" }
      ]
    }
  },

  "u4-connection-release": {
    id: "u4-connection-release",
    title: "Connection Release",
    unit: "Unit 4 – Transport Layer",
    unitId: "unit4",
    level: "Level 2 — Core Architecture",
    category: "transport",
    difficulty: "Core",
    readingTime: "25 min read",
    standard: "RFC 9293 Section 3.5 / Forouzan Ch 23.3, pp. 727-729 / Tanenbaum Ch 6.1.4",
    oneLiner: "Mechanisms for terminating transport layer connections gracefully using symmetric release, 4-Way Handshake, and TIME-WAIT state.",
    quickAnswer: "Connection release is the procedure by which two communicating transport endpoints terminate an established connection, flush in-flight data, and release socket buffer memory. Because TCP is full-duplex (two independent data streams running in opposite directions), connection termination is symmetric: each direction must be closed independently using a FIN segment and an ACK segment (forming the Four-Way Handshake).",
    whyItMatters: "An abrupt connection release (asymmetric release) can lead to data loss if one party terminates while the other is still transmitting buffered bytes. Understanding symmetric release, the theoretical impossibility of guaranteed consensus (the Two-Army Problem), and the purpose of the 2MSL TIME-WAIT timer is essential for network engineering and debugging dangling socket leaks.",
    infobox: {
      prerequisites: ["u4-transport-services", "u4-connection-establishment"],
      relatedConcepts: ["u4-tcp-connection-release", "u4-tcp-timer-management"],
      compareWith: ["asymmetric-vs-symmetric-release"],
      primaryUses: [
        "Graceful termination of bidirectional data streams",
        "Supporting half-closed TCP connections (shutdown)",
        "Draining lingering duplicate packets from network routers",
        "Aborting abnormal sessions using the RST control flag"
      ],
      standardRfc: "RFC 9293 Section 3.5 (TCP Connection Termination)"
    },
    learningObjectives: [
      "Distinguish between Asymmetric Connection Release and Symmetric Connection Release",
      "Explain the famous Two-Army Problem and why 100% consensus is impossible over an unreliable channel",
      "Trace the 4 steps of the TCP Four-Way Handshake: FIN → ACK → FIN → ACK",
      "Explain the Half-Close state and how applications use shutdown()",
      "Analyze the TIME-WAIT state and why waiting for 2MSL (Maximum Segment Lifetime) is mandatory"
    ],
    prerequisitesList: [
      { concept: "TCP Three-Way Handshake", meaning: "Understanding connection establishment and control flags" },
      { concept: "Full-Duplex Communication", meaning: "Understanding that data flows simultaneously in both directions" }
    ],
    imageUrl: "assets/images/unit4/topic2-elements-protocols/connection-release-termination.svg",
    imageCaption: "Figure 4.6: TCP Symmetric Connection Release — Four-Way Handshake, Half-Close State, and the 2MSL TIME-WAIT Timer [Forouzan Figure 23.21]",
    sections: {
      overview: `
        <p class="mb-3">
          Terminating a connection can be approached in two fundamentally different ways:
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mb-4">
          <div class="p-3 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-lg">
            <h4 class="font-bold text-rose-800 dark:text-rose-300 mb-1">Asymmetric Release (Abrupt Tear-down)</h4>
            <p>Either party terminates the entire connection abruptly. It works like hanging up a telephone receiver: once one person hangs up, the conversation is dead. <em>Major Flaw:</em> If party A sends a disconnect while party B's data is in flight, party B's data is lost!</p>
          </div>
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg">
            <h4 class="font-bold text-emerald-800 dark:text-emerald-300 mb-1">Symmetric Release (Orderly Tear-down)</h4>
            <p>Treats the connection as <strong>two independent unidirectional simplex streams</strong>. Host A closes its sending stream, but can continue receiving data from Host B until Host B decides to close its stream as well. This is the model used by TCP.</p>
          </div>
        </div>
      `,
      howItWorks: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">1. The Two-Army Problem: The Theoretical Impossibility of Consensus</h3>
        <p class="mb-3">
          In computer science theory, the <strong>Two-Army Problem</strong> (Gray, 1978) proves that two communicating entities cannot achieve guaranteed, 100% mutual agreement over an unreliable transmission channel:
        </p>
        <div class="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs space-y-1.5 mb-4 font-mono">
          <div>• Two friendly armies (Blue Army 1 and Blue Army 2) surround a hostile city.</div>
          <div>• If both attack together, they win. If only one attacks alone, they are annihilated.</div>
          <div>• General 1 sends a messenger through enemy lines: "Attack at dawn."</div>
          <div>• Did the messenger make it? General 1 cannot attack without an acknowledgment (ACK).</div>
          <div>• General 2 sends an ACK messenger. But will General 2 attack without knowing if his ACK arrived? No! General 2 needs an ACK-of-the-ACK!</div>
          <div>• This creates an infinite regress: no finite number of acknowledgments can ever provide 100% certainty.</div>
        </div>
        <p class="text-xs text-slate-500 mb-3">
          In practice, TCP solves this theoretical dilemma using <strong>timers</strong>: after a party sends its final ACK, it waits for a timer (2MSL) and then unilaterally closes.
        </p>

        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">2. The Four-Way Handshake Steps</h3>
        <p class="mb-3">
          TCP connection termination typically proceeds through 4 distinct steps:
        </p>
        <div class="space-y-2 text-xs mb-4">
          <div class="p-2.5 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded">
            <strong>Step 1 (Client FIN):</strong> Client calls <code>close()</code> or <code>shutdown()</code>. Transmits <code>FIN = 1, Seq = u</code>. Client enters <code>FIN_WAIT_1</code> state.
          </div>
          <div class="p-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
            <strong>Step 2 (Server ACK):</strong> Server acknowledges client's FIN with <code>ACK = 1, Ack = u + 1</code>. Server enters <code>CLOSE_WAIT</code> state; client enters <code>FIN_WAIT_2</code> state. <em>The connection is now Half-Closed: Client can no longer send, but Server can continue sending remaining data!</em>
          </div>
          <div class="p-2.5 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded">
            <strong>Step 3 (Server FIN):</strong> When the server finishes transmitting all remaining data, it calls <code>close()</code>. Transmits <code>FIN = 1, ACK = 1, Seq = w, Ack = u + 1</code>. Server enters <code>LAST_ACK</code> state.
          </div>
          <div class="p-2.5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded">
            <strong>Step 4 (Client Final ACK):</strong> Client transmits final <code>ACK = 1, Seq = u + 1, Ack = w + 1</code>. Server receives ACK and enters <code>CLOSED</code>. Client enters <code>TIME_WAIT</code> state and starts its 2MSL timer!
          </div>
        </div>
      `,
      technicalDetails: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">3. The TIME-WAIT State and 2MSL Timer</h3>
        <p class="mb-3">
          The endpoint that executes the <strong>active close</strong> (typically the client) must enter the <strong>TIME-WAIT state</strong> and wait for twice the Maximum Segment Lifetime ($2 \times \text{MSL}$, typically 1 to 2 minutes) before finally closing its socket.
        </p>
        <div class="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg text-xs space-y-1.5 mb-3">
          <strong class="text-amber-800 dark:text-amber-300">The Two Essential Reasons for the 2MSL Timer:</strong>
          <p>1. <strong>Ensure Reliable Delivery of the Final ACK:</strong> If the client's final ACK in Step 4 is lost in transit, the server will time out and retransmit its FIN. If the client had immediately closed to <code>CLOSED</code>, it would respond to the retransmitted FIN with an <code>RST</code> error, making the server think an abnormal crash occurred. Remaining in <code>TIME_WAIT</code> allows the client to re-ACK the retransmitted FIN!</p>
          <p>2. <strong>Drain Lingering Duplicate Packets:</strong> In-flight packets can wander through router loops for up to MSL (typically 60 seconds). Waiting 2MSL guarantees that all stray packets from the old connection expire before a new connection is allowed to reuse the exact same IP:Port socket pair.</p>
        </div>
      `,
      workedExamples: {
        level1: `
          <strong>Modified Three-Way Handshake (Piggybacked FIN+ACK):</strong><br/>
          If the server has no pending data to send when it receives the client's FIN, it can combine Step 2 (ACK) and Step 3 (FIN) into a single segment:<br/>
          • Step 1 (Client → Server): <code>FIN=1, Seq=u</code><br/>
          • Step 2 (Server → Client): <code>FIN=1, ACK=1, Seq=w, Ack=u+1</code><br/>
          • Step 3 (Client → Server): <code>ACK=1, Seq=u+1, Ack=w+1</code><br/>
          This reduces the tear-down exchange from 4 segments to 3 segments!
        `,
        level2: `
          <strong>Using the shutdown() API for TCP Half-Close:</strong><br/>
          In a file-upload application, the client uploads a large file, signals end-of-file, and waits for the server's checksum confirmation report:<br/>
          • If client calls <code>close(sockfd)</code>, both read and write halves are closed; client cannot read the report!<br/>
          • Solution: Client calls <code>shutdown(sockfd, SHUT_WR)</code>.<br/>
          • The OS transmits a FIN segment, closing the client's outbound stream.<br/>
          • The client's socket descriptor remains open for reading (<code>recv()</code>), allowing it to successfully receive the server's confirmation report before calling <code>close()</code>.
        `,
        level3: `
          <strong>Abrupt Connection Abort Using RST:</strong><br/>
          What happens when an application crashes or is forcibly terminated via <code>kill -9</code> while unread data sits in its receive buffer?<br/>
          • The OS does NOT send a graceful FIN handshake.<br/>
          • Instead, the OS immediately sends a segment with the <strong>RST (Reset) flag set to 1</strong>.<br/>
          • The peer receives the RST segment and immediately drops the connection, generating a <code>Connection reset by peer</code> error (ECONNRESET in POSIX).
        `
      },
      advantagesLimitations: `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <h4 class="font-bold text-emerald-800 dark:text-emerald-300 mb-2">Advantages of Symmetric Release</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Zero data loss: each direction closes only when all queued bytes have been acknowledged.</li>
              <li>Supports Half-Close architectures where one side finishes producing data early.</li>
              <li>TIME-WAIT state protects new connections from stale packet collision.</li>
            </ul>
          </div>
          <div class="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800">
            <h4 class="font-bold text-rose-800 dark:text-rose-300 mb-2">Architectural Costs</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>High-frequency short-lived connections (e.g. HTTP without keep-alive) accumulate thousands of sockets in TIME_WAIT.</li>
              <li>Can exhaust local ephemeral ports on high-load proxy servers unless TCP TW recycling/reuse is tuned.</li>
            </ul>
          </div>
        </div>
      `,
      whereUsed: [
        "Graceful HTTP session termination",
        "Database connection pool recycling",
        "File upload completion signaling (FTP, HTTP POST)",
        "ZeroMQ and gRPC transport stream closures"
      ],
      commonMistakes: `
        <ul class="space-y-2 text-xs">
          <li><strong>Confusing CLOSE_WAIT with TIME_WAIT:</strong> Sockets stuck in <code>CLOSE_WAIT</code> indicate an application bug (the application received EOF from the client but forgot to call <code>close()</code>). Sockets in <code>TIME_WAIT</code> are normal OS behavior waiting for 2MSL.</li>
          <li><strong>Disabling TIME_WAIT completely:</strong> Forcing 2MSL to 0 using SO_LINGER can cause stale packets to corrupt subsequent connections on the same port!</li>
        </ul>
      `,
      quiz: [
        {
          question: "Why is TCP connection termination described as 'Symmetric'?",
          options: [
            "Because both hosts must use identical port numbers",
            "Because each direction of the full-duplex connection must be terminated independently using FIN and ACK",
            "Because both hosts must send their FIN segments at the exact same millisecond",
            "Because symmetric AES encryption is used"
          ],
          answer: 1,
          explanation: "In symmetric release, each simplex direction of the connection is shut down independently with its own FIN and ACK."
        },
        {
          question: "What state does the active-close endpoint enter after sending its final ACK to the peer's FIN?",
          options: [
            "CLOSED",
            "CLOSE_WAIT",
            "TIME_WAIT",
            "FIN_WAIT_1"
          ],
          answer: 2,
          explanation: "The active-close host enters TIME_WAIT and remains there for 2MSL to guarantee final ACK delivery and drain old packets."
        },
        {
          question: "What fundamental computer science dilemma demonstrates that 100% agreement is impossible over an unreliable channel?",
          options: [
            "The Byzantine Generals Problem",
            "The Dining Philosophers Problem",
            "The Two-Army Problem",
            "The Sleeping Barber Problem"
          ],
          answer: 2,
          explanation: "The Two-Army Problem proves that no finite number of acknowledgments can provide guaranteed mutual consensus over an unreliable medium."
        }
      ],
      references: [
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, Chapter 23.3: Connection Termination, pp. 727-729", url: "" },
        { cite: "RFC 9293: Transmission Control Protocol (TCP), Section 3.5: Connection Termination", url: "https://datatracker.ietf.org/doc/html/rfc9293#section-3.5" },
        { cite: "Jim Gray, Notes on Data Base Operating Systems, Section 5.8: The Two-Army Problem, IBM Research Report", url: "" }
      ]
    }
  },

  "u4-flow-control-buffering": {
    id: "u4-flow-control-buffering",
    title: "Flow Control and Buffering",
    unit: "Unit 4 – Transport Layer",
    unitId: "unit4",
    level: "Level 2 — Core Architecture",
    category: "transport",
    difficulty: "Core",
    readingTime: "25 min read",
    standard: "RFC 9293 / RFC 896 (Nagle) / Forouzan Ch 23.3, pp. 729-732 / Tanenbaum Ch 6.1.5",
    oneLiner: "Transport layer buffering strategies, dynamic receive window (rwnd) advertisement, and Silly Window Syndrome solutions.",
    quickAnswer: "Flow control is the mechanism by which the transport layer prevents a fast-sending host from overwhelming a slow-receiving host's kernel buffer. In TCP, flow control is implemented using a dynamic byte-oriented Sliding Window: the receiver advertises its available buffer space in the 16-bit Window Size field (rwnd) of every segment header, dynamically regulating the sender's transmission rate.",
    whyItMatters: "Without flow control, if a high-speed cloud server streams gigabytes of video to a mobile phone with limited memory and a slow video decoding process, the phone's memory would overflow, dropping millions of bytes and causing crippling retransmissions. The advertised window credit system ensures data is sent only as fast as the receiver application can read it.",
    infobox: {
      prerequisites: ["u4-transport-services", "u4-connection-establishment"],
      relatedConcepts: ["u4-tcp-sliding-window", "u4-tcp-timer-management", "u4-tcp-segment-header"],
      compareWith: ["flow-control-vs-congestion-control"],
      primaryUses: [
        "Preventing receiver socket buffer overflow",
        "Regulating sender transmission rate dynamically",
        "Zero-Window probing via the Persist Timer",
        "Eliminating tinygram packet waste via Nagle's algorithm and Clark's solution"
      ],
      standardRfc: "RFC 9293 (TCP), RFC 896 (Nagle's Algorithm), RFC 7323 (TCP Window Scale Option)"
    },
    learningObjectives: [
      "Distinguish Flow Control (protecting receiver buffer) from Congestion Control (protecting network routers)",
      "Explain circular sending and receiving buffers in the transport layer",
      "Calculate the Advertised Receive Window (rwnd) from total buffer size and unread bytes",
      "Explain the Zero-Window Deadlock problem and how the Persist Timer resolves it",
      "Analyze Silly Window Syndrome (SWS) and contrast Clark's receiver solution with Nagle's sender algorithm"
    ],
    prerequisitesList: [
      { concept: "Data Link Layer Flow Control", meaning: "Understanding stop-and-wait and frame-based sliding windows" },
      { concept: "Operating System Buffers", meaning: "Understanding circular memory buffers in the kernel" }
    ],
    imageUrl: "assets/images/unit4/topic2-elements-protocols/flow-control-buffering.svg",
    imageCaption: "Figure 4.7: Transport Layer Circular Buffering & Sliding Window Flow Control — Sender Window vs Receiver Window [Forouzan Figure 23.14 & 23.24]",
    sections: {
      overview: `
        <p class="mb-3">
          A fundamental challenge in data communication is the <strong>speed mismatch</strong> between communicating entities:
        </p>
        <ul class="list-disc pl-5 space-y-1 text-xs mb-3">
          <li>The sending application process might generate data at 100 MB/s.</li>
          <li>The receiving application process might be busy performing complex computations and only reading data at 2 MB/s.</li>
        </ul>
        <p class="mb-3">
          If the sender were allowed to transmit freely at full network wire speed, the receiver's kernel socket buffer would instantly fill to capacity, and subsequent incoming packets would be dropped on the floor.
        </p>
        <div class="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs font-mono mb-3">
          Flow Control vs. Congestion Control:<br/>
          • Flow Control is an <strong>end-to-end mechanism</strong> that protects the RECEIVER'S buffer from being overrun by a fast sender.<br/>
          • Congestion Control is a <strong>global network mechanism</strong> that protects INTERMEDIATE ROUTERS from traffic collapse!
        </div>
      `,
      howItWorks: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">1. Circular Buffers at the Transport Layer</h3>
        <p class="mb-3">
          Both the sender and receiver maintain circular memory buffers in the operating system kernel:
        </p>
        <div class="space-y-3 text-xs mb-4">
          <div class="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
            <strong class="text-blue-600 dark:text-blue-400">The Sender Buffer is divided into 4 categories:</strong>
            <ol class="list-decimal pl-5 space-y-1 mt-1 text-slate-600 dark:text-slate-300">
              <li><strong>Sent &amp; Acknowledged:</strong> Bytes transmitted and confirmed by cumulative ACKs; can be safely freed or overwritten.</li>
              <li><strong>Sent but Awaiting ACK (In-Flight):</strong> Bytes transmitted into the network; must be preserved in buffer in case retransmission is required!</li>
              <li><strong>Usable Window (Can Send Immediately):</strong> Bytes authorized by the receiver's window credit, ready to be packetized and transmitted.</li>
              <li><strong>Outside Window:</strong> Bytes generated by the sending app that cannot be transmitted until the receiver opens more credit.</li>
            </ol>
          </div>

          <div class="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
            <strong class="text-emerald-600 dark:text-emerald-400">The Receiver Buffer is divided into 3 categories:</strong>
            <ol class="list-decimal pl-5 space-y-1 mt-1 text-slate-600 dark:text-slate-300">
              <li><strong>Received &amp; Read:</strong> Bytes successfully read by application via <code>recv()</code>; buffer space is freed.</li>
              <li><strong>Received Awaiting Read:</strong> Bytes verified and acknowledged, sitting in kernel memory waiting for application read.</li>
              <li><strong>Free Buffer Space (rwnd):</strong> Available capacity advertised back to sender in the TCP <code>Window Size</code> header field!</li>
            </ol>
          </div>
        </div>

        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">2. The Advertised Window Formula</h3>
        <p class="mb-3">
          As defined in Forouzan Section 23.3 (Example 23.4), the receiver calculates its advertised window credit using:
        </p>
        <div class="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-mono mb-3">
          rwnd = Total Receiver Buffer Size - (LastByteReceived - LastByteRead)
        </div>
        <p class="text-xs text-slate-600 dark:text-slate-400 mb-3">
          As the receiving application reads bytes from the buffer, <code>rwnd</code> expands. If the application stops reading, <code>rwnd</code> shrinks to 0!
        </p>
      `,
      technicalDetails: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">3. Zero-Window Deadlock and the Persist Timer</h3>
        <p class="mb-3">
          When the receiver's buffer fills completely, it advertises <code>rwnd = 0</code>. The sender immediately stops transmitting data and enters a waiting state.
        </p>
        <div class="p-3 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-lg text-xs space-y-1 mb-3">
          <strong class="text-rose-800 dark:text-rose-300">The Deadlock Danger:</strong>
          <p>1. The receiving application eventually reads data, freeing up 4,000 bytes.</p>
          <p>2. The receiver sends a window update: <code>rwnd = 4000</code>.</p>
          <p>3. <em>Disaster:</em> This window update ACK is LOST in transit!</p>
          <p>4. The sender is waiting for a window update; the receiver is waiting for incoming data. Both wait forever (Deadlock)!</p>
        </div>
        <p class="text-xs mb-3">
          <strong>The Persist Timer Solution:</strong> Whenever the sender receives <code>rwnd = 0</code>, it starts a <strong>Persistence Timer</strong>. When the timer expires, the sender transmits a 1-byte <strong>Zero-Window Probe (ZWP)</strong>. The receiver must ACK the probe with its current <code>rwnd</code>, instantly breaking the deadlock!
        </p>

        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">4. Silly Window Syndrome (SWS) &amp; Dual Solutions</h3>
        <p class="mb-3">
          Silly Window Syndrome occurs when data is exchanged in tiny 1-byte trickles (tinygrams). A 1-byte payload wrapped in 20 bytes of TCP header and 20 bytes of IP header results in <strong>97.5% protocol overhead</strong>!
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mb-3">
          <div class="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg">
            <h4 class="font-bold text-amber-800 dark:text-amber-300 mb-1">Receiver Solution (Clark's Algorithm)</h4>
            <p>The receiver refuses to advertise tiny window openings. It advertises <code>rwnd = 0</code> until its free buffer space is at least <strong>one full MSS</strong> (e.g. 1460 bytes) or <strong>half of the total buffer size</strong>, whichever is smaller.</p>
          </div>
          <div class="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h4 class="font-bold text-blue-800 dark:text-blue-300 mb-1">Sender Solution (Nagle's Algorithm - RFC 896)</h4>
            <p>If the sender application generates small chunks (e.g. typing in Telnet), the sender transmits the first byte immediately. While waiting for the ACK, it buffers all subsequent small writes into a single larger segment until either a full MSS is accumulated or the ACK arrives!</p>
          </div>
        </div>
      `,
      workedExamples: {
        level1: `
          <strong>Calculating Effective Transmission Window:</strong><br/>
          Given:<br/>
          • Receiver advertised window: <code>rwnd = 8,000 bytes</code><br/>
          • Sender congestion window: <code>cwnd = 12,000 bytes</code><br/>
          • Bytes sent but not yet acknowledged (in-flight): <code>3,000 bytes</code><br/>
          <strong>Step 1:</strong> Total Window Size = min(rwnd, cwnd) = min(8000, 12000) = 8,000 bytes.<br/>
          <strong>Step 2:</strong> Usable Window = Total Window - In-Flight Bytes = 8,000 - 3,000 = <tspan font-weight="bold">5,000 bytes</tspan>.<br/>
          The sender can transmit up to 5,000 additional bytes immediately before stopping to wait for ACKs.
        `,
        level2: `
          <strong>The TCP Window Scale Option (RFC 7323):</strong><br/>
          The standard TCP header allocated only 16 bits for the Window Size field (maximum $2^{16} - 1 = 65,535\ \text{bytes}$).<br/>
          On high-speed gigabit networks with large propagation delay (Long Fat Networks - LFNs), a 65 KB window caps throughput severely:<br/>
          $$\\text{Max Throughput} = \\frac{\\text{Window Size}}{\\text{RTT}} = \\frac{65,535 \\times 8\\text{ bits}}{0.1\\text{ sec}} \\approx 5.24\\text{ Mbps}$$<br/>
          <strong>Solution:</strong> The Window Scale option negotiates a scale factor $S$ (0 to 14) during the 3-Way Handshake. The actual window size becomes:<br/>
          $$\\text{True Window} = \\text{Window Value} \\times 2^S$$<br/>
          With $S = 14$, the maximum window size expands to $65,535 \\times 2^{14} \\approx 1\\text{ Gigabyte}$, allowing full 10 Gbps utilization across oceans!
        `,
        level3: `
          <strong>Disabling Nagle's Algorithm (TCP_NODELAY):</strong><br/>
          While Nagle's algorithm is beneficial for bulk transfers, it causes terrible 200ms latency spikes in interactive applications (e.g. online multiplayer games, SSH keystroke echoes, and financial trading engines) when combined with TCP Delayed ACKs.<br/>
          • Solution: Applications set the <code>TCP_NODELAY</code> socket option:<br/>
          <pre class="bg-slate-900 text-emerald-400 p-2 rounded text-[11px] font-mono mt-1">
sock.setsockopt(socket.IPPROTO_TCP, socket.TCP_NODELAY, 1)</pre>
          This forces TCP to transmit small packets immediately without waiting for ACKs or full MSS buffers.
        `
      },
      advantagesLimitations: `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <h4 class="font-bold text-emerald-800 dark:text-emerald-300 mb-2">Advantages</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Protects receiver hardware and kernel memory from buffer overflow.</li>
              <li>Dynamic feedback adjusts automatically as receiver application load fluctuates.</li>
              <li>Window Scale option enables gigabit throughput over transatlantic links.</li>
            </ul>
          </div>
          <div class="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800">
            <h4 class="font-bold text-rose-800 dark:text-rose-300 mb-2">Trade-Offs</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Requires maintaining circular memory buffers in kernel space for every active socket.</li>
              <li>Silly Window Syndrome requires careful coordination between sender and receiver algorithms.</li>
            </ul>
          </div>
        </div>
      `,
      whereUsed: [
        "All TCP connections (kernel TCP stack flow control)",
        "HTTP chunked transfer streaming and video playback",
        "Large file transfers over FTP, SCP, and rsync",
        "High-performance cloud storage replication"
      ],
      commonMistakes: `
        <ul class="space-y-2 text-xs">
          <li><strong>Confusing flow control with congestion control:</strong> Flow control is controlled entirely by the receiver's available buffer space (rwnd); congestion control is determined by network bottleneck capacity (cwnd).</li>
          <li><strong>Assuming the sender's window can only open:</strong> A sender's window closes (left edge moves right) as ACKs arrive, and opens (right edge moves right) as rwnd expands.</li>
        </ul>
      `,
      quiz: [
        {
          question: "What is the primary objective of transport layer Flow Control?",
          options: [
            "To prevent intermediate routers from dropping packets due to congestion",
            "To prevent a fast sender from overflowing a slow receiver's buffer",
            "To encrypt data packets against eavesdropping",
            "To route packets across the shortest physical path"
          ],
          answer: 1,
          explanation: "Flow control prevents a fast sender from exhausting the receiving host's socket buffer capacity."
        },
        {
          question: "How does the receiver communicate its available buffer capacity to the sender in TCP?",
          options: [
            "By sending an ICMP Source Quench message",
            "Through the 16-bit Window Size field (rwnd) in every TCP header",
            "Through the Sequence Number field",
            "Using ARP resolution requests"
          ],
          answer: 1,
          explanation: "The receiver advertises its available buffer space (rwnd) continuously in the 16-bit Window Size field of TCP segment headers."
        },
        {
          question: "What timer does a TCP sender start when it receives an advertised window of rwnd = 0?",
          options: [
            "Retransmission Timer (RTO)",
            "Persistence Timer",
            "Keepalive Timer",
            "TIME-WAIT Timer"
          ],
          answer: 1,
          explanation: "The sender starts the Persistence Timer upon receiving rwnd = 0, periodically transmitting a 1-byte Zero-Window Probe to prevent deadlock."
        },
        {
          question: "Which algorithm buffers small writes at the sender until a full MSS is accumulated or an ACK arrives to prevent Silly Window Syndrome?",
          options: [
            "Clark's Algorithm",
            "Nagle's Algorithm",
            "Jacobson's Algorithm",
            "Karn's Algorithm"
          ],
          answer: 1,
          explanation: "Nagle's Algorithm (RFC 896) eliminates tinygrams by buffering small data writes at the sender until in-flight data is ACKed or a full MSS is ready."
        }
      ],
      references: [
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, Chapter 23.3: Flow Control, pp. 729-732", url: "" },
        { cite: "RFC 896: Congestion Control in IP/TCP Internetworks (John Nagle)", url: "https://datatracker.ietf.org/doc/html/rfc896" },
        { cite: "RFC 7323: TCP Extensions for High Performance (Window Scale Option)", url: "https://datatracker.ietf.org/doc/html/rfc7323" }
      ]
    }
  }
};

module.exports = { TOPIC2_ITEMS };
console.log("Topic 2 builder module defined!");

