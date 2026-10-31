// scratch/update_clean_diagram_engine_t6.js
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'js', 'cleanDiagramEngine.js');
let code = fs.readFileSync(filePath, 'utf8');

// 1. Replace routing for Topic 6
const oldRouting = `    // 8. Ethernet Architecture & Frame Format
    if (id === 'ethernet' || id === 'mac-address' || id === 'u2-ethernet-architecture' || id === 'u2-ethernet-mac-addressing' || id === 'u2-ethernet-frame-format' || id === 'u2-ethernet-mac-protocol' || id === 'u2-ethernet-evolution' || id === 'u2-ethernet-advantages-limitations' || id === 'arp') {
      return this.renderEthernetFrameDiagram();
    }`;

const newRouting = `    // 8a. Ethernet Architecture (LLC vs MAC Sublayers)
    if (id === 'u2-ethernet-architecture') {
      return this.renderEthernetArchitectureDiagram();
    }

    // 8b. Ethernet 48-Bit MAC Addressing & Address Types
    if (id === 'mac-address' || id === 'u2-ethernet-mac-addressing') {
      return this.renderMacAddressingDiagram();
    }

    // 8c. Ethernet Frame Format (IEEE 802.3 7-Field Structure)
    if (id === 'ethernet' || id === 'u2-ethernet-frame-format' || id === 'u2-ethernet-advantages-limitations' || id === 'arp') {
      return this.renderEthernetFrameDiagram();
    }

    // 8d. Ethernet CSMA/CD Operation & MAC Protocol
    if (id === 'u2-ethernet-mac-protocol' || id === 'u2-ethernet-csma-cd-operation') {
      return this.renderCsmaCdDiagram();
    }

    // 8e. Binary Exponential Backoff Algorithm Table & Calculation
    if (id === 'u2-binary-exponential-backoff') {
      return this.renderExponentialBackoffDiagram();
    }

    // 8f. Ethernet Evolution: Standard, Fast, Gigabit, 10-Gigabit
    if (id === 'u2-ethernet-types-evolution' || id === 'u2-ethernet-evolution') {
      return this.renderEthernetEvolutionDiagram();
    }`;

if (!code.includes(oldRouting)) {
  console.error("Could not find old routing for Ethernet in cleanDiagramEngine.js");
  process.exit(1);
}

code = code.replace(oldRouting, newRouting);

