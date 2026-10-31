const fs = require('fs');
const syllabus = require('../js/topics_u2_syllabus.js');

const t8Data = {
  "wifi-mac-sublayer": {
    id: "wifi-mac-sublayer",
    title: "Introduction to IEEE 802.11 MAC Sublayer",
    unit: "Unit 2 - Data Link Layer",
    level: "Foundational",
    standard: "IEEE 802.11 / Forouzan Ch. 14 / Tanenbaum Ch. 4",
    oneLiner: "Foundational architecture, scope, and responsibilities of the IEEE 802.11 Medium Access Control sublayer.",
    quickAnswer: "The IEEE 802.11 MAC sublayer is the lower sublayer of the Data Link Layer that manages access to the shared wireless radio channel, frame construction, physical addressing, collision avoidance via CSMA/CA, positive ACKs, power management, and link-layer security.",
    whyItMatters: "Unlike wired networks where nodes can transmit simultaneously via full-duplex switches, wireless networks share an unguided radio medium where transmitted energy blinds local receivers. The 802.11 MAC sublayer resolves this fundamental physical dilemma.",
    sections: {
      overview: `
        <p>The <strong>IEEE 802.11 MAC Sublayer</strong> is the lower sublayer of the Data Link Layer defined by the Institute of Electrical and Electronics Engineers (IEEE) for Wireless Local Area Networks (WLANs).</p>
        <p>According to <em>Behrouz A. Forouzan (Chapter 14)</em>, the Data Link Layer in IEEE 802.11 is divided into two distinct sublayers:</p>
        <ul class="wiki-bullet-list">
          <li><strong>Logical Link Control (LLC - IEEE 802.2):</strong> Provides a standardized, uniform interface to Layer 3 (Network Layer), performing multiplexing and flow control independently of the underlying radio hardware.</li>
          <li><strong>Medium Access Control (MAC - IEEE 802.11):</strong> Directly interfaces with the Physical Layer to control how wireless stations access and share the broadcast communication spectrum.</li>
        </ul>

        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Eight Core Responsibilities of the 802.11 MAC Sublayer</h3>
        <ol class="wiki-ordered-list">
          <li><strong>Medium Access Control:</strong> Governs exactly when and how a wireless station is authorized to emit RF energy onto the shared channel.</li>
          <li><strong>Framing:</strong> Encapsulates network layer packets into standardized 802.11 MAC frames with headers, addresses, and sequence numbers.</li>
          <li><strong>Physical Addressing:</strong> Uses 48-bit IEEE MAC addresses to uniquely identify wireless stations, Access Points, and Distribution System endpoints.</li>
          <li><strong>Collision Avoidance:</strong> Employs CSMA/CA with random backoff and virtual sensing (NAV) to prevent simultaneous transmissions before they occur.</li>
          <li><strong>Positive Acknowledgement (ACK):</strong> Enforces explicit Layer 2 ACK frame transmission for all unicast frames to confirm successful delivery.</li>
          <li><strong>Retransmission & ARQ:</strong> Automatically initiates retransmissions using an exponential retry countdown when expected ACKs fail to arrive.</li>
          <li><strong>Power Management:</strong> Coordinates sleep cycles for battery-constrained mobile stations using Traffic Indication Maps (TIM).</li>
          <li><strong>Security Support:</strong> Provides hardware-accelerated encryption and integrity protection via WPA2/WPA3 protocols.</li>
        </ol>

        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Comparative Analysis: IEEE 802.11 MAC vs. Ethernet (IEEE 802.3) MAC</h3>
        <table class="wiki-table">
          <thead>
            <tr><th>Comparison Parameter</th><th>Ethernet MAC (IEEE 802.3)</th><th>Wireless LAN MAC (IEEE 802.11)</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Network Medium</strong></td><td>Guided physical cables (Twisted-pair copper Cat6, Fiber).</td><td>Unguided atmospheric radio frequency waves (2.4, 5, 6 GHz).</td></tr>
            <tr><td><strong>Channel Access Technique</strong></td><td><strong>CSMA/CD:</strong> Collision Detection (listens while transmitting).</td><td><strong>CSMA/CA:</strong> Collision Avoidance (listens before transmitting).</td></tr>
            <tr><td><strong>Collision Feasibility</strong></td><td>Collisions easily detected via voltage shift on copper wire.</td><td>Collision detection is physically impossible (transceiver blindness).</td></tr>
            <tr><td><strong>Address Fields</strong></td><td>Fixed 2 MAC addresses (Destination MAC, Source MAC).</td><td>Up to <strong>4 MAC addresses</strong> (DA, SA, RA, TA, BSSID).</td></tr>
            <tr><td><strong>Layer 2 Acknowledgements</strong></td><td>No Layer 2 ACKs for unicast frames (unacknowledged service).</td><td><strong>Mandatory Layer 2 ACK</strong> frame returned after SIFS for every unicast frame.</td></tr>
            <tr><td><strong>Frame Types</strong></td><td>Single unified Ethernet frame format.</td><td>3 distinct frame categories: <strong>Management, Control, Data</strong>.</td></tr>
            <tr><td><strong>Handshake Support</strong></td><td>Does not use RTS/CTS control handshakes.</td><td>Supports 4-way <strong>RTS/CTS</strong> handshake to eliminate hidden stations.</td></tr>
          </tbody>
        </table>
      `,
      howItWorks: `
        <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Architectural Workflow of the MAC Sublayer</h3>
        <ol class="wiki-ordered-list">
          <li><strong>Downlink Transmission:</strong> LLC passes an IP packet to the MAC sublayer &rarr; MAC appends Frame Control, Duration, Addresses, and Sequence Control &rarr; computes 32-bit CRC &rarr; executes CSMA/CA channel contention &rarr; delivers frame to Physical Layer for OFDM modulation.</li>
          <li><strong>Uplink Reception:</strong> Physical Layer demodulates RF bitstream &rarr; passes frame to MAC sublayer &rarr; MAC calculates FCS checksum &rarr; if valid, extracts destination address &rarr; checks if frame is destined for this station &rarr; returns an ACK after SIFS &rarr; strips MAC header and passes payload to LLC.</li>
        </ol>
      `,
      technicalDetails: `
        <div class="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-800 text-xs">
          <h4 class="font-bold text-blue-800 dark:text-blue-300 mb-1">Standard Scope</h4>
          <p class="text-slate-700 dark:text-slate-300">The original IEEE 802.11 specification was published in 1997. It defined MAC layer operations running identically across various PHY layers: Frequency Hopping Spread Spectrum (FHSS), Direct Sequence Spread Spectrum (DSSS), and Infrared (IR).</p>
        </div>
      `,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/WLAN_overview.svg/800px-WLAN_overview.svg.png",
      imageCaption: "Figure 14.9: Position and role of the IEEE 802.11 MAC Sublayer in the local network communication stack.",
      workedExamples: [
        {
          title: "Worked Example 1: Comparing Wired vs Wireless MAC Addressing Overhead",
          difficulty: "Easy",
          problem: "An Ethernet II frame has a header overhead of 14 bytes (6B DA + 6B SA + 2B EtherType). An IEEE 802.11 data frame operating through an Access Point uses 3 address fields (6B each), a 2B Frame Control, 2B Duration, and 2B Sequence Control. Calculate the header overhead difference.",
          solution: `
            <p><strong>Step 1: Calculate Ethernet Header Overhead:</strong></p>
            <p>$$\\text{Header}_{\\text{Ethernet}} = 6 + 6 + 2 = 14\\text{ bytes}$$</p>
            <p><strong>Step 2: Calculate 802.11 Header Overhead:</strong></p>
            <p>$$\\text{Header}_{802.11} = 2\\,(\\text{FC}) + 2\\,(\\text{Duration}) + 3 \\times 6\\,(\\text{Addresses}) + 2\\,(\\text{SeqCtrl}) = 2 + 2 + 18 + 2 = 24\\text{ bytes}$$</p>
            <p><strong>Step 3: Difference:</strong></p>
            <p>$$\\Delta = 24\\text{ bytes} - 14\\text{ bytes} = 10\\text{ bytes additional overhead}$$</p>
            <p><strong>Conclusion:</strong> The 802.11 wireless MAC header is 71% larger than Ethernet due to wireless coordination, virtual sensing durations, and BSSID routing.</p>
          `
        }
      ],
      advantagesLimitations: `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800 text-xs">
            <h4 class="font-bold text-emerald-800 dark:text-emerald-300 mb-1">Advantages</h4>
            <ul class="space-y-1 text-slate-700 dark:text-slate-300">
              <li>&bull; Coordinates multi-station shared access without physical cables.</li>
              <li>&bull; Mitigates collisions via CSMA/CA and backoff.</li>
              <li>&bull; Enhances reliability with positive link-layer ACKs.</li>
            </ul>
          </div>
          <div class="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800 text-xs">
            <h4 class="font-bold text-rose-800 dark:text-rose-300 mb-1">Limitations</h4>
            <ul class="space-y-1 text-slate-700 dark:text-slate-300">
              <li>&bull; Substantial MAC control frame overhead (RTS, CTS, ACK).</li>
              <li>&bull; Hidden and exposed station performance penalties.</li>
              <li>&bull; Non-deterministic latency under heavy contention.</li>
            </ul>
          </div>
        </div>
      `,
      whereUsed: "All Wi-Fi certified client devices, routers, access points, and wireless interface cards.",
      references: "Forouzan, Data Communications and Networking (4th/5th Ed.), Chapter 14, Section 14.2."
    }
  },

  "u2-ieee-802-11-architecture": {
    id: "u2-ieee-802-11-architecture",
    title: "IEEE 802.11 MAC Architecture",
    unit: "Unit 2 - Data Link Layer",
    level: "Intermediate",
    standard: "IEEE 802.11 / Forouzan Ch. 14 / Tanenbaum Ch. 4",
    oneLiner: "The architectural framework of the 802.11 MAC sublayer: Distributed Coordination Function (DCF) and Point Coordination Function (PCF).",
    quickAnswer: "The IEEE 802.11 MAC sublayer architecture is built on two coordination functions: 1) Distributed Coordination Function (DCF), which is mandatory and provides distributed contention-based access using CSMA/CA; and 2) Point Coordination Function (PCF), which is optional and sits on top of DCF to provide centralized contention-free polling access.",
    whyItMatters: "Understanding the dual-function architecture of the 802.11 MAC layer explains how wireless LANs gracefully handle both standard asynchronous data traffic and delay-sensitive multimedia applications.",
    sections: {
      overview: `
        <p>In the IEEE 802.11 standard, the Medium Access Control (MAC) sublayer architecture is structured as a dual-mode access hierarchy sitting directly above the Physical Layer (PHY) and below Logical Link Control (LLC):</p>
        
        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">1. Distributed Coordination Function (DCF)</h3>
        <p><strong>DCF</strong> is the foundational, mandatory medium access control mechanism in all IEEE 802.11 devices:</p>
        <ul class="wiki-bullet-list">
          <li>Operates as a completely decentralized, distributed contention protocol.</li>
          <li>Uses <strong>CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance)</strong>.</li>
          <li>All mobile stations contend for the radio medium on an equal basis using random backoff intervals.</li>
          <li>Employs the <strong>DIFS (DCF Interframe Space)</strong> interval to arbitrate normal contention.</li>
          <li>Supported in both <strong>Ad Hoc (Independent BSS)</strong> and <strong>Infrastructure BSS</strong> networks.</li>
        </ul>

        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">2. Point Coordination Function (PCF)</h3>
        <p><strong>PCF</strong> is an optional, centralized channel access mechanism designed to provide contention-free communication:</p>
        <ul class="wiki-bullet-list">
          <li>Operates as a centralized master-slave polling architecture.</li>
          <li>The <strong>Point Coordinator (PC)</strong>, which resides inside the Access Point (AP), actively polls associated stations to grant transmission opportunities.</li>
          <li>Uses the shorter <strong>PIFS (PCF Interframe Space)</strong> interval, giving the Point Coordinator absolute priority over all DCF stations.</li>
          <li>Supported strictly in <strong>Infrastructure mode</strong> (cannot function in Ad Hoc networks).</li>
        </ul>

        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">The 802.11 Superframe Structure</h3>
        <p>When PCF is enabled, channel time is structured into repeating cycles called <strong>Superframes</strong>:</p>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-center my-3">
          [Beacon Frame] &rarr; [Contention-Free Period (CFP) - PCF] &rarr; [Contention Period (CP) - DCF]
        </div>
        <p class="text-xs text-slate-600 dark:text-slate-300">During the CFP, the Point Coordinator polls time-bounded stations (e.g. VoIP phones) with zero collision risk. During the CP, standard stations compete for best-effort web traffic using DCF.</p>
      `,
      howItWorks: `
        <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Interaction Between DCF and PCF</h3>
        <ol class="wiki-ordered-list">
          <li>At the start of a Superframe, the Point Coordinator waits for a <strong>PIFS</strong> duration. Because PIFS &lt; DIFS, the AP seizes the medium before any DCF station can finish waiting.</li>
          <li>The AP transmits a <strong>Beacon</strong> frame announcing the Contention-Free Period (CFP). All DCF stations read the CFP duration and set their NAV timers to sleep.</li>
          <li>The AP polls station 1 &rarr; station 1 replies with data after SIFS &rarr; AP acknowledges and polls station 2 &rarr; repeating collision-free.</li>
          <li>The AP transmits a <strong>CF-End</strong> control frame, releasing the medium. Stations clear their NAV and DCF contention resumes for the remainder of the Superframe.</li>
        </ol>
      `,
      technicalDetails: `
        <table class="wiki-table">
          <thead>
            <tr><th>Architectural Property</th><th>DCF (Distributed)</th><th>PCF (Centralized)</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Mandatory / Optional</strong></td><td>Mandatory in all Wi-Fi hardware</td><td>Optional; rarely implemented in commercial APs</td></tr>
            <tr><td><strong>Channel Coordination</strong></td><td>Distributed peer contention</td><td>Centralized AP Point Coordinator</td></tr>
            <tr><td><strong>Interframe Space</strong></td><td>DIFS ($SIFS + 2 \\times SlotTime$)</td><td>PIFS ($SIFS + 1 \\times SlotTime$)</td></tr>
            <tr><td><strong>Priority</strong></td><td>Lower priority</td><td>Higher priority than DCF</td></tr>
            <tr><td><strong>Traffic Target</strong></td><td>Best-effort asynchronous data</td><td>Time-bounded streaming (VoIP, Video)</td></tr>
          </tbody>
        </table>
      `,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/802.11_DCF_PCF.svg/800px-802.11_DCF_PCF.svg.png",
      imageCaption: "Figure 14.10: Layered IEEE 802.11 MAC Sublayer Architecture showing DCF and PCF sitting above the Physical Layer.",
      workedExamples: [
        {
          title: "Worked Example 1: PCF Priority Preemption Analysis",
          difficulty: "Easy",
          problem: "A DCF station has an outgoing web packet and senses the medium become idle. Simultaneously, an Access Point running PCF wishes to poll a station. Explain which device transmits first if SIFS = 10 microseconds and Slot Time = 20 microseconds.",
          solution: `
            <p><strong>Step 1: Calculate PCF Waiting Time (PIFS):</strong></p>
            <p>$$\\text{PIFS} = \\text{SIFS} + \\text{SlotTime} = 10\\,\\mu\\text{s} + 20\\,\\mu\\text{s} = 30\\,\\mu\\text{s}$$</p>
            <p><strong>Step 2: Calculate DCF Waiting Time (DIFS):</strong></p>
            <p>$$\\text{DIFS} = \\text{SIFS} + 2(\\text{SlotTime}) = 10\\,\\mu\\text{s} + 2(20\\,\\mu\\text{s}) = 50\\,\\mu\\text{s}$$</p>
            <p><strong>Step 3: Compare Timers:</strong></p>
            <p>The AP waits 30 microseconds and begins transmitting its Beacon/Poll frame. At $t = 30\\,\\mu\\text{s}$, the DCF station is still in the middle of its mandatory 50-microsecond DIFS wait.</p>
            <p><strong>Conclusion:</strong> The DCF station senses the AP's transmission, detects the channel is busy, and freezes its attempt. PCF achieves absolute preemptive priority.</p>
          `
        }
      ],
      advantagesLimitations: `
        <div class="space-y-1 text-xs">
          <p><strong>Key Insight:</strong> DCF guarantees robustness and decentralization; PCF guarantees bounded latency for time-sensitive traffic.</p>
        </div>
      `,
      whereUsed: "Enterprise Wi-Fi deployments, cellular-offload gateways, and 802.11e/WMM QoS systems.",
      references: "Forouzan Ch. 14, Section 14.2; Tanenbaum Ch. 4, Section 4.4."
    }
  },

  "u2-ieee-802-11-dcf": {
    id: "u2-ieee-802-11-dcf",
    title: "Distributed Coordination Function (DCF)",
    unit: "Unit 2 - Data Link Layer",
    level: "Intermediate",
    standard: "IEEE 802.11 / Forouzan Ch. 14 / Section 3",
    oneLiner: "In-depth protocol rules, 7-step working mechanism, and contention algorithms of the Distributed Coordination Function.",
    quickAnswer: "The Distributed Coordination Function (DCF) is the primary, mandatory medium access protocol in IEEE 802.11 that enables multiple wireless stations to share a common RF spectrum autonomously using CSMA/CA, carrier sensing, DIFS waiting intervals, pseudo-random backoff, and explicit positive ACKs.",
    whyItMatters: "DCF coordinates over 99% of all commercial Wi-Fi traffic globally, operating without any centralized scheduler to achieve distributed fairness among competing smartphones and laptops.",
    sections: {
      overview: `
        <p>The <strong>Distributed Coordination Function (DCF)</strong> is the fundamental medium access mechanism used in IEEE 802.11 wireless LANs. It enables multiple autonomous stations to communicate over a shared wireless channel without relying on any central controller or master scheduler.</p>
        
        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Seven Key Characteristics of DCF</h3>
        <ul class="wiki-bullet-list">
          <li><strong>Distributed Operation:</strong> Decisions to transmit are made locally by each individual station.</li>
          <li><strong>Dual Carrier Sensing:</strong> Combines physical Clear Channel Assessment (CCA) with virtual carrier sensing (NAV).</li>
          <li><strong>Interframe Space (DIFS):</strong> Enforces a mandatory idle wait time of DIFS before any station may initiate backoff.</li>
          <li><strong>Slotted Random Backoff:</strong> Staggers transmissions across a randomized Contention Window $[0, CW]$ to minimize collision probabilities.</li>
          <li><strong>Counter Freezing:</strong> Stations freeze their backoff counters when the medium is busy, resuming countdown once the channel is idle for DIFS.</li>
          <li><strong>Layer 2 Positive Acknowledgements:</strong> Receivers verify frame integrity via CRC-32 and return an immediate ACK after SIFS.</li>
          <li><strong>Optional RTS/CTS Protection:</strong> Stations can prepend a 4-way RTS/CTS exchange for frames exceeding the RTS Threshold.</li>
        </ul>
      `,
      howItWorks: `
        <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Step-by-Step Working Mechanism of DCF (7 Steps)</h3>
        <ol class="wiki-ordered-list">
          <li><strong>Step 1: Channel Sensing:</strong> When a station has a frame to send, it checks whether the channel is physically or virtually busy (CCA or NAV &gt; 0).</li>
          <li><strong>Step 2: Channel Idle Deferral:</strong> If the channel is sensed idle, the station must verify that it remains idle for a continuous <strong>DIFS</strong> period (typically 50 $\mu$s in 802.11b).</li>
          <li><strong>Step 3: Random Backoff Selection:</strong> The station selects a pseudo-random integer $B$ uniformly distributed in the interval $[0, CW]$, where initial $CW = CW_{\\min}$ (e.g. 15 or 31 slots).</li>
          <li><strong>Step 4: Backoff Countdown & Freezing:</strong> The station decrements its backoff counter by 1 for each elapsed idle Slot Time ($20\\,\\mu\\text{s}$). If another station begins transmitting, the counter is <strong>frozen</strong> and preserved until the channel becomes idle again for DIFS.</li>
          <li><strong>Step 5: Frame Transmission:</strong> When the backoff counter reaches zero ($B = 0$), the station immediately transmits its MAC data frame.</li>
          <li><strong>Step 6: Receiver Verification & ACK:</strong> The destination station verifies the 32-bit FCS. If valid, the receiver waits for a short <strong>SIFS</strong> interval (10 $\mu$s) and transmits an ACK frame.</li>
          <li><strong>Step 7: Retransmission (Retry Procedure):</strong> If the sender does not receive an ACK before its ACK timeout expires, it assumes collision, doubles its contention window ($CW = 2(CW+1)-1$), and repeats the backoff procedure.</li>
        </ol>
      `,
      technicalDetails: `
        <div class="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800 text-xs">
          <h4 class="font-bold text-emerald-900 dark:text-emerald-200 mb-1">DCF Contention Window Evolution</h4>
          <p class="text-slate-700 dark:text-slate-300">In 802.11b: $CW_{\\min} = 31$ slots, $CW_{\\max} = 1023$ slots. After collision 1: $CW = 63$. After collision 2: $CW = 127$. After collision 5: $CW = 1023$. Upon reaching 7 retries for small frames (or 4 for large frames), the packet is dropped.</p>
        </div>
      `,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/CSMA_CA.svg/800px-CSMA_CA.svg.png",
      imageCaption: "Figure 14.11: Complete operation flowchart of the Distributed Coordination Function (DCF) with random backoff.",
      workedExamples: [
        {
          title: "Worked Example 1: Backoff Countdown with Channel Freezing",
          difficulty: "Medium",
          problem: "Station A selects a random backoff counter of 6 slots (Slot Time = 20 microseconds). After 2 idle slots, Station B transmits a frame lasting 100 microseconds. Station A waits for B to finish and detects the channel idle for DIFS (50 microseconds). How much total time elapses before Station A transmits its frame?",
          solution: `
            <p><strong>Step 1: Initial Countdown:</strong></p>
            <p>Station A counts down 2 slots: $t_1 = 2 \\times 20\\,\\mu\\text{s} = 40\\,\\mu\\text{s}$. Remaining backoff counter $= 6 - 2 = 4$ slots.</p>
            <p><strong>Step 2: Channel Busy Period:</strong></p>
            <p>Station B transmits for $t_{\\text{busy}} = 100\\,\\mu\\text{s}$. Station A freezes its counter at 4 slots.</p>
            <p><strong>Step 3: DIFS Deferral:</strong></p>
            <p>Once Station B finishes, Station A must wait for the channel to remain idle for continuous DIFS: $t_{\\text{DIFS}} = 50\\,\\mu\\text{s}$.</p>
            <p><strong>Step 4: Remaining Backoff Countdown:</strong></p>
            <p>Station A resumes counting down its remaining 4 slots: $t_2 = 4 \\times 20\\,\\mu\\text{s} = 80\\,\\mu\\text{s}$.</p>
            <p><strong>Step 5: Total Elapsed Time:</strong></p>
            <p>$$T_{\\text{total}} = 40\\,\\mu\\text{s} + 100\\,\\mu\\text{s} + 50\\,\\mu\\text{s} + 80\\,\\mu\\text{s} = 270\\,\\mu\\text{s}$$</p>
            <p><strong>Conclusion:</strong> Station A transmits its frame after 270 microseconds.</p>
          `
        }
      ],
      advantagesLimitations: `
        <div class="space-y-1 text-xs">
          <p><strong>Advantages:</strong> Completely autonomous, highly resilient, and zero single-point-of-failure.</p>
        </div>
      `,
      whereUsed: "Standard Wi-Fi communications in home, enterprise, and public hotspot networks.",
      references: "Forouzan, Data Communications and Networking, Chapter 14, Section 14.3; IEEE 802.11-2020 Standard."
    }
  },

  "u2-ieee-802-11-pcf": {
    id: "u2-ieee-802-11-pcf",
    title: "Point Coordination Function (PCF)",
    unit: "Unit 2 - Data Link Layer",
    level: "Intermediate",
    standard: "IEEE 802.11 / Forouzan Ch. 14 / Section 8",
    oneLiner: "Principles, centralized polling workflow, and Superframe structure of the Point Coordination Function.",
    quickAnswer: "The Point Coordination Function (PCF) is an optional, centralized channel access protocol implemented in Infrastructure networks where an Access Point acts as the Point Coordinator (PC). By using PIFS intervals, the AP gains priority access to poll registered stations sequentially during a Contention-Free Period (CFP), providing delay-bounded service for real-time traffic.",
    whyItMatters: "PCF represents the theoretical foundation of contention-free wireless scheduling in IEEE 802.11, which directly inspired modern Wi-Fi 6 OFDMA deterministic resource allocation.",
    sections: {
      overview: `
        <p>The <strong>Point Coordination Function (PCF)</strong> is an optional centralized channel access mechanism defined in the IEEE 802.11 standard. Unlike the distributed, competitive nature of DCF, PCF operates as a centralized master-slave polling system.</p>
        <p>In PCF, the <strong>Access Point (AP)</strong> functions as the <strong>Point Coordinator (PC)</strong>, actively maintaining a polling list of associated stations that require guaranteed, delay-bounded transmission opportunities.</p>

        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">The Superframe Concept: CFP and CP Alternation</h3>
        <p>Under PCF, time on the wireless medium is partitioned into repeating <strong>Superframes</strong> divided into two phases:</p>
        <ul class="wiki-bullet-list">
          <li><strong>Contention-Free Period (CFP):</strong>
            <ul class="wiki-bullet-list mt-1">
              <li>The Point Coordinator controls all channel access.</li>
              <li>Stations only transmit when explicitly polled by the AP.</li>
              <li>Collisions between stations are <strong>strictly eliminated</strong>.</li>
              <li>Designed to support time-sensitive traffic (VoIP, teleconferencing, video streaming).</li>
            </ul>
          </li>
          <li><strong>Contention Period (CP):</strong>
            <ul class="wiki-bullet-list mt-1">
              <li>The AP releases the channel by transmitting a <code>CF-End</code> control frame.</li>
              <li>All stations compete for medium access using standard DCF (CSMA/CA).</li>
              <li>Accommodates bursty, asynchronous web and file transfer traffic.</li>
            </ul>
          </li>
        </ul>
      `,
      howItWorks: `
        <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Step-by-Step Working Mechanism of PCF</h3>
        <ol class="wiki-ordered-list">
          <li><strong>PIFS Seizure:</strong> At the start of a Superframe, the AP senses the medium and waits for <strong>PIFS (Point Coordination IFS)</strong>. Because $\\text{PIFS} < \\text{DIFS}$, the AP seizes the channel before any DCF station can start transmitting.</li>
          <li><strong>Beacon Broadcast:</strong> The AP broadcasts a Beacon frame containing the maximum CFP duration. All ordinary stations set their NAV timers to the CFP duration, muting DCF contention.</li>
          <li><strong>Sequential Polling:</strong> The AP transmits a <code>CF-Poll</code> frame (often piggybacked with downlink data) to the first station on its polling list.</li>
          <li><strong>Station Transmission:</strong> The polled station responds with its uplink data frame after waiting a short <strong>SIFS</strong> interval.</li>
          <li><strong>Acknowledgement & Next Poll:</strong> The AP receives the data, acknowledges it, and immediately polls the next station after SIFS.</li>
          <li><strong>CF-End Termination:</strong> When the CFP timer expires, or if the polling queue is exhausted, the AP broadcasts a <code>CF-End</code> frame, resetting all stations' NAV timers and opening the Contention Period (CP).</li>
        </ol>
      `,
      technicalDetails: `
        <div class="p-3 bg-violet-50 dark:bg-violet-950/40 rounded-lg border border-violet-200 dark:border-violet-800 text-xs">
          <h4 class="font-bold text-violet-900 dark:text-violet-200 mb-1">Why PCF Was Replaced by 802.11e EDCA</h4>
          <p class="text-slate-700 dark:text-slate-300">PCF suffered from high polling overhead, complex station registration, and variable beacon delays caused by lingering DCF transmissions crossing the superframe boundary. IEEE 802.11e introduced <strong>EDCA</strong> and <strong>HCCA</strong> to deliver hardware-based Quality of Service (QoS) queues without PCF's rigid polling inefficiency.</p>
        </div>
      `,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/802.11_DCF_PCF.svg/800px-802.11_DCF_PCF.svg.png",
      imageCaption: "Figure 14.12: IEEE 802.11 Superframe showing the Contention-Free Period (PCF) alternating with Contention Period (DCF).",
      workedExamples: [
        {
          title: "Worked Example 1: PCF Piggybacking Efficiency",
          difficulty: "Easy",
          problem: "An Access Point running PCF has downlink data for Station 1 and wishes to poll it. Instead of sending an ACK, a Data frame, and a Poll frame separately, it combines them into a single Data+CF-Ack+CF-Poll frame. If each independent frame has 24 bytes of MAC header, calculate the bytes saved by piggybacking.",
          solution: `
            <p><strong>Step 1: Separate Transmissions:</strong></p>
            <p>Three separate frames would require $3 \\times 24 = 72$ bytes of MAC headers, plus two SIFS intervals.</p>
            <p><strong>Step 2: Piggybacked Frame:</strong></p>
            <p>A single combined Data+CF-Ack+CF-Poll frame uses only one 24-byte MAC header.</p>
            <p><strong>Step 3: Overhead Saved:</strong></p>
            <p>$$\\Delta = 72\\text{ bytes} - 24\\text{ bytes} = 48\\text{ bytes}$$</p>
            <p><strong>Conclusion:</strong> Piggybacking eliminates 48 bytes of MAC header overhead per station exchange, optimizing polling throughput.</p>
          `
        }
      ],
      advantagesLimitations: `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800 text-xs">
            <h4 class="font-bold text-emerald-800 dark:text-emerald-300 mb-1">Advantages</h4>
            <ul class="space-y-1 text-slate-700 dark:text-slate-300">
              <li>&bull; Completely eliminates collisions during CFP.</li>
              <li>&bull; Predictable latency for real-time VoIP.</li>
              <li>&bull; Centralized bandwidth management.</li>
            </ul>
          </div>
          <div class="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800 text-xs">
            <h4 class="font-bold text-rose-800 dark:text-rose-300 mb-1">Limitations</h4>
            <ul class="space-y-1 text-slate-700 dark:text-slate-300">
              <li>&bull; High polling overhead for idle stations.</li>
              <li>&bull; Requires complex AP coordinator software.</li>
              <li>&bull; Not supported in Ad Hoc networks.</li>
            </ul>
          </div>
        </div>
      `,
      whereUsed: "Legacy time-sensitive wireless services, specialized industrial automation, and academic MAC scheduling research.",
      references: "Forouzan, Data Communications and Networking, Chapter 14, Section 14.3; IEEE 802.11 Standards."
    }
  },

  "u2-ieee-802-11-csma-ca": {
    id: "u2-ieee-802-11-csma-ca",
    title: "CSMA/CA in IEEE 802.11",
    unit: "Unit 2 - Data Link Layer",
    level: "Intermediate",
    standard: "IEEE 802.11 / Forouzan Ch. 14 / Section 4",
    oneLiner: "The complete Carrier Sense Multiple Access with Collision Avoidance protocol mechanics, components, and timing rules.",
    quickAnswer: "CSMA/CA is the primary medium access protocol of IEEE 802.11 designed to proactively avoid collisions before transmission begins. It integrates six cooperating components: physical carrier sensing (CCA), virtual carrier sensing (NAV), interframe spacing (DIFS/SIFS), slotted pseudo-random backoff, explicit positive acknowledgements (ACK), and optional 4-way RTS/CTS handshakes.",
    whyItMatters: "CSMA/CA is the defining protocol of wireless LAN networking, illustrating how to solve the channel sharing problem when collision detection is physically infeasible.",
    sections: {
      overview: `
        <p><strong>Carrier Sense Multiple Access with Collision Avoidance (CSMA/CA)</strong> is the foundational medium access technique used across all IEEE 802.11 wireless LAN generations.</p>
        <p>While wired Ethernet uses CSMA/CD to detect and abort collisions after they occur, CSMA/CA focuses entirely on <strong>minimizing the mathematical probability that collisions happen in the first place</strong>.</p>

        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">The Six Core Components of CSMA/CA</h3>
        <ol class="wiki-ordered-list">
          <li><strong>Physical Carrier Sensing:</strong> The Physical Layer performs Clear Channel Assessment (CCA) by measuring radio frequency energy on the antenna. If RF energy exceeds the carrier sense threshold (e.g. -82 dBm), the channel is reported as busy.</li>
          <li><strong>Virtual Carrier Sensing:</strong> The MAC sublayer maintains an internal <strong>Network Allocation Vector (NAV)</strong> timer based on duration fields in overheard frames. If NAV &gt; 0, the channel is treated as virtually busy.</li>
          <li><strong>Interframe Spaces (IFS):</strong> Mandatory waiting periods (SIFS, PIFS, DIFS, EIFS) that prioritize different types of traffic.</li>
          <li><strong>Slotted Random Backoff:</strong> A pseudo-random countdown mechanism ($k \in [0, CW]$) that prevents all waiting stations from transmitting simultaneously when the channel becomes idle.</li>
          <li><strong>Layer 2 Positive Acknowledgements:</strong> Because the sender cannot hear collisions while transmitting, the receiver returns an explicit ACK frame after SIFS to confirm undamaged reception.</li>
          <li><strong>Optional RTS/CTS Handshake:</strong> A 4-way reservation exchange that clears the channel around both sender and receiver, resolving the hidden terminal problem.</li>
        </ol>

        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Comprehensive Comparison: CSMA/CA vs. CSMA/CD</h3>
        <table class="wiki-table">
          <thead>
            <tr><th>Feature</th><th>CSMA/CA (IEEE 802.11 Wireless)</th><th>CSMA/CD (IEEE 802.3 Wired)</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Core Strategy</strong></td><td><strong>Collision Avoidance:</strong> Staggers transmissions prior to sending.</td><td><strong>Collision Detection:</strong> Detects collisions while sending and aborts.</td></tr>
            <tr><td><strong>Medium</strong></td><td>Unguided atmospheric radio frequency spectrum.</td><td>Guided copper / coaxial conductors.</td></tr>
            <tr><td><strong>Backoff Execution</strong></td><td>Executes backoff <strong>before</strong> frame transmission.</td><td>Executes backoff <strong>after</strong> collision is detected.</td></tr>
            <tr><td><strong>Confirmation Mechanism</strong></td><td>Mandatory Layer 2 ACK frame for every unicast packet.</td><td>No link-layer ACK; absence of collision implies success.</td></tr>
            <tr><td><strong>Handshake Support</strong></td><td>Supports RTS/CTS 4-way virtual carrier sensing.</td><td>Does not support or require RTS/CTS.</td></tr>
            <tr><td><strong>Collision Recovery Overhead</strong></td><td>Entire frame time is wasted upon unacknowledged collision.</td><td>Only small slot time ($2\\tau = 51.2\\,\\mu\\text{s}$) is lost.</td></tr>
          </tbody>
        </table>
      `,
      howItWorks: `
        <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Detailed Operational Sequence of Basic CSMA/CA</h3>
        <ol class="wiki-ordered-list">
          <li>A station prepares a MAC frame received from the Network Layer.</li>
          <li>It senses the channel using both physical CCA and virtual NAV.</li>
          <li>If the channel is busy, it defers until the ongoing transmission completes.</li>
          <li>When the channel becomes idle, the station waits for a continuous <strong>DIFS</strong> period.</li>
          <li>If the channel remains idle during DIFS, the station selects a random backoff integer from $[0, CW]$.</li>
          <li>The station decrements its counter by 1 for each idle Slot Time. If the channel becomes busy, the counter freezes.</li>
          <li>When the backoff counter reaches zero, the station transmits the frame.</li>
          <li>The destination verifies FCS and returns an <strong>ACK</strong> after a <strong>SIFS</strong> interval.</li>
          <li>If no ACK is received before the ACK timeout, the sender assumes collision, doubles $CW$, and retransmits.</li>
        </ol>
      `,
      technicalDetails: `
        <div class="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-800 text-xs">
          <p class="font-bold text-blue-800 dark:text-blue-300">Important Conceptual Rule:</p>
          <p class="text-slate-700 dark:text-slate-300 mt-1">CSMA/CA cannot guarantee that collisions will <em>never</em> happen. If two stations independently pick the exact same random backoff integer, their counters reach zero simultaneously, causing a collision. CSMA/CA minimizes collision probability to acceptable levels.</p>
        </div>
      `,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/CSMA_CA.svg/800px-CSMA_CA.svg.png",
      imageCaption: "Figure 14.13: Flow diagram of Carrier Sense Multiple Access with Collision Avoidance (CSMA/CA).",
      workedExamples: [
        {
          title: "Worked Example 1: Probability of Simultaneous Backoff Collision",
          difficulty: "Medium",
          problem: "Two stations (A and B) both have frames to transmit and enter backoff with $CW = 15$ ($k \\in \\{0, 1, 2, \\dots, 15\\}$). Assuming their random integer selections are independent and uniform, calculate the probability that both stations pick the exact same slot number and collide.",
          solution: `
            <p><strong>Step 1: Total Possible Outcomes:</strong></p>
            <p>Each station has 16 possible slot choices ($CW + 1 = 16$). Total outcomes $= 16 \\times 16 = 256$.</p>
            <p><strong>Step 2: Favorable Collision Outcomes:</strong></p>
            <p>A collision occurs if both pick slot 0, slot 1, ..., or slot 15. There are exactly 16 such pairs.</p>
            <p><strong>Step 3: Calculate Probability:</strong></p>
            <p>$$P(\\text{Collision}) = \\frac{16}{256} = \\frac{1}{16} = 0.0625 = 6.25\\%$$</p>
            <p><strong>Conclusion:</strong> With $CW = 15$, there is a 6.25% collision probability between two contending stations. If collision occurs, $CW$ expands to 31, reducing the collision probability to $1/32 = 3.125\\%$.</p>
          `
        }
      ],
      advantagesLimitations: `
        <div class="space-y-1 text-xs">
          <p><strong>Summary:</strong> CSMA/CA achieves robust distributed channel sharing across noisy, unguided RF spectrum.</p>
        </div>
      `,
      whereUsed: "IEEE 802.11 Wi-Fi, IEEE 802.15.4 Zigbee, and wireless sensor networking protocols.",
      references: "Forouzan Ch. 14, Section 14.3; Tanenbaum Ch. 4, Section 4.4."
    }
  },

  "u2-ieee-802-11-ifs": {
    id: "u2-ieee-802-11-ifs",
    title: "Interframe Spaces (IFS) in IEEE 802.11",
    unit: "Unit 2 - Data Link Layer",
    level: "Intermediate",
    standard: "IEEE 802.11 / Forouzan Ch. 14 / Section 7",
    oneLiner: "Detailed analysis of IEEE 802.11 waiting intervals: SIFS, PIFS, DIFS, EIFS, formulas, and priority arbitration.",
    quickAnswer: "An Interframe Space (IFS) is a mandatory idle waiting period between consecutive frame transmissions in IEEE 802.11. By assigning different durations to different frame types, IEEE 802.11 creates a strict priority hierarchy: SIFS (shortest, highest priority for ACK/CTS) < PIFS (Point Coordinator polling) < DIFS (standard DCF contention) < EIFS (longest, frame error recovery).",
    whyItMatters: "Interframe spacing is the primary mechanism IEEE 802.11 uses to implement Quality of Service and collision-free transactions without needing physical control channels.",
    sections: {
      overview: `
        <p>In IEEE 802.11 wireless networks, an <strong>Interframe Space (IFS)</strong> is a standardized idle waiting interval required between consecutive transmissions on the radio channel.</p>
        <p>The fundamental principle of IFS is simple yet powerful: <strong>A shorter interframe space confers higher transmission priority.</strong> A station with a shorter IFS waits less time and therefore seizes the channel before stations with longer IFS intervals can begin transmitting.</p>

        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">The Four Types of Interframe Spaces</h3>
        <ol class="wiki-ordered-list">
          <li><strong>SIFS (Short Interframe Space):</strong>
            <p class="text-xs text-slate-600 dark:text-slate-300 mt-1">The shortest interval in 802.11 (typically 10 $\mu$s in 2.4 GHz OFDM). Used for high-priority immediate responses: <strong>ACK frames</strong>, <strong>CTS frames</strong>, and subsequent fragments of a fragmented frame. Because SIFS is the shortest, the receiver can acknowledge a frame before any other station can interrupt.</p>
          </li>
          <li><strong>PIFS (Point Coordination IFS):</strong>
            <p class="text-xs text-slate-600 dark:text-slate-300 mt-1">Used strictly by the <strong>Point Coordinator (AP)</strong> during PCF operation. The AP waits for PIFS before seizing the channel to begin the Contention-Free Period (CFP). Because PIFS &lt; DIFS, the AP always preempts ordinary stations.</p>
          </li>
          <li><strong>DIFS (Distributed Coordination IFS):</strong>
            <p class="text-xs text-slate-600 dark:text-slate-300 mt-1">The standard waiting period used by stations operating under normal DCF access before initiating or resuming random backoff. Stations must sense the channel continuously idle for DIFS before transmitting.</p>
          </li>
          <li><strong>EIFS (Extended Interframe Space):</strong>
            <p class="text-xs text-slate-600 dark:text-slate-300 mt-1">The longest interframe space, invoked when a station receives a frame with an invalid CRC-32 checksum. EIFS gives other stations that correctly decoded the frame sufficient time to complete their ACK exchange before the confused station attempts transmission.</p>
          </li>
        </ol>

        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Master Comparison & Priority Order</h3>
        <table class="wiki-table">
          <thead>
            <tr><th>IFS Acronym</th><th>Full Name</th><th>Relative Priority</th><th>Primary Operational Purpose</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>SIFS</strong></td><td>Short Interframe Space</td><td><strong>Highest Priority (1)</strong></td><td>ACK, CTS, and immediate frame exchange responses.</td></tr>
            <tr><td><strong>PIFS</strong></td><td>PCF Interframe Space</td><td><strong>Second Priority (2)</strong></td><td>Gains priority access for the AP Point Coordinator.</td></tr>
            <tr><td><strong>DIFS</strong></td><td>DCF Interframe Space</td><td><strong>Normal Priority (3)</strong></td><td>Standard contention-based access for ordinary data frames.</td></tr>
            <tr><td><strong>EIFS</strong></td><td>Extended Interframe Space</td><td><strong>Lowest Priority (4)</strong></td><td>Protective recovery after receiving a corrupted frame.</td></tr>
          </tbody>
        </table>
      `,
      howItWorks: `
        <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Mathematical Formulas and Relationships (Section 7.9)</h3>
        <p>In traditional IEEE 802.11 implementations, interframe spaces are mathematically derived from the physical layer's basic <strong>Slot Time</strong> and <strong>SIFS</strong> duration:</p>
        <div class="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs text-center space-y-2 my-3">
          <p class="text-blue-600 dark:text-blue-400 font-bold">PIFS = SIFS + SlotTime</p>
          <p class="text-indigo-600 dark:text-indigo-400 font-bold">DIFS = SIFS + 2(SlotTime)</p>
          <p class="text-slate-500">$$\\text{SIFS} < \\text{PIFS} < \\text{DIFS} < \\text{EIFS}$$</p>
        </div>
      `,
      technicalDetails: `
        <div class="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-800 text-xs">
          <h4 class="font-bold text-amber-900 dark:text-amber-200 mb-1">PHY-Specific Timing Parameters</h4>
          <ul class="space-y-1 text-slate-700 dark:text-slate-300">
            <li><strong>802.11b (DSSS):</strong> SIFS = 10 $\mu$s, Slot Time = 20 $\mu$s &rarr; PIFS = 30 $\mu$s, DIFS = 50 $\mu$s.</li>
            <li><strong>802.11a/g/n/ac/ax (5 GHz OFDM):</strong> SIFS = 16 $\mu$s, Slot Time = 9 $\mu$s &rarr; PIFS = 25 $\mu$s, DIFS = 34 $\mu$s.</li>
          </ul>
        </div>
      `,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/IEEE_802.11_IFS.svg/800px-IEEE_802.11_IFS.svg.png",
      imageCaption: "Figure 14.14: Timing relationships and duration hierarchy of IEEE 802.11 Interframe Spaces.",
      workedExamples: [
        {
          title: "Worked Example 1: Calculating PIFS and DIFS from Legacy Values",
          difficulty: "Easy",
          problem: "Given an IEEE 802.11 PHY layer where SIFS = 10 microseconds and Slot Time = 20 microseconds, calculate the exact values of PIFS and DIFS.",
          solution: `
            <p><strong>Step 1: Calculate PIFS:</strong></p>
            <p>$$\\text{PIFS} = \\text{SIFS} + \\text{SlotTime} = 10\\,\\mu\\text{s} + 20\\,\\mu\\text{s} = 30\\,\\mu\\text{s}$$</p>
            <p><strong>Step 2: Calculate DIFS:</strong></p>
            <p>$$\\text{DIFS} = \\text{SIFS} + 2(\\text{SlotTime}) = 10\\,\\mu\\text{s} + 2(20\\,\\mu\\text{s}) = 10 + 40 = 50\\,\\mu\\text{s}$$</p>
            <p><strong>Conclusion:</strong> $\\text{PIFS} = 30\\,\\mu\\text{s}$ and $\\text{DIFS} = 50\\,\\mu\\text{s}$.</p>
          `
        }
      ],
      advantagesLimitations: `
        <div class="space-y-1 text-xs">
          <p><strong>Summary:</strong> Interframe spacing allows deterministic prioritisation of control traffic without extra protocol messages.</p>
        </div>
      `,
      whereUsed: "MAC timing synchronization, frame exchange priority enforcement, and 802.11e QoS differentiation.",
      references: "Forouzan Ch. 14, Section 14.3; RFC 8325 (Mapping Diffserv to IEEE 802.11)."
    }
  },

  "u2-rts-cts-mechanism": {
    id: "u2-rts-cts-mechanism",
    title: "RTS and CTS Handshake Mechanism",
    unit: "Unit 2 - Data Link Layer",
    level: "Intermediate",
    standard: "IEEE 802.11 / Forouzan Ch. 14 / Section 5",
    oneLiner: "The 4-way Request-To-Send / Clear-To-Send protocol sequence, frame structure, and collision elimination mechanism.",
    quickAnswer: "The RTS/CTS handshake is a 4-way control exchange (RTS &rarr; SIFS &rarr; CTS &rarr; SIFS &rarr; DATA &rarr; SIFS &rarr; ACK) used in IEEE 802.11 to reserve the wireless channel before transmitting data. It eliminates hidden station collisions by having the receiver broadcast a CTS that sets the Network Allocation Vector (NAV) for all hidden stations within its range.",
    whyItMatters: "RTS/CTS solves the classic hidden terminal problem in wireless LANs, trading small control frame overhead for guaranteed collision-free transmission of large payload frames.",
    sections: {
      overview: `
        <p>In IEEE 802.11 wireless networks, the <strong>RTS/CTS Handshake</strong> is an optional 4-way control frame exchange that establishes a virtual channel reservation before transmitting a large data frame.</p>

        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Definitions of RTS and CTS</h3>
        <ul class="wiki-bullet-list">
          <li><strong>RTS (Request To Send):</strong> A 20-byte control frame transmitted by a sending station to request exclusive medium access. It contains a <em>Duration/ID</em> field specifying the total time needed to complete the entire subsequent transaction (CTS + DATA + ACK + 3 SIFS).</li>
          <li><strong>CTS (Clear To Send):</strong> A 14-byte control frame returned by the destination station in response to a valid RTS. It echoes the remaining duration, confirming that the receiver is ready to receive data.</li>
        </ul>

        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">The Complete 4-Way Handshake Sequence</h3>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-center my-3">
          $$\\text{RTS} \\xrightarrow{\\text{SIFS}} \\text{CTS} \\xrightarrow{\\text{SIFS}} \\text{DATA} \\xrightarrow{\\text{SIFS}} \\text{ACK}$$
        </div>
        <ol class="wiki-ordered-list">
          <li><strong>Step 1 (RTS Transmission):</strong> Station A wins contention, waits for DIFS, and transmits an RTS frame to Station B.</li>
          <li><strong>Step 2 (CTS Response):</strong> Station B receives the RTS, waits for a short SIFS interval, and broadcasts a CTS frame. <strong>Any station in range of Station B (including hidden Station C) hears this CTS!</strong></li>
          <li><strong>Step 3 (Channel Reservation via NAV):</strong> All stations that hear the RTS or CTS read the Duration field and set their <strong>Network Allocation Vector (NAV)</strong> timers, deferring all transmissions.</li>
          <li><strong>Step 4 (DATA Transmission):</strong> Station A waits SIFS after receiving the CTS and transmits its large DATA frame collision-free.</li>
          <li><strong>Step 5 (Positive ACK):</strong> Station B verifies the CRC-32 checksum and transmits an ACK frame after SIFS. The NAV expires and the medium becomes available.</li>
        </ol>
      `,
      howItWorks: `
        <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">The RTS Threshold Optimization</h3>
        <p>Because RTS (20 bytes) and CTS (14 bytes) control frames consume channel time, using RTS/CTS for very small data packets (e.g., 64-byte DNS queries or ACKs) actually degrades network efficiency. Therefore, 802.11 network adapters implement an <strong>RTS Threshold</strong> parameter:</p>
        <ul class="wiki-bullet-list text-xs">
          <li><strong>Frame Size &lt; RTS Threshold:</strong> Transmitted directly using basic CSMA/CA (DIFS + Backoff + DATA + ACK).</li>
          <li><strong>Frame Size &ge; RTS Threshold:</strong> Mandatory 4-way RTS/CTS handshake is executed.</li>
        </ul>
      `,
      technicalDetails: `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800 text-xs">
            <h4 class="font-bold text-emerald-800 dark:text-emerald-300 mb-1">Advantages of RTS/CTS</h4>
            <ul class="space-y-1 text-slate-700 dark:text-slate-300">
              <li>&bull; Completely eliminates destructive hidden station collisions.</li>
              <li>&bull; If an RTS collides, only 20 bytes are lost instead of 1500 bytes.</li>
              <li>&bull; Coordinates multi-station shared access cleanly.</li>
            </ul>
          </div>
          <div class="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800 text-xs">
            <h4 class="font-bold text-rose-800 dark:text-rose-300 mb-1">Disadvantages of RTS/CTS</h4>
            <ul class="space-y-1 text-slate-700 dark:text-slate-300">
              <li>&bull; Adds control-frame transmission and SIFS overhead.</li>
              <li>&bull; Decreases overall throughput for small packets.</li>
              <li>&bull; Does not solve the exposed station problem.</li>
            </ul>
          </div>
        </div>
      `,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Hidden_terminal_problem.svg/800px-Hidden_terminal_problem.svg.png",
      imageCaption: "Figure 14.15: RTS/CTS virtual channel reservation preventing collisions from hidden stations.",
      workedExamples: [
        {
          title: "Worked Example 1: Calculating Total RTS/CTS Exchange Duration",
          difficulty: "Medium",
          problem: "An IEEE 802.11 frame exchange consists of: RTS transmission time = 40 microseconds, CTS = 30 microseconds, DATA = 500 microseconds, ACK = 30 microseconds, and SIFS = 10 microseconds. Calculate the total exchange duration, ignoring DIFS and backoff.",
          solution: `
            <p><strong>Step 1: Formula for Total Exchange Duration:</strong></p>
            <p>$$T_{\\text{exchange}} = T_{\\text{RTS}} + T_{\\text{CTS}} + T_{\\text{DATA}} + T_{\\text{ACK}} + 3(T_{\\text{SIFS}})$$</p>
            <p><strong>Step 2: Substitute Values:</strong></p>
            <p>$$T_{\\text{exchange}} = 40\\,\\mu\\text{s} + 30\\,\\mu\\text{s} + 500\\,\\mu\\text{s} + 30\\,\\mu\\text{s} + 3(10\\,\\mu\\text{s})$$</p>
            <p>$$T_{\\text{exchange}} = 600\\,\\mu\\text{s}$$</p>
            <p><strong>Conclusion:</strong> The total transaction time is 600 microseconds.</p>
          `
        }
      ],
      advantagesLimitations: `
        <div class="space-y-1 text-xs">
          <p><strong>Summary:</strong> RTS/CTS provides insurance against costly collisions for large packets in dense wireless cells.</p>
        </div>
      `,
      whereUsed: "High-density enterprise auditoriums, outdoor long-range Wi-Fi, and environments with heavy hidden node interference.",
      references: "Forouzan Ch. 14, Section 14.3; Tanenbaum Ch. 4, Section 4.4."
    }
  },

  "u2-network-allocation-vector": {
    id: "u2-network-allocation-vector",
    title: "Network Allocation Vector (NAV)",
    unit: "Unit 2 - Data Link Layer",
    level: "Intermediate",
    standard: "IEEE 802.11 / Forouzan Ch. 14 / Section 6",
    oneLiner: "The virtual carrier sensing countdown timer mechanism, mathematical operation, and comparison with physical carrier sensing.",
    quickAnswer: "The Network Allocation Vector (NAV) is an internal countdown timer maintained in software/hardware by every IEEE 802.11 station to implement virtual carrier sensing. When a station overhears a frame (RTS, CTS, or DATA) containing a Duration field, it sets its NAV to that value and treats the channel as virtually busy until the timer reaches zero.",
    whyItMatters: "NAV prevents stations from transmitting when the channel appears physically idle but is actively receiving a transmission from a hidden node, bridging the gap between radio physics and reliable MAC protocols.",
    sections: {
      overview: `
        <p>The <strong>Network Allocation Vector (NAV)</strong> is the virtual carrier-sensing mechanism specified by the IEEE 802.11 standard to resolve medium access contention in environments where physical sensing alone is inadequate.</p>
        
        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Why NAV is Required</h3>
        <p>In wireless networks, physical carrier sensing (measuring RF energy on an antenna) only reveals whether a station's <em>immediate local vicinity</em> is active. Due to the <strong>hidden station problem</strong>, a distant station may be actively transmitting to an Access Point without producing any detectable RF energy at a third station.</p>
        <p>If the third station relied solely on physical carrier sensing, it would conclude the medium is idle, transmit, and destroy the AP's ongoing reception. <strong>NAV prevents this by creating a virtual reservation timer.</strong></p>

        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">How NAV Operates (Step-by-Step)</h3>
        <ol class="wiki-ordered-list">
          <li>Every IEEE 802.11 unicast frame contains a 2-byte <strong>Duration/ID</strong> field specifying the microsecond reservation duration.</li>
          <li>When any station overhears a valid frame (even if the station is neither the source nor the destination), it inspects the Duration field.</li>
          <li>If the extracted duration value is greater than the station's current NAV timer, the station updates its NAV: $NAV_{\\text{new}} = \\text{Duration}$.</li>
          <li>The NAV continuously counts down towards zero at a uniform 1 MHz clock rate (1 tick per microsecond).</li>
          <li><strong>Transmission Rule:</strong> A station is strictly forbidden from initiating transmission as long as $NAV > 0$, even if its antenna detects zero physical RF energy!</li>
          <li>When NAV reaches 0, the station must then verify that the medium remains physically idle for DIFS before initiating backoff.</li>
        </ol>

        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Physical vs. Virtual Carrier Sensing Master Comparison</h3>
        <table class="wiki-table">
          <thead>
            <tr><th>Comparison Parameter</th><th>Physical Carrier Sensing (CCA)</th><th>Virtual Carrier Sensing (NAV)</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Operating Layer</strong></td><td>Physical Layer (PHY).</td><td>Medium Access Control sublayer (MAC).</td></tr>
            <tr><td><strong>Detection Technique</strong></td><td>RF energy detection & preamble correlation.</td><td>Reads numeric <em>Duration</em> field in MAC headers.</td></tr>
            <tr><td><strong>What It Measures</strong></td><td>Whether RF power exceeds threshold (e.g. -82 dBm).</td><td>Whether the channel is contractually reserved by others.</td></tr>
            <tr><td><strong>Hidden Station Defense</strong></td><td>Completely blind to hidden stations.</td><td><strong>Immune to hidden stations</strong> (set via broadcast CTS).</td></tr>
            <tr><td><strong>Implementation</strong></td><td>Hardware radio front-end circuitry.</td><td>Internal hardware/software countdown timer.</td></tr>
          </tbody>
        </table>
      `,
      howItWorks: `
        <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Worked Example: NAV Setting During RTS/CTS</h3>
        <p>Suppose Station A transmits an RTS to Station B with a Duration field of <strong>500 microseconds</strong>. Nearby Station C overhears the RTS:</p>
        <ul class="wiki-bullet-list text-xs">
          <li>Station C programs its timer: $NAV = 500\\,\\mu\\text{s}$.</li>
          <li>Station C immediately enters sleep / deferral mode for 500 microseconds.</li>
          <li>During this 500 $\mu$s window, Station B sends CTS, Station A sends DATA, and Station B returns ACK.</li>
          <li>Station C never transmits during this window, guaranteeing zero collision.</li>
        </ul>
      `,
      technicalDetails: `
        <div class="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg border border-indigo-200 dark:border-indigo-800 text-xs">
          <p class="font-bold text-indigo-900 dark:text-indigo-200">Important Exam Note:</p>
          <p class="text-slate-700 dark:text-slate-300 mt-1">NAV is a virtual timer. It does not physically broadcast radio waves or block RF signals; it simply informs the station's local MAC state machine to defer transmission.</p>
        </div>
      `,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Hidden_terminal_problem.svg/800px-Hidden_terminal_problem.svg.png",
      imageCaption: "Figure 14.16: Network Allocation Vector (NAV) countdown timer deferring station transmission during active exchange.",
      workedExamples: [
        {
          title: "Worked Example 1: Updating an Existing NAV Value",
          difficulty: "Easy",
          problem: "Station C's current NAV timer is 120 microseconds. It overhears a new CTS frame from an adjacent Access Point with a Duration field of 280 microseconds. What is Station C's new NAV value?",
          solution: `
            <p><strong>Step 1: NAV Update Rule:</strong></p>
            <p>A station updates its NAV only if the newly received Duration value exceeds its current remaining NAV timer:</p>
            <p>$$NAV_{\\text{new}} = \\max(NAV_{\\text{current}}, \\text{Duration}_{\\text{new}})$$</p>
            <p><strong>Step 2: Evaluate:</strong></p>
            <p>$$NAV_{\\text{new}} = \\max(120\\,\\mu\\text{s}, 280\\,\\mu\\text{s}) = 280\\,\\mu\\text{s}$$</p>
            <p><strong>Conclusion:</strong> Station C updates its NAV to 280 microseconds.</p>
          `
        }
      ],
      advantagesLimitations: `
        <div class="space-y-1 text-xs">
          <p><strong>Summary:</strong> Dual carrier sensing (Physical CCA + Virtual NAV) ensures robust medium arbitration in asymmetrical RF topologies.</p>
        </div>
      `,
      whereUsed: "All IEEE 802.11 compliant devices, Wi-Fi drivers, and wireless network simulation models.",
      references: "Forouzan, Data Communications and Networking, Chapter 14, Section 14.3; IEEE 802.11 Standards."
    }
  },

  "u2-ieee-802-11-frame-formats": {
    id: "u2-ieee-802-11-frame-formats",
    title: "IEEE 802.11 MAC Frame Formats & Addressing",
    unit: "Unit 2 - Data Link Layer",
    level: "Intermediate",
    standard: "IEEE 802.11 / Forouzan Ch. 14 / Section 9-11",
    oneLiner: "The 9 fields of the 802.11 MAC frame, 16-bit Frame Control breakdown, 3 frame categories, and the 4 address field interpretations.",
    quickAnswer: "The general IEEE 802.11 MAC frame comprises 9 fields: Frame Control (2B), Duration/ID (2B), Address 1 (6B), Address 2 (6B), Address 3 (6B), Sequence Control (2B), Address 4 (6B optional), Frame Body (0-2312B), and FCS (4B CRC-32). Frames are categorized into Management, Control, and Data frames, and utilize up to four 48-bit MAC addresses depending on To DS and From DS bits.",
    whyItMatters: "The 802.11 frame format is the most tested long-answer topic in university Computer Networks examinations, explaining how Wi-Fi handles multi-hop distribution bridging, power saving, and fragmentation.",
    sections: {
      overview: `
        <p>An <strong>IEEE 802.11 MAC frame</strong> is the fundamental unit of data transmission at the Data Link Layer in wireless local area networks. Unlike the simple 14-byte Ethernet header, an 802.11 header can span up to 34 bytes to support wireless bridging, virtual sensing, power management, and frame fragmentation.</p>

        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">The Nine Fields of the General IEEE 802.11 MAC Frame</h3>
        <ol class="wiki-ordered-list">
          <li><strong>Frame Control (2 Bytes / 16 Bits):</strong> Defines protocol version, frame type, subtype, and flags.</li>
          <li><strong>Duration / ID (2 Bytes):</strong> Carries the NAV channel reservation duration (or Association ID in power-save frames).</li>
          <li><strong>Address 1 (6 Bytes):</strong> Identifies the immediate physical receiver address (RA).</li>
          <li><strong>Address 2 (6 Bytes):</strong> Identifies the immediate physical transmitter address (TA).</li>
          <li><strong>Address 3 (6 Bytes):</strong> Identifies filtering or original source/destination address (BSSID, SA, or DA).</li>
          <li><strong>Sequence Control (2 Bytes / 16 Bits):</strong> Divided into a 4-bit <em>Fragment Number</em> and a 12-bit <em>Sequence Number</em> (0 to 4095) for reassembly and duplicate filtering.</li>
          <li><strong>Address 4 (6 Bytes, Optional):</strong> Used strictly in four-address wireless mesh / bridge links when both To DS = 1 and From DS = 1.</li>
          <li><strong>Frame Body (Variable, 0 to 2312 Bytes):</strong> Carries the network-layer payload (IP packet) or management information.</li>
          <li><strong>Frame Check Sequence (FCS - 4 Bytes / 32 Bits):</strong> Contains a standard CRC-32 checksum to detect bit errors.</li>
        </ol>

        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">The 16-Bit Frame Control Field Breakdown</h3>
        <table class="wiki-table">
          <thead>
            <tr><th>Subfield</th><th>Size</th><th>Function and Description</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Protocol Version</strong></td><td>2 bits</td><td>Always set to <code>00</code> for current standard; future-proofs standard changes.</td></tr>
            <tr><td><strong>Type</strong></td><td>2 bits</td><td>Identifies major category: <code>00</code> = Management, <code>01</code> = Control, <code>10</code> = Data.</td></tr>
            <tr><td><strong>Subtype</strong></td><td>4 bits</td><td>Specifies exact frame: Beacon, Probe, RTS, CTS, ACK, Data, QoS Data.</td></tr>
            <tr><td><strong>To DS</strong></td><td>1 bit</td><td>Set to 1 if frame is travelling <em>into</em> the wired Distribution System via an AP.</td></tr>
            <tr><td><strong>From DS</strong></td><td>1 bit</td><td>Set to 1 if frame is emerging <em>out of</em> the Distribution System from an AP.</td></tr>
            <tr><td><strong>More Frag</strong></td><td>1 bit</td><td>Set to 1 if additional fragments of this frame follow.</td></tr>
            <tr><td><strong>Retry</strong></td><td>1 bit</td><td>Set to 1 if this frame is a retransmission of an unacknowledged frame.</td></tr>
            <tr><td><strong>Power Mgmt</strong></td><td>1 bit</td><td>Indicates station power-management state: 0 = Active mode, 1 = Sleep mode.</td></tr>
            <tr><td><strong>More Data</strong></td><td>1 bit</td><td>Informs sleeping stations that AP has additional buffered frames waiting.</td></tr>
            <tr><td><strong>Protected Frame</strong></td><td>1 bit</td><td>Set to 1 if frame body is encrypted using WPA2 (AES-CCMP) or WPA3 (GCMP).</td></tr>
            <tr><td><strong>Order</strong></td><td>1 bit</td><td>Set to 1 if strictly ordered frame delivery is required.</td></tr>
          </tbody>
        </table>

        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Three Major IEEE 802.11 Frame Categories (Section 10)</h3>
        <ul class="wiki-bullet-list">
          <li><strong>Management Frames (Type 00):</strong> Establish and maintain wireless association: Beacon, Probe Request, Probe Response, Authentication, Deauthentication, Association Request, Association Response, Reassociation Request, Disassociation.</li>
          <li><strong>Control Frames (Type 01):</strong> Coordinate medium access and reliability: RTS, CTS, ACK, PS-Poll, Block ACK, Block ACK Request, CF-End. (Important exam point: RTS, CTS, and ACK are control frames, NOT management frames!).</li>
          <li><strong>Data Frames (Type 10):</strong> Transport upper-layer user data: Normal Data, QoS Data, Null Data (used for power-save keep-alives).</li>
        </ul>

        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">The Four Address Fields &amp; To DS / From DS Mapping</h3>
        <table class="wiki-table">
          <thead>
            <tr><th>To DS</th><th>From DS</th><th>Address 1 (RA)</th><th>Address 2 (TA)</th><th>Address 3</th><th>Address 4</th><th>Meaning and Context</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>0</strong></td><td><strong>0</strong></td><td>DA (Destination)</td><td>SA (Source)</td><td>BSSID (AP MAC)</td><td>Not Used</td><td>Direct communication within an Ad Hoc BSS or local cell.</td></tr>
            <tr><td><strong>1</strong></td><td><strong>0</strong></td><td>BSSID (AP MAC)</td><td>SA (Source)</td><td>DA (Destination)</td><td>Not Used</td><td>Station transmitting uplink frame <em>into</em> the Distribution System.</td></tr>
            <tr><td><strong>0</strong></td><td><strong>1</strong></td><td>DA (Destination)</td><td>BSSID (AP MAC)</td><td>SA (Source)</td><td>Not Used</td><td>AP transmitting downlink frame <em>out of</em> the Distribution System to a station.</td></tr>
            <tr><td><strong>1</strong></td><td><strong>1</strong></td><td>RA (Receiver AP)</td><td>TA (Transmitter AP)</td><td>DA (Destination)</td><td>SA (Source)</td><td>Wireless Distribution System (WDS) bridging two APs together across a wireless link.</td></tr>
          </tbody>
        </table>
      `,
      howItWorks: `
        <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Sequence Control Field Subfield Breakdown</h3>
        <p>The 2-byte (16-bit) Sequence Control field provides fragmentation and duplicate detection:</p>
        <div class="grid grid-cols-2 gap-3 text-center font-mono text-xs my-2">
          <div class="p-2 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded">
            <strong>Fragment Number (4 bits):</strong> Values 0 to 15. Tracks fragments of a single frame.
          </div>
          <div class="p-2 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded">
            <strong>Sequence Number (12 bits):</strong> Values 0 to 4095. Incremented for each new MSDU.
          </div>
        </div>
      `,
      technicalDetails: `
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-mono">
          <p class="font-bold text-slate-800 dark:text-slate-200">Exam Memory Aid:</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1">Address 1 is ALWAYS the Receiver Address (RA) that must immediately acknowledge the frame!</p>
        </div>
      `,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/WLAN_overview.svg/800px-WLAN_overview.svg.png",
      imageCaption: "Figure 14.17: Complete structure and field sizes of the IEEE 802.11 MAC Data Frame.",
      workedExamples: [
        {
          title: "Worked Example 1: Address Mapping for a Station Uploading to Internet Server",
          difficulty: "Medium",
          problem: "A laptop with MAC address AA:AA:AA:AA:AA:AA connects to Access Point with BSSID BB:BB:BB:BB:BB:BB to send a packet to default gateway router with MAC address CC:CC:CC:CC:CC:CC across the Distribution System. Identify the values of To DS, From DS, Address 1, Address 2, Address 3, and Address 4.",
          solution: `
            <p><strong>Step 1: Determine Direction:</strong></p>
            <p>The frame is travelling from a wireless client into the Distribution System (uplink). Therefore, $\\text{To DS} = 1$ and $\\text{From DS} = 0$.</p>
            <p><strong>Step 2: Assign Address Fields based on Table:</strong></p>
            <ul class="list-disc pl-4 space-y-1">
              <li><strong>Address 1 (RA / BSSID):</strong> BB:BB:BB:BB:BB:BB (The Access Point's radio).</li>
              <li><strong>Address 2 (TA / SA):</strong> AA:AA:AA:AA:AA:AA (The transmitting Laptop).</li>
              <li><strong>Address 3 (DA):</strong> CC:CC:CC:CC:CC:CC (The destination default gateway router).</li>
              <li><strong>Address 4:</strong> Not used (0 bytes).</li>
            </ul>
          `
        }
      ],
      advantagesLimitations: `
        <div class="space-y-1 text-xs">
          <p><strong>Summary:</strong> Flexible 4-address format enables complex mesh bridging and multi-BSS campus roaming.</p>
        </div>
      `,
      whereUsed: "Packet analysis in Wireshark, IEEE 802.11 wireless drivers, and bridge router forwarding tables.",
      references: "Forouzan, Data Communications and Networking, Chapter 14, Section 14.3; Cisco 802.11 Frame Guide."
    }
  },

  "u2-dcf-vs-pcf": {
    id: "u2-dcf-vs-pcf",
    title: "Comparison of DCF and PCF",
    unit: "Unit 2 - Data Link Layer",
    level: "Intermediate",
    standard: "IEEE 802.11 / Forouzan Ch. 14 / Section 8.6",
    oneLiner: "Master comparative analysis of Distributed Coordination Function (DCF) vs. Point Coordination Function (PCF).",
    quickAnswer: "DCF is a mandatory, decentralized, contention-based protocol using CSMA/CA and DIFS for best-effort asynchronous data across both Ad Hoc and Infrastructure networks. PCF is an optional, centralized, contention-free protocol using AP polling and PIFS for delay-bounded real-time streaming strictly within Infrastructure networks.",
    whyItMatters: "This comprehensive comparison is a staple 5-to-8-mark question in university examinations and competitive tests (GATE/ISRO), testing fundamental understanding of wireless medium access control.",
    sections: {
      overview: `
        <p>The IEEE 802.11 MAC sublayer is built on an architectural duality that supports both competitive decentralized traffic and controlled centralized traffic:</p>
        
        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Master Comparison Table: DCF vs. PCF</h3>
        <table class="wiki-table">
          <thead>
            <tr><th>Comparison Parameter</th><th>Distributed Coordination Function (DCF)</th><th>Point Coordination Function (PCF)</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Status in 802.11 Standard</strong></td><td><strong>Mandatory</strong> for all compliant devices.</td><td><strong>Optional;</strong> rarely implemented in commercial Wi-Fi.</td></tr>
            <tr><td><strong>Coordination Philosophy</strong></td><td>Decentralized; fully distributed peer access.</td><td>Centralized; master-slave polling architecture.</td></tr>
            <tr><td><strong>Central Controller</strong></td><td>No central controller required.</td><td>Access Point acts as the <strong>Point Coordinator (PC)</strong>.</td></tr>
            <tr><td><strong>Channel Access Mechanism</strong></td><td><strong>CSMA/CA</strong> with random backoff and positive ACKs.</td><td><strong>Sequential Polling:</strong> AP polls stations one-by-one.</td></tr>
            <tr><td><strong>Interframe Space (IFS)</strong></td><td><strong>DIFS</strong> ($SIFS + 2 \\times SlotTime$).</td><td><strong>PIFS</strong> ($SIFS + 1 \\times SlotTime$, shorter than DIFS).</td></tr>
            <tr><td><strong>Channel Access Priority</strong></td><td>Lower priority (longer waiting time).</td><td>Higher priority (shorter waiting time preempts DCF).</td></tr>
            <tr><td><strong>Collision Possibility</strong></td><td>Collisions can occur during simultaneous backoff expiry.</td><td><strong>Zero collisions</strong> during the Contention-Free Period.</td></tr>
            <tr><td><strong>Network Topology Supported</strong></td><td>Both <strong>Ad Hoc (IBSS)</strong> and <strong>Infrastructure</strong>.</td><td>Strictly <strong>Infrastructure mode</strong> with an AP.</td></tr>
            <tr><td><strong>Operating Period</strong></td><td>Operates during the <strong>Contention Period (CP)</strong>.</td><td>Operates during the <strong>Contention-Free Period (CFP)</strong>.</td></tr>
            <tr><td><strong>Target Traffic Class</strong></td><td>Asynchronous best-effort data (web, FTP, email).</td><td>Time-bounded, delay-sensitive streaming (VoIP, video).</td></tr>
            <tr><td><strong>Implementation Complexity</strong></td><td>Moderate; standardized state machine.</td><td>High; requires polling queues and AP scheduling.</td></tr>
            <tr><td><strong>Modern Evolution</strong></td><td>Enhanced in 802.11e as <strong>EDCA</strong> (4 QoS queues).</td><td>Replaced in 802.11e/ax by <strong>HCCA</strong> and <strong>OFDMA</strong>.</td></tr>
          </tbody>
        </table>
      `,
      howItWorks: `
        <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Summary of Key Differences for Quick Exam Revision</h3>
        <ol class="wiki-ordered-list text-xs space-y-1">
          <li><strong>Access Type:</strong> DCF is contention-based; PCF is contention-free.</li>
          <li><strong>Control:</strong> DCF is distributed; PCF is centralized.</li>
          <li><strong>IFS Used:</strong> DCF uses DIFS; PCF uses PIFS.</li>
          <li><strong>Priority:</strong> PCF has higher priority because PIFS is shorter than DIFS.</li>
          <li><strong>Collisions:</strong> DCF attempts to avoid collisions; PCF completely eliminates collisions during CFP.</li>
          <li><strong>Ad Hoc Support:</strong> DCF works in Ad Hoc; PCF does not.</li>
        </ol>
      `,
      technicalDetails: `
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
          <p class="font-bold text-slate-800 dark:text-slate-200">Exam Memory Mnemonic:</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>D</strong>CF = <strong>D</strong>istributed &amp; <strong>D</strong>IFS. <strong>P</strong>CF = <strong>P</strong>olling &amp; <strong>P</strong>IFS.</p>
        </div>
      `,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/802.11_DCF_PCF.svg/800px-802.11_DCF_PCF.svg.png",
      imageCaption: "Figure 14.18: Master comparison between contention-based DCF and centralized contention-free PCF.",
      workedExamples: [
        {
          title: "Worked Example 1: Bounded Delay Calculation in PCF vs DCF",
          difficulty: "Easy",
          problem: "An Access Point running PCF has 10 registered VoIP stations. Each polling transaction takes 200 microseconds. What is the maximum guaranteed delay before a station is polled again if CFP lasts 2 milliseconds?",
          solution: `
            <p><strong>Step 1: Calculate Total Polling Round Time:</strong></p>
            <p>$$T_{\\text{round}} = 10 \\times 200\\,\\mu\\text{s} = 2000\\,\\mu\\text{s} = 2.0\\text{ ms}$$</p>
            <p><strong>Conclusion:</strong> Every station is guaranteed to be polled once every 2.0 milliseconds. In DCF, random backoff and collisions make delay non-deterministic and potentially unbounded under heavy load.</p>
          `
        }
      ],
      advantagesLimitations: `
        <div class="space-y-1 text-xs">
          <p><strong>Summary:</strong> DCF provides robust fairness; PCF guarantees bounded latency for time-sensitive traffic.</p>
        </div>
      `,
      whereUsed: "Curriculum synthesis, university exams, GATE preparation, and Wi-Fi architecture evaluation.",
      references: "Forouzan, Data Communications and Networking (4th/5th Ed.), Chapter 14, Section 14.3."
    }
  }
};

