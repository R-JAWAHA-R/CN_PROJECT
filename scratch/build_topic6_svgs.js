const fs = require('fs');
const path = require('path');

const outDir = 'assets/images/topic6';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function writeSvg(filename, content) {
  fs.writeFileSync(path.join(outDir, filename), content.trim(), 'utf8');
  console.log('Created: ' + filename);
}

// 1. Ethernet Architecture Overview
writeSvg('ethernet-architecture-overview.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 420" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
    <linearGradient id="busGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="50%" stop-color="#818cf8"/>
      <stop offset="100%" stop-color="#38bdf8"/>
    </linearGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.4"/>
    </filter>
  </defs>

  <rect width="850" height="420" rx="16" fill="url(#bg)"/>

  <!-- Title & Subtitle -->
  <text x="425" y="45" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Classic &amp; Switched Ethernet Architecture (IEEE 802.3)</text>
  <text x="425" y="70" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Bus Topology (Shared Coaxial Medium) vs. Modern Switched Star Topology</text>

  <!-- Left: Bus Architecture (10BASE5 / 10BASE2) -->
  <g transform="translate(40, 100)">
    <rect width="360" height="280" rx="12" fill="url(#cardGrad)" stroke="#334155" stroke-width="1.5" filter="url(#shadow)"/>
    <text x="180" y="32" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#38bdf8" text-anchor="middle">Classic Ethernet: Shared Bus (10BASE5)</text>

    <!-- Coax Cable Bus -->
    <rect x="40" y="110" width="280" height="12" rx="6" fill="url(#busGrad)"/>
    <circle cx="40" cy="116" r="8" fill="#ef4444"/>
    <text x="40" y="98" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#ef4444" text-anchor="middle">50Ω Term</text>
    <circle cx="320" cy="116" r="8" fill="#ef4444"/>
    <text x="320" y="98" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#ef4444" text-anchor="middle">50Ω Term</text>

    <!-- Tap Transceivers & Drop Cables -->
    <!-- Station A -->
    <line x1="80" y1="116" x2="80" y2="170" stroke="#94a3b8" stroke-width="3" stroke-dasharray="3 3"/>
    <rect x="55" y="170" width="50" height="45" rx="6" fill="#334155" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="80" y="196" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#f8fafc" text-anchor="middle">Host A</text>

    <!-- Station B -->
    <line x1="150" y1="116" x2="150" y2="170" stroke="#94a3b8" stroke-width="3" stroke-dasharray="3 3"/>
    <rect x="125" y="170" width="50" height="45" rx="6" fill="#334155" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="150" y="196" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#f8fafc" text-anchor="middle">Host B</text>

    <!-- Station C -->
    <line x1="220" y1="116" x2="220" y2="170" stroke="#94a3b8" stroke-width="3" stroke-dasharray="3 3"/>
    <rect x="195" y="170" width="50" height="45" rx="6" fill="#334155" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="220" y="196" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#f8fafc" text-anchor="middle">Host C</text>

    <!-- Station D -->
    <line x1="290" y1="116" x2="290" y2="170" stroke="#94a3b8" stroke-width="3" stroke-dasharray="3 3"/>
    <rect x="265" y="170" width="50" height="45" rx="6" fill="#334155" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="290" y="196" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#f8fafc" text-anchor="middle">Host D</text>

    <!-- Collision Domain Badge -->
    <rect x="50" y="235" width="260" height="28" rx="6" fill="#450a0a" stroke="#ef4444" stroke-width="1"/>
    <text x="180" y="253" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fca5a5" text-anchor="middle">⚠️ Single Shared Collision &amp; Broadcast Domain</text>
  </g>

  <!-- Right: Modern Switched Star Topology -->
  <g transform="translate(450, 100)">
    <rect width="360" height="280" rx="12" fill="url(#cardGrad)" stroke="#334155" stroke-width="1.5" filter="url(#shadow)"/>
    <text x="180" y="32" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#10b981" text-anchor="middle">Modern Ethernet: Switched Star (1000BASE-T)</text>

    <!-- Central Switch -->
    <rect x="130" y="70" width="100" height="50" rx="8" fill="#047857" stroke="#34d399" stroke-width="2"/>
    <text x="180" y="95" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#fff" text-anchor="middle">L2 SWITCH</text>
    <text x="180" y="110" font-family="system-ui, sans-serif" font-size="9" fill="#a7f3d0" text-anchor="middle">Full-Duplex ASIC</text>

    <!-- Dedicated Links -->
    <line x1="140" y1="120" x2="70" y2="180" stroke="#34d399" stroke-width="2.5"/>
    <line x1="165" y1="120" x2="140" y2="180" stroke="#34d399" stroke-width="2.5"/>
    <line x1="195" y1="120" x2="220" y2="180" stroke="#34d399" stroke-width="2.5"/>
    <line x1="220" y1="120" x2="290" y2="180" stroke="#34d399" stroke-width="2.5"/>

    <!-- Nodes -->
    <rect x="45" y="180" width="50" height="40" rx="6" fill="#1e293b" stroke="#34d399" stroke-width="1.5"/>
    <text x="70" y="204" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#f8fafc" text-anchor="middle">PC 1</text>

    <rect x="115" y="180" width="50" height="40" rx="6" fill="#1e293b" stroke="#34d399" stroke-width="1.5"/>
    <text x="140" y="204" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#f8fafc" text-anchor="middle">PC 2</text>

    <rect x="195" y="180" width="50" height="40" rx="6" fill="#1e293b" stroke="#34d399" stroke-width="1.5"/>
    <text x="220" y="204" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#f8fafc" text-anchor="middle">Server</text>

    <rect x="265" y="180" width="50" height="40" rx="6" fill="#1e293b" stroke="#34d399" stroke-width="1.5"/>
    <text x="290" y="204" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#f8fafc" text-anchor="middle">Router</text>

    <!-- Isolation Badge -->
    <rect x="40" y="235" width="280" height="28" rx="6" fill="#064e3b" stroke="#10b981" stroke-width="1"/>
    <text x="180" y="253" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#6ee7b7" text-anchor="middle">✅ Zero Collisions (Isolated Domains per Port)</text>
  </g>
</svg>`);

// 2. Ethernet Layers Architecture
writeSvg('ethernet-layers-architecture.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 420" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.3"/></filter>
  </defs>
  <rect width="850" height="420" rx="16" fill="url(#bg)"/>
  <text x="425" y="42" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Ethernet in the OSI Protocol Stack (IEEE 802 Architecture)</text>
  <text x="425" y="66" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Separation of Logical Link Control (LLC 802.2) and Media Access Control (MAC 802.3)</text>

  <!-- Left: OSI Reference Layers -->
  <g transform="translate(60, 95)">
    <rect x="0" y="0" width="180" height="55" rx="8" fill="#3b82f6" filter="url(#shadow)"/>
    <text x="90" y="32" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="#fff" text-anchor="middle">Layer 3: Network</text>
    <text x="90" y="48" font-family="system-ui, sans-serif" font-size="10" fill="#bfdbfe" text-anchor="middle">IP, ICMP, ARP</text>

    <rect x="0" y="70" width="180" height="125" rx="8" fill="#0284c7" stroke="#38bdf8" stroke-width="2" filter="url(#shadow)"/>
    <text x="90" y="105" font-family="system-ui, sans-serif" font-size="15" font-weight="800" fill="#fff" text-anchor="middle">Layer 2: Data Link</text>
    <text x="90" y="125" font-family="system-ui, sans-serif" font-size="11" fill="#bae6fd" text-anchor="middle">Subdivided by IEEE 802</text>
    <text x="90" y="150" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#fff" text-anchor="middle">• LLC (IEEE 802.2)</text>
    <text x="90" y="170" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#fff" text-anchor="middle">• MAC (IEEE 802.3)</text>

    <rect x="0" y="210" width="180" height="65" rx="8" fill="#6366f1" filter="url(#shadow)"/>
    <text x="90" y="240" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="#fff" text-anchor="middle">Layer 1: Physical</text>
    <text x="90" y="258" font-family="system-ui, sans-serif" font-size="10" fill="#c7d2fe" text-anchor="middle">Transceiver, Cable, Signals</text>
  </g>

  <!-- Connective Arrows -->
  <path d="M 255 160 L 310 160" stroke="#38bdf8" stroke-width="3" stroke-dasharray="4 4" marker-end="url(#arrow)"/>

  <!-- Right: IEEE 802 Sublayer Breakdown -->
  <g transform="translate(320, 95)">
    <!-- LLC Sublayer Card -->
    <rect x="0" y="0" width="460" height="75" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5" filter="url(#shadow)"/>
    <rect x="15" y="12" width="110" height="24" rx="4" fill="#0369a1"/>
    <text x="70" y="28" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">IEEE 802.2 LLC</text>
    <text x="140" y="30" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#f8fafc">Logical Link Control (Media Independent)</text>
    <text x="140" y="52" font-family="system-ui, sans-serif" font-size="11" fill="#94a3b8">Multiplexing protocols (SAP/SNAP), Flow &amp; Error control, interface to Network Layer</text>

    <!-- MAC Sublayer Card -->
    <rect x="0" y="90" width="460" height="95" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="2" filter="url(#shadow)"/>
    <rect x="15" y="105" width="110" height="24" rx="4" fill="#047857"/>
    <text x="70" y="121" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">IEEE 802.3 MAC</text>
    <text x="140" y="123" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#34d399">Media Access Control (Medium Specific)</text>
    <text x="140" y="145" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• CSMA/CD Protocol &amp; Contention Resolution (BEB algorithm)</text>
    <text x="140" y="165" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• 48-bit MAC Addressing &amp; Frame Assembly / Disassembly with CRC-32</text>

    <!-- Physical Layer (PHY) Card -->
    <rect x="0" y="200" width="460" height="75" rx="10" fill="#1e293b" stroke="#818cf8" stroke-width="1.5" filter="url(#shadow)"/>
    <rect x="15" y="215" width="110" height="24" rx="4" fill="#4338ca"/>
    <text x="70" y="231" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">IEEE 802.3 PHY</text>
    <text x="140" y="233" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#c7d2fe">Physical Layer Specifications</text>
    <text x="140" y="255" font-family="system-ui, sans-serif" font-size="11" fill="#94a3b8">Manchester / 4B/5B / 8B/10B Encoding, Cat5e/Cat6/Fiber, 10M/100M/1G/10G PMD</text>
  </g>
</svg>`);

