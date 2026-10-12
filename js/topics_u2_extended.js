// Unit II Extended Topics Database: Data Link Layer, MAC Sublayer & Network Devices
// Aligned with Tanenbaum & Wetherall (6th Ed.), Forouzan (6th Ed.), and Kurose & Ross
// Full 17-Point Structural Article Architecture with Multi-Question Quizzes & Progressive Examples

const TOPICS_U2_EXT = {

  // =========================================================================
  // TOPIC 18: DLL DESIGN ISSUES & SERVICES (Topic 1 in PDF, pp. 19-48)
  // =========================================================================
  "dll-design-issues": {
    id: "dll-design-issues",
    title: "Design Issues of the Data Link Layer",
    unit: "Unit II: Data Link Layer & MAC Sublayer",
    unitId: "unit2",
    level: "Beginner → Intermediate",
    category: "datalink",
    difficulty: "Core",
    readingTime: "25–35 min",
    standard: "OSI Layer 2 / IEEE 802 / Tanenbaum Ch. 3",
    oneLiner: "The four pillars of Layer 2: services provided to Network Layer, framing, error control, and flow control.",
    quickAnswer: "The Data Link Layer transforms raw, unreliable physical bitstreams into discrete, error-checked frames, providing services to the network layer, framing boundaries, error detection/correction, and receiver flow pacing.",
    whyItMatters: "The physical layer only transmits unstructured bit pulses. Without Layer 2 design mechanisms, receivers cannot identify frame boundaries, know which device should receive data, detect electrical noise corruption, or prevent buffer overflow.",
    prerequisitesList: [
      { concept: "Bit", meaning: "A binary digit: 0 or 1." },
      { concept: "Byte", meaning: "A group of 8 bits (octet)." },
      { concept: "Packet", meaning: "A unit of data handled by the Network Layer (OSI Layer 3)." },
      { concept: "Frame", meaning: "A unit of data organized by the Data Link Layer (OSI Layer 2)." },
      { concept: "Network Layer", meaning: "OSI Layer 3, responsible for host-to-host packet delivery across networks." },
      { concept: "Physical Layer", meaning: "OSI Layer 1, responsible for transmitting raw signals representing bits." }
    ],
    learningObjectives: [
      "Define the Data Link Layer and explain its architectural purpose.",
      "Identify the four major design issues: Services, Framing, Error Control, Flow Control.",
      "Explain the three classic services offered to the Network Layer.",
      "Describe and compare the four main framing methods.",
      "Distinguish flow control from error control and congestion control.",
      "Apply these concepts to real networking technologies (Ethernet, Wi-Fi, HDLC)."
    ],
    infobox: {
      layer: "Layer 2 (Data Link Layer)",
      standard: "ISO/IEC 7498-1 (OSI), IEEE 802",
      type: "Architectural Foundations",
      keyFormula: "\\text{L2 Services} = \\{\\text{Unack Connectionless}, \\text{Ack Connectionless}, \\text{Ack Connection-Oriented}\\}",
      prerequisites: ["protocol-stack", "encapsulation"],
      relatedConcepts: ["framing", "error-detection", "flow-control", "ethernet"],
      compareWith: ["network-layer"],
      primaryUses: ["Ethernet links, Wi-Fi associations, Point-to-Point serial links, cellular radio links"]
    },
    sections: {
      overview: `the architectural responsibilities of OSI Layer 2, which sits between the Physical Layer and Network Layer. It defines how network-layer packets are encapsulated into frames, what delivery guarantees are offered across a single link hop, how transmission errors are handled, and how the sender avoids overwhelming receiver memory.`,
      eli10: `Imagine the post office only knows how to lay down miles of train tracks (Layer 1). Layer 2 is the team that builds the train cars (framing), paints the boxcar numbers (addressing), inspects the locks for rust or damage (error control), and makes sure the trains don't arrive faster than workers can unload them (flow control)!`,
      analogy: `A regional courier delivery service transporting parcels between warehouses. The courier must identify each parcel (framing and addressing), know where each box begins and ends (boundaries), check boxes for crushed corners (error detection), and avoid dumping boxes faster than the unloading dock can scan them (flow control).`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Layer 2 Interface:</strong> The Data Link Layer receives IP packets from Layer 3, encapsulates them into link frames with headers and trailers, and passes them to Layer 1.</li>
          <li><strong>Single-Hop Scope:</strong> A frame normally travels across <em>one physical link at a time</em>. When a packet traverses five routers, its Layer 2 frame is stripped and rebuilt with new link headers at each routed hop!</li>
          <li><strong>Four Design Issues:</strong>
            <ul class="wiki-bullet-list">
              <li><strong>1. Services:</strong> Decides delivery guarantees (unacknowledged vs. acknowledged, connectionless vs. connection-oriented).</li>
              <li><strong>2. Framing:</strong> Breaks continuous bitstreams into identifiable units (character count, byte stuffing, bit stuffing, coding violations).</li>
              <li><strong>3. Error Control:</strong> Handles corrupted, lost, or duplicate frames using redundancy (parity, checksum, CRC, Hamming code, FEC, ARQ).</li>
              <li><strong>4. Flow Control:</strong> Regulates transmission speed to prevent overwhelming receiver buffer capacity (Stop-and-Wait, Sliding Window).</li>
            </ul>
          </li>
        </ol>`,
      diagram: `
+------------------------------------------------------------------------+
|                      OSI LAYER 2: THE FOUR PILLARS                     |
+-------------------+------------------+----------------+----------------+
|    1. SERVICES    |    2. FRAMING    |3. ERROR CONTROL| 4. FLOW CONTROL|
+-------------------+------------------+----------------+----------------+
| Unack Connection- | Character Count  | Parity / CRC   | Stop-and-Wait  |
| less (Ethernet)   | Byte Stuffing    | Checksum       | Sliding Window |
| Ack Connectionless| Bit Stuffing     | FEC (Hamming)  | Credit / PAUSE |
| (802.11 Wi-Fi)    | Coding Violation | ARQ (GBN / SR) | (Buffer space) |
| Ack Connection-   | (Preamble / SFD) | (FCS Trailer)  |                |
| Oriented (HDLC)   |                  |                |                |
+-------------------+------------------+----------------+----------------+`,
      interactiveLabKey: "stuffing",
      technicalDetails: `
        <p><strong>The Three Classic Service Types:</strong></p>
        <table class="wiki-table">
          <thead><tr><th>Feature</th><th>Unacknowledged Connectionless</th><th>Acknowledged Connectionless</th><th>Acknowledged Connection-Oriented</th></tr></thead>
          <tbody>
            <tr><td>Connection Setup?</td><td>No</td><td>No</td><td>Yes (3-phase: Setup, Transfer, Teardown)</td></tr>
            <tr><td>Layer 2 ACKs?</td><td>No</td><td>Yes (per-frame link ACKs)</td><td>Yes (sliding window sequence ACKs)</td></tr>
            <tr><td>Link-Layer Recovery?</td><td>Not provided</td><td>Provided via retransmissions</td><td>Provided with strict in-order delivery</td></tr>
            <tr><td>Overhead</td><td>Lowest</td><td>Medium</td><td>Highest</td></tr>
            <tr><td>Typical Example</td><td>Traditional Ethernet (IEEE 802.3)</td><td>IEEE 802.11 Wi-Fi unicast</td><td>HDLC, LAPB, ATM</td></tr>
          </tbody>
        </table>`,
      workedExamples: {
        level1: `<strong>Problem:</strong> A network link carries packets across a reliable, low-noise fiber optic cable in a data center. Which Layer 2 service type is most appropriate?<br><br>
<strong>Solution:</strong><br>
<strong>Unacknowledged connectionless service</strong> (like standard Ethernet). Because fiber optic bit error rates are negligible ($< 10^{-12}$), adding per-frame Layer 2 acknowledgments would introduce unnecessary bandwidth and latency overhead. Any rare lost packets are recovered end-to-end by TCP at Layer 4.`,
        level2: `<strong>Problem:</strong> A fast sender transmits 100 frames/sec to a receiver that processes only 60 frames/sec. Calculate backlog accumulation over 5 seconds and explain which design issue resolves this.<br><br>
<strong>Working:</strong><br>
1. $\\text{Backlog growth rate} = 100 - 60 = 40\\text{ frames/second}$.<br>
2. After 5 seconds: $40 \\times 5 = \\mathbf{200\\text{ frames}}$ accumulated in buffer queue.<br>
3. Without intervention, receiver buffers overflow and frames are dropped.<br>
4. Design Issue: <strong>Flow Control</strong> (Stop-and-Wait or Sliding Window) throttles the sender to match receiver processing rate.`,
        level3: `<strong>Problem:</strong> Contrast how error control is handled when an Ethernet frame fails its FCS vs. when an 802.11 Wi-Fi frame fails its FCS.<br><br>
<strong>Analysis:</strong><br>
1. <strong>Ethernet (Unacknowledged connectionless):</strong> When the receiver detects an FCS failure, it silently drops the frame. The Ethernet MAC does NOT retransmit it.<br>
2. <strong>Wi-Fi (Acknowledged connectionless):</strong> Wireless air is prone to RF noise. The receiver does not send an ACK for the corrupted frame. The sender's link-layer timer expires, and the Wi-Fi MAC layer automatically retransmits the frame up to its retry limit!`
      },
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Design Aspect</th><th>Primary Advantage</th><th>Trade-Off / Limitation</th></tr></thead>
          <tbody>
            <tr><td>Services</td><td>Allows link guarantees tailored to physical media</td><td>Guarantees differ substantially across technologies</td></tr>
            <tr><td>Framing</td><td>Organizes raw bits into manageable units</td><td>Header, trailer, and stuffing overhead</td></tr>
            <tr><td>Error Control</td><td>Prevents undetected delivery of corrupted data</td><td>Detection alone does not repair data; ARQ adds delay</td></tr>
            <tr><td>Flow Control</td><td>Protects receiver buffer queues from exhaustion</td><td>Can reduce transmission rate below full wire speed</td></tr>
          </tbody>
        </table>`,
      whereUsed: [
        "Ethernet (IEEE 802.3): Unacknowledged connectionless service, preamble framing, CRC-32 error detection.",
        "Wi-Fi (IEEE 802.11): Acknowledged connectionless service with link-layer Stop-and-Wait ACKs.",
        "HDLC / PPP (RFC 1662): Point-to-point links with bit stuffing and byte stuffing."
      ],
      commonMistakes: `
        <ul class="wiki-bullet-list">
          <li><strong>Misconception 1: Every frame is acknowledged:</strong> FALSE. Ethernet never acknowledges frames at Layer 2; Wi-Fi does.</li>
          <li><strong>Misconception 2: Error detection corrects data:</strong> FALSE. Error detection (CRC) only determines if bits were corrupted; it does not repair them.</li>
          <li><strong>Misconception 3: Flow control and congestion control are identical:</strong> FALSE. Flow control protects the receiving station; congestion control protects intermediate network links.</li>
          <li><strong>Misconception 4: A packet and a frame are identical:</strong> FALSE. A packet belongs to Layer 3 (Network); a frame belongs to Layer 2 (Data Link).</li>
        </ul>`,
      compareWith: {
        title: "Flow Control vs. Error Control",
        note: "Flow control prevents receiver buffer overrun; error control handles corrupted or lost frames."
      },
      quiz: [
        {
          question: "Which Data Link Layer function is responsible for identifying where data units begin and end?",
          options: ["Flow control", "Framing", "Error correction", "Routing"],
          correctIndex: 1,
          explanation: "Framing establishes identifiable boundaries in a stream of physical bits."
        },
        {
          question: "Which framing method inserts an escape byte when a reserved delimiter occurs in payload?",
          options: ["Bit stuffing", "Character count", "Byte stuffing", "Forward Error Correction"],
          correctIndex: 2,
          explanation: "Byte stuffing inserts an escape byte before any delimiter byte appearing inside payload data."
        },
        {
          question: "What is the primary purpose of flow control?",
          options: ["Choose the network route", "Prevent receiver buffer overload", "Encrypt the payload", "Correct every bit error"],
          correctIndex: 1,
          explanation: "Flow control matches transmission rate to receiver capacity to prevent buffer overflow."
        },
        {
          question: "What does CRC primarily provide at the Data Link Layer?",
          options: ["Error detection", "Guaranteed error correction", "Dynamic routing", "Receiver buffering"],
          correctIndex: 0,
          explanation: "CRC detects many common patterns of bit corruption; it does not correct corrupted bits."
        },
        {
          question: "Which technique can correct supported bit errors without requiring retransmission?",
          options: ["ARQ only", "Forward Error Correction (FEC)", "Character count", "Congestion control"],
          correctIndex: 1,
          explanation: "FEC adds structured redundant check bits (e.g. Hamming code) allowing receiver to repair errors locally."
        },
        {
          question: "What is the main difference between flow control and congestion control?",
          options: ["They are identical", "Flow control protects the receiver; congestion control protects the network", "Flow control selects routes; congestion control detects frame boundaries", "Flow control is Layer 1; congestion control is Layer 7"],
          correctIndex: 1,
          explanation: "Flow control prevents receiver buffer overrun; congestion control prevents network infrastructure collapse."
        },
        {
          question: "Which statement about traditional Ethernet is correct?",
          options: ["Every frame is acknowledged at Layer 2", "It retransmits every corrupted frame automatically at Layer 2", "It uses an FCS for error detection but does not acknowledge every frame at Layer 2", "It always uses Stop-and-Wait flow control"],
          correctIndex: 2,
          explanation: "Traditional Ethernet provides unacknowledged connectionless service; it verifies FCS and discards corrupted frames without Layer 2 ACKs."
        }
      ],
      references: [
        { cite: "Tanenbaum, A. S., & Feamster, N. Computer Networks (6th Ed.) - Chapter 3: The Data Link Layer.", url: "https://www.pearson.com" },
        { cite: "Kurose, J. F., & Ross, K. W. Computer Networking: A Top-Down Approach (8th Ed.) - Chapter 6.", url: "https://www.pearson.com" },
        { cite: "RFC 1662 - PPP in HDLC-like Framing.", url: "https://www.rfc-editor.org/rfc/rfc1662" }
      ]
    },
    prevTopicId: "encapsulation", nextTopicId: "framing"
  },

  // =========================================================================
  // TOPIC 19: SIMPLEX PROTOCOLS (PDF Topic 6, pp. 144-152)
  // =========================================================================
  "simplex-protocol": {
    id: "simplex-protocol",
    title: "Simplex Data Link Protocols",
    unit: "Unit II: Data Link Layer & MAC Sublayer",
    unitId: "unit2",
    level: "Beginner → Intermediate",
    category: "datalink",
    difficulty: "Core",
    readingTime: "20–25 min",
    standard: "Tanenbaum Protocols 1 & 2 / Forouzan",
    oneLiner: "Theoretical foundational protocols: Unrestricted Simplex (Utopian) and Simplex Stop-and-Wait.",
    quickAnswer: "Unrestricted Simplex assumes an ideal, error-free channel with infinite receiver buffers; Simplex Stop-and-Wait adds receiver pacing feedback to accommodate finite processing speed.",
    whyItMatters: "These protocols form the conceptual baseline for all modern reliable transport design, isolating the problem of transmission speed mismatch before introducing error recovery.",
    prerequisitesList: [
      { concept: "Simplex Communication", meaning: "Data travels strictly in one direction from sender to receiver." },
      { concept: "Half-Duplex", meaning: "Both devices can transmit, but not simultaneously." },
      { concept: "Full-Duplex", meaning: "Both devices can transmit simultaneously in both directions." }
    ],
    learningObjectives: [
      "Distinguish simplex, half-duplex, and full-duplex communication modes.",
      "Explain the ideal assumptions of the Unrestricted Simplex (Utopian) Protocol.",
      "Understand why Simplex Stop-and-Wait introduces a reverse feedback acknowledgment.",
      "Analyze the state transition model and timeline of Stop-and-Wait."
    ],
    infobox: {
      layer: "Layer 2 (Data Link Layer)",
      standard: "Theoretical Protocol Models",
      type: "Foundational Flow Protocols",
      keyFormula: "\\text{Simplex: } A \\to B \\quad | \\quad \\text{Stop-and-Wait: } A \\xrightarrow{\\text{Frame}} B \\implies B \\xrightarrow{\\text{Ready}} A",
      prerequisites: ["dll-design-issues"],
      relatedConcepts: ["stop-and-wait", "flow-control", "sliding-window"],
      compareWith: ["stop-and-wait"],
      primaryUses: ["Classroom protocol foundations, radio broadcast telemetry, simplex sensors"]
    },
    sections: {
      overview: `the foundational baseline protocols that demonstrate how devices communicate over a unidirectional or half-duplex channel, starting with ideal theoretical assumptions and progressing to flow-regulated transmission.`,
      eli10: `Imagine you are talking to someone over a one-way loudspeaker. In the "Utopian" world, you assume the listener never blinks, never gets tired, and understands every word instantly. But in real life, you must pause after every sentence and wait for them to give a thumbs-up before you say the next sentence!`,
      analogy: `Broadcasting television vs. walking with a walkie-talkie: TV towers blast signals without ever checking if your TV is turned on (Unrestricted Simplex). A walkie-talkie requires saying "Over!" so the other person can acknowledge before you speak again (Stop-and-Wait).`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Unrestricted Simplex Protocol (Protocol 1):</strong>
            <ul class="wiki-bullet-list">
              <li>Assumptions: Completely error-free channel, zero lost frames, infinite receiver buffer capacity, sender transmits continuously.</li>
              <li>Sender loop: <code>get_packet() &rarr; make_frame() &rarr; to_physical_layer()</code> forever.</li>
              <li>Receiver loop: <code>from_physical_layer() &rarr; deliver_packet()</code> forever.</li>
              <li>Fatal Flaw: Unrealistic. Channels experience noise, and real receivers have finite buffers that overflow.</li>
            </ul>
          </li>
          <li><strong>Simplex Stop-and-Wait Protocol (Protocol 2):</strong>
            <ul class="wiki-bullet-list">
              <li>Assumptions: Channel is still assumed error-free, but receiver has finite processing speed.</li>
              <li>Sender sends one frame, then <strong>waits</strong> until the receiver accepts it and returns a dummy "Ready" acknowledgment frame.</li>
              <li>Receiver processes the frame, then returns the "Ready" signal.</li>
              <li>Sender receives the signal, advances, and sends the next frame.</li>
            </ul>
          </li>
        </ol>`,
      diagram: `
Protocol 1: Unrestricted Simplex       Protocol 2: Simplex Stop-and-Wait
Sender           Receiver             Sender           Receiver
  |                 |                   |                 |
  |--- Frame 1 ---->|                   |--- Frame 1 ---->|
  |--- Frame 2 ---->|                   |                 | (Processing)
  |--- Frame 3 ---->|                   |<-- Ready -------|
  |                 |                   |--- Frame 2 ---->|
(Assumes infinite buffer!)              (Waits for receiver capacity!)`,
      interactiveLabKey: "sliding-window",
      technicalDetails: `
        <table class="wiki-table">
          <thead><tr><th>Mode</th><th>Direction</th><th>Simultaneous?</th><th>Example</th></tr></thead>
          <tbody>
            <tr><td>Simplex</td><td>One direction only ($A \\to B$)</td><td>No return channel</td><td>FM Radio, GPS broadcast, telemetry sensors</td></tr>
            <tr><td>Half-Duplex</td><td>Both directions ($A \\leftrightarrow B$)</td><td>No (Take turns)</td><td>Walkie-talkies, classic shared Ethernet hubs</td></tr>
            <tr><td>Full-Duplex</td><td>Both directions ($A \\leftrightarrow B$)</td><td>Yes (Simultaneous)</td><td>Modern switched Ethernet, telephone call</td></tr>
          </tbody>
        </table>`,
      workedExamples: {
        level1: `<strong>Problem:</strong> Explain why the Unrestricted Simplex protocol does not require acknowledgments or sequence numbers.<br><br>
<strong>Solution:</strong><br>
Because the protocol assumes an ideal channel where frames are <em>never corrupted, never lost, and never delayed</em>, and the receiver has infinite processing speed. Every frame transmitted is guaranteed to arrive and be processed instantly.`,
        level2: `<strong>Problem:</strong> In Simplex Stop-and-Wait, what happens if the receiver takes 5 ms to process a frame, while the wire transmission takes 1 ms? Trace the timeline.<br><br>
<strong>Working:</strong><br>
- T = 0 ms: Sender begins transmission.<br>
- T = 1 ms: Frame leaves wire and arrives at receiver.<br>
- T = 1 to 6 ms: Receiver processes frame (5 ms delay). Sender remains idle.<br>
- T = 6 ms: Receiver sends "Ready" signal.<br>
- T = 7 ms: Sender receives "Ready" and dispatches Frame 2.<br>
<em>Result: Flow control successfully prevented buffer overflow at the cost of sender idle waiting.</em>`,
        level3: `<strong>Problem:</strong> If a noise burst corrupts Frame 1 in the Simplex Stop-and-Wait protocol (Protocol 2), what catastrophic failure occurs?<br><br>
<strong>Analysis:</strong><br>
Protocol 2 has <strong>no retransmission timer</strong>! The damaged frame is discarded by the receiver, so the receiver never sends the "Ready" acknowledgment. The sender sits blocked forever waiting for "Ready" (Deadlock!). This proves why Stop-and-Wait ARQ (Protocol 3) MUST incorporate timers and sequence numbers.`
      },
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Protocol</th><th>Advantage</th><th>Fatal Limitation</th></tr></thead>
          <tbody>
            <tr><td>Unrestricted Simplex</td><td>Zero overhead, maximum channel throughput</td><td>Completely unrealistic; crashes on any real channel</td></tr>
            <tr><td>Simplex Stop-and-Wait</td><td>Prevents receiver buffer overrun</td><td>Deadlocks permanently if a frame or ACK is lost in noise</td></tr>
          </tbody>
        </table>`,
      whereUsed: [
        "Unidirectional fiber-optic data diodes in high-security military networks.",
        "Satellite TV (DVB-S) and radio broadcasts.",
        "Foundational computer science curriculum (Tanenbaum Ch. 3)."
      ],
      commonMistakes: `
        <ul class="wiki-bullet-list">
          <li><strong>Assuming simplex means unreliable:</strong> Simplex describes direction of transmission, not reliability. A simplex protocol can incorporate Forward Error Correction (FEC) for high reliability.</li>
        </ul>`,
      quiz: [
        {
          question: "What does the Unrestricted Simplex protocol assume about the communication channel?",
          options: ["High noise and packet loss", "Error-free channel and an always-ready receiver with infinite buffer", "Full-duplex bidirectional switching", "CSMA collision detection"],
          correctIndex: 1,
          explanation: "The Utopian protocol assumes the channel never corrupts or loses frames and the receiver never runs out of buffer space."
        },
        {
          question: "Why does the Simplex Stop-and-Wait protocol introduce a reverse acknowledgment signal?",
          options: ["To encrypt data", "To pace transmission and prevent overwhelming the receiver's processing capacity", "To measure cable length", "To assign MAC addresses"],
          correctIndex: 1,
          explanation: "The reverse signal allows the receiver to tell the sender when it has finished processing the previous frame and is ready for the next."
        }
      ],
      references: [
        { cite: "Tanenbaum & Wetherall, Computer Networks (6th Ed.) - Section 3.3.1 & 3.3.2.", url: "https://www.pearson.com" }
      ]
    },
    prevTopicId: "flow-control", nextTopicId: "stop-and-wait"
  },

  // =========================================================================
  // TOPIC 20: CHANNEL ALLOCATION PROBLEM (PDF Topic 7, pp. 166-179)
  // =========================================================================
  "channel-allocation": {
    id: "channel-allocation",
    title: "MAC Sublayer & The Channel Allocation Problem",
    unit: "Unit II: Data Link Layer & MAC Sublayer",
    unitId: "unit2",
    level: "Beginner → Intermediate",
    category: "datalink",
    difficulty: "Core",
    readingTime: "30 min",
    standard: "IEEE 802 LAN / Tanenbaum Ch. 4",
    oneLiner: "How multiple competing devices share a single broadcast communication channel efficiently and fairly.",
    quickAnswer: "The Medium Access Control (MAC) sublayer coordinates how devices share a single transmission channel, resolving the Channel Allocation Problem via Static (FDM/TDM) or Dynamic (Random/Controlled) allocation.",
    whyItMatters: "When multiple computers share a single cable or radio frequency, simultaneous transmissions collide and destroy data. MAC protocols define the traffic rules that prevent or resolve contention.",
    prerequisitesList: [
      { concept: "Shared Channel", meaning: "A transmission medium (cable, airwaves) shared by multiple stations." },
      { concept: "Collision", meaning: "Overlapping transmissions interfering so that no receiver can decode the signal." },
      { concept: "MAC Sublayer", meaning: "The lower sublayer of Layer 2 managing access to physical media." }
    ],
    learningObjectives: [
      "Distinguish the MAC sublayer from the Logical Link Control (LLC) sublayer.",
      "Understand the Channel Allocation Problem and key performance metrics (throughput, delay, fairness).",
      "Compare Static Channel Allocation (FDM/TDM) against Dynamic Channel Allocation.",
      "Classify dynamic MAC protocols: Random Access, Controlled Access, Channelization."
    ],
    infobox: {
      layer: "Layer 2 (Lower MAC Sublayer)",
      standard: "IEEE 802 Architecture, ITU-T",
      type: "Multi-Access Coordination",
      keyFormula: "\\text{Delay}_{\\text{FDM}} = \\frac{T}{1 - \\lambda / (C/N)} \\gg \\text{Delay}_{\\text{Dynamic}}",
      prerequisites: ["dll-design-issues"],
      relatedConcepts: ["aloha", "csma-protocols", "collision-free-protocols", "ethernet"],
      compareWith: ["ethernet"],
      primaryUses: ["Ethernet broadcast bus, Wi-Fi radio bands, satellite transponders, cellular base stations"]
    },
    sections: {
      overview: `the central design challenge of the Medium Access Control (MAC) sublayer: how to divide or allocate a single shared broadcast channel among multiple competing stations so that bandwidth is used efficiently, collisions are minimized, and all stations receive fair access.`,
      eli10: `Imagine 30 students in a classroom who all want to speak. If everyone talks at once, nobody understands anything (a collision!). You need a system: either assign each student 1 minute on the clock (TDM), give each student their own private room (FDM), or have students raise their hands and take turns (MAC protocols)!`,
      analogy: `A round-table discussion with one shared microphone: Either a moderator passes the mic in order (controlled access), or whoever sees the mic free grabs it (contention), with a rule for what to do if two hands grab it at the same moment.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Layer 2 Sublayer Split (IEEE 802):</strong>
            <ul class="wiki-bullet-list">
              <li><em>LLC (Logical Link Control - 802.2):</em> Upper sublayer providing a uniform interface and flow/error control to Layer 3, hiding media differences.</li>
              <li><em>MAC (Medium Access Control):</em> Lower sublayer managing medium-specific framing, addressing, and channel access arbitration.</li>
            </ul>
          </li>
          <li><strong>Static Channel Allocation:</strong> Divides capacity in advance.
            <ul class="wiki-bullet-list">
              <li><em>FDM:</em> Divides total bandwidth into $N$ fixed frequency bands.</li>
              <li><em>TDM:</em> Divides time into repeating round-robin slots.</li>
              <li><em>Flaw with Computer Traffic:</em> Computer data is bursty (peak-to-average ratio $1000:1$). If a station has no traffic, its assigned slot sits empty and wasted!</li>
            </ul>
          </li>
          <li><strong>Dynamic Channel Allocation:</strong> Stations compete for or receive channel capacity on demand as traffic arises.</li>
        </ol>`,
      diagram: `
+-------------------------------------------------------------+
|                    IEEE 802 LAN ARCHITECTURE                |
+-------------------------------------------------------------+
| NETWORK LAYER (OSI Layer 3 - IP Packets & Routing)          |
+-------------------------------------------------------------+
| DATA LINK LAYER (OSI Layer 2):                              |
|   +-------------------------------------------------------+ |
|   | LLC Sublayer (IEEE 802.2 - Logical Link Control)      | |
|   +-------------------------------------------------------+ |
|   | MAC Sublayer (IEEE 802.3 Ethernet / 802.11 Wi-Fi)     | |
|   +-------------------------------------------------------+ |
+-------------------------------------------------------------+
| PHYSICAL LAYER (OSI Layer 1 - Signals, Bits, Radio Spectrum)|
+-------------------------------------------------------------+`,
      interactiveLabKey: "aloha-csma",
      technicalDetails: `
        <table class="wiki-table">
          <thead><tr><th>Feature</th><th>Static Allocation (FDM/TDM)</th><th>Dynamic Allocation (Random/Controlled)</th></tr></thead>
          <tbody>
            <tr><td>Resource Assignment</td><td>Predetermined, fixed division</td><td>Assigned on demand as frames arrive</td></tr>
            <tr><td>Performance with Bursty Traffic</td><td>Poor; idle stations waste capacity</td><td>Excellent; active stations use full channel</td></tr>
            <tr><td>Delay at Low Load</td><td>High (must wait for assigned slot)</td><td>Very low (transmit immediately)</td></tr>
            <tr><td>Collisions</td><td>Impossible by design</td><td>Possible in random access contention</td></tr>
            <tr><td>Typical Use</td><td>Traditional telephone voice circuits</td><td>Ethernet, Wi-Fi, Internet packet data</td></tr>
          </tbody>
        </table>`,
      workedExamples: {
        level1: `<strong>Problem:</strong> Explain why static FDM is inefficient for bursty computer traffic.<br><br>
<strong>Solution:</strong><br>
In FDM, channel capacity $C$ is divided into $N$ independent sub-channels of capacity $C/N$. If only 1 out of 10 stations has data to send, that active station is throttled to only $1/10$th of the wire speed, while the other $9/10$ths of the channel sit completely empty and wasted.`,
        level2: `<strong>Problem:</strong> A channel has total capacity $C = 100$ Mbps and $N = 10$ stations. A bursty station has 10 Mb of data to send. Compare transmission time under FDM vs. Dynamic access.<br><br>
<strong>Working:</strong><br>
- Under FDM: Station is restricted to bandwidth $C/N = 10$ Mbps. Transmission time $= \\frac{10\\text{ Mb}}{10\\text{ Mbps}} = \\mathbf{1.0\\text{ second}}$.<br>
- Under Dynamic allocation: Station uses full 100 Mbps channel. Transmission time $= \\frac{10\\text{ Mb}}{100\\text{ Mbps}} = \\mathbf{0.1\\text{ seconds}}$ (10x faster!).`,
        level3: `<strong>Problem:</strong> Name the 3 broad families of dynamic channel allocation and cite one real-world protocol for each.<br><br>
<strong>Analysis:</strong><br>
1. <strong>Random Access (Contention):</strong> Stations transmit without centralized permission; collisions can occur (e.g. Ethernet CSMA/CD, Wi-Fi CSMA/CA).<br>
2. <strong>Controlled Access:</strong> Stations coordinate or take turns; zero collisions (e.g. Token Ring IEEE 802.5, Bit-Map reservation).<br>
3. <strong>Channelization:</strong> Shared medium divided dynamically by codes/frequencies (e.g. Cellular CDMA, 4G/5G OFDMA).`
      },
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Method</th><th>Advantages</th><th>Disadvantages</th></tr></thead>
          <tbody>
            <tr><td>Random Access</td><td>Simple, zero setup delay at low load</td><td>Collisions increase and throughput drops under heavy load</td></tr>
            <tr><td>Controlled Access</td><td>Collision-free; orderly and predictable</td><td>Coordination overhead; stations wait for tokens/polls</td></tr>
          </tbody>
        </table>`,
      whereUsed: [
        "Ethernet LANs (Random Access CSMA/CD / Switched).",
        "Wi-Fi Wireless LANs (Random Access CSMA/CA).",
        "Cellular networks (TDMA, CDMA, OFDMA).",
        "Cable Internet DOCSIS (Reservation & Contention requests)."
      ],
      commonMistakes: `
        <ul class="wiki-bullet-list">
          <li><strong>Confusing MAC addressing with MAC sublayer:</strong> MAC addressing is just one feature. The MAC sublayer encompasses channel allocation, framing, collision management, and media rules.</li>
        </ul>`,
      quiz: [
        {
          question: "What is the primary function of the MAC sublayer in IEEE 802 architectures?",
          options: ["To route IP packets across the Internet", "To coordinate access to the shared communication medium", "To encrypt user files", "To replace physical cables"],
          correctIndex: 1,
          explanation: "The Medium Access Control sublayer defines the rules for sharing the physical transmission medium."
        },
        {
          question: "Which method divides a channel into separate frequency bands?",
          options: ["Frequency Division Multiplexing (FDM)", "Time Division Multiplexing (TDM)", "Polling", "Token passing"],
          correctIndex: 0,
          explanation: "FDM divides the spectrum into distinct frequency slices for different users."
        },
        {
          question: "Why is static channel allocation considered inefficient for computer networks?",
          options: ["Computers cannot understand frequencies", "Computer traffic is bursty, leaving pre-allocated channels idle while others are congested", "It causes infinite collisions", "It requires fiber optics"],
          correctIndex: 1,
          explanation: "Because computer traffic occurs in sporadic bursts, static channels waste capacity during quiet periods."
        },
        {
          question: "Which of the following is an example of controlled access?",
          options: ["Token passing", "Pure ALOHA", "1-persistent CSMA", "Uncoordinated transmission"],
          correctIndex: 0,
          explanation: "Token passing coordinates access by requiring a station to hold a token before transmitting, preventing collisions."
        }
      ],
      references: [
        { cite: "Tanenbaum & Wetherall, Computer Networks (6th Ed.) - Chapter 4: The Medium Access Control Sublayer.", url: "https://www.pearson.com" }
      ]
    },
    prevTopicId: "selective-repeat", nextTopicId: "aloha"
  },

  // =========================================================================
  // TOPIC 21: ALOHA (PURE & SLOTTED) (PDF Topic 8, pp. 179-186)
  // =========================================================================
  "aloha": {
    id: "aloha",
    title: "ALOHA Protocols (Pure & Slotted)",
    unit: "Unit II: Data Link Layer & MAC Sublayer",
    unitId: "unit2",
    level: "Beginner → Intermediate",
    category: "datalink",
    difficulty: "Core",
    readingTime: "25 min",
    standard: "Norman Abramson (1970) / University of Hawaii",
    oneLiner: "The pioneering random access protocols establishing the mathematical foundations of channel contention.",
    quickAnswer: "In Pure ALOHA, stations transmit whenever ready (max throughput 18.4% at G=0.5). Slotted ALOHA restricts transmissions to time slot boundaries, doubling throughput to 36.8% at G=1.0.",
    whyItMatters: "ALOHA introduced random backoff and contention-based transmission, forming the foundational ancestor of Ethernet CSMA/CD, Wi-Fi CSMA/CA, and cellular random access channels (RACH).",
    prerequisitesList: [
      { concept: "Vulnerable Period", meaning: "The time interval during which the start of another frame causes a collision." },
      { concept: "Offered Load (G)", meaning: "Average number of transmission attempts per frame time, including retransmissions." },
      { concept: "Throughput (S)", meaning: "The fraction of channel capacity successfully delivering useful frames." }
    ],
    learningObjectives: [
      "Explain the operational transmission rules of Pure and Slotted ALOHA.",
      "Derive the vulnerable period for Pure ALOHA ($2T$) and Slotted ALOHA ($T$).",
      "Analyze the throughput equations: $S = G e^{-2G}$ and $S = G e^{-G}$.",
      "Understand why random exponential backoff is required after collisions."
    ],
    infobox: {
      layer: "Layer 2 (MAC Sublayer)",
      standard: "ALOHANET (1970)",
      type: "Random Access Contention",
      keyFormula: "S_{\\text{pure}} = Ge^{-2G} \\ (18.4\\%), \\quad S_{\\text{slotted}} = Ge^{-G} \\ (36.8\\%)",
      prerequisites: ["channel-allocation"],
      relatedConcepts: ["csma-protocols", "collision-free-protocols", "ethernet"],
      compareWith: ["csma-protocols"],
      primaryUses: ["Cellular RACH initial access, satellite uplink contention, RFID tags"]
    },
    sections: {
      overview: `the pioneering random access protocol developed at the University of Hawaii under Norman Abramson to connect island campuses over shared radio frequencies, establishing the principles of packet collision and retransmission.`,
      eli10: `Imagine a group chat where anyone can text at any millisecond. If two people text at the exact same second, both messages get garbled and unreadable! In Slotted ALOHA, the teacher rings a bell every minute, and you are only allowed to send a message right on the chime. That cut collisions in half!`,
      analogy: `Entering a busy roundabout: In Pure ALOHA, cars enter the roundabout whenever they feel like it without looking. In Slotted ALOHA, a traffic officer allows cars to enter only on green light pulses every 5 seconds.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Pure ALOHA:</strong>
            <ul class="wiki-bullet-list">
              <li>Whenever a station has a frame ready, it transmits immediately without sensing the channel.</li>
              <li>Sender listens for an ACK. If received, success!</li>
              <li>If no ACK arrives within timeout, a collision is assumed. The station waits a <strong>random backoff time</strong> and retransmits.</li>
            </ul>
          </li>
          <li><strong>Slotted ALOHA:</strong>
            <ul class="wiki-bullet-list">
              <li>Time is synchronized into discrete slots of duration $T$ (one frame transmission time).</li>
              <li>Stations are permitted to transmit <em>only at the beginning of a slot</em>.</li>
              <li>If two stations have frames ready mid-slot, both must wait for the next boundary, preventing partial frame overlaps!</li>
            </ul>
          </li>
        </ol>`,
      diagram: `
Pure ALOHA Vulnerable Period = 2T:
Frame t0:                [------ Frame t0 ------]
Collision Range:   [--- Frame A ---]      [--- Frame B ---]
Time:             (t0 - T)        t0     (t0 + T)
Any frame starting between (t0 - T) and (t0 + T) destroys Frame t0!

Slotted ALOHA Vulnerable Period = T:
Slot k-1               Slot k (Starts at t0)        Slot k+1
|-------------------|---[ Frame t0 ]----|-------------------|
Frames only collide if transmitted in the EXACT same slot boundary!`,
      interactiveLabKey: "aloha-csma",
      technicalDetails: `
        <table class="wiki-table">
          <thead><tr><th>Parameter</th><th>Pure ALOHA</th><th>Slotted ALOHA</th></tr></thead>
          <tbody>
            <tr><td>Transmission Start Time</td><td>Any instant</td><td>Only at synchronized slot boundaries</td></tr>
            <tr><td>Clock Synchronization</td><td>Not required</td><td>Strict network-wide clock sync required</td></tr>
            <tr><td>Vulnerable Period</td><td>$2T$</td><td>$T$</td></tr>
            <tr><td>Throughput Equation</td><td>$S = G e^{-2G}$</td><td>$S = G e^{-G}$</td></tr>
            <tr><td>Max Throughput ($S_{\\max}$)</td><td>$\\frac{1}{2e} \\approx \\mathbf{18.4\\%}$ (at $G = 0.5$)</td><td>$\\frac{1}{e} \\approx \\mathbf{36.8\\%}$ (at $G = 1.0$)</td></tr>
          </tbody>
        </table>`,
      workedExamples: {
        level1: `<strong>Problem:</strong> Frame transmission time $T = 4$ ms. Calculate the vulnerable period for Pure ALOHA and Slotted ALOHA.<br><br>
<strong>Solution:</strong><br>
- Pure ALOHA: $\\text{Vulnerable Period} = 2T = 2 \\times 4\\text{ ms} = \\mathbf{8\\text{ ms}}$.<br>
- Slotted ALOHA: $\\text{Vulnerable Period} = T = \\mathbf{4\\text{ ms}}$.`,
        level2: `<strong>Problem:</strong> A Pure ALOHA channel has an offered load of $G = 0.5$. Calculate the throughput $S$ and explain its significance.<br><br>
<strong>Working:</strong><br>
$S = G e^{-2G} = 0.5 \\cdot e^{-2(0.5)} = 0.5 \\cdot e^{-1} = \\frac{0.5}{2.71828} \\approx \\mathbf{0.1839\\text{ (18.4\\%)}}$.<br>
This is the theoretical mathematical peak of Pure ALOHA. If offered load increases to $G = 1.0$, throughput falls to $S = 1.0 \\cdot e^{-2} \\approx 13.5\\%$ due to rampant collisions.`,
        level3: `<strong>Problem:</strong> Why does Slotted ALOHA achieve exactly twice the throughput of Pure ALOHA?<br><br>
<strong>Analysis:</strong><br>
In Pure ALOHA, a frame can collide with another frame that started up to $T$ seconds before it, OR another frame starting up to $T$ seconds after it (total vulnerability window $2T$). Slotted ALOHA forces all frames to start at the exact same slot tick, completely eliminating partial overlaps and halving the vulnerable interval to $T$. Because $P(\\text{no collision}) = e^{-G}$ instead of $e^{-2G}$, maximum throughput doubles from $18.4\\%$ to $36.8\\%$.`
      },
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Disadvantages</th></tr></thead>
          <tbody>
            <tr><td>Completely decentralized; zero carrier sensing required; perfect for low-duty-cycle bursty stations.</td><td>Low channel efficiency ($> 63\\%$ of channel wasted); collapses into zero throughput under heavy congestion.</td></tr>
          </tbody>
        </table>`,
      whereUsed: [
        "Cellular GSM/LTE/5G Random Access Channel (RACH) for phone initial connection.",
        "Automatic Identification System (AIS) transponders on maritime ships.",
        "Passive RFID tag reader interrogation."
      ],
      commonMistakes: `
        <ul class="wiki-bullet-list">
          <li><strong>Believing Slotted ALOHA eliminates collisions:</strong> FALSE. Slotted ALOHA eliminates <em>partial</em> overlaps, but collisions still occur whenever two stations choose the same time slot.</li>
        </ul>`,
      quiz: [
        {
          question: "What is the vulnerable period of Pure ALOHA for a frame of duration T?",
          options: ["T/2", "T", "2T", "4T"],
          correctIndex: 2,
          explanation: "In Pure ALOHA, any frame starting between t0 - T and t0 + T will collide, spanning a 2T vulnerable interval."
        },
        {
          question: "What is the maximum theoretical throughput of Slotted ALOHA?",
          options: ["18.4%", "25.0%", "36.8% (1/e)", "100%"],
          correctIndex: 2,
          explanation: "Slotted ALOHA reaches a peak throughput of S = 1/e ≈ 36.8% at offered load G = 1.0."
        },
        {
          question: "What is the primary operational requirement of Slotted ALOHA over Pure ALOHA?",
          options: ["Coaxial cables", "Global time synchronization among all participating stations", "Full-duplex transceivers", "Token ring cards"],
          correctIndex: 1,
          explanation: "All stations must share synchronized clock timing so frames are dispatched precisely at slot boundaries."
        }
      ],
      references: [
        { cite: "Abramson, N. (1970). THE ALOHA SYSTEM: another alternative for computer communications. AFIPS Fall Joint Computer Conference.", url: "https://dl.acm.org" }
      ]
    },
    prevTopicId: "channel-allocation",
    nextTopicId: "csma-protocols"
  },

  // =========================================================================
  // TOPIC 22: CSMA PROTOCOLS (PDF Topic 8, pp. 186-193)
  // =========================================================================
  "csma-protocols": {
    id: "csma-protocols",
    title: "CSMA Protocols (CSMA, CSMA/CD, CSMA/CA)",
    unit: "Unit II: Data Link Layer & MAC Sublayer",
    unitId: "unit2",
    level: "Intermediate → Advanced",
    category: "datalink",
    difficulty: "Core",
    readingTime: "30 min",
    standard: "IEEE 802.3 (CSMA/CD) / IEEE 802.11 (CSMA/CA)",
    oneLiner: "Carrier sense multiple access: sensing the medium before transmitting, with collision detection or avoidance.",
    quickAnswer: "CSMA listens to the channel before transmitting. CSMA/CD detects collisions during transmission on wired shared media; CSMA/CA avoids collisions using backoff counters on wireless channels.",
    whyItMatters: "CSMA dramatically increases channel throughput beyond ALOHA by verifying the channel is idle before blasting data. It is the core algorithm behind Ethernet and Wi-Fi.",
    prerequisitesList: [
      { concept: "Carrier Sensing", meaning: "Checking the physical medium for voltage or RF energy before transmitting." },
      { concept: "Propagation Delay (τ)", meaning: "Time taken for electrical/radio signals to travel end-to-end across the wire." }
    ],
    learningObjectives: [
      "Explain the fundamental principle of CSMA ('Listen Before Talking').",
      "Compare 1-persistent, Non-persistent, and p-persistent CSMA.",
      "Understand why collisions still occur in CSMA due to propagation delay.",
      "Trace CSMA/CD collision detection, jam signal, and Binary Exponential Backoff.",
      "Explain why wireless networks must use CSMA/CA instead of CSMA/CD."
    ],
    infobox: {
      layer: "Layer 2 (MAC Sublayer)",
      standard: "IEEE 802.3, IEEE 802.11",
      type: "Carrier Sense Contention",
      keyFormula: "T_{\\text{frame}} \\ge 2\\tau, \\quad \\text{Backoff: } [0, 2^k - 1]",
      prerequisites: ["aloha"],
      relatedConcepts: ["ethernet", "wifi-mac-sublayer", "channel-allocation"],
      compareWith: ["collision-free-protocols"],
      primaryUses: ["Classic shared Ethernet, IEEE 802.11 Wi-Fi, Apple LocalTalk"]
    },
    sections: {
      overview: `the family of contention protocols in which a network interface monitors (senses) the physical communication channel for the presence of a carrier signal before attempting to transmit its frame.`,
      eli10: `ALOHA is like shouting in a dark room without listening first. CSMA is like pausing, listening with your ear to hear if anyone else is speaking, and only speaking if the room is quiet!`,
      analogy: `Entering an intersection without a traffic light: You stop, look both ways to see if a car is coming, and only pull out when the road looks clear. (A collision can still happen if another car pulls out from behind a blind corner at the exact same instant!).`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Carrier Sense (Listen):</strong> Station listens to channel.</li>
          <li><strong>If Channel Busy:</strong> Follows persistence algorithm:
            <ul class="wiki-bullet-list">
              <li><em>1-Persistent:</em> Keeps listening continuously; transmits with probability 1 the instant channel becomes idle. (High collision if multiple stations wait!).</li>
              <li><em>Non-Persistent:</em> Waits a random time, then senses again. (Reduces collisions, but adds idle delay).</li>
              <li><em>p-Persistent:</em> If idle, transmits with probability $p$; defers to next slot with probability $1-p$.</li>
            </ul>
          </li>
          <li><strong>Why Collisions Still Happen:</strong> Signal propagation delay $\\tau$. Station A starts sending; Station B senses channel before A's signal reaches B. B assumes channel is idle and transmits &rarr; COLLISION!</li>
          <li><strong>CSMA/CD (Collision Detection - Ethernet):</strong> Station listens WHILE transmitting. If signal voltage exceeds normal threshold, collision detected! Station halts transmission immediately, emits a 32-bit JAM signal, and runs <strong>Binary Exponential Backoff</strong>.</li>
          <li><strong>CSMA/CA (Collision Avoidance - Wi-Fi):</strong> Wireless radios cannot reliably detect collisions while transmitting (transmitter drowns out receiver). Station uses random backoff counters and DIFS/SIFS intervals before transmitting.</li>
        </ol>`,
      diagram: `
Station A                                                 Station B
    |                                                         |
    |--- Transmits Frame ---------------->                   | (Signal propagating...)
    |                                     <-- Senses Idle! --| (A's signal has NOT arrived yet!)
    |                                     <-- Transmits! ----|
    |                                                         |
    |                     💥 COLLISION! 💥                    |
    |               (Signals overlap in the middle!)          |`,
      interactiveLabKey: "aloha-csma",
      technicalDetails: `
        <p><strong>Binary Exponential Backoff Algorithm (IEEE 802.3):</strong></p>
        <p>After collision number $i$ (up to 10 collisions):</p>
        <ul class="wiki-bullet-list">
          <li>Set $k = \\min(i, 10)$.</li>
          <li>Randomly choose an integer slot delay $r$ from range: $[0, 2^k - 1]$.</li>
          <li>Wait $r \\times 512$ bit times (slot time on 10 Mbps = 51.2 µs).</li>
          <li>After 16 consecutive collisions, abort frame and report error to higher layer!</li>
        </ul>
        <table class="wiki-table">
          <thead><tr><th>Collision #</th><th>Range of r</th><th>Max Wait (Slot Times)</th></tr></thead>
          <tbody>
            <tr><td>1st</td><td>0 to 1</td><td>1</td></tr>
            <tr><td>2nd</td><td>0 to 3</td><td>3</td></tr>
            <tr><td>3rd</td><td>0 to 7</td><td>7</td></tr>
            <tr><td>10th</td><td>0 to 1023</td><td>1023</td></tr>
          </tbody>
        </table>`,
      workedExamples: {
        level1: `<strong>Problem:</strong> Why can collisions still occur in CSMA even though every station senses the medium before sending?<br><br>
<strong>Solution:</strong><br>
Because electromagnetic signals propagate through wires at finite speed (typically $2 \\times 10^8$ m/s, or 5 µs per km). If Station A begins sending at $t = 0$, Station B (1 km away) will sense the cable as completely idle until $t = 5\\text{ µs}$. If B transmits during this window, a collision is inevitable.`,
        level2: `<strong>Problem:</strong> In CSMA/CD, two stations collide for the 3rd time. What is the range of backoff slots from which each station will select?<br><br>
<strong>Working:</strong><br>
For collision $i = 3$:<br>
Range $= [0, 2^i - 1] = [0, 2^3 - 1] = [0, 7]$.<br>
Each station picks a random integer from $\\{0, 1, 2, 3, 4, 5, 6, 7\\}$ and waits that number of slot times.`,
        level3: `<strong>Problem:</strong> Why can CSMA/CD not be used in IEEE 802.11 Wi-Fi networks?<br><br>
<strong>Analysis:</strong><br>
1. <strong>Dynamic Range / Self-Interference:</strong> A wireless radio transmits at high power (e.g. +20 dBm). Its own transmitter overwhelms its receiving antenna, making it impossible to hear faint incoming collision signals from other stations.<br>
2. <strong>Hidden Terminals:</strong> Stations may be hidden behind walls or out of radio range of each other, yet both reach the same Access Point. They cannot detect each other's collisions via carrier sensing.`
      },
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Protocol</th><th>Approach</th><th>Suitability</th></tr></thead>
          <tbody>
            <tr><td>CSMA/CD</td><td>Detect collisions during transmission, abort immediately</td><td>Wired half-duplex links (coax/hubs)</td></tr>
            <tr><td>CSMA/CA</td><td>Avoid collisions before transmission via backoff & ACKs</td><td>Wireless shared radio channels (Wi-Fi)</td></tr>
          </tbody>
        </table>`,
      whereUsed: [
        "Traditional half-duplex Ethernet (10BASE5, 10BASE2, 10BASE-T with hubs).",
        "IEEE 802.11 Wi-Fi (DCF with CSMA/CA).",
        "IEEE 802.15.4 (Zigbee wireless sensor networks)."
      ],
      commonMistakes: `
        <ul class="wiki-bullet-list">
          <li><strong>Assuming CSMA/CD is used on modern switched Ethernet:</strong> Switches provide dedicated full-duplex links; CSMA/CD is completely disabled during modern operation.</li>
        </ul>`,
      quiz: [
        {
          question: "What does the 'CS' in CSMA stand for?",
          options: ["Collision Sensing", "Carrier Sense", "Circuit Switching", "Channel Synchronous"],
          correctIndex: 1,
          explanation: "Carrier Sense: the network adapter monitors the physical medium to verify whether a transmission signal is currently present."
        },
        {
          question: "Why can collisions still occur in standard CSMA?",
          options: ["Adapters never check the channel", "Signal propagation delay allows stations to sense an idle channel before another station's signal reaches them", "Frames have no headers", "KaTeX formulas are disabled"],
          correctIndex: 1,
          explanation: "Due to finite propagation speed of light/electricity, there is a vulnerability window equal to propagation delay τ."
        },
        {
          question: "What does an Ethernet station do immediately upon detecting a collision under CSMA/CD?",
          options: ["Continues transmitting the rest of the frame", "Immediately aborts transmission and emits a jam signal", "Shuts down its power supply", "Sends an email alert"],
          correctIndex: 1,
          explanation: "It stops transmitting to avoid wasting wire time and sends a jam signal to ensure all stations recognize the collision."
        },
        {
          question: "Why does IEEE 802.11 Wi-Fi use CSMA/CA instead of CSMA/CD?",
          options: ["Wi-Fi has zero collisions", "A wireless station cannot reliably detect collisions while transmitting because its own signal drowns out incoming signals", "Wi-Fi frames are too long", "IEEE 802.11 standards forbid collision detection"],
          correctIndex: 1,
          explanation: "Wireless transceivers cannot transmit and listen simultaneously with sufficient sensitivity; therefore they use Collision Avoidance."
        }
      ],
      references: [
        { cite: "IEEE Std 802.3-2022 - Section 4: Media Access Control (CSMA/CD).", url: "https://standards.ieee.org" },
        { cite: "IEEE Std 802.11-2020 - Wireless LAN MAC and PHY Specifications.", url: "https://standards.ieee.org" }
      ]
    },
    prevTopicId: "aloha",
    nextTopicId: "collision-free-protocols"
  },

  // =========================================================================
  // TOPIC 23: COLLISION-FREE PROTOCOLS (PDF Topic 8, pp. 193-197)
  // =========================================================================
  "collision-free-protocols": {
    id: "collision-free-protocols",
    title: "Collision-Free Protocols",
    unit: "Unit II: Data Link Layer & MAC Sublayer",
    unitId: "unit2",
    level: "Intermediate",
    category: "datalink",
    difficulty: "Core",
    readingTime: "20 min",
    standard: "Tanenbaum Ch. 4 / IEEE 802.5 / FDDI",
    oneLiner: "Deterministic MAC protocols that eliminate contention collisions by scheduling access in advance.",
    quickAnswer: "Collision-free protocols resolve contention prior to data transmission using reservation phases (Bit-Map), binary arbitration (Binary Countdown), or circulating permission tokens (Token Passing).",
    whyItMatters: "Random access protocols collapse under heavy traffic due to runaway collisions. Collision-free protocols guarantee deterministic upper bounds on latency and 100% stable channel throughput.",
    prerequisitesList: [
      { concept: "Reservation Phase", meaning: "A preliminary control phase where stations declare their intent to transmit." },
      { concept: "Token", meaning: "A special control frame circulating among stations that grants transmission permission." }
    ],
    learningObjectives: [
      "Explain the fundamental design principles of collision-free access.",
      "Trace the Bit-Map (Reservation) protocol and calculate its overhead.",
      "Demonstrate the Binary Countdown bit-by-bit arbitration process.",
      "Explain the operation, advantages, and failure recovery of Token Passing."
    ],
    infobox: {
      layer: "Layer 2 (MAC Sublayer)",
      standard: "IEEE 802.5 (Token Ring), ANSI X3T9.5 (FDDI)",
      type: "Deterministic Access Protocol",
      keyFormula: "\\text{Overhead}_{\\text{BitMap}} = \\frac{d}{d + N} \\quad (d = \\text{frame size}, N = \\text{stations})",
      prerequisites: ["channel-allocation", "csma-protocols"],
      relatedConcepts: ["aloha", "csma-protocols", "ethernet"],
      compareWith: ["csma-protocols"],
      primaryUses: ["Token Ring, FDDI fiber backbones, Avionics MIL-STD-1553, CAN bus"]
    },
    sections: {
      overview: `the family of Medium Access Control protocols designed to ensure that competing stations never transmit simultaneous data frames, eliminating contention collisions by allocating transmission turns deterministically.`,
      eli10: `Instead of kids fighting over who gets to play on the swing set, the teacher hangs a sign-up sheet on the wall (Bit-Map reservation) or gives a golden ticket to one child at a time who passes it around the circle (Token Passing). Nobody fights!`,
      analogy: `Parliamentary debate: Lawmakers do not scream over one another. A Speaker calls on members based on a priority queue, or an electronic voting board registers who wants to take the podium.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Bit-Map Protocol (Basic Reservation):</strong>
            <ul class="wiki-bullet-list">
              <li>Each contention period consists of $N$ reservation bits (one bit per station $0$ to $N-1$).</li>
              <li>If Station $j$ has a frame to send, it transmits a <code>1</code> in time slot $j$.</li>
              <li>After all $N$ slots finish, all stations know exactly who wants to transmit.</li>
              <li>Stations transmit their data frames in numerical order, completely collision-free!</li>
            </ul>
          </li>
          <li><strong>Binary Countdown Protocol (Moxa / CAN Bus style):</strong>
            <ul class="wiki-bullet-list">
              <li>Stations transmit their binary address bits one by one (most significant bit first) over a wired-OR channel.</li>
              <li>If a station transmits a <code>0</code> but hears a <code>1</code> on the bus, a higher-priority station is competing; it immediately drops out!</li>
              <li>The station with the highest binary address wins the channel and transmits its frame.</li>
            </ul>
          </li>
          <li><strong>Token Passing (IEEE 802.5 / FDDI):</strong>
            <ul class="wiki-bullet-list">
              <li>A special 3-byte token frame circulates in a logical ring.</li>
              <li>A station wanting to transmit catches the token, changes it to a start-of-frame flag, appends its data, and transmits.</li>
              <li>Upon frame completion, it regenerates and passes the token to its downstream neighbor.</li>
            </ul>
          </li>
        </ol>`,
      diagram: `
Bit-Map Reservation Protocol (N = 4 Stations: A, B, C, D):
Contention Period (4 bits): [ 1 | 0 | 1 | 0 ]
                             A   B   C   D
Stations A and C requested access.
Data Period (Collision-Free): [--- Frame A ---] [--- Frame C ---]

Next Contention Period repeats!`,
      interactiveLabKey: "aloha-csma",
      technicalDetails: `
        <table class="wiki-table">
          <thead><tr><th>Method</th><th>Coordination Mechanism</th><th>Main Advantage</th><th>Main Limitation</th></tr></thead>
          <tbody>
            <tr><td>Bit-Map</td><td>$N$-bit reservation header phase</td><td>Fair, collision-free under load</td><td>$N$ bits wasted even if only 1 station transmits</td></tr>
            <tr><td>Binary Countdown</td><td>Bit-by-bit address arbitration</td><td>Overhead is only $\\log_2 N$ bits</td><td>Lower-addressed stations can starve unless priority rotates</td></tr>
            <tr><td>Token Passing</td><td>Circulating permission frame</td><td>Predictable bound on latency</td><td>Token loss or ring break requires complex recovery</td></tr>
          </tbody>
        </table>`,
      workedExamples: {
        level1: `<strong>Problem:</strong> In a 4-station network (A, B, C, D), stations A and C have frames ready. Show the Bit-Map reservation pattern.<br><br>
<strong>Solution:</strong><br>
- Slot 0 (A): <code>1</code> (Wants to transmit)<br>
- Slot 1 (B): <code>0</code> (No traffic)<br>
- Slot 2 (C): <code>1</code> (Wants to transmit)<br>
- Slot 3 (D): <code>0</code> (No traffic)<br>
Reservation pattern: <code>1 0 1 0</code>. After the 4-bit reservation period, Station A transmits its frame, followed immediately by Station C. Zero collisions occur.`,
        level2: `<strong>Problem:</strong> In a Binary Countdown channel, three stations with addresses <code>011</code> (3), <code>101</code> (5), and <code>110</code> (6) want to transmit. Trace the bit-by-bit arbitration.<br><br>
<strong>Working:</strong><br>
1. Bit 2 (MSB):<br>
   - Station 011 transmits <code>0</code>. Hears <code>1</code> on the channel &rarr; <strong>DROPS OUT!</strong><br>
   - Stations 101 and 110 both transmit <code>1</code> &rarr; Remain in contention.<br>
2. Bit 1 (Middle bit):<br>
   - Station 101 transmits <code>0</code>. Station 110 transmits <code>1</code>.<br>
   - Channel is <code>1</code> &rarr; Station 101 drops out!<br>
3. Winner: <strong>Station 110</strong> (Highest binary address) wins channel arbitration and sends its data frame!`,
        level3: `<strong>Problem:</strong> Compare Random Access vs. Collision-Free protocols under light traffic vs. heavy traffic.<br><br>
<strong>Analysis:</strong><br>
- <strong>Light Traffic:</strong> Random access is vastly superior. A station transmits immediately with zero reservation delay. Collision-free protocols waste time passing tokens or waiting through reservation bit-maps.<br>
- <strong>Heavy Traffic:</strong> Collision-free protocols dominate. Contention in random access causes collisions to spike and throughput to plunge to near zero. Collision-free channels maintain nearly $100\\%$ efficient, orderly data delivery.`
      },
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Disadvantages</th></tr></thead>
          <tbody>
            <tr><td>Completely collision-free data transmissions; predictable bounded latency; high efficiency under heavy load.</td><td>High control overhead at light load; complex token recovery and ring management state machines.</td></tr>
          </tbody>
        </table>`,
      whereUsed: [
        "Controller Area Network (CAN bus in modern automobiles uses binary arbitration).",
        "MIL-STD-1553 avionics bus in fighter jets and spacecraft.",
        "Token Ring (IEEE 802.5) and FDDI fiber backbones."
      ],
      commonMistakes: `
        <ul class="wiki-bullet-list">
          <li><strong>Assuming collision-free protocols eliminate all network errors:</strong> They eliminate <em>contention collisions</em>; electrical noise, hardware breaks, or bit errors can still occur and require CRC/FCS.</li>
        </ul>`,
      quiz: [
        {
          question: "Which access method uses a circulating permission frame to grant transmission rights?",
          options: ["Token passing", "Pure ALOHA", "Slotted ALOHA", "Binary countdown"],
          correctIndex: 0,
          explanation: "In token passing, a station can only transmit ordinary data frames when it currently holds the token."
        },
        {
          question: "How does the Binary Countdown protocol select a winning station?",
          options: ["Random lottery", "Bit-by-bit address arbitration over a shared channel where lower bits yield to higher bits", "First-come first-served queue", "Centralized polling server"],
          correctIndex: 1,
          explanation: "Stations assert address bits simultaneously; any station that reads a 1 while asserting a 0 immediately withdraws."
        }
      ],
      references: [
        { cite: "Tanenbaum & Wetherall, Computer Networks (6th Ed.) - Section 4.2.3: Collision-Free Protocols.", url: "https://www.pearson.com" }
      ]
    },
    prevTopicId: "csma-protocols", nextTopicId: "ethernet"
  },

  // =========================================================================
  // TOPIC 24: WIRELESS LAN PROTOCOLS (PDF Topic 10, pp. 214-233)
  // =========================================================================
  "wireless-lan-protocols": {
    id: "wireless-lan-protocols",
    title: "IEEE 802.11 Wireless LAN Architecture",
    unit: "Unit II: Data Link Layer & MAC Sublayer",
    unitId: "unit2",
    level: "Beginner → Intermediate",
    category: "datalink",
    difficulty: "Core",
    readingTime: "30 min",
    standard: "IEEE 802.11-2020 / Wi-Fi Alliance",
    oneLiner: "The ubiquitous Wi-Fi architecture: BSS, ESS, APs, infrastructure vs ad-hoc modes, and standards evolution.",
    quickAnswer: "IEEE 802.11 governs wireless LANs. Devices (STAs) communicate via Access Points (APs) in a Basic Service Set (BSS) or directly in ad-hoc mode (IBSS), interconnected by a Distribution System (ESS).",
    whyItMatters: "Wi-Fi carries over 60% of modern Internet client traffic. Understanding wireless topologies, AP association, and RF constraints is essential for all networking engineers.",
    prerequisitesList: [
      { concept: "Access Point (AP)", meaning: "A central wireless transceiver connecting STAs to the wired network." },
      { concept: "Station (STA)", meaning: "Any client device equipped with an 802.11 wireless network interface." },
      { concept: "BSSID", meaning: "The 48-bit MAC address of the Access Point radio interface." }
    ],
    learningObjectives: [
      "Explain the components of 802.11 architecture: STA, AP, BSS, ESS, and Distribution System (DS).",
      "Differentiate Infrastructure Mode from Ad-Hoc Mode (IBSS).",
      "Summarize the evolution of 802.11 amendments (b, a, g, n, ac, ax, be).",
      "Explain Wi-Fi management operations: Beacon frames, Probe requests, Authentication, Association."
    ],
    infobox: {
      layer: "Layer 2 (MAC) & Layer 1 (PHY)",
      standard: "IEEE 802.11a/b/g/n/ac/ax/be",
      type: "Wireless Local Area Network",
      keyFormula: "\\text{Architecture} = \\text{STAs} + \\text{AP (BSS)} \\xrightarrow{\\text{DS}} \\text{ESS}",
      prerequisites: ["channel-allocation", "csma-protocols"],
      relatedConcepts: ["wifi-mac-sublayer", "ethernet"],
      compareWith: ["ethernet"],
      primaryUses: ["Home broadband routers, campus Wi-Fi, enterprise hotspot roaming"]
    },
    sections: {
      overview: `the family of technical standards developed by IEEE that defines physical-layer radio transmissions and Data Link Layer MAC specifications for Wireless Local Area Networks (branded commercially as Wi-Fi).`,
      eli10: `Wi-Fi is like walking around your house while listening to music with Bluetooth headphones. Instead of plugging a wire into your computer, the computer talks to a little radio antenna on your ceiling (the Access Point), which is connected to the Internet wire in the wall!`,
      analogy: `Cell phone towers: Multiple cell phones talk over the air to a nearby cellular tower. The tower is plugged into the wired telephone network. In Wi-Fi, the Access Point is like your own personal micro cell-tower.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Basic Service Set (BSS):</strong> The fundamental building block. Consists of one Access Point (AP) and associated wireless client stations (STAs).</li>
          <li><strong>Extended Service Set (ESS):</strong> Multiple APs connected via a wired Distribution System (DS - usually Ethernet), sharing a common SSID. Allows seamless roaming!</li>
          <li><strong>Independent BSS (IBSS / Ad-Hoc):</strong> Peer-to-peer wireless network formed directly between client devices without an Access Point.</li>
          <li><strong>Discovery & Connection Process:</strong>
            <ul class="wiki-bullet-list">
              <li><em>Passive Scanning:</em> AP broadcasts <strong>Beacon frames</strong> periodically (typically every 100 ms).</li>
              <li><em>Active Scanning:</em> STA transmits <strong>Probe Request</strong>; AP replies with <strong>Probe Response</strong>.</li>
              <li><em>Authentication & Association:</em> STA negotiates 802.11 authentication and association frames before data transfer begins.</li>
            </ul>
          </li>
        </ol>`,
      diagram: `
+-------------------------------------------------------------------------+
|                  EXTENDED SERVICE SET (ESS: SSID="CampusNet")           |
|                                                                         |
|   +-----------------------+           +-----------------------+         |
|   |   BSS 1               |           |   BSS 2               |         |
|   |   [Access Point 1]    |           |   [Access Point 2]    |         |
|   |     /     \\          |           |     /     \\          |         |
|   |  STA-A   STA-B        |           |  STA-C   STA-D        |         |
|   +-----------|-----------+           +-----------|-----------+         |
+---------------|-----------------------------------|---------------------+
                v                                   v
+-------------------------------------------------------------------------+
|        WIRED DISTRIBUTION SYSTEM (DS - Gigabit Ethernet LAN)            |
|                                                                         |
|                     [ROUTER / GATEWAY TO INTERNET]                      |
+-------------------------------------------------------------------------+`,
      interactiveLabKey: "frame-explorer",
      technicalDetails: `
        <table class="wiki-table">
          <thead><tr><th>Standard</th><th>Year</th><th>Frequency</th><th>Max PHY Rate</th><th>Key Technology</th></tr></thead>
          <tbody>
            <tr><td>802.11b</td><td>1999</td><td>2.4 GHz</td><td>11 Mbps</td><td>DSSS, CCK modulation</td></tr>
            <tr><td>802.11a</td><td>1999</td><td>5 GHz</td><td>54 Mbps</td><td>OFDM modulation</td></tr>
            <tr><td>802.11g</td><td>2003</td><td>2.4 GHz</td><td>54 Mbps</td><td>OFDM in 2.4 GHz band</td></tr>
            <tr><td>802.11n (Wi-Fi 4)</td><td>2009</td><td>2.4 / 5 GHz</td><td>600 Mbps</td><td>MIMO (Multiple Input Multiple Output), 40 MHz</td></tr>
            <tr><td>802.11ac (Wi-Fi 5)</td><td>2013</td><td>5 GHz</td><td>6.9 Gbps</td><td>MU-MIMO, 80/160 MHz channels, 256-QAM</td></tr>
            <tr><td>802.11ax (Wi-Fi 6/6E)</td><td>2021</td><td>2.4 / 5 / 6 GHz</td><td>9.6 Gbps</td><td>OFDMA, 1024-QAM, Target Wake Time (TWT)</td></tr>
            <tr><td>802.11be (Wi-Fi 7)</td><td>2024</td><td>2.4 / 5 / 6 GHz</td><td>46 Gbps</td><td>320 MHz channels, 4096-QAM, Multi-Link (MLO)</td></tr>
          </tbody>
        </table>`,
      workedExamples: {
        level1: `<strong>Problem:</strong> What is the difference between a BSSID and an SSID?<br><br>
<strong>Solution:</strong><br>
- <strong>SSID (Service Set Identifier):</strong> The human-readable name of the wireless network (e.g. <code>"Starbucks_Guest"</code> or <code>"Home_5G"</code>). Multiple APs across a building can share the same SSID.<br>
- <strong>BSSID (Basic Service Set Identifier):</strong> The unique 48-bit hardware MAC address of a specific Access Point radio interface.`,
        level2: `<strong>Problem:</strong> A user walks from building A to building B while maintaining an active VoIP call. What 802.11 architecture enables this?<br><br>
<strong>Working:</strong><br>
An <strong>Extended Service Set (ESS)</strong>. Both APs are connected via a common wired Distribution System and broadcast the same SSID. As the client's signal from AP 1 weakens, its wireless NIC automatically disassociates from AP 1 and associates with AP 2 (Roaming) without changing its Layer 3 IP address!`,
        level3: `<strong>Problem:</strong> Contrast Infrastructure Mode with Ad-Hoc Mode.<br><br>
<strong>Analysis:</strong><br>
- <strong>Infrastructure Mode:</strong> Centralized. All traffic between STAs must pass through the Access Point, which handles bridging to the wired LAN.<br>
- <strong>Ad-Hoc Mode (IBSS):</strong> Peer-to-peer. Stations communicate directly using their wireless NICs without any Access Point or wired infrastructure (used for direct Apple AirDrop or Wi-Fi Direct file sharing).`
      },
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Disadvantages</th></tr></thead>
          <tbody>
            <tr><td>Full user mobility; eliminates expensive Ethernet wall drops; easy scalability.</td><td>Shared airtime contention; RF interference from microwaves/walls; signal attenuation over distance.</td></tr>
          </tbody>
        </table>`,
      whereUsed: [
        "Home Wi-Fi routers and wireless mesh systems.",
        "Enterprise campus networks (Cisco Catalyst, Aruba, Ubiquiti).",
        "Public hotspots and in-flight airline Wi-Fi."
      ],
      commonMistakes: `
        <ul class="wiki-bullet-list">
          <li><strong>Confusing Wi-Fi generation names with frequencies:</strong> Wi-Fi 6 (802.11ax) is NOT 6 GHz only; it runs on 2.4 GHz, 5 GHz, and 6 GHz (Wi-Fi 6E).</li>
        </ul>`,
      quiz: [
        {
          question: "Which IEEE standard family defines Wireless LAN (Wi-Fi) operations?",
          options: ["IEEE 802.3", "IEEE 802.11", "IEEE 802.15", "IEEE 802.1X"],
          correctIndex: 1,
          explanation: "IEEE 802.11 is the official standard for wireless local area networking."
        },
        {
          question: "What is an Extended Service Set (ESS)?",
          options: ["A single standalone laptop", "Multiple Access Points connected via a Distribution System sharing an SSID", "A Bluetooth personal network", "A fiber optic switch"],
          correctIndex: 1,
          explanation: "An ESS links multiple BSSs together through a distribution backbone to allow seamless roaming across large areas."
        },
        {
          question: "Which frame type is broadcast periodically by Access Points to advertise their presence?",
          options: ["Data frame", "Beacon frame (Management)", "RTS control frame", "FCS trailer"],
          correctIndex: 1,
          explanation: "APs broadcast Beacon management frames (typically 10 times a second) containing network capabilities and SSID."
        }
      ],
      references: [
        { cite: "IEEE Std 802.11-2020 - Wireless LAN MAC and PHY Specifications.", url: "https://standards.ieee.org" }
      ]
    },
    prevTopicId: "mac-address", nextTopicId: "wifi-mac-sublayer"
  },

  // =========================================================================
  // TOPIC 25: IEEE 802.11 WI-FI MAC SUBLAYER (PDF Topic 10, pp. 218-233)
  // =========================================================================
  "wifi-mac-sublayer": {
    id: "wifi-mac-sublayer",
    title: "IEEE 802.11 MAC Sublayer (CSMA/CA & Frame Structure)",
    unit: "Unit II: Data Link Layer & MAC Sublayer",
    unitId: "unit2",
    level: "Intermediate → Advanced",
    category: "datalink",
    difficulty: "Advanced",
    readingTime: "35 min",
    standard: "IEEE 802.11 MAC / DCF",
    oneLiner: "Collision avoidance, interframe spaces (SIFS/DIFS), RTS/CTS, hidden/exposed nodes, and 4-address frame layout.",
    quickAnswer: "Wi-Fi coordinates access using CSMA/CA with random backoff, priority interframe spaces (SIFS < PIFS < DIFS), positive link-layer ACKs, and optional RTS/CTS to solve hidden node problems.",
    whyItMatters: "Wireless cannot detect collisions while sending. Understanding DCF backoff, the hidden terminal problem, and the complex 802.11 4-address MAC header is critical for wireless engineering.",
    prerequisitesList: [
      { concept: "CSMA/CA", meaning: "Carrier Sense Multiple Access with Collision Avoidance." },
      { concept: "Interframe Space (IFS)", meaning: "Mandatory quiet waiting periods between transmissions (SIFS, PIFS, DIFS)." },
      { concept: "NAV (Network Allocation Vector)", meaning: "A timer maintained by stations representing virtual carrier sensing." }
    ],
    learningObjectives: [
      "Explain the exact step-by-step operation of CSMA/CA under Distributed Coordination Function (DCF).",
      "Compare the hierarchy of interframe spaces: SIFS, PIFS, DIFS.",
      "Explain the Hidden-Node Problem and Exposed-Node Problem with diagrams.",
      "Describe how RTS/CTS frames and the NAV vector eliminate hidden node collisions.",
      "Deconstruct the IEEE 802.11 MAC frame format and explain why it requires four MAC address fields."
    ],
    infobox: {
      layer: "Layer 2 (MAC Sublayer)",
      standard: "IEEE 802.11 DCF / PCF",
      type: "Wireless MAC Protocol",
      keyFormula: "\\text{IFS Hierarchy: } \\text{SIFS} < \\text{PIFS} < \\text{DIFS}",
      prerequisites: ["wireless-lan-protocols", "csma-protocols"],
      relatedConcepts: ["ethernet", "csma-protocols", "mac-address"],
      compareWith: ["ethernet"],
      primaryUses: ["Wi-Fi contention arbitration, enterprise wireless QoS, airtime fairness"]
    },
    sections: {
      overview: `the Media Access Control protocol for IEEE 802.11 wireless networks, responsible for channel contention arbitration via CSMA/CA, priority scheduling via Interframe Spaces, transmission acknowledgment, and multi-address frame encapsulation.`,
      eli10: `Two kids sitting in different rooms want to talk to their dad in the hallway. Because there is a wall between them, they cannot hear each other. If both start talking to dad at the same time, dad hears garbled noise! (The hidden node problem!). To fix this, a kid sends a quick whisper: "Can I talk?" (RTS). Dad shouts: "Yes, go ahead!" (CTS). The other kid hears dad and waits!`,
      analogy: `Air Traffic Control: Planes on the tarmac cannot see around hangars. They call tower with "Request clearance to cross runway" (RTS). Tower broadcasts "Cleared to cross, all other aircraft hold position" (CTS).`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Carrier Sensing (Physical & Virtual):</strong> Station checks RF energy (physical) and checks its <strong>NAV (Network Allocation Vector)</strong> timer (virtual).</li>
          <li><strong>DIFS Wait:</strong> If channel is idle, station must wait for a <strong>DIFS (Distributed Interframe Space)</strong> interval.</li>
          <li><strong>Random Backoff:</strong> Station selects random backoff counter from Contention Window $[0, CW]$. Counter decrements while channel is idle; freezes if channel becomes busy!</li>
          <li><strong>Frame Transmission:</strong> When counter reaches 0, station transmits data frame.</li>
          <li><strong>SIFS & ACK:</strong> Receiver validates CRC. After a tiny <strong>SIFS (Short Interframe Space)</strong> delay, receiver transmits <code>ACK</code> frame. Because SIFS < DIFS, the ACK takes immediate priority before any other station can start contending!</li>
          <li><strong>RTS/CTS Exchange (Optional):</strong>
            <ul class="wiki-bullet-list">
              <li>Sender transmits <code>RTS (Request to Send)</code> specifying frame duration.</li>
              <li>Receiver replies with <code>CTS (Clear to Send)</code> after SIFS.</li>
              <li>All stations hearing either RTS or CTS set their NAV to sleep during the transaction!</li>
            </ul>
          </li>
        </ol>`,
      diagram: `
Sender          [--- DIFS ---] [ Backoff ] [=== DATA FRAME ===]
                                                               |
Receiver                                        [-- SIFS --] [= ACK =]
                                                                  |
Other Stations  [------------------- NAV (Channel Reserved) -------]`,
      interactiveLabKey: "frame-explorer",
      technicalDetails: `
        <p><strong>Hidden-Node vs. Exposed-Node Problems:</strong></p>
        <ul class="wiki-bullet-list">
          <li><strong>Hidden-Node Problem:</strong> Station A and Station C can both communicate with Access Point B, but cannot hear each other. Both sense channel idle and transmit simultaneously to B &rarr; Collision at B! <em>Solved by RTS/CTS.</em></li>
          <li><strong>Exposed-Node Problem:</strong> Station B is sending to A. Station C wants to send to D. C hears B's carrier and needlessly defers, even though transmitting to D would NOT interfere with A receiving from B! <em>Causes wasted capacity.</em></li>
        </ul>
        <p><strong>802.11 MAC Frame Layout (Up to 34 Bytes Header):</strong></p>
        <ul class="wiki-bullet-list">
          <li><strong>Frame Control (2B):</strong> Type (Mgmt/Control/Data), Subtype, To DS, From DS, Retry, Power Mgt.</li>
          <li><strong>Duration / ID (2B):</strong> Channel reservation duration in microseconds (updates NAV).</li>
          <li><strong>Address 1 (6B):</strong> Receiver Address (RA - immediate radio receiver).</li>
          <li><strong>Address 2 (6B):</strong> Transmitter Address (TA - immediate radio transmitter).</li>
          <li><strong>Address 3 (6B):</strong> Destination Address (DA) or Source Address (SA) for distribution system.</li>
          <li><strong>Sequence Control (2B):</strong> 4-bit fragment number, 12-bit sequence number.</li>
          <li><strong>Address 4 (6B):</strong> Only present in Wireless Distribution Systems (WDS mesh bridging) when both To DS=1 and From DS=1!</li>
          <li><strong>FCS (4B):</strong> 32-bit CRC.</li>
        </ul>`,
      workedExamples: {
        level1: `<strong>Problem:</strong> Why is SIFS strictly shorter than DIFS in IEEE 802.11?<br><br>
<strong>Solution:</strong><br>
<strong>Priority!</strong> SIFS is used for immediate control responses (ACK, CTS). Because a station waiting to send new data must wait through the longer DIFS, the receiver's ACK can seize the channel first without colliding with new contending transmissions.`,
        level2: `<strong>Problem:</strong> In the hidden node topology A &mdash; B &mdash; C, explain why Carrier Sensing alone fails to prevent collisions at B.<br><br>
<strong>Working:</strong><br>
Station A and Station C are out of radio range of each other. When A transmits to B, C cannot detect A's RF energy. C's carrier sense reports the channel is "IDLE". C begins transmitting to B. Both signals arrive simultaneously at B's antenna, destroying both frames!`,
        level3: `<strong>Problem:</strong> Under what exact condition are ALL FOUR MAC address fields present in an 802.11 frame?<br><br>
<strong>Analysis:</strong><br>
When a frame is transmitted across a <strong>Wireless Distribution System (WDS mesh bridge)</strong> between two Access Points! Both <code>To DS = 1</code> and <code>From DS = 1</code> flags are set in the Frame Control byte:<br>
- Addr 1: Receiving AP (RA)<br>
- Addr 2: Transmitting AP (TA)<br>
- Addr 3: Final Destination Host MAC (DA)<br>
- Addr 4: Original Source Host MAC (SA).`
      },
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Disadvantages</th></tr></thead>
          <tbody>
            <tr><td>Prevents collisions on half-duplex RF media; solves hidden terminals via RTS/CTS; link-layer ACKs provide immediate loss detection.</td><td>High protocol overhead (SIFS, DIFS, backoffs, control frames); RTS/CTS adds airtime penalty for short packets.</td></tr>
          </tbody>
        </table>`,
      whereUsed: [
        "All Wi-Fi 802.11 devices (smartphones, laptops, IoT, access points).",
        "Enterprise wireless controllers for airtime fairness.",
        "Wireless mesh backhaul bridging."
      ],
      commonMistakes: `
        <ul class="wiki-bullet-list">
          <li><strong>Assuming RTS/CTS is used for every single Wi-Fi packet:</strong> FALSE. RTS/CTS introduces significant overhead. It is only triggered for packets exceeding the configured <code>RTS Threshold</code> (typically 2347 bytes).</li>
        </ul>`,
      quiz: [
        {
          question: "Which medium-access method is associated with IEEE 802.11 Wi-Fi?",
          options: ["CSMA/CD", "CSMA/CA", "Token Ring only", "Pure ALOHA only"],
          correctIndex: 1,
          explanation: "Wi-Fi uses Carrier Sense Multiple Access with Collision Avoidance (CSMA/CA)."
        },
        {
          question: "What is the primary purpose of a Wi-Fi link-layer ACK frame?",
          options: ["To encrypt user passwords", "To confirm successful reception of a unicast frame at the MAC layer", "To assign an IP address", "To route packets between subnets"],
          correctIndex: 1,
          explanation: "Because wireless transmissions frequently suffer from interference, receivers return immediate MAC-layer ACKs."
        },
        {
          question: "What is the Hidden-Node Problem in wireless networks?",
          options: ["A device has no MAC address", "Two stations cannot hear each other but their transmissions collide at a shared receiver", "An Access Point hides its SSID", "A switch CAM table is full"],
          correctIndex: 1,
          explanation: "Two stations out of radio range of each other both transmit to a common AP, causing a collision at the AP."
        },
        {
          question: "Which interframe space has the shortest duration?",
          options: ["SIFS (Short Interframe Space)", "DIFS (Distributed Interframe Space)", "PIFS (PCF Interframe Space)", "EIFS (Extended Interframe Space)"],
          correctIndex: 0,
          explanation: "SIFS is the shortest interframe space, giving immediate response frames (ACK, CTS) the highest channel priority."
        }
      ],
      references: [
        { cite: "IEEE Std 802.11-2020 - Wireless LAN MAC and PHY Specifications.", url: "https://standards.ieee.org" },
        { cite: "Tanenbaum & Wetherall, Computer Networks (6th Ed.) - Section 4.4: Wireless LANs.", url: "https://www.pearson.com" }
      ]
    },
    prevTopicId: "wireless-lan-protocols",
    nextTopicId: "dll-switching"
  },

  // =========================================================================
  // TOPIC 26: DATA LINK LAYER SWITCHING & BRIDGES (PDF Topic 9, pp. 210-211)
  // =========================================================================
  "dll-switching": {
    id: "dll-switching",
    title: "Data Link Layer Switching & Learning Bridges",
    unit: "Unit II: Data Link Layer & MAC Sublayer",
    unitId: "unit2",
    level: "Intermediate",
    category: "datalink",
    difficulty: "Core",
    readingTime: "25 min",
    standard: "IEEE 802.1D / IEEE 802.1w (RSTP)",
    oneLiner: "Transparent learning bridges, frame forwarding, filtering, and loop resolution via Spanning Tree.",
    quickAnswer: "A Layer 2 switch is a multi-port learning bridge that inspects source MAC addresses to populate its forwarding database, selectively forwarding frames to destination ports without collisions.",
    whyItMatters: "Switching replaced legacy shared hubs, creating dedicated full-duplex collision domains for every connected host and dramatically increasing enterprise network capacity.",
    prerequisitesList: [
      { concept: "Collision Domain", meaning: "A network segment where simultaneous transmissions can collide." },
      { concept: "Broadcast Domain", meaning: "The scope of devices that receive a broadcast frame." }
    ],
    learningObjectives: [
      "Explain the backward learning algorithm of transparent bridges.",
      "Distinguish frame filtering from frame flooding.",
      "Understand why redundant switch links cause broadcast storms without STP.",
      "Explain Spanning Tree Protocol (IEEE 802.1D) port states and BPDU root election."
    ],
    infobox: {
      layer: "Layer 2 (Data Link Layer)",
      standard: "IEEE 802.1D (STP), IEEE 802.1w (RSTP)",
      type: "Link-Layer Packet Switching",
      keyFormula: "\\text{Port Filtering: If Port}(Dst) == Port(Src) \\implies \\text{Discard}",
      prerequisites: ["mac-address", "ethernet"],
      relatedConcepts: ["ethernet", "vlan", "network-devices"],
      compareWith: ["network-devices"],
      primaryUses: ["Enterprise campus switching, data center top-of-rack switches"]
    },
    sections: {
      overview: `the operation of Layer 2 bridges and switches that connect multiple physical network segments, forwarding frames based on destination MAC addresses while dynamically learning network topology.`,
      eli10: `A hub is like a town crier who shouts every message out to the entire village. A switch is like a smart postal sorter who looks at the name on the envelope and drops it into only that person's private mailbox!`,
      analogy: `A smart security guard at a building entrance: When someone walks in through Door 3, the guard notes down their badge ID and writes "Badge 102 is in Wing 3". Next time someone has a package for Badge 102, the guard directs the delivery driver straight to Wing 3.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Backward Learning:</strong> Arriving frame on Port $P$ with Source MAC $S$: switch records $(S, P, \\text{timestamp})$ in its Forwarding Database (CAM table).</li>
          <li><strong>Forwarding Lookup:</strong> Switch examines Destination MAC $D$:
            <ul class="wiki-bullet-list">
              <li><em>Destination Found on Port $P$:</em> Frame originated on same segment; <strong>Filter (Discard)</strong>.</li>
              <li><em>Destination Found on Port $Q \\neq P$:</em> <strong>Forward</strong> frame out Port $Q$ only!</li>
              <li><em>Destination Unknown or Broadcast (FF:FF:FF:FF:FF:FF):</em> <strong>Flood</strong> frame out all ports except $P$!</li>
            </ul>
          </li>
          <li><strong>Table Aging:</strong> Entries are purged if inactive for 300 seconds to adapt to moved devices.</li>
          <li><strong>Spanning Tree Protocol (STP - 802.1D):</strong> Redundant cables between switches cause infinite broadcast loops. STP exchanges BPDUs (Bridge Protocol Data Units) to elect a Root Bridge and disables redundant links into a <strong>Blocking state</strong>, creating a loop-free logical tree.</li>
        </ol>`,
      diagram: `
                    +---------------------------+
                    |    LAYER 2 SWITCH         |
                    |   Forwarding Database     |
                    |   MAC A  -->  Port 1      |
                    |   MAC B  -->  Port 2      |
                    +---------------------------+
                       /          |          \\
                  Port 1        Port 2       Port 3
                    /             |            \\
                [ Host A ]    [ Host B ]   [ Host C ]
      Frame A -> B: Sent ONLY to Port 2! (Port 3 is completely quiet!)`,
      interactiveLabKey: "frame-explorer",
      technicalDetails: `
        <table class="wiki-table">
          <thead><tr><th>Switching Mode</th><th>Latency</th><th>Error Handling</th><th>Mechanism</th></tr></thead>
          <tbody>
            <tr><td>Store-and-Forward</td><td>Higher (buffers entire frame)</td><td>Validates FCS CRC-32; discards corrupt frames</td><td>Default mode on modern enterprise switches</td></tr>
            <tr><td>Cut-Through</td><td>Lowest (sub-microsecond)</td><td>No FCS check; forwards corrupted frames</td><td>Begins forwarding as soon as Dest MAC (first 6B) is read</td></tr>
          </tbody>
        </table>`,
      workedExamples: {
        level1: `<strong>Problem:</strong> Host A sends a frame to Host B. The switch CAM table has an entry for Host A, but NOT Host B. What does the switch do?<br><br>
<strong>Solution:</strong><br>
The switch performs an <strong>Unknown Unicast Flood</strong>: it replicates and transmits the frame out every active port in that VLAN except the port on which the frame arrived.`,
        level2: `<strong>Problem:</strong> Why does an Ethernet loop without Spanning Tree crash a network within seconds?<br><br>
<strong>Working:</strong><br>
Unlike IP packets, Layer 2 Ethernet frames have <strong>NO TTL (Time to Live) field</strong>! When an ARP broadcast enters a redundant switch loop, the switches flood the broadcast to each other continuously, multiplying copies exponentially (Broadcast Storm). Network bandwidth reaches 100% saturation and CPU queues crash.`,
        level3: `<strong>Problem:</strong> Contrast the collision domains and broadcast domains of a 24-port Hub vs. a 24-port Switch.<br><br>
<strong>Analysis:</strong><br>
- <strong>24-Port Hub:</strong> 1 single collision domain (all 24 ports share electrical wire) and 1 broadcast domain.<br>
- <strong>24-Port Switch:</strong> 24 separate collision domains (each port is isolated and full-duplex) and 1 broadcast domain.`
      },
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Disadvantages</th></tr></thead>
          <tbody>
            <tr><td>Eliminates collisions; full wire-speed bandwidth per port; transparent plug-and-play operation.</td><td>Single broadcast domain; vulnerable to broadcast storms; requires STP for redundancy.</td></tr>
          </tbody>
        </table>`,
      whereUsed: [
        "Enterprise access switches (Cisco, Juniper, Arista).",
        "Data center spine-and-leaf fabrics.",
        "Industrial Ethernet switches."
      ],
      commonMistakes: `
        <ul class="wiki-bullet-list">
          <li><strong>Confusing switching with routing:</strong> Switches forward frames using Layer 2 MAC addresses within a broadcast domain; routers forward packets using Layer 3 IP addresses across different networks.</li>
        </ul>`,
      quiz: [
        {
          question: "Which field does a transparent learning switch inspect to populate its forwarding database?",
          options: ["Destination MAC address", "Source MAC address", "IP Time-to-Live", "TCP sequence number"],
          correctIndex: 1,
          explanation: "Switches learn host locations by recording the Source MAC address and the physical port it arrived on."
        },
        {
          question: "What happens when a switch receives a frame destined for an unknown unicast MAC address?",
          options: ["It drops the frame silently", "It floods the frame out all ports in the VLAN except the arrival port", "It returns an error packet", "It disables the incoming port"],
          correctIndex: 1,
          explanation: "Unknown unicast frames are flooded to all ports in the broadcast domain until the destination responds and its location is learned."
        },
        {
          question: "What protocol prevents bridge loops and broadcast storms in interconnected switch topologies?",
          options: ["Spanning Tree Protocol (STP - IEEE 802.1D)", "Border Gateway Protocol (BGP)", "Address Resolution Protocol (ARP)", "Dynamic Host Configuration Protocol (DHCP)"],
          correctIndex: 0,
          explanation: "STP builds a loop-free logical tree by placing redundant switch ports into a blocking state."
        }
      ],
      references: [
        { cite: "IEEE Std 802.1D-2004 - Media Access Control (MAC) Bridges.", url: "https://standards.ieee.org" }
      ]
    },
    prevTopicId: "wifi-mac-sublayer",
    nextTopicId: "network-devices"
  },

  // =========================================================================
  // TOPIC 27: CONNECTING DEVICES (PDF Topic 10 & Hardware Reference)
  // =========================================================================
  "network-devices": {
    id: "network-devices",
    title: "Network Connecting Devices (Repeaters, Hubs, Bridges, Switches, Routers, Gateways)",
    unit: "Unit II: Data Link Layer & MAC Sublayer",
    unitId: "unit2",
    level: "Beginner → Intermediate",
    category: "datalink",
    difficulty: "Core",
    readingTime: "25 min",
    standard: "OSI Layer Hierarchy / Forouzan Ch. 15",
    oneLiner: "The comprehensive classification of hardware interconnects across Layers 1, 2, 3, and 7.",
    quickAnswer: "Network devices operate at distinct OSI layers: Repeaters/Hubs at Layer 1 (signals), Bridges/Switches at Layer 2 (MAC frames), Routers at Layer 3 (IP packets), and Gateways at Layers 4-7.",
    whyItMatters: "Every network design relies on choosing the correct device for the job. Knowing which device breaks collision domains versus broadcast domains is the #1 question in computer networking exams.",
    prerequisitesList: [
      { concept: "OSI Layers", meaning: "Layer 1 Physical, Layer 2 Data Link, Layer 3 Network, Layer 4+ Transport/Application." },
      { concept: "Collision Domain", meaning: "Segment where packet transmissions can interfere." },
      { concept: "Broadcast Domain", meaning: "Network scope receiving Layer 2 broadcast frames." }
    ],
    learningObjectives: [
      "Classify networking devices by their operating OSI layer.",
      "Explain how repeaters and hubs regenerate physical electrical signals.",
      "Compare Layer 2 switches against Layer 3 routers.",
      "Analyze collision domain and broadcast domain separation for every device."
    ],
    infobox: {
      layer: "Layer 1 to Layer 7 (Comparative Taxonomy)",
      standard: "OSI Reference Model, IEEE 802",
      type: "Hardware Device Classification",
      keyFormula: "\\text{Device Domain Matrix: Hub (1/1), Switch (N/1), Router (N/N)}",
      prerequisites: ["dll-switching", "ethernet"],
      relatedConcepts: ["dll-switching", "ethernet", "vlan"],
      compareWith: ["router"],
      primaryUses: ["Campus network design, enterprise perimeter routing, LAN extension"]
    },
    sections: {
      overview: `the systematic hierarchy of hardware devices used to interconnect transmission media, LAN segments, and autonomous systems across the different layers of the OSI reference model.`,
      eli10: `A Repeater is a megaphone that makes quiet whispers loud again. A Hub is a megaphone connected to 10 speakers at once. A Switch is a mail sorter who sends letters only to the right house. A Router is an international airport that routes planes between different countries!`,
      analogy: `Traffic intersections: Repeaters are streetlights that make lines visible. Hubs are unmonitored 4-way intersections where cars crash. Switches are roundabouts where cars merge smoothly. Routers are border checkpoints between two states with passports and signs.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Layer 1 (Physical): Repeaters & Hubs:</strong>
            <ul class="wiki-bullet-list">
              <li><em>Repeater:</em> 2-port device that cleans, amplifies, and reshapes attenuated analog/digital signals to extend cable distance. Zero understanding of bits, frames, or addresses.</li>
              <li><em>Hub:</em> Multi-port repeater. Bits arriving on one port are blindly repeated to all other ports. Single collision domain; single broadcast domain.</li>
            </ul>
          </li>
          <li><strong>Layer 2 (Data Link): Bridges & Switches:</strong>
            <ul class="wiki-bullet-list">
              <li><em>Bridge:</em> 2-port device that reads MAC addresses and filters/forwards frames between two LAN segments.</li>
              <li><em>Switch:</em> Multi-port bridge. Creates a dedicated collision domain per port; single broadcast domain per VLAN.</li>
            </ul>
          </li>
          <li><strong>Layer 3 (Network): Routers & Layer 3 Switches:</strong>
            <ul class="wiki-bullet-list">
              <li>Reads IP addresses. Forwards packets across different subnets using routing tables (OSPF, BGP). Separates both collision domains AND broadcast domains!</li>
            </ul>
          </li>
          <li><strong>Layers 4–7: Gateways & Firewalls:</strong>
            <ul class="wiki-bullet-list">
              <li>Translates between completely different protocol suites (e.g., IPv4 to IPv6 gateway, VoIP SIP gateway, API gateways).</li>
            </ul>
          </li>
        </ol>`,
      diagram: `
+--------------------------------------------------------------------------+
|                     OSI DEVICE TAXONOMY & DOMAINS                        |
+---------------------+-------+-------------+------------------+-----------+
| Device              | Layer | PDU Handled | Collision Domain | Broadcast |
+---------------------+-------+-------------+------------------+-----------+
| Repeater / Hub      | L1    | Bits        | 1 Shared Domain  | 1 Domain  |
| Bridge / L2 Switch  | L2    | Frames      | Separated/Port   | 1 Domain  |
| Router / L3 Switch  | L3    | Packets     | Separated/Port   | Separated |
| Protocol Gateway    | L4-L7 | Messages    | Separated        | Separated |
+---------------------+-------+-------------+------------------+-----------+`,
      interactiveLabKey: "frame-explorer",
      technicalDetails: `
        <table class="wiki-table">
          <thead><tr><th>Device</th><th>OSI Layer</th><th>Intelligence</th><th>Addressing Used</th><th>Key Advantage</th></tr></thead>
          <tbody>
            <tr><td>Repeater</td><td>Layer 1</td><td>None (Physical)</td><td>None</td><td>Extends physical distance</td></tr>
            <tr><td>Hub</td><td>Layer 1</td><td>None (Broadcasts bits)</td><td>None</td><td>Inexpensive multiport wiring</td></tr>
            <tr><td>Bridge</td><td>Layer 2</td><td>Software / Hardware</td><td>48-bit MAC</td><td>Divides large LAN into 2 collision zones</td></tr>
            <tr><td>Switch</td><td>Layer 2</td><td>Hardware ASIC (Fast)</td><td>48-bit MAC</td><td>Dedicated full-duplex bandwidth per port</td></tr>
            <tr><td>Router</td><td>Layer 3</td><td>Routing tables (Software/ASIC)</td><td>32b/128b IP</td><td>Connects disparate networks; stops broadcasts</td></tr>
            <tr><td>Gateway</td><td>Layers 4–7</td><td>Application protocol logic</td><td>Port / URI / Protocol</td><td>Translates incompatible protocols</td></tr>
          </tbody>
        </table>`,
      workedExamples: {
        level1: `<strong>Problem:</strong> A network administrator replaces a 16-port Hub with a 16-port Switch. What changes regarding collision and broadcast domains?<br><br>
<strong>Solution:</strong><br>
- <strong>Collision Domains:</strong> Changed from <strong>1 shared collision domain</strong> to <strong>16 isolated collision domains</strong> (one per port). Collisions are completely eliminated.<br>
- <strong>Broadcast Domains:</strong> Remains <strong>1 single broadcast domain</strong> (switches flood broadcasts to all ports).`,
        level2: `<strong>Problem:</strong> Which device must be used to connect an internal private LAN (<code>192.168.1.0/24</code>) to the public Internet, and why?<br><br>
<strong>Working:</strong><br>
A <strong>Router</strong> (Layer 3). Switches cannot forward between different IP network subnets because switches only inspect Layer 2 MAC addresses. A Router inspects the Layer 3 destination IP, performs Network Address Translation (NAT), and consults its routing table to forward packets across network boundaries.`,
        level3: `<strong>Problem:</strong> Explain what a "Layer 3 Switch" is and how it differs from a traditional router.<br><br>
<strong>Analysis:</strong><br>
A Layer 3 Switch combines high-density Layer 2 Ethernet switching with hardware-based IP routing performed directly in specialized silicon (ASIC chips). While traditional software routers are designed for WAN connectivity with diverse interfaces (T1, DSL, cellular), Layer 3 switches provide ultra-fast gigabit line-rate routing between internal campus VLANs.`
      },
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Device</th><th>Collision Domains</th><th>Broadcast Domains</th><th>Primary Function</th></tr></thead>
          <tbody>
            <tr><td>Hub</td><td>Does NOT separate</td><td>Does NOT separate</td><td>Multiport physical repeater</td></tr>
            <tr><td>Switch</td><td>Separates per port</td><td>Does NOT separate (without VLANs)</td><td>Layer 2 MAC forwarding</td></tr>
            <tr><td>Router</td><td>Separates per port</td><td>Separates per port</td><td>Layer 3 IP routing & packet filtering</td></tr>
          </tbody>
        </table>`,
      whereUsed: [
        "Home Wi-Fi routers (combines 4 devices: switch, router, AP, and NAT gateway).",
        "Data center spine switches (Layer 3 switches).",
        "Edge border routers connecting enterprises to ISPs."
      ],
      commonMistakes: `
        <ul class="wiki-bullet-list">
          <li><strong>Thinking switches separate broadcast domains:</strong> Standard Layer 2 switches do NOT separate broadcast domains. An ARP broadcast floods to all ports unless partitioned into separate VLANs.</li>
          <li><strong>Confusing a Gateway with a Router:</strong> A router routes packets between identical protocols (IP to IP). A gateway translates between <em>incompatible protocols</em> (e.g. SIP VoIP to PSTN analog telephone).</li>
        </ul>`,
      quiz: [
        {
          question: "Which of the following devices operates strictly at Layer 1 (Physical Layer)?",
          options: ["Hub", "Switch", "Router", "Bridge"],
          correctIndex: 0,
          explanation: "Hubs and repeaters operate at Layer 1, regenerating electrical/optical signals without inspecting frames or packets."
        },
        {
          question: "Which device separates both collision domains AND broadcast domains?",
          options: ["Repeater", "Hub", "Layer 2 Switch", "Router"],
          correctIndex: 3,
          explanation: "Routers operate at Layer 3 and do not forward Layer 2 broadcast frames, creating separate broadcast domains on each interface."
        },
        {
          question: "What is the primary difference between a bridge and a switch?",
          options: ["A bridge operates at Layer 3; a switch operates at Layer 1", "A switch is essentially a high-port-density, hardware-accelerated bridge", "A bridge encrypts packets", "A switch cannot connect to PCs"],
          correctIndex: 1,
          explanation: "Historically, bridges had 2 to 4 ports and relied on software; modern switches have dozens of ports with wire-speed ASIC hardware forwarding."
        }
      ],
      references: [
        { cite: "Forouzan, B. A. Data Communications and Networking (6th Ed.) - Chapter 15: Connecting Devices.", url: "https://www.mheducation.com" },
        { cite: "Tanenbaum & Wetherall, Computer Networks (6th Ed.) - Section 4.7.", url: "https://www.pearson.com" }
      ]
    },
    prevTopicId: "dll-switching", nextTopicId: "arp"
  }
};

// Merge with existing TOPICS_U2 if loaded
if (typeof TOPICS_U2 !== 'undefined') {
  Object.assign(TOPICS_U2, TOPICS_U2_EXT);
}
if (typeof window !== 'undefined') {
  if (window.TOPICS_U2) {
    Object.assign(window.TOPICS_U2, TOPICS_U2_EXT);
  } else {
    window.TOPICS_U2 = Object.assign({}, TOPICS_U2_EXT);
  }
  window.TOPICS_U2_EXT = TOPICS_U2_EXT;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TOPICS_U2_EXT;
}
