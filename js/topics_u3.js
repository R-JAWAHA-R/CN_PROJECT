// Unit III Topics Database: Network Layer & Routing
// Matches Kurose & Ross Chapter 4 (Data Plane) & Chapter 5 (Control Plane)
const TOPICS_U3 = {
  "network-layer": {
    id: "network-layer",
    title: "Network Layer: Data Plane vs Control Plane",
    unit: "Unit III: Network Layer & Routing",
    unitId: "unit3",
    level: "Level 3 — Major Topic / Module",
    category: "network",
    difficulty: "Core",
    readingTime: "7 min read",
    standard: "Kurose & Ross Ch 4 & Ch 5 / RFC 791",
    oneLiner: "The protocol layer responsible for host-to-host delivery, packet forwarding (Data Plane), and path routing (Control Plane).",
    quickAnswer: "The Network Layer connects independent networks into the Internet. Its Data Plane moves packets from router inputs to outputs in nanoseconds; its Control Plane coordinates routing algorithms across the entire network.",
    whyItMatters: "Understanding the architectural division between per-router Data Plane forwarding and network-wide Control Plane routing is the central insight of modern networking and SDN.",
    infobox: {
      layer: "Layer 3 (Network Layer)",
      standard: "RFC 791 (IPv4), RFC 8200 (IPv6)",
      type: "End-to-End Routing Architecture",
      keyFormula: "\\text{Forwarding (Local)} \\neq \\text{Routing (Global)}",
      prerequisites: ["packet", "encapsulation"],
      relatedConcepts: ["forwarding", "routing", "dijkstra", "ipv4", "ipv6"],
      compareWith: ["transport-layer"],
      primaryUses: ["Global Internet Routing, Corporate WANs, SDN"]
    },
    sections: {
      overview: `The <strong>Network Layer</strong> provides logical communication between end hosts. Unlike the Transport Layer (which runs strictly on end hosts), every router in the network core implements the Network Layer. Modern networking strictly decouples the <strong>Data Plane</strong> (per-router forwarding) from the <strong>Control Plane</strong> (network-wide routing).`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Data Plane (Forwarding):</strong> Local, per-router action. When a packet arrives on an input link, hardware moves it to the appropriate output link in nanoseconds.</li>
          <li><strong>Control Plane (Routing):</strong> Network-wide logic. Coordinates path determination so packets travel along least-cost paths from source to destination.</li>
          <li><strong>Traditional vs SDN:</strong> In traditional routers, routing algorithms run on each individual router's CPU. In SDN, routing logic is centralized in a software controller.</li>
        </ol>`,
      diagram: `
+-----------------------------------------------------------+
|              CONTROL PLANE (Routing Algorithm)            |
|  - Determines end-to-end paths (OSPF, BGP, SDN)           |
|  - Computes Forwarding Tables across routers              |
+-----------------------------------------------------------+
                             |
         +-------------------+-------------------+
         | Configures FIB                        | Configures FIB
         v                                       v
+------------------+                    +------------------+
| ROUTER 1 (DATA)  |                    | ROUTER 2 (DATA)  |
| Input --> Output |                    | Input --> Output |
+------------------+                    +------------------+`,
      technicalDetails: `Architectural comparison:
        <ul class="wiki-bullet-list">
          <li><strong>Data Plane:</strong> Implemented in hardware ASICs and TCAM. Time scale: nanoseconds per packet.</li>
          <li><strong>Control Plane:</strong> Implemented in software CPUs. Time scale: milliseconds to seconds.</li>
          <li><strong>Connection Model:</strong> The Internet network layer is strictly <em>connectionless</em> (datagram service). Each packet is routed independently with no virtual circuits.</li>
        </ul>`,
      workedExample: `A packet travels from San Francisco to London:
        <br>1. <strong>Control Plane</strong> runs BGP and OSPF, computing that the least-cost path traverses routers SF $\\to$ Chicago $\\to$ NYC $\\to$ London.
        <br>2. <strong>Data Plane</strong> at each router looks up the destination IP in TCAM memory in 10 nanoseconds, switching the packet to the next transatlantic fiber interface.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Plane</th><th>Scope</th><th>Implementation</th><th>Speed</th></tr></thead>
          <tbody>
            <tr><td>Data Plane</td><td>Local per-router</td><td>Hardware ASICs / TCAM</td><td>Nanoseconds</td></tr>
            <tr><td>Control Plane</td><td>Network-wide</td><td>Software / Routing daemons</td><td>Milliseconds</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Global IP routing across tier-1 ISPs", "Enterprise SD-WAN fabrics", "Cloud virtual private clouds (VPCs)"],
      commonMistakes: "Using 'forwarding' and 'routing' as synonyms. Forwarding is the local hardware action of transferring a packet from input to output; routing is the network-wide process of planning the complete path.",
      compareWith: { title: "Data Plane vs Control Plane", note: "Data Plane moves bits from input to output (like taking an off-ramp). Control Plane plans the overall travel itinerary (like Google Maps)." },
      practice: {
        question: "Which router component performs the nanosecond transfer of packets from input ports to output ports?",
        choices: ["Routing processor", "Data plane switching fabric", "Control plane software", "BGP daemon"],
        correctIndex: 1,
        explanation: "The data plane switching fabric and hardware line cards perform the rapid per-packet forwarding in nanoseconds."
      },
      references: [
        { cite: "Kurose & Ross Chapter 4.1: Overview of Network Layer", url: "https://gaia.cs.umass.edu/kurose_ross/" }
      ]
    },
    prevTopicId: "vlan",
    nextTopicId: "forwarding"
  },

  "forwarding": {
    id: "forwarding",
    title: "Packet Forwarding & Forwarding Tables",
    unit: "Unit III: Network Layer & Routing",
    unitId: "unit3",
    level: "Level 2 — Standard Topic",
    category: "network",
    difficulty: "Core",
    readingTime: "5 min read",
    standard: "RFC 1812",
    oneLiner: "The local, per-router action of transferring a packet from an input port to the appropriate output port.",
    quickAnswer: "Forwarding extracts the destination IP address, searches the Forwarding Information Base (FIB) using Longest Prefix Match, and switches the packet across the internal fabric.",
    whyItMatters: "High-end core routers process tens of millions of packets per second. Forwarding must happen entirely in hardware without CPU intervention.",
    infobox: {
      layer: "Layer 3 (Data Plane)",
      standard: "RFC 1812",
      type: "Per-Packet Forwarding",
      keyFormula: "\\text{Lookup Speed} \\approx O(1) \\text{ via TCAM}",
      prerequisites: ["network-layer"],
      relatedConcepts: ["router", "routing", "ipv4"],
      compareWith: ["routing"],
      primaryUses: ["Line-rate router line cards, Hardware Layer-3 Switches"]
    },
    sections: {
      overview: `<strong>Forwarding</strong> is the Data Plane process of receiving a packet on an input interface, determining its next hop via a hardware forwarding table (FIB), and moving it across the internal switching fabric to the designated output interface.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Header Parsing:</strong> The input line card verifies the checksum, checks the TTL, and reads the 32-bit or 128-bit destination address.</li>
          <li><strong>Longest Prefix Match (LPM):</strong> The FIB is queried using specialized TCAM memory in a single clock cycle.</li>
          <li><strong>Fabric Traversal:</strong> The packet is switched across the crossbar matrix to the output buffer.</li>
          <li><strong>Header Modification:</strong> TTL is decremented ($TTL = TTL - 1$), checksum recalculated, and new Layer-2 frame generated.</li>
        </ol>`,
      diagram: `
Destination IP: 200.23.16.5
            |
            v
+------------------------------------+
|  FORWARDING INFORMATION BASE (FIB) |
| Prefix Entry            | Port     |
|-------------------------|----------|
| 200.23.16.0/20          | Port 1   |
| 200.23.16.0/24 (Best!)  | Port 2   |
| 0.0.0.0/0 (Default)     | Port 3   |
+------------------------------------+
            |
            +---> Matches /24 --> Dispatched to Port 2!`,
      technicalDetails: `Ternary Content-Addressable Memory (TCAM):
        <br>Standard RAM takes an address and returns data. CAM takes data and returns the address in 1 cycle. <em>Ternary</em> CAM supports wildcards ('don't cares'), enabling routers to perform longest prefix matching in a single clock cycle across 1,000,000 prefixes!`,
      workedExample: `Destination: \`192.168.1.155\`.
        <br>• FIB matches \`192.168.0.0/16\` (16 bits)
        <br>• FIB matches \`192.168.1.128/25\` (25 bits)
        <br>Since 25 bits is more specific than 16 bits, the router forwards to the \`/25\` output interface.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Operates at multi-terabit wire speed</td><td>TCAM is power-hungry and expensive</td></tr>
            <tr><td>Stateless per-packet processing</td><td>Input queuing Head-of-Line (HOL) blocking</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Internet backbone core routers", "Layer-3 campus distribution switches"],
      commonMistakes: "Assuming the router consults the full routing protocol table for every packet. The router compiles the software Routing Information Base (RIB) into a streamlined hardware Forwarding Information Base (FIB) for nanosecond lookups.",
      compareWith: { title: "Forwarding vs Routing", note: "Forwarding takes nanoseconds in hardware. Routing computes the tables over seconds in software." },
      practice: {
        question: "What hardware component enables routers to perform Longest Prefix Matches in a single clock cycle?",
        choices: ["SRAM", "DRAM", "TCAM (Ternary Content-Addressable Memory)", "Hard Disk Cache"],
        correctIndex: 2,
        explanation: "TCAM matches bit patterns against prefixes containing 'don't care' wildcard bits in parallel in a single clock cycle."
      },
      references: [
        { cite: "Kurose & Ross Chapter 4.2: What's Inside a Router?", url: "https://gaia.cs.umass.edu/kurose_ross/" }
      ]
    },
    prevTopicId: "network-layer",
    nextTopicId: "routing"
  },

  "routing": {
    id: "routing",
    title: "Routing & Control Plane Architecture",
    unit: "Unit III: Network Layer & Routing",
    unitId: "unit3",
    level: "Level 2 — Standard Topic",
    category: "network",
    difficulty: "Core",
    readingTime: "6 min read",
    standard: "Kurose & Ross Chapter 5",
    oneLiner: "The network-wide logic that determines the least-cost end-to-end paths taken by packets across routers.",
    quickAnswer: "Routing uses distributed algorithms (Dijkstra, Bellman-Ford) or centralized controllers (SDN) to compute the global paths taken by packets across the network.",
    whyItMatters: "Dynamic routing automatically reroutes around fiber cuts, hardware outages, and congested links, ensuring the Internet survives major infrastructure disruptions.",
    infobox: {
      layer: "Layer 3 (Control Plane)",
      standard: "Kurose & Ross Ch 5, RFC 2328, RFC 4271",
      type: "Path Selection Logic",
      keyFormula: "\\text{Goal: } \\min \\sum_{(u,v) \\in \\text{Path}} c(u,v)",
      prerequisites: ["network-layer", "forwarding"],
      relatedConcepts: ["dijkstra", "distance-vector", "ospf", "bgp", "sdn"],
      compareWith: ["forwarding"],
      primaryUses: ["OSPF, BGP, SDN Controllers"]
    },
    sections: {
      overview: `<strong>Routing</strong> determines the route or path taken by packets as they flow from sender to receiver. The routing algorithm is the brain of the network, modeling the network as a weighted graph $G = (V, E)$ where nodes $V$ are routers and edges $E$ are physical links with costs.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Graph Modeling:</strong> Network is represented as a graph. Edge costs reflect propagation delay, financial transit cost, or inverse link bandwidth.</li>
          <li><strong>Link-State Routing:</strong> Every router possesses a global map of the network and runs Dijkstra's algorithm (e.g. OSPF).</li>
          <li><strong>Distance-Vector Routing:</strong> Routers communicate only with physical neighbors, iteratively updating estimates via Bellman-Ford (e.g. RIP, BGP).</li>
          <li><strong>FIB Generation:</strong> Shortest-path trees are compiled into the forwarding table on each router line card.</li>
        </ol>`,
      diagram: `
          (Link Cost: 2)
     [A] -------------- [B]
      |                  |
   (1)|                  |(3)
      |                  |
     [C] -------------- [D]
          (Link Cost: 5)
Least cost path from A to D: A -> B -> D (Cost = 2 + 3 = 5).`,
      technicalDetails: `Routing algorithm classifications:
        <ul class="wiki-bullet-list">
          <li><strong>Centralized (Global):</strong> Every node knows the full graph topology and all link costs (Link-State).</li>
          <li><strong>Decentralized (Distributed):</strong> Nodes calculate paths iteratively and asynchronously by exchanging cost vectors only with direct neighbors (Distance-Vector).</li>
          <li><strong>Static vs Dynamic:</strong> Static routes are manually configured by admins; dynamic routes automatically update within seconds of link failures.</li>
        </ul>`,
      workedExample: `In the 4-node graph above:
        <br>• Path $A \\to C \\to D$: Cost $= 1 + 5 = 6$.
        <br>• Path $A \\to B \\to D$: Cost $= 2 + 3 = 5$.
        <br>The routing algorithm selects path $A \\to B \\to D$ and writes next-hop $B$ for destination $D$ into Router A's forwarding table.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Routing Paradigm</th><th>Convergence</th><th>Message Overhead</th></tr></thead>
          <tbody>
            <tr><td>Link-State (OSPF)</td><td>Fast convergence, loop-free</td><td>Floods LSAs network-wide ($O(|V| \\cdot |E|)$)</td></tr>
            <tr><td>Distance-Vector (RIP)</td><td>Slow (count-to-infinity)</td><td>Exchanges only with direct neighbors</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Intra-domain enterprise backbones (OSPF, IS-IS)", "Global inter-domain transit (BGP)", "Cloud software-defined routing fabrics"],
      commonMistakes: "Assuming all routers run the same routing algorithm. The Internet is divided into Autonomous Systems (ASes): within an AS, networks run intra-domain protocols like OSPF; between ASes, they run BGP.",
      compareWith: { title: "Intra-AS vs Inter-AS Routing", note: "Intra-AS routing (OSPF) focuses on performance and shortest path. Inter-AS routing (BGP) focuses on business peering policies and economics." },
      practice: {
        question: "In graph representation of network routing, what do the edge weights typically represent?",
        choices: ["The number of users", "Link cost (e.g. latency, inverse bandwidth, or monetary fee)", "The MAC address", "The IP address"],
        correctIndex: 1,
        explanation: "Edge weights represent link costs, which can be configured as physical latency, inverse bandwidth, or administrative policy costs."
      },
      references: [
        { cite: "Kurose & Ross Chapter 5.1: Routing Protocols", url: "https://gaia.cs.umass.edu/kurose_ross/" }
      ]
    },
    prevTopicId: "forwarding",
    nextTopicId: "dijkstra"
  },

  "dijkstra": {
    id: "dijkstra",
    title: "Dijkstra's Shortest Path Algorithm (SPF)",
    unit: "Unit III: Network Layer & Routing",
    unitId: "unit3",
    level: "Level 3 — Major Topic / Module",
    category: "network",
    difficulty: "Advanced",
    readingTime: "7 min read",
    standard: "Edsger W. Dijkstra (1959) / OSPF SPF",
    oneLiner: "A centralized algorithm calculating least-cost paths from one source node to all destinations using a global topology graph.",
    quickAnswer: "Dijkstra's algorithm greedily expands the set of known shortest-path nodes, computing the least-cost path tree from source to all destinations in O(N^2) or O(E log N) time.",
    whyItMatters: "Dijkstra's Shortest Path First (SPF) algorithm powers OSPF and IS-IS, the foundational intra-domain routing protocols of the global Internet.",
    infobox: {
      layer: "Layer 3 (Control Plane)",
      standard: "RFC 2328 (OSPFv2), ISO 10589 (IS-IS)",
      type: "Link-State Graph Algorithm",
      keyFormula: "D(v) = \\min(D(v), D(w) + c(w,v))",
      prerequisites: ["routing", "network-layer"],
      relatedConcepts: ["link-state-routing", "ospf", "distance-vector"],
      compareWith: ["distance-vector"],
      primaryUses: ["OSPF Routing, IS-IS Backbone, Google Maps GPS Navigation"]
    },
    sections: {
      overview: `Invented by Dutch computer scientist Edsger Dijkstra in 1959, <strong>Dijkstra's Shortest Path Algorithm</strong> is a greedy graph search algorithm. In Link-State routing, each router floods link states so all nodes construct an identical graph, and then independently runs Dijkstra's algorithm to compute its shortest-path tree.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Initialization:</strong> Set $N' = \\{u\\}$ (source node). For all neighbors $v$, set $D(v) = c(u,v)$; for non-neighbors, set $D(v) = \\infty$.</li>
          <li><strong>Select Minimum Node:</strong> Find node $w \\notin N'$ with minimum tentative distance $D(w)$. Add $w$ to $N'$.</li>
          <li><strong>Relax Distances:</strong> Update tentative distances for all neighbors $v \\notin N'$ of $w$:
            $$D(v) = \\min(D(v), D(w) + c(w,v))$$</li>
          <li><strong>Iterate:</strong> Repeat steps 2 and 3 until all nodes are included in $N'$.</li>
        </ol>`,
      diagram: `
Weighted 6-Node Graph:
      (2)          (3)
   u ----- v ---------- y
   | \\     |          / |
(1)|  \\(5) |(3)    (1)/ |(2)
   |    \\  |        /   |
   x ----- w ------ z --+
      (3)     (1)`,
      interactiveLabKey: "dijkstra",
      technicalDetails: `Algorithmic Complexity:
        <br>• Naive array implementation: $O(|N|^2)$ where $|N|$ is the number of nodes.
        <br>• Binary min-heap implementation: $O(|E| \\log |N|)$, which is blazing fast even on networks with thousands of routers.`,
      workedExample: `Running Dijkstra from source node $u$:
        <table class="wiki-table">
          <thead><tr><th>Step</th><th>N' (Visited)</th><th>D(v), p(v)</th><th>D(x), p(x)</th><th>D(w), p(w)</th><th>D(y), p(y)</th><th>D(z), p(z)</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>{u}</td><td>2, u</td><td><strong>1, u</strong></td><td>5, u</td><td>$\\infty$</td><td>$\\infty$</td></tr>
            <tr><td>1</td><td>{u, x}</td><td>2, u</td><td>-</td><td><strong>4, x</strong></td><td>$\\infty$</td><td>$\\infty$</td></tr>
            <tr><td>2</td><td>{u, x, v}</td><td>-</td><td>-</td><td><strong>3, v</strong></td><td>5, v</td><td>$\\infty$</td></tr>
            <tr><td>3</td><td>{u, x, v, w}</td><td>-</td><td>-</td><td>-</td><td>5, v</td><td><strong>4, w</strong></td></tr>
            <tr><td>4</td><td>{u, x, v, w, z}</td><td>-</td><td>-</td><td>-</td><td><strong>5, v</strong></td><td>-</td></tr>
            <tr><td>5</td><td>{u, x, v, w, z, y}</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
          </tbody>
        </table>
        Final shortest paths from $u$: to $v$ (cost 2), to $x$ (cost 1), to $w$ (cost 3 via $v$), to $z$ (cost 4 via $w$), to $y$ (cost 5 via $v$).`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Guaranteed optimal shortest path tree with no loops</td><td>Requires every node to possess the full global topology</td></tr>
            <tr><td>Fast convergence with low oscillation risk</td><td>Flooding Link-State Packets consumes network bandwidth</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Open Shortest Path First (OSPF)", "Intermediate System to Intermediate System (IS-IS)", "Network mapping tools"],
      commonMistakes: "Applying Dijkstra to graphs with negative edge weights. Dijkstra assumes non-negative link costs; negative weights require the Bellman-Ford algorithm.",
      compareWith: { title: "Dijkstra (Link-State) vs Bellman-Ford (Distance-Vector)", note: "Dijkstra is centralized (runs locally over a complete global map). Bellman-Ford is distributed (nodes iteratively exchange vectors with direct neighbors)." },
      practice: {
        question: "What is the time complexity of Dijkstra's algorithm implemented with a binary min-heap for a graph with N nodes and E edges?",
        choices: ["O(N^3)", "O(N log N)", "O(E log N)", "O(N * E)"],
        correctIndex: 2,
        explanation: "Using a binary min-heap or Fibonacci heap priority queue, Dijkstra achieves $O(E \\log N)$ complexity."
      },
      references: [
        { cite: "Dijkstra, E. W. (1959). A note on two problems in connexion with graphs. Numerische Mathematik.", url: "https://doi.org/10.1007/BF01386390" },
        { cite: "RFC 2328: OSPF Version 2", url: "https://datatracker.ietf.org/doc/html/rfc2328" }
      ]
    },
    prevTopicId: "routing",
    nextTopicId: "link-state-routing"
  },

  "link-state-routing": {
    id: "link-state-routing",
    title: "Link-State Routing Protocol",
    unit: "Unit III: Network Layer & Routing",
    unitId: "unit3",
    level: "Level 2 — Standard Topic",
    category: "network",
    difficulty: "Core",
    readingTime: "5 min read",
    standard: "RFC 2328 (OSPF) / ISO 10589",
    oneLiner: "A routing architecture where every router floods link-state advertisements so all nodes build an identical network map.",
    quickAnswer: "In Link-State routing, routers discover neighbors, measure link costs, flood Link-State Advertisements (LSAs) network-wide, and independently run Dijkstra's algorithm.",
    whyItMatters: "Because every node computes paths over an identical global topology map, Link-State protocols converge rapidly without persistent routing loops.",
    infobox: {
      layer: "Layer 3 (Control Plane)",
      standard: "RFC 2328 (OSPF), ISO 10589 (IS-IS)",
      type: "Global Knowledge Routing",
      keyFormula: "\\text{Message Volume} = O(|V| \\cdot |E|) \\text{ flooded LSAs}",
      prerequisites: ["dijkstra", "routing"],
      relatedConcepts: ["dijkstra", "ospf", "distance-vector"],
      compareWith: ["distance-vector"],
      primaryUses: ["Enterprise Core Campus Backbones, ISP Transit Networks"]
    },
    sections: {
      overview: `<strong>Link-State Routing</strong> is an approach where each router creates a complete map of the network topology. Whenever a link goes up or down, the directly connected router broadcasts a <strong>Link-State Packet (LSP)</strong> to every other router in the Autonomous System via reliable flooding.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Discover Neighbors:</strong> Router sends HELLO packets on all interfaces to learn neighbor identities.</li>
          <li><strong>Measure Link Costs:</strong> Measures round-trip delay or uses configured interface bandwidth metrics.</li>
          <li><strong>Build Link-State Packet (LSP):</strong> Contains router ID, list of direct neighbors, link costs, and sequence number.</li>
          <li><strong>Reliable Flooding:</strong> Floods LSP out all interfaces except the one it arrived on. Sequence numbers prevent duplicate forwarding.</li>
          <li><strong>Dijkstra Execution:</strong> All routers independently execute Dijkstra's algorithm, yielding identical shortest-path trees.</li>
        </ol>`,
      diagram: `
Router A broadcasts LSA: "My links are B (cost 2) and C (cost 5)"
        +-----------------------------+
        |  LSA FLOODING TO ALL NODES  |
        +-----------------------------+
          /           |             \\
         v            v              v
      Router B     Router C       Router D
All nodes obtain IDENTICAL Link-State Database (LSDB)!`,
      technicalDetails: `Reliable Flooding Algorithm:
        <br>When a router receives an LSP:
        <ul class="wiki-bullet-list">
          <li>If new: stores in local Link-State Database (LSDB) and floods out all other interfaces.</li>
          <li>If duplicate (seen before): discards immediately.</li>
          <li>If newer sequence number: overwrites old entry and re-floods.</li>
        </ul>`,
      workedExample: `Router R1 detects link to R2 has failed (cost $\\to \\infty$).
        <br>1. R1 generates new LSA with sequence number $S+1$.
        <br>2. R1 floods LSA across the network in 20 milliseconds.
        <br>3. Every router recalculates Dijkstra SPF locally.
        <br>4. Traffic is dynamically rerouted around the severed link in less than 50 ms.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Fast convergence (typically < 100 ms)</td><td>Requires substantial memory for complete LSDB</td></tr>
            <tr><td>Zero routing loops during steady state</td><td>LSA flooding generates burst network traffic</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Open Shortest Path First (OSPF)", "IS-IS in global telecom backbones"],
      commonMistakes: "Assuming Link-State protocols exchange routing tables. Link-State protocols exchange <em>link states</em> (neighbor costs); each router independently computes its own routing table.",
      compareWith: { title: "Link-State vs Distance-Vector", note: "Link-State floods neighbor info to the whole world. Distance-Vector shares routing tables only with immediate neighbors." },
      practice: {
        question: "What information is contained within an OSPF Link-State Advertisement (LSA)?",
        choices: ["The entire routing table of the router", "The list of direct neighbors and their link costs", "The IP addresses of all Internet hosts", "The TCP sequence numbers"],
        correctIndex: 1,
        explanation: "An LSA contains strictly the originating router's direct neighbors and associated link costs, not the full computed routing table."
      },
      references: [
        { cite: "RFC 2328: OSPF Version 2", url: "https://datatracker.ietf.org/doc/html/rfc2328" }
      ]
    },
    prevTopicId: "dijkstra",
    nextTopicId: "distance-vector"
  },

  "distance-vector": {
    id: "distance-vector",
    title: "Distance-Vector Routing (Bellman-Ford)",
    unit: "Unit III: Network Layer & Routing",
    unitId: "unit3",
    level: "Level 2 — Standard Topic",
    category: "network",
    difficulty: "Core",
    readingTime: "6 min read",
    standard: "Kurose & Ross Ch 5 / RFC 2453 (RIPv2)",
    oneLiner: "A distributed, asynchronous algorithm where nodes exchange distance vectors only with directly connected neighbors.",
    quickAnswer: "Distance-Vector iteratively applies the Bellman-Ford equation $D_x(y) = \\min_v \\{c(x,v) + D_v(y)\\}$. Each node shares its distance estimates only with direct physical neighbors.",
    whyItMatters: "Distance-Vector was the original routing algorithm of ARPANET (RIP), and its path-vector variant powers BGP on the global Internet.",
    infobox: {
      layer: "Layer 3 (Control Plane)",
      standard: "RFC 2453 (RIP), RFC 4271 (BGP)",
      type: "Distributed Asynchronous Routing",
      keyFormula: "D_x(y) = \\min_{v} \\{ c(x,v) + D_v(y) \\}",
      prerequisites: ["routing"],
      relatedConcepts: ["dijkstra", "link-state-routing", "bgp"],
      compareWith: ["dijkstra"],
      primaryUses: ["Routing Information Protocol (RIP), BGP Path Vector, Cisco EIGRP"]
    },
    sections: {
      overview: `<strong>Distance-Vector (DV)</strong> routing is a distributed, iterative algorithm based on the classic Bellman-Ford shortest-path algorithm. Rather than requiring knowledge of the entire network map, each router knows only the cost to its direct physical neighbors and the distance vectors sent by those neighbors.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Bellman-Ford Equation:</strong> Node $x$ updates distance to destination $y$ through neighbor $v$:
            $$D_x(y) = \\min_{v \\in \\text{neighbors}} \\{ c(x,v) + D_v(y) \\}$$</li>
          <li><strong>Periodic Exchange:</strong> Each router sends its distance vector $D_x = [D_x(y) : y \\in V]$ to all direct neighbors.</li>
          <li><strong>Convergence:</strong> When a neighbor's vector changes, node $x$ recalculates. If its own vector changes, it informs its neighbors. This repeats until no more updates occur.</li>
        </ol>`,
      diagram: `
Three-Node Topology:
      (1)            (2)
[x] -------- [y] -------- [z]
Initial Vectors:
x: [x:0, y:1, z:inf]
y: [x:1, y:0, z:2]
z: [x:inf, y:2, z:0]

Exchange vectors! Node x calculates:
D_x(z) = min{ c(x,y) + D_y(z) } = 1 + 2 = 3. Converged!`,
      interactiveLabKey: "dv",
      technicalDetails: `The Count-to-Infinity Problem:
        <br>Good news travels fast (cost reductions converge in 1 round). Bad news travels slowly: when a link fails, nodes can create mutual routing loops, incrementing distance estimates by 1 each round until reaching infinity.
        <br><strong>Mitigation:</strong> <em>Poisoned Reverse</em>: If node $z$ routes to $x$ through $y$, $z$ tells $y$ that $D_z(x) = \\infty$, preventing $y$ from routing back through $z$.`,
      workedExample: `In the 3-node network above, suppose link $x-y$ breaks ($c(x,y) = \\infty$).
        <br>Without poisoned reverse, $y$ thinks $z$ can reach $x$ in 3 hops, so $y$ sets $D_y(x) = 2 + 3 = 5$.
        <br>Then $z$ updates $D_z(x) = 2 + 5 = 7$, counting up to infinity ($16$ in RIP).
        <br>With <em>Poisoned Reverse</em>, $z$ advertises $D_z(x) = \\infty$ to $y$, preventing the loop instantly!`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Lightweight: zero global topology knowledge needed</td><td>Slow convergence on link failures</td></tr>
            <tr><td>Minimal memory and CPU calculation</td><td>Susceptible to routing loops and count-to-infinity</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["RIP (Routing Information Protocol)", "BGP (uses Path-Vector to prevent loops)", "Cisco EIGRP (Advanced Distance Vector)"],
      commonMistakes: "Believing Poisoned Reverse solves all count-to-infinity loops. Poisoned Reverse solves loops involving two direct nodes; loops involving 3 or more nodes (A $\\to$ B $\\to$ C $\\to$ A) still require path history (like BGP AS-PATH).",
      compareWith: { title: "Distance-Vector vs Link-State", note: "Distance-Vector is decentralized rumor-passing with direct neighbors. Link-State is centralized calculation over a flooded global map." },
      practice: {
        question: "What is the maximum hop count recognized as infinity in the RIP distance-vector protocol?",
        choices: ["10", "15", "16", "255"],
        correctIndex: 2,
        explanation: "RIP defines 16 hops as infinity (unreachable) to cap the duration of count-to-infinity loops."
      },
      references: [
        { cite: "RFC 2453: RIP Version 2", url: "https://datatracker.ietf.org/doc/html/rfc2453" },
        { cite: "Bellman, R. (1958). On a routing problem. Quarterly of Applied Mathematics.", url: "https://www.jstor.org/stable/43634538" }
      ]
    },
    prevTopicId: "link-state-routing",
    nextTopicId: "ospf"
  },

  "ospf": {
    id: "ospf",
    title: "Open Shortest Path First (OSPF)",
    unit: "Unit III: Network Layer & Routing",
    unitId: "unit3",
    level: "Level 2 — Standard Topic",
    category: "network",
    difficulty: "Core",
    readingTime: "6 min read",
    standard: "RFC 2328 (OSPFv2) / RFC 5340 (OSPFv3)",
    oneLiner: "An open-standard intra-AS Link-State routing protocol using Dijkstra with hierarchical multi-area scaling.",
    quickAnswer: "OSPF is the dominant intra-domain routing protocol for corporate networks. It divides networks into Area 0 (backbone) and non-backbone areas to scale efficiently.",
    whyItMatters: "OSPF provides sub-second convergence, cryptographic authentication, multipath load balancing (ECMP), and scales to thousands of routers across multi-area topologies.",
    infobox: {
      layer: "Layer 3 (Protocol 89 directly over IP)",
      standard: "RFC 2328 (IPv4), RFC 5340 (IPv6)",
      type: "Intra-AS Link-State Protocol",
      keyFormula: "\\text{Cost} = \\frac{\\text{Reference Bandwidth (100 Mbps)}}{\\text{Interface Bandwidth}}",
      prerequisites: ["dijkstra", "link-state-routing"],
      relatedConcepts: ["dijkstra", "bgp", "routing"],
      compareWith: ["bgp"],
      primaryUses: ["Enterprise Campus Networks, Data Center Fabrics, ISP Regional PoPs"]
    },
    sections: {
      overview: `<strong>Open Shortest Path First (OSPF)</strong> is an open-standard Interior Gateway Protocol (IGP) specified in RFC 2328. It runs directly above IP (IP Protocol 89) without requiring UDP or TCP, flooding Link-State Advertisements (LSAs) and executing Dijkstra's SPF algorithm.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Area Hierarchy:</strong> Networks are divided into <strong>Area 0 (Backbone Area)</strong> and peripheral areas (Area 1, Area 2). All non-backbone areas connect through Area 0.</li>
          <li><strong>Router Roles:</strong>
            <ul>
              <li><strong>Internal Router:</strong> All interfaces reside inside a single non-backbone area.</li>
              <li><strong>Area Border Router (ABR):</strong> Connects a non-backbone area to Area 0, summarizing routes.</li>
              <li><strong>Autonomous System Boundary Router (ASBR):</strong> Injects routes from outside protocols (e.g. BGP) into OSPF.</li>
            </ul>
          </li>
          <li><strong>Designated Router (DR):</strong> On broadcast networks (Ethernet), routers elect a DR and BDR to reduce LSA flooding from $O(N^2)$ to $O(N)$.</li>
        </ol>`,
      diagram: `
+-------------------------------------------------------+
|                    AUTONOMOUS SYSTEM                  |
|                                                       |
|               +----------------------+                |
|               |  BACKBONE (AREA 0)   |                |
|               |     Router B1        |                |
|               +----------------------+                |
|                     /          \\                      |
|             (ABR 1)/            \\(ABR 2)              |
|                   v              v                    |
|        +--------------+      +--------------+         |
|        |    AREA 1    |      |    AREA 2    |         |
|        | Internal Rtrs|      | Internal Rtrs|         |
|        +--------------+      +--------------+         |
+-------------------------------------------------------+`,
      technicalDetails: `Key OSPF features:
        <ul class="wiki-bullet-list">
          <li><strong>Security:</strong> All OSPF message exchanges are cryptographically authenticated (MD5 / SHA-256) to prevent rogue routers from poisoning tables.</li>
          <li><strong>Equal-Cost Multi-Path (ECMP):</strong> If multiple paths have the exact same least cost, OSPF load balances traffic across all of them.</li>
          <li><strong>Metric:</strong> $\\text{Cost} = 10^8 / \\text{bandwidth in bps}$. 100 Mbps = 1, 10 Mbps = 10, 1 Gbps = 1 (can be adjusted via reference bandwidth).</li>
        </ul>`,
      workedExample: `In a multi-area network with Area 0, Area 1, and Area 2:
        <br>Routers inside Area 1 flood detailed LSAs only within Area 1. The Area Border Router (ABR 1) summarizes Area 1 prefixes into a single compact route before sending to Area 0, shielding backbone routers from internal link flaps.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Sub-second convergence with fast detection</td><td>Complex configuration and area planning</td></tr>
            <tr><td>Hierarchical areas prevent memory exhaustion</td><td>Requires all non-backbone areas to attach to Area 0</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["University campus networks", "Enterprise corporate LANs and WANs", "Cloud hyper-scaler regional availability zones"],
      commonMistakes: "Forgetting that all OSPF non-backbone areas must connect directly to Area 0. If a non-backbone area cannot physically touch Area 0, a virtual link must be configured.",
      compareWith: { title: "OSPF vs BGP", note: "OSPF is intra-domain (finds fastest path inside one company). BGP is inter-domain (enforces business policies between independent Internet providers)." },
      practice: {
        question: "What is the primary role of an Area Border Router (ABR) in an OSPF network?",
        choices: ["To connect hosts to the switch", "To connect a non-backbone area to Area 0 and summarize routes", "To run BGP on the global Internet", "To assign DHCP IP addresses"],
        correctIndex: 1,
        explanation: "An ABR connects a peripheral OSPF area to the backbone Area 0, summarizing link states to conserve router memory."
      },
      references: [
        { cite: "RFC 2328: OSPF Version 2", url: "https://datatracker.ietf.org/doc/html/rfc2328" },
        { cite: "RFC 5340: OSPF for IPv6", url: "https://datatracker.ietf.org/doc/html/rfc5340" }
      ]
    },
    prevTopicId: "distance-vector",
    nextTopicId: "bgp"
  },

  "bgp": {
    id: "bgp",
    title: "Border Gateway Protocol (BGP-4)",
    unit: "Unit III: Network Layer & Routing",
    unitId: "unit3",
    level: "Level 2 — Standard Topic",
    category: "network",
    difficulty: "Advanced",
    readingTime: "7 min read",
    standard: "RFC 4271 (BGP-4)",
    oneLiner: "The de facto inter-domain path-vector routing protocol connecting Autonomous Systems across the entire global Internet.",
    quickAnswer: "BGP connects the global Internet. It exchanges reachability prefixes between Autonomous Systems (ASes) accompanied by the AS-PATH attribute to enforce business policies and eliminate routing loops.",
    whyItMatters: "BGP is the glue of the Internet. Without BGP, independent network operators (Comcast, AT&T, Google, Vodafone) could not peer with each other or exchange traffic.",
    infobox: {
      layer: "Layer 7 (Runs over TCP Port 179)",
      standard: "RFC 4271, RFC 4760 (Multiprotocol BGP)",
      type: "Inter-AS Path-Vector Protocol",
      keyFormula: "\\text{Loop Prevention: } \\text{Reject if local AS} \\in \\text{AS-PATH}",
      prerequisites: ["distance-vector", "routing"],
      relatedConcepts: ["distance-vector", "ospf", "router"],
      compareWith: ["ospf"],
      primaryUses: ["Global Internet Peering, Multi-Homed Cloud Networks"]
    },
    sections: {
      overview: `The Internet is divided into over 100,000 independently operated networks called <strong>Autonomous Systems (ASes)</strong>. <strong>BGP-4</strong> is the de facto Path-Vector protocol that binds them together. BGP routing decisions are driven primarily by <strong>commercial and political policy</strong> (peering agreements and transit contracts) rather than raw physical distance.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>TCP Transport:</strong> BGP peers establish persistent TCP connections on port 179.</li>
          <li><strong>eBGP vs iBGP:</strong> eBGP (External) runs between routers in different ASes; iBGP (Internal) distributes external routes within the same AS.</li>
          <li><strong>AS-PATH Attribute:</strong> Whenever an AS advertises a prefix, it prepends its Autonomous System Number (ASN). If a router sees its own ASN in the AS-PATH, it discards the route, guaranteeing zero loops!</li>
          <li><strong>Route Selection Policy:</strong> Prioritizes: 1. Highest Local-Preference $\\to$ 2. Shortest AS-PATH $\\to$ 3. Lowest MED $\\to$ 4. Lowest eBGP over iBGP.</li>
        </ol>`,
      diagram: `
+------------+       eBGP Session       +------------+
|   AS 100   |<========================>|   AS 200   |
| (Comcast)  |   Advertise: 1.0.0.0/8   |  (Transit) |
+------------+   AS-PATH: [100]         +------------+
                                               |
                                               | eBGP Session
                                               | AS-PATH: [200, 100]
                                               v
                                        +------------+
                                        |   AS 300   |
                                        |  (Google)  |
                                        +------------+`,
      technicalDetails: `Customer-Provider vs Peering relationships:
        <br>• Customer $\\to$ Provider: Provider transit carries customer traffic anywhere for money.
        <br>• Peer $\\to$ Peer: Two networks exchange traffic destined strictly for each other's customers for free, but will refuse to carry third-party transit traffic for their peer!`,
      workedExample: `Google (AS 15169) advertises prefix \`8.8.8.0/24\` to Level3 (AS 3356).
        <br>Level3 advertises to Vodafone (AS 1273) with attribute: \`AS-PATH: [3356, 15169]\`.
        <br>If an advertisement loops back and AS 15169 sees its own number in the AS-PATH, it immediately drops the advertisement, preventing global routing loops.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Enforces complex economic and business policies</td><td>Slow convergence (can take minutes to converge globally)</td></tr>
            <tr><td>Loop-free path vector tracking via AS-PATH</td><td>Vulnerable to BGP Route Hijacking without RPKI cryptographic filtering</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Global Internet tier-1 transit backbones", "Multi-homed enterprise networks", "Data center BGP EVPN fabrics"],
      commonMistakes: "Assuming BGP chooses the physically shortest path. BGP chooses paths based on business policy: traffic is routed over paid customer links first, settlement-free peer links second, and expensive provider transit links last.",
      compareWith: { title: "BGP vs OSPF", note: "OSPF optimizes for latency and bandwidth within one network. BGP optimizes for business policies and economics between competing networks." },
      practice: {
        question: "How does BGP prevent routing loops when exchanging prefix reachability advertisements?",
        choices: ["Using Dijkstra's algorithm", "Discarding advertisements that contain the receiving router's own AS number in the AS-PATH attribute", "Enforcing 15-hop limits", "Using spanning tree protocol"],
        correctIndex: 1,
        explanation: "If a router receives a route advertisement containing its own Autonomous System Number (ASN) in the AS-PATH, it knows the route has looped and discards it."
      },
      references: [
        { cite: "RFC 4271: A Border Gateway Protocol 4 (BGP-4)", url: "https://datatracker.ietf.org/doc/html/rfc4271" }
      ]
    },
    prevTopicId: "ospf",
    nextTopicId: "sdn"
  },

  "sdn": {
    id: "sdn",
    title: "Software-Defined Networking (SDN)",
    unit: "Unit III: Network Layer & Routing",
    unitId: "unit3",
    level: "Level 1 — Concept Card",
    category: "network",
    difficulty: "Advanced",
    readingTime: "5 min read",
    standard: "ONF OpenFlow / Kurose & Ross Ch 5",
    oneLiner: "A network architecture that decouples the control plane from forwarding hardware, centralizing intelligence in software.",
    quickAnswer: "SDN removes routing intelligence from individual hardware routers, running control logic on a centralized software controller that programs switch flow tables via OpenFlow.",
    whyItMatters: "SDN transformed cloud data centers (Google Andromeda, AWS VPCs), enabling automated network virtualization and dynamic traffic engineering in software.",
    infobox: {
      layer: "Layer 3 (Control & Data Plane)",
      standard: "OpenFlow v1.5 / Open Networking Foundation",
      type: "Programmable Network Architecture",
      keyFormula: "\\text{Match-Plus-Action Flow Rules}",
      prerequisites: ["network-layer", "routing"],
      relatedConcepts: ["routing", "forwarding", "router"],
      compareWith: ["routing"],
      primaryUses: ["Google B4 WAN, Amazon AWS VPCs, Data Center Fabrics"]
    },
    sections: {
      overview: `In traditional networking, each router is an integrated monolithic appliance executing its own control plane software (OSPF, BGP). <strong>Software-Defined Networking (SDN)</strong> radically restructures this by separating the Control Plane from the Data Plane, centralizing routing in software controllers that push flow rules down to dumb, high-speed forwarding switches.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Centralized SDN Controller:</strong> Maintains global network state and executes routing applications (e.g. OpenDaylight, ONOS).</li>
          <li><strong>Southbound API (OpenFlow):</strong> Controller installs forwarding rules into switches using standardized OpenFlow protocols.</li>
          <li><strong>Match-Plus-Action:</strong> Switches inspect arbitrary header fields (L2 MAC, L3 IP, L4 Port) and execute actions: Forward, Drop, Modify, or Enqueue.</li>
          <li><strong>Northbound API:</strong> RESTful APIs allowing network engineers to write business logic applications.</li>
        </ol>`,
      diagram: `
+-------------------------------------------------------------+
|        NETWORK MANAGEMENT APPLICATIONS (Load Balancers)     |
+-------------------------------------------------------------+
                               ^ Northbound REST API
                               v
+-------------------------------------------------------------+
|               CENTRALIZED SDN CONTROLLER                    |
|          Maintains Global Network State Graph               |
+-------------------------------------------------------------+
                               ^ Southbound API (OpenFlow)
                               v
+------------------+                    +------------------+
| DUMB SWITCH 1    |                    | DUMB SWITCH 2    |
| Flow Table:      |                    | Flow Table:      |
| Match -> Action  |                    | Match -> Action  |
+------------------+                    +------------------+`,
      technicalDetails: `Match-Plus-Action generalizes switching:
        <br>A flow table entry matches headers across layers (e.g., \`IP.dst = 10.0.0.5 AND TCP.port = 80\`). Actions include: Forward to port 3, rewrite MAC address, or drop packet. This unifies routers, switches, firewalls, and NAT devices into a single generic forwarding box!`,
      workedExample: `Google deployed SDN in its <strong>B4 Private WAN</strong> connecting data centers across continents. Centralized software optimization boosted fiber link utilization from the industry standard 35% to nearly 100%, saving hundreds of millions of dollars in fiber costs.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Global traffic optimization across all links</td><td>Controller is a single point of failure (requires clustering)</td></tr>
            <tr><td>Programmable APIs eliminate manual CLI configs</td><td>Control channel latency between switches and controller</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Google B4 WAN and Microsoft Azure network virtualization", "Telecommunications 5G core network slicing", "Enterprise SD-WAN"],
      commonMistakes: "Believing SDN implies a single physical computer. In production, the SDN controller is a distributed, fault-tolerant cluster of servers providing a logically centralized view.",
      compareWith: { title: "SDN vs Traditional Routing", note: "Traditional routing uses distributed autonomous algorithms inside each router box. SDN centralizes path planning in software, treating switches as programmable flow execution engines." },
      practice: {
        question: "What is the primary function of an SDN Southbound API like OpenFlow?",
        choices: ["To connect users to web servers", "To communicate flow table rules between the SDN controller and forwarding switches", "To assign domain names to IP addresses", "To encrypt passwords"],
        correctIndex: 1,
        explanation: "Southbound APIs (like OpenFlow) define the protocol used by the centralized controller to program flow table forwarding rules into switches."
      },
      references: [
        { cite: "Kurose & Ross Chapter 5.5: Software-Defined Networking (SDN)", url: "https://gaia.cs.umass.edu/kurose_ross/" },
        { cite: "Jain, S. et al. (2013). B4: Experience with a globally-deployed software defined WAN. ACM SIGCOMM.", url: "https://dl.acm.org/doi/10.1145/2486001.2486019" }
      ]
    },
    prevTopicId: "bgp",
    nextTopicId: "ipv4"
  },

  "ipv4": {
    id: "ipv4",
    title: "IPv4 Addressing & Header (RFC 791)",
    unit: "Unit III: Network Layer & Routing",
    unitId: "unit3",
    level: "Level 2 — Standard Topic",
    category: "network",
    difficulty: "Core",
    readingTime: "6 min read",
    standard: "RFC 791 (Internet Protocol)",
    oneLiner: "The foundational 32-bit connectionless network-layer protocol standardized in RFC 791.",
    quickAnswer: "IPv4 uses 32-bit dotted-decimal addresses (~4.3 billion total) and a 20-to-60 byte header containing TTL, Fragmentation fields, and a header checksum.",
    whyItMatters: "Standardized in 1981, IPv4 is the workhorse of the global Internet, carrying the vast majority of web, mobile, and enterprise traffic today.",
    infobox: {
      layer: "Layer 3 (Network Layer)",
      standard: "RFC 791, RFC 1918",
      type: "Network Protocol",
      keyFormula: "\\text{Address Space} = 2^{32} \\approx 4,294,967,296 \\text{ addresses}",
      prerequisites: ["packet", "network-layer"],
      relatedConcepts: ["ipv6", "nat", "router"],
      compareWith: ["ipv6"],
      primaryUses: ["Global Internet Addressing, Subnetting, Enterprise LANs"]
    },
    sections: {
      overview: `<strong>Internet Protocol version 4 (IPv4)</strong> is the core routing protocol of the Internet. It provides connectionless, best-effort packet delivery across networks, relying on 32-bit addresses conventionally written in dotted-decimal notation (e.g. \`192.168.1.1\`).`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Header Fields:</strong> 20 bytes baseline without options: Version (4), IHL (4 bits), TOS (8 bits), Total Length (16 bits), ID (16 bits), Flags (3 bits), Fragment Offset (13 bits), TTL (8 bits), Protocol (8 bits: 6=TCP, 17=UDP), Checksum (16 bits), Source IP (32 bits), Dest IP (32 bits).</li>
          <li><strong>Time To Live (TTL):</strong> Decremented by 1 at every router hop. When TTL reaches 0, router drops the packet and sends an ICMP Time Exceeded message, preventing packets from looping forever.</li>
          <li><strong>Fragmentation:</strong> When packet exceeds an outgoing link's MTU, the router splits the payload across multiple fragments using ID, Flags, and Offset.</li>
        </ol>`,
      diagram: `
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|Version|  IHL  |Type of Service|          Total Length         |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|         Identification        |Flags|      Fragment Offset    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|  Time to Live |    Protocol   |         Header Checksum       |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                       Source IP Address                       |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Destination IP Address                     |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+`,
      technicalDetails: `Subnetting and CIDR (Classless Inter-Domain Routing):
        <br>An IPv4 address consists of a network prefix and a host identifier. In CIDR notation \`192.168.1.0/24\`, the \`/24\` indicates that the first 24 bits represent the network prefix, leaving $32 - 24 = 8$ bits for hosts ($2^8 - 2 = 254$ usable host IPs).`,
      workedExample: `Subnet: \`172.16.0.0/20\`.
        <br>• Network bits: 20. Host bits: $32 - 20 = 12$.
        <br>• Total addresses: $2^{12} = 4,096$. Usable hosts: $4,096 - 2 = 4,094$.
        <br>• Subnet mask: \`255.255.240.0\`.
        <br>• Broadcast address: \`172.16.15.255\`.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Universal global compatibility across all devices</td><td>Complete address space exhaustion (4.3B IPs)</td></tr>
            <tr><td>Compact 20-byte base header</td><td>Router fragmentation causes performance overhead</td></tr>
            <tr><td>Proven stability over 40+ years</td><td>Checksum must be recomputed at every router hop</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Global Internet hosts and websites", "Home and enterprise local networks", "Public DNS servers (8.8.8.8, 1.1.1.1)"],
      commonMistakes: "Thinking the Internet has run out of private IPs. RFC 1918 private subnets (\`10.0.0.0/8\`, \`172.16.0.0/12\`, \`192.168.0.0/16\`) can be reused across billions of private networks via NAT.",
      compareWith: { title: "IPv4 vs IPv6", note: "IPv4 uses 32-bit addresses and variable headers with router fragmentation. IPv6 uses 128-bit addresses, fixed 40-byte headers, and source-only fragmentation." },
      practice: {
        question: "How many usable host IP addresses are available in a /26 IPv4 subnet?",
        choices: ["64", "62", "30", "126"],
        correctIndex: 1,
        explanation: "A /26 subnet has $32 - 26 = 6$ host bits. Total addresses: $2^6 = 64$. Subtracting network ID and broadcast address yields $64 - 2 = 62$ usable host addresses."
      },
      references: [
        { cite: "RFC 791: Internet Protocol", url: "https://datatracker.ietf.org/doc/html/rfc791" },
        { cite: "RFC 1918: Address Allocation for Private Internets", url: "https://datatracker.ietf.org/doc/html/rfc1918" }
      ]
    },
    prevTopicId: "sdn",
    nextTopicId: "ipv6"
  },

  "ipv6": {
    id: "ipv6",
    title: "IPv6 Architecture (RFC 8200)",
    unit: "Unit III: Network Layer & Routing",
    unitId: "unit3",
    level: "Level 2 — Standard Topic",
    category: "network",
    difficulty: "Core",
    readingTime: "6 min read",
    standard: "RFC 8200 (Internet Standard)",
    oneLiner: "The next-generation IP standard featuring 128-bit addresses, a streamlined fixed 40-byte header, and no router checksum.",
    quickAnswer: "IPv6 expands address space to 128 bits ($3.4 \\times 10^{38}$ IPs), streamlines hardware forwarding with a fixed 40-byte header, and eliminates router fragmentation.",
    whyItMatters: "IPv6 solves IPv4 address exhaustion, restores end-to-end connectivity without NAT, and accelerates line-rate hardware forwarding in mobile 5G and cloud networks.",
    infobox: {
      layer: "Layer 3 (Network Layer)",
      standard: "RFC 8200, RFC 4291",
      type: "Next-Gen Network Protocol",
      keyFormula: "\\text{Address Space} = 2^{128} \\approx 3.4 \\times 10^{38} \\text{ addresses}",
      prerequisites: ["ipv4", "network-layer"],
      relatedConcepts: ["ipv4", "nat", "router"],
      compareWith: ["ipv4"],
      primaryUses: ["5G Cellular Networks, Cloud Hyper-Scalers, IoT Deployments"]
    },
    sections: {
      overview: `Standardized as a full Internet Standard in RFC 8200, <strong>Internet Protocol version 6 (IPv6)</strong> replaces IPv4. In addition to a virtually inexhaustible 128-bit address space, IPv6 was deliberately designed to accelerate hardware routing by fixing the base header size at exactly 40 bytes and removing header checksums.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>128-Bit Addressing:</strong> Written in hexadecimal with colons (e.g. \`2001:0db8:85a3::8a2e:0370:7334\`). Double colons (\`::\`) compress consecutive zero blocks.</li>
          <li><strong>Fixed 40-Byte Base Header:</strong> Eliminates the IPv4 variable IHL field, aligning all field offsets in hardware memory.</li>
          <li><strong>No Router Checksum:</strong> Relying on L2 (CRC) and L4 (TCP/UDP) checksums, IPv6 completely eliminated the Layer-3 checksum, allowing routers to decrement Hop Limit without recalculating hashes.</li>
          <li><strong>Source-Only Fragmentation:</strong> Routers never fragment IPv6 packets. If a packet is too large, the router drops it and sends an ICMPv6 "Packet Too Big" message (Path MTU Discovery).</li>
        </ol>`,
      diagram: `
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|Version| Traffic Class |           Flow Label (20 bits)        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|         Payload Length        |  Next Header  |   Hop Limit   |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                                                               |
+                                                               +
|                                                               |
+                         Source Address                        +
|                           (128 bits)                          |
+                                                               +
|                                                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                                                               |
+                                                               +
|                                                               |
+                      Destination Address                      +
|                           (128 bits)                          |
+                                                               +
|                                                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+`,
      technicalDetails: `Next Header Architecture:
        <br>Instead of variable options inside the base header, IPv6 daisy-chains optional <strong>Extension Headers</strong> (Hop-by-Hop, Routing, Fragment, ESP encryption) between the base header and the upper-layer payload via the \`Next Header\` field. Routers ignore extension headers unless addressed to them.`,
      workedExample: `Address compression example:
        <br>Uncompressed: \`2001:0db8:0000:0000:0000:0000:0000:0001\`
        <br>1. Drop leading zeros: \`2001:db8:0:0:0:0:0:1\`
        <br>2. Compress zero sequence with \`::\`: \`2001:db8::1\`.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>$3.4 \\times 10^{38}$ IPs: enough for every atom on earth</td><td>Not backward-compatible with IPv4 without dual-stack or NAT64</td></tr>
            <tr><td>Fixed 40-byte header accelerates router processing</td><td>Larger header size (40 bytes vs 20 bytes in IPv4)</td></tr>
            <tr><td>Stateless Address Autoconfiguration (SLAAC)</td><td>Legacy enterprise applications lack IPv6 support</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Global mobile cellular carriers (T-Mobile, Jio are 100% IPv6 internally)", "Cloud providers (AWS, Azure, GCP)", "IoT device meshes"],
      commonMistakes: "Thinking IPv6 packets are slower because the header is 40 bytes. IPv6 headers are fixed and omit checksums, allowing routers to forward IPv6 packets significantly faster in hardware silicon.",
      compareWith: { title: "IPv4 vs IPv6", note: "IPv4 uses 32-bit dotted-decimal addresses and router fragmentation. IPv6 uses 128-bit addresses, fixed 40-byte headers, and source-only Path MTU discovery." },
      practice: {
        question: "Why was the header checksum eliminated in the IPv6 header specification?",
        choices: ["To save memory space", "To speed up packet forwarding at intermediate routers", "Because optical fiber never has bit errors", "Because IPv6 encrypts all packets"],
        correctIndex: 1,
        explanation: "Removing the checksum eliminates the requirement for routers to recalculate checksums at every hop when decrementing Hop Limit, significantly accelerating line-rate forwarding."
      },
      references: [
        { cite: "RFC 8200: Internet Protocol, Version 6 (IPv6) Specification", url: "https://datatracker.ietf.org/doc/html/rfc8200" }
      ]
    },
    prevTopicId: "ipv4",
    nextTopicId: "nat"
  },

  "nat": {
    id: "nat",
    title: "Network Address Translation (NAT & NAPT)",
    unit: "Unit III: Network Layer & Routing",
    unitId: "unit3",
    level: "Level 1 — Concept Card",
    category: "network",
    difficulty: "Core",
    readingTime: "5 min read",
    standard: "RFC 3022 / RFC 2663",
    oneLiner: "A method mapping an entire private IP subnet to a single public IP address using port numbers.",
    quickAnswer: "NAT allows hundreds of home or office devices with private IP addresses (RFC 1918) to share a single public IP, translating IP addresses and port numbers on the fly.",
    whyItMatters: "NAT prevented the collapse of the Internet during the 1990s by dramatically slowing IPv4 address exhaustion, though it violates the end-to-end principle.",
    infobox: {
      layer: "Layer 3 & Layer 4 (Boundary Gateway)",
      standard: "RFC 3022 (Traditional NAT), RFC 1918",
      type: "Address Multiplexing Appliance",
      keyFormula: "\\text{Mapping: } (\\text{IP}_{\\text{priv}}, \\text{Port}_{\\text{priv}}) \\iff (\\text{IP}_{\\text{pub}}, \\text{Port}_{\\text{pub}})",
      prerequisites: ["ipv4", "router"],
      relatedConcepts: ["ipv4", "ipv6", "router"],
      compareWith: ["ipv6"],
      primaryUses: ["Residential Wi-Fi Routers, Corporate Firewalls, Carrier-Grade NAT (CGNAT)"]
    },
    sections: {
      overview: `<strong>Network Address Translation (NAT)</strong> enables an entire private local network to connect to the Internet using just one public IP address. Residential and enterprise gateways dynamically rewrite IP headers and port numbers as packets traverse the boundary between private and public address space.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Outbound Packet:</strong> Host \`192.168.1.10:52341\` sends request to public web server \`93.184.216.34:80\`.</li>
          <li><strong>NAT Translation Table:</strong> NAT router swaps source IP to its public IP (\`203.0.113.1\`) and assigns a unique NAT port (\`61001\`). It logs entry: \`(192.168.1.10:52341 $\\iff$ 203.0.113.1:61001)\`.</li>
          <li><strong>Inbound Response:</strong> Web server replies to \`203.0.113.1:61001\`.</li>
          <li><strong>Reverse Translation:</strong> NAT router inspects table, rewrites destination to \`192.168.1.10:52341\`, and forwards into local LAN.</li>
        </ol>`,
      diagram: `
+-----------------------+                    +-----------------------+
|   LOCAL PRIVATE LAN   |                    |    PUBLIC INTERNET    |
| (192.168.1.0/24)      |                    |                       |
|                       |    NAT ROUTER      |                       |
|  PC: 192.168.1.10     |   (203.0.113.1)    |   Web: 93.184.216.34  |
|  Src: 192.168.1.10:5000 ======> [NAT] ======> Src: 203.0.113.1:8000  |
|                       |   NAT Table Entry: |                       |
|                       |   192.168.1.10:5000 <-> 203.0.113.1:8000   |
+-----------------------+                    +-----------------------+`,
      technicalDetails: `Architectural Controversies of NAT:
        <br>1. <strong>Violation of End-to-End Principle:</strong> External clients cannot initiate connections to internal servers behind NAT without manual port forwarding or STUN/TURN hole punching.
        <br>2. <strong>Layer Violation:</strong> Routers (Layer 3) should not inspect or modify transport-layer port numbers (Layer 4).`,
      workedExample: `In a home with 20 connected smart devices, phones, and laptops:
        <br>All 20 devices browse the web concurrently using different local IPs (192.168.1.X). To external web servers, all 20 devices appear to come from the single public IP assigned by the ISP, differentiated purely by the 16-bit port number in the NAT translation table.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Saves scarce IPv4 public addresses</td><td>Breaks P2P applications (VoIP, gaming, BitTorrent)</td></tr>
            <tr><td>Internal network topology is hidden from outsiders</td><td>Port forwarding required to host internal servers</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Home Wi-Fi routers", "Corporate firewalls", "ISP Carrier-Grade NAT (CGNAT)"],
      commonMistakes: "Believing NAT is a security firewall. While NAT naturally drops unsolicited incoming packets, its purpose is address sharing, not cryptographic security or intrusion prevention.",
      compareWith: { title: "NAT vs IPv6", note: "NAT is a workaround for IPv4 address scarcity that breaks end-to-end connectivity. IPv6 eliminates NAT entirely, giving every device a globally unique routable IP." },
      practice: {
        question: "Why does Network Address Translation (NAT) violate the classical Internet end-to-end principle?",
        choices: ["It slows down encryption", "It modifies transport-layer port numbers and prevents external nodes from initiating connections to internal hosts", "It uses too much memory", "It requires fiber cables"],
        correctIndex: 1,
        explanation: "NAT rewrites Layer-4 port numbers and prevents external hosts from directly addressing and initiating connections to internal devices behind the gateway."
      },
      references: [
        { cite: "RFC 3022: Traditional IP Network Address Translator (Traditional NAT)", url: "https://datatracker.ietf.org/doc/html/rfc3022" }
      ]
    },
    prevTopicId: "ipv6",
    nextTopicId: "transport-layer"
  }
};

if (typeof window !== 'undefined') window.TOPICS_U3 = TOPICS_U3;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TOPICS_U3;
}
