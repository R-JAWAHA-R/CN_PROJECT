// scratch/svg_builders_topic2.js
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../assets/images/topic2');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function writeSvg(filename, svgContent) {
  fs.writeFileSync(path.join(outDir, filename), svgContent.trim(), 'utf8');
  console.log(`Created topic2/${filename}`);
}

// 1. DLL Protocol Hierarchy Tree
writeSvg('dll-protocol-hierarchy.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 520" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <rect x="30" y="20" width="840" height="54" rx="10" fill="#0F172A" />
  <text x="50" y="53" fill="#F8FAFC" font-size="18" font-weight="700">Classification of Elementary Data Link Layer Protocols (Forouzan Ch. 11)</text>

  <!-- Root Node -->
  <g transform="translate(325, 95)">
    <rect width="250" height="44" rx="8" fill="#1E293B" stroke="#475569" stroke-width="2" />
    <text x="125" y="27" fill="#F8FAFC" font-size="13" font-weight="700" text-anchor="middle">Data Link Protocols</text>
  </g>

  <!-- Connecting Lines -->
  <path d="M 450 140 L 450 165 L 230 165 L 230 190" fill="none" stroke="#64748B" stroke-width="2" />
  <path d="M 450 165 L 670 165 L 670 190" fill="none" stroke="#64748B" stroke-width="2" />

  <!-- Branch 1: Noiseless Channels -->
  <g transform="translate(100, 190)">
    <rect width="260" height="42" rx="8" fill="#ECFDF5" stroke="#10B981" stroke-width="2" />
    <text x="130" y="26" fill="#065F46" font-size="13" font-weight="700" text-anchor="middle">Protocols for Noiseless Channels</text>
    <line x1="130" y1="42" x2="130" y2="70" stroke="#10B981" stroke-width="2" />
    <!-- Fork -->
    <path d="M 130 70 L 60 70 L 60 95" fill="none" stroke="#10B981" stroke-width="1.5" />
    <path d="M 130 70 L 200 70 L 200 95" fill="none" stroke="#10B981" stroke-width="1.5" />

    <!-- Leaf 1: Simplex -->
    <g transform="translate(-10, 95)">
      <rect width="140" height="70" rx="6" fill="#FFFFFF" stroke="#CBD5E1" />
      <text x="70" y="24" fill="#0F172A" font-size="11" font-weight="bold" text-anchor="middle">Simplest Protocol</text>
      <text x="70" y="42" fill="#64748B" font-size="9" text-anchor="middle">&bull; Unidirectional</text>
      <text x="70" y="56" fill="#64748B" font-size="9" text-anchor="middle">&bull; Infinite buffer assumption</text>
    </g>

    <!-- Leaf 2: Stop-and-Wait -->
    <g transform="translate(130, 95)">
      <rect width="140" height="70" rx="6" fill="#FFFFFF" stroke="#CBD5E1" />
      <text x="70" y="24" fill="#0F172A" font-size="11" font-weight="bold" text-anchor="middle">Stop-and-Wait</text>
      <text x="70" y="42" fill="#64748B" font-size="9" text-anchor="middle">&bull; Half-duplex</text>
      <text x="70" y="56" fill="#64748B" font-size="9" text-anchor="middle">&bull; Explicit ACK required</text>
    </g>
  </g>

  <!-- Branch 2: Noisy Channels (ARQ) -->
  <g transform="translate(480, 190)">
    <rect width="380" height="42" rx="8" fill="#EFF6FF" stroke="#3B82F6" stroke-width="2" />
    <text x="190" y="26" fill="#1E40AF" font-size="13" font-weight="700" text-anchor="middle">Protocols for Noisy Channels (ARQ)</text>
    <line x1="190" y1="42" x2="190" y2="70" stroke="#3B82F6" stroke-width="2" />
    <!-- Three-way Fork -->
    <path d="M 190 70 L 50 70 L 50 95" fill="none" stroke="#3B82F6" stroke-width="1.5" />
    <path d="M 190 70 L 190 95" fill="none" stroke="#3B82F6" stroke-width="1.5" />
    <path d="M 190 70 L 330 70 L 330 95" fill="none" stroke="#3B82F6" stroke-width="1.5" />

    <!-- Leaf 3: Stop-and-Wait ARQ -->
    <g transform="translate(-15, 95)">
      <rect width="130" height="85" rx="6" fill="#FFFFFF" stroke="#CBD5E1" />
      <text x="65" y="22" fill="#1E40AF" font-size="11" font-weight="bold" text-anchor="middle">Stop-and-Wait ARQ</text>
      <text x="65" y="40" fill="#64748B" font-size="8.5" text-anchor="middle">&bull; Window: S_w=1, R_w=1</text>
      <text x="65" y="54" fill="#64748B" font-size="8.5" text-anchor="middle">&bull; 1-bit Seq No (0, 1)</text>
      <text x="65" y="68" fill="#64748B" font-size="8.5" text-anchor="middle">&bull; Retransmit on timeout</text>
    </g>

    <!-- Leaf 4: Go-Back-N ARQ -->
    <g transform="translate(125, 95)">
      <rect width="130" height="85" rx="6" fill="#FFFFFF" stroke="#CBD5E1" />
      <text x="65" y="22" fill="#059669" font-size="11" font-weight="bold" text-anchor="middle">Go-Back-N ARQ</text>
      <text x="65" y="40" fill="#64748B" font-size="8.5" text-anchor="middle">&bull; S_w &le; 2^m - 1, R_w = 1</text>
      <text x="65" y="54" fill="#64748B" font-size="8.5" text-anchor="middle">&bull; Discards out-of-order</text>
      <text x="65" y="68" fill="#64748B" font-size="8.5" text-anchor="middle">&bull; Cumulative ACKs</text>
    </g>

    <!-- Leaf 5: Selective Repeat ARQ -->
    <g transform="translate(265, 95)">
      <rect width="130" height="85" rx="6" fill="#FFFFFF" stroke="#CBD5E1" />
      <text x="65" y="22" fill="#7C3AED" font-size="11" font-weight="bold" text-anchor="middle">Selective Repeat</text>
      <text x="65" y="40" fill="#64748B" font-size="8.5" text-anchor="middle">&bull; S_w = 2^(m-1), R_w = S_w</text>
      <text x="65" y="54" fill="#64748B" font-size="8.5" text-anchor="middle">&bull; Buffers out-of-order</text>
      <text x="65" y="68" fill="#64748B" font-size="8.5" text-anchor="middle">&bull; Retransmit damaged only</text>
    </g>
  </g>

  <!-- Summary Box -->
  <rect x="50" y="405" width="800" height="85" rx="8" fill="#F8FAFC" stroke="#E2E8F0" />
  <text x="70" y="430" fill="#0F172A" font-size="12" font-weight="bold">Core Engineering Takeaway:</text>
  <text x="70" y="450" fill="#475569" font-size="11">Real-world channels are noisy (attenuation, thermal noise, interference). Therefore, practical link layer implementations (HDLC, Wi-Fi 802.11, Cellular LTE/5G RLC) implement ARQ algorithms with sequence numbers, timers, and sliding windows.</text>
</svg>
`);

// 2. Stop-and-Wait ARQ Finite State & Error Cases
writeSvg('stop-and-wait-arq-fsm.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 520" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <rect x="30" y="20" width="840" height="54" rx="10" fill="#0F172A" />
  <text x="50" y="53" fill="#F8FAFC" font-size="18" font-weight="700">Stop-and-Wait ARQ: Normal Flow, Lost Frame &amp; Lost ACK Recovery</text>

  <g transform="translate(40, 95)">
    <!-- Column 1: Normal Operation -->
    <rect x="0" y="0" width="265" height="395" rx="8" fill="#F8FAFC" stroke="#E2E8F0" />
    <rect x="0" y="0" width="265" height="32" rx="8" fill="#ECFDF5" />
    <text x="132" y="21" fill="#065F46" font-size="12" font-weight="bold" text-anchor="middle">Case 1: Normal Transmission</text>
    <!-- Sequence -->
    <g transform="translate(25, 45)">
      <line x1="30" y1="0" x2="30" y2="170" stroke="#94A3B8" stroke-width="1.5" />
      <line x1="185" y1="0" x2="185" y2="170" stroke="#94A3B8" stroke-width="1.5" />
      <text x="30" y="-6" fill="#0F172A" font-size="10" font-weight="bold" text-anchor="middle">Tx</text>
      <text x="185" y="-6" fill="#0F172A" font-size="10" font-weight="bold" text-anchor="middle">Rx</text>
      <!-- Frame 0 -->
      <line x1="30" y1="20" x2="185" y2="50" stroke="#10B981" stroke-width="2" />
      <polygon points="185,50 174,44 176,55" fill="#10B981" />
      <text x="105" y="30" fill="#065F46" font-size="9" font-weight="bold" text-anchor="middle">Frame 0</text>
      <!-- ACK 1 -->
      <line x1="185" y1="65" x2="30" y2="95" stroke="#059669" stroke-width="2" stroke-dasharray="4 2" />
      <polygon points="30,95 41,89 40,100" fill="#059669" />
      <text x="105" y="75" fill="#059669" font-size="9" font-weight="bold" text-anchor="middle">ACK 1</text>
      <!-- Frame 1 -->
      <line x1="30" y1="110" x2="185" y2="140" stroke="#10B981" stroke-width="2" />
      <polygon points="185,140 174,134 176,145" fill="#10B981" />
      <text x="105" y="120" fill="#065F46" font-size="9" font-weight="bold" text-anchor="middle">Frame 1</text>
    </g>
    <rect x="15" y="240" width="235" height="140" rx="6" fill="#FFFFFF" stroke="#CBD5E1" />
    <text x="25" y="260" fill="#0F172A" font-size="10.5" font-weight="bold">Mechanism:</text>
    <text x="25" y="280" fill="#64748B" font-size="9.5">&bull; Sender transmits Frame 0.</text>
    <text x="25" y="298" fill="#64748B" font-size="9.5">&bull; Receiver checks CRC; error-free.</text>
    <text x="25" y="316" fill="#64748B" font-size="9.5">&bull; Receiver returns ACK 1 (expecting 1).</text>
    <text x="25" y="334" fill="#64748B" font-size="9.5">&bull; Sender cancels timer, sends Frame 1.</text>
    <text x="25" y="352" fill="#059669" font-size="9.5" font-weight="bold">&bull; Zero duplicates, minimal delay.</text>

    <!-- Column 2: Lost Frame Case -->
    <rect x="280" y="0" width="265" height="395" rx="8" fill="#F8FAFC" stroke="#E2E8F0" />
    <rect x="280" y="0" width="265" height="32" rx="8" fill="#FEE2E2" />
    <text x="412" y="21" fill="#991B1B" font-size="12" font-weight="bold" text-anchor="middle">Case 2: Frame Lost in Transit</text>
    <g transform="translate(305, 45)">
      <line x1="30" y1="0" x2="30" y2="170" stroke="#94A3B8" stroke-width="1.5" />
      <line x1="185" y1="0" x2="185" y2="170" stroke="#94A3B8" stroke-width="1.5" />
      <text x="30" y="-6" fill="#0F172A" font-size="10" font-weight="bold" text-anchor="middle">Tx</text>
      <text x="185" y="-6" fill="#0F172A" font-size="10" font-weight="bold" text-anchor="middle">Rx</text>
      <!-- Frame 0 Lost -->
      <line x1="30" y1="20" x2="110" y2="35" stroke="#EF4444" stroke-width="2" />
      <line x1="105" y1="30" x2="115" y2="40" stroke="#DC2626" stroke-width="2.5" />
      <line x1="115" y1="30" x2="105" y2="40" stroke="#DC2626" stroke-width="2.5" />
      <text x="105" y="26" fill="#DC2626" font-size="9" font-weight="bold">LOST</text>
      <!-- Timer Expiry -->
      <line x1="15" y1="20" x2="15" y2="90" stroke="#D97706" stroke-width="2" stroke-dasharray="3 3" />
      <text x="10" y="60" fill="#D97706" font-size="8" font-weight="bold" text-anchor="end">Timer Expired</text>
      <!-- Retransmission -->
      <line x1="30" y1="100" x2="185" y2="130" stroke="#3B82F6" stroke-width="2" />
      <polygon points="185,130 174,124 176,135" fill="#3B82F6" />
      <text x="105" y="110" fill="#1E40AF" font-size="9" font-weight="bold" text-anchor="middle">Frame 0 (Retransmit)</text>
      <!-- ACK 1 -->
      <line x1="185" y1="140" x2="30" y2="170" stroke="#059669" stroke-width="2" stroke-dasharray="4 2" />
      <polygon points="30,170 41,164 40,175" fill="#059669" />
      <text x="105" y="150" fill="#059669" font-size="9" font-weight="bold" text-anchor="middle">ACK 1</text>
    </g>
    <rect x="295" y="240" width="235" height="140" rx="6" fill="#FFFFFF" stroke="#CBD5E1" />
    <text x="305" y="260" fill="#0F172A" font-size="10.5" font-weight="bold">Mechanism:</text>
    <text x="305" y="280" fill="#64748B" font-size="9.5">&bull; Frame 0 destroyed by channel noise.</text>
    <text x="305" y="298" fill="#64748B" font-size="9.5">&bull; Receiver unaware; sends no ACK.</text>
    <text x="305" y="316" fill="#64748B" font-size="9.5">&bull; Sender timer expires after timeout.</text>
    <text x="305" y="334" fill="#64748B" font-size="9.5">&bull; Sender retransmits exact Frame 0.</text>
    <text x="305" y="352" fill="#DC2626" font-size="9.5" font-weight="bold">&bull; Solved cleanly via sender timer.</text>

    <!-- Column 3: Lost ACK Case -->
    <rect x="560" y="0" width="265" height="395" rx="8" fill="#F8FAFC" stroke="#E2E8F0" />
    <rect x="560" y="0" width="265" height="32" rx="8" fill="#FEF3C7" />
    <text x="692" y="21" fill="#92400E" font-size="12" font-weight="bold" text-anchor="middle">Case 3: Acknowledgment (ACK) Lost</text>
    <g transform="translate(585, 45)">
      <line x1="30" y1="0" x2="30" y2="170" stroke="#94A3B8" stroke-width="1.5" />
      <line x1="185" y1="0" x2="185" y2="170" stroke="#94A3B8" stroke-width="1.5" />
      <text x="30" y="-6" fill="#0F172A" font-size="10" font-weight="bold" text-anchor="middle">Tx</text>
      <text x="185" y="-6" fill="#0F172A" font-size="10" font-weight="bold" text-anchor="middle">Rx</text>
      <!-- Frame 0 -->
      <line x1="30" y1="15" x2="185" y2="45" stroke="#10B981" stroke-width="2" />
      <polygon points="185,45 174,39 176,50" fill="#10B981" />
      <!-- ACK 1 Lost -->
      <line x1="185" y1="55" x2="105" y2="70" stroke="#EF4444" stroke-width="2" stroke-dasharray="3 2" />
      <line x1="100" y1="65" x2="110" y2="75" stroke="#DC2626" stroke-width="2.5" />
      <line x1="110" y1="65" x2="100" y2="75" stroke="#DC2626" stroke-width="2.5" />
      <text x="105" y="60" fill="#DC2626" font-size="8.5" font-weight="bold">ACK LOST</text>
      <!-- Retransmission -->
      <line x1="30" y1="95" x2="185" y2="125" stroke="#3B82F6" stroke-width="2" />
      <polygon points="185,125 174,119 176,130" fill="#3B82F6" />
      <text x="105" y="105" fill="#1E40AF" font-size="8.5" font-weight="bold" text-anchor="middle">Duplicate Frame 0</text>
      <!-- Duplicate Discarded Note -->
      <text x="185" y="142" fill="#EF4444" font-size="8" font-weight="bold" text-anchor="middle">(Discarded!)</text>
      <!-- Resent ACK 1 -->
      <line x1="185" y1="145" x2="30" y2="175" stroke="#059669" stroke-width="2" stroke-dasharray="4 2" />
      <polygon points="30,175 41,169 40,180" fill="#059669" />
      <text x="105" y="155" fill="#059669" font-size="8.5" font-weight="bold" text-anchor="middle">ACK 1 Resent</text>
    </g>
    <rect x="575" y="240" width="235" height="140" rx="6" fill="#FFFFFF" stroke="#CBD5E1" />
    <text x="585" y="260" fill="#0F172A" font-size="10.5" font-weight="bold">Mechanism:</text>
    <text x="585" y="280" fill="#64748B" font-size="9.5">&bull; Rx receives Frame 0, sends ACK 1.</text>
    <text x="585" y="298" fill="#64748B" font-size="9.5">&bull; ACK 1 lost in channel noise.</text>
    <text x="585" y="316" fill="#64748B" font-size="9.5">&bull; Tx timer expires; Tx re-sends Frame 0.</text>
    <text x="585" y="334" fill="#64748B" font-size="9.5">&bull; Rx sees Seq 0 already received; discards duplicate!</text>
    <text x="585" y="352" fill="#7C3AED" font-size="9.5" font-weight="bold">&bull; 1-bit sequence number prevents duplicate delivery.</text>
  </g>
</svg>
`);

