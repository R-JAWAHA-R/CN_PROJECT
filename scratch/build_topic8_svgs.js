const fs = require('fs');
const path = require('path');

const outDir = 'assets/images/topic8';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function writeSvg(filename, content) {
  fs.writeFileSync(path.join(outDir, filename), content.trim(), 'utf8');
  console.log('Created: ' + filename);
}

// 1. IEEE 802.11 MAC Sublayer Stack
writeSvg('ieee-802-11-mac-sublayer-stack.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 420" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
  </defs>
  <rect width="850" height="420" rx="16" fill="url(#bg)"/>
  <text x="425" y="40" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">IEEE 802.11 Protocol Architecture &amp; Sublayer Stack</text>
  <text x="425" y="64" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">LLC 802.2 Layer, PCF &amp; DCF Coordination Modes, and PHY Layer PMD Standards</text>

  <!-- Layer Stack -->
  <g transform="translate(150, 95)">
    <!-- LLC -->
    <rect x="0" y="0" width="550" height="50" rx="8" fill="#1e3a8a" stroke="#3b82f6" stroke-width="2"/>
    <text x="275" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#fff" text-anchor="middle">IEEE 802.2 Logical Link Control (LLC)</text>

    <!-- MAC Sublayer Envelope -->
    <rect x="0" y="65" width="550" height="135" rx="10" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
    <text x="275" y="85" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#34d399" text-anchor="middle">IEEE 802.11 MAC Sublayer</text>

    <!-- PCF (Top of MAC) -->
    <rect x="30" y="95" width="490" height="40" rx="6" fill="#047857" stroke="#34d399" stroke-width="1.5"/>
    <text x="275" y="120" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff" text-anchor="middle">Point Coordination Function (PCF) — Optional, Contention-Free Polling</text>

    <!-- DCF (Bottom of MAC, foundational) -->
    <rect x="30" y="145" width="490" height="45" rx="6" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="275" y="172" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fff" text-anchor="middle">Distributed Coordination Function (DCF) — Mandatory, CSMA/CA with Binary Backoff</text>

    <!-- PHY Layer -->
    <rect x="0" y="215" width="550" height="85" rx="8" fill="#1e293b" stroke="#818cf8" stroke-width="2"/>
    <text x="275" y="240" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#c7d2fe" text-anchor="middle">IEEE 802.11 Physical Layer (PHY)</text>
    <text x="275" y="265" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">PLCP (Convergence Protocol) + PMD (Physical Medium Dependent)</text>
    <text x="275" y="285" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#a5b4fc">DSSS (802.11b) | OFDM (802.11a/g) | MIMO-OFDM (802.11n) | OFDMA (802.11ax Wi-Fi 6)</text>
  </g>
</svg>`);

// 2. IEEE 802.11 BSS, ESS & DS Architecture
writeSvg('ieee-802-11-bss-ess-ds.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
  </defs>
  <rect width="850" height="400" rx="16" fill="url(#bg)"/>
  <text x="425" y="40" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Extended Service Set (ESS) &amp; Distribution System Architecture</text>
  <text x="425" y="64" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Connecting Independent BSS Cells via DS Backbone and Gateway Portal to External Networks</text>

  <!-- Backbone Distribution System -->
  <g transform="translate(100, 95)">
    <rect width="650" height="35" rx="6" fill="#1e3a8a" stroke="#3b82f6" stroke-width="2"/>
    <text x="260" y="22" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#fff" text-anchor="middle">802.3 Ethernet Distribution System (DS)</text>
    <!-- Portal to Internet -->
    <rect x="520" y="5" width="115" height="25" rx="4" fill="#047857"/>
    <text x="577" y="22" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">Portal / Router 🌐</text>
  </g>

  <!-- BSS 1 -->
  <g transform="translate(70, 155)">
    <ellipse cx="170" cy="100" rx="140" ry="90" fill="#0284c7" fill-opacity="0.12" stroke="#38bdf8" stroke-width="2" stroke-dasharray="6 4"/>
    <text x="170" y="20" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#38bdf8" text-anchor="middle">BSS 1 (Channel 1)</text>

    <!-- AP 1 -->
    <line x1="170" y1="-25" x2="170" y2="40" stroke="#3b82f6" stroke-width="3"/>
    <rect x="125" y="40" width="90" height="40" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
    <text x="170" y="65" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fff" text-anchor="middle">📡 AP 1</text>

    <circle cx="100" cy="130" r="16" fill="#334155" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="100" y="134" font-family="system-ui, sans-serif" font-size="9" fill="#fff" text-anchor="middle">STA 1</text>
    <circle cx="230" cy="130" r="16" fill="#334155" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="230" y="134" font-family="system-ui, sans-serif" font-size="9" fill="#fff" text-anchor="middle">STA 2</text>
  </g>

  <!-- BSS 2 -->
  <g transform="translate(470, 155)">
    <ellipse cx="170" cy="100" rx="140" ry="90" fill="#059669" fill-opacity="0.12" stroke="#10b981" stroke-width="2" stroke-dasharray="6 4"/>
    <text x="170" y="20" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#34d399" text-anchor="middle">BSS 2 (Channel 6)</text>

    <!-- AP 2 -->
    <line x1="170" y1="-25" x2="170" y2="40" stroke="#3b82f6" stroke-width="3"/>
    <rect x="125" y="40" width="90" height="40" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="170" y="65" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fff" text-anchor="middle">📡 AP 2</text>

    <circle cx="100" cy="130" r="16" fill="#334155" stroke="#10b981" stroke-width="1.5"/>
    <text x="100" y="134" font-family="system-ui, sans-serif" font-size="9" fill="#fff" text-anchor="middle">STA 3</text>
    <circle cx="230" cy="130" r="16" fill="#334155" stroke="#10b981" stroke-width="1.5"/>
    <text x="230" y="134" font-family="system-ui, sans-serif" font-size="9" fill="#fff" text-anchor="middle">STA 4</text>
  </g>

  <!-- Roaming STA between BSS1 and BSS2 -->
  <g transform="translate(400, 260)">
    <circle cx="25" cy="20" r="18" fill="#eab308" stroke="#fff" stroke-width="2"/>
    <text x="25" y="24" font-family="system-ui, sans-serif" font-size="9" font-weight="800" fill="#000" text-anchor="middle">Mobile</text>
    <text x="25" y="55" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#fbbf24" text-anchor="middle">Seamless ESS Roaming</text>
  </g>
</svg>`);

