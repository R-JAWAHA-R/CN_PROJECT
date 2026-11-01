// scratch/svg_builders_topic2_part2.js
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../assets/images/topic2');

function writeSvg(filename, svgContent) {
  fs.writeFileSync(path.join(outDir, filename), svgContent.trim(), 'utf8');
  console.log(`Created topic2/${filename}`);
}

// 7. Simplex Protocol Timeline
writeSvg('simplex-protocol-timeline.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 480" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <rect x="30" y="20" width="840" height="54" rx="10" fill="#0F172A" />
  <text x="50" y="53" fill="#F8FAFC" font-size="18" font-weight="700">Simplest Protocol (Utopia): Unconditional Unidirectional Transmission</text>

  <g transform="translate(60, 95)">
    <!-- Lifelines -->
    <line x1="120" y1="0" x2="120" y2="340" stroke="#94A3B8" stroke-width="2" />
    <line x1="500" y1="0" x2="500" y2="340" stroke="#94A3B8" stroke-width="2" />
    <text x="120" y="-8" fill="#0F172A" font-size="13" font-weight="bold" text-anchor="middle">Sender (Host A)</text>
    <text x="500" y="-8" fill="#0F172A" font-size="13" font-weight="bold" text-anchor="middle">Receiver (Host B)</text>

    <!-- Continuous Flow of Frames -->
    <line x1="120" y1="30" x2="500" y2="70" stroke="#10B981" stroke-width="2.5" />
    <polygon points="500,70 488,64 490,75" fill="#10B981" />
    <text x="310" y="44" fill="#065F46" font-size="11" font-weight="bold" text-anchor="middle">Frame 0 (Sent without delay)</text>

    <line x1="120" y1="85" x2="500" y2="125" stroke="#10B981" stroke-width="2.5" />
    <polygon points="500,125 488,119 490,130" fill="#10B981" />
    <text x="310" y="99" fill="#065F46" font-size="11" font-weight="bold" text-anchor="middle">Frame 1 (No ACK waited for)</text>

    <line x1="120" y1="140" x2="500" y2="180" stroke="#10B981" stroke-width="2.5" />
    <polygon points="500,180 488,174 490,185" fill="#10B981" />
    <text x="310" y="154" fill="#065F46" font-size="11" font-weight="bold" text-anchor="middle">Frame 2 (Infinite buffer assumption)</text>

    <line x1="120" y1="195" x2="500" y2="235" stroke="#10B981" stroke-width="2.5" />
    <polygon points="500,235 488,229 490,240" fill="#10B981" />
    <text x="310" y="209" fill="#065F46" font-size="11" font-weight="bold" text-anchor="middle">Frame 3</text>

    <line x1="120" y1="250" x2="500" y2="290" stroke="#10B981" stroke-width="2.5" />
    <polygon points="500,290 488,284 490,295" fill="#10B981" />
    <text x="310" y="264" fill="#065F46" font-size="11" font-weight="bold" text-anchor="middle">Frame 4</text>

    <!-- Assumptions Card on Right -->
    <g transform="translate(560, 20)">
      <rect width="250" height="290" rx="8" fill="#F8FAFC" stroke="#CBD5E1" />
      <text x="20" y="25" fill="#0F172A" font-size="12" font-weight="bold">Theoretical Assumptions:</text>
      <text x="20" y="50" fill="#475569" font-size="11">1. Error-Free Channel:</text>
      <text x="35" y="68" fill="#64748B" font-size="10">Frames are never corrupted, distorted, or lost.</text>
      <text x="20" y="98" fill="#475569" font-size="11">2. Infinite Receiver Buffer:</text>
      <text x="35" y="116" fill="#64748B" font-size="10">Receiver processes incoming frames infinitely fast; buffer overflow never happens.</text>
      <text x="20" y="146" fill="#475569" font-size="11">3. Strictly Unidirectional:</text>
      <text x="35" y="164" fill="#64748B" font-size="10">Data flows exclusively from Tx to Rx. No return channel for acknowledgments.</text>
      <rect x="20" y="210" width="210" height="60" rx="6" fill="#FEF2F2" stroke="#F87171" />
      <text x="125" y="230" fill="#991B1B" font-size="10" font-weight="bold" text-anchor="middle">Practical Limitation:</text>
      <text x="125" y="248" fill="#DC2626" font-size="9" text-anchor="middle">Purely pedagogical; in reality,</text>
      <text x="125" y="260" fill="#DC2626" font-size="9" text-anchor="middle">buffers overflow within milliseconds.</text>
    </g>
  </g>
</svg>
`);

// 8. Stop-and-Wait Noiseless Timeline
writeSvg('stop-and-wait-noiseless-timeline.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 480" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <rect x="30" y="20" width="840" height="54" rx="10" fill="#0F172A" />
  <text x="50" y="53" fill="#F8FAFC" font-size="18" font-weight="700">Stop-and-Wait Protocol (Noiseless Channel): Feedback Flow Control</text>

  <g transform="translate(60, 95)">
    <line x1="120" y1="0" x2="120" y2="340" stroke="#94A3B8" stroke-width="2" />
    <line x1="500" y1="0" x2="500" y2="340" stroke="#94A3B8" stroke-width="2" />
    <text x="120" y="-8" fill="#0F172A" font-size="13" font-weight="bold" text-anchor="middle">Sender (Tx)</text>
    <text x="500" y="-8" fill="#0F172A" font-size="13" font-weight="bold" text-anchor="middle">Receiver (Rx)</text>

    <!-- Cycle 1 -->
    <line x1="120" y1="20" x2="500" y2="60" stroke="#3B82F6" stroke-width="2.5" />
    <polygon points="500,60 488,54 490,65" fill="#3B82F6" />
    <text x="310" y="34" fill="#1E40AF" font-size="11" font-weight="bold" text-anchor="middle">Frame (Data)</text>

    <!-- Rx Processing -->
    <rect x="505" y="60" width="14" height="25" rx="3" fill="#E2E8F0" />
    <text x="525" y="77" fill="#64748B" font-size="9">Processing &amp; Store</text>

    <!-- ACK -->
    <line x1="500" y1="85" x2="120" y2="125" stroke="#10B981" stroke-width="2" stroke-dasharray="4 2" />
    <polygon points="120,125 132,119 130,130" fill="#10B981" />
    <text x="310" y="100" fill="#065F46" font-size="11" font-weight="bold" text-anchor="middle">ACK (Dummy / Ready Signal)</text>

    <!-- Cycle 2 -->
    <line x1="120" y1="150" x2="500" y2="190" stroke="#3B82F6" stroke-width="2.5" />
    <polygon points="500,190 488,184 490,195" fill="#3B82F6" />
    <text x="310" y="164" fill="#1E40AF" font-size="11" font-weight="bold" text-anchor="middle">Next Frame</text>

    <line x1="500" y1="210" x2="120" y2="250" stroke="#10B981" stroke-width="2" stroke-dasharray="4 2" />
    <polygon points="120,250 132,244 130,255" fill="#10B981" />
    <text x="310" y="225" fill="#065F46" font-size="11" font-weight="bold" text-anchor="middle">ACK</text>

    <!-- Sidebar Card -->
    <g transform="translate(560, 20)">
      <rect width="250" height="290" rx="8" fill="#F8FAFC" stroke="#CBD5E1" />
      <text x="20" y="25" fill="#0F172A" font-size="12" font-weight="bold">Why ACK in Noiseless Channel?</text>
      <text x="20" y="50" fill="#475569" font-size="10.5">Even though channel is noiseless (no corruption), receiver has FINITE buffer capacity.</text>
      <text x="20" y="95" fill="#059669" font-size="11" font-weight="bold">Flow Control Purpose:</text>
      <text x="20" y="115" fill="#475569" font-size="10.5">The ACK acts as a flow-control gate: "I have finished consuming this frame; you are now permitted to send the next."</text>
      <text x="20" y="165" fill="#D97706" font-size="11" font-weight="bold">No Sequence Numbers Needed:</text>
      <text x="20" y="185" fill="#475569" font-size="10.5">Since frames and ACKs cannot be lost on a noiseless channel, duplicates never arise.</text>
    </g>
  </g>
</svg>
`);

