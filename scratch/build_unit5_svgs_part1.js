const fs = require('fs');
const path = require('path');

function saveSvg(subpath, svgContent) {
  const fullPath = path.join(__dirname, '..', subpath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, svgContent.trim(), 'utf8');
  console.log(`Saved: ${subpath} (${svgContent.length} bytes)`);
}

const defsCommon = `
  <defs>
    <filter id="shadow" x="-3%" y="-3%" width="106%" height="106%">
      <feDropShadow dx="1" dy="2" stdDeviation="3" flood-opacity="0.08"/>
    </filter>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#475569"/>
    </marker>
    <marker id="arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#2563eb"/>
    </marker>
    <marker id="arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#059669"/>
    </marker>
    <marker id="arrow-amber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#d97706"/>
    </marker>
    <style>
      text { font-family: 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, Roboto, sans-serif; }
      .title { font-size: 19px; font-weight: 800; fill: #0f172a; }
      .subtitle { font-size: 12.5px; fill: #64748b; font-weight: 500; }
      .card-title { font-size: 13px; font-weight: 700; fill: #0f172a; }
      .label { font-size: 11px; fill: #334155; font-weight: 600; }
      .sublabel { font-size: 9.5px; fill: #64748b; }
      .code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 10px; }
      .badge-text { font-size: 9.5px; font-weight: 700; text-anchor: middle; }
    </style>
  </defs>
`;

