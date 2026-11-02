const fs = require('fs');
const path = require('path');

const outDir = 'assets/images/topic7';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function writeSvg(filename, content) {
  fs.writeFileSync(path.join(outDir, filename), content.trim(), 'utf8');
  console.log('Created: ' + filename);
}

// 1. WLAN Infrastructure Architecture
writeSvg('wlan-infrastructure-architecture.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 420" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.3"/></filter>
  </defs>
  <rect width="850" height="420" rx="16" fill="url(#bg)"/>
  <text x="425" y="40" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Wireless LAN (WLAN) Architecture Components</text>
  <text x="425" y="64" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Basic Service Set (BSS), Extended Service Set (ESS), Access Points (AP) &amp; Distribution System (DS)</text>

  <!-- Distribution System (DS) Backbone -->
  <g transform="translate(100, 95)">
    <rect width="650" height="30" rx="6" fill="#3b82f6" filter="url(#shadow)"/>
    <text x="325" y="20" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fff" text-anchor="middle">DISTRIBUTION SYSTEM (DS) BACKBONE (Ethernet 802.3 / Fiber Switch)</text>
  </g>

  <!-- BSS 1 -->
  <g transform="translate(80, 145)">
    <!-- RF Coverage Circle -->
    <ellipse cx="170" cy="120" rx="150" ry="105" fill="#0284c7" fill-opacity="0.15" stroke="#38bdf8" stroke-width="2" stroke-dasharray="6 4"/>
    <text x="170" y="240" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#38bdf8" text-anchor="middle">Basic Service Set 1 (BSS 1)</text>

    <!-- AP 1 -->
    <line x1="170" y1="-20" x2="170" y2="40" stroke="#38bdf8" stroke-width="3"/>
    <rect x="120" y="40" width="100" height="45" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
    <text x="170" y="65" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fff" text-anchor="middle">📡 AP 1</text>
    <text x="170" y="78" font-family="system-ui, sans-serif" font-size="9" fill="#94a3b8" text-anchor="middle">Access Point</text>

    <!-- Wireless Links & Stations -->
    <circle cx="80" cy="140" r="18" fill="#334155" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="80" y="145" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#fff" text-anchor="middle">STA 1</text>
    <line x1="150" y1="85" x2="95" y2="130" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="3 3"/>

    <circle cx="260" cy="140" r="18" fill="#334155" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="260" y="145" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#fff" text-anchor="middle">STA 2</text>
    <line x1="190" y1="85" x2="245" y2="130" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="3 3"/>
  </g>

  <!-- BSS 2 -->
  <g transform="translate(450, 145)">
    <!-- RF Coverage Circle -->
    <ellipse cx="170" cy="120" rx="150" ry="105" fill="#059669" fill-opacity="0.15" stroke="#10b981" stroke-width="2" stroke-dasharray="6 4"/>
    <text x="170" y="240" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#34d399" text-anchor="middle">Basic Service Set 2 (BSS 2)</text>

    <!-- AP 2 -->
    <line x1="170" y1="-20" x2="170" y2="40" stroke="#10b981" stroke-width="3"/>
    <rect x="120" y="40" width="100" height="45" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="170" y="65" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fff" text-anchor="middle">📡 AP 2</text>
    <text x="170" y="78" font-family="system-ui, sans-serif" font-size="9" fill="#94a3b8" text-anchor="middle">Access Point</text>

    <!-- Wireless Links & Stations -->
    <circle cx="80" cy="140" r="18" fill="#334155" stroke="#10b981" stroke-width="1.5"/>
    <text x="80" y="145" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#fff" text-anchor="middle">STA 3</text>
    <line x1="150" y1="85" x2="95" y2="130" stroke="#10b981" stroke-width="1.5" stroke-dasharray="3 3"/>

    <circle cx="260" cy="140" r="18" fill="#334155" stroke="#10b981" stroke-width="1.5"/>
    <text x="260" y="145" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#fff" text-anchor="middle">STA 4</text>
    <line x1="190" y1="85" x2="245" y2="130" stroke="#10b981" stroke-width="1.5" stroke-dasharray="3 3"/>
  </g>

  <!-- Overarching ESS Bracket -->
  <g transform="translate(60, 395)">
    <text x="365" y="0" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fbbf24" text-anchor="middle">
      ← EXTENDED SERVICE SET (ESS): Seamless Layer-2 Roaming Across Interconnected BSS Cells →
    </text>
  </g>
</svg>`);

// 2. Wireless Channel Characteristics
writeSvg('wireless-channel-characteristics.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
  </defs>
  <rect width="850" height="400" rx="16" fill="url(#bg)"/>
  <text x="425" y="40" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Wireless Channel Characteristics &amp; Impairments</text>
  <text x="425" y="64" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Signal Attenuation, Multipath Propagation, Dynamic Interference &amp; High Bit-Error-Rate (BER)</text>

  <!-- 4 Cards -->
  <g transform="translate(40, 95)">
    <!-- Card 1: Attenuation -->
    <rect x="0" y="0" width="180" height="270" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="90" y="32" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#38bdf8" text-anchor="middle">Path Loss &amp; Fading</text>
    <text x="90" y="55" font-family="monospace" font-size="13" font-weight="700" fill="#fbbf24" text-anchor="middle">P_r ∝ 1 / d^2</text>
    <line x1="20" y1="70" x2="160" y2="70" stroke="#334155" stroke-width="1"/>
    <text x="15" y="95" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• Free-space decay</text>
    <text x="15" y="115" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• Inverse square law</text>
    <text x="15" y="140" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• Indoor exponent:</text>
    <text x="25" y="158" font-family="monospace" font-size="11" fill="#38bdf8">d^3 to d^4 (walls)</text>
    <text x="15" y="185" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• Dynamic rate fallback</text>
    <text x="15" y="205" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• SNR degrades with</text>
    <text x="25" y="223" font-family="system-ui, sans-serif" font-size="11" fill="#38bdf8">distance from AP</text>
  </g>

  <g transform="translate(235, 95)">
    <!-- Card 2: Multipath -->
    <rect x="0" y="0" width="180" height="270" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="90" y="32" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#34d399" text-anchor="middle">Multipath Fading</text>
    <text x="90" y="55" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#a7f3d0" text-anchor="middle">Reflect, Refract, Scatter</text>
    <line x1="20" y1="70" x2="160" y2="70" stroke="#334155" stroke-width="1"/>
    <text x="15" y="95" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• Multiple ray paths</text>
    <text x="15" y="115" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• Constructive &amp;</text>
    <text x="25" y="133" font-family="system-ui, sans-serif" font-size="11" fill="#ef4444">destructive interference</text>
    <text x="15" y="160" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• Rayleigh / Rician fading</text>
    <text x="15" y="185" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• Inter-Symbol Interf. (ISI)</text>
    <text x="15" y="210" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• Solved by OFDM &amp;</text>
    <text x="25" y="228" font-family="system-ui, sans-serif" font-size="11" fill="#34d399">cyclic prefixes</text>
  </g>

  <g transform="translate(430, 95)">
    <!-- Card 3: Interference -->
    <rect x="0" y="0" width="180" height="270" rx="10" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="90" y="32" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#fbbf24" text-anchor="middle">Shared Spectrum</text>
    <text x="90" y="55" font-family="monospace" font-size="12" font-weight="700" fill="#fde68a" text-anchor="middle">2.4 GHz &amp; 5 GHz ISM</text>
    <line x1="20" y1="70" x2="160" y2="70" stroke="#334155" stroke-width="1"/>
    <text x="15" y="95" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• Unlicensed spectrum</text>
    <text x="15" y="115" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• Competing Bluetooth,</text>
    <text x="25" y="133" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">Microwaves, cordless</text>
    <text x="15" y="160" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• Co-channel interference</text>
    <text x="15" y="185" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• Adjacent channel bleed</text>
    <text x="15" y="210" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• Only 3 non-overlap</text>
    <text x="25" y="228" font-family="system-ui, sans-serif" font-size="11" fill="#fbbf24">channels (1, 6, 11 in 2.4G)</text>
  </g>

  <g transform="translate(625, 95)">
    <!-- Card 4: Error Rate -->
    <rect x="0" y="0" width="180" height="270" rx="10" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
    <text x="90" y="32" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f87171" text-anchor="middle">High BER &amp; ACKs</text>
    <text x="90" y="55" font-family="monospace" font-size="12" font-weight="700" fill="#fca5a5" text-anchor="middle">BER ≈ 10^-5 vs 10^-12</text>
    <line x1="20" y1="70" x2="160" y2="70" stroke="#334155" stroke-width="1"/>
    <text x="15" y="95" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• 10,000x error rate</text>
    <text x="25" y="113" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">compared to fiber</text>
    <text x="15" y="140" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• Mandatory Layer-2</text>
    <text x="25" y="158" font-family="system-ui, sans-serif" font-size="11" fill="#f87171">stop-and-wait ACKs</text>
    <text x="15" y="185" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• Rapid retransmissions</text>
    <text x="15" y="210" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• Heavy protocol overhead</text>
    <text x="25" y="228" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">vs. wired Ethernet</text>
  </g>
</svg>`);

