const fs = require('fs');
const path = require('path');

const outDir = 'assets/images/topic10';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function writeSvg(filename, content) {
  fs.writeFileSync(path.join(outDir, filename), content.trim(), 'utf8');
  console.log('Created: ' + filename);
}

// 1. Networking Devices 5-Layer Hierarchy
writeSvg('networking-devices-5-layer-hierarchy.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 420" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
  </defs>
  <rect width="850" height="420" rx="16" fill="url(#bg)"/>
  <text x="425" y="38" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Networking Devices Operating Across OSI Stack Layers</text>
  <text x="425" y="62" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Mapping Protocols, Data Units, and Interconnection Hardware from Physical to Application Layer</text>

  <!-- 4 Hierarchy Layers -->
  <g transform="translate(60, 95)">
    <!-- Layer 4-7: Application Gateway -->
    <rect x="0" y="0" width="730" height="55" rx="8" fill="#581c87" stroke="#a855f7" stroke-width="1.5"/>
    <text x="120" y="32" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#f3e8ff">Layer 7/4: Application</text>
    <text x="320" y="32" font-family="system-ui, sans-serif" font-size="14" font-weight="900" fill="#fff">GATEWAY</text>
    <text x="560" y="24" font-family="system-ui, sans-serif" font-size="11" fill="#e9d5ff">PDU: Data / Messages</text>
    <text x="560" y="42" font-family="system-ui, sans-serif" font-size="10" fill="#c084fc">Translates disparate architectures &amp; protocols</text>

    <!-- Layer 3: Router -->
    <rect x="0" y="65" width="730" height="55" rx="8" fill="#1e3a8a" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="120" y="97" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#dbeafe">Layer 3: Network</text>
    <text x="320" y="97" font-family="system-ui, sans-serif" font-size="14" font-weight="900" fill="#fff">ROUTER</text>
    <text x="560" y="89" font-family="system-ui, sans-serif" font-size="11" fill="#bfdbfe">PDU: Packets (IP Addr)</text>
    <text x="560" y="107" font-family="system-ui, sans-serif" font-size="10" fill="#93c5fd">Segments broadcast domains; path determination</text>

    <!-- Layer 2: Switch / Bridge -->
    <rect x="0" y="130" width="730" height="55" rx="8" fill="#065f46" stroke="#10b981" stroke-width="1.5"/>
    <text x="120" y="162" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#d1fae5">Layer 2: Data Link</text>
    <text x="320" y="162" font-family="system-ui, sans-serif" font-size="14" font-weight="900" fill="#fff">BRIDGE / SWITCH</text>
    <text x="560" y="154" font-family="system-ui, sans-serif" font-size="11" fill="#a7f3d0">PDU: Frames (MAC Addr)</text>
    <text x="560" y="172" font-family="system-ui, sans-serif" font-size="10" fill="#6ee7b7">Filters &amp; forwards; segments collision domains</text>

    <!-- Layer 1: Repeater / Hub -->
    <rect x="0" y="195" width="730" height="55" rx="8" fill="#78350f" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="120" y="227" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#fef3c7">Layer 1: Physical</text>
    <text x="320" y="227" font-family="system-ui, sans-serif" font-size="14" font-weight="900" fill="#fff">REPEATER / HUB</text>
    <text x="560" y="219" font-family="system-ui, sans-serif" font-size="11" fill="#fde68a">PDU: Bits (Electrical / Optical)</text>
    <text x="560" y="237" font-family="system-ui, sans-serif" font-size="10" fill="#fbbf24">Regenerates signals; shared collision domain</text>
  </g>

  <!-- Bottom Key Rules -->
  <g transform="translate(60, 360)">
    <rect width="730" height="42" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
    <text x="365" y="26" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#38bdf8" text-anchor="middle">
      Higher-layer devices understand all lower-layer headers: A Router (L3) inspects MAC addresses (L2) and physical signals (L1).
    </text>
  </g>
</svg>`);

// 2. Repeater Signal Regeneration
writeSvg('repeater-signal-regeneration.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 380" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
  </defs>
  <rect width="850" height="380" rx="16" fill="url(#bg)"/>
  <text x="425" y="38" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Repeater: Signal Regeneration vs. Simple Amplification</text>
  <text x="425" y="62" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Layer 1 Device Cleans Noise and Restores Crisp Digital Waveforms Bit-by-Bit</text>

  <!-- Left: Weak & Distorted Signal -->
  <g transform="translate(50, 110)">
    <rect width="260" height="150" rx="10" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
    <text x="130" y="26" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fca5a5" text-anchor="middle">Attenuated &amp; Noisy Input</text>

    <!-- Distorted analog-like square wave -->
    <path d="M 25 100 Q 40 60 55 70 Q 70 85 85 65 Q 100 115 115 110 Q 130 115 145 95 Q 160 55 175 75 Q 190 90 205 60 Q 220 120 235 110" stroke="#ef4444" stroke-width="3" fill="none"/>
    <text x="130" y="138" font-family="system-ui, sans-serif" font-size="10" fill="#fca5a5" text-anchor="middle">Degraded amplitude with cable noise</text>
  </g>

  <!-- Center: Repeater -->
  <g transform="translate(365, 130)">
    <rect width="120" height="110" rx="10" fill="#78350f" stroke="#f59e0b" stroke-width="2"/>
    <text x="60" y="35" font-family="system-ui, sans-serif" font-size="14" font-weight="900" fill="#fff" text-anchor="middle">REPEATER</text>
    <text x="60" y="55" font-family="system-ui, sans-serif" font-size="10" fill="#fde68a" text-anchor="middle">Threshold Detector</text>
    <text x="60" y="70" font-family="system-ui, sans-serif" font-size="10" fill="#fde68a" text-anchor="middle">+ Clock Generator</text>
    <text x="60" y="95" font-family="monospace" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">10101100</text>
  </g>

  <!-- Connectors -->
  <line x1="310" y1="185" x2="365" y2="185" stroke="#ef4444" stroke-width="3"/>
  <line x1="485" y1="185" x2="540" y2="185" stroke="#10b981" stroke-width="3"/>

  <!-- Right: Regenerated Clean Signal -->
  <g transform="translate(540, 110)">
    <rect width="260" height="150" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="130" y="26" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#34d399" text-anchor="middle">Clean Regenerated Output</text>

    <!-- Perfect crisp digital wave -->
    <path d="M 25 115 L 55 115 L 55 65 L 115 65 L 115 115 L 175 115 L 175 65 L 235 65" stroke="#34d399" stroke-width="3" fill="none"/>
    <text x="130" y="138" font-family="system-ui, sans-serif" font-size="10" fill="#a7f3d0" text-anchor="middle">Full 5V logic swing with zero noise</text>
  </g>

  <!-- Explanatory Footer -->
  <g transform="translate(50, 290)">
    <rect width="750" height="65" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
    <text x="375" y="25" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">
      <strong fill="#f59e0b">Amplifier vs. Repeater:</strong> An analog amplifier boosts both signal AND noise, worsening SNR downstream.
    </text>
    <text x="375" y="48" font-family="system-ui, sans-serif" font-size="11" fill="#38bdf8" text-anchor="middle">
      A digital Repeater decodes bits based on voltage threshold, discarding noise entirely and re-clocking new bits.
    </text>
  </g>
</svg>`);