// 3. DCF Timing Diagram & Contention Window
writeSvg('dcf-timing-diagram-cw.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 380" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
  </defs>
  <rect width="850" height="380" rx="16" fill="url(#bg)"/>
  <text x="425" y="38" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">IEEE 802.11 DCF Timing &amp; Contention Window Slots</text>
  <text x="425" y="62" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">DIFS Interframe Space, Random Backoff Decrement, Frame Transmission &amp; SIFS / ACK</text>

  <!-- Timeline Bar -->
  <g transform="translate(50, 110)">
    <!-- Busy Medium -->
    <rect x="0" y="40" width="150" height="50" rx="4" fill="#64748b"/>
    <text x="75" y="70" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fff" text-anchor="middle">Medium Busy</text>

    <!-- DIFS Interval -->
    <rect x="155" y="40" width="80" height="50" rx="4" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="195" y="65" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">DIFS</text>
    <text x="195" y="80" font-family="monospace" font-size="9" fill="#bae6fd" text-anchor="middle">50 µs</text>

    <!-- Contention Window (Backoff Slots) -->
    <rect x="240" y="40" width="170" height="50" rx="4" fill="#1e293b" stroke="#eab308" stroke-width="2"/>
    <text x="325" y="62" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fbbf24" text-anchor="middle">Contention Window</text>
    <text x="325" y="80" font-family="system-ui, sans-serif" font-size="9" fill="#fde68a" text-anchor="middle">Random Backoff Slots (Slot = 20 µs)</text>

    <!-- Transmit Frame (DATA) -->
    <rect x="415" y="30" width="220" height="70" rx="6" fill="#047857" stroke="#10b981" stroke-width="2"/>
    <text x="525" y="65" font-family="system-ui, sans-serif" font-size="14" font-weight="900" fill="#fff" text-anchor="middle">DATA FRAME TX</text>
    <text x="525" y="85" font-family="system-ui, sans-serif" font-size="11" fill="#a7f3d0" text-anchor="middle">Transmitted by Winning Station</text>

    <!-- SIFS -->
    <rect x="640" y="40" width="45" height="50" rx="4" fill="#a855f7" stroke="#c084fc" stroke-width="1.5"/>
    <text x="662" y="65" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fff" text-anchor="middle">SIFS</text>
    <text x="662" y="80" font-family="monospace" font-size="8" fill="#e9d5ff" text-anchor="middle">10µs</text>

    <!-- ACK Frame -->
    <rect x="690" y="40" width="60" height="50" rx="4" fill="#059669" stroke="#34d399" stroke-width="1.5"/>
    <text x="720" y="70" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fff" text-anchor="middle">ACK</text>
  </g>

  <!-- Explanatory Legend -->
  <g transform="translate(60, 260)">
    <rect width="730" height="85" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
    <text x="20" y="25" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• <strong fill="#38bdf8">DIFS (DCF Interframe Space):</strong> Minimum silence time a station must observe after channel becomes idle.</text>
    <text x="20" y="50" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• <strong fill="#fbbf24">Contention Window (CW):</strong> Station picks random slots R ∈ [0, CW]. Slot timer decrements while idle; freezes when busy.</text>
    <text x="20" y="75" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• <strong fill="#c084fc">SIFS (Short IFS):</strong> Shortest pause reserved for high-priority ACK response; prevents other stations from interrupting.</text>
  </g>
</svg>`);

// 4. PCF Superframe Structure
writeSvg('pcf-superframe-structure.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 380" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
  </defs>
  <rect width="850" height="380" rx="16" fill="url(#bg)"/>
  <text x="425" y="38" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">IEEE 802.11 PCF Superframe Repetition Interval</text>
  <text x="425" y="62" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Alternating Contention-Free Period (CFP via AP Polling) and Contention Period (CP via DCF)</text>

  <!-- Superframe Container -->
  <g transform="translate(60, 105)">
    <!-- Outer Bracket / Header -->
    <rect x="0" y="0" width="730" height="30" rx="6" fill="#334155"/>
    <text x="365" y="20" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#f8fafc" text-anchor="middle">SUPERFRAME REPETITION INTERVAL (CFP_Period)</text>

    <!-- Superframe Breakdown -->
    <!-- Beacon Frame -->
    <rect x="0" y="40" width="90" height="75" rx="6" fill="#eab308" stroke="#ca8a04" stroke-width="2"/>
    <text x="45" y="72" font-family="system-ui, sans-serif" font-size="12" font-weight="900" fill="#000" text-anchor="middle">BEACON</text>
    <text x="45" y="92" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#000" text-anchor="middle">TBTT Sync</text>

    <!-- CFP: Contention Free Period -->
    <rect x="95" y="40" width="370" height="75" rx="6" fill="#047857" stroke="#10b981" stroke-width="2"/>
    <text x="280" y="68" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#fff" text-anchor="middle">Contention-Free Period (CFP)</text>
    <text x="280" y="88" font-family="system-ui, sans-serif" font-size="11" fill="#a7f3d0" text-anchor="middle">Access Point Polls Stations: Poll + Data / Null + ACK</text>
    <text x="280" y="104" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#6ee7b7" text-anchor="middle">Separated by PIFS / SIFS (Contention Suppressed by NAV)</text>

    <!-- CP: Contention Period -->
    <rect x="470" y="40" width="260" height="75" rx="6" fill="#1e3a8a" stroke="#3b82f6" stroke-width="2"/>
    <text x="600" y="68" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#fff" text-anchor="middle">Contention Period (CP)</text>
    <text x="600" y="88" font-family="system-ui, sans-serif" font-size="11" fill="#bfdbfe" text-anchor="middle">Standard DCF Mode</text>
    <text x="600" y="104" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#93c5fd" text-anchor="middle">DIFS + CSMA/CA Backoff</text>
  </g>

  <!-- Technical Summary Card -->
  <g transform="translate(60, 255)">
    <rect width="730" height="90" rx="8" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
    <text x="20" y="25" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• <strong fill="#fbbf24">Beacon Frame:</strong> Broadcast at Target Beacon Transmission Time (TBTT) containing maximum CFP duration.</text>
    <text x="20" y="50" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• <strong fill="#34d399">CFP Operation:</strong> All client stations set their Network Allocation Vector (NAV) to max CFP duration, remaining completely silent.</text>
    <text x="20" y="75" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• <strong fill="#60a5fa">CF-End Frame:</strong> AP sends CF-End frame to reset client NAVs early if no polled stations have real-time data to send.</text>
  </g>
</svg>`);