// 1. TOPIC 1 - DNS Architecture & Resolution
const svg_dns = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  ${defsCommon}
  <rect width="800" height="500" rx="14" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="400" y="32" text-anchor="middle" class="title">DNS Hierarchy & Resolution Architecture</text>
  <text x="400" y="50" text-anchor="middle" class="subtitle">Distributed Domain Name Space & Recursive vs Iterative Resolution (RFC 1034 / 1035)</text>

  <!-- Left: Domain Name Hierarchy Tree -->
  <rect x="25" y="70" width="370" height="410" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" filter="url(#shadow)"/>
  <text x="40" y="94" class="card-title">1. Hierarchical Domain Name Space</text>
  <text x="40" y="110" class="sublabel">Inverted tree structure organized into administrative zones</text>

  <!-- Root -->
  <rect x="170" y="125" width="80" height="30" rx="6" fill="#0f172a"/>
  <text x="210" y="144" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Root (.)</text>

  <!-- Level 1: TLD -->
  <line x1="210" y1="155" x2="100" y2="185" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="210" y1="155" x2="210" y2="185" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="210" y1="155" x2="320" y2="185" stroke="#94a3b8" stroke-width="1.5"/>

  <rect x="65" y="185" width="70" height="26" rx="5" fill="#2563eb"/>
  <text x="100" y="202" fill="#ffffff" font-size="10.5" font-weight="bold" text-anchor="middle">.com</text>

  <rect x="175" y="185" width="70" height="26" rx="5" fill="#2563eb"/>
  <text x="210" y="202" fill="#ffffff" font-size="10.5" font-weight="bold" text-anchor="middle">.edu</text>

  <rect x="285" y="185" width="70" height="26" rx="5" fill="#2563eb"/>
  <text x="320" y="202" fill="#ffffff" font-size="10.5" font-weight="bold" text-anchor="middle">.org / .in</text>

  <!-- Level 2: Second Level Domains -->
  <line x1="100" y1="211" x2="65" y2="245" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="100" y1="211" x2="135" y2="245" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="210" y1="211" x2="210" y2="245" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="320" y1="211" x2="320" y2="245" stroke="#94a3b8" stroke-width="1.5"/>

  <rect x="35" y="245" width="60" height="24" rx="4" fill="#0d9488"/>
  <text x="65" y="261" fill="#ffffff" font-size="9.5" font-weight="600" text-anchor="middle">google</text>

  <rect x="105" y="245" width="60" height="24" rx="4" fill="#0d9488"/>
  <text x="135" y="261" fill="#ffffff" font-size="9.5" font-weight="600" text-anchor="middle">amazon</text>

  <rect x="180" y="245" width="60" height="24" rx="4" fill="#0d9488"/>
  <text x="210" y="261" fill="#ffffff" font-size="9.5" font-weight="600" text-anchor="middle">pondiuni</text>

  <rect x="290" y="245" width="60" height="24" rx="4" fill="#0d9488"/>
  <text x="320" y="261" fill="#ffffff" font-size="9.5" font-weight="600" text-anchor="middle">wikipedia</text>

  <!-- Level 3: Leaf Nodes / Hostnames -->
  <line x1="65" y1="269" x2="65" y2="300" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="210" y1="269" x2="210" y2="300" stroke="#94a3b8" stroke-width="1.5"/>

  <rect x="35" y="300" width="60" height="22" rx="4" fill="#64748b"/>
  <text x="65" y="315" fill="#ffffff" font-size="9" text-anchor="middle">mail</text>

  <rect x="180" y="300" width="60" height="22" rx="4" fill="#64748b"/>
  <text x="210" y="315" fill="#ffffff" font-size="9" text-anchor="middle">www</text>

  <!-- FQDN vs PQDN explanation box -->
  <rect x="40" y="340" width="340" height="120" rx="8" fill="#f1f5f9"/>
  <text x="50" y="360" font-size="11" font-weight="bold" fill="#0f172a">Key Resource Records (RFC 1035):</text>
  <text x="50" y="380" font-size="10" fill="#334155" class="code">• A: Hostname → IPv4 (e.g. 142.250.190.46)</text>
  <text x="50" y="398" font-size="10" fill="#334155" class="code">• AAAA: Hostname → IPv6 (128-bit address)</text>
  <text x="50" y="416" font-size="10" fill="#334155" class="code">• CNAME: Canonical Name (Alias mapping)</text>
  <text x="50" y="434" font-size="10" fill="#334155" class="code">• MX: Mail Exchange server priority & domain</text>
  <text x="50" y="452" font-size="10" fill="#334155" class="code">• NS: Authoritative Name Server for the zone</text>

  <!-- Right: 8-Step Iterative Resolution Flow -->
  <rect x="410" y="70" width="365" height="410" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" filter="url(#shadow)"/>
  <text x="425" y="94" class="card-title">2. Iterative & Recursive Resolution Flow</text>
  <text x="425" y="110" class="sublabel">Client (Resolver) queries Local DNS Server (Recursive)</text>

  <!-- Client Host -->
  <rect x="425" y="130" width="85" height="42" rx="6" fill="#f8fafc" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="467" y="148" class="label" text-anchor="middle">Client PC</text>
  <text x="467" y="162" class="sublabel" text-anchor="middle">Stub Resolver</text>

  <!-- Local DNS Server -->
  <rect x="425" y="240" width="85" height="45" rx="6" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
  <text x="467" y="258" class="label" fill="#1d4ed8" text-anchor="middle">Local DNS</text>
  <text x="467" y="273" class="sublabel" fill="#1e40af" text-anchor="middle">(Cache/Recursive)</text>

  <!-- Step 1 & 8 between client and local DNS -->
  <path d="M 467 172 L 467 240" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow-blue)"/>
  <text x="473" y="200" font-size="9.5" font-weight="bold" fill="#2563eb">1. Query</text>
  <text x="473" y="215" font-size="9" fill="#059669">8. IP Reply</text>

  <!-- Root Server -->
  <rect x="640" y="130" width="120" height="38" rx="6" fill="#f1f5f9" stroke="#64748b" stroke-width="1.5"/>
  <text x="700" y="147" class="label" text-anchor="middle">Root Server (.)</text>
  <text x="700" y="160" class="sublabel" text-anchor="middle">13 Root Clusters</text>

  <!-- TLD Server -->
  <rect x="640" y="240" width="120" height="38" rx="6" fill="#f1f5f9" stroke="#64748b" stroke-width="1.5"/>
  <text x="700" y="257" class="label" text-anchor="middle">TLD Server (.edu)</text>
  <text x="700" y="270" class="sublabel" text-anchor="middle">Top-Level Domain</text>

  <!-- Authoritative Server -->
  <rect x="640" y="350" width="120" height="38" rx="6" fill="#f1f5f9" stroke="#64748b" stroke-width="1.5"/>
  <text x="700" y="367" class="label" text-anchor="middle">Auth DNS (pondiuni)</text>
  <text x="700" y="380" class="sublabel" text-anchor="middle">Official Records</text>

  <!-- Arrows to Root (2 & 3) -->
  <path d="M 510 245 C 550 200, 580 160, 640 145" fill="none" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arrow)"/>
  <text x="550" y="170" font-size="9" font-weight="bold" fill="#475569">2. Query Root</text>
  <path d="M 640 155 C 580 180, 560 210, 510 252" fill="none" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arrow)"/>
  <text x="565" y="210" font-size="8.5" fill="#475569">3. Refer to .edu</text>

  <!-- Arrows to TLD (4 & 5) -->
  <line x1="510" y1="260" x2="638" y2="255" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arrow)"/>
  <text x="545" y="252" font-size="9" font-weight="bold" fill="#475569">4. Query TLD</text>
  <line x1="640" y1="268" x2="512" y2="273" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arrow)"/>
  <text x="545" y="285" font-size="8.5" fill="#475569">5. Refer to pondiuni</text>

  <!-- Arrows to Auth (6 & 7) -->
  <path d="M 510 280 C 550 310, 580 340, 640 360" fill="none" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arrow)"/>
  <text x="540" y="325" font-size="9" font-weight="bold" fill="#475569">6. Query Auth</text>
  <path d="M 640 372 C 580 360, 550 320, 510 285" fill="none" stroke="#059669" stroke-width="2" marker-end="url(#arrow-green)"/>
  <text x="555" y="355" font-size="9" font-weight="bold" fill="#059669">7. Returns IP!</text>

  <!-- Bottom port badge -->
  <rect x="425" y="420" width="335" height="40" rx="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="1"/>
  <text x="592" y="437" font-size="10" font-weight="bold" fill="#b45309" text-anchor="middle">Port 53: UDP for Standard Queries (< 512 bytes)</text>
  <text x="592" y="451" font-size="9" fill="#92400e" text-anchor="middle">TCP Port 53 used for Zone Transfers (AXFR) and Large Responses (EDNS0)</text>
