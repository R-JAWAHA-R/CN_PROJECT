// scratch/svg_builders_topic5.js
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../assets/images/topic5');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function writeSvg(filename, svgContent) {
  fs.writeFileSync(path.join(outDir, filename), svgContent.trim(), 'utf8');
  console.log(`Created topic5/${filename}`);
}

// 1. Collision-Free Protocols Necessity
writeSvg('collision-free-necessity.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 480" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <rect x="30" y="20" width="840" height="54" rx="10" fill="#0F172A" />
  <text x="50" y="53" fill="#F8FAFC" font-size="18" font-weight="700">Why Collision-Free Protocols? Heavy Load Throughput Collapse in Contention</text>

  <g transform="translate(60, 95)">
    <!-- Chart on Left: Contention vs Collision-Free -->
    <rect x="0" y="0" width="380" height="350" rx="10" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5" />
    <text x="25" y="30" fill="#0F172A" font-size="13" font-weight="bold">Channel Efficiency (&eta;) vs Offered Load (G)</text>

    <!-- Axes -->
    <g transform="translate(40, 50)">
      <line x1="30" y1="20" x2="30" y2="230" stroke="#0F172A" stroke-width="2" />
      <line x1="30" y1="230" x2="310" y2="230" stroke="#0F172A" stroke-width="2" />
      <text x="15" y="125" fill="#0F172A" font-size="10.5" font-weight="bold" transform="rotate(-90 15 125)" text-anchor="middle">Throughput &eta;</text>
      <text x="170" y="255" fill="#0F172A" font-size="10.5" font-weight="bold" text-anchor="middle">Offered Network Load G &rarr;</text>

      <!-- Curve 1: Collision-Free Protocols (Green - Rises to near 100%) -->
      <path d="M 30 220 Q 150 160, 230 65 L 300 45" fill="none" stroke="#10B981" stroke-width="3.5" />
      <text x="250" y="35" fill="#065F46" font-size="11" font-weight="bold">Collision-Free (&rarr; 100%)</text>

      <!-- Curve 2: Contention / ALOHA (Red - Collapses) -->
      <path d="M 30 220 Q 90 100, 140 140 Q 200 200, 300 228" fill="none" stroke="#EF4444" stroke-width="3" stroke-dasharray="4 2" />
      <text x="160" y="170" fill="#DC2626" font-size="10.5" font-weight="bold">Contention / ALOHA (Collapses)</text>
    </g>

    <!-- Problem & Solution Cards on Right -->
    <g transform="translate(410, 0)">
      <rect width="370" height="165" rx="10" fill="#FEF2F2" stroke="#FCA5A5" stroke-width="1.5" />
      <text x="20" y="25" fill="#991B1B" font-size="13" font-weight="bold">The Contention Collapse Problem:</text>
      <text x="20" y="50" fill="#475569" font-size="11">&bull; In random access (ALOHA, CSMA), as traffic load increases, collisions multiply exponentially.</text>
      <text x="20" y="85" fill="#475569" font-size="11">&bull; Under saturated load, almost 100% of channel time is wasted in aborted collisions and backoffs!</text>
      <text x="20" y="120" fill="#DC2626" font-size="11" font-weight="bold">&bull; No station can successfully deliver frames &bull; Instability</text>

      <rect y="185" width="370" height="165" rx="10" fill="#ECFDF5" stroke="#6EE7B7" stroke-width="1.5" />
      <text x="20" y="210" fill="#065F46" font-size="13" font-weight="bold">The Collision-Free Solution:</text>
      <text x="20" y="235" fill="#475569" font-size="11">&bull; Replaces random guessing with deterministic order or reservation schedules.</text>
      <text x="20" y="270" fill="#475569" font-size="11">&bull; Under heavy load, channel efficiency approaches nearly 100% since zero time is lost to collisions.</text>
      <text x="20" y="305" fill="#059669" font-size="11" font-weight="bold">&bull; Guarantees bounded delay &bull; Mission-critical real-time LANs</text>
    </g>
  </g>
</svg>
`);

// 2. Bit-Map Protocol (Reservation)
writeSvg('bitmap-reservation-protocol.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 500" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <rect x="30" y="20" width="840" height="54" rx="10" fill="#0F172A" />
  <text x="50" y="53" fill="#F8FAFC" font-size="18" font-weight="700">Bit-Map Protocol (Reservation Method &bull; N = 8 Stations)</text>

  <g transform="translate(50, 95)">
    <!-- Cycle 1 Header -->
    <rect x="0" y="10" width="800" height="34" rx="6" fill="#1E293B" />
    <text x="20" y="32" fill="#FFF" font-size="12" font-weight="bold">TRANSMISSION CYCLE 1: Contention / Reservation Period followed by Data Period</text>

    <!-- Contention Slots (N=8 1-bit slots) -->
    <g transform="translate(10, 60)">
      <rect x="0" y="0" width="280" height="70" rx="8" fill="#EFF6FF" stroke="#3B82F6" stroke-width="2" />
      <text x="140" y="20" fill="#1E40AF" font-size="11" font-weight="bold" text-anchor="middle">Contention Period (8 &times; 1-bit slots)</text>

      <!-- 8 Slots -->
      <g transform="translate(15, 30)">
        <rect x="0" y="0" width="28" height="28" fill="#F1F5F9" stroke="#94A3B8" /><text x="14" y="18" fill="#64748B" font-size="10" text-anchor="middle">0</text><text x="14" y="-4" fill="#64748B" font-size="8" text-anchor="middle">S0</text>
        <rect x="31" y="0" width="28" height="28" fill="#10B981" /><text x="45" y="18" fill="#FFF" font-size="11" font-weight="bold" text-anchor="middle">1</text><text x="45" y="-4" fill="#059669" font-size="8" font-weight="bold" text-anchor="middle">S1</text>
        <rect x="62" y="0" width="28" height="28" fill="#F1F5F9" stroke="#94A3B8" /><text x="76" y="18" fill="#64748B" font-size="10" text-anchor="middle">0</text><text x="76" y="-4" fill="#64748B" font-size="8" text-anchor="middle">S2</text>
        <rect x="93" y="0" width="28" height="28" fill="#10B981" /><text x="107" y="18" fill="#FFF" font-size="11" font-weight="bold" text-anchor="middle">1</text><text x="107" y="-4" fill="#059669" font-size="8" font-weight="bold" text-anchor="middle">S3</text>
        <rect x="124" y="0" width="28" height="28" fill="#F1F5F9" stroke="#94A3B8" /><text x="138" y="18" fill="#64748B" font-size="10" text-anchor="middle">0</text><text x="138" y="-4" fill="#64748B" font-size="8" text-anchor="middle">S4</text>
        <rect x="155" y="0" width="28" height="28" fill="#F1F5F9" stroke="#94A3B8" /><text x="169" y="18" fill="#64748B" font-size="10" text-anchor="middle">0</text><text x="169" y="-4" fill="#64748B" font-size="8" text-anchor="middle">S5</text>
        <rect x="186" y="0" width="28" height="28" fill="#F1F5F9" stroke="#94A3B8" /><text x="200" y="18" fill="#64748B" font-size="10" text-anchor="middle">0</text><text x="200" y="-4" fill="#64748B" font-size="8" text-anchor="middle">S6</text>
        <rect x="217" y="0" width="28" height="28" fill="#10B981" /><text x="231" y="18" fill="#FFF" font-size="11" font-weight="bold" text-anchor="middle">1</text><text x="231" y="-4" fill="#059669" font-size="8" font-weight="bold" text-anchor="middle">S7</text>
      </g>
    </g>

    <!-- Arrow between Contention and Data -->
    <path d="M 305 95 L 330 95" stroke="#059669" stroke-width="3" />
    <polygon points="335,95 325,90 325,100" fill="#059669" />

    <!-- Data Transmission Frames -->
    <g transform="translate(345, 60)">
      <rect x="0" y="0" width="445" height="70" rx="8" fill="#ECFDF5" stroke="#10B981" stroke-width="2" />
      <text x="220" y="20" fill="#065F46" font-size="11" font-weight="bold" text-anchor="middle">Data Transmission Period (Only Reserved Stations Transmit)</text>

      <!-- Frame 1 -->
      <rect x="20" y="30" width="120" height="30" rx="4" fill="#10B981" />
      <text x="80" y="50" fill="#FFF" font-size="11" font-weight="bold" text-anchor="middle">Frame (Station 1)</text>

      <!-- Frame 3 -->
      <rect x="155" y="30" width="120" height="30" rx="4" fill="#10B981" />
      <text x="215" y="50" fill="#FFF" font-size="11" font-weight="bold" text-anchor="middle">Frame (Station 3)</text>

      <!-- Frame 7 -->
      <rect x="290" y="30" width="130" height="30" rx="4" fill="#10B981" />
      <text x="355" y="50" fill="#FFF" font-size="11" font-weight="bold" text-anchor="middle">Frame (Station 7)</text>
    </g>

    <!-- Protocol Characteristics Box Below -->
    <g transform="translate(10, 160)">
      <rect width="780" height="205" rx="10" fill="#F8FAFC" stroke="#CBD5E1" />
      <text x="20" y="30" fill="#0F172A" font-size="13" font-weight="bold">Operational Principles &amp; Analysis:</text>
      <text x="20" y="55" fill="#475569" font-size="11">&bull; <tspan font-weight="bold" fill="#0F172A">Contention Phase:</tspan> Exactly N single-bit time slots are broadcast in round-robin sequence. If station j has a frame to send, it transmits a 1-bit pulse in slot j; otherwise, it transmits 0 (silent).</text>
      <text x="20" y="85" fill="#475569" font-size="11">&bull; <tspan font-weight="bold" fill="#059669">Zero Collisions:</tspan> By the end of slot N-1, all stations know exactly who has reserved transmission rights. Stations transmit in agreed ascending numerical order (Station 1, then Station 3, then Station 7) with 0 collisions!</text>
      <text x="20" y="115" fill="#475569" font-size="11">&bull; <tspan font-weight="bold" fill="#2563EB">Channel Efficiency Formula:</tspan></text>
      <rect x="40" y="125" width="700" height="30" rx="4" fill="#EFF6FF" stroke="#3B82F6" />
      <text x="390" y="145" fill="#1E40AF" font-size="11" font-family="monospace" font-weight="bold" text-anchor="middle">Efficiency &eta; = d / (d + N/k)  where d = frame size (bits), N = total stations, k = stations sending</text>
      <text x="20" y="180" fill="#475569" font-size="11">&bull; <tspan font-weight="bold" fill="#DC2626">Light Load vs Heavy Load:</tspan> Under light load (k=1), overhead is N bits per frame. Under heavy load (k=N), overhead drops to just 1 bit per frame (Efficiency &approx; d / (d+1) &gt; 99.9%).</text>
    </g>
  </g>
</svg>
`);

