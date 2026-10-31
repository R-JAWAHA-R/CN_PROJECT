const fs = require('fs');
const path = require('path');

const topics = {};

function addTopic(id, data) {
  topics[id] = {
    id: id,
    title: data.title,
    unit: "Unit 2 – Data Link Layer",
    unitId: "unit2",
    level: data.level || "Intermediate",
    category: "datalink",
    difficulty: data.difficulty || "Core",
    readingTime: data.readingTime || "15–20 min",
    standard: data.standard || "Forouzan / Tanenbaum Layer 2",
    oneLiner: data.oneLiner,
    quickAnswer: data.quickAnswer,
    whyItMatters: data.whyItMatters,
    prerequisitesList: data.prerequisitesList || [
      { concept: "OSI Layer 2", meaning: "Data Link Layer framing and link control" },
      { concept: "Node-to-Node Delivery", meaning: "Transfer of frames across a single physical link" }
    ],
    learningObjectives: data.learningObjectives || [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    infobox: Object.assign({
      layer: "Layer 2 (Data Link Layer)",
      standard: "IEEE 802 / ISO 7498-1",
      type: "Core Protocol Concept",
      prerequisites: ["u2-dll-intro"],
      relatedConcepts: ["framing", "mac-address", "error-detection"],
      compareWith: [],
      primaryUses: ["Local Area Networks, Ethernet, Wi-Fi, Link Control"]
    }, data.infobox || {}),
    sections: {
      overview: data.overview,
      eli10: data.eli10 || `In simple words: ${data.oneLiner}`,
      analogy: data.analogy || `Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.`,
      howItWorks: data.howItWorks,
      diagram: data.diagram || `+-----------------------------------------+\n|      DATA LINK LAYER OPERATION          |\n+-----------------------------------------+`,
      technicalDetails: data.technicalDetails,
      workedExamples: data.workedExamples || {
        level1: `<strong>Question:</strong> What is the core principle of ${data.title}?<br><br><strong>Answer:</strong> ${data.quickAnswer}`,
        level2: `<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.`,
        level3: `<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine.`
      },
      advantagesLimitations: data.advantagesLimitations || `
        <table class="wiki-table">
          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>
          <tbody>
            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>
            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>
          </tbody>
        </table>`,
      whereUsed: data.whereUsed || [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      quiz: data.quiz || [
        {
          question: `What is the primary function of ${data.title}?`,
          options: [data.quickAnswer.slice(0, 60) + "...", "Routing packets across the global Internet", "Resolving domain names to IP addresses", "Encrypting application payloads"],
          correct: 0,
          explanation: `The primary role is: ${data.quickAnswer}`
        }
      ],
      references: [
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.", url: "" },
        { cite: "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.", url: "" }
      ]
    }
  };
}

// -------------------------------------------------------------
// TOPIC 1: DLL FUNDAMENTALS (PDF Pages 1-26)
// -------------------------------------------------------------
addTopic("u2-dll-intro", {
  title: "Introduction to Data Link Layer",
  level: "Beginner",
  standard: "Forouzan Ch. 11.1 / OSI Layer 2",
  oneLiner: "The second layer of the OSI model providing reliable node-to-node frame delivery across directly connected network devices.",
  quickAnswer: "The Data Link Layer is the second layer of the OSI model, situated between the Physical and Network layers. It organizes raw bitstreams into frames, handles physical addressing, error detection, flow control, and arbitrates access to shared media.",
  whyItMatters: "The Physical Layer only transmits unstructured bits without boundaries or error checks. The Data Link Layer enables meaningful, controlled communication over individual links.",
  overview: `
    <p>The <strong>Data Link Layer</strong> is the second layer of the OSI reference model, located between the Physical Layer (Layer 1) and the Network Layer (Layer 3).</p>
    <p>Its primary responsibility is to provide communication between two directly connected network devices by organizing raw bits received from the Physical Layer into meaningful units called <strong>frames</strong>. It ensures data is transferred across a physical link in an organized and controlled manner.</p>
    <div class="wiki-img-box my-4 text-center">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/OSI_Model_v1.svg/600px-OSI_Model_v1.svg.png" alt="OSI Reference Model" class="mx-auto rounded-lg shadow border border-gray-200 dark:border-gray-700 max-h-80 object-contain" onerror="this.style.display='none'">
      <p class="text-xs text-gray-500 mt-1 italic">Figure: Data Link Layer in the OSI 7-Layer Reference Model.</p>
    </div>
    <h4 class="font-bold text-sm my-2 text-gray-900 dark:text-white">Example Transmission: Computer A to Computer B</h4>
    <ol class="wiki-ordered-list">
      <li>The Network Layer provides an IP packet to the Data Link Layer.</li>
      <li>The Data Link Layer organizes the packet into a frame by prepending a header and appending a trailer.</li>
      <li>The frame is passed down to the Physical Layer.</li>
      <li>The Physical Layer transmits the raw bits through the cable as electrical or optical signals.</li>
      <li>The receiving Data Link Layer receives the bits and reconstructs the frame.</li>
      <li>It checks the frame for errors and passes the decapsulated packet up to the Network Layer.</li>
    </ol>`,
  howItWorks: `
    <p>The Data Link Layer interacts with two neighboring layers:</p>
    <ul class="wiki-bullet-list">
      <li><strong>Network Layer (Layer 3):</strong> Receives packets, encapsulates them into frames, and provides a uniform service interface.</li>
      <li><strong>Physical Layer (Layer 1):</strong> Transmits frames as sequences of bits and receives incoming bitstreams from the physical medium.</li>
    </ul>`,
  diagram: `
+-------------------------------------------------------------------------+
|                  DATA LINK LAYER NODE-TO-NODE DELIVERY                  |
+-------------------------------------------------------------------------+
       SENDER (Computer A)                         RECEIVER (Computer B)
  +-----------------------+                    +-----------------------+
  |  Layer 3: Network     |                    |  Layer 3: Network     |
  |     [IP Packet]       |                    |     [IP Packet]       |
  +-----------+-----------+                    +-----------^-----------+
              | (Encapsulate)                              | (Decapsulate)
  +-----------v-----------+                    +-----------+-----------+
  |  Layer 2: Data Link   |                    |  Layer 2: Data Link   |
  | [H][  IP Packet  ][T] |                    | [H][  IP Packet  ][T] |
  +-----------+-----------+                    +-----------^-----------+
              | (Bits)                                     | (Bits)
  +-----------v-----------+    Physical Link   +-----------+-----------+
  |  Layer 1: Physical    | =================> |  Layer 1: Physical    |
  | 1 0 1 1 0 1 0 0 1 ... |  (Copper / Fiber)  | 1 0 1 1 0 1 0 0 1 ... |
  +-----------------------+                    +-----------------------+`,
  technicalDetails: `
    <p><strong>OSI Layers and Their Respective Data Units:</strong></p>
    <table class="wiki-table">
      <thead><tr><th>Layer</th><th>Layer Name</th><th>Data Unit (PDU)</th><th>Main Responsibility</th></tr></thead>
      <tbody>
        <tr><td>7</td><td>Application</td><td>Data / Message</td><td>Network services for applications</td></tr>
        <tr><td>6</td><td>Presentation</td><td>Data</td><td>Data representation and encryption</td></tr>
        <tr><td>5</td><td>Session</td><td>Data</td><td>Session management and dialog control</td></tr>
        <tr><td>4</td><td>Transport</td><td>Segment / Datagram</td><td>End-to-end data delivery (TCP/UDP)</td></tr>
        <tr><td>3</td><td>Network</td><td>Packet</td><td>Host-to-host routing across networks</td></tr>
        <tr class="bg-blue-50 dark:bg-blue-900/30 font-bold"><td>2</td><td>Data Link</td><td>Frame</td><td>Node-to-node frame delivery across links</td></tr>
        <tr><td>1</td><td>Physical</td><td>Bits</td><td>Transmission of raw physical signals</td></tr>
      </tbody>
    </table>`
});

addTopic("u2-dll-osi-position", {
  title: "Position in the OSI Model",
  level: "Beginner",
  standard: "ISO 7498-1 / OSI Architecture",
  oneLiner: "Layer 2's role bridging hardware-level signal transmission and software-driven logical routing.",
  quickAnswer: "The Data Link Layer is Layer 2 of the OSI model, located directly above the Physical Layer (Layer 1) and below the Network Layer (Layer 3). It translates physical bit pulses into logical frames.",
  whyItMatters: "Properly distinguishing Layer 2 from Layer 1 and Layer 3 is crucial for designing network equipment like switches, NIC drivers, and understanding MAC vs IP addresses.",
  overview: `
    <p>The Data Link Layer occupies Layer 2 in the 7-layer OSI model. It acts as the mediator between the hardware-specific world of bits and signals and the logical, software-driven world of IP packets and internetwork routing.</p>
    <div class="wiki-img-box my-4 text-center">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Frame_data_link_layer.svg/600px-Frame_data_link_layer.svg.png" alt="Frame Data Link Layer" class="mx-auto rounded-lg shadow border border-gray-200 dark:border-gray-700 max-h-80 object-contain" onerror="this.style.display='none'">
      <p class="text-xs text-gray-500 mt-1 italic">Figure: Data Link Layer Frame encapsulation structure with Header, Payload, and Trailer.</p>
    </div>`,
  howItWorks: `
    <p><strong>Physical Layer vs Data Link Layer (PDF Section 8.1 Comparison):</strong></p>
    <table class="wiki-table">
      <thead><tr><th>Feature</th><th>Physical Layer (Layer 1)</th><th>Data Link Layer (Layer 2)</th></tr></thead>
      <tbody>
        <tr><td><strong>Position</strong></td><td>Layer 1</td><td>Layer 2</td></tr>
        <tr><td><strong>Data Unit</strong></td><td>Transmits raw bits</td><td>Transmits structured frames</td></tr>
        <tr><td><strong>Scope of Operation</strong></td><td>Deals with electrical, optical, radio signals</td><td>Deals with frame organization and link control</td></tr>
        <tr><td><strong>Service Provided</strong></td><td>Defines physical transmission characteristics</td><td>Provides reliable link services to Network Layer</td></tr>
        <tr><td><strong>Concern</strong></td><td>Bit transmission over wire</td><td>Node-to-node frame delivery and flow/error control</td></tr>
      </tbody>
    </table>`,
  diagram: `
+-------------------------------------------------------------+
| Layer 3: Network Layer (IP Packets, Subnets, Routing)       |
+------------------------------+------------------------------+
                               | Packets
+------------------------------v------------------------------+
| LAYER 2: DATA LINK LAYER (Frames, MAC Addresses, FCS, ARQ)   |
+------------------------------+------------------------------+
                               | Bits
+------------------------------v------------------------------+
| Layer 1: Physical Layer (Voltage, Frequencies, Photons)     |
+-------------------------------------------------------------+`,
  technicalDetails: `
    <p><strong>Comparison of Addresses (PDF Section 2.6):</strong></p>
    <table class="wiki-table">
      <thead><tr><th>Attribute</th><th>Physical Address (MAC)</th><th>Logical Address (IP)</th></tr></thead>
      <tbody>
        <tr><td><strong>Layer</strong></td><td>Data Link Layer (Layer 2)</td><td>Network Layer (Layer 3)</td></tr>
        <tr><td><strong>Scope</strong></td><td>Used for delivery over a local link</td><td>Used for communication across interconnected networks</td></tr>
        <tr><td><strong>Format</strong></td><td>48-bit hex (e.g., <code>00:1A:2B:3C:4D:5E</code>)</td><td>32-bit (IPv4) or 128-bit (IPv6)</td></tr>
      </tbody>
    </table>`
});

addTopic("u2-dll-functions", {
  title: "Functions and Responsibilities of Data Link Layer",
  level: "Beginner",
  standard: "Forouzan Ch. 11 / Tanenbaum Ch. 3",
  oneLiner: "The 5 critical duties: Framing, Physical Addressing, Flow Control, Error Control, and Access Control.",
  quickAnswer: "The Data Link Layer has 5 core responsibilities: (1) Framing (grouping bits into frames), (2) Physical Addressing (hardware MAC addresses), (3) Flow Control (preventing buffer overflow), (4) Error Control (detecting and recovering damaged frames), and (5) Access Control (arbitrating shared channels).",
  whyItMatters: "These 5 functions represent the complete problem space solved by every Layer 2 protocol in existence.",
  overview: `
    <p>As detailed in Behrouz A. Forouzan's textbook (Chapter 11), the Data Link Layer is tasked with five critical functions:</p>
    <ol class="wiki-ordered-list">
      <li><strong>Framing:</strong> Divides the stream of bits into manageable units called frames.</li>
      <li><strong>Physical Addressing:</strong> Uses hardware addresses (MAC) to identify devices on a local link.</li>
      <li><strong>Flow Control:</strong> Prevents a fast sender from overwhelming a slower receiver.</li>
      <li><strong>Error Control:</strong> Helps detect damaged or lost frames and coordinates retransmission via ARQ.</li>
      <li><strong>Access Control:</strong> Determines which device can use a shared communication medium at any given time.</li>
    </ol>`,
  howItWorks: `
    <p><strong>Framing vs Flow Control vs Error Control (PDF Section 8.2 Comparison):</strong></p>
    <table class="wiki-table">
      <thead><tr><th>Feature</th><th>Framing</th><th>Flow Control</th><th>Error Control</th></tr></thead>
      <tbody>
        <tr><td><strong>Function</strong></td><td>Organizes bits into frames</td><td>Regulates transmission rate</td><td>Handles transmission errors</td></tr>
        <tr><td><strong>Purpose</strong></td><td>Identifies frame boundaries</td><td>Prevents receiver overload</td><td>Helps detect and recover from errors</td></tr>
        <tr><td><strong>Mechanisms</strong></td><td>Uses delimiters, length fields, or stuffing</td><td>Uses acknowledgements or window mechanisms</td><td>Uses detection codes (CRC), ACKs, timers, ARQ</td></tr>
      </tbody>
    </table>`,
  diagram: `
+----------------------------------------------------------------------+
|                 DATA LINK LAYER FUNCTIONS OVERVIEW                   |
+----------------------------------------------------------------------+
  1. FRAMING             -> Divides bitstream into discrete frames
  2. PHYSICAL ADDRESSING -> 48-bit MAC addressing on local broadcast links
  3. FLOW CONTROL        -> Prevents receiver buffer overflow
  4. ERROR CONTROL       -> Detects bit errors (CRC) and triggers ARQ
  5. ACCESS CONTROL      -> Arbitrates shared multiaccess medium (CSMA/CD)`,
  technicalDetails: `
    <p><strong>Summary of Design Issues (PDF Section 2.8):</strong></p>
    <table class="wiki-table">
      <thead><tr><th>Design Issue</th><th>Purpose</th></tr></thead>
      <tbody>
        <tr><td>Service Interface</td><td>Provides well-defined services to the Network Layer</td></tr>
        <tr><td>Framing</td><td>Divides continuous bit stream into frames</td></tr>
        <tr><td>Flow Control</td><td>Prevents receiver buffer overload</td></tr>
        <tr><td>Error Control</td><td>Detects and handles transmission errors</td></tr>
        <tr><td>Physical Addressing</td><td>Identifies devices on a local link</td></tr>
        <tr><td>Access Control</td><td>Controls the use of a shared medium</td></tr>
      </tbody>
    </table>`
});

addTopic("u2-dll-services", {
  title: "Services Provided to the Network Layer",
  level: "Intermediate",
  standard: "Forouzan Ch. 11.1 / Tanenbaum Ch. 3.1",
  oneLiner: "The three classic service models: Unacknowledged Connectionless, Acknowledged Connectionless, and Acknowledged Connection-Oriented.",
  quickAnswer: "The Data Link Layer provides three classes of service: Unacknowledged Connectionless (fast, no ACKs, e.g., Ethernet), Acknowledged Connectionless (independent frames with ACKs, e.g., 802.11 Wi-Fi), and Acknowledged Connection-Oriented (established logical connection, guaranteed order, e.g., HDLC).",
  whyItMatters: "Different transmission channels have different error rates. Matching the service class to the channel maximizes throughput while maintaining required reliability.",
  overview: `
    <p>The Data Link Layer provides three primary service models to the Network Layer (PDF Section 3):</p>
    <div class="space-y-4 my-4">
      <div class="p-3 bg-blue-50/50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
        <strong>1. Unacknowledged Connectionless Service:</strong>
        <p class="text-xs mt-1">Sends independent frames without establishing a connection and without expecting acknowledgements. Lost frames are not recovered at Layer 2. Ideal for low-error media like Ethernet LANs.</p>
      </div>
      <div class="p-3 bg-emerald-50/50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded">
        <strong>2. Acknowledged Connectionless Service:</strong>
        <p class="text-xs mt-1">Frames are sent independently, but each frame is acknowledged by the receiver. If an ACK does not arrive within a timeout, the frame is retransmitted. Used in wireless links (IEEE 802.11 Wi-Fi).</p>
      </div>
      <div class="p-3 bg-purple-50/50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded">
        <strong>3. Acknowledged Connection-Oriented Service:</strong>
        <p class="text-xs mt-1">Establishes a logical connection prior to data transfer. Consists of 3 phases: Connection Establishment, Data Transfer, and Connection Termination. Guaranteed ordered delivery.</p>
      </div>
    </div>`,
  howItWorks: `
    <p><strong>Master Comparison Table (PDF Section 3.4):</strong></p>
    <table class="wiki-table">
      <thead><tr><th>Feature</th><th>Unacknowledged Connectionless</th><th>Acknowledged Connectionless</th><th>Acknowledged Connection-Oriented</th></tr></thead>
      <tbody>
        <tr><td><strong>Connection Setup</strong></td><td>No</td><td>No</td><td>Yes</td></tr>
        <tr><td><strong>Acknowledgement</strong></td><td>No</td><td>Yes</td><td>Yes</td></tr>
        <tr><td><strong>Frame Recovery</strong></td><td>Not provided by this service</td><td>Yes (retransmissions)</td><td>Yes (retransmissions)</td></tr>
        <tr><td><strong>Ordering</strong></td><td>Not guaranteed</td><td>Not generally guaranteed</td><td>Maintained strictly</td></tr>
        <tr><td><strong>Complexity</strong></td><td>Low</td><td>Medium</td><td>High</td></tr>
        <tr><td><strong>Overhead</strong></td><td>Low</td><td>Higher</td><td>Higher</td></tr>
        <tr><td><strong>Typical Use</strong></td><td>Traditional Ethernet data frames</td><td>Wireless frame delivery (802.11)</td><td>Reliable link-oriented communication</td></tr>
      </tbody>
    </table>`,
  diagram: `
+-------------------------------------------------------------------------+
|                  DATA LINK LAYER SERVICE COMPARISON                     |
+-------------------------------------------------------------------------+
  1. UNACKNOWLEDGED CONNECTIONLESS:
     Sender ---- Frame 1 ----> Receiver (No ACK)
     Sender ---- Frame 2 ----> Receiver (No ACK)

  2. ACKNOWLEDGED CONNECTIONLESS:
     Sender ---- Frame 1 ----> Receiver
     Sender <---  ACK 1  ---- Receiver
     Sender ---- Frame 2 ----> Receiver

  3. ACKNOWLEDGED CONNECTION-ORIENTED:
     Phase 1: Connection Establishment Handshake
     Phase 2: In-Order Data Transfer with Sequence Numbers & Sliding Window
     Phase 3: Connection Termination Handshake`,
  technicalDetails: `
    <p><strong>Important Distinction (PDF Section 3.4 Note):</strong></p>
    <p class="text-xs">These are Data Link Layer service categories. They must not be confused with the connection-oriented (TCP) and connectionless (UDP) services of the Transport Layer. Transport services operate end-to-end across multiple routers, whereas Data Link services operate strictly across a single hop.</p>`
});

addTopic("u2-error-control", {
  title: "Error Control in the Data Link Layer",
  level: "Intermediate",
  standard: "Forouzan Ch. 11.2 / Tanenbaum Ch. 3.4",
  oneLiner: "Detecting and handling damaged, lost, or duplicated frames using CRC, ACKs, timers, and ARQ.",
  quickAnswer: "Error control is a mechanism used by the Data Link Layer to detect and handle transmission errors that occur due to noise, attenuation, or interference. It utilizes error detection (e.g., CRC-32), positive ACKs, negative NAKs, retransmission timers, sequence numbers, and Automatic Repeat Request (ARQ).",
  whyItMatters: "Without error control, bit errors caused by physical interference would corrupt user files, protocols, and application payloads undetected.",
  overview: `
    <p>Transmission errors occur when frames are damaged, lost, or duplicated during transit due to electrical noise, signal attenuation, or wireless interference. Error control ensures that the receiver obtains accurate, uncorrupted data (PDF Section 6).</p>
    <div class="wiki-img-box my-4 text-center">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Stop-and-wait_ARQ.svg/500px-Stop-and-wait_ARQ.svg.png" alt="Stop and wait ARQ" class="mx-auto rounded-lg shadow border border-gray-200 dark:border-gray-700 max-h-80 object-contain" onerror="this.style.display='none'">
      <p class="text-xs text-gray-500 mt-1 italic">Figure: Automatic Repeat Request (ARQ) retransmission mechanism on timeout.</p>
    </div>`,
  howItWorks: `
    <p><strong>Main Functions of Error Control:</strong></p>
    <ol class="wiki-ordered-list">
      <li><strong>Error Detection:</strong> Receiver calculates Frame Check Sequence (CRC) to detect bit alterations.</li>
      <li><strong>Acknowledgement (ACK):</strong> Receiver confirms successful receipt of error-free frames.</li>
      <li><strong>Negative Acknowledgement (NAK):</strong> Informs sender that a received frame was damaged.</li>
      <li><strong>Retransmission:</strong> Sender resends damaged or lost frames.</li>
      <li><strong>Sequence Numbering:</strong> Identifies frames to detect duplicate or out-of-order deliveries.</li>
      <li><strong>Timers:</strong> Sender detects missing ACKs when the timer expires.</li>
    </ol>`,
  diagram: `
+-------------------------------------------------------------------------+
|                  ERROR RECOVERY VIA RETRANSMISSION                      |
+-------------------------------------------------------------------------+
    SENDER                                           RECEIVER
      |                                                 |
      | ------------- Frame 0 ------------------------> | (OK)
      | <------------ ACK 1 --------------------------- |
      |                                                 |
      | ------------- Frame 1 --------X [LOST]          |
      |   [Timer Started]                               |
      |          .                                      |
      |   [TIMER EXPIRES!]                              |
      |                                                 |
      | ------------- Frame 1 [Retransmission] -------> | (OK)
      | <------------ ACK 2 --------------------------- |
      v                                                 v`,
  technicalDetails: `
    <p><strong>Flow Control vs Error Control (PDF Section 6.6):</strong></p>
    <table class="wiki-table">
      <thead><tr><th>Feature</th><th>Flow Control</th><th>Error Control</th></tr></thead>
      <tbody>
        <tr><td><strong>Primary Duty</strong></td><td>Controls the rate of data transmission</td><td>Handles transmission errors</td></tr>
        <tr><td><strong>Key Problem Solved</strong></td><td>Prevents receiver overload</td><td>Helps recover from damaged or lost frames</td></tr>
        <tr><td><strong>Root Cause</strong></td><td>Manages sender and receiver speed differences</td><td>Manages frame delivery problems from noise/loss</td></tr>
        <tr><td><strong>Key Methods</strong></td><td>Stop-and-Wait, Sliding Window</td><td>CRC-32, ARQ (Stop-and-Wait, GBN, SR)</td></tr>
        <tr><td><strong>Focus</strong></td><td>Focuses on receiver capacity</td><td>Focuses on data correctness and recovery</td></tr>
      </tbody>
    </table>`
});

// -------------------------------------------------------------
// TOPIC 2: DATA LINK LAYER PROTOCOLS
// -------------------------------------------------------------
addTopic("u2-dll-protocols-intro", {
  title: "Introduction to Data Link Layer Protocols",
  level: "Beginner",
  standard: "Forouzan Ch. 11.2 / Tanenbaum Ch. 3.3",
  oneLiner: "The rules, state machines, and algorithms governing node-to-node frame transmission across communication channels.",
  quickAnswer: "Data Link Layer protocols are formalized sets of procedures that govern how two communicating network devices exchange frames, handle flow control, detect errors, and retransmit lost packets over physical links.",
  whyItMatters: "Hardware alone cannot coordinate communication; protocols define the state machines, message formats, and timing required for reliable link operation.",
  overview: `<p>A <strong>Data Link Layer Protocol</strong> defines the operational rules, packet framing formats, state machines, and recovery procedures that allow two directly connected machines to communicate across a link.</p><p>In standard curricula, data link protocols are split into <strong>Noiseless Channel Protocols</strong> and <strong>Noisy Channel Protocols</strong>.</p>`
});

addTopic("u2-protocol-classification", {
  title: "Classification of Protocols",
  level: "Beginner",
  standard: "Forouzan Ch. 11 / Kurose & Ross Ch. 5",
  oneLiner: "Taxonomy of link protocols divided into Noiseless Channel protocols and Noisy Channel ARQ protocols.",
  quickAnswer: "Data Link Layer protocols are classified into: (1) Protocols for Noiseless Channels (Simplest Protocol, Stop-and-Wait Protocol), and (2) Protocols for Noisy Channels (Stop-and-Wait ARQ, Go-Back-N ARQ, Selective Repeat ARQ).",
  whyItMatters: "Understanding protocol classification helps students see how simple theoretical models evolve into robust real-world sliding window protocols.",
  overview: `<p>Data Link protocols are systematically categorized based on channel characteristics and transmission complexity:</p><table class="wiki-table"><thead><tr><th>Channel Type</th><th>Protocols</th><th>Key Features</th></tr></thead><tbody><tr><td><strong>Noiseless Channels</strong></td><td>1. Simplest Protocol<br>2. Stop-and-Wait Protocol</td><td>No error detection or retransmission needed; Stop-and-Wait adds flow control feedback.</td></tr><tr><td><strong>Noisy Channels (ARQ)</strong></td><td>1. Stop-and-Wait ARQ<br>2. Go-Back-N ARQ<br>3. Selective Repeat ARQ</td><td>Handles lost, damaged, and duplicated frames using sequence numbers, ACKs, and timers.</td></tr></tbody></table>`
});

addTopic("stop-and-wait-noiseless", {
  title: "Stop-and-Wait Protocol",
  level: "Beginner",
  standard: "Forouzan Ch. 11.2",
  oneLiner: "A noiseless protocol incorporating flow control feedback: the sender sends one frame and waits for an ACK before sending the next.",
  quickAnswer: "The Stop-and-Wait Protocol for noiseless channels provides flow control without error control. The sender transmits a frame, halts transmission, and waits until the receiver sends a confirmation (ACK) indicating it has processed the frame and is ready for the next.",
  whyItMatters: "It illustrates pure flow control in isolation from error control, demonstrating how feedback prevents receiver buffer overflow.",
  overview: `<p>In the <strong>Simplest Protocol</strong>, the sender continuously transmits frames assuming the receiver has infinite processing speed and buffer space. In reality, a receiver may be overwhelmed. The <strong>Stop-and-Wait Protocol for Noiseless Channels</strong> adds flow control by requiring the sender to wait for an explicit acknowledgement from the receiver before sending the next frame.</p>`
});

addTopic("comparison-noiseless-noisy", {
  title: "Comparison of Noiseless and Noisy Channel Protocols",
  level: "Intermediate",
  standard: "Forouzan Ch. 11",
  oneLiner: "Contrasting idealized zero-error protocols with realistic error-handling ARQ protocols.",
  quickAnswer: "Noiseless protocols assume error-free physical transmission and only address flow control, while noisy channel protocols introduce sequence numbers, timers, CRC checksums, and retransmission mechanisms (ARQ) to survive channel corruption and packet loss.",
  whyItMatters: "Real physical channels are never noiseless. Comparing both reveals why sequence numbers and timers are mandatory in real networks.",
  overview: `<table class="wiki-table"><thead><tr><th>Feature</th><th>Noiseless Channel Protocols</th><th>Noisy Channel Protocols (ARQ)</th></tr></thead><tbody><tr><td><strong>Channel Assumption</strong></td><td>Ideal; zero bit corruption or loss</td><td>Realistic; frames can be damaged or lost</td></tr><tr><td><strong>Error Detection (CRC)</strong></td><td>Not required</td><td>Mandatory Frame Check Sequence</td></tr><tr><td><strong>Retransmission Timers</strong></td><td>None</td><td>Sender maintains countdown timers</td></tr><tr><td><strong>Sequence Numbers</strong></td><td>Not needed</td><td>Required to detect duplicate frames</td></tr><tr><td><strong>Examples</strong></td><td>Simplest, Stop-and-Wait Noiseless</td><td>Stop-and-Wait ARQ, Go-Back-N, Selective Repeat</td></tr></tbody></table>`
});

addTopic("comparison-arq-protocols", {
  title: "Comparison of ARQ Protocols",
  level: "Intermediate",
  standard: "Forouzan Ch. 11 / Tanenbaum Ch. 3",
  oneLiner: "Master comparative analysis of Stop-and-Wait ARQ, Go-Back-N ARQ, and Selective Repeat ARQ.",
  quickAnswer: "Stop-and-Wait ARQ has sender/receiver window size 1/1 and low efficiency. Go-Back-N ARQ pipelines frames with sender window 2^m - 1 and receiver window 1, retransmitting all unacknowledged frames on error. Selective Repeat ARQ has symmetric sender/receiver windows 2^(m-1), retransmitting only damaged frames.",
  whyItMatters: "This is one of the most heavily tested topics in university and GATE examinations, and governs how TCP and link layers achieve high throughput.",
  overview: `<p>Sliding window ARQ protocols trade protocol complexity for link utilization:</p><div class="wiki-img-box my-4 text-center"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Go-Back-N_ARQ.svg/500px-Go-Back-N_ARQ.svg.png" alt="Go Back N ARQ" class="mx-auto rounded-lg shadow border border-gray-200 dark:border-gray-700 max-h-80 object-contain" onerror="this.style.display='none'"><p class="text-xs text-gray-500 mt-1 italic">Figure: Go-Back-N ARQ pipeline transmission and retransmission.</p></div><table class="wiki-table"><thead><tr><th>Parameter</th><th>Stop-and-Wait ARQ</th><th>Go-Back-N ARQ</th><th>Selective Repeat ARQ</th></tr></thead><tbody><tr><td><strong>Sender Window Size (Ws)</strong></td><td>1</td><td>2^m - 1</td><td>2^(m-1)</td></tr><tr><td><strong>Receiver Window Size (Wr)</strong></td><td>1</td><td>1</td><td>2^(m-1)</td></tr><tr><td><strong>Retransmission on Error</strong></td><td>Single lost frame</td><td>All N frames in current window</td><td>Only the specific damaged frame</td></tr><tr><td><strong>Receiver Buffering</strong></td><td>No buffer needed</td><td>Discards out-of-order frames</td><td>Buffers out-of-order frames</td></tr><tr><td><strong>Link Utilization</strong></td><td>1 / (1 + 2a)</td><td>N / (1 + 2a) (up to 100%)</td><td>N / (1 + 2a) (up to 100%)</td></tr><tr><td><strong>Complexity</strong></td><td>Minimal</td><td>Moderate</td><td>High (sorting buffer, timer per frame)</td></tr></tbody></table>`
});

// -------------------------------------------------------------
// TOPIC 3: MEDIUM ACCESS CONTROL (MAC) SUBLAYER
// -------------------------------------------------------------
addTopic("u2-mac-sublayer-intro", {
  title: "Introduction to MAC Sublayer",
  level: "Beginner",
  standard: "IEEE 802.3 / Tanenbaum Ch. 4",
  oneLiner: "The lower sublayer of OSI Layer 2 responsible for managing access to shared multi-station transmission media.",
  quickAnswer: "The Medium Access Control (MAC) sublayer is the lower portion of the Data Link Layer in IEEE 802 LAN architecture. It directly interfaces with the physical layer, provides physical addressing, and arbitrates access when multiple computers share a single transmission channel.",
  whyItMatters: "Whenever a communication medium is shared (like Wi-Fi airwaves or classic coaxial cables), two simultaneous transmissions collide. The MAC sublayer prevents or resolves these collisions.",
  overview: `<p>In IEEE 802 LAN architectures, the Data Link Layer is partitioned into the <strong>Logical Link Control (LLC)</strong> sublayer above, and the <strong>Medium Access Control (MAC)</strong> sublayer below. The MAC sublayer determines which device has permission to transmit across a shared broadcast medium.</p>`
});

addTopic("u2-need-for-mac-sublayer", {
  title: "Need for MAC Sublayer",
  level: "Beginner",
  standard: "Tanenbaum Ch. 4.1",
  oneLiner: "Why multiaccess broadcast links require coordinated medium access arbitration to avoid destructive collisions.",
  quickAnswer: "In point-to-point links with only two dedicated endpoints, no contention exists. However, in broadcast networks where multiple stations share a single wire or radio channel, simultaneous transmissions interfere and garble signals. The MAC sublayer is needed to coordinate channel access.",
  whyItMatters: "Without a MAC sublayer, shared channels like Ethernet and Wi-Fi would suffer constant packet collisions, rendering data transmission completely impossible.",
  overview: `<p>When multiple computers are attached to a shared broadcast channel, any station transmitting at the same time as another causes electromagnetic signals to overlap, garbling the data in a <strong>collision</strong>. The MAC sublayer implements arbitration protocols to prevent or recover from these collisions.</p>`
});

addTopic("u2-mac-functions-responsibilities", {
  title: "Functions and Responsibilities of MAC Sublayer",
  level: "Intermediate",
  standard: "IEEE 802 / Tanenbaum Ch. 4",
  oneLiner: "Media arbitration, physical MAC addressing, frame delimiting, and error detection at the hardware layer.",
  quickAnswer: "The MAC sublayer handles: (1) Medium access arbitration (ALOHA, CSMA/CD, CSMA/CA, token passing), (2) Physical MAC addressing (source & destination 48-bit addresses), (3) Frame assembly & disassembly (preamble, SFD, FCS), and (4) Frame check sequence error detection.",
  whyItMatters: "The MAC sublayer represents the bridge where software protocols meet physical transceiver silicon.",
  overview: `<p>The MAC sublayer is responsible for physical frame encapsulation, appending 48-bit hardware MAC addresses, computing CRC-32 checksums, and executing channel allocation algorithms that dictate when the hardware transceiver is permitted to transmit.</p>`
});

addTopic("u2-fdma", {
  title: "Frequency Division Multiple Access (FDMA)",
  level: "Intermediate",
  standard: "Forouzan Ch. 12 / Kurose & Ross Ch. 5",
  oneLiner: "Static channel allocation dividing the total frequency band into dedicated, non-overlapping frequency sub-bands.",
  quickAnswer: "FDMA is a channelization technique where the available transmission frequency band is divided into distinct frequency channels. Each station is allocated a dedicated frequency band for the entire duration of transmission, separated by guard bands to prevent crosstalk.",
  whyItMatters: "FDMA is foundational in radio broadcasting, 1G analog cellular networks, satellite uplinks/downlinks, and cable TV networks.",
  overview: `<p>In <strong>Frequency Division Multiple Access (FDMA)</strong>, the total available frequency bandwidth is split into $N$ distinct frequency channels. Each communicating pair is assigned an exclusive channel, completely eliminating transmission collisions.</p>`
});

addTopic("u2-tdma", {
  title: "Time Division Multiple Access (TDMA)",
  level: "Intermediate",
  standard: "Forouzan Ch. 12 / Tanenbaum Ch. 4",
  oneLiner: "Static channel allocation where stations share the entire frequency band by taking turns in dedicated time slots.",
  quickAnswer: "TDMA divides transmission time into discrete recurring frames, each composed of a fixed number of synchronized time slots. Each station is assigned an exclusive slot in every frame, transmitting at the full channel data rate during its slot.",
  whyItMatters: "TDMA powered 2G GSM cellular telephony worldwide and remains essential in satellite communication and military tactical data links.",
  overview: `<p>In <strong>Time Division Multiple Access (TDMA)</strong>, all stations share the entire transmission frequency spectrum, but access is divided temporally into repeating round-robin time slots. Guard times between slots prevent clock drift interference.</p>`
});

addTopic("u2-dynamic-channel-allocation", {
  title: "Dynamic Channel Allocation",
  level: "Intermediate",
  standard: "Tanenbaum Ch. 4.1",
  oneLiner: "On-demand channel allocation algorithms where bandwidth is granted dynamically based on active station traffic.",
  quickAnswer: "Dynamic Channel Allocation allocates channel capacity on demand as stations generate traffic. Unlike static allocation where idle channels waste bandwidth, dynamic allocation maximizes efficiency for bursty computer traffic through random access (CSMA) or reservation schemes.",
  whyItMatters: "Computer data traffic is inherently bursty (peak-to-average ratio 100:1). Dynamic channel allocation is the foundation of modern Ethernet, Wi-Fi, and the Internet.",
  overview: `<p>Because computer network traffic consists of short bursts separated by long idle periods, pre-allocating static slots wastes over 90% of channel capacity. Dynamic channel allocation grants transmission rights dynamically as packets arrive.</p>`
});

addTopic("u2-static-vs-dynamic-channel-allocation", {
  title: "Static vs Dynamic Channel Allocation",
  level: "Intermediate",
  standard: "Tanenbaum Ch. 4.1 / Forouzan Ch. 12",
  oneLiner: "Detailed comparison between static FDM/TDM allocation and dynamic on-demand contention mechanisms.",
  quickAnswer: "Static allocation (FDM/TDM) assigns fixed channels to stations regardless of activity, providing guaranteed throughput and zero collisions, but suffers severe delay and wasted bandwidth under bursty loads. Dynamic allocation shares the channel on demand, offering high efficiency for bursty traffic.",
  whyItMatters: "Tanenbaum's classic queueing delay formula proves that dividing bandwidth into N subchannels multiplies queueing delay by N under bursty traffic: T_static = N * T_dynamic.",
  overview: `<table class="wiki-table"><thead><tr><th>Feature</th><th>Static Allocation (FDM / TDM)</th><th>Dynamic Allocation (Contention / Reservation)</th></tr></thead><tbody><tr><td><strong>Bandwidth Assignment</strong></td><td>Fixed, permanent slices</td><td>On-demand, dynamic</td></tr><tr><td><strong>Suitability</strong></td><td>Continuous, predictable traffic (voice, video)</td><td>Bursty, intermittent traffic (web, email)</td></tr><tr><td><strong>Channel Utilization under Bursty Load</strong></td><td>Very low (idle slots wasted)</td><td>High (active stations utilize full channel)</td></tr><tr><td><strong>Collision Risk</strong></td><td>Zero (interference impossible)</td><td>Possible in random access; resolved by MAC</td></tr><tr><td><strong>Queueing Delay for N stations</strong></td><td>N times higher (T = 1 / (C/N - lambda))</td><td>Low at average load</td></tr></tbody></table>`
});

// -------------------------------------------------------------
// TOPIC 4: MULTIPLE ACCESS PROTOCOLS
// -------------------------------------------------------------
addTopic("u2-multiple-access-intro", {
  title: "Introduction to Multiple Access Protocols",
  level: "Beginner",
  standard: "Forouzan Ch. 12 / Tanenbaum Ch. 4.2",
  oneLiner: "The spectrum of protocols used to coordinate transmissions over shared communication channels.",
  quickAnswer: "Multiple Access Protocols are rules that govern how multiple network nodes share a common transmission medium. They are divided into three broad categories: Random Access Protocols, Controlled Access Protocols, and Channelization Protocols.",
  whyItMatters: "Every local area network (Ethernet, Wi-Fi) and wireless cellular link relies on multiple access protocols to avoid channel chaos.",
  overview: `<p>Multiple Access Protocols are divided into 3 primary categories: <strong>Random Access</strong> (ALOHA, CSMA, CSMA/CD, CSMA/CA), <strong>Controlled Access</strong> (Reservation, Polling, Token Passing), and <strong>Channelization</strong> (FDMA, TDMA, CDMA).</p>`
});

addTopic("u2-random-access-protocols", {
  title: "Random Access Protocols",
  level: "Intermediate",
  standard: "Forouzan Ch. 12.1",
  oneLiner: "Contention-based access methods where stations compete for the channel without central coordination.",
  quickAnswer: "In Random Access (or contention) protocols, no station is superior to another, and no central controller exists. Any station with data can attempt to transmit. If two stations transmit simultaneously, a collision occurs, and both back off for random delays before retrying.",
  whyItMatters: "Random access provides decentralized, highly scalable communication that requires no master node or expensive pre-coordination.",
  overview: `<p>In Random Access methods, stations contend for transmission time. The key challenges are detecting when a collision occurs and choosing a randomized backoff delay so stations do not repeatedly collide with one another.</p>`
});

addTopic("u2-pure-aloha", {
  title: "Pure ALOHA Protocol",
  level: "Intermediate",
  standard: "Tanenbaum Ch. 4.2.1 / Forouzan Ch. 12.1",
  oneLiner: "The pioneering random access protocol developed at the University of Hawaii with maximum throughput of 18.4%.",
  quickAnswer: "Pure ALOHA allows stations to transmit whenever they have data. If two or more transmissions overlap even by a single bit, a collision occurs and frames are destroyed. The vulnerable period is 2 * T_fr, yielding a maximum throughput S = 1 / (2e) ≈ 18.4% at G = 0.5.",
  whyItMatters: "Developed in 1970 by Norman Abramson, ALOHA is the intellectual ancestor of Ethernet and all modern packet-radio networks.",
  overview: `<p>In <strong>Pure ALOHA</strong>, stations transmit frames at arbitrary moments. If no acknowledgement is received, the station assumes a collision occurred, waits a random backoff time, and retransmits.</p><div class="wiki-img-box my-4 text-center"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Aloha_pure_slotted.svg/600px-Aloha_pure_slotted.svg.png" alt="Pure and Slotted ALOHA throughput" class="mx-auto rounded-lg shadow border border-gray-200 dark:border-gray-700 max-h-80 object-contain" onerror="this.style.display='none'"><p class="text-xs text-gray-500 mt-1 italic">Figure: Throughput curves for Pure ALOHA (18.4%) vs Slotted ALOHA (36.8%).</p></div><p>Formula: $S = G e^{-2G}$. Maximum throughput occurs when offered load $G = 0.5$, giving $S = 0.5 e^{-1} \\approx 0.184$ (18.4%).</p>`
});

addTopic("u2-slotted-aloha", {
  title: "Slotted ALOHA Protocol",
  level: "Intermediate",
  standard: "Tanenbaum Ch. 4.2.2 / Forouzan Ch. 12.1",
  oneLiner: "Slotted time boundaries that halve the vulnerable period and double ALOHA throughput to 36.8%.",
  quickAnswer: "Slotted ALOHA divides time into discrete synchronized slots equal to the frame transmission time (T_fr). Stations can only begin transmission at the beginning of a slot boundary. This reduces the vulnerable period from 2 * T_fr to T_fr, doubling maximum throughput to S = 1 / e ≈ 36.8% at G = 1.0.",
  whyItMatters: "By introducing clock synchronization, Slotted ALOHA doubles channel utilization and forms the basis for modern cellular random access channels (RACH).",
  overview: `<p>Roberts proposed <strong>Slotted ALOHA</strong> in 1972 to reduce collisions by forbidding transmissions in the middle of ongoing frames. A collision only occurs if two stations attempt to transmit in the exact same slot. Vulnerable time is $T_{fr}$, giving throughput $S = G e^{-G}$.</p>`
});

addTopic("u2-csma-1-persistent", {
  title: "1-Persistent CSMA",
  level: "Intermediate",
  standard: "Tanenbaum Ch. 4.2.3",
  oneLiner: "Listen before talk: if the channel is idle, transmit immediately with probability 1; if busy, wait until idle.",
  quickAnswer: "In 1-Persistent CSMA, a station senses the channel before transmitting. If the channel is busy, the station continuously listens until it detects the channel becoming idle, then transmits immediately with probability p = 1. If two stations are waiting for the channel to clear, both transmit simultaneously, causing a guaranteed collision.",
  whyItMatters: "1-Persistent CSMA is the foundation of classic IEEE 802.3 Ethernet MAC operation.",
  overview: `<p>In <strong>1-Persistent Carrier Sense Multiple Access</strong>, a station monitors the channel. As soon as the wire becomes idle, it transmits immediately. While this eliminates idle channel waste, it causes high collision rates when multiple stations queue packets while a long frame is on the wire.</p>`
});

addTopic("u2-csma-non-persistent", {
  title: "Non-Persistent CSMA",
  level: "Intermediate",
  standard: "Tanenbaum Ch. 4.2.3",
  oneLiner: "If the channel is busy, wait a random time before sensing again to reduce collision probability.",
  quickAnswer: "In Non-Persistent CSMA, a station senses the channel. If idle, it transmits immediately. If busy, the station does NOT continuously listen; instead, it waits a random period of time before sensing the channel again. This drastically reduces collisions at the cost of higher channel idle delay.",
  whyItMatters: "It demonstrates the classic networking trade-off between collision prevention and channel latency.",
  overview: `<p>Non-Persistent CSMA reduces collisions by preventing multiple waiting stations from simultaneously bursting onto the wire the moment an ongoing transmission finishes. However, the channel often sits idle while waiting stations count down their backoff timers.</p>`
});

addTopic("u2-csma-p-persistent", {
  title: "p-Persistent CSMA",
  level: "Intermediate",
  standard: "Tanenbaum Ch. 4.2.3 / Forouzan Ch. 12.1",
  oneLiner: "Slotted channel sensing where an idle channel transmits with probability p and defers with probability 1-p.",
  quickAnswer: "p-Persistent CSMA applies to slotted channels. When a station finds the channel idle, it transmits with probability p, and defers to the next time slot with probability 1-p. If that next slot is also idle, it repeats the process. If busy, it executes backoff. Tuned properly, p * N ≈ 1 ensures high throughput and low collision.",
  whyItMatters: "p-Persistent CSMA balances aggressive transmission with collision deterrence and influenced IEEE 802.11 Wi-Fi backoff design.",
  overview: `<p>In <strong>p-Persistent CSMA</strong>, the parameter $p$ controls transmission aggressiveness. If $p$ is too high, collisions multiply; if $p$ is too low, slots are wasted idling.</p>`
});

addTopic("u2-csma-cd", {
  title: "CSMA with Collision Detection (CSMA/CD)",
  level: "Intermediate",
  standard: "IEEE 802.3 / Tanenbaum Ch. 4.2.4",
  oneLiner: "Listen while transmitting: abort transmission immediately upon detecting collision and send a jam signal.",
  quickAnswer: "CSMA/CD improves CSMA by having stations listen to the wire while transmitting. If the electrical signal voltage exceeds normal threshold (indicating collision), the station immediately aborts transmission, broadcasts a 48-bit jam signal to notify other stations, and executes binary exponential backoff.",
  whyItMatters: "CSMA/CD is the defining innovation of Robert Metcalfe's Ethernet (IEEE 802.3), saving massive bandwidth by stopping collided frames early.",
  overview: `<p>In standard CSMA, when two stations collide, they continue transmitting their entire frames, wasting channel bandwidth. <strong>CSMA/CD</strong> halts transmission within microseconds of detecting a collision.</p><div class="wiki-img-box my-4 text-center"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/CSMA_CD_flowchart.svg/500px-CSMA_CD_flowchart.svg.png" alt="CSMA CD flowchart" class="mx-auto rounded-lg shadow border border-gray-200 dark:border-gray-700 max-h-80 object-contain" onerror="this.style.display='none'"><p class="text-xs text-gray-500 mt-1 italic">Figure: CSMA/CD operational flowchart.</p></div><p>Key Condition: Transmission time must be at least twice the propagation delay: $T_{trans} \\ge 2 \\times T_{prop}$, establishing Ethernet's 64-byte minimum frame size.</p>`
});

addTopic("u2-csma-ca", {
  title: "CSMA with Collision Avoidance (CSMA/CA)",
  level: "Intermediate",
  standard: "IEEE 802.11 / Forouzan Ch. 12.1",
  oneLiner: "Carrier sense with IFS timers, exponential backoff, and RTS/CTS handshake for wireless media.",
  quickAnswer: "In wireless communication, stations cannot detect collisions while transmitting because their own signal swamps receiver circuitry. CSMA/CA avoids collisions proactively by sensing channel idle status for Interframe Spaces (DIFS/SIFS), running random backoff timers, and optionally exchanging RTS/CTS reservation frames.",
  whyItMatters: "CSMA/CA is the MAC protocol that powers all Wi-Fi networks (IEEE 802.11a/b/g/n/ac/ax/be).",
  overview: `<p>Because radios cannot transmit and listen on the exact same frequency simultaneously without burning their sensitive RF frontend, wireless networks use <strong>Collision Avoidance (CSMA/CA)</strong> rather than Collision Detection.</p>`
});

addTopic("u2-comparison-multiple-access", {
  title: "Comparison of Multiple Access Protocols",
  level: "Intermediate",
  standard: "Forouzan Ch. 12 / Tanenbaum Ch. 4",
  oneLiner: "Master comparative analysis of ALOHA, CSMA, CSMA/CD, and CSMA/CA protocols.",
  quickAnswer: "Pure ALOHA offers 18.4% throughput with zero carrier sensing. Slotted ALOHA doubles throughput to 36.8% via time slots. CSMA senses carrier before talking. CSMA/CD detects collisions while talking (wired Ethernet). CSMA/CA avoids collisions proactively via IFS and RTS/CTS (wireless Wi-Fi).",
  whyItMatters: "Comparing these protocols synthesizes the history and mechanics of local area network technology.",
  overview: `<table class="wiki-table"><thead><tr><th>Protocol</th><th>Carrier Sense?</th><th>Collision Detection?</th><th>Vulnerable Period</th><th>Max Throughput</th><th>Primary Technology</th></tr></thead><tbody><tr><td><strong>Pure ALOHA</strong></td><td>No</td><td>No</td><td>2 * T_fr</td><td>18.4% (at G=0.5)</td><td>Early satellite networks</td></tr><tr><td><strong>Slotted ALOHA</strong></td><td>No</td><td>No</td><td>T_fr</td><td>36.8% (at G=1.0)</td><td>Cellular RACH</td></tr><tr><td><strong>1-Persistent CSMA</strong></td><td>Yes</td><td>No</td><td>T_prop</td><td>~50%</td><td>Early local bus networks</td></tr><tr><td><strong>CSMA/CD</strong></td><td>Yes</td><td>Yes</td><td>2 * T_prop</td><td>> 80–90%</td><td>Classic Ethernet (802.3)</td></tr><tr><td><strong>CSMA/CA</strong></td><td>Yes</td><td>No (Avoids)</td><td>RTS/CTS / SIFS</td><td>~60–75%</td><td>Wireless LANs (802.11)</td></tr></tbody></table>`
});

// -------------------------------------------------------------
// TOPIC 5: COLLISION-FREE PROTOCOLS
// -------------------------------------------------------------
addTopic("u2-collision-free-intro", {
  title: "Introduction to Collision-Free Protocols",
  level: "Intermediate",
  standard: "Tanenbaum Ch. 4.2.5",
  oneLiner: "Protocols that resolve channel contention beforehand so data transmissions are 100% collision-free.",
  quickAnswer: "Collision-free protocols resolve channel competition in a separate contention/reservation phase before data is transmitted. As a result, actual data frames never experience collisions, ensuring guaranteed channel utilization even under heavy network load.",
  whyItMatters: "Under heavy load, contention protocols like ALOHA and CSMA suffer throughput collapse due to frequent collisions. Collision-free protocols remain stable and efficient.",
  overview: `<p>While contention protocols work well under light loads, their efficiency degrades when many stations compete simultaneously. Collision-free protocols resolve channel rights in advance using bit reservation, binary arbitration, or token circulation.</p>`
});

addTopic("u2-bit-map-protocol", {
  title: "Bit-Map Protocol",
  level: "Intermediate",
  standard: "Tanenbaum Ch. 4.2.5",
  oneLiner: "Reservation protocol where each contention period contains N bits for N stations to indicate transmission intent.",
  quickAnswer: "In the basic bit-map protocol, each contention period consists of N 1-bit slots for N stations. If Station j wants to transmit, it transmits a 1 bit in slot j. After the contention period, stations that asserted a 1 transmit their frames in numerical order, completely collision-free.",
  whyItMatters: "It illustrates pure reservation: channel overhead is exactly N bits per round, yielding efficiency d / (d + 1) at high load.",
  overview: `<p>In the <strong>Bit-Map Protocol</strong>, time is divided into a contention period and a data transmission period. Stations announce their intention to transmit by setting their corresponding bit in an $N$-bit reservation vector.</p>`
});

addTopic("u2-binary-countdown-protocol", {
  title: "Binary Countdown Protocol",
  level: "Intermediate",
  standard: "Tanenbaum Ch. 4.2.5",
  oneLiner: "Address arbitration protocol where stations transmit address bits and drop out if a higher-priority bit is heard.",
  quickAnswer: "Stations needing to transmit broadcast their binary station addresses bit by bit, starting with the most significant bit. The channel executes a bitwise boolean OR. If a station's address bit is 0 but it sees a 1 on the channel, it drops out. The station with the highest binary address wins the channel.",
  whyItMatters: "Binary Countdown achieved channel efficiency d / (d + log2(N)) and inspired the Controller Area Network (CAN bus) used in modern automobiles.",
  overview: `<p>The <strong>Binary Countdown Protocol</strong> overcomes the $N$-bit overhead of the bit-map protocol by requiring only $\\log_2 N$ bits to arbitrate among $N$ stations.</p>`
});

addTopic("u2-token-passing-protocol", {
  title: "Token Passing Protocol",
  level: "Intermediate",
  standard: "IEEE 802.5 / Tanenbaum Ch. 4.2",
  oneLiner: "Deterministic ring access protocol where a special control frame (token) circulates among stations.",
  quickAnswer: "In token passing protocols (e.g., Token Ring IEEE 802.5, Token Bus IEEE 802.4), a special small frame called a token circulates sequentially among stations. Only the station possessing the token is permitted to transmit. After transmitting, it passes the token to its successor.",
  whyItMatters: "Token passing delivers deterministic maximum latency and guaranteed throughput, making it popular in industrial and avionics automation.",
  overview: `<p>In <strong>Token Ring</strong>, stations are connected in a logical ring. A station holds the token for a maximum Token Holding Time (THT), transmits its data, and then releases the token to the downstream neighbor.</p>`
});

addTopic("u2-collision-free-working-principles", {
  title: "Working Principles and Examples of Collision-Free Protocols",
  level: "Intermediate",
  standard: "Tanenbaum Ch. 4.2.5",
  oneLiner: "Step-by-step traces of Bit-Map, Binary Countdown, and Token Ring under varying network load.",
  quickAnswer: "Traces demonstrate: (1) Bit-Map: Stations 1, 3, 7 set bits 1, 3, 7 in an 8-bit contention vector; frames 1, 3, 7 transmit sequentially. (2) Binary Countdown: Stations 0010, 1001, 1010 compete; bit 3 eliminates 0010; bit 1 eliminates 1001; 1010 wins. (3) Token Ring: Token passes A -> B -> C -> D; C seizes token, sends data, regenerates token to D.",
  whyItMatters: "Working through concrete examples solidifies understanding of arbitration without collisions.",
  overview: `<p>Detailed walkthroughs of arbitration sequences for Bit-Map, Binary Countdown, and Token Passing under light and heavy network traffic conditions.</p>`
});

addTopic("u2-comparison-collision-free", {
  title: "Comparison of Collision-Free Protocols",
  level: "Intermediate",
  standard: "Tanenbaum Ch. 4.2.5",
  oneLiner: "Comparative matrix analyzing overhead, fairness, channel efficiency, and failure modes.",
  quickAnswer: "Bit-Map requires N contention bits and favors lower-numbered stations. Binary Countdown requires log2(N) bits and favors higher-numbered stations unless modified. Token Passing requires no contention phase but suffers from token loss and ring break vulnerabilities.",
  whyItMatters: "Reveals why modern switched Ethernet replaced both contention and collision-free shared media architectures.",
  overview: `<table class="wiki-table"><thead><tr><th>Protocol</th><th>Contention Overhead</th><th>Station Priority Bias</th><th>Efficiency at High Load</th><th>Failure Mode</th></tr></thead><tbody><tr><td><strong>Bit-Map</strong></td><td>N bits per round</td><td>Low station numbers transmit first</td><td>d / (d + 1)</td><td>Single station cannot break ring</td></tr><tr><td><strong>Binary Countdown</strong></td><td>log2(N) bits per round</td><td>High address stations dominate</td><td>d / (d + log2 N)</td><td>Bus arbitration failure</td></tr><tr><td><strong>Token Ring</strong></td><td>Small token frame</td><td>Fair round-robin token rotation</td><td>Very high</td><td>Token loss, monitor station required</td></tr></tbody></table>`
});

// -------------------------------------------------------------
// TOPIC 6: ETHERNET MAC SUBLAYER PROTOCOL
// -------------------------------------------------------------
addTopic("u2-ethernet-architecture", {
  title: "Ethernet Architecture",
  level: "Intermediate",
  standard: "IEEE 802.3 / Tanenbaum Ch. 4.3",
  oneLiner: "From classic 10BASE5 coax bus topology to modern switched full-duplex star networks.",
  quickAnswer: "Ethernet architecture evolved from shared medium bus topologies (10BASE5 Thicknet, 10BASE2 Thinnet) to star-wired hub topologies (10BASE-T) and finally to modern full-duplex switched networks with point-to-point twisted-pair or fiber links.",
  whyItMatters: "Understanding Ethernet's architectural evolution explains why modern networks no longer experience CSMA/CD collisions while retaining 802.3 frame formats.",
  overview: `<p>Originally conceived by Bob Metcalfe at Xerox PARC in 1973, Ethernet revolutionized local area networking. Over 50 years, Ethernet shifted from a broadcast bus with vampire taps to multi-gigabit switched star topologies.</p>`
});

addTopic("u2-ethernet-frame-format", {
  title: "Ethernet Frame Format",
  level: "Intermediate",
  standard: "IEEE 802.3 / DIX Ethernet II",
  oneLiner: "The 802.3 frame structure: Preamble, SFD, Destination/Source MAC, Type/Length, Data, and FCS.",
  quickAnswer: "An Ethernet frame consists of: (1) 7-byte Preamble for clock sync, (2) 1-byte Start Frame Delimiter (SFD: 10101011), (3) 6-byte Destination MAC, (4) 6-byte Source MAC, (5) 2-byte EtherType / Length, (6) 46 to 1500-byte Data Payload, and (7) 4-byte CRC-32 Frame Check Sequence (FCS). Minimum frame size is 64 bytes.",
  whyItMatters: "Every network engineer, packet analyzer (Wireshark), and network switch inspects this exact frame layout trillions of times per day.",
  overview: `<div class="wiki-img-box my-4 text-center"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Ethernet_frame.svg/600px-Ethernet_frame.svg.png" alt="Ethernet 802.3 Frame Format" class="mx-auto rounded-lg shadow border border-gray-200 dark:border-gray-700 max-h-80 object-contain" onerror="this.style.display='none'"><p class="text-xs text-gray-500 mt-1 italic">Figure: Standard IEEE 802.3 Ethernet frame structure.</p></div><table class="wiki-table"><thead><tr><th>Field</th><th>Size (Bytes)</th><th>Description</th></tr></thead><tbody><tr><td>Preamble</td><td>7</td><td>Alternating 10101010 bits for transceiver clock synchronization</td></tr><tr><td>SFD (Start Frame Delimiter)</td><td>1</td><td>Pattern 10101011 indicating the start of MAC addresses</td></tr><tr><td>Destination MAC</td><td>6</td><td>48-bit hardware address of receiving interface</td></tr><tr><td>Source MAC</td><td>6</td><td>48-bit hardware address of sending interface</td></tr><tr><td>Type / Length</td><td>2</td><td>Protocol type (e.g., 0x0800 for IPv4, 0x0806 for ARP)</td></tr><tr><td>Payload / Data</td><td>46–1500</td><td>Encapsulated Network Layer packet (padded to 46 bytes if shorter)</td></tr><tr><td>FCS (CRC-32)</td><td>4</td><td>Cyclic redundancy check for detecting bit corruption</td></tr></tbody></table>`
});

addTopic("u2-ethernet-mac-protocol", {
  title: "Ethernet MAC Protocol",
  level: "Intermediate",
  standard: "IEEE 802.3",
  oneLiner: "1-persistent CSMA/CD with truncated binary exponential backoff.",
  quickAnswer: "The classic Ethernet MAC algorithm executes 1-persistent CSMA/CD. When a station has a frame to send, it senses the channel. If idle, it transmits immediately. If busy, it waits until idle. While transmitting, it monitors voltage for collisions; if a collision occurs, it sends a 48-bit jam signal and initiates backoff.",
  whyItMatters: "It defines the exact mathematical rules governing half-duplex Ethernet transmission.",
  overview: `<p>The Ethernet MAC protocol combines carrier sensing, immediate transmission upon channel clearance, collision monitoring during frame output, and randomized exponential backoff.</p>`
});

addTopic("u2-ethernet-csma-cd-operation", {
  title: "CSMA/CD Operation in Ethernet",
  level: "Intermediate",
  standard: "IEEE 802.3",
  oneLiner: "The physics of collision detection, slot time, and the 64-byte minimum frame size constraint.",
  quickAnswer: "To guarantee collision detection before transmission ends, frame transmission time (T_trans) must be at least twice the end-to-end cable propagation delay (2 * T_prop). At 10 Mbps over 2.5 km, slot time is 51.2 microseconds, requiring a minimum frame size of 64 bytes (512 bits).",
  whyItMatters: "This fundamental equation links physical wire speed, distance limitations, and packet size limits.",
  overview: `<p>Formula: $T_{trans} = \\frac{\\text{Frame Size}}{\\text{Bandwidth}} \\ge 2 \\times T_{prop} = \\frac{2 \\times \\text{Distance}}{v}$. If a frame were smaller than 64 bytes, a collision at the far end of the cable could arrive back after the sender had already finished transmitting, resulting in an undetected collision!</p>`
});

addTopic("u2-binary-exponential-backoff", {
  title: "Binary Exponential Backoff Algorithm",
  level: "Intermediate",
  standard: "IEEE 802.3 Section 4.2.3.2.5",
  oneLiner: "Dynamic collision resolution algorithm doubling the contention window after each successive collision.",
  quickAnswer: "After collision number i, a station chooses a random backoff integer k from range [0, 2^min(i, 10) - 1]. The station waits k * Slot Time (51.2 microseconds for 10 Mbps) before retrying. After 10 collisions, the window caps at 1023. After 16 consecutive collisions, transmission fails and an error is reported.",
  whyItMatters: "Binary exponential backoff adapts automatically to network congestion: small delays under light load, wide dispersion under heavy load.",
  overview: `<p>After $i$ collisions, the sender draws $k$ uniformly at random from $[0, 2^{\\min(i, 10)} - 1]$ and waits $k \\times 51.2\\;\\mu\\text{s}$. If 16 collisions occur consecutively, the frame is aborted.</p>`
});

addTopic("u2-ethernet-types-evolution", {
  title: "Ethernet Types and Evolution",
  level: "Intermediate",
  standard: "IEEE 802.3 Standards Family",
  oneLiner: "Chronological progression from 10 Mbps Standard Ethernet to 400 Gbps cloud datacenter fabrics.",
  quickAnswer: "Ethernet evolved through distinct speed generations: Standard Ethernet (10 Mbps, 10BASE-T), Fast Ethernet (100 Mbps, 100BASE-TX), Gigabit Ethernet (1 Gbps, 1000BASE-T), 10-Gigabit Ethernet (10 Gbps, 10GBASE-T / optical), and hyperscale 40G/100G/400G/800G Ethernet.",
  whyItMatters: "Ethernet's ability to scale speed by a factor of 40,000x while preserving the exact same 802.3 frame format is one of computing's greatest triumphs.",
  overview: `<table class="wiki-table"><thead><tr><th>Standard</th><th>Data Rate</th><th>Medium</th><th>Max Distance</th><th>Key Characteristic</th></tr></thead><tbody><tr><td>10BASE5</td><td>10 Mbps</td><td>Thick Coaxial Cable</td><td>500 m</td><td>Original bus topology with vampire taps</td></tr><tr><td>10BASE-T</td><td>10 Mbps</td><td>Cat3 Twisted Pair</td><td>100 m</td><td>Star topology with multiport hubs</td></tr><tr><td>100BASE-TX (Fast)</td><td>100 Mbps</td><td>Cat5 Twisted Pair</td><td>100 m</td><td>4B/5B encoding, full-duplex switches</td></tr><tr><td>1000BASE-T (Gigabit)</td><td>1 Gbps</td><td>Cat5e/6 Twisted Pair</td><td>100 m</td><td>4-pair PAM-5 transmission</td></tr><tr><td>10GBASE-T</td><td>10 Gbps</td><td>Cat6A Twisted Pair / Fiber</td><td>100 m / 10 km</td><td>Datacenter interconnects, no half-duplex</td></tr><tr><td>400GBASE-SR8</td><td>400 Gbps</td><td>Multi-mode Fiber</td><td>100 m</td><td>PAM4 optical modulation, cloud backbone</td></tr></tbody></table>`
});

addTopic("u2-ethernet-advantages-limitations", {
  title: "Advantages and Limitations of Ethernet",
  level: "Intermediate",
  standard: "IEEE 802.3",
  oneLiner: "Analyzing Ethernet's dominance: low cost, high bandwidth, and plug-and-play vs non-deterministic latency.",
  quickAnswer: "Advantages: ubiquity, extremely low silicon cost, massive bandwidth (up to 800 Gbps), plug-and-play auto-negotiation, backward compatibility. Limitations: non-deterministic latency under contention, 100m copper distance limit, broadcast storms in loop topologies without STP.",
  whyItMatters: "Understanding trade-offs explains where Ethernet excels (enterprise/datacenter LANs) and where deterministic alternatives (CAN, TSN) are preferred.",
  overview: `<p>Ethernet dominates enterprise and home networking due to inexpensive cabling, high speeds, and simple switch installation, though industrial real-time applications require Time-Sensitive Networking (TSN) extensions to achieve deterministic delivery.</p>`
});

// -------------------------------------------------------------
// TOPIC 7: WIRELESS LAN PROTOCOLS
// -------------------------------------------------------------
addTopic("u2-wireless-characteristics", {
  title: "Characteristics of Wireless Communication",
  level: "Intermediate",
  standard: "Kurose & Ross Ch. 7 / Forouzan Ch. 14",
  oneLiner: "Physical realities of radio transmission: attenuation, multipath fading, interference, and security risks.",
  quickAnswer: "Wireless communication differs fundamentally from wired media due to: (1) Signal attenuation proportional to 1/d^2 or 1/d^4, (2) Multipath propagation causing self-interference and fading, (3) Electromagnetic interference from microwaves and Bluetooth, and (4) Broadcast radio propagation making eavesdropping trivial.",
  whyItMatters: "These physical channel characteristics directly dictate why wireless MAC protocols must differ radically from wired Ethernet.",
  overview: `<p>Unlike guided copper or optical fiber where signals are tightly enclosed, wireless signals propagate through open air, suffering severe distance attenuation, reflections off walls (multipath fading), and shared radio interference.</p>`
});

addTopic("u2-wireless-lan-architecture", {
  title: "Wireless LAN Architecture",
  level: "Intermediate",
  standard: "IEEE 802.11 Architecture",
  oneLiner: "Basic Service Set (BSS), Extended Service Set (ESS), Access Points (AP), and Distribution System (DS).",
  quickAnswer: "IEEE 802.11 defines two modes: (1) Infrastructure Mode: Mobile stations associate with a central Access Point (AP) in a Basic Service Set (BSS); multiple BSSs connect via a wired Distribution System (DS) into an Extended Service Set (ESS). (2) Ad-Hoc Mode (IBSS): Peer-to-peer communication without an AP.",
  whyItMatters: "This architecture enables seamless wireless roaming across enterprise campuses while maintaining continuous IP connectivity.",
  overview: `<p>A <strong>Basic Service Set (BSS)</strong> consists of an Access Point and its associated wireless client stations. An <strong>Extended Service Set (ESS)</strong> connects multiple APs via an Ethernet Distribution System, sharing a single SSID.</p>`
});

addTopic("u2-hidden-terminal-problem", {
  title: "Hidden Terminal Problem",
  level: "Intermediate",
  standard: "IEEE 802.11 / Tanenbaum Ch. 4.4",
  oneLiner: "Stations outside radio range of each other transmitting simultaneously to a common station, causing collisions.",
  quickAnswer: "Station A and Station C are both within range of central Station B, but out of radio range of each other. When A transmits to B, C cannot sense A's signal and begins transmitting to B as well. The two transmissions collide destructively at Station B. Solved by the RTS/CTS reservation handshake.",
  whyItMatters: "The hidden terminal problem is the single greatest cause of packet loss in unscheduled wireless networks.",
  overview: `<div class="wiki-img-box my-4 text-center"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Hidden_terminal_problem.svg/500px-Hidden_terminal_problem.svg.png" alt="Hidden Terminal Problem" class="mx-auto rounded-lg shadow border border-gray-200 dark:border-gray-700 max-h-80 object-contain" onerror="this.style.display='none'"><p class="text-xs text-gray-500 mt-1 italic">Figure: Station A and Station C are hidden from each other, causing collisions at Station B.</p></div><p>Carrier sensing fails here because carrier sense checks whether the <em>transmitter's</em> neighborhood is clear, whereas collisions occur at the <em>receiver</em>!</p>`
});

addTopic("u2-exposed-terminal-problem", {
  title: "Exposed Terminal Problem",
  level: "Intermediate",
  standard: "IEEE 802.11 / Tanenbaum Ch. 4.4",
  oneLiner: "Stations unnecessarily deferring transmission because they falsely believe a collision would occur.",
  quickAnswer: "Station B is transmitting to Station A. Station C wants to transmit to Station D. Station C senses B's transmission and needlessly defers transmitting, even though C transmitting to D would not interfere with B delivering data to A. This wastes channel capacity and lowers aggregate network throughput.",
  whyItMatters: "Exposed stations illustrate how conservative carrier sensing reduces wireless network capacity.",
  overview: `<div class="wiki-img-box my-4 text-center"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Exposed_terminal_problem.svg/500px-Exposed_terminal_problem.svg.png" alt="Exposed Terminal Problem" class="mx-auto rounded-lg shadow border border-gray-200 dark:border-gray-700 max-h-80 object-contain" onerror="this.style.display='none'"><p class="text-xs text-gray-500 mt-1 italic">Figure: Station C is exposed to Station B and unnecessarily defers transmitting to Station D.</p></div><p>RTS/CTS helps mitigate this by allowing C to hear B's RTS but NOT hearing A's CTS, signaling that C is free to transmit away from A.</p>`
});

addTopic("u2-wireless-multiple-access", {
  title: "Multiple Access in Wireless Networks",
  level: "Intermediate",
  standard: "Forouzan Ch. 14 / Kurose & Ross Ch. 7",
  oneLiner: "Why wired CSMA/CD fails in radio environments and how MACA/MACAW adapted carrier sense for wireless.",
  quickAnswer: "CSMA/CD cannot function over wireless radio because: (1) Radio transceivers transmitting at high power overwhelm their own sensitive receiving circuits (dynamic range up to 100 dB difference), and (2) Signal attenuation means a collision at a distant receiver may not be loud enough for the sender to hear.",
  whyItMatters: "Explains the foundational physics driving wireless protocols to use Collision Avoidance rather than Collision Detection.",
  overview: `<p>A transmitter radiates high RF energy while incoming signals from distant nodes arrive at microvolt levels. Transmitting while listening to detect subtle collisions is economically and physically unfeasible in commercial Wi-Fi.</p>`
});

addTopic("u2-wireless-lan-access-methods", {
  title: "Wireless LAN Access Methods",
  level: "Intermediate",
  standard: "IEEE 802.11",
  oneLiner: "Survey of access methods: Distributed Coordination Function (DCF) and Point Coordination Function (PCF).",
  quickAnswer: "IEEE 802.11 provides two primary access methods: (1) DCF (Distributed Coordination Function): Contention-based access using CSMA/CA, mandatory in all Wi-Fi hardware. (2) PCF (Point Coordination Function): Contention-free, centralized polling-based access coordinated by the Access Point.",
  whyItMatters: "Understanding DCF and PCF clarifies how Wi-Fi balances best-effort asynchronous web data with time-sensitive voice/video traffic.",
  overview: `<p>DCF provides decentralized access for general internet traffic, while PCF provides a centralized polling mechanism during contention-free repetition intervals.</p>`
});

addTopic("u2-wireless-communication-challenges", {
  title: "Challenges in Wireless Communication",
  level: "Intermediate",
  standard: "Tanenbaum Ch. 4.4",
  oneLiner: "Overcoming battery constraints, dynamic topologies, multipath dispersion, and spectrum scarcity.",
  quickAnswer: "Key challenges include: dynamic topology changes, roaming handoff delays, high bit-error rates (10^-3 vs 10^-12 in fiber), power/battery limitations, radio spectrum regulation, and security vulnerabilities over broadcast airwaves.",
  whyItMatters: "Designing robust wireless systems requires solving complex trade-offs across physics, protocol state, and hardware power budgets.",
  overview: `<p>Wireless protocols require sophisticated modulation (OFDM/OFDMA), forward error correction, rate adaptation algorithms, and power-saving sleep cycles to operate reliably in noisy radio environments.</p>`
});

// -------------------------------------------------------------
// TOPIC 8: IEEE 802.11 MAC SUBLAYER PROTOCOL
// -------------------------------------------------------------
addTopic("u2-ieee-802-11-architecture", {
  title: "IEEE 802.11 Architecture",
  level: "Intermediate",
  standard: "IEEE 802.11 Standard",
  oneLiner: "The hierarchical architecture of Wi-Fi: Station (STA), BSS, AP, DS, ESS, and portal gateways.",
  quickAnswer: "The IEEE 802.11 architecture organizes mobile stations (STAs) into Basic Service Sets (BSS). An infrastructure BSS contains an Access Point (AP). APs connect via a Distribution System (DS) to form an Extended Service Set (ESS). A Portal connects the 802.11 LAN to external wired networks (e.g., 802.3 Ethernet).",
  whyItMatters: "This architecture is the blueprint for all home routers, campus Wi-Fi deployments, and cellular Wi-Fi offloading.",
  overview: `<p>IEEE 802.11 defines a modular cellular architecture where mobile stations can roam between APs within the same Extended Service Set (ESS) without losing their IP addresses or breaking active TCP connections.</p>`
});

addTopic("u2-ieee-802-11-dcf", {
  title: "Distributed Coordination Function (DCF)",
  level: "Intermediate",
  standard: "IEEE 802.11 Section 10.3",
  oneLiner: "The fundamental contention-based CSMA/CA access mechanism mandatory in all 802.11 Wi-Fi stations.",
  quickAnswer: "DCF uses CSMA/CA with binary exponential backoff. Before transmitting, a station senses the medium. If idle for a DIFS duration, it decrements its backoff counter. When the counter reaches zero, it transmits the frame. The receiver verifies CRC and responds with an ACK after a SIFS duration.",
  whyItMatters: "Over 99% of all Wi-Fi traffic globally is transmitted using DCF.",
  overview: `<p>DCF provides distributed, peer-level contention access without requiring a central scheduler. Physical and virtual carrier sensing work together to prevent collisions.</p>`
});

addTopic("u2-ieee-802-11-pcf", {
  title: "Point Coordination Function (PCF)",
  level: "Intermediate",
  standard: "IEEE 802.11 Section 10.4",
  oneLiner: "Centralized contention-free polling access coordinated by the Access Point for time-bounded traffic.",
  quickAnswer: "PCF is an optional centralized polling mechanism where the AP acts as a Point Coordinator. During the Contention-Free Period (CFP), the AP polls registered stations one by one, granting guaranteed collision-free transmission slots suitable for real-time voice and video.",
  whyItMatters: "PCF paved the way for modern 802.11e/ax Quality of Service (QoS) scheduled access mechanisms.",
  overview: `<p>In PCF, the Access Point uses a shorter interframe space (PIFS) than normal stations (DIFS), giving it preemptive priority to seize the medium and begin polling stations.</p>`
});

addTopic("u2-ieee-802-11-csma-ca", {
  title: "CSMA/CA in IEEE 802.11",
  level: "Intermediate",
  standard: "IEEE 802.11",
  oneLiner: "Detailed mechanics of physical carrier sensing, backoff countdown, and random contention windows.",
  quickAnswer: "In 802.11 CSMA/CA, a station selects a random backoff integer from [0, CW]. If the channel remains idle for a DIFS, the backoff timer counts down during idle slot times. If the channel becomes busy, the timer pauses and resumes after the channel is idle again for DIFS.",
  whyItMatters: "Pausing backoff countdown rather than resetting preserves fairness among waiting stations.",
  overview: `<p>By freezing backoff timers when other stations transmit, stations that have already waited longer retain higher priority to transmit once the channel becomes free again.</p>`
});

addTopic("u2-ieee-802-11-ifs", {
  title: "Interframe Spaces (IFS)",
  level: "Intermediate",
  standard: "IEEE 802.11",
  oneLiner: "Priority arbitration through timed gaps: SIFS, PIFS, DIFS, and EIFS.",
  quickAnswer: "IEEE 802.11 enforces priority by varying the time gap a station must wait before transmitting: (1) SIFS (Shortest IFS): Highest priority, used for ACKs, CTS, and data fragments. (2) PIFS (PCF IFS): Medium priority, used by AP for polling. (3) DIFS (DCF IFS): Standard priority for normal data frames. (4) EIFS (Extended IFS): Lowest priority, used after frame errors.",
  whyItMatters: "Different IFS durations implement hardware-level priority without requiring packet header tags.",
  overview: `<p>Rule of thumb in 802.11: <strong>Shorter gap = Higher priority</strong>. Because an ACK only needs to wait SIFS, no other station waiting DIFS can interrupt or collide with the acknowledgement.</p>`
});

addTopic("u2-rts-cts-mechanism", {
  title: "RTS/CTS Mechanism",
  level: "Intermediate",
  standard: "IEEE 802.11 / Tanenbaum Ch. 4.4",
  oneLiner: "4-way handshake (RTS-CTS-DATA-ACK) eliminating hidden terminal collisions.",
  quickAnswer: "To transmit a large frame, a sender first broadcasts a short Request to Send (RTS) frame. The receiver replies with a Clear to Send (CTS) frame. All stations hearing the RTS or CTS read the duration field and remain silent for that time. The sender then transmits its data frame safely and receives an ACK.",
  whyItMatters: "RTS and CTS frames are small (20 and 14 bytes), so collisions between RTS frames waste negligible bandwidth compared to colliding 1500-byte data frames.",
  overview: `<div class="wiki-img-box my-4 text-center"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/802.11_RTS_CTS.svg/600px-802.11_RTS_CTS.svg.png" alt="802.11 RTS CTS" class="mx-auto rounded-lg shadow border border-gray-200 dark:border-gray-700 max-h-80 object-contain" onerror="this.style.display='none'"><p class="text-xs text-gray-500 mt-1 italic">Figure: The 4-way RTS/CTS/Data/ACK handshake reserving channel airtime.</p></div>`
});

addTopic("u2-network-allocation-vector", {
  title: "Network Allocation Vector (NAV)",
  level: "Intermediate",
  standard: "IEEE 802.11",
  oneLiner: "The virtual carrier sensing timer that tells stations how long the radio medium will remain occupied.",
  quickAnswer: "The Network Allocation Vector (NAV) is an internal countdown timer maintained by every 802.11 station. When a station overhears any frame (RTS, CTS, or data), it extracts the Duration field and sets its NAV to that value. As long as NAV > 0, the station treats the medium as virtually busy without even checking physical RF energy.",
  whyItMatters: "NAV virtual carrier sensing silences hidden stations that cannot physically hear the transmitter.",
  overview: `<p>Virtual carrier sensing via NAV ensures that stations out of physical range of the sender (but within range of the receiver) do not transmit during data and ACK exchange.</p>`
});

addTopic("u2-ieee-802-11-frame-formats", {
  title: "IEEE 802.11 Frame Formats",
  level: "Intermediate",
  standard: "IEEE 802.11 Section 9",
  oneLiner: "The 802.11 MAC frame layout: Frame Control, Duration/ID, 4 MAC addresses, Sequence Control, QoS, and FCS.",
  quickAnswer: "An 802.11 frame contains: (1) 2-byte Frame Control (Type, Subtype, ToDS, FromDS, Retry, Power Mgmt), (2) 2-byte Duration/ID (sets NAV), (3) Four 6-byte MAC Address fields (Receiver, Transmitter, Destination, Source), (4) 2-byte Sequence Control, (5) 0-2312 byte Payload, and (6) 4-byte CRC-32 FCS.",
  whyItMatters: "Having up to 4 MAC address fields allows frames to bridge seamlessly across wireless distribution systems between APs.",
  overview: `<table class="wiki-table"><thead><tr><th>Field</th><th>Size (Bytes)</th><th>Purpose</th></tr></thead><tbody><tr><td>Frame Control</td><td>2</td><td>Protocol version, Type (Management, Control, Data), Subtype, ToDS, FromDS flags</td></tr><tr><td>Duration / ID</td><td>2</td><td>Airtime reservation duration in microseconds (sets overhearing stations' NAV)</td></tr><tr><td>Address 1</td><td>6</td><td>Receiver MAC address (the station or AP receiving the frame over air)</td></tr><tr><td>Address 2</td><td>6</td><td>Transmitter MAC address (the station or AP transmitting over air)</td></tr><tr><td>Address 3</td><td>6</td><td>Final destination or original source MAC address</td></tr><tr><td>Sequence Control</td><td>2</td><td>4-bit fragment number + 12-bit sequence number (for duplicate detection)</td></tr><tr><td>Address 4</td><td>6</td><td>Optional, used when frames travel wirelessly from AP to AP (WDS mesh)</td></tr><tr><td>FCS</td><td>4</td><td>32-bit CRC checksum</td></tr></tbody></table>`
});

addTopic("u2-dcf-vs-pcf", {
  title: "DCF vs PCF",
  level: "Intermediate",
  standard: "IEEE 802.11",
  oneLiner: "Contrasting distributed contention CSMA/CA with centralized contention-free AP polling.",
  quickAnswer: "DCF is distributed, contention-based, best-effort, uses DIFS/SIFS, and is supported by all Wi-Fi devices. PCF is centralized, contention-free, deterministic, coordinated by the AP using PIFS polling, but rarely implemented in commercial consumer hardware.",
  whyItMatters: "Helps students understand why modern Wi-Fi evolved 802.11e EDCA rather than relying on legacy PCF.",
  overview: `<table class="wiki-table"><thead><tr><th>Feature</th><th>Distributed Coordination Function (DCF)</th><th>Point Coordination Function (PCF)</th></tr></thead><tbody><tr><td><strong>Coordination Mode</strong></td><td>Decentralized, all stations equal</td><td>Centralized, AP coordinates</td></tr><tr><td><strong>Medium Access</strong></td><td>Contention-based (CSMA/CA)</td><td>Contention-free (Polling)</td></tr><tr><td><strong>Interframe Space</strong></td><td>DIFS / SIFS</td><td>PIFS / SIFS</td></tr><tr><td><strong>Implementation</strong></td><td>Mandatory in all 802.11 devices</td><td>Optional, rarely used</td></tr><tr><td><strong>Traffic Supported</strong></td><td>Best-effort asynchronous data</td><td>Time-sensitive voice / streaming</td></tr></tbody></table>`
});

// -------------------------------------------------------------
// TOPIC 9: DATA LINK LAYER SWITCHING
// -------------------------------------------------------------
addTopic("u2-bridges-overview", {
  title: "Bridges in Data Link Layer",
  level: "Intermediate",
  standard: "IEEE 802.1D / Tanenbaum Ch. 4.7",
  oneLiner: "Store-and-forward Layer 2 devices interconnecting separate LAN segments to isolate collision domains.",
  quickAnswer: "A bridge is a Layer 2 networking device that connects multiple LAN segments. It inspects incoming frames' MAC addresses, operates in store-and-forward mode, regenerates clean signals, and separates collision domains while maintaining a single shared broadcast domain.",
  whyItMatters: "Bridges replaced simple Layer 1 repeaters, ending the physical distance and station limits of early shared Ethernet.",
  overview: `<p>A bridge inspects the destination MAC address of incoming frames and selectively forwards them only to the segment where the destination host resides, preventing local traffic from clogging remote segments.</p>`
});

addTopic("u2-transparent-bridges", {
  title: "Transparent Bridges",
  level: "Intermediate",
  standard: "IEEE 802.1D",
  oneLiner: "Plug-and-play bridges that operate completely invisibly without requiring station configuration.",
  quickAnswer: "A transparent bridge is entirely invisible to connected stations. Computers simply send frames as if on a single giant cable, completely unaware that bridges are inspecting, filtering, and forwarding their packets. Defined by IEEE 802.1D with plug-and-play installation.",
  whyItMatters: "Transparent operation made LAN expansion zero-configuration, accelerating Ethernet adoption across corporations.",
  overview: `<p>When an admin connects a transparent bridge into an existing network, no host reconfiguration, IP changes, or software updates are required. It immediately begins learning and filtering.</p>`
});

addTopic("u2-learning-bridges", {
  title: "Learning Bridges",
  level: "Intermediate",
  standard: "IEEE 802.1D Section 7",
  oneLiner: "Bridges that automatically build and maintain their MAC address forwarding database by inspecting source addresses.",
  quickAnswer: "A learning bridge builds its forwarding table (CAM table) dynamically through backward learning. By inspecting the source MAC address and incoming port of every arriving frame, the bridge records which host is reachable on which port.",
  whyItMatters: "Eliminates manual forwarding table configuration and automatically adapts when laptops move to new switch ports.",
  overview: `<div class="wiki-img-box my-4 text-center"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Network_bridge_operation.svg/600px-Network_bridge_operation.svg.png" alt="Network Bridge Operation" class="mx-auto rounded-lg shadow border border-gray-200 dark:border-gray-700 max-h-80 object-contain" onerror="this.style.display='none'"><p class="text-xs text-gray-500 mt-1 italic">Figure: Learning bridge inspecting frame source addresses to build its forwarding database.</p></div>`
});

addTopic("u2-bridge-learning-process", {
  title: "Bridge Learning Process",
  level: "Intermediate",
  standard: "IEEE 802.1D",
  oneLiner: "Step-by-step mechanics of table updates, aging timers, and port mapping.",
  quickAnswer: "When a frame enters Port X: (1) The bridge checks its table for the Source MAC. If not present, it adds (Source MAC, Port X, Timestamp). If present, it refreshes the timestamp. (2) An Aging Timer (default 300s) purges stale entries when hosts disconnect.",
  whyItMatters: "The aging timer prevents forwarding frames to obsolete locations when a user disconnects or moves.",
  overview: `<p>The backward learning algorithm ensures the forwarding database reflects real-time host locations. The aging timer automatically purges devices that stop transmitting.</p>`
});

addTopic("u2-forwarding-and-filtering", {
  title: "Forwarding and Filtering Decisions",
  level: "Intermediate",
  standard: "IEEE 802.1D",
  oneLiner: "How a bridge decides whether to forward a frame across ports or silently drop it to conserve bandwidth.",
  quickAnswer: "Upon receiving a frame on Port X with Destination MAC D: (1) If D is in the table on Port X, the frame is on the same segment -> FILTER (discard). (2) If D is in the table on Port Y (Y != X) -> FORWARD to Port Y only. (3) If D is unknown -> FLOOD to all ports except Port X.",
  whyItMatters: "Filtering confines local conversations to local wires, dramatically multiplying effective network capacity.",
  overview: `<p>Filtering prevents local packets on Segment 1 from needlessly spilling onto Segment 2, isolating local collisions and freeing bandwidth for simultaneous remote transfers.</p>`
});

addTopic("u2-bridge-flooding", {
  title: "Flooding in Bridges",
  level: "Intermediate",
  standard: "IEEE 802.1D",
  oneLiner: "Forwarding frames out of all ports except the arrival port when the destination MAC is unknown or broadcast.",
  quickAnswer: "Flooding occurs when a bridge receives a frame whose destination MAC address is not yet in its forwarding database, or when the frame is addressed to the broadcast address (FF:FF:FF:FF:FF:FF). The frame is copied and transmitted out of every port except the port it arrived on.",
  whyItMatters: "Flooding guarantees delivery even before a destination host has ever transmitted a packet.",
  overview: `<p>Flooding ensures that new or silent devices still receive traffic. Once the destination responds, the bridge learns its location and ceases flooding for that MAC.</p>`
});

addTopic("u2-spanning-tree-protocol", {
  title: "Spanning Tree Protocol (STP)",
  level: "Intermediate",
  standard: "IEEE 802.1D / Radia Perlman",
  oneLiner: "Radia Perlman's algorithm breaking physical loops to eliminate catastrophic broadcast storms.",
  quickAnswer: "If bridges are connected in physical loops for redundancy, flooded frames circulate endlessly, multiplying exponentially in a catastrophic broadcast storm. Radia Perlman's Spanning Tree Protocol (STP - IEEE 802.1D) elect a Root Bridge and selectively blocks redundant switch ports to maintain a loop-free logical tree.",
  whyItMatters: "STP allows enterprise networks to build fault-tolerant redundant physical cabling without crashing from forwarding loops.",
  overview: `<div class="wiki-img-box my-4 text-center"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Spanning_Tree_Protocol.svg/500px-Spanning_Tree_Protocol.svg.png" alt="Spanning Tree Protocol" class="mx-auto rounded-lg shadow border border-gray-200 dark:border-gray-700 max-h-80 object-contain" onerror="this.style.display='none'"><p class="text-xs text-gray-500 mt-1 italic">Figure: Spanning Tree Protocol electing root bridge and blocking redundant backup links.</p></div>`
});

addTopic("u2-bridges-vs-switches", {
  title: "Bridges vs Switches",
  level: "Intermediate",
  standard: "IEEE 802.1D / IEEE 802.3",
  oneLiner: "Software-based 2-port bridges vs hardware ASIC multiport high-speed switches.",
  quickAnswer: "A switch is fundamentally a multiport bridge implemented in specialized hardware (ASIC chips). Bridges typically had 2-4 ports and processed frames via software CPU interrupts. Switches offer 24-48+ ports, cut-through forwarding, dedicated full-duplex wire-speed bandwidth, and microsegmentation.",
  whyItMatters: "Hardware switching enabled modern enterprise LANs to abandon half-duplex shared Ethernet entirely.",
  overview: `<table class="wiki-table"><thead><tr><th>Feature</th><th>Legacy Bridge</th><th>Modern Switch</th></tr></thead><tbody><tr><td><strong>Hardware Architecture</strong></td><td>Software-driven CPU forwarding</td><td>Hardware ASIC / TCAM forwarding</td></tr><tr><td><strong>Port Density</strong></td><td>Few ports (typically 2 to 4)</td><td>High density (24, 48, 96+ ports)</td></tr><tr><td><strong>Forwarding Mode</strong></td><td>Store-and-forward only</td><td>Cut-through, Fragment-free, or Store-and-forward</td></tr><tr><td><strong>Collision Domains</strong></td><td>Few segments separated</td><td>Microsegmentation (each port is its own domain)</td></tr><tr><td><strong>Full Duplex Support</strong></td><td>Rare</td><td>Standard on all ports</td></tr></tbody></table>`
});

// -------------------------------------------------------------
// TOPIC 10: NETWORKING DEVICES
// -------------------------------------------------------------
addTopic("u2-networking-device-repeaters", {
  title: "Repeaters",
  level: "Beginner",
  standard: "OSI Layer 1 (Physical Layer)",
  oneLiner: "Physical layer devices that regenerate and amplify electrical or optical signals to extend cable reach.",
  quickAnswer: "A repeater operates at Layer 1 (Physical Layer). It receives attenuated, distorted electrical or optical signals from one cable segment, amplifies and reshapes them to restore pristine wave shape and voltage, and retransmits them onto the next segment. It does not inspect frames or filter traffic.",
  whyItMatters: "Repeaters overcome the physical attenuation limits of copper cables (e.g., the 100m Ethernet limit).",
  overview: `<p>A repeater operates at the bit level. It has no concept of frames, packets, MAC addresses, or IP addresses; it simply cleans and boosts physical signals.</p>`
});

addTopic("u2-networking-device-hubs", {
  title: "Hubs",
  level: "Beginner",
  standard: "OSI Layer 1 (Multiport Repeater)",
  oneLiner: "Multiport physical layer devices that blindly broadcast incoming bits to all connected ports.",
  quickAnswer: "A hub is a multiport repeater operating at Layer 1. When an electrical signal arrives on one port, the hub regenerates it and broadcasts it out to ALL other ports simultaneously. All connected computers share a single collision domain and a single broadcast domain.",
  whyItMatters: "Hubs enabled early star-topology 10BASE-T cabling before being completely replaced by switches.",
  overview: `<p>Because a hub blindly repeats bits to all ports, if two computers transmit at once, their signals collide inside the hub. Bandwidth is shared among all connected devices.</p>`
});

addTopic("u2-networking-device-bridges", {
  title: "Bridges",
  level: "Beginner",
  standard: "OSI Layer 2 (Data Link Layer)",
  oneLiner: "Layer 2 devices that inspect MAC addresses to filter and forward frames between network segments.",
  quickAnswer: "A bridge operates at Layer 2 (Data Link Layer). It inspects destination MAC addresses in frame headers, maintaining a forwarding table to isolate local traffic. It divides a network into separate collision domains while keeping a single broadcast domain.",
  whyItMatters: "Bridges introduced intelligent address-based traffic filtering to local area networking.",
  overview: `<p>Bridges read frames, verify FCS checksums, and forward frames only across ports where the destination device actually resides.</p>`
});

addTopic("u2-networking-device-switches", {
  title: "Switches",
  level: "Beginner",
  standard: "OSI Layer 2 (Multiport Bridge)",
  oneLiner: "High-performance Layer 2 devices providing dedicated full-duplex bandwidth per port via ASIC forwarding.",
  quickAnswer: "A switch operates at Layer 2 (Data Link Layer) as a high-speed multiport bridge. It maintains a MAC address table in hardware (CAM/TCAM) and forwards frames directly from input port to destination port without disturbing other ports. Each switch port is an isolated collision domain.",
  whyItMatters: "Switches form the backbone of modern enterprise LANs, Wi-Fi networks, and cloud datacenter fabrics.",
  overview: `<p>Switches provide dedicated collision-free communication to every attached computer, allowing simultaneous transmissions across different pairs of ports at full wire speed.</p>`
});

addTopic("u2-networking-device-routers", {
  title: "Routers",
  level: "Beginner",
  standard: "OSI Layer 3 (Network Layer)",
  oneLiner: "Layer 3 internetworking devices that forward packets between different IP subnets based on routing tables.",
  quickAnswer: "A router operates at Layer 3 (Network Layer). It inspects destination IP addresses, looks up best paths in routing tables (built via OSPF, BGP, or static routes), and forwards packets between different subnets. Routers break up both collision domains and broadcast domains.",
  whyItMatters: "Routers interconnect disparate network technologies (Ethernet, Wi-Fi, 5G, fiber) to form the global Internet.",
  overview: `<p>Unlike switches which operate within a single local subnet, routers connect entirely separate IP networks, making routing decisions based on IP prefixes.</p>`
});

addTopic("u2-networking-device-gateways", {
  title: "Gateways",
  level: "Intermediate",
  standard: "OSI Layer 4–7 (Application Layer)",
  oneLiner: "Protocol translators interconnecting systems with completely different architecture and protocol stacks.",
  quickAnswer: "A gateway operates across all upper OSI layers (Layers 4 to 7). Unlike routers which only route IP packets, a gateway translates between fundamentally different protocol architectures—such as converting between VoIP SIP telephony and analog PSTN, or translating email protocols.",
  whyItMatters: "Gateways enable communication between completely incompatible network architectures.",
  overview: `<p>A gateway translates payloads, commands, and encoding formats across incompatible protocol stacks (e.g., an IoT Zigbee-to-IP cloud gateway).</p>`
});

addTopic("u2-device-working-principles", {
  title: "Working Principles of Each Networking Device",
  level: "Intermediate",
  standard: "Tanenbaum Ch. 4.7 / Forouzan Ch. 15",
  oneLiner: "Detailed analysis of packet inspection depth and forwarding engines across L1 through L7 devices.",
  quickAnswer: "Repeaters/Hubs amplify bits at physical Layer 1 without buffering. Bridges/Switches inspect Layer 2 MAC addresses and verify CRC before forwarding. Routers strip Layer 2 frames, inspect Layer 3 IP headers, decrement TTL, and re-encapsulate into new link frames. Gateways translate Layer 4-7 payloads.",
  whyItMatters: "Understanding packet inspection depth is the foundation of network architecture and security troubleshooting.",
  overview: `<p>A comprehensive walkthrough of the internal processing pipeline when a packet traverses a Repeater, Hub, Bridge, Switch, Router, and Gateway.</p>`
});

addTopic("u2-comparison-networking-devices", {
  title: "Comparison of Networking Devices",
  level: "Intermediate",
  standard: "Tanenbaum Ch. 4.7 / Forouzan Ch. 15",
  oneLiner: "Master comparison table comparing Repeaters, Hubs, Bridges, Switches, Routers, and Gateways.",
  quickAnswer: "Master matrix contrasting operating OSI layers, PDU data units, addressing schemes, collision domain separation, and broadcast domain separation across all networking devices.",
  whyItMatters: "Universally tested across all computer science semester exams, GATE, and network engineering interviews.",
  overview: `<table class="wiki-table"><thead><tr><th>Device</th><th>OSI Layer</th><th>Data Unit</th><th>Addressing Used</th><th>Separates Collision Domains?</th><th>Separates Broadcast Domains?</th></tr></thead><tbody><tr><td><strong>Repeater</strong></td><td>Layer 1 (Physical)</td><td>Bits</td><td>None</td><td>No</td><td>No</td></tr><tr><td><strong>Hub</strong></td><td>Layer 1 (Physical)</td><td>Bits</td><td>None</td><td>No</td><td>No</td></tr><tr><td><strong>Bridge</strong></td><td>Layer 2 (Data Link)</td><td>Frames</td><td>MAC Address</td><td>Yes</td><td>No</td></tr><tr><td><strong>Switch</strong></td><td>Layer 2 (Data Link)</td><td>Frames</td><td>MAC Address</td><td>Yes (per port)</td><td>No (unless VLANs)</td></tr><tr><td><strong>Router</strong></td><td>Layer 3 (Network)</td><td>Packets</td><td>IP Address</td><td>Yes</td><td>Yes</td></tr><tr><td><strong>Gateway</strong></td><td>Layers 4–7 (App)</td><td>Messages</td><td>Protocol Specific</td><td>Yes</td><td>Yes</td></tr></tbody></table>`
});

addTopic("u2-device-osi-layers", {
  title: "OSI Layers at Which Networking Devices Operate",
  level: "Beginner",
  standard: "ISO/IEC 7498-1",
  oneLiner: "Clear visual mapping connecting physical hardware devices to their respective OSI layer levels.",
  quickAnswer: "Layer 1 (Physical): Repeaters, Hubs, Transceivers. Layer 2 (Data Link): Bridges, Switches, Network Interface Cards (NICs). Layer 3 (Network): Routers, Layer 3 Switches. Layers 4–7 (Upper Layers): Application Gateways, Firewalls, Web Application Proxies.",
  whyItMatters: "Anchors theoretical 7-layer OSI models to actual physical network hardware deployed in server rooms.",
  overview: `<div class="wiki-img-box my-4 text-center"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Network_device_types.svg/600px-Network_device_types.svg.png" alt="Network Device Types" class="mx-auto rounded-lg shadow border border-gray-200 dark:border-gray-700 max-h-80 object-contain" onerror="this.style.display='none'"><p class="text-xs text-gray-500 mt-1 italic">Figure: Visual mapping of networking devices to their respective OSI operational layers.</p></div>`
});

// -------------------------------------------------------------
// TOPIC 11: REVISION AND ASSESSMENT (PDF Sections 9-11)
// -------------------------------------------------------------
addTopic("u2-definitions-terminology", {
  title: "Important Definitions and Terminology",
  level: "Beginner",
  standard: "Forouzan Ch. 11 (PDF Section 9)",
  oneLiner: "Comprehensive glossary of all core Layer 2 terminology defined in textbook and syllabus notes.",
  quickAnswer: "Key terms from PDF: Frame (PDU of DLL), Framing (bitstream partitioning), Header (control bytes), Payload (user data), Trailer (error detection), Buffer (temporary storage), Flow Control (rate pacing), Error Control (ARQ recovery), MAC Address (48-bit local address), Byte/Bit Stuffing (delimiter escaping), FCS (CRC error check).",
  whyItMatters: "Direct reference for rapid 2-mark university exam questions and technical viva preparation.",
  overview: `<table class="wiki-table"><thead><tr><th>Term</th><th>Official Definition (PDF Section 9)</th></tr></thead><tbody><tr><td><strong>Data Link Layer</strong></td><td>Second layer of the OSI model responsible for node-to-node frame delivery.</td></tr><tr><td><strong>Frame</strong></td><td>The protocol data unit transmitted by the Data Link Layer.</td></tr><tr><td><strong>Framing</strong></td><td>Dividing a continuous bit stream into distinct, manageable blocks.</td></tr><tr><td><strong>Header</strong></td><td>Control information attached to the beginning of a frame (MACs, length).</td></tr><tr><td><strong>Payload</strong></td><td>The actual user data carried inside a frame from the Network Layer.</td></tr><tr><td><strong>Trailer</strong></td><td>Control information at the end of a frame containing error-detection codes (FCS).</td></tr><tr><td><strong>Buffer</strong></td><td>Temporary memory area used to store incoming data before it is processed.</td></tr><tr><td><strong>Flow Control</strong></td><td>Mechanism that regulates data transmission rate to prevent receiver buffer overflow.</td></tr><tr><td><strong>Error Control</strong></td><td>Procedures used to detect and recover from damaged, lost, or duplicated frames.</td></tr><tr><td><strong>ACK</strong></td><td>Positive acknowledgement confirming successful, error-free frame delivery.</td></tr><tr><td><strong>NAK</strong></td><td>Negative acknowledgement notifying sender that a frame was corrupted.</td></tr><tr><td><strong>ARQ</strong></td><td>Automatic Repeat Request: cooperative error recovery through retransmission.</td></tr><tr><td><strong>MAC Address</strong></td><td>48-bit hardware address uniquely identifying a network interface on a local link.</td></tr><tr><td><strong>Byte Stuffing</strong></td><td>Inserting escape bytes before flag delimiters appearing inside data payload.</td></tr><tr><td><strong>Bit Stuffing</strong></td><td>Inserting a 0 bit after every sequence of five consecutive 1 bits in data.</td></tr><tr><td><strong>Sequence Number</strong></td><td>Sequential integer identifying frames to detect duplicate and lost transmissions.</td></tr><tr><td><strong>FCS</strong></td><td>Frame Check Sequence: CRC remainder used by the receiver for error detection.</td></tr></tbody></table>`
});

addTopic("u2-important-diagrams", {
  title: "Important Diagrams for Unit 2",
  level: "Intermediate",
  standard: "Syllabus Visual Archive",
  oneLiner: "Visual revision gallery of all major diagrams across Data Link Layer topics.",
  quickAnswer: "Gallery features: (1) OSI Model Layer 2 position, (2) General Frame Format (Header, Payload, Trailer), (3) Character Count, Byte Stuffing & Bit Stuffing, (4) Stop-and-Wait, Go-Back-N, and Selective Repeat timelines, (5) CSMA/CD flowchart, (6) Ethernet 802.3 Frame format, (7) Wi-Fi RTS/CTS, and (8) Bridge forwarding table learning.",
  whyItMatters: "Examiners award maximum marks for accurate, well-labeled diagrams in semester examinations.",
  overview: `<p>A curated gallery of all essential Unit 2 diagrams with labels, timing annotations, and clear explanations for exam preparation.</p>`
});

addTopic("u2-comparison-tables", {
  title: "Master Comparison Tables for Unit 2",
  level: "Intermediate",
  standard: "Syllabus Comparison Suite",
  oneLiner: "All textbook comparison tables consolidated for quick revision and exam distinction questions.",
  quickAnswer: "Includes: Physical vs Data Link Layer (PDF 8.1), Framing vs Flow Control vs Error Control (PDF 8.2), Connectionless vs Connection-Oriented (PDF 8.3), Byte Stuffing vs Bit Stuffing (PDF 4.5), Flow Control vs Error Control (PDF 6.6), Pure vs Slotted ALOHA, Go-Back-N vs Selective Repeat, and Bridges vs Switches vs Routers.",
  whyItMatters: "Comparison questions frequently appear as 5-mark and 10-mark questions in university exams.",
  overview: `<p>Consolidated comparison tables directly derived from Behrouz Forouzan Chapter 11 and syllabus notes for fast revision.</p>`
});

addTopic("u2-numerical-problems", {
  title: "Numerical Problems & Solutions for Unit 2",
  level: "Advanced",
  standard: "University & GATE Exam Archive",
  oneLiner: "Step-by-step solved numerical problems on CSMA/CD minimum frame size, sliding window utilization, and ALOHA throughput.",
  quickAnswer: "Features fully worked solutions for: (1) Minimum frame size in CSMA/CD: L_min = 2 * RTT * Bandwidth, (2) Sliding window efficiency: eta = N / (1 + 2a), (3) Pure & Slotted ALOHA maximum throughput and offered load, (4) Bit stuffing output string calculation, and (5) CRC division and codeword generation.",
  whyItMatters: "Numerical questions test deep mathematical understanding and account for 20-30% of GATE network paper marks.",
  overview: `<p>Comprehensive repository of solved numerical problems with step-by-step algebraic substitutions and units.</p>`
});

addTopic("u2-protocol-examples", {
  title: "Step-by-Step Protocol Examples",
  level: "Intermediate",
  standard: "Protocol Execution Traces",
  oneLiner: "Detailed execution traces showing frame exchanges, timers, lost frame recovery, and sliding window advances.",
  quickAnswer: "Detailed traces of: (1) Byte stuffing with FLAG and ESC, (2) HDLC bit stuffing on data 01111110, (3) Stop-and-Wait ARQ lost frame recovery, (4) Go-Back-N discarding out-of-order frames after lost ACK, (5) Selective Repeat selective retransmission and buffering, and (6) Transparent bridge table building across 4 segments.",
  whyItMatters: "Walking through protocol traces builds intuitive mastery of state machines and edge cases.",
  overview: `<p>Visual chronological traces documenting exact sender and receiver state transitions during packet exchange and error recovery.</p>`
});

addTopic("u2-short-answer-questions", {
  title: "Short-Answer Questions (PDF Section 10)",
  level: "Beginner",
  standard: "University Exam Questions",
  oneLiner: "The 12 short-answer questions straight from syllabus PDF Section 10 with concise model answers.",
  quickAnswer: "Covers: 1. What is the Data Link Layer? 2. Position in OSI model? 3. Define framing. 4. What is a frame? 5. What is flow control? 6. What is error control? 7. Define byte stuffing. 8. Define bit stuffing. 9. What is ARQ? 10. What is a MAC address? 11. What is a buffer? 12. What is an acknowledgement?",
  whyItMatters: "Direct answers to the exact questions listed in syllabus notes Section 10.",
  overview: `<p>The complete set of 12 short-answer questions from PDF Section 10, formatted with precise two-to-three sentence exam-ready answers.</p>`
});

addTopic("u2-long-answer-questions", {
  title: "Long-Answer Questions (PDF Section 10)",
  level: "Intermediate",
  standard: "University Exam Questions",
  oneLiner: "The 8 major essay questions from PDF Section 10 with structured headings and diagrams.",
  quickAnswer: "Comprehensive answers to: 1. Functions and responsibilities of DLL. 2. Major design issues of DLL. 3. Three services provided to Network Layer. 4. Four framing methods with examples. 5. Flow control and its importance. 6. Error control and role of ARQ. 7. Differentiate flow control and error control. 8. Compare four framing methods.",
  whyItMatters: "Model long-form answers providing structured outlines, bullet points, and tables to score maximum marks.",
  overview: `<p>Structured long-form answers for the 8 core examination essay questions specified in PDF Section 10.</p>`
});

addTopic("u2-important-exam-questions", {
  title: "Important Exam Questions for Unit 2",
  level: "Intermediate",
  standard: "Anna Univ / VTU / JNTU / GATE Question Bank",
  oneLiner: "High-yield recurring university examination questions with marking schemes and key points.",
  quickAnswer: "Curated question bank categorized by marks (2 marks, 8 marks, 16 marks) covering DLL design issues, CRC calculation, sliding window protocols, CSMA/CD, Ethernet frame format, 802.11 RTS/CTS, and transparent bridges.",
  whyItMatters: "Focuses revision on the exact questions that appear repeatedly across university examinations.",
  overview: `<p>Categorized question bank of past university exam questions with tips on how to structure answers for maximum points.</p>`
});

addTopic("u2-mcqs", {
  title: "Multiple-Choice Questions (MCQs - PDF Section 10)",
  level: "Intermediate",
  standard: "PDF Section 10 Practice MCQs",
  oneLiner: "Interactive 8-question knowledge check from syllabus PDF Section 10 plus extended competitive MCQs.",
  quickAnswer: "Includes the 8 official MCQs from syllabus notes: 1. Layer responsible for framing? (DLL), 2. Data unit of DLL? (Frame), 3. Method inserting extra 0 after five 1s? (Bit stuffing), 4. Mechanism preventing receiver overload? (Flow control), 5. What ARQ stands for? (Automatic Repeat Request), 6. Service without ACKs? (Unacknowledged connectionless), 7. Part containing error detection? (Trailer), 8. What is a buffer? (Temporary memory area).",
  whyItMatters: "Direct verification against the self-assessment test in the student's study material.",
  overview: `<p>Interactive quiz implementing the exact questions from PDF Section 10 with immediate validation and explanations.</p>`,
  quiz: [
    {
      question: "Which layer is responsible for framing?",
      options: ["Physical Layer", "Data Link Layer", "Network Layer", "Transport Layer"],
      correct: 1,
      explanation: "The Data Link Layer (Layer 2) divides raw bitstreams into frames."
    },
    {
      question: "What is the data unit of the Data Link Layer?",
      options: ["Bit", "Packet", "Frame", "Segment"],
      correct: 2,
      explanation: "The Protocol Data Unit of the Data Link Layer is a Frame."
    },
    {
      question: "Which framing method inserts an extra zero after five consecutive 1s?",
      options: ["Byte stuffing", "Character count", "Bit stuffing", "Coding violation"],
      correct: 2,
      explanation: "Bit stuffing (used in HDLC) inserts a 0 bit after every sequence of five consecutive 1s."
    },
    {
      question: "Which mechanism prevents a fast sender from overwhelming a slow receiver?",
      options: ["Framing", "Flow control", "Physical addressing", "Routing"],
      correct: 1,
      explanation: "Flow control regulates transmission speed to prevent receiver buffer overflow."
    },
    {
      question: "What does ARQ stand for?",
      options: ["Automatic Repeat Request", "Advanced Routing Queue", "Address Resolution Query", "Automatic Rate Quality"],
      correct: 0,
      explanation: "ARQ stands for Automatic Repeat Request."
    },
    {
      question: "Which service sends frames without expecting acknowledgements?",
      options: ["Acknowledged connection-oriented", "Acknowledged connectionless", "Unacknowledged connectionless", "Connection-established service"],
      correct: 2,
      explanation: "Unacknowledged Connectionless Service transmits frames without connection setup or ACKs."
    },
    {
      question: "Which part of a general frame may contain error-detection information?",
      options: ["Payload", "Trailer", "Application data", "Session field"],
      correct: 1,
      explanation: "The trailer of a frame contains the Frame Check Sequence (FCS) / CRC."
    },
    {
      question: "What is a buffer?",
      options: ["A routing protocol", "A temporary memory area", "A type of frame", "A physical address"],
      correct: 1,
      explanation: "A buffer is a temporary memory area used to store incoming data before it is processed."
    }
  ]
});

addTopic("u2-practice-test", {
  title: "Unit 2 Comprehensive Practice Test",
  level: "Advanced",
  standard: "Semester Final Exam Simulation",
  oneLiner: "Full 25-question comprehensive assessment covering all 11 topics of Unit 2 with timer and score report.",
  quickAnswer: "Interactive timed exam simulation containing 25 balanced questions across DLL Fundamentals, Protocols, MAC Sublayer, Multiple Access, Collision-Free Protocols, Ethernet, Wireless LAN, 802.11, Switching, and Devices.",
  whyItMatters: "Final readiness check to test comprehensive retention and exam timing before university finals.",
  overview: `<p>A comprehensive 25-question final practice examination covering all 11 topics of Unit 2: Data Link Layer.</p>`
});

// Output code to js/topics_u2_syllabus.js
const fullCode = `// =============================================================================
// UNIT 2: DATA LINK LAYER & MAC SUBLAYER - COMPLETE CURRICULUM SYLLABUS TOPICS
// Aligned with Forouzan (4th & 6th Ed. Ch. 11-12), Tanenbaum (6th Ed. Ch. 3-4), Kurose & Ross
// Full 17-Point Structural Article Schema with Real-World Diagrams, Worked Examples & Practice Quizzes
// =============================================================================

const TOPICS_U2_SYLLABUS = ` + JSON.stringify(topics, null, 2) + `;

if (typeof window !== 'undefined') {
  window.TOPICS_U2_SYLLABUS = TOPICS_U2_SYLLABUS;
  if (window.TOPIC_REPOSITORY) {
    Object.assign(window.TOPIC_REPOSITORY, TOPICS_U2_SYLLABUS);
  }
}
if (typeof global !== 'undefined') {
  global.TOPICS_U2_SYLLABUS = TOPICS_U2_SYLLABUS;
  if (global.TOPIC_REPOSITORY) {
    Object.assign(global.TOPIC_REPOSITORY, TOPICS_U2_SYLLABUS);
  }
}
`;

fs.writeFileSync(path.join(__dirname, '../js/topics_u2_syllabus.js'), fullCode, 'utf8');
console.log("Successfully generated js/topics_u2_syllabus.js with", Object.keys(topics).length, "topics!");