// 2. Add new diagram functions before renderEthernetFrameDiagram
const newDiagrams = `  // 9a. Ethernet Architecture: LLC vs MAC Sublayers Diagram
  renderEthernetArchitectureDiagram: function() {
    return \`
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              IEEE 802 LAN Model: Layer 2 LLC &amp; MAC Sublayer Architecture
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded font-bold">
            IEEE 802.2 / IEEE 802.3
          </span>
        </div>

        <div class="space-y-3 text-xs">
          <!-- Upper: Network Layer Interface -->
          <div class="p-2.5 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-800 text-center">
            <span class="font-bold text-blue-900 dark:text-blue-200 block text-[11px]">Layer 3: Network Layer (IP Datagrams)</span>
          </div>

          <div class="flex justify-center text-slate-400 text-xs my-0.5"><i class="fa-solid fa-arrow-down"></i></div>

          <!-- Data Link Layer split into LLC and MAC -->
          <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border-2 border-dashed border-emerald-300 dark:border-emerald-700 space-y-2.5">
            <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-1.5">
              <span class="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <i class="fa-solid fa-layer-group text-emerald-500"></i> OSI Layer 2: Data Link Layer Split
              </span>
              <span class="text-[10px] text-slate-400 font-mono">IEEE 802 Standard</span>
            </div>

            <!-- LLC Sublayer -->
            <div class="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded border border-emerald-200 dark:border-emerald-800">
              <div class="flex justify-between items-center mb-1">
                <span class="font-bold text-emerald-900 dark:text-emerald-200">1. Logical Link Control (LLC) &ndash; IEEE 802.2</span>
                <span class="text-[9px] font-mono bg-emerald-200 dark:bg-emerald-800 px-1.5 py-0.5 rounded text-emerald-900 dark:text-emerald-100 font-bold">Upper Sublayer</span>
              </div>
              <p class="text-[10px] text-slate-600 dark:text-slate-300">
                Interfaces directly with Network Layer. Identifies upper-layer protocols (EtherType/SAP), provides uniform service interface, and handles logical link flow/error control.
              </p>
            </div>

            <div class="flex justify-center text-slate-400 text-xs my-0.5"><i class="fa-solid fa-arrow-down"></i></div>

            <!-- MAC Sublayer -->
            <div class="p-2.5 bg-blue-50 dark:bg-blue-950/40 rounded border border-blue-200 dark:border-blue-800">
              <div class="flex justify-between items-center mb-1">
                <span class="font-bold text-blue-900 dark:text-blue-200">2. Media Access Control (MAC) &ndash; IEEE 802.3</span>
                <span class="text-[9px] font-mono bg-blue-200 dark:bg-blue-800 px-1.5 py-0.5 rounded text-blue-900 dark:text-blue-100 font-bold">Lower Sublayer</span>
              </div>
              <p class="text-[10px] text-slate-600 dark:text-slate-300">
                Adds 48-bit physical addresses (Source &amp; Destination MAC), builds Ethernet frames, arbitrates shared medium access (CSMA/CD), and appends CRC-32 Frame Check Sequence.
              </p>
            </div>
          </div>

          <div class="flex justify-center text-slate-400 text-xs my-0.5"><i class="fa-solid fa-arrow-down"></i></div>

          <!-- Lower: Physical Layer -->
          <div class="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
            <span class="font-bold text-slate-700 dark:text-slate-300 block text-[11px]">Layer 1: Physical Layer (Copper Twisted-Pair / Fiber Optic Bits)</span>
          </div>
        </div>
      </div>
    \`;
  },

  // 9b. Ethernet 48-Bit MAC Addressing Diagram
  renderMacAddressingDiagram: function() {
    return \`
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Ethernet Physical MAC Address: 48-Bit (6-Byte) Architecture
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded font-bold">
            12 Hex Digits
          </span>
        </div>

        <div class="space-y-4 text-xs">
          <!-- 6-Byte Hex Representation -->
          <div class="bg-white dark:bg-slate-800 p-3.5 rounded-lg border border-slate-200 dark:border-slate-700">
            <div class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Example MAC: 06:01:02:01:2C:4B</div>
            <div class="grid grid-cols-6 gap-1 font-mono text-center">
              <div class="p-2 rounded bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800">
                <span class="block text-[8px] text-slate-400">Byte 1</span>
                <span class="text-xs font-bold text-indigo-600 dark:text-indigo-400">06</span>
              </div>
              <div class="p-2 rounded bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800">
                <span class="block text-[8px] text-slate-400">Byte 2</span>
                <span class="text-xs font-bold text-indigo-600 dark:text-indigo-400">01</span>
              </div>
              <div class="p-2 rounded bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800">
                <span class="block text-[8px] text-slate-400">Byte 3</span>
                <span class="text-xs font-bold text-indigo-600 dark:text-indigo-400">02</span>
              </div>
              <div class="p-2 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span class="block text-[8px] text-slate-400">Byte 4</span>
                <span class="text-xs font-bold text-slate-700 dark:text-slate-300">01</span>
              </div>
              <div class="p-2 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span class="block text-[8px] text-slate-400">Byte 5</span>
                <span class="text-xs font-bold text-slate-700 dark:text-slate-300">2C</span>
              </div>
              <div class="p-2 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span class="block text-[8px] text-slate-400">Byte 6</span>
                <span class="text-xs font-bold text-slate-700 dark:text-slate-300">4B</span>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2 mt-2 font-mono text-[10px] text-center">
              <div class="p-1 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 font-bold">
                First 3 Bytes (24 Bits): OUI (Manufacturer ID)
              </div>
              <div class="p-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold">
                Last 3 Bytes (24 Bits): NIC Serial / Station ID
              </div>
            </div>
          </div>

          <!-- 3 Destination Address Types -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-[11px]">
            <div class="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
              <span class="font-bold text-blue-900 dark:text-blue-200 block mb-1">A. Unicast Address</span>
              <p class="text-slate-600 dark:text-slate-300 text-[10px]">One-to-One. Least significant bit (LSB) of 1st byte is <strong>0</strong>.</p>
              <span class="font-mono text-[9px] text-blue-600 dark:text-blue-400 mt-1 block">e.g., 4A:30:10... (4 = 0100_2 &rarr; bit 0)</span>
            </div>
            <div class="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
              <span class="font-bold text-purple-900 dark:text-purple-200 block mb-1">B. Multicast Address</span>
              <p class="text-slate-600 dark:text-slate-300 text-[10px]">One-to-Many. Least significant bit (LSB) of 1st byte is <strong>1</strong>.</p>
              <span class="font-mono text-[9px] text-purple-600 dark:text-purple-400 mt-1 block">e.g., 47:20:1B... (47_16 = ...0111_2 &rarr; bit 1)</span>
            </div>
            <div class="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <span class="font-bold text-emerald-900 dark:text-emerald-200 block mb-1">C. Broadcast Address</span>
              <p class="text-slate-600 dark:text-slate-300 text-[10px]">One-to-All. All 48 bits asserted as <strong>1</strong>.</p>
              <span class="font-mono text-[9px] text-emerald-600 dark:text-emerald-400 mt-1 block">FF:FF:FF:FF:FF:FF</span>
            </div>
          </div>
        </div>
      </div>
    \`;
  },

  // 9c. Binary Exponential Backoff Algorithm Table Diagram
  renderExponentialBackoffDiagram: function() {
    return \`
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Binary Exponential Backoff: Collision Recovery Window (T_B = R &times; 51.2 &mu;s)
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded font-bold">
            0 &le; R &le; 2^K - 1
          </span>
        </div>

        <div class="space-y-3 text-xs">
          <div class="overflow-x-auto">
            <table class="w-full text-center border-collapse">
              <thead>
                <tr class="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px]">
                  <th class="p-1.5 border border-slate-200 dark:border-slate-700">Attempt K</th>
                  <th class="p-1.5 border border-slate-200 dark:border-slate-700 font-mono">Range Formula [0, 2^K - 1]</th>
                  <th class="p-1.5 border border-slate-200 dark:border-slate-700">Possible Values of R</th>
                  <th class="p-1.5 border border-slate-200 dark:border-slate-700">Choices</th>
                  <th class="p-1.5 border border-slate-200 dark:border-slate-700">Max Delay (at 10 Mbps)</th>
                </tr>
              </thead>
              <tbody class="font-mono text-[10px]">
                <tr>
                  <td class="p-1.5 border border-slate-200 dark:border-slate-700 font-bold">K = 1</td>
                  <td class="p-1.5 border border-slate-200 dark:border-slate-700">0 &le; R &le; 2^1 - 1</td>
                  <td class="p-1.5 border border-slate-200 dark:border-slate-700 text-blue-600 font-bold">0, 1</td>
                  <td class="p-1.5 border border-slate-200 dark:border-slate-700">2</td>
                  <td class="p-1.5 border border-slate-200 dark:border-slate-700">51.2 &mu;s</td>
                </tr>
                <tr>
                  <td class="p-1.5 border border-slate-200 dark:border-slate-700 font-bold">K = 2</td>
                  <td class="p-1.5 border border-slate-200 dark:border-slate-700">0 &le; R &le; 2^2 - 1</td>
                  <td class="p-1.5 border border-slate-200 dark:border-slate-700 text-blue-600 font-bold">0, 1, 2, 3</td>
                  <td class="p-1.5 border border-slate-200 dark:border-slate-700">4</td>
                  <td class="p-1.5 border border-slate-200 dark:border-slate-700">153.6 &mu;s</td>
                </tr>
                <tr>
                  <td class="p-1.5 border border-slate-200 dark:border-slate-700 font-bold">K = 3</td>
                  <td class="p-1.5 border border-slate-200 dark:border-slate-700">0 &le; R &le; 2^3 - 1</td>
                  <td class="p-1.5 border border-slate-200 dark:border-slate-700 text-blue-600 font-bold">0, 1, ..., 7</td>
                  <td class="p-1.5 border border-slate-200 dark:border-slate-700">8</td>
                  <td class="p-1.5 border border-slate-200 dark:border-slate-700">358.4 &mu;s</td>
                </tr>
                <tr>
                  <td class="p-1.5 border border-slate-200 dark:border-slate-700 font-bold">K = 4</td>
                  <td class="p-1.5 border border-slate-200 dark:border-slate-700">0 &le; R &le; 2^4 - 1</td>
                  <td class="p-1.5 border border-slate-200 dark:border-slate-700 text-blue-600 font-bold">0, 1, ..., 15</td>
                  <td class="p-1.5 border border-slate-200 dark:border-slate-700">16</td>
                  <td class="p-1.5 border border-slate-200 dark:border-slate-700">768.0 &mu;s</td>
                </tr>
                <tr class="bg-amber-50/50 dark:bg-amber-950/20 font-bold">
                  <td class="p-1.5 border border-slate-200 dark:border-slate-700">K = 10 (Max)</td>
                  <td class="p-1.5 border border-slate-200 dark:border-slate-700">0 &le; R &le; 2^10 - 1</td>
                  <td class="p-1.5 border border-slate-200 dark:border-slate-700 text-amber-700 dark:text-amber-300">0, 1, ..., 1023</td>
                  <td class="p-1.5 border border-slate-200 dark:border-slate-700">1024</td>
                  <td class="p-1.5 border border-slate-200 dark:border-slate-700">52.4 ms</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="p-2.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-300 flex justify-between items-center">
            <span><strong>Rules:</strong> K max for range calculation = 10. Maximum retransmission attempts allowed = 16 (aborts if K &gt; 16).</span>
            <span class="font-mono text-slate-500">Forouzan Ch. 13</span>
          </div>
        </div>
      </div>
    \`;
  },

  // 9d. Ethernet Evolution Diagram
  renderEthernetEvolutionDiagram: function() {
    return \`
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Ethernet Generations &amp; Speed Evolution (10 Mbps &rarr; 10 Gbps)
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded font-bold">
            IEEE 802.3 Family
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-2.5 text-xs text-center">
          <!-- Standard Ethernet -->
          <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
            <span class="text-[10px] font-bold text-blue-600 dark:text-blue-400 block mb-0.5">Standard Ethernet</span>
            <span class="text-base font-extrabold text-slate-900 dark:text-white block mb-1">10 Mbps</span>
            <span class="text-[9px] text-slate-500 block mb-1.5">Original IEEE 802.3</span>
            <div class="text-[9px] text-left text-slate-600 dark:text-slate-400 space-y-0.5">
              <div>&bull; 10Base5 (Thick coax, 500m)</div>
              <div>&bull; 10Base2 (Thin coax, 185m)</div>
              <div>&bull; 10Base-T (Cat3/5 UTP, 100m)</div>
              <div>&bull; 10Base-F (Fiber optic, 2km)</div>
            </div>
          </div>

          <!-- Fast Ethernet -->
          <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
            <span class="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block mb-0.5">Fast Ethernet</span>
            <span class="text-base font-extrabold text-slate-900 dark:text-white block mb-1">100 Mbps</span>
            <span class="text-[9px] text-slate-500 block mb-1.5">IEEE 802.3u</span>
            <div class="text-[9px] text-left text-slate-600 dark:text-slate-400 space-y-0.5">
              <div>&bull; 100Base-TX (Cat5 2-pair, 100m)</div>
              <div>&bull; 100Base-FX (2-fiber, 2000m)</div>
              <div>&bull; 100Base-T4 (Cat4 4-pair)</div>
              <div class="text-emerald-600 font-bold">&bull; Autonegotiation added</div>
            </div>
          </div>

          <!-- Gigabit Ethernet -->
          <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
            <span class="text-[10px] font-bold text-purple-600 dark:text-purple-400 block mb-0.5">Gigabit Ethernet</span>
            <span class="text-base font-extrabold text-slate-900 dark:text-white block mb-1">1 Gbps</span>
            <span class="text-[9px] text-slate-500 block mb-1.5">IEEE 802.3z / 802.3ab</span>
            <div class="text-[9px] text-left text-slate-600 dark:text-slate-400 space-y-0.5">
              <div>&bull; 1000Base-SX (Shortwave fiber)</div>
              <div>&bull; 1000Base-LX (Longwave fiber)</div>
              <div>&bull; 1000Base-T (Cat5e 4-pair UTP)</div>
              <div class="text-purple-600 font-bold">&bull; Retains 48-bit &amp; 64-1518B</div>
            </div>
          </div>

          <!-- 10-Gigabit Ethernet -->
          <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
            <span class="text-[10px] font-bold text-amber-600 dark:text-amber-400 block mb-0.5">Ten-Gigabit Ethernet</span>
            <span class="text-base font-extrabold text-slate-900 dark:text-white block mb-1">10 Gbps</span>
            <span class="text-[9px] text-slate-500 block mb-1.5">IEEE 802.3ae</span>
            <div class="text-[9px] text-left text-slate-600 dark:text-slate-400 space-y-0.5">
              <div>&bull; 10GBase-S (Shortwave fiber)</div>
              <div>&bull; 10GBase-L (Longwave fiber)</div>
              <div>&bull; 10GBase-E (Extra-long fiber)</div>
              <div class="text-amber-600 font-bold">&bull; Full-Duplex Only (No CSMA/CD)</div>
            </div>
          </div>
        </div>
      </div>
    \`;
  },
`;

const anchor = `  // 9. Ethernet Frame & IEEE 802.3
  renderEthernetFrameDiagram: function() {`;

if (!code.includes(anchor)) {
  console.error("Could not find anchor in cleanDiagramEngine.js");
  process.exit(1);
}

code = code.replace(anchor, newDiagrams + "\n" + anchor);

fs.writeFileSync(filePath, code, 'utf8');
console.log("Successfully updated cleanDiagramEngine.js with dedicated Topic 6 diagrams!");