// 3. WLAN BSS & ESS Topology
writeSvg('wlan-bss-ess-topology.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
  </defs>
  <rect width="850" height="400" rx="16" fill="url(#bg)"/>
  <text x="425" y="40" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Independent BSS (Ad-Hoc) vs. Infrastructure BSS (ESS)</text>
  <text x="425" y="64" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Peer-to-Peer Ad-Hoc Connectivity vs. AP-Centric Enterprise Distribution</text>

  <!-- Left: Ad-Hoc IBSS -->
  <g transform="translate(50, 95)">
    <rect width="350" height="270" rx="12" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="175" y="32" font-family="system-ui, sans-serif" font-size="15" font-weight="800" fill="#38bdf8" text-anchor="middle">Independent BSS (IBSS / Ad-Hoc)</text>
    <text x="175" y="52" font-family="system-ui, sans-serif" font-size="11" fill="#94a3b8" text-anchor="middle">No Access Point, No Distribution System</text>

    <!-- Mesh Nodes -->
    <circle cx="100" cy="120" r="24" fill="#0369a1" stroke="#38bdf8" stroke-width="2"/>
    <text x="100" y="125" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">STA A</text>

    <circle cx="250" cy="120" r="24" fill="#0369a1" stroke="#38bdf8" stroke-width="2"/>
    <text x="250" y="125" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">STA B</text>

    <circle cx="175" cy="200" r="24" fill="#0369a1" stroke="#38bdf8" stroke-width="2"/>
    <text x="175" y="205" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">STA C</text>

    <!-- Peer-to-peer links -->
    <line x1="124" y1="120" x2="226" y2="120" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4 4"/>
    <line x1="117" y1="138" x2="158" y2="182" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4 4"/>
    <line x1="233" y1="138" x2="192" y2="182" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4 4"/>

    <text x="175" y="250" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">Direct Station-to-Station Transmission</text>
  </g>

  <!-- Right: Infrastructure BSS with AP -->
  <g transform="translate(440, 95)">
    <rect width="360" height="270" rx="12" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="180" y="32" font-family="system-ui, sans-serif" font-size="15" font-weight="800" fill="#34d399" text-anchor="middle">Infrastructure BSS (Access Point Mode)</text>
    <text x="180" y="52" font-family="system-ui, sans-serif" font-size="11" fill="#94a3b8" text-anchor="middle">Centralized Coordination via Access Point</text>

    <!-- Central AP -->
    <rect x="130" y="80" width="100" height="45" rx="8" fill="#047857" stroke="#10b981" stroke-width="2"/>
    <text x="180" y="103" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fff" text-anchor="middle">📡 Base AP</text>
    <text x="180" y="117" font-family="system-ui, sans-serif" font-size="9" fill="#a7f3d0" text-anchor="middle">BSSID = AP MAC</text>

    <!-- Stations below -->
    <circle cx="80" cy="180" r="20" fill="#334155" stroke="#10b981" stroke-width="1.5"/>
    <text x="80" y="185" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#fff" text-anchor="middle">STA 1</text>

    <circle cx="180" cy="195" r="20" fill="#334155" stroke="#10b981" stroke-width="1.5"/>
    <text x="180" y="200" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#fff" text-anchor="middle">STA 2</text>

    <circle cx="280" cy="180" r="20" fill="#334155" stroke="#10b981" stroke-width="1.5"/>
    <text x="280" y="185" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#fff" text-anchor="middle">STA 3</text>

    <!-- Stars lines to AP -->
    <line x1="145" y1="125" x2="95" y2="165" stroke="#10b981" stroke-width="2"/>
    <line x1="180" y1="125" x2="180" y2="175" stroke="#10b981" stroke-width="2"/>
    <line x1="215" y1="125" x2="265" y2="165" stroke="#10b981" stroke-width="2"/>

    <text x="180" y="250" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">All traffic relays through the AP (No direct STA-STA)</text>
  </g>
</svg>`);

// 4. Hidden Terminal Problem Scenario
writeSvg('hidden-terminal-problem-scenario.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 420" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
  </defs>
  <rect width="850" height="420" rx="16" fill="url(#bg)"/>
  <text x="425" y="40" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">The Hidden Terminal Problem in Wireless Networks</text>
  <text x="425" y="64" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Stations A and C are out of each other's radio range; both transmit to B simultaneously → Collision at B</text>

  <!-- Radio Ranges Circles -->
  <!-- Range of A -->
  <circle cx="230" cy="180" r="170" fill="#0284c7" fill-opacity="0.15" stroke="#38bdf8" stroke-width="2" stroke-dasharray="6 4"/>
  <text x="120" y="90" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#38bdf8">Transmission Range of A</text>

  <!-- Range of C -->
  <circle cx="620" cy="180" r="170" fill="#a855f7" fill-opacity="0.15" stroke="#c084fc" stroke-width="2" stroke-dasharray="6 4"/>
  <text x="610" y="90" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#c084fc">Transmission Range of C</text>

  <!-- Nodes A, B, C -->
  <!-- Node A -->
  <g transform="translate(230, 180)">
    <circle cx="0" cy="0" r="28" fill="#0369a1" stroke="#38bdf8" stroke-width="2.5"/>
    <text x="0" y="5" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#fff" text-anchor="middle">STA A</text>
  </g>

  <!-- Node B (Receiver in the middle) -->
  <g transform="translate(425, 180)">
    <circle cx="0" cy="0" r="32" fill="#7f1d1d" stroke="#ef4444" stroke-width="3"/>
    <text x="0" y="5" font-family="system-ui, sans-serif" font-size="15" font-weight="900" fill="#fff" text-anchor="middle">STA B</text>
    <text x="0" y="48" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#ef4444" text-anchor="middle">💥 Collision!</text>
  </g>

  <!-- Node C -->
  <g transform="translate(620, 180)">
    <circle cx="0" cy="0" r="28" fill="#6b21a8" stroke="#c084fc" stroke-width="2.5"/>
    <text x="0" y="5" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#fff" text-anchor="middle">STA C</text>
  </g>

  <!-- Transmit arrows toward B -->
  <line x1="265" y1="180" x2="385" y2="180" stroke="#38bdf8" stroke-width="3" stroke-dasharray="4 2"/>
  <text x="325" y="165" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#38bdf8" text-anchor="middle">A sends to B →</text>

  <line x1="585" y1="180" x2="465" y2="180" stroke="#c084fc" stroke-width="3" stroke-dasharray="4 2"/>
  <text x="525" y="165" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#c084fc" text-anchor="middle">← C sends to B</text>

  <!-- Explanation Bottom Card -->
  <g transform="translate(75, 290)">
    <rect width="700" height="105" rx="10" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
    <text x="20" y="26" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#fca5a5">Why CSMA/CD Fails Here:</text>
    <text x="20" y="48" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">1. Station A senses the medium: it hears nothing from C because C is outside A's transmission range.</text>
    <text x="20" y="68" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">2. Station C senses the medium: it hears nothing from A. Both deduce the channel is idle and transmit to B.</text>
    <text x="20" y="88" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#34d399">✅ Solution: Virtual Carrier Sensing using RTS/CTS (Request-to-Send / Clear-to-Send) in IEEE 802.11.</text>
  </g>
</svg>`);