// 3. MAC Address Format Structure
writeSvg('mac-address-format-structure.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
    <linearGradient id="oui" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#2563eb"/><stop offset="100%" stop-color="#3b82f6"/></linearGradient>
    <linearGradient id="nic" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#059669"/><stop offset="100%" stop-color="#10b981"/></linearGradient>
  </defs>
  <rect width="850" height="400" rx="16" fill="url(#bg)"/>
  <text x="425" y="42" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">48-Bit MAC (Ethernet Physical) Address Structure</text>
  <text x="425" y="66" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">IEEE EUI-48 Format: Organizationally Unique Identifier (OUI) &amp; Network Interface Controller (NIC)</text>

  <!-- Hex Display -->
  <g transform="translate(125, 95)">
    <rect width="600" height="50" rx="8" fill="#1e293b" stroke="#334155" stroke-width="2"/>
    <text x="300" y="32" font-family="monospace" font-size="20" font-weight="700" fill="#38bdf8" text-anchor="middle">
      <tspan fill="#60a5fa">00 : 1A : 2B</tspan> : <tspan fill="#34d399">3C : 4D : 5E</tspan>
    </text>
  </g>

  <!-- Split Diagram -->
  <g transform="translate(125, 160)">
    <!-- OUI Part -->
    <rect x="0" y="0" width="300" height="60" rx="8" fill="url(#oui)"/>
    <text x="150" y="28" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#fff" text-anchor="middle">24 Bits (3 Bytes) — OUI</text>
    <text x="150" y="48" font-family="system-ui, sans-serif" font-size="11" fill="#dbeafe" text-anchor="middle">Assigned by IEEE Registration Authority to Vendor</text>

    <!-- NIC Part -->
    <rect x="300" y="0" width="300" height="60" rx="8" fill="url(#nic)"/>
    <text x="450" y="28" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#fff" text-anchor="middle">24 Bits (3 Bytes) — NIC Specific</text>
    <text x="450" y="48" font-family="system-ui, sans-serif" font-size="11" fill="#d1fae5" text-anchor="middle">Assigned uniquely by manufacturer to adapter</text>
  </g>

  <!-- Bit-Level Inspection (First Byte Zoom) -->
  <g transform="translate(80, 245)">
    <rect width="690" height="120" rx="10" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
    <text x="345" y="26" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#f8fafc" text-anchor="middle">Special Meaning of the Least Significant Bits of the 1st Byte (Byte 0)</text>

    <!-- Bit 0: I/G -->
    <g transform="translate(40, 42)">
      <rect width="280" height="60" rx="6" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5"/>
      <text x="140" y="24" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fbbf24" text-anchor="middle">Bit 0: Individual / Group (I/G)</text>
      <text x="140" y="44" font-family="system-ui, sans-serif" font-size="11" fill="#94a3b8" text-anchor="middle">0 = Unicast Address | 1 = Multicast / Broadcast</text>
    </g>

    <!-- Bit 1: U/L -->
    <g transform="translate(370, 42)">
      <rect width="280" height="60" rx="6" fill="#0f172a" stroke="#a855f7" stroke-width="1.5"/>
      <text x="140" y="24" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#c084fc" text-anchor="middle">Bit 1: Universal / Local (U/L)</text>
      <text x="140" y="44" font-family="system-ui, sans-serif" font-size="11" fill="#94a3b8" text-anchor="middle">0 = Globally Administered (IEEE) | 1 = Locally Administered</text>
    </g>
  </g>
</svg>`);

// 4. IEEE 802.3 Frame Format
writeSvg('ieee-802-3-frame-format.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 420" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.3"/></filter>
  </defs>
  <rect width="900" height="420" rx="16" fill="url(#bg)"/>
  <text x="450" y="40" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Standard IEEE 802.3 &amp; Ethernet II Frame Format</text>
  <text x="450" y="64" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Frame bounds: Min frame length = 64 Bytes (512 bit times) | Max frame length = 1518 Bytes</text>

  <!-- Frame Fields Bar -->
  <g transform="translate(40, 100)">
    <!-- Preamble -->
    <rect x="0" y="0" width="85" height="70" rx="6" fill="#334155" stroke="#475569" stroke-width="1.5"/>
    <text x="42" y="32" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#cbd5e1" text-anchor="middle">Preamble</text>
    <text x="42" y="52" font-family="monospace" font-size="11" fill="#38bdf8" text-anchor="middle">7 Bytes</text>

    <!-- SFD -->
    <rect x="88" y="0" width="55" height="70" rx="6" fill="#475569" stroke="#64748b" stroke-width="1.5"/>
    <text x="115" y="32" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#f8fafc" text-anchor="middle">SFD</text>
    <text x="115" y="52" font-family="monospace" font-size="11" fill="#38bdf8" text-anchor="middle">1 Byte</text>

    <!-- Dest MAC -->
    <rect x="146" y="0" width="95" height="70" rx="6" fill="#1e3a8a" stroke="#3b82f6" stroke-width="2"/>
    <text x="193" y="30" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fff" text-anchor="middle">Dest MAC</text>
    <text x="193" y="52" font-family="monospace" font-size="11" fill="#93c5fd" text-anchor="middle">6 Bytes</text>

    <!-- Source MAC -->
    <rect x="244" y="0" width="95" height="70" rx="6" fill="#1e3a8a" stroke="#3b82f6" stroke-width="2"/>
    <text x="291" y="30" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fff" text-anchor="middle">Source MAC</text>
    <text x="291" y="52" font-family="monospace" font-size="11" fill="#93c5fd" text-anchor="middle">6 Bytes</text>

    <!-- Length / Type -->
    <rect x="342" y="0" width="85" height="70" rx="6" fill="#065f46" stroke="#10b981" stroke-width="2"/>
    <text x="384" y="30" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fff" text-anchor="middle">Type / Len</text>
    <text x="384" y="52" font-family="monospace" font-size="11" fill="#6ee7b7" text-anchor="middle">2 Bytes</text>

    <!-- Payload / Data -->
    <rect x="430" y="0" width="295" height="70" rx="6" fill="#047857" stroke="#34d399" stroke-width="2.5"/>
    <text x="577" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="900" fill="#fff" text-anchor="middle">Data Payload (IPv4 / IPv6 Packet)</text>
    <text x="577" y="52" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#a7f3d0" text-anchor="middle">46 to 1500 Bytes (MTU = 1500 B)</text>

    <!-- FCS (CRC) -->
    <rect x="728" y="0" width="92" height="70" rx="6" fill="#991b1b" stroke="#ef4444" stroke-width="2"/>
    <text x="774" y="30" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fff" text-anchor="middle">FCS (CRC)</text>
    <text x="774" y="52" font-family="monospace" font-size="11" fill="#fca5a5" text-anchor="middle">4 Bytes</text>
  </g>

  <!-- Detailed Annotation Grid -->
  <g transform="translate(40, 195)">
    <!-- 64-Byte Minimum Enforcement Bracket -->
    <path d="M 146 0 L 146 20 L 820 20 L 820 0" stroke="#f59e0b" stroke-width="2" fill="none"/>
    <text x="483" y="38" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fbbf24" text-anchor="middle">
      ← Minimum Ethernet Frame Length = 64 Bytes (Excludes Preamble &amp; SFD) →
    </text>

    <!-- Field Descriptions -->
    <rect x="0" y="55" width="820" height="145" rx="10" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
    
    <text x="20" y="80" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#38bdf8">• Preamble (7 Bytes):</text>
    <text x="180" y="80" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">Alternating 10101010 pattern to synchronize receiver clock &amp; PLL circuit.</text>

    <text x="20" y="105" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#38bdf8">• SFD (1 Byte):</text>
    <text x="180" y="105" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">Start-of-Frame Delimiter with 10101011 pattern (ending in two consecutive 1s).</text>

    <text x="20" y="130" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#34d399">• Length vs. Type:</text>
    <text x="180" y="130" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">≤ 1500 (0x05DC) indicates IEEE 802.3 Length | ≥ 1536 (0x0600) indicates EtherType (e.g. 0x0800 IPv4).</text>

    <text x="20" y="155" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#f87171">• Padding Requirement:</text>
    <text x="180" y="155" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">If payload is &lt; 46 Bytes, padding bytes (0x00) are appended to reach the mandatory 64-byte frame floor.</text>

    <text x="20" y="180" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#f87171">• FCS / CRC-32:</text>
    <text x="180" y="180" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">Cyclic Redundancy Check polynomial detects transmission errors. Corrupted frames are silently dropped.</text>
  </g>
</svg>`);

