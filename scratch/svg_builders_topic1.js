// scratch/svg_builders_topic1.js
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../assets/images/topic1');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function writeSvg(filename, svgContent) {
  fs.writeFileSync(path.join(outDir, filename), svgContent.trim(), 'utf8');
  console.log(`Created topic1/${filename}`);
}

// 1. OSI Layer 2 Position
writeSvg('osi-layer2-position.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 520" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <defs>
    <linearGradient id="l2Grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#059669" />
      <stop offset="100%" stop-color="#10B981" />
    </linearGradient>
    <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1E293B" />
      <stop offset="100%" stop-color="#334155" />
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="115%" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.08" />
    </filter>
    <filter id="glow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="0" stdDeviation="8" flood-color="#10B981" flood-opacity="0.35" />
    </filter>
  </defs>

  <!-- Title Card -->
  <rect x="30" y="20" width="840" height="60" rx="12" fill="url(#headerGrad)" filter="url(#shadow)" />
  <text x="50" y="56" fill="#F8FAFC" font-size="20" font-weight="700">OSI Reference Architecture: Data Link Layer Position &amp; PDU Flow</text>
  <rect x="710" y="38" width="140" height="26" rx="6" fill="#10B981" />
  <text x="780" y="55" fill="#FFFFFF" font-size="11" font-weight="700" text-anchor="middle">LAYER 2 EMPHASIS</text>

  <!-- Left: OSI 7-Layer Stack -->
  <g transform="translate(50, 105)">
    <!-- Layer 7 -->
    <rect x="0" y="0" width="340" height="38" rx="6" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="1.5" />
    <text x="20" y="24" fill="#64748B" font-size="12" font-weight="700">Layer 7</text>
    <text x="90" y="24" fill="#334155" font-size="13" font-weight="600">Application Layer</text>

    <!-- Layer 6 -->
    <rect x="0" y="44" width="340" height="38" rx="6" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="1.5" />
    <text x="20" y="68" fill="#64748B" font-size="12" font-weight="700">Layer 6</text>
    <text x="90" y="68" fill="#334155" font-size="13" font-weight="600">Presentation Layer</text>

    <!-- Layer 5 -->
    <rect x="0" y="88" width="340" height="38" rx="6" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="1.5" />
    <text x="20" y="112" fill="#64748B" font-size="12" font-weight="700">Layer 5</text>
    <text x="90" y="112" fill="#334155" font-size="13" font-weight="600">Session Layer</text>

    <!-- Layer 4 -->
    <rect x="0" y="132" width="340" height="38" rx="6" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="1.5" />
    <text x="20" y="156" fill="#64748B" font-size="12" font-weight="700">Layer 4</text>
    <text x="90" y="156" fill="#334155" font-size="13" font-weight="600">Transport Layer</text>

    <!-- Layer 3 -->
    <rect x="0" y="176" width="340" height="38" rx="6" fill="#EFF6FF" stroke="#93C5FD" stroke-width="1.5" />
    <text x="20" y="200" fill="#2563EB" font-size="12" font-weight="700">Layer 3</text>
    <text x="90" y="200" fill="#1E40AF" font-size="13" font-weight="600">Network Layer (Packets)</text>

    <!-- Layer 2: HIGHLIGHTED -->
    <rect x="-8" y="218" width="356" height="56" rx="10" fill="url(#l2Grad)" filter="url(#glow)" />
    <rect x="0" y="224" width="340" height="44" rx="8" fill="#059669" />
    <text x="20" y="251" fill="#A7F3D0" font-size="13" font-weight="800">Layer 2</text>
    <text x="90" y="251" fill="#FFFFFF" font-size="15" font-weight="800">DATA LINK LAYER (Frames)</text>
    <circle cx="320" cy="246" r="6" fill="#34D399" />

    <!-- Layer 1 -->
    <rect x="0" y="280" width="340" height="38" rx="6" fill="#FEF3C7" stroke="#FCD34D" stroke-width="1.5" />
    <text x="20" y="304" fill="#D97706" font-size="12" font-weight="700">Layer 1</text>
    <text x="90" y="304" fill="#92400E" font-size="13" font-weight="600">Physical Layer (Bits)</text>

    <!-- Physical Medium -->
    <rect x="0" y="328" width="340" height="30" rx="6" fill="#334155" />
    <text x="170" y="348" fill="#F8FAFC" font-size="11" font-weight="600" text-anchor="middle">Physical Transmission Medium (Cable / Wireless)</text>
  </g>

  <!-- Right: PDU Transformation & Encapsulation Flow -->
  <g transform="translate(440, 105)">
    <rect x="0" y="0" width="410" height="358" rx="12" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="2" filter="url(#shadow)" />
    
    <text x="25" y="34" fill="#0F172A" font-size="15" font-weight="700">Data Link Layer Encapsulation Role</text>
    <line x1="25" y1="46" x2="385" y2="46" stroke="#E2E8F0" stroke-width="1.5" />

    <!-- Step 1: Ingress Packet -->
    <g transform="translate(25, 65)">
      <text x="0" y="15" fill="#475569" font-size="11" font-weight="600">1. Receives Packet from Layer 3 (Network Layer)</text>
      <rect x="0" y="25" width="360" height="34" rx="6" fill="#DBEAFE" stroke="#3B82F6" stroke-width="1.5" />
      <text x="180" y="47" fill="#1E40AF" font-size="12" font-weight="700" text-anchor="middle">Network Layer Packet (IP Header + Payload)</text>
    </g>

    <!-- Arrow Down -->
    <path d="M 205 140 L 205 160" stroke="#059669" stroke-width="3" stroke-linecap="round" marker-end="url(#arrow)" />
    <polygon points="205,164 200,154 210,154" fill="#059669" />

    <!-- Step 2: DLL Frame Construction -->
    <g transform="translate(25, 175)">
      <text x="0" y="15" fill="#059669" font-size="12" font-weight="700">2. Encapsulates into Layer 2 Frame with Header &amp; Trailer</text>
      
      <!-- Frame Structure -->
      <g transform="translate(0, 25)">
        <!-- Header -->
        <rect x="0" y="0" width="95" height="44" rx="6" fill="#10B981" />
        <text x="47" y="20" fill="#FFFFFF" font-size="11" font-weight="700" text-anchor="middle">Frame Header</text>
        <text x="47" y="34" fill="#D1FAE5" font-size="9" text-anchor="middle">MAC / Control</text>

        <!-- Payload -->
        <rect x="100" y="0" width="165" height="44" rx="6" fill="#DBEAFE" stroke="#3B82F6" stroke-width="1.5" />
        <text x="182" y="20" fill="#1E40AF" font-size="11" font-weight="700" text-anchor="middle">Packet Payload</text>
        <text x="182" y="34" fill="#64748B" font-size="9" text-anchor="middle">(Network Layer Data)</text>

        <!-- Trailer -->
        <rect x="270" y="0" width="90" height="44" rx="6" fill="#F59E0B" />
        <text x="315" y="20" fill="#FFFFFF" font-size="11" font-weight="700" text-anchor="middle">Trailer</text>
        <text x="315" y="34" fill="#FEF3C7" font-size="9" text-anchor="middle">CRC / FCS</text>
      </g>
    </g>

    <!-- Arrow Down -->
    <polygon points="205,274 200,264 210,264" fill="#D97706" />

    <!-- Step 3: Egress Bits -->
    <g transform="translate(25, 285)">
      <text x="0" y="15" fill="#475569" font-size="11" font-weight="600">3. Streams Raw Bits to Layer 1 for Physical Transmission</text>
      <rect x="0" y="25" width="360" height="28" rx="6" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1.5" />
      <text x="180" y="44" fill="#92400E" font-size="12" font-family="monospace" font-weight="700" text-anchor="middle">01100001 01101100 01101111 ...</text>
    </g>
  </g>

  <!-- Footer Tagline -->
  <rect x="30" y="480" width="840" height="28" rx="6" fill="#F8FAFC" />
  <text x="450" y="498" fill="#64748B" font-size="11" font-weight="500" text-anchor="middle">Tanenbaum Ch. 3 &bull; Forouzan Ch. 11 &bull; Layer 2 transforms raw unguided physical bit transmission into reliable frame-level node delivery</text>
</svg>
`);

// 2. Node-to-Node Delivery
writeSvg('dll-node-to-node-delivery.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 500" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <defs>
    <filter id="cardShadow" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="#000000" flood-opacity="0.08" />
    </filter>
  </defs>

  <!-- Title -->
  <rect x="30" y="20" width="840" height="60" rx="12" fill="#0F172A" />
  <text x="50" y="56" fill="#F8FAFC" font-size="19" font-weight="700">Hop-by-Hop Node-to-Node Delivery (Data Link) vs End-to-End (Transport)</text>

  <!-- Topology Canvas -->
  <rect x="30" y="95" width="840" height="330" rx="12" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5" filter="url(#cardShadow)" />

  <!-- Node A: Source Host -->
  <g transform="translate(60, 160)">
    <rect x="0" y="0" width="110" height="110" rx="12" fill="#FFFFFF" stroke="#3B82F6" stroke-width="2" filter="url(#cardShadow)" />
    <circle cx="55" cy="40" r="22" fill="#EFF6FF" />
    <text x="55" y="46" fill="#2563EB" font-size="18" font-weight="800" text-anchor="middle">A</text>
    <text x="55" y="78" fill="#0F172A" font-size="11" font-weight="700" text-anchor="middle">Source Host</text>
    <text x="55" y="94" fill="#64748B" font-size="9" font-family="monospace" text-anchor="middle">IP_A | MAC_A</text>
  </g>

  <!-- Hop 1 Arrow -->
  <g transform="translate(180, 200)">
    <line x1="0" y1="15" x2="90" y2="15" stroke="#10B981" stroke-width="4" stroke-dasharray="6 4" />
    <polygon points="95,15 85,9 85,21" fill="#10B981" />
    <rect x="15" y="-12" width="65" height="18" rx="4" fill="#ECFDF5" stroke="#10B981" stroke-width="1" />
    <text x="47" y="1" fill="#065F46" font-size="9" font-weight="700" text-anchor="middle">HOP 1 (DLL)</text>
    <text x="47" y="42" fill="#64748B" font-size="9" text-anchor="middle">Ethernet LAN</text>
  </g>

  <!-- Router R1 -->
  <g transform="translate(285, 160)">
    <rect x="0" y="0" width="110" height="110" rx="12" fill="#FFFFFF" stroke="#64748B" stroke-width="2" filter="url(#cardShadow)" />
    <circle cx="55" cy="40" r="22" fill="#F1F5F9" />
    <text x="55" y="46" fill="#334155" font-size="16" font-weight="800" text-anchor="middle">R1</text>
    <text x="55" y="78" fill="#0F172A" font-size="11" font-weight="700" text-anchor="middle">Router 1</text>
    <text x="55" y="94" fill="#059669" font-size="8.5" font-weight="700" text-anchor="middle">Rewrites MACs</text>
  </g>

  <!-- Hop 2 Arrow -->
  <g transform="translate(405, 200)">
    <line x1="0" y1="15" x2="90" y2="15" stroke="#10B981" stroke-width="4" stroke-dasharray="6 4" />
    <polygon points="95,15 85,9 85,21" fill="#10B981" />
    <rect x="15" y="-12" width="65" height="18" rx="4" fill="#ECFDF5" stroke="#10B981" stroke-width="1" />
    <text x="47" y="1" fill="#065F46" font-size="9" font-weight="700" text-anchor="middle">HOP 2 (DLL)</text>
    <text x="47" y="42" fill="#64748B" font-size="9" text-anchor="middle">Optical WAN Link</text>
  </g>

  <!-- Router R2 -->
  <g transform="translate(510, 160)">
    <rect x="0" y="0" width="110" height="110" rx="12" fill="#FFFFFF" stroke="#64748B" stroke-width="2" filter="url(#cardShadow)" />
    <circle cx="55" cy="40" r="22" fill="#F1F5F9" />
    <text x="55" y="46" fill="#334155" font-size="16" font-weight="800" text-anchor="middle">R2</text>
    <text x="55" y="78" fill="#0F172A" font-size="11" font-weight="700" text-anchor="middle">Router 2</text>
    <text x="55" y="94" fill="#059669" font-size="8.5" font-weight="700" text-anchor="middle">Rewrites MACs</text>
  </g>

  <!-- Hop 3 Arrow -->
  <g transform="translate(630, 200)">
    <line x1="0" y1="15" x2="90" y2="15" stroke="#10B981" stroke-width="4" stroke-dasharray="6 4" />
    <polygon points="95,15 85,9 85,21" fill="#10B981" />
    <rect x="15" y="-12" width="65" height="18" rx="4" fill="#ECFDF5" stroke="#10B981" stroke-width="1" />
    <text x="47" y="1" fill="#065F46" font-size="9" font-weight="700" text-anchor="middle">HOP 3 (DLL)</text>
    <text x="47" y="42" fill="#64748B" font-size="9" text-anchor="middle">Wi-Fi BSS</text>
  </g>

  <!-- Node B: Destination Host -->
  <g transform="translate(735, 160)">
    <rect x="0" y="0" width="110" height="110" rx="12" fill="#FFFFFF" stroke="#8B5CF6" stroke-width="2" filter="url(#cardShadow)" />
    <circle cx="55" cy="40" r="22" fill="#F5F3FF" />
    <text x="55" y="46" fill="#7C3AED" font-size="18" font-weight="800" text-anchor="middle">B</text>
    <text x="55" y="78" fill="#0F172A" font-size="11" font-weight="700" text-anchor="middle">Dest Host</text>
    <text x="55" y="94" fill="#64748B" font-size="9" font-family="monospace" text-anchor="middle">IP_B | MAC_B</text>
  </g>

  <!-- Top Curve: End-to-End Transport Delivery -->
  <path d="M 115 150 C 250 80, 680 80, 790 150" fill="none" stroke="#3B82F6" stroke-width="2.5" stroke-dasharray="4 4" />
  <rect x="360" y="80" width="180" height="24" rx="6" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1" />
  <text x="450" y="96" fill="#1D4ED8" font-size="11" font-weight="700" text-anchor="middle">END-TO-END (Transport / L4)</text>

  <!-- Key Rule Banner -->
  <rect x="50" y="310" width="800" height="90" rx="8" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1" />
  <text x="70" y="335" fill="#059669" font-size="13" font-weight="700">&bull; Data Link Layer (L2) Scope: Node-to-Node</text>
  <text x="85" y="354" fill="#475569" font-size="11.5">Frames are stripped and rebuilt at each router hop. The source and destination MAC addresses change at each physical link, while the IP header remains constant from Source to Destination.</text>
  <text x="70" y="382" fill="#2563EB" font-size="13" font-weight="700">&bull; Network/Transport Scope: Host-to-Host &amp; Process-to-Process</text>
</svg>
`);

