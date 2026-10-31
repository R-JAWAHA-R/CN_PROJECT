// =============================================================================
// Clean Diagram Engine: Modern Visual Architecture & Protocol Schematics
// Replaces obsolete ASCII/symbol art with clean, responsive, interactive diagrams
// Strictly aligned with Master Syllabus, Kurose & Ross, Forouzan, and Tanenbaum
// =============================================================================

const CleanDiagramEngine = {
  getDiagramHtml: function(topic) {
    if (!topic) return '';
    const id = topic.id || '';

    // 1. Framing & Bit Stuffing
    if (id === 'framing' || id === 'byte-stuffing' || id === 'bit-stuffing') {
      return this.renderFramingDiagram();
    }

    // 2. Stop-and-Wait & Simplest Protocols
    if (id === 'flow-control' || id === 'simplex-protocol' || id === 'stop-and-wait-noiseless' || id === 'stop-and-wait' || id === 'u2-dll-protocols-intro' || id === 'u2-protocol-classification' || id === 'comparison-noiseless-noisy') {
      return this.renderStopAndWaitDiagram();
    }

    // 3. Sliding Window & ARQ (Go-Back-N, Selective Repeat)
    if (id === 'sliding-window' || id === 'go-back-n' || id === 'selective-repeat' || id === 'comparison-arq-protocols' || id === 'u2-protocol-examples') {
      return this.renderSlidingWindowDiagram();
    }

    // 3b. MAC Sublayer & IEEE 802 Architecture
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
    }

    // 5. ALOHA Protocols
    if (id === 'aloha' || id === 'u2-pure-aloha' || id === 'u2-slotted-aloha' || id === 'u2-random-access-protocols' || id === 'u2-multiple-access-intro') {
      return this.renderAlohaDiagram();
    }

    // 6a. CSMA Persistence Modes (1-Persistent, Non-Persistent, p-Persistent)
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
    }

    // 7a. Bit-Map Reservation Protocol
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
    }

    // 8a. Ethernet Architecture (LLC vs MAC Sublayers)
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
    }

    // 9. Wireless LANs: Dedicated Visual Schematics for Topic 7
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
    }

    // 10. IEEE 802.11 MAC Sublayer: Dedicated Visual Schematics for Topic 8
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
    }

    // 11. Data Link Layer Switching & Spanning Tree (STP)
    if (id === 'dll-switching' || id === 'u2-bridges-overview' || id === 'u2-transparent-bridges' || id === 'u2-learning-bridges' || id === 'u2-bridge-learning-process' || id === 'u2-forwarding-and-filtering' || id === 'u2-bridge-flooding' || id === 'u2-spanning-tree-protocol' || id === 'u2-bridges-vs-switches' || id === 'vlan') {
      return this.renderSwitchingStpDiagram();
    }

    // 12. Networking Devices & Collision Domains
    if (id === 'network-devices' || id === 'u2-networking-device-repeaters' || id === 'u2-networking-device-hubs' || id === 'u2-networking-device-bridges' || id === 'u2-networking-device-switches' || id === 'u2-networking-device-routers' || id === 'u2-networking-device-gateways' || id === 'u2-device-working-principles' || id === 'u2-comparison-networking-devices' || id === 'u2-device-osi-layers') {
      return this.renderNetworkingDevicesDiagram();
    }

    // 13. Error Detection & Correction (CRC & Hamming)
    if (id === 'error-detection' || id === 'parity' || id === 'checksum' || id === 'hamming-code' || id === 'crc' || id === 'u2-error-control') {
      return this.renderErrorControlDiagram();
    }

    // Default: Clean Layer Encapsulation Flow
    return this.renderNodeToNodeDiagram(topic);
  },

  // 1. Node-to-Node Delivery & Encapsulation Flow
  renderNodeToNodeDiagram: function(topic) {
    return `
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-gfg-green animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Data Link Layer: Node-to-Node Frame Delivery
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded font-bold">
            OSI Reference Model (L2)
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
          <!-- Sender Column -->
          <div class="md:col-span-2 space-y-2.5 bg-white dark:bg-slate-800/80 p-3.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
            <div class="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-200 pb-1 border-b border-slate-100 dark:border-slate-700">
              <span class="flex items-center gap-1.5"><i class="fa-solid fa-desktop text-blue-500"></i> Sender Station (A)</span>
              <span class="text-[10px] text-slate-400 font-mono">Source Node</span>
            </div>
            <div class="p-2 rounded bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-[11px]">
              <div class="flex justify-between font-semibold text-blue-800 dark:text-blue-300">
                <span>Layer 3: Network Layer</span>
                <span class="font-mono text-[10px]">Packet</span>
              </div>
              <div class="mt-1 bg-white dark:bg-slate-900 px-2 py-1 rounded text-center text-slate-600 dark:text-slate-300 font-mono text-[10px] border border-blue-100 dark:border-blue-900">
                [ IP Datagram Header + Payload ]
              </div>
            </div>
            <div class="text-center text-slate-400 text-xs flex items-center justify-center gap-1.5 py-0.5">
              <i class="fa-solid fa-arrow-down text-blue-500"></i>
              <span class="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Prepend Header + Append FCS Trailer</span>
            </div>
            <div class="p-2 rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-[11px]">
              <div class="flex justify-between font-semibold text-emerald-800 dark:text-emerald-300">
                <span>Layer 2: Data Link Layer</span>
                <span class="font-mono text-[10px] font-bold text-gfg-green">Frame</span>
              </div>
              <div class="mt-1 flex items-stretch gap-1 font-mono text-[9px] text-center">
                <span class="bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-1.5 py-1 rounded border border-amber-300 dark:border-amber-700 shrink-0 font-bold">Header</span>
                <span class="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 px-2 py-1 rounded border border-emerald-200 dark:border-emerald-800 grow truncate font-semibold">IP Packet</span>
                <span class="bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 px-1.5 py-1 rounded border border-purple-300 dark:border-purple-700 shrink-0 font-bold">Trailer (FCS)</span>
              </div>
            </div>
            <div class="text-center text-slate-400 text-xs flex items-center justify-center gap-1.5 py-0.5">
              <i class="fa-solid fa-arrow-down text-emerald-500"></i>
              <span class="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Digital-to-Signal Modulation</span>
            </div>
            <div class="p-2 rounded bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-[11px]">
              <div class="flex justify-between font-semibold text-amber-800 dark:text-amber-300">
                <span>Layer 1: Physical Layer</span>
                <span class="font-mono text-[10px]">Bitstream</span>
              </div>
              <div class="mt-1 bg-white dark:bg-slate-900 px-2 py-1 rounded text-center text-amber-700 dark:text-amber-300 font-mono text-[10px] tracking-widest border border-amber-100 dark:border-amber-900">
                0 1 1 0 1 0 0 1 1 1 0 0 ...
              </div>
            </div>
          </div>

          <!-- Channel Column -->
          <div class="flex flex-col items-center justify-center p-2 text-center my-2 md:my-0">
            <div class="w-full flex items-center justify-center gap-1 text-slate-400 mb-1">
              <span class="h-0.5 w-6 bg-slate-300 dark:bg-slate-700"></span>
              <i class="fa-solid fa-wave-square text-gfg-green text-sm"></i>
              <span class="h-0.5 w-6 bg-slate-300 dark:bg-slate-700"></span>
            </div>
            <span class="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-tight">Physical Link</span>
            <span class="text-[9px] text-slate-400 font-sans">Copper / Fiber / Wireless</span>
            <div class="mt-2 text-gfg-green text-xs font-bold flex items-center gap-1 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800 shadow-xs">
              <span>Transmitting</span>
              <i class="fa-solid fa-arrow-right"></i>
            </div>
          </div>

          <!-- Receiver Column -->
          <div class="md:col-span-2 space-y-2.5 bg-white dark:bg-slate-800/80 p-3.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
            <div class="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-200 pb-1 border-b border-slate-100 dark:border-slate-700">
              <span class="flex items-center gap-1.5"><i class="fa-solid fa-server text-purple-500"></i> Receiver Station (B)</span>
              <span class="text-[10px] text-slate-400 font-mono">Destination Node</span>
            </div>
            <div class="p-2 rounded bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-[11px]">
              <div class="flex justify-between font-semibold text-blue-800 dark:text-blue-300">
                <span>Layer 3: Network Layer</span>
                <span class="font-mono text-[10px]">Delivered</span>
              </div>
              <div class="mt-1 bg-white dark:bg-slate-900 px-2 py-1 rounded text-center text-slate-600 dark:text-slate-300 font-mono text-[10px] border border-blue-100 dark:border-blue-900">
                [ Clean IP Datagram Passed Up ]
              </div>
            </div>
            <div class="text-center text-slate-400 text-xs flex items-center justify-center gap-1.5 py-0.5">
              <i class="fa-solid fa-arrow-up text-blue-500"></i>
              <span class="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Strip Header + Validate CRC Trailer</span>
            </div>
            <div class="p-2 rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-[11px]">
              <div class="flex justify-between font-semibold text-emerald-800 dark:text-emerald-300">
                <span>Layer 2: Data Link Layer</span>
                <span class="font-mono text-[10px] text-emerald-600 font-bold">CRC Valid ✓</span>
              </div>
              <div class="mt-1 flex items-stretch gap-1 font-mono text-[9px] text-center">
                <span class="bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-1.5 py-1 rounded border border-amber-300 dark:border-amber-700 shrink-0 font-bold">Header</span>
                <span class="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 px-2 py-1 rounded border border-emerald-200 dark:border-emerald-800 grow truncate font-semibold">IP Packet</span>
                <span class="bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 px-1.5 py-1 rounded border border-purple-300 dark:border-purple-700 shrink-0 font-bold">FCS ✓</span>
              </div>
            </div>
            <div class="text-center text-slate-400 text-xs flex items-center justify-center gap-1.5 py-0.5">
              <i class="fa-solid fa-arrow-up text-emerald-500"></i>
              <span class="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Clock Synchronization & Preamble Lock</span>
            </div>
            <div class="p-2 rounded bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-[11px]">
              <div class="flex justify-between font-semibold text-amber-800 dark:text-amber-300">
                <span>Layer 1: Physical Layer</span>
                <span class="font-mono text-[10px]">Signal In</span>
              </div>
              <div class="mt-1 bg-white dark:bg-slate-900 px-2 py-1 rounded text-center text-amber-700 dark:text-amber-300 font-mono text-[10px] tracking-widest border border-amber-100 dark:border-amber-900">
                0 1 1 0 1 0 0 1 1 1 0 0 ...
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // 2. Framing & Bit Stuffing
  renderFramingDiagram: function() {
    return `
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              HDLC & PPP Frame Delimiting: Bit Stuffing Protocol Architecture
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded font-bold">
            Flag: 01111110 (0x7E)
          </span>
        </div>

        <div class="space-y-4">
          <!-- Frame Structure Banner -->
          <div>
            <span class="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1.5">Standard Synchronous Frame Structure:</span>
            <div class="grid grid-cols-6 gap-1 text-center font-mono text-xs">
              <div class="bg-amber-500 text-white p-2.5 rounded-l-lg font-bold shadow-xs">
                <span class="block text-[9px] uppercase tracking-wider opacity-80">Start Flag</span>
                <span class="text-[11px]">01111110</span>
                <span class="block text-[8px] opacity-75">1 Byte</span>
              </div>
              <div class="bg-blue-600 text-white p-2.5 font-bold shadow-xs">
                <span class="block text-[9px] uppercase tracking-wider opacity-80">Address</span>
                <span class="text-[11px]">Dst / Src</span>
                <span class="block text-[8px] opacity-75">1-6 Bytes</span>
              </div>
              <div class="bg-indigo-600 text-white p-2.5 font-bold shadow-xs">
                <span class="block text-[9px] uppercase tracking-wider opacity-80">Control</span>
                <span class="text-[11px]">Frame Type</span>
                <span class="block text-[8px] opacity-75">1-2 Bytes</span>
              </div>
              <div class="bg-emerald-600 text-white p-2.5 font-bold shadow-xs col-span-2">
                <span class="block text-[9px] uppercase tracking-wider opacity-80">Payload (Variable Length)</span>
                <span class="text-[11px]">Network Layer IP Packet</span>
                <span class="block text-[8px] opacity-75">Bit-Stuffed / Escaped</span>
              </div>
              <div class="bg-amber-500 text-white p-2.5 rounded-r-lg font-bold shadow-xs">
                <span class="block text-[9px] uppercase tracking-wider opacity-80">End Flag</span>
                <span class="text-[11px]">01111110</span>
                <span class="block text-[8px] opacity-75">1 Byte</span>
              </div>
            </div>
          </div>

          <!-- Bit Stuffing Rule Comparison -->
          <div class="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
            <span class="font-bold text-slate-800 dark:text-slate-200 block mb-2 flex items-center gap-1.5">
              <i class="fa-solid fa-wand-magic-sparkles text-blue-500"></i>
              Bit-Stuffing Rule: Zero Insertion After Five Consecutive 1s
            </span>
            <div class="space-y-2 font-mono text-[11px]">
              <div class="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800">
                <span class="w-24 text-[10px] text-slate-400 uppercase font-sans font-bold">1. Original Data:</span>
                <span class="tracking-widest text-slate-700 dark:text-slate-300">0 1 1 0 1 1 1 1 1 <span class="bg-red-200 dark:bg-red-900 text-red-800 dark:text-red-200 px-1 rounded font-bold">1</span> 0 1 1 1 1 1 <span class="bg-red-200 dark:bg-red-900 text-red-800 dark:text-red-200 px-1 rounded font-bold">1</span> 0</span>
              </div>
              <div class="flex items-center gap-2 p-2 bg-emerald-50 dark:bg-emerald-950/50 rounded border border-emerald-200 dark:border-emerald-800">
                <span class="w-24 text-[10px] text-emerald-600 uppercase font-sans font-bold">2. Transmitted:</span>
                <span class="tracking-widest text-emerald-800 dark:text-emerald-200 font-bold">0 1 1 0 1 1 1 1 1 <span class="bg-emerald-300 dark:bg-emerald-700 text-black dark:text-white px-1.5 py-0.5 rounded shadow-xs">0</span> 1 0 1 1 1 1 1 <span class="bg-emerald-300 dark:bg-emerald-700 text-black dark:text-white px-1.5 py-0.5 rounded shadow-xs">0</span> 1 0</span>
              </div>
              <div class="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-950/50 rounded border border-blue-200 dark:border-blue-800">
                <span class="w-24 text-[10px] text-blue-600 uppercase font-sans font-bold">3. Receiver Strips:</span>
                <span class="tracking-widest text-blue-800 dark:text-blue-200">0 1 1 0 1 1 1 1 1 1 0 1 1 1 1 1 1 0 <span class="text-[10px] font-sans font-normal text-slate-500">(Exactly restored!)</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // 3. Stop-and-Wait ARQ
  renderStopAndWaitDiagram: function() {
    return `
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-gfg-green animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Stop-and-Wait ARQ Protocol: Normal vs. Timeout Recovery Timeline
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded font-bold">
            Window Size = 1
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Normal Case -->
          <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <span class="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mb-3">
              <i class="fa-solid fa-circle-check"></i> Case 1: Normal Error-Free Exchange
            </span>
            <div class="space-y-3 font-mono text-[11px]">
              <div class="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span class="font-bold text-blue-600">Sender: Tx Frame 0</span>
                <i class="fa-solid fa-arrow-right text-emerald-500"></i>
                <span class="text-slate-600 dark:text-slate-400">Receiver receives Frame 0</span>
              </div>
              <div class="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span class="text-slate-600 dark:text-slate-400">Sender receives ACK 1</span>
                <i class="fa-solid fa-arrow-left text-blue-500"></i>
                <span class="font-bold text-emerald-600">Receiver: Tx ACK 1</span>
              </div>
              <div class="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span class="font-bold text-blue-600">Sender: Tx Frame 1</span>
                <i class="fa-solid fa-arrow-right text-emerald-500"></i>
                <span class="text-slate-600 dark:text-slate-400">Receiver receives Frame 1</span>
              </div>
            </div>
          </div>

          <!-- Lost Frame Case -->
          <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <span class="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5 mb-3">
              <i class="fa-solid fa-triangle-exclamation"></i> Case 2: Lost Frame & Timeout Retransmission
            </span>
            <div class="space-y-3 font-mono text-[11px]">
              <div class="flex items-center justify-between p-2 rounded bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800">
                <span class="font-bold text-blue-600">Sender: Tx Frame 0</span>
                <span class="text-red-500 font-bold"><i class="fa-solid fa-xmark"></i> [Lost in Channel]</span>
                <span class="text-slate-400 italic">No Reception</span>
              </div>
              <div class="p-2 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-center text-amber-700 dark:text-amber-300 font-sans text-xs">
                <i class="fa-solid fa-stopwatch"></i> <strong>Timer Expires!</strong> Sender detects timeout.
              </div>
              <div class="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span class="font-bold text-amber-600">Sender: Retransmit Frame 0</span>
                <i class="fa-solid fa-arrow-right text-emerald-500"></i>
                <span class="font-bold text-emerald-600">Receiver: Tx ACK 1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // 4. Sliding Window Protocols (Go-Back-N & Selective Repeat)
  renderSlidingWindowDiagram: function() {
    return `
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Sliding Window Protocols: Go-Back-N vs. Selective Repeat
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded font-bold">
            Pipelined ARQ
          </span>
        </div>

        <div class="space-y-4">
          <!-- Window Slots Visualizer -->
          <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <span class="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-2">Sender Sliding Window State (Sequence Numbers 0 to 7):</span>
            <div class="flex items-center gap-1.5 font-mono text-center text-xs">
              <span class="bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 p-2 rounded w-12 opacity-60">0<br><span class="text-[8px]">Acked</span></span>
              <span class="bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 p-2 rounded w-12 opacity-60">1<br><span class="text-[8px]">Acked</span></span>
              <div class="border-2 border-dashed border-blue-500 rounded-lg p-1 flex gap-1.5 bg-blue-50/50 dark:bg-blue-950/30">
                <span class="bg-emerald-500 text-white p-2 rounded w-12 font-bold shadow-xs">2<br><span class="text-[8px]">Sent</span></span>
                <span class="bg-emerald-500 text-white p-2 rounded w-12 font-bold shadow-xs">3<br><span class="text-[8px]">Sent</span></span>
                <span class="bg-blue-500 text-white p-2 rounded w-12 font-bold shadow-xs">4<br><span class="text-[8px]">Usable</span></span>
                <span class="bg-blue-500 text-white p-2 rounded w-12 font-bold shadow-xs">5<br><span class="text-[8px]">Usable</span></span>
              </div>
              <span class="bg-slate-100 dark:bg-slate-900 text-slate-400 p-2 rounded w-12 border border-slate-200 dark:border-slate-800">6<br><span class="text-[8px]">Waiting</span></span>
              <span class="bg-slate-100 dark:bg-slate-900 text-slate-400 p-2 rounded w-12 border border-slate-200 dark:border-slate-800">7<br><span class="text-[8px]">Waiting</span></span>
            </div>
            <div class="flex justify-between items-center text-[10px] text-slate-500 mt-2">
              <span>← Window slides right when cumulative/individual ACK arrives</span>
              <span class="font-bold text-blue-600 dark:text-blue-400">Current Window Size: W = 4</span>
            </div>
          </div>

          <!-- GBN vs SR Comparison Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div class="p-3.5 rounded-lg bg-white dark:bg-slate-800 border-l-4 border-amber-500 border border-slate-200 dark:border-slate-700">
              <span class="font-bold text-amber-600 dark:text-amber-400 block mb-1">Go-Back-N (GBN) Rules</span>
              <ul class="space-y-1 text-slate-600 dark:text-slate-300 font-sans text-[11px]">
                <li>• <strong>Send Window:</strong> Maximum size = <code>2^m - 1</code></li>
                <li>• <strong>Receive Window:</strong> Fixed size = <code>1</code> (Discards out-of-order frames)</li>
                <li>• <strong>Retransmission:</strong> Retransmits frame <code>N</code> and ALL subsequent frames</li>
              </ul>
            </div>
            <div class="p-3.5 rounded-lg bg-white dark:bg-slate-800 border-l-4 border-emerald-500 border border-slate-200 dark:border-slate-700">
              <span class="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">Selective Repeat (SR) Rules</span>
              <ul class="space-y-1 text-slate-600 dark:text-slate-300 font-sans text-[11px]">
                <li>• <strong>Send Window:</strong> Maximum size = <code>2^(m - 1)</code></li>
                <li>• <strong>Receive Window:</strong> Size = <code>2^(m - 1)</code> (Buffers out-of-order frames)</li>
                <li>• <strong>Retransmission:</strong> Retransmits ONLY the damaged or lost frame</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // 5. Channel Allocation (FDMA & TDMA)
  renderChannelAllocationDiagram: function() {
    return `
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Static Channel Allocation: FDMA vs. TDMA Architecture
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded font-bold">
            No Contention
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- FDMA Box -->
          <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <div class="flex justify-between items-center mb-2">
              <span class="font-bold text-xs text-blue-600 dark:text-blue-400">FDMA (Frequency Division)</span>
              <span class="text-[10px] text-slate-400 font-mono">Dedicated Frequencies</span>
            </div>
            <div class="space-y-1 font-mono text-center text-xs">
              <div class="p-2 rounded bg-blue-500 text-white font-bold">Channel 1: Frequency f1 (User 1)</div>
              <div class="p-0.5 text-[8px] bg-slate-200 dark:bg-slate-700 text-slate-500 font-sans">Guard Band (Prevents Crosstalk)</div>
              <div class="p-2 rounded bg-indigo-500 text-white font-bold">Channel 2: Frequency f2 (User 2)</div>
              <div class="p-0.5 text-[8px] bg-slate-200 dark:bg-slate-700 text-slate-500 font-sans">Guard Band</div>
              <div class="p-2 rounded bg-purple-500 text-white font-bold">Channel 3: Frequency f3 (User 3)</div>
            </div>
            <p class="text-[10px] text-slate-500 mt-2">Continuous transmission on non-overlapping frequency bands.</p>
          </div>

          <!-- TDMA Box -->
          <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <div class="flex justify-between items-center mb-2">
              <span class="font-bold text-xs text-emerald-600 dark:text-emerald-400">TDMA (Time Division)</span>
              <span class="text-[10px] text-slate-400 font-mono">Full Bandwidth Sharing</span>
            </div>
            <div class="grid grid-cols-3 gap-1 font-mono text-center text-xs">
              <div class="p-3 rounded bg-emerald-500 text-white font-bold">Slot 1<br><span class="text-[9px]">User 1</span></div>
              <div class="p-3 rounded bg-teal-500 text-white font-bold">Slot 2<br><span class="text-[9px]">User 2</span></div>
              <div class="p-3 rounded bg-cyan-600 text-white font-bold">Slot 3<br><span class="text-[9px]">User 3</span></div>
            </div>
            <div class="text-center font-mono text-[10px] text-slate-400 mt-1">Repeating TDMA Frame Period T</div>
            <p class="text-[10px] text-slate-500 mt-2">Each station transmits at full channel speed during its assigned time slot.</p>
          </div>
        </div>
      </div>
    `;
  },

  // 6. ALOHA Protocols
  renderAlohaDiagram: function() {
    return `
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              ALOHA Systems: Vulnerable Intervals & Collisions
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded font-bold">
            Random Access
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <div class="flex justify-between items-center mb-2">
              <span class="font-bold text-red-600 dark:text-red-400">Pure ALOHA (Unslotted)</span>
              <span class="font-mono text-[10px] font-bold text-slate-500">Max S = 18.4%</span>
            </div>
            <div class="p-3 bg-red-50 dark:bg-red-950/40 rounded-lg border border-red-200 dark:border-red-800 mb-2 font-mono text-[11px]">
              <div class="text-red-700 dark:text-red-300 font-bold mb-1">Vulnerable Time: 2 × Tfr</div>
              <div class="text-slate-600 dark:text-slate-300 text-[10px] font-sans">
                A frame transmitted at time t collides if any other station transmits between (t - Tfr) and (t + Tfr).
              </div>
            </div>
            <p class="text-[11px] text-slate-500">Transmits whenever data is ready without clock synchronization.</p>
          </div>

          <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <div class="flex justify-between items-center mb-2">
              <span class="font-bold text-emerald-600 dark:text-emerald-400">Slotted ALOHA (Discrete Clock)</span>
              <span class="font-mono text-[10px] font-bold text-emerald-600">Max S = 36.8%</span>
            </div>
            <div class="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800 mb-2 font-mono text-[11px]">
              <div class="text-emerald-700 dark:text-emerald-300 font-bold mb-1">Vulnerable Time: 1 × Tfr</div>
              <div class="text-slate-600 dark:text-slate-300 text-[10px] font-sans">
                Transmissions are forced to start strictly at discrete slot boundaries, cutting collision window in half!
              </div>
            </div>
            <p class="text-[11px] text-slate-500">Requires global clock synchronization across all transmitting nodes.</p>
          </div>
        </div>
      </div>
    `;
  },

  // 7. CSMA, CSMA/CD, CSMA/CA
  renderCsmaDiagram: function() {
    return `
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
    `;
  },

  // 7b. CSMA/CD Operation & Exponential Backoff Diagram
  renderCsmaCdDiagram: function() {
    return `
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
    `;
  },

  // 7c. CSMA/CA Operation & Collision Avoidance Diagram
  renderCsmaCaDiagram: function() {
    return `
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
    `;
  },


  // 8a. Bit-Map Protocol Diagram
  renderBitmapDiagram: function() {
    return `
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
    `;
  },

  // 8b. Binary Countdown Protocol Diagram
  renderBinaryCountdownDiagram: function() {
    return `
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
    `;
  },

  // 8c. Token Passing Protocol & Topologies Diagram
  renderTokenPassingDiagram: function() {
    return `
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
    `;
  },

  // 8d. Reservation & Polling Working Principles Diagram
  renderPollingReservationDiagram: function() {
    return `
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
    `;
  },

  // 8. Collision-Free Protocols
  renderCollisionFreeDiagram: function() {
    return `
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Collision-Free MAC: Token Passing & Reservation Protocols
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded font-bold">
            Zero Collisions
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <!-- Token Ring -->
          <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <span class="font-bold text-emerald-600 dark:text-emerald-400 block mb-2 flex items-center gap-1.5">
              <i class="fa-solid fa-arrows-spin text-emerald-500"></i> Token Passing Protocol (IEEE 802.5)
            </span>
            <div class="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg text-center font-mono text-[11px] mb-2 border border-slate-200 dark:border-slate-800">
              [ Station 1 ] ──▶ [ Station 2 ] ──▶ [ Station 3 ] ──▶ [ Station 4 ] ──▶ (Cycle)
            </div>
            <p class="text-[11px] text-slate-500 leading-relaxed">
              A special 3-byte token circulates the ring. A station must seize the free token to transmit data, eliminating contention.
            </p>
          </div>

          <!-- Bit-Map Protocol -->
          <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <span class="font-bold text-blue-600 dark:text-blue-400 block mb-2 flex items-center gap-1.5">
              <i class="fa-solid fa-table-cells text-blue-500"></i> Bit-Map Reservation Protocol
            </span>
            <div class="flex items-center gap-1 font-mono text-center text-xs mb-2">
              <span class="p-1.5 bg-blue-500 text-white rounded font-bold grow">Slot 0: 1</span>
              <span class="p-1.5 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded grow">Slot 1: 0</span>
              <span class="p-1.5 bg-blue-500 text-white rounded font-bold grow">Slot 2: 1</span>
              <span class="p-1.5 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded grow">Slot 3: 0</span>
            </div>
            <p class="text-[11px] text-slate-500 leading-relaxed">
              Contention period consists of N reservation bits. Stations transmit in ascending numerical order after reservation.
            </p>
          </div>
        </div>
      </div>
    `;
  },

  // 9a. Ethernet Architecture: LLC vs MAC Sublayers Diagram
  renderEthernetArchitectureDiagram: function() {
    return `
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
    `;
  },

  // 9b. Ethernet 48-Bit MAC Addressing Diagram
  renderMacAddressingDiagram: function() {
    return `
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
    `;
  },

  // 9c. Binary Exponential Backoff Algorithm Table Diagram
  renderExponentialBackoffDiagram: function() {
    return `
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
    `;
  },

  // 9d. Ethernet Evolution Diagram
  renderEthernetEvolutionDiagram: function() {
    return `
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
    `;
  },

  // 9. Ethernet Frame & IEEE 802.3
  renderEthernetFrameDiagram: function() {
    return `
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              IEEE 802.3 Ethernet Frame Format & MAC Addressing Architecture
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded font-bold">
            64 to 1518 Bytes
          </span>
        </div>

        <div class="space-y-4">
          <!-- Frame Segment Layout -->
          <div class="grid grid-cols-7 gap-1 font-mono text-center text-xs">
            <div class="p-2 rounded-l-lg bg-slate-600 text-white shadow-xs">
              <span class="block text-[8px] uppercase tracking-wider opacity-75">Preamble</span>
              <span class="text-[11px] font-bold">7 Bytes</span>
              <span class="block text-[8px] opacity-75">101010...</span>
            </div>
            <div class="p-2 bg-amber-600 text-white shadow-xs">
              <span class="block text-[8px] uppercase tracking-wider opacity-75">SFD</span>
              <span class="text-[11px] font-bold">1 Byte</span>
              <span class="block text-[8px] opacity-75">10101011</span>
            </div>
            <div class="p-2 bg-blue-600 text-white shadow-xs">
              <span class="block text-[8px] uppercase tracking-wider opacity-75">Dst MAC</span>
              <span class="text-[11px] font-bold">6 Bytes</span>
              <span class="block text-[8px] opacity-75">48 Bits</span>
            </div>
            <div class="p-2 bg-indigo-600 text-white shadow-xs">
              <span class="block text-[8px] uppercase tracking-wider opacity-75">Src MAC</span>
              <span class="text-[11px] font-bold">6 Bytes</span>
              <span class="block text-[8px] opacity-75">48 Bits</span>
            </div>
            <div class="p-2 bg-purple-600 text-white shadow-xs">
              <span class="block text-[8px] uppercase tracking-wider opacity-75">Type / Len</span>
              <span class="text-[11px] font-bold">2 Bytes</span>
              <span class="block text-[8px] opacity-75">0x0800=IPv4</span>
            </div>
            <div class="p-2 bg-emerald-600 text-white shadow-xs">
              <span class="block text-[8px] uppercase tracking-wider opacity-75">Data Payload</span>
              <span class="text-[11px] font-bold">46–1500B</span>
              <span class="block text-[8px] opacity-75">MTU=1500</span>
            </div>
            <div class="p-2 rounded-r-lg bg-red-600 text-white shadow-xs">
              <span class="block text-[8px] uppercase tracking-wider opacity-75">CRC FCS</span>
              <span class="text-[11px] font-bold">4 Bytes</span>
              <span class="block text-[8px] opacity-75">CRC-32</span>
            </div>
          </div>

          <!-- MAC Address Breakdown -->
          <div class="bg-white dark:bg-slate-800 p-3.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
            <span class="font-bold text-slate-800 dark:text-slate-200 block mb-1.5">48-Bit (6-Byte) Physical MAC Address Structure:</span>
            <div class="flex items-center gap-1 font-mono text-center text-xs">
              <div class="bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 p-2 rounded-l border border-blue-200 dark:border-blue-800 grow">
                <span class="font-bold">Organizationally Unique Identifier (OUI)</span>
                <span class="block text-[10px] text-slate-500 font-sans">First 24 Bits (Assigned by IEEE to Hardware Vendor)</span>
              </div>
              <div class="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 p-2 rounded-r border border-emerald-200 dark:border-emerald-800 grow">
                <span class="font-bold">Network Interface Controller (NIC) Serial</span>
                <span class="block text-[10px] text-slate-500 font-sans">Last 24 Bits (Assigned by Manufacturer to Adapter)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // 10. Wireless LAN: Hidden & Exposed Terminals
  renderBssEssArchitectureDiagram: function() {
    return `
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
    `;
  },

  renderHiddenTerminalDiagram: function() {
    return `
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
    `;
  },

  renderExposedTerminalDiagram: function() {
    return `
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
    `;
  },

  renderWirelessMultipleAccessDiagram: function() {
    return `
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
              Wireless signal power decays rapidly with distance ($P \propto 1/d^2$ or $1/d^4$). Collision energy dissipates before traveling back to the distant sender.
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
    `;
  },

  renderDcfPcfDiagram: function() {
    return `
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
    `;
  },

  renderWirelessHiddenExposedDiagram: function() {
    return `
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Wireless LAN Contention: Hidden & Exposed Terminal Scenarios
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded font-bold">
            RF Asymmetry
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <!-- Hidden Terminal -->
          <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <span class="font-bold text-red-600 dark:text-red-400 block mb-2 flex items-center gap-1.5">
              <i class="fa-solid fa-eye-slash text-red-500"></i> Hidden Terminal Problem
            </span>
            <div class="p-3 bg-red-50 dark:bg-red-950/40 rounded-lg border border-red-200 dark:border-red-800 text-center font-mono text-xs mb-2">
              <span class="font-bold text-blue-600">[ Station A ]</span> ──▶ 
              <span class="font-bold text-red-600 bg-red-100 dark:bg-red-900 px-2 py-1 rounded">💥 Collision at B</span> 
              ◀── <span class="font-bold text-purple-600">[ Station C ]</span>
            </div>
            <p class="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              Station A and C are out of each other's radio range. Both sense channel idle and transmit to B simultaneously, corrupting B's reception.
            </p>
          </div>

          <!-- Exposed Terminal -->
          <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <span class="font-bold text-amber-600 dark:text-amber-400 block mb-2 flex items-center gap-1.5">
              <i class="fa-solid fa-volume-xmark text-amber-500"></i> Exposed Terminal Problem
            </span>
            <div class="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-800 text-center font-mono text-xs mb-2">
              [ A ] ◀── <span class="font-bold text-blue-600">[ B ]</span> · · (hears B) · · <span class="font-bold text-amber-600">[ C ]</span> ──(prevented)──▶ [ D ]
            </div>
            <p class="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              Station C wants to transmit to D. It overhears B transmitting to A and falsely concludes the medium is busy, wasting channel capacity!
            </p>
          </div>
        </div>
      </div>
    `;
  },

  // 11. IEEE 802.11 Wi-Fi & RTS/CTS Handshake
  renderWifiFrameFormatDiagram: function() {
    return `
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
    `;
  },

  renderWifiIfsDiagram: function() {
    return `
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
    `;
  },

  renderCsmaCaBackoffDiagram: function() {
    return `
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
    `;
  },

  renderWifiNavDiagram: function() {
    return `
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
    `;
  },

  renderWifiMacArchitectureDiagram: function() {
    return `
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
    `;
  },

  renderWifiRtsCtsDiagram: function() {
    return `
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              IEEE 802.11 CSMA/CA: 4-Way RTS/CTS Handshake & NAV Reservation
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded font-bold">
            Virtual Carrier Sensing
          </span>
        </div>

        <div class="space-y-3 font-mono text-xs">
          <div class="flex items-center justify-between p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span class="font-bold text-blue-600">1. Sender (A)</span>
            <span class="flex items-center gap-2 text-blue-600 font-bold">
              <span>Sends Request-to-Send (RTS)</span>
              <i class="fa-solid fa-arrow-right"></i>
            </span>
            <span class="text-slate-500">Receiver (AP)</span>
          </div>

          <div class="flex items-center justify-between p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span class="text-slate-500">Sender (A)</span>
            <span class="flex items-center gap-2 text-emerald-600 font-bold">
              <i class="fa-solid fa-arrow-left"></i>
              <span>Receiver returns Clear-to-Send (CTS)</span>
            </span>
            <span class="font-bold text-emerald-600">Receiver (AP)</span>
          </div>

          <div class="p-2 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-800 text-center font-sans text-[11px] text-amber-800 dark:text-amber-200">
            <i class="fa-solid fa-clock"></i> <strong>Network Allocation Vector (NAV) Active:</strong> All neighbor stations set NAV countdown and remain silent!
          </div>

          <div class="flex items-center justify-between p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span class="font-bold text-blue-600">3. Sender (A)</span>
            <span class="flex items-center gap-2 text-purple-600 font-bold">
              <span>Transmits Data Frame</span>
              <i class="fa-solid fa-arrow-right"></i>
            </span>
            <span class="text-slate-500">Receiver (AP)</span>
          </div>

          <div class="flex items-center justify-between p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span class="text-slate-500">Sender (A)</span>
            <span class="flex items-center gap-2 text-emerald-600 font-bold">
              <i class="fa-solid fa-arrow-left"></i>
              <span>Receiver transmits ACK after SIFS</span>
            </span>
            <span class="font-bold text-emerald-600">Receiver (AP)</span>
          </div>
        </div>
      </div>
    `;
  },

  // 12. Data Link Layer Switching & Spanning Tree Protocol (STP)
  renderSwitchingStpDiagram: function() {
    return `
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Layer 2 Switching: MAC Address Learning & Spanning Tree (STP)
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded font-bold">
            IEEE 802.1D
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <!-- MAC Table -->
          <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <span class="font-bold text-slate-800 dark:text-slate-200 block mb-2 flex items-center gap-1.5">
              <i class="fa-solid fa-table-list text-blue-500"></i> Switch Self-Learning Forwarding Database
            </span>
            <div class="space-y-1 font-mono text-[11px]">
              <div class="flex justify-between p-1.5 bg-slate-100 dark:bg-slate-900 font-bold text-slate-500 rounded">
                <span>Switch Port</span>
                <span>Learned MAC Address</span>
                <span>Aging Timer</span>
              </div>
              <div class="flex justify-between p-1.5 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300">
                <span class="font-bold">Port 1</span>
                <span>00:1A:2B:3C:4D:01</span>
                <span>298s</span>
              </div>
              <div class="flex justify-between p-1.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300">
                <span class="font-bold">Port 2</span>
                <span>00:1A:2B:3C:4D:02</span>
                <span>300s</span>
              </div>
              <div class="flex justify-between p-1.5 rounded bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300">
                <span class="font-bold">Port 3</span>
                <span>00:1A:2B:3C:4D:03</span>
                <span>240s</span>
              </div>
            </div>
            <p class="text-[10px] text-slate-500 mt-2">Filter if destination is on ingress port; forward if known; flood if unknown.</p>
          </div>

          <!-- STP Logic -->
          <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <span class="font-bold text-slate-800 dark:text-slate-200 block mb-2 flex items-center gap-1.5">
              <i class="fa-solid fa-diagram-project text-emerald-500"></i> Spanning Tree Loop Prevention
            </span>
            <div class="space-y-2 font-mono text-[11px]">
              <div class="p-2 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300">
                <span class="font-bold">Root Bridge:</span> Lowest Bridge ID (Priority + MAC)
              </div>
              <div class="p-2 rounded bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300">
                <span class="font-bold">Root Ports:</span> Lowest cost path to Root Bridge (Forwarding)
              </div>
              <div class="p-2 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300">
                <span class="font-bold">Blocking Ports:</span> Redundant loops disabled to prevent broadcast storms!
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // 13. Networking Devices & Collision Domains
  renderNetworkingDevicesDiagram: function() {
    return `
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-gfg-green animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Networking Devices Hierarchy: OSI Operating Layers & Domain Boundaries
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded font-bold">
            Hardware Comparison
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <!-- Hub -->
          <div class="p-3.5 rounded-xl bg-white dark:bg-slate-800 border-t-4 border-red-500 border border-slate-200 dark:border-slate-700">
            <span class="font-bold text-red-600 dark:text-red-400 block mb-1">Hub (Layer 1)</span>
            <p class="text-[11px] text-slate-500 mb-2">Repeats electrical bits blindly to all ports.</p>
            <div class="space-y-1 font-mono text-[10px]">
              <span class="block bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 p-1 rounded">1 Collision Domain</span>
              <span class="block bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 p-1 rounded">1 Broadcast Domain</span>
            </div>
          </div>

          <!-- Switch -->
          <div class="p-3.5 rounded-xl bg-white dark:bg-slate-800 border-t-4 border-blue-500 border border-slate-200 dark:border-slate-700">
            <span class="font-bold text-blue-600 dark:text-blue-400 block mb-1">Switch (Layer 2)</span>
            <p class="text-[11px] text-slate-500 mb-2">Forwards frames using hardware MAC address table.</p>
            <div class="space-y-1 font-mono text-[10px]">
              <span class="block bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 p-1 rounded">Dedicated Collision Domain/Port</span>
              <span class="block bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 p-1 rounded">1 Broadcast Domain</span>
            </div>
          </div>

          <!-- Router -->
          <div class="p-3.5 rounded-xl bg-white dark:bg-slate-800 border-t-4 border-emerald-500 border border-slate-200 dark:border-slate-700">
            <span class="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">Router (Layer 3)</span>
            <p class="text-[11px] text-slate-500 mb-2">Routes IP packets across heterogeneous subnets.</p>
            <div class="space-y-1 font-mono text-[10px]">
              <span class="block bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 p-1 rounded">Dedicated Collision Domain/Port</span>
              <span class="block bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 p-1 rounded">Separates Broadcast Domains!</span>
            </div>
          </div>

          <!-- Gateway -->
          <div class="p-3.5 rounded-xl bg-white dark:bg-slate-800 border-t-4 border-purple-500 border border-slate-200 dark:border-slate-700">
            <span class="font-bold text-purple-600 dark:text-purple-400 block mb-1">Gateway (L4–L7)</span>
            <p class="text-[11px] text-slate-500 mb-2">Converts between incompatible protocol suites.</p>
            <div class="space-y-1 font-mono text-[10px]">
              <span class="block bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 p-1 rounded">Full Protocol Translation</span>
              <span class="block bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 p-1 rounded">Application/Transport Proxy</span>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // 14. Error Control & CRC
  renderErrorControlDiagram: function() {
    return `
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse"></span>
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Error Detection & Correction: CRC Modulo-2 Division & Hamming Code
            </h4>
          </div>
          <span class="text-[10px] font-mono bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded font-bold">
            Data Link Integrity
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <!-- CRC -->
          <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <span class="font-bold text-blue-600 dark:text-blue-400 block mb-2 flex items-center gap-1.5">
              <i class="fa-solid fa-calculator text-blue-500"></i> Cyclic Redundancy Check (CRC)
            </span>
            <div class="p-2.5 bg-slate-50 dark:bg-slate-900 rounded font-mono text-[11px] space-y-1 border border-slate-200 dark:border-slate-800 mb-2">
              <div><strong>Data Bits:</strong> <code>1 0 0 1 0 0</code></div>
              <div><strong>Generator G(x):</strong> <code>1 1 0 1</code> (Degree r = 3)</div>
              <div><strong>Appended Data:</strong> <code>1 0 0 1 0 0 0 0 0</code> (r zeroes added)</div>
              <div class="text-emerald-600 dark:text-emerald-400 font-bold"><strong>FCS Remainder:</strong> <code>0 0 1</code> (Modulo-2 XOR)</div>
            </div>
            <p class="text-[10px] text-slate-500">Transmitted Frame = [Data Bits] + [FCS Remainder]. Receiver divides by G(x); remainder 0 confirms error-free frame.</p>
          </div>

          <!-- Hamming Code -->
          <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <span class="font-bold text-purple-600 dark:text-purple-400 block mb-2 flex items-center gap-1.5">
              <i class="fa-solid fa-shield-halved text-purple-500"></i> Hamming(7,4) Code SECDED
            </span>
            <div class="grid grid-cols-7 gap-1 font-mono text-center text-xs mb-2">
              <div class="p-1.5 bg-purple-500 text-white rounded font-bold">p1<br><span class="text-[8px]">Pos 1</span></div>
              <div class="p-1.5 bg-purple-500 text-white rounded font-bold">p2<br><span class="text-[8px]">Pos 2</span></div>
              <div class="p-1.5 bg-blue-500 text-white rounded font-bold">d1<br><span class="text-[8px]">Pos 3</span></div>
              <div class="p-1.5 bg-purple-500 text-white rounded font-bold">p4<br><span class="text-[8px]">Pos 4</span></div>
              <div class="p-1.5 bg-blue-500 text-white rounded font-bold">d2<br><span class="text-[8px]">Pos 5</span></div>
              <div class="p-1.5 bg-blue-500 text-white rounded font-bold">d3<br><span class="text-[8px]">Pos 6</span></div>
              <div class="p-1.5 bg-blue-500 text-white rounded font-bold">d4<br><span class="text-[8px]">Pos 7</span></div>
            </div>
            <p class="text-[10px] text-slate-500">Parity bits placed at powers of 2 (1, 2, 4, 8). Syndrome calculated by receiver identifies exact bit position of error for auto-correction!</p>
          </div>
        </div>
      </div>
    `;
  },

  // 3b. IEEE 802 Architecture: LLC vs MAC Sublayers
  renderMacSublayerDiagram: function() {
    return `
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
    `;
  },

  // 3c. Signal Collision on Shared Medium
  renderCollisionDiagram: function() {
    return `
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
    `;
  },

  // 4b. Dynamic Channel Allocation Taxonomy
  renderDynamicAccessDiagram: function() {
    return `
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
    `;
  },
};

if (typeof window !== 'undefined') {
  window.CleanDiagramEngine = CleanDiagramEngine;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CleanDiagramEngine;
}
