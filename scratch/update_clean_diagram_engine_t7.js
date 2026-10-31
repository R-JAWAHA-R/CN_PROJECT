const fs = require('fs');

let code = fs.readFileSync('js/cleanDiagramEngine.js', 'utf8');

// 1. Update routing in getDiagramHtml
const oldRouting = `    // 9. Wireless LANs: Hidden & Exposed Terminals
    if (id === 'wireless-lan-protocols' || id === 'u2-wireless-lan-intro' || id === 'u2-wireless-communication-characteristics' || id === 'u2-wireless-lan-architecture' || id === 'u2-hidden-terminal-problem' || id === 'u2-exposed-terminal-problem' || id === 'u2-wireless-multiple-access' || id === 'u2-wireless-lan-access-methods' || id === 'u2-wireless-communication-challenges') {
      return this.renderWirelessHiddenExposedDiagram();
    }`;

const newRouting = `    // 9. Wireless LANs: Dedicated Visual Schematics for Topic 7
    if (id === 'u2-wireless-lan-architecture') {
      return this.renderBssEssArchitectureDiagram();
    }
    if (id === 'u2-hidden-terminal-problem') {
      return this.renderHiddenTerminalDiagram();
    }
    if (id === 'u2-exposed-terminal-problem') {
      return this.renderExposedTerminalDiagram();
    }
    if (id === 'u2-wireless-multiple-access') {
      return this.renderWirelessMultipleAccessDiagram();
    }
    if (id === 'u2-wireless-lan-access-methods') {
      return this.renderDcfPcfDiagram();
    }
    if (id === 'wireless-lan-protocols' || id === 'u2-wireless-lan-intro' || id === 'u2-wireless-characteristics' || id === 'u2-wireless-communication-characteristics' || id === 'u2-wireless-communication-challenges') {
      return this.renderWirelessHiddenExposedDiagram();
    }`;

if (!code.includes(oldRouting)) {
  console.error("Could not find old routing block in cleanDiagramEngine.js");
  process.exit(1);
}

code = code.replace(oldRouting, newRouting);

// 2. Add the new diagram rendering functions right above renderWirelessHiddenExposedDiagram
const marker = '  renderWirelessHiddenExposedDiagram: function() {';

