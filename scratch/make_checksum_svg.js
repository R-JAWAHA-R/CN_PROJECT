const fs = require('fs');

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

const checksumSvg = makeSvg(800, 440, "Checksum: Sender Generator & Receiver Checker", "Forouzan Ch. 10.5 – One's Complement Summation and Error Detection", `
  <!-- SENDER SIDE -->
  <g transform="translate(40, 100)">
    <rect width="330" height="295" rx="12" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" filter="url(#shadow)"/>
    <text x="165" y="30" text-anchor="middle" font-family="system-ui" font-size="14" font-weight="bold" fill="#60a5fa">SENDER (Generator)</text>
    
    <rect x="20" y="50" width="290" height="60" rx="6" fill="#0f172a"/>
    <text x="30" y="72" font-family="monospace" font-size="11" fill="#cbd5e1">Data (4-bit): 7, 11, 12, 0, 6</text>
    <text x="30" y="92" font-family="monospace" font-size="11" fill="#94a3b8">Binary: 0111, 1011, 1100, 0000, 0110</text>
    
    <path d="M 165 110 L 165 125" stroke="#60a5fa" stroke-width="2"/>
    
    <rect x="20" y="125" width="290" height="75" rx="6" fill="#1e3a8a"/>
    <text x="30" y="145" font-family="monospace" font-size="11" fill="#bfdbfe">Sum = 36 (binary 100100)</text>
    <text x="30" y="165" font-family="monospace" font-size="11" fill="#93c5fd">Wrap Carry: 0100 + 10 = 0110 (6)</text>
    <text x="30" y="185" font-family="monospace" font-size="11" font-weight="bold" fill="#fde047">Invert: NOT(0110) = 1001 (9)</text>

    <rect x="20" y="215" width="290" height="42" rx="6" fill="url(#boxAmber)"/>
    <text x="165" y="241" text-anchor="middle" font-family="monospace" font-size="12" font-weight="bold" fill="#ffffff">CHECKSUM = 1001 (9)</text>
    
    <text x="165" y="280" text-anchor="middle" font-family="system-ui" font-size="11" fill="#94a3b8">Transmits: [ 7, 11, 12, 0, 6 | 9 ]</text>
  </g>

  <!-- RECEIVER SIDE -->
  <g transform="translate(430, 100)">
    <rect width="330" height="295" rx="12" fill="#1e293b" stroke="#10b981" stroke-width="1.5" filter="url(#shadow)"/>
    <text x="165" y="30" text-anchor="middle" font-family="system-ui" font-size="14" font-weight="bold" fill="#34d399">RECEIVER (Checker)</text>
    
    <rect x="20" y="50" width="290" height="60" rx="6" fill="#0f172a"/>
    <text x="30" y="72" font-family="monospace" font-size="11" fill="#cbd5e1">Received: 7, 11, 12, 0, 6, [9]</text>
    <text x="30" y="92" font-family="system-ui" font-size="10" fill="#a7f3d0">Adds ALL data items + checksum</text>
    
    <path d="M 165 110 L 165 125" stroke="#10b981" stroke-width="2"/>
    
    <rect x="20" y="125" width="290" height="75" rx="6" fill="#064e3b"/>
    <text x="30" y="145" font-family="monospace" font-size="11" fill="#a7f3d0">Sum = 7+11+12+0+6+9 = 45 (101101)</text>
    <text x="30" y="165" font-family="monospace" font-size="11" fill="#6ee7b7">Wrap Carry: 1101 + 10 = 1111 (15)</text>
    <text x="30" y="185" font-family="monospace" font-size="11" font-weight="bold" fill="#ffffff">Invert: NOT(1111) = 0000 (0) ✓</text>

    <!-- DECISION BUTTONS -->
    <g transform="translate(25, 215)">
      <rect width="135" height="38" rx="6" fill="url(#boxGreen)"/>
      <text x="67" y="23" text-anchor="middle" font-family="system-ui" font-size="11" font-weight="bold" fill="#ffffff">Result 0 → ACCEPT</text>
      
      <rect x="145" width="135" height="38" rx="6" fill="url(#boxRed)"/>
      <text x="212" y="23" text-anchor="middle" font-family="system-ui" font-size="11" font-weight="bold" fill="#ffffff">Result ≠ 0 → DROP</text>
    </g>
    
    <text x="165" y="280" text-anchor="middle" font-family="system-ui" font-size="11" fill="#94a3b8">If inverted sum is 0, no error detected!</text>
  </g>
`);

fs.writeFileSync('assets/images/unit2/topic1/checksum-generator-checker.svg', checksumSvg, 'utf8');
console.log('Successfully created assets/images/unit2/topic1/checksum-generator-checker.svg');

