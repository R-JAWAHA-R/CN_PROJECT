// update_clean_diagram_engine.js
const fs = require('fs');
const path = require('path');

const enginePath = path.join(__dirname, '..', 'js', 'cleanDiagramEngine.js');
let code = fs.readFileSync(enginePath, 'utf8');

// 1. Update routing in getDiagramHtml
const oldRouting = `    // 4. Channel Allocation (FDMA & TDMA)
    if (id === 'channel-allocation' || id === 'u2-mac-sublayer-intro' || id === 'u2-need-for-mac-sublayer' || id === 'u2-mac-functions-responsibilities' || id === 'u2-fdma' || id === 'u2-tdma' || id === 'u2-dynamic-channel-allocation' || id === 'u2-static-vs-dynamic-channel-allocation') {
      return this.renderChannelAllocationDiagram();
    }`;

const newRouting = `    // 3b. MAC Sublayer & IEEE 802 Architecture
    if (id === 'u2-mac-sublayer-intro' || id === 'u2-mac-functions-responsibilities') {
      return this.renderMacSublayerDiagram();
    }

    // 3c. Need for MAC: Signal Collision on Shared Media
    if (id === 'u2-need-for-mac-sublayer') {
      return this.renderCollisionDiagram();
    }

    // 4. Channel Allocation (Static FDMA & TDMA)
    if (id === 'channel-allocation' || id === 'u2-fdma' || id === 'u2-tdma') {
      return this.renderChannelAllocationDiagram();
    }

    // 4b. Dynamic Channel Allocation Taxonomy
    if (id === 'u2-dynamic-channel-allocation' || id === 'u2-static-vs-dynamic-channel-allocation') {
      return this.renderDynamicAccessDiagram();
    }`;

if (code.includes(oldRouting)) {
  code = code.replace(oldRouting, newRouting);
  console.log("Updated routing in getDiagramHtml");
} else {
  console.log("Old routing not found; checking alternatives");
}

