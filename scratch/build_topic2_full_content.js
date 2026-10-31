// build_topic2_full_content.js
// Generates full, university-grade educational content for Topic 2 and Topic 11 from the 36-page PDF.
// Strips all ASCII symbol art from js/topics_u2_syllabus.js and js/topics_u2.js.

const fs = require('fs');
const path = require('path');

// 1. Read existing syllabus database
const syllabusPath = path.join(__dirname, '..', 'js', 'topics_u2_syllabus.js');
let rawSyllabus = fs.readFileSync(syllabusPath, 'utf8');

// Strip out window / global wrapper to parse the object
let jsonCode = rawSyllabus;
const startIdx = jsonCode.indexOf('{');
const endIdx = jsonCode.lastIndexOf('};');
if (startIdx === -1 || endIdx === -1) {
  console.error("Failed to find boundaries in topics_u2_syllabus.js");
  process.exit(1);
}

const objStr = jsonCode.substring(startIdx, endIdx + 1);
let data;
try {
  data = eval('(' + objStr + ')');
} catch (e) {
  console.error("Eval error parsing topics_u2_syllabus.js:", e.message);
  process.exit(1);
}

console.log("Successfully parsed topics_u2_syllabus.js with", Object.keys(data).length, "topics.");

// Helper: Strip ASCII art from all existing topics in data
let strippedCount = 0;
for (const k in data) {
  if (data[k].sections && data[k].sections.diagram) {
    if (data[k].sections.diagram.includes('+--') || data[k].sections.diagram.includes('|')) {
      data[k].sections.diagram = "";
      strippedCount++;
    }
  }
}
console.log(`Stripped ASCII diagrams from ${strippedCount} topics.`);

// =============================================================================
// COMPLETE TOPIC 2 EDUCATIONAL CONTENT FROM THE 36-PAGE FOROUZAN PDF
// =============================================================================

