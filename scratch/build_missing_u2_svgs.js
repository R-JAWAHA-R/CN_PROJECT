const fs = require('fs');
const path = require('path');

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

const list = [
  // 1. parity-generation-checking.svg
  {
    path: 'assets/images/unit2/topic1/parity-generation-checking.svg',
    svg: makeSvg(900, 480, "Parity Check Code Generation & Verification", "Even Parity vs Odd Parity • Modulo-2 Arithmetic • Single-Bit Error Detection", `
      <g transform="translate(40, 20)">
        <rect width="380" height="340" rx="10" fill="url(#blueCard)" stroke="#3b82f6" stroke-width="2"/>
        <text x="190" y="35" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#93c5fd" text-anchor="middle">SENDER: PARITY GENERATOR</text>
        <rect x="30" y="65" width="320" height="45" rx="6" fill="#0f172a" stroke="#38bdf8"/>
        <text x="190" y="93" font-family="system-ui, sans-serif" font-size="13" font-family="monospace" fill="#38bdf8" text-anchor="middle">Data Bits (k=7): 1 0 1 1 0 0 1</text>
        <text x="190" y="140" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">Number of 1s in Dataword = 4 (Even)</text>
        <rect x="30" y="165" width="320" height="55" rx="6" fill="#1e293b"/>
        <text x="190" y="190" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#a7f3d0" text-anchor="middle">Even Parity Bit: r = 0  (Total 1s = 4)</text>
        <text x="190" y="210" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fde68a" text-anchor="middle">Odd Parity Bit:  r = 1  (Total 1s = 5)</text>
        <rect x="30" y="245" width="320" height="50" rx="6" fill="#0f172a" stroke="#10b981"/>
        <text x="190" y="275" font-family="system-ui, sans-serif" font-size="12" font-family="monospace" fill="#34d399" text-anchor="middle">Transmitted: [ 1 0 1 1 0 0 1 | 0 ]</text>
      </g>
      <g transform="translate(460, 20)">
        <rect width="380" height="340" rx="10" fill="url(#purpleCard)" stroke="#a855f7" stroke-width="2"/>
        <text x="190" y="35" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#e9d5ff" text-anchor="middle">RECEIVER: PARITY CHECKER</text>
        <rect x="30" y="65" width="320" height="45" rx="6" fill="#0f172a" stroke="#c084fc"/>
        <text x="190" y="93" font-family="system-ui, sans-serif" font-size="13" font-family="monospace" fill="#c084fc" text-anchor="middle">Received: [ 1 0 1 1 0 0 1 | 0 ]</text>
        <text x="190" y="140" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">Compute Syndrome: Count all 1s mod 2</text>
        <rect x="30" y="165" width="320" height="60" rx="6" fill="#1e293b"/>
        <text x="190" y="190" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#34d399" text-anchor="middle">Syndrome S = 0 -> PASS (No single error)</text>
        <text x="190" y="212" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#f87171" text-anchor="middle">Syndrome S = 1 -> FAIL (1-Bit Error Detected!)</text>
        <rect x="30" y="245" width="320" height="50" rx="6" fill="#0f172a" stroke="#f59e0b"/>
        <text x="190" y="275" font-family="system-ui, sans-serif" font-size="11" fill="#fde68a" text-anchor="middle">Limitation: Cannot detect even number of errors</text>
      </g>
    `)
  },
  // 2. hamming-code-7-4-matrix.svg
  {
    path: 'assets/images/unit2/topic1/hamming-code-7-4-matrix.svg',
    svg: makeSvg(900, 480, "Hamming (7,4) Code Generator & Parity Check Matrices", "4 Data Bits (d1..d4) + 3 Parity Bits (p1, p2, p4) = 7-Bit Codeword", `
      <g transform="translate(40, 20)">
        <rect width="820" height="150" rx="10" fill="url(#blueCard)" stroke="#3b82f6" stroke-width="1.5"/>
        <text x="410" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#93c5fd" text-anchor="middle">BIT POSITION ASSIGNMENT (POWERS OF 2 RULE)</text>
        <g transform="translate(60, 55)">
          <rect x="0" y="0" width="90" height="45" rx="5" fill="#1e40af"/>
          <text x="45" y="20" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1" text-anchor="middle">Bit 1 (2^0)</text>
          <text x="45" y="38" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#38bdf8" text-anchor="middle">p1</text>
          <rect x="100" y="0" width="90" height="45" rx="5" fill="#1e40af"/>
          <text x="145" y="20" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1" text-anchor="middle">Bit 2 (2^1)</text>
          <text x="145" y="38" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#38bdf8" text-anchor="middle">p2</text>
          <rect x="200" y="0" width="90" height="45" rx="5" fill="#047857"/>
          <text x="245" y="20" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1" text-anchor="middle">Bit 3 (Data)</text>
          <text x="245" y="38" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#34d399" text-anchor="middle">d1</text>
          <rect x="300" y="0" width="90" height="45" rx="5" fill="#1e40af"/>
          <text x="345" y="20" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1" text-anchor="middle">Bit 4 (2^2)</text>
          <text x="345" y="38" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#38bdf8" text-anchor="middle">p4</text>
          <rect x="400" y="0" width="90" height="45" rx="5" fill="#047857"/>
          <text x="445" y="20" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1" text-anchor="middle">Bit 5 (Data)</text>
          <text x="445" y="38" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#34d399" text-anchor="middle">d2</text>
          <rect x="500" y="0" width="90" height="45" rx="5" fill="#047857"/>
          <text x="545" y="20" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1" text-anchor="middle">Bit 6 (Data)</text>
          <text x="545" y="38" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#34d399" text-anchor="middle">d3</text>
          <rect x="600" y="0" width="90" height="45" rx="5" fill="#047857"/>
          <text x="645" y="20" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1" text-anchor="middle">Bit 7 (Data)</text>
          <text x="645" y="38" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#34d399" text-anchor="middle">d4</text>
        </g>
        <text x="410" y="130" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1" text-anchor="middle">Parity bits p1, p2, p4 occupy powers of 2. Remaining positions carry data bits d1, d2, d3, d4.</text>
      </g>
      <g transform="translate(40, 195)">
        <rect width="820" height="145" rx="10" fill="url(#purpleCard)" stroke="#a855f7" stroke-width="1.5"/>
        <text x="410" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#e9d5ff" text-anchor="middle">PARITY CHECK EQUATIONS (EVEN PARITY)</text>
        <g transform="translate(80, 50)">
          <rect x="0" y="0" width="200" height="40" rx="5" fill="#1e293b"/>
          <text x="100" y="25" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#38bdf8" text-anchor="middle">p1 = d1 ⊕ d2 ⊕ d4</text>
          <rect x="230" y="0" width="200" height="40" rx="5" fill="#1e293b"/>
          <text x="330" y="25" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#38bdf8" text-anchor="middle">p2 = d1 ⊕ d3 ⊕ d4</text>
          <rect x="460" y="0" width="200" height="40" rx="5" fill="#1e293b"/>
          <text x="560" y="25" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#38bdf8" text-anchor="middle">p4 = d2 ⊕ d3 ⊕ d4</text>
        </g>
        <text x="410" y="125" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">Syndrome S = (s3 s2 s1)2 points directly to the erroneous bit position (0 = No Error, 1-7 = Flipped Bit Index).</text>
      </g>
    `)
  },
  // 3. crc-modulo-2-division.svg
  {
    path: 'assets/images/unit2/topic1/crc-modulo-2-division.svg',
    svg: makeSvg(900, 480, "Cyclic Redundancy Check (CRC) Modulo-2 Arithmetic", "Binary Modulo-2 Division • XOR Operation Without Carries or Borrows", `
      <g transform="translate(40, 20)">
        <rect width="400" height="340" rx="10" fill="url(#blueCard)" stroke="#3b82f6" stroke-width="2"/>
        <text x="200" y="35" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#93c5fd" text-anchor="middle">CRC SENDER ENCODING</text>
        <text x="40" y="70" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">1. Let dataword be D of k bits.</text>
        <text x="40" y="95" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">2. Divisor polynomial G(x) of degree r.</text>
        <text x="40" y="120" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">3. Append r zeros to D: D * 2^r</text>
        <text x="40" y="145" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">4. Perform modulo-2 division by G.</text>
        <text x="40" y="170" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">5. Remainder R is the r-bit CRC FCS.</text>
        <rect x="30" y="200" width="340" height="60" rx="6" fill="#0f172a" stroke="#10b981"/>
        <text x="200" y="225" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#a7f3d0" text-anchor="middle">Transmitted Codeword:</text>
        <text x="200" y="248" font-family="system-ui, sans-serif" font-size="13" font-family="monospace" fill="#34d399" text-anchor="middle">Codeword C = [ Data D | Remainder R ]</text>
      </g>
      <g transform="translate(460, 20)">
        <rect width="400" height="340" rx="10" fill="url(#purpleCard)" stroke="#a855f7" stroke-width="2"/>
        <text x="200" y="35" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#e9d5ff" text-anchor="middle">CRC RECEIVER CHECKING</text>
        <text x="40" y="70" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">1. Receive n-bit codeword C'.</text>
        <text x="40" y="95" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">2. Divide C' by same generator G(x).</text>
        <text x="40" y="120" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">3. Examine remainder (syndrome):</text>
        <rect x="30" y="145" width="340" height="45" rx="6" fill="#065f46" stroke="#10b981"/>
        <text x="200" y="173" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#a7f3d0" text-anchor="middle">Remainder == 0 -> ACCEPT (No Error)</text>
        <rect x="30" y="205" width="340" height="45" rx="6" fill="#7f1d1d" stroke="#ef4444"/>
        <text x="200" y="233" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fca5a5" text-anchor="middle">Remainder != 0 -> REJECT (Error Detected)</text>
        <text x="200" y="290" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1" text-anchor="middle">Detects all burst errors of length ≤ r and all odd bit errors</text>
      </g>
    `)
  },
  // 4. redundancy-block-coding.svg
  {
    path: 'assets/images/unit2/topic1/redundancy-block-coding.svg',
    svg: makeSvg(900, 480, "Redundancy and Block Coding Principles", "k-bit Dataword mapped to n-bit Codeword with r Redundant Check Bits (n = k + r)", `
      <g transform="translate(60, 30)">
        <rect width="340" height="180" rx="10" fill="url(#blueCard)" stroke="#3b82f6" stroke-width="1.5"/>
        <text x="170" y="35" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#93c5fd" text-anchor="middle">DATAWORD SPACE (2^k)</text>
        <rect x="40" y="65" width="260" height="50" rx="6" fill="#0f172a" stroke="#38bdf8"/>
        <text x="170" y="95" font-family="system-ui, sans-serif" font-size="14" font-family="monospace" fill="#38bdf8" text-anchor="middle">k Information Bits</text>
        <text x="170" y="145" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">Total possible messages = 2^k</text>
      </g>
      <g transform="translate(500, 30)">
        <rect width="340" height="180" rx="10" fill="url(#purpleCard)" stroke="#a855f7" stroke-width="1.5"/>
        <text x="170" y="35" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#e9d5ff" text-anchor="middle">CODEWORD SPACE (2^n)</text>
        <rect x="40" y="65" width="260" height="50" rx="6" fill="#0f172a" stroke="#c084fc"/>
        <text x="170" y="95" font-family="system-ui, sans-serif" font-size="13" font-family="monospace" fill="#c084fc" text-anchor="middle">[ k Data Bits | r Check Bits ]</text>
        <text x="170" y="145" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">Total possible patterns = 2^n (2^k valid, rest invalid)</text>
      </g>
      <!-- Arrow in middle -->
      <line x1="400" y1="120" x2="500" y2="120" stroke="#f59e0b" stroke-width="4"/>
      <polygon points="500,120 485,110 485,130" fill="#f59e0b"/>
      <text x="450" y="105" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#fde68a" text-anchor="middle">Encode</text>

      <!-- Bottom Card -->
      <g transform="translate(60, 230)">
        <rect width="780" height="110" rx="10" fill="#0f172a" stroke="#334155" stroke-width="2"/>
        <text x="390" y="35" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#38bdf8" text-anchor="middle">REDUNDANCY RELATIONSHIP FORMULA</text>
        <text x="390" y="65" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#a7f3d0" text-anchor="middle">2^r ≥ m + r + 1  (Hamming Bound Formula)</text>
        <text x="390" y="92" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">Where m = dataword length, r = number of redundant check bits</text>
      </g>
    `)
  },
  // 5. detection-vs-correction-matrix.svg
  {
    path: 'assets/images/unit2/topic1/detection-vs-correction-matrix.svg',
    svg: makeSvg(900, 480, "Error Detection vs Error Correction Comparison Matrix", "Minimum Hamming Distance (d_min) Requirements and Engineering Trade-Offs", `
      <g transform="translate(40, 20)">
        <rect width="820" height="340" rx="10" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
        <!-- Table Header -->
        <rect x="0" y="0" width="820" height="45" rx="10" fill="#0f172a"/>
        <text x="140" y="28" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#93c5fd" text-anchor="middle">FEATURE</text>
        <text x="380" y="28" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#38bdf8" text-anchor="middle">ERROR DETECTION (EDC)</text>
        <text x="660" y="28" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#a7f3d0" text-anchor="middle">ERROR CORRECTION (ECC / FEC)</text>

        <!-- Row 1 -->
        <line x1="0" y1="45" x2="820" y2="45" stroke="#334155"/>
        <text x="140" y="75" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">Primary Goal</text>
        <text x="380" y="75" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">Detect presence of bit errors in frame</text>
        <text x="660" y="75" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">Locate and invert flipped bits at receiver</text>

        <!-- Row 2 -->
        <line x1="0" y1="95" x2="820" y2="95" stroke="#334155"/>
        <text x="140" y="125" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">Hamming Distance (d_min)</text>
        <text x="380" y="125" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#38bdf8" text-anchor="middle">d_min ≥ s + 1 (detects s errors)</text>
        <text x="660" y="125" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#34d399" text-anchor="middle">d_min ≥ 2t + 1 (corrects t errors)</text>

        <!-- Row 3 -->
        <line x1="0" y1="145" x2="820" y2="145" stroke="#334155"/>
        <text x="140" y="175" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">Redundancy Overhead</text>
        <text x="380" y="175" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">Very Low (e.g. 1 bit parity, 16/32-bit CRC)</text>
        <text x="660" y="175" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">High (Requires multiple check bits per word)</text>

        <!-- Row 4 -->
        <line x1="0" y1="195" x2="820" y2="195" stroke="#334155"/>
        <text x="140" y="225" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">Handling Strategy</text>
        <text x="380" y="225" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">Discard frame and request Retransmission (ARQ)</text>
        <text x="660" y="225" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">Autonomous Forward Error Correction (FEC)</text>

        <!-- Row 5 -->
        <line x1="0" y1="245" x2="820" y2="245" stroke="#334155"/>
        <text x="140" y="280" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">Ideal Environment</text>
        <text x="380" y="280" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">Low-error channels (Ethernet fiber / copper LANs)</text>
        <text x="660" y="280" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">High-delay / Noisy links (Satellite, Deep Space, Wireless)</text>
      </g>
    `)
  },
  // 6. hamming-syndrome-decoder.svg
  {
    path: 'assets/images/unit2/topic1/hamming-syndrome-decoder.svg',
    svg: makeSvg(900, 480, "Hamming Syndrome Decoding Flowchart", "Syndrome Bit Calculation (s3, s2, s1) Points Directly to Corrupted Bit Index", `
      <g transform="translate(60, 20)">
        <rect width="780" height="80" rx="8" fill="url(#blueCard)" stroke="#3b82f6" stroke-width="1.5"/>
        <text x="390" y="30" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#93c5fd" text-anchor="middle">STEP 1: RECEIVE 7-BIT CODEWORD</text>
        <rect x="140" y="42" width="500" height="28" rx="4" fill="#0f172a" stroke="#38bdf8"/>
        <text x="390" y="61" font-family="system-ui, sans-serif" font-size="12" font-family="monospace" fill="#38bdf8" text-anchor="middle">r = [ b1 b2 b3 b4 b5 b6 b7 ]</text>
      </g>
      <g transform="translate(60, 115)">
        <rect width="780" height="110" rx="8" fill="url(#purpleCard)" stroke="#a855f7" stroke-width="1.5"/>
        <text x="390" y="25" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#e9d5ff" text-anchor="middle">STEP 2: CALCULATE SYNDROME BITS (s3, s2, s1)</text>
        <g transform="translate(40, 45)">
          <rect x="0" y="0" width="220" height="45" rx="5" fill="#1e293b"/>
          <text x="110" y="27" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#c084fc" text-anchor="middle">s1 = b1 ⊕ b3 ⊕ b5 ⊕ b7</text>
          <rect x="240" y="0" width="220" height="45" rx="5" fill="#1e293b"/>
          <text x="350" y="27" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#c084fc" text-anchor="middle">s2 = b2 ⊕ b3 ⊕ b6 ⊕ b7</text>
          <rect x="480" y="0" width="220" height="45" rx="5" fill="#1e293b"/>
          <text x="590" y="27" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#c084fc" text-anchor="middle">s3 = b4 ⊕ b5 ⊕ b6 ⊕ b7</text>
        </g>
      </g>
      <g transform="translate(60, 240)">
        <rect width="780" height="100" rx="8" fill="url(#emeraldCard)" stroke="#10b981" stroke-width="1.5"/>
        <text x="390" y="25" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#a7f3d0" text-anchor="middle">STEP 3: EVALUATE SYNDROME VALUE S = (s3 s2 s1)2</text>
        <text x="390" y="55" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fff" text-anchor="middle">If S == 000 (0): Codeword is clean. No bit flipped.</text>
        <text x="390" y="80" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fde68a" text-anchor="middle">If S != 000: Binary value of S points to flipped bit index -> INVERT bit b_S to restore clean data!</text>
      </g>
    `)
  },
  // 7. hamming-worked-numerical.svg
  {
    path: 'assets/images/unit2/topic1/hamming-worked-numerical.svg',
    svg: makeSvg(900, 480, "Solved Hamming (7,4) Code Numerical Example", "Transmitting Dataword 1011 • Single Bit Inversion at Position 5 • Syndrome Correction", `
      <g transform="translate(40, 20)">
        <rect width="820" height="340" rx="10" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
        <text x="40" y="35" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#38bdf8">GIVEN: Dataword = 1011 (d1=1, d2=0, d3=1, d4=1)</text>
        <text x="40" y="65" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">1. Calculate check bits for Even Parity:</text>
        <text x="60" y="90" font-family="system-ui, sans-serif" font-size="11" font-family="monospace" fill="#93c5fd">p1 = d1 ⊕ d2 ⊕ d4 = 1 ⊕ 0 ⊕ 1 = 0</text>
        <text x="60" y="112" font-family="system-ui, sans-serif" font-size="11" font-family="monospace" fill="#93c5fd">p2 = d1 ⊕ d3 ⊕ d4 = 1 ⊕ 1 ⊕ 1 = 1</text>
        <text x="60" y="134" font-family="system-ui, sans-serif" font-size="11" font-family="monospace" fill="#93c5fd">p4 = d2 ⊕ d3 ⊕ d4 = 0 ⊕ 1 ⊕ 1 = 0</text>
        
        <rect x="40" y="150" width="740" height="35" rx="5" fill="#1e293b" stroke="#10b981"/>
        <text x="50" y="172" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#a7f3d0">Transmitted 7-bit Codeword: [p1 p2 d1 p4 d2 d3 d4] = [0 1 1 0 0 1 1]</text>

        <text x="40" y="210" font-family="system-ui, sans-serif" font-size="12" fill="#fca5a5">2. Channel Noise corrupts Bit 5 (d2 changes from 0 -> 1):</text>
        <text x="60" y="235" font-family="system-ui, sans-serif" font-size="11" font-family="monospace" fill="#f87171">Received Codeword r = [0 1 1 0 1 1 1] (b5 is in error)</text>

        <text x="40" y="265" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">3. Receiver computes syndrome S = (s3 s2 s1)2:</text>
        <text x="60" y="290" font-family="system-ui, sans-serif" font-size="11" font-family="monospace" fill="#fde68a">s1 = b1⊕b3⊕b5⊕b7 = 0⊕1⊕1⊕1 = 1 | s2 = b2⊕b3⊕b6⊕b7 = 1⊕1⊕1⊕1 = 0 | s3 = b4⊕b5⊕b6⊕b7 = 0⊕1⊕1⊕1 = 1</text>
        <text x="60" y="315" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#34d399">Syndrome S = (1 0 1)2 = 5 in decimal -> Bit 5 is inverted back (1 -> 0) -> Data restored!</text>
      </g>
    `)
  },
  // 8. crc-encoder-decoder.svg
  {
    path: 'assets/images/unit2/topic1/crc-encoder-decoder.svg',
    svg: makeSvg(900, 480, "Hardware Architecture of CRC Encoders & Decoders", "Linear Feedback Shift Register (LFSR) with XOR Logic Gates", `
      <g transform="translate(60, 20)">
        <rect width="780" height="340" rx="10" fill="url(#blueCard)" stroke="#3b82f6" stroke-width="1.5"/>
        <text x="390" y="35" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#93c5fd" text-anchor="middle">LFSR HARDWARE CRC ENGINE (G(x) = x^3 + x + 1)</text>
        <g transform="translate(80, 70)">
          <!-- Flip Flops -->
          <rect x="50" y="60" width="80" height="60" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
          <text x="90" y="95" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#fff" text-anchor="middle">FF 0</text>
          
          <rect x="250" y="60" width="80" height="60" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
          <text x="290" y="95" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#fff" text-anchor="middle">FF 1</text>
          
          <rect x="450" y="60" width="80" height="60" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
          <text x="490" y="95" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#fff" text-anchor="middle">FF 2</text>

          <!-- XOR Gates -->
          <circle cx="200" cy="90" r="15" fill="#f59e0b"/>
          <text x="200" y="94" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#0f172a" text-anchor="middle">⊕</text>

          <circle cx="400" cy="90" r="15" fill="#f59e0b"/>
          <text x="400" y="94" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#0f172a" text-anchor="middle">⊕</text>

          <!-- Interconnect lines -->
          <line x1="0" y1="90" x2="50" y2="90" stroke="#38bdf8" stroke-width="2"/>
          <line x1="130" y1="90" x2="185" y2="90" stroke="#38bdf8" stroke-width="2"/>
          <line x1="215" y1="90" x2="250" y2="90" stroke="#38bdf8" stroke-width="2"/>
          <line x1="330" y1="90" x2="385" y2="90" stroke="#38bdf8" stroke-width="2"/>
          <line x1="415" y1="90" x2="450" y2="90" stroke="#38bdf8" stroke-width="2"/>
          <line x1="530" y1="90" x2="600" y2="90" stroke="#38bdf8" stroke-width="2"/>
        </g>
        <text x="390" y="235" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fde68a" text-anchor="middle">Shift Register Clock Cycle executes Modulo-2 division in real-time at wire speed.</text>
        <text x="390" y="260" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">After k clock pulses with appended zeros, the flip-flops hold the remainder (CRC trailer).</text>
      </g>
    `)
  },
  // 9. crc-generator-polynomials.svg
  {
    path: 'assets/images/unit2/topic1/crc-generator-polynomials.svg',
    svg: makeSvg(900, 480, "Standard CRC Generator Polynomials (ITU / IEEE / ANSI)", "CRC-8 • CRC-16-IBM • CRC-CCITT • CRC-32 (Ethernet & Wi-Fi Standard)", `
      <g transform="translate(40, 20)">
        <rect width="820" height="340" rx="10" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
        <rect x="0" y="0" width="820" height="40" rx="10" fill="#1e293b"/>
        <text x="100" y="26" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#93c5fd" text-anchor="middle">STANDARD</text>
        <text x="320" y="26" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#38bdf8" text-anchor="middle">GENERATOR POLYNOMIAL G(x)</text>
        <text x="590" y="26" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#a7f3d0" text-anchor="middle">DEGREE &amp; APPLICATION</text>

        <!-- CRC-8 -->
        <line x1="0" y1="40" x2="820" y2="40" stroke="#334155"/>
        <text x="100" y="70" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">CRC-8 (ATM)</text>
        <text x="320" y="70" font-family="system-ui, sans-serif" font-size="11" font-family="monospace" fill="#cbd5e1" text-anchor="middle">x^8 + x^2 + x + 1</text>
        <text x="590" y="70" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">r = 8 bits • ATM Cell Header Error Control</text>

        <!-- CRC-16 -->
        <line x1="0" y1="95" x2="820" y2="95" stroke="#334155"/>
        <text x="100" y="125" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">CRC-16-IBM</text>
        <text x="320" y="125" font-family="system-ui, sans-serif" font-size="11" font-family="monospace" fill="#cbd5e1" text-anchor="middle">x^16 + x^15 + x^2 + 1</text>
        <text x="590" y="125" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">r = 16 bits • USB, Modbus, ANSI Data Links</text>

        <!-- CRC-CCITT -->
        <line x1="0" y1="150" x2="820" y2="150" stroke="#334155"/>
        <text x="100" y="180" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">CRC-CCITT</text>
        <text x="320" y="180" font-family="system-ui, sans-serif" font-size="11" font-family="monospace" fill="#cbd5e1" text-anchor="middle">x^16 + x^12 + x^5 + 1</text>
        <text x="590" y="180" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">r = 16 bits • HDLC, X.25, Bluetooth</text>

        <!-- CRC-32 -->
        <line x1="0" y1="205" x2="820" y2="205" stroke="#334155"/>
        <text x="100" y="240" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#38bdf8" text-anchor="middle">CRC-32 (IEEE)</text>
        <text x="320" y="240" font-family="system-ui, sans-serif" font-size="10" font-family="monospace" fill="#38bdf8" text-anchor="middle">x^32 + x^26 + x^23 + x^22 + x^16 + x^12 + ... + 1</text>
        <text x="590" y="240" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#34d399" text-anchor="middle">r = 32 bits • IEEE 802.3 Ethernet &amp; 802.11 Wi-Fi</text>
        <text x="410" y="295" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1" text-anchor="middle">CRC-32 detects all bursts up to 32 bits, all 1 &amp; 2 bit errors, and 99.99999998% of longer bursts.</text>
      </g>
    `)
  },
  // 10. crc-binary-division-stepwise.svg
  {
    path: 'assets/images/unit2/topic1/crc-binary-division-stepwise.svg',
    svg: makeSvg(900, 480, "Step-by-Step CRC Binary Modulo-2 Long Division", "Data = 100100, Generator G = 1101 (Degree 3) -> Append 000 -> Remainder = 001", `
      <g transform="translate(60, 20)">
        <rect width="780" height="340" rx="10" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
        <text x="40" y="35" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#38bdf8">STEPWISE DIVISION: 100100 000  ÷  1101</text>
        
        <g transform="translate(60, 60)" font-family="monospace" font-size="13" fill="#cbd5e1">
          <text x="0" y="20">1101 ) 100100000 ( Quotient = 111101</text>
          <text x="50" y="45" fill="#94a3b8">1101</text>
          <text x="50" y="55">----- [XOR]</text>
          <text x="50" y="75">01000</text>
          <text x="60" y="95" fill="#94a3b8">1101</text>
          <text x="60" y="105">---- [XOR]</text>
          <text x="60" y="125">01010</text>
          <text x="70" y="145" fill="#94a3b8">1101</text>
          <text x="70" y="155">---- [XOR]</text>
          <text x="70" y="175">01110</text>
          <text x="80" y="195" fill="#94a3b8">1101</text>
          <text x="80" y="205">---- [XOR]</text>
          <text x="80" y="225">00110 -> Bring down 0 -> 01100</text>
          <text x="80" y="245" fill="#34d399" font-weight="bold">Final Remainder FCS = 0 0 1</text>
        </g>
        <rect x="520" y="90" width="280" height="180" rx="8" fill="#1e293b" stroke="#10b981"/>
        <text x="660" y="120" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#a7f3d0" text-anchor="middle">TRANSMITTED FRAME</text>
        <text x="660" y="155" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">Original Data = 100100</text>
        <text x="660" y="180" font-family="system-ui, sans-serif" font-size="11" fill="#fde68a" text-anchor="middle">CRC Checksum = 001</text>
        <rect x="540" y="200" width="240" height="35" rx="5" fill="#047857"/>
        <text x="660" y="222" font-family="system-ui, sans-serif" font-size="12" font-family="monospace" font-weight="bold" fill="#fff" text-anchor="middle">Codeword: 100100001</text>
      </g>
    `)
  },
  // 11. crc-numerical-error-syndrome.svg
  {
    path: 'assets/images/unit2/topic1/crc-numerical-error-syndrome.svg',
    svg: makeSvg(900, 480, "CRC Receiver Error Syndrome Verification", "Dividing Codeword by G(x): Syndrome = 000 (Valid) vs Syndrome ≠ 000 (Corrupted)", `
      <g transform="translate(40, 20)">
        <rect width="400" height="340" rx="10" fill="url(#emeraldCard)" stroke="#10b981" stroke-width="2"/>
        <text x="200" y="35" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#a7f3d0" text-anchor="middle">CLEAN RECEPTION (NO ERROR)</text>
        <text x="40" y="70" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">Received: 100100001</text>
        <text x="40" y="95" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">Divisor:  1101</text>
        <rect x="30" y="125" width="340" height="80" rx="6" fill="#0f172a" stroke="#10b981"/>
        <text x="200" y="155" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#cbd5e1" text-anchor="middle">Modulo-2 Division Remainder:</text>
        <text x="200" y="185" font-family="system-ui, sans-serif" font-size="16" font-family="monospace" font-weight="800" fill="#34d399" text-anchor="middle">Syndrome = 0 0 0</text>
        <text x="200" y="240" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#a7f3d0" text-anchor="middle">RESULT: FRAME ACCEPTED ✓</text>
        <text x="200" y="265" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">Pass clean payload to Network Layer</text>
      </g>
      <g transform="translate(460, 20)">
        <rect width="400" height="340" rx="10" fill="url(#amberCard)" stroke="#ef4444" stroke-width="2"/>
        <text x="200" y="35" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#fca5a5" text-anchor="middle">CORRUPTED RECEPTION (BIT FLIP)</text>
        <text x="40" y="70" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">Received: 100100101 (Bit 7 flipped)</text>
        <text x="40" y="95" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">Divisor:  1101</text>
        <rect x="30" y="125" width="340" height="80" rx="6" fill="#0f172a" stroke="#ef4444"/>
        <text x="200" y="155" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#cbd5e1" text-anchor="middle">Modulo-2 Division Remainder:</text>
        <text x="200" y="185" font-family="system-ui, sans-serif" font-size="16" font-family="monospace" font-weight="800" fill="#ef4444" text-anchor="middle">Syndrome = 1 1 0  (≠ 0)</text>
        <text x="200" y="240" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#f87171" text-anchor="middle">RESULT: FRAME DISCARDED ✗</text>
        <text x="200" y="265" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">CRC failure detected; trigger ARQ retransmission</text>
      </g>
    `)
  },
  // 12. sliding-window-vs-stop-and-wait-chart.svg
  {
    path: 'assets/images/unit2/topic2/sliding-window-vs-stop-and-wait-chart.svg',
    svg: makeSvg(900, 480, "Protocol Performance: Stop-and-Wait vs Sliding Window", "Link Utilization Comparison as Bandwidth-Delay Product (a = T_prop / T_trans) Increases", `
      <g transform="translate(60, 20)">
        <rect width="780" height="340" rx="10" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
        <text x="390" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc" text-anchor="middle">EFFICIENCY FORMULAS &amp; UTILIZATION (U)</text>
        <g transform="translate(60, 60)">
          <rect x="0" y="0" width="310" height="120" rx="8" fill="url(#blueCard)" stroke="#3b82f6"/>
          <text x="155" y="30" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#93c5fd" text-anchor="middle">Stop-and-Wait ARQ</text>
          <text x="155" y="65" font-family="system-ui, sans-serif" font-size="16" font-weight="900" fill="#38bdf8" text-anchor="middle">U = 1 / (1 + 2a)</text>
          <text x="155" y="95" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1" text-anchor="middle">High latency (large a) collapses throughput to &lt; 5%</text>

          <rect x="350" y="0" width="310" height="120" rx="8" fill="url(#emeraldCard)" stroke="#10b981"/>
          <text x="505" y="30" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#a7f3d0" text-anchor="middle">Sliding Window (Pipeling)</text>
          <text x="505" y="65" font-family="system-ui, sans-serif" font-size="16" font-weight="900" fill="#34d399" text-anchor="middle">U = min(1,  W / (1 + 2a))</text>
          <text x="505" y="95" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1" text-anchor="middle">When W ≥ 1 + 2a, Utilization achieves 100%!</text>
        </g>
        <rect x="60" y="200" width="660" height="100" rx="8" fill="#0f172a" stroke="#334155"/>
        <text x="390" y="230" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fde68a" text-anchor="middle">WHERE: a = Propagation Time / Transmission Time = (d / s) / (L / R)</text>
        <text x="390" y="255" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">In satellite or gigabit long-haul pipes, W must be sized to fill the Bandwidth-Delay Product (BDP).</text>
        <text x="390" y="280" font-family="system-ui, sans-serif" font-size="10" fill="#94a3b8" text-anchor="middle">Go-Back-N (Ws = 2^m - 1, Wr = 1) • Selective Repeat (Ws = Wr = 2^(m-1))</text>
      </g>
    `)
  }
];

list.forEach(item => {
  const fullPath = path.join(__dirname, '..', item.path);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(fullPath, item.svg, 'utf8');
  console.log('Created SVG:', item.path, `(${fs.statSync(fullPath).size} bytes)`);
});

console.log('Successfully created all 12 missing Unit 2 SVGs!');