// 3. Binary Countdown Protocol (Moxa / CAN Bus Arbitration)
writeSvg('binary-countdown-protocol.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 480" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <rect x="30" y="20" width="840" height="54" rx="10" fill="#0F172A" />
  <text x="50" y="53" fill="#F8FAFC" font-size="18" font-weight="700">Binary Countdown Protocol: Bit-by-Bit Wired-OR Arbitration (CAN Bus Basis)</text>

  <g transform="translate(60, 95)">
    <!-- Table of 4 Contending Stations -->
    <rect x="0" y="10" width="780" height="190" rx="8" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5" />
    <rect x="0" y="10" width="780" height="32" rx="8" fill="#1E293B" />
    <text x="20" y="31" fill="#FFF" font-size="11" font-weight="bold">Station Address</text>
    <text x="200" y="31" fill="#A7F3D0" font-size="11" font-weight="bold">Bit 3 (MSB)</text>
    <text x="320" y="31" fill="#A7F3D0" font-size="11" font-weight="bold">Bit 2</text>
    <text x="440" y="31" fill="#A7F3D0" font-size="11" font-weight="bold">Bit 1</text>
    <text x="560" y="31" fill="#A7F3D0" font-size="11" font-weight="bold">Bit 0 (LSB)</text>
    <text x="680" y="31" fill="#FDE68A" font-size="11" font-weight="bold">Arbitration Status</text>

    <!-- Station 0010 (2) -->
    <text x="20" y="66" fill="#0F172A" font-size="11" font-weight="bold">Station A: 0010 (2)</text>
    <text x="230" y="66" fill="#EF4444" font-size="12" font-weight="bold">0</text>
    <text x="350" y="66" fill="#94A3B8" font-size="11">-</text>
    <text x="470" y="66" fill="#94A3B8" font-size="11">-</text>
    <text x="590" y="66" fill="#94A3B8" font-size="11">-</text>
    <text x="680" y="66" fill="#DC2626" font-size="10" font-weight="bold">Drops out at Bit 3</text>

    <!-- Station 0100 (4) -->
    <text x="20" y="102" fill="#0F172A" font-size="11" font-weight="bold">Station B: 0100 (4)</text>
    <text x="230" y="102" fill="#EF4444" font-size="12" font-weight="bold">0</text>
    <text x="350" y="102" fill="#94A3B8" font-size="11">-</text>
    <text x="470" y="102" fill="#94A3B8" font-size="11">-</text>
    <text x="590" y="102" fill="#94A3B8" font-size="11">-</text>
    <text x="680" y="102" fill="#DC2626" font-size="10" font-weight="bold">Drops out at Bit 3</text>

    <!-- Station 1001 (9) -->
    <text x="20" y="138" fill="#0F172A" font-size="11" font-weight="bold">Station C: 1001 (9)</text>
    <text x="230" y="138" fill="#10B981" font-size="12" font-weight="bold">1</text>
    <text x="350" y="138" fill="#10B981" font-size="12" font-weight="bold">0</text>
    <text x="470" y="138" fill="#EF4444" font-size="12" font-weight="bold">0</text>
    <text x="590" y="138" fill="#94A3B8" font-size="11">-</text>
    <text x="680" y="138" fill="#DC2626" font-size="10" font-weight="bold">Drops out at Bit 1</text>

    <!-- Station 1010 (10) - WINNER -->
    <rect x="5" y="152" width="770" height="34" rx="4" fill="#D1FAE5" />
    <text x="20" y="174" fill="#065F46" font-size="11" font-weight="bold">Station D: 1010 (10)</text>
    <text x="230" y="174" fill="#059669" font-size="13" font-weight="bold">1</text>
    <text x="350" y="174" fill="#059669" font-size="13" font-weight="bold">0</text>
    <text x="470" y="174" fill="#059669" font-size="13" font-weight="bold">1</text>
    <text x="590" y="174" fill="#059669" font-size="13" font-weight="bold">0</text>
    <text x="680" y="174" fill="#059669" font-size="11" font-weight="bold">&check; WINS CHANNEL!</text>

    <!-- Channel Result -->
    <g transform="translate(0, 215)">
      <rect width="780" height="34" rx="6" fill="#EFF6FF" stroke="#3B82F6" />
      <text x="20" y="22" fill="#1E40AF" font-size="11" font-weight="bold">Boolean Wired-OR Channel Output:</text>
      <text x="230" y="22" fill="#1E40AF" font-size="13" font-family="monospace" font-weight="bold">1</text>
      <text x="350" y="22" fill="#1E40AF" font-size="13" font-family="monospace" font-weight="bold">0</text>
      <text x="470" y="22" fill="#1E40AF" font-size="13" font-family="monospace" font-weight="bold">1</text>
      <text x="590" y="22" fill="#1E40AF" font-size="13" font-family="monospace" font-weight="bold">0</text>
      <text x="660" y="22" fill="#1E40AF" font-size="11" font-weight="bold">&rarr; 1010 (Highest address wins)</text>
    </g>

    <!-- Explanation Box Below -->
    <g transform="translate(0, 260)">
      <rect width="780" height="95" rx="8" fill="#F8FAFC" stroke="#CBD5E1" />
      <text x="20" y="25" fill="#0F172A" font-size="12" font-weight="bold">The Arbitration Rule:</text>
      <text x="20" y="46" fill="#475569" font-size="11">Stations transmit their binary address bits from MSB to LSB. If a station asserts a '0' but detects a '1' on the wired-OR bus, it concludes a higher-numbered station is contending and immediately gives up!</text>
      <text x="20" y="70" fill="#059669" font-size="11" font-weight="bold">Overhead: Only log_2(N) bits per frame &bull; Used in Controller Area Network (CAN bus) in millions of automotive vehicles!</text>
    </g>
  </g>
</svg>
`);

// 4. Token Passing Ring Architecture
writeSvg('token-passing-ring-architecture.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 500" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <rect x="30" y="20" width="840" height="54" rx="10" fill="#0F172A" />
  <text x="50" y="53" fill="#F8FAFC" font-size="18" font-weight="700">Token Passing Protocol: Token Ring Topology &amp; Unidirectional Circulation (IEEE 802.5)</text>

  <g transform="translate(80, 95)">
    <!-- Central Ring Topology -->
    <circle cx="260" cy="180" r="140" fill="none" stroke="#64748B" stroke-width="4" />

    <!-- Station A (Top) -->
    <g transform="translate(260, 40)">
      <circle cx="0" cy="0" r="24" fill="#FFFFFF" stroke="#3B82F6" stroke-width="2.5" />
      <text x="0" y="5" fill="#1E40AF" font-size="13" font-weight="bold" text-anchor="middle">A</text>
      <text x="0" y="-32" fill="#1E40AF" font-size="10" font-weight="bold" text-anchor="middle">Station A</text>
    </g>

    <!-- Station B (Right) - Has Token &amp; Transmitting -->
    <g transform="translate(400, 180)">
      <circle cx="0" cy="0" r="28" fill="#ECFDF5" stroke="#10B981" stroke-width="3" />
      <text x="0" y="5" fill="#065F46" font-size="14" font-weight="bold" text-anchor="middle">B</text>
      <text x="45" y="5" fill="#065F46" font-size="10" font-weight="bold">Station B (Sender)</text>
      <!-- Captured Token Badge -->
      <rect x="-35" y="32" width="70" height="20" rx="4" fill="#F59E0B" />
      <text x="0" y="46" fill="#FFF" font-size="9" font-weight="bold" text-anchor="middle">HAS TOKEN</text>
    </g>

    <!-- Station C (Bottom) - Intended Receiver -->
    <g transform="translate(260, 320)">
      <circle cx="0" cy="0" r="24" fill="#FFFFFF" stroke="#8B5CF6" stroke-width="2.5" />
      <text x="0" y="5" fill="#6D28D9" font-size="13" font-weight="bold" text-anchor="middle">C</text>
      <text x="0" y="38" fill="#6D28D9" font-size="10" font-weight="bold" text-anchor="middle">Station C (Receiver)</text>
    </g>

    <!-- Station D (Left) - Repeater -->
    <g transform="translate(120, 180)">
      <circle cx="0" cy="0" r="24" fill="#FFFFFF" stroke="#64748B" stroke-width="2" />
      <text x="0" y="5" fill="#334155" font-size="13" font-weight="bold" text-anchor="middle">D</text>
      <text x="-45" y="5" fill="#64748B" font-size="10" text-anchor="end">Station D (Repeats)</text>
    </g>

    <!-- Clockwise Flow Arrows -->
    <path d="M 360 80 Q 400 120, 395 140" fill="none" stroke="#10B981" stroke-width="3" />
    <polygon points="395,145 390,135 400,135" fill="#10B981" />

    <path d="M 390 230 Q 360 290, 310 310" fill="none" stroke="#10B981" stroke-width="3" />
    <polygon points="305,312 313,304 317,313" fill="#10B981" />

    <path d="M 210 310 Q 150 280, 130 230" fill="none" stroke="#10B981" stroke-width="3" />
    <polygon points="128,225 125,235 135,233" fill="#10B981" />

    <path d="M 135 130 Q 170 70, 210 50" fill="none" stroke="#10B981" stroke-width="3" />
    <polygon points="215,48 206,45 208,55" fill="#10B981" />

    <!-- Step by Step Card on Right -->
    <g transform="translate(490, 20)">
      <rect width="280" height="320" rx="10" fill="#F8FAFC" stroke="#CBD5E1" />
      <text x="15" y="25" fill="#0F172A" font-size="12" font-weight="bold">Token Ring Protocol Lifecycle:</text>
      
      <text x="15" y="50" fill="#1E40AF" font-size="11" font-weight="bold">1. Free Token Circulation:</text>
      <text x="25" y="68" fill="#64748B" font-size="10">Small 3-byte token frame circulates around ring from node to node.</text>

      <text x="15" y="98" fill="#059669" font-size="11" font-weight="bold">2. Token Capture &amp; Transmit:</text>
      <text x="25" y="116" fill="#64748B" font-size="10">Station B grabs token, converts it into a data frame, appends packet, and transmits.</text>

      <text x="15" y="146" fill="#7C3AED" font-size="11" font-weight="bold">3. Frame Copying at Receiver:</text>
      <text x="25" y="164" fill="#64748B" font-size="10">Station C copies data, sets Frame Copied (C) &amp; Address Recognized (A) bits in trailer.</text>

      <text x="15" y="200" fill="#D97706" font-size="11" font-weight="bold">4. Frame Stripping &amp; Token Release:</text>
      <text x="25" y="218" fill="#64748B" font-size="10">Frame completes full loop back to Station B. Station B strips frame and releases fresh free token to next neighbor!</text>

      <rect x="15" y="260" width="250" height="45" rx="6" fill="#ECFDF5" stroke="#10B981" />
      <text x="140" y="280" fill="#065F46" font-size="10" font-weight="bold" text-anchor="middle">Guaranteed Bounded Delay:</text>
      <text x="140" y="295" fill="#065F46" font-size="10" font-family="monospace" text-anchor="middle">Max Latency = N &times; THT</text>
    </g>
  </g>
</svg>
`);

