// First-Class Comparison Page System
// Implements detailed side-by-side technical comparisons as specified in the Content Blueprint

const COMPARISONS_DATA = {
  "tcp-vs-udp": {
    id: "tcp-vs-udp",
    title: "TCP versus UDP: Transport Layer Trade-offs",
    subtitle: "Reliable Byte-Stream vs Lightweight Connectionless Datagrams",
    shortAnswer: "TCP guarantees reliable, ordered byte delivery with flow and congestion control at the cost of setup latency and header overhead. UDP provides fast, connectionless, lightweight datagram delivery with zero setup latency and minimal 8-byte overhead, leaving reliability to the application.",
    tableHeaders: ["Dimension", "Transmission Control Protocol (TCP)", "User Datagram Protocol (UDP)"],
    tableRows: [
      ["Connection Setup", "Connection-oriented (requires 3-way handshake before payload)", "Connectionless (transmits immediately without handshake)"],
      ["Reliability", "Guaranteed: acknowledgements (ACK), timeouts, retransmissions", "Best-effort: unacknowledged; packets may be lost or delayed"],
      ["Ordering", "Strict in-order byte delivery; out-of-order segments buffered", "No ordering guarantee; independent datagrams arrive in any order"],
      ["Flow Control", "Yes: dynamic receive window (rwnd) prevents receiver buffer overflow", "No flow control: packets dropped if receiver buffer fills"],
      ["Congestion Control", "Yes: AIMD, Slow Start, Congestion Avoidance protects network", "No congestion control: sends at rate application generates"],
      ["Header Size", "Variable 20 to 60 bytes (Options: MSS, SACK, Timestamps)", "Small fixed 8 bytes (64 bits)"],
      ["Data Boundary", "Byte-stream (application reads arbitrary byte slices)", "Message-oriented (preserves discrete datagram boundaries)"],
      ["Typical Uses", "Web (HTTP/HTTPS), Email (SMTP/IMAP), File Transfer (FTP), SSH", "DNS queries, Live streaming, Online gaming, VoIP, DHCP, SNMP"]
    ],
    visualDiff: `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin: 1.5rem 0;">
        <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 12px; padding: 1.25rem;">
          <h5 style="color: #15803d; font-weight: 800; margin-bottom: 0.5rem;">TCP: State & Heavy Control</h5>
          <div style="font-family: var(--font-mono); font-size: 0.85rem; color: #1e293b; line-height: 1.8;">
            Client ──── [SYN] ────► Server<br>
            Client ◄── [SYN+ACK] ── Server<br>
            Client ──── [ACK] ────► Server<br>
            Client ── [Byte 1..500] ──► Server<br>
            Client ◄── [ACK 501] ─── Server<br>
            <span style="color: #15803d; font-weight: 700;">✓ In-Order, Verified, Loss-Recovered</span>
          </div>
        </div>
        <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 1.25rem;">
          <h5 style="color: #1d4ed8; font-weight: 800; margin-bottom: 0.5rem;">UDP: Zero State & Instant Send</h5>
          <div style="font-family: var(--font-mono); font-size: 0.85rem; color: #1e293b; line-height: 1.8;">
            Client ── [Datagram 1] ──► Server<br>
            Client ── [Datagram 2] ──► Server (Lost!)<br>
            Client ── [Datagram 3] ──► Server<br>
            <span style="color: #64748b;">(No ACKs, No Retransmits, No Stalling)</span><br>
            <span style="color: #1d4ed8; font-weight: 700;">✓ Instantaneous Line-Rate Delivery</span>
          </div>
        </div>
      </div>
    `,
    whenToUse: [
      { protocol: "Choose TCP when:", points: ["Data completeness is mandatory (web documents, database transactions, money transfers, files).", "Lost bytes cause catastrophic software failures.", "Application needs automated flow and congestion control."] },
      { protocol: "Choose UDP when:", points: ["Real-time latency is more critical than 100% arrival (live voice VoIP, multiplayer player coordinates).", "A transaction fits into a single request-response exchange (DNS lookups, DHCP requests).", "Application implements custom congestion/reliability logic (QUIC / HTTP/3)."] }
    ],
    commonConfusion: "Common Mistake: Believing UDP is 'worse' than TCP. In fact, video games and live streaming intentionally avoid TCP because TCP's retransmission buffer stalls the entire audio/video playback (Head-of-Line blocking), whereas dropping 1 frame in UDP is imperceptible!",
    relatedTopics: ["tcp", "udp", "tcp-flow-control", "tcp-congestion-control", "tcp-handshake"]
  },

  "go-back-n-vs-selective-repeat": {
    id: "go-back-n-vs-selective-repeat",
    title: "Go-Back-N vs Selective Repeat: Sliding Window ARQ",
    subtitle: "Cumulative Acknowledgement vs Out-of-Order Receiver Buffering",
    shortAnswer: "Go-Back-N uses cumulative ACKs and keeps a receiver window of size 1, discarding out-of-order packets and forcing retransmission of all packets in the window upon timeout. Selective Repeat maintains a receiver window of size N, buffers out-of-order arrivals, and retransmits ONLY the specific packet that timed out.",
    tableHeaders: ["Feature", "Go-Back-N (GBN)", "Selective Repeat (SR)"],
    tableRows: [
      ["Sender Window Size (Ws)", "Up to N packets (requires sequence numbers ≥ N + 1)", "Up to N packets (requires sequence numbers ≥ 2N)"],
      ["Receiver Window Size (Wr)", "1 (Single packet: rejects any out-of-order segment)", "N (Equal to sender window: buffers out-of-order gaps)"],
      ["ACK Type", "Cumulative ACK: ACK(n) confirms all packets ≤ n", "Individual/Selective ACK: ACK(n) confirms packet n only"],
      ["Timer Architecture", "Single timer for oldest unacknowledged packet", "Individual logical timer per unacknowledged packet"],
      ["Retransmission Scope", "Retransmits all packets in window from lost packet onwards", "Retransmits strictly the single expired packet"],
      ["Receiver Buffering", "Zero buffer: out-of-order packets immediately dropped", "Requires memory buffer to store and reassemble gap segments"],
      ["Implementation Complexity", "Low: very simple receiver hardware", "High: per-packet timer management, window sliding logic"],
      ["Lossy Link Performance", "Poor: high duplicate retransmission overhead on noisy channels", "High: optimal bandwidth utilization; minimal retransmissions"]
    ],
    visualDiff: `
      <div style="background: #f8fafc; border: 1px solid var(--border-light); border-radius: 12px; padding: 1.25rem; font-family: var(--font-mono); font-size: 0.88rem; line-height: 1.8;">
        <strong>Scenario: Packets 1, 2, 3, 4 sent. Packet 2 is lost! Packets 3 & 4 arrive safely.</strong><br><br>
        <span style="color: #ef4444; font-weight: 700;">[GBN Reaction]:</span><br>
        Receiver drops Packet 3! Drops Packet 4! Re-ACKs Packet 1.<br>
        Sender Timeout on 2 ──► <strong style="color: #ef4444;">Retransmits 2, 3, AND 4!</strong> (Wastes bandwidth).<br><br>
        <span style="color: #15803d; font-weight: 700;">[Selective Repeat Reaction]:</span><br>
        Receiver stores Packet 3 in buffer! Stores Packet 4 in buffer! Sends ACK 3, ACK 4.<br>
        Sender Timeout on 2 ──► <strong style="color: #15803d;">Retransmits ONLY Packet 2!</strong> Receiver then delivers 1, 2, 3, 4 in order.
      </div>
    `,
    whenToUse: [
      { protocol: "Choose Go-Back-N when:", points: ["Receiver memory is severely restricted (simple microcontrollers, IoT chips).", "The underlying link has near-zero packet loss (loss is rare, so retransmission penalty is low)."] },
      { protocol: "Choose Selective Repeat when:", points: ["Bandwidth is expensive or links are noisy (satellite communication, trans-oceanic cables).", "High bandwidth-delay products where retransmitting entire windows causes massive congestion."] }
    ],
    commonConfusion: "Common Mistake: Setting window sizes too large. In Selective Repeat with k-bit sequence numbers, the sender and receiver window must satisfy Ws + Wr ≤ 2^k (i.e. N ≤ 2^(k-1)), otherwise the receiver cannot distinguish between a fresh packet and an old duplicate retransmission!",
    relatedTopics: ["sliding-window", "gbn", "selective-repeat", "stop-and-wait", "tcp-flow-control"]
  },

  "link-state-vs-distance-vector": {
    id: "link-state-vs-distance-vector",
    title: "Link-State vs Distance-Vector: Routing Algorithms",
    subtitle: "Global Graph Flooding (Dijkstra) vs Local Neighbor Exchange (Bellman-Ford)",
    shortAnswer: "Link-State protocols (OSPF) flood link states so every router builds the full global topology graph and independently runs Dijkstra's algorithm. Distance-Vector protocols (RIP, BGP) share routing tables solely with physical neighbors using the Bellman-Ford equation.",
    tableHeaders: ["Evaluation Metric", "Link-State Routing (LS / OSPF)", "Distance-Vector Routing (DV / RIP)"],
    tableRows: [
      ["Network Knowledge", "Global: Every router possesses the entire network map G=(V,E)", "Decentralized: Routers know only direct neighbor costs and neighbor vectors"],
      ["Algorithm Used", "Dijkstra's Shortest Path Algorithm (SPF)", "Bellman-Ford Equation: d_x(y) = min_v { c(x,v) + d_v(y) }"],
      ["Message Exchange", "Link-State Packets (LSP) flooded network-wide via broadcast", "Distance vector routing tables exchanged only with direct neighbors"],
      ["Convergence Speed", "Fast: Computes paths locally in O(N^2); no routing loops", "Slow: Varies; can produce routing loops and count-to-infinity"],
      ["Message Complexity", "O(|N| · |E|) messages flooded across the entire Autonomous System", "Solely between direct physical neighbors (low volume)"],
      ["Robustness to Failure", "High: Erroneous node can falsely advertise only its own direct links", "Low: Erroneous node can broadcast false shortest paths for ANY destination, poisoning the network!"],
      ["Loop Prevention", "Global graph guarantees tree structure without loops", "Requires split horizon and poisoned reverse (Dz(X) = ∞)"],
      ["Standard Example", "OSPF (Open Shortest Path First), IS-IS", "RIP, IGRP, BGP (Path Vector variant)"]
    ],
    visualDiff: `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin: 1.5rem 0;">
        <div style="background: #faf5ff; border: 1px solid #d8b4fe; border-radius: 12px; padding: 1.25rem;">
          <h5 style="color: #6b21a8; font-weight: 800; margin-bottom: 0.5rem;">Link-State: 'I know the whole world'</h5>
          <p style="font-size: 0.88rem; color: #334155;">Router floods: <em>'Here are my neighbors and link costs'</em>. Every node constructs the exact same graph and calculates least-cost paths independently.</p>
        </div>
        <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 12px; padding: 1.25rem;">
          <h5 style="color: #92400e; font-weight: 800; margin-bottom: 0.5rem;">Distance-Vector: 'Tell your neighbor'</h5>
          <p style="font-size: 0.88rem; color: #334155;">Router whispers: <em>'Here is my current distance to all destinations'</em>. Neighbors update their tables incrementally through rumor-passing.</p>
        </div>
      </div>
    `,
    whenToUse: [
      { protocol: "Choose Link-State (OSPF) when:", points: ["Designing enterprise networks and corporate campus backbones.", "Fast convergence and multi-area hierarchical scaling are required."] },
      { protocol: "Choose Distance-Vector (BGP) when:", points: ["Connecting independent administrative domains (Autonomous Systems) where global topology cannot be shared for security and policy reasons."] }
    ],
    commonConfusion: "Common Mistake: Assuming BGP is Link-State because it connects the global Internet. BGP is actually a Path-Vector protocol (a variant of Distance-Vector) because autonomous systems cannot disclose their internal network topology to competitors!",
    relatedTopics: ["dijkstra", "distance-vector", "ospf", "bgp", "routing"]
  },

  "ipv4-vs-ipv6": {
    id: "ipv4-vs-ipv6",
    title: "IPv4 versus IPv6: Network Layer Protocol Evolution",
    subtitle: "RFC 791 (32-Bit Variable) vs RFC 8200 (128-Bit Fixed 40-Byte)",
    shortAnswer: "IPv4 uses 32-bit addresses (~4.3 billion) with a variable 20-60 byte header, router fragmentation, and recomputed header checksums. IPv6 uses 128-bit addresses, a streamlined fixed 40-byte header, source-only fragmentation, dedicated flow labels, and eliminates header checksums entirely for line-rate routing.",
    tableHeaders: ["Specification", "IPv4 (RFC 791)", "IPv6 (RFC 8200)"],
    tableRows: [
      ["Address Size", "32 bits (4 bytes) ~ 4.3 × 10^9 addresses", "128 bits (16 bytes) ~ 3.4 × 10^38 addresses"],
      ["Address Notation", "Dotted-decimal: 192.168.1.1", "Hexadecimal with colons: 2001:0db8:85a3::8a2e:0370:7334"],
      ["Base Header Size", "Variable 20 to 60 bytes (Options field creates variable length)", "Fixed exactly 40 bytes (options moved to daisy-chained Extension Headers)"],
      ["Header Checksum", "Yes: must be recomputed at every router hop due to TTL decrement", "None: completely removed to accelerate router forwarding"],
      ["Fragmentation", "Performed by both source host and intermediate routers", "Performed strictly by source host (via Path MTU Discovery)"],
      ["QoS & Flow Support", "Type of Service (TOS) / DSCP (8 bits)", "Dedicated 20-bit Flow Label field + Traffic Class (8 bits)"],
      ["Address Resolution", "Broadcast ARP (Address Resolution Protocol)", "Multicast NDP (Neighbor Discovery Protocol) over ICMPv6"],
      ["Configuration", "Manual or DHCP", "SLAAC (Stateless Address Autoconfiguration) or DHCPv6"],
      ["NAT Dependency", "Heavy (RFC 1918 private addressing necessary to preserve IPs)", "Not required (every device gets globally routable public address)"]
    ],
    visualDiff: `
      <div style="background: #ffffff; border: 1px solid var(--border-light); border-radius: 12px; padding: 1.25rem; font-family: var(--font-mono); font-size: 0.85rem;">
        <div style="margin-bottom: 0.5rem; color: #0284c7; font-weight: 700;">IPv4 Header (20 Bytes minimum):</div>
        <code>[Ver|IHL|TOS|Length][ID|Flags|FragOffset][TTL|Protocol|Checksum][Source IP (32)][Dest IP (32)][Options...]</code>
        <div style="margin-top: 1rem; margin-bottom: 0.5rem; color: #15803d; font-weight: 700;">IPv6 Header (40 Bytes fixed):</div>
        <code>[Ver|TrafficClass|FlowLabel(20)][PayloadLength|NextHeader|HopLimit][Source IP (128)][Dest IP (128)]</code>
      </div>
    `,
    whenToUse: [
      { protocol: "IPv4 is still used because:", points: ["Massive legacy infrastructure, router firmware, and internal enterprise software.", "Carrier-Grade NAT (CGNAT) successfully stretches existing IPv4 allocations."] },
      { protocol: "IPv6 is required for:", points: ["5G telecommunication networks, IoT sensor deployments, and modern cloud hyper-scalers requiring trillions of unique endpoints without NAT complexity."] }
    ],
    commonConfusion: "Common Mistake: Thinking IPv6 packets are larger than IPv4. While the IPv6 header is 40 bytes (vs IPv4's 20 bytes), the elimination of the checksum, fixed field offsets, and absence of router fragmentation allow routers to forward IPv6 packets significantly faster in silicon!",
    relatedTopics: ["ipv4", "ipv6", "nat", "forwarding", "router"]
  },

  "http-vs-https": {
    id: "http-vs-https",
    title: "HTTP versus HTTPS: Securing Application Protocols",
    subtitle: "Plaintext Web vs HTTP Encapsulated Over Transport Layer Security (TLS)",
    shortAnswer: "HTTPS is not a separate application protocol; it is standard HTTP traffic encapsulated directly over a cryptographically secured TLS session on port 443, providing end-to-end encryption, digital certificate server authentication, and tamper-proof message integrity.",
    tableHeaders: ["Security Dimension", "HTTP (RFC 7230)", "HTTPS (HTTP over TLS / RFC 8446)"],
    tableRows: [
      ["Protocol Layering", "Application layer directly over TCP transport", "HTTP layered over Transport Layer Security (TLS) over TCP"],
      ["Default Well-Known Port", "Port 80", "Port 443"],
      ["Confidentiality", "None: headers, cookies, passwords sent in cleartext", "Full end-to-end encryption (AES-256-GCM / ChaCha20)"],
      ["Authentication", "None: vulnerable to DNS spoofing and phishing sites", "X.509 digital certificates verify genuine server identity"],
      ["Message Integrity", "None: intermediate proxies can modify content", "Tamper-proof: AEAD message authentication codes detect alteration"],
      ["Initial Connection Delay", "1 RTT (TCP 3-Way Handshake only)", "2 RTTs (TCP Handshake + TLS 1.3 Handshake; 0-RTT on resumption)"],
      ["SEO & Browser Trust", "Marked 'Not Secure' by Google Chrome & modern browsers", "Standard trusted green padlock; prioritized by search engines"]
    ],
    visualDiff: `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin: 1.5rem 0;">
        <div style="background: #fff1f2; border: 1px solid #fecdd3; border-radius: 12px; padding: 1.25rem;">
          <h5 style="color: #be123c; font-weight: 800; margin-bottom: 0.5rem;">HTTP (Port 80)</h5>
          <div style="font-family: var(--font-mono); font-size: 0.85rem; color: #1e293b;">
            [HTTP GET /login.html]<br>
            [Cookie: user=alex; pass=secret123]<br>
            <span style="color: #be123c; font-weight: 700;">⚠️ Completely visible to anyone sniffing the Wi-Fi!</span>
          </div>
        </div>
        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 1.25rem;">
          <h5 style="color: #15803d; font-weight: 800; margin-bottom: 0.5rem;">HTTPS (Port 443)</h5>
          <div style="font-family: var(--font-mono); font-size: 0.85rem; color: #1e293b;">
            [TLS Encrypted Record: 0x9f8b2c4d...]<br>
            [AES-GCM Authenticated Ciphertext]<br>
            <span style="color: #15803d; font-weight: 700;">🔒 Indecipherable ciphertext to eavesdroppers!</span>
          </div>
        </div>
      </div>
    `,
    whenToUse: [
      { protocol: "Always Use HTTPS for:", points: ["All modern production web websites, APIs, authentication endpoints, and payment forms.", "Google penalizes non-HTTPS websites in search rankings, and browsers block geolocation/camera APIs on plain HTTP."] }
    ],
    commonConfusion: "Common Mistake: Thinking HTTPS encrypts the Destination IP address. The TLS handshake occurs at layer 4/5. The network layer IP headers and TCP port numbers remain unencrypted so routers can deliver packets across the Internet!",
    relatedTopics: ["http", "https", "tls", "rsa", "dns"]
  },

  "smtp-vs-pop3-vs-imap": {
    id: "smtp-vs-pop3-vs-imap",
    title: "SMTP vs POP3 vs IMAP: Email Protocol Architecture",
    subtitle: "Mail Transmission (Push) vs Mailbox Access (Pull & Synchronize)",
    shortAnswer: "SMTP is a push protocol used by clients to send mail and by mail servers to relay messages on port 25/587. POP3 and IMAP are pull protocols for message retrieval. POP3 downloads messages to one local client, whereas IMAP keeps messages synchronized on the mail server across multiple devices.",
    tableHeaders: ["Dimension", "SMTP (RFC 5321)", "POP3 (RFC 1939)", "IMAP (RFC 3501)"],
    tableRows: [
      ["Operational Role", "Sends and relays outgoing emails", "Retrieves mail to local client", "Accesses and synchronizes mail on server"],
      ["Direction of Flow", "Push protocol (Sender → Mail Server)", "Pull protocol (Server → Local Client)", "Pull & Synchronize (Bi-directional sync)"],
      ["Standard Ports", "Port 25 (server-to-server), Port 587 (STARTTLS submission)", "Port 110 (Plain), Port 995 (POP3S encrypted)", "Port 143 (Plain), Port 993 (IMAPS encrypted)"],
      ["Message Storage", "Transitory storage in queue until delivered to recipient MTA", "Messages downloaded to client and typically deleted from server", "Messages permanently stored in server mailbox folders"],
      ["Multi-Device Sync", "N/A (Transfer only)", "No: read states and folders do not sync across phone/PC", "Yes: full real-time folder, read, flagged, and draft synchronization"],
      ["Server-Side Search", "No", "No: messages must be downloaded first", "Yes: search headers or bodies directly on the server"]
    ],
    visualDiff: `
      <div style="background: #f8fafc; border: 1px solid var(--border-light); border-radius: 12px; padding: 1.25rem; font-family: var(--font-mono); font-size: 0.85rem; line-height: 1.8;">
        Sender UA ──── (SMTP: Push) ────► Sender Mail Server (MTA)<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼ (SMTP: Relay on Port 25)<br>
        Recipient Mail Server (Mailbox) ◄────────────────┘<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├────── (IMAP: Multi-Device Sync) ──────► Recipient Smartphone 📱<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└────── (IMAP: Multi-Device Sync) ──────► Recipient Laptop 💻
      </div>
    `,
    whenToUse: [
      { protocol: "Use SMTP when:", points: ["Sending any email out of an application or client."] },
      { protocol: "Use IMAP when:", points: ["Users access mail from both phone and laptop and need consistent folder states."] },
      { protocol: "Use POP3 only when:", points: ["Server mailbox storage is severely quota-constrained and mail must be archived locally."] }
    ],
    commonConfusion: "Common Mistake: Thinking SMTP can be used to read inbox emails. SMTP has no commands to fetch or query an inbox. An application must use IMAP or POP3 to pull incoming mail!",
    relatedTopics: ["email-system", "smtp", "pop3", "imap", "dns-records"]
  },

  "firewall-vs-ids-vs-ips": {
    id: "firewall-vs-ids-vs-ips",
    title: "Firewalls vs IDS vs IPS: Network Perimeter Defense",
    subtitle: "NIST SP 800-41 & SP 800-94 Architectural Comparison",
    shortAnswer: "Firewalls enforce access control policies by permitting or denying traffic based on IP/port rules and connection states. An Intrusion Detection System (IDS) is passive and alerts on suspicious traffic out-of-band. An Intrusion Prevention System (IPS) sits inline directly in the physical traffic path and actively blocks or drops malicious packets in real time.",
    tableHeaders: ["Security Appliance", "Network Placement", "Primary Detection Mechanism", "Operational Action Taken"],
    tableRows: [
      ["Packet Filter Firewall", "Perimeter router / L3-L4", "Stateless ACL rules matching IP, port, protocol", "Permit or Deny packets"],
      ["Stateful Inspection Firewall", "Network edge gateway", "Tracks dynamic TCP connection state machine (SYN, ESTABLISHED)", "Blocks unsolicited inbound packets lacking outbound state"],
      ["Intrusion Detection System (IDS)", "Passive / Out-of-band (SPAN / Mirror Port)", "Signature matching (known exploits) + Anomaly heuristics", "Detects and Reports: logs alerts and notifies admins without stopping packets"],
      ["Intrusion Prevention System (IPS)", "Active / Inline in live physical traffic path", "Real-time Deep Packet Inspection (DPI) & behavior analysis", "Prevents and Blocks: drops malicious packets and resets TCP connections (TCP RST)"]
    ],
    visualDiff: `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin: 1.5rem 0;">
        <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 12px; padding: 1.25rem;">
          <h5 style="color: #b45309; font-weight: 800; margin-bottom: 0.5rem;">Passive IDS (Out-of-Band)</h5>
          <p style="font-size: 0.88rem; color: #334155;">Switch sends mirrored copy of traffic to IDS sensor. If attack detected, IDS writes to log file. <em>Packets still reach the target server!</em></p>
        </div>
        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 1.25rem;">
          <h5 style="color: #15803d; font-weight: 800; margin-bottom: 0.5rem;">Active Inline IPS (In-Band)</h5>
          <p style="font-size: 0.88rem; color: #334155;">All traffic physically flows through the IPS sensor. If exploit detected, IPS drops the packet immediately. <em>Server never receives the attack!</em></p>
        </div>
      </div>
    `,
    whenToUse: [
      { protocol: "Deploy a Firewall at:", points: ["Every network perimeter to establish initial boundaries between trust zones."] },
      { protocol: "Deploy an IDS when:", points: ["Monitoring sensitive research or enterprise networks where inline processing latency or false-positive drops cannot be tolerated."] },
      { protocol: "Deploy an IPS when:", points: ["Actively shielding vulnerable web applications and mission-critical production servers against zero-day exploits."] }
    ],
    commonConfusion: "Common Mistake: Thinking a firewall replaces an IDS/IPS. A firewall checks whether port 80/443 is open, but blindly lets through an SQL injection attack embedded inside an HTTP request! An IPS is required to inspect deep payload contents and block the SQL exploit!",
    relatedTopics: ["firewall", "ids", "ips", "https", "tls", "rsa"]
  },

  "pure-aloha-vs-slotted-aloha": {
    id: "pure-aloha-vs-slotted-aloha",
    title: "Pure ALOHA vs Slotted ALOHA",
    subtitle: "Unsynchronized Continuous Transmission vs Slot-Synchronized Contention",
    shortAnswer: "Pure ALOHA allows stations to transmit whenever data is ready, resulting in a vulnerable period of 2 frame times and a maximum throughput of 18.4% (S = G e^(-2G) at G = 0.5). Slotted ALOHA restricts transmissions to synchronized slot boundaries, halving the vulnerable period to 1 frame time and doubling maximum throughput to 36.8% (S = G e^(-G) at G = 1.0).",
    tableHeaders: ["Dimension", "Pure ALOHA (Norman Abramson, 1970)", "Slotted ALOHA (Larry Roberts, 1972)"],
    tableRows: [
      ["Transmission Time", "Any arbitrary continuous time instant", "Only at the beginning of synchronized discrete time slots"],
      ["Vulnerable Period", "2 × T_fr (from t0 - T_fr to t0 + T_fr)", "1 × T_fr (only within the current slot boundary)"],
      ["Throughput Equation", "S = G · e^(-2G)", "S = G · e^(-G)"],
      ["Maximum Throughput", "18.4% (1 / 2e) achieved when G = 0.5", "36.8% (1 / e) achieved when G = 1.0"],
      ["Collision Probability", "High (any overlapping bit destroys both frames)", "Moderate (collisions occur only when 2+ stations choose the same slot)"],
      ["Clock Synchronization", "None required (completely asynchronous)", "Strict global clock or master beacon synchronization required"],
      ["Channel Utilization", "Very low under heavy loads", "Double the capacity of Pure ALOHA"],
      ["Primary References", "Tanenbaum 6th Ed. Ch. 4.2.1 / Forouzan 6th Ed. Ch. 12.1", "Tanenbaum 6th Ed. Ch. 4.2.2 / Forouzan 6th Ed. Ch. 12.1"]
    ],
    visualDiff: `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin: 1.5rem 0;">
        <div style="background: #fff7ed; border: 1px solid #fed7aa; border-radius: 12px; padding: 1.25rem;">
          <h5 style="color: #c2410c; font-weight: 800; margin-bottom: 0.5rem;">Pure ALOHA: Vulnerable Time = 2T</h5>
          <div style="font-family: var(--font-mono); font-size: 0.85rem; color: #1e293b; line-height: 1.8;">
            Station A: ──[ FRAME ]──►<br>
            Station B: ─────[ COLLISION ]──►<br>
            <span style="color: #c2410c; font-weight: 700;">✗ Any partial overlap destroys BOTH frames</span><br>
            <span style="color: #64748b;">Max Throughput: 18.4% at G = 0.5</span>
          </div>
        </div>
        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 1.25rem;">
          <h5 style="color: #15803d; font-weight: 800; margin-bottom: 0.5rem;">Slotted ALOHA: Vulnerable Time = 1T</h5>
          <div style="font-family: var(--font-mono); font-size: 0.85rem; color: #1e293b; line-height: 1.8;">
            Slot 1: |──[FRAME A]──| (Clean Success!)<br>
            Slot 2: |──[FRAME B+C]──| (Collision in slot)<br>
            <span style="color: #15803d; font-weight: 700;">✓ Frames align with slot boundaries</span><br>
            <span style="color: #64748b;">Max Throughput: 36.8% at G = 1.0</span>
          </div>
        </div>
      </div>
    `,
    whenToUse: [
      { protocol: "Choose Pure ALOHA when:", points: ["System simplicity and zero clock synchronization are paramount.", "Traffic is extremely sporadic and low volume (e.g. low-power environmental sensor beacons)."] },
      { protocol: "Choose Slotted ALOHA when:", points: ["Higher throughput is needed and global synchronization can be distributed cheaply (e.g. cellular LTE/5G RACH initial attachment channels)."] }
    ],
    commonConfusion: "Common Mistake: Thinking Slotted ALOHA completely prevents collisions. Slotted ALOHA only prevents PARTIAL collisions; full collisions still occur whenever two stations decide to transmit during the very same slot!",
    relatedTopics: ["aloha", "channel-allocation", "csma-protocols", "ethernet"]
  },

  "hub-vs-bridge-vs-switch-vs-router": {
    id: "hub-vs-bridge-vs-switch-vs-router",
    title: "Hub vs Bridge vs Switch vs Router vs Gateway",
    subtitle: "Complete Multi-Layer Network Connecting Devices Comparison",
    shortAnswer: "Hubs (L1) repeat bits blindly and share a single collision domain. Bridges (L2) filter traffic between LAN segments using MAC addresses. Switches (L2) are multiport bridges providing dedicated collision domains per port. Routers (L3) forward packets based on IP addresses and separate both collision and broadcast domains. Gateways (L4-7) translate between incompatible protocol suites.",
    tableHeaders: ["Dimension", "Hub", "Bridge", "Switch", "Router"],
    tableRows: [
      ["OSI Layer", "Layer 1 (Physical)", "Layer 2 (Data Link)", "Layer 2 (Data Link)", "Layer 3 (Network)"],
      ["Addresses Used", "None (electrical bits only)", "48-bit MAC addresses", "48-bit MAC addresses", "32-bit / 128-bit IP addresses"],
      ["Collision Domains", "Single shared domain across all ports", "Separates into 2 collision domains", "Dedicated collision domain per port", "Separates collision domains per port"],
      ["Broadcast Domains", "Single broadcast domain", "Single broadcast domain", "Single broadcast domain (unless VLANs)", "Separates broadcast domains per subnet"],
      ["Forwarding Logic", "Blind broadcast to all other ports", "Software MAC table lookup & filtering", "Hardware ASIC wire-speed CAM table lookup", "Routing table longest prefix match lookup"],
      ["Transmission Mode", "Half-duplex only (collisions occur)", "Half / Full duplex", "Full-duplex (simultaneous Tx and Rx, 0 collisions)", "Full-duplex point-to-point or switched"],
      ["Intelligence Level", "Dumb signal repeater", "Moderate (software learning)", "High (hardware CAM table, microsegmentation)", "Very high (routing protocols, ACLs, NAT, QoS)"],
      ["Primary References", "Tanenbaum 6th Ed. Ch. 4.7 / Forouzan 6th Ed. Ch. 13", "Tanenbaum 6th Ed. Ch. 4.7 / Forouzan 6th Ed. Ch. 13", "Tanenbaum 6th Ed. Ch. 4.7 / Forouzan 6th Ed. Ch. 13", "Tanenbaum 6th Ed. Ch. 4.7 / Forouzan 6th Ed. Ch. 13"]
    ],
    visualDiff: `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin: 1.5rem 0;">
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 1.25rem;">
          <h5 style="color: #475569; font-weight: 800; margin-bottom: 0.5rem;">Switch (Layer 2)</h5>
          <div style="font-size: 0.88rem; color: #334155;">
            • Separates Collision Domains (1 per port)<br>
            • Keeps single Broadcast Domain<br>
            • Forwards frames based on MAC address<br>
            • Ultra-low microsecond latency via ASICs
          </div>
        </div>
        <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 1.25rem;">
          <h5 style="color: #1d4ed8; font-weight: 800; margin-bottom: 0.5rem;">Router (Layer 3)</h5>
          <div style="font-size: 0.88rem; color: #334155;">
            • Separates Collision Domains AND Broadcast Domains<br>
            • Forwards packets based on IP addresses<br>
            • Connects different subnets and WANs<br>
            • Implements firewall ACLs and NAT
          </div>
        </div>
      </div>
    `,
    whenToUse: [
      { protocol: "Deploy a Switch when:", points: ["Connecting local devices (PCs, servers, printers) within the same office or department subnet with maximum wire-speed performance."] },
      { protocol: "Deploy a Router when:", points: ["Interconnecting different IP subnets, connecting a LAN to an ISP/WAN, or enforcing network security boundaries."] },
      { protocol: "Deploy a Gateway when:", points: ["Translating between incompatible communication protocol architectures (e.g. VoIP SIP phone system to traditional PSTN telephone network)."] }
    ],
    commonConfusion: "Common Mistake: Thinking a switch and a router perform the same function. A switch forwards frames locally within one network using hardware MAC addresses. A router routes packets across different networks using software/hardware IP routing tables. In real-world enterprise architectures, you need both!",
    relatedTopics: ["network-devices", "dll-switching", "ethernet", "vlan", "mac-address"]
  },

  "circuit-switching-vs-packet-switching": {
    id: "circuit-switching-vs-packet-switching",
    title: "Circuit Switching vs Packet Switching",
    subtitle: "Dedicated Physical Paths vs Statistical Multiplexing of Independent Datagrams",
    shortAnswer: "Circuit switching reserves a dedicated end-to-end communication channel with guaranteed bandwidth before transmission begins, incurring call-setup delay but zero queuing latency. Packet switching divides data into discrete packets that share communication links dynamically via statistical multiplexing, maximizing link utilization but introducing variable queuing delay and packet loss.",
    tableHeaders: ["Dimension", "Circuit Switching (Telephony / PSTN)", "Packet Switching (Internet / IP)"],
    tableRows: [
      ["Dedicated Path", "Yes: dedicated physical circuit reserved end-to-end for call duration", "No: transmission links dynamically shared by multiple traffic streams"],
      ["Setup Phase", "Mandatory call setup handshake required before data transfer", "Connectionless: data packets transmitted immediately with destination IP"],
      ["Resource Allocation", "Fixed pre-allocated bandwidth (TDM/FDM); idle slots completely wasted", "Dynamic statistical multiplexing; bandwidth consumed only when data exists"],
      ["Delay Characteristics", "Fixed propagation and transmission delay; zero queuing delay after setup", "Variable delay: transmission, propagation, processing, and queuing delay"],
      ["Congestion Behavior", "Blocked calls: new calls rejected if circuits full, existing calls unaffected", "Packet delay and buffer drops: traffic throttled or packets discarded"],
      ["Routing & Addressing", "Path established at setup; individual data units carry no routing headers", "Store-and-forward: each packet carries destination IP header inspected by routers"],
      ["Fault Tolerance", "Vulnerable: failure of any intermediate link or switch drops the entire call", "Highly robust: packets dynamically rerouted around failed links or routers"],
      ["Best Suited For", "Traditional analog voice telephony, dedicated leased lines, real-time audio", "Modern Internet traffic, web browsing, video streaming, file transfers"]
    ],
    visualDiff: `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin: 1.5rem 0;">
        <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 12px; padding: 1.25rem;">
          <h5 style="color: #b91c1c; font-weight: 800; margin-bottom: 0.5rem;">Circuit Switching: Dedicated Reservation</h5>
          <div style="font-family: var(--font-mono); font-size: 0.85rem; color: #1e293b; line-height: 1.8;">
            Host A ──[Setup Request]──► Switch 1 ──► Switch 2 ──► Host B<br>
            Host A ◄──[Circuit Confirmed]── Switch 1 ◄── Switch 2 ◄── Host B<br>
            <span style="color: #b91c1c; font-weight: 700;">[════ Dedicated Fixed Bitstream Channel ════]</span><br>
            Host A ──[Teardown Release]──► All Switches<br>
            <span style="color: #64748b;">• Guaranteed QoS, but idle silence wastes 100% of reserved bandwidth</span>
          </div>
        </div>
        <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 12px; padding: 1.25rem;">
          <h5 style="color: #15803d; font-weight: 800; margin-bottom: 0.5rem;">Packet Switching: Statistical Multiplexing</h5>
          <div style="font-family: var(--font-mono); font-size: 0.85rem; color: #1e293b; line-height: 1.8;">
            Host A ── [Pkt 1: 1500B] ──► Router 1 [Store & Forward] ──► Host B<br>
            Host C ── [Pkt A: 800B]  ──► Router 1 [Queued in Buffer] ──► Host D<br>
            Host A ── [Pkt 2: 1500B] ──► Router 1 ──► Router 2 ──► Host B<br>
            <span style="color: #15803d; font-weight: 700;">✓ 3x to 5x more concurrent users supported on same physical link</span><br>
            <span style="color: #64748b;">• Link utilized to 100% capacity; bursts handled by router packet queues</span>
          </div>
        </div>
      </div>
    `,
    whenToUse: [
      { protocol: "Choose Circuit Switching when:", points: ["Guaranteed constant bit-rate (CBR) and zero jitter are legally or technically required.", "Legacy telecommunications and dedicated synchronous TDM connections.", "Real-time communication where call blocking is preferred over unpredictable latency."] },
      { protocol: "Choose Packet Switching when:", points: ["Handling bursty data traffic typical of web, database, email, and computer communication.", "Maximizing capacity and cost-efficiency of expensive long-haul communication links.", "High survivability and distributed automated fault recovery are essential."] }
    ],
    commonConfusion: "Common Exam Confusion: Believing that packet switching is always slower than circuit switching. While individual packets experience variable queuing delays at intermediate routers, packet switching supports far more concurrent users and utilizes links much more efficiently than reserving idle channels.",
    relatedTopics: ["circuit-vs-packet-switching", "network-edge-core", "multiplexing", "network-delay-loss"]
  },

  "flow-control-vs-congestion-control": {
    id: "flow-control-vs-congestion-control",
    title: "Flow Control vs Congestion Control",
    subtitle: "Protecting the Receiver Buffer vs Protecting the Network Subnet Core",
    shortAnswer: "Flow control prevents a fast sender from overwhelming a slow receiver's local memory buffer (end-to-end between two endpoints). Congestion control prevents traffic from all senders across the Internet from overwhelming the intermediate routers and links of the network core (global stability).",
    tableHeaders: ["Dimension", "Flow Control", "Congestion Control"],
    tableRows: [
      ["Primary Purpose", "Protects the receiver's application buffer from overflowing", "Protects the intermediate routers and network links from collapse"],
      ["Scope & Boundaries", "End-to-end mechanism between two participating endpoints", "Global or subnet-wide mechanism affecting the shared transit path"],
      ["Controlling Metric", "Receive Window (rwnd), explicitly advertised by receiver in header", "Congestion Window (cwnd), dynamically estimated by sender based on loss/RTT"],
      ["Transmission Constraint", "Maximum allowed flight = min(cwnd, rwnd); limited by receiver capacity", "Maximum allowed flight = min(cwnd, rwnd); limited by network pipe capacity"],
      ["Feedback Channel", "Explicit feedback: receiver advertises rwnd in TCP header 16-bit field", "Implicit or explicit: timeout, 3 duplicate ACKs, delay increase, or ECN bits"],
      ["Operating Algorithms", "Sliding window, Zero Window Probing with persist timer", "Slow Start, Congestion Avoidance, Fast Retransmit, Fast Recovery (AIMD)"],
      ["Failure Consequence", "Receiver buffer drops packets, leading to local socket stalls", "Congestion collapse: high packet drop rates, massive queuing delays, zero goodput"],
      ["Layer Location", "Transport layer (TCP) and Data Link layer (IEEE 802.3x pause frames)", "Transport layer (TCP Reno, Cubic, BBR) and Network layer (RED, CoDel)"]
    ],
    visualDiff: `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin: 1.5rem 0;">
        <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 1.25rem;">
          <h5 style="color: #1d4ed8; font-weight: 800; margin-bottom: 0.5rem;">Flow Control: Receiver Buffer Protection</h5>
          <div style="font-family: var(--font-mono); font-size: 0.85rem; color: #1e293b; line-height: 1.8;">
            Sender ──── [Bytes 1..4000] ────► Receiver [Buffer: 80% Full]<br>
            Sender ◄─── [ACK: rwnd = 1000] ── Receiver [Buffer: 95% Full]<br>
            Sender ──── [Bytes 4001..5000] ──► Receiver [Buffer: 100% Full]<br>
            Sender ◄─── [ACK: rwnd = 0] ──── Receiver [Zero Window!]<br>
            Sender: Stalls transmission & starts Persist Timer (Zero-Window Probe)
          </div>
        </div>
        <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 12px; padding: 1.25rem;">
          <h5 style="color: #b91c1c; font-weight: 800; margin-bottom: 0.5rem;">Congestion Control: Network Core Protection</h5>
          <div style="font-family: var(--font-mono); font-size: 0.85rem; color: #1e293b; line-height: 1.8;">
            Sender: cwnd = 1 MSS ──► Slow Start (exponential doubling)<br>
            Sender: cwnd = ssthresh ──► Congestion Avoidance (linear +1 MSS / RTT)<br>
            Router Queue Overflow! ──► Packet Dropped<br>
            Sender receives 3 Dup ACKs: ssthresh = cwnd / 2; cwnd = ssthresh + 3 MSS<br>
            Sender times out: ssthresh = cwnd / 2; cwnd reset to 1 MSS!
          </div>
        </div>
      </div>
    `,
    whenToUse: [
      { protocol: "Flow Control operates when:", points: ["The receiving host is running a slow application process or high CPU load.", "The receive socket buffer is filling up faster than the application calls read().", "rwnd drops below cwnd, throttling sender to prevent local packet drops."] },
      { protocol: "Congestion Control operates when:", points: ["Intermediate router buffers on the transit path exceed queue capacity.", "Multiple senders simultaneously burst traffic across a shared bottleneck link.", "Packet loss or queue delay spikes occur, signaling that cwnd must be reduced."] }
    ],
    commonConfusion: "Essential GATE Concept: The effective send window in TCP is ALWAYS $W = \\min(\\text{cwnd}, \\text{rwnd})$. Flow control dictates rwnd (receiver buffer limit); congestion control dictates cwnd (network bottleneck limit). Whichever is smaller bottlenecks transmission!",
    relatedTopics: ["tcp-flow-control", "tcp-congestion-control", "tcp", "sliding-window"]
  },

  "symmetric-vs-asymmetric-cryptography": {
    id: "symmetric-vs-asymmetric-cryptography",
    title: "Symmetric vs Asymmetric Cryptography",
    subtitle: "Shared Secret Keys vs Public-Private Key Pairs",
    shortAnswer: "Symmetric encryption uses a single shared secret key for both encryption and decryption, offering gigabit-per-second hardware throughput but requiring a secure out-of-band key exchange. Asymmetric encryption uses mathematically coupled key pairs (a public key to encrypt and a private key to decrypt), solving the key exchange problem and enabling digital signatures at the cost of being 1,000x computationally slower.",
    tableHeaders: ["Dimension", "Symmetric Cryptography (AES, ChaCha20)", "Asymmetric Cryptography (RSA, ECC)"],
    tableRows: [
      ["Key Architecture", "1 shared secret key used for both encryption and decryption", "2 mathematically linked keys: Public Key (shared) + Private Key (secret)"],
      ["Key Distribution Problem", "Severe: how do two parties securely share the secret key over untrusted Internet?", "Completely solved: public key distributed freely to anyone in the world"],
      ["Computational Speed", "Extremely fast: gigabits/sec using hardware instructions (AES-NI)", "Slow: 1,000x to 10,000x slower due to modular arithmetic and big integers"],
      ["Key Length for Security", "128 bits (AES-128) or 256 bits (AES-256) offer unbreakable brute-force security", "2048 to 4096 bits (RSA) or 256 to 384 bits (Elliptic Curve Cryptography)"],
      ["Digital Signatures & Non-Repudiation", "Cannot provide non-repudiation: both parties share the exact same key", "Native non-repudiation: only the owner of the private key can sign data"],
      ["Key Scalability for N Users", "$N(N - 1) / 2$ secret keys required for pairwise communication among N users", "$2N$ keys required for N users (each user has 1 public key and 1 private key)"],
      ["Mathematical Foundation", "Substitution-Permutation Networks (SPN), Feistel ciphers, bitwise XOR", "Prime factorization (RSA), Discrete Logarithm (Diffie-Hellman), Elliptic Curves (ECC)"],
      ["Role in Modern Protocols (TLS 1.3)", "Encrypts all actual application payloads (HTTP data, files, video streams)", "Authenticates the server and securely negotiates the symmetric session key"]
    ],
    visualDiff: `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin: 1.5rem 0;">
        <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 1.25rem;">
          <h5 style="color: #1d4ed8; font-weight: 800; margin-bottom: 0.5rem;">Symmetric: Shared Secret ($K$)</h5>
          <div style="font-family: var(--font-mono); font-size: 0.85rem; color: #1e293b; line-height: 1.8;">
            Alice: Plaintext ──[Encrypt with K]──► Ciphertext<br>
            Transmission over Public Internet: ░▒▓█▓▒░ (Secure)<br>
            Bob: Ciphertext ──[Decrypt with K]──► Plaintext<br>
            <span style="color: #15803d; font-weight: 700;">✓ Line-Rate Hardware Encryption (AES-GCM)</span><br>
            <span style="color: #b91c1c;">✗ Critical Flaw: How did Alice & Bob share K initially?</span>
          </div>
        </div>
        <div style="background: #fdf2f8; border: 1px solid #fbcfe8; border-radius: 12px; padding: 1.25rem;">
          <h5 style="color: #be185d; font-weight: 800; margin-bottom: 0.5rem;">Asymmetric: Public/Private ($K_{pub}, K_{priv}$)</h5>
          <div style="font-family: var(--font-mono); font-size: 0.85rem; color: #1e293b; line-height: 1.8;">
            Bob publishes $K_{pub}$ to the world.<br>
            Alice: Plaintext ──[Encrypt with $K_{pub}^{Bob}$]──► Ciphertext<br>
            Bob: Ciphertext ──[Decrypt with $K_{priv}^{Bob}$]──► Plaintext<br>
            <span style="color: #15803d; font-weight: 700;">✓ Zero Pre-Shared Secret Required</span><br>
            <span style="color: #64748b;">• Hybrid Cryptography in TLS: Use RSA/ECC to exchange K, then AES for data!</span>
          </div>
        </div>
      </div>
    `,
    whenToUse: [
      { protocol: "Choose Symmetric Cryptography when:", points: ["Encrypting bulk data, file systems, database storage, and active network connections.", "Operating on battery-constrained mobile or embedded IoT devices where CPU cycles are limited.", "High-throughput symmetric session ciphers (AES-256-GCM, ChaCha20-Poly1305)."] },
      { protocol: "Choose Asymmetric Cryptography when:", points: ["Establishing trust between two entities who have never communicated before (TLS handshake).", "Generating digital signatures and certificates (X.509 PKI, RSA-PSS, ECDSA).", "Encrypting small session secrets and verifying message authenticity."] }
    ],
    commonConfusion: "Hybrid Encryption Reality: Real-world security protocols NEVER use pure asymmetric encryption for user data. Instead, TLS, SSH, and PGP use asymmetric encryption (RSA/ECC) solely to authenticate and exchange a fresh symmetric session key, and then switch 100% of payload encryption to fast symmetric ciphers (AES-GCM)!",
    relatedTopics: ["rsa", "rsa-encryption", "public-key-cryptography", "https"]
  },

  "osi-vs-tcp-ip": {
    id: "osi-vs-tcp-ip",
    title: "OSI Reference Model vs TCP/IP Protocol Stack",
    subtitle: "7-Layer Theoretical Blueprint vs 4-Layer Implementation Hourglass",
    shortAnswer: "The OSI model is a 7-layer theoretical reference framework created by ISO with strict service, interface, and protocol boundaries. The TCP/IP model is a 4-layer pragmatic architecture that powers the actual global Internet, centered around the IP hourglass waist with application layer combining OSI presentation and session duties.",
    tableHeaders: ["Dimension", "OSI 7-Layer Reference Model (ISO/IEC 7498)", "TCP/IP 4-Layer Protocol Suite (IETF RFC 1122)"],
    tableRows: [
      ["Number of Layers", "7 Layers: Application, Presentation, Session, Transport, Network, Data Link, Physical", "4 Layers: Application, Transport, Internet, Network Access (Link/Physical)"],
      ["Development Approach", "Theoretical top-down model developed by committee before protocols were written", "Pragmatic bottom-up design implemented in software (BSD Unix) before standardization"],
      ["Session & Presentation", "Separate explicit Layers 5 (Session) and 6 (Presentation)", "Combined directly into Application Layer (HTTP, TLS, DNS handle presentation)"],
      ["Network Layer Paradigm", "Supports both Connection-Oriented (CONS / X.25) and Connectionless (CLNS)", "Strictly Connectionless at Internet Layer (IP); all routing based on datagrams"],
      ["Architectural Philosophy", "Rigid separation of services, interfaces, and protocol implementations", "Hourglass model: IP is the narrow universal waist over which all protocols run"],
      ["Transport Protocol Diversity", "Five classes (TP0 to TP4) designed for varying underlying network reliabilities", "Two primary protocols: TCP (reliable byte-stream) and UDP (unreliable datagrams)"],
      ["Practical Adoption", "Failed commercially as a protocol stack; universal standard as teaching terminology", "100% dominant architecture of the global Internet and enterprise private networks"],
      ["Protocol Independence", "Protocols fit into layers; model created before protocols were designed", "Protocols were implemented first; model was retrofitted to describe working reality"]
    ],
    visualDiff: `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin: 1.5rem 0;">
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 1.25rem;">
          <h5 style="color: #334155; font-weight: 800; margin-bottom: 0.5rem;">OSI 7-Layer Model</h5>
          <div style="font-family: var(--font-mono); font-size: 0.85rem; color: #1e293b; line-height: 1.8;">
            Layer 7: Application (User interface, HTTP, FTP)<br>
            Layer 6: Presentation (Encoding, Encryption, ASCII)<br>
            Layer 5: Session (Dialog control, Checkpointing)<br>
            Layer 4: Transport (End-to-end reliability, TP4)<br>
            Layer 3: Network (Routing, Addressing, X.25)<br>
            Layer 2: Data Link (Framing, Flow, Error control)<br>
            Layer 1: Physical (Bits, Voltage, Pinouts)
          </div>
        </div>
        <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 12px; padding: 1.25rem;">
          <h5 style="color: #15803d; font-weight: 800; margin-bottom: 0.5rem;">TCP/IP 4-Layer Internet Suite</h5>
          <div style="font-family: var(--font-mono); font-size: 0.85rem; color: #1e293b; line-height: 1.8;">
            Application Layer (HTTP, DNS, TLS, SSH, SMTP)<br>
            <span style="color: #64748b;">├── Encompasses OSI L5, L6, and L7</span><br>
            Transport Layer (TCP, UDP, QUIC)<br>
            Internet Layer (IPv4, IPv6, ICMP, Routing Protocols)<br>
            <span style="color: #15803d; font-weight: 700;">└── The Narrow Waist: Everything over IP, IP over everything</span><br>
            Network Access / Link Layer (Ethernet, Wi-Fi, DOCSIS, Fiber)
          </div>
        </div>
      </div>
    `,
    whenToUse: [
      { protocol: "Use the OSI Model when:", points: ["Studying theoretical concepts, modular network separation, and device classification (L2 switch vs L3 router).", "Answering university exam questions regarding formal protocol boundaries.", "Analyzing architectural troubleshooting frameworks (bottom-up network debugging)."] },
      { protocol: "Use the TCP/IP Model when:", points: ["Developing real-world network software, sockets programming, and protocol analyzers (Wireshark).", "Configuring production network interfaces, subnet routing, and firewall filtering rules.", "Understanding how the actual Internet protocols (IP, TCP, UDP, HTTP, DNS) interact."] }
    ],
    commonConfusion: "Exam Trap: Confusing OSI Layer 3 (Network) with TCP/IP Internet Layer. In OSI, Layer 3 was designed to support connection-oriented virtual circuits (like X.25). In TCP/IP, the Internet Layer is strictly connectionless: every IPv4/IPv6 packet is routed independently, and reliability is offloaded to end hosts in the Transport layer (End-to-End Principle)!",
    relatedTopics: ["osi-model", "tcp-ip-model", "protocol-stack", "encapsulation"]
  }
};

