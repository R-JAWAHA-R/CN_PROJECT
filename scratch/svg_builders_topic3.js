// scratch/svg_builders_topic3.js
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../assets/images/topic3');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function writeSvg(filename, svgContent) {
  fs.writeFileSync(path.join(outDir, filename), svgContent.trim(), 'utf8');
  console.log(`Created topic3/${filename}`);
}

// 1. MAC Sublayer Stack (IEEE 802 Model)
writeSvg('mac-sublayer-stack.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 500" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <rect x="30" y="20" width="840" height="54" rx="10" fill="#0F172A" />
  <text x="50" y="53" fill="#F8FAFC" font-size="18" font-weight="700">IEEE 802 Sublayer Split: Logical Link Control (LLC) vs Media Access Control (MAC)</text>

  <g transform="translate(50, 95)">
    <!-- OSI Layer 3 (above) -->
    <rect x="0" y="0" width="800" height="42" rx="8" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1.5" />
    <text x="400" y="26" fill="#1E40AF" font-size="13" font-weight="bold" text-anchor="middle">Network Layer (Layer 3 &bull; IPv4 / IPv6 Packets)</text>

    <!-- Arrow Down -->
    <line x1="400" y1="42" x2="400" y2="65" stroke="#64748B" stroke-width="2" />
    <polygon points="400,68 395,58 405,58" fill="#64748B" />

    <!-- Data Link Layer Bracket -->
    <rect x="0" y="75" width="800" height="210" rx="12" fill="#F8FAFC" stroke="#059669" stroke-width="2.5" />
    <rect x="15" y="85" width="220" height="24" rx="6" fill="#059669" />
    <text x="125" y="101" fill="#FFF" font-size="11" font-weight="bold" text-anchor="middle">DATA LINK LAYER (Layer 2)</text>

    <!-- LLC Sublayer (Upper) -->
    <g transform="translate(30, 120)">
      <rect width="740" height="55" rx="8" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5" />
      <rect width="180" height="55" rx="8" fill="#ECFDF5" />
      <text x="90" y="26" fill="#065F46" font-size="12" font-weight="bold" text-anchor="middle">LLC Sublayer</text>
      <text x="90" y="42" fill="#059669" font-size="10" text-anchor="middle">IEEE 802.2 Standard</text>
      <text x="210" y="26" fill="#0F172A" font-size="11.5" font-weight="600">Logical Link Control (Media-Independent)</text>
      <text x="210" y="44" fill="#64748B" font-size="10.5">Multiplexing protocols (SAP/SNAP headers), flow control, and uniform interface to Layer 3.</text>
    </g>

    <!-- MAC Sublayer (Lower - Highlighted) -->
    <g transform="translate(30, 195)">
      <rect width="740" height="75" rx="8" fill="#FFFFFF" stroke="#10B981" stroke-width="2" />
      <rect width="180" height="75" rx="8" fill="#10B981" />
      <text x="90" y="34" fill="#FFFFFF" font-size="13" font-weight="bold" text-anchor="middle">MAC Sublayer</text>
      <text x="90" y="52" fill="#D1FAE5" font-size="10" font-weight="bold" text-anchor="middle">IEEE 802.3, 802.11, etc.</text>
      <text x="210" y="26" fill="#065F46" font-size="12" font-weight="bold">Medium Access Control (Media-Specific)</text>
      <text x="210" y="44" fill="#334155" font-size="11">&bull; Arbitrates multi-station contention on shared broadcast media.</text>
      <text x="210" y="62" fill="#334155" font-size="11">&bull; Generates 48-bit MAC addresses, frame delimiters (preamble/SFD), and CRC-32 checksum.</text>
    </g>

    <!-- Arrow Down -->
    <line x1="400" y1="285" x2="400" y2="308" stroke="#64748B" stroke-width="2" />
    <polygon points="400,311 395,301 405,301" fill="#64748B" />

    <!-- Physical Layer (below) -->
    <rect x="0" y="315" width="800" height="42" rx="8" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1.5" />
    <text x="400" y="341" fill="#92400E" font-size="13" font-weight="bold" text-anchor="middle">Physical Layer (Layer 1 &bull; 1000BASE-T, 802.11 Wi-Fi RF, Fiber Transceivers)</text>
  </g>
</svg>
`);

// 2. Need for MAC Sublayer on Shared Broadcast Medium
writeSvg('need-for-mac-broadcast-medium.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 490" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <rect x="30" y="20" width="840" height="54" rx="10" fill="#0F172A" />
  <text x="50" y="53" fill="#F8FAFC" font-size="18" font-weight="700">The Need for the MAC Sublayer: Broadcast Channels &amp; Collision Elimination</text>

  <g transform="translate(50, 95)">
    <!-- Top Half: Scenario WITHOUT MAC (Collisions &amp; Chaos) -->
    <rect x="0" y="0" width="800" height="165" rx="10" fill="#FEF2F2" stroke="#FCA5A5" stroke-width="1.5" />
    <rect x="15" y="12" width="180" height="24" rx="4" fill="#EF4444" />
    <text x="105" y="28" fill="#FFF" font-size="11" font-weight="bold" text-anchor="middle">WITHOUT MAC: Channel Chaos</text>

    <!-- Bus Line -->
    <line x1="80" y1="90" x2="720" y2="90" stroke="#94A3B8" stroke-width="6" stroke-linecap="round" />

    <!-- Host A transmits -->
    <g transform="translate(100, 45)">
      <rect width="60" height="35" rx="4" fill="#FFFFFF" stroke="#EF4444" stroke-width="2" /><text x="30" y="22" fill="#DC2626" font-weight="bold" text-anchor="middle">Node A</text>
      <line x1="30" y1="35" x2="30" y2="45" stroke="#EF4444" stroke-width="2" />
    </g>

    <!-- Host B transmits simultaneously -->
    <g transform="translate(250, 45)">
      <rect width="60" height="35" rx="4" fill="#FFFFFF" stroke="#EF4444" stroke-width="2" /><text x="30" y="22" fill="#DC2626" font-weight="bold" text-anchor="middle">Node B</text>
      <line x1="30" y1="35" x2="30" y2="45" stroke="#EF4444" stroke-width="2" />
    </g>

    <!-- Collision Blast -->
    <g transform="translate(400, 90)">
      <circle cx="0" cy="0" r="26" fill="#FEE2E2" stroke="#EF4444" stroke-width="2" />
      <polygon points="0,-16 5,-5 16,-5 8,3 11,14 0,7 -11,14 -8,3 -16,-5 -5,-5" fill="#EF4444" />
      <text x="0" y="42" fill="#DC2626" font-size="11" font-weight="bold" text-anchor="middle">COLLISION!</text>
      <text x="0" y="56" fill="#991B1B" font-size="9.5" text-anchor="middle">Garbled Signals &bull; 0% Throughput</text>
    </g>

    <!-- Host C -->
    <g transform="translate(630, 45)">
      <rect width="60" height="35" rx="4" fill="#FFFFFF" stroke="#94A3B8" /><text x="30" y="22" fill="#64748B" text-anchor="middle">Node C</text>
      <line x1="30" y1="35" x2="30" y2="45" stroke="#94A3B8" stroke-width="2" />
    </g>

    <!-- Bottom Half: Scenario WITH MAC Sublayer (Orderly Access) -->
    <rect x="0" y="180" width="800" height="180" rx="10" fill="#ECFDF5" stroke="#6EE7B7" stroke-width="1.5" />
    <rect x="15" y="192" width="220" height="24" rx="4" fill="#10B981" />
    <text x="125" y="208" fill="#FFF" font-size="11" font-weight="bold" text-anchor="middle">WITH MAC: Coordinated Transmission</text>

    <!-- Coordinated Bus -->
    <line x1="80" y1="270" x2="720" y2="270" stroke="#059669" stroke-width="6" stroke-linecap="round" />

    <!-- Host A Transmitting -->
    <g transform="translate(100, 225)">
      <rect width="60" height="35" rx="4" fill="#FFFFFF" stroke="#10B981" stroke-width="2" /><text x="30" y="22" fill="#065F46" font-weight="bold" text-anchor="middle">Node A</text>
      <line x1="30" y1="35" x2="30" y2="45" stroke="#10B981" stroke-width="2" />
      <rect x="-10" y="50" width="80" height="18" rx="3" fill="#D1FAE5" />
      <text x="30" y="63" fill="#065F46" font-size="8.5" font-weight="bold" text-anchor="middle">Transmitting</text>
    </g>

    <!-- Host B Deferring -->
    <g transform="translate(250, 225)">
      <rect width="60" height="35" rx="4" fill="#FFFFFF" stroke="#F59E0B" stroke-width="1.5" /><text x="30" y="22" fill="#D97706" text-anchor="middle">Node B</text>
      <line x1="30" y1="35" x2="30" y2="45" stroke="#F59E0B" stroke-width="2" />
      <rect x="-5" y="50" width="70" height="18" rx="3" fill="#FEF3C7" />
      <text x="30" y="63" fill="#92400E" font-size="8.5" font-weight="bold" text-anchor="middle">Senses Busy</text>
    </g>

    <!-- Clean Signal Flow -->
    <g transform="translate(390, 260)">
      <rect x="0" y="-12" width="200" height="24" rx="4" fill="#FFFFFF" stroke="#059669" stroke-width="1.5" />
      <text x="100" y="4" fill="#065F46" font-size="10" font-weight="bold" text-anchor="middle">Clean Uninterrupted Frame Delivery</text>
    </g>

    <!-- Host C Receiving -->
    <g transform="translate(630, 225)">
      <rect width="60" height="35" rx="4" fill="#FFFFFF" stroke="#3B82F6" stroke-width="2" /><text x="30" y="22" fill="#1E40AF" font-weight="bold" text-anchor="middle">Node C</text>
      <line x1="30" y1="35" x2="30" y2="45" stroke="#3B82F6" stroke-width="2" />
      <rect x="-10" y="50" width="80" height="18" rx="3" fill="#DBEAFE" />
      <text x="30" y="63" fill="#1E40AF" font-size="8.5" font-weight="bold" text-anchor="middle">Receiving Frame</text>
    </g>
  </g>
</svg>
`);

