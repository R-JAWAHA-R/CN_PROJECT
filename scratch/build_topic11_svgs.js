const fs = require('fs');
const path = require('path');

const outDir = 'assets/images/topic11';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function writeSvg(filename, content) {
  fs.writeFileSync(path.join(outDir, filename), content.trim(), 'utf8');
  console.log('Created: ' + filename);
}

writeSvg('unit2-master-diagrams-summary.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 400" width="100%" height="100%">
  <defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient></defs>
  <rect width="850" height="400" rx="16" fill="url(#bg)"/>
  <text x="425" y="40" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Unit 2: Master Architectural Diagrams Compendium</text>
  <text x="425" y="64" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Framing, Sliding Window, MAC Contention, Ethernet, Wireless LAN, and L2 Switching</text>
  <g transform="translate(60, 95)">
    <rect width="730" height="260" rx="10" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="365" y="45" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#60a5fa" text-anchor="middle">Visual Overview of Data Link Layer Architecture</text>
    <text x="365" y="80" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">1. Framing: Byte Stuffing (ESC) &amp; Bit Stuffing (01111110 with zero insertion after five 1s)</text>
    <text x="365" y="115" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">2. Flow &amp; Error: Stop-and-Wait, Go-Back-N (W_s ≤ 2^m - 1), Selective Repeat (W_s ≤ 2^(m-1))</text>
    <text x="365" y="150" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">3. MAC Contention: Pure ALOHA (18.4%), Slotted ALOHA (36.8%), 1-P / Non-P / p-P CSMA</text>
    <text x="365" y="185" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">4. LAN Standards: Ethernet 802.3 CSMA/CD, Wi-Fi 802.11 CSMA/CA, Spanning Tree Protocol (STP)</text>
    <text x="365" y="225" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#34d399" text-anchor="middle">✅ All Unit 2 Core Topics Mastered and Fully Illustrated</text>
  </g>
</svg>`);

writeSvg('unit2-protocols-comparison-matrix.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 400" width="100%" height="100%">
  <defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient></defs>
  <rect width="850" height="400" rx="16" fill="url(#bg)"/>
  <text x="425" y="40" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Unit 2: Comprehensive Protocol Comparison Tables</text>
  <text x="425" y="64" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">ARQ Protocols, Multiple Access Schemes, Wired vs. Wireless &amp; Networking Devices</text>
  <g transform="translate(60, 95)">
    <rect width="730" height="260" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="365" y="50" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#34d399" text-anchor="middle">Key Protocol Comparison Dimensions</text>
    <text x="365" y="90" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">• Noiseless vs. Noisy Channels (Simplex vs Stop-and-Wait vs GBN vs SR)</text>
    <text x="365" y="125" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">• Random Access: ALOHA vs CSMA vs CSMA/CD vs CSMA/CA</text>
    <text x="365" y="160" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">• 802.11 Modes: DCF (Distributed Contention) vs PCF (Centralized Polling)</text>
    <text x="365" y="195" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">• Hardware Interconnection: Repeaters vs Hubs vs Bridges vs Switches vs Routers</text>
  </g>
</svg>`);