</svg>`;

// 2. TOPIC 1 - E-Mail Architecture
const svg_email = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  ${defsCommon}
  <rect width="800" height="500" rx="14" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="400" y="32" text-anchor="middle" class="title">Electronic Mail Architecture & Protocol Mechanics</text>
  <text x="400" y="50" text-anchor="middle" class="subtitle">Forouzan Scenario 4: User Agents (UA), Mail Transfer Agents (SMTP), & Access Agents (POP3 / IMAP4)</text>

  <!-- Sender Side Box -->
  <rect x="30" y="75" width="220" height="385" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" filter="url(#shadow)"/>
  <text x="140" y="98" class="card-title" text-anchor="middle">Sender Site (Alice)</text>
  
  <rect x="50" y="120" width="180" height="55" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="140" y="142" class="label" fill="#1e40af" text-anchor="middle">User Agent (UA)</text>
  <text x="140" y="158" class="sublabel" text-anchor="middle">Outlook / Thunderbird / Webmail</text>

  <!-- Arrow UA to Sender MTA -->
  <line x1="140" y1="175" x2="140" y2="230" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow-blue)"/>
  <text x="148" y="205" font-size="9.5" font-weight="bold" fill="#2563eb">SMTP Push (Port 587)</text>

  <rect x="50" y="235" width="180" height="80" rx="8" fill="#f8fafc" stroke="#64748b" stroke-width="1.5"/>
  <text x="140" y="258" class="label" text-anchor="middle">Sending Mail Server</text>
  <text x="140" y="275" class="sublabel" text-anchor="middle">MTA Client (Postfix / Sendmail)</text>
  <text x="140" y="292" font-size="9" fill="#059669" text-anchor="middle">Spool (Outgoing Mail Queue)</text>

  <rect x="50" y="340" width="180" height="100" rx="6" fill="#f1f5f9"/>
  <text x="60" y="358" font-size="10" font-weight="bold" fill="#0f172a">MIME Extension (RFC 2045):</text>
  <text x="60" y="375" font-size="9" fill="#475569">• Non-ASCII Text (UTF-8)</text>
  <text x="60" y="390" font-size="9" fill="#475569">• Audio, Images, Video attachments</text>
  <text x="60" y="405" font-size="9" fill="#475569">• Base64 & Quoted-Printable</text>
  <text x="60" y="420" font-size="9" fill="#475569">• Multipart/mixed boundaries</text>

  <!-- Middle Internet Cloud & Relay -->
  <rect x="290" y="160" width="220" height="180" rx="12" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="6,4"/>
  <text x="400" y="195" font-size="14" font-weight="bold" fill="#1e40af" text-anchor="middle">Public Internet</text>
  <text x="400" y="215" font-size="11" fill="#3b82f6" text-anchor="middle">DNS MX Lookup</text>
  <text x="400" y="232" font-size="9.5" fill="#64748b" text-anchor="middle">Host: recipient-domain.com → Mail IP</text>

  <!-- Big Arrow Sender MTA -> Receiver MTA -->
  <path d="M 230 260 L 285 260" stroke="#059669" stroke-width="2.5" marker-end="url(#arrow-green)"/>
  <path d="M 510 260 L 565 260" stroke="#059669" stroke-width="2.5" marker-end="url(#arrow-green)"/>
  <text x="400" y="280" font-size="12" font-weight="800" fill="#059669" text-anchor="middle">SMTP Relay (Port 25)</text>
  <text x="400" y="295" font-size="9" fill="#475569" text-anchor="middle">Server-to-Server Push Protocol</text>

  <!-- Receiver Side Box -->
  <rect x="550" y="75" width="220" height="385" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" filter="url(#shadow)"/>
  <text x="660" y="98" class="card-title" text-anchor="middle">Receiver Site (Bob)</text>

  <rect x="570" y="225" width="180" height="90" rx="8" fill="#f8fafc" stroke="#64748b" stroke-width="1.5"/>
  <text x="660" y="246" class="label" text-anchor="middle">Receiving Mail Server</text>
  <text x="660" y="262" class="sublabel" text-anchor="middle">MTA Server (Listens on Port 25)</text>
  <rect x="585" y="272" width="150" height="28" rx="4" fill="#fef3c7" stroke="#f59e0b"/>
  <text x="660" y="289" font-size="9.5" font-weight="bold" fill="#b45309" text-anchor="middle">Bob's Mailbox (Stored on Disk)</text>

  <!-- Arrow Receiver MTA down to Bob's UA (Pull) -->
  <line x1="660" y1="315" x2="660" y2="368" stroke="#d97706" stroke-width="2" marker-end="url(#arrow-amber)"/>
  <text x="668" y="345" font-size="9.5" font-weight="bold" fill="#d97706">Pull Protocols (MAA)</text>

  <rect x="570" y="375" width="180" height="55" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="660" y="396" class="label" fill="#b45309" text-anchor="middle">User Agent (Bob)</text>
  <text x="660" y="414" class="sublabel" text-anchor="middle">Pulls Mail on Demand</text>

  <!-- Protocol Comparison Footer on Right -->
  <rect x="290" y="360" width="220" height="100" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
  <text x="400" y="380" font-size="10.5" font-weight="bold" fill="#0f172a" text-anchor="middle">POP3 vs IMAP4</text>
  <text x="305" y="400" font-size="9" fill="#334155"><tspan font-weight="bold">POP3 (Port 110/995):</tspan> Download &amp; delete</text>
  <text x="305" y="415" font-size="8.5" fill="#64748b">Single device, offline storage</text>
  <text x="305" y="433" font-size="9" fill="#334155"><tspan font-weight="bold">IMAP4 (Port 143/993):</tspan> Server-sync folders</text>
  <text x="305" y="448" font-size="8.5" fill="#64748b">Multi-device sync, server search</text>
</svg>`;