// 3. Hub Shared Collision Domain
writeSvg('hub-shared-collision-domain.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 380" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
  </defs>
  <rect width="850" height="380" rx="16" fill="url(#bg)"/>
  <text x="425" y="38" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Hub: Multi-Port Repeater with Shared Collision Domain</text>
  <text x="425" y="62" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">All Ports Electrically Tied: Ingress Bits on One Port are Blindly Repeated to All Other Ports</text>

  <!-- Center: Hub -->
  <g transform="translate(365, 115)">
    <rect width="120" height="80" rx="8" fill="#78350f" stroke="#f59e0b" stroke-width="2"/>
    <text x="60" y="35" font-family="system-ui, sans-serif" font-size="16" font-weight="900" fill="#fff" text-anchor="middle">HUB</text>
    <text x="60" y="55" font-family="system-ui, sans-serif" font-size="10" fill="#fde68a" text-anchor="middle">Multiport L1</text>
    <text x="60" y="70" font-family="system-ui, sans-serif" font-size="9" fill="#fde68a" text-anchor="middle">Repeater</text>
  </g>

  <!-- 4 Stations around Hub -->
  <!-- Station A (Sending) -->
  <g transform="translate(100, 125)">
    <rect width="110" height="60" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="55" y="35" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#fff" text-anchor="middle">Host A</text>
    <text x="55" y="50" font-family="system-ui, sans-serif" font-size="9" fill="#38bdf8" text-anchor="middle">Transmitting</text>
  </g>
  <line x1="210" y1="155" x2="365" y2="155" stroke="#38bdf8" stroke-width="3"/>
  <text x="285" y="145" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#38bdf8">Bit Stream →</text>

  <!-- Station B (Receives) -->
  <g transform="translate(640, 125)">
    <rect width="110" height="60" rx="6" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
    <text x="55" y="35" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#fff" text-anchor="middle">Host B</text>
    <text x="55" y="50" font-family="system-ui, sans-serif" font-size="9" fill="#ef4444" text-anchor="middle">Forced Listener</text>
  </g>
  <line x1="485" y1="155" x2="640" y2="155" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="3 2"/>

  <!-- Station C (Top) -->
  <g transform="translate(370, 10)">
    <rect width="110" height="50" rx="6" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
    <text x="55" y="30" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fff" text-anchor="middle">Host C</text>
  </g>
  <line x1="425" y1="60" x2="425" y2="115" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="3 2"/>

  <!-- Station D (Bottom) -->
  <g transform="translate(370, 240)">
    <rect width="110" height="50" rx="6" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
    <text x="55" y="30" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fff" text-anchor="middle">Host D</text>
  </g>
  <line x1="425" y1="195" x2="425" y2="240" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="3 2"/>

  <!-- Summary Box -->
  <g transform="translate(80, 310)">
    <rect width="690" height="50" rx="8" fill="#450a0a" stroke="#ef4444" stroke-width="1.5"/>
    <text x="345" y="30" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fca5a5" text-anchor="middle">
      ⚠️ Inefficient: Only ONE device can transmit at a time. Half-duplex only; simultaneous send causes collision.
    </text>
  </g>
</svg>`);

// 4. Bridge Two Collision Domains
writeSvg('bridge-two-collision-domains.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 380" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
  </defs>
  <rect width="850" height="380" rx="16" fill="url(#bg)"/>
  <text x="425" y="38" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Bridge: Dividing One Collision Domain into Two</text>
  <text x="425" y="62" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Collisions on Left Segment (Domain 1) Do Not Propagate to Right Segment (Domain 2)</text>

  <!-- Collision Domain 1 -->
  <g transform="translate(60, 100)">
    <rect width="320" height="180" rx="10" fill="#0284c7" fill-opacity="0.12" stroke="#38bdf8" stroke-width="2" stroke-dasharray="6 4"/>
    <text x="160" y="25" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#38bdf8" text-anchor="middle">Collision Domain 1</text>
    
    <rect x="30" y="60" width="80" height="50" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="70" y="90" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff" text-anchor="middle">STA A1</text>

    <rect x="210" y="60" width="80" height="50" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="250" y="90" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff" text-anchor="middle">STA A2</text>

    <line x1="110" y1="85" x2="210" y2="85" stroke="#38bdf8" stroke-width="2"/>
    <text x="160" y="145" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">A1 &amp; A2 share bandwidth</text>
  </g>

  <!-- Central Bridge -->
  <g transform="translate(370, 130)">
    <rect width="110" height="90" rx="10" fill="#1e3a8a" stroke="#60a5fa" stroke-width="2.5"/>
    <text x="55" y="40" font-family="system-ui, sans-serif" font-size="14" font-weight="900" fill="#fff" text-anchor="middle">BRIDGE</text>
    <text x="55" y="60" font-family="system-ui, sans-serif" font-size="10" fill="#93c5fd" text-anchor="middle">L2 Isolation</text>
    <text x="55" y="75" font-family="monospace" font-size="9" fill="#a5b4fc" text-anchor="middle">Buffer &amp; Filter</text>
  </g>

  <!-- Collision Domain 2 -->
  <g transform="translate(470, 100)">
    <rect width="320" height="180" rx="10" fill="#059669" fill-opacity="0.12" stroke="#10b981" stroke-width="2" stroke-dasharray="6 4"/>
    <text x="160" y="25" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#34d399" text-anchor="middle">Collision Domain 2</text>

    <rect x="30" y="60" width="80" height="50" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="70" y="90" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff" text-anchor="middle">STA B1</text>

    <rect x="210" y="60" width="80" height="50" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="250" y="90" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff" text-anchor="middle">STA B2</text>

    <line x1="110" y1="85" x2="210" y2="85" stroke="#10b981" stroke-width="2"/>
    <text x="160" y="145" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">B1 &amp; B2 transmit independently</text>
  </g>

  <!-- Bottom Evaluation Banner -->
  <g transform="translate(60, 305)">
    <rect width="730" height="50" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
    <text x="365" y="30" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">
      <strong fill="#34d399">Key Throughput Benefit:</strong> Simultaneous transmissions can occur in Domain 1 (A1→A2) and Domain 2 (B1→B2) in parallel!
    </text>
  </g>
</svg>`);

