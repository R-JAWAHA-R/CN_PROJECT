const fs = require('fs');
const path = require('path');

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

ensureDir('assets/images/unit2/topic1');
ensureDir('assets/images/unit2/topic2');
ensureDir('assets/images/unit2/topic9');

function makeSvg(width, height, title, subtitle, innerContent) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
    <linearGradient id="boxBlue" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2563eb"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
    <linearGradient id="boxGreen" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#059669"/>
      <stop offset="100%" stop-color="#047857"/>
    </linearGradient>
    <linearGradient id="boxAmber" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#d97706"/>
      <stop offset="100%" stop-color="#b45309"/>
    </linearGradient>
    <linearGradient id="boxPurple" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7c3aed"/>
      <stop offset="100%" stop-color="#6d28d9"/>
    </linearGradient>
    <linearGradient id="boxRed" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#dc2626"/>
      <stop offset="100%" stop-color="#b91c1c"/>
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.3"/>
    </filter>
  </defs>
  <rect width="${width}" height="${height}" rx="16" fill="url(#bgGrad)"/>
  <rect x="2" y="2" width="${width-4}" height="${height-4}" rx="14" fill="none" stroke="#334155" stroke-width="1.5"/>
  <text x="30" y="42" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="bold" fill="#f8fafc">${title}</text>
  <text x="30" y="66" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="#94a3b8">${subtitle}</text>
  ${innerContent}
</svg>`;
}

// 1. Error Detection
const svg1 = makeSvg(800, 420, "Error Detection: Sender to Receiver Model", "Forouzan Ch. 10.1 – Redundancy & Verification", `
  <!-- Sender -->
  <g transform="translate(40, 110)">
    <rect width="200" height="230" rx="12" fill="#1e293b" stroke="#3b82f6" stroke-width="2" filter="url(#shadow)"/>
    <text x="100" y="32" text-anchor="middle" font-family="system-ui" font-size="15" font-weight="bold" fill="#60a5fa">SENDER NODE</text>
    <rect x="25" y="55" width="150" height="42" rx="6" fill="#334155"/>
    <text x="100" y="81" text-anchor="middle" font-family="system-ui" font-size="13" fill="#f8fafc">Dataword (k bits)</text>
    <path d="M 100 97 L 100 120" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrow)"/>
    <rect x="25" y="120" width="150" height="42" rx="6" fill="url(#boxBlue)"/>
    <text x="100" y="146" text-anchor="middle" font-family="system-ui" font-size="13" font-weight="bold" fill="#ffffff">Generator Function</text>
    <rect x="25" y="175" width="150" height="38" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="100" y="199" text-anchor="middle" font-family="monospace" font-size="12" fill="#38bdf8">Codeword (n bits)</text>
  </g>

  <!-- Channel with Noise -->
  <g transform="translate(270, 195)">
    <line x1="0" y1="30" x2="230" y2="30" stroke="#f59e0b" stroke-width="3" stroke-dasharray="6,4"/>
    <circle cx="115" cy="30" r="26" fill="#dc2626" opacity="0.9" filter="url(#shadow)"/>
    <text x="115" y="27" text-anchor="middle" font-family="system-ui" font-size="10" font-weight="bold" fill="#ffffff">NOISE</text>
    <text x="115" y="40" text-anchor="middle" font-family="system-ui" font-size="9" fill="#fecaca">Bit Flips</text>
    <text x="115" y="80" text-anchor="middle" font-family="system-ui" font-size="12" fill="#fbbf24">Transmission Channel</text>
  </g>

  <!-- Receiver -->
  <g transform="translate(530, 110)">
    <rect width="230" height="255" rx="12" fill="#1e293b" stroke="#10b981" stroke-width="2" filter="url(#shadow)"/>
    <text x="115" y="32" text-anchor="middle" font-family="system-ui" font-size="15" font-weight="bold" fill="#34d399">RECEIVER NODE</text>
    <rect x="25" y="55" width="180" height="38" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="115" y="79" text-anchor="middle" font-family="monospace" font-size="12" fill="#38bdf8">Received (n bits)</text>
    <rect x="25" y="105" width="180" height="42" rx="6" fill="url(#boxGreen)"/>
    <text x="115" y="131" text-anchor="middle" font-family="system-ui" font-size="13" font-weight="bold" fill="#ffffff">Checker / Verifier</text>
    <g transform="translate(35, 165)">
      <rect width="70" height="32" rx="6" fill="#059669"/>
      <text x="35" y="21" text-anchor="middle" font-family="system-ui" font-size="11" font-weight="bold" fill="#ffffff">Valid: ACK</text>
      <rect x="90" width="70" height="32" rx="6" fill="#dc2626"/>
      <text x="125" y="21" text-anchor="middle" font-family="system-ui" font-size="11" font-weight="bold" fill="#ffffff">Error: Drop</text>
    </g>
    <text x="115" y="228" text-anchor="middle" font-family="system-ui" font-size="11" fill="#94a3b8">Binary Decision: Correct / Corrupted</text>
  </g>