writeSvg('unit2-numerical-formulas-cheatsheet.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 400" width="100%" height="100%">
  <defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient></defs>
  <rect width="850" height="400" rx="16" fill="url(#bg)"/>
  <text x="425" y="40" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Unit 2: Master Numerical Formulas &amp; Calculations</text>
  <text x="425" y="64" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Efficiency, Window Sizes, Minimum Frame Length, Propagation Delay &amp; Backoff Slots</text>
  <g transform="translate(60, 95)">
    <rect width="730" height="260" rx="10" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="365" y="40" font-family="monospace" font-size="13" font-weight="800" fill="#fbbf24" text-anchor="middle">Stop-and-Wait Efficiency: η = 1 / (1 + 2a) where a = T_prop / T_tx</text>
    <text x="365" y="75" font-family="monospace" font-size="13" font-weight="800" fill="#fbbf24" text-anchor="middle">Go-Back-N Efficiency: η = N / (1 + 2a) (for N &lt; 1 + 2a)</text>
    <text x="365" y="110" font-family="monospace" font-size="13" font-weight="800" fill="#fbbf24" text-anchor="middle">Ethernet Min Frame: L_min ≥ 2 × τ × Bandwidth (B)</text>
    <text x="365" y="145" font-family="monospace" font-size="13" font-weight="800" fill="#fbbf24" text-anchor="middle">ALOHA Max Throughput: S_pure = 1/(2e) ≈ 18.4% | S_slotted = 1/e ≈ 36.8%</text>
    <text x="365" y="180" font-family="monospace" font-size="13" font-weight="800" fill="#fbbf24" text-anchor="middle">Hamming Code Parity Bits: 2^p ≥ m + p + 1</text>
    <text x="365" y="215" font-family="monospace" font-size="13" font-weight="800" fill="#fbbf24" text-anchor="middle">BEB Contention Range: R ∈ [0, 2^k - 1], k = min(n, 10)</text>
  </g>
</svg>`);

writeSvg('unit2-protocol-exchange-examples.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 400" width="100%" height="100%">
  <defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient></defs>
  <rect width="850" height="400" rx="16" fill="url(#bg)"/>
  <text x="425" y="40" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Step-by-Step Protocol Execution &amp; Recovery Traces</text>
  <text x="425" y="64" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Normal Flow, Lost Frame Recovery, Lost ACK Handling &amp; Timer Timeouts</text>
  <g transform="translate(60, 95)">
    <rect width="730" height="260" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="365" y="50" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#38bdf8" text-anchor="middle">Interactive Protocol State Progression</text>
    <text x="365" y="90" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">• Stop-and-Wait ARQ: Sequence bit 0 and 1 toggling prevents duplicate delivery</text>
    <text x="365" y="125" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">• Go-Back-N ARQ: Frame 2 lost → Frames 3, 4, 5 discarded at receiver; retransmitted upon timer expiry</text>
    <text x="365" y="160" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">• Selective Repeat ARQ: Individual NAK / selective ACK; only lost frame 2 retransmitted</text>
    <text x="365" y="195" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">• RTS/CTS Exchange: 802.11 virtual carrier sense completely suppresses hidden collisions</text>
  </g>
</svg>`);

writeSvg('unit2-short-answer-review.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 400" width="100%" height="100%">
  <defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient></defs>
  <rect width="850" height="400" rx="16" fill="url(#bg)"/>
  <text x="425" y="40" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Short-Answer Exam Questions &amp; Rapid Revision</text>
  <text x="425" y="64" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">High-Frequency 2-Mark University Exam Questions (Q1 to Q112 Complete Set)</text>
  <g transform="translate(60, 95)">
    <rect width="730" height="260" rx="10" fill="#1e293b" stroke="#c084fc" stroke-width="1.5"/>
    <text x="365" y="45" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#c084fc" text-anchor="middle">Core Topics Covered in Short-Answer Bank</text>
    <text x="365" y="80" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">Framing techniques • Flow control methods • Error detection (CRC, Hamming) • ARQ differences</text>
    <text x="365" y="115" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">Channel allocation • ALOHA throughput • CSMA variants • Collision-free protocols</text>
    <text x="365" y="150" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">Ethernet MAC &amp; CSMA/CD • Binary backoff • Wireless challenges • Hidden/exposed terminals</text>
    <text x="365" y="185" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">IEEE 802.11 IFS hierarchy • RTS/CTS &amp; NAV • Transparent bridges • STP • Networking devices</text>
  </g>
</svg>`);

writeSvg('unit2-long-answer-architecture.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 400" width="100%" height="100%">
  <defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient></defs>
  <rect width="850" height="400" rx="16" fill="url(#bg)"/>
  <text x="425" y="40" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Long-Answer Conceptual &amp; Design Questions</text>
  <text x="425" y="64" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">16-Mark Detailed Academic Essay Questions with Structural Answers (Q1 to Q41)</text>
  <g transform="translate(60, 95)">
    <rect width="730" height="260" rx="10" fill="#1e293b" stroke="#34d399" stroke-width="1.5"/>
    <text x="365" y="45" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#34d399" text-anchor="middle">Comprehensive Long-Answer Syllabus Coverage</text>
    <text x="365" y="80" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">• DLL Design Issues: Node-to-node framing, flow and error control architectures</text>
    <text x="365" y="115" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">• Sliding Window Protocols: Mathematical efficiency proofs and buffer analysis</text>
    <text x="365" y="150" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">• MAC Protocols: CSMA/CD vs CSMA/CA mathematical analysis &amp; collision detection</text>
    <text x="365" y="185" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">• Ethernet &amp; Wi-Fi Standards: Detailed frame structures, timing diagrams, and STP</text>
  </g>
</svg>`);