// 3. Go-Back-N Sliding Window
writeSvg('go-back-n-sliding-window.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 500" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <rect x="30" y="20" width="840" height="54" rx="10" fill="#0F172A" />
  <text x="50" y="53" fill="#F8FAFC" font-size="18" font-weight="700">Go-Back-N ARQ: Sliding Window Concept &amp; Sequence Mechanics</text>

  <g transform="translate(50, 95)">
    <!-- Sender Window Panel -->
    <rect x="0" y="0" width="800" height="175" rx="10" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5" />
    <text x="25" y="30" fill="#0F172A" font-size="14" font-weight="bold">Sender Window of Size N = 4 (Sequence numbers m = 3 bits &rarr; range 0 to 7)</text>
    <text x="25" y="50" fill="#64748B" font-size="11">Maximum Sender Window size: S_w &le; 2^m - 1 = 7. Below is a snapshot where window = 4 covers frames [2, 3, 4, 5]:</text>

    <!-- Buffer Slots -->
    <g transform="translate(60, 75)">
      <!-- 0: Acknowledged -->
      <rect x="0" y="0" width="70" height="50" rx="6" fill="#E2E8F0" stroke="#94A3B8" />
      <text x="35" y="28" fill="#64748B" font-size="16" font-weight="bold" text-anchor="middle">0</text>
      <text x="35" y="44" fill="#64748B" font-size="8.5" text-anchor="middle">ACKed</text>

      <!-- 1: Acknowledged -->
      <rect x="80" y="0" width="70" height="50" rx="6" fill="#E2E8F0" stroke="#94A3B8" />
      <text x="115" y="28" fill="#64748B" font-size="16" font-weight="bold" text-anchor="middle">1</text>
      <text x="115" y="44" fill="#64748B" font-size="8.5" text-anchor="middle">ACKed</text>

      <!-- Active Window Box -->
      <rect x="155" y="-6" width="315" height="62" rx="8" fill="none" stroke="#2563EB" stroke-width="3" stroke-dasharray="6 3" />
      <text x="312" y="-12" fill="#1D4ED8" font-size="11" font-weight="bold" text-anchor="middle">Active Sender Window [S_f = 2, S_n = 6]</text>

      <!-- 2: Sent, unacked -->
      <rect x="160" y="0" width="70" height="50" rx="6" fill="#EFF6FF" stroke="#3B82F6" stroke-width="2" />
      <text x="195" y="28" fill="#1E40AF" font-size="16" font-weight="bold" text-anchor="middle">2</text>
      <text x="195" y="44" fill="#1D4ED8" font-size="8" font-weight="bold" text-anchor="middle">Sent (S_f)</text>

      <!-- 3: Sent, unacked -->
      <rect x="240" y="0" width="70" height="50" rx="6" fill="#EFF6FF" stroke="#3B82F6" stroke-width="2" />
      <text x="275" y="28" fill="#1E40AF" font-size="16" font-weight="bold" text-anchor="middle">3</text>
      <text x="275" y="44" fill="#1D4ED8" font-size="8" text-anchor="middle">Sent</text>

      <!-- 4: Sent, unacked -->
      <rect x="320" y="0" width="70" height="50" rx="6" fill="#EFF6FF" stroke="#3B82F6" stroke-width="2" />
      <text x="355" y="28" fill="#1E40AF" font-size="16" font-weight="bold" text-anchor="middle">4</text>
      <text x="355" y="44" fill="#1D4ED8" font-size="8" text-anchor="middle">Sent</text>

      <!-- 5: Usable, not sent -->
      <rect x="400" y="0" width="70" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="2" />
      <text x="435" y="28" fill="#065F46" font-size="16" font-weight="bold" text-anchor="middle">5</text>
      <text x="435" y="44" fill="#059669" font-size="8" font-weight="bold" text-anchor="middle">Can Send</text>

      <!-- 6: Not usable yet -->
      <rect x="480" y="0" width="70" height="50" rx="6" fill="#F8FAFC" stroke="#CBD5E1" stroke-dasharray="3 3" />
      <text x="515" y="28" fill="#94A3B8" font-size="16" text-anchor="middle">6</text>
      <text x="515" y="44" fill="#94A3B8" font-size="8" text-anchor="middle">Locked</text>

      <!-- 7: Not usable yet -->
      <rect x="560" y="0" width="70" height="50" rx="6" fill="#F8FAFC" stroke="#CBD5E1" stroke-dasharray="3 3" />
      <text x="595" y="28" fill="#94A3B8" font-size="16" text-anchor="middle">7</text>
      <text x="595" y="44" fill="#94A3B8" font-size="8" text-anchor="middle">Locked</text>
    </g>

    <!-- Receiver Window Panel -->
    <rect x="0" y="195" width="800" height="175" rx="10" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5" />
    <text x="25" y="225" fill="#0F172A" font-size="14" font-weight="bold">Receiver Window: Size R_w = 1 (Strictly Ordered)</text>
    <text x="25" y="245" fill="#64748B" font-size="11">The GBN receiver accepts ONLY the single frame whose sequence number matches expected R_n. Any out-of-order frame is discarded!</text>

    <g transform="translate(60, 270)">
      <!-- 0: Accepted -->
      <rect x="0" y="0" width="70" height="45" rx="6" fill="#E2E8F0" stroke="#94A3B8" />
      <text x="35" y="28" fill="#64748B" font-size="14" text-anchor="middle">0 (OK)</text>

      <!-- 1: Accepted -->
      <rect x="80" y="0" width="70" height="45" rx="6" fill="#E2E8F0" stroke="#94A3B8" />
      <text x="115" y="28" fill="#64748B" font-size="14" text-anchor="middle">1 (OK)</text>

      <!-- Active Rx Slot (Size 1) -->
      <rect x="155" y="-4" width="80" height="53" rx="8" fill="none" stroke="#059669" stroke-width="3" />
      <rect x="160" y="0" width="70" height="45" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="2" />
      <text x="195" y="25" fill="#065F46" font-size="15" font-weight="bold" text-anchor="middle">2</text>
      <text x="195" y="38" fill="#059669" font-size="8" font-weight="bold" text-anchor="middle">R_n = 2</text>

      <!-- Future slots -->
      <text x="250" y="28" fill="#EF4444" font-size="11" font-weight="bold">&larr; If Frame 3 or 4 arrives, it is discarded immediately (No buffering)</text>
    </g>
  </g>
</svg>
`);

// 4. Go-Back-N Error Recovery Sequence
writeSvg('go-back-n-error-recovery.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 520" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <rect x="30" y="20" width="840" height="54" rx="10" fill="#0F172A" />
  <text x="50" y="53" fill="#F8FAFC" font-size="18" font-weight="700">Go-Back-N ARQ: Error Recovery &amp; Retransmission of Full Window</text>

  <g transform="translate(60, 95)">
    <!-- Lifelines -->
    <line x1="80" y1="0" x2="80" y2="390" stroke="#94A3B8" stroke-width="2" />
    <line x1="450" y1="0" x2="450" y2="390" stroke="#94A3B8" stroke-width="2" />
    <text x="80" y="-8" fill="#0F172A" font-size="12" font-weight="bold" text-anchor="middle">Sender (N = 4)</text>
    <text x="450" y="-8" fill="#0F172A" font-size="12" font-weight="bold" text-anchor="middle">Receiver (R_w = 1)</text>

    <!-- Frame 0: Success -->
    <line x1="80" y1="20" x2="450" y2="60" stroke="#10B981" stroke-width="2" />
    <polygon points="450,60 438,54 440,65" fill="#10B981" />
    <text x="260" y="35" fill="#065F46" font-size="10" font-weight="bold" text-anchor="middle">Frame 0</text>

    <!-- Frame 1: Lost -->
    <line x1="80" y1="45" x2="260" y2="70" stroke="#EF4444" stroke-width="2" />
    <line x1="255" y1="65" x2="265" y2="75" stroke="#DC2626" stroke-width="3" />
    <line x1="265" y1="65" x2="255" y2="75" stroke="#DC2626" stroke-width="3" />
    <text x="270" y="65" fill="#DC2626" font-size="10" font-weight="bold">LOST</text>
    <text x="170" y="50" fill="#DC2626" font-size="10" font-weight="bold">Frame 1</text>

    <!-- ACK 1 for Frame 0 -->
    <line x1="450" y1="65" x2="80" y2="105" stroke="#059669" stroke-width="2" stroke-dasharray="4 2" />
    <polygon points="80,105 92,99 90,110" fill="#059669" />
    <text x="260" y="80" fill="#059669" font-size="10" font-weight="bold" text-anchor="middle">ACK 1 (Ready for 1)</text>

    <!-- Frame 2: Arrives out-of-order -->
    <line x1="80" y1="70" x2="450" y2="110" stroke="#F59E0B" stroke-width="2" />
    <polygon points="450,110 438,104 440,115" fill="#F59E0B" />
    <text x="260" y="95" fill="#92400E" font-size="10" font-weight="bold" text-anchor="middle">Frame 2</text>
    <text x="460" y="115" fill="#EF4444" font-size="9" font-weight="bold">Discarded! (Expecting 1)</text>

    <!-- Frame 3: Arrives out-of-order -->
    <line x1="80" y1="95" x2="450" y2="135" stroke="#F59E0B" stroke-width="2" />
    <polygon points="450,135 438,129 440,140" fill="#F59E0B" />
    <text x="260" y="120" fill="#92400E" font-size="10" font-weight="bold" text-anchor="middle">Frame 3</text>
    <text x="460" y="140" fill="#EF4444" font-size="9" font-weight="bold">Discarded! (Expecting 1)</text>

    <!-- Timer for Frame 1 expires -->
    <line x1="60" y1="45" x2="60" y2="175" stroke="#DC2626" stroke-width="2" stroke-dasharray="3 3" />
    <text x="50" y="115" fill="#DC2626" font-size="9" font-weight="bold" text-anchor="end">Timer 1 Expired!</text>

    <!-- Retransmission Phase: GO BACK TO 1 -->
    <rect x="65" y="180" width="30" height="15" rx="3" fill="#EF4444" />
    <text x="80" y="192" fill="#FFF" font-size="9" font-weight="bold" text-anchor="middle">GO BACK N</text>

    <!-- Frame 1 Retransmitted -->
    <line x1="80" y1="205" x2="450" y2="245" stroke="#3B82F6" stroke-width="2" />
    <polygon points="450,245 438,239 440,250" fill="#3B82F6" />
    <text x="260" y="220" fill="#1E40AF" font-size="10" font-weight="bold" text-anchor="middle">Frame 1 (Retransmitted)</text>

    <!-- Frame 2 Retransmitted -->
    <line x1="80" y1="230" x2="450" y2="270" stroke="#3B82F6" stroke-width="2" />
    <polygon points="450,270 438,264 440,275" fill="#3B82F6" />
    <text x="260" y="245" fill="#1E40AF" font-size="10" font-weight="bold" text-anchor="middle">Frame 2 (Retransmitted)</text>

    <!-- Frame 3 Retransmitted -->
    <line x1="80" y1="255" x2="450" y2="295" stroke="#3B82F6" stroke-width="2" />
    <polygon points="450,295 438,289 440,300" fill="#3B82F6" />
    <text x="260" y="270" fill="#1E40AF" font-size="10" font-weight="bold" text-anchor="middle">Frame 3 (Retransmitted)</text>

    <!-- ACK 4 (Cumulative) -->
    <line x1="450" y1="305" x2="80" y2="345" stroke="#059669" stroke-width="2.5" stroke-dasharray="4 2" />
    <polygon points="80,345 92,339 90,350" fill="#059669" />
    <text x="260" y="320" fill="#059669" font-size="11" font-weight="bold" text-anchor="middle">ACK 4 (Cumulative &bull; Frames 1,2,3 all received)</text>

    <!-- Explanation Card on Right -->
    <g transform="translate(560, 40)">
      <rect width="220" height="310" rx="8" fill="#F8FAFC" stroke="#CBD5E1" />
      <text x="15" y="25" fill="#0F172A" font-size="12" font-weight="bold">Why "Go-Back-N"?</text>
      <text x="15" y="50" fill="#475569" font-size="10.5">When Frame 1 is lost, the receiver rejects valid Frames 2 and 3 because R_w = 1.</text>
      <text x="15" y="90" fill="#DC2626" font-size="10.5" font-weight="bold">Inherent Inefficiency:</text>
      <text x="15" y="110" fill="#475569" font-size="10.5">Sender must retransmit ALL N frames starting from the damaged frame (1, 2, 3), wasting channel bandwidth.</text>
      <text x="15" y="165" fill="#059669" font-size="10.5" font-weight="bold">Advantage:</text>
      <text x="15" y="185" fill="#475569" font-size="10.5">Receiver requires NO complex buffering logic (memory = 1 frame).</text>
      <rect x="15" y="240" width="190" height="50" rx="6" fill="#DBEAFE" />
      <text x="110" y="260" fill="#1E40AF" font-size="10" font-weight="bold" text-anchor="middle">Max Window Formula:</text>
      <text x="110" y="278" fill="#1E40AF" font-size="11" font-family="monospace" font-weight="bold" text-anchor="middle">S_w = 2^m - 1</text>
    </g>
  </g>
</svg>
`);

