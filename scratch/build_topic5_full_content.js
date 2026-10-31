// scratch/build_topic5_full_content.js
// Integrates comprehensive educational content for Topic 5: Collision-Free Protocols
// from the 19-page PDF into js/topics_u2_syllabus.js and enriches Topic 11.

const fs = require('fs');
const path = require('path');

const syllabusPath = path.join(__dirname, '..', 'js', 'topics_u2_syllabus.js');
let rawSyllabus = fs.readFileSync(syllabusPath, 'utf8');

const startIdx = rawSyllabus.indexOf('{');
const endIdx = rawSyllabus.lastIndexOf('};');
const objStr = rawSyllabus.substring(startIdx, endIdx + 1);
let data = eval('(' + objStr + ')');

console.log("Loaded topics_u2_syllabus.js with", Object.keys(data).length, "topics.");

// =============================================================================
// SUBTOPIC 1: u2-collision-free-intro - Introduction to Collision-Free Protocols
// =============================================================================
data["u2-collision-free-intro"] = {
  id: "u2-collision-free-intro",
  title: "Introduction to Collision-Free Protocols",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 5,
  subtopicNumber: 1,
  whyItMatters: "Random access protocols suffer from devastating collisions and throughput collapse under heavy traffic loads. Collision-free protocols organize and coordinate channel access so stations transmit in an agreed order or assigned opportunity, guaranteeing zero packet collisions and bounded transmission delay.",
  prerequisitesList: [
    { concept: "MAC Sublayer Architecture", meaning: "Position and role of Layer 2 medium access control" },
    { concept: "Random Access Limitations", meaning: "How packet collisions degrade ALOHA and CSMA performance under high traffic" }
  ],
  learningObjectives: [
    "Define a collision-free protocol and state its primary engineering objective.",
    "Contrast contention-based random access with coordinated controlled access.",
    "List and explain the 5 core characteristics of collision-free protocols.",
    "Trace the basic 5-step operational lifecycle of controlled transmission access.",
    "Distinguish between Forouzan's controlled access methods (Reservation, Polling, Token Passing) and Tanenbaum's collision-free protocols (Bit-map, Binary Countdown)."
  ],
  infobox: {
    layer: "Layer 2 (MAC Sublayer)",
    standard: "IEEE 802.4 / IEEE 802.5 / Forouzan Chapter 12.2",
    type: "Controlled-Access Architectural Foundation",
    prerequisites: ["u2-multiple-access-intro", "u2-random-access-protocols"],
    relatedConcepts: ["u2-bit-map-protocol", "u2-binary-countdown-protocol", "u2-token-passing-protocol"],
    compareWith: ["u2-comparison-collision-free", "u2-comparison-multiple-access"],
    primaryUses: ["Token Ring LANs, FDDI campus backbones, CAN bus automotive networks, industrial automation"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Multiple_Access.png",
  imageCaption: "Figure: Taxonomy of Controlled-Access & Collision-Free Protocols (Behrouz A. Forouzan, Chapter 12.2).",
  sections: {
    overview: `
      <p>In a shared communication network, multiple computing stations use the exact same transmission medium. If two or more stations transmit simultaneously without prior coordination, their electrical or optical signals collide and become completely corrupted.</p>
      
      <p>In Part 4, we studied <strong>random-access protocols</strong> (such as Pure ALOHA, Slotted ALOHA, and CSMA variants), where stations compete for the communication channel through contention. While simple and efficient under light load, random-access protocols suffer from severe throughput degradation and unbounded delay as network traffic increases.</p>

      <p><strong>Collision-free protocols</strong> (also classified as <strong>controlled-access protocols</strong>) use a disciplined, organized approach. They coordinate medium access so that stations transmit in an agreed, deterministic order or during an explicitly assigned opportunity.</p>

      <div class="p-3 my-4 bg-emerald-50 dark:bg-emerald-950/40 border-l-4 border-emerald-500 rounded-r-lg">
        <h4 class="font-bold text-emerald-900 dark:text-emerald-200 text-sm mb-1">Main Engineering Objective</h4>
        <p class="text-xs text-emerald-800 dark:text-emerald-300">
          <strong>To completely prevent two stations from transmitting at the same time on a shared channel.</strong> By eliminating collisions during normal operation, these protocols achieve deterministic access delay, predictable throughput, and high channel utilization under heavy network loads.
        </p>
      </div>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Main Protocols Covered</h3>
      <ol class="wiki-ordered-list">
        <li><strong>Bit-map protocol:</strong> A reservation-based access method using dedicated 1-bit minislots per station.</li>
        <li><strong>Binary countdown protocol:</strong> A bit-by-bit address arbitration method where the highest-priority binary address wins channel access.</li>
        <li><strong>Token-passing protocol:</strong> A circulating permission token in a logical ring that grants exclusive transmission rights.</li>
        <li><strong>Reservation and polling:</strong> Related controlled-access methods where stations book future transmission slots or are centrally polled by a primary controller.</li>
      </ol>

      <div class="p-3 my-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-lg text-xs text-blue-900 dark:text-blue-300">
        <span class="font-bold">Textbook Note (Curriculum Alignment):</span> In <em>Behrouz A. Forouzan's Data Communications and Networking (4th Edition, Chapter 12, Section 12.2)</em>, controlled access is directly categorized into three primary methods: <strong>Reservation</strong>, <strong>Polling</strong>, and <strong>Token Passing</strong>. The <strong>Bit-map</strong> and <strong>Binary Countdown</strong> protocols are classic collision-free protocols originating from <em>Andrew S. Tanenbaum's Computer Networks</em> and are included here as core foundational syllabus topics.
      </div>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Core Characteristics of Collision-Free Protocols</h3>
      <ul class="wiki-bullet-list">
        <li><strong>Predefined Access Procedure:</strong> Stations strictly adhere to an agreed-upon protocol sequence before placing data onto the shared medium.</li>
        <li><strong>Organized Transmission Opportunities:</strong> Access rights are scheduled cyclically, sequentially, or through explicit reservation phases.</li>
        <li><strong>Zero Data Collisions:</strong> Under normal operating conditions, simultaneous conflicting transmissions are physically impossible.</li>
        <li><strong>Deterministic Predictability:</strong> Transmission delay has a mathematical upper bound, making these protocols ideal for real-time and mission-critical systems.</li>
        <li><strong>Control Information Overhead:</strong> Coordination requires reservation bits, polling frames, or tokens, introducing protocol overhead that must be managed.</li>
      </ul>
    `,
    eli10: "In simple words: In a random-access network, everyone shouts at once and collides. In a collision-free network, everyone takes turns in an orderly line or passes a speaking stick (token) so only one person talks at a time.",
    analogy: "Imagine an orderly classroom where students must raise their hands and wait for the teacher to call on them (Polling), or pass a 'talking stick' around the circle (Token Passing). Because only the person holding the stick is allowed to speak, two students never interrupt or talk over one another.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">The Basic 5-Step Operational Lifecycle</h3>
      <p>Across all collision-free and controlled-access protocols, communication follows a rigorous 5-step operational cycle:</p>
      
      <div class="grid grid-cols-1 md:grid-cols-5 gap-2.5 my-4 text-center text-xs">
        <div class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div class="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 font-bold mx-auto flex items-center justify-center text-xs mb-1.5">1</div>
          <div class="font-bold text-slate-800 dark:text-slate-200">Permission</div>
          <p class="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Station obtains explicit permission or an allocated transmission slot.</p>
        </div>
        <div class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div class="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 font-bold mx-auto flex items-center justify-center text-xs mb-1.5">2</div>
          <div class="font-bold text-slate-800 dark:text-slate-200">Transmit Data</div>
          <p class="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Station sends its data frame exclusively when its allocated turn arrives.</p>
        </div>
        <div class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div class="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-400 font-bold mx-auto flex items-center justify-center text-xs mb-1.5">3</div>
          <div class="font-bold text-slate-800 dark:text-slate-200">Others Defer</div>
          <p class="text-[10px] text-slate-500 dark:text-slate-400 mt-1">All other stations remain completely silent and wait for their turns.</p>
        </div>
        <div class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div class="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-600 dark:text-purple-400 font-bold mx-auto flex items-center justify-center text-xs mb-1.5">4</div>
          <div class="font-bold text-slate-800 dark:text-slate-200">Pass Right</div>
          <p class="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Transmission right moves to the next eligible station in sequence.</p>
        </div>
        <div class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div class="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold mx-auto flex items-center justify-center text-xs mb-1.5">5</div>
          <div class="font-bold text-slate-800 dark:text-slate-200">Repeat Cycle</div>
          <p class="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Process repeats continuously in round-robin or scheduled epochs.</p>
        </div>
      </div>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Random Access vs. Collision-Free (Controlled) Access</h3>
      <p class="text-xs text-gray-600 dark:text-gray-400 mb-3">A head-to-head architectural comparison based on Section 9 of the syllabus curriculum:</p>
      
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Architectural Feature</th>
            <th>Random Access (Contention)</th>
            <th>Collision-Free / Controlled Access</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Channel Access Philosophy</strong></td>
            <td>Stations compete freely; any station can transmit when data is ready.</td>
            <td>Access is coordinated; stations transmit only after receiving explicit permission or during an assigned slot.</td>
          </tr>
          <tr>
            <td><strong>Collision Possibility</strong></td>
            <td><strong>Collisions occur</strong> whenever two transmissions overlap in time.</td>
            <td><strong>Completely avoided</strong> during normal operational data transfer.</td>
          </tr>
          <tr>
            <td><strong>Waiting / Deferral Mechanism</strong></td>
            <td>Stations wait random backoff intervals after a collision or busy medium.</td>
            <td>Stations wait deterministically for their assigned turn, token, or poll inquiry.</td>
          </tr>
          <tr>
            <td><strong>Control Overhead</strong></td>
            <td>Virtually zero overhead under light load; massive retransmission waste under heavy load.</td>
            <td>Constant control overhead (reservation bits, polling packets, token frames) required to maintain synchronization.</td>
          </tr>
          <tr>
            <td><strong>Access Delay Predictability</strong></td>
            <td><strong>Unpredictable / Non-deterministic:</strong> High variance; packet may experience infinite retransmissions.</td>
            <td><strong>Predictable / Deterministic:</strong> Strict mathematical upper bound on access delay.</td>
          </tr>
          <tr>
            <td><strong>Peak Performance Conditions</strong></td>
            <td>Optimal for bursty, light-to-moderate traffic across large populations.</td>
            <td>Optimal for heavy, continuous traffic across fixed, known station populations.</td>
          </tr>
          <tr>
            <td><strong>Representative Protocols</strong></td>
            <td>Pure ALOHA, Slotted ALOHA, 1-Persistent CSMA, Non-Persistent CSMA, CSMA/CD, CSMA/CA.</td>
            <td>Bit-Map Protocol, Binary Countdown, Token Ring (IEEE 802.5), FDDI, Reservation, Polling.</td>
          </tr>
        </tbody>
      </table>
    `,
    workedExamples: {
      level1: "<strong>Question:</strong> Why do random access protocols collapse under heavy traffic loads while collision-free protocols maintain high throughput?<br><br><strong>Answer:</strong> Under heavy traffic loads, random access stations frequently attempt transmission simultaneously, causing catastrophic packet collisions. Each collision triggers backoff timers and retransmissions, creating an exponential feedback loop that consumes almost all channel bandwidth with garbage signals. In contrast, collision-free protocols schedule transmissions so only one node transmits at a time, completely eliminating collisions and maintaining near 100% data utilization regardless of how heavy traffic becomes.",
      level2: "<strong>Analysis:</strong> Trace the performance trade-off between random access and collision-free access when a network transitions from 5% load to 95% load.<br><br><strong>Trace:</strong> At 5% load (sparse traffic), collision-free protocols suffer from overhead latency: an idle station must wait for reservation epochs or token circulation even though the wire is completely empty. Random access excels here because nodes transmit immediately without delay. At 95% load (heavy traffic), random access collapses into continuous collisions ($S \\to 0$), whereas collision-free protocols reach their peak efficiency as every reservation slot or token opportunity is fully packed with data.",
      level3: "<strong>Edge Case:</strong> What happens in a collision-free network when a station experiences hardware failure or loses power?<br><br><strong>Analysis:</strong> Because collision-free protocols depend on coordination (e.g., token circulation or address arbitration), a node failure can disrupt the coordination mechanism. For instance, in token passing, if the token holder crashes before releasing the token, the network deadlocks until a monitor station detects token loss and executes a token regeneration protocol. In centralized polling, if the primary station crashes, all communication halts until an election protocol chooses a replacement."
    },
    advantagesLimitations: `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
        <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg">
          <h4 class="font-bold text-xs uppercase text-emerald-900 dark:text-emerald-200 mb-2 flex items-center gap-1.5">
            <i class="fa-solid fa-circle-check text-emerald-600"></i> Key Advantages (PDF Section 11)
          </h4>
          <ul class="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 list-disc pl-4">
            <li><strong>Zero Collisions:</strong> Reduces or completely prevents collisions during normal data transmission.</li>
            <li><strong>Organized Communication:</strong> Eliminates chaotic contention and packet destruction on shared media.</li>
            <li><strong>Predictable Channel Access:</strong> Provides bounded latency, making it suitable for real-time systems.</li>
            <li><strong>Guaranteed Fairness:</strong> Round-robin allocation ensures every station receives an equitable transmission opportunity.</li>
            <li><strong>No Collision Retransmission Waste:</strong> Bandwidth is never wasted on collision backoff retries.</li>
            <li><strong>High Heavy-Load Efficiency:</strong> Near-saturation throughput under continuous traffic conditions.</li>
          </ul>
        </div>
        <div class="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
          <h4 class="font-bold text-xs uppercase text-red-900 dark:text-red-200 mb-2 flex items-center gap-1.5">
            <i class="fa-solid fa-triangle-exclamation text-red-600"></i> Key Disadvantages (PDF Section 12)
          </h4>
          <ul class="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 list-disc pl-4">
            <li><strong>Control Overhead:</strong> Continuous reservation bits, polling frames, and tokens consume channel bandwidth.</li>
            <li><strong>Higher Implementation Complexity:</strong> Requires complex hardware, address logic, and ring maintenance.</li>
            <li><strong>Idle Waiting Latency:</strong> Stations must wait for their turn even when the shared medium is completely idle.</li>
            <li><strong>Single Points of Failure:</strong> Token loss, ring cuts, or primary controller crashes can halt the whole network.</li>
            <li><strong>Priority Imbalance:</strong> Without mitigation, fixed address schemes (e.g. binary countdown) can starve lower stations.</li>
            <li><strong>Fixed Population Dependency:</strong> Dynamic insertion or removal of stations requires complex reconfiguration.</li>
          </ul>
        </div>
      </div>
    `,
    whereUsed: [
      "Industrial automation and real-time fieldbuses (PROFIBUS, Modbus, WorldFIP).",
      "Automotive electronic control units using CAN bus priority-based arbitration.",
      "High-reliability avionics databuses (MIL-STD-1553, ARINC 429).",
      "Campus backbone networks running Fiber Distributed Data Interface (FDDI).",
      "Legacy enterprise LANs utilizing IEEE 802.5 Token Ring."
    ],
    quiz: [
      {
        question: "What is the primary engineering objective of a collision-free protocol?",
        options: [
          "To allow all stations to transmit simultaneously at maximum speed",
          "To prevent two stations from transmitting at the same time on a shared channel",
          "To encrypt data frames before physical layer transmission",
          "To route IP packets across interconnected WAN subnets"
        ],
        correct: 1,
        explanation: "Collision-free protocols are specifically designed to coordinate channel access so that simultaneous conflicting transmissions are prevented during normal operation."
      },
      {
        question: "Why do collision-free protocols exhibit deterministic access delay compared to random access protocols?",
        options: [
          "Because stations use fiber optic links exclusively",
          "Because stations transmit only when granted explicit permission or during an assigned turn",
          "Because collision-free protocols eliminate the physical layer",
          "Because stations never have to wait for the channel"
        ],
        correct: 1,
        explanation: "Because access opportunities are organized in fixed cyclic sequences (like token passing or reservation minislots), the maximum time a station must wait before transmitting has a strict mathematical upper bound."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 12 (Section 12.2: Controlled Access).", url: "" },
      { cite: "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 4 (Section 4.2: Collision-Free Protocols).", url: "" }
    ]
  }
};

// =============================================================================
// SUBTOPIC 2: u2-bit-map-protocol - Bit-Map Protocol (Reservation-Based Access)
// =============================================================================
data["u2-bit-map-protocol"] = {
  id: "u2-bit-map-protocol",
  title: "Bit-Map Protocol",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 5,
  subtopicNumber: 2,
  whyItMatters: "The Bit-Map Protocol is the fundamental reservation-based collision-free protocol. By allocating dedicated 1-bit minislots before each data phase, stations declare their transmission intentions in advance, completely eliminating frame collisions during data delivery.",
  prerequisitesList: [
    { concept: "Collision-Free Access", meaning: "Principles of coordinated, non-contention channel access" },
    { concept: "Time Slotted Communication", meaning: "Partitioning transmission medium time into discrete slots" }
  ],
  learningObjectives: [
    "Define the Bit-Map protocol and explain the role of reservation bits.",
    "Trace the two-phase operational cycle (Reservation Phase followed by Data Transmission Phase).",
    "Analyze worked reservation bitmaps (e.g. 5-station bitmap 1 0 1 0 1).",
    "Calculate bitmap overhead and reservation efficiency using the formula BitmapSize = N bits.",
    "Evaluate channel efficiency under both light load (d / (d + N)) and heavy load (d / (d + 1))."
  ],
  infobox: {
    layer: "Layer 2 (MAC Sublayer)",
    standard: "Tanenbaum Chapter 4.2.1 / Reservation MAC",
    type: "Reservation-Based Protocol",
    prerequisites: ["u2-collision-free-intro"],
    relatedConcepts: ["u2-collision-free-working-principles", "u2-binary-countdown-protocol"],
    compareWith: ["u2-comparison-collision-free"],
    primaryUses: ["Reservation satellite channels, scheduled TDMA networks, deterministic telemetry"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Token_ring.svg/600px-Token_ring.svg.png",
  imageCaption: "Figure: Two-Phase Operational Epoch of the Bit-Map Reservation Protocol.",
  sections: {
    overview: `
      <p>The <strong>Bit-Map Protocol</strong> (frequently referred to as the <em>basic reservation protocol</em>) is a collision-free, controlled-access method in which each station on the network has a dedicated, pre-assigned reservation bit in a contention period preceding data delivery.</p>

      <p>Communication is organized into distinct, repeating <strong>operational epochs</strong>. Each epoch consists of two chronological phases:</p>
      
      <ol class="wiki-ordered-list">
        <li><strong>Phase 1: The Reservation Phase (Contention Period):</strong> A sequence of $N$ short 1-bit minislots, where $N$ is the total number of stations in the network.</li>
        <li><strong>Phase 2: The Data Transmission Phase:</strong> Stations that successfully reserved transmission opportunities transmit their full data frames in strict ascending numerical order.</li>
      </ol>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Reservation Bit Semantics</h3>
      <p>During the reservation phase, each station is allocated a specific 1-bit slot corresponding to its station index:</p>
      
      <table class="wiki-table">
        <thead>
          <tr>
            <th class="w-24">Bit Value</th>
            <th>Operational Meaning</th>
            <th>Station Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="font-mono font-bold text-center text-slate-500">0</td>
            <td><strong>No Request:</strong> The station has no data frame ready for transmission.</td>
            <td>Transmits a 0 bit (or remains silent); will not transmit during the upcoming data phase.</td>
          </tr>
          <tr>
            <td class="font-mono font-bold text-center text-blue-600 dark:text-blue-400">1</td>
            <td><strong>Transmission Request:</strong> The station has a pending data frame.</td>
            <td>Asserts a 1 bit in its assigned minislot to reserve a data transmission slot.</td>
          </tr>
        </tbody>
      </table>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Comprehensive Step-by-Step Worked Example (PDF Section 3)</h3>
      <p>Assume a local network consisting of <strong>5 stations</strong>: Station 0, Station 1, Station 2, Station 3, and Station 4.</p>
      
      <div class="p-3 my-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
        <p class="font-bold text-slate-800 dark:text-slate-200 mb-2">Scenario: Stations 0, 2, and 4 have data to send. Stations 1 and 3 are idle.</p>
        
        <div class="space-y-3 font-mono">
          <div>
            <span class="text-slate-500">Step 1: Reservation Phase (5 bits broadcast):</span>
            <div class="mt-1 flex items-center gap-2">
              <span class="px-2.5 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-bold">S0: 1</span>
              <span class="px-2.5 py-1 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400">S1: 0</span>
              <span class="px-2.5 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-bold">S2: 1</span>
              <span class="px-2.5 py-1 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400">S3: 0</span>
              <span class="px-2.5 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-bold">S4: 1</span>
            </div>
            <div class="text-[11px] text-slate-600 dark:text-slate-400 mt-1 font-sans">
              Resulting reservation bitmap: <code>1 0 1 0 1</code>. Every node on the network hears this bitmap and now knows exactly who will transmit.
            </div>
          </div>

          <div>
            <span class="text-slate-500">Step 2: Data Transmission Phase:</span>
            <div class="mt-1 flex items-center gap-2 font-bold text-emerald-700 dark:text-emerald-300">
              <span class="p-2 rounded bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700">Station 0 Transmits Frame</span>
              <i class="fa-solid fa-arrow-right text-slate-400"></i>
              <span class="p-2 rounded bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700">Station 2 Transmits Frame</span>
              <i class="fa-solid fa-arrow-right text-slate-400"></i>
              <span class="p-2 rounded bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700">Station 4 Transmits Frame</span>
            </div>
            <div class="text-[11px] text-slate-600 dark:text-slate-400 mt-1 font-sans">
              Stations 1 and 3 remain completely silent. Zero collisions occur. Once Station 4 finishes transmitting, the next 5-bit reservation phase begins.
            </div>
          </div>
        </div>
      </div>
    `,
    eli10: "In simple words: Before anyone sends big boxes of data, everyone takes 1 second to vote: 'Do you want to send?' (1 for yes, 0 for no). Then, only the people who voted yes send their boxes in order. No two people ever send at the same time!",
    analogy: "Think of an auction with numbered paddle boards. Before anyone displays their artwork, the auctioneer quickly scans paddles 0 through 4. If paddles 0, 2, and 4 are raised, those three sellers present their paintings one by one. Nobody talks over anyone else.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Mathematical Analysis & Bitmap Size</h3>
      <p>If there are $N$ stations connected to the shared channel, the reservation bitmap always contains exactly $N$ bits:</p>
      
      <div class="p-3 my-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-lg text-center font-mono text-sm text-blue-900 dark:text-blue-200">
        $$\\text{Bitmap Size} = N \\text{ bits}$$
      </div>

      <p class="text-xs text-gray-600 dark:text-gray-400 mb-2">For example, in a local network with 12 stations, each reservation phase requires exactly 12 bits. In a network of 64 stations, 64 reservation bits precede data transmission.</p>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Channel Efficiency Under Variable Traffic</h3>
      <p class="text-xs text-gray-600 dark:text-gray-400">Let each data frame consist of $d$ bits, and let the network contain $N$ stations:</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 my-3 text-xs">
        <div class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-blue-600 dark:text-blue-400 block mb-1">Under Low Load (Only 1 Station Transmitting):</span>
          <p class="text-slate-600 dark:text-slate-300 mb-2">A station must wait through $N$ reservation bits to send $d$ data bits:</p>
          <div class="font-mono p-1.5 rounded bg-slate-50 dark:bg-slate-900 text-center font-bold text-blue-700 dark:text-blue-300">
            $$\\text{Efficiency} = \\frac{d}{d + N}$$
          </div>
          <p class="text-[10px] text-slate-500 mt-1">If $N=100$ and $d=100$, efficiency drops to $50\\%$ due to reservation overhead.</p>
        </div>

        <div class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">Under High Load (All N Stations Transmitting):</span>
          <p class="text-slate-600 dark:text-slate-300 mb-2">All $N$ stations send $d$ bits following an $N$-bit reservation phase:</p>
          <div class="font-mono p-1.5 rounded bg-slate-50 dark:bg-slate-900 text-center font-bold text-emerald-700 dark:text-emerald-300">
            $$\\text{Efficiency} = \\frac{N \\cdot d}{N \\cdot d + N} = \\frac{d}{d + 1}$$
          </div>
          <p class="text-[10px] text-slate-500 mt-1">If $d=1000$ bits, efficiency exceeds $99.9\\%$, achieving near-perfect channel utilization.</p>
        </div>
      </div>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Why Bit-Map Scales Linearly ($O(N)$ Overhead)</h3>
      <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
        The primary theoretical limitation of the basic bit-map protocol is that its overhead scales linearly with the total number of connected stations ($O(N)$). Even if only 1 station out of 1,000 has data to send, all 1,000 reservation bits must be transmitted. This motivates logarithmic arbitration methods such as the <strong>Binary Countdown Protocol</strong> ($O(\\log_2 N)$).
      </p>
    `,
    workedExamples: {
      level1: "<strong>Numerical 1 (Bitmap Size - PDF Section 10):</strong><br>A network contains 20 stations. How many reservation bits are required in a basic bit-map protocol?<br><br><strong>Solution:</strong><br>$$\\text{Bitmap Size} = N = 20 \\text{ bits}$$<br><strong>Answer:</strong> 20 bits are required for the reservation period preceding each data transmission phase.",
      level2: "<strong>Numerical 2 (Reservation Efficiency - PDF Section 10):</strong><br>A reservation frame contains 10 bits, and 4 stations reserve access. If each data transmission uses 100 bits, calculate the total number of bits sent and the channel efficiency, ignoring other overhead.<br><br><strong>Solution:</strong><br>1. Reservation overhead = 10 bits.<br>2. Data bits transmitted = $4 \\times 100 = 400 \\text{ bits}$.<br>3. Total bits sent = $\\text{Data bits} + \\text{Reservation bits} = 400 + 10 = 410 \\text{ bits}$.<br>4. Channel Efficiency = $\\frac{400}{410} \\approx 97.56\\%$.<br><br><strong>Answer:</strong> Total bits sent is 410 bits, achieving 97.56% channel efficiency.",
      level3: "<strong>Edge Case Analysis:</strong> What happens in the Bit-Map protocol if a station generates data immediately after its minislot has passed during the reservation phase?<br><br><strong>Analysis:</strong> If Station 0 has a frame ready after slot 0 has already passed, it cannot transmit during the upcoming data transmission phase. It must wait patiently through the current data transmission phase and declare its intent in slot 0 of the <em>subsequent</em> reservation epoch. This introduces a maximum waiting delay equal to one full operational epoch."
    },
    advantagesLimitations: `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-xs">
        <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg">
          <h4 class="font-bold text-emerald-900 dark:text-emerald-200 mb-2 flex items-center gap-1.5">
            <i class="fa-solid fa-check text-emerald-600"></i> Advantages (PDF Section 3)
          </h4>
          <ul class="space-y-1.5 list-disc pl-4 text-slate-700 dark:text-slate-300">
            <li><strong>Zero Collisions:</strong> Prevents collisions completely during the organized data-transmission phase.</li>
            <li><strong>Predictable Access:</strong> Stations receive orderly, predictable transmission opportunities.</li>
            <li><strong>Ideal Under High Load:</strong> Efficiency approaches $d / (d+1) \\approx 100\\%$ when all stations have data.</li>
            <li><strong>Simple Protocol Logic:</strong> Requires only a single bit per station without complex collision-detection hardware.</li>
          </ul>
        </div>
        <div class="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
          <h4 class="font-bold text-red-900 dark:text-red-200 mb-2 flex items-center gap-1.5">
            <i class="fa-solid fa-xmark text-red-600"></i> Disadvantages (PDF Section 3)
          </h4>
          <ul class="space-y-1.5 list-disc pl-4 text-slate-700 dark:text-slate-300">
            <li><strong>Bandwidth Overhead:</strong> Reservation bits consume precious transmission time and bandwidth.</li>
            <li><strong>Inefficient Under Light Traffic:</strong> Stations without data still force the channel to step through their reservation slots.</li>
            <li><strong>Unnecessary Latency:</strong> A transmitting station must wait for the entire reservation cycle to complete before sending data.</li>
            <li><strong>Linear Scaling Overhead:</strong> Bitmap size increases directly with the total number of connected stations ($N$).</li>
          </ul>
        </div>
      </div>
    `,
    whereUsed: [
      "Satellite TDMA uplinks reserving transponder burst intervals.",
      "Synchronous sensor telemetry systems aggregating environmental readings.",
      "Scheduled industrial fieldbus communication epochs."
    ],
    quiz: [
      {
        question: "In a basic bit-map protocol, how many reservation bits are required for a network of 8 stations?",
        options: ["3 bits", "4 bits", "8 bits", "16 bits"],
        correct: 2,
        explanation: "In the basic bit-map protocol, each station requires exactly one dedicated reservation bit, so an 8-station network requires 8 reservation bits."
      },
      {
        question: "What is the channel efficiency of the bit-map protocol under heavy load when all N stations transmit frames of length d bits?",
        options: ["d / (d + N)", "d / (d + 1)", "1 / (2e)", "log2(N) / d"],
        correct: 1,
        explanation: "Under heavy load, total data bits = N * d and overhead = N bits. Efficiency = (N * d) / (N * d + N) = d / (d + 1)."
      }
    ],
    references: [
      { cite: "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Section 4.2.1: A Bit-Map Protocol.", url: "" },
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 12: Controlled Access.", url: "" }
    ]
  }
};

// =============================================================================
// SUBTOPIC 3: u2-binary-countdown-protocol - Binary Countdown Protocol
// =============================================================================
data["u2-binary-countdown-protocol"] = {
  id: "u2-binary-countdown-protocol",
  title: "Binary Countdown Protocol",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 5,
  subtopicNumber: 3,
  whyItMatters: "While the Bit-Map protocol requires N bits of overhead, Binary Countdown resolves contention in just log2(N) bits by comparing station binary addresses bit-by-bit. It forms the conceptual and mathematical foundation for modern automotive protocols like CAN bus arbitration.",
  prerequisitesList: [
    { concept: "Binary Representation", meaning: "Binary address encoding (e.g. 5 = 101, 6 = 110)" },
    { concept: "Collision-Free Access", meaning: "Eliminating contention via deterministic arbitration" }
  ],
  learningObjectives: [
    "Define the Binary Countdown protocol and state its arbitration rule (logical 1 priority).",
    "Trace the 8-step operational working principle of bit-by-bit address competition.",
    "Walk through the 4-station worked example (Stations A=101, B=110, C=011, D=100) to identify the winning station.",
    "Calculate address length requirements using the formula 2^m >= N (m = ceil(log2 N)).",
    "Explain the fairness/starvation problem of fixed priority and evaluate rotation solutions."
  ],
  infobox: {
    layer: "Layer 2 (MAC Sublayer)",
    standard: "Tanenbaum Chapter 4.2.2 / Bit-Level Arbitration",
    type: "Address Arbitration Protocol",
    prerequisites: ["u2-collision-free-intro"],
    relatedConcepts: ["u2-bit-map-protocol", "u2-token-passing-protocol"],
    compareWith: ["u2-comparison-collision-free"],
    primaryUses: ["CAN Bus (ISO 11898) automotive networks, industrial I2C bus arbitration"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Network_topology_star.svg/600px-Network_topology_star.svg.png",
  imageCaption: "Figure: Bit-by-Bit Address Arbitration Principle in Binary Countdown.",
  sections: {
    overview: `
      <p>The <strong>Binary Countdown Protocol</strong> is a collision-free medium-access method in which stations compete for channel access by transmitting their unique binary addresses <strong>one bit at a time</strong>, starting from the Most Significant Bit (MSB) to the Least Significant Bit (LSB).</p>

      <p>Instead of requiring $N$ reservation bits (as in the Bit-Map protocol), Binary Countdown requires only $\\lceil \\log_2 N \\rceil$ bits of arbitration overhead, achieving an exponential improvement in reservation efficiency.</p>

      <div class="p-3 my-4 bg-purple-50 dark:bg-purple-950/40 border-l-4 border-purple-500 rounded-r-lg">
        <h4 class="font-bold text-purple-900 dark:text-purple-200 text-sm mb-1">Fundamental Arbitration Rule</h4>
        <p class="text-xs text-purple-800 dark:text-purple-300">
          The channel acts as a boolean <strong>OR-channel</strong> (or wired-OR): <strong>a logical 1 has priority over a logical 0</strong>. If any station transmits a 1, the voltage on the channel becomes 1. If a station transmits a 0 but senses a 1 on the channel, it recognizes that another station with a higher-priority address is competing, and it must immediately withdraw from the remainder of the arbitration cycle.
        </p>
      </div>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">The 8-Step Working Principle (PDF Section 4)</h3>
      <ol class="wiki-ordered-list">
        <li>Each station is assigned a unique, fixed-length binary address of $m = \\lceil \\log_2 N \\rceil$ bits.</li>
        <li>All stations that have data frames ready begin transmitting their address bits simultaneously.</li>
        <li>Stations transmit their address bits starting from the <strong>Most Significant Bit (MSB) first</strong>.</li>
        <li>While transmitting, every station simultaneously monitors and senses the resulting channel voltage.</li>
        <li>A station that transmits a <code>0</code> but detects a <code>1</code> on the channel knows that another contender has a higher-priority address.</li>
        <li>That station immediately gives up and stops competing for the current frame slot.</li>
        <li>This bit-by-bit comparison continues for all $m$ address bit periods until exactly one highest-priority station survives.</li>
        <li>The winning station transmits its complete data frame without any collision.</li>
      </ol>
    `,
    eli10: "In simple words: Imagine four people calling out their ID numbers digit by digit. As soon as you call out a 0 and someone else calls out a 1, you lose and keep quiet. At the end, the person with the biggest number wins and gets to speak!",
    analogy: "Think of an automotive auction where bidders reveal their bids digit by digit from hundreds to units. If your bid starts with 300 and another bidder reveals 400, you instantly lower your hand. Only the highest bidder remains at the end to claim the prize.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Detailed Worked Example (PDF Section 4)</h3>
      <p>Assume four stations &mdash; <strong>Station A, Station B, Station C, and Station D</strong> &mdash; have the following 3-bit binary addresses and all wish to transmit simultaneously:</p>

      <table class="wiki-table">
        <thead>
          <tr>
            <th>Station</th>
            <th>Binary Address</th>
            <th>Decimal Equivalent</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Station A</td><td class="font-mono font-bold">1 0 1</td><td>5</td></tr>
          <tr class="bg-purple-50 dark:bg-purple-950/40 font-bold"><td>Station B</td><td class="font-mono text-purple-600 dark:text-purple-400">1 1 0</td><td>6 (Highest Value)</td></tr>
          <tr><td>Station C</td><td class="font-mono font-bold">0 1 1</td><td>3</td></tr>
          <tr><td>Station D</td><td class="font-mono font-bold">1 0 0</td><td>4</td></tr>
        </tbody>
      </table>

      <h4 class="font-bold text-sm my-3 text-gray-900 dark:text-white">Step-by-Step Bit Competition Trace</h4>
      
      <div class="space-y-3 text-xs">
        <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-blue-600 dark:text-blue-400 block mb-1">Bit 1 (Most Significant Bit - MSB):</span>
          <ul class="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
            <li>Stations A, B, and D transmit bit <code>1</code>.</li>
            <li>Station C transmits bit <code>0</code>.</li>
            <li>Channel voltage is <code>1</code> ($1 \\lor 1 \\lor 0 \\lor 1 = 1$).</li>
            <li><strong class="text-red-500">Outcome:</strong> Station C transmitted 0 but detects 1 on the channel. <strong>Station C withdraws immediately!</strong></li>
            <li>Surviving contenders: Stations A, B, and D.</li>
          </ul>
        </div>

        <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-blue-600 dark:text-blue-400 block mb-1">Bit 2 (Middle Bit):</span>
          <ul class="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
            <li>Station A transmits bit <code>0</code>.</li>
            <li>Stations B and D transmit bit <code>1</code>.</li>
            <li>Channel voltage is <code>1</code> ($0 \\lor 1 \\lor 1 = 1$).</li>
            <li><strong class="text-red-500">Outcome:</strong> Station A transmitted 0 but detects 1 on the channel. <strong>Station A withdraws immediately!</strong></li>
            <li>Surviving contenders: Stations B and D.</li>
          </ul>
        </div>

        <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-purple-600 dark:text-purple-400 block mb-1">Bit 3 (Least Significant Bit - LSB):</span>
          <ul class="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
            <li>Station B transmits bit <code>0</code>.</li>
            <li>Station D transmits bit <code>0</code>.</li>
            <li>Channel voltage is <code>0</code> ($0 \\lor 0 = 0$).</li>
            <li>Neither station transmitted 0 while sensing 1. Both completed their address transmission.</li>
          </ul>
        </div>

        <div class="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 rounded-lg text-emerald-900 dark:text-emerald-200 font-bold">
          Final Winner: Station B (Address 110 = 6) has the highest binary value. Station B transmits its complete data frame!
        </div>
      </div>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Binary Address Length Formula</h3>
      <p>To uniquely represent $N$ stations in a network, the minimum number of binary address bits $m$ must satisfy:</p>
      
      <div class="p-3 my-3 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 rounded-lg text-center font-mono text-sm text-purple-900 dark:text-purple-200">
        $$2^m \\ge N \\implies m = \\lceil \\log_2 N \\rceil$$
      </div>

      <p class="text-xs text-gray-600 dark:text-gray-400 mb-3">
        For 32 stations, $2^5 = 32 \\implies m = 5$ bits of overhead per frame. For 1,024 stations, only 10 bits of overhead are required, compared to 1,024 bits in the Bit-Map protocol!
      </p>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">The Starvation / Unfairness Problem & Solutions</h3>
      <div class="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-lg text-xs text-amber-900 dark:text-amber-200">
        <strong>The Problem:</strong> A station with a numerically lower address (such as Station C with address <code>011</code>) will <em>always</em> lose arbitration if higher-addressed stations (such as Station B with address <code>110</code>) continuously have frames to transmit. This leads to <strong>station starvation</strong>.<br><br>
        <strong>The Solution (Mochaldi Priority Rotation):</strong> After a station successfully transmits a frame, its priority is permuted or shifted circularly to the lowest priority (000), while all other stations increment their priority. This ensures fair, round-robin channel access across all nodes.
      </div>
    `,
    workedExamples: {
      level1: "<strong>Numerical 3 (Binary Address Length - PDF Section 10):</strong><br>What is the minimum number of bits needed to uniquely represent 32 stations in a binary countdown network?<br><br><strong>Solution:</strong><br>Using the formula $2^m \\ge N$:<br>$$2^m \\ge 32$$<br>$$m = 5$$<br><strong>Answer:</strong> Exactly 5 bits are required to represent each station's address.",
      level2: "<strong>Analysis Problem:</strong> In a network of 16 stations using Binary Countdown, Station 7 (0111) and Station 11 (1011) contend for channel access. Which station wins, and at which bit does the losing station drop out?<br><br><strong>Solution:</strong><br>1. Address of Station 7 = <code>0 1 1 1</code>.<br>2. Address of Station 11 = <code>1 0 1 1</code>.<br>3. At Bit 1 (MSB): Station 11 transmits 1, Station 7 transmits 0. The channel becomes 1.<br>4. Station 7 senses 1 on the channel and drops out immediately at Bit 1.<br><strong>Answer:</strong> Station 11 wins channel access; Station 7 drops out at the very first bit (MSB).",
      level3: "<strong>Real-World Application:</strong> How is the Binary Countdown protocol utilized in modern automobiles?<br><br><strong>Analysis:</strong> The Controller Area Network (CAN bus, ISO 11898) used in modern cars uses bit-by-bit non-destructive arbitration identical to Binary Countdown. Critical sensor frames (such as ABS braking and airbag deployment) are assigned high-priority binary IDs (dominant bits = 0 in CAN). When non-critical messages (such as radio volume) compete simultaneously on the vehicle bus, the lower-priority message drops out without destroying the brake command frame."
    },
    advantagesLimitations: `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-xs">
        <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg">
          <h4 class="font-bold text-emerald-900 dark:text-emerald-200 mb-2 flex items-center gap-1.5">
            <i class="fa-solid fa-check text-emerald-600"></i> Advantages (PDF Section 4)
          </h4>
          <ul class="space-y-1.5 list-disc pl-4 text-slate-700 dark:text-slate-300">
            <li><strong>Zero Collisions:</strong> Avoids collisions completely during normal address arbitration and data transfer.</li>
            <li><strong>Systematic Winner Selection:</strong> The winning node is decided deterministically without randomized backoff.</li>
            <li><strong>Minimal Overhead:</strong> Requires only $\\log_2 N$ bits of arbitration overhead, vastly outperforming Bit-Map.</li>
            <li><strong>Inherent Priority Support:</strong> Naturally supports priority-based real-time network traffic.</li>
          </ul>
        </div>
        <div class="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
          <h4 class="font-bold text-red-900 dark:text-red-200 mb-2 flex items-center gap-1.5">
            <i class="fa-solid fa-xmark text-red-600"></i> Disadvantages (PDF Section 4)
          </h4>
          <ul class="space-y-1.5 list-disc pl-4 text-slate-700 dark:text-slate-300">
            <li><strong>Priority Imbalance / Starvation:</strong> Lower-priority stations can be starved by high-priority stations.</li>
            <li><strong>Unique Addressing Constraint:</strong> Every connected station must maintain a unique, collision-free binary address.</li>
            <li><strong>Hardware Coordination:</strong> Requires fast transceiver logic capable of sensing the channel during bit transmission.</li>
            <li><strong>Propagation Delay Limit:</strong> Bit duration must exceed twice the cable propagation delay ($T_{bit} > 2T_p$).</li>
          </ul>
        </div>
      </div>
    `,
    whereUsed: [
      "Controller Area Network (CAN bus, ISO 11898) in passenger cars and commercial vehicles.",
      "I2C multi-master serial bus address arbitration in embedded microcontrollers.",
      "Avionics flight-control system databuses requiring priority-based preemption."
    ],
    quiz: [
      {
        question: "Which protocol resolves medium access contention by transmitting binary station addresses one bit at a time?",
        options: ["Pure ALOHA", "Binary Countdown Protocol", "CSMA/CD", "Bit-Map Protocol"],
        correct: 1,
        explanation: "Binary Countdown has contending stations transmit their unique binary addresses bit-by-bit, with logical 1 dominating logical 0."
      },
      {
        question: "How many arbitration bits are required in Binary Countdown for a network of 64 stations?",
        options: ["64 bits", "16 bits", "8 bits", "6 bits"],
        correct: 3,
        explanation: "The number of bits m satisfies 2^m >= N. For 64 stations, 2^6 = 64, so exactly 6 bits are required."
      }
    ],
    references: [
      { cite: "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Section 4.2.2: Binary Countdown.", url: "" },
      { cite: "ISO 11898-1: Road Vehicles — Controller Area Network (CAN) — Part 1: Data Link Layer and Physical Signalling.", url: "" }
    ]
  }
};

// =============================================================================
// SUBTOPIC 4: u2-token-passing-protocol - Token Passing Protocol
// =============================================================================
data["u2-token-passing-protocol"] = {
  id: "u2-token-passing-protocol",
  title: "Token Passing Protocol",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 5,
  subtopicNumber: 4,
  whyItMatters: "Token passing is the primary controlled-access method standardized in IEEE 802.5 and FDDI. By circulating a unique permission frame (token) around a logical ring, it provides guaranteed zero collisions and bounded, deterministic channel access latency.",
  prerequisitesList: [
    { concept: "Logical Ring Topology", meaning: "Circular arrangement where every node has a predecessor and successor" },
    { concept: "Controlled Access", meaning: "Access granted via explicit circulating permission" }
  ],
  learningObjectives: [
    "Define the Token Passing protocol and describe the token frame.",
    "Explain core ring terminology: Logical ring, Predecessor, Successor, Token holder.",
    "Trace the 7-step working principle of token capture, transmission, and release.",
    "Distinguish between the 4 physical implementations of a logical ring: Physical Ring, Dual Ring, Bus Ring, and Star Ring.",
    "Calculate token circulation time using T = N * T_hop.",
    "Evaluate token recovery mechanisms (lost token, duplicate token, monitor station)."
  ],
  infobox: {
    layer: "Layer 2 (MAC Sublayer)",
    standard: "IEEE 802.5 (Token Ring) / ANSI X3T9.5 (FDDI) / Forouzan 12.2.3",
    type: "Circulating Token Controlled Access",
    prerequisites: ["u2-collision-free-intro"],
    relatedConcepts: ["u2-collision-free-working-principles", "u2-comparison-collision-free"],
    compareWith: ["u2-comparison-collision-free"],
    primaryUses: ["IEEE 802.5 Token Ring, FDDI fiber networks, factory automation (IEEE 802.4 Token Bus)"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Token_ring.svg/600px-Token_ring.svg.png",
  imageCaption: "Figure: Token Passing in a Logical Ring Topology (Behrouz A. Forouzan, Figure 12.16).",
  sections: {
    overview: `
      <p><strong>Token passing</strong> is a controlled-access method in which stations are organized into a <strong>logical ring</strong>, and a special control frame called a <strong>token</strong> circulates sequentially among them.</p>

      <p>Only the station that currently holds the token has permission to transmit data. This is one of the three primary controlled-access methods discussed extensively in <em>Forouzan Chapter 12, Section 12.2.3</em>.</p>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Important Terms (PDF Section 5)</h3>
      <table class="wiki-table">
        <thead>
          <tr>
            <th class="w-36">Term</th>
            <th>Formal Technical Definition</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="font-bold text-emerald-600 dark:text-emerald-400">Token</td>
            <td>A special, compact control frame that confers exclusive permission to transmit data onto the shared medium.</td>
          </tr>
          <tr>
            <td class="font-bold">Logical Ring</td>
            <td>An ordered cyclic arrangement where each station has a strictly defined predecessor and successor ($A \\to B \\to C \\to D \\to A$).</td>
          </tr>
          <tr>
            <td class="font-bold">Predecessor</td>
            <td>The station immediately preceding the current station in the token circulation path.</td>
          </tr>
          <tr>
            <td class="font-bold">Successor</td>
            <td>The station immediately following the current station in the token circulation path.</td>
          </tr>
          <tr>
            <td class="font-bold text-blue-600 dark:text-blue-400">Token Holder</td>
            <td>The station currently possessing the token; the sole entity authorized to transmit data.</td>
          </tr>
        </tbody>
      </table>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">The 7-Step Working Principle</h3>
      <ol class="wiki-ordered-list">
        <li>Stations are organized into a logical ring according to their network addresses.</li>
        <li>A special token frame circulates continuously around the ring from predecessor to successor.</li>
        <li>A station wishing to transmit waits patiently until it receives the token.</li>
        <li>If the station has pending data, it captures and holds the token, then transmits its data frame onto the ring.</li>
        <li>The data frame travels around the ring, is copied by the destination, and returns to the sender for removal (frame stripping).</li>
        <li>After completing transmission, the sender generates and releases the token to its immediate successor.</li>
        <li>If a station receives the token but has no data to transmit, it immediately forwards the token to its successor. The process repeats indefinitely.</li>
      </ol>
    `,
    eli10: "In simple words: Stations sit in a circle. A special golden key (the token) is passed from hand to hand. Only the person holding the golden key is allowed to talk. When they finish talking, they hand the key to the next person.",
    analogy: "Think of an Olympic relay race or a speaking baton in an executive boardroom. Even if everyone has urgent comments, nobody is allowed to speak unless they are physically holding the baton. Once they make their point, they hand it to the person sitting on their right.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Detailed 4-Station Walkthrough (PDF Section 5)</h3>
      <p>Suppose four stations &mdash; <strong>Station A, Station B, Station C, and Station D</strong> &mdash; are connected in a logical ring in order $A \\to B \\to C \\to D \\to A$:</p>

      <div class="p-3 my-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-mono space-y-2">
        <div>1. Station A receives the token but has no data &rarr; Immediately passes token to B.</div>
        <div class="text-emerald-600 dark:text-emerald-400 font-bold">2. Station B receives the token and has data &rarr; Holds token and transmits data frame.</div>
        <div>3. Station B completes transmission &rarr; Releases and passes token to C.</div>
        <div class="text-emerald-600 dark:text-emerald-400 font-bold">4. Station C receives the token and has data &rarr; Holds token and transmits data frame.</div>
        <div>5. Station C finishes &rarr; Releases and passes token to D.</div>
        <div>6. Station D receives token but has no data &rarr; Forwards token back to A.</div>
      </div>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">The 4 Physical Topologies of Token Passing (Forouzan Figure 12.16)</h3>
      <p class="text-xs text-gray-600 dark:text-gray-400 mb-3">While the token always circulates in a <em>logical ring</em>, the underlying physical cable wiring can take four distinct topologies:</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-slate-800 dark:text-slate-200 block mb-1">1. Physical Ring Topology</span>
          <p class="text-slate-600 dark:text-slate-300">Stations are physically connected by point-to-point simplex cable links forming a closed loop (IEEE 802.5 Token Ring). Each station receives bits from its predecessor and regenerates them to its successor.</p>
          <span class="text-[10px] text-red-500 font-semibold block mt-1">Limitation: A single cable cut breaks the entire ring.</span>
        </div>

        <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-slate-800 dark:text-slate-200 block mb-1">2. Dual Ring Topology (FDDI)</span>
          <p class="text-slate-600 dark:text-slate-300">Uses two concentric rings transmitting in opposite directions (primary ring and counter-rotating secondary ring). If a cable cut occurs, adjacent nodes loop back the primary ring into the secondary ring, automatically restoring a closed loop.</p>
          <span class="text-[10px] text-emerald-600 font-semibold block mt-1">Example: Fiber Distributed Data Interface (FDDI).</span>
        </div>

        <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-slate-800 dark:text-slate-200 block mb-1">3. Bus Ring Topology (Token Bus - IEEE 802.4)</span>
          <p class="text-slate-600 dark:text-slate-300">Stations are physically connected to a single linear coaxial bus cable. Stations form a logical ring in software by knowing the MAC addresses of their predecessors and successors. Tokens are transmitted as addressed unicast frames.</p>
          <span class="text-[10px] text-blue-600 font-semibold block mt-1">Standard: IEEE 802.4 Token Bus (Manufacturing Automation).</span>
        </div>

        <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-slate-800 dark:text-slate-200 block mb-1">4. Star Ring Topology (MAU Hub)</span>
          <p class="text-slate-600 dark:text-slate-300">Stations are wired in a physical star pattern to a central hub called a Multistation Access Unit (MAU). Inside the MAU, electromechanical relays wire the ports in a continuous loop. If a workstation is unplugged or fails, the MAU relay automatically snaps shut to bypass the node.</p>
          <span class="text-[10px] text-emerald-600 font-semibold block mt-1">High Reliability: Eliminates single station failure vulnerabilities.</span>
        </div>
      </div>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Token Circulation Time & Bounded Latency</h3>
      <p>If there are $N$ stations in the ring and the propagation plus station processing delay between adjacent stations is $T_{\\text{hop}}$, the time required for a free token to make one complete idle circulation is:</p>
      
      <div class="p-3 my-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-center font-mono text-sm text-emerald-900 dark:text-emerald-200">
        $$T = N \\times T_{\\text{hop}}$$
      </div>

      <p class="text-xs text-gray-600 dark:text-gray-400 mb-3">
        When stations transmit, a <strong>Token Holding Timer (THT)</strong> limits how long any single node can transmit data (typically $\\le 10\\text{ ms}$). This guarantees that every node on the ring receives a transmission opportunity within a strictly bounded interval:
        $$T_{\\text{max\\_wait}} = N \\times \\text{THT}$$
      </p>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Token Management & Failure Recovery</h3>
      <ul class="wiki-bullet-list text-xs">
        <li><strong>Lost Token:</strong> If noise corrupts the token, the ring deadlocks. A designated <em>Active Monitor</em> station runs a timer longer than $N \\times T_{\\text{hop}}$; if no token passes, the monitor purges the ring and regenerates a fresh token.</li>
        <li><strong>Duplicate Tokens:</strong> If a station falsely generates a second token, multiple simultaneous transmissions occur. The monitor eliminates extra tokens.</li>
        <li><strong>Station Insertion / Removal:</strong> When a station powers on, it must announce itself and update its predecessor and successor pointers using neighbor notification protocols.</li>
      </ul>
    `,
    workedExamples: {
      level1: "<strong>Numerical 4 (Token Circulation - PDF Section 10):</strong><br>A token takes 2 ms to move from one station to the next in a local ring. There are 8 stations connected. Ignoring data transmission time, how long does one complete token circulation take?<br><br><strong>Solution:</strong><br>Using the formula $T = N \\times T_{\\text{hop}}$:<br>$$T = 8 \\times 2 \\text{ ms} = 16 \\text{ ms}$$<br><strong>Answer:</strong> One complete token circulation takes exactly 16 ms.",
      level2: "<strong>Analysis Problem:</strong> In an IEEE 802.5 Token Ring with 20 stations and a Token Holding Time (THT) of 10 ms, what is the maximum time Station 5 must wait before getting an opportunity to transmit if all other stations use their full transmission quota?<br><br><strong>Solution:</strong><br>Maximum waiting time occurs when all other 19 stations transmit their maximum allocation:<br>$$T_{\\text{wait}} = (N - 1) \\times \\text{THT} + (N \\times T_{\\text{hop}})$$<br>Ignoring negligible propagation delay:<br>$$T_{\\text{wait}} = 19 \\times 10 \\text{ ms} = 190 \\text{ ms}$$<br><strong>Answer:</strong> Station 5 is mathematically guaranteed to receive the token within 190 ms, proving the deterministic quality of token passing.",
      level3: "<strong>Fault Tolerance Scenario:</strong> How does an FDDI dual ring recover from a physical fiber cut between two buildings?<br><br><strong>Analysis:</strong> FDDI maintains a secondary ring transmitting in the reverse direction. When stations on either side of the fiber cut detect loss of optical signal, their optical bypass switches enter 'wrap mode'. Station X routes the primary ring onto the secondary ring, and Station Y does the same. This folds the two concentric rings into a single continuous loop of double length, preserving uninterrupted network communication."
    },
    advantagesLimitations: `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-xs">
        <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg">
          <h4 class="font-bold text-emerald-900 dark:text-emerald-200 mb-2 flex items-center gap-1.5">
            <i class="fa-solid fa-check text-emerald-600"></i> Advantages (PDF Section 5)
          </h4>
          <ul class="space-y-1.5 list-disc pl-4 text-slate-700 dark:text-slate-300">
            <li><strong>Zero Collisions:</strong> Eliminates normal data collisions completely because only the token holder transmits.</li>
            <li><strong>Guaranteed Fairness:</strong> Round-robin token passing gives every node an equitable transmission chance.</li>
            <li><strong>Bounded Latency:</strong> Strict mathematical limit on access delay, ideal for real-time manufacturing.</li>
            <li><strong>High Heavy-Traffic Throughput:</strong> Achieves near 100% channel utilization when traffic is heavy.</li>
          </ul>
        </div>
        <div class="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
          <h4 class="font-bold text-red-900 dark:text-red-200 mb-2 flex items-center gap-1.5">
            <i class="fa-solid fa-xmark text-red-600"></i> Disadvantages (PDF Section 5)
          </h4>
          <ul class="space-y-1.5 list-disc pl-4 text-slate-700 dark:text-slate-300">
            <li><strong>Complex Token Management:</strong> Lost or duplicate tokens require complex monitor recovery protocols.</li>
            <li><strong>Vulnerability to Station / Link Cuts:</strong> A failed station or severed cable can halt the entire ring (unless MAU or dual-ring used).</li>
            <li><strong>Idle Token Overhead:</strong> Token circulation consumes bandwidth even when no station has data to send.</li>
            <li><strong>Light-Traffic Latency:</strong> A station with urgent data must wait for the token to arrive from its predecessor.</li>
          </ul>
        </div>
      </div>
    `,
    whereUsed: [
      "IBM IEEE 802.5 Token Ring local area network architectures.",
      "FDDI (Fiber Distributed Data Interface) high-speed campus backbones.",
      "IEEE 802.4 Token Bus industrial automated manufacturing cells (MAP protocol).",
      "Real-time avionics ring networks and nuclear power plant telemetry."
    ],
    quiz: [
      {
        question: "What gives a station permission to transmit in the Token Passing protocol?",
        options: ["An ACK packet", "A reservation frame", "Possession of the special token frame", "An IP broadcast"],
        correct: 2,
        explanation: "In token passing, only the station currently holding the special control frame called the token is authorized to transmit data."
      },
      {
        question: "Which token passing physical topology uses a secondary counter-rotating ring for automatic fault recovery?",
        options: ["Star Ring", "Dual Ring (FDDI)", "Bus Ring", "Single Physical Ring"],
        correct: 1,
        explanation: "Dual Ring topologies, such as FDDI, employ a counter-rotating secondary ring to loop back traffic automatically when a cable break occurs."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 12 (Section 12.2.3: Token Passing).", url: "" },
      { cite: "IEEE Standard 802.5: Token Ring Access Method and Physical Layer Specifications.", url: "" }
    ]
  }
};

// =============================================================================
// SUBTOPIC 5: u2-collision-free-working-principles - Working Principles & Examples (Reservation & Polling)
// =============================================================================
data["u2-collision-free-working-principles"] = {
  id: "u2-collision-free-working-principles",
  title: "Working Principles and Examples",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 5,
  subtopicNumber: 5,
  whyItMatters: "Forouzan Chapter 12 Section 12.2 categorizes controlled access into Reservation, Polling, and Token Passing. Master the operational workflows, sequence diagrams, and mathematical efficiency of minislot Reservation and centralized Polling (Poll and Select functions).",
  prerequisitesList: [
    { concept: "Controlled Access Models", meaning: "Reservation vs Centralized Polling architectures" },
    { concept: "Primary-Secondary Hierarchy", meaning: "Master-slave relationship in centralized networks" }
  ],
  learningObjectives: [
    "Explain the interval-based structure of the Reservation protocol (minislots followed by data frames).",
    "Trace 5-station reservation examples where subset stations (e.g. 1, 3, 4) reserve and transmit.",
    "Define the Polling protocol and differentiate between the Primary station and Secondary stations.",
    "Detail the Poll function (data collection) and Select function (data distribution) workflows.",
    "Evaluate the primary station bottleneck and Single Point of Failure (SPOF) risks in polling.",
    "Calculate channel efficiency for reservation minislots."
  ],
  infobox: {
    layer: "Layer 2 (MAC Sublayer)",
    standard: "Forouzan Chapter 12.2.1 & 12.2.2 / Controlled Access",
    type: "Controlled-Access Mechanisms",
    prerequisites: ["u2-collision-free-intro"],
    relatedConcepts: ["u2-bit-map-protocol", "u2-token-passing-protocol"],
    compareWith: ["u2-comparison-collision-free"],
    primaryUses: ["Cellular D-TDMA reservation uplinks, mainframe multi-drop terminal polling (IBM SNA / BSC)"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Multiple_Access.png/600px-Multiple_Access.png",
  imageCaption: "Figure: Operational Workflows of Reservation Minislots and Centralized Polling/Select.",
  sections: {
    overview: `
      <p>In <em>Behrouz A. Forouzan's Data Communications and Networking (4th Edition, Chapter 12, Section 12.2)</em>, controlled-access methods are organized into three primary operational paradigms: <strong>Reservation</strong>, <strong>Polling</strong>, and <strong>Token Passing</strong>.</p>

      <p>This section provides an in-depth exploration of the working principles, operational traces, and failure modes of the <strong>Reservation</strong> and <strong>Polling</strong> protocols.</p>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">1. The Reservation Access Method (Forouzan 12.2.1)</h3>
      <p>In a reservation access method, a station must make an explicit reservation before it is permitted to transmit its data frame.</p>
      
      <p>Time is divided into discrete, repeating <strong>intervals</strong>. Each interval begins with a <strong>reservation frame</strong> consisting of $N$ minislots (one minislot for each of the $N$ stations in the network), followed by the reserved data frames:</p>

      <div class="p-3 my-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-lg text-xs">
        <h4 class="font-bold text-blue-900 dark:text-blue-200 mb-1">Reservation Working Principle:</h4>
        <ol class="wiki-ordered-list">
          <li>Time is partitioned into intervals.</li>
          <li>A reservation frame containing $N$ minislots is broadcast at the start of each interval.</li>
          <li>Each station has a designated minislot. A station needing to transmit marks its minislot with a <code>1</code>.</li>
          <li>Stations with no data leave their minislots as <code>0</code>.</li>
          <li>After the reservation frame passes, the stations that reserved access transmit their full data frames in agreed order.</li>
          <li>Once all reserved frames finish, the process repeats in the subsequent interval.</li>
        </ol>
      </div>

      <h4 class="font-bold text-sm my-2 text-gray-900 dark:text-white">Worked Reservation Example (PDF Section 6)</h4>
      <p class="text-xs text-gray-600 dark:text-gray-400">Suppose a network contains 5 stations (Stations 1, 2, 3, 4, 5). Stations 1, 3, and 4 need to transmit data:</p>
      
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Station Index</th>
            <th>Minislot Value</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Station 1</td><td class="font-mono font-bold text-blue-600">1</td><td>Requests transmission slot</td></tr>
          <tr><td>Station 2</td><td class="font-mono text-slate-400">0</td><td>No data; remains silent</td></tr>
          <tr><td>Station 3</td><td class="font-mono font-bold text-blue-600">1</td><td>Requests transmission slot</td></tr>
          <tr><td>Station 4</td><td class="font-mono font-bold text-blue-600">1</td><td>Requests transmission slot</td></tr>
          <tr><td>Station 5</td><td class="font-mono text-slate-400">0</td><td>No data; remains silent</td></tr>
        </tbody>
      </table>

      <div class="p-2.5 my-2 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 text-xs font-bold text-emerald-900 dark:text-emerald-200">
        Resulting Transmission Order: Station 1 &rarr; Station 3 &rarr; Station 4 (Stations 2 and 5 remain silent; zero collisions).
      </div>
    `,
    eli10: "In simple words: In Reservation, you book a table before you go to the restaurant. In Polling, the teacher points at each student one by one and asks: 'Do you have an answer?' Only the student pointed at can speak.",
    analogy: "Think of a restaurant reservation book (Reservation Protocol) where customers call ahead to claim slots. In Polling, think of an air traffic controller (Primary) calling each pilot (Secondary) on the radio: 'Flight 101, report status.' Flight 101 reports, the tower confirms, and then the tower calls Flight 102.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">2. The Polling Protocol (Forouzan 12.2.2)</h3>
      <p>Polling is a centralized controlled-access method designed for topologies where one device is designated as the <strong>Primary Station</strong> (controller) and all other connected devices are <strong>Secondary Stations</strong>.</p>

      <p>Secondary stations cannot initiate transmissions independently. All communication is strictly mediated by the primary station through two fundamental functions:</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-xs">
        <!-- Poll Function -->
        <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-purple-600 dark:text-purple-400 block mb-2 flex items-center gap-1.5">
            <i class="fa-solid fa-arrow-down-up-across-line text-purple-500"></i> A. The Poll Function (Data Collection)
          </span>
          <p class="text-slate-600 dark:text-slate-300 mb-2">Used when the primary station wants to <strong>receive data</strong> from secondary stations:</p>
          <ol class="wiki-ordered-list space-y-1">
            <li>Primary sends a <code>Poll</code> frame to Secondary A.</li>
            <li>If Secondary A has data, it transmits its data frame. If it has no data, it responds with a <code>NAK</code> frame.</li>
            <li>If data is received, the Primary acknowledges with an <code>ACK</code> frame.</li>
            <li>The Primary then proceeds to poll Secondary B, continuing sequentially.</li>
          </ol>
        </div>

        <!-- Select Function -->
        <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-blue-600 dark:text-blue-400 block mb-2 flex items-center gap-1.5">
            <i class="fa-solid fa-arrow-up-right-from-square text-blue-500"></i> B. The Select Function (Data Delivery)
          </span>
          <p class="text-slate-600 dark:text-slate-300 mb-2">Used when the primary station has data to <strong>send to</strong> a secondary station:</p>
          <ol class="wiki-ordered-list space-y-1">
            <li>Primary sends a <code>Select (SEL)</code> frame to Secondary B to test readiness.</li>
            <li>Secondary B replies with an <code>ACK</code> indicating it is ready to receive.</li>
            <li>Primary transmits its data frame to Secondary B.</li>
            <li>Secondary B sends an <code>ACK</code> confirming successful frame receipt.</li>
          </ol>
        </div>
      </div>

      <h4 class="font-bold text-sm my-2 text-gray-900 dark:text-white">Worked Polling Example (PDF Section 7)</h4>
      <p class="text-xs text-gray-600 dark:text-gray-400">Suppose a primary station controls three secondary devices &mdash; <strong>Station A, Station B, and Station C</strong>:</p>
      
      <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-mono space-y-1.5">
        <div>1. Primary polls Station A &rarr; Station A has no data (responds NAK).</div>
        <div class="text-purple-600 dark:text-purple-400 font-bold">2. Primary polls Station B &rarr; Station B has data, transmits Data Frame.</div>
        <div>3. Primary receives frame &rarr; Transmits ACK to Station B.</div>
        <div>4. Primary polls Station C &rarr; Station C has no data (responds NAK).</div>
      </div>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Comparative Analysis: Reservation vs. Polling vs. Token Passing</h3>
      <table class="wiki-table text-xs">
        <thead>
          <tr>
            <th>Characteristic</th>
            <th>Reservation (12.2.1)</th>
            <th>Polling (12.2.2)</th>
            <th>Token Passing (12.2.3)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Control Architecture</strong></td>
            <td>Distributed (minislot broadcast)</td>
            <td><strong>Strictly Centralized</strong> (Primary controller)</td>
            <td>Distributed (Logical ring circulation)</td>
          </tr>
          <tr>
            <td><strong>Arbitration Mechanism</strong></td>
            <td>Advance booking in minislots</td>
            <td>Sequential Poll / Select inquiries</td>
            <td>Circulation of permission token</td>
          </tr>
          <tr>
            <td><strong>Vulnerability / Bottleneck</strong></td>
            <td>Minislot overhead under light traffic</td>
            <td><strong>Primary station failure & bottleneck</strong></td>
            <td>Token loss / ring break</td>
          </tr>
          <tr>
            <td><strong>Best Operating Domain</strong></td>
            <td>Synchronous bursty uplink channels</td>
            <td>Mainframe terminals & sensor stars</td>
            <td>Real-time factory LANs & campus rings</td>
          </tr>
        </tbody>
      </table>
    `,
    workedExamples: {
      level1: "<strong>Question (Differentiate Functions - PDF Section 14 Q9):</strong> What is the difference between the Poll function and the Select function in the Polling protocol?<br><br><strong>Answer:</strong> The <strong>Poll function</strong> is used when the Primary station wants to <em>receive</em> data from secondary stations (it queries each secondary station to see if it has data to send). The <strong>Select function</strong> is used when the Primary station wants to <em>send</em> data to a secondary station (it alerts the secondary with a SEL frame to confirm buffer readiness before transmitting data).",
      level2: "<strong>Numerical Calculation (Reservation Efficiency):</strong> A reservation frame contains 16 minislots, and 6 stations reserve access. Each data frame is 200 bits. Calculate total bits transmitted and channel utilization.<br><br><strong>Solution:</strong><br>1. Reservation overhead = 16 bits.<br>2. Data bits transmitted = $6 \\times 200 = 1200 \\text{ bits}$.<br>3. Total bits sent = $1200 + 16 = 1216 \\text{ bits}$.<br>4. Channel Efficiency = $\\frac{1200}{1216} \\approx 98.68\\%$.<br><br><strong>Answer:</strong> 1216 total bits are transmitted, achieving 98.68% channel efficiency.",
      level3: "<strong>Architectural Vulnerability Analysis:</strong> Why is the Polling protocol rarely used in peer-to-peer modern LANs?<br><br><strong>Analysis:</strong> In Polling, the primary station represents a critical <strong>Single Point of Failure (SPOF)</strong> &mdash; if the primary crashes, all network communication immediately collapses. Furthermore, the primary is a severe processing bottleneck that must poll all secondary stations sequentially, wasting massive bandwidth on poll/NAK exchanges when secondary stations have nothing to send."
    },
    advantagesLimitations: `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-xs">
        <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg">
          <h4 class="font-bold text-emerald-900 dark:text-emerald-200 mb-2">Advantages of Polling & Reservation</h4>
          <ul class="space-y-1.5 list-disc pl-4 text-slate-700 dark:text-slate-300">
            <li><strong>Zero Collisions:</strong> Centralized coordination eliminates frame collisions completely.</li>
            <li><strong>Centralized Policy Enforcement:</strong> Primary can easily prioritize critical devices over non-critical ones.</li>
            <li><strong>Simple Secondary Station Logic:</strong> Secondary devices need no complex collision detection or MAC hardware.</li>
            <li><strong>Predictable Allocation:</strong> In reservation, bandwidth is allocated only to stations that explicitly request it.</li>
          </ul>
        </div>
        <div class="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
          <h4 class="font-bold text-red-900 dark:text-red-200 mb-2">Disadvantages of Polling & Reservation</h4>
          <ul class="space-y-1.5 list-disc pl-4 text-slate-700 dark:text-slate-300">
            <li><strong>Primary Station Bottleneck:</strong> Primary must handle every transaction, limiting scalability.</li>
            <li><strong>Single Point of Failure:</strong> If the primary device fails, all network communication halts.</li>
            <li><strong>High Polling Overhead:</strong> Constant Poll / NAK exchanges waste channel capacity when stations are idle.</li>
            <li><strong>Wasted Minislots:</strong> In reservation, unused minislots represent lost channel capacity.</li>
          </ul>
        </div>
      </div>
    `,
    whereUsed: [
      "IBM Systems Network Architecture (SNA) mainframe multi-drop terminal lines.",
      "Wireless cellular uplink reservation systems (D-TDMA and GPRS packet reservation).",
      "Industrial SCADA master-RTU telemetry systems over serial multidrop RS-485."
    ],
    quiz: [
      {
        question: "Which device controls medium access in the Polling protocol?",
        options: ["Secondary station", "Primary station", "Default gateway", "Repeater hub"],
        correct: 1,
        explanation: "In polling, the primary station acts as the central controller deciding which secondary station is permitted to transmit."
      },
      {
        question: "What does a secondary station transmit if it has no data when polled by the primary station?",
        options: ["ACK frame", "NAK (negative acknowledgment) frame", "Select frame", "Jamming signal"],
        correct: 1,
        explanation: "When polled, a secondary station with no data responds with a NAK frame so the primary can proceed immediately to the next station."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 12 (Section 12.2.1: Reservation, Section 12.2.2: Polling).", url: "" },
      { cite: "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 4.", url: "" }
    ]
  }
};

// =============================================================================
// SUBTOPIC 6: u2-comparison-collision-free - Comparison of Collision-Free Protocols
// =============================================================================
data["u2-comparison-collision-free"] = {
  id: "u2-comparison-collision-free",
  title: "Comparison of Collision-Free Protocols",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 5,
  subtopicNumber: 6,
  whyItMatters: "Consolidates all collision-free and controlled-access protocols into a master comparative matrix. Includes Random Access vs Controlled Access syntheses, the complete 13-entry syllabus terminology glossary, and high-yield exam mnemonics.",
  prerequisitesList: [
    { concept: "Bit-Map Protocol", meaning: "Reservation bits per station" },
    { concept: "Binary Countdown Protocol", meaning: "Bit-by-bit address competition" },
    { concept: "Token Passing Protocol", meaning: "Circulating token in logical ring" },
    { concept: "Polling & Reservation", meaning: "Forouzan 12.2 controlled-access methods" }
  ],
  learningObjectives: [
    "Compare Bit-Map, Binary Countdown, Token Passing, Reservation, and Polling across 5 core technical dimensions.",
    "Contrast contention-based Random Access with coordinated Collision-Free Access.",
    "Master the 13 foundational syllabus definitions from PDF Section 13.",
    "Apply the easy memory trick mnemonics from PDF Section 16 for rapid exam recall.",
    "Select the optimal protocol for real-time, high-density, or master-slave network deployments."
  ],
  infobox: {
    layer: "Layer 2 (MAC Sublayer)",
    standard: "Forouzan Ch. 12 / Tanenbaum Ch. 4 / Summary Synthesis",
    type: "Master Comparative Synthesis",
    prerequisites: ["u2-collision-free-intro", "u2-bit-map-protocol", "u2-binary-countdown-protocol", "u2-token-passing-protocol"],
    relatedConcepts: ["u2-comparison-multiple-access"],
    compareWith: ["u2-comparison-multiple-access"],
    primaryUses: ["Protocol architecture selection, network design trade-off analysis, exam revision"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Multiple_Access.png",
  imageCaption: "Figure: Master Taxonomic Matrix of Controlled-Access & Collision-Free Protocols.",
  sections: {
    overview: `
      <p>This comprehensive comparison synthesizes all collision-free and controlled-access protocols studied across Unit 2 Topic 5. It integrates the master comparison tables, terminology glossary, and exam revision aids from <strong>Sections 8, 9, 13, and 16</strong> of the syllabus curriculum.</p>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Master Comparison Table of Collision-Free & Controlled-Access Protocols (PDF Section 8)</h3>
      <p class="text-xs text-gray-600 dark:text-gray-400 mb-3">Comparing all 5 protocols across Access Method, Main Control, Collision Prevention, Central Controller, and Main Drawback:</p>

      <div class="overflow-x-auto my-3">
        <table class="wiki-table text-xs">
          <thead>
            <tr>
              <th>Protocol Feature</th>
              <th>Bit-Map Protocol</th>
              <th>Binary Countdown</th>
              <th>Token Passing</th>
              <th>Reservation (Forouzan)</th>
              <th>Polling (Forouzan)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Access Method</strong></td>
              <td>Dedicated reservation bits</td>
              <td>Bit-by-bit address competition</td>
              <td>Circulating token frame</td>
              <td>Reservation frame minislots</td>
              <td>Primary station controlled</td>
            </tr>
            <tr>
              <td><strong>Main Control Entity</strong></td>
              <td>$N$-bit reservation bitmap</td>
              <td>Binary station addresses</td>
              <td>Current token holder</td>
              <td>Interval reservation frame</td>
              <td>Central Primary Station</td>
            </tr>
            <tr>
              <td><strong>Collision Prevention</strong></td>
              <td>Yes, during data phase</td>
              <td>Yes, in arbitration & data</td>
              <td>Yes, during normal operation</td>
              <td>Yes, during data phase</td>
              <td>Yes, through centralized polling</td>
            </tr>
            <tr>
              <td><strong>Central Controller Required?</strong></td>
              <td><strong>No</strong> (Distributed)</td>
              <td><strong>No</strong> (Distributed)</td>
              <td><strong>No</strong> (No single controller needed)</td>
              <td>Depends on design (usually distributed)</td>
              <td><strong>Yes</strong> (Primary station mandatory)</td>
            </tr>
            <tr>
              <td><strong>Overhead Scaling</strong></td>
              <td>$O(N)$ linear bits per epoch</td>
              <td>$O(\\log_2 N)$ logarithmic bits</td>
              <td>Token frame per handoff</td>
              <td>$N$ minislots per interval</td>
              <td>Poll & Select frames per station</td>
            </tr>
            <tr class="bg-red-50/50 dark:bg-red-950/20">
              <td><strong>Main Drawback / Trade-off</strong></td>
              <td>Reservation bit overhead under light traffic</td>
              <td>Priority imbalance / starvation of low addresses</td>
              <td>Token management & ring cut vulnerability</td>
              <td>Reservation frame overhead</td>
              <td>Primary station bottleneck & failure (SPOF)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="p-3 my-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-lg text-xs text-blue-900 dark:text-blue-300">
        <strong>Curriculum Reminder:</strong> Bit-map and reservation protocols are closely related because both use reservation minislots to organize transmission. They are conceptual twins implemented in distributed (Tanenbaum) and interval-slotted (Forouzan) frameworks.
      </div>
    `,
    eli10: "In simple words: Bit-map reserves bits; Binary Countdown compares numbers; Token Passing shares a key; Reservation books a turn; Polling asks the boss!",
    analogy: "Comparing these protocols is like choosing how to run a conference: voting before every question (Bit-Map), letting the highest-ranking executive speak (Binary Countdown), passing the microphone in a circle (Token Passing), signing up on a speaker sheet (Reservation), or having a moderator call on attendees one by one (Polling).",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">High-Yield Memory Tricks & Mnemonics (PDF Section 16)</h3>
      <p class="text-xs text-gray-600 dark:text-gray-400 mb-3">Use this quick memory trick from Section 16 of the syllabus for instant exam recall:</p>

      <table class="wiki-table text-xs">
        <thead>
          <tr>
            <th class="w-48">Protocol Name</th>
            <th class="w-48">Easy Memory Trick</th>
            <th>Core Mechanism to Visualize</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="font-bold">Bit-Map Protocol</td>
            <td class="font-mono font-bold text-blue-600 dark:text-blue-400">"Reserve a bit"</td>
            <td>Every station flips its dedicated 1-bit switch before frames fly.</td>
          </tr>
          <tr>
            <td class="font-bold">Binary Countdown</td>
            <td class="font-mono font-bold text-purple-600 dark:text-purple-400">"Compare addresses"</td>
            <td>Stations shout their ID numbers digit-by-digit; highest number wins.</td>
          </tr>
          <tr>
            <td class="font-bold">Token Passing</td>
            <td class="font-mono font-bold text-emerald-600 dark:text-emerald-400">"Hold the token"</td>
            <td>A special permission baton circulates in a ring; hold it to speak.</td>
          </tr>
          <tr>
            <td class="font-bold">Reservation Protocol</td>
            <td class="font-mono font-bold text-amber-600 dark:text-amber-400">"Book a turn"</td>
            <td>Time intervals start with booking minislots, followed by data.</td>
          </tr>
          <tr>
            <td class="font-bold">Polling Protocol</td>
            <td class="font-mono font-bold text-red-600 dark:text-red-400">"Primary asks"</td>
            <td>The master controller asks: 'Do you have data?' (Poll) or 'Are you ready?' (Select).</td>
          </tr>
        </tbody>
      </table>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Important Technical Terminology Glossary (PDF Section 13)</h3>
      <p class="text-xs text-gray-600 dark:text-gray-400 mb-3">All 13 official terminology definitions from Section 13 of the syllabus:</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div class="p-2.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-slate-800 dark:text-slate-200 block">Collision-Free Protocol:</span>
          <span class="text-slate-600 dark:text-slate-400">A protocol designed to prevent simultaneous conflicting transmissions on a shared channel.</span>
        </div>
        <div class="p-2.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-slate-800 dark:text-slate-200 block">Bitmap:</span>
          <span class="text-slate-600 dark:text-slate-400">A dedicated sequence of reservation bits indicating station transmission intentions.</span>
        </div>
        <div class="p-2.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-slate-800 dark:text-slate-200 block">Reservation:</span>
          <span class="text-slate-600 dark:text-slate-400">An explicit transmission request made by a station prior to data frame delivery.</span>
        </div>
        <div class="p-2.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-slate-800 dark:text-slate-200 block">Binary Countdown:</span>
          <span class="text-slate-600 dark:text-slate-400">A medium-access method using bit-by-bit binary station address competition.</span>
        </div>
        <div class="p-2.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-slate-800 dark:text-slate-200 block">Token:</span>
          <span class="text-slate-600 dark:text-slate-400">A special control frame that circulates among stations granting exclusive permission to transmit.</span>
        </div>
        <div class="p-2.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-slate-800 dark:text-slate-200 block">Token Holder:</span>
          <span class="text-slate-600 dark:text-slate-400">The station currently possessing the token and authorized to transmit data.</span>
        </div>
        <div class="p-2.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-slate-800 dark:text-slate-200 block">Logical Ring:</span>
          <span class="text-slate-600 dark:text-slate-400">A cyclic ordering of stations where every station has a defined predecessor and successor.</span>
        </div>
        <div class="p-2.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-slate-800 dark:text-slate-200 block">Polling:</span>
          <span class="text-slate-600 dark:text-slate-400">A controlled-access method where a primary station asks secondary stations if they have data.</span>
        </div>
        <div class="p-2.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-slate-800 dark:text-slate-200 block">Primary Station:</span>
          <span class="text-slate-600 dark:text-slate-400">The central device controlling medium access and directing secondary stations in polling.</span>
        </div>
        <div class="p-2.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-slate-800 dark:text-slate-200 block">Secondary Station:</span>
          <span class="text-slate-600 dark:text-slate-400">A device controlled by the primary station that transmits only when polled.</span>
        </div>
        <div class="p-2.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-slate-800 dark:text-slate-200 block">Select:</span>
          <span class="text-slate-600 dark:text-slate-400">A polling function where the primary station alerts a secondary station to receive data.</span>
        </div>
        <div class="p-2.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-slate-800 dark:text-slate-200 block">Predecessor:</span>
          <span class="text-slate-600 dark:text-slate-400">The station immediately preceding the current station in a logical ring.</span>
        </div>
        <div class="p-2.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
          <span class="font-bold text-slate-800 dark:text-slate-200 block">Successor:</span>
          <span class="text-slate-600 dark:text-slate-400">The station immediately following the current station in a logical ring.</span>
        </div>
      </div>
    `,
    workedExamples: {
      level1: "<strong>Protocol Selection Scenario:</strong> An automotive engineering team needs a shared-bus protocol for 12 electronic control units (ECUs) inside a car. Communication must have zero collisions, and critical brake messages must always take priority over radio volume updates. Which collision-free protocol is best suited, and why?<br><br><strong>Solution:</strong> The team should choose the <strong>Binary Countdown Protocol</strong> (specifically implemented as the CAN bus protocol, ISO 11898). Binary countdown provides built-in, non-destructive priority arbitration with minimal overhead (only $\\lceil \\log_2 12 \\rceil = 4$ bits), guaranteeing that critical safety messages win channel access immediately without collision.",
      level2: "<strong>Network Scalability Trade-off:</strong> Compare the arbitration overhead of the Bit-Map protocol versus the Binary Countdown protocol for a large network of 128 stations.<br><br><strong>Solution:</strong><br>1. Bit-Map Protocol requires $N$ bits: $\\text{Overhead} = 128 \\text{ bits}$ per frame epoch.<br>2. Binary Countdown requires $\\lceil \\log_2 N \\rceil$ bits: $\\text{Overhead} = \\lceil \\log_2 128 \\rceil = 7 \\text{ bits}$ per frame epoch.<br>3. Ratio of efficiency: Binary Countdown reduces arbitration overhead by a factor of $\\frac{128}{7} \\approx 18.3\\times$!<br><br><strong>Conclusion:</strong> Binary Countdown scales logarithmically, making it vastly superior to Bit-Map for large station counts.",
      level3: "<strong>Exam Question (Medium-Answer - PDF Section 14):</strong> Compare Polling and Token Passing across control architecture, failure modes, and hardware complexity.<br><br><strong>Answer:</strong><br>1. <strong>Control Architecture:</strong> Polling is strictly centralized (requires a primary master station), whereas Token Passing is completely distributed (no single central controller required).<br>2. <strong>Failure Modes:</strong> In Polling, primary station failure halts all network communication (Single Point of Failure). In Token Passing, a station crash or severed link can disrupt the ring, requiring dual-ring loopbacks or active monitor token regeneration.<br>3. <strong>Hardware Complexity:</strong> Polling allows very simple secondary stations because all logic resides in the primary. Token Passing requires all stations to implement ring maintenance, address matching, and token release logic."
    },
    advantagesLimitations: `
      <div class="p-3 my-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
        <h4 class="font-bold text-slate-800 dark:text-slate-200 mb-2">Quick Protocol Selection Guide</h4>
        <ul class="space-y-1.5 text-slate-600 dark:text-slate-300">
          <li><strong>Choose Token Passing (IEEE 802.5 / FDDI):</strong> When all stations are peer nodes, traffic is heavy and continuous, and access delay must have a guaranteed upper bound.</li>
          <li><strong>Choose Binary Countdown (CAN Bus):</strong> When devices have fixed priority hierarchies and the network requires minimum arbitration overhead ($O(\\log_2 N)$).</li>
          <li><strong>Choose Polling (Primary-Secondary):</strong> When simple dumb terminal or sensor nodes connect to an intelligent central mainframe controller.</li>
          <li><strong>Choose Bit-Map / Reservation:</strong> When synchronized periodic traffic schedules channel capacity ahead of bulk data transmission.</li>
        </ul>
      </div>
    `,
    whereUsed: [
      "Network protocol design evaluations and standard selection.",
      "Embedded vehicular network architecture (CAN, LIN, FlexRay).",
      "Factory automated industrial control architectures (PROFIBUS, Fieldbus Foundation)."
    ],
    quiz: [
      {
        question: "Which of the following is NOT a decentralized collision-free protocol?",
        options: ["Bit-Map Protocol", "Binary Countdown", "Token Passing", "Polling Protocol"],
        correct: 3,
        explanation: "Polling is strictly centralized; it requires a primary station to control and arbitrate channel access for all secondary stations."
      },
      {
        question: "What is the memory trick for the Token Passing protocol from the syllabus?",
        options: ["'Reserve a bit'", "'Compare addresses'", "'Hold the token'", "'Primary asks'"],
        correct: 2,
        explanation: "As taught in Section 16 of the syllabus, the easy memory trick for Token Passing is 'Hold the token'."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 12 (Section 12.2).", url: "" },
      { cite: "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 4 (Section 4.2).", url: "" }
    ]
  }
};

console.log("Successfully prepared full educational content for all 6 Topic 5 subtopics!");

// =============================================================================
// ENRICH TOPIC 11: REVISION AND ASSESSMENT WITH TOPIC 5 CONTENT
// =============================================================================

// 1. Add Numericals 13-16 to u2-numerical-problems
if (data["u2-numerical-problems"]) {
  const t5Numericals = `
    <!-- Numerical Problem 13: Bit-Map Protocol Size -->
    <div class="p-4 mb-4 rounded-xl border border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-800 shadow-sm">
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
          Numerical Problem 13 &bull; Topic 5 (Bit-Map Size)
        </span>
        <span class="text-xs text-slate-400 font-mono">PDF Section 10</span>
      </div>
      <p class="text-xs text-slate-800 dark:text-slate-200 font-semibold mb-2">
        <strong>Problem Statement:</strong> A network contains 20 stations. How many reservation bits are required in a basic bit-map protocol?
      </p>
      <div class="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg text-xs font-mono space-y-1.5 text-slate-700 dark:text-slate-300">
        <div><strong>Given:</strong> Number of stations $N = 20$.</div>
        <div><strong>Formula:</strong> $\\text{Bitmap Size} = N$</div>
        <div><strong>Calculation:</strong> $\\text{Bitmap Size} = 20 \\text{ bits}$.</div>
        <div class="text-emerald-600 dark:text-emerald-400 font-bold mt-1">
          &there4; Exactly 20 reservation bits are required in the contention period preceding each data phase.
        </div>
      </div>
    </div>

    <!-- Numerical Problem 14: Reservation Efficiency -->
    <div class="p-4 mb-4 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-white dark:bg-slate-800 shadow-sm">
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
          Numerical Problem 14 &bull; Topic 5 (Reservation Efficiency)
        </span>
        <span class="text-xs text-slate-400 font-mono">PDF Section 10</span>
      </div>
      <p class="text-xs text-slate-800 dark:text-slate-200 font-semibold mb-2">
        <strong>Problem Statement:</strong> A reservation frame contains 10 bits, and 4 stations reserve access. If each data transmission uses 100 bits, calculate the total number of bits sent and the channel efficiency, ignoring other overhead.
      </p>
      <div class="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg text-xs font-mono space-y-1.5 text-slate-700 dark:text-slate-300">
        <div><strong>1. Reservation Overhead:</strong> $10 \\text{ bits}$.</div>
        <div><strong>2. Total Data Bits Sent:</strong> $4 \\times 100 = 400 \\text{ bits}$.</div>
        <div><strong>3. Total Bits Sent:</strong> $\\text{Data bits} + \\text{Reservation bits} = 400 + 10 = 410 \\text{ bits}$.</div>
        <div><strong>4. Channel Efficiency:</strong> $\\eta = \\frac{\\text{Data Bits}}{\\text{Total Bits}} = \\frac{400}{410} \\approx 97.56\\%$.</div>
        <div class="text-emerald-600 dark:text-emerald-400 font-bold mt-1">
          &there4; Total bits sent = 410 bits; Channel efficiency = 97.56%.
        </div>
      </div>
    </div>

    <!-- Numerical Problem 15: Binary Address Length -->
    <div class="p-4 mb-4 rounded-xl border border-purple-200 dark:border-purple-800 bg-white dark:bg-slate-800 shadow-sm">
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs font-bold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300">
          Numerical Problem 15 &bull; Topic 5 (Binary Countdown Address Length)
        </span>
        <span class="text-xs text-slate-400 font-mono">PDF Section 10</span>
      </div>
      <p class="text-xs text-slate-800 dark:text-slate-200 font-semibold mb-2">
        <strong>Problem Statement:</strong> What is the minimum number of bits needed to uniquely represent 32 stations in a binary countdown network?
      </p>
      <div class="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg text-xs font-mono space-y-1.5 text-slate-700 dark:text-slate-300">
        <div><strong>Given:</strong> Number of stations $N = 32$.</div>
        <div><strong>Condition:</strong> $2^m \\ge N$</div>
        <div><strong>Calculation:</strong> $2^m \\ge 32 \\implies 2^5 = 32 \\implies m = 5$.</div>
        <div class="text-emerald-600 dark:text-emerald-400 font-bold mt-1">
          &there4; Exactly 5 bits are required to represent each station's address.
        </div>
      </div>
    </div>

    <!-- Numerical Problem 16: Token Circulation Time -->
    <div class="p-4 mb-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-white dark:bg-slate-800 shadow-sm">
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
          Numerical Problem 16 &bull; Topic 5 (Token Circulation Time)
        </span>
        <span class="text-xs text-slate-400 font-mono">PDF Section 10</span>
      </div>
      <p class="text-xs text-slate-800 dark:text-slate-200 font-semibold mb-2">
        <strong>Problem Statement:</strong> A token takes 2 ms to move from one station to the next. There are 8 stations. Ignoring data-transmission time, how long does one complete token circulation take?
      </p>
      <div class="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg text-xs font-mono space-y-1.5 text-slate-700 dark:text-slate-300">
        <div><strong>Given:</strong> $N = 8$ stations, $T_{\\text{hop}} = 2 \\text{ ms}$.</div>
        <div><strong>Formula:</strong> $T = N \\times T_{\\text{hop}}$</div>
        <div><strong>Calculation:</strong> $T = 8 \\times 2 = 16 \\text{ ms}$.</div>
        <div class="text-emerald-600 dark:text-emerald-400 font-bold mt-1">
          &there4; One complete idle token circulation takes exactly 16 ms.
        </div>
      </div>
    </div>
  `;
  if (!data["u2-numerical-problems"].sections.overview.includes("Numerical Problem 13 &bull; Topic 5")) {
    data["u2-numerical-problems"].sections.overview += t5Numericals;
  }
}

// 2. Add Short-Answer Questions 41-50 to u2-short-answer-questions
if (data["u2-short-answer-questions"]) {
  const t5ShortQuestions = `
    <div class="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
      <h3 class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
        Topic 5 – Collision-Free Protocols Short-Answer Questions (PDF Section 14, 2 Marks Each)
      </h3>
      <div class="space-y-3 text-xs">
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q41. Define a collision-free protocol.</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> A collision-free protocol is a medium-access control method designed to prevent simultaneous conflicting transmissions by coordinating which station can transmit and when.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q42. What is the bit-map protocol?</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> The bit-map protocol is a reservation-based access method in which each station has a dedicated reservation bit in a contention period; reserving stations transmit in ascending order.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q43. What is a reservation bit?</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> A reservation bit is a single bit asserted by a station (1 = request, 0 = no request) during the reservation phase to request a future data transmission slot.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q44. Define binary countdown.</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> Binary countdown is a collision-free access method where contending stations transmit their unique binary addresses bit-by-bit from MSB to LSB; the highest-priority address wins channel access.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q45. What is a token?</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> A token is a special compact control frame that circulates among stations in a network, conferring exclusive permission to transmit data to the station currently holding it.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q46. What is token passing?</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> Token passing is a controlled-access method where stations are organized in a logical ring, and permission to transmit is passed sequentially from predecessor to successor via a token.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q47. Define logical ring.</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> A logical ring is a cyclic arrangement of stations in which each station has a strictly defined predecessor (previous station) and successor (next station) for token handoff.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q48. What is polling?</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> Polling is a centralized controlled-access method where one primary device controls medium access by querying secondary devices one by one to determine if they have data to send.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q49. Differentiate between primary and secondary stations in polling.</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> The <strong>primary station</strong> controls the channel and initiates all communication. <strong>Secondary stations</strong> are client devices that can only transmit or receive when explicitly instructed by the primary.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q50. What is the purpose of a reservation frame?</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> A reservation frame contains minislots for each station, allowing nodes to book upcoming transmission slots and establish an orderly, collision-free data transmission sequence.</p>
        </div>
      </div>
    </div>
  `;
  if (!data["u2-short-answer-questions"].sections.overview.includes("Topic 5 – Collision-Free Protocols Short-Answer")) {
    data["u2-short-answer-questions"].sections.overview += t5ShortQuestions;
  }
}

// 3. Add Medium-Answer & Long-Answer Questions to u2-long-answer-questions
if (data["u2-long-answer-questions"]) {
  const t5LongQuestions = `
    <div class="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
      <h3 class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
        Topic 5 – Collision-Free Protocols Medium &amp; Long-Answer Questions (PDF Section 14)
      </h3>
      <div class="space-y-4 text-xs">
        <!-- Q14: Bit-Map Protocol Working -->
        <div class="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-900 dark:text-white mb-1.5">
            Q14 (5 Marks). Explain the working of the bit-map protocol with a suitable example.
          </p>
          <div class="text-slate-700 dark:text-slate-300 space-y-1 leading-relaxed">
            <p><strong>Answer:</strong> The Bit-Map Protocol operates in two alternating phases: (1) Reservation Phase, and (2) Data Transmission Phase.</p>
            <ul class="list-disc pl-4 space-y-0.5">
              <li><strong>Reservation Phase:</strong> Time is divided into N minislots for N stations. If Station <em>i</em> has a frame, it sets bit <em>i</em> to 1; otherwise 0.</li>
              <li><strong>Data Phase:</strong> Reserving stations transmit their full frames in ascending numerical sequence without collision.</li>
              <li><strong>Example:</strong> In a 5-station network (Stations 0–4), suppose Stations 0, 2, and 4 want to transmit. The reservation bitmap becomes <code>1 0 1 0 1</code>. Stations 0, 2, and 4 transmit sequentially while Stations 1 and 3 stay silent.</li>
              <li><strong>Overhead:</strong> $\\text{Bitmap Size} = N \\text{ bits}$ per epoch. Efficiency under high load = $d / (d+1)$.</li>
            </ul>
          </div>
        </div>

        <!-- Q15: Binary Countdown Working -->
        <div class="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-900 dark:text-white mb-1.5">
            Q15 (5 Marks). Explain the working of binary countdown with an illustrative example.
          </p>
          <div class="text-slate-700 dark:text-slate-300 space-y-1 leading-relaxed">
            <p><strong>Answer:</strong> Binary countdown uses bit-by-bit address competition over an OR-channel where logical 1 dominates logical 0.</p>
            <ul class="list-disc pl-4 space-y-0.5">
              <li>Each station has an $m$-bit address ($2^m \\ge N$). Stations transmit their address bits simultaneously from MSB to LSB.</li>
              <li>If a station transmits a 0 but senses a 1 on the channel, it drops out immediately.</li>
              <li><strong>Example:</strong> Stations A (101), B (110), C (011), D (100) contend. At Bit 1: C transmits 0, senses 1 &rarr; drops out. At Bit 2: A transmits 0, senses 1 &rarr; drops out. At Bit 3: B (110) and D (100) send 0. Final winner is Station B (110 = 6), which transmits its data frame without collision.</li>
              <li>Arbitration overhead is only $\\lceil \\log_2 N \\rceil$ bits.</li>
            </ul>
          </div>
        </div>

        <!-- Q16: Token Passing Protocol -->
        <div class="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-900 dark:text-white mb-1.5">
            Q16 (5 Marks). Describe the working of token passing and explain the 4 physical ring topologies.
          </p>
          <div class="text-slate-700 dark:text-slate-300 space-y-1 leading-relaxed">
            <p><strong>Answer:</strong> Token passing organizes stations in a logical ring where a special control frame (token) circulates sequentially.</p>
            <ul class="list-disc pl-4 space-y-0.5">
              <li>A station waits for the token, captures it, transmits data up to a Token Holding Timer (THT), and then releases the token to its successor.</li>
              <li><strong>4 Physical Topologies (Forouzan Fig 12.16):</strong>
                <ol class="list-decimal pl-4 mt-0.5">
                  <li><strong>Physical Ring:</strong> Point-to-point simplex loop (IEEE 802.5 Token Ring).</li>
                  <li><strong>Dual Ring:</strong> Counter-rotating secondary ring for automatic loopback healing (FDDI).</li>
                  <li><strong>Bus Ring:</strong> Shared linear coaxial bus with logical software ring pointers (IEEE 802.4).</li>
                  <li><strong>Star Ring:</strong> Physical star connected to a central Multistation Access Unit (MAU) with bypass relays.</li>
                </ol>
              </li>
            </ul>
          </div>
        </div>

        <!-- Q17: Polling Protocol (Poll & Select) -->
        <div class="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-900 dark:text-white mb-1.5">
            Q17 (5 Marks). Explain the polling protocol and detail its two primary functions (Poll and Select).
          </p>
          <div class="text-slate-700 dark:text-slate-300 space-y-1 leading-relaxed">
            <p><strong>Answer:</strong> Polling is a centralized controlled-access method where one Primary station controls channel access for all Secondary stations.</p>
            <ul class="list-disc pl-4 space-y-0.5">
              <li><strong>Poll Function (Data Inbound):</strong> Primary asks secondary if it has data. Secondary responds with Data frame (or NAK if empty). Primary returns ACK.</li>
              <li><strong>Select Function (Data Outbound):</strong> Primary sends Select (SEL) frame to verify secondary buffer availability. Secondary returns ACK. Primary sends data frame. Secondary returns ACK.</li>
              <li><strong>Limitations:</strong> Primary station is a processing bottleneck and Single Point of Failure (SPOF). Polling frames create high overhead under light loads.</li>
            </ul>
          </div>
        </div>

        <!-- Q18: Comprehensive Comparison -->
        <div class="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-900 dark:text-white mb-1.5">
            Q18 (10–13 Marks). Comprehensively compare Random Access protocols with Controlled-Access / Collision-Free protocols.
          </p>
          <div class="text-slate-700 dark:text-slate-300 space-y-1 leading-relaxed">
            <p><strong>Answer Structure:</strong></p>
            <ul class="list-disc pl-4 space-y-0.5">
              <li><strong>Philosophy:</strong> Random access stations contend freely (ALOHA, CSMA); collision-free stations coordinate access (Token Passing, Polling, Reservation).</li>
              <li><strong>Collisions:</strong> Possible in random access; completely eliminated during normal operational data transfer in collision-free.</li>
              <li><strong>Predictability:</strong> Random access delay has high variance and is non-deterministic; collision-free delay is strictly bounded ($T_{\\text{max}} = N \\times \\text{THT}$).</li>
              <li><strong>Heavy Traffic Behavior:</strong> Random access collapses due to repeated collisions ($S \\to 0$); collision-free throughput reaches its peak near 100%.</li>
              <li><strong>Light Traffic Behavior:</strong> Random access transmits immediately with zero latency; collision-free wastes time waiting for tokens or reservation epochs.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
  if (!data["u2-long-answer-questions"].sections.overview.includes("Topic 5 – Collision-Free Protocols Medium &amp; Long-Answer")) {
    data["u2-long-answer-questions"].sections.overview += t5LongQuestions;
  }
}

// 4. Add Topic 5 MCQs to u2-mcqs
if (data["u2-mcqs"]) {
  const t5Mcqs = [
    {
      question: "Which protocol uses a reservation bitmap?",
      options: ["ALOHA", "Bit-map protocol", "CSMA/CD", "Token passing"],
      correct: 1,
      explanation: "The Bit-map protocol uses a sequence of dedicated reservation bits (one per station) preceding data transmission."
    },
    {
      question: "In a basic bitmap protocol, a network with 8 stations requires how many reservation bits?",
      options: ["4", "6", "8", "16"],
      correct: 2,
      explanation: "Bitmap size equals the number of stations (N). For 8 stations, exactly 8 reservation bits are required."
    },
    {
      question: "Which protocol uses binary station addresses to decide access?",
      options: ["Binary countdown", "Polling", "ALOHA", "Slotted ALOHA"],
      correct: 0,
      explanation: "Binary countdown has stations transmit their unique binary addresses bit-by-bit from MSB to LSB to determine the winner."
    },
    {
      question: "What gives a station permission to transmit in token passing?",
      options: ["ACK", "Reservation frame", "Token", "IP address"],
      correct: 2,
      explanation: "In token passing, only the station currently holding the special control frame called the token is authorized to transmit."
    },
    {
      question: "In token passing, stations are arranged in a:",
      options: ["Star only", "Logical ring", "Bus only", "Tree"],
      correct: 1,
      explanation: "Regardless of the physical cabling topology, token passing stations are always arranged logically into a ring."
    },
    {
      question: "Which device controls access in polling?",
      options: ["Secondary station", "Router", "Primary station", "Repeater"],
      correct: 2,
      explanation: "In polling, the central Primary Station coordinates and arbitrates channel access for all secondary stations."
    },
    {
      question: "Which polling function asks a secondary station if it has data to send?",
      options: ["Select", "Poll", "Token", "Reserve"],
      correct: 1,
      explanation: "The Poll function queries secondary stations one by one to collect inbound data frames."
    },
    {
      question: "Which polling function prepares a secondary station to receive data?",
      options: ["Select", "Poll", "Countdown", "Bitmap"],
      correct: 0,
      explanation: "The Select (SEL) function alerts a secondary station to verify its readiness before the primary sends data."
    },
    {
      question: "Which protocol uses a special control frame that circulates around stations?",
      options: ["CSMA", "ALOHA", "Token passing", "Binary countdown"],
      correct: 2,
      explanation: "Token passing circulates a unique 3-byte token frame around a logical ring."
    },
    {
      question: "Which is a major disadvantage of polling?",
      options: [
        "No access control",
        "Primary station can become a bottleneck and single point of failure",
        "Always causes collisions",
        "Does not support secondary stations"
      ],
      correct: 1,
      explanation: "The primary station is a central bottleneck that must process all transactions; if it fails, the entire network halts."
    }
  ];

  const existingQuestions = new Set(data["u2-mcqs"].sections.quiz.map(q => q.question));
  t5Mcqs.forEach(q => {
    if (!existingQuestions.has(q.question)) {
      data["u2-mcqs"].sections.quiz.push(q);
    }
  });
}

// =============================================================================
// WRITE UPDATED SYLLABUS DATA BACK TO js/topics_u2_syllabus.js
// =============================================================================
const finalOut = `// topics_u2_syllabus.js - Master Academic Topic Content Repository for Unit 2
// Cleaned: All ASCII symbol art removed. Integrated complete Topic 2, Topic 3, Topic 4, & Topic 5 content.
var TOPICS_U2_SYLLABUS = ` + JSON.stringify(data, null, 2) + `;\n
if (typeof window !== 'undefined') window.TOPICS_U2_SYLLABUS = TOPICS_U2_SYLLABUS;
if (typeof global !== 'undefined') global.TOPICS_U2_SYLLABUS = TOPICS_U2_SYLLABUS;
if (typeof module !== 'undefined' && module.exports) module.exports = TOPICS_U2_SYLLABUS;
`;

fs.writeFileSync(syllabusPath, finalOut, 'utf8');
console.log("Successfully wrote updated js/topics_u2_syllabus.js with comprehensive Topic 5 content!");

