const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../js/cleanDiagramEngine.js');
let code = fs.readFileSync(filePath, 'utf8');

const targetDispatchStr = "if (id === 'network-devices' || id === 'u2-networking-device-repeaters' || id === 'u2-networking-device-hubs' || id === 'u2-networking-device-bridges' || id === 'u2-networking-device-switches' || id === 'u2-networking-device-routers' || id === 'u2-networking-device-gateways' || id === 'u2-device-working-principles' || id === 'u2-comparison-networking-devices' || id === 'u2-device-osi-layers')";

const newDispatchStr = `if (id === 'u2-device-osi-layers' || id === 'network-devices') {
      return this.renderOsiDeviceLayersDiagram();
    }
    if (id === 'u2-networking-device-hubs' || id === 'u2-device-working-principles') {
      return this.renderHubVsSwitchCollisionDiagram();
    }
    if (id === 'u2-networking-device-repeaters' || id === 'u2-networking-device-bridges' || id === 'u2-networking-device-switches' || id === 'u2-networking-device-routers' || id === 'u2-networking-device-gateways' || id === 'u2-comparison-networking-devices')`;

if (!code.includes(targetDispatchStr)) {
  console.error('targetDispatchStr not found!');
  process.exit(1);
}

code = code.replace(targetDispatchStr, newDispatchStr);