// 5. Switch Microsegmentation & Full Duplex
writeSvg('switch-microsegmentation-full-duplex.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
  </defs>
  <rect width="850" height="400" rx="16" fill="url(#bg)"/>
  <text x="425" y="38" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Switch Micro-Segmentation &amp; Full-Duplex Operation</text>
  <text x="425" y="62" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Each Switch Port is Its Own Dedicated Collision Domain with Simultaneous TX and RX Paths</text>

  <!-- Switch Box -->
  <g transform="translate(250, 100)">
    <rect width="350" height="150" rx="12" fill="#065f46" stroke="#10b981" stroke-width="2.5"/>
    <text x="175" y="35" font-family="system-ui, sans-serif" font-size="16" font-weight="900" fill="#fff" text-anchor="middle">LAYER 2 SWITCH</text>
    <text x="175" y="55" font-family="system-ui, sans-serif" font-size="11" fill="#a7f3d0" text-anchor="middle">Wire-Speed Non-Blocking Crossbar Matrix</text>

    <!-- 4 Ports -->
    <rect x="30" y="80" width="60" height="40" rx="4" fill="#047857" stroke="#34d399" stroke-width="1.5"/>
    <text x="60" y="105" font-family="monospace" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">Port 1</text>

    <rect x="110" y="80" width="60" height="40" rx="4" fill="#047857" stroke="#34d399" stroke-width="1.5"/>
    <text x="140" y="105" font-family="monospace" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">Port 2</text>

    <rect x="190" y="80" width="60" height="40" rx="4" fill="#047857" stroke="#34d399" stroke-width="1.5"/>
    <text x="220" y="105" font-family="monospace" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">Port 3</text>

    <rect x="270" y="80" width="60" height="40" rx="4" fill="#047857" stroke="#34d399" stroke-width="1.5"/>
    <text x="300" y="105" font-family="monospace" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">Port 4</text>
  </g>

  <!-- Dedicated Host Drops (Micro-segments) -->
  <!-- Host 1 -->
  <g transform="translate(60, 270)">
    <rect width="130" height="60" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="65" y="30" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fff" text-anchor="middle">PC 1 (Dedicated)</text>
    <text x="65" y="48" font-family="system-ui, sans-serif" font-size="10" fill="#38bdf8" text-anchor="middle">1 Gbps Full-Duplex</text>
  </g>
  <line x1="125" y1="270" x2="310" y2="220" stroke="#38bdf8" stroke-width="2.5"/>

  <!-- Host 2 -->
  <g transform="translate(250, 270)">
    <rect width="130" height="60" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="65" y="30" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fff" text-anchor="middle">PC 2 (Dedicated)</text>
    <text x="65" y="48" font-family="system-ui, sans-serif" font-size="10" fill="#38bdf8" text-anchor="middle">1 Gbps Full-Duplex</text>
  </g>
  <line x1="315" y1="270" x2="390" y2="220" stroke="#38bdf8" stroke-width="2.5"/>

  <!-- Host 3 -->
  <g transform="translate(470, 270)">
    <rect width="130" height="60" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="65" y="30" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fff" text-anchor="middle">Server (Dedicated)</text>
    <text x="65" y="48" font-family="system-ui, sans-serif" font-size="10" fill="#38bdf8" text-anchor="middle">10 Gbps Full-Duplex</text>
  </g>
  <line x1="535" y1="270" x2="470" y2="220" stroke="#38bdf8" stroke-width="2.5"/>

  <!-- Host 4 -->
  <g transform="translate(660, 270)">
    <rect width="130" height="60" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="65" y="30" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fff" text-anchor="middle">Router (Dedicated)</text>
    <text x="65" y="48" font-family="system-ui, sans-serif" font-size="10" fill="#38bdf8" text-anchor="middle">10 Gbps Full-Duplex</text>
  </g>
  <line x1="725" y1="270" x2="550" y2="220" stroke="#38bdf8" stroke-width="2.5"/>

  <!-- Top Feature Bullet -->
  <text x="425" y="365" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#34d399" text-anchor="middle">
    Zero Collisions: Simultaneous send/receive pairs over separate wire pins eliminate CSMA/CD backoff completely.
  </text>
</svg>`);

// 6. Router Broadcast Domain Segmentation
writeSvg('router-broadcast-domain-segmentation.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
  </defs>
  <rect width="850" height="400" rx="16" fill="url(#bg)"/>
  <text x="425" y="38" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Router: Segmenting Broadcast Domains at Layer 3</text>
  <text x="425" y="62" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Routers Terminate Broadcast Frames (FF:FF:FF:FF:FF:FF) and Forward Packets Based on IP Addresses</text>

  <!-- Left Subnet: 192.168.1.0/24 (Broadcast Domain 1) -->
  <g transform="translate(60, 95)">
    <rect width="320" height="210" rx="12" fill="#1e3a8a" fill-opacity="0.15" stroke="#3b82f6" stroke-width="2" stroke-dasharray="6 4"/>
    <text x="160" y="28" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#60a5fa" text-anchor="middle">BROADCAST DOMAIN 1</text>
    <text x="160" y="46" font-family="monospace" font-size="11" fill="#93c5fd" text-anchor="middle">192.168.1.0 / 24</text>

    <!-- Switch 1 -->
    <rect x="100" y="65" width="120" height="40" rx="6" fill="#047857"/>
    <text x="160" y="90" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">L2 Switch 1</text>

    <!-- Hosts -->
    <circle cx="70" cy="155" r="18" fill="#334155" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="70" y="160" font-family="monospace" font-size="9" fill="#fff" text-anchor="middle">.10</text>

    <circle cx="160" cy="155" r="18" fill="#334155" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="160" y="160" font-family="monospace" font-size="9" fill="#fff" text-anchor="middle">.11</text>

    <circle cx="250" cy="155" r="18" fill="#334155" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="250" y="160" font-family="monospace" font-size="9" fill="#fff" text-anchor="middle">.12</text>

    <line x1="120" y1="105" x2="70" y2="137" stroke="#3b82f6" stroke-width="1.5"/>
    <line x1="160" y1="105" x2="160" y2="137" stroke="#3b82f6" stroke-width="1.5"/>
    <line x1="200" y1="105" x2="250" y2="137" stroke="#3b82f6" stroke-width="1.5"/>
  </g>

  <!-- Center: Layer 3 Router -->
  <g transform="translate(370, 130)">
    <circle cx="55" cy="55" r="45" fill="#1e3a8a" stroke="#60a5fa" stroke-width="3"/>
    <!-- Router arrows cross -->
    <path d="M 30 55 L 80 55 M 55 30 L 55 80" stroke="#fff" stroke-width="3"/>
    <text x="55" y="118" font-family="system-ui, sans-serif" font-size="13" font-weight="900" fill="#fff" text-anchor="middle">ROUTER</text>
    <text x="55" y="133" font-family="system-ui, sans-serif" font-size="10" fill="#93c5fd" text-anchor="middle">Default Gateway</text>
  </g>

  <!-- Right Subnet: 10.0.0.0/8 (Broadcast Domain 2) -->
  <g transform="translate(470, 95)">
    <rect width="320" height="210" rx="12" fill="#059669" fill-opacity="0.15" stroke="#10b981" stroke-width="2" stroke-dasharray="6 4"/>
    <text x="160" y="28" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#34d399" text-anchor="middle">BROADCAST DOMAIN 2</text>
    <text x="160" y="46" font-family="monospace" font-size="11" fill="#a7f3d0" text-anchor="middle">10.0.0.0 / 8</text>

    <!-- Switch 2 -->
    <rect x="100" y="65" width="120" height="40" rx="6" fill="#047857"/>
    <text x="160" y="90" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">L2 Switch 2</text>

    <!-- Hosts -->
    <circle cx="70" cy="155" r="18" fill="#334155" stroke="#10b981" stroke-width="1.5"/>
    <text x="70" y="160" font-family="monospace" font-size="9" fill="#fff" text-anchor="middle">.20</text>

    <circle cx="160" cy="155" r="18" fill="#334155" stroke="#10b981" stroke-width="1.5"/>
    <text x="160" y="160" font-family="monospace" font-size="9" fill="#fff" text-anchor="middle">.21</text>

    <circle cx="250" cy="155" r="18" fill="#334155" stroke="#10b981" stroke-width="1.5"/>
    <text x="250" y="160" font-family="monospace" font-size="9" fill="#fff" text-anchor="middle">.22</text>

    <line x1="120" y1="105" x2="70" y2="137" stroke="#10b981" stroke-width="1.5"/>
    <line x1="160" y1="105" x2="160" y2="137" stroke="#10b981" stroke-width="1.5"/>
    <line x1="200" y1="105" x2="250" y2="137" stroke="#10b981" stroke-width="1.5"/>
  </g>

  <!-- Connectors to Router -->
  <line x1="280" y1="185" x2="370" y2="185" stroke="#60a5fa" stroke-width="3"/>
  <line x1="480" y1="185" x2="570" y2="185" stroke="#34d399" stroke-width="3"/>

  <!-- Footer Banner -->
  <g transform="translate(60, 325)">
    <rect width="730" height="50" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
    <text x="365" y="30" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">
      <strong fill="#ef4444">Broadcast Containment:</strong> An ARP request or DHCP discover broadcast in Subnet 1 NEVER leaks into Subnet 2.
    </text>
  </g>
</svg>`);

