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
    <marker id="arrow-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#dc2626"/>
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

// 7. TOPIC 3 - Content Delivery Networks (CDN)
const svg_cdn = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  ${defsCommon}
  <rect width="800" height="500" rx="14" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="400" y="32" text-anchor="middle" class="title">Content Delivery Network (CDN) Global Architecture</text>
  <text x="400" y="50" text-anchor="middle" class="subtitle">Edge Caching, Anycast DNS Routing, Origin Offload &amp; Latency Minimization</text>

  <!-- Origin Server (Left) -->
  <rect x="30" y="80" width="200" height="380" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" filter="url(#shadow)"/>
  <text x="130" y="105" class="card-title" text-anchor="middle">Origin Data Center</text>
  <text x="130" y="120" class="sublabel" text-anchor="middle">Primary Source of Truth</text>

  <rect x="45" y="140" width="170" height="60" rx="6" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
  <text x="130" y="165" class="label" fill="#1e40af" text-anchor="middle">🖥️ Origin Web Server</text>
  <text x="130" y="182" class="sublabel" text-anchor="middle">Master Database &amp; App Code</text>

  <rect x="45" y="220" width="170" height="110" rx="6" fill="#f1f5f9"/>
  <text x="55" y="240" font-size="10" font-weight="bold" fill="#0f172a">Origin Responsibilities:</text>
  <text x="55" y="258" font-size="9" fill="#475569">• Dynamic API transactions</text>
  <text x="55" y="274" font-size="9" fill="#475569">• Master asset storage</text>
  <text x="55" y="290" font-size="9" fill="#475569">• Cache-Control headers</text>
  <text x="55" y="306" font-size="9" fill="#475569">• Cache invalidation / purge</text>

  <!-- Without CDN Callout -->
  <rect x="45" y="350" width="170" height="90" rx="6" fill="#fee2e2" stroke="#f87171"/>
  <text x="130" y="372" font-size="10" font-weight="bold" fill="#b91c1c" text-anchor="middle">Without CDN:</text>
  <text x="130" y="390" font-size="9" fill="#7f1d1d" text-anchor="middle">Every user hits Origin directly</text>
  <text x="130" y="407" font-size="9" fill="#7f1d1d" text-anchor="middle">High latency (200ms+)</text>
  <text x="130" y="424" font-size="9" fill="#b91c1c" font-weight="bold" text-anchor="middle">Server crashes under spikes!</text>

  <!-- Middle: CDN Global Edge Mesh -->
  <rect x="250" y="80" width="310" height="380" rx="10" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5" filter="url(#shadow)"/>
  <text x="405" y="105" class="card-title" fill="#15803d" text-anchor="middle">Distributed CDN Edge PoPs</text>
  <text x="405" y="122" class="sublabel" text-anchor="middle">Points of Presence (PoPs) at ISP Edges Worldwide</text>

  <!-- Edge Node 1: North America -->
  <rect x="270" y="140" width="270" height="60" rx="8" fill="#ffffff" stroke="#16a34a" stroke-width="1.5"/>
  <text x="285" y="162" class="label" fill="#15803d">PoP 1 (New York / London)</text>
  <text x="285" y="178" class="sublabel">Edge Caching Proxy • SSD Tier • TLS Offloader</text>
  <rect x="460" y="152" width="65" height="22" rx="4" fill="#dcfce7"/>
  <text x="492" y="167" font-size="9" font-weight="bold" fill="#15803d" text-anchor="middle">10ms Latency</text>

  <!-- Edge Node 2: Asia Pacific -->
  <rect x="270" y="220" width="270" height="60" rx="8" fill="#ffffff" stroke="#16a34a" stroke-width="1.5"/>
  <text x="285" y="242" class="label" fill="#15803d">PoP 2 (Mumbai / Singapore)</text>
  <text x="285" y="258" class="sublabel">Edge Caching Proxy • Video Streaming Cache</text>
  <rect x="460" y="232" width="65" height="22" rx="4" fill="#dcfce7"/>
  <text x="492" y="247" font-size="9" font-weight="bold" fill="#15803d" text-anchor="middle">12ms Latency</text>

  <!-- Edge Node 3: Europe -->
  <rect x="270" y="300" width="270" height="60" rx="8" fill="#ffffff" stroke="#16a34a" stroke-width="1.5"/>
  <text x="285" y="322" class="label" fill="#15803d">PoP 3 (Frankfurt / Tokyo)</text>
  <text x="285" y="338" class="sublabel">Edge Caching Proxy • DDoS Shield • Image Optimization</text>
  <rect x="460" y="312" width="65" height="22" rx="4" fill="#dcfce7"/>
  <text x="492" y="327" font-size="9" font-weight="bold" fill="#15803d" text-anchor="middle">15ms Latency</text>

  <!-- Cache fill arrow from origin to Edge -->
  <path d="M 230 170 L 265 170" stroke="#059669" stroke-width="2" marker-end="url(#arrow-green)"/>
  <text x="248" y="163" font-size="8" fill="#059669" text-anchor="middle">Cache Fill</text>

  <!-- CDN Benefits box -->
  <rect x="270" y="380" width="270" height="65" rx="6" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="405" y="400" font-size="10" font-weight="bold" fill="#0f172a" text-anchor="middle">Key Performance Metrics:</text>
  <text x="405" y="417" font-size="9" fill="#059669" font-weight="bold" text-anchor="middle">✓ 90%+ Cache Hit Ratio  •  ✓ 85% Origin Traffic Offload</text>
  <text x="405" y="432" font-size="8.5" fill="#475569" text-anchor="middle">Geo-DNS / Anycast BGP routes client to topologically nearest PoP</text>

  <!-- Right: End Users -->
  <rect x="580" y="80" width="190" height="380" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" filter="url(#shadow)"/>
  <text x="675" y="105" class="card-title" text-anchor="middle">Global Users</text>
  <text x="675" y="120" class="sublabel" text-anchor="middle">Worldwide Visitors</text>

  <rect x="600" y="145" width="150" height="48" rx="6" fill="#f8fafc" stroke="#3b82f6"/>
  <text x="675" y="166" class="label" text-anchor="middle">📱 User A (USA)</text>
  <text x="675" y="180" class="sublabel" text-anchor="middle">Queries Nearest PoP 1</text>
  <path d="M 600 170 L 545 170" stroke="#2563eb" stroke-width="1.5" marker-end="url(#arrow-blue)"/>

  <rect x="600" y="225" width="150" height="48" rx="6" fill="#f8fafc" stroke="#3b82f6"/>
  <text x="675" y="246" class="label" text-anchor="middle">💻 User B (India)</text>
  <text x="675" y="260" class="sublabel" text-anchor="middle">Queries Nearest PoP 2</text>
  <path d="M 600 250 L 545 250" stroke="#2563eb" stroke-width="1.5" marker-end="url(#arrow-blue)"/>

  <rect x="600" y="305" width="150" height="48" rx="6" fill="#f8fafc" stroke="#3b82f6"/>
  <text x="675" y="326" class="label" text-anchor="middle">🖥️ User C (Japan)</text>
  <text x="675" y="340" class="sublabel" text-anchor="middle">Queries Nearest PoP 3</text>
  <path d="M 600 330 L 545 330" stroke="#2563eb" stroke-width="1.5" marker-end="url(#arrow-blue)"/>

  <rect x="600" y="380" width="150" height="65" rx="6" fill="#f1f5f9"/>
  <text x="675" y="400" font-size="9.5" font-weight="bold" fill="#0f172a" text-anchor="middle">Industry CDNs:</text>
  <text x="675" y="416" font-size="9" fill="#475569" text-anchor="middle">Cloudflare • Akamai</text>
  <text x="675" y="432" font-size="9" fill="#475569" text-anchor="middle">Fastly • AWS CloudFront</text>
</svg>`;

// 8. TOPIC 3 - Server Farms
const svg_server_farms = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  ${defsCommon}
  <rect width="800" height="500" rx="14" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="400" y="32" text-anchor="middle" class="title">Server Farm &amp; Data Center Web Architecture</text>
  <text x="400" y="50" text-anchor="middle" class="subtitle">Multi-Tier Architecture, Layer 4 / Layer 7 Load Balancing &amp; High Availability Clustering</text>

  <!-- Incoming Traffic (Left) -->
  <rect x="25" y="160" width="110" height="160" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" filter="url(#shadow)"/>
  <text x="80" y="185" class="card-title" text-anchor="middle">Clients</text>
  <text x="80" y="210" font-size="10" fill="#475569" text-anchor="middle">Tens of thousands</text>
  <text x="80" y="225" font-size="10" fill="#475569" text-anchor="middle">of concurrent</text>
  <text x="80" y="240" font-size="10" fill="#475569" text-anchor="middle">HTTP/HTTPS</text>
  <text x="80" y="255" font-size="10" fill="#475569" text-anchor="middle">requests</text>
  <path d="M 80 270 L 80 300" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow-blue)"/>

  <!-- Border Firewall & Routers -->
  <rect x="170" y="140" width="90" height="200" rx="8" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5"/>
  <text x="215" y="170" font-size="11" font-weight="bold" fill="#b91c1c" text-anchor="middle">Perimeter</text>
  <text x="215" y="186" font-size="11" font-weight="bold" fill="#b91c1c" text-anchor="middle">Firewall</text>
  <text x="215" y="220" font-size="9" fill="#7f1d1d" text-anchor="middle">DDoS Filter</text>
  <text x="215" y="240" font-size="9" fill="#7f1d1d" text-anchor="middle">BGP Routers</text>
  <text x="215" y="260" font-size="9" fill="#7f1d1d" text-anchor="middle">SSL Term.</text>

  <line x1="135" y1="240" x2="168" y2="240" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow-blue)"/>

  <!-- Redundant Load Balancers -->
  <rect x="295" y="110" width="135" height="260" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5" filter="url(#shadow)"/>
  <text x="362" y="135" class="card-title" fill="#1e40af" text-anchor="middle">Load Balancer</text>
  <text x="362" y="150" class="sublabel" text-anchor="middle">(HA Pair: Active/Passive)</text>

  <rect x="310" y="170" width="105" height="40" rx="5" fill="#ffffff" stroke="#3b82f6"/>
  <text x="362" y="188" font-size="9.5" font-weight="bold" fill="#1e40af" text-anchor="middle">Layer 4 (L4 LB)</text>
  <text x="362" y="202" font-size="8.5" fill="#64748b" text-anchor="middle">TCP Port Dispatch</text>

  <rect x="310" y="225" width="105" height="40" rx="5" fill="#ffffff" stroke="#3b82f6"/>
  <text x="362" y="243" font-size="9.5" font-weight="bold" fill="#1e40af" text-anchor="middle">Layer 7 (L7 LB)</text>
  <text x="362" y="257" font-size="8.5" fill="#64748b" text-anchor="middle">URI/Cookie Routing</text>

  <rect x="310" y="280" width="105" height="70" rx="5" fill="#f8fafc"/>
  <text x="362" y="298" font-size="9" font-weight="bold" fill="#0f172a" text-anchor="middle">Algorithms:</text>
  <text x="362" y="313" font-size="8" fill="#475569" text-anchor="middle">• Round Robin</text>
  <text x="362" y="326" font-size="8" fill="#475569" text-anchor="middle">• Least Connections</text>
  <text x="362" y="339" font-size="8" fill="#475569" text-anchor="middle">• IP Hash (Session)</text>

  <line x1="260" y1="240" x2="293" y2="240" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow-blue)"/>

  <!-- Tier 1: Web Server Pool -->
  <rect x="465" y="80" width="135" height="380" rx="8" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5"/>
  <text x="532" y="105" class="card-title" fill="#15803d" text-anchor="middle">Web Server Tier</text>
  <text x="532" y="120" class="sublabel" text-anchor="middle">Stateless Worker Replicas</text>

  <rect x="480" y="140" width="105" height="45" rx="5" fill="#ffffff" stroke="#16a34a"/>
  <text x="532" y="160" font-size="9.5" font-weight="bold" fill="#15803d" text-anchor="middle">Web Node 1</text>
  <text x="532" y="174" font-size="8.5" fill="#64748b" text-anchor="middle">Apache (Port 80)</text>

  <rect x="480" y="200" width="105" height="45" rx="5" fill="#ffffff" stroke="#16a34a"/>
  <text x="532" y="220" font-size="9.5" font-weight="bold" fill="#15803d" text-anchor="middle">Web Node 2</text>
  <text x="532" y="234" font-size="8.5" fill="#64748b" text-anchor="middle">Nginx (Port 80)</text>

  <rect x="480" y="260" width="105" height="45" rx="5" fill="#ffffff" stroke="#16a34a"/>
  <text x="532" y="280" font-size="9.5" font-weight="bold" fill="#15803d" text-anchor="middle">Web Node 3</text>
  <text x="532" y="294" font-size="8.5" fill="#64748b" text-anchor="middle">Nginx (Port 80)</text>

  <rect x="480" y="320" width="105" height="45" rx="5" fill="#ffffff" stroke="#16a34a"/>
  <text x="532" y="340" font-size="9.5" font-weight="bold" fill="#15803d" text-anchor="middle">Web Node N...</text>
  <text x="532" y="354" font-size="8.5" fill="#64748b" text-anchor="middle">Auto-Scaled</text>

  <!-- Health Checks -->
  <rect x="480" y="380" width="105" height="65" rx="5" fill="#dcfce7"/>
  <text x="532" y="400" font-size="9" font-weight="bold" fill="#15803d" text-anchor="middle">Health Monitors:</text>
  <text x="532" y="415" font-size="8" fill="#166534" text-anchor="middle">Periodic HTTP probes</text>
  <text x="532" y="428" font-size="8" fill="#166534" text-anchor="middle">Removes failed nodes</text>

  <!-- Connecting Lines from LB to Web Nodes -->
  <path d="M 430 200 L 478 162" stroke="#16a34a" stroke-width="1.5" marker-end="url(#arrow-green)"/>
  <path d="M 430 240 L 478 222" stroke="#16a34a" stroke-width="1.5" marker-end="url(#arrow-green)"/>
  <path d="M 430 260 L 478 282" stroke="#16a34a" stroke-width="1.5" marker-end="url(#arrow-green)"/>
  <path d="M 430 280 L 478 342" stroke="#16a34a" stroke-width="1.5" marker-end="url(#arrow-green)"/>

  <!-- Tier 2: Database / Storage Cluster -->
  <rect x="635" y="80" width="140" height="380" rx="8" fill="#f8fafc" stroke="#64748b" stroke-width="1.5"/>
  <text x="705" y="105" class="card-title" text-anchor="middle">Database Tier</text>
  <text x="705" y="120" class="sublabel" text-anchor="middle">Stateful Data Storage</text>

  <rect x="650" y="145" width="110" height="65" rx="5" fill="#fef3c7" stroke="#f59e0b"/>
  <text x="705" y="170" font-size="10" font-weight="bold" fill="#b45309" text-anchor="middle">Master DB (Writes)</text>
  <text x="705" y="185" font-size="8.5" fill="#92400e" text-anchor="middle">PostgreSQL / MySQL</text>

  <rect x="650" y="235" width="110" height="65" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="705" y="260" font-size="10" font-weight="bold" fill="#0f172a" text-anchor="middle">Replica 1 (Reads)</text>
  <text x="705" y="275" font-size="8.5" fill="#64748b" text-anchor="middle">Async Replication</text>

  <rect x="650" y="325" width="110" height="65" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="705" y="350" font-size="10" font-weight="bold" fill="#0f172a" text-anchor="middle">Redis Cache</text>
  <text x="705" y="365" font-size="8.5" fill="#64748b" text-anchor="middle">Session State &amp; RAM</text>

  <line x1="585" y1="220" x2="648" y2="180" stroke="#64748b" stroke-width="1.5" marker-end="url(#arrow)"/>
  <line x1="585" y1="280" x2="648" y2="265" stroke="#64748b" stroke-width="1.5" marker-end="url(#arrow)"/>
</svg>`;

// 9. TOPIC 3 - Web Proxies
const svg_proxies = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  ${defsCommon}
  <rect width="800" height="500" rx="14" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="400" y="32" text-anchor="middle" class="title">Web Proxies: Forward Proxy vs Reverse Proxy Architecture</text>
  <text x="400" y="50" text-anchor="middle" class="subtitle">Forouzan Section 27.3 / Web Caching, Security Boundary &amp; Packet Flows</text>

  <!-- TOP HALF: FORWARD PROXY -->
  <rect x="25" y="70" width="750" height="185" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" filter="url(#shadow)"/>
  <text x="45" y="95" class="card-title" fill="#2563eb">A. Forward Proxy (Client-Side Protection &amp; Web Caching)</text>
  <text x="45" y="110" class="sublabel">Acts on behalf of internal corporate users to access the public Internet</text>

  <!-- Internal Clients -->
  <rect x="50" y="125" width="140" height="65" rx="6" fill="#eff6ff" stroke="#3b82f6"/>
  <text x="120" y="150" class="label" fill="#1e40af" text-anchor="middle">Corporate LAN Clients</text>
  <text x="120" y="165" class="sublabel" text-anchor="middle">Private IP (192.168.1.x)</text>

  <!-- Arrow to Forward Proxy -->
  <path d="M 190 155 L 290 155" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow-blue)"/>
  <text x="240" y="148" font-size="8.5" fill="#2563eb" text-anchor="middle">1. Request</text>

  <!-- Forward Proxy Box -->
  <rect x="295" y="120" width="180" height="115" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
  <text x="385" y="142" font-size="11.5" font-weight="bold" fill="#1d4ed8" text-anchor="middle">Forward Proxy Server</text>
  <text x="385" y="156" class="sublabel" text-anchor="middle">Squid / Apache Traffic Server</text>
  <line x1="305" y1="162" x2="465" y2="162" stroke="#bfdbfe"/>
  <text x="315" y="177" font-size="8.5" fill="#1e40af">• Shared In-Memory Cache</text>
  <text x="315" y="190" font-size="8.5" fill="#1e40af">• URL Filtering / Blocklist</text>
  <text x="315" y="203" font-size="8.5" fill="#1e40af">• Hides Client IP Address</text>
  <text x="315" y="216" font-size="8.5" fill="#1e40af">• Bandwidth Conservation</text>

  <!-- Arrow to Internet -->
  <path d="M 475 155 L 590 155" stroke="#059669" stroke-width="2" marker-end="url(#arrow-green)"/>
  <text x="532" y="148" font-size="8.5" fill="#059669" text-anchor="middle">2. Proxy Fetch (Cache Miss)</text>

  <!-- Target Web Server -->
  <rect x="595" y="125" width="160" height="65" rx="6" fill="#f8fafc" stroke="#64748b"/>
  <text x="675" y="150" class="label" text-anchor="middle">Public Web Server</text>
  <text x="675" y="165" class="sublabel" text-anchor="middle">Sees Proxy IP Only!</text>

  <!-- BOTTOM HALF: REVERSE PROXY -->
  <rect x="25" y="275" width="750" height="200" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" filter="url(#shadow)"/>
  <text x="45" y="300" class="card-title" fill="#059669">B. Reverse Proxy (Server-Side Gateway &amp; Shield)</text>
  <text x="45" y="315" class="sublabel">Acts on behalf of origin backend servers to receive requests from the public Internet</text>

  <!-- External Internet Users -->
  <rect x="50" y="335" width="140" height="65" rx="6" fill="#f8fafc" stroke="#64748b"/>
  <text x="120" y="360" class="label" text-anchor="middle">Public Internet Users</text>
  <text x="120" y="375" class="sublabel" text-anchor="middle">Any Browser Worldwide</text>

  <!-- Arrow to Reverse Proxy -->
  <path d="M 190 365 L 290 365" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow-blue)"/>
  <text x="240" y="358" font-size="8.5" fill="#2563eb" text-anchor="middle">1. Encrypted HTTPS</text>

  <!-- Reverse Proxy Box -->
  <rect x="295" y="330" width="180" height="125" rx="8" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/>
  <text x="385" y="352" font-size="11.5" font-weight="bold" fill="#15803d" text-anchor="middle">Reverse Proxy / Gateway</text>
  <text x="385" y="366" class="sublabel" text-anchor="middle">Nginx / HAProxy / Envoy</text>
  <line x1="305" y1="372" x2="465" y2="372" stroke="#bbf7d0"/>
  <text x="315" y="387" font-size="8.5" fill="#166534">• SSL / TLS Termination</text>
  <text x="315" y="400" font-size="8.5" fill="#166534">• Load Balancing Algorithms</text>
  <text x="315" y="413" font-size="8.5" fill="#166534">• Web App Firewall (WAF)</text>
  <text x="315" y="426" font-size="8.5" fill="#166534">• Hides Internal Backend IPs</text>
  <text x="315" y="439" font-size="8.5" fill="#166534">• Gzip / Brotli Compression</text>

  <!-- Arrow to Internal Backends -->
  <path d="M 475 365 L 590 365" stroke="#059669" stroke-width="2" marker-end="url(#arrow-green)"/>
  <text x="532" y="358" font-size="8.5" fill="#059669" text-anchor="middle">2. Fast Plain HTTP</text>

  <!-- Private Backend Cluster -->
  <rect x="595" y="335" width="160" height="115" rx="6" fill="#eff6ff" stroke="#3b82f6"/>
  <text x="675" y="358" class="label" fill="#1e40af" text-anchor="middle">Internal Server Cluster</text>
  <text x="675" y="375" class="sublabel" text-anchor="middle">Private IP: 10.0.0.x</text>
  <rect x="610" y="385" width="130" height="22" rx="4" fill="#ffffff" stroke="#93c5fd"/>
  <text x="675" y="400" font-size="8.5" fill="#1e40af" text-anchor="middle">App Node 1 (Port 8080)</text>
  <rect x="610" y="415" width="130" height="22" rx="4" fill="#ffffff" stroke="#93c5fd"/>
  <text x="675" y="430" font-size="8.5" fill="#1e40af" text-anchor="middle">App Node 2 (Port 8081)</text>
</svg>`;

// 10. TOPIC 4 - Peer-to-Peer Networks
const svg_p2p = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  ${defsCommon}
  <rect width="800" height="500" rx="14" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="400" y="32" text-anchor="middle" class="title">Peer-to-Peer (P2P) Networks vs Client-Server Architecture</text>
  <text x="400" y="50" text-anchor="middle" class="subtitle">Decentralized Mesh Distribution, BitTorrent Swarms, Trackers &amp; Self-Scaling Bandwidth</text>

  <!-- Left: Client-Server -->
  <rect x="30" y="75" width="340" height="385" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" filter="url(#shadow)"/>
  <text x="200" y="100" class="card-title" text-anchor="middle">1. Centralized Client-Server Model</text>
  <text x="200" y="116" class="sublabel" text-anchor="middle">Server upload capacity $U_s$ is the system bottleneck</text>

  <!-- Central Server -->
  <rect x="150" y="140" width="100" height="50" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
  <text x="200" y="165" class="label" fill="#1e40af" text-anchor="middle">Central Server</text>
  <text x="200" y="179" class="sublabel" text-anchor="middle">Upload Capacity $U_s$</text>

  <!-- Clients radiating out -->
  <rect x="50" y="260" width="70" height="35" rx="5" fill="#f8fafc" stroke="#64748b"/>
  <text x="85" y="282" font-size="9" text-anchor="middle">Client 1</text>

  <rect x="135" y="260" width="70" height="35" rx="5" fill="#f8fafc" stroke="#64748b"/>
  <text x="170" y="282" font-size="9" text-anchor="middle">Client 2</text>

  <rect x="220" y="260" width="70" height="35" rx="5" fill="#f8fafc" stroke="#64748b"/>
  <text x="255" y="282" font-size="9" text-anchor="middle">Client 3</text>

  <rect x="300" y="260" width="60" height="35" rx="5" fill="#f8fafc" stroke="#64748b"/>
  <text x="330" y="282" font-size="9" text-anchor="middle">Client N</text>

  <line x1="170" y1="190" x2="85" y2="260" stroke="#dc2626" stroke-width="1.5" marker-end="url(#arrow-red)"/>
  <line x1="190" y1="190" x2="170" y2="260" stroke="#dc2626" stroke-width="1.5" marker-end="url(#arrow-red)"/>
  <line x1="210" y1="190" x2="255" y2="260" stroke="#dc2626" stroke-width="1.5" marker-end="url(#arrow-red)"/>
  <line x1="230" y1="190" x2="330" y2="260" stroke="#dc2626" stroke-width="1.5" marker-end="url(#arrow-red)"/>

  <!-- Math Box Client Server -->
  <rect x="45" y="325" width="310" height="120" rx="6" fill="#fee2e2" stroke="#fca5a5"/>
  <text x="55" y="345" font-size="10.5" font-weight="bold" fill="#b91c1c">Client-Server Distribution Time Formula:</text>
  <text x="55" y="365" font-size="10" fill="#7f1d1d" class="code">D_{CS} \ge \max\left\{ \frac{N \times F}{U_s}, \; \frac{F}{d_{min}} \right\}</text>
  <text x="55" y="388" font-size="9" fill="#991b1b">• As clients $N$ increase, distribution time grows linearly!</text>
  <text x="55" y="405" font-size="9" fill="#991b1b">• Server bandwidth saturates; single point of failure.</text>
  <text x="55" y="422" font-size="9" fill="#991b1b">• High hosting costs for large software distributions.</text>

  <!-- Right: P2P Swarm -->
  <rect x="390" y="75" width="380" height="385" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" filter="url(#shadow)"/>
  <text x="580" y="100" class="card-title" fill="#059669" text-anchor="middle">2. P2P Mesh Architecture (BitTorrent)</text>
  <text x="580" y="116" class="sublabel" text-anchor="middle">Peers act as both clients AND servers (servents)</text>

  <!-- Tracker at top -->
  <rect x="525" y="130" width="110" height="35" rx="6" fill="#fef3c7" stroke="#f59e0b"/>
  <text x="580" y="148" font-size="9.5" font-weight="bold" fill="#b45309" text-anchor="middle">BitTorrent Tracker</text>
  <text x="580" y="159" font-size="8" fill="#92400e" text-anchor="middle">Coordinates Peer List</text>

  <!-- Swarm Nodes interconnected -->
  <circle cx="450" cy="210" r="28" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
  <text x="450" y="210" font-size="9" font-weight="bold" fill="#15803d" text-anchor="middle">Peer A</text>
  <text x="450" y="222" font-size="7.5" fill="#166534" text-anchor="middle">Chunk 1,2</text>

  <circle cx="710" cy="210" r="28" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
  <text x="710" y="210" font-size="9" font-weight="bold" fill="#15803d" text-anchor="middle">Peer B</text>
  <text x="710" y="222" font-size="7.5" fill="#166534" text-anchor="middle">Chunk 3,4</text>

  <circle cx="510" cy="285" r="28" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
  <text x="510" y="285" font-size="9" font-weight="bold" fill="#15803d" text-anchor="middle">Peer C</text>
  <text x="510" y="297" font-size="7.5" fill="#166534" text-anchor="middle">Chunk 2,5</text>

  <circle cx="650" cy="285" r="28" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
  <text x="650" y="285" font-size="9" font-weight="bold" fill="#15803d" text-anchor="middle">Peer D</text>
  <text x="650" y="297" font-size="7.5" fill="#166534" text-anchor="middle">Chunk 1,4</text>

  <!-- Mesh data exchange lines -->
  <line x1="478" y1="210" x2="682" y2="210" stroke="#059669" stroke-width="1.5" stroke-dasharray="3,3"/>
  <line x1="465" y1="235" x2="495" y2="265" stroke="#059669" stroke-width="1.5"/>
  <line x1="695" y1="235" x2="665" y2="265" stroke="#059669" stroke-width="1.5"/>
  <line x1="538" y1="285" x2="622" y2="285" stroke="#059669" stroke-width="1.5" stroke-dasharray="3,3"/>
  <line x1="465" y1="225" x2="630" y2="275" stroke="#059669" stroke-width="1"/>

  <text x="580" y="245" font-size="9" font-weight="bold" fill="#059669" text-anchor="middle">Tit-for-Tat Data Exchange</text>

  <!-- P2P Math Box -->
  <rect x="405" y="325" width="350" height="120" rx="6" fill="#f0fdf4" stroke="#86efac"/>
  <text x="415" y="345" font-size="10.5" font-weight="bold" fill="#15803d">P2P Distribution Time Formula (Self-Scaling):</text>
  <text x="415" y="365" font-size="10" fill="#14532d" class="code">D_{P2P} \ge \max\left\{ \frac{F}{U_s}, \; \frac{F}{d_{min}}, \; \frac{N \times F}{U_s + \sum_{i=1}^N u_i} \right\}</text>
  <text x="415" y="388" font-size="9" fill="#166534">• Every joining peer brings additional upload capacity $u_i$!</text>
  <text x="415" y="405" font-size="9" fill="#166534">• As $N \to \infty$, distribution time approaches a constant bound.</text>
  <text x="415" y="422" font-size="9" fill="#166534">• Rarest-First chunk selection ensures balanced availability.</text>
</svg>`;

// 11. TOPIC 4 - Firewalls
const svg_firewalls = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  ${defsCommon}
  <rect width="800" height="500" rx="14" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="400" y="32" text-anchor="middle" class="title">Firewall Architecture &amp; Demilitarized Zone (DMZ)</text>
  <text x="400" y="50" text-anchor="middle" class="subtitle">Forouzan Section 32.4 / Packet Filtering, Stateful Inspection, Application Proxy &amp; Perimeter Defense</text>

  <!-- Left: Public Internet -->
  <rect x="25" y="160" width="105" height="180" rx="8" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5"/>
  <text x="77" y="185" class="card-title" fill="#b91c1c" text-anchor="middle">Untrusted</text>
  <text x="77" y="202" class="card-title" fill="#b91c1c" text-anchor="middle">Internet</text>
  <text x="77" y="230" font-size="9" fill="#7f1d1d" text-anchor="middle">Public Web Users</text>
  <text x="77" y="250" font-size="9" fill="#dc2626" font-weight="bold" text-anchor="middle">⚠️ Hackers / Bots</text>
  <text x="77" y="270" font-size="9" fill="#7f1d1d" text-anchor="middle">Malicious Probes</text>

  <!-- Firewall 1: External Border Firewall -->
  <rect x="155" y="120" width="100" height="260" rx="8" fill="#fee2e2" stroke="#b91c1c" stroke-width="2" filter="url(#shadow)"/>
  <text x="205" y="145" font-size="11" font-weight="bold" fill="#b91c1c" text-anchor="middle">External</text>
  <text x="205" y="160" font-size="11" font-weight="bold" fill="#b91c1c" text-anchor="middle">Firewall</text>
  <line x1="165" y1="170" x2="245" y2="170" stroke="#fca5a5"/>
  <text x="205" y="190" font-size="8.5" fill="#7f1d1d" text-anchor="middle">Packet Filter</text>
  <text x="205" y="210" font-size="8" fill="#991b1b" text-anchor="middle">• IP / Port ACLs</text>
  <text x="205" y="225" font-size="8" fill="#991b1b" text-anchor="middle">• Drop spoofed IPs</text>
  <text x="205" y="240" font-size="8" fill="#991b1b" text-anchor="middle">• Stateful TCP table</text>
  <text x="205" y="260" font-size="8.5" font-weight="bold" fill="#059669" text-anchor="middle">ALLOW:</text>
  <text x="205" y="275" font-size="8" fill="#15803d" text-anchor="middle">Port 80, 443</text>
  <text x="205" y="295" font-size="8.5" font-weight="bold" fill="#dc2626" text-anchor="middle">DROP ALL ELSE</text>

  <line x1="130" y1="240" x2="153" y2="240" stroke="#dc2626" stroke-width="2" marker-end="url(#arrow-red)"/>

  <!-- Center Top: DMZ Subnet -->
  <rect x="290" y="75" width="220" height="180" rx="10" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5" filter="url(#shadow)"/>
  <text x="400" y="98" class="card-title" fill="#b45309" text-anchor="middle">Demilitarized Zone (DMZ)</text>
  <text x="400" y="114" class="sublabel" text-anchor="middle">Semi-Trusted Public Facing Servers</text>

  <rect x="305" y="125" width="190" height="35" rx="5" fill="#ffffff" stroke="#f59e0b"/>
  <text x="400" y="147" font-size="9.5" font-weight="bold" fill="#b45309" text-anchor="middle">🌐 Web Server (Port 80/443)</text>

  <rect x="305" y="168" width="190" height="35" rx="5" fill="#ffffff" stroke="#f59e0b"/>
  <text x="400" y="190" font-size="9.5" font-weight="bold" fill="#b45309" text-anchor="middle">✉️ Mail Server (SMTP Port 25)</text>

  <rect x="305" y="210" width="190" height="35" rx="5" fill="#ffffff" stroke="#f59e0b"/>
  <text x="400" y="232" font-size="9.5" font-weight="bold" fill="#b45309" text-anchor="middle">🔍 Public DNS Server (Port 53)</text>

  <!-- Line from Ext Firewall into DMZ -->
  <path d="M 255 190 C 270 190, 275 160, 290 150" fill="none" stroke="#059669" stroke-width="2" marker-end="url(#arrow-green)"/>

  <!-- Firewall 2: Internal Firewall -->
  <rect x="545" y="120" width="100" height="260" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="2" filter="url(#shadow)"/>
  <text x="595" y="145" font-size="11" font-weight="bold" fill="#1e40af" text-anchor="middle">Internal</text>
  <text x="595" y="160" font-size="11" font-weight="bold" fill="#1e40af" text-anchor="middle">Firewall</text>
  <line x1="555" y1="170" x2="635" y2="170" stroke="#bfdbfe"/>
  <text x="595" y="190" font-size="8.5" fill="#1e40af" text-anchor="middle">Application Proxy</text>
  <text x="595" y="210" font-size="8" fill="#1e40af" text-anchor="middle">• Strict Zero Trust</text>
  <text x="595" y="225" font-size="8" fill="#1e40af" text-anchor="middle">• Blocks DMZ to LAN</text>
  <text x="595" y="245" font-size="8.5" font-weight="bold" fill="#dc2626" text-anchor="middle">DMZ Breach</text>
  <text x="595" y="260" font-size="8" fill="#b91c1c" text-anchor="middle">Cannot reach LAN!</text>
  <text x="595" y="280" font-size="8" fill="#1e40af" text-anchor="middle">DB Query Auth</text>

  <!-- Line from DMZ into Internal Firewall -->
  <path d="M 495 150 C 515 150, 525 190, 545 190" fill="none" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow-blue)"/>

  <!-- Right: Internal Corporate Network -->
  <rect x="675" y="140" width="105" height="220" rx="8" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5"/>
  <text x="727" y="165" class="card-title" fill="#15803d" text-anchor="middle">Trusted</text>
  <text x="727" y="182" class="card-title" fill="#15803d" text-anchor="middle">Corporate LAN</text>
  <text x="727" y="210" font-size="9" fill="#166534" text-anchor="middle">Database Clusters</text>
  <text x="727" y="230" font-size="9" fill="#166534" text-anchor="middle">Employee PCs</text>
  <text x="727" y="250" font-size="9" fill="#166534" text-anchor="middle">HR / Payroll Systems</text>
  <text x="727" y="270" font-size="9" fill="#166534" text-anchor="middle">Internal Git / NAS</text>
  <text x="727" y="310" font-size="9" font-weight="bold" fill="#15803d" text-anchor="middle">🔒 Highly Secure</text>

  <line x1="645" y1="240" x2="673" y2="240" stroke="#16a34a" stroke-width="2" marker-end="url(#arrow-green)"/>

  <!-- Bottom: 3 Firewall Types Comparison Table -->
  <rect x="25" y="395" width="750" height="90" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
  <text x="45" y="415" font-size="10.5" font-weight="bold" fill="#0f172a">Summary of 3 Firewall Architectures (NIST SP 800-41):</text>
  <text x="45" y="435" font-size="9" fill="#334155"><tspan font-weight="bold">1. Packet-Filtering (Stateless):</tspan> Inspects IP headers &amp; TCP/UDP ports. Fast, low memory, but vulnerable to IP spoofing.</text>
  <text x="45" y="453" font-size="9" fill="#334155"><tspan font-weight="bold">2. Stateful Inspection:</tspan> Tracks TCP handshake states (SYN, SYN-ACK, ESTABLISHED). Permits replies to outgoing client traffic.</text>
  <text x="45" y="471" font-size="9" fill="#334155"><tspan font-weight="bold">3. Application-Level Proxy:</tspan> Inspects full Layer 7 payload (HTTP URLs, SQL injection patterns). Deepest security, higher latency.</text>
</svg>`;

// 12. TOPIC 4 - IDS and IPS
const svg_ids = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  ${defsCommon}
  <rect width="800" height="500" rx="14" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="400" y="32" text-anchor="middle" class="title">Intrusion Detection System (IDS) vs Intrusion Prevention (IPS)</text>
  <text x="400" y="50" text-anchor="middle" class="subtitle">NIST SP 800-94 / Signature vs Anomaly Detection, NIDS vs HIDS, &amp; Inline vs Out-of-Band</text>

  <!-- Left: IDS (Out-of-Band Passive Sniffer) -->
  <rect x="30" y="75" width="350" height="300" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" filter="url(#shadow)"/>
  <text x="205" y="100" class="card-title" fill="#2563eb" text-anchor="middle">1. Intrusion Detection System (IDS)</text>
  <text x="205" y="116" class="sublabel" text-anchor="middle">Passive Out-of-Band Traffic Mirroring (SPAN / TAP)</text>

  <!-- Switch with SPAN port -->
  <rect x="60" y="140" width="120" height="45" rx="6" fill="#f8fafc" stroke="#64748b" stroke-width="1.5"/>
  <text x="120" y="162" class="label" text-anchor="middle">Core Switch</text>
  <text x="120" y="175" class="sublabel" text-anchor="middle">SPAN / Mirror Port</text>

  <!-- Client PC -->
  <rect x="60" y="240" width="120" height="40" rx="6" fill="#eff6ff" stroke="#3b82f6"/>
  <text x="120" y="265" class="label" text-anchor="middle">Protected Host</text>

  <!-- Live Traffic Line (Not blocked!) -->
  <line x1="120" y1="185" x2="120" y2="238" stroke="#059669" stroke-width="2.5" marker-end="url(#arrow-green)"/>
  <text x="128" y="215" font-size="8.5" fill="#059669">Live Traffic (Zero Latency)</text>

  <!-- Mirror TAP to IDS -->
  <path d="M 180 162 L 250 162" stroke="#2563eb" stroke-width="2" stroke-dasharray="4,3" marker-end="url(#arrow-blue)"/>
  <text x="215" y="155" font-size="8" fill="#2563eb" text-anchor="middle">Mirrored Copy</text>

  <!-- NIDS Sensor Box -->
  <rect x="255" y="135" width="105" height="145" rx="6" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
  <text x="307" y="155" font-size="10" font-weight="bold" fill="#1e40af" text-anchor="middle">NIDS Sensor</text>
  <text x="307" y="168" class="sublabel" text-anchor="middle">(Snort / Zeek)</text>
  <line x1="265" y1="175" x2="350" y2="175" stroke="#bfdbfe"/>
  <text x="265" y="192" font-size="8" fill="#1e40af">• Signature Match</text>
  <text x="265" y="206" font-size="8" fill="#1e40af">• Anomaly Engine</text>
  <text x="265" y="220" font-size="8" fill="#1e40af">• Packet Reassembly</text>
  <text x="307" y="245" font-size="8.5" font-weight="bold" fill="#dc2626" text-anchor="middle">ALERTS SIEM ⚠️</text>
  <text x="307" y="260" font-size="7.5" fill="#7f1d1d" text-anchor="middle">(Cannot stop attack!)</text>

  <!-- IDS Summary -->
  <rect x="45" y="300" width="320" height="60" rx="6" fill="#f1f5f9"/>
  <text x="55" y="320" font-size="9.5" font-weight="bold" fill="#0f172a">IDS Pros &amp; Cons:</text>
  <text x="55" y="336" font-size="9" fill="#059669">✓ No network latency impact; if IDS fails, network stays UP</text>
  <text x="55" y="352" font-size="9" fill="#dc2626">✗ Only alerts after packets arrive; cannot prevent zero-day attacks</text>

  <!-- Right: IPS (Inline Active Enforcement) -->
  <rect x="410" y="75" width="365" height="300" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" filter="url(#shadow)"/>
  <text x="592" y="100" class="card-title" fill="#b91c1c" text-anchor="middle">2. Intrusion Prevention System (IPS)</text>
  <text x="592" y="116" class="sublabel" text-anchor="middle">Inline Active Packet Inspection &amp; Real-Time Dropping</text>

  <!-- Inbound Traffic -->
  <rect x="425" y="160" width="85" height="50" rx="6" fill="#fee2e2" stroke="#dc2626"/>
  <text x="467" y="182" class="label" fill="#b91c1c" text-anchor="middle">Inbound</text>
  <text x="467" y="196" class="sublabel" text-anchor="middle">Traffic</text>

  <!-- Inline IPS Device -->
  <rect x="545" y="135" width="105" height="145" rx="6" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
  <text x="597" y="155" font-size="10" font-weight="bold" fill="#b91c1c" text-anchor="middle">Inline IPS</text>
  <text x="597" y="168" class="sublabel" text-anchor="middle">(Suricata / Palo Alto)</text>
  <line x1="555" y1="175" x2="640" y2="175" stroke="#fca5a5"/>
  <text x="555" y="192" font-size="8" fill="#7f1d1d">• Real-Time Scrubbing</text>
  <text x="555" y="206" font-size="8" fill="#7f1d1d">• TCP Reset Injection</text>
  <text x="555" y="220" font-size="8" fill="#7f1d1d">• Drops Exploit Packets</text>
  <text x="597" y="245" font-size="8.5" font-weight="bold" fill="#dc2626" text-anchor="middle">BLOCKS PACKET 🛑</text>
  <text x="597" y="260" font-size="7.5" fill="#7f1d1d" text-anchor="middle">Neutralizes threat inline</text>

  <!-- Arrow into IPS -->
  <line x1="510" y1="185" x2="543" y2="185" stroke="#dc2626" stroke-width="2" marker-end="url(#arrow-red)"/>

  <!-- Clean Traffic out to Host -->
  <rect x="685" y="160" width="80" height="50" rx="6" fill="#f0fdf4" stroke="#16a34a"/>
  <text x="725" y="182" class="label" fill="#15803d" text-anchor="middle">Clean Host</text>
  <text x="725" y="196" class="sublabel" text-anchor="middle">Safe Traffic</text>

  <line x1="650" y1="185" x2="683" y2="185" stroke="#059669" stroke-width="2.5" marker-end="url(#arrow-green)"/>

  <!-- IPS Summary -->
  <rect x="425" y="300" width="340" height="60" rx="6" fill="#f1f5f9"/>
  <text x="435" y="320" font-size="9.5" font-weight="bold" fill="#0f172a">IPS Pros &amp; Cons:</text>
  <text x="435" y="336" font-size="9" fill="#059669">✓ Proactive defense: stops worms, exploits &amp; SQL injection instantly</text>
  <text x="435" y="352" font-size="9" fill="#dc2626">✗ Adds processing latency; false positives drop legitimate user traffic!</text>

  <!-- Detection Methodologies (Bottom Table) -->
  <rect x="30" y="390" width="745" height="95" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
  <text x="50" y="410" font-size="10.5" font-weight="bold" fill="#0f172a">Core Detection Methodologies:</text>
  <text x="50" y="430" font-size="9" fill="#334155"><tspan font-weight="bold">A. Signature-Based (Knowledge-Based):</tspan> Matches packet bytes against database of known attack patterns (CVE regexes). High accuracy, 0-day blind.</text>
  <text x="50" y="448" font-size="9" fill="#334155"><tspan font-weight="bold">B. Anomaly-Based (Behavior-Based):</tspan> Builds baseline profile of normal network traffic using statistical ML; flags deviations. Catches unknown threats, higher false positives.</text>
  <text x="50" y="466" font-size="9" fill="#334155"><tspan font-weight="bold">C. Host-Based (HIDS):</tspan> Runs agent software on server (OSSEC / Wazuh) inspecting auth logs, file integrity (FIM), and syscall traces.</text>
</svg>`;

// 13. TOPIC 5 - Introduction to Cryptography
const svg_crypto_intro = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  ${defsCommon}
  <rect width="800" height="500" rx="14" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="400" y="32" text-anchor="middle" class="title">Fundamental Model of Cryptography &amp; Security Services</text>
  <text x="400" y="50" text-anchor="middle" class="subtitle">Forouzan Chapter 30.1 / Plaintext, Ciphertext, Keys, Insecure Channel &amp; The 4 Security Pillars</text>

  <!-- Cryptographic Process Flow -->
  <rect x="25" y="70" width="750" height="235" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" filter="url(#shadow)"/>
  <text x="400" y="94" class="card-title" text-anchor="middle">The Encryption &amp; Decryption Pipeline</text>

  <!-- Sender (Alice) -->
  <rect x="45" y="115" width="115" height="70" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="102" y="140" class="label" fill="#1e40af" text-anchor="middle">Sender (Alice)</text>
  <text x="102" y="158" font-size="9.5" fill="#2563eb" text-anchor="middle">Plaintext $P$</text>
  <text x="102" y="172" class="code" fill="#0f172a" text-anchor="middle">"HELLO"</text>

  <!-- Arrow to Encryption -->
  <line x1="160" y1="150" x2="198" y2="150" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow-blue)"/>

  <!-- Encryption Algorithm Box -->
  <rect x="200" y="115" width="125" height="70" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
  <text x="262" y="140" font-size="11" font-weight="bold" fill="#1e40af" text-anchor="middle">Encryption</text>
  <text x="262" y="155" font-size="10" fill="#1e40af" text-anchor="middle">Algorithm $E$</text>
  <text x="262" y="172" class="code" fill="#2563eb" text-anchor="middle">C = E_{K_e}(P)</text>

  <!-- Encryption Key Input -->
  <line x1="262" y1="230" x2="262" y2="188" stroke="#d97706" stroke-width="2" marker-end="url(#arrow-amber)"/>
  <rect x="210" y="230" width="105" height="35" rx="5" fill="#fef3c7" stroke="#f59e0b"/>
  <text x="262" y="248" font-size="9.5" font-weight="bold" fill="#b45309" text-anchor="middle">Encryption Key</text>
  <text x="262" y="260" class="code" fill="#b45309" text-anchor="middle">K_e</text>

  <!-- Insecure Channel with Eve Attacker -->
  <rect x="350" y="115" width="120" height="70" rx="8" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="410" y="138" font-size="10.5" font-weight="bold" fill="#b91c1c" text-anchor="middle">Insecure Channel</text>
  <text x="410" y="155" font-size="9" fill="#7f1d1d" text-anchor="middle">Ciphertext $C$</text>
  <text x="410" y="172" class="code" fill="#b91c1c" text-anchor="middle">"WTAAD"</text>

  <!-- Attacker Eve listening -->
  <circle cx="410" cy="235" r="22" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5"/>
  <text x="410" y="235" font-size="9" font-weight="bold" fill="#b91c1c" text-anchor="middle">Eve 🕵️</text>
  <text x="410" y="247" font-size="7.5" fill="#7f1d1d" text-anchor="middle">Eavesdropper</text>
  <line x1="410" y1="210" x2="410" y2="187" stroke="#dc2626" stroke-dasharray="2,2"/>

  <!-- Arrow Ciphertext to Decryption -->
  <line x1="325" y1="150" x2="348" y2="150" stroke="#059669" stroke-width="2" marker-end="url(#arrow-green)"/>
  <line x1="470" y1="150" x2="498" y2="150" stroke="#059669" stroke-width="2" marker-end="url(#arrow-green)"/>

  <!-- Decryption Algorithm Box -->
  <rect x="500" y="115" width="125" height="70" rx="8" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/>
  <text x="562" y="140" font-size="11" font-weight="bold" fill="#15803d" text-anchor="middle">Decryption</text>
  <text x="562" y="155" font-size="10" fill="#15803d" text-anchor="middle">Algorithm $D$</text>
  <text x="562" y="172" class="code" fill="#15803d" text-anchor="middle">P = D_{K_d}(C)</text>

  <!-- Decryption Key Input -->
  <line x1="562" y1="230" x2="562" y2="188" stroke="#d97706" stroke-width="2" marker-end="url(#arrow-amber)"/>
  <rect x="510" y="230" width="105" height="35" rx="5" fill="#fef3c7" stroke="#f59e0b"/>
  <text x="562" y="248" font-size="9.5" font-weight="bold" fill="#b45309" text-anchor="middle">Decryption Key</text>
  <text x="562" y="260" class="code" fill="#b45309" text-anchor="middle">K_d</text>

  <!-- Receiver (Bob) -->
  <line x1="625" y1="150" x2="663" y2="150" stroke="#059669" stroke-width="2" marker-end="url(#arrow-green)"/>
  <rect x="665" y="115" width="100" height="70" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="715" y="140" class="label" fill="#1e40af" text-anchor="middle">Receiver (Bob)</text>
  <text x="715" y="158" font-size="9.5" fill="#2563eb" text-anchor="middle">Plaintext $P$</text>
  <text x="715" y="172" class="code" fill="#0f172a" text-anchor="middle">"HELLO"</text>

  <!-- The 4 Security Pillars (Bottom Cards Grid) -->
  <rect x="25" y="320" width="175" height="155" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
  <rect x="35" y="332" width="155" height="24" rx="4" fill="#eff6ff"/>
  <text x="112" y="348" font-size="10.5" font-weight="bold" fill="#1d4ed8" text-anchor="middle">1. Confidentiality</text>
  <text x="35" y="375" font-size="9" fill="#334155">• Only authorized receiver</text>
  <text x="35" y="390" font-size="9" fill="#334155">can read message</text>
  <text x="35" y="412" font-size="8.5" fill="#64748b">Eavesdropper sees only</text>
  <text x="35" y="426" font-size="8.5" fill="#64748b">scrambled ciphertext</text>
  <text x="35" y="450" font-size="8.5" font-weight="bold" fill="#2563eb">Mechanism: Ciphers (AES)</text>

  <rect x="215" y="320" width="175" height="155" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
  <rect x="225" y="332" width="155" height="24" rx="4" fill="#f0fdf4"/>
  <text x="302" y="348" font-size="10.5" font-weight="bold" fill="#15803d" text-anchor="middle">2. Integrity</text>
  <text x="225" y="375" font-size="9" fill="#334155">• Detects unauthorized</text>
  <text x="225" y="390" font-size="9" fill="#334155">modification, insertion,</text>
  <text x="225" y="405" font-size="9" fill="#334155">or deletion of data</text>
  <text x="225" y="426" font-size="8.5" fill="#64748b">Cryptographic digest match</text>
  <text x="225" y="450" font-size="8.5" font-weight="bold" fill="#059669">Mechanism: SHA-256 / MAC</text>

  <rect x="405" y="320" width="175" height="155" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
  <rect x="415" y="332" width="155" height="24" rx="4" fill="#fef3c7"/>
  <text x="492" y="348" font-size="10.5" font-weight="bold" fill="#b45309" text-anchor="middle">3. Authentication</text>
  <text x="415" y="375" font-size="9" fill="#334155">• Verifies true sender</text>
  <text x="415" y="390" font-size="9" fill="#334155">identity; prevents</text>
  <text x="415" y="405" font-size="9" fill="#334155">impersonation / spoofing</text>
  <text x="415" y="426" font-size="8.5" fill="#64748b">Challenge-response token</text>
  <text x="415" y="450" font-size="8.5" font-weight="bold" fill="#d97706">Mechanism: Digital Certs</text>

  <rect x="595" y="320" width="180" height="155" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
  <rect x="605" y="332" width="160" height="24" rx="4" fill="#faf5ff"/>
  <text x="685" y="348" font-size="10.5" font-weight="bold" fill="#6d28d9" text-anchor="middle">4. Non-Repudiation</text>
  <text x="605" y="375" font-size="9" fill="#334155">• Sender cannot deny</text>
  <text x="605" y="390" font-size="9" fill="#334155">having created and</text>
  <text x="605" y="405" font-size="9" fill="#334155">transmitted the message</text>
  <text x="605" y="426" font-size="8.5" fill="#64748b">Legal non-denial proof</text>
  <text x="605" y="450" font-size="8.5" font-weight="bold" fill="#7c3aed">Mechanism: RSA Signatures</text>
</svg>`;

// 14. TOPIC 5 - Substitution Ciphers
const svg_substitution = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  ${defsCommon}
  <rect width="800" height="500" rx="14" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="400" y="32" text-anchor="middle" class="title">Classical Substitution Ciphers: Caesar &amp; Polyalphabetic</text>
  <text x="400" y="50" text-anchor="middle" class="subtitle">Forouzan Section 30.2 / Shift Cipher Formulas, Modular Arithmetic &amp; Vigenère Tableau</text>

  <!-- Left: Monoalphabetic Shift Cipher (Caesar) -->
  <rect x="25" y="70" width="365" height="410" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" filter="url(#shadow)"/>
  <text x="207" y="95" class="card-title" fill="#2563eb" text-anchor="middle">1. Caesar / Additive Shift Cipher</text>
  <text x="207" y="112" class="sublabel" text-anchor="middle">Each letter shifted by fixed integer $k \in \{0, \dots, 25\}$</text>

  <!-- Mathematical Formulas Box -->
  <rect x="40" y="125" width="335" height="65" rx="6" fill="#eff6ff" stroke="#93c5fd"/>
  <text x="50" y="145" font-size="10.5" font-weight="bold" fill="#1e40af">Modular Arithmetic Formulation:</text>
  <text x="50" y="165" font-size="11" fill="#0f172a" class="code">Encryption: C = (P + k) \pmod{26}</text>
  <text x="50" y="180" font-size="11" fill="#0f172a" class="code">Decryption: P = (C - k) \pmod{26}</text>

  <!-- Forouzan Example 30.3 Box -->
  <rect x="40" y="200" width="335" height="150" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="50" y="220" font-size="10.5" font-weight="bold" fill="#0f172a">McGraw-Hill Forouzan Example 30.3 (Key = 15):</text>
  <text x="50" y="238" font-size="9.5" fill="#475569">Plaintext: <tspan class="code" font-weight="bold">"HELLO"</tspan></text>

  <text x="50" y="258" class="code" font-size="9.5" fill="#334155">• H (07): (07 + 15) mod 26 = 22 → <tspan font-weight="bold" fill="#2563eb">W</tspan></text>
  <text x="50" y="274" class="code" font-size="9.5" fill="#334155">• E (04): (04 + 15) mod 26 = 19 → <tspan font-weight="bold" fill="#2563eb">T</tspan></text>
  <text x="50" y="290" class="code" font-size="9.5" fill="#334155">• L (11): (11 + 15) mod 26 = 26 mod 26 = 00 → <tspan font-weight="bold" fill="#2563eb">A</tspan></text>
  <text x="50" y="306" class="code" font-size="9.5" fill="#334155">• L (11): (11 + 15) mod 26 = 00 → <tspan font-weight="bold" fill="#2563eb">A</tspan></text>
  <text x="50" y="322" class="code" font-size="9.5" fill="#334155">• O (14): (14 + 15) mod 26 = 29 mod 26 = 03 → <tspan font-weight="bold" fill="#2563eb">D</tspan></text>

  <rect x="50" y="328" width="315" height="18" rx="3" fill="#dbeafe"/>
  <text x="207" y="341" font-size="9.5" font-weight="bold" fill="#1e40af" text-anchor="middle">Resulting Ciphertext: "WTAAD"</text>

  <!-- Cryptanalysis Vulnerability Box -->
  <rect x="40" y="360" width="335" height="105" rx="6" fill="#fee2e2" stroke="#fca5a5"/>
  <text x="50" y="380" font-size="10" font-weight="bold" fill="#b91c1c">Cryptanalysis Vulnerability:</text>
  <text x="50" y="398" font-size="9" fill="#7f1d1d">• Key Space is only 26 (Trivial brute-force exhaustive search)</text>
  <text x="50" y="415" font-size="9" fill="#7f1d1d">• Preserves English letter frequency (E = 12.7%, T = 9.1%)</text>
  <text x="50" y="432" font-size="9" fill="#7f1d1d">• Frequency distribution chart easily unmasks the shift $k$!</text>
  <text x="50" y="450" font-size="9" font-weight="bold" fill="#991b1b">⚠️ Completely insecure for modern communications.</text>

  <!-- Right: Polyalphabetic Cipher (Vigenère) -->
  <rect x="410" y="70" width="365" height="410" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" filter="url(#shadow)"/>
  <text x="592" y="95" class="card-title" fill="#059669" text-anchor="middle">2. Polyalphabetic Vigenère Cipher</text>
  <text x="592" y="112" class="sublabel" text-anchor="middle">Repeats a keyword to defeat monoalphabetic frequency analysis</text>

  <!-- Vigenere Formula -->
  <rect x="425" y="125" width="335" height="50" rx="6" fill="#f0fdf4" stroke="#86efac"/>
  <text x="435" y="145" font-size="10.5" font-weight="bold" fill="#15803d">Keystream Formulation:</text>
  <text x="435" y="162" font-size="10.5" fill="#0f172a" class="code">C_i = (P_i + K_{i \bmod m}) \pmod{26}</text>

  <!-- Step-by-Step Vigenere Table -->
  <rect x="425" y="185" width="335" height="150" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="435" y="205" font-size="10.5" font-weight="bold" fill="#0f172a">Example Walkthrough: Plaintext = "ATTACK", Key = "LEMON"</text>

  <rect x="435" y="215" width="315" height="24" rx="4" fill="#f1f5f9"/>
  <text x="445" y="231" font-size="9.5" font-weight="bold" fill="#334155">Plaintext:   A    T    T    A    C    K</text>
  <text x="445" y="255" font-size="9.5" font-weight="bold" fill="#d97706">Key Stream:  L    E    M    O    N    L  (Repeated)</text>
  <text x="445" y="275" font-size="9" fill="#64748b" class="code">P values:    00   19   19   00   02   10</text>
  <text x="445" y="290" font-size="9" fill="#64748b" class="code">K values:    11   04   12   14   13   11</text>
  <text x="445" y="305" font-size="9" fill="#15803d" class="code">(P+K)%26:    11   23   05   14   15   21</text>

  <rect x="435" y="312" width="315" height="18" rx="3" fill="#dcfce7"/>
  <text x="592" y="325" font-size="9.5" font-weight="bold" fill="#15803d" text-anchor="middle">Ciphertext:  L    X    F    O    P    V</text>

  <!-- Vigenere Strengths & Kasiski -->
  <rect x="425" y="345" width="335" height="120" rx="6" fill="#fef3c7" stroke="#fde68a"/>
  <text x="435" y="365" font-size="10" font-weight="bold" fill="#b45309">Properties of Polyalphabetic Ciphers:</text>
  <text x="435" y="383" font-size="9" fill="#92400e">• Same plaintext letter encrypts to different ciphertext letters!</text>
  <text x="435" y="398" font-size="9" fill="#92400e">(e.g. First 'T' becomes 'X', second 'T' becomes 'F')</text>
  <text x="435" y="416" font-size="9" fill="#92400e">• Flattens simple letter frequency distributions.</text>
  <text x="435" y="433" font-size="9" fill="#b45309" font-weight="bold">Breaking Vigenère (Kasiski Test &amp; Friedman Index):</text>
  <text x="435" y="450" font-size="8.5" fill="#78350f">Repetitions at multiples of keyword length $m$ reveal key length.</text>
</svg>`;

// 15. TOPIC 5 - Transposition Ciphers
const svg_transposition = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  ${defsCommon}
  <rect width="800" height="500" rx="14" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="400" y="32" text-anchor="middle" class="title">Classical Transposition Ciphers: Rail Fence &amp; Columnar</text>
  <text x="400" y="50" text-anchor="middle" class="subtitle">Forouzan Section 30.2 / Permutation of Character Positions Without Symbol Substitution</text>

  <!-- Left: Rail Fence Cipher -->
  <rect x="25" y="70" width="365" height="410" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" filter="url(#shadow)"/>
  <text x="207" y="95" class="card-title" fill="#2563eb" text-anchor="middle">1. Keyless Rail Fence Cipher</text>
  <text x="207" y="112" class="sublabel" text-anchor="middle">Plaintext written in diagonal zigzag wave across rails</text>

  <!-- Zigzag illustration -->
  <rect x="40" y="125" width="335" height="150" rx="6" fill="#eff6ff" stroke="#93c5fd"/>
  <text x="50" y="145" font-size="10.5" font-weight="bold" fill="#1e40af">Message: "DEFEND THE EAST WALL" (Depth = 3):</text>

  <!-- Rails Grid -->
  <text x="60" y="175" class="code" font-size="11" fill="#1e40af" font-weight="bold">Rail 1:  D . . . N . . . E . . . T . . . A . . . L</text>
  <text x="60" y="205" class="code" font-size="11" fill="#059669" font-weight="bold">Rail 2:  . E . E . D . H . E . S . W . L . .</text>
  <text x="60" y="235" class="code" font-size="11" fill="#d97706" font-weight="bold">Rail 3:  . . F . . . T . . . A . . . A . . .</text>

  <!-- Read out row by row -->
  <rect x="40" y="290" width="335" height="80" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="50" y="310" font-size="10" font-weight="bold" fill="#0f172a">Ciphertext Assembly (Row by Row):</text>
  <text x="50" y="330" font-size="9.5" fill="#334155">Rail 1: <tspan class="code" font-weight="bold" fill="#1e40af">DNETAL</tspan></text>
  <text x="50" y="346" font-size="9.5" fill="#334155">Rail 2: <tspan class="code" font-weight="bold" fill="#059669">EEDHESWL</tspan></text>
  <text x="50" y="362" font-size="9.5" fill="#334155">Rail 3: <tspan class="code" font-weight="bold" fill="#d97706">FTAA</tspan></text>

  <rect x="40" y="380" width="335" height="85" rx="6" fill="#dbeafe"/>
  <text x="50" y="400" font-size="10" font-weight="bold" fill="#1e40af">Resulting Ciphertext:</text>
  <text x="50" y="420" font-size="11" font-weight="bold" fill="#0f172a" class="code">"DNETAL EEDHESWL FTAA"</text>
  <text x="50" y="445" font-size="8.5" fill="#1e40af">Decryption reconstructs wave pattern using identical depth parameter.</text>

  <!-- Right: Columnar Transposition Matrix -->
  <rect x="410" y="70" width="365" height="410" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" filter="url(#shadow)"/>
  <text x="592" y="95" class="card-title" fill="#059669" text-anchor="middle">2. Keyed Columnar Transposition</text>
  <text x="592" y="112" class="sublabel" text-anchor="middle">Plaintext written in rows; read out in key permutation order</text>

  <rect x="425" y="125" width="335" height="180" rx="6" fill="#f0fdf4" stroke="#86efac"/>
  <text x="435" y="145" font-size="10.5" font-weight="bold" fill="#15803d">Key: "HACK" → Alphabetical Order: [3, 1, 2, 4]</text>
  <text x="435" y="160" font-size="9.5" fill="#475569">Message: "COMPUTER NETWORKS"</text>

  <!-- Matrix Table -->
  <rect x="445" y="172" width="295" height="120" rx="4" fill="#ffffff" stroke="#16a34a"/>
  
  <!-- Header row: Keys and Order -->
  <rect x="445" y="172" width="295" height="25" fill="#dcfce7"/>
  <text x="480" y="189" font-size="10" font-weight="bold" fill="#15803d" text-anchor="middle">H (3)</text>
  <text x="555" y="189" font-size="10" font-weight="bold" fill="#15803d" text-anchor="middle">A (1)</text>
  <text x="630" y="189" font-size="10" font-weight="bold" fill="#15803d" text-anchor="middle">C (2)</text>
  <text x="705" y="189" font-size="10" font-weight="bold" fill="#15803d" text-anchor="middle">K (4)</text>

  <!-- Row 1 -->
  <text x="480" y="212" class="code" font-size="11" text-anchor="middle">C</text>
  <text x="555" y="212" class="code" font-size="11" text-anchor="middle">O</text>
  <text x="630" y="212" class="code" font-size="11" text-anchor="middle">M</text>
  <text x="705" y="212" class="code" font-size="11" text-anchor="middle">P</text>

  <!-- Row 2 -->
  <text x="480" y="232" class="code" font-size="11" text-anchor="middle">U</text>
  <text x="555" y="232" class="code" font-size="11" text-anchor="middle">T</text>
  <text x="630" y="232" class="code" font-size="11" text-anchor="middle">E</text>
  <text x="705" y="232" class="code" font-size="11" text-anchor="middle">R</text>

  <!-- Row 3 -->
  <text x="480" y="252" class="code" font-size="11" text-anchor="middle">N</text>
  <text x="555" y="252" class="code" font-size="11" text-anchor="middle">E</text>
  <text x="630" y="252" class="code" font-size="11" text-anchor="middle">T</text>
  <text x="705" y="252" class="code" font-size="11" text-anchor="middle">W</text>

  <!-- Row 4 -->
  <text x="480" y="272" class="code" font-size="11" text-anchor="middle">O</text>
  <text x="555" y="272" class="code" font-size="11" text-anchor="middle">R</text>
  <text x="630" y="272" class="code" font-size="11" text-anchor="middle">K</text>
  <text x="705" y="272" class="code" font-size="11" text-anchor="middle">S</text>

  <!-- Column read order box -->
  <rect x="425" y="315" width="335" height="70" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="435" y="335" font-size="9.5" font-weight="bold" fill="#0f172a">Read Out Columns in Numerical Order (1, 2, 3, 4):</text>
  <text x="435" y="352" font-size="9" fill="#334155">Col 1 ('A'): <tspan class="code" font-weight="bold">O T E R</tspan>  •  Col 2 ('C'): <tspan class="code" font-weight="bold">M E T K</tspan></text>
  <text x="435" y="368" font-size="9" fill="#334155">Col 3 ('H'): <tspan class="code" font-weight="bold">C U N O</tspan>  •  Col 4 ('K'): <tspan class="code" font-weight="bold">P R W S</tspan></text>

  <rect x="425" y="395" width="335" height="70" rx="6" fill="#dcfce7"/>
  <text x="435" y="415" font-size="10" font-weight="bold" fill="#15803d">Final Ciphertext:</text>
  <text x="435" y="435" font-size="11" font-weight="bold" fill="#0f172a" class="code">"OTER METK CUNO PRWS"</text>
  <text x="435" y="453" font-size="8.5" fill="#166534">Notice: Exactly preserves letter frequencies; alters only positional indices!</text>
</svg>`;

// 16. TOPIC 5 - Symmetric Algorithms (DES & AES)
const svg_symmetric = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  ${defsCommon}
  <rect width="800" height="500" rx="14" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="400" y="32" text-anchor="middle" class="title">Modern Symmetric Ciphers: DES Feistel vs AES SPN</text>
  <text x="400" y="50" text-anchor="middle" class="subtitle">Forouzan Chapter 30.2 / Shared Secret Key, Block Cipher Rounds &amp; Substitution-Permutation Networks</text>

  <!-- Left: DES (Feistel Structure) -->
  <rect x="25" y="70" width="365" height="410" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" filter="url(#shadow)"/>
  <text x="207" y="95" class="card-title" fill="#2563eb" text-anchor="middle">1. Data Encryption Standard (DES)</text>
  <text x="207" y="112" class="sublabel" text-anchor="middle">64-bit Block, 56-bit Key, 16-Round Feistel Network</text>

  <!-- Input Block -->
  <rect x="110" y="125" width="195" height="30" rx="5" fill="#eff6ff" stroke="#3b82f6"/>
  <text x="207" y="145" class="label" text-anchor="middle">64-bit Plaintext Block</text>

  <line x1="207" y1="155" x2="207" y2="175" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arrow)"/>
  <rect x="135" y="175" width="145" height="24" rx="4" fill="#f1f5f9"/>
  <text x="207" y="191" font-size="9" text-anchor="middle">Initial Permutation (IP)</text>

  <!-- Feistel Round i diagram -->
  <rect x="50" y="210" width="315" height="150" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="60" y="228" font-size="10" font-weight="bold" fill="#0f172a">Structure of Feistel Round $i$ (1 to 16):</text>

  <!-- Left and Right halves -->
  <rect x="70" y="240" width="110" height="28" rx="4" fill="#dbeafe"/>
  <text x="125" y="258" font-size="9.5" font-weight="bold" fill="#1e40af" text-anchor="middle">L_{i-1} (32 bits)</text>

  <rect x="230" y="240" width="110" height="28" rx="4" fill="#dbeafe"/>
  <text x="285" y="258" font-size="9.5" font-weight="bold" fill="#1e40af" text-anchor="middle">R_{i-1} (32 bits)</text>

  <!-- Round function F -->
  <rect x="230" y="280" width="110" height="28" rx="4" fill="#fef3c7" stroke="#f59e0b"/>
  <text x="285" y="298" font-size="9" font-weight="bold" fill="#b45309" text-anchor="middle">F(R_{i-1}, K_i)</text>

  <!-- Cross wires -->
  <path d="M 125 268 L 125 320 L 270 345" stroke="#2563eb" stroke-width="1.5" fill="none" marker-end="url(#arrow-blue)"/>
  <path d="M 285 308 L 285 325 L 140 345" stroke="#059669" stroke-width="1.5" fill="none" marker-end="url(#arrow-green)"/>

  <text x="207" y="358" font-size="9" class="code" fill="#0f172a" text-anchor="middle">L_i = R_{i-1}   |   R_i = L_{i-1} \oplus F(R_{i-1}, K_i)</text>

  <!-- DES Status -->
  <rect x="40" y="375" width="335" height="90" rx="6" fill="#fee2e2" stroke="#fca5a5"/>
  <text x="50" y="395" font-size="10" font-weight="bold" fill="#b91c1c">DES Security Status: DEPRECATED ⚠️</text>
  <text x="50" y="412" font-size="8.5" fill="#7f1d1d">• 56-bit key space ($2^{56} \approx 7.2 \times 10^{16}$) brute-forced in hours.</text>
  <text x="50" y="428" font-size="8.5" fill="#7f1d1d">• Triple DES (3DES) uses 168-bit keys ($E_{K1} \circ D_{K2} \circ E_{K1}$), but slow.</text>
  <text x="50" y="445" font-size="8.5" font-weight="bold" fill="#b91c1c">Replaced universally by AES (NIST FIPS 197).</text>

  <!-- Right: AES (SPN Structure) -->
  <rect x="410" y="70" width="365" height="410" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" filter="url(#shadow)"/>
  <text x="592" y="95" class="card-title" fill="#059669" text-anchor="middle">2. Advanced Encryption Standard (AES)</text>
  <text x="592" y="112" class="sublabel" text-anchor="middle">128-bit Block, 128/192/256-bit Key, Rijndael SPN Structure</text>

  <!-- 4 Stages in each round -->
  <rect x="425" y="125" width="335" height="235" rx="6" fill="#f0fdf4" stroke="#86efac"/>
  <text x="435" y="145" font-size="10.5" font-weight="bold" fill="#15803d">The 4 Transformations of Each AES Round:</text>

  <!-- Stage 1: SubBytes -->
  <rect x="440" y="155" width="305" height="38" rx="4" fill="#ffffff" stroke="#16a34a"/>
  <text x="450" y="172" font-size="9.5" font-weight="bold" fill="#15803d">1. SubBytes (Byte Substitution):</text>
  <text x="450" y="185" font-size="8.5" fill="#475569">Non-linear S-box lookup table providing non-linearity &amp; confusion.</text>

  <!-- Stage 2: ShiftRows -->
  <rect x="440" y="200" width="305" height="38" rx="4" fill="#ffffff" stroke="#16a34a"/>
  <text x="450" y="217" font-size="9.5" font-weight="bold" fill="#15803d">2. ShiftRows (Permutation):</text>
  <text x="450" y="230" font-size="8.5" fill="#475569">Row 0 shifted 0, Row 1 shifted 1, Row 2 shifted 2, Row 3 shifted 3 bytes.</text>

  <!-- Stage 3: MixColumns -->
  <rect x="440" y="245" width="305" height="38" rx="4" fill="#ffffff" stroke="#16a34a"/>
  <text x="450" y="262" font-size="9.5" font-weight="bold" fill="#15803d">3. MixColumns (Diffusion):</text>
  <text x="450" y="275" font-size="8.5" fill="#475569">Matrix multiplication in Galois Field $GF(2^8)$ across columns.</text>

  <!-- Stage 4: AddRoundKey -->
  <rect x="440" y="290" width="305" height="38" rx="4" fill="#ffffff" stroke="#16a34a"/>
  <text x="450" y="307" font-size="9.5" font-weight="bold" fill="#15803d">4. AddRoundKey (Key Mixing):</text>
  <text x="450" y="320" font-size="8.5" fill="#475569">Bitwise XOR of 128-bit state matrix with 128-bit round subkey.</text>

  <rect x="440" y="333" width="305" height="20" rx="3" fill="#dcfce7"/>
  <text x="592" y="347" font-size="9" font-weight="bold" fill="#166534" text-anchor="middle">Rounds: AES-128 = 10 | AES-192 = 12 | AES-256 = 14</text>

  <!-- AES Strengths -->
  <rect x="425" y="375" width="335" height="90" rx="6" fill="#dcfce7" stroke="#86efac"/>
  <text x="435" y="395" font-size="10" font-weight="bold" fill="#15803d">AES Gold Standard Features:</text>
  <text x="435" y="412" font-size="8.5" fill="#14532d">• Immune to all known cryptanalytic shortcut attacks (linear/differential).</text>
  <text x="435" y="428" font-size="8.5" fill="#14532d">• Hardware-accelerated on modern Intel/AMD/ARM CPUs (AES-NI instructions).</text>
  <text x="435" y="445" font-size="8.5" font-weight="bold" fill="#15803d">Encrypted GCM mode provides authenticated encryption (AEAD).</text>
</svg>`;

// 17. TOPIC 5 - Public Key Algorithms
const svg_pubkey = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  ${defsCommon}
  <rect width="800" height="500" rx="14" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="400" y="32" text-anchor="middle" class="title">Public Key Cryptography &amp; Diffie-Hellman Key Exchange</text>
  <text x="400" y="50" text-anchor="middle" class="subtitle">Forouzan Section 30.3 / Asymmetric Key Pairs, Trapdoor One-Way Functions &amp; Shared Secret Derivation</text>

  <!-- Left: Asymmetric Key Pair Dual Roles -->
  <rect x="25" y="70" width="365" height="410" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" filter="url(#shadow)"/>
  <text x="207" y="95" class="card-title" fill="#2563eb" text-anchor="middle">1. Asymmetric Key Pair Paradigm</text>
  <text x="207" y="112" class="sublabel" text-anchor="middle">Mathematically linked Public Key ($K_{pub}$) and Private Key ($K_{priv}$)</text>

  <!-- Application 1: Confidentiality -->
  <rect x="40" y="125" width="335" height="150" rx="6" fill="#eff6ff" stroke="#93c5fd"/>
  <text x="50" y="145" font-size="10.5" font-weight="bold" fill="#1e40af">Application A: Public Key Encryption (Confidentiality)</text>
  
  <rect x="50" y="155" width="90" height="40" rx="4" fill="#ffffff" stroke="#3b82f6"/>
  <text x="95" y="172" font-size="9" font-weight="bold" text-anchor="middle">Sender (Alice)</text>
  <text x="95" y="185" font-size="8" fill="#64748b" text-anchor="middle">Plaintext $P$</text>

  <path d="M 140 175 L 180 175" stroke="#2563eb" stroke-width="1.5" marker-end="url(#arrow-blue)"/>

  <rect x="185" y="155" width="85" height="40" rx="4" fill="#dbeafe"/>
  <text x="227" y="172" font-size="8.5" font-weight="bold" fill="#1e40af" text-anchor="middle">Bob's Public Key</text>
  <text x="227" y="185" class="code" font-size="8" fill="#1e40af" text-anchor="middle">K_{pub, Bob}</text>

  <path d="M 270 175 L 305 175" stroke="#2563eb" stroke-width="1.5" marker-end="url(#arrow-blue)"/>

  <rect x="310" y="155" width="55" height="40" rx="4" fill="#fee2e2"/>
  <text x="337" y="172" font-size="8.5" font-weight="bold" fill="#b91c1c" text-anchor="middle">Cipher</text>
  <text x="337" y="185" font-size="8" fill="#b91c1c" text-anchor="middle">$C$</text>

  <text x="50" y="220" font-size="9" fill="#1e40af">• Alice encrypts with <tspan font-weight="bold">Bob's Public Key</tspan>.</text>
  <text x="50" y="236" font-size="9" fill="#1e40af">• <tspan font-weight="bold">Only Bob</tspan> can decrypt using his secret <tspan font-weight="bold">Private Key</tspan> $K_{priv, Bob}$.</text>
  <text x="50" y="252" font-size="8.5" fill="#475569">• Solves the Key Distribution Problem: No shared secret needed in advance!</text>

  <!-- Application 2: Digital Signatures -->
  <rect x="40" y="290" width="335" height="175" rx="6" fill="#f0fdf4" stroke="#86efac"/>
  <text x="50" y="310" font-size="10.5" font-weight="bold" fill="#15803d">Application B: Digital Signature (Authentication)</text>

  <rect x="50" y="325" width="90" height="40" rx="4" fill="#ffffff" stroke="#16a34a"/>
  <text x="95" y="342" font-size="9" font-weight="bold" text-anchor="middle">Sender (Alice)</text>
  <text x="95" y="355" font-size="8" fill="#64748b" text-anchor="middle">Signs with Private</text>

  <path d="M 140 345 L 180 345" stroke="#16a34a" stroke-width="1.5" marker-end="url(#arrow-green)"/>

  <rect x="185" y="325" width="85" height="40" rx="4" fill="#dcfce7"/>
  <text x="227" y="342" font-size="8.5" font-weight="bold" fill="#15803d" text-anchor="middle">Alice's Private Key</text>
  <text x="227" y="355" class="code" font-size="8" fill="#15803d" text-anchor="middle">K_{priv, Alice}</text>

  <path d="M 270 345 L 305 345" stroke="#16a34a" stroke-width="1.5" marker-end="url(#arrow-green)"/>

  <rect x="310" y="325" width="55" height="40" rx="4" fill="#fef3c7"/>
  <text x="337" y="342" font-size="8.5" font-weight="bold" fill="#b45309" text-anchor="middle">Signature</text>
  <text x="337" y="355" font-size="8" fill="#b45309" text-anchor="middle">$S$</text>

  <text x="50" y="390" font-size="9" fill="#15803d">• Alice signs hash with her secret <tspan font-weight="bold">Private Key</tspan>.</text>
  <text x="50" y="406" font-size="9" fill="#15803d">• <tspan font-weight="bold">Anyone</tspan> can verify using Alice's <tspan font-weight="bold">Public Key</tspan> $K_{pub, Alice}$.</text>
  <text x="50" y="422" font-size="9" fill="#15803d">• Guarantees Authenticity, Integrity &amp; Non-Repudiation!</text>
  <text x="50" y="440" font-size="8.5" fill="#166534">Basis for X.509 Certificates, TLS Handshakes &amp; Code Signing.</text>

  <!-- Right: Diffie-Hellman Key Exchange -->
  <rect x="410" y="70" width="365" height="410" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" filter="url(#shadow)"/>
  <text x="592" y="95" class="card-title" fill="#059669" text-anchor="middle">2. Diffie-Hellman Key Exchange</text>
  <text x="592" y="112" class="sublabel" text-anchor="middle">Derives a shared symmetric session key over an insecure link</text>

  <!-- Public parameters -->
  <rect x="425" y="125" width="335" height="45" rx="6" fill="#fef3c7" stroke="#fde68a"/>
  <text x="435" y="143" font-size="10" font-weight="bold" fill="#b45309">Global Public Domain Parameters:</text>
  <text x="435" y="160" font-size="9.5" fill="#78350f" class="code">Large Prime: p   |   Primitive Root (Generator): g</text>

  <!-- Alice and Bob Columns -->
  <rect x="430" y="180" width="150" height="200" rx="6" fill="#eff6ff" stroke="#93c5fd"/>
  <text x="505" y="202" font-size="10.5" font-weight="bold" fill="#1e40af" text-anchor="middle">Alice</text>
  <text x="440" y="222" font-size="8.5" fill="#334155">1. Pick private secret:</text>
  <text x="440" y="237" class="code" font-size="9" fill="#2563eb">a \in \{2, \dots, p-2\}</text>
  <text x="440" y="257" font-size="8.5" fill="#334155">2. Compute public value:</text>
  <text x="440" y="272" class="code" font-size="9" fill="#2563eb">A = g^a \pmod p</text>
  <text x="440" y="295" font-size="8.5" fill="#334155">3. Sends A to Bob →</text>
  <text x="440" y="325" font-size="8.5" fill="#334155">4. Computes Shared Key:</text>
  <text x="440" y="342" class="code" font-size="10" font-weight="bold" fill="#059669">K = B^a \pmod p</text>

  <rect x="610" y="180" width="150" height="200" rx="6" fill="#f0fdf4" stroke="#86efac"/>
  <text x="685" y="202" font-size="10.5" font-weight="bold" fill="#15803d" text-anchor="middle">Bob</text>
  <text x="620" y="222" font-size="8.5" fill="#334155">1. Pick private secret:</text>
  <text x="620" y="237" class="code" font-size="9" fill="#16a34a">b \in \{2, \dots, p-2\}</text>
  <text x="620" y="257" font-size="8.5" fill="#334155">2. Compute public value:</text>
  <text x="620" y="272" class="code" font-size="9" fill="#16a34a">B = g^b \pmod p</text>
  <text x="620" y="295" font-size="8.5" fill="#334155">← Sends B to Alice</text>
  <text x="620" y="325" font-size="8.5" fill="#334155">4. Computes Shared Key:</text>
  <text x="620" y="342" class="code" font-size="10" font-weight="bold" fill="#059669">K = A^b \pmod p</text>

  <!-- Key Equality match -->
  <rect x="425" y="390" width="335" height="75" rx="6" fill="#dcfce7" stroke="#16a34a"/>
  <text x="592" y="410" font-size="10" font-weight="bold" fill="#15803d" text-anchor="middle">Identical Shared Secret: $K = g^{ab} \pmod p$</text>
  <text x="592" y="428" font-size="8.5" fill="#14532d" text-anchor="middle">Eavesdropper sees only $(p, g, A, B)$. Computing $a$ or $b$ requires solving</text>
  <text x="592" y="443" font-size="8.5" font-weight="bold" fill="#14532d" text-anchor="middle">The Discrete Logarithm Problem (computationally infeasible for large $p$).</text>
</svg>`;

// 18. TOPIC 5 - RSA Algorithm
const svg_rsa = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  ${defsCommon}
  <rect width="800" height="500" rx="14" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="400" y="32" text-anchor="middle" class="title">The RSA Public-Key Cryptographic Algorithm</text>
  <text x="400" y="50" text-anchor="middle" class="subtitle">Forouzan Section 30.3 / Prime Factorization, Euler Totient $\phi(n)$, Keygen, &amp; Worked Example 30.7</text>

  <!-- Left: Step-by-Step RSA Algorithm Flowchart -->
  <rect x="25" y="70" width="365" height="410" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" filter="url(#shadow)"/>
  <text x="207" y="95" class="card-title" fill="#2563eb" text-anchor="middle">1. Key Generation Procedure</text>

  <!-- Step 1 -->
  <rect x="40" y="115" width="335" height="45" rx="5" fill="#eff6ff" stroke="#3b82f6"/>
  <text x="50" y="133" font-size="9.5" font-weight="bold" fill="#1e40af">Step 1: Choose Two Large Prime Numbers</text>
  <text x="50" y="148" class="code" font-size="9.5" fill="#0f172a">Select distinct secret primes p and q</text>

  <!-- Step 2 -->
  <rect x="40" y="168" width="335" height="45" rx="5" fill="#eff6ff" stroke="#3b82f6"/>
  <text x="50" y="186" font-size="9.5" font-weight="bold" fill="#1e40af">Step 2: Calculate Modulus n</text>
  <text x="50" y="201" class="code" font-size="9.5" fill="#0f172a">n = p \times q   (Announced to Public)</text>

  <!-- Step 3 -->
  <rect x="40" y="221" width="335" height="45" rx="5" fill="#eff6ff" stroke="#3b82f6"/>
  <text x="50" y="239" font-size="9.5" font-weight="bold" fill="#1e40af">Step 3: Calculate Euler Totient \phi(n)</text>
  <text x="50" y="254" class="code" font-size="9.5" fill="#0f172a">\phi(n) = (p - 1) \times (q - 1)   (Kept Secret!)</text>

  <!-- Step 4 -->
  <rect x="40" y="274" width="335" height="52" rx="5" fill="#fef3c7" stroke="#f59e0b"/>
  <text x="50" y="292" font-size="9.5" font-weight="bold" fill="#b45309">Step 4: Select Public Exponent e</text>
  <text x="50" y="306" class="code" font-size="9" fill="#78350f">1 &lt; e &lt; \phi(n)   \text{such that}   \gcd(e, \phi(n)) = 1</text>
  <text x="50" y="320" font-size="8" fill="#92400e">(e must be coprime to \phi(n); common choices: 3, 17, 65537)</text>

  <!-- Step 5 -->
  <rect x="40" y="334" width="335" height="52" rx="5" fill="#fef3c7" stroke="#f59e0b"/>
  <text x="50" y="352" font-size="9.5" font-weight="bold" fill="#b45309">Step 5: Calculate Private Exponent d</text>
  <text x="50" y="366" class="code" font-size="9" fill="#78350f">d \times e \equiv 1 \pmod{\phi(n)} \implies d = e^{-1} \pmod{\phi(n)}</text>
  <text x="50" y="380" font-size="8" fill="#92400e">(Calculated efficiently via Extended Euclidean Algorithm)</text>

  <!-- Keys Output -->
  <rect x="40" y="395" width="335" height="70" rx="6" fill="#f0fdf4" stroke="#16a34a"/>
  <text x="50" y="415" font-size="10" font-weight="bold" fill="#15803d">Final Key Pairs Generated:</text>
  <text x="50" y="433" font-size="9.5" fill="#14532d"><tspan font-weight="bold">Public Key (Shared with world):</tspan> <tspan class="code font-bold">PU = {e, n}</tspan></text>
  <text x="50" y="452" font-size="9.5" fill="#14532d"><tspan font-weight="bold">Private Key (Strictly confidential):</tspan> <tspan class="code font-bold">PR = {d, n}</tspan></text>

  <!-- Right: Encryption, Decryption & Forouzan Example 30.7 -->
  <rect x="410" y="70" width="365" height="410" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" filter="url(#shadow)"/>
  <text x="592" y="95" class="card-title" fill="#059669" text-anchor="middle">2. Encryption, Decryption &amp; Numerical Proof</text>

  <!-- Formulas Box -->
  <rect x="425" y="115" width="335" height="70" rx="6" fill="#f0fdf4" stroke="#86efac"/>
  <text x="435" y="135" font-size="10" font-weight="bold" fill="#15803d">Transformation Mathematical Formulas:</text>
  <text x="435" y="155" class="code" font-size="10" fill="#0f172a">Encryption (Alice): C = M^e \pmod n  \quad (M &lt; n)</text>
  <text x="435" y="173" class="code" font-size="10" fill="#0f172a">Decryption (Bob):   M = C^d \pmod n</text>

  <!-- McGraw-Hill Forouzan Example 30.7 Box -->
  <rect x="425" y="195" width="335" height="195" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="435" y="215" font-size="10.5" font-weight="bold" fill="#0f172a">McGraw-Hill Forouzan Example 30.7 Walkthrough:</text>

  <text x="435" y="235" font-size="9" fill="#334155" class="code">1. Primes chosen: p = 7,  q = 11</text>
  <text x="435" y="250" font-size="9" fill="#334155" class="code">2. Modulus:       n = 7 \times 11 = 77</text>
  <text x="435" y="265" font-size="9" fill="#334155" class="code">3. Totient:       \phi(n) = (7-1)(11-1) = 6 \times 10 = 60</text>
  <text x="435" y="280" font-size="9" fill="#334155" class="code">4. Public key e:  Choose e = 13  (gcd(13, 60) = 1)</text>
  <text x="435" y="295" font-size="9" fill="#334155" class="code">5. Private key d: d = 13^{-1} \bmod 60 = 37</text>
  <text x="450" y="310" font-size="8" fill="#64748b">(Check: 13 \times 37 = 481 = (8 \times 60) + 1 \equiv 1 \pmod{60} ✓)</text>

  <rect x="435" y="320" width="315" height="24" rx="4" fill="#dbeafe"/>
  <text x="445" y="336" font-size="9" font-weight="bold" fill="#1e40af">6. Encryption of Plaintext M = 5:</text>
  <text x="445" y="354" font-size="9" class="code" fill="#0f172a">C = 5^{13} \pmod{77} \equiv 1,220,703,125 \pmod{77} = 26</text>

  <rect x="435" y="362" width="315" height="24" rx="4" fill="#dcfce7"/>
  <text x="445" y="378" font-size="9" font-weight="bold" fill="#15803d">7. Decryption of Ciphertext C = 26:</text>

  <rect x="425" y="400" width="335" height="65" rx="6" fill="#eff6ff" stroke="#93c5fd"/>
  <text x="435" y="420" font-size="9.5" font-weight="bold" fill="#1e40af">M = 26^{37} \pmod{77} = 5   (Plaintext Recovered! ✓)</text>
  <text x="435" y="438" font-size="8" fill="#475569">Security Foundation: Eve cannot find d without factoring n into p and q.</text>
  <text x="435" y="453" font-size="8" fill="#475569">For 2048-bit n, factoring takes millions of years on classical computers.</text>
</svg>`;

// Save all part 2 SVGs
saveSvg('assets/images/unit5/topic3/content-delivery-networks.svg', svg_cdn);
saveSvg('assets/images/unit5/topic3/server-farms.svg', svg_server_farms);
saveSvg('assets/images/unit5/topic3/web-proxies.svg', svg_proxies);

saveSvg('assets/images/unit5/topic4/p2p-networks.svg', svg_p2p);
saveSvg('assets/images/unit5/topic4/firewalls.svg', svg_firewalls);
saveSvg('assets/images/unit5/topic4/ids-ips-architecture.svg', svg_ids);

saveSvg('assets/images/unit5/topic5/cryptography-fundamentals.svg', svg_crypto_intro);
saveSvg('assets/images/unit5/topic5/substitution-ciphers.svg', svg_substitution);
saveSvg('assets/images/unit5/topic5/transposition-ciphers.svg', svg_transposition);
saveSvg('assets/images/unit5/topic5/symmetric-algorithms.svg', svg_symmetric);
saveSvg('assets/images/unit5/topic5/public-key-cryptography.svg', svg_pubkey);
saveSvg('assets/images/unit5/topic5/rsa-algorithm.svg', svg_rsa);

