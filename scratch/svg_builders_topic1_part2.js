// scratch/svg_builders_topic1_part2.js
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../assets/images/topic1');

function writeSvg(filename, svgContent) {
  fs.writeFileSync(path.join(outDir, filename), svgContent.trim(), 'utf8');
  console.log(`Created topic1/${filename}`);
}

// 7. DLL Service Classes
writeSvg('dll-service-classes.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 520" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <rect x="30" y="20" width="840" height="54" rx="10" fill="#0F172A" />
  <text x="50" y="53" fill="#F8FAFC" font-size="18" font-weight="700">Three Service Classes Provided to the Network Layer</text>

  <g transform="translate(45, 95)">
    <!-- Class 1: Unacknowledged Connectionless -->
    <g transform="translate(0, 0)">
      <rect width="260" height="390" rx="10" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5" />
      <rect width="260" height="42" rx="10" fill="#EFF6FF" />
      <text x="130" y="26" fill="#1E40AF" font-size="13" font-weight="700" text-anchor="middle">1. Unacknowledged Connectionless</text>
      <text x="15" y="65" fill="#334155" font-size="11.5" font-weight="600">Characteristics:</text>
      <text x="15" y="85" fill="#64748B" font-size="11">&bull; No logical connection setup</text>
      <text x="15" y="103" fill="#64748B" font-size="11">&bull; Independent frames sent</text>
      <text x="15" y="121" fill="#64748B" font-size="11">&bull; No ACK or frame recovery</text>
      <text x="15" y="139" fill="#64748B" font-size="11">&bull; Lost frames are ignored</text>
      <!-- Sequence Diagram -->
      <g transform="translate(20, 160)">
        <line x1="40" y1="0" x2="40" y2="150" stroke="#94A3B8" stroke-width="2" />
        <line x1="180" y1="0" x2="180" y2="150" stroke="#94A3B8" stroke-width="2" />
        <text x="40" y="-8" fill="#0F172A" font-size="10" font-weight="bold" text-anchor="middle">Src</text>
        <text x="180" y="-8" fill="#0F172A" font-size="10" font-weight="bold" text-anchor="middle">Dst</text>
        <!-- Frame 0 -->
        <line x1="40" y1="30" x2="180" y2="50" stroke="#3B82F6" stroke-width="2" />
        <polygon points="180,50 170,44 172,55" fill="#3B82F6" />
        <text x="110" y="35" fill="#1E40AF" font-size="9" font-weight="bold" text-anchor="middle">Frame 0</text>
        <!-- Frame 1 -->
        <line x1="40" y1="80" x2="180" y2="100" stroke="#3B82F6" stroke-width="2" />
        <polygon points="180,100 170,94 172,105" fill="#3B82F6" />
        <text x="110" y="85" fill="#1E40AF" font-size="9" font-weight="bold" text-anchor="middle">Frame 1</text>
      </g>
      <rect x="15" y="335" width="230" height="40" rx="6" fill="#DBEAFE" />
      <text x="130" y="352" fill="#1E40AF" font-size="10" font-weight="bold" text-anchor="middle">Where Used: Ethernet LANs</text>
      <text x="130" y="367" fill="#64748B" font-size="9.5" text-anchor="middle">Low error rate links &amp; real-time voice</text>
    </g>

    <!-- Class 2: Acknowledged Connectionless -->
    <g transform="translate(275, 0)">
      <rect width="260" height="390" rx="10" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5" />
      <rect width="260" height="42" rx="10" fill="#ECFDF5" />
      <text x="130" y="26" fill="#065F46" font-size="13" font-weight="700" text-anchor="middle">2. Acknowledged Connectionless</text>
      <text x="15" y="65" fill="#334155" font-size="11.5" font-weight="600">Characteristics:</text>
      <text x="15" y="85" fill="#64748B" font-size="11">&bull; No logical connection setup</text>
      <text x="15" y="103" fill="#64748B" font-size="11">&bull; Each frame individually ACKed</text>
      <text x="15" y="121" fill="#64748B" font-size="11">&bull; Sender retransmits on timeout</text>
      <text x="15" y="139" fill="#64748B" font-size="11">&bull; Ideal for unreliable media</text>
      <!-- Sequence Diagram -->
      <g transform="translate(20, 160)">
        <line x1="40" y1="0" x2="40" y2="150" stroke="#94A3B8" stroke-width="2" />
        <line x1="180" y1="0" x2="180" y2="150" stroke="#94A3B8" stroke-width="2" />
        <text x="40" y="-8" fill="#0F172A" font-size="10" font-weight="bold" text-anchor="middle">Src</text>
        <text x="180" y="-8" fill="#0F172A" font-size="10" font-weight="bold" text-anchor="middle">Dst</text>
        <!-- Frame 0 -->
        <line x1="40" y1="25" x2="180" y2="45" stroke="#10B981" stroke-width="2" />
        <polygon points="180,45 170,39 172,50" fill="#10B981" />
        <text x="110" y="30" fill="#065F46" font-size="9" font-weight="bold" text-anchor="middle">Frame 0</text>
        <!-- ACK 0 -->
        <line x1="180" y1="65" x2="40" y2="85" stroke="#059669" stroke-width="2" stroke-dasharray="4 2" />
        <polygon points="40,85 50,80 48,91" fill="#059669" />
        <text x="110" y="70" fill="#059669" font-size="9" font-weight="bold" text-anchor="middle">ACK 0</text>
      </g>
      <rect x="15" y="335" width="230" height="40" rx="6" fill="#D1FAE5" />
      <text x="130" y="352" fill="#065F46" font-size="10" font-weight="bold" text-anchor="middle">Where Used: Wi-Fi (IEEE 802.11)</text>
      <text x="130" y="367" fill="#64748B" font-size="9.5" text-anchor="middle">Noisy, lossy wireless channels</text>
    </g>

    <!-- Class 3: Acknowledged Connection-Oriented -->
    <g transform="translate(550, 0)">
      <rect width="260" height="390" rx="10" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5" />
      <rect width="260" height="42" rx="10" fill="#FEF3C7" />
      <text x="130" y="26" fill="#92400E" font-size="13" font-weight="700" text-anchor="middle">3. Acknowledged Connection-Oriented</text>
      <text x="15" y="65" fill="#334155" font-size="11.5" font-weight="600">Characteristics:</text>
      <text x="15" y="85" fill="#64748B" font-size="11">&bull; Explicit Connection Setup</text>
      <text x="15" y="103" fill="#64748B" font-size="11">&bull; Numbered frames in-order</text>
      <text x="15" y="121" fill="#64748B" font-size="11">&bull; Full flow &amp; error control</text>
      <text x="15" y="139" fill="#64748B" font-size="11">&bull; Connection Release phase</text>
      <!-- Sequence Diagram -->
      <g transform="translate(20, 160)">
        <line x1="40" y1="0" x2="40" y2="150" stroke="#94A3B8" stroke-width="2" />
        <line x1="180" y1="0" x2="180" y2="150" stroke="#94A3B8" stroke-width="2" />
        <text x="40" y="-8" fill="#0F172A" font-size="10" font-weight="bold" text-anchor="middle">Src</text>
        <text x="180" y="-8" fill="#0F172A" font-size="10" font-weight="bold" text-anchor="middle">Dst</text>
        <!-- Setup -->
        <text x="110" y="20" fill="#D97706" font-size="8.5" font-weight="bold" text-anchor="middle">1. Connect Request &rarr;</text>
        <text x="110" y="45" fill="#D97706" font-size="8.5" font-weight="bold" text-anchor="middle">&larr; Connect Confirm</text>
        <!-- Data -->
        <line x1="40" y1="65" x2="180" y2="80" stroke="#F59E0B" stroke-width="2" />
        <polygon points="180,80 170,74 172,85" fill="#F59E0B" />
        <text x="110" y="70" fill="#92400E" font-size="9" font-weight="bold" text-anchor="middle">Data [Seq 0]</text>
        <!-- Disconnect -->
        <text x="110" y="115" fill="#64748B" font-size="8.5" font-weight="bold" text-anchor="middle">3. Disconnect Phase</text>
      </g>
      <rect x="15" y="335" width="230" height="40" rx="6" fill="#FEF3C7" />
      <text x="130" y="352" fill="#92400E" font-size="10" font-weight="bold" text-anchor="middle">Where Used: HDLC, LAPB</text>
      <text x="130" y="367" fill="#64748B" font-size="9.5" text-anchor="middle">Long distance leased satellite WANs</text>
    </g>
  </g>
</svg>
`);

// 8. Flow Control Models
writeSvg('flow-control-models.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 500" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <rect x="30" y="20" width="840" height="54" rx="10" fill="#0F172A" />
  <text x="50" y="53" fill="#F8FAFC" font-size="18" font-weight="700">Data Link Flow Control: Stop-and-Wait vs Sliding Window Mechanics</text>

  <g transform="translate(50, 95)">
    <!-- Left: Stop-and-Wait -->
    <rect x="0" y="0" width="380" height="370" rx="10" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5" />
    <rect x="0" y="0" width="380" height="36" rx="10" fill="#EFF6FF" />
    <text x="190" y="24" fill="#1E40AF" font-size="13" font-weight="700" text-anchor="middle">Stop-and-Wait Flow Control (Window = 1)</text>

    <!-- Sequence -->
    <g transform="translate(40, 60)">
      <line x1="50" y1="0" x2="50" y2="230" stroke="#94A3B8" stroke-width="2" />
      <line x1="250" y1="0" x2="250" y2="230" stroke="#94A3B8" stroke-width="2" />
      <text x="50" y="-8" fill="#0F172A" font-size="11" font-weight="bold" text-anchor="middle">Sender</text>
      <text x="250" y="-8" fill="#0F172A" font-size="11" font-weight="bold" text-anchor="middle">Receiver</text>

      <!-- Frame 0 -->
      <line x1="50" y1="20" x2="250" y2="60" stroke="#3B82F6" stroke-width="2.5" />
      <polygon points="250,60 238,54 240,65" fill="#3B82F6" />
      <text x="150" y="32" fill="#1E40AF" font-size="10" font-weight="bold" text-anchor="middle">Frame 0 (Transmission)</text>

      <!-- Idle Wait Time -->
      <line x1="35" y1="20" x2="35" y2="120" stroke="#EF4444" stroke-width="2" stroke-dasharray="3 3" />
      <text x="25" y="75" fill="#DC2626" font-size="9" font-weight="bold" text-anchor="end">IDLE WAIT (RTT)</text>

      <!-- ACK 0 -->
      <line x1="250" y1="80" x2="50" y2="120" stroke="#10B981" stroke-width="2" stroke-dasharray="4 2" />
      <polygon points="50,120 62,115 60,126" fill="#10B981" />
      <text x="150" y="94" fill="#065F46" font-size="10" font-weight="bold" text-anchor="middle">ACK 1 (Ready for Next)</text>

      <!-- Frame 1 -->
      <line x1="50" y1="140" x2="250" y2="180" stroke="#3B82F6" stroke-width="2.5" />
      <polygon points="250,180 238,174 240,185" fill="#3B82F6" />
      <text x="150" y="152" fill="#1E40AF" font-size="10" font-weight="bold" text-anchor="middle">Frame 1</text>
    </g>

    <rect x="20" y="305" width="340" height="50" rx="6" fill="#FFFFFF" stroke="#CBD5E1" />
    <text x="190" y="325" fill="#1E40AF" font-size="11" font-weight="bold" text-anchor="middle">Efficiency: &eta; = 1 / (1 + 2a)</text>
    <text x="190" y="342" fill="#64748B" font-size="10" text-anchor="middle">where a = T_prop / T_trans &bull; Low on high bandwidth links</text>

    <!-- Right: Sliding Window -->
    <rect x="420" y="0" width="380" height="370" rx="10" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5" />
    <rect x="420" y="0" width="380" height="36" rx="10" fill="#ECFDF5" />
    <text x="610" y="24" fill="#065F46" font-size="13" font-weight="700" text-anchor="middle">Sliding Window Flow Control (Window = N)</text>

    <!-- Sequence -->
    <g transform="translate(460, 60)">
      <line x1="50" y1="0" x2="50" y2="230" stroke="#94A3B8" stroke-width="2" />
      <line x1="250" y1="0" x2="250" y2="230" stroke="#94A3B8" stroke-width="2" />
      <text x="50" y="-8" fill="#0F172A" font-size="11" font-weight="bold" text-anchor="middle">Sender</text>
      <text x="250" y="-8" fill="#0F172A" font-size="11" font-weight="bold" text-anchor="middle">Receiver</text>

      <!-- Frame 0, 1, 2 Pipelined -->
      <line x1="50" y1="15" x2="250" y2="55" stroke="#10B981" stroke-width="2" />
      <polygon points="250,55 238,49 240,60" fill="#10B981" />
      <text x="150" y="28" fill="#065F46" font-size="9" font-weight="bold" text-anchor="middle">Frame 0</text>

      <line x1="50" y1="40" x2="250" y2="80" stroke="#10B981" stroke-width="2" />
      <polygon points="250,80 238,74 240,85" fill="#10B981" />
      <text x="150" y="53" fill="#065F46" font-size="9" font-weight="bold" text-anchor="middle">Frame 1 (Continuous Pipeline)</text>

      <line x1="50" y1="65" x2="250" y2="105" stroke="#10B981" stroke-width="2" />
      <polygon points="250,105 238,99 240,110" fill="#10B981" />
      <text x="150" y="78" fill="#065F46" font-size="9" font-weight="bold" text-anchor="middle">Frame 2</text>

      <!-- Cumulative ACK -->
      <line x1="250" y1="115" x2="50" y2="155" stroke="#059669" stroke-width="2" stroke-dasharray="4 2" />
      <polygon points="50,155 62,150 60,161" fill="#059669" />
      <text x="150" y="130" fill="#059669" font-size="9.5" font-weight="bold" text-anchor="middle">ACK 3 (Cumulative)</text>
    </g>

    <rect x="440" y="305" width="340" height="50" rx="6" fill="#FFFFFF" stroke="#CBD5E1" />
    <text x="610" y="325" fill="#065F46" font-size="11" font-weight="bold" text-anchor="middle">Efficiency: &eta; = min(1, N / (1 + 2a))</text>
    <text x="610" y="342" fill="#64748B" font-size="10" text-anchor="middle">Full 100% channel utilization when N &ge; 1 + 2a</text>
  </g>
</svg>
`);