// 3. TOPIC 1 - WWW Architecture
const svg_www = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  ${defsCommon}
  <rect width="800" height="500" rx="14" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="400" y="32" text-anchor="middle" class="title">World Wide Web (WWW) Client-Server Architecture</text>
  <text x="400" y="50" text-anchor="middle" class="subtitle">Distributed Hypermedia: Browsers, URLs, Web Documents (Static, Dynamic, Active) &amp; HTTP Transport</text>

  <!-- Browser Anatomy (Left) -->
  <rect x="30" y="75" width="260" height="385" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" filter="url(#shadow)"/>
  <text x="160" y="100" class="card-title" text-anchor="middle">Web Browser Architecture</text>
  <text x="160" y="116" class="sublabel" text-anchor="middle">Client Software Stack</text>

  <rect x="45" y="130" width="230" height="40" rx="6" fill="#eff6ff" stroke="#3b82f6"/>
  <text x="160" y="154" class="label" fill="#1e40af" text-anchor="middle">User Interface (GUI &amp; Address Bar)</text>

  <rect x="45" y="180" width="230" height="40" rx="6" fill="#f8fafc" stroke="#64748b"/>
  <text x="160" y="204" class="label" text-anchor="middle">Browser Controller / Engine</text>

  <rect x="45" y="230" width="230" height="55" rx="6" fill="#f0fdf4" stroke="#16a34a"/>
  <text x="160" y="252" class="label" fill="#15803d" text-anchor="middle">Rendering &amp; Interpreter Engine</text>
  <text x="160" y="269" class="sublabel" text-anchor="middle">HTML5 DOM Parser • CSS Styling • JS V8 Engine</text>

  <rect x="45" y="295" width="230" height="45" rx="6" fill="#fef3c7" stroke="#f59e0b"/>
  <text x="160" y="316" class="label" fill="#b45309" text-anchor="middle">Client Protocols Layer</text>
  <text x="160" y="331" class="sublabel" text-anchor="middle">HTTP • HTTPS (TLS) • FTP • WebSocket</text>

  <rect x="45" y="350" width="230" height="40" rx="6" fill="#f1f5f9" stroke="#94a3b8"/>
  <text x="160" y="374" class="label" text-anchor="middle">Local Web Cache &amp; Cookies Storage</text>

  <rect x="45" y="400" width="230" height="45" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="160" y="419" font-size="9" fill="#475569" text-anchor="middle">Operating System Sockets (TCP/IP Port 80/443)</text>
  <text x="160" y="433" font-size="8.5" fill="#64748b" text-anchor="middle">Network Interface Controller (NIC)</text>

  <!-- URL Structure Card (Middle Top) -->
  <rect x="310" y="75" width="460" height="90" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" filter="url(#shadow)"/>
  <text x="540" y="98" class="card-title" text-anchor="middle">Uniform Resource Locator (URL) Anatomy (RFC 3986)</text>
  
  <rect x="325" y="112" width="430" height="38" rx="6" fill="#0f172a"/>
  <text x="335" y="135" class="code" fill="#38bdf8" font-size="11">https://</text>
  <text x="385" y="135" class="code" fill="#4ade80" font-size="11">www.pondiuni.edu.in</text>
  <text x="535" y="135" class="code" fill="#facc15" font-size="11">:443</text>
  <text x="568" y="135" class="code" fill="#f43f5e" font-size="11">/cs/syllabus.html</text>
  <text x="685" y="135" class="code" fill="#c084fc" font-size="11">?unit=5</text>

  <!-- Middle Center: Interaction Flow -->
  <path d="M 275 250 L 515 250" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrow-blue)"/>
  <text x="395" y="240" font-size="11" font-weight="bold" fill="#2563eb" text-anchor="middle">HTTP GET Request →</text>

  <path d="M 515 280 L 275 280" stroke="#059669" stroke-width="2.5" marker-end="url(#arrow-green)"/>
  <text x="395" y="300" font-size="11" font-weight="bold" fill="#059669" text-anchor="middle">← HTTP 200 OK + HTML Payload</text>

  <!-- Web Server Anatomy (Right) -->
  <rect x="520" y="180" width="250" height="280" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" filter="url(#shadow)"/>
  <text x="645" y="205" class="card-title" text-anchor="middle">Web Server Architecture</text>
  <text x="645" y="220" class="sublabel" text-anchor="middle">Apache / Nginx / Node.js</text>

  <rect x="535" y="235" width="220" height="40" rx="6" fill="#eff6ff" stroke="#3b82f6"/>
  <text x="645" y="255" class="label" fill="#1e40af" text-anchor="middle">HTTP Listener (Port 80/443)</text>
  <text x="645" y="268" class="sublabel" text-anchor="middle">Worker Threads / Event Loop</text>

  <!-- Three Document Types -->
  <rect x="535" y="285" width="220" height="38" rx="6" fill="#f0fdf4" stroke="#16a34a"/>
  <text x="645" y="302" class="label" fill="#15803d" text-anchor="middle">1. Static Documents</text>
  <text x="645" y="315" class="sublabel" text-anchor="middle">Pre-stored static HTML, CSS, Images</text>

  <rect x="535" y="330" width="220" height="38" rx="6" fill="#fef3c7" stroke="#f59e0b"/>
  <text x="645" y="347" class="label" fill="#b45309" text-anchor="middle">2. Dynamic Documents</text>
  <text x="645" y="360" class="sublabel" text-anchor="middle">Server-Side CGI / PHP / Python / DB Queries</text>

  <rect x="535" y="375" width="220" height="38" rx="6" fill="#f5f3ff" stroke="#7c3aed"/>
  <text x="645" y="392" class="label" fill="#6d28d9" text-anchor="middle">3. Active Documents</text>
  <text x="645" y="405" class="sublabel" text-anchor="middle">Transmitted to client &amp; executed (JS / WASM)</text>

  <rect x="535" y="420" width="220" height="30" rx="4" fill="#0f172a"/>
  <text x="645" y="439" fill="#38bdf8" font-size="9.5" text-anchor="middle" class="code">Database / Disk File System</text>
</svg>`;

// 4. TOPIC 2 - HTTP Architecture
const svg_http_arch = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  ${defsCommon}
  <rect width="800" height="500" rx="14" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="400" y="32" text-anchor="middle" class="title">HTTP Architecture &amp; Protocol Stack</text>
  <text x="400" y="50" text-anchor="middle" class="subtitle">Client-Server Protocol, Statelessness, TLS Encryption &amp; Transport Abstraction</text>

  <!-- Left: Protocol Stack Layering -->
  <rect x="30" y="75" width="340" height="385" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" filter="url(#shadow)"/>
  <text x="200" y="100" class="card-title" text-anchor="middle">HTTP in the Internet Protocol Suite</text>
  
  <!-- App Layer -->
  <rect x="50" y="120" width="300" height="50" rx="6" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
  <text x="200" y="142" font-size="12" font-weight="bold" fill="#1e40af" text-anchor="middle">Application Layer: HTTP / HTTPS</text>
  <text x="200" y="158" font-size="9.5" fill="#3b82f6" text-anchor="middle">HTTP/1.1 (Text) • HTTP/2 (Multiplexed) • HTTP/3 (QUIC)</text>

  <!-- Security Layer (Optional TLS) -->
  <rect x="50" y="180" width="300" height="42" rx="6" fill="#fdf2f8" stroke="#db2777" stroke-width="1.5"/>
  <text x="200" y="202" font-size="11" font-weight="bold" fill="#9d174d" text-anchor="middle">TLS 1.3 Encryption Layer (HTTPS Port 443)</text>
  <text x="200" y="215" font-size="9" fill="#be185d" text-anchor="middle">Confidentiality, Server Authentication &amp; Message Integrity</text>

  <!-- Transport Layer -->
  <rect x="50" y="232" width="300" height="45" rx="6" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5"/>
  <text x="200" y="254" font-size="11" font-weight="bold" fill="#15803d" text-anchor="middle">Transport Layer: TCP (Port 80/443) / UDP (QUIC 443)</text>
  <text x="200" y="268" font-size="9" fill="#166534" text-anchor="middle">Reliable 3-Way Handshake • Flow Control • Retransmission</text>

  <!-- Network Layer -->
  <rect x="50" y="287" width="300" height="45" rx="6" fill="#f8fafc" stroke="#64748b" stroke-width="1.5"/>
  <text x="200" y="309" font-size="11" font-weight="bold" fill="#334155" text-anchor="middle">Network Layer: IPv4 / IPv6</text>
  <text x="200" y="323" font-size="9" fill="#64748b" text-anchor="middle">Host-to-Host Datagram Routing across Internet Routers</text>

  <!-- Data Link & Physical -->
  <rect x="50" y="342" width="300" height="45" rx="6" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="200" y="364" font-size="11" font-weight="bold" fill="#475569" text-anchor="middle">Data Link &amp; Physical Layers</text>
  <text x="200" y="378" font-size="9" fill="#64748b" text-anchor="middle">Ethernet 802.3 • Wi-Fi 802.11 • Optical Fiber</text>

  <!-- Key characteristics summary box -->
  <rect x="50" y="400" width="300" height="50" rx="6" fill="#fef3c7" stroke="#f59e0b"/>
  <text x="200" y="420" font-size="10" font-weight="bold" fill="#b45309" text-anchor="middle">⚡ Stateless Nature of HTTP:</text>
  <text x="200" y="438" font-size="8.5" fill="#92400e" text-anchor="middle">Server retains no session memory; Cookies &amp; JWTs maintain state.</text>

  <!-- Right: HTTP Evolution & Architecture Components -->
  <rect x="390" y="75" width="380" height="385" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" filter="url(#shadow)"/>
  <text x="580" y="100" class="card-title" text-anchor="middle">HTTP Protocol Evolution</text>

  <!-- HTTP/1.0 -->
  <rect x="410" y="120" width="340" height="65" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="425" y="140" font-size="11" font-weight="bold" fill="#0f172a">HTTP/1.0 (RFC 1945 - Non-Persistent)</text>
  <text x="425" y="157" font-size="9.5" fill="#475569">• Opens a new TCP connection for every single inline web asset</text>
  <text x="425" y="172" font-size="9.5" fill="#dc2626">• Severe performance penalty: 2 RTT overhead per image/script</text>

  <!-- HTTP/1.1 -->
  <rect x="410" y="195" width="340" height="75" rx="8" fill="#eff6ff" stroke="#93c5fd"/>
  <text x="425" y="215" font-size="11" font-weight="bold" fill="#1e40af">HTTP/1.1 (RFC 2616 / 7230 - Persistent)</text>
  <text x="425" y="232" font-size="9.5" fill="#334155">• Default persistent TCP connections (<tspan class="code">Connection: keep-alive</tspan>)</text>
  <text x="425" y="247" font-size="9.5" fill="#334155">• Pipelining support &amp; mandatory <tspan class="code">Host:</tspan> header for virtual hosting</text>
  <text x="425" y="262" font-size="9.5" fill="#d97706">• Bottleneck: Head-of-Line (HoL) blocking at application level</text>

  <!-- HTTP/2 -->
  <rect x="410" y="280" width="340" height="80" rx="8" fill="#f0fdf4" stroke="#86efac"/>
  <text x="425" y="300" font-size="11" font-weight="bold" fill="#15803d">HTTP/2 (RFC 7540 - Binary Multiplexing)</text>
  <text x="425" y="317" font-size="9.5" fill="#334155">• Fully binary framing layer (DATA, HEADERS, SETTINGS)</text>
  <text x="425" y="332" font-size="9.5" fill="#334155">• Multiplexes dozens of concurrent streams over ONE TCP socket</text>
  <text x="425" y="347" font-size="9.5" fill="#059669">• HPACK header compression &amp; Server Push capabilities</text>

  <!-- HTTP/3 -->
  <rect x="410" y="370" width="340" height="75" rx="8" fill="#faf5ff" stroke="#d8b4fe"/>
  <text x="425" y="390" font-size="11" font-weight="bold" fill="#6d28d9">HTTP/3 (RFC 9114 - QUIC over UDP)</text>
  <text x="425" y="407" font-size="9.5" fill="#334155">• Replaces TCP with QUIC transport protocol running over UDP</text>
  <text x="425" y="422" font-size="9.5" fill="#334155">• Eliminates TCP Head-of-Line packet loss blocking</text>
  <text x="425" y="437" font-size="9.5" fill="#7c3aed">• 0-RTT connection resumption with integrated TLS 1.3 encryption</text>
</svg>`;

// 5. TOPIC 2 - HTTP Request & Response
const svg_http_req_res = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  ${defsCommon}
  <rect width="800" height="500" rx="14" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="400" y="32" text-anchor="middle" class="title">HTTP Request and Response Message Formats</text>
  <text x="400" y="50" text-anchor="middle" class="subtitle">Complete RFC 7230 / Forouzan Ch. 27 ASCII Transaction Structure</text>

  <!-- Left: Request Message -->
  <rect x="25" y="70" width="365" height="410" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" filter="url(#shadow)"/>
  <text x="207" y="94" class="card-title" text-anchor="middle">HTTP Request Message Format</text>
  <text x="207" y="110" class="sublabel" text-anchor="middle">Client (Browser) → Web Server</text>

  <!-- Request Line Box -->
  <rect x="40" y="125" width="335" height="50" rx="6" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
  <text x="50" y="143" font-size="10.5" font-weight="bold" fill="#1e40af">1. Request-Line (Method + URI + Version):</text>
  <text x="50" y="162" class="code" fill="#0f172a" font-weight="bold">GET /api/v1/students?dept=cse HTTP/1.1\r\n</text>

  <!-- Request Headers Box -->
  <rect x="40" y="185" width="335" height="150" rx="6" fill="#f8fafc" stroke="#94a3b8"/>
  <text x="50" y="204" font-size="10.5" font-weight="bold" fill="#0f172a">2. Header Lines (Key: Value pairs):</text>
  <text x="50" y="224" class="code" fill="#334155">Host: www.pondiuni.edu.in\r\n</text>
  <text x="50" y="240" class="code" fill="#334155">User-Agent: Mozilla/5.0 (Windows NT 10.0)\r\n</text>
  <text x="50" y="256" class="code" fill="#334155">Accept: text/html,application/json\r\n</text>
  <text x="50" y="272" class="code" fill="#334155">Accept-Encoding: gzip, deflate, br\r\n</text>
  <text x="50" y="288" class="code" fill="#334155">Connection: keep-alive\r\n</text>
  <text x="50" y="304" class="code" fill="#334155">Cookie: session_token=xyz987654321\r\n</text>
  <text x="50" y="320" class="code" fill="#059669">If-Modified-Since: Tue, 03 Nov 2026 12:00:00 GMT\r\n</text>

  <!-- Blank line indicator -->
  <rect x="40" y="342" width="335" height="26" rx="4" fill="#fee2e2" stroke="#f87171"/>
  <text x="207" y="359" font-size="10" font-weight="bold" fill="#b91c1c" text-anchor="middle">3. Blank Line Carriage Return + Line Feed (\r\n)</text>

  <!-- Body -->
  <rect x="40" y="375" width="335" height="90" rx="6" fill="#f1f5f9" stroke="#cbd5e1"/>
  <text x="50" y="394" font-size="10" font-weight="bold" fill="#0f172a">4. Entity Body (Optional, used in POST/PUT):</text>
  <text x="50" y="414" class="code" fill="#475569">{ "regNo": "2201501", "name": "Akin" }</text>
  <text x="50" y="435" font-size="8.5" fill="#64748b">(Empty in standard GET, HEAD, and DELETE requests)</text>

  <!-- Right: Response Message -->
  <rect x="410" y="70" width="365" height="410" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" filter="url(#shadow)"/>
  <text x="592" y="94" class="card-title" text-anchor="middle">HTTP Response Message Format</text>
  <text x="592" y="110" class="sublabel" text-anchor="middle">Web Server → Client (Browser)</text>

  <!-- Status Line Box -->
  <rect x="425" y="125" width="335" height="50" rx="6" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5"/>
  <text x="435" y="143" font-size="10.5" font-weight="bold" fill="#15803d">1. Status-Line (Version + Status Code + Phrase):</text>
  <text x="435" y="162" class="code" fill="#059669" font-weight="bold">HTTP/1.1 200 OK\r\n</text>

  <!-- Response Headers Box -->
  <rect x="425" y="185" width="335" height="150" rx="6" fill="#f8fafc" stroke="#94a3b8"/>
  <text x="435" y="204" font-size="10.5" font-weight="bold" fill="#0f172a">2. Header Lines (Response Metadata):</text>
  <text x="435" y="224" class="code" fill="#334155">Date: Tue, 03 Nov 2026 15:30:00 GMT\r\n</text>
  <text x="435" y="240" class="code" fill="#334155">Server: Apache/2.4.54 (Ubuntu)\r\n</text>
  <text x="435" y="256" class="code" fill="#334155">Content-Type: text/html; charset=UTF-8\r\n</text>
  <text x="435" y="272" class="code" fill="#334155">Content-Length: 4826\r\n</text>
  <text x="435" y="288" class="code" fill="#334155">Set-Cookie: user_auth=abcdef123; Secure; HttpOnly\r\n</text>
  <text x="435" y="304" class="code" fill="#334155">Cache-Control: max-age=3600, public\r\n</text>
  <text x="435" y="320" class="code" fill="#334155">ETag: "686897696a7c876b7e"\r\n</text>

  <!-- Blank line indicator -->
  <rect x="425" y="342" width="335" height="26" rx="4" fill="#fee2e2" stroke="#f87171"/>
  <text x="592" y="359" font-size="10" font-weight="bold" fill="#b91c1c" text-anchor="middle">3. Blank Line Carriage Return + Line Feed (\r\n)</text>

  <!-- Body -->
  <rect x="425" y="375" width="335" height="90" rx="6" fill="#f0fdf4" stroke="#86efac"/>
  <text x="435" y="394" font-size="10" font-weight="bold" fill="#15803d">4. Entity Body (Delivered Web Content):</text>
  <text x="435" y="414" class="code" fill="#166534">&lt;!DOCTYPE html&gt;&lt;html&gt;&lt;head&gt;&lt;title&gt;Unit 5&lt;/title&gt;...</text>
  <text x="435" y="435" font-size="8.5" fill="#15803d">(Delivers HTML, JSON, CSS, images or binary blobs)</text>
</svg>`;

// 6. TOPIC 2 - Working of HTTP
const svg_http_working = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  ${defsCommon}
  <rect width="800" height="500" rx="14" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="400" y="32" text-anchor="middle" class="title">Working of HTTP: Persistent vs Non-Persistent Connections</text>
  <text x="400" y="50" text-anchor="middle" class="subtitle">Round Trip Time (RTT) Analysis, Pipelining Mechanics &amp; Web Caching</text>

  <!-- Left: Non-Persistent HTTP (HTTP/1.0) -->
  <rect x="25" y="70" width="365" height="410" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" filter="url(#shadow)"/>
  <text x="207" y="95" class="card-title" text-anchor="middle">1. Non-Persistent Connection (HTTP/1.0)</text>
  <text x="207" y="112" class="sublabel" text-anchor="middle">Separate TCP socket created &amp; closed for each object</text>

  <!-- Timelines: Client and Server -->
  <line x1="100" y1="130" x2="100" y2="400" stroke="#94a3b8" stroke-width="2"/>
  <line x1="310" y1="130" x2="310" y2="400" stroke="#94a3b8" stroke-width="2"/>
  <text x="100" y="125" class="label" text-anchor="middle">Client</text>
  <text x="310" y="125" class="label" text-anchor="middle">Server</text>

  <!-- Handshake 1 -->
  <line x1="100" y1="145" x2="310" y2="170" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#arrow-blue)"/>
  <text x="205" y="152" font-size="8.5" fill="#2563eb" text-anchor="middle">TCP SYN</text>

  <line x1="310" y1="170" x2="100" y2="195" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#arrow-blue)"/>
  <text x="205" y="180" font-size="8.5" fill="#2563eb" text-anchor="middle">SYN + ACK (1 RTT)</text>

  <!-- Request Object 1 -->
  <line x1="100" y1="205" x2="310" y2="230" stroke="#059669" stroke-width="1.5" marker-end="url(#arrow-green)"/>
  <text x="205" y="215" font-size="8.5" fill="#059669" text-anchor="middle">GET index.html</text>

  <line x1="310" y1="230" x2="100" y2="255" stroke="#059669" stroke-width="1.5" marker-end="url(#arrow-green)"/>
  <text x="205" y="243" font-size="8.5" fill="#059669" text-anchor="middle">200 OK + HTML (1 RTT)</text>

  <!-- Close 1 -->
  <text x="205" y="270" font-size="8.5" fill="#dc2626" font-style="italic" text-anchor="middle">TCP Connection Closed</text>
  <line x1="80" y1="275" x2="330" y2="275" stroke="#fca5a5" stroke-dasharray="3,3"/>

  <!-- Handshake 2 for Image -->
  <line x1="100" y1="290" x2="310" y2="315" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#arrow-blue)"/>
  <text x="205" y="298" font-size="8.5" fill="#2563eb" text-anchor="middle">TCP SYN (2nd Object)</text>

  <line x1="310" y1="315" x2="100" y2="340" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#arrow-blue)"/>
  <text x="205" y="325" font-size="8.5" fill="#2563eb" text-anchor="middle">SYN + ACK</text>

  <line x1="100" y1="345" x2="310" y2="370" stroke="#059669" stroke-width="1.5" marker-end="url(#arrow-green)"/>
  <text x="205" y="355" font-size="8.5" fill="#059669" text-anchor="middle">GET logo.png</text>

  <line x1="310" y1="370" x2="100" y2="395" stroke="#059669" stroke-width="1.5" marker-end="url(#arrow-green)"/>
  <text x="205" y="385" font-size="8.5" fill="#059669" text-anchor="middle">200 OK + PNG</text>

  <rect x="40" y="420" width="335" height="45" rx="6" fill="#fee2e2" stroke="#f87171"/>
  <text x="207" y="437" font-size="10" font-weight="bold" fill="#b91c1c" text-anchor="middle">Total Delay for N Objects = N × (2 RTT + Trans)</text>
  <text x="207" y="452" font-size="8.5" fill="#7f1d1d" text-anchor="middle">Heavy server overhead from opening/closing dozens of TCP sockets</text>

  <!-- Right: Persistent HTTP with Pipelining (HTTP/1.1) -->
  <rect x="410" y="70" width="365" height="410" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" filter="url(#shadow)"/>
  <text x="592" y="95" class="card-title" text-anchor="middle">2. Persistent Connection with Pipelining (HTTP/1.1)</text>
  <text x="592" y="112" class="sublabel" text-anchor="middle">All assets transferred over a single long-lived TCP socket</text>

  <!-- Timelines: Client and Server -->
  <line x1="485" y1="130" x2="485" y2="400" stroke="#94a3b8" stroke-width="2"/>
  <line x1="700" y1="130" x2="700" y2="400" stroke="#94a3b8" stroke-width="2"/>
  <text x="485" y="125" class="label" text-anchor="middle">Client</text>
  <text x="700" y="125" class="label" text-anchor="middle">Server</text>

  <!-- Single Handshake -->
  <line x1="485" y1="145" x2="700" y2="170" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#arrow-blue)"/>
  <text x="592" y="152" font-size="8.5" fill="#2563eb" text-anchor="middle">TCP SYN (Only ONCE!)</text>

  <line x1="700" y1="170" x2="485" y2="195" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#arrow-blue)"/>
  <text x="592" y="180" font-size="8.5" fill="#2563eb" text-anchor="middle">SYN + ACK (1 RTT)</text>

  <!-- Request 1 -->
  <line x1="485" y1="205" x2="700" y2="230" stroke="#059669" stroke-width="1.5" marker-end="url(#arrow-green)"/>
  <text x="592" y="215" font-size="8.5" fill="#059669" text-anchor="middle">GET index.html</text>

  <!-- Pipelined Requests 2 & 3 without waiting! -->
  <line x1="485" y1="225" x2="700" y2="250" stroke="#d97706" stroke-width="1.5" marker-end="url(#arrow-amber)"/>
  <text x="592" y="235" font-size="8.5" fill="#d97706" text-anchor="middle">GET style.css (Pipelined)</text>

  <line x1="485" y1="245" x2="700" y2="270" stroke="#7c3aed" stroke-width="1.5" marker-end="url(#arrow)"/>
  <text x="592" y="255" font-size="8.5" fill="#7c3aed" text-anchor="middle">GET script.js (Pipelined)</text>

  <!-- Server sends back-to-back responses -->
  <line x1="700" y1="275" x2="485" y2="300" stroke="#059669" stroke-width="1.5" marker-end="url(#arrow-green)"/>
  <text x="592" y="285" font-size="8.5" fill="#059669" text-anchor="middle">200 OK HTML</text>

  <line x1="700" y1="305" x2="485" y2="330" stroke="#d97706" stroke-width="1.5" marker-end="url(#arrow-amber)"/>
  <text x="592" y="315" font-size="8.5" fill="#d97706" text-anchor="middle">200 OK CSS</text>

  <line x1="700" y1="335" x2="485" y2="360" stroke="#7c3aed" stroke-width="1.5" marker-end="url(#arrow)"/>
  <text x="592" y="345" font-size="8.5" fill="#7c3aed" text-anchor="middle">200 OK JS</text>

  <rect x="425" y="420" width="335" height="45" rx="6" fill="#f0fdf4" stroke="#86efac"/>
  <text x="592" y="437" font-size="10" font-weight="bold" fill="#15803d" text-anchor="middle">Total Delay = 1 RTT (Handshake) + 1 RTT (HTML) + N × (Trans)</text>
  <text x="592" y="452" font-size="8.5" fill="#166534" text-anchor="middle">Dramatic speedup: Low TCP slow-start overhead, highly efficient</text>
</svg>`;

// Save Topic 1 and Topic 2 SVGs
saveSvg('assets/images/unit5/topic1/dns-architecture-resolution.svg', svg_dns);
saveSvg('assets/images/unit5/topic1/email-architecture-flow.svg', svg_email);
saveSvg('assets/images/unit5/topic1/www-architecture.svg', svg_www);
saveSvg('assets/images/unit5/topic2/http-protocol-architecture.svg', svg_http_arch);
saveSvg('assets/images/unit5/topic2/http-request-response-cycle.svg', svg_http_req_res);
saveSvg('assets/images/unit5/topic2/http-working-persistent.svg', svg_http_working);