`);

// 2. Error Correction
const svg2 = makeSvg(800, 420, "Forward Error Correction (FEC) Architecture", "Forouzan Ch. 10.1 – Reconstructing Bits Without Retransmission", `
  <g transform="translate(50, 110)">
    <rect width="320" height="240" rx="12" fill="#1e293b" stroke="#8b5cf6" stroke-width="2" filter="url(#shadow)"/>
    <text x="160" y="32" text-anchor="middle" font-family="system-ui" font-size="15" font-weight="bold" fill="#c084fc">FEC ENCODER (Sender)</text>
    <rect x="25" y="55" width="270" height="42" rx="6" fill="#334155"/>
    <text x="160" y="81" text-anchor="middle" font-family="system-ui" font-size="13" fill="#f8fafc">Source Message: k data bits</text>
    <rect x="25" y="115" width="270" height="42" rx="6" fill="url(#boxPurple)"/>
    <text x="160" y="141" text-anchor="middle" font-family="system-ui" font-size="13" font-weight="bold" fill="#ffffff">Adds r Redundant Check Bits</text>
    <rect x="25" y="175" width="270" height="40" rx="6" fill="#0f172a" stroke="#a855f7" stroke-width="1.5"/>
    <text x="160" y="200" text-anchor="middle" font-family="monospace" font-size="13" fill="#d8b4fe">Codeword = [Data (k) | Parity (r)]</text>
  </g>

  <g transform="translate(430, 110)">
    <rect width="320" height="240" rx="12" fill="#1e293b" stroke="#10b981" stroke-width="2" filter="url(#shadow)"/>
    <text x="160" y="32" text-anchor="middle" font-family="system-ui" font-size="15" font-weight="bold" fill="#34d399">FEC DECODER (Receiver)</text>
    <rect x="25" y="55" width="270" height="42" rx="6" fill="#334155"/>
    <text x="160" y="81" text-anchor="middle" font-family="system-ui" font-size="13" fill="#f8fafc">Corrupted Codeword Received</text>
    <rect x="25" y="115" width="270" height="42" rx="6" fill="url(#boxGreen)"/>
    <text x="160" y="141" text-anchor="middle" font-family="system-ui" font-size="13" font-weight="bold" fill="#ffffff">Syndrome Computation & Locator</text>
    <rect x="25" y="175" width="270" height="40" rx="6" fill="#0f172a" stroke="#34d399" stroke-width="1.5"/>
    <text x="160" y="200" text-anchor="middle" font-family="monospace" font-size="13" fill="#86efac">Exact Original Data Restored ✓</text>
  </g>
  <path d="M 370 230 L 430 230" stroke="#f59e0b" stroke-width="3" stroke-dasharray="4,4"/>
