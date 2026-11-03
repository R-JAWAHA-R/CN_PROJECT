/**
 * Unit 4 Topic 5 Builder: Congestion Control
 * Subtopics:
 * 1. u4-intro-congestion-control
 * 2. u4-congestion-control-mechanisms
 * 3. u4-tcp-congestion-control (alias: tcp-congestion-control)
 * 4. u4-congestion-network-performance
 */

const TOPIC5_ITEMS = {
  "u4-intro-congestion-control": {
    id: "u4-intro-congestion-control",
    title: "Introduction to Congestion Control",
    unit: "Unit 4 – Transport Layer",
    unitId: "unit4",
    level: "Level 1 — Fundamental",
    category: "transport",
    difficulty: "Core",
    readingTime: "20 min read",
    standard: "Forouzan 4th Ed. Ch 24.2-24.3, pp. 763-768 / Tanenbaum Ch 5.3 / Kurose & Ross Ch 3.6",
    oneLiner: "Foundational principles of network congestion, traffic descriptors, and distinguishing flow control from congestion control.",
    quickAnswer: "Congestion in a network occurs when the aggregate volume of data packets injected by hosts exceeds the physical handling capacity of intermediate network links and router queue buffers. Congestion control refers to the set of techniques and algorithms designed to monitor, prevent, or resolve congestion, preventing the network from descending into catastrophic Congestion Collapse.",
    whyItMatters: "In October 1986, the early Internet suffered its first catastrophic congestion collapse: throughput between UC Berkeley and Lawrence Berkeley Laboratory (separated by just 400 meters) collapsed from 32 Kbps to 40 bps—an 800-fold drop! Van Jacobson analyzed this crisis and created the congestion control algorithms that allow the global Internet to safely share bandwidth among billions of devices today.",
    infobox: {
      prerequisites: ["u4-transport-services", "u4-flow-control-buffering"],
      relatedConcepts: ["u4-congestion-control-mechanisms", "u4-tcp-congestion-control", "u4-congestion-network-performance"],
      compareWith: ["flow-control-vs-congestion-control"],
      primaryUses: [
        "Preventing catastrophic Internet congestion collapse",
        "Ensuring fair bandwidth distribution among competing streams",
        "Traffic engineering in ISP backbone core networks",
        "Active queue management in modern Wi-Fi routers"
      ],
      standardRfc: "RFC 2914 (Congestion Control Principles), Forouzan Chapter 24"
    },
    learningObjectives: [
      "Define network congestion and identify its primary physical root causes",
      "Clearly contrast Flow Control (end-to-end receiver) with Congestion Control (global network)",
      "Explain Traffic Descriptors: Average Rate, Peak Rate, and Burst Size",
      "Trace the positive feedback loop that leads to Congestion Collapse",
      "Recognize the symptoms of congestion: escalating queue delays and high packet drop rates"
    ],
    prerequisitesList: [
      { concept: "Packet Switching", meaning: "Understanding that routers queue packets in finite memory buffers" },
      { concept: "TCP Flow Control", meaning: "Understanding receiver buffer limits" }
    ],
    imageUrl: "assets/images/unit4/topic5-congestion-control/congestion-performance-curves.svg",
    imageCaption: "Figure 4.18: Network Congestion Dynamics — Throughput and Delay Degradation Across Operating Regions [Forouzan Figure 24.5 & 24.6]",
    sections: {
      overview: `
        <p class="mb-3">
          A computer network can be viewed as an interconnected system of roads and highways. When only a few cars travel on an open four-lane highway, all cars drive at maximum speed without interference.
        </p>
        <p class="mb-3">
          However, as more cars enter the highway during rush hour, traffic slows down. If traffic exceeds highway capacity, cars come to a complete standstill in a traffic jam. In computer networks, this phenomenon is called <strong>Congestion</strong>.
        </p>
        <div class="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-lg text-xs font-mono mb-3">
          Definition of Congestion:<br/>
          Congestion occurs whenever: <strong>Aggregate Traffic Demand &gt; Available Network Capacity</strong>.<br/>
          Symptoms: Router queue buffers overflow, packet delay surges toward infinity, and dropped packets trigger retransmissions that worsen the crisis!
        </div>
      `,
      howItWorks: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">1. Root Causes of Network Congestion</h3>
        <p class="mb-3">
          Congestion is rarely caused by a single slow device; it arises from systemic mismatches:
        </p>
        <ul class="list-disc pl-5 space-y-1.5 text-xs mb-4">
          <li><strong>Bandwidth Bottlenecks:</strong> When multiple high-speed incoming links (e.g., three 10 Gbps lines) funnel into a single lower-speed outgoing link (e.g., one 1 Gbps line), the router's queue buffer fills rapidly.</li>
          <li><strong>Bursty Traffic Patterns:</strong> Internet traffic is naturally bursty (e.g. thousands of students opening a video stream at the exact start of a class hour). Peak traffic can be 100 times higher than average traffic.</li>
          <li><strong>Slow Processing Engines:</strong> If a router's CPU or forwarding engine is too slow to process routing lookups and update packet headers, buffers fill even if physical wire bandwidth is plentiful.</li>
        </ul>

        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">2. Flow Control vs. Congestion Control</h3>
        <p class="mb-3">
          Students frequently confuse flow control with congestion control. They address completely different problems:
        </p>
        <table class="wiki-table w-full text-xs mb-4">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-800">
              <th>Criterion</th>
              <th>Flow Control</th>
              <th>Congestion Control</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="font-bold">What is being protected?</td>
              <td>The <strong>Receiving Host's</strong> memory buffer</td>
              <td>The <strong>Subnet's</strong> intermediate routers and links</td>
            </tr>
            <tr>
              <td class="font-bold">Scope</td>
              <td>End-to-End (Point-to-point between 2 nodes)</td>
              <td>Global / Network-Wide (All competing traffic)</td>
            </tr>
            <tr>
              <td class="font-bold">Feedback Source</td>
              <td>Advertised directly by receiver (<code>rwnd</code> in header)</td>
              <td>Inferred by sender (loss/RTT) or signaled by routers (ECN)</td>
            </tr>
            <tr>
              <td class="font-bold">Cause of Problem</td>
              <td>Fast sender sending to a slow receiving process</td>
              <td>Multiple senders injecting more traffic than routers can forward</td>
            </tr>
          </tbody>
        </table>
      `,
      technicalDetails: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">3. The Positive Feedback Loop of Congestion Collapse</h3>
        <p class="mb-3">
          What makes congestion so dangerous is that unmanaged networks exhibit a self-reinforcing death spiral:
        </p>
        <div class="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs space-y-1.5 mb-3 font-mono">
          <div>1. Heavy load causes router queue buffers to fill.</div>
          <div>2. Router queues introduce huge queuing delays.</div>
          <div>3. Sender retransmission timers (RTO) expire prematurely because ACKs are delayed in queues.</div>
          <div>4. Senders retransmit duplicate copies of the same packets!</div>
          <div>5. Routers now waste valuable link capacity forwarding duplicate copies of packets that already arrived or will soon be dropped.</div>
          <div>6. Useful throughput collapses to near zero!</div>
        </div>
      `,
      workedExamples: {
        level1: `
          <strong>Traffic Descriptors Calculation (Forouzan Section 24.1):</strong><br/>
          A data source transmits traffic with the following profile:<br/>
          • Peak Data Rate ($R_p$): 100 Mbps<br/>
          • Average Data Rate ($R_a$): 10 Mbps<br/>
          • Maximum Burst Time ($T_B$): 2 seconds<br/>
          <strong>Calculation of Maximum Burst Size:</strong><br/>
          $$\\text{Burst Size} = R_p \\times T_B = 100\\text{ Mbps} \\times 2\\text{ s} = 200\\text{ Megabits} = 25\\text{ Megabytes}$$.<br/>
          Intermediate routers must have at least 25 MB of buffer memory or apply traffic shaping (Leaky Bucket / Token Bucket) to prevent dropping packets during this burst!
        `
      },
      advantagesLimitations: `
        <div class="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
          <strong class="text-slate-900 dark:text-white font-bold">Key Architectural Takeaway:</strong>
          <p class="mt-1 text-slate-600 dark:text-slate-300">Congestion control is what keeps the decentralized Internet operational. Without autonomous, cooperative rate-throttling by end systems, high-speed applications would instantly paralyze the shared global infrastructure.</p>
        </div>
      `,
      whereUsed: [
        "Internet core router capacity planning",
        "Active queue management in home Wi-Fi access points",
        "Cloud data center spine-and-leaf network fabrics",
        "Mobile cell-tower bandwidth scheduling"
      ],
      commonMistakes: `
        <ul class="space-y-2 text-xs">
          <li><strong>Confusing flow control with congestion control:</strong> Flow control is strictly unicast between sender and receiver (rwnd); congestion control is global network health (cwnd).</li>
          <li><strong>Assuming increasing router buffer size solves congestion:</strong> Excessively large buffers do not solve congestion; they create <strong>Bufferbloat</strong>, causing seconds of queue delay without dropping packets!</li>
        </ul>
      `,
      quiz: [
        {
          question: "What is the primary difference between Flow Control and Congestion Control?",
          options: [
            "Flow control protects the receiver buffer; Congestion control protects network routers and links",
            "Flow control uses UDP; Congestion control uses TCP",
            "Flow control is hardware-based; Congestion control is software-based",
            "Flow control operates at the Physical layer"
          ],
          answer: 0,
          explanation: "Flow control prevents a fast sender from overrunning a slow receiver; congestion control prevents all aggregate traffic from overwhelming the network subnet."
        },
        {
          question: "What phenomenon occurs when heavy network load causes excessive delays and retransmissions, driving useful throughput to near zero?",
          options: [
            "Count-to-Infinity",
            "Congestion Collapse",
            "Silly Window Syndrome",
            "Head-of-Line Blocking"
          ],
          answer: 1,
          explanation: "Congestion Collapse occurs when network queues fill, triggering retransmissions that waste link capacity and collapse useful throughput."
        }
      ],
      references: [
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, Chapter 24.2: Congestion, pp. 763-768", url: "" },
        { cite: "RFC 2914: Congestion Control Principles (Sally Floyd)", url: "https://datatracker.ietf.org/doc/html/rfc2914" }
      ]
    }
  },

  "u4-congestion-control-mechanisms": {
    id: "u4-congestion-control-mechanisms",
    title: "Congestion Control Mechanisms",
    unit: "Unit 4 – Transport Layer",
    unitId: "unit4",
    level: "Level 2 — Core Architecture",
    category: "transport",
    difficulty: "Core",
    readingTime: "25 min read",
    standard: "Forouzan 4th Ed. Ch 24.3, pp. 768-772 / Tanenbaum Ch 5.3 / RFC 3168",
    oneLiner: "Classification of congestion control techniques into Open-Loop prevention policies and Closed-Loop dynamic feedback mechanisms.",
    quickAnswer: "Congestion control mechanisms are broadly divided into two major philosophies: 1) Open-Loop (Prevention Ahead of Time), which designs protocol policies (retransmission, window, discarding, admission) to prevent congestion from occurring in the first place; and 2) Closed-Loop (Dynamic Removal & Feedback), which monitors network state after congestion occurs and feeds signals back to sources using Backpressure, Choke Packets, Implicit Signaling, or Explicit Signaling (FECN, BECN, ECN).",
    whyItMatters: "Different network architectures require different congestion management strategies. Virtual circuit networks (like ATM and Frame Relay) use admission control and explicit bit flags, while datagram networks (like the IP Internet) rely primarily on closed-loop implicit packet-loss signaling combined with Explicit Congestion Notification (ECN). Understanding this taxonomy is essential for network design.",
    infobox: {
      prerequisites: ["u4-intro-congestion-control"],
      relatedConcepts: ["u4-tcp-congestion-control", "u4-congestion-network-performance"],
      compareWith: ["open-loop-vs-closed-loop-congestion-control"],
      primaryUses: [
        "Designing resilient network communication protocols",
        "Implementing Active Queue Management in routers",
        "Explicit Congestion Notification (ECN) configuration",
        "Traffic policing and shaping in telecommunications"
      ],
      standardRfc: "RFC 3168 (The Addition of Explicit Congestion Notification to IP), Forouzan Chapter 24.3"
    },
    learningObjectives: [
      "Categorize congestion control techniques into Open-Loop vs Closed-Loop mechanisms",
      "Explain the 5 open-loop protocol design policies: Retransmission, Window, ACK, Discarding, and Admission",
      "Trace the 4 closed-loop feedback mechanisms: Backpressure, Choke Packet, Implicit Signaling, and Explicit Signaling",
      "Contrast Forward Explicit Congestion Notification (FECN) with Backward Explicit Congestion Notification (BECN)",
      "Explain modern IP/TCP Explicit Congestion Notification (ECN - RFC 3168)"
    ],
    prerequisitesList: [
      { concept: "Network Congestion", meaning: "Understanding buffer overflow and queue delays" },
      { concept: "Feedback Systems", meaning: "Understanding open-loop vs closed-loop control theory" }
    ],
    imageUrl: "assets/images/unit4/topic5-congestion-control/congestion-control-taxonomy.svg",
    imageCaption: "Figure 4.19: Congestion Control Taxonomy — Open-Loop Prevention Policies vs. Closed-Loop Feedback Mechanisms [Forouzan Figure 24.7–24.9]",
    sections: {
      overview: `
        <p class="mb-3">
          In control engineering, systems are divided into <strong>open-loop</strong> and <strong>closed-loop</strong> designs. Computer networking applies this exact division to manage traffic congestion:
        </p>
        <ul class="list-disc pl-5 space-y-1 text-xs mb-3">
          <li><strong>Open-Loop:</strong> Aims to <em>prevent</em> congestion before it happens through intelligent protocol design. Once the system is running, no corrective feedback is sent.</li>
          <li><strong>Closed-Loop:</strong> Detects congestion <em>after</em> it happens and transmits dynamic feedback signals to slow down traffic sources.</li>
        </ul>
      `,
      howItWorks: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">1. Open-Loop Prevention Policies</h3>
        <p class="mb-3">
          Implemented at protocol endpoints (source or destination) without waiting for network feedback:
        </p>
        <div class="space-y-2.5 text-xs mb-4">
          <div class="p-2.5 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded">
            <strong>A. Retransmission Policy:</strong> Senders use accurate dynamic RTO timers. Premature retransmission injects unnecessary duplicates into already-congested routers.
          </div>
          <div class="p-2.5 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded">
            <strong>B. Window Policy (Selective Repeat):</strong> Selective Repeat retransmits only the specific lost packet; Go-Back-N blindly retransmits the entire window, multiplying congestion!
          </div>
          <div class="p-2.5 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded">
            <strong>C. Acknowledgment Policy:</strong> Delaying acknowledgments (e.g. sending 1 ACK for every 2 segments) cuts return acknowledgment traffic by 50%.
          </div>
          <div class="p-2.5 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded">
            <strong>D. Discarding Policy:</strong> Routers selectively discard less critical packets (e.g. video B-frames or audio low-frequency bits) while preserving critical I-frames.
          </div>
          <div class="p-2.5 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded">
            <strong>E. Admission Policy (QoS):</strong> In virtual circuit networks, routers refuse to establish new virtual calls unless sufficient bandwidth and buffer capacity are guaranteed.
          </div>
        </div>

        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">2. Closed-Loop Feedback Mechanisms</h3>
        <p class="mb-3">
          As documented in Forouzan Section 24.3, closed-loop control relies on 4 primary feedback methods:
        </p>
        <div class="space-y-3 text-xs mb-4">
          <div class="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
            <strong class="text-purple-600 dark:text-purple-400">1. Backpressure (Hop-by-Hop):</strong>
            <p class="mt-1 text-slate-600 dark:text-slate-300">A congested router stops accepting packets from its upstream neighbor. That neighbor's buffer fills, forcing it to stop accepting from its upstream neighbor, propagating hop-by-hop back to the source host. Only feasible in virtual circuit networks.</p>
          </div>

          <div class="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
            <strong class="text-amber-600 dark:text-amber-400">2. Choke Packet (Direct ICMP):</strong>
            <p class="mt-1 text-slate-600 dark:text-slate-300">A congested router generates a special control message (e.g. ICMP Source Quench) directly to the source host, ordering it to reduce its sending rate immediately.</p>
          </div>

          <div class="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
            <strong class="text-emerald-600 dark:text-emerald-400">3. Implicit Signaling (Autonomous Loss Inference):</strong>
            <p class="mt-1 text-slate-600 dark:text-slate-300">No explicit feedback packets are generated by routers. Instead, the sender autonomously infers congestion by monitoring packet loss (3 duplicate ACKs or retransmission timeouts) or increasing Round Trip Times (RTT). <em>This is the primary mechanism of standard TCP!</em></p>
          </div>

          <div class="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
            <strong class="text-blue-600 dark:text-blue-400">4. Explicit Signaling (FECN, BECN &amp; ECN):</strong>
            <p class="mt-1 text-slate-600 dark:text-slate-300">Routers set designated notification bits directly inside in-flight packet headers:</p>
            <ul class="list-disc pl-5 space-y-1 mt-1 text-slate-500">
              <li><strong>Backward (BECN):</strong> Bits set in packets traveling toward the source (opposite to congestion).</li>
              <li><strong>Forward (FECN):</strong> Bits set in packets traveling toward the destination. The destination reflects the signal back in its acknowledgment.</li>
            </ul>
          </div>
        </div>
      `,
      technicalDetails: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">3. Modern Explicit Congestion Notification (ECN - RFC 3168)</h3>
        <p class="mb-3">
          Traditional TCP requires a packet to be <strong>dropped</strong> before congestion can be detected. ECN upgrades IP and TCP to signal congestion <strong>without dropping packets</strong>:
        </p>
        <div class="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs space-y-1.5 mb-3 font-mono">
          <div>1. IP Header: Bits 6 &amp; 7 of the DiffServ field (ECN bits):</div>
          <div>&nbsp;&nbsp;&nbsp;• 00: Non-ECN-Capable | 01/10: ECN-Capable (ECT)</div>
          <div>&nbsp;&nbsp;&nbsp;• 11: Congestion Experienced (CE) — Set by congested router!</div>
          <div>2. TCP Header: Flags ECE (ECN-Echo) and CWR (Congestion Window Reduced):</div>
          <div>&nbsp;&nbsp;&nbsp;• Receiver sees CE=11 in IP; sets ECE=1 in its TCP ACK.</div>
          <div>&nbsp;&nbsp;&nbsp;• Sender receives ECE=1; halves its cwnd (as if packet dropped) and sets CWR=1.</div>
          <div>&nbsp;&nbsp;&nbsp;• Result: Zero packet loss, zero retransmissions, zero buffer bloat!</div>
        </div>
      `,
      workedExamples: {
        level1: `
          <strong>Tracing an ECN Feedback Loop:</strong><br/>
          • Client sends IP packet with <code>ECT=10</code>.<br/>
          • Core router's queue exceeds threshold ($min_{th}$); router rewrites IP bits to <code>CE=11</code> instead of dropping the packet.<br/>
          • Server receives packet, sees <code>CE=11</code>, and sends an ACK with TCP flag <code>ECE=1</code>.<br/>
          • Client receives ACK with <code>ECE=1</code>. Client immediately halves its congestion window (<code>cwnd = cwnd / 2</code>) and sets <code>CWR=1</code> in its next packet.<br/>
          Congestion is resolved before a single packet was dropped!
        `
      },
      advantagesLimitations: `
        <div class="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
          <strong class="text-slate-900 dark:text-white font-bold">Key Architectural Takeaway:</strong>
          <p class="mt-1 text-slate-600 dark:text-slate-300">Open-loop policies establish good baseline hygiene, but unpredictable Internet traffic demands closed-loop feedback. The evolution from crude packet dropping (implicit loss) to intelligent marking (ECN) represents the state of the art in modern transport networking.</p>
        </div>
      `,
      whereUsed: [
        "Modern Internet routers (ECN enabled in Cisco, Juniper, Linux)",
        "Data Center TCP (DCTCP) in Microsoft Azure and AWS VPCs",
        "Cellular 5G radio access network congestion management",
        "Frame Relay (FECN/BECN) and ATM (EFCI) legacy backbones"
      ],
      commonMistakes: `
        <ul class="space-y-2 text-xs">
          <li><strong>Confusing Forward (FECN) with Backward (BECN) signaling:</strong> BECN travels directly back to the source; FECN travels forward to the destination, which must bounce the notification back to the sender in an ACK.</li>
          <li><strong>Believing choke packets are widely used on the open Internet:</strong> ICMP Source Quench was deprecated (RFC 6633) because rogue nodes could forge choke packets to kill legitimate connections! Modern networks use ECN.</li>
        </ul>
      `,
      quiz: [
        {
          question: "Which of the following is an example of an Open-Loop congestion control policy?",
          options: [
            "Choke packets sent by congested routers",
            "Backpressure propagating hop-by-hop",
            "Selective Repeat window policy and accurate RTO timer design",
            "Explicit Congestion Notification (ECN)"
          ],
          answer: 2,
          explanation: "Open-loop mechanisms are static design policies (such as using Selective Repeat and accurate RTO timers) that prevent congestion ahead of time without feedback."
        },
        {
          question: "In Explicit Congestion Notification (ECN - RFC 3168), what does a router do when its buffer approaches congestion?",
          options: [
            "It drops the packet immediately",
            "It sets the CE (Congestion Experienced) bits to '11' in the IP header instead of dropping the packet",
            "It sends an ICMP Echo Request to the client",
            "It reboots the router interface"
          ],
          answer: 1,
          explanation: "ECN-capable routers mark the CE bits (11) in the IP header of packets when queues approach congestion, avoiding packet loss."
        }
      ],
      references: [
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, Chapter 24.3: Congestion Control, pp. 768-772", url: "" },
        { cite: "RFC 3168: The Addition of Explicit Congestion Notification (ECN) to IP", url: "https://datatracker.ietf.org/doc/html/rfc3168" }
      ]
    }
  },

  "u4-tcp-congestion-control": {
    id: "u4-tcp-congestion-control",
    title: "TCP Congestion Control",
    unit: "Unit 4 – Transport Layer",
    unitId: "unit4",
    level: "Level 3 — Protocol Dynamics",
    category: "transport",
    difficulty: "Core",
    readingTime: "30 min read",
    standard: "RFC 5681 (STD 7) / Forouzan 4th Ed. Ch 24.4, pp. 772-777 / Kurose & Ross Ch 3.7",
    oneLiner: "The iconic AIMD congestion control framework: Slow Start, Congestion Avoidance, Fast Retransmit, and Fast Recovery (Tahoe vs. Reno).",
    quickAnswer: "TCP Congestion Control (standardized in RFC 5681) is the autonomous mechanism by which a TCP sender regulates its transmission rate to match available network path bandwidth. It maintains an internal Congestion Window (cwnd) and operates via four intertwined algorithms: 1) Slow Start (exponential growth doubling cwnd every RTT); 2) Congestion Avoidance (linear growth adding 1 MSS per RTT); 3) Fast Retransmit (immediate retransmission upon 3 duplicate ACKs); and 4) Fast Recovery (halving cwnd instead of dropping to 1 in TCP Reno, creating the classic AIMD sawtooth curve).",
    whyItMatters: "TCP Congestion Control is widely considered one of the greatest engineering achievements in computer science history. Without central coordination, millions of independent sender endpoints adjust their transmission rates based solely on packet loss signals, converging mathematically on fair, optimal network bandwidth allocation and preventing global collapse.",
    infobox: {
      prerequisites: ["u4-intro-tcp", "u4-tcp-sliding-window", "u4-intro-congestion-control"],
      relatedConcepts: ["u4-congestion-network-performance", "u4-tcp-timer-management"],
      compareWith: ["tcp-tahoe-vs-tcp-reno"],
      primaryUses: [
        "Autonomous bandwidth probing across wide-area networks",
        "Preventing network queue overflows and packet loss spikes",
        "Fair bandwidth allocation among competing data flows",
        "High-performance cloud and CDN content distribution"
      ],
      standardRfc: "RFC 5681: TCP Congestion Control (STD 7), RFC 2581"
    },
    learningObjectives: [
      "Understand the role of the Congestion Window (cwnd) and Slow Start Threshold (ssthresh)",
      "Explain the exponential growth phase of Slow Start (cwnd doubles every RTT)",
      "Explain the linear growth phase of Congestion Avoidance (Additive Increase: +1 MSS per RTT)",
      "Distinguish between severe congestion (RTO Timeout) and mild congestion (3 Duplicate ACKs)",
      "Contrast TCP Tahoe (drops to 1 MSS) with TCP Reno (Fast Recovery halving cwnd to create AIMD sawtooth)"
    ],
    prerequisitesList: [
      { concept: "TCP Sliding Window", meaning: "Understanding transmission windows and cumulative ACKs" },
      { concept: "Round Trip Time (RTT)", meaning: "Time taken for a round-trip packet exchange" }
    ],
    imageUrl: "assets/images/unit4/topic5-congestion-control/tcp-congestion-control-aimd.svg",
    imageCaption: "Figure 4.20: TCP Congestion Control State Machine & AIMD Sawtooth Dynamics — Tahoe vs. Reno [Forouzan Section 24.4]",
    sections: {
      overview: `
        <p class="mb-3">
          While TCP Flow Control uses the advertised window (<code>rwnd</code>) to protect the receiver's memory, <strong>TCP Congestion Control</strong> uses an internal variable called the <strong>Congestion Window (<code>cwnd</code>)</strong> to protect the network.
        </p>
        <p class="mb-3">
          The sender's actual allowable transmission window is strictly bounded by both constraints:
        </p>
        <div class="p-3 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 rounded-lg text-xs font-mono mb-3 text-center">
          Actual Window Size = min(rwnd, cwnd)
        </div>
        <p class="text-xs text-slate-600 dark:text-slate-400">
          The receiver dictates <code>rwnd</code> based on buffer space; the sender dynamically calculates <code>cwnd</code> based on observed network congestion!
        </p>
      `,
      howItWorks: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">1. The Four Intertwined Algorithms (RFC 5681)</h3>
        <div class="space-y-3 text-xs mb-4">
          <div class="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
            <strong class="text-blue-600 dark:text-blue-400">1. Slow Start (Exponential Growth):</strong>
            <p class="mt-1 text-slate-600 dark:text-slate-300">A new connection starts conservatively with <code>cwnd = 1 MSS</code> (or 10 MSS in modern kernels). For every incoming acknowledgment, <code>cwnd</code> increments by 1 MSS. Because each ACK allows two new segments to be sent, <strong>cwnd doubles every RTT</strong> ($1 \to 2 \to 4 \to 8 \to 16 \dots$). Despite its name, Slow Start increases transmission rate exponentially!</p>
            <div class="mt-1 font-mono text-[11px] text-blue-600 dark:text-blue-400">Exit Condition: When cwnd ≥ ssthresh (Slow Start Threshold), transition to Congestion Avoidance.</div>
          </div>

          <div class="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
            <strong class="text-emerald-600 dark:text-emerald-400">2. Congestion Avoidance (Additive Increase):</strong>
            <p class="mt-1 text-slate-600 dark:text-slate-300">Once <code>cwnd</code> reaches <code>ssthresh</code>, exponential doubling stops to avoid overshooting network capacity. Instead, <code>cwnd</code> increases linearly by <strong>1 MSS per RTT</strong> (for each ACK received: $cwnd = cwnd + 1/cwnd$). This gentle probing probes for available bandwidth without causing sudden packet drops.</p>
          </div>

          <div class="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
            <strong class="text-rose-600 dark:text-rose-400">3. Fast Retransmit (Loss Detection):</strong>
            <p class="mt-1 text-slate-600 dark:text-slate-300">If a single segment is lost but subsequent segments arrive, the receiver sends duplicate ACKs. Upon receiving <strong>3 Duplicate ACKs</strong> (4 identical ACKs total), the sender immediately retransmits the missing segment <em>without waiting for the Retransmission Timer (RTO) to expire</em>!</p>
          </div>

          <div class="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
            <strong class="text-purple-600 dark:text-purple-400">4. Fast Recovery &amp; AIMD (Tahoe vs. Reno):</strong>
            <p class="mt-1 text-slate-600 dark:text-slate-300">How does TCP respond when packet loss is detected?</p>
            <ul class="list-disc pl-5 space-y-1 mt-1 text-slate-500">
              <li><strong>Severe Loss (RTO Timeout):</strong> Indicates severe network blockage. Both Tahoe and Reno set $ssthresh = \max(FlightSize / 2, 2\text{ MSS})$, reset $cwnd = 1\text{ MSS}$, and re-enter Slow Start from scratch!</li>
              <li><strong>Mild Loss (3 Duplicate ACKs):</strong>
                <ul class="list-circle pl-4 space-y-0.5 mt-0.5">
                  <li><strong>TCP Tahoe (1988):</strong> Drastically resets $cwnd = 1\text{ MSS}$ and restarts Slow Start.</li>
                  <li><strong>TCP Reno (1990):</strong> Recognizes packets are still flowing; sets $ssthresh = cwnd / 2$ and sets $cwnd = ssthresh$. It skips Slow Start completely and continues linear Congestion Avoidance!</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">2. The AIMD Sawtooth Waveform</h3>
        <p class="mb-3">
          The combination of <strong>Additive Increase</strong> (+1 MSS per RTT) and <strong>Multiplicative Decrease</strong> (halving <code>cwnd</code> upon loss) produces the famous <strong>AIMD Sawtooth waveform</strong>:
        </p>
        <div class="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-mono mb-3">
          Linear Ramp Up (+1 per RTT) → Packet Drop → Multiplicative Cut (÷ 2) → Linear Ramp Up (+1) ...
        </div>
        <p class="text-xs text-slate-600 dark:text-slate-400 mb-3">
          Chiu and Jain (1989) proved mathematically that AIMD is the <em>only</em> linear control policy that simultaneously converges to optimal network throughput AND fair bandwidth sharing among competing connections!
        </p>
      `,
      technicalDetails: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">3. Evolution of TCP Congestion Flavors</h3>
        <table class="wiki-table w-full text-xs mb-4">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-800">
              <th>TCP Flavor</th>
              <th>RFC</th>
              <th>Loss Recovery Behavior</th>
              <th>Modern Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="font-bold">TCP Tahoe</td>
              <td>1988</td>
              <td>Drops cwnd to 1 MSS on both Timeout and 3 Dup ACKs</td>
              <td>Historical / Educational baseline</td>
            </tr>
            <tr>
              <td class="font-bold">TCP Reno</td>
              <td>RFC 2581 (1990)</td>
              <td>Introduced Fast Retransmit &amp; Fast Recovery (halves cwnd on 3 Dup ACKs)</td>
              <td>Standard classic textbook model</td>
            </tr>
            <tr>
              <td class="font-bold">TCP NewReno</td>
              <td>RFC 6582 (1999)</td>
              <td>Handles multiple packet drops within a single window gracefully</td>
              <td>Widely deployed standard</td>
            </tr>
            <tr>
              <td class="font-bold">TCP CUBIC</td>
              <td>RFC 8312 (2008)</td>
              <td>Replaces linear increase with cubic function of time; rapid recovery on gigabit links</td>
              <td>Default algorithm in Linux / Android</td>
            </tr>
            <tr>
              <td class="font-bold">BBR (Google)</td>
              <td>2016</td>
              <td>Model-based: Measures bottleneck bandwidth and min RTT; ignores packet loss</td>
              <td>Default on YouTube / Google Cloud</td>
            </tr>
          </tbody>
        </table>
      `,
      workedExamples: {
        level1: `
          <strong>Tracing cwnd Growth Across Transmission Rounds:</strong><br/>
          Given: Initial $ssthresh = 16\\text{ MSS}$, start with $cwnd = 1\\text{ MSS}$.<br/>
          • Round 1: $cwnd = 1\\text{ MSS}$ (Slow Start) $\\to$ ACK arrives $\\to cwnd = 2$<br/>
          • Round 2: $cwnd = 2\\text{ MSS}$ (Slow Start) $\\to$ 2 ACKs arrive $\\to cwnd = 4$<br/>
          • Round 3: $cwnd = 4\\text{ MSS}$ (Slow Start) $\\to$ 4 ACKs arrive $\\to cwnd = 8$<br/>
          • Round 4: $cwnd = 8\\text{ MSS}$ (Slow Start) $\\to$ 8 ACKs arrive $\\to cwnd = 16$<br/>
          • Round 5: $cwnd = 16\\text{ MSS} = ssthresh$! Transition to <strong>Congestion Avoidance</strong>.<br/>
          • Round 6: $cwnd = 16 + 1 = 17\\text{ MSS}$ (Additive Increase)<br/>
          • Round 7: $cwnd = 17 + 1 = 18\\text{ MSS}$<br/>
          • Round 8: $cwnd = 18 + 1 = 19\\text{ MSS}$
        `,
        level2: `
          <strong>Comparing Tahoe and Reno Recovery After Loss:</strong><br/>
          Continuing Round 8: At $cwnd = 20\\text{ MSS}$, 3 Duplicate ACKs arrive!<br/>
          • <strong>New ssthresh calculation:</strong> $ssthresh = cwnd / 2 = 20 / 2 = \\mathbf{10\\text{ MSS}}$.<br/>
          • <strong>Under TCP Tahoe:</strong> Resets $cwnd = 1\\text{ MSS}$! Enters Slow Start until $cwnd = 10$, then Avoidance.<br/>
          • <strong>Under TCP Reno:</strong> Sets $cwnd = ssthresh = \\mathbf{10\\text{ MSS}}$! Stays in Congestion Avoidance, continuing to $11, 12, 13\\dots$ without resetting to 1!
        `
      },
      advantagesLimitations: `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <h4 class="font-bold text-emerald-800 dark:text-emerald-300 mb-2">Advantages</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Decentralized: requires zero state storage or calculations inside intermediate routers.</li>
              <li>AIMD mathematically converges to fair and efficient bandwidth sharing.</li>
              <li>Fast Retransmit repairs single-packet drops in 1 RTT without waiting for timeouts.</li>
            </ul>
          </div>
          <div class="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800">
            <h4 class="font-bold text-rose-800 dark:text-rose-300 mb-2">Limitations</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Mistakes random wireless noise packet loss for congestion, slashing throughput on Wi-Fi/5G.</li>
              <li>Takes dozens of RTT rounds to ramp up on high-bandwidth transoceanic links (LFNs).</li>
            </ul>
          </div>
        </div>
      `,
      whereUsed: [
        "Operating system kernel TCP implementations (Linux CUBIC, Windows Compound TCP, macOS)",
        "Content delivery networks (Cloudflare, Akamai, Fastly)",
        "Cloud video streaming and large software download distribution",
        "High-performance computing cluster data synchronization"
      ],
      commonMistakes: `
        <ul class="space-y-2 text-xs">
          <li><strong>Believing Slow Start is slow:</strong> Slow Start is an exponential doubling curve ($2^n$); it is called "slow" only in comparison to blasting the entire window at full link speed on round 1!</li>
          <li><strong>Confusing the response to 3 Dup ACKs with Timeout:</strong> 3 Duplicate ACKs indicates mild congestion (subsequent packets got through); a Timeout indicates severe total packet blockage!</li>
        </ul>
      `,
      quiz: [
        {
          question: "How does the TCP Congestion Window (cwnd) grow during the Slow Start phase?",
          options: [
            "It increases linearly by 1 MSS every RTT",
            "It doubles every RTT (exponential growth)",
            "It remains constant until the handshake completes",
            "It decreases by half on every acknowledgment"
          ],
          answer: 1,
          explanation: "In Slow Start, cwnd increments by 1 MSS for every incoming ACK, causing the window to double every RTT (exponential growth)."
        },
        {
          question: "What triggers the transition from Slow Start to Congestion Avoidance?",
          options: [
            "The arrival of 3 Duplicate ACKs",
            "When cwnd reaches or exceeds ssthresh (Slow Start Threshold)",
            "The expiration of the Keepalive timer",
            "The receiver closing the connection"
          ],
          answer: 1,
          explanation: "When cwnd reaches or exceeds ssthresh, exponential doubling terminates and linear Additive Increase (Congestion Avoidance) begins."
        },
        {
          question: "What is the key difference between TCP Tahoe and TCP Reno when 3 Duplicate ACKs arrive?",
          options: [
            "Tahoe resets cwnd to 1 MSS, while Reno sets cwnd to ssthresh (Fast Recovery) and continues linear growth",
            "Tahoe doubles cwnd, while Reno resets to 1",
            "Tahoe uses UDP headers, while Reno uses TCP headers",
            "Tahoe closes the connection completely"
          ],
          answer: 0,
          explanation: "TCP Tahoe resets cwnd to 1 MSS and restarts Slow Start; TCP Reno sets cwnd to ssthresh (Fast Recovery) and avoids dropping to 1 MSS."
        }
      ],
      references: [
        { cite: "RFC 5681: TCP Congestion Control (STD 7 - Allman, Paxson, Blanton)", url: "https://datatracker.ietf.org/doc/html/rfc5681" },
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, Chapter 24.4: TCP Congestion Control, pp. 772-777", url: "" },
        { cite: "Van Jacobson, Congestion Avoidance and Control, ACM SIGCOMM 1988", url: "" }
      ]
    }
  },

  "u4-congestion-network-performance": {
    id: "u4-congestion-network-performance",
    title: "Congestion Control and Network Performance",
    unit: "Unit 4 – Transport Layer",
    unitId: "unit4",
    level: "Level 2 — Core Architecture",
    category: "transport",
    difficulty: "Core",
    readingTime: "25 min read",
    standard: "Forouzan 4th Ed. Ch 24.2, pp. 763-766 / RFC 2309 (AQM/RED) / RFC 3168 (ECN)",
    oneLiner: "Quantitative analysis of network throughput, delay curves, the 3 operating regions, and Active Queue Management (RED/ECN).",
    quickAnswer: "Network performance under congestion is characterized by two fundamental curves plotted against Offered Load: Throughput and Delay. Operating networks transition across three distinct regions: Region 1 (Light Load / Optimal), where throughput equals load and delay is minimal; Region 2 (Moderate Load / Knee), where throughput levels off and queue delays surge exponentially; and Region 3 (Congestion Collapse), where throughput drops to near zero as queues overflow and duplicate retransmissions flood the links.",
    whyItMatters: "Understanding the throughput and delay curves enables network architects to design networks that operate at Kleinrock's optimal operating point (the 'knee' of the curve). Techniques like Active Queue Management (AQM) and Random Early Detection (RED) solve Bufferbloat by keeping router queue buffers short without causing TCP global synchronization.",
    infobox: {
      prerequisites: ["u4-intro-congestion-control", "u4-tcp-congestion-control"],
      relatedConcepts: ["u4-congestion-control-mechanisms"],
      compareWith: ["throughput-vs-delay-tradeoff"],
      primaryUses: [
        "Sizing router and switch buffer memories in ISP backbones",
        "Deploying Active Queue Management (CoDel, FQ-CoDel, RED)",
        "Mitigating Bufferbloat in broadband cable and fiber modems",
        "Optimizing cloud interconnect latency"
      ],
      standardRfc: "RFC 2309 (Recommendations on Queue Management and Congestion Avoidance in the Internet)"
    },
    learningObjectives: [
      "Plot and analyze the Throughput vs. Offered Load performance curve",
      "Plot and analyze the Packet Delay vs. Offered Load performance curve",
      "Detail the physical characteristics of Region 1, Region 2, and Region 3",
      "Identify the 'knee' and 'cliff' operational thresholds described by Leonard Kleinrock",
      "Explain the Random Early Detection (RED) algorithm: min_th, max_th, and drop probability curve"
    ],
    prerequisitesList: [
      { concept: "Network Throughput & Delay", meaning: "Understanding transmission, propagation, and queuing delays" },
      { concept: "TCP Congestion Control", meaning: "Understanding how loss signals trigger rate reductions" }
    ],
    imageUrl: "assets/images/unit4/topic5-congestion-control/aqm-red-ecn.svg",
    imageCaption: "Figure 4.21: Active Queue Management (AQM), Random Early Detection (RED) Drop Curve & Explicit Congestion Notification [Forouzan Section 24.2]",
    sections: {
      overview: `
        <p class="mb-3">
          To measure and optimize network performance, computer scientists examine two fundamental metrics as a function of <strong>Offered Load</strong> (the aggregate rate at which hosts inject packets into the network):
        </p>
        <ul class="list-disc pl-5 space-y-1.5 text-xs mb-3">
          <li><strong>Throughput:</strong> The number of useful payload bits delivered to destination applications per second.</li>
          <li><strong>Delay:</strong> The elapsed time from packet transmission at source to arrival at destination.</li>
        </ul>
      `,
      howItWorks: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">1. The Three Operating Regions (Forouzan Section 24.2)</h3>
        <p class="mb-3">
          As offered load increases from zero to maximum capacity and beyond, the network transitions across three distinct operational regimes:
        </p>
        <div class="space-y-3 text-xs mb-4">
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg">
            <strong class="text-emerald-800 dark:text-emerald-300 font-bold">Region 1: Light Load (Optimal Operating Zone)</strong>
            <p class="mt-1 text-slate-700 dark:text-slate-300">• Offered Load is well below link capacity.</p>
            <p class="mt-0.5 text-slate-700 dark:text-slate-300">• <strong>Throughput = Offered Load:</strong> Every packet injected is successfully delivered.</p>
            <p class="mt-0.5 text-slate-700 dark:text-slate-300">• <strong>Delay is minimal:</strong> Queue buffers are empty; packets experience only physical propagation and transmission delays.</p>
          </div>

          <div class="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg">
            <strong class="text-amber-800 dark:text-amber-300 font-bold">Region 2: Moderate Load (The Knee — Congested Zone)</strong>
            <p class="mt-1 text-slate-700 dark:text-slate-300">• Offered Load approaches physical link capacity.</p>
            <p class="mt-0.5 text-slate-700 dark:text-slate-300">• <strong>Throughput levels off:</strong> Reaches the theoretical link capacity ceiling.</p>
            <p class="mt-0.5 text-slate-700 dark:text-slate-300">• <strong>Delay surges exponentially:</strong> Packets begin waiting in router queues ($M/M/1$ queueing behavior). As load reaches 100%, theoretical delay approaches infinity!</p>
          </div>

          <div class="p-3 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-lg">
            <strong class="text-rose-800 dark:text-rose-300 font-bold">Region 3: Heavy Load (The Cliff — Congestion Collapse)</strong>
            <p class="mt-1 text-slate-700 dark:text-slate-300">• Offered Load exceeds network capacity.</p>
            <p class="mt-0.5 text-slate-700 dark:text-slate-300">• <strong>Throughput collapses to near zero:</strong> Router buffers overflow; dropped packets trigger retransmissions that flood the links with redundant duplicates.</p>
            <p class="mt-0.5 text-slate-700 dark:text-slate-300">• Routers waste 99% of their CPU cycles forwarding packets that will be dropped downstream!</p>
          </div>
        </div>

        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">2. The "Knee" and the "Cliff" (Kleinrock's Ideal Operating Point)</h3>
        <p class="mb-3">
          Internet pioneer Leonard Kleinrock showed that an ideal congestion control algorithm should maintain network operation exactly at the <strong>"Knee"</strong>:
        </p>
        <div class="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-mono mb-3">
          • The Knee: Point where Throughput reaches maximum while Delay remains low.<br/>
          • The Cliff: Point where offered load exceeds capacity and throughput crashes.<br/>
          • Goal: Maximize Power = Throughput / Delay.
        </div>
      `,
      technicalDetails: `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">3. Active Queue Management (AQM) &amp; Random Early Detection (RED)</h3>
        <p class="mb-3">
          Traditional routers used <strong>Tail Drop</strong>: when a queue buffer fills 100%, every subsequent packet is dropped. Tail Drop causes two fatal network pathologies:
        </p>
        <ul class="list-disc pl-5 space-y-1 text-xs mb-3">
          <li><strong>Bufferbloat:</strong> Packets sit queued for 2–5 seconds, causing horrific lag during video calls and gaming.</li>
          <li><strong>Global TCP Synchronization:</strong> All competing TCP connections experience loss at the same millisecond, simultaneously cut their <code>cwnd</code> by half, and simultaneously ramp up, causing wild oscillations in link utilization.</li>
        </ul>
        <p class="mb-3">
          <strong>Random Early Detection (RED - RFC 2309):</strong> Instead of waiting for the buffer to fill completely, RED tracks the running average queue length (<code>AvgLen</code>) and drops or marks packets <em>probabilistically before the buffer overflows</em>:
        </p>
        <div class="p-3 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg text-xs font-mono space-y-1 mb-3">
          • If AvgLen &lt; min_th: Drop probability p = 0 (All packets accepted).<br/>
          • If min_th ≤ AvgLen ≤ max_th: Drop probability increases linearly from 0 to max_p.<br/>
          • If AvgLen &gt; max_th: Drop probability p = 1.0 (All incoming packets dropped).
        </div>
        <p class="text-xs text-slate-500">
          Because packets are dropped or ECN-marked randomly, individual TCP connections back off at different times, completely smoothing link utilization!
        </p>
      `,
      workedExamples: {
        level1: `
          <strong>Computing Queue Delay via Little's Law:</strong><br/>
          A router buffer contains an average of $N = 50\\text{ packets}$.<br/>
          The link service rate (throughput) is $\\lambda = 10,000\\text{ packets/second}$.<br/>
          Using Little's Law ($N = \\lambda \\times W$):<br/>
          $$W = \\frac{N}{\\lambda} = \\frac{50}{10,000} = 0.005\\text{ seconds} = \\mathbf{5\\text{ ms of queuing delay}}$$.<br/>
          If bufferbloat allows the queue to fill with 5,000 packets: $W = 5,000 / 10,000 = \\mathbf{500\\text{ ms}}$ of delay!
        `
      },
      advantagesLimitations: `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <h4 class="font-bold text-emerald-800 dark:text-emerald-300 mb-2">Advantages of AQM / RED</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Keeps average router queue lengths short, eliminating Bufferbloat.</li>
              <li>Prevents Global TCP Synchronization by desynchronizing loss across flows.</li>
              <li>Accommodates transient traffic bursts gracefully.</li>
            </ul>
          </div>
          <div class="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800">
            <h4 class="font-bold text-rose-800 dark:text-rose-300 mb-2">Tuning Challenges</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Configuring min_th and max_th requires careful tuning; newer algorithms like CoDel (Controlled Delay) self-tune automatically.</li>
            </ul>
          </div>
        </div>
      `,
      whereUsed: [
        "Modern Internet routers (Linux CoDel and FQ-CoDel queueing disciplines)",
        "Home Wi-Fi routers and cable modems",
        "Enterprise backbone SD-WAN edge gateways",
        "University Computer Networks performance modeling labs"
      ],
      commonMistakes: `
        <ul class="space-y-2 text-xs">
          <li><strong>Assuming bigger router buffers are always better:</strong> Oversized buffers cause Bufferbloat, turning low-latency connections into sluggish, lagging connections.</li>
          <li><strong>Confusing the Knee with the Cliff:</strong> The Knee is the optimal operating threshold where throughput peaks; the Cliff is the point where throughput crashes into Congestion Collapse.</li>
        </ul>
      `,
      quiz: [
        {
          question: "What is the optimal operating zone on the throughput and delay curves?",
          options: [
            "At the 'Cliff', where offered load exceeds capacity",
            "At the 'Knee', where throughput reaches maximum capacity while delay remains low",
            "When offered load is exactly zero",
            "When packet drop probability equals 100%"
          ],
          answer: 1,
          explanation: "The 'Knee' represents the optimal operating point where throughput is maximized while queuing delay has not yet exploded."
        },
        {
          question: "What problem occurs when traditional Tail Drop buffers cause all competing TCP connections to drop cwnd simultaneously?",
          options: [
            "Bufferbloat",
            "Global TCP Synchronization",
            "Two-Army Problem",
            "Silly Window Syndrome"
          ],
          answer: 1,
          explanation: "Global TCP Synchronization occurs when full Tail Drop buffers drop packets from all flows at once, causing all senders to throttle their windows simultaneously."
        },
        {
          question: "How does Random Early Detection (RED) prevent buffer overflow in routers?",
          options: [
            "It powers down the router when load is high",
            "It probabilistically drops or marks packets before the buffer becomes 100% full",
            "It converts TCP packets to UDP datagrams",
            "It doubles the physical link bandwidth"
          ],
          answer: 1,
          explanation: "RED monitors average queue length and drops or marks packets randomly between min_th and max_th, signaling senders to slow down before buffer overflow occurs."
        }
      ],
      references: [
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, Chapter 24.2: Data Traffic & Congestion, pp. 763-766", url: "" },
        { cite: "RFC 2309: Recommendations on Queue Management and Congestion Avoidance in the Internet", url: "https://datatracker.ietf.org/doc/html/rfc2309" }
      ]
    }
  }
};

module.exports = { TOPIC5_ITEMS };
console.log("Topic 5 builder module defined!");

