const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../js/cleanDiagramEngine.js');
let code = fs.readFileSync(filePath, 'utf8');

// 1. Update the dispatch section in getDiagramHtml
const oldDispatch = `    // 11. Data Link Layer Switching & Spanning Tree (STP)
    if (id === 'dll-switching' || id === 'u2-bridges-overview' || id === 'u2-transparent-bridges' || id === 'u2-learning-bridges' || id === 'u2-bridge-learning-process' || id === 'u2-forwarding-and-filtering' || id === 'u2-bridge-flooding' || id === 'u2-spanning-tree-protocol' || id === 'u2-bridges-vs-switches' || id === 'vlan') {
      return this.renderSwitchingStpDiagram();
    }`;

const newDispatch = `    // 11. Data Link Layer Switching, Bridges, Learning, STP & Hardware Comparison
    if (id === 'u2-learning-bridges' || id === 'u2-bridge-learning-process') {
      return this.renderBridgeLearningAlgorithmDiagram();
    }
    if (id === 'u2-spanning-tree-protocol') {
      return this.renderSpanningTreeProtocolDiagram();
    }
    if (id === 'u2-bridges-vs-switches') {
      return this.renderBridgesVsSwitchesDiagram();
    }
    if (id === 'dll-switching' || id === 'u2-bridges-overview' || id === 'u2-transparent-bridges' || id === 'u2-forwarding-and-filtering' || id === 'u2-bridge-flooding' || id === 'vlan') {
      return this.renderSwitchingArchitectureDiagram();
    }`;

