// Unit II Extended Topics: MAC Sublayer, Protocols, Switching & Devices
// Covers Tanenbaum Ch.3 & Forouzan Ch.11-13 topics from syllabus
// Design Issues, Simplex Protocol, ALOHA, CSMA, Collision-Free, Wireless LAN,
// 802.11 MAC, DLL Switching, Learning Bridges, Network Devices

const TOPICS_U2_EXT = {

  "dll-design-issues": {
    id: "dll-design-issues",
    title: "Data Link Layer Design Issues & Services",
    unit: "Unit II: Data Link Layer & Reliable Transfer",
    unitId: "unit2",
    level: "Level 2 — Standard Topic",
    category: "datalink",
    difficulty: "Core",
    readingTime: "8 min read",
    standard: "ISO/IEC 7498-1 (OSI Model)",
    oneLiner: "The Data Link Layer provides three classes of service to the network layer: unacknowledged connectionless, acknowledged connectionless, and connection-oriented.",
    quickAnswer: "The DLL transforms a raw, unreliable physical channel into a reliable link by addressing four key design issues: services to the network layer, framing, error control, and flow control.",
    whyItMatters: "Every frame traversing a network depends on proper framing, error handling, and flow regulation—without these, packets would be lost, duplicated, or delivered out of order.",
    infobox: {
      layer: "Layer 2 (Data Link Layer)",
      standard: "ISO/IEC 7498-1, IEEE 802 series",
      type: "Layer Architecture & Services",
      keyFormula: "\\text{DLL Services} = \\text{Framing} + \\text{Error Control} + \\text{Flow Control}",
      prerequisites: ["encapsulation", "protocol-stack"],
      relatedConcepts: ["framing", "error-detection", "flow-control", "sliding-window"],
      compareWith: ["framing"],
      primaryUses: ["All data communication systems", "LAN/WAN link management", "Point-to-point & broadcast links"]
    },
    sections: {
      overview: `<p>The <strong>Data Link Layer (DLL)</strong> sits between the Physical Layer (Layer 1) and the Network Layer (Layer 3) in the OSI reference model. Its primary responsibility is to take packets from the network layer and encapsulate them into <strong>frames</strong> for transmission over a physical link.</p>
        <p>According to Tanenbaum (6th Ed., Ch. 3), the DLL must solve four fundamental design issues:</p>
        <ol class="wiki-ordered-list">
          <li><strong>Providing services to the Network Layer:</strong> Offering well-defined service interfaces.</li>
          <li><strong>Framing:</strong> Breaking the physical bitstream into discrete frames.</li>
          <li><strong>Error Control:</strong> Detecting and correcting transmission errors.</li>
          <li><strong>Flow Control:</strong> Preventing a fast sender from overwhelming a slow receiver.</li>
        </ol>`,
      howItWorks: `
        <h4>Three Classes of DLL Service</h4>
        <ol class="wiki-ordered-list">
          <li><strong>Unacknowledged Connectionless Service:</strong>
            <ul class="wiki-bullet-list">
              <li>No connection establishment or release.</li>
              <li>No acknowledgements are sent. Lost frames are not recovered at this layer.</li>
              <li>Appropriate when the error rate is very low (e.g., Ethernet on fiber) or for real-time traffic where late data is worse than lost data.</li>
              <li><em>Example:</em> Most wired Ethernet (IEEE 802.3) LANs.</li>
            </ul>
          </li>
          <li><strong>Acknowledged Connectionless Service:</strong>
            <ul class="wiki-bullet-list">
              <li>No connection is established, but each frame sent is individually acknowledged.</li>
              <li>The sender knows whether a frame has arrived correctly. If no ACK within timeout, it retransmits.</li>
              <li>Useful over unreliable channels such as wireless links (IEEE 802.11).</li>
              <li><em>Example:</em> Wi-Fi (802.11) frame acknowledgements.</li>
            </ul>
          </li>
          <li><strong>Acknowledged Connection-Oriented Service:</strong>
            <ul class="wiki-bullet-list">
              <li>A logical connection is established before data transfer begins.</li>
              <li>Each frame is numbered, acknowledged, and guaranteed to be received exactly once and in order.</li>
              <li>Three phases: <strong>Connection establishment → Data transfer → Connection release</strong>.</li>
              <li><em>Example:</em> HDLC in balanced mode over satellite/WAN links.</li>
            </ul>
          </li>
        </ol>
        <h4>Error Control Mechanisms</h4>
        <p>Error control ensures reliable delivery by:</p>
        <ul class="wiki-bullet-list">
          <li>Adding <strong>error-detection codes</strong> (parity, checksum, CRC) to each frame's trailer.</li>
          <li>Using <strong>acknowledgement (ACK)</strong> frames from receiver to sender.</li>
          <li>Employing <strong>timers</strong> to retransmit frames when ACK is not received.</li>
          <li>Assigning <strong>sequence numbers</strong> to frames to detect duplicates.</li>
        </ul>
        <h4>Flow Control Mechanisms</h4>
        <p>Flow control prevents sender from overwhelming receiver:</p>
        <ul class="wiki-bullet-list">
          <li><strong>Feedback-based:</strong> Receiver sends permission to sender (e.g., ACKs, window advertisements).</li>
          <li><strong>Rate-based:</strong> Protocol has a built-in rate limit (less common at DLL).</li>
          <li><strong>Sliding Window:</strong> Allows multiple frames in flight, bounded by window size W.</li>
        </ul>`,
      diagram: `
┌──────────────────────────────────────────────────┐
│              NETWORK LAYER (Layer 3)             │
│          Sends/receives IP packets               │
└──────────────────────┬───────────────────────────┘
                       │ Service Interface
┌──────────────────────▼───────────────────────────┐
│            DATA LINK LAYER (Layer 2)             │
│                                                  │
│  ┌─────────────┐  ┌──────────┐  ┌────────────┐  │
│  │   FRAMING   │  │  ERROR   │  │    FLOW    │  │
│  │ Flag/Stuff  │  │ CONTROL  │  │  CONTROL   │  │
│  │ Byte/Bit    │  │ CRC/ACK  │  │  Window    │  │
│  └─────────────┘  └──────────┘  └────────────┘  │
│                                                  │
│  Service Types:                                  │
│  1. Unacknowledged Connectionless (Ethernet)     │
│  2. Acknowledged Connectionless  (Wi-Fi)         │
│  3. Connection-Oriented          (HDLC)          │
└──────────────────────┬───────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────┐
│            PHYSICAL LAYER (Layer 1)              │
│        Raw bit transmission over medium          │
└──────────────────────────────────────────────────┘`,
      technicalDetails: `
        <h4>Relationship Between Services and Mechanisms</h4>
        <table class="wiki-table">
          <thead><tr><th>Service Type</th><th>ACKs?</th><th>Connection?</th><th>Sequence Nums?</th><th>Retransmission?</th><th>Example</th></tr></thead>
          <tbody>
            <tr><td>Unacknowledged Connectionless</td><td>No</td><td>No</td><td>No</td><td>No (left to higher layers)</td><td>Ethernet 802.3</td></tr>
            <tr><td>Acknowledged Connectionless</td><td>Yes</td><td>No</td><td>Yes</td><td>Yes (timer-based)</td><td>Wi-Fi 802.11</td></tr>
            <tr><td>Connection-Oriented</td><td>Yes</td><td>Yes (3 phases)</td><td>Yes</td><td>Yes (guaranteed order)</td><td>HDLC ABM</td></tr>
          </tbody>
        </table>
        <h4>Framing Techniques Summary</h4>
        <ul class="wiki-bullet-list">
          <li><strong>Byte Count:</strong> Length field in header. Fragile to bit errors in count field.</li>
          <li><strong>Flag Bytes with Byte Stuffing:</strong> Delimiter 0x7E, escape 0x7D (PPP/RFC 1661).</li>
          <li><strong>Flag Bits with Bit Stuffing:</strong> Delimiter 01111110, zero-insertion after five 1s (HDLC).</li>
          <li><strong>Physical Layer Coding Violations:</strong> Use reserved signal patterns (Manchester/4B5B).</li>
        </ul>`,
      workedExample: `<p><strong>Scenario:</strong> A sender needs to send 5 frames over an unreliable wireless channel using acknowledged connectionless service.</p>
        <p><strong>Process:</strong></p>
        <ol class="wiki-ordered-list">
          <li>Sender transmits Frame 0 and starts timer T<sub>out</sub>.</li>
          <li>Receiver gets Frame 0, checks CRC → valid → sends ACK 0.</li>
          <li>Sender receives ACK 0 before timeout → transmits Frame 1.</li>
          <li>Frame 1 is corrupted → receiver discards, sends nothing.</li>
          <li>Sender's timer expires → retransmits Frame 1.</li>
          <li>This time receiver gets Frame 1 correctly → ACK 1.</li>
          <li>Process continues for Frames 2, 3, 4.</li>
        </ol>
        <p>This is the basis of the <strong>Stop-and-Wait ARQ</strong> protocol.</p>`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Service Type</th><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Unacknowledged Connectionless</td><td>Lowest overhead, fastest, simplest</td><td>No reliability guarantee at link layer</td></tr>
            <tr><td>Acknowledged Connectionless</td><td>Reliability without connection setup cost</td><td>ACK overhead, retransmission delays</td></tr>
            <tr><td>Connection-Oriented</td><td>Guaranteed in-order, exactly-once delivery</td><td>Highest overhead, connection setup latency</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["All IEEE 802 LAN/WAN standards", "Point-to-point links (PPP, HDLC)", "Satellite communication links", "Industrial SCADA serial connections"],
      commonMistakes: "Confusing DLL flow control with TCP congestion control. DLL flow control is a point-to-point mechanism between adjacent nodes. TCP congestion control is an end-to-end mechanism across the entire network path.",
      compareWith: { title: "DLL Error Control vs Transport Layer Error Control", note: "DLL error control operates hop-by-hop between adjacent nodes. Transport layer (TCP) error control operates end-to-end between source and destination hosts." },
      practice: {
        question: "Which type of Data Link Layer service is typically used by IEEE 802.11 (Wi-Fi)?",
        choices: ["Unacknowledged connectionless", "Acknowledged connectionless", "Acknowledged connection-oriented", "Rate-based connectionless"],
        correctIndex: 1,
        explanation: "IEEE 802.11 Wi-Fi uses acknowledged connectionless service because wireless channels are unreliable, so each frame is individually acknowledged without establishing a full connection."
      },
      references: [
        { cite: "Tanenbaum & Wetherall, Computer Networks, 6th Ed., Ch. 3.1: Data Link Layer Design Issues", url: "https://www.pearson.com/en-us/subject-catalog/p/computer-networks/P200000003193" },
        { cite: "Forouzan, Data Communications & Networking, 6th Ed., Ch. 11: Data Link Control", url: "https://www.mheducation.com/" }
      ]
    },
    prevTopicId: "encapsulation",
    nextTopicId: "framing"
  },

  "simplex-protocol": {
    id: "simplex-protocol",
    title: "Simplex & Elementary Data Link Protocols",
    unit: "Unit II: Data Link Layer & Reliable Transfer",
    unitId: "unit2",
    level: "Level 2 — Standard Topic",
    category: "datalink",
    difficulty: "Core",
    readingTime: "7 min read",
    standard: "Tanenbaum Ch. 3.3",
    oneLiner: "A simplex protocol allows data flow in only one direction—the simplest DLL protocol assumes an ideal channel with no errors and infinite receiver buffer.",
    quickAnswer: "Elementary protocols (Utopia, Simplex Stop-and-Wait, Simplex for Noisy Channel) progressively add error and flow control to handle real-world transmission challenges.",
    whyItMatters: "These idealized protocols form the theoretical foundation for understanding all practical ARQ protocols like Go-Back-N and Selective Repeat used in real networks.",
    infobox: {
      layer: "Layer 2 (Data Link Layer)",
      standard: "Tanenbaum Ch. 3.3, Forouzan Ch. 11",
      type: "Elementary Protocol Design",
      keyFormula: "\\text{Utilization}_{\\text{Stop-Wait}} = \\frac{1}{1 + 2a}, \\quad a = \\frac{t_{prop}}{t_{frame}}",
      prerequisites: ["framing", "flow-control"],
      relatedConcepts: ["stop-and-wait", "sliding-window", "flow-control", "error-detection"],
      compareWith: ["stop-and-wait"],
      primaryUses: ["Theoretical protocol design", "Teaching fundamentals of reliable transfer", "Base for all ARQ protocols"]
    },
    sections: {
      overview: `<p>Tanenbaum introduces three progressively more realistic <strong>elementary data link protocols</strong> to illustrate how framing, flow control, and error control are combined:</p>
        <ol class="wiki-ordered-list">
          <li><strong>Protocol 1 – Utopia (Simplex, Unrestricted):</strong> An ideal, error-free channel with infinite receiver buffer. No flow or error control needed.</li>
          <li><strong>Protocol 2 – Simplex Stop-and-Wait:</strong> Error-free channel but finite receiver buffer. Sender waits for a dummy ACK before sending the next frame (flow control only).</li>
          <li><strong>Protocol 3 – Simplex for a Noisy Channel:</strong> Channel can lose or corrupt frames. Adds sequence numbers, ACKs, timeouts, and retransmission (both error and flow control).</li>
        </ol>`,
      howItWorks: `
        <h4>Protocol 1: Utopia (An Unrestricted Simplex Protocol)</h4>
        <ul class="wiki-bullet-list">
          <li>Data flows in <strong>one direction only</strong> (sender → receiver).</li>
          <li><strong>Assumptions:</strong> Error-free channel, receiver can process frames infinitely fast.</li>
          <li><strong>Sender:</strong> Continuously fetches packets from the network layer, frames them, and sends.</li>
          <li><strong>Receiver:</strong> Waits for a frame, extracts the packet, delivers to its network layer.</li>
          <li>This protocol is <em>purely theoretical</em>—no real channel is error-free.</li>
        </ul>
        <h4>Protocol 2: Simplex Stop-and-Wait (for Error-Free Channel)</h4>
        <ul class="wiki-bullet-list">
          <li>Still assumes <strong>no errors</strong>, but the receiver has a <strong>finite buffer</strong>.</li>
          <li>After sending a frame, the sender <strong>waits for a dummy acknowledgement</strong> (ACK) before sending the next frame.</li>
          <li>The ACK frame carries no data—it merely signals that the receiver is ready.</li>
          <li>This achieves <strong>flow control</strong> via feedback.</li>
        </ul>
        <h4>Protocol 3: Simplex Protocol for a Noisy Channel</h4>
        <ul class="wiki-bullet-list">
          <li>Channel can <strong>corrupt or lose</strong> frames (both data and ACKs).</li>
          <li>Sender adds a <strong>1-bit sequence number</strong> (0 or 1) to each frame.</li>
          <li>Receiver sends a <strong>positive ACK</strong> only for correctly received frames.</li>
          <li>Sender uses a <strong>countdown timer</strong>: if ACK not received within timeout, it retransmits.</li>
          <li>Sequence numbers prevent <strong>duplicate acceptance</strong> when ACK is lost and frame is retransmitted.</li>
          <li>This is the full <strong>Stop-and-Wait ARQ</strong> protocol.</li>
        </ul>`,
      diagram: `
Protocol 1 (Utopia):              Protocol 2 (Stop-Wait):           Protocol 3 (Noisy Channel):
                                                                     
Sender    Channel    Receiver     Sender    Channel    Receiver     Sender    Channel    Receiver
  |                    |            |                    |            |                    |
  |---Frame 0--------->|            |---Frame 0--------->|            |---Frame 0--------->|
  |---Frame 1--------->|            |<------ACK----------|            |   [Start Timer]    |
  |---Frame 2--------->|            |---Frame 1--------->|            |<------ACK 0--------|
  |---Frame 3--------->|            |<------ACK----------|            |   [Stop Timer]     |
  |   (no waiting)     |            |   (waits each time)|            |---Frame 1--------->|
  |        ...         |            |        ...         |            |   [Timer Expires]  |
  |                    |            |                    |            |---Frame 1--------->|
                                                                     |   [Retransmit!]    |
                                                                     |<------ACK 1--------|`,
      technicalDetails: `
        <h4>Comparison of Elementary Protocols</h4>
        <table class="wiki-table">
          <thead><tr><th>Feature</th><th>Protocol 1 (Utopia)</th><th>Protocol 2 (Stop-Wait)</th><th>Protocol 3 (Noisy)</th></tr></thead>
          <tbody>
            <tr><td>Error Control</td><td>None</td><td>None</td><td>CRC + ACK + Timer</td></tr>
            <tr><td>Flow Control</td><td>None</td><td>ACK feedback</td><td>ACK feedback</td></tr>
            <tr><td>Sequence Numbers</td><td>None</td><td>None</td><td>1-bit (0 and 1)</td></tr>
            <tr><td>Timeout/Retransmit</td><td>No</td><td>No</td><td>Yes</td></tr>
            <tr><td>Practical?</td><td>No (purely theoretical)</td><td>Only on perfect channels</td><td>Yes — basis of real ARQ</td></tr>
            <tr><td>Channel Utilization</td><td>100% (ideal)</td><td>1/(1+2a)</td><td>1/(1+2a) × (1-BER)</td></tr>
          </tbody>
        </table>
        <h4>Why Only 1-Bit Sequence Number?</h4>
        <p>In Stop-and-Wait, only <strong>one frame</strong> is outstanding at a time. The receiver only needs to distinguish between the <em>current</em> frame and the <em>previous</em> frame. Two states (0 and 1) suffice: if the receiver gets a frame with the same sequence number as the last accepted frame, it knows this is a <strong>duplicate retransmission</strong> and discards it.</p>`,
      workedExample: `<p><strong>Scenario (Protocol 3):</strong> Sender transmits frames over a noisy channel with a 200ms round-trip time and frame transmission time of 50ms.</p>
        <ol class="wiki-ordered-list">
          <li>Sender sends <code>Frame[seq=0]</code>, starts timer (timeout = 300ms).</li>
          <li>Receiver gets frame correctly → extracts packet → sends <code>ACK[0]</code>.</li>
          <li>Sender receives ACK[0] at t=250ms (before timeout) → sends <code>Frame[seq=1]</code>.</li>
          <li><strong>ACK[1] is lost!</strong> Sender's timer expires at t=550ms.</li>
          <li>Sender retransmits <code>Frame[seq=1]</code>.</li>
          <li>Receiver checks: seq=1 matches expected → this is a <strong>duplicate</strong> → discards frame, resends <code>ACK[1]</code>.</li>
          <li>Sender receives ACK[1] → moves to <code>Frame[seq=0]</code> (sequence wraps).</li>
        </ol>
        <p><strong>Channel Utilization:</strong> $U = \\frac{1}{1 + 2a} = \\frac{1}{1 + 2(200/50)} = \\frac{1}{9} \\approx 11.1\\%$</p>`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Conceptually simple; easy to implement</td><td>Very low channel utilization on long-delay links</td></tr>
            <tr><td>Protocol 3 handles all error/loss scenarios</td><td>Only 1 frame in transit at a time</td></tr>
            <tr><td>Foundation for understanding complex protocols</td><td>Sliding window protocols vastly outperform it</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Theoretical teaching of protocol design", "Simple embedded system serial links", "IoT devices with very low data rates", "Foundation for Stop-and-Wait ARQ in HDLC"],
      commonMistakes: "Thinking Protocol 1 (Utopia) can be used in practice. No real channel is error-free and no real receiver has infinite processing speed. Utopia exists purely to illustrate what happens when you remove all constraints.",
      compareWith: { title: "Simplex vs Sliding Window", note: "Simplex protocols allow only 1 frame in flight. Sliding window protocols allow W frames in flight simultaneously, dramatically improving throughput on high-delay links." },
      practice: {
        question: "In Tanenbaum's Protocol 3 (Simplex for Noisy Channel), why does the sender use a 1-bit sequence number instead of no sequence number?",
        choices: ["To identify the frame type", "To detect duplicate frames caused by lost ACKs", "To calculate CRC", "To measure round-trip time"],
        correctIndex: 1,
        explanation: "When an ACK is lost, the sender retransmits the same frame. Without a sequence number, the receiver cannot distinguish a retransmission from a new frame. The 1-bit sequence number (alternating 0/1) lets the receiver detect and discard duplicates."
      },
      references: [
        { cite: "Tanenbaum & Wetherall, Computer Networks, 6th Ed., Ch. 3.3: Elementary Data Link Protocols", url: "https://www.pearson.com/en-us/subject-catalog/p/computer-networks/P200000003193" },
        { cite: "Forouzan, Data Communications & Networking, 6th Ed., Ch. 11.3: Simple Protocol & Stop-and-Wait", url: "https://www.mheducation.com/" }
      ]
    },
    prevTopicId: "flow-control",
    nextTopicId: "stop-and-wait"
  },

  "channel-allocation": {
    id: "channel-allocation",
    title: "Channel Allocation Problem & MAC Sublayer",
    unit: "Unit II: Data Link Layer & Reliable Transfer",
    unitId: "unit2",
    level: "Level 2 — Standard Topic",
    category: "datalink",
    difficulty: "Core",
    readingTime: "7 min read",
    standard: "Tanenbaum Ch. 4.1",
    oneLiner: "The channel allocation problem asks how to divide a single broadcast channel among N competing stations efficiently—static methods (FDM/TDM) vs dynamic multiple access protocols.",
    quickAnswer: "Static allocation (FDM/TDM) wastes bandwidth for bursty traffic. Dynamic allocation allows stations to contend for the channel on demand, leading to higher utilization for typical LAN workloads.",
    whyItMatters: "Shared media like Ethernet, Wi-Fi, and satellite links require fair, efficient channel access—choosing the wrong strategy can reduce throughput to near zero under heavy load.",
    infobox: {
      layer: "Layer 2 (Data Link — MAC Sublayer)",
      standard: "Tanenbaum Ch. 4.1, IEEE 802 series",
      type: "Medium Access Control",
      keyFormula: "T_{FDM} = N \\cdot T_{\\text{single}}, \\quad \\text{for } N \\text{ users each getting } C/N \\text{ bandwidth}",
      prerequisites: ["dll-design-issues", "framing"],
      relatedConcepts: ["aloha", "csma-protocols", "collision-free-protocols", "ethernet"],
      compareWith: ["aloha"],
      primaryUses: ["LAN design", "Satellite channel sharing", "Wireless spectrum management"]
    },
    sections: {
      overview: `<p>When multiple stations share a single broadcast channel (like a coaxial Ethernet cable or a wireless frequency), they need a way to decide <strong>who gets to transmit and when</strong>. This is the <strong>Channel Allocation Problem</strong>, handled by the <strong>Medium Access Control (MAC) sublayer</strong>—the lower part of the Data Link Layer.</p>
        <p>Tanenbaum identifies two fundamental approaches:</p>
        <ul class="wiki-bullet-list">
          <li><strong>Static Channel Allocation:</strong> Pre-divide the channel using FDM (frequency slots) or TDM (time slots). Each station gets a fixed share.</li>
          <li><strong>Dynamic Channel Allocation:</strong> Stations contend for the channel in real-time using various multiple access protocols (ALOHA, CSMA, etc.).</li>
        </ul>`,
      howItWorks: `
        <h4>Static Channel Allocation</h4>
        <ul class="wiki-bullet-list">
          <li><strong>FDM (Frequency Division Multiplexing):</strong> Divides total bandwidth C into N equal sub-bands of C/N each. Each station permanently owns one sub-band.</li>
          <li><strong>TDM (Time Division Multiplexing):</strong> Divides time into recurring frames of N slots. Each station transmits only during its designated slot.</li>
          <li><strong>Problem:</strong> If N = 100 stations and only 5 are active, 95% of the bandwidth is wasted. Mean delay increases by factor of N (proven by queuing theory).</li>
        </ul>
        <h4>Why Static Allocation Fails for LANs</h4>
        <p>According to queuing theory (M/D/1 queue): If the mean frame arrival rate is λ and frame length is 1/μ bits, then mean delay for a single channel of capacity C is:</p>
        <p style="text-align:center">$T = \\frac{1}{\\mu C - \\lambda}$</p>
        <p>If the channel is divided into N sub-channels by FDM, each with capacity C/N, and the arrival rate per sub-channel is λ/N:</p>
        <p style="text-align:center">$T_{FDM} = \\frac{1}{\\mu(C/N) - \\lambda/N} = \\frac{N}{\\mu C - \\lambda} = N \\cdot T$</p>
        <p>This proves that <strong>FDM increases mean delay by a factor of N</strong> compared to dynamic allocation—unacceptable for bursty LAN traffic.</p>
        <h4>Dynamic Channel Allocation Assumptions</h4>
        <p>Tanenbaum lists five key assumptions for dynamic allocation:</p>
        <ol class="wiki-ordered-list">
          <li><strong>Station Model:</strong> N independent stations, each generating frames with probability λΔt in interval Δt.</li>
          <li><strong>Single Channel:</strong> One shared broadcast channel available for all communication.</li>
          <li><strong>Collision Assumption:</strong> If two frames overlap in time, they collide and both are garbled.</li>
          <li><strong>Continuous or Slotted Time:</strong> Transmission can begin at any instant (continuous) or only at slot boundaries (slotted).</li>
          <li><strong>Carrier Sense or No Carrier Sense:</strong> Stations may or may not be able to detect whether the channel is in use before transmitting.</li>
        </ol>`,
      diagram: `
STATIC ALLOCATION (FDM):                    DYNAMIC ALLOCATION:

Frequency ▲                                 Time ──────────────────────►
          │ ┌────────┐                       
     f4   │ │Station D│                      Station A ███░░░░░███░░░░░░
     f3   │ │Station C│                      Station B ░░░███░░░░░███░░░
     f2   │ │Station B│                      Station C ░░░░░░███░░░░░███
     f1   │ │Station A│                      Station D ░░░░░░░░░███░░░░░
          └─┴────────┴──► Time               
                                             Contention   Collision    
     Each station gets 1/N bandwidth         Stations transmit on demand
     Wastes BW when station is idle          Higher utilization for bursty traffic`,
      technicalDetails: `
        <h4>Classification of Multiple Access Protocols</h4>
        <table class="wiki-table">
          <thead><tr><th>Category</th><th>Protocol</th><th>Carrier Sense?</th><th>Time Model</th><th>Collision Handling</th></tr></thead>
          <tbody>
            <tr><td rowspan="2">Random Access</td><td>Pure ALOHA</td><td>No</td><td>Continuous</td><td>Random backoff</td></tr>
            <tr><td>Slotted ALOHA</td><td>No</td><td>Slotted</td><td>Random backoff</td></tr>
            <tr><td rowspan="3">Carrier Sense</td><td>1-persistent CSMA</td><td>Yes</td><td>Continuous</td><td>Detect & backoff</td></tr>
            <tr><td>Non-persistent CSMA</td><td>Yes</td><td>Continuous</td><td>Random wait</td></tr>
            <tr><td>CSMA/CD</td><td>Yes</td><td>Continuous</td><td>Jam & binary exp. backoff</td></tr>
            <tr><td rowspan="2">Collision-Free</td><td>Bitmap</td><td>N/A</td><td>Slotted</td><td>Reservation (no collisions)</td></tr>
            <tr><td>Binary Countdown</td><td>N/A</td><td>Slotted</td><td>Priority arbitration</td></tr>
          </tbody>
        </table>`,
      workedExample: `<p><strong>Problem:</strong> A LAN has 20 stations sharing a 10 Mbps channel. Average frame size is 1000 bits. Only 3 stations are active at any time.</p>
        <p><strong>Static FDM:</strong> Each station gets 10/20 = 0.5 Mbps. Active stations can only use 0.5 Mbps each → total utilization = 3 × 0.5 = 1.5 Mbps out of 10 Mbps = <strong>15% utilization</strong>.</p>
        <p><strong>Dynamic Allocation:</strong> Each active station contends for the full 10 Mbps channel. Even with collision overhead, utilization can reach <strong>80-90%</strong> with CSMA/CD.</p>
        <p><strong>Conclusion:</strong> Dynamic allocation is 5-6× more efficient for bursty LAN traffic.</p>`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Approach</th><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Static (FDM/TDM)</td><td>Guaranteed bandwidth, no collisions, predictable</td><td>Wastes bandwidth for bursty traffic, delay ×N</td></tr>
            <tr><td>Dynamic (Contention)</td><td>Efficient for bursty traffic, adapts to load</td><td>Collisions possible, variable delay under heavy load</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Ethernet LANs (dynamic/CSMA/CD)", "Cellular networks (static/TDMA, FDMA, CDMA)", "Satellite channels (ALOHA, TDMA)", "Wi-Fi (dynamic/CSMA/CA)"],
      commonMistakes: "Assuming static allocation is always bad. For constant-bit-rate traffic like voice circuits (telephone networks), static TDM is actually optimal because every station always has data to send.",
      compareWith: { title: "Static vs Dynamic Channel Allocation", note: "Static allocation is optimal for constant traffic (telephony). Dynamic allocation is optimal for bursty, variable traffic (data networks)." },
      practice: {
        question: "According to queuing theory, if a channel of capacity C is divided into N sub-channels using FDM, the mean delay increases by a factor of:",
        choices: ["2", "N", "N²", "log N"],
        correctIndex: 1,
        explanation: "Tanenbaum proves using M/D/1 queuing theory that FDM with N sub-channels increases mean frame delay by exactly a factor of N compared to a single dynamic channel."
      },
      references: [
        { cite: "Tanenbaum & Wetherall, Computer Networks, 6th Ed., Ch. 4.1: The Channel Allocation Problem", url: "https://www.pearson.com/en-us/subject-catalog/p/computer-networks/P200000003193" },
        { cite: "Forouzan, Data Communications & Networking, 6th Ed., Ch. 12.1: Random Access", url: "https://www.mheducation.com/" }
      ]
    },
    prevTopicId: "selective-repeat",
    nextTopicId: "aloha"
  },

  "aloha": {
    id: "aloha",
    title: "ALOHA Protocols (Pure & Slotted)",
    unit: "Unit II: Data Link Layer & Reliable Transfer",
    unitId: "unit2",
    level: "Level 2 — Standard Topic",
    category: "datalink",
    difficulty: "Core",
    readingTime: "8 min read",
    standard: "Tanenbaum Ch. 4.2",
    oneLiner: "ALOHA is the earliest random access protocol—stations transmit whenever they have data; collisions are resolved by random backoff and retransmission.",
    quickAnswer: "Pure ALOHA achieves maximum throughput of 18.4% (1/2e) because the vulnerable period is 2×frame time. Slotted ALOHA doubles this to 36.8% (1/e) by synchronizing transmissions to slot boundaries.",
    whyItMatters: "ALOHA was the first practical wireless networking protocol (1970, University of Hawaii) and its contention-based approach directly influenced Ethernet, Wi-Fi, and modern cellular random access channels.",
    infobox: {
      layer: "Layer 2 (Data Link — MAC Sublayer)",
      standard: "Abramson, 1970 (ALOHAnet)",
      type: "Random Access Protocol",
      keyFormula: "S_{\\text{Pure}} = G \\cdot e^{-2G}, \\quad S_{\\text{Slotted}} = G \\cdot e^{-G}",
      prerequisites: ["channel-allocation"],
      relatedConcepts: ["csma-protocols", "ethernet", "collision-free-protocols"],
      compareWith: ["csma-protocols"],
      primaryUses: ["ALOHAnet (1970)", "Satellite random access", "RFID anti-collision", "LTE/5G RACH"]
    },
    sections: {
      overview: `<p>The <strong>ALOHA</strong> protocol, invented by Norman Abramson at the University of Hawaii in 1970, was the first system to demonstrate random wireless data networking. The ALOHAnet connected the Hawaiian islands using a shared UHF radio channel.</p>
        <p>The core idea is radically simple: <strong>transmit whenever you have data</strong>. If a collision occurs, wait a random time and try again.</p>
        <p>Two variants exist:</p>
        <ul class="wiki-bullet-list">
          <li><strong>Pure ALOHA:</strong> Stations transmit at any time (continuous time model).</li>
          <li><strong>Slotted ALOHA:</strong> Time is divided into uniform slots; stations can only transmit at slot boundaries.</li>
        </ul>`,
      howItWorks: `
        <h4>Pure ALOHA</h4>
        <ol class="wiki-ordered-list">
          <li>When a station has a frame to send, it <strong>transmits immediately</strong>.</li>
          <li>After transmission, the station listens for an <strong>acknowledgement</strong> from the receiver.</li>
          <li>If an ACK is received, the frame was successful.</li>
          <li>If <strong>no ACK</strong> (collision occurred), the station waits a <strong>random backoff time</strong> and retransmits.</li>
          <li>The <strong>vulnerable period</strong> = 2 × frame time (t₀). A frame sent at time t can collide with any frame sent in the interval [t - t₀, t + t₀].</li>
        </ol>
        <h4>Throughput Analysis (Pure ALOHA)</h4>
        <p>Let G = offered load (average number of transmission attempts per frame time, including retransmissions).</p>
        <p>Probability of a successful frame = probability of <strong>no other transmission</strong> during the vulnerable period 2t₀:</p>
        <p style="text-align:center">$S = G \\cdot e^{-2G}$</p>
        <p>Maximum throughput occurs at G = 0.5: $S_{max} = \\frac{1}{2e} \\approx 0.184$ (18.4%)</p>

        <h4>Slotted ALOHA</h4>
        <ol class="wiki-ordered-list">
          <li>Time is divided into <strong>discrete slots</strong>, each exactly one frame time long.</li>
          <li>Stations are <strong>synchronized</strong> and can only begin transmission at a slot boundary.</li>
          <li>If two stations transmit in the same slot, both frames collide → both wait random number of slots and retry.</li>
          <li><strong>Vulnerable period = 1 × frame time</strong> (halved from Pure ALOHA).</li>
        </ol>
        <h4>Throughput Analysis (Slotted ALOHA)</h4>
        <p style="text-align:center">$S = G \\cdot e^{-G}$</p>
        <p>Maximum throughput at G = 1: $S_{max} = \\frac{1}{e} \\approx 0.368$ (36.8%)</p>`,
      diagram: `
PURE ALOHA - Vulnerable Period = 2 × Frame Time:

     t₀          t₀
  ◄────────►◄────────►
  ┌────────┐┌────────┐
  │ DANGER │█ Frame █│ DANGER │
  │ ZONE   ││ by A   │ ZONE   │
  └────────┘└────────┘
  Any frame starting in     Frame A
  this 2t₀ window collides  starts here
  with Frame A.

SLOTTED ALOHA - Vulnerable Period = 1 × Frame Time:

  Slot 1    Slot 2    Slot 3    Slot 4    Slot 5
  ┌────────┐┌────────┐┌────────┐┌────────┐┌────────┐
  │  A     ││  B+C   ││  (empty)││  B     ││  C     │
  │ (ok)   ││COLLISION││        ││ (ok)   ││ (ok)   │
  └────────┘└────────┘└────────┘└────────┘└────────┘
              ▲ Both B and C chose same slot → collision`,
      technicalDetails: `
        <h4>Comparison: Pure ALOHA vs Slotted ALOHA</h4>
        <table class="wiki-table">
          <thead><tr><th>Feature</th><th>Pure ALOHA</th><th>Slotted ALOHA</th></tr></thead>
          <tbody>
            <tr><td>Time Model</td><td>Continuous</td><td>Slotted (synchronized)</td></tr>
            <tr><td>Vulnerable Period</td><td>2 × frame time (2t₀)</td><td>1 × frame time (t₀)</td></tr>
            <tr><td>Max Throughput</td><td>1/2e ≈ 18.4%</td><td>1/e ≈ 36.8%</td></tr>
            <tr><td>Optimal G</td><td>G = 0.5</td><td>G = 1.0</td></tr>
            <tr><td>Throughput Formula</td><td>S = G·e⁻²ᴳ</td><td>S = G·e⁻ᴳ</td></tr>
            <tr><td>Synchronization</td><td>Not required</td><td>Global clock needed</td></tr>
            <tr><td>Complexity</td><td>Simplest possible</td><td>Slightly more complex</td></tr>
          </tbody>
        </table>
        <h4>Backoff Strategy</h4>
        <p>After a collision, each station independently chooses a random number of frame times to wait (typically uniform over [0, 2<sup>k</sup> - 1] where k = collision count). This is <strong>Binary Exponential Backoff (BEB)</strong>—the same strategy later used by Ethernet.</p>`,
      workedExample: `<p><strong>Problem:</strong> In a Pure ALOHA system, 1000 stations each generate a frame every 100 seconds. Frame time = 1 second. Calculate the offered load G and throughput S.</p>
        <p><strong>Solution:</strong></p>
        <ol class="wiki-ordered-list">
          <li>Frame generation rate per station = 1/100 frames/sec.</li>
          <li>Total frame generation rate = 1000 × (1/100) = <strong>10 frames/sec</strong>.</li>
          <li>Frame time t₀ = 1 sec, so <strong>G = 10 × 1 = 10</strong>.</li>
          <li>$S = G \\cdot e^{-2G} = 10 \\cdot e^{-20} \\approx 10 \\times 2.06 \\times 10^{-9} \\approx 0.0000$ (virtually zero!).</li>
          <li><strong>Conclusion:</strong> The system is extremely overloaded (G >> 0.5). Almost all frames collide.</li>
        </ol>
        <p><strong>Optimal case:</strong> For G = 0.5, $S = 0.5 \\cdot e^{-1} = 0.184$ → only 18.4% of channel time produces successful frames.</p>`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Extremely simple to implement</td><td>Very low maximum throughput (18.4% or 36.8%)</td></tr>
            <tr><td>No coordination needed (Pure ALOHA)</td><td>Performance degrades catastrophically under heavy load</td></tr>
            <tr><td>Works for any number of stations</td><td>Unstable: collisions cause more retransmissions which cause more collisions</td></tr>
            <tr><td>Low delay at very light loads</td><td>No carrier sensing—wastes bandwidth transmitting into collisions</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Original ALOHAnet (1970, University of Hawaii)", "Satellite random access channels", "RFID tag anti-collision protocols", "LTE/5G Random Access Channel (RACH)", "LoRaWAN uplink transmission"],
      commonMistakes: "Confusing 'throughput' with 'offered load'. Throughput S is the rate of successful transmissions; offered load G includes retransmissions. When G > 1 (Pure) or G > 1 (Slotted), the system becomes unstable with throughput dropping toward zero.",
      compareWith: { title: "Pure ALOHA vs Slotted ALOHA vs CSMA", note: "Pure ALOHA: simplest, 18.4% max. Slotted ALOHA: 36.8% max. CSMA/CD (Ethernet): up to 90%+ because stations sense the channel before transmitting." },
      practice: {
        question: "What is the maximum channel throughput achievable by Slotted ALOHA?",
        choices: ["18.4% (1/2e)", "36.8% (1/e)", "50%", "100%"],
        correctIndex: 1,
        explanation: "Slotted ALOHA achieves maximum throughput of 1/e ≈ 36.8% when the offered load G = 1.0. This is exactly double Pure ALOHA's maximum because the vulnerable period is halved."
      },
      references: [
        { cite: "Tanenbaum & Wetherall, Computer Networks, 6th Ed., Ch. 4.2: Multiple Access Protocols — ALOHA", url: "https://www.pearson.com/en-us/subject-catalog/p/computer-networks/P200000003193" },
        { cite: "Abramson, N. 'The ALOHA System' (1970)", url: "https://doi.org/10.1145/1478462.1478502" },
        { cite: "Forouzan, Data Communications & Networking, 6th Ed., Ch. 12.1: Random Access — ALOHA", url: "https://www.mheducation.com/" }
      ]
    },
    prevTopicId: "channel-allocation",
    nextTopicId: "csma-protocols"
  },

  "csma-protocols": {
    id: "csma-protocols",
    title: "CSMA Protocols (Carrier Sense Multiple Access)",
    unit: "Unit II: Data Link Layer & Reliable Transfer",
    unitId: "unit2",
    level: "Level 2 — Standard Topic",
    category: "datalink",
    difficulty: "Core",
    readingTime: "9 min read",
    standard: "IEEE 802.3 (CSMA/CD), IEEE 802.11 (CSMA/CA)",
    oneLiner: "CSMA protocols improve upon ALOHA by requiring stations to sense the channel before transmitting—'listen before talk' reduces collisions dramatically.",
    quickAnswer: "CSMA adds carrier sensing to ALOHA. CSMA/CD (Ethernet) detects collisions during transmission and aborts immediately. CSMA/CA (Wi-Fi) avoids collisions using RTS/CTS and acknowledgements.",
    whyItMatters: "CSMA/CD is the foundation of Ethernet (the world's most widely deployed LAN technology), and CSMA/CA powers every Wi-Fi network—together they connect billions of devices.",
    infobox: {
      layer: "Layer 2 (Data Link — MAC Sublayer)",
      standard: "IEEE 802.3 (CSMA/CD), IEEE 802.11 (CSMA/CA)",
      type: "Carrier Sense Multiple Access",
      keyFormula: "\\text{CSMA/CD: Min frame} = 2 \\times \\text{propagation delay} \\times \\text{data rate}",
      prerequisites: ["channel-allocation", "aloha"],
      relatedConcepts: ["ethernet", "collision-free-protocols", "wireless-lan-protocols"],
      compareWith: ["aloha"],
      primaryUses: ["Ethernet (IEEE 802.3)", "Wi-Fi (IEEE 802.11)", "CAN bus (automotive)", "Industrial networks"]
    },
    sections: {
      overview: `<p><strong>Carrier Sense Multiple Access (CSMA)</strong> protocols improve upon ALOHA by adding a simple but powerful rule: <strong>listen before you talk</strong>. Before transmitting, a station senses the channel. If it's busy, the station defers. This dramatically reduces collisions compared to ALOHA.</p>
        <p>However, collisions can still occur because of <strong>propagation delay</strong>—a station may sense the channel as idle while another station's frame is still propagating toward it. Three persistence strategies and two collision-handling variants address this.</p>`,
      howItWorks: `
        <h4>CSMA Persistence Strategies</h4>
        <ol class="wiki-ordered-list">
          <li><strong>1-Persistent CSMA:</strong>
            <ul class="wiki-bullet-list">
              <li>Sense channel: if idle → transmit immediately (probability 1).</li>
              <li>If busy → keep sensing continuously until idle → transmit immediately.</li>
              <li><strong>Problem:</strong> If two stations are waiting for a busy channel, both transmit the instant it becomes idle → guaranteed collision.</li>
              <li>Used by: Ethernet (802.3) with modifications.</li>
            </ul>
          </li>
          <li><strong>Non-Persistent CSMA:</strong>
            <ul class="wiki-bullet-list">
              <li>Sense channel: if idle → transmit.</li>
              <li>If busy → wait a <strong>random time</strong>, then sense again.</li>
              <li><strong>Advantage:</strong> Reduces collision probability because waiting stations don't all pounce simultaneously.</li>
              <li><strong>Disadvantage:</strong> Channel may sit idle even when stations have data (wasted capacity).</li>
            </ul>
          </li>
          <li><strong>p-Persistent CSMA (for slotted channels):</strong>
            <ul class="wiki-bullet-list">
              <li>Sense channel: if idle → transmit with probability <strong>p</strong>, defer to next slot with probability <strong>(1-p)</strong>.</li>
              <li>If busy → wait for next slot, repeat algorithm.</li>
              <li>Balances between 1-persistent (greedy) and non-persistent (conservative).</li>
              <li>Used by: IEEE 802.11 (Wi-Fi) uses a variant.</li>
            </ul>
          </li>
        </ol>
        <h4>CSMA/CD (Collision Detection) — Ethernet</h4>
        <ol class="wiki-ordered-list">
          <li>Sense channel: if idle → begin transmitting.</li>
          <li>While transmitting, <strong>monitor the signal on the wire</strong>.</li>
          <li>If the detected signal differs from what was sent → <strong>collision detected!</strong></li>
          <li>Immediately stop transmitting and send a <strong>48-bit jam signal</strong> to ensure all stations detect the collision.</li>
          <li>Wait a random backoff time using <strong>Binary Exponential Backoff (BEB)</strong>:
            <ul class="wiki-bullet-list">
              <li>After i-th collision (i = 1, 2, ..., 10), choose random k from [0, 2<sup>min(i,10)</sup> - 1].</li>
              <li>Wait k × slot time (512 bit times for 10 Mbps Ethernet).</li>
              <li>After 16 collisions, give up and report failure to network layer.</li>
            </ul>
          </li>
          <li><strong>Minimum frame size:</strong> The frame must be long enough that the sender is still transmitting when a collision at the far end of the network propagates back. For 10 Mbps Ethernet: min frame = 64 bytes = 2 × propagation delay × data rate.</li>
        </ol>
        <h4>CSMA/CA (Collision Avoidance) — Wi-Fi</h4>
        <ol class="wiki-ordered-list">
          <li>Cannot detect collisions during wireless transmission (half-duplex radio, near-far problem).</li>
          <li>Instead, <strong>avoids collisions</strong> using:
            <ul class="wiki-bullet-list">
              <li><strong>Inter-Frame Spacing (IFS):</strong> Wait DIFS (Distributed IFS) before sensing.</li>
              <li><strong>Random Backoff:</strong> Choose random backoff counter, decrement only when channel is idle.</li>
              <li><strong>RTS/CTS (optional):</strong> Sender sends Request to Send → receiver replies Clear to Send → reserves the channel.</li>
              <li><strong>ACK:</strong> Receiver sends ACK for every successfully received frame.</li>
            </ul>
          </li>
        </ol>`,
      diagram: `
CSMA/CD (Ethernet) Timeline:

Station A        |████████ Frame A ████████|
                 ▲ Starts transmitting

Station B              |██|JAM|  (collision detected!)
                       ▲ B doesn't hear A yet
                         (propagation delay)
                              ▼
                         Both stop, send jam,
                         wait random backoff

CSMA/CA (Wi-Fi) Timeline:

         DIFS    Backoff  DATA         SIFS  ACK
Sender:  |═══|░░░░|██████████████████|      |
Receiver:                              |═══|████|
                                       Wait  Reply

RTS/CTS Variant:
         DIFS  RTS    SIFS  CTS    SIFS  DATA         SIFS  ACK
Sender:  |═══|████|        |      |═══|██████████████|      |
Receiver:          |═══|████|                          |═══|████|`,
      technicalDetails: `
        <h4>Comparison of CSMA Variants</h4>
        <table class="wiki-table">
          <thead><tr><th>Feature</th><th>1-Persistent</th><th>Non-Persistent</th><th>p-Persistent</th><th>CSMA/CD</th><th>CSMA/CA</th></tr></thead>
          <tbody>
            <tr><td>Carrier Sense</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
            <tr><td>If Channel Busy</td><td>Wait & grab</td><td>Random wait</td><td>Wait for slot</td><td>Wait & grab</td><td>Backoff timer</td></tr>
            <tr><td>Collision Detection</td><td>No</td><td>No</td><td>No</td><td>Yes (during TX)</td><td>No (impossible in wireless)</td></tr>
            <tr><td>Collision Recovery</td><td>Timeout/retransmit</td><td>Timeout</td><td>Timeout</td><td>Jam + BEB</td><td>ACK-based</td></tr>
            <tr><td>Used In</td><td>—</td><td>—</td><td>—</td><td>Ethernet 802.3</td><td>Wi-Fi 802.11</td></tr>
            <tr><td>Throughput</td><td>Medium</td><td>High at low load</td><td>Tunable</td><td>Very High (~90%)</td><td>Good (~60-70%)</td></tr>
          </tbody>
        </table>
        <h4>Binary Exponential Backoff (BEB)</h4>
        <p>After the i-th collision (i = 1, 2, ..., 16):</p>
        <ul class="wiki-bullet-list">
          <li>Choose random integer k uniformly from [0, 2<sup>min(i,10)</sup> - 1].</li>
          <li>Wait k × 51.2 μs (slot time for 10 Mbps Ethernet).</li>
          <li>Maximum backoff window = 2<sup>10</sup> = 1024 slot times.</li>
          <li>After 16 unsuccessful attempts, abort and report failure.</li>
        </ul>`,
      workedExample: `<p><strong>Problem:</strong> Two Ethernet stations collide. Calculate the range of backoff times after the 1st, 2nd, and 3rd collision for 10 Mbps Ethernet (slot time = 51.2 μs).</p>
        <table class="wiki-table">
          <thead><tr><th>Collision #</th><th>i</th><th>k range</th><th>Backoff range</th></tr></thead>
          <tbody>
            <tr><td>1st</td><td>1</td><td>[0, 1]</td><td>0 or 51.2 μs</td></tr>
            <tr><td>2nd</td><td>2</td><td>[0, 1, 2, 3]</td><td>0 to 153.6 μs</td></tr>
            <tr><td>3rd</td><td>3</td><td>[0, 1, ..., 7]</td><td>0 to 358.4 μs</td></tr>
          </tbody>
        </table>
        <p><strong>Minimum Ethernet frame size:</strong></p>
        <p>For 10 Mbps Ethernet with max cable length 2.5 km (max RTT ≈ 51.2 μs):</p>
        <p style="text-align:center">$\\text{Min frame} = 10 \\times 10^6 \\times 51.2 \\times 10^{-6} = 512 \\text{ bits} = 64 \\text{ bytes}$</p>`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Protocol</th><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>CSMA/CD</td><td>Up to 90%+ throughput, low delay at moderate load</td><td>Cannot work on wireless (can't detect own collisions)</td></tr>
            <tr><td>CSMA/CA</td><td>Works on wireless, avoids hidden terminal problem with RTS/CTS</td><td>Lower throughput than CSMA/CD due to overhead</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Ethernet (IEEE 802.3) — CSMA/CD", "Wi-Fi (IEEE 802.11) — CSMA/CA", "CAN bus (automotive) — CSMA/CR (Collision Resolution)", "HomeRF, Bluetooth (variants)"],
      commonMistakes: "Thinking CSMA/CD is used in Wi-Fi. Wireless stations cannot detect collisions during transmission because the transmitted signal overwhelms any incoming signal at the antenna. Wi-Fi uses CSMA/CA (Collision Avoidance) instead.",
      compareWith: { title: "CSMA/CD vs CSMA/CA", note: "CSMA/CD detects collisions during transmission (wired only). CSMA/CA avoids collisions using backoff and optional RTS/CTS (wireless)." },
      practice: {
        question: "Why can't CSMA/CD (Collision Detection) be used in wireless networks?",
        choices: [
          "Wireless channels are too fast",
          "The transmitted signal drowns out incoming signals, making collision detection impossible",
          "Wireless frames are too short",
          "FCC regulations prohibit it"
        ],
        correctIndex: 1,
        explanation: "In wireless, the transmitted signal power at the antenna is millions of times stronger than any received signal. The station cannot simultaneously transmit and listen for collisions—this is the 'near-far' problem."
      },
      references: [
        { cite: "Tanenbaum & Wetherall, Computer Networks, 6th Ed., Ch. 4.2: CSMA Protocols", url: "https://www.pearson.com/en-us/subject-catalog/p/computer-networks/P200000003193" },
        { cite: "IEEE 802.3: Ethernet CSMA/CD Standard", url: "https://standards.ieee.org/ieee/802.3/10422/" },
        { cite: "Forouzan, Data Communications & Networking, 6th Ed., Ch. 12.2: CSMA, CSMA/CD, CSMA/CA", url: "https://www.mheducation.com/" }
      ]
    },
    prevTopicId: "aloha",
    nextTopicId: "collision-free-protocols"
  },

  "collision-free-protocols": {
    id: "collision-free-protocols",
    title: "Collision-Free Protocols",
    unit: "Unit II: Data Link Layer & Reliable Transfer",
    unitId: "unit2",
    level: "Level 2 — Standard Topic",
    category: "datalink",
    difficulty: "Core",
    readingTime: "7 min read",
    standard: "Tanenbaum Ch. 4.2",
    oneLiner: "Collision-free protocols guarantee that only one station transmits at a time through reservation or priority arbitration—eliminating collisions entirely.",
    quickAnswer: "Unlike ALOHA and CSMA which allow collisions and recover, collision-free protocols (Bitmap, Binary Countdown, Token Passing) use reservation slots or token circulation to ensure zero collisions.",
    whyItMatters: "For real-time and industrial applications where collision-induced delays are unacceptable, collision-free protocols provide deterministic, bounded access times.",
    infobox: {
      layer: "Layer 2 (Data Link — MAC Sublayer)",
      standard: "Tanenbaum Ch. 4.2, IEEE 802.4 (Token Bus), IEEE 802.5 (Token Ring)",
      type: "Contention-Free Multiple Access",
      keyFormula: "\\text{Bitmap overhead} = N \\text{ bits per cycle for } N \\text{ stations}",
      prerequisites: ["channel-allocation", "aloha", "csma-protocols"],
      relatedConcepts: ["ethernet", "channel-allocation"],
      compareWith: ["csma-protocols"],
      primaryUses: ["Token Ring (IEEE 802.5)", "Token Bus (IEEE 802.4)", "Industrial CAN/PROFIBUS", "Deterministic real-time networks"]
    },
    sections: {
      overview: `<p>While contention-based protocols (ALOHA, CSMA) are simple, they cannot guarantee bounded access delay because collisions introduce unpredictable delays. <strong>Collision-free protocols</strong> solve this by ensuring that at any given time, exactly one station has the right to transmit.</p>
        <p>Tanenbaum describes three main collision-free approaches:</p>
        <ol class="wiki-ordered-list">
          <li><strong>Bitmap Protocol (Reservation-Based)</strong></li>
          <li><strong>Binary Countdown (Priority-Based)</strong></li>
          <li><strong>Token Passing (Turn-Based)</strong></li>
        </ol>`,
      howItWorks: `
        <h4>1. Bitmap Protocol (Basic Reservation)</h4>
        <ol class="wiki-ordered-list">
          <li>There are N stations numbered 0 to N-1.</li>
          <li>Each cycle begins with a <strong>reservation period</strong> of N contention slots, one per station.</li>
          <li>In slot j, station j broadcasts a <strong>1-bit</strong> if it has a frame to send, <strong>0</strong> otherwise.</li>
          <li>After the N-slot reservation phase, all stations know who wants to transmit.</li>
          <li>The stations with reservations transmit <strong>in numerical order</strong>, one after another.</li>
          <li><strong>No collisions possible</strong> because each station knows exactly when it's its turn.</li>
        </ol>
        <h4>2. Binary Countdown Protocol</h4>
        <ol class="wiki-ordered-list">
          <li>Each station has a unique binary address (e.g., 4 bits for 16 stations).</li>
          <li>Stations with frames to send <strong>broadcast their addresses bit-by-bit</strong> starting from the most significant bit (MSB).</li>
          <li>At each bit position, if a station sees a '1' on the channel but its own address bit is '0', it <strong>drops out</strong> of contention.</li>
          <li>The station with the <strong>highest address always wins</strong> (higher priority).</li>
          <li>After the winner transmits its frame, a new round begins.</li>
          <li><strong>Overhead:</strong> Only log₂N bits per contention round (much better than N bits for Bitmap).</li>
        </ol>
        <h4>3. Token Passing</h4>
        <ol class="wiki-ordered-list">
          <li>A special <strong>token frame</strong> circulates among stations in a logical ring.</li>
          <li>Only the station <strong>holding the token</strong> may transmit data.</li>
          <li>After transmitting (or if it has nothing to send), the station <strong>passes the token</strong> to the next station.</li>
          <li><strong>Token Ring (IEEE 802.5):</strong> Physical ring topology; token circulates around the ring.</li>
          <li><strong>Token Bus (IEEE 802.4):</strong> Physical bus topology; logical ring established in software.</li>
        </ol>`,
      diagram: `
BITMAP PROTOCOL (N=4 stations):

Reservation Phase (4 slots)    Data Phase
┌───┬───┬───┬───┐              ┌──────────┬──────────┐
│ 1 │ 0 │ 1 │ 0 │              │ Station 0│ Station 2│
│St0│St1│St2│St3│              │  Frame   │  Frame   │
└───┴───┴───┴───┘              └──────────┴──────────┘
 St0 wants  St2 wants           Transmit in order

BINARY COUNTDOWN (4-bit addresses):
Station 5 = 0101       Station 9 = 1001       Station 12 = 1100

Round:  Bit3  Bit2  Bit1  Bit0
St 5:    0     1     0     1  → drops at bit 3 (sees 1, has 0)
St 9:    1     0     0     1  → drops at bit 2 (sees 1, has 0)
St 12:   1     1     0     0  → WINS! (highest address)

TOKEN PASSING:
        ┌──→ Station A ──→ Station B ──┐
        │                              │
        │    TOKEN circulates          ▼
        │                              │
        └── Station D ←── Station C ◄──┘
        
Only the station holding the token can transmit.`,
      technicalDetails: `
        <h4>Protocol Comparison</h4>
        <table class="wiki-table">
          <thead><tr><th>Feature</th><th>Bitmap</th><th>Binary Countdown</th><th>Token Passing</th></tr></thead>
          <tbody>
            <tr><td>Overhead per cycle</td><td>N bits (reservation slots)</td><td>log₂N bits</td><td>Token frame (≈ 3 bytes)</td></tr>
            <tr><td>Fairness</td><td>Fair (all stations get equal chance)</td><td>Unfair (higher address = higher priority)</td><td>Fair (round-robin)</td></tr>
            <tr><td>Bounded Delay</td><td>Yes</td><td>Yes</td><td>Yes (max = N × token holding time)</td></tr>
            <tr><td>Best For</td><td>Moderate N, high traffic</td><td>Small N, priority-based systems</td><td>Real-time, deterministic access</td></tr>
            <tr><td>Efficiency at Low Load</td><td>Poor (N-bit overhead even if 1 station active)</td><td>Better (log₂N bits)</td><td>Moderate (token must still circulate)</td></tr>
            <tr><td>Efficiency at High Load</td><td>Excellent (every cycle carries data)</td><td>Excellent</td><td>Excellent</td></tr>
          </tbody>
        </table>`,
      workedExample: `<p><strong>Problem:</strong> A network has 64 stations using the Bitmap protocol. Frame size = 1000 bits. Calculate the overhead per cycle if all 64 stations have frames to send.</p>
        <p><strong>Solution:</strong></p>
        <ul class="wiki-bullet-list">
          <li>Reservation overhead = N = 64 bits.</li>
          <li>Data transmitted = 64 × 1000 = 64,000 bits.</li>
          <li>Overhead ratio = 64 / (64 + 64,000) = 64/64,064 ≈ <strong>0.1%</strong> → excellent!</li>
        </ul>
        <p><strong>But if only 1 station has data:</strong></p>
        <ul class="wiki-bullet-list">
          <li>Data = 1000 bits, overhead = 64 bits.</li>
          <li>Overhead ratio = 64/1064 ≈ <strong>6%</strong> → acceptable but worse.</li>
        </ul>
        <p><strong>Binary Countdown alternative:</strong> Only log₂(64) = 6 bits overhead per round → 6/1006 ≈ 0.6%.</p>`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Zero collisions → predictable, bounded delays</td><td>Higher protocol complexity than CSMA</td></tr>
            <tr><td>Excellent throughput at high load</td><td>Token loss requires recovery protocol</td></tr>
            <tr><td>Fair access (Bitmap, Token) or priority-based (Binary Countdown)</td><td>Overhead at low load (wasted reservation/token time)</td></tr>
            <tr><td>Suitable for real-time industrial systems</td><td>Largely superseded by switched Ethernet in modern LANs</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["IEEE 802.5 Token Ring (historical)", "IEEE 802.4 Token Bus (manufacturing)", "PROFIBUS/PROFINET (industrial automation)", "FDDI fiber networks", "CAN bus (automotive — uses Binary Countdown variant)"],
      commonMistakes: "Thinking collision-free protocols are always better than CSMA. At low loads, CSMA has lower delay because a station can transmit immediately. Collision-free protocols force stations to wait for their turn even if the channel is idle.",
      compareWith: { title: "Collision-Free vs CSMA Protocols", note: "CSMA: simple, low delay at light load, but unpredictable delay at heavy load. Collision-free: deterministic delay, excellent under heavy load, but unnecessary overhead at light load." },
      practice: {
        question: "In the Binary Countdown protocol, which station wins the contention?",
        choices: ["The station with the lowest address", "The station with the highest address", "A randomly selected station", "The station that transmitted first"],
        correctIndex: 1,
        explanation: "Binary Countdown uses bit-by-bit arbitration from MSB to LSB. Stations with a '0' bit drop out when they see a '1' on the channel, so the station with the highest binary address always wins contention."
      },
      references: [
        { cite: "Tanenbaum & Wetherall, Computer Networks, 6th Ed., Ch. 4.2: Collision-Free Protocols", url: "https://www.pearson.com/en-us/subject-catalog/p/computer-networks/P200000003193" },
        { cite: "Forouzan, Data Communications & Networking, 6th Ed., Ch. 12.3: Controlled Access", url: "https://www.mheducation.com/" }
      ]
    },
    prevTopicId: "csma-protocols",
    nextTopicId: "wireless-lan-protocols"
  },

  "wireless-lan-protocols": {
    id: "wireless-lan-protocols",
    title: "Wireless LAN Protocols & IEEE 802.11",
    unit: "Unit II: Data Link Layer & Reliable Transfer",
    unitId: "unit2",
    level: "Level 2 — Standard Topic",
    category: "datalink",
    difficulty: "Core",
    readingTime: "9 min read",
    standard: "IEEE 802.11 (Wi-Fi)",
    oneLiner: "Wireless LANs face unique challenges—hidden terminals, exposed terminals, and multipath fading—that require specialized MAC protocols like CSMA/CA with RTS/CTS.",
    quickAnswer: "IEEE 802.11 (Wi-Fi) uses CSMA/CA with optional RTS/CTS handshake to handle the hidden terminal problem, plus MAC-level ACKs because wireless channels are inherently unreliable.",
    whyItMatters: "Wi-Fi is the dominant wireless LAN technology with billions of devices worldwide. Understanding its MAC layer explains why Wi-Fi performance differs dramatically from wired Ethernet.",
    infobox: {
      layer: "Layer 2 (Data Link — MAC Sublayer)",
      standard: "IEEE 802.11a/b/g/n/ac/ax/be (Wi-Fi 1-7)",
      type: "Wireless LAN MAC Protocol",
      keyFormula: "\\text{NAV (Network Allocation Vector)} = \\text{Duration field in RTS/CTS}",
      prerequisites: ["csma-protocols", "channel-allocation"],
      relatedConcepts: ["wifi-mac-sublayer", "csma-protocols", "ethernet"],
      compareWith: ["ethernet"],
      primaryUses: ["Home/office Wi-Fi", "Enterprise WLANs", "Public hotspots", "IoT wireless connectivity"]
    },
    sections: {
      overview: `<p>Wireless LANs face challenges that don't exist in wired networks:</p>
        <ul class="wiki-bullet-list">
          <li><strong>Hidden Terminal Problem:</strong> Station A can hear the AP, Station C can hear the AP, but A and C cannot hear each other. Both may transmit simultaneously, causing collision at the AP.</li>
          <li><strong>Exposed Terminal Problem:</strong> Station B is transmitting to A. Station C hears B's transmission and incorrectly defers, even though C could safely transmit to D (in the opposite direction).</li>
          <li><strong>Signal Fading & Multipath:</strong> Wireless signals reflect, refract, and attenuate unpredictably.</li>
          <li><strong>No Collision Detection:</strong> A wireless station cannot detect collisions during transmission (near-far problem).</li>
        </ul>
        <p>These challenges make wired CSMA/CD impossible for wireless. Instead, <strong>IEEE 802.11</strong> uses <strong>CSMA/CA (Collision Avoidance)</strong> with several additional mechanisms.</p>`,
      howItWorks: `
        <h4>IEEE 802.11 Architecture</h4>
        <ul class="wiki-bullet-list">
          <li><strong>Infrastructure Mode:</strong> Stations (STAs) communicate via an Access Point (AP). The AP bridges the wireless and wired networks.</li>
          <li><strong>Ad-Hoc Mode (IBSS):</strong> Stations communicate directly peer-to-peer without an AP.</li>
          <li><strong>BSS (Basic Service Set):</strong> The coverage area of a single AP.</li>
          <li><strong>ESS (Extended Service Set):</strong> Multiple BSSs connected via a Distribution System (DS), enabling roaming.</li>
        </ul>
        <h4>DCF (Distributed Coordination Function) — CSMA/CA</h4>
        <ol class="wiki-ordered-list">
          <li><strong>Sense channel:</strong> Wait for DIFS (Distributed Inter-Frame Space) silence period.</li>
          <li><strong>If idle:</strong> Start random backoff counter (slots = random[0, CW]).</li>
          <li><strong>Decrement counter</strong> only while channel remains idle. Freeze if channel becomes busy.</li>
          <li><strong>When counter reaches 0:</strong> Transmit the frame.</li>
          <li><strong>Receiver:</strong> If frame received correctly, wait SIFS (Short IFS), then send ACK.</li>
          <li><strong>If no ACK:</strong> Double the contention window (CW) and try again.</li>
        </ol>
        <h4>RTS/CTS (Request to Send / Clear to Send)</h4>
        <ol class="wiki-ordered-list">
          <li>Sender transmits a short <strong>RTS frame</strong> containing the duration of the upcoming data transfer.</li>
          <li>If the receiver hears the RTS, it replies with a <strong>CTS frame</strong> (also containing duration).</li>
          <li>All stations hearing RTS or CTS set their <strong>NAV (Network Allocation Vector)</strong> timer and defer for that duration.</li>
          <li>This <strong>solves the hidden terminal problem</strong>: even if station C can't hear the sender, it hears the CTS from the AP and defers.</li>
        </ol>
        <h4>Inter-Frame Spacing (IFS) Priority</h4>
        <table class="wiki-table">
          <thead><tr><th>IFS Type</th><th>Duration</th><th>Used For</th><th>Priority</th></tr></thead>
          <tbody>
            <tr><td>SIFS (Short)</td><td>Shortest</td><td>ACK, CTS, next fragment</td><td>Highest</td></tr>
            <tr><td>PIFS (PCF)</td><td>Medium</td><td>PCF polling by AP</td><td>Medium</td></tr>
            <tr><td>DIFS (Distributed)</td><td>Longest</td><td>New data frames</td><td>Lowest</td></tr>
          </tbody>
        </table>`,
      diagram: `
HIDDEN TERMINAL PROBLEM:

     ┌──── Range of A ────┐
     │                    │
  Station A ──── AP ──── Station C
                 │
     └──── Range of C ────┘
     
  A cannot hear C. Both may transmit to AP simultaneously → COLLISION!

RTS/CTS SOLUTION:

Sender (A):  |DIFS|Backoff|  RTS  |          |SIFS|   DATA   |     |
AP:          |                    |SIFS| CTS  |          |SIFS| ACK  |
Station C:   |    (hears CTS) ──→ NAV Timer ─────── DEFER ──────────|

C defers because it heard the CTS from the AP, even though it can't hear A.`,
      technicalDetails: `
        <h4>IEEE 802.11 Protocol Stack</h4>
        <table class="wiki-table">
          <thead><tr><th>Layer</th><th>Sublayer</th><th>Function</th></tr></thead>
          <tbody>
            <tr><td rowspan="2">Data Link</td><td>LLC (Logical Link Control)</td><td>Interface to network layer, optional flow/error control</td></tr>
            <tr><td>MAC (Medium Access Control)</td><td>CSMA/CA, RTS/CTS, fragmentation, encryption</td></tr>
            <tr><td>Physical</td><td>PHY (PLCP + PMD)</td><td>OFDM/DSSS modulation, channel coding, antenna</td></tr>
          </tbody>
        </table>
        <h4>802.11 Frame Format (MAC Header)</h4>
        <table class="wiki-table">
          <thead><tr><th>Field</th><th>Size</th><th>Purpose</th></tr></thead>
          <tbody>
            <tr><td>Frame Control</td><td>2 bytes</td><td>Protocol version, type, subtype, flags</td></tr>
            <tr><td>Duration/ID</td><td>2 bytes</td><td>NAV value or association ID</td></tr>
            <tr><td>Address 1</td><td>6 bytes</td><td>Receiver address</td></tr>
            <tr><td>Address 2</td><td>6 bytes</td><td>Transmitter address</td></tr>
            <tr><td>Address 3</td><td>6 bytes</td><td>Filtering (BSSID or final destination)</td></tr>
            <tr><td>Sequence Control</td><td>2 bytes</td><td>Fragment and sequence numbers</td></tr>
            <tr><td>Address 4</td><td>6 bytes</td><td>Used only in mesh/WDS</td></tr>
            <tr><td>Payload</td><td>0-2304 bytes</td><td>Data (larger than Ethernet's 1500)</td></tr>
            <tr><td>FCS</td><td>4 bytes</td><td>CRC-32 error detection</td></tr>
          </tbody>
        </table>`,
      workedExample: `<p><strong>Scenario:</strong> Three stations A, B, C share a Wi-Fi channel. A and C are hidden from each other but both can reach the AP. A wants to send a 1500-byte frame.</p>
        <p><strong>Without RTS/CTS:</strong></p>
        <ol class="wiki-ordered-list">
          <li>A senses channel idle (can't hear C) → transmits 1500-byte frame.</li>
          <li>C also senses channel idle (can't hear A) → transmits simultaneously.</li>
          <li>Both frames collide at AP → both destroyed → 1500 bytes wasted by each.</li>
        </ol>
        <p><strong>With RTS/CTS:</strong></p>
        <ol class="wiki-ordered-list">
          <li>A sends tiny RTS (20 bytes) to AP.</li>
          <li>AP broadcasts CTS (14 bytes) — C hears this and defers.</li>
          <li>A safely sends 1500-byte frame without collision.</li>
          <li>Even if RTS collides, only 20 bytes are wasted (not 1500).</li>
        </ol>`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Wireless mobility & convenience</td><td>Lower throughput than wired Ethernet</td></tr>
            <tr><td>RTS/CTS solves hidden terminal problem</td><td>RTS/CTS overhead reduces throughput for small frames</td></tr>
            <tr><td>ACK-based reliability</td><td>Exposed terminal problem not fully solved</td></tr>
            <tr><td>Backward compatible across Wi-Fi generations</td><td>Shared medium → throughput drops with more users</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["IEEE 802.11ax (Wi-Fi 6/6E) in homes and offices", "Enterprise campus WLANs", "Public Wi-Fi hotspots", "IoT smart devices", "Industrial wireless (802.11ah)"],
      commonMistakes: "Thinking RTS/CTS is always used in Wi-Fi. RTS/CTS is optional and typically only enabled for frames above a configurable size threshold (RTS Threshold, default ~2347 bytes). For small frames, the overhead of RTS/CTS exceeds the potential collision cost.",
      compareWith: { title: "Wi-Fi CSMA/CA vs Ethernet CSMA/CD", note: "Ethernet detects collisions during transmission. Wi-Fi avoids collisions preemptively. Wi-Fi has 3 addresses (vs Ethernet's 2) and MAC-level ACKs." },
      practice: {
        question: "What is the purpose of the NAV (Network Allocation Vector) in IEEE 802.11?",
        choices: [
          "To store the destination MAC address",
          "To indicate how long a station must defer from transmitting",
          "To calculate the CRC checksum",
          "To manage power saving mode"
        ],
        correctIndex: 1,
        explanation: "The NAV is a timer set by stations that hear RTS/CTS frames. It indicates the expected duration of the current transmission, causing other stations to defer and avoid collisions for that period."
      },
      references: [
        { cite: "Tanenbaum & Wetherall, Computer Networks, 6th Ed., Ch. 4.4: Wireless LANs", url: "https://www.pearson.com/en-us/subject-catalog/p/computer-networks/P200000003193" },
        { cite: "IEEE 802.11: Wireless LAN Medium Access Control", url: "https://standards.ieee.org/ieee/802.11/7028/" },
        { cite: "Forouzan, Data Communications & Networking, 6th Ed., Ch. 15: Wireless LANs", url: "https://www.mheducation.com/" }
      ]
    },
    prevTopicId: "collision-free-protocols",
    nextTopicId: "wifi-mac-sublayer"
  },

  "wifi-mac-sublayer": {
    id: "wifi-mac-sublayer",
    title: "IEEE 802.11 MAC Sublayer Protocol",
    unit: "Unit II: Data Link Layer & Reliable Transfer",
    unitId: "unit2",
    level: "Level 2 — Standard Topic",
    category: "datalink",
    difficulty: "Advanced",
    readingTime: "8 min read",
    standard: "IEEE 802.11-2020",
    oneLiner: "The 802.11 MAC sublayer manages channel access through DCF (contention-based CSMA/CA) and PCF (polling-based), with QoS extensions in 802.11e (EDCA/HCCA) for multimedia traffic.",
    quickAnswer: "The Wi-Fi MAC sublayer uses DCF (Distributed Coordination Function) as its primary access method with CSMA/CA, and optionally PCF (Point Coordination Function) for polling. Modern Wi-Fi 6 adds OFDMA and TWT for efficiency.",
    whyItMatters: "The MAC sublayer determines Wi-Fi's real-world performance—understanding DCF/EDCA explains why video calls stutter, why throughput drops with distance, and how QoS prioritization works.",
    infobox: {
      layer: "Layer 2 (Data Link — MAC Sublayer)",
      standard: "IEEE 802.11-2020, 802.11e (QoS), 802.11ax (Wi-Fi 6)",
      type: "Wireless MAC Protocol",
      keyFormula: "\\text{CW}_{\\text{new}} = \\min(2 \\times \\text{CW}_{\\text{old}} + 1, \\text{CW}_{\\text{max}})",
      prerequisites: ["wireless-lan-protocols", "csma-protocols"],
      relatedConcepts: ["wireless-lan-protocols", "ethernet", "csma-protocols"],
      compareWith: ["ethernet"],
      primaryUses: ["Wi-Fi 1–7 (802.11a/b/g/n/ac/ax/be)", "Mesh networks (802.11s)", "Vehicle-to-Vehicle (802.11p/bd)"]
    },
    sections: {
      overview: `<p>The <strong>IEEE 802.11 MAC sublayer</strong> sits between the Logical Link Control (LLC) sublayer above and the Physical (PHY) layer below. It is responsible for:</p>
        <ul class="wiki-bullet-list">
          <li><strong>Channel access control</strong> (who transmits when)</li>
          <li><strong>Frame formatting</strong> (30-byte header with up to 4 MAC addresses)</li>
          <li><strong>Fragmentation & reassembly</strong> of large frames</li>
          <li><strong>Encryption</strong> (WEP → WPA → WPA2/3)</li>
          <li><strong>Power management</strong> (sleep/wake scheduling)</li>
          <li><strong>Association & authentication</strong> with the AP</li>
        </ul>`,
      howItWorks: `
        <h4>DCF (Distributed Coordination Function)</h4>
        <p>The default, mandatory access mechanism based on <strong>CSMA/CA</strong>:</p>
        <ol class="wiki-ordered-list">
          <li>Station waits for channel to be idle for DIFS duration.</li>
          <li>Generates random backoff = random(0, CW) × slot_time.</li>
          <li>Backoff counter decrements only when channel is idle; freezes when busy.</li>
          <li>When counter = 0, transmit the frame.</li>
          <li>Wait for SIFS + ACK. If no ACK → double CW (up to CW<sub>max</sub>) and retry.</li>
          <li>If ACK received → reset CW to CW<sub>min</sub>.</li>
        </ol>
        <h4>PCF (Point Coordination Function)</h4>
        <p>An <strong>optional polling-based</strong> access mechanism managed by the AP:</p>
        <ul class="wiki-bullet-list">
          <li>AP acts as a <strong>Point Coordinator (PC)</strong>.</li>
          <li>Alternates between <strong>contention-free period (CFP)</strong> and <strong>contention period (CP)</strong>.</li>
          <li>During CFP: AP polls each station in turn using PIFS (higher priority than DIFS).</li>
          <li>During CP: Normal DCF (CSMA/CA) operation.</li>
          <li>Rarely implemented in practice.</li>
        </ul>
        <h4>EDCA (Enhanced Distributed Channel Access) — 802.11e QoS</h4>
        <p>Extends DCF with <strong>four traffic categories</strong> for QoS:</p>
        <table class="wiki-table">
          <thead><tr><th>Access Category</th><th>Priority</th><th>AIFS</th><th>CW<sub>min</sub></th><th>CW<sub>max</sub></th><th>Example Traffic</th></tr></thead>
          <tbody>
            <tr><td>AC_VO (Voice)</td><td>Highest</td><td>SIFS + 2 slots</td><td>3</td><td>7</td><td>VoIP, video calls</td></tr>
            <tr><td>AC_VI (Video)</td><td>High</td><td>SIFS + 2 slots</td><td>7</td><td>15</td><td>Streaming video</td></tr>
            <tr><td>AC_BE (Best Effort)</td><td>Medium</td><td>SIFS + 3 slots</td><td>15</td><td>1023</td><td>Web browsing, email</td></tr>
            <tr><td>AC_BK (Background)</td><td>Lowest</td><td>SIFS + 7 slots</td><td>15</td><td>1023</td><td>File downloads, updates</td></tr>
          </tbody>
        </table>
        <h4>Key 802.11 MAC Operations</h4>
        <ul class="wiki-bullet-list">
          <li><strong>Scanning:</strong> Active (send Probe Request) or Passive (listen for Beacons).</li>
          <li><strong>Authentication:</strong> Open System or Shared Key (WPA2/3 uses 4-way handshake).</li>
          <li><strong>Association:</strong> Station registers with AP, receives Association ID (AID).</li>
          <li><strong>Fragmentation:</strong> Large frames split into smaller fragments, each individually ACKed.</li>
          <li><strong>Power Save:</strong> Station sleeps; AP buffers frames; station wakes periodically to check beacon's TIM (Traffic Indication Map).</li>
        </ul>`,
      diagram: `
802.11 MAC Frame Format (30 bytes header):

┌──────────┬──────────┬──────────┬──────────┬──────────┬──────────┬──────────┬────────────┬──────┐
│ Frame    │Duration/ │Address 1 │Address 2 │Address 3 │ Seq      │Address 4 │   Frame    │ FCS  │
│ Control  │  ID      │ (RA)     │ (TA)     │ (DA/SA)  │ Control  │ (opt)    │   Body     │      │
│ 2 bytes  │ 2 bytes  │ 6 bytes  │ 6 bytes  │ 6 bytes  │ 2 bytes  │ 6 bytes  │ 0-2304 B   │4 bytes│
└──────────┴──────────┴──────────┴──────────┴──────────┴──────────┴──────────┴────────────┴──────┘

Four Address Fields (vs Ethernet's 2):
┌─────────────────────────────┬──────────┬──────────┬──────────┬──────────┐
│ Scenario                    │ Addr 1   │ Addr 2   │ Addr 3   │ Addr 4   │
├─────────────────────────────┼──────────┼──────────┼──────────┼──────────┤
│ STA → AP (To DS)            │ BSSID(AP)│ Source   │ Final Dst│ —        │
│ AP → STA (From DS)          │ Dest     │ BSSID(AP)│ Source   │ —        │
│ STA → STA (Ad-hoc)          │ Dest     │ Source   │ BSSID    │ —        │
│ AP → AP (WDS/Mesh)          │ Rx AP    │ Tx AP    │ Final Dst│ Orig Src │
└─────────────────────────────┴──────────┴──────────┴──────────┴──────────┘`,
      technicalDetails: `
        <h4>Ethernet (802.3) vs Wi-Fi (802.11) MAC Comparison</h4>
        <table class="wiki-table">
          <thead><tr><th>Feature</th><th>Ethernet (802.3)</th><th>Wi-Fi (802.11)</th></tr></thead>
          <tbody>
            <tr><td>Access Method</td><td>CSMA/CD</td><td>CSMA/CA</td></tr>
            <tr><td>Collision Handling</td><td>Detect during TX</td><td>Avoid before TX</td></tr>
            <tr><td>MAC Addresses</td><td>2 (Src + Dst)</td><td>3 or 4</td></tr>
            <tr><td>ACK at MAC layer</td><td>No</td><td>Yes (mandatory)</td></tr>
            <tr><td>Max Payload</td><td>1500 bytes</td><td>2304 bytes</td></tr>
            <tr><td>Fragmentation</td><td>No (done at IP layer)</td><td>Yes (MAC-level)</td></tr>
            <tr><td>Encryption</td><td>None at MAC</td><td>WPA2/WPA3 at MAC</td></tr>
            <tr><td>Full-Duplex</td><td>Yes (switched)</td><td>No (half-duplex radio)</td></tr>
            <tr><td>Min Frame Size</td><td>64 bytes</td><td>No minimum</td></tr>
          </tbody>
        </table>`,
      workedExample: `<p><strong>Scenario:</strong> A Wi-Fi station sends a frame using DCF. CW<sub>min</sub>=15, slot time=9μs, SIFS=16μs, DIFS=34μs.</p>
        <ol class="wiki-ordered-list">
          <li>Station waits DIFS = 34μs after channel becomes idle.</li>
          <li>Random backoff = random(0, 15) × 9μs. Say random picks 7 → backoff = 63μs.</li>
          <li>Channel stays idle → counter decrements to 0 → transmit frame.</li>
          <li>Frame transmission time = 500μs (for a 1000-byte frame at 16 Mbps).</li>
          <li>Receiver waits SIFS = 16μs → sends ACK (takes ~24μs).</li>
          <li><strong>Total exchange time = 34 + 63 + 500 + 16 + 24 = 637μs.</strong></li>
        </ol>
        <p>If a collision occurs (no ACK received), CW doubles: CW = min(2×15+1, 1023) = 31. New backoff from [0,31].</p>`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Wireless mobility, no cabling</td><td>Half-duplex limits throughput</td></tr>
            <tr><td>EDCA provides QoS for multimedia</td><td>Shared medium → throughput per user drops</td></tr>
            <tr><td>MAC-level fragmentation handles diverse PHY rates</td><td>High overhead (30-byte header + ACK + IFS gaps)</td></tr>
            <tr><td>Power save mode extends battery life</td><td>Security complexity (WPA2/3 handshake)</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["All Wi-Fi certified devices worldwide", "Enterprise WPA2/3-Enterprise networks", "802.11s mesh networks", "802.11p/bd vehicular communication (V2X)", "802.11ah IoT (sub-1GHz)"],
      commonMistakes: "Thinking Wi-Fi frames have only 2 MAC addresses like Ethernet. Wi-Fi frames can have up to 4 addresses: receiver, transmitter, destination, and source—because the AP acts as a relay between wireless and wired segments.",
      compareWith: { title: "Ethernet MAC vs 802.11 MAC", note: "Ethernet: 2 addresses, CSMA/CD, no ACK, full-duplex. Wi-Fi: 3-4 addresses, CSMA/CA, mandatory ACK, half-duplex, encryption at MAC." },
      practice: {
        question: "Why does the IEEE 802.11 MAC frame have up to 4 address fields while Ethernet has only 2?",
        choices: [
          "To support higher data rates",
          "Because the AP acts as an intermediary relay, requiring separate source/destination and transmitter/receiver addresses",
          "For encryption key distribution",
          "To support IPv6 addressing"
        ],
        correctIndex: 1,
        explanation: "In infrastructure mode, the AP relays frames between the wireless and wired networks. The 'transmitter' (AP or STA on the wireless side) may differ from the original 'source'. Similarly, the immediate 'receiver' (AP) may differ from the final 'destination'."
      },
      references: [
        { cite: "Tanenbaum & Wetherall, Computer Networks, 6th Ed., Ch. 4.4: The 802.11 Protocol Stack", url: "https://www.pearson.com/en-us/subject-catalog/p/computer-networks/P200000003193" },
        { cite: "IEEE 802.11-2020 Standard", url: "https://standards.ieee.org/ieee/802.11/7028/" },
        { cite: "Forouzan, Data Communications & Networking, 6th Ed., Ch. 15: IEEE 802.11", url: "https://www.mheducation.com/" }
      ]
    },
    prevTopicId: "wireless-lan-protocols",
    nextTopicId: "ethernet"
  },

  "dll-switching": {
    id: "dll-switching",
    title: "Data Link Layer Switching & Learning Bridges",
    unit: "Unit II: Data Link Layer & Reliable Transfer",
    unitId: "unit2",
    level: "Level 2 — Standard Topic",
    category: "datalink",
    difficulty: "Core",
    readingTime: "8 min read",
    standard: "IEEE 802.1D (Bridging), IEEE 802.1Q (VLAN)",
    oneLiner: "Bridges and switches operate at Layer 2 to forward frames based on MAC addresses—learning bridges build forwarding tables automatically by observing source addresses.",
    quickAnswer: "A learning bridge/switch examines the source MAC address of every incoming frame to build a forwarding table. When a frame arrives, it checks the destination MAC: if known, forward to that port only; if unknown, flood to all ports except the source port.",
    whyItMatters: "Modern Ethernet switches are learning bridges—they are the backbone of every LAN. Understanding how they learn, forward, and prevent loops (Spanning Tree Protocol) is essential for network administration.",
    infobox: {
      layer: "Layer 2 (Data Link Layer)",
      standard: "IEEE 802.1D (STP), IEEE 802.1w (RSTP), IEEE 802.1Q (VLAN)",
      type: "LAN Interconnection & Switching",
      keyFormula: "\\text{Forwarding Decision: } \\text{if dst MAC in table} \\to \\text{forward} \\mid \\text{else} \\to \\text{flood}",
      prerequisites: ["ethernet", "mac-address"],
      relatedConcepts: ["vlan", "ethernet", "mac-address", "network-devices"],
      compareWith: ["vlan"],
      primaryUses: ["Ethernet LAN switching", "Campus network backbone", "Data center leaf-spine switching"]
    },
    sections: {
      overview: `<p>As LANs grew, connecting multiple network segments became necessary. <strong>Bridges</strong> (and their modern successors, <strong>switches</strong>) operate at Layer 2 to interconnect LAN segments while confining traffic to only the segments that need it.</p>
        <p>Key concepts in DLL switching:</p>
        <ul class="wiki-bullet-list">
          <li><strong>Bridges:</strong> Connect two LAN segments, forward/filter frames based on MAC addresses.</li>
          <li><strong>Learning Bridges:</strong> Automatically build a MAC address table by inspecting source addresses of incoming frames.</li>
          <li><strong>Switches:</strong> Multi-port bridges with hardware-speed forwarding (each port is a separate collision domain).</li>
          <li><strong>Spanning Tree Protocol (STP):</strong> Prevents loops in networks with redundant bridge connections.</li>
        </ul>`,
      howItWorks: `
        <h4>The Learning Bridge Algorithm</h4>
        <ol class="wiki-ordered-list">
          <li><strong>Learning (Backward Learning):</strong> When a frame arrives on port P with source MAC address S:
            <ul class="wiki-bullet-list">
              <li>Record the mapping: <code>MAC S → Port P</code> in the forwarding table.</li>
              <li>Set an aging timer (typically 5 minutes) for this entry.</li>
            </ul>
          </li>
          <li><strong>Forwarding Decision:</strong> Look up the destination MAC address D in the forwarding table:
            <ul class="wiki-bullet-list">
              <li><strong>If D is found on port Q (Q ≠ P):</strong> Forward the frame to port Q only.</li>
              <li><strong>If D is found on port P (same as source):</strong> Drop/filter the frame (both source and destination are on the same segment).</li>
              <li><strong>If D is not in the table:</strong> <strong>Flood</strong>—forward the frame to ALL ports except port P.</li>
              <li><strong>If D is broadcast (FF:FF:FF:FF:FF:FF):</strong> Always flood to all ports except source.</li>
            </ul>
          </li>
          <li><strong>Aging:</strong> Entries that haven't been refreshed within the aging time are deleted, allowing the bridge to adapt to topology changes.</li>
        </ol>
        <h4>Spanning Tree Protocol (STP — IEEE 802.1D)</h4>
        <p>When multiple bridges create <strong>redundant paths</strong>, frames can loop forever (broadcast storms). STP prevents this:</p>
        <ol class="wiki-ordered-list">
          <li>Bridges exchange <strong>BPDU (Bridge Protocol Data Unit)</strong> messages.</li>
          <li>A <strong>Root Bridge</strong> is elected (lowest Bridge ID = priority + MAC).</li>
          <li>Each non-root bridge finds its shortest path to the root.</li>
          <li>Redundant ports are placed in <strong>Blocking state</strong> (not forwarding data).</li>
          <li>Result: A <strong>loop-free spanning tree</strong> covering all bridges.</li>
          <li><strong>RSTP (802.1w):</strong> Rapid STP converges in seconds instead of 30-50 seconds.</li>
        </ol>
        <h4>Store-and-Forward vs Cut-Through Switching</h4>
        <table class="wiki-table">
          <thead><tr><th>Method</th><th>How It Works</th><th>Latency</th><th>Error Checking</th></tr></thead>
          <tbody>
            <tr><td>Store-and-Forward</td><td>Receive entire frame, check CRC, then forward</td><td>Higher</td><td>Full CRC check</td></tr>
            <tr><td>Cut-Through</td><td>Read destination MAC (first 6 bytes), start forwarding immediately</td><td>Very low</td><td>No CRC check (may forward corrupt frames)</td></tr>
            <tr><td>Fragment-Free</td><td>Read first 64 bytes (collision fragment size), then forward</td><td>Medium</td><td>Filters runts/collision fragments</td></tr>
          </tbody>
        </table>`,
      diagram: `
LEARNING BRIDGE IN ACTION:

Step 1: Frame arrives from A (Port 1)                Step 2: Frame from A to C
┌──────────┐                    ┌──────────┐         Table: A→Port1
│ Station A │──Port 1──┐  ┌──Port 3──│ Station C │         
└──────────┘          │  │          └──────────┘         
                    ┌─▼──▼─┐                             
                    │BRIDGE │  ← Learns: A is on Port 1  
                    │ TABLE │  ← C unknown → FLOOD all   
                    └─┬──┬─┘     ports except Port 1     
┌──────────┐          │  │          ┌──────────┐         
│ Station B │──Port 2──┘  └──Port 4──│ Station D │         
└──────────┘                    └──────────┘         

Step 3: C replies to A                               
Table: A→Port1, C→Port3                              
Bridge knows A is on Port 1 → forward ONLY to Port 1 
(No flooding! Traffic filtered from Ports 2, 4)       

SPANNING TREE (Loop Prevention):
       ┌─── Bridge 1 ───┐
       │   (Root)        │
    Port1             Port2
       │                 │
   ┌───▼───┐        ┌───▼───┐
   │Bridge 2│────────│Bridge 3│
   └───────┘  ▲     └───────┘
              │
         This port is BLOCKED
         by STP to prevent loops`,
      technicalDetails: `
        <h4>Bridge Forwarding Table Example</h4>
        <table class="wiki-table">
          <thead><tr><th>MAC Address</th><th>Port</th><th>Age (seconds)</th></tr></thead>
          <tbody>
            <tr><td>AA:BB:CC:11:22:33</td><td>Port 1</td><td>42</td></tr>
            <tr><td>AA:BB:CC:44:55:66</td><td>Port 3</td><td>18</td></tr>
            <tr><td>AA:BB:CC:77:88:99</td><td>Port 2</td><td>125</td></tr>
            <tr><td>AA:BB:CC:AA:BB:CC</td><td>Port 1</td><td>7</td></tr>
          </tbody>
        </table>
        <h4>STP Port States</h4>
        <table class="wiki-table">
          <thead><tr><th>State</th><th>Learns MACs?</th><th>Forwards Data?</th><th>Duration</th></tr></thead>
          <tbody>
            <tr><td>Blocking</td><td>No</td><td>No</td><td>20s (max age)</td></tr>
            <tr><td>Listening</td><td>No</td><td>No</td><td>15s (forward delay)</td></tr>
            <tr><td>Learning</td><td>Yes</td><td>No</td><td>15s (forward delay)</td></tr>
            <tr><td>Forwarding</td><td>Yes</td><td>Yes</td><td>Active</td></tr>
            <tr><td>Disabled</td><td>No</td><td>No</td><td>Admin down</td></tr>
          </tbody>
        </table>`,
      workedExample: `<p><strong>Problem:</strong> A bridge has 4 ports. Its MAC table is initially empty. Trace the learning process for this sequence of frames:</p>
        <ol class="wiki-ordered-list">
          <li><strong>Frame 1:</strong> A→B arrives on Port 1
            <ul class="wiki-bullet-list"><li>Learn: A→Port 1. B not in table → <strong>Flood to Ports 2, 3, 4</strong>.</li></ul>
          </li>
          <li><strong>Frame 2:</strong> B→A arrives on Port 3
            <ul class="wiki-bullet-list"><li>Learn: B→Port 3. A in table on Port 1 → <strong>Forward to Port 1 only</strong>.</li></ul>
          </li>
          <li><strong>Frame 3:</strong> A→B arrives on Port 1
            <ul class="wiki-bullet-list"><li>Refresh: A→Port 1. B in table on Port 3 → <strong>Forward to Port 3 only</strong>.</li></ul>
          </li>
          <li><strong>Frame 4:</strong> C→A arrives on Port 2
            <ul class="wiki-bullet-list"><li>Learn: C→Port 2. A in table on Port 1 → <strong>Forward to Port 1 only</strong>.</li></ul>
          </li>
        </ol>
        <p><strong>Result:</strong> After just 4 frames, the bridge has learned 3 MAC addresses and can forward efficiently without flooding.</p>`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Self-learning: no manual configuration needed</td><td>Broadcast storms if STP fails or loops exist</td></tr>
            <tr><td>Microsecond-level forwarding (hardware ASICs)</td><td>Flat MAC address space doesn't scale beyond ~10K entries</td></tr>
            <tr><td>Each switch port is a separate collision domain</td><td>Cannot route between subnets (Layer 2 only)</td></tr>
            <tr><td>Full-duplex per port eliminates collisions entirely</td><td>STP wastes bandwidth by blocking redundant links</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Every modern Ethernet switch", "Data center leaf-spine architectures", "Campus network access/distribution layers", "Industrial Ethernet switches"],
      commonMistakes: "Confusing bridges with routers. Bridges operate at Layer 2 using MAC addresses and are transparent to network-layer protocols. Routers operate at Layer 3 using IP addresses and can connect different network types.",
      compareWith: { title: "Bridge/Switch vs Router", note: "Bridges forward based on MAC addresses (Layer 2, fast, plug-and-play). Routers forward based on IP addresses (Layer 3, slower, requires configuration, but scales to billions of hosts)." },
      practice: {
        question: "When a learning bridge receives a frame with a destination MAC address not in its forwarding table, what does it do?",
        choices: [
          "Drop the frame",
          "Send an error message to the source",
          "Flood the frame to all ports except the source port",
          "Send the frame to the default gateway"
        ],
        correctIndex: 2,
        explanation: "When the destination MAC is unknown, the bridge floods the frame to all ports except the one it arrived on. This ensures the frame reaches its destination regardless of which port it's connected to. The destination's reply will teach the bridge the correct port mapping."
      },
      references: [
        { cite: "Tanenbaum & Wetherall, Computer Networks, 6th Ed., Ch. 4.7: Data Link Layer Switching", url: "https://www.pearson.com/en-us/subject-catalog/p/computer-networks/P200000003193" },
        { cite: "IEEE 802.1D: MAC Bridges", url: "https://standards.ieee.org/" },
        { cite: "Forouzan, Data Communications & Networking, 6th Ed., Ch. 13: Connecting Devices", url: "https://www.mheducation.com/" }
      ]
    },
    prevTopicId: "arp",
    nextTopicId: "network-devices"
  },

  "network-devices": {
    id: "network-devices",
    title: "Repeaters, Hubs, Bridges, Switches, Routers & Gateways",
    unit: "Unit II: Data Link Layer & Reliable Transfer",
    unitId: "unit2",
    level: "Level 2 — Standard Topic",
    category: "datalink",
    difficulty: "Core",
    readingTime: "8 min read",
    standard: "IEEE 802, IETF RFCs",
    oneLiner: "Network interconnection devices operate at different OSI layers—repeaters/hubs at Layer 1, bridges/switches at Layer 2, routers at Layer 3, and gateways at all layers.",
    quickAnswer: "Each device operates at a specific OSI layer: Repeaters & Hubs (Layer 1, signal regeneration), Bridges & Switches (Layer 2, MAC-based forwarding), Routers (Layer 3, IP-based routing), Gateways (Layer 4-7, protocol conversion).",
    whyItMatters: "Choosing the right interconnection device determines network performance, security, and scalability. Using a hub where a switch is needed creates collisions; using a switch where a router is needed prevents inter-subnet communication.",
    infobox: {
      layer: "Layers 1-7 (varies by device)",
      standard: "IEEE 802.3, IEEE 802.1D/Q, IETF RFCs",
      type: "Network Interconnection Devices",
      keyFormula: "\\text{Higher Layer} \\Rightarrow \\text{More Intelligence} \\Rightarrow \\text{More Overhead}",
      prerequisites: ["ethernet", "mac-address", "dll-switching"],
      relatedConcepts: ["dll-switching", "vlan", "ethernet"],
      compareWith: ["dll-switching"],
      primaryUses: ["LAN/WAN interconnection", "Network segmentation", "Inter-network routing", "Protocol translation"]
    },
    sections: {
      overview: `<p>Network interconnection devices can be classified by the <strong>OSI layer</strong> at which they operate. Each higher layer provides more intelligent processing but also more overhead and latency.</p>
        <table class="wiki-table">
          <thead><tr><th>OSI Layer</th><th>Device</th><th>Operates On</th><th>Intelligence Level</th></tr></thead>
          <tbody>
            <tr><td>Layer 1 (Physical)</td><td>Repeater, Hub</td><td>Electrical signals / bits</td><td>None (signal regeneration only)</td></tr>
            <tr><td>Layer 2 (Data Link)</td><td>Bridge, Switch</td><td>MAC addresses, frames</td><td>Medium (filtering, forwarding)</td></tr>
            <tr><td>Layer 3 (Network)</td><td>Router</td><td>IP addresses, packets</td><td>High (routing decisions, ACLs)</td></tr>
            <tr><td>Layers 4-7</td><td>Gateway</td><td>Full protocol conversion</td><td>Very High (protocol translation)</td></tr>
          </tbody>
        </table>`,
      howItWorks: `
        <h4>1. Repeater (Layer 1)</h4>
        <ul class="wiki-bullet-list">
          <li>Receives a weakened analog/digital signal and <strong>regenerates it at full strength</strong>.</li>
          <li>Does NOT examine frame content, addresses, or errors.</li>
          <li>Extends the physical distance of a network segment.</li>
          <li><strong>Collision domains:</strong> Does NOT separate collision domains—collisions propagate through.</li>
          <li><em>Analogy:</em> A megaphone that amplifies sound without understanding the words.</li>
        </ul>
        <h4>2. Hub (Layer 1 — Multiport Repeater)</h4>
        <ul class="wiki-bullet-list">
          <li>A hub is a <strong>multi-port repeater</strong>: any signal received on one port is regenerated and sent to ALL other ports.</li>
          <li>Creates a single <strong>shared collision domain</strong> and <strong>shared broadcast domain</strong>.</li>
          <li>No intelligence: cannot filter, forward selectively, or learn addresses.</li>
          <li><strong>Half-duplex:</strong> All devices share the same bandwidth.</li>
          <li>Largely <strong>obsolete</strong>—replaced by switches in all modern networks.</li>
        </ul>
        <h4>3. Bridge (Layer 2)</h4>
        <ul class="wiki-bullet-list">
          <li>Reads the <strong>MAC destination address</strong> of each incoming frame.</li>
          <li>Maintains a <strong>forwarding table</strong> (learned from source addresses).</li>
          <li><strong>Filters:</strong> Does not forward frames whose source and destination are on the same segment.</li>
          <li><strong>Forwards:</strong> Sends frames only to the correct port (or floods if unknown).</li>
          <li><strong>Separates collision domains</strong> but NOT broadcast domains.</li>
          <li>Typically has 2-4 ports (vs switches which have many more).</li>
        </ul>
        <h4>4. Switch (Layer 2 — Multiport Bridge)</h4>
        <ul class="wiki-bullet-list">
          <li>A switch is a <strong>high-speed, multi-port bridge</strong> with hardware-based forwarding (ASICs).</li>
          <li>Each port is a <strong>separate collision domain</strong>.</li>
          <li><strong>Full-duplex:</strong> Each port can send and receive simultaneously → NO collisions!</li>
          <li>Wire-speed forwarding using <strong>Content Addressable Memory (CAM)</strong> tables.</li>
          <li>Supports <strong>VLANs (IEEE 802.1Q)</strong> for logical network segmentation.</li>
          <li>Can use <strong>store-and-forward</strong> or <strong>cut-through</strong> switching methods.</li>
        </ul>
        <h4>5. Router (Layer 3)</h4>
        <ul class="wiki-bullet-list">
          <li>Examines the <strong>destination IP address</strong> in each packet.</li>
          <li>Consults a <strong>routing table</strong> (built by routing protocols: OSPF, BGP, RIP).</li>
          <li>Determines the <strong>best next hop</strong> and the outgoing interface.</li>
          <li><strong>Separates both collision domains AND broadcast domains.</strong></li>
          <li>Can connect <strong>different network types</strong> (e.g., Ethernet to Wi-Fi, LAN to WAN).</li>
          <li>Performs <strong>NAT, ACLs, QoS, firewall</strong> functions.</li>
          <li>Each interface has its own <strong>IP address and MAC address</strong>.</li>
        </ul>
        <h4>6. Gateway (Layer 4-7)</h4>
        <ul class="wiki-bullet-list">
          <li>Performs <strong>full protocol conversion</strong> between incompatible networks.</li>
          <li>Operates at the <strong>transport layer or above</strong>.</li>
          <li>Examples: Email gateway (SMTP ↔ X.400), VoIP gateway (PSTN ↔ SIP), application-level proxy.</li>
          <li>Most complex and highest latency of all interconnection devices.</li>
        </ul>`,
      diagram: `
OSI Layer Model and Device Placement:

Layer 7 ─ Application  ─────── Gateway
Layer 6 ─ Presentation ─────── Gateway  
Layer 5 ─ Session      ─────── Gateway
Layer 4 ─ Transport    ─────── Gateway
Layer 3 ─ Network      ─────── Router
Layer 2 ─ Data Link    ─────── Bridge / Switch
Layer 1 ─ Physical     ─────── Repeater / Hub

Device Impact on Domains:
┌──────────────────────────────────────────────────────────┐
│                      HUB                                 │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐                │
│  │ PC A │  │ PC B │  │ PC C │  │ PC D │                │
│  └──────┘  └──────┘  └──────┘  └──────┘                │
│  ONE collision domain │ ONE broadcast domain             │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│                     SWITCH                               │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐                │
│  │ PC A │  │ PC B │  │ PC C │  │ PC D │                │
│  └──────┘  └──────┘  └──────┘  └──────┘                │
│  FOUR collision domains │ ONE broadcast domain           │
└──────────────────────────────────────────────────────────┘

┌──────────────────────┐   ┌──────────────────────┐
│      ROUTER          │   │                      │
│  ┌──────┐  ┌──────┐  │   │  ┌──────┐  ┌──────┐  │
│  │ PC A │  │ PC B │  │───│  │ PC C │  │ PC D │  │
│  └──────┘  └──────┘  │   │  └──────┘  └──────┘  │
│  Broadcast Domain 1  │   │  Broadcast Domain 2  │
└──────────────────────┘   └──────────────────────┘`,
      technicalDetails: `
        <h4>Comprehensive Device Comparison</h4>
        <table class="wiki-table">
          <thead><tr><th>Feature</th><th>Repeater</th><th>Hub</th><th>Bridge</th><th>Switch</th><th>Router</th><th>Gateway</th></tr></thead>
          <tbody>
            <tr><td>OSI Layer</td><td>1</td><td>1</td><td>2</td><td>2</td><td>3</td><td>4-7</td></tr>
            <tr><td>Addresses Used</td><td>None</td><td>None</td><td>MAC</td><td>MAC</td><td>IP</td><td>Protocol-specific</td></tr>
            <tr><td>Collision Domain</td><td>Extends</td><td>Shared</td><td>Separates</td><td>Separates</td><td>Separates</td><td>Separates</td></tr>
            <tr><td>Broadcast Domain</td><td>Same</td><td>Same</td><td>Same</td><td>Same*</td><td>Separates</td><td>Separates</td></tr>
            <tr><td>Filtering</td><td>No</td><td>No</td><td>Yes (MAC)</td><td>Yes (MAC)</td><td>Yes (IP/ACL)</td><td>Yes (deep)</td></tr>
            <tr><td>Speed</td><td>Wire speed</td><td>Wire speed</td><td>Fast</td><td>Wire speed</td><td>Slower</td><td>Slowest</td></tr>
            <tr><td>Cost</td><td>Lowest</td><td>Low</td><td>Medium</td><td>Medium</td><td>High</td><td>Highest</td></tr>
            <tr><td>Intelligence</td><td>None</td><td>None</td><td>Medium</td><td>Medium-High</td><td>High</td><td>Very High</td></tr>
          </tbody>
        </table>
        <p>* Switches keep all ports in one broadcast domain unless VLANs are configured.</p>`,
      workedExample: `<p><strong>Scenario:</strong> A company has 100 PCs. Initially connected via a single hub. They upgrade to switches, then add a router.</p>
        <table class="wiki-table">
          <thead><tr><th>Configuration</th><th>Collision Domains</th><th>Broadcast Domains</th><th>Effective BW per PC</th></tr></thead>
          <tbody>
            <tr><td>1 Hub (100 ports)</td><td>1</td><td>1</td><td>100 Mbps / 100 = 1 Mbps shared</td></tr>
            <tr><td>1 Switch (100 ports)</td><td>100</td><td>1</td><td>100 Mbps each (full-duplex)</td></tr>
            <tr><td>2 Switches + Router</td><td>100</td><td>2</td><td>100 Mbps each + broadcast isolation</td></tr>
          </tbody>
        </table>
        <p><strong>Key insight:</strong> Upgrading from hub to switch gives each PC dedicated bandwidth. Adding a router between switches creates separate broadcast domains, reducing broadcast traffic overhead.</p>`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Device</th><th>Best For</th><th>Not Suitable For</th></tr></thead>
          <tbody>
            <tr><td>Repeater/Hub</td><td>Extending cable distance (obsolete)</td><td>Any modern network (creates collisions)</td></tr>
            <tr><td>Bridge/Switch</td><td>LAN segmentation, microsecond forwarding</td><td>WAN routing, inter-subnet communication</td></tr>
            <tr><td>Router</td><td>Connecting networks, WAN access, security</td><td>Simple LAN extension (overkill)</td></tr>
            <tr><td>Gateway</td><td>Protocol conversion between different systems</td><td>Simple forwarding (too slow, too complex)</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Switches: every enterprise and home LAN", "Routers: Internet backbone, WAN connections", "Gateways: VoIP, email, IoT protocol translation", "Repeaters: fiber optic long-haul (optical amplifiers)"],
      commonMistakes: "Thinking a switch and a router do the same thing. A switch forwards based on MAC addresses within a single LAN. A router forwards based on IP addresses between different networks. You need both in most real networks.",
      compareWith: { title: "Switch vs Router", note: "Switches: fast, Layer 2, MAC-based, same broadcast domain. Routers: Layer 3, IP-based, separate broadcast domains, connect different networks, implement security policies." },
      practice: {
        question: "Which device separates BOTH collision domains AND broadcast domains?",
        choices: ["Hub", "Switch", "Router", "Repeater"],
        correctIndex: 2,
        explanation: "Only routers (Layer 3) separate both collision and broadcast domains. Switches separate collision domains but keep all ports in the same broadcast domain (unless VLANs are configured). Hubs and repeaters separate neither."
      },
      references: [
        { cite: "Tanenbaum & Wetherall, Computer Networks, 6th Ed., Ch. 4.7: Repeaters, Hubs, Bridges, Switches, Routers, Gateways", url: "https://www.pearson.com/en-us/subject-catalog/p/computer-networks/P200000003193" },
        { cite: "Forouzan, Data Communications & Networking, 6th Ed., Ch. 13: Connecting Devices", url: "https://www.mheducation.com/" }
      ]
    },
    prevTopicId: "dll-switching",
    nextTopicId: "vlan"
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
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = TOPICS_U2_EXT;
}
