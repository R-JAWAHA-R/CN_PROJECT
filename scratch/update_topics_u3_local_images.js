const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../js/topics_u3_extended.js');
let content = fs.readFileSync(filePath, 'utf8');

// Load data as object to modify cleanly
const topics = require('../js/topics_u3_extended.js');

function makeInlineDiagram(src, caption, title) {
  return `<div class="my-6 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 shadow-sm">
  <div class="bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
    <a href="${src}" target="_blank" rel="noopener noreferrer" class="block cursor-zoom-in">
      <img src="${src}" alt="${title || caption}" class="max-h-80 w-auto mx-auto object-contain rounded-lg transition-transform duration-200 hover:scale-[1.02]" loading="lazy">
    </a>
  </div>
  <div class="px-4 py-2 text-xs text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-800/80 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-center gap-1.5">
    <svg class="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
    <span>${caption}</span>
  </div>
</div>`;
}

// Map of topics to updates
const updates = {
  // --- TOPIC 1 ---
  "ip-addressing": {
    hero: "assets/images/unit3/topic1-ip-addresses/ip-addressing-basics.svg",
    caption: "Figure 3.1: Fundamental IP Addressing Architecture – Network ID vs Host ID Boundaries across Subnets",
    inlines: [
      {
        targetSec: "technicalDetails",
        pos: "bottom",
        html: makeInlineDiagram("assets/images/unit3/topic1-ip-addresses/private-ip-ranges.svg", "Figure 3.1b: RFC 1918 Private IPv4 Ranges and NAT Gateway Architecture", "Private IP Ranges")
      }
    ]
  },
  "ipv4": {
    hero: "assets/images/unit3/topic1-ip-addresses/ipv4-address-classes.svg",
    caption: "Figure 3.2: IPv4 Classful Addressing Structure (Classes A through E) and Leading-Bit Prefixes",
    inlines: [
      {
        targetSec: "technicalDetails",
        pos: "bottom",
        html: makeInlineDiagram("assets/images/unit3/topic1-ip-addresses/ipv4-header-format.svg", "Figure 3.2b: Complete 20-to-60 Byte IPv4 Datagram Header Field Layout", "IPv4 Header Format")
      }
    ]
  },
  "ipv4-protocol": {
    hero: "assets/images/unit3/topic1-ip-addresses/ipv4-address-classes.svg",
    caption: "Figure 3.2: IPv4 Classful Addressing Structure (Classes A through E) and Leading-Bit Prefixes",
    inlines: [
      {
        targetSec: "technicalDetails",
        pos: "bottom",
        html: makeInlineDiagram("assets/images/unit3/topic1-ip-addresses/ipv4-header-format.svg", "Figure 3.2b: Complete 20-to-60 Byte IPv4 Datagram Header Field Layout", "IPv4 Header Format")
      }
    ]
  },
  "subnetting": {
    hero: "assets/images/unit3/topic1-ip-addresses/subnet-mask-concept.svg",
    caption: "Figure 3.3: Bitwise AND Operation between Host IP Address and Subnet Mask",
    inlines: [
      {
        targetSec: "howItWorks",
        pos: "bottom",
        html: makeInlineDiagram("assets/images/unit3/topic1-ip-addresses/subnetting-example.svg", "Figure 3.3b: Dividing a /24 Network into 4 Subnets (/26) with 62 Usable Hosts Each", "Subnetting Example")
      },
      {
        targetSec: "technicalDetails",
        pos: "bottom",
        html: makeInlineDiagram("assets/images/unit3/topic1-ip-addresses/cidr-notation.svg", "Figure 3.3c: Classless Inter-Domain Routing (CIDR) Prefix Lengths & Allocation Matrix", "CIDR Notation")
      }
    ]
  },
  "ipv6": {
    hero: "assets/images/unit3/topic1-ip-addresses/ipv6-address-format.svg",
    caption: "Figure 3.4: 128-Bit IPv6 Address Architecture, 8 Hextets, and Zero Compression Rules",
    inlines: [
      {
        targetSec: "technicalDetails",
        pos: "bottom",
        html: makeInlineDiagram("assets/images/unit3/topic1-ip-addresses/ipv6-header-format.svg", "Figure 3.4b: Streamlined Fixed 40-Byte IPv6 Base Header Layout", "IPv6 Header Format")
      }
    ]
  },
  "ipv6-protocol": {
    hero: "assets/images/unit3/topic1-ip-addresses/ipv6-address-format.svg",
    caption: "Figure 3.4: 128-Bit IPv6 Address Architecture, 8 Hextets, and Zero Compression Rules",
    inlines: [
      {
        targetSec: "technicalDetails",
        pos: "bottom",
        html: makeInlineDiagram("assets/images/unit3/topic1-ip-addresses/ipv6-header-format.svg", "Figure 3.4b: Streamlined Fixed 40-Byte IPv6 Base Header Layout", "IPv6 Header Format")
      }
    ]
  },
  "ipv4-vs-ipv6": {
    hero: "assets/images/unit3/topic1-ip-addresses/ipv4-vs-ipv6-comparison.svg",
    caption: "Figure 3.5: Structural and Architectural Comparison – IPv4 vs. IPv6 Datagram Specifications",
    inlines: []
  },

  // --- TOPIC 2 ---
  "internetworking": {
    hero: "assets/images/unit3/topic2-internetworking/internetworking-concept.svg",
    caption: "Figure 3.6: Heterogeneous Network Interconnection via Internetworking Routers and Gateways",
    inlines: [
      {
        targetSec: "technicalDetails",
        pos: "bottom",
        html: makeInlineDiagram("assets/images/unit3/topic2-internetworking/network-interconnection-devices.svg", "Figure 3.6b: OSI Layer Hierarchy of Network Interconnection Devices: Repeaters, Switches, Routers, and Gateways", "Interconnection Devices")
      }
    ]
  },
  "internetwork-routing": {
    hero: "assets/images/unit3/topic2-internetworking/internetwork-routing.svg",
    caption: "Figure 3.7: Hop-by-Hop Datagram Traversal and L2 Frame Encapsulation across Heterogeneous LANs",
    inlines: [
      {
        targetSec: "howItWorks",
        pos: "bottom",
        html: makeInlineDiagram("assets/images/unit3/topic2-internetworking/router-architecture.svg", "Figure 3.7b: Router Architecture: Route Processor, Crossbar Switching Fabric, and Queued I/O Line Cards", "Router Architecture")
      },
      {
        targetSec: "technicalDetails",
        pos: "bottom",
        html: makeInlineDiagram("assets/images/unit3/topic2-internetworking/routing-table-example.svg", "Figure 3.7c: Forwarding Table Anatomy: Next-Hop Resolution and Longest Prefix Match (LPM)", "Routing Table Example")
      }
    ]
  },
  "routing-design-issues": {
    hero: "assets/images/unit3/topic2-internetworking/internetwork-routing.svg",
    caption: "Figure 3.7: Hop-by-Hop Datagram Traversal and L2 Frame Encapsulation across Heterogeneous LANs",
    inlines: [
      {
        targetSec: "howItWorks",
        pos: "bottom",
        html: makeInlineDiagram("assets/images/unit3/topic2-internetworking/router-architecture.svg", "Figure 3.7b: Router Architecture: Route Processor, Crossbar Switching Fabric, and Queued I/O Line Cards", "Router Architecture")
      }
    ]
  },
  "tunneling": {
    hero: "assets/images/unit3/topic2-internetworking/tunneling-concept.svg",
    caption: "Figure 3.8: Dual Encapsulation Architecture: Transporting Foreign Packets across Incompatible Transit Networks",
    inlines: [
      {
        targetSec: "howItWorks",
        pos: "bottom",
        html: makeInlineDiagram("assets/images/unit3/topic2-internetworking/tunneling-6to4.svg", "Figure 3.8b: Automated 6to4 Tunneling Architecture with Embedded Public IPv4 Prefixes", "6to4 Tunneling")
      },
      {
        targetSec: "technicalDetails",
        pos: "bottom",
        html: makeInlineDiagram("assets/images/unit3/topic2-internetworking/vpn-tunneling.svg", "Figure 3.8c: Site-to-Site IPsec ESP Tunnel Mode with End-to-End Cryptographic Security", "VPN Tunneling")
      }
    ]
  },

  // --- TOPIC 3 ---
  "optimality-principle": {
    hero: "assets/images/unit3/topic3-routing-algorithms/optimality-principle.svg",
    caption: "Figure 3.9: Bellman's Optimality Principle: Sub-paths of Shortest Paths are Themselves Optimal",
    inlines: [
      {
        targetSec: "howItWorks",
        pos: "bottom",
        html: makeInlineDiagram("assets/images/unit3/topic3-routing-algorithms/sink-tree.svg", "Figure 3.9b: Complete Sink Tree Rooted at Destination Router B across a 6-Node Graph", "Sink Tree")
      },
      {
        targetSec: "technicalDetails",
        pos: "bottom",
        html: makeInlineDiagram("assets/images/unit3/topic3-routing-algorithms/routing-algorithm-classification.svg", "Figure 3.9c: Comprehensive Classification Tree of Network Layer Routing Algorithms", "Algorithm Classification")
      }
    ]
  },
  "dijkstra": {
    hero: "assets/images/unit3/topic3-routing-algorithms/dijkstra-step-by-step.svg",
    caption: "Figure 3.10: Step-by-Step Execution Trace of Dijkstra's Shortest Path Algorithm on a Weighted Graph",
    inlines: [
      {
        targetSec: "howItWorks",
        pos: "bottom",
        html: makeInlineDiagram("assets/images/unit3/topic3-routing-algorithms/dijkstra-network-graph.svg", "Figure 3.10b: Initial Weighted Network Graph Topology Prior to Shortest Path Evaluation", "Network Graph")
      },
      {
        targetSec: "technicalDetails",
        pos: "bottom",
        html: makeInlineDiagram("assets/images/unit3/topic3-routing-algorithms/dijkstra-shortest-path-tree.svg", "Figure 3.10c: Resulting Shortest Path Tree (SPT) with Calculated Metric Distances from Source Node A", "Shortest Path Tree")
      }
    ]
  },
  "shortest-path-algorithm": {
    hero: "assets/images/unit3/topic3-routing-algorithms/dijkstra-step-by-step.svg",
    caption: "Figure 3.10: Step-by-Step Execution Trace of Dijkstra's Shortest Path Algorithm on a Weighted Graph",
    inlines: [
      {
        targetSec: "technicalDetails",
        pos: "bottom",
        html: makeInlineDiagram("assets/images/unit3/topic3-routing-algorithms/dijkstra-shortest-path-tree.svg", "Figure 3.10c: Resulting Shortest Path Tree (SPT) with Calculated Metric Distances from Source Node A", "Shortest Path Tree")
      }
    ]
  },
  "flooding": {
    hero: "assets/images/unit3/topic3-routing-algorithms/flooding-algorithm.svg",
    caption: "Figure 3.11: Multi-Hop Broadcast Flooding Propagation Pattern from Originating Source Node",
    inlines: [
      {
        targetSec: "technicalDetails",
        pos: "bottom",
        html: makeInlineDiagram("assets/images/unit3/topic3-routing-algorithms/flooding-duplicate-problem.svg", "Figure 3.11b: Broadcast Storms, Duplicate Packet Accumulation, and TTL Hop-Damping Controls", "Duplicate Packet Storms")
      }
    ]
  },

  // --- TOPIC 4 ---
  "distance-vector": {
    hero: "assets/images/unit3/topic4-dv-ls-routing/distance-vector-concept.svg",
    caption: "Figure 3.12: Distributed Distance Vector Routing Concept and Periodic Routing Table Exchanges",
    inlines: [
      {
        targetSec: "howItWorks",
        pos: "bottom",
        html: makeInlineDiagram("assets/images/unit3/topic4-dv-ls-routing/bellman-ford-example.svg", "Figure 3.12b: Bellman-Ford Iterative Convergence Matrix over a 5-Router Distributed Topology", "Bellman Ford Example")
      }
    ]
  },
  "distance-vector-routing": {
    hero: "assets/images/unit3/topic4-dv-ls-routing/distance-vector-concept.svg",
    caption: "Figure 3.12: Distributed Distance Vector Routing Concept and Periodic Routing Table Exchanges",
    inlines: [
      {
        targetSec: "howItWorks",
        pos: "bottom",
        html: makeInlineDiagram("assets/images/unit3/topic4-dv-ls-routing/bellman-ford-example.svg", "Figure 3.12b: Bellman-Ford Iterative Convergence Matrix over a 5-Router Distributed Topology", "Bellman Ford Example")
      }
    ]
  },
  "link-state-routing": {
    hero: "assets/images/unit3/topic4-dv-ls-routing/link-state-concept.svg",
    caption: "Figure 3.13: Five Phases of Link State Routing: From HELLO Discovery to Local Dijkstra Calculation",
    inlines: [
      {
        targetSec: "howItWorks",
        pos: "bottom",
        html: makeInlineDiagram("assets/images/unit3/topic4-dv-ls-routing/link-state-packet.svg", "Figure 3.13b: Internal Structure of a Link State Packet (LSP) with Sequence and Aging Controls", "LSP Structure")
      },
      {
        targetSec: "technicalDetails",
        pos: "bottom",
        html: makeInlineDiagram("assets/images/unit3/topic4-dv-ls-routing/ospf-areas.svg", "Figure 3.13c: Hierarchical OSPF Area 0 Backbone Partitioning and Inter-Area Route Summarization", "OSPF Areas")
      }
    ]
  },
  "routing-table-updates": {
    hero: "assets/images/unit3/topic4-dv-ls-routing/routing-table-update-process.svg",
    caption: "Figure 3.14: End-to-End Routing Table Update Lifecycle from Fault Detection to FIB Programming",
    inlines: [
      {
        targetSec: "howItWorks",
        pos: "bottom",
        html: makeInlineDiagram("assets/images/unit3/topic4-dv-ls-routing/distance-vector-update.svg", "Figure 3.14b: Triggered Distance Vector Update Evaluation via Distributed Bellman-Ford Equation", "Triggered Update")
      }
    ]
  },
  "comparison-dv-ls": {
    hero: "assets/images/unit3/topic4-dv-ls-routing/dv-vs-ls-comparison.svg",
    caption: "Figure 3.15: Comprehensive Matrix: Distance Vector (RIP) versus Link State (OSPF) Performance Metrics",
    inlines: []
  },
  "count-to-infinity": {
    hero: "assets/images/unit3/topic4-dv-ls-routing/count-to-infinity.svg",
    caption: "Figure 3.16: Timeline Progression of the Count-to-Infinity Routing Loop Phenomenon",
    inlines: [
      {
        targetSec: "howItWorks",
        pos: "bottom",
        html: makeInlineDiagram("assets/images/unit3/topic4-dv-ls-routing/split-horizon-poison-reverse.svg", "Figure 3.16b: Prevention via Split Horizon and Split Horizon with Poison Reverse (Metric 16)", "Split Horizon")
      }
    ]
  },

  // --- TOPIC 5 ---
  "traffic-aware-routing": {
    hero: "assets/images/unit3/topic5-congestion-control/traffic-aware-routing.svg",
    caption: "Figure 3.17: Traffic-Aware Dynamic Route Splitting to Prevent Bottleneck Hotspots",
    inlines: [
      {
        targetSec: "overview",
        pos: "bottom",
        html: makeInlineDiagram("assets/images/unit3/topic5-congestion-control/congestion-concept.svg", "Figure 3.17b: Network Queue Saturation, Buffer Overflow, and Congestion Collapse Dynamics", "Congestion Concept")
      },
      {
        targetSec: "technicalDetails",
        pos: "bottom",
        html: makeInlineDiagram("assets/images/unit3/topic5-congestion-control/traffic-load-vs-delay.svg", "Figure 3.17c: Offered Load vs. Throughput & Delay Curve: The Knee, Cliff, and Collapse Thresholds", "Load vs Delay")
      }
    ]
  },
  "congestion-control": {
    hero: "assets/images/unit3/topic5-congestion-control/traffic-aware-routing.svg",
    caption: "Figure 3.17: Traffic-Aware Dynamic Route Splitting to Prevent Bottleneck Hotspots",
    inlines: [
      {
        targetSec: "overview",
        pos: "bottom",
        html: makeInlineDiagram("assets/images/unit3/topic5-congestion-control/congestion-concept.svg", "Figure 3.17b: Network Queue Saturation, Buffer Overflow, and Congestion Collapse Dynamics", "Congestion Concept")
      }
    ]
  },
  "admission-control": {
    hero: "assets/images/unit3/topic5-congestion-control/admission-control.svg",
    caption: "Figure 3.18: Connection-Oriented Flow Admission Control Gatekeeper Architecture",
    inlines: [
      {
        targetSec: "howItWorks",
        pos: "bottom",
        html: makeInlineDiagram("assets/images/unit3/topic5-congestion-control/virtual-circuit-admission.svg", "Figure 3.18b: Virtual Circuit Resource Reservation along End-to-End Network Path", "VC Admission")
      }
    ]
  },
  "traffic-throttling": {
    hero: "assets/images/unit3/topic5-congestion-control/traffic-throttling.svg",
    caption: "Figure 3.19: Closed-Loop Traffic Throttling: Congestion Detection and Dynamic Rate Backoff",
    inlines: [
      {
        targetSec: "howItWorks",
        pos: "bottom",
        html: makeInlineDiagram("assets/images/unit3/topic5-congestion-control/choke-packet.svg", "Figure 3.19b: Choke Packet Generation and Source Rate Reduction Protocol", "Choke Packet")
      },
      {
        targetSec: "technicalDetails",
        pos: "bottom",
        html: makeInlineDiagram("assets/images/unit3/topic5-congestion-control/ecn-mechanism.svg", "Figure 3.19c: Explicit Congestion Notification (ECN) via IP Header Bits 6 & 7 and TCP Echo", "ECN Mechanism")
      }
    ]
  },
  "load-shedding": {
    hero: "assets/images/unit3/topic5-congestion-control/load-shedding.svg",
    caption: "Figure 3.20: Queue Drop Policies during Severe Router Congestion: Random vs Priority Drop",
    inlines: [
      {
        targetSec: "howItWorks",
        pos: "bottom",
        html: makeInlineDiagram("assets/images/unit3/topic5-congestion-control/wine-vs-milk-policy.svg", "Figure 3.20b: Wine vs Milk Packet Discard Strategies: Discarding Stale vs Fresh Packets", "Wine vs Milk")
      }
    ]
  }
};