`);

// 3. Hamming Distance
const svg3 = makeSvg(800, 420, "Hamming Distance & Detection/Correction Bounds", "Forouzan Ch. 10.2 – Geometric Sphere Packing Analysis", `
  <g transform="translate(60, 100)">
    <!-- Codeword Sphere 1 -->
    <circle cx="160" cy="150" r="110" fill="#2563eb" fill-opacity="0.15" stroke="#3b82f6" stroke-width="2" stroke-dasharray="5,5"/>
    <circle cx="160" cy="150" r="55" fill="#2563eb" fill-opacity="0.3" stroke="#2563eb" stroke-width="2"/>
    <circle cx="160" cy="150" r="8" fill="#60a5fa"/>
    <text x="160" y="130" text-anchor="middle" font-family="monospace" font-size="14" font-weight="bold" fill="#ffffff">Codeword C1</text>
    <text x="160" y="195" text-anchor="middle" font-family="system-ui" font-size="11" fill="#93c5fd">Radius t (Correction)</text>
    <text x="160" y="240" text-anchor="middle" font-family="system-ui" font-size="11" fill="#60a5fa">Radius s (Detection)</text>
  </g>

  <g transform="translate(420, 100)">
    <!-- Codeword Sphere 2 -->
    <circle cx="160" cy="150" r="110" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-width="2" stroke-dasharray="5,5"/>
    <circle cx="160" cy="150" r="55" fill="#10b981" fill-opacity="0.3" stroke="#059669" stroke-width="2"/>
    <circle cx="160" cy="150" r="8" fill="#34d399"/>
    <text x="160" y="130" text-anchor="middle" font-family="monospace" font-size="14" font-weight="bold" fill="#ffffff">Codeword C2</text>
    <text x="160" y="195" text-anchor="middle" font-family="system-ui" font-size="11" fill="#a7f3d0">Radius t (Correction)</text>
    <text x="160" y="240" text-anchor="middle" font-family="system-ui" font-size="11" fill="#34d399">Radius s (Detection)</text>
  </g>

  <!-- Distance Line -->
  <line x1="220" y1="250" x2="580" y2="250" stroke="#f59e0b" stroke-width="2"/>
  <rect x="330" y="235" width="140" height="30" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="400" y="255" text-anchor="middle" font-family="monospace" font-size="13" font-weight="bold" fill="#fbbf24">d_min ≥ 2t + 1</text>

  <!-- Summary Box -->
  <g transform="translate(100, 340)">
    <rect width="600" height="50" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
    <text x="300" y="25" text-anchor="middle" font-family="system-ui" font-size="12" fill="#e2e8f0">To Detect s errors: <tspan fill="#38bdf8" font-weight="bold">d_min ≥ s + 1</tspan>  |  To Correct t errors: <tspan fill="#34d399" font-weight="bold">d_min ≥ 2t + 1</tspan></text>
    <text x="300" y="42" text-anchor="middle" font-family="system-ui" font-size="11" fill="#94a3b8">Disjoint sphere condition guarantees unambiguous decision boundary</text>
  </g>
`);

// 4. Hamming Code Layout
const svg4 = makeSvg(800, 420, "Hamming Code (7,4) Bit Layout & Parity Coverage", "Forouzan Ch. 10.3 – Powers-of-2 Position Allocation", `
  <g transform="translate(40, 110)">
    <!-- 7 Slots -->
    <rect x="0" y="40" width="720" height="70" rx="10" fill="#1e293b" stroke="#475569" stroke-width="2"/>
    ${[
      { pos: 1, type: "P1", isP: true, x: 15 },
      { pos: 2, type: "P2", isP: true, x: 115 },
      { pos: 3, type: "D3", isP: false, x: 215 },
      { pos: 4, type: "P4", isP: true, x: 315 },
      { pos: 5, type: "D5", isP: false, x: 415 },
      { pos: 6, type: "D6", isP: false, x: 515 },
      { pos: 7, type: "D7", isP: false, x: 615 }
    ].map(b => `
      <g transform="translate(${b.x}, 48)">
        <rect width="85" height="54" rx="6" fill="${b.isP ? 'url(#boxAmber)' : 'url(#boxBlue)'}"/>
        <text x="42" y="24" text-anchor="middle" font-family="monospace" font-size="14" font-weight="bold" fill="#ffffff">${b.type}</text>
        <text x="42" y="44" text-anchor="middle" font-family="system-ui" font-size="10" fill="#f1f5f9">Bit Pos ${b.pos}</text>
      </g>
    `).join('')}
  </g>

  <!-- Parity Coverage Sets -->
  <g transform="translate(60, 240)">
    <rect width="680" height="135" rx="10" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
    <text x="25" y="30" font-family="monospace" font-size="13" font-weight="bold" fill="#fbbf24">P1 (Pos 1, binary xx1):</text>
    <text x="230" y="30" font-family="system-ui" font-size="13" fill="#cbd5e1">Checks bits 1, 3, 5, 7  →  P1 = D3 ⊕ D5 ⊕ D7</text>

    <text x="25" y="65" font-family="monospace" font-size="13" font-weight="bold" fill="#fbbf24">P2 (Pos 2, binary x1x):</text>
    <text x="230" y="65" font-family="system-ui" font-size="13" fill="#cbd5e1">Checks bits 2, 3, 6, 7  →  P2 = D3 ⊕ D6 ⊕ D7</text>

    <text x="25" y="100" font-family="monospace" font-size="13" font-weight="bold" fill="#fbbf24">P4 (Pos 4, binary 1xx):</text>
    <text x="230" y="100" font-family="system-ui" font-size="13" fill="#cbd5e1">Checks bits 4, 5, 6, 7  →  P4 = D5 ⊕ D6 ⊕ D7</text>
    
    <text x="25" y="125" font-family="system-ui" font-size="11" fill="#94a3b8">Syndrome S = (s4 s2 s1)_2 identifies the exact bit position in error (0 = no error)</text>
  </g>