// 1. Assign all 10 Topic 8 subtopics into syllabus
for (const [key, val] of Object.entries(t8Data)) {
  syllabus[key] = val;
  console.log(`Updated subtopic ${key} in syllabus.`);
}

// 2. Add Topic 8 Numericals (Numericals 23 to 27) into u2-numerical-problems
const newNumericals = `
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Numerical 23: Calculate PIFS in IEEE 802.11 (PDF Section 15 / Num 1)</p>
          <p class="text-xs text-slate-600 dark:text-slate-300 mt-1"><strong>Problem:</strong> Calculate PIFS if SIFS is 10 &mu;s and Slot Time is 20 &mu;s.</p>
          <div class="text-xs text-slate-700 dark:text-slate-300 mt-2 font-mono bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
            <p>Formula: PIFS = SIFS + SlotTime</p>
            <p>PIFS = 10 &mu;s + 20 &mu;s = 30 &mu;s</p>
            <p class="font-bold text-emerald-600">Answer: PIFS = 30 &mu;s</p>
          </div>
        </div>

        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Numerical 24: Calculate DIFS in IEEE 802.11 (PDF Section 15 / Num 2)</p>
          <p class="text-xs text-slate-600 dark:text-slate-300 mt-1"><strong>Problem:</strong> Calculate DIFS if SIFS is 10 &mu;s and Slot Time is 20 &mu;s.</p>
          <div class="text-xs text-slate-700 dark:text-slate-300 mt-2 font-mono bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
            <p>Formula: DIFS = SIFS + 2(SlotTime)</p>
            <p>DIFS = 10 &mu;s + 2(20 &mu;s) = 10 + 40 = 50 &mu;s</p>
            <p class="font-bold text-emerald-600">Answer: DIFS = 50 &mu;s</p>
          </div>
        </div>

        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Numerical 25: Calculate Total RTS/CTS Exchange Time (PDF Section 15 / Num 3)</p>
          <p class="text-xs text-slate-600 dark:text-slate-300 mt-1"><strong>Problem:</strong> An IEEE 802.11 transmission consists of: RTS = 40 &mu;s, CTS = 30 &mu;s, DATA = 500 &mu;s, ACK = 30 &mu;s, and SIFS = 10 &mu;s. Calculate the total exchange time, ignoring DIFS and backoff.</p>
          <div class="text-xs text-slate-700 dark:text-slate-300 mt-2 font-mono bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
            <p>Formula: T = RTS + CTS + DATA + ACK + 3(SIFS)</p>
            <p>T = 40 + 30 + 500 + 30 + 3(10) = 600 &mu;s</p>
            <p class="font-bold text-emerald-600">Answer: T = 600 &mu;s</p>
          </div>
        </div>

        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Numerical 26: Frame Control Field Bit Count (PDF Section 15 / Num 4)</p>
          <p class="text-xs text-slate-600 dark:text-slate-300 mt-1"><strong>Problem:</strong> An IEEE 802.11 Frame Control field is 2 bytes. Calculate its size in bits.</p>
          <div class="text-xs text-slate-700 dark:text-slate-300 mt-2 font-mono bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
            <p>Calculation: 2 bytes &times; 8 bits/byte = 16 bits</p>
            <p class="font-bold text-emerald-600">Answer: 16 bits</p>
          </div>
        </div>

        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Numerical 27: Frame Check Sequence (FCS) Bit Count (PDF Section 15 / Num 5)</p>
          <p class="text-xs text-slate-600 dark:text-slate-300 mt-1"><strong>Problem:</strong> The IEEE 802.11 FCS field contains 4 bytes. Calculate its size in bits.</p>
          <div class="text-xs text-slate-700 dark:text-slate-300 mt-2 font-mono bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
            <p>Calculation: 4 bytes &times; 8 bits/byte = 32 bits</p>
            <p class="font-bold text-emerald-600">Answer: 32 bits (CRC-32)</p>
          </div>
        </div>
`;

