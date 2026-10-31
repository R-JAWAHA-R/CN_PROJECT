// scratch/update_clean_diagram_engine.js
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'js', 'cleanDiagramEngine.js');
let code = fs.readFileSync(filePath, 'utf8');

// 1. Replace routing for CSMA / CSMA-CD / CSMA-CA
const oldRouting = `    // 6. CSMA, CSMA/CD, CSMA/CA
    if (id === 'csma-protocols' || id === 'u2-csma-1-persistent' || id === 'u2-csma-non-persistent' || id === 'u2-csma-p-persistent' || id === 'u2-csma-cd' || id === 'u2-csma-ca' || id === 'u2-csma-cd-operation' || id === 'u2-binary-exponential-backoff' || id === 'u2-comparison-multiple-access') {
      return this.renderCsmaDiagram();
    }`;

const newRouting = `    // 6a. CSMA Persistence Modes (1-Persistent, Non-Persistent, p-Persistent)
    if (id === 'csma-protocols' || id === 'u2-csma-1-persistent' || id === 'u2-csma-non-persistent' || id === 'u2-csma-p-persistent' || id === 'u2-comparison-multiple-access') {
      return this.renderCsmaDiagram();
    }

    // 6b. CSMA/CD: Collision Detection & Binary Exponential Backoff
    if (id === 'u2-csma-cd' || id === 'u2-csma-cd-operation' || id === 'u2-binary-exponential-backoff') {
      return this.renderCsmaCdDiagram();
    }

    // 6c. CSMA/CA: Collision Avoidance & Interframe Spaces
    if (id === 'u2-csma-ca') {
      return this.renderCsmaCaDiagram();
    }`;

if (!code.includes(oldRouting)) {
  console.error("Could not find old routing block in cleanDiagramEngine.js");
  process.exit(1);
}

code = code.replace(oldRouting, newRouting);

// 2. Add renderCsmaCdDiagram and renderCsmaCaDiagram after renderCsmaDiagram
const csmaCdAndCaFunctions = `  // 7b. CSMA/CD Operation & Exponential Backoff Diagram
  renderCsmaCdDiagram: function() {
    return \`
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              CSMA/CD: Listen While Transmit & Collision Recovery Flow
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded font-bold">
            IEEE 802.3 Ethernet
          </span>
        </div>

        <!-- Operational Sequence Steps -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs mb-4">
          <div class="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm text-center">
            <div class="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-bold mx-auto flex items-center justify-center text-xs mb-1.5">1</div>
            <div class="font-bold text-slate-800 dark:text-slate-200">Carrier Sense</div>
            <p class="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Station listens to medium. If idle, begins transmission immediately (1-persistent).</p>
          </div>

          <div class="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm text-center">
            <div class="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 font-bold mx-auto flex items-center justify-center text-xs mb-1.5">2</div>
            <div class="font-bold text-slate-800 dark:text-slate-200">Transmit & Listen</div>
            <p class="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Transceiver monitors signal energy. Normal level: V = V_tx. Collision level: V &gt; 2 * V_tx.</p>
          </div>

          <div class="bg-white dark:bg-slate-800 p-3 rounded-lg border border-amber-200 dark:border-amber-700/60 shadow-sm text-center bg-amber-50/50 dark:bg-amber-950/20">
            <div class="w-6 h-6 rounded-full bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200 font-bold mx-auto flex items-center justify-center text-xs mb-1.5">3</div>
            <div class="font-bold text-amber-900 dark:text-amber-200">Send Jam Signal</div>
            <p class="text-[10px] text-amber-700 dark:text-amber-300 mt-1">Abort transmission immediately; broadcast 32-48 bit jamming pattern so all nodes detect collision.</p>
          </div>

          <div class="bg-white dark:bg-slate-800 p-3 rounded-lg border border-purple-200 dark:border-purple-700/60 shadow-sm text-center bg-purple-50/50 dark:bg-purple-950/20">
            <div class="w-6 h-6 rounded-full bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 font-bold mx-auto flex items-center justify-center text-xs mb-1.5">4</div>
            <div class="font-bold text-purple-900 dark:text-purple-200">Exponential Backoff</div>
            <p class="text-[10px] text-purple-700 dark:text-purple-300 mt-1">Increment attempt K (max 15). Pick random R &isin; [0, 2^K - 1]. Wait T_B = R &times; 512 bit-times.</p>
          </div>
        </div>

        <!-- Formula Callout Strip -->
        <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row items-center justify-between text-xs gap-3">
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-triangle-exclamation text-amber-500 text-sm"></i>
            <span class="font-bold text-slate-800 dark:text-slate-200">Minimum Frame Size Condition:</span>
            <span class="font-mono bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-[11px] font-semibold text-blue-600 dark:text-blue-400">
              L_min &ge; 2 &times; T_p &times; Bandwidth
            </span>
          </div>
          <div class="text-[10px] text-slate-500 dark:text-slate-400">
            Ensures sender transmits long enough (minimum 64 bytes in 10 Mbps Ethernet) to detect collision echoes.
          </div>
        </div>
      </div>
    \`;
  },

  // 7c. CSMA/CA Operation & Collision Avoidance Diagram
  renderCsmaCaDiagram: function() {
    return \`
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              CSMA/CA: Collision Avoidance Protocol Flow (DIFS, CW, RTS/CTS, ACK)
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded font-bold">
            IEEE 802.11 Wi-Fi
          </span>
        </div>

        <div class="space-y-3">
          <!-- Step Sequence Bar -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-2.5 text-xs text-center">
            <div class="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span class="font-bold text-slate-700 dark:text-slate-200 block mb-1">1. Carrier Sense</span>
              <p class="text-[10px] text-slate-500">Sense RF channel. Wait until channel becomes idle.</p>
            </div>
            <div class="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-300">
              <span class="font-bold block mb-1">2. Wait IFS (DIFS)</span>
              <p class="text-[10px]">Station waits Distributed Interframe Space to ensure medium is stably clear.</p>
            </div>
            <div class="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-300">
              <span class="font-bold block mb-1">3. Contention Window</span>
              <p class="text-[10px]">Select random slotted backoff r &isin; [0, CW-1]. Decrement while channel idle.</p>
            </div>
            <div class="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300">
              <span class="font-bold block mb-1">4. Transmit &amp; ACK</span>
              <p class="text-[10px]">Transmit frame. Wait SIFS. Receiver responds with immediate ACK packet.</p>
            </div>
          </div>

          <!-- Virtual Carrier Sensing (NAV) note -->
          <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs gap-3">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-clock text-blue-500 text-sm"></i>
              <span class="font-bold text-slate-800 dark:text-slate-200">Virtual Carrier Sensing (NAV):</span>
              <span class="text-[10px] text-slate-600 dark:text-slate-300">
                RTS/CTS frames contain Duration field. Hearing stations set Network Allocation Vector (NAV) timer and sleep to avoid collisions.
              </span>
            </div>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold shrink-0">
              Solves Hidden Station
            </span>
          </div>
        </div>
      </div>
    \`;
  },
`;

