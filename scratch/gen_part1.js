// Generator script for Unit 2 complete topics database
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
    readingTime: data.readingTime || "15–25 min",
    standard: data.standard || "Forouzan / Tanenbaum Layer 2",
    oneLiner: data.oneLiner,
    quickAnswer: data.quickAnswer,
    whyItMatters: data.whyItMatters,
    prerequisitesList: data.prerequisitesList || [
      { concept: "OSI Layer 2", meaning: "Data Link Layer framing and link control" },
      { concept: "Node-to-Node Delivery", meaning: "Transfer of frames across a single hop" }
    ],
    learningObjectives: data.learningObjectives || [
      "Understand the theoretical foundations and protocol mechanics.",
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
      analogy: data.analogy || `Think of this mechanism as a coordinator ensuring items are passed accurately across a physical boundary.`,
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

// ==========================================
// TOPIC 1: DLL FUNDAMENTALS (Full PDF Notes)
// ==========================================
addTopic("u2-dll-intro", {
  title: "Introduction to Data Link Layer",
  level: "Beginner",
  standard: "Forouzan Ch. 11.1 / OSI Layer 2",
  oneLiner: "The second layer of the OSI model providing reliable node-to-node frame delivery across directly connected network devices.",
  quickAnswer: "The Data Link Layer is the second layer of the OSI model, situated between the Physical and Network layers. It organizes raw bitstreams into frames, handles physical addressing, error detection, flow control, and arbitrates access to shared media.",
  whyItMatters: "The Physical Layer only transmits unstructured bits without boundaries or error checks. The Data Link Layer enables meaningful, controlled communication over individual links.",
  overview: `
    <p>The <strong>Data Link Layer</strong> is the second layer of the OSI reference model. It is located between the Physical Layer (Layer 1) and the Network Layer (Layer 3).</p>
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
    <p><strong>Comparison of Addresses:</strong></p>
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

// ==========================================
// TOPIC 2: DATA LINK LAYER PROTOCOLS
// ==========================================
addTopic("u2-dll-protocols-intro", {
  title: "Introduction to Data Link Layer Protocols",
  level: "Beginner",
  standard: "Forouzan Ch. 11.2 / Tanenbaum Ch. 3.3",
  oneLiner: "The rules, state machines, and algorithms governing node-to-node frame transmission across communication channels.",
  quickAnswer: "Data Link Layer protocols are formalized sets of procedures that govern how two communicating network devices exchange frames, handle flow control, detect errors, and retransmit lost packets over physical links.",
  whyItMatters: "Hardware alone cannot coordinate communication; protocols define the state machines, message formats, and timing required for reliable link operation.",
  overview: `
    <p>A <strong>Data Link Layer Protocol</strong> defines the operational rules, packet framing formats, state machines, and recovery procedures that allow two directly connected machines to communicate across a link.</p>
    <p>In his standard curriculum, Forouzan divides data link protocols into two broad environments: <strong>Noiseless Channels</strong> (ideal theoretical links with zero bit errors) and <strong>Noisy Channels</strong> (practical links subject to noise, frame loss, and damage).</p>`
});

addTopic("u2-protocol-classification", {
  title: "Classification of Data Link Layer Protocols",
  level: "Beginner",
  standard: "Forouzan Ch. 11 / Kurose & Ross Ch. 5",
  oneLiner: "Taxonomy of link protocols divided into Noiseless Channel protocols and Noisy Channel ARQ protocols.",
  quickAnswer: "Data Link Layer protocols are classified into: (1) Protocols for Noiseless Channels (Simplest Protocol, Stop-and-Wait Protocol), and (2) Protocols for Noisy Channels (Stop-and-Wait ARQ, Go-Back-N ARQ, Selective Repeat ARQ).",
  whyItMatters: "Understanding protocol classification helps students see how simple theoretical models evolve into robust real-world sliding window protocols.",
  overview: `
    <p>Data Link protocols are systematically categorized based on channel characteristics and transmission complexity:</p>
    <table class="wiki-table">
      <thead><tr><th>Channel Type</th><th>Protocols</th><th>Key Features</th></tr></thead>
      <tbody>
        <tr><td><strong>Noiseless Channels</strong></td><td>1. Simplest Protocol<br>2. Stop-and-Wait Protocol</td><td>No error detection or retransmission needed; Stop-and-Wait adds flow control feedback.</td></tr>
        <tr><td><strong>Noisy Channels (ARQ)</strong></td><td>1. Stop-and-Wait ARQ<br>2. Go-Back-N ARQ<br>3. Selective Repeat ARQ</td><td>Handles lost, damaged, and duplicated frames using sequence numbers, ACKs, and timers.</td></tr>
      </tbody>
    </table>`
});

addTopic("stop-and-wait-noiseless", {
  title: "Stop-and-Wait Protocol for Noiseless Channels",
  level: "Beginner",
  standard: "Forouzan Ch. 11.2",
  oneLiner: "A noiseless protocol incorporating flow control feedback: the sender sends one frame and waits for an ACK before sending the next.",
  quickAnswer: "The Stop-and-Wait Protocol for noiseless channels provides flow control without error control. The sender transmits a frame, halts transmission, and waits until the receiver sends a confirmation (ACK) indicating it has processed the frame and is ready for the next.",
  whyItMatters: "It illustrates pure flow control in isolation from error control, demonstrating how feedback prevents receiver buffer overflow.",
  overview: `
    <p>In the <strong>Simplest Protocol</strong>, the sender continuously transmits frames assuming the receiver has infinite processing speed and buffer space. In reality, a receiver may be overwhelmed. The <strong>Stop-and-Wait Protocol for Noiseless Channels</strong> adds flow control by requiring the sender to wait for an explicit acknowledgement from the receiver before sending the next frame.</p>`
});

addTopic("comparison-noiseless-noisy", {
  title: "Comparison of Noiseless and Noisy Channel Protocols",
  level: "Intermediate",
  standard: "Forouzan Ch. 11",
  oneLiner: "Contrasting idealized zero-error protocols with realistic error-handling ARQ protocols.",
  quickAnswer: "Noiseless protocols assume error-free physical transmission and only address flow control, while noisy channel protocols introduce sequence numbers, timers, CRC checksums, and retransmission mechanisms (ARQ) to survive channel corruption and packet loss.",
  whyItMatters: "Real physical channels are never noiseless. Comparing both reveals why sequence numbers and timers are mandatory in real networks.",
  overview: `
    <table class="wiki-table">
      <thead><tr><th>Feature</th><th>Noiseless Channel Protocols</th><th>Noisy Channel Protocols (ARQ)</th></tr></thead>
      <tbody>
        <tr><td><strong>Channel Assumption</strong></td><td>Ideal; zero bit corruption or loss</td><td>Realistic; frames can be damaged or lost</td></tr>
        <tr><td><strong>Error Detection (CRC)</strong></td><td>Not required</td><td>Mandatory Frame Check Sequence</td></tr>
        <tr><td><strong>Retransmission Timers</strong></td><td>None</td><td>Sender maintains countdown timers</td></tr>
        <tr><td><strong>Sequence Numbers</strong></td><td>Not needed</td><td>Required to detect duplicate frames</td></tr>
        <tr><td><strong>Examples</strong></td><td>Simplest, Stop-and-Wait Noiseless</td><td>Stop-and-Wait ARQ, Go-Back-N, Selective Repeat</td></tr>
      </tbody>
    </table>`
});

addTopic("comparison-arq-protocols", {
  title: "Comparison of ARQ Protocols",
  level: "Intermediate",
  standard: "Forouzan Ch. 11 / Tanenbaum Ch. 3",
  oneLiner: "Master comparative analysis of Stop-and-Wait ARQ, Go-Back-N ARQ, and Selective Repeat ARQ.",
  quickAnswer: "Stop-and-Wait ARQ has sender/receiver window size 1/1 and low efficiency. Go-Back-N ARQ pipelines frames with sender window $2^m - 1$ and receiver window 1, retransmitting all unacknowledged frames on error. Selective Repeat ARQ has symmetric sender/receiver windows $2^{m-1}$, retransmitting only damaged frames.",
  whyItMatters: "This is one of the most heavily tested topics in university and GATE examinations, and governs how TCP and link layers achieve high throughput.",
  overview: `
    <p>Sliding window ARQ protocols trade protocol complexity for link utilization:</p>
    <div class="wiki-img-box my-4 text-center">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Go-Back-N_ARQ.svg/500px-Go-Back-N_ARQ.svg.png" alt="Go Back N ARQ" class="mx-auto rounded-lg shadow border border-gray-200 dark:border-gray-700 max-h-80 object-contain" onerror="this.style.display='none'">
      <p class="text-xs text-gray-500 mt-1 italic">Figure: Go-Back-N ARQ pipeline transmission and retransmission.</p>
    </div>
    <table class="wiki-table">
      <thead><tr><th>Parameter</th><th>Stop-and-Wait ARQ</th><th>Go-Back-N ARQ</th><th>Selective Repeat ARQ</th></tr></thead>
      <tbody>
        <tr><td><strong>Sender Window Size ($W_s$)</strong></td><td>1</td><td>$2^m - 1$</td><td>$2^{m-1}$</td></tr>
        <tr><td><strong>Receiver Window Size ($W_r$)</strong></td><td>1</td><td>1</td><td>$2^{m-1}$</td></tr>
        <tr><td><strong>Retransmission on Error</strong></td><td>Single lost frame</td><td>All $N$ frames in current window</td><td>Only the specific damaged frame</td></tr>
        <tr><td><strong>Receiver Buffering</strong></td><td>No buffer needed</td><td>Discards out-of-order frames</td><td>Buffers out-of-order frames</td></tr>
        <tr><td><strong>Link Utilization ($\\eta$)</strong></td><td>$\\frac{1}{1 + 2a}$</td><td>$\\frac{N}{1 + 2a}$ (up to 100%)</td><td>$\\frac{N}{1 + 2a}$ (up to 100%)</td></tr>
        <tr><td><strong>Implementation Complexity</strong></td><td>Minimal</td><td>Moderate</td><td>High (sorting buffer, timer per frame)</td></tr>
      </tbody>
    </table>`
});

// Write intermediate file
console.log("Writing topics part 1...");
const fullCode = `// Complete Unit 2 Topics Database
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

fs.writeFileSync(path.join(__dirname, '../js/topics_u2_syllabus.js'), fullCode);
console.log("Written partial topics_u2_syllabus.js");