// 3. FDMA Spectral Allocation
writeSvg('fdma-spectral-allocation.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 480" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <rect x="30" y="20" width="840" height="54" rx="10" fill="#0F172A" />
  <text x="50" y="53" fill="#F8FAFC" font-size="18" font-weight="700">Frequency Division Multiple Access (FDMA): Dedicated Frequency Bands</text>

  <g transform="translate(80, 95)">
    <!-- Axes -->
    <line x1="60" y1="20" x2="60" y2="300" stroke="#0F172A" stroke-width="2" />
    <line x1="60" y1="300" x2="720" y2="300" stroke="#0F172A" stroke-width="2" />
    <!-- Arrowheads -->
    <polygon points="60,15 55,25 65,25" fill="#0F172A" />
    <polygon points="725,300 715,295 715,305" fill="#0F172A" />

    <text x="30" y="160" fill="#0F172A" font-size="13" font-weight="bold" transform="rotate(-90 30 160)" text-anchor="middle">Frequency (Hz)</text>
    <text x="400" y="335" fill="#0F172A" font-size="13" font-weight="bold" text-anchor="middle">Time (t) &rarr; Continuous Shared Timeline</text>

    <!-- Band 1: Station 1 -->
    <rect x="70" y="40" width="620" height="45" rx="4" fill="#DBEAFE" stroke="#3B82F6" stroke-width="1.5" />
    <text x="380" y="67" fill="#1E40AF" font-size="12" font-weight="bold" text-anchor="middle">Channel 1 &bull; Station 1 Dedicated Band (All Time)</text>

    <!-- Guard Band 1 -->
    <rect x="70" y="87" width="620" height="14" fill="#F1F5F9" stroke="#CBD5E1" stroke-dasharray="4 2" />
    <text x="695" y="98" fill="#64748B" font-size="8.5">Guard Band</text>

    <!-- Band 2: Station 2 -->
    <rect x="70" y="103" width="620" height="45" rx="4" fill="#D1FAE5" stroke="#10B981" stroke-width="1.5" />
    <text x="380" y="130" fill="#065F46" font-size="12" font-weight="bold" text-anchor="middle">Channel 2 &bull; Station 2 Dedicated Band (All Time)</text>

    <!-- Guard Band 2 -->
    <rect x="70" y="150" width="620" height="14" fill="#F1F5F9" stroke="#CBD5E1" stroke-dasharray="4 2" />
    <text x="695" y="161" fill="#64748B" font-size="8.5">Guard Band</text>

    <!-- Band 3: Station 3 -->
    <rect x="70" y="166" width="620" height="45" rx="4" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1.5" />
    <text x="380" y="193" fill="#92400E" font-size="12" font-weight="bold" text-anchor="middle">Channel 3 &bull; Station 3 Dedicated Band (All Time)</text>

    <!-- Guard Band 3 -->
    <rect x="70" y="213" width="620" height="14" fill="#F1F5F9" stroke="#CBD5E1" stroke-dasharray="4 2" />
    <text x="695" y="224" fill="#64748B" font-size="8.5">Guard Band</text>

    <!-- Band 4: Station 4 -->
    <rect x="70" y="229" width="620" height="45" rx="4" fill="#EDE9FE" stroke="#8B5CF6" stroke-width="1.5" />
    <text x="380" y="256" fill="#6D28D9" font-size="12" font-weight="bold" text-anchor="middle">Channel 4 &bull; Station 4 Dedicated Band (All Time)</text>
  </g>
</svg>
`);

// 4. TDMA Time Slot Allocation
writeSvg('tdma-time-slot-allocation.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 480" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <rect x="30" y="20" width="840" height="54" rx="10" fill="#0F172A" />
  <text x="50" y="53" fill="#F8FAFC" font-size="18" font-weight="700">Time Division Multiple Access (TDMA): Synchronized Time Slot Sharing</text>

  <g transform="translate(80, 95)">
    <!-- Axes -->
    <line x1="60" y1="20" x2="60" y2="300" stroke="#0F172A" stroke-width="2" />
    <line x1="60" y1="300" x2="720" y2="300" stroke="#0F172A" stroke-width="2" />
    <polygon points="60,15 55,25 65,25" fill="#0F172A" />
    <polygon points="725,300 715,295 715,305" fill="#0F172A" />

    <text x="30" y="160" fill="#0F172A" font-size="13" font-weight="bold" transform="rotate(-90 30 160)" text-anchor="middle">Full Channel Bandwidth (Single Frequency)</text>
    <text x="400" y="335" fill="#0F172A" font-size="13" font-weight="bold" text-anchor="middle">Time (Synchronized Frame Structure) &rarr;</text>

    <!-- Repeating Frame 1 -->
    <g transform="translate(70, 50)">
      <rect x="0" y="0" width="280" height="230" rx="8" fill="#F8FAFC" stroke="#64748B" stroke-width="1.5" />
      <text x="140" y="-10" fill="#0F172A" font-size="12" font-weight="bold" text-anchor="middle">TDMA Frame 1</text>

      <rect x="10" y="15" width="55" height="200" rx="4" fill="#DBEAFE" stroke="#3B82F6" stroke-width="1.5" />
      <text x="37" y="120" fill="#1E40AF" font-size="11" font-weight="bold" transform="rotate(-90 37 120)" text-anchor="middle">User 1 Slot</text>

      <rect x="75" y="15" width="55" height="200" rx="4" fill="#D1FAE5" stroke="#10B981" stroke-width="1.5" />
      <text x="102" y="120" fill="#065F46" font-size="11" font-weight="bold" transform="rotate(-90 102 120)" text-anchor="middle">User 2 Slot</text>

      <rect x="140" y="15" width="55" height="200" rx="4" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1.5" />
      <text x="167" y="120" fill="#92400E" font-size="11" font-weight="bold" transform="rotate(-90 167 120)" text-anchor="middle">User 3 Slot</text>

      <rect x="205" y="15" width="55" height="200" rx="4" fill="#EDE9FE" stroke="#8B5CF6" stroke-width="1.5" />
      <text x="232" y="120" fill="#6D28D9" font-size="11" font-weight="bold" transform="rotate(-90 232 120)" text-anchor="middle">User 4 Slot</text>
    </g>

    <!-- Repeating Frame 2 -->
    <g transform="translate(370, 50)">
      <rect x="0" y="0" width="280" height="230" rx="8" fill="#F8FAFC" stroke="#64748B" stroke-width="1.5" />
      <text x="140" y="-10" fill="#0F172A" font-size="12" font-weight="bold" text-anchor="middle">TDMA Frame 2 (Repeating Cycle)</text>

      <rect x="10" y="15" width="55" height="200" rx="4" fill="#DBEAFE" stroke="#3B82F6" stroke-width="1.5" />
      <text x="37" y="120" fill="#1E40AF" font-size="11" font-weight="bold" transform="rotate(-90 37 120)" text-anchor="middle">User 1 Slot</text>

      <rect x="75" y="15" width="55" height="200" rx="4" fill="#D1FAE5" stroke="#10B981" stroke-width="1.5" />
      <text x="102" y="120" fill="#065F46" font-size="11" font-weight="bold" transform="rotate(-90 102 120)" text-anchor="middle">User 2 Slot</text>

      <rect x="140" y="15" width="55" height="200" rx="4" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1.5" />
      <text x="167" y="120" fill="#92400E" font-size="11" font-weight="bold" transform="rotate(-90 167 120)" text-anchor="middle">User 3 Slot</text>

      <rect x="205" y="15" width="55" height="200" rx="4" fill="#EDE9FE" stroke="#8B5CF6" stroke-width="1.5" />
      <text x="232" y="120" fill="#6D28D9" font-size="11" font-weight="bold" transform="rotate(-90 232 120)" text-anchor="middle">User 4 Slot</text>
    </g>
  </g>
</svg>
`);

