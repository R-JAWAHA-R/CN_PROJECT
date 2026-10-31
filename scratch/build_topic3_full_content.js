// build_topic3_full_content.js
// Integrates comprehensive educational content for Topic 3: Medium Access Control (MAC) Sublayer
// from the 14-page PDF into js/topics_u2_syllabus.js and enriches js/cleanDiagramEngine.js.

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
// SUBTOPIC 1: u2-mac-sublayer-intro - Introduction to MAC Sublayer
// =============================================================================
data["u2-mac-sublayer-intro"] = {
  id: "u2-mac-sublayer-intro",
  title: "Introduction to MAC Sublayer",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 3,
  subtopicNumber: 1,
  whyItMatters: "On point-to-point links, only two devices communicate and collisions are impossible. On shared multi-access media (like Wi-Fi or classical Ethernet), uncoordinated transmissions collide and destroy data. The MAC sublayer provides the essential rules that coordinate access to the shared medium.",
  prerequisitesList: [
    { concept: "OSI Layer 2 (Data Link Layer)", meaning: "Node-to-node frame delivery between adjacent network stations" },
    { concept: "Shared Transmission Medium", meaning: "A common physical wire, coaxial bus, fiber, or radio channel shared by multiple nodes" }
  ],
  learningObjectives: [
    "Define the Medium Access Control (MAC) sublayer and its operational scope.",
    "Explain the IEEE 802 architecture model dividing the Data Link Layer into LLC and MAC sublayers.",
    "Understand the distinction between point-to-point links and broadcast multi-access channels.",
    "Identify how the MAC sublayer coordinates competing station transmissions to prevent collisions."
  ],
  infobox: {
    layer: "Layer 2 (Lower Sublayer - IEEE 802)",
    standard: "IEEE 802 Architecture / IEEE 802.3, 802.11, 802.15",
    type: "Sublayer Architectural Foundation",
    prerequisites: ["u2-dll-intro", "framing"],
    relatedConcepts: ["u2-need-for-mac-sublayer", "u2-mac-functions-responsibilities", "channel-allocation"],
    compareWith: ["u2-mac-functions-responsibilities"],
    primaryUses: ["Ethernet local area networks, Wi-Fi wireless networks, cellular uplink channels"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8d/OSI_Model_v1.svg",
  imageCaption: "Figure: Position of the Medium Access Control (MAC) Sublayer in the IEEE 802 & OSI Reference Models.",
  sections: {
    overview: `
      <p>The <strong>Medium Access Control (MAC) sublayer</strong> is the lower sublayer of the Data Link Layer in the IEEE 802 local area network architecture. It controls how multiple network devices share, coordinate, and access a common physical transmission medium, such as a coaxial cable, twisted-pair hub, or wireless radio channel.</p>
      
      <p>When several stations are connected to the same communication channel, they require formal protocol rules to decide:</p>
      <ul class="wiki-bullet-list">
        <li><strong>Which device</strong> is permitted to transmit at any given time.</li>
        <li><strong>When</strong> a device can safely transmit without causing interference.</li>
        <li><strong>How to resolve</strong> competing simultaneous transmission attempts to prevent or recover from packet collisions.</li>
      </ul>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">The IEEE 802 Sublayer Division</h3>
      <p>In standard point-to-point links (like HDLC or PPP), there is only one sender and one receiver, so medium access is trivial. However, for local area networks where many computers share one medium, the <strong>IEEE 802 committee</strong> divided OSI Layer 2 into two distinct sublayers:</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div class="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900">
          <div class="text-xs font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider mb-1">Upper Sublayer</div>
          <h4 class="font-extrabold text-sm text-gray-900 dark:text-white mb-2">Logical Link Control (LLC - IEEE 802.2)</h4>
          <p class="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
            Responsible for traditional data-link control functions that are independent of the physical medium: flow control, error control, framing, and multiplexing multiple network-layer protocols via Service Access Points (SAP).
          </p>
        </div>

        <div class="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900">
          <div class="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-1">Lower Sublayer</div>
          <h4 class="font-extrabold text-sm text-gray-900 dark:text-white mb-2">Medium Access Control (MAC)</h4>
          <p class="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
            Responsible for managing access to the shared physical transmission medium, frame delimiter generation, 48-bit physical addressing (MAC addresses), error detection (CRC/FCS), and collision avoidance/detection.
          </p>
        </div>
      </div>
    `,
    eli10: "Imagine a classroom where 30 students all share one blackboard. If everyone runs up to write at the exact same second, chalk will break and nobody can read anything! The MAC sublayer is the teacher standing by the blackboard who calls students up one by one or establishes a turn-taking rule so everyone gets to write without bumping into each other.",
    analogy: "A shared multi-party phone conference call: without conversational etiquette, if three people speak at once, all voices garble into noise. Etiquette rules (pausing, listening before speaking, yielding) act as the MAC sublayer of human conversation.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">How the MAC Sublayer Coordinates Media Sharing</h3>
      <p>The MAC sublayer sits directly on top of the Physical Layer and abstracts hardware signaling away from the Logical Link Control sublayer:</p>
      <ol class="wiki-ordered-list">
        <li><strong>Media Sensing:</strong> The station's MAC sublayer constantly monitors the physical carrier signal to determine whether the medium is currently idle or busy.</li>
        <li><strong>Access Arbitration:</strong> Based on the specific MAC protocol in use (e.g., CSMA/CD in Ethernet, CSMA/CA in Wi-Fi, or Token Passing in Token Ring), the MAC sublayer determines whether the station is permitted to transmit.</li>
        <li><strong>Encapsulation:</strong> When permitted, the MAC sublayer prepends a 48-bit destination MAC address, source MAC address, preamble, and appends a 32-bit CRC Frame Check Sequence (FCS).</li>
        <li><strong>Signal Injection:</strong> The MAC sublayer passes the serialized frame down to the Physical Layer transceiver for conversion into voltage pulses, light flashes, or radio waves.</li>
        <li><strong>Collision Management:</strong> If another station's signal collides with the transmission, the MAC sublayer aborts transmission immediately, transmits a jam signal, and calculates a backoff delay.</li>
      </ol>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">IEEE 802 Protocol Family Relationship</h3>
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Layer</th>
            <th>Protocol Standard</th>
            <th>Primary Responsibility</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Layer 3</strong></td>
            <td>IP / IPv6 / ICMP</td>
            <td>End-to-end logical packet routing across internetworks.</td>
          </tr>
          <tr>
            <td><strong>Layer 2 (Upper)</strong></td>
            <td>IEEE 802.2 (LLC)</td>
            <td>Flow control, error control, multiplexing Network Layer protocols.</td>
          </tr>
          <tr class="bg-emerald-50 dark:bg-emerald-900/30 font-bold">
            <td><strong>Layer 2 (Lower)</strong></td>
            <td>IEEE 802.3 (Ethernet) / 802.11 (Wi-Fi) / 802.15 (Bluetooth) MAC</td>
            <td>Arbitrating medium access, 48-bit physical addressing, framing, CRC error detection.</td>
          </tr>
          <tr>
            <td><strong>Layer 1</strong></td>
            <td>Physical (1000BASE-T, 802.11ax RF, Optical)</td>
            <td>Raw signal transmission, modulation, clock synchronization.</td>
          </tr>
        </tbody>
      </table>
    `,
    workedExamples: {
      level1: "<strong>Question:</strong> What are the two sublayers of the Data Link Layer according to the IEEE 802 standard, and what is the primary role of each?<br><br><strong>Answer:</strong> The two sublayers are:<br>1. <strong>Logical Link Control (LLC):</strong> Handles flow control, error control, and network layer protocol identification.<br>2. <strong>Medium Access Control (MAC):</strong> Manages access to the shared physical transmission medium and handles physical hardware addressing.",
      level2: "<strong>Problem:</strong> Why is the MAC sublayer absent in point-to-point leased line protocols such as PPP (Point-to-Point Protocol)?<br><br><strong>Answer:</strong> On a dedicated point-to-point link, there are exactly two communicating nodes connected directly by a dedicated wire or fiber. Because no other station shares the medium, packet collisions are physically impossible. Medium access contention does not exist, so a separate MAC sublayer is completely unnecessary.",
      level3: "<strong>Analysis:</strong> Explain how the separation of LLC and MAC sublayers provides modularity in network interface card (NIC) design.<br><br><strong>Answer:</strong> By separating LLC and MAC, the upper LLC sublayer remains completely identical regardless of whether the physical medium is copper Ethernet, fiber optics, or wireless Wi-Fi. Only the MAC sublayer needs to change its access algorithm (e.g., CSMA/CD for wired vs. CSMA/CA for wireless), enabling upper network protocols (IP) to operate over any physical link without modification."
    },
    advantagesLimitations: `
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th>With MAC Sublayer</th>
            <th>Without MAC Sublayer (Raw Medium)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Collision Control</strong></td>
            <td>Controlled access; collisions minimized or handled cleanly.</td>
            <td>Chaotic overlap; massive signal interference and packet loss.</td>
          </tr>
          <tr>
            <td><strong>Scalability</strong></td>
            <td>Enables dozens or hundreds of devices to share one wire/radio channel.</td>
            <td>Restricted strictly to isolated two-node point-to-point links.</td>
          </tr>
          <tr>
            <td><strong>Addressing</strong></td>
            <td>Standard 48-bit MAC addresses uniquely identify local devices.</td>
            <td>No hardware device identification on shared broadcast mediums.</td>
          </tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "Ethernet Network Interface Cards (NICs) adhering to IEEE 802.3.",
      "Wi-Fi chipsets (802.11ax/be) coordinating wireless radio channel contention.",
      "DOCSIS cable modems arbitrating coaxial cable upstream transmissions to the ISP."
    ],
    quiz: [
      {
        question: "According to the IEEE 802 architecture model, which sublayer of the Data Link Layer is responsible for controlling access to the shared transmission medium?",
        options: [
          "Medium Access Control (MAC) sublayer",
          "Logical Link Control (LLC) sublayer",
          "Network Layer",
          "Physical Layer"
        ],
        correct: 0,
        explanation: "The MAC sublayer is the lower sublayer of Layer 2 responsible for arbitrating and controlling access to shared communication media."
      },
      {
        question: "Which function is handled by the Logical Link Control (LLC) sublayer rather than the MAC sublayer?",
        options: [
          "Flow control and error control",
          "CSMA/CD collision detection",
          "Physical MAC addressing",
          "Generating frame preambles"
        ],
        correct: 0,
        explanation: "LLC handles flow control, error control, and network protocol identification, while MAC handles physical access and addressing."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 12 (Multiple Access), Section 12.1.", url: "" },
      { cite: "IEEE Std 802-2014: IEEE Standard for Local and Metropolitan Area Networks: Overview and Architecture.", url: "" }
    ]
  }
};

// =============================================================================
// SUBTOPIC 2: u2-need-for-mac-sublayer - Need for MAC Sublayer
// =============================================================================
data["u2-need-for-mac-sublayer"] = {
  id: "u2-need-for-mac-sublayer",
  title: "Need for MAC Sublayer",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 3,
  subtopicNumber: 2,
  whyItMatters: "Without medium access control, multiple transmitting stations on a shared medium produce simultaneous overlapping signals that interfere destructively, rendering all transmitted data completely undecodable.",
  prerequisitesList: [
    { concept: "u2-mac-sublayer-intro", meaning: "Definition of MAC sublayer and IEEE 802 sublayer division" },
    { concept: "Signal Collisions", meaning: "Destructive electrical/radio interference caused by simultaneous transmissions" }
  ],
  learningObjectives: [
    "Analyze why shared transmission media require explicit access control rules.",
    "Walk through the classic 5-computer collision scenario on a shared bus cable.",
    "Explain what a collision is physically and why corrupted frames must be discarded.",
    "Identify how MAC procedures coordinate access to maximize useful throughput."
  ],
  infobox: {
    layer: "Layer 2 (MAC Sublayer)",
    standard: "IEEE 802.3 / IEEE 802.11",
    type: "Contention & Collision Rationale",
    prerequisites: ["u2-mac-sublayer-intro"],
    relatedConcepts: ["channel-allocation", "u2-mac-functions-responsibilities", "csma-protocols"],
    compareWith: ["u2-mac-sublayer-intro"],
    primaryUses: ["Preventing data corruption on shared coaxial, twisted-pair hub, and wireless radio networks"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Ethernet-broadcast-collision_%28hub%29.svg",
  imageCaption: "Figure: Destructive Signal Collision on a Shared Multi-Drop Cable when Two Stations Transmit Simultaneously.",
  sections: {
    overview: `
      <p>The primary reason the <strong>MAC sublayer is strictly required</strong> is the existence of <strong>shared broadcast communication media</strong>.</p>
      
      <p>In local area networks (LANs), running a dedicated physical wire between every single pair of computers is prohibitively expensive and topologically impractical. Instead, multiple computers connect to a <strong>single shared transmission cable</strong> or broadcast across a common <strong>radio frequency band</strong>.</p>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">The 5-Computer Collision Scenario</h3>
      <p>Imagine five computers (Computer 1, 2, 3, 4, and 5) all tapped into the same shared coaxial cable or Wi-Fi channel:</p>
      <ul class="wiki-bullet-list">
        <li>If Computer 1 and Computer 3 decide to transmit frames at the exact same instant, both inject electrical voltages or electromagnetic radio waves into the common medium.</li>
        <li>As the two electrical signals propagate down the wire, they superimpose upon one another according to the laws of wave interference.</li>
        <li>The resulting voltage waveform exceeds legal signal thresholds and distorts the bit representations. This destructive overlap is called a <strong>collision</strong>.</li>
        <li>Every station on the wire receives unintelligible noise. The CRC checks fail, and both frames are completely destroyed and discarded.</li>
      </ul>

      <p class="mt-3">The MAC sublayer is needed to provide <strong>traffic coordination rules</strong> that govern which station may transmit, when it may transmit, and how to detect or avoid simultaneous conflicting transmissions.</p>
    `,
    eli10: "Imagine five kids sharing one walkie-talkie channel. If Kid A and Kid C both hold down their talk buttons and shout at the same time, all the other kids only hear loud screeching noise! They need a rule: 'Listen first to see if anyone is speaking, and if you both start speaking together, stop, wait a few seconds, and try again.' That rule is the MAC sublayer.",
    analogy: "A single-lane bridge on a country road: if two cars enter the bridge from opposite sides at full speed, they will crash in the middle. The bridge needs traffic lights, a stop sign, or yield rules (the MAC sublayer) to ensure only one car crosses at a time.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Why Uncontrolled Access Collapses Network Performance</h3>
      <p>If computers transmit whenever they generate data without medium access coordination (pure uncoordinated access):</p>
      <ol class="wiki-ordered-list">
        <li><strong>Low Traffic:</strong> When traffic is light, collisions are rare and frames arrive intact.</li>
        <li><strong>Moderate Traffic:</strong> As more stations become active, the probability of transmission overlap increases exponentially.</li>
        <li><strong>Heavy Traffic (Congestion Collapse):</strong> When many stations generate frames, virtually every transmission collides with another. Channel utilization plummets toward 0%, and the shared link becomes completely unusable despite maximum physical activity!</li>
      </ol>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">How the MAC Sublayer Solves This Problem</h3>
      <p>The MAC sublayer introduces four tiers of coordination mechanisms:</p>
      <ul class="wiki-bullet-list">
        <li><strong>Carrier Sensing:</strong> Requires a station to 'listen before talking' to ensure the medium is idle.</li>
        <li><strong>Collision Detection (CSMA/CD):</strong> Requires transmitting stations to monitor the cable during transmission. If a voltage spike indicates a collision, transmission halts immediately, saving bandwidth.</li>
        <li><strong>Randomized Backoff:</strong> When a collision occurs, contending stations do not retry immediately; they wait for randomized time periods (Binary Exponential Backoff) to prevent repeating the collision.</li>
        <li><strong>Collision Avoidance (CSMA/CA):</strong> Uses reservation handshakes (RTS/CTS) and interframe spaces in wireless channels where collision detection is physically impossible.</li>
      </ul>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Physical Characteristics of a Cable Collision</h3>
      <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-xs space-y-2">
        <p><strong>1. Signal Superposition:</strong> When Station A transmits at $+V$ volts and Station B transmits simultaneously at $+V$ volts, the voltages add linearly at the collision point to produce $\approx +2V$ volts.</p>
        <p><strong>2. Threshold Detection:</strong> In legacy 10BASE5 / 10BASE2 Ethernet, the transceiver's collision detection circuitry detects when the average DC voltage on the coaxial cable exceeds $-1.5\\text{ V}$ (active signal is typically $-1.0\\text{ V}$ to $-0.2\\text{ V}$).</p>
        <p><strong>3. Jam Signal:</strong> The detecting station immediately broadcasts a 32-bit to 48-bit <em>Jam Signal</em> to ensure all other stations on the bus observe the collision and discard their partial frames.</p>
      </div>
    `,
    workedExamples: {
      level1: "<strong>Question:</strong> What is a packet collision in a computer network, and why does it occur?<br><br><strong>Answer:</strong> A collision occurs when two or more stations connected to a shared communication medium transmit frames at the same time. The signals physically overlap on the medium, interfering destructively with each other and corrupting the data in both frames.",
      level2: "<strong>Problem:</strong> Explain why a shared Ethernet network with a multiport hub requires a MAC sublayer protocol, whereas a network with a modern Ethernet switch does not suffer from collisions.<br><br><strong>Answer:</strong> A hub is a simple Layer 1 device that electrically connects all incoming wires into one single shared collision domain; if two stations transmit to the hub simultaneously, their electrical signals collide on the shared bus. A modern switch is a Layer 2 device that buffers frames in memory and creates dedicated point-to-point micro-segments on each port, eliminating collisions entirely in full-duplex mode.",
      level3: "<strong>Analysis:</strong> If $N$ stations share a broadcast cable and each station transmits with probability $p$ in a given time slot, what is the probability of a successful transmission without collisions?<br><br><strong>Answer:</strong> A transmission is successful if exactly one station transmits and all other $N-1$ stations remain silent. The probability is $P(\\text{success}) = N \\cdot p \\cdot (1 - p)^{N-1}$. Without MAC coordination, as $N$ grows large, $P(\\text{success})$ drops dramatically unless $p$ is scaled down dynamically (such as through exponential backoff)."
    },
    advantagesLimitations: `
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Scenario</th>
            <th>Collision Behavior</th>
            <th>Resulting Network Health</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Uncontrolled Transmission</strong></td>
            <td>Stations transmit blindly; frequent overlapping.</td>
            <td>Catastrophic throughput collapse under moderate load.</td>
          </tr>
          <tr>
            <td><strong>MAC Sublayer Coordination</strong></td>
            <td>Stations sense channel, back off randomly, or use scheduled turns.</td>
            <td>Bounded contention, equitable fairness, and high sustainable throughput.</td>
          </tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "Shared coaxial Ethernet installations (10BASE5 / 10BASE2).",
      "Ethernet networks operating with legacy multiport repeating hubs.",
      "All IEEE 802.11 Wi-Fi networks sharing unlicensed 2.4 GHz, 5 GHz, and 6 GHz spectrum."
    ],
    quiz: [
      {
        question: "What happens when two stations transmit at the same time on a shared communication cable?",
        options: [
          "Their signals interfere destructively, causing a collision that corrupts both frames",
          "The cable automatically speeds up to deliver both frames in parallel",
          "The second frame is safely buffered inside the physical copper wire",
          "One frame is automatically converted into an acknowledgement"
        ],
        correct: 0,
        explanation: "Simultaneous transmissions produce overlapping electrical signals (a collision) that corrupt the bits of all transmitted frames."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 12, Section 12.1.", url: "" }
    ]
  }
};

// =============================================================================
// SUBTOPIC 3: u2-mac-functions-responsibilities - Functions and Responsibilities
// =============================================================================
data["u2-mac-functions-responsibilities"] = {
  id: "u2-mac-functions-responsibilities",
  title: "Functions and Responsibilities of MAC Sublayer",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 3,
  subtopicNumber: 3,
  whyItMatters: "The MAC sublayer bridges high-level network packets with raw physical transmission. Its six core functions—ranging from 48-bit hardware addressing to collision recovery—form the technical bedrock of all LAN and WLAN standards.",
  prerequisitesList: [
    { concept: "u2-need-for-mac-sublayer", meaning: "Why shared media require collision coordination" },
    { concept: "MAC Address Format", meaning: "48-bit globally unique hardware identifier (EUI-48)" }
  ],
  learningObjectives: [
    "Enumerate and explain the 6 main operational functions of the MAC sublayer.",
    "Master the 5-point comparison between the Logical Link Control (LLC) and MAC sublayers.",
    "Understand the structure and purpose of physical MAC addressing.",
    "Detail how the MAC sublayer handles frame preparation, error checking, and collision recovery."
  ],
  infobox: {
    layer: "Layer 2 (MAC Sublayer)",
    standard: "IEEE 802.1 / IEEE 802.3 / IEEE 802.11",
    type: "Sublayer Functional Specification",
    prerequisites: ["u2-mac-sublayer-intro", "u2-need-for-mac-sublayer"],
    relatedConcepts: ["channel-allocation", "mac-address", "framing"],
    compareWith: ["u2-mac-sublayer-intro"],
    primaryUses: ["LAN frame parsing, physical device identification, access scheduling"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/13/Ethernet_Type_II_Frame_format.svg",
  imageCaption: "Figure: Ethernet MAC Frame Structure showing Destination & Source MAC Addresses and FCS Trailer.",
  sections: {
    overview: `
      <p>The <strong>Medium Access Control (MAC) sublayer</strong> is entrusted with six fundamental operational responsibilities that ensure reliable, orderly, and collision-free communication over shared physical media.</p>
      
      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">The Six Core Functions of the MAC Sublayer</h3>
      <ol class="wiki-ordered-list">
        <li><strong>Physical Hardware Addressing:</strong> Assigns and checks 48-bit globally unique physical addresses (MAC addresses, e.g., <code>00:1A:2B:3C:4D:5E</code>) burned into each device's Network Interface Card (NIC) to identify source and destination stations on the local network.</li>
        <li><strong>Medium Access Control:</strong> Governs channel access protocol rules to determine exactly when a device is permitted to transmit its data onto the shared medium.</li>
        <li><strong>Frame Handling & Delimiting:</strong> Constructs outgoing frames by attaching preambles, start frame delimiters, address headers, and FCS trailers, and disassembles incoming bitstreams back into frames.</li>
        <li><strong>Collision Handling & Recovery:</strong> Executes channel access algorithms (such as CSMA/CD or CSMA/CA) to detect collisions, transmit jam signals, and schedule randomized backoff retransmissions.</li>
        <li><strong>Transmission Coordination:</strong> Coordinates multiple competing devices sharing the same channel to maintain fair access opportunities and prevent channel starvation.</li>
        <li><strong>Access Management:</strong> Enforces access priorities, quality-of-service parameters, and adherence to physical medium standards.</li>
      </ol>
    `,
    eli10: "Think of the MAC sublayer as a mailroom clerk who: (1) stamps the recipient's exact room number on the envelope, (2) puts the letter into an official envelope with a wax seal, (3) checks through the door to see if the hallway is clear, (4) jumps back if someone else walks through at the same time, and (5) makes sure everyone takes turns using the mail chute.",
    analogy: "Like a traffic roundabout controller: assigning license plate identification to vehicles, enforcing right-of-way rules before entering the circle, and managing vehicle merges safely.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">LLC Sublayer vs. MAC Sublayer: Comprehensive Comparison</h3>
      <p>According to <em>Behrouz A. Forouzan</em> and the <em>IEEE 802 model</em>, the two sublayers of the Data Link Layer divide responsibilities as follows:</p>
      
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Comparative Feature</th>
            <th>LLC Sublayer (Logical Link Control)</th>
            <th>MAC Sublayer (Medium Access Control)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Full Form</strong></td>
            <td>Logical Link Control</td>
            <td>Medium Access Control</td>
          </tr>
          <tr>
            <td><strong>Position in DLL</strong></td>
            <td>Upper sublayer (interfaces with Network Layer)</td>
            <td>Lower sublayer (interfaces directly with Physical Layer)</td>
          </tr>
          <tr>
            <td><strong>Main Responsibility</strong></td>
            <td>Data-link control functions independent of physical media</td>
            <td>Arbitrating and controlling access to the shared medium</td>
          </tr>
          <tr>
            <td><strong>Core Concerns</strong></td>
            <td>Flow control, error control, packet sequencing</td>
            <td>Transmission access, collision handling, framing</td>
          </tr>
          <tr>
            <td><strong>Addressing Used</strong></td>
            <td>Identifies network-layer protocol (SAP / EtherType)</td>
            <td>Uses 48-bit physical MAC addresses (EUI-48)</td>
          </tr>
          <tr>
            <td><strong>Governing Standard</strong></td>
            <td>IEEE 802.2 standard</td>
            <td>IEEE 802.3 (Ethernet), 802.11 (Wi-Fi), 802.15 (Bluetooth)</td>
          </tr>
        </tbody>
      </table>
      
      <div class="wiki-callout note mt-4">
        <div class="callout-header font-bold text-blue-800 dark:text-blue-300">💡 Important IEEE 802 Architectural Takeaway</div>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">LLC and MAC together form the complete Data Link Layer. LLC provides a uniform, standardized software interface to Layer 3, while MAC provides the media-specific hardware drivers that adapt to different cables and wireless frequencies.</p>
      </div>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">MAC Physical Addressing Details</h3>
      <p>A standard MAC address consists of 48 bits (6 octets), usually written in hexadecimal format (e.g., <code>00:1B:44:11:3A:B7</code>):</p>
      <ul class="wiki-bullet-list">
        <li><strong>Organizationally Unique Identifier (OUI):</strong> The first 24 bits (3 octets) identify the hardware manufacturer (assigned by IEEE, e.g., Cisco, Intel, Apple).</li>
        <li><strong>Network Interface Controller Specific:</strong> The last 24 bits (3 octets) are assigned uniquely by the vendor to that specific network chip.</li>
        <li><strong>Unicast vs. Multicast Bit:</strong> The least significant bit of the first octet determines if the address is Unicast (0) or Multicast (1). Broadcast is all 1s (<code>FF:FF:FF:FF:FF:FF</code>).</li>
      </ul>
    `,
    workedExamples: {
      level1: "<strong>Question:</strong> State four primary functions performed by the MAC sublayer.<br><br><strong>Answer:</strong> 1. Physical addressing (MAC addresses). 2. Medium access control (deciding when a node can transmit). 3. Frame handling and delimiting (preamble, headers, FCS). 4. Collision detection and recovery.",
      level2: "<strong>Problem:</strong> Contrast how addressing is handled in the LLC sublayer versus the MAC sublayer.<br><br><strong>Answer:</strong> The LLC sublayer uses <strong>Service Access Points (SAPs)</strong> or EtherType fields to identify which Layer 3 protocol (e.g., IPv4, IPv6, ARP) generated the payload. The MAC sublayer uses <strong>48-bit physical MAC addresses</strong> to identify the hardware sender and recipient stations on the local physical link.",
      level3: "<strong>Analysis:</strong> Why did the IEEE 802 committee choose to split the Data Link Layer into two sublayers rather than keeping it as a single unified layer like in the original OSI 7-layer model?<br><br><strong>Answer:</strong> In the original OSI model, Layer 2 was conceived primarily for point-to-point connections. When local area networks emerged with diverse media (coaxial bus, star twisted-pair, token ring, wireless), having a single layer required rewriting flow and error control for every physical variant. Splitting Layer 2 into LLC (media-independent) and MAC (media-specific) allowed one unified LLC to run seamlessly over many interchangeable MAC implementations."
    },
    advantagesLimitations: `
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Sublayer Component</th>
            <th>Primary Benefit</th>
            <th>Hardware Dependency</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>LLC (Upper)</strong></td>
            <td>Hardware-agnostic; presents uniform interface to IP layer.</td>
            <td>Purely software / firmware based.</td>
          </tr>
          <tr>
            <td><strong>MAC (Lower)</strong></td>
            <td>Tightly optimized for specific physical media characteristics.</td>
            <td>Implemented directly on NIC hardware and ASIC controllers.</td>
          </tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "Ethernet controllers implementing IEEE 802.3 MAC framing.",
      "Wireless Network Interface Controllers (WNICs) managing IEEE 802.11 MAC states.",
      "Embedded microcontrollers with integrated Ethernet MAC blocks."
    ],
    quiz: [
      {
        question: "Which of the following is NOT a primary responsibility of the MAC sublayer?",
        options: [
          "Routing packets across multiple autonomous internetworks",
          "Physical addressing using 48-bit MAC addresses",
          "Controlling when a device can transmit on a shared medium",
          "Handling collisions and backoff timing"
        ],
        correct: 0,
        explanation: "Routing packets across multiple internetworks is the responsibility of the Network Layer (Layer 3), not the MAC sublayer."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 12.", url: "" },
      { cite: "IEEE 802 Overview and Architecture Specification.", url: "" }
    ]
  }
};

// =============================================================================
// SUBTOPIC 4: channel-allocation - Channel Allocation Problem
// =============================================================================
data["channel-allocation"] = {
  id: "channel-allocation",
  title: "Channel Allocation Problem",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 3,
  subtopicNumber: 4,
  whyItMatters: "Channel allocation is the fundamental problem of how to divide limited communication resources (bandwidth and time) among multiple competing network stations to maximize throughput and minimize delay.",
  prerequisitesList: [
    { concept: "u2-need-for-mac-sublayer", meaning: "Collisions and shared medium access" },
    { concept: "Bandwidth & Channel Capacity", meaning: "Frequency range and maximum bit carrying capability" }
  ],
  learningObjectives: [
    "Define the channel allocation problem formally.",
    "Identify the 5 core reasons why channel allocation is necessary in computer networks.",
    "Master the 6 primary engineering objectives of channel allocation.",
    "Differentiate between Static Channel Allocation and Dynamic Channel Allocation."
  ],
  infobox: {
    layer: "Layer 2 (MAC Sublayer)",
    standard: "Communication Theory & IEEE 802 Standards",
    type: "Resource Allocation Theory",
    prerequisites: ["u2-mac-sublayer-intro", "u2-need-for-mac-sublayer"],
    relatedConcepts: ["u2-fdma", "u2-tdma", "u2-dynamic-channel-allocation"],
    compareWith: ["u2-static-vs-dynamic-channel-allocation"],
    primaryUses: ["Spectrum licensing, cellular multi-access design, Wi-Fi channel planning"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Multiple_Access.png",
  imageCaption: "Figure: Channel Allocation Taxonomy: Static Channelization vs Dynamic Random and Controlled Access.",
  sections: {
    overview: `
      <p>The <strong>channel allocation problem</strong> refers to the challenge of deciding how a common communication channel or limited frequency bandwidth should be shared and distributed among multiple communicating devices.</p>
      
      <p>When several stations connect to a common communication medium, the network architecture must establish formal rules to distribute the available transmission capacity. The overarching objective is to allow stations to communicate efficiently while reducing interference, collisions, and unnecessary waiting time.</p>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Why Is Channel Allocation Required? (5 Key Network Conditions)</h3>
      <p>Consider a network with ten computers connected to one shared communication channel:</p>
      <ul class="wiki-bullet-list">
        <li><strong>Universal Transmission Need:</strong> Every computer on the network may need to transmit data at any point.</li>
        <li><strong>Strict Bandwidth Limits:</strong> The physical channel has a finite, bounded bandwidth (e.g., 100 MHz or 1 Gbps) that cannot satisfy unlimited simultaneous demand.</li>
        <li><strong>Simultaneous Competing Attempts:</strong> Two or more computers frequently attempt to transmit at the exact same instant, creating collisions.</li>
        <li><strong>Traffic Asymmetry:</strong> Some computers generate massive files (video streams, database transfers), while others send tiny occasional packets (DNS lookups, sensor pings).</li>
        <li><strong>Bursty Inactivity:</strong> Most computers remain completely idle for long stretches of time and generate traffic in sudden, unpredictable bursts.</li>
      </ul>
      <p class="mt-2">Without an intelligent allocation method, the shared channel will swing between complete congestion collapse during busy moments and wasteful idle capacity during quiet intervals.</p>
    `,
    eli10: "Imagine 10 kids at an amusement park who all want to ride on one single swing. If all 10 kids try to jump on the swing at once, they crash and nobody swings. The channel allocation problem is deciding: do you divide the day into 10 equal turns (even if half the kids fall asleep), or do you let kids line up and take the swing only when they are awake and ready to play?",
    analogy: "City water pipes: how the municipal water department distributes the finite flow capacity of a main water pipe among residential homes, factories, and fire hydrants fairly without water pressure collapsing.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">The Six Primary Objectives of Channel Allocation</h3>
      <ol class="wiki-ordered-list">
        <li><strong>High Efficiency:</strong> Utilize the available physical bandwidth effectively without wasting capacity on idle overhead.</li>
        <li><strong>Fairness:</strong> Provide every station an equitable, reasonable opportunity to access the medium; prevent aggressive stations from starving others.</li>
        <li><strong>Low Delay:</strong> Minimize the latency and waiting time experienced by a station between generating a frame and transmitting it.</li>
        <li><strong>Collision Reduction:</strong> Eliminate or drastically reduce simultaneous conflicting transmissions that destroy data.</li>
        <li><strong>Maximum Throughput:</strong> Maximize the aggregate volume of useful payload data successfully delivered across the link per unit time.</li>
        <li><strong>Resource Utilization:</strong> Prevent channel capacity from sitting idle when active stations have pending data to transmit.</li>
      </ol>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Two Fundamental Paradigms of Channel Allocation</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs">
          <h4 class="font-bold text-blue-900 dark:text-blue-300 text-sm mb-1">1. Static Channel Allocation</h4>
          <p class="text-gray-700 dark:text-gray-300">
            Resources are divided into fixed portions and assigned to stations in advance (predetermined). Each station receives a dedicated frequency band (FDMA) or recurring time slot (TDMA), whether it is actively transmitting or completely idle.
          </p>
        </div>
        <div class="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs">
          <h4 class="font-bold text-emerald-900 dark:text-emerald-300 text-sm mb-1">2. Dynamic Channel Allocation</h4>
          <p class="text-gray-700 dark:text-gray-300">
            Resources are allocated on demand according to current transmission requirements. The channel is not reserved in advance; instead, active stations request, contend for, or are scheduled access when they have data to send.
          </p>
        </div>
      </div>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Mathematical Formulation of Allocation Trade-Offs</h3>
      <p>Let $C$ be the total channel capacity in bits per second, and let $N$ be the number of stations. If traffic arrives at each station according to a Poisson process with average rate $\\lambda$ frames/sec, with mean frame length $1/\\mu$ bits:</p>
      <div class="p-3 my-2 bg-slate-100 dark:bg-slate-800 rounded font-mono text-xs text-center">
        $$\\text{Under Static FDMA: } T_{\\text{static}} = \\frac{1}{\\mu (C/N) - \\lambda} = \\frac{N}{\\mu C - N\\lambda}$$
        $$\\text{Under Dynamic Multiplexing: } T_{\\text{dynamic}} = \\frac{1}{\\mu C - N\\lambda}$$
      </div>
      <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">Notice that the average delay in static channel allocation is exactly $N$ times higher than in dynamic allocation ($T_{\\text{static}} = N \\cdot T_{\\text{dynamic}}$)! This proves mathematically why static allocation causes severe delay for bursty network traffic.</p>
    `,
    workedExamples: {
      level1: "<strong>Question:</strong> State the channel allocation problem in one concise sentence.<br><br><strong>Answer:</strong> The channel allocation problem refers to deciding how a shared communication medium of limited bandwidth should be divided and allocated among multiple communicating stations.",
      level2: "<strong>Problem:</strong> List four primary engineering objectives that any channel allocation scheme attempts to optimize.<br><br><strong>Answer:</strong> 1. High throughput (maximizing useful data delivered). 2. Low transmission delay (minimizing waiting time). 3. Fairness (equitable channel access for all stations). 4. High resource utilization (avoiding idle wasted bandwidth).",
      level3: "<strong>Analysis:</strong> Why does bursty computer traffic make static channel allocation highly inefficient?<br><br><strong>Answer:</strong> Computer traffic is bursty: a station may generate millions of bits during a web page load or file transfer, and then sit idle for minutes while the user reads. In static allocation, each station receives a fixed slice of bandwidth. When an active station needs high speed, it is throttled to its small fraction, while the slices assigned to idle stations sit completely empty and wasted."
    },
    advantagesLimitations: `
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Objective</th>
            <th>Static Allocation Achievement</th>
            <th>Dynamic Allocation Achievement</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Collision Prevention</strong></td>
            <td>100% collision-free by design.</td>
            <td>Depends on protocol (zero in token/polling; possible in CSMA).</td>
          </tr>
          <tr>
            <td><strong>Bursty Resource Efficiency</strong></td>
            <td>Poor: idle station slices cannot be used by others.</td>
            <td>Excellent: full channel bandwidth available to active nodes.</td>
          </tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "Radio frequency spectrum allocation by government telecommunications bodies (FCC / ITU).",
      "Local Area Network multiple access protocol design (IEEE 802 standards).",
      "Satellite transponder bandwidth leasing and channelization."
    ],
    quiz: [
      {
        question: "What is the primary trade-off of Static Channel Allocation when applied to bursty computer traffic?",
        options: [
          "It wastes bandwidth because allocated resources remain idle when stations are not transmitting",
          "It causes excessive packet collisions at high loads",
          "It requires stations to maintain random backoff timers",
          "It cannot support physical MAC addressing"
        ],
        correct: 0,
        explanation: "Static allocation assigns fixed resources in advance; if a station has no data to send, its allocated bandwidth sits idle and cannot be utilized by other active stations."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 12.", url: "" },
      { cite: "Andrew S. Tanenbaum, Computer Networks, 5th Edition, Chapter 4 (The Medium Access Control Sublayer).", url: "" }
    ]
  }
};

// =============================================================================
// SUBTOPIC 5: u2-fdma - Frequency Division Multiple Access (FDMA)
// =============================================================================
data["u2-fdma"] = {
  id: "u2-fdma",
  title: "Frequency Division Multiple Access (FDMA)",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 3,
  subtopicNumber: 5,
  whyItMatters: "FDMA is the foundational frequency-based static channelization technique. By subdividing total spectrum into distinct non-overlapping frequency bands, it allows stations to transmit continuously without mutual interference.",
  prerequisitesList: [
    { concept: "channel-allocation", meaning: "Static channel allocation concept" },
    { concept: "Frequency Spectrum", meaning: "Electromagnetic carrier frequencies and bandwidth in Hertz" }
  ],
  learningObjectives: [
    "Define Frequency Division Multiple Access (FDMA) and explain its working principle.",
    "Solve bandwidth allocation numerical problems using $B_{\\text{station}} = B_{\\text{total}} / N$.",
    "Calculate unused allocated bandwidth when stations are inactive.",
    "Explain the role and overhead of guard bands in preventing adjacent channel interference."
  ],
  infobox: {
    layer: "Layer 2 (Channelization MAC) / Layer 1 (Physical)",
    standard: "ITU-R / 1G Cellular (AMPS) / Satellite Transponders",
    type: "Frequency Channelization Protocol",
    prerequisites: ["channel-allocation"],
    relatedConcepts: ["u2-tdma", "u2-static-vs-dynamic-channel-allocation"],
    compareWith: ["u2-tdma"],
    primaryUses: ["Traditional AM/FM radio broadcasting, cable TV frequency multiplexing, 1G analog cellular"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/79/FDMA.PNG",
  imageCaption: "Figure: Frequency Division Multiple Access (FDMA) Spectral Allocation showing Guard Bands.",
  sections: {
    overview: `
      <p>In <strong>Frequency Division Multiple Access (FDMA)</strong>, the total available frequency bandwidth of the communication channel is divided into separate, non-overlapping frequency bands. Each communicating station is assigned a specific frequency band for its exclusive use.</p>
      
      <p>According to <em>Behrouz A. Forouzan (Chapter 12, Section 12.3.1)</em>, FDMA is a channelization technique where all stations can transmit <strong>simultaneously</strong> and <strong>continuously</strong> because each station transmits on a completely different carrier frequency.</p>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Step-by-Step Working Principle</h3>
      <ol class="wiki-ordered-list">
        <li>The total available frequency range (bandwidth $B_{\\text{total}}$) is identified.</li>
        <li>The bandwidth is sliced into distinct frequency bands (channels).</li>
        <li>Each station is assigned its dedicated frequency band in advance.</li>
        <li>Stations transmit signals using bandpass filters centered on their assigned carrier frequencies.</li>
        <li>Multiple stations transmit simultaneously without time coordination.</li>
        <li>Unused frequency allocations remain idle even when other active stations need more bandwidth.</li>
      </ol>
    `,
    eli10: "Imagine a multi-lane highway where each car is assigned its own permanent lane. Car A can only drive in Lane 1, Car B in Lane 2, and Car C in Lane 3. They can all drive at the exact same time without crashing because they never cross into each other's lanes!",
    analogy: "Commercial radio broadcasting: Station A broadcasts on 91.1 MHz, Station B on 93.5 MHz, and Station C on 98.3 MHz. You can tune your radio to any station without them interfering with each other.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Numerical Example: 100 MHz Shared by 5 Stations</h3>
      <p>Suppose a communication channel has a total bandwidth of 100 MHz and five stations (A, B, C, D, E) share it equally:</p>
      <div class="p-3 my-2 bg-slate-100 dark:bg-slate-800 rounded font-mono text-xs text-center">
        $$B_{\\text{station}} = \\frac{B_{\\text{total}}}{N} = \\frac{100\\text{ MHz}}{5} = 20\\text{ MHz per station}$$
      </div>
      <table class="wiki-table">
        <thead><tr><th>Station</th><th>Assigned Frequency Band</th><th>Allocated Bandwidth</th></tr></thead>
        <tbody>
          <tr><td><strong>Station A</strong></td><td>0 MHz – 20 MHz</td><td>20 MHz</td></tr>
          <tr><td><strong>Station B</strong></td><td>20 MHz – 40 MHz</td><td>20 MHz</td></tr>
          <tr><td><strong>Station C</strong></td><td>40 MHz – 60 MHz</td><td>20 MHz</td></tr>
          <tr><td><strong>Station D</strong></td><td>60 MHz – 80 MHz</td><td>20 MHz</td></tr>
          <tr><td><strong>Station E</strong></td><td>80 MHz – 100 MHz</td><td>20 MHz</td></tr>
        </tbody>
      </table>
      <p class="text-xs text-gray-700 dark:text-gray-300 mt-2"><strong>The Static Inefficiency:</strong> Even if Station A has zero data to transmit, its 20 MHz frequency band remains completely idle. Station C, which might have huge video files waiting, cannot use Station A's empty 20 MHz!</p>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">The Necessity of Guard Bands</h3>
      <p>In physical hardware, analog bandpass filters cannot have infinitely sharp vertical cutoffs. To prevent signals from bleeding into neighboring channels (adjacent-channel cross-talk), narrow unused frequency gaps called <strong>Guard Bands</strong> must be inserted between adjacent bands, introducing unavoidable spectral overhead.</p>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">FDMA Mathematical Allocation Formulas</h3>
      <div class="p-3 my-2 bg-slate-100 dark:bg-slate-800 rounded font-mono text-xs text-center">
        $$B_{\\text{station}} = \\frac{B_{\\text{total}} - (N - 1) \\cdot B_{\\text{guard}}}{N}$$
      </div>
      <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">When guard bands are neglected, the formula simplifies to the standard textbook relation: $B_{\\text{station}} = \\frac{B_{\\text{total}}}{N}$.</p>
    `,
    workedExamples: {
      level1: "<strong>Problem 1 (From PDF Section 8):</strong> A channel has a bandwidth of 120 MHz and is shared equally among six stations using static allocation. Find the bandwidth allocated to each station.<br><br><strong>Given:</strong> $B_{\\text{total}} = 120\\text{ MHz}$, $N = 6$ stations.<br><strong>Formula:</strong> $B_{\\text{station}} = \\frac{B_{\\text{total}}}{N}$<br><strong>Calculation:</strong> $B_{\\text{station}} = \\frac{120}{6} = 20\\text{ MHz}$.<br><strong>Answer:</strong> 20 MHz per station.",
      level2: "<strong>Problem 2 (From PDF Section 8):</strong> A 100 MHz channel is divided equally among five stations using static allocation. Only three stations are actively using their allocated bandwidth. Find the allocated bandwidth that is currently unused.<br><br><strong>Step 1:</strong> Bandwidth per station = $\\frac{100}{5} = 20\\text{ MHz}$.<br><strong>Step 2:</strong> Inactive stations = $5 - 3 = 2$ stations.<br><strong>Step 3:</strong> Unused allocated bandwidth = $2 \\times 20\\text{ MHz} = 40\\text{ MHz}$.<br><strong>Answer:</strong> 40 MHz of bandwidth is completely wasted.",
      level3: "<strong>Analysis:</strong> Why does FDMA require analog bandpass filters and RF tuning circuits at each station?<br><br><strong>Answer:</strong> Because all stations transmit simultaneously onto the same physical medium, a receiver must use an analog bandpass filter tuned specifically to the carrier frequency of the desired station to block all other concurrent station frequencies, preventing adjacent-channel interference."
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
            <td><strong>Simplicity:</strong> Simple resource allocation; no complex coordination software needed.</td>
            <td><strong>Bandwidth Waste:</strong> Unused frequency bands cannot be shared or reallocated dynamically.</td>
          </tr>
          <tr>
            <td><strong>Simultaneous Transmission:</strong> Stations transmit continuously without time-slot synchronization.</td>
            <td><strong>Guard Band Overhead:</strong> Guard bands consume spectral capacity without carrying data.</td>
          </tr>
          <tr>
            <td><strong>Zero Collisions:</strong> Different frequencies physically cannot collide.</td>
            <td><strong>Hardware Cost:</strong> Requires dedicated analog RF filters and frequency synthesizers.</td>
          </tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "Traditional AM and FM radio broadcasting stations.",
      "Analog cable television systems (frequency channel frequency multiplexing).",
      "First-generation (1G) cellular networks (AMPS standard)."
    ],
    quiz: [
      {
        question: "Which multiple access technique divides the communication channel into separate frequency bands?",
        options: [
          "FDMA (Frequency Division Multiple Access)",
          "TDMA (Time Division Multiple Access)",
          "CSMA/CD",
          "Pure ALOHA"
        ],
        correct: 0,
        explanation: "FDMA divides the total channel bandwidth into dedicated frequency bands assigned to each station."
      },
      {
        question: "What is the purpose of guard bands in FDMA?",
        options: [
          "To prevent interference between adjacent frequency channels",
          "To synchronize clocks between transmitting stations",
          "To carry error-checking checksums",
          "To boost the physical signal voltage"
        ],
        correct: 0,
        explanation: "Guard bands are narrow unused frequency intervals placed between adjacent channels to prevent cross-talk and interference."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 12, Section 12.3.1 (FDMA).", url: "" }
    ]
  }
};

// =============================================================================
// SUBTOPIC 6: u2-tdma - Time Division Multiple Access (TDMA)
// =============================================================================
data["u2-tdma"] = {
  id: "u2-tdma",
  title: "Time Division Multiple Access (TDMA)",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 3,
  subtopicNumber: 6,
  whyItMatters: "TDMA divides the time domain into recurring frames and slots. By allowing stations to transmit sequentially on the entire bandwidth, it eliminates the need for expensive analog RF filters while guaranteeing predictable access.",
  prerequisitesList: [
    { concept: "u2-fdma", meaning: "FDMA frequency division and static allocation" },
    { concept: "Clock Synchronization", meaning: "Microsecond timing coordination across distributed nodes" }
  ],
  learningObjectives: [
    "Define Time Division Multiple Access (TDMA) and explain how repeating frames and time slots work.",
    "Solve TDMA slot allocation numerical problems.",
    "Compare the hardware implementation of TDMA vs. FDMA.",
    "Identify why timing synchronization and guard times are critical in TDMA systems."
  ],
  infobox: {
    layer: "Layer 2 (Channelization MAC)",
    standard: "ITU-T / 2G Cellular (GSM) / IEEE 802.16 (WiMAX)",
    type: "Time-Slot Channelization Protocol",
    prerequisites: ["channel-allocation", "u2-fdma"],
    relatedConcepts: ["u2-fdma", "u2-static-vs-dynamic-channel-allocation"],
    compareWith: ["u2-fdma"],
    primaryUses: ["2G GSM digital cellular telephony, satellite TDMA uplink terminals"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/29/Tdma.PNG",
  imageCaption: "Figure: Time Division Multiple Access (TDMA) Frame Structure showing Repeating Slots.",
  sections: {
    overview: `
      <p>In <strong>Time Division Multiple Access (TDMA)</strong>, the entire bandwidth of the communication channel is shared by all stations, but access is divided in the <strong>time domain</strong> into recurring time slots.</p>
      
      <p>According to <em>Forouzan (Section 12.3.2)</em>, time is divided into repeating <strong>frames</strong>, and each frame is subdivided into a fixed number of <strong>time slots</strong>. Each station is assigned one or more specific time slots in which it is permitted to transmit using the <strong>full bandwidth</strong> of the channel.</p>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Step-by-Step Working Principle</h3>
      <ol class="wiki-ordered-list">
        <li>Time on the communication channel is divided into continuous repeating cycles called <strong>frames</strong>.</li>
        <li>Each frame contains a predetermined number of distinct <strong>time slots</strong>.</li>
        <li>Each station receives an assigned time slot in which it is authorized to transmit.</li>
        <li>During its allocated time slot, a station transmits at full channel data rate.</li>
        <li>When its time slot ends, the station halts transmission and waits for its turn in the next recurring frame.</li>
      </ol>
    `,
    eli10: "Imagine 4 students sharing one microphone. Instead of 4 different microphones, they share one microphone by taking turns: Student 1 speaks for 10 seconds, then Student 2 speaks for 10 seconds, then Student 3, then Student 4. Then the cycle repeats from Student 1 again!",
    analogy: "A circular turnstile or revolving door: only one person can step through a compartment at a time, but the door keeps spinning so everyone gets a turn in regular order.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">TDMA Frame Example (4 Stations)</h3>
      <p>Suppose four stations (Station A, B, C, and D) share a single channel using a repeating 4-slot frame structure:</p>
      <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-mono space-y-1">
        <p class="font-bold text-blue-600 dark:text-blue-400">Frame 1: [ Slot 1: Station A ] [ Slot 2: Station B ] [ Slot 3: Station C ] [ Slot 4: Station D ]</p>
        <p class="font-bold text-emerald-600 dark:text-emerald-400">Frame 2: [ Slot 1: Station A ] [ Slot 2: Station B ] [ Slot 3: Station C ] [ Slot 4: Station D ]</p>
        <p class="font-bold text-purple-600 dark:text-purple-400">Frame 3: [ Slot 1: Station A ] [ Slot 2: Station B ] [ Slot 3: Station C ] [ Slot 4: Station D ]</p>
      </div>
      <p class="text-xs text-gray-700 dark:text-gray-300 mt-2">During Slot 1, only Station A can transmit. Stations B, C, and D must remain silent. Even if Station B has urgent data, it must wait until Slot 2 begins.</p>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">The Critical Need for Timing Synchronization & Guard Times</h3>
      <p>Because stations are located at different physical distances from the receiver, their signals take different propagation times ($t_{\\text{prop}} = d/v$) to arrive. If clocks drift by even a few microseconds, a transmission from Station A may bleed into Station B's slot, causing a collision! To prevent this:</p>
      <ul class="wiki-bullet-list">
        <li>Stations maintain precise network clock synchronization (via GPS or base station beacon broadcasts).</li>
        <li>Small buffer intervals called <strong>Guard Times</strong> are inserted between consecutive time slots.</li>
      </ul>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">TDMA Slot Calculation Formulas</h3>
      <div class="p-3 my-2 bg-slate-100 dark:bg-slate-800 rounded font-mono text-xs text-center">
        $$\\text{Slots per station} = \\frac{\\text{Total time slots in frame}}{\\text{Number of stations sharing frame}}$$
      </div>
    `,
    workedExamples: {
      level1: "<strong>Problem 3 (From PDF Section 8):</strong> A TDMA system has 8 time slots in each frame. If 4 stations share the slots equally, how many slots does each station receive?<br><br><strong>Given:</strong> Total time slots = 8, Number of stations = 4.<br><strong>Calculation:</strong> $\\frac{8}{4} = 2$ slots per station.<br><strong>Answer:</strong> Each station receives 2 slots per frame.",
      level2: "<strong>Problem:</strong> In a GSM digital cellular system, each RF carrier has a bandwidth of 200 kHz and uses a TDMA frame with 8 time slots. If each slot lasts 577 $\\mu$s, calculate the duration of one complete TDMA frame.<br><br><strong>Answer:</strong> Frame duration $T_{\\text{frame}} = 8 \\times 577\\ \\mu\\text{s} = 4.616\\text{ ms}$. Every active mobile phone transmits a burst of data once every 4.616 ms.",
      level3: "<strong>Analysis:</strong> Contrast the hardware complexity of TDMA versus FDMA.<br><br><strong>Answer:</strong> FDMA requires expensive, bulky analog bandpass filters and dedicated RF tuning circuits for every frequency channel. TDMA operates on a single carrier frequency and processes digital bitstreams in time, allowing cheap digital DSP hardware to handle multiplexing. However, TDMA demands complex microsecond timing synchronization that FDMA does not require."
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
            <td><strong>Full Bandwidth Access:</strong> Each station uses the entire channel bandwidth during its assigned slot.</td>
            <td><strong>Idle Slot Waste:</strong> If a station has no data, its time slot sits empty and cannot be used by other stations.</td>
          </tr>
          <tr>
            <td><strong>Predictable Latency:</strong> Guarantees a deterministic transmission window in every frame.</td>
            <td><strong>Strict Synchronization:</strong> Requires precise clock synchronization across all distributed stations.</td>
          </tr>
          <tr>
            <td><strong>Zero Collisions:</strong> No packet collisions occur within assigned time slots.</td>
            <td><strong>Waiting Delay:</strong> A station must wait for its slot to arrive before it can transmit.</td>
          </tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "2G GSM (Global System for Mobile Communications) cellular standard (8 slots per carrier).",
      "Satellite TDMA ground stations communicating with orbital transponders.",
      "Tactical military radio systems (Link 16 network)."
    ],
    quiz: [
      {
        question: "Which multiple access technique divides channel access into repeating frames and time slots?",
        options: [
          "TDMA (Time Division Multiple Access)",
          "FDMA (Frequency Division Multiple Access)",
          "CDMA (Code Division Multiple Access)",
          "CSMA/CA"
        ],
        correct: 0,
        explanation: "TDMA divides time into recurring frames, with each frame partitioned into time slots assigned to stations."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 12, Section 12.3.2 (TDMA).", url: "" }
    ]
  }
};

// =============================================================================
// SUBTOPIC 7: u2-dynamic-channel-allocation - Dynamic Channel Allocation
// =============================================================================
data["u2-dynamic-channel-allocation"] = {
  id: "u2-dynamic-channel-allocation",
  title: "Dynamic Channel Allocation",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 3,
  subtopicNumber: 7,
  whyItMatters: "Computer networks generate bursty, asymmetric traffic. Dynamic Channel Allocation assigns bandwidth on demand as packets arrive, allowing active stations to utilize the full channel capacity while avoiding idle waste.",
  prerequisitesList: [
    { concept: "channel-allocation", meaning: "Channel allocation problem and static limitations" },
    { concept: "Bursty Traffic", meaning: "Unpredictable bursts of data separated by long idle periods" }
  ],
  learningObjectives: [
    "Define Dynamic Channel Allocation and explain its 5-step working principle.",
    "Walk through the realistic 5-computer asymmetric traffic scenario from the PDF.",
    "Enumerate the 5 characteristics, 5 advantages, and 5 disadvantages of dynamic allocation.",
    "Master the three broad categories in Forouzan Chapter 12: Random Access, Controlled Access, and Channelization."
  ],
  infobox: {
    layer: "Layer 2 (MAC Sublayer)",
    standard: "IEEE 802.3 / IEEE 802.11 / ALOHA / DOCSIS",
    type: "Demand-Based Allocation Architecture",
    prerequisites: ["channel-allocation", "u2-fdma", "u2-tdma"],
    relatedConcepts: ["u2-static-vs-dynamic-channel-allocation", "u2-multiple-access-intro"],
    compareWith: ["u2-static-vs-dynamic-channel-allocation"],
    primaryUses: ["Ethernet CSMA/CD, Wi-Fi CSMA/CA, cellular 4G/5G dynamic packet scheduling"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/35/Pure_ALOHA1.svg",
  imageCaption: "Figure: Dynamic Channel Allocation via Contention-Based Random Access (Behrouz A. Forouzan).",
  sections: {
    overview: `
      <p><strong>Dynamic Channel Allocation</strong> is a method in which communication channel resources are assigned dynamically according to the <strong>current transmission requirements</strong> of the stations.</p>
      
      <p>Instead of permanently reserving a fixed frequency band or time slot for every station in advance, the network makes resources available on demand when they are actually needed. Once a station finishes transmitting, the channel immediately becomes available for other stations to use.</p>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">5-Step Working Principle</h3>
      <ol class="wiki-ordered-list">
        <li>Stations generate data packets that need to be transmitted.</li>
        <li>A station requests access or competes for access to the channel, depending on the protocol.</li>
        <li>The access-control mechanism determines whether and when the station is permitted to transmit.</li>
        <li>The station uses the channel to transmit its data at high speed.</li>
        <li>Immediately after transmission completes, the channel resources are released and become available to other stations.</li>
      </ol>
    `,
    eli10: "Imagine a restaurant with 10 tables. Under static allocation, 10 specific families own a table forever, even if they only eat there once a year! Under dynamic allocation, anyone can walk in, sit down at an empty table to eat, and when they leave, the next hungry customer gets the table immediately.",
    analogy: "Public library computers: instead of assigning one computer permanently to each citizen in the city, computers are used on demand. When a user finishes, the next waiting person logs in.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">The 5-Computer Traffic Asymmetry Example (From PDF Section 5.3)</h3>
      <p>Suppose five computers (A, B, C, D, E) share a 100 Mbps communication link:</p>
      <ul class="wiki-bullet-list">
        <li><strong>Computer A:</strong> Has a moderate file to transmit.</li>
        <li><strong>Computer B:</strong> Has zero data (user is reading an email).</li>
        <li><strong>Computer C:</strong> Has a huge video file to transmit.</li>
        <li><strong>Computer D:</strong> Is completely inactive (powered off).</li>
        <li><strong>Computer E:</strong> Has a small text document to transmit.</li>
      </ul>
      <p class="mt-2"><strong>Static vs. Dynamic Outcome:</strong> Under static allocation, Computers B and D would hold 40 Mbps of bandwidth completely idle while Computer C chokes on its 20 Mbps slice. Under <strong>dynamic allocation</strong>, Computers A, C, and E share the entire 100 Mbps on demand, maximizing throughput and completing transmissions dramatically faster!</p>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">The Three Broad Categories in Forouzan Chapter 12</h3>
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Multiple Access Category</th>
            <th>Basic Operational Principle</th>
            <th>Representative Protocols</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1. Random Access (Contention)</strong></td>
            <td>Stations compete for access; no station is superior. Collisions are possible and handled by backoff algorithms.</td>
            <td>Pure ALOHA, Slotted ALOHA, CSMA, CSMA/CD (Ethernet), CSMA/CA (Wi-Fi).</td>
          </tr>
          <tr>
            <td><strong>2. Controlled Access (Collision-Free)</strong></td>
            <td>Stations coordinate explicitly to determine who can transmit; zero collisions occur.</td>
            <td>Reservation protocols, Centralized Polling, Token Passing (Token Ring).</td>
          </tr>
          <tr>
            <td><strong>3. Channelization</strong></td>
            <td>Channel capacity is divided by frequency, time, or orthogonal mathematical codes.</td>
            <td>FDMA (Frequency), TDMA (Time), CDMA (Orthogonal Codes).</td>
          </tr>
        </tbody>
      </table>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Characteristics, Advantages & Disadvantages Summary</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs space-y-1">
          <h4 class="font-bold text-emerald-900 dark:text-emerald-300">5 Key Advantages</h4>
          <p>1. Superior resource utilization when traffic is irregular/bursty.</p>
          <p>2. Active stations can make use of all available shared resources.</p>
          <p>3. Zero capacity is wasted on inactive or silent stations.</p>
          <p>4. Gracefully adapts to changing real-time network traffic loads.</p>
          <p>5. Drastically improves aggregate network throughput.</p>
        </div>
        <div class="p-3 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 rounded-lg text-xs space-y-1">
          <h4 class="font-bold text-rose-900 dark:text-rose-300">5 Key Disadvantages</h4>
          <p>1. Access-control mechanisms and algorithms are more complex.</p>
          <p>2. Stations may experience variable waiting times and jitter.</p>
          <p>3. Contention-based systems may suffer from packet collisions.</p>
          <p>4. Performance may decrease when many stations compete simultaneously.</p>
          <p>5. Scheduling, polling, and token passing introduce control overhead.</p>
        </div>
      </div>
    `,
    workedExamples: {
      level1: "<strong>Question:</strong> What are the three broad categories of multiple-access protocols explained in Forouzan Chapter 12?<br><br><strong>Answer:</strong> 1. <strong>Random Access</strong> (stations compete; collisions possible, e.g. ALOHA, CSMA). 2. <strong>Controlled Access</strong> (stations coordinate; collision-free, e.g. polling, token passing). 3. <strong>Channelization</strong> (dividing by frequency, time, or code, e.g. FDMA, TDMA, CDMA).",
      level2: "<strong>Problem:</strong> Explain how dynamic allocation handles an inactive computer compared to static allocation.<br><br><strong>Answer:</strong> In static allocation, the inactive computer is permanently allocated a slice of bandwidth that sits empty and wasted. In dynamic allocation, the inactive computer consumes zero channel resources, allowing all active computers to utilize the entire channel capacity.",
      level3: "<strong>Analysis:</strong> Why does random access dynamic allocation suffer from performance degradation under heavy traffic loads?<br><br><strong>Answer:</strong> In random access systems (like ALOHA or CSMA), as traffic load increases, the number of stations attempting simultaneous transmission surges. This causes the collision rate to skyrocket. Stations spend most of their time aborting, transmitting jam signals, and backing off, leading to throughput collapse."
    },
    advantagesLimitations: `
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Traffic Type</th>
            <th>Static Allocation Performance</th>
            <th>Dynamic Allocation Performance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Continuous Voice Streams</strong></td>
            <td>Optimal (dedicated latency, zero overhead).</td>
            <td>Suboptimal (packet jitter and contention overhead).</td>
          </tr>
          <tr>
            <td><strong>Bursty Web & File Traffic</strong></td>
            <td>Terrible (massive bandwidth waste on idle nodes).</td>
            <td>Optimal (full channel speed granted on demand).</td>
          </tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "Ethernet networks using CSMA/CD random access.",
      "Wi-Fi wireless LANs using CSMA/CA with exponential backoff.",
      "4G LTE and 5G New Radio dynamic packet scheduling (OFDMA)."
    ],
    quiz: [
      {
        question: "Dynamic channel allocation assigns resources mainly according to:",
        options: [
          "Current transmission demand",
          "Cable length",
          "MAC address alphabetical order",
          "Computer brand name"
        ],
        correct: 0,
        explanation: "Dynamic channel allocation allocates resources on demand according to the real-time transmission needs of active stations."
      },
      {
        question: "Which of the following is an example of a controlled access protocol?",
        options: [
          "Polling",
          "FDMA",
          "Pure ALOHA",
          "1-Persistent CSMA"
        ],
        correct: 0,
        explanation: "Polling is a controlled access method where a primary station coordinates secondary stations, eliminating collisions."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 12 (Multiple Access).", url: "" }
    ]
  }
};

// =============================================================================
// SUBTOPIC 8: u2-static-vs-dynamic-channel-allocation - Static vs Dynamic Channel Allocation
// =============================================================================
data["u2-static-vs-dynamic-channel-allocation"] = {
  id: "u2-static-vs-dynamic-channel-allocation",
  title: "Static vs Dynamic Channel Allocation",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 3,
  subtopicNumber: 8,
  whyItMatters: "Comparing static and dynamic channel allocation across all technical dimensions synthesizes the fundamental design choices in computer communications, revealing why modern computer networks rely almost exclusively on dynamic allocation.",
  prerequisitesList: [
    { concept: "u2-fdma", meaning: "Static allocation mechanisms (FDMA/TDMA)" },
    { concept: "u2-dynamic-channel-allocation", meaning: "Dynamic demand-based access and categories" }
  ],
  learningObjectives: [
    "Master the 8-feature comparative matrix contrasting Static and Dynamic Channel Allocation.",
    "Understand the classroom computer real-world analogy from Section 6.2 of the PDF.",
    "Review the master terminology glossary for the MAC sublayer.",
    "Formulate engineering arguments for selecting between static and dynamic allocation."
  ],
  infobox: {
    layer: "Layer 2 (MAC Sublayer Architecture)",
    standard: "IEEE 802 / Communication Theory Synthesis",
    type: "Master Comparative Analysis",
    prerequisites: ["channel-allocation", "u2-fdma", "u2-dynamic-channel-allocation"],
    relatedConcepts: ["channel-allocation", "u2-fdma", "u2-tdma", "u2-dynamic-channel-allocation"],
    compareWith: ["channel-allocation", "u2-dynamic-channel-allocation"],
    primaryUses: ["Curriculum synthesis, network architecture evaluation, university exam mastery"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/79/FDMA.PNG",
  imageCaption: "Figure: Comparative Allocation Models: Fixed Frequency Slices vs Dynamic On-Demand Statistical Multiplexing.",
  sections: {
    overview: `
      <p>The choice between <strong>Static Channel Allocation</strong> and <strong>Dynamic Channel Allocation</strong> represents the most fundamental architectural fork in Medium Access Control design.</p>
      
      <p>According to <em>Behrouz A. Forouzan (Chapter 12)</em>, the core distinction lies in <strong>how and when resources are assigned</strong>:</p>
      <ul class="wiki-bullet-list">
        <li><strong>Static Allocation:</strong> Resources are divided and assigned beforehand (in advance) and generally remain permanently reserved regardless of station activity.</li>
        <li><strong>Dynamic Allocation:</strong> Resources are assigned or accessed dynamically according to real-time current requirements, releasing capacity as soon as transmissions complete.</li>
      </ul>
    `,
    eli10: "Imagine a classroom with 5 students and only 1 computer: Under static allocation, each student is assigned a strict 20-minute slot every day, even if they don't have homework! Under dynamic allocation, students use the computer when they actually have homework, and step away so others can use it. The dynamic way is much smarter!",
    analogy: "Reserved parking spaces vs. open public parking: a company with 100 employees and 50 parking spots can either permanently assign spots to 50 executives (half sit empty when executives travel), or allow all 100 employees to park on demand as they arrive.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Master 8-Feature Comparative Table (From PDF Section 6)</h3>
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Comparative Feature</th>
            <th>Static Channel Allocation</th>
            <th>Dynamic Channel Allocation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1. Resource Assignment</strong></td>
            <td>Fixed or predetermined in advance</td>
            <td>Assigned on demand as data arrives</td>
          </tr>
          <tr>
            <td><strong>2. Allocation Time</strong></td>
            <td>Usually during system setup / configuration</td>
            <td>Dynamically at runtime when required</td>
          </tr>
          <tr>
            <td><strong>3. System Flexibility</strong></td>
            <td>Lower (cannot reassign idle slices)</td>
            <td>Higher (readily adapts to traffic fluctuations)</td>
          </tr>
          <tr>
            <td><strong>4. Idle Resource Usage</strong></td>
            <td>Wasted (unused bandwidth remains empty)</td>
            <td>Reused immediately by other active stations</td>
          </tr>
          <tr>
            <td><strong>5. Traffic Suitability</strong></td>
            <td>Optimal for continuous, predictable traffic (voice)</td>
            <td>Optimal for bursty, unpredictable data (web, files)</td>
          </tr>
          <tr>
            <td><strong>6. Protocol Complexity</strong></td>
            <td>Often simpler (hardware-based partitioning)</td>
            <td>May require complex contention or scheduling logic</td>
          </tr>
          <tr>
            <td><strong>7. Waiting Time / Delay</strong></td>
            <td>Deterministic; depends on assigned slot/band</td>
            <td>Variable; depends on access mechanism and load</td>
          </tr>
          <tr>
            <td><strong>8. Typical Examples</strong></td>
            <td>Fixed FDMA, TDMA, broadcast radio</td>
            <td>Demand-based CSMA/CD, Wi-Fi CSMA/CA, Polling, Token</td>
          </tr>
        </tbody>
      </table>

      <h3 class="text-base font-bold text-gray-900 dark:text-white mt-6 mb-2">Master Terminology Glossary (From PDF Section 7)</h3>
      <table class="wiki-table">
        <thead><tr><th>Term</th><th>Formal Definition & Meaning</th></tr></thead>
        <tbody>
          <tr><td><strong>MAC</strong></td><td>Medium Access Control: lower sublayer of Data Link Layer controlling medium access.</td></tr>
          <tr><td><strong>LLC</strong></td><td>Logical Link Control: upper sublayer of Data Link Layer providing flow and error control.</td></tr>
          <tr><td><strong>Channel</strong></td><td>The physical communication path used to transfer data between stations.</td></tr>
          <tr><td><strong>Bandwidth</strong></td><td>The frequency range or maximum bit carrying capacity of a communication channel.</td></tr>
          <tr><td><strong>Shared Medium</strong></td><td>A single transmission path (wire or radio) used simultaneously by multiple stations.</td></tr>
          <tr><td><strong>Station</strong></td><td>An independent computing device connected to a communication network.</td></tr>
          <tr><td><strong>Collision</strong></td><td>Destructive signal interference caused by two or more simultaneous transmissions.</td></tr>
          <tr><td><strong>FDMA</strong></td><td>Frequency Division Multiple Access: dividing the channel by frequency bands.</td></tr>
          <tr><td><strong>TDMA</strong></td><td>Time Division Multiple Access: dividing channel access into repeating time slots.</td></tr>
          <tr><td><strong>Static Allocation</strong></td><td>Assigning communication resources to stations in advance.</td></tr>
          <tr><td><strong>Dynamic Allocation</strong></td><td>Assigning communication resources to stations on demand.</td></tr>
        </tbody>
      </table>
    `,
    diagram: "",
    technicalDetails: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Quick Revision Summary (From PDF Section 11)</h3>
      <ul class="wiki-bullet-list">
        <li>The Data Link Layer is divided into <strong>LLC</strong> and <strong>MAC</strong> sublayers in the IEEE 802 architecture.</li>
        <li>LLC handles data-link control, while MAC handles access to the shared medium.</li>
        <li>Channel allocation determines how communication resources are shared among stations.</li>
        <li>Static allocation assigns resources in advance; dynamic allocation assigns access according to demand.</li>
        <li><strong>FDMA</strong> divides the channel by frequency: $B_{\\text{station}} = \\frac{B_{\\text{total}}}{N}$.</li>
        <li><strong>TDMA</strong> divides channel access by time slots: $\\text{Slots/station} = \\frac{\\text{Total slots}}{N}$.</li>
        <li><strong>CDMA</strong> allows stations to share a channel simultaneously using orthogonal codes.</li>
        <li>Random access (ALOHA, CSMA) and controlled access (polling, tokens) are the primary dynamic paradigms.</li>
      </ul>
    `,
    workedExamples: {
      level1: "<strong>Question:</strong> State the main difference between static and dynamic channel allocation in one sentence.<br><br><strong>Answer:</strong> The main difference is that static allocation assigns a fixed portion of resources to stations in advance regardless of whether they transmit, whereas dynamic allocation assigns resources on demand based on current transmission requirements.",
      level2: "<strong>Problem:</strong> Explain why dynamic channel allocation can achieve higher aggregate channel utilization than static channel allocation.<br><br><strong>Answer:</strong> In dynamic allocation, when stations are inactive, they consume zero bandwidth. The entire capacity of the communication channel is dynamically allocated to whichever stations currently have data to send. In static allocation, bandwidth allocated to idle stations sits empty and cannot be utilized by anyone else.",
      level3: "<strong>Analysis:</strong> Why might a telecommunications carrier still choose static allocation (FDMA/TDMA) for traditional cellular voice calls despite its lower efficiency for data?<br><br><strong>Answer:</strong> Voice calls require guaranteed, deterministic delay (low jitter) and cannot tolerate packet drops or variable contention delays. Static allocation reserves a dedicated circuit for the duration of the call, guaranteeing perfect quality of service without collision overhead."
    },
    advantagesLimitations: `
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Dimension</th>
            <th>Static Allocation</th>
            <th>Dynamic Allocation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Bursty Traffic Efficiency</strong></td>
            <td>Extremely low (wastes bandwidth on idle stations).</td>
            <td>Extremely high (active stations utilize full bandwidth).</td>
          </tr>
          <tr>
            <td><strong>Latency Guarantee</strong></td>
            <td>Deterministic, constant, bounded latency.</td>
            <td>Variable latency; increases under heavy network contention.</td>
          </tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "Comparative analysis is heavily featured in university exams, GATE, and networking certifications.",
      "Fundamental architectural trade-off in cellular protocol stack engineering (circuit-switched 2G vs packet-switched 4G/5G).",
      "Network operating system bandwidth management algorithms."
    ],
    quiz: [
      {
        question: "What may happen to an unused fixed allocation in static channel allocation?",
        options: [
          "It remains idle and is wasted",
          "It is automatically doubled by the router",
          "It is automatically assigned to the fastest computer",
          "It converts into an IP address"
        ],
        correct: 0,
        explanation: "In static allocation, resources are predetermined; if an allocated station has no data to transmit, its allocation sits idle and is wasted."
      },
      {
        question: "Which multiple access method allows multiple stations to share a channel simultaneously by using different orthogonal codes?",
        options: [
          "CDMA (Code Division Multiple Access)",
          "FDMA",
          "TDMA",
          "Token Passing"
        ],
        correct: 0,
        explanation: "CDMA assigns unique orthogonal mathematical codes to stations, allowing them to transmit simultaneously over the entire frequency band."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 12.", url: "" },
      { cite: "Andrew S. Tanenbaum, Computer Networks, 5th Edition, Chapter 4.", url: "" }
    ]
  }
};

// =============================================================================
// APPEND TOPIC 3 ASSESSMENTS TO TOPIC 11 IN topics_u2_syllabus.js
// =============================================================================

// 1. Add Topic 3 Numerical Problems to u2-numerical-problems
if (data["u2-numerical-problems"]) {
  const t3Numericals = `
    <!-- Problem 6: Equal Bandwidth Allocation (FDMA) -->
    <div class="p-4 bg-white dark:bg-gray-800 rounded-xl border border-blue-200 dark:border-blue-900 shadow-sm mt-4">
      <h4 class="font-bold text-sm text-blue-700 dark:text-blue-400 mb-1">Problem 6: Equal Bandwidth Allocation (FDMA)</h4>
      <p class="text-xs text-gray-700 dark:text-gray-300"><strong>Question (From Topic 3 PDF):</strong> A channel has a bandwidth of 120 MHz and is shared equally among six stations using static allocation. Find the bandwidth allocated to each station.</p>
      <div class="mt-2 p-3 bg-gray-50 dark:bg-gray-900 rounded font-mono text-xs text-gray-800 dark:text-gray-200">
        <p><strong>Given:</strong> Total bandwidth $B_{\\text{total}} = 120\\text{ MHz}$, Number of stations $N = 6$.</p>
        <p><strong>Formula:</strong> $B_{\\text{station}} = \\frac{B_{\\text{total}}}{N}$</p>
        <p><strong>Calculation:</strong> $B_{\\text{station}} = \\frac{120}{6} = 20\\text{ MHz}$.</p>
        <p class="text-emerald-600 dark:text-emerald-400 font-bold mt-1">Answer: 20 MHz per station.</p>
      </div>
    </div>

    <!-- Problem 7: Bandwidth Utilization & Waste -->
    <div class="p-4 bg-white dark:bg-gray-800 rounded-xl border border-blue-200 dark:border-blue-900 shadow-sm mt-4">
      <h4 class="font-bold text-sm text-blue-700 dark:text-blue-400 mb-1">Problem 7: Bandwidth Utilization & Inactive Station Waste</h4>
      <p class="text-xs text-gray-700 dark:text-gray-300"><strong>Question (From Topic 3 PDF):</strong> A 100 MHz channel is divided equally among five stations using static allocation. Only three stations are actively using their allocated bandwidth. Find the allocated bandwidth that is currently unused.</p>
      <div class="mt-2 p-3 bg-gray-50 dark:bg-gray-900 rounded font-mono text-xs text-gray-800 dark:text-gray-200">
        <p><strong>Step 1:</strong> Bandwidth per station = $\\frac{100\\text{ MHz}}{5} = 20\\text{ MHz}$.</p>
        <p><strong>Step 2:</strong> Inactive stations = $5 - 3 = 2$ stations.</p>
        <p><strong>Step 3:</strong> Unused allocated bandwidth = $2 \\times 20\\text{ MHz} = 40\\text{ MHz}$.</p>
        <p class="text-emerald-600 dark:text-emerald-400 font-bold mt-1">Answer: 40 MHz of allocated bandwidth sits completely unused.</p>
      </div>
    </div>

    <!-- Problem 8: TDMA Slot Allocation -->
    <div class="p-4 bg-white dark:bg-gray-800 rounded-xl border border-blue-200 dark:border-blue-900 shadow-sm mt-4">
      <h4 class="font-bold text-sm text-blue-700 dark:text-blue-400 mb-1">Problem 8: TDMA Time Slot Allocation</h4>
      <p class="text-xs text-gray-700 dark:text-gray-300"><strong>Question (From Topic 3 PDF):</strong> A TDMA system has 8 time slots in each frame. If 4 stations share the slots equally, how many slots does each station receive?</p>
      <div class="mt-2 p-3 bg-gray-50 dark:bg-gray-900 rounded font-mono text-xs text-gray-800 dark:text-gray-200">
        <p><strong>Given:</strong> Total slots per frame = 8, Number of stations = 4.</p>
        <p><strong>Calculation:</strong> $\\frac{8}{4} = 2$ slots per station.</p>
        <p class="text-emerald-600 dark:text-emerald-400 font-bold mt-1">Answer: 2 slots per station in each repeating frame.</p>
      </div>
    </div>
  `;
  if (!data["u2-numerical-problems"].sections.overview.includes("Problem 6: Equal Bandwidth")) {
    data["u2-numerical-problems"].sections.overview += t3Numericals;
  }
}

// 2. Add Topic 3 Short-Answer Questions to u2-short-answer-questions
if (data["u2-short-answer-questions"]) {
  const t3ShortQuestions = `
    <!-- Topic 3 Short Questions -->
    <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <p class="font-bold text-xs text-gfg-green">Q16. What is the MAC sublayer?</p>
      <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">The lower sublayer of the Data Link Layer in the IEEE 802 architecture responsible for controlling and coordinating device access to a shared transmission medium.</p>
    </div>
    <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <p class="font-bold text-xs text-gfg-green">Q17. State any four functions of the MAC sublayer.</p>
      <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">1. Physical addressing (MAC addresses). 2. Medium access control. 3. Frame handling and delimiting. 4. Collision handling and backoff recovery.</p>
    </div>
    <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <p class="font-bold text-xs text-gfg-green">Q18. What is the channel allocation problem?</p>
      <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">The problem of deciding how limited communication channel resources or frequency bandwidth should be shared efficiently among multiple competing devices.</p>
    </div>
    <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <p class="font-bold text-xs text-gfg-green">Q19. Why is channel allocation necessary?</p>
      <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">Because the channel has limited bandwidth, stations generate unpredictable bursty traffic, and simultaneous uncoordinated transmissions result in destructive packet collisions.</p>
    </div>
    <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <p class="font-bold text-xs text-gfg-green">Q20. Define static channel allocation.</p>
      <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">A method where available channel resources (frequency or time) are divided and assigned to stations in advance, remaining reserved regardless of whether a station transmits.</p>
    </div>
    <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <p class="font-bold text-xs text-gfg-green">Q21. Define dynamic channel allocation.</p>
      <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">A method where communication channel resources are assigned on demand according to the real-time transmission requirements of active stations.</p>
    </div>
    <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <p class="font-bold text-xs text-gfg-green">Q22. What is FDMA?</p>
      <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">Frequency Division Multiple Access: a channelization technique where the total bandwidth is divided into separate frequency bands assigned to stations for simultaneous transmission.</p>
    </div>
    <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <p class="font-bold text-xs text-gfg-green">Q23. What is TDMA?</p>
      <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">Time Division Multiple Access: a channelization technique where the entire bandwidth is shared in the time domain, with time divided into repeating frames and assigned time slots.</p>
    </div>
    <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <p class="font-bold text-xs text-gfg-green">Q24. Differentiate between LLC and MAC.</p>
      <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">LLC is the upper sublayer providing flow and error control independent of physical media; MAC is the lower sublayer controlling hardware access to the shared medium and handling physical addressing.</p>
    </div>
    <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <p class="font-bold text-xs text-gfg-green">Q25. State two advantages of dynamic allocation.</p>
      <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">1. Drastically higher bandwidth utilization for bursty traffic. 2. Active stations can utilize the full channel capacity while zero bandwidth is wasted on inactive stations.</p>
    </div>
  `;
  if (!data["u2-short-answer-questions"].sections.overview.includes("Q16. What is the MAC sublayer?")) {
    data["u2-short-answer-questions"].sections.overview += t3ShortQuestions;
  }
}

// 3. Add Topic 3 Long-Answer Questions to u2-long-answer-questions
if (data["u2-long-answer-questions"]) {
  const t3LongQuestions = `
    <!-- Topic 3 Long Exam Questions -->
    <div class="space-y-4 mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
      <h3 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Topic 3 – MAC Sublayer Long-Answer University Questions</h3>
      
      <div class="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <h4 class="font-bold text-xs text-blue-600 dark:text-blue-400">Q1. Explain the MAC sublayer and its functions in detail.</h4>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
          The Medium Access Control (MAC) sublayer is the lower portion of the Data Link Layer in the IEEE 802 architecture. It sits directly above the Physical Layer and abstracts medium-specific transmission rules. Its core functions include: (1) Physical Addressing using 48-bit MAC addresses, (2) Medium Access Control to arbitrate transmission access, (3) Frame Delimiting and Formatting, (4) Collision Handling (detection, jam signaling, and exponential backoff), (5) Transmission Coordination across multi-station broadcast channels, and (6) Access Management enforcing priority and fairness.
        </p>
      </div>

      <div class="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <h4 class="font-bold text-xs text-blue-600 dark:text-blue-400">Q2. Explain the channel allocation problem and its primary objectives.</h4>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
          The channel allocation problem addresses how a shared broadcast medium with limited bandwidth is partitioned among multiple competing stations. Because computers generate bursty, asymmetric traffic and may attempt simultaneous transmissions, uncoordinated access causes signal collisions. The primary objectives are: High efficiency, Fairness, Low delay, Collision reduction, Maximum throughput, and Elimination of idle resource waste.
        </p>
      </div>

      <div class="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <h4 class="font-bold text-xs text-blue-600 dark:text-blue-400">Q3. Describe static channel allocation with suitable examples.</h4>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
          Static channel allocation divides available resources in advance into fixed portions assigned to stations. For example, if a 100 MHz channel is shared by 5 stations (A, B, C, D, E), each station receives 20 MHz. The fatal drawback is resource waste: if Station A is inactive, its 20 MHz sits empty, while active stations cannot exceed their 20 MHz slice.
        </p>
      </div>

      <div class="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <h4 class="font-bold text-xs text-blue-600 dark:text-blue-400">Q4. Explain FDMA and TDMA with comparative diagrams and principles.</h4>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
          FDMA divides the frequency domain into non-overlapping bands with guard bands; stations transmit simultaneously and continuously on different carrier frequencies. TDMA divides the time domain into repeating frames and slots; all stations share the entire frequency band but transmit sequentially one station per time slot, requiring microsecond clock synchronization and guard times.
        </p>
      </div>

      <div class="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <h4 class="font-bold text-xs text-blue-600 dark:text-blue-400">Q5. Explain dynamic channel allocation with an illustrative example.</h4>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
          Dynamic channel allocation assigns resources on demand based on real-time traffic. Consider 5 computers where A, C, and E have data while B and D are idle. Instead of reserving 20% for B and D, dynamic allocation grants the full channel capacity to A, C, and E. Resources are released immediately when transmissions finish.
        </p>
      </div>

      <div class="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <h4 class="font-bold text-xs text-blue-600 dark:text-blue-400">Q6. Compare static and dynamic channel allocation across key technical parameters.</h4>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
          Static allocation features predetermined assignment, advance setup, lower flexibility, wasted idle resources, and suitability for predictable voice traffic. Dynamic allocation features demand-based assignment, runtime access, high flexibility, reusable idle capacity, and optimal efficiency for bursty computer data traffic.
        </p>
      </div>

      <div class="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <h4 class="font-bold text-xs text-blue-600 dark:text-blue-400">Q7. Explain the relationship between LLC, MAC, and the Physical Layer.</h4>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
          The Network Layer passes IP datagrams to the LLC sublayer. LLC encapsulates packets into LLC PDUs, identifies the network protocol via SAPs, and manages flow/error control. LLC passes the data to the MAC sublayer, which appends 48-bit MAC addresses and FCS trailers and executes medium access arbitration. Finally, MAC streams frames down to the Physical Layer transceiver for signal modulation onto the wire or radio medium.
        </p>
      </div>
    </div>
  `;
  if (!data["u2-long-answer-questions"].sections.overview.includes("Topic 3 – MAC Sublayer Long-Answer")) {
    data["u2-long-answer-questions"].sections.overview += t3LongQuestions;
  }
}

// 4. Add Topic 3 MCQs to u2-mcqs
if (data["u2-mcqs"]) {
  const t3Mcqs = [
    {
      question: "Which is the lower sublayer of the Data Link Layer in the IEEE 802 model?",
      options: ["LLC", "MAC", "Network", "Transport"],
      correct: 1,
      explanation: "In the IEEE 802 model, the Data Link Layer is divided into the upper Logical Link Control (LLC) sublayer and the lower Medium Access Control (MAC) sublayer."
    },
    {
      question: "What is the main responsibility of the MAC sublayer?",
      options: ["Routing packets across networks", "Controlling access to the shared medium", "Encrypting user data", "Assigning IP addresses"],
      correct: 1,
      explanation: "The MAC sublayer is primarily responsible for coordinating and controlling device access to a shared physical transmission medium."
    },
    {
      question: "Which sublayer is mainly responsible for flow and error control in the IEEE 802 architecture?",
      options: ["MAC", "Physical", "LLC", "Network"],
      correct: 2,
      explanation: "The Logical Link Control (LLC) sublayer provides flow control, error control, and network layer protocol identification."
    },
    {
      question: "In static channel allocation, resources are generally assigned:",
      options: ["Only after a collision", "In advance", "Randomly every second", "Only to routers"],
      correct: 1,
      explanation: "Static channel allocation partitions and assigns resources (frequencies or time slots) to stations in advance."
    },
    {
      question: "Which multiple access technique divides a communication channel into separate frequency bands?",
      options: ["TDMA", "FDMA", "CSMA/CD", "ALOHA"],
      correct: 1,
      explanation: "FDMA (Frequency Division Multiple Access) divides the available channel bandwidth into distinct frequency bands."
    },
    {
      question: "Which multiple access technique divides channel access into time slots within repeating frames?",
      options: ["FDMA", "CDMA", "TDMA", "CSMA"],
      correct: 2,
      explanation: "TDMA (Time Division Multiple Access) divides channel access in the time domain into recurring frames and time slots."
    },
    {
      question: "Dynamic channel allocation assigns resources mainly according to:",
      options: ["Device brand names", "Current transmission demand", "MAC address length", "Cable colour"],
      correct: 1,
      explanation: "Dynamic channel allocation allocates transmission capacity on demand based on real-time station requirements."
    },
    {
      question: "What may happen to an unused fixed allocation in static channel allocation?",
      options: ["It may remain idle and wasted", "It doubles automatically", "It becomes an IP address", "It creates a router"],
      correct: 0,
      explanation: "In static allocation, if a station has no data to send, its allocated frequency band or time slot sits idle and cannot be used by others."
    },
    {
      question: "Which of the following is an example of a controlled access protocol?",
      options: ["Polling", "FDMA", "Pure ALOHA", "CSMA"],
      correct: 0,
      explanation: "Polling is a controlled access method where stations coordinate with a primary controller, guaranteeing collision-free access."
    },
    {
      question: "Which of the following is classified as a channelization method?",
      options: ["Token passing", "Polling", "CDMA", "CSMA/CD"],
      correct: 2,
      explanation: "CDMA (Code Division Multiple Access), along with FDMA and TDMA, is a channelization method that partitions the medium."
    }
  ];

  // Append any new MCQs not already present
  const existingQuestions = new Set(data["u2-mcqs"].sections.quiz.map(q => q.question));
  t3Mcqs.forEach(q => {
    if (!existingQuestions.has(q.question)) {
      data["u2-mcqs"].sections.quiz.push(q);
    }
  });
}

// =============================================================================
// WRITE UPDATED SYLLABUS DATA BACK TO js/topics_u2_syllabus.js
// =============================================================================
const finalOut = `// topics_u2_syllabus.js - Master Academic Topic Content Repository for Unit 2
// Cleaned: All ASCII symbol art removed. Integrated complete 36-page Topic 2 & 14-page Topic 3 content.
var TOPICS_U2_SYLLABUS = ` + JSON.stringify(data, null, 2) + `;\n
if (typeof window !== 'undefined') window.TOPICS_U2_SYLLABUS = TOPICS_U2_SYLLABUS;
if (typeof global !== 'undefined') global.TOPICS_U2_SYLLABUS = TOPICS_U2_SYLLABUS;
if (typeof module !== 'undefined' && module.exports) module.exports = TOPICS_U2_SYLLABUS;
`;

fs.writeFileSync(syllabusPath, finalOut, 'utf8');
console.log("Successfully wrote updated js/topics_u2_syllabus.js with comprehensive Topic 3 content!");