// 3. Core Functions of DLL
writeSvg('dll-core-functions.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 520" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <!-- Title -->
  <rect x="30" y="20" width="840" height="54" rx="10" fill="#0F172A" />
  <text x="50" y="53" fill="#F8FAFC" font-size="18" font-weight="700">The 6 Core Functions of the Data Link Layer</text>

  <!-- 6 Grid Cards -->
  <g transform="translate(45, 95)">
    <!-- 1. Framing -->
    <g transform="translate(0, 0)">
      <rect width="255" height="185" rx="10" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5" />
      <rect width="255" height="6" rx="3" fill="#10B981" />
      <circle cx="35" cy="38" r="16" fill="#ECFDF5" />
      <text x="35" y="44" fill="#059669" font-size="16" font-weight="800" text-anchor="middle">1</text>
      <text x="65" y="42" fill="#0F172A" font-size="14" font-weight="700">Framing</text>
      <text x="20" y="75" fill="#475569" font-size="11.5" font-weight="500">Divides the raw bit stream from Network Layer into distinct data units (frames) with header and trailer delimiters.</text>
      <rect x="15" y="130" width="225" height="40" rx="6" fill="#FFFFFF" stroke="#CBD5E1" />
      <text x="127" y="154" fill="#059669" font-size="10.5" font-family="monospace" font-weight="700" text-anchor="middle">[FLAG] Header | Data | FCS [FLAG]</text>
    </g>

    <!-- 2. Physical Addressing -->
    <g transform="translate(275, 0)">
      <rect width="255" height="185" rx="10" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5" />
      <rect width="255" height="6" rx="3" fill="#3B82F6" />
      <circle cx="35" cy="38" r="16" fill="#EFF6FF" />
      <text x="35" y="44" fill="#2563EB" font-size="16" font-weight="800" text-anchor="middle">2</text>
      <text x="65" y="42" fill="#0F172A" font-size="14" font-weight="700">Physical Addressing</text>
      <text x="20" y="75" fill="#475569" font-size="11.5" font-weight="500">Attaches 48-bit hardware MAC addresses to ensure delivery to the intended local recipient network card (NIC).</text>
      <rect x="15" y="130" width="225" height="40" rx="6" fill="#FFFFFF" stroke="#CBD5E1" />
      <text x="127" y="154" fill="#2563EB" font-size="10.5" font-family="monospace" font-weight="700" text-anchor="middle">00:1A:2B:3C:4D:5E (48 bits)</text>
    </g>

    <!-- 3. Flow Control -->
    <g transform="translate(550, 0)">
      <rect width="255" height="185" rx="10" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5" />
      <rect width="255" height="6" rx="3" fill="#F59E0B" />
      <circle cx="35" cy="38" r="16" fill="#FEF3C7" />
      <text x="35" y="44" fill="#D97706" font-size="16" font-weight="800" text-anchor="middle">3</text>
      <text x="65" y="42" fill="#0F172A" font-size="14" font-weight="700">Flow Control</text>
      <text x="20" y="75" fill="#475569" font-size="11.5" font-weight="500">Prevents a fast sender from swamping a slow receiver by regulating transmission rates via feedback (Stop-and-Wait / Sliding Window).</text>
      <rect x="15" y="130" width="225" height="40" rx="6" fill="#FFFFFF" stroke="#CBD5E1" />
      <text x="127" y="154" fill="#D97706" font-size="10" font-weight="700" text-anchor="middle">Sender Window = N &le; 2^m - 1</text>
    </g>

    <!-- 4. Error Control -->
    <g transform="translate(0, 205)">
      <rect width="255" height="185" rx="10" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5" />
      <rect width="255" height="6" rx="3" fill="#EF4444" />
      <circle cx="35" cy="38" r="16" fill="#FEE2E2" />
      <text x="35" y="44" fill="#DC2626" font-size="16" font-weight="800" text-anchor="middle">4</text>
      <text x="65" y="42" fill="#0F172A" font-size="14" font-weight="700">Error Control</text>
      <text x="20" y="75" fill="#475569" font-size="11.5" font-weight="500">Detects and corrects bit corruption or lost frames using checksums (CRC) and Automatic Repeat reQuest (ARQ) retransmissions.</text>
      <rect x="15" y="130" width="225" height="40" rx="6" fill="#FFFFFF" stroke="#CBD5E1" />
      <text x="127" y="154" fill="#DC2626" font-size="10.5" font-family="monospace" font-weight="700" text-anchor="middle">CRC-32 &bull; ACK / NAK &bull; Timers</text>
    </g>

    <!-- 5. Access Control (MAC) -->
    <g transform="translate(275, 205)">
      <rect width="255" height="185" rx="10" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5" />
      <rect width="255" height="6" rx="3" fill="#8B5CF6" />
      <circle cx="35" cy="38" r="16" fill="#F5F3FF" />
      <text x="35" y="44" fill="#7C3AED" font-size="16" font-weight="800" text-anchor="middle">5</text>
      <text x="65" y="42" fill="#0F172A" font-size="14" font-weight="700">Access Control</text>
      <text x="20" y="75" fill="#475569" font-size="11.5" font-weight="500">Arbitrates multi-station access to shared communication channels (bus or radio) to avoid collisions using CSMA, Token, or Polling.</text>
      <rect x="15" y="130" width="225" height="40" rx="6" fill="#FFFFFF" stroke="#CBD5E1" />
      <text x="127" y="154" fill="#7C3AED" font-size="10.5" font-weight="700" text-anchor="middle">CSMA/CD &bull; CSMA/CA &bull; Token Ring</text>
    </g>

    <!-- 6. Link Management -->
    <g transform="translate(550, 205)">
      <rect width="255" height="185" rx="10" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5" />
      <rect width="255" height="6" rx="3" fill="#06B6D4" />
      <circle cx="35" cy="38" r="16" fill="#ECFEFF" />
      <text x="35" y="44" fill="#0891B2" font-size="16" font-weight="800" text-anchor="middle">6</text>
      <text x="65" y="42" fill="#0F172A" font-size="14" font-weight="700">Link Management</text>
      <text x="20" y="75" fill="#475569" font-size="11.5" font-weight="500">Controls the establishment, maintenance, parameter negotiation (MTU, speed, duplex), and orderly termination of the data link.</text>
      <rect x="15" y="130" width="225" height="40" rx="6" fill="#FFFFFF" stroke="#CBD5E1" />
      <text x="127" y="154" fill="#0891B2" font-size="10.5" font-weight="700" text-anchor="middle">LCP (PPP) &bull; Auto-Negotiation</text>
    </g>
  </g>
</svg>
`);

// 4. DLL Design Issues Architecture
writeSvg('dll-design-issues-architecture.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 500" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <rect x="30" y="20" width="840" height="54" rx="10" fill="#0F172A" />
  <text x="50" y="53" fill="#F8FAFC" font-size="18" font-weight="700">Key Design Issues of the Data Link Layer (Tanenbaum Ch. 3)</text>

  <g transform="translate(50, 95)">
    <!-- Issue 1: Services to Network Layer -->
    <rect x="0" y="0" width="380" height="175" rx="10" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5" />
    <rect x="0" y="0" width="380" height="34" rx="10" fill="#EFF6FF" />
    <text x="20" y="23" fill="#1E40AF" font-size="13" font-weight="700">1. Services Provided to the Network Layer</text>
    <text x="20" y="60" fill="#334155" font-size="11.5" font-weight="600">&bull; Unacknowledged Connectionless:</text>
    <text x="35" y="78" fill="#64748B" font-size="11">Fast, low overhead; suitable for reliable links (LANs) &amp; real-time audio.</text>
    <text x="20" y="102" fill="#334155" font-size="11.5" font-weight="600">&bull; Acknowledged Connectionless:</text>
    <text x="35" y="120" fill="#64748B" font-size="11">Each frame individually ACKed; ideal for unreliable wireless (Wi-Fi 802.11).</text>
    <text x="20" y="144" fill="#334155" font-size="11.5" font-weight="600">&bull; Acknowledged Connection-Oriented:</text>
    <text x="35" y="162" fill="#64748B" font-size="11">Guaranteed in-order delivery via setup/data/release phases (HDLC, LAPB).</text>

    <!-- Issue 2: Framing -->
    <rect x="420" y="0" width="380" height="175" rx="10" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5" />
    <rect x="0" y="0" width="380" height="34" rx="10" fill="#ECFDF5" transform="translate(420, 0)" />
    <text x="440" y="23" fill="#065F46" font-size="13" font-weight="700">2. Framing &amp; Synchronization</text>
    <text x="440" y="60" fill="#334155" font-size="11.5" font-weight="600">&bull; Character Count:</text>
    <text x="455" y="78" fill="#64748B" font-size="11">Count field in header; catastrophic if count bit corrupted.</text>
    <text x="440" y="102" fill="#334155" font-size="11.5" font-weight="600">&bull; Byte Stuffing (Character-Oriented):</text>
    <text x="455" y="120" fill="#64748B" font-size="11">Special FLAG bytes with ESC (Escape) prefixes for transparency.</text>
    <text x="440" y="144" fill="#334155" font-size="11.5" font-weight="600">&bull; Bit Stuffing (Bit-Oriented):</text>
    <text x="455" y="162" fill="#64748B" font-size="11">Flag 01111110; sender inserts '0' after five consecutive '1's.</text>

    <!-- Issue 3: Flow Control -->
    <rect x="0" y="195" width="380" height="175" rx="10" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5" />
    <rect x="0" y="0" width="380" height="34" rx="10" fill="#FEF3C7" transform="translate(0, 195)" />
    <text x="20" y="218" fill="#92400E" font-size="13" font-weight="700">3. Flow Control Mechanisms</text>
    <text x="20" y="255" fill="#334155" font-size="11.5" font-weight="600">&bull; Feedback-Based Flow Control:</text>
    <text x="35" y="273" fill="#64748B" font-size="11">Receiver sends permission back to sender before next frame can be transmitted.</text>
    <text x="20" y="297" fill="#334155" font-size="11.5" font-weight="600">&bull; Stop-and-Wait:</text>
    <text x="35" y="315" fill="#64748B" font-size="11">Window = 1; inefficient on high Bandwidth-Delay Product (BDP) links.</text>
    <text x="20" y="339" fill="#334155" font-size="11.5" font-weight="600">&bull; Sliding Window Protocols:</text>
    <text x="35" y="357" fill="#64748B" font-size="11">Pipelines multiple unacknowledged frames (Go-Back-N / Selective Repeat).</text>

    <!-- Issue 4: Error Control -->
    <rect x="420" y="195" width="380" height="175" rx="10" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5" />
    <rect x="0" y="0" width="380" height="34" rx="10" fill="#FEE2E2" transform="translate(420, 195)" />
    <text x="440" y="218" fill="#991B1B" font-size="13" font-weight="700">4. Error Control &amp; Reliability</text>
    <text x="440" y="255" fill="#334155" font-size="11.5" font-weight="600">&bull; Error Detection (Redundancy):</text>
    <text x="455" y="273" fill="#64748B" font-size="11">Parity, Checksum, and CRC (Cyclic Redundancy Check) appended in FCS trailer.</text>
    <text x="440" y="297" fill="#334155" font-size="11.5" font-weight="600">&bull; Automatic Repeat reQuest (ARQ):</text>
    <text x="455" y="315" fill="#64748B" font-size="11">Combines error detection with timer expiry and retransmissions.</text>
    <text x="440" y="339" fill="#334155" font-size="11.5" font-weight="600">&bull; Sequence Numbers:</text>
    <text x="455" y="357" fill="#64748B" font-size="11">Guards against duplicate frames caused by delayed or lost ACKs.</text>
  </g>
</svg>
`);