// 5. CSMA/CA Detailed Flowchart
writeSvg('csma-ca-detailed-flowchart.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 480" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8"/>
    </marker>
  </defs>
  <rect width="850" height="480" rx="16" fill="url(#bg)"/>
  <text x="425" y="38" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">IEEE 802.11 CSMA/CA Protocol Logic</text>
  <text x="425" y="60" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Physical Carrier Sensing, DIFS Deferral, Backoff Countdown &amp; Link-Layer ACK Verification</text>

  <!-- Flowchart -->
  <!-- Ready -->
  <rect x="80" y="90" width="160" height="38" rx="19" fill="#0284c7" stroke="#38bdf8" stroke-width="2"/>
  <text x="160" y="114" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fff" text-anchor="middle">Packet from LLC Ready</text>

  <!-- Sense Medium -->
  <polygon points="160,150 240,185 160,220 80,185" fill="#334155" stroke="#38bdf8" stroke-width="2"/>
  <text x="160" y="180" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">Is Medium</text>
  <text x="160" y="195" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">Idle?</text>

  <!-- Wait DIFS -->
  <rect x="80" y="260" width="160" height="45" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
  <text x="160" y="280" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#f8fafc" text-anchor="middle">Wait DIFS Period</text>
  <text x="160" y="295" font-family="system-ui, sans-serif" font-size="10" fill="#94a3b8" text-anchor="middle">Still idle after DIFS?</text>

  <!-- Random Backoff -->
  <rect x="80" y="345" width="160" height="45" rx="6" fill="#854d0e" stroke="#eab308" stroke-width="2"/>
  <text x="160" y="365" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">Draw Backoff Counter</text>
  <text x="160" y="380" font-family="system-ui, sans-serif" font-size="10" fill="#fde68a" text-anchor="middle">R ∈ [0, CW] × Slot</text>

  <!-- Transmit Frame -->
  <rect x="360" y="345" width="170" height="45" rx="6" fill="#047857" stroke="#10b981" stroke-width="2"/>
  <text x="445" y="365" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fff" text-anchor="middle">Transmit DATA Frame</text>
  <text x="445" y="380" font-family="system-ui, sans-serif" font-size="10" fill="#a7f3d0" text-anchor="middle">(Or RTS if enabled)</text>

  <!-- Wait ACK -->
  <polygon points="445,235 525,270 445,305 365,270" fill="#334155" stroke="#10b981" stroke-width="2"/>
  <text x="445" y="265" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">ACK Received</text>
  <text x="445" y="280" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">within Timeout?</text>

  <!-- Success -->
  <rect x="640" y="250" width="150" height="40" rx="20" fill="#059669" stroke="#34d399" stroke-width="2"/>
  <text x="715" y="275" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fff" text-anchor="middle">✅ Success (Done)</text>

  <!-- Collision / Retransmit Logic -->
  <rect x="360" y="145" width="170" height="45" rx="6" fill="#7f1d1d" stroke="#ef4444" stroke-width="2"/>
  <text x="445" y="165" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fff" text-anchor="middle">Double CW: 2 × (CW+1) - 1</text>
  <text x="445" y="180" font-family="system-ui, sans-serif" font-size="10" fill="#fca5a5" text-anchor="middle">Increment Retry Count</text>

  <!-- Connectors -->
  <line x1="160" y1="128" x2="160" y2="150" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrow)"/>
  <line x1="160" y1="220" x2="160" y2="260" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="175" y="245" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#34d399">Yes</text>

  <line x1="160" y1="305" x2="160" y2="345" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrow)"/>
  <line x1="240" y1="367" x2="360" y2="367" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="300" y="360" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#38bdf8">Counter=0</text>

  <line x1="445" y1="345" x2="445" y2="305" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrow)"/>
  <line x1="525" y1="270" x2="640" y2="270" stroke="#34d399" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="580" y="260" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#34d399">Yes</text>

  <line x1="445" y1="235" x2="445" y2="190" stroke="#ef4444" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="455" y="215" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#ef4444">No (Loss)</text>

  <line x1="360" y1="167" x2="240" y2="167" stroke="#ef4444" stroke-width="2" marker-end="url(#arrow)"/>
