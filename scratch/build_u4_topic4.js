/**
 * Unit 4 Topic 4 Builder: TCP (Transmission Control Protocol)
 * Subtopics:
 * 1. u4-intro-tcp (alias: tcp)
 * 2. u4-tcp-segment-header (alias: tcp-header)
 * 3. u4-tcp-connection-establishment (alias: tcp-three-way-handshake)
 * 4. u4-tcp-connection-release
 * 5. u4-tcp-sliding-window (alias: tcp-flow-control)
 * 6. u4-tcp-timer-management
 */

const TOPIC4_ITEMS = {
  "u4-intro-tcp": {
    id: "u4-intro-tcp",
    title: "Introduction to TCP",
    unit: "Unit 4 – Transport Layer",
    unitId: "unit4",
    level: "Level 1 — Fundamental",
    category: "transport",
    difficulty: "Core",
    readingTime: "20 min read",
    standard: "RFC 9293 (STD 7) / RFC 793 / Forouzan 4th Ed. Ch 23.3, pp. 715-720",
    oneLiner: "The flagship reliable, connection-oriented, full-duplex, byte-stream transport protocol of the Internet.",
    quickAnswer: "The Transmission Control Protocol (TCP), formally standardized in RFC 793 (updated by RFC 9293 in 2022), is a connection-oriented, reliable transport protocol that provides full-duplex, ordered byte-stream delivery between software processes. It abstracts the underlying unreliable, packet-switched network into a seamless, virtual bi-directional data pipe with built-in flow control, error recovery, and congestion control.",
    whyItMatters: "TCP is the backbone of the World Wide Web, global financial systems, software distribution, email, and database communications. Without TCP's mathematical guarantees of 100% loss-free, ordered byte delivery, everyday tasks like downloading files, submitting bank transactions, and rendering web pages would be plagued by corrupted, missing, or scrambled data.",
    infobox: {
      prerequisites: ["u4-transport-services", "u4-transport-addressing"],
      relatedConcepts: ["u4-tcp-segment-header", "u4-tcp-connection-establishment", "u4-tcp-sliding-window"],
      compareWith: ["tcp-vs-udp"],
      primaryUses: [
        "Hypertext Transfer Protocol (HTTP/1.1 and HTTP/2 over TLS)",
        "Secure Shell remote server terminal administration (SSH)",
        "File Transfer Protocol (FTP) and secure copy (SFTP/SCP)",
        "Relational database network connections (PostgreSQL, MySQL, Oracle)",
        "Email delivery and synchronization (SMTP, IMAP, POP3)"
      ],
      standardRfc: "RFC 9293: Transmission Control Protocol (TCP) Specification"
    },
    learningObjectives: [
      "Define TCP and explain its core design goals as an end-to-end reliable protocol",
      "Explain the concept of a Stream Delivery Service and how it differs from datagram framing",
      "Understand TCP's byte-level numbering system (Sequence numbers and cumulative ACKs)",
      "Analyze the role of circular sending and receiving buffers in TCP",
      "Trace the 6 major features of TCP: connection-oriented, reliable, full-duplex, flow-controlled, congestion-controlled, and stream-oriented"
    ],
    prerequisitesList: [
      { concept: "Transport Layer Services", meaning: "Understanding process-to-process delivery and port numbers" },
      { concept: "Unreliable Network Layer", meaning: "Understanding that IP packets can be dropped or reordered" }
    ],
    imageUrl: "assets/images/unit4/topic4-tcp/tcp-services-buffers.svg",
    imageCaption: "Figure 4.12: TCP Stream Delivery Service & Byte-Stream Circular Buffers [Forouzan Figure 23.13 & 23.14]",
    sections: {
      overview: `
        <p class="mb-3">
          The <strong>Transmission Control Protocol (TCP)</strong> was designed by Vint Cerf and Bob Kahn in the 1970s to provide reliable communication over the ARPANET.
        </p>
        <p class="mb-3">
          Because the underlying IP layer is inherently <em>unreliable, connectionless, and best-effort</em>, packets can be corrupted, lost, duplicated, or delivered completely out of order. TCP operates as an intelligent supervisory layer above IP, providing an illusion of a perfect, error-free, bidirectional byte pipe to application processes.
        </p>
        <div class="p-3 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 rounded-lg text-xs font-mono mb-3">
          TCP Core Promise: Every byte written by the sending process will arrive at the receiving process exactly once, undamaged, and in the exact sequence transmitted!
        </div>
      `,
      howItWorks: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">1. The Six Core Features of TCP</h3>
        <p class="mb-3">
          As detailed in Forouzan Section 23.3, TCP provides 6 fundamental features:
        </p>
        <div class="space-y-2.5 text-xs mb-4">
          <div class="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
            <strong class="text-blue-600 dark:text-blue-400">1. Stream Delivery Service:</strong>
            <p class="mt-1 text-slate-600 dark:text-slate-300">TCP accepts a continuous stream of bytes from the sending process, stores them in sending buffers, packages them into segments, and delivers them as an identical, unbroken stream to the receiving process.</p>
          </div>
          <div class="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
            <strong class="text-emerald-600 dark:text-emerald-400">2. Connection-Oriented:</strong>
            <p class="mt-1 text-slate-600 dark:text-slate-300">Before any data can be transferred, the two TCP entities must establish a virtual connection using the Three-Way Handshake. Connection state is maintained throughout, and closed via a 4-Way release.</p>
          </div>
          <div class="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
            <strong class="text-indigo-600 dark:text-indigo-400">3. Full-Duplex Communication:</strong>
            <p class="mt-1 text-slate-600 dark:text-slate-300">Data can flow simultaneously in both directions between host A and host B. Each direction maintains its own sequence numbers, acknowledgment numbers, and sliding windows.</p>
          </div>
          <div class="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
            <strong class="text-teal-600 dark:text-teal-400">4. 100% Reliable Delivery:</strong>
            <p class="mt-1 text-slate-600 dark:text-slate-300">Uses byte sequence numbering, cumulative acknowledgments, checksum validation, and dynamic retransmission timers (RTO) to recover from any lost or corrupted packets.</p>
          </div>
          <div class="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
            <strong class="text-amber-600 dark:text-amber-400">5. Flow Control (Sliding Window):</strong>
            <p class="mt-1 text-slate-600 dark:text-slate-300">The receiver regulates the sender's transmission rate via the advertised receive window (<code>rwnd</code>), ensuring the sender never overflows the receiver's memory buffers.</p>
          </div>
          <div class="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
            <strong class="text-rose-600 dark:text-rose-400">6. Congestion Control:</strong>
            <p class="mt-1 text-slate-600 dark:text-slate-300">TCP monitors packet loss and round-trip times across intermediate routers, dynamically throttling transmission rates (AIMD) to avoid collapsing network switches.</p>
          </div>
        </div>

        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">2. Byte-Stream Numbering System</h3>
        <p class="mb-3">
          Unlike Data Link Layer protocols that number entire frames (e.g., Frame 0, Frame 1, Frame 2), <strong>TCP numbers each individual byte of data</strong>:
        </p>
        <div class="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-mono space-y-1 mb-3">
          • Sequence numbers are 32-bit unsigned integers (0 to 4,294,967,295).<br/>
          • The Sequence Number field in a TCP header specifies the byte number of the <strong>first data byte</strong> carried in that segment!<br/>
          • The Acknowledgment Number field specifies the <strong>next expected byte</strong> from the other party (Cumulative ACK).
        </div>
      `,
      technicalDetails: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">3. Sending and Receiving Circular Buffers</h3>
        <p class="mb-3">
          Because application processes write and read data at unpredictable intervals, TCP uses circular memory buffers:
        </p>
        <ul class="list-disc pl-5 space-y-1 text-xs mb-3">
          <li><strong>Sending Buffer:</strong> Holds bytes written by application. Segments are carved out up to the Maximum Segment Size (MSS, typically 1460 bytes for standard Ethernet MTU 1500). Bytes remain in buffer until acknowledged in case retransmission is needed.</li>
          <li><strong>Receiving Buffer:</strong> Stores incoming segments. If packets arrive out of order (e.g. segment 3 arrives before segment 2), TCP buffers segment 3 and waits for segment 2 to arrive, presenting an unbroken, in-order sequence to the receiving application.</li>
        </ul>
      `,
      workedExamples: {
        level1: `
          <strong>Byte-Stream Sequence Numbering Calculation (Forouzan Example 23.3):</strong><br/>
          Suppose a TCP connection is transferring a file of 5,000 bytes. The first byte is numbered 10,001.<br/>
          If data is sent in 5 segments of 1,000 bytes each, what are the sequence numbers?<br/>
          • Segment 1: Range = 10,001 to 11,000 $\\to$ <strong>Seq = 10,001</strong><br/>
          • Segment 2: Range = 11,001 to 12,000 $\\to$ <strong>Seq = 11,001</strong><br/>
          • Segment 3: Range = 12,001 to 13,000 $\\to$ <strong>Seq = 12,001</strong><br/>
          • Segment 4: Range = 13,001 to 14,000 $\\to$ <strong>Seq = 13,001</strong><br/>
          • Segment 5: Range = 14,001 to 15,000 $\\to$ <strong>Seq = 14,001</strong>
        `,
        level2: `
          <strong>Cumulative Acknowledgment in Action:</strong><br/>
          Continuing the example above: when the receiver gets Segment 1 (bytes 10,001 to 11,000):<br/>
          • The receiver returns an acknowledgment with <code>Ack = 11,001</code>.<br/>
          • Meaning: "I have received all bytes up to 11,000. I am now expecting byte 11,001 next."<br/>
          If the receiver gets Segment 1, Segment 2, and Segment 3 all at once, it can send a single cumulative ACK with <code>Ack = 13,001</code> to confirm all 3 segments simultaneously!
        `
      },
      advantagesLimitations: `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <h4 class="font-bold text-emerald-800 dark:text-emerald-300 mb-2">Advantages of TCP</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Eliminates data loss, corruption, and packet duplication entirely.</li>
              <li>In-order byte delivery simplifies application layer development.</li>
              <li>Built-in congestion control prevents global Internet congestion collapse.</li>
            </ul>
          </div>
          <div class="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800">
            <h4 class="font-bold text-rose-800 dark:text-rose-300 mb-2">Overhead &amp; Trade-offs</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Larger header overhead (20–60 bytes vs 8 bytes in UDP).</li>
              <li>Handshake latency penalty (1-RTT setup before data flows).</li>
              <li>Head-of-Line blocking stalls entire stream if one segment is delayed.</li>
            </ul>
          </div>
        </div>
      `,
      whereUsed: [
        "Web servers and clients (HTTP/1.1, HTTP/2 over TLS)",
        "Database connections (JDBC, ODBC, PostgreSQL, MySQL)",
        "Enterprise messaging brokers (RabbitMQ, Apache ActiveMQ)",
        "Remote management shells (SSH, SFTP)"
      ],
      commonMistakes: `
        <ul class="space-y-2 text-xs">
          <li><strong>Confusing segment numbering with byte numbering:</strong> TCP numbers individual bytes in the stream, NOT segment numbers!</li>
          <li><strong>Assuming TCP ACK confirms the last byte received:</strong> The ACK number specifies the <em>next expected byte</em> (Last Byte Received + 1).</li>
        </ul>
      `,
      quiz: [
        {
          question: "How does TCP number transmitted data?",
          options: [
            "It numbers segments sequentially (Segment 1, Segment 2, ...)",
            "It numbers each individual byte in the payload data stream",
            "It numbers packets according to the IP TTL field",
            "It uses Ethernet frame numbers"
          ],
          answer: 1,
          explanation: "TCP uses a byte-oriented numbering system where each byte in the stream is assigned a 32-bit sequence number."
        },
        {
          question: "If a receiver sends an acknowledgment with Ack = 5001, what does this indicate?",
          options: [
            "Bytes 5001 to 6000 have been received",
            "All bytes up to 5000 have been successfully received, and byte 5001 is expected next",
            "Packet 5001 was dropped and must be retransmitted",
            "The receiver window is 5001 bytes wide"
          ],
          answer: 1,
          explanation: "TCP acknowledgments are cumulative, indicating that all bytes prior to 5001 were received and byte 5001 is expected next."
        },
        {
          question: "What is the primary RFC specification defining the modern Transmission Control Protocol?",
          options: [
            "RFC 768",
            "RFC 791",
            "RFC 9293 (updating RFC 793)",
            "RFC 1918"
          ],
          answer: 2,
          explanation: "RFC 9293 (STD 7), published in 2022, is the current authoritative specification of the Transmission Control Protocol."
        }
      ],
      references: [
        { cite: "RFC 9293: Transmission Control Protocol (TCP) Specification (STD 7)", url: "https://datatracker.ietf.org/doc/html/rfc9293" },
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, Chapter 23.3: TCP Services & Features, pp. 715-720", url: "" }
      ]
    }
  },

  "u4-tcp-segment-header": {
    id: "u4-tcp-segment-header",
    title: "TCP Segment Header",
    unit: "Unit 4 – Transport Layer",
    unitId: "unit4",
    level: "Level 2 — Core Architecture",
    category: "transport",
    difficulty: "Core",
    readingTime: "30 min read",
    standard: "RFC 9293 Section 3.1 / Forouzan 4th Ed. Ch 23.3, pp. 720-723",
    oneLiner: "Comprehensive dissection of the 20 to 60-byte TCP header, field-by-field bit layout, 6 control flags, and modern TCP options.",
    quickAnswer: "The TCP segment header has a variable size ranging from 20 bytes (without options) up to 60 bytes (with maximum options). It contains essential fields for process addressing (Source/Destination Ports), byte tracking (Sequence and Acknowledgment Numbers), header sizing (Data Offset / HLEN), connection control (URG, ACK, PSH, RST, SYN, FIN flags), flow control (16-bit Window Size rwnd), data integrity (16-bit Checksum), and advanced options (MSS, Window Scale, SACK, Timestamps).",
    whyItMatters: "The TCP header is the most sophisticated and widely used transport protocol header in existence. Every flag and field has a precise operational purpose. Mastering the TCP header layout, control flag semantics, and options negotiation is fundamental to computer networks and vital for network packet inspection, security analysis, and firewall configuration.",
    infobox: {
      prerequisites: ["u4-intro-tcp", "u4-transport-addressing"],
      relatedConcepts: ["u4-tcp-connection-establishment", "u4-tcp-connection-release", "u4-tcp-sliding-window"],
      compareWith: ["tcp-header-vs-udp-header"],
      primaryUses: [
        "Network packet dissection and analysis in Wireshark and tcpdump",
        "Configuring stateful firewall inspection rules",
        "Troubleshooting connection resets and window stalls",
        "Negotiating advanced transport extensions (RFC 7323, RFC 2018)"
      ],
      standardRfc: "RFC 9293 Section 3.1 (Header Format), RFC 793"
    },
    learningObjectives: [
      "Diagram the complete 32-bit-wide layout of the 20 to 60-byte TCP segment header",
      "Explain the calculation and role of the Data Offset (HLEN) field",
      "Detail the exact semantics and triggers for each of the 6 core control flags (URG, ACK, PSH, RST, SYN, FIN)",
      "Explain how the 16-bit Window Size field regulates receiver buffer flow control",
      "Analyze the primary TCP options: MSS, Window Scale (RFC 7323), and SACK (RFC 2018)"
    ],
    prerequisitesList: [
      { concept: "Introduction to TCP", meaning: "Understanding byte streams and reliability" },
      { concept: "Binary & Hexadecimal", meaning: "Ability to read 32-bit words and bitmasks" }
    ],
    imageUrl: "assets/images/unit4/topic4-tcp/tcp-segment-header-format.svg",
    imageCaption: "Figure 4.13: TCP Segment Header Structure (RFC 9293) — 20-60 Bytes Bit Layout & Control Flag Architecture [Forouzan Figure 23.16 & 23.17]",
    sections: {
      overview: `
        <p class="mb-3">
          The unit of data transfer in TCP is called a <strong>Segment</strong>. A segment consists of a <strong>TCP Header</strong> followed by zero or more bytes of application data.
        </p>
        <p class="mb-3">
          Unlike UDP's fixed 8-byte header, the TCP header is variable in length:
        </p>
        <ul class="list-disc pl-5 space-y-1 text-xs mb-3">
          <li><strong>Base Header Size:</strong> 20 bytes (when no options are present).</li>
          <li><strong>Maximum Header Size:</strong> 60 bytes (20 bytes base + 40 bytes options).</li>
        </ul>
      `,
      howItWorks: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">1. Field-by-Field Breakdown of the TCP Header</h3>
        <table class="wiki-table w-full text-xs mb-4">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-800">
              <th>Field Name</th>
              <th>Bit Width</th>
              <th>Description &amp; Operational Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="font-mono font-bold text-blue-600">Source Port</td>
              <td>16 Bits (2B)</td>
              <td>Port number of the transmitting process on the source host.</td>
            </tr>
            <tr>
              <td class="font-mono font-bold text-cyan-600">Destination Port</td>
              <td>16 Bits (2B)</td>
              <td>Port number of the target receiving process on destination host.</td>
            </tr>
            <tr>
              <td class="font-mono font-bold text-indigo-600">Sequence Number</td>
              <td>32 Bits (4B)</td>
              <td>Byte offset of the first data byte in this segment. During SYN, holds the chosen Initial Sequence Number (ISN).</td>
            </tr>
            <tr>
              <td class="font-mono font-bold text-emerald-600">Acknowledgment Number</td>
              <td>32 Bits (4B)</td>
              <td>Cumulative acknowledgment specifying the <em>next expected byte</em>. Valid only when the ACK flag is set to 1.</td>
            </tr>
            <tr>
              <td class="font-mono font-bold text-amber-600">Data Offset (HLEN)</td>
              <td>4 Bits (0.5B)</td>
              <td>Specifies the length of the TCP header in <strong>4-byte (32-bit) words</strong>. Min value = 5 ($5 \times 4 = 20\text{ bytes}$); Max value = 15 ($15 \times 4 = 60\text{ bytes}$).</td>
            </tr>
            <tr>
              <td class="font-mono font-bold text-slate-500">Reserved</td>
              <td>6 Bits</td>
              <td>Reserved for future use; must be initialized to all zeros.</td>
            </tr>
            <tr>
              <td class="font-mono font-bold text-purple-600">Control Flags</td>
              <td>6 Bits</td>
              <td>URG, ACK, PSH, RST, SYN, FIN (control connection lifecycle and data processing).</td>
            </tr>
            <tr>
              <td class="font-mono font-bold text-teal-600">Window Size (rwnd)</td>
              <td>16 Bits (2B)</td>
              <td>Advertised receive window credit (bytes). Dictates how many bytes the sender may transmit before pausing for ACKs.</td>
            </tr>
            <tr>
              <td class="font-mono font-bold text-purple-700">Checksum</td>
              <td>16 Bits (2B)</td>
              <td>Mandatory 1's complement error check covering IP pseudo-header, TCP header, and data.</td>
            </tr>
            <tr>
              <td class="font-mono font-bold text-pink-600">Urgent Pointer</td>
              <td>16 Bits (2B)</td>
              <td>Offset added to sequence number pointing to the last byte of urgent data. Valid only when URG = 1.</td>
            </tr>
            <tr>
              <td class="font-mono font-bold text-slate-600">Options &amp; Padding</td>
              <td>0 to 40 Bytes</td>
              <td>Optional negotiation parameters (MSS, Window Scale, SACK, Timestamps), padded with zeros to 32-bit boundary.</td>
            </tr>
          </tbody>
        </table>

        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">2. The Six Fundamental Control Flags</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-4">
          <div class="p-2 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded">
            <strong>URG (Urgent):</strong> Urgent pointer field is valid. Signals receiver to process urgent out-of-band data (e.g. Ctrl+C interrupt in Telnet).
          </div>
          <div class="p-2 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded">
            <strong>ACK (Acknowledgment):</strong> Acknowledgment Number field is valid. Set on every packet after initial SYN.
          </div>
          <div class="p-2 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded">
            <strong>PSH (Push):</strong> Instructs receiver to push buffered data immediately to application without waiting for a full MSS buffer.
          </div>
          <div class="p-2 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded">
            <strong>RST (Reset):</strong> Aborts and resets connection immediately. Sent when invalid segments arrive or after a process crash.
          </div>
          <div class="p-2 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded">
            <strong>SYN (Synchronize):</strong> Synchronizes sequence numbers during connection establishment (Step 1 and Step 2 of handshake).
          </div>
          <div class="p-2 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded">
            <strong>FIN (Finish):</strong> Sender has completed transmitting data; initiates graceful symmetric connection release.
          </div>
        </div>
      `,
      technicalDetails: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">3. Prominent TCP Options</h3>
        <ul class="list-disc pl-5 space-y-1.5 text-xs mb-3">
          <li><strong>Maximum Segment Size (MSS - Kind 2, Length 4):</strong> Negotiated in SYN segments. Tells the peer the maximum payload size it can accept (typically $1500\text{ (MTU)} - 20\text{ (IP)} - 20\text{ (TCP)} = 1460\text{ bytes}$). Prevents IP fragmentation!</li>
          <li><strong>Window Scale (RFC 7323 - Kind 3, Length 3):</strong> Negotiates a bit-shift scale factor (0 to 14) to multiply the 16-bit Window Size field, expanding the effective window up to 1 GB for high-speed networks.</li>
          <li><strong>SACK Permitted &amp; SACK Blocks (RFC 2018 - Kind 4/5):</strong> Selective Acknowledgment allows receiver to acknowledge non-contiguous blocks of bytes received out of order, preventing wasteful retransmission of entire windows.</li>
          <li><strong>Timestamps (RFC 7323 - Kind 8, Length 10):</strong> Carries high-precision millisecond timestamps for measuring Round Trip Time (RTT) and preventing sequence number wrap-around (PAWS - Protection Against Wrapped Sequences).</li>
        </ul>
      `,
      workedExamples: {
        level1: `
          <strong>Calculating Header Size from HLEN / Data Offset:</strong><br/>
          A Wireshark packet capture shows the 4-bit Data Offset field as hex <code>0x8</code> (binary <code>1000</code> = 8 in decimal).<br/>
          • Because HLEN is counted in 4-byte words: <code>Header Length = 8 × 4 = 32 bytes</code>.<br/>
          • Base TCP header = 20 bytes.<br/>
          • Total Options Length = $32 - 20 = 12\text{ bytes}$ of options and padding!
        `,
        level2: `
          <strong>Interpreting TCP Flags Bitmask:</strong><br/>
          In a packet header, the flags field has hex value <code>0x012</code>.<br/>
          • In binary: <code>0001 0010</code>.<br/>
          • Bit 4 is set: <code>ACK = 1</code>.<br/>
          • Bit 1 is set: <code>SYN = 1</code>.<br/>
          • All other flags (URG, PSH, RST, FIN) are 0.<br/>
          <strong>Conclusion:</strong> This segment is Step 2 of the Three-Way Handshake (SYN + ACK) from the server!
        `
      },
      advantagesLimitations: `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <h4 class="font-bold text-emerald-800 dark:text-emerald-300 mb-2">Advantages</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Comprehensive metadata coordinates complex flow, order, and error recovery.</li>
              <li>Options field provides backward-compatible extensibility (Window Scale, SACK).</li>
              <li>Cumulative ACKs conserve return bandwidth by acknowledging multiple packets at once.</li>
            </ul>
          </div>
          <div class="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800">
            <h4 class="font-bold text-rose-800 dark:text-rose-300 mb-2">Limitations</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>20 to 60 bytes of overhead adds up on small transactions.</li>
              <li>Complex processing in software router engines compared to simple UDP.</li>
            </ul>
          </div>
        </div>
      `,
      whereUsed: [
        "Network packet capture analysis (Wireshark, tcpdump)",
        "Stateful inspection firewalls (pfSense, iptables, AWS Security Groups)",
        "Intrusion detection systems (Snort, Suricata)",
        "High-performance TCP stack kernel tuning (sysctl)"
      ],
      commonMistakes: `
        <ul class="space-y-2 text-xs">
          <li><strong>Confusing Data Offset (HLEN) with Payload Length:</strong> Data Offset indicates the length of the <em>header itself</em>, NOT the length of the data payload!</li>
          <li><strong>Thinking TCP segment size is stored in the header:</strong> The TCP header does NOT contain a Total Length field! Payload size is derived by taking the IP Total Length and subtracting IP Header Length and TCP Header Length.</li>
        </ul>
      `,
      quiz: [
        {
          question: "What is the minimum and maximum size of a TCP segment header?",
          options: [
            "Minimum 8 bytes, maximum 20 bytes",
            "Minimum 20 bytes, maximum 60 bytes",
            "Fixed at 20 bytes always",
            "Minimum 20 bytes, maximum 128 bytes"
          ],
          answer: 1,
          explanation: "The TCP header has a base size of 20 bytes and can expand up to 60 bytes with 40 bytes of options."
        },
        {
          question: "If the 4-bit Data Offset (HLEN) field contains the value 7, what is the length of the TCP header?",
          options: [
            "7 bytes",
            "14 bytes",
            "28 bytes",
            "35 bytes"
          ],
          answer: 2,
          explanation: "Data Offset is expressed in 4-byte words: 7 × 4 = 28 bytes."
        },
        {
          question: "Which TCP control flag is used to immediately abort and terminate an invalid connection?",
          options: [
            "FIN",
            "RST (Reset)",
            "PSH",
            "URG"
          ],
          answer: 1,
          explanation: "The RST (Reset) flag immediately aborts a connection, signaling that an invalid segment was received or the host crashed."
        }
      ],
      references: [
        { cite: "RFC 9293: Transmission Control Protocol (TCP), Section 3.1: Header Format", url: "https://datatracker.ietf.org/doc/html/rfc9293#section-3.1" },
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, Chapter 23.3: TCP Segment, pp. 720-723", url: "" }
      ]
    }
  },

  "u4-tcp-connection-establishment": {
    id: "u4-tcp-connection-establishment",
    title: "TCP Connection Establishment (Three-Way Handshake)",
    unit: "Unit 4 – Transport Layer",
    unitId: "unit4",
    level: "Level 2 — Core Architecture",
    category: "transport",
    difficulty: "Core",
    readingTime: "25 min read",
    standard: "RFC 9293 Section 3.4 / Forouzan Ch 23.3, pp. 723-726",
    oneLiner: "Step-by-step examination of TCP Three-Way Handshake state transitions, sequence number synchronization, and options exchange.",
    quickAnswer: "TCP connection establishment is executed via the classic Three-Way Handshake: the client initiates with a SYN segment, the server acknowledges and synchronizes with a SYN+ACK segment, and the client confirms with a final ACK segment. This procedure synchronizes Initial Sequence Numbers (ISNs) in both directions, negotiates options like MSS and Window Scale, and transitions both endpoints into the ESTABLISHED state.",
    whyItMatters: "The 3-Way Handshake is executed trillions of times every day across global networks. Understanding its exact state transitions (CLOSED → LISTEN → SYN_SENT / SYN_RCVD → ESTABLISHED) and timing parameters is critical for web performance optimization, reducing latency, and defending against SYN Flood denial-of-service attacks.",
    infobox: {
      prerequisites: ["u4-intro-tcp", "u4-tcp-segment-header"],
      relatedConcepts: ["u4-tcp-connection-release", "u4-connection-establishment"],
      compareWith: ["tcp-fast-open-vs-standard-handshake"],
      primaryUses: [
        "End-to-end connection initialization for HTTP, TLS, SSH",
        "Negotiating Maximum Segment Size (MSS) and Window Scale",
        "Synchronizing transmission sequence numbers",
        "Measuring initial Round Trip Time (RTT)"
      ],
      standardRfc: "RFC 9293 Section 3.4 (TCP Connection Establishment)"
    },
    learningObjectives: [
      "Trace the 3 sequential messages of the TCP Three-Way Handshake with header values",
      "Diagram the FSM state machine transitions for both client and server during connection setup",
      "Explain how Initial Sequence Numbers (ISNs) are synchronized across the full-duplex link",
      "Analyze the TCP Fast Open (RFC 7413) extension that enables 0-RTT data transfer on repeat visits",
      "Understand the mechanics and defense strategies for SYN Flood attacks"
    ],
    prerequisitesList: [
      { concept: "TCP Segment Header", meaning: "Understanding SYN, ACK flags and sequence numbers" },
      { concept: "Client-Server Model", meaning: "Active open vs passive listening" }
    ],
    imageUrl: "assets/images/unit4/topic4-tcp/tcp-three-way-handshake.svg",
    imageCaption: "Figure 4.14: TCP Three-Way Handshake Sequence Diagram & Finite State Machine (FSM) Transitions [Forouzan Figure 23.18]",
    sections: {
      overview: `
        <p class="mb-3">
          Before a client and server can exchange payload bytes using TCP, they must establish an operational session.
        </p>
        <p class="mb-3">
          This connection initialization serves 4 vital purposes:
        </p>
        <ol class="list-decimal pl-5 space-y-1 text-xs mb-3">
          <li>Proves that both client and server are alive and capable of bidirectional transmission.</li>
          <li>Synchronizes the starting Sequence Numbers (ISNs) for both directions of data flow.</li>
          <li>Allocates kernel memory buffers and initializes sliding window variables.</li>
          <li>Negotiates transport options: Maximum Segment Size (MSS), Window Scale factor, and SACK capability.</li>
        </ol>
      `,
      howItWorks: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">1. Detailed Walkthrough of the Three Steps</h3>
        <div class="space-y-3 text-xs mb-4">
          <div class="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
            <strong class="text-blue-800 dark:text-blue-300">Step 1: Client Active Open (SYN Segment)</strong>
            <p class="mt-1">Client transitions from <code>CLOSED</code> to <code>SYN_SENT</code> state. Transmits:</p>
            <div class="mt-1 font-mono text-[11px] bg-white dark:bg-slate-900 p-2 rounded">
              SYN = 1, ACK = 0<br/>
              Sequence Number = client_isn (e.g. 100,000)<br/>
              Acknowledgment Number = 0 (Invalid)<br/>
              Options: MSS = 1460, Window Scale = 7, SACK Permitted
            </div>
            <p class="mt-1 text-slate-500">• Consumes 1 sequence number; carries 0 bytes of user data.</p>
          </div>

          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg">
            <strong class="text-emerald-800 dark:text-emerald-300">Step 2: Server Passive Open (SYN + ACK Segment)</strong>
            <p class="mt-1">Server (which was in <code>LISTEN</code> state) receives the SYN, allocates a Transmission Control Block, and transitions to <code>SYN_RCVD</code> state. Transmits:</p>
            <div class="mt-1 font-mono text-[11px] bg-white dark:bg-slate-900 p-2 rounded">
              SYN = 1, ACK = 1<br/>
              Sequence Number = server_isn (e.g. 500,000)<br/>
              Acknowledgment Number = client_isn + 1 (100,001)<br/>
              Options: MSS = 1460, Window Scale = 7, SACK Permitted
            </div>
            <p class="mt-1 text-slate-500">• Consumes 1 sequence number; confirms client's reachability.</p>
          </div>

          <div class="p-3 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg">
            <strong class="text-purple-800 dark:text-purple-300">Step 3: Client Final Acknowledgment (ACK Segment)</strong>
            <p class="mt-1">Client receives SYN+ACK, transitions from <code>SYN_SENT</code> to <code>ESTABLISHED</code> state. Transmits:</p>
            <div class="mt-1 font-mono text-[11px] bg-white dark:bg-slate-900 p-2 rounded">
              SYN = 0, ACK = 1<br/>
              Sequence Number = client_isn + 1 (100,001)<br/>
              Acknowledgment Number = server_isn + 1 (500,001)
            </div>
            <p class="mt-1 text-slate-500">• Server receives this ACK and transitions from <code>SYN_RCVD</code> to <code>ESTABLISHED</code>. Connection is fully open!</p>
          </div>
        </div>
      `,
      technicalDetails: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">2. TCP Fast Open (TFO - RFC 7413)</h3>
        <p class="mb-3">
          To reduce the 1-RTT handshake latency on mobile and web networks, modern operating systems support <strong>TCP Fast Open (TFO)</strong>:
        </p>
        <ul class="list-disc pl-5 space-y-1 text-xs mb-3">
          <li>On the initial visit, the client requests a cryptographic <strong>TFO Cookie</strong> from the server during the standard 3-Way Handshake.</li>
          <li>On subsequent connections, the client includes the TFO Cookie AND application data (e.g. an HTTP GET request) directly inside the initial <strong>SYN segment</strong>!</li>
          <li>The server verifies the cookie and delivers data to the application immediately, achieving <strong>0-RTT data transfer</strong> over standard TCP!</li>
        </ul>
      `,
      workedExamples: {
        level1: `
          <strong>Tracing Sequence and ACK Numbers During Handshake:</strong><br/>
          Given: Client ISN = 12,345; Server ISN = 67,890.<br/>
          • Packet 1: <code>SYN=1, ACK=0, Seq=12345, Ack=0</code><br/>
          • Packet 2: <code>SYN=1, ACK=1, Seq=67890, Ack=12346</code><br/>
          • Packet 3: <code>SYN=0, ACK=1, Seq=12346, Ack=67891</code><br/>
          If Packet 3 also carries 100 bytes of data (e.g. an HTTP GET request):<br/>
          The first data byte is numbered 12,346, and the bytes occupy sequence numbers 12,346 to 12,445. The server will acknowledge with <code>Ack = 12,446</code>!
        `
      },
      advantagesLimitations: `
        <div class="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
          <strong class="text-slate-900 dark:text-white font-bold">Key Takeaway:</strong>
          <p class="mt-1 text-slate-600 dark:text-slate-300">The 3-Way Handshake guarantees that both endpoints agree on initial sequence numbers and verified buffer allocations before any user data flows. However, the 1-RTT delay remains a key driver behind modern innovations like TCP Fast Open and QUIC.</p>
        </div>
      `,
      whereUsed: [
        "Every TCP socket connection opened across the globe",
        "HTTP/1.1 and HTTP/2 handshakes over TLS",
        "Database connection pooling pools",
        "Load balancer health check probes (TCP SYN checks)"
      ],
      commonMistakes: `
        <ul class="space-y-2 text-xs">
          <li><strong>Believing the final ACK cannot carry data:</strong> Step 3 of the 3-Way Handshake CAN carry application data! It is common for HTTP clients to piggyback their GET request in Step 3.</li>
          <li><strong>Confusing SYN_SENT with SYN_RCVD:</strong> <code>SYN_SENT</code> is the client's state while waiting for the server's reply; <code>SYN_RCVD</code> is the server's state while waiting for the client's final ACK.</li>
        </ul>
      `,
      quiz: [
        {
          question: "What state does a TCP server enter immediately after receiving a SYN and sending SYN+ACK?",
          options: [
            "ESTABLISHED",
            "SYN_SENT",
            "SYN_RCVD",
            "LISTEN"
          ],
          answer: 2,
          explanation: "The server enters the SYN_RCVD state while awaiting the client's final ACK in Step 3."
        },
        {
          question: "If a client sends SYN with Seq = 40,000, what will be the value of the Acknowledgment Number in the server's SYN+ACK response?",
          options: [
            "40,000",
            "40,001",
            "0",
            "1"
          ],
          answer: 1,
          explanation: "Because SYN consumes 1 sequence number, the server acknowledges it by specifying the next expected byte: 40,000 + 1 = 40,001."
        }
      ],
      references: [
        { cite: "RFC 9293: Transmission Control Protocol (TCP), Section 3.4", url: "https://datatracker.ietf.org/doc/html/rfc9293#section-3.4" },
        { cite: "RFC 7413: TCP Fast Open", url: "https://datatracker.ietf.org/doc/html/rfc7413" }
      ]
    }
  },

  "u4-tcp-connection-release": {
    id: "u4-tcp-connection-release",
    title: "TCP Connection Release",
    unit: "Unit 4 – Transport Layer",
    unitId: "unit4",
    level: "Level 2 — Core Architecture",
    category: "transport",
    difficulty: "Core",
    readingTime: "25 min read",
    standard: "RFC 9293 Section 3.5 / Forouzan Ch 23.3, pp. 727-729",
    oneLiner: "Step-by-step examination of TCP graceful connection release, FIN handshake, half-close states, and 2MSL timer.",
    quickAnswer: "TCP connection release terminates an established full-duplex session gracefully using a Four-Way Handshake (or modified Three-Way Handshake). Each communicating endpoint sends a FIN segment to terminate its outbound simplex stream and waits for an ACK. The active-close endpoint enters the TIME-WAIT state for 2MSL (Maximum Segment Lifetime) to ensure the peer receives the final ACK and to drain lingering duplicate packets from network routers.",
    whyItMatters: "Failing to understand connection release leads to dangling socket leaks, port exhaustion, and application crashes. In high-throughput microservices and reverse proxies (like NGINX), improper teardown can result in thousands of sockets stuck in CLOSE_WAIT or TIME_WAIT, preventing new connections from establishing.",
    infobox: {
      prerequisites: ["u4-intro-tcp", "u4-tcp-connection-establishment"],
      relatedConcepts: ["u4-connection-release", "u4-tcp-timer-management"],
      compareWith: ["close-vs-shutdown"],
      primaryUses: [
        "Graceful socket teardown in client and server code",
        "Preventing socket descriptor leaks in operating system kernels",
        "Debugging CLOSE_WAIT and TIME_WAIT network issues",
        "Aborting frozen sessions using RST"
      ],
      standardRfc: "RFC 9293 Section 3.5 (Connection Termination)"
    },
    learningObjectives: [
      "Diagram the 4 steps of the TCP Four-Way Handshake with sequence and ACK numbers",
      "Explain the FSM state machine transitions for both active-close and passive-close endpoints",
      "Differentiate the Half-Closed state (FIN_WAIT_2 / CLOSE_WAIT) from full termination",
      "Explain the exact purpose and duration of the 2MSL TIME-WAIT timer",
      "Recognize the causes and consequences of CLOSE_WAIT socket leaks in application servers"
    ],
    prerequisitesList: [
      { concept: "TCP Connection Establishment", meaning: "Understanding sequence numbers and handshake mechanics" },
      { concept: "TCP Control Flags", meaning: "Understanding FIN, ACK, and RST" }
    ],
    imageUrl: "assets/images/unit4/topic2-elements-protocols/connection-release-termination.svg",
    imageCaption: "Figure 4.15: TCP Connection Release Sequence — Four-Way FIN Handshake, Half-Close & TIME-WAIT (2MSL) State [Forouzan Figure 23.21]",
    sections: {
      overview: `
        <p class="mb-3">
          Because TCP is a <strong>full-duplex protocol</strong> (data can travel simultaneously in both directions), terminating a connection is symmetric: each direction must be closed independently.
        </p>
        <p class="mb-3">
          When an application process calls <code>close()</code>, it tells its local TCP stack: <em>"I have no more data to send."</em> The local TCP transmits a <strong>FIN (Finish) segment</strong> to close its half of the connection, while remaining capable of receiving incoming data until the remote party closes its half as well.
        </p>
      `,
      howItWorks: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">1. The Four-Way Handshake Steps</h3>
        <div class="space-y-3 text-xs mb-4">
          <div class="p-2.5 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded">
            <strong>Step 1 (Client FIN):</strong> Client initiates active close; transmits <code>FIN = 1, Seq = u</code>. Client transitions from <code>ESTABLISHED</code> to <code>FIN_WAIT_1</code>.
          </div>
          <div class="p-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
            <strong>Step 2 (Server ACK):</strong> Server acknowledges client's FIN: <code>ACK = 1, Ack = u + 1</code>. Server enters <code>CLOSE_WAIT</code>; Client enters <code>FIN_WAIT_2</code>. The client can no longer send, but the server can continue transmitting data!
          </div>
          <div class="p-2.5 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded">
            <strong>Step 3 (Server FIN):</strong> When the server finishes its remaining data transfer, it calls <code>close()</code>. Transmits <code>FIN = 1, ACK = 1, Seq = w, Ack = u + 1</code>. Server enters <code>LAST_ACK</code> state.
          </div>
          <div class="p-2.5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded">
            <strong>Step 4 (Client Final ACK):</strong> Client transmits final <code>ACK = 1, Seq = u + 1, Ack = w + 1</code>. Server enters <code>CLOSED</code> immediately. Client enters <code>TIME_WAIT</code> state and starts its 2MSL timer!
          </div>
        </div>

        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">2. The 2MSL TIME-WAIT Timer</h3>
        <p class="mb-3">
          The <strong>Maximum Segment Lifetime (MSL)</strong> is the maximum time a packet can wander through network router loops before being dropped (RFC 9293 defines the default MSL as <strong>2 minutes</strong>, though common Linux implementations use <strong>60 seconds</strong>).
        </p>
        <p class="text-xs mb-3">
          The client waits for $2 \times \text{MSL}$ (typically 120 seconds) before releasing the socket to <code>CLOSED</code>:
        </p>
        <ul class="list-disc pl-5 space-y-1 text-xs mb-3">
          <li><strong>Reason 1:</strong> If the client's final ACK in Step 4 is lost, the server times out and retransmits its FIN. If the client were already CLOSED, it would reply with an RST, confusing the server. In TIME_WAIT, the client can re-ACK the retransmitted FIN!</li>
          <li><strong>Reason 2:</strong> Allows old duplicate packets from the connection to expire in network routers so they cannot collide with a new connection opening on the same port pair.</li>
        </ul>
      `,
      technicalDetails: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">3. Debugging CLOSE_WAIT vs TIME_WAIT</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mb-3">
          <div class="p-3 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-lg">
            <h4 class="font-bold text-rose-800 dark:text-rose-300 mb-1">Sockets in CLOSE_WAIT (Application Bug!)</h4>
            <p>If <code>netstat</code> shows hundreds of sockets stuck in <code>CLOSE_WAIT</code>, the remote client has closed, but the local application code forgot to call <code>close()</code> on the socket descriptor! This is an application-level resource leak.</p>
          </div>
          <div class="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h4 class="font-bold text-blue-800 dark:text-blue-300 mb-1">Sockets in TIME_WAIT (Normal Kernel State)</h4>
            <p>Sockets in <code>TIME_WAIT</code> indicate normal OS behavior on the active-close side. They automatically disappear after 2MSL. On high-volume proxies, tuning <code>tcp_tw_reuse</code> allows safe reuse of TIME_WAIT sockets.</p>
          </div>
        </div>
      `,
      workedExamples: {
        level1: `
          <strong>Tracing Sequence Numbers during Connection Teardown:</strong><br/>
          Given: Last byte sent by client was byte 10,000; last byte sent by server was byte 25,000.<br/>
          • Step 1: Client sends <code>FIN=1, Seq=10001, Ack=25001</code> (FIN consumes 1 byte!).<br/>
          • Step 2: Server sends <code>ACK=1, Seq=25001, Ack=10002</code>.<br/>
          • Step 3: Server sends <code>FIN=1, ACK=1, Seq=25001, Ack=10002</code>.<br/>
          • Step 4: Client sends <code>ACK=1, Seq=10002, Ack=25002</code>.
        `
      },
      advantagesLimitations: `
        <div class="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
          <strong class="text-slate-900 dark:text-white font-bold">Key Takeaway:</strong>
          <p class="mt-1 text-slate-600 dark:text-slate-300">Symmetric release ensures that no data in flight is ever lost when an application finishes transmitting. The 2MSL TIME-WAIT timer provides the mathematical guarantee that lingering duplicate packets cannot corrupt subsequent connections.</p>
        </div>
      `,
      whereUsed: [
        "Graceful HTTP/1.1 keep-alive session teardown",
        "Proxy server connection recycling (HAProxy, NGINX)",
        "Database connection pool cleanup",
        "Operating system socket lifecycle monitoring"
      ],
      commonMistakes: `
        <ul class="space-y-2 text-xs">
          <li><strong>Attempting to eliminate TIME_WAIT completely:</strong> Bypassing TIME_WAIT using <code>SO_LINGER(0)</code> sends an RST and can cause stale in-flight packets to corrupt new connections!</li>
        </ul>
      `,
      quiz: [
        {
          question: "How many sequence numbers does a TCP FIN segment consume?",
          options: [
            "0 sequence numbers",
            "Exactly 1 sequence number",
            "Equal to the MSS",
            "16 sequence numbers"
          ],
          answer: 1,
          explanation: "Like the SYN flag, the FIN control flag consumes exactly 1 sequence number in the byte stream."
        },
        {
          question: "What does a large number of sockets lingering in the CLOSE_WAIT state typically indicate?",
          options: [
            "A network cable is unplugged",
            "A software bug where the application received EOF but failed to call close() on the socket",
            "Normal 2MSL timer operation",
            "A DDoS attack on the router"
          ],
          answer: 1,
          explanation: "CLOSE_WAIT indicates that the remote peer closed the connection, but the local application process has not yet closed its socket descriptor."
        }
      ],
      references: [
        { cite: "RFC 9293: Transmission Control Protocol (TCP), Section 3.5: Connection Termination", url: "https://datatracker.ietf.org/doc/html/rfc9293#section-3.5" },
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, Chapter 23.3: Connection Termination, pp. 727-729", url: "" }
      ]
    }
  },

  "u4-tcp-sliding-window": {
    id: "u4-tcp-sliding-window",
    title: "Sliding Window",
    unit: "Unit 4 – Transport Layer",
    unitId: "unit4",
    level: "Level 2 — Core Architecture",
    category: "transport",
    difficulty: "Core",
    readingTime: "30 min read",
    standard: "RFC 9293 Section 3.8 / Forouzan 4th Ed. Ch 23.3, pp. 729-732",
    oneLiner: "Byte-oriented sliding window flow control mechanism dynamically balancing sender transmission rate with receiver buffer capacity.",
    quickAnswer: "TCP's Sliding Window is an advanced byte-oriented flow control protocol that dictates how many bytes a sender is permitted to transmit before waiting for an acknowledgment. Unlike Data Link Layer sliding windows that count individual frames, TCP's window counts individual bytes. The effective window is dynamically computed as the minimum of the receiver's advertised window (rwnd) and the network congestion window (cwnd).",
    whyItMatters: "The Sliding Window is the engine that drives TCP's high throughput. Instead of sending one packet and waiting for an acknowledgment (Stop-and-Wait), the sliding window allows dozens of packets to be in flight simultaneously across the network pipe, keeping gigabit links fully saturated while guaranteeing receiver buffers never overflow.",
    infobox: {
      prerequisites: ["u4-intro-tcp", "u4-tcp-segment-header"],
      relatedConcepts: ["u4-flow-control-buffering", "u4-tcp-timer-management", "u4-tcp-congestion-control"],
      compareWith: ["dll-sliding-window-vs-tcp-sliding-window"],
      primaryUses: [
        "Saturating high-bandwidth delay-product (BDP) network pipes",
        "Protecting receiver socket memory from buffer overrun",
        "Dynamic window expansion via Window Scale option (RFC 7323)",
        "Zero-Window flow control pausing"
      ],
      standardRfc: "RFC 9293 Section 3.8 (Data Communication), RFC 7323"
    },
    learningObjectives: [
      "Distinguish TCP byte-oriented sliding window from DLL frame-oriented sliding window",
      "Explain the 4 categories of bytes inside the sender's circular sliding window",
      "Trace the 3 window edge movements: Opening, Closing, and Shrinking (and why shrinking is forbidden)",
      "Calculate usable transmission windows using rwnd, cwnd, and in-flight byte offsets",
      "Solve step-by-step numerical problems based on Forouzan Examples 23.4, 23.5, and 23.6"
    ],
    prerequisitesList: [
      { concept: "TCP Byte Numbering", meaning: "Understanding sequence numbers and cumulative ACKs" },
      { concept: "Flow Control Principles", meaning: "Understanding buffer overrun prevention" }
    ],
    imageUrl: "assets/images/unit4/topic4-tcp/tcp-sliding-window-flow.svg",
    imageCaption: "Figure 4.16: TCP Byte-Oriented Sliding Window Dynamics — Opening, Closing, and Window Sizing Calculations [Forouzan Section 23.3]",
    sections: {
      overview: `
        <p class="mb-3">
          To achieve high throughput across long-distance networks, a transport protocol cannot operate in Stop-and-Wait mode (sending 1 packet and waiting for its ACK before sending the next).
        </p>
        <p class="mb-3">
          TCP implements a <strong>Sliding Window protocol</strong>: the sender is allowed to transmit multiple segments up to the current window size without waiting for intermediate ACKs.
        </p>
        <div class="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-lg text-xs font-mono mb-3">
          Fundamental Difference from Data Link Layer:<br/>
          • In DLL (Go-Back-N / Selective Repeat), the window size is measured in <strong>frames</strong> (e.g., Window = 7 frames).<br/>
          • In TCP, the window size is measured in <strong>bytes</strong> (e.g., Window = 65,535 bytes)!
        </div>
      `,
      howItWorks: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">1. Four Categories of the Sender Buffer</h3>
        <p class="mb-3">
          At any point in time, the sender's byte stream is divided into four regions:
        </p>
        <ol class="list-decimal pl-5 space-y-1.5 text-xs mb-4">
          <li><strong>Bytes Sent and Acknowledged:</strong> Bytes successfully received and confirmed by the receiver. These bytes can be purged from the circular buffer.</li>
          <li><strong>Bytes Sent but Not Acknowledged (In-Flight):</strong> Bytes transmitted into the network pipe for which ACKs have not yet arrived. The sender must keep these bytes buffered in case retransmission is required!</li>
          <li><strong>Bytes Usable (Can Send Immediately):</strong> Bytes authorized by the receiver's window credit that have not yet been transmitted. The sender can packetize and send these immediately.</li>
          <li><strong>Bytes Outside Window:</strong> Bytes generated by the application that cannot be transmitted until the receiver opens more credit.</li>
        </ol>

        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">2. The Three Window Edge Movements</h3>
        <div class="space-y-3 text-xs mb-4">
          <div class="p-2.5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded">
            <strong class="text-emerald-700 dark:text-emerald-300">1. Opening (Right edge moves to the right):</strong>
            <p class="mt-1">Occurs when the receiver's application process reads data, freeing buffer space, and the receiver advertises an expanded <code>rwnd</code> credit. Allows more bytes to be transmitted.</p>
          </div>
          <div class="p-2.5 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded">
            <strong class="text-blue-700 dark:text-blue-300">2. Closing (Left edge moves to the right):</strong>
            <p class="mt-1">Occurs when the sender receives cumulative ACKs acknowledging bytes previously in flight. Confirmed bytes are removed from the window.</p>
          </div>
          <div class="p-2.5 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded">
            <strong class="text-rose-700 dark:text-rose-300">3. Shrinking (Right edge moves to the left — FORBIDDEN!):</strong>
            <p class="mt-1">Would occur if a receiver pulled back an already-advertised credit. <strong>RFC 9293 strongly discourages window shrinking</strong> because data already transmitted in good faith based on the previous advertisement would be discarded!</p>
          </div>
        </div>
      `,
      technicalDetails: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">3. Master Transmission Window Calculation</h3>
        <p class="mb-3">
          The sender determines its actual transmission window using two independent parameters:
        </p>
        <div class="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-mono mb-3">
          Total Window Size = min(rwnd, cwnd)<br/>
          Usable Window = Total Window Size - (LastByteSent - LastByteAcked)
        </div>
        <p class="text-xs text-slate-600 dark:text-slate-400 mb-3">
          Where <code>rwnd</code> is the receiver's advertised buffer space (flow control), and <code>cwnd</code> is the sender's congestion window (congestion control).
        </p>
      `,
      workedExamples: {
        level1: `
          <strong>Solved Numerical: Forouzan Example 23.4:</strong><br/>
          <em>Problem:</em> What is the value of the receiver window (rwnd) for host A if the receiver, host B, has a total buffer size of 5,000 bytes and 2,000 bytes have been received and remain unread by the application?<br/>
          <em>Solution:</em><br/>
          $$\\text{rwnd} = \\text{Total Buffer Size} - \\text{Unread Bytes} = 5,000 - 2,000 = \\mathbf{3,000\\text{ bytes}}$$<br/>
          Host B advertises a Window Size of 3,000 bytes in its next segment header to Host A.
        `,
        level2: `
          <strong>Solved Numerical: Forouzan Example 23.5:</strong><br/>
          <em>Problem:</em> What is the size of the window for host A if the value of rwnd is 3,000 bytes and the value of cwnd is 3,500 bytes?<br/>
          <em>Solution:</em><br/>
          $$\\text{Window Size} = \\min(\\text{rwnd}, \\text{cwnd}) = \\min(3,000, 3,500) = \\mathbf{3,000\\text{ bytes}}$$<br/>
          Host A's transmission is bounded by <strong>Flow Control (3,000 bytes)</strong> because the receiver's buffer is smaller than network capacity!
        `,
        level3: `
          <strong>Solved Numerical: Forouzan Example 23.6:</strong><br/>
          <em>Problem:</em> Host A has sent bytes up to 10,200. The last acknowledged byte is 10,000. If the current Window Size is 500 bytes, how many more bytes can Host A transmit immediately?<br/>
          <em>Solution:</em><br/>
          • Bytes currently in-flight: $\\text{LastByteSent} - \\text{LastByteAcked} = 10,200 - 10,000 = 200\\text{ bytes}$.<br/>
          • Usable Window: $\\text{Window Size} - \\text{In-Flight} = 500 - 200 = \\mathbf{300\\text{ bytes}}$.<br/>
          Host A can transmit bytes 10,201 through 10,500 immediately before waiting for ACKs!
        `
      },
      advantagesLimitations: `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <h4 class="font-bold text-emerald-800 dark:text-emerald-300 mb-2">Advantages</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Keeps the network transmission pipe continuously full, maximizing throughput.</li>
              <li>Dynamically adapts to receiver application processing speed in real time.</li>
              <li>Cumulative ACKs prevent window stalls even if individual ACKs are lost.</li>
            </ul>
          </div>
          <div class="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800">
            <h4 class="font-bold text-rose-800 dark:text-rose-300 mb-2">Considerations</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Requires maintaining complex circular memory pointer offsets in kernel memory.</li>
              <li>Zero-window advertisements require persist timer probing to avoid deadlock.</li>
            </ul>
          </div>
        </div>
      `,
      whereUsed: [
        "Core TCP transmission engine in Linux, Windows, and macOS kernels",
        "Large file transfers over Gigabit Ethernet and WANs",
        "Video streaming data flow throttling",
        "Database replication stream pipelines"
      ],
      commonMistakes: `
        <ul class="space-y-2 text-xs">
          <li><strong>Confusing the Total Window with the Usable Window:</strong> The total window is min(rwnd, cwnd). The usable window subtracts all bytes currently in flight!</li>
          <li><strong>Assuming the window can shrink on demand:</strong> TCP receivers must not shrink the right edge of an advertised window because data in flight will be unfairly dropped.</li>
        </ul>
      `,
      quiz: [
        {
          question: "What unit of measurement is used for TCP sliding windows?",
          options: [
            "Number of frames",
            "Number of packets",
            "Number of bytes",
            "Number of segments"
          ],
          answer: 2,
          explanation: "Unlike Data Link Layer sliding windows which count frames, TCP sliding windows count individual bytes."
        },
        {
          question: "If rwnd = 4,000 bytes and cwnd = 2,500 bytes, what is the maximum window size the sender will use?",
          options: [
            "4,000 bytes",
            "6,500 bytes",
            "2,500 bytes",
            "1,500 bytes"
          ],
          answer: 2,
          explanation: "The sender window is always min(rwnd, cwnd) = min(4000, 2500) = 2,500 bytes."
        },
        {
          question: "What causes the left edge of a TCP sender's sliding window to move to the right (Closing)?",
          options: [
            "The arrival of cumulative ACKs acknowledging in-flight data bytes",
            "The application generating more data",
            "A packet being dropped by a router",
            "The retransmission timer expiring"
          ],
          answer: 0,
          explanation: "The left edge moves to the right (closing the window) as ACKs arrive confirming receipt of previously transmitted bytes."
        }
      ],
      references: [
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, Chapter 23.3: Sliding Window in TCP, pp. 729-732", url: "" },
        { cite: "RFC 9293: Transmission Control Protocol (TCP), Section 3.8: Data Communication", url: "https://datatracker.ietf.org/doc/html/rfc9293#section-3.8" }
      ]
    }
  },

  "u4-tcp-timer-management": {
    id: "u4-tcp-timer-management",
    title: "Timer Management",
    unit: "Unit 4 – Transport Layer",
    unitId: "unit4",
    level: "Level 2 — Core Architecture",
    category: "transport",
    difficulty: "Core",
    readingTime: "25 min read",
    standard: "RFC 6298 (RTO) / Forouzan 4th Ed. Ch 23.3, pp. 732-735 / Kurose & Ross Ch 3.5",
    oneLiner: "In-depth breakdown of the four core TCP timers: Retransmission (RTO), Persistence, Keepalive, and TIME-WAIT (2MSL).",
    quickAnswer: "To operate reliably over an asynchronous, unpredictable network without centralized clocks, TCP relies on four fundamental timers: 1) Retransmission Timer (RTO) to recover from lost packets using dynamic Jacobson/Karn RTT estimation; 2) Persistence Timer to prevent zero-window deadlocks via periodic probe segments; 3) Keepalive Timer to detect dead or crashed peer connections on idle channels; and 4) TIME-WAIT (2MSL) Timer to guarantee final ACK delivery and drain old packets after active close.",
    whyItMatters: "TCP's performance and stability depend entirely on its timers. If the retransmission timeout (RTO) is too short, TCP retransmits prematurely, flooding the network with unnecessary duplicates; if RTO is too long, TCP stalls for seconds waiting to recover from simple packet drops. Understanding dynamic RTT estimation and the persistence probe mechanism is essential for network systems programming.",
    infobox: {
      prerequisites: ["u4-intro-tcp", "u4-tcp-sliding-window"],
      relatedConcepts: ["u4-tcp-connection-release", "u4-tcp-congestion-control"],
      compareWith: ["rto-vs-persist-timer"],
      primaryUses: [
        "Detecting packet loss dynamically via adaptive RTO timers",
        "Preventing Zero-Window deadlocks via persistence probing",
        "Reclaiming dead socket resources using SO_KEEPALIVE",
        "Protecting port reuse via the 2MSL TIME-WAIT timer"
      ],
      standardRfc: "RFC 6298 (Computing TCP's Retransmission Timer), RFC 9293"
    },
    learningObjectives: [
      "Identify the 4 fundamental timers used in TCP and describe their specific operational roles",
      "Calculate Smoothed RTT (SRTT), RTT Variation (RTTVAR), and Retransmission Timeout (RTO) using Jacobson's Algorithm",
      "Explain Karn's Algorithm and the Exponential Timer Backoff rule",
      "Demonstrate how the Persistence Timer breaks Zero-Window deadlocks with Probe segments",
      "Explain the Keepalive Timer probe sequence and the 2MSL TIME-WAIT duration"
    ],
    prerequisitesList: [
      { concept: "TCP Sliding Window", meaning: "Understanding zero-window advertisements and acknowledgments" },
      { concept: "Network Round Trip Time (RTT)", meaning: "Time taken for a packet to travel to destination and back" }
    ],
    imageUrl: "assets/images/unit4/topic4-tcp/tcp-timer-management.svg",
    imageCaption: "Figure 4.17: The Four Core TCP Timers — Retransmission (RTO), Persistence, Keepalive & TIME-WAIT (2MSL) [Forouzan Section 23.3]",
    sections: {
      overview: `
        <p class="mb-3">
          TCP is a stateful, autonomous protocol. Because intermediate network conditions vary wildly across the global Internet (from 1 ms over local fiber to 600 ms over satellite links), TCP cannot use fixed, hard-coded timeout values.
        </p>
        <p class="mb-3">
          Instead, TCP employs four specialized timers to handle packet recovery, resource reclamation, and deadlock prevention.
        </p>
      `,
      howItWorks: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">1. The Four Core TCP Timers</h3>
        <div class="space-y-3 text-xs mb-4">
          <div class="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
            <strong class="text-blue-600 dark:text-blue-400">1. Retransmission Timer (RTO):</strong>
            <p class="mt-1 text-slate-600 dark:text-slate-300">Started whenever a data segment is transmitted. If an acknowledgment arrives before the timer expires, the timer is stopped. If the timer expires before an ACK arrives, TCP assumes the segment was lost, retransmits it immediately, and doubles the timeout interval (Exponential Backoff).</p>
          </div>

          <div class="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
            <strong class="text-amber-600 dark:text-amber-400">2. Persistence Timer:</strong>
            <p class="mt-1 text-slate-600 dark:text-slate-300">Started by the sender when it receives an advertised window of <code>rwnd = 0</code>. Solves the Zero-Window Deadlock: when the timer expires, the sender transmits a 1-byte <strong>Zero-Window Probe (ZWP)</strong>. The receiver's ACK updates the sender with current buffer availability.</p>
          </div>

          <div class="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
            <strong class="text-emerald-600 dark:text-emerald-400">3. Keepalive Timer:</strong>
            <p class="mt-1 text-slate-600 dark:text-slate-300">Used to detect dead peer connections on idle sessions. If a connection remains silent with zero traffic for a prolonged period (typically <strong>2 hours</strong>), the server sends up to 9 probe segments spaced 75 seconds apart. If no reply is received, the server aborts the connection (RST) and frees kernel memory.</p>
          </div>

          <div class="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
            <strong class="text-purple-600 dark:text-purple-400">4. TIME-WAIT (2MSL) Timer:</strong>
            <p class="mt-1 text-slate-600 dark:text-slate-300">Runs during connection release on the endpoint that initiates the active close. Runs for twice the Maximum Segment Lifetime ($2 \times \text{MSL} = 120\text{ seconds}$) to guarantee the final ACK reached the server and drain stale duplicate packets from network routers.</p>
          </div>
        </div>
      `,
      technicalDetails: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">2. Computing the Retransmission Timeout (Jacobson's Algorithm - RFC 6298)</h3>
        <p class="mb-3">
          TCP continuously measures the sample Round Trip Time (RTT) of transmitted segments. Because network delay fluctuates, Van Jacobson's algorithm computes an adaptive, smoothed RTT and variance:
        </p>
        <div class="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-mono space-y-1 mb-3">
          1. Smoothed RTT (SRTT):<br/>
          &nbsp;&nbsp;&nbsp;SRTT = (1 - α) · SRTT + α · RTT_sample    (Standard α = 0.125 = 1/8)<br/>
          2. RTT Variation (RTTVAR):<br/>
          &nbsp;&nbsp;&nbsp;RTTVAR = (1 - β) · RTTVAR + β · |SRTT - RTT_sample| (Standard β = 0.25 = 1/4)<br/>
          3. Retransmission Timeout (RTO):<br/>
          &nbsp;&nbsp;&nbsp;RTO = SRTT + 4 · RTTVAR                   (Subject to min RTO = 1.0 second)
        </div>

        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">3. Karn's Algorithm and Retransmission Ambiguity</h3>
        <p class="mb-3">
          Phil Karn identified a major flaw in basic RTT measurement: <em>If a packet is retransmitted and an ACK arrives, did the ACK belong to the original packet (which was just delayed) or the retransmitted packet?</em>
        </p>
        <ul class="list-disc pl-5 space-y-1 text-xs mb-3">
          <li><strong>Rule 1 (Karn's Rule):</strong> Never update RTT/SRTT measurements for segments that have been retransmitted!</li>
          <li><strong>Rule 2 (Exponential Timer Backoff):</strong> Every time a retransmission timeout occurs, double the RTO value for subsequent attempts ($RTO = 2 \times RTO$) up to a maximum (typically 64 seconds). Once a successful segment is ACKed without retransmission, normal Jacobson RTO calculation resumes.</li>
        </ul>
      `,
      workedExamples: {
        level1: `
          <strong>Step-by-Step RTO Calculation:</strong><br/>
          Given initial state: <code>SRTT = 100 ms</code>, <code>RTTVAR = 10 ms</code>.<br/>
          A new packet is sent and acknowledged with <code>RTT_sample = 140 ms</code>.<br/>
          • <strong>Step 1: Update RTTVAR:</strong><br/>
          $$\\text{RTTVAR} = (1 - 0.25) \\times 10 + 0.25 \\times |100 - 140| = 7.5 + 0.25 \\times 40 = 7.5 + 10 = \\mathbf{17.5\\text{ ms}}$$<br/>
          • <strong>Step 2: Update SRTT:</strong><br/>
          $$\\text{SRTT} = (1 - 0.125) \\times 100 + 0.125 \\times 140 = 87.5 + 17.5 = \\mathbf{105\\text{ ms}}$$<br/>
          • <strong>Step 3: Compute RTO:</strong><br/>
          $$\\text{RTO} = \\text{SRTT} + 4 \\times \\text{RTTVAR} = 105 + 4 \\times 17.5 = 105 + 70 = \\mathbf{175\\text{ ms}}$$ (or 1000 ms if operating system enforces 1s floor).
        `,
        level2: `
          <strong>Exponential Backoff Under Consecutive Losses:</strong><br/>
          If normal RTO = 1.5 seconds, and 3 consecutive timeouts occur for segment #50:<br/>
          • Timeout 1: Retransmit segment; set $RTO = 1.5 \\times 2 = \\mathbf{3.0\\text{ seconds}}$.<br/>
          • Timeout 2: Retransmit segment; set $RTO = 3.0 \\times 2 = \\mathbf{6.0\\text{ seconds}}$.<br/>
          • Timeout 3: Retransmit segment; set $RTO = 6.0 \\times 2 = \\mathbf{12.0\\text{ seconds}}$.<br/>
          Exponential backoff stops the sender from compounding network congestion during router outages!
        `
      },
      advantagesLimitations: `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <h4 class="font-bold text-emerald-800 dark:text-emerald-300 mb-2">Advantages of Adaptive Timers</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Automatically self-tunes across dial-up, LTE, gigabit fiber, and satellite networks.</li>
              <li>Persistence probes completely eliminate zero-window deadlocks.</li>
              <li>Exponential backoff prevents packet storms during network router reboots.</li>
            </ul>
          </div>
          <div class="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800">
            <h4 class="font-bold text-rose-800 dark:text-rose-300 mb-2">Operational Nuance</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Default 2-hour keepalive is too slow for mobile apps; applications must use application-level heartbeats.</li>
            </ul>
          </div>
        </div>
      `,
      whereUsed: [
        "Linux kernel TCP implementation (`net.ipv4.tcp_retries2`)",
        "Database connection dead-client detection",
        "Cloud load balancer health checks and idle timeouts",
        "Mobile cell-tower handover recovery"
      ],
      commonMistakes: `
        <ul class="space-y-2 text-xs">
          <li><strong>Confusing the Retransmission Timer with the Persistence Timer:</strong> RTO handles lost data packets; the Persistence Timer handles zero-window probe packets when the receiver buffer is full.</li>
          <li><strong>Updating RTT for retransmitted packets:</strong> Violates Karn's Algorithm and corrupts RTO calculations.</li>
        </ul>
      `,
      quiz: [
        {
          question: "Which TCP timer is responsible for preventing Zero-Window Deadlocks when a window update ACK is lost?",
          options: [
            "Retransmission Timer (RTO)",
            "Persistence Timer",
            "Keepalive Timer",
            "TIME-WAIT Timer"
          ],
          answer: 1,
          explanation: "The Persistence Timer periodically transmits a 1-byte Zero-Window Probe to prompt the receiver for its current buffer availability."
        },
        {
          question: "What does Karn's Algorithm state regarding RTT estimation?",
          options: [
            "RTT must be measured only on even-numbered sequence packets",
            "RTT samples must NEVER be measured for retransmitted segments",
            "RTO must always equal exactly 3 times the RTT",
            "The keepalive timer must be disabled during retransmissions"
          ],
          answer: 1,
          explanation: "Karn's Algorithm prohibits measuring RTT for retransmitted segments because of ambiguity over which transmission generated the ACK."
        },
        {
          question: "In Jacobson's RTO formula RTO = SRTT + 4 × RTTVAR, what does RTTVAR represent?",
          options: [
            "The total number of retransmitted packets",
            "The round-trip time variance (jitter)",
            "The maximum receive buffer size",
            "The transmission window scale factor"
          ],
          answer: 1,
          explanation: "RTTVAR represents the RTT variation (jitter/fluctuation), ensuring the timeout interval accommodates network delay spikes."
        }
      ],
      references: [
        { cite: "RFC 6298: Computing TCP's Retransmission Timer", url: "https://datatracker.ietf.org/doc/html/rfc6298" },
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, Chapter 23.3: TCP Timers, pp. 732-735", url: "" },
        { cite: "Van Jacobson, Michael J. Karels, Congestion Avoidance and Control, ACM SIGCOMM 1988", url: "" }
      ]
    }
  }
};

module.exports = { TOPIC4_ITEMS };
console.log("Topic 4 builder module defined!");

