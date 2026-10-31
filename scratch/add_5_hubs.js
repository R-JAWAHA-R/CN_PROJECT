const fs = require('fs');
const syllabusPath = 'js/topics_u2_syllabus.js';
let raw = fs.readFileSync(syllabusPath, 'utf8');
const startIdx = raw.indexOf('{');
const endIdx = raw.lastIndexOf('};');
const objStr = raw.substring(startIdx, endIdx + 1);
const data = eval('(' + objStr + ')');

// Add rich hub pages for the 5 topic category slugs
data['channel-allocation'] = {
  id: "channel-allocation",
  title: "Medium Access Control (MAC) & Channel Allocation",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 3,
  subtopicNumber: 0,
  whyItMatters: "When multiple communicating nodes share a single transmission broadcast medium, uncoordinated transmissions cause packet collisions. Channel allocation techniques provide systematic access arbitration.",
  prerequisitesList: [
    { concept: "Data Link Layer Framing", meaning: "Bit packaging and frame delimiting" },
    { concept: "Broadcast Mediums", meaning: "Shared wireless radio or multi-point coaxial cables" }
  ],
  learningObjectives: [
    "Understand the channel allocation problem on broadcast links.",
    "Compare static allocation (FDMA/TDMA/CDMA) with dynamic multiple access protocols.",
    "Master the 5 key assumptions in multi-access systems."
  ],
  infobox: {
    layer: "Layer 2 (MAC Sublayer)",
    standard: "IEEE 802 Local Area Networks",
    type: "Sublayer Architecture Hub",
    prerequisites: ["u2-dll-intro"],
    relatedConcepts: ["u2-mac-sublayer-intro", "u2-fdma", "u2-tdma"],
    compareWith: ["u2-static-vs-dynamic-channel-allocation"],
    primaryUses: ["Shared Ethernet, Wi-Fi radio arbitration, cellular frequency division"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/79/FDMA.PNG",
  imageCaption: "Figure: Medium Access Control & Frequency Division Channel Allocation (Behrouz A. Forouzan).",
  sections: {
    overview: `
      <p>The <strong>Medium Access Control (MAC) Sublayer</strong> is the lower sublayer of the OSI Data Link Layer that arbitrates access to a shared broadcast transmission medium.</p>
      <p>When multiple stations attempt to transmit simultaneously over a common wire or radio channel, their electrical or electromagnetic signals interfere with each other, corrupting all transmitted data in what is known as a <strong>packet collision</strong>. MAC protocols and channel allocation strategies provide deterministic rules to prevent or resolve collisions.</p>
    `,
    eli10: "Imagine 10 people in a dark room who all want to speak. If everyone talks at once, it's just noisy gibberish! Channel allocation is deciding either: give each person their own microphone pitch (FDMA), take 1-minute turns speaking (TDMA), or raise hands and back off if two people speak at the same time (CSMA).",
    analogy: "Traffic lights and roundabouts at a busy multi-lane highway intersection managing which lane of cars is permitted to move.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Static vs. Dynamic Channel Allocation</h3>
      <ul class="wiki-bullet-list">
        <li><strong>Static Channel Allocation:</strong> Divides total bandwidth permanently into dedicated channels (FDMA) or recurring time slots (TDMA). Excellent for continuous, predictable voice calls, but highly wasteful for bursty computer traffic.</li>
        <li><strong>Dynamic Channel Allocation:</strong> Allocates the channel on demand as packets arrive using random access (ALOHA, CSMA/CD, CSMA/CA) or collision-free tokens.</li>
      </ul>
    `,
    diagram: "",
    technicalDetails: `
      <p>Under static allocation, if $N$ users share a channel of bandwidth $B$, each receives $\\frac{B}{N}$. If only 1 user is transmitting, $(N-1)/N$ of the channel capacity is wasted. Dynamic random access dynamically grants the full bandwidth $B$ on demand.</p>
    `,
    workedExamples: {
      level1: "<strong>Question:</strong> Why is static channel allocation inefficient for bursty computer data traffic?<br><br><strong>Answer:</strong> Computer traffic is bursty, meaning a node sends packets in brief bursts and remains idle for long periods. In static allocation, each station's pre-assigned frequency slot remains completely idle when that station has nothing to send, while active stations cannot exceed their fractional bandwidth share.",
      level2: "<strong>Problem:</strong> Calculate the delay under static TDM vs. dynamic statistical multiplexing for $N=10$ bursty nodes.<br><br><strong>Answer:</strong> With static TDM, average queuing delay increases by a factor of $N=10$ because a packet must wait for its dedicated time slot even if all other 9 time slots are empty. Dynamic allocation serves packets immediately across all available capacity.",
      level3: "<strong>Analysis:</strong> State the 5 classic assumptions in dynamic channel allocation modeling.<br><br><strong>Answer:</strong> 1. Station Model (independent stations generating Poisson traffic). 2. Single Channel (one shared broadcast link). 3. Collision Assumption (overlapping frames are corrupted). 4. Time Model (continuous time or slotted). 5. Carrier Sensing (stations can or cannot sense channel activity before transmitting)."
    },
    advantagesLimitations: `
      <table class="wiki-table">
        <thead><tr><th>Approach</th><th>Advantages</th><th>Limitations</th></tr></thead>
        <tbody>
          <tr><td>Static Allocation</td><td>Zero collisions, guaranteed bounded latency.</td><td>Inflexible, low throughput with bursty data.</td></tr>
          <tr><td>Dynamic Allocation</td><td>High throughput, bandwidth allocated on demand.</td><td>Collision overhead at high traffic loads.</td></tr>
        </tbody>
      </table>
    `,
    whereUsed: ["Cellular radio networks (FDD/TDD)", "Cable modem DOCSIS systems", "Ethernet and Wi-Fi networks"],
    quiz: [{
      question: "Which sublayer of the Data Link Layer is responsible for arbitrating access to shared transmission media?",
      options: ["Medium Access Control (MAC) sublayer", "Logical Link Control (LLC) sublayer", "Network sublayer", "Physical sublayer"],
      correct: 0,
      explanation: "The MAC sublayer coordinates station access to shared broadcast transmission media."
    }],
    references: [{ cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Ed., Chapter 12.", url: "" }]
  }
};

data['wireless-lan-protocols'] = {
  id: "wireless-lan-protocols",
  title: "Wireless LAN Protocols",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 7,
  subtopicNumber: 0,
  whyItMatters: "Wireless transmission channels present unique physical challenges—including signal attenuation, multipath fading, and radio range boundaries—that render wired collision detection impossible.",
  prerequisitesList: [
    { concept: "MAC Sublayer", meaning: "Channel access arbitration" },
    { concept: "Radio Waves", meaning: "Electromagnetic broadcast propagation" }
  ],
  learningObjectives: [
    "Analyze the fundamental characteristics of wireless communication links.",
    "Explain the Hidden Terminal Problem and Exposed Terminal Problem.",
    "Understand why CSMA/CD cannot function over wireless radio interfaces."
  ],
  infobox: {
    layer: "Layer 2 (Wireless MAC)",
    standard: "IEEE 802.11 / Wi-Fi Alliance",
    type: "Wireless MAC Architecture",
    prerequisites: ["channel-allocation", "csma-protocols"],
    relatedConcepts: ["u2-hidden-terminal-problem", "u2-exposed-terminal-problem", "wifi-mac-sublayer"],
    compareWith: ["ethernet"],
    primaryUses: ["Wi-Fi home & enterprise networks, IoT wireless meshes"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Wifi_hidden_station_problem.svg",
  imageCaption: "Figure: Wireless LAN Transmission Boundaries and the Hidden Station Scenario.",
  sections: {
    overview: `
      <p><strong>Wireless Local Area Network (WLAN) Protocols</strong> govern communication over omnidirectional radio waves rather than physical copper or fiber cables.</p>
      <p>Because radio signals attenuate rapidly with distance (following inverse-square path loss $\\propto 1/d^2$ or higher), a transmitter's signal may be strong enough to reach an access point but undetectable by another station located on the opposite side of the cell. This gives rise to the classic <strong>Hidden Terminal Problem</strong> and <strong>Exposed Terminal Problem</strong>.</p>
    `,
    eli10: "Imagine you and a classmate are both trying to whisper a question to your teacher from opposite sides of a giant library hall. You can both reach the teacher's ears, but you can't hear each other whispering. If you both whisper at once, the teacher hears only noise!",
    analogy: "Two drivers approaching an obscured blind intersection behind stone walls: neither driver can see the other, but both will crash in the middle without a signaling system.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Core Wireless Challenges</h3>
      <ul class="wiki-bullet-list">
        <li><strong>Cannot Detect Collisions while Transmitting:</strong> A wireless station's local transmitter signal is thousands of times stronger than any incoming signal from distant nodes, blinding the receiver while transmitting. Hence CSMA/CD is impossible; wireless MUST use <strong>Collision Avoidance (CSMA/CA)</strong>.</li>
        <li><strong>Hidden Terminal Problem:</strong> Station A transmits to B. Station C cannot hear A, assumes channel is idle, and also transmits to B, colliding at B.</li>
        <li><strong>Exposed Terminal Problem:</strong> Station B transmits to A. Station C hears B and wrongly defers transmitting to D, even though C transmitting to D would not interfere with A receiving from B.</li>
      </ul>
    `,
    diagram: "",
    technicalDetails: `
      <p>To eliminate hidden terminal collisions, wireless LANs employ the <strong>RTS/CTS (Request to Send / Clear to Send)</strong> 4-way handshake and set a virtual carrier sensing timer called the <strong>Network Allocation Vector (NAV)</strong>.</p>
    `,
    workedExamples: {
      level1: "<strong>Question:</strong> Why can't wireless networks use CSMA/CD like Ethernet?<br><br><strong>Answer:</strong> In wireless, a station transmitting on its antenna overpowers its own receiver. To detect a collision, the station would need to hear a weak distant incoming signal while blasting out its own high-power radio signal, requiring an impossible dynamic range (over 100 dB difference).",
      level2: "<strong>Problem:</strong> Explain how RTS/CTS solves the hidden terminal problem.<br><br><strong>Answer:</strong> Before sending data, Station A transmits a short Request-to-Send (RTS). Access Point B replies with a Clear-to-Send (CTS). Because Station C is within range of B, C hears the CTS and learns how long A's data transmission will take. C sets its NAV timer and remains silent, preventing a collision at B.",
      level3: "<strong>Analysis:</strong> Contrast the impact of Hidden Terminals vs Exposed Terminals.<br><br><strong>Answer:</strong> Hidden terminals cause packet collisions and wasted transmission attempts. Exposed terminals cause unnecessary deferrals and wasted channel capacity."
    },
    advantagesLimitations: `
      <table class="wiki-table">
        <thead><tr><th>Aspect</th><th>Wireless LANs</th><th>Wired LANs (Ethernet)</th></tr></thead>
        <tbody>
          <tr><td>Collision Handling</td><td>Collision Avoidance (CSMA/CA + RTS/CTS)</td><td>Collision Detection (CSMA/CD) or Switched Full-Duplex</td></tr>
          <tr><td>Physical Medium</td><td>Unbounded free space (Radio 2.4/5/6 GHz)</td><td>Bounded twisted pair or optical fiber</td></tr>
        </tbody>
      </table>
    `,
    whereUsed: ["IEEE 802.11a/b/g/n/ac/ax/be Wi-Fi", "Bluetooth Personal Area Networks", "Zigbee wireless sensor meshes"],
    quiz: [{
      question: "Which mechanism allows nearby stations in a wireless LAN to reserve the channel and avoid hidden terminal collisions?",
      options: ["RTS/CTS Handshake", "Preamble bit stuffing", "Binary exponential backoff", "Token ring rotation"],
      correct: 0,
      explanation: "RTS/CTS establishes virtual carrier sensing (NAV) across all stations within range of either sender or receiver."
    }],
    references: [{ cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Ed., Chapter 14.", url: "" }]
  }
};

data['wifi-mac-sublayer'] = {
  id: "wifi-mac-sublayer",
  title: "IEEE 802.11 MAC Sublayer Protocol",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 8,
  subtopicNumber: 0,
  whyItMatters: "IEEE 802.11 Wi-Fi is the ubiquitous wireless standard globally. Its MAC architecture balances contention-based distributed access with centralized polling.",
  prerequisitesList: [
    { concept: "Wireless LAN Protocols", meaning: "Hidden terminals and radio propagation" },
    { concept: "CSMA/CA", meaning: "Collision avoidance with interframe spaces" }
  ],
  learningObjectives: [
    "Distinguish between Distributed Coordination Function (DCF) and Point Coordination Function (PCF).",
    "Explain the role of Interframe Spaces (SIFS, PIFS, DIFS).",
    "Trace the complete CSMA/CA handshake with RTS, CTS, Data, ACK, and NAV."
  ],
  infobox: {
    layer: "Layer 2 (MAC Sublayer)",
    standard: "IEEE 802.11-2020 / Wi-Fi 6 & 7",
    type: "Industry Wireless Protocol",
    prerequisites: ["wireless-lan-protocols"],
    relatedConcepts: ["u2-ieee-802-11-dcf", "u2-ieee-802-11-pcf", "u2-rts-cts-mechanism"],
    compareWith: ["ethernet"],
    primaryUses: ["Wi-Fi routers, smartphones, laptops, IoT endpoints"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/53/802.11_MAC_Frame.svg",
  imageCaption: "Figure: Complete IEEE 802.11 MAC Frame Architecture showing 4 Address Fields and Frame Control (Behrouz A. Forouzan).",
  sections: {
    overview: `
      <p>The <strong>IEEE 802.11 MAC Sublayer Protocol</strong> defines how Wi-Fi devices share radio channels. It operates two distinct coordination functions:</p>
      <ul class="wiki-bullet-list">
        <li><strong>Distributed Coordination Function (DCF):</strong> Mandatory contention-based protocol using CSMA/CA with exponential backoff and optional RTS/CTS.</li>
        <li><strong>Point Coordination Function (PCF):</strong> Optional centralized contention-free polling service managed by the Access Point (AP) for delay-sensitive traffic.</li>
      </ul>
    `,
    eli10: "Wi-Fi DCF is like a dinner table where everyone waits for a brief pause before speaking, but rolls a secret die to wait a few seconds so two people don't talk at the exact same moment. PCF is like a dinner where the host points to each person in turn and asks 'Do you want to speak?'.",
    analogy: "Like an orderly press conference where reporters either raise hands and wait for quiet pauses (DCF) or the press secretary calls on specific reporters one by one (PCF).",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">CSMA/CA Protocol Timeline & IFS</h3>
      <p>Stations must observe rigorous Interframe Spaces (IFS) to prioritize traffic:</p>
      <ul class="wiki-bullet-list">
        <li><strong>SIFS (Short IFS):</strong> Shortest wait; used for highest priority responses (ACK, CTS).</li>
        <li><strong>PIFS (PCF IFS):</strong> Intermediate wait; used by Access Point during PCF polling.</li>
        <li><strong>DIFS (DCF IFS):</strong> Longest mandatory quiet period before any station can begin contention backoff.</li>
      </ul>
    `,
    diagram: "",
    technicalDetails: `
      <p>The 802.11 frame format includes 4 distinct address fields (Source MAC, Destination MAC, BSSID/AP MAC, and optional Ad-Hoc relay MAC), frame control flags, sequence control, and FCS trailer.</p>
    `,
    workedExamples: {
      level1: "<strong>Question:</strong> Why is SIFS shorter than DIFS in 802.11?<br><br><strong>Answer:</strong> SIFS is assigned to ongoing handshakes (CTS and ACK). Because SIFS < DIFS, a station waiting to send an ACK transmits before any contending station can complete its DIFS wait, guaranteeing that active transactions are never interrupted by collisions.",
      level2: "<strong>Problem:</strong> Trace the 802.11 RTS/CTS exchange.<br><br><strong>Answer:</strong> Sender senses channel idle for DIFS &rarr; transmits RTS with duration $D$ &rarr; Receiver waits SIFS &rarr; replies CTS with updated duration &rarr; Sender waits SIFS &rarr; transmits DATA &rarr; Receiver waits SIFS &rarr; transmits ACK. Surrounding stations set NAV timer to $D$ and remain silent.",
      level3: "<strong>Analysis:</strong> Compare DCF vs. PCF.<br><br><strong>Answer:</strong> DCF is asynchronous, distributed, contention-based, and best effort. PCF is synchronous, centralized, contention-free, and suitable for real-time voice/video QoS."
    },
    advantagesLimitations: `
      <table class="wiki-table">
        <thead><tr><th>Function</th><th>Type</th><th>Primary Use</th></tr></thead>
        <tbody>
          <tr><td>DCF</td><td>Contention (CSMA/CA)</td><td>Standard data browsing, file downloads.</td></tr>
          <tr><td>PCF</td><td>Contention-free (Polling)</td><td>VoIP, real-time streaming (rarely implemented).</td></tr>
        </tbody>
      </table>
    `,
    whereUsed: ["Wi-Fi 4 (802.11n), Wi-Fi 5 (802.11ac), Wi-Fi 6/6E (802.11ax), Wi-Fi 7 (802.11be)"],
    quiz: [{
      question: "Which Interframe Space (IFS) is the shortest and has the highest transmission priority in IEEE 802.11?",
      options: ["SIFS", "PIFS", "DIFS", "EIFS"],
      correct: 0,
      explanation: "SIFS (Short Interframe Space) is the shortest IFS, reserved for high-priority ACKs and CTS frames."
    }],
    references: [{ cite: "IEEE Std 802.11-2020 / Behrouz A. Forouzan Chapter 14.", url: "" }]
  }
};

data['dll-switching'] = {
  id: "dll-switching",
  title: "Data Link Layer Switching & Spanning Tree",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 9,
  subtopicNumber: 0,
  whyItMatters: "Modern local networks rely on Layer 2 switches to break large collision domains into isolated micro-segments, while Spanning Tree Protocol (STP) eliminates catastrophic broadcast radiation loops.",
  prerequisitesList: [
    { concept: "MAC Addressing", meaning: "48-bit hardware station addresses" },
    { concept: "Ethernet Framing", meaning: "Destination and source address fields" }
  ],
  learningObjectives: [
    "Understand the operation of learning bridges and transparent switches.",
    "Explain the three bridge forwarding actions: Forward, Filter, Flood.",
    "Master the Spanning Tree Protocol (IEEE 802.1D) algorithm."
  ],
  infobox: {
    layer: "Layer 2 (Data Link Layer)",
    standard: "IEEE 802.1D (STP) / IEEE 802.1w (RSTP)",
    type: "Link Layer Switching Architecture",
    prerequisites: ["ethernet", "mac-address"],
    relatedConcepts: ["u2-learning-bridges", "u2-spanning-tree-protocol", "vlan"],
    compareWith: ["u2-bridges-vs-switches"],
    primaryUses: ["Enterprise LAN switches, campus networks, datacenter switching fabrics"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Spanning_tree_protocol_at_work_1.svg",
  imageCaption: "Figure: Spanning Tree Protocol (STP) Active Topology Pruning Redundant Loops into a Tree.",
  sections: {
    overview: `
      <p><strong>Data Link Layer Switching</strong> connects multiple LAN segments at Layer 2. A switch inspects incoming frames, inspects their MAC addresses, and forwards frames strictly to the designated output port rather than broadcasting them indiscriminately.</p>
      <p>To operate autonomously, switches build an internal <strong>MAC Address Table (Forwarding Database)</strong> via backward learning, and execute the <strong>Spanning Tree Protocol (STP - IEEE 802.1D)</strong> to disable redundant physical loops that would cause broadcast radiation storms.</p>
    `,
    eli10: "Imagine a school receptionist. Whenever a student brings a note, the receptionist notes down what classroom that student came from. Soon, the receptionist knows exactly which door leads to which student, and can deliver notes directly without having to yell over the school intercom every time!",
    analogy: "Like a smart postal sorting office sorting envelopes into specific postal delivery trucks rather than sending every letter to every city in the country.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">The Three Switch Forwarding Actions</h3>
      <ol class="wiki-ordered-list">
        <li><strong>Filtering:</strong> If the destination MAC is learned to be on the exact same port the frame arrived on, the frame is dropped (filtered).</li>
        <li><strong>Forwarding:</strong> If the destination MAC is in the table on a different port, the frame is transmitted solely out that specific port.</li>
        <li><strong>Flooding:</strong> If the destination MAC is unknown or is the broadcast address (FF:FF:FF:FF:FF:FF), the frame is transmitted out all ports except the arrival port.</li>
      </ol>
    `,
    diagram: "",
    technicalDetails: `
      <p>STP elects a <strong>Root Bridge</strong> (lowest Bridge ID = Priority + MAC), computes shortest root paths, and places redundant ports into a <strong>Blocking State</strong>, preventing bridge loops while maintaining automatic failover redundancy.</p>
    `,
    workedExamples: {
      level1: "<strong>Question:</strong> How does a transparent switch learn MAC addresses?<br><br><strong>Answer:</strong> By inspecting the <em>Source MAC address</em> of every arriving frame and recording the incoming physical port number and a timestamp in its MAC address table (CAM table).",
      level2: "<strong>Problem:</strong> What is a broadcast storm and how does STP prevent it?<br><br><strong>Answer:</strong> When switches have physical loops, broadcast frames circulate infinitely in both directions, multiplying exponentially until switch CPUs crash and network bandwidth is 100% saturated. STP calculates a loop-free spanning tree and blocks redundant links.",
      level3: "<strong>Analysis:</strong> Contrast a Bridge and a Switch.<br><br><strong>Answer:</strong> A traditional bridge is software-based with few ports (2 to 4). A modern switch is hardware-based using custom ASIC chips, provides high port density (24 to 48 ports), and performs wire-speed simultaneous parallel switching."
    },
    advantagesLimitations: `
      <table class="wiki-table">
        <thead><tr><th>Action</th><th>Condition</th><th>Outcome</th></tr></thead>
        <tbody>
          <tr><td>Forward</td><td>Destination MAC found in table on Port $Y$ ($Y \\neq X$)</td><td>Frame sent solely out Port $Y$.</td></tr>
          <tr><td>Filter</td><td>Destination MAC found on Port $X$ (same port)</td><td>Frame dropped safely; no action needed.</td></tr>
          <tr><td>Flood</td><td>Destination MAC unknown or Broadcast</td><td>Frame sent out all ports except arrival port.</td></tr>
        </tbody>
      </table>
    `,
    whereUsed: ["Cisco Catalyst switches", "Enterprise campus backbones", "Cloud datacenter Top-of-Rack (ToR) switches"],
    quiz: [{
      question: "Which field in an Ethernet frame does a switch inspect to populate its MAC address forwarding table?",
      options: ["Source MAC Address", "Destination MAC Address", "EtherType field", "FCS CRC trailer"],
      correct: 0,
      explanation: "Switches perform backward learning by inspecting the Source MAC address of incoming frames."
    }],
    references: [{ cite: "IEEE Std 802.1D / Tanenbaum Chapter 4.8 / Forouzan Chapter 15.", url: "" }]
  }
};

data['network-devices'] = {
  id: "network-devices",
  title: "Networking Devices & Operational Layers",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  topicNumber: 10,
  subtopicNumber: 0,
  whyItMatters: "Understanding the exact OSI layer at which network hardware operates—Repeaters, Hubs, Bridges, Switches, Routers, and Gateways—is the single most foundational concept in networking engineering.",
  prerequisitesList: [
    { concept: "OSI 7-Layer Model", meaning: "Physical, Data Link, Network, Transport, and Application layers" },
    { concept: "Collision vs Broadcast Domains", meaning: "Boundary management between network segments" }
  ],
  learningObjectives: [
    "Identify the operational layer of Repeaters, Hubs, Bridges, Switches, Routers, and Gateways.",
    "Differentiate between collision domains and broadcast domains.",
    "Master the comparative device functionality matrix."
  ],
  infobox: {
    layer: "Layers 1, 2, 3 & 7",
    standard: "IEEE 802 / IETF Internet Standards",
    type: "Hardware Architecture Hub",
    prerequisites: ["u2-dll-intro", "dll-switching"],
    relatedConcepts: ["u2-networking-device-repeaters", "u2-networking-device-switches", "u2-networking-device-routers"],
    compareWith: ["u2-comparison-networking-devices"],
    primaryUses: ["Campus cabling, routing topology design, CCNA certification"]
  },
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Router_on_a_stick.png",
  imageCaption: "Figure: Multi-Layer Networking Device Interconnection: Layer 2 Switches with Layer 3 Routers.",
  sections: {
    overview: `
      <p>Networking devices connect communicating endpoints across physical, link, and network boundaries. Each device functions at a specific layer of the OSI reference model, dictating its intelligence, addressing scheme, and domain boundaries.</p>
    `,
    eli10: "Think of mail delivery: A Hub is a loudspeaker that echoes your voice down the hall (Layer 1). A Switch is an office clerk who passes envelopes to the right desk in the building (Layer 2). A Router is a delivery truck that drives letters across highways to other cities (Layer 3).",
    analogy: "Graduating levels of diplomatic communication: physical wire cables &rarr; local town courier &rarr; interstate postal service &rarr; international embassy translator.",
    howItWorks: `
      <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Master Device & Layer Mapping Matrix</h3>
      <table class="wiki-table">
        <thead>
          <tr>
            <th>Device</th>
            <th>OSI Operating Layer</th>
            <th>Data Unit</th>
            <th>Addressing Used</th>
            <th>Collision Domain</th>
            <th>Broadcast Domain</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Repeater</strong></td>
            <td>Layer 1 (Physical)</td>
            <td>Bits</td>
            <td>None</td>
            <td>Extends 1 domain</td>
            <td>1 domain</td>
          </tr>
          <tr>
            <td><strong>Hub</strong></td>
            <td>Layer 1 (Physical)</td>
            <td>Bits</td>
            <td>None</td>
            <td>Single shared domain</td>
            <td>1 domain</td>
          </tr>
          <tr>
            <td><strong>Bridge</strong></td>
            <td>Layer 2 (Data Link)</td>
            <td>Frame</td>
            <td>MAC Address</td>
            <td>Separates domains per port</td>
            <td>1 domain</td>
          </tr>
          <tr>
            <td><strong>Switch</strong></td>
            <td>Layer 2 (Data Link)</td>
            <td>Frame</td>
            <td>MAC Address</td>
            <td>Separates domains per port</td>
            <td>1 domain (unless VLANs)</td>
          </tr>
          <tr>
            <td><strong>Router</strong></td>
            <td>Layer 3 (Network)</td>
            <td>Packet</td>
            <td>IP Address</td>
            <td>Separates domains per port</td>
            <td>Separates domains per port</td>
          </tr>
          <tr>
            <td><strong>Gateway</strong></td>
            <td>Layers 4–7 (App)</td>
            <td>Message</td>
            <td>Protocol Specific</td>
            <td>Isolated</td>
            <td>Isolated</td>
          </tr>
        </tbody>
      </table>
    `,
    diagram: "",
    technicalDetails: `
      <p>Collision domains are bounded by Layer 2 devices (Switches/Bridges) and Layer 3 devices (Routers). Broadcast domains are strictly bounded by Layer 3 devices (Routers) and Layer 2 VLAN boundaries.</p>
    `,
    workedExamples: {
      level1: "<strong>Question:</strong> How many collision domains and broadcast domains does a 24-port Layer 2 switch have?<br><br><strong>Answer:</strong> A 24-port switch creates <strong>24 separate collision domains</strong> (1 per port) and <strong>1 single broadcast domain</strong>.",
      level2: "<strong>Problem:</strong> How many collision domains and broadcast domains does a router with 4 Ethernet interfaces have?<br><br><strong>Answer:</strong> A router with 4 interfaces creates <strong>4 separate collision domains</strong> and <strong>4 separate broadcast domains</strong>.",
      level3: "<strong>Analysis:</strong> Why does a Hub create a single collision domain whereas a Switch separates collision domains?<br><br><strong>Answer:</strong> A Hub is a dumb Layer 1 multiport repeater that electrically replicates incoming bits onto all other ports simultaneously. A Switch is a Layer 2 device that buffers frames in memory and switches them independently between ports, so stations on different ports can transmit concurrently without colliding."
    },
    advantagesLimitations: `
      <table class="wiki-table">
        <thead><tr><th>Device</th><th>Primary Function</th><th>Limitation</th></tr></thead>
        <tbody>
          <tr><td>Hub / Repeater</td><td>Signal regeneration and cabling fanout.</td><td>Shares collisions across all connected nodes.</td></tr>
          <tr><td>Switch</td><td>High-speed micro-segmentation and frame forwarding.</td><td>Floods broadcasts across all ports.</td></tr>
          <tr><td>Router</td><td>Logical IP path selection and network isolation.</td><td>Slower per-packet routing lookup than switching.</td></tr>
        </tbody>
      </table>
    `,
    whereUsed: ["Campus LAN infrastructure", "Home Wi-Fi gateway routers", "Internet Service Provider core routing backbones"],
    quiz: [{
      question: "Which of the following networking devices breaks both collision domains AND broadcast domains?",
      options: ["Router", "Switch", "Hub", "Repeater"],
      correct: 0,
      explanation: "Routers operate at Layer 3 (Network Layer) and break both collision domains and broadcast domains at every interface."
    }],
    references: [{ cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Ed., Chapter 15.", url: "" }]
  }
};

const finalOut = `// topics_u2_syllabus.js - Master Academic Topic Content Repository for Unit 2
var TOPICS_U2_SYLLABUS = ` + JSON.stringify(data, null, 2) + `;\n
if (typeof window !== 'undefined') window.TOPICS_U2_SYLLABUS = TOPICS_U2_SYLLABUS;
if (typeof global !== 'undefined') global.TOPICS_U2_SYLLABUS = TOPICS_U2_SYLLABUS;
if (typeof module !== 'undefined' && module.exports) module.exports = TOPICS_U2_SYLLABUS;
`;

fs.writeFileSync(syllabusPath, finalOut, 'utf8');
console.log("Successfully added 5 hub topics to topics_u2_syllabus.js! Total topics:", Object.keys(data).length);