// 5. Exposed Terminal Problem Scenario
writeSvg('exposed-terminal-problem-scenario.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 420" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
  </defs>
  <rect width="850" height="420" rx="16" fill="url(#bg)"/>
  <text x="425" y="40" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">The Exposed Terminal Problem in Wireless Networks</text>
  <text x="425" y="64" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">B is transmitting to A; C wants to transmit to D. C hears B and unnecessarily defers, wasting bandwidth</text>

  <!-- Radio Ranges -->
  <!-- Range of B -->
  <circle cx="340" cy="170" r="160" fill="#0284c7" fill-opacity="0.12" stroke="#38bdf8" stroke-width="2" stroke-dasharray="6 4"/>
  <text x="250" y="85" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#38bdf8">Range of B (covers A and C)</text>

  <!-- Range of C -->
  <circle cx="510" cy="170" r="160" fill="#a855f7" fill-opacity="0.12" stroke="#c084fc" stroke-width="2" stroke-dasharray="6 4"/>
  <text x="590" y="85" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#c084fc">Range of C (covers B and D)</text>

  <!-- Nodes A, B, C, D in a horizontal row -->
  <!-- Node A -->
  <circle cx="150" cy="170" r="25" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
  <text x="150" y="175" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#fff" text-anchor="middle">STA A</text>

  <!-- Node B (Transmitting to A) -->
  <circle cx="340" cy="170" r="28" fill="#0369a1" stroke="#38bdf8" stroke-width="2.5"/>
  <text x="340" y="175" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#fff" text-anchor="middle">STA B</text>

  <!-- Transmit B to A -->
  <line x1="305" y1="170" x2="185" y2="170" stroke="#38bdf8" stroke-width="3"/>
  <text x="245" y="155" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#38bdf8" text-anchor="middle">← B sends to A</text>

  <!-- Node C (Wants to transmit to D) -->
  <circle cx="510" cy="170" r="28" fill="#6b21a8" stroke="#c084fc" stroke-width="2.5"/>
  <text x="510" y="175" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#fff" text-anchor="middle">STA C</text>

  <!-- Desired transmission C to D -->
  <line x1="545" y1="170" x2="665" y2="170" stroke="#10b981" stroke-width="3" stroke-dasharray="4 3"/>
  <text x="605" y="155" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#34d399" text-anchor="middle">C wants to send to D →</text>

  <!-- Node D -->
  <circle cx="700" cy="170" r="25" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
  <text x="700" y="175" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#fff" text-anchor="middle">STA D</text>

  <!-- Bottom Evaluation Card -->
  <g transform="translate(75, 280)">
    <rect width="700" height="115" rx="10" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="20" y="26" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#fbbf24">Inappropriate Deferral (Bandwidth Wastage):</text>
    <text x="20" y="48" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• C senses medium before sending to D: C hears B transmitting, so C believes the channel is busy.</text>
    <text x="20" y="68" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• BUT C's transmission would only reach D (and B). D is far from B, so D would receive C's signal cleanly!</text>
    <text x="20" y="88" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• Furthermore, A is outside C's transmission range, so C would not interfere with A receiving from B!</text>
    <text x="20" y="106" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#38bdf8">Result: Unnecessary backoff reduces network capacity. RTS/CTS resolves this because C hears CTS from D.</text>
  </g>
</svg>`);

// 6. Wireless Multiple Access Comparison
writeSvg('wireless-multiple-access-comparison.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
  </defs>
  <rect width="850" height="400" rx="16" fill="url(#bg)"/>
  <text x="425" y="40" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Why CSMA/CD Fails in Wireless (The Need for CSMA/CA)</text>
  <text x="425" y="64" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Fundamental Physical Differences Between Guided Copper and Wireless RF Mediums</text>

  <!-- Left: Wired CSMA/CD -->
  <g transform="translate(50, 95)">
    <rect width="350" height="270" rx="12" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="175" y="32" font-family="system-ui, sans-serif" font-size="15" font-weight="800" fill="#38bdf8" text-anchor="middle">Wired Ethernet (CSMA/CD)</text>
    
    <text x="20" y="65" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Low Dynamic Signal Range:</text>
    <text x="20" y="82" font-family="system-ui, sans-serif" font-size="11" fill="#94a3b8">Signal voltage drops minimally over twisted pair or coax (&lt; 3 dB).</text>

    <text x="20" y="115" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Simultaneous TX &amp; RX (Full Listen):</text>
    <text x="20" y="132" font-family="system-ui, sans-serif" font-size="11" fill="#94a3b8">Transmitter can easily detect abnormal voltage spike indicating a collision.</text>

    <text x="20" y="165" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Fast Abort &amp; Recovery:</text>
    <text x="20" y="182" font-family="system-ui, sans-serif" font-size="11" fill="#94a3b8">Stations abort immediately upon collision, saving bandwidth.</text>

    <text x="20" y="215" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• No Hidden Terminals:</text>
    <text x="20" y="232" font-family="system-ui, sans-serif" font-size="11" fill="#94a3b8">Every station is electrically connected to the same shared medium.</text>
  </g>

  <!-- Right: Wireless CSMA/CA -->
  <g transform="translate(440, 95)">
    <rect width="360" height="270" rx="12" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
    <text x="180" y="32" font-family="system-ui, sans-serif" font-size="15" font-weight="800" fill="#f87171" text-anchor="middle">Wireless LAN (CSMA/CA Required)</text>

    <text x="20" y="65" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Extreme Dynamic Range (&gt; 50 to 90 dB):</text>
    <text x="20" y="82" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">Transmitted power drowns out incoming weak signals (self-interference).</text>

    <text x="20" y="115" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Cannot Hear While Talking (Half-Duplex):</text>
    <text x="20" y="132" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">Transmitter cannot detect collisions occurring at the remote receiver!</text>

    <text x="20" y="165" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Avoidance (CA) Rather Than Detection (CD):</text>
    <text x="20" y="182" font-family="system-ui, sans-serif" font-size="11" fill="#34d399">Interframe Spaces (IFS) + Random Backoff + RTS/CTS + Positive ACKs.</text>

    <text x="20" y="215" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Severe Hidden / Exposed Terminals:</text>
    <text x="20" y="232" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">Spatial separation creates localized interference domains.</text>
  </g>
</svg>`);