`);

// 5. CRC Modulo-2 Division
const svg5 = makeSvg(800, 420, "Cyclic Redundancy Check (CRC) Modulo-2 Arithmetic", "Forouzan Ch. 10.4 – Polynomial Generator & Shift-XOR Division", `
  <g transform="translate(50, 100)">
    <rect width="330" height="270" rx="10" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="165" y="30" text-anchor="middle" font-family="system-ui" font-size="14" font-weight="bold" fill="#60a5fa">SENDER (Division)</text>
    <text x="20" y="65" font-family="monospace" font-size="12" fill="#cbd5e1">Dataword:     100100</text>
    <text x="20" y="90" font-family="monospace" font-size="12" fill="#cbd5e1">Divisor G(x): 1101 (degree 3)</text>
    <text x="20" y="115" font-family="monospace" font-size="12" fill="#fbbf24">Appended:     100100 000</text>
    <rect x="20" y="130" width="290" height="65" rx="6" fill="#0f172a"/>
    <text x="30" y="152" font-family="monospace" font-size="11" fill="#38bdf8">Modulo-2 Division (XOR):</text>
    <text x="30" y="172" font-family="monospace" font-size="11" fill="#a7f3d0">Remainder (FCS) = 001</text>
    <rect x="20" y="210" width="290" height="38" rx="6" fill="url(#boxGreen)"/>
    <text x="165" y="234" text-anchor="middle" font-family="monospace" font-size="13" font-weight="bold" fill="#ffffff">Codeword: 100100 001</text>
  </g>

  <g transform="translate(420, 100)">
    <rect width="330" height="270" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="165" y="30" text-anchor="middle" font-family="system-ui" font-size="14" font-weight="bold" fill="#34d399">RECEIVER (Verification)</text>
    <text x="20" y="65" font-family="monospace" font-size="12" fill="#cbd5e1">Received:     100100 001</text>
    <text x="20" y="90" font-family="monospace" font-size="12" fill="#cbd5e1">Divisor G(x): 1101</text>
    <rect x="20" y="115" width="290" height="80" rx="6" fill="#0f172a"/>
    <text x="30" y="140" font-family="monospace" font-size="11" fill="#38bdf8">Divide Received by G(x):</text>
    <text x="30" y="162" font-family="monospace" font-size="12" font-weight="bold" fill="#34d399">Syndrome Remainder = 000 ✓</text>
    <text x="30" y="182" font-family="system-ui" font-size="10" fill="#94a3b8">Remainder 0 → No error detected</text>
    <rect x="20" y="210" width="290" height="38" rx="6" fill="url(#boxBlue)"/>
    <text x="165" y="234" text-anchor="middle" font-family="system-ui" font-size="13" font-weight="bold" fill="#ffffff">Deliver Dataword to Network Layer</text>
  </g>