// 7. Gateway Protocol Translation
writeSvg('gateway-protocol-translation.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
  </defs>
  <rect width="850" height="400" rx="16" fill="url(#bg)"/>
  <text x="425" y="38" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Application Gateway: Higher-Layer Protocol Translation</text>
  <text x="425" y="62" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Operating at Layers 4 to 7 to Bridge Fundamentally Incompatible Network Architectures</text>

  <!-- Left: System A (e.g. SIP / VoIP Network) -->
  <g transform="translate(60, 100)">
    <rect width="230" height="180" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="115" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#38bdf8" text-anchor="middle">IP Network (VoIP)</text>
    <text x="20" y="65" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• Protocol: SIP / RTP</text>
    <text x="20" y="90" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• Transport: UDP</text>
    <text x="20" y="115" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• Addressing: IP Address</text>
    <text x="20" y="140" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• Encoding: G.711 / Opus</text>
  </g>

  <!-- Center: Protocol Gateway -->
  <g transform="translate(320, 100)">
    <rect width="210" height="180" rx="12" fill="#581c87" stroke="#c084fc" stroke-width="2.5"/>
    <text x="105" y="32" font-family="system-ui, sans-serif" font-size="15" font-weight="900" fill="#fff" text-anchor="middle">VOIP GATEWAY</text>
    <text x="105" y="52" font-family="system-ui, sans-serif" font-size="11" fill="#e9d5ff" text-anchor="middle">Layer 4–7 Protocol Converter</text>

    <!-- Internal Conversion Graphic -->
    <rect x="20" y="70" width="170" height="85" rx="6" fill="#3b0764"/>
    <text x="105" y="95" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#a855f7" text-anchor="middle">Packet Disassembly</text>
    <text x="105" y="115" font-family="system-ui, sans-serif" font-size="11" fill="#fff" text-anchor="middle">⇄ Translation Engine ⇄</text>
    <text x="105" y="135" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#34d399" text-anchor="middle">Signal Re-Encoding</text>
  </g>

  <!-- Right: System B (PSTN Telephony) -->
  <g transform="translate(560, 100)">
    <rect width="230" height="180" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="115" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#34d399" text-anchor="middle">Legacy PSTN Network</text>
    <text x="20" y="65" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• Protocol: SS7 / ISDN</text>
    <text x="20" y="90" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• Transport: TDM Circuit</text>
    <text x="20" y="115" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• Addressing: Phone Numbers (E.164)</text>
    <text x="20" y="140" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• Encoding: Analog PCM 64k</text>
  </g>

  <!-- Connective Arrows -->
  <line x1="290" y1="190" x2="320" y2="190" stroke="#38bdf8" stroke-width="3"/>
  <line x1="530" y1="190" x2="560" y2="190" stroke="#10b981" stroke-width="3"/>

  <!-- Footer Box -->
  <g transform="translate(60, 310)">
    <rect width="730" height="65" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
    <text x="365" y="25" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">
      <strong fill="#c084fc">Gateway Definition:</strong> Unlike routers that merely swap MAC headers and route IP packets, a Gateway completely
    </text>
    <text x="365" y="48" font-family="system-ui, sans-serif" font-size="11" fill="#38bdf8" text-anchor="middle">
      terminates the connection on one side, translates data semantics/syntax, and establishes a brand new session on the other side.
    </text>
  </g>
</svg>`);

// 8. Device Working Principles Comparison Matrix
writeSvg('device-working-principles-matrix.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 420" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
  </defs>
  <rect width="850" height="420" rx="16" fill="url(#bg)"/>
  <text x="425" y="38" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Comprehensive Networking Devices Comparison Matrix</text>
  <text x="425" y="62" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Layer, PDU, Addressing, Forwarding Decision, and Collision/Broadcast Domain Summary</text>

  <!-- Comparison Table -->
  <g transform="translate(40, 85)">
    <!-- Header -->
    <rect x="0" y="0" width="770" height="35" rx="6" fill="#1e3a8a" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="60" y="22" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">Device</text>
    <text x="140" y="22" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">OSI Layer</text>
    <text x="230" y="22" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">PDU</text>
    <text x="350" y="22" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">Decision Mechanism</text>
    <text x="500" y="22" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">Collision Domain</text>
    <text x="660" y="22" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">Broadcast Domain</text>

    <!-- Row 1: Repeater / Hub -->
    <rect x="0" y="40" width="770" height="45" rx="4" fill="#1e293b"/>
    <text x="60" y="67" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#f59e0b" text-anchor="middle">Repeater / Hub</text>
    <text x="140" y="67" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">Layer 1 (PHY)</text>
    <text x="230" y="67" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">Bits</text>
    <text x="350" y="67" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">None (Re-clock &amp; Repeat)</text>
    <text x="500" y="67" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#ef4444" text-anchor="middle">1 Shared Domain</text>
    <text x="660" y="67" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">1 Shared Domain</text>

    <!-- Row 2: Bridge -->
    <rect x="0" y="90" width="770" height="45" rx="4" fill="#0f172a"/>
    <text x="60" y="117" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#38bdf8" text-anchor="middle">Bridge</text>
    <text x="140" y="117" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">Layer 2 (DLL)</text>
    <text x="230" y="117" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">Frames</text>
    <text x="350" y="117" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">Destination MAC Table (Software)</text>
    <text x="500" y="117" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#34d399" text-anchor="middle">2–4 Domains (Per port)</text>
    <text x="660" y="117" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">1 Shared Domain</text>

    <!-- Row 3: Switch -->
    <rect x="0" y="140" width="770" height="45" rx="4" fill="#1e293b"/>
    <text x="60" y="167" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#10b981" text-anchor="middle">L2 Switch</text>
    <text x="140" y="167" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">Layer 2 (DLL)</text>
    <text x="230" y="167" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">Frames</text>
    <text x="350" y="167" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">ASIC Hardware CAM Lookup</text>
    <text x="500" y="167" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#34d399" text-anchor="middle">1 per port (Microseg)</text>
    <text x="660" y="167" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">1 Shared (per VLAN)</text>

    <!-- Row 4: Router -->
    <rect x="0" y="190" width="770" height="45" rx="4" fill="#0f172a"/>
    <text x="60" y="217" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#60a5fa" text-anchor="middle">Router</text>
    <text x="140" y="217" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">Layer 3 (Net)</text>
    <text x="230" y="217" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">Packets</text>
    <text x="350" y="217" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">IP Routing Table (FIB / LPM)</text>
    <text x="500" y="217" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#34d399" text-anchor="middle">1 per port</text>
    <text x="660" y="217" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#34d399" text-anchor="middle">1 per interface (Breaks it)</text>

    <!-- Row 5: Gateway -->
    <rect x="0" y="240" width="770" height="45" rx="4" fill="#1e293b"/>
    <text x="60" y="267" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#c084fc" text-anchor="middle">Gateway</text>
    <text x="140" y="267" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">Layer 4–7</text>
    <text x="230" y="267" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">Messages</text>
    <text x="350" y="267" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">Application Translation Rules</text>
    <text x="500" y="267" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#34d399" text-anchor="middle">Isolated</text>
    <text x="660" y="267" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#34d399" text-anchor="middle">Completely Isolated</text>
  </g>
</svg>`);