// 7. WLAN Access Methods (DCF vs PCF)
writeSvg('wlan-access-methods-dcf-pcf.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
  </defs>
  <rect width="850" height="400" rx="16" fill="url(#bg)"/>
  <text x="425" y="40" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">WLAN MAC Access Modes: DCF vs. PCF</text>
  <text x="425" y="64" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Distributed Contention-Based Access vs. Centralized Contention-Free Polling</text>

  <!-- Left Card: DCF -->
  <g transform="translate(50, 95)">
    <rect width="350" height="270" rx="12" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="175" y="32" font-family="system-ui, sans-serif" font-size="15" font-weight="800" fill="#38bdf8" text-anchor="middle">Distributed Coordination Function (DCF)</text>
    <rect x="110" y="45" width="130" height="22" rx="4" fill="#0369a1"/>
    <text x="175" y="60" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fff" text-anchor="middle">MANDATORY IN 802.11</text>

    <text x="20" y="95" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Contention-Based Multiple Access:</text>
    <text x="20" y="112" font-family="system-ui, sans-serif" font-size="11" fill="#94a3b8">Every station contends independently using CSMA/CA.</text>

    <text x="20" y="140" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Best-Effort Asynchronous Traffic:</text>
    <text x="20" y="157" font-family="system-ui, sans-serif" font-size="11" fill="#94a3b8">Ideal for Web, Email, and general IP file transfer.</text>

    <text x="20" y="185" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Decentralized &amp; Ad-Hoc Capable:</text>
    <text x="20" y="202" font-family="system-ui, sans-serif" font-size="11" fill="#94a3b8">Runs in both Infrastructure BSS and IBSS peer networks.</text>

    <text x="20" y="230" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Timing: DIFS + Exponential Backoff:</text>
    <text x="20" y="247" font-family="system-ui, sans-serif" font-size="11" fill="#38bdf8">Stations defer during DIFS and draw slot from CW.</text>
  </g>

  <!-- Right Card: PCF -->
  <g transform="translate(440, 95)">
    <rect width="360" height="270" rx="12" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="180" y="32" font-family="system-ui, sans-serif" font-size="15" font-weight="800" fill="#34d399" text-anchor="middle">Point Coordination Function (PCF)</text>
    <rect x="115" y="45" width="130" height="22" rx="4" fill="#047857"/>
    <text x="180" y="60" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fff" text-anchor="middle">OPTIONAL IN 802.11</text>

    <text x="20" y="95" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Contention-Free Centralized Polling:</text>
    <text x="20" y="112" font-family="system-ui, sans-serif" font-size="11" fill="#a7f3d0">The AP acts as Point Coordinator, polling nodes sequentially.</text>

    <text x="20" y="140" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Time-Bounded Real-Time Traffic:</text>
    <text x="20" y="157" font-family="system-ui, sans-serif" font-size="11" fill="#a7f3d0">Designed for VoIP and video streaming requiring guaranteed latency.</text>

    <text x="20" y="185" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Requires Infrastructure AP:</text>
    <text x="20" y="202" font-family="system-ui, sans-serif" font-size="11" fill="#a7f3d0">Cannot operate in peer-to-peer ad-hoc topologies.</text>

    <text x="20" y="230" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Priority Timing: PIFS &lt; DIFS:</text>
    <text x="20" y="247" font-family="system-ui, sans-serif" font-size="11" fill="#34d399">AP seizes the channel before any DCF station can transmit.</text>
  </g>
</svg>`);

// 8. Wireless Communication Challenges
writeSvg('wireless-communication-challenges.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
  </defs>
  <rect width="850" height="400" rx="16" fill="url(#bg)"/>
  <text x="425" y="40" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Key Engineering Challenges in Wireless Communications</text>
  <text x="425" y="64" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Physical, MAC-Layer, Mobility &amp; Cryptographic Constraints of the RF Medium</text>

  <!-- 4 Grid Boxes -->
  <g transform="translate(60, 95)">
    <!-- Box 1 -->
    <rect x="0" y="0" width="340" height="120" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="20" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#38bdf8">1. High Bit-Error Rate &amp; Retransmissions</text>
    <text x="20" y="55" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• Unpredictable noise bursts, Doppler shift, dynamic fading</text>
    <text x="20" y="75" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• Strict frame size caps &amp; packet fragmentation</text>
    <text x="20" y="95" font-family="system-ui, sans-serif" font-size="11" fill="#94a3b8">• Requires Forward Error Correction (FEC) &amp; Stop-and-Wait ACKs</text>

    <!-- Box 2 -->
    <rect x="380" y="0" width="340" height="120" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="400" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#34d399">2. Mobility &amp; Dynamic Topology</text>
    <text x="400" y="55" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• Mobile stations cross AP coverage boundaries</text>
    <text x="400" y="75" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• Fast BSS Transition / Roaming (IEEE 802.11r)</text>
    <text x="400" y="95" font-family="system-ui, sans-serif" font-size="11" fill="#94a3b8">• Dynamic re-association &amp; 802.1X key handshakes</text>

    <!-- Box 3 -->
    <rect x="0" y="145" width="340" height="120" rx="10" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="20" y="175" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#fbbf24">3. Eavesdropping &amp; Open Broadcast Medium</text>
    <text x="20" y="200" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• Anyone with an antenna within range can sniff packets</text>
    <text x="20" y="220" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• Evolution from broken WEP → WPA2 (AES-CCMP) → WPA3 (SAE)</text>
    <text x="20" y="240" font-family="system-ui, sans-serif" font-size="11" fill="#94a3b8">• Mutual station-AP authentication via 4-Way Handshake</text>

    <!-- Box 4 -->
    <rect x="380" y="145" width="340" height="120" rx="10" fill="#1e293b" stroke="#ec4899" stroke-width="1.5"/>
    <text x="400" y="175" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f472b6">4. Power Consumption in Mobile Clients</text>
    <text x="400" y="200" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• RF radios consume heavy battery when continuously active</text>
    <text x="400" y="220" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• IEEE 802.11 Power Save Mode (PSM) &amp; DTIM Beacons</text>
    <text x="400" y="240" font-family="system-ui, sans-serif" font-size="11" fill="#94a3b8">• Target Wake Time (TWT) in Wi-Fi 6 (802.11ax) for IoT battery life</text>
  </g>
</svg>`);

console.log('All 8 Topic 7 SVGs generated successfully!');

