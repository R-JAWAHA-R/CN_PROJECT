// scratch/svg_builders_topic3_part2.js
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../assets/images/topic3');

function writeSvg(filename, svgContent) {
  fs.writeFileSync(path.join(outDir, filename), svgContent.trim(), 'utf8');
  console.log(`Created topic3/${filename}`);
}

// 6. MAC Sublayer Responsibilities
writeSvg('mac-sublayer-responsibilities.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 480" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <rect x="30" y="20" width="840" height="54" rx="10" fill="#0F172A" />
  <text x="50" y="53" fill="#F8FAFC" font-size="18" font-weight="700">Four Key Responsibilities of the MAC Sublayer</text>

  <g transform="translate(50, 95)">
    <!-- 1. Frame Assembly & Delimiting -->
    <rect x="0" y="0" width="380" height="165" rx="10" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5" />
    <rect x="0" y="0" width="380" height="34" rx="10" fill="#ECFDF5" />
    <text x="20" y="22" fill="#065F46" font-size="13" font-weight="bold">1. Frame Assembly &amp; Delimitation</text>
    <text x="20" y="58" fill="#334155" font-size="11.5">&bull; Appends 7-byte Preamble and 1-byte SFD (10101011) for bit clock synchronization.</text>
    <text x="20" y="90" fill="#334155" font-size="11.5">&bull; Pads data payloads under 46 bytes to enforce minimum frame length (64 bytes for collision detection).</text>
    <text x="20" y="122" fill="#059669" font-size="11" font-weight="bold">&bull; IEEE 802.3 Frame Formatting</text>

    <!-- 2. Medium Contention & Access -->
    <rect x="420" y="0" width="380" height="165" rx="10" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5" />
    <rect x="420" y="0" width="380" height="34" rx="10" fill="#EFF6FF" />
    <text x="440" y="22" fill="#1E40AF" font-size="13" font-weight="bold">2. Medium Allocation &amp; Collision Handling</text>
    <text x="440" y="58" fill="#334155" font-size="11.5">&bull; Executes carrier sensing algorithms (1-persistent, non-persistent, p-persistent).</text>
    <text x="440" y="90" fill="#334155" font-size="11.5">&bull; Detects collisions during transmission and aborts with a 32-bit Jamming signal.</text>
    <text x="440" y="122" fill="#2563EB" font-size="11" font-weight="bold">&bull; Triggers Binary Exponential Backoff</text>

    <!-- 3. Physical Addressing (MAC) -->
    <rect x="0" y="185" width="380" height="165" rx="10" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5" />
    <rect x="0" y="185" width="380" height="34" rx="10" fill="#FEF3C7" />
    <text x="20" y="207" fill="#92400E" font-size="13" font-weight="bold">3. Physical (MAC) Addressing</text>
    <text x="20" y="243" fill="#334155" font-size="11.5">&bull; Encapsulates 6-byte Source MAC and Destination MAC addresses into headers.</text>
    <text x="20" y="275" fill="#334155" font-size="11.5">&bull; Implements hardware address filtering on NICs (Unicast match, Broadcast FF:FF:FF:FF:FF:FF, Multicast).</text>
    <text x="20" y="307" fill="#D97706" font-size="11" font-weight="bold">&bull; Promiscuous mode support for packet capture</text>

    <!-- 4. Error Checking (CRC-32) -->
    <rect x="420" y="185" width="380" height="165" rx="10" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5" />
    <rect x="420" y="185" width="380" height="34" rx="10" fill="#FEE2E2" />
    <text x="440" y="207" fill="#991B1B" font-size="13" font-weight="bold">4. Frame Integrity &amp; CRC-32 Verification</text>
    <text x="440" y="243" fill="#334155" font-size="11.5">&bull; Calculates 32-bit Frame Check Sequence (FCS) using CRC-32 polynomial over all fields.</text>
    <text x="440" y="275" fill="#334155" font-size="11.5">&bull; Receiver recomputes FCS on ingress; silently drops damaged frames with zero retransmission overhead at MAC layer.</text>
    <text x="440" y="307" fill="#DC2626" font-size="11" font-weight="bold">&bull; Protects higher layers from corrupt bits</text>
  </g>
</svg>
`);

// 7. Channel Allocation Problem Overview
writeSvg('channel-allocation-problem.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 480" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <rect x="30" y="20" width="840" height="54" rx="10" fill="#0F172A" />
  <text x="50" y="53" fill="#F8FAFC" font-size="18" font-weight="700">The Channel Allocation Problem in Broadcast Networks</text>

  <g transform="translate(50, 95)">
    <!-- Root -->
    <rect x="250" y="0" width="300" height="42" rx="8" fill="#1E293B" />
    <text x="400" y="26" fill="#FFF" font-size="13" font-weight="bold" text-anchor="middle">Channel Allocation Strategies</text>

    <!-- Fork lines -->
    <path d="M 400 42 L 400 65 L 180 65 L 180 90" fill="none" stroke="#64748B" stroke-width="2" />
    <path d="M 400 65 L 620 65 L 620 90" fill="none" stroke="#64748B" stroke-width="2" />

    <!-- Static Allocation Branch -->
    <g transform="translate(30, 90)">
      <rect width="300" height="260" rx="10" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5" />
      <rect width="300" height="36" rx="10" fill="#EFF6FF" />
      <text x="150" y="23" fill="#1E40AF" font-size="13" font-weight="bold" text-anchor="middle">Static Channel Allocation</text>

      <g transform="translate(15, 50)">
        <text x="0" y="15" fill="#0F172A" font-size="11" font-weight="bold">Core Mechanism:</text>
        <text x="0" y="32" fill="#64748B" font-size="10.5">Fixed partitioning of total bandwidth C among N users beforehand.</text>

        <text x="0" y="65" fill="#0F172A" font-size="11" font-weight="bold">Key Protocols:</text>
        <text x="0" y="82" fill="#1E40AF" font-size="10.5">&bull; FDMA (Frequency Division Multiple Access)</text>
        <text x="0" y="100" fill="#1E40AF" font-size="10.5">&bull; TDMA (Time Division Multiple Access)</text>
        <text x="0" y="118" fill="#1E40AF" font-size="10.5">&bull; CDMA (Code Division Multiple Access)</text>

        <text x="0" y="145" fill="#059669" font-size="11" font-weight="bold">Advantage: Zero Contention &bull; Deterministic</text>
        <text x="0" y="170" fill="#DC2626" font-size="11" font-weight="bold">Fatal Flaw: Wastes Bandwidth on Bursty Data</text>
        <text x="0" y="188" fill="#64748B" font-size="9.5">Idle stations hold empty frequency/time slots.</text>
      </g>
    </g>

    <!-- Dynamic Allocation Branch -->
    <g transform="translate(470, 90)">
      <rect width="300" height="260" rx="10" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5" />
      <rect width="300" height="36" rx="10" fill="#ECFDF5" />
      <text x="150" y="23" fill="#065F46" font-size="13" font-weight="bold" text-anchor="middle">Dynamic Channel Allocation</text>

      <g transform="translate(15, 50)">
        <text x="0" y="15" fill="#0F172A" font-size="11" font-weight="bold">Core Mechanism:</text>
        <text x="0" y="32" fill="#64748B" font-size="10.5">Channels allocated dynamically on-demand only when a station has data ready.</text>

        <text x="0" y="65" fill="#0F172A" font-size="11" font-weight="bold">Key Protocol Classes:</text>
        <text x="0" y="82" fill="#065F46" font-size="10.5">&bull; Random Access (ALOHA, CSMA, CSMA/CD)</text>
        <text x="0" y="100" fill="#065F46" font-size="10.5">&bull; Controlled Access (Polling, Reservation, Token)</text>
        <text x="0" y="118" fill="#065F46" font-size="10.5">&bull; Channelization</text>

        <text x="0" y="145" fill="#059669" font-size="11" font-weight="bold">Advantage: 100% Efficiency on Bursts</text>
        <text x="0" y="170" fill="#D97706" font-size="11" font-weight="bold">Challenge: Collisions &amp; Coordination</text>
        <text x="0" y="188" fill="#64748B" font-size="9.5">Requires MAC arbitration algorithms.</text>
      </g>
    </g>
  </g>
</svg>
`);