// 9. Comparison Networking Devices Topology
writeSvg('comparison-networking-devices-topology.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 420" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
  </defs>
  <rect width="850" height="420" rx="16" fill="url(#bg)"/>
  <text x="425" y="38" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Complete Network Topology with All Networking Devices</text>
  <text x="425" y="62" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Hubs, Switches, Routers, and Gateways Working in Concert from Edge to Core to WAN</text>

  <!-- Complete Network Path from Left to Right -->
  <!-- 1. Hub Workgroup (Legacy Edge) -->
  <g transform="translate(40, 140)">
    <rect width="130" height="120" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="65" y="25" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fbbf24" text-anchor="middle">Legacy Workgroup</text>
    
    <rect x="25" y="35" width="80" height="30" rx="4" fill="#78350f"/>
    <text x="65" y="55" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">HUB (L1)</text>

    <circle cx="35" cy="95" r="14" fill="#334155"/>
    <text x="35" y="99" font-family="system-ui, sans-serif" font-size="9" fill="#fff" text-anchor="middle">PC1</text>
    <circle cx="95" cy="95" r="14" fill="#334155"/>
    <text x="95" y="99" font-family="system-ui, sans-serif" font-size="9" fill="#fff" text-anchor="middle">PC2</text>
  </g>

  <!-- 2. Departmental Switch (L2) -->
  <g transform="translate(230, 140)">
    <rect width="150" height="120" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="75" y="25" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#34d399" text-anchor="middle">Department Switch</text>

    <rect x="25" y="35" width="100" height="35" rx="6" fill="#065f46"/>
    <text x="75" y="58" font-family="system-ui, sans-serif" font-size="12" font-weight="900" fill="#fff" text-anchor="middle">SWITCH (L2)</text>

    <circle cx="45" cy="95" r="14" fill="#334155"/>
    <text x="45" y="99" font-family="system-ui, sans-serif" font-size="9" fill="#fff" text-anchor="middle">PC3</text>
    <circle cx="105" cy="95" r="14" fill="#334155"/>
    <text x="105" y="99" font-family="system-ui, sans-serif" font-size="9" fill="#fff" text-anchor="middle">Server</text>
  </g>

  <!-- Line Hub to Switch -->
  <line x1="170" y1="200" x2="230" y2="200" stroke="#f59e0b" stroke-width="2.5"/>

  <!-- 3. Enterprise Router (L3) -->
  <g transform="translate(440, 140)">
    <rect width="140" height="120" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="70" y="25" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#60a5fa" text-anchor="middle">Subnet Gateway</text>

    <circle cx="70" cy="70" r="30" fill="#1e3a8a" stroke="#60a5fa" stroke-width="2"/>
    <text x="70" y="75" font-family="system-ui, sans-serif" font-size="11" font-weight="900" fill="#fff" text-anchor="middle">ROUTER</text>
    <text x="70" y="110" font-family="system-ui, sans-serif" font-size="9" fill="#93c5fd" text-anchor="middle">Layer 3 IP Routing</text>
  </g>

  <!-- Line Switch to Router -->
  <line x1="380" y1="200" x2="440" y2="200" stroke="#10b981" stroke-width="2.5"/>

  <!-- 4. Application Gateway & WAN -->
  <g transform="translate(640, 140)">
    <rect width="160" height="120" rx="8" fill="#1e293b" stroke="#a855f7" stroke-width="1.5"/>
    <text x="80" y="25" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#c084fc" text-anchor="middle">WAN / Cloud Gateway</text>

    <rect x="25" y="40" width="110" height="35" rx="6" fill="#581c87"/>
    <text x="80" y="62" font-family="system-ui, sans-serif" font-size="12" font-weight="900" fill="#fff" text-anchor="middle">GATEWAY (L7)</text>
    <text x="80" y="100" font-family="system-ui, sans-serif" font-size="10" fill="#e9d5ff" text-anchor="middle">To Cloud / PSTN 🌐</text>
  </g>

  <!-- Line Router to Gateway -->
  <line x1="580" y1="200" x2="640" y2="200" stroke="#3b82f6" stroke-width="2.5"/>

  <!-- Bottom Explanatory Banner -->
  <g transform="translate(40, 310)">
    <rect width="760" height="65" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
    <text x="380" y="25" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">
      <strong fill="#fbbf24">Hub:</strong> Shared electrical bus → <strong fill="#34d399">Switch:</strong> L2 MAC micro-segmentation →
      <strong fill="#60a5fa">Router:</strong> L3 IP subnet separation → <strong fill="#c084fc">Gateway:</strong> Cross-protocol transformation.
    </text>
    <text x="380" y="48" font-family="system-ui, sans-serif" font-size="11" fill="#94a3b8" text-anchor="middle">
      Modern networks replace Hubs entirely with Switches, retaining Routers for inter-subnet security and Gateways for external services.
    </text>
  </g>
</svg>`);

// 10. Networking Devices OSI Mapping
writeSvg('networking-devices-osi-mapping.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
  </defs>
  <rect width="850" height="400" rx="16" fill="url(#bg)"/>
  <text x="425" y="38" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">OSI Layers at Which Networking Devices Operate</text>
  <text x="425" y="62" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Exact Vertical Alignment of Networking Equipment Across the 7-Layer OSI Reference Model</text>

  <!-- Left: 7 OSI Layers Column -->
  <g transform="translate(80, 90)">
    <rect x="0" y="0" width="220" height="35" rx="4" fill="#581c87"/>
    <text x="110" y="22" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">Layer 7: Application</text>

    <rect x="0" y="40" width="220" height="35" rx="4" fill="#6b21a8"/>
    <text x="110" y="62" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">Layer 6: Presentation</text>

    <rect x="0" y="80" width="220" height="35" rx="4" fill="#7e22ce"/>
    <text x="110" y="102" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">Layer 5: Session</text>

    <rect x="0" y="120" width="220" height="35" rx="4" fill="#1e3a8a"/>
    <text x="110" y="142" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">Layer 4: Transport</text>

    <rect x="0" y="160" width="220" height="35" rx="4" fill="#0284c7"/>
    <text x="110" y="182" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">Layer 3: Network</text>

    <rect x="0" y="200" width="220" height="35" rx="4" fill="#059669"/>
    <text x="110" y="222" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">Layer 2: Data Link</text>

    <rect x="0" y="240" width="220" height="35" rx="4" fill="#b45309"/>
    <text x="110" y="262" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">Layer 1: Physical</text>
  </g>

  <!-- Right: Device Brackets Mapping -->
  <g transform="translate(340, 90)">
    <!-- Gateway Bracket (Layers 4 to 7) -->
    <rect x="0" y="0" width="420" height="155" rx="8" fill="#1e293b" stroke="#c084fc" stroke-width="2"/>
    <text x="210" y="45" font-family="system-ui, sans-serif" font-size="16" font-weight="900" fill="#c084fc" text-anchor="middle">GATEWAYS (Layers 4 to 7)</text>
    <text x="210" y="70" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">Application Gateways, ALG, VoIP Media Gateways, Security Firewalls</text>
    <text x="210" y="90" font-family="system-ui, sans-serif" font-size="10" fill="#94a3b8" text-anchor="middle">Decodes application payloads, converts character sets, trans-codes media</text>

    <!-- Router Bracket (Layer 3) -->
    <rect x="0" y="160" width="420" height="35" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
    <text x="210" y="183" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#38bdf8" text-anchor="middle">ROUTER &amp; LAYER 3 SWITCH (Layer 3: Network)</text>

    <!-- Bridge / Switch Bracket (Layer 2) -->
    <rect x="0" y="200" width="420" height="35" rx="6" fill="#1e293b" stroke="#34d399" stroke-width="2"/>
    <text x="210" y="223" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#34d399" text-anchor="middle">BRIDGE &amp; LAYER 2 SWITCH (Layer 2: Data Link)</text>

    <!-- Repeater / Hub Bracket (Layer 1) -->
    <rect x="0" y="240" width="420" height="35" rx="6" fill="#1e293b" stroke="#fbbf24" stroke-width="2"/>
    <text x="210" y="263" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#fbbf24" text-anchor="middle">REPEATER &amp; MULTIPORT HUB (Layer 1: Physical)</text>
  </g>
</svg>`);