</svg>`);

// 6. Interframe Spaces Hierarchy (SIFS < PIFS < DIFS < EIFS)
writeSvg('interframe-spaces-hierarchy.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
  </defs>
  <rect width="850" height="400" rx="16" fill="url(#bg)"/>
  <text x="425" y="40" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Priority Hierarchy of 802.11 Interframe Spaces (IFS)</text>
  <text x="425" y="64" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Shorter Silence Duration = Higher Medium Access Priority (SIFS &lt; PIFS &lt; DIFS &lt; EIFS)</text>

  <!-- Bars Diagram -->
  <g transform="translate(100, 100)">
    <!-- SIFS -->
    <text x="0" y="32" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#a855f7">SIFS (10 µs)</text>
    <rect x="150" y="12" width="100" height="30" rx="6" fill="#a855f7"/>
    <text x="270" y="32" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">Highest Priority: ACK, CTS, Data Fragment burst</text>

    <!-- PIFS -->
    <text x="0" y="82" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#10b981">PIFS (30 µs)</text>
    <rect x="150" y="62" width="180" height="30" rx="6" fill="#10b981"/>
    <text x="350" y="82" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">Medium Priority: PCF Access Point polling, Beacon</text>

    <!-- DIFS -->
    <text x="0" y="132" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#38bdf8">DIFS (50 µs)</text>
    <rect x="150" y="112" width="260" height="30" rx="6" fill="#0284c7"/>
    <text x="430" y="132" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">Standard Priority: DCF best-effort station contention</text>

    <!-- EIFS -->
    <text x="0" y="182" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#ef4444">EIFS (&gt;300 µs)</text>
    <rect x="150" y="162" width="480" height="30" rx="6" fill="#991b1b"/>
    <text x="160" y="182" font-family="system-ui, sans-serif" font-size="12" fill="#fff">Extended IFS: After receiving corrupted or unreadable frame</text>
  </g>

  <!-- Formula Callout -->
  <g transform="translate(60, 310)">
    <rect width="730" height="60" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
    <text x="365" y="26" font-family="monospace" font-size="13" font-weight="700" fill="#38bdf8" text-anchor="middle">PIFS = SIFS + 1 Slot Time | DIFS = SIFS + 2 × Slot Time</text>
    <text x="365" y="48" font-family="system-ui, sans-serif" font-size="11" fill="#94a3b8" text-anchor="middle">Because SIFS &lt; PIFS &lt; DIFS, an ACK will NEVER collide with an AP poll or a contending DCF station!</text>
  </g>
</svg>`);

