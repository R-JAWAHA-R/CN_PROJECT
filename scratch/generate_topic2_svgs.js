const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../assets/images/unit3/topic2-internetworking');

const svgs = {};

// 1. internetwork-routing.svg
svgs['internetwork-routing.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  <defs>
    <style>
      text { font-family: 'Segoe UI', Arial, sans-serif; }
      .title { font-size: 20px; font-weight: bold; fill: #1e293b; }
      .sub { font-size: 13px; fill: #475569; }
      .r-label { font-size: 12px; font-weight: bold; fill: #ffffff; text-anchor: middle; }
      .net-label { font-size: 12px; font-weight: bold; fill: #1e40af; text-anchor: middle; }
      .pkt-label { font-size: 10px; font-weight: bold; fill: #b45309; text-anchor: middle; }
    </style>
    <filter id="shadow" x="-2%" y="-2%" width="104%" height="104%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.08"/>
    </filter>
  </defs>

  <rect width="800" height="500" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="400" y="38" text-anchor="middle" class="title">Hop-by-Hop Internetwork Routing</text>
  <text x="400" y="58" text-anchor="middle" class="sub">How Packets Traverse Heterogeneous Networks Across Intermediate Routers</text>

  <!-- Source Host & LAN A -->
  <g transform="translate(40, 110)">
    <rect width="130" height="180" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="65" y="25" class="net-label">LAN A (Token Ring)</text>
    <text x="65" y="42" text-anchor="middle" font-size="11" fill="#3b82f6">10.1.0.0/16</text>
    
    <rect x="25" y="65" width="80" height="50" rx="6" fill="#ffffff" stroke="#2563eb" filter="url(#shadow)"/>
    <text x="65" y="90" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Source Host</text>
    <text x="65" y="105" text-anchor="middle" font-size="10" fill="#2563eb">10.1.0.5</text>

    <!-- Source MAC / IP -->
    <rect x="15" y="130" width="100" height="35" rx="4" fill="#dbeafe"/>
    <text x="65" y="145" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e40af">Src IP: 10.1.0.5</text>
    <text x="65" y="158" text-anchor="middle" font-size="9" fill="#1e40af">Dst IP: 192.168.2.80</text>
  </g>

  <!-- Router 1 -->
  <g transform="translate(210, 160)">
    <circle cx="45" cy="45" r="35" fill="#2563eb" filter="url(#shadow)"/>
    <text x="45" y="42" class="r-label">ROUTER 1</text>
    <text x="45" y="58" text-anchor="middle" font-size="9" fill="#bfdbfe">Default GW</text>
  </g>

  <!-- Transit Network WAN -->
  <g transform="translate(320, 130)">
    <rect width="160" height="120" rx="8" fill="#f1f5f9" stroke="#94a3b8" stroke-dasharray="6,4"/>
    <text x="80" y="25" text-anchor="middle" font-size="12" font-weight="bold" fill="#475569">WAN / ISP Cloud</text>
    <text x="80" y="42" text-anchor="middle" font-size="10" fill="#64748b">Point-to-Point (HDLC)</text>
    
    <!-- Packet in transit -->
    <rect x="30" y="65" width="100" height="36" rx="4" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.2"/>
    <text x="80" y="82" class="pkt-label">Network Layer IP</text>
    <text x="80" y="94" text-anchor="middle" font-size="8.5" fill="#92400e">Unchanged Headers</text>
  </g>

  <!-- Router 2 -->
  <g transform="translate(500, 160)">
    <circle cx="45" cy="45" r="35" fill="#2563eb" filter="url(#shadow)"/>
    <text x="45" y="42" class="r-label">ROUTER 2</text>
    <text x="45" y="58" text-anchor="middle" font-size="9" fill="#bfdbfe">Border GW</text>
  </g>

  <!-- Destination Host & LAN B -->
  <g transform="translate(630, 110)">
    <rect width="130" height="180" rx="8" fill="#ecfdf5" stroke="#10b981" stroke-width="1.5"/>
    <text x="65" y="25" text-anchor="middle" font-size="12" font-weight="bold" fill="#047857">LAN B (Ethernet)</text>
    <text x="65" y="42" text-anchor="middle" font-size="11" fill="#10b981">192.168.2.0/24</text>

    <rect x="25" y="65" width="80" height="50" rx="6" fill="#ffffff" stroke="#059669" filter="url(#shadow)"/>
    <text x="65" y="90" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Dest Host</text>
    <text x="65" y="105" text-anchor="middle" font-size="10" fill="#059669">192.168.2.80</text>

    <!-- Final Delivery -->
    <rect x="15" y="130" width="100" height="35" rx="4" fill="#d1fae5"/>
    <text x="65" y="145" text-anchor="middle" font-size="9" font-weight="bold" fill="#065f46">Packet Delivered</text>
    <text x="65" y="158" text-anchor="middle" font-size="9" fill="#047857">ARP to Dest MAC</text>
  </g>

  <!-- Connectors -->
  <line x1="170" y1="205" x2="210" y2="205" stroke="#3b82f6" stroke-width="3"/>
  <line x1="300" y1="205" x2="320" y2="205" stroke="#64748b" stroke-width="3"/>
  <line x1="480" y1="205" x2="500" y2="205" stroke="#64748b" stroke-width="3"/>
  <line x1="590" y1="205" x2="630" y2="205" stroke="#10b981" stroke-width="3"/>

  <!-- Key Concept Box -->
  <g transform="translate(60, 320)">
    <rect width="680" height="135" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2" filter="url(#shadow)"/>
    <text x="25" y="28" font-size="14" font-weight="bold" fill="#1e293b">Key Internetworking Principles:</text>
    <text x="25" y="55" font-size="12" fill="#334155"><tspan font-weight="bold" fill="#2563eb">1. L3 Addressing Persistence:</tspan> The Source IP (10.1.0.5) and Destination IP (192.168.2.80) NEVER change across hops.</text>
    <text x="25" y="80" font-size="12" fill="#334155"><tspan font-weight="bold" fill="#059669">2. L2 Frame Stripping &amp; Re-encapsulation:</tspan> Routers strip incoming Data Link headers (Token Ring) and rebuild new frames (HDLC / Ethernet).</text>
    <text x="25" y="105" font-size="12" fill="#334155"><tspan font-weight="bold" fill="#ea580c">3. Independent MTU &amp; Routing:</tspan> Each network maintains its own physical media, packet format, framing, and MTU limits.</text>
  </g>
</svg>`;

// 2. routing-table-example.svg
svgs['routing-table-example.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  <defs>
    <style>
      text { font-family: 'Segoe UI', Arial, sans-serif; }
      .title { font-size: 20px; font-weight: bold; fill: #1e293b; }
      .sub { font-size: 13px; fill: #475569; }
      .th { font-size: 12px; font-weight: bold; fill: #ffffff; text-anchor: middle; }
      .td { font-size: 12px; fill: #1e293b; text-anchor: middle; }
      .td-mono { font-family: 'Consolas', monospace; font-size: 12px; fill: #1e293b; text-anchor: middle; }
    </style>
    <filter id="shadow" x="-2%" y="-2%" width="104%" height="104%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.08"/>
    </filter>
  </defs>

  <rect width="800" height="500" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="400" y="38" text-anchor="middle" class="title">Router Forwarding Table (Routing Table Anatomy)</text>
  <text x="400" y="58" text-anchor="middle" class="sub">Routing decision via Longest Prefix Matching (LPM) on Destination IP</text>

  <!-- Table Container -->
  <g transform="translate(50, 85)" filter="url(#shadow)">
    <!-- Table Header -->
    <rect x="0" y="0" width="700" height="35" rx="6 6 0 0" fill="#1e293b"/>
    <text x="80" y="22" class="th">Destination Network</text>
    <text x="210" y="22" class="th">Subnet Mask</text>
    <text x="320" y="22" class="th">Prefix</text>
    <text x="430" y="22" class="th">Next-Hop IP</text>
    <text x="540" y="22" class="th">Out Interface</text>
    <text x="640" y="22" class="th">Metric / Cost</text>

    <!-- Row 1: Directly Connected -->
    <g transform="translate(0, 35)">
      <rect width="700" height="36" fill="#ffffff"/>
      <text x="80" y="22" class="td-mono" font-weight="bold" fill="#059669">192.168.1.0</text>
      <text x="210" y="22" class="td-mono">255.255.255.0</text>
      <text x="320" y="22" class="td">/24</text>
      <text x="430" y="22" class="td" fill="#059669" font-weight="bold">Directly Connected</text>
      <text x="540" y="22" class="td-mono">eth0</text>
      <text x="640" y="22" class="td">0</text>
    </g>

    <!-- Row 2: Subnet with specific next hop -->
    <g transform="translate(0, 71)">
      <rect width="700" height="36" fill="#f8fafc"/>
      <text x="80" y="22" class="td-mono" font-weight="bold" fill="#2563eb">10.0.0.0</text>
      <text x="210" y="22" class="td-mono">255.0.0.0</text>
      <text x="320" y="22" class="td">/8</text>
      <text x="430" y="22" class="td-mono">192.168.1.254</text>
      <text x="540" y="22" class="td-mono">eth0</text>
      <text x="640" y="22" class="td">1 (OSPF)</text>
    </g>

    <!-- Row 3: Specific Subnet (/28) -->
    <g transform="translate(0, 107)">
      <rect width="700" height="36" fill="#ffffff"/>
      <text x="80" y="22" class="td-mono" font-weight="bold" fill="#7c3aed">172.16.50.0</text>
      <text x="210" y="22" class="td-mono">255.255.255.240</text>
      <text x="320" y="22" class="td">/28</text>
      <text x="430" y="22" class="td-mono">10.10.1.2</text>
      <text x="540" y="22" class="td-mono">eth1</text>
      <text x="640" y="22" class="td">3 (BGP)</text>
    </g>

    <!-- Row 4: Point to Point Link -->
    <g transform="translate(0, 143)">
      <rect width="700" height="36" fill="#f8fafc"/>
      <text x="80" y="22" class="td-mono" font-weight="bold" fill="#059669">10.10.1.0</text>
      <text x="210" y="22" class="td-mono">255.255.255.252</text>
      <text x="320" y="22" class="td">/30</text>
      <text x="430" y="22" class="td" fill="#059669" font-weight="bold">Directly Connected</text>
      <text x="540" y="22" class="td-mono">eth1</text>
      <text x="640" y="22" class="td">0</text>
    </g>

    <!-- Row 5: Host Route (/32) -->
    <g transform="translate(0, 179)">
      <rect width="700" height="36" fill="#ffffff"/>
      <text x="80" y="22" class="td-mono" font-weight="bold" fill="#ea580c">198.51.100.1</text>
      <text x="210" y="22" class="td-mono">255.255.255.255</text>
      <text x="320" y="22" class="td">/32</text>
      <text x="430" y="22" class="td-mono">10.10.1.2</text>
      <text x="540" y="22" class="td-mono">eth1</text>
      <text x="640" y="22" class="td">1 (Host Route)</text>
    </g>

    <!-- Row 6: Default Gateway -->
    <g transform="translate(0, 215)">
      <rect width="700" height="36" rx="0 0 6 6" fill="#eff6ff"/>
      <text x="80" y="22" class="td-mono" font-weight="bold" fill="#dc2626">0.0.0.0</text>
      <text x="210" y="22" class="td-mono">0.0.0.0</text>
      <text x="320" y="22" class="td" font-weight="bold" fill="#dc2626">/0</text>
      <text x="430" y="22" class="td-mono" font-weight="bold" fill="#dc2626">203.0.113.1</text>
      <text x="540" y="22" class="td-mono" font-weight="bold">eth2</text>
      <text x="640" y="22" class="td" fill="#dc2626">Default Route</text>
    </g>
  </g>

  <!-- Explanation Box -->
  <g transform="translate(50, 355)">
    <rect width="700" height="110" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2" filter="url(#shadow)"/>
    <text x="20" y="25" font-size="13" font-weight="bold" fill="#1e293b">Longest Prefix Match (LPM) Rule:</text>
    <text x="20" y="48" font-size="11.5" fill="#334155">When multiple table entries match an incoming destination IP, the router selects the match with the <tspan font-weight="bold" fill="#2563eb">highest prefix length</tspan> (most specific mask).</text>
    <text x="20" y="70" font-size="11.5" fill="#334155">Example: An incoming packet for <tspan font-weight="bold">172.16.50.5</tspan> matches both /0 (default) and /28. The router forwards via <tspan font-weight="bold" fill="#7c3aed">eth1 (Next-hop: 10.10.1.2)</tspan> because /28 is more specific than /0.</text>
    <text x="20" y="92" font-size="11.5" fill="#64748b">If no specific route matches, the packet falls through to the Default Route (0.0.0.0/0). If no default route exists, it is dropped with ICMP "Network Unreachable".</text>
  </g>
</svg>`;

// 3. tunneling-concept.svg
svgs['tunneling-concept.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  <defs>
    <style>
      text { font-family: 'Segoe UI', Arial, sans-serif; }
      .title { font-size: 20px; font-weight: bold; fill: #1e293b; }
      .sub { font-size: 13px; fill: #475569; }
      .hdr { font-size: 11px; font-weight: bold; fill: #ffffff; text-anchor: middle; }
    </style>
    <filter id="shadow" x="-2%" y="-2%" width="104%" height="104%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.08"/>
    </filter>
  </defs>

  <rect width="800" height="500" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="400" y="38" text-anchor="middle" class="title">Packet Encapsulation via Tunneling</text>
  <text x="400" y="58" text-anchor="middle" class="sub">Carrying Foreign Protocol Packets Across an Incompatible Intermediate Network</text>

  <!-- Network Layout -->
  <!-- Left IPv6 Island -->
  <g transform="translate(40, 90)">
    <rect width="180" height="230" rx="10" fill="#ecfdf5" stroke="#10b981" stroke-width="1.5"/>
    <text x="90" y="30" text-anchor="middle" font-size="14" font-weight="bold" fill="#047857">IPv6 Network A</text>
    <text x="90" y="50" text-anchor="middle" font-size="11" fill="#059669">(Native IPv6 Island)</text>

    <!-- Source Host -->
    <rect x="25" y="70" width="130" height="60" rx="6" fill="#ffffff" stroke="#059669" filter="url(#shadow)"/>
    <text x="90" y="95" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">IPv6 Host</text>
    <text x="90" y="112" text-anchor="middle" font-size="10" fill="#059669">2001:db8:1::10</text>

    <!-- Native Packet -->
    <g transform="translate(15, 150)">
      <rect x="0" y="0" width="60" height="30" rx="3" fill="#059669"/>
      <text x="30" y="18" class="hdr">IPv6 Hdr</text>
      <rect x="62" y="0" width="88" height="30" rx="3" fill="#3b82f6"/>
      <text x="106" y="18" class="hdr">Payload Data</text>
    </g>
  </g>

  <!-- Tunneling Cloud (IPv4 Transit) -->
  <g transform="translate(250, 90)">
    <rect width="300" height="230" rx="10" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="150" y="30" text-anchor="middle" font-size="14" font-weight="bold" fill="#1d4ed8">IPv4 Transit Network</text>
    <text x="150" y="50" text-anchor="middle" font-size="11" fill="#2563eb">(Tunnel Endpoint Routers)</text>

    <!-- Tunnel Tube -->
    <rect x="20" y="75" width="260" height="70" rx="8" fill="#ffffff" stroke="#2563eb" stroke-dasharray="6,4" stroke-width="2"/>
    <text x="150" y="100" text-anchor="middle" font-size="12" font-weight="bold" fill="#2563eb">Encapsulated IPv4 Tunnel</text>

    <!-- Encapsulated Packet inside Tunnel -->
    <g transform="translate(30, 110)">
      <rect x="0" y="0" width="70" height="26" rx="3" fill="#ea580c"/>
      <text x="35" y="17" class="hdr" font-size="9">IPv4 Hdr</text>

      <rect x="72" y="0" width="70" height="26" rx="3" fill="#059669"/>
      <text x="107" y="17" class="hdr" font-size="9">IPv6 Hdr</text>

      <rect x="144" y="0" width="95" height="26" rx="3" fill="#3b82f6"/>
      <text x="191" y="17" class="hdr" font-size="9">Data Payload</text>
    </g>

    <text x="150" y="175" text-anchor="middle" font-size="11" fill="#1e40af">IPv4 routers only inspect outer IPv4 header!</text>
    <text x="150" y="195" text-anchor="middle" font-size="10" fill="#64748b">Protocol 41 in IPv4 header indicates IPv6</text>
  </g>

  <!-- Right IPv6 Island -->
  <g transform="translate(580, 90)">
    <rect width="180" height="230" rx="10" fill="#ecfdf5" stroke="#10b981" stroke-width="1.5"/>
    <text x="90" y="30" text-anchor="middle" font-size="14" font-weight="bold" fill="#047857">IPv6 Network B</text>
    <text x="90" y="50" text-anchor="middle" font-size="11" fill="#059669">(Native IPv6 Island)</text>

    <!-- Dest Host -->
    <rect x="25" y="70" width="130" height="60" rx="6" fill="#ffffff" stroke="#059669" filter="url(#shadow)"/>
    <text x="90" y="95" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">IPv6 Dest</text>
    <text x="90" y="112" text-anchor="middle" font-size="10" fill="#059669">2001:db8:2::20</text>

    <!-- Decapsulated Packet -->
    <g transform="translate(15, 150)">
      <rect x="0" y="0" width="60" height="30" rx="3" fill="#059669"/>
      <text x="30" y="18" class="hdr">IPv6 Hdr</text>
      <rect x="62" y="0" width="88" height="30" rx="3" fill="#3b82f6"/>
      <text x="106" y="18" class="hdr">Payload Data</text>
    </g>
  </g>

  <!-- Connectors -->
  <line x1="220" y1="205" x2="250" y2="205" stroke="#10b981" stroke-width="3"/>
  <line x1="550" y1="205" x2="580" y2="205" stroke="#10b981" stroke-width="3"/>

  <!-- Step By Step Summary -->
  <g transform="translate(40, 345)">
    <rect width="720" height="115" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2" filter="url(#shadow)"/>
    <text x="20" y="25" font-size="13" font-weight="bold" fill="#1e293b">Three Phases of Tunneling:</text>
    <text x="20" y="48" font-size="11.5" fill="#334155"><tspan font-weight="bold" fill="#059669">1. Ingress Router (Encapsulation):</tspan> Adds an outer IPv4 header containing the tunnel destination IP as Dst IP.</text>
    <text x="20" y="72" font-size="11.5" fill="#334155"><tspan font-weight="bold" fill="#2563eb">2. Transit (Transparent Forwarding):</tspan> Intermediate IPv4 routers route purely based on the outer IPv4 header, oblivious to inner IPv6 contents.</text>
    <text x="20" y="96" font-size="11.5" fill="#334155"><tspan font-weight="bold" fill="#ea580c">3. Egress Router (Decapsulation):</tspan> Strips outer IPv4 header and delivers original untouched IPv6 packet to the local destination.</text>
  </g>
</svg>`;

// 4. tunneling-6to4.svg
svgs['tunneling-6to4.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  <defs>
    <style>
      text { font-family: 'Segoe UI', Arial, sans-serif; }
      .title { font-size: 20px; font-weight: bold; fill: #1e293b; }
      .sub { font-size: 13px; fill: #475569; }
      .mono { font-family: 'Consolas', monospace; font-size: 12px; font-weight: bold; }
    </style>
    <filter id="shadow" x="-2%" y="-2%" width="104%" height="104%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.08"/>
    </filter>
  </defs>

  <rect width="800" height="500" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="400" y="38" text-anchor="middle" class="title">Automatic 6to4 Tunneling Architecture (RFC 3056)</text>
  <text x="400" y="58" text-anchor="middle" class="sub">Embedding Public IPv4 Addresses inside 2002::/16 Prefix for Automated Tunnel Endpoints</text>

  <!-- 6to4 Address Construction Diagram -->
  <g transform="translate(60, 85)" filter="url(#shadow)">
    <rect width="680" height="95" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
    <text x="20" y="24" font-size="13" font-weight="bold" fill="#1e293b">6to4 IPv6 Address Structure (Automatic Derivation):</text>
    
    <!-- Bit diagram -->
    <g transform="translate(20, 36)">
      <rect x="0" y="0" width="130" height="35" fill="#2563eb" rx="4"/>
      <text x="65" y="22" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">2002::/16 (16b)</text>

      <rect x="135" y="0" width="220" height="35" fill="#ea580c" rx="4"/>
      <text x="245" y="22" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Public IPv4 Address (32b Hex)</text>

      <rect x="360" y="0" width="120" height="35" fill="#059669" rx="4"/>
      <text x="420" y="22" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Subnet (16b)</text>

      <rect x="485" y="0" width="155" height="35" fill="#7c3aed" rx="4"/>
      <text x="562" y="22" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Interface ID (64b)</text>
    </g>
    <text x="20" y="85" font-size="11" fill="#475569">Example: Public IPv4 192.0.2.4 (Hex: c000:0204) ➔ Generates 6to4 Prefix: 2002:c000:0204::/48</text>
  </g>

  <!-- Network Diagram -->
  <g transform="translate(60, 200)">
    <!-- Site A -->
    <g transform="translate(0, 0)">
      <rect width="180" height="150" rx="8" fill="#ecfdf5" stroke="#10b981" stroke-width="1.5" filter="url(#shadow)"/>
      <text x="90" y="25" text-anchor="middle" font-size="12" font-weight="bold" fill="#047857">6to4 Site A</text>
      <text x="90" y="42" text-anchor="middle" class="mono" font-size="10" fill="#059669">2002:c000:0204::/48</text>
      
      <circle cx="90" cy="95" r="28" fill="#2563eb"/>
      <text x="90" y="93" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff">6to4 Router</text>
      <text x="90" y="106" text-anchor="middle" font-size="8.5" fill="#bfdbfe">IPv4: 192.0.2.4</text>
    </g>

    <!-- IPv4 Internet Cloud -->
    <g transform="translate(210, 20)">
      <rect width="260" height="110" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="6,4"/>
      <text x="130" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#1d4ed8">IPv4 Internet Backbone</text>
      
      <!-- Arrow across cloud -->
      <line x1="20" y1="65" x2="240" y2="65" stroke="#2563eb" stroke-width="3"/>
      <text x="130" y="58" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#2563eb">Encapsulated in IPv4 (Proto 41)</text>
      <text x="130" y="85" text-anchor="middle" font-size="10" fill="#64748b">No manual tunnel config needed!</text>
      <text x="130" y="98" text-anchor="middle" font-size="9" fill="#64748b">Tunnel endpoint parsed directly from IP</text>
    </g>

    <!-- Site B -->
    <g transform="translate(500, 0)">
      <rect width="180" height="150" rx="8" fill="#ecfdf5" stroke="#10b981" stroke-width="1.5" filter="url(#shadow)"/>
      <text x="90" y="25" text-anchor="middle" font-size="12" font-weight="bold" fill="#047857">6to4 Site B</text>
      <text x="90" y="42" text-anchor="middle" class="mono" font-size="10" fill="#059669">2002:cb00:7101::/48</text>

      <circle cx="90" cy="95" r="28" fill="#2563eb"/>
      <text x="90" y="93" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff">6to4 Router</text>
      <text x="90" y="106" text-anchor="middle" font-size="8.5" fill="#bfdbfe">IPv4: 203.0.113.1</text>
    </g>
  </g>

  <!-- Connectors -->
  <line x1="240" y1="295" x2="270" y2="285" stroke="#3b82f6" stroke-width="2"/>
  <line x1="470" y1="285" x2="500" y2="295" stroke="#3b82f6" stroke-width="2"/>

  <!-- Footer note -->
  <text x="400" y="445" text-anchor="middle" font-size="12" fill="#334155"><tspan font-weight="bold">6to4 Relay Routers (192.88.99.1 Anycast)</tspan> provide gateway bridging to native IPv6 networks on the global internet.</text>
</svg>`;

// 5. vpn-tunneling.svg
svgs['vpn-tunneling.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  <defs>
    <style>
      text { font-family: 'Segoe UI', Arial, sans-serif; }
      .title { font-size: 20px; font-weight: bold; fill: #1e293b; }
      .sub { font-size: 13px; fill: #475569; }
    </style>
    <filter id="shadow" x="-2%" y="-2%" width="104%" height="104%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.08"/>
    </filter>
  </defs>

  <rect width="800" height="500" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="400" y="38" text-anchor="middle" class="title">Site-to-Site IPsec VPN Tunneling</text>
  <text x="400" y="58" text-anchor="middle" class="sub">Encrypted Virtual Private Network Tunnel Across Insecure Public Internet</text>

  <!-- Head Office LAN -->
  <g transform="translate(40, 100)">
    <rect width="180" height="230" rx="8" fill="#ffffff" stroke="#2563eb" stroke-width="1.5" filter="url(#shadow)"/>
    <rect width="180" height="32" rx="8 8 0 0" fill="#eff6ff"/>
    <text x="90" y="21" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e40af">Corporate HQ LAN</text>
    <text x="90" y="50" text-anchor="middle" font-size="11" fill="#475569">Subnet: 10.100.0.0/16</text>

    <!-- Internal Server -->
    <rect x="25" y="70" width="130" height="55" rx="6" fill="#f8fafc" stroke="#94a3b8"/>
    <text x="90" y="93" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e293b">ERP / Database</text>
    <text x="90" y="109" text-anchor="middle" font-size="10" fill="#2563eb">10.100.1.50</text>

    <!-- VPN Gateway HQ -->
    <rect x="20" y="150" width="140" height="60" rx="6" fill="#1e40af"/>
    <text x="90" y="173" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">VPN Gateway HQ</text>
    <text x="90" y="188" text-anchor="middle" font-size="9.5" fill="#bfdbfe">Public: 203.0.113.10</text>
    <text x="90" y="200" text-anchor="middle" font-size="9" fill="#93c5fd">IPsec ESP Encryption</text>
  </g>

  <!-- Untrusted Public Internet Cloud -->
  <g transform="translate(250, 100)">
    <rect width="300" height="230" rx="10" fill="#fff7ed" stroke="#f97316" stroke-width="1.5"/>
    <text x="150" y="28" text-anchor="middle" font-size="13" font-weight="bold" fill="#9a3412">Public Insecure Internet</text>
    <text x="150" y="44" text-anchor="middle" font-size="10.5" fill="#ea580c">Subject to eavesdropping &amp; tampering</text>

    <!-- Secure IPsec Tunnel -->
    <rect x="15" y="70" width="270" height="80" rx="8" fill="#166534" stroke="#15803d" stroke-width="2"/>
    <text x="135" y="95" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff">🔒 IPsec ESP Tunnel (AES-256 / SHA)</text>
    
    <!-- Encrypted Packet -->
    <g transform="translate(25, 108)">
      <rect x="0" y="0" width="60" height="28" rx="3" fill="#ea580c"/>
      <text x="30" y="18" text-anchor="middle" font-size="8.5" font-weight="bold" fill="#ffffff">New IP Hdr</text>

      <rect x="63" y="0" width="55" height="28" rx="3" fill="#15803d"/>
      <text x="90" y="18" text-anchor="middle" font-size="8.5" font-weight="bold" fill="#ffffff">ESP Hdr</text>

      <rect x="121" y="0" width="100" height="28" rx="3" fill="#0f766e"/>
      <text x="171" y="18" text-anchor="middle" font-size="8.5" font-weight="bold" fill="#ffffff">Encrypted Payload</text>
    </g>

    <text x="150" y="175" text-anchor="middle" font-size="11" fill="#166534" font-weight="bold">Confidentiality + Integrity + Authentication</text>
    <text x="150" y="195" text-anchor="middle" font-size="10" fill="#475569">ISP routers see only outer Public IP addresses</text>
  </g>

  <!-- Branch Office LAN -->
  <g transform="translate(580, 100)">
    <rect width="180" height="230" rx="8" fill="#ffffff" stroke="#059669" stroke-width="1.5" filter="url(#shadow)"/>
    <rect width="180" height="32" rx="8 8 0 0" fill="#ecfdf5"/>
    <text x="90" y="21" text-anchor="middle" font-size="13" font-weight="bold" fill="#047857">Branch Office LAN</text>
    <text x="90" y="50" text-anchor="middle" font-size="11" fill="#475569">Subnet: 10.200.0.0/16</text>

    <!-- Branch Client -->
    <rect x="25" y="70" width="130" height="55" rx="6" fill="#f8fafc" stroke="#94a3b8"/>
    <text x="90" y="93" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e293b">Branch Workstation</text>
    <text x="90" y="109" text-anchor="middle" font-size="10" fill="#059669">10.200.5.12</text>

    <!-- VPN Gateway Branch -->
    <rect x="20" y="150" width="140" height="60" rx="6" fill="#065f46"/>
    <text x="90" y="173" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">VPN Gateway Branch</text>
    <text x="90" y="188" text-anchor="middle" font-size="9.5" fill="#a7f3d0">Public: 198.51.100.5</text>
    <text x="90" y="200" text-anchor="middle" font-size="9" fill="#6ee7b7">IPsec Decryption</text>
  </g>

  <!-- Connectors -->
  <line x1="160" y1="180" x2="265" y2="180" stroke="#166534" stroke-width="2"/>
  <line x1="535" y1="180" x2="600" y2="180" stroke="#166534" stroke-width="2"/>

  <!-- Footer explanation -->
  <g transform="translate(40, 355)">
    <rect width="720" height="105" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2" filter="url(#shadow)"/>
    <text x="20" y="25" font-size="13" font-weight="bold" fill="#1e293b">Tunnel Mode vs. Transport Mode:</text>
    <text x="20" y="48" font-size="11.5" fill="#334155"><tspan font-weight="bold" fill="#166534">Tunnel Mode (Site-to-Site):</tspan> The entire original IP packet (header + payload) is encrypted and placed inside a brand new IP header.</text>
    <text x="20" y="70" font-size="11.5" fill="#334155"><tspan font-weight="bold" fill="#2563eb">Transport Mode (Host-to-Host):</tspan> Only the IP payload (L4 data) is encrypted; original IP headers remain exposed for routing.</text>
    <text x="20" y="92" font-size="11" fill="#64748b">Provides seamless connectivity: Workstations communicate directly with 10.x.x.x addresses as if on the same local physical network.</text>
  </g>
</svg>`;

for (const [filename, content] of Object.entries(svgs)) {
  fs.writeFileSync(path.join(dir, filename), content, 'utf8');
  console.log('Saved:', filename);
}
console.log('Topic 2 SVG generation complete!');

