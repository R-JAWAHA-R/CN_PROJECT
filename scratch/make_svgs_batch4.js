const fs = require('fs');
const path = require('path');

function writeSvg(relPath, content) {
  const fullPath = path.join(__dirname, '..', relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim(), 'utf8');
  console.log(`Created: ${relPath}`);
}

// 13. Topic 1: Socket Programming Flow (Client-Server Data Exchange)
writeSvg('assets/images/unit4/topic1-services-sockets/socket-programming-flow.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 500">
  <defs>
    <style>
      text { font-family: 'Segoe UI', Arial, sans-serif; }
      .title { font-size: 19px; font-weight: bold; fill: #1e293b; }
      .sub { font-size: 12.5px; fill: #64748b; }
      .h-box { font-size: 13px; font-weight: bold; fill: #ffffff; }
      .code-t { font-family: 'Courier New', monospace; font-size: 10.5px; font-weight: bold; }
    </style>
  </defs>

  <rect width="840" height="500" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>

  <text x="420" y="30" text-anchor="middle" class="title">Socket Programming: TCP vs. UDP Socket Lifecycles</text>
  <text x="420" y="48" text-anchor="middle" class="sub">Comparison of Stream Sockets (SOCK_STREAM) vs Datagram Sockets (SOCK_DGRAM)</text>

  <!-- Left: TCP Stream Sockets -->
  <g transform="translate(40, 70)">
    <rect width="365" height="400" rx="8" fill="#ffffff" stroke="#bfdbfe" stroke-width="1.5"/>
    <rect width="365" height="34" rx="8" fill="#2563eb"/>
    <text x="182" y="22" text-anchor="middle" class="h-box">TCP Stream Sockets (SOCK_STREAM)</text>

    <!-- Steps -->
    <rect x="20" y="45" width="325" height="40" rx="5" fill="#eff6ff" stroke="#93c5fd"/>
    <text x="35" y="62" class="code-t" fill="#1e40af">Server: socket() → bind() → listen()</text>
    <text x="35" y="76" font-size="9" fill="#64748b">Allocates socket, binds port, sets passive queue</text>

    <rect x="20" y="95" width="325" height="40" rx="5" fill="#fef3c7" stroke="#f59e0b"/>
    <text x="35" y="112" class="code-t" fill="#92400e">Server: accept() [BLOCKS]</text>
    <text x="35" y="126" font-size="9" fill="#78350f">Waits for client; creates new dedicated newsockfd</text>

    <rect x="20" y="145" width="325" height="40" rx="5" fill="#eff6ff" stroke="#93c5fd"/>
    <text x="35" y="162" class="code-t" fill="#1e40af">Client: socket() → connect()</text>
    <text x="35" y="176" font-size="9" fill="#64748b">Triggers 3-Way Handshake with Server</text>

    <rect x="20" y="195" width="325" height="60" rx="5" fill="#dcfce7" stroke="#22c55e"/>
    <text x="35" y="214" class="code-t" fill="#15803d">Bidirectional I/O: send() / recv()</text>
    <text x="35" y="228" font-size="9" fill="#166534">• Continuous stream of bytes (no message boundaries)</text>
    <text x="35" y="242" font-size="9" fill="#166534">• Guaranteed delivery, flow control &amp; retransmission</text>

    <rect x="20" y="265" width="325" height="45" rx="5" fill="#f1f5f9" stroke="#cbd5e1"/>
    <text x="35" y="284" class="code-t" fill="#334155">Teardown: close(newsockfd)</text>
    <text x="35" y="298" font-size="9" fill="#64748b">Triggers 4-Way FIN release handshake; frees FD</text>

    <rect x="20" y="320" width="325" height="65" rx="5" fill="#faf5ff" stroke="#c084fc"/>
    <text x="35" y="338" font-size="10" font-weight="bold" fill="#7c3aed">Concurrency Pattern:</text>
    <text x="35" y="354" font-size="9" fill="#581c87">• Concurrent server forks a child process or thread for</text>
    <text x="35" y="368" font-size="9" fill="#581c87">  each newsockfd, keeping parent listener free!</text>
  </g>

  <!-- Right: UDP Datagram Sockets -->
  <g transform="translate(435, 70)">
    <rect width="365" height="400" rx="8" fill="#ffffff" stroke="#a7f3d0" stroke-width="1.5"/>
    <rect width="365" height="34" rx="8" fill="#059669"/>
    <text x="182" y="22" text-anchor="middle" class="h-box">UDP Datagram Sockets (SOCK_DGRAM)</text>

    <!-- Steps -->
    <rect x="20" y="45" width="325" height="40" rx="5" fill="#ecfdf5" stroke="#6ee7b7"/>
    <text x="35" y="62" class="code-t" fill="#065f46">Server: socket() → bind()</text>
    <text x="35" y="76" font-size="9" fill="#64748b">No listen() or accept() calls required!</text>

    <rect x="20" y="95" width="325" height="40" rx="5" fill="#fef3c7" stroke="#f59e0b"/>
    <text x="35" y="112" class="code-t" fill="#92400e">Server: recvfrom() [BLOCKS]</text>
    <text x="35" y="126" font-size="9" fill="#78350f">Waits for datagram; extracts sender's IP:Port</text>

    <rect x="20" y="145" width="325" height="40" rx="5" fill="#ecfdf5" stroke="#6ee7b7"/>
    <text x="35" y="162" class="code-t" fill="#065f46">Client: socket() [No connect() needed!]</text>
    <text x="35" y="176" font-size="9" fill="#64748b">Transmits immediately without handshake latency</text>

    <rect x="20" y="195" width="325" height="60" rx="5" fill="#dcfce7" stroke="#22c55e"/>
    <text x="35" y="214" class="code-t" fill="#15803d">I/O: sendto() / recvfrom()</text>
    <text x="35" y="228" font-size="9" fill="#166534">• Explicit recipient address supplied in every call</text>
    <text x="35" y="242" font-size="9" fill="#166534">• Preserves datagram message boundaries</text>

    <rect x="20" y="265" width="325" height="45" rx="5" fill="#f1f5f9" stroke="#cbd5e1"/>
    <text x="35" y="284" class="code-t" fill="#334155">Teardown: close(sockfd)</text>
    <text x="35" y="298" font-size="9" fill="#64748b">Zero network packets sent; closes local endpoint</text>

    <rect x="20" y="320" width="325" height="65" rx="5" fill="#fef2f2" stroke="#fca5a5"/>
    <text x="35" y="338" font-size="10" font-weight="bold" fill="#b91c1c">Key Operational Distinction:</text>
    <text x="35" y="354" font-size="9" fill="#991b1b">• UDP server uses ONE single socket for ALL clients,</text>
    <text x="35" y="368" font-size="9" fill="#991b1b">  whereas TCP creates a new newsockfd per connection!</text>
  </g>
</svg>
`);

// 14. Topic 4: TCP Three-Way Handshake State Machine
writeSvg('assets/images/unit4/topic4-tcp/tcp-three-way-handshake.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 520">
  <defs>
    <style>
      text { font-family: 'Segoe UI', Arial, sans-serif; }
      .title { font-size: 19px; font-weight: bold; fill: #1e293b; }
      .sub { font-size: 12.5px; fill: #64748b; }
      .node-hdr { font-size: 14px; font-weight: bold; fill: #ffffff; }
      .step-lbl { font-size: 11px; font-weight: bold; }
      .param { font-family: 'Courier New', monospace; font-size: 10px; font-weight: bold; }
    </style>
    <marker id="arr-b" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 9 5 L 0 9 z" fill="#2563eb"/>
    </marker>
    <marker id="arr-g" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 9 5 L 0 9 z" fill="#16a34a"/>
    </marker>
  </defs>

  <rect width="840" height="520" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>

  <text x="420" y="30" text-anchor="middle" class="title">TCP Three-Way Handshake: State Machine Transitions</text>
  <text x="420" y="48" text-anchor="middle" class="sub">RFC 9293 Section 3.4 / Forouzan Figure 23.18 — Client &amp; Server FSM State Progressions</text>

  <!-- Lifelines -->
  <rect x="80" y="65" width="200" height="35" rx="6" fill="#2563eb"/>
  <text x="180" y="87" text-anchor="middle" class="node-hdr">💻 TCP Client FSM</text>
  <line x1="180" y1="100" x2="180" y2="440" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="4,4"/>

  <rect x="560" y="65" width="200" height="35" rx="6" fill="#1e293b"/>
  <text x="660" y="87" text-anchor="middle" class="node-hdr">🖥️ TCP Server FSM</text>
  <line x1="660" y1="100" x2="660" y2="440" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="4,4"/>

  <!-- CLOSED / LISTEN -->
  <rect x="130" y="110" width="100" height="24" rx="4" fill="#f1f5f9" stroke="#94a3b8"/>
  <text x="180" y="126" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#475569">CLOSED</text>

  <rect x="610" y="110" width="100" height="24" rx="4" fill="#fef3c7" stroke="#f59e0b"/>
  <text x="660" y="126" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#b45309">LISTEN</text>

  <!-- Step 1: SYN -->
  <line x1="180" y1="160" x2="650" y2="200" stroke="#2563eb" stroke-width="2.2" marker-end="url(#arr-b)"/>
  <rect x="280" y="155" width="280" height="36" rx="6" fill="#eff6ff" stroke="#93c5fd"/>
  <text x="420" y="172" text-anchor="middle" class="step-lbl" fill="#1d4ed8">1. Active Open (SYN Segment)</text>
  <text x="420" y="185" text-anchor="middle" class="param" fill="#1e40af">SYN=1, Seq=client_isn, Options: MSS=1460, WScale=7</text>

  <rect x="120" y="165" width="120" height="24" rx="4" fill="#e0e7ff" stroke="#6366f1"/>
  <text x="180" y="181" text-anchor="middle" font-size="10" font-weight="bold" fill="#3730a3">SYN_SENT</text>

  <rect x="600" y="205" width="120" height="24" rx="4" fill="#fef3c7" stroke="#f59e0b"/>
  <text x="660" y="221" text-anchor="middle" font-size="10" font-weight="bold" fill="#92400e">SYN_RCVD</text>

  <!-- Step 2: SYN + ACK -->
  <line x1="660" y1="245" x2="190" y2="285" stroke="#16a34a" stroke-width="2.2" marker-end="url(#arr-g)"/>
  <rect x="260" y="240" width="320" height="38" rx="6" fill="#f0fdf4" stroke="#86efac"/>
  <text x="420" y="257" text-anchor="middle" class="step-lbl" fill="#15803d">2. Passive Open SYN + ACK</text>
  <text x="420" y="271" text-anchor="middle" class="param" fill="#166534">SYN=1, ACK=1, Seq=server_isn, Ack=client_isn+1</text>

  <rect x="110" y="295" width="140" height="24" rx="4" fill="#dcfce7" stroke="#22c55e"/>
  <text x="180" y="311" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">ESTABLISHED</text>

  <!-- Step 3: ACK -->
  <line x1="180" y1="335" x2="650" y2="375" stroke="#2563eb" stroke-width="2.2" marker-end="url(#arr-b)"/>
  <rect x="280" y="330" width="280" height="36" rx="6" fill="#eff6ff" stroke="#93c5fd"/>
  <text x="420" y="347" text-anchor="middle" class="step-lbl" fill="#1d4ed8">3. Final ACK (Can carry payload)</text>
  <text x="420" y="360" text-anchor="middle" class="param" fill="#1e40af">ACK=1, Seq=client_isn+1, Ack=server_isn+1</text>

  <rect x="590" y="380" width="140" height="24" rx="4" fill="#dcfce7" stroke="#22c55e"/>
  <text x="660" y="396" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">ESTABLISHED</text>

  <!-- Data Flow Bar -->
  <rect x="200" y="410" width="440" height="28" rx="6" fill="#7c3aed"/>
  <text x="420" y="428" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">Synchronized Connection Established • Full-Duplex Byte Transfer</text>

  <!-- Bottom Explanatory Box -->
  <g transform="translate(40, 450)">
    <rect width="760" height="55" rx="6" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="20" y="20" font-size="10.5" font-weight="bold" fill="#0f172a">ISN Randomization &amp; Security (RFC 6528):</text>
    <text x="20" y="34" font-size="9.5" fill="#475569">• Initial Sequence Numbers (ISNs) are generated using a cryptographically secure pseudo-random clock-driven hash.</text>
    <text x="20" y="48" font-size="9.5" fill="#475569">• This prevents TCP Sequence Number Prediction attacks and IP Spoofing, ensuring attackers cannot hijack active sessions.</text>
  </g>
</svg>
`);

// 15. Topic 5: Congestion Control Taxonomy (Open-Loop vs Closed-Loop)
writeSvg('assets/images/unit4/topic5-congestion-control/congestion-control-taxonomy.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 500">
  <defs>
    <style>
      text { font-family: 'Segoe UI', Arial, sans-serif; }
      .title { font-size: 19px; font-weight: bold; fill: #1e293b; }
      .sub { font-size: 12.5px; fill: #64748b; }
      .cat-h { font-size: 13px; font-weight: bold; fill: #ffffff; }
      .m-box { rx: 5; fill: #ffffff; stroke: #cbd5e1; }
      .m-t { font-size: 11px; font-weight: bold; fill: #0f172a; }
      .m-d { font-size: 9.5px; fill: #475569; }
    </style>
  </defs>

  <rect width="840" height="500" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>

  <text x="420" y="30" text-anchor="middle" class="title">Congestion Control Taxonomy: Open-Loop vs. Closed-Loop</text>
  <text x="420" y="48" text-anchor="middle" class="sub">Forouzan Section 24.3 / Tanenbaum Section 5.3 — Prevention Policies vs. Dynamic Closed-Loop Feedback</text>

  <!-- Left: Open-Loop (Prevention) -->
  <g transform="translate(40, 70)">
    <rect width="365" height="400" rx="8" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1.5"/>
    <rect width="365" height="34" rx="8" fill="#2563eb"/>
    <text x="182" y="22" text-anchor="middle" class="cat-h">1. Open-Loop (Prevention Ahead of Time)</text>

    <!-- Description -->
    <text x="15" y="55" font-size="10.5" font-weight="bold" fill="#1e40af">Goal: Design protocols so congestion never occurs.</text>
    <text x="15" y="70" font-size="9" fill="#64748b">Policies implemented at source or destination without feedback:</text>

    <!-- Policy 1: Retransmission Policy -->
    <rect x="15" y="80" width="335" height="48" rx="5" class="m-box"/>
    <text x="25" y="98" class="m-t">A. Retransmission Policy</text>
    <text x="25" y="112" class="m-d">Use accurate RTO timers to avoid duplicate retransmission floods.</text>

    <!-- Policy 2: Window Policy -->
    <rect x="15" y="135" width="335" height="48" rx="5" class="m-box"/>
    <text x="25" y="153" class="m-t">B. Window Policy (Selective Repeat)</text>
    <text x="25" y="167" class="m-d">Selective Repeat retransmits only lost packets; Go-Back-N wastes capacity.</text>

    <!-- Policy 3: Acknowledgment Policy -->
    <rect x="15" y="190" width="335" height="48" rx="5" class="m-box"/>
    <text x="25" y="208" class="m-t">C. Acknowledgment Policy</text>
    <text x="25" y="222" class="m-d">Delayed ACKs &amp; NACKs reduce traffic load on return links.</text>

    <!-- Policy 4: Discarding Policy -->
    <rect x="15" y="245" width="335" height="48" rx="5" class="m-box"/>
    <text x="25" y="263" class="m-t">D. Discarding Policy</text>
    <text x="25" y="277" class="m-d">Routers intelligently drop less critical packets (e.g., video B-frames).</text>

    <!-- Policy 5: Admission Policy -->
    <rect x="15" y="300" width="335" height="48" rx="5" class="m-box"/>
    <text x="25" y="318" class="m-t">E. Admission Policy (QoS)</text>
    <text x="25" y="332" class="m-d">Routers refuse new virtual connection setups if congested.</text>

    <text x="15" y="375" font-size="9.5" fill="#475569">Note: Open-loop policies are static; they cannot respond to unexpected traffic surges!</text>
  </g>

  <!-- Right: Closed-Loop (Removal & Feedback) -->
  <g transform="translate(435, 70)">
    <rect width="365" height="400" rx="8" fill="#ecfdf5" stroke="#a7f3d0" stroke-width="1.5"/>
    <rect width="365" height="34" rx="8" fill="#059669"/>
    <text x="182" y="22" text-anchor="middle" class="cat-h">2. Closed-Loop (Dynamic Removal &amp; Feedback)</text>

    <!-- Description -->
    <text x="15" y="55" font-size="10.5" font-weight="bold" fill="#065f46">Goal: Detect congestion after it occurs and alleviate it.</text>
    <text x="15" y="70" font-size="9" fill="#64748b">Operates via closed-loop feedback mechanisms between nodes:</text>

    <!-- Mechanism 1: Backpressure -->
    <rect x="15" y="80" width="335" height="55" rx="5" class="m-box"/>
    <text x="25" y="98" class="m-t">A. Backpressure (Hop-by-Hop)</text>
    <text x="25" y="112" class="m-d">A congested node stops receiving from its upstream neighbor;</text>
    <text x="25" y="125" class="m-d">pressure propagates node-by-node back to the original source.</text>

    <!-- Mechanism 2: Choke Packet -->
    <rect x="15" y="142" width="335" height="55" rx="5" class="m-box"/>
    <text x="25" y="160" class="m-t">B. Choke Packet (Direct ICMP)</text>
    <text x="25" y="174" class="m-d">Congested router generates a special control packet directly</text>
    <text x="25" y="187" class="m-d">to the source host ordering it to reduce transmission rate.</text>

    <!-- Mechanism 3: Implicit Signaling -->
    <rect x="15" y="204" width="335" height="55" rx="5" class="m-box"/>
    <text x="25" y="222" class="m-t">C. Implicit Signaling (TCP Loss Detection)</text>
    <text x="25" y="236" class="m-d">Source detects congestion autonomously via delayed ACKs,</text>
    <text x="25" y="249" class="m-d">increased RTT, or packet loss (3 dup ACKs / Timeout).</text>

    <!-- Mechanism 4: Explicit Signaling -->
    <rect x="15" y="266" width="335" height="55" rx="5" class="m-box"/>
    <text x="25" y="284" class="m-t">D. Explicit Signaling (FECN, BECN &amp; ECN)</text>
    <text x="25" y="298" class="m-d">Routers set congestion notification bits directly in data packets:</text>
    <text x="25" y="311" class="m-d">• Forward (FECN) or Backward (BECN) / IP ECN (RFC 3168).</text>

    <text x="15" y="375" font-size="9.5" fill="#475569">Modern Internet: TCP relies primarily on Implicit Loss Signaling + Explicit Congestion Notification (ECN)!</text>
  </g>
</svg>
`);

console.log("Batch 4 SVGs created successfully!");