if (!code.includes('renderBridgeLearningAlgorithmDiagram: function()')) {
  code = code.replace(oldDispatch, newDispatch);

  // 2. Add the four dedicated clean diagram functions before renderSwitchingStpDiagram
  const newFunctions = `
  // 11a. Switching & Bridge Architecture: Forwarding, Filtering & Flooding
  renderSwitchingArchitectureDiagram: function() {
    return \`
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Data Link Layer Switching Architecture & Port Decision Engine
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded font-bold">
            IEEE 802.1D / Ethernet L2
          </span>
        </div>

        <!-- Top: Station Hosts & Switch Interconnect -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 text-xs font-mono">
          <!-- Segment 1 / Port 1 -->
          <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-blue-200 dark:border-blue-900 shadow-xs flex flex-col justify-between">
            <div class="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-700">
              <span class="font-bold text-blue-700 dark:text-blue-400"><i class="fa-solid fa-network-wired"></i> Port 1 (Segment A)</span>
              <span class="text-[9px] px-1.5 py-0.2 bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 rounded">Collision Domain 1</span>
            </div>
            <div class="mt-2 space-y-1.5 text-[10px]">
              <div class="p-1 bg-blue-50 dark:bg-blue-950/50 rounded flex justify-between">
                <span>Station A:</span><span class="font-bold">AA:AA:AA:AA:AA:AA</span>
              </div>
              <div class="p-1 bg-blue-50 dark:bg-blue-950/50 rounded flex justify-between">
                <span>Station B:</span><span class="font-bold">BB:BB:BB:BB:BB:BB</span>
              </div>
            </div>
          </div>

          <!-- Switch Core & MAC Table -->
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/60 rounded-lg border border-emerald-300 dark:border-emerald-800 shadow-xs">
            <div class="flex items-center justify-between pb-1 border-b border-emerald-200 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 font-bold">
              <span><i class="fa-solid fa-microchip"></i> L2 Switching Core</span>
              <span class="text-[9px] font-sans text-emerald-700 dark:text-emerald-400">FDB Table</span>
            </div>
            <div class="mt-2 space-y-1 text-[9px]">
              <div class="flex justify-between font-bold text-slate-500 pb-0.5 border-b border-emerald-200 dark:border-emerald-800">
                <span>MAC Address</span><span>Port</span><span>Age</span>
              </div>
              <div class="flex justify-between text-slate-700 dark:text-slate-300">
                <span>AA:AA:AA:...</span><span class="font-bold text-emerald-700 dark:text-emerald-400">P1</span><span>295s</span>
              </div>
              <div class="flex justify-between text-slate-700 dark:text-slate-300">
                <span>BB:BB:BB:...</span><span class="font-bold text-emerald-700 dark:text-emerald-400">P1</span><span>280s</span>
              </div>
              <div class="flex justify-between text-slate-700 dark:text-slate-300">
                <span>CC:CC:CC:...</span><span class="font-bold text-emerald-700 dark:text-emerald-400">P2</span><span>300s</span>
              </div>
            </div>
          </div>

          <!-- Segment 2 / Port 2 & Port 3 -->
          <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-purple-200 dark:border-purple-900 shadow-xs flex flex-col justify-between">
            <div class="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-700">
              <span class="font-bold text-purple-700 dark:text-purple-400"><i class="fa-solid fa-server"></i> Port 2 & 3 (Segments B & C)</span>
              <span class="text-[9px] px-1.5 py-0.2 bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 rounded">Microsegmented</span>
            </div>
            <div class="mt-2 space-y-1.5 text-[10px]">
              <div class="p-1 bg-purple-50 dark:bg-purple-950/50 rounded flex justify-between">
                <span>Station C (P2):</span><span class="font-bold">CC:CC:CC:CC:CC:CC</span>
              </div>
              <div class="p-1 bg-purple-50 dark:bg-purple-950/50 rounded flex justify-between">
                <span>Station D (P3):</span><span class="font-bold">DD:DD:DD:DD:DD:DD</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Three Forwarding Actions Comparison -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
          <!-- Action 1: Forward -->
          <div class="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
            <div class="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300 mb-1">
              <i class="fa-solid fa-arrow-right text-emerald-600"></i>
              <span>1. Unicast Forwarding</span>
            </div>
            <p class="text-[10px] text-slate-600 dark:text-slate-400 leading-relaxed">
              Frame arrives on <strong>Port 1</strong> with destination <code>CC:...</code>. Table lookup yields <strong>Port 2</strong>. Switch transmits directly out Port 2. Port 3 is completely spared from traffic!
            </p>
          </div>

          <!-- Action 2: Filter -->
          <div class="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
            <div class="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300 mb-1">
              <i class="fa-solid fa-filter text-amber-600"></i>
              <span>2. Same-Port Filtering</span>
            </div>
            <p class="text-[10px] text-slate-600 dark:text-slate-400 leading-relaxed">
              Frame arrives on <strong>Port 1</strong> from Station A to Station B (both on Segment 1). Dest port equals ingress port. The switch <strong>filters and discards</strong> the frame. No bridge crossing!
            </p>
          </div>

          <!-- Action 3: Flood -->
          <div class="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
            <div class="flex items-center gap-1.5 font-bold text-blue-800 dark:text-blue-300 mb-1">
              <i class="fa-solid fa-bullhorn text-blue-600"></i>
              <span>3. Unknown/Broadcast Flooding</span>
            </div>
            <p class="text-[10px] text-slate-600 dark:text-slate-400 leading-relaxed">
              If destination MAC is unknown or broadcast (<code>FF:FF:FF:FF:FF:FF</code>), the switch <strong>floods</strong> copies to all ports (Ports 2 & 3) except incoming Port 1.
            </p>
          </div>
        </div>
      </div>
    \`;
  },

  // 11b. Bridge Self-Learning Algorithm Flowchart
  renderBridgeLearningAlgorithmDiagram: function() {
    return \`
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Bridge & Switch Self-Learning Algorithm (State Machine & Logic Flow)
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded font-bold">
            IEEE 802.1D Learning
          </span>
        </div>

        <!-- 4 Sequential Flow Steps -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-2 text-xs mb-4">
          <!-- Step 1 -->
          <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex flex-col">
            <span class="text-[9px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">Step 1: Frame Ingress</span>
            <span class="font-bold text-slate-800 dark:text-slate-200 mt-1">Receive Frame</span>
            <p class="text-[10px] text-slate-500 mt-1 leading-relaxed">
              Frame arrives at Port <strong>P</strong>. Bridge parses header to extract:
              <br><code class="text-blue-600 dark:text-blue-400">Src = S</code> | <code class="text-purple-600 dark:text-purple-400">Dest = D</code>
            </p>
          </div>

          <!-- Step 2 -->
          <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex flex-col">
            <span class="text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">Step 2: Learn Source</span>
            <span class="font-bold text-slate-800 dark:text-slate-200 mt-1">Update FDB Table</span>
            <p class="text-[10px] text-slate-500 mt-1 leading-relaxed">
              Record mapping:
              <br><code>Table[S] &larr; P</code>
              <br>Reset Aging Timer (typically <strong>300 sec</strong>). Adapts if host moved!
            </p>
          </div>

          <!-- Step 3 -->
          <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex flex-col">
            <span class="text-[9px] font-mono font-bold text-purple-600 dark:text-purple-400 uppercase">Step 3: Lookup Dest</span>
            <span class="font-bold text-slate-800 dark:text-slate-200 mt-1">Query Destination D</span>
            <p class="text-[10px] text-slate-500 mt-1 leading-relaxed">
              Search hash table for <code>D</code>.
              <br>&bull; Is <code>D</code> found?
              <br>&bull; If yes, which port is it on?
            </p>
          </div>

          <!-- Step 4 -->
          <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex flex-col">
            <span class="text-[9px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase">Step 4: Execute Action</span>
            <span class="font-bold text-slate-800 dark:text-slate-200 mt-1">Forward / Filter / Flood</span>
            <p class="text-[10px] text-slate-500 mt-1 leading-relaxed">
              &bull; <code>Table[D] &ne; P</code> &rarr; <strong>Forward</strong>
              <br>&bull; <code>Table[D] == P</code> &rarr; <strong>Filter</strong>
              <br>&bull; <code>D not in Table</code> &rarr; <strong>Flood</strong>
            </p>
          </div>
        </div>

        <!-- Aging Timer Callout -->
        <div class="p-3 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
          <div class="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <i class="fa-solid fa-clock-rotate-left text-blue-500"></i>
            <span><strong>Dynamic Aging Timer:</strong> Entries not refreshed within 300 seconds are automatically purged to prevent stale paths when laptops move between ports.</span>
          </div>
          <span class="text-[10px] font-mono bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded font-bold shrink-0">Timeout = 300s</span>
        </div>
      </div>
    \`;
  },

  // 11c. Spanning Tree Protocol (STP - IEEE 802.1D) Loop-Free Active Topology
  renderSpanningTreeProtocolDiagram: function() {
    return \`
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Spanning Tree Protocol (IEEE 802.1D): Eliminating Switching Loops & Broadcast Storms
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 px-2 py-0.5 rounded font-bold">
            Radia Perlman Algorithm
          </span>
        </div>

        <!-- Redundant Triangle Topology Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 text-xs font-mono">
          <!-- Switch 1: ROOT BRIDGE -->
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/50 rounded-lg border-2 border-emerald-500 shadow-sm">
            <div class="flex items-center justify-between pb-1 border-b border-emerald-200 dark:border-emerald-800">
              <span class="font-extrabold text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                <i class="fa-solid fa-crown text-amber-500"></i> ROOT BRIDGE (SW-1)
              </span>
              <span class="text-[9px] bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200 px-1.5 py-0.2 rounded font-bold">Priority: 4096</span>
            </div>
            <p class="text-[10px] text-slate-600 dark:text-slate-400 mt-2 font-sans">
              Elected because it has the <strong>lowest Bridge ID (BID)</strong>. All active ports on Root Bridge are <strong>Designated Ports (Forwarding)</strong>.
            </p>
            <div class="mt-2 text-[10px] space-y-1">
              <div class="text-emerald-700 dark:text-emerald-400 font-bold">&bull; Port 1: Designated (FWD)</div>
              <div class="text-emerald-700 dark:text-emerald-400 font-bold">&bull; Port 2: Designated (FWD)</div>
            </div>
          </div>

          <!-- Switch 2 -->
          <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-xs">
            <div class="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-700">
              <span class="font-bold text-slate-800 dark:text-slate-200"><i class="fa-solid fa-server text-blue-500"></i> Switch SW-2</span>
              <span class="text-[9px] text-slate-400">Priority: 32768</span>
            </div>
            <p class="text-[10px] text-slate-500 mt-2 font-sans">
              Finds least-cost root path (Cost = 4) to Root Bridge through Port 1.
            </p>
            <div class="mt-2 text-[10px] space-y-1">
              <div class="text-emerald-600 dark:text-emerald-400 font-bold">&bull; Port 1: Root Port (FWD)</div>
              <div class="text-emerald-600 dark:text-emerald-400 font-bold">&bull; Port 2: Designated (FWD)</div>
            </div>
          </div>

          <!-- Switch 3 (Contains Blocked Port) -->
          <div class="p-3 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-300 dark:border-red-900 shadow-xs">
            <div class="flex items-center justify-between pb-1 border-b border-red-200 dark:border-red-800">
              <span class="font-bold text-red-800 dark:text-red-300"><i class="fa-solid fa-server text-red-500"></i> Switch SW-3</span>
              <span class="text-[9px] text-red-600 dark:text-red-400">Priority: 32768</span>
            </div>
            <p class="text-[10px] text-slate-600 dark:text-slate-400 mt-2 font-sans">
              To prevent loop between SW-2 & SW-3, Port 2 is placed into <strong>BLOCKING state</strong>!
            </p>
            <div class="mt-2 text-[10px] space-y-1">
              <div class="text-emerald-600 dark:text-emerald-400 font-bold">&bull; Port 1: Root Port (FWD)</div>
              <div class="text-red-600 dark:text-red-400 font-extrabold flex items-center gap-1">
                <i class="fa-solid fa-lock"></i> Port 2: BLOCKED (Discard Data)
              </div>
            </div>
          </div>
        </div>

        <!-- Danger vs Solution Comparison -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div class="p-2.5 rounded-lg bg-red-100 dark:bg-red-950/60 border border-red-300 dark:border-red-900">
            <span class="font-bold text-red-900 dark:text-red-200 flex items-center gap-1.5 mb-1">
              <i class="fa-solid fa-triangle-exclamation text-red-600"></i> The Switching Loop Threat (No TTL in L2)
            </span>
            <p class="text-[10px] text-red-800 dark:text-red-300 leading-relaxed font-sans">
              Without STP, broadcast frames cycle infinitely across SW1 &rarr; SW2 &rarr; SW3 &rarr; SW1, causing <strong>Broadcast Storms</strong>, 100% bandwidth saturation, and MAC table flapping!
            </p>
          </div>
          <div class="p-2.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-900">
            <span class="font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5 mb-1">
              <i class="fa-solid fa-circle-check text-emerald-600"></i> The STP Solution (Spanning Tree Active Path)
            </span>
            <p class="text-[10px] text-emerald-800 dark:text-emerald-300 leading-relaxed font-sans">
              STP continuously exchanges <strong>BPDU (Bridge Protocol Data Units)</strong> every 2s. If SW-1 &rarr; SW-2 link fails, Port 2 on SW-3 instantly transitions from Blocking &rarr; Listening &rarr; Learning &rarr; Forwarding!
            </p>
          </div>
        </div>
      </div>
    \`;
  },

  // 11d. Architectural Evolution: Bridges vs. Switches
  renderBridgesVsSwitchesDiagram: function() {
    return \`
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Architectural Evolution: Legacy Software Bridges vs. Modern Hardware Switches
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded font-bold">
            Hardware ASIC vs. Software CPU
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <!-- Bridge Card -->
          <div class="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-700">
                <span class="font-bold text-slate-800 dark:text-slate-200 text-sm flex items-center gap-1.5">
                  <i class="fa-solid fa-bridge text-blue-500"></i> Traditional Bridge
                </span>
                <span class="text-[9px] px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-bold font-mono">Software-Driven</span>
              </div>
              <ul class="space-y-2 text-[11px] text-slate-600 dark:text-slate-300">
                <li class="flex items-start gap-1.5"><i class="fa-solid fa-microchip text-slate-400 mt-0.5"></i> <span><strong>Forwarding Engine:</strong> General-purpose CPU in software (interrupt-driven).</span></li>
                <li class="flex items-start gap-1.5"><i class="fa-solid fa-ethernet text-slate-400 mt-0.5"></i> <span><strong>Port Density:</strong> Typically 2 to 4 ports connecting LAN segments.</span></li>
                <li class="flex items-start gap-1.5"><i class="fa-solid fa-stopwatch text-slate-400 mt-0.5"></i> <span><strong>Forwarding Latency:</strong> Higher delay (100–500 &mu;s store-and-forward).</span></li>
                <li class="flex items-start gap-1.5"><i class="fa-solid fa-arrows-split-up-and-left text-slate-400 mt-0.5"></i> <span><strong>Media:</strong> Often connected heterogeneous media (Token Ring to Ethernet).</span></li>
              </ul>
            </div>
            <div class="mt-3 p-2 bg-slate-50 dark:bg-slate-900 rounded text-[10px] text-slate-500 italic">
              "A bridge separates a network into 2 or 3 larger collision domains."
            </div>
          </div>

          <!-- Switch Card -->
          <div class="p-4 rounded-xl bg-purple-50/50 dark:bg-purple-950/30 border-2 border-purple-300 dark:border-purple-800 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between pb-2 mb-2 border-b border-purple-200 dark:border-purple-800">
                <span class="font-bold text-purple-900 dark:text-purple-200 text-sm flex items-center gap-1.5">
                  <i class="fa-solid fa-server text-purple-600"></i> Multiport Switch
                </span>
                <span class="text-[9px] px-2 py-0.5 rounded bg-purple-200 dark:bg-purple-900 text-purple-900 dark:text-purple-200 font-bold font-mono">ASIC Hardware</span>
              </div>
              <ul class="space-y-2 text-[11px] text-slate-700 dark:text-slate-200">
                <li class="flex items-start gap-1.5"><i class="fa-solid fa-bolt text-purple-500 mt-0.5"></i> <span><strong>Forwarding Engine:</strong> Dedicated ASICs / TCAM hardware at wire speed.</span></li>
                <li class="flex items-start gap-1.5"><i class="fa-solid fa-network-wired text-purple-500 mt-0.5"></i> <span><strong>Port Density:</strong> High density (24, 48, 96+ Gigabit/10G ports).</span></li>
                <li class="flex items-start gap-1.5"><i class="fa-solid fa-gauge-high text-purple-500 mt-0.5"></i> <span><strong>Forwarding Latency:</strong> Ultra-low latency (&lt; 1–5 &mu;s cut-through mode).</span></li>
                <li class="flex items-start gap-1.5"><i class="fa-solid fa-shield-halved text-purple-500 mt-0.5"></i> <span><strong>Microsegmentation:</strong> Every single port is its own isolated collision domain!</span></li>
              </ul>
            </div>
            <div class="mt-3 p-2 bg-white dark:bg-slate-800 rounded text-[10px] text-purple-800 dark:text-purple-300 font-bold">
              "A modern switch is a high-performance, wire-speed multiport bridge with dedicated full-duplex bandwidth."
            </div>
          </div>
        </div>
      </div>
    \`;
  },
`;

  code = code.replace('  // 12. Data Link Layer Switching & Spanning Tree Protocol (STP)', newFunctions + '\n  // 12. Data Link Layer Switching & Spanning Tree Protocol (STP)');
  fs.writeFileSync(filePath, code, 'utf8');
  console.log('Successfully updated cleanDiagramEngine.js with Topic 9 dedicated diagrams!');
} else {
  console.log('cleanDiagramEngine.js already contains Topic 9 diagrams.');
}