`);

// 6. Sliding Window Protocol Sender & Receiver
const svg6 = makeSvg(800, 420, "Sliding Window Protocol: Window Frames & Pointers", "Forouzan Ch. 11.5 – Sequence Modulo 2^m & Dynamic Slide", `
  <!-- Sender Window -->
  <g transform="translate(50, 100)">
    <text x="0" y="25" font-family="system-ui" font-size="15" font-weight="bold" fill="#60a5fa">SENDER WINDOW (Size W = 4, Modulo 8)</text>
    <rect x="0" y="45" width="700" height="65" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
    <!-- Boxes 0 to 7 -->
    ${[0,1,2,3,4,5,6,7].map((n, i) => {
      let bg = "#334155";
      let border = "none";
      let status = "Not Sent";
      if (n === 0 || n === 1) { bg = "#065f46"; status = "Sent/ACKed"; }
      else if (n === 2 || n === 3) { bg = "#1e40af"; status = "Outstanding"; }
      else if (n === 4 || n === 5) { bg = "#92400e"; status = "Usable"; }
      return `
        <g transform="translate(${20 + i*82}, 53)">
          <rect width="72" height="49" rx="6" fill="${bg}"/>
          <text x="36" y="24" text-anchor="middle" font-family="monospace" font-size="14" font-weight="bold" fill="#ffffff">${n}</text>
          <text x="36" y="40" text-anchor="middle" font-family="system-ui" font-size="9" fill="#e2e8f0">${status}</text>
        </g>
      `;
    }).join('')}
    <!-- Sliding Window Outline -->
    <rect x="180" y="40" width="335" height="75" rx="10" fill="none" stroke="#f59e0b" stroke-width="3" stroke-dasharray="8,4"/>
    <text x="345" y="135" text-anchor="middle" font-family="system-ui" font-size="12" font-weight="bold" fill="#fbbf24">Current Sender Window [2, 3, 4, 5]</text>
  </g>

  <!-- Pointers -->
  <g transform="translate(60, 260)">
    <rect width="680" height="115" rx="10" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
    <text x="25" y="30" font-family="monospace" font-size="13" font-weight="bold" fill="#60a5fa">S_f (Oldest unacknowledged frame) = 2:</text>
    <text x="360" y="30" font-family="system-ui" font-size="12" fill="#cbd5e1">Left boundary of the window</text>

    <text x="25" y="60" font-family="monospace" font-size="13" font-weight="bold" fill="#34d399">S_n (Next frame to transmit) = 4:</text>
    <text x="360" y="60" font-family="system-ui" font-size="12" fill="#cbd5e1">Frames 2 and 3 sent, awaiting ACKs</text>

    <text x="25" y="90" font-family="monospace" font-size="13" font-weight="bold" fill="#f59e0b">When ACK 3 arrives:</text>
    <text x="360" y="90" font-family="system-ui" font-size="12" fill="#fbbf24">S_f advances to 3; window slides right to [3, 4, 5, 6]</text>
  </g>