const newDiagramMethods = `  renderBssEssArchitectureDiagram: function() {
    return \`
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              IEEE 802.11 Architecture: BSS, ESS & Distribution System (DS)
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded font-bold">
            Forouzan Ch. 14 / Tanenbaum Ch. 4
          </span>
        </div>

        <!-- Backbone: Distribution System -->
        <div class="mb-4 p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl text-center">
          <div class="text-xs font-bold text-blue-800 dark:text-blue-300 flex items-center justify-center gap-2 mb-1">
            <i class="fa-solid fa-network-wired text-sm"></i> Distribution System (DS) Backbone (Wired 802.3 Ethernet / Switch)
          </div>
          <p class="text-[11px] text-blue-700 dark:text-blue-400">Interconnects Access Points (APs) to integrate multiple BSSs into a unified, seamless Extended Service Set (ESS)</p>
          <div class="mt-2 flex items-center justify-center gap-12">
            <div class="h-6 w-0.5 bg-blue-400 border-dashed border-l"></div>
            <div class="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-semibold">&larr; High-Speed Wired Backbone &rarr;</div>
            <div class="h-6 w-0.5 bg-blue-400 border-dashed border-l"></div>
          </div>
        </div>

        <!-- Two BSS Cells in ESS -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- BSS 1 (Infrastructure) -->
          <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border-2 border-emerald-500/30 dark:border-emerald-500/20 relative shadow-sm">
            <div class="flex items-center justify-between mb-3">
              <span class="font-bold text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <i class="fa-solid fa-wifi"></i> BSS 1 (Infrastructure Mode)
              </span>
              <span class="text-[10px] font-mono bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded">
                Cell 1
              </span>
            </div>

            <!-- Central AP -->
            <div class="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 rounded-lg text-center mb-3">
              <div class="font-bold text-xs text-emerald-900 dark:text-emerald-200 flex items-center justify-center gap-1.5">
                <i class="fa-solid fa-tower-broadcast"></i> Access Point 1 (AP 1)
              </div>
              <div class="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono mt-0.5">BSSID: 00:11:22:33:44:01</div>
            </div>

            <!-- Mobile Stations -->
            <div class="grid grid-cols-2 gap-2 text-center">
              <div class="p-2 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600">
                <div class="font-semibold text-xs text-slate-800 dark:text-slate-200"><i class="fa-solid fa-laptop text-emerald-600"></i> Station A</div>
                <div class="text-[10px] text-slate-500 font-mono">Associated</div>
              </div>
              <div class="p-2 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600">
                <div class="font-semibold text-xs text-slate-800 dark:text-slate-200"><i class="fa-solid fa-mobile-screen text-emerald-600"></i> Station B</div>
                <div class="text-[10px] text-slate-500 font-mono">Associated</div>
              </div>
            </div>
          </div>

          <!-- BSS 2 (Infrastructure) -->
          <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border-2 border-emerald-500/30 dark:border-emerald-500/20 relative shadow-sm">
            <div class="flex items-center justify-between mb-3">
              <span class="font-bold text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <i class="fa-solid fa-wifi"></i> BSS 2 (Infrastructure Mode)
              </span>
              <span class="text-[10px] font-mono bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded">
                Cell 2
              </span>
            </div>

            <!-- Central AP -->
            <div class="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 rounded-lg text-center mb-3">
              <div class="font-bold text-xs text-emerald-900 dark:text-emerald-200 flex items-center justify-center gap-1.5">
                <i class="fa-solid fa-tower-broadcast"></i> Access Point 2 (AP 2)
              </div>
              <div class="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono mt-0.5">BSSID: 00:11:22:33:44:02</div>
            </div>

            <!-- Mobile Stations -->
            <div class="grid grid-cols-2 gap-2 text-center">
              <div class="p-2 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600">
                <div class="font-semibold text-xs text-slate-800 dark:text-slate-200"><i class="fa-solid fa-laptop text-emerald-600"></i> Station C</div>
                <div class="text-[10px] text-slate-500 font-mono">Associated</div>
              </div>
              <div class="p-2 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600">
                <div class="font-semibold text-xs text-slate-800 dark:text-slate-200"><i class="fa-solid fa-tablet text-emerald-600"></i> Station D</div>
                <div class="text-[10px] text-slate-500 font-mono">Associated</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Ad Hoc vs Infrastructure & Mobility Strip -->
        <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
          <div class="p-2.5 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg">
            <span class="font-bold text-purple-800 dark:text-purple-300 block mb-1"><i class="fa-solid fa-arrows-split-up-and-left"></i> Independent BSS (Ad Hoc / IBSS)</span>
            <p class="text-purple-700 dark:text-purple-400">Peer-to-peer communication without an AP. Devices communicate directly within mutual radio range. No DS or internet uplink.</p>
          </div>
          <div class="p-2.5 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 rounded-lg">
            <span class="font-bold text-indigo-800 dark:text-indigo-300 block mb-1"><i class="fa-solid fa-person-walking"></i> 3 Levels of IEEE 802.11 Mobility</span>
            <p class="text-indigo-700 dark:text-indigo-400"><strong>1. No-Transition:</strong> Static within BSS. <strong>2. BSS-Transition:</strong> Roams between AP1 &rarr; AP2 in same ESS. <strong>3. ESS-Transition:</strong> Leaves ESS (session disruption).</p>
          </div>
        </div>
      </div>
    \`;
  },

  renderHiddenTerminalDiagram: function() {
    return \`
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Hidden Station Problem & RTS / CTS Handshake Solution
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 px-2 py-0.5 rounded font-bold">
            RF Asymmetry Solution
          </span>
        </div>

        <!-- Problem Visualization -->
        <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-red-200 dark:border-red-900/40 mb-4">
          <h5 class="font-bold text-xs text-red-700 dark:text-red-400 mb-2 flex items-center gap-1.5">
            <i class="fa-solid fa-triangle-exclamation"></i> The Problem: Hidden Collisions at Central Station (AP)
          </h5>
          <div class="grid grid-cols-3 gap-2 text-center items-center py-2">
            <div class="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-lg">
              <div class="font-bold text-xs text-red-800 dark:text-red-300">Station B</div>
              <div class="text-[10px] text-red-600 dark:text-red-400 mt-1">Transmits to A &rarr;</div>
              <div class="text-[9px] text-gray-500 mt-0.5">Senses channel: IDLE</div>
            </div>
            <div class="p-3 bg-amber-50 dark:bg-amber-950/40 border-2 border-red-500 rounded-lg">
              <div class="font-bold text-xs text-amber-900 dark:text-amber-200"><i class="fa-solid fa-tower-broadcast"></i> Station A (AP)</div>
              <div class="text-[10px] font-bold text-red-600 dark:text-red-400 mt-1"><i class="fa-solid fa-burst"></i> COLLISION!</div>
              <div class="text-[9px] text-gray-600 dark:text-gray-400 mt-0.5">Hears B & C simultaneously</div>
            </div>
            <div class="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-lg">
              <div class="font-bold text-xs text-red-800 dark:text-red-300">Station C</div>
              <div class="text-[10px] text-red-600 dark:text-red-400 mt-1">&larr; Transmits to A</div>
              <div class="text-[9px] text-gray-500 mt-0.5">Senses channel: IDLE</div>
            </div>
          </div>
          <p class="text-[11px] text-gray-600 dark:text-gray-400 mt-2 text-center italic">Station B and C are mutually out of radio range. Both sense channel IDLE and transmit at the same time, colliding at Station A.</p>
        </div>

        <!-- Solution: 4-Way RTS/CTS Handshake with NAV -->
        <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/40">
          <h5 class="font-bold text-xs text-emerald-700 dark:text-emerald-400 mb-3 flex items-center gap-1.5">
            <i class="fa-solid fa-circle-check"></i> The Solution: 4-Way RTS/CTS Virtual Carrier Sensing
          </h5>
          <div class="space-y-2 text-xs">
            <div class="flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-700/40 rounded-lg">
              <span class="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-xs">1</span>
              <div><strong>B &rarr; A: RTS (Request To Send):</strong> Station B asks Station A for transmission time. (C is out of range, does not hear RTS).</div>
            </div>
            <div class="flex items-center gap-3 p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg">
              <span class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-xs">2</span>
              <div><strong>A &rarr; Broadcast: CTS (Clear To Send):</strong> Station A broadcasts CTS with NAV reservation. <strong>Station C hears CTS</strong> and defers!</div>
            </div>
            <div class="flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-700/40 rounded-lg">
              <span class="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-xs">3</span>
              <div><strong>B &rarr; A: DATA Frame:</strong> Station B transmits collision-free payload. Station C sleeps (NAV timer running).</div>
            </div>
            <div class="flex items-center gap-3 p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg">
              <span class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-xs">4</span>
              <div><strong>A &rarr; B: ACK:</strong> Station A confirms successful reception. Medium is released.</div>
            </div>
          </div>
        </div>
      </div>
    \`;
  },

  renderExposedTerminalDiagram: function() {
    return \`
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Exposed Station Problem & Channel Inefficiency
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded font-bold">
            Unnecessary Deferral
          </span>
        </div>

        <!-- 4-Station Topology -->
        <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 mb-4">
          <div class="grid grid-cols-4 gap-2 text-center text-xs">
            <div class="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div class="font-bold text-blue-800 dark:text-blue-300">Station B</div>
              <div class="text-[10px] text-blue-600 mt-1">&larr; Receives from A</div>
              <div class="text-[9px] text-gray-500">Out of C's range</div>
            </div>
            <div class="p-3 bg-purple-50 dark:bg-purple-950/40 border-2 border-purple-400 rounded-lg">
              <div class="font-bold text-purple-900 dark:text-purple-200">Station A</div>
              <div class="text-[10px] text-purple-600 mt-1">Transmits &rarr; B</div>
              <div class="text-[9px] text-emerald-600 font-semibold">Active TX</div>
            </div>
            <div class="p-3 bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-400 rounded-lg">
              <div class="font-bold text-amber-900 dark:text-amber-200">Station C</div>
              <div class="text-[10px] text-amber-700 mt-1">Wants to send to D</div>
              <div class="text-[9px] text-red-600 font-bold">Exposed & Blocked</div>
            </div>
            <div class="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div class="font-bold text-blue-800 dark:text-blue-300">Station D</div>
              <div class="text-[10px] text-blue-600 mt-1">&larr; Waiting for C</div>
              <div class="text-[9px] text-gray-500">Out of A's range</div>
            </div>
          </div>
        </div>

        <!-- Explanation Comparison Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div class="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
            <span class="font-bold text-red-700 dark:text-red-300 block mb-1">
              <i class="fa-solid fa-ban"></i> Why Station C Erroneously Defers
            </span>
            <p class="text-red-700 dark:text-red-400 leading-relaxed">
              Station C senses the medium, hears Station A's transmission, and concludes the channel is busy. C backs off and postpones its transmission to Station D.
            </p>
          </div>
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg">
            <span class="font-bold text-emerald-700 dark:text-emerald-300 block mb-1">
              <i class="fa-solid fa-check"></i> Why Both Transmissions Could Coexist
            </span>
            <p class="text-emerald-700 dark:text-emerald-400 leading-relaxed">
              Station D is out of range of Station A. Station B is out of range of Station C. Thus, A &rarr; B and C &rarr; D could proceed simultaneously with ZERO interference!
            </p>
          </div>
        </div>
      </div>
    \`;
  },

  renderWirelessMultipleAccessDiagram: function() {
    return \`
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Why Wireless LANs Use CSMA/CA Instead of CSMA/CD
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded font-bold">
            RF Physical Constraints
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs mb-4">
          <!-- Reason 1 -->
          <div class="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
            <div class="font-bold text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-1.5">
              <i class="fa-solid fa-volume-xmark"></i> 1. Transceiver Blindness
            </div>
            <p class="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
              Transmitted power is millions of times stronger than received signals. The sender's own transmission drowns out incoming collision energy on the same antenna.
            </p>
          </div>
          <!-- Reason 2 -->
          <div class="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
            <div class="font-bold text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-1.5">
              <i class="fa-solid fa-eye-slash"></i> 2. Hidden Stations
            </div>
            <p class="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
              Collisions occur at the <em>receiver</em>, not at the sender. A transmitting station cannot detect a collision taking place at an AP beyond its radio horizon.
            </p>
          </div>
          <!-- Reason 3 -->
          <div class="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
            <div class="font-bold text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-1.5">
              <i class="fa-solid fa-chart-line-down"></i> 3. Signal Attenuation
            </div>
            <p class="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
              Wireless signal power decays rapidly with distance ($P \\propto 1/d^2$ or $1/d^4$). Collision energy dissipates before traveling back to the distant sender.
            </p>
          </div>
        </div>

        <!-- CSMA/CD vs CSMA/CA Comparison Bar -->
        <div class="p-3 bg-slate-100 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 font-bold rounded text-[10px]">CSMA/CD (Wired)</span>
            <span class="text-slate-600 dark:text-slate-300">Transmit &rarr; Listen for Collision &rarr; Abort & Send Jam</span>
          </div>
          <div class="font-bold text-blue-600 dark:text-blue-400">&hArr;</div>
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold rounded text-[10px]">CSMA/CA (Wireless)</span>
            <span class="text-slate-600 dark:text-slate-300">Listen &rarr; DIFS &rarr; Random Backoff &rarr; RTS/CTS &rarr; DATA &rarr; ACK</span>
          </div>
        </div>
      </div>
    \`;
  },

  renderDcfPcfDiagram: function() {
    return \`
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-violet-500 animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              IEEE 802.11 MAC Access Methods: DCF vs. PCF
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-violet-100 dark:bg-violet-950 text-violet-800 dark:text-violet-300 px-2 py-0.5 rounded font-bold">
            Contention vs. Polling
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-4">
          <!-- DCF Card -->
          <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border-2 border-blue-500/30 dark:border-blue-500/20 shadow-sm">
            <div class="flex items-center justify-between mb-2">
              <span class="font-bold text-blue-700 dark:text-blue-400 text-xs flex items-center gap-1.5">
                <i class="fa-solid fa-users"></i> Distributed Coordination Function (DCF)
              </span>
              <span class="text-[10px] bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-bold px-1.5 py-0.5 rounded">
                MANDATORY
              </span>
            </div>
            <ul class="space-y-1.5 text-slate-600 dark:text-slate-300 text-[11px]">
              <li>&bull; <strong>Operation:</strong> Contention-based access using CSMA/CA</li>
              <li>&bull; <strong>Control:</strong> Fully distributed; stations compete equally</li>
              <li>&bull; <strong>Traffic Type:</strong> Best-effort asynchronous data (web, email)</li>
              <li>&bull; <strong>IFS Used:</strong> DIFS (DCF Interframe Space)</li>
              <li>&bull; <strong>Modes:</strong> Supported in both Ad Hoc and Infrastructure</li>
            </ul>
          </div>

          <!-- PCF Card -->
          <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border-2 border-violet-500/30 dark:border-violet-500/20 shadow-sm">
            <div class="flex items-center justify-between mb-2">
              <span class="font-bold text-violet-700 dark:text-violet-400 text-xs flex items-center gap-1.5">
                <i class="fa-solid fa-crown"></i> Point Coordination Function (PCF)
              </span>
              <span class="text-[10px] bg-violet-100 dark:bg-violet-950 text-violet-800 dark:text-violet-300 font-bold px-1.5 py-0.5 rounded">
                OPTIONAL
              </span>
            </div>
            <ul class="space-y-1.5 text-slate-600 dark:text-slate-300 text-[11px]">
              <li>&bull; <strong>Operation:</strong> Contention-free access using centralized polling</li>
              <li>&bull; <strong>Control:</strong> Centralized Point Coordinator inside Access Point (AP)</li>
              <li>&bull; <strong>Traffic Type:</strong> Time-sensitive real-time traffic (VoIP, streaming)</li>
              <li>&bull; <strong>IFS Used:</strong> PIFS (higher priority than DIFS)</li>
              <li>&bull; <strong>Modes:</strong> Only available in Infrastructure mode</li>
            </ul>
          </div>
        </div>

        <!-- Superframe Timeline -->
        <div class="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
          <div class="font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
            <i class="fa-solid fa-timeline"></i> IEEE 802.11 Superframe Structure (PCF + DCF Alternation)
          </div>
          <div class="flex rounded-lg overflow-hidden border border-slate-300 dark:border-slate-600 font-mono text-[10px] text-center font-bold">
            <div class="w-12 bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 py-2 border-r border-slate-300 dark:border-slate-600 shrink-0">
              Beacon
            </div>
            <div class="w-1/2 bg-violet-100 dark:bg-violet-950 text-violet-900 dark:text-violet-200 py-2 border-r border-slate-300 dark:border-slate-600">
              Contention-Free Period (CFP) &mdash; PCF Polling
            </div>
            <div class="w-1/2 bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-200 py-2">
              Contention Period (CP) &mdash; DCF CSMA/CA
            </div>
          </div>
          <p class="text-[10px] text-slate-500 mt-2 text-center">During CFP, the AP polls registered stations one by one. During CP, stations contend for channel access via DCF.</p>
        </div>
      </div>
    \`;
  },
`;

code = code.replace(marker, newDiagramMethods + '\n' + marker);

fs.writeFileSync('js/cleanDiagramEngine.js', code, 'utf8');
console.log('Successfully updated cleanDiagramEngine.js with Topic 7 clean diagrams!');

