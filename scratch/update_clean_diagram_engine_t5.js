// scratch/update_clean_diagram_engine_t5.js
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'js', 'cleanDiagramEngine.js');
let code = fs.readFileSync(filePath, 'utf8');

// 1. Replace routing for Collision-Free Protocols
const oldRouting = `    // 7. Collision-Free Protocols
    if (id === 'collision-free-protocols' || id === 'u2-bitmap-protocol' || id === 'u2-binary-countdown-protocol' || id === 'u2-token-passing-protocol' || id === 'u2-collision-free-principles' || id === 'u2-comparison-collision-free') {
      return this.renderCollisionFreeDiagram();
    }`;

const newRouting = `    // 7a. Bit-Map Reservation Protocol
    if (id === 'u2-bit-map-protocol') {
      return this.renderBitmapDiagram();
    }

    // 7b. Binary Countdown Address Arbitration Protocol
    if (id === 'u2-binary-countdown-protocol') {
      return this.renderBinaryCountdownDiagram();
    }

    // 7c. Token Passing Protocol & Topologies
    if (id === 'u2-token-passing-protocol') {
      return this.renderTokenPassingDiagram();
    }

    // 7d. Reservation & Polling Working Principles
    if (id === 'u2-collision-free-working-principles') {
      return this.renderPollingReservationDiagram();
    }

    // 7e. Collision-Free Overview & Comparison
    if (id === 'collision-free-protocols' || id === 'u2-collision-free-intro' || id === 'u2-collision-free-principles' || id === 'u2-comparison-collision-free') {
      return this.renderCollisionFreeDiagram();
    }`;

if (!code.includes(oldRouting)) {
  console.error("Could not find old routing for collision-free protocols in cleanDiagramEngine.js");
  process.exit(1);
}

code = code.replace(oldRouting, newRouting);

