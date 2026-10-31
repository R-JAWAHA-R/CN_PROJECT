const fs = require('fs');

let code = fs.readFileSync('js/cleanDiagramEngine.js', 'utf8');

// 1. Update routing in getDiagramHtml
const oldRouting = `    // 10. IEEE 802.11 MAC & RTS/CTS
    if (id === 'wifi-mac-sublayer' || id === 'u2-ieee-802-11-intro' || id === 'u2-ieee-802-11-architecture' || id === 'u2-ieee-802-11-dcf' || id === 'u2-ieee-802-11-pcf' || id === 'u2-ieee-802-11-csma-ca' || id === 'u2-ieee-802-11-ifs' || id === 'u2-rts-cts-mechanism' || id === 'u2-network-allocation-vector' || id === 'u2-ieee-802-11-frame-formats' || id === 'u2-dcf-vs-pcf') {
      return this.renderWifiRtsCtsDiagram();
    }`;

const newRouting = `    // 10. IEEE 802.11 MAC Sublayer: Dedicated Visual Schematics for Topic 8
    if (id === 'u2-ieee-802-11-frame-formats') {
      return this.renderWifiFrameFormatDiagram();
    }
    if (id === 'u2-ieee-802-11-ifs') {
      return this.renderWifiIfsDiagram();
    }
    if (id === 'u2-ieee-802-11-csma-ca' || id === 'u2-ieee-802-11-dcf') {
      return this.renderCsmaCaBackoffDiagram();
    }
    if (id === 'u2-network-allocation-vector') {
      return this.renderWifiNavDiagram();
    }
    if (id === 'u2-ieee-802-11-pcf' || id === 'u2-dcf-vs-pcf') {
      return this.renderDcfPcfDiagram();
    }
    if (id === 'u2-rts-cts-mechanism') {
      return this.renderWifiRtsCtsDiagram();
    }
    if (id === 'wifi-mac-sublayer' || id === 'u2-ieee-802-11-intro' || id === 'u2-ieee-802-11-architecture') {
      return this.renderWifiMacArchitectureDiagram();
    }`;

if (!code.includes(oldRouting)) {
  console.error("Could not find old routing block for Topic 10 in cleanDiagramEngine.js");
  process.exit(1);
}

code = code.replace(oldRouting, newRouting);

// 2. Add the new diagram rendering methods right above renderWifiRtsCtsDiagram
const marker = '  renderWifiRtsCtsDiagram: function() {';