let modifiedCount = 0;
for (const [topicId, update] of Object.entries(updates)) {
  if (topics[topicId]) {
    // 1. Update hero image
    topics[topicId].imageUrl = update.hero;
    topics[topicId].imageCaption = update.caption;
    if (topics[topicId].sections) {
      topics[topicId].sections.imageUrl = update.hero;
      topics[topicId].sections.imageCaption = update.caption;
    }

    // 2. Add inline diagrams if not already present
    if (topics[topicId].sections && update.inlines) {
      for (const inline of update.inlines) {
        const sec = inline.targetSec;
        if (typeof topics[topicId].sections[sec] === 'string') {
          // Check if already embedded
          if (!topics[topicId].sections[sec].includes(inline.html.split('src="')[1].split('"')[0])) {
            topics[topicId].sections[sec] += '\n' + inline.html;
          }
        }
      }
    }
    modifiedCount++;
  } else {
    console.warn('Topic not found:', topicId);
  }
}

console.log('Modified topics count:', modifiedCount);

// Generate updated file
const outputCode = `/**
 * Computer Networks - Unit 3: Network Layer (Extended Topics)
 * Generated for 5 Topics & 20 Subtopics according to syllabus hierarchy
 * Includes detailed PDF content extraction, mathematical formulas, algorithms,
 * visual diagrams, and student-friendly educational breakdowns.
 * Updated with local high-resolution SVG educational assets.
 */

const TOPICS_U3_EXT = ${JSON.stringify(topics, null, 2)};

if (typeof window !== 'undefined') {
  window.TOPICS_U3_EXT = TOPICS_U3_EXT;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TOPICS_U3_EXT;
}
`;

fs.writeFileSync(filePath, outputCode, 'utf8');
console.log('Successfully updated js/topics_u3_extended.js with local assets!');