if (syllabus['u2-numerical-problems']) {
  if (!syllabus['u2-numerical-problems'].sections.overview.includes('Numerical 23: Calculate PIFS')) {
    syllabus['u2-numerical-problems'].sections.overview += '\n' + newNumericals;
    console.log('Appended Numericals 23-27 to u2-numerical-problems.');
  }
}

// 3. Add Q78 to Q92 (15 Short Questions from Section 16.1) into u2-short-answer-questions
const newShortQuestions = `
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q78. Define the IEEE 802.11 MAC Sublayer.</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> The IEEE 802.11 MAC Sublayer is the lower sublayer of the Data Link Layer that manages access to the wireless communication channel, framing, addressing, and reliable frame delivery.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q79. Expand DCF and state its function.</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> Distributed Coordination Function. It is a distributed, contention-based channel access mechanism that uses CSMA/CA to coordinate transmissions without a central master.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q80. Expand PCF and state its function.</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> Point Coordination Function. It is an optional centralized access mechanism where an Access Point acts as the Point Coordinator to poll stations during a Contention-Free Period.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q81. What is CSMA/CA?</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> Carrier Sense Multiple Access with Collision Avoidance is a channel access protocol used in wireless LANs that proactively minimizes collision probability through channel sensing, waiting intervals, and random backoff.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q82. Define RTS.</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> Request To Send. A 20-byte control frame sent by a wireless station to request exclusive permission to transmit data and reserve the channel.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q83. Define CTS.</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> Clear To Send. A 14-byte control frame returned by the receiving station in response to an RTS, granting permission to proceed and notifying hidden stations.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q84. What is the Network Allocation Vector (NAV)?</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> NAV is a virtual carrier-sensing timer maintained inside a station's MAC sublayer that indicates how long the wireless channel is reserved by other active stations.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q85. Define SIFS.</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> Short Interframe Space. The shortest waiting interval in 802.11, used for immediate responses like ACK and CTS to maintain atomic, uninterruptible transactions.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q86. What is DIFS?</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> DCF Interframe Space. The standard waiting period used by stations operating under normal DCF access before initiating or resuming contention backoff.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q87. What is PIFS?</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> PCF Interframe Space. An intermediate waiting interval used strictly by the AP Point Coordinator to gain priority access over normal DCF stations.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q88. What is EIFS?</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> Extended Interframe Space. A longer waiting interval enforced when a station receives an unreadable or CRC-corrupted frame to allow other stations to complete acknowledgements.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q89. What is a Frame Control field?</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> A 2-byte (16-bit) header field that identifies the protocol version, frame type, subtype, distribution flags (To DS / From DS), and control flags.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q90. What is the purpose of an ACK frame?</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> In wireless networking, senders cannot detect collisions during transmission. An explicit Layer 2 ACK frame confirms successful, error-free reception.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q91. List the three categories of IEEE 802.11 frames.</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> 1) Management Frames (Beacon, Probe, Association); 2) Control Frames (RTS, CTS, ACK); 3) Data Frames (Data, QoS Data).</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q92. What is the purpose of the Sequence Control field?</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> A 2-byte field containing a 4-bit Fragment Number and a 12-bit Sequence Number, used for reassembling frame fragments and filtering duplicate transmissions.</p>
        </div>
`;

