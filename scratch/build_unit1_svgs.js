const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'assets', 'images', 'unit1');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function makeSvg(width, height, title, subtitle, content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
    <linearGradient id="blueCard" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e3a8a" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#172554" stop-opacity="0.9"/>
    </linearGradient>
    <linearGradient id="cyanCard" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0e7490" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#164e63" stop-opacity="0.9"/>
    </linearGradient>
    <linearGradient id="purpleCard" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#581c87" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#3b0764" stop-opacity="0.9"/>
    </linearGradient>
    <linearGradient id="emeraldCard" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#065f46" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#022c22" stop-opacity="0.9"/>
    </linearGradient>
    <linearGradient id="amberCard" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#78350f" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#451a03" stop-opacity="0.9"/>
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.4"/>
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="${width}" height="${height}" rx="16" fill="url(#bgGrad)"/>
  <rect width="${width}" height="${height}" rx="16" fill="none" stroke="#334155" stroke-width="1.5"/>

  <!-- Header Section -->
  <g transform="translate(30, 32)">
    <rect x="0" y="0" width="8" height="24" rx="3" fill="#38bdf8"/>
    <text x="18" y="18" font-family="system-ui, sans-serif" font-size="18" font-weight="800" fill="#f8fafc" letter-spacing="0.5">${title}</text>
    <text x="18" y="38" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#94a3b8">${subtitle}</text>
  </g>

  <!-- Diagram Content -->
  <g transform="translate(30, 85)">
    ${content}
  </g>
</svg>`;
}

// 1. Computer Network Architecture
const svg1 = makeSvg(900, 480, "Global Internet Architecture & Hierarchy", "Tier-1 Transit Providers • IXPs • Regional ISPs • Access Networks • End Systems", `
  <!-- Tier 1 Core -->
  <rect x="220" y="20" width="400" height="75" rx="10" fill="url(#blueCard)" stroke="#3b82f6" stroke-width="2" filter="url(#shadow)"/>
  <text x="420" y="48" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#93c5fd" text-anchor="middle">TIER 1 GLOBAL BACKBONE PROVIDERS (ISPs)</text>
  <text x="420" y="70" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">AT&amp;T • Lumen • Telia • NTT • Global Mesh &amp; Settlement-Free Peering</text>

  <!-- IXPs -->
  <rect x="30" y="145" width="220" height="60" rx="8" fill="url(#cyanCard)" stroke="#06b6d4" stroke-width="1.5"/>
  <text x="140" y="170" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#a5f3fc" text-anchor="middle">Internet Exchange Point (IXP)</text>
  <text x="140" y="190" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1" text-anchor="middle">Direct Peer Interconnect Fabrics</text>

  <rect x="590" y="145" width="220" height="60" rx="8" fill="url(#cyanCard)" stroke="#06b6d4" stroke-width="1.5"/>
  <text x="700" y="170" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#a5f3fc" text-anchor="middle">Content Provider CDNs</text>
  <text x="700" y="190" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1" text-anchor="middle">Google • Akamai • Cloudflare Edge</text>

  <!-- Tier 2 Regional ISPs -->
  <rect x="290" y="145" width="260" height="60" rx="8" fill="url(#purpleCard)" stroke="#a855f7" stroke-width="1.5"/>
  <text x="420" y="170" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#e9d5ff" text-anchor="middle">Regional / Tier-2 ISPs</text>
  <text x="420" y="190" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1" text-anchor="middle">National Carriers &amp; Transit Buyers</text>

  <!-- Access Networks -->
  <rect x="120" y="255" width="260" height="55" rx="8" fill="url(#emeraldCard)" stroke="#10b981" stroke-width="1.5"/>
  <text x="250" y="278" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#a7f3d0" text-anchor="middle">Local Access ISPs (Broadband/FTTH)</text>
  <text x="250" y="296" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1" text-anchor="middle">Fiber GPON • Cable DOCSIS • DSL</text>

  <rect x="460" y="255" width="260" height="55" rx="8" fill="url(#emeraldCard)" stroke="#10b981" stroke-width="1.5"/>
  <text x="590" y="278" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#a7f3d0" text-anchor="middle">Cellular Access Networks</text>
  <text x="590" y="296" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1" text-anchor="middle">5G gNodeB • 4G LTE Base Stations</text>

  <!-- Edge End Systems -->
  <rect x="40" y="350" width="760" height="40" rx="6" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
  <text x="420" y="375" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#f1f5f9" text-anchor="middle">NETWORK EDGE / END SYSTEMS: Smartphones • Laptops • Cloud Servers • IoT Actuators</text>

  <!-- Connecting Lines -->
  <line x1="320" y1="95" x2="160" y2="145" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="3,3"/>
  <line x1="420" y1="95" x2="420" y2="145" stroke="#a855f7" stroke-width="2"/>
  <line x1="520" y1="95" x2="680" y2="145" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="3,3"/>
  <line x1="380" y1="205" x2="260" y2="255" stroke="#10b981" stroke-width="2"/>
  <line x1="460" y1="205" x2="580" y2="255" stroke="#10b981" stroke-width="2"/>
  <line x1="250" y1="310" x2="250" y2="350" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="590" y1="310" x2="590" y2="350" stroke="#94a3b8" stroke-width="1.5"/>
`);

// 2. Network Edge vs Core
const svg2 = makeSvg(900, 480, "Network Edge vs Network Core Architecture", "End Systems at Edge • Access Networks • Packet-Switched Mesh Interconnects in Core", `
  <!-- Edge Area Left -->
  <rect x="30" y="20" width="220" height="340" rx="10" fill="url(#blueCard)" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="140" y="50" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#93c5fd" text-anchor="middle">NETWORK EDGE (Left)</text>
  <rect x="50" y="75" width="180" height="50" rx="6" fill="#0f172a" stroke="#334155"/>
  <text x="140" y="98" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#e2e8f0" text-anchor="middle">Client End Systems</text>
  <text x="140" y="115" font-family="system-ui, sans-serif" font-size="9" fill="#94a3b8" text-anchor="middle">PCs • Phones • Smart Home</text>
  <rect x="50" y="145" width="180" height="60" rx="6" fill="#0f172a" stroke="#334155"/>
  <text x="140" y="170" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#a7f3d0" text-anchor="middle">Access Network (Border)</text>
  <text x="140" y="190" font-family="system-ui, sans-serif" font-size="9" fill="#94a3b8" text-anchor="middle">Wi-Fi AP • FTTH ONT Gateway</text>

  <!-- Network Core Center -->
  <rect x="290" y="20" width="320" height="340" rx="10" fill="url(#purpleCard)" stroke="#a855f7" stroke-width="2" filter="url(#shadow)"/>
  <text x="450" y="50" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#e9d5ff" text-anchor="middle">NETWORK CORE (Mesh)</text>
  <text x="450" y="70" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1" text-anchor="middle">Interconnected High-Speed Routers &amp; Trunks</text>
  
  <!-- Core Routers Circle Diagram -->
  <circle cx="370" cy="140" r="30" fill="#0f172a" stroke="#c084fc" stroke-width="2"/>
  <text x="370" y="145" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#f8fafc" text-anchor="middle">R1</text>
  <circle cx="530" cy="140" r="30" fill="#0f172a" stroke="#c084fc" stroke-width="2"/>
  <text x="530" y="145" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#f8fafc" text-anchor="middle">R2</text>
  <circle cx="370" cy="260" r="30" fill="#0f172a" stroke="#c084fc" stroke-width="2"/>
  <text x="370" y="265" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#f8fafc" text-anchor="middle">R3</text>
  <circle cx="530" cy="260" r="30" fill="#0f172a" stroke="#c084fc" stroke-width="2"/>
  <text x="530" y="265" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#f8fafc" text-anchor="middle">R4</text>

  <!-- Core Mesh Interconnections -->
  <line x1="400" y1="140" x2="500" y2="140" stroke="#38bdf8" stroke-width="3"/>
  <line x1="370" y1="170" x2="370" y2="230" stroke="#38bdf8" stroke-width="3"/>
  <line x1="530" y1="170" x2="530" y2="230" stroke="#38bdf8" stroke-width="3"/>
  <line x1="400" y1="260" x2="500" y2="260" stroke="#38bdf8" stroke-width="3"/>
  <line x1="395" y1="160" x2="505" y2="240" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4,4"/>

  <!-- Edge Area Right -->
  <rect x="650" y="20" width="220" height="340" rx="10" fill="url(#emeraldCard)" stroke="#10b981" stroke-width="1.5"/>
  <text x="760" y="50" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#a7f3d0" text-anchor="middle">NETWORK EDGE (Right)</text>
  <rect x="670" y="75" width="180" height="50" rx="6" fill="#0f172a" stroke="#334155"/>
  <text x="760" y="98" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#e2e8f0" text-anchor="middle">Enterprise Server Farms</text>
  <text x="760" y="115" font-family="system-ui, sans-serif" font-size="9" fill="#94a3b8" text-anchor="middle">Web • Database • Cloud Apps</text>
  <rect x="670" y="145" width="180" height="60" rx="6" fill="#0f172a" stroke="#334155"/>
  <text x="760" y="170" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#93c5fd" text-anchor="middle">Data Center Border Switch</text>
  <text x="760" y="190" font-family="system-ui, sans-serif" font-size="9" fill="#94a3b8" text-anchor="middle">Top-of-Rack • BGP Gateway</text>

  <!-- Connectors from Edge to Core -->
  <line x1="230" y1="175" x2="340" y2="150" stroke="#e2e8f0" stroke-width="2"/>
  <line x1="670" y1="175" x2="560" y2="150" stroke="#e2e8f0" stroke-width="2"/>
`);

// 3. Hosts, Routers & Switches
const svg3 = makeSvg(900, 480, "Network Hardware: Layer-1, Layer-2 & Layer-3 Forwarding", "Hosts (L7-L1) • Switches (L2 MAC Forwarding) • Routers (L3 IP Routing)", `
  <!-- Host Column -->
  <g transform="translate(40, 20)">
    <rect width="220" height="340" rx="10" fill="url(#blueCard)" stroke="#3b82f6" stroke-width="2"/>
    <text x="110" y="35" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#93c5fd" text-anchor="middle">END HOST (L1 - L7)</text>
    <rect x="25" y="60" width="170" height="35" rx="5" fill="#1e40af"/>
    <text x="110" y="82" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">Application (HTTP/TLS)</text>
    <rect x="25" y="105" width="170" height="35" rx="5" fill="#2563eb"/>
    <text x="110" y="127" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">Transport (TCP/UDP)</text>
    <rect x="25" y="150" width="170" height="35" rx="5" fill="#3b82f6"/>
    <text x="110" y="172" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">Network (IP / ICMP)</text>
    <rect x="25" y="195" width="170" height="35" rx="5" fill="#60a5fa"/>
    <text x="110" y="217" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#0f172a" text-anchor="middle">Data Link (Ethernet/WiFi)</text>
    <rect x="25" y="240" width="170" height="35" rx="5" fill="#93c5fd"/>
    <text x="110" y="262" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#0f172a" text-anchor="middle">Physical (NIC Transceiver)</text>
    <text x="110" y="310" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1" text-anchor="middle">Full 5/7-Layer Stack Implemented</text>
  </g>

  <!-- Switch Column -->
  <g transform="translate(320, 90)">
    <rect width="240" height="270" rx="10" fill="url(#emeraldCard)" stroke="#10b981" stroke-width="2"/>
    <text x="120" y="35" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#a7f3d0" text-anchor="middle">ETHERNET SWITCH (L2)</text>
    <rect x="30" y="70" width="180" height="45" rx="5" fill="#059669"/>
    <text x="120" y="97" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff" text-anchor="middle">Layer 2: Data Link (MAC)</text>
    <rect x="30" y="130" width="180" height="45" rx="5" fill="#34d399"/>
    <text x="120" y="157" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#0f172a" text-anchor="middle">Layer 1: Physical (PHY)</text>
    <text x="120" y="215" font-family="system-ui, sans-serif" font-size="10" fill="#e2e8f0" text-anchor="middle">Forwards by 48-bit MAC Address</text>
    <text x="120" y="235" font-family="system-ui, sans-serif" font-size="9" fill="#a7f3d0" text-anchor="middle">Hardware CAM / MAC Learning Table</text>
  </g>

  <!-- Router Column -->
  <g transform="translate(620, 50)">
    <rect width="240" height="310" rx="10" fill="url(#purpleCard)" stroke="#a855f7" stroke-width="2"/>
    <text x="120" y="35" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#e9d5ff" text-anchor="middle">NETWORK ROUTER (L3)</text>
    <rect x="30" y="65" width="180" height="40" rx="5" fill="#7e22ce"/>
    <text x="120" y="90" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">Layer 3: Network (IP FIB)</text>
    <rect x="30" y="120" width="180" height="40" rx="5" fill="#a855f7"/>
    <text x="120" y="145" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">Layer 2: Data Link (Framing)</text>
    <rect x="30" y="175" width="180" height="40" rx="5" fill="#c084fc"/>
    <text x="120" y="200" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#0f172a" text-anchor="middle">Layer 1: Physical (Bits)</text>
    <text x="120" y="255" font-family="system-ui, sans-serif" font-size="10" fill="#e2e8f0" text-anchor="middle">Forwards by 32/128-bit IP Address</text>
    <text x="120" y="275" font-family="system-ui, sans-serif" font-size="9" fill="#e9d5ff" text-anchor="middle">Longest Prefix Match (LPM) Routing</text>
  </g>
`);

// 4. OSI 7-Layer Architecture
const svg5 = makeSvg(900, 480, "The 7-Layer OSI Reference Model (ISO/IEC 7498-1)", "Application • Presentation • Session • Transport • Network • Data Link • Physical", `
  <!-- Left Side: Layers Stack -->
  <g transform="translate(60, 20)">
    <rect x="0" y="0" width="460" height="40" rx="6" fill="#1e3a8a" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="20" y="25" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#93c5fd">Layer 7: Application</text>
    <text x="440" y="25" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="end">HTTP, DNS, SMTP, SSH (Data)</text>

    <rect x="0" y="48" width="460" height="40" rx="6" fill="#1e40af" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="20" y="73" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#93c5fd">Layer 6: Presentation</text>
    <text x="440" y="73" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="end">TLS/SSL, JPEG, ASCII, Compression</text>

    <rect x="0" y="96" width="460" height="40" rx="6" fill="#2563eb" stroke="#60a5fa" stroke-width="1.5"/>
    <text x="20" y="121" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#ffffff">Layer 5: Session</text>
    <text x="440" y="121" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="end">RPC, NetBIOS, Checkpoints, Sockets</text>

    <rect x="0" y="144" width="460" height="40" rx="6" fill="#0d9488" stroke="#14b8a6" stroke-width="1.5"/>
    <text x="20" y="169" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#ffffff">Layer 4: Transport</text>
    <text x="440" y="169" font-family="system-ui, sans-serif" font-size="11" fill="#ccfbf1" text-anchor="end">TCP, UDP • Port Numbers (Segment)</text>

    <rect x="0" y="192" width="460" height="40" rx="6" fill="#7c3aed" stroke="#a78bfa" stroke-width="1.5"/>
    <text x="20" y="217" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#ffffff">Layer 3: Network</text>
    <text x="440" y="217" font-family="system-ui, sans-serif" font-size="11" fill="#ede9fe" text-anchor="end">IPv4, IPv6, ICMP • Routing (Packet)</text>

    <rect x="0" y="240" width="460" height="40" rx="6" fill="#059669" stroke="#34d399" stroke-width="1.5"/>
    <text x="20" y="265" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#ffffff">Layer 2: Data Link</text>
    <text x="440" y="265" font-family="system-ui, sans-serif" font-size="11" fill="#d1fae5" text-anchor="end">Ethernet, Wi-Fi • MAC Addressing (Frame)</text>

    <rect x="0" y="288" width="460" height="40" rx="6" fill="#d97706" stroke="#fbbf24" stroke-width="1.5"/>
    <text x="20" y="313" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#ffffff">Layer 1: Physical</text>
    <text x="440" y="313" font-family="system-ui, sans-serif" font-size="11" fill="#fef3c7" text-anchor="end">Copper, Fiber, Radio • Signals (Bits)</text>
  </g>

  <!-- Right Side: Encapsulation & PDU Card -->
  <g transform="translate(560, 20)">
    <rect width="280" height="328" rx="10" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
    <text x="140" y="35" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#38bdf8" text-anchor="middle">DATA UNITS (PDU)</text>

    <rect x="25" y="60" width="230" height="38" rx="6" fill="#1e293b" stroke="#3b82f6"/>
    <text x="140" y="84" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#93c5fd" text-anchor="middle">L7-L5: Data / Message</text>

    <rect x="25" y="115" width="230" height="38" rx="6" fill="#1e293b" stroke="#14b8a6"/>
    <text x="140" y="139" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#5eead4" text-anchor="middle">L4: Segment / Datagram</text>

    <rect x="25" y="170" width="230" height="38" rx="6" fill="#1e293b" stroke="#a78bfa"/>
    <text x="140" y="194" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#c4b5fd" text-anchor="middle">L3: Packet (Datagram)</text>

    <rect x="25" y="225" width="230" height="38" rx="6" fill="#1e293b" stroke="#34d399"/>
    <text x="140" y="249" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#86efac" text-anchor="middle">L2: Frame (Header + FCS)</text>

    <rect x="25" y="278" width="230" height="38" rx="6" fill="#1e293b" stroke="#fbbf24"/>
    <text x="140" y="302" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fde68a" text-anchor="middle">L1: Raw Bitstream (0101...)</text>
  </g>
`);

// 5. TCP/IP Hourglass Model
const svg6 = makeSvg(900, 480, "The TCP/IP Hourglass Architecture", "One Interoperable IP Core • Diverse Applications on Top • Diverse Physical Media Below", `
  <!-- Top Applications -->
  <g transform="translate(100, 20)">
    <rect width="700" height="60" rx="8" fill="url(#blueCard)" stroke="#3b82f6" stroke-width="2"/>
    <text x="350" y="32" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#93c5fd" text-anchor="middle">APPLICATION LAYER (Many Services)</text>
    <text x="350" y="50" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">HTTP • DNS • SMTP • SSH • FTP • WebSockets • RTP • MQTT • BitTorrent</text>
  </g>

  <!-- Transport Waist -->
  <g transform="translate(180, 105)">
    <rect width="540" height="55" rx="8" fill="url(#cyanCard)" stroke="#06b6d4" stroke-width="2"/>
    <text x="270" y="30" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#a5f3fc" text-anchor="middle">TRANSPORT LAYER</text>
    <text x="270" y="46" font-family="system-ui, sans-serif" font-size="11" fill="#e0f2fe" text-anchor="middle">TCP (Reliable, Connection-Oriented) • UDP (Low-Latency Datagrams) • QUIC</text>
  </g>

  <!-- Narrow Waist: IP Protocol -->
  <g transform="translate(260, 185)">
    <rect width="380" height="70" rx="10" fill="url(#purpleCard)" stroke="#c084fc" stroke-width="3" filter="url(#shadow)"/>
    <text x="190" y="32" font-family="system-ui, sans-serif" font-size="15" font-weight="900" fill="#f5d0fe" text-anchor="middle">INTERNET PROTOCOL (IP: IPv4 &amp; IPv6)</text>
    <text x="190" y="55" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#e9d5ff" text-anchor="middle">THE NARROW WAIST: Universal Global Interoperability</text>
  </g>

  <!-- Network Access / Data Link -->
  <g transform="translate(180, 280)">
    <rect width="540" height="55" rx="8" fill="url(#emeraldCard)" stroke="#10b981" stroke-width="2"/>
    <text x="270" y="30" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#a7f3d0" text-anchor="middle">DATA LINK LAYER (MAC / LLC)</text>
    <text x="270" y="46" font-family="system-ui, sans-serif" font-size="11" fill="#d1fae5" text-anchor="middle">IEEE 802.3 Ethernet • IEEE 802.11 Wi-Fi • PPP • DOCSIS • 5G NR</text>
  </g>

  <!-- Physical Media -->
  <g transform="translate(100, 360)">
    <rect width="700" height="55" rx="8" fill="url(#amberCard)" stroke="#f59e0b" stroke-width="2"/>
    <text x="350" y="28" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#fde68a" text-anchor="middle">PHYSICAL TRANSMISSION MEDIA (Many Technologies)</text>
    <text x="350" y="45" font-family="system-ui, sans-serif" font-size="11" fill="#fef3c7" text-anchor="middle">Single-Mode Fiber Optics • Cat6A UTP Copper • Subsea Cables • Terrestrial RF • Satellite</text>
  </g>
`);

// 6. Network Topologies Comparison
const svg9 = makeSvg(900, 480, "Network Topologies Architecture & Comparison", "Mesh • Star • Bus • Ring • Tree Layouts with Fault Tolerance Analysis", `
  <!-- Star Topology -->
  <g transform="translate(30, 20)">
    <rect width="250" height="180" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="125" y="25" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#93c5fd" text-anchor="middle">STAR TOPOLOGY</text>
    <circle cx="125" cy="100" r="18" fill="#3b82f6"/>
    <text x="125" y="104" font-family="system-ui, sans-serif" font-size="9" font-weight="800" fill="#fff" text-anchor="middle">HUB</text>
    <circle cx="65" cy="65" r="12" fill="#64748b"/>
    <circle cx="185" cy="65" r="12" fill="#64748b"/>
    <circle cx="65" cy="145" r="12" fill="#64748b"/>
    <circle cx="185" cy="145" r="12" fill="#64748b"/>
    <line x1="125" y1="100" x2="65" y2="65" stroke="#93c5fd" stroke-width="1.5"/>
    <line x1="125" y1="100" x2="185" y2="65" stroke="#93c5fd" stroke-width="1.5"/>
    <line x1="125" y1="100" x2="65" y2="145" stroke="#93c5fd" stroke-width="1.5"/>
    <line x1="125" y1="100" x2="185" y2="145" stroke="#93c5fd" stroke-width="1.5"/>
    <text x="125" y="172" font-family="system-ui, sans-serif" font-size="9" fill="#94a3b8" text-anchor="middle">Single Point of Failure at Central Hub</text>
  </g>

  <!-- Full Mesh Topology -->
  <g transform="translate(320, 20)">
    <rect width="250" height="180" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="125" y="25" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#a7f3d0" text-anchor="middle">FULL MESH TOPOLOGY</text>
    <circle cx="75" cy="70" r="14" fill="#10b981"/>
    <circle cx="175" cy="70" r="14" fill="#10b981"/>
    <circle cx="75" cy="135" r="14" fill="#10b981"/>
    <circle cx="175" cy="135" r="14" fill="#10b981"/>
    <line x1="75" y1="70" x2="175" y2="70" stroke="#34d399" stroke-width="1.5"/>
    <line x1="75" y1="135" x2="175" y2="135" stroke="#34d399" stroke-width="1.5"/>
    <line x1="75" y1="70" x2="75" y2="135" stroke="#34d399" stroke-width="1.5"/>
    <line x1="175" y1="70" x2="175" y2="135" stroke="#34d399" stroke-width="1.5"/>
    <line x1="75" y1="70" x2="175" y2="135" stroke="#34d399" stroke-width="1.5"/>
    <line x1="175" y1="70" x2="75" y2="135" stroke="#34d399" stroke-width="1.5"/>
    <text x="125" y="172" font-family="system-ui, sans-serif" font-size="9" fill="#94a3b8" text-anchor="middle">Links = n(n-1)/2 • Maximum Reliability</text>
  </g>

  <!-- Ring Topology -->
  <g transform="translate(610, 20)">
    <rect width="250" height="180" rx="8" fill="#1e293b" stroke="#a855f7" stroke-width="1.5"/>
    <text x="125" y="25" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#e9d5ff" text-anchor="middle">RING TOPOLOGY</text>
    <circle cx="125" cy="55" r="12" fill="#a855f7"/>
    <circle cx="185" cy="100" r="12" fill="#a855f7"/>
    <circle cx="125" cy="145" r="12" fill="#a855f7"/>
    <circle cx="65" cy="100" r="12" fill="#a855f7"/>
    <path d="M 125,55 L 185,100 L 125,145 L 65,100 Z" fill="none" stroke="#c084fc" stroke-width="2"/>
    <text x="125" y="172" font-family="system-ui, sans-serif" font-size="9" fill="#94a3b8" text-anchor="middle">Token Ring (IEEE 802.5) / FDDI Dual Ring</text>
  </g>

  <!-- Bus Topology Bottom Left -->
  <g transform="translate(30, 220)">
    <rect width="390" height="150" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="195" y="25" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#fde68a" text-anchor="middle">BUS TOPOLOGY (Shared Coaxial Trunk)</text>
    <line x1="30" y1="80" x2="360" y2="80" stroke="#f59e0b" stroke-width="4"/>
    <rect x="20" y="70" width="10" height="20" fill="#ef4444"/>
    <rect x="360" y="70" width="10" height="20" fill="#ef4444"/>
    <text x="25" y="105" font-family="system-ui, sans-serif" font-size="8" fill="#fca5a5" text-anchor="middle">Terminator</text>
    <text x="365" y="105" font-family="system-ui, sans-serif" font-size="8" fill="#fca5a5" text-anchor="middle">Terminator</text>
    
    <line x1="90" y1="80" x2="90" y2="120" stroke="#94a3b8" stroke-width="1.5"/>
    <circle cx="90" cy="120" r="10" fill="#64748b"/>
    <line x1="195" y1="80" x2="195" y2="120" stroke="#94a3b8" stroke-width="1.5"/>
    <circle cx="195" cy="120" r="10" fill="#64748b"/>
    <line x1="300" y1="80" x2="300" y2="120" stroke="#94a3b8" stroke-width="1.5"/>
    <circle cx="300" cy="120" r="10" fill="#64748b"/>
    <text x="195" y="142" font-family="system-ui, sans-serif" font-size="9" fill="#94a3b8" text-anchor="middle">Single Cable Tap Collisions (10BASE2 / 10BASE5)</text>
  </g>

  <!-- Tree Topology Bottom Right -->
  <g transform="translate(470, 220)">
    <rect width="390" height="150" rx="8" fill="#1e293b" stroke="#06b6d4" stroke-width="1.5"/>
    <text x="195" y="25" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#a5f3fc" text-anchor="middle">TREE / HIERARCHICAL TOPOLOGY</text>
    <circle cx="195" cy="55" r="12" fill="#06b6d4"/>
    <text x="195" y="59" font-family="system-ui, sans-serif" font-size="8" font-weight="800" fill="#fff" text-anchor="middle">Root</text>
    <circle cx="115" cy="95" r="10" fill="#0891b2"/>
    <circle cx="275" cy="95" r="10" fill="#0891b2"/>
    <circle cx="75" cy="130" r="8" fill="#64748b"/>
    <circle cx="145" cy="130" r="8" fill="#64748b"/>
    <circle cx="245" cy="130" r="8" fill="#64748b"/>
    <circle cx="315" cy="130" r="8" fill="#64748b"/>
    <line x1="195" y1="55" x2="115" y2="95" stroke="#67e8f9" stroke-width="1.5"/>
    <line x1="195" y1="55" x2="275" y2="95" stroke="#67e8f9" stroke-width="1.5"/>
    <line x1="115" y1="95" x2="75" y2="130" stroke="#94a3b8" stroke-width="1.5"/>
    <line x1="115" y1="95" x2="145" y2="130" stroke="#94a3b8" stroke-width="1.5"/>
    <line x1="275" y1="95" x2="245" y2="130" stroke="#94a3b8" stroke-width="1.5"/>
    <line x1="275" y1="95" x2="315" y2="130" stroke="#94a3b8" stroke-width="1.5"/>
    <text x="195" y="144" font-family="system-ui, sans-serif" font-size="9" fill="#94a3b8" text-anchor="middle">Scalable Campus LANs &amp; Enterprise Core/Distribution/Access</text>
  </g>
`);

// 7. Packet vs Circuit Switching
const svg10 = makeSvg(900, 480, "Circuit Switching vs Packet Switching", "Dedicated Physical Paths (TDM/FDM) vs Statistical Multiplexing & Packet Queues", `
  <!-- Circuit Switching Top -->
  <g transform="translate(40, 20)">
    <rect width="820" height="160" rx="10" fill="url(#blueCard)" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="410" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#93c5fd" text-anchor="middle">CIRCUIT SWITCHING (PSTN / Legacy Telephony)</text>
    
    <circle cx="100" cy="90" r="20" fill="#0f172a" stroke="#3b82f6" stroke-width="2"/>
    <text x="100" y="95" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#fff" text-anchor="middle">Host A</text>

    <!-- Circuit Switches with Dedicated Channel -->
    <rect x="250" y="65" width="80" height="50" rx="6" fill="#1e293b" stroke="#38bdf8"/>
    <text x="290" y="95" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#38bdf8" text-anchor="middle">Switch 1</text>
    
    <rect x="490" y="65" width="80" height="50" rx="6" fill="#1e293b" stroke="#38bdf8"/>
    <text x="530" y="95" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#38bdf8" text-anchor="middle">Switch 2</text>

    <circle cx="720" cy="90" r="20" fill="#0f172a" stroke="#3b82f6" stroke-width="2"/>
    <text x="720" y="95" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#fff" text-anchor="middle">Host B</text>

    <!-- Dedicated Line -->
    <line x1="120" y1="90" x2="250" y2="90" stroke="#f59e0b" stroke-width="4"/>
    <line x1="330" y1="90" x2="490" y2="90" stroke="#f59e0b" stroke-width="4"/>
    <line x1="570" y1="90" x2="700" y2="90" stroke="#f59e0b" stroke-width="4"/>
    <text x="410" y="80" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#fde68a" text-anchor="middle">DEDICATED END-TO-END RESERVED CIRCUIT (Bandwidth Guaranteed, Idle Waste)</text>
    <text x="410" y="140" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1" text-anchor="middle">Three Phases: 1. Setup Connection • 2. Transfer Data • 3. Teardown Circuit</text>
  </g>

  <!-- Packet Switching Bottom -->
  <g transform="translate(40, 205)">
    <rect width="820" height="175" rx="10" fill="url(#purpleCard)" stroke="#a855f7" stroke-width="1.5"/>
    <text x="410" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#e9d5ff" text-anchor="middle">PACKET SWITCHING (Modern Internet / Statistical Multiplexing)</text>

    <circle cx="100" cy="95" r="20" fill="#0f172a" stroke="#a855f7" stroke-width="2"/>
    <text x="100" y="100" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#fff" text-anchor="middle">Host A</text>

    <rect x="250" y="70" width="80" height="50" rx="6" fill="#0f172a" stroke="#c084fc"/>
    <text x="290" y="100" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#c084fc" text-anchor="middle">Router 1</text>
    
    <rect x="490" y="70" width="80" height="50" rx="6" fill="#0f172a" stroke="#c084fc"/>
    <text x="530" y="100" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#c084fc" text-anchor="middle">Router 2</text>

    <circle cx="720" cy="95" r="20" fill="#0f172a" stroke="#a855f7" stroke-width="2"/>
    <text x="720" y="100" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#fff" text-anchor="middle">Host B</text>

    <!-- Packets in Transit -->
    <line x1="120" y1="95" x2="250" y2="95" stroke="#64748b" stroke-width="2"/>
    <line x1="330" y1="95" x2="490" y2="95" stroke="#64748b" stroke-width="2"/>
    <line x1="570" y1="95" x2="700" y2="95" stroke="#64748b" stroke-width="2"/>

    <!-- Packet Boxes -->
    <rect x="160" y="85" width="30" height="20" rx="3" fill="#38bdf8"/>
    <text x="175" y="99" font-family="system-ui, sans-serif" font-size="8" font-weight="800" fill="#0f172a" text-anchor="middle">P1</text>

    <rect x="390" y="85" width="30" height="20" rx="3" fill="#38bdf8"/>
    <text x="405" y="99" font-family="system-ui, sans-serif" font-size="8" font-weight="800" fill="#0f172a" text-anchor="middle">P2</text>

    <rect x="620" y="85" width="30" height="20" rx="3" fill="#38bdf8"/>
    <text x="635" y="99" font-family="system-ui, sans-serif" font-size="8" font-weight="800" fill="#0f172a" text-anchor="middle">P3</text>

    <text x="410" y="145" font-family="system-ui, sans-serif" font-size="10" font-weight="600" fill="#a7f3d0" text-anchor="middle">STORE-AND-FORWARD: Statistical Sharing of Shared Link Capacity</text>
    <text x="410" y="162" font-family="system-ui, sans-serif" font-size="9" fill="#cbd5e1" text-anchor="middle">Supports more active users; subject to variable queuing delays and potential packet drop on buffer overflow</text>
  </g>
`);

// 8. Delays and Loss
const svg12 = makeSvg(900, 480, "Four Principles of Network Delay (Kurose & Ross)", "Processing Delay • Queuing Delay • Transmission Delay • Propagation Delay", `
  <!-- Four Delay Boxes -->
  <g transform="translate(30, 20)">
    <rect width="190" height="200" rx="8" fill="url(#blueCard)" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="95" y="30" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#93c5fd" text-anchor="middle">1. Processing Delay</text>
    <text x="95" y="55" font-family="system-ui, sans-serif" font-size="16" font-weight="900" fill="#60a5fa" text-anchor="middle">d_proc</text>
    <text x="95" y="90" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1" text-anchor="middle">Examine packet header</text>
    <text x="95" y="110" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1" text-anchor="middle">Verify bit-level CRC checksum</text>
    <text x="95" y="130" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1" text-anchor="middle">Lookup FIB table output port</text>
    <rect x="20" y="155" width="150" height="30" rx="4" fill="#0f172a"/>
    <text x="95" y="174" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#38bdf8" text-anchor="middle">&lt; Microseconds (ASIC)</text>
  </g>

  <g transform="translate(245, 20)">
    <rect width="190" height="200" rx="8" fill="url(#purpleCard)" stroke="#a855f7" stroke-width="1.5"/>
    <text x="95" y="30" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#e9d5ff" text-anchor="middle">2. Queuing Delay</text>
    <text x="95" y="55" font-family="system-ui, sans-serif" font-size="16" font-weight="900" fill="#c084fc" text-anchor="middle">d_queue</text>
    <text x="95" y="90" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1" text-anchor="middle">Wait in output buffer</text>
    <text x="95" y="110" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1" text-anchor="middle">Depends on link congestion (La/R)</text>
    <text x="95" y="130" font-family="system-ui, sans-serif" font-size="10" fill="#f87171" text-anchor="middle">Buffer full -> PACKET DROP</text>
    <rect x="20" y="155" width="150" height="30" rx="4" fill="#0f172a"/>
    <text x="95" y="174" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#c084fc" text-anchor="middle">Variable (0 to Millis)</text>
  </g>

  <g transform="translate(460, 20)">
    <rect width="190" height="200" rx="8" fill="url(#cyanCard)" stroke="#06b6d4" stroke-width="1.5"/>
    <text x="95" y="30" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#a5f3fc" text-anchor="middle">3. Transmission Delay</text>
    <text x="95" y="55" font-family="system-ui, sans-serif" font-size="16" font-weight="900" fill="#22d3ee" text-anchor="middle">d_trans = L / R</text>
    <text x="95" y="90" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1" text-anchor="middle">Push bits onto physical wire</text>
    <text x="95" y="110" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1" text-anchor="middle">L = Packet length (bits)</text>
    <text x="95" y="130" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1" text-anchor="middle">R = Link transmission rate (bps)</text>
    <rect x="20" y="155" width="150" height="30" rx="4" fill="#0f172a"/>
    <text x="95" y="174" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#22d3ee" text-anchor="middle">Independent of Distance</text>
  </g>

  <g transform="translate(675, 20)">
    <rect width="190" height="200" rx="8" fill="url(#emeraldCard)" stroke="#10b981" stroke-width="1.5"/>
    <text x="95" y="30" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#a7f3d0" text-anchor="middle">4. Propagation Delay</text>
    <text x="95" y="55" font-family="system-ui, sans-serif" font-size="16" font-weight="900" fill="#34d399" text-anchor="middle">d_prop = d / s</text>
    <text x="95" y="90" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1" text-anchor="middle">Signal travel time over medium</text>
    <text x="95" y="110" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1" text-anchor="middle">d = Physical length (meters)</text>
    <text x="95" y="130" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1" text-anchor="middle">s = Speed of light (~2x10^8 m/s)</text>
    <rect x="20" y="155" width="150" height="30" rx="4" fill="#0f172a"/>
    <text x="95" y="174" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#34d399" text-anchor="middle">Independent of Packet Size</text>
  </g>

  <!-- Total Formula Card Bottom -->
  <g transform="translate(30, 245)">
    <rect width="835" height="135" rx="10" fill="#0f172a" stroke="#334155" stroke-width="2"/>
    <text x="417" y="35" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc" text-anchor="middle">TOTAL NODAL DELAY &amp; BANDWIDTH-DELAY PRODUCT FORMULA</text>
    <rect x="60" y="55" width="715" height="40" rx="6" fill="#1e293b" stroke="#38bdf8"/>
    <text x="417" y="80" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#38bdf8" text-anchor="middle">d_nodal = d_proc + d_queue + (L / R) + (d / s)</text>
    <text x="417" y="118" font-family="system-ui, sans-serif" font-size="11" fill="#94a3b8" text-anchor="middle">Bandwidth-Delay Product (BDP) = R * RTT  (Maximum volume of in-flight bits filling the pipe)</text>
  </g>
`);

// 9. Multiplexing FDM, TDM, WDM
const svg13 = makeSvg(900, 480, "Multiplexing Schemes: FDM, TDM, WDM & STDM", "Frequency Division • Time Division • Wavelength Division • Statistical Multiplexing", `
  <!-- FDM Box -->
  <g transform="translate(30, 20)">
    <rect width="400" height="165" rx="8" fill="url(#blueCard)" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="200" y="30" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#93c5fd" text-anchor="middle">FREQUENCY DIVISION MULTIPLEXING (FDM)</text>
    <rect x="30" y="50" width="340" height="25" rx="3" fill="#1e40af"/>
    <text x="200" y="67" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#fff" text-anchor="middle">Channel 1: Frequency Band f1 (e.g. 88-92 MHz)</text>
    <rect x="30" y="80" width="340" height="12" rx="2" fill="#334155"/>
    <text x="200" y="89" font-family="system-ui, sans-serif" font-size="8" fill="#94a3b8" text-anchor="middle">Guard Band (Prevents Crosstalk)</text>
    <rect x="30" y="97" width="340" height="25" rx="3" fill="#2563eb"/>
    <text x="200" y="114" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#fff" text-anchor="middle">Channel 2: Frequency Band f2 (e.g. 92-96 MHz)</text>
    <text x="200" y="148" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1" text-anchor="middle">Analog Spectrum Sharing • Continuous All-Time Transmission</text>
  </g>

  <!-- TDM Box -->
  <g transform="translate(460, 20)">
    <rect width="400" height="165" rx="8" fill="url(#purpleCard)" stroke="#a855f7" stroke-width="1.5"/>
    <text x="200" y="30" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#e9d5ff" text-anchor="middle">SYNCHRONOUS TIME DIVISION (TDM)</text>
    <!-- Time slots in frame -->
    <rect x="30" y="55" width="75" height="45" rx="4" fill="#7e22ce"/>
    <text x="67" y="82" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fff" text-anchor="middle">Slot A1</text>
    <rect x="115" y="55" width="75" height="45" rx="4" fill="#9333ea"/>
    <text x="152" y="82" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fff" text-anchor="middle">Slot B1</text>
    <rect x="200" y="55" width="75" height="45" rx="4" fill="#a855f7"/>
    <text x="237" y="82" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fff" text-anchor="middle">Slot C1</text>
    <rect x="285" y="55" width="75" height="45" rx="4" fill="#c084fc"/>
    <text x="322" y="82" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#0f172a" text-anchor="middle">Slot D1</text>
    <text x="200" y="125" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#f5d0fe" text-anchor="middle">Cyclic Frame Structure: [A1 | B1 | C1 | D1]</text>
    <text x="200" y="148" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1" text-anchor="middle">T1 / E1 Carrier Systems • Entire Bandwidth for Brief Time Slot</text>
  </g>

  <!-- WDM Bottom Left -->
  <g transform="translate(30, 205)">
    <rect width="400" height="175" rx="8" fill="url(#cyanCard)" stroke="#06b6d4" stroke-width="1.5"/>
    <text x="200" y="30" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#a5f3fc" text-anchor="middle">WAVELENGTH DIVISION MULTIPLEXING (WDM)</text>
    <rect x="30" y="55" width="340" height="22" rx="3" fill="#dc2626"/>
    <text x="200" y="70" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#fff" text-anchor="middle">Lambda 1: 1550 nm (Optical Red)</text>
    <rect x="30" y="82" width="340" height="22" rx="3" fill="#16a34a"/>
    <text x="200" y="97" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#fff" text-anchor="middle">Lambda 2: 1549 nm (Optical Green)</text>
    <rect x="30" y="109" width="340" height="22" rx="3" fill="#2563eb"/>
    <text x="200" y="124" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#fff" text-anchor="middle">Lambda 3: 1548 nm (Optical Blue)</text>
    <text x="200" y="155" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1" text-anchor="middle">Dense DWDM Transmits Terabits/sec over Single Optical Fiber</text>
  </g>

  <!-- STDM Bottom Right -->
  <g transform="translate(460, 205)">
    <rect width="400" height="175" rx="8" fill="url(#emeraldCard)" stroke="#10b981" stroke-width="1.5"/>
    <text x="200" y="30" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#a7f3d0" text-anchor="middle">STATISTICAL TDM (Packet Multiplexing)</text>
    <rect x="30" y="55" width="80" height="40" rx="4" fill="#047857"/>
    <text x="70" y="75" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#fff" text-anchor="middle">[ID: A] Data</text>
    <rect x="120" y="55" width="100" height="40" rx="4" fill="#059669"/>
    <text x="170" y="75" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#fff" text-anchor="middle">[ID: B] LongData</text>
    <rect x="230" y="55" width="60" height="40" rx="4" fill="#10b981"/>
    <text x="260" y="75" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#0f172a" text-anchor="middle">[ID: A]</text>
    <text x="200" y="125" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#a7f3d0" text-anchor="middle">On-Demand Dynamic Slot Allocation (No Idle Wasted Slots)</text>
    <text x="200" y="150" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1" text-anchor="middle">Underpins Modern Internet Routers, Ethernet, and 5G</text>
  </g>
`);

// 10. Signals: Nyquist & Shannon
const svg14 = makeSvg(900, 480, "Signal Fundamentals: Nyquist & Shannon Capacity", "Noiseless Channel Bitrate Limit vs Noisy Gaussian Channel Maximum Theoretical Capacity", `
  <!-- Nyquist Box Left -->
  <g transform="translate(40, 20)">
    <rect width="400" height="340" rx="10" fill="url(#blueCard)" stroke="#3b82f6" stroke-width="2"/>
    <text x="200" y="35" font-family="system-ui, sans-serif" font-size="15" font-weight="800" fill="#93c5fd" text-anchor="middle">NYQUIST BIT RATE (Noiseless)</text>
    
    <rect x="30" y="60" width="340" height="60" rx="6" fill="#0f172a" stroke="#38bdf8"/>
    <text x="200" y="95" font-family="system-ui, sans-serif" font-size="18" font-weight="900" fill="#38bdf8" text-anchor="middle">C = 2 * B * log2(L)</text>

    <text x="200" y="150" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#e2e8f0" text-anchor="middle">Variables Definition:</text>
    <text x="200" y="175" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">B = Analog Bandwidth in Hertz (Hz)</text>
    <text x="200" y="200" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">L = Number of discrete signal levels</text>
    <text x="200" y="225" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">C = Theoretical maximum bitrate (bps)</text>

    <rect x="30" y="250" width="340" height="65" rx="6" fill="#1e293b"/>
    <text x="200" y="275" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#93c5fd" text-anchor="middle">Example (B = 3000 Hz, L = 2 levels):</text>
    <text x="200" y="295" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#34d399" text-anchor="middle">C = 2 * 3000 * log2(2) = 6,000 bps</text>
  </g>

  <!-- Shannon Box Right -->
  <g transform="translate(460, 20)">
    <rect width="400" height="340" rx="10" fill="url(#purpleCard)" stroke="#a855f7" stroke-width="2"/>
    <text x="200" y="35" font-family="system-ui, sans-serif" font-size="15" font-weight="800" fill="#e9d5ff" text-anchor="middle">SHANNON CAPACITY (Noisy Channel)</text>

    <rect x="30" y="60" width="340" height="60" rx="6" fill="#0f172a" stroke="#c084fc"/>
    <text x="200" y="95" font-family="system-ui, sans-serif" font-size="18" font-weight="900" fill="#c084fc" text-anchor="middle">C = B * log2(1 + SNR)</text>

    <text x="200" y="150" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#e2e8f0" text-anchor="middle">Variables Definition:</text>
    <text x="200" y="175" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">B = Analog Bandwidth in Hertz (Hz)</text>
    <text x="200" y="200" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">SNR = Signal-to-Noise Ratio (Linear, not dB!)</text>
    <text x="200" y="225" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">SNR_dB = 10 * log10(SNR)</text>

    <rect x="30" y="250" width="340" height="65" rx="6" fill="#1e293b"/>
    <text x="200" y="275" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#e9d5ff" text-anchor="middle">Example (B = 3000 Hz, SNR_dB = 30 dB -> SNR = 1000):</text>
    <text x="200" y="295" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#34d399" text-anchor="middle">C = 3000 * log2(1001) ≈ 29,862 bps (~30 kbps)</text>
  </g>
`);

// 11. Transmission Media (Guided vs Unguided)
const svg11 = makeSvg(900, 480, "Physical Layer Transmission Media: Guided vs Unguided", "Twisted Pair Copper • Coaxial Cable • Fiber Optics • Wireless RF & Microwave", `
  <!-- Guided Media -->
  <g transform="translate(40, 20)">
    <rect width="400" height="340" rx="10" fill="url(#blueCard)" stroke="#3b82f6" stroke-width="2"/>
    <text x="200" y="35" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#93c5fd" text-anchor="middle">GUIDED MEDIA (Bounded / Wired)</text>
    
    <rect x="25" y="60" width="350" height="75" rx="6" fill="#0f172a" stroke="#334155"/>
    <text x="40" y="85" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#60a5fa">Unshielded Twisted Pair (UTP Cat6A)</text>
    <text x="40" y="105" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1">10 Gbps up to 100 meters • Twisting cancels EMI crosstalk</text>
    <text x="40" y="122" font-family="system-ui, sans-serif" font-size="9" fill="#94a3b8">Used in: Office LANs, Patch cables, RJ-45</text>

    <rect x="25" y="145" width="350" height="75" rx="6" fill="#0f172a" stroke="#334155"/>
    <text x="40" y="170" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#60a5fa">Coaxial Cable (RG-6 / 50-75 Ohm)</text>
    <text x="40" y="190" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1">High shielding against external noise • DOCSIS Cable Internet</text>
    <text x="40" y="207" font-family="system-ui, sans-serif" font-size="9" fill="#94a3b8">Used in: Cable TV, Cable Modems, Legacy Ethernet (10BASE2)</text>

    <rect x="25" y="230" width="350" height="75" rx="6" fill="#0f172a" stroke="#334155"/>
    <text x="40" y="255" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#34d399">Optical Fiber (Single-Mode / Multi-Mode)</text>
    <text x="40" y="275" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1">Total internal reflection • Zero EMI • 100+ Gbps for 40+ km</text>
    <text x="40" y="292" font-family="system-ui, sans-serif" font-size="9" fill="#94a3b8">Used in: Subsea Cables, Telecom Backbones, FTTH</text>
  </g>

  <!-- Unguided Media -->
  <g transform="translate(460, 20)">
    <rect width="400" height="340" rx="10" fill="url(#emeraldCard)" stroke="#10b981" stroke-width="2"/>
    <text x="200" y="35" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#a7f3d0" text-anchor="middle">UNGUIDED MEDIA (Wireless / Radio)</text>

    <rect x="25" y="60" width="350" height="75" rx="6" fill="#0f172a" stroke="#334155"/>
    <text x="40" y="85" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#34d399">Radio Waves (3 kHz to 1 GHz)</text>
    <text x="40" y="105" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1">Omnidirectional propagation • Passes through walls</text>
    <text x="40" y="122" font-family="system-ui, sans-serif" font-size="9" fill="#94a3b8">Used in: AM/FM Radio, Cellular Networks (800 MHz - 2.6 GHz)</text>

    <rect x="25" y="145" width="350" height="75" rx="6" fill="#0f172a" stroke="#334155"/>
    <text x="40" y="170" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#34d399">Microwaves (1 GHz to 300 GHz)</text>
    <text x="40" y="190" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1">Line-of-sight unidirectional beams • High bandwidth</text>
    <text x="40" y="207" font-family="system-ui, sans-serif" font-size="9" fill="#94a3b8">Used in: Wi-Fi (2.4/5/6 GHz), Satellite Links, 5G mmWave</text>

    <rect x="25" y="230" width="350" height="75" rx="6" fill="#0f172a" stroke="#334155"/>
    <text x="40" y="255" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fde68a">Infrared (300 GHz to 400 THz)</text>
    <text x="40" y="275" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1">Cannot penetrate walls • High security in closed rooms</text>
    <text x="40" y="292" font-family="system-ui, sans-serif" font-size="9" fill="#94a3b8">Used in: TV remotes, IrDA short-range devices</text>
  </g>
`);

// 12. Packet Encapsulation & Protocol Stacks
const svg8 = makeSvg(900, 480, "End-to-End Packet Encapsulation & Protocol Stacks", "Data Encapsulation Traversal: Application -> Transport -> Network -> Data Link -> Bits", `
  <!-- Sender Encapsulation Flow -->
  <g transform="translate(60, 20)">
    <rect width="360" height="340" rx="10" fill="url(#blueCard)" stroke="#3b82f6" stroke-width="2"/>
    <text x="180" y="32" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#93c5fd" text-anchor="middle">SENDER HOST (Encapsulation)</text>

    <!-- Step 1: User Data -->
    <rect x="30" y="55" width="300" height="35" rx="4" fill="#1e40af"/>
    <text x="180" y="77" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">Application Data (M)</text>

    <!-- Step 2: TCP Segment -->
    <rect x="30" y="105" width="300" height="35" rx="4" fill="#0d9488"/>
    <rect x="30" y="105" width="70" height="35" rx="4" fill="#0f766e"/>
    <text x="65" y="127" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fff" text-anchor="middle">TCP Hdr</text>
    <text x="200" y="127" font-family="system-ui, sans-serif" font-size="11" fill="#fff" text-anchor="middle">Data (M)</text>

    <!-- Step 3: IP Packet -->
    <rect x="30" y="155" width="300" height="35" rx="4" fill="#6d28d9"/>
    <rect x="30" y="155" width="60" height="35" rx="4" fill="#5b21b6"/>
    <text x="60" y="177" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fff" text-anchor="middle">IP Hdr</text>
    <rect x="90" y="155" width="55" height="35" fill="#0f766e"/>
    <text x="117" y="177" font-family="system-ui, sans-serif" font-size="9" fill="#fff" text-anchor="middle">TCP</text>
    <text x="215" y="177" font-family="system-ui, sans-serif" font-size="10" fill="#fff" text-anchor="middle">Data (M)</text>

    <!-- Step 4: Ethernet Frame -->
    <rect x="30" y="205" width="300" height="35" rx="4" fill="#059669"/>
    <rect x="30" y="205" width="55" height="35" rx="4" fill="#047857"/>
    <text x="57" y="227" font-family="system-ui, sans-serif" font-size="9" font-weight="800" fill="#fff" text-anchor="middle">ETH Hdr</text>
    <text x="175" y="227" font-family="system-ui, sans-serif" font-size="10" fill="#fff" text-anchor="middle">IP Datagram Payload</text>
    <rect x="275" y="205" width="55" height="35" rx="4" fill="#b91c1c"/>
    <text x="302" y="227" font-family="system-ui, sans-serif" font-size="9" font-weight="800" fill="#fff" text-anchor="middle">FCS (CRC)</text>

    <!-- Step 5: Bits -->
    <rect x="30" y="260" width="300" height="30" rx="4" fill="#0f172a" stroke="#334155"/>
    <text x="180" y="280" font-family="system-ui, sans-serif" font-size="11" font-family="monospace" fill="#38bdf8" text-anchor="middle">0 1 1 0 1 0 0 1 1 1 0 1 0 0 1 0 ...</text>
    <text x="180" y="320" font-family="system-ui, sans-serif" font-size="10" fill="#93c5fd" text-anchor="middle">↓ Down the Stack: Add Headers &amp; Trailers</text>
  </g>

  <!-- Receiver Decapsulation Flow -->
  <g transform="translate(480, 20)">
    <rect width="360" height="340" rx="10" fill="url(#purpleCard)" stroke="#a855f7" stroke-width="2"/>
    <text x="180" y="32" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#e9d5ff" text-anchor="middle">RECEIVER HOST (Decapsulation)</text>

    <rect x="30" y="55" width="300" height="35" rx="4" fill="#1e40af"/>
    <text x="180" y="77" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">Application Reads Payload (M)</text>

    <rect x="30" y="105" width="300" height="35" rx="4" fill="#0d9488"/>
    <text x="180" y="127" font-family="system-ui, sans-serif" font-size="11" fill="#fff" text-anchor="middle">TCP Strips Port Hdr &amp; Reassembles</text>

    <rect x="30" y="155" width="300" height="35" rx="4" fill="#6d28d9"/>
    <text x="180" y="177" font-family="system-ui, sans-serif" font-size="11" fill="#fff" text-anchor="middle">IP Strips IP Hdr &amp; Verifies Destination</text>

    <rect x="30" y="205" width="300" height="35" rx="4" fill="#059669"/>
    <text x="180" y="227" font-family="system-ui, sans-serif" font-size="11" fill="#fff" text-anchor="middle">NIC Validates FCS Trailer (CRC Check)</text>

    <rect x="30" y="260" width="300" height="30" rx="4" fill="#0f172a" stroke="#334155"/>
    <text x="180" y="280" font-family="system-ui, sans-serif" font-size="11" font-family="monospace" fill="#34d399" text-anchor="middle">Physical Signals In -> Bit Synchronized</text>
    <text x="180" y="320" font-family="system-ui, sans-serif" font-size="10" fill="#c084fc" text-anchor="middle">↑ Up the Stack: Strip Headers &amp; Verify Integrity</text>
  </g>
`);

// 13. Protocol Interfaces & Primitives
const svg4 = makeSvg(900, 480, "Protocol Interfaces, Primitives & SAP Architecture", "Service Access Points (SAPs) • Request • Indication • Response • Confirm", `
  <!-- Layer N+1 -->
  <g transform="translate(60, 20)">
    <rect width="780" height="70" rx="8" fill="url(#blueCard)" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="400" y="35" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#93c5fd" text-anchor="middle">LAYER N + 1 (Service User / Calling Entity)</text>
    <text x="400" y="55" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">Application or Transport Process issuing high-level transmission requests</text>
  </g>

  <!-- Service Access Points (SAP) -->
  <g transform="translate(60, 110)">
    <line x1="20" y1="20" x2="760" y2="20" stroke="#f59e0b" stroke-width="3" stroke-dasharray="8,6"/>
    <circle cx="200" cy="20" r="16" fill="#f59e0b"/>
    <text x="200" y="24" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#0f172a" text-anchor="middle">SAP 1</text>
    <circle cx="600" cy="20" r="16" fill="#f59e0b"/>
    <text x="600" y="24" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#0f172a" text-anchor="middle">SAP 2</text>
    <text x="400" y="15" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fde68a" text-anchor="middle">SERVICE ACCESS POINTS (SAP): Logical Portals / Interface Boundaries</text>
  </g>

  <!-- Layer N -->
  <g transform="translate(60, 155)">
    <rect width="780" height="85" rx="8" fill="url(#purpleCard)" stroke="#a855f7" stroke-width="2"/>
    <text x="400" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#e9d5ff" text-anchor="middle">LAYER N (Service Provider / Protocol Implementation)</text>
    <text x="400" y="50" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">Implements protocol state machine, sequence numbers, checksums, and flow control</text>
    <text x="400" y="68" font-family="system-ui, sans-serif" font-size="10" font-weight="600" fill="#a7f3d0" text-anchor="middle">Peer-to-Peer Virtual Dialogue via Layer N Protocol Data Units (N-PDU)</text>
  </g>

  <!-- Service Primitives Sequence -->
  <g transform="translate(60, 260)">
    <rect width="780" height="110" rx="8" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
    <text x="400" y="25" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#38bdf8" text-anchor="middle">THE FOUR OSI SERVICE PRIMITIVES</text>

    <rect x="30" y="45" width="160" height="45" rx="6" fill="#1e293b" stroke="#3b82f6"/>
    <text x="110" y="66" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#93c5fd" text-anchor="middle">1. Request</text>
    <text x="110" y="80" font-family="system-ui, sans-serif" font-size="9" fill="#94a3b8" text-anchor="middle">User asks for action</text>

    <rect x="220" y="45" width="160" height="45" rx="6" fill="#1e293b" stroke="#10b981"/>
    <text x="300" y="66" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#a7f3d0" text-anchor="middle">2. Indication</text>
    <text x="300" y="80" font-family="system-ui, sans-serif" font-size="9" fill="#94a3b8" text-anchor="middle">Provider notifies user</text>

    <rect x="410" y="45" width="160" height="45" rx="6" fill="#1e293b" stroke="#f59e0b"/>
    <text x="490" y="66" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fde68a" text-anchor="middle">3. Response</text>
    <text x="490" y="80" font-family="system-ui, sans-serif" font-size="9" fill="#94a3b8" text-anchor="middle">User acknowledges</text>

    <rect x="600" y="45" width="160" height="45" rx="6" fill="#1e293b" stroke="#a855f7"/>
    <text x="680" y="66" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#e9d5ff" text-anchor="middle">4. Confirm</text>
    <text x="680" y="80" font-family="system-ui, sans-serif" font-size="9" fill="#94a3b8" text-anchor="middle">Provider notifies caller</text>
  </g>
`);

// 14. Protocol Stack
const svg7 = makeSvg(900, 480, "Protocol Stack & Layered Peer-to-Peer Communication", "Horizontal Virtual Peer Communication vs Vertical Actual Physical Transmission", `
  <!-- Host A Stack Left -->
  <g transform="translate(60, 20)">
    <rect width="260" height="340" rx="10" fill="url(#blueCard)" stroke="#3b82f6" stroke-width="2"/>
    <text x="130" y="35" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#93c5fd" text-anchor="middle">HOST A PROTOCOL STACK</text>
    <rect x="30" y="60" width="200" height="35" rx="5" fill="#1e40af"/>
    <text x="130" y="82" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">Layer 5: Application</text>
    <rect x="30" y="105" width="200" height="35" rx="5" fill="#0d9488"/>
    <text x="130" y="127" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">Layer 4: Transport</text>
    <rect x="30" y="150" width="200" height="35" rx="5" fill="#6d28d9"/>
    <text x="130" y="172" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">Layer 3: Network</text>
    <rect x="30" y="195" width="200" height="35" rx="5" fill="#059669"/>
    <text x="130" y="217" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">Layer 2: Data Link</text>
    <rect x="30" y="240" width="200" height="35" rx="5" fill="#d97706"/>
    <text x="130" y="262" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">Layer 1: Physical</text>
    <text x="130" y="310" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#38bdf8" text-anchor="middle">↓ Vertical Downward Flow</text>
  </g>

  <!-- Virtual Peer Lines Center -->
  <g transform="translate(320, 20)">
    <line x1="10" y1="77" x2="250" y2="77" stroke="#93c5fd" stroke-width="2" stroke-dasharray="5,5"/>
    <text x="130" y="72" font-family="system-ui, sans-serif" font-size="9" fill="#93c5fd" text-anchor="middle">Virtual Application Peer Protocol</text>

    <line x1="10" y1="122" x2="250" y2="122" stroke="#5eead4" stroke-width="2" stroke-dasharray="5,5"/>
    <text x="130" y="117" font-family="system-ui, sans-serif" font-size="9" fill="#5eead4" text-anchor="middle">Virtual Transport Peer Protocol</text>

    <line x1="10" y1="167" x2="250" y2="167" stroke="#c4b5fd" stroke-width="2" stroke-dasharray="5,5"/>
    <text x="130" y="162" font-family="system-ui, sans-serif" font-size="9" fill="#c4b5fd" text-anchor="middle">Virtual Network Peer Protocol</text>

    <line x1="10" y1="212" x2="250" y2="212" stroke="#86efac" stroke-width="2" stroke-dasharray="5,5"/>
    <text x="130" y="207" font-family="system-ui, sans-serif" font-size="9" fill="#86efac" text-anchor="middle">Virtual Data Link Peer Protocol</text>

    <!-- Physical Line at Bottom -->
    <line x1="10" y1="257" x2="250" y2="257" stroke="#f59e0b" stroke-width="4"/>
    <text x="130" y="280" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fde68a" text-anchor="middle">ACTUAL PHYSICAL LINK</text>
    <text x="130" y="295" font-family="system-ui, sans-serif" font-size="9" fill="#cbd5e1" text-anchor="middle">Copper / Optical / RF Bit Transmission</text>
  </g>

  <!-- Host B Stack Right -->
  <g transform="translate(580, 20)">
    <rect width="260" height="340" rx="10" fill="url(#purpleCard)" stroke="#a855f7" stroke-width="2"/>
    <text x="130" y="35" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#e9d5ff" text-anchor="middle">HOST B PROTOCOL STACK</text>
    <rect x="30" y="60" width="200" height="35" rx="5" fill="#1e40af"/>
    <text x="130" y="82" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">Layer 5: Application</text>
    <rect x="30" y="105" width="200" height="35" rx="5" fill="#0d9488"/>
    <text x="130" y="127" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">Layer 4: Transport</text>
    <rect x="30" y="150" width="200" height="35" rx="5" fill="#6d28d9"/>
    <text x="130" y="172" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">Layer 3: Network</text>
    <rect x="30" y="195" width="200" height="35" rx="5" fill="#059669"/>
    <text x="130" y="217" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">Layer 2: Data Link</text>
    <rect x="30" y="240" width="200" height="35" rx="5" fill="#d97706"/>
    <text x="130" y="262" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">Layer 1: Physical</text>
    <text x="130" y="310" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#c084fc" text-anchor="middle">↑ Vertical Upward Flow</text>
  </g>
`);

// Write all 14 SVGs to disk
const svgs = [
  { file: 'computer-network-architecture.svg', content: svg1 },
  { file: 'network-edge-core-access.svg', content: svg2 },
  { file: 'network-hardware-devices.svg', content: svg3 },
  { file: 'protocol-interfaces-primitives.svg', content: svg4 },
  { file: 'osi-7-layer-architecture.svg', content: svg5 },
  { file: 'tcp-ip-hourglass-architecture.svg', content: svg6 },
  { file: 'protocol-stack-encapsulation.svg', content: svg7 },
  { file: 'packet-encapsulation-decapsulation.svg', content: svg8 },
  { file: 'network-topologies-comparison.svg', content: svg9 },
  { file: 'circuit-vs-packet-switching.svg', content: svg10 },
  { file: 'transmission-media-guided-unguided.svg', content: svg11 },
  { file: 'network-delays-loss-queue.svg', content: svg12 },
  { file: 'multiplexing-fdm-tdm-wdm.svg', content: svg13 },
  { file: 'signals-nyquist-shannon-capacity.svg', content: svg14 }
];

svgs.forEach(s => {
  const p = path.join(outDir, s.file);
  fs.writeFileSync(p, s.content, 'utf8');
  console.log('Created SVG:', p, `(${fs.statSync(p).size} bytes)`);
});

console.log('All 14 Unit 1 SVGs successfully created!');