`);

// 7. Simplex Variations
const svg7 = makeSvg(800, 420, "Simplex Protocols Evolution: Noiseless to ARQ", "Forouzan Ch. 11.4–11.5 – Progression of Data Link Layer Protocols", `
  <!-- 1. Unrestricted -->
  <g transform="translate(40, 100)">
    <rect width="220" height="270" rx="10" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="110" y="30" text-anchor="middle" font-family="system-ui" font-size="13" font-weight="bold" fill="#60a5fa">1. Unrestricted Simplex</text>
    <text x="110" y="48" text-anchor="middle" font-family="system-ui" font-size="10" fill="#94a3b8">(Simplest Protocol)</text>
    <rect x="20" y="65" width="180" height="50" rx="6" fill="#0f172a"/>
    <text x="110" y="88" text-anchor="middle" font-family="system-ui" font-size="11" fill="#e2e8f0">Ideal channel (No noise)</text>
    <text x="110" y="104" text-anchor="middle" font-family="system-ui" font-size="10" fill="#38bdf8">Infinite buffer capacity</text>
    <path d="M 110 120 L 110 150" stroke="#60a5fa" stroke-width="2"/>
    <rect x="20" y="150" width="180" height="40" rx="6" fill="url(#boxBlue)"/>
    <text x="110" y="174" text-anchor="middle" font-family="system-ui" font-size="11" font-weight="bold" fill="#ffffff">One-way transmission</text>
    <text x="110" y="215" text-anchor="middle" font-family="system-ui" font-size="10" fill="#f87171">No Flow Control</text>
    <text x="110" y="235" text-anchor="middle" font-family="system-ui" font-size="10" fill="#f87171">No Error Control</text>
  </g>

  <!-- 2. Stop-and-Wait -->
  <g transform="translate(290, 100)">
    <rect width="220" height="270" rx="10" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="110" y="30" text-anchor="middle" font-family="system-ui" font-size="13" font-weight="bold" fill="#fbbf24">2. Stop-and-Wait</text>
    <text x="110" y="48" text-anchor="middle" font-family="system-ui" font-size="10" fill="#94a3b8">(Noiseless Flow Control)</text>
    <rect x="20" y="65" width="180" height="50" rx="6" fill="#0f172a"/>
    <text x="110" y="88" text-anchor="middle" font-family="system-ui" font-size="11" fill="#e2e8f0">Finite receiver buffer</text>
    <text x="110" y="104" text-anchor="middle" font-family="system-ui" font-size="10" fill="#fbbf24">Channel still ideal</text>
    <path d="M 110 120 L 110 150" stroke="#f59e0b" stroke-width="2"/>
    <rect x="20" y="150" width="180" height="40" rx="6" fill="url(#boxAmber)"/>
    <text x="110" y="174" text-anchor="middle" font-family="system-ui" font-size="11" font-weight="bold" fill="#ffffff">Explicit ACK required</text>
    <text x="110" y="215" text-anchor="middle" font-family="system-ui" font-size="10" fill="#34d399">Flow Control Added ✓</text>
    <text x="110" y="235" text-anchor="middle" font-family="system-ui" font-size="10" fill="#f87171">No Error Control</text>
  </g>

  <!-- 3. Stop-and-Wait ARQ -->
  <g transform="translate(540, 100)">
    <rect width="220" height="270" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="110" y="30" text-anchor="middle" font-family="system-ui" font-size="13" font-weight="bold" fill="#34d399">3. Stop-and-Wait ARQ</text>
    <text x="110" y="48" text-anchor="middle" font-family="system-ui" font-size="10" fill="#94a3b8">(Noisy Channel Protocol)</text>
    <rect x="20" y="65" width="180" height="50" rx="6" fill="#0f172a"/>
    <text x="110" y="88" text-anchor="middle" font-family="system-ui" font-size="11" fill="#e2e8f0">Loss, damage, duplicates</text>
    <text x="110" y="104" text-anchor="middle" font-family="system-ui" font-size="10" fill="#34d399">Real-world channels</text>
    <path d="M 110 120 L 110 150" stroke="#10b981" stroke-width="2"/>
    <rect x="20" y="150" width="180" height="40" rx="6" fill="url(#boxGreen)"/>
    <text x="110" y="174" text-anchor="middle" font-family="system-ui" font-size="11" font-weight="bold" fill="#ffffff">Timer + 1-Bit Seq #</text>
    <text x="110" y="215" text-anchor="middle" font-family="system-ui" font-size="10" fill="#34d399">Flow Control Added ✓</text>
    <text x="110" y="235" text-anchor="middle" font-family="system-ui" font-size="10" fill="#34d399">Error Control Added ✓</text>
  </g>