// 5. Static vs Dynamic Channel Allocation Performance
writeSvg('static-vs-dynamic-performance.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 500" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <rect x="30" y="20" width="840" height="54" rx="10" fill="#0F172A" />
  <text x="50" y="53" fill="#F8FAFC" font-size="18" font-weight="700">Static vs Dynamic Channel Allocation: Queueing Delay Analysis (Tanenbaum Ch. 4)</text>

  <g transform="translate(60, 95)">
    <!-- Mathematical Proof Card -->
    <rect x="0" y="0" width="360" height="370" rx="10" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5" />
    <rect x="0" y="0" width="360" height="36" rx="10" fill="#EFF6FF" />
    <text x="180" y="24" fill="#1E40AF" font-size="13" font-weight="bold" text-anchor="middle">Queueing Theory (M/M/1 Model)</text>

    <g transform="translate(20, 50)">
      <text x="0" y="15" fill="#0F172A" font-size="11" font-weight="bold">Single Shared Channel (Capacity C, Load &lambda;):</text>
      <rect x="0" y="25" width="320" height="40" rx="6" fill="#ECFDF5" stroke="#10B981" />
      <text x="160" y="50" fill="#065F46" font-size="14" font-family="monospace" font-weight="bold" text-anchor="middle">T_dynamic = 1 / (&mu;C - &lambda;)</text>

      <text x="0" y="90" fill="#0F172A" font-size="11" font-weight="bold">Statically Divided into N Sub-channels (C/N, &lambda;/N):</text>
      <rect x="0" y="100" width="320" height="40" rx="6" fill="#FEF2F2" stroke="#EF4444" />
      <text x="160" y="125" fill="#991B1B" font-size="14" font-family="monospace" font-weight="bold" text-anchor="middle">T_static = N / (&mu;C - &lambda;) = N &bull; T_dynamic</text>

      <rect x="0" y="160" width="320" height="145" rx="6" fill="#FFFFFF" stroke="#CBD5E1" />
      <text x="15" y="185" fill="#DC2626" font-size="11" font-weight="bold">Catastrophic Delay Under Bursty Traffic:</text>
      <text x="15" y="205" fill="#475569" font-size="10.5">&bull; With N = 10 users, static FDM delay is exactly 10 TIMES WORSE than dynamic allocation.</text>
      <text x="15" y="240" fill="#475569" font-size="10.5">&bull; If 9 stations are idle and 1 station has a huge file, 90% of spectrum is completely wasted!</text>
      <text x="15" y="275" fill="#059669" font-size="10.5" font-weight="bold">&bull; Conclusion: Dynamic allocation is essential for bursty computer data.</text>
    </g>

    <!-- Graphic Chart on Right -->
    <rect x="390" y="0" width="410" height="370" rx="10" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5" />
    <text x="410" y="30" fill="#0F172A" font-size="13" font-weight="bold">Average Frame Delay (T) vs Traffic Load (&lambda;)</text>

    <g transform="translate(420, 60)">
      <!-- Axes -->
      <line x1="40" y1="20" x2="40" y2="240" stroke="#0F172A" stroke-width="2" />
      <line x1="40" y1="240" x2="330" y2="240" stroke="#0F172A" stroke-width="2" />
      <text x="25" y="130" fill="#0F172A" font-size="11" font-weight="bold" transform="rotate(-90 25 130)" text-anchor="middle">Delay T</text>
      <text x="180" y="265" fill="#0F172A" font-size="11" font-weight="bold" text-anchor="middle">Traffic Arrival Rate &lambda;</text>

      <!-- Curve 1: Dynamic Allocation (Low Delay) -->
      <path d="M 40 220 Q 150 215, 230 180 Q 280 140, 300 20" fill="none" stroke="#10B981" stroke-width="3" />
      <text x="240" y="195" fill="#059669" font-size="10" font-weight="bold">Dynamic Allocation</text>

      <!-- Curve 2: Static Allocation (N-times higher Delay) -->
      <path d="M 40 160 Q 120 150, 180 100 Q 210 50, 225 20" fill="none" stroke="#EF4444" stroke-width="3" />
      <text x="140" y="90" fill="#DC2626" font-size="10" font-weight="bold">Static (FDM / TDM)</text>

      <!-- Delta annotation -->
      <line x1="100" y1="160" x2="100" y2="218" stroke="#3B82F6" stroke-width="2" stroke-dasharray="3 2" />
      <text x="110" y="195" fill="#2563EB" font-size="10" font-weight="bold">N &times; Delay</text>
    </g>
  </g>
</svg>
`);

console.log('Topic 3 SVGs generated successfully.');
