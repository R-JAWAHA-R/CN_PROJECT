// =============================================================================
// Clean Diagram Engine: Modern Visual Architecture & Protocol Schematics
// Replaces obsolete ASCII/symbol art with clean, responsive, interactive diagrams
// Strictly aligned with Master Syllabus, Kurose & Ross, Forouzan, and Tanenbaum
// =============================================================================

const CleanDiagramEngine = {
  getDiagramHtml: function(topic) {
    if (!topic) return '';
    const id = typeof topic === 'string' ? topic : (topic.id || '');

    // --- Unit 3 – Network Layer Interactive Schematics ---
    if (id === 'ip-addressing' || id === 'u3-ip-addressing-basics') {
      return this.renderIpAddressingDiagram();
    }
    if (id === 'ipv4' || id === 'ipv4-classes' || id === 'ipv4-protocol') {
      return this.renderIpv4ClassesDiagram();
    }
    if (id === 'subnetting' || id === 'u3-subnetting') {
      return this.renderSubnettingDiagram();
    }
    if (id === 'ipv6' || id === 'ipv6-addressing' || id === 'ipv6-protocol') {
      return this.renderIpv6Diagram();
    }
    if (id === 'ipv4-vs-ipv6' || id === 'u3-ipv4-vs-ipv6') {
      return this.renderIpv4VsIpv6Diagram();
    }
    if (id === 'internetworking' || id === 'tunneling' || id === 'internetwork-routing') {
      return this.renderInternetworkingDiagram(id);
    }
    if (id === 'optimality-principle' || id === 'dijkstra' || id === 'shortest-path-algorithm' || id === 'flooding') {
      return this.renderRoutingAlgorithmsDiagram(id);
    }
    if (id === 'distance-vector' || id === 'distance-vector-routing') {
      return this.renderDistanceVectorDiagram();
    }
    if (id === 'link-state-routing') {
      return this.renderLinkStateDiagram();
    }
    if (id === 'routing-table-updates') {
      return this.renderRoutingTableUpdatesDiagram();
    }
    if (id === 'comparison-dv-ls') {
      return this.renderComparisonDvLsDiagram();
    }
    if (id === 'count-to-infinity') {
      return this.renderCountToInfinityDiagram();
    }
    if (id === 'traffic-aware-routing' || id === 'admission-control' || id === 'traffic-throttling' || id === 'load-shedding' || id === 'congestion-control') {
      return this.renderCongestionControlDiagram(id);
    }

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

    // 10. IEEE 802.11 MAC & RTS/CTS
    if (id === 'wifi-mac-sublayer' || id === 'u2-ieee-802-11-intro' || id === 'u2-ieee-802-11-architecture' || id === 'u2-ieee-802-11-dcf' || id === 'u2-ieee-802-11-pcf' || id === 'u2-ieee-802-11-csma-ca' || id === 'u2-ieee-802-11-ifs' || id === 'u2-rts-cts-mechanism' || id === 'u2-network-allocation-vector' || id === 'u2-ieee-802-11-frame-formats' || id === 'u2-dcf-vs-pcf') {
      return this.renderWifiRtsCtsDiagram();
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

  // ===========================================================================
  // UNIT 3 – NETWORK LAYER ARCHITECTURAL SCHEMATICS & DIAGRAMS
  // ===========================================================================

  // 3.1 IP Addressing Basics: Logical Address Structure & MAC Re-encapsulation
  renderIpAddressingDiagram: function() {
    return `
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span class="text-[10px] font-black tracking-wider uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded">Interactive Architecture Diagram</span>
            <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1">IP Addressing: Network/Host Division & Router Hop Forwarding</h4>
          </div>
          <span class="text-xs font-mono text-slate-500">RFC 791 / OSI Layer 3</span>
        </div>

        <!-- Two Part Structure of IP -->
        <div class="mb-5 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div class="text-xs font-bold text-slate-700 dark:text-slate-200 mb-2 flex items-center justify-between">
            <span>A. Hierarchical 32-Bit Address Division (Example: 192.168.1.10 /24)</span>
            <span class="text-[10px] font-mono text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">Prefix Length /24</span>
          </div>
          <div class="grid grid-cols-12 gap-1 text-center font-mono text-xs">
            <div class="col-span-9 bg-emerald-500 text-white font-bold p-2.5 rounded-l-lg shadow-sm">
              <div class="text-[10px] uppercase tracking-wider text-emerald-100">Network Portion (Prefix)</div>
              <div class="text-sm">192.168.1</div>
              <div class="text-[9px] text-emerald-200 mt-0.5">24 Bits (Identifies the Subnet)</div>
            </div>
            <div class="col-span-3 bg-blue-500 text-white font-bold p-2.5 rounded-r-lg shadow-sm">
              <div class="text-[10px] uppercase tracking-wider text-blue-100">Host Portion</div>
              <div class="text-sm">.10</div>
              <div class="text-[9px] text-blue-200 mt-0.5">8 Bits (Interface)</div>
            </div>
          </div>
        </div>

        <!-- IP vs MAC Forwarding Journey -->
        <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div class="text-xs font-bold text-slate-700 dark:text-slate-200 mb-3 flex items-center gap-2">
            <i class="fa-solid fa-route text-emerald-600"></i>
            <span>B. Packet Journey Across Subnets (IP Stays Constant, MAC Changes at Each Hop)</span>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3 items-center text-center text-xs">
            <!-- Source Host -->
            <div class="p-3 rounded-lg border-2 border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30">
              <div class="font-bold text-emerald-700 dark:text-emerald-300">Host A (Source)</div>
              <div class="font-mono text-[11px] text-slate-600 dark:text-slate-300 mt-1">IP: 192.168.1.10</div>
              <div class="font-mono text-[10px] text-slate-500">MAC: 00:AA:11:22:33:44</div>
              <div class="mt-2 text-[10px] bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100 py-0.5 px-1 rounded">Local Subnet 1</div>
            </div>

            <!-- Default Gateway Router -->
            <div class="p-3 rounded-lg border-2 border-amber-500 bg-amber-50/50 dark:bg-amber-950/30">
              <div class="font-bold text-amber-700 dark:text-amber-300">Router (Default Gateway)</div>
              <div class="font-mono text-[10px] text-slate-600 dark:text-slate-300 mt-1">
                In: 192.168.1.1 (MAC: R1-In)<br/>
                Out: 10.0.0.1 (MAC: R1-Out)
              </div>
              <div class="mt-2 text-[10px] bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100 py-0.5 px-1 rounded">
                Inspects Dest IP ➔ Rewrites MAC
              </div>
            </div>

            <!-- Destination Host -->
            <div class="p-3 rounded-lg border-2 border-blue-500 bg-blue-50/50 dark:bg-blue-950/30">
              <div class="font-bold text-blue-700 dark:text-blue-300">Host B (Destination)</div>
              <div class="font-mono text-[11px] text-slate-600 dark:text-slate-300 mt-1">IP: 10.0.0.20</div>
              <div class="font-mono text-[10px] text-slate-500">MAC: 00:BB:55:66:77:88</div>
              <div class="mt-2 text-[10px] bg-blue-200 dark:bg-blue-900 text-blue-900 dark:text-blue-100 py-0.5 px-1 rounded">Remote Subnet 2</div>
            </div>
          </div>

          <div class="mt-3 p-2.5 rounded bg-slate-100 dark:bg-slate-900/80 text-[11px] text-slate-600 dark:text-slate-300 flex items-center justify-around font-mono">
            <span>Payload IP Header: [Src: 192.168.1.10 ➔ Dst: 10.0.0.20] (UNALTERED)</span>
          </div>
        </div>
      </div>
    `;
  },

  // 3.2 IPv4 Addressing and Classes: Classful Breakdown A-E
  renderIpv4ClassesDiagram: function() {
    return `
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span class="text-[10px] font-black tracking-wider uppercase text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded">Classful Architecture & Octets</span>
            <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1">IPv4 32-Bit Dotted Decimal & Historical Classes (A, B, C, D, E)</h4>
          </div>
          <span class="text-xs font-mono text-slate-500">2^32 = 4,294,967,296 Addresses</span>
        </div>

        <div class="space-y-3 font-mono text-xs">
          <!-- Class A -->
          <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border-l-4 border-emerald-500 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <div>
              <span class="font-bold text-emerald-600 dark:text-emerald-400">Class A (1 – 126)</span>
              <span class="text-[10px] text-slate-500 ml-2">Leading Bit: <strong>0</strong> | Default Mask: <strong>255.0.0.0 (/8)</strong></span>
              <div class="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">8 Net Bits (126 Networks) • 24 Host Bits (16,777,214 Hosts/Net)</div>
            </div>
            <div class="flex gap-1 text-[10px] font-bold">
              <span class="bg-emerald-500 text-white px-2 py-0.5 rounded">0xxxxxxx</span>
              <span class="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-2 py-0.5 rounded">Host</span>
              <span class="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-2 py-0.5 rounded">Host</span>
              <span class="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-2 py-0.5 rounded">Host</span>
            </div>
          </div>

          <!-- Class B -->
          <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border-l-4 border-blue-500 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <div>
              <span class="font-bold text-blue-600 dark:text-blue-400">Class B (128 – 191)</span>
              <span class="text-[10px] text-slate-500 ml-2">Leading Bits: <strong>10</strong> | Default Mask: <strong>255.255.0.0 (/16)</strong></span>
              <div class="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">16 Net Bits (16,384 Networks) • 16 Host Bits (65,534 Hosts/Net)</div>
            </div>
            <div class="flex gap-1 text-[10px] font-bold">
              <span class="bg-blue-500 text-white px-2 py-0.5 rounded">10xxxxxx</span>
              <span class="bg-blue-400 text-white px-2 py-0.5 rounded">Network</span>
              <span class="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-2 py-0.5 rounded">Host</span>
              <span class="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-2 py-0.5 rounded">Host</span>
            </div>
          </div>

          <!-- Class C -->
          <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border-l-4 border-amber-500 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <div>
              <span class="font-bold text-amber-600 dark:text-amber-400">Class C (192 – 223)</span>
              <span class="text-[10px] text-slate-500 ml-2">Leading Bits: <strong>110</strong> | Default Mask: <strong>255.255.255.0 (/24)</strong></span>
              <div class="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">24 Net Bits (2,097,152 Networks) • 8 Host Bits (254 Hosts/Net)</div>
            </div>
            <div class="flex gap-1 text-[10px] font-bold">
              <span class="bg-amber-500 text-white px-2 py-0.5 rounded">110xxxxx</span>
              <span class="bg-amber-400 text-white px-2 py-0.5 rounded">Network</span>
              <span class="bg-amber-400 text-white px-2 py-0.5 rounded">Network</span>
              <span class="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-2 py-0.5 rounded">Host</span>
            </div>
          </div>

          <!-- Class D & E -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            <div class="p-2.5 bg-purple-50 dark:bg-purple-950/30 rounded border border-purple-200 dark:border-purple-800">
              <div class="font-bold text-purple-700 dark:text-purple-300">Class D (224 – 239) • Multicast</div>
              <div class="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5">Leading: <strong>1110</strong> • Delivers packets to interested multicast groups.</div>
            </div>
            <div class="p-2.5 bg-rose-50 dark:bg-rose-950/30 rounded border border-rose-200 dark:border-rose-800">
              <div class="font-bold text-rose-700 dark:text-rose-300">Class E (240 – 255) • Experimental</div>
              <div class="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5">Leading: <strong>1111</strong> • Reserved by IETF for future research & experiments.</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // 3.3 Subnetting: Host Bit Borrowing & 4-Subnet Division
  renderSubnettingDiagram: function() {
    return `
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span class="text-[10px] font-black tracking-wider uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded">Subnetting Worked Schematic</span>
            <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1">Dividing 192.168.1.0/24 into 4 Subnets (/26, Block Size = 64)</h4>
          </div>
          <span class="text-xs font-mono text-slate-500">2^s = 4 ➔ s=2, h=6</span>
        </div>

        <!-- Bit Borrowing Diagram -->
        <div class="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 mb-4 font-mono text-xs text-center">
          <div class="text-[11px] font-bold text-slate-700 dark:text-slate-200 mb-2">4th Octet Bit Decomposition (Original /24 ➔ New /26)</div>
          <div class="flex justify-center gap-1">
            <span class="p-2 bg-emerald-600 text-white font-bold rounded w-12" title="Borrowed bit 1 (weight 128)">1<br/><span class="text-[8px]">128</span></span>
            <span class="p-2 bg-emerald-600 text-white font-bold rounded w-12" title="Borrowed bit 2 (weight 64)">1<br/><span class="text-[8px]">64</span></span>
            <span class="p-2 bg-blue-500 text-white rounded w-9" title="Host bit 6">0<br/><span class="text-[8px]">32</span></span>
            <span class="p-2 bg-blue-500 text-white rounded w-9" title="Host bit 5">0<br/><span class="text-[8px]">16</span></span>
            <span class="p-2 bg-blue-500 text-white rounded w-9" title="Host bit 4">0<br/><span class="text-[8px]">8</span></span>
            <span class="p-2 bg-blue-500 text-white rounded w-9" title="Host bit 3">0<br/><span class="text-[8px]">4</span></span>
            <span class="p-2 bg-blue-500 text-white rounded w-9" title="Host bit 2">0<br/><span class="text-[8px]">2</span></span>
            <span class="p-2 bg-blue-500 text-white rounded w-9" title="Host bit 1">0<br/><span class="text-[8px]">1</span></span>
          </div>
          <div class="mt-2 text-[10px] text-slate-500 flex justify-center gap-6">
            <span class="text-emerald-600 font-bold">Borrowed Subnet Bits: 2 (2^2 = 4 Subnets)</span>
            <span class="text-blue-600 font-bold">Remaining Host Bits: 6 (2^6 - 2 = 62 Usable Hosts)</span>
          </div>
        </div>

        <!-- 4 Subnet Blocks Visual -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-2.5 text-xs font-mono">
          <div class="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800">
            <div class="font-black text-emerald-700 dark:text-emerald-300">Subnet 1 (.0/26)</div>
            <div class="text-[10px] text-slate-600 dark:text-slate-300 mt-1">Net: .0</div>
            <div class="text-[10px] text-emerald-800 dark:text-emerald-200 font-bold">Usable: .1 – .62</div>
            <div class="text-[10px] text-slate-500">Bcast: .63</div>
          </div>
          <div class="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-300 dark:border-blue-800">
            <div class="font-black text-blue-700 dark:text-blue-300">Subnet 2 (.64/26)</div>
            <div class="text-[10px] text-slate-600 dark:text-slate-300 mt-1">Net: .64</div>
            <div class="text-[10px] text-blue-800 dark:text-blue-200 font-bold">Usable: .65 – .126</div>
            <div class="text-[10px] text-slate-500">Bcast: .127</div>
          </div>
          <div class="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800">
            <div class="font-black text-amber-700 dark:text-amber-300">Subnet 3 (.128/26)</div>
            <div class="text-[10px] text-slate-600 dark:text-slate-300 mt-1">Net: .128</div>
            <div class="text-[10px] text-amber-800 dark:text-amber-200 font-bold">Usable: .129 – .190</div>
            <div class="text-[10px] text-slate-500">Bcast: .191</div>
          </div>
          <div class="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-300 dark:border-purple-800">
            <div class="font-black text-purple-700 dark:text-purple-300">Subnet 4 (.192/26)</div>
            <div class="text-[10px] text-slate-600 dark:text-slate-300 mt-1">Net: .192</div>
            <div class="text-[10px] text-purple-800 dark:text-purple-200 font-bold">Usable: .193 – .254</div>
            <div class="text-[10px] text-slate-500">Bcast: .255</div>
          </div>
        </div>
      </div>
    `;
  },

  // 3.4 IPv6 Architecture: 128-Bit Hextets & Fixed 40-Byte Header
  renderIpv6Diagram: function() {
    return `
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span class="text-[10px] font-black tracking-wider uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded">128-Bit Architecture</span>
            <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1">IPv6 Address Format, Zero Compression & 40-Byte Base Header</h4>
          </div>
          <span class="text-xs font-mono text-slate-500">2^128 ≈ 3.4 × 10^38 Addresses</span>
        </div>

        <!-- Abbreviation Rules Visual -->
        <div class="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 mb-4 font-mono text-xs">
          <div class="text-[11px] font-bold text-slate-700 dark:text-slate-200 mb-2">RFC 5952 Compression Rules:</div>
          <div class="space-y-1.5 text-[11px]">
            <div class="p-2 rounded bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400">
              <span class="font-bold text-slate-900 dark:text-white">Original:</span> 2001:0DB8:0000:0000:0000:0000:0000:0001
            </div>
            <div class="p-2 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300">
              <span class="font-bold">Rule 1 (Omit Leading Zeros):</span> 2001:DB8:0:0:0:0:0:1
            </div>
            <div class="p-2 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold">
              <span>Rule 2 (Double Colon '::' Once):</span> 2001:DB8::1
            </div>
          </div>
        </div>

        <!-- 40-Byte Header Layout -->
        <div class="bg-white dark:bg-slate-800 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700">
          <div class="text-xs font-bold text-slate-700 dark:text-slate-200 mb-2">Fixed 40-Byte IPv6 Header Structure (8 Fields)</div>
          <div class="grid grid-cols-12 gap-1 text-center font-mono text-[10px] font-bold">
            <div class="col-span-2 bg-emerald-600 text-white p-2 rounded">Ver (4b)</div>
            <div class="col-span-3 bg-teal-600 text-white p-2 rounded">Traffic Class (8b)</div>
            <div class="col-span-7 bg-cyan-600 text-white p-2 rounded">Flow Label (20b)</div>
            <div class="col-span-4 bg-blue-600 text-white p-2 rounded">Payload Length (16b)</div>
            <div class="col-span-4 bg-indigo-600 text-white p-2 rounded">Next Header (8b)</div>
            <div class="col-span-4 bg-purple-600 text-white p-2 rounded">Hop Limit (8b)</div>
            <div class="col-span-12 bg-emerald-700 text-white p-2 rounded">Source IPv6 Address (128 bits / 16 bytes)</div>
            <div class="col-span-12 bg-blue-700 text-white p-2 rounded">Destination IPv6 Address (128 bits / 16 bytes)</div>
          </div>
        </div>
      </div>
    `;
  },

  // 3.5 IPv4 vs IPv6: Header Comparison & Transition Mechanisms
  renderIpv4VsIpv6Diagram: function() {
    return `
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span class="text-[10px] font-black tracking-wider uppercase text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2.5 py-1 rounded">Coexistence & Transition</span>
            <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1">IPv4 vs IPv6: 3 Major Transition Mechanisms</h4>
          </div>
          <span class="text-xs font-mono text-slate-500">Dual Stack • Tunneling • Translation</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <!-- Dual Stack -->
          <div class="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <div class="font-bold text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-1.5">
              <i class="fa-solid fa-layer-group"></i> 1. Dual Stack
            </div>
            <p class="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              Devices run both IPv4 and IPv6 protocol stacks simultaneously and choose based on DNS (A vs AAAA).
            </p>
            <div class="font-mono text-[10px] p-2 rounded bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300">
              Host has:<br/>
              • 192.168.1.10 (IPv4)<br/>
              • 2001:DB8::10 (IPv6)
            </div>
          </div>

          <!-- Tunneling -->
          <div class="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <div class="font-bold text-emerald-600 dark:text-emerald-400 mb-1 flex items-center gap-1.5">
              <i class="fa-solid fa-arrows-split-up-and-left"></i> 2. Tunneling (6to4)
            </div>
            <p class="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              Encapsulates an IPv6 packet inside an IPv4 packet to traverse an IPv4-only transit network.
            </p>
            <div class="font-mono text-[10px] p-2 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200">
              [IPv4 Header | [IPv6 Packet]]
            </div>
          </div>

          <!-- Translation -->
          <div class="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <div class="font-bold text-amber-600 dark:text-amber-400 mb-1 flex items-center gap-1.5">
              <i class="fa-solid fa-language"></i> 3. Translation (NAT64)
            </div>
            <p class="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              Translates packet headers between IPv6 and IPv4, allowing IPv6 clients to reach legacy IPv4 servers.
            </p>
            <div class="font-mono text-[10px] p-2 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200">
              IPv6 Client ➔ NAT64 ➔ IPv4 Server
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // Distance Vector Routing: Bellman-Ford Vector Exchange
  renderDistanceVectorDiagram: function() {
    return `
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span class="text-[10px] font-black tracking-wider uppercase text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded">Distance Vector Algorithm</span>
            <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1">Bellman-Ford Distributed Vector Exchange</h4>
          </div>
          <span class="text-xs font-mono text-slate-500">D_x(y) = min_v { c(x,v) + D_v(y) }</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs mb-3">
          <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <div class="font-bold text-blue-600 dark:text-blue-400 mb-1">1. Local Cost Table</div>
            <p class="text-[11px] text-slate-500">Each node measures physical link delays $c(x,v)$ to directly attached neighbors $v$.</p>
          </div>
          <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <div class="font-bold text-emerald-600 dark:text-emerald-400 mb-1">2. Periodic Exchange</div>
            <p class="text-[11px] text-slate-500">Every 30s, sends its current estimated vector $D_x$ to immediate direct neighbors only.</p>
          </div>
          <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <div class="font-bold text-indigo-600 dark:text-indigo-400 mb-1">3. Bellman-Ford Min</div>
            <p class="text-[11px] text-slate-500">Recomputes least cost to destination $y$ via neighbor $v$: updates routing table if cost drops.</p>
          </div>
        </div>

        <div class="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800/50 text-[11px] text-amber-800 dark:text-amber-300">
          <strong>Key Philosophy:</strong> "Tell your immediate neighbors about the entire world as you currently know it." Susceptible to slow convergence and Count-to-Infinity.
        </div>
      </div>
    `;
  },

  // Link State Routing: 5-Step SPF Process
  renderLinkStateDiagram: function() {
    return `
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span class="text-[10px] font-black tracking-wider uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded">Link State Algorithm</span>
            <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1">5-Step Dijkstra Shortest Path First (SPF) Pipeline</h4>
          </div>
          <span class="text-xs font-mono text-slate-500">OSPF / IS-IS • Global Topology Map</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center text-xs mb-3">
          <div class="p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <div class="w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-bold mx-auto mb-1 flex items-center justify-center text-[10px]">1</div>
            <div class="font-bold text-slate-700 dark:text-slate-200 text-[11px]">HELLO</div>
            <p class="text-[10px] text-slate-500">Discover immediate physical neighbors</p>
          </div>
          <div class="p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <div class="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 font-bold mx-auto mb-1 flex items-center justify-center text-[10px]">2</div>
            <div class="font-bold text-slate-700 dark:text-slate-200 text-[11px]">Echo/Delay</div>
            <p class="text-[10px] text-slate-500">Measure round-trip delay to each neighbor</p>
          </div>
          <div class="p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <div class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 font-bold mx-auto mb-1 flex items-center justify-center text-[10px]">3</div>
            <div class="font-bold text-slate-700 dark:text-slate-200 text-[11px]">Build LSP</div>
            <p class="text-[10px] text-slate-500">Assemble packet with Seq # and Link Costs</p>
          </div>
          <div class="p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <div class="w-6 h-6 rounded-full bg-amber-100 text-amber-600 font-bold mx-auto mb-1 flex items-center justify-center text-[10px]">4</div>
            <div class="font-bold text-slate-700 dark:text-slate-200 text-[11px]">Flood LSP</div>
            <p class="text-[10px] text-slate-500">Reliably flood LSP to entire network AS</p>
          </div>
          <div class="p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <div class="w-6 h-6 rounded-full bg-purple-100 text-purple-600 font-bold mx-auto mb-1 flex items-center justify-center text-[10px]">5</div>
            <div class="font-bold text-slate-700 dark:text-slate-200 text-[11px]">Dijkstra</div>
            <p class="text-[10px] text-slate-500">Execute SPF on LSDB to compute routes</p>
          </div>
        </div>

        <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800/50 text-[11px] text-emerald-800 dark:text-emerald-300">
          <strong>Key Philosophy:</strong> "Tell the entire world about your immediate neighbors." Fast convergence, loop-free, but requires higher memory and CPU for LSDB maintenance.
        </div>
      </div>
    `;
  },

  // 3.6 Routing Table Updates: Periodic Timers vs Triggered Updates
  renderRoutingTableUpdatesDiagram: function() {
    return `
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span class="text-[10px] font-black tracking-wider uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded">Update Mechanisms</span>
            <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1">Periodic Timers vs. Triggered (Flash) Updates</h4>
          </div>
          <span class="text-xs font-mono text-slate-500">RIP 30s • Triggered on Link Failure</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div class="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <div class="font-bold text-blue-600 dark:text-blue-400 mb-2">Periodic Updates (Timer-Driven)</div>
            <div class="space-y-1.5 text-[11px] font-mono text-slate-600 dark:text-slate-300">
              <div class="p-1.5 rounded bg-slate-100 dark:bg-slate-900">⏱️ Update Timer: Every 30 seconds</div>
              <div class="p-1.5 rounded bg-slate-100 dark:bg-slate-900">⏳ Invalid/Timeout Timer: 180 seconds</div>
              <div class="p-1.5 rounded bg-slate-100 dark:bg-slate-900">🗑️ Flush/Garbage Timer: 120 seconds</div>
            </div>
            <p class="text-[11px] text-slate-500 mt-2">Router sends complete distance vector to direct neighbors regardless of topology changes.</p>
          </div>

          <div class="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <div class="font-bold text-emerald-600 dark:text-emerald-400 mb-2">Triggered (Flash) Updates</div>
            <div class="p-2 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 text-[11px] font-mono mb-2">
              🚨 Event: Link to Network X severed!
            </div>
            <p class="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              Router does NOT wait for the 30-second timer. It immediately broadcasts an update setting Cost(X) = ∞ (16) to stop neighbor routing loops.
            </p>
          </div>
        </div>
      </div>
    `;
  },

  // 3.7 Comparison of DV vs LS Routing
  renderComparisonDvLsDiagram: function() {
    return `
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span class="text-[10px] font-black tracking-wider uppercase text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded">Routing Paradigm Comparison</span>
            <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1">Distance Vector (Bellman-Ford) vs. Link State (Dijkstra SPF)</h4>
          </div>
          <span class="text-xs font-mono text-slate-500">RIP vs OSPF / IS-IS</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div class="p-4 bg-white dark:bg-slate-800 rounded-xl border-t-4 border-amber-500 shadow-sm">
            <div class="font-bold text-amber-700 dark:text-amber-400 text-sm mb-1">Distance Vector (Tell Neighbors About the World)</div>
            <ul class="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300 mt-2">
              <li>• <strong>Knowledge:</strong> Only knows cost to reach destinations via direct neighbors ("Routing by rumor").</li>
              <li>• <strong>Updates:</strong> Periodic table exchanges with direct physical neighbors.</li>
              <li>• <strong>CPU & Memory:</strong> Low footprint; stores only distance vector.</li>
              <li>• <strong>Convergence:</strong> Slow; susceptible to Count-to-Infinity loops.</li>
            </ul>
          </div>

          <div class="p-4 bg-white dark:bg-slate-800 rounded-xl border-t-4 border-emerald-500 shadow-sm">
            <div class="font-bold text-emerald-700 dark:text-emerald-400 text-sm mb-1">Link State (Tell the World About Neighbors)</div>
            <ul class="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300 mt-2">
              <li>• <strong>Knowledge:</strong> Complete identical topology map of entire AS in Link State Database (LSDB).</li>
              <li>• <strong>Updates:</strong> Event-driven reliable flooding of Link State Packets (LSP).</li>
              <li>• <strong>CPU & Memory:</strong> Higher footprint; runs Dijkstra SPF locally.</li>
              <li>• <strong>Convergence:</strong> Fast; completely immune to count-to-infinity.</li>
            </ul>
          </div>
        </div>
      </div>
    `;
  },

  // 3.8 Count-to-Infinity Problem: Step-by-Step Link Failure Trace
  renderCountToInfinityDiagram: function() {
    return `
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span class="text-[10px] font-black tracking-wider uppercase text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2.5 py-1 rounded">Classic Failure Mode</span>
            <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1">The Count-to-Infinity Problem & Solution Techniques</h4>
          </div>
          <span class="text-xs font-mono text-slate-500">Good News Fast, Bad News Slow</span>
        </div>

        <!-- Failure Trace -->
        <div class="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 mb-3 font-mono text-xs">
          <div class="text-[11px] font-bold text-slate-700 dark:text-slate-200 mb-2">Topology: [ A ] &lt;=== link ===&gt; [ B ] &lt;=== link ===&gt; [ C ]</div>
          <div class="p-2 rounded bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 mb-2 text-[11px]">
            💥 Link A-B goes down! A is now unreachable.
          </div>
          <div class="space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
            <div>1. B sees link to A is down. But before B can act, C announces: "I can reach A with cost 2!"</div>
            <div>2. B mistakenly updates: Cost to A = 1 + 2 = 3 (via C).</div>
            <div>3. Next round: C hears B can reach A with cost 3 ➔ C updates Cost to A = 1 + 3 = 4 (via B).</div>
            <div>4. Packets bounce between B and C while cost climbs: 2 ➔ 3 ➔ 4 ➔ ... ➔ 16 (Infinity).</div>
          </div>
        </div>

        <!-- Remedies -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
          <div class="p-2.5 bg-emerald-50 dark:bg-emerald-950/30 rounded border border-emerald-200 dark:border-emerald-800">
            <span class="font-bold text-emerald-700 dark:text-emerald-300">Split Horizon</span>
            <p class="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5">Never advertise a route back out the same interface it was learned from.</p>
          </div>
          <div class="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
            <span class="font-bold text-blue-700 dark:text-blue-300">Poison Reverse</span>
            <p class="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5">Explicitly advertise the route back with metric ∞ (16) to invalidate reverse paths.</p>
          </div>
          <div class="p-2.5 bg-purple-50 dark:bg-purple-950/30 rounded border border-purple-200 dark:border-purple-800">
            <span class="font-bold text-purple-700 dark:text-purple-300">Max Hop Limit (15)</span>
            <p class="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5">Defines 16 as unreachable infinity, capping loop convergence time.</p>
          </div>
        </div>
      </div>
    `;
  },

  // 3.9 Internetworking Architecture, Routing & Tunneling (Detailed PDF Models)
  renderInternetworkingDiagram: function(id) {
    if (id === 'internetwork-routing') {
      return `
        <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span class="text-[10px] font-black tracking-wider uppercase text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded">Router Operations & Decision Engine</span>
              <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1">7-Step Packet Processing Pipeline & Longest Prefix Match (LPM)</h4>
            </div>
            <span class="text-xs font-mono text-slate-500">Control Plane (Routing) vs Data Plane (Forwarding)</span>
          </div>

          <!-- 7-Step Router Pipeline -->
          <div class="mb-4">
            <div class="text-[11px] font-bold text-slate-700 dark:text-slate-200 mb-2 flex items-center gap-1.5">
              <i class="fa-solid fa-arrows-split-up-and-left text-blue-600"></i> The 7-Step Internal Packet Handling Cycle:
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-1.5 text-center text-xs">
              <div class="p-2 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                <div class="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold mx-auto mb-1 flex items-center justify-center text-[10px]">1</div>
                <div class="font-bold text-[10px]">Rx Frame</div>
                <div class="text-[9px] text-slate-400">Buffer into RAM</div>
              </div>
              <div class="p-2 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                <div class="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold mx-auto mb-1 flex items-center justify-center text-[10px]">2</div>
                <div class="font-bold text-[10px]">Strip L2</div>
                <div class="text-[9px] text-slate-400">Remove MAC hdr</div>
              </div>
              <div class="p-2 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                <div class="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold mx-auto mb-1 flex items-center justify-center text-[10px]">3</div>
                <div class="font-bold text-[10px]">Read IP</div>
                <div class="text-[9px] text-slate-400">Read Dest IP</div>
              </div>
              <div class="p-2 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                <div class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold mx-auto mb-1 flex items-center justify-center text-[10px]">4</div>
                <div class="font-bold text-[10px] text-emerald-600">Check FIB</div>
                <div class="text-[9px] text-slate-400">LPM Lookup</div>
              </div>
              <div class="p-2 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                <div class="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold mx-auto mb-1 flex items-center justify-center text-[10px]">5</div>
                <div class="font-bold text-[10px]">Select Next</div>
                <div class="text-[9px] text-slate-400">Choose Egress</div>
              </div>
              <div class="p-2 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                <div class="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold mx-auto mb-1 flex items-center justify-center text-[10px]">6</div>
                <div class="font-bold text-[10px]">Rewrite L2</div>
                <div class="text-[9px] text-slate-400">New MAC + TTL-1</div>
              </div>
              <div class="p-2 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                <div class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold mx-auto mb-1 flex items-center justify-center text-[10px]">7</div>
                <div class="font-bold text-[10px] text-emerald-600">Tx Packet</div>
                <div class="text-[9px] text-slate-400">To Next Router</div>
              </div>
            </div>
          </div>

          <!-- Longest Prefix Match Walkthrough Card -->
          <div class="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
            <div class="flex items-center justify-between mb-2">
              <span class="font-bold text-slate-800 dark:text-slate-100">Longest Prefix Match (LPM) Example: Dest = <code class="text-emerald-600 dark:text-emerald-400 font-bold">10.1.2.50</code></span>
              <span class="text-[10px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">PDF Section 3.6</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-4 gap-2 font-mono text-[11px] text-center">
              <div class="p-2 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800">
                <div class="text-slate-500 text-[10px]">10.0.0.0/8</div>
                <div class="text-blue-600 font-bold text-[10px]">Matches 8 bits</div>
                <div class="text-[9px] text-slate-400">Router A</div>
              </div>
              <div class="p-2 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800">
                <div class="text-slate-500 text-[10px]">10.1.0.0/16</div>
                <div class="text-blue-600 font-bold text-[10px]">Matches 16 bits</div>
                <div class="text-[9px] text-slate-400">Router B</div>
              </div>
              <div class="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded border-2 border-emerald-500 text-emerald-800 dark:text-emerald-200 shadow-sm">
                <div class="font-black text-[10px]">10.1.2.0/24</div>
                <div class="font-bold text-[10px]">Matches 24 bits 🏆</div>
                <div class="text-[9px] font-bold text-emerald-600">Selected (Router C)</div>
              </div>
              <div class="p-2 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800">
                <div class="text-slate-500 text-[10px]">0.0.0.0/0 (Default)</div>
                <div class="text-slate-500 text-[10px]">Matches 0 bits</div>
                <div class="text-[9px] text-slate-400">Router D</div>
              </div>
            </div>
            <p class="text-[10px] text-slate-500 mt-2">
              <strong>Rule:</strong> The router selects <code>10.1.2.0/24</code> via Router C because /24 is strictly longer and more specific than /16, /8, or /0.
            </p>
          </div>
        </div>
      `;
    }

    if (id === 'tunneling') {
      return `
        <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span class="text-[10px] font-black tracking-wider uppercase text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2.5 py-1 rounded">Encapsulation & Overlays</span>
              <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1">IP Tunneling: Postal Envelope Analogy & IPv6-over-IPv4 Transit</h4>
            </div>
            <span class="text-xs font-mono text-slate-500">GRE • IPsec • WireGuard • MTU Overhead</span>
          </div>

          <!-- Postal Envelope Analogy Grid -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-xs mb-3 font-mono">
            <div class="p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div class="text-emerald-600 font-bold mb-0.5">📄 Confidential Letter</div>
              <div class="text-[10px] text-slate-500">Original Payload Packet (e.g. IPv6 / Private IP)</div>
            </div>
            <div class="p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div class="text-blue-600 font-bold mb-0.5">✉️ Outer Envelope</div>
              <div class="text-[10px] text-slate-500">Carrier Header added at Ingress Router</div>
            </div>
            <div class="p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div class="text-purple-600 font-bold mb-0.5">🚚 Postal Courier</div>
              <div class="text-[10px] text-slate-500">Intermediate Transit Network (ISP Routers)</div>
            </div>
            <div class="p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div class="text-amber-600 font-bold mb-0.5">✂️ Opening Envelope</div>
              <div class="text-[10px] text-slate-500">Decapsulation at Egress Router</div>
            </div>
          </div>

          <!-- Packet Structure & MTU Formula Card -->
          <div class="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
            <div class="font-bold text-slate-800 dark:text-slate-100 mb-2">Encapsulated Packet Sizing &amp; The MTU Penalty:</div>
            <div class="flex items-center gap-1 font-mono text-[10px] text-center overflow-x-auto pb-1 mb-2">
              <div class="p-2 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded shrink-0">
                Outer IPv4 Hdr<br/><span class="font-bold">20 Bytes</span>
              </div>
              <div class="p-2 bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100 rounded shrink-0">
                GRE Hdr<br/><span class="font-bold">4 Bytes</span>
              </div>
              <div class="p-2 bg-emerald-100 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100 rounded flex-1 min-w-[150px]">
                Inner Original Payload Packet (IPv6 / Private Corporate Data)<br/>
                <span class="font-bold">Effective MTU = 1500 - 24 = 1476 Bytes</span>
              </div>
            </div>
            <p class="text-[10px] text-slate-500">
              <strong>Path MTU Warning:</strong> Exceeding effective MTU with Don't Fragment (DF=1) bit set causes packet loss and Path MTU Black Holes if ICMP Type 3 Code 4 errors are blocked.
            </p>
          </div>
        </div>
      `;
    }

    // Default: internetworking (Concepts)
    return `
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span class="text-[10px] font-black tracking-wider uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded">Internetworking Fundamentals</span>
            <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1">Connecting Disparate Department LANs & Multi-City Offices via Routers</h4>
          </div>
          <span class="text-xs font-mono text-slate-500">Store-and-Forward • Heterogeneous Systems</span>
        </div>

        <!-- 3 Department / 3 Office Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-2 text-center text-xs mb-3 font-mono">
          <div class="p-3 bg-white dark:bg-slate-800 rounded-xl border-t-4 border-emerald-500 border-x border-b border-slate-200 dark:border-slate-700">
            <div class="font-bold text-emerald-700 dark:text-emerald-400">Chennai / CS Dept</div>
            <div class="text-[10px] text-slate-500 mt-1">Subnet 192.168.1.0/24</div>
            <div class="text-[9px] text-slate-400">Windows Clients &bull; Wi-Fi 6</div>
          </div>
          <div class="p-3 bg-white dark:bg-slate-800 rounded-xl border-t-4 border-blue-500 border-x border-b border-slate-200 dark:border-slate-700">
            <div class="font-bold text-blue-700 dark:text-blue-400">Bangalore / Mech Dept</div>
            <div class="text-[10px] text-slate-500 mt-1">Subnet 192.168.2.0/24</div>
            <div class="text-[9px] text-slate-400">Linux Clusters &bull; 10G Fiber</div>
          </div>
          <div class="p-3 bg-white dark:bg-slate-800 rounded-xl border-t-4 border-purple-500 border-x border-b border-slate-200 dark:border-slate-700">
            <div class="font-bold text-purple-700 dark:text-purple-400">Mumbai / EE Dept</div>
            <div class="text-[10px] text-slate-500 mt-1">Subnet 10.0.0.0/8</div>
            <div class="text-[9px] text-slate-400">Core Database &bull; GigE LAN</div>
          </div>
        </div>

        <div class="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
          <div class="font-bold text-slate-800 dark:text-slate-100 mb-1">Store-and-Forward Packet Switching Architecture:</div>
          <p class="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
            Routers buffer entire incoming frames, verify IP checksums, look up the destination network in forwarding tables, decrement TTL, and re-encapsulate with new outgoing Data Link MAC headers. IP acts as the unified abstraction layer bridging heterogeneous networks.
          </p>
        </div>
      </div>
    `;
  },

  // 3.10 Routing Algorithms: Optimality Principle, Dijkstra SPF & Flooding (Detailed PDF Models)
  renderRoutingAlgorithmsDiagram: function(id) {
    if (id === 'optimality-principle') {
      return `
        <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span class="text-[10px] font-black tracking-wider uppercase text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded">Routing Graph Theory</span>
              <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1">Bellman's Optimality Principle &amp; The Sink Tree Structure</h4>
            </div>
            <span class="text-xs font-mono text-slate-500">Loop-Free Guarantee • Dynamic Programming</span>
          </div>

          <!-- Optimality Principle Demonstration Card -->
          <div class="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 mb-3 text-xs">
            <div class="flex items-center justify-between mb-2">
              <span class="font-bold text-blue-600 dark:text-blue-400">1. Subpath Optimality Theorem (PDF Section 2.2)</span>
              <span class="text-[10px] font-mono text-slate-400">Total Path Cost = 2 + 3 + 1 = 6</span>
            </div>
            <div class="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-center text-xs mb-2">
              <span class="text-emerald-600 font-bold">[ A ]</span>
              <span class="text-slate-400"> &mdash;(cost 2)&rarr; </span>
              <span class="text-blue-600 font-bold">[ B ]</span>
              <span class="text-slate-400"> &mdash;(cost 3)&rarr; </span>
              <span class="text-purple-600 font-bold">[ C ]</span>
              <span class="text-slate-400"> &mdash;(cost 1)&rarr; </span>
              <span class="text-emerald-600 font-bold">[ D ]</span>
            </div>
            <p class="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Theorem:</strong> Since Router B lies on the optimal path from A to D, the subpath $B \rightarrow C \rightarrow D$ (cost 4) <em>must also be optimal</em> between B and D. If a hypothetical cheaper route existed (say, cost 2), concatenating $A \rightarrow B$ with it would give a total cost of $2 + 2 = 4 < 6$, contradicting the assumption that the original path was optimal!
            </p>
          </div>

          <!-- Sink Tree Demonstration Card -->
          <div class="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
            <div class="flex items-center justify-between mb-2">
              <span class="font-bold text-emerald-600 dark:text-emerald-400">2. Sink Tree Rooted at Destination E (PDF Section 2.4)</span>
              <span class="text-[10px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">100% Loop-Free</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px] text-center mb-2">
              <div class="p-2 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800">
                <span class="text-slate-500">From A:</span><br/>
                <span class="font-bold text-blue-600">A &rarr; B &rarr; E</span>
              </div>
              <div class="p-2 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800">
                <span class="text-slate-500">From B:</span><br/>
                <span class="font-bold text-blue-600">B &rarr; E</span>
              </div>
              <div class="p-2 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800">
                <span class="text-slate-500">From C:</span><br/>
                <span class="font-bold text-purple-600">C &rarr; D &rarr; E</span>
              </div>
              <div class="p-2 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800">
                <span class="text-slate-500">From D:</span><br/>
                <span class="font-bold text-purple-600">D &rarr; E</span>
              </div>
            </div>
            <p class="text-[10px] text-slate-500">
              <strong>Key Property:</strong> A tree contains no cycles. Every node has exactly one path into the root. A network with $N$ destinations possesses $N$ distinct sink trees.
            </p>
          </div>
        </div>
      `;
    }

    if (id === 'dijkstra' || id === 'shortest-path-algorithm') {
      return `
        <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span class="text-[10px] font-black tracking-wider uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded">Link-State SPF Algorithm</span>
              <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1">Dijkstra's Algorithm: 6-Node Step-by-Step Relaxation Trace</h4>
            </div>
            <span class="text-xs font-mono text-slate-500">Source Node = A &bull; Non-Negative Weights</span>
          </div>

          <!-- 6-Node Graph Specs -->
          <div class="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 mb-3 text-xs">
            <div class="font-bold text-slate-800 dark:text-slate-100 mb-1.5">Network Topology Links &amp; Costs (PDF Section 3.5):</div>
            <div class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-1.5 font-mono text-[10px] text-center">
              <div class="p-1.5 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800">A-B: 4</div>
              <div class="p-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold rounded border border-emerald-300">A-C: 2</div>
              <div class="p-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold rounded border border-emerald-300">B-C: 1</div>
              <div class="p-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold rounded border border-emerald-300">B-D: 5</div>
              <div class="p-1.5 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800">C-D: 8</div>
              <div class="p-1.5 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800">C-E: 10</div>
              <div class="p-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold rounded border border-emerald-300">D-E: 2</div>
              <div class="p-1.5 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800">D-F: 6</div>
              <div class="p-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold rounded border border-emerald-300">E-F: 3</div>
            </div>
          </div>

          <!-- Iteration Stepper Summary -->
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs font-mono text-center mb-3">
            <div class="p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div class="text-[10px] text-slate-400">Iter 1</div>
              <div class="font-bold text-emerald-600">Visit A (d=0)</div>
              <div class="text-[9px] text-slate-500">C=2, B=4</div>
            </div>
            <div class="p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div class="text-[10px] text-slate-400">Iter 2</div>
              <div class="font-bold text-emerald-600">Visit C (d=2)</div>
              <div class="text-[9px] text-slate-500">B&rarr;3, D=10, E=12</div>
            </div>
            <div class="p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div class="text-[10px] text-slate-400">Iter 3</div>
              <div class="font-bold text-emerald-600">Visit B (d=3)</div>
              <div class="text-[9px] text-slate-500">D&rarr;8</div>
            </div>
            <div class="p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div class="text-[10px] text-slate-400">Iter 4</div>
              <div class="font-bold text-emerald-600">Visit D (d=8)</div>
              <div class="text-[9px] text-slate-500">E&rarr;10, F=14</div>
            </div>
            <div class="p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div class="text-[10px] text-slate-400">Iter 5</div>
              <div class="font-bold text-emerald-600">Visit E (d=10)</div>
              <div class="text-[9px] text-slate-500">F&rarr;13</div>
            </div>
            <div class="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-300 dark:border-emerald-700">
              <div class="text-[10px] text-emerald-600">Iter 6 [Done]</div>
              <div class="font-bold text-emerald-700 dark:text-emerald-300">Visit F (d=13)</div>
              <div class="text-[9px] text-emerald-600 font-bold">All Visited 🏆</div>
            </div>
          </div>

          <div class="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800 text-[11px] text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
            <span><strong>Final Shortest Path A &rarr; F:</strong> <code>A &rarr; C &rarr; B &rarr; D &rarr; E &rarr; F</code></span>
            <span class="font-bold font-mono">Cost: 2 + 1 + 5 + 2 + 3 = 13</span>
          </div>
        </div>
      `;
    }

    if (id === 'flooding') {
      return `
        <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span class="text-[10px] font-black tracking-wider uppercase text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded">Multi-Path Dissemination</span>
              <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1">Flooding Algorithm, Duplicate Storms &amp; Damping Controls</h4>
            </div>
            <span class="text-xs font-mono text-slate-500">Uncontrolled vs Controlled &bull; RPF</span>
          </div>

          <!-- Multi-Path Propagation -->
          <div class="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 mb-3 text-xs">
            <div class="font-bold text-slate-800 dark:text-slate-100 mb-1.5">Packet Propagation Cycle (PDF Section 4.3):</div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-2 font-mono text-[11px] text-center">
              <div class="p-2 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800">
                <span class="text-emerald-600 font-bold">1. Source A</span><br/>
                <span class="text-slate-400 text-[10px]">Replicates &amp; forwards copies to B &amp; C</span>
              </div>
              <div class="p-2 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800">
                <span class="text-blue-600 font-bold">2. B &amp; C Forward</span><br/>
                <span class="text-slate-400 text-[10px]">B &rarr; D; C &rarr; D and E</span>
              </div>
              <div class="p-2 bg-amber-50 dark:bg-amber-950/40 rounded border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300">
                <span class="font-bold">3. Destination E</span><br/>
                <span class="text-[10px]">Receives multiple copies from C and D!</span>
              </div>
            </div>
          </div>

          <!-- 4 Damping Controls -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            <div class="p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div class="font-bold text-emerald-600 dark:text-emerald-400 mb-0.5">1. Hop Count (TTL)</div>
              <p class="text-[10px] text-slate-500">Decremented at each router. Discarded when TTL reaches 0 to cap lifespan.</p>
            </div>
            <div class="p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div class="font-bold text-blue-600 dark:text-blue-400 mb-0.5">2. Sequence Numbers</div>
              <p class="text-[10px] text-slate-500">Routers cache (Source, Seq#). Duplicate arrivals are immediately dropped.</p>
            </div>
            <div class="p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div class="font-bold text-purple-600 dark:text-purple-400 mb-0.5">3. Selective Flooding</div>
              <p class="text-[10px] text-slate-500">Forwards packets only through links pointing toward destination sector.</p>
            </div>
            <div class="p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div class="font-bold text-amber-600 dark:text-amber-400 mb-0.5">4. Reverse Path (RPF)</div>
              <p class="text-[10px] text-slate-500">Forwards only if packet arrives on interface used to reach source.</p>
            </div>
          </div>
        </div>
      `;
    }

    // Fallback
    return `
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 mb-2">Routing Algorithm Framework</h4>
        <p class="text-xs text-slate-600 dark:text-slate-300">Graph-based path finding and multi-path dissemination.</p>
      </div>
    `;
  },

  // 3.11 Congestion Control: Specialized Diagrams for Topic 5 Subtopics
  renderCongestionControlDiagram: function(id) {
    if (id === 'traffic-aware-routing') {
      return `
        <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span class="text-[10px] font-black tracking-wider uppercase text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded">Congestion Avoidance</span>
              <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1">Traffic-Aware Dynamic Path Selection (Path 1 vs. Path 2)</h4>
            </div>
            <span class="text-xs font-mono text-slate-500">Real-Time Metric Rerouting</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mb-3">
            <div class="p-3 bg-white dark:bg-slate-800 rounded-xl border border-rose-200 dark:border-rose-900/40">
              <div class="flex items-center justify-between font-bold text-rose-700 dark:text-rose-400 mb-1">
                <span>Path 1: A &rarr; B &rarr; D (Congested)</span>
                <span class="px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 text-[10px]">CHOKED</span>
              </div>
              <ul class="space-y-1 text-[11px] text-slate-600 dark:text-slate-300 mt-2 font-mono">
                <li>• Estimated Latency: <strong class="text-rose-600">150 ms</strong></li>
                <li>• Link Utilization: <strong class="text-rose-600">95% (Near Saturation)</strong></li>
                <li>• Residual Bandwidth: <strong class="text-rose-600">5 Mbps</strong></li>
              </ul>
              <div class="mt-2 text-[10px] text-rose-700 bg-rose-50 dark:bg-rose-950/30 p-1.5 rounded">
                &times; Heavy queuing delay and high buffer overflow drop risk.
              </div>
            </div>

            <div class="p-3 bg-white dark:bg-slate-800 rounded-xl border border-emerald-200 dark:border-emerald-900/40">
              <div class="flex items-center justify-between font-bold text-emerald-700 dark:text-emerald-400 mb-1">
                <span>Path 2: A &rarr; C &rarr; D (Alternate)</span>
                <span class="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[10px]">&check; SELECTED</span>
              </div>
              <ul class="space-y-1 text-[11px] text-slate-600 dark:text-slate-300 mt-2 font-mono">
                <li>• Estimated Latency: <strong class="text-emerald-600">40 ms (3.75x Faster)</strong></li>
                <li>• Link Utilization: <strong class="text-emerald-600">35% (Lightly Loaded)</strong></li>
                <li>• Residual Bandwidth: <strong class="text-emerald-600">40 Mbps (8x Capacity)</strong></li>
              </ul>
              <div class="mt-2 text-[10px] text-emerald-700 bg-emerald-50 dark:bg-emerald-950/30 p-1.5 rounded">
                &check; Smooth packet forwarding; bypasses congested link.
              </div>
            </div>
          </div>

          <div class="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800/50 text-[11px] text-blue-900 dark:text-blue-300">
            <strong>Key Mechanism:</strong> Dynamic link weight function $C(e) = C_0(e) + \alpha \cdot \frac{U(e)}{1 - U(e)}$ heavily penalizes links nearing 100% capacity, steering flows toward underutilized paths while damping avoids route flapping.
          </div>
        </div>
      `;
    }

    if (id === 'admission-control') {
      return `
        <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span class="text-[10px] font-black tracking-wider uppercase text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2.5 py-1 rounded">Congestion Prevention</span>
              <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1">Flow Admission Control & Resource Reservation Gate</h4>
            </div>
            <span class="text-xs font-mono text-slate-500">Pre-Transmission Check</span>
          </div>

          <!-- Capacity Bar Visualization -->
          <div class="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 mb-3 text-xs">
            <div class="flex justify-between font-bold mb-1.5 text-[11px]">
              <span>100 Mbps Backbone Link Allocation:</span>
              <span class="font-mono text-purple-600">Total = 100 Mbps</span>
            </div>
            <div class="w-full bg-slate-200 dark:bg-slate-700 h-5 rounded-full overflow-hidden flex">
              <div class="bg-indigo-600 h-full text-[10px] text-white flex items-center justify-center font-bold" style="width: 70%;">Active: 70 Mbps</div>
              <div class="bg-emerald-500 h-full text-[10px] text-white flex items-center justify-center font-bold" style="width: 20%;">Req 1: 20 Mbps</div>
              <div class="bg-amber-400 h-full text-[10px] text-slate-900 flex items-center justify-center font-bold" style="width: 10%;">Free: 10M</div>
            </div>
            <div class="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-slate-100 dark:border-slate-700 text-[11px]">
              <div class="p-2 rounded bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-200">
                <strong>&check; Request 1 (20 Mbps):</strong> 30 Mbps free &ge; 20 Mbps needed &rarr; <span class="font-bold underline">ACCEPTED</span>.
              </div>
              <div class="p-2 rounded bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-200">
                <strong>&times; Request 2 (25 Mbps):</strong> Only 10 Mbps free &lt; 25 Mbps needed &rarr; <span class="font-bold underline">REJECTED</span>.
              </div>
            </div>
          </div>

          <div class="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800/50 text-[11px] text-purple-900 dark:text-purple-300">
            <strong>Analogy & Purpose:</strong> Like a 50-seat classroom turning away a 10-person group once 48 seats are filled, admission control protects existing flows from packet drops and quality degradation.
          </div>
        </div>
      `;
    }

    if (id === 'traffic-throttling') {
      return `
        <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span class="text-[10px] font-black tracking-wider uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded">Rate Regulation</span>
              <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1">Traffic Shaping: Token Bucket vs. Leaky Bucket</h4>
            </div>
            <span class="text-xs font-mono text-slate-500">Pacing & Feedback (ECN)</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mb-3">
            <div class="p-3 bg-white dark:bg-slate-800 rounded-xl border border-blue-200 dark:border-blue-900/40">
              <div class="font-bold text-blue-700 dark:text-blue-300 mb-1 flex items-center justify-between">
                <span>&bull; Token Bucket Algorithm</span>
                <span class="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">Permits Bursts</span>
              </div>
              <ul class="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300 mt-2">
                <li>• <strong>Token Pool:</strong> Tokens generate at constant rate $\rho$; bucket holds up to $\beta$.</li>
                <li>• <strong>Bursts:</strong> Transmits at wire speed $C$ for duration $S = \frac{\beta}{C - \rho}$.</li>
                <li>• <strong>Overflow:</strong> Discards idle tokens; packets stay safely in queue.</li>
              </ul>
            </div>

            <div class="p-3 bg-white dark:bg-slate-800 rounded-xl border border-indigo-200 dark:border-indigo-900/40">
              <div class="font-bold text-indigo-700 dark:text-indigo-300 mb-1 flex items-center justify-between">
                <span>&bull; Leaky Bucket Algorithm</span>
                <span class="text-[10px] bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded">Rigid Rate</span>
              </div>
              <ul class="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300 mt-2">
                <li>• <strong>Smooth Output:</strong> Irregular packet arrivals enter FIFO queue.</li>
                <li>• <strong>Fixed Leak:</strong> Emits packets at strictly constant uniform rate $r$.</li>
                <li>• <strong>Overflow:</strong> Discards incoming packets if bucket queue fills up.</li>
              </ul>
            </div>
          </div>

          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800/50 text-[11px] text-emerald-900 dark:text-emerald-300">
            <strong>Closed-Loop Feedback:</strong> Modern routers set Explicit Congestion Notification (ECN RFC 3168) bits in IP headers, prompting senders to throttle rates <em>before</em> packets are dropped.
          </div>
        </div>
      `;
    }

    if (id === 'load-shedding') {
      return `
        <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span class="text-[10px] font-black tracking-wider uppercase text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2.5 py-1 rounded">Emergency Relief</span>
              <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1">Router Buffer Overload & Selective Load Shedding</h4>
            </div>
            <span class="text-xs font-mono text-slate-500">Wine vs. Milk Policies</span>
          </div>

          <!-- Buffer Discard Calculation Card -->
          <div class="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 mb-3 text-xs font-mono">
            <div class="text-[11px] font-bold text-slate-700 dark:text-slate-200 mb-1">Syllabus Calculation: Buffer Capacity = 100 Packets</div>
            <div class="grid grid-cols-3 gap-2 text-center text-[10px] my-2">
              <div class="p-1.5 bg-slate-100 dark:bg-slate-700 rounded">Queued: <strong>90 pkts</strong></div>
              <div class="p-1.5 bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 rounded">Available: <strong>10 pkts</strong></div>
              <div class="p-1.5 bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200 rounded">Arriving: <strong>30 pkts</strong></div>
            </div>
            <div class="p-2 rounded bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 text-[11px]">
              &rArr; 10 packets accepted into remaining buffer; <strong>20 packets must be discarded</strong>.
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div class="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-xl border border-purple-200 dark:border-purple-800">
              <div class="font-bold text-purple-700 dark:text-purple-300 mb-1">&bull; Wine Policy (File Transfers)</div>
              <p class="text-[11px] text-slate-600 dark:text-slate-300">
                <em>"Old is better than new."</em> Discard newly arrived packets; preserve older packets that have already traversed multiple hops to protect invested network work.
              </p>
            </div>

            <div class="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800">
              <div class="font-bold text-amber-700 dark:text-amber-300 mb-1">&bull; Milk Policy (VoIP / Streaming)</div>
              <p class="text-[11px] text-slate-600 dark:text-slate-300">
                <em>"Fresh is better than stale."</em> Discard old buffered packets whose playback deadline has passed; forward fresh, newly arrived frames.
              </p>
            </div>
          </div>
        </div>
      `;
    }

    // Default / Master Overview
    return `
      <div class="clean-diagram-card bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span class="text-[10px] font-black tracking-wider uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded">Master Overview</span>
            <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1">The Four Pillars of Congestion Control</h4>
          </div>
          <span class="text-xs font-mono text-slate-500">Unit 3 &bull; Topic 5</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
          <div class="p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <div class="font-bold text-blue-600 mb-1">1. Traffic-Aware</div>
            <p class="text-[10px] text-slate-500">Reroutes packets to less congested paths based on delay and link utilization.</p>
          </div>
          <div class="p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <div class="font-bold text-purple-600 mb-1">2. Admission Control</div>
            <p class="text-[10px] text-slate-500">Proactively accepts or rejects new flows to guarantee resources for active sessions.</p>
          </div>
          <div class="p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <div class="font-bold text-emerald-600 mb-1">3. Traffic Throttling</div>
            <p class="text-[10px] text-slate-500">Shapes transmission speeds using Token Bucket and Leaky Bucket algorithms.</p>
          </div>
          <div class="p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <div class="font-bold text-rose-600 mb-1">4. Load Shedding</div>
            <p class="text-[10px] text-slate-500">Deliberately drops selected packets (Wine/Milk) to prevent total network collapse.</p>
          </div>
        </div>
      </div>
    `;
  }
};

if (typeof window !== 'undefined') {
  window.CleanDiagramEngine = CleanDiagramEngine;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CleanDiagramEngine;
}