// 2. Add renderMacSublayerDiagram, renderCollisionDiagram, renderDynamicAccessDiagram before closing brace
const newMethods = `
  // 3b. IEEE 802 Architecture: LLC vs MAC Sublayers
  renderMacSublayerDiagram: function() {
    return \`
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              IEEE 802 Architecture: Data Link Layer Sublayer Division
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded font-bold">
            OSI Layer 2
          </span>
        </div>

        <div class="space-y-3">
          <!-- Layer 3 Network Interface -->
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-dashed border-slate-300 dark:border-slate-700 text-center">
            <div class="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Layer 3: Network Layer (IP / IPv6 Packets)
            </div>
          </div>

          <div class="flex justify-center text-slate-400 text-xs">
            <i class="fa-solid fa-arrow-down text-blue-500"></i>
          </div>

          <!-- LLC Sublayer Card -->
          <div class="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border-2 border-blue-300 dark:border-blue-800 shadow-sm">
            <div class="flex items-center justify-between pb-2 mb-2 border-b border-blue-200 dark:border-blue-800">
              <span class="font-bold text-xs text-blue-800 dark:text-blue-300 flex items-center gap-1.5">
                <i class="fa-solid fa-layer-group text-blue-600"></i>
                Logical Link Control (LLC) Sublayer — IEEE 802.2
              </span>
              <span class="text-[9px] font-mono bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-1.5 py-0.5 rounded font-bold">Upper Layer 2</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-700 dark:text-slate-300">
              <div class="bg-white/80 dark:bg-slate-900/80 p-2 rounded border border-blue-100 dark:border-blue-900">
                <div class="font-bold text-blue-700 dark:text-blue-400 text-[10px] uppercase">Flow Control</div>
                <div>Paces transmission rate to protect receiver buffer.</div>
              </div>
              <div class="bg-white/80 dark:bg-slate-900/80 p-2 rounded border border-blue-100 dark:border-blue-900">
                <div class="font-bold text-blue-700 dark:text-blue-400 text-[10px] uppercase">Error Control</div>
                <div>End-to-end link level ACKs and retransmissions.</div>
              </div>
              <div class="bg-white/80 dark:bg-slate-900/80 p-2 rounded border border-blue-100 dark:border-blue-900">
                <div class="font-bold text-blue-700 dark:text-blue-400 text-[10px] uppercase">SAP Multiplexing</div>
                <div>Identifies destination Network Layer protocol.</div>
              </div>
            </div>
            <div class="text-[10px] text-blue-600 dark:text-blue-400 italic mt-2 text-center">
              * Media-Independent: Identical across all physical wire types and wireless radios.
            </div>
          </div>

          <div class="flex justify-center text-slate-400 text-xs">
            <i class="fa-solid fa-arrow-down text-emerald-500"></i>
          </div>

          <!-- MAC Sublayer Card -->
          <div class="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border-2 border-emerald-300 dark:border-emerald-800 shadow-sm">
            <div class="flex items-center justify-between pb-2 mb-2 border-b border-emerald-200 dark:border-emerald-800">
              <span class="font-bold text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <i class="fa-solid fa-network-wired text-emerald-600"></i>
                Medium Access Control (MAC) Sublayer — IEEE 802.3 / 802.11 / 802.15
              </span>
              <span class="text-[9px] font-mono bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-1.5 py-0.5 rounded font-bold">Lower Layer 2</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-4 gap-2 text-[11px] text-slate-700 dark:text-slate-300">
              <div class="bg-white/80 dark:bg-slate-900/80 p-2 rounded border border-emerald-100 dark:border-emerald-900">
                <div class="font-bold text-emerald-700 dark:text-emerald-400 text-[10px] uppercase">Medium Access</div>
                <div>Arbitrates when stations are permitted to transmit.</div>
              </div>
              <div class="bg-white/80 dark:bg-slate-900/80 p-2 rounded border border-emerald-100 dark:border-emerald-900">
                <div class="font-bold text-emerald-700 dark:text-emerald-400 text-[10px] uppercase">MAC Addressing</div>
                <div>48-bit hardware station IDs (Source & Destination).</div>
              </div>
              <div class="bg-white/80 dark:bg-slate-900/80 p-2 rounded border border-emerald-100 dark:border-emerald-900">
                <div class="font-bold text-emerald-700 dark:text-emerald-400 text-[10px] uppercase">Frame Delimiting</div>
                <div>Preambles, SFD flags, and byte stuffing.</div>
              </div>
              <div class="bg-white/80 dark:bg-slate-900/80 p-2 rounded border border-emerald-100 dark:border-emerald-900">
                <div class="font-bold text-emerald-700 dark:text-emerald-400 text-[10px] uppercase">Collision Handling</div>
                <div>CSMA/CD jam signals and exponential backoff.</div>
              </div>
            </div>
            <div class="text-[10px] text-emerald-600 dark:text-emerald-400 italic mt-2 text-center">
              * Media-Specific: Adapts specifically to Ethernet, Wi-Fi radio, or fiber media.
            </div>
          </div>

          <div class="flex justify-center text-slate-400 text-xs">
            <i class="fa-solid fa-arrow-down text-slate-400"></i>
          </div>

          <!-- Layer 1 Physical Layer Interface -->
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-dashed border-slate-300 dark:border-slate-700 text-center">
            <div class="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Layer 1: Physical Layer (Twisted-Pair, Coaxial Bus, Fiber Optic, Radio Waves)
            </div>
          </div>
        </div>
      </div>
    \`;
  },

  // 3c. Signal Collision on Shared Medium
  renderCollisionDiagram: function() {
    return \`
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              The 5-Computer Shared Bus Collision Scenario
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 px-2 py-0.5 rounded font-bold">
            Interference & Packet Loss
          </span>
        </div>

        <div class="space-y-4">
          <!-- Shared Cable with 5 Computers -->
          <div class="bg-white dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <!-- 5 Computer Icons -->
            <div class="grid grid-cols-5 gap-2 text-center mb-3">
              <div class="p-2 rounded bg-blue-50 dark:bg-blue-950/60 border-2 border-blue-500 text-xs font-bold text-blue-800 dark:text-blue-300">
                <i class="fa-solid fa-desktop text-base mb-1 block text-blue-600"></i>
                Computer 1<br><span class="text-[9px] text-emerald-600 font-extrabold uppercase">Transmitting!</span>
              </div>
              <div class="p-2 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-500">
                <i class="fa-solid fa-desktop text-base mb-1 block"></i>
                Computer 2<br><span class="text-[9px] text-slate-400">Idle</span>
              </div>
              <div class="p-2 rounded bg-rose-50 dark:bg-rose-950/60 border-2 border-rose-500 text-xs font-bold text-rose-800 dark:text-rose-300">
                <i class="fa-solid fa-desktop text-base mb-1 block text-rose-600"></i>
                Computer 3<br><span class="text-[9px] text-rose-600 font-extrabold uppercase">Transmitting!</span>
              </div>
              <div class="p-2 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-500">
                <i class="fa-solid fa-desktop text-base mb-1 block"></i>
                Computer 4<br><span class="text-[9px] text-slate-400">Idle</span>
              </div>
              <div class="p-2 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-500">
                <i class="fa-solid fa-desktop text-base mb-1 block"></i>
                Computer 5<br><span class="text-[9px] text-slate-400">Idle</span>
              </div>
            </div>

            <!-- Taps down to cable -->
            <div class="grid grid-cols-5 text-center text-slate-300 dark:text-slate-600 text-xs -my-1">
              <span>│</span><span>│</span><span>│</span><span>│</span><span>│</span>
            </div>

            <!-- Coaxial Bus Cable -->
            <div class="relative w-full h-8 bg-slate-800 dark:bg-slate-950 rounded flex items-center justify-between px-2 text-[10px] font-mono text-slate-400">
              <span class="bg-slate-700 px-1.5 py-0.5 rounded text-amber-400 font-bold">50Ω Terminator</span>
              
              <!-- Collision Waveform in middle -->
              <div class="flex items-center gap-2 bg-rose-600 text-white px-3 py-1 rounded-full font-bold text-xs animate-bounce shadow-lg">
                <i class="fa-solid fa-explosion"></i>
                <span>COLLISION POINT (+2V Overlap)</span>
                <i class="fa-solid fa-triangle-exclamation"></i>
              </div>

              <span class="bg-slate-700 px-1.5 py-0.5 rounded text-amber-400 font-bold">50Ω Terminator</span>
            </div>
            <div class="text-center text-[11px] font-mono text-slate-500 mt-1">
              Shared Coaxial / Radio Broadcast Transmission Medium
            </div>
          </div>

          <!-- Outcome Explanation -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div class="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-lg">
              <div class="font-bold text-rose-800 dark:text-rose-300 mb-1">1. Signal Distortion</div>
              <p class="text-slate-600 dark:text-slate-300 text-[11px]">Voltages superimpose linearly, distorting digital pulse shapes beyond detection thresholds.</p>
            </div>
            <div class="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-lg">
              <div class="font-bold text-amber-800 dark:text-amber-300 mb-1">2. CRC Failure</div>
              <p class="text-slate-600 dark:text-slate-300 text-[11px]">All receiving nodes detect checksum failure and immediately discard the garbled bits.</p>
            </div>
            <div class="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-lg">
              <div class="font-bold text-blue-800 dark:text-blue-300 mb-1">3. MAC Coordination</div>
              <p class="text-slate-600 dark:text-slate-300 text-[11px]">MAC protocol senses carrier, broadcasts 48-bit jam signal, and executes randomized backoff.</p>
            </div>
          </div>
        </div>
      </div>
    \`;
  },

  // 4b. Dynamic Channel Allocation Taxonomy
  renderDynamicAccessDiagram: function() {
    return \`
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Multiple Access Protocol Taxonomy (Forouzan Chapter 12)
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded font-bold">
            Dynamic & Channelized
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- 1. Random Access -->
          <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border-t-4 border-t-amber-500 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between pb-1 mb-2 border-b border-slate-100 dark:border-slate-700">
                <span class="font-bold text-xs text-amber-700 dark:text-amber-400">1. Random Access</span>
                <span class="text-[9px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-1.5 py-0.5 rounded">Contention</span>
              </div>
              <p class="text-[11px] text-slate-600 dark:text-slate-300 mb-2 leading-relaxed">
                Stations transmit at will without central coordination. Collisions are possible and handled by backoff algorithms.
              </p>
              <ul class="text-[10px] space-y-1 font-mono text-slate-700 dark:text-slate-300">
                <li>• Pure ALOHA (S = 18.4%)</li>
                <li>• Slotted ALOHA (S = 36.8%)</li>
                <li>• CSMA (1-P, Non-P, p-P)</li>
                <li>• CSMA/CD (Wired Ethernet)</li>
                <li>• CSMA/CA (Wi-Fi 802.11)</li>
              </ul>
            </div>
            <div class="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700 text-[10px] text-amber-600 font-semibold text-center">
              Best for bursty, sporadic traffic
            </div>
          </div>

          <!-- 2. Controlled Access -->
          <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border-t-4 border-t-blue-500 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between pb-1 mb-2 border-b border-slate-100 dark:border-slate-700">
                <span class="font-bold text-xs text-blue-700 dark:text-blue-400">2. Controlled Access</span>
                <span class="text-[9px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 px-1.5 py-0.5 rounded">No Collisions</span>
              </div>
              <p class="text-[11px] text-slate-600 dark:text-slate-300 mb-2 leading-relaxed">
                Stations coordinate to determine who has right to transmit; exactly one station transmits at a time.
              </p>
              <ul class="text-[10px] space-y-1 font-mono text-slate-700 dark:text-slate-300">
                <li>• Reservation (Bit-Map)</li>
                <li>• Polling (Primary / Secondary)</li>
                <li>• Token Passing (Token Ring)</li>
                <li>• Binary Countdown</li>
              </ul>
            </div>
            <div class="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700 text-[10px] text-blue-600 font-semibold text-center">
              Best for high-load, heavy traffic
            </div>
          </div>

          <!-- 3. Channelization -->
          <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border-t-4 border-t-emerald-500 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between pb-1 mb-2 border-b border-slate-100 dark:border-slate-700">
                <span class="font-bold text-xs text-emerald-700 dark:text-emerald-400">3. Channelization</span>
                <span class="text-[9px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.5 rounded">Multiplexed</span>
              </div>
              <p class="text-[11px] text-slate-600 dark:text-slate-300 mb-2 leading-relaxed">
                Available channel capacity is divided by frequency, time slots, or orthogonal mathematical codes.
              </p>
              <ul class="text-[10px] space-y-1 font-mono text-slate-700 dark:text-slate-300">
                <li>• FDMA (Frequency Bands)</li>
                <li>• TDMA (Repeating Time Slots)</li>
                <li>• CDMA (Orthogonal Codes)</li>
                <li>• OFDMA (Wi-Fi 6 & 5G Cellular)</li>
              </ul>
            </div>
            <div class="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700 text-[10px] text-emerald-600 font-semibold text-center">
              Best for continuous stream/voice traffic
            </div>
          </div>
        </div>
      </div>
    \`;
  },
`;

// Insert new methods before closing of CleanDiagramEngine
const lastBraceIdx = code.lastIndexOf('};');
if (lastBraceIdx !== -1) {
  code = code.substring(0, lastBraceIdx) + newMethods + code.substring(lastBraceIdx);
  fs.writeFileSync(enginePath, code, 'utf8');
  console.log("Successfully added new clean diagram methods to cleanDiagramEngine.js!");
} else {
  console.error("Could not find closing brace in cleanDiagramEngine.js");
}