// 5. Ethernet MAC Protocol Flowchart (CSMA/CD)
writeSvg('ethernet-mac-protocol-flowchart.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 480" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8"/>
    </marker>
  </defs>
  <rect width="850" height="480" rx="16" fill="url(#bg)"/>
  <text x="425" y="38" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Ethernet CSMA/CD Operation Flowchart</text>
  <text x="425" y="60" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">1-Persistent Carrier Sensing with Collision Detection &amp; Binary Exponential Backoff</text>

  <!-- Flowchart Nodes -->
  <!-- Start -->
  <rect x="80" y="90" width="160" height="40" rx="20" fill="#0284c7" stroke="#38bdf8" stroke-width="2"/>
  <text x="160" y="115" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#fff" text-anchor="middle">Start: Ready to Send</text>

  <!-- Initialize attempts -->
  <rect x="80" y="160" width="160" height="40" rx="6" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
  <text x="160" y="185" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#f8fafc" text-anchor="middle">Set Attempts k = 0</text>

  <!-- Sense Channel -->
  <polygon points="160,230 240,265 160,300 80,265" fill="#334155" stroke="#38bdf8" stroke-width="2"/>
  <text x="160" y="260" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">Is Channel</text>
  <text x="160" y="275" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">Idle?</text>

  <!-- Wait IFG & Transmit -->
  <rect x="80" y="340" width="160" height="45" rx="6" fill="#047857" stroke="#10b981" stroke-width="2"/>
  <text x="160" y="360" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">Wait IFG (96 bit-times)</text>
  <text x="160" y="375" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#a7f3d0" text-anchor="middle">&amp; Start Transmitting</text>

  <!-- Collision Detection during TX -->
  <polygon points="420,335 500,370 420,405 340,370" fill="#854d0e" stroke="#eab308" stroke-width="2"/>
  <text x="420" y="365" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">Collision</text>
  <text x="420" y="380" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">Detected?</text>

  <!-- Success Path -->
  <rect x="640" y="350" width="160" height="40" rx="20" fill="#059669" stroke="#34d399" stroke-width="2"/>
  <text x="720" y="375" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fff" text-anchor="middle">✅ Success (TX Done)</text>

  <!-- Send Jam Signal -->
  <rect x="340" y="240" width="160" height="45" rx="6" fill="#991b1b" stroke="#ef4444" stroke-width="2"/>
  <text x="420" y="260" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fff" text-anchor="middle">Send Jamming Signal</text>
  <text x="420" y="275" font-family="system-ui, sans-serif" font-size="10" fill="#fca5a5" text-anchor="middle">(32–48 bit noise burst)</text>

  <!-- Increment k -->
  <rect x="340" y="150" width="160" height="45" rx="6" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
  <text x="420" y="170" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#f8fafc" text-anchor="middle">Increment k = k + 1</text>
  <text x="420" y="185" font-family="system-ui, sans-serif" font-size="10" fill="#94a3b8" text-anchor="middle">Is k &gt; 15?</text>

  <!-- Abort Node -->
  <rect x="640" y="152" width="160" height="40" rx="20" fill="#7f1d1d" stroke="#ef4444" stroke-width="2"/>
  <text x="720" y="177" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fff" text-anchor="middle">❌ Abort: Excessive Collisions</text>

  <!-- Backoff Wait -->
  <rect x="340" y="88" width="160" height="45" rx="6" fill="#1e293b" stroke="#a855f7" stroke-width="2"/>
  <text x="420" y="108" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#c084fc" text-anchor="middle">Wait Backoff Time:</text>
  <text x="420" y="124" font-family="system-ui, sans-serif" font-size="10" fill="#e9d5ff" text-anchor="middle">R × 512 bit-times</text>

  <!-- Connectors -->
  <line x1="160" y1="130" x2="160" y2="160" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrow)"/>
  <line x1="160" y1="200" x2="160" y2="230" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrow)"/>
  <line x1="160" y1="300" x2="160" y2="340" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="175" y="325" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#34d399">Yes</text>

  <line x1="240" y1="365" x2="340" y2="365" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrow)"/>
  <line x1="500" y1="370" x2="640" y2="370" stroke="#34d399" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="560" y="360" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#34d399">No</text>

  <line x1="420" y1="335" x2="420" y2="285" stroke="#ef4444" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="430" y="315" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#ef4444">Yes</text>

  <line x1="420" y1="240" x2="420" y2="195" stroke="#ef4444" stroke-width="2" marker-end="url(#arrow)"/>
  <line x1="500" y1="172" x2="640" y2="172" stroke="#ef4444" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="560" y="165" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#ef4444">Yes (k=16)</text>

  <line x1="420" y1="150" x2="420" y2="133" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="430" y="145" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#38bdf8">No</text>

  <line x1="340" y1="110" x2="240" y2="110" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrow)"/>