if (syllabus['u2-short-answer-questions']) {
  if (!syllabus['u2-short-answer-questions'].sections.overview.includes('Q78. Define the IEEE 802.11 MAC Sublayer')) {
    syllabus['u2-short-answer-questions'].sections.overview += '\n' + newShortQuestions;
    console.log('Appended Q78-Q92 to u2-short-answer-questions.');
  }
}

// 4. Add Q24 to Q31 (8 Long Questions from Section 16.3) into u2-long-answer-questions
const newLongQuestions = `
      <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50/50 dark:bg-gray-800/50 mb-4">
        <h4 class="font-bold text-sm text-gray-900 dark:text-white">Q24. Explain the IEEE 802.11 MAC Architecture in Detail (DCF and PCF). [10 Marks]</h4>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
          The IEEE 802.11 MAC sublayer is structured into two functional layers: 1) Distributed Coordination Function (DCF), the mandatory foundation using CSMA/CA, DIFS intervals, and backoff for asynchronous best-effort traffic; and 2) Point Coordination Function (PCF), an optional centralized polling protocol sitting on top of DCF where the AP acts as Point Coordinator using PIFS intervals. Time is divided into Superframes with Contention-Free Periods (CFP) under PCF and Contention Periods (CP) under DCF.
        </p>
      </div>

      <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50/50 dark:bg-gray-800/50 mb-4">
        <h4 class="font-bold text-sm text-gray-900 dark:text-white">Q25. Explain CSMA/CA and its Complete Working with a Flowchart. [10 Marks]</h4>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
          CSMA/CA avoids collisions through 6 cooperating mechanisms: 1) Physical carrier sensing (CCA energy detection); 2) Virtual carrier sensing (NAV countdown); 3) DIFS idle wait; 4) Pseudo-random backoff selection $[0, CW]$; 5) Idle countdown with timer freezing during busy bursts; 6) Transmission and immediate SIFS ACK confirmation. If no ACK arrives before timeout, $CW$ doubles exponentially ($CW = 2(CW+1)-1$) and retransmission begins.
        </p>
      </div>

      <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50/50 dark:bg-gray-800/50 mb-4">
        <h4 class="font-bold text-sm text-gray-900 dark:text-white">Q26. Explain the RTS/CTS Handshake and the Role of NAV in Hidden Station Resolution. [10 Marks]</h4>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
          The 4-way RTS/CTS handshake ($RTS \\to CTS \\to DATA \\to ACK$) solves hidden terminal collisions. Sender transmits RTS with duration field. Receiver broadcasts CTS. Hidden stations out of sender range hear the CTS and update their internal Network Allocation Vector (NAV) timers. All stations remain silent while NAV > 0, permitting collision-free transmission of large payload frames.
        </p>
      </div>

      <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50/50 dark:bg-gray-800/50 mb-4">
        <h4 class="font-bold text-sm text-gray-900 dark:text-white">Q27. Explain all Four Types of Interframe Spaces with their Priority Relationship. [10 Marks]</h4>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
          Interframe Spaces enforce priority: SIFS (shortest, highest priority for ACK/CTS) < PIFS (Point Coordinator polling priority, $PIFS = SIFS + SlotTime$) < DIFS (standard DCF contention, $DIFS = SIFS + 2(SlotTime)$) < EIFS (extended wait for corrupted frame recovery). Shorter intervals grant preemptive transmission opportunities.
        </p>
      </div>

      <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50/50 dark:bg-gray-800/50 mb-4">
        <h4 class="font-bold text-sm text-gray-900 dark:text-white">Q28. Draw and Explain the IEEE 802.11 MAC Frame Format in Detail. [13 Marks]</h4>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
          General frame format has 9 fields: Frame Control (2B), Duration/ID (2B), Address 1 (6B, RA), Address 2 (6B, TA), Address 3 (6B, filtering), Sequence Control (2B, 4b Frag + 12b Seq Num), Address 4 (6B optional for WDS), Frame Body (0-2312B), and FCS (4B CRC-32). Draw the complete byte layout and detail all fields.
        </p>
      </div>

      <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50/50 dark:bg-gray-800/50 mb-4">
        <h4 class="font-bold text-sm text-gray-900 dark:text-white">Q29. Explain the Three Categories of IEEE 802.11 Frames with Examples. [8 Marks]</h4>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
          1) Management Frames (Type 00): Manage network association (Beacon, Probe Request/Response, Authentication, Association Request/Response, Disassociation); 2) Control Frames (Type 01): Arbitrate medium access (RTS, CTS, ACK, PS-Poll, Block ACK, CF-End); 3) Data Frames (Type 10): Transport payload data (Data, QoS Data, Null Data).
        </p>
      </div>

      <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50/50 dark:bg-gray-800/50 mb-4">
        <h4 class="font-bold text-sm text-gray-900 dark:text-white">Q30. Explain the Four Address Fields and their Interpretation Based on To DS and From DS. [10 Marks]</h4>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
          Address meanings depend on To DS / From DS bits: 0 0 = Within BSS (Addr1=DA, Addr2=SA, Addr3=BSSID); 1 0 = Station to AP / To DS (Addr1=BSSID, Addr2=SA, Addr3=DA); 0 1 = AP to Station / From DS (Addr1=DA, Addr2=BSSID, Addr3=SA); 1 1 = Wireless Bridge WDS (Addr1=RA, Addr2=TA, Addr3=DA, Addr4=SA).
        </p>
      </div>

      <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50/50 dark:bg-gray-800/50 mb-4">
        <h4 class="font-bold text-sm text-gray-900 dark:text-white">Q31. Explain the Functions of all Subfields in the IEEE 802.11 Frame Control Field. [10 Marks]</h4>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
          16-bit Frame Control field comprises: Protocol Version (2b), Type (2b), Subtype (4b), To DS (1b), From DS (1b), More Fragments (1b), Retry (1b), Power Management (1b), More Data (1b), Protected Frame (1b), and Order (1b). Detail each subfield's role in wireless protocol management.
        </p>
      </div>
`;

