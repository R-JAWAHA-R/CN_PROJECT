// Unit IV Topics Database: Transport Layer (TCP, UDP, Congestion Control)
// Matches Kurose & Ross Chapter 3, RFC 9293, RFC 768
const TOPICS_U4 = {
  "transport-layer": {
    id: "transport-layer",
    title: "Transport Layer: Ports & Multiplexing",
    unit: "Unit IV: Transport Layer",
    unitId: "unit4",
    level: "Level 3 — Major Topic / Module",
    category: "transport",
    difficulty: "Core",
    readingTime: "6 min read",
    standard: "Kurose & Ross Chapter 3.1 & 3.2",
    oneLiner: "The protocol layer providing logical process-to-process communication across endpoints via port numbers.",
    quickAnswer: "The transport layer bridges the gap between raw host-to-host IP datagrams and application processes, multiplexing traffic to specific programs using 16-bit port numbers.",
    whyItMatters: "Without transport multiplexing, a computer could only run one network application at a time. Ports allow your laptop to simultaneously run Spotify, Chrome with 20 tabs, Zoom, and Slack over a single IP address.",
    infobox: {
      layer: "Layer 4 (Transport Layer)",
      standard: "RFC 9293 (TCP), RFC 768 (UDP)",
      type: "Process-to-Process Communication",
      keyFormula: "\\text{Port Range: } 0 \\text{ to } 65,535 \\text{ (16 bits)}",
      prerequisites: ["network-layer", "packet"],
      relatedConcepts: ["tcp", "udp", "port"],
      compareWith: ["network-layer"],
      primaryUses: ["Socket APIs, Process Demultiplexing, Web & Media Delivery"]
    },
    sections: {
      overview: `While the Network Layer delivers packets between <strong>hosts</strong>, the <strong>Transport Layer</strong> delivers messages between <strong>application processes</strong> running on those hosts. It provides process-to-process logical communication using 16-bit port numbers.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Multiplexing (Sender):</strong> Gathers data chunks from multiple application sockets, appends transport headers (ports), and passes segments to Layer 3.</li>
          <li><strong>Demultiplexing (Receiver):</strong> Inspects port numbers in arriving segments to direct payloads to the exact target socket.</li>
          <li><strong>Connectionless Demultiplexing (UDP):</strong> Uses 2-tuple: \`[Destination IP, Destination Port]\`.</li>
          <li><strong>Connection-Oriented Demultiplexing (TCP):</strong> Uses 4-tuple: \`[Source IP, Source Port, Destination IP, Destination Port]\`.</li>
        </ol>`,
      diagram: `
+---------------------------------------------------------------+
|                      RECEIVING HOST                           |
|  [ Chrome Browser (Port 54321) ]    [ Zoom App (Port 42890) ] |
|                ^                                  ^           |
|                | Socket A                         | Socket B  |
|  +---------------------------------------------------------+  |
|  |       TRANSPORT LAYER DEMULTIPLEXING ENGINE             |  |
|  +---------------------------------------------------------+  |
|                                ^                              |
|                                | Arriving Segment             |
|                 [ Dest Port: 54321 ] -> Directs to Chrome!    |
+---------------------------------------------------------------+`,
      technicalDetails: `Port Number Ranges (IANA):
        <ul class="wiki-bullet-list">
          <li><strong>Well-Known Ports (0 - 1023):</strong> Reserved for standard server protocols (HTTP 80, HTTPS 443, DNS 53, SSH 22). Requires administrative/root privilege.</li>
          <li><strong>Registered Ports (1024 - 49151):</strong> Registered for vendor services (MySQL 3306, PostgreSQL 5432).</li>
          <li><strong>Dynamic / Ephemeral Ports (49152 - 65535):</strong> Temporarily assigned by client OS for outbound connections.</li>
        </ul>`,
      workedExample: `Two browser tabs visit the same web server (\`142.250.190.46:443\`):
        <br>• Tab 1 Socket: \`(192.168.1.10, 51234, 142.250.190.46, 443)\`
        <br>• Tab 2 Socket: \`(192.168.1.10, 51235, 142.250.190.46, 443)\`
        <br>Because TCP uses the full 4-tuple, the OS routes server responses to the exact corresponding tab with zero confusion!`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Feature</th><th>UDP Demux</th><th>TCP Demux</th></tr></thead>
          <tbody>
            <tr><td>Identifier</td><td>2-tuple (Dest IP, Dest Port)</td><td>4-tuple (Src/Dst IP, Src/Dst Port)</td></tr>
            <tr><td>State</td><td>Stateless</td><td>Stateful (Dedicated socket per client)</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Every socket API connection in C, Python, Java, Go", "Operating system kernel network stacks"],
      commonMistakes: "Thinking different client connections to a web server must use different destination ports. Web servers always listen on Port 80/443; multiple clients are differentiated by their unique <em>source IP and source port</em>.",
      compareWith: { title: "Transport Layer vs Network Layer", note: "Network layer provides host-to-host delivery (delivers letter to the apartment building). Transport layer provides process-to-process delivery (delivers letter to the specific person in apartment 4B)." },
      practice: {
        question: "How many fields uniquely identify a connection-oriented TCP socket on a receiving host?",
        choices: ["2 fields (IP and Port)", "3 fields (IP, Port, Protocol)", "4 fields (Source IP, Source Port, Dest IP, Dest Port)", "6 fields"],
        correctIndex: 2,
        explanation: "TCP sockets are uniquely demultiplexed by the 4-tuple: (Source IP, Source Port, Destination IP, Destination Port)."
      },
      references: [
        { cite: "Kurose & Ross Chapter 3.2: Multiplexing and Demultiplexing", url: "https://gaia.cs.umass.edu/kurose_ross/" }
      ]
    },
    prevTopicId: "nat",
    nextTopicId: "tcp"
  },

  "tcp": {
    id: "tcp",
    title: "Transmission Control Protocol (TCP)",
    unit: "Unit IV: Transport Layer",
    unitId: "unit4",
    level: "Level 3 — Major Topic / Module",
    category: "transport",
    difficulty: "Core",
    readingTime: "8 min read",
    standard: "RFC 9293 (Comprehensive TCP Specification)",
    oneLiner: "A connection-oriented, reliable, full-duplex byte-stream protocol featuring flow control and congestion control.",
    quickAnswer: "TCP guarantees reliable, in-order byte delivery across an unreliable IP network, using sequence numbers, ACKs, retransmissions, flow control windows, and congestion algorithms.",
    whyItMatters: "TCP is the backbone of the Internet economy, powering the World Wide Web, encrypted banking, cloud databases, email, and file transfers.",
    infobox: {
      layer: "Layer 4 (Transport Layer)",
      standard: "RFC 9293 (replaces RFC 793)",
      type: "Reliable Byte-Stream Transport",
      keyFormula: "\\text{Window in Flight} \\le \\min(\\text{rwnd}, \\text{cwnd})",
      prerequisites: ["transport-layer", "reliable-transfer"],
      relatedConcepts: ["udp", "tcp-handshake", "tcp-header", "tcp-flow-control", "tcp-congestion-control"],
      compareWith: ["udp"],
      primaryUses: ["HTTP/HTTPS Web Browsing, SSH, TLS, SQL Databases, SFTP"]
    },
    sections: {
      overview: `Standardized in RFC 9293, <strong>TCP (Transmission Control Protocol)</strong> is the Internet's connection-oriented workhorse. It transforms an unreliable, best-effort packet network (IP) into a reliable, ordered, full-duplex virtual byte-stream between two communicating endpoints.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Connection Establishment:</strong> Synchronizes Initial Sequence Numbers (ISNs) via the 3-Way Handshake (SYN $\\to$ SYN+ACK $\\to$ ACK).</li>
          <li><strong>Byte-Stream Abstraction:</strong> Data is viewed as an unbroken stream of bytes, not discrete messages. Sequence numbers count bytes, not packets.</li>
          <li><strong>Reliable Transfer:</strong> Positive cumulative ACKs, Round-Trip Time (RTT) estimations, and adaptive retransmission timers.</li>
          <li><strong>Flow Control:</strong> Receiver advertises its available buffer space ($rwnd$) in every header.</li>
          <li><strong>Congestion Control:</strong> Dynamically throttles sending rate ($cwnd$) using AIMD to protect network links.</li>
          <li><strong>Connection Teardown:</strong> Graceful termination using a 4-way FIN/ACK handshake and TIME_WAIT state.</li>
        </ol>`,
      diagram: `
+---------------------------------------------------------------+
|                       TCP CORE ARCHITECTURE                   |
|                                                               |
|  [ Application Data Stream: Byte 0, 1, 2, 3 ... 1,000,000 ]   |
|                               |                               |
|                               v                               |
|  [ Sliced into Segments (MSS = 1,460 Bytes) ]                 |
|                               |                               |
|                               v                               |
|  [ Sliding Window Pipeline: In Flight <= min(rwnd, cwnd) ]    |
|                               |                               |
|        ACKs, Fast Retransmit, Retransmission Timers           |
+---------------------------------------------------------------+`,
      technicalDetails: `Key technical specifications (RFC 9293):
        <ul class="wiki-bullet-list">
          <li><strong>Full-Duplex Service:</strong> Process A can send data to Process B while concurrently receiving data from Process B over the same connection.</li>
          <li><strong>Maximum Segment Size (MSS):</strong> Typically 1,460 bytes on Ethernet (MTU 1500 - 20B IP - 20B TCP).</li>
          <li><strong>Cumulative Acknowledgements:</strong> \`ACK = N\` means the receiver has received all bytes up to $N-1$ and is expecting byte $N$ next.</li>
        </ul>`,
      workedExample: `Sender transmits 3 segments: Seg 1 (Bytes 1-1000), Seg 2 (Bytes 1001-2000), Seg 3 (Bytes 2001-3000).
        <br>If Seg 2 is delayed, the receiver buffers Seg 3 and repeats \`ACK 1001\`.
        <br>When Seg 2 arrives, receiver returns cumulative \`ACK 3001\` (confirming all bytes up to 3000 in one shot!).`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Guaranteed 100% reliable, in-order byte delivery</td><td>1 RTT connection setup handshake latency</td></tr>
            <tr><td>Automatic flow and congestion control</td><td>Head-of-Line (HOL) blocking on packet drop</td></tr>
            <tr><td>Protects network from congestion collapse</td><td>Variable header overhead (20 to 60 bytes)</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Web browsing (HTTP/1.1 and HTTP/2)", "Secure Shell (SSH)", "Email transmission (SMTP)", "Database connections (PostgreSQL, MySQL)"],
      commonMistakes: "Thinking sequence numbers count packets. TCP sequence numbers count <em>bytes</em> of application payload, not packets.",
      compareWith: { title: "TCP vs UDP", note: "TCP guarantees reliable ordered delivery at the cost of setup latency. UDP transmits unacknowledged datagrams with zero setup latency and minimal 8-byte overhead." },
      practice: {
        question: "If a TCP sender transmits a segment with Sequence Number = 2000 and 500 bytes of payload, what ACK number does the receiver return?",
        choices: ["2000", "2500", "2501", "500"],
        correctIndex: 1,
        explanation: "The segment carries bytes 2000 through 2499. The receiver acknowledges by requesting the next expected byte: ACK = 2500."
      },
      references: [
        { cite: "RFC 9293: Transmission Control Protocol (TCP)", url: "https://datatracker.ietf.org/doc/html/rfc9293" }
      ]
    },
    prevTopicId: "transport-layer",
    nextTopicId: "udp"
  },

  "udp": {
    id: "udp",
    title: "User Datagram Protocol (UDP)",
    unit: "Unit IV: Transport Layer",
    unitId: "unit4",
    level: "Level 2 — Standard Topic",
    category: "transport",
    difficulty: "Core",
    readingTime: "5 min read",
    standard: "RFC 768 (User Datagram Protocol)",
    oneLiner: "A minimal, connectionless transport protocol providing lightweight datagram delivery with an 8-byte header.",
    quickAnswer: "UDP is 'no-frills' transport: it adds port multiplexing and an optional checksum over IP, with zero connection setup, no retransmissions, and no congestion delays.",
    whyItMatters: "Real-time voice, video streaming, multiplayer gaming, and DNS cannot tolerate TCP's retransmission stalls (head-of-line blocking). UDP delivers data immediately at line rate.",
    infobox: {
      layer: "Layer 4 (Transport Layer)",
      standard: "RFC 768",
      type: "Connectionless Datagram Transport",
      keyFormula: "\\text{Header Size} = \\text{Fixed exactly 8 Bytes (64 bits)}",
      prerequisites: ["transport-layer"],
      relatedConcepts: ["tcp", "udp-header", "checksum", "dns"],
      compareWith: ["tcp"],
      primaryUses: ["DNS Lookups, Live Video (WebRTC), Multiplayer Gaming, DHCP, VoIP"]
    },
    sections: {
      overview: `Defined by David Reed in 1980 in RFC 768, <strong>UDP (User Datagram Protocol)</strong> provides minimal transport services. Aside from multiplexing/demultiplexing processes and an optional error-checking checksum, UDP does almost nothing to alter raw IP datagrams.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Connectionless:</strong> No handshake before transmitting; transmits payload immediately.</li>
          <li><strong>Discrete Datagrams:</strong> Preserves message boundaries (unlike TCP's byte stream). One send call produces one datagram.</li>
          <li><strong>Unreliable Delivery:</strong> Packets may be lost, duplicated, or arrive out-of-order; UDP makes no effort to recover.</li>
          <li><strong>Unregulated Sending:</strong> Transmits data at whatever rate the application generates, unrestricted by congestion control.</li>
        </ol>`,
      diagram: `
+---------------------------------------------------------------+
|                       UDP 8-BYTE HEADER                       |
|   0                   1                   2                   3|
|   0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1|
|  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+|
|  |          Source Port          |       Destination Port        ||
|  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+|
|  |            Length             |           Checksum            ||
|  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+|
|  |                       Payload Data...                         ||
|  +---------------------------------------------------------------+|
+---------------------------------------------------------------+`,
      technicalDetails: `Why choose UDP?
        <ul class="wiki-bullet-list">
          <li><strong>Finer application control:</strong> Real-time audio drops late packets instead of stalling playback to retransmit.</li>
          <li><strong>No connection delay:</strong> DNS queries resolve in 1 RTT with zero connection handshake.</li>
          <li><strong>No connection state:</strong> Servers can support hundreds of thousands of active UDP clients with zero socket state memory.</li>
          <li><strong>Small header:</strong> 8 bytes vs TCP's 20-60 bytes (60% lower overhead).</li>
        </ul>`,
      workedExample: `DNS Query:
        <br>Client dispatches 45-byte DNS request datagram directly to \`8.8.8.8:53\`.
        <br>Server replies immediately with DNS response datagram.
        <br>Total elapsed time: 1 RTT. (With TCP, this would require 2 RTTs due to the 3-way handshake!).`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Zero setup latency, transmits immediately</td><td>No reliability (lost packets are not recovered)</td></tr>
            <tr><td>Tiny 8-byte header overhead</td><td>No congestion control (can trigger network drops)</td></tr>
            <tr><td>Preserves discrete message boundaries</td><td>Packets may arrive out-of-order</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Domain Name System queries (DNS)", "Real-time communication (WebRTC, Zoom audio)", "Online gaming player coordinates", "DHCP address assignment"],
      commonMistakes: "Believing UDP is 'worse' than TCP. UDP is intentionally lightweight. In real-time gaming or voice calls, waiting for TCP retransmission creates noticeable stuttering and lag; dropping a single packet is imperceptible.",
      compareWith: { title: "UDP vs TCP", note: "TCP is connection-oriented, reliable, and ordered. UDP is connectionless, lightweight, and unordered." },
      practice: {
        question: "What is the total size of a standard UDP header?",
        choices: ["4 bytes", "8 bytes", "20 bytes", "32 bytes"],
        correctIndex: 1,
        explanation: "The UDP header consists of four 16-bit fields (Source Port, Dest Port, Length, Checksum) totaling exactly 8 bytes (64 bits)."
      },
      references: [
        { cite: "RFC 768: User Datagram Protocol", url: "https://datatracker.ietf.org/doc/html/rfc768" }
      ]
    },
    prevTopicId: "tcp",
    nextTopicId: "udp-header"
  },

  "udp-header": {
    id: "udp-header",
    title: "UDP Header Format & Checksum",
    unit: "Unit IV: Transport Layer",
    unitId: "unit4",
    level: "Level 1 — Concept Card",
    category: "transport",
    difficulty: "Foundation",
    readingTime: "4 min read",
    standard: "RFC 768",
    oneLiner: "The 8-byte transport header containing Source Port, Destination Port, Length, and Checksum.",
    quickAnswer: "The UDP header is fixed at exactly 8 bytes (64 bits), partitioned into four 16-bit fields.",
    whyItMatters: "Its fixed 8-byte simplicity makes UDP trivial for hardware and software to parse at line rate.",
    infobox: {
      layer: "Layer 4 (Transport Layer)",
      standard: "RFC 768",
      type: "Header Specification",
      keyFormula: "\\text{Header Size} = 4 \\times 16 \\text{ bits} = 8 \\text{ Bytes}",
      prerequisites: ["udp"],
      relatedConcepts: ["udp", "checksum", "tcp-header"],
      compareWith: ["tcp-header"],
      primaryUses: ["DNS, DHCP, SNMP, NTP, WebRTC"]
    },
    sections: {
      overview: `The <strong>UDP Header</strong> is specified in RFC 768. It contains only four fields, making it one of the simplest headers in the entire Internet protocol suite.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Source Port (16 bits):</strong> Port of the sending process on the client host.</li>
          <li><strong>Destination Port (16 bits):</strong> Port of the receiving process on the server host.</li>
          <li><strong>Length (16 bits):</strong> Total length in bytes of the UDP header PLUS the payload data (minimum value = 8).</li>
          <li><strong>Checksum (16 bits):</strong> Optional in IPv4, mandatory in IPv6. Computed over a pseudo-header, UDP header, and payload.</li>
        </ol>`,
      diagram: `
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          Source Port          |       Destination Port        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|            Length             |           Checksum            |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+`,
      technicalDetails: `The UDP Pseudo-Header:
        <br>To compute the checksum, UDP prepends a 12-byte IPv4 pseudo-header containing Source IP, Destination IP, zero padding, Protocol (17), and UDP Length. This verifies that the packet was delivered to the correct IP address and was not misrouted!`,
      workedExample: `For a 50-byte application payload:
        <br>• Header length: 8 bytes
        <br>• Length field value: $50 + 8 = 58$ bytes
        <br>• Total datagram size on wire: 58 bytes.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Field</th><th>Size</th><th>Purpose</th></tr></thead>
          <tbody>
            <tr><td>Source Port</td><td>16 bits</td><td>Client return port</td></tr>
            <tr><td>Dest Port</td><td>16 bits</td><td>Target application service</td></tr>
            <tr><td>Length</td><td>16 bits</td><td>Header + Payload size</td></tr>
            <tr><td>Checksum</td><td>16 bits</td><td>Error detection hash</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["DNS queries (port 53)", "DHCP (ports 67/68)", "NTP time sync (port 123)"],
      commonMistakes: "Thinking the Length field represents payload length only. The Length field represents the total size: Header (8 bytes) + Payload.",
      compareWith: { title: "UDP Header vs TCP Header", note: "UDP header is fixed at 8 bytes. TCP header is 20 to 60 bytes, carrying sequence numbers, ACKs, flags, and window sizes." },
      practice: {
        question: "What is the minimum value possible for the UDP Length field?",
        choices: ["0", "8", "20", "64"],
        correctIndex: 1,
        explanation: "The Length field includes the header itself (8 bytes). With zero payload data, the minimum length is 8."
      },
      references: [
        { cite: "RFC 768: User Datagram Protocol", url: "https://datatracker.ietf.org/doc/html/rfc768" }
      ]
    },
    prevTopicId: "udp",
    nextTopicId: "tcp-three-way-handshake"
  },

  "tcp-three-way-handshake": {
    id: "tcp-three-way-handshake",
    title: "TCP Three-Way Handshake",
    unit: "Unit IV: Transport Layer",
    unitId: "unit4",
    level: "Level 3 — Major Topic / Module",
    category: "transport",
    difficulty: "Core",
    readingTime: "7 min read",
    standard: "RFC 9293 Section 3.4",
    oneLiner: "The connection establishment protocol synchronizing sequence numbers between client and server.",
    quickAnswer: "The 3-Way Handshake establishes a TCP connection in 3 steps: Client sends SYN, Server replies SYN+ACK, Client returns ACK, negotiating initial sequence numbers and socket buffers.",
    whyItMatters: "The 3-Way Handshake guarantees both sides are alive, verifies bidirectional communication, and prevents old duplicate connection requests from establishing phantom connections.",
    infobox: {
      layer: "Layer 4 (Transport Layer)",
      standard: "RFC 9293 (replaces RFC 793)",
      type: "Connection Establishment Protocol",
      keyFormula: "\\text{Handshake: } \\text{SYN} \\to \\text{SYN+ACK} \\to \\text{ACK}",
      prerequisites: ["tcp"],
      relatedConcepts: ["tcp", "tcp-header", "sequence-number"],
      compareWith: ["udp"],
      primaryUses: ["Every TCP connection globally (Web, Database, SSH)"]
    },
    sections: {
      overview: `Before any application data can flow over TCP, the client and server must establish connection state through the <strong>Three-Way Handshake</strong>. This sequence synchronizes random Initial Sequence Numbers (ISNs) and negotiates maximum segment sizes (MSS).`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Step 1: Client SYN:</strong> Client chooses random initial sequence number $x$ and sends segment with flag \`SYN=1\`, \`Seq=x\`. (Consumes 1 sequence number; carries no payload). State: \`SYN_SENT\`.</li>
          <li><strong>Step 2: Server SYN+ACK:</strong> Server allocates socket buffers, picks random initial sequence number $y$, and replies with flags \`SYN=1, ACK=1\`, \`Seq=y\`, \`Ack=x+1\`. State: \`SYN_RCVD\`.</li>
          <li><strong>Step 3: Client ACK:</strong> Client acknowledges server's sequence number with \`ACK=1\`, \`Seq=x+1\`, \`Ack=y+1\`. (This segment can carry first application payload, e.g. HTTP GET). States: \`ESTABLISHED\`.</li>
        </ol>`,
      diagram: `
CLIENT (Active Open)                                 SERVER (Passive Listen)
      |                                                        |
      | -------- Step 1: [SYN, Seq = x] ---------------------> | State: SYN_RCVD
      |                                                        | Allocates Buffers
      | <------- Step 2: [SYN+ACK, Seq = y, Ack = x+1] ------- |
      |                                                        |
State: ESTABLISHED                                             |
      | -------- Step 3: [ACK, Seq = x+1, Ack = y+1] --------> | State: ESTABLISHED
      |          (Optional: HTTP GET payload!)                 |`,
      interactiveLabKey: "handshake",
      technicalDetails: `Why are Initial Sequence Numbers (ISNs) randomized?
        <br>1. <strong>Preventing Old Duplicate Confusion:</strong> If ISNs were always 0, delayed packets from a terminated previous connection could be accepted by a new connection between the same ports!
        <br>2. <strong>Security against TCP Spoofing:</strong> Predictable sequence numbers allow blind off-path attackers to inject malicious data (Mitnick Attack, RFC 1948).`,
      workedExample: `Client ISN $x = 1000$, Server ISN $y = 5000$:
        <br>• Step 1 (SYN): \`Seq = 1000\`
        <br>• Step 2 (SYN+ACK): \`Seq = 5000, Ack = 1001\`
        <br>• Step 3 (ACK): \`Seq = 1001, Ack = 5001\`.
        <br>Both sides are now in \`ESTABLISHED\` state and data transmission commences.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Guarantees bidirectional socket connectivity</td><td>Adds 1 RTT latency before data can be sent</td></tr>
            <tr><td>Prevents old delayed packets from corrupting state</td><td>Vulnerable to SYN Flood DoS attacks (mitigated by SYN Cookies)</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Every HTTP/HTTPS web page request", "SSH terminal sessions", "SQL database client connections"],
      commonMistakes: "Believing Step 3 cannot carry data. The Step 3 ACK segment CAN carry application data (such as the HTTP GET request payload) in addition to confirming the server's SYN.",
      compareWith: { title: "TCP 3-Way Handshake vs TLS Handshake", note: "The TCP handshake establishes transport connectivity (1 RTT). The TLS handshake negotiates encryption keys and certificates directly on top of the established TCP connection (1 RTT in TLS 1.3)." },
      practice: {
        question: "Why does the SYN packet consume 1 sequence number even though it carries zero bytes of payload?",
        choices: ["To account for the IP header", "To ensure reliable delivery so the other side can acknowledge it with Ack = x + 1", "Due to a bug in BSD Unix", "To reserve port numbers"],
        correctIndex: 1,
        explanation: "Control flags like SYN and FIN consume one sequence number in the sequence space specifically so they can be reliably acknowledged by the peer."
      },
      references: [
        { cite: "RFC 9293: Transmission Control Protocol (TCP), Section 3.4: Connection Establishment", url: "https://datatracker.ietf.org/doc/html/rfc9293" }
      ]
    },
    prevTopicId: "udp-header",
    nextTopicId: "tcp-header"
  },

  "tcp-header": {
    id: "tcp-header",
    title: "TCP Segment Header (RFC 9293)",
    unit: "Unit IV: Transport Layer",
    unitId: "unit4",
    level: "Level 2 — Standard Topic",
    category: "transport",
    difficulty: "Core",
    readingTime: "7 min read",
    standard: "RFC 9293 Specification",
    oneLiner: "The 20 to 60-byte transport header containing Source/Dest Ports, Seq/Ack numbers, Flags, rwnd, and Checksum.",
    quickAnswer: "The TCP header contains 20 bytes of baseline fields plus optional extensions, carrying sequence numbers, cumulative ACKs, 9 control flags, and flow control advertised window.",
    whyItMatters: "The TCP header fields encode all control state required to guarantee in-order delivery, flow control, connection state transitions, and congestion feedback.",
    infobox: {
      layer: "Layer 4 (Transport Layer)",
      standard: "RFC 9293 (replaces RFC 793)",
      type: "Transport Header Format",
      keyFormula: "\\text{Header Size} = 20 \\text{ to } 60 \\text{ Bytes (Data Offset } \\times 4)",
      prerequisites: ["tcp"],
      relatedConcepts: ["sequence-number", "acknowledgement", "tcp-flow-control"],
      compareWith: ["udp-header"],
      primaryUses: ["Internet TCP Implementations"]
    },
    sections: {
      overview: `The <strong>TCP Segment Header</strong> is specified in RFC 9293. The baseline header is 20 bytes long; optional fields (such as MSS, Window Scale, SACK, and Timestamps) can expand it up to 60 bytes.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Source Port & Destination Port (16 bits each):</strong> Identify sending and receiving application sockets.</li>
          <li><strong>Sequence Number (32 bits):</strong> Byte stream number of the first payload byte in this segment.</li>
          <li><strong>Acknowledgement Number (32 bits):</strong> Valid if ACK flag is set; indicates next byte expected from peer.</li>
          <li><strong>Data Offset (4 bits):</strong> Number of 32-bit words in the header (header length in bytes divided by 4).</li>
          <li><strong>Control Flags (9 bits):</strong> URG, ACK, PSH, RST, SYN, FIN, ECE, CWR, NS.</li>
          <li><strong>Receive Window (16 bits):</strong> Available receiver buffer space ($rwnd$) for flow control.</li>
          <li><strong>Checksum (16 bits):</strong> 1's complement sum over pseudo-header, TCP header, and data.</li>
          <li><strong>Urgent Pointer (16 bits):</strong> Offset to urgent out-of-band data (if URG is set).</li>
        </ol>`,
      diagram: `
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          Source Port          |       Destination Port        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                        Sequence Number                        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Acknowledgment Number                      |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|  Data |           |U|A|P|R|S|F|                               |
| Offset| Reserved  |R|C|S|S|Y|I|            Window             |
|       |           |G|K|H|T|N|N|                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|           Checksum            |         Urgent Pointer        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Options                    |    Padding    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+`,
      technicalDetails: `The 6 Classic TCP Control Flags:
        <ul class="wiki-bullet-list">
          <li><strong>SYN:</strong> Synchronize sequence numbers (connection initiation).</li>
          <li><strong>ACK:</strong> Acknowledgment field is valid (set on almost every packet after handshake).</li>
          <li><strong>FIN:</strong> Sender has finished sending data (graceful close).</li>
          <li><strong>RST:</strong> Reset the connection immediately (abrupt termination/rejection).</li>
          <li><strong>PSH:</strong> Push data directly to receiving app without waiting for buffer fill.</li>
          <li><strong>URG:</strong> Urgent pointer field is valid.</li>
        </ul>`,
      workedExample: `If the Data Offset field contains the binary value \`0101\` (5 in decimal):
        <br>Header size is $5 \\times 4\\text{ bytes} = 20\\text{ bytes}$ (standard minimum header without options).
        <br>If Data Offset is \`1000\` (8 in decimal), header size is $8 \\times 4 = 32\\text{ bytes}$ (contains 12 bytes of options).`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Header Feature</th><th>Benefit</th></tr></thead>
          <tbody>
            <tr><td>32-Bit Sequence Numbers</td><td>Tracks up to 4 GB of in-flight data without wrapping</td></tr>
            <tr><td>Window Scale Option</td><td>Expands flow control window from 64 KB up to 1 GB</td></tr>
            <tr><td>Timestamps Option</td><td>Protects against wrapped sequence numbers (PAWS)</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["All RFC 9293 standard operating system network stacks"],
      commonMistakes: "Reading Data Offset as byte count. Data Offset is expressed in 32-bit (4-byte) words, not bytes.",
      compareWith: { title: "TCP Header vs UDP Header", note: "TCP header has 20-60 bytes packed with state controls. UDP header has exactly 8 bytes with zero state controls." },
      practice: {
        question: "If the TCP Data Offset field contains the decimal value 7, how many bytes of options are present in the header?",
        choices: ["0 bytes", "7 bytes", "8 bytes", "28 bytes"],
        correctIndex: 2,
        explanation: "Total header size = $7 \\times 4 = 28$ bytes. Baseline header is 20 bytes, so options = $28 - 20 = 8$ bytes."
      },
      references: [
        { cite: "RFC 9293: Transmission Control Protocol (TCP), Section 3.1: Header Format", url: "https://datatracker.ietf.org/doc/html/rfc9293" }
      ]
    },
    prevTopicId: "tcp-three-way-handshake",
    nextTopicId: "sequence-number"
  },

  "sequence-number": {
    id: "sequence-number",
    title: "TCP Sequence Numbers & Byte Streams",
    unit: "Unit IV: Transport Layer",
    unitId: "unit4",
    level: "Level 1 — Concept Card",
    category: "transport",
    difficulty: "Core",
    readingTime: "5 min read",
    standard: "RFC 9293",
    oneLiner: "A 32-bit number identifying the position of the first byte of payload data in the overall stream.",
    quickAnswer: "TCP numbers each byte in the payload stream sequentially. The sequence number in the header is the byte number of the first byte carried in that segment.",
    whyItMatters: "Sequence numbers allow the receiver to detect missing packets, discard duplicate retransmissions, and reassemble out-of-order segments into the exact original file.",
    infobox: {
      layer: "Layer 4 (Transport Layer)",
      standard: "RFC 9293",
      type: "Ordering & Assembly Protocol",
      keyFormula: "\\text{Next Seq} = \\text{Current Seq} + \\text{Payload Length (Bytes)}",
      prerequisites: ["tcp", "tcp-header"],
      relatedConcepts: ["acknowledgement", "tcp-flow-control"],
      compareWith: ["acknowledgement"],
      primaryUses: ["In-Order Stream Assembly, Loss Detection"]
    },
    sections: {
      overview: `Unlike protocols that number packets (0, 1, 2, 3), TCP treats data as an <strong>unbroken byte stream</strong>. Sequence numbers count individual bytes of data. The sequence number placed in a segment's header is the index of the first data byte contained within that segment.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Random ISN:</strong> Handshake establishes initial sequence number (e.g. $ISN = 500,000$).</li>
          <li><strong>Byte Indexing:</strong> The first byte of payload is byte $500,001$.</li>
          <li><strong>Chunking:</strong> If MSS is 1,000 bytes:
            <ul>
              <li>Segment 1 carries bytes 500,001 to 501,000 $\\to$ \`Seq = 500,001\`.</li>
              <li>Segment 2 carries bytes 501,001 to 502,000 $\\to$ \`Seq = 501,001\`.</li>
            </ul>
          </li>
          <li><strong>Reassembly:</strong> Even if Segment 2 arrives before Segment 1, the receiver sorts them into order based on sequence numbers.</li>
        </ol>`,
      diagram: `
Application Data Byte Stream:
[Byte 1................1000] [Byte 1001...............2000] [Byte 2001...............3000]
         |                                |                                |
         v                                v                                v
     Segment 1                        Segment 2                        Segment 3
    Seq = 1                          Seq = 1001                       Seq = 2001`,
      technicalDetails: `Sequence Number Wrap-Around:
        <br>With 32-bit sequence numbers, $2^{32} \\approx 4.29\\text{ GB}$ can be numbered before wrapping to 0. On a 10 Gbps network, 4.29 GB wraps in just 3.4 seconds!
        <br><strong>Solution:</strong> The TCP Timestamps option (RFC 7323) includes high-resolution timestamps to differentiate between new packets and wrapped old duplicates (Protect Against Wrapped Sequences - PAWS).`,
      workedExample: `Sender transmits 2,000 bytes in segments of 500 bytes starting at ISN 100:
        <br>• Seg 1: \`Seq = 101\`, length = 500 bytes (Bytes 101 - 600)
        <br>• Seg 2: \`Seq = 601\`, length = 500 bytes (Bytes 601 - 1100)
        <br>• Seg 3: \`Seq = 1101\`, length = 500 bytes (Bytes 1101 - 1600)
        <br>• Seg 4: \`Seq = 1601\`, length = 500 bytes (Bytes 1601 - 2100).`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Supports arbitrary chunk sizes and dynamic resizing</td><td>Wraps around on multi-gigabit connections</td></tr>
            <tr><td>Guarantees exact in-order reassembly</td><td>Requires 32 bits (4 bytes) per segment</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["All TCP connections worldwide"],
      commonMistakes: "Thinking sequence numbers increment by 1 per packet. They increment by the number of payload bytes carried in the segment!",
      compareWith: { title: "Sequence Number vs Acknowledgement Number", note: "Sequence Number indicates the first byte sent by this host. Acknowledgement Number indicates the next byte expected from the peer." },
      practice: {
        question: "If a sender transmits a segment with Seq = 5000 and payload size 1460 bytes, what will be the sequence number of the immediately following segment?",
        choices: ["5001", "6460", "6461", "1460"],
        correctIndex: 1,
        explanation: "The segment carries bytes 5000 through 6459. The next segment begins at byte $5000 + 1460 = 6460$."
      },
      references: [
        { cite: "RFC 9293: Transmission Control Protocol (TCP), Section 3.3: Sequence Numbers", url: "https://datatracker.ietf.org/doc/html/rfc9293" }
      ]
    },
    prevTopicId: "tcp-header",
    nextTopicId: "acknowledgement"
  },

  "acknowledgement": {
    id: "acknowledgement",
    title: "TCP Cumulative Acknowledgements",
    unit: "Unit IV: Transport Layer",
    unitId: "unit4",
    level: "Level 1 — Concept Card",
    category: "transport",
    difficulty: "Core",
    readingTime: "5 min read",
    standard: "RFC 9293 / RFC 2018",
    oneLiner: "The mechanism by which the receiver confirms receipt of data by requesting the next expected byte.",
    quickAnswer: "TCP ACKs are cumulative: ACK N indicates that all bytes up to N-1 have been received safely, and the receiver is expecting byte N next.",
    whyItMatters: "Cumulative ACKs make TCP robust to dropped ACKs: if ACK 1000 is lost but ACK 2000 arrives, the sender knows all bytes up to 1999 arrived safely.",
    infobox: {
      layer: "Layer 4 (Transport Layer)",
      standard: "RFC 9293, RFC 2018 (SACK)",
      type: "Reliability Feedback Mechanism",
      keyFormula: "\\text{Ack } N = \\text{All bytes } < N \\text{ received safely}",
      prerequisites: ["sequence-number", "tcp"],
      relatedConcepts: ["sequence-number", "tcp-flow-control", "tcp-congestion-control"],
      compareWith: ["sequence-number"],
      primaryUses: ["TCP Loss Recovery, Fast Retransmit Trigger"]
    },
    sections: {
      overview: `In TCP, the <strong>Acknowledgement Number</strong> in the header indicates the sequence number of the next byte the receiver expects to receive. Because acknowledgements are <strong>cumulative</strong>, a single ACK confirms all prior bytes.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Cumulative Confirmation:</strong> Receiving \`ACK 3000\` confirms bytes $0$ through $2999$.</li>
          <li><strong>Robustness to Lost ACKs:</strong> If ACK 1000 is dropped by a router but ACK 2000 arrives safely, the sender knows bytes up to 1999 were received.</li>
          <li><strong>Duplicate ACKs:</strong> If a segment is missing, arriving out-of-order segments cause the receiver to immediately generate duplicate ACKs for the missing byte.</li>
          <li><strong>Fast Retransmit Trigger:</strong> 3 duplicate ACKs trigger immediate retransmission without waiting for timer expiry.</li>
        </ol>`,
      diagram: `
Sender transmits Segments 1, 2, 3. Segment 2 is lost!
Sender                              Receiver
  |------ [Bytes 1 - 1000] ---------->|   Received! Send ACK 1001
  |------ [Bytes 1001 - 2000] -X      |   (Lost!)
  |------ [Bytes 2001 - 3000] ------->|   Out-of-order! Send Dup ACK 1001!
  |------ [Bytes 3001 - 4000] ------->|   Out-of-order! Send Dup ACK 1001!
  |------ [Bytes 4001 - 5000] ------->|   Out-of-order! Send Dup ACK 1001!
  |
  | 3 Duplicate ACKs received!
  | ==> FAST RETRANSMIT BYTES 1001-2000!`,
      technicalDetails: `TCP Selective Acknowledgements (SACK - RFC 2018):
        <br>Standard TCP cumulative ACKs only report the highest contiguous byte received. SACK adds options blocks reporting isolated ranges received (e.g. \`SACK: 2001-3000, 4001-5000\`), allowing the sender to retransmit only the missing holes without guessing.`,
      workedExample: `Receiver holds bytes 1 to 500.
        <br>• Arrives: Bytes 501-1000 $\\to$ Returns \`ACK 1001\`.
        <br>• Arrives: Bytes 1501-2000 (gap!) $\\to$ Buffers chunk, returns \`ACK 1001\`.
        <br>• Arrives: Bytes 1001-1500 (missing hole filled!) $\\to$ Returns \`ACK 2001\`.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Immune to individual lost ACK packets</td><td>Cannot report isolated multiple lost gaps without SACK</td></tr>
            <tr><td>Drives Fast Retransmit (3 duplicate ACKs)</td><td>Delayed ACK timer (200 ms) can add minor latency</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Every TCP connection globally", "TCP Fast Retransmit and SACK implementations"],
      commonMistakes: "Thinking ACK N means 'I received byte N'. ACK N means 'I have received everything up to N-1, and I am waiting for byte N'.",
      compareWith: { title: "Cumulative ACK vs Selective ACK", note: "Cumulative ACK confirms up to the contiguous frontier. Selective ACK (SACK) explicitly lists discontinuous out-of-order blocks." },
      practice: {
        question: "How many duplicate ACKs must a TCP sender receive before triggering a Fast Retransmit?",
        choices: ["1 duplicate ACK", "2 duplicate ACKs", "3 duplicate ACKs", "5 duplicate ACKs"],
        correctIndex: 2,
        explanation: "RFC 9293 mandates that receipt of 3 duplicate ACKs (4 identical ACKs total) triggers Fast Retransmit without waiting for the retransmission timer to expire."
      },
      references: [
        { cite: "RFC 9293: Transmission Control Protocol (TCP), Section 3.3.2: Acknowledgment Numbers", url: "https://datatracker.ietf.org/doc/html/rfc9293" }
      ]
    },
    prevTopicId: "sequence-number",
    nextTopicId: "tcp-flow-control"
  },

  "tcp-flow-control": {
    id: "tcp-flow-control",
    title: "TCP Flow Control & Receive Window (rwnd)",
    unit: "Unit IV: Transport Layer",
    unitId: "unit4",
    level: "Level 2 — Standard Topic",
    category: "transport",
    difficulty: "Core",
    readingTime: "6 min read",
    standard: "RFC 9293 Section 3.7",
    oneLiner: "The speed-matching mechanism where receiver advertises available buffer space (rwnd) in every TCP header.",
    quickAnswer: "TCP Flow Control protects the receiver's socket buffer: the receiver advertises rwnd in every ACK, and the sender ensures that unacknowledged in-flight bytes never exceed rwnd.",
    whyItMatters: "If a fast server transmits at 1 Gbps to a smartphone busy processing video frames, the phone's buffer would instantly overflow without flow control.",
    infobox: {
      layer: "Layer 4 (Transport Layer)",
      standard: "RFC 9293, RFC 7323 (Window Scale)",
      type: "Receiver Buffer Protection",
      keyFormula: "\\text{LastByteSent} - \\text{LastByteAcked} \\le \\text{rwnd}",
      prerequisites: ["tcp", "tcp-header", "flow-control"],
      relatedConcepts: ["tcp-congestion-control", "tcp-header"],
      compareWith: ["tcp-congestion-control"],
      primaryUses: ["TCP Socket Buffer Management, High-Throughput Window Scaling"]
    },
    sections: {
      overview: `<strong>TCP Flow Control</strong> is an end-to-end service ensuring that a sender does not overflow the receiver's buffer. The receiving operating system allocates a buffer (\`RcvBuffer\`) for each socket; if the application reads data slower than it arrives, the buffer fills up. Flow control throttles the sender accordingly.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Advertised Window ($rwnd$):</strong> Calculated as $rwnd = \\text{RcvBuffer} - [\\text{LastByteRcvd} - \\text{LastByteRead}]$.</li>
          <li><strong>Header Advertisement:</strong> The receiver puts its current $rwnd$ into the 16-bit Window field of every ACK.</li>
          <li><strong>Sender Limit:</strong> Sender ensures in-flight unacknowledged bytes do not exceed $rwnd$:
            $$\\text{LastByteSent} - \\text{LastByteAcked} \\le rwnd$$</li>
          <li><strong>Zero Window & Persist Timer:</strong> If $rwnd = 0$, sender pauses. To prevent permanent deadlock if the window update ACK is lost, the sender starts a <strong>persist timer</strong> and periodically sends 1-byte <em>Zero Window Probes</em>.</li>
        </ol>`,
      diagram: `
RECEIVER SOCKET BUFFER:
+-------------------------------+-------------------------------+
|  Allocated Buffer (RcvBuffer) |  Free Available Space (rwnd)  |
|  [ Data Waiting for App Read ]|                               |
+-------------------------------+-------------------------------+
|<--- LastByteRcvd - Read ----->|<----------- rwnd ------------>|

Sender receives ACK with rwnd = 10,000 bytes.
Sender cannot have more than 10,000 unacknowledged bytes in flight!`,
      technicalDetails: `TCP Window Scale Option (RFC 7323):
        <br>The standard 16-bit Window field caps maximum $rwnd$ at $2^{16} - 1 = 65,535\\text{ bytes}$ (64 KB). On a 10 Gbps link with 50 ms RTT, a 64 KB window yields max throughput of only 10 Mbps!
        <br>The <strong>Window Scale Option</strong> negotiated during the 3-Way Handshake multiplies the 16-bit window value by $2^S$ (up to $S=14$), scaling the maximum window up to **1 Gigabyte**!`,
      workedExample: `Receiver has 50 KB buffer. App has read 30 KB, and 45 KB has arrived:
        <br>Buffered unread data: $45 - 30 = 15\\text{ KB}$.
        <br>Free space: $rwnd = 50 - 15 = 35\\text{ KB}$.
        <br>Receiver advertises \`rwnd = 35,000\`. Sender can transmit up to 35 KB before stalling.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Guarantees zero receiver buffer overflow packet drops</td><td>Does not account for congestion in the intermediate routers</td></tr>
            <tr><td>Dynamically adapts to application processing speed</td><td>Silly Window Syndrome if sender transmits tiny segments</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Every TCP socket buffer in Linux, Windows, macOS", "High-performance data center transfers using large Window Scale factors"],
      commonMistakes: "Thinking flow control prevents intermediate router drops. Flow control only protects the *destination endpoint buffer*. Drops in intermediate network routers are managed by *congestion control*.",
      compareWith: { title: "Flow Control (rwnd) vs Congestion Control (cwnd)", note: "Flow control (rwnd) prevents the sender from overflowing the receiver's buffer. Congestion control (cwnd) prevents the sender from overflowing intermediate routers." },
      practice: {
        question: "What mechanism does a TCP sender use to prevent deadlock when the receiver advertises a zero window (rwnd = 0)?",
        choices: ["Sends an RST packet", "Starts a persist timer and periodically sends 1-byte probe segments", "Doubles its timeout timer", "Terminates the connection"],
        correctIndex: 1,
        explanation: "When rwnd=0, the sender starts a persist timer to send 1-byte probes, prompting the receiver to return an updated window size in case the reopening ACK was lost."
      },
      references: [
        { cite: "RFC 9293: Transmission Control Protocol (TCP), Section 3.7: Data Communication", url: "https://datatracker.ietf.org/doc/html/rfc9293" },
        { cite: "RFC 7323: TCP Extensions for High Performance (Window Scale Option)", url: "https://datatracker.ietf.org/doc/html/rfc7323" }
      ]
    },
    prevTopicId: "acknowledgement",
    nextTopicId: "tcp-congestion-control"
  },

  "tcp-congestion-control": {
    id: "tcp-congestion-control",
    title: "TCP Congestion Control (AIMD & Slow Start)",
    unit: "Unit IV: Transport Layer",
    unitId: "unit4",
    level: "Level 3 — Major Topic / Module",
    category: "transport",
    difficulty: "Advanced",
    readingTime: "8 min read",
    standard: "RFC 5681 (TCP Congestion Control)",
    oneLiner: "The network-protecting algorithm dynamically adjusting the congestion window (cwnd) via Slow Start, Congestion Avoidance, and Fast Recovery.",
    quickAnswer: "TCP Congestion Control probes for available bandwidth by increasing cwnd additively (+1 MSS per RTT) and cutting cwnd multiplicatively (/2) upon packet loss (AIMD).",
    whyItMatters: "In 1986, the early Internet suffered catastrophic 'congestion collapse' as sending rates overwhelmed router buffers. Van Jacobson's congestion control saved the global Internet.",
    infobox: {
      layer: "Layer 4 (Transport Layer)",
      standard: "RFC 5681 (TCP Reno)",
      type: "Network-Wide Congestion Protection",
      keyFormula: "\\text{AIMD: } cwnd \\leftarrow cwnd + 1 \\text{ (No loss)}, \\quad cwnd \\leftarrow \\frac{cwnd}{2} \\text{ (Loss)}",
      prerequisites: ["tcp", "tcp-flow-control"],
      relatedConcepts: ["tcp-flow-control", "tcp", "aimd"],
      compareWith: ["tcp-flow-control"],
      primaryUses: ["TCP Reno, TCP Cubic, Google BBR, Global Internet Stability"]
    },
    sections: {
      overview: `<strong>TCP Congestion Control</strong> is a distributed, end-to-end mechanism that throttles the sender's transmission rate to prevent intermediate routers from collapsing under excessive load. The sender maintains a <strong>Congestion Window ($cwnd$)</strong>. The amount of unacknowledged data in flight is capped by $\\min(cwnd, rwnd)$.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Slow Start:</strong> Starts with $cwnd = 1\\text{ MSS}$. Doubles $cwnd$ every RTT (exponential growth) until reaching the slow-start threshold ($ssthresh$).</li>
          <li><strong>Congestion Avoidance:</strong> When $cwnd \\ge ssthresh$, increases $cwnd$ linearly by $+1\\text{ MSS}$ per RTT (Additive Increase).</li>
          <li><strong>Fast Retransmit & Fast Recovery (Reno):</strong> When 3 duplicate ACKs arrive:
            <ul>
              <li>Sets $ssthresh = cwnd / 2$.</li>
              <li>Sets $cwnd = ssthresh + 3\\text{ MSS}$ (Multiplicative Decrease). Retransmits missing packet without dropping to 1 MSS!</li>
            </ul>
          </li>
          <li><strong>Timeout Event:</strong> Severe congestion: sets $ssthresh = cwnd / 2$ and drops $cwnd$ all the way back to $1\\text{ MSS}$ (Slow Start resumes).</li>
        </ol>`,
      diagram: `
+---------------------------------------------------------------+
|             TCP CONGESTION CONTROL (AIMD SAWTOOTH)            |
|                                                               |
| cwnd (MSS)                                                    |
|  32 |                     /\\  (Loss via 3 Dup ACKs)           |
|     |                    /  \\                                 |
|  16 |        /\\         /    \\-- Multiplicative Decrease (/2) |
|     |       /  \\       /                                      |
|   8 |      /    \\-----/   Additive Increase (+1 MSS/RTT)      |
|     |     /  Exponential Slow Start                           |
|   1 |----+--------------------------------------------------> |
|      Round-Trip Times (RTTs)                                  |
+---------------------------------------------------------------+`,
      technicalDetails: `Mathematical proof of AIMD Stability:
        <br>Chiu and Jain (1989) proved that among linear control algorithms, only <strong>Additive Increase Multiplicative Decrease (AIMD)</strong> converges to both **efficiency** (100% link utilization) and **fairness** (equal bandwidth sharing among competing flows). MIMD and AIAD oscillate wildly or starve competing connections.`,
      workedExample: `Current $cwnd = 24\\text{ MSS}$, $ssthresh = 16\\text{ MSS}$.
        <br>1. In Congestion Avoidance, each RTT increments $cwnd$ by 1: $24 \\to 25 \\to 26\\text{ MSS}$.
        <br>2. 3 duplicate ACKs arrive at $cwnd = 26\\text{ MSS}$.
        <br>3. <strong>TCP Reno:</strong> Sets $ssthresh = 26 / 2 = 13\\text{ MSS}$. Sets $cwnd = 13\\text{ MSS}$ and continues linear growth.
        <br>4. <strong>TCP Tahoe (Legacy):</strong> Would have dropped $cwnd$ all the way down to $1\\text{ MSS}$! Reno is far faster.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Phase</th><th>Growth Rate</th><th>Trigger to Exit</th></tr></thead>
          <tbody>
            <tr><td>Slow Start</td><td>Exponential ($2^n$ per RTT)</td><td>$cwnd \\ge ssthresh$ or packet loss</td></tr>
            <tr><td>Congestion Avoidance</td><td>Linear ($+1\\text{ MSS}$ per RTT)</td><td>Packet loss (3 Dup ACKs or Timeout)</td></tr>
            <tr><td>Fast Recovery</td><td>Linear continuation</td><td>Arrival of new non-duplicate ACK</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["TCP Reno (RFC 5681)", "TCP Cubic (default algorithm in Linux)", "Google BBR (Bottleneck Bandwidth and RTT)"],
      commonMistakes: "Believing 'Slow Start' is slow. Slow start is actually exponential growth ($1, 2, 4, 8, 16\\dots$), making it the fastest growth phase in TCP!",
      compareWith: { title: "TCP Tahoe vs TCP Reno", note: "On 3 duplicate ACKs, Tahoe drops cwnd to 1 MSS (slow start). Reno cuts cwnd in half and enters Fast Recovery, maintaining high throughput." },
      practice: {
        question: "In TCP Reno, when a packet loss is detected via 3 duplicate ACKs with cwnd = 32 MSS, what is the new ssthresh value?",
        choices: ["1 MSS", "16 MSS", "32 MSS", "8 MSS"],
        correctIndex: 1,
        explanation: "Upon loss, TCP cuts the window in half: $ssthresh = cwnd / 2 = 32 / 2 = 16\\text{ MSS}$."
      },
      references: [
        { cite: "RFC 5681: TCP Congestion Control", url: "https://datatracker.ietf.org/doc/html/rfc5681" },
        { cite: "Jacobson, V. (1988). Congestion avoidance and control. ACM SIGCOMM.", url: "https://dl.acm.org/doi/10.1145/52324.52356" }
      ]
    },
    prevTopicId: "tcp-flow-control",
    nextTopicId: "application-layer"
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = TOPICS_U4;
}