// 1. u2-dll-protocols-intro: Introduction to Data Link Layer Protocols
data["u2-dll-protocols-intro"] = {
  id: "u2-dll-protocols-intro",
  title: "Introduction to Data Link Layer Protocols",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 2,
  subtopicNumber: 1,
  whyItMatters: "The Physical Layer only transmits an unstructured stream of bits with no flow control or error detection. Data Link Layer protocols establish the formal communication rules, framing, and reliability mechanisms necessary to transfer data error-free between directly connected nodes.",
  prerequisitesList: [
    { concept: "OSI Reference Model", meaning: "Layer 2 positioning directly above the Physical Layer and below the Network Layer" },
    { concept: "Node-to-Node Delivery", meaning: "Frame transmission across a single physical link connecting two adjacent network devices" },
    { concept: "Framing & Bitstreams", meaning: "Packaging Network Layer packets with headers and trailers for physical signaling" }
  ],
  learningObjectives: [
    "Define the formal purpose, scope, and operational responsibilities of Data Link Layer protocols.",
    "Identify the 6 critical transmission failure modes that necessitate link-layer protocol rules.",
    "Explain the 5 core assumptions outlined in Forouzan's protocol models.",
    "Understand the principles of flow control, error control, and the concept of bidirectional piggybacking."
  ],
  infobox: {
    layer: "Layer 2 (Data Link Layer)",
    standard: "IEEE 802 / ISO 7498-1 / RFC 1661 (PPP)",
    type: "Protocol Architectural Foundation",
    prerequisites: ["u2-dll-intro", "framing"],
    relatedConcepts: ["u2-protocol-classification", "stop-and-wait", "go-back-n", "flow-control"],
    compareWith: ["comparison-noiseless-noisy"],
    primaryUses: ["Point-to-point links (PPP/HDLC), Ethernet LANs (IEEE 802.3), Wi-Fi (IEEE 802.11)"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8d/OSI_Model_v1.svg",
  imageCaption: "Figure: Position of Data Link Layer Protocols in the 7-Layer OSI Architecture (Behrouz A. Forouzan, Chapter 11).",
  sections: {
    overview: `
      <p>A <strong>Data Link Layer Protocol</strong> is a formal set of specifications, timing rules, and procedural conventions that governs how data frames are transmitted, verified, and managed between two directly connected network stations.</p>
      <p>According to <em>Behrouz A. Forouzan (Data Communications and Networking, 4th Edition, Chapter 11 – Data Link Control)</em>, the protocol defines how sender and receiver interact across a physical medium, how transmission rates are harmonized, and how channel imperfections such as noise, attenuation, and buffer overflow are handled systematically.</p>
      
      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">The Six Essential Functions Defined by a DLL Protocol</h3>
      <ol class="wiki-ordered-list">
        <li><strong>Frame Construction and Transmission:</strong> Specifying how packets from the Network Layer are encapsulated into frames with addressing headers and error-checking trailers (FCS).</li>
        <li><strong>Frame Reception and Validation:</strong> Specifying how the receiver parses incoming signals, verifies frame boundaries, checks integrity, and extracts the payload.</li>
        <li><strong>Flow Control:</strong> Regulating the transmission rate of the sender so that a fast transmitting station never overruns the buffer capacity of a slower receiving station.</li>
        <li><strong>Acknowledgement Feedback:</strong> Establishing formal handshakes using positive control frames (ACK) or negative control frames (NAK) to report delivery status.</li>
        <li><strong>Error Detection and Recovery:</strong> Identifying corrupted, lost, or truncated frames and coordinating retransmission via Automatic Repeat reQuest (ARQ).</li>
        <li><strong>Duplicate Frame Identification:</strong> Employing sequence numbers to ensure that duplicate frames resulting from delayed or lost acknowledgements are recognized and safely discarded.</li>
      </ol>
    `,
    eli10: "Imagine you are sending numbered letters to your friend across a windy bridge. A protocol is the exact set of rules you both agree to follow: how you write the address on the envelope, how fast you send them, how your friend writes back a postcard saying 'I received letter #1', and what to do if a letter blows away in the wind.",
    analogy: "A Data Link Layer protocol is like the air traffic control protocol between an airport control tower and an approaching aircraft: before landing, strict radio call-and-response handshakes ensure no runway collisions occur and that commands are clearly acknowledged.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Why Data Link Layer Protocols are Required: 6 Failure Scenarios</h3>
      <p>When two hardware devices communicate over a real physical medium, several unavoidable physical and architectural failures can occur:</p>
      <ul class="wiki-bullet-list">
        <li><strong>Receiver Buffer Overrun:</strong> The sender transmits frames at high hardware clock speed, exceeding the receiver's software processing or storage capacity. Unprocessed frames are dropped silently.</li>
        <li><strong>Frame Corruption / Bit Alteration:</strong> Thermal noise, electromagnetic interference, and signal attenuation alter 0s into 1s and vice versa.</li>
        <li><strong>Complete Frame Loss:</strong> A severe noise burst destroys frame delimiters or intermediate network hardware drops the frame entirely.</li>
        <li><strong>Lost Acknowledgements:</strong> The receiver successfully accepts the frame and dispatches an ACK, but the ACK is corrupted or lost in transit back to the sender.</li>
        <li><strong>Duplicate Frame Reception:</strong> Due to a lost or delayed ACK, the sender assumes the original frame was lost and retransmits. Without sequence tracking, the receiver would deliver duplicate data to the application.</li>
        <li><strong>Out-of-Order Delivery:</strong> Frames traversing multi-path channels or experiencing selective retransmission arrive out of sequence, requiring reordering before delivery to the Network Layer.</li>
      </ul>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Five Fundamental Assumptions in Forouzan's Protocol Models</h3>
      <p>To analyze link-layer protocols rigorously, Forouzan establishes five foundational architectural assumptions:</p>
      <ol class="wiki-ordered-list">
        <li><strong>Unidirectional Data Flow:</strong> Data frames travel strictly in one direction from the transmitting station (sender) to the receiving station (receiver).</li>
        <li><strong>Reverse Control Signaling:</strong> Control feedback frames (ACK and NAK) travel in the opposite direction from receiver to sender.</li>
        <li><strong>Network Layer Service Interface:</strong> The sender obtains data packets on demand from its local Network Layer (Layer 3).</li>
        <li><strong>Reliable Layer 3 Delivery:</strong> The receiver delivers verified, error-free, and in-sequence packets up to its local Network Layer.</li>
        <li><strong>Concurrent State Machines:</strong> Both sender and receiver execute concurrent, event-driven algorithms responding to packet arrivals, frame timeouts, and physical signal interrupts.</li>
      </ol>

      <div class="wiki-callout note mt-4">
        <div class="callout-header font-bold text-blue-800 dark:text-blue-300">💡 Modern Bidirectional Operation: Piggybacking</div>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">While theoretical models separate data and ACK paths, practical full-duplex protocols employ <strong>Piggybacking</strong>: when Station B has data to send back to Station A, it attaches (piggybacks) the ACK sequence number for Station A's received frame into the header of its own outgoing data frame, saving link bandwidth and reducing header overhead.</p>
      </div>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Protocol Architecture & State Transitions</h3>
      <p>A link layer protocol is formally represented as an event-driven Finite State Machine (FSM). The sender and receiver transition between distinct states based on internal events and external channel signals:</p>
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Protocol Component</th>
            <th>Sender Responsibilities</th>
            <th>Receiver Responsibilities</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>State Transition</strong></td>
            <td>Ready &rarr; Sending &rarr; Blocking / Waiting for ACK</td>
            <td>Listening &rarr; Receiving &rarr; Checking CRC &rarr; Delivering &rarr; ACKing</td>
          </tr>
          <tr>
            <td><strong>Buffer Management</strong></td>
            <td>Maintains send window buffer for unacknowledged frames</td>
            <td>Maintains receive window buffer for out-of-order frames</td>
          </tr>
          <tr>
            <td><strong>Timer Management</strong></td>
            <td>Starts retransmission timer upon transmitting frame; cancels timer upon valid ACK</td>
            <td>Optional delayed-ACK timer to support piggybacking</td>
          </tr>
          <tr>
            <td><strong>Header Fields</strong></td>
            <td>Sequence Number ($S$), Frame Type, Destination MAC</td>
            <td>Acknowledgement Number ($R$), Receive Window Size ($W_r$)</td>
          </tr>
        </tbody>
      </table>
    `,
    workedExamples: {
      level1: "<strong>Question:</strong> State the primary distinction between a physical layer transmission and a data link layer protocol.<br><br><strong>Answer:</strong> The physical layer is concerned solely with moving raw, uninterpreted electrical, optical, or radio bits over a transmission medium. It has no awareness of data structure, boundaries, errors, or recipient capacity. A Data Link Layer protocol organizes these raw bits into structured frames, provides physical addressing, regulates transmission rates through flow control, and ensures data reliability through error detection and retransmission.",
      level2: "<strong>Scenario:</strong> Sender A transmits a data frame to Receiver B. B receives the frame correctly and sends an ACK. The ACK is destroyed by channel noise. Describe what occurs next under a standard ARQ protocol.<br><br><strong>Answer:</strong><br>1. Sender A started a retransmission timer when sending the frame.<br>2. Because the ACK was lost, A's timer expires (timeout occurs).<br>3. Sender A retransmits the exact same frame with the original sequence number (e.g., Frame 0).<br>4. Receiver B receives Frame 0 again. By inspecting the sequence number, B detects that Frame 0 is a duplicate.<br>5. Receiver B safely discards the duplicate frame to avoid corrupting upper-layer data.<br>6. Receiver B re-sends ACK 1 to unblock Sender A.",
      level3: "<strong>Analysis:</strong> Why cannot a data link protocol rely solely on error detection without sequence numbers for reliable transmission?<br><br><strong>Answer:</strong> Error detection mechanisms (like CRC) only indicate whether an individual received frame is intact or corrupted. If an acknowledgement is lost in the reverse channel, the sender is forced to retransmit. Without sequence numbers, the receiver has no way to determine whether an arriving frame is a brand-new data packet or a retransmission of the packet it just processed. This leads to silent data duplication in application files."
    },
    advantagesLimitations: `
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Protocol Mechanism</th>
            <th>Major Advantages</th>
            <th>Architectural Limitations / Overheads</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Framing & CRC</strong></td>
            <td>Guarantees frame boundary detection and virtually 100% bit error detection.</td>
            <td>Adds transmission overhead (preamble, headers, trailers, FCS bits).</td>
          </tr>
          <tr>
            <td><strong>Flow Control</strong></td>
            <td>Prevents buffer exhaustion and packet drops at slower receiver nodes.</td>
            <td>Can throttle high-speed transmitters and introduce round-trip idle time.</td>
          </tr>
          <tr>
            <td><strong>ARQ Retransmissions</strong></td>
            <td>Transforms an unreliable physical link into a deterministic, reliable communication channel.</td>
            <td>Requires buffer allocation, timer tracking, and wastes bandwidth upon error bursts.</td>
          </tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "Point-to-Point Protocol (PPP - RFC 1661) used over leased lines and broadband links.",
      "High-Level Data Link Control (HDLC) standard for synchronous serial lines.",
      "IEEE 802.3 Ethernet MAC sublayer protocol governing local wired networks.",
      "IEEE 802.11 Wi-Fi MAC protocol with CSMA/CA and Link-Layer ARQ."
    ],
    quiz: [
      {
        question: "What is the primary function of sequence numbers in a Data Link Layer protocol?",
        options: [
          "To allow the receiver to identify and discard duplicate frames caused by lost acknowledgements",
          "To encrypt the data payload for physical layer security",
          "To calculate the cyclic redundancy check (CRC) remainder",
          "To compress the frame payload and increase link speed"
        ],
        correct: 0,
        explanation: "Sequence numbers allow the receiver to distinguish between a new incoming frame and a duplicate retransmission caused by a lost or delayed acknowledgement."
      },
      {
        question: "Under Forouzan's protocol models, what is the assumed direction of data frames and control frames?",
        options: [
          "Data frames travel sender-to-receiver; control frames (ACK/NAK) travel receiver-to-sender",
          "Both data and control frames travel exclusively in both directions simultaneously",
          "Data frames travel receiver-to-sender; control frames travel sender-to-receiver",
          "Control frames are never transmitted across the physical medium"
        ],
        correct: 0,
        explanation: "Forouzan's elementary models assume unidirectional data frame flow from sender to receiver, with reverse control feedback (ACK/NAK) flowing from receiver to sender."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11 (Data Link Control), Section 11.4.", url: "" },
      { cite: "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 5th Edition, Chapter 3 (The Data Link Layer).", url: "" }
    ]
  }
};

// 2. u2-protocol-classification: Classification of Protocols
data["u2-protocol-classification"] = {
  id: "u2-protocol-classification",
  title: "Classification of Protocols",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 2,
  subtopicNumber: 2,
  whyItMatters: "Classifying Data Link Layer protocols according to channel characteristics—noiseless vs. noisy—provides the fundamental conceptual framework required to understand why complex mechanisms like sequence numbers, sliding windows, and timers are necessary in real-world networking.",
  prerequisitesList: [
    { concept: "u2-dll-protocols-intro", meaning: "Foundations and failure modes of link layer protocols" },
    { concept: "Transmission Channels", meaning: "Physical medium characteristics: ideal error-free channels vs. channels subject to noise, loss, and delay" }
  ],
  learningObjectives: [
    "Differentiate between noiseless (ideal) and noisy (realistic) communication channels.",
    "Map the 5 standard Forouzan protocols into their respective channel categories.",
    "Understand why noiseless protocols serve as pedagogical stepping stones for noisy-channel ARQ protocols.",
    "Identify the specific control features introduced at each step of protocol evolution."
  ],
  infobox: {
    layer: "Layer 2 (Data Link Layer)",
    standard: "Forouzan Academic Taxonomy (Ch. 11.4 & 11.5)",
    type: "Protocol Classification Hierarchy",
    prerequisites: ["u2-dll-protocols-intro"],
    relatedConcepts: ["simplex-protocol", "stop-and-wait-noiseless", "stop-and-wait", "go-back-n", "selective-repeat"],
    compareWith: ["comparison-noiseless-noisy"],
    primaryUses: ["Protocol design, performance modeling, communication theory education"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Multiple_Access.png",
  imageCaption: "Figure: Classification Taxonomy of Data Link Layer Protocols into Noiseless and Noisy Categories.",
  sections: {
    overview: `
      <p>In his authoritative textbook <em>Data Communications and Networking (4th Edition, Chapter 11)</em>, <strong>Behrouz A. Forouzan</strong> classifies Data Link Layer protocols into two distinct categories based on the characteristics of the physical communication channel:</p>
      
      <div class="wiki-callout note my-4">
        <h4 class="font-bold text-gray-900 dark:text-white mb-2">Forouzan's Protocol Classification Tree</h4>
        <ul class="wiki-bullet-list">
          <li><strong>1. Protocols for Noiseless Channels (Ideal Channels):</strong>
            <ul class="list-disc pl-5 mt-1 space-y-1">
              <li><strong>Simplest Protocol:</strong> No flow control, no error control.</li>
              <li><strong>Stop-and-Wait Protocol:</strong> Flow control added (1-frame ACK), no error control.</li>
            </ul>
          </li>
          <li><strong>2. Protocols for Noisy Channels (Realistic Channels):</strong>
            <ul class="list-disc pl-5 mt-1 space-y-1">
              <li><strong>Stop-and-Wait ARQ:</strong> Flow control + error control (1-bit sequence numbers alternating 0/1, timers, retransmission).</li>
              <li><strong>Go-Back-N ARQ:</strong> Pipelined sliding window ($W_s = 2^m - 1, W_r = 1$), cumulative ACKs, retransmits lost frame + all subsequent frames.</li>
              <li><strong>Selective Repeat ARQ:</strong> Pipelined sliding window ($W_s = W_r = 2^{m-1}$), receiver buffering, retransmits only the damaged frame.</li>
            </ul>
          </li>
        </ul>
      </div>

      <p>This progressive classification starts with an unattainable theoretical ideal (the noiseless channel) to isolate flow control mechanisms, then introduces channel noise and packet loss to demonstrate why sequence numbers, retransmission timers, and sliding windows are strictly required.</p>
    `,
    eli10: "Think of communication protocols like learning to drive. Noiseless protocols are like practicing on an empty test track with no other cars and perfect weather—you only focus on steering. Noisy protocols are like driving on a busy, rainy highway—you need windshield wipers, headlights, brakes, turn signals, and mirrors to handle real-world dangers.",
    analogy: "Studying noiseless protocols before noisy protocols is like studying frictionless physics ($F=ma$) in high school before learning about air resistance and friction in advanced engineering.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Noiseless Channel vs. Noisy Channel Characteristics</h3>
      
      <h4 class="font-bold text-sm text-gray-900 dark:text-white mt-3">1. Noiseless Channel Model (Ideal Assumption)</h4>
      <p>A noiseless channel is an idealized communication channel in which transmission errors do not occur. For studying noiseless protocols, four fundamental assumptions are made:</p>
      <ul class="wiki-bullet-list">
        <li>Every transmitted frame reaches the receiver without bit corruption.</li>
        <li>Frames are never dropped, damaged, or lost in transit.</li>
        <li>Frames are never duplicated by the channel.</li>
        <li>Frames always arrive in the exact order in which they were transmitted.</li>
      </ul>
      <p class="text-xs text-gray-500 italic mt-1">Note: In real physical environments, a truly noiseless channel does not exist; it is a conceptual model used to isolate flow control from error recovery.</p>

      <h4 class="font-bold text-sm text-gray-900 dark:text-white mt-3">2. Noisy Channel Model (Realistic Channel)</h4>
      <p>A noisy channel reflects real-world physical transmission media (copper wire, fiber optic, wireless radio) where signal degradation and hardware limitations occur:</p>
      <ul class="wiki-bullet-list">
        <li>Frames may be damaged: Noise alters bit values, causing CRC checksum verification to fail.</li>
        <li>Frames may be lost: Severe noise obliterates frame delimiters, or intermediate router buffers overflow.</li>
        <li>Acknowledgements may be lost: Return ACK/NAK control packets can be corrupted or dropped.</li>
        <li>Frames may arrive out of order: Multi-path transmission or retransmissions can scramble sequential delivery.</li>
      </ul>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Comparative Evolution Matrix of the Five Protocols</h3>
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Protocol</th>
            <th>Channel Type</th>
            <th>Flow Control?</th>
            <th>Error Control?</th>
            <th>Sequence Bits ($m$)</th>
            <th>Sender Window ($W_s$)</th>
            <th>Receiver Window ($W_r$)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Simplest Protocol</strong></td>
            <td>Noiseless</td>
            <td>None</td>
            <td>None</td>
            <td>None</td>
            <td>1</td>
            <td>1</td>
          </tr>
          <tr>
            <td><strong>Stop-and-Wait</strong></td>
            <td>Noiseless</td>
            <td>Yes (1-frame ACK)</td>
            <td>None</td>
            <td>None</td>
            <td>1</td>
            <td>1</td>
          </tr>
          <tr class="bg-blue-50 dark:bg-blue-900/30">
            <td><strong>Stop-and-Wait ARQ</strong></td>
            <td>Noisy</td>
            <td>Yes</td>
            <td>Yes (Retransmission)</td>
            <td>1 bit (0, 1)</td>
            <td>1</td>
            <td>1</td>
          </tr>
          <tr class="bg-emerald-50 dark:bg-emerald-900/30">
            <td><strong>Go-Back-N ARQ</strong></td>
            <td>Noisy</td>
            <td>Yes (Sliding window)</td>
            <td>Yes (Cumulative)</td>
            <td>$m$ bits</td>
            <td>$2^m - 1$</td>
            <td>1</td>
          </tr>
          <tr class="bg-purple-50 dark:bg-purple-900/30">
            <td><strong>Selective Repeat ARQ</strong></td>
            <td>Noisy</td>
            <td>Yes (Sliding window)</td>
            <td>Yes (Selective)</td>
            <td>$m$ bits</td>
            <td>$2^{m-1}$</td>
            <td>$2^{m-1}$</td>
          </tr>
        </tbody>
      </table>
    `,
    workedExamples: {
      level1: "<strong>Question:</strong> Why does the Stop-and-Wait protocol for noiseless channels not require sequence numbers?<br><br><strong>Answer:</strong> In an ideal noiseless channel, frames are never lost or corrupted, and acknowledgements are never lost. When the sender receives an ACK, it is guaranteed to acknowledge the one frame just sent. Duplicate frames can never arise, so sequence numbers are completely unnecessary.",
      level2: "<strong>Analysis:</strong> Suppose an engineer deploys the Stop-and-Wait noiseless protocol on a real noisy microwave link. What catastrophic failure occurs if a single frame is corrupted?<br><br><strong>Answer:</strong> The receiver's CRC check detects corruption and discards the frame without sending an ACK. Because the noiseless protocol lacks a retransmission timer, the sender waits indefinitely for an ACK that will never arrive. The entire link enters a permanent deadlock.",
      level3: "<strong>Design Evaluation:</strong> Under what conditions does Go-Back-N ARQ degrade severely compared to Selective Repeat ARQ?<br><br><strong>Answer:</strong> Go-Back-N ARQ degrades severely on high-bandwidth-delay product links (such as satellite communication) with a non-zero packet error rate. When one frame is lost, Go-Back-N forces the sender to discard and retransmit all $N-1$ subsequent frames that were already successfully received, clogging the channel with redundant transmissions."
    },
    advantagesLimitations: `
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Architectural Role</th>
            <th>Primary Limitation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Noiseless Protocols</strong></td>
            <td>Isolates flow control algorithms and establishes theoretical transmission bounds.</td>
            <td>Deadlocks instantly on real-world noisy physical media.</td>
          </tr>
          <tr>
            <td><strong>Noisy ARQ Protocols</strong></td>
            <td>Provides robust end-to-end reliability over imperfect physical links.</td>
            <td>Incurs computational, buffering, timer, and protocol header overhead.</td>
          </tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "Noiseless models: Network simulation benchmarks, theoretical channel capacity analysis.",
      "Noisy ARQ models: IEEE 802.11 Wi-Fi, DOCSIS cable modems, cellular LTE/5G RLC layer, TCP transport protocol."
    ],
    quiz: [
      {
        question: "Which of the following protocols provides flow control but NO error control?",
        options: [
          "Stop-and-Wait Protocol (Noiseless)",
          "Simplest Protocol",
          "Stop-and-Wait ARQ",
          "Go-Back-N ARQ"
        ],
        correct: 0,
        explanation: "The Stop-and-Wait Protocol for noiseless channels adds a 1-frame acknowledgement for flow control, but has no timers or sequence numbers for error control."
      },
      {
        question: "What is the receiver window size ($W_r$) in the Go-Back-N ARQ protocol?",
        options: [
          "Exactly 1",
          "$2^m - 1$",
          "$2^{m-1}$",
          "Unlimited"
        ],
        correct: 0,
        explanation: "In Go-Back-N ARQ, the receiver window size is strictly 1. The receiver only accepts the next frame in sequential order and discards all out-of-order frames."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11, Section 11.4 & 11.5.", url: "" }
    ]
  }
};

// 3. simplex-protocol: Simplest Protocol
data["simplex-protocol"] = {
  id: "simplex-protocol",
  title: "Simplest Protocol",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 2,
  subtopicNumber: 3,
  whyItMatters: "The Simplest Protocol serves as the absolute conceptual baseline of Data Link Layer communication, illustrating the minimal mechanisms needed to move frames when the channel is perfect and the receiver has infinite processing capacity.",
  prerequisitesList: [
    { concept: "u2-protocol-classification", meaning: "Noiseless vs noisy channel assumptions" },
    { concept: "Frame Encapsulation", meaning: "Adding headers and trailers to Network Layer packets" }
  ],
  learningObjectives: [
    "Define the Simplest Protocol and enumerate its 7 fundamental characteristics.",
    "Trace the 7-step operational procedure executed at the sender and receiver.",
    "Understand why receiver buffer overrun and transmission errors cause complete failure in this protocol.",
    "Evaluate the advantages and severe real-world limitations of unconstrained transmission."
  ],
  infobox: {
    layer: "Layer 2 (Data Link Layer)",
    standard: "Forouzan Chapter 11.4 (Elementary Protocol 1)",
    type: "Unidirectional Noiseless Protocol",
    prerequisites: ["u2-dll-protocols-intro", "u2-protocol-classification"],
    relatedConcepts: ["stop-and-wait-noiseless", "flow-control", "framing"],
    compareWith: ["stop-and-wait-noiseless"],
    primaryUses: ["Theoretical baseline modeling, internal chip-to-chip FIFO buses"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/76/Stop_and_wait_arq.png",
  imageCaption: "Figure: Elementary Transmission Model without Acknowledgement Feedback (Behrouz A. Forouzan).",
  sections: {
    overview: `
      <p>The <strong>Simplest Protocol</strong> (often called the <em>Utopian Simplex Protocol</em>) is the most basic Data Link Layer protocol possible. It provides unidirectional data frame transmission from a sender to a receiver over an ideal, noiseless communication channel without employing flow control or error control.</p>
      <p>According to <em>Forouzan (Section 11.4.1)</em>, the protocol assumes that the receiving station has unlimited buffer storage capacity and infinite processing speed. As a result, the receiver is always instantly ready to accept incoming frames, and the sender can transmit at maximum link speed without ever checking on the receiver.</p>
      
      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">The 7 Core Characteristics of the Simplest Protocol</h3>
      <ul class="wiki-bullet-list">
        <li><strong>No Flow Control:</strong> The sender transmits at full physical wire speed; no rate throttling exists.</li>
        <li><strong>No Error Control:</strong> Assumes zero bit errors, zero electrical noise, and zero packet drops.</li>
        <li><strong>No Acknowledgements:</strong> The receiver never dispatches feedback or confirmation signals back to the sender.</li>
        <li><strong>No Sequence Numbers:</strong> Every arriving frame is assumed to be a valid, unique, in-order packet.</li>
        <li><strong>No Retransmission Mechanisms:</strong> The sender maintains no timers, no frame buffers, and no resend logic.</li>
        <li><strong>Strictly Unidirectional:</strong> Data frames flow exclusively from Sender &rarr; Receiver; reverse channel is completely unused.</li>
        <li><strong>Instantaneous Processing:</strong> The receiver immediately delivers accepted packets to its local Network Layer.</li>
      </ul>
    `,
    eli10: "Imagine you are throwing baseballs into an enormous open barn. You never stop to look if anyone is catching them, you don't number the balls, and nobody yells back 'I got it!'. You just keep throwing as fast as you can, assuming the barn is infinitely large and the balls never get lost.",
    analogy: "A radio broadcast station transmitting an FM audio signal to transistor radios: the radio station broadcasts continuously without knowing if anyone has their radio turned on, without numbering songs, and without receiving any confirmation from listeners.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">7-Step Operational Procedure</h3>
      <p>The execution cycle of the Simplest Protocol proceeds in seven uninterrupted steps:</p>
      <ol class="wiki-ordered-list">
        <li>The Network Layer at the sender generates a packet and passes it to the Data Link Layer.</li>
        <li>The sender's Data Link Layer encapsulates the packet into a frame by adding header and trailer delimiters.</li>
        <li>The sender transmits the frame through the Physical Layer onto the communication medium.</li>
        <li>The receiver's Physical Layer captures the incoming signal and passes the frame to its Data Link Layer.</li>
        <li>The receiver's Data Link Layer extracts the network packet from the frame.</li>
        <li>The receiver delivers the packet immediately to its local Network Layer.</li>
        <li>The sender immediately accepts the next packet from its Network Layer and repeats the process without waiting.</li>
      </ol>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Step-by-Step Transmission Trace</h3>
      <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-mono space-y-1">
        <p class="text-blue-600 dark:text-blue-400 font-bold">Sender &rarr; Receiver Event Sequence:</p>
        <p>[t = 0] Sender creates Frame 0 &rarr; transmits on link</p>
        <p>[t = 1] Receiver receives Frame 0 &rarr; extracts packet &rarr; delivers to Layer 3</p>
        <p>[t = 2] Sender creates Frame 1 &rarr; transmits immediately (No ACK wait)</p>
        <p>[t = 3] Receiver receives Frame 1 &rarr; extracts packet &rarr; delivers to Layer 3</p>
        <p>[t = 4] Sender creates Frame 2 &rarr; transmits immediately</p>
        <p class="text-emerald-600 dark:text-emerald-400 font-bold">&rarr; Continuous frame transmission with zero handshaking overhead.</p>
      </div>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Algorithmic Pseudo-code (Forouzan Model)</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-3 rounded-lg bg-gray-900 text-gray-100 font-mono text-xs">
          <div class="text-emerald-400 font-bold mb-1">// Sender Algorithm</div>
          <div>while (true) {</div>
          <div class="pl-4">waitForEvent();</div>
          <div class="pl-4">getDataFromNetworkLayer(packet);</div>
          <div class="pl-4">makeFrame(frame, packet);</div>
          <div class="pl-4">sendFrame(frame);</div>
          <div>}</div>
        </div>
        <div class="p-3 rounded-lg bg-gray-900 text-gray-100 font-mono text-xs">
          <div class="text-blue-400 font-bold mb-1">// Receiver Algorithm</div>
          <div>while (true) {</div>
          <div class="pl-4">waitForEvent();</div>
          <div class="pl-4">receiveFrame(frame);</div>
          <div class="pl-4">extractData(packet, frame);</div>
          <div class="pl-4">deliverDataToNetworkLayer(packet);</div>
          <div>}</div>
        </div>
      </div>
      <p class="text-xs text-gray-500 mt-2">Notice that neither algorithm contains conditional branches (<code>if/else</code>), sequence variables, or timeout handlers. Both are pure infinite loops.</p>
    `,
    workedExamples: {
      level1: "<strong>Question:</strong> State two real-world assumptions that make the Simplest Protocol impractical for real computer networks.<br><br><strong>Answer:</strong> 1. It assumes the channel is completely noiseless (zero bit flips or dropped frames). In reality, noise and attenuation are omnipresent. 2. It assumes the receiver can process incoming frames infinitely fast with unlimited buffer space. In reality, a fast sender will overwhelm a slower receiver's buffer, resulting in massive frame drops.",
      level2: "<strong>Problem:</strong> A sender using the Simplest Protocol transmits 1000-byte frames over a 10 Mbps point-to-point link. The propagation delay is 10 ms. What is the theoretical maximum throughput?<br><br><strong>Answer:</strong> Since there is zero waiting time for acknowledgements, the sender transmits frames continuously back-to-back. Transmission time per frame $t_{\\text{tx}} = \\frac{1000 \\times 8}{10 \\times 10^6} = 0.8\\text{ ms}$. Throughput = 10 Mbps (100% link utilization), assuming zero errors.",
      level3: "<strong>Edge Case Analysis:</strong> What happens in the Simplest Protocol if the receiver's CPU takes 5 ms to process a frame, but the sender injects frames every 1 ms?<br><br><strong>Answer:</strong> The sender generates frames 5 times faster than the receiver can extract and deliver them. The receiver's input queue will fill within milliseconds. Once the buffer is full, every subsequent incoming frame is silently dropped at the physical network interface. The sender never realizes data is being lost, resulting in total communication breakdown."
    },
    advantagesLimitations: `
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Dimension</th>
            <th>5 Key Advantages</th>
            <th>5 Critical Disadvantages / Failures</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Simplicity</strong></td>
            <td>Easiest protocol to implement in hardware.</td>
            <td>Cannot detect or recover from transmission errors.</td>
          </tr>
          <tr>
            <td><strong>Overhead</strong></td>
            <td>Zero bandwidth wasted on ACK/NAK packets.</td>
            <td>No sequence numbers to detect dropped frames.</td>
          </tr>
          <tr>
            <td><strong>Processing</strong></td>
            <td>Zero state tracking, zero timer management.</td>
            <td>Vulnerable to receiver buffer overflow (flooding).</td>
          </tr>
          <tr>
            <td><strong>Channel Utilization</strong></td>
            <td>100% channel capacity dedicated to data payload.</td>
            <td>Completely unusable on realistic physical networks.</td>
          </tr>
          <tr>
            <td><strong>Memory Footprint</strong></td>
            <td>Sender requires no retransmission buffer.</td>
            <td>No flow regulation between asymmetric hardware devices.</td>
          </tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "Internal hardware bus communications with guaranteed synchronous clocking.",
      "Dedicated point-to-point fiber interconnects with dedicated hardware FIFOs.",
      "Academic instructional baseline for computer networking curriculum."
    ],
    quiz: [
      {
        question: "Why does the Simplest Protocol NOT need a retransmission timer?",
        options: [
          "Because it assumes an ideal noiseless channel where frames can never be lost or damaged",
          "Because timers are only used at the Transport Layer",
          "Because the receiver immediately sends a NAK if a frame is missing",
          "Because the frame header contains an automatic hardware recovery code"
        ],
        correct: 0,
        explanation: "The Simplest Protocol operates under the fundamental assumption of an ideal noiseless channel where frames are never lost, damaged, or delayed, making timers and retransmissions redundant."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Section 11.4.1.", url: "" }
    ]
  }
};

// 4. stop-and-wait-noiseless: Stop-and-Wait Protocol (Noiseless)
data["stop-and-wait-noiseless"] = {
  id: "stop-and-wait-noiseless",
  title: "Stop-and-Wait Protocol",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 2,
  subtopicNumber: 4,
  whyItMatters: "The Stop-and-Wait Protocol introduces the foundational concept of flow control. By forcing the sender to halt after each frame until an explicit acknowledgement is received, it solves the problem of receiver buffer overrun.",
  prerequisitesList: [
    { concept: "simplex-protocol", meaning: "Simplest Protocol operation and its buffer flooding failure" },
    { concept: "Flow Control", meaning: "Techniques for matching sender transmission rate with receiver processing speed" }
  ],
  learningObjectives: [
    "Explain why the Stop-and-Wait protocol is required to prevent receiver buffer overflow.",
    "Detail the 8-step operational workflow and communication exchange.",
    "Analyze the specific role of the Acknowledgement (ACK) frame.",
    "Compare the Stop-and-Wait Protocol directly with the Simplest Protocol."
  ],
  infobox: {
    layer: "Layer 2 (Data Link Layer)",
    standard: "Forouzan Chapter 11.4 (Elementary Protocol 2)",
    type: "Flow Control Noiseless Protocol",
    prerequisites: ["simplex-protocol"],
    relatedConcepts: ["stop-and-wait", "flow-control", "acknowledgement"],
    compareWith: ["simplex-protocol", "stop-and-wait"],
    primaryUses: ["Paced hardware interfaces, low-speed microcontroller telemetry"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/76/Stop_and_wait_arq.png",
  imageCaption: "Figure: Stop-and-Wait Protocol Handshake: Transmit Frame -> Await ACK -> Transmit Next Frame.",
  sections: {
    overview: `
      <p>The <strong>Stop-and-Wait Protocol</strong> is a noiseless-channel Data Link Layer protocol that incorporates <strong>flow control</strong> to prevent a fast sender from swamping a slow receiver with data.</p>
      <p>In the Simplest Protocol, a major flaw is that if the sender transmits frames faster than the receiver can process them, the receiver's buffer overflows and frames are dropped. The Stop-and-Wait Protocol overcomes this vulnerability: the sender transmits exactly <strong>one frame</strong>, stops, and waits for an <strong>Acknowledgement (ACK)</strong> control frame from the receiver before transmitting the next frame.</p>
      
      <div class="wiki-callout note my-3">
        <h4 class="font-bold text-gray-900 dark:text-white mb-1">Core Principle</h4>
        <p class="text-xs text-gray-700 dark:text-gray-300">The sender can have at most <strong>one unacknowledged frame</strong> outstanding on the communication link at any instant. Data frames and ACK frames alternate strictly across the channel.</p>
      </div>
    `,
    eli10: "Imagine you are talking on a walkie-talkie. You say one sentence, then say 'Over', and release the button. You wait until your friend says 'Copy that, go ahead' before you speak your next sentence. This prevents you from talking over each other and ensures your friend understood you.",
    analogy: "Like a teacher handing out quiz sheets one by one to a student: the teacher waits until the student takes the first sheet and says 'Ready' before handing over the second sheet.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">The 8-Step Operational Workflow</h3>
      <ol class="wiki-ordered-list">
        <li>The sender's Network Layer supplies a data packet to the Data Link Layer.</li>
        <li>The sender's Data Link Layer encapsulates the packet into a frame.</li>
        <li>The sender transmits the frame across the physical link to the receiver.</li>
        <li><strong>Sender enters blocking wait state:</strong> The sender halts transmission and waits for receiver feedback.</li>
        <li>The receiver accepts the frame, verifies frame integrity, and extracts the network packet.</li>
        <li>The receiver delivers the packet up to its local Network Layer.</li>
        <li>The receiver formats an Acknowledgement (ACK) frame and transmits it back to the sender.</li>
        <li>Upon receiving the ACK, the sender unblocks, retrieves the next packet from its Network Layer, and repeats the cycle.</li>
      </ol>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Role and Significance of the Acknowledgement (ACK)</h3>
      <p>In the Stop-and-Wait Protocol, the ACK frame serves two vital operational functions:</p>
      <ul class="wiki-bullet-list">
        <li><strong>Confirmation of Receipt:</strong> Informs the sender that the preceding frame was delivered safely to the receiver's Data Link Layer.</li>
        <li><strong>Permission to Transmit (Flow Control Token):</strong> Serves as an explicit notification that the receiver has emptied its input buffer and is now ready to receive the subsequent frame.</li>
      </ul>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Detailed Comparison: Simplest Protocol vs. Stop-and-Wait Protocol</h3>
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Comparison Parameter</th>
            <th>Simplest Protocol</th>
            <th>Stop-and-Wait Protocol</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Channel Assumption</strong></td>
            <td>Ideal noiseless channel</td>
            <td>Ideal noiseless channel</td>
          </tr>
          <tr>
            <td><strong>Flow Control Mechanism</strong></td>
            <td>None (Sender transmits continuously)</td>
            <td>Stop-and-Wait (1-frame ACK handshake)</td>
          </tr>
          <tr>
            <td><strong>Error Control Mechanism</strong></td>
            <td>None</td>
            <td>None (No sequence numbers, no timers)</td>
          </tr>
          <tr>
            <td><strong>Receiver Overload Protection</strong></td>
            <td>No protection; vulnerable to buffer flooding</td>
            <td>Complete protection against buffer overflow</td>
          </tr>
          <tr>
            <td><strong>Acknowledgement (ACK)</strong></td>
            <td>Not used</td>
            <td>Required for every transmitted frame</td>
          </tr>
          <tr>
            <td><strong>Outstanding Frames Allowed</strong></td>
            <td>Unlimited (Continuous transmission)</td>
            <td>Exactly 1 frame</td>
          </tr>
          <tr>
            <td><strong>Channel Utilization ($\eta$)</strong></td>
            <td>Theoretical 100%</td>
            <td>Low ($\eta = \frac{t_{\\text{tx}}}{t_{\\text{tx}} + 2 t_{\\text{prop}}}$)</td>
          </tr>
        </tbody>
      </table>
    `,
    workedExamples: {
      level1: "<strong>Question:</strong> Why is the Stop-and-Wait protocol still classified under noiseless channels even though it uses ACKs?<br><br><strong>Answer:</strong> The ACK in Stop-and-Wait is used exclusively for flow control (pacing the sender), not error control. The protocol has no retransmission timer and no sequence numbers. If a frame or ACK were lost on a noisy link, the protocol would deadlock permanently.",
      level2: "<strong>Problem:</strong> A host transmits 1000-bit frames over a 1 Mbps link using Stop-and-Wait. The one-way propagation delay $t_{\\text{prop}}$ is 10 ms. Assume ACK transmission time is negligible. Calculate the channel efficiency $\\eta$.<br><br><strong>Answer:</strong><br>Frame transmission time: $t_{\\text{tx}} = \\frac{1000}{10^6} = 1\\text{ ms}$.<br>Total cycle time: $T = t_{\\text{tx}} + 2 \\cdot t_{\\text{prop}} = 1\\text{ ms} + 2(10\\text{ ms}) = 21\\text{ ms}$.<br>Efficiency: $\\eta = \\frac{t_{\\text{tx}}}{T} = \\frac{1}{21} \\approx 4.76\\%$.<br>Notice that over 95% of the channel capacity is wasted waiting for the ACK!",
      level3: "<strong>Vulnerability Analysis:</strong> Explain the exact deadlock condition that occurs if Stop-and-Wait (noiseless) is deployed on a noisy channel.<br><br><strong>Answer:</strong> If channel noise corrupts a data frame, the receiver's hardware discards the bad bits and sends nothing. The sender has already stopped and entered its waiting state. Because there is no timeout mechanism, the sender waits forever for the ACK, and the receiver waits forever for the frame. Both machines remain frozen in their wait states."
    },
    advantagesLimitations: `
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Aspect</th>
            <th>Advantages</th>
            <th>Limitations</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Buffer Management</strong></td>
            <td>Receiver requires only a 1-frame buffer; overflow is physically impossible.</td>
            <td>Extremely inefficient on "long fat networks" (high bandwidth-delay product).</td>
          </tr>
          <tr>
            <td><strong>Implementation</strong></td>
            <td>Simple 2-state logic without sequence counters or timers.</td>
            <td>Cannot handle lost frames or lost ACKs; lacks error recovery.</td>
          </tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "Low-speed microcontroller communication (UART/SPI) with restricted memory buffers.",
      "Legacy terminal-to-mainframe pacing protocols.",
      "Pedagogical foundation for Stop-and-Wait ARQ."
    ],
    quiz: [
      {
        question: "What is the primary problem solved by the Stop-and-Wait Protocol compared to the Simplest Protocol?",
        options: [
          "Receiver buffer overflow caused by an over-speed sender",
          "Transmission bit errors caused by channel noise",
          "Packet duplication caused by lost acknowledgements",
          "Routing loops in intermediate packet switches"
        ],
        correct: 0,
        explanation: "Stop-and-Wait introduces flow control via a 1-frame acknowledgement handshake, guaranteeing that a fast sender never floods a slow receiver."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Section 11.4.2.", url: "" }
    ]
  }
};

// 5. stop-and-wait: Stop-and-Wait ARQ
data["stop-and-wait"] = {
  id: "stop-and-wait",
  title: "Stop-and-Wait ARQ",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 2,
  subtopicNumber: 5,
  whyItMatters: "Stop-and-Wait ARQ is the foundational error-control protocol for realistic noisy channels. It integrates sequence numbers, acknowledgements, and retransmission timers to guarantee reliable, in-order delivery without duplicates.",
  prerequisitesList: [
    { concept: "stop-and-wait-noiseless", meaning: "1-frame flow control handshake" },
    { concept: "Error Detection (CRC)", meaning: "Using checksums/FCS to identify corrupted bits" },
    { concept: "ARQ Concepts", meaning: "Automatic Repeat reQuest using timers and retransmission" }
  ],
  learningObjectives: [
    "Define Automatic Repeat reQuest (ARQ) and explain the role of timers and sequence numbers.",
    "Explain why a 1-bit sequence number (0 and 1, modulo 2) is strictly sufficient for Stop-and-Wait ARQ.",
    "Trace protocol recovery under Case 1 (Lost Frame), Case 2 (Lost ACK), and Case 3 (Delayed ACK).",
    "Calculate protocol throughput and channel efficiency using $\\eta = \\frac{1}{1 + 2a}$."
  ],
  infobox: {
    layer: "Layer 2 (Data Link Layer)",
    standard: "Forouzan Chapter 11.5 / ISO HDLC / ITU-T V.42",
    type: "Error & Flow Control Protocol (Noisy Channels)",
    prerequisites: ["stop-and-wait-noiseless", "error-detection"],
    relatedConcepts: ["go-back-n", "selective-repeat", "flow-control", "crc"],
    compareWith: ["stop-and-wait-noiseless", "go-back-n", "selective-repeat"],
    primaryUses: ["TFTP (Trivial File Transfer Protocol), Bluetooth basic rate, deep-space telemetry"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/76/Stop_and_wait_arq.png",
  imageCaption: "Figure: Stop-and-Wait ARQ Normal Transmission and Retransmission on Timeout (Behrouz A. Forouzan, Chapter 11.5).",
  sections: {
    overview: `
      <p><strong>Stop-and-Wait Automatic Repeat reQuest (Stop-and-Wait ARQ)</strong> is a data link layer protocol designed for <strong>noisy communication channels</strong> that provides both <strong>flow control</strong> and <strong>error control</strong>.</p>
      <p>According to <em>Forouzan (Section 11.5.1)</em>, Stop-and-Wait ARQ enhances the basic Stop-and-Wait protocol by incorporating four critical reliability mechanisms:</p>
      <ul class="wiki-bullet-list">
        <li><strong>Sequence Numbers:</strong> Data frames carry a 1-bit sequence number alternating between 0 and 1 ($S \\in \\{0, 1\\}$) using modulo-2 arithmetic.</li>
        <li><strong>Acknowledgement Numbers:</strong> Control frames carry an acknowledgement number designating the <em>next expected frame</em> ($R \\in \\{0, 1\\}$). For example, ACK 1 confirms receipt of Frame 0 and announces readiness for Frame 1.</li>
        <li><strong>Retransmission Timers:</strong> The sender starts a countdown timer immediately upon transmitting a frame. If an ACK does not arrive before the timer expires (timeout), the sender automatically retransmits the frame.</li>
        <li><strong>Duplicate Discarding:</strong> If the receiver detects an incoming frame with a sequence number identical to the previously accepted frame, it silently discards the duplicate payload while repeating the ACK to unblock the sender.</li>
      </ul>
    `,
    eli10: "Imagine you are mailing numbered envelopes (Envelope 0, then Envelope 1, then Envelope 0...) to a friend. You set a kitchen timer for 5 minutes every time you drop an envelope in the mailbox. If your friend sends back a postcard saying 'Got Envelope 0, now send 1', you turn off the timer and send Envelope 1. But if your timer dings and no postcard has arrived, you assume the mail truck crashed and you send a copy of Envelope 0 again!",
    analogy: "Like a registered postal delivery where the delivery agent requires a signed confirmation receipt before returning to base. If the receipt is lost in transit, the post office tracks the delivery record so the recipient is never given two identical packages.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">9-Step Operational Workflow</h3>
      <ol class="wiki-ordered-list">
        <li>Sender fetches packet from Network Layer and sets Sequence Number $S = 0$.</li>
        <li>Sender builds frame containing sequence number $S$ and calculates CRC trailer.</li>
        <li>Sender starts its retransmission timer and transmits Frame $S$ across the link.</li>
        <li>Sender pauses and waits for an incoming ACK or timeout event.</li>
        <li>Receiver checks frame CRC. If intact and sequence matches expected number $R$ ($S == R$):
          <ul class="list-disc pl-5 mt-1 space-y-0.5">
            <li>Receiver accepts frame and delivers packet to its Network Layer.</li>
            <li>Receiver advances expected sequence number: $R = (R + 1) \\pmod 2$.</li>
            <li>Receiver sends control frame $\\text{ACK } R$ back to the sender.</li>
          </ul>
        </li>
        <li>Sender receives $\\text{ACK } R$. If $R == (S + 1) \\pmod 2$:
          <ul class="list-disc pl-5 mt-1 space-y-0.5">
            <li>Sender stops and cancels the retransmission timer.</li>
            <li>Sender updates $S = (S + 1) \\pmod 2$.</li>
            <li>Sender fetches the next packet and repeats from Step 2.</li>
          </ul>
        </li>
        <li><strong>Case 1 (Lost Data Frame):</strong> If the frame is lost or corrupted in transit, the receiver does nothing. The sender's timer expires. The sender retransmits Frame $S$, restarts the timer, and awaits ACK.</li>
        <li><strong>Case 2 (Lost ACK / Duplicate Detection):</strong> Frame $S$ arrives safely, but the returning ACK is destroyed by channel noise. The sender's timer expires and retransmits Frame $S$. The receiver receives Frame $S$, sees $S \\neq R$ (sequence mismatch), discards the duplicate payload, and retransmits $\\text{ACK } R$ to satisfy the sender.</li>
        <li><strong>Case 3 (Delayed ACK):</strong> An ACK is delayed past timeout. The sender retransmits, but the delayed ACK arrives later. Sequence numbering prevents the sender from getting out of sync.</li>
      </ol>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Mathematical Performance & Efficiency Analysis</h3>
      <p>Let:</p>
      <ul class="wiki-bullet-list">
        <li>$t_{\\text{tx}} = \\frac{L}{B}$ be the frame transmission time ($L$ = frame length in bits, $B$ = bandwidth in bps).</li>
        <li>$t_{\\text{prop}} = \\frac{d}{v}$ be the one-way propagation delay ($d$ = distance, $v$ = signal velocity).</li>
        <li>$t_{\\text{ack}}$ be the transmission time of the small ACK frame (typically negligible, $\\approx 0$).</li>
        <li>$t_{\\text{proc}}$ be the receiver processing time (typically negligible).</li>
      </ul>
      <p class="mt-2">The total round-trip time required to transmit one frame successfully without errors is:</p>
      <div class="p-3 my-2 bg-slate-100 dark:bg-slate-800 rounded font-mono text-xs text-center">
        $$T_{\\text{total}} = t_{\\text{tx}} + 2 \\cdot t_{\\text{prop}} + t_{\\text{ack}} \\approx t_{\\text{tx}} + 2 \\cdot t_{\\text{prop}}$$
      </div>
      <p>The channel utilization or efficiency $\\eta$ is defined as the ratio of transmission time to total cycle time:</p>
      <div class="p-3 my-2 bg-slate-100 dark:bg-slate-800 rounded font-mono text-xs text-center">
        $$\\eta = \\frac{t_{\\text{tx}}}{t_{\\text{tx}} + 2 \\cdot t_{\\text{prop}}} = \\frac{1}{1 + 2 \\cdot \\left(\\frac{t_{\\text{prop}}}{t_{\\text{tx}}}\\right)} = \\frac{1}{1 + 2a}, \\quad \\text{where } a = \\frac{t_{\\text{prop}}}{t_{\\text{tx}}}$$
      </div>
      <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">When $a \\ll 1$ (short cable link), efficiency approaches 100%. When $a \\gg 1$ (satellite or long-distance WAN), efficiency plummets near 0%.</p>
    `,
    workedExamples: {
      level1: "<strong>Question:</strong> Why are only two sequence numbers (0 and 1) required in Stop-and-Wait ARQ?<br><br><strong>Answer:</strong> In Stop-and-Wait ARQ, the sender can have at most one outstanding unacknowledged frame at any time. When a frame arrives at the receiver, the receiver only needs to distinguish between two possibilities: (1) Is this the new expected frame, or (2) Is this a retransmission of the previous frame whose ACK was lost? A single binary bit (0 or 1) toggles between these two states, making a 1-bit sequence number strictly sufficient.",
      level2: "<strong>Problem:</strong> A satellite link has a bandwidth of 1 Mbps and a one-way propagation delay of 250 ms. If the frame size is 1000 bytes (8000 bits), calculate parameter $a$, the link efficiency $\\eta$, and the effective throughput.<br><br><strong>Answer:</strong><br>1. Transmission time: $t_{\\text{tx}} = \\frac{8000 \\text{ bits}}{10^6 \\text{ bps}} = 8\\text{ ms} = 0.008\\text{ s}$.<br>2. Parameter $a = \\frac{t_{\\text{prop}}}{t_{\\text{tx}}} = \\frac{250\\text{ ms}}{8\\text{ ms}} = 31.25$.<br>3. Efficiency: $\\eta = \\frac{1}{1 + 2a} = \\frac{1}{1 + 2(31.25)} = \\frac{1}{63.5} \\approx 0.0157 = 1.57\\%$.<br>4. Throughput: $\\text{Throughput} = \\eta \\times \\text{Bandwidth} = 0.0157 \\times 1\\text{ Mbps} \\approx 15.7\\text{ kbps}$.<br>Over 98.4% of the multi-million dollar satellite link is left empty!",
      level3: "<strong>Edge Case Analysis:</strong> What happens if the sender's timeout duration is set shorter than the round-trip propagation time ($t_{\\text{timeout}} < 2 \\cdot t_{\\text{prop}}$)?<br><br><strong>Answer:</strong> Premature timeout occurs on every single frame. The sender will retransmit Frame 0 before the receiver's valid ACK 1 can return. The receiver will discard the duplicate and re-ACK, while the sender treats the delayed ACK 1 as an acknowledgement of the duplicate, creating an infinite cycle of spurious duplicate retransmissions that clogs the link."
    },
    advantagesLimitations: `
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Aspect</th>
            <th>Advantages</th>
            <th>Disadvantages</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Simplicity & Buffers</strong></td>
            <td>Requires minimal buffer space (1 frame at sender, 1 frame at receiver). Simple 1-bit logic.</td>
            <td>Abysmal link utilization on high bandwidth-delay links ($a \\gg 1$).</td>
          </tr>
          <tr>
            <td><strong>Reliability</strong></td>
            <td>Guarantees 100% in-order delivery and eliminates all duplicate frames.</td>
            <td>Idle channel time: the sender spends most of its time blocked waiting for ACKs.</td>
          </tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "TFTP (Trivial File Transfer Protocol - RFC 1350) for booting network hardware.",
      "XMODEM file transfer protocol on legacy dial-up connections.",
      "Low-power wireless sensor networks (Zigbee / LoRaWAN) with constrained memory."
    ],
    quiz: [
      {
        question: "In Stop-and-Wait ARQ, if the sender receives ACK 0 after sending Frame 0, what does it mean?",
        options: [
          "An error occurred: ACK 0 indicates the receiver is still expecting Frame 0 (meaning Frame 0 was lost or corrupt)",
          "Frame 0 was accepted and the sender can send Frame 1",
          "The channel has been closed by the receiver",
          "The sequence numbers need to be reset"
        ],
        correct: 0,
        explanation: "Stop-and-Wait ARQ uses the next-expected-frame convention. If Frame 0 was accepted, the receiver sends ACK 1. An ACK 0 indicates that the receiver is still expecting Frame 0, signaling that Frame 0 was lost or discarded."
      },
      {
        question: "If parameter $a = t_{\\text{prop}} / t_{\\text{tx}} = 4$, what is the channel efficiency of Stop-and-Wait ARQ?",
        options: [
          "11.1%",
          "20.0%",
          "50.0%",
          "100.0%"
        ],
        correct: 0,
        explanation: "$\\eta = \\frac{1}{1 + 2a} = \\frac{1}{1 + 2(4)} = \\frac{1}{9} \\approx 11.1\\%$."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Section 11.5.1.", url: "" }
    ]
  }
};

// 6. go-back-n: Go-Back-N ARQ
data["go-back-n"] = {
  id: "go-back-n",
  title: "Go-Back-N ARQ",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 2,
  subtopicNumber: 6,
  whyItMatters: "Go-Back-N ARQ overcomes the massive idle time of Stop-and-Wait by pipelining up to N frames concurrently. It uses sliding windows and cumulative acknowledgements to maximize channel utilization while keeping receiver hardware simple.",
  prerequisitesList: [
    { concept: "stop-and-wait", meaning: "Stop-and-Wait ARQ limitations and parameter a" },
    { concept: "Sliding Window Concept", meaning: "Pipelining frames using window boundaries and sequence number modulo arithmetic" }
  ],
  learningObjectives: [
    "Explain the concept of pipelining and why it solves the channel efficiency bottleneck of Stop-and-Wait.",
    "Derive the sender window size $W_s = 2^m - 1$ and understand why $W_s$ cannot equal $2^m$.",
    "Trace Go-Back-N execution during normal transmission and during frame loss with subsequent frame discard.",
    "Explain cumulative acknowledgements and the 'go-back' retransmission penalty."
  ],
  infobox: {
    layer: "Layer 2 (Data Link Layer)",
    standard: "Forouzan Chapter 11.5 / ISO 7776 (HDLC) / CCITT X.25",
    type: "Pipelined Sliding Window Protocol",
    prerequisites: ["stop-and-wait"],
    relatedConcepts: ["selective-repeat", "sliding-window", "comparison-arq-protocols"],
    compareWith: ["stop-and-wait", "selective-repeat"],
    primaryUses: ["HDLC Balanced mode, early TCP implementations, satellite data links"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/54/Selective_repeat_transmit_window_example.png",
  imageCaption: "Figure: Sliding Window Structure and Frame Pipelining in Go-Back-N ARQ (Behrouz A. Forouzan, Section 11.5.2).",
  sections: {
    overview: `
      <p><strong>Go-Back-N Automatic Repeat reQuest (Go-Back-N ARQ)</strong> is a pipelined sliding-window protocol designed for noisy channels that dramatically improves channel efficiency by allowing the sender to transmit multiple data frames before pausing for an acknowledgement.</p>
      <p>According to <em>Forouzan (Section 11.5.2)</em>, in Go-Back-N ARQ, if an uncorrupted sequence of frames is received, the receiver acknowledges them using <strong>cumulative acknowledgements</strong>. However, if a single frame is lost or damaged, the receiver <strong>discards all subsequent out-of-order frames</strong>, and the sender must 'go back' and retransmit the damaged frame and all outstanding frames that followed it.</p>
      
      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Window Size Constraints</h3>
      <ul class="wiki-bullet-list">
        <li><strong>Sender Window Size ($W_s$):</strong> $W_s = 2^m - 1$, where $m$ is the number of bits in the sequence number field.</li>
        <li><strong>Receiver Window Size ($W_r$):</strong> Strictly $W_r = 1$. The receiver only ever accepts the single next-expected frame in sequence.</li>
      </ul>
    `,
    eli10: "Imagine you are throwing a stack of 7 numbered plates to your friend. Your friend only has space to catch Plate #1, then Plate #2, and so on. If Plate #2 shatters on the floor, your friend refuses to catch Plates #3, #4, or #5! Your friend just keeps shouting 'I still need Plate #2!'. So you have to stop, dig into your bag, and throw a replacement Plate #2, followed by re-throwing Plates #3, #4, and #5 all over again.",
    analogy: "Like an assembly line inspection station: if Item #3 fails the QA test, the inspector rejects Item #3 and stops the entire batch, forcing the production line to reload and re-process Item #3 and all subsequent items behind it.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Why Window Size Must Be $W_s < 2^m$</h3>
      <p>If $m$ bits are allocated for sequence numbering, there are $2^m$ distinct numbers ($0$ to $2^m - 1$). If the sender window were allowed to equal $2^m$, a catastrophic sequence ambiguity occurs:</p>
      <div class="p-3 bg-amber-50 dark:bg-amber-950/60 border-l-4 border-amber-500 rounded-r text-xs space-y-1">
        <p class="font-bold text-amber-900 dark:text-amber-200">The Wrap-Around Proof ($m = 2 \\implies 2^2 = 4$ sequence numbers: 0, 1, 2, 3):</p>
        <p>1. Suppose $W_s = 4$. Sender transmits Frames 0, 1, 2, 3.</p>
        <p>2. Receiver receives all 4 frames correctly. Receiver advances its expected frame pointer from 0 to 0 (wrap-around!).</p>
        <p>3. Receiver transmits ACK 0 (requesting Frame 0 of the <em>next</em> batch).</p>
        <p>4. <strong>The Failure:</strong> The ACK 0 is lost on the return path.</p>
        <p>5. Sender timer expires. Sender retransmits the original Frame 0.</p>
        <p>6. Receiver sees Frame 0 arrive. Since its expected pointer is 0, it mistakes this <em>old retransmitted Frame 0</em> as the <em>brand-new Frame 0</em> of the next cycle! Data duplication occurs undetected.</p>
        <p class="font-bold text-emerald-700 dark:text-emerald-300">Therefore, the maximum sender window must be $W_s = 2^m - 1$ to guarantee that the old window and the new window never overlap!</p>
      </div>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Operational Workflow: Normal vs. Frame Loss Traces</h3>
      <h4 class="font-bold text-xs text-gray-800 dark:text-gray-200 mt-2">1. Normal Transmission ($W_s = 4$):</h4>
      <p class="text-xs">Sender transmits Frames 0, 1, 2, 3. Receiver receives Frame 0 &rarr; sends ACK 1. Receiver receives Frame 1 &rarr; sends ACK 2. As each ACK arrives, the sender window slides forward to transmit Frames 4, 5, etc.</p>

      <h4 class="font-bold text-xs text-gray-800 dark:text-gray-200 mt-2">2. Frame Loss Scenario:</h4>
      <p class="text-xs">Sender transmits Frames 0, 1, 2, 3. Frame 1 is lost or damaged. Receiver accepts Frame 0 (sends ACK 1). When Frame 2 arrives, receiver detects sequence mismatch ($2 \\neq 1$), <strong>discards Frame 2</strong>, and re-sends ACK 1. When Frame 3 arrives, receiver <strong>discards Frame 3</strong>, and re-sends ACK 1. The sender's timer for Frame 1 expires. Sender 'goes back' and retransmits Frames 1, 2, and 3!</p>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Mathematical Channel Efficiency Formula</h3>
      <p>When window size $W_s$ is selected such that $W_s \\ge 1 + 2a$, the sender can transmit continuously without ever having to wait for an ACK under error-free conditions:</p>
      <div class="p-3 my-2 bg-slate-100 dark:bg-slate-800 rounded font-mono text-xs text-center">
        $$\\eta = \\begin{cases} 
          1 & \\text{if } W_s \\ge 1 + 2a \\\\
          \\frac{W_s}{1 + 2a} & \\text{if } W_s < 1 + 2a 
        \\end{cases}$$
      </div>
      <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">If errors occur with frame error rate $P$, the actual throughput efficiency of Go-Back-N is given by:</p>
      <div class="p-3 my-2 bg-slate-100 dark:bg-slate-800 rounded font-mono text-xs text-center">
        $$\\eta_{\\text{GBN}} = \\frac{1 - P}{1 + (W_s - 1) P} \\cdot \\frac{W_s}{1 + 2a}$$
      </div>
    `,
    workedExamples: {
      level1: "<strong>Question:</strong> In a Go-Back-N ARQ system using a 3-bit sequence number, what is the maximum sender window size and receiver window size?<br><br><strong>Answer:</strong><br>Number of bits $m = 3$.<br>Total sequence numbers: $2^3 = 8$ (numbered 0, 1, 2, 3, 4, 5, 6, 7).<br>Maximum Sender Window: $W_s = 2^m - 1 = 2^3 - 1 = 7$.<br>Receiver Window: $W_r = 1$ (always 1 in Go-Back-N).",
      level2: "<strong>Problem:</strong> A network uses Go-Back-N ARQ with $m = 4$. What are the valid sequence numbers? If the sender transmits Frames 0 through 14 and Frame 5 is lost, which frames must the sender retransmit?<br><br><strong>Answer:</strong><br>For $m = 4$, $W_s = 2^4 - 1 = 15$. Sequence numbers are 0 through 15.<br>Frames 0, 1, 2, 3, 4 are accepted by the receiver.<br>Frame 5 is lost. When Frames 6 through 14 arrive at the receiver, they are all out of order, so the receiver discards all of them.<br>When timeout occurs for Frame 5, the sender must 'go back to 5' and retransmit all 10 frames: <strong>Frames 5, 6, 7, 8, 9, 10, 11, 12, 13, and 14</strong>.",
      level3: "<strong>Analysis:</strong> Explain the meaning of Cumulative Acknowledgement in Go-Back-N. If a sender receives ACK 7, which frames are acknowledged?<br><br><strong>Answer:</strong> Cumulative acknowledgement means a single ACK frame acknowledges all consecutively received frames up to a specified sequence number. Under Forouzan's next-expected convention, an <strong>ACK 7</strong> confirms that Frames 0, 1, 2, 3, 4, 5, and 6 have all been received safely and in order, and announces that the receiver is currently waiting for Frame 7."
    },
    advantagesLimitations: `
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Aspect</th>
            <th>Advantages</th>
            <th>Disadvantages</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Channel Throughput</strong></td>
            <td>Pipelining keeps the communication pipe filled, achieving up to 100% efficiency.</td>
            <td>High retransmission penalty: discarding valid out-of-order frames wastes bandwidth on noisy links.</td>
          </tr>
          <tr>
            <td><strong>Receiver Hardware</strong></td>
            <td>Minimal memory footprint ($W_r = 1$); requires zero out-of-order buffer space.</td>
            <td>Sender buffer must hold all $W_s$ frames until cumulative ACK arrives.</td>
          </tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "HDLC (High-Level Data Link Control) asynchronous balanced mode (ABM).",
      "Early TCP Reno implementations (fallback on multiple packet drop).",
      "Satellite channels with low bit-error rates."
    ],
    quiz: [
      {
        question: "Why does the receiver in Go-Back-N ARQ discard out-of-order frames even if they are received without CRC errors?",
        options: [
          "Because the receiver window size is strictly 1, meaning it has no buffer to store out-of-order frames",
          "Because out-of-order frames are automatically infected by channel noise",
          "Because the sender's timer cancels all out-of-order packets",
          "Because sequence numbers cannot be read if received out of order"
        ],
        correct: 0,
        explanation: "In Go-Back-N ARQ, the receiver window size is $W_r = 1$. The receiver lacks buffer memory to store out-of-sequence frames and simply discards them while re-sending the last cumulative ACK."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Section 11.5.2.", url: "" }
    ]
  }
};

// 7. selective-repeat: Selective Repeat ARQ
data["selective-repeat"] = {
  id: "selective-repeat",
  title: "Selective Repeat ARQ",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 2,
  subtopicNumber: 7,
  whyItMatters: "Selective Repeat ARQ provides the highest channel efficiency on noisy or long-delay links by retransmitting ONLY missing or damaged frames. It introduces receiver buffering and selective acknowledgements.",
  prerequisitesList: [
    { concept: "go-back-n", meaning: "Pipelining, cumulative ACKs, and the out-of-order discard penalty" },
    { concept: "Receiver Buffering", meaning: "Storing and sorting out-of-order frames before delivering to Layer 3" }
  ],
  learningObjectives: [
    "Explain why Selective Repeat ARQ is more efficient than Go-Back-N on noisy channels.",
    "Prove why the maximum window size for both sender and receiver must be $W_s = W_r = 2^{m-1}$.",
    "Describe the role of Negative Acknowledgements (NAKs) and independent retransmission timers.",
    "Trace protocol execution when an intermediate frame is lost while subsequent frames are buffered."
  ],
  infobox: {
    layer: "Layer 2 (Data Link Layer)",
    standard: "Forouzan Chapter 11.5 / RFC 2018 (TCP SACK) / IEEE 802.11 Block ACK",
    type: "Selective Retransmission Sliding Window Protocol",
    prerequisites: ["go-back-n"],
    relatedConcepts: ["comparison-arq-protocols", "sliding-window"],
    compareWith: ["go-back-n", "stop-and-wait"],
    primaryUses: ["Modern TCP with Selective ACKs (SACK), Wi-Fi 802.11n/ac/ax, LTE/5G Cellular Radio"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/df/Selective_repeat_space-time_diagram.png",
  imageCaption: "Figure: Selective Repeat Space-Time Diagram: Out-of-Order Buffering and Retransmission of Lost Frame Only.",
  sections: {
    overview: `
      <p><strong>Selective Repeat Automatic Repeat reQuest (Selective Repeat ARQ)</strong> is an advanced sliding-window protocol designed for noisy channels that optimizes bandwidth utilization by retransmitting <strong>only the specific frames that are lost or damaged</strong>.</p>
      <p>Unlike Go-Back-N (which discards all subsequent frames after an error), the receiver in Selective Repeat maintains a multi-frame buffer ($W_r > 1$). When an out-of-order frame arrives intact, the receiver accepts and buffers it. It then sends a <strong>Negative Acknowledgement (NAK)</strong> or waits for timeout to request the missing frame. Once the missing frame arrives, the receiver reassembles the contiguous sequence and delivers it to the Network Layer.</p>
      
      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Window Size Constraints</h3>
      <ul class="wiki-bullet-list">
        <li><strong>Sender Window Size ($W_s$):</strong> $W_s = 2^{m-1}$ (half of the total sequence number space).</li>
        <li><strong>Receiver Window Size ($W_r$):</strong> $W_r = 2^{m-1}$ (equal to the sender window size).</li>
      </ul>
    `,
    eli10: "Imagine you are assembling a Lego set with 8 numbered bags. You have Bags 1, 3, and 4, but Bag 2 went missing in shipping. Instead of throwing away Bags 3 and 4, you keep them neatly on your shelf, call customer service and say 'Please re-send ONLY Bag 2!'. When Bag 2 arrives, you build the whole set without wasting anything.",
    analogy: "Like a smart download manager (e.g. BitTorrent or multi-part HTTP): if Chunk #4 fails its CRC checksum, the download manager redownloads only Chunk #4, keeping Chunks #1, #2, #3, #5, #6, and #7 safely in memory.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Mathematical Proof: Why Window Size Must Be $W \\le 2^{m-1}$</h3>
      <p>The total sequence numbers available with $m$ bits is $2^m$. If $W_s + W_r > 2^m$, an overlap between the old window and the new window occurs. Since optimal flow balance requires $W_s = W_r = W$:</p>
      <div class="p-3 my-2 bg-slate-100 dark:bg-slate-800 rounded font-mono text-xs text-center">
        $$W_s + W_r \\le 2^m \\implies 2W \\le 2^m \\implies W \\le 2^{m-1}$$
      </div>

      <div class="p-3 bg-amber-50 dark:bg-amber-950/60 border-l-4 border-amber-500 rounded-r text-xs space-y-1">
        <p class="font-bold text-amber-900 dark:text-amber-200">The Wrap-Around Proof ($m = 2 \\implies 2^2 = 4$ sequence numbers: 0, 1, 2, 3):</p>
        <p>1. Suppose we mistakenly set $W_s = W_r = 3$ (which is greater than $2^{2-1} = 2$).</p>
        <p>2. Sender window covers $\{0, 1, 2\}$. Sender transmits Frames 0, 1, 2.</p>
        <p>3. Receiver receives all 3 frames correctly. Receiver window slides from $\{0, 1, 2\}$ to $\{3, 0, 1\}$.</p>
        <p>4. Receiver sends ACKs, but all ACKs are destroyed by channel noise.</p>
        <p>5. Sender timers expire. Sender retransmits original Frame 0.</p>
        <p>6. <strong>The Catastrophic Overlap:</strong> The receiver's new window $\{3, \\mathbf{0}, 1\}$ contains sequence number 0! The receiver accepts this old Frame 0 as a brand-new frame of the next cycle. Undetected duplicate corruption occurs!</p>
        <p class="font-bold text-emerald-700 dark:text-emerald-300">Therefore, when $W_s = W_r = 2^{m-1} = 2$, the sender's old window $\{0, 1\}$ and the receiver's new window $\{2, 3\}$ share zero numbers in common!</p>
      </div>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">10-Step Operational Workflow (Loss Recovery Trace)</h3>
      <ol class="wiki-ordered-list">
        <li>Sender window is $W_s = 4$ ($m = 3$). Sender transmits Frames 0, 1, 2, 3.</li>
        <li>Each transmitted frame starts its own <strong>independent retransmission timer</strong>.</li>
        <li>Frame 1 is corrupted or lost in transit. Frames 0, 2, and 3 reach the receiver safely.</li>
        <li>Receiver receives Frame 0, delivers packet to Layer 3, advances receiver window, and sends ACK 1.</li>
        <li>Receiver receives Frame 2 (out of order!). Receiver stores Frame 2 in its receive buffer and dispatches $\\text{NAK } 1$.</li>
        <li>Receiver receives Frame 3 (out of order!). Receiver stores Frame 3 in its receive buffer.</li>
        <li>Sender receives $\\text{NAK } 1$ (or timer for Frame 1 expires).</li>
        <li><strong>Selective Retransmission:</strong> Sender retransmits <em>ONLY Frame 1</em>. Frames 2 and 3 are NOT retransmitted!</li>
        <li>Receiver receives replacement Frame 1. It now has contiguous frames 1, 2, and 3 in memory.</li>
        <li>Receiver delivers packets 1, 2, 3 in sequential order to Layer 3, and receiver window slides forward by 3 positions.</li>
      </ol>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Efficiency Comparison under Channel Errors</h3>
      <p>Under a frame error probability $P$, the effective channel efficiency $\\eta$ of Selective Repeat is given by:</p>
      <div class="p-3 my-2 bg-slate-100 dark:bg-slate-800 rounded font-mono text-xs text-center">
        $$\\eta_{\\text{SR}} = (1 - P) \\cdot \\frac{W_s}{1 + 2a}$$
      </div>
      <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">Notice that unlike Go-Back-N (where efficiency drops by a factor of $(W_s - 1)P$), Selective Repeat's throughput degrades strictly linearly with the error rate $(1 - P)$, making it vastly superior on lossy channels.</p>
    `,
    workedExamples: {
      level1: "<strong>Question:</strong> What are the two primary hardware requirements that make Selective Repeat more complex than Go-Back-N?<br><br><strong>Answer:</strong> 1. Multi-frame receiver buffer memory and sorting logic to hold and reorder out-of-sequence frames before delivering them to the Network Layer. 2. Multiple concurrent retransmission timers at the sender (one for each outstanding unacknowledged frame), as opposed to Go-Back-N which requires only a single timer.",
      level2: "<strong>Problem:</strong> A network uses Selective Repeat ARQ with a 4-bit sequence number ($m = 4$). Calculate: (a) The number of sequence numbers, (b) Maximum sender window size, (c) Maximum receiver window size.<br><br><strong>Answer:</strong><br>(a) Total sequence numbers: $2^m = 2^4 = 16$ (numbered 0 to 15).<br>(b) Maximum sender window: $W_s = 2^{m-1} = 2^{4-1} = 2^3 = 8$.<br>(c) Maximum receiver window: $W_r = 2^{m-1} = 8$.",
      level3: "<strong>Analysis:</strong> Why does Selective Repeat use Negative Acknowledgements (NAKs) in addition to retransmission timers?<br><br><strong>Answer:</strong> A NAK provides immediate feedback to the sender as soon as an out-of-order frame arrives, informing the sender of the exact sequence number that was lost. This triggers an immediate selective retransmission without forcing the sender to wait for the retransmission timer to expire, significantly reducing recovery latency on long-delay links."
    },
    advantagesLimitations: `
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Aspect</th>
            <th>Advantages</th>
            <th>Disadvantages</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Bandwidth Efficiency</strong></td>
            <td>Zero redundant retransmissions. Retransmits only damaged frames, maximizing throughput.</td>
            <td>High memory consumption at receiver for out-of-order buffering and sorting.</td>
          </tr>
          <tr>
            <td><strong>Fault Tolerance</strong></td>
            <td>Maintains high throughput even in high packet-loss environments.</td>
            <td>Complex sender architecture requiring multiple simultaneous software timers.</td>
          </tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "Modern Transmission Control Protocol with Selective ACKs (TCP SACK - RFC 2018).",
      "IEEE 802.11n/ac/ax Wi-Fi Block Acknowledgment mechanism.",
      "LTE and 5G cellular Radio Link Control (RLC) acknowledged mode (AM)."
    ],
    quiz: [
      {
        question: "For a 5-bit sequence number field, what is the maximum sender window size in Selective Repeat ARQ?",
        options: [
          "16",
          "31",
          "32",
          "8"
        ],
        correct: 0,
        explanation: "For $m = 5$, $W_s = 2^{m-1} = 2^{5-1} = 2^4 = 16$."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Section 11.5.3.", url: "" }
    ]
  }
};

// 8. comparison-noiseless-noisy: Comparison of Noiseless and Noisy Channel Protocols
data["comparison-noiseless-noisy"] = {
  id: "comparison-noiseless-noisy",
  title: "Comparison of Noiseless and Noisy Channel Protocols",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 2,
  subtopicNumber: 8,
  whyItMatters: "Contrasting ideal noiseless channels with practical noisy channels crystallizes why modern network protocols must incorporate error detection, timers, sliding windows, and sequence tracking.",
  prerequisitesList: [
    { concept: "u2-protocol-classification", meaning: "Taxonomy of channel types" },
    { concept: "simplex-protocol", meaning: "Simplest and Stop-and-Wait noiseless protocols" },
    { concept: "stop-and-wait", meaning: "Stop-and-Wait, Go-Back-N, and Selective Repeat ARQ" }
  ],
  learningObjectives: [
    "Compare noiseless and noisy channel protocols across 8 core architectural dimensions.",
    "Explain why noiseless protocols cannot be deployed on real physical transmission links.",
    "Detail how ARQ transforms an inherently unreliable physical medium into a reliable logical connection."
  ],
  infobox: {
    layer: "Layer 2 (Data Link Layer)",
    standard: "Forouzan Chapter 11.4 & 11.5 Comparative Synthesis",
    type: "Architectural Comparison",
    prerequisites: ["simplex-protocol", "stop-and-wait"],
    relatedConcepts: ["comparison-arq-protocols", "u2-protocol-classification"],
    compareWith: ["comparison-arq-protocols"],
    primaryUses: ["Curriculum synthesis, system architecture design, exam preparation"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Sliding_Window_Protocol.svg",
  imageCaption: "Figure: Master Protocol Architecture Comparison: Ideal Channels vs Realistic Channels with Error Control.",
  sections: {
    overview: `
      <p>A rigorous comparative analysis between <strong>Protocols for Noiseless Channels</strong> and <strong>Protocols for Noisy Channels</strong> reveals the fundamental architectural trade-offs in Data Link Layer design.</p>
      <p>While noiseless channel protocols (Simplest Protocol and Stop-and-Wait Protocol) assume an error-free world where bits are never corrupted or lost, noisy channel protocols (Stop-and-Wait ARQ, Go-Back-N ARQ, and Selective Repeat ARQ) introduce <strong>Automatic Repeat reQuest (ARQ)</strong> frameworks to guarantee error-free, duplicate-free, and sequential delivery over imperfect physical channels.</p>
    `,
    eli10: "Noiseless protocols are like writing messages on a classroom whiteboard where everyone can read them clearly without distortion. Noisy protocols are like trying to shout messages across a noisy stadium during a concert—you have to speak slowly, repeat words when someone yells 'What?!', and number your instructions so nothing gets confused.",
    analogy: "Like the difference between moving money inside a bank vault (zero theft, trusted environment) versus transporting cash across a city in an armored truck with GPS tracking, armed guards, and security manifests.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Master 8-Dimension Architectural Comparison Matrix</h3>
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Dimension</th>
            <th>Noiseless Channel Protocols</th>
            <th>Noisy Channel Protocols (ARQ)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1. Physical Channel Assumption</strong></td>
            <td>Ideal channel: Zero bit errors, zero frame loss, zero propagation damage.</td>
            <td>Realistic channel: Signal attenuation, thermal noise, frame drops, and lost ACKs.</td>
          </tr>
          <tr>
            <td><strong>2. Error Detection Mechanism</strong></td>
            <td>None. Assumes every received bit is 100% authentic.</td>
            <td>Mandatory CRC (Cyclic Redundancy Check) or checksum trailer in every frame.</td>
          </tr>
          <tr>
            <td><strong>3. Error Recovery Mechanism</strong></td>
            <td>None. Corrupted or dropped frames result in permanent data loss or deadlock.</td>
            <td>Automatic Repeat reQuest (ARQ): Retransmission driven by timers and NAKs.</td>
          </tr>
          <tr>
            <td><strong>4. Flow Control Capabilities</strong></td>
            <td>None in Simplest Protocol; 1-frame stop-and-wait in Stop-and-Wait Protocol.</td>
            <td>Sliding window pipelining ($W_s = 1$ to $2^m - 1$) dynamically matching receiver capacity.</td>
          </tr>
          <tr>
            <td><strong>5. Acknowledgement Feedback</strong></td>
            <td>None in Simplest; simple positive ACK in Stop-and-Wait (used strictly for pacing).</td>
            <td>Explicit ACK, Negative ACK (NAK), Cumulative ACK, and Selective ACK with sequence numbers.</td>
          </tr>
          <tr>
            <td><strong>6. Sequence Numbering</strong></td>
            <td>Not used. Frames carry no sequence identifier.</td>
            <td>Mandatory $1$-bit or $m$-bit sequence numbers to prevent duplicate packet delivery.</td>
          </tr>
          <tr>
            <td><strong>7. Retransmission Timers</strong></td>
            <td>None. Sender maintains no software or hardware countdown timers.</td>
            <td>Active retransmission timers to detect lost data frames and lost acknowledgements.</td>
          </tr>
          <tr>
            <td><strong>8. Real-World Practicality</strong></td>
            <td>Theoretical pedagogical models; deadlocks on real communication links.</td>
            <td>Foundation of all real-world communications (Ethernet, Wi-Fi, HDLC, TCP).</td>
          </tr>
        </tbody>
      </table>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Why Noiseless Protocols Fail on Real Links</h3>
      <p>If a noiseless protocol (such as the Simplest Protocol or Stop-and-Wait) is executed on a real-world copper or wireless link, two catastrophic failure modes occur:</p>
      <ol class="wiki-ordered-list">
        <li><strong>Silent Data Corruption / Loss:</strong> In the Simplest Protocol, bit errors go completely undetected because there is no CRC. Corrupted bits pass directly into the application, causing file corruption or program crashes.</li>
        <li><strong>Permanent System Deadlock:</strong> In the Stop-and-Wait noiseless protocol, if a frame or ACK is destroyed by a noise burst, both sender and receiver enter an infinite wait state because neither device possesses a retransmission timer.</li>
      </ol>
    `,
    workedExamples: {
      level1: "<strong>Question:</strong> Name the 5 protocols discussed in Forouzan Chapter 11 and identify which category each belongs to.<br><br><strong>Answer:</strong><br>• Noiseless Channels: (1) Simplest Protocol, (2) Stop-and-Wait Protocol.<br>• Noisy Channels: (3) Stop-and-Wait ARQ, (4) Go-Back-N ARQ, (5) Selective Repeat ARQ.",
      level2: "<strong>Problem:</strong> Explain how adding sequence numbers resolves the lost acknowledgement problem in noisy channels.<br><br><strong>Answer:</strong> When an ACK is lost, the sender retransmits the frame after timeout. The receiver checks the sequence number. If it sees the same sequence number as the previously delivered frame, it recognizes the frame as a duplicate, safely discards the payload, and retransmits the ACK. Upper layers never receive duplicate data.",
      level3: "<strong>Analysis:</strong> Why is flow control present in both noiseless and noisy categories, but error control only present in noisy?<br><br><strong>Answer:</strong> Flow control is necessary even on an ideal error-free channel because the sender's CPU/clock speed may be faster than the receiver's processing speed, leading to buffer overflow. Error control, however, is designed specifically to detect and recover from physical transmission noise, which is absent by definition in a noiseless channel."
    },
    advantagesLimitations: `
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Key Advantage</th>
            <th>Key Limitation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Noiseless Models</strong></td>
            <td>Exposes fundamental flow control mechanics with zero algorithmic complexity.</td>
            <td>Completely unusable in practical network deployments.</td>
          </tr>
          <tr>
            <td><strong>Noisy ARQ Models</strong></td>
            <td>Transforms unreliable, lossy links into deterministic, highly reliable links.</td>
            <td>Protocol headers, buffering, and retransmissions introduce overhead and latency.</td>
          </tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "Noiseless protocols: Academic instructional baselines and simulation controls.",
      "Noisy ARQ protocols: Production network standards including IEEE 802.3, IEEE 802.11, HDLC, TCP."
    ],
    quiz: [
      {
        question: "What is the critical mechanism that prevents permanent protocol deadlock when a frame is lost on a noisy channel?",
        options: [
          "Retransmission countdown timer at the sender",
          "Parity check bit in the header",
          "Piggybacking field in the trailer",
          "Sliding window pointer at the receiver"
        ],
        correct: 0,
        explanation: "The retransmission timer at the sender guarantees that if an expected ACK does not arrive within a bounded duration, timeout occurs and the frame is automatically resent, breaking any deadlock."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11, Sections 11.4 & 11.5.", url: "" }
    ]
  }
};

// 9. comparison-arq-protocols: Comparison of ARQ Protocols
data["comparison-arq-protocols"] = {
  id: "comparison-arq-protocols",
  title: "Comparison of ARQ Protocols",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 2,
  subtopicNumber: 9,
  whyItMatters: "Understanding the trade-offs between Stop-and-Wait ARQ, Go-Back-N ARQ, and Selective Repeat ARQ enables network engineers to select the optimal protocol for a given bandwidth-delay product and channel error rate.",
  prerequisitesList: [
    { concept: "stop-and-wait", meaning: "Stop-and-Wait ARQ operation and formula" },
    { concept: "go-back-n", meaning: "Go-Back-N ARQ sliding window and cumulative ACKs" },
    { concept: "selective-repeat", meaning: "Selective Repeat ARQ out-of-order buffering" }
  ],
  learningObjectives: [
    "Master the 10-parameter comparative matrix contrasting Stop-and-Wait, Go-Back-N, and Selective Repeat ARQ.",
    "Evaluate the 5-protocol master comparison table across all Data Link Layer protocols.",
    "Explain Piggybacking and how it optimizes bidirectional communication.",
    "Select the appropriate ARQ protocol based on bandwidth-delay product ($a$) and bit error rate ($P$)."
  ],
  infobox: {
    layer: "Layer 2 (Data Link Layer)",
    standard: "Forouzan Chapter 11.5 / Kurose & Ross Chapter 3 / Tanenbaum Chapter 3",
    type: "Master Comparative Protocol Synthesis",
    prerequisites: ["stop-and-wait", "go-back-n", "selective-repeat"],
    relatedConcepts: ["sliding-window", "flow-control", "comparison-noiseless-noisy"],
    compareWith: ["stop-and-wait", "go-back-n", "selective-repeat"],
    primaryUses: ["Protocol stack engineering, satellite and wireless system optimization, GATE exam mastery"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/54/Selective_repeat_transmit_window_example.png",
  imageCaption: "Figure: Comparative Window Geometries: Stop-and-Wait ($W=1$), Go-Back-N ($W_s=2^m-1, W_r=1$), Selective Repeat ($W_s=W_r=2^{m-1}$).",
  sections: {
    overview: `
      <p>Automatic Repeat reQuest (ARQ) protocols provide reliable, ordered, and error-free communication across noisy channels. The three canonical ARQ protocols—<strong>Stop-and-Wait ARQ</strong>, <strong>Go-Back-N ARQ</strong>, and <strong>Selective Repeat ARQ</strong>—represent a progression in design complexity and channel utilization.</p>
      <p>According to <em>Behrouz A. Forouzan (Chapter 11, Section 11.5)</em>, each protocol addresses channel idle time and retransmission overhead through distinct window geometries, buffering strategies, and feedback mechanisms.</p>
    `,
    eli10: "Imagine three ways to deliver packages: (1) Stop-and-Wait: Deliver one box, wait for a signature, then walk back for the next. Very slow! (2) Go-Back-N: Carry 7 boxes at once; if box #2 is crushed, throw away boxes #3 to #7 and carry them all over again. (3) Selective Repeat: Carry 4 boxes; if box #2 is crushed, put boxes #3 and #4 on the customer's porch and run back to fetch ONLY a replacement box #2. Fast and smart!",
    analogy: "Comparing freight logistics: Stop-and-Wait is a single courier bicycle; Go-Back-N is a freight train that stops and restarts the whole train if one container is damaged; Selective Repeat is an automated drone fleet where each drone operates independently.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Master 10-Parameter Comparative Matrix of ARQ Protocols</h3>
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Evaluation Parameter</th>
            <th>Stop-and-Wait ARQ</th>
            <th>Go-Back-N ARQ</th>
            <th>Selective Repeat ARQ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1. Sender Window Size ($W_s$)</strong></td>
            <td>$W_s = 1$</td>
            <td>$W_s = 2^m - 1$</td>
            <td>$W_s = 2^{m-1}$</td>
          </tr>
          <tr>
            <td><strong>2. Receiver Window Size ($W_r$)</strong></td>
            <td>$W_r = 1$</td>
            <td>$W_r = 1$</td>
            <td>$W_r = 2^{m-1}$</td>
          </tr>
          <tr>
            <td><strong>3. Sequence Number Bits ($m$)</strong></td>
            <td>$m = 1$ bit (0 and 1)</td>
            <td>$m \\ge 2$ bits ($2^m$ sequence numbers)</td>
            <td>$m \\ge 2$ bits ($2^m$ sequence numbers)</td>
          </tr>
          <tr>
            <td><strong>4. Acknowledgement Type</strong></td>
            <td>Individual (ACK 0 or ACK 1)</td>
            <td>Cumulative (ACK $n$ confirms all up to $n-1$)</td>
            <td>Individual / Selective (ACK + NAK)</td>
          </tr>
          <tr>
            <td><strong>5. Retransmission Timers</strong></td>
            <td>1 timer</td>
            <td>1 timer (for oldest unacknowledged frame)</td>
            <td>Multiple timers (1 per outstanding frame)</td>
          </tr>
          <tr>
            <td><strong>6. Receiver Buffering</strong></td>
            <td>None (1 frame capacity)</td>
            <td>None ($W_r = 1$; discards out-of-order)</td>
            <td>Yes (Holds out-of-order frames in memory)</td>
          </tr>
          <tr>
            <td><strong>7. Retransmission on Loss</strong></td>
            <td>Retransmits 1 frame</td>
            <td>Retransmits $N$ frames (lost + all subsequent)</td>
            <td>Retransmits ONLY the damaged/lost frame</td>
          </tr>
          <tr>
            <td><strong>8. Implementation Complexity</strong></td>
            <td>Very Low</td>
            <td>Moderate (Sender buffer only)</td>
            <td>High (Sorting buffers & multi-timers)</td>
          </tr>
          <tr>
            <td><strong>9. Bandwidth Efficiency ($\eta$)</strong></td>
            <td>Low: $\\frac{1}{1 + 2a}$</td>
            <td>High if error rate is low: $\\frac{W_s}{1 + 2a}$</td>
            <td>Highest on noisy channels: $(1-P) \\frac{W_s}{1 + 2a}$</td>
          </tr>
          <tr>
            <td><strong>10. Real-World Applications</strong></td>
            <td>TFTP, basic sensor links</td>
            <td>HDLC, early TCP</td>
            <td>Modern TCP (SACK), Wi-Fi (802.11 Block ACK)</td>
          </tr>
        </tbody>
      </table>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-6 mb-2">Master 5-Protocol Summary Table (Forouzan Ch. 11)</h3>
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Protocol</th>
            <th>Channel</th>
            <th>Flow Control?</th>
            <th>Error Control?</th>
            <th>$W_s$</th>
            <th>$W_r$</th>
            <th>ACK Type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Simplest Protocol</strong></td>
            <td>Noiseless</td>
            <td>No</td>
            <td>No</td>
            <td>1</td>
            <td>1</td>
            <td>None</td>
          </tr>
          <tr>
            <td><strong>Stop-and-Wait</strong></td>
            <td>Noiseless</td>
            <td>Yes</td>
            <td>No</td>
            <td>1</td>
            <td>1</td>
            <td>Positive ACK</td>
          </tr>
          <tr class="bg-blue-50 dark:bg-blue-900/30">
            <td><strong>Stop-and-Wait ARQ</strong></td>
            <td>Noisy</td>
            <td>Yes</td>
            <td>Yes</td>
            <td>1</td>
            <td>1</td>
            <td>ACK 0 / ACK 1</td>
          </tr>
          <tr class="bg-emerald-50 dark:bg-emerald-900/30">
            <td><strong>Go-Back-N ARQ</strong></td>
            <td>Noisy</td>
            <td>Yes</td>
            <td>Yes</td>
            <td>$2^m - 1$</td>
            <td>1</td>
            <td>Cumulative ACK</td>
          </tr>
          <tr class="bg-purple-50 dark:bg-purple-900/30">
            <td><strong>Selective Repeat ARQ</strong></td>
            <td>Noisy</td>
            <td>Yes</td>
            <td>Yes</td>
            <td>$2^{m-1}$</td>
            <td>$2^{m-1}$</td>
            <td>Selective ACK + NAK</td>
          </tr>
        </tbody>
      </table>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Piggybacking: Bidirectional Efficiency Optimization</h3>
      <p>In theoretical models, data travels in one direction and ACKs in the other. In real-world full-duplex communication networks, data travels simultaneously in both directions between Station A and Station B.</p>
      
      <div class="wiki-callout note my-3">
        <h4 class="font-bold text-gray-900 dark:text-white mb-1">Definition of Piggybacking (Forouzan Section 11.5.4)</h4>
        <p class="text-xs text-gray-700 dark:text-gray-300"><strong>Piggybacking</strong> is a technique where acknowledgement information for recently received frames is attached (piggybacked) into the header of an outgoing data frame traveling in the reverse direction, rather than transmitting a dedicated, standalone ACK control frame.</p>
      </div>

      <h4 class="font-bold text-sm text-gray-900 dark:text-white mt-3">Advantages of Piggybacking:</h4>
      <ul class="wiki-bullet-list">
        <li><strong>Reduces Header Overhead:</strong> Eliminates the need to send an entire 64-byte minimum frame just to convey a 2-byte ACK number.</li>
        <li><strong>Saves Transmission Bandwidth:</strong> Leaves the physical medium free for substantive data payloads.</li>
        <li><strong>Reduces Contention:</strong> On shared access networks (like Wi-Fi or Ethernet), fewer frames mean fewer channel access collisions.</li>
      </ul>

      <h4 class="font-bold text-sm text-gray-900 dark:text-white mt-3">The Delayed ACK Timer Trade-Off:</h4>
      <p class="text-xs text-gray-700 dark:text-gray-300">If Station B does not have an immediate data frame ready to transmit back to Station A, it cannot wait indefinitely to piggyback the ACK, or Station A's retransmission timer will expire! Therefore, protocols use an <strong>ACK Delay Timer</strong> (typically 200–500 ms). If Station B generates outgoing data before the timer expires, it piggybacks the ACK; if the timer expires with no data ready, it dispatches a standalone ACK frame.</p>
    `,
    workedExamples: {
      level1: "<strong>Question:</strong> For a sequence number field of 4 bits ($m = 4$), compare the sender window sizes for Go-Back-N ARQ and Selective Repeat ARQ.<br><br><strong>Answer:</strong><br>• Total sequence numbers: $2^4 = 16$ (0 to 15).<br>• Go-Back-N Sender Window: $W_s = 2^m - 1 = 2^4 - 1 = 15$.<br>• Selective Repeat Sender Window: $W_s = 2^{m-1} = 2^{4-1} = 2^3 = 8$.",
      level2: "<strong>Problem:</strong> A 1 Gbps link with a round-trip propagation time of 40 ms carries 12,500-byte frames. Compare the required window size in Go-Back-N to achieve 100% link utilization vs. Stop-and-Wait.<br><br><strong>Answer:</strong><br>1. Frame transmission time: $t_{\\text{tx}} = \\frac{12500 \\times 8}{10^9} = 0.1\\text{ ms}$.<br>2. Total round-trip time: $RTT = 40\\text{ ms}$.<br>3. Parameter $a = \\frac{RTT/2}{t_{\\text{tx}}} = \\frac{20\\text{ ms}}{0.1\\text{ ms}} = 200$.<br>4. Stop-and-Wait efficiency: $\\eta = \\frac{1}{1 + 2(200)} = \\frac{1}{401} \\approx 0.25\\%$ (Throughput = 2.5 Mbps).<br>5. Go-Back-N required window for 100% utilization: $W_s \\ge 1 + 2a = 401$ frames.<br>Minimum sequence bits required: $2^m - 1 \\ge 401 \\implies 2^m \\ge 402 \\implies m = 9$ bits ($W_s = 511$).",
      level3: "<strong>Engineering Decision:</strong> Under what channel conditions would you choose Go-Back-N over Selective Repeat, and vice versa?<br><br><strong>Answer:</strong><br>• Choose <strong>Go-Back-N</strong> when the physical link has very low error rates (e.g., local fiber optics) and receiver memory/CPU is strictly constrained (e.g., low-cost IoT microcontrollers).<br>• Choose <strong>Selective Repeat</strong> when the product of bandwidth and propagation delay is large (e.g., satellite, trans-oceanic cables) and the channel experiences intermittent bit errors or packet loss, because Go-Back-N's retransmission penalty would drastically collapse throughput."
    },
    advantagesLimitations: `
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Protocol</th>
            <th>Primary Strengths</th>
            <th>Primary Weaknesses</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Stop-and-Wait ARQ</strong></td>
            <td>Zero reordering, 1-frame buffer, simplest hardware implementation.</td>
            <td>Dismal performance on high-latency links ($a \\gg 1$).</td>
          </tr>
          <tr>
            <td><strong>Go-Back-N ARQ</strong></td>
            <td>High throughput on clean links, simple receiver architecture ($W_r = 1$).</td>
            <td>Wasteful retransmission of all subsequent frames when one frame is lost.</td>
          </tr>
          <tr>
            <td><strong>Selective Repeat ARQ</strong></td>
            <td>Optimal bandwidth efficiency, retransmits only corrupted frames.</td>
            <td>Requires sorting buffers at receiver and multiple concurrent software timers at sender.</td>
          </tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "Comparative analysis is heavily tested in GATE, UGC-NET, and university computer networking exams.",
      "Directly informs transport-layer protocol design in TCP (RFC 793, RFC 2018).",
      "Satellite link design and 5G New Radio (NR) protocol parameter tuning."
    ],
    quiz: [
      {
        question: "What is Piggybacking in Data Link Layer protocols?",
        options: [
          "Attaching an acknowledgement to an outgoing data frame traveling in the reverse direction",
          "Encrypting multiple frames into a single physical packet",
          "Compressing header bits using variable-length Huffman codes",
          "Transmitting data over multiple physical wires concurrently"
        ],
        correct: 0,
        explanation: "Piggybacking is the technique of combining an ACK for a recently received frame into the header of an outgoing data frame, saving link bandwidth and reducing frame overhead."
      },
      {
        question: "For a 5-bit sequence number field, what are the sender window sizes for Go-Back-N and Selective Repeat respectively?",
        options: [
          "31 and 16",
          "32 and 16",
          "15 and 8",
          "31 and 31"
        ],
        correct: 0,
        explanation: "For $m = 5$: Go-Back-N sender window is $2^5 - 1 = 31$. Selective Repeat sender window is $2^{5-1} = 2^4 = 16$."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11, Section 11.5.", url: "" },
      { cite: "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 5th Edition, Section 3.4 (Sliding Window Protocols).", url: "" }
    ]
  }
};

// =============================================================================
// ENRICH TOPIC 11 REVISION & ASSESSMENT WITH WORKED NUMERICALS & EXAM QUESTIONS
// =============================================================================

// u2-numerical-problems
if (data["u2-numerical-problems"]) {
  data["u2-numerical-problems"].sections.overview = `
    <p>This section provides comprehensive worked numerical problems covering sequence number arithmetic, window sizing, propagation-to-transmission ratios ($a$), and channel utilization efficiencies across all Data Link Layer protocols, directly aligned with <strong>Forouzan Chapter 11</strong> and university examination patterns.</p>
    
    <div class="space-y-6 my-6">
      <!-- Problem 1 -->
      <div class="p-4 bg-white dark:bg-gray-800 rounded-xl border border-blue-200 dark:border-blue-900 shadow-sm">
        <h4 class="font-bold text-sm text-blue-700 dark:text-blue-400 mb-1">Problem 1: Sequence Number Calculation ($m = 3$)</h4>
        <p class="text-xs text-gray-700 dark:text-gray-300"><strong>Question:</strong> A protocol uses a 3-bit sequence number. Find the total number of sequence numbers and list them.</p>
        <div class="mt-2 p-3 bg-gray-50 dark:bg-gray-900 rounded font-mono text-xs text-gray-800 dark:text-gray-200">
          <p><strong>Formula:</strong> $N = 2^m$</p>
          <p>Given: $m = 3$ bits</p>
          <p>Calculation: $N = 2^3 = 8$ sequence numbers.</p>
          <p class="text-emerald-600 dark:text-emerald-400 font-bold mt-1">Answer: 8 sequence numbers. The valid range is {0, 1, 2, 3, 4, 5, 6, 7}.</p>
        </div>
      </div>

      <!-- Problem 2 -->
      <div class="p-4 bg-white dark:bg-gray-800 rounded-xl border border-blue-200 dark:border-blue-900 shadow-sm">
        <h4 class="font-bold text-sm text-blue-700 dark:text-blue-400 mb-1">Problem 2: Go-Back-N Window Sizing ($m = 4$)</h4>
        <p class="text-xs text-gray-700 dark:text-gray-300"><strong>Question:</strong> A Go-Back-N ARQ protocol uses a 4-bit sequence number. Find the maximum sender window size and receiver window size.</p>
        <div class="mt-2 p-3 bg-gray-50 dark:bg-gray-900 rounded font-mono text-xs text-gray-800 dark:text-gray-200">
          <p>Given: $m = 4$ bits</p>
          <p>Sender Window: $W_s = 2^m - 1 = 2^4 - 1 = 16 - 1 = 15$</p>
          <p>Receiver Window: $W_r = 1$ (always 1 in Go-Back-N)</p>
          <p class="text-emerald-600 dark:text-emerald-400 font-bold mt-1">Answer: Sender Window = 15 frames, Receiver Window = 1 frame.</p>
        </div>
      </div>

      <!-- Problem 3 -->
      <div class="p-4 bg-white dark:bg-gray-800 rounded-xl border border-blue-200 dark:border-blue-900 shadow-sm">
        <h4 class="font-bold text-sm text-blue-700 dark:text-blue-400 mb-1">Problem 3: Selective Repeat Window Sizing ($m = 4$)</h4>
        <p class="text-xs text-gray-700 dark:text-gray-300"><strong>Question:</strong> A Selective Repeat ARQ protocol uses a 4-bit sequence number. Find the maximum sender and receiver window sizes.</p>
        <div class="mt-2 p-3 bg-gray-50 dark:bg-gray-900 rounded font-mono text-xs text-gray-800 dark:text-gray-200">
          <p>Given: $m = 4$ bits</p>
          <p>Sender Window: $W_s = 2^{m-1} = 2^{4-1} = 2^3 = 8$</p>
          <p>Receiver Window: $W_r = 2^{m-1} = 2^{4-1} = 2^3 = 8$</p>
          <p class="text-emerald-600 dark:text-emerald-400 font-bold mt-1">Answer: Sender Window = 8 frames, Receiver Window = 8 frames.</p>
        </div>
      </div>

      <!-- Problem 4 -->
      <div class="p-4 bg-white dark:bg-gray-800 rounded-xl border border-blue-200 dark:border-blue-900 shadow-sm">
        <h4 class="font-bold text-sm text-blue-700 dark:text-blue-400 mb-1">Problem 4: Window Comparison with $m = 3$</h4>
        <p class="text-xs text-gray-700 dark:text-gray-300"><strong>Question:</strong> If $m = 3$ bits, compare the maximum sender and receiver window sizes for Go-Back-N ARQ and Selective Repeat ARQ.</p>
        <div class="mt-2 p-3 bg-gray-50 dark:bg-gray-900 rounded font-mono text-xs text-gray-800 dark:text-gray-200">
          <p>For Go-Back-N: $W_s = 2^3 - 1 = 7$, $W_r = 1$.</p>
          <p>For Selective Repeat: $W_s = 2^{3-1} = 4$, $W_r = 2^{3-1} = 4$.</p>
          <table class="wiki-table mt-2">
            <thead><tr><th>Protocol</th><th>Sender Window ($W_s$)</th><th>Receiver Window ($W_r$)</th></tr></thead>
            <tbody>
              <tr><td>Go-Back-N ARQ</td><td>7</td><td>1</td></tr>
              <tr><td>Selective Repeat ARQ</td><td>4</td><td>4</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Problem 5 -->
      <div class="p-4 bg-white dark:bg-gray-800 rounded-xl border border-blue-200 dark:border-blue-900 shadow-sm">
        <h4 class="font-bold text-sm text-blue-700 dark:text-blue-400 mb-1">Problem 5: Master ARQ Comparison ($m = 5$)</h4>
        <p class="text-xs text-gray-700 dark:text-gray-300"><strong>Question:</strong> A communication link uses a 5-bit sequence number ($m = 5$). Determine the sender and receiver window sizes across Stop-and-Wait ARQ, Go-Back-N ARQ, and Selective Repeat ARQ.</p>
        <div class="mt-2 p-3 bg-gray-50 dark:bg-gray-900 rounded font-mono text-xs text-gray-800 dark:text-gray-200">
          <p>Total sequence numbers available: $2^5 = 32$ (numbered 0 to 31).</p>
          <p>• <strong>Stop-and-Wait ARQ:</strong> $W_s = 1$, $W_r = 1$.</p>
          <p>• <strong>Go-Back-N ARQ:</strong> $W_s = 2^5 - 1 = 31$, $W_r = 1$.</p>
          <p>• <strong>Selective Repeat ARQ:</strong> $W_s = 2^{5-1} = 16$, $W_r = 2^{5-1} = 16$.</p>
        </div>
      </div>
    </div>
  `;
}

// u2-short-answer-questions
if (data["u2-short-answer-questions"]) {
  data["u2-short-answer-questions"].sections.overview = `
    <p>Comprehensive repository of 15 university exam short-answer questions with concise model answers covering Data Link Layer protocols, flow control, and error recovery.</p>
    <div class="space-y-4 my-6">
      <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <p class="font-bold text-xs text-gfg-green">Q1. What is a Data Link Layer protocol?</p>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">A set of formal rules governing how data frames are transmitted, verified, and managed between two directly connected stations across a physical medium.</p>
      </div>
      <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <p class="font-bold text-xs text-gfg-green">Q2. What is a noiseless channel?</p>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">An idealized theoretical communication channel in which frames are never damaged, corrupted, lost, or duplicated during transit.</p>
      </div>
      <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <p class="font-bold text-xs text-gfg-green">Q3. What is a noisy channel?</p>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">A realistic physical communication channel subject to thermal noise, attenuation, and interference where frames and ACKs can be corrupted, lost, or delayed.</p>
      </div>
      <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <p class="font-bold text-xs text-gfg-green">Q4. What is the Simplest Protocol?</p>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">An elementary unidirectional protocol for noiseless channels that provides neither flow control nor error control, assuming the receiver has infinite processing capacity.</p>
      </div>
      <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <p class="font-bold text-xs text-gfg-green">Q5. What is the Stop-and-Wait Protocol?</p>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">A noiseless channel protocol where the sender transmits one frame and halts until an explicit acknowledgement (ACK) arrives, preventing receiver buffer overflow.</p>
      </div>
      <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <p class="font-bold text-xs text-gfg-green">Q6. What does ARQ stand for and what is its purpose?</p>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">Automatic Repeat reQuest. It is an error-control mechanism that uses acknowledgements, sequence numbers, and retransmission timers to automatically resend lost or corrupted frames.</p>
      </div>
      <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <p class="font-bold text-xs text-gfg-green">Q7. What is an Acknowledgement (ACK)?</p>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">A control frame dispatched by the receiver informing the sender that a data frame was received correctly or indicating the sequence number of the next frame expected.</p>
      </div>
      <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <p class="font-bold text-xs text-gfg-green">Q8. What is a Negative Acknowledgement (NAK)?</p>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">A control frame sent by the receiver explicitly requesting the immediate retransmission of a specific missing or damaged frame without waiting for timer timeout.</p>
      </div>
      <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <p class="font-bold text-xs text-gfg-green">Q9. Why are sequence numbers necessary in Stop-and-Wait ARQ?</p>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">To enable the receiver to recognize and safely discard duplicate frames resulting from lost or delayed acknowledgements.</p>
      </div>
      <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <p class="font-bold text-xs text-gfg-green">Q10. What is pipelining in data communication?</p>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">The technique of transmitting multiple data frames before waiting for an acknowledgement, keeping the transmission channel full and maximizing throughput.</p>
      </div>
      <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <p class="font-bold text-xs text-gfg-green">Q11. What is the sender window size in Go-Back-N ARQ?</p>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">$W_s = 2^m - 1$, where $m$ is the number of bits in the sequence number field.</p>
      </div>
      <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <p class="font-bold text-xs text-gfg-green">Q12. What is the receiver window size in Go-Back-N ARQ?</p>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">$W_r = 1$. The receiver only ever accepts the single next-expected in-order frame.</p>
      </div>
      <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <p class="font-bold text-xs text-gfg-green">Q13. What is the window size in Selective Repeat ARQ?</p>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">$W_s = W_r = 2^{m-1}$ (half of the total sequence number space).</p>
      </div>
      <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <p class="font-bold text-xs text-gfg-green">Q14. What is a Cumulative Acknowledgement?</p>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">An ACK containing number $n$ that simultaneously confirms successful receipt of all frames up to sequence number $n-1$.</p>
      </div>
      <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <p class="font-bold text-xs text-gfg-green">Q15. What is Piggybacking?</p>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">The technique of attaching acknowledgement numbers into the header of outgoing reverse data frames, conserving bandwidth and eliminating separate ACK frames.</p>
      </div>
    </div>
  `;
}

// u2-mcqs
if (data["u2-mcqs"]) {
  data["u2-mcqs"].sections.quiz = [
    {
      question: "Which protocol does not use flow control or error control?",
      options: ["Simplest Protocol", "Stop-and-Wait Protocol", "Stop-and-Wait ARQ", "Go-Back-N ARQ"],
      correct: 0,
      explanation: "The Simplest Protocol operates under the assumption of an ideal noiseless channel and infinite receiver capacity, using neither flow control nor error control."
    },
    {
      question: "In the Stop-and-Wait Protocol (noiseless), the sender waits for an ACK before sending the next frame. What is the main purpose of this ACK?",
      options: ["Flow control", "Error detection", "Error correction", "Routing"],
      correct: 0,
      explanation: "In the noiseless Stop-and-Wait protocol, the ACK serves exclusively for flow control, pacing the sender to prevent receiver buffer overflow."
    },
    {
      question: "In Stop-and-Wait ARQ, how many sequence numbers are used?",
      options: ["2 (0 and 1)", "1", "4", "8"],
      correct: 0,
      explanation: "Stop-and-Wait ARQ uses a 1-bit sequence number alternating between 0 and 1 ($2^1 = 2$ sequence numbers)."
    },
    {
      question: "If a 3-bit sequence number is used in Go-Back-N ARQ, what is the maximum sender window size?",
      options: ["7", "8", "4", "3"],
      correct: 0,
      explanation: "$W_s = 2^m - 1 = 2^3 - 1 = 7$."
    },
    {
      question: "If a 3-bit sequence number is used in Selective Repeat ARQ, what is the maximum sender window size?",
      options: ["4", "7", "8", "3"],
      correct: 0,
      explanation: "$W_s = 2^{m-1} = 2^{3-1} = 2^2 = 4$."
    },
    {
      question: "In Go-Back-N ARQ, what is the receiver window size?",
      options: ["1", "Equal to the sender window size", "$2^m - 1$", "$2^{m-1}$"],
      correct: 0,
      explanation: "In Go-Back-N ARQ, the receiver window size is strictly 1, accepting only the single next in-order frame."
    },
    {
      question: "Which protocol retransmits ONLY the missing or damaged frame?",
      options: ["Selective Repeat ARQ", "Simplest Protocol", "Stop-and-Wait Protocol", "Go-Back-N ARQ"],
      correct: 0,
      explanation: "Selective Repeat ARQ uses receiver buffering and selective retransmission to resend only the damaged or lost frame."
    },
    {
      question: "What happens in Go-Back-N ARQ when Frame 2 is lost and Frames 3 and 4 arrive at the receiver?",
      options: [
        "The receiver discards Frames 3 and 4 and waits for Frame 2",
        "The receiver accepts and buffers Frames 3 and 4",
        "The receiver requests only Frame 2 and delivers Frames 3 and 4 to the Network Layer",
        "The sender window size is doubled"
      ],
      correct: 0,
      explanation: "Because $W_r = 1$, the receiver in Go-Back-N rejects all out-of-order frames, discarding Frames 3 and 4 and re-sending ACK 2."
    },
    {
      question: "What is piggybacking?",
      options: [
        "Attaching an ACK to an outgoing data frame",
        "Sending two frames in one packet",
        "Retransmitting frames multiple times",
        "Using two communication channels at once"
      ],
      correct: 0,
      explanation: "Piggybacking is the technique of combining acknowledgement feedback with reverse outgoing data frames."
    },
    {
      question: "In Go-Back-N ARQ, what does ACK 4 mean?",
      options: [
        "Frames 0, 1, 2, and 3 have been received; receiver is waiting for Frame 4",
        "Frame 4 has been received correctly",
        "Only Frame 4 has been lost",
        "Frame 4 should be retransmitted immediately"
      ],
      correct: 0,
      explanation: "Cumulative ACK $n$ acknowledges all frames up to $n-1$. Therefore, ACK 4 confirms that Frames 0, 1, 2, and 3 have been accepted and the receiver expects Frame 4."
    }
  ];
}

// =============================================================================
// WRITE UPDATED SYLLABUS DATA BACK TO js/topics_u2_syllabus.js
// =============================================================================

const outCode = `// topics_u2_syllabus.js - Master Academic Topic Content Repository for Unit 2
// Cleaned: All ASCII symbol art removed. Integrated complete 36-page Forouzan Chapter 11 content.
var TOPICS_U2_SYLLABUS = ` + JSON.stringify(data, null, 2) + `;\n
if (typeof window !== 'undefined') window.TOPICS_U2_SYLLABUS = TOPICS_U2_SYLLABUS;
if (typeof global !== 'undefined') global.TOPICS_U2_SYLLABUS = TOPICS_U2_SYLLABUS;
if (typeof module !== 'undefined' && module.exports) module.exports = TOPICS_U2_SYLLABUS;
`;

fs.writeFileSync(syllabusPath, outCode, 'utf8');
console.log("Successfully wrote updated js/topics_u2_syllabus.js!");

// Also strip ASCII art from js/topics_u2.js
const u2Path = path.join(__dirname, '..', 'js', 'topics_u2.js');
let u2Content = fs.readFileSync(u2Path, 'utf8');
let u2Stripped = 0;
u2Content = u2Content.replace(/"diagram":\s*"\\[\s\S]*?[^\\]",/g, function(match) {
  if (match.includes('+--') || match.includes('|')) {
    u2Stripped++;
    return '"diagram": "",';
  }
  return match;
});
fs.writeFileSync(u2Path, u2Content, 'utf8');
console.log(`Stripped ASCII diagrams from js/topics_u2.js (${u2Stripped} instances).`);