if (syllabus['u2-long-answer-questions']) {
  if (!syllabus['u2-long-answer-questions'].sections.overview.includes('Q24. Explain the IEEE 802.11 MAC Architecture in Detail')) {
    syllabus['u2-long-answer-questions'].sections.overview += '\n' + newLongQuestions;
    console.log('Appended Q24-Q31 to u2-long-answer-questions.');
  }
}

// 5. Add 15 MCQs from PDF Section 17 into u2-mcqs
const topic8Mcqs = [
  {
    question: "Which IEEE standard defines Wireless LAN MAC?",
    options: ["IEEE 802.3", "IEEE 802.11", "IEEE 802.5", "IEEE 802.1"],
    correct: 1,
    explanation: "IEEE 802.11 is the international standard governing Wireless LAN MAC and PHY layers."
  },
  {
    question: "Which is the fundamental, mandatory access mechanism in IEEE 802.11?",
    options: ["Point Coordination Function (PCF)", "Distributed Coordination Function (DCF)", "CSMA/CD", "Token passing"],
    correct: 1,
    explanation: "DCF is the mandatory fundamental medium access mechanism in all 802.11 devices, while PCF is optional."
  },
  {
    question: "What does CSMA/CA stand for?",
    options: [
      "Carrier Sense Multiple Access with Collision Avoidance",
      "Carrier Signal Multiple Access with Collision Access",
      "Collision Sense Multiple Access with Collision Avoidance",
      "Carrier Sense Management Access"
    ],
    correct: 0,
    explanation: "CSMA/CA stands for Carrier Sense Multiple Access with Collision Avoidance."
  },
  {
    question: "Which frame requests permission to transmit data in an IEEE 802.11 handshake?",
    options: ["CTS", "ACK", "RTS", "Beacon"],
    correct: 2,
    explanation: "RTS (Request To Send) is the 20-byte control frame that requests medium access permission."
  },
  {
    question: "Which frame responds to an RTS frame?",
    options: ["ACK", "CTS", "DATA", "Beacon"],
    correct: 1,
    explanation: "The receiving station replies to a valid RTS with a CTS (Clear To Send) frame after SIFS."
  },
  {
    question: "What does NAV represent in IEEE 802.11?",
    options: [
      "Network address value",
      "Network Allocation Vector",
      "Network access variable",
      "Node allocation value"
    ],
    correct: 1,
    explanation: "NAV stands for Network Allocation Vector, a virtual carrier-sensing countdown timer."
  },
  {
    question: "Which interframe space is the shortest commonly discussed in legacy 802.11?",
    options: ["DIFS", "PIFS", "EIFS", "SIFS"],
    correct: 3,
    explanation: "SIFS (Short Interframe Space) is the shortest interval, giving highest priority to ACK and CTS frames."
  },
  {
    question: "Which IFS is associated with Point Coordinator (PCF) access?",
    options: ["SIFS", "PIFS", "DIFS", "EIFS"],
    correct: 1,
    explanation: "PIFS (Point Coordination IFS) is used by the Point Coordinator to gain priority over DCF."
  },
  {
    question: "Which IFS is used by stations for normal DCF contention access?",
    options: ["SIFS", "PIFS", "DIFS", "EIFS"],
    correct: 2,
    explanation: "DIFS (DCF Interframe Space) is the standard waiting period before normal contention backoff."
  },
  {
    question: "How many bits are in the IEEE 802.11 Frame Control field?",
    options: ["8 bits", "16 bits", "24 bits", "32 bits"],
    correct: 1,
    explanation: "The Frame Control field contains 2 bytes, which equals exactly 16 bits."
  },
  {
    question: "How many major IEEE 802.11 MAC frame categories are there?",
    options: ["2", "3", "4", "5"],
    correct: 1,
    explanation: "There are 3 major frame categories: Management frames, Control frames, and Data frames."
  },
  {
    question: "Which frame announces the presence and characteristics of a wireless network?",
    options: ["RTS", "ACK", "Beacon", "CTS"],
    correct: 2,
    explanation: "Beacon frames are periodic management frames broadcast by Access Points to announce SSID and capabilities."
  },
  {
    question: "Which field helps detect frame transmission errors at the MAC layer?",
    options: ["Duration", "Sequence Control", "FCS", "Address 1"],
    correct: 2,
    explanation: "The Frame Check Sequence (FCS) contains a 4-byte CRC-32 checksum to detect bit corruption."
  },
  {
    question: "What is the size of the Sequence Control field?",
    options: ["1 byte", "2 bytes", "4 bytes", "6 bytes"],
    correct: 1,
    explanation: "The Sequence Control field is 2 bytes (16 bits), comprising a 4-bit Fragment Number and 12-bit Sequence Number."
  },
  {
    question: "How many address fields can an IEEE 802.11 frame contain?",
    options: ["1", "2", "3", "Up to 4"],
    correct: 3,
    explanation: "An IEEE 802.11 frame can contain up to 4 address fields (Address 1, 2, 3, and optional Address 4 for mesh bridges)."
  }
];