// 7. RTS/CTS Mechanism (Virtual Carrier Sensing)
writeSvg('rts-cts-virtual-carrier-sensing.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 420" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
  </defs>
  <rect width="850" height="420" rx="16" fill="url(#bg)"/>
  <text x="425" y="38" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">RTS / CTS Handshake &amp; Virtual Carrier Sensing</text>
  <text x="425" y="62" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Eliminating Hidden Terminals by Reserving Channel Time via the NAV Timer</text>

  <!-- Timeline Exchange -->
  <g transform="translate(80, 95)">
    <!-- Station A (Sender) -->
    <text x="50" y="25" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#38bdf8">Sender (A)</text>
    <rect x="130" y="10" width="70" height="30" rx="4" fill="#0284c7"/>
    <text x="165" y="30" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">RTS</text>

    <!-- Transmit Data -->
    <rect x="290" y="10" width="230" height="30" rx="4" fill="#047857"/>
    <text x="405" y="30" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">DATA FRAME TRANSMISSION</text>

    <!-- Receiver (B) -->
    <text x="50" y="85" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#10b981">Receiver (B)</text>
    <rect x="215" y="70" width="60" height="30" rx="4" fill="#059669"/>
    <text x="245" y="90" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">CTS</text>

    <!-- Receive ACK -->
    <rect x="535" y="70" width="60" height="30" rx="4" fill="#059669"/>
    <text x="565" y="90" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">ACK</text>

    <!-- SIFS Gaps -->
    <line x1="200" y1="25" x2="215" y2="70" stroke="#a855f7" stroke-width="1.5" stroke-dasharray="2 2"/>
    <line x1="275" y1="85" x2="290" y2="25" stroke="#a855f7" stroke-width="1.5" stroke-dasharray="2 2"/>
    <line x1="520" y1="25" x2="535" y2="70" stroke="#a855f7" stroke-width="1.5" stroke-dasharray="2 2"/>

    <!-- Hidden Node C (hears CTS) -->
    <text x="50" y="150" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#ef4444">Hidden STA (C)</text>
    <rect x="215" y="135" width="380" height="30" rx="6" fill="#7f1d1d" stroke="#ef4444" stroke-width="1.5"/>
    <text x="405" y="155" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fca5a5" text-anchor="middle">NAV (Network Allocation Vector): Defer Transmission (Channel Busy)</text>
  </g>

  <!-- Technical Insights -->
  <g transform="translate(60, 290)">
    <rect width="730" height="100" rx="10" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
    <text x="20" y="26" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#38bdf8">1. RTS Frame (20 Bytes):</text>
    <text x="190" y="26" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">Sender requests airtime and specifies the Duration required for CTS + DATA + ACK.</text>

    <text x="20" y="50" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#34d399">2. CTS Frame (14 Bytes):</text>
    <text x="190" y="50" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">Receiver confirms readiness; all stations hearing CTS (like C) update NAV to remain silent.</text>

    <text x="20" y="74" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fbbf24">3. RTS Threshold:</text>
    <text x="190" y="74" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">RTS/CTS is only used for frames exceeding the RTS Threshold (e.g. 2347 bytes) to avoid overhead on small packets.</text>
  </g>
</svg>`);

// 8. Network Allocation Vector (NAV) Timeline
writeSvg('network-allocation-vector-timeline.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 380" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
  </defs>
  <rect width="850" height="380" rx="16" fill="url(#bg)"/>
  <text x="425" y="38" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Network Allocation Vector (NAV) Countdown Mechanism</text>
  <text x="425" y="62" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Virtual Carrier Sense: Counting Down Microseconds to Zero Before Sampling Physical Medium</text>

  <!-- NAV Countdown Bar -->
  <g transform="translate(80, 105)">
    <!-- Physical Medium activity -->
    <text x="30" y="30" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#38bdf8">Air Interface:</text>
    <rect x="130" y="10" width="70" height="35" rx="4" fill="#0284c7"/>
    <text x="165" y="32" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">RTS</text>

    <rect x="210" y="10" width="60" height="35" rx="4" fill="#059669"/>
    <text x="240" y="32" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">CTS</text>

    <rect x="280" y="10" width="250" height="35" rx="4" fill="#047857"/>
    <text x="405" y="32" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">DATA FRAME</text>

    <rect x="540" y="10" width="55" height="35" rx="4" fill="#059669"/>
    <text x="567" y="32" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">ACK</text>

    <!-- NAV Timer at Neighbor Node -->
    <text x="30" y="115" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fbbf24">Neighbor NAV:</text>

    <!-- NAV Countdown Wedge -->
    <polygon points="210,95 595,95 595,135 210,135" fill="#78350f" stroke="#f59e0b" stroke-width="2"/>
    <text x="402" y="120" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fef08a" text-anchor="middle">NAV Countdown: Timer &gt; 0 (Virtual Carrier Sense = BUSY)</text>

    <line x1="595" y1="135" x2="595" y2="160" stroke="#f59e0b" stroke-width="2"/>
    <text x="595" y="180" font-family="monospace" font-size="11" font-weight="800" fill="#34d399" text-anchor="middle">NAV = 0</text>
    <text x="595" y="195" font-family="system-ui, sans-serif" font-size="10" fill="#a7f3d0" text-anchor="middle">Channel becomes Free</text>
  </g>

  <!-- Key Concept Box -->
  <g transform="translate(60, 275)">
    <rect width="730" height="75" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
    <text x="20" y="28" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• <strong fill="#fbbf24">Dual Carrier Sensing:</strong> Medium is considered busy if EITHER Physical Carrier Sense (CCA) OR Virtual (NAV) is busy.</text>
    <text x="20" y="52" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• <strong fill="#38bdf8">Power Efficiency:</strong> A station with an active NAV can power down its RF frontend into sleep mode, conserving battery.</text>
  </g>
</svg>`);