const newDiagramMethods = `  renderWifiFrameFormatDiagram: function() {
    return \`
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              IEEE 802.11 General MAC Frame Format (Forouzan Ch. 14 / Section 9)
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded font-bold">
            Up to 34B Header + FCS
          </span>
        </div>

        <!-- Frame Structure Bar -->
        <div class="overflow-x-auto pb-2 mb-4">
          <div class="flex min-w-[700px] text-center font-mono text-[10px] rounded-lg overflow-hidden border border-slate-300 dark:border-slate-700 shadow-inner">
            <div class="w-24 bg-blue-600 text-white p-2 border-r border-blue-500">
              <span class="font-bold block">Frame Control</span>
              <span class="text-[9px] opacity-80">2 Bytes</span>
            </div>
            <div class="w-20 bg-blue-500 text-white p-2 border-r border-blue-400">
              <span class="font-bold block">Duration/ID</span>
              <span class="text-[9px] opacity-80">2 Bytes</span>
            </div>
            <div class="w-20 bg-indigo-600 text-white p-2 border-r border-indigo-500">
              <span class="font-bold block">Address 1</span>
              <span class="text-[9px] opacity-80">6 Bytes</span>
            </div>
            <div class="w-20 bg-indigo-600 text-white p-2 border-r border-indigo-500">
              <span class="font-bold block">Address 2</span>
              <span class="text-[9px] opacity-80">6 Bytes</span>
            </div>
            <div class="w-20 bg-indigo-600 text-white p-2 border-r border-indigo-500">
              <span class="font-bold block">Address 3</span>
              <span class="text-[9px] opacity-80">6 Bytes</span>
            </div>
            <div class="w-24 bg-purple-600 text-white p-2 border-r border-purple-500">
              <span class="font-bold block">Seq Control</span>
              <span class="text-[9px] opacity-80">2 Bytes</span>
            </div>
            <div class="w-20 bg-indigo-500 text-white p-2 border-r border-indigo-400">
              <span class="font-bold block">Address 4</span>
              <span class="text-[9px] opacity-80">6B (Opt)</span>
            </div>
            <div class="flex-1 bg-emerald-600 text-white p-2 border-r border-emerald-500">
              <span class="font-bold block">Frame Body (Payload)</span>
              <span class="text-[9px] opacity-80">0 &ndash; 2312 Bytes</span>
            </div>
            <div class="w-16 bg-rose-600 text-white p-2">
              <span class="font-bold block">FCS</span>
              <span class="text-[9px] opacity-80">4 Bytes</span>
            </div>
          </div>
        </div>

        <!-- Frame Control Breakdown (16 Bits) -->
        <div class="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 mb-4">
          <div class="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-1.5">
            <i class="fa-solid fa-microchip text-blue-500"></i> Frame Control Field: 16-Bit Subfield Breakdown
          </div>
          <div class="grid grid-cols-4 md:grid-cols-11 gap-1 text-center font-mono text-[9px]">
            <div class="p-1 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded">
              <div class="font-bold text-blue-700 dark:text-blue-300">Proto</div>
              <div class="text-slate-500">2b</div>
            </div>
            <div class="p-1 bg-blue-100 dark:bg-blue-900/40 border border-blue-300 dark:border-blue-700 rounded font-bold">
              <div class="text-blue-800 dark:text-blue-200">Type</div>
              <div class="text-slate-500">2b</div>
            </div>
            <div class="p-1 bg-blue-100 dark:bg-blue-900/40 border border-blue-300 dark:border-blue-700 rounded">
              <div class="font-bold text-blue-800 dark:text-blue-200">Subtype</div>
              <div class="text-slate-500">4b</div>
            </div>
            <div class="p-1 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded">
              <div class="font-bold text-indigo-700 dark:text-indigo-300">To DS</div>
              <div class="text-slate-500">1b</div>
            </div>
            <div class="p-1 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded">
              <div class="font-bold text-indigo-700 dark:text-indigo-300">From DS</div>
              <div class="text-slate-500">1b</div>
            </div>
            <div class="p-1 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded">
              <div class="font-semibold text-slate-700 dark:text-slate-300">MoreFrag</div>
              <div class="text-slate-500">1b</div>
            </div>
            <div class="p-1 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded">
              <div class="font-semibold text-slate-700 dark:text-slate-300">Retry</div>
              <div class="text-slate-500">1b</div>
            </div>
            <div class="p-1 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded">
              <div class="font-semibold text-slate-700 dark:text-slate-300">PwrMgmt</div>
              <div class="text-slate-500">1b</div>
            </div>
            <div class="p-1 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded">
              <div class="font-semibold text-slate-700 dark:text-slate-300">MoreData</div>
              <div class="text-slate-500">1b</div>
            </div>
            <div class="p-1 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded">
              <div class="font-semibold text-slate-700 dark:text-slate-300">Protect</div>
              <div class="text-slate-500">1b</div>
            </div>
            <div class="p-1 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded">
              <div class="font-semibold text-slate-700 dark:text-slate-300">Order</div>
              <div class="text-slate-500">1b</div>
            </div>
          </div>
          <p class="text-[10px] text-slate-500 mt-2"><strong>Frame Types:</strong> 00 = Management (Beacon, Probe), 01 = Control (RTS, CTS, ACK), 10 = Data.</p>
        </div>

        <!-- 4-Address Interpretation Table -->
        <div class="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
          <div class="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-1.5">
            <i class="fa-solid fa-address-book text-indigo-500"></i> Address Field Interpretation (Based on To DS / From DS bits)
          </div>
          <table class="w-full text-[11px] text-left border-collapse">
            <thead>
              <tr class="border-b border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold">
                <th class="py-1">To DS</th>
                <th class="py-1">From DS</th>
                <th class="py-1">Address 1 (RA)</th>
                <th class="py-1">Address 2 (TA)</th>
                <th class="py-1">Address 3</th>
                <th class="py-1">Address 4</th>
                <th class="py-1">Operational Context</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-[10px]">
              <tr><td>0</td><td>0</td><td>DA</td><td>SA</td><td>BSSID</td><td>Not used</td><td class="font-sans text-slate-500">Direct within BSS / Ad Hoc</td></tr>
              <tr><td>1</td><td>0</td><td>BSSID (AP)</td><td>SA</td><td>DA</td><td>Not used</td><td class="font-sans text-slate-500">Station &rarr; AP (To DS)</td></tr>
              <tr><td>0</td><td>1</td><td>DA</td><td>BSSID (AP)</td><td>SA</td><td>Not used</td><td class="font-sans text-slate-500">AP &rarr; Station (From DS)</td></tr>
              <tr><td>1</td><td>1</td><td>RA</td><td>TA</td><td>DA</td><td>SA</td><td class="font-sans text-slate-500">AP &rarr; AP Wireless Bridge / Mesh</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    \`;
  },

  renderWifiIfsDiagram: function() {
    return \`
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              IEEE 802.11 Interframe Spaces (IFS) Priority Hierarchy
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded font-bold">
            SIFS &lt; PIFS &lt; DIFS &lt; EIFS
          </span>
        </div>

        <!-- Priority Visual Ladder -->
        <div class="space-y-3 mb-4 text-xs">
          <!-- SIFS -->
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 rounded-lg">
            <div class="flex items-center justify-between mb-1">
              <span class="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <i class="fa-solid fa-bolt"></i> 1. SIFS (Short Interframe Space) &mdash; Highest Priority
              </span>
              <span class="font-mono text-[10px] bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-2 py-0.5 rounded font-bold">
                10 &ndash; 16 &mu;s
              </span>
            </div>
            <p class="text-[11px] text-emerald-700 dark:text-emerald-400">Used for immediate responses: ACK, CTS, and frame fragment bursts. Prevents contending stations from interrupting an ongoing transaction.</p>
          </div>

          <!-- PIFS -->
          <div class="p-3 bg-violet-50 dark:bg-violet-950/40 border border-violet-300 dark:border-violet-700 rounded-lg">
            <div class="flex items-center justify-between mb-1">
              <span class="font-bold text-violet-800 dark:text-violet-300 flex items-center gap-1.5">
                <i class="fa-solid fa-crown"></i> 2. PIFS (Point Coordination IFS) &mdash; Medium-High Priority
              </span>
              <span class="font-mono text-[10px] bg-violet-100 dark:bg-violet-900 text-violet-800 dark:text-violet-200 px-2 py-0.5 rounded font-bold">
                SIFS + 1 Slot = 30 &mu;s
              </span>
            </div>
            <p class="text-[11px] text-violet-700 dark:text-violet-400">Used strictly by the Point Coordinator (AP) during PCF polling. Grants the AP priority access to start the Contention-Free Period (CFP).</p>
          </div>

          <!-- DIFS -->
          <div class="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-300 dark:border-blue-700 rounded-lg">
            <div class="flex items-center justify-between mb-1">
              <span class="font-bold text-blue-800 dark:text-blue-300 flex items-center gap-1.5">
                <i class="fa-solid fa-users"></i> 3. DIFS (Distributed Coordination IFS) &mdash; Standard Priority
              </span>
              <span class="font-mono text-[10px] bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded font-bold">
                SIFS + 2 Slots = 50 &mu;s
              </span>
            </div>
            <p class="text-[11px] text-blue-700 dark:text-blue-400">Used by ordinary stations contending for channel access under DCF (CSMA/CA). Stations must wait DIFS before initiating backoff.</p>
          </div>

          <!-- EIFS -->
          <div class="p-3 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg">
            <div class="flex items-center justify-between mb-1">
              <span class="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <i class="fa-solid fa-triangle-exclamation"></i> 4. EIFS (Extended Interframe Space) &mdash; Lowest Priority
              </span>
              <span class="font-mono text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 px-2 py-0.5 rounded font-bold">
                Variable (&gt; DIFS)
              </span>
            </div>
            <p class="text-[11px] text-slate-600 dark:text-slate-400">Invoked when a station receives a frame that fails CRC-32 checksum. Enforces extended waiting to allow the sender to retransmit without collision.</p>
          </div>
        </div>

        <!-- Formulas Summary Box -->
        <div class="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg font-mono text-center text-xs">
          <span class="text-amber-900 dark:text-amber-200 font-bold block mb-1">Mathematical Timing Formulas (Forouzan Ch. 14 / Section 7.9):</span>
          <span class="text-amber-800 dark:text-amber-300">PIFS = SIFS + SlotTime &nbsp;&nbsp;|&nbsp;&nbsp; DIFS = SIFS + 2(SlotTime)</span>
        </div>
      </div>
    \`;
  },

  renderCsmaCaBackoffDiagram: function() {
    return \`
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              CSMA/CA Protocol Mechanics & Random Backoff Countdown
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded font-bold">
            Collision Avoidance Flow
          </span>
        </div>

        <!-- Step-by-Step Flow Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs mb-4">
          <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
            <div class="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center mx-auto mb-2 text-xs">1</div>
            <div class="font-bold text-slate-800 dark:text-slate-200">Carrier Sense</div>
            <p class="text-[11px] text-slate-500 mt-1">Monitors RF channel energy (CCA) and checks if NAV = 0.</p>
          </div>
          <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
            <div class="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center mx-auto mb-2 text-xs">2</div>
            <div class="font-bold text-slate-800 dark:text-slate-200">DIFS Deferral</div>
            <p class="text-[11px] text-slate-500 mt-1">If medium is idle, waits continuous DIFS interval (50 &mu;s).</p>
          </div>
          <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
            <div class="w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 font-bold flex items-center justify-center mx-auto mb-2 text-xs">3</div>
            <div class="font-bold text-slate-800 dark:text-slate-200">Random Backoff</div>
            <p class="text-[11px] text-slate-500 mt-1">Picks integer from [0, CW]. Decrements slot counter when idle.</p>
          </div>
          <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
            <div class="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center mx-auto mb-2 text-xs">4</div>
            <div class="font-bold text-slate-800 dark:text-slate-200">Transmit &amp; ACK</div>
            <p class="text-[11px] text-slate-500 mt-1">Transmits when counter = 0. Receiver returns ACK after SIFS.</p>
          </div>
        </div>

        <!-- Counter Freezing Highlight -->
        <div class="p-3 bg-slate-100 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
          <div class="font-bold text-slate-800 dark:text-slate-200 mb-1 flex items-center gap-1.5">
            <i class="fa-solid fa-pause text-amber-500"></i> Backoff Timer Freezing Rule:
          </div>
          <p class="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
            If another station begins transmitting while the backoff counter is running, the station <strong>freezes its counter</strong>. When the channel becomes idle again for DIFS, the station resumes counting down from its remaining frozen value (guaranteeing fairness).
          </p>
        </div>
      </div>
    \`;
  },

  renderWifiNavDiagram: function() {
    return \`
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Network Allocation Vector (NAV): Virtual vs. Physical Carrier Sensing
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 px-2 py-0.5 rounded font-bold">
            Virtual Reservation
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-4">
          <!-- Physical Carrier Sensing -->
          <div class="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <span class="font-bold text-blue-600 dark:text-blue-400 block mb-2 flex items-center gap-1.5">
              <i class="fa-solid fa-tower-broadcast"></i> Physical Carrier Sensing (PHY Layer)
            </span>
            <ul class="space-y-1.5 text-slate-600 dark:text-slate-300 text-[11px]">
              <li>&bull; <strong>Technique:</strong> Clear Channel Assessment (CCA) RF energy detection.</li>
              <li>&bull; <strong>Detection:</strong> Senses ongoing transmission on antenna interface.</li>
              <li>&bull; <strong>Weakness:</strong> Fails when colliding stations are hidden (out of range).</li>
              <li>&bull; <strong>Status:</strong> Reports physically IDLE even when AP is in collision!</li>
            </ul>
          </div>

          <!-- Virtual Carrier Sensing -->
          <div class="p-4 bg-white dark:bg-slate-800 rounded-xl border border-indigo-200 dark:border-indigo-800">
            <span class="font-bold text-indigo-600 dark:text-indigo-400 block mb-2 flex items-center gap-1.5">
              <i class="fa-solid fa-clock"></i> Virtual Carrier Sensing (MAC Layer NAV)
            </span>
            <ul class="space-y-1.5 text-slate-600 dark:text-slate-300 text-[11px]">
              <li>&bull; <strong>Technique:</strong> Countdown timer maintained inside station MAC.</li>
              <li>&bull; <strong>Detection:</strong> Reads <em>Duration</em> field from RTS/CTS/DATA frames.</li>
              <li>&bull; <strong>Strength:</strong> Solves hidden terminals by setting NAV from broadcast CTS.</li>
              <li>&bull; <strong>Status:</strong> Treats medium as virtually BUSY while NAV &gt; 0.</li>
            </ul>
          </div>
        </div>

        <!-- NAV Example Box -->
        <div class="p-3 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded-lg text-xs text-center">
          <span class="font-bold text-indigo-900 dark:text-indigo-200">Rule for Medium Access:</span>
          <span class="font-mono text-indigo-800 dark:text-indigo-300 block mt-1">Medium is IDLE &hArr; (Physical CCA == IDLE) AND (NAV == 0)</span>
        </div>
      </div>
    \`;
  },

  renderWifiMacArchitectureDiagram: function() {
    return \`
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              IEEE 802.11 Protocol Architecture: LLC, MAC &amp; PHY Layers
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded font-bold">
            Forouzan Figure 14.7
          </span>
        </div>

        <div class="space-y-2 text-xs">
          <!-- Layer 3 -->
          <div class="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-center font-bold text-slate-700 dark:text-slate-300">
            Network Layer (IP Packets)
          </div>

          <!-- LLC Sublayer -->
          <div class="p-2.5 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-lg text-center">
            <span class="font-bold text-blue-800 dark:text-blue-300">Logical Link Control (LLC - IEEE 802.2)</span>
            <p class="text-[10px] text-blue-600 dark:text-blue-400">Multiplexing, standardized upper-layer interface, framing</p>
          </div>

          <!-- MAC Sublayer with DCF and PCF -->
          <div class="p-3 bg-white dark:bg-slate-800 border-2 border-indigo-400 dark:border-indigo-600 rounded-xl">
            <span class="font-bold text-xs text-indigo-700 dark:text-indigo-300 block mb-2 text-center uppercase tracking-wider">
              IEEE 802.11 MAC Sublayer
            </span>
            <div class="grid grid-cols-2 gap-3">
              <div class="p-2.5 bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800 rounded-lg text-center">
                <span class="font-bold text-violet-800 dark:text-violet-300 block text-xs">Point Coordination Function (PCF)</span>
                <span class="text-[10px] text-violet-600 dark:text-violet-400">Contention-Free Polling (Optional)</span>
              </div>
              <div class="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-center">
                <span class="font-bold text-emerald-800 dark:text-emerald-300 block text-xs">Distributed Coordination Function (DCF)</span>
                <span class="text-[10px] text-emerald-600 dark:text-emerald-400">Contention CSMA/CA (Mandatory)</span>
              </div>
            </div>
          </div>

          <!-- Physical Layer -->
          <div class="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-center font-bold text-slate-700 dark:text-slate-300">
            Physical Layer (PHY &mdash; 2.4 GHz, 5 GHz, 6 GHz OFDM / DSSS / MIMO)
          </div>
        </div>
      </div>
    \`;
  },
`;

code = code.replace(marker, newDiagramMethods + '\n' + marker);

fs.writeFileSync('js/cleanDiagramEngine.js', code, 'utf8');
console.log('Successfully updated cleanDiagramEngine.js with Topic 8 dedicated diagrams!');