const targetMethod = '  // 13. Networking Devices & Collision Domains';
const newDiagrams = `  // 12b. OSI Layers at Which Networking Devices Operate
  renderOsiDeviceLayersDiagram: function() {
    return \`
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              OSI 7-Layer Model: Networking Devices & Protocol Data Units (PDU) Mapping
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded font-bold">
            OSI Reference Architecture
          </span>
        </div>

        <div class="space-y-2 text-xs font-mono">
          <!-- Layer 7, 6, 5: Application / Presentation / Session -->
          <div class="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-16 font-bold text-purple-800 dark:text-purple-300 text-[11px]">Layer 7–5</span>
              <span class="text-slate-700 dark:text-slate-200 font-sans font-semibold">Application, Presentation, Session</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-[10px] px-2 py-0.5 rounded bg-purple-200 dark:bg-purple-900 text-purple-900 dark:text-purple-200 font-bold">PDU: Data / Messages</span>
              <span class="text-[10px] px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 font-bold border border-purple-300 dark:border-purple-700">Gateways & Proxies</span>
            </div>
          </div>

          <!-- Layer 4: Transport -->
          <div class="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-16 font-bold text-indigo-800 dark:text-indigo-300 text-[11px]">Layer 4</span>
              <span class="text-slate-700 dark:text-slate-200 font-sans font-semibold">Transport Layer (TCP / UDP Ports)</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-[10px] px-2 py-0.5 rounded bg-indigo-200 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-200 font-bold">PDU: Segments</span>
              <span class="text-[10px] px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 font-bold border border-indigo-300 dark:border-indigo-700">L4 Switches / Firewalls</span>
            </div>
          </div>

          <!-- Layer 3: Network -->
          <div class="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-16 font-bold text-blue-800 dark:text-blue-300 text-[11px]">Layer 3</span>
              <span class="text-slate-700 dark:text-slate-200 font-sans font-semibold">Network Layer (Logical IP Addressing)</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-[10px] px-2 py-0.5 rounded bg-blue-200 dark:bg-blue-900 text-blue-900 dark:text-blue-200 font-bold">PDU: Packets</span>
              <span class="text-[10px] px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-bold border border-blue-300 dark:border-blue-700">Routers & L3 Switches</span>
            </div>
          </div>

          <!-- Layer 2: Data Link -->
          <div class="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-400 dark:border-emerald-700 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-16 font-bold text-emerald-800 dark:text-emerald-300 text-[11px]">Layer 2</span>
              <span class="text-slate-800 dark:text-slate-100 font-sans font-bold">Data Link Layer (Hardware MAC Addresses)</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-[10px] px-2 py-0.5 rounded bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200 font-extrabold">PDU: Frames</span>
              <span class="text-[10px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-700">Bridges, NICs, L2 Switches</span>
            </div>
          </div>

          <!-- Layer 1: Physical -->
          <div class="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-16 font-bold text-amber-800 dark:text-amber-300 text-[11px]">Layer 1</span>
              <span class="text-slate-700 dark:text-slate-200 font-sans font-semibold">Physical Layer (Electrical / Optical Signals)</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-[10px] px-2 py-0.5 rounded bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 font-bold">PDU: Raw Bits</span>
              <span class="text-[10px] px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold border border-amber-300 dark:border-amber-700">Repeaters, Hubs, Modems, Cables</span>
            </div>
          </div>
        </div>

        <div class="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 grid grid-cols-3 gap-2 text-center text-[10px]">
          <div class="p-2 rounded bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-300">
            <strong>Layer 1 (Bit-level):</strong><br>Zero intelligence, forwards electrical noise/collisions.
          </div>
          <div class="p-2 rounded bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-emerald-900 dark:text-emerald-300">
            <strong>Layer 2 (Frame-level):</strong><br>Filters traffic by MAC address, separates collision domains.
          </div>
          <div class="p-2 rounded bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-blue-900 dark:text-blue-300">
            <strong>Layer 3 (Packet-level):</strong><br>Routes across subnets via IP, separates broadcast domains.
          </div>
        </div>
      </div>
    \`;
  },

  // 12c. Hub vs Switch: Collision Domains & Traffic Flow Comparison
  renderHubVsSwitchCollisionDiagram: function() {
    return \`
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Architectural Comparison: Hub (Shared Bus) vs Switch (Microsegmentation)
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded font-bold">
            Collision & Broadcast Boundaries
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <!-- Hub Side -->
          <div class="p-4 rounded-xl bg-red-50/50 dark:bg-red-950/20 border-2 border-red-300 dark:border-red-900 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between pb-2 mb-2 border-b border-red-200 dark:border-red-800">
                <span class="font-bold text-red-900 dark:text-red-200 flex items-center gap-1.5">
                  <i class="fa-solid fa-circle-nodes text-red-600"></i> Legacy Hub (Layer 1)
                </span>
                <span class="text-[9px] px-2 py-0.5 rounded bg-red-200 dark:bg-red-900 text-red-900 dark:text-red-100 font-bold">1 Collision Domain</span>
              </div>
              <p class="text-[11px] text-slate-600 dark:text-slate-300 font-sans mb-3">
                Blindly repeats every incoming electrical bit out all other ports.
              </p>
              <div class="space-y-1.5 text-[10px]">
                <div class="p-1.5 bg-white dark:bg-slate-800 rounded border border-red-200 dark:border-red-800 flex justify-between text-red-700 dark:text-red-300 font-bold">
                  <span>Collision Domain:</span><span>1 Single Shared Bus</span>
                </div>
                <div class="p-1.5 bg-white dark:bg-slate-800 rounded border border-red-200 dark:border-red-800 flex justify-between text-red-700 dark:text-red-300 font-bold">
                  <span>Broadcast Domain:</span><span>1 Single Shared Domain</span>
                </div>
                <div class="p-1.5 bg-white dark:bg-slate-800 rounded border border-red-200 dark:border-red-800 flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Transmission Mode:</span><span>Half-Duplex Only</span>
                </div>
              </div>
            </div>
            <div class="mt-3 p-2 bg-red-100 dark:bg-red-950/60 rounded text-[10px] text-red-800 dark:text-red-300 font-sans flex items-center gap-1.5">
              <i class="fa-solid fa-triangle-exclamation text-red-600 shrink-0"></i>
              <span>Simultaneous transmissions collide! All 4 hosts compete for 100 Mbps.</span>
            </div>
          </div>

          <!-- Switch Side -->
          <div class="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border-2 border-emerald-400 dark:border-emerald-800 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between pb-2 mb-2 border-b border-emerald-200 dark:border-emerald-800">
                <span class="font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                  <i class="fa-solid fa-server text-emerald-600"></i> Ethernet Switch (Layer 2)
                </span>
                <span class="text-[9px] px-2 py-0.5 rounded bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100 font-bold">4 Collision Domains</span>
              </div>
              <p class="text-[11px] text-slate-600 dark:text-slate-300 font-sans mb-3">
                Intelligently forwards unicast frames directly to destination port via CAM lookup.
              </p>
              <div class="space-y-1.5 text-[10px]">
                <div class="p-1.5 bg-white dark:bg-slate-800 rounded border border-emerald-200 dark:border-emerald-800 flex justify-between text-emerald-700 dark:text-emerald-300 font-bold">
                  <span>Collision Domain:</span><span>1 Per Port (Microsegmented)</span>
                </div>
                <div class="p-1.5 bg-white dark:bg-slate-800 rounded border border-emerald-200 dark:border-emerald-800 flex justify-between text-emerald-700 dark:text-emerald-300 font-bold">
                  <span>Broadcast Domain:</span><span>1 Per VLAN</span>
                </div>
                <div class="p-1.5 bg-white dark:bg-slate-800 rounded border border-emerald-200 dark:border-emerald-800 flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Transmission Mode:</span><span>Full-Duplex Wire Speed</span>
                </div>
              </div>
            </div>
            <div class="mt-3 p-2 bg-emerald-100 dark:bg-emerald-950/60 rounded text-[10px] text-emerald-800 dark:text-emerald-300 font-sans flex items-center gap-1.5">
              <i class="fa-solid fa-circle-check text-emerald-600 shrink-0"></i>
              <span>Zero collisions! Each host enjoys dedicated 200 Mbps full-duplex bandwidth.</span>
            </div>
          </div>
        </div>
      </div>
    \`;
  },
`;

if (!code.includes(targetMethod)) {
  console.error('targetMethod not found!');
  process.exit(1);
}

code = code.replace(targetMethod, newDiagrams + '\n' + targetMethod);
fs.writeFileSync(filePath, code, 'utf8');
console.log('Successfully updated cleanDiagramEngine.js with bespoke Topic 10 diagrams!');
