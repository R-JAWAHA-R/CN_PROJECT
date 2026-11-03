/**
 * Unit 4 Topic 1 Builder: Transport Layer Services and Berkeley Sockets
 * Subtopics:
 * 1. u4-transport-services (alias: transport-layer)
 * 2. u4-berkeley-sockets
 * 3. u4-socket-programming-example
 */

const TOPIC1_ITEMS = {
  "u4-transport-services": {
    id: "u4-transport-services",
    title: "Transport Layer Services",
    unit: "Unit 4 – Transport Layer",
    unitId: "unit4",
    level: "Level 1 — Fundamental",
    category: "transport",
    difficulty: "Core",
    readingTime: "20 min read",
    standard: "RFC 9293 / RFC 768 / Forouzan 4th Ed. Ch 23.1, pp. 703-709 / Tanenbaum Ch 6.1",
    oneLiner: "Core end-to-end transport layer responsibilities providing process-to-process communication, port addressing, multiplexing, and flow/error control.",
    quickAnswer: "The Transport Layer is the fourth layer of the OSI reference model (and the heart of the TCP/IP suite). It provides true end-to-end, process-to-process communication between specific application programs running on different hosts across a network. It bridges the gap between unreliable, host-to-host network layer packet routing and the reliable, seamless communication demanded by application layer services.",
    whyItMatters: "While the Network Layer delivers IP packets from one computer to another, a modern computer runs dozens of network applications simultaneously (e.g., a web browser, Spotify, Zoom, and an email client). Without the Transport Layer's 16-bit port numbers and multiplexing/demultiplexing mechanisms, operating systems would have no way to determine which incoming data packet belongs to which running program.",
    infobox: {
      prerequisites: ["osi-model", "ip-addressing"],
      relatedConcepts: ["u4-berkeley-sockets", "u4-transport-addressing", "u4-intro-udp", "u4-intro-tcp"],
      compareWith: ["network-layer-vs-transport-layer"],
      primaryUses: [
        "Process-to-process packet demultiplexing via 16-bit port numbers",
        "Connection management (handshake establishment and graceful teardown)",
        "End-to-end reliability (byte sequencing, checksum verification, retransmissions)",
        "Flow control (matching sender transmission rate with receiver buffer capacity)",
        "Congestion control (protecting the global Internet subnet from traffic collapse)"
      ],
      standardRfc: "RFC 9293 (TCP), RFC 768 (UDP), Forouzan Chapter 23.1"
    },
    learningObjectives: [
      "Distinguish between node-to-node (DLL), host-to-host (Network), and process-to-process (Transport) delivery models",
      "Explain the client-server paradigm and why ephemeral ports are paired with well-known service ports",
      "Understand the mechanics of Transport Layer Multiplexing at sender and Demultiplexing at receiver",
      "Contrast connectionless transport service (UDP) with connection-oriented transport service (TCP)",
      "Analyze the 5 primary transport responsibilities: addressing, connection control, flow control, error control, and congestion control"
    ],
    prerequisitesList: [
      { concept: "OSI Reference Model", meaning: "Understanding Layer 3 Network Layer vs Layer 4 Transport Layer boundaries" },
      { concept: "IP Addressing", meaning: "Knowledge of 32-bit IPv4 addresses identifying network host interfaces" }
    ],
    imageUrl: "assets/images/unit4/topic1-services-sockets/transport-services-deliveries.svg",
    imageCaption: "Figure 4.1: Three Types of Data Deliveries — Node-to-Node (DLL), Host-to-Host (Network), and Process-to-Process (Transport) [Forouzan Figure 23.1]",
    sections: {
      overview: `
        <p class="mb-3">
          In computer networking, communication does not merely take place between two computing machines; it takes place between <strong>specific software processes</strong> running on those machines. A user browsing the web using Chrome is communicating specifically with an Apache or NGINX web server process running on a remote host, while an SSH client in a background terminal communicates with an <code>sshd</code> daemon on the exact same server.
        </p>
        <p class="mb-3">
          The <strong>Transport Layer (OSI Layer 4)</strong> is responsible for delivering data from the sending application process directly to the receiving application process. This true end-to-end communication model is formally termed <strong>process-to-process delivery</strong>.
        </p>
        <div class="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs font-mono mb-3">
          • Node-to-Node (Data Link Layer): Hop-by-hop between adjacent network interfaces using 48-bit MAC addresses.<br/>
          • Host-to-Host (Network Layer): Source-to-destination between computers across routers using 32-bit IP addresses.<br/>
          • Process-to-Process (Transport Layer): End-to-end between communicating application threads using 16-bit Port numbers!
        </div>
      `,
      howItWorks: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">1. The Client-Server Paradigm</h3>
        <p class="mb-3">
          Process-to-process communication typically follows the <strong>Client-Server architecture</strong>:
        </p>
        <ul class="list-disc pl-5 space-y-1.5 text-xs mb-4">
          <li><strong>Server Process:</strong> A long-running program that starts execution at system boot and passively listens on a known port (e.g., port 80 for HTTP, port 443 for HTTPS, port 22 for SSH). It waits for incoming service requests from clients.</li>
          <li><strong>Client Process:</strong> A local program initiated by a user that requires a remote service (e.g., a web browser requesting an HTML page). The client initiates an active connection request to the server.</li>
        </ul>

        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">2. Multiplexing and Demultiplexing</h3>
        <p class="mb-3">
          At any given instant, a single host machine may have dozens of active network processes generating and consuming data simultaneously. The Transport Layer handles this via <strong>Multiplexing</strong> and <strong>Demultiplexing</strong>:
        </p>
        <div class="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs space-y-1.5 mb-4 font-mono">
          <div>1. Multiplexing (Sender Side): The transport layer gathers data from multiple socket interfaces, encapsulates each chunk with a transport header containing the appropriate source and destination port numbers, and passes the resulting segments down to the single Network Layer (IP).</div>
          <div>2. Transmission: The Network Layer wraps each segment in an IP datagram and routes it across routers to the destination IP address.</div>
          <div>3. Demultiplexing (Receiver Side): The receiver's transport layer inspects the destination port number in the incoming segment header, identifies the destination socket, and directs the data payload directly to that specific application process buffer.</div>
        </div>

        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">3. Connectionless vs. Connection-Oriented Service</h3>
        <p class="mb-3">
          The transport layer can deliver its services using two fundamentally different operational models:
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mb-3">
          <div class="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h4 class="font-bold text-blue-800 dark:text-blue-300 mb-1">Connectionless Service (UDP)</h4>
            <p>Treats each packet as an independent datagram. No handshake precedes transmission; no state is preserved; no acknowledgments are sent. Offers ultra-low overhead and zero connection latency.</p>
          </div>
          <div class="p-3 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg">
            <h4 class="font-bold text-purple-800 dark:text-purple-300 mb-1">Connection-Oriented Service (TCP)</h4>
            <p>Requires a 3-way handshake to establish a synchronized virtual connection before data can flow. Preserves state, guarantees in-order byte delivery, manages sender and receiver sliding windows, and terminates via a graceful 4-way release.</p>
          </div>
        </div>
      `,
      technicalDetails: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">4. Primary Transport Layer Responsibilities</h3>
        <p class="mb-3">
          As defined in Forouzan Section 23.1, a transport layer protocol can provide up to 5 critical service functions:
        </p>
        <table class="wiki-table w-full text-xs mb-4">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-800">
              <th>Service Function</th>
              <th>Technical Mechanism</th>
              <th>Provided By UDP?</th>
              <th>Provided By TCP?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="font-bold">Port Addressing</td>
              <td>16-bit Port numbers (0–65,535) identifying processes</td>
              <td class="text-emerald-600 font-bold">Yes (8-byte header)</td>
              <td class="text-emerald-600 font-bold">Yes (20-byte header)</td>
            </tr>
            <tr>
              <td class="font-bold">Connection Management</td>
              <td>3-Way Handshake (SYN/ACK) and 4-Way Teardown (FIN/ACK)</td>
              <td class="text-rose-600 font-bold">No (Connectionless)</td>
              <td class="text-emerald-600 font-bold">Yes (State Machine)</td>
            </tr>
            <tr>
              <td class="font-bold">Reliable Delivery</td>
              <td>Byte sequence numbers, cumulative ACKs, checksum, retransmit timers</td>
              <td class="text-rose-600 font-bold">No (Best effort only)</td>
              <td class="text-emerald-600 font-bold">Yes (100% Guaranteed)</td>
            </tr>
            <tr>
              <td class="font-bold">Flow Control</td>
              <td>Advertised Receive Window (<code>rwnd</code>) protecting receiver buffer</td>
              <td class="text-rose-600 font-bold">No</td>
              <td class="text-emerald-600 font-bold">Yes (Sliding Window)</td>
            </tr>
            <tr>
              <td class="font-bold">Congestion Control</td>
              <td>AIMD algorithm, Slow Start, Congestion Window (<code>cwnd</code>)</td>
              <td class="text-rose-600 font-bold">No (Sends at app rate)</td>
              <td class="text-emerald-600 font-bold">Yes (RFC 5681)</td>
            </tr>
          </tbody>
        </table>
      `,
      workedExamples: {
        level1: `
          <strong>Identifying Communicating Endpoints (Socket Address):</strong><br/>
          A client browser with IP <code>192.168.1.50</code> requests a webpage from server IP <code>93.184.216.34</code> on standard HTTPS.<br/>
          • Client allocates an ephemeral port: <code>54321</code>.<br/>
          • Server listens on well-known port: <code>443</code>.<br/>
          <strong>Client Socket Address:</strong> <code>192.168.1.50:54321</code><br/>
          <strong>Server Socket Address:</strong> <code>93.184.216.34:443</code><br/>
          <strong>Unique Connection 4-Tuple:</strong> <code>(192.168.1.50, 54321, 93.184.216.34, 443)</code>. This 4-tuple uniquely identifies the transport session globally across the entire Internet!
        `,
        level2: `
          <strong>Multiplexing Multiple Browser Tabs on the Same Machine:</strong><br/>
          A user opens two separate tabs in Chrome, both visiting <code>google.com</code> (IP <code>142.250.190.46:443</code>).<br/>
          • Tab 1 Socket: <code>192.168.1.50:50001</code> ↔ <code>142.250.190.46:443</code><br/>
          • Tab 2 Socket: <code>192.168.1.50:50002</code> ↔ <code>142.250.190.46:443</code><br/>
          When Google's server responds, the destination IP address on both packets is <code>192.168.1.50</code>. However, the client's OS inspects the destination port number (50001 vs 50002) and demultiplexes Tab 1's webpage data to Tab 1, and Tab 2's webpage data to Tab 2 without any crosstalk!
        `,
        level3: `
          <strong>Port Number Exhaustion Calculation:</strong><br/>
          A single NAT gateway has one public IPv4 address and communicates with a specific remote server on port 443.<br/>
          • The dynamic/ephemeral port range consists of ports 49,152 to 65,535.<br/>
          • Total simultaneous outgoing connections possible to that exact same destination IP:Port = <code>65,535 - 49,152 + 1 = 16,384 connections</code>.<br/>
          • If the NAT gateway uses all registered and ephemeral ports (1024 to 65,535): <code>65,535 - 1024 + 1 = 64,512 simultaneous connections</code>.
        `
      },
      advantagesLimitations: `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <h4 class="font-bold text-emerald-800 dark:text-emerald-300 mb-2">Advantages of Transport Layer Architecture</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Decouples application design from physical network routing details.</li>
              <li>Allows thousands of concurrent processes to share a single network interface and IP.</li>
              <li>Provides flexible reliability trade-offs (speed with UDP vs perfect order with TCP).</li>
              <li>Prevents fast senders from overwhelming slow receivers via flow control buffers.</li>
            </ul>
          </div>
          <div class="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800">
            <h4 class="font-bold text-rose-800 dark:text-rose-300 mb-2">Operational Challenges</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>TCP 3-way handshake adds latency (1 RTT) before application data can be sent.</li>
              <li>Head-of-Line (HoL) blocking in TCP stalls all stream bytes if one packet is lost.</li>
              <li>Network address translation (NAT) complicates peer-to-peer transport connections.</li>
            </ul>
          </div>
        </div>
      `,
      whereUsed: [
        "Web Browsing (HTTP/HTTPS over TCP port 80/443)",
        "Domain Name Resolution (DNS queries over UDP port 53)",
        "Real-Time Media & Voice over IP (RTP/SIP over UDP)",
        "Secure Shell Access (SSH over TCP port 22)",
        "Email Transmission & Retrieval (SMTP port 25, IMAP port 143)"
      ],
      commonMistakes: `
        <ul class="space-y-2 text-xs">
          <li><strong>Confusing Host-to-Host with Process-to-Process delivery:</strong> The Network Layer gets packets to the correct machine, but only the Transport Layer port numbers direct the payload to the intended software process.</li>
          <li><strong>Believing UDP does not use port numbers:</strong> Both TCP and UDP use 16-bit port numbers identically for demultiplexing!</li>
          <li><strong>Assuming the Transport Layer operates on intermediate routers:</strong> Standard routers only examine Layer 1, 2, and 3 headers. Transport headers are processed strictly end-to-end at the communicating endpoints.</li>
        </ul>
      `,
      quiz: [
        {
          question: "Which layer of the OSI model is responsible for true process-to-process delivery?",
          options: [
            "Data Link Layer",
            "Network Layer",
            "Transport Layer",
            "Application Layer"
          ],
          answer: 2,
          explanation: "The Transport Layer (Layer 4) provides true end-to-end process-to-process communication using 16-bit port numbers."
        },
        {
          question: "What information uniquely identifies an active TCP connection across the entire Internet?",
          options: [
            "Source MAC address and Destination MAC address",
            "Source IP address and Destination IP address",
            "4-Tuple: (Source IP, Source Port, Destination IP, Destination Port)",
            "Sequence number and Acknowledgment number"
          ],
          answer: 2,
          explanation: "A transport connection is uniquely defined by a 4-tuple comprising the source IP, source port, destination IP, and destination port."
        },
        {
          question: "What is the primary role of Demultiplexing at the receiving transport layer?",
          options: [
            "Translating domain names into 32-bit IP addresses",
            "Directing incoming segment payloads to the specific socket of the target process based on port numbers",
            "Encrypting the data using SSL/TLS algorithms",
            "Calculating the shortest path across intermediate routers"
          ],
          answer: 1,
          explanation: "Demultiplexing uses the destination port number in the transport header to route data to the correct application socket buffer."
        },
        {
          question: "Which of the following functions is provided by TCP but NOT by UDP?",
          options: [
            "Process-to-process addressing using port numbers",
            "Error detection via 16-bit checksum",
            "Flow control using a sliding window and congestion control",
            "Encapsulation inside IP packets"
          ],
          answer: 2,
          explanation: "TCP provides flow control (rwnd) and congestion control (cwnd), whereas UDP offers no flow control or congestion control."
        }
      ],
      references: [
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th/5th Ed., Chapter 23.1: Process-to-Process Delivery, pp. 703-709", url: "" },
        { cite: "RFC 9293: Transmission Control Protocol (TCP) Specification (STD 7)", url: "https://datatracker.ietf.org/doc/html/rfc9293" },
        { cite: "RFC 768: User Datagram Protocol (UDP)", url: "https://datatracker.ietf.org/doc/html/rfc768" },
        { cite: "Andrew S. Tanenbaum, Computer Networks, 5th Ed., Chapter 6: The Transport Layer", url: "" }
      ]
    }
  },

  "u4-berkeley-sockets": {
    id: "u4-berkeley-sockets",
    title: "Berkeley Sockets",
    unit: "Unit 4 – Transport Layer",
    unitId: "unit4",
    level: "Level 2 — Core Architecture",
    category: "transport",
    difficulty: "Core",
    readingTime: "25 min read",
    standard: "POSIX.1-2001 / BSD 4.2 / Tanenbaum Ch 6.1.2 / Forouzan Section 23.1",
    oneLiner: "Standard application programming interface (API) providing an abstraction of communication endpoints for network software development.",
    quickAnswer: "The Berkeley Sockets API (also known as BSD Sockets or POSIX Sockets) is the standard programming abstraction for network communication. Introduced in 1983 in 4.2BSD Unix, a socket serves as an operating system endpoint through which application processes send and receive data across a network using standard file descriptor semantics (reading and writing like a file).",
    whyItMatters: "Almost all modern networked software—from web browsers, databases, and microservices to mobile apps and cloud hypervisors—relies on Berkeley Sockets or direct abstractions built on top of it. It established the standard operational lifecycle (`socket`, `bind`, `listen`, `accept`, `connect`, `send`, `recv`, `close`) that enables programmers to write networked software without needing to manipulate raw network card hardware or packet headers directly.",
    infobox: {
      prerequisites: ["u4-transport-services"],
      relatedConcepts: ["u4-socket-programming-example", "u4-transport-addressing", "u4-intro-tcp"],
      compareWith: ["stream-sockets-vs-datagram-sockets"],
      primaryUses: [
        "Network communication endpoint creation in application software",
        "Stream communication using TCP (SOCK_STREAM)",
        "Datagram communication using UDP (SOCK_DGRAM)",
        "Network diagnostic tools and protocol development using Raw Sockets (SOCK_RAW)",
        "Inter-process communication (IPC) on the same host using Unix Domain Sockets"
      ],
      standardRfc: "POSIX.1-2008 / IEEE Std 1003.1, BSD 4.2 Unix Specifications"
    },
    learningObjectives: [
      "Understand the socket abstraction as a communication endpoint identified by IP and Port",
      "Explain the standard socket types: SOCK_STREAM (TCP), SOCK_DGRAM (UDP), and SOCK_RAW",
      "Trace the 6 core server-side socket system calls: socket(), bind(), listen(), accept(), recv(), close()",
      "Trace the 4 core client-side socket system calls: socket(), connect(), send(), close()",
      "Differentiate active client sockets from passive server listening sockets"
    ],
    prerequisitesList: [
      { concept: "Transport Layer Services", meaning: "Understanding process-to-process delivery and port addressing" },
      { concept: "Operating System File Descriptors", meaning: "Knowledge that Unix treats network sockets as integer file handles" }
    ],
    imageUrl: "assets/images/unit4/topic1-services-sockets/berkeley-sockets-architecture.svg",
    imageCaption: "Figure 4.2: Berkeley Sockets API Client-Server Interaction Sequence Flowchart",
    sections: {
      overview: `
        <p class="mb-3">
          In operating systems derived from Unix, an overarching philosophy is that <em>"everything is a file."</em> When an application reads from the keyboard, writes to a disk drive, or displays output to a terminal, it performs standard file operations (open, read, write, close) using an integer <strong>file descriptor</strong>.
        </p>
        <p class="mb-3">
          In 1983, computer scientists at UC Berkeley extended this file abstraction to networking by creating the <strong>Berkeley Sockets API</strong> (introduced in 4.2BSD Unix). A <strong>socket</strong> is a software endpoint for network communication. Once created, a socket allows an application process to send and receive data across a network as easily as reading from or writing to an open file.
        </p>
        <div class="p-3 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 rounded-lg text-xs font-mono mb-3">
          Socket Endpoint = Local IP Address + Local Port Number + Transport Protocol (TCP/UDP)<br/>
          Full Connection = (Source IP, Source Port) ↔ (Destination IP, Destination Port)
        </div>
      `,
      howItWorks: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">1. The Three Primary Socket Types</h3>
        <p class="mb-3">
          When an application initializes a socket, it must specify the address family (e.g., <code>AF_INET</code> for IPv4, <code>AF_INET6</code> for IPv6) and the socket type:
        </p>
        <div class="space-y-3 text-xs mb-4">
          <div class="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
            <strong class="text-blue-600 dark:text-blue-400">A. Stream Sockets (<code>SOCK_STREAM</code> — TCP):</strong>
            <p class="mt-1 text-slate-600 dark:text-slate-300">Provides reliable, two-way, sequenced, and duplicated-free byte streams. Uses TCP under the hood. Requires connection establishment before data transfer. Does not preserve record boundaries.</p>
          </div>
          <div class="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
            <strong class="text-emerald-600 dark:text-emerald-400">B. Datagram Sockets (<code>SOCK_DGRAM</code> — UDP):</strong>
            <p class="mt-1 text-slate-600 dark:text-slate-300">Provides connectionless, unreliable messages of a fixed maximum length. Uses UDP under the hood. Preserves exact message boundaries. Zero handshake latency.</p>
          </div>
          <div class="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
            <strong class="text-amber-600 dark:text-amber-400">C. Raw Sockets (<code>SOCK_RAW</code>):</strong>
            <p class="mt-1 text-slate-600 dark:text-slate-300">Provides direct access to lower-layer protocols (e.g., ICMP, raw IP). Allows applications to craft custom packet headers. Requires superuser (root/administrator) privileges (e.g., <code>ping</code> and <code>traceroute</code>).</p>
          </div>
        </div>

        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">2. Core Berkeley Socket System Calls</h3>
        <p class="mb-3">
          The Berkeley Sockets API provides a standardized set of C functions defined in <code>&lt;sys/socket.h&gt;</code>:
        </p>
        <table class="wiki-table w-full text-xs mb-4">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-800">
              <th>System Call</th>
              <th>Side</th>
              <th>Purpose &amp; Operation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="font-mono font-bold text-blue-600">socket()</td>
              <td>Both</td>
              <td>Allocates an OS communication endpoint and returns a file descriptor (<code>sockfd</code>).</td>
            </tr>
            <tr>
              <td class="font-mono font-bold text-purple-600">bind()</td>
              <td>Server</td>
              <td>Assigns a local IP address and specific port number to the socket.</td>
            </tr>
            <tr>
              <td class="font-mono font-bold text-purple-600">listen()</td>
              <td>Server</td>
              <td>Marks the socket as passive; specifies the backlog queue size for pending connections.</td>
            </tr>
            <tr>
              <td class="font-mono font-bold text-purple-600">accept()</td>
              <td>Server</td>
              <td>Blocks until an incoming client connection arrives; returns a <em>new dedicated socket descriptor</em> (<code>newsockfd</code>) for that client.</td>
            </tr>
            <tr>
              <td class="font-mono font-bold text-blue-600">connect()</td>
              <td>Client</td>
              <td>Initiates the active TCP 3-way handshake with the remote server's IP and port.</td>
            </tr>
            <tr>
              <td class="font-mono font-bold">send() / write()</td>
              <td>Both</td>
              <td>Transmits payload bytes into the socket's kernel output buffer.</td>
            </tr>
            <tr>
              <td class="font-mono font-bold">recv() / read()</td>
              <td>Both</td>
              <td>Extracts received payload bytes from the socket's kernel input buffer.</td>
            </tr>
            <tr>
              <td class="font-mono font-bold text-rose-600">close()</td>
              <td>Both</td>
              <td>Terminates the connection (triggers FIN release in TCP) and releases the file descriptor.</td>
            </tr>
          </tbody>
        </table>
      `,
      technicalDetails: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">3. The Dual Socket Mechanism in TCP Servers</h3>
        <p class="mb-3">
          One of the most important concepts in socket programming is the distinction between the <strong>Listening Socket</strong> and the <strong>Connected Socket</strong>:
        </p>
        <div class="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs space-y-2 mb-4 font-mono">
          <div>• Listening Socket (sockfd): Created by socket(), bound to port 80, and placed in listen() mode. Its ONLY purpose is to act as a receptionist, listening for new client connection attempts. It NEVER transfers application data!</div>
          <div>• Connected Socket (newsockfd): Returned by accept() when a client connects. The OS creates this separate, dedicated socket descriptor exclusively for communicating with that specific client. The listening socket immediately returns to waiting for new clients!</div>
        </div>
        <p class="text-xs text-slate-500 mb-3">
          This dual-socket architecture allows multi-threaded or multi-process servers to handle thousands of concurrent clients simultaneously on a single well-known port (e.g., port 80).
        </p>
      `,
      workedExamples: {
        level1: `
          <strong>Constructing a Socket Address Structure in C:</strong><br/>
          In C socket programming, IPv4 addresses are specified using <code>struct sockaddr_in</code>:<br/>
          <pre class="bg-slate-900 text-emerald-400 p-2 rounded text-[11px] font-mono mt-1">
struct sockaddr_in server_addr;
server_addr.sin_family = AF_INET;                // IPv4 address family
server_addr.sin_port = htons(8080);               // Host-to-Network short (port 8080)
server_addr.sin_addr.s_addr = INADDR_ANY;        // Bind to all available local network interfaces
memset(&(server_addr.sin_zero), 0, 8);           // Zero out padding bytes</pre>
          <code>htons()</code> (Host to Network Short) ensures that numbers are stored in standard <strong>Big-Endian network byte order</strong> regardless of the host CPU architecture.
        `,
        level2: `
          <strong>Tracing the accept() System Call Queue:</strong><br/>
          A web server executes <code>listen(sockfd, 5)</code>. The operating system kernel maintains two queues for the socket:<br/>
          1. <strong>Incomplete Connection Queue (SYN Queue):</strong> Holds connections that have sent SYN and received SYN+ACK, but have not yet completed the 3rd ACK step (in SYN_RCVD state).<br/>
          2. <strong>Completed Connection Queue (Accept Queue):</strong> Holds established connections that completed the 3-Way Handshake but have not yet been accepted by the application code via <code>accept()</code>.<br/>
          When the application calls <code>accept()</code>, it pulls the next completed connection from the Accept Queue and creates a new <code>newsockfd</code>.
        `,
        level3: `
          <strong>Handling the "Address Already in Use" Error (SO_REUSEADDR):</strong><br/>
          When a TCP server is abruptly restarted, restarting the application often triggers the error: <code>bind: Address already in use</code>.<br/>
          • Cause: The previous server socket is still lingering in the <code>TIME_WAIT</code> state (duration 2MSL = 1–2 minutes).<br/>
          • Solution: Set the <code>SO_REUSEADDR</code> socket option before calling <code>bind()</code>:<br/>
          <pre class="bg-slate-900 text-emerald-400 p-2 rounded text-[11px] font-mono mt-1">
int opt = 1;
setsockopt(sockfd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));</pre>
          This instructs the OS kernel to allow immediate re-binding to the port even if connections are lingering in TIME_WAIT.
        `
      },
      advantagesLimitations: `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <h4 class="font-bold text-emerald-800 dark:text-emerald-300 mb-2">Advantages of Berkeley Sockets API</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Universal standard implemented across Linux, Unix, macOS, Windows (Winsock), and mobile OSs.</li>
              <li>Reuses Unix file descriptor semantics (read/write/close).</li>
              <li>Provides protocol independence (supports IPv4, IPv6, Bluetooth, Unix domain IPC).</li>
              <li>Enables highly scalable I/O multiplexing models via <code>select()</code>, <code>poll()</code>, and <code>epoll()</code>.</li>
            </ul>
          </div>
          <div class="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800">
            <h4 class="font-bold text-rose-800 dark:text-rose-300 mb-2">API Limitations</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Blocking I/O by default can freeze application threads without non-blocking flags.</li>
              <li>Verbose boilerplate code required in C to initialize address structures and error handling.</li>
              <li>Does not automatically handle message delimitation in stream mode (SOCK_STREAM).</li>
            </ul>
          </div>
        </div>
      `,
      whereUsed: [
        "Web server software: Nginx, Apache HTTP Server, Node.js runtime",
        "Database backends: PostgreSQL, MySQL, Redis, MongoDB connection pools",
        "Operating system kernels: Linux TCP/IP network stack",
        "Network utilities: curl, wget, netcat, openssh",
        "Cross-platform high-level language standard libraries: Python socket, Java java.net.Socket, Go net package"
      ],
      commonMistakes: `
        <ul class="space-y-2 text-xs">
          <li><strong>Confusing the listening socket with the connected socket:</strong> Forgetting that <code>accept()</code> returns a brand-new file descriptor, and trying to read application data from the original listening socket descriptor.</li>
          <li><strong>Forgetting Host-to-Network Byte Order conversion:</strong> Passing port numbers directly in native x86 little-endian format instead of wrapping with <code>htons()</code>.</li>
          <li><strong>Assuming a single recv() reads the entire message:</strong> In TCP stream sockets, data can be fragmented into multiple packets. Software must loop calling <code>recv()</code> until a designated delimiter or expected byte count is reached.</li>
        </ul>
      `,
      quiz: [
        {
          question: "Which system call places a TCP server socket into a passive state waiting for incoming connection attempts?",
          options: [
            "bind()",
            "listen()",
            "accept()",
            "connect()"
          ],
          answer: 1,
          explanation: "listen() marks the socket as passive and establishes the backlog queue for incoming connections."
        },
        {
          question: "What does the accept() system call return upon successfully handling an incoming client?",
          options: [
            "An integer 0 indicating success",
            "The client's MAC address",
            "A brand-new socket file descriptor dedicated exclusively to that connected client",
            "The total number of bytes in the client's payload"
          ],
          answer: 2,
          explanation: "accept() allocates and returns a new connected socket descriptor (newsockfd) dedicated to the client, leaving the original socket free to listen for more connections."
        },
        {
          question: "Which socket type corresponds to the reliable byte-stream protocol provided by TCP?",
          options: [
            "SOCK_DGRAM",
            "SOCK_RAW",
            "SOCK_STREAM",
            "SOCK_SEQPACKET"
          ],
          answer: 2,
          explanation: "SOCK_STREAM specifies a sequenced, reliable, two-way, connection-based byte stream (TCP)."
        },
        {
          question: "Why must the htons() function be called when assigning a port number to a socket address structure?",
          options: [
            "To encrypt the port number against eavesdroppers",
            "To convert the port number from host byte order to standard big-endian network byte order",
            "To verify that the port number is not already bound by another process",
            "To allocate the port in kernel memory"
          ],
          answer: 1,
          explanation: "htons() (Host to Network Short) converts 16-bit integers from host byte order (often little-endian on x86) to big-endian network byte order."
        }
      ],
      references: [
        { cite: "IEEE Std 1003.1 (POSIX.1-2008): System Interfaces, Section: socket, bind, listen, accept", url: "https://pubs.opengroup.org/onlinepubs/9699919799/" },
        { cite: "W. Richard Stevens, Bill Fenner, Andrew M. Rudoff, UNIX Network Programming, Volume 1: The Sockets Networking API, 3rd Ed., Addison-Wesley", url: "" },
        { cite: "Andrew S. Tanenbaum, Computer Networks, 5th Ed., Section 6.1.2: The Berkeley Sockets API", url: "" }
      ]
    }
  },

  "u4-socket-programming-example": {
    id: "u4-socket-programming-example",
    title: "Socket Programming Example",
    unit: "Unit 4 – Transport Layer",
    unitId: "unit4",
    level: "Level 2 — Core Architecture",
    category: "transport",
    difficulty: "Core",
    readingTime: "30 min read",
    standard: "POSIX.1 / Python 3 socket / RFC 9293 / Stevens Network Programming Ch 4-5",
    oneLiner: "Step-by-step practical implementation of TCP and UDP client-server applications with complete annotated source code.",
    quickAnswer: "Socket programming is the practical software implementation of network communication using the socket API. A typical TCP client-server system involves a server that binds to a port and listens for incoming connections, and a client that initiates a connection, exchanges request-response text messages, and closes the connection gracefully.",
    whyItMatters: "Theory alone is insufficient to understand computer networks. Writing a real working socket program demonstrates how high-level application code interacts with the operating system kernel, how network buffers operate, how blocking calls behave, and how protocols handle data exchange across a network.",
    infobox: {
      prerequisites: ["u4-transport-services", "u4-berkeley-sockets"],
      relatedConcepts: ["u4-transport-addressing", "u4-intro-tcp", "u4-intro-udp"],
      compareWith: ["iterative-vs-concurrent-servers"],
      primaryUses: [
        "Building client-server networked applications",
        "Testing transport layer connectivity and latency",
        "Implementing custom application layer protocols",
        "Understanding blocking vs non-blocking network I/O"
      ],
      standardRfc: "RFC 9293 (TCP), Python Socket Library Standard"
    },
    learningObjectives: [
      "Write, compile, and execute a complete TCP Echo Server and Client in Python and C",
      "Understand the mechanics of socket binding, listening, accepting, and graceful teardown",
      "Trace the transmission and reception of byte strings across network buffers",
      "Implement a UDP Datagram client-server pair using sendto() and recvfrom()",
      "Distinguish between iterative servers (one client at a time) and concurrent servers (multi-threaded)"
    ],
    prerequisitesList: [
      { concept: "Berkeley Sockets", meaning: "Understanding socket(), bind(), listen(), accept(), connect()" },
      { concept: "Basic Programming", meaning: "Familiarity with Python or C syntax and standard I/O" }
    ],
    imageUrl: "assets/images/unit4/topic1-services-sockets/socket-programming-flow.svg",
    imageCaption: "Figure 4.3: Comparative Socket Programming Lifecycles — TCP Stream Sockets vs. UDP Datagram Sockets",
    sections: {
      overview: `
        <p class="mb-3">
          To truly master transport layer protocols, one must understand how they are controlled from application code. In this topic, we analyze the end-to-end implementation of a <strong>TCP Echo Client-Server</strong> application and a <strong>UDP Datagram</strong> application.
        </p>
        <p class="mb-3">
          In an Echo application, the client sends a text message to the server; the server receives the message, logs it, converts it (e.g., to uppercase or echoes it back), and transmits it back to the client. This encapsulates the entire request-response communication loop used by HTTP, database queries, and remote procedure calls.
        </p>
      `,
      howItWorks: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">1. Python TCP Echo Server Implementation</h3>
        <p class="mb-3">
          Python provides a clean, native interface to the Berkeley Sockets API through the standard <code>socket</code> module:
        </p>
        <pre class="bg-slate-900 text-emerald-400 p-3 rounded-lg text-xs font-mono overflow-x-auto mb-4">
# tcp_server.py
import socket

HOST = '127.0.0.1'  # Standard loopback interface address (localhost)
PORT = 65432        # Non-privileged port to listen on (> 1023)

# 1. Create a TCP socket (IPv4, Stream Socket)
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as server_sock:
    # Set SO_REUSEADDR to prevent "Address already in use" errors upon restart
    server_sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    
    # 2. Bind the socket to the address and port
    server_sock.bind((HOST, PORT))
    
    # 3. Enable the server to accept connections (backlog = 5)
    server_sock.listen(5)
    print(f"[*] Server listening on {HOST}:{PORT}...")
    
    # 4. Wait and accept an incoming client connection (Blocks here!)
    conn, client_addr = server_sock.accept()
    with conn:
        print(f"[+] Connected by client at {client_addr}")
        while True:
            # 5. Receive data payload (up to 1024 bytes)
            data = conn.recv(1024)
            if not data:
                break  # Client closed connection
            print(f"[<] Received: {data.decode('utf-8')}")
            
            # 6. Echo data back to client in uppercase
            reply = data.decode('utf-8').upper().encode('utf-8')
            conn.sendall(reply)
            print(f"[>] Echoed back: {reply.decode('utf-8')}")
print("[*] Connection closed gracefully.")</pre>

        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">2. Python TCP Echo Client Implementation</h3>
        <pre class="bg-slate-900 text-emerald-400 p-3 rounded-lg text-xs font-mono overflow-x-auto mb-4">
# tcp_client.py
import socket

SERVER_HOST = '127.0.0.1'  # The server's hostname or IP address
SERVER_PORT = 65432        # The port used by the server

# 1. Create a TCP socket
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client_sock:
    # 2. Connect to server (triggers TCP 3-Way Handshake)
    print(f"[*] Connecting to {SERVER_HOST}:{SERVER_PORT}...")
    client_sock.connect((SERVER_HOST, SERVER_PORT))
    print("[+] Connected successfully!")
    
    # 3. Transmit request message
    message = "Hello, Computer Networks Transport Layer!"
    client_sock.sendall(message.encode('utf-8'))
    print(f"[>] Sent: {message}")
    
    # 4. Receive echo response from server
    response = client_sock.recv(1024)
    print(f"[<] Received from server: {response.decode('utf-8')}")
# 5. Socket is closed automatically exiting 'with' block (triggers 4-Way FIN)</pre>
      `,
      technicalDetails: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">3. UDP Socket Programming: The Connectionless Alternative</h3>
        <p class="mb-3">
          In UDP, there is no <code>listen()</code>, <code>accept()</code>, or <code>connect()</code>. Clients and servers communicate using <code>sendto()</code> and <code>recvfrom()</code>:
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <div class="p-2.5 bg-slate-900 text-slate-200 rounded text-xs font-mono">
            <span class="text-emerald-400 font-bold"># UDP Server (udp_server.py)</span><br/>
            import socket<br/>
            sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)<br/>
            sock.bind(('127.0.0.1', 9999))<br/>
            while True:<br/>
            &nbsp;&nbsp;data, addr = sock.recvfrom(1024)<br/>
            &nbsp;&nbsp;print(f"Msg from {addr}: {data.decode()}")<br/>
            &nbsp;&nbsp;sock.sendto(b"ACK:" + data, addr)
          </div>
          <div class="p-2.5 bg-slate-900 text-slate-200 rounded text-xs font-mono">
            <span class="text-blue-400 font-bold"># UDP Client (udp_client.py)</span><br/>
            import socket<br/>
            sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)<br/>
            server_addr = ('127.0.0.1', 9999)<br/>
            sock.sendto(b"Ping datagram", server_addr)<br/>
            resp, _ = sock.recvfrom(1024)<br/>
            print(f"Server reply: {resp.decode()}")<br/>
            sock.close()
          </div>
        </div>

        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">4. Iterative vs. Concurrent Servers</h3>
        <p class="mb-3">
          The basic server above is an <strong>Iterative Server</strong>: it serves one client completely before calling <code>accept()</code> for the next. In high-performance systems, this is unacceptable because a long-running client would freeze out all other users.
        </p>
        <ul class="list-disc pl-5 space-y-1 text-xs mb-3">
          <li><strong>Multi-Threaded Server:</strong> The main thread listens on the server socket. As soon as <code>accept()</code> returns a <code>newsockfd</code>, the main thread spawns a worker thread to handle that client and immediately returns to listening.</li>
          <li><strong>Event-Driven / Async I/O (epoll / kqueue):</strong> High-performance servers (e.g., NGINX, Node.js) use non-blocking sockets and OS event loops to handle tens of thousands of concurrent connections on a single OS thread!</li>
        </ul>
      `,
      workedExamples: {
        level1: `
          <strong>Running the TCP Echo Server:</strong><br/>
          Terminal 1 (Server):<br/>
          <code>$ python3 tcp_server.py</code><br/>
          <code>[*] Server listening on 127.0.0.1:65432...</code><br/>
          Terminal 2 (Client):<br/>
          <code>$ python3 tcp_client.py</code><br/>
          <code>[*] Connecting to 127.0.0.1:65432...</code><br/>
          <code>[+] Connected successfully!</code><br/>
          <code>[>] Sent: Hello, Computer Networks Transport Layer!</code><br/>
          <code>[<] Received from server: HELLO, COMPUTER NETWORKS TRANSPORT LAYER!</code>
        `,
        level2: `
          <strong>Inspecting the Socket with netstat / ss:</strong><br/>
          While the server is running, inspect active sockets in terminal:<br/>
          <code>$ ss -tulpn | grep 65432</code><br/>
          Output: <code>tcp LISTEN 0 5 127.0.0.1:65432 0.0.0.0:* users:(("python3",pid=12345,fd=3))</code><br/>
          • State: <code>LISTEN</code><br/>
          • Recv-Q / Send-Q: <code>0 5</code> (Backlog queue limit = 5)<br/>
          • Local Address: <code>127.0.0.1:65432</code><br/>
          • Process: PID 12345 using File Descriptor 3!
        `,
        level3: `
          <strong>Detecting End of File (EOF) in Stream Sockets:</strong><br/>
          In TCP stream sockets, how does a server know the client is done sending data?<br/>
          • When client calls <code>close()</code>, the OS transmits a <code>FIN</code> segment.<br/>
          • On the server side, <code>conn.recv(1024)</code> returns an <strong>empty byte string (b'')</strong> (or in C, returns <code>0</code> bytes read).<br/>
          • If <code>recv()</code> returns <code>0</code>, the application must immediately break its loop and close its end of the socket!
        `
      },
      advantagesLimitations: `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <h4 class="font-bold text-emerald-800 dark:text-emerald-300 mb-2">Best Practices in Socket Programming</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Always set <code>SO_REUSEADDR</code> on listening sockets before binding.</li>
              <li>Always check return values of system calls for error states.</li>
              <li>Use context managers (Python <code>with</code>) to ensure sockets close properly on exceptions.</li>
              <li>Specify a clear application-level protocol framing scheme (e.g., length prefix or newline delimiter).</li>
            </ul>
          </div>
          <div class="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800">
            <h4 class="font-bold text-rose-800 dark:text-rose-300 mb-2">Common Pitfalls</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Calling <code>recv(1024)</code> and assuming it will read exactly 1024 bytes.</li>
              <li>Resource leaks: Failing to close connection sockets in error paths.</li>
              <li>Blocking the main thread with a slow client in an iterative server.</li>
            </ul>
          </div>
        </div>
      `,
      whereUsed: [
        "Chat applications (IRC, Slack, WhatsApp socket servers)",
        "IoT gateway servers collecting temperature sensor readings",
        "Multiplayer game servers synchronizing world states",
        "Custom financial trade execution systems and market feeds",
        "Microservice RPC frameworks (gRPC, Thrift, ZeroMQ)"
      ],
      commonMistakes: `
        <ul class="space-y-2 text-xs">
          <li><strong>Sending string objects directly:</strong> Sockets only transmit raw binary bytes! You must encode strings to bytes (e.g., <code>msg.encode('utf-8')</code>) before transmission and decode on reception.</li>
          <li><strong>Using the same socket for multiple clients in TCP:</strong> Attempting to communicate with a second client on the listening socket descriptor instead of the new descriptor returned by <code>accept()</code>.</li>
        </ul>
      `,
      quiz: [
        {
          question: "In TCP socket programming, what does it signify when recv() returns 0 bytes?",
          options: [
            "The network cable was unplugged",
            "The client has gracefully closed its writing half of the connection (EOF received)",
            "A packet was corrupted by checksum errors",
            "The socket buffer is completely full"
          ],
          answer: 1,
          explanation: "In TCP stream sockets, recv() returning 0 bytes indicates that the peer has closed the connection (FIN received), signaling End-of-File."
        },
        {
          question: "Which system call is used by a UDP client to transmit a message without prior connection establishment?",
          options: [
            "connect()",
            "sendto()",
            "listen()",
            "accept()"
          ],
          answer: 1,
          explanation: "In UDP, sendto() specifies both the payload and the recipient's destination address (IP and Port) in each call without needing connect()."
        },
        {
          question: "Why should a server socket configure the SO_REUSEADDR option with setsockopt()?",
          options: [
            "To allow the socket to send both UDP and TCP packets simultaneously",
            "To bypass OS firewall restrictions",
            "To allow the server to immediately re-bind to its port even if previous connections are in TIME_WAIT state",
            "To encrypt socket buffer contents"
          ],
          answer: 2,
          explanation: "SO_REUSEADDR allows a server to restart and immediately bind to its port without waiting for old connections to clear the 2MSL TIME_WAIT state."
        }
      ],
      references: [
        { cite: "W. Richard Stevens, UNIX Network Programming, Vol 1: Sockets and XTI, Chapter 4: Elementary TCP Sockets", url: "" },
        { cite: "Python Documentation: Socket Programming HOWTO (Gordon McMillan)", url: "https://docs.python.org/3/howto/sockets.html" },
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, Chapter 23.1", url: "" }
      ]
    }
  }
};

module.exports = { TOPIC1_ITEMS };
console.log("Topic 1 builder module defined!");

