/**
 * Unit 4 Topic 3 Builder: UDP (User Datagram Protocol)
 * Subtopics:
 * 1. u4-intro-udp (alias: udp)
 * 2. u4-udp-services-characteristics
 * 3. u4-udp-segment-format (alias: udp-header)
 * 4. u4-udp-vs-tcp
 */

const TOPIC3_ITEMS = {
  "u4-intro-udp": {
    id: "u4-intro-udp",
    title: "Introduction to UDP",
    unit: "Unit 4 – Transport Layer",
    unitId: "unit4",
    level: "Level 1 — Fundamental",
    category: "transport",
    difficulty: "Core",
    readingTime: "15 min read",
    standard: "RFC 768 / Forouzan 4th Ed. Ch 23.2, pp. 709-715 / Kurose & Ross Ch 3.3",
    oneLiner: "Lightweight, connectionless, and best-effort transport layer protocol designed for speed and minimal protocol overhead.",
    quickAnswer: "The User Datagram Protocol (UDP), defined in RFC 768 by David P. Reed in 1980, is an extremely simple, connectionless transport protocol that runs on top of IP. It provides application processes with a direct, minimalist interface to the network layer, adding only 16-bit port numbers for process multiplexing and an optional 16-bit checksum for error detection, without any connection setup delays, flow control, or retransmission overhead.",
    whyItMatters: "While TCP provides reliable delivery, its handshakes, retransmissions, and congestion throttling introduce unpredictable delays. For time-sensitive applications like live video streaming, online multiplayer gaming, VoIP phone calls, and high-frequency DNS lookups, arriving on time is far more important than recovering lost past data. UDP is the engine of the real-time Internet.",
    infobox: {
      prerequisites: ["u4-transport-services", "u4-transport-addressing"],
      relatedConcepts: ["u4-udp-services-characteristics", "u4-udp-segment-format", "u4-udp-vs-tcp"],
      compareWith: ["udp-vs-tcp"],
      primaryUses: [
        "Domain Name System (DNS) query and response resolution (Port 53)",
        "Dynamic Host Configuration Protocol (DHCP client/server, Ports 67/68)",
        "Real-Time Transport Protocol (RTP) audio and video streaming",
        "Network Time Protocol (NTP time synchronization, Port 123)",
        "Simple Network Management Protocol (SNMP telemetry, Port 161)"
      ],
      standardRfc: "RFC 768: User Datagram Protocol (STD 6)"
    },
    learningObjectives: [
      "Understand the design philosophy and motivation behind UDP (RFC 768)",
      "Explain the concept of connectionless, best-effort transport delivery",
      "Identify the well-known ports traditionally associated with UDP services",
      "Recognize why real-time audio/video and gaming choose UDP over TCP",
      "Explain how modern protocols like QUIC and HTTP/3 build custom reliability on top of UDP"
    ],
    prerequisitesList: [
      { concept: "Transport Layer Services", meaning: "Understanding process multiplexing and port numbers" },
      { concept: "Network Layer Best Effort", meaning: "Knowledge that IP does not guarantee packet delivery" }
    ],
    imageUrl: "assets/images/unit4/topic3-udp/udp-overview-operation.svg",
    imageCaption: "Figure 4.8: User Datagram Protocol (UDP) Architecture — Minimalist Transport Interface Between Application and IP [Forouzan Section 23.2]",
    sections: {
      overview: `
        <p class="mb-3">
          The <strong>User Datagram Protocol (UDP)</strong> is called an <em>unreliable, connectionless transport protocol</em>. In the context of computer networking, the word "unreliable" is not an insult; it is a deliberate architectural design decision!
        </p>
        <p class="mb-3">
          UDP does not guarantee that a transmitted packet will reach its destination, does not check if packets arrive in order, and does not retransmit dropped packets. Instead, it provides the bare minimum required for process-to-process communication:
        </p>
        <div class="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs font-mono mb-3">
          UDP = Network Layer IP + 16-Bit Port Numbers (Multiplexing) + Optional 16-Bit Checksum
        </div>
        <p class="text-xs text-slate-600 dark:text-slate-400">
          By stripping away handshakes, acknowledgments, sliding windows, and congestion throttling, UDP delivers packets with the absolute minimum possible operating system latency and header overhead.
        </p>
      `,
      howItWorks: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">1. Why Choose UDP Over TCP?</h3>
        <p class="mb-3">
          Application developers choose UDP whenever one or more of the following conditions exist:
        </p>
        <ul class="list-disc pl-5 space-y-2 text-xs mb-4">
          <li><strong>Need for Zero Handshake Delay (0-RTT):</strong> TCP requires a 3-way handshake (1 full RTT) before sending data. A DNS lookup using UDP sends the query immediately and gets the answer in a single round-trip.</li>
          <li><strong>Real-Time Timeliness Over Perfection:</strong> In a Zoom video call or live sports broadcast, if packet #42 is lost, retransmitting it 100 milliseconds later is completely useless because the conversation has already moved forward! The user would rather see a minor visual glitch for a fraction of a second than have the entire video freeze waiting for a retransmission.</li>
          <li><strong>No Head-of-Line (HoL) Blocking:</strong> In TCP, if segment 3 is lost, segments 4, 5, and 6 sit stalled in the receiver's buffer waiting for segment 3 to be retransmitted. In UDP, every datagram is completely independent; a dropped packet never stalls subsequent packets!</li>
          <li><strong>No Congestion Window Throttling:</strong> TCP automatically slashes its transmission rate when network loss occurs. Live media codecs need to push audio samples at a constant, steady bit rate regardless of network fluctuations.</li>
          <li><strong>Broadcast and Multicast Support:</strong> TCP is inherently point-to-point (unicast only). UDP naturally supports transmitting a single stream to thousands of subscribers simultaneously (IP Multicast).</li>
        </ul>

        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">2. Standard Well-Known UDP Ports</h3>
        <p class="mb-3">
          As documented in Forouzan Section 23.2 (Table 23.1), prominent Internet services operate exclusively or primarily over UDP:
        </p>
        <table class="wiki-table w-full text-xs mb-4">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-800">
              <th>Port</th>
              <th>Protocol</th>
              <th>Description &amp; Why UDP is Used</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="font-mono font-bold text-blue-600">53</td>
              <td class="font-bold">DNS</td>
              <td>Domain Name System: Short single-packet queries (fast 1-RTT resolution).</td>
            </tr>
            <tr>
              <td class="font-mono font-bold text-emerald-600">67 / 68</td>
              <td class="font-bold">DHCP / BOOTP</td>
              <td>Dynamic Host Configuration Protocol: Relies on link-layer broadcasts to discover IP addresses.</td>
            </tr>
            <tr>
              <td class="font-mono font-bold text-purple-600">69</td>
              <td class="font-bold">TFTP</td>
              <td>Trivial File Transfer Protocol: Lightweight bootstrap file transfer for diskless routers.</td>
            </tr>
            <tr>
              <td class="font-mono font-bold text-amber-600">123</td>
              <td class="font-bold">NTP</td>
              <td>Network Time Protocol: Millisecond-precision clock synchronization over UDP.</td>
            </tr>
            <tr>
              <td class="font-mono font-bold text-rose-600">161 / 162</td>
              <td class="font-bold">SNMP</td>
              <td>Simple Network Management Protocol: Routine network device health polling and traps.</td>
            </tr>
            <tr>
              <td class="font-mono font-bold text-teal-600">5060</td>
              <td class="font-bold">SIP / RTP</td>
              <td>Session Initiation Protocol &amp; Real-time Transport Protocol for VoIP and video telephony.</td>
            </tr>
          </tbody>
        </table>
      `,
      technicalDetails: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">3. The Modern Renaissance of UDP: QUIC and HTTP/3</h3>
        <p class="mb-3">
          For decades, high-speed web traffic ran almost exclusively over TCP. However, the overhead of TCP's handshake combined with TLS handshakes led Google and the IETF to develop <strong>QUIC (RFC 9000)</strong>, which forms the foundation of <strong>HTTP/3</strong>:
        </p>
        <div class="p-3 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg text-xs space-y-1.5 mb-3 font-mono">
          <div>• QUIC runs entirely in user-space ON TOP OF UDP!</div>
          <div>• It eliminates TCP Head-of-Line blocking across multiplexed HTTP streams.</div>
          <div>• It enables 0-RTT connection resumption and seamless connection migration (e.g., when a phone switches from Wi-Fi to 5G cellular without dropping the stream).</div>
          <div>• As of 2024, over 30% of global Internet web traffic runs over UDP via HTTP/3!</div>
        </div>
      `,
      workedExamples: {
        level1: `
          <strong>Examining a DNS Query Over UDP:</strong><br/>
          When you enter <code>example.com</code> in a browser:<br/>
          • Client generates a 32-byte DNS query payload.<br/>
          • UDP adds an 8-byte header (Src Port: 54123, Dst Port: 53, Length: 40, Checksum).<br/>
          • IP adds a 20-byte header.<br/>
          • Total packet size = 60 bytes. The query is transmitted in 0 ms with zero connection setup!
        `,
        level2: `
          <strong>Calculating Header Overhead: TCP vs UDP for Small Voice Packets:</strong><br/>
          A VoIP audio codec produces 20 bytes of compressed voice data every 20 milliseconds.<br/>
          • <strong>With UDP:</strong> 20B data + 8B UDP + 20B IP = 48 bytes total. Overhead = 28 / 48 = 58.3%.<br/>
          • <strong>With TCP:</strong> 20B data + 20B TCP + 20B IP = 60 bytes total (plus ACK packets in return!). Overhead = 40 / 60 = 66.7%.<br/>
          UDP saves 20% in packet bandwidth and completely eliminates retransmission jitter!
        `,
        level3: `
          <strong>Application-Level Reliability over UDP (TFTP Stop-and-Wait):</strong><br/>
          Can an application achieve reliability over UDP?<br/>
          <strong>Yes!</strong> Trivial File Transfer Protocol (TFTP - RFC 1350) runs over UDP. It implements its own simple application-level Stop-and-Wait ARQ: the TFTP client sends block #1 and waits for a TFTP ACK #1. If a timeout occurs, the TFTP application code retransmits block #1.<br/>
          This demonstrates that reliability can be placed in the application layer when needed, without inheriting TCP's heavyweight kernel state.
        `
      },
      advantagesLimitations: `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <h4 class="font-bold text-emerald-800 dark:text-emerald-300 mb-2">Advantages of UDP</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Minimal header overhead (8 bytes fixed vs 20–60 bytes in TCP).</li>
              <li>Zero handshake latency (0-RTT transmission).</li>
              <li>No connection state in kernel memory (scales to millions of clients).</li>
              <li>Supports multicast and broadcast communication.</li>
            </ul>
          </div>
          <div class="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800">
            <h4 class="font-bold text-rose-800 dark:text-rose-300 mb-2">Limitations</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>No guaranteed delivery (dropped packets are lost forever).</li>
              <li>No ordering (packets can arrive out of sequence).</li>
              <li>No flow or congestion control (can congest network if unthrottled).</li>
            </ul>
          </div>
        </div>
      `,
      whereUsed: [
        "DNS (Domain Name System, UDP port 53)",
        "VoIP telephony (Skype, WhatsApp Voice, Zoom, WebRTC)",
        "Online multiplayer games (Valorant, Fortnite, Call of Duty network tick rates)",
        "HTTP/3 and Google QUIC protocol",
        "DHCP automated network configuration"
      ],
      commonMistakes: `
        <ul class="space-y-2 text-xs">
          <li><strong>Believing UDP is obsolete because it is unreliable:</strong> UDP is deliberately designed for speed and is the foundation of high-performance modern protocols like HTTP/3 and WebRTC.</li>
          <li><strong>Assuming UDP packets never get dropped:</strong> UDP packets are dropped whenever router queues fill up or checksum errors occur. Applications must tolerate loss or implement custom checks.</li>
        </ul>
      `,
      quiz: [
        {
          question: "What is the primary design philosophy of the User Datagram Protocol (UDP)?",
          options: [
            "To guarantee 100% reliable in-order byte stream delivery",
            "To provide minimal transport overhead and zero connection setup delay",
            "To encrypt network traffic using public-key cryptography",
            "To replace the IP protocol at the Network Layer"
          ],
          answer: 1,
          explanation: "UDP provides a minimalist transport interface, prioritizing low overhead, zero handshake delay, and fast delivery over reliability."
        },
        {
          question: "Which of the following standard protocols operates over UDP port 53 for fast address resolution?",
          options: [
            "HTTP",
            "FTP",
            "DNS",
            "SSH"
          ],
          answer: 2,
          explanation: "DNS (Domain Name System) uses UDP port 53 for standard name-to-IP lookup queries."
        },
        {
          question: "Which next-generation web transport protocol runs on top of UDP to eliminate TCP Head-of-Line blocking?",
          options: [
            "HTTP/1.1",
            "HTTP/2",
            "QUIC (HTTP/3)",
            "Telnet"
          ],
          answer: 2,
          explanation: "QUIC (RFC 9000), which powers HTTP/3, is built entirely on top of UDP to provide fast, encrypted, stream-multiplexed transport."
        }
      ],
      references: [
        { cite: "RFC 768: User Datagram Protocol (David P. Reed)", url: "https://datatracker.ietf.org/doc/html/rfc768" },
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, Chapter 23.2: User Datagram Protocol (UDP), pp. 709-715", url: "" },
        { cite: "RFC 9000: QUIC: A UDP-Based Multiplexed and Secure Transport", url: "https://datatracker.ietf.org/doc/html/rfc9000" }
      ]
    }
  },

  "u4-udp-services-characteristics": {
    id: "u4-udp-services-characteristics",
    title: "UDP Services and Characteristics",
    unit: "Unit 4 – Transport Layer",
    unitId: "unit4",
    level: "Level 2 — Core Architecture",
    category: "transport",
    difficulty: "Core",
    readingTime: "20 min read",
    standard: "Forouzan 4th Ed. Ch 23.2, pp. 711-714 / Kurose & Ross Ch 3.3",
    oneLiner: "In-depth breakdown of UDP's core architectural characteristics: connectionless operation, message framing, 2-tuple demultiplexing, and queuing.",
    quickAnswer: "UDP provides process-to-process communication using 16-bit port numbers, connectionless operation with zero state maintenance, best-effort datagram delivery, datagram boundary preservation (message-oriented framing), and 2-tuple demultiplexing (Destination IP, Destination Port). It offers no flow control, no congestion control, and no acknowledgment-based error recovery.",
    whyItMatters: "Understanding UDP's precise services allows network engineers to correctly decide between UDP and TCP. Features like datagram boundary preservation mean developers don't have to write custom record-splitting logic, while the absence of flow and congestion control allows applications to push data at exact physical hardware rates without interference from kernel throttling.",
    infobox: {
      prerequisites: ["u4-intro-udp"],
      relatedConcepts: ["u4-udp-segment-format", "u4-udp-vs-tcp", "u4-transport-services"],
      compareWith: ["stream-oriented-vs-message-oriented"],
      primaryUses: [
        "Message boundary preservation for discrete packet exchanges",
        "Connectionless communication without session overhead",
        "Multi-client reception through a single socket descriptor",
        "Real-time sensor telemetry and IoT data feeds"
      ],
      standardRfc: "RFC 768, Forouzan Chapter 23.2"
    },
    learningObjectives: [
      "Explain the 5 core characteristics of UDP transport",
      "Describe how UDP preserves application message boundaries (Datagram vs Stream)",
      "Explain 2-Tuple demultiplexing in UDP vs 4-Tuple demultiplexing in TCP",
      "Understand UDP socket input and output queuing mechanisms in the operating system",
      "Analyze the consequences of missing flow control and congestion control in UDP"
    ],
    prerequisitesList: [
      { concept: "Introduction to UDP", meaning: "Basic knowledge of RFC 768 and UDP use cases" },
      { concept: "Multiplexing", meaning: "Understanding how port numbers direct traffic to sockets" }
    ],
    imageUrl: "assets/images/unit4/topic3-udp/udp-services-characteristics.svg",
    imageCaption: "Figure 4.9: UDP Core Services & Architectural Characteristics — Connectionless, Unreliable, Message-Oriented, Multicast-Capable",
    sections: {
      overview: `
        <p class="mb-3">
          As defined by Forouzan Section 23.2, the User Datagram Protocol provides a specific, well-defined set of services and operational characteristics.
        </p>
        <p class="mb-3">
          While TCP acts like a continuous telephone call (requiring dialing, conversational exchange, and hanging up), UDP acts like sending a <strong>postcard</strong>: you write the message, address it with the recipient's coordinates, drop it in the mailbox, and hope it arrives. Each postcard is an independent datagram.
        </p>
      `,
      howItWorks: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">1. Five Core Characteristics of UDP</h3>
        <div class="space-y-3 text-xs mb-4">
          <div class="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
            <strong class="text-blue-600 dark:text-blue-400">1. Connectionless Service:</strong>
            <p class="mt-1 text-slate-600 dark:text-slate-300">UDP does not establish a logical connection before sending data. There is no initial handshake. The sender simply attaches the destination IP and port and transmits. No session state is allocated in kernel memory.</p>
          </div>

          <div class="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
            <strong class="text-rose-600 dark:text-rose-400">2. Unreliable Delivery:</strong>
            <p class="mt-1 text-slate-600 dark:text-slate-300">UDP provides best-effort delivery. If a packet is lost in a router queue or fails the checksum test, it is dropped with no notification sent back to the sender. There are no sequence numbers, no ACKs, and no automatic retransmissions.</p>
          </div>

          <div class="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
            <strong class="text-emerald-600 dark:text-emerald-400">3. Message-Oriented (Preserves Message Boundaries):</strong>
            <p class="mt-1 text-slate-600 dark:text-slate-300">UDP preserves message boundaries exactly as produced by the application. If an application writes 200 bytes using <code>sendto()</code>, UDP transmits exactly one 200-byte datagram. When the receiver reads it via <code>recvfrom()</code>, it reads all 200 bytes in a single atomic operation. UDP never splits or concatenates messages (unlike TCP byte streams).</p>
          </div>

          <div class="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
            <strong class="text-amber-600 dark:text-amber-400">4. No Flow Control or Congestion Control:</strong>
            <p class="mt-1 text-slate-600 dark:text-slate-300">UDP contains no sliding window and no rate-throttling algorithms. A UDP process can transmit data as fast as the host CPU and network interface can push bits. If the receiving process reads slowly, the receiver's queue overflows and drops packets without warning.</p>
          </div>

          <div class="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
            <strong class="text-purple-600 dark:text-purple-400">5. 2-Tuple Demultiplexing:</strong>
            <p class="mt-1 text-slate-600 dark:text-slate-300">To demultiplex an incoming UDP packet, the operating system examines only a <strong>2-Tuple: (Destination IP, Destination Port)</strong>. Two incoming UDP packets originating from completely different source IPs and source ports will be directed into the <em>exact same server socket</em> if their destination port matches!</p>
          </div>
        </div>
      `,
      technicalDetails: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">2. UDP Queuing Mechanisms (Forouzan Section 23.2)</h3>
        <p class="mb-3">
          In operating system implementations of UDP:
        </p>
        <ul class="list-disc pl-5 space-y-1.5 text-xs mb-3">
          <li><strong>Input Queue:</strong> Associated with each active UDP socket. Incoming user datagrams that pass the checksum test are queued here in FIFO order. If the queue becomes full (buffer overflow), newly arriving datagrams are discarded, and an ICMP "Port Unreachable" or silent drop occurs.</li>
          <li><strong>Output Queue:</strong> When an application executes <code>sendto()</code>, the datagram enters the socket's output queue, where the UDP header is prepended and passed down to IP. If the output queue is full, the system call typically returns an error (<code>ENOBUFS</code>).</li>
        </ul>
      `,
      workedExamples: {
        level1: `
          <strong>Message-Oriented vs Byte-Stream Framing:</strong><br/>
          Suppose a client sends two separate messages: "HELLO" (5 bytes) and "WORLD" (5 bytes).<br/>
          • <strong>Under UDP:</strong> Client makes two <code>sendto()</code> calls. The receiver makes two <code>recvfrom()</code> calls. Call 1 returns "HELLO"; Call 2 returns "WORLD". Boundaries are 100% preserved!<br/>
          • <strong>Under TCP:</strong> Client makes two <code>send()</code> calls. Because TCP is a byte stream, the receiver's single <code>recv()</code> might read all 10 bytes at once: "HELLOWORLD"! The application has to write custom delimiter code (like commas or newlines) to tell where "HELLO" ends and "WORLD" begins.
        `,
        level2: `
          <strong>2-Tuple UDP Demultiplexing in Action:</strong><br/>
          A DNS server listens on UDP port 53 (IP 8.8.8.8).<br/>
          • Client A (IP 192.168.1.10, Port 51000) sends a DNS query.<br/>
          • Client B (IP 10.0.0.5, Port 62000) sends a DNS query.<br/>
          Both datagrams have Destination IP = 8.8.8.8 and Destination Port = 53.<br/>
          The server's OS routes both datagrams into the <strong>single DNS socket</strong>. When the server calls <code>recvfrom()</code>, the OS provides the sender's client address so the server knows where to reply!
        `,
        level3: `
          <strong>Detecting UDP Packet Loss with Sequence Numbers in Application Headers:</strong><br/>
          Because UDP has no sequence numbers, how does RTP (Real-Time Transport Protocol) detect lost audio frames?<br/>
          • Solution: RTP adds its own 12-byte application header inside the UDP payload!<br/>
          • The RTP header includes a 16-bit <strong>RTP Sequence Number</strong> (increments by 1 per packet).<br/>
          • If receiver gets packet #101 followed by #103, it immediately knows packet #102 was lost in transit and can apply packet loss concealment (PLC) algorithms!
        `
      },
      advantagesLimitations: `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <h4 class="font-bold text-emerald-800 dark:text-emerald-300 mb-2">Advantages</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Eliminates message framing complexity in application software.</li>
              <li>A single server socket can handle millions of independent clients.</li>
              <li>Allows maximum utilization of available transmission bandwidth.</li>
            </ul>
          </div>
          <div class="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800">
            <h4 class="font-bold text-rose-800 dark:text-rose-300 mb-2">Risks</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Uncontrolled UDP traffic can starve TCP connections in shared routers (UDP flood).</li>
              <li>Slow receiving applications experience silent packet loss due to input queue overflow.</li>
            </ul>
          </div>
        </div>
      `,
      whereUsed: [
        "DNS resolvers and authoritative name servers",
        "Syslog logging servers (UDP port 514)",
        "RADIUS and TACACS+ authentication servers",
        "Video game state replication engines"
      ],
      commonMistakes: `
        <ul class="space-y-2 text-xs">
          <li><strong>Assuming UDP demultiplexing uses the 4-tuple:</strong> Standard UDP sockets only examine the destination IP and destination port. Any sender can send data to an open UDP port.</li>
          <li><strong>Thinking UDP guarantees message ordering:</strong> While message boundaries are preserved, the messages themselves can arrive completely out of order!</li>
        </ul>
      `,
      quiz: [
        {
          question: "What does it mean that UDP is a 'Message-Oriented' protocol?",
          options: [
            "It automatically translates text messages into different languages",
            "It preserves application datagram boundaries intact without splitting or combining messages",
            "It only transmits ASCII text and forbids binary data",
            "It requires email-style headers"
          ],
          answer: 1,
          explanation: "Message-oriented means each write by the sender produces exactly one datagram that is read in full by the receiver in a single read call."
        },
        {
          question: "What information does the operating system use to demultiplex incoming UDP packets to a socket?",
          options: [
            "4-Tuple: Source IP, Source Port, Dest IP, Dest Port",
            "2-Tuple: Destination IP and Destination Port",
            "Source MAC address and Destination MAC address",
            "Sequence Number and Acknowledgment Number"
          ],
          answer: 1,
          explanation: "UDP uses 2-tuple demultiplexing (Destination IP and Destination Port), allowing multiple different clients to send to the same server socket."
        },
        {
          question: "What happens when an incoming UDP datagram arrives but the receiving socket's input queue is full?",
          options: [
            "The receiver sends a Flow Control Pause frame",
            "The datagram is silently discarded (buffer overflow loss)",
            "The sender is told to reduce its congestion window",
            "The operating system stores it on hard drive swap space"
          ],
          answer: 1,
          explanation: "Because UDP has no flow control, when the input queue overflows, newly arriving datagrams are simply discarded."
        }
      ],
      references: [
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, Chapter 23.2: UDP Operation, pp. 711-714", url: "" },
        { cite: "RFC 768: User Datagram Protocol", url: "https://datatracker.ietf.org/doc/html/rfc768" }
      ]
    }
  },

  "u4-udp-segment-format": {
    id: "u4-udp-segment-format",
    title: "UDP Segment Format",
    unit: "Unit 4 – Transport Layer",
    unitId: "unit4",
    level: "Level 2 — Core Architecture",
    category: "transport",
    difficulty: "Core",
    readingTime: "25 min read",
    standard: "RFC 768 / Forouzan 4th Ed. Ch 23.2, pp. 710-713 / Kurose & Ross Ch 3.3.2",
    oneLiner: "Detailed analysis of the 8-byte UDP header, 16-bit fields, and the 12-byte IPv4 Pseudo-Header checksum calculation.",
    quickAnswer: "The UDP segment (user datagram) consists of a fixed, compact 8-byte (64-bit) header followed by the application payload. The header contains exactly four 16-bit fields: Source Port Number, Destination Port Number, Total Length, and Checksum. To verify that a datagram was delivered to the intended IP destination, the checksum calculation incorporates a temporary 12-byte Pseudo-Header derived from the IP layer.",
    whyItMatters: "At only 8 bytes, the UDP header represents the ultimate lightweight transport encapsulation in networking. Understanding each 16-bit field and mastering the 1's complement Pseudo-Header checksum calculation is a standard university examination requirement and critical for writing packet analyzers and network drivers.",
    infobox: {
      prerequisites: ["u4-intro-udp", "u4-transport-addressing"],
      relatedConcepts: ["u4-udp-services-characteristics", "u4-tcp-segment-header", "checksum"],
      compareWith: ["udp-header-vs-tcp-header"],
      primaryUses: [
        "Transport header parsing in Wireshark and tcpdump",
        "Checksum calculation and packet corruption detection",
        "Calculating maximum application payload sizes",
        "Writing packet injectors and raw socket handlers"
      ],
      standardRfc: "RFC 768 (User Datagram Protocol Header Specification)"
    },
    learningObjectives: [
      "Diagram and explain the four 16-bit fields of the 8-byte UDP header",
      "Calculate minimum and maximum possible UDP datagram lengths",
      "Explain the purpose and components of the 12-byte IPv4 Pseudo-Header",
      "Perform step-by-step 1's complement summation to compute a UDP checksum",
      "Understand why UDP checksum is optional in IPv4 but mandatory in IPv6"
    ],
    prerequisitesList: [
      { concept: "Binary Arithmetic", meaning: "Understanding 16-bit hex notation and 1's complement addition" },
      { concept: "IP Header Basics", meaning: "Familiarity with Source IP, Destination IP, and Protocol fields" }
    ],
    imageUrl: "assets/images/unit4/topic3-udp/udp-segment-header-format.svg",
    imageCaption: "Figure 4.10: UDP 8-Byte Fixed Header Format & 12-Byte IPv4 Pseudo-Header Architecture [Forouzan Figure 23.9 & 23.10]",
    sections: {
      overview: `
        <p class="mb-3">
          The UDP packet is officially known as a <strong>User Datagram</strong>. Its header is fixed at exactly <strong>8 bytes (64 bits)</strong>, divided cleanly into four 16-bit fields:
        </p>
        <div class="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-mono mb-4 text-center">
          [ Source Port (16b) ] [ Destination Port (16b) ]<br/>
          [ Total Length (16b) ] [ Checksum (16b) ]<br/>
          [ Application Data Payload (Variable Length) ... ]
        </div>
      `,
      howItWorks: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">1. The Four Header Fields Explained</h3>
        <div class="space-y-3 text-xs mb-4">
          <div class="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
            <strong class="text-blue-600 dark:text-blue-400">1. Source Port Number (16 Bits — Bits 0 to 15):</strong>
            <p class="mt-1 text-slate-600 dark:text-slate-300">Identifies the port of the sending process on the source host. If the client does not require a reply, this field can optionally be set to all zeros (<code>0x0000</code>). Otherwise, it holds the ephemeral port number of the sender.</p>
          </div>

          <div class="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
            <strong class="text-cyan-600 dark:text-cyan-400">2. Destination Port Number (16 Bits — Bits 16 to 31):</strong>
            <p class="mt-1 text-slate-600 dark:text-slate-300">Identifies the port of the receiving process on the destination host. Mandatory field. The receiver's operating system inspects this value to demultiplex the payload into the correct socket buffer.</p>
          </div>

          <div class="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
            <strong class="text-emerald-600 dark:text-emerald-400">3. Total Length (16 Bits — Bits 32 to 47):</strong>
            <p class="mt-1 text-slate-600 dark:text-slate-300">Specifies the total length of the user datagram in bytes, including both the <strong>8-byte header AND the data payload</strong>.</p>
            <div class="mt-1 font-mono text-[11px] text-slate-500">
              • Minimum Length = 8 bytes (when data payload is 0 bytes).<br/>
              • Maximum Theoretical Length = $2^{16} - 1 = 65,535\ \text{bytes}$.<br/>
              • Practical Maximum Payload = $65,535 - 8\ (\text{UDP}) - 20\ (\text{IPv4}) = 65,507\ \text{bytes}$.
            </div>
          </div>

          <div class="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
            <strong class="text-purple-600 dark:text-purple-400">4. Checksum (16 Bits — Bits 48 to 63):</strong>
            <p class="mt-1 text-slate-600 dark:text-slate-300">Provides end-to-end error detection over the entire user datagram (header + data) plus a 12-byte IP Pseudo-Header. In IPv4, this field is optional (set to all 0s if unused). In IPv6, it is strictly mandatory because IPv6 removed its own network-layer checksum!</p>
          </div>
        </div>
      `,
      technicalDetails: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">2. The 12-Byte IPv4 Pseudo-Header</h3>
        <p class="mb-3">
          A fundamental question arises: <em>Why does UDP incorporate IP layer fields into its checksum?</em>
        </p>
        <p class="mb-3">
          If an intermediate router malfunctions and corrupts the destination IP address in the IP header, the packet could be delivered to the wrong host computer. If that wrong computer happens to have a process listening on the same port number, it would mistakenly accept corrupted data!
        </p>
        <p class="mb-3">
          To prevent misdelivery, the sender constructs a <strong>12-byte Pseudo-Header</strong> in memory during checksum calculation:
        </p>
        <table class="wiki-table w-full text-xs mb-3">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-800">
              <th>Field</th>
              <th>Size</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td class="font-bold">Source IP Address</td><td>32 bits (4B)</td><td>IP address of the transmitting interface</td></tr>
            <tr><td class="font-bold">Destination IP Address</td><td>32 bits (4B)</td><td>IP address of the intended recipient host</td></tr>
            <tr><td class="font-bold">All Zeros (Padding)</td><td>8 bits (1B)</td><td>Reserved padding byte (0x00)</td></tr>
            <tr><td class="font-bold">Protocol</td><td>8 bits (1B)</td><td>Protocol number for UDP: <code>17</code> (0x11)</td></tr>
            <tr><td class="font-bold">UDP Length</td><td>16 bits (2B)</td><td>Duplicate copy of the UDP Total Length field</td></tr>
          </tbody>
        </table>
        <div class="p-2.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded text-xs">
          <strong>Important Rule:</strong> The Pseudo-Header is purely conceptual. It is used ONLY during checksum calculation in system memory and is <strong>NEVER transmitted over the network cable</strong>!
        </div>
      `,
      workedExamples: {
        level1: `
          <strong>Parsing a Hex Dump of a UDP Header (Wireshark Example):</strong><br/>
          Given the raw hex dump of an 8-byte UDP header:<br/>
          <code>CB 84 00 35 00 1C E2 A4</code><br/>
          • Bytes 0-1 (<code>CB 84</code>): Source Port = $0xCB84 = 52,100$<br/>
          • Bytes 2-3 (<code>00 35</code>): Destination Port = $0x0035 = 53$ (Standard DNS Server!)<br/>
          • Bytes 4-5 (<code>00 1C</code>): Total Length = $0x001C = 28$ bytes.<br/>
          • Payload Size = $28 - 8 = 20$ bytes of DNS query data.<br/>
          • Bytes 6-7 (<code>E2 A4</code>): Checksum = $0xE2A4$.
        `,
        level2: `
          <strong>Padding Odd-Length UDP Payloads:</strong><br/>
          Because checksum computation operates on 16-bit (2-byte) words, what happens if an application transmits an odd number of bytes (e.g. 15 bytes)?<br/>
          • 8 bytes (header) + 15 bytes (data) = 23 bytes (odd number).<br/>
          • The sender temporarily appends <strong>one byte of zeros (0x00)</strong> to the end of the data payload to make it 24 bytes (12 words).<br/>
          • The checksum is calculated over the padded data.<br/>
          • The padding byte is discarded immediately after calculation and is NOT transmitted over the network!
        `,
        level3: `
          <strong>The All-Zeros vs All-Ones Checksum Rule:</strong><br/>
          In 1's complement arithmetic, there are two representations of zero: $+0$ (all 0s: <code>0x0000</code>) and $-0$ (all 1s: <code>0xFFFF</code>).<br/>
          • In UDP (RFC 768), <code>0x0000</code> in the checksum field specifically means: <em>"The sender did NOT calculate a checksum (checksum disabled)."</em><br/>
          • Therefore, if the calculated checksum evaluates to <code>0x0000</code>, the sender must transmit <code>0xFFFF</code> (-0) instead so the receiver knows a valid checksum was calculated and evaluates to zero!
        `
      },
      advantagesLimitations: `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <h4 class="font-bold text-emerald-800 dark:text-emerald-300 mb-2">Advantages of 8-Byte Format</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Fixed 8-byte size allows instant parsing in router ASICs without options processing.</li>
              <li>Minimal header footprint maximises battery and radio efficiency for IoT and mobile.</li>
              <li>Pseudo-header prevents cross-host misdelivery errors.</li>
            </ul>
          </div>
          <div class="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800">
            <h4 class="font-bold text-rose-800 dark:text-rose-300 mb-2">Limitations</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>16-bit 1's complement checksum is mathematically weak compared to 32-bit CRC.</li>
              <li>Does not detect byte swaps or compensating bit inversions.</li>
            </ul>
          </div>
        </div>
      `,
      whereUsed: [
        "Network packet capture analysis (Wireshark, tcpdump)",
        "Embedded networking stacks in microcontrollers and Arduino",
        "Raw socket programming and scapy packet craft tools",
        "Deep packet inspection (DPI) firewalls"
      ],
      commonMistakes: `
        <ul class="space-y-2 text-xs">
          <li><strong>Confusing UDP Length with Data Length:</strong> The Length field in the UDP header represents <em>Header + Data</em>, NOT just data! It can never be less than 8.</li>
          <li><strong>Believing the pseudo-header is sent over the wire:</strong> The pseudo-header is generated only in memory during checksum calculation and is never included in the physical frame.</li>
        </ul>
      `,
      quiz: [
        {
          question: "What is the fixed size of a standard User Datagram Protocol (UDP) header?",
          options: [
            "4 bytes (32 bits)",
            "8 bytes (64 bits)",
            "20 bytes (160 bits)",
            "Variable from 20 to 60 bytes"
          ],
          answer: 1,
          explanation: "The UDP header has a fixed size of exactly 8 bytes (64 bits)."
        },
        {
          question: "What is the minimum valid value possible in the UDP Total Length field?",
          options: [
            "0 bytes",
            "8 bytes",
            "20 bytes",
            "64 bytes"
          ],
          answer: 1,
          explanation: "Because the Length field includes both the 8-byte header and data, when data is 0 bytes, the minimum length is 8 bytes."
        },
        {
          question: "Why does the UDP checksum calculation include an IP Pseudo-Header?",
          options: [
            "To encrypt the packet with the destination host's public key",
            "To verify that the packet reached the correct intended IP destination host and was not misdelivered",
            "To calculate the round-trip ping time to the server",
            "To compress the payload data"
          ],
          answer: 1,
          explanation: "The pseudo-header includes source and destination IP addresses, ensuring that corrupted IP headers that misdeliver packets to the wrong host are caught by the transport checksum."
        }
      ],
      references: [
        { cite: "RFC 768: User Datagram Protocol", url: "https://datatracker.ietf.org/doc/html/rfc768" },
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, Chapter 23.2: User Datagram Format, pp. 710-713", url: "" }
      ]
    }
  },

  "u4-udp-vs-tcp": {
    id: "u4-udp-vs-tcp",
    title: "UDP vs TCP",
    unit: "Unit 4 – Transport Layer",
    unitId: "unit4",
    level: "Level 1 — Fundamental",
    category: "transport",
    difficulty: "Core",
    readingTime: "20 min read",
    standard: "Forouzan Ch 23 / Tanenbaum Ch 6 / Kurose & Ross Ch 3",
    oneLiner: "Head-to-head comparison across 12 architectural parameters and practical criteria for selecting between TCP and UDP.",
    quickAnswer: "TCP and UDP represent the two fundamental transport layer protocols of the Internet suite, designed with completely opposing optimization goals: TCP prioritizes reliability, in-order delivery, flow control, and network safety (AIMD congestion control) at the cost of higher latency and header overhead (20–60 bytes); UDP prioritizes speed, simplicity, low latency, and zero connection overhead (8 bytes) at the cost of unreliability and best-effort delivery.",
    whyItMatters: "Choosing the correct transport protocol is one of the most consequential architectural decisions in software and systems engineering. Selecting TCP for an interactive multiplayer game causes terrible stuttering, while selecting UDP for financial transactions or database writes leads to catastrophic data loss. Understanding their exact trade-offs is essential for every computer scientist.",
    infobox: {
      prerequisites: ["u4-intro-udp", "u4-transport-services"],
      relatedConcepts: ["u4-intro-tcp", "u4-udp-segment-format", "u4-tcp-segment-header"],
      compareWith: ["tcp-vs-udp"],
      primaryUses: [
        "Architectural protocol selection for networked software",
        "Network performance troubleshooting and optimization",
        "QoS traffic prioritization in enterprise routers",
        "Standard university and competitive exam questions"
      ],
      standardRfc: "RFC 9293 (TCP), RFC 768 (UDP)"
    },
    learningObjectives: [
      "Compare TCP and UDP across all 12 key architectural and protocol dimensions",
      "Understand the trade-off between reliability/integrity vs. speed/timeliness",
      "Explain Head-of-Line (HoL) blocking and why it harms real-time media in TCP",
      "Evaluate practical decision matrices for selecting the appropriate transport protocol",
      "Analyze hybrid models (e.g. DNS using both UDP and TCP, QUIC over UDP)"
    ],
    prerequisitesList: [
      { concept: "UDP Fundamentals", meaning: "Understanding connectionless datagram delivery" },
      { concept: "TCP Fundamentals", meaning: "Understanding connection-oriented reliable byte streams" }
    ],
    imageUrl: "assets/images/unit4/topic3-udp/udp-vs-tcp-comparison.svg",
    imageCaption: "Figure 4.11: Comprehensive Visual Comparison Matrix — Transmission Control Protocol (TCP) vs. User Datagram Protocol (UDP)",
    sections: {
      overview: `
        <p class="mb-3">
          The TCP/IP architecture deliberately separates transport services into two complementary protocols:
        </p>
        <ul class="list-disc pl-5 space-y-1 text-xs mb-3">
          <li><strong>TCP (Transmission Control Protocol):</strong> The "Registered Courier" of the Internet. Guarantees delivery, tracks order, repairs errors, and adapts speed to avoid jamming network highways.</li>
          <li><strong>UDP (User Datagram Protocol):</strong> The "Express Postcard" of the Internet. Drops data into the network with zero delay and moves on immediately.</li>
        </ul>
      `,
      howItWorks: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">1. The Master 12-Point Comparison Matrix</h3>
        <table class="wiki-table w-full text-xs mb-4">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-800">
              <th>Dimension</th>
              <th>TCP (RFC 9293)</th>
              <th>UDP (RFC 768)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="font-bold">1. Connection Model</td>
              <td>Connection-Oriented (Requires 3-Way Handshake)</td>
              <td>Connectionless (0-RTT, no setup state)</td>
            </tr>
            <tr>
              <td class="font-bold">2. Reliability</td>
              <td>100% Reliable (Cumulative ACKs &amp; Retransmissions)</td>
              <td>Unreliable (Best-effort; dropped packets lost forever)</td>
            </tr>
            <tr>
              <td class="font-bold">3. Data Stream Model</td>
              <td>Byte-Stream (Continuous bytes; no message boundaries)</td>
              <td>Message-Oriented (Preserves discrete datagram boundaries)</td>
            </tr>
            <tr>
              <td class="font-bold">4. Header Size</td>
              <td>20 to 60 Bytes (Variable with options)</td>
              <td>Exactly 8 Bytes Fixed</td>
            </tr>
            <tr>
              <td class="font-bold">5. Sequencing / Ordering</td>
              <td>Guaranteed in-order delivery via Sequence Numbers</td>
              <td>No sequencing; packets may arrive out of order</td>
            </tr>
            <tr>
              <td class="font-bold">6. Flow Control</td>
              <td>Yes (Dynamic sliding window via <code>rwnd</code>)</td>
              <td>None (Sender transmits at application speed)</td>
            </tr>
            <tr>
              <td class="font-bold">7. Congestion Control</td>
              <td>Yes (AIMD, Slow Start, Congestion Avoidance)</td>
              <td>None (No network rate throttling)</td>
            </tr>
            <tr>
              <td class="font-bold">8. Delivery Modes</td>
              <td>Unicast Point-to-Point only (One-to-One)</td>
              <td>Unicast, Multicast, and Broadcast</td>
            </tr>
            <tr>
              <td class="font-bold">9. Transmission Speed</td>
              <td>Slower due to handshakes, ACKs, and header weight</td>
              <td>Ultra-fast with minimal latency</td>
            </tr>
            <tr>
              <td class="font-bold">10. Checksum Requirement</td>
              <td>Mandatory in both IPv4 and IPv6</td>
              <td>Optional in IPv4; Mandatory in IPv6</td>
            </tr>
            <tr>
              <td class="font-bold">11. State in Kernel</td>
              <td>Heavy TCB state (buffers, timers, sequence pointers)</td>
              <td>Stateless; lightweight memory footprint</td>
            </tr>
            <tr>
              <td class="font-bold">12. Typical Applications</td>
              <td>Web (HTTP/HTTPS), File Transfer (FTP), Email (SMTP), SSH</td>
              <td>DNS, VoIP, Live Video, Online Gaming, DHCP, NTP</td>
            </tr>
          </tbody>
        </table>
      `,
      technicalDetails: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">2. Practical Decision Matrix: When to Choose Which?</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mb-4">
          <div class="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h4 class="font-bold text-blue-800 dark:text-blue-300 mb-1">Choose TCP When:</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Every single byte must arrive accurately (e.g., source code, financial balance, database query).</li>
              <li>Data must be processed in the exact order transmitted.</li>
              <li>Handshake latency (1-RTT) is acceptable.</li>
              <li>Communication is strictly point-to-point unicast.</li>
            </ul>
          </div>
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg">
            <h4 class="font-bold text-emerald-800 dark:text-emerald-300 mb-1">Choose UDP When:</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Real-time responsiveness is paramount (video calls, online games).</li>
              <li>Occasional dropped packets cause only imperceptible glitches.</li>
              <li>Quick request-response exchanges (DNS queries completed in 1 RTT).</li>
              <li>Multicasting data to thousands of receivers simultaneously.</li>
            </ul>
          </div>
        </div>

        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">3. Case Study: Why DNS Uses BOTH UDP and TCP</h3>
        <p class="mb-3">
          A classic examination question: <em>Does DNS use UDP or TCP?</em>
        </p>
        <p class="text-xs mb-3">
          <strong>Answer: DNS uses BOTH!</strong>
        </p>
        <ul class="list-disc pl-5 space-y-1 text-xs mb-3">
          <li><strong>Standard DNS Queries (UDP Port 53):</strong> Regular domain lookups (e.g. resolving <code>google.com</code>) fit within a single 512-byte UDP packet. UDP is chosen for speed and low server overhead.</li>
          <li><strong>DNS Zone Transfers (TCP Port 53):</strong> Replicating an entire DNS database between primary and secondary name servers involves large volumes of records where 100% data integrity and reliability are mandatory. DNS switches to TCP!</li>
        </ul>
      `,
      workedExamples: {
        level1: `
          <strong>Examining Head-of-Line (HoL) Blocking:</strong><br/>
          Suppose a client requests 3 images over a single connection: Image A, B, and C.<br/>
          • In TCP, all images are multiplexed into one stream. If a packet containing bytes for Image A is dropped, the OS kernel freezes the entire stream! The browser cannot display Image B or C, even though they arrived safely!<br/>
          • In modern UDP-based HTTP/3 (QUIC), each image runs on an independent datagram stream. Dropping a packet for Image A has ZERO impact on Image B and C!
        `,
        level2: `
          <strong>Throughput Comparison over a Lossy Wireless Link:</strong><br/>
          Consider a satellite link with 2% random packet loss and 500ms RTT:<br/>
          • <strong>TCP:</strong> Every time a packet drops, TCP interprets it as congestion, halves its congestion window (AIMD), and stalls for 500ms waiting for retransmissions. Throughput collapses to &lt; 1 Mbps.<br/>
          • <strong>UDP:</strong> Continues transmitting at full wire rate. The application loses 2% of video frames, but maintains a smooth 20 Mbps video feed!
        `
      },
      advantagesLimitations: `
        <div class="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
          <strong class="text-slate-900 dark:text-white font-bold">Key Architectural Takeaway:</strong>
          <p class="mt-1 text-slate-600 dark:text-slate-300">TCP trades away raw performance and predictability to achieve perfect reliability and network safety. UDP trades away reliability to achieve minimum latency and maximum control. Neither protocol is universally "better"; each is optimal for its intended workload.</p>
        </div>
      `,
      whereUsed: [
        "Network architecture design reviews",
        "Cloud API transport protocol selection (gRPC over HTTP/2 vs WebSockets vs WebTransport over HTTP/3)",
        "Video streaming CDN configurations",
        "Computer networks university exams and technical interviews"
      ],
      commonMistakes: `
        <ul class="space-y-2 text-xs">
          <li><strong>Assuming TCP is always better than UDP:</strong> TCP is worse for real-time media because retransmission latency causes unacceptable audio/video freezing.</li>
          <li><strong>Thinking UDP cannot be made reliable:</strong> Reliability can be implemented in the application layer on top of UDP when needed (e.g. TFTP, QUIC).</li>
        </ul>
      `,
      quiz: [
        {
          question: "Which of the following is a primary reason video conferencing and online gaming prefer UDP over TCP?",
          options: [
            "UDP headers are 60 bytes larger than TCP headers",
            "TCP retransmissions introduce unpredictable latency and Head-of-Line blocking",
            "UDP encrypts video streams automatically",
            "TCP does not support IPv6"
          ],
          answer: 1,
          explanation: "TCP retransmission delays and Head-of-Line blocking cause unacceptable stutter and lag in real-time multimedia."
        },
        {
          question: "When does the Domain Name System (DNS) switch from UDP to TCP?",
          options: [
            "When resolving .com domains",
            "When performing large Zone Transfers between DNS servers or when responses exceed UDP limits",
            "During nighttime hours",
            "When using wireless Wi-Fi connections"
          ],
          answer: 1,
          explanation: "DNS uses TCP port 53 for large Zone Transfers between authoritative servers and when response payloads exceed UDP size limits."
        },
        {
          question: "What is the header size comparison between TCP and UDP?",
          options: [
            "TCP is 8 bytes; UDP is 20 bytes",
            "TCP is 20 to 60 bytes; UDP is 8 bytes fixed",
            "Both headers are exactly 20 bytes",
            "Both headers are exactly 8 bytes"
          ],
          answer: 1,
          explanation: "UDP has an 8-byte fixed header; TCP has a 20-byte base header that can expand up to 60 bytes with options."
        }
      ],
      references: [
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, Chapter 23: Process-to-Process Delivery", url: "" },
        { cite: "Andrew S. Tanenbaum, Computer Networks, 5th Ed., Chapter 6: The Transport Layer", url: "" }
      ]
    }
  }
};

module.exports = { TOPIC3_ITEMS };
console.log("Topic 3 builder module defined!");