`);

// 8. Bridge Uses and Network Segmentation
const svg8 = makeSvg(800, 420, "Bridge: Network Segmentation & Collision Domain Isolation", "Forouzan Ch. 15.1 – Connecting LAN Segments with Traffic Filtering", `
  <!-- Segment 1 -->
  <g transform="translate(40, 110)">
    <rect width="260" height="230" rx="10" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="4,4"/>
    <text x="130" y="28" text-anchor="middle" font-family="system-ui" font-size="13" font-weight="bold" fill="#60a5fa">COLLISION DOMAIN 1</text>
    <rect x="25" y="45" width="210" height="42" rx="6" fill="#0f172a"/>
    <text x="130" y="70" text-anchor="middle" font-family="system-ui" font-size="12" fill="#e2e8f0">Host A (MAC: 00:11)</text>
    <rect x="25" y="100" width="210" height="42" rx="6" fill="#0f172a"/>
    <text x="130" y="125" text-anchor="middle" font-family="system-ui" font-size="12" fill="#e2e8f0">Host B (MAC: 00:22)</text>
    <text x="130" y="175" text-anchor="middle" font-family="system-ui" font-size="11" fill="#93c5fd">Local LAN Segment (100 Mbps)</text>
    <text x="130" y="195" text-anchor="middle" font-family="system-ui" font-size="10" fill="#38bdf8">Internal traffic filtered locally</text>
  </g>

  <!-- Bridge in Center -->
  <g transform="translate(325, 120)">
    <rect width="150" height="210" rx="12" fill="url(#boxAmber)" filter="url(#shadow)"/>
    <text x="75" y="32" text-anchor="middle" font-family="system-ui" font-size="15" font-weight="bold" fill="#ffffff">BRIDGE</text>
    <text x="75" y="52" text-anchor="middle" font-family="system-ui" font-size="11" fill="#fef3c7">(Layer 2 Device)</text>
    <rect x="15" y="68" width="120" height="65" rx="6" fill="#1e293b"/>
    <text x="75" y="90" text-anchor="middle" font-family="system-ui" font-size="10" font-weight="bold" fill="#fcd34d">Forwarding Table</text>
    <text x="75" y="108" text-anchor="middle" font-family="monospace" font-size="9" fill="#cbd5e1">00:11 → Port 1</text>
    <text x="75" y="122" text-anchor="middle" font-family="monospace" font-size="9" fill="#cbd5e1">00:33 → Port 2</text>
    <rect x="15" y="145" width="120" height="45" rx="6" fill="#0f172a"/>
    <text x="75" y="165" text-anchor="middle" font-family="system-ui" font-size="10" font-weight="bold" fill="#34d399">Traffic Filtering</text>
    <text x="75" y="180" text-anchor="middle" font-family="system-ui" font-size="9" fill="#94a3b8">Drops local frames</text>
  </g>

  <!-- Segment 2 -->
  <g transform="translate(500, 110)">
    <rect width="260" height="230" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="1.5" stroke-dasharray="4,4"/>
    <text x="130" y="28" text-anchor="middle" font-family="system-ui" font-size="13" font-weight="bold" fill="#34d399">COLLISION DOMAIN 2</text>
    <rect x="25" y="45" width="210" height="42" rx="6" fill="#0f172a"/>
    <text x="130" y="70" text-anchor="middle" font-family="system-ui" font-size="12" fill="#e2e8f0">Host C (MAC: 00:33)</text>
    <rect x="25" y="100" width="210" height="42" rx="6" fill="#0f172a"/>
    <text x="130" y="125" text-anchor="middle" font-family="system-ui" font-size="12" fill="#e2e8f0">Host D (MAC: 00:44)</text>
    <text x="130" y="175" text-anchor="middle" font-family="system-ui" font-size="11" fill="#6ee7b7">Local LAN Segment (100 Mbps)</text>
    <text x="130" y="195" text-anchor="middle" font-family="system-ui" font-size="10" fill="#34d399">Dedicated bandwidth per segment</text>
  </g>

  <!-- Connecting Lines -->
  <line x1="300" y1="225" x2="325" y2="225" stroke="#f59e0b" stroke-width="3"/>
  <line x1="475" y1="225" x2="500" y2="225" stroke="#f59e0b" stroke-width="3"/>

  <!-- Footer -->
  <text x="400" y="380" text-anchor="middle" font-family="system-ui" font-size="12" fill="#cbd5e1">Bridges divide 1 large collision domain into 2 independent collision domains while maintaining 1 common broadcast domain.</text>
`);

// Write all SVGs
fs.writeFileSync('assets/images/unit2/topic1/error-detection-concept.svg', svg1);
fs.writeFileSync('assets/images/unit2/topic1/error-correction-fec.svg', svg2);
fs.writeFileSync('assets/images/unit2/topic1/hamming-distance-spheres.svg', svg3);
fs.writeFileSync('assets/images/unit2/topic1/hamming-code-bit-layout.svg', svg4);
fs.writeFileSync('assets/images/unit2/topic1/crc-modulo2-division-flow.svg', svg5);
fs.writeFileSync('assets/images/unit2/topic2/sliding-window-frames-pointers.svg', svg6);
fs.writeFileSync('assets/images/unit2/topic2/simplex-protocols-evolution.svg', svg7);
fs.writeFileSync('assets/images/unit2/topic9/bridge-network-segmentation.svg', svg8);

console.log("Successfully generated all dedicated SVGs!");