// 9. Error Control Taxonomy
writeSvg('error-control-taxonomy.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 500" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <rect x="30" y="20" width="840" height="54" rx="10" fill="#0F172A" />
  <text x="50" y="53" fill="#F8FAFC" font-size="18" font-weight="700">Data Link Error Control: Error Detection vs Error Correction</text>

  <g transform="translate(50, 95)">
    <!-- Branch 1: Error Detection -->
    <rect x="0" y="0" width="380" height="370" rx="10" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5" />
    <rect x="0" y="0" width="380" height="36" rx="10" fill="#EFF6FF" />
    <text x="190" y="24" fill="#1E40AF" font-size="13" font-weight="700" text-anchor="middle">Error Detection &amp; ARQ Retransmission</text>

    <g transform="translate(20, 55)">
      <!-- Technique 1 -->
      <rect x="0" y="0" width="340" height="60" rx="6" fill="#FFFFFF" stroke="#CBD5E1" />
      <text x="15" y="22" fill="#0F172A" font-size="12" font-weight="bold">1. Simple Parity Check (Single-bit)</text>
      <text x="15" y="42" fill="#64748B" font-size="10.5">Adds 1 redundant bit (even/odd). Detects all odd-number bit errors; misses even-number errors.</text>

      <!-- Technique 2 -->
      <rect x="0" y="70" width="340" height="60" rx="6" fill="#FFFFFF" stroke="#CBD5E1" />
      <text x="15" y="92" fill="#0F172A" font-size="12" font-weight="bold">2. Internet 16-bit Checksum</text>
      <text x="15" y="112" fill="#64748B" font-size="10.5">1's complement sum of 16-bit words. Fast in software; used in IPv4, TCP, UDP.</text>

      <!-- Technique 3 -->
      <rect x="0" y="140" width="340" height="75" rx="6" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.5" />
      <text x="15" y="162" fill="#1E40AF" font-size="12" font-weight="bold">3. Cyclic Redundancy Check (CRC)</text>
      <text x="15" y="180" fill="#475569" font-size="10.5">Polynomial modulo-2 division in hardware. Detects burst errors up to degree r of generator G(x).</text>
      <text x="15" y="200" fill="#2563EB" font-size="10" font-family="monospace" font-weight="bold">Ethernet CRC-32 &bull; HDLC CRC-CCITT</text>
    </g>

    <rect x="20" y="305" width="340" height="50" rx="6" fill="#DBEAFE" />
    <text x="190" y="325" fill="#1E40AF" font-size="11" font-weight="bold" text-anchor="middle">Low Redundancy Overhead</text>
    <text x="190" y="342" fill="#64748B" font-size="10" text-anchor="middle">Best for low-error wired channels (copper, optical fiber)</text>

    <!-- Branch 2: Error Correction (FEC) -->
    <rect x="420" y="0" width="380" height="370" rx="10" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5" />
    <rect x="420" y="0" width="380" height="36" rx="10" fill="#ECFDF5" />
    <text x="610" y="24" fill="#065F46" font-size="13" font-weight="700" text-anchor="middle">Forward Error Correction (FEC)</text>

    <g transform="translate(440, 55)">
      <!-- Technique 1 -->
      <rect x="0" y="0" width="340" height="65" rx="6" fill="#FFFFFF" stroke="#CBD5E1" />
      <text x="15" y="22" fill="#0F172A" font-size="12" font-weight="bold">Hamming Codes (e.g. Hamming(7,4))</text>
      <text x="15" y="40" fill="#64748B" font-size="10.5">Parity bits at powers of 2 (1, 2, 4, 8...). Detects double-bit errors and corrects single-bit errors.</text>
      <text x="15" y="56" fill="#059669" font-size="9.5" font-weight="bold">Hamming Distance: d_min &ge; 2t + 1</text>

      <!-- Technique 2 -->
      <rect x="0" y="75" width="340" height="65" rx="6" fill="#FFFFFF" stroke="#CBD5E1" />
      <text x="15" y="97" fill="#0F172A" font-size="12" font-weight="bold">Reed-Solomon &amp; Convolutional Codes</text>
      <text x="15" y="115" fill="#64748B" font-size="10.5">Block-based codes capable of correcting multiple burst byte errors. Used in satellite and CDs/DVDs.</text>

      <!-- Technique 3 -->
      <rect x="0" y="150" width="340" height="65" rx="6" fill="#FFFFFF" stroke="#CBD5E1" />
      <text x="15" y="172" fill="#0F172A" font-size="12" font-weight="bold">LDPC (Low-Density Parity-Check)</text>
      <text x="15" y="190" fill="#64748B" font-size="10.5">Modern near-Shannon-limit capacity codes used in Wi-Fi 6 (802.11ax) and 5G NR networks.</text>
    </g>

    <rect x="440" y="305" width="340" height="50" rx="6" fill="#D1FAE5" />
    <text x="610" y="325" fill="#065F46" font-size="11" font-weight="bold" text-anchor="middle">Higher Redundancy &bull; Zero Retransmission Delay</text>
    <text x="610" y="342" fill="#64748B" font-size="10" text-anchor="middle">Crucial for deep-space links, satellite, and noisy wireless</text>
  </g>
</svg>
`);

// 10. Byte Stuffing Detailed Mechanism
writeSvg('byte-stuffing-mechanism.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 480" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <rect x="30" y="20" width="840" height="54" rx="10" fill="#0F172A" />
  <text x="50" y="53" fill="#F8FAFC" font-size="18" font-weight="700">Byte Stuffing &amp; Character Transparency in Flag-Based Framing</text>

  <g transform="translate(50, 95)">
    <!-- Case A -->
    <rect x="0" y="0" width="800" height="110" rx="10" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5" />
    <text x="20" y="28" fill="#0F172A" font-size="13" font-weight="700">Case A: Data contains a FLAG byte</text>
    <text x="20" y="48" fill="#64748B" font-size="11">If raw data contains a byte with value 0x7E (FLAG), sender prepends an ESC (Escape, 0x7D) byte before it:</text>
    <!-- Before -->
    <g transform="translate(20, 60)">
      <text x="0" y="16" fill="#334155" font-size="10" font-weight="bold">Original Data:</text>
      <rect x="90" y="2" width="40" height="20" fill="#E2E8F0" rx="3" /><text x="110" y="16" fill="#334" font-size="9" text-anchor="middle">A</text>
      <rect x="135" y="2" width="50" height="20" fill="#FEE2E2" stroke="#EF4444" rx="3" /><text x="160" y="16" fill="#DC2626" font-size="9" font-weight="bold" text-anchor="middle">FLAG</text>
      <rect x="190" y="2" width="40" height="20" fill="#E2E8F0" rx="3" /><text x="210" y="16" fill="#334" font-size="9" text-anchor="middle">B</text>

      <text x="280" y="16" fill="#10B981" font-size="11" font-weight="bold">&rarr; After Stuffing:</text>
      <rect x="380" y="2" width="50" height="20" fill="#10B981" rx="3" /><text x="405" y="16" fill="#FFF" font-size="9" font-weight="bold" text-anchor="middle">FLAG</text>
      <rect x="435" y="2" width="40" height="20" fill="#E2E8F0" rx="3" /><text x="455" y="16" fill="#334" font-size="9" text-anchor="middle">A</text>
      <rect x="480" y="2" width="45" height="20" fill="#FEF3C7" stroke="#F59E0B" rx="3" /><text x="502" y="16" fill="#D97706" font-size="9" font-weight="bold" text-anchor="middle">ESC</text>
      <rect x="530" y="2" width="50" height="20" fill="#EFF6FF" stroke="#3B82F6" rx="3" /><text x="555" y="16" fill="#1E40AF" font-size="9" font-weight="bold" text-anchor="middle">FLAG</text>
      <rect x="585" y="2" width="40" height="20" fill="#E2E8F0" rx="3" /><text x="605" y="16" fill="#334" font-size="9" text-anchor="middle">B</text>
      <rect x="630" y="2" width="50" height="20" fill="#10B981" rx="3" /><text x="655" y="16" fill="#FFF" font-size="9" font-weight="bold" text-anchor="middle">FLAG</text>
    </g>

    <!-- Case B -->
    <rect x="0" y="130" width="800" height="110" rx="10" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5" />
    <text x="20" y="158" fill="#0F172A" font-size="13" font-weight="700">Case B: Data contains an ESC byte</text>
    <text x="20" y="178" fill="#64748B" font-size="11">If raw data contains an ESC byte itself, sender must stuff an additional ESC byte ahead of it:</text>
    <g transform="translate(20, 190)">
      <text x="0" y="16" fill="#334155" font-size="10" font-weight="bold">Original Data:</text>
      <rect x="90" y="2" width="40" height="20" fill="#E2E8F0" rx="3" /><text x="110" y="16" fill="#334" font-size="9" text-anchor="middle">A</text>
      <rect x="135" y="2" width="45" height="20" fill="#FEF3C7" stroke="#F59E0B" rx="3" /><text x="157" y="16" fill="#D97706" font-size="9" font-weight="bold" text-anchor="middle">ESC</text>
      <rect x="185" y="2" width="40" height="20" fill="#E2E8F0" rx="3" /><text x="205" y="16" fill="#334" font-size="9" text-anchor="middle">B</text>

      <text x="280" y="16" fill="#10B981" font-size="11" font-weight="bold">&rarr; After Stuffing:</text>
      <rect x="380" y="2" width="50" height="20" fill="#10B981" rx="3" /><text x="405" y="16" fill="#FFF" font-size="9" font-weight="bold" text-anchor="middle">FLAG</text>
      <rect x="435" y="2" width="40" height="20" fill="#E2E8F0" rx="3" /><text x="455" y="16" fill="#334" font-size="9" text-anchor="middle">A</text>
      <rect x="480" y="2" width="45" height="20" fill="#FEF3C7" stroke="#F59E0B" rx="3" /><text x="502" y="16" fill="#D97706" font-size="9" font-weight="bold" text-anchor="middle">ESC</text>
      <rect x="530" y="2" width="45" height="20" fill="#FEF3C7" stroke="#F59E0B" rx="3" /><text x="552" y="16" fill="#D97706" font-size="9" font-weight="bold" text-anchor="middle">ESC</text>
      <rect x="580" y="2" width="40" height="20" fill="#E2E8F0" rx="3" /><text x="600" y="16" fill="#334" font-size="9" text-anchor="middle">B</text>
      <rect x="625" y="2" width="50" height="20" fill="#10B981" rx="3" /><text x="650" y="16" fill="#FFF" font-size="9" font-weight="bold" text-anchor="middle">FLAG</text>
    </g>

    <!-- Receiver Rule Summary -->
    <rect x="0" y="260" width="800" height="100" rx="10" fill="#EFF6FF" stroke="#93C5FD" stroke-width="1.5" />
    <text x="20" y="288" fill="#1E40AF" font-size="13" font-weight="700">Receiver Unstuffing Algorithm:</text>
    <text x="20" y="310" fill="#334155" font-size="11.5">&bull; When receiver sees an ESC byte, it strips the ESC byte and accepts the following byte literally (whether FLAG or ESC).</text>
    <text x="20" y="332" fill="#334155" font-size="11.5">&bull; An unescaped FLAG byte always strictly signals the beginning or termination of a frame.</text>
  </g>
</svg>
`);

console.log('Topic 1 part 2 generated successfully.');