const ComparisonsModule = {
  renderComparison: function(container, comparisonId) {
    const data = COMPARISONS_DATA[comparisonId];
    if (!data) return;

    container.innerHTML = `
      <!-- Breadcrumb -->
      <div style="font-size: 0.82rem; font-weight: 700; color: var(--text-muted); margin-bottom: 1rem;">
        <span onclick="App.loadView('home')" style="cursor: pointer; color: #0284c7;">Home</span> &gt; 
        <span onclick="App.loadView('comparisons')" style="cursor: pointer; color: #0284c7;">Comparisons</span> &gt; 
        <span>${data.title}</span>
      </div>

      <!-- Comparison Header Banner -->
      <div class="welcome-banner" style="background: linear-gradient(100deg, #ede7f6 0%, #e0f2fe 100%);">
        <div class="welcome-text">
          <div style="font-size: 0.85rem; font-weight: 800; color: #7c3aed; text-transform: uppercase; margin-bottom: 0.35rem;">
            First-Class Conceptual Comparison
          </div>
          <h2>${data.title}</h2>
          <p>${data.subtitle}</p>
        </div>
      </div>

      <!-- Quick Takeaway Card -->
      <div class="study-card" style="margin-top: 1.5rem;">
        <div style="font-size: 0.85rem; font-weight: 800; color: #15803d; text-transform: uppercase; margin-bottom: 0.35rem;">
          ⚡ Core Takeaway / Short Answer
        </div>
        <p style="font-size: 1.05rem; font-weight: 600; color: #1e293b; line-height: 1.7;">
          ${data.shortAnswer}
        </p>
      </div>

      <!-- Comparison Table -->
      <div class="study-card">
        <h3 style="font-size: 1.3rem; font-weight: 800; color: #1e293b; margin-bottom: 1rem;">
          📋 Comprehensive Technical Comparison Matrix
        </h3>
        <div class="data-table-wrapper">
          <table class="modern-table">
            <thead>
              <tr>
                ${data.tableHeaders.map(h => `<th>${h}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${data.tableRows.map(r => `
                <tr>
                  <td><strong>${r[0]}</strong></td>
                  <td>${r[1]}</td>
                  <td>${r[2]}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Visual Difference Diagram -->
        <h3 style="font-size: 1.2rem; font-weight: 800; color: #1e293b; margin: 2rem 0 0.5rem 0;">
          👁️ Visual Operational Difference
        </h3>
        ${data.visualDiff}

        <!-- When to Use Each -->
        <h3 style="font-size: 1.2rem; font-weight: 800; color: #1e293b; margin: 2rem 0 0.5rem 0;">
          🎯 When to Use Which Protocol? (Decision Matrix)
        </h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 1rem;">
          ${data.whenToUse.map(w => `
            <div style="background: #f8fafc; border: 1px solid var(--border-light); border-radius: 12px; padding: 1.25rem;">
              <h5 style="color: #0284c7; font-weight: 800; margin-bottom: 0.75rem;">${w.protocol}</h5>
              <ul style="padding-left: 1.2rem; font-size: 0.9rem; color: #334155; line-height: 1.7;">
                ${w.points.map(p => `<li>${p}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>

        <!-- Common Gotchas & Confusion -->
        <div class="callout-box warning" style="margin-top: 2rem; background: #fffbeb; border-left: 4px solid #f59e0b; padding: 1.25rem; border-radius: 8px;">
          <div style="font-weight: 800; color: #b45309; margin-bottom: 0.4rem;">⚠️ Common Exam Confusion & Gotcha:</div>
          <p style="font-size: 0.95rem; color: #451a03; line-height: 1.7;">${data.commonConfusion}</p>
        </div>

        <!-- Related Topics -->
        <div style="margin-top: 2rem; border-top: 1px solid var(--border-light); padding-top: 1.25rem;">
          <span style="font-size: 0.82rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase;">Related Deep-Dive Topics:</span>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.5rem;">
            ${data.relatedTopics.map(t => {
              const c = CONCEPT_REGISTRY[t];
              return `<button class="topic-nav-btn" onclick="App.openExplainModal('${t}')">🔗 ${c ? c.name : t}</button>`;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  },

  renderComparisonsHub: function(container) {
    container.innerHTML = `
      <div class="welcome-banner" style="background: linear-gradient(100deg, #ede7f6 0%, #fef3c7 100%);">
        <div class="welcome-text">
          <div style="font-size: 0.85rem; font-weight: 800; color: #7c3aed; text-transform: uppercase; margin-bottom: 0.35rem;">
            First-Class Comparison System
          </div>
          <h2>Protocol & Technology Comparisons</h2>
          <p>Side-by-side matrices, visual difference flows, and exam decision trees for all major networking dilemmas.</p>
        </div>
      </div>

      <div class="units-grid-4" style="margin-top: 1.5rem;">
        <div class="unit-card-pill u4" onclick="App.loadComparison('tcp-vs-udp')">
          <div class="unit-badge-icon">⚡</div>
          <h4 class="unit-card-title">TCP vs UDP</h4>
          <div class="unit-card-tasks">Transport Layer</div>
          <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 1rem;">Reliable byte stream vs low-latency datagrams.</p>
          <div class="unit-card-btn-arrow">→</div>
        </div>

        <div class="unit-card-pill u2" onclick="App.loadComparison('go-back-n-vs-selective-repeat')">
          <div class="unit-badge-icon">📦</div>
          <h4 class="unit-card-title">Go-Back-N vs Selective Repeat</h4>
          <div class="unit-card-tasks">Data Link Layer ARQ</div>
          <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 1rem;">Window sizes, receiver buffering, and retransmissions.</p>
          <div class="unit-card-btn-arrow">→</div>
        </div>

        <div class="unit-card-pill u2" onclick="App.loadComparison('pure-aloha-vs-slotted-aloha')">
          <div class="unit-badge-icon">📡</div>
          <h4 class="unit-card-title">Pure vs Slotted ALOHA</h4>
          <div class="unit-card-tasks">MAC Sublayer Contention</div>
          <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 1rem;">Vulnerable time 2T vs 1T, throughput 18.4% vs 36.8%.</p>
          <div class="unit-card-btn-arrow">→</div>
        </div>

        <div class="unit-card-pill u2" onclick="App.loadComparison('hub-vs-bridge-vs-switch-vs-router')">
          <div class="unit-badge-icon">🔀</div>
          <h4 class="unit-card-title">Connecting Devices</h4>
          <div class="unit-card-tasks">Hardware Architecture</div>
          <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 1rem;">Hub vs Bridge vs Switch vs Router vs Gateway layers.</p>
          <div class="unit-card-btn-arrow">→</div>
        </div>

        <div class="unit-card-pill u3" onclick="App.loadComparison('link-state-vs-distance-vector')">
          <div class="unit-badge-icon">🗺️</div>
          <h4 class="unit-card-title">Link State vs Distance Vector</h4>
          <div class="unit-card-tasks">Network Layer Routing</div>
          <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 1rem;">Dijkstra global graph vs Bellman-Ford neighbor exchange.</p>
          <div class="unit-card-btn-arrow">→</div>
        </div>

        <div class="unit-card-pill u3" onclick="App.loadComparison('ipv4-vs-ipv6')">
          <div class="unit-badge-icon">🔍</div>
          <h4 class="unit-card-title">IPv4 vs IPv6</h4>
          <div class="unit-card-tasks">Internet Protocol Specs</div>
          <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 1rem;">RFC 791 32-bit vs RFC 8200 128-bit 40-byte fixed header.</p>
          <div class="unit-card-btn-arrow">→</div>
        </div>

        <div class="unit-card-pill u5" onclick="App.loadComparison('http-vs-https')">
          <div class="unit-badge-icon">🔒</div>
          <h4 class="unit-card-title">HTTP vs HTTPS (TLS)</h4>
          <div class="unit-card-tasks">Application & Security</div>
          <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 1rem;">Plaintext web vs HTTP encapsulated over TLS 1.3.</p>
          <div class="unit-card-btn-arrow">→</div>
        </div>

        <div class="unit-card-pill u5" onclick="App.loadComparison('smtp-vs-pop3-vs-imap')">
          <div class="unit-badge-icon">✉️</div>
          <h4 class="unit-card-title">SMTP vs POP3 vs IMAP</h4>
          <div class="unit-card-tasks">Email System</div>
          <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 1rem;">Mail transmission (push) vs multi-device sync (pull).</p>
          <div class="unit-card-btn-arrow">→</div>
        </div>

        <div class="unit-card-pill u5" onclick="App.loadComparison('firewall-vs-ids-vs-ips')">
          <div class="unit-badge-icon">🛡️</div>
          <h4 class="unit-card-title">Firewalls vs IDS vs IPS</h4>
          <div class="unit-card-tasks">NIST Perimeter Security</div>
          <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 1rem;">Stateless filter vs passive IDS vs active inline IPS.</p>
          <div class="unit-card-btn-arrow">→</div>
        </div>
      </div>
    `;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { COMPARISONS_DATA, ComparisonsModule };
}