</svg>`);

// 6. Ethernet CSMA/CD Collision Window
writeSvg('ethernet-csma-cd-collision-window.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 420" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
  </defs>
  <rect width="850" height="420" rx="16" fill="url(#bg)"/>
  <text x="425" y="40" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Worst-Case Collision Window &amp; Minimum Frame Size</text>
  <text x="425" y="64" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Round-Trip Propagation Time (2τ): Why Transmission Time must satisfy T_fr ≥ 2 × τ</text>

  <!-- Stations A and B Timeline -->
  <g transform="translate(100, 100)">
    <!-- Station A vertical timeline -->
    <line x1="100" y1="0" x2="100" y2="240" stroke="#38bdf8" stroke-width="3"/>
    <rect x="50" y="-30" width="100" height="30" rx="6" fill="#0284c7"/>
    <text x="100" y="-10" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#fff" text-anchor="middle">Station A</text>

    <!-- Station B vertical timeline -->
    <line x1="550" y1="0" x2="550" y2="240" stroke="#38bdf8" stroke-width="3"/>
    <rect x="500" y="-30" width="100" height="30" rx="6" fill="#0284c7"/>
    <text x="550" y="-10" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#fff" text-anchor="middle">Station B</text>

    <!-- t = 0: A begins transmitting -->
    <circle cx="100" cy="20" r="6" fill="#10b981"/>
    <text x="30" y="25" font-family="monospace" font-size="12" font-weight="700" fill="#34d399">t = 0</text>
    <text x="115" y="25" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">A starts sending frame</text>

    <!-- Signal propagates from A to B -->
    <line x1="100" y1="20" x2="550" y2="120" stroke="#34d399" stroke-width="2.5" stroke-dasharray="4 4"/>

    <!-- t = τ - ε: B senses idle and transmits -->
    <circle cx="550" cy="115" r="6" fill="#f59e0b"/>
    <text x="565" y="118" font-family="monospace" font-size="12" font-weight="700" fill="#fbbf24">t = τ - ε</text>
    <text x="565" y="135" font-family="system-ui, sans-serif" font-size="10" fill="#fde68a">B senses idle &amp; transmits</text>

    <!-- Collision occurs near B -->
    <circle cx="530" cy="120" r="14" fill="#ef4444" opacity="0.6"/>
    <circle cx="530" cy="120" r="8" fill="#ef4444"/>
    <text x="500" y="105" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fca5a5" text-anchor="middle">💥 COLLISION</text>

    <!-- Jamming & back-propagation to A -->
    <line x1="530" y1="120" x2="100" y2="220" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="4 4"/>
    <circle cx="100" cy="220" r="6" fill="#ef4444"/>
    <text x="25" y="225" font-family="monospace" font-size="12" font-weight="700" fill="#f87171">t = 2τ</text>
    <text x="115" y="225" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fca5a5">A detects collision (2τ elapsed)</text>
  </g>

  <!-- Formula Callout Box -->
  <g transform="translate(80, 350)">
    <rect width="690" height="50" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="345" y="32" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#38bdf8" text-anchor="middle">
      Fundamental Law: Frame Size L ≥ 2 × τ × Bandwidth (B) → For 10 Mbps over 2500 m, Min Frame = 64 Bytes (512 bits)
    </text>
  </g>
</svg>`);