if (syllabus['u2-mcqs'] && syllabus['u2-mcqs'].sections && syllabus['u2-mcqs'].sections.quiz) {
  const existingQuestions = new Set(syllabus['u2-mcqs'].sections.quiz.map(q => q.question));
  topic8Mcqs.forEach(q => {
    if (!existingQuestions.has(q.question)) {
      syllabus['u2-mcqs'].sections.quiz.push(q);
    }
  });
  console.log(`Updated MCQs quiz length to: ${syllabus['u2-mcqs'].sections.quiz.length}`);
}

const outContent = `// topics_u2_syllabus.js - Master Academic Topic Content Repository for Unit 2
// Cleaned: All ASCII symbol art removed. Integrated complete Topic 2, Topic 3, Topic 4, Topic 5, Topic 6, Topic 7, & Topic 8 content.
var TOPICS_U2_SYLLABUS = ${JSON.stringify(syllabus, null, 2)};

if (typeof window !== 'undefined') window.TOPICS_U2_SYLLABUS = TOPICS_U2_SYLLABUS;
if (typeof global !== 'undefined') global.TOPICS_U2_SYLLABUS = TOPICS_U2_SYLLABUS;
if (typeof module !== 'undefined' && module.exports) module.exports = TOPICS_U2_SYLLABUS;
`;

fs.writeFileSync('js/topics_u2_syllabus.js', outContent, 'utf8');
console.log('Successfully written complete updated topics_u2_syllabus.js with Topic 8!');