const targetAnchor = `  // 7. CSMA, CSMA/CD, CSMA/CA
  renderCsmaDiagram: function() {
    return \`
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Carrier Sense Multiple Access (CSMA) Architecture & Decision Flow
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded font-bold">
            Listen Before Talk
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs">
          <div class="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <span class="font-bold text-blue-600 dark:text-blue-400 block mb-1">1-Persistent CSMA</span>
            <p class="text-[10px] text-slate-500 mb-2">If idle: transmit immediately with probability 1. If busy: keep sensing continuously until idle.</p>
            <span class="text-[9px] font-mono px-1.5 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded">High Collision Risk on Busy Medium</span>
          </div>

          <div class="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <span class="font-bold text-purple-600 dark:text-purple-400 block mb-1">Non-Persistent CSMA</span>
            <p class="text-[10px] text-slate-500 mb-2">If idle: transmit. If busy: wait a random backoff time and re-sense later.</p>
            <span class="text-[9px] font-mono px-1.5 py-0.5 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 rounded">Reduces Collisions, Adds Latency</span>
          </div>

          <div class="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <span class="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">p-Persistent CSMA</span>
            <p class="text-[10px] text-slate-500 mb-2">If idle: transmit with probability p, or wait until next slot with probability (1 - p).</p>
            <span class="text-[9px] font-mono px-1.5 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded">Balanced Slotted Trade-off</span>
          </div>
        </div>
      </div>
    \`;
  },`;

if (!code.includes(targetAnchor)) {
  console.error("Could not find targetAnchor in cleanDiagramEngine.js");
  process.exit(1);
}

code = code.replace(targetAnchor, targetAnchor + "\n\n" + csmaCdAndCaFunctions);

fs.writeFileSync(filePath, code, 'utf8');
console.log("Successfully updated cleanDiagramEngine.js with CSMA/CD and CSMA/CA diagram renders!");