// 7. Binary Exponential Backoff Algorithm
writeSvg('binary-exponential-backoff-algorithm.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 420" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
  </defs>
  <rect width="850" height="420" rx="16" fill="url(#bg)"/>
  <text x="425" y="40" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Truncated Binary Exponential Backoff (BEB)</text>
  <text x="425" y="64" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Contention Window Expansion: Range R ∈ [0, 2^k - 1] where k = min(n, 10)</text>

  <!-- Table of Backoff Rounds -->
  <g transform="translate(60, 95)">
    <!-- Header -->
    <rect x="0" y="0" width="730" height="35" rx="6" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
    <text x="80" y="22" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#38bdf8" text-anchor="middle">Collision # (n)</text>
    <text x="230" y="22" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#38bdf8" text-anchor="middle">Exponent k = min(n,10)</text>
    <text x="420" y="22" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#38bdf8" text-anchor="middle">Slot Range [0, 2^k - 1]</text>
    <text x="610" y="22" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#38bdf8" text-anchor="middle">Max Delay (at 10 Mbps)</text>

    <!-- Row 1 -->
    <rect x="0" y="40" width="730" height="32" rx="4" fill="#0f172a"/>
    <text x="80" y="61" font-family="monospace" font-size="12" fill="#fff" text-anchor="middle">1st collision</text>
    <text x="230" y="61" font-family="monospace" font-size="12" fill="#fff" text-anchor="middle">k = 1</text>
    <text x="420" y="61" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#34d399" text-anchor="middle">{0, 1} (2 choices)</text>
    <text x="610" y="61" font-family="monospace" font-size="11" fill="#cbd5e1" text-anchor="middle">1 × 51.2 µs = 51.2 µs</text>

    <!-- Row 2 -->
    <rect x="0" y="75" width="730" height="32" rx="4" fill="#1e293b"/>
    <text x="80" y="96" font-family="monospace" font-size="12" fill="#fff" text-anchor="middle">2nd collision</text>
    <text x="230" y="96" font-family="monospace" font-size="12" fill="#fff" text-anchor="middle">k = 2</text>
    <text x="420" y="96" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#34d399" text-anchor="middle">{0, 1, 2, 3} (4 choices)</text>
    <text x="610" y="96" font-family="monospace" font-size="11" fill="#cbd5e1" text-anchor="middle">3 × 51.2 µs = 153.6 µs</text>

    <!-- Row 3 -->
    <rect x="0" y="110" width="730" height="32" rx="4" fill="#0f172a"/>
    <text x="80" y="131" font-family="monospace" font-size="12" fill="#fff" text-anchor="middle">3rd collision</text>
    <text x="230" y="131" font-family="monospace" font-size="12" fill="#fff" text-anchor="middle">k = 3</text>
    <text x="420" y="131" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#34d399" text-anchor="middle">{0, 1, ..., 7} (8 choices)</text>
    <text x="610" y="131" font-family="monospace" font-size="11" fill="#cbd5e1" text-anchor="middle">7 × 51.2 µs = 358.4 µs</text>

    <!-- Row 10 (Truncation Point) -->
    <rect x="0" y="145" width="730" height="32" rx="4" fill="#1e293b"/>
    <text x="80" y="166" font-family="monospace" font-size="12" fill="#fbbf24" text-anchor="middle">10th collision</text>
    <text x="230" y="166" font-family="monospace" font-size="12" fill="#fbbf24" text-anchor="middle">k = 10 (Cap)</text>
    <text x="420" y="166" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fbbf24" text-anchor="middle">{0, 1, ..., 1023} (1024 choices)</text>
    <text x="610" y="166" font-family="monospace" font-size="11" fill="#fde68a" text-anchor="middle">1023 × 51.2 µs ≈ 52.4 ms</text>

    <!-- Row 16 (Abort) -->
    <rect x="0" y="180" width="730" height="32" rx="4" fill="#450a0a"/>
    <text x="80" y="201" font-family="monospace" font-size="12" font-weight="800" fill="#f87171" text-anchor="middle">16th collision</text>
    <text x="230" y="201" font-family="monospace" font-size="12" font-weight="800" fill="#f87171" text-anchor="middle">Exceeded Max</text>
    <text x="420" y="201" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#f87171" text-anchor="middle">ABORT TRANSMISSION</text>
    <text x="610" y="201" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fca5a5" text-anchor="middle">Report Network Failure</text>
  </g>

  <!-- Algorithm Highlights -->
  <g transform="translate(60, 325)">
    <rect width="730" height="70" rx="8" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
    <text x="20" y="25" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• <strong fill="#38bdf8">Slot Time:</strong> 512 bit-times (51.2 µs for 10 Mbps, 5.12 µs for 100 Mbps, 4096 bit-times for 1000 Mbps with carrier extension).</text>
    <text x="20" y="48" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• <strong fill="#34d399">Self-Stabilization:</strong> Under heavy contention, backoff doubles exponentially, dispersing stations and preventing channel lockup.</text>
  </g>
</svg>`);

// 8. Ethernet Types Evolution Timeline
writeSvg('ethernet-types-evolution-timeline.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 420" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
  </defs>
  <rect width="850" height="420" rx="16" fill="url(#bg)"/>
  <text x="425" y="40" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Evolution of Ethernet Standards (10 Mbps to 100 Gbps+)</text>
  <text x="425" y="64" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Data Rate, Media Types, Collision Handling, and IEEE Standardization Milestones</text>

  <!-- 4 Evolution Columns -->
  <!-- 1. Standard Ethernet -->
  <g transform="translate(40, 95)">
    <rect width="180" height="290" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <rect width="180" height="38" rx="10" fill="#0284c7"/>
    <text x="90" y="25" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#fff" text-anchor="middle">Standard Ethernet</text>
    <text x="90" y="62" font-family="monospace" font-size="16" font-weight="800" fill="#38bdf8" text-anchor="middle">10 Mbps</text>
    <text x="90" y="80" font-family="system-ui, sans-serif" font-size="10" fill="#94a3b8" text-anchor="middle">IEEE 802.3 (1983)</text>
    <line x1="20" y1="95" x2="160" y2="95" stroke="#334155" stroke-width="1"/>
    <text x="20" y="120" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• 10BASE5 (Thicknet)</text>
    <text x="20" y="145" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• 10BASE2 (Thinnet)</text>
    <text x="20" y="170" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• 10BASE-T (Cat3 UTP)</text>
    <text x="20" y="200" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fbbf24">• Half-Duplex Bus</text>
    <text x="20" y="225" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• Manchester Coding</text>
    <text x="20" y="250" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• Slot: 512 bit-times</text>
  </g>

  <!-- 2. Fast Ethernet -->
  <g transform="translate(235, 95)">
    <rect width="180" height="290" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <rect width="180" height="38" rx="10" fill="#047857"/>
    <text x="90" y="25" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#fff" text-anchor="middle">Fast Ethernet</text>
    <text x="90" y="62" font-family="monospace" font-size="16" font-weight="800" fill="#34d399" text-anchor="middle">100 Mbps</text>
    <text x="90" y="80" font-family="system-ui, sans-serif" font-size="10" fill="#94a3b8" text-anchor="middle">IEEE 802.3u (1995)</text>
    <line x1="20" y1="95" x2="160" y2="95" stroke="#334155" stroke-width="1"/>
    <text x="20" y="120" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• 100BASE-TX (Cat5)</text>
    <text x="20" y="145" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• 100BASE-FX (Fiber)</text>
    <text x="20" y="170" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• 100BASE-T4 (Cat3)</text>
    <text x="20" y="200" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#34d399">• Auto-Negotiation</text>
    <text x="20" y="225" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• 4B/5B + MLT-3</text>
    <text x="20" y="250" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• Max collision dia: 200m</text>
  </g>

  <!-- 3. Gigabit Ethernet -->
  <g transform="translate(430, 95)">
    <rect width="180" height="290" rx="10" fill="#1e293b" stroke="#6366f1" stroke-width="1.5"/>
    <rect width="180" height="38" rx="10" fill="#4338ca"/>
    <text x="90" y="25" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#fff" text-anchor="middle">Gigabit Ethernet</text>
    <text x="90" y="62" font-family="monospace" font-size="16" font-weight="800" fill="#818cf8" text-anchor="middle">1000 Mbps (1G)</text>
    <text x="90" y="80" font-family="system-ui, sans-serif" font-size="10" fill="#94a3b8" text-anchor="middle">IEEE 802.3z / 802.3ab</text>
    <line x1="20" y1="95" x2="160" y2="95" stroke="#334155" stroke-width="1"/>
    <text x="20" y="120" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• 1000BASE-T (Cat5e)</text>
    <text x="20" y="145" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• 1000BASE-SX (MMF)</text>
    <text x="20" y="170" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• 1000BASE-LX (SMF)</text>
    <text x="20" y="200" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#818cf8">• Full-Duplex Standard</text>
    <text x="20" y="225" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• 8B/10B / PAM-5</text>
    <text x="20" y="250" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• Carrier Extension</text>
  </g>

  <!-- 4. 10G & Beyond -->
  <g transform="translate(625, 95)">
    <rect width="180" height="290" rx="10" fill="#1e293b" stroke="#ec4899" stroke-width="1.5"/>
    <rect width="180" height="38" rx="10" fill="#be185d"/>
    <text x="90" y="25" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#fff" text-anchor="middle">10G &amp; Terabit</text>
    <text x="90" y="62" font-family="monospace" font-size="16" font-weight="800" fill="#f472b6" text-anchor="middle">10G - 800 Gbps</text>
    <text x="90" y="80" font-family="system-ui, sans-serif" font-size="10" fill="#94a3b8" text-anchor="middle">IEEE 802.3ae / 802.3ck</text>
    <line x1="20" y1="95" x2="160" y2="95" stroke="#334155" stroke-width="1"/>
    <text x="20" y="120" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• 10GBASE-T (Cat6a)</text>
    <text x="20" y="145" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• 10GBASE-SR/LR</text>
    <text x="20" y="170" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• 40G / 100G / 400G</text>
    <text x="20" y="200" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#f472b6">• NO CSMA/CD</text>
    <text x="20" y="225" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• Pure Full-Duplex</text>
    <text x="20" y="250" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• Datacenter &amp; Core</text>
  </g>
</svg>`);