// 5. Framing Techniques Comparison
writeSvg('framing-techniques.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 500" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <rect x="30" y="20" width="840" height="54" rx="10" fill="#0F172A" />
  <text x="50" y="53" fill="#F8FAFC" font-size="18" font-weight="700">Four Classical Data Link Layer Framing Techniques</text>

  <g transform="translate(50, 95)">
    <!-- 1. Character Count -->
    <g transform="translate(0, 0)">
      <rect width="800" height="75" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5" />
      <text x="20" y="25" fill="#1E40AF" font-size="13" font-weight="700">1. Character Count Method</text>
      <text x="20" y="45" fill="#64748B" font-size="10.5">The first byte indicates total characters in frame (including count byte itself). Vulnerable to desynchronization on 1-bit error.</text>
      <!-- Visual -->
      <g transform="translate(20, 52)">
        <rect x="0" y="0" width="30" height="18" fill="#3B82F6" rx="3" /><text x="15" y="13" fill="#FFF" font-size="10" font-weight="bold" text-anchor="middle">5</text>
        <rect x="32" y="0" width="25" height="18" fill="#E2E8F0" rx="3" /><text x="44" y="13" fill="#334" font-size="9" text-anchor="middle">A</text>
        <rect x="59" y="0" width="25" height="18" fill="#E2E8F0" rx="3" /><text x="71" y="13" fill="#334" font-size="9" text-anchor="middle">B</text>
        <rect x="86" y="0" width="25" height="18" fill="#E2E8F0" rx="3" /><text x="98" y="13" fill="#334" font-size="9" text-anchor="middle">C</text>
        <rect x="113" y="0" width="25" height="18" fill="#E2E8F0" rx="3" /><text x="125" y="13" fill="#334" font-size="9" text-anchor="middle">D</text>
        <text x="150" y="13" fill="#94A3B8" font-size="10">&rarr; Frame 1 (5 chars)</text>
      </g>
    </g>

    <!-- 2. Flag Bytes with Byte Stuffing -->
    <g transform="translate(0, 90)">
      <rect width="800" height="85" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5" />
      <text x="20" y="24" fill="#065F46" font-size="13" font-weight="700">2. Flag Bytes with Byte Stuffing (Character-Oriented)</text>
      <text x="20" y="42" fill="#64748B" font-size="10.5">Frames are bordered by special FLAG bytes. If FLAG or ESC occurs in payload data, the sender inserts an ESC byte ahead of it.</text>
      <g transform="translate(20, 52)">
        <rect x="0" y="0" width="55" height="22" fill="#10B981" rx="4" /><text x="27" y="15" fill="#FFF" font-size="10" font-weight="bold" text-anchor="middle">FLAG</text>
        <rect x="60" y="0" width="70" height="22" fill="#E2E8F0" rx="4" /><text x="95" y="15" fill="#334" font-size="10" text-anchor="middle">User Data</text>
        <rect x="135" y="0" width="45" height="22" fill="#F59E0B" rx="4" /><text x="157" y="15" fill="#FFF" font-size="10" font-weight="bold" text-anchor="middle">ESC</text>
        <rect x="185" y="0" width="55" height="22" fill="#E2E8F0" rx="4" /><text x="212" y="15" fill="#334" font-size="10" text-anchor="middle">FLAG</text>
        <rect x="245" y="0" width="55" height="22" fill="#10B981" rx="4" /><text x="272" y="15" fill="#FFF" font-size="10" font-weight="bold" text-anchor="middle">FLAG</text>
        <text x="315" y="16" fill="#065F46" font-size="10" font-weight="bold">&larr; Escaped Data Pattern</text>
      </g>
    </g>

    <!-- 3. Bit Stuffing -->
    <g transform="translate(0, 190)">
      <rect width="800" height="85" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5" />
      <text x="20" y="24" fill="#92400E" font-size="13" font-weight="700">3. Flag Bits with Bit Stuffing (Bit-Oriented &bull; HDLC / SDLC)</text>
      <text x="20" y="42" fill="#64748B" font-size="10.5">Frame delimiter flag is 01111110 (six 1s). Sender stuffs a '0' after any five consecutive '1's. Receiver automatically unstuffs the '0'.</text>
      <g transform="translate(20, 52)">
        <rect x="0" y="0" width="85" height="22" fill="#F59E0B" rx="4" /><text x="42" y="15" fill="#FFF" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">01111110</text>
        <rect x="90" y="0" width="160" height="22" fill="#EFF6FF" rx="4" stroke="#3B82F6" /><text x="170" y="15" fill="#1E40AF" font-size="10" font-family="monospace" text-anchor="middle">011011111<tspan fill="#EF4444" font-weight="bold">0</tspan>1001</text>
        <rect x="255" y="0" width="85" height="22" fill="#F59E0B" rx="4" /><text x="297" y="15" fill="#FFF" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">01111110</text>
        <text x="355" y="16" fill="#DC2626" font-size="10" font-weight="bold">&larr; Stuffed '0' prevents premature flag detection</text>
      </g>
    </g>

    <!-- 4. Physical Layer Coding Violations -->
    <g transform="translate(0, 290)">
      <rect width="800" height="75" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5" />
      <text x="20" y="24" fill="#7C3AED" font-size="13" font-weight="700">4. Physical Layer Coding Violations (e.g. Manchester Encoding)</text>
      <text x="20" y="42" fill="#64748B" font-size="10.5">Normal bits require a transition (low-to-high or high-to-low). Delimiters use illegal signals (High-High or Low-Low) with zero payload overhead.</text>
      <text x="20" y="62" fill="#7C3AED" font-size="10.5" font-family="monospace" font-weight="700">Delimiters: [HIGH-HIGH] or [LOW-LOW] signal states &bull; Used in Classical 10 Mbps 802.3 Ethernet</text>
    </g>
  </g>
</svg>
`);

// 6. Bit Stuffing Mechanism Detailed Trace
writeSvg('bit-stuffing-mechanism.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 480" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <rect x="30" y="20" width="840" height="54" rx="10" fill="#0F172A" />
  <text x="50" y="53" fill="#F8FAFC" font-size="18" font-weight="700">Bit Stuffing &amp; Unstuffing Protocol Trace (Zero-Bit Insertion)</text>

  <g transform="translate(50, 95)">
    <!-- Stage 1 -->
    <rect x="0" y="0" width="800" height="95" rx="10" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5" />
    <text x="20" y="30" fill="#0F172A" font-size="13" font-weight="700">Step 1: Original Unstuffed Data Stream from Network Layer</text>
    <text x="20" y="52" fill="#64748B" font-size="11">Data payload contains a sequence with five consecutive '1's that would mimic a flag if another '1' followed:</text>
    <rect x="20" y="60" width="760" height="26" rx="4" fill="#FFFFFF" stroke="#94A3B8" />
    <text x="35" y="77" fill="#0F172A" font-size="13" font-family="monospace" font-weight="700">0 1 1 0 1 1 1 1 1 1 0 1 1 1 1 1 0 0 1 0 1 0</text>

    <!-- Stage 2 -->
    <rect x="0" y="115" width="800" height="115" rx="10" fill="#EFF6FF" stroke="#93C5FD" stroke-width="1.5" />
    <text x="20" y="145" fill="#1E40AF" font-size="13" font-weight="700">Step 2: Transmitter Stuffs a '0' Bit After Every Five Consecutive '1's</text>
    <text x="20" y="167" fill="#3B82F6" font-size="11">Transmitter logic: count consecutive 1s. When count == 5, insert '0' bit regardless of whether the next bit is 0 or 1.</text>
    <rect x="20" y="180" width="760" height="36" rx="4" fill="#FFFFFF" stroke="#3B82F6" />
    <text x="35" y="203" fill="#0F172A" font-size="13" font-family="monospace" font-weight="700">
      0 1 1 0 1 1 1 1 1 <tspan fill="#EF4444" font-weight="900" font-size="15">[0]</tspan> 1 0 1 1 1 1 1 <tspan fill="#EF4444" font-weight="900" font-size="15">[0]</tspan> 0 0 1 0 1 0
    </text>

    <!-- Stage 3 -->
    <rect x="0" y="250" width="800" height="115" rx="10" fill="#ECFDF5" stroke="#A7F3D0" stroke-width="1.5" />
    <text x="20" y="280" fill="#065F46" font-size="13" font-weight="700">Step 3: Receiver Detects and Strips (Unstuffs) the Inserted '0's</text>
    <text x="20" y="302" fill="#059669" font-size="11">Receiver rule: After seeing five 1s: if 6th bit is '0', strip it. If 6th bit is '1' and 7th bit is '0', it is a FLAG!</text>
    <rect x="20" y="315" width="760" height="36" rx="4" fill="#FFFFFF" stroke="#10B981" />
    <text x="35" y="338" fill="#059669" font-size="13" font-family="monospace" font-weight="700">
      0 1 1 0 1 1 1 1 1 1 0 1 1 1 1 1 0 0 1 0 1 0 <tspan fill="#10B981" font-sans font-weight="bold">(Original Data Faithfully Restored)</tspan>
    </text>
  </g>
</svg>
`);

console.log('Topic 1 SVGs generated successfully.');
