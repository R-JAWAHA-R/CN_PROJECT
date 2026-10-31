// build_topic4_full_content.js
// Integrates comprehensive educational content for Topic 4: Multiple Access Protocols
// from the 23-page PDF into js/topics_u2_syllabus.js and enriches js/cleanDiagramEngine.js.

const fs = require('fs');
const path = require('path');

// 1. Read existing syllabus database
const syllabusPath = path.join(__dirname, '..', 'js', 'topics_u2_syllabus.js');
let rawSyllabus = fs.readFileSync(syllabusPath, 'utf8');

const startIdx = rawSyllabus.indexOf('{');
const endIdx = rawSyllabus.lastIndexOf('};');
const objStr = rawSyllabus.substring(startIdx, endIdx + 1);
let data = eval('(' + objStr + ')');

console.log("Loaded topics_u2_syllabus.js with", Object.keys(data).length, "topics.");

// =============================================================================
// SUBTOPIC 1: u2-multiple-access-intro - Introduction to Multiple Access Protocols
// =============================================================================
data["u2-multiple-access-intro"] = {
  id: "u2-multiple-access-intro",
  title: "Introduction to Multiple Access Protocols",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 4,
  subtopicNumber: 1,
  whyItMatters: "When multiple network nodes connect to a single shared physical channel, simultaneous uncoordinated transmissions destroy frames through collisions. Multiple access protocols establish the fundamental transmission coordination rules that allow stations to share communication media effectively.",
  prerequisitesList: [
    { concept: "MAC Sublayer Architecture", meaning: "Position and role of Layer 2 medium access control" },
    { concept: "Channel Allocation", meaning: "Static vs. dynamic partitioning of channel bandwidth" }
  ],
  learningObjectives: [
    "Define a multiple access protocol and explain why transmission coordination is required.",
    "Categorize multiple access protocols into Forouzan's 3 primary families: Random Access, Controlled Access, and Channelization.",
    "Understand the physical consequences of uncoordinated transmissions and packet collisions.",
    "Trace the evolutionary path from uncoordinated transmission (ALOHA) to carrier sensing (CSMA) and collision handling (CSMA/CD & CSMA/CA)."
  ],
  infobox: {
    layer: "Layer 2 (MAC Sublayer)",
    standard: "IEEE 802 Architecture / Forouzan Chapter 12",
    type: "Protocol Architectural Foundation",
    prerequisites: ["u2-mac-sublayer-intro", "channel-allocation"],
    relatedConcepts: ["u2-random-access-protocols", "u2-pure-aloha", "u2-csma-cd", "u2-csma-ca"],
    compareWith: ["u2-comparison-multiple-access"],
    primaryUses: ["Shared Ethernet, Wi-Fi LANs, satellite links, cellular uplink channels"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Multiple_Access.png",
  imageCaption: "Figure: Taxonomic Hierarchy of Multiple Access Protocols (Behrouz A. Forouzan, Chapter 12).",
  sections: {
    overview: `
      <p>A <strong>multiple access protocol</strong> is a formal set of rules and algorithms that coordinates how multiple computing devices or stations share a common communication channel.</p>
      
      <p>When several stations connect to the same transmission medium (such as a shared coaxial cable, a radio frequency band, or an optical fiber), they require an agreed-upon method to decide when each station can transmit data. Without this coordination, two or more stations will transmit simultaneously, resulting in a <strong>packet collision</strong> that destroys all transmitted data.</p>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">The Three Main Categories of Multiple Access Protocols</h3>
      <p>According to <em>Behrouz A. Forouzan (Data Communications and Networking, 4th Edition, Chapter 12)</em>, all multiple-access protocols are grouped into three primary categories:</p>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
        <div class="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 shadow-sm">
          <div class="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider mb-1">Category 1</div>
          <h4 class="font-extrabold text-sm text-gray-900 dark:text-white mb-1">Random Access Protocols</h4>
          <p class="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
            Contention-based methods where stations have equal access rights and compete for the medium. No station has priority; collisions can occur and are resolved via backoff.
          </p>
          <div class="mt-2 text-[10px] font-mono text-amber-700 dark:text-amber-300">ALOHA, Slotted ALOHA, CSMA, CSMA/CD, CSMA/CA</div>
        </div>

        <div class="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 shadow-sm">
          <div class="text-[10px] font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider mb-1">Category 2</div>
          <h4 class="font-extrabold text-sm text-gray-900 dark:text-white mb-1">Controlled Access Protocols</h4>
          <p class="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
            Stations coordinate explicitly so that only one station holds the right to transmit at any instant, guaranteeing 100% collision-free operation.
          </p>
          <div class="mt-2 text-[10px] font-mono text-blue-700 dark:text-blue-300">Reservation, Polling, Token Passing</div>
        </div>

        <div class="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 shadow-sm">
          <div class="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-1">Category 3</div>
          <h4 class="font-extrabold text-sm text-gray-900 dark:text-white mb-1">Channelization Protocols</h4>
          <p class="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
            The available channel capacity is divided among stations across frequency, time slots, or orthogonal mathematical codes.
          </p>
          <div class="mt-2 text-[10px] font-mono text-emerald-700 dark:text-emerald-300">FDMA, TDMA, CDMA, OFDMA</div>
        </div>
      </div>
    `,
    eli10: "Imagine 10 people in a room who all want to talk through one megaphone: (1) Random access is like letting anyone speak whenever they want, but if two people shout together, they both stop, wait a few seconds, and try again. (2) Controlled access is passing a talking stick around in a circle. (3) Channelization is giving each person their own mini-megaphone on different radio pitches.",
    analogy: "Managing runway access at an international airport: without air traffic control rules (multiple access protocols), planes would attempt to land whenever they arrived, leading to disastrous runway collisions.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Evolution of Random Access Protocols</h3>
      <p>Random access protocols evolved through four major technological breakthroughs to solve channel collisions:</p>
      <ol class="wiki-ordered-list">
        <li><strong>Pure ALOHA (1970):</strong> Stations transmit immediately whenever data is ready. Zero sensing, zero coordination. Vulnerable time is $2T_{fr}$; maximum throughput is only $18.4\%$.</li>
        <li><strong>Slotted ALOHA (1972):</strong> Introduced discrete time slots. Stations can only transmit at slot boundaries, cutting the vulnerable time in half to $1T_{fr}$ and doubling throughput to $36.8\%$.</li>
        <li><strong>Carrier Sense Multiple Access (CSMA):</strong> Introduced the principle of <em>'Listen before you transmit'</em>. Stations check whether the channel is busy before sending, drastically cutting collisions.</li>
        <li><strong>CSMA with Collision Detection (CSMA/CD):</strong> Wired Ethernet enhancement. Stations monitor the cable while transmitting; if a collision occurs, transmission halts immediately, saving wasted channel time.</li>
        <li><strong>CSMA with Collision Avoidance (CSMA/CA):</strong> Wireless LAN (Wi-Fi) standard. Uses interframe spaces (IFS), contention windows, and optional RTS/CTS handshakes to prevent collisions where collision detection is physically impossible.</li>
      </ol>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Comparison of the Three Access Classes</h3>
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Protocol Family</th>
            <th>Collision Probability</th>
            <th>Traffic Suitability</th>
            <th>Central Coordination</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Random Access</strong></td>
            <td>Possible (Handled by backoff)</td>
            <td>Bursty, intermittent data traffic</td>
            <td>None (Distributed autonomous nodes)</td>
          </tr>
          <tr>
            <td><strong>Controlled Access</strong></td>
            <td>Zero (Collision-free)</td>
            <td>High-load, continuous heavy traffic</td>
            <td>Primary polling master or token holder</td>
          </tr>
          <tr>
            <td><strong>Channelization</strong></td>
            <td>Zero (Partitioned channels)</td>
            <td>Predictable continuous streams (voice/video)</td>
            <td>Static setup or base station scheduler</td>
          </tr>
        </tbody>
      </table>
    `,
    workedExamples: {
      level1: "<strong>Question:</strong> What is the primary purpose of a multiple access protocol?<br><br><strong>Answer:</strong> To coordinate access among multiple competing stations sharing a common communication medium, preventing simultaneous transmissions from causing destructive signal collisions.",
      level2: "<strong>Problem:</strong> What are the three broad categories of multiple access protocols identified by Forouzan?<br><br><strong>Answer:</strong> 1. Random access protocols (e.g., ALOHA, CSMA). 2. Controlled access protocols (e.g., polling, token passing). 3. Channelization protocols (e.g., FDMA, TDMA, CDMA).",
      level3: "<strong>Analysis:</strong> Why are random access protocols preferred over channelization for local area computer networks?<br><br><strong>Answer:</strong> Computer traffic is bursty: stations generate traffic in unpredictable bursts and sit idle for long periods. Channelization statically reserves bandwidth that sits empty when nodes are idle. Random access allows any station to utilize the full channel bandwidth on demand without wasting capacity on idle nodes."
    },
    advantagesLimitations: `
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Protocol Class</th>
            <th>Primary Advantage</th>
            <th>Primary Limitation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Random Access</strong></td>
            <td>Simple, decentralized, full bandwidth on demand.</td>
            <td>Collisions under heavy traffic reduce throughput.</td>
          </tr>
          <tr>
            <td><strong>Controlled Access</strong></td>
            <td>Deterministic, collision-free, fair sharing.</td>
            <td>Polling overhead and latency at light loads.</td>
          </tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "Ethernet local area networks (IEEE 802.3).",
      "Wi-Fi wireless local area networks (IEEE 802.11).",
      "Satellite ground station uplinks and cellular random access channels (RACH)."
    ],
    quiz: [
      {
        question: "Which category of multiple access protocols allows stations to transmit without any central controller, where stations compete for the medium and collisions are possible?",
        options: [
          "Random access protocols",
          "Controlled access protocols",
          "Channelization protocols",
          "Circuit switching protocols"
        ],
        correct: 0,
        explanation: "Random access protocols are decentralized, contention-based protocols where stations compete for channel access and collisions can occur."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 12, Section 12.1.", url: "" }
    ]
  }
};

// =============================================================================
// SUBTOPIC 2: u2-random-access-protocols - Random Access Protocols
// =============================================================================
data["u2-random-access-protocols"] = {
  id: "u2-random-access-protocols",
  title: "Random Access Protocols",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 4,
  subtopicNumber: 2,
  whyItMatters: "Random access protocols form the operational basis of Ethernet and Wi-Fi. In these protocols, no station is superior to another; every node has equal transmission rights, creating an egalitarian contention-based network.",
  prerequisitesList: [
    { concept: "u2-multiple-access-intro", meaning: "Introduction and 3 families of multiple access" },
    { concept: "Contention", meaning: "Competition between nodes to capture the shared medium" }
  ],
  learningObjectives: [
    "Define random access protocols and explain why they are termed contention-based.",
    "Enumerate the 6 core characteristics of random access communication.",
    "Identify the 4 major protocol types: ALOHA, CSMA, CSMA/CD, and CSMA/CA.",
    "Understand the trade-off between decentralized transmission freedom and collision probability."
  ],
  infobox: {
    layer: "Layer 2 (MAC Sublayer)",
    standard: "IEEE 802.3 / IEEE 802.11 / RFC 895",
    type: "Contention-Based Access Architecture",
    prerequisites: ["u2-multiple-access-intro"],
    relatedConcepts: ["u2-pure-aloha", "u2-slotted-aloha", "u2-csma-1-persistent", "u2-csma-cd"],
    compareWith: ["u2-multiple-access-intro", "u2-comparison-multiple-access"],
    primaryUses: ["Local Area Networks (Ethernet/Wi-Fi), wireless sensor ad-hoc networks"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/35/Pure_ALOHA1.svg",
  imageCaption: "Figure: Random Access Contention: Stations Competing for the Shared Channel (Behrouz A. Forouzan).",
  sections: {
    overview: `
      <p>A <strong>random access protocol</strong> (also known as a <strong>contention-based protocol</strong>) is a multiple-access method in which every station connected to the shared medium has an equal opportunity to access and transmit data.</p>
      
      <p>According to <em>Behrouz A. Forouzan (Section 12.1)</em>, no single station has permanent or privileged control over the channel. There is no master station or central arbiter deciding who transmits next. Instead, each individual station autonomously decides whether and when to transmit by executing the mathematical rules of the protocol.</p>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">The Six Fundamental Characteristics of Random Access</h3>
      <ol class="wiki-ordered-list">
        <li><strong>Equal Access Rights:</strong> Every station on the network has equal transmission rights and priority; no node is privileged over another.</li>
        <li><strong>Zero Central Controller:</strong> No master computer, coordinator, or centralized clock arbiter is required to grant transmission tokens.</li>
        <li><strong>On-Demand Transmission:</strong> Stations transmit when they have pending data from Layer 3, following the protocol's specific sensing or timing rules.</li>
        <li><strong>Simultaneous Transmission Possibility:</strong> Because stations act independently, two or more stations may transmit at overlapping times.</li>
        <li><strong>Vulnerability to Collisions:</strong> Overlapping transmissions create electrical or electromagnetic interference, causing packet collisions.</li>
        <li><strong>Collision Recovery Techniques:</strong> Each protocol employs specific mechanisms (such as carrier sensing, collision detection, jam signals, or randomized backoff) to detect, avoid, or recover from collisions.</li>
      </ol>
    `,
    eli10: "Imagine an open playground with a soccer ball. Any kid can run up and kick the ball whenever they want. Nobody is the boss. But if two kids run up and kick the ball at the exact same moment, they bump into each other! They both take a step back, count to three, and try again.",
    analogy: "Unregulated conversation at a dinner party: anyone can speak when they have something to say, but if two people speak at the same time, they pause and let one person continue.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">The Four Canonical Types of Random Access Protocols</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3">
        <div class="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div class="font-bold text-amber-600 dark:text-amber-400 text-xs mb-1">1. ALOHA (Pure & Slotted)</div>
          <p class="text-[11px] text-slate-600 dark:text-slate-300">
            Transmit without sensing the channel. Pure ALOHA transmits at any time; Slotted ALOHA restricts transmissions to discrete time slot boundaries.
          </p>
        </div>
        <div class="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div class="font-bold text-blue-600 dark:text-blue-400 text-xs mb-1">2. CSMA (Carrier Sense Multiple Access)</div>
          <p class="text-[11px] text-slate-600 dark:text-slate-300">
            'Listen before talk': stations sense the channel first. Includes 1-persistent, non-persistent, and p-persistent transmission strategies.
          </p>
        </div>
        <div class="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div class="font-bold text-emerald-600 dark:text-emerald-400 text-xs mb-1">3. CSMA/CD (Collision Detection)</div>
          <p class="text-[11px] text-slate-600 dark:text-slate-300">
            'Listen while talk': transmitting station detects collisions, aborts immediately, sends jam signal, and executes binary exponential backoff.
          </p>
        </div>
        <div class="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div class="font-bold text-purple-600 dark:text-purple-400 text-xs mb-1">4. CSMA/CA (Collision Avoidance)</div>
          <p class="text-[11px] text-slate-600 dark:text-slate-300">
            'Avoid collisions before talk': used in wireless networks using Interframe Spaces (IFS), Contention Windows, and acknowledgements.
          </p>
        </div>
      </div>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Throughput Comparison Curve</h3>
      <p>As the normalized channel load $G$ (average frames generated per frame time) increases, throughput $S$ initially rises, reaches a theoretical peak, and then degrades due to collision saturation:</p>
      <ul class="wiki-bullet-list">
        <li><strong>Pure ALOHA Peak:</strong> $S_{\\text{max}} = 18.4\\%$ at $G = 0.5$.</li>
        <li><strong>Slotted ALOHA Peak:</strong> $S_{\\text{max}} = 36.8\\%$ at $G = 1.0$.</li>
        <li><strong>1-Persistent CSMA Peak:</strong> $S_{\\text{max}} \\approx 53\\%$.</li>
        <li><strong>Non-Persistent CSMA Peak:</strong> $S_{\\text{max}} \\approx 85\\%$ (under optimal load).</li>
        <li><strong>CSMA/CD Peak:</strong> Approaches $90\\text{--}95\\%$ when $a = t_{\\text{prop}} / t_{\\text{tx}} \\ll 1$.</li>
      </ul>
    `,
    workedExamples: {
      level1: "<strong>Question:</strong> Why are random access protocols also called contention-based protocols?<br><br><strong>Answer:</strong> Because stations compete ('contend') with one another to access and use the shared transmission medium, with no station having predefined permission or master control.",
      level2: "<strong>Problem:</strong> What is the main cause of collisions in random access protocols?<br><br><strong>Answer:</strong> The decentralized nature of transmission: since stations decide independently when to transmit without central coordination, two or more stations frequently begin transmitting at overlapping times, creating destructive signal interference.",
      level3: "<strong>Analysis:</strong> Why does throughput drop toward zero in pure contention systems when traffic load becomes very heavy?<br><br><strong>Answer:</strong> Under heavy traffic, virtually every transmission collides with another station's frame. Collisions trigger retransmissions, which add even more traffic to an already congested channel, causing a vicious cycle where 100% of channel time is wasted on corrupted colliding signals."
    },
    advantagesLimitations: `
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Advantages</th>
            <th>Disadvantages</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Zero centralized single point of failure.</td>
            <td>Collisions waste channel bandwidth and power.</td>
          </tr>
          <tr>
            <td>Minimal latency under light network load.</td>
            <td>Unpredictable delays under heavy network load.</td>
          </tr>
          <tr>
            <td>Extremely simple station deployment (plug-and-play).</td>
            <td>Throughput collapses without backoff control.</td>
          </tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "Traditional half-duplex Ethernet (IEEE 802.3).",
      "Modern Wi-Fi radio access (IEEE 802.11).",
      "Cellular initial access channels (LTE/5G RACH)."
    ],
    quiz: [
      {
        question: "In random access protocols, how is channel access coordinated?",
        options: [
          "Stations compete for access according to protocol rules; no central controller is required",
          "A central router polls each station in turn",
          "Stations pass a physical electronic token in a circle",
          "Each station is permanently assigned a unique frequency band"
        ],
        correct: 0,
        explanation: "Random access protocols are decentralized; stations autonomously follow protocol rules to compete for channel access without a central controller."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 12, Section 12.1.", url: "" }
    ]
  }
};

// =============================================================================
// SUBTOPIC 3: u2-pure-aloha - Pure ALOHA
// =============================================================================
data["u2-pure-aloha"] = {
  id: "u2-pure-aloha",
  title: "Pure ALOHA Protocol",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 4,
  subtopicNumber: 3,
  whyItMatters: "Pure ALOHA was the pioneering random access protocol developed at the University of Hawaii in 1970. It proved that packet radio broadcasting was viable, establishing the mathematical foundations of modern contention protocols.",
  prerequisitesList: [
    { concept: "u2-random-access-protocols", meaning: "Contention and collisions in random access" },
    { concept: "Frame Transmission Time (Tfr)", meaning: "Time required to inject all bits of a frame onto the physical medium" }
  ],
  learningObjectives: [
    "Define Pure ALOHA and trace its 6-step operational workflow.",
    "Derive the vulnerable time formula $\\text{Vulnerable Time} = 2T_{fr}$ with clear explanation.",
    "Master the throughput equation $S = G e^{-2G}$ and prove that $S_{\\text{max}} = 1/(2e) \\approx 18.4\\%$ at $G = 0.5$.",
    "Solve numerical problems calculating throughput and vulnerable durations."
  ],
  infobox: {
    layer: "Layer 2 (MAC Sublayer)",
    standard: "University of Hawaii (1970) / Historical Milestone",
    type: "Continuous-Time Contention Protocol",
    prerequisites: ["u2-multiple-access-intro", "u2-random-access-protocols"],
    relatedConcepts: ["u2-slotted-aloha", "u2-csma-1-persistent"],
    compareWith: ["u2-slotted-aloha"],
    primaryUses: ["Pioneering inter-island packet radio, satellite random access channels, RFID tags"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/35/Pure_ALOHA1.svg",
  imageCaption: "Figure: Pure ALOHA Transmission Timeline showing Frame Collisions and Vulnerable Period of 2Tfr.",
  sections: {
    overview: `
      <p><strong>Pure ALOHA</strong> is the original, continuous-time random access protocol developed by Norman Abramson and colleagues at the University of Hawaii in 1970 to interconnect computer terminals across the Hawaiian islands via wireless radio broadcasts.</p>
      
      <p>The core philosophy of Pure ALOHA is absolute transmission freedom: <strong>a station transmits data whenever it has a frame ready to send</strong>. There are no fixed time slots, and stations do not check whether the communication channel is free before transmitting.</p>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Step-by-Step Working Principle</h3>
      <ol class="wiki-ordered-list">
        <li>A station receives a network-layer packet and formats a frame.</li>
        <li>The station immediately transmits the frame onto the shared channel.</li>
        <li>If another station transmits during an overlapping time window, a collision occurs and all overlapping frames are corrupted.</li>
        <li>The receiving station validates the frame checksum; if valid, it returns an Acknowledgement (ACK).</li>
        <li>If the transmitting station does not receive an ACK within a designated timeout period, it assumes the frame was destroyed in a collision.</li>
        <li>The sender waits for a randomized <strong>backoff period</strong> and retransmits the frame to prevent colliding again.</li>
      </ol>
    `,
    eli10: "Imagine you want to yell a secret across a playground. In Pure ALOHA, you just yell whenever you feel like it! If nobody else was yelling at the same time, your friend hears it. But if someone else started yelling even one second before or after you, both voices mix together and nobody understands anything.",
    analogy: "Mailing a postcard without checking if the post office truck is already full: you drop it in the box anytime. If it gets lost in a storm, you wait a random number of days and drop in another copy.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Vulnerable Time in Pure ALOHA ($2T_{fr}$)</h3>
      <p>The <strong>vulnerable time</strong> is the continuous time window during which any other station's transmission will collide with and destroy the frame under consideration.</p>
      
      <p>Let $T_{fr}$ be the frame transmission time (the duration required to transmit one full frame). Suppose Station A begins transmitting a frame at time $t$:</p>
      <div class="p-4 bg-amber-50 dark:bg-amber-950/40 border-l-4 border-amber-500 rounded-r text-xs space-y-2">
        <p><strong>1. Collision with an earlier frame:</strong> If any other station began transmitting between $t - T_{fr}$ and $t$, the end of that earlier frame will collide with the beginning of Station A's frame.</p>
        <p><strong>2. Collision with a later frame:</strong> If any other station begins transmitting between $t$ and $t + T_{fr}$, the beginning of that later frame will collide with the end of Station A's frame.</p>
        <p class="font-bold text-amber-900 dark:text-amber-200 text-sm">
          $$\\text{Vulnerable Time} = (t + T_{fr}) - (t - T_{fr}) = 2 T_{fr}$$
        </p>
      </div>
      <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">To transmit successfully in Pure ALOHA, the shared channel must remain completely free of any other transmissions for a total duration of <strong>two complete frame times</strong> ($2T_{fr}$).</p>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Throughput Mathematical Derivation</h3>
      <p>Assuming frame generation follows a Poisson distribution with average arrival rate of $G$ frames per frame time (including retransmissions):</p>
      <div class="p-3 my-2 bg-slate-100 dark:bg-slate-800 rounded font-mono text-xs text-center">
        $$S = G \\cdot P(\\text{zero frames generated during vulnerable interval } 2T_{fr}) = G \\cdot e^{-2G}$$
      </div>
      <p>To find the maximum throughput, we take the derivative with respect to $G$ and set it to zero:</p>
      <div class="p-3 my-2 bg-slate-100 dark:bg-slate-800 rounded font-mono text-xs text-center">
        $$\\frac{dS}{dG} = e^{-2G} - 2G e^{-2G} = 0 \\implies 1 - 2G = 0 \\implies G = 0.5$$
      </div>
      <p>Substituting $G = 0.5$ into the throughput equation yields:</p>
      <div class="p-3 my-2 bg-slate-100 dark:bg-slate-800 rounded font-mono text-xs text-center">
        $$S_{\\text{max}} = 0.5 \\cdot e^{-2(0.5)} = 0.5 \\cdot e^{-1} = \\frac{1}{2e} \\approx 0.1839 = 18.4\\%$$
      </div>
      <p class="text-xs text-gray-700 dark:text-gray-300 font-bold text-center">The maximum theoretical channel efficiency of Pure ALOHA is exactly 18.4%!</p>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Pure ALOHA Performance Parameters</h3>
      <table class="wiki-table">
        <thead><tr><th>Parameter</th><th>Mathematical Expression</th><th>Numerical Value</th></tr></thead>
        <tbody>
          <tr><td>Vulnerable Time</td><td>$2 T_{fr}$</td><td>Twice the frame duration</td></tr>
          <tr><td>Throughput Equation</td><td>$S = G e^{-2G}$</td><td>Nonlinear Poisson throughput</td></tr>
          <tr><td>Optimal Offered Load ($G$)</td><td>$G = 0.5$</td><td>0.5 frames generated per frame time</td></tr>
          <tr><td>Maximum Throughput ($S_{\\text{max}}$)</td><td>$S = 1 / (2e)$</td><td>18.4% channel capacity</td></tr>
        </tbody>
      </table>
    `,
    workedExamples: {
      level1: "<strong>Numerical Problem 1 (From PDF Section 12.2):</strong> Calculate the throughput of a Pure ALOHA system when the offered load is $G = 0.5$.<br><br><strong>Given:</strong> $G = 0.5$.<br><strong>Formula:</strong> $S = G e^{-2G}$.<br><strong>Calculation:</strong><br>$S = 0.5 \\cdot e^{-2(0.5)} = 0.5 \\cdot e^{-1} = 0.5 \\times 0.367879 = 0.1839$.<br><strong>Answer:</strong> 18.39% (or 18.4%) throughput.",
      level2: "<strong>Numerical Problem 3 (From PDF Section 12.4):</strong> A network transmits frames that require 2 milliseconds each ($T_{fr} = 2\\text{ ms}$). Find the vulnerable time for Pure ALOHA.<br><br><strong>Given:</strong> $T_{fr} = 2\\text{ ms}$.<br><strong>Formula:</strong> $\\text{Vulnerable Time} = 2 T_{fr}$.<br><strong>Calculation:</strong> $2 \\times 2\\text{ ms} = 4\\text{ ms}$.<br><strong>Answer:</strong> 4 milliseconds.",
      level3: "<strong>Analysis:</strong> Suppose a Pure ALOHA channel operates at 100 kbps with 1000-bit frames. If the network generates 25 frames per second, what is the throughput?<br><br><strong>Answer:</strong><br>Frame transmission time: $T_{fr} = \\frac{1000\\text{ bits}}{100,000\\text{ bps}} = 0.01\\text{ s}$.<br>Offered load: $G = 25 \\times 0.01 = 0.25$ frames per frame time.<br>Throughput: $S = G e^{-2G} = 0.25 \\cdot e^{-2(0.25)} = 0.25 \\cdot e^{-0.5} = 0.25 \\times 0.6065 = 0.1516 = 15.16\\%$.<br>Usable bit rate = $15.16\\% \\times 100\\text{ kbps} = 15.16\\text{ kbps}$. Over 84% of capacity is lost to collisions or idle time."
    },
    advantagesLimitations: `
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Advantages</th>
            <th>Disadvantages</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Extremely simple to understand and implement in hardware.</td>
            <td>Abysmal channel efficiency: over 81.6% of bandwidth wasted.</td>
          </tr>
          <tr>
            <td>Zero clock synchronization required between stations.</td>
            <td>High probability of collisions even under moderate traffic.</td>
          </tr>
          <tr>
            <td>Stations transmit immediately without waiting for slots.</td>
            <td>Throughput collapses to near zero when $G > 1$.</td>
          </tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "Original University of Hawaii packet radio network (ALOHANET).",
      "Low-frequency RFID tag identification systems.",
      "Emergency marine satellite transponders (EPIRB)."
    ],
    quiz: [
      {
        question: "What is the vulnerable time of the Pure ALOHA protocol for a frame transmission time $T_{fr}$?",
        options: [
          "$2 T_{fr}$",
          "$T_{fr}$",
          "$T_p$",
          "$4 T_{fr}$"
        ],
        correct: 0,
        explanation: "In Pure ALOHA, a frame collides if any other frame begins transmission between $t - T_{fr}$ and $t + T_{fr}$, yielding a vulnerable time of $2T_{fr}$."
      },
      {
        question: "What is the maximum theoretical channel throughput of Pure ALOHA?",
        options: [
          "18.4%",
          "36.8%",
          "50.0%",
          "100.0%"
        ],
        correct: 0,
        explanation: "The maximum throughput of Pure ALOHA is $S_{\\text{max}} = \\frac{1}{2e} \\approx 18.4\\%$, occurring at an offered load of $G = 0.5$."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 12, Section 12.1.1 (Pure ALOHA).", url: "" }
    ]
  }
};

// =============================================================================
// SUBTOPIC 4: u2-slotted-aloha - Slotted ALOHA
// =============================================================================
data["u2-slotted-aloha"] = {
  id: "u2-slotted-aloha",
  title: "Slotted ALOHA Protocol",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 4,
  subtopicNumber: 4,
  whyItMatters: "Slotted ALOHA introduced discrete time discretization to random access. By restricting frame transmissions strictly to slot boundaries, it cut the collision window in half and doubled maximum throughput from 18.4% to 36.8%.",
  prerequisitesList: [
    { concept: "u2-pure-aloha", meaning: "Pure ALOHA operation and 2Tfr vulnerable time" },
    { concept: "Time Discretization", meaning: "Dividing continuous time into synchronized discrete slots" }
  ],
  learningObjectives: [
    "Define Slotted ALOHA and explain how slot boundary synchronization works.",
    "Explain why the vulnerable time is reduced to exactly $1 T_{fr}$.",
    "Derive the throughput equation $S = G e^{-G}$ and prove that $S_{\\text{max}} = 1/e \\approx 36.8\\%$ at $G = 1.0$.",
    "Compare Pure ALOHA and Slotted ALOHA across 6 technical dimensions."
  ],
  infobox: {
    layer: "Layer 2 (MAC Sublayer)",
    standard: "Roberts (1972) / IEEE Satellite & Wireless Standards",
    type: "Synchronous Time-Slotted Contention Protocol",
    prerequisites: ["u2-pure-aloha"],
    relatedConcepts: ["u2-pure-aloha", "u2-csma-p-persistent"],
    compareWith: ["u2-pure-aloha"],
    primaryUses: ["Satellite uplink reservation channels, cellular GSM RACH random access slots"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Slotted_ALOHA.svg",
  imageCaption: "Figure: Slotted ALOHA Synchronized Discrete Time Slots cutting Vulnerable Time to Tfr.",
  sections: {
    overview: `
      <p><strong>Slotted ALOHA</strong> was invented in 1972 by Lawrence Roberts as an enhancement to Pure ALOHA to overcome its high collision probability and low channel efficiency.</p>
      
      <p>In Slotted ALOHA, continuous channel time is divided into <strong>discrete, equal-sized time slots</strong>, each having a duration exactly equal to the frame transmission time $T_{fr}$. A station is permitted to transmit <strong>only at the beginning of a time slot</strong>. If a station generates a frame in the middle of a slot, it must wait and buffer the frame until the next slot boundary.</p>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Step-by-Step Working Principle</h3>
      <ol class="wiki-ordered-list">
        <li>Time on the communication channel is divided into synchronized time slots of duration $T_{fr}$.</li>
        <li>All transmitting stations maintain clock synchronization (e.g., via periodic central clock beacons).</li>
        <li>When a station has a frame ready, it buffers the frame and waits for the beginning of the next time slot.</li>
        <li>At the exact slot boundary, the station transmits its complete frame during that slot.</li>
        <li>If only one station transmits in a slot, the frame is delivered successfully.</li>
        <li>If two or more stations transmit in the same slot, a collision occurs across the entire slot; all stations detect collision and wait a random number of slots before retrying.</li>
      </ol>
    `,
    eli10: "Imagine students submitting tests to a teacher. In Pure ALOHA, students walk up to the teacher's desk whenever they want, causing huge pile-ups. In Slotted ALOHA, a school bell rings every 5 minutes: students can only walk up when the bell rings! If two students stand up on the same bell, they collide, but nobody collides between the bells.",
    analogy: "A synchronized subway turnstile that only unlocks on the exact strike of the minute: passengers can only step through on the minute mark, preventing people from jamming the door halfway through.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Vulnerable Time in Slotted ALOHA ($1T_{fr}$)</h3>
      <p>Because frames are forced to transmit strictly at slot boundaries, partial frame overlaps are physically impossible:</p>
      <div class="p-4 bg-emerald-50 dark:bg-emerald-950/40 border-l-4 border-emerald-500 rounded-r text-xs space-y-2">
        <p>A frame transmitted in Slot $k$ can only collide with other frames transmitted in that <strong>exact same slot</strong>.</p>
        <p>Therefore, a collision occurs if and only if another station generates a frame during the immediately preceding slot interval of duration $T_{fr}$.</p>
        <p class="font-bold text-emerald-900 dark:text-emerald-200 text-sm">
          $$\\text{Vulnerable Time} = T_{fr}$$
        </p>
      </div>
      <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">Notice that the vulnerable time of Slotted ALOHA is exactly <strong>half</strong> that of Pure ALOHA ($T_{fr}$ vs. $2T_{fr}$).</p>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Throughput Mathematical Derivation</h3>
      <p>With a vulnerable time of $T_{fr}$, the probability that zero other frames are transmitted in the same slot is $P(0) = e^{-G}$. Therefore, the throughput equation is:</p>
      <div class="p-3 my-2 bg-slate-100 dark:bg-slate-800 rounded font-mono text-xs text-center">
        $$S = G \\cdot e^{-G}$$
      </div>
      <p>Taking the derivative and finding the maximum:</p>
      <div class="p-3 my-2 bg-slate-100 dark:bg-slate-800 rounded font-mono text-xs text-center">
        $$\\frac{dS}{dG} = e^{-G} - G e^{-G} = 0 \\implies 1 - G = 0 \\implies G = 1.0$$
      </div>
      <p>Substituting $G = 1.0$ into the equation:</p>
      <div class="p-3 my-2 bg-slate-100 dark:bg-slate-800 rounded font-mono text-xs text-center">
        $$S_{\\text{max}} = 1.0 \\cdot e^{-1} = \\frac{1}{e} \\approx 0.367879 = 36.8\\%$$
      </div>
      <div class="wiki-callout note mt-3">
        <div class="callout-header font-bold text-blue-800 dark:text-blue-300">💡 Important University Exam Takeaway</div>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">Slotted ALOHA achieves exactly <strong>twice</strong> the maximum theoretical throughput of Pure ALOHA ($36.8\\%$ vs. $18.4\\%$) by eliminating partial frame overlaps through slot synchronization!</p>
      </div>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Master Comparison: Pure ALOHA vs. Slotted ALOHA (PDF Section 6)</h3>
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Comparative Feature</th>
            <th>Pure ALOHA</th>
            <th>Slotted ALOHA</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Transmission Timing</strong></td>
            <td>Any continuous time instant</td>
            <td>Strictly at the beginning of a time slot</td>
          </tr>
          <tr>
            <td><strong>Clock Synchronization</strong></td>
            <td>Not required (Asynchronous)</td>
            <td>Strictly required across all nodes</td>
          </tr>
          <tr>
            <td><strong>Vulnerable Time</strong></td>
            <td>$2 T_{fr}$</td>
            <td>$T_{fr}$ (Half of Pure ALOHA)</td>
          </tr>
          <tr>
            <td><strong>Throughput Equation</strong></td>
            <td>$S = G e^{-2G}$</td>
            <td>$S = G e^{-G}$</td>
          </tr>
          <tr>
            <td><strong>Optimal Load ($G$)</strong></td>
            <td>$G = 0.5$</td>
            <td>$G = 1.0$</td>
          </tr>
          <tr>
            <td><strong>Maximum Throughput</strong></td>
            <td>$18.4\\%$ ($\\frac{1}{2e}$)</td>
            <td>$36.8\\%$ ($\\frac{1}{e}$) — <strong>Doubled!</strong></td>
          </tr>
          <tr>
            <td><strong>Collision Overlap</strong></td>
            <td>Partial or complete overlap</td>
            <td>Complete slot overlap only</td>
          </tr>
          <tr>
            <td><strong>Implementation Complexity</strong></td>
            <td>Very simple</td>
            <td>Moderate (Requires slot clock recovery)</td>
          </tr>
        </tbody>
      </table>
    `,
    workedExamples: {
      level1: "<strong>Numerical Problem 2 (From PDF Section 12.3):</strong> Calculate the throughput of Slotted ALOHA when the offered load is $G = 1.0$.<br><br><strong>Given:</strong> $G = 1.0$.<br><strong>Formula:</strong> $S = G e^{-G}$.<br><strong>Calculation:</strong><br>$S = 1.0 \\cdot e^{-1} = 0.367879 = 36.79\\%$.<br><strong>Answer:</strong> 36.79% (or 36.8%) throughput.",
      level2: "<strong>Numerical Problem 3b (From PDF Section 12.4):</strong> A network transmits frames requiring $2\\text{ ms}$. Compare the vulnerable times of Pure ALOHA and Slotted ALOHA.<br><br><strong>Given:</strong> $T_{fr} = 2\\text{ ms}$.<br>• Pure ALOHA: $2 T_{fr} = 2 \\times 2 = 4\\text{ ms}$.<br>• Slotted ALOHA: $T_{fr} = 2\\text{ ms}$.<br><strong>Answer:</strong> Pure = 4 ms; Slotted = 2 ms.",
      level3: "<strong>Analysis:</strong> A Slotted ALOHA channel has 200 slots per second. If the channel carries an average of 100 new frames per second and 50 retransmitted frames per second, what is the throughput?<br><br><strong>Answer:</strong><br>Total attempts per second: $100 + 50 = 150$ attempts/sec.<br>Offered load per slot: $G = \\frac{150}{200} = 0.75$.<br>Throughput: $S = G e^{-G} = 0.75 \\cdot e^{-0.75} = 0.75 \\times 0.47237 = 0.3543 = 35.43\\%$.<br>Successful frames delivered per second = $0.3543 \\times 200 = 70.86$ frames/sec."
    },
    advantagesLimitations: `
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Advantages</th>
            <th>Disadvantages</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Twice the maximum capacity of Pure ALOHA ($36.8\\%$ vs. $18.4\\%$).</td>
            <td>Requires strict slot clock synchronization among all nodes.</td>
          </tr>
          <tr>
            <td>Reduced collision window: vulnerable time cut by $50\\%$.</td>
            <td>Collisions still occur when two nodes pick the same slot.</td>
          </tr>
          <tr>
            <td>Eliminates partial frame corruptions.</td>
            <td>Stations must wait for slot boundaries, introducing minor delay.</td>
          </tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "Satellite reservation uplinks (DVB-RCS return channels).",
      "Cellular GSM Random Access Channel (RACH) for phone call initiation.",
      "Commercial packet radio telemetry."
    ],
    quiz: [
      {
        question: "Why does Slotted ALOHA achieve twice the maximum throughput of Pure ALOHA?",
        options: [
          "Because its vulnerable time is reduced from $2T_{fr}$ to $1T_{fr}$, eliminating partial frame collisions",
          "Because it doubles the physical transmission speed of the wire",
          "Because stations sense the channel before transmitting",
          "Because it uses CRC error-correcting codes"
        ],
        correct: 0,
        explanation: "By enforcing transmissions to start strictly at slot boundaries, partial frame overlaps are eliminated, cutting the vulnerable time from $2T_{fr}$ to $T_{fr}$ and doubling throughput to 36.8%."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 12, Section 12.1.1 (Slotted ALOHA).", url: "" }
    ]
  }
};

// =============================================================================
// SUBTOPIC 5: u2-csma-1-persistent - 1-Persistent CSMA
// =============================================================================
data["u2-csma-1-persistent"] = {
  id: "u2-csma-1-persistent",
  title: "1-Persistent CSMA",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 4,
  subtopicNumber: 5,
  whyItMatters: "CSMA introduced the revolutionary principle of 'Listen before talk'. In 1-Persistent CSMA, a station transmits with probability 1 the instant an idle channel is detected, maximizing speed on lightly loaded networks.",
  prerequisitesList: [
    { concept: "Carrier Sensing", meaning: "Listening to the medium to detect electrical or RF energy" },
    { concept: "Propagation Delay (Tp)", meaning: "Time taken for a signal to physically travel between distant stations" }
  ],
  learningObjectives: [
    "Define Carrier Sense Multiple Access (CSMA) and explain its core principle: 'Listen before you transmit'.",
    "Explain why collisions can still occur in CSMA due to finite signal propagation delay ($T_p$).",
    "Trace the operational algorithm of 1-Persistent CSMA.",
    "Evaluate the vulnerability of 1-Persistent CSMA to simultaneous transmission collisions when a busy channel clears."
  ],
  infobox: {
    layer: "Layer 2 (MAC Sublayer)",
    standard: "IEEE 802.3 Foundation / Kleinrock & Tobagi (1975)",
    type: "Continuous Sensing Contention Protocol",
    prerequisites: ["u2-random-access-protocols", "u2-pure-aloha"],
    relatedConcepts: ["u2-csma-non-persistent", "u2-csma-p-persistent", "u2-csma-cd"],
    compareWith: ["u2-csma-non-persistent", "u2-csma-p-persistent"],
    primaryUses: ["Lightly loaded bus LANs, legacy Ethernet base access"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ab/1-persistent_CSMA%E2%81%84CD_collision.png",
  imageCaption: "Figure: 1-Persistent CSMA Channel Sensing and Immediate Transmission State (Behrouz A. Forouzan).",
  sections: {
    overview: `
      <p><strong>Carrier Sense Multiple Access (CSMA)</strong> is a family of contention protocols based on the fundamental principle of <strong>'Listen before you transmit'</strong>.</p>
      
      <p>In both Pure ALOHA and Slotted ALOHA, stations transmit blindly without checking the channel status. CSMA greatly reduces collisions by requiring every station to sense whether the medium is currently idle or busy before injecting a frame.</p>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Definition of 1-Persistent CSMA</h3>
      <p>In <strong>1-Persistent CSMA</strong>, a station that has a frame ready to transmit continuously monitors the channel. The term <em>'1-persistent'</em> means that as soon as the station detects that the channel has become idle, it transmits immediately with a <strong>probability of 1 (100% certainty)</strong>.</p>
      
      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Step-by-Step Working Principle</h3>
      <ol class="wiki-ordered-list">
        <li>The station has a frame ready for transmission.</li>
        <li>It senses the communication channel for carrier activity.</li>
        <li><strong>If the channel is idle:</strong> The station transmits immediately (probability = 1).</li>
        <li><strong>If the channel is busy:</strong> The station does not back off; it continues sensing the channel continuously.</li>
        <li>The microsecond the active transmission ends and the channel becomes idle, the station transmits immediately.</li>
      </ol>
    `,
    eli10: "Imagine two polite people waiting to speak to a doctor. In 1-Persistent CSMA, both people stand right outside the doctor's door listening intently. The instant the doctor finishes saying goodbye to the current patient, both people burst through the door at the exact same fraction of a second and bump heads!",
    analogy: "Drivers waiting at a red traffic light who slam on the gas pedal the millisecond the light turns green: if two cars are side by side trying to merge into one lane, they crash immediately.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Why Collisions Still Occur in CSMA: The Propagation Delay Factor ($T_p$)</h3>
      <p>Even though CSMA stations listen before transmitting, collisions cannot be completely eliminated. The fundamental physical reason is <strong>finite signal propagation delay ($T_p$)</strong>:</p>
      <div class="p-4 bg-amber-50 dark:bg-amber-950/40 border-l-4 border-amber-500 rounded-r text-xs space-y-2">
        <p>1. Suppose Station A and Station B are at opposite ends of a 1 km cable. Signals travel down copper at roughly $200,000\\text{ km/s}$, so one-way propagation delay $T_p = 5\\ \\mu\\text{s}$.</p>
        <p>2. At time $t = 0$, Station A senses the channel, finds it idle, and begins transmitting.</p>
        <p>3. At time $t = 3\\ \\mu\\text{s}$, Station A's electrical signal has only traveled 600 meters; it has not yet reached Station B.</p>
        <p>4. At $t = 3\\ \\mu\\text{s}$, Station B has a frame to send. It senses the channel. Because Station A's signal has not yet arrived, Station B detects the channel as <strong>idle</strong>!</p>
        <p>5. Station B begins transmitting. At $t = 4\\ \\mu\\text{s}$, the two signals collide in the middle of the cable!</p>
      </div>
      <p class="text-xs text-gray-600 dark:text-gray-400 mt-2"><strong>Vulnerable Time in CSMA:</strong> The vulnerable time in CSMA is equal to the maximum one-way propagation delay: $\\text{Vulnerable Time} = T_p$. This is vastly shorter than Pure ALOHA's $2T_{fr}$, explaining CSMA's much higher efficiency.</p>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">The 1-Persistent Flaw Under Heavy Traffic</h3>
      <p>If Station X is transmitting a long frame, other stations (e.g., Station Y and Station Z) may generate frames and start sensing. Both see the channel is busy. In 1-persistent CSMA, both Y and Z wait and continuously monitor. The moment Station X finishes, both Y and Z detect idle at the exact same instant, both transmit with probability 1, and <strong>a collision is guaranteed 100% of the time</strong>!</p>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">1-Persistent Algorithm State Machine</h3>
      <div class="p-3 bg-gray-900 text-gray-100 rounded font-mono text-xs">
        <p class="text-emerald-400">// 1-Persistent CSMA Logic</p>
        <p>while (channel == BUSY) {</p>
        <p class="pl-4 text-slate-400">// Keep sensing continuously (100% persistence)</p>
        <p>}</p>
        <p class="text-blue-400">transmitFrame(); // Transmit with probability P = 1</p>
      </div>
    `,
    workedExamples: {
      level1: "<strong>Question:</strong> What is the core rule of 1-persistent CSMA when a station senses that the channel is busy?<br><br><strong>Answer:</strong> The station continuously monitors and listens to the channel until it becomes idle, and then transmits immediately with probability 1.",
      level2: "<strong>Problem:</strong> Why does 1-persistent CSMA have a high collision probability under heavy traffic loads?<br><br><strong>Answer:</strong> While one station is transmitting, multiple waiting stations will generate data and start sensing. All of them wait for the transmission to finish. The instant the channel clears, all waiting stations transmit simultaneously with probability 1, causing an immediate collision.",
      level3: "<strong>Analysis:</strong> Why is the vulnerable period in CSMA equal to $T_p$ rather than $2T_{fr}$ as in ALOHA?<br><br><strong>Answer:</strong> Because stations listen before transmitting. Once Station A's signal has traveled across the medium to all stations (taking propagation time $T_p$), all other stations will detect the channel as busy and refrain from transmitting. Collisions can only occur during the first $T_p$ seconds before Station A's wavefront reaches distant nodes."
    },
    advantagesLimitations: `
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Advantages</th>
            <th>Disadvantages</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Minimal delay when traffic is light: transmits immediately on idle.</td>
            <td>Guaranteed collisions when multiple stations wait for a busy channel to clear.</td>
          </tr>
          <tr>
            <td>Zero deliberate idle time wasted after channel becomes free.</td>
            <td>Collision rate climbs rapidly under moderate to heavy traffic.</td>
          </tr>
          <tr>
            <td>Simple algorithm without complex probability generators.</td>
            <td>Requires continuous carrier monitoring, consuming power.</td>
          </tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "Traditional IEEE 802.3 Ethernet (which combines 1-persistent sensing with collision detection).",
      "Low-latency industrial serial sensor buses."
    ],
    quiz: [
      {
        question: "In 1-persistent CSMA, what does a station do when it detects that the channel has become idle?",
        options: [
          "Transmits immediately with probability 1",
          "Waits for a random backoff time before transmitting",
          "Transmits with probability p and defers with probability 1 - p",
          "Sends an RTS request to the access point"
        ],
        correct: 0,
        explanation: "In 1-persistent CSMA, the station transmits immediately with probability 1 as soon as an idle channel is sensed."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 12, Section 12.1.2 (CSMA).", url: "" }
    ]
  }
};

// =============================================================================
// SUBTOPIC 6: u2-csma-non-persistent - Non-Persistent CSMA
// =============================================================================
data["u2-csma-non-persistent"] = {
  id: "u2-csma-non-persistent",
  title: "Non-Persistent CSMA",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 4,
  subtopicNumber: 6,
  whyItMatters: "Non-Persistent CSMA eliminates the 1-persistent collision rush. By forcing a station to wait a random time if the channel is busy, multiple waiting stations scatter in time rather than colliding simultaneously.",
  prerequisitesList: [
    { concept: "u2-csma-1-persistent", meaning: "1-Persistent CSMA and its simultaneous clearing collision flaw" },
    { concept: "Random Backoff", meaning: "Drawing random wait durations from a uniform probability distribution" }
  ],
  learningObjectives: [
    "Define Non-Persistent CSMA and explain how it prevents collisions when a busy channel clears.",
    "Trace the 5-step operational algorithm of Non-Persistent CSMA.",
    "Evaluate the trade-off: reduced collision probability vs. increased waiting delay and idle channel intervals.",
    "Compare Non-Persistent CSMA directly with 1-Persistent CSMA."
  ],
  infobox: {
    layer: "Layer 2 (MAC Sublayer)",
    standard: "Kleinrock & Tobagi Random Access Model (1975)",
    type: "Randomized Delay Contention Protocol",
    prerequisites: ["u2-csma-1-persistent"],
    relatedConcepts: ["u2-csma-1-persistent", "u2-csma-p-persistent"],
    compareWith: ["u2-csma-1-persistent", "u2-csma-p-persistent"],
    primaryUses: ["High-traffic wireless sensor channels, military tactical packet radios"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ab/1-persistent_CSMA%E2%81%84CD_collision.png",
  imageCaption: "Figure: Non-Persistent CSMA Random Delay and Re-sensing Decision Flow.",
  sections: {
    overview: `
      <p><strong>Non-Persistent CSMA</strong> is a carrier sense protocol designed to solve the primary vulnerability of 1-persistent CSMA: the guaranteed collision that occurs when multiple stations wait for a busy channel to clear.</p>
      
      <p>In Non-Persistent CSMA, a station is <em>not persistent</em> in its listening. If a station senses the channel and finds it <strong>busy</strong>, it does not stand by continuously waiting for the end of the transmission. Instead, it immediately halts sensing, <strong>waits for a random period of time</strong>, and then senses the channel again.</p>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Step-by-Step Working Principle</h3>
      <ol class="wiki-ordered-list">
        <li>The station has a frame ready for transmission.</li>
        <li>The station senses the communication channel.</li>
        <li><strong>If the channel is idle:</strong> The station transmits its frame immediately.</li>
        <li><strong>If the channel is busy:</strong> The station does NOT continue listening. It selects a random waiting time from a backoff distribution.</li>
        <li>The station waits for the selected random duration.</li>
        <li>After the timer expires, the station senses the channel again:
          <ul class="list-disc pl-5 mt-1 space-y-0.5">
            <li>If idle: It transmits.</li>
            <li>If still busy: It selects another random waiting time and repeats the process.</li>
          </ul>
        </li>
      </ol>
    `,
    eli10: "Imagine you want to use the bathroom, but the door is locked because someone is inside. In 1-persistent, you stand with your hand on the doorknob waiting to twist it the millisecond it unlocks. In non-persistent, you walk back to your desk, play a video game for 5 minutes, and then walk back to check if it's free. If someone else also wanted the bathroom, you won't bump into each other!",
    analogy: "Calling a busy phone line: instead of pressing redial every single second, you hang up, wait 10 minutes, and call back later.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">How Non-Persistent CSMA Prevents Collisions</h3>
      <p>Consider the scenario where Station A is transmitting, while Station B and Station C both generate frames:</p>
      <ul class="wiki-bullet-list">
        <li>Both B and C sense the channel and find it busy.</li>
        <li>Under 1-persistent CSMA, both would wait and collide the instant A finishes.</li>
        <li>Under <strong>Non-Persistent CSMA</strong>, Station B generates a random wait of $12\\text{ ms}$, while Station C generates a random wait of $27\\text{ ms}$.</li>
        <li>When Station A finishes, the channel clears. At $t = 12\\text{ ms}$, Station B wakes up, senses the idle channel, and transmits safely.</li>
        <li>By the time Station C wakes up at $t = 27\\text{ ms}$, it senses that Station B is transmitting, backs off for another random interval, and avoids colliding!</li>
      </ul>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">The Downside: Wasted Idle Time</h3>
      <p>Because waiting stations are asleep during random backoffs, the channel may become completely idle after Station A finishes, sitting empty for milliseconds before Station B wakes up. This introduces <strong>higher average packet latency</strong> and wastes channel capacity when traffic is light.</p>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Non-Persistent Algorithm Pseudo-Code</h3>
      <div class="p-3 bg-gray-900 text-gray-100 rounded font-mono text-xs">
        <p class="text-emerald-400">// Non-Persistent CSMA Algorithm</p>
        <p>while (true) {</p>
        <p class="pl-4">if (channel == IDLE) {</p>
        <p class="pl-8 text-blue-400">transmitFrame();</p>
        <p class="pl-8 text-blue-400">break;</p>
        <p class="pl-4">} else {</p>
        <p class="pl-8 text-amber-400">R = randomBackoffTime();</p>
        <p class="pl-8 text-amber-400">sleep(R);</p>
        <p class="pl-4">}</p>
        <p>}</p>
      </div>
    `,
    workedExamples: {
      level1: "<strong>Question:</strong> What does a station do in Non-Persistent CSMA if it senses that the channel is busy?<br><br><strong>Answer:</strong> It stops sensing immediately, waits for a random period of time, and then senses the channel again.",
      level2: "<strong>Problem:</strong> What is the main advantage and main disadvantage of Non-Persistent CSMA compared to 1-Persistent CSMA?<br><br><strong>Answer:</strong><br>• <strong>Advantage:</strong> Drastically reduces collisions under heavy traffic because waiting stations scatter their re-sensing times randomly.<br>• <strong>Disadvantage:</strong> Introduces longer waiting times and may leave the channel idle even when stations have frames ready to send.",
      level3: "<strong>Analysis:</strong> Why does Non-Persistent CSMA achieve higher peak throughput than 1-Persistent CSMA at high offered loads?<br><br><strong>Answer:</strong> At high loads ($G > 1$), 1-Persistent CSMA suffers catastrophic throughput collapse due to repeated collisions between waiting stations. Non-Persistent CSMA acts as a natural traffic damper by forcing competing nodes into randomized sleep intervals, preventing collision avalanches and maintaining throughput up to 85%."
    },
    advantagesLimitations: `
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Advantages</th>
            <th>Disadvantages</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dramatically reduces collision probability under heavy traffic.</td>
            <td>Introduces additional waiting delay for packets.</td>
          </tr>
          <tr>
            <td>Higher maximum channel throughput than 1-persistent CSMA.</td>
            <td>Channel may sit empty/idle while waiting stations are in backoff sleep.</td>
          </tr>
          <tr>
            <td>Nodes do not continuously drain energy sensing a busy medium.</td>
            <td>Slower transmission start when traffic is light.</td>
          </tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "Wireless telemetry networks with bursty transmissions.",
      "Low-power sensor nodes (where continuous carrier sensing drains batteries).",
      "Academic multiple access performance benchmarks."
    ],
    quiz: [
      {
        question: "In non-persistent CSMA, what happens if a station finds the channel busy?",
        options: [
          "It waits for a random period of time before sensing the channel again",
          "It continuously senses until the channel becomes idle",
          "It aborts transmission permanently and drops the packet",
          "It broadcasts a jamming signal"
        ],
        correct: 0,
        explanation: "Non-persistent CSMA avoids immediate collisions by having stations back off for a random period before re-sensing the channel."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 12, Section 12.1.2.", url: "" }
    ]
  }
};

// =============================================================================
// SUBTOPIC 7: u2-csma-p-persistent - p-Persistent CSMA
// =============================================================================
data["u2-csma-p-persistent"] = {
  id: "u2-csma-p-persistent",
  title: "p-Persistent CSMA",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 4,
  subtopicNumber: 7,
  whyItMatters: "p-Persistent CSMA combines the rapid responsiveness of 1-persistent with the collision avoidance of non-persistent. By introducing a transmission probability p on slotted channels, it provides tunable performance optimization.",
  prerequisitesList: [
    { concept: "u2-csma-1-persistent", meaning: "1-Persistent immediate transmission" },
    { concept: "Time Slots", meaning: "Slot boundaries equal to maximum propagation delay Tp" }
  ],
  learningObjectives: [
    "Define p-Persistent CSMA and explain how it operates on time-slotted channels.",
    "Walk through the probabilistic decision rule: transmit with probability $p$, defer with probability $1-p$.",
    "Calculate transmission outcomes for specific values of $p$ (e.g., $p = 0.4$).",
    "Master the 5-parameter comparative matrix contrasting 1-Persistent, Non-Persistent, and p-Persistent CSMA."
  ],
  infobox: {
    layer: "Layer 2 (MAC Sublayer)",
    standard: "IEEE 802.11 Contention / Packet Radio Standards",
    type: "Probabilistic Slotted Contention Protocol",
    prerequisites: ["u2-csma-1-persistent", "u2-csma-non-persistent"],
    relatedConcepts: ["u2-csma-cd", "u2-csma-ca"],
    compareWith: ["u2-csma-1-persistent", "u2-csma-non-persistent"],
    primaryUses: ["Wi-Fi contention backoff modeling, slotted packet radio systems"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ab/1-persistent_CSMA%E2%81%84CD_collision.png",
  imageCaption: "Figure: p-Persistent CSMA Slotted Channel Probability Decision Flow (Behrouz A. Forouzan).",
  sections: {
    overview: `
      <p><strong>p-Persistent CSMA</strong> is a sophisticated probabilistic protocol designed for communication channels that are divided into <strong>discrete time slots</strong> (where slot duration is equal to or greater than the maximum one-way propagation delay, $\\text{Slot} \\ge T_p$).</p>
      
      <p>It combines the best characteristics of 1-persistent CSMA (low idle delay) and non-persistent CSMA (low collision probability). When the channel becomes idle, the station does not automatically transmit with certainty; instead, it flips a biased mathematical coin and <strong>transmits with probability $p$</strong>, while <strong>deferring with probability $1 - p$</strong> to the next time slot.</p>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Step-by-Step Working Principle</h3>
      <ol class="wiki-ordered-list">
        <li>The station senses the communication channel.</li>
        <li><strong>If the channel is busy:</strong> It continues to wait and monitor until the channel becomes idle.</li>
        <li><strong>When the channel becomes idle:</strong> The station generates a random probability value $r \\in [0, 1]$:
          <ul class="list-disc pl-5 mt-1 space-y-1">
            <li><strong>With probability $p$ ($r \\le p$):</strong> The station transmits its frame immediately in this slot.</li>
            <li><strong>With probability $1 - p$ ($r > p$):</strong> The station defers and waits for the next time slot.</li>
          </ul>
        </li>
        <li>At the beginning of the next time slot, the station senses the channel again:
          <ul class="list-disc pl-5 mt-1 space-y-1">
            <li><strong>If still idle:</strong> It repeats the probabilistic decision (transmits with probability $p$, defers with $1-p$).</li>
            <li><strong>If now busy (another station transmitted):</strong> It recognizes that another station captured the channel, treats it as a collision, and initiates random backoff.</li>
          </ul>
        </li>
      </ol>
    `,
    eli10: "Imagine you and a classmate want to ask a question. The teacher stops talking. In p-persistent with $p = 0.4$, you roll a 10-sided die: if you roll a 1, 2, 3, or 4 (40% chance), you speak up! If you roll 5 through 10 (60% chance), you stay quiet for one second to see if your classmate speaks. If your classmate speaks, you wait until they finish.",
    analogy: "Controlled merging onto a highway: instead of all waiting cars gunning their engines at once, each driver enters with a 40% probability, leaving 60% probability that they let another car merge first.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Concrete Numerical Example ($p = 0.4$) (PDF Section 8.3)</h3>
      <p>Suppose $N$ stations are waiting for a busy channel to clear, with $p = 0.4$:</p>
      <ul class="wiki-bullet-list">
        <li><strong>Probability of immediate transmission in Slot 1:</strong> $p = 0.4$ (40%).</li>
        <li><strong>Probability of deferring to Slot 2:</strong> $1 - p = 0.6$ (60%).</li>
        <li>If 2 stations are waiting (Station A and Station B):
          <ul class="list-disc pl-5 mt-1 space-y-0.5">
            <li>Probability both transmit and collide: $p \\times p = 0.4 \\times 0.4 = 0.16$ (only 16%!).</li>
            <li>Probability Station A transmits and Station B defers: $0.4 \\times 0.6 = 0.24$ (24% clean success).</li>
            <li>Probability Station B transmits and Station A defers: $0.6 \\times 0.4 = 0.24$ (24% clean success).</li>
            <li>Probability both defer: $0.6 \\times 0.6 = 0.36$ (36% channel idle for one slot).</li>
          </ul>
        </li>
      </ul>
      <p class="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-1">Total success probability in Slot 1 is $24\\% + 24\\% = 48\\%$, with only 16% collision risk, compared to 100% collision in 1-persistent CSMA!</p>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Master Comparison of CSMA Persistence Methods (PDF Section 8.4)</h3>
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th>1-Persistent CSMA</th>
            <th>Non-Persistent CSMA</th>
            <th>p-Persistent CSMA</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>When channel is busy</strong></td>
            <td>Keeps sensing continuously</td>
            <td>Waits random backoff time</td>
            <td>Waits until channel becomes idle</td>
          </tr>
          <tr>
            <td><strong>When channel becomes idle</strong></td>
            <td>Transmits immediately ($p=1$)</td>
            <td>Transmits after sensing if timer expired</td>
            <td>Transmits with probability $p$; defers with $1-p$</td>
          </tr>
          <tr>
            <td><strong>Slot Synchronization</strong></td>
            <td>Not required by basic method</td>
            <td>Not required by basic method</td>
            <td><strong>Required</strong> (slotted channel)</td>
          </tr>
          <tr>
            <td><strong>Collision Possibility</strong></td>
            <td>Relatively high</td>
            <td>Reduced / Low</td>
            <td>Tunable (depends on value of $p$)</td>
          </tr>
          <tr>
            <td><strong>Average Waiting Time</strong></td>
            <td>Usually very low</td>
            <td>Can be high</td>
            <td>Tunable (depends on value of $p$)</td>
          </tr>
        </tbody>
      </table>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Mathematical Optimization of Parameter $p$</h3>
      <p>To avoid collisions when $N$ stations are waiting to transmit, we want exactly one station to transmit in the slot. The expected number of transmitting stations is $N \\cdot p$. Therefore, optimal throughput occurs when:</p>
      <div class="p-3 my-2 bg-slate-100 dark:bg-slate-800 rounded font-mono text-xs text-center">
        $$N \\cdot p \\le 1 \\implies p \\le \\frac{1}{N}$$
      </div>
      <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">If $N = 10$ stations are contending, $p$ should be set to $\\approx 0.1$. If $p$ is set too high, collisions multiply; if $p$ is set too low, the channel sits idle for many slots before anyone transmits.</p>
    `,
    workedExamples: {
      level1: "<strong>Question:</strong> How does p-persistent CSMA decide whether to transmit when the channel becomes idle?<br><br><strong>Answer:</strong> It transmits with probability $p$, and defers with probability $1 - p$ to the next time slot, repeating the test until it transmits or another station captures the channel.",
      level2: "<strong>Problem:</strong> In a p-persistent CSMA network with $p = 0.25$, what is the probability that a station defers transmission to the next time slot?<br><br><strong>Answer:</strong> Probability of deferring = $1 - p = 1 - 0.25 = 0.75 = 75\\%$.",
      level3: "<strong>Analysis:</strong> Why does p-persistent CSMA require slot synchronization?<br><br><strong>Answer:</strong> Because the deferral step delays transmission by a discrete time slot. If stations do not share synchronized slot boundaries of duration $\\ge T_p$, a station that defers could transmit halfway through another station's frame, causing partial collision and defeating the purpose of probabilistic deferral."
    },
    advantagesLimitations: `
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Advantages</th>
            <th>Disadvantages</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Balances immediate transmission speed with collision avoidance.</td>
            <td>Requires strict time slot synchronization across stations.</td>
          </tr>
          <tr>
            <td>Significantly reduces collisions compared with 1-persistent CSMA.</td>
            <td>Performance is heavily sensitive to the chosen value of $p$.</td>
          </tr>
          <tr>
            <td>Tunable: $p$ can be adjusted dynamically based on traffic load.</td>
            <td>More complex to implement than 1-persistent or non-persistent.</td>
          </tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "Wi-Fi IEEE 802.11 DCF contention window mechanisms.",
      "Military packet radio networks.",
      "Slotted CSMA in IEEE 802.15.4 (Zigbee) sensor networks."
    ],
    quiz: [
      {
        question: "In p-persistent CSMA, if the channel is idle and $p = 0.3$, what is the probability that the station defers to the next time slot?",
        options: [
          "0.7 or 70%",
          "0.3 or 30%",
          "1.0 or 100%",
          "0.0 or 0%"
        ],
        correct: 0,
        explanation: "The probability of deferring is $1 - p = 1 - 0.3 = 0.7$ (70%)."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 12, Section 12.1.2.", url: "" }
    ]
  }
};

// =============================================================================
// SUBTOPIC 8: u2-csma-cd - CSMA with Collision Detection (CSMA/CD)
// =============================================================================
data["u2-csma-cd"] = {
  id: "u2-csma-cd",
  title: "CSMA with Collision Detection (CSMA/CD)",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 4,
  subtopicNumber: 8,
  whyItMatters: "CSMA/CD is the legendary protocol of classic wired Ethernet (IEEE 802.3). By listening while transmitting, a station detects collisions instantly, aborts transmission, and executes binary exponential backoff, preventing bandwidth waste.",
  prerequisitesList: [
    { concept: "u2-csma-1-persistent", meaning: "1-Persistent CSMA carrier sensing" },
    { concept: "Minimum Frame Size", meaning: "Why transmission time must be at least twice propagation time (Tfr >= 2Tp)" }
  ],
  learningObjectives: [
    "Define CSMA/CD and explain its operational philosophy: 'Listen while transmitting'.",
    "Trace the 8-step operational workflow of CSMA/CD.",
    "Explain the purpose and duration of the 48-bit Jamming Signal.",
    "Master the Binary Exponential Backoff Algorithm: $0 \\le R \\le 2^K - 1$ and $T_B = R \\times T_{\\text{slot}}$."
  ],
  infobox: {
    layer: "Layer 2 (MAC Sublayer)",
    standard: "IEEE 802.3 (Ethernet) / ISO 8802-3",
    type: "Collision-Detecting Contention Protocol",
    prerequisites: ["u2-csma-1-persistent"],
    relatedConcepts: ["u2-csma-ca", "u2-comparison-multiple-access", "ethernet"],
    compareWith: ["u2-csma-ca"],
    primaryUses: ["Traditional shared coaxial and hub-based Ethernet local area networks"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Carrier_Sense_Multiple_Access_with_Collision_Detection.png",
  imageCaption: "Figure: CSMA/CD Flowchart: Sense Channel, Detect Collision, Send Jam, and Binary Backoff.",
  sections: {
    overview: `
      <p><strong>Carrier Sense Multiple Access with Collision Detection (CSMA/CD)</strong> is an enhancement of CSMA that allows a station to <strong>detect a collision while it is actively transmitting</strong>.</p>
      
      <p>In basic CSMA, if two stations collide, they continue blindly transmitting their entire frames to the very end, wasting precious channel capacity on garbled data. CSMA/CD solves this by requiring transmitting stations to monitor the cable. If a collision is detected, the station <strong>aborts transmission immediately</strong>, drastically reducing channel waste.</p>
      
      <p>CSMA/CD is the foundational MAC protocol of classic half-duplex <strong>IEEE 802.3 Ethernet</strong>.</p>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">The 8-Step Operational Workflow (PDF Section 9.3)</h3>
      <ol class="wiki-ordered-list">
        <li>The station senses the communication channel (Carrier Sense).</li>
        <li>If the channel is idle, the station begins transmitting its frame.</li>
        <li><strong>While transmitting, the station continuously monitors the medium</strong> for electrical collision waveforms (Collision Detection).</li>
        <li>If no collision is detected throughout the transmission, the frame is delivered successfully.</li>
        <li><strong>If a collision is detected:</strong> The station stops transmitting frame data immediately.</li>
        <li>The station transmits a <strong>Jamming Signal</strong> (32 to 48 bits) to ensure all other stations on the cable detect the collision.</li>
        <li>The station increments its collision counter $K$ and calculates a random wait using the <strong>Binary Exponential Backoff Algorithm</strong>.</li>
        <li>After waiting for the backoff time, the station attempts retransmission from Step 1.</li>
      </ol>
    `,
    eli10: "Imagine you are talking on a phone. In CSMA/CD, you listen with your ears at the exact same time you are speaking with your mouth. If you hear the other person start talking over you, you don't keep reading your whole 5-page speech! You stop instantly, yell 'Wait!', and pause for a few seconds before trying again.",
    analogy: "Walking down a narrow hallway while looking ahead: if you see someone stepping into the hallway, you stop immediately rather than running full speed into them and falling down.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">The Jamming Signal (PDF Section 9.4)</h3>
      <p>When a station detects a collision, it does not simply go silent. It immediately transmits a <strong>Jamming Signal</strong> (typically 32 to 48 bits of alternating 1s and 0s). This guarantees that the electrical collision disturbance persists on the wire long enough for all other colliding and listening stations across the entire length of the cable to observe the collision and discard partial frames.</p>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">The Binary Exponential Backoff Algorithm (PDF Section 9.5)</h3>
      <p>To prevent stations that just collided from retrying at the exact same instant, Ethernet uses the <strong>Binary Exponential Backoff Algorithm</strong>:</p>
      <div class="p-4 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-xl text-xs space-y-2">
        <p>1. Let $K$ be the collision attempt counter for the current frame (initially $K = 0$).</p>
        <p>2. Upon collision, increment $K = K + 1$. (After 10 collisions, $K$ is capped at 10; after 16 collisions, the frame is aborted and dropped).</p>
        <p>3. Select a random integer $R$ from the uniform range:</p>
        <div class="p-2 bg-white dark:bg-slate-900 rounded font-mono text-center text-sm font-bold text-blue-700 dark:text-blue-300">
          $$0 \\le R \\le 2^K - 1$$
        </div>
        <p>4. The backoff waiting time $T_B$ is calculated as:</p>
        <div class="p-2 bg-white dark:bg-slate-900 rounded font-mono text-center text-sm font-bold text-blue-700 dark:text-blue-300">
          $$T_B = R \\times T_{\\text{slot}}$$
        </div>
        <p>Where $T_{\\text{slot}}$ is the standard Ethernet slot time ($512\\text{ bit times} = 51.2\\ \\mu\\text{s}$ in 10 Mbps Ethernet).</p>
      </div>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">The Minimum Frame Size Requirement</h3>
      <p>For a station to detect a collision, the frame transmission time $T_{fr}$ must be long enough that the sender is still transmitting when the collision signal returns from the most distant node on the cable:</p>
      <div class="p-3 my-2 bg-slate-100 dark:bg-slate-800 rounded font-mono text-xs text-center">
        $$T_{fr} \\ge 2 \\cdot T_p \\implies L_{\\text{min}} = 2 \\cdot T_p \\cdot \\text{Bandwidth}$$
      </div>
      <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">This fundamental constraint is why standard Ethernet enforces a <strong>minimum frame size of 64 bytes (512 bits)</strong>.</p>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Exponential Backoff Progression Table</h3>
      <table class="wiki-table">
        <thead><tr><th>Collision Attempt ($K$)</th><th>Range of $R$ ($0 \\le R \\le 2^K - 1$)</th><th>Possible Backoff Multipliers</th></tr></thead>
        <tbody>
          <tr><td>1st collision ($K=1$)</td><td>$0 \\le R \\le 2^1 - 1 = 1$</td><td>$R \\in \\{0, 1\\}$</td></tr>
          <tr><td>2nd collision ($K=2$)</td><td>$0 \\le R \\le 2^2 - 1 = 3$</td><td>$R \\in \\{0, 1, 2, 3\\}$</td></tr>
          <tr><td>3rd collision ($K=3$)</td><td>$0 \\le R \\le 2^3 - 1 = 7$</td><td>$R \\in \\{0, 1, 2, 3, 4, 5, 6, 7\\}$</td></tr>
          <tr><td>4th collision ($K=4$)</td><td>$0 \\le R \\le 2^4 - 1 = 15$</td><td>$R \\in \\{0, 1, \\dots, 15\\}$</td></tr>
          <tr><td>10th collision ($K=10$)</td><td>$0 \\le R \\le 2^{10} - 1 = 1023$</td><td>$R \\in \\{0, 1, \\dots, 1023\\}$</td></tr>
        </tbody>
      </table>
    `,
    workedExamples: {
      level1: "<strong>Numerical Problem 4 (From PDF Section 12.5):</strong> A station experiences three collisions ($K = 3$). Find the possible random values of $R$ in the binary exponential backoff algorithm.<br><br><strong>Given:</strong> $K = 3$.<br><strong>Formula:</strong> $0 \\le R \\le 2^K - 1$.<br><strong>Calculation:</strong> $0 \\le R \\le 2^3 - 1 = 8 - 1 = 7$.<br><strong>Answer:</strong> $R$ can be any integer in $\\{0, 1, 2, 3, 4, 5, 6, 7\\}$.",
      level2: "<strong>Problem:</strong> On a 10 Mbps Ethernet link with a slot time of $51.2\\ \\mu\\text{s}$, a station suffers its second collision ($K=2$) and randomly chooses $R = 2$. Calculate its backoff waiting time $T_B$.<br><br><strong>Given:</strong> $R = 2$, $T_{\\text{slot}} = 51.2\\ \\mu\\text{s}$.<br><strong>Calculation:</strong> $T_B = R \\times T_{\\text{slot}} = 2 \\times 51.2\\ \\mu\\text{s} = 102.4\\ \\mu\\text{s}$.<br><strong>Answer:</strong> The station waits $102.4\\ \\mu\\text{s}$ before sensing the channel again.",
      level3: "<strong>Analysis:</strong> Why is CSMA/CD not used in modern full-duplex switched Gigabit Ethernet networks?<br><br><strong>Answer:</strong> In modern switched Ethernet, every station has a dedicated point-to-point link to a switch port with separate transmit (Tx) and receive (Rx) wire pairs. Because transmission and reception occur on physically isolated channels, collisions cannot occur. Collision detection circuitry and backoff algorithms are therefore disabled in full-duplex mode."
    },
    advantagesLimitations: `
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Advantages</th>
            <th>Disadvantages</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Detects collisions during transmission and aborts immediately.</td>
            <td>Cannot be used over wireless media (transmitters blind local receivers).</td>
          </tr>
          <tr>
            <td>Saves channel time by eliminating transmission of corrupted frames.</td>
            <td>Requires a minimum frame size (64 bytes) to ensure collision detection.</td>
          </tr>
          <tr>
            <td>Exponential backoff automatically adapts delay to network congestion.</td>
            <td>Not needed in modern full-duplex switched Ethernet environments.</td>
          </tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "Traditional shared Ethernet (10BASE5 thicknet, 10BASE2 thinnet, 10BASE-T with hubs).",
      "CAN bus automotive vehicle communications (uses bitwise arbitration CSMA/CD).",
      "Half-duplex legacy network equipment."
    ],
    quiz: [
      {
        question: "In CSMA/CD, what is the purpose of the jamming signal sent after a collision is detected?",
        options: [
          "To ensure that all other transmitting and listening stations become aware that a collision occurred",
          "To reset the master router",
          "To assign IP addresses to new nodes",
          "To acknowledge receipt of the preceding frame"
        ],
        correct: 0,
        explanation: "The jamming signal ensures the collision voltage disturbance is sustained long enough for all stations across the network to detect it."
      },
      {
        question: "In Ethernet CSMA/CD, what algorithm is used to calculate the waiting time after a collision?",
        options: [
          "Binary exponential backoff",
          "Round-robin scheduling",
          "Dijkstra shortest path",
          "Leaky bucket rate shaping"
        ],
        correct: 0,
        explanation: "Ethernet CSMA/CD employs the Binary Exponential Backoff algorithm ($0 \\le R \\le 2^K - 1$)."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 12, Section 12.1.3 (CSMA/CD).", url: "" },
      { cite: "IEEE Std 802.3-2022: Ethernet Standard for Information Technology.", url: "" }
    ]
  }
};

// =============================================================================
// SUBTOPIC 9: u2-csma-ca - CSMA with Collision Avoidance (CSMA/CA)
// =============================================================================
data["u2-csma-ca"] = {
  id: "u2-csma-ca",
  title: "CSMA with Collision Avoidance (CSMA/CA)",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 4,
  subtopicNumber: 9,
  whyItMatters: "In wireless radio networks, a station's transmitter overpowers its receiver, making collision detection impossible. CSMA/CA solves this by avoiding collisions before transmission using Interframe Spaces, Contention Windows, and ACKs.",
  prerequisitesList: [
    { concept: "u2-csma-cd", meaning: "CSMA/CD and why wireless cannot detect collisions" },
    { concept: "Wireless Radio Propagation", meaning: "Hidden terminal problem and RF path loss" }
  ],
  learningObjectives: [
    "Explain why CSMA/CD cannot function on wireless networks, necessitating CSMA/CA.",
    "Master the three core strategies of CSMA/CA: Interframe Space (IFS), Contention Window, and Acknowledgements.",
    "Trace the complete 9-step operational workflow of CSMA/CA.",
    "Compare CSMA/CD and CSMA/CA directly across 7 technical features."
  ],
  infobox: {
    layer: "Layer 2 (MAC Sublayer)",
    standard: "IEEE 802.11 (Wi-Fi) / IEEE 802.15.4 (Zigbee)",
    type: "Collision-Avoidance Contention Protocol",
    prerequisites: ["u2-csma-cd"],
    relatedConcepts: ["u2-csma-cd", "wifi-mac-sublayer", "u2-comparison-multiple-access"],
    compareWith: ["u2-csma-cd"],
    primaryUses: ["All Wi-Fi standards (802.11a/b/g/n/ac/ax/be), IoT wireless networks"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Csma_ca.svg",
  imageCaption: "Figure: CSMA/CA Operation Flowchart: IFS Wait, Contention Window Countdown, and ACK Handshake.",
  sections: {
    overview: `
      <p><strong>Carrier Sense Multiple Access with Collision Avoidance (CSMA/CA)</strong> is a random access protocol designed specifically for <strong>wireless networks</strong> that attempts to <strong>avoid collisions before transmitting data</strong>.</p>
      
      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Why Is CSMA/CA Needed? (Why Wireless Cannot Use CSMA/CD)</h3>
      <p>In wired Ethernet, transceivers can easily detect collisions by monitoring cable voltage. In wireless networks, collision detection is physically infeasible due to three fundamental obstacles:</p>
      <ol class="wiki-ordered-list">
        <li><strong>Transceiver Dynamic Range Blindness:</strong> A wireless station's transmitter radiates tremendous RF power into its local antenna. This overwhelms its sensitive receiver circuitry. A station cannot listen to weak incoming signals while transmitting at high power.</li>
        <li><strong>The Hidden Terminal Problem:</strong> Station A and Station C are out of radio range of each other, but both can reach Access Point B. Neither can hear the other transmitting, so carrier sensing fails.</li>
        <li><strong>Severe Path Loss Attenuation:</strong> Radio signals attenuate rapidly with distance ($1/d^2$ to $1/d^4$), making distant collisions undetectable at the transmitter.</li>
      </ol>
      <p class="mt-2">Therefore, wireless LANs must use <strong>collision avoidance</strong> techniques rather than collision detection.</p>
    `,
    eli10: "Imagine you are walking into a dark room wearing noise-canceling headphones while shouting. You can't hear if anyone else is shouting! Because you can't hear while shouting (collision detection impossible), you have to be extra careful BEFORE you start: you pause, tap your friend's shoulder to reserve the room, and wait for them to give you a thumbs-up before speaking.",
    analogy: "Entering a busy highway from a blind driveway: since you cannot see around the corner while accelerating, you stop at the stop sign, wait for a quiet gap, and proceed cautiously.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">The Three Main Strategies of CSMA/CA (Forouzan Section 10.4)</h3>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
        <div class="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div class="font-bold text-blue-600 dark:text-blue-400 text-xs mb-1">1. Interframe Space (IFS)</div>
          <p class="text-[11px] text-slate-600 dark:text-slate-300">
            A mandatory quiet delay after the channel becomes idle before a station can begin contending. Gives high-priority traffic and ongoing handshakes time to complete.
          </p>
        </div>
        <div class="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div class="font-bold text-emerald-600 dark:text-emerald-400 text-xs mb-1">2. Contention Window</div>
          <p class="text-[11px] text-slate-600 dark:text-slate-300">
            The station selects a random backoff integer from a range (e.g., 0 to 15 slots) and counts down only while the channel remains idle. Prevents simultaneous starts.
          </p>
        </div>
        <div class="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div class="font-bold text-purple-600 dark:text-purple-400 text-xs mb-1">3. Acknowledgements (ACK)</div>
          <p class="text-[11px] text-slate-600 dark:text-slate-300">
            Because collisions cannot be detected during transmission, the receiver must return an explicit positive ACK. If no ACK arrives, the sender assumes collision and retransmits.
          </p>
        </div>
      </div>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">The 9-Step Operational Workflow (PDF Section 10.3)</h3>
      <ol class="wiki-ordered-list">
        <li>The station senses the wireless channel.</li>
        <li>If the channel is busy, it waits until the ongoing transmission finishes.</li>
        <li>When the channel becomes idle, the station waits for an <strong>Interframe Space (IFS)</strong> period.</li>
        <li>If the channel remains idle throughout the IFS, it selects a random backoff slot number from its <strong>Contention Window</strong>.</li>
        <li>The station counts down its backoff timer while the channel remains idle.</li>
        <li>If another station transmits during the countdown, the channel becomes busy: <strong>the countdown is paused</strong>.</li>
        <li>When the countdown timer reaches zero, the station transmits its complete frame.</li>
        <li>The receiver verifies frame integrity and returns an <strong>Acknowledgement (ACK)</strong> after a short SIFS interval.</li>
        <li>If the sender does not receive an ACK before timeout, it doubles its contention window and attempts retransmission.</li>
      </ol>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">CSMA/CD vs. CSMA/CA Comparison (PDF Section 11)</h3>
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Comparative Feature</th>
            <th>CSMA/CD</th>
            <th>CSMA/CA</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Full Form</strong></td>
            <td>Collision Detection</td>
            <td>Collision Avoidance</td>
          </tr>
          <tr>
            <td><strong>Main Purpose</strong></td>
            <td>Detect collisions after they occur</td>
            <td>Reduce the chance of collisions occurring</td>
          </tr>
          <tr>
            <td><strong>Common Association</strong></td>
            <td>Traditional wired Ethernet (IEEE 802.3)</td>
            <td>Wireless LAN / Wi-Fi (IEEE 802.11)</td>
          </tr>
          <tr>
            <td><strong>Collision Handling</strong></td>
            <td>Detects collision, aborts frame immediately</td>
            <td>Uses waiting, IFS, and backoff before transmission</td>
          </tr>
          <tr>
            <td><strong>Acknowledgement Role</strong></td>
            <td>Not the primary collision recovery mechanism</td>
            <td><strong>Mandatory</strong> to confirm successful reception</td>
          </tr>
          <tr>
            <td><strong>Backoff Execution</strong></td>
            <td>Used <em>after</em> a collision is detected</td>
            <td>Used <em>before</em> transmission attempts</td>
          </tr>
          <tr>
            <td><strong>Jamming Signal</strong></td>
            <td>Used after collision detection</td>
            <td>Not used in basic CSMA/CA strategy</td>
          </tr>
        </tbody>
      </table>
    `,
    workedExamples: {
      level1: "<strong>Question:</strong> State two physical reasons why collision detection (CD) is infeasible in wireless networks.<br><br><strong>Answer:</strong> 1. High transmit-to-receive power disparity: a wireless station's strong local transmitter overpowers and blinds its own receiver. 2. Hidden terminal problem: two stations can be out of range of each other, making carrier sensing and collision detection impossible.",
      level2: "<strong>Problem:</strong> What are the three main strategies used by CSMA/CA to avoid collisions?<br><br><strong>Answer:</strong> 1. Interframe Space (IFS). 2. Contention Window (random backoff countdown). 3. Acknowledgement (ACK) frames.",
      level3: "<strong>Analysis:</strong> Why does CSMA/CA pause the backoff countdown when the channel becomes busy, rather than resetting it?<br><br><strong>Answer:</strong> Pausing the backoff countdown preserves fairness. Stations that have already waited through part of their backoff keep their remaining time, giving them higher priority to transmit as soon as the channel clears again compared to newly arriving stations."
    },
    advantagesLimitations: `
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Advantages</th>
            <th>Disadvantages</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Avoids collisions proactively before transmission.</td>
            <td>Introduces substantial IFS and backoff waiting latency.</td>
          </tr>
          <tr>
            <td>Specifically tailored for wireless propagation characteristics.</td>
            <td>Control frames (RTS, CTS, ACK) consume protocol bandwidth.</td>
          </tr>
          <tr>
            <td>Guarantees delivery verification via explicit ACKs.</td>
            <td>Collisions are minimized, but cannot be 100% eliminated.</td>
          </tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "All IEEE 802.11 Wi-Fi networks (Wi-Fi 4, 5, 6, 7).",
      "IEEE 802.15.4 low-rate wireless personal area networks (Zigbee).",
      "Wireless mesh sensor backbones."
    ],
    quiz: [
      {
        question: "When is the random backoff timer executed in CSMA/CA compared to CSMA/CD?",
        options: [
          "CSMA/CA executes backoff before transmission; CSMA/CD executes backoff after collision detection",
          "CSMA/CA executes backoff only after a collision",
          "CSMA/CD executes backoff before transmission",
          "Both protocols execute backoff at midnight"
        ],
        correct: 0,
        explanation: "CSMA/CA proactively counts down a backoff timer before transmitting to avoid collisions, whereas CSMA/CD only executes backoff after a collision is detected."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 12, Section 12.1.4 (CSMA/CA).", url: "" },
      { cite: "IEEE Std 802.11-2020: Wireless LAN Medium Access Control and Physical Layer Specifications.", url: "" }
    ]
  }
};

// =============================================================================
// SUBTOPIC 10: u2-comparison-multiple-access - Comparison of Multiple Access Protocols
// =============================================================================
data["u2-comparison-multiple-access"] = {
  id: "u2-comparison-multiple-access",
  title: "Comparison of Multiple Access Protocols",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 4,
  subtopicNumber: 10,
  whyItMatters: "Contrasting Pure ALOHA, Slotted ALOHA, CSMA, CSMA/CD, and CSMA/CA across vulnerable intervals, sensing strategies, and efficiencies provides the unifying theoretical foundation for local area network engineering.",
  prerequisitesList: [
    { concept: "u2-pure-aloha", meaning: "ALOHA systems" },
    { concept: "u2-csma-1-persistent", meaning: "Carrier sense variants" },
    { concept: "u2-csma-cd", meaning: "Collision detection and avoidance" }
  ],
  learningObjectives: [
    "Master the master comparison table contrasting Pure ALOHA, Slotted ALOHA, CSMA, CSMA/CD, and CSMA/CA.",
    "Compare vulnerable times: $2T_{fr}$ (Pure) vs. $T_{fr}$ (Slotted) vs. $T_p$ (CSMA).",
    "Review the master terminology glossary from Section 14 of the PDF.",
    "Synthesize the quick revision notes from Section 17 of the PDF."
  ],
  infobox: {
    layer: "Layer 2 (MAC Sublayer Architecture)",
    standard: "IEEE 802 / Forouzan Chapter 12 Comparative Synthesis",
    type: "Master Comparative Protocol Analysis",
    prerequisites: ["u2-pure-aloha", "u2-slotted-aloha", "u2-csma-cd", "u2-csma-ca"],
    relatedConcepts: ["u2-pure-aloha", "u2-slotted-aloha", "u2-csma-cd", "u2-csma-ca"],
    compareWith: ["u2-pure-aloha", "u2-csma-cd"],
    primaryUses: ["University exam synthesis, GATE networking preparation, network architecture design"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Multiple_Access.png",
  imageCaption: "Figure: Master Architectural Comparison of Contention-Based Multiple Access Protocols.",
  sections: {
    overview: `
      <p>A comprehensive comparative synthesis of the five canonical random access protocols—<strong>Pure ALOHA</strong>, <strong>Slotted ALOHA</strong>, <strong>CSMA</strong>, <strong>CSMA/CD</strong>, and <strong>CSMA/CA</strong>—reveals the progressive technological enhancements designed to mitigate collisions and maximize channel throughput.</p>
    `,
    eli10: "Think of an evolution of manners: (1) Pure ALOHA: Yell anytime. (2) Slotted ALOHA: Yell only on the minute. (3) CSMA: Listen before you speak. (4) CSMA/CD: Listen while you speak and stop if interrupted. (5) CSMA/CA: Wave your hand and get permission before speaking because you can't hear while talking.",
    analogy: "The historical progression from unpaved dirt trails (no rules, frequent crashes) to traffic signals, lane markers, radar collision warning, and automated obstacle avoidance.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Master Overall Comparison Table (From PDF Section 13)</h3>
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Comparative Feature</th>
            <th>Pure ALOHA</th>
            <th>Slotted ALOHA</th>
            <th>CSMA</th>
            <th>CSMA/CD</th>
            <th>CSMA/CA</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Senses Channel First?</strong></td>
            <td>No</td>
            <td>No</td>
            <td>Yes</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td><strong>Time Synchronization</strong></td>
            <td>No (Continuous)</td>
            <td>Yes (Slot clock)</td>
            <td>Depends on method (p-persistent)</td>
            <td>Not required</td>
            <td>Uses timing coordination (IFS)</td>
          </tr>
          <tr>
            <td><strong>Vulnerable Time</strong></td>
            <td>$2 T_{fr}$</td>
            <td>$T_{fr}$</td>
            <td>$T_p$ (Propagation delay)</td>
            <td>$T_p$</td>
            <td>Contention Window</td>
          </tr>
          <tr>
            <td><strong>Collision Possibility</strong></td>
            <td>Very High</td>
            <td>High (Cut by 50%)</td>
            <td>Reduced</td>
            <td>Detected after occurrence</td>
            <td>Reduced via avoidance</td>
          </tr>
          <tr>
            <td><strong>Main Technique</strong></td>
            <td>Immediate transmission</td>
            <td>Slot-based transmission</td>
            <td>Listen before transmit</td>
            <td>Detect collision & jam</td>
            <td>Avoid collision via IFS & backoff</td>
          </tr>
          <tr>
            <td><strong>Typical Association</strong></td>
            <td>Early shared packet radio</td>
            <td>Satellite networks</td>
            <td>Shared media</td>
            <td>Traditional wired Ethernet</td>
            <td>Wireless LAN (Wi-Fi)</td>
          </tr>
        </tbody>
      </table>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-6 mb-2">Master Terminology Glossary (From PDF Section 14)</h3>
      <table class="wiki-table">
        <thead><tr><th>Term</th><th>Formal Definition</th></tr></thead>
        <tbody>
          <tr><td><strong>Multiple Access</strong></td><td>Sharing a communication channel among multiple stations.</td></tr>
          <tr><td><strong>Random Access</strong></td><td>A method in which stations compete autonomously for channel access.</td></tr>
          <tr><td><strong>Contention</strong></td><td>Competition between stations attempting to capture the shared medium.</td></tr>
          <tr><td><strong>Collision</strong></td><td>Overlapping transmissions that interfere with and corrupt one another.</td></tr>
          <tr><td><strong>Pure ALOHA</strong></td><td>ALOHA method allowing transmission at any continuous time instant.</td></tr>
          <tr><td><strong>Slotted ALOHA</strong></td><td>ALOHA method allowing transmission only at discrete slot boundaries.</td></tr>
          <tr><td><strong>Vulnerable Time</strong></td><td>The time duration during which another transmission will cause a collision.</td></tr>
          <tr><td><strong>CSMA</strong></td><td>Carrier Sense Multiple Access: listen before you transmit.</td></tr>
          <tr><td><strong>Persistence</strong></td><td>The rule determining when a station transmits after sensing the channel.</td></tr>
          <tr><td><strong>CSMA/CD</strong></td><td>CSMA with collision detection: listen while transmitting.</td></tr>
          <tr><td><strong>CSMA/CA</strong></td><td>CSMA with collision avoidance: avoid collisions before transmitting.</td></tr>
          <tr><td><strong>Backoff</strong></td><td>Waiting for a randomized period before attempting transmission again.</td></tr>
          <tr><td><strong>Jamming Signal</strong></td><td>Signal transmitted to alert all stations that a collision has occurred.</td></tr>
          <tr><td><strong>Throughput</strong></td><td>The rate of successful useful data transmission across the channel.</td></tr>
          <tr><td><strong>Propagation Delay</strong></td><td>Time taken for an electromagnetic signal to travel through the medium.</td></tr>
        </tbody>
      </table>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Master Formula Summary (PDF Section 12.1)</h3>
      <table class="wiki-table">
        <thead><tr><th>Protocol Metric</th><th>Mathematical Formula</th></tr></thead>
        <tbody>
          <tr><td>Pure ALOHA Throughput</td><td>$S = G e^{-2G}$ (Max $S = 1/(2e) \\approx 18.4\\%$ at $G = 0.5$)</td></tr>
          <tr><td>Slotted ALOHA Throughput</td><td>$S = G e^{-G}$ (Max $S = 1/e \\approx 36.8\\%$ at $G = 1.0$)</td></tr>
          <tr><td>Pure ALOHA Vulnerable Time</td><td>$2 T_{fr}$</td></tr>
          <tr><td>Slotted ALOHA Vulnerable Time</td><td>$T_{fr}$</td></tr>
          <tr><td>CSMA Vulnerable Time</td><td>$T_p$ (Maximum propagation delay)</td></tr>
          <tr><td>CSMA/CD Backoff Waiting Time</td><td>$T_B = R \\times T_{\\text{slot}}, \\quad 0 \\le R \\le 2^K - 1$</td></tr>
        </tbody>
      </table>
    `,
    workedExamples: {
      level1: "<strong>Question:</strong> Rank the vulnerable times of Pure ALOHA, Slotted ALOHA, and CSMA in order of decreasing duration.<br><br><strong>Answer:</strong><br>1. <strong>Pure ALOHA:</strong> $2 T_{fr}$ (Longest; most vulnerable).<br>2. <strong>Slotted ALOHA:</strong> $T_{fr}$ (Moderate; cut in half).<br>3. <strong>CSMA:</strong> $T_p$ (Shortest; propagation delay is typically thousands of times shorter than frame transmission time).",
      level2: "<strong>Problem:</strong> A network has a frame transmission time of $1\\text{ ms}$ and a one-way propagation delay of $5\\ \\mu\\text{s}$. Compare the vulnerable times of Pure ALOHA and CSMA.<br><br><strong>Answer:</strong><br>• Pure ALOHA vulnerable time = $2 T_{fr} = 2 \\times 1\\text{ ms} = 2000\\ \\mu\\text{s}$.<br>• CSMA vulnerable time = $T_p = 5\\ \\mu\\text{s}$.<br>CSMA's vulnerable window is <strong>400 times smaller</strong> than Pure ALOHA's!",
      level3: "<strong>Analysis:</strong> Why does CSMA/CA use backoff before transmission whereas CSMA/CD uses backoff only after a collision?<br><br><strong>Answer:</strong> In CSMA/CD (wired), collisions can be detected immediately and aborted with minimal waste, so stations can aggressively transmit as soon as the channel clears. In CSMA/CA (wireless), collisions cannot be detected during transmission; an undetected collision wastes the entire frame and round-trip ACK time. Therefore, CSMA/CA forces competing stations into random backoffs <em>before</em> transmitting to minimize collisions proactively."
    },
    advantagesLimitations: `
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Protocol</th>
            <th>Optimal Operating Environment</th>
            <th>Performance Bottleneck</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Pure ALOHA</strong></td>
            <td>Very low traffic ($G < 0.1$), simple battery devices.</td>
            <td>Max 18.4% throughput; high collision rate.</td>
          </tr>
          <tr>
            <td><strong>Slotted ALOHA</strong></td>
            <td>Synchronized satellite reservation channels.</td>
            <td>Requires global clock synchronization.</td>
          </tr>
          <tr>
            <td><strong>CSMA/CD</strong></td>
            <td>Shared wired Ethernet links ($a = T_p/T_{fr} \\ll 1$).</td>
            <td>Cannot function over wireless radio links.</td>
          </tr>
          <tr>
            <td><strong>CSMA/CA</strong></td>
            <td>Omnidirectional wireless radio networks (Wi-Fi).</td>
            <td>Protocol overhead from IFS, backoff, and ACKs.</td>
          </tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "Standard university computer networks curriculum and examinations.",
      "GATE, UGC-NET, and professional CCNA/CCNP network engineering exams.",
      "Protocol stack design for emerging IoT and satellite multi-access standards."
    ],
    quiz: [
      {
        question: "Which of the following multiple access protocols achieves the highest channel throughput under typical operating conditions?",
        options: [
          "CSMA/CD",
          "Slotted ALOHA",
          "Pure ALOHA",
          "Unslotted ALOHA"
        ],
        correct: 0,
        explanation: "CSMA/CD detects collisions and aborts immediately, achieving over 85–90% throughput on links where propagation delay is small."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 12.", url: "" }
    ]
  }
};

// =============================================================================
// APPEND TOPIC 4 ASSESSMENTS TO TOPIC 11 IN topics_u2_syllabus.js
// =============================================================================

// 1. Add Topic 4 Numerical Problems to u2-numerical-problems
if (data["u2-numerical-problems"]) {
  const t4Numericals = `
    <!-- Problem 9: Pure ALOHA Throughput Calculation -->
    <div class="p-4 bg-white dark:bg-gray-800 rounded-xl border border-blue-200 dark:border-blue-900 shadow-sm mt-4">
      <h4 class="font-bold text-sm text-blue-700 dark:text-blue-400 mb-1">Problem 9: Pure ALOHA Throughput Calculation</h4>
      <p class="text-xs text-gray-700 dark:text-gray-300"><strong>Question (From Topic 4 PDF):</strong> Calculate the throughput of a Pure ALOHA system when the offered load is $G = 0.5$.</p>
      <div class="mt-2 p-3 bg-gray-50 dark:bg-gray-900 rounded font-mono text-xs text-gray-800 dark:text-gray-200">
        <p><strong>Given:</strong> $G = 0.5$.</p>
        <p><strong>Formula:</strong> $S = G e^{-2G}$</p>
        <p><strong>Calculation:</strong> $S = 0.5 \\cdot e^{-2(0.5)} = 0.5 \\cdot e^{-1} = 0.5 \\times 0.367879 = 0.1839$.</p>
        <p class="text-emerald-600 dark:text-emerald-400 font-bold mt-1">Answer: 18.39% (or 18.4%) throughput.</p>
      </div>
    </div>

    <!-- Problem 10: Slotted ALOHA Throughput Calculation -->
    <div class="p-4 bg-white dark:bg-gray-800 rounded-xl border border-blue-200 dark:border-blue-900 shadow-sm mt-4">
      <h4 class="font-bold text-sm text-blue-700 dark:text-blue-400 mb-1">Problem 10: Slotted ALOHA Throughput Calculation</h4>
      <p class="text-xs text-gray-700 dark:text-gray-300"><strong>Question (From Topic 4 PDF):</strong> Calculate the throughput of Slotted ALOHA when the offered load is $G = 1.0$.</p>
      <div class="mt-2 p-3 bg-gray-50 dark:bg-gray-900 rounded font-mono text-xs text-gray-800 dark:text-gray-200">
        <p><strong>Given:</strong> $G = 1.0$.</p>
        <p><strong>Formula:</strong> $S = G e^{-G}$</p>
        <p><strong>Calculation:</strong> $S = 1.0 \\cdot e^{-1} = 0.367879 = 36.79\\%$.</p>
        <p class="text-emerald-600 dark:text-emerald-400 font-bold mt-1">Answer: 36.79% (or 36.8%) throughput.</p>
      </div>
    </div>

    <!-- Problem 11: Vulnerable Time Comparison -->
    <div class="p-4 bg-white dark:bg-gray-800 rounded-xl border border-blue-200 dark:border-blue-900 shadow-sm mt-4">
      <h4 class="font-bold text-sm text-blue-700 dark:text-blue-400 mb-1">Problem 11: ALOHA Vulnerable Time Comparison</h4>
      <p class="text-xs text-gray-700 dark:text-gray-300"><strong>Question (From Topic 4 PDF):</strong> A network uses frames that require 2 milliseconds to transmit ($T_{fr} = 2\\text{ ms}$). Find the vulnerable time for Pure ALOHA and Slotted ALOHA.</p>
      <div class="mt-2 p-3 bg-gray-50 dark:bg-gray-900 rounded font-mono text-xs text-gray-800 dark:text-gray-200">
        <p><strong>For Pure ALOHA:</strong> $\\text{Vulnerable Time} = 2 T_{fr} = 2 \\times 2\\text{ ms} = 4\\text{ ms}$.</p>
        <p><strong>For Slotted ALOHA:</strong> $\\text{Vulnerable Time} = T_{fr} = 2\\text{ ms}$.</p>
        <p class="text-emerald-600 dark:text-emerald-400 font-bold mt-1">Answer: Pure ALOHA = 4 ms; Slotted ALOHA = 2 ms.</p>
      </div>
    </div>

    <!-- Problem 12: Binary Exponential Backoff -->
    <div class="p-4 bg-white dark:bg-gray-800 rounded-xl border border-blue-200 dark:border-blue-900 shadow-sm mt-4">
      <h4 class="font-bold text-sm text-blue-700 dark:text-blue-400 mb-1">Problem 12: Binary Exponential Backoff Range</h4>
      <p class="text-xs text-gray-700 dark:text-gray-300"><strong>Question (From Topic 4 PDF):</strong> A station experiences three collisions ($K = 3$). Find the possible random values of $R$ in the binary exponential backoff algorithm.</p>
      <div class="mt-2 p-3 bg-gray-50 dark:bg-gray-900 rounded font-mono text-xs text-gray-800 dark:text-gray-200">
        <p><strong>Given:</strong> $K = 3$.</p>
        <p><strong>Formula:</strong> $0 \\le R \\le 2^K - 1 = 2^3 - 1 = 8 - 1 = 7$.</p>
        <p class="text-emerald-600 dark:text-emerald-400 font-bold mt-1">Answer: $R \\in \\{0, 1, 2, 3, 4, 5, 6, 7\\}$.</p>
      </div>
    </div>
  `;
  if (!data["u2-numerical-problems"].sections.overview.includes("Problem 9: Pure ALOHA")) {
    data["u2-numerical-problems"].sections.overview += t4Numericals;
  }
}

// 2. Add Topic 4 Short-Answer Questions to u2-short-answer-questions
if (data["u2-short-answer-questions"]) {
  const t4ShortQuestions = `
    <!-- Topic 4 Short Questions -->
    <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <p class="font-bold text-xs text-gfg-green">Q26. Define multiple access protocol.</p>
      <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">A set of protocol rules allowing multiple independent stations to share a common communication medium without collisions destroying data.</p>
    </div>
    <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <p class="font-bold text-xs text-gfg-green">Q27. What is random access?</p>
      <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">A multiple-access method in which all stations have equal access rights and compete (contend) for the shared channel without a central controller.</p>
    </div>
    <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <p class="font-bold text-xs text-gfg-green">Q28. Define Pure ALOHA.</p>
      <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">A random access protocol where stations transmit frames whenever data is ready, without prior sensing or time slot boundaries.</p>
    </div>
    <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <p class="font-bold text-xs text-gfg-green">Q29. What is Slotted ALOHA?</p>
      <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">An improved version of Pure ALOHA where channel time is divided into discrete slots and stations may transmit only at the beginning of a time slot.</p>
    </div>
    <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <p class="font-bold text-xs text-gfg-green">Q30. Define vulnerable time.</p>
      <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">The continuous time duration during which another station's transmission will collide with and destroy the frame under consideration.</p>
    </div>
    <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <p class="font-bold text-xs text-gfg-green">Q31. What is CSMA?</p>
      <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">Carrier Sense Multiple Access: a protocol based on 'listen before you transmit', sensing carrier activity before sending a frame.</p>
    </div>
    <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <p class="font-bold text-xs text-gfg-green">Q32. List the three persistence methods of CSMA.</p>
      <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">1. 1-Persistent CSMA. 2. Non-Persistent CSMA. 3. p-Persistent CSMA.</p>
    </div>
    <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <p class="font-bold text-xs text-gfg-green">Q33. What is 1-persistent CSMA?</p>
      <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">A method where a station continuously senses a busy channel and transmits immediately with probability 1 as soon as the channel becomes idle.</p>
    </div>
    <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <p class="font-bold text-xs text-gfg-green">Q34. What is nonpersistent CSMA?</p>
      <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">A method where a station finding the channel busy halts sensing, waits for a random period of time, and senses again later.</p>
    </div>
    <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <p class="font-bold text-xs text-gfg-green">Q35. What is p-persistent CSMA?</p>
      <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">A slotted method where an idle channel triggers transmission with probability $p$ and deferral to the next time slot with probability $1-p$.</p>
    </div>
    <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <p class="font-bold text-xs text-gfg-green">Q36. Define CSMA/CD.</p>
      <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">Carrier Sense Multiple Access with Collision Detection: a protocol where a station monitors the medium while transmitting, stopping immediately upon collision.</p>
    </div>
    <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <p class="font-bold text-xs text-gfg-green">Q37. What is a jamming signal?</p>
      <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">A 32–48 bit pattern sent immediately upon collision detection to guarantee all other stations on the cable observe the collision.</p>
    </div>
    <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <p class="font-bold text-xs text-gfg-green">Q38. What is binary exponential backoff?</p>
      <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">An algorithm that selects a random wait time $R \\in [0, 2^K - 1]$ after collision $K$, exponentially widening the delay range to prevent repeated collisions.</p>
    </div>
    <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <p class="font-bold text-xs text-gfg-green">Q39. Define CSMA/CA.</p>
      <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">Carrier Sense Multiple Access with Collision Avoidance: a wireless protocol that avoids collisions before transmission using IFS, contention windows, and ACKs.</p>
    </div>
    <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <p class="font-bold text-xs text-gfg-green">Q40. List the three strategies used by CSMA/CA.</p>
      <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">1. Interframe Space (IFS). 2. Contention Window (random backoff). 3. Acknowledgements (ACK).</p>
    </div>
  `;
  if (!data["u2-short-answer-questions"].sections.overview.includes("Q26. Define multiple access")) {
    data["u2-short-answer-questions"].sections.overview += t4ShortQuestions;
  }
}

// 3. Add Topic 4 Long-Answer Questions to u2-long-answer-questions
if (data["u2-long-answer-questions"]) {
  const t4LongQuestions = `
    <!-- Topic 4 Long Exam Questions -->
    <div class="space-y-4 mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
      <h3 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Topic 4 – Multiple Access Protocols Long-Answer University Questions</h3>
      
      <div class="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <h4 class="font-bold text-xs text-blue-600 dark:text-blue-400">Q8. Explain the working principle of Pure ALOHA with a diagram and derive its vulnerable time.</h4>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
          Pure ALOHA allows stations to transmit whenever data is ready. A frame sent at time $t$ collides if another station starts between $t - T_{fr}$ and $t + T_{fr}$. Thus, the vulnerable time is $2T_{fr}$. The throughput equation is $S = G e^{-2G}$. Differentiating with respect to $G$ yields maximum throughput $S_{\\text{max}} = 1/(2e) \\approx 18.4\\%$ at $G = 0.5$.
        </p>
      </div>

      <div class="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <h4 class="font-bold text-xs text-blue-600 dark:text-blue-400">Q9. Explain Slotted ALOHA and derive its throughput formula.</h4>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
          Slotted ALOHA synchronizes time into discrete slots of duration $T_{fr}$. Stations can only transmit at slot boundaries. Collisions can only occur if two or more stations choose the exact same slot, reducing vulnerable time to $T_{fr}$. The throughput equation is $S = G e^{-G}$. Maximizing gives $S_{\\text{max}} = 1/e \\approx 36.8\\%$ at $G = 1.0$, exactly doubling Pure ALOHA's capacity.
        </p>
      </div>

      <div class="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <h4 class="font-bold text-xs text-blue-600 dark:text-blue-400">Q10. Compare 1-persistent, nonpersistent, and p-persistent CSMA.</h4>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
          1-Persistent senses continuously and transmits immediately with $P=1$ upon idle; has low delay at light traffic but 100% collision risk when multiple stations wait for a busy channel to clear. Non-Persistent waits a random time upon sensing a busy channel, greatly reducing collisions under heavy load but increasing delay and idle time. p-Persistent uses a slotted channel and transmits with probability $p$, offering tunable optimization between delay and collision risk.
        </p>
      </div>

      <div class="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <h4 class="font-bold text-xs text-blue-600 dark:text-blue-400">Q11. Explain CSMA/CD with an operational flowchart and detail the Binary Exponential Backoff algorithm.</h4>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
          In CSMA/CD, a station senses the channel, begins transmitting, and monitors for collisions. Upon collision detection, it stops immediately, transmits a 48-bit jam signal, increments collision count $K$, and picks a random delay $R \\in [0, 2^K - 1]$. The backoff time is $T_B = R \\times T_{\\text{slot}}$. This prevents recurring collisions and adapts to network congestion.
        </p>
      </div>

      <div class="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <h4 class="font-bold text-xs text-blue-600 dark:text-blue-400">Q12. Explain CSMA/CA and its three strategies: IFS, Contention Window, and Acknowledgements.</h4>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
          Because wireless nodes cannot listen while transmitting, CSMA/CA avoids collisions prior to transmission. (1) IFS: Mandatory delay after channel idle to prioritize traffic. (2) Contention Window: Random backoff countdown that pauses if the channel becomes busy. (3) Acknowledgements: Receiver sends positive ACK upon successful CRC verification; missing ACK triggers retransmission.
        </p>
      </div>

      <div class="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <h4 class="font-bold text-xs text-blue-600 dark:text-blue-400">Q13. Differentiate between CSMA/CD and CSMA/CA across all architectural features.</h4>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
          CSMA/CD detects collisions during transmission, is used in wired Ethernet, transmits jam signals, and executes backoff after collision. CSMA/CA avoids collisions before transmission, is used in wireless Wi-Fi, requires mandatory ACKs, and executes backoff before transmission during an IFS-controlled contention window.
        </p>
      </div>
    </div>
  `;
  if (!data["u2-long-answer-questions"].sections.overview.includes("Topic 4 – Multiple Access Protocols Long-Answer")) {
    data["u2-long-answer-questions"].sections.overview += t4LongQuestions;
  }
}

// 4. Add Topic 4 MCQs to u2-mcqs
if (data["u2-mcqs"]) {
  const t4Mcqs = [
    {
      question: "Which protocol allows a station to transmit whenever it has data without checking the channel?",
      options: ["CSMA", "Pure ALOHA", "CSMA/CD", "TDMA"],
      correct: 1,
      explanation: "Pure ALOHA allows stations to transmit immediately whenever frames are ready, without carrier sensing or time slot boundaries."
    },
    {
      question: "What is the vulnerable time of Pure ALOHA for a frame duration Tfr?",
      options: ["Tfr", "2Tfr", "Tp", "4Tfr"],
      correct: 1,
      explanation: "In Pure ALOHA, a frame collides if any other frame begins transmission between t - Tfr and t + Tfr, yielding a vulnerable time of 2Tfr."
    },
    {
      question: "What is the maximum theoretical throughput of Pure ALOHA?",
      options: ["18.4%", "36.8%", "50%", "90%"],
      correct: 0,
      explanation: "Pure ALOHA achieves a maximum throughput of S_max = 1/(2e) approx 18.4% at an offered load of G = 0.5."
    },
    {
      question: "When can a station transmit in Slotted ALOHA?",
      options: ["At any instant", "Only at the beginning of a time slot", "Only after a collision", "Only when a router permits"],
      correct: 1,
      explanation: "In Slotted ALOHA, stations must synchronize and are permitted to transmit only at the beginning of discrete time slots."
    },
    {
      question: "What is the maximum throughput of Slotted ALOHA?",
      options: ["18.4%", "25%", "36.8%", "90%"],
      correct: 2,
      explanation: "Slotted ALOHA doubles Pure ALOHA's capacity, reaching S_max = 1/e approx 36.8% at an offered load of G = 1.0."
    },
    {
      question: "What is the basic foundational principle of CSMA?",
      options: ["Transmit without checking", "Listen before transmitting", "Transmit only through a token", "Divide the channel by code"],
      correct: 1,
      explanation: "CSMA (Carrier Sense Multiple Access) requires stations to sense the carrier ('listen before transmitting') to verify the channel is idle."
    },
    {
      question: "Which CSMA persistence method transmits immediately with probability 1 when the channel becomes idle?",
      options: ["Nonpersistent", "1-persistent", "p-persistent only", "Slotted ALOHA"],
      correct: 1,
      explanation: "1-Persistent CSMA continuously listens to a busy channel and transmits immediately with probability 1 as soon as it clears."
    },
    {
      question: "Which CSMA persistence method waits a random time if the channel is found busy?",
      options: ["1-persistent", "Nonpersistent", "Pure ALOHA", "CSMA/CD"],
      correct: 1,
      explanation: "Non-persistent CSMA stops sensing if the channel is busy, waits for a random period, and checks the channel again later."
    },
    {
      question: "What does CD stand for in CSMA/CD?",
      options: ["Channel Division", "Collision Detection", "Code Distribution", "Carrier Delay"],
      correct: 1,
      explanation: "CD stands for Collision Detection, enabling a station to detect collisions while actively transmitting."
    },
    {
      question: "What is the purpose of a jamming signal in CSMA/CD?",
      options: ["Assign an IP address", "Indicate to all stations that a collision has occurred", "Synchronize time slots", "Acknowledge every frame"],
      correct: 1,
      explanation: "A jamming signal is broadcast immediately after collision detection to ensure all stations detect the collision and discard partial frames."
    },
    {
      question: "Which algorithm is used for calculating backoff delay in traditional Ethernet CSMA/CD?",
      options: ["Round Robin", "Binary exponential backoff", "Shortest path", "Stop-and-Wait"],
      correct: 1,
      explanation: "Ethernet CSMA/CD uses the Binary Exponential Backoff algorithm (0 <= R <= 2^K - 1) to determine retransmission delay."
    },
    {
      question: "What does CA stand for in CSMA/CA?",
      options: ["Collision Avoidance", "Channel Assignment", "Code Allocation", "Carrier Access"],
      correct: 0,
      explanation: "CA stands for Collision Avoidance, which seeks to prevent collisions prior to transmission."
    },
    {
      question: "Which of the following is a core strategy used by CSMA/CA?",
      options: ["Jamming signal", "Interframe space (IFS)", "Frequency hopping only", "Token circulation"],
      correct: 1,
      explanation: "CSMA/CA uses Interframe Space (IFS), Contention Windows, and Acknowledgements to avoid collisions."
    },
    {
      question: "Which multiple access protocol is commonly associated with IEEE 802.11 Wi-Fi?",
      options: ["CSMA/CD", "CSMA/CA", "Pure ALOHA only", "Token passing only"],
      correct: 1,
      explanation: "IEEE 802.11 Wi-Fi utilizes CSMA/CA because wireless transceivers cannot reliably detect collisions while transmitting."
    },
    {
      question: "Why can CSMA still experience collisions despite sensing the channel before transmitting?",
      options: ["It does not use frames", "Finite signal propagation delay across the medium", "It uses IP addresses", "It has no physical layer"],
      correct: 1,
      explanation: "Because signals take finite time (propagation delay Tp) to travel down the medium, distant stations may sense the channel as idle before a wavefront arrives."
    }
  ];

  const existingQuestions = new Set(data["u2-mcqs"].sections.quiz.map(q => q.question));
  t4Mcqs.forEach(q => {
    if (!existingQuestions.has(q.question)) {
      data["u2-mcqs"].sections.quiz.push(q);
    }
  });
}

// =============================================================================
// WRITE UPDATED SYLLABUS DATA BACK TO js/topics_u2_syllabus.js
// =============================================================================
const finalOut = `// topics_u2_syllabus.js - Master Academic Topic Content Repository for Unit 2
// Cleaned: All ASCII symbol art removed. Integrated complete Topic 2, Topic 3, & Topic 4 content.
var TOPICS_U2_SYLLABUS = ` + JSON.stringify(data, null, 2) + `;\n
if (typeof window !== 'undefined') window.TOPICS_U2_SYLLABUS = TOPICS_U2_SYLLABUS;
if (typeof global !== 'undefined') global.TOPICS_U2_SYLLABUS = TOPICS_U2_SYLLABUS;
if (typeof module !== 'undefined' && module.exports) module.exports = TOPICS_U2_SYLLABUS;
`;

fs.writeFileSync(syllabusPath, finalOut, 'utf8');
console.log("Successfully wrote updated js/topics_u2_syllabus.js with comprehensive Topic 4 content!");

