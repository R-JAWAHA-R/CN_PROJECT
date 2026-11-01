// scratch/svg_builders_topic4_part2.js
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../assets/images/topic4');

function writeSvg(filename, svgContent) {
  fs.writeFileSync(path.join(outDir, filename), svgContent.trim(), 'utf8');
  console.log(`Created topic4/${filename}`);
}

// 7. Slotted ALOHA Timeline Slots
writeSvg('slotted-aloha-timeline-slots.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 480" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <rect x="30" y="20" width="840" height="54" rx="10" fill="#0F172A" />
  <text x="50" y="53" fill="#F8FAFC" font-size="18" font-weight="700">Slotted ALOHA: Synchronized Time Slots &amp; Reduced Vulnerable Window (1 &times; T_fr)</text>

  <g transform="translate(60, 95)">
    <!-- Time Axis -->
    <line x1="30" y1="280" x2="750" y2="280" stroke="#0F172A" stroke-width="2" />
    <polygon points="755,280 745,275 745,285" fill="#0F172A" />
    <text x="730" y="305" fill="#0F172A" font-size="12" font-weight="bold">Time (t) &rarr;</text>

    <!-- Synchronized Discrete Slots (Width 120 each) -->
    <!-- Slot 1 -->
    <line x1="60" y1="30" x2="60" y2="280" stroke="#94A3B8" stroke-dasharray="4 2" stroke-width="1.5" />
    <text x="120" y="20" fill="#0F172A" font-size="11" font-weight="bold" text-anchor="middle">Slot 1</text>
    <!-- Frame in Slot 1 (Success) -->
    <rect x="65" y="100" width="110" height="40" rx="4" fill="#10B981" />
    <text x="120" y="125" fill="#FFF" font-size="11" font-weight="bold" text-anchor="middle">Station 1 (OK)</text>

    <!-- Slot 2 -->
    <line x1="180" y1="30" x2="180" y2="280" stroke="#94A3B8" stroke-dasharray="4 2" stroke-width="1.5" />
    <text x="240" y="20" fill="#0F172A" font-size="11" font-weight="bold" text-anchor="middle">Slot 2 (Collision)</text>
    <!-- Collision in Slot 2 -->
    <rect x="185" y="60" width="110" height="35" rx="4" fill="#EF4444" />
    <text x="240" y="82" fill="#FFF" font-size="10" font-weight="bold" text-anchor="middle">Station 2</text>
    <rect x="185" y="105" width="110" height="35" rx="4" fill="#EF4444" />
    <text x="240" y="127" fill="#FFF" font-size="10" font-weight="bold" text-anchor="middle">Station 3</text>
    <rect x="195" y="150" width="90" height="20" rx="3" fill="#FEE2E2" stroke="#EF4444" />
    <text x="240" y="164" fill="#DC2626" font-size="9" font-weight="bold" text-anchor="middle">&cross; COLLISION!</text>

    <!-- Slot 3 (Empty) -->
    <line x1="300" y1="30" x2="300" y2="280" stroke="#94A3B8" stroke-dasharray="4 2" stroke-width="1.5" />
    <text x="360" y="20" fill="#64748B" font-size="11" text-anchor="middle">Slot 3 (Idle)</text>
    <text x="360" y="125" fill="#94A3B8" font-size="11" text-anchor="middle">[Channel Idle]</text>

    <!-- Slot 4 (Success) -->
    <line x1="420" y1="30" x2="420" y2="280" stroke="#94A3B8" stroke-dasharray="4 2" stroke-width="1.5" />
    <text x="480" y="20" fill="#0F172A" font-size="11" font-weight="bold" text-anchor="middle">Slot 4</text>
    <rect x="425" y="100" width="110" height="40" rx="4" fill="#10B981" />
    <text x="480" y="125" fill="#FFF" font-size="11" font-weight="bold" text-anchor="middle">Station 4 (OK)</text>

    <!-- Slot 5 -->
    <line x1="540" y1="30" x2="540" y2="280" stroke="#94A3B8" stroke-dasharray="4 2" stroke-width="1.5" />
    <text x="600" y="20" fill="#0F172A" font-size="11" font-weight="bold" text-anchor="middle">Slot 5</text>
    <rect x="545" y="100" width="110" height="40" rx="4" fill="#10B981" />
    <text x="600" y="125" fill="#FFF" font-size="11" font-weight="bold" text-anchor="middle">Station 2 (Retry OK)</text>

    <!-- Slot 6 -->
    <line x1="660" y1="30" x2="660" y2="280" stroke="#94A3B8" stroke-dasharray="4 2" stroke-width="1.5" />

    <!-- Summary Box -->
    <g transform="translate(40, 320)">
      <rect width="700" height="65" rx="8" fill="#F8FAFC" stroke="#CBD5E1" />
      <text x="20" y="25" fill="#0F172A" font-size="12" font-weight="bold">Slot Boundary Rule:</text>
      <text x="20" y="46" fill="#475569" font-size="11">Stations cannot transmit at arbitrary times. If a frame arrives mid-slot, the station must wait until the NEXT slot boundary. This prevents partial collisions and cuts the vulnerable window from 2T_fr down to exactly 1T_fr.</text>
    </g>
  </g>
</svg>
`);

// 8. CSMA 1-Persistent Flowchart
writeSvg('csma-1-persistent-flowchart.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 500" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <rect x="30" y="20" width="840" height="54" rx="10" fill="#0F172A" />
  <text x="50" y="53" fill="#F8FAFC" font-size="18" font-weight="700">1-Persistent CSMA Algorithm: Logic Flowchart</text>

  <g transform="translate(250, 95)">
    <!-- Start -->
    <rect x="100" y="0" width="160" height="38" rx="19" fill="#1E293B" />
    <text x="180" y="24" fill="#FFF" font-size="12" font-weight="bold" text-anchor="middle">Station Has Frame</text>

    <!-- Line down -->
    <line x1="180" y1="38" x2="180" y2="65" stroke="#64748B" stroke-width="2" />
    <polygon points="180,68 176,60 184,60" fill="#64748B" />

    <!-- Sense Medium -->
    <rect x="80" y="70" width="200" height="42" rx="6" fill="#DBEAFE" stroke="#3B82F6" stroke-width="1.5" />
    <text x="180" y="96" fill="#1E40AF" font-size="11" font-weight="bold" text-anchor="middle">Sense the Channel</text>

    <line x1="180" y1="112" x2="180" y2="135" stroke="#64748B" stroke-width="2" />
    <polygon points="180,138 176,130 184,130" fill="#64748B" />

    <!-- Decision Diamond -->
    <polygon points="180,140 270,180 180,220 90,180" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2" />
    <text x="180" y="184" fill="#92400E" font-size="11" font-weight="bold" text-anchor="middle">Channel Idle?</text>

    <!-- No / Busy Loop -->
    <line x1="90" y1="180" x2="20" y2="180" stroke="#EF4444" stroke-width="2" />
    <line x1="20" y1="180" x2="20" y2="91" stroke="#EF4444" stroke-width="2" />
    <line x1="20" y1="91" x2="75" y2="91" stroke="#EF4444" stroke-width="2" />
    <polygon points="78,91 70,87 70,95" fill="#EF4444" />
    <text x="50" y="172" fill="#DC2626" font-size="10" font-weight="bold">No (Busy)</text>
    <text x="45" y="130" fill="#DC2626" font-size="9" transform="rotate(-90 45 130)">Continuously Sense</text>

    <!-- Yes / Idle -->
    <line x1="180" y1="220" x2="180" y2="250" stroke="#10B981" stroke-width="2" />
    <polygon points="180,253 176,245 184,245" fill="#10B981" />
    <text x="195" y="238" fill="#059669" font-size="10" font-weight="bold">Yes</text>

    <!-- Transmit -->
    <rect x="70" y="255" width="220" height="42" rx="6" fill="#D1FAE5" stroke="#10B981" stroke-width="2" />
    <text x="180" y="281" fill="#065F46" font-size="12" font-weight="bold" text-anchor="middle">Transmit Frame Immediately (p = 1)</text>

    <line x1="180" y1="297" x2="180" y2="325" stroke="#64748B" stroke-width="2" />
    <polygon points="180,328 176,320 184,320" fill="#64748B" />

    <!-- End -->
    <rect x="100" y="330" width="160" height="36" rx="18" fill="#1E293B" />
    <text x="180" y="353" fill="#FFF" font-size="11" font-weight="bold" text-anchor="middle">Transmission Done</text>
  </g>
</svg>
`);