// 2. Add renderBitmapDiagram, renderBinaryCountdownDiagram, renderTokenPassingDiagram, renderPollingReservationDiagram
const t5DiagramFunctions = `  // 8a. Bit-Map Protocol Diagram
  renderBitmapDiagram: function() {
    return \`
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Bit-Map Reservation Protocol: 2-Phase Operational Epoch
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded font-bold">
            Controlled Reservation
          </span>
        </div>

        <div class="space-y-4 text-xs">
          <!-- Step 1: Reservation Phase -->
          <div class="bg-white dark:bg-slate-800 p-3.5 rounded-lg border border-slate-200 dark:border-slate-700">
            <div class="flex justify-between items-center mb-2">
              <span class="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <span class="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center text-[10px] font-bold">1</span>
                Phase 1: N-Bit Reservation Period (Contention Period)
              </span>
              <span class="text-[10px] font-mono text-slate-500">Bitmap Size = N = 5 bits</span>
            </div>
            <div class="grid grid-cols-5 gap-1.5 text-center font-mono">
              <div class="p-2 rounded border bg-blue-50 dark:bg-blue-950/60 border-blue-300 dark:border-blue-700">
                <div class="text-[9px] text-slate-500">Station 0</div>
                <div class="text-sm font-bold text-blue-600 dark:text-blue-400">1</div>
                <div class="text-[8px] text-blue-700 dark:text-blue-300 font-semibold">Reserve</div>
              </div>
              <div class="p-2 rounded border bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400">
                <div class="text-[9px]">Station 1</div>
                <div class="text-sm font-bold">0</div>
                <div class="text-[8px]">Idle</div>
              </div>
              <div class="p-2 rounded border bg-blue-50 dark:bg-blue-950/60 border-blue-300 dark:border-blue-700">
                <div class="text-[9px] text-slate-500">Station 2</div>
                <div class="text-sm font-bold text-blue-600 dark:text-blue-400">1</div>
                <div class="text-[8px] text-blue-700 dark:text-blue-300 font-semibold">Reserve</div>
              </div>
              <div class="p-2 rounded border bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400">
                <div class="text-[9px]">Station 3</div>
                <div class="text-sm font-bold">0</div>
                <div class="text-[8px]">Idle</div>
              </div>
              <div class="p-2 rounded border bg-blue-50 dark:bg-blue-950/60 border-blue-300 dark:border-blue-700">
                <div class="text-[9px] text-slate-500">Station 4</div>
                <div class="text-sm font-bold text-blue-600 dark:text-blue-400">1</div>
                <div class="text-[8px] text-blue-700 dark:text-blue-300 font-semibold">Reserve</div>
              </div>
            </div>
          </div>

          <!-- Step 2: Data Transmission Phase -->
          <div class="bg-white dark:bg-slate-800 p-3.5 rounded-lg border border-slate-200 dark:border-slate-700">
            <div class="flex justify-between items-center mb-2">
              <span class="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <span class="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-[10px] font-bold">2</span>
                Phase 2: Data Frame Transmission in Ascending Order
              </span>
              <span class="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">Zero Collisions Guaranteed</span>
            </div>
            <div class="flex items-center gap-2 font-mono text-center">
              <div class="grow p-2.5 rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 font-bold text-xs">
                Frame S0 Transmits
              </div>
              <i class="fa-solid fa-arrow-right text-slate-400 text-xs"></i>
              <div class="grow p-2.5 rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 font-bold text-xs">
                Frame S2 Transmits
              </div>
              <i class="fa-solid fa-arrow-right text-slate-400 text-xs"></i>
              <div class="grow p-2.5 rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 font-bold text-xs">
                Frame S4 Transmits
              </div>
            </div>
          </div>

          <div class="p-2.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300 flex items-center justify-between">
            <span><strong>Channel Efficiency:</strong> d / (d + N) under low load; N&middot;d / (N&middot;d + N) = d / (d + 1) under heavy load.</span>
            <span class="font-mono text-slate-500">Tanenbaum Ch. 4.2</span>
          </div>
        </div>
      </div>
    \`;
  },

  // 8b. Binary Countdown Protocol Diagram
  renderBinaryCountdownDiagram: function() {
    return \`
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Binary Countdown: Bit-by-Bit Address Arbitration
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded font-bold">
            MSB to LSB (1 Dominates 0)
          </span>
        </div>

        <div class="space-y-3 text-xs">
          <div class="overflow-x-auto">
            <table class="w-full text-center border-collapse">
              <thead>
                <tr class="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px]">
                  <th class="p-2 border border-slate-200 dark:border-slate-700 text-left">Station</th>
                  <th class="p-2 border border-slate-200 dark:border-slate-700 font-mono">Binary Address</th>
                  <th class="p-2 border border-slate-200 dark:border-slate-700">Bit 1 (MSB)</th>
                  <th class="p-2 border border-slate-200 dark:border-slate-700">Bit 2</th>
                  <th class="p-2 border border-slate-200 dark:border-slate-700">Bit 3 (LSB)</th>
                  <th class="p-2 border border-slate-200 dark:border-slate-700">Outcome</th>
                </tr>
              </thead>
              <tbody class="font-mono text-[11px]">
                <tr class="border-b border-slate-200 dark:border-slate-700">
                  <td class="p-2 border border-slate-200 dark:border-slate-700 text-left font-sans font-bold">Station A</td>
                  <td class="p-2 border border-slate-200 dark:border-slate-700 font-bold text-blue-600 dark:text-blue-400">1 0 1</td>
                  <td class="p-2 border border-slate-200 dark:border-slate-700 text-emerald-600 font-bold">1</td>
                  <td class="p-2 border border-slate-200 dark:border-slate-700 text-red-500 font-bold bg-red-50 dark:bg-red-950/30">0 (Hears 1 &rarr; Drops)</td>
                  <td class="p-2 border border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600">&ndash;</td>
                  <td class="p-2 border border-slate-200 dark:border-slate-700 text-slate-500 font-sans">Eliminated at Bit 2</td>
                </tr>
                <tr class="border-b border-slate-200 dark:border-slate-700 bg-purple-50/50 dark:bg-purple-950/20 font-bold">
                  <td class="p-2 border border-slate-200 dark:border-slate-700 text-left font-sans text-purple-700 dark:text-purple-300">Station B (Winner)</td>
                  <td class="p-2 border border-slate-200 dark:border-slate-700 text-purple-600 dark:text-purple-400 font-bold">1 1 0</td>
                  <td class="p-2 border border-slate-200 dark:border-slate-700 text-emerald-600">1</td>
                  <td class="p-2 border border-slate-200 dark:border-slate-700 text-emerald-600">1</td>
                  <td class="p-2 border border-slate-200 dark:border-slate-700 text-emerald-600">0</td>
                  <td class="p-2 border border-slate-200 dark:border-slate-700 text-purple-700 dark:text-purple-300 font-sans">Wins Channel &amp; Transmits</td>
                </tr>
                <tr class="border-b border-slate-200 dark:border-slate-700">
                  <td class="p-2 border border-slate-200 dark:border-slate-700 text-left font-sans font-bold">Station C</td>
                  <td class="p-2 border border-slate-200 dark:border-slate-700 font-bold text-blue-600 dark:text-blue-400">0 1 1</td>
                  <td class="p-2 border border-slate-200 dark:border-slate-700 text-red-500 font-bold bg-red-50 dark:bg-red-950/30">0 (Hears 1 &rarr; Drops)</td>
                  <td class="p-2 border border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600">&ndash;</td>
                  <td class="p-2 border border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600">&ndash;</td>
                  <td class="p-2 border border-slate-200 dark:border-slate-700 text-slate-500 font-sans">Eliminated at Bit 1</td>
                </tr>
                <tr class="border-b border-slate-200 dark:border-slate-700">
                  <td class="p-2 border border-slate-200 dark:border-slate-700 text-left font-sans font-bold">Station D</td>
                  <td class="p-2 border border-slate-200 dark:border-slate-700 font-bold text-blue-600 dark:text-blue-400">1 0 0</td>
                  <td class="p-2 border border-slate-200 dark:border-slate-700 text-emerald-600 font-bold">1</td>
                  <td class="p-2 border border-slate-200 dark:border-slate-700 text-emerald-600 font-bold">1</td>
                  <td class="p-2 border border-slate-200 dark:border-slate-700 text-emerald-600 font-bold">0</td>
                  <td class="p-2 border border-slate-200 dark:border-slate-700 text-slate-500 font-sans">Second Place (Address 100 &lt; 110)</td>
                </tr>
                <tr class="bg-slate-100 dark:bg-slate-800 font-bold text-slate-800 dark:text-slate-200">
                  <td class="p-2 border border-slate-200 dark:border-slate-700 text-left font-sans">Resulting Channel State</td>
                  <td class="p-2 border border-slate-200 dark:border-slate-700">Boolean OR</td>
                  <td class="p-2 border border-slate-200 dark:border-slate-700 text-blue-600">1</td>
                  <td class="p-2 border border-slate-200 dark:border-slate-700 text-blue-600">1</td>
                  <td class="p-2 border border-slate-200 dark:border-slate-700 text-blue-600">0</td>
                  <td class="p-2 border border-slate-200 dark:border-slate-700 text-purple-600 font-sans">Station B Transmits Frame</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="p-2 rounded bg-purple-50 dark:bg-purple-950/40 text-[11px] text-purple-800 dark:text-purple-300">
            <strong>Key Benefit:</strong> Arbitration takes only &lceil;log2 N&rceil; bits instead of N bits. For 32 stations, only 5 bits are required!
          </div>
        </div>
      </div>
    \`;
  },

  // 8c. Token Passing Protocol & Topologies Diagram
  renderTokenPassingDiagram: function() {
    return \`
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Token Passing Architecture: Logical Ring & Physical Topologies
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded font-bold">
            IEEE 802.5 / FDDI / Forouzan 12.2.3
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-3">
          <!-- Logical Ring Circulation -->
          <div class="bg-white dark:bg-slate-800 p-3.5 rounded-lg border border-slate-200 dark:border-slate-700">
            <span class="font-bold text-slate-800 dark:text-slate-200 block mb-2 flex items-center gap-1.5">
              <i class="fa-solid fa-rotate text-emerald-500"></i> Token Circulation Sequence
            </span>
            <div class="p-3 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 text-center font-mono text-xs">
              <span class="font-bold text-blue-600 dark:text-blue-400">Node A</span>
              <span class="text-slate-400 mx-1">&rarr;</span>
              <span class="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-1 rounded">[Node B: TOKEN]</span>
              <span class="text-slate-400 mx-1">&rarr;</span>
              <span class="font-bold text-blue-600 dark:text-blue-400">Node C</span>
              <span class="text-slate-400 mx-1">&rarr;</span>
              <span class="font-bold text-blue-600 dark:text-blue-400">Node D</span>
              <span class="text-slate-400 mx-1">&rarr;</span>
              <span class="text-xs text-slate-400">(Loop back to A)</span>
            </div>
            <p class="text-[10px] text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Only the <strong>Token Holder</strong> transmits data. After completing transmission or timer expiry, the token frame is released to the successor node.
            </p>
          </div>

          <!-- 4 Physical Implementations -->
          <div class="bg-white dark:bg-slate-800 p-3.5 rounded-lg border border-slate-200 dark:border-slate-700">
            <span class="font-bold text-slate-800 dark:text-slate-200 block mb-2 flex items-center gap-1.5">
              <i class="fa-solid fa-network-wired text-blue-500"></i> 4 Physical Topologies (Forouzan Fig 12.16)
            </span>
            <div class="grid grid-cols-2 gap-2 text-[10px]">
              <div class="p-2 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span class="font-bold text-slate-700 dark:text-slate-200 block">1. Physical Ring</span>
                <span class="text-slate-500">Point-to-point simplex ring loop (IEEE 802.5).</span>
              </div>
              <div class="p-2 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span class="font-bold text-slate-700 dark:text-slate-200 block">2. Dual Ring</span>
                <span class="text-slate-500">Primary + counter-rotating healing ring (FDDI).</span>
              </div>
              <div class="p-2 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span class="font-bold text-slate-700 dark:text-slate-200 block">3. Bus Ring</span>
                <span class="text-slate-500">Physical linear bus, logical ring pointers (IEEE 802.4).</span>
              </div>
              <div class="p-2 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span class="font-bold text-slate-700 dark:text-slate-200 block">4. Star Ring</span>
                <span class="text-slate-500">Physical star to central hub (MAU) with bypass relays.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    \`;
  },

  // 8d. Reservation & Polling Working Principles Diagram
  renderPollingReservationDiagram: function() {
    return \`
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Controlled Access Methods: Reservation Minislots &amp; Polling / Select Flow
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded font-bold">
            Forouzan Ch. 12.2.1 &amp; 12.2.2
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <!-- Reservation Method -->
          <div class="bg-white dark:bg-slate-800 p-3.5 rounded-lg border border-slate-200 dark:border-slate-700">
            <span class="font-bold text-blue-600 dark:text-blue-400 block mb-2 flex items-center gap-1.5">
              <i class="fa-solid fa-calendar-check text-blue-500"></i> 1. Reservation Method (Minislots)
            </span>
            <div class="space-y-2">
              <div class="p-2 rounded bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-[10px]">
                <div class="font-semibold text-blue-900 dark:text-blue-300 mb-1">Time Interval Architecture:</div>
                <div class="font-mono text-[9px] bg-white dark:bg-slate-900 p-1.5 rounded border border-blue-100 dark:border-blue-900 text-center">
                  [ Reservation Frame: 1 0 1 1 0 ] &rarr; [ Data 1 ] &rarr; [ Data 3 ] &rarr; [ Data 4 ]
                </div>
              </div>
              <p class="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Time is divided into intervals. Each interval begins with an N-minislot reservation frame. Stations book their turns; only reserving stations transmit in the subsequent data phase.
              </p>
            </div>
          </div>

          <!-- Polling Method -->
          <div class="bg-white dark:bg-slate-800 p-3.5 rounded-lg border border-slate-200 dark:border-slate-700">
            <span class="font-bold text-purple-600 dark:text-purple-400 block mb-2 flex items-center gap-1.5">
              <i class="fa-solid fa-server text-purple-500"></i> 2. Polling Method (Primary &ndash; Secondary)
            </span>
            <div class="space-y-2">
              <div class="p-2 rounded bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-[10px]">
                <div class="font-semibold text-purple-900 dark:text-purple-300 mb-1">Two Operational Functions:</div>
                <div class="font-mono text-[9px] space-y-1">
                  <div class="bg-white dark:bg-slate-900 p-1 rounded border border-purple-100 dark:border-purple-900">
                    <strong>Poll:</strong> Primary &rarr; Secondary [Poll] | Secondary &rarr; Primary [Data/NAK]
                  </div>
                  <div class="bg-white dark:bg-slate-900 p-1 rounded border border-purple-100 dark:border-purple-900">
                    <strong>Select:</strong> Primary &rarr; Secondary [SEL] | Secondary &rarr; Primary [ACK] | Primary &rarr; [Data]
                  </div>
                </div>
              </div>
              <p class="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Centralized primary device controls channel access. Eliminates collisions completely, but primary device forms a processing bottleneck and single point of failure (SPOF).
              </p>
            </div>
          </div>
        </div>
      </div>
    \`;
  },
`;

const anchor = `  // 8. Collision-Free Protocols
  renderCollisionFreeDiagram: function() {`;

if (!code.includes(anchor)) {
  console.error("Could not find anchor in cleanDiagramEngine.js");
  process.exit(1);
}

code = code.replace(anchor, t5DiagramFunctions + "\n" + anchor);

fs.writeFileSync(filePath, code, 'utf8');
console.log("Successfully updated cleanDiagramEngine.js with dedicated Topic 5 diagrams!");