// 11. ARP Request Broadcast and Reply Unicast
writeSvg('arp-request-broadcast-reply-unicast.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
  </defs>
  <rect width="850" height="400" rx="16" fill="url(#bg)"/>
  <text x="425" y="38" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Address Resolution Protocol (ARP): IP-to-MAC Binding</text>
  <text x="425" y="62" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">ARP Request is Broadcast to All Stations | ARP Reply is Unicast Directly to Requester</text>

  <!-- Left: Step 1 (ARP Request) -->
  <g transform="translate(50, 95)">
    <rect width="360" height="260" rx="12" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="180" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#38bdf8" text-anchor="middle">1. ARP Request (BROADCAST)</text>
    
    <text x="20" y="60" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">"Who has IP 192.168.1.5? Tell 192.168.1.1"</text>
    
    <rect x="20" y="75" width="320" height="55" rx="6" fill="#0f172a" stroke="#334155" stroke-width="1"/>
    <text x="35" y="95" font-family="monospace" font-size="11" fill="#fff">Dest MAC: <tspan fill="#ef4444">FF:FF:FF:FF:FF:FF (Broadcast)</tspan></text>
    <text x="35" y="115" font-family="monospace" font-size="11" fill="#fff">Target MAC: <tspan fill="#94a3b8">00:00:00:00:00:00 (Unknown)</tspan></text>

    <!-- Visual Station Fan-out -->
    <text x="180" y="165" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fbbf24" text-anchor="middle">Switch Floods to ALL Local Ports</text>
    <text x="180" y="190" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1" text-anchor="middle">• Station .2: Ignored (IP does not match)</text>
    <text x="180" y="210" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1" text-anchor="middle">• Station .3: Ignored (IP does not match)</text>
    <text x="180" y="230" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#34d399" text-anchor="middle">• Station .5: Matches! Prepares Reply</text>
  </g>

  <!-- Right: Step 2 (ARP Reply) -->
  <g transform="translate(440, 95)">
    <rect width="360" height="260" rx="12" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="180" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#34d399" text-anchor="middle">2. ARP Reply (UNICAST)</text>

    <text x="20" y="60" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">"192.168.1.5 is at 00:1A:2B:3C:4D:05"</text>

    <rect x="20" y="75" width="320" height="55" rx="6" fill="#0f172a" stroke="#334155" stroke-width="1"/>
    <text x="35" y="95" font-family="monospace" font-size="11" fill="#fff">Dest MAC: <tspan fill="#38bdf8">00:1A:2B:3C:4D:01 (STA 1 Unicast)</tspan></text>
    <text x="35" y="115" font-family="monospace" font-size="11" fill="#fff">Sender MAC: <tspan fill="#34d399">00:1A:2B:3C:4D:05 (Resolved!)</tspan></text>

    <!-- Visual Resolution -->
    <text x="180" y="165" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#34d399" text-anchor="middle">Switch Forwards Directly to Host 1</text>
    <text x="180" y="190" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1" text-anchor="middle">• No other stations receive or process the reply.</text>
    <text x="180" y="215" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1" text-anchor="middle">• Host 1 updates its ARP Cache table.</text>
    <text x="180" y="238" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#38bdf8" text-anchor="middle">ARP Entry cached for ~20 minutes</text>
  </g>
</svg>`);

console.log('All 11 Topic 10 SVGs generated successfully!');