// 8. MAC Frame Delimiting & Preamble
writeSvg('mac-frame-delimiting.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 480" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <rect x="30" y="20" width="840" height="54" rx="10" fill="#0F172A" />
  <text x="50" y="53" fill="#F8FAFC" font-size="18" font-weight="700">Standard IEEE 802.3 MAC Frame Structure &amp; Field Delimiters</text>

  <g transform="translate(45, 95)">
    <!-- Frame Layout -->
    <rect x="0" y="20" width="810" height="80" rx="8" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2" />

    <!-- Preamble -->
    <rect x="0" y="20" width="90" height="80" rx="8" fill="#F1F5F9" stroke="#94A3B8" />
    <text x="45" y="55" fill="#0F172A" font-size="11" font-weight="bold" text-anchor="middle">Preamble</text>
    <text x="45" y="75" fill="#64748B" font-size="10" text-anchor="middle">7 Bytes</text>

    <!-- SFD -->
    <rect x="90" y="20" width="60" height="80" fill="#FEF3C7" stroke="#F59E0B" />
    <text x="120" y="55" fill="#92400E" font-size="11" font-weight="bold" text-anchor="middle">SFD</text>
    <text x="120" y="75" fill="#D97706" font-size="10" text-anchor="middle">1 Byte</text>

    <!-- Dest MAC -->
    <rect x="150" y="20" width="110" height="80" fill="#EFF6FF" stroke="#3B82F6" />
    <text x="205" y="55" fill="#1E40AF" font-size="11" font-weight="bold" text-anchor="middle">Destination MAC</text>
    <text x="205" y="75" fill="#2563EB" font-size="10" text-anchor="middle">6 Bytes</text>

    <!-- Source MAC -->
    <rect x="260" y="20" width="110" height="80" fill="#EFF6FF" stroke="#3B82F6" />
    <text x="315" y="55" fill="#1E40AF" font-size="11" font-weight="bold" text-anchor="middle">Source MAC</text>
    <text x="315" y="75" fill="#2563EB" font-size="10" text-anchor="middle">6 Bytes</text>

    <!-- Type / Length -->
    <rect x="370" y="20" width="80" height="80" fill="#F5F3FF" stroke="#8B5CF6" />
    <text x="410" y="55" fill="#6D28D9" font-size="11" font-weight="bold" text-anchor="middle">Length/Type</text>
    <text x="410" y="75" fill="#7C3AED" font-size="10" text-anchor="middle">2 Bytes</text>

    <!-- Data & Padding -->
    <rect x="450" y="20" width="260" height="80" fill="#ECFDF5" stroke="#10B981" />
    <text x="580" y="55" fill="#065F46" font-size="12" font-weight="bold" text-anchor="middle">Data Payload + Padding</text>
    <text x="580" y="75" fill="#059669" font-size="10" text-anchor="middle">46 to 1500 Bytes (MTU)</text>

    <!-- FCS (CRC-32) -->
    <rect x="710" y="20" width="100" height="80" rx="8" fill="#FEE2E2" stroke="#EF4444" />
    <text x="760" y="55" fill="#991B1B" font-size="11" font-weight="bold" text-anchor="middle">FCS (CRC)</text>
    <text x="760" y="75" fill="#DC2626" font-size="10" text-anchor="middle">4 Bytes</text>

    <!-- Annotations Below -->
    <g transform="translate(10, 130)">
      <rect width="790" height="200" rx="10" fill="#F8FAFC" stroke="#E2E8F0" />
      <text x="20" y="30" fill="#0F172A" font-size="12" font-weight="bold">Field Analysis &amp; Sizing Constraints:</text>
      <text x="20" y="55" fill="#475569" font-size="11">&bull; <tspan font-weight="bold" fill="#0F172A">Preamble + SFD (8 Bytes):</tspan> Alternating 10101010 pattern with SFD ending in 10101011 to establish receiver bit lock.</text>
      <text x="20" y="80" fill="#475569" font-size="11">&bull; <tspan font-weight="bold" fill="#1E40AF">Hardware MAC Addresses (6 Bytes each):</tspan> 48-bit globally unique identifier assigned by IEEE OUI vendor registration.</text>
      <text x="20" y="105" fill="#475569" font-size="11">&bull; <tspan font-weight="bold" fill="#7C3AED">EtherType / Length (2 Bytes):</tspan> Value &ge; 0x0600 indicates protocol (e.g. 0x0800 = IPv4, 0x86DD = IPv6, 0x0806 = ARP).</text>
      <text x="20" y="130" fill="#475569" font-size="11">&bull; <tspan font-weight="bold" fill="#059669">Minimum Frame Size (64 Bytes):</tspan> Header (14B) + Data (min 46B) + FCS (4B) = 64 Bytes. Guarantees collision detection across 2.5 km.</text>
      <text x="20" y="155" fill="#475569" font-size="11">&bull; <tspan font-weight="bold" fill="#DC2626">FCS Trailer (4 Bytes):</tspan> Standard 32-bit polynomial CRC-32 capable of catching 100% of burst errors up to 32 bits long.</text>
    </g>
  </g>
</svg>
`);

console.log('Topic 3 part 2 generated successfully.');