// 5. Selective Repeat ARQ Windows & Independent Buffers
writeSvg('selective-repeat-windows.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 500" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <rect x="30" y="20" width="840" height="54" rx="10" fill="#0F172A" />
  <text x="50" y="53" fill="#F8FAFC" font-size="18" font-weight="700">Selective Repeat ARQ: Symmetric Windows (S_w = R_w = 2^(m-1))</text>

  <g transform="translate(50, 95)">
    <!-- Sender Window -->
    <rect x="0" y="0" width="800" height="175" rx="10" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5" />
    <text x="25" y="30" fill="#0F172A" font-size="14" font-weight="bold">Sender Window (m = 3 bits &rarr; S_w = 2^(3-1) = 4)</text>
    <text x="25" y="50" fill="#64748B" font-size="11">Each transmitted frame has an INDEPENDENT retransmission timer. Only lost frames are retransmitted.</text>

    <!-- Buffer Slots -->
    <g transform="translate(60, 75)">
      <rect x="0" y="0" width="70" height="50" rx="6" fill="#E2E8F0" stroke="#94A3B8" /><text x="35" y="28" fill="#64748B" font-size="16" font-weight="bold" text-anchor="middle">0</text><text x="35" y="44" fill="#64748B" font-size="8" text-anchor="middle">ACKed</text>
      <rect x="80" y="0" width="70" height="50" rx="6" fill="#E2E8F0" stroke="#94A3B8" /><text x="115" y="28" fill="#64748B" font-size="16" font-weight="bold" text-anchor="middle">1</text><text x="115" y="44" fill="#64748B" font-size="8" text-anchor="middle">ACKed</text>

      <rect x="155" y="-6" width="315" height="62" rx="8" fill="none" stroke="#7C3AED" stroke-width="3" stroke-dasharray="6 3" />
      <text x="312" y="-12" fill="#7C3AED" font-size="11" font-weight="bold" text-anchor="middle">Sender Window = 4</text>

      <rect x="160" y="0" width="70" height="50" rx="6" fill="#FEE2E2" stroke="#EF4444" stroke-width="2" /><text x="195" y="28" fill="#DC2626" font-size="16" font-weight="bold" text-anchor="middle">2</text><text x="195" y="44" fill="#DC2626" font-size="8" font-weight="bold" text-anchor="middle">Lost (Timer)</text>
      <rect x="240" y="0" width="70" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="2" /><text x="275" y="28" fill="#065F46" font-size="16" font-weight="bold" text-anchor="middle">3</text><text x="275" y="44" fill="#059669" font-size="8" font-weight="bold" text-anchor="middle">ACKed (Sel)</text>
      <rect x="320" y="0" width="70" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="2" /><text x="355" y="28" fill="#065F46" font-size="16" font-weight="bold" text-anchor="middle">4</text><text x="355" y="44" fill="#059669" font-size="8" font-weight="bold" text-anchor="middle">ACKed (Sel)</text>
      <rect x="400" y="0" width="70" height="50" rx="6" fill="#EFF6FF" stroke="#3B82F6" stroke-width="2" /><text x="435" y="28" fill="#1E40AF" font-size="16" font-weight="bold" text-anchor="middle">5</text><text x="435" y="44" fill="#2563EB" font-size="8" font-weight="bold" text-anchor="middle">Can Send</text>

      <rect x="480" y="0" width="70" height="50" rx="6" fill="#F8FAFC" stroke="#CBD5E1" stroke-dasharray="3 3" /><text x="515" y="28" fill="#94A3B8" font-size="16" text-anchor="middle">6</text>
      <rect x="560" y="0" width="70" height="50" rx="6" fill="#F8FAFC" stroke="#CBD5E1" stroke-dasharray="3 3" /><text x="595" y="28" fill="#94A3B8" font-size="16" text-anchor="middle">7</text>
    </g>

    <!-- Receiver Window -->
    <rect x="0" y="195" width="800" height="175" rx="10" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5" />
    <text x="25" y="225" fill="#0F172A" font-size="14" font-weight="bold">Receiver Window: Equal Size R_w = S_w = 4 (With Out-of-Order Buffering)</text>
    <text x="25" y="245" fill="#64748B" font-size="11">The receiver has memory buffers to accept and hold frames 3 and 4 out of order while waiting for lost frame 2:</text>

    <g transform="translate(60, 270)">
      <rect x="0" y="0" width="70" height="50" rx="6" fill="#E2E8F0" stroke="#94A3B8" /><text x="35" y="28" fill="#64748B" font-size="14" text-anchor="middle">0 (Deliv)</text>
      <rect x="80" y="0" width="70" height="50" rx="6" fill="#E2E8F0" stroke="#94A3B8" /><text x="115" y="28" fill="#64748B" font-size="14" text-anchor="middle">1 (Deliv)</text>

      <rect x="155" y="-6" width="315" height="62" rx="8" fill="none" stroke="#059669" stroke-width="3" stroke-dasharray="6 3" />
      <text x="312" y="-12" fill="#059669" font-size="11" font-weight="bold" text-anchor="middle">Receiver Buffer Window = 4</text>

      <rect x="160" y="0" width="70" height="50" rx="6" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2" stroke-dasharray="4 2" /><text x="195" y="28" fill="#D97706" font-size="16" font-weight="bold" text-anchor="middle">?</text><text x="195" y="44" fill="#D97706" font-size="8" font-weight="bold" text-anchor="middle">Awaiting 2</text>
      <rect x="240" y="0" width="70" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="2" /><text x="275" y="28" fill="#065F46" font-size="16" font-weight="bold" text-anchor="middle">3</text><text x="275" y="44" fill="#059669" font-size="8" font-weight="bold" text-anchor="middle">Buffered</text>
      <rect x="320" y="0" width="70" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="2" /><text x="355" y="28" fill="#065F46" font-size="16" font-weight="bold" text-anchor="middle">4</text><text x="355" y="44" fill="#059669" font-size="8" font-weight="bold" text-anchor="middle">Buffered</text>
      <rect x="400" y="0" width="70" height="50" rx="6" fill="#FFFFFF" stroke="#CBD5E1" /><text x="435" y="28" fill="#94A3B8" font-size="16" text-anchor="middle">5</text><text x="435" y="44" fill="#94A3B8" font-size="8" text-anchor="middle">Expected</text>
    </g>
  </g>
</svg>
`);

// 6. ARQ Comparison Chart
writeSvg('arq-protocols-comparison-chart.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 520" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <rect x="30" y="20" width="840" height="54" rx="10" fill="#0F172A" />
  <text x="50" y="53" fill="#F8FAFC" font-size="18" font-weight="700">Comparative Analysis: Stop-and-Wait vs Go-Back-N vs Selective Repeat</text>

  <g transform="translate(45, 95)">
    <!-- Column 1: Stop-and-Wait ARQ -->
    <rect x="0" y="0" width="260" height="395" rx="10" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5" />
    <rect x="0" y="0" width="260" height="42" rx="10" fill="#EFF6FF" />
    <text x="130" y="26" fill="#1E40AF" font-size="14" font-weight="bold" text-anchor="middle">Stop-and-Wait ARQ</text>

    <g transform="translate(15, 60)">
      <text x="0" y="15" fill="#334155" font-size="11" font-weight="bold">Sender Window (S_w):</text>
      <text x="0" y="32" fill="#1E40AF" font-size="13" font-family="monospace" font-weight="bold">1</text>

      <text x="0" y="60" fill="#334155" font-size="11" font-weight="bold">Receiver Window (R_w):</text>
      <text x="0" y="77" fill="#1E40AF" font-size="13" font-family="monospace" font-weight="bold">1</text>

      <text x="0" y="105" fill="#334155" font-size="11" font-weight="bold">Sequence Number Bits:</text>
      <text x="0" y="122" fill="#64748B" font-size="11">1 bit (0 or 1)</text>

      <text x="0" y="150" fill="#334155" font-size="11" font-weight="bold">Retransmission Scope:</text>
      <text x="0" y="167" fill="#64748B" font-size="11">Single unacknowledged frame</text>

      <text x="0" y="195" fill="#334155" font-size="11" font-weight="bold">Receiver Buffering:</text>
      <text x="0" y="212" fill="#64748B" font-size="11">None (Discards duplicates)</text>

      <rect x="0" y="240" width="230" height="75" rx="6" fill="#DBEAFE" />
      <text x="115" y="262" fill="#1E40AF" font-size="10" font-weight="bold" text-anchor="middle">Channel Utilization (&eta;):</text>
      <text x="115" y="282" fill="#1E40AF" font-size="13" font-family="monospace" font-weight="bold" text-anchor="middle">1 / (1 + 2a)</text>
      <text x="115" y="302" fill="#64748B" font-size="9" text-anchor="middle">Extremely poor when a &gt;&gt; 1</text>
    </g>

    <!-- Column 2: Go-Back-N ARQ -->
    <rect x="275" y="0" width="260" height="395" rx="10" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5" />
    <rect x="275" y="0" width="260" height="42" rx="10" fill="#ECFDF5" />
    <text x="405" y="26" fill="#065F46" font-size="14" font-weight="bold" text-anchor="middle">Go-Back-N ARQ</text>

    <g transform="translate(290, 60)">
      <text x="0" y="15" fill="#334155" font-size="11" font-weight="bold">Sender Window (S_w):</text>
      <text x="0" y="32" fill="#059669" font-size="13" font-family="monospace" font-weight="bold">&le; 2^m - 1</text>

      <text x="0" y="60" fill="#334155" font-size="11" font-weight="bold">Receiver Window (R_w):</text>
      <text x="0" y="77" fill="#059669" font-size="13" font-family="monospace" font-weight="bold">1</text>

      <text x="0" y="105" fill="#334155" font-size="11" font-weight="bold">Sequence Number Bits:</text>
      <text x="0" y="122" fill="#64748B" font-size="11">m bits (modulo 2^m)</text>

      <text x="0" y="150" fill="#334155" font-size="11" font-weight="bold">Retransmission Scope:</text>
      <text x="0" y="167" fill="#DC2626" font-size="11" font-weight="bold">Full window N from error</text>

      <text x="0" y="195" fill="#334155" font-size="11" font-weight="bold">Receiver Buffering:</text>
      <text x="0" y="212" fill="#64748B" font-size="11">None (Discards out-of-order)</text>

      <rect x="0" y="240" width="230" height="75" rx="6" fill="#D1FAE5" />
      <text x="115" y="262" fill="#065F46" font-size="10" font-weight="bold" text-anchor="middle">Channel Utilization (&eta;):</text>
      <text x="115" y="282" fill="#065F46" font-size="12" font-family="monospace" font-weight="bold" text-anchor="middle">N &bull; (1 - P) / (1 + 2aP)</text>
      <text x="115" y="302" fill="#64748B" font-size="9" text-anchor="middle">Degrades on high error rate P</text>
    </g>

    <!-- Column 3: Selective Repeat ARQ -->
    <rect x="550" y="0" width="260" height="395" rx="10" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5" />
    <rect x="550" y="0" width="260" height="42" rx="10" fill="#F5F3FF" />
    <text x="680" y="26" fill="#7C3AED" font-size="14" font-weight="bold" text-anchor="middle">Selective Repeat ARQ</text>

    <g transform="translate(565, 60)">
      <text x="0" y="15" fill="#334155" font-size="11" font-weight="bold">Sender Window (S_w):</text>
      <text x="0" y="32" fill="#7C3AED" font-size="13" font-family="monospace" font-weight="bold">&le; 2^(m - 1)</text>

      <text x="0" y="60" fill="#334155" font-size="11" font-weight="bold">Receiver Window (R_w):</text>
      <text x="0" y="77" fill="#7C3AED" font-size="13" font-family="monospace" font-weight="bold">S_w = 2^(m - 1)</text>

      <text x="0" y="105" fill="#334155" font-size="11" font-weight="bold">Sequence Number Bits:</text>
      <text x="0" y="122" fill="#64748B" font-size="11">m bits (modulo 2^m)</text>

      <text x="0" y="150" fill="#334155" font-size="11" font-weight="bold">Retransmission Scope:</text>
      <text x="0" y="167" fill="#059669" font-size="11" font-weight="bold">Damaged frame ONLY</text>

      <text x="0" y="195" fill="#334155" font-size="11" font-weight="bold">Receiver Buffering:</text>
      <text x="0" y="212" fill="#7C3AED" font-size="11" font-weight="bold">Full out-of-order buffer</text>

      <rect x="0" y="240" width="230" height="75" rx="6" fill="#EDE9FE" />
      <text x="115" y="262" fill="#7C3AED" font-size="10" font-weight="bold" text-anchor="middle">Channel Utilization (&eta;):</text>
      <text x="115" y="282" fill="#7C3AED" font-size="12" font-family="monospace" font-weight="bold" text-anchor="middle">1 - P &bull; (Independent of a)</text>
      <text x="115" y="302" fill="#64748B" font-size="9" text-anchor="middle">Optimal on high-loss channels</text>
    </g>
  </g>
</svg>
`);

console.log('Topic 2 SVGs generated successfully.');