// 9. Selective Repeat Recovery Trace
writeSvg('selective-repeat-recovery.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 520" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <rect x="30" y="20" width="840" height="54" rx="10" fill="#0F172A" />
  <text x="50" y="53" fill="#F8FAFC" font-size="18" font-weight="700">Selective Repeat ARQ: Independent Retransmission of Damaged Frame Only</text>

  <g transform="translate(60, 95)">
    <line x1="80" y1="0" x2="80" y2="390" stroke="#94A3B8" stroke-width="2" />
    <line x1="450" y1="0" x2="450" y2="390" stroke="#94A3B8" stroke-width="2" />
    <text x="80" y="-8" fill="#0F172A" font-size="12" font-weight="bold" text-anchor="middle">Sender (S_w = 4)</text>
    <text x="450" y="-8" fill="#0F172A" font-size="12" font-weight="bold" text-anchor="middle">Receiver (R_w = 4)</text>

    <!-- Frame 0: Success -->
    <line x1="80" y1="20" x2="450" y2="55" stroke="#10B981" stroke-width="2" />
    <polygon points="450,55 438,49 440,60" fill="#10B981" />
    <text x="260" y="32" fill="#065F46" font-size="10" font-weight="bold" text-anchor="middle">Frame 0</text>

    <!-- Frame 1: Lost -->
    <line x1="80" y1="45" x2="260" y2="70" stroke="#EF4444" stroke-width="2" />
    <line x1="255" y1="65" x2="265" y2="75" stroke="#DC2626" stroke-width="3" />
    <line x1="265" y1="65" x2="255" y2="75" stroke="#DC2626" stroke-width="3" />
    <text x="270" y="65" fill="#DC2626" font-size="10" font-weight="bold">LOST</text>
    <text x="170" y="50" fill="#DC2626" font-size="10" font-weight="bold">Frame 1</text>

    <!-- ACK 0 returned -->
    <line x1="450" y1="60" x2="80" y2="95" stroke="#059669" stroke-width="2" stroke-dasharray="4 2" />
    <polygon points="80,95 92,89 90,100" fill="#059669" />
    <text x="260" y="74" fill="#059669" font-size="9" font-weight="bold" text-anchor="middle">ACK 0</text>

    <!-- Frame 2: Accepted & Buffered -->
    <line x1="80" y1="70" x2="450" y2="105" stroke="#10B981" stroke-width="2" />
    <polygon points="450,105 438,99 440,110" fill="#10B981" />
    <text x="260" y="82" fill="#065F46" font-size="10" font-weight="bold" text-anchor="middle">Frame 2</text>
    <text x="460" y="110" fill="#059669" font-size="9" font-weight="bold">BUFFERED (Slot 2)</text>

    <!-- NAK 1 or Selective ACK 2 -->
    <line x1="450" y1="115" x2="80" y2="150" stroke="#7C3AED" stroke-width="2" stroke-dasharray="4 2" />
    <polygon points="80,150 92,144 90,155" fill="#7C3AED" />
    <text x="260" y="127" fill="#7C3AED" font-size="9" font-weight="bold" text-anchor="middle">NAK 1 (Negative ACK for 1)</text>

    <!-- Frame 3: Accepted & Buffered -->
    <line x1="80" y1="95" x2="450" y2="130" stroke="#10B981" stroke-width="2" />
    <polygon points="450,130 438,124 440,135" fill="#10B981" />
    <text x="260" y="108" fill="#065F46" font-size="10" font-weight="bold" text-anchor="middle">Frame 3</text>
    <text x="460" y="135" fill="#059669" font-size="9" font-weight="bold">BUFFERED (Slot 3)</text>

    <!-- SELECTIVE RETRANSMISSION OF FRAME 1 ONLY -->
    <rect x="60" y="160" width="370" height="22" rx="4" fill="#FEE2E2" stroke="#EF4444" />
    <text x="245" y="175" fill="#991B1B" font-size="10" font-weight="bold" text-anchor="middle">SELECTIVE RETRANSMISSION: Retransmit Frame 1 ONLY!</text>

    <line x1="80" y1="195" x2="450" y2="235" stroke="#EF4444" stroke-width="2.5" />
    <polygon points="450,235 438,229 440,240" fill="#EF4444" />
    <text x="260" y="210" fill="#DC2626" font-size="11" font-weight="bold" text-anchor="middle">Frame 1 (Retransmitted ONLY)</text>

    <!-- Delivery to Network Layer -->
    <rect x="455" y="240" width="230" height="30" rx="4" fill="#D1FAE5" />
    <text x="570" y="259" fill="#065F46" font-size="9.5" font-weight="bold" text-anchor="middle">Deliver Frames [1, 2, 3] in order!</text>

    <!-- ACK 4 -->
    <line x1="450" y1="280" x2="80" y2="320" stroke="#059669" stroke-width="2.5" stroke-dasharray="4 2" />
    <polygon points="80,320 92,314 90,325" fill="#059669" />
    <text x="260" y="295" fill="#059669" font-size="11" font-weight="bold" text-anchor="middle">ACK 4 (All Frames through 3 successfully received)</text>

    <!-- Explanation Box on Right -->
    <g transform="translate(560, 20)">
      <rect width="250" height="210" rx="8" fill="#F8FAFC" stroke="#CBD5E1" />
      <text x="15" y="25" fill="#0F172A" font-size="12" font-weight="bold">Bandwidth Savings:</text>
      <text x="15" y="48" fill="#475569" font-size="10.5">Unlike GBN which retransmitted Frames 1, 2, AND 3:</text>
      <text x="15" y="80" fill="#059669" font-size="11" font-weight="bold">&bull; Selective Repeat retransmitted ONLY Frame 1.</text>
      <text x="15" y="115" fill="#475569" font-size="10.5">&bull; Frames 2 and 3 were safely buffered in Rx memory.</text>
      <text x="15" y="150" fill="#7C3AED" font-size="10.5" font-weight="bold">Trade-Off:</text>
      <text x="15" y="170" fill="#475569" font-size="10.5">Requires logic to reorder buffers and handle complex timer management.</text>
    </g>
  </g>
</svg>
`);

// 10. Noiseless vs Noisy Matrix
writeSvg('noiseless-vs-noisy-matrix.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 500" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <rect x="30" y="20" width="840" height="54" rx="10" fill="#0F172A" />
  <text x="50" y="53" fill="#F8FAFC" font-size="18" font-weight="700">Detailed Comparison Matrix: Noiseless vs Noisy Protocols</text>

  <g transform="translate(50, 95)">
    <!-- Header Row -->
    <rect x="0" y="0" width="800" height="38" rx="6" fill="#1E293B" />
    <text x="15" y="24" fill="#FFF" font-size="11" font-weight="bold">Feature</text>
    <text x="170" y="24" fill="#A7F3D0" font-size="11" font-weight="bold">Simplest Protocol</text>
    <text x="320" y="24" fill="#A7F3D0" font-size="11" font-weight="bold">Stop-and-Wait (Noiseless)</text>
    <text x="490" y="24" fill="#93C5FD" font-size="11" font-weight="bold">Stop-and-Wait ARQ</text>
    <text x="660" y="24" fill="#C4B5FD" font-size="11" font-weight="bold">Sliding Window ARQ</text>

    <!-- Row 1: Channel Model -->
    <rect x="0" y="42" width="800" height="42" fill="#F8FAFC" stroke="#E2E8F0" />
    <text x="15" y="68" fill="#0F172A" font-size="10.5" font-weight="bold">Channel Model</text>
    <text x="170" y="68" fill="#059669" font-size="10">Error-free, ideal</text>
    <text x="320" y="68" fill="#059669" font-size="10">Error-free, ideal</text>
    <text x="490" y="68" fill="#2563EB" font-size="10">Noisy (Loss/corrupt)</text>
    <text x="660" y="68" fill="#7C3AED" font-size="10">Noisy (Loss/corrupt)</text>

    <!-- Row 2: Flow Control -->
    <rect x="0" y="88" width="800" height="42" fill="#FFFFFF" stroke="#E2E8F0" />
    <text x="15" y="114" fill="#0F172A" font-size="10.5" font-weight="bold">Flow Control</text>
    <text x="170" y="114" fill="#DC2626" font-size="10">None (Infinite buf)</text>
    <text x="320" y="114" fill="#059669" font-size="10">Yes (Stop-and-Wait)</text>
    <text x="490" y="114" fill="#059669" font-size="10">Yes (Stop-and-Wait)</text>
    <text x="660" y="114" fill="#7C3AED" font-size="10">Yes (Window = N)</text>

    <!-- Row 3: Error Control -->
    <rect x="0" y="134" width="800" height="42" fill="#F8FAFC" stroke="#E2E8F0" />
    <text x="15" y="160" fill="#0F172A" font-size="10.5" font-weight="bold">Error Control</text>
    <text x="170" y="160" fill="#DC2626" font-size="10">None</text>
    <text x="320" y="160" fill="#DC2626" font-size="10">None</text>
    <text x="490" y="160" fill="#2563EB" font-size="10">Yes (Timer + CRC)</text>
    <text x="660" y="160" fill="#7C3AED" font-size="10">Yes (Timer + CRC)</text>

    <!-- Row 4: Sequence Numbers -->
    <rect x="0" y="180" width="800" height="42" fill="#FFFFFF" stroke="#E2E8F0" />
    <text x="15" y="206" fill="#0F172A" font-size="10.5" font-weight="bold">Sequence Numbers</text>
    <text x="170" y="206" fill="#64748B" font-size="10">None</text>
    <text x="320" y="206" fill="#64748B" font-size="10">None</text>
    <text x="490" y="206" fill="#2563EB" font-size="10">1 bit (0, 1)</text>
    <text x="660" y="206" fill="#7C3AED" font-size="10">m bits (0 to 2^m-1)</text>

    <!-- Row 5: Sender Window -->
    <rect x="0" y="226" width="800" height="42" fill="#F8FAFC" stroke="#E2E8F0" />
    <text x="15" y="252" fill="#0F172A" font-size="10.5" font-weight="bold">Sender Window Size</text>
    <text x="170" y="252" fill="#64748B" font-size="10">&infin; (Conceptually)</text>
    <text x="320" y="252" fill="#64748B" font-size="10">1</text>
    <text x="490" y="252" fill="#2563EB" font-size="10">1</text>
    <text x="660" y="252" fill="#7C3AED" font-size="10">N &gt; 1 (Pipelined)</text>

    <!-- Row 6: Efficiency -->
    <rect x="0" y="272" width="800" height="50" fill="#FFFFFF" stroke="#E2E8F0" />
    <text x="15" y="302" fill="#0F172A" font-size="10.5" font-weight="bold">Channel Efficiency &eta;</text>
    <text x="170" y="302" fill="#059669" font-size="10">100% (Theoretical)</text>
    <text x="320" y="302" fill="#DC2626" font-size="10">1 / (1 + 2a)</text>
    <text x="490" y="302" fill="#DC2626" font-size="10">1 / (1 + 2a)</text>
    <text x="660" y="302" fill="#059669" font-size="10">Up to 100% (High N)</text>
  </g>
</svg>
`);

