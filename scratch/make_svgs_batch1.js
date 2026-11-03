const fs = require('fs');
const path = require('path');

function writeSvg(relPath, content) {
  const fullPath = path.join(__dirname, '..', relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim(), 'utf8');
  console.log(`Created: ${relPath}`);
}

// 1. Topic 1: Transport Services & Deliveries
writeSvg('assets/images/unit4/topic1-services-sockets/transport-services-deliveries.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 500">
  <defs>
    <style>
      text { font-family: 'Segoe UI', Arial, sans-serif; }
      .title { font-size: 20px; font-weight: bold; fill: #1e293b; }
      .sub { font-size: 13px; fill: #64748b; }
      .box-title { font-size: 13px; font-weight: bold; fill: #ffffff; }
      .lbl { font-size: 11px; fill: #334155; }
      .bold-lbl { font-size: 11px; font-weight: 600; fill: #1e293b; }
      .code-lbl { font-family: 'Courier New', monospace; font-size: 10px; font-weight: bold; fill: #0f172a; }
      .note { font-size: 10.5px; fill: #475569; }
    </style>
    <filter id="sh" x="-2%" y="-2%" width="104%" height="104%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.1"/>
    </filter>
  </defs>

  <rect width="840" height="500" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>

  <text x="420" y="32" text-anchor="middle" class="title">Transport Layer: Process-to-Process Delivery Model</text>
  <text x="420" y="52" text-anchor="middle" class="sub">Forouzan Figure 23.1 &amp; 23.6 — Comparing Node-to-Node, Host-to-Host, and Process-to-Process Deliveries</text>

  <!-- Level 1: Data Link Layer -->
  <g transform="translate(40, 75)">
    <rect width="760" height="75" rx="8" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1.5"/>
    <rect x="15" y="15" width="160" height="45" rx="6" fill="#2563eb" filter="url(#sh)"/>
    <text x="95" y="34" text-anchor="middle" class="box-title">Data Link Layer</text>
    <text x="95" y="48" text-anchor="middle" font-size="9" fill="#dbeafe">Hop-by-Hop (Node-to-Node)</text>
    <text x="195" y="32" class="bold-lbl">Scope: Adjacent Connected Nodes (Host to Router, Router to Router)</text>
    <text x="195" y="48" class="lbl">Addressing: Physical 48-bit MAC Addresses (e.g., 00:1A:2B:3C:4D:5E). Changes at every intermediate link.</text>
    <text x="195" y="62" class="note">Unit: Frame | Responsibilities: Framing, physical link error detection, media access control.</text>
  </g>

  <!-- Level 2: Network Layer -->
  <g transform="translate(40, 165)">
    <rect width="760" height="75" rx="8" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1.5"/>
    <rect x="15" y="15" width="160" height="45" rx="6" fill="#16a34a" filter="url(#sh)"/>
    <text x="95" y="34" text-anchor="middle" class="box-title">Network Layer</text>
    <text x="95" y="48" text-anchor="middle" font-size="9" fill="#dcfce7">Source-to-Destination (Host-to-Host)</text>
    <text x="195" y="32" class="bold-lbl">Scope: End System Host to Remote Host across Interconnected Networks</text>
    <text x="195" y="48" class="lbl">Addressing: Logical 32-bit IPv4 / 128-bit IPv6 Addresses. Unaltered end-to-end across routers.</text>
    <text x="195" y="62" class="note">Unit: Packet (Datagram) | Limitation: Delivers only to the destination machine, NOT the specific running application!</text>
  </g>

  <!-- Level 3: Transport Layer -->
  <g transform="translate(40, 255)">
    <rect width="760" height="95" rx="8" fill="#faf5ff" stroke="#e9d5ff" stroke-width="2"/>
    <rect x="15" y="18" width="160" height="60" rx="6" fill="#7c3aed" filter="url(#sh)"/>
    <text x="95" y="42" text-anchor="middle" class="box-title">Transport Layer</text>
    <text x="95" y="58" text-anchor="middle" font-size="9" fill="#f3e8ff">Process-to-Process</text>
    <text x="95" y="70" text-anchor="middle" font-size="8.5" fill="#f3e8ff">True End-to-End</text>
    <text x="195" y="36" class="bold-lbl" fill="#6b21a8">Scope: Specific Communicating Processes (Client Browser Process ↔ Web Server Process)</text>
    <text x="195" y="54" class="lbl">Addressing: 16-bit Port Numbers (0 to 65,535). Combined with IP $\\to$ Socket Address (e.g., 192.168.1.5:8080).</text>
    <text x="195" y="72" class="lbl">Core Duties: Multiplexing / Demultiplexing, Connection Management, Reliability, Flow &amp; Congestion Control.</text>
    <text x="195" y="86" class="note">Protocols: TCP (Reliable, Byte-Stream, Connection-Oriented) vs UDP (Fast, Datagram, Connectionless).</text>
  </g>

  <!-- Bottom Multiplexing Diagram -->
  <g transform="translate(40, 365)">
    <rect width="760" height="115" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
    <text x="20" y="24" class="bold-lbl" fill="#1e293b">Multiplexing at Sender vs Demultiplexing at Receiver</text>

    <!-- Sender Process Icons -->
    <rect x="30" y="40" width="80" height="24" rx="4" fill="#3b82f6"/>
    <text x="70" y="56" text-anchor="middle" font-size="9.5" fill="#ffffff" font-weight="bold">HTTP (P: 51234)</text>
    <rect x="120" y="40" width="80" height="24" rx="4" fill="#10b981"/>
    <text x="160" y="56" text-anchor="middle" font-size="9.5" fill="#ffffff" font-weight="bold">DNS (P: 51235)</text>
    <rect x="210" y="40" width="80" height="24" rx="4" fill="#8b5cf6"/>
    <text x="250" y="56" text-anchor="middle" font-size="9.5" fill="#ffffff" font-weight="bold">SSH (P: 51236)</text>

    <!-- Mux Funnel -->
    <path d="M 160 68 L 160 85 L 340 85" stroke="#64748b" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
    <rect x="340" y="65" width="140" height="38" rx="6" fill="#f1f5f9" stroke="#94a3b8"/>
    <text x="410" y="82" text-anchor="middle" font-size="10" font-weight="bold" fill="#334155">Network Layer (IP)</text>
    <text x="410" y="94" text-anchor="middle" font-size="8.5" fill="#64748b">Single IP Datagram Pipe</text>

    <!-- Demux Funnel -->
    <path d="M 480 85 L 640 85 L 640 68" stroke="#64748b" stroke-width="2" fill="none"/>
    <rect x="520" y="40" width="80" height="24" rx="4" fill="#3b82f6"/>
    <text x="560" y="56" text-anchor="middle" font-size="9.5" fill="#ffffff" font-weight="bold">HTTP (P: 80)</text>
    <rect x="610" y="40" width="80" height="24" rx="4" fill="#10b981"/>
    <text x="650" y="56" text-anchor="middle" font-size="9.5" fill="#ffffff" font-weight="bold">DNS (P: 53)</text>
    <rect x="700" y="40" width="80" height="24" rx="4" fill="#8b5cf6"/>
    <text x="740" y="56" text-anchor="middle" font-size="9.5" fill="#ffffff" font-weight="bold">SSH (P: 22)</text>
  </g>
</svg>
`);

// 2. Topic 1: Berkeley Sockets Architecture
writeSvg('assets/images/unit4/topic1-services-sockets/berkeley-sockets-architecture.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 520">
  <defs>
    <style>
      text { font-family: 'Segoe UI', Arial, sans-serif; }
      .title { font-size: 19px; font-weight: bold; fill: #1e293b; }
      .sub { font-size: 12.5px; fill: #64748b; }
      .col-h { font-size: 14px; font-weight: bold; fill: #ffffff; }
      .call-box { rx: 6; stroke-width: 1.5; }
      .call-t { font-family: 'Courier New', monospace; font-size: 11px; font-weight: bold; }
      .call-d { font-size: 9.5px; fill: #64748b; }
      .msg-line { stroke-width: 1.8; stroke-dasharray: 4,3; }
      .solid-line { stroke-width: 2; }
    </style>
    <marker id="arr-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 9 5 L 0 9 z" fill="#2563eb"/>
    </marker>
    <marker id="arr-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 9 5 L 0 9 z" fill="#16a34a"/>
    </marker>
    <marker id="arr-purple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 9 5 L 0 9 z" fill="#7c3aed"/>
    </marker>
  </defs>

  <rect width="840" height="520" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>

  <text x="420" y="30" text-anchor="middle" class="title">Berkeley Sockets API: TCP Client-Server Interaction Flow</text>
  <text x="420" y="48" text-anchor="middle" class="sub">Standard POSIX Socket System Calls &amp; Connection Lifecycle</text>

  <!-- Server Column Header -->
  <rect x="80" y="65" width="280" height="35" rx="6" fill="#1e293b"/>
  <text x="220" y="87" text-anchor="middle" class="col-h">🖥️ TCP Server (Passive Listener)</text>

  <!-- Client Column Header -->
  <rect x="480" y="65" width="280" height="35" rx="6" fill="#2563eb"/>
  <text x="620" y="87" text-anchor="middle" class="col-h">💻 TCP Client (Active Peer)</text>

  <!-- Server Steps -->
  <!-- 1. socket() -->
  <rect x="100" y="115" width="240" height="36" rx="6" fill="#ffffff" stroke="#cbd5e1" class="call-box"/>
  <text x="220" y="131" text-anchor="middle" class="call-t" fill="#0f172a">1. socket(AF_INET, SOCK_STREAM)</text>
  <text x="220" y="144" text-anchor="middle" class="call-d">Creates endpoint file descriptor</text>

  <!-- 2. bind() -->
  <rect x="100" y="165" width="240" height="36" rx="6" fill="#ffffff" stroke="#cbd5e1" class="call-box"/>
  <text x="220" y="181" text-anchor="middle" class="call-t" fill="#0f172a">2. bind(server_ip, server_port)</text>
  <text x="220" y="194" text-anchor="middle" class="call-d">Binds socket to local IP &amp; well-known port</text>

  <!-- 3. listen() -->
  <rect x="100" y="215" width="240" height="36" rx="6" fill="#ffffff" stroke="#cbd5e1" class="call-box"/>
  <text x="220" y="231" text-anchor="middle" class="call-t" fill="#0f172a">3. listen(backlog=5)</text>
  <text x="220" y="244" text-anchor="middle" class="call-d">Transitions to PASSIVE listening state</text>

  <!-- 4. accept() -->
  <rect x="100" y="265" width="240" height="42" rx="6" fill="#fef3c7" stroke="#f59e0b" class="call-box"/>
  <text x="220" y="282" text-anchor="middle" class="call-t" fill="#92400e">4. accept() [BLOCKS]</text>
  <text x="220" y="297" text-anchor="middle" class="call-d">Waits for client connection; returns newsockfd</text>

  <!-- Client Steps -->
  <!-- 1. socket() -->
  <rect x="500" y="165" width="240" height="36" rx="6" fill="#ffffff" stroke="#cbd5e1" class="call-box"/>
  <text x="620" y="181" text-anchor="middle" class="call-t" fill="#0f172a">1. socket(AF_INET, SOCK_STREAM)</text>
  <text x="620" y="194" text-anchor="middle" class="call-d">Allocates client socket endpoint</text>

  <!-- 2. connect() -->
  <rect x="500" y="225" width="240" height="42" rx="6" fill="#e0e7ff" stroke="#6366f1" class="call-box"/>
  <text x="620" y="242" text-anchor="middle" class="call-t" fill="#3730a3">2. connect(server_addr)</text>
  <text x="620" y="257" text-anchor="middle" class="call-d">Triggers TCP 3-Way Handshake (SYN)</text>

  <!-- Handshake Arrows -->
  <line x1="500" y1="260" x2="345" y2="280" stroke="#7c3aed" stroke-width="2" marker-end="url(#arr-purple)"/>
  <text x="420" y="265" text-anchor="middle" font-size="10" font-weight="bold" fill="#7c3aed">SYN / SYN+ACK / ACK</text>

  <!-- Server Unblocks -->
  <rect x="100" y="325" width="240" height="36" rx="6" fill="#dcfce7" stroke="#22c55e" class="call-box"/>
  <text x="220" y="341" text-anchor="middle" class="call-t" fill="#15803d">Connection Established!</text>
  <text x="220" y="354" text-anchor="middle" class="call-d">Dedicated newsockfd allocated for client</text>

  <!-- Data Exchange -->
  <rect x="500" y="325" width="240" height="36" rx="6" fill="#ffffff" stroke="#cbd5e1" class="call-box"/>
  <text x="620" y="341" text-anchor="middle" class="call-t" fill="#0f172a">3. send(sockfd, request_data)</text>
  <text x="620" y="354" text-anchor="middle" class="call-d">Writes payload bytes to socket buffer</text>

  <line x1="500" y1="350" x2="345" y2="385" stroke="#2563eb" stroke-width="2" marker-end="url(#arr-blue)"/>
  <text x="420" y="362" text-anchor="middle" font-size="10" font-weight="bold" fill="#2563eb">Application Request (Bytes)</text>

  <!-- Server recv & send -->
  <rect x="100" y="380" width="240" height="36" rx="6" fill="#ffffff" stroke="#cbd5e1" class="call-box"/>
  <text x="220" y="396" text-anchor="middle" class="call-t" fill="#0f172a">5. recv() &amp; send(response)</text>
  <text x="220" y="409" text-anchor="middle" class="call-d">Processes request, transmits result</text>

  <line x1="340" y1="410" x2="495" y2="435" stroke="#16a34a" stroke-width="2" marker-end="url(#arr-green)"/>
  <text x="420" y="420" text-anchor="middle" font-size="10" font-weight="bold" fill="#16a34a">Server Response (Bytes)</text>

  <!-- Client recv & close -->
  <rect x="500" y="430" width="240" height="36" rx="6" fill="#ffffff" stroke="#cbd5e1" class="call-box"/>
  <text x="620" y="446" text-anchor="middle" class="call-t" fill="#0f172a">4. recv() &amp; close(sockfd)</text>
  <text x="620" y="459" text-anchor="middle" class="call-d">Reads response, initiates FIN release</text>

  <!-- Server close -->
  <rect x="100" y="435" width="240" height="36" rx="6" fill="#ffffff" stroke="#cbd5e1" class="call-box"/>
  <text x="220" y="451" text-anchor="middle" class="call-t" fill="#0f172a">6. close(newsockfd)</text>
  <text x="220" y="464" text-anchor="middle" class="call-d">Closes client connection; loop to accept()</text>

  <!-- Bottom Legend -->
  <rect x="80" y="485" width="680" height="24" rx="4" fill="#f1f5f9" stroke="#e2e8f0"/>
  <text x="420" y="501" text-anchor="middle" font-size="10" fill="#475569">💡 Sockets bridge application processes with the kernel TCP/IP stack using standard Unix file descriptor abstractions.</text>
</svg>
`);

// 3. Topic 2: Transport Addressing & Port Ranges
writeSvg('assets/images/unit4/topic2-elements-protocols/transport-addressing-ports.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 500">
  <defs>
    <style>
      text { font-family: 'Segoe UI', Arial, sans-serif; }
      .title { font-size: 20px; font-weight: bold; fill: #1e293b; }
      .sub { font-size: 13px; fill: #64748b; }
      .range-h { font-size: 13px; font-weight: bold; fill: #ffffff; }
      .lbl { font-size: 11px; fill: #334155; }
      .bold-lbl { font-size: 11px; font-weight: bold; fill: #0f172a; }
      .mono { font-family: 'Courier New', monospace; font-size: 10.5px; }
    </style>
  </defs>

  <rect width="840" height="500" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>

  <text x="420" y="32" text-anchor="middle" class="title">Transport Layer Addressing: 16-Bit Port Numbers &amp; ICANN Ranges</text>
  <text x="420" y="52" text-anchor="middle" class="sub">Forouzan Figure 23.4 &amp; 23.5 — 65,536 Total Port Numbers &amp; Socket Address Architecture</text>

  <!-- 3 ICANN Ranges Visual Bar -->
  <g transform="translate(40, 75)">
    <!-- Total Bar -->
    <rect width="760" height="30" rx="6" fill="#cbd5e1"/>
    
    <!-- Well-known: 0 to 1023 (1024 ports) ~ 12% width for visual clarity -->
    <rect x="0" y="0" width="160" height="30" rx="6" fill="#2563eb"/>
    <text x="80" y="20" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">0 – 1023</text>

    <!-- Registered: 1024 to 49151 -->
    <rect x="160" y="0" width="360" height="30" fill="#0891b2"/>
    <text x="340" y="20" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">1,024 – 49,151</text>

    <!-- Dynamic/Ephemeral: 49152 to 65535 -->
    <rect x="520" y="0" width="240" height="30" rx="6" fill="#7c3aed"/>
    <text x="640" y="20" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">49,152 – 65,535</text>
  </g>

  <!-- Card 1: Well-Known Ports -->
  <g transform="translate(40, 125)">
    <rect width="240" height="190" rx="8" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1.5"/>
    <rect width="240" height="32" rx="8" fill="#2563eb"/>
    <text x="120" y="21" text-anchor="middle" class="range-h">1. Well-Known Ports</text>
    <text x="120" y="50" text-anchor="middle" class="bold-lbl" fill="#1e40af">Range: 0 to 1,023 (1,024 ports)</text>
    <text x="15" y="70" class="lbl">• Controlled &amp; assigned by IANA/ICANN.</text>
    <text x="15" y="86" class="lbl">• Reserved for standard universal servers.</text>
    <text x="15" y="102" class="lbl">• Requires root / admin privileges to bind.</text>
    <rect x="15" y="115" width="210" height="65" rx="4" fill="#ffffff" stroke="#dbeafe"/>
    <text x="25" y="132" class="mono" fill="#1e3a8a">• Port 20/21: FTP (Data/Control)</text>
    <text x="25" y="147" class="mono" fill="#1e3a8a">• Port 22: SSH | Port 25: SMTP</text>
    <text x="25" y="162" class="mono" fill="#1e3a8a">• Port 53: DNS | Port 80: HTTP</text>
    <text x="25" y="174" class="mono" fill="#1e3a8a">• Port 443: HTTPS | 123: NTP</text>
  </g>

  <!-- Card 2: Registered Ports -->
  <g transform="translate(300, 125)">
    <rect width="240" height="190" rx="8" fill="#ecfeff" stroke="#a5f3fc" stroke-width="1.5"/>
    <rect width="240" height="32" rx="8" fill="#0891b2"/>
    <text x="120" y="21" text-anchor="middle" class="range-h">2. Registered Ports</text>
    <text x="120" y="50" text-anchor="middle" class="bold-lbl" fill="#155e75">Range: 1,024 to 49,151 (48,128 ports)</text>
    <text x="15" y="70" class="lbl">• Registered with ICANN by vendors.</text>
    <text x="15" y="86" class="lbl">• Prevents port number collisions.</text>
    <text x="15" y="102" class="lbl">• Standard user processes can bind.</text>
    <rect x="15" y="115" width="210" height="65" rx="4" fill="#ffffff" stroke="#cffafe"/>
    <text x="25" y="132" class="mono" fill="#164e63">• Port 1433: MS SQL Server</text>
    <text x="25" y="147" class="mono" fill="#164e63">• Port 3306: MySQL Database</text>
    <text x="25" y="162" class="mono" fill="#164e63">• Port 5432: PostgreSQL DB</text>
    <text x="25" y="174" class="mono" fill="#164e63">• Port 8080: Alternate HTTP / Proxy</text>
  </g>

  <!-- Card 3: Dynamic / Ephemeral Ports -->
  <g transform="translate(560, 125)">
    <rect width="240" height="190" rx="8" fill="#faf5ff" stroke="#e9d5ff" stroke-width="1.5"/>
    <rect width="240" height="32" rx="8" fill="#7c3aed"/>
    <text x="120" y="21" text-anchor="middle" class="range-h">3. Dynamic / Ephemeral</text>
    <text x="120" y="50" text-anchor="middle" class="bold-lbl" fill="#581c87">Range: 49,152 to 65,535 (16,384 ports)</text>
    <text x="15" y="70" class="lbl">• Neither registered nor controlled.</text>
    <text x="15" y="86" class="lbl">• Automatically assigned by OS to clients.</text>
    <text x="15" y="102" class="lbl">• Temporary lifetime (freed after close).</text>
    <rect x="15" y="115" width="210" height="65" rx="4" fill="#ffffff" stroke="#f3e8ff"/>
    <text x="25" y="132" class="mono" fill="#581c87">• Browser tab opening website</text>
    <text x="25" y="147" class="mono" fill="#581c87">• Client DNS query to resolver</text>
    <text x="25" y="162" class="mono" fill="#581c87">• Mobile app background sync</text>
    <text x="25" y="174" class="mono" fill="#581c87">• Randomly picked by OS kernel</text>
  </g>

  <!-- Bottom Section: The Socket Address Formula -->
  <g transform="translate(40, 330)">
    <rect width="760" height="145" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="25" y="28" font-size="14" font-weight="bold" fill="#0f172a">The Socket Address: Unifying Network and Transport Identification</text>
    
    <!-- Formula Box -->
    <rect x="25" y="45" width="340" height="40" rx="6" fill="#f1f5f9" stroke="#94a3b8"/>
    <text x="195" y="70" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e293b">Socket Address = IP Address + Port Number</text>

    <!-- Client vs Server Socket Example -->
    <rect x="385" y="45" width="350" height="40" rx="6" fill="#ecfdf5" stroke="#10b981"/>
    <text x="560" y="62" text-anchor="middle" font-size="11" font-weight="bold" fill="#065f46">Client: 192.168.1.10 : 54321 (Ephemeral)</text>
    <text x="560" y="78" text-anchor="middle" font-size="11" font-weight="bold" fill="#065f46">Server: 203.0.113.80 : 443 (Well-Known HTTPS)</text>

    <text x="25" y="110" class="lbl">• A transport connection is uniquely identified across the Internet by a 4-Tuple: (Source IP, Source Port, Dest IP, Dest Port).</text>
    <text x="25" y="128" class="note">• This allows thousands of simultaneous connections to port 80/443 on the same web server without crosstalk!</text>
  </g>
</svg>
`);

// 4. Topic 2: Connection Establishment & 3-Way Handshake
writeSvg('assets/images/unit4/topic2-elements-protocols/connection-establishment-3way.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 520">
  <defs>
    <style>
      text { font-family: 'Segoe UI', Arial, sans-serif; }
      .title { font-size: 19px; font-weight: bold; fill: #1e293b; }
      .sub { font-size: 12.5px; fill: #64748b; }
      .node-hdr { font-size: 14px; font-weight: bold; fill: #ffffff; }
      .state-box { rx: 5; font-size: 11px; font-weight: bold; }
      .step-lbl { font-size: 11px; font-weight: bold; }
      .param { font-family: 'Courier New', monospace; font-size: 10.5px; }
      .why-box { font-size: 10px; fill: #334155; }
    </style>
    <marker id="arr-m" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 9 5 L 0 9 z" fill="#2563eb"/>
    </marker>
    <marker id="arr-g" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 9 5 L 0 9 z" fill="#16a34a"/>
    </marker>
  </defs>

  <rect width="840" height="520" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>

  <text x="420" y="30" text-anchor="middle" class="title">TCP Three-Way Handshake Connection Establishment</text>
  <text x="420" y="48" text-anchor="middle" class="sub">Forouzan Figure 23.18 — ISN Exchange, State Machine Synchronization, and Prevention of Delayed Duplicates</text>

  <!-- Client Header & Lifeline -->
  <rect x="80" y="65" width="200" height="35" rx="6" fill="#2563eb"/>
  <text x="180" y="87" text-anchor="middle" class="node-hdr">💻 TCP Client</text>
  <line x1="180" y1="100" x2="180" y2="440" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="4,4"/>

  <!-- Server Header & Lifeline -->
  <rect x="560" y="65" width="200" height="35" rx="6" fill="#1e293b"/>
  <text x="660" y="87" text-anchor="middle" class="node-hdr">🖥️ TCP Server</text>
  <line x1="660" y1="100" x2="660" y2="440" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="4,4"/>

  <!-- Initial States -->
  <rect x="130" y="110" width="100" height="24" rx="4" fill="#f1f5f9" stroke="#94a3b8"/>
  <text x="180" y="126" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#475569">CLOSED</text>

  <rect x="610" y="110" width="100" height="24" rx="4" fill="#fef3c7" stroke="#f59e0b"/>
  <text x="660" y="126" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#b45309">LISTEN</text>

  <!-- Step 1: SYN -->
  <line x1="180" y1="160" x2="650" y2="200" stroke="#2563eb" stroke-width="2.2" marker-end="url(#arr-m)"/>
  <rect x="290" y="155" width="260" height="36" rx="6" fill="#eff6ff" stroke="#93c5fd"/>
  <text x="420" y="172" text-anchor="middle" class="step-lbl" fill="#1d4ed8">Step 1: Client SYN</text>
  <text x="420" y="185" text-anchor="middle" class="param" fill="#1e40af">SYN=1, ACK=0, Seq = client_isn (e.g., 8000)</text>

  <!-- Client transitions to SYN_SENT -->
  <rect x="120" y="165" width="120" height="24" rx="4" fill="#e0e7ff" stroke="#6366f1"/>
  <text x="180" y="181" text-anchor="middle" font-size="10" font-weight="bold" fill="#3730a3">SYN_SENT</text>

  <!-- Server transitions to SYN_RCVD -->
  <rect x="600" y="205" width="120" height="24" rx="4" fill="#fef3c7" stroke="#f59e0b"/>
  <text x="660" y="221" text-anchor="middle" font-size="10" font-weight="bold" fill="#92400e">SYN_RCVD</text>

  <!-- Step 2: SYN + ACK -->
  <line x1="660" y1="245" x2="190" y2="285" stroke="#16a34a" stroke-width="2.2" marker-end="url(#arr-g)"/>
  <rect x="270" y="240" width="300" height="38" rx="6" fill="#f0fdf4" stroke="#86efac"/>
  <text x="420" y="257" text-anchor="middle" class="step-lbl" fill="#15803d">Step 2: Server SYN + ACK</text>
  <text x="420" y="271" text-anchor="middle" class="param" fill="#166534">SYN=1, ACK=1, Seq = server_isn (15000), Ack = 8001</text>

  <!-- Client transitions to ESTABLISHED -->
  <rect x="110" y="295" width="140" height="24" rx="4" fill="#dcfce7" stroke="#22c55e"/>
  <text x="180" y="311" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">ESTABLISHED</text>

  <!-- Step 3: ACK -->
  <line x1="180" y1="335" x2="650" y2="375" stroke="#2563eb" stroke-width="2.2" marker-end="url(#arr-m)"/>
  <rect x="290" y="330" width="260" height="36" rx="6" fill="#eff6ff" stroke="#93c5fd"/>
  <text x="420" y="347" text-anchor="middle" class="step-lbl" fill="#1d4ed8">Step 3: Client Final ACK</text>
  <text x="420" y="360" text-anchor="middle" class="param" fill="#1e40af">ACK=1, SYN=0, Seq = 8001, Ack = 15001</text>

  <!-- Server transitions to ESTABLISHED -->
  <rect x="590" y="380" width="140" height="24" rx="4" fill="#dcfce7" stroke="#22c55e"/>
  <text x="660" y="396" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">ESTABLISHED</text>

  <!-- Bidirectional Data Transfer Pipe -->
  <rect x="220" y="405" width="400" height="32" rx="6" fill="#7c3aed"/>
  <text x="420" y="425" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">⚡ Full-Duplex Data Transfer Pipe Open (Both Directions Synchronized)</text>

  <!-- Bottom Explanatory Callout -->
  <g transform="translate(40, 450)">
    <rect width="760" height="55" rx="6" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="20" y="20" font-size="11" font-weight="bold" fill="#0f172a">Why Three Steps Instead of Two? (Tomlinson's Solution):</text>
    <text x="20" y="34" class="why-box">• If only 2 messages were used, an old delayed duplicate SYN wandering in the network could reach the server.</text>
    <text x="20" y="48" class="why-box">• The server would allocate memory buffers and establish a half-open ghost connection without the client ever knowing!</text>
  </g>
</svg>
`);

console.log("Batch 1 SVGs created successfully!");