// 9. Ethernet Advantages & Limitations Matrix
writeSvg('ethernet-advantages-limitations-matrix.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
  </defs>
  <rect width="850" height="400" rx="16" fill="url(#bg)"/>
  <text x="425" y="42" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Ethernet: Strengths, Weaknesses &amp; Architectural Tradeoffs</text>
  <text x="425" y="66" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Analyzing Why Ethernet Became the Dominant LAN Standard Worldwide</text>

  <!-- Left: Advantages -->
  <g transform="translate(50, 95)">
    <rect width="360" height="270" rx="12" fill="#064e3b" stroke="#10b981" stroke-width="2"/>
    <text x="180" y="32" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#34d399" text-anchor="middle">✅ Key Advantages &amp; Strengths</text>
    
    <text x="25" y="65" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Cost-Effectiveness &amp; Ubiquity:</text>
    <text x="25" y="82" font-family="system-ui, sans-serif" font-size="11" fill="#a7f3d0">Mass production made NICs, switches, and cabling inexpensive.</text>

    <text x="25" y="115" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• High Scalability &amp; Speed Progression:</text>
    <text x="25" y="132" font-family="system-ui, sans-serif" font-size="11" fill="#a7f3d0">Seamless leap from 10 Mbps to 800 Gbps using identical frame format.</text>

    <text x="25" y="165" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Backward Compatibility:</text>
    <text x="25" y="182" font-family="system-ui, sans-serif" font-size="11" fill="#a7f3d0">Auto-negotiation allows devices of different generations to interoperate.</text>

    <text x="25" y="215" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Switched Zero-Collision Architecture:</text>
    <text x="25" y="232" font-family="system-ui, sans-serif" font-size="11" fill="#a7f3d0">Full-duplex switching eliminates distance limits imposed by CSMA/CD.</text>
  </g>

  <!-- Right: Limitations -->
  <g transform="translate(440, 95)">
    <rect width="360" height="270" rx="12" fill="#450a0a" stroke="#ef4444" stroke-width="2"/>
    <text x="180" y="32" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#fca5a5" text-anchor="middle">⚠️ Limitations &amp; Design Challenges</text>

    <text x="25" y="65" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Non-Deterministic (In Classic Mode):</text>
    <text x="25" y="82" font-family="system-ui, sans-serif" font-size="11" fill="#fecaca">Contention causes random backoff delays; unsuitable for hard real-time.</text>

    <text x="25" y="115" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Distance Limits for CSMA/CD:</text>
    <text x="25" y="132" font-family="system-ui, sans-serif" font-size="11" fill="#fecaca">As speed increases by 10x, collision diameter decreases proportionally.</text>

    <text x="25" y="165" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Broadcast Storm Vulnerability:</text>
    <text x="25" y="182" font-family="system-ui, sans-serif" font-size="11" fill="#fecaca">Switches flood broadcast frames to all ports without Layer 3 routers or VLANs.</text>

    <text x="25" y="215" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Inherent Lack of Native Security:</text>
    <text x="25" y="232" font-family="system-ui, sans-serif" font-size="11" fill="#fecaca">L2 lacks built-in authentication, leaving LANs prone to ARP spoofing.</text>
  </g>
</svg>`);

console.log('All 9 Topic 6 SVGs generated successfully!');

