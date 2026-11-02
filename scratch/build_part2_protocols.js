// Builder for Part 2 Data Link Layer Protocols (9 Topics)
// Strictly aligned with Behrouz A. Forouzan Ch. 11 (Data Link Control) and Tanenbaum Ch. 3

const part2Topics = {
  "u2-unrestricted-simplex": {
    id: "u2-unrestricted-simplex",
    title: "Unrestricted Simplex Protocol",
    unit: "Unit 2 – Data Link Layer",
    unitId: "unit2",
    level: "Core",
    category: "datalink",
    difficulty: "Core",
    readingTime: "15 min",
    standard: "Forouzan Ch. 11.4 / Tanenbaum Protocol 1",
    oneLiner: "The simplest baseline data link layer protocol assuming a completely noiseless channel and an infinitely fast receiver with unbounded buffers.",
    quickAnswer: "The Unrestricted Simplex Protocol (also known as the 'Simplest Protocol') is a baseline unidirectional data link protocol. It operates under two ideal assumptions: (1) The physical channel is completely noiseless (no lost, damaged, or duplicated frames), and (2) The receiver has infinite processing speed and infinite buffer capacity, meaning it can never be overwhelmed by incoming traffic. Therefore, neither flow control nor error control is needed.",
    whyItMatters: "Although physically unrealistic, the Unrestricted Simplex Protocol serves as the conceptual pedagogical foundation from which all modern flow control and error control protocols evolve.",
    prerequisitesList: [
      { concept: "Data Link Layer Framing", meaning: "Encapsulation of network packets into frames." },
      { concept: "Simplex Transmission", meaning: "Unidirectional data flow from sender to receiver." }
    ],
    learningObjectives: [
      "Explain the ideal assumptions of the Unrestricted Simplex Protocol.",
      "Understand why neither flow control nor error control is needed under these assumptions.",
      "Analyze the sender and receiver finite state machines (FSM) and event loops.",
      "Identify the failure modes that occur when this protocol is deployed on realistic hardware."
    ],
    infobox: {
      layer: "Layer 2 (Data Link Layer)",
      standard: "Tanenbaum Protocol 1 / Forouzan Simplest Protocol",
      type: "Baseline Ideal Protocol",
      prerequisites: ["u2-dll-protocols-intro"],
      relatedConcepts: ["u2-simplex-stop-and-wait", "u2-simplex-noisy-channels"],
      compareWith: ["stop-and-wait-noiseless"],
      primaryUses: ["Pedagogical foundation of protocol engineering", "Ultra-fast shared memory inter-process messaging"]
    },
    imageUrl: "assets/images/unit2/topic2/simplex-protocols-evolution.svg",
    imageCaption: "Figure 11.1: Unrestricted Simplex Protocol FSM and Continuous Flow Model.",
    sections: {
      overview: `
        <p>In <em>Forouzan Chapter 11.4 (pp. 349–351)</em> and <em>Tanenbaum Chapter 3.3</em>, our study of Data Link Layer protocols begins with the simplest conceivable model: the <strong>Unrestricted Simplex Protocol</strong> (or <em>Simplest Protocol</em>).</p>
        <p>This protocol is strictly <strong>unidirectional</strong>: data frames travel in only one direction, from the sender to the receiver. To establish a baseline, the protocol operates under two absolute assumptions:</p>
        <ul>
          <li><strong>Noiseless Channel:</strong> The physical transmission medium never corrupts, drops, delays, or duplicates frames. Every transmitted frame arrives intact.</li>
          <li><strong>Infinite Receiver Capacity:</strong> The receiver's processing speed is infinitely fast, and its buffer space is boundless. The receiver can instantaneously consume frames as fast as the sender can transmit them.</li>
        </ul>
        <p>Under these conditions, data transmission is completely unrestricted: the sender continuously pumps frames onto the wire without pausing, without waiting for acknowledgments, and without tracking sequence numbers.</p>
      `,
      eli10: "Imagine speaking into a magical tube directly connected to a super-fast listener who never blinks, never gets tired, and can hear words as fast as you can speak. Because the tube has zero echoes and your listener is infinitely fast, you just talk continuously at maximum speed without ever having to ask 'Did you hear that?'",
      analogy: "A wide fire hose pouring water into an infinitely deep underground cavern. The pump never needs to shut off, and no water ever splashes back or overflows, because the cavern can swallow infinite gallons per second.",
      howItWorks: `
        <ol class="list-decimal pl-5 space-y-2 text-xs">
          <li><strong>Sender Algorithm:</strong>
            <br>• The sender's data link layer sits in an idle loop waiting for a packet from its host network layer.
            <br>• When a packet arrives, it fetches the packet from the network layer.
            <br>• It encapsulates the packet into a frame by prepending a header and appending a trailer.
            <br>• It immediately pushes the frame to the physical layer for transmission.
            <br>• It loops back instantly to fetch the next packet.
          </li>
          <li><strong>Receiver Algorithm:</strong>
            <br>• The receiver sits in an idle loop waiting for a physical layer frame arrival event.
            <br>• When a frame arrives, it extracts the frame from the physical layer.
            <br>• It strips the header and trailer to recover the network layer packet.
            <br>• It delivers the packet to the network layer.
            <br>• It returns immediately to the idle state to wait for the next frame.
          </li>
        </ol>
      `,
      diagram: `
+---------------------------------------------------------------------------------+
|               UNRESTRICTED SIMPLEX PROTOCOL (SIMPEST PROTOCOL)                  |
+---------------------------------------------------------------------------------+
|                                                                                 |
|   SENDER NODE                                     RECEIVER NODE                 |
|   +-----------------------+                       +-----------------------+     |
|   |  Network Layer        |                       |  Network Layer        |     |
|   |  [ Packet Generation] |                       |  [ Packet Delivery ]  |     |
|   +-----------+-----------+                       +-----------^-----------+     |
|               |                                               |                 |
|               v getData()                                     | deliverData()   |
|   +-----------+-----------+                       +-----------+-----------+     |
|   |  Data Link Layer      |                       |  Data Link Layer      |     |
|   |  * Encapsulate Frame  |                       |  * Strip Header       |     |
|   |  * sendFrame()        |                       |  * receiveFrame()     |     |
|   +-----------+-----------+                       +-----------^-----------+     |
|               |                                               |                 |
|               v                                               |                 |
|   =========================================================================     |
|       CONTINUOUS UNIDIRECTIONAL TRANSMISSION (NO ACKs, NO TIMERS, NO BUFFERS)   |
|       Frame 0 ===> Frame 1 ===> Frame 2 ===> Frame 3 ===> Frame 4 ===>          |
|   =========================================================================     |
|   Assumptions: Channel is 100% noiseless; Receiver processing time = 0.         |
+---------------------------------------------------------------------------------+
      `,
      technicalDetails: `
        <p><strong>Finite State Machine (FSM) Specification:</strong></p>
        <p>Both the sender and receiver possess only a single state: <code>Ready</code>.</p>
        <pre class="bg-slate-900 text-slate-100 p-3 rounded text-xs font-mono">
/* Sender Protocol */
void Sender(void) {
    packet p;
    frame s;
    while (true) {
        waitForEvent(NETWORK_LAYER_READY);
        getFromNetworkLayer(&p);
        s.info = p;
        sendFrameToPhysicalLayer(&s);
    }
}

/* Receiver Protocol */
void Receiver(void) {
    frame r;
    packet p;
    while (true) {
        waitForEvent(PHYSICAL_LAYER_ARRIVAL);
        receiveFrameFromPhysicalLayer(&r);
        p = r.info;
        deliverToNetworkLayer(&p);
    }
}
        </pre>
        <p><strong>Why It Fails in the Real World:</strong></p>
        <ul>
          <li><strong>Buffer Overflow (Flow Control Collapse):</strong> In real computers, the receiver's CPU is shared with multiple processes, interrupts, and disk I/O. If the sender transmits at 1 Gbps while the receiver can only process at 100 Mbps, the receiver's incoming buffer overflows within milliseconds, resulting in massive frame drops.</li>
          <li><strong>Channel Impairments (Error Control Collapse):</strong> Thermal noise and signal attenuation flip bits. Without check bits or timers, corrupted frames are silently delivered or lost forever with zero recovery.</li>
        </ul>
      `,
      workedExamples: {
        level1: "<strong>Question:</strong> State the two fundamental assumptions made by the Unrestricted Simplex Protocol.<br><br><strong>Answer:</strong><br>1. <strong>Completely Noiseless Channel:</strong> Frames are never corrupted, lost, or delayed in transit.<br>2. <strong>Infinite Receiver Speed & Buffer:</strong> The receiver's data link layer can consume and process incoming frames instantaneously without ever overflowing its buffers.",
        level2: "<strong>Problem:</strong> A sender using the Unrestricted Simplex Protocol sends 1000-byte frames at 100 Mbps to a receiver whose network layer can only process frames at 10 Mbps. If the receiver has an input buffer of 1 Megabyte, calculate how long before buffer overflow occurs.<br><br><strong>Solution:</strong><br>• Inflow rate = 100 Mbps = 12.5 MB/s.<br>• Outflow processing rate = 10 Mbps = 1.25 MB/s.<br>• Net accumulation rate = $12.5 - 1.25 = 11.25$ MB/s.<br>• Buffer capacity = 1 MB.<br>• Time to overflow: $T = \\frac{1 \\text{ MB}}{11.25 \\text{ MB/s}} = 0.0889 \\text{ seconds} \\approx \\mathbf{88.9 \\text{ ms}}$.<br>After just 89 ms, the receiver crashes or drops every incoming frame!",
        level3: "<strong>Protocol Design Analysis:</strong> What minimal modification must be made to the Unrestricted Simplex Protocol to prevent the receiver buffer overflow described in Level 2?<br><br><strong>Analysis:</strong> To prevent buffer overflow, we must introduce <strong>Flow Control</strong>. The receiver must be given the ability to provide feedback to the sender. The simplest mechanism is requiring the sender to pause after sending 1 frame until the receiver sends back an explicit Acknowledgment (ACK) frame indicating it is ready for the next. This creates the <em>Simplex Stop-and-Wait Protocol</em>."
      },
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Theoretical Merits</th><th>Practical Limitations</th></tr></thead>
          <tbody>
            <tr><td>Zero control overhead: 100% of bandwidth carries user payload.</td><td>Completely unrealistic; unworkable on real network physical media.</td></tr>
            <tr><td>Zero state memory, zero timers, zero complex queuing logic.</td><td>Causes instantaneous catastrophic buffer overflow if receiver is slower than sender.</td></tr>
            <tr><td>Establishes the minimal algorithmic baseline for protocol design.</td><td>Has zero error detection or recovery capabilities.</td></tr>
          </tbody>
        </table>
      `,
      whereUsed: [
        "Theoretical introductory model in all standard Computer Networks courses",
        "Dedicated inter-core FIFO hardware buffers inside specialized ASICs",
        "Unidirectional fiber-optic data diodes in ultra-secure government air-gapped networks"
      ],
      quiz: [
        {
          question: "Why does the Unrestricted Simplex Protocol require neither flow control nor error control?",
          options: [
            "Because the channel is assumed to be 100% noiseless and the receiver is assumed to have infinite processing speed and buffer capacity.",
            "Because it runs exclusively over fiber-optic lines.",
            "Because the sender uses artificial intelligence to predict collisions.",
            "Because frames are encrypted with quantum keys."
          ],
          correct: 0,
          explanation: "With an ideal noiseless channel, error control is unnecessary; with an infinitely fast receiver, buffer overflow is impossible, so flow control is unnecessary."
        },
        {
          question: "What happens in practice when an Unrestricted Simplex Protocol is executed between a fast sender and a slow receiver?",
          options: [
            "The receiver buffer quickly overflows, leading to massive frame loss.",
            "The sender automatically slows down.",
            "The network switch converts the protocol to TCP.",
            "The channel increases its physical bandwidth."
          ],
          correct: 0,
          explanation: "Without flow control feedback, a fast sender will drown a slow receiver, causing immediate buffer overflow and frame loss."
        },
        {
          question: "How many states exist in the Finite State Machine (FSM) of the Unrestricted Simplex Protocol sender?",
          options: [
            "1 state (Ready / Idle)",
            "2 states (Waiting for ACK, Transmitting)",
            "3 states (Start, Listen, Stop)",
            "4 states"
          ],
          correct: 0,
          explanation: "Both sender and receiver have only a single state: they continuously wait for an event, process it immediately, and return to that same state."
        }
      ],
      references: [
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th/6th Edition, Chapter 11.4 'Simplest Protocol', pp. 349–351.", url: "" },
        { cite: "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Section 3.3.1 'An Unrestricted Simplex Protocol'.", url: "" }
      ]
    }
  },

  "u2-simplex-stop-and-wait": {
    id: "u2-simplex-stop-and-wait",
    title: "Simplex Stop-and-Wait Protocol",
    unit: "Unit 2 – Data Link Layer",
    unitId: "unit2",
    level: "Core",
    category: "datalink",
    difficulty: "Core",
    readingTime: "18 min",
    standard: "Forouzan Ch. 11.4 / Tanenbaum Protocol 2",
    oneLiner: "The fundamental noiseless flow-control protocol where the sender transmits one frame and pauses until an explicit acknowledgment (ACK) is received.",
    quickAnswer: "The Simplex Stop-and-Wait Protocol introduces flow control to prevent a fast sender from overwhelming a slow receiver. Data frames travel in only one direction (simplex data flow), but a reverse feedback channel is added. The sender sends one frame, stops, and waits for a dummy acknowledgment (ACK) frame from the receiver before transmitting the next data frame. Channel is still assumed to be noiseless.",
    whyItMatters: "Stop-and-Wait is the foundational flow-control mechanism upon which all modern windowed and ARQ protocols are built. It demonstrates the necessity of receiver feedback to throttle transmission rates.",
    prerequisitesList: [
      { concept: "Unrestricted Simplex Protocol", meaning: "Baseline protocol without flow control." },
      { concept: "Flow Control Principles", meaning: "Throttling sender transmission rate to match receiver capacity." }
    ],
    learningObjectives: [
      "Understand how Stop-and-Wait eliminates buffer overflow in noiseless channels.",
      "Analyze the half-duplex feedback interaction between data frames and ACK frames.",
      "Examine the sender and receiver FSMs and event loops.",
      "Calculate the link utilization and channel efficiency of Stop-and-Wait."
    ],
    infobox: {
      layer: "Layer 2 (Data Link Layer)",
      standard: "Tanenbaum Protocol 2 / Forouzan Stop-and-Wait",
      type: "Flow Control Protocol (Noiseless)",
      prerequisites: ["u2-unrestricted-simplex", "flow-control"],
      relatedConcepts: ["u2-simplex-noisy-channels", "stop-and-wait-noiseless"],
      compareWith: ["u2-sliding-window-vs-stop-and-wait"],
      primaryUses: ["Pacing sender transmission", "Base model for Stop-and-Wait ARQ", "Flow-controlled industrial telemetry"]
    },
    imageUrl: "assets/images/unit2/topic2/stop-and-wait-noiseless-flow.svg",
    imageCaption: "Figure 11.2: Simplex Stop-and-Wait Protocol Timeline with Explicit ACK Feedback.",
    sections: {
      overview: `
        <p>In <em>Forouzan Chapter 11.4 (pp. 351–353)</em> and <em>Tanenbaum Chapter 3.3.2</em>, the second protocol addresses the fatal flaw of the Simplest Protocol: <strong>buffer overflow at the receiver</strong>.</p>
        <p>If data frames arrive at the receiver faster than they can be processed by the network layer, the receiver's buffer will fill up and subsequent frames will be dropped. To prevent this, the <strong>Simplex Stop-and-Wait Protocol</strong> introduces a feedback mechanism:</p>
        <ul>
          <li>The sender sends exactly <strong>one frame</strong> and immediately <strong>stops</strong>.</li>
          <li>It waits until it receives a special confirmation frame from the receiver, called an <strong>Acknowledgment (ACK)</strong>.</li>
          <li>Only after the ACK arrives does the sender fetch the next packet and transmit the next frame.</li>
          <li>The channel is still assumed to be ideal/noiseless (frames and ACKs are never corrupted or lost).</li>
        </ul>
      `,
      eli10: "Imagine speaking to someone taking notes by hand. Instead of talking continuously, you speak exactly ONE sentence, and then you STOP and wait quietly. When your friend finishes writing, they nod their head (ACK). Once you see the nod, you speak the next sentence! Nobody ever gets left behind.",
      analogy: "A strict one-in-one-out security checkpoint at an airport terminal. The security guard lets exactly one traveler into the screening room. The guard does not admit traveler #2 until the screening officer presses a green buzzer (ACK) signaling that traveler #1 has cleared the metal detector.",
      howItWorks: `
        <ol class="list-decimal pl-5 space-y-2 text-xs">
          <li><strong>Sender Action:</strong>
            <br>• Fetches packet from network layer, encapsulates into frame $F$.
            <br>• Transmits $F$ to receiver via physical layer.
            <br>• Transitions into <code>Waiting for ACK</code> state. All further packet generation is blocked!
          </li>
          <li><strong>Receiver Action:</strong>
            <br>• Receives frame $F$, strips header, delivers packet to network layer.
            <br>• Generates a lightweight, dummy acknowledgment frame (<code>ACK</code>).
            <br>• Transmits <code>ACK</code> back to sender across reverse channel.
            <br>• Returns to idle state waiting for next data frame.
          </li>
          <li><strong>Sender Resumption:</strong>
            <br>• Sender receives the <code>ACK</code>.
            <br>• Transitions back to <code>Ready</code> state.
            <br>• Fetches next packet and repeats cycle.
          </li>
        </ol>
      `,
      diagram: `
+---------------------------------------------------------------------------------+
|               SIMPLEX STOP-AND-WAIT TIMELINE (FOROUZAN CH. 11.4)                |
+---------------------------------------------------------------------------------+
|                                                                                 |
|   SENDER                                                         RECEIVER       |
|     |                                                               |           |
|     | ------- Data Frame 1 ---------------------------------------> |           |
|     |   (Sender stops & waits...)                                   | [Consume] |
|     |                                                               | [Deliver] |
|     | <------------------------- ACK 1 ---------------------------- |           |
|     | [ACK Received: Resume!]                                       |           |
|     |                                                               |           |
|     | ------- Data Frame 2 ---------------------------------------> |           |
|     |   (Sender stops & waits...)                                   | [Consume] |
|     |                                                               | [Deliver] |
|     | <------------------------- ACK 2 ---------------------------- |           |
|     | [ACK Received: Resume!]                                       |           |
|     v                                                               v           |
|   Total Cycle Time = T_trans_data + T_prop + T_proc + T_trans_ack + T_prop      |
+---------------------------------------------------------------------------------+
      `,
      technicalDetails: `
        <p><strong>Finite State Machine (FSM) Description:</strong></p>
        <p>The sender now has <strong>two states</strong>: <code>Ready</code> and <code>Blocking/Waiting for ACK</code>. The receiver remains in 1 state: <code>Ready</code>.</p>
        <pre class="bg-slate-900 text-slate-100 p-3 rounded text-xs font-mono">
/* Stop-and-Wait Sender */
void StopAndWaitSender(void) {
    packet p;
    frame s;
    frame ack;
    while (true) {
        waitForEvent(NETWORK_LAYER_READY);
        getFromNetworkLayer(&p);
        s.info = p;
        sendFrameToPhysicalLayer(&s);
        
        /* Stop and wait for feedback */
        waitForEvent(ACK_ARRIVAL);
        receiveFrameFromPhysicalLayer(&ack);
    }
}
        </pre>
        <p><strong>Why It Still Fails on Noisy Channels:</strong></p>
        <ul>
          <li><strong>Lost Frame Deadlock:</strong> If a data frame is destroyed by electrical noise, the receiver never receives it and never sends an ACK. The sender waits for the ACK forever! Communication permanently freezes.</li>
          <li><strong>Lost ACK Deadlock:</strong> If the frame arrives safely but the reverse ACK is destroyed by noise, the sender again waits forever.</li>
        </ul>
      `,
      workedExamples: {
        level1: "<strong>Question:</strong> What primary problem does the Stop-and-Wait protocol solve that the Simplest protocol could not?<br><br><strong>Answer:</strong><br>It solves <strong>Flow Control</strong>. By forcing the sender to wait for an explicit ACK before sending the next frame, the sender's transmission rate is perfectly throttled to match the receiver's processing and consumption speed, eliminating buffer overflow.",
        level2: "<strong>Problem:</strong> A 1000-km fiber link has a propagation speed of $2 \\times 10^8$ m/s. Frame size is 10,000 bits and channel bandwidth is 1 Mbps. Neglecting ACK size and processing time, calculate the link utilization under Stop-and-Wait.<br><br><strong>Solution:</strong><br>1. Transmission time $T_{\\text{trans}} = \\frac{10,000 \\text{ bits}}{10^6 \\text{ bps}} = 10 \\text{ ms}$.<br>2. Propagation time $T_{\\text{prop}} = \\frac{1,000 \\times 10^3 \\text{ m}}{2 \\times 10^8 \\text{ m/s}} = 5 \\text{ ms}$.<br>3. Total cycle time $= T_{\\text{trans}} + 2 \\times T_{\\text{prop}} = 10 + 2(5) = 20 \\text{ ms}$.<br>4. Link Utilization $\\eta = \\frac{T_{\\text{trans}}}{T_{\\text{total}}} = \\frac{10 \\text{ ms}}{20 \\text{ ms}} = \\mathbf{50\\%}$.",
        level3: "<strong>Analysis of Link Inefficiency:</strong> What happens to the utilization of Stop-and-Wait if the same protocol is used on a 1 Gbps satellite link ($T_{\\text{prop}} = 250$ ms)?<br><br><strong>Calculation:</strong><br>• $T_{\\text{trans}} = \\frac{10,000 \\text{ bits}}{10^9 \\text{ bps}} = 0.01 \\text{ ms}$.<br>• $T_{\\text{prop}} = 250 \\text{ ms} \\implies 2 \\times T_{\\text{prop}} = 500 \\text{ ms}$.<br>• Utilization $\\eta = \\frac{0.01}{0.01 + 500} = \\frac{0.01}{500.01} \\approx \\mathbf{0.002\\%}$!<br><strong>Conclusion:</strong> Stop-and-Wait wastes 99.998% of the link bandwidth on high Bandwidth-Delay Product channels! This proves why pipelined Sliding Window protocols are mandatory."
      },
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Completely eliminates receiver buffer overflow.</td><td>Deadlocks permanently if a frame or ACK is lost (needs timer).</td></tr>
            <tr><td>Extremely simple sender and receiver logic.</td><td>Extremely poor channel utilization on long-delay or high-speed links.</td></tr>
            <tr><td>Requires only a 1-frame buffer at receiver.</td><td>Sender sits idle during round-trip propagation time ($RTT$).</td></tr>
          </tbody>
        </table>
      `,
      whereUsed: [
        "Communication with slow microcontrollers and smart cards",
        "Legacy XMODEM file transfer protocol over dial-up telephone modems",
        "Baseline pedagogical stepping stone to Stop-and-Wait ARQ"
      ],
      quiz: [
        {
          question: "What does the sender do immediately after transmitting a data frame in Simplex Stop-and-Wait?",
          options: [
            "It stops and waits for an acknowledgment (ACK) frame from the receiver.",
            "It transmits the next data frame immediately.",
            "It powers down the physical interface.",
            "It switches from copper to fiber transmission."
          ],
          correct: 0,
          explanation: "In Stop-and-Wait, the sender transmits exactly one frame and pauses until the receiver returns an ACK confirming receipt."
        },
        {
          question: "Why is the channel utilization of Stop-and-Wait extremely low on high-bandwidth, long-delay links?",
          options: [
            "Because transmission time is tiny compared to round-trip propagation delay, leaving the channel idle most of the time.",
            "Because ACKs are larger than data frames.",
            "Because routers drop all stop-and-wait packets.",
            "Because fiber optic cables cannot support feedback."
          ],
          correct: 0,
          explanation: "When RTT is large compared to frame transmission time, the sender spends almost all its time sitting idle waiting for the ACK to return."
        },
        {
          question: "What happens if a data frame is lost due to channel noise in the basic noiseless Stop-and-Wait protocol?",
          options: [
            "A permanent deadlock occurs: the sender waits forever for an ACK that will never arrive.",
            "The receiver automatically resends an ACK.",
            "The physical layer generates a replacement frame.",
            "The network layer sends an abort message."
          ],
          correct: 0,
          explanation: "Without a retransmission timer, losing either a data frame or an ACK causes the sender to wait indefinitely, permanently hanging the connection."
        }
      ],
      references: [
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th/6th Edition, Chapter 11.4 'Stop-and-Wait Protocol', pp. 351–353.", url: "" },
        { cite: "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Section 3.3.2 'A Simplex Stop-and-Wait Protocol'.", url: "" }
      ]
    }
  },

  "u2-simplex-noisy-channels": {
    id: "u2-simplex-noisy-channels",
    title: "Simplex Protocol for Noisy Channels",
    unit: "Unit 2 – Data Link Layer",
    unitId: "unit2",
    level: "Core",
    category: "datalink",
    difficulty: "Core",
    readingTime: "25 min",
    standard: "Forouzan Ch. 11.5 / Tanenbaum Protocol 3 (Stop-and-Wait ARQ)",
    oneLiner: "The complete, realistic Stop-and-Wait Automatic Repeat Request (ARQ) protocol incorporating error detection, retransmission timers, and 1-bit sequence numbers.",
    quickAnswer: "The Simplex Protocol for Noisy Channels (Stop-and-Wait ARQ) handles realistic, imperfect communication media where frames can be lost, damaged, or delayed. It adds three indispensable mechanisms: (1) Error detection (CRC) to discard corrupted frames, (2) Retransmission timers at the sender to recover from lost frames, and (3) Alternating 1-bit sequence numbers ($0$ and $1$) on both data frames and ACKs to eliminate duplicate frames.",
    whyItMatters: "Stop-and-Wait ARQ is the classical foundational protocol that solves both flow control and error control simultaneously. Understanding its sequence number mechanics and timeout behavior is fundamental to mastering all networking protocols (including TCP).",
    prerequisitesList: [
      { concept: "Simplex Stop-and-Wait Protocol", meaning: "Basic flow control with ACK feedback." },
      { concept: "Error Detection via CRC", meaning: "Identifying damaged frames using check bits." }
    ],
    learningObjectives: [
      "Understand why a retransmission timer is required to prevent deadlocks from lost frames.",
      "Analyze the 'Duplicate Frame Problem' that occurs when an ACK is delayed or lost.",
      "Explain how 1-bit sequence numbers (modulo-2: 0 and 1) completely eliminate duplicate frames.",
      "Trace protocol execution across 4 failure cases: lost frame, damaged frame, lost ACK, and delayed ACK."
    ],
    infobox: {
      layer: "Layer 2 (Data Link Layer)",
      standard: "Tanenbaum Protocol 3 / Forouzan Stop-and-Wait ARQ",
      type: "Reliable Noisy Channel Protocol (ARQ)",
      prerequisites: ["u2-simplex-stop-and-wait", "u2-intro-error-detection"],
      relatedConcepts: ["stop-and-wait", "go-back-n", "selective-repeat"],
      compareWith: ["comparison-arq-protocols"],
      primaryUses: ["TFTP (Trivial File Transfer Protocol)", "Bluetooth classic link manager", "Satellite command uplinks"]
    },
    imageUrl: "assets/images/unit2/topic2/stop-and-wait-arq-fsm.svg",
    imageCaption: "Figure 11.3: Stop-and-Wait ARQ Finite State Machine with Sequence Numbers 0 and 1.",
    sections: {
      overview: `
        <p>In real-world networks, physical channels are noisy: frames can be corrupted by noise spikes or completely dropped by physical transceivers. Furthermore, acknowledgment frames traveling in the reverse direction can also be lost or delayed.</p>
        <p>As documented in <em>Forouzan Chapter 11.5 (pp. 354–358)</em> and <em>Tanenbaum Protocol 3</em>, the <strong>Simplex Protocol for Noisy Channels (Stop-and-Wait ARQ)</strong> overcomes all channel imperfections by combining three core mechanisms:</p>
        <ol class="list-decimal pl-5 space-y-1 text-xs">
          <li><strong>Error Detection (CRC Trailer):</strong> Every data frame and ACK frame carries redundant check bits. Damaged frames are silently discarded by the receiver.</li>
          <li><strong>Retransmission Timer:</strong> When the sender transmits a frame, it starts a timer. If the timer expires before the corresponding ACK arrives, the sender assumes the frame (or ACK) was lost and retransmits a copy of the frame.</li>
          <li><strong>1-Bit Sequence Numbers (Modulo 2):</strong> What if a frame arrives safely, but the ACK is lost? The sender's timer expires and it retransmits the frame. Without sequence numbers, the receiver cannot distinguish whether this is a <em>new frame</em> or a <em>duplicate of the previous frame</em>! Alternating sequence numbers (<code>0</code> and <code>1</code>) solve this ambiguity permanently.</li>
        </ol>
      `,
      eli10: "Imagine ordering pizzas over a crackly walkie-talkie. If you order a pizza and the delivery driver never shows up after 30 minutes (timer expires), you order again. But what if the driver DID deliver pizza #1, but your receipt blew away in the wind? You might accidentally eat two pizzas! To prevent this, you label your orders: 'Pizza Order A', then 'Pizza Order B', then 'Pizza Order A' again. If the store sees two 'Order A's in a row, they know the second one is just a duplicate!",
      analogy: "A registered mail delivery requiring a signed return receipt with tracking numbers 0 and 1 alternating. If the postal service loses the return receipt, the sender resends the parcel labeled 'Package 0'. The recipient checks their log, sees they already signed for 'Package 0', keeps the parcel safely stored as a duplicate, and mails a fresh receipt for 'Package 0'.",
      howItWorks: `
        <p><strong>Detailed Protocol Operation:</strong></p>
        <ol class="list-decimal pl-5 space-y-2 text-xs">
          <li><strong>Initialization:</strong> Sender sequence variable $S_n = 0$; receiver expected variable $R_n = 0$.</li>
          <li><strong>Transmission:</strong> Sender encapsulates data with sequence number $S_n$, starts retransmission timer, retains a copy in memory, and transmits.</li>
          <li><strong>Normal Case:</strong> Receiver receives frame with sequence $S_n == R_n$, passes data to network layer, advances expected sequence $R_n = (R_n + 1) \\pmod 2$, and sends $ACK$ with sequence $R_n$ (indicating it now expects the next frame). Sender receives $ACK$, stops timer, purges memory copy, and advances $S_n$.</li>
          <li><strong>Lost / Damaged Data Frame:</strong> Frame is destroyed in transit. Receiver does nothing. Sender timer expires $\\implies$ retransmits frame with same $S_n$, restarts timer.</li>
          <li><strong>Lost ACK:</strong> Frame arrives, receiver accepts and sends $ACK_1$, but $ACK_1$ is lost in transit. Sender timer expires $\\implies$ retransmits frame $0$. Receiver sees sequence $0 \\ne R_n$ (since $R_n = 1$). Receiver recognizes a duplicate! It <em>discards the duplicate data</em>, but <strong>resends $ACK_1$</strong> so the sender can finally move on!</li>
        </ol>
      `,
      diagram: `
+---------------------------------------------------------------------------------+
|                   STOP-AND-WAIT ARQ FOUR FAILURE SCENARIOS                      |
+---------------------------------------------------------------------------------+
|                                                                                 |
|  SCENARIO 1: NORMAL TRANSMISSION         SCENARIO 2: LOST DATA FRAME            |
|  Sender                 Receiver         Sender                 Receiver        |
|    |-- Frame 0 ---------->| [Accept 0]     |-- Frame 0 -----X [Lost!]           |
|    |                      | [Expect 1]     |  (Timer running...)                |
|    |<- ACK 1 -------------|                |  [Timeout!]                        |
|    | [Stop timer; Send 1]                  |-- Frame 0 (Retransmit)->| [Accept] |
|                                            |<- ACK 1 ----------------|          |
|                                                                                 |
|  SCENARIO 3: DAMAGED FRAME               SCENARIO 4: LOST ACK (DUPLICATE)       |
|  Sender                 Receiver         Sender                 Receiver        |
|    |-- Frame 0 (Bad CRC)->| [Corrupt!]     |-- Frame 0 ----------->| [Accept 0] |
|    |                      | [DROP SILENTLY]|<- ACK 1 ---X [Lost!]  | [Expect 1] |
|    |  [Timeout!]          |                |  [Timeout!]           |            |
|    |-- Frame 0 (Retransmit)->| [Accept]    |-- Frame 0 (Retransmit)->| [DUPLICATE]|
|    |<- ACK 1 -------------|                |                       | [DISCARD!] |
|                                            |<- ACK 1 (Resend ACK)---|            |
+---------------------------------------------------------------------------------+
      `,
      technicalDetails: `
        <p><strong>Why 1-Bit Sequence Numbers (Modulo-2) Suffice:</strong></p>
        <p>In Stop-and-Wait, the sender can have at most <strong>one outstanding frame</strong> in transit at any given time. Therefore, at any instant, there are only two possible frames the receiver could ever see:</p>
        <ul>
          <li>The current frame being transmitted ($S_n$).</li>
          <li>A duplicate of the immediately preceding frame ($S_n - 1$) if the preceding ACK was delayed or lost.</li>
        </ul>
        <p>Because there are only 2 possible frame identities, a 1-bit sequence number space ($2^1 = 2$ states: <code>0</code> and <code>1</code>) is mathematically sufficient to distinguish between them with zero ambiguity!</p>
        <p><strong>ACK Numbering Convention (Forouzan p. 355):</strong> In Forouzan's terminology, $ACK_n$ specifies the sequence number of the <em>next frame the receiver expects to receive</em>. Thus, after successfully receiving Frame 0, the receiver sends $ACK_1$.</p>
      `,
      workedExamples: {
        level1: "<strong>Question:</strong> Why does the receiver silently discard a damaged frame in Stop-and-Wait ARQ instead of sending a Negative Acknowledgment (NAK)?<br><br><strong>Answer:</strong><br>If a frame has corrupted bits, its header fields (including the sender address and sequence number) are also corrupted and untrustworthy. Sending a NAK could acknowledge the wrong sender or wrong frame. Silently dropping the frame causes the sender's timer to expire naturally, guaranteeing a safe, clean retransmission.",
        level2: "<strong>Problem:</strong> In a Stop-and-Wait ARQ system, the sender transmits Frame 0. The frame arrives intact, but the receiver's $ACK_1$ is delayed past the timeout period. Describe the complete sequence of events until synchronization is restored.<br><br><strong>Solution:</strong><br>1. Sender timer expires. Sender retransmits Frame 0.<br>2. Delayed $ACK_1$ finally arrives at sender. Sender updates state and transmits Frame 1.<br>3. Receiver receives duplicate Frame 0. Seeing expected sequence is 1, it discards Frame 0's data, but resends $ACK_1$.<br>4. Receiver receives Frame 1. Accepts data, delivers to network layer, and sends $ACK_0$.<br>5. Sender receives duplicate $ACK_1$ (discards it harmlessly), then receives $ACK_0$ and advances.",
        level3: "<strong>Mathematical Optimization:</strong> How should the Retransmission Timeout ($RTO$) be selected in relation to Round Trip Time ($RTT$)?<br><br><strong>Analysis:</strong><br>• If $RTO < RTT$: The timer expires prematurely before legitimate ACKs can return, flooding the network with unnecessary duplicate retransmissions (false timeouts).<br>• If $RTO \\gg RTT$: When a frame is genuinely lost, the sender sits idle for an excessively long time before recovering, degrading link throughput.<br>• <strong>Optimal Rule:</strong> $RTO = \\text{Smoothed } RTT + 4 \\times \\text{Delay Variance}$ (as formalized by Jacobson's algorithm)."
      },
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages of Stop-and-Wait ARQ</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Completely robust: solves loss, corruption, delays, and duplicates.</td><td>Extremely poor bandwidth utilization on links with large delay-bandwidth product.</td></tr>
            <tr><td>Requires minimal memory: sender buffers 1 frame, receiver buffers 0 frames.</td><td>Channel remains idle during round-trip time.</td></tr>
            <tr><td>Sequence number header overhead is only 1 single bit.</td><td>Vulnerable to premature timeouts if timer is set too aggressively.</td></tr>
          </tbody>
        </table>
      `,
      whereUsed: [
        "TFTP (Trivial File Transfer Protocol) over UDP (RFC 1350)",
        "Bluetooth baseband Logical Link Control and Adaptation Protocol (L2CAP)",
        "Industrial SCADA communication over noisy serial radio links"
      ],
      quiz: [
        {
          question: "Why are 1-bit sequence numbers (0 and 1) necessary in Stop-and-Wait ARQ?",
          options: [
            "To allow the receiver to detect and discard duplicate frames caused by lost or delayed ACKs.",
            "To count the total number of packets sent in a session.",
            "To encrypt the data payload.",
            "To route frames across intermediate switches."
          ],
          correct: 0,
          explanation: "If an ACK is lost, the sender retransmits the frame. Without sequence numbers, the receiver cannot tell if the frame is a duplicate or new data."
        },
        {
          question: "What action does the receiver take when it receives a frame whose sequence number does NOT match the expected sequence number Rn?",
          options: [
            "It discards the data as a duplicate, but resends the ACK to acknowledge receipt.",
            "It crashes the protocol stack.",
            "It delivers the duplicate data to the network layer.",
            "It sends an ICMP destination unreachable message."
          ],
          correct: 0,
          explanation: "The receiver must discard duplicate payload to avoid duplicating data in the upper layer, but must resend the ACK so the sender knows the frame was received."
        },
        {
          question: "According to Forouzan, what does the number in ACK_n represent?",
          options: [
            "The sequence number of the NEXT frame the receiver expects to receive.",
            "The sequence number of the frame that was just lost.",
            "The total number of errors encountered so far.",
            "The receiver buffer size in kilobytes."
          ],
          correct: 0,
          explanation: "In Forouzan's terminology, ACK_n is cumulative and forward-looking: it confirms receipt of all previous frames and announces that the receiver is ready for frame n."
        }
      ],
      references: [
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th/6th Edition, Chapter 11.5 'Stop-and-Wait ARQ', pp. 354–358.", url: "" },
        { cite: "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Section 3.3.3 'A Simplex Protocol for a Noisy Channel'.", url: "" }
      ]
    }
  }
};

module.exports = part2Topics;