// 11. Sliding Window Frame Sequence Circular Modulo
writeSvg('sliding-window-frame-sequence.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 480" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <rect x="30" y="20" width="840" height="54" rx="10" fill="#0F172A" />
  <text x="50" y="53" fill="#F8FAFC" font-size="18" font-weight="700">Circular Sequence Number Buffer (Modulo-2^m Arithmetic)</text>

  <g transform="translate(100, 95)">
    <!-- Circular Ring of 8 Sequence Slots (m = 3 bits) -->
    <circle cx="200" cy="180" r="140" fill="none" stroke="#E2E8F0" stroke-width="38" />

    <!-- 8 Slots around circle -->
    <!-- 0: top -->
    <circle cx="200" cy="40" r="18" fill="#E2E8F0" /><text x="200" y="46" fill="#334" font-size="14" font-weight="bold" text-anchor="middle">0</text>
    <!-- 1: top-right -->
    <circle cx="299" cy="81" r="18" fill="#E2E8F0" /><text x="299" y="87" fill="#334" font-size="14" font-weight="bold" text-anchor="middle">1</text>
    <!-- 2: right (Active Window start) -->
    <circle cx="340" cy="180" r="20" fill="#3B82F6" /><text x="340" y="186" fill="#FFF" font-size="14" font-weight="bold" text-anchor="middle">2</text>
    <!-- 3: bottom-right -->
    <circle cx="299" cy="279" r="20" fill="#3B82F6" /><text x="299" y="285" fill="#FFF" font-size="14" font-weight="bold" text-anchor="middle">3</text>
    <!-- 4: bottom -->
    <circle cx="200" cy="320" r="20" fill="#3B82F6" /><text x="200" y="326" fill="#FFF" font-size="14" font-weight="bold" text-anchor="middle">4</text>
    <!-- 5: bottom-left -->
    <circle cx="101" cy="279" r="20" fill="#10B981" /><text x="101" y="285" fill="#FFF" font-size="14" font-weight="bold" text-anchor="middle">5</text>
    <!-- 6: left -->
    <circle cx="60" cy="180" r="18" fill="#F1F5F9" stroke="#CBD5E1" /><text x="60" y="186" fill="#94A3B8" font-size="14" text-anchor="middle">6</text>
    <!-- 7: top-left -->
    <circle cx="101" cy="81" r="18" fill="#F1F5F9" stroke="#CBD5E1" /><text x="101" y="87" fill="#94A3B8" font-size="14" text-anchor="middle">7</text>

    <!-- Center Label -->
    <text x="200" y="170" fill="#0F172A" font-size="14" font-weight="bold" text-anchor="middle">Modulo 8</text>
    <text x="200" y="190" fill="#64748B" font-size="11" text-anchor="middle">(3-bit Seq)</text>
    <text x="200" y="208" fill="#2563EB" font-size="10" font-weight="bold" text-anchor="middle">Clockwise Flow</text>

    <!-- Arc highlighting active window -->
    <path d="M 340 180 A 140 140 0 0 1 101 279" fill="none" stroke="#2563EB" stroke-width="4" stroke-dasharray="6 3" />

    <!-- Explanatory Panel on Right -->
    <g transform="translate(430, 20)">
      <rect width="320" height="320" rx="10" fill="#F8FAFC" stroke="#CBD5E1" />
      <text x="20" y="30" fill="#0F172A" font-size="14" font-weight="bold">Why Circular Modulo 2^m?</text>
      <text x="20" y="55" fill="#475569" font-size="11">Sequence numbers cannot grow indefinitely because packet headers have limited bit fields (e.g. m = 3 bits).</text>

      <text x="20" y="100" fill="#1E40AF" font-size="12" font-weight="bold">Window Wrap-Around Rule:</text>
      <text x="20" y="120" fill="#475569" font-size="11">Sequence numbers wrap from (2^m - 1) back to 0.</text>
      <text x="20" y="140" fill="#DC2626" font-size="11" font-weight="bold">To prevent ambiguity between old &amp; new frames:</text>
      <rect x="20" y="155" width="280" height="60" rx="6" fill="#EFF6FF" stroke="#3B82F6" />
      <text x="30" y="175" fill="#1E40AF" font-size="11" font-weight="bold">Go-Back-N:</text>
      <text x="130" y="175" fill="#1E40AF" font-size="11" font-family="monospace">S_w &le; 2^m - 1 = 7</text>
      <text x="30" y="198" fill="#7C3AED" font-size="11" font-weight="bold">Selective Repeat:</text>
      <text x="130" y="198" fill="#7C3AED" font-size="11" font-family="monospace">S_w = R_w &le; 2^(m-1) = 4</text>

      <text x="20" y="245" fill="#059669" font-size="11" font-weight="bold">Active Window Shown:</text>
      <text x="20" y="265" fill="#64748B" font-size="11">&bull; Blue slots [2, 3, 4]: Sent, awaiting ACK.</text>
      <text x="20" y="285" fill="#64748B" font-size="11">&bull; Green slot [5]: Usable for immediate transmission.</text>
      <text x="20" y="305" fill="#64748B" font-size="11">&bull; Grey slots [6, 7]: Outside window (locked).</text>
    </g>
  </g>
</svg>
`);

console.log('Topic 2 part 2 generated successfully.');