// 5. Collision-Free Working Trace & Comparison Matrix
writeSvg('collision-free-comparison-matrix.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 480" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <rect x="30" y="20" width="840" height="54" rx="10" fill="#0F172A" />
  <text x="50" y="53" fill="#F8FAFC" font-size="18" font-weight="700">Detailed Comparison Matrix: Collision-Free MAC Protocols</text>

  <g transform="translate(50, 95)">
    <!-- Header Row -->
    <rect x="0" y="0" width="800" height="38" rx="6" fill="#1E293B" />
    <text x="20" y="24" fill="#FFF" font-size="11" font-weight="bold">Protocol</text>
    <text x="180" y="24" fill="#A7F3D0" font-size="11" font-weight="bold">Mechanism</text>
    <text x="340" y="24" fill="#93C5FD" font-size="11" font-weight="bold">Overhead per Frame</text>
    <text x="500" y="24" fill="#FDE68A" font-size="11" font-weight="bold">Fairness</text>
    <text x="640" y="24" fill="#C4B5FD" font-size="11" font-weight="bold">Real-World Standard</text>

    <!-- Row 1: Bit-Map Protocol -->
    <rect x="0" y="44" width="800" height="60" fill="#F8FAFC" stroke="#CBD5E1" />
    <text x="20" y="70" fill="#0F172A" font-size="11" font-weight="bold">Bit-Map Protocol</text>
    <text x="20" y="88" fill="#64748B" font-size="9.5">Reservation</text>
    <text x="180" y="70" fill="#334155" font-size="10.5">N 1-bit contention slots</text>
    <text x="180" y="88" fill="#64748B" font-size="9.5">before each data burst</text>
    <text x="340" y="70" fill="#1E40AF" font-size="11" font-weight="bold">N bits</text>
    <text x="340" y="88" fill="#64748B" font-size="9.5">(N/k under k senders)</text>
    <text x="500" y="70" fill="#059669" font-size="10.5" font-weight="bold">Fair (Round-Robin)</text>
    <text x="500" y="88" fill="#64748B" font-size="9.5">Equal transmission rights</text>
    <text x="640" y="70" fill="#64748B" font-size="10.5">Satellite DAMA,</text>
    <text x="640" y="88" fill="#64748B" font-size="9.5">DOCSIS Cable MAC</text>

    <!-- Row 2: Binary Countdown -->
    <rect x="0" y="110" width="800" height="60" fill="#FFFFFF" stroke="#CBD5E1" />
    <text x="20" y="136" fill="#0F172A" font-size="11" font-weight="bold">Binary Countdown</text>
    <text x="20" y="154" fill="#64748B" font-size="9.5">Priority / Arbitration</text>
    <text x="180" y="136" fill="#334155" font-size="10.5">Wired-OR bit-by-bit</text>
    <text x="180" y="154" fill="#64748B" font-size="9.5">MSB to LSB address test</text>
    <text x="340" y="136" fill="#059669" font-size="11" font-weight="bold">log_2(N) bits</text>
    <text x="340" y="154" fill="#64748B" font-size="9.5">(Extremely low overhead)</text>
    <text x="500" y="136" fill="#DC2626" font-size="10.5" font-weight="bold">Unfair by Default</text>
    <text x="500" y="154" fill="#64748B" font-size="9.5">High address always wins</text>
    <text x="640" y="136" fill="#059669" font-size="10.5" font-weight="bold">CAN Bus (ISO 11898)</text>
    <text x="640" y="154" fill="#64748B" font-size="9.5">Automotive in-vehicle LAN</text>

    <!-- Row 3: Token Ring -->
    <rect x="0" y="176" width="800" height="60" fill="#F8FAFC" stroke="#CBD5E1" />
    <text x="20" y="202" fill="#0F172A" font-size="11" font-weight="bold">Token Passing</text>
    <text x="20" y="220" fill="#64748B" font-size="9.5">Token Circulation</text>
    <text x="180" y="202" fill="#334155" font-size="10.5">Explicit 3-byte token</text>
    <text x="180" y="220" fill="#64748B" font-size="9.5">passes around physical ring</text>
    <text x="340" y="202" fill="#7C3AED" font-size="11" font-weight="bold">24 bits (Token)</text>
    <text x="340" y="220" fill="#64748B" font-size="9.5">plus ring transit latency</text>
    <text x="500" y="202" fill="#059669" font-size="10.5" font-weight="bold">Completely Fair</text>
    <text x="500" y="220" fill="#64748B" font-size="9.5">Bounded max rotation time</text>
    <text x="640" y="202" fill="#7C3AED" font-size="10.5" font-weight="bold">IEEE 802.5, FDDI</text>
    <text x="640" y="220" fill="#64748B" font-size="9.5">Industrial automation</text>

    <!-- Summary Box -->
    <rect x="0" y="250" width="800" height="90" rx="8" fill="#ECFDF5" stroke="#10B981" />
    <text x="20" y="275" fill="#065F46" font-size="12" font-weight="bold">Engineering Decision Rule:</text>
    <text x="20" y="296" fill="#334155" font-size="11">&bull; Use <tspan font-weight="bold" fill="#059669">Binary Countdown</tspan> for embedded control systems with priority requirements (automotive ECUs, robotics).</text>
    <text x="20" y="318" fill="#334155" font-size="11">&bull; Use <tspan font-weight="bold" fill="#7C3AED">Token Passing</tspan> when predictable maximum latency guarantees are mandated (factory floor automation, FDDI).</text>
  </g>
</svg>
`);

console.log('Topic 5 SVGs generated successfully.');
