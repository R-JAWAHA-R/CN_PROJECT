const fs = require('fs');
const path = require('path');

function writeSvg(relPath, content) {
  const fullPath = path.join(__dirname, '..', relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim(), 'utf8');
  console.log(`Created: ${relPath}`);
}

// 9. Topic 4: TCP Segment Header Format (RFC 9293)
writeSvg('assets/images/unit4/topic4-tcp/tcp-segment-header-format.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 540">
  <defs>
    <style>
      text { font-family: 'Segoe UI', Arial, sans-serif; }
      .title { font-size: 19px; font-weight: bold; fill: #1e293b; }
      .sub { font-size: 12.5px; fill: #64748b; }
      .fld-title { font-size: 12px; font-weight: bold; fill: #ffffff; text-anchor: middle; }
      .fld-sub { font-size: 9px; fill: #ffffff; opacity: 0.9; text-anchor: middle; }
      .flag-t { font-size: 9px; font-weight: bold; fill: #ffffff; text-anchor: middle; }
      .bit-h { font-size: 9.5px; font-weight: bold; fill: #64748b; }
    </style>
  </defs>

  <rect width="840" height="540" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>

  <text x="420" y="28" text-anchor="middle" class="title">Transmission Control Protocol (TCP): Segment Header Format</text>
  <text x="420" y="46" text-anchor="middle" class="sub">RFC 9293 / Forouzan Figure 23.16 — 20 to 60 Bytes Variable Header Structure</text>

  <!-- Bit Ruler -->
  <g transform="translate(40, 60)">
    <rect width="760" height="20" rx="4" fill="#e2e8f0"/>
    <text x="10" y="14" class="bit-h">Bit 0</text>
    <text x="180" y="14" class="bit-h">Bit 7</text>
    <text x="375" y="14" class="bit-h">Bit 15 | Bit 16</text>
    <text x="560" y="14" class="bit-h">Bit 23</text>
    <text x="735" y="14" class="bit-h">Bit 31</text>
  </g>

  <!-- Row 1: Source Port (16) & Dest Port (16) -->
  <g transform="translate(40, 85)">
    <rect x="0" y="0" width="375" height="50" rx="5" fill="#2563eb" stroke="#1d4ed8"/>
    <text x="187" y="24" class="fld-title">Source Port Number (16 Bits)</text>
    <text x="187" y="38" class="fld-sub">Calling process port (e.g., ephemeral 52140)</text>

    <rect x="385" y="0" width="375" height="50" rx="5" fill="#0891b2" stroke="#0e7490"/>
    <text x="572" y="24" class="fld-title">Destination Port Number (16 Bits)</text>
    <text x="572" y="38" class="fld-sub">Receiving service port (e.g., HTTP 80, HTTPS 443)</text>
  </g>

  <!-- Row 2: Sequence Number (32 bits) -->
  <g transform="translate(40, 140)">
    <rect x="0" y="0" width="760" height="50" rx="5" fill="#4f46e5" stroke="#4338ca"/>
    <text x="380" y="24" class="fld-title">Sequence Number (32 Bits)</text>
    <text x="380" y="38" class="fld-sub">Byte offset of the first data byte in this segment (or ISN during SYN)</text>
  </g>

  <!-- Row 3: Acknowledgment Number (32 bits) -->
  <g transform="translate(40, 195)">
    <rect x="0" y="0" width="760" height="50" rx="5" fill="#059669" stroke="#047857"/>
    <text x="380" y="24" class="fld-title">Acknowledgment Number (32 Bits) — Cumulative ACK</text>
    <text x="380" y="38" class="fld-sub">Next expected byte number from sender (Valid only when ACK flag = 1)</text>
  </g>

  <!-- Row 4: HLEN (4), Reserved (6), 6 Control Flags (6), Window Size (16) -->
  <g transform="translate(40, 250)">
    <!-- HLEN -->
    <rect x="0" y="0" width="95" height="55" rx="4" fill="#d97706" stroke="#b45309"/>
    <text x="47" y="24" class="fld-title" font-size="11">Data Offset</text>
    <text x="47" y="36" class="fld-sub">(HLEN, 4b)</text>
    <text x="47" y="47" class="fld-sub">4-byte words</text>

    <!-- Reserved -->
    <rect x="100" y="0" width="90" height="55" rx="4" fill="#64748b" stroke="#475569"/>
    <text x="145" y="24" class="fld-title" font-size="11">Reserved</text>
    <text x="145" y="38" class="fld-sub">(6 Bits)</text>
    <text x="145" y="48" class="fld-sub">Must be 0</text>

    <!-- 6 Control Flags: URG, ACK, PSH, RST, SYN, FIN (each ~30px) -->
    <g transform="translate(195, 0)">
      <rect x="0" y="0" width="30" height="55" fill="#7c3aed" stroke="#6d28d9"/>
      <text x="15" y="28" class="flag-t">U</text><text x="15" y="42" font-size="7" fill="#ddd6fe" text-anchor="middle">URG</text>

      <rect x="32" y="0" width="30" height="55" fill="#059669" stroke="#047857"/>
      <text x="47" y="28" class="flag-t">A</text><text x="47" y="42" font-size="7" fill="#a7f3d0" text-anchor="middle">ACK</text>

      <rect x="64" y="0" width="30" height="55" fill="#2563eb" stroke="#1d4ed8"/>
      <text x="79" y="28" class="flag-t">P</text><text x="79" y="42" font-size="7" fill="#bfdbfe" text-anchor="middle">PSH</text>

      <rect x="96" y="0" width="30" height="55" fill="#dc2626" stroke="#b91c1c"/>
      <text x="111" y="28" class="flag-t">R</text><text x="111" y="42" font-size="7" fill="#fecaca" text-anchor="middle">RST</text>

      <rect x="128" y="0" width="30" height="55" fill="#ea580c" stroke="#c2410c"/>
      <text x="143" y="28" class="flag-t">S</text><text x="143" y="42" font-size="7" fill="#fed7aa" text-anchor="middle">SYN</text>

      <rect x="160" y="0" width="30" height="55" fill="#e11d48" stroke="#be123c"/>
      <text x="175" y="28" class="flag-t">F</text><text x="175" y="42" font-size="7" fill="#fecdd3" text-anchor="middle">FIN</text>
    </g>

    <!-- Window Size -->
    <rect x="390" y="0" width="370" height="55" rx="4" fill="#0d9488" stroke="#0f766e"/>
    <text x="575" y="24" class="fld-title">Window Size (16 Bits) — Advertised Receive Window (rwnd)</text>
    <text x="575" y="38" class="fld-sub">Receiver buffer credit (bytes). Multiplied by 2^scale when Window Scale option is active</text>
  </g>

  <!-- Row 5: Checksum (16) & Urgent Pointer (16) -->
  <g transform="translate(40, 310)">
    <rect x="0" y="0" width="375" height="50" rx="5" fill="#7c3aed" stroke="#6d28d9"/>
    <text x="187" y="24" class="fld-title">Checksum (16 Bits) — Mandatory</text>
    <text x="187" y="38" class="fld-sub">1's complement sum over pseudo-header, TCP header &amp; data</text>

    <rect x="385" y="0" width="375" height="50" rx="5" fill="#be185d" stroke="#9d174d"/>
    <text x="572" y="24" class="fld-title">Urgent Pointer (16 Bits)</text>
    <text x="572" y="38" class="fld-sub">Points to last byte of out-of-band urgent data (Valid only if URG=1)</text>
  </g>

  <!-- Row 6: Options & Padding (0 to 40 Bytes) -->
  <g transform="translate(40, 365)">
    <rect x="0" y="0" width="760" height="45" rx="5" fill="#f1f5f9" stroke="#94a3b8" stroke-dasharray="6,3"/>
    <text x="380" y="22" font-size="12" font-weight="bold" fill="#334155" text-anchor="middle">Options &amp; Padding (0 to 40 Bytes, padded to 32-bit boundary)</text>
    <text x="380" y="36" font-size="9" fill="#64748b" text-anchor="middle">MSS (Maximum Segment Size), Window Scale (RFC 7323), SACK Permitted (RFC 2018), Timestamps / PAWS</text>
  </g>

  <!-- Flags Explanatory Legend -->
  <g transform="translate(40, 420)">
    <rect width="760" height="105" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="20" y="20" font-size="11.5" font-weight="bold" fill="#0f172a">Summary of the 6 Fundamental Control Flags:</text>
    <g transform="translate(20, 32)">
      <text x="0" y="12" font-size="9.5" fill="#334155"><tspan font-weight="bold" fill="#7c3aed">• URG (Urgent):</tspan> Urgent pointer field is valid; prioritize immediate processing.</text>
      <text x="0" y="26" font-size="9.5" fill="#334155"><tspan font-weight="bold" fill="#059669">• ACK (Acknowledge):</tspan> Acknowledgment field is valid; set in all packets after initial SYN.</text>
      <text x="0" y="40" font-size="9.5" fill="#334155"><tspan font-weight="bold" fill="#2563eb">• PSH (Push):</tspan> Request receiver to push buffered data immediately to application without waiting.</text>
      <text x="0" y="54" font-size="9.5" fill="#334155"><tspan font-weight="bold" fill="#dc2626">• RST (Reset):</tspan> Abort and reset connection immediately (reject invalid segment or crashed host).</text>
      <text x="400" y="12" font-size="9.5" fill="#334155"><tspan font-weight="bold" fill="#ea580c">• SYN (Synchronize):</tspan> Synchronize sequence numbers during connection establishment.</text>
      <text x="400" y="26" font-size="9.5" fill="#334155"><tspan font-weight="bold" fill="#e11d48">• FIN (Finish):</tspan> Sender has no more data to transmit; initiate graceful connection release.</text>
    </g>
  </g>
</svg>
`);

// 10. Topic 4: TCP Timer Management
writeSvg('assets/images/unit4/topic4-tcp/tcp-timer-management.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 500">
  <defs>
    <style>
      text { font-family: 'Segoe UI', Arial, sans-serif; }
      .title { font-size: 19px; font-weight: bold; fill: #1e293b; }
      .sub { font-size: 12.5px; fill: #64748b; }
      .card-t { font-size: 13px; font-weight: bold; fill: #ffffff; }
      .lbl { font-size: 10.5px; fill: #334155; }
      .formula { font-family: 'Courier New', monospace; font-size: 10px; font-weight: bold; }
    </style>
  </defs>

  <rect width="840" height="500" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>

  <text x="420" y="30" text-anchor="middle" class="title">TCP Timer Management: The Four Core Timers</text>
  <text x="420" y="48" text-anchor="middle" class="sub">Forouzan Section 23.3 / RFC 6298 — Jacobson's RTO, Persistence Probe, Keepalive &amp; 2MSL TIME-WAIT</text>

  <!-- 4 Cards in 2x2 Grid -->
  <!-- Timer 1: Retransmission Timer (RTO) -->
  <g transform="translate(40, 70)">
    <rect width="365" height="195" rx="8" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1.5"/>
    <rect width="365" height="32" rx="8" fill="#2563eb"/>
    <text x="182" y="21" text-anchor="middle" class="card-t">1. Retransmission Timer (RTO)</text>
    <text x="15" y="50" font-size="11" font-weight="bold" fill="#1e40af">Purpose: Detect lost segments and trigger retransmission</text>
    <text x="15" y="68" class="lbl">• Dynamic calculation using Jacobson's Algorithm (RFC 6298):</text>
    <rect x="15" y="78" width="335" height="52" rx="4" fill="#ffffff" stroke="#dbeafe"/>
    <text x="25" y="93" class="formula" fill="#1e3a8a">SRTT = (1 - α)·SRTT + α·RTT      (α = 1/8)</text>
    <text x="25" y="108" class="formula" fill="#1e3a8a">RTTVAR = (1 - β)·RTTVAR + β·|SRTT - RTT| (β = 1/4)</text>
    <text x="25" y="122" class="formula" fill="#1e3a8a">RTO = SRTT + 4 × RTTVAR          (Min: 1.0s)</text>
    <text x="15" y="145" class="lbl">• <tspan font-weight="bold">Karn's Algorithm:</tspan> Never measure RTT for retransmitted packets.</text>
    <text x="15" y="160" class="lbl">• <tspan font-weight="bold">Exponential Backoff:</tspan> On timeout, double RTO (RTO = 2 × RTO).</text>
  </g>

  <!-- Timer 2: Persistence Timer -->
  <g transform="translate(435, 70)">
    <rect width="365" height="195" rx="8" fill="#fefce8" stroke="#fef08a" stroke-width="1.5"/>
    <rect width="365" height="32" rx="8" fill="#ca8a04"/>
    <text x="182" y="21" text-anchor="middle" class="card-t">2. Persistence Timer</text>
    <text x="15" y="50" font-size="11" font-weight="bold" fill="#854d0e">Purpose: Prevent Zero-Window Deadlock</text>
    <text x="15" y="68" class="lbl">• Problem: Receiver advertises rwnd = 0. Later, receiver buffer frees up and sends rwnd = 2000, but this ACK is LOST!</text>
    <text x="15" y="92" class="lbl">• Result without timer: Deadlock! Sender waits for window update, receiver waits for incoming data forever.</text>
    <rect x="15" y="108" width="335" height="42" rx="4" fill="#ffffff" stroke="#fef9c3"/>
    <text x="25" y="124" class="formula" fill="#713f12">• Action: Sender periodically transmits a 1-byte</text>
    <text x="25" y="138" class="formula" fill="#713f12">  Zero-Window Probe (ZWP) segment.</text>
    <text x="15" y="165" class="lbl">• Receiver responds with current rwnd, breaking the deadlock!</text>
    <text x="15" y="180" class="lbl">• Interval: Uses exponential backoff (typically 5s up to 60s).</text>
  </g>

  <!-- Timer 3: Keepalive Timer -->
  <g transform="translate(40, 280)">
    <rect width="365" height="195" rx="8" fill="#ecfdf5" stroke="#a7f3d0" stroke-width="1.5"/>
    <rect width="365" height="32" rx="8" fill="#059669"/>
    <text x="182" y="21" text-anchor="middle" class="card-t">3. Keepalive Timer</text>
    <text x="15" y="50" font-size="11" font-weight="bold" fill="#065f46">Purpose: Detect crashed or unreachable peer on idle line</text>
    <text x="15" y="68" class="lbl">• Prevents servers from holding resources for defunct clients.</text>
    <text x="15" y="84" class="lbl">• Default duration: Typically <tspan font-weight="bold">2 hours</tspan> of complete silence.</text>
    <rect x="15" y="95" width="335" height="48" rx="4" fill="#ffffff" stroke="#d1fae5"/>
    <text x="25" y="112" class="formula" fill="#047857">• Sends 9 probe segments, spaced 75 seconds apart.</text>
    <text x="25" y="126" class="formula" fill="#047857">• If no response after all probes: RST connection</text>
    <text x="25" y="138" class="formula" fill="#047857">  and free server socket memory.</text>
    <text x="15" y="160" class="lbl">• Optional in base TCP; enabled via SO_KEEPALIVE socket option.</text>
    <text x="15" y="175" class="lbl">• Used widely in long-lived database connections and proxies.</text>
  </g>

  <!-- Timer 4: TIME-WAIT (2MSL) Timer -->
  <g transform="translate(435, 280)">
    <rect width="365" height="195" rx="8" fill="#faf5ff" stroke="#e9d5ff" stroke-width="1.5"/>
    <rect width="365" height="32" rx="8" fill="#7c3aed"/>
    <text x="182" y="21" text-anchor="middle" class="card-t">4. TIME-WAIT (2MSL) Timer</text>
    <text x="15" y="50" font-size="11" font-weight="bold" fill="#581c87">Purpose: Graceful connection teardown &amp; packet draining</text>
    <text x="15" y="68" class="lbl">• Runs on active-close endpoint after sending final ACK to FIN.</text>
    <text x="15" y="84" class="lbl">• Duration: 2 × Maximum Segment Lifetime (<tspan font-weight="bold">2MSL</tspan> = 1 to 2 mins).</text>
    <rect x="15" y="95" width="335" height="48" rx="4" fill="#ffffff" stroke="#f3e8ff"/>
    <text x="25" y="112" class="formula" fill="#581c87">Reason 1: Ensure final ACK reached server.</text>
    <text x="25" y="126" class="formula" fill="#581c87">If ACK lost, server resends FIN; client re-ACKs.</text>
    <text x="25" y="138" class="formula" fill="#581c87">Reason 2: Drain lingering packets from network routes.</text>
    <text x="15" y="160" class="lbl">• Prevents duplicate packets of old connection from interfering with</text>
    <text x="15" y="175" class="lbl">  a new connection on the same IP:Port socket pair.</text>
  </g>
</svg>
`);

// 11. Topic 5: Congestion Performance Curves (Throughput & Delay)
writeSvg('assets/images/unit4/topic5-congestion-control/congestion-performance-curves.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 500">
  <defs>
    <style>
      text { font-family: 'Segoe UI', Arial, sans-serif; }
      .title { font-size: 19px; font-weight: bold; fill: #1e293b; }
      .sub { font-size: 12.5px; fill: #64748b; }
      .axis-lbl { font-size: 11px; font-weight: bold; fill: #334155; }
      .curve-lbl { font-size: 10px; font-weight: bold; }
    </style>
  </defs>

  <rect width="840" height="500" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>

  <text x="420" y="30" text-anchor="middle" class="title">Network Performance Under Congestion: The 3 Operating Regions</text>
  <text x="420" y="48" text-anchor="middle" class="sub">Forouzan Figure 24.5 &amp; 24.6 — Throughput &amp; Delay Curves vs. Offered Load</text>

  <!-- Left Graph: Throughput vs Load -->
  <g transform="translate(60, 80)">
    <rect width="340" height="260" rx="6" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="170" y="24" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">Throughput vs. Offered Load</text>

    <!-- Axes -->
    <line x1="40" y1="220" x2="310" y2="220" stroke="#334155" stroke-width="2"/>
    <line x1="40" y1="220" x2="40" y2="40" stroke="#334155" stroke-width="2"/>
    <text x="310" y="238" text-anchor="end" class="axis-lbl">Offered Load →</text>
    <text x="30" y="35" text-anchor="middle" class="axis-lbl" transform="rotate(-90 30,35)">Throughput →</text>

    <!-- Region Shading -->
    <!-- Region 1: 40 to 140 -->
    <rect x="40" y="40" width="100" height="180" fill="#ecfdf5" opacity="0.5"/>
    <text x="90" y="60" text-anchor="middle" font-size="9" font-weight="bold" fill="#065f46">Region 1</text>
    <text x="90" y="72" text-anchor="middle" font-size="7.5" fill="#047857">Optimal</text>

    <!-- Region 2: 140 to 220 -->
    <rect x="140" y="40" width="80" height="180" fill="#fefce8" opacity="0.5"/>
    <text x="180" y="60" text-anchor="middle" font-size="9" font-weight="bold" fill="#854d0e">Region 2</text>
    <text x="180" y="72" text-anchor="middle" font-size="7.5" fill="#a16207">Congested</text>

    <!-- Region 3: 220 to 310 -->
    <rect x="220" y="40" width="90" height="180" fill="#fef2f2" opacity="0.5"/>
    <text x="265" y="60" text-anchor="middle" font-size="9" font-weight="bold" fill="#991b1b">Region 3</text>
    <text x="265" y="72" text-anchor="middle" font-size="7.5" fill="#b91c1c">Collapse!</text>

    <!-- Capacity Line -->
    <line x1="180" y1="40" x2="180" y2="220" stroke="#64748b" stroke-dasharray="4,3"/>
    <text x="180" y="235" text-anchor="middle" font-size="8.5" font-weight="bold" fill="#64748b">Capacity</text>

    <!-- Ideal Curve -->
    <line x1="40" y1="220" x2="180" y2="80" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,2"/>
    <line x1="180" y1="80" x2="310" y2="80" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,2"/>
    <text x="250" y="75" font-size="8" fill="#64748b">Ideal Performance</text>

    <!-- Actual Throughput Curve with Congestion Collapse -->
    <path d="M 40 220 Q 120 120 180 90 Q 220 100 240 130 Q 280 200 310 215" fill="none" stroke="#dc2626" stroke-width="2.5"/>
    <text x="270" y="170" class="curve-lbl" fill="#b91c1c">Congestion Collapse</text>
    <text x="270" y="182" font-size="7.5" fill="#dc2626">(Retransmissions flood network)</text>
  </g>

  <!-- Right Graph: Delay vs Load -->
  <g transform="translate(440, 80)">
    <rect width="340" height="260" rx="6" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="170" y="24" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">Packet Delay vs. Offered Load</text>

    <!-- Axes -->
    <line x1="40" y1="220" x2="310" y2="220" stroke="#334155" stroke-width="2"/>
    <line x1="40" y1="220" x2="40" y2="40" stroke="#334155" stroke-width="2"/>
    <text x="310" y="238" text-anchor="end" class="axis-lbl">Offered Load →</text>
    <text x="30" y="35" text-anchor="middle" class="axis-lbl" transform="rotate(-90 30,35)">Queue Delay →</text>

    <!-- Region Shading -->
    <rect x="40" y="40" width="100" height="180" fill="#ecfdf5" opacity="0.5"/>
    <rect x="140" y="40" width="80" height="180" fill="#fefce8" opacity="0.5"/>
    <rect x="220" y="40" width="90" height="180" fill="#fef2f2" opacity="0.5"/>

    <line x1="180" y1="40" x2="180" y2="220" stroke="#64748b" stroke-dasharray="4,3"/>
    <text x="180" y="235" text-anchor="middle" font-size="8.5" font-weight="bold" fill="#64748b">Capacity</text>

    <!-- Minimum propagation delay line -->
    <line x1="40" y1="200" x2="310" y2="200" stroke="#94a3b8" stroke-dasharray="3,3"/>
    <text x="90" y="195" font-size="8" fill="#64748b">Min Propagation Delay</text>

    <!-- Delay Curve (Asymptotic spike) -->
    <path d="M 40 200 Q 140 195 170 170 Q 185 130 195 40" fill="none" stroke="#2563eb" stroke-width="2.5"/>
    <text x="210" y="55" class="curve-lbl" fill="#1d4ed8">Delay → ∞ (Asymptote)</text>
    <text x="210" y="68" font-size="7.5" fill="#2563eb">Buffer queues overflow</text>
  </g>

  <!-- Detailed Region Breakdown at Bottom -->
  <g transform="translate(40, 360)">
    <rect width="760" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
    
    <g transform="translate(15, 15)">
      <rect width="230" height="90" rx="6" fill="#ecfdf5" stroke="#a7f3d0"/>
      <text x="15" y="20" font-size="11" font-weight="bold" fill="#065f46">Region 1: Light Load (Optimal)</text>
      <text x="15" y="38" font-size="9.5" fill="#047857">• Offered load &lt; Capacity.</text>
      <text x="15" y="52" font-size="9.5" fill="#047857">• Throughput = Offered Load.</text>
      <text x="15" y="66" font-size="9.5" fill="#047857">• Delay is minimal (propagation only).</text>
      <text x="15" y="80" font-size="9.5" fill="#047857">• No packet drops or retransmits.</text>
    </g>

    <g transform="translate(265, 15)">
      <rect width="230" height="90" rx="6" fill="#fefce8" stroke="#fef08a"/>
      <text x="15" y="20" font-size="11" font-weight="bold" fill="#854d0e">Region 2: Moderate Load (Knee)</text>
      <text x="15" y="38" font-size="9.5" fill="#a16207">• Load approaches network capacity.</text>
      <text x="15" y="52" font-size="9.5" fill="#a16207">• Router queue buffers start filling.</text>
      <text x="15" y="66" font-size="9.5" fill="#a16207">• Delay surges exponentially.</text>
      <text x="15" y="80" font-size="9.5" fill="#a16207">• Optimal target for congestion control!</text>
    </g>

    <g transform="translate(515, 15)">
      <rect width="230" height="90" rx="6" fill="#fef2f2" stroke="#fecaca"/>
      <text x="15" y="20" font-size="11" font-weight="bold" fill="#991b1b">Region 3: Congestion Collapse</text>
      <text x="15" y="38" font-size="9.5" fill="#b91c1c">• Offered load &gt; Network capacity.</text>
      <text x="15" y="52" font-size="9.5" fill="#b91c1c">• Buffers overflow; routers drop packets.</text>
      <text x="15" y="66" font-size="9.5" fill="#b91c1c">• Transports retransmit duplicate data.</text>
      <text x="15" y="80" font-size="9.5" fill="#b91c1c">• Useful throughput collapses to zero!</text>
    </g>
  </g>
</svg>
`);

// 12. Topic 5: TCP Congestion Control AIMD (Slow Start, Avoidance, Fast Recovery)
writeSvg('assets/images/unit4/topic5-congestion-control/tcp-congestion-control-aimd.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 520">
  <defs>
    <style>
      text { font-family: 'Segoe UI', Arial, sans-serif; }
      .title { font-size: 19px; font-weight: bold; fill: #1e293b; }
      .sub { font-size: 12.5px; fill: #64748b; }
      .axis-l { font-size: 11px; font-weight: bold; fill: #334155; }
      .annot { font-size: 9.5px; font-weight: bold; }
    </style>
  </defs>

  <rect width="840" height="520" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>

  <text x="420" y="30" text-anchor="middle" class="title">TCP Congestion Control State Machine &amp; AIMD Sawtooth</text>
  <text x="420" y="48" text-anchor="middle" class="sub">RFC 5681 / Forouzan Figure 24.11 &amp; 24.12 — Slow Start, Congestion Avoidance, Fast Retransmit &amp; Fast Recovery (Reno vs. Tahoe)</text>

  <!-- Main Graph Canvas -->
  <g transform="translate(60, 75)">
    <rect width="720" height="280" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>

    <!-- Grid lines -->
    <line x1="60" y1="240" x2="700" y2="240" stroke="#cbd5e1" stroke-width="1.5"/>
    <line x1="60" y1="240" x2="60" y2="30" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="700" y="258" text-anchor="end" class="axis-l">Transmission Rounds (RTT) →</text>
    <text x="50" y="25" text-anchor="middle" class="axis-l" transform="rotate(-90 50,25)">cwnd (MSS) →</text>

    <!-- Horizontal threshold lines -->
    <line x1="60" y1="120" x2="700" y2="120" stroke="#ca8a04" stroke-width="1.5" stroke-dasharray="5,4"/>
    <text x="70" y="115" font-size="9" font-weight="bold" fill="#a16207">ssthresh = 16 MSS (Initial)</text>

    <!-- Phase 1: Slow Start (RTT 0 to 4) Exponential -->
    <!-- 1 -> 2 -> 4 -> 8 -> 16 -->
    <path d="M 60 235 Q 110 230 140 210 Q 180 180 200 120" fill="none" stroke="#2563eb" stroke-width="3"/>
    <text x="120" y="200" class="annot" fill="#1d4ed8">Slow Start</text>
    <text x="120" y="212" font-size="8" fill="#2563eb">(cwnd doubles every RTT)</text>

    <!-- Phase 2: Congestion Avoidance (RTT 4 to 8) Linear -->
    <!-- 16 -> 17 -> 18 -> 19 -> 20 -->
    <line x1="200" y1="120" x2="340" y2="70" stroke="#16a34a" stroke-width="3"/>
    <text x="240" y="80" class="annot" fill="#15803d">Congestion Avoidance</text>
    <text x="240" y="92" font-size="8" fill="#166534">(+1 MSS per RTT: Additive Increase)</text>

    <!-- Loss Event 1: 3 Duplicate ACKs at cwnd=20 (Mild Loss) -->
    <circle cx="340" cy="70" r="5" fill="#dc2626"/>
    <text x="340" y="55" text-anchor="middle" font-size="9" font-weight="bold" fill="#dc2626">⚡ 3 Dup ACKs</text>

    <!-- Tahoe drops to 1; Reno cuts to half (Fast Recovery) -->
    <!-- Reno Path (Green/Teal) -->
    <line x1="340" y1="70" x2="360" y2="145" stroke="#0d9488" stroke-width="2.5" stroke-dasharray="4,2"/>
    <text x="400" y="135" class="annot" fill="#0f766e">TCP Reno (Fast Recovery)</text>
    <text x="400" y="147" font-size="8" fill="#0d9488">ssthresh = cwnd/2 = 10; cwnd = 10</text>
    <line x1="360" y1="145" x2="520" y2="90" stroke="#16a34a" stroke-width="3"/>
    <text x="440" y="105" font-size="8" fill="#166534">Linear Avoidance resumed!</text>

    <!-- Tahoe Path (Red dotted) -->
    <line x1="340" y1="70" x2="350" y2="235" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3,3"/>
    <text x="360" y="230" font-size="8" fill="#dc2626">TCP Tahoe (drops to 1 MSS)</text>

    <!-- Loss Event 2: Timeout at cwnd=22 (Severe Congestion) -->
    <circle cx="520" cy="90" r="5" fill="#b91c1c"/>
    <text x="520" y="75" text-anchor="middle" font-size="9" font-weight="bold" fill="#b91c1c">❌ RTO Timeout</text>

    <!-- Both Tahoe & Reno drop to 1 on Timeout! -->
    <line x1="520" y1="90" x2="535" y2="235" stroke="#dc2626" stroke-width="2.5"/>
    <text x="545" y="225" font-size="8.5" font-weight="bold" fill="#b91c1c">Reset cwnd = 1 MSS</text>
    <text x="545" y="238" font-size="7.5" fill="#7f1d1d">ssthresh = 22/2 = 11 MSS</text>

    <!-- Phase 3: Slow start up to new ssthresh (11) then linear -->
    <path d="M 535 235 Q 570 230 590 200 Q 610 160 620 140" fill="none" stroke="#2563eb" stroke-width="3"/>
    <text x="570" y="180" font-size="8" fill="#1d4ed8">Slow Start</text>
    <line x1="620" y1="140" x2="690" y2="115" stroke="#16a34a" stroke-width="3"/>
    <text x="655" y="125" font-size="8" fill="#15803d">Avoidance</text>
  </g>

  <!-- Algorithm Comparison Table Bottom -->
  <g transform="translate(40, 370)">
    <rect width="760" height="135" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
    
    <g transform="translate(15, 12)">
      <text x="0" y="16" font-size="12" font-weight="bold" fill="#0f172a">The 4 Intertwined Algorithms of TCP Congestion Control (RFC 5681):</text>

      <rect x="0" y="26" width="175" height="85" rx="5" fill="#eff6ff" stroke="#bfdbfe"/>
      <text x="10" y="42" font-size="10" font-weight="bold" fill="#1d4ed8">1. Slow Start</text>
      <text x="10" y="58" font-size="8.5" fill="#1e40af">• Start: cwnd = 1 MSS</text>
      <text x="10" y="72" font-size="8.5" fill="#1e40af">• cwnd = cwnd + 1 per ACK</text>
      <text x="10" y="86" font-size="8.5" fill="#1e40af">• Doubles each RTT (2^n)</text>
      <text x="10" y="100" font-size="8.5" fill="#1e40af">• Ends when cwnd ≥ ssthresh</text>

      <rect x="185" y="26" width="175" height="85" rx="5" fill="#f0fdf4" stroke="#bbf7d0"/>
      <text x="195" y="42" font-size="10" font-weight="bold" fill="#15803d">2. Congestion Avoidance</text>
      <text x="195" y="58" font-size="8.5" fill="#166534">• Starts when cwnd ≥ ssthresh</text>
      <text x="195" y="72" font-size="8.5" fill="#166534">• cwnd = cwnd + 1/cwnd per ACK</text>
      <text x="195" y="86" font-size="8.5" fill="#166534">• Linear: +1 MSS per RTT</text>
      <text x="195" y="100" font-size="8.5" fill="#166534">• Gently probes bandwidth</text>

      <rect x="370" y="26" width="175" height="85" rx="5" fill="#fef2f2" stroke="#fecaca"/>
      <text x="380" y="42" font-size="10" font-weight="bold" fill="#b91c1c">3. Fast Retransmit</text>
      <text x="380" y="58" font-size="8.5" fill="#991b1b">• Trigger: 3 Duplicate ACKs</text>
      <text x="380" y="72" font-size="8.5" fill="#991b1b">• Immediately retransmits lost</text>
      <text x="380" y="86" font-size="8.5" fill="#991b1b">  segment without waiting</text>
      <text x="380" y="100" font-size="8.5" fill="#991b1b">  for RTO timer expiry!</text>

      <rect x="555" y="26" width="175" height="85" rx="5" fill="#ecfeff" stroke="#a5f3fc"/>
      <text x="565" y="42" font-size="10" font-weight="bold" fill="#0e7490">4. Fast Recovery (Reno)</text>
      <text x="565" y="58" font-size="8.5" fill="#155e75">• ssthresh = cwnd / 2</text>
      <text x="565" y="72" font-size="8.5" fill="#155e75">• cwnd = ssthresh (no drop to 1!)</text>
      <text x="565" y="86" font-size="8.5" fill="#155e75">• Resumes linear avoidance</text>
      <text x="565" y="100" font-size="8.5" fill="#155e75">• Creates classic AIMD sawtooth</text>
    </g>
  </g>
</svg>
`);

console.log("Batch 3 SVGs created successfully!");

