const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../assets/images/unit3/topic1-ip-addresses');

const svgs = {};

// 1. subnet-mask-concept.svg
svgs['subnet-mask-concept.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  <defs>
    <style>
      text { font-family: 'Segoe UI', Arial, sans-serif; }
      .title { font-size: 20px; font-weight: bold; fill: #1e293b; }
      .subtitle { font-size: 13px; fill: #475569; }
      .cell-title { font-size: 13px; font-weight: 600; fill: #1e293b; }
      .mono { font-family: 'Consolas', 'Courier New', monospace; font-size: 13px; fill: #0f172a; font-weight: 600; }
      .mono-net { font-family: 'Consolas', 'Courier New', monospace; font-size: 13px; fill: #2563eb; font-weight: bold; }
      .mono-host { font-family: 'Consolas', 'Courier New', monospace; font-size: 13px; fill: #ea580c; font-weight: bold; }
    </style>
    <filter id="shadow" x="-2%" y="-2%" width="104%" height="104%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.08"/>
    </filter>
  </defs>

  <rect width="800" height="500" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="400" y="38" text-anchor="middle" class="title">Subnet Mask &amp; Bitwise AND Operation</text>
  <text x="400" y="58" text-anchor="middle" class="subtitle">Extracting the Network ID from an IP Address using the Subnet Mask</text>

  <!-- Step 1: IP Address -->
  <g transform="translate(60, 90)">
    <rect width="680" height="75" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2" filter="url(#shadow)"/>
    <text x="25" y="30" class="cell-title">1. Host IP Address (Dotted Decimal &amp; Binary)</text>
    <text x="25" y="55" class="mono" font-size="14">Decimal: 192.168.1.130</text>
    <rect x="250" y="38" width="300" height="26" rx="4" fill="#eff6ff"/>
    <text x="260" y="56" class="mono-net">11000000.10101000.00000001.</text>
    <rect x="555" y="38" width="100" height="26" rx="4" fill="#fff7ed"/>
    <text x="560" y="56" class="mono-host">10000010</text>
  </g>

  <!-- Operator symbol -->
  <circle cx="400" cy="185" r="16" fill="#3b82f6"/>
  <text x="400" y="191" text-anchor="middle" font-size="18" font-weight="bold" fill="#ffffff">&amp;</text>
  <text x="430" y="190" font-size="12" font-weight="bold" fill="#2563eb">BITWISE AND</text>

  <!-- Step 2: Subnet Mask -->
  <g transform="translate(60, 210)">
    <rect width="680" height="75" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2" filter="url(#shadow)"/>
    <text x="25" y="30" class="cell-title">2. Subnet Mask (/24 or 255.255.255.0)</text>
    <text x="25" y="55" class="mono" font-size="14">Decimal: 255.255.255.0</text>
    <rect x="250" y="38" width="300" height="26" rx="4" fill="#eff6ff"/>
    <text x="260" y="56" class="mono-net">11111111.11111111.11111111.</text>
    <rect x="555" y="38" width="100" height="26" rx="4" fill="#f1f5f9"/>
    <text x="560" y="56" class="mono" fill="#64748b">00000000</text>
  </g>

  <!-- Result arrow -->
  <line x1="400" y1="295" x2="400" y2="320" stroke="#059669" stroke-width="3" marker-end="url(#arrow)"/>

  <!-- Step 3: Resulting Network Address -->
  <g transform="translate(60, 325)">
    <rect width="680" height="90" rx="8" fill="#f0fdf4" stroke="#10b981" stroke-width="2" filter="url(#shadow)"/>
    <text x="25" y="30" class="cell-title" fill="#065f46">3. Result: Network ID (Subnet Address)</text>
    <text x="25" y="60" class="mono" font-size="15" fill="#047857">Decimal: 192.168.1.0 /24</text>
    <text x="250" y="60" class="mono" font-size="13" fill="#065f46">Binary: 11000000.10101000.00000001.00000000</text>
    <text x="25" y="80" font-size="11" fill="#047857">✓ 1 AND 1 = 1 (Network bits kept) | ✓ Anything AND 0 = 0 (Host bits wiped to 0)</text>
  </g>

  <!-- Legend -->
  <rect x="180" y="440" width="16" height="16" rx="3" fill="#2563eb"/>
  <text x="205" y="453" font-size="12" fill="#334155">Network Portion (Mask = 1s)</text>
  <rect x="440" y="440" width="16" height="16" rx="3" fill="#ea580c"/>
  <text x="465" y="453" font-size="12" fill="#334155">Host Portion (Mask = 0s)</text>
</svg>`;

// 2. subnetting-example.svg
svgs['subnetting-example.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  <defs>
    <style>
      text { font-family: 'Segoe UI', Arial, sans-serif; }
      .title { font-size: 20px; font-weight: bold; fill: #1e293b; }
      .sub { font-size: 13px; fill: #475569; }
      .box-title { font-size: 13px; font-weight: bold; fill: #1e293b; }
      .val { font-size: 11px; fill: #334155; }
      .bold { font-weight: bold; }
    </style>
    <filter id="shadow" x="-2%" y="-2%" width="104%" height="104%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.1"/>
    </filter>
  </defs>

  <rect width="800" height="500" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="400" y="35" text-anchor="middle" class="title">Subnetting a /24 Network into 4 Subnets (/26)</text>
  <text x="400" y="55" text-anchor="middle" class="sub">Dividing 192.168.1.0/24 by borrowing 2 host bits (2² = 4 subnets, 2⁶ - 2 = 62 usable hosts each)</text>

  <!-- Base Network Box -->
  <rect x="220" y="75" width="360" height="65" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="2" filter="url(#shadow)"/>
  <text x="400" y="100" text-anchor="middle" font-size="15" font-weight="bold" fill="#1e40af">Original Block: 192.168.1.0/24</text>
  <text x="400" y="122" text-anchor="middle" font-size="12" fill="#3b82f6">Total: 256 Addresses (254 Usable Hosts) | Mask: 255.255.255.0</text>

  <!-- Split arrows -->
  <path d="M 280 140 L 140 190" stroke="#64748b" stroke-width="2" stroke-dasharray="4,3"/>
  <path d="M 360 140 L 310 190" stroke="#64748b" stroke-width="2" stroke-dasharray="4,3"/>
  <path d="M 440 140 L 490 190" stroke="#64748b" stroke-width="2" stroke-dasharray="4,3"/>
  <path d="M 520 140 L 660 190" stroke="#64748b" stroke-width="2" stroke-dasharray="4,3"/>

  <!-- Subnet 1 -->
  <g transform="translate(40, 195)">
    <rect width="165" height="235" rx="8" fill="#ffffff" stroke="#10b981" stroke-width="1.8" filter="url(#shadow)"/>
    <rect width="165" height="35" rx="8" fill="#ecfdf5"/>
    <text x="82" y="23" text-anchor="middle" class="box-title" fill="#047857">Subnet 1 (00)</text>
    <text x="12" y="60" class="val bold">Network ID:</text>
    <text x="12" y="76" class="val" fill="#059669">192.168.1.0/26</text>
    <text x="12" y="105" class="val bold">Host Range:</text>
    <text x="12" y="121" class="val">192.168.1.1</text>
    <text x="12" y="137" class="val">to 192.168.1.62</text>
    <text x="12" y="165" class="val bold">Broadcast:</text>
    <text x="12" y="181" class="val" fill="#dc2626">192.168.1.63</text>
    <text x="12" y="210" class="val bold" fill="#2563eb">Usable: 62 Hosts</text>
  </g>

  <!-- Subnet 2 -->
  <g transform="translate(225, 195)">
    <rect width="165" height="235" rx="8" fill="#ffffff" stroke="#3b82f6" stroke-width="1.8" filter="url(#shadow)"/>
    <rect width="165" height="35" rx="8" fill="#eff6ff"/>
    <text x="82" y="23" text-anchor="middle" class="box-title" fill="#1d4ed8">Subnet 2 (01)</text>
    <text x="12" y="60" class="val bold">Network ID:</text>
    <text x="12" y="76" class="val" fill="#2563eb">192.168.1.64/26</text>
    <text x="12" y="105" class="val bold">Host Range:</text>
    <text x="12" y="121" class="val">192.168.1.65</text>
    <text x="12" y="137" class="val">to 192.168.1.126</text>
    <text x="12" y="165" class="val bold">Broadcast:</text>
    <text x="12" y="181" class="val" fill="#dc2626">192.168.1.127</text>
    <text x="12" y="210" class="val bold" fill="#2563eb">Usable: 62 Hosts</text>
  </g>

  <!-- Subnet 3 -->
  <g transform="translate(410, 195)">
    <rect width="165" height="235" rx="8" fill="#ffffff" stroke="#f59e0b" stroke-width="1.8" filter="url(#shadow)"/>
    <rect width="165" height="35" rx="8" fill="#fffbeb"/>
    <text x="82" y="23" text-anchor="middle" class="box-title" fill="#b45309">Subnet 3 (10)</text>
    <text x="12" y="60" class="val bold">Network ID:</text>
    <text x="12" y="76" class="val" fill="#d97706">192.168.1.128/26</text>
    <text x="12" y="105" class="val bold">Host Range:</text>
    <text x="12" y="121" class="val">192.168.1.129</text>
    <text x="12" y="137" class="val">to 192.168.1.190</text>
    <text x="12" y="165" class="val bold">Broadcast:</text>
    <text x="12" y="181" class="val" fill="#dc2626">192.168.1.191</text>
    <text x="12" y="210" class="val bold" fill="#2563eb">Usable: 62 Hosts</text>
  </g>

  <!-- Subnet 4 -->
  <g transform="translate(595, 195)">
    <rect width="165" height="235" rx="8" fill="#ffffff" stroke="#8b5cf6" stroke-width="1.8" filter="url(#shadow)"/>
    <rect width="165" height="35" rx="8" fill="#f5f3ff"/>
    <text x="82" y="23" text-anchor="middle" class="box-title" fill="#6d28d9">Subnet 4 (11)</text>
    <text x="12" y="60" class="val bold">Network ID:</text>
    <text x="12" y="76" class="val" fill="#7c3aed">192.168.1.192/26</text>
    <text x="12" y="105" class="val bold">Host Range:</text>
    <text x="12" y="121" class="val">192.168.1.193</text>
    <text x="12" y="137" class="val">to 192.168.1.254</text>
    <text x="12" y="165" class="val bold">Broadcast:</text>
    <text x="12" y="181" class="val" fill="#dc2626">192.168.1.255</text>
    <text x="12" y="210" class="val bold" fill="#2563eb">Usable: 62 Hosts</text>
  </g>

  <!-- Footer note -->
  <text x="400" y="465" text-anchor="middle" font-size="12" fill="#475569">New Subnet Mask for all 4 subnets: 255.255.255.192 (/26 = 11111111.11111111.11111111.11000000)</text>
</svg>`;

// 3. cidr-notation.svg
svgs['cidr-notation.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  <defs>
    <style>
      text { font-family: 'Segoe UI', Arial, sans-serif; }
      .title { font-size: 20px; font-weight: bold; fill: #1e293b; }
      .sub { font-size: 13px; fill: #475569; }
      .header { font-size: 12px; font-weight: bold; fill: #ffffff; }
      .row-txt { font-size: 12px; fill: #334155; }
      .row-bold { font-size: 12px; font-weight: bold; fill: #1e293b; }
    </style>
    <filter id="shadow" x="-2%" y="-2%" width="104%" height="104%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.08"/>
    </filter>
  </defs>

  <rect width="800" height="500" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="400" y="38" text-anchor="middle" class="title">Classless Inter-Domain Routing (CIDR) Notation</text>
  <text x="400" y="58" text-anchor="middle" class="sub">Slash notation indicates how many leading bits are allocated to the Network Prefix</text>

  <!-- Bit visualization bar -->
  <g transform="translate(60, 80)">
    <text x="0" y="15" font-size="12" font-weight="bold" fill="#1e293b">Example: 192.168.10.0 /20 (Prefix = 20 bits, Host = 12 bits)</text>
    <rect x="0" y="25" width="425" height="35" fill="#2563eb" rx="4"/>
    <text x="212" y="47" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Network Prefix (20 bits)</text>
    <rect x="430" y="25" width="250" height="35" fill="#ea580c" rx="4"/>
    <text x="555" y="47" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Host Identifier (12 bits = 4,096 IPs)</text>
  </g>

  <!-- Table -->
  <g transform="translate(60, 165)" filter="url(#shadow)">
    <!-- Header -->
    <rect width="680" height="32" rx="6" fill="#1e293b"/>
    <text x="20" y="21" class="header">CIDR</text>
    <text x="100" y="21" class="header">Subnet Mask</text>
    <text x="240" y="21" class="header">Total Addresses</text>
    <text x="380" y="21" class="header">Usable Hosts</text>
    <text x="530" y="21" class="header">Typical Use Case</text>

    <!-- Rows -->
    <g transform="translate(0, 34)">
      <rect width="680" height="32" fill="#ffffff"/>
      <text x="20" y="21" class="row-bold" fill="#2563eb">/8</text>
      <text x="100" y="21" class="row-txt">255.0.0.0</text>
      <text x="240" y="21" class="row-txt">16,777,216</text>
      <text x="380" y="21" class="row-txt">16,777,214</text>
      <text x="530" y="21" class="row-txt">Large Enterprise / ISP (Class A)</text>
    </g>

    <g transform="translate(0, 68)">
      <rect width="680" height="32" fill="#f8fafc"/>
      <text x="20" y="21" class="row-bold" fill="#2563eb">/16</text>
      <text x="100" y="21" class="row-txt">255.255.0.0</text>
      <text x="240" y="21" class="row-txt">65,536</text>
      <text x="380" y="21" class="row-txt">65,534</text>
      <text x="530" y="21" class="row-txt">Medium Enterprise (Class B)</text>
    </g>

    <g transform="translate(0, 102)">
      <rect width="680" height="32" fill="#ffffff"/>
      <text x="20" y="21" class="row-bold" fill="#2563eb">/24</text>
      <text x="100" y="21" class="row-txt">255.255.255.0</text>
      <text x="240" y="21" class="row-txt">256</text>
      <text x="380" y="21" class="row-txt">254</text>
      <text x="530" y="21" class="row-txt">Standard LAN / Office (Class C)</text>
    </g>

    <g transform="translate(0, 136)">
      <rect width="680" height="32" fill="#f8fafc"/>
      <text x="20" y="21" class="row-bold" fill="#2563eb">/26</text>
      <text x="100" y="21" class="row-txt">255.255.255.192</text>
      <text x="240" y="21" class="row-txt">64</text>
      <text x="380" y="21" class="row-txt">62</text>
      <text x="530" y="21" class="row-txt">Department Subnet</text>
    </g>

    <g transform="translate(0, 170)">
      <rect width="680" height="32" fill="#ffffff"/>
      <text x="20" y="21" class="row-bold" fill="#2563eb">/28</text>
      <text x="100" y="21" class="row-txt">255.255.255.240</text>
      <text x="240" y="21" class="row-txt">16</text>
      <text x="380" y="21" class="row-txt">14</text>
      <text x="530" y="21" class="row-txt">Small Workgroup / DMZ</text>
    </g>

    <g transform="translate(0, 204)">
      <rect width="680" height="32" fill="#f8fafc"/>
      <text x="20" y="21" class="row-bold" fill="#2563eb">/30</text>
      <text x="100" y="21" class="row-txt">255.255.255.252</text>
      <text x="240" y="21" class="row-txt">4</text>
      <text x="380" y="21" class="row-txt">2</text>
      <text x="530" y="21" class="row-txt">Point-to-Point Router Link</text>
    </g>

    <g transform="translate(0, 238)">
      <rect width="680" height="32" rx="0 0 6 6" fill="#ffffff"/>
      <text x="20" y="21" class="row-bold" fill="#2563eb">/32</text>
      <text x="100" y="21" class="row-txt">255.255.255.255</text>
      <text x="240" y="21" class="row-txt">1</text>
      <text x="380" y="21" class="row-txt">1 (Single Host)</text>
      <text x="530" y="21" class="row-txt">Loopback / Host Route</text>
    </g>
  </g>
</svg>`;

// 4. ipv6-header-format.svg
svgs['ipv6-header-format.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  <defs>
    <style>
      text { font-family: 'Segoe UI', Arial, sans-serif; }
      .title { font-size: 20px; font-weight: bold; fill: #1e293b; }
      .sub { font-size: 13px; fill: #475569; }
      .field-name { font-size: 13px; font-weight: bold; fill: #ffffff; text-anchor: middle; }
      .field-bits { font-size: 10px; fill: rgba(255,255,255,0.85); text-anchor: middle; }
    </style>
    <filter id="shadow" x="-2%" y="-2%" width="104%" height="104%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.1"/>
    </filter>
  </defs>

  <rect width="800" height="500" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="400" y="35" text-anchor="middle" class="title">IPv6 Base Header Format (Fixed 40 Bytes)</text>
  <text x="400" y="55" text-anchor="middle" class="sub">Simplified, fixed-size header for fast router processing (Streamlined compared to IPv4)</text>

  <!-- Bit ruler -->
  <g transform="translate(60, 80)">
    <text x="0" y="-8" font-size="11" fill="#64748b">Bit 0</text>
    <text x="85" y="-8" font-size="11" fill="#64748b">4</text>
    <text x="255" y="-8" font-size="11" fill="#64748b">12</text>
    <text x="680" y="-8" text-anchor="end" font-size="11" fill="#64748b">31</text>
    
    <!-- Row 1: Version, Traffic Class, Flow Label -->
    <rect x="0" y="0" width="85" height="55" rx="4" fill="#2563eb" stroke="#ffffff" stroke-width="2"/>
    <text x="42" y="27" class="field-name">Version</text>
    <text x="42" y="44" class="field-bits">4 bits</text>

    <rect x="85" y="0" width="170" height="55" rx="4" fill="#0284c7" stroke="#ffffff" stroke-width="2"/>
    <text x="170" y="27" class="field-name">Traffic Class</text>
    <text x="170" y="44" class="field-bits">8 bits (QoS / DiffServ)</text>

    <rect x="255" y="0" width="425" height="55" rx="4" fill="#0d9488" stroke="#ffffff" stroke-width="2"/>
    <text x="467" y="27" class="field-name">Flow Label</text>
    <text x="467" y="44" class="field-bits">20 bits (Real-time flow tracking)</text>

    <!-- Row 2: Payload Length, Next Header, Hop Limit -->
    <rect x="0" y="60" width="340" height="55" rx="4" fill="#16a34a" stroke="#ffffff" stroke-width="2"/>
    <text x="170" y="87" class="field-name">Payload Length</text>
    <text x="170" y="104" class="field-bits">16 bits (Data length after 40-byte header)</text>

    <rect x="340" y="60" width="170" height="55" rx="4" fill="#d97706" stroke="#ffffff" stroke-width="2"/>
    <text x="425" y="87" class="field-name">Next Header</text>
    <text x="425" y="104" class="field-bits">8 bits (Protocol or Extension)</text>

    <rect x="510" y="60" width="170" height="55" rx="4" fill="#ea580c" stroke="#ffffff" stroke-width="2"/>
    <text x="595" y="87" class="field-name">Hop Limit</text>
    <text x="595" y="104" class="field-bits">8 bits (Replaces IPv4 TTL)</text>

    <!-- Row 3: Source IP Address -->
    <rect x="0" y="120" width="680" height="65" rx="4" fill="#4f46e5" stroke="#ffffff" stroke-width="2"/>
    <text x="340" y="150" class="field-name" font-size="15">Source IP Address</text>
    <text x="340" y="170" class="field-bits" font-size="12">128 bits (16 octets)</text>

    <!-- Row 4: Destination IP Address -->
    <rect x="0" y="190" width="680" height="65" rx="4" fill="#7c3aed" stroke="#ffffff" stroke-width="2"/>
    <text x="340" y="220" class="field-name" font-size="15">Destination IP Address</text>
    <text x="340" y="240" class="field-bits" font-size="12">128 bits (16 octets)</text>
  </g>

  <!-- Key Improvements Box -->
  <g transform="translate(60, 360)">
    <rect width="680" height="95" rx="8" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.2" filter="url(#shadow)"/>
    <text x="20" y="24" font-size="13" font-weight="bold" fill="#1e40af">Key IPv6 Header Optimizations Over IPv4:</text>
    <text x="20" y="46" font-size="11.5" fill="#1e3a8a">• Fixed 40-byte base size enables hardware pipelined switching (no variable Options field in base header).</text>
    <text x="20" y="66" font-size="11.5" fill="#1e3a8a">• No Checksum field: Avoids recomputing checksum at every router hop (relies on L2 CRC and L4 TCP/UDP).</text>
    <text x="20" y="86" font-size="11.5" fill="#1e3a8a">• Extension Headers daisy-chained via 'Next Header' pointer for Routing, Fragmentation, and ESP Security.</text>
  </g>
</svg>`;

// 5. ipv6-address-format.svg
svgs['ipv6-address-format.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  <defs>
    <style>
      text { font-family: 'Segoe UI', Arial, sans-serif; }
      .title { font-size: 20px; font-weight: bold; fill: #1e293b; }
      .sub { font-size: 13px; fill: #475569; }
      .mono { font-family: 'Consolas', 'Courier New', monospace; font-size: 13px; font-weight: bold; }
    </style>
    <filter id="shadow" x="-2%" y="-2%" width="104%" height="104%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.08"/>
    </filter>
  </defs>

  <rect width="800" height="500" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="400" y="38" text-anchor="middle" class="title">IPv6 Address Architecture &amp; Compression Rules</text>
  <text x="400" y="58" text-anchor="middle" class="sub">128 Bits = 8 Groups (Hextets) of 4 Hexadecimal Digits separated by Colons</text>

  <!-- 8 Groups visualization -->
  <g transform="translate(60, 90)">
    <text x="0" y="15" font-size="13" font-weight="bold" fill="#1e293b">Structure of 128-bit Address:</text>
    <g transform="translate(0, 30)">
      <!-- 8 boxes -->
      <rect x="0" y="0" width="75" height="40" rx="4" fill="#2563eb"/>
      <text x="37" y="25" text-anchor="middle" fill="#fff" class="mono">2001</text>
      <text x="79" y="25" font-size="16" fill="#64748b">:</text>

      <rect x="85" y="0" width="75" height="40" rx="4" fill="#2563eb"/>
      <text x="122" y="25" text-anchor="middle" fill="#fff" class="mono">0db8</text>
      <text x="164" y="25" font-size="16" fill="#64748b">:</text>

      <rect x="170" y="0" width="75" height="40" rx="4" fill="#2563eb"/>
      <text x="207" y="25" text-anchor="middle" fill="#fff" class="mono">0000</text>
      <text x="249" y="25" font-size="16" fill="#64748b">:</text>

      <rect x="255" y="0" width="75" height="40" rx="4" fill="#2563eb"/>
      <text x="292" y="25" text-anchor="middle" fill="#fff" class="mono">0000</text>
      <text x="334" y="25" font-size="16" fill="#64748b">:</text>

      <rect x="340" y="0" width="75" height="40" rx="4" fill="#059669"/>
      <text x="377" y="25" text-anchor="middle" fill="#fff" class="mono">0000</text>
      <text x="419" y="25" font-size="16" fill="#64748b">:</text>

      <rect x="425" y="0" width="75" height="40" rx="4" fill="#059669"/>
      <text x="462" y="25" text-anchor="middle" fill="#fff" class="mono">0000</text>
      <text x="504" y="25" font-size="16" fill="#64748b">:</text>

      <rect x="510" y="0" width="75" height="40" rx="4" fill="#059669"/>
      <text x="547" y="25" text-anchor="middle" fill="#fff" class="mono">0370</text>
      <text x="589" y="25" font-size="16" fill="#64748b">:</text>

      <rect x="595" y="0" width="85" height="40" rx="4" fill="#059669"/>
      <text x="637" y="25" text-anchor="middle" fill="#fff" class="mono">7334</text>
    </g>

    <!-- Subnet prefix vs Interface ID -->
    <rect x="0" y="80" width="330" height="24" rx="3" fill="#dbeafe"/>
    <text x="165" y="96" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">Routing Prefix + Subnet ID (64 bits)</text>

    <rect x="340" y="80" width="340" height="24" rx="3" fill="#d1fae5"/>
    <text x="510" y="96" text-anchor="middle" font-size="11" font-weight="bold" fill="#065f46">Interface Identifier (Host) (64 bits)</text>
  </g>

  <!-- Compression Rules -->
  <g transform="translate(60, 230)">
    <!-- Rule 1 -->
    <rect width="680" height="85" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2" filter="url(#shadow)"/>
    <text x="20" y="25" font-size="13" font-weight="bold" fill="#2563eb">Rule 1: Omit Leading Zeros</text>
    <text x="20" y="46" font-size="12" fill="#475569">In any 16-bit block, leading zeros can be omitted (e.g. 0db8 → db8, 0001 → 1, 0000 → 0).</text>
    <text x="20" y="68" class="mono" fill="#0f172a">2001:0db8:0000:0000:0000:0000:0370:7334  ➔  2001:db8:0:0:0:0:370:7334</text>

    <!-- Rule 2 -->
    <g transform="translate(0, 100)">
      <rect width="680" height="95" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2" filter="url(#shadow)"/>
      <text x="20" y="25" font-size="13" font-weight="bold" fill="#059669">Rule 2: Double Colon (::) Compression</text>
      <text x="20" y="46" font-size="12" fill="#475569">A single contiguous sequence of all-zero blocks can be replaced by "::". Allowed ONLY ONCE per address.</text>
      <text x="20" y="68" class="mono" fill="#047857">2001:db8:0:0:0:0:370:7334  ➔  2001:db8::370:7334</text>
      <text x="20" y="86" font-size="11" fill="#dc2626">⚠ Note: :: can only appear ONCE to avoid ambiguity in reconstructing the number of omitted zeros.</text>
    </g>
  </g>

  <!-- Special Addresses Footer -->
  <text x="400" y="470" text-anchor="middle" font-size="11.5" fill="#475569">Loopback: ::1 | Unspecified: :: | Link-Local: fe80::/10 | Global Unicast: 2000::/3 | Multicast: ff00::/8</text>
</svg>`;

// 6. ipv4-vs-ipv6-comparison.svg
svgs['ipv4-vs-ipv6-comparison.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  <defs>
    <style>
      text { font-family: 'Segoe UI', Arial, sans-serif; }
      .title { font-size: 20px; font-weight: bold; fill: #1e293b; }
      .sub { font-size: 13px; fill: #475569; }
      .col-h { font-size: 14px; font-weight: bold; fill: #ffffff; text-anchor: middle; }
      .prop { font-size: 11.5px; font-weight: bold; fill: #1e293b; }
      .v4-val { font-size: 11px; fill: #1e40af; }
      .v6-val { font-size: 11px; fill: #065f46; }
    </style>
    <filter id="shadow" x="-2%" y="-2%" width="104%" height="104%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.08"/>
    </filter>
  </defs>

  <rect width="800" height="500" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="400" y="35" text-anchor="middle" class="title">Comprehensive Comparison: IPv4 vs. IPv6</text>
  <text x="400" y="55" text-anchor="middle" class="sub">Key Architectural Differences, Capabilities, and Design Evolutions</text>

  <!-- Table Container -->
  <g transform="translate(40, 75)" filter="url(#shadow)">
    <!-- Header -->
    <rect x="0" y="0" width="180" height="36" rx="6 0 0 0" fill="#334155"/>
    <text x="90" y="23" class="col-h">Feature / Property</text>

    <rect x="180" y="0" width="270" height="36" fill="#2563eb"/>
    <text x="315" y="23" class="col-h">IPv4 (RFC 791)</text>

    <rect x="450" y="0" width="270" height="36" rx="0 6 0 0" fill="#059669"/>
    <text x="585" y="23" class="col-h">IPv6 (RFC 8200)</text>

    <!-- Rows -->
    <!-- Row 1: Address Size -->
    <g transform="translate(0, 36)">
      <rect x="0" y="0" width="720" height="36" fill="#ffffff"/>
      <text x="15" y="22" class="prop">Address Length</text>
      <text x="195" y="22" class="v4-val">32 bits (4 bytes)</text>
      <text x="465" y="22" class="v6-val">128 bits (16 bytes)</text>
    </g>

    <!-- Row 2: Address Space -->
    <g transform="translate(0, 72)">
      <rect x="0" y="0" width="720" height="36" fill="#f8fafc"/>
      <text x="15" y="22" class="prop">Total Address Space</text>
      <text x="195" y="22" class="v4-val">~4.29 × 10⁹ (~4.3 Billion)</text>
      <text x="465" y="22" class="v6-val">~3.4 × 10³⁸ (Undecillion)</text>
    </g>

    <!-- Row 3: Notation -->
    <g transform="translate(0, 108)">
      <rect x="0" y="0" width="720" height="36" fill="#ffffff"/>
      <text x="15" y="22" class="prop">Notation Format</text>
      <text x="195" y="22" class="v4-val">Dotted Decimal (192.168.1.1)</text>
      <text x="465" y="22" class="v6-val">Hexadecimal with Colons (2001:db8::1)</text>
    </g>

    <!-- Row 4: Header Size -->
    <g transform="translate(0, 144)">
      <rect x="0" y="0" width="720" height="36" fill="#f8fafc"/>
      <text x="15" y="22" class="prop">Header Size</text>
      <text x="195" y="22" class="v4-val">Variable (20 to 60 bytes)</text>
      <text x="465" y="22" class="v6-val">Fixed 40 bytes (Extension headers optional)</text>
    </g>

    <!-- Row 5: Checksum -->
    <g transform="translate(0, 180)">
      <rect x="0" y="0" width="720" height="36" fill="#ffffff"/>
      <text x="15" y="22" class="prop">Header Checksum</text>
      <text x="195" y="22" class="v4-val">Yes (Recomputed at every hop)</text>
      <text x="465" y="22" class="v6-val">None (Streamlines forwarding)</text>
    </g>

    <!-- Row 6: Configuration -->
    <g transform="translate(0, 216)">
      <rect x="0" y="0" width="720" height="36" fill="#f8fafc"/>
      <text x="15" y="22" class="prop">Auto-configuration</text>
      <text x="195" y="22" class="v4-val">Manual or DHCP</text>
      <text x="465" y="22" class="v6-val">SLAAC (Stateless) &amp; DHCPv6</text>
    </g>

    <!-- Row 7: Security -->
    <g transform="translate(0, 252)">
      <rect x="0" y="0" width="720" height="36" fill="#ffffff"/>
      <text x="15" y="22" class="prop">IPsec Security</text>
      <text x="195" y="22" class="v4-val">Optional add-on</text>
      <text x="465" y="22" class="v6-val">Built-in architectural support</text>
    </g>

    <!-- Row 8: Addressing Types -->
    <g transform="translate(0, 288)">
      <rect x="0" y="0" width="720" height="36" fill="#f8fafc"/>
      <text x="15" y="22" class="prop">Addressing Modes</text>
      <text x="195" y="22" class="v4-val">Unicast, Multicast, Broadcast</text>
      <text x="465" y="22" class="v6-val">Unicast, Multicast, Anycast (No Broadcast)</text>
    </g>

    <!-- Row 9: Fragmentation -->
    <g transform="translate(0, 324)">
      <rect x="0" y="0" width="720" height="36" rx="0 0 6 6" fill="#ffffff"/>
      <text x="15" y="22" class="prop">Fragmentation</text>
      <text x="195" y="22" class="v4-val">Performed by Source &amp; Routers</text>
      <text x="465" y="22" class="v6-val">Performed ONLY by Sending Host</text>
    </g>
  </g>

  <!-- Dual Stack transition note -->
  <text x="400" y="468" text-anchor="middle" font-size="12" fill="#475569">Coexistence mechanisms: Dual-Stack (run both), Tunneling (6in4), and Translation (NAT64).</text>
</svg>`;

// 7. private-ip-ranges.svg
svgs['private-ip-ranges.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  <defs>
    <style>
      text { font-family: 'Segoe UI', Arial, sans-serif; }
      .title { font-size: 20px; font-weight: bold; fill: #1e293b; }
      .sub { font-size: 13px; fill: #475569; }
      .card-title { font-size: 14px; font-weight: bold; fill: #1e293b; }
      .mono { font-family: 'Consolas', monospace; font-size: 13px; font-weight: bold; }
    </style>
    <filter id="shadow" x="-2%" y="-2%" width="104%" height="104%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.08"/>
    </filter>
  </defs>

  <rect width="800" height="500" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="400" y="35" text-anchor="middle" class="title">Private IP Address Ranges (RFC 1918)</text>
  <text x="400" y="55" text-anchor="middle" class="sub">Non-routable on public internet; translated via NAT (Network Address Translation)</text>

  <!-- Left Side: 3 Private Classes -->
  <g transform="translate(50, 85)">
    <!-- Class A -->
    <g transform="translate(0, 0)" filter="url(#shadow)">
      <rect width="360" height="95" rx="8" fill="#ffffff" stroke="#2563eb" stroke-width="1.5"/>
      <rect width="360" height="28" rx="8" fill="#eff6ff"/>
      <text x="15" y="19" class="card-title" fill="#1d4ed8">Class A Private Range (10.0.0.0/8)</text>
      <text x="15" y="48" class="mono" fill="#2563eb">10.0.0.0 — 10.255.255.255</text>
      <text x="15" y="68" font-size="11.5" fill="#475569">Total: 16,777,216 addresses (1 block of 24 host bits)</text>
      <text x="15" y="85" font-size="11" fill="#64748b">Use: Large enterprises, cloud VPCs (AWS/GCP), big campuses</text>
    </g>

    <!-- Class B -->
    <g transform="translate(0, 110)" filter="url(#shadow)">
      <rect width="360" height="95" rx="8" fill="#ffffff" stroke="#059669" stroke-width="1.5"/>
      <rect width="360" height="28" rx="8" fill="#ecfdf5"/>
      <text x="15" y="19" class="card-title" fill="#047857">Class B Private Range (172.16.0.0/12)</text>
      <text x="15" y="48" class="mono" fill="#059669">172.16.0.0 — 172.31.255.255</text>
      <text x="15" y="68" font-size="11.5" fill="#475569">Total: 1,048,576 addresses (16 contiguous /16 blocks)</text>
      <text x="15" y="85" font-size="11" fill="#64748b">Use: Medium to large organizations, university departments</text>
    </g>

    <!-- Class C -->
    <g transform="translate(0, 220)" filter="url(#shadow)">
      <rect width="360" height="95" rx="8" fill="#ffffff" stroke="#ea580c" stroke-width="1.5"/>
      <rect width="360" height="28" rx="8" fill="#fff7ed"/>
      <text x="15" y="19" class="card-title" fill="#c2410c">Class C Private Range (192.168.0.0/16)</text>
      <text x="15" y="48" class="mono" fill="#ea580c">192.168.0.0 — 192.168.255.255</text>
      <text x="15" y="68" font-size="11.5" fill="#475569">Total: 65,536 addresses (256 contiguous /24 blocks)</text>
      <text x="15" y="85" font-size="11" fill="#64748b">Use: Home Wi-Fi routers, small offices, default subnets</text>
    </g>
  </g>

  <!-- Right Side: NAT Gateway Interaction Visual -->
  <g transform="translate(450, 95)" filter="url(#shadow)">
    <!-- Private Cloud -->
    <rect width="300" height="305" rx="10" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>
    <rect width="300" height="35" rx="10" fill="#f1f5f9"/>
    <text x="150" y="23" text-anchor="middle" font-size="13" font-weight="bold" fill="#334155">Private LAN + NAT Gateway</text>

    <!-- Internal Host -->
    <rect x="25" y="55" width="250" height="40" rx="6" fill="#eff6ff" stroke="#3b82f6"/>
    <text x="35" y="75" font-size="11" font-weight="bold" fill="#1e40af">Host: 192.168.1.100</text>
    <text x="35" y="89" font-size="10" fill="#3b82f6">Src Port: 54321</text>

    <!-- NAT Router -->
    <path d="M 150 95 L 150 125" stroke="#3b82f6" stroke-width="2" marker-end="url(#arr)"/>
    <rect x="25" y="125" width="250" height="60" rx="6" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
    <text x="150" y="145" text-anchor="middle" font-size="12" font-weight="bold" fill="#92400e">NAT Router / Firewall</text>
    <text x="150" y="162" text-anchor="middle" font-size="10.5" fill="#b45309">Translates 192.168.1.100:54321</text>
    <text x="150" y="176" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#b45309">➔ Public IP 203.0.113.5:10045</text>

    <!-- Public Internet Cloud -->
    <path d="M 150 185 L 150 215" stroke="#059669" stroke-width="2"/>
    <rect x="25" y="215" width="250" height="65" rx="6" fill="#ecfdf5" stroke="#10b981"/>
    <text x="150" y="238" text-anchor="middle" font-size="12" font-weight="bold" fill="#047857">Public Internet</text>
    <text x="150" y="255" text-anchor="middle" font-size="10.5" fill="#059669">Web Server: 142.250.190.46</text>
    <text x="150" y="269" text-anchor="middle" font-size="10" fill="#047857">Sees packets from Public IP only</text>
  </g>

  <!-- Note -->
  <text x="400" y="450" text-anchor="middle" font-size="12" fill="#475569">Loopback (127.0.0.0/8) and APIPA (169.254.0.0/16) are special reserved IPv4 ranges.</text>
</svg>`;

for (const [filename, content] of Object.entries(svgs)) {
  fs.writeFileSync(path.join(dir, filename), content, 'utf8');
  console.log('Saved:', filename);
}
console.log('Topic 1 SVG generation complete!');