// 9. CSMA Comparison Radar Matrix
writeSvg('multiple-access-comparison-radar.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 500" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <rect x="30" y="20" width="840" height="54" rx="10" fill="#0F172A" />
  <text x="50" y="53" fill="#F8FAFC" font-size="18" font-weight="700">Comprehensive Comparison: All Multiple Access Protocols</text>

  <g transform="translate(50, 95)">
    <!-- Header -->
    <rect x="0" y="0" width="800" height="36" rx="6" fill="#1E293B" />
    <text x="15" y="23" fill="#FFF" font-size="11" font-weight="bold">Protocol</text>
    <text x="170" y="23" fill="#A7F3D0" font-size="11" font-weight="bold">Sensing?</text>
    <text x="260" y="23" fill="#A7F3D0" font-size="11" font-weight="bold">Collision Detection?</text>
    <text x="420" y="23" fill="#93C5FD" font-size="11" font-weight="bold">Max Throughput</text>
    <text x="560" y="23" fill="#C4B5FD" font-size="11" font-weight="bold">Primary Medium</text>
    <text x="690" y="23" fill="#FDE68A" font-size="11" font-weight="bold">Key Strength</text>

    <!-- Pure ALOHA -->
    <rect x="0" y="40" width="800" height="38" fill="#F8FAFC" stroke="#E2E8F0" />
    <text x="15" y="64" fill="#0F172A" font-size="10.5" font-weight="bold">Pure ALOHA</text>
    <text x="170" y="64" fill="#DC2626" font-size="10">No</text>
    <text x="260" y="64" fill="#DC2626" font-size="10">No (ACK timeout)</text>
    <text x="420" y="64" fill="#DC2626" font-size="10.5" font-weight="bold">18.4% (G=0.5)</text>
    <text x="560" y="64" fill="#64748B" font-size="10">Wireless / Satellite</text>
    <text x="690" y="64" fill="#64748B" font-size="9.5">Extremely simple</text>

    <!-- Slotted ALOHA -->
    <rect x="0" y="82" width="800" height="38" fill="#FFFFFF" stroke="#E2E8F0" />
    <text x="15" y="106" fill="#0F172A" font-size="10.5" font-weight="bold">Slotted ALOHA</text>
    <text x="170" y="106" fill="#DC2626" font-size="10">No</text>
    <text x="260" y="106" fill="#DC2626" font-size="10">No (ACK timeout)</text>
    <text x="420" y="106" fill="#D97706" font-size="10.5" font-weight="bold">36.8% (G=1.0)</text>
    <text x="560" y="106" fill="#64748B" font-size="10">Satellite Up-link</text>
    <text x="690" y="106" fill="#64748B" font-size="9.5">2&times; capacity of Pure</text>

    <!-- 1-Persistent CSMA -->
    <rect x="0" y="124" width="800" height="38" fill="#F8FAFC" stroke="#E2E8F0" />
    <text x="15" y="148" fill="#0F172A" font-size="10.5" font-weight="bold">1-Persistent CSMA</text>
    <text x="170" y="148" fill="#059669" font-size="10">Yes (Continuous)</text>
    <text x="260" y="148" fill="#DC2626" font-size="10">No</text>
    <text x="420" y="148" fill="#2563EB" font-size="10.5">&approx; 50%</text>
    <text x="560" y="148" fill="#64748B" font-size="10">Baseband Bus</text>
    <text x="690" y="148" fill="#64748B" font-size="9.5">Lowest idle latency</text>

    <!-- CSMA/CD -->
    <rect x="0" y="166" width="800" height="42" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1.5" />
    <text x="15" y="192" fill="#1E40AF" font-size="11" font-weight="bold">CSMA/CD (802.3)</text>
    <text x="170" y="192" fill="#059669" font-size="10.5" font-weight="bold">Yes</text>
    <text x="260" y="192" fill="#059669" font-size="10.5" font-weight="bold">Yes (Hardware abort)</text>
    <text x="420" y="192" fill="#059669" font-size="11" font-weight="bold">&gt; 90% (Low &tau;)</text>
    <text x="560" y="192" fill="#1E40AF" font-size="10.5" font-weight="bold">Wired Ethernet</text>
    <text x="690" y="192" fill="#059669" font-size="10" font-weight="bold">Zero time wasted on collision</text>

    <!-- CSMA/CA -->
    <rect x="0" y="212" width="800" height="42" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5" />
    <text x="15" y="238" fill="#065F46" font-size="11" font-weight="bold">CSMA/CA (802.11)</text>
    <text x="170" y="238" fill="#059669" font-size="10.5" font-weight="bold">Yes (Phys + NAV)</text>
    <text x="260" y="238" fill="#D97706" font-size="10.5">Avoidance (RTS/CTS)</text>
    <text x="420" y="238" fill="#059669" font-size="11">&approx; 70-80%</text>
    <text x="560" y="238" fill="#065F46" font-size="10.5" font-weight="bold">Wi-Fi Wireless</text>
    <text x="690" y="238" fill="#059669" font-size="10" font-weight="bold">Solves hidden terminal</text>

    <!-- Token Ring -->
    <rect x="0" y="258" width="800" height="38" fill="#F8FAFC" stroke="#E2E8F0" />
    <text x="15" y="282" fill="#0F172A" font-size="10.5" font-weight="bold">Token Passing (802.5)</text>
    <text x="170" y="282" fill="#64748B" font-size="10">Token based</text>
    <text x="260" y="282" fill="#059669" font-size="10">Collision-Free</text>
    <text x="420" y="282" fill="#7C3AED" font-size="10.5" font-weight="bold">&approx; 100% (Heavy load)</text>
    <text x="560" y="282" fill="#64748B" font-size="10">Ring Topology</text>
    <text x="690" y="282" fill="#64748B" font-size="9.5">Bounded max latency</text>
  </g>
</svg>
`);

console.log('Topic 4 part 2 generated successfully.');