writeSvg('unit2-exam-high-yield-map.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 400" width="100%" height="100%">
  <defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient></defs>
  <rect width="850" height="400" rx="16" fill="url(#bg)"/>
  <text x="425" y="40" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Unit 2: High-Yield University Exam Questions</text>
  <text x="425" y="64" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Curated List of Exam Hall Essentials Across Anna Univ, JNTU, VTU, Mumbai Univ &amp; GATE</text>
  <g transform="translate(60, 95)">
    <rect width="730" height="260" rx="10" fill="#1e293b" stroke="#eab308" stroke-width="1.5"/>
    <text x="365" y="45" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#fde68a" text-anchor="middle">Top 5 Exam Must-Prepare Topics</text>
    <text x="365" y="80" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">1. CRC Modulo-2 Division &amp; Hamming Code (7,4) Error Correction</text>
    <text x="365" y="115" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">2. Go-Back-N vs. Selective Repeat Window Size Constraints &amp; Buffering</text>
    <text x="365" y="150" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">3. Ethernet CSMA/CD Minimum Frame Size Formula Derivation (L ≥ 2 × τ × B)</text>
    <text x="365" y="185" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">4. Hidden &amp; Exposed Terminal Problems and 802.11 RTS/CTS / NAV Solution</text>
    <text x="365" y="220" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">5. Transparent Bridge Backward Learning Algorithm &amp; Spanning Tree Protocol (STP)</text>
  </g>
</svg>`);

writeSvg('unit2-mcqs-concept-check.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 400" width="100%" height="100%">
  <defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient></defs>
  <rect width="850" height="400" rx="16" fill="url(#bg)"/>
  <text x="425" y="40" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Unit 2: Multiple-Choice Questions (MCQ) Bank</text>
  <text x="425" y="64" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Interactive Self-Assessment with 115+ Rigorous Syllabus Questions &amp; Detailed Explanations</text>
  <g transform="translate(60, 95)">
    <rect width="730" height="260" rx="10" fill="#1e293b" stroke="#60a5fa" stroke-width="1.5"/>
    <text x="365" y="45" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#60a5fa" text-anchor="middle">MCQ Mastery Tracker</text>
    <text x="365" y="80" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">• 115 Multi-Topic Questions covering every single syllabus concept</text>
    <text x="365" y="115" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">• Instant feedback with correct option highlighting and reasoning</text>
    <text x="365" y="150" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">• Mathematical questions on CRC polynomials, window sizes, and backoff probabilities</text>
    <text x="365" y="185" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">• Rigorous preparation for university exams, competitive tests, and technical interviews</text>
  </g>
</svg>`);

writeSvg('unit2-key-terminology-glossary.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 400" width="100%" height="100%">
  <defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient></defs>
  <rect width="850" height="400" rx="16" fill="url(#bg)"/>
  <text x="425" y="40" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Unit 2: Essential Terminology &amp; Key Definitions</text>
  <text x="425" y="64" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Comprehensive Glossary of Data Link Layer Technical Concepts</text>
  <g transform="translate(60, 95)">
    <rect width="730" height="260" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="365" y="45" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#38bdf8" text-anchor="middle">Data Link Layer Glossary</text>
    <text x="365" y="80" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">Framing • Bit Stuffing • Byte Stuffing • Flow Control • Piggybacking • Pipelining</text>
    <text x="365" y="115" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">ARQ • CRC • Hamming Distance • MAC Sublayer • ALOHA • CSMA/CD • CSMA/CA</text>
    <text x="365" y="150" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">1-Persistent • Binary Exponential Backoff • BSS • ESS • SIFS • DIFS • RTS/CTS • NAV</text>
    <text x="365" y="185" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">Transparent Bridge • CAM Table • Spanning Tree Protocol • Micro-segmentation • VLAN</text>
  </g>
</svg>`);

writeSvg('unit2-practice-exam-assessment.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 400" width="100%" height="100%">
  <defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient></defs>
  <rect width="850" height="400" rx="16" fill="url(#bg)"/>
  <text x="425" y="40" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Unit 2: Complete Practice Exam &amp; Self-Assessment</text>
  <text x="425" y="64" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Full-Length Academic Test Covering All 11 Unit 2 Topics with Grading Rubric</text>
  <g transform="translate(60, 95)">
    <rect width="730" height="260" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="365" y="45" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#34d399" text-anchor="middle">Unit 2 Exam Simulation Blueprint</text>
    <text x="365" y="80" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">Part A: 10 Short-Answer Questions (20 Marks)</text>
    <text x="365" y="115" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">Part B: 5 Long-Answer Analytical Questions with Internal Choice (65 Marks)</text>
    <text x="365" y="150" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">Part C: 1 Practical Design &amp; Numerical Scenario Question (15 Marks)</text>
    <text x="365" y="195" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#6ee7b7" text-anchor="middle">Total: 100 Marks | Duration: 3 Hours</text>
  </g>
</svg>`);

console.log('All 10 Topic 11 SVGs generated successfully!');