// 9. IEEE 802.11 Frame Formats Detailed
writeSvg('ieee-802-11-frame-format-detailed.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 420" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
  </defs>
  <rect width="900" height="420" rx="16" fill="url(#bg)"/>
  <text x="450" y="40" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Detailed IEEE 802.11 MAC Frame Format (4-Address Structure)</text>
  <text x="450" y="64" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Frame Control, Duration/ID, 4 MAC Addresses, Sequence Control &amp; Payload Structure</text>

  <!-- Frame Fields Bar -->
  <g transform="translate(30, 95)">
    <!-- FC -->
    <rect x="0" y="0" width="70" height="65" rx="6" fill="#1e3a8a" stroke="#3b82f6" stroke-width="2"/>
    <text x="35" y="28" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">Frame Ctrl</text>
    <text x="35" y="48" font-family="monospace" font-size="11" fill="#93c5fd" text-anchor="middle">2 Bytes</text>

    <!-- Duration -->
    <rect x="75" y="0" width="70" height="65" rx="6" fill="#065f46" stroke="#10b981" stroke-width="2"/>
    <text x="110" y="28" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">Duration</text>
    <text x="110" y="48" font-family="monospace" font-size="11" fill="#6ee7b7" text-anchor="middle">2 Bytes</text>

    <!-- Address 1 -->
    <rect x="150" y="0" width="80" height="65" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="190" y="28" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8" text-anchor="middle">Address 1</text>
    <text x="190" y="48" font-family="monospace" font-size="10" fill="#94a3b8" text-anchor="middle">6B (Receiver)</text>

    <!-- Address 2 -->
    <rect x="235" y="0" width="80" height="65" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="275" y="28" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8" text-anchor="middle">Address 2</text>
    <text x="275" y="48" font-family="monospace" font-size="10" fill="#94a3b8" text-anchor="middle">6B (Transmitter)</text>

    <!-- Address 3 -->
    <rect x="320" y="0" width="80" height="65" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="360" y="28" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8" text-anchor="middle">Address 3</text>
    <text x="360" y="48" font-family="monospace" font-size="10" fill="#94a3b8" text-anchor="middle">6B (Filter)</text>

    <!-- Seq Control -->
    <rect x="405" y="0" width="65" height="65" rx="6" fill="#854d0e" stroke="#eab308" stroke-width="2"/>
    <text x="437" y="28" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">Seq Ctrl</text>
    <text x="437" y="48" font-family="monospace" font-size="11" fill="#fde68a" text-anchor="middle">2 Bytes</text>

    <!-- Address 4 -->
    <rect x="475" y="0" width="80" height="65" rx="6" fill="#1e293b" stroke="#a855f7" stroke-width="1.5"/>
    <text x="515" y="28" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#c084fc" text-anchor="middle">Address 4</text>
    <text x="515" y="48" font-family="monospace" font-size="10" fill="#94a3b8" text-anchor="middle">6B (WDS mesh)</text>

    <!-- Frame Body -->
    <rect x="560" y="0" width="215" height="65" rx="6" fill="#047857" stroke="#34d399" stroke-width="2.5"/>
    <text x="667" y="28" font-family="system-ui, sans-serif" font-size="13" font-weight="900" fill="#fff" text-anchor="middle">Frame Body (Payload)</text>
    <text x="667" y="48" font-family="system-ui, sans-serif" font-size="11" fill="#a7f3d0" text-anchor="middle">0 to 2312 Bytes</text>

    <!-- FCS -->
    <rect x="780" y="0" width="60" height="65" rx="6" fill="#991b1b" stroke="#ef4444" stroke-width="2"/>
    <text x="810" y="28" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">FCS</text>
    <text x="810" y="48" font-family="monospace" font-size="11" fill="#fca5a5" text-anchor="middle">4 Bytes</text>
  </g>

  <!-- 4-Address Meaning Matrix -->
  <g transform="translate(30, 185)">
    <rect width="840" height="195" rx="10" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
    <text x="20" y="28" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#f8fafc">Interpretation of the 4 Address Fields (Governed by To DS &amp; From DS Bits in Frame Control):</text>

    <!-- Table Header -->
    <text x="20" y="58" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">To DS</text>
    <text x="80" y="58" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">From DS</text>
    <text x="160" y="58" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">Address 1 (RA)</text>
    <text x="300" y="58" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">Address 2 (TA)</text>
    <text x="440" y="58" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">Address 3 (DA/SA)</text>
    <text x="600" y="58" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">Address 4</text>
    <text x="710" y="58" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">Typical Scenario</text>

    <!-- Row 1: IBSS -->
    <text x="25" y="85" font-family="monospace" font-size="11" fill="#fff">0</text>
    <text x="85" y="85" font-family="monospace" font-size="11" fill="#fff">0</text>
    <text x="160" y="85" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">DA (Destination)</text>
    <text x="300" y="85" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">SA (Source)</text>
    <text x="440" y="85" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">BSSID</text>
    <text x="600" y="85" font-family="system-ui, sans-serif" font-size="11" fill="#64748b">N/A</text>
    <text x="710" y="85" font-family="system-ui, sans-serif" font-size="11" fill="#34d399">Ad-hoc IBSS packet</text>

    <!-- Row 2: To AP -->
    <text x="25" y="112" font-family="monospace" font-size="11" fill="#fff">1</text>
    <text x="85" y="112" font-family="monospace" font-size="11" fill="#fff">0</text>
    <text x="160" y="112" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">BSSID (AP)</text>
    <text x="300" y="112" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">SA (Source STA)</text>
    <text x="440" y="112" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">DA (Final Dest)</text>
    <text x="600" y="112" font-family="system-ui, sans-serif" font-size="11" fill="#64748b">N/A</text>
    <text x="710" y="112" font-family="system-ui, sans-serif" font-size="11" fill="#60a5fa">Station sending to AP</text>

    <!-- Row 3: From AP -->
    <text x="25" y="139" font-family="monospace" font-size="11" fill="#fff">0</text>
    <text x="85" y="139" font-family="monospace" font-size="11" fill="#fff">1</text>
    <text x="160" y="139" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">DA (Dest STA)</text>
    <text x="300" y="139" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">BSSID (AP)</text>
    <text x="440" y="139" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">SA (Original Src)</text>
    <text x="600" y="139" font-family="system-ui, sans-serif" font-size="11" fill="#64748b">N/A</text>
    <text x="710" y="139" font-family="system-ui, sans-serif" font-size="11" fill="#a78bfa">AP sending to Station</text>

    <!-- Row 4: WDS Bridge -->
    <text x="25" y="166" font-family="monospace" font-size="11" fill="#fbbf24">1</text>
    <text x="85" y="166" font-family="monospace" font-size="11" fill="#fbbf24">1</text>
    <text x="160" y="166" font-family="system-ui, sans-serif" font-size="11" fill="#fef08a">RA (Recv AP)</text>
    <text x="300" y="166" font-family="system-ui, sans-serif" font-size="11" fill="#fef08a">TA (Trans AP)</text>
    <text x="440" y="166" font-family="system-ui, sans-serif" font-size="11" fill="#fef08a">DA (Final Dest)</text>
    <text x="600" y="166" font-family="system-ui, sans-serif" font-size="11" fill="#fef08a">SA (Orig Src)</text>
    <text x="710" y="166" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fbbf24">AP-to-AP Bridge (WDS)</text>
  </g>
</svg>`);

// 10. DCF vs PCF Architectural Comparison
writeSvg('dcf-vs-pcf-architectural-comparison.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
  </defs>
  <rect width="850" height="400" rx="16" fill="url(#bg)"/>
  <text x="425" y="40" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Architectural Comparison: DCF vs. PCF</text>
  <text x="425" y="64" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Contention-Based CSMA/CA Best-Effort vs. Centrally Polled Contention-Free Time-Bounded QoS</text>

  <!-- Side-by-Side Comparison -->
  <g transform="translate(50, 95)">
    <rect width="360" height="275" rx="12" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="180" y="32" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#38bdf8" text-anchor="middle">DCF (Distributed Coordination)</text>

    <text x="20" y="65" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Access Scheme: <tspan fill="#38bdf8">Random CSMA/CA</tspan></text>
    <text x="20" y="90" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Medium Sense Timing: <tspan fill="#38bdf8">DIFS (50 µs)</tspan></text>
    <text x="20" y="115" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Contention: <tspan fill="#fbbf24">Exponential Backoff (CW)</tspan></text>
    <text x="20" y="140" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Hardware: <tspan fill="#cbd5e1">Ad-Hoc (IBSS) &amp; Infrastructure</tspan></text>
    <text x="20" y="165" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• QoS Guarantee: <tspan fill="#ef4444">None (Best-Effort)</tspan></text>
    <text x="20" y="190" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Target Traffic: <tspan fill="#cbd5e1">Web, File Transfers, Emails</tspan></text>
    <text x="20" y="215" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Implementation: <tspan fill="#34d399">Universal (Mandatory)</tspan></text>
    <text x="20" y="245" font-family="system-ui, sans-serif" font-size="11" fill="#94a3b8">Stations independently compete for transmission rights.</text>
  </g>

  <g transform="translate(440, 95)">
    <rect width="360" height="275" rx="12" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="180" y="32" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#34d399" text-anchor="middle">PCF (Point Coordination)</text>

    <text x="20" y="65" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Access Scheme: <tspan fill="#34d399">Centralized Round-Robin</tspan></text>
    <text x="20" y="90" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Medium Sense Timing: <tspan fill="#34d399">PIFS (30 µs - Priority)</tspan></text>
    <text x="20" y="115" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Contention: <tspan fill="#34d399">Zero (NAV Locks Out DCF)</tspan></text>
    <text x="20" y="140" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Hardware: <tspan fill="#cbd5e1">Infrastructure AP Only</tspan></text>
    <text x="20" y="165" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• QoS Guarantee: <tspan fill="#34d399">Bounded Latency &amp; Jitter</tspan></text>
    <text x="20" y="190" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Target Traffic: <tspan fill="#cbd5e1">VoIP, Real-Time Video, Audio</tspan></text>
    <text x="20" y="215" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Implementation: <tspan fill="#fbbf24">Rare / Replaced by 802.11e EDCA</tspan></text>
    <text x="20" y="245" font-family="system-ui, sans-serif" font-size="11" fill="#94a3b8">Access Point commands polling order during superframe.</text>
  </g>
</svg>`);

console.log('All 10 Topic 8 SVGs generated successfully!');

