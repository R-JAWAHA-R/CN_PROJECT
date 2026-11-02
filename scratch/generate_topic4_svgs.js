const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../assets/images/unit3/topic4-dv-ls-routing');

const svgs = {};

// 1. distance-vector-update.svg
svgs['distance-vector-update.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  <defs>
    <style>
      text { font-family: 'Segoe UI', Arial, sans-serif; }
      .title { font-size: 20px; font-weight: bold; fill: #1e293b; }
      .sub { font-size: 13px; fill: #475569; }
      .math { font-family: 'Cambria Math', 'Times New Roman', serif; font-size: 16px; font-weight: bold; fill: #1e40af; }
      .th { font-size: 11px; font-weight: bold; fill: #ffffff; text-anchor: middle; }
      .td { font-size: 11px; fill: #1e293b; text-anchor: middle; }
    </style>
    <filter id="shadow" x="-2%" y="-2%" width="104%" height="104%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.08"/>
    </filter>
  </defs>

  <rect width="800" height="500" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="400" y="38" text-anchor="middle" class="title">Distance Vector Update &amp; Bellman-Ford Equation</text>
  <text x="400" y="58" text-anchor="middle" class="sub">How a Router Computes Least-Cost Path using Neighbor Vectors</text>

  <!-- Formula Banner -->
  <g transform="translate(60, 80)" filter="url(#shadow)">
    <rect width="680" height="60" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="340" y="27" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af">Bellman-Ford Optimization Equation (Distributed Formulation):</text>
    <text x="340" y="48" text-anchor="middle" class="math">D_x(y) = min_v { c(x, v) + D_v(y) }</text>
  </g>

  <!-- Left: Neighbor Vector Inflow -->
  <g transform="translate(60, 160)" filter="url(#shadow)">
    <rect width="210" height="190" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
    <rect width="210" height="30" rx="8 8 0 0" fill="#2563eb"/>
    <text x="105" y="20" class="th">Received Vector from Neighbor V</text>
    
    <g transform="translate(15, 45)">
      <text x="0" y="20" font-size="11" font-weight="bold" fill="#475569">Link Cost: c(X, V) = 2</text>
      <line x1="0" y1="28" x2="180" y2="28" stroke="#e2e8f0"/>
      <text x="0" y="50" font-size="11" fill="#1e293b">Dest A: D_v(A) = 5 ➔ 2+5 = 7</text>
      <text x="0" y="75" font-size="11" fill="#1e293b">Dest B: D_v(B) = 3 ➔ 2+3 = <tspan font-weight="bold" fill="#059669">5</tspan></text>
      <text x="0" y="100" font-size="11" fill="#1e293b">Dest C: D_v(C) = 8 ➔ 2+8 = 10</text>
      <text x="0" y="125" font-size="11" fill="#1e293b">Dest D: D_v(D) = 1 ➔ 2+1 = <tspan font-weight="bold" fill="#059669">3</tspan></text>
    </g>
  </g>

  <!-- Center Arrow -->
  <g transform="translate(295, 230)">
    <path d="M 0 20 L 70 20" stroke="#059669" stroke-width="3"/>
    <polygon points="70,14 85,20 70,26" fill="#059669"/>
    <text x="42" y="12" text-anchor="middle" font-size="11" font-weight="bold" fill="#059669">EVALUATE</text>
    <text x="42" y="38" text-anchor="middle" font-size="9.5" fill="#475569">Compare vs Old</text>
  </g>

  <!-- Right: Router X Updated Table -->
  <g transform="translate(400, 160)" filter="url(#shadow)">
    <rect width="340" height="190" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
    <rect width="340" height="30" rx="8 8 0 0" fill="#059669"/>
    <text x="170" y="20" class="th">Router X Forwarding Table (Updated)</text>

    <!-- Table Header -->
    <rect x="15" y="40" width="310" height="25" fill="#f1f5f9"/>
    <text x="45" y="56" class="td" font-weight="bold">Dest</text>
    <text x="110" y="56" class="td" font-weight="bold">Old Cost</text>
    <text x="180" y="56" class="td" font-weight="bold">New Cost</text>
    <text x="260" y="56" class="td" font-weight="bold">Next Hop</text>

    <!-- Rows -->
    <g transform="translate(15, 70)">
      <text x="30" y="15" class="td">A</text>
      <text x="95" y="15" class="td">6</text>
      <text x="165" y="15" class="td">6 (No change)</text>
      <text x="245" y="15" class="td">W</text>

      <line x1="0" y1="24" x2="310" y2="24" stroke="#f1f5f9"/>

      <text x="30" y="38" class="td">B</text>
      <text x="95" y="38" class="td">7</text>
      <text x="165" y="38" class="td" font-weight="bold" fill="#059669">5 (Cheaper!)</text>
      <text x="245" y="38" class="td" font-weight="bold" fill="#059669">V</text>

      <line x1="0" y1="47" x2="310" y2="47" stroke="#f1f5f9"/>

      <text x="30" y="61" class="td">C</text>
      <text x="95" y="61" class="td">9</text>
      <text x="165" y="61" class="td">9 (No change)</text>
      <text x="245" y="61" class="td">W</text>

      <line x1="0" y1="70" x2="310" y2="70" stroke="#f1f5f9"/>

      <text x="30" y="84" class="td">D</text>
      <text x="95" y="84" class="td">∞</text>
      <text x="165" y="84" class="td" font-weight="bold" fill="#059669">3 (New route!)</text>
      <text x="245" y="84" class="td" font-weight="bold" fill="#059669">V</text>
    </g>
  </g>

  <!-- Bottom Explanatory Callout -->
  <g transform="translate(60, 370)">
    <rect width="680" height="95" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2" filter="url(#shadow)"/>
    <text x="20" y="24" font-size="13" font-weight="bold" fill="#1e293b">Triggered Update Propagation Rule:</text>
    <text x="20" y="46" font-size="11.5" fill="#334155">1. When Router X discovers an updated minimum cost (Dest B = 5, Dest D = 3), its distance vector changes.</text>
    <text x="20" y="66" font-size="11.5" fill="#334155">2. Router X immediately sends its new distance vector to all of its neighbors (triggered update).</text>
    <text x="20" y="86" font-size="11.5" fill="#64748b">3. Iteration continues until all nodes have matching, stable tables with no further cost changes (convergence reached).</text>
  </g>
</svg>`;

// 2. link-state-concept.svg
svgs['link-state-concept.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  <defs>
    <style>
      text { font-family: 'Segoe UI', Arial, sans-serif; }
      .title { font-size: 20px; font-weight: bold; fill: #1e293b; }
      .sub { font-size: 13px; fill: #475569; }
      .step-t { font-size: 13px; font-weight: bold; fill: #1e40af; }
      .step-d { font-size: 11px; fill: #334155; }
    </style>
    <filter id="shadow" x="-2%" y="-2%" width="104%" height="104%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.08"/>
    </filter>
  </defs>

  <rect width="800" height="500" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="400" y="38" text-anchor="middle" class="title">Link State Routing: The 5-Step Process</text>
  <text x="400" y="58" text-anchor="middle" class="sub">How Every Router Independently Learns Complete Network Topology and Computes Shortest Paths</text>

  <!-- 5 Cards Horizontal Flow -->
  <g transform="translate(30, 95)">
    <!-- Step 1 -->
    <g transform="translate(0, 0)" filter="url(#shadow)">
      <rect width="135" height="240" rx="8" fill="#ffffff" stroke="#3b82f6" stroke-width="1.5"/>
      <rect width="135" height="32" rx="8 8 0 0" fill="#eff6ff"/>
      <circle cx="20" cy="16" r="10" fill="#2563eb"/>
      <text x="20" y="20" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff">1</text>
      <text x="35" y="21" class="step-t">Discover</text>
      <text x="12" y="60" class="step-d" font-weight="bold">Discover Neighbors:</text>
      <text x="12" y="80" class="step-d">Send HELLO packet on every link.</text>
      <text x="12" y="115" class="step-d">Learn immediate neighbor router identities &amp; network addresses.</text>
      <rect x="15" y="180" width="105" height="40" rx="4" fill="#eff6ff"/>
      <text x="67" y="204" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e40af">HELLO Packet</text>
    </g>

    <!-- Step 2 -->
    <g transform="translate(150, 0)" filter="url(#shadow)">
      <rect width="135" height="240" rx="8" fill="#ffffff" stroke="#059669" stroke-width="1.5"/>
      <rect width="135" height="32" rx="8 8 0 0" fill="#ecfdf5"/>
      <circle cx="20" cy="16" r="10" fill="#059669"/>
      <text x="20" y="20" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff">2</text>
      <text x="35" y="21" class="step-t" fill="#047857">Measure</text>
      <text x="12" y="60" class="step-d" font-weight="bold">Measure Link Cost:</text>
      <text x="12" y="80" class="step-d">Send ECHO packet.</text>
      <text x="12" y="115" class="step-d">Calculate Round-Trip Time (RTT) or assign administrative bandwidth metric.</text>
      <rect x="15" y="180" width="105" height="40" rx="4" fill="#ecfdf5"/>
      <text x="67" y="204" text-anchor="middle" font-size="10" font-weight="bold" fill="#065f46">ECHO / Delay</text>
    </g>

    <!-- Step 3 -->
    <g transform="translate(300, 0)" filter="url(#shadow)">
      <rect width="135" height="240" rx="8" fill="#ffffff" stroke="#d97706" stroke-width="1.5"/>
      <rect width="135" height="32" rx="8 8 0 0" fill="#fffbeb"/>
      <circle cx="20" cy="16" r="10" fill="#d97706"/>
      <text x="20" y="20" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff">3</text>
      <text x="35" y="21" class="step-t" fill="#b45309">Build LSP</text>
      <text x="12" y="60" class="step-d" font-weight="bold">Construct LSP:</text>
      <text x="12" y="80" class="step-d">Build Link State Packet containing:</text>
      <text x="12" y="105" class="step-d">• Router ID</text>
      <text x="12" y="125" class="step-d">• Seq Number</text>
      <text x="12" y="145" class="step-d">• (Neighbor, Cost)</text>
      <rect x="15" y="180" width="105" height="40" rx="4" fill="#fef3c7"/>
      <text x="67" y="204" text-anchor="middle" font-size="10" font-weight="bold" fill="#92400e">Build LSP</text>
    </g>

    <!-- Step 4 -->
    <g transform="translate(450, 0)" filter="url(#shadow)">
      <rect width="135" height="240" rx="8" fill="#ffffff" stroke="#7c3aed" stroke-width="1.5"/>
      <rect width="135" height="32" rx="8 8 0 0" fill="#f5f3ff"/>
      <circle cx="20" cy="16" r="10" fill="#7c3aed"/>
      <text x="20" y="20" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff">4</text>
      <text x="35" y="21" class="step-t" fill="#6d28d9">Flood LSP</text>
      <text x="12" y="60" class="step-d" font-weight="bold">Reliable Flooding:</text>
      <text x="12" y="80" class="step-d">Broadcast LSP to all interfaces.</text>
      <text x="12" y="115" class="step-d">Routers acknowledge and reflood to guarantee identical LSDB globally.</text>
      <rect x="15" y="180" width="105" height="40" rx="4" fill="#ede9fe"/>
      <text x="67" y="204" text-anchor="middle" font-size="10" font-weight="bold" fill="#5b21b6">Flood All</text>
    </g>

    <!-- Step 5 -->
    <g transform="translate(600, 0)" filter="url(#shadow)">
      <rect width="135" height="240" rx="8" fill="#ffffff" stroke="#dc2626" stroke-width="1.5"/>
      <rect width="135" height="32" rx="8 8 0 0" fill="#fef2f2"/>
      <circle cx="20" cy="16" r="10" fill="#dc2626"/>
      <text x="20" y="20" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff">5</text>
      <text x="35" y="21" class="step-t" fill="#b91c1c">Dijkstra</text>
      <text x="12" y="60" class="step-d" font-weight="bold">Compute Paths:</text>
      <text x="12" y="80" class="step-d">Run Dijkstra's SPF Algorithm locally on complete topology graph.</text>
      <text x="12" y="130" class="step-d">Populate forwarding table with optimal next hops.</text>
      <rect x="15" y="180" width="105" height="40" rx="4" fill="#fee2e2"/>
      <text x="67" y="204" text-anchor="middle" font-size="10" font-weight="bold" fill="#991b1b">SPF Tree</text>
    </g>
  </g>

  <!-- Contrast Callout -->
  <g transform="translate(30, 360)">
    <rect width="740" height="95" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2" filter="url(#shadow)"/>
    <text x="20" y="25" font-size="13" font-weight="bold" fill="#1e293b">Key Difference from Distance Vector:</text>
    <text x="20" y="48" font-size="11.5" fill="#334155"><tspan font-weight="bold" fill="#2563eb">Link State (Global):</tspan> "Tell everybody about your immediate neighbors" ➔ Each router has a 100% complete, identical map of the entire network.</text>
    <text x="20" y="70" font-size="11.5" fill="#334155"><tspan font-weight="bold" fill="#ea580c">Distance Vector (Decentralized):</tspan> "Tell your immediate neighbors about the whole world" ➔ Routers only know estimated distances from neighbors ("routing by rumor").</text>
  </g>
</svg>`;

// 3. link-state-packet.svg
svgs['link-state-packet.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  <defs>
    <style>
      text { font-family: 'Segoe UI', Arial, sans-serif; }
      .title { font-size: 20px; font-weight: bold; fill: #1e293b; }
      .sub { font-size: 13px; fill: #475569; }
      .hdr { font-size: 12px; font-weight: bold; fill: #ffffff; text-anchor: middle; }
    </style>
    <filter id="shadow" x="-2%" y="-2%" width="104%" height="104%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.08"/>
    </filter>
  </defs>

  <rect width="800" height="500" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="400" y="38" text-anchor="middle" class="title">Link State Packet (LSP) Internal Structure</text>
  <text x="400" y="58" text-anchor="middle" class="sub">Header Fields &amp; Neighbor Adjacency Records Flooded by Each Router</text>

  <!-- Left: Packet Structure Layout -->
  <g transform="translate(60, 95)" filter="url(#shadow)">
    <!-- Base Outer Box -->
    <rect width="320" height="340" rx="8" fill="#ffffff" stroke="#3b82f6" stroke-width="2"/>
    <rect width="320" height="36" rx="8 8 0 0" fill="#1e40af"/>
    <text x="160" y="24" class="hdr" font-size="14">Link State Packet (LSP) Layout</text>

    <!-- Source ID Field -->
    <g transform="translate(15, 50)">
      <rect width="290" height="42" rx="4" fill="#2563eb"/>
      <text x="145" y="22" class="hdr">Source Router ID (e.g. Router A / 192.168.1.1)</text>
      <text x="145" y="36" class="hdr" font-size="9" fill="#bfdbfe">Originating Node Identifier</text>
    </g>

    <!-- Sequence Number Field -->
    <g transform="translate(15, 100)">
      <rect width="290" height="42" rx="4" fill="#0284c7"/>
      <text x="145" y="22" class="hdr">Sequence Number (32-bit Integer)</text>
      <text x="145" y="36" class="hdr" font-size="9" fill="#bae6fd">Detects duplicates &amp; out-of-order packets</text>
    </g>

    <!-- Age Field -->
    <g transform="translate(15, 150)">
      <rect width="290" height="42" rx="4" fill="#0d9488"/>
      <text x="145" y="22" class="hdr">Age / TTL (Time To Live in Seconds)</text>
      <text x="145" y="36" class="hdr" font-size="9" fill="#99f6e4">Decrements every second; purged at zero</text>
    </g>

    <!-- Neighbor Array Header -->
    <g transform="translate(15, 200)">
      <rect width="290" height="125" rx="4" fill="#f8fafc" stroke="#cbd5e1"/>
      <text x="145" y="22" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">List of Directly Connected Links:</text>
      
      <!-- Entry 1 -->
      <rect x="10" y="32" width="270" height="26" rx="3" fill="#ecfdf5" stroke="#10b981"/>
      <text x="20" y="49" font-size="11" font-weight="bold" fill="#047857">Neighbor: Router B | Link Cost: 4</text>

      <!-- Entry 2 -->
      <rect x="10" y="62" width="270" height="26" rx="3" fill="#ecfdf5" stroke="#10b981"/>
      <text x="20" y="79" font-size="11" font-weight="bold" fill="#047857">Neighbor: Router C | Link Cost: 2</text>

      <!-- Entry 3 -->
      <rect x="10" y="92" width="270" height="26" rx="3" fill="#ecfdf5" stroke="#10b981"/>
      <text x="20" y="109" font-size="11" font-weight="bold" fill="#047857">Neighbor: Router E | Link Cost: 6</text>
    </g>
  </g>

  <!-- Right: Field Functions Detail Cards -->
  <g transform="translate(420, 95)">
    <!-- Sequence Number Role -->
    <g transform="translate(0, 0)" filter="url(#shadow)">
      <rect width="320" height="100" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
      <text x="18" y="25" font-size="13" font-weight="bold" fill="#0284c7">1. Sequence Number Wrapping:</text>
      <text x="18" y="48" font-size="11.5" fill="#334155">32-bit counter incremented with each new update. If a router receives an LSP with a sequence number ≤ one already in database, it is discarded as duplicate.</text>
      <text x="18" y="85" font-size="10.5" fill="#64748b">Prevents infinite flooding loops across network cycles.</text>
    </g>

    <!-- Age Field Role -->
    <g transform="translate(0, 115)" filter="url(#shadow)">
      <rect width="320" height="100" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
      <text x="18" y="25" font-size="13" font-weight="bold" fill="#0d9488">2. Aging &amp; Crash Recovery:</text>
      <text x="18" y="48" font-size="11.5" fill="#334155">Age field starts at 60 (or 3600s in OSPF) and decrements at each hop and every second in memory.</text>
      <text x="18" y="85" font-size="10.5" fill="#64748b">When Age reaches 0, router flushes obsolete link state from LSDB.</text>
    </g>

    <!-- Acknowledgement & Retransmit -->
    <g transform="translate(0, 230)" filter="url(#shadow)">
      <rect width="320" height="105" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
      <text x="18" y="25" font-size="13" font-weight="bold" fill="#1e40af">3. Reliable Transmission:</text>
      <text x="18" y="48" font-size="11.5" fill="#334155">LSPs are acknowledged explicitly (ACK flag / Link State Ack). Unacknowledged packets are retransmitted to ensure 100% synchronized topological state.</text>
      <text x="18" y="90" font-size="10.5" fill="#059669" font-weight="bold">Result: Consistent global Link State Database (LSDB)</text>
    </g>
  </g>

  <!-- Bottom note -->
  <text x="400" y="465" text-anchor="middle" font-size="11.5" fill="#64748b">OSPF Type 1 (Router LSA) and IS-IS LSP both implement this standardized architecture.</text>
</svg>`;

// 4. ospf-areas.svg
svgs['ospf-areas.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  <defs>
    <style>
      text { font-family: 'Segoe UI', Arial, sans-serif; }
      .title { font-size: 20px; font-weight: bold; fill: #1e293b; }
      .sub { font-size: 13px; fill: #475569; }
      .area-t { font-size: 14px; font-weight: bold; fill: #1e40af; text-anchor: middle; }
      .r-label { font-size: 10px; font-weight: bold; fill: #ffffff; text-anchor: middle; }
    </style>
    <filter id="shadow" x="-2%" y="-2%" width="104%" height="104%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.08"/>
    </filter>
  </defs>

  <rect width="800" height="500" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="400" y="35" text-anchor="middle" class="title">OSPF Hierarchical Routing: Area 0 Backbone &amp; Sub-Areas</text>
  <text x="400" y="55" text-anchor="middle" class="sub">Restricting Link-State Flooding within Areas to Scale to Thousands of Routers</text>

  <!-- Central Backbone: Area 0 -->
  <g transform="translate(240, 85)" filter="url(#shadow)">
    <rect width="320" height="150" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
    <text x="160" y="28" class="area-t">Backbone Area 0 (0.0.0.0)</text>
    <text x="160" y="46" text-anchor="middle" font-size="11" fill="#3b82f6">Core Transit Hub: All inter-area traffic must traverse Area 0</text>

    <!-- Backbone Internal Router -->
    <circle cx="160" cy="95" r="24" fill="#1e40af"/>
    <text x="160" y="93" class="r-label">Backbone</text>
    <text x="160" y="105" class="r-label">Router BR</text>

    <!-- Area Border Routers (ABRs) on perimeters -->
    <!-- Left ABR -->
    <rect x="-18" y="70" width="45" height="50" rx="6" fill="#ea580c"/>
    <text x="4" y="92" class="r-label">ABR 1</text>
    <text x="4" y="105" text-anchor="middle" font-size="8" fill="#ffedd5">Area 0/1</text>

    <!-- Right ABR -->
    <rect x="295" y="70" width="45" height="50" rx="6" fill="#ea580c"/>
    <text x="317" y="92" class="r-label">ABR 2</text>
    <text x="317" y="105" text-anchor="middle" font-size="8" fill="#ffedd5">Area 0/2</text>

    <!-- Bottom ASBR -->
    <rect x="135" y="130" width="50" height="35" rx="6" fill="#7c3aed"/>
    <text x="160" y="147" class="r-label">ASBR</text>
    <text x="160" y="158" text-anchor="middle" font-size="7.5" fill="#ede9fe">BGP Gateway</text>
  </g>

  <!-- Left: Area 1 (Standard Area) -->
  <g transform="translate(40, 270)" filter="url(#shadow)">
    <rect width="210" height="135" rx="8" fill="#ecfdf5" stroke="#10b981" stroke-width="1.8"/>
    <text x="105" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#047857">Area 1 (Standard)</text>
    <text x="105" y="42" text-anchor="middle" font-size="10.5" fill="#059669">Local LSPs isolated within Area 1</text>

    <circle cx="60" cy="85" r="20" fill="#059669"/>
    <text x="60" y="88" class="r-label">R1</text>

    <circle cx="150" cy="85" r="20" fill="#059669"/>
    <text x="150" y="88" class="r-label">R2</text>
    <line x1="80" y1="85" x2="130" y2="85" stroke="#10b981" stroke-width="2"/>
  </g>

  <!-- Right: Area 2 (Stub / Branch Area) -->
  <g transform="translate(550, 270)" filter="url(#shadow)">
    <rect width="210" height="135" rx="8" fill="#fdf4ff" stroke="#c026d3" stroke-width="1.8"/>
    <text x="105" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#86198f">Area 2 (Stub Area)</text>
    <text x="105" y="42" text-anchor="middle" font-size="10.5" fill="#a21caf">Uses default route for external traffic</text>

    <circle cx="60" cy="85" r="20" fill="#9333ea"/>
    <text x="60" y="88" class="r-label">R3</text>

    <circle cx="150" cy="85" r="20" fill="#9333ea"/>
    <text x="150" y="88" class="r-label">R4</text>
    <line x1="80" y1="85" x2="130" y2="85" stroke="#c026d3" stroke-width="2"/>
  </g>

  <!-- External Autonomous System (BGP) -->
  <g transform="translate(300, 310)">
    <rect width="200" height="95" rx="8" fill="#f1f5f9" stroke="#64748b" stroke-dasharray="6,4"/>
    <text x="100" y="24" text-anchor="middle" font-size="12" font-weight="bold" fill="#334155">External AS (Internet / BGP)</text>
    <text x="100" y="44" text-anchor="middle" font-size="10" fill="#64748b">Injected via ASBR as Type 5 LSA</text>
    <line x1="100" y1="0" x2="100" y2="-20" stroke="#7c3aed" stroke-width="2"/>
  </g>

  <!-- Connectors to ABRs -->
  <line x1="145" y1="270" x2="230" y2="190" stroke="#ea580c" stroke-width="2"/>
  <line x1="655" y1="270" x2="570" y2="190" stroke="#ea580c" stroke-width="2"/>

  <!-- Router Roles Summary Legend -->
  <g transform="translate(40, 430)">
    <rect width="720" height="45" rx="6" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="20" y="27" font-size="11.5" fill="#334155">
      <tspan font-weight="bold" fill="#1e40af">IR:</tspan> Internal Router | 
      <tspan font-weight="bold" fill="#ea580c">ABR:</tspan> Area Border Router (summarizes topology between areas) | 
      <tspan font-weight="bold" fill="#7c3aed">ASBR:</tspan> Autonomous System Boundary Router | 
      <tspan font-weight="bold" fill="#047857">Benefit:</tspan> SPF recalculation limited to affected area!
    </text>
  </g>
</svg>`;

// 5. routing-table-update-process.svg
svgs['routing-table-update-process.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  <defs>
    <style>
      text { font-family: 'Segoe UI', Arial, sans-serif; }
      .title { font-size: 20px; font-weight: bold; fill: #1e293b; }
      .sub { font-size: 13px; fill: #475569; }
      .step-hdr { font-size: 13px; font-weight: bold; fill: #ffffff; text-anchor: middle; }
      .desc { font-size: 11px; fill: #334155; }
    </style>
    <filter id="shadow" x="-2%" y="-2%" width="104%" height="104%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.08"/>
    </filter>
  </defs>

  <rect width="800" height="500" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="400" y="38" text-anchor="middle" class="title">Dynamic Routing Table Update Lifecycle</text>
  <text x="400" y="58" text-anchor="middle" class="sub">From Network Topology Event to Synchronized Forwarding Information Base (FIB)</text>

  <!-- 4 Step Flowchart -->
  <g transform="translate(40, 95)">
    <!-- Stage 1 -->
    <g transform="translate(0, 0)" filter="url(#shadow)">
      <rect width="165" height="240" rx="8" fill="#ffffff" stroke="#dc2626" stroke-width="1.5"/>
      <rect width="165" height="34" rx="8 8 0 0" fill="#dc2626"/>
      <text x="82" y="22" class="step-hdr">1. Event Detection</text>
      <g transform="translate(15, 50)">
        <text x="0" y="15" class="desc" font-weight="bold" fill="#b91c1c">Triggers:</text>
        <text x="0" y="35" class="desc">• Physical Link Down</text>
        <text x="0" y="55" class="desc">• Missed HELLO keepalives</text>
        <text x="0" y="75" class="desc">• Cost metric reconfigured</text>
        <text x="0" y="95" class="desc">• New interface added</text>
        <rect x="0" y="120" width="135" height="45" rx="4" fill="#fee2e2"/>
        <text x="67" y="142" text-anchor="middle" font-size="10" font-weight="bold" fill="#991b1b">Timer / Interrupt</text>
        <text x="67" y="155" text-anchor="middle" font-size="9" fill="#991b1b">&lt; 50ms Detection</text>
      </g>
    </g>

    <!-- Arrow 1 to 2 -->
    <polygon points="172,210 182,215 172,220" fill="#64748b"/>
    <line x1="165" y1="215" x2="182" y2="215" stroke="#64748b" stroke-width="2"/>

    <!-- Stage 2 -->
    <g transform="translate(185, 0)" filter="url(#shadow)">
      <rect width="165" height="240" rx="8" fill="#ffffff" stroke="#d97706" stroke-width="1.5"/>
      <rect width="165" height="34" rx="8 8 0 0" fill="#d97706"/>
      <text x="82" y="22" class="step-hdr">2. Notification</text>
      <g transform="translate(15, 50)">
        <text x="0" y="15" class="desc" font-weight="bold" fill="#b45309">Message Flood:</text>
        <text x="0" y="35" class="desc">• DV: Triggered update</text>
        <text x="0" y="55" class="desc">• LS: Flood new LSP/LSA</text>
        <text x="0" y="75" class="desc">• Multicast to neighbors</text>
        <text x="0" y="95" class="desc">• Acknowledgments sent</text>
        <rect x="0" y="120" width="135" height="45" rx="4" fill="#fef3c7"/>
        <text x="67" y="142" text-anchor="middle" font-size="10" font-weight="bold" fill="#92400e">Triggered Update</text>
        <text x="67" y="155" text-anchor="middle" font-size="9" fill="#92400e">Immediate Broadcast</text>
      </g>
    </g>

    <!-- Arrow 2 to 3 -->
    <polygon points="357,210 367,215 357,220" fill="#64748b"/>
    <line x1="350" y1="215" x2="367" y2="215" stroke="#64748b" stroke-width="2"/>

    <!-- Stage 3 -->
    <g transform="translate(370, 0)" filter="url(#shadow)">
      <rect width="165" height="240" rx="8" fill="#ffffff" stroke="#2563eb" stroke-width="1.5"/>
      <rect width="165" height="34" rx="8 8 0 0" fill="#2563eb"/>
      <text x="82" y="22" class="step-hdr">3. Path Recalculation</text>
      <g transform="translate(15, 50)">
        <text x="0" y="15" class="desc" font-weight="bold" fill="#1e40af">Algorithm Execution:</text>
        <text x="0" y="35" class="desc">• DV: Bellman-Ford pass</text>
        <text x="0" y="55" class="desc">• LS: Run Dijkstra SPF</text>
        <text x="0" y="75" class="desc">• Select best metric</text>
        <text x="0" y="95" class="desc">• Resolve backup routes</text>
        <rect x="0" y="120" width="135" height="45" rx="4" fill="#eff6ff"/>
        <text x="67" y="142" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e40af">Route Computation</text>
        <text x="67" y="155" text-anchor="middle" font-size="9" fill="#1e40af">CPU Algorithm Run</text>
      </g>
    </g>

    <!-- Arrow 3 to 4 -->
    <polygon points="542,210 552,215 542,220" fill="#64748b"/>
    <line x1="535" y1="215" x2="552" y2="215" stroke="#64748b" stroke-width="2"/>

    <!-- Stage 4 -->
    <g transform="translate(555, 0)" filter="url(#shadow)">
      <rect width="165" height="240" rx="8" fill="#ffffff" stroke="#059669" stroke-width="1.5"/>
      <rect width="165" height="34" rx="8 8 0 0" fill="#059669"/>
      <text x="82" y="22" class="step-hdr">4. FIB Hardware Update</text>
      <g transform="translate(15, 50)">
        <text x="0" y="15" class="desc" font-weight="bold" fill="#047857">Forwarding State:</text>
        <text x="0" y="35" class="desc">• Install routes into RIB</text>
        <text x="0" y="55" class="desc">• Push to hardware FIB</text>
        <text x="0" y="75" class="desc">• TCAM ASIC updated</text>
        <text x="0" y="95" class="desc">• Packets take new path</text>
        <rect x="0" y="120" width="135" height="45" rx="4" fill="#ecfdf5"/>
        <text x="67" y="142" text-anchor="middle" font-size="10" font-weight="bold" fill="#065f46">ASIC / TCAM</text>
        <text x="67" y="155" text-anchor="middle" font-size="9" fill="#065f46">Wire-Speed Forwarding</text>
      </g>
    </g>
  </g>

  <!-- Convergence Definition Footer -->
  <g transform="translate(40, 360)">
    <rect width="720" height="95" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2" filter="url(#shadow)"/>
    <text x="20" y="25" font-size="13" font-weight="bold" fill="#1e293b">Network Convergence Time:</text>
    <text x="20" y="48" font-size="11.5" fill="#334155"><tspan font-weight="bold">Convergence Time = Detection Time + Flooding Propagation + Algorithm Run Time + FIB Hardware Update</tspan></text>
    <text x="20" y="70" font-size="11.5" fill="#334155">During convergence, temporary routing loops or black holes can exist. Fast convergence protocols (OSPF sub-second, BFD) minimize packet loss during failures.</text>
  </g>
</svg>`;

// 6. dv-vs-ls-comparison.svg
svgs['dv-vs-ls-comparison.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  <defs>
    <style>
      text { font-family: 'Segoe UI', Arial, sans-serif; }
      .title { font-size: 20px; font-weight: bold; fill: #1e293b; }
      .sub { font-size: 13px; fill: #475569; }
      .hdr { font-size: 13px; font-weight: bold; fill: #ffffff; text-anchor: middle; }
      .crit { font-size: 11.5px; font-weight: bold; fill: #1e293b; }
      .dv { font-size: 11px; fill: #1e40af; }
      .ls { font-size: 11px; fill: #065f46; }
    </style>
    <filter id="shadow" x="-2%" y="-2%" width="104%" height="104%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.08"/>
    </filter>
  </defs>

  <rect width="800" height="500" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="400" y="35" text-anchor="middle" class="title">Distance Vector vs. Link State Routing</text>
  <text x="400" y="55" text-anchor="middle" class="sub">Head-to-Head Comparison Across Key Networking Dimensions</text>

  <!-- Table -->
  <g transform="translate(35, 75)" filter="url(#shadow)">
    <!-- Header -->
    <rect x="0" y="0" width="190" height="36" rx="6 0 0 0" fill="#334155"/>
    <text x="95" y="23" class="hdr">Comparison Factor</text>

    <rect x="190" y="0" width="270" height="36" fill="#2563eb"/>
    <text x="325" y="23" class="hdr">Distance Vector (e.g. RIP)</text>

    <rect x="460" y="0" width="270" height="36" rx="0 6 0 0" fill="#059669"/>
    <text x="595" y="23" class="hdr">Link State (e.g. OSPF, IS-IS)</text>

    <!-- Row 1 -->
    <g transform="translate(0, 36)">
      <rect width="730" height="34" fill="#ffffff"/>
      <text x="15" y="21" class="crit">Topology Knowledge</text>
      <text x="205" y="21" class="dv">Local view only (distance to destinations via neighbors)</text>
      <text x="475" y="21" class="ls">Global view (identical entire network map in LSDB)</text>
    </g>

    <!-- Row 2 -->
    <g transform="translate(0, 70)">
      <rect width="730" height="34" fill="#f8fafc"/>
      <text x="15" y="21" class="crit">Core Algorithm</text>
      <text x="205" y="21" class="dv">Distributed Bellman-Ford / Ford-Fulkerson</text>
      <text x="475" y="21" class="ls">Dijkstra's Shortest Path First (SPF)</text>
    </g>

    <!-- Row 3 -->
    <g transform="translate(0, 104)">
      <rect width="730" height="34" fill="#ffffff"/>
      <text x="15" y="21" class="crit">Convergence Speed</text>
      <text x="205" y="21" class="dv">Slow (prone to Count-to-Infinity &amp; routing loops)</text>
      <text x="475" y="21" class="ls">Very Fast (typically sub-second convergence)</text>
    </g>

    <!-- Row 4 -->
    <g transform="translate(0, 138)">
      <rect width="730" height="34" fill="#f8fafc"/>
      <text x="15" y="21" class="crit">Update Transmission</text>
      <text x="205" y="21" class="dv">Periodic full table broadcast to immediate neighbors</text>
      <text x="475" y="21" class="ls">Event-driven incremental LSPs flooded to all nodes</text>
    </g>

    <!-- Row 5 -->
    <g transform="translate(0, 172)">
      <rect width="730" height="34" fill="#ffffff"/>
      <text x="15" y="21" class="crit">Bandwidth Overhead</text>
      <text x="205" y="21" class="dv">High steady-state overhead (sends entire table)</text>
      <text x="475" y="21" class="ls">Low steady-state overhead (only HELLO + on changes)</text>
    </g>

    <!-- Row 6 -->
    <g transform="translate(0, 206)">
      <rect width="730" height="34" fill="#f8fafc"/>
      <text x="15" y="21" class="crit">Memory &amp; CPU Usage</text>
      <text x="205" y="21" class="dv">Minimal (stores only neighbor distance vectors)</text>
      <text x="475" y="21" class="ls">Higher (stores complete graph, runs O(N log N) SPF)</text>
    </g>

    <!-- Row 7 -->
    <g transform="translate(0, 240)">
      <rect width="730" height="34" fill="#ffffff"/>
      <text x="15" y="21" class="crit">Scalability Limit</text>
      <text x="205" y="21" class="dv">Small networks (e.g. RIP limited to 15 hops)</text>
      <text x="475" y="21" class="ls">Very Large (hierarchical multi-area scaling)</text>
    </g>

    <!-- Row 8 -->
    <g transform="translate(0, 274)">
      <rect width="730" height="34" fill="#f8fafc"/>
      <text x="15" y="21" class="crit">Traffic Metric</text>
      <text x="205" y="21" class="dv">Usually simple Hop Count</text>
      <text x="475" y="21" class="ls">Configurable Link Cost based on Interface Bandwidth</text>
    </g>

    <!-- Row 9 -->
    <g transform="translate(0, 308)">
      <rect width="730" height="34" rx="0 0 6 6" fill="#ffffff"/>
      <text x="15" y="21" class="crit">Typical Protocols</text>
      <text x="205" y="21" class="dv" font-weight="bold">RIP v1/v2, RIPng, IGRP</text>
      <text x="475" y="21" class="ls" font-weight="bold">OSPF v2/v3, IS-IS</text>
    </g>
  </g>

  <!-- Summary Bottom Banner -->
  <text x="400" y="465" text-anchor="middle" font-size="12" fill="#475569">Hybrid protocol note: EIGRP (Cisco) combines Distance Vector simplicity with Link State fast convergence via DUAL algorithm.</text>
</svg>`;

// 7. count-to-infinity.svg
svgs['count-to-infinity.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  <defs>
    <style>
      text { font-family: 'Segoe UI', Arial, sans-serif; }
      .title { font-size: 20px; font-weight: bold; fill: #1e293b; }
      .sub { font-size: 13px; fill: #475569; }
      .step-t { font-size: 11px; font-weight: bold; fill: #ffffff; text-anchor: middle; }
      .state { font-size: 11px; font-weight: bold; fill: #1e293b; }
    </style>
    <filter id="shadow" x="-2%" y="-2%" width="104%" height="104%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.08"/>
    </filter>
  </defs>

  <rect width="800" height="500" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="400" y="38" text-anchor="middle" class="title">The Count-to-Infinity Problem in Distance Vector</text>
  <text x="400" y="58" text-anchor="middle" class="sub">How Bad News Propagates Slowly Due to Mutual Routing Loops</text>

  <!-- Topology Diagram -->
  <g transform="translate(180, 85)" filter="url(#shadow)">
    <rect width="440" height="65" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
    <text x="220" y="20" text-anchor="middle" font-size="12" font-weight="bold" fill="#475569">Network Topology: Link A-B Fails!</text>
    
    <!-- Router A (Down) -->
    <circle cx="50" cy="42" r="18" fill="#dc2626"/>
    <text x="50" y="46" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">A</text>

    <!-- Failed Link -->
    <line x1="70" y1="42" x2="190" y2="42" stroke="#dc2626" stroke-width="3" stroke-dasharray="6,4"/>
    <text x="130" y="36" text-anchor="middle" font-size="14" font-weight="bold" fill="#dc2626">✕ LINK DOWN</text>

    <!-- Router B -->
    <circle cx="220" cy="42" r="18" fill="#2563eb"/>
    <text x="220" y="46" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">B</text>

    <!-- Working Link -->
    <line x1="240" y1="42" x2="370" y2="42" stroke="#059669" stroke-width="3"/>
    <text x="305" y="36" text-anchor="middle" font-size="10" font-weight="bold" fill="#059669">cost = 1</text>

    <!-- Router C -->
    <circle cx="390" cy="42" r="18" fill="#2563eb"/>
    <text x="390" y="46" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">C</text>
  </g>

  <!-- Step By Step Counting Evolution -->
  <g transform="translate(60, 165)" filter="url(#shadow)">
    <rect width="680" height="205" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
    <rect width="680" height="30" rx="8 8 0 0" fill="#1e293b"/>
    <text x="80" y="20" class="step-t">Timeline / Round</text>
    <text x="220" y="20" class="step-t">Router B Belief (to A)</text>
    <text x="380" y="20" class="step-t">Router C Belief (to A)</text>
    <text x="550" y="20" class="step-t">System Diagnosis</text>

    <!-- Initial State -->
    <g transform="translate(0, 32)">
      <rect width="680" height="32" fill="#eff6ff"/>
      <text x="40" y="21" class="state" fill="#1e40af">Initial (Normal)</text>
      <text x="220" y="21" class="state" text-anchor="middle">Cost = 1, via A</text>
      <text x="380" y="21" class="state" text-anchor="middle">Cost = 2, via B</text>
      <text x="550" y="21" font-size="11" fill="#059669" text-anchor="middle">✓ Optimal paths</text>
    </g>

    <!-- Round 1: Link fails -->
    <g transform="translate(0, 66)">
      <rect width="680" height="32" fill="#ffffff"/>
      <text x="40" y="21" class="state" fill="#dc2626">Round 1 (Failure)</text>
      <text x="220" y="21" class="state" text-anchor="middle" fill="#dc2626">Thinks: C knows path (cost 2) ➔ 1+2 = 3</text>
      <text x="380" y="21" class="state" text-anchor="middle">Still has Cost = 2 via B</text>
      <text x="550" y="21" font-size="11" fill="#ea580c" text-anchor="middle">⚠ Loop created! B ➔ C ➔ B</text>
    </g>

    <!-- Round 2 -->
    <g transform="translate(0, 100)">
      <rect width="680" height="32" fill="#fff7ed"/>
      <text x="40" y="21" class="state">Round 2</text>
      <text x="220" y="21" class="state" text-anchor="middle">Cost = 3, via C</text>
      <text x="380" y="21" class="state" text-anchor="middle" fill="#ea580c">Receives B's update ➔ 1+3 = 4</text>
      <text x="550" y="21" font-size="11" fill="#dc2626" text-anchor="middle">Counting up...</text>
    </g>

    <!-- Round 3 -->
    <g transform="translate(0, 134)">
      <rect width="680" height="32" fill="#ffffff"/>
      <text x="40" y="21" class="state">Round 3</text>
      <text x="220" y="21" class="state" text-anchor="middle" fill="#ea580c">Receives C's update ➔ 1+4 = 5</text>
      <text x="380" y="21" class="state" text-anchor="middle">Receives B's update ➔ 1+5 = 6</text>
      <text x="550" y="21" font-size="11" fill="#dc2626" text-anchor="middle">Still bouncing back and forth</text>
    </g>

    <!-- Convergence at Infinity -->
    <g transform="translate(0, 168)">
      <rect width="680" height="34" rx="0 0 8 8" fill="#fee2e2"/>
      <text x="40" y="21" class="state" fill="#991b1b">Round 16 (Infinity)</text>
      <text x="220" y="21" class="state" text-anchor="middle" fill="#991b1b">Cost = 16 (Unreachable)</text>
      <text x="380" y="21" class="state" text-anchor="middle" fill="#991b1b">Cost = 16 (Unreachable)</text>
      <text x="550" y="21" font-size="11" font-weight="bold" fill="#991b1b" text-anchor="middle">Finally dropped at RIP metric 16</text>
    </g>
  </g>

  <!-- Core Cause note -->
  <g transform="translate(60, 385)">
    <rect width="680" height="75" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2" filter="url(#shadow)"/>
    <text x="20" y="25" font-size="13" font-weight="bold" fill="#1e293b">Root Cause of the Anomaly:</text>
    <text x="20" y="48" font-size="11.5" fill="#334155">Router C's advertised path of cost 2 went <tspan font-weight="bold">THROUGH Router B</tspan>. When A failed, B did not know C's route was dependent on B itself! They exchanged mutual misinformation until reaching the protocol infinity ceiling.</text>
  </g>
</svg>`;

// 8. split-horizon-poison-reverse.svg
svgs['split-horizon-poison-reverse.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  <defs>
    <style>
      text { font-family: 'Segoe UI', Arial, sans-serif; }
      .title { font-size: 20px; font-weight: bold; fill: #1e293b; }
      .sub { font-size: 13px; fill: #475569; }
      .box-t { font-size: 14px; font-weight: bold; fill: #1e40af; }
    </style>
    <filter id="shadow" x="-2%" y="-2%" width="104%" height="104%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.08"/>
    </filter>
  </defs>

  <rect width="800" height="500" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="400" y="38" text-anchor="middle" class="title">Solutions: Split Horizon &amp; Poison Reverse</text>
  <text x="400" y="58" text-anchor="middle" class="sub">Techniques to Prevent 2-Node Routing Loops and Stop Count-to-Infinity</text>

  <!-- Left: Split Horizon -->
  <g transform="translate(45, 95)" filter="url(#shadow)">
    <rect width="335" height="260" rx="8" fill="#ffffff" stroke="#2563eb" stroke-width="1.5"/>
    <rect width="335" height="35" rx="8 8 0 0" fill="#eff6ff"/>
    <text x="167" y="23" text-anchor="middle" class="box-t">1. Simple Split Horizon</text>

    <!-- Routers -->
    <g transform="translate(40, 60)">
      <circle cx="30" cy="30" r="18" fill="#2563eb"/>
      <text x="30" y="34" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">B</text>

      <!-- Arrow from B to C -->
      <line x1="55" y1="30" x2="195" y2="30" stroke="#059669" stroke-width="2.5"/>
      <polygon points="195,26 205,30 195,34" fill="#059669"/>
      <text x="125" y="22" text-anchor="middle" font-size="10" font-weight="bold" fill="#059669">Advertises: Dest A, Cost 1</text>

      <circle cx="225" cy="30" r="18" fill="#2563eb"/>
      <text x="225" y="34" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">C</text>

      <!-- Blocked Arrow back from C to B -->
      <line x1="195" y1="65" x2="65" y2="65" stroke="#dc2626" stroke-width="2" stroke-dasharray="4,4"/>
      <circle cx="130" cy="65" r="12" fill="#dc2626"/>
      <text x="130" y="70" text-anchor="middle" font-size="14" font-weight="bold" fill="#ffffff">✕</text>
      <text x="130" y="90" text-anchor="middle" font-size="10" font-weight="bold" fill="#dc2626">DO NOT ADVERTISE BACK TO B!</text>
    </g>

    <!-- Text description -->
    <g transform="translate(18, 170)">
      <text x="0" y="15" font-size="12" font-weight="bold" fill="#1e293b">Core Rule:</text>
      <text x="0" y="35" font-size="11.5" fill="#334155">"Never advertise a route back out the same interface through which it was learned."</text>
      <text x="0" y="60" font-size="11" fill="#64748b">Since C learned about A from B, C never sends info about A back to B. Prevents B from mistakenly believing C has an alternative route.</text>
    </g>
  </g>

  <!-- Right: Poison Reverse -->
  <g transform="translate(420, 95)" filter="url(#shadow)">
    <rect width="335" height="260" rx="8" fill="#ffffff" stroke="#059669" stroke-width="1.5"/>
    <rect width="335" height="35" rx="8 8 0 0" fill="#ecfdf5"/>
    <text x="167" y="23" text-anchor="middle" class="box-t" fill="#047857">2. Split Horizon with Poison Reverse</text>

    <!-- Routers -->
    <g transform="translate(40, 60)">
      <circle cx="30" cy="30" r="18" fill="#059669"/>
      <text x="30" y="34" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">B</text>

      <!-- Forward Route -->
      <line x1="55" y1="30" x2="195" y2="30" stroke="#059669" stroke-width="2.5"/>
      <polygon points="195,26 205,30 195,34" fill="#059669"/>
      <text x="125" y="22" text-anchor="middle" font-size="10" font-weight="bold" fill="#059669">Advertises: Dest A, Cost 1</text>

      <circle cx="225" cy="30" r="18" fill="#059669"/>
      <text x="225" y="34" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">C</text>

      <!-- Explicit Poison Advertisement back -->
      <line x1="195" y1="65" x2="65" y2="65" stroke="#7c3aed" stroke-width="2.5"/>
      <polygon points="65,61 55,65 65,69" fill="#7c3aed"/>
      <text x="125" y="80" text-anchor="middle" font-size="10" font-weight="bold" fill="#7c3aed">Advertises: Dest A, Cost = ∞ (16)</text>
    </g>

    <!-- Text description -->
    <g transform="translate(18, 170)">
      <text x="0" y="15" font-size="12" font-weight="bold" fill="#1e293b">Core Rule:</text>
      <text x="0" y="35" font-size="11.5" fill="#334155">"Explicitly advertise the route back with metric INFINITY (16 in RIP)."</text>
      <text x="0" y="60" font-size="11" fill="#64748b">C explicitly tells B: "I have no independent path to A; my cost is infinite." Stronger than silence because it immediately overwrites any stale state.</text>
    </g>
  </g>

  <!-- Limitation Note Bottom -->
  <g transform="translate(45, 375)">
    <rect width="710" height="85" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2" filter="url(#shadow)"/>
    <text x="20" y="24" font-size="13" font-weight="bold" fill="#dc2626">Limitation in Loops of 3 or More Nodes:</text>
    <text x="20" y="46" font-size="11.5" fill="#334155">Split Horizon and Poison Reverse completely solve 2-node loops (A-B). However, in triangles or loops of 3+ nodes (A-B-C-A), they cannot prevent count-to-infinity without <tspan font-weight="bold">Hold-Down Timers</tspan> or path vector information (like BGP AS-Path).</text>
  </g>
</svg>`;

for (const [filename, content] of Object.entries(svgs)) {
  fs.writeFileSync(path.join(dir, filename), content, 'utf8');
  console.log('Saved:', filename);
}
console.log('Topic 4 SVG generation complete!');

