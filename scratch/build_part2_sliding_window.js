// Builder for Sliding Window Protocols (6 Topics) in Part 2
// Strictly aligned with Behrouz A. Forouzan Ch. 11.5 (Sliding Window) and Tanenbaum Ch. 3.4

const slidingWindowTopics = {
  "u2-sliding-window-intro": {
    id: "u2-sliding-window-intro",
    title: "Introduction to Sliding Window Protocol",
    unit: "Unit 2 – Data Link Layer",
    unitId: "unit2",
    level: "Core",
    category: "datalink",
    difficulty: "Core",
    readingTime: "18 min",
    standard: "Forouzan Ch. 11.5 / Tanenbaum Ch. 3.4",
    oneLiner: "The pipelining mechanism that allows multiple frames to be in flight simultaneously, maximizing link utilization on high-delay channels.",
    quickAnswer: "The Sliding Window Protocol is a family of flow and error control protocols that permits the sender to transmit multiple consecutive frames before waiting for an acknowledgment. It abstracts a dynamic window of allowed sequence numbers over a modulo $2^m$ space. As acknowledgments arrive from the receiver, the window slides forward, enabling continuous pipelined transmission and keeping the communication pipe saturated.",
    whyItMatters: "Stop-and-Wait protocol wastes up to 99% of bandwidth on high-speed or long-distance links because the sender remains idle during Round Trip Time. Sliding Window overcomes this bottleneck by pipelining frames, forming the operational foundation of modern LANs, WANs, and the global Internet (TCP).",
    prerequisitesList: [
      { concept: "Simplex Protocol for Noisy Channels", meaning: "Stop-and-Wait ARQ fundamentals." },
      { concept: "Bandwidth-Delay Product (BDP)", meaning: "The volume of data required to fill a communication pipe." }
    ],
    learningObjectives: [
      "Understand the motivation for pipelining over Stop-and-Wait.",
      "Define the abstract concept of sender and receiver sliding windows.",
      "Analyze sequence number allocation using modulo $2^m$ arithmetic.",
      "Differentiate between the two major implementations: Go-Back-N and Selective Repeat."
    ],
    infobox: {
      layer: "Layer 2 (Data Link Layer) & Layer 4 (Transport)",
      standard: "IEEE 802.2 LLC / HDLC / RFC 793 (TCP)",
      type: "Pipelined Flow and Error Control Protocol",
      prerequisites: ["u2-simplex-noisy-channels"],
      relatedConcepts: ["u2-sender-receiver-window", "u2-sliding-window-size", "go-back-n", "selective-repeat"],
      compareWith: ["u2-sliding-window-vs-stop-and-wait"],
      primaryUses: ["High-speed network communications", "Full-duplex Ethernet framing", "Transmission Control Protocol (TCP) flow control"]
    },
    imageUrl: "assets/images/unit2/topic2/sliding-window-frames-pointers.svg",
    imageCaption: "Figure 11.4: Pipelined Transmission and the Sliding Window Concept.",
    sections: {
      overview: `
        <p>In Stop-and-Wait protocols, the sender transmits a single frame and sits idle for the entire Round-Trip Time ($RTT$) until the acknowledgment arrives. On links with a high <strong>Bandwidth-Delay Product ($BDP = \\text{Bandwidth} \\times RTT$)</strong>, this stop-and-wait behavior results in disastrously low channel utilization—often less than 1% of the link's physical capacity.</p>
        <p>To overcome this limitation, computer networks use <strong>Pipelining</strong>. As formulated by <em>Behrouz A. Forouzan (Chapter 11.5, pp. 358–360)</em>, the <strong>Sliding Window</strong> is an abstract concept that defines the range of sequence numbers that is the concern of the sender and receiver. Several frames can be in transit simultaneously, keeping the transmission pipe full while maintaining strict flow and error control.</p>
      `,
      eli10: "Imagine pitching baseballs to a batter. Stop-and-Wait means throwing ONE ball, sitting on the bench for 30 seconds until the batter catches it and waves a flag, and only then throwing ball #2. Sliding Window means pitching 5 balls in rapid succession! While ball #5 is leaving your hand, ball #1 is arriving at the catcher. The game moves 5 times faster!",
      analogy: "A manufacturing assembly line vs a single artisan. An artisan finishes one table completely before starting table #2. An assembly line has 10 tables on the conveyor belt simultaneously at different stages of assembly. The factory throughput is multiplied ten-fold.",
      howItWorks: `
        <ol class="list-decimal pl-5 space-y-2 text-xs">
          <li><strong>Sequence Number Space:</strong> Frames are numbered using an $m$-bit field in the header. Sequence numbers range from $0$ to $2^m - 1$ and wrap around circularly (modulo $2^m$).</li>
          <li><strong>Send Window ($S_w$):</strong> A sliding window of size $W$ defines which frames the sender can transmit without waiting for ACKs.</li>
          <li><strong>Pipelined Transmission:</strong> The sender continuously transmits frames within its window.</li>
          <li><strong>Sliding Action:</strong> When an acknowledgment for frame $k$ arrives, the left boundary of the window moves past $k$, allowing new frames to enter the window on the right.</li>
          <li><strong>Two Primary Families:</strong>
            <br>• <strong>Go-Back-N ARQ:</strong> Receiver has window size $R_w = 1$. Discards out-of-order frames. Sender retransmits all unacknowledged frames from the point of error.
            <br>• <strong>Selective Repeat ARQ:</strong> Receiver has window size $R_w > 1$. Buffers out-of-order frames. Sender retransmits only the specific lost frame.
          </li>
        </ol>
      `,
      diagram: `
+---------------------------------------------------------------------------------+
|               STOP-AND-WAIT VS PIPELINED SLIDING WINDOW PROTOCOL                |
+---------------------------------------------------------------------------------+
|                                                                                 |
|   STOP-AND-WAIT: Sender idle during RTT (Poor Utilization ~ 1-5%)               |
|   Sender: [Frame 0] ----------------------------------------------------->      |
|           [   IDLE WAITING FOR ROUND TRIP PROPAGATION DELAY...    ]             |
|   Sender: <------------------------------------------------- [ACK 1]            |
|   Sender: [Frame 1] ----------------------------------------------------->      |
|                                                                                 |
|   SLIDING WINDOW (PIPELINED): Sender transmits W frames back-to-back            |
|   Sender: [Frame 0][Frame 1][Frame 2][Frame 3][Frame 4]------------------>      |
|           |<------ Pipe continuously saturated with data! ------->|             |
|   Sender: <------- [ACK 1] ------- [ACK 2] ------- [ACK 3] --------             |
|   Sender: Window slides! Immediately transmits [Frame 5][Frame 6]...            |
+---------------------------------------------------------------------------------+
      `,
      technicalDetails: `
        <p><strong>Bandwidth-Delay Product and Window Sizing:</strong></p>
        <p>The number of bits that can be 'in flight' on a link at any given instant is defined by the <strong>Bandwidth-Delay Product ($BDP$)</strong>:</p>
        <p>$$BDP = \\text{Bandwidth (bps)} \\times RTT \\text{ (seconds)}$$</p>
        <p>To achieve <strong>100% link utilization ($\\eta = 1$)</strong>, the sender window size $W$ in bits must be at least:</p>
        <p>$$W \\ge 1 + 2a$$</p>
        <p>Where $a = \\frac{T_{\\text{prop}}}{T_{\\text{trans}}}$ is the normalized propagation delay. If $W < 1 + 2a$, the sender will empty its window and sit idle, reducing efficiency to $\\eta = \\frac{W}{1 + 2a}$.</p>
      `,
      workedExamples: {
        level1: "<strong>Question:</strong> Why does Sliding Window wrap sequence numbers modulo $2^m$ instead of using infinitely increasing integers?<br><br><strong>Answer:</strong><br>Frame headers have fixed field sizes in silicon. A sequence number field of $m$ bits can only represent $2^m$ unique states ($0$ to $2^m - 1$). By wrapping around modulo $2^m$, the protocol can transmit an infinite stream of frames using a compact 3-bit or 7-bit header field.",
        level2: "<strong>Problem:</strong> A 1 Gbps link has a round-trip time of 40 ms. Frame size is 1250 bytes (10,000 bits). Calculate the link BDP and the minimum window size $W$ needed for 100% utilization.<br><br><strong>Solution:</strong><br>1. $BDP = 10^9 \\text{ bps} \\times 0.040 \\text{ s} = 40,000,000 \\text{ bits} = 5 \\text{ Megabytes}$.<br>2. Frame transmission time $T_{\\text{trans}} = \\frac{10,000 \\text{ bits}}{10^9 \\text{ bps}} = 0.01 \\text{ ms} = 10 \\,\\mu\\text{s}$.<br>3. Normalized delay $a = \\frac{T_{\\text{prop}}}{T_{\\text{trans}}} = \\frac{20 \\text{ ms}}{0.01 \\text{ ms}} = 2000$.<br>4. Optimal window size $W \\ge 1 + 2a = 1 + 2(2000) = \\mathbf{4001 \\text{ frames}}$.<br>Under Stop-and-Wait ($W=1$), utilization is $\\frac{1}{4001} = 0.025\\%$. With $W = 4001$, utilization reaches 100%!",
        level3: "<strong>Trade-off Analysis:</strong> What is the drawback of making window size $W$ excessively large?<br><br><strong>Analysis:</strong><br>1. <strong>Buffer Exhaustion:</strong> The sender must buffer all $W$ unacknowledged frames in memory; if $W$ is too large, host RAM is depleted.<br>2. <strong>Congestion Collapse:</strong> Flooding a multi-hop network with massive windows causes intermediate switch buffers to overflow, inducing packet drops and retransmission storms.<br>3. <strong>Retransmission Storms in GBN:</strong> If one frame is lost in Go-Back-N, the sender must retransmit all $W-1$ subsequent frames, wasting vast bandwidth."
      },
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Sliding Window Advantages</th><th>Protocol Overhead</th></tr></thead>
          <tbody>
            <tr><td>Increases link utilization from 1% to 100% on high-delay paths.</td><td>Requires multi-frame buffer storage at sender (and receiver in SR).</td></tr>
            <tr><td>Smooth, continuous data streaming without stop-and-wait pauses.</td><td>More complex state tracking (multiple timers and window pointers).</td></tr>
            <tr><td>Supports cumulative acknowledgments and piggybacking.</td><td>Requires sequence number header fields ($m$ bits).</td></tr>
          </tbody>
        </table>
      `,
      whereUsed: [
        "Transmission Control Protocol (TCP) flow and congestion control (RFC 793)",
        "High-Level Data Link Control (HDLC) balanced asynchronous mode",
        "Ethernet 802.3x full-duplex flow control and IEEE 802.11 Wi-Fi Block ACKs"
      ],
      quiz: [
        {
          question: "What is the primary motivation for introducing Sliding Window over Stop-and-Wait?",
          options: [
            "To pipeline multiple frames simultaneously, dramatically increasing link utilization on long-delay channels.",
            "To eliminate the need for CRC check bits.",
            "To avoid using MAC addresses in local networks.",
            "To permit half-duplex communication over copper wire."
          ],
          correct: 0,
          explanation: "Sliding window keeps the communication pipe filled by sending multiple frames before waiting for ACKs, curing the massive idle time of Stop-and-Wait."
        },
        {
          question: "In a protocol using m-bit sequence numbers, how are sequence numbers wrapped?",
          options: [
            "Modulo 2^m (from 0 to 2^m - 1)",
            "Modulo m",
            "Modulo 2m",
            "Sequence numbers never wrap around"
          ],
          correct: 0,
          explanation: "An m-bit binary field has 2^m distinct values (0 to 2^m - 1), so sequence numbers naturally wrap around modulo 2^m."
        },
        {
          question: "What is the Bandwidth-Delay Product (BDP) of a network link?",
          options: [
            "The volume of data (in bits or bytes) that can fill the transmission pipe during one round-trip time.",
            "The physical length of the fiber cable divided by signal speed.",
            "The total number of packet drops per minute.",
            "The electrical voltage rating of the transceiver."
          ],
          correct: 0,
          explanation: "BDP = Bandwidth * RTT, representing the maximum amount of data that can be in flight simultaneously on the link."
        }
      ],
      references: [
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th/6th Edition, Chapter 11.5 'Sliding Window', pp. 358–360.", url: "" },
        { cite: "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Section 3.4 'Sliding Window Protocols'.", url: "" }
      ]
    }
  },

  "u2-sender-receiver-window": {
    id: "u2-sender-receiver-window",
    title: "Sender Window and Receiver Window",
    unit: "Unit 2 – Data Link Layer",
    unitId: "unit2",
    level: "Intermediate",
    category: "datalink",
    difficulty: "Intermediate",
    readingTime: "22 min",
    standard: "Forouzan Ch. 11.5 / Tanenbaum Ch. 3.4",
    oneLiner: "The boundary pointers, operational states, and dynamic movement of the sender and receiver sliding windows.",
    quickAnswer: "The Sender Window defines the range of sequence numbers that the sender is authorized to transmit without waiting for ACKs, managed via three pointers: $S_f$ (first unacknowledged frame), $S_n$ (next frame to send), and window size $S_{\\text{size}}$. The Receiver Window defines the range of sequence numbers the receiver is willing to accept. In Go-Back-N, $R_w = 1$ (accepts only in-order); in Selective Repeat, $R_w > 1$ (accepts out-of-order).",
    whyItMatters: "Understanding the exact boundary pointers ($S_f, S_n$) and window sliding mechanics is crucial for implementing network drivers, debugging packet loss, and analyzing transport protocols.",
    prerequisitesList: [
      { concept: "Introduction to Sliding Window", meaning: "Modulo 2^m sequence numbers and pipelining." }
    ],
    learningObjectives: [
      "Master the three sender window pointers: $S_f$ (first outstanding), $S_n$ (next to transmit), and $S_{\\text{size}}$.",
      "Explain the three regions of the sender window (Sent & Acknowledged, Sent & Outstanding, Usable).",
      "Contrast the receiver window behavior of Go-Back-N ($R_w = 1$) vs Selective Repeat ($R_w > 1$).",
      "Trace window shrinking from the left and expansion to the right upon ACK arrival."
    ],
    infobox: {
      layer: "Layer 2 (Data Link Layer)",
      standard: "Sliding Window Pointer Architecture",
      type: "State Tracking Architecture",
      prerequisites: ["u2-sliding-window-intro"],
      relatedConcepts: ["u2-sliding-window-size", "u2-sliding-window-working-principle"],
      compareWith: ["go-back-n", "selective-repeat"],
      primaryUses: ["TCP socket buffer tracking (SND.UNA, SND.NXT)", "Data link layer framing drivers"]
    },
    imageUrl: "assets/images/unit2/topic2/sliding-window-frames-pointers.svg",
    imageCaption: "Figure 11.5: Detailed Window Pointers and Three State Partitions of the Sender Window.",
    sections: {
      overview: `
        <p>In sliding window protocols, the sender and receiver maintain <strong>imaginary sliding windows</strong> over the circular sequence number space (Forouzan Chapter 11.5, pp. 360–363).</p>
        <p>The <strong>Send Window</strong> represents the imaginary box of frames that are currently in flight or ready to be transmitted. The <strong>Receive Window</strong> represents the box of frame sequence numbers that the receiver is currently prepared to accept and buffer.</p>
      `,
      eli10: "Imagine holding a cardboard stencil with a rectangular cutout over a long strip of numbers. You can only touch the numbers visible through the cutout (the window). Every time your partner tells you 'I received number 3', you slide your cardboard cutout one step to the right, revealing number 4! That's why it's called a sliding window!",
      analogy: "A restaurant queue manager: The kitchen has capacity to cook 5 orders at once (sender window = 5). Orders 1, 2, 3, 4, 5 are on the stove. When table 1 is served (ACK received), order 1 leaves the stove, the kitchen ticket slider moves right, and order 6 is placed onto the stove.",
      howItWorks: `
        <p><strong>1. The Send Window Architecture:</strong></p>
        <p>The send window partitions the sequence space into four distinct categories:</p>
        <ul>
          <li><strong>Sent and Acknowledged:</strong> Frames to the left of the window ($< S_f$). These are completed and purged from memory.</li>
          <li><strong>Sent but Outstanding (Unacknowledged):</strong> Frames from $S_f$ to $S_n - 1$. Transmitted, but timer is running awaiting ACKs.</li>
          <li><strong>Usable but Not Yet Sent:</strong> Frames from $S_n$ to the right edge ($S_f + S_{\\text{size}} - 1$). Sender can transmit these immediately without waiting.</li>
          <li><strong>Cannot Be Sent:</strong> Frames to the right of the window. Sender cannot touch these until the window slides forward.</li>
        </ul>
        <p><strong>2. Three Sender Pointers:</strong></p>
        <ul>
          <li><strong>$S_f$ (Send First):</strong> Holds the sequence number of the <em>first unacknowledged frame</em> (left boundary of window).</li>
          <li><strong>$S_n$ (Send Next):</strong> Holds the sequence number of the <em>next frame to be sent</em>.</li>
          <li><strong>$S_{\\text{size}}$:</strong> The maximum window capacity.</li>
        </ul>
        <p><strong>3. The Receive Window:</strong></p>
        <ul>
          <li><strong>Go-Back-N ($R_w = 1$):</strong> The receiver window is strictly 1 frame wide ($R_n$). It only accepts a frame if its sequence number exactly equals $R_n$. Any out-of-order frame is dropped!</li>
          <li><strong>Selective Repeat ($R_w > 1$):</strong> The receiver window can hold multiple frames ($R_f$ to $R_f + R_{\\text{size}} - 1$). Out-of-order frames within the window are accepted and stored in a reassembly buffer.</li>
        </ul>
      `,
      diagram: `
+---------------------------------------------------------------------------------+
|                       SENDER SLIDING WINDOW STRUCTURE (FOROUZAN)                |
+---------------------------------------------------------------------------------+
|                                                                                 |
|   ... 0   1 |  2   3   4   5  | 6   7   0 ...   (Sequence Modulo 8, W = 4)      |
|             |                 |                                                 |
|             +-----------------+ <--- Send Window: [ 2, 3, 4, 5 ]                |
|             ^         ^       ^                                                 |
|             |         |       |                                                 |
|            S_f       S_n   Right Edge (S_f + S_size)                            |
|                                                                                 |
|   Region 1: [0, 1]     --> Sent and Acknowledged (Purged from buffer)           |
|   Region 2: [2, 3]     --> Sent and Outstanding (Awaiting ACKs)                 |
|   Region 3: [4, 5]     --> Usable! Can be transmitted immediately               |
|   Region 4: [6, 7]     --> Blocked! Cannot transmit until window slides         |
|                                                                                 |
|   DYNAMIC EVENT: When ACK 3 arrives:                                            |
|   • S_f moves from 2 to 3!                                                      |
|   • Window slides right to cover: [ 3, 4, 5, 6 ]                                |
|   • Frame 6 now enters the usable window!                                       |
+---------------------------------------------------------------------------------+
      `,
      technicalDetails: `
        <p><strong>Window Boundary Invariants:</strong></p>
        <p>At all times during protocol execution, the sender variables must maintain the invariant:</p>
        <p>$$S_f \\le S_n \\le S_f + S_{\\text{size}}$$</p>
        <ul>
          <li>If $S_n == S_f$: The window is <strong>empty</strong> (no outstanding frames; all sent frames have been acknowledged).</li>
          <li>If $S_n == S_f + S_{\\text{size}}$: The window is <strong>full</strong> (sender is blocked from transmitting further data until an ACK arrives).</li>
        </ul>
      `,
      workedExamples: {
        level1: "<strong>Question:</strong> In a sliding window protocol with $m = 3$ bits and window size $W = 4$, suppose $S_f = 2$ and $S_n = 5$. How many frames are currently outstanding in flight, and how many more can be sent immediately?<br><br><strong>Solution:</strong><br>1. Outstanding frames = $S_n - S_f = 5 - 2 = \\mathbf{3 \\text{ frames}}$ (Frames 2, 3, and 4).<br>2. Available capacity = $W - (S_n - S_f) = 4 - 3 = \\mathbf{1 \\text{ frame}}$ (Frame 5).",
        level2: "<strong>Problem:</strong> In the scenario above ($S_f = 2, S_n = 5$), the sender transmits Frame 5. Then $ACK_4$ arrives (acknowledging all frames up to 3). Calculate the new values of $S_f$ and $S_n$, and state the new window boundaries.<br><br><strong>Solution:</strong><br>1. After sending Frame 5: $S_n$ advances from 5 to $6$.<br>2. When $ACK_4$ arrives: $S_f$ slides forward to $4$ (since frames 2 and 3 are confirmed).<br>3. New sender state: $S_f = 4$, $S_n = 6$.<br>4. New window boundaries: $[S_f..S_f + W - 1] = [4..4 + 4 - 1] = [4, 5, 6, 7]$.<br>5. Frames 6 and 7 are now available to transmit!",
        level3: "<strong>TCP Mapping:</strong> How do sender window pointers $S_f$ and $S_n$ map to TCP transmission control block variables?<br><br><strong>Analysis:</strong> In the TCP protocol specification (RFC 793):<br>• $S_f$ corresponds to <code>SND.UNA</code> (Send Unacknowledged - oldest byte sent but unACKed).<br>• $S_n$ corresponds to <code>SND.NXT</code> (Send Next - next byte sequence to be sent).<br>• $S_f + S_{\\text{size}}$ corresponds to <code>SND.UNA + SND.WND</code> (offered receive window limit)."
      },
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Pointer Property</th><th>Engineering Significance</th></tr></thead>
          <tbody>
            <tr><td>Window shrinks from left upon ACK receipt.</td><td>Releases memory buffers automatically without pausing sender.</td></tr>
            <tr><td>Window expands to right to incorporate new frames.</td><td>Maintains continuous streaming of packets.</td></tr>
            <tr><td>Receiver window size $R_w = 1$ in GBN vs $R_w > 1$ in SR.</td><td>Directly governs whether receiver needs an out-of-order reassembly buffer.</td></tr>
          </tbody>
        </table>
      `,
      whereUsed: [
        "Go-Back-N and Selective Repeat ARQ protocols",
        "TCP sliding window management in Linux / Windows networking kernels",
        "HDLC and SDLC link-layer frame transmission"
      ],
      quiz: [
        {
          question: "What does the sender pointer Sf represent in Sliding Window Protocols?",
          options: [
            "The sequence number of the first unacknowledged frame (oldest outstanding frame).",
            "The next frame to be transmitted.",
            "The total number of frames in the network layer.",
            "The physical port number of the switch."
          ],
          correct: 0,
          explanation: "Sf marks the left edge of the sender window: the oldest frame that has been transmitted but not yet acknowledged."
        },
        {
          question: "What is the size of the receiver window in Go-Back-N ARQ?",
          options: [
            "Exactly 1 frame",
            "Equal to the sender window size",
            "2^m - 1 frames",
            "Infinite"
          ],
          correct: 0,
          explanation: "In Go-Back-N, the receiver window is strictly size 1; it only accepts the single expected in-order frame and discards all others."
        },
        {
          question: "When does the sender window slide forward to the right?",
          options: [
            "When a valid acknowledgment (ACK) arrives that advances Sf.",
            "When the retransmission timer expires.",
            "Whenever a frame is transmitted.",
            "When the user types on the keyboard."
          ],
          correct: 0,
          explanation: "The left edge of the window Sf advances when legitimate ACKs arrive, sliding the window to the right and unlocking new sequence numbers."
        }
      ],
      references: [
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th/6th Edition, Chapter 11.5, pp. 360–363.", url: "" },
        { cite: "William Stallings, Data and Computer Communications, 10th Edition, Chapter 7.", url: "" }
      ]
    }
  },

  "u2-sliding-window-size": {
    id: "u2-sliding-window-size",
    title: "Sliding Window Protocols: Window Size",
    unit: "Unit 2 – Data Link Layer",
    unitId: "unit2",
    level: "Advanced",
    category: "datalink",
    difficulty: "Advanced",
    readingTime: "18 min",
    standard: "Forouzan Ch. 11.5 / Tanenbaum Ch. 3.4",
    oneLiner: "The mathematical constraints and sequence number limits governing window sizing in Go-Back-N and Selective Repeat.",
    quickAnswer: "In an $m$-bit sequence number space ($2^m$ total numbers), the maximum window size is strictly limited to prevent ambiguity between duplicate frames and new frames when ACKs are lost. In Go-Back-N ARQ, the maximum sender window size is $S_w = 2^m - 1$ (with $R_w = 1$). In Selective Repeat ARQ, the maximum window size is $S_w = 2^{m-1} = 2^m / 2$ (with $R_w = S_w$).",
    whyItMatters: "Exceeding the theoretical maximum window size causes catastrophic protocol failure: if all ACKs are lost, the receiver confuses incoming retransmitted duplicate frames with brand-new frames, corrupting data silently.",
    prerequisitesList: [
      { concept: "Modulo 2^m Arithmetic", meaning: "Circular sequence number wrapping." },
      { concept: "Sender and Receiver Window Pointers", meaning: "Window boundary mechanics." }
    ],
    learningObjectives: [
      "Derive the fundamental window size limit for Go-Back-N: $S_w \\le 2^m - 1$.",
      "Derive the fundamental window size limit for Selective Repeat: $S_w \\le 2^{m-1}$.",
      "Demonstrate the duplicate ambiguity disaster that occurs if $W = 2^m$ in Go-Back-N.",
      "Calculate optimal window size for saturated link utilization ($W \\ge 1 + 2a$)."
    ],
    infobox: {
      layer: "Layer 2 (Data Link Layer)",
      standard: "Protocol Theory (Tanenbaum / Forouzan)",
      type: "Mathematical Sizing Proof",
      prerequisites: ["u2-sender-receiver-window"],
      relatedConcepts: ["u2-sliding-window-working-principle", "u2-sliding-window-vs-stop-and-wait"],
      compareWith: ["stop-and-wait"],
      primaryUses: ["Protocol parameter configuration", "Buffer memory allocation", "GATE examination theory"]
    },
    imageUrl: "assets/images/unit2/topic2/sliding-window-frames-pointers.svg",
    imageCaption: "Figure 11.6: Mathematical Ambiguity Proof when Window Size Exceeds Allowed Limits.",
    sections: {
      overview: `
        <p>A central question in sliding window protocol design is: <em>Given an $m$-bit sequence number field (giving $2^m$ total numbers from $0$ to $2^m - 1$), what is the largest allowable window size?</em></p>
        <p>As <em>Behrouz A. Forouzan (Chapter 11.5, pp. 363–364 & 373–374)</em> rigorously proves, intuition suggests we might set window size $W = 2^m$. <strong>This is completely wrong and catastrophic!</strong></p>
        <div class="wiki-callout note">
          <div class="callout-header"><i class="fa-solid fa-triangle-exclamation text-amber-500 mr-1"></i> Two Fundamental Window Sizing Laws</div>
          <ul>
            <li><strong>Go-Back-N ARQ Law:</strong> The sender window size must be strictly <strong>less than $2^m$</strong>:<br>$$S_w \\le 2^m - 1 \\quad (R_w = 1)$$</li>
            <li><strong>Selective Repeat ARQ Law:</strong> The sender and receiver window sizes must be <strong>at most half the sequence space</strong>:<br>$$S_w \\le 2^{m-1} = \\frac{2^m}{2} \\quad (R_w \\le 2^{m-1})$$</li>
          </ul>
        </div>
      `,
      eli10: "Imagine a clock with only numbers 0, 1, 2, 3 (a 4-hour clock). If you are allowed to send 4 letters at once (window = 4), you send letters 0, 1, 2, 3. If all your receipts blow away in the wind, you resend letter 0. But your friend already finished 0, 1, 2, 3 and is waiting for the NEXT batch's letter 0! Your friend accepts your old letter 0 thinking it's the new letter 0, and your message gets completely scrambled!",
      analogy: "A numbered ticketing queue at a bakery from 00 to 99. If the bakery allows 100 customers into the store at once, ticket 00 could be the first customer who hasn't left yet, or the 101st customer who just walked in! To avoid total chaos, the bakery never permits more than 50 customers inside at a time.",
      howItWorks: `
        <p><strong>Proof of GBN Window Size ($S_w \\le 2^m - 1$):</strong></p>
        <ol class="list-decimal pl-5 space-y-2 text-xs">
          <li>Suppose $m = 2$, so sequence numbers are $0, 1, 2, 3$ ($2^m = 4$). Suppose we unlawfully set $S_w = 4$.</li>
          <li>Sender transmits frames $0, 1, 2, 3$. All four frames arrive safely at receiver.</li>
          <li>Receiver consumes frames $0, 1, 2, 3$ and advances its expected pointer $R_n$ from 0 to 1 to 2 to 3, wrapping back to <strong>$R_n = 0$</strong> (expecting frame 0 of the next cycle!).</li>
          <li>Receiver sends $ACK_0$ confirming all 4 frames. <strong>Disaster strikes: $ACK_0$ is destroyed by channel noise!</strong></li>
          <li>Sender's timer expires. It retransmits its unacknowledged frames, starting with <strong>Frame 0</strong>.</li>
          <li>Receiver is waiting for $R_n = 0$. When Frame 0 arrives, receiver accepts it as <em>new data from the second cycle</em>! The duplicate frame is delivered to the application layer.</li>
          <li><strong>Resolution:</strong> If $S_w = 2^m - 1 = 3$, the sender only sends $0, 1, 2$. If all ACKs are lost, it resends Frame 0, but the receiver is waiting for Frame 3! Since $0 \\ne 3$, the duplicate is spotted and discarded immediately!</li>
        </ol>
        <p><strong>Proof of Selective Repeat Window Size ($S_w \\le 2^{m-1}$):</strong></p>
        <p>In Selective Repeat, the receiver window also has size $W$. If all ACKs are lost, the receiver window has slid forward by $W$ positions, while the sender window remains at the old position. To prevent the new receive window from overlapping the old send window, the two windows must not wrap onto each other: $S_w + R_w \\le 2^m \\implies 2W \\le 2^m \\implies W \\le 2^{m-1}$.</p>
      `,
      diagram: `
+---------------------------------------------------------------------------------+
|               PROOF: WHY GBN WINDOW SIZE CANNOT EQUAL 2^m                       |
+---------------------------------------------------------------------------------+
|                                                                                 |
|   FLAWED SCENARIO: m = 2 bits (Sequences: 0, 1, 2, 3). Set W = 4 (Flawed!)      |
|                                                                                 |
|   Sender                                                      Receiver          |
|     |                                                            |              |
|     | --- Frame 0, 1, 2, 3 ------------------------------------> | [Accept all] |
|     |                                                            | Rn wraps to 0|
|     |                                                            |              |
|     | <--- ACK 0 (Cumulative) -----X [LOST IN NOISE!]            |              |
|     |                                                            |              |
|     | [TIMEOUT!] Sender resends Frame 0                          |              |
|     | --- Frame 0 (Retransmit) --------------------------------> | Rn is 0!     |
|     |                                                            | [ACCEPTS AS  |
|     |                                                            |  NEW DATA! ✗]|
|     |                                                            | DUPLICATE    |
|     |                                                            | CORRUPTION!  |
|                                                                                 |
|   CORRECT SCENARIO: Set W = 2^m - 1 = 3                                         |
|     | --- Frame 0, 1, 2 ---------------------------------------> | [Accept 0,1,2|
|     | <--- ACK 3 ------------------X [LOST!]                     | Rn is 3!     |
|     | [TIMEOUT!] Resend Frame 0 -------------------------------> | Expected 3   |
|     |                                                            | Got 0!       |
|     |                                                            | [DISCARD     |
|     |                                                            |  DUPLICATE!✓]|
+---------------------------------------------------------------------------------+
      `,
      technicalDetails: `
        <p><strong>Window Size Summary Reference Table:</strong></p>
        <table class="wiki-table">
          <thead><tr><th>Protocol Family</th><th>Seq Bits ($m$)</th><th>Seq Space ($2^m$)</th><th>Max Sender Window ($S_w$)</th><th>Receiver Window ($R_w$)</th><th>Total Overlap Constraint</th></tr></thead>
          <tbody>
            <tr><td><strong>Stop-and-Wait ARQ</strong></td><td>1 bit</td><td>2 (0, 1)</td><td>$1$</td><td>$1$</td><td>$S_w + R_w = 2 = 2^1$</td></tr>
            <tr><td><strong>Go-Back-N ARQ</strong></td><td>$m$ bits</td><td>$2^m$</td><td>$2^m - 1$</td><td>$1$</td><td>$S_w + R_w = 2^m$</td></tr>
            <tr><td><strong>Selective Repeat ARQ</strong></td><td>$m$ bits</td><td>$2^m$</td><td>$2^{m-1} = 2^m / 2$</td><td>$2^{m-1}$</td><td>$S_w + R_w = 2^m$</td></tr>
          </tbody>
        </table>
      `,
      workedExamples: {
        level1: "<strong>Question:</strong> In a Go-Back-N protocol using a 3-bit sequence number field, what is the maximum sender window size?<br><br><strong>Solution:</strong><br>$m = 3$ bits $\\implies 2^m = 2^3 = 8$ sequence numbers ($0$ to $7$).<br>For Go-Back-N: $S_w = 2^m - 1 = 8 - 1 = \\mathbf{7 \\text{ frames}}$.",
        level2: "<strong>Problem:</strong> In a Selective Repeat protocol using a 4-bit sequence number field, what is the maximum allowable sender and receiver window size?<br><br><strong>Solution:</strong><br>$m = 4$ bits $\\implies 2^m = 2^4 = 16$ sequence numbers ($0$ to $15$).<br>For Selective Repeat: $S_w = R_w = 2^{m-1} = 2^3 = \\mathbf{8 \\text{ frames}}$.",
        level3: "<strong>GATE Exam Problem:</strong> A network uses Selective Repeat with a 3-bit sequence number. An engineer mistakenly configures both sender and receiver window sizes to 5 ($W = 5$). Construct a packet exchange that causes silent data corruption.<br><br><strong>Solution:</strong><br>1. Total space is $2^3 = 8$ (sequences 0 to 7). With $W = 5$, $S_w + R_w = 5 + 5 = 10 > 8$!<br>2. Sender transmits frames $0, 1, 2, 3, 4$. All 5 arrive safely.<br>3. Receiver accepts them; its window slides from $[0..4]$ forward to $[5, 6, 7, 0, 1]$. Notice that sequence 0 is now in the receiver's window!<br>4. All 5 ACKs are lost.<br>5. Sender times out and retransmits Frame 0.<br>6. Receiver sees Frame 0, which lies within its current window $[5, 6, 7, 0, 1]$. Receiver accepts Frame 0 as new data! Silent corruption occurs."
      },
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Rule</th><th>Consequence of Violation</th></tr></thead>
          <tbody>
            <tr><td>GBN: $S_w \\le 2^m - 1$</td><td>Violating this causes receiver to confuse old retransmissions with new frames.</td></tr>
            <tr><td>Selective Repeat: $S_w \\le 2^{m-1}$</td><td>Violating this causes overlap between old send window and new receive window.</td></tr>
          </tbody>
        </table>
      `,
      whereUsed: [
        "Setting TCP window scaling factors (RFC 7323)",
        "Configuring HDLC Extended Modulo-128 frame transmission",
        "Hardware buffer sizing in Network Interface Cards (NICs)"
      ],
      quiz: [
        {
          question: "What is the maximum sender window size in Go-Back-N ARQ using m bits for sequence numbers?",
          options: [
            "2^m - 1",
            "2^m",
            "2^(m-1)",
            "m"
          ],
          correct: 0,
          explanation: "In Go-Back-N, Sw must be strictly less than 2^m to prevent duplicate ambiguity when all ACKs are lost. Sw = 2^m - 1."
        },
        {
          question: "What is the maximum window size in Selective Repeat ARQ using m bits for sequence numbers?",
          options: [
            "2^(m-1) (which equals 2^m / 2)",
            "2^m - 1",
            "2^m",
            "2m"
          ],
          correct: 0,
          explanation: "In Selective Repeat, Sw + Rw <= 2^m. Since Sw = Rw for symmetric operation, Sw <= 2^(m-1)."
        },
        {
          question: "If m = 4 bits, what is the maximum sender window size for Selective Repeat ARQ?",
          options: [
            "8 frames",
            "15 frames",
            "16 frames",
            "4 frames"
          ],
          correct: 0,
          explanation: "For m = 4, 2^(4-1) = 2^3 = 8 frames."
        }
      ],
      references: [
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th/6th Edition, Chapter 11.5, pp. 363–364 & 373–374.", url: "" },
        { cite: "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3.4.", url: "" }
      ]
    }
  },

  "u2-sliding-window-working-principle": {
    id: "u2-sliding-window-working-principle",
    title: "Sliding Window: Working Principle",
    unit: "Unit 2 – Data Link Layer",
    unitId: "unit2",
    level: "Core",
    category: "datalink",
    difficulty: "Core",
    readingTime: "25 min",
    standard: "Forouzan Ch. 11.5 / Tanenbaum Ch. 3.4",
    oneLiner: "The dynamic end-to-end operation, timer management, acknowledgment processing, and recovery mechanics of Sliding Window protocols.",
    quickAnswer: "The working principle of sliding window protocols is a continuous cycle of pipelined transmission and dynamic window sliding. The sender transmits frames up to its window limit, running retransmission timers. The receiver verifies frame sequence numbers and integrity; upon sending an ACK, the receiver window advances. When the sender receives an ACK, its window slides forward, freeing up buffer space and enabling immediate transmission of new frames.",
    whyItMatters: "Understanding the operational mechanics of sliding windows bridges theoretical networking with real-world protocol implementations like TCP sockets, satellite modems, and Wi-Fi aggregation.",
    prerequisitesList: [
      { concept: "Sender Window and Receiver Window", meaning: "Pointers and window boundary management." },
      { concept: "Window Sizing Constraints", meaning: "Modulo 2^m bounds." }
    ],
    learningObjectives: [
      "Trace the continuous transmission cycle of frames and cumulative ACKs.",
      "Understand the difference between Cumulative Acknowledgment and Selective Acknowledgment (SACK).",
      "Analyze timer management: single timer in GBN vs independent timers in Selective Repeat.",
      "Evaluate window stall conditions when the window is full ($S_n == S_f + S_{\\text{size}}$)."
    ],
    infobox: {
      layer: "Layer 2 (Data Link Layer) & Layer 4",
      standard: "IEEE 802.2 / RFC 793",
      type: "Dynamic Operational Lifecycle",
      prerequisites: ["u2-sender-receiver-window", "u2-sliding-window-size"],
      relatedConcepts: ["u2-piggybacking", "go-back-n", "selective-repeat"],
      compareWith: ["u2-sliding-window-vs-stop-and-wait"],
      primaryUses: ["Pipelined communication", "TCP socket stream control", "SDR (Software Defined Radio) packet buffering"]
    },
    imageUrl: "assets/images/unit2/topic2/sliding-window-frame-sequence.svg",
    imageCaption: "Figure 11.7: Complete Operational Lifecycle of Sliding Window Transmission.",
    sections: {
      overview: `
        <p>The operational lifecycle of a sliding window protocol is governed by continuous interactions between network layer requests, physical layer arrivals, timer expirations, and acknowledgment processing (Forouzan Chapter 11.5, pp. 360–375).</p>
        <p>Unlike Stop-and-Wait, the sender does not stop after transmitting a frame. As long as the send window is not full ($S_n < S_f + S_{\\text{size}}$), the sender fetches the next packet and immediately transmits it, keeping the channel saturated.</p>
      `,
      eli10: "Think of an escalator carrying passengers. People step onto the bottom step one after another without waiting for the first person to reach the top. As people step off at the top floor (ACKs), new people can step on at the bottom. The escalator moves a steady stream of people continuously!",
      analogy: "A conveyor belt sushi restaurant: the chef places plates of sushi onto the moving belt one after another. Customers take plates off the belt. The chef doesn't wait for a plate to be eaten before cooking the next roll; they keep the belt full at all times.",
      howItWorks: `
        <ol class="list-decimal pl-5 space-y-2 text-xs">
          <li><strong>Frame Transmission:</strong> Sender checks if window is full. If $S_n < S_f + S_{\\text{size}}$, sender packages frame $S_n$, starts timer if not already running, stores a copy in the retransmission buffer, and transmits. Increments $S_n = (S_n + 1) \\pmod{2^m}$.</li>
          <li><strong>Window Full Stall:</strong> If $S_n == S_f + S_{\\text{size}}$, sender cannot send more frames. It enters a waiting state until an ACK arrives.</li>
          <li><strong>Receiver Processing:</strong> Receiver checks CRC. If clean and sequence matches expected window, frame is accepted. Receiver generates an ACK.
            <br>• <em>Cumulative ACK:</em> $ACK_k$ acknowledges all frames up to $k-1$.
          </li>
          <li><strong>ACK Reception & Window Sliding:</strong> When sender receives $ACK_k$ with $k > S_f$:
            <br>• Sender purges all confirmed frames from $S_f$ to $k-1$ from memory.
            <br>• Sets $S_f = k$ (sliding the window forward!).
            <br>• Restarts the timer for remaining outstanding frames (if any).
          </li>
          <li><strong>Timeout Recovery:</strong> If timer expires for $S_f$:
            <br>• <strong>Go-Back-N:</strong> Retransmits ALL outstanding frames from $S_f$ to $S_n - 1$.
            <br>• <strong>Selective Repeat:</strong> Retransmits ONLY frame $S_f$.
          </li>
        </ol>
      `,
      diagram: `
+---------------------------------------------------------------------------------+
|                       SLIDING WINDOW DYNAMIC LIFECYCLE                          |
+---------------------------------------------------------------------------------+
|                                                                                 |
|   Sender Window: [ 0, 1, 2, 3 ] (W = 4)                                         |
|                                                                                 |
|   1. Sender sends F0, F1, F2, F3 in flight:                                     |
|      Sender:   --- F0 ---> --- F1 ---> --- F2 ---> --- F3 --->                  |
|      Receiver:                                                                  |
|                                                                                 |
|   2. Receiver receives F0: sends ACK 1. Receives F1: sends ACK 2.               |
|      Receiver: <--- ACK 1 --- <--- ACK 2 ---                                    |
|                                                                                 |
|   3. Sender receives ACK 1:                                                     |
|      • Window slides right by 1! New window: [ 1, 2, 3, 4 ]                     |
|      • Sender immediately transmits Frame 4!                                    |
|                                                                                 |
|   4. Sender receives ACK 2:                                                     |
|      • Window slides right by 1! New window: [ 2, 3, 4, 5 ]                     |
|      • Sender immediately transmits Frame 5!                                    |
|                                                                                 |
|   RESULT: Pipelined streaming with ZERO idle pauses!                            |
+---------------------------------------------------------------------------------+
      `,
      technicalDetails: `
        <p><strong>Cumulative vs Selective Acknowledgments:</strong></p>
        <table class="wiki-table">
          <thead><tr><th>Feature</th><th>Cumulative Acknowledgment (GBN / Classic TCP)</th><th>Selective Acknowledgment (SACK / Selective Repeat)</th></tr></thead>
          <tbody>
            <tr><td><strong>Semantic</strong></td><td>$ACK_k$ confirms all frames from $0$ up to $k-1$.</td><td>$ACK$ specifies exact disjoint blocks of received frames.</td></tr>
            <tr><td><strong>Overhead</strong></td><td>Minimal: single integer sequence number.</td><td>Higher: carries list of start/end block boundaries.</td></tr>
            <tr><td><strong>Loss Resilience</strong></td><td>If $ACK_2$ is lost but $ACK_3$ arrives, $ACK_3$ automatically confirms frame 2!</td><td>Tolerant to packet reordering; avoids redundant retransmissions.</td></tr>
          </tbody>
        </table>
      `,
      workedExamples: {
        level1: "<strong>Question:</strong> How does Cumulative Acknowledgment make sliding window protocols resilient to lost ACK packets?<br><br><strong>Answer:</strong><br>In cumulative acknowledgment, $ACK_k$ means 'I have received all frames up to $k-1$ and am ready for frame $k$'. If the receiver transmits $ACK_1, ACK_2, ACK_3$ and $ACK_1$ and $ACK_2$ are destroyed by noise, but $ACK_3$ arrives safely at the sender, the sender knows frames 0, 1, and 2 all arrived successfully! The lost ACKs cause zero performance degradation.",
        level2: "<strong>Problem:</strong> In a Go-Back-N protocol with $W = 4$, the sender transmits frames $0, 1, 2, 3$. Frame 1 is lost due to noise. Trace the behavior of the receiver and sender.<br><br><strong>Solution:</strong><br>1. Frame 0 arrives: Receiver accepts, sends $ACK_1$. Expected $R_n = 1$.<br>2. Frame 1 is lost: Receiver sees nothing.<br>3. Frame 2 arrives: Sequence $2 \\ne R_n$ ($1$). Receiver <em>discards</em> Frame 2 as out-of-order! Resends $ACK_1$.<br>4. Frame 3 arrives: Sequence $3 \\ne R_n$. Receiver discards Frame 3! Resends $ACK_1$.<br>5. Sender timer for Frame 1 expires: Sender <strong>goes back to 1</strong> and retransmits frames 1, 2, and 3!<br>6. Receiver now receives Frame 1 in-order, accepts, and advances.",
        level3: "<strong>Selective Repeat Comparison:</strong> How does Selective Repeat handle the exact same scenario above?<br><br><strong>Solution:</strong><br>1. Receiver accepts Frame 0. Expected $R_n = 1$.<br>2. Frame 1 is lost.<br>3. Frame 2 arrives: Receiver places Frame 2 in its reassembly buffer! Sends $NAK_1$ or selective ACK.<br>4. Frame 3 arrives: Receiver buffers Frame 3!<br>5. Sender retransmits <strong>ONLY Frame 1</strong>.<br>6. When Frame 1 arrives, receiver delivers frames 1, 2, and 3 to network layer in a single batch! Bandwidth is preserved."
      },
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Working Principle Strength</th><th>Operational Challenge</th></tr></thead>
          <tbody>
            <tr><td>Continuous data flow maximizes channel utilization.</td><td>Buffer memory management requires complex linked-list tracking.</td></tr>
            <tr><td>Cumulative ACKs provide natural loss-absorption for control frames.</td><td>GBN suffers high bandwidth waste if single packet drops in large window.</td></tr>
          </tbody>
        </table>
      `,
      whereUsed: [
        "Modern Internet communication stacks (Linux and BSD TCP implementations)",
        "Long-range military satellite communication links",
        "Point-to-Point optical interconnects (SONET/SDH, OTN)"
      ],
      quiz: [
        {
          question: "What does an ACK number k represent in a Cumulative Acknowledgment sliding window protocol?",
          options: [
            "It confirms receipt of all frames up to k - 1 and announces that the receiver expects frame k.",
            "It confirms only frame k, while all previous frames remain unconfirmed.",
            "It indicates that frame k was corrupted and must be resent.",
            "It specifies the window size in kilobytes."
          ],
          correct: 0,
          explanation: "In cumulative ACK schemes, ACK_k confirms receipt of all frames preceding k and requests frame k."
        },
        {
          question: "In Go-Back-N ARQ, what does the receiver do when it receives an out-of-order frame?",
          options: [
            "It discards the out-of-order frame and re-acknowledges the last correctly received in-order frame.",
            "It stores the frame in a large temporary disk buffer.",
            "It pauses the sender for 10 seconds.",
            "It delivers the out-of-order frame to the application immediately."
          ],
          correct: 0,
          explanation: "In Go-Back-N, the receiver window is 1. Any out-of-order frame cannot be accepted and is dropped."
        },
        {
          question: "What is the primary operational advantage of Selective Repeat over Go-Back-N?",
          options: [
            "Selective Repeat retransmits only the specific lost frame, avoiding the wasteful retransmission of uncorrupted subsequent frames.",
            "Selective Repeat requires zero buffer memory at the receiver.",
            "Selective Repeat uses smaller headers.",
            "Selective Repeat operates without timers."
          ],
          correct: 0,
          explanation: "Selective Repeat buffers out-of-order frames at the receiver and retransmits only the single missing frame."
        }
      ],
      references: [
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th/6th Edition, Chapter 11.5, pp. 360–375.", url: "" },
        { cite: "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Section 3.4.", url: "" }
      ]
    }
  },

  "u2-piggybacking": {
    id: "u2-piggybacking",
    title: "Piggybacking",
    unit: "Unit 2 – Data Link Layer",
    unitId: "unit2",
    level: "Core",
    category: "datalink",
    difficulty: "Core",
    readingTime: "15 min",
    standard: "Forouzan Ch. 11.3 / Tanenbaum Ch. 3.4",
    oneLiner: "The bandwidth-optimization technique of attaching acknowledgment numbers into the headers of outgoing reverse data frames.",
    quickAnswer: "Piggybacking is an efficiency technique used in full-duplex, bidirectional data link and transport protocols. Instead of sending dedicated, standalone control frames for acknowledgments (which waste bandwidth with preamble, headers, and CRC trailers), the receiver temporarily holds the ACK and attaches (piggybacks) the acknowledgment sequence number into the header of its own outgoing data frame.",
    whyItMatters: "Piggybacking dramatically reduces network frame count, cuts physical layer packet overhead by over 50%, reduces CPU interrupt load on routers and servers, and is a core operational mechanism of TCP.",
    prerequisitesList: [
      { concept: "Full-Duplex Communication", meaning: "Simultaneous bidirectional transmission over a channel." },
      { concept: "Sliding Window Protocols", meaning: "Pipelined frame and ACK exchanges." }
    ],
    learningObjectives: [
      "Understand why dedicated ACK frames introduce massive protocol overhead.",
      "Explain the mechanics of embedding an ACK field into outgoing data frames.",
      "Analyze the role of the Piggybacking Timer in preventing indefinite ACK delays.",
      "Calculate the bandwidth savings achieved by piggybacking in high-traffic links."
    ],
    infobox: {
      layer: "Layer 2 (Data Link Layer) & Layer 4 (TCP)",
      standard: "HDLC / RFC 793 (TCP)",
      type: "Protocol Optimization Technique",
      prerequisites: ["u2-sliding-window-working-principle"],
      relatedConcepts: ["u2-sliding-window-vs-stop-and-wait"],
      compareWith: ["flow-control"],
      primaryUses: ["TCP bidirectional data streams", "Full-duplex Ethernet framing", "Satellite bidirectional carrier links"]
    },
    imageUrl: "assets/images/unit2/topic2/sliding-window-frames-pointers.svg",
    imageCaption: "Figure 11.8: Dedicated Control Frames vs Piggybacked Data+ACK Frames.",
    sections: {
      overview: `
        <p>In all the elementary protocols discussed so far, data frames traveled in only one direction (from sender to receiver), while the reverse channel carried only tiny control acknowledgment frames. In real-world networking, communication is almost always <strong>full-duplex</strong>: both nodes transmit data and receive data simultaneously.</p>
        <p>As <em>Behrouz A. Forouzan highlights in Chapter 11.3 (p. 348)</em>: <strong>"When data frames travel in both directions, error control information such as ACKs and NAKs can be included in the data frames in a technique called piggybacking."</strong></p>
      `,
      eli10: "Imagine you write a letter to your pen pal asking 'How is your dog?'. If your pen pal mails back a separate postcard just saying 'Got your letter!', and then 10 minutes later mails a full letter saying 'My dog is great, how is your cat?', they wasted two envelopes and two stamps! Piggybacking means writing 'Got your letter!' at the top of their reply letter, using just one envelope!",
      analogy: "A rideshare passenger sharing a ride with someone already heading in the exact same direction: instead of dispatching two separate cars (wasting gasoline and road space), both travelers share one vehicle.",
      howItWorks: `
        <ol class="list-decimal pl-5 space-y-2 text-xs">
          <li><strong>Bidirectional Frame Structure:</strong> A data frame header is designed with two distinct sequence fields:
            <br>• <code>seq</code>: The sequence number of this outgoing data frame.
            <br>• <code>ack</code>: The acknowledgment sequence number for the last received frame from the other side.
          </li>
          <li><strong>Piggybacking Trigger:</strong> When Node B receives a frame from Node A, instead of generating an immediate standalone ACK frame, Node B checks if it has an outgoing data packet destined for Node A.</li>
          <li><strong>Embedding ACK:</strong> If yes, Node B inserts the ACK number into the <code>ack</code> field of its outgoing data frame and transmits them together.</li>
          <li><strong>Piggybacking Timer:</strong> What if Node B has no immediate data to send? If Node B waits forever, Node A's retransmission timer will expire! Therefore, Node B starts a short <strong>delayed-ACK timer</strong> (e.g. 50 ms). If data becomes ready before timeout, it piggybacks; if the timer expires, it transmits a standalone ACK frame.</li>
        </ol>
      `,
      diagram: `
+---------------------------------------------------------------------------------+
|                       PIGGYBACKING OPERATIONAL ARCHITECTURE                     |
+---------------------------------------------------------------------------------+
|                                                                                 |
|   WITHOUT PIGGYBACKING (WASTEFUL): Separate Control Frames                      |
|   Node A --- [ Data Frame: seq=0 ] ----------------------------------> Node B   |
|   Node A <---------------------------------- [ Dedicated ACK: ack=1 ]- Node B   |
|   Node A <---------------------------------- [ Data Frame: seq=0 ] --- Node B   |
|   Node A --- [ Dedicated ACK: ack=1 ] --------------------------------> Node B   |
|   Total: 4 separate physical frames transmitted! Massive header overhead.       |
|                                                                                 |
|   WITH PIGGYBACKING (EFFICIENT): Combined Data + ACK Headers                    |
|   Node A --- [ Frame: seq=0 | ack=0 | Data A0 ] ---------------------> Node B   |
|   Node A <--- [ Frame: seq=0 | ack=1 | Data B0 ] --------------------- Node B   |
|          (Node B confirms A0 while sending its own data B0!)                    |
|   Node A --- [ Frame: seq=1 | ack=1 | Data A1 ] ---------------------> Node B   |
|   Total: Only 2 frames transmitted! Bandwidth savings > 50%.                    |
+---------------------------------------------------------------------------------+
      `,
      technicalDetails: `
        <p><strong>Overhead Analysis of Dedicated ACK Frames:</strong></p>
        <p>In Ethernet (IEEE 802.3), every transmitted physical frame requires:</p>
        <ul>
          <li>7 bytes Preamble + 1 byte Start Frame Delimiter (SFD) = 8 bytes.</li>
          <li>14 bytes MAC Header (Source MAC, Destination MAC, EtherType).</li>
          <li>4 bytes Frame Check Sequence (CRC-32).</li>
          <li>12 bytes Inter-Packet Gap (IPG).</li>
          <li>Minimum payload padding to 46 bytes (to meet the 64-byte slot time requirement!).</li>
        </ul>
        <p>Sending a standalone 1-byte ACK requires transmitting <strong>84 bytes of physical wire capacity</strong>! Piggybacking that 1-byte ACK into an existing outgoing data frame requires <strong>0 extra physical bytes</strong>, achieving an enormous reduction in channel congestion.</p>
      `,
      workedExamples: {
        level1: "<strong>Question:</strong> Define piggybacking and state its primary engineering benefit.<br><br><strong>Answer:</strong><br>Piggybacking is the technique of attaching acknowledgment sequence numbers to outgoing data frames in a bidirectional communication link. Its primary benefit is a massive savings in channel bandwidth and transceiver processing overhead by eliminating standalone control frames.",
        level2: "<strong>Problem:</strong> In a bidirectional connection, Node A sends 1000 data frames to Node B, and Node B sends 1000 data frames to Node A. Compare the total frame count with and without piggybacking.<br><br><strong>Solution:</strong><br>• <strong>Without Piggybacking:</strong> Node A sends 1000 data + 1000 ACKs = 2000 frames. Node B sends 1000 data + 1000 ACKs = 2000 frames. Total = $\\mathbf{4,000 \\text{ frames}}$.<br>• <strong>With Piggybacking:</strong> Node A sends 1000 frames (carrying data and ACKs). Node B sends 1000 frames (carrying data and ACKs). Total = $\\mathbf{2,000 \\text{ frames}}$.<br>Piggybacking cuts the total network frame transmissions in half (50% reduction).",
        level3: "<strong>Protocol Deadlock Analysis:</strong> What critical issue arises if a station has no data to transmit, and how is it resolved?<br><br><strong>Analysis:</strong> If Node B receives data from Node A but has no reverse data to send, waiting indefinitely to piggyback would stall Node A's sender window and trigger unnecessary retransmission timeouts. To prevent this, protocols deploy a <strong>Delayed-ACK Timer</strong> (typically 50–200 ms). If reverse data is queued before the timer expires, the ACK is piggybacked; if the timer expires with no data queued, an immediate standalone ACK frame is dispatched."
      },
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages of Piggybacking</th><th>Engineering Challenges</th></tr></thead>
          <tbody>
            <tr><td>Saves massive channel bandwidth by eliminating standalone ACK headers.</td><td>Requires sophisticated Delayed-ACK timer tuning.</td></tr>
            <tr><td>Reduces network card interrupt frequency on host operating systems.</td><td>Excessive delay waiting for reverse data risks premature sender timeout.</td></tr>
            <tr><td>Maximizes full-duplex transmission efficiency.</td><td>More complex frame parsing logic in protocol headers.</td></tr>
          </tbody>
        </table>
      `,
      whereUsed: [
        "Transmission Control Protocol (TCP RFC 793) bidirectional sessions",
        "HDLC (High-Level Data Link Control) and SDLC frame transmission",
        "Point-to-Point Protocol (PPP) over synchronous lines"
      ],
      quiz: [
        {
          question: "What is piggybacking in data communications?",
          options: [
            "Attaching an acknowledgment number onto an outgoing data frame.",
            "Sending multiple data packets wrapped inside an IP packet.",
            "Connecting two physical switches with a single cable.",
            "Compressing video data before transmission."
          ],
          correct: 0,
          explanation: "Piggybacking temporarily delays sending an ACK so it can be combined with and carried inside the header of the next outgoing data frame."
        },
        {
          question: "What mechanism prevents piggybacking from delaying acknowledgments indefinitely when there is no reverse data to send?",
          options: [
            "A delayed-ACK timer",
            "A hardware watchdog reset",
            "A manual user override",
            "A token ring rotation"
          ],
          correct: 0,
          explanation: "A delayed-ACK timer guarantees that if no reverse data appears within a short window (e.g. 50 ms), a standalone ACK is dispatched to prevent sender timeout."
        },
        {
          question: "Under what communication mode can piggybacking be utilized?",
          options: [
            "Full-duplex bidirectional communication",
            "Simplex unidirectional communication only",
            "Half-duplex walkie-talkie mode",
            "Broadcast radio with no receivers"
          ],
          correct: 0,
          explanation: "Piggybacking requires bidirectional transmission, since reverse data frames must exist to carry the forward ACKs."
        }
      ],
      references: [
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th/6th Edition, Chapter 11.3 'Piggybacking', p. 348.", url: "" },
        { cite: "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Section 3.4.1.", url: "" }
      ]
    }
  },

  "u2-sliding-window-vs-stop-and-wait": {
    id: "u2-sliding-window-vs-stop-and-wait",
    title: "Sliding Window vs Stop-and-Wait",
    unit: "Unit 2 – Data Link Layer",
    unitId: "unit2",
    level: "Core",
    category: "datalink",
    difficulty: "Core",
    readingTime: "20 min",
    standard: "Forouzan Ch. 11.4–11.5 / Tanenbaum Ch. 3.4",
    oneLiner: "The definitive mathematical and architectural comparison between Stop-and-Wait and Sliding Window protocols.",
    quickAnswer: "Stop-and-Wait allows only 1 unacknowledged frame in flight, achieving a link efficiency of $\\eta = \\frac{1}{1 + 2a}$. On long-distance or high-bandwidth links, efficiency collapses to near zero. Sliding Window protocols allow up to $W$ frames in flight, achieving an efficiency of $\\eta = \\frac{W}{1 + 2a}$ (or 100% when $W \\ge 1 + 2a$), trading memory buffer complexity for full channel saturation.",
    whyItMatters: "Comparing Stop-and-Wait with Sliding Window is a benchmark exam question and provides the mathematical justification for why all modern internet protocols utilize sliding windows.",
    prerequisitesList: [
      { concept: "Simplex Stop-and-Wait Protocol", meaning: "Single-frame stop-and-wait flow control." },
      { concept: "Sliding Window Working Principle", meaning: "Pipelining and window sliding mechanics." }
    ],
    learningObjectives: [
      "Derive and compare the mathematical efficiency formulas for Stop-and-Wait vs Sliding Window.",
      "Calculate throughput, channel utilization, and latency across satellite, WAN, and LAN links.",
      "Compare buffer memory requirements, sequence number overhead, and hardware complexity.",
      "Select the appropriate protocol model for specific engineering constraints."
    ],
    infobox: {
      layer: "Layer 2 & Layer 4",
      standard: "Protocol Performance Engineering",
      type: "Comparative Performance Analysis",
      prerequisites: ["u2-simplex-stop-and-wait", "u2-sliding-window-intro"],
      relatedConcepts: ["u2-sliding-window-size", "comparison-arq-protocols"],
      compareWith: ["stop-and-wait", "go-back-n"],
      primaryUses: ["Protocol performance optimization", "Satellite link parameter tuning", "Bandwidth utilization modeling"]
    },
    imageUrl: "assets/images/unit2/topic2/sliding-window-vs-stop-and-wait-chart.svg",
    imageCaption: "Figure 11.9: Link Utilization ($\\eta$) vs Normalized Delay ($a$) for Stop-and-Wait and Sliding Window.",
    sections: {
      overview: `
        <p>The transition from Stop-and-Wait to Sliding Window represents the most pivotal performance leap in Data Link Layer protocol engineering. As demonstrated across <em>Forouzan Chapters 11.4 and 11.5</em>, the core metric determining protocol performance is <strong>Channel Utilization (Efficiency $\\eta$)</strong>.</p>
        <p>Stop-and-Wait is inherently limited by round-trip propagation delay. In contrast, Sliding Window protocols pipeline multiple frames back-to-back, decoupling channel throughput from link distance.</p>
      `,
      eli10: "Stop-and-Wait is like shopping online by buying ONE item, waiting 5 days for the mail carrier to deliver it, and only then ordering item #2. Sliding Window is like adding 10 items to your shopping cart and ordering them all together! You get all your items in days instead of months.",
      analogy: "Transporting cargo across an ocean: Stop-and-Wait is a single cargo ship that sails across the Atlantic, unloads, sails all the way back empty, and only then loads cargo batch #2. Sliding Window is a fleet of 20 ships spaced 100 miles apart, so a ship arrives and unloads at the port every single hour.",
      howItWorks: `
        <p><strong>Mathematical Derivation of Efficiency:</strong></p>
        <ol class="list-decimal pl-5 space-y-2 text-xs">
          <li>Let $T_{\\text{trans}} = \\frac{L}{B}$ be the frame transmission time (frame length $L$ divided by bandwidth $B$).</li>
          <li>Let $T_{\\text{prop}}$ be the one-way propagation delay along the medium.</li>
          <li>Neglecting processing time and small ACK transmission time, the total round-trip cycle time is:
            <br>$$T_{\\text{total}} = T_{\\text{trans}} + 2 \\cdot T_{\\text{prop}}$$
          </li>
          <li>Define the normalized propagation delay $a = \\frac{T_{\\text{prop}}}{T_{\\text{trans}}}$. Then $T_{\\text{total}} = T_{\\text{trans}}(1 + 2a)$.</li>
          <li><strong>Stop-and-Wait Efficiency ($\\eta_{\\text{SW}}$):</strong>
            <br>$$\\eta_{\\text{SW}} = \\frac{T_{\\text{trans}}}{T_{\\text{total}}} = \\frac{1}{1 + 2a}$$
          </li>
          <li><strong>Sliding Window Efficiency ($\\eta_{\\text{Sliding}}$):</strong> If window size is $W$:
            <br>$$\\eta_{\\text{Sliding}} = \\min\\left(1, \\frac{W}{1 + 2a}\\right)$$
          </li>
        </ol>
      `,
      diagram: `
+---------------------------------------------------------------------------------+
|               EFFICIENCY COMPARISON: STOP-AND-WAIT VS SLIDING WINDOW            |
+---------------------------------------------------------------------------------+
|                                                                                 |
|   Efficiency                                                                    |
|   100% |-----------+=====================================================       |
|        |          /                                                             |
|        |         /   Sliding Window with W >= 1 + 2a (100% Saturated!)          |
|    50% |        /                                                               |
|        |       /                                                                |
|        |      /                                                                 |
|        |     /                                                                  |
|        |    /  Stop-and-Wait: eta = 1 / (1 + 2a)                                |
|        |   /   Collapses to near 0% as distance or bandwidth increases!         |
|     0% +--+-------------------------------------------------------------->      |
|           a = 0 (LAN)                  a = 100 (WAN)             a = 2000 (SAT) |
|           Normalized Propagation Delay a = T_prop / T_trans                     |
+---------------------------------------------------------------------------------+
      `,
      technicalDetails: `
        <p><strong>Comprehensive 8-Point Comparison Matrix:</strong></p>
        <table class="wiki-table">
          <thead><tr><th>Architectural Dimension</th><th>Stop-and-Wait Protocol</th><th>Sliding Window Protocols (GBN / SR)</th></tr></thead>
          <tbody>
            <tr><td><strong>Frames in Flight ($W$)</strong></td><td>Exactly 1 frame at any time.</td><td>Multiple frames ($W > 1$, up to $2^m - 1$).</td></tr>
            <tr><td><strong>Channel Utilization ($\\eta$)</strong></td><td>$\\eta = \\frac{1}{1 + 2a}$ (collapses when $a \\gg 1$).</td><td>$\\eta = \\frac{W}{1 + 2a}$ (reaches 100% when $W \\ge 1 + 2a$).</td></tr>
            <tr><td><strong>Throughput</strong></td><td>Throttled by $RTT$: $\\text{Throughput} \\approx \\frac{\\text{Frame Size}}{RTT}$.</td><td>Matches physical line rate: $\\text{Throughput} \\approx \\text{Bandwidth}$.</td></tr>
            <tr><td><strong>Buffer Memory</strong></td><td>Sender: 1 frame; Receiver: 0–1 frame.</td><td>Sender: $W$ frames; Receiver: 1 (GBN) or $W$ (SR).</td></tr>
            <tr><td><strong>Sequence Number Space</strong></td><td>1 bit ($0$ and $1$ alternating).</td><td>$m$ bits (modulo $2^m$, typically 3 to 16 bits).</td></tr>
            <tr><td><strong>Implementation Complexity</strong></td><td>Minimal (simple state machine, 1 timer).</td><td>High (multiple window pointers, queues, timer management).</td></tr>
            <tr><td><strong>Acknowledgment Mechanism</strong></td><td>Individual ACK per frame.</td><td>Cumulative ACKs, Selective ACKs (SACK), Piggybacking.</td></tr>
            <tr><td><strong>Ideal Use Cases</strong></td><td>Low-speed, short-distance lines; simple MCUs.</td><td>High-speed Ethernet, WANs, satellite, modern Internet (TCP).</td></tr>
          </tbody>
        </table>
      `,
      workedExamples: {
        level1: "<strong>Question:</strong> A satellite channel has $T_{\\text{prop}} = 270$ ms and bandwidth 10 Mbps. Frame size is 1000 bytes (8000 bits). Calculate the link efficiency under Stop-and-Wait.<br><br><strong>Solution:</strong><br>1. $T_{\\text{trans}} = \\frac{8000 \\text{ bits}}{10 \\times 10^6 \\text{ bps}} = 0.8 \\text{ ms} = 0.0008 \\text{ s}$.<br>2. $a = \\frac{T_{\\text{prop}}}{T_{\\text{trans}}} = \\frac{270 \\text{ ms}}{0.8 \\text{ ms}} = 337.5$.<br>3. Stop-and-Wait efficiency $\\eta = \\frac{1}{1 + 2a} = \\frac{1}{1 + 2(337.5)} = \\frac{1}{676} = \\mathbf{0.148\\%}$!<br>Stop-and-Wait leaves 99.85% of the satellite link completely idle.",
        level2: "<strong>Problem:</strong> For the exact same satellite link in Level 1 ($a = 337.5$, Bandwidth = 10 Mbps), calculate the minimum window size $W$ needed to achieve 100% link utilization, and find the resulting throughput.<br><br><strong>Solution:</strong><br>1. For $\\eta = 100\\%$: $W \\ge 1 + 2a = 1 + 2(337.5) = 1 + 675 = \\mathbf{676 \\text{ frames}}$.<br>2. Sequence bits required: $2^m - 1 \\ge 676 \\implies 2^{10} = 1024 \\implies m = 10$ bits.<br>3. Resulting Throughput = $10 \\text{ Mbps} \\times 1.00 = \\mathbf{10 \\text{ Mbps}}$ (full line saturation!).",
        level3: "<strong>Throughput Comparison:</strong> Compare the actual throughput of Stop-and-Wait vs Sliding Window ($W = 676$) in the problem above.<br><br><strong>Calculation:</strong><br>• Stop-and-Wait Throughput = $\\eta \\times B = 0.00148 \\times 10 \\text{ Mbps} = \\mathbf{14.8 \\text{ kbps}}$ (painfully slow dial-up speed!).<br>• Sliding Window Throughput = $1.00 \\times 10 \\text{ Mbps} = \\mathbf{10,000 \\text{ kbps}}$ (676 times faster!)."
      },
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Criterion</th><th>Stop-and-Wait</th><th>Sliding Window</th></tr></thead>
          <tbody>
            <tr><td>High Latency (Satellite / Transoceanic)</td><td>Completely unusable (throughput drops to near zero).</td><td>Flourishes: pipelines thousands of frames to saturate link.</td></tr>
            <tr><td>Low Cost / Simple Firmware</td><td>Ideal: runs in minimal RAM with zero complex queuing.</td><td>Overkill for low-speed sensors.</td></tr>
          </tbody>
        </table>
      `,
      whereUsed: [
        "Network protocol capacity planning and SLA bandwidth engineering",
        "TCP window size tuning across transatlantic internet backbones",
        "Satellite broadband modem firmware (Starlink, Viasat)"
      ],
      quiz: [
        {
          question: "What is the formula for the channel utilization (efficiency) of Stop-and-Wait protocol where a = Tprop / Ttrans?",
          options: [
            "eta = 1 / (1 + 2a)",
            "eta = 1 + 2a",
            "eta = a / (1 + a)",
            "eta = 2a / (1 + 2a)"
          ],
          correct: 0,
          explanation: "In Stop-and-Wait, the channel transmits for Ttrans and sits idle for 2*Tprop. Efficiency = Ttrans / (Ttrans + 2*Tprop) = 1 / (1 + 2a)."
        },
        {
          question: "What minimum window size W is required in a Sliding Window protocol to achieve 100% link utilization?",
          options: [
            "W >= 1 + 2a",
            "W = 1",
            "W = a",
            "W = 2a - 1"
          ],
          correct: 0,
          explanation: "When W >= 1 + 2a, the sender can transmit continuously without ever having to pause for an ACK, achieving 100% link saturation."
        },
        {
          question: "Why does Stop-and-Wait throughput collapse on high-speed satellite links?",
          options: [
            "Because transmission time is negligible compared to the massive round-trip propagation delay (a >> 1).",
            "Because satellites cannot transmit radio waves at night.",
            "Because satellite transceivers cannot understand 1-bit sequence numbers.",
            "Because Stop-and-Wait frames are incompatible with vacuum."
          ],
          correct: 0,
          explanation: "A tiny transmission time combined with an immense round-trip delay means the sender spends 99.9% of its time sitting idle waiting for feedback."
        }
      ],
      references: [
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th/6th Edition, Chapter 11.4 & 11.5, pp. 351–365.", url: "" },
        { cite: "William Stallings, Data and Computer Communications, 10th Edition, Pearson, Chapter 7 'Flow Control and Error Control'.", url: "" }
      ]
    }
  }
};

module.exports = slidingWindowTopics;

