const fs = require('fs');
const path = require('path');

function writeSvg(relPath, content) {
  const fullPath = path.join(__dirname, '..', relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim(), 'utf8');
  console.log(`Created: ${relPath}`);
}

// 5. Topic 2: Connection Release & 4-Way Handshake
writeSvg('assets/images/unit4/topic2-elements-protocols/connection-release-termination.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 520">
  <defs>
    <style>
      text { font-family: 'Segoe UI', Arial, sans-serif; }
      .title { font-size: 19px; font-weight: bold; fill: #1e293b; }
      .sub { font-size: 12.5px; fill: #64748b; }
      .node-hdr { font-size: 14px; font-weight: bold; fill: #ffffff; }
      .param { font-family: 'Courier New', monospace; font-size: 10px; font-weight: bold; }
      .step-lbl { font-size: 11px; font-weight: bold; }
    </style>
    <marker id="arr-r" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 9 5 L 0 9 z" fill="#dc2626"/>
    </marker>
    <marker id="arr-b" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 9 5 L 0 9 z" fill="#2563eb"/>
    </marker>
  </defs>

  <rect width="840" height="520" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>

  <text x="420" y="30" text-anchor="middle" class="title">TCP Symmetric Connection Release (Four-Way Handshake)</text>
  <text x="420" y="48" text-anchor="middle" class="sub">Forouzan Figure 23.21 — Independent Direction Termination, Half-Close, and TIME-WAIT (2MSL) State</text>

  <!-- Lifelines -->
  <rect x="80" y="65" width="200" height="35" rx="6" fill="#2563eb"/>
  <text x="180" y="87" text-anchor="middle" class="node-hdr">💻 Client (Initiator)</text>
  <line x1="180" y1="100" x2="180" y2="445" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="4,4"/>

  <rect x="560" y="65" width="200" height="35" rx="6" fill="#1e293b"/>
  <text x="660" y="87" text-anchor="middle" class="node-hdr">🖥️ Server (Receiver)</text>
  <line x1="660" y1="100" x2="660" y2="445" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="4,4"/>

  <!-- Both start in ESTABLISHED -->
  <rect x="110" y="110" width="140" height="24" rx="4" fill="#dcfce7" stroke="#22c55e"/>
  <text x="180" y="126" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">ESTABLISHED</text>
  <rect x="590" y="110" width="140" height="24" rx="4" fill="#dcfce7" stroke="#22c55e"/>
  <text x="660" y="126" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">ESTABLISHED</text>

  <!-- Step 1: Client sends FIN -->
  <line x1="180" y1="155" x2="650" y2="190" stroke="#dc2626" stroke-width="2.2" marker-end="url(#arr-r)"/>
  <rect x="290" y="150" width="260" height="34" rx="5" fill="#fef2f2" stroke="#fca5a5"/>
  <text x="420" y="165" text-anchor="middle" class="step-lbl" fill="#b91c1c">Step 1: Client Active Close (FIN)</text>
  <text x="420" y="178" text-anchor="middle" class="param" fill="#991b1b">FIN=1, Seq = u, Ack = v</text>

  <!-- State changes -->
  <rect x="110" y="160" width="140" height="24" rx="4" fill="#fee2e2" stroke="#f87171"/>
  <text x="180" y="176" text-anchor="middle" font-size="10" font-weight="bold" fill="#991b1b">FIN_WAIT_1</text>

  <rect x="590" y="195" width="140" height="24" rx="4" fill="#fef3c7" stroke="#f59e0b"/>
  <text x="660" y="211" text-anchor="middle" font-size="10" font-weight="bold" fill="#92400e">CLOSE_WAIT</text>

  <!-- Step 2: Server sends ACK -->
  <line x1="660" y1="225" x2="190" y2="260" stroke="#2563eb" stroke-width="2.2" marker-end="url(#arr-b)"/>
  <rect x="290" y="220" width="260" height="34" rx="5" fill="#eff6ff" stroke="#bfdbfe"/>
  <text x="420" y="235" text-anchor="middle" class="step-lbl" fill="#1d4ed8">Step 2: Server ACKs Client FIN</text>
  <text x="420" y="248" text-anchor="middle" class="param" fill="#1e40af">ACK=1, Seq = v, Ack = u + 1</text>

  <rect x="110" y="265" width="140" height="24" rx="4" fill="#e0e7ff" stroke="#818cf8"/>
  <text x="180" y="281" text-anchor="middle" font-size="10" font-weight="bold" fill="#3730a3">FIN_WAIT_2 (Half-Close)</text>

  <!-- Server sends remaining data & Step 3: Server FIN -->
  <line x1="660" y1="310" x2="190" y2="345" stroke="#dc2626" stroke-width="2.2" marker-end="url(#arr-r)"/>
  <rect x="290" y="305" width="260" height="34" rx="5" fill="#fef2f2" stroke="#fca5a5"/>
  <text x="420" y="320" text-anchor="middle" class="step-lbl" fill="#b91c1c">Step 3: Server Sends FIN</text>
  <text x="420" y="333" text-anchor="middle" class="param" fill="#991b1b">FIN=1, ACK=1, Seq = w, Ack = u + 1</text>

  <rect x="590" y="315" width="140" height="24" rx="4" fill="#fee2e2" stroke="#f87171"/>
  <text x="660" y="331" text-anchor="middle" font-size="10" font-weight="bold" fill="#991b1b">LAST_ACK</text>

  <!-- Step 4: Client final ACK -->
  <line x1="180" y1="375" x2="650" y2="405" stroke="#2563eb" stroke-width="2.2" marker-end="url(#arr-b)"/>
  <rect x="290" y="370" width="260" height="34" rx="5" fill="#eff6ff" stroke="#bfdbfe"/>
  <text x="420" y="385" text-anchor="middle" class="step-lbl" fill="#1d4ed8">Step 4: Client Final ACK</text>
  <text x="420" y="398" text-anchor="middle" class="param" fill="#1e40af">ACK=1, Seq = u + 1, Ack = w + 1</text>

  <rect x="590" y="410" width="140" height="24" rx="4" fill="#f1f5f9" stroke="#94a3b8"/>
  <text x="660" y="426" text-anchor="middle" font-size="10" font-weight="bold" fill="#475569">CLOSED</text>

  <!-- TIME_WAIT Timer Box -->
  <rect x="100" y="385" width="160" height="42" rx="5" fill="#fef3c7" stroke="#f59e0b"/>
  <text x="180" y="401" text-anchor="middle" font-size="10" font-weight="bold" fill="#b45309">TIME_WAIT State</text>
  <text x="180" y="415" text-anchor="middle" font-size="8.5" fill="#92400e">Timer = 2 × MSL (~120s)</text>
  <text x="180" y="438" text-anchor="middle" font-size="8.5" fill="#64748b">Transitions to CLOSED after timer</text>

  <!-- Callout Bottom -->
  <g transform="translate(40, 460)">
    <rect width="760" height="48" rx="6" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="20" y="18" font-size="10.5" font-weight="bold" fill="#0f172a">Why the 2MSL TIME-WAIT Timer is Essential:</text>
    <text x="20" y="32" font-size="9.5" fill="#475569">1. If the final ACK is lost, server retransmits its FIN; client must stay alive to re-ACK so server doesn't get stuck in LAST_ACK.</text>
    <text x="20" y="44" font-size="9.5" fill="#475569">2. Drains old duplicate packets lingering in network routes before the same port number pair can be reused.</text>
  </g>
</svg>
`);

// 6. Topic 2: Flow Control and Buffering
writeSvg('assets/images/unit4/topic2-elements-protocols/flow-control-buffering.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 500">
  <defs>
    <style>
      text { font-family: 'Segoe UI', Arial, sans-serif; }
      .title { font-size: 19px; font-weight: bold; fill: #1e293b; }
      .sub { font-size: 12.5px; fill: #64748b; }
      .buf-title { font-size: 12.5px; font-weight: bold; fill: #ffffff; }
      .cell { stroke: #94a3b8; stroke-width: 1; }
      .cell-t { font-size: 9px; text-anchor: middle; }
    </style>
  </defs>

  <rect width="840" height="500" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>

  <text x="420" y="32" text-anchor="middle" class="title">Transport Layer Flow Control &amp; Circular Buffering</text>
  <text x="420" y="52" text-anchor="middle" class="sub">Forouzan Figure 23.14 &amp; 23.24 — Matching Producer Application Speed with Receiver Consumer Rate</text>

  <!-- Sender Buffer -->
  <g transform="translate(40, 80)">
    <rect width="760" height="155" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    <rect width="760" height="30" rx="8" fill="#2563eb"/>
    <text x="20" y="20" class="buf-title">Sender Circular Buffer (Transmission Window Management)</text>

    <!-- Buffer Blocks -->
    <!-- Sent & ACKed: 1 to 200 -->
    <rect x="30" y="50" width="160" height="45" fill="#cbd5e1"/>
    <text x="110" y="73" text-anchor="middle" font-size="10" font-weight="bold" fill="#475569">Sent &amp; ACKed</text>
    <text x="110" y="87" text-anchor="middle" font-size="8.5" fill="#64748b">(Can be overwritten)</text>

    <!-- Usable Window (Sent in flight + Usable) -->
    <rect x="190" y="45" width="340" height="55" rx="6" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-dasharray="6,3"/>
    <text x="360" y="40" text-anchor="middle" font-size="11" font-weight="bold" fill="#2563eb">Sender Sliding Window = min(rwnd, cwnd)</text>

    <!-- Sent but unacked -->
    <rect x="190" y="50" width="180" height="45" fill="#fed7aa"/>
    <text x="280" y="73" text-anchor="middle" font-size="10" font-weight="bold" fill="#9a3412">Sent, Awaiting ACK</text>
    <text x="280" y="87" text-anchor="middle" font-size="8.5" fill="#c2410c">In-flight (Bytes 201–380)</text>

    <!-- Usable not yet sent -->
    <rect x="370" y="50" width="160" height="45" fill="#bbf7d0"/>
    <text x="450" y="73" text-anchor="middle" font-size="10" font-weight="bold" fill="#166534">Usable Window</text>
    <text x="450" y="87" text-anchor="middle" font-size="8.5" fill="#15803d">Can send now (381–540)</text>

    <!-- Cannot send -->
    <rect x="530" y="50" width="200" height="45" fill="#f1f5f9"/>
    <text x="630" y="73" text-anchor="middle" font-size="10" font-weight="bold" fill="#64748b">Outside Window</text>
    <text x="630" y="87" text-anchor="middle" font-size="8.5" fill="#94a3b8">Cannot send until window opens</text>

    <!-- Pointers -->
    <text x="190" y="125" font-size="9.5" font-weight="bold" fill="#2563eb">↑ Left Edge (Moves Right as ACKs arrive: CLOSING)</text>
    <text x="530" y="125" font-size="9.5" font-weight="bold" fill="#16a34a">↑ Right Edge (Moves Right as rwnd opens: OPENING)</text>
    <text x="30" y="142" font-size="9.5" fill="#475569">• Window Shrinking (moving right edge to the left) is strictly forbidden in RFC 9293 because it causes confusion.</text>
  </g>

  <!-- Receiver Buffer & rwnd Advertisement -->
  <g transform="translate(40, 255)">
    <rect width="760" height="155" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    <rect width="760" height="30" rx="8" fill="#10b981"/>
    <text x="20" y="20" class="buf-title">Receiver Socket Buffer (Advertised Window = rwnd)</text>

    <!-- Received and Read -->
    <rect x="30" y="50" width="220" height="45" fill="#cbd5e1"/>
    <text x="140" y="73" text-anchor="middle" font-size="10" font-weight="bold" fill="#475569">Received &amp; Read by App</text>
    <text x="140" y="87" text-anchor="middle" font-size="8.5" fill="#64748b">Removed via recv()</text>

    <!-- Received not yet read -->
    <rect x="250" y="50" width="230" height="45" fill="#fef08a"/>
    <text x="365" y="73" text-anchor="middle" font-size="10" font-weight="bold" fill="#854d0e">Buffered in Kernel</text>
    <text x="365" y="87" text-anchor="middle" font-size="8.5" fill="#a16207">Awaiting application read</text>

    <!-- Empty Space = rwnd -->
    <rect x="480" y="50" width="250" height="45" fill="#bbf7d0" stroke="#16a34a" stroke-width="2"/>
    <text x="605" y="73" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#166534">Free Buffer Space = rwnd</text>
    <text x="605" y="87" text-anchor="middle" font-size="8.5" fill="#15803d">Advertised to sender in TCP header</text>

    <text x="30" y="125" font-size="10" font-weight="bold" fill="#0f172a">rwnd Formula: rwnd = Total Buffer Size - (LastByteReceived - LastByteRead)</text>
    <text x="30" y="142" font-size="9.5" fill="#475569">• If application reads slowly, rwnd shrinks to 0 (Zero Window). Sender pauses and starts Persist Timer!</text>
  </g>

  <!-- Silly Window Syndrome Footer -->
  <g transform="translate(40, 425)">
    <rect width="760" height="60" rx="6" fill="#fef2f2" stroke="#fca5a5"/>
    <text x="20" y="20" font-size="11" font-weight="bold" fill="#991b1b">⚠️ Silly Window Syndrome (SWS) &amp; Dual Solutions:</text>
    <text x="20" y="35" font-size="9.5" fill="#7f1d1d">• Problem: Transferring tiny 1-byte payloads wrapped in 40 bytes of header (97.5% overhead)!</text>
    <text x="20" y="48" font-size="9.5" fill="#7f1d1d">• Receiver Solution (Clark): Advertise rwnd = 0 until free space is at least min(MSS, Buffer/2). | Sender Solution (Nagle): Buffer small writes until full MSS or ACK arrives.</text>
  </g>
</svg>
`);

// 7. Topic 3: UDP Segment Format (8 Bytes)
writeSvg('assets/images/unit4/topic3-udp/udp-segment-header-format.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 500">
  <defs>
    <style>
      text { font-family: 'Segoe UI', Arial, sans-serif; }
      .title { font-size: 20px; font-weight: bold; fill: #1e293b; }
      .sub { font-size: 13px; fill: #64748b; }
      .fld-title { font-size: 13px; font-weight: bold; fill: #ffffff; }
      .fld-desc { font-size: 10px; fill: #ffffff; opacity: 0.9; }
      .bit-h { font-size: 10px; font-weight: bold; fill: #64748b; }
      .note { font-size: 10.5px; fill: #334155; }
    </style>
  </defs>

  <rect width="840" height="500" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>

  <text x="420" y="32" text-anchor="middle" class="title">User Datagram Protocol (UDP): 8-Byte Fixed Header Format</text>
  <text x="420" y="52" text-anchor="middle" class="sub">RFC 768 / Forouzan Figure 23.9 — Minimalist 64-Bit Overhead with Optional 1's Complement Checksum</text>

  <!-- Bit ruler (0 to 31 bits) -->
  <g transform="translate(40, 75)">
    <rect width="760" height="24" rx="4" fill="#e2e8f0"/>
    <text x="95" y="16" text-anchor="middle" class="bit-h">Bit 0</text>
    <text x="380" y="16" text-anchor="middle" class="bit-h">Bit 15 | Bit 16</text>
    <text x="665" y="16" text-anchor="middle" class="bit-h">Bit 31</text>
  </g>

  <!-- Row 1: Source Port (16 bits) and Destination Port (16 bits) -->
  <g transform="translate(40, 105)">
    <!-- Source Port -->
    <rect x="0" y="0" width="375" height="70" rx="6" fill="#2563eb" stroke="#1d4ed8" stroke-width="1.5"/>
    <text x="187" y="30" text-anchor="middle" class="fld-title">Source Port Number (16 Bits)</text>
    <text x="187" y="48" text-anchor="middle" class="fld-desc">Port of sending process (0 to 65,535)</text>
    <text x="187" y="60" text-anchor="middle" font-size="9" fill="#bfdbfe">Optional (set to 0 if no reply expected)</text>

    <!-- Destination Port -->
    <rect x="385" y="0" width="375" height="70" rx="6" fill="#0891b2" stroke="#0e7490" stroke-width="1.5"/>
    <text x="572" y="30" text-anchor="middle" class="fld-title">Destination Port Number (16 Bits)</text>
    <text x="572" y="48" text-anchor="middle" class="fld-desc">Port of receiving process on destination host</text>
    <text x="572" y="60" text-anchor="middle" font-size="9" fill="#cffafe">Mandatory: Used by receiver to demultiplex packet</text>
  </g>

  <!-- Row 2: Length (16 bits) and Checksum (16 bits) -->
  <g transform="translate(40, 185)">
    <!-- UDP Length -->
    <rect x="0" y="0" width="375" height="70" rx="6" fill="#059669" stroke="#047857" stroke-width="1.5"/>
    <text x="187" y="30" text-anchor="middle" class="fld-title">Total Length (16 Bits)</text>
    <text x="187" y="48" text-anchor="middle" class="fld-desc">Header (8 bytes) + Data Payload (Bytes)</text>
    <text x="187" y="60" text-anchor="middle" font-size="9" fill="#a7f3d0">Min: 8 bytes (no data) | Max: 65,535 bytes</text>

    <!-- Checksum -->
    <rect x="385" y="0" width="375" height="70" rx="6" fill="#7c3aed" stroke="#6d28d9" stroke-width="1.5"/>
    <text x="572" y="30" text-anchor="middle" class="fld-title">Checksum (16 Bits)</text>
    <text x="572" y="48" text-anchor="middle" class="fld-desc">1's complement sum over pseudo-header + UDP + data</text>
    <text x="572" y="60" text-anchor="middle" font-size="9" fill="#ddd6fe">Optional in IPv4 (all 0s if unused) | Mandatory in IPv6</text>
  </g>

  <!-- Row 3: Application Data Payload -->
  <g transform="translate(40, 265)">
    <rect x="0" y="0" width="760" height="55" rx="6" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5"/>
    <text x="380" y="28" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Application Data Payload (Variable Length)</text>
    <text x="380" y="45" text-anchor="middle" font-size="10.5" fill="#64748b">DNS Query/Response, RTP Audio Packet, DHCP Request, SNMP Trap, NTP Timestamp</text>
  </g>

  <!-- Pseudo-Header Diagram for Checksum -->
  <g transform="translate(40, 335)">
    <rect width="760" height="145" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="25" y="24" font-size="13" font-weight="bold" fill="#0f172a">The 12-Byte IPv4 Pseudo-Header for Checksum Protection:</text>
    
    <g transform="translate(25, 35)">
      <rect x="0" y="0" width="220" height="28" fill="#e0e7ff" stroke="#6366f1"/>
      <text x="110" y="18" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#3730a3">Source IP Address (32 bits)</text>

      <rect x="220" y="0" width="220" height="28" fill="#e0e7ff" stroke="#6366f1"/>
      <text x="330" y="18" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#3730a3">Destination IP Address (32 bits)</text>

      <rect x="440" y="0" width="60" height="28" fill="#f1f5f9" stroke="#94a3b8"/>
      <text x="470" y="18" text-anchor="middle" font-size="9" fill="#475569">All 0s (8b)</text>

      <rect x="500" y="0" width="80" height="28" fill="#fef3c7" stroke="#f59e0b"/>
      <text x="540" y="18" text-anchor="middle" font-size="9" font-weight="bold" fill="#b45309">Proto=17 (8b)</text>

      <rect x="580" y="0" width="130" height="28" fill="#dcfce7" stroke="#22c55e"/>
      <text x="645" y="18" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#15803d">UDP Length (16b)</text>
    </g>

    <text x="25" y="85" class="note">• <strong>Purpose of Pseudo-Header:</strong> Verifies that the packet was delivered to the intended destination IP address.</text>
    <text x="25" y="103" class="note">• If an intermediate router corrupts the destination IP address in the IP header, the receiver's checksum will fail!</text>
    <text x="25" y="121" class="note">• The pseudo-header exists only during checksum computation in memory and is NEVER transmitted over the physical wire.</text>
  </g>
</svg>
`);

// 8. Topic 3: UDP vs TCP Comparison Matrix
writeSvg('assets/images/unit4/topic3-udp/udp-vs-tcp-comparison.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 520">
  <defs>
    <style>
      text { font-family: 'Segoe UI', Arial, sans-serif; }
      .title { font-size: 20px; font-weight: bold; fill: #1e293b; }
      .sub { font-size: 13px; fill: #64748b; }
      .th { font-size: 12px; font-weight: bold; fill: #ffffff; }
      .td-p { font-size: 11px; font-weight: bold; fill: #1e293b; }
      .td-tcp { font-size: 10px; fill: #1e40af; }
      .td-udp { font-size: 10px; fill: #065f46; }
    </style>
  </defs>

  <rect width="840" height="520" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>

  <text x="420" y="30" text-anchor="middle" class="title">Comprehensive Protocol Comparison: TCP vs. UDP</text>
  <text x="420" y="48" text-anchor="middle" class="sub">Architectural Trade-Off: Reliability &amp; Congestion Control vs. Raw Speed &amp; Low Latency</text>

  <!-- Table Container -->
  <g transform="translate(40, 65)">
    <!-- Header Row -->
    <rect x="0" y="0" width="180" height="32" fill="#334155"/>
    <text x="90" y="21" text-anchor="middle" class="th">Feature / Metric</text>

    <rect x="180" y="0" width="290" height="32" fill="#2563eb"/>
    <text x="325" y="21" text-anchor="middle" class="th">TCP (Transmission Control Protocol)</text>

    <rect x="470" y="0" width="290" height="32" fill="#059669"/>
    <text x="615" y="21" text-anchor="middle" class="th">UDP (User Datagram Protocol)</text>

    <!-- Rows -->
    <!-- Row 1: Connection Model -->
    <g transform="translate(0, 32)">
      <rect width="180" height="36" fill="#f1f5f9" stroke="#cbd5e1"/>
      <text x="15" y="22" class="td-p">Connection Model</text>
      <rect x="180" width="290" height="36" fill="#eff6ff" stroke="#cbd5e1"/>
      <text x="195" y="22" class="td-tcp">Connection-Oriented (3-Way Handshake)</text>
      <rect x="470" width="290" height="36" fill="#ecfdf5" stroke="#cbd5e1"/>
      <text x="485" y="22" class="td-udp">Connectionless (0-RTT, no setup state)</text>
    </g>

    <!-- Row 2: Reliability -->
    <g transform="translate(0, 68)">
      <rect width="180" height="36" fill="#f8fafc" stroke="#cbd5e1"/>
      <text x="15" y="22" class="td-p">Reliability Guarantee</text>
      <rect x="180" width="290" height="36" fill="#ffffff" stroke="#cbd5e1"/>
      <text x="195" y="22" class="td-tcp">100% Reliable (ACKs, Checksum, Retransmit)</text>
      <rect x="470" width="290" height="36" fill="#ffffff" stroke="#cbd5e1"/>
      <text x="485" y="22" class="td-udp">Unreliable (Best effort, dropped if lost)</text>
    </g>

    <!-- Row 3: Transmission Mode -->
    <g transform="translate(0, 104)">
      <rect width="180" height="36" fill="#f1f5f9" stroke="#cbd5e1"/>
      <text x="15" y="22" class="td-p">Data Stream Model</text>
      <rect x="180" width="290" height="36" fill="#eff6ff" stroke="#cbd5e1"/>
      <text x="195" y="22" class="td-tcp">Byte-Stream (No message boundaries)</text>
      <rect x="470" width="290" height="36" fill="#ecfdf5" stroke="#cbd5e1"/>
      <text x="485" y="22" class="td-udp">Datagram-oriented (Preserves boundaries)</text>
    </g>

    <!-- Row 4: Header Size -->
    <g transform="translate(0, 140)">
      <rect width="180" height="36" fill="#f8fafc" stroke="#cbd5e1"/>
      <text x="15" y="22" class="td-p">Header Overhead</text>
      <rect x="180" width="290" height="36" fill="#ffffff" stroke="#cbd5e1"/>
      <text x="195" y="22" class="td-tcp">20 to 60 Bytes (Variable, with options)</text>
      <rect x="470" width="290" height="36" fill="#ffffff" stroke="#cbd5e1"/>
      <text x="485" y="22" class="td-udp">8 Bytes Fixed (Minimal overhead)</text>
    </g>

    <!-- Row 5: Ordering -->
    <g transform="translate(0, 176)">
      <rect width="180" height="36" fill="#f1f5f9" stroke="#cbd5e1"/>
      <text x="15" y="22" class="td-p">Ordering / Sequencing</text>
      <rect x="180" width="290" height="36" fill="#eff6ff" stroke="#cbd5e1"/>
      <text x="195" y="22" class="td-tcp">Strictly in-order delivery via Sequence Nos</text>
      <rect x="470" width="290" height="36" fill="#ecfdf5" stroke="#cbd5e1"/>
      <text x="485" y="22" class="td-udp">No sequencing (Arrives out of order)</text>
    </g>

    <!-- Row 6: Flow & Congestion -->
    <g transform="translate(0, 212)">
      <rect width="180" height="36" fill="#f8fafc" stroke="#cbd5e1"/>
      <text x="15" y="22" class="td-p">Flow &amp; Congestion</text>
      <rect x="180" width="290" height="36" fill="#ffffff" stroke="#cbd5e1"/>
      <text x="195" y="22" class="td-tcp">Yes (Sliding window rwnd + AIMD cwnd)</text>
      <rect x="470" width="290" height="36" fill="#ffffff" stroke="#cbd5e1"/>
      <text x="485" y="22" class="td-udp">None (Transmits at application speed)</text>
    </g>

    <!-- Row 7: Cast Types -->
    <g transform="translate(0, 248)">
      <rect width="180" height="36" fill="#f1f5f9" stroke="#cbd5e1"/>
      <text x="15" y="22" class="td-p">Delivery Modes</text>
      <rect x="180" width="290" height="36" fill="#eff6ff" stroke="#cbd5e1"/>
      <text x="195" y="22" class="td-tcp">Unicast Point-to-Point only (One-to-One)</text>
      <rect x="470" width="290" height="36" fill="#ecfdf5" stroke="#cbd5e1"/>
      <text x="485" y="22" class="td-udp">Unicast, Multicast, and Broadcast</text>
    </g>

    <!-- Row 8: Applications -->
    <g transform="translate(0, 284)">
      <rect width="180" height="52" fill="#f8fafc" stroke="#cbd5e1"/>
      <text x="15" y="24" class="td-p">Real-World Uses</text>
      <text x="15" y="38" font-size="9" fill="#64748b">(Where to choose)</text>
      <rect x="180" width="290" height="52" fill="#eff6ff" stroke="#cbd5e1"/>
      <text x="195" y="20" class="td-tcp">Web (HTTP/HTTPS), File Transfer (FTP),</text>
      <text x="195" y="34" class="td-tcp">Email (SMTP, IMAP), Remote Shell (SSH)</text>
      <text x="195" y="46" font-size="8.5" fill="#64748b">Where zero data loss is critical</text>
      <rect x="470" width="290" height="52" fill="#ecfdf5" stroke="#cbd5e1"/>
      <text x="485" y="20" class="td-udp">DNS lookup, VoIP, Video Streaming,</text>
      <text x="485" y="34" class="td-udp">Online Multiplayer Games, DHCP, SNMP</text>
      <text x="485" y="46" font-size="8.5" fill="#64748b">Where speed &gt; retransmission latency</text>
    </g>
  </g>

  <!-- Bottom Summary Note -->
  <rect x="40" y="455" width="760" height="42" rx="6" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="420" y="473" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">Summary Rule of Thumb:</text>
  <text x="420" y="489" text-anchor="middle" font-size="10" fill="#475569">Choose TCP when data integrity and completeness matter most; choose UDP when real-time timeliness and low overhead take priority.</text>
</svg>
`);

console.log("Batch 2 SVGs created successfully!");

