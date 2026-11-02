const fs = require('fs');
const path = require('path');

const outDir = 'assets/images/topic9';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function writeSvg(filename, content) {
  fs.writeFileSync(path.join(outDir, filename), content.trim(), 'utf8');
  console.log('Created: ' + filename);
}

// 1. DLL Switching: Collision & Broadcast Domains
writeSvg('dll-switching-collision-broadcast-domains.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 420" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
  </defs>
  <rect width="850" height="420" rx="16" fill="url(#bg)"/>
  <text x="425" y="40" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Layer 2 Switching: Collision vs. Broadcast Domains</text>
  <text x="425" y="64" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Switches Isolate Collision Domains Per Port While Maintaining a Single Shared Broadcast Domain</text>

  <!-- Outer Broadcast Domain Boundary -->
  <rect x="50" y="95" width="750" height="235" rx="14" fill="#1e3a8a" fill-opacity="0.12" stroke="#3b82f6" stroke-width="2" stroke-dasharray="8 4"/>
  <text x="75" y="120" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#60a5fa">BROADCAST DOMAIN (VLAN 1 / Whole Subnet)</text>

  <!-- Central Switch -->
  <g transform="translate(365, 140)">
    <rect width="120" height="65" rx="10" fill="#047857" stroke="#34d399" stroke-width="2"/>
    <text x="60" y="32" font-family="system-ui, sans-serif" font-size="14" font-weight="900" fill="#fff" text-anchor="middle">L2 SWITCH</text>
    <text x="60" y="48" font-family="system-ui, sans-serif" font-size="10" fill="#a7f3d0" text-anchor="middle">Micro-Segmentation</text>
  </g>

  <!-- 4 Isolated Collision Domains -->
  <!-- Port 1: Host A -->
  <g transform="translate(80, 160)">
    <rect width="150" height="110" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="75" y="25" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#34d399" text-anchor="middle">Collision Domain 1</text>
    <circle cx="75" cy="65" r="20" fill="#334155" stroke="#34d399" stroke-width="1.5"/>
    <text x="75" y="70" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">Host A</text>
  </g>
  <line x1="230" y1="210" x2="365" y2="175" stroke="#10b981" stroke-width="2.5"/>
  <text x="295" y="185" font-family="monospace" font-size="10" fill="#a7f3d0">Port 1</text>

  <!-- Port 2: Host B -->
  <g transform="translate(620, 160)">
    <rect width="150" height="110" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="75" y="25" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#34d399" text-anchor="middle">Collision Domain 2</text>
    <circle cx="75" cy="65" r="20" fill="#334155" stroke="#34d399" stroke-width="1.5"/>
    <text x="75" y="70" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">Host B</text>
  </g>
  <line x1="485" y1="175" x2="620" y2="210" stroke="#10b981" stroke-width="2.5"/>
  <text x="545" y="185" font-family="monospace" font-size="10" fill="#a7f3d0">Port 2</text>

  <!-- Summary Footer -->
  <g transform="translate(50, 345)">
    <rect width="750" height="55" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
    <text x="375" y="24" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#38bdf8" text-anchor="middle">
      Rule of Thumb: Hub = 1 Collision Domain, 1 Broadcast Domain | Switch = N Collision Domains (1 per port), 1 Broadcast Domain
    </text>
    <text x="375" y="44" font-family="system-ui, sans-serif" font-size="11" fill="#94a3b8" text-anchor="middle">
      Routers (Layer 3) or Virtual LANs (VLANs) are required to break up Broadcast Domains.
    </text>
  </g>
</svg>`);

// 2. Transparent Bridge Dual-Port Topology
writeSvg('transparent-bridge-dual-port-topology.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
  </defs>
  <rect width="850" height="400" rx="16" fill="url(#bg)"/>
  <text x="425" y="40" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Transparent Bridge Connecting Two LAN Segments</text>
  <text x="425" y="64" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Layer 2 Interconnection: Filtering Local Traffic and Forwarding Inter-Segment Frames</text>

  <!-- Segment 1 (Left) -->
  <g transform="translate(60, 110)">
    <rect width="280" height="200" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="140" y="28" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#38bdf8" text-anchor="middle">LAN Segment 1 (Subnet A)</text>

    <!-- Bus Line -->
    <line x1="30" y1="80" x2="250" y2="80" stroke="#38bdf8" stroke-width="3"/>

    <!-- Station A1 -->
    <rect x="50" y="115" width="55" height="45" rx="6" fill="#334155" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="77" y="142" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">STA A1</text>
    <line x1="77" y1="80" x2="77" y2="115" stroke="#38bdf8" stroke-width="2"/>

    <!-- Station A2 -->
    <rect x="175" y="115" width="55" height="45" rx="6" fill="#334155" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="202" y="142" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">STA A2</text>
    <line x1="202" y1="80" x2="202" y2="115" stroke="#38bdf8" stroke-width="2"/>

    <text x="140" y="185" font-family="system-ui, sans-serif" font-size="10" fill="#94a3b8" text-anchor="middle">A1 → A2 traffic is FILTERED</text>
  </g>

  <!-- Center: Transparent Bridge -->
  <g transform="translate(370, 130)">
    <rect width="110" height="120" rx="10" fill="#1e3a8a" stroke="#60a5fa" stroke-width="2.5"/>
    <text x="55" y="32" font-family="system-ui, sans-serif" font-size="13" font-weight="900" fill="#fff" text-anchor="middle">BRIDGE</text>
    <text x="55" y="52" font-family="system-ui, sans-serif" font-size="10" fill="#93c5fd" text-anchor="middle">Filtering Engine</text>
    <line x1="15" y1="65" x2="95" y2="65" stroke="#60a5fa" stroke-width="1"/>
    <text x="25" y="85" font-family="monospace" font-size="11" fill="#fff">Port 1</text>
    <text x="65" y="85" font-family="monospace" font-size="11" fill="#fff">Port 2</text>
  </g>

  <!-- Connecting Lines -->
  <line x1="310" y1="190" x2="370" y2="190" stroke="#60a5fa" stroke-width="3"/>
  <line x1="480" y1="190" x2="540" y2="190" stroke="#60a5fa" stroke-width="3"/>

  <!-- Segment 2 (Right) -->
  <g transform="translate(510, 110)">
    <rect width="280" height="200" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="140" y="28" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#34d399" text-anchor="middle">LAN Segment 2 (Subnet B)</text>

    <!-- Bus Line -->
    <line x1="30" y1="80" x2="250" y2="80" stroke="#10b981" stroke-width="3"/>

    <!-- Station B1 -->
    <rect x="50" y="115" width="55" height="45" rx="6" fill="#334155" stroke="#10b981" stroke-width="1.5"/>
    <text x="77" y="142" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">STA B1</text>
    <line x1="77" y1="80" x2="77" y2="115" stroke="#10b981" stroke-width="2"/>

    <!-- Station B2 -->
    <rect x="175" y="115" width="55" height="45" rx="6" fill="#334155" stroke="#10b981" stroke-width="1.5"/>
    <text x="202" y="142" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">STA B2</text>
    <line x1="202" y1="80" x2="202" y2="115" stroke="#10b981" stroke-width="2"/>

    <text x="140" y="185" font-family="system-ui, sans-serif" font-size="10" fill="#94a3b8" text-anchor="middle">A1 → B1 traffic is FORWARDED</text>
  </g>

  <!-- Bottom Banner -->
  <g transform="translate(60, 330)">
    <rect width="730" height="45" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
    <text x="365" y="28" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">
      <tspan fill="#60a5fa" font-weight="700">Transparency:</tspan> Stations A1, A2, B1, B2 have no awareness that a bridge exists; addresses used are standard physical MACs.
    </text>
  </g>
</svg>`);

// 3. Transparent Bridge Plug & Play Concept
writeSvg('transparent-bridge-plug-and-play.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 380" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
  </defs>
  <rect width="850" height="380" rx="16" fill="url(#bg)"/>
  <text x="425" y="38" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Transparent Bridge: Zero-Configuration (Plug-and-Play)</text>
  <text x="425" y="62" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Three Core Operational Pillars Defined in IEEE 802.1D</text>

  <!-- 3 Pillars -->
  <g transform="translate(50, 95)">
    <!-- 1: Learning -->
    <rect x="0" y="0" width="230" height="250" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <rect width="230" height="40" rx="10" fill="#0284c7"/>
    <text x="115" y="25" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#fff" text-anchor="middle">1. Backward Learning</text>
    
    <text x="15" y="65" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#38bdf8">• Inspects Source MAC:</text>
    <text x="15" y="85" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">Learns the arrival port of incoming frames automatically.</text>

    <text x="15" y="115" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#38bdf8">• Populates MAC Table:</text>
    <text x="15" y="135" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">Stores (MAC, Port, Timestamp) tuples in CAM memory.</text>

    <text x="15" y="165" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#38bdf8">• Dynamic Aging Timer:</text>
    <text x="15" y="185" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">Stale entries purge after ~300s to handle station movement.</text>
  </g>

  <g transform="translate(310, 95)">
    <!-- 2: Forwarding & Filtering -->
    <rect x="0" y="0" width="230" height="250" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <rect width="230" height="40" rx="10" fill="#047857"/>
    <text x="115" y="25" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#fff" text-anchor="middle">2. Filtering / Forwarding</text>

    <text x="15" y="65" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#34d399">• Inspects Dest MAC:</text>
    <text x="15" y="85" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">Looks up destination port in its learned MAC table.</text>

    <text x="15" y="115" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#34d399">• Same Port = Discard:</text>
    <text x="15" y="135" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">Filters out local traffic; keeps segments isolated.</text>

    <text x="15" y="165" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#34d399">• Different Port = Forward:</text>
    <text x="15" y="185" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">Selectively transmits frame out the designated port only.</text>
  </g>

  <g transform="translate(570, 95)">
    <!-- 3: Flooding -->
    <rect x="0" y="0" width="230" height="250" rx="10" fill="#1e293b" stroke="#eab308" stroke-width="1.5"/>
    <rect width="230" height="40" rx="10" fill="#a16207"/>
    <text x="115" y="25" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#fff" text-anchor="middle">3. Flooding Fallback</text>

    <text x="15" y="65" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fbbf24">• Unknown Unicast:</text>
    <text x="15" y="85" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">If Dest MAC is not in table, frame is forwarded to ALL other ports.</text>

    <text x="15" y="120" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fbbf24">• Broadcast Frames:</text>
    <text x="15" y="140" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">FF:FF:FF:FF:FF:FF is always flooded to every active port.</text>

    <text x="15" y="175" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fbbf24">• Loop Hazard:</text>
    <text x="15" y="195" font-family="system-ui, sans-serif" font-size="11" fill="#ef4444">STP required to stop infinite circulating broadcast storms.</text>
  </g>
</svg>`);

// 4. Learning Bridge Forwarding Table
writeSvg('learning-bridge-forwarding-table.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
  </defs>
  <rect width="850" height="400" rx="16" fill="url(#bg)"/>
  <text x="425" y="40" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Bridge Forwarding Table (MAC / CAM Table)</text>
  <text x="425" y="64" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Dynamic Binding of Physical MAC Addresses to Switch Ports with Aging Timers</text>

  <!-- Table Container -->
  <g transform="translate(100, 95)">
    <!-- Header -->
    <rect x="0" y="0" width="650" height="38" rx="6" fill="#1e3a8a" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="120" y="24" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fff" text-anchor="middle">Station MAC Address</text>
    <text x="325" y="24" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fff" text-anchor="middle">Egress Port</text>
    <text x="525" y="24" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fff" text-anchor="middle">Aging Timer (TTL)</text>

    <!-- Row 1 -->
    <rect x="0" y="45" width="650" height="35" rx="4" fill="#1e293b"/>
    <text x="120" y="67" font-family="monospace" font-size="12" fill="#38bdf8" text-anchor="middle">00:1A:2B:3C:4D:01 (STA A)</text>
    <text x="325" y="67" font-family="monospace" font-size="12" font-weight="700" fill="#34d399" text-anchor="middle">Port 1</text>
    <text x="525" y="67" font-family="monospace" font-size="11" fill="#cbd5e1" text-anchor="middle">285 s (Active)</text>

    <!-- Row 2 -->
    <rect x="0" y="85" width="650" height="35" rx="4" fill="#0f172a"/>
    <text x="120" y="107" font-family="monospace" font-size="12" fill="#38bdf8" text-anchor="middle">00:1A:2B:3C:4D:02 (STA B)</text>
    <text x="325" y="107" font-family="monospace" font-size="12" font-weight="700" fill="#34d399" text-anchor="middle">Port 1</text>
    <text x="525" y="107" font-family="monospace" font-size="11" fill="#cbd5e1" text-anchor="middle">140 s (Active)</text>

    <!-- Row 3 -->
    <rect x="0" y="125" width="650" height="35" rx="4" fill="#1e293b"/>
    <text x="120" y="147" font-family="monospace" font-size="12" fill="#38bdf8" text-anchor="middle">00:1A:2B:3C:4D:03 (STA C)</text>
    <text x="325" y="147" font-family="monospace" font-size="12" font-weight="700" fill="#34d399" text-anchor="middle">Port 2</text>
    <text x="525" y="147" font-family="monospace" font-size="11" fill="#cbd5e1" text-anchor="middle">298 s (Refreshed)</text>

    <!-- Row 4 -->
    <rect x="0" y="165" width="650" height="35" rx="4" fill="#0f172a"/>
    <text x="120" y="187" font-family="monospace" font-size="12" fill="#38bdf8" text-anchor="middle">00:1A:2B:3C:4D:04 (STA D)</text>
    <text x="325" y="187" font-family="monospace" font-size="12" font-weight="700" fill="#34d399" text-anchor="middle">Port 2</text>
    <text x="525" y="187" font-family="monospace" font-size="11" fill="#ef4444" text-anchor="middle">12 s (Expiring Soon)</text>
  </g>

  <!-- Note Footer -->
  <g transform="translate(100, 315)">
    <rect width="650" height="55" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
    <text x="325" y="24" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#38bdf8" text-anchor="middle">
      Self-Refreshing Rule: Every time a frame arrives from a known MAC, its Aging Timer resets to 300 seconds.
    </text>
    <text x="325" y="44" font-family="system-ui, sans-serif" font-size="11" fill="#94a3b8" text-anchor="middle">
      If a station moves to a new switch port, its new frame updates the port binding immediately.
    </text>
  </g>
</svg>`);

// 5. Bridge Backward Learning Process Step-by-Step
writeSvg('bridge-backward-learning-step-by-step.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 420" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
  </defs>
  <rect width="850" height="420" rx="16" fill="url(#bg)"/>
  <text x="425" y="38" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Step-by-Step Backward Learning Walkthrough</text>
  <text x="425" y="62" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">How an Empty Bridge Table Transitions to Full Knowledge</text>

  <!-- Step 1 Card -->
  <g transform="translate(50, 95)">
    <rect width="360" height="145" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="180" y="25" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#38bdf8" text-anchor="middle">Step 1: STA A transmits frame to STA C</text>
    <text x="15" y="50" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">1. Frame arrives on <strong fill="#fff">Port 1</strong> (Src: A, Dest: C).</text>
    <text x="15" y="72" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">2. Bridge checks table: Table is empty.</text>
    <text x="15" y="94" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#34d399">3. Action: Learn [A = Port 1].</text>
    <text x="15" y="116" font-family="system-ui, sans-serif" font-size="11" fill="#fbbf24">4. Dest C is unknown → FLOOD to Port 2.</text>
  </g>

  <!-- Step 2 Card -->
  <g transform="translate(440, 95)">
    <rect width="360" height="145" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="180" y="25" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#34d399" text-anchor="middle">Step 2: STA C replies to STA A</text>
    <text x="15" y="50" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">1. Reply arrives on <strong fill="#fff">Port 2</strong> (Src: C, Dest: A).</text>
    <text x="15" y="72" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#34d399">2. Action: Learn [C = Port 2].</text>
    <text x="15" y="94" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">3. Bridge looks up Dest A: [A = Port 1] (Known!).</text>
    <text x="15" y="116" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">4. Action: UNICAST FORWARD directly to Port 1!</text>
  </g>

  <!-- Step 3 Card -->
  <g transform="translate(50, 255)">
    <rect width="360" height="140" rx="10" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="180" y="25" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#fbbf24" text-anchor="middle">Step 3: STA A sends frame to STA B (Same Port)</text>
    <text x="15" y="50" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">1. Frame arrives on <strong fill="#fff">Port 1</strong> (Src: A, Dest: B).</text>
    <text x="15" y="72" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">2. If [B = Port 1] is known in table:</text>
    <text x="15" y="94" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#ef4444">3. Action: FILTER (DISCARD) frame!</text>
    <text x="15" y="116" font-family="system-ui, sans-serif" font-size="11" fill="#94a3b8">B already received frame directly on Port 1 LAN.</text>
  </g>

  <!-- Step 4 Summary Table -->
  <g transform="translate(440, 255)">
    <rect width="360" height="140" rx="10" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="180" y="25" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#60a5fa" text-anchor="middle">Resulting Learned MAC Table</text>
    <text x="50" y="55" font-family="monospace" font-size="12" fill="#fff">MAC Address</text>
    <text x="240" y="55" font-family="monospace" font-size="12" fill="#fff">Port Binding</text>
    <line x1="20" y1="65" x2="340" y2="65" stroke="#334155" stroke-width="1"/>
    <text x="50" y="85" font-family="monospace" font-size="12" fill="#38bdf8">Station A</text>
    <text x="250" y="85" font-family="monospace" font-size="12" fill="#34d399">Port 1</text>
    <text x="50" y="110" font-family="monospace" font-size="12" fill="#38bdf8">Station C</text>
    <text x="250" y="110" font-family="monospace" font-size="12" fill="#34d399">Port 2</text>
  </g>
</svg>`);

// 6. Forwarding & Filtering Flowchart
writeSvg('forwarding-filtering-flowchart.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 460" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8"/>
    </marker>
  </defs>
  <rect width="850" height="460" rx="16" fill="url(#bg)"/>
  <text x="425" y="38" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Bridge Forwarding &amp; Filtering Decision Logic</text>
  <text x="425" y="60" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Exact Step-by-Step Processing for Every Ingress Ethernet Frame</text>

  <!-- Flowchart Nodes -->
  <!-- 1. Ingress -->
  <rect x="70" y="90" width="200" height="40" rx="8" fill="#0284c7" stroke="#38bdf8" stroke-width="2"/>
  <text x="170" y="115" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fff" text-anchor="middle">Frame Arrives on Port x</text>

  <!-- 2. Learn -->
  <rect x="70" y="160" width="200" height="45" rx="6" fill="#1e293b" stroke="#34d399" stroke-width="2"/>
  <text x="170" y="180" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#34d399" text-anchor="middle">Update MAC Table:</text>
  <text x="170" y="195" font-family="monospace" font-size="10" fill="#fff" text-anchor="middle">Learn (Src MAC = Port x)</text>

  <!-- 3. Decision 1: Broadcast? -->
  <polygon points="170,235 270,270 170,305 70,270" fill="#334155" stroke="#eab308" stroke-width="2"/>
  <text x="170" y="265" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">Is Dest MAC</text>
  <text x="170" y="280" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">Broadcast?</text>

  <!-- Flood Box -->
  <rect x="70" y="375" width="200" height="45" rx="6" fill="#78350f" stroke="#f59e0b" stroke-width="2"/>
  <text x="170" y="395" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fef08a" text-anchor="middle">FLOOD Frame</text>
  <text x="170" y="410" font-family="system-ui, sans-serif" font-size="10" fill="#fde68a" text-anchor="middle">To all ports except Port x</text>

  <!-- Decision 2: In Table? -->
  <polygon points="460,235 560,270 460,305 360,270" fill="#334155" stroke="#38bdf8" stroke-width="2"/>
  <text x="460" y="265" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">Is Dest MAC</text>
  <text x="460" y="280" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">in Table?</text>

  <!-- Decision 3: Same Port? -->
  <polygon points="710,235 800,270 710,305 620,270" fill="#334155" stroke="#a855f7" stroke-width="2"/>
  <text x="710" y="265" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#fff" text-anchor="middle">Dest Port ==</text>
  <text x="710" y="280" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#fff" text-anchor="middle">Source Port x?</text>

  <!-- Filter (Discard) -->
  <rect x="620" y="375" width="180" height="45" rx="6" fill="#7f1d1d" stroke="#ef4444" stroke-width="2"/>
  <text x="710" y="395" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fff" text-anchor="middle">FILTER (Discard)</text>
  <text x="710" y="410" font-family="system-ui, sans-serif" font-size="10" fill="#fca5a5" text-anchor="middle">Do not forward frame</text>

  <!-- Forward -->
  <rect x="620" y="145" width="180" height="45" rx="6" fill="#047857" stroke="#10b981" stroke-width="2"/>
  <text x="710" y="165" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fff" text-anchor="middle">FORWARD Frame</text>
  <text x="710" y="180" font-family="system-ui, sans-serif" font-size="10" fill="#a7f3d0" text-anchor="middle">Unicast out designated port</text>

  <!-- Connectors -->
  <line x1="170" y1="130" x2="170" y2="160" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrow)"/>
  <line x1="170" y1="205" x2="170" y2="235" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrow)"/>

  <line x1="170" y1="305" x2="170" y2="375" stroke="#f59e0b" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="185" y="340" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fbbf24">Yes</text>

  <line x1="270" y1="270" x2="360" y2="270" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="310" y="260" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#38bdf8">No</text>

  <line x1="460" y1="305" x2="460" y2="397" stroke="#f59e0b" stroke-width="2"/>
  <line x1="460" y1="397" x2="270" y2="397" stroke="#f59e0b" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="475" y="340" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fbbf24">No (Unknown)</text>

  <line x1="560" y1="270" x2="620" y2="270" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="580" y="260" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#38bdf8">Yes</text>

  <line x1="710" y1="305" x2="710" y2="375" stroke="#ef4444" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="725" y="340" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#ef4444">Yes</text>

  <line x1="710" y1="235" x2="710" y2="190" stroke="#34d399" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="725" y="215" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#34d399">No</text>
</svg>`);

// 7. Bridge Flooding & Broadcast Storm
writeSvg('bridge-flooding-and-broadcast-storm.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
  </defs>
  <rect width="850" height="400" rx="16" fill="url(#bg)"/>
  <text x="425" y="40" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Bridge Loops &amp; Broadcast Storms</text>
  <text x="425" y="64" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Redundant Physical Links Cause Catastrophic Infinite Frame Replication Without STP</text>

  <!-- Cyclic Topology Diagram -->
  <g transform="translate(150, 100)">
    <!-- Bridge 1 -->
    <rect x="70" y="20" width="110" height="50" rx="8" fill="#1e3a8a" stroke="#3b82f6" stroke-width="2"/>
    <text x="125" y="50" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#fff" text-anchor="middle">Bridge 1</text>

    <!-- Bridge 2 -->
    <rect x="370" y="20" width="110" height="50" rx="8" fill="#1e3a8a" stroke="#3b82f6" stroke-width="2"/>
    <text x="425" y="50" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#fff" text-anchor="middle">Bridge 2</text>

    <!-- LAN 1 Top -->
    <line x1="0" y1="0" x2="550" y2="0" stroke="#38bdf8" stroke-width="4"/>
    <text x="275" y="-10" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#38bdf8" text-anchor="middle">LAN Segment 1</text>

    <!-- LAN 2 Bottom -->
    <line x1="0" y1="140" x2="550" y2="140" stroke="#10b981" stroke-width="4"/>
    <text x="275" y="160" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#34d399" text-anchor="middle">LAN Segment 2</text>

    <!-- Connecting drop lines -->
    <line x1="125" y1="0" x2="125" y2="20" stroke="#38bdf8" stroke-width="2"/>
    <line x1="125" y1="70" x2="125" y2="140" stroke="#10b981" stroke-width="2"/>

    <line x1="425" y1="0" x2="425" y2="20" stroke="#38bdf8" stroke-width="2"/>
    <line x1="425" y1="70" x2="425" y2="140" stroke="#10b981" stroke-width="2"/>

    <!-- Infinite Loop Arrows in Center -->
    <path d="M 185 45 Q 275 -10 365 45 Q 275 110 185 45" stroke="#ef4444" stroke-width="3" fill="none" stroke-dasharray="6 4"/>
    <text x="275" y="55" font-family="system-ui, sans-serif" font-size="13" font-weight="900" fill="#ef4444" text-anchor="middle">🔄 Infinite Loop</text>
  </g>

  <!-- Symptoms Box -->
  <g transform="translate(60, 275)">
    <rect width="730" height="105" rx="10" fill="#450a0a" stroke="#ef4444" stroke-width="1.5"/>
    <text x="20" y="26" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#fca5a5">The Three Deadly Consequences of Bridging Loops:</text>
    <text x="20" y="48" font-family="system-ui, sans-serif" font-size="11" fill="#fee2e2">1. <strong fill="#fff">Broadcast Storm:</strong> Frames replicate infinitely because Layer-2 frames have NO TTL (Time-to-Live) field.</text>
    <text x="20" y="68" font-family="system-ui, sans-serif" font-size="11" fill="#fee2e2">2. <strong fill="#fff">MAC Table Thrashing:</strong> Bridge learns Station A on Port 1, then Port 2, then Port 1, constantly flipping bindings.</text>
    <text x="20" y="88" font-family="system-ui, sans-serif" font-size="11" fill="#fee2e2">3. <strong fill="#fff">Multiple Frame Copies:</strong> Dest receives thousands of duplicate packets, crashing CPU network stacks.</text>
  </g>
</svg>`);

// 8. Spanning Tree Protocol (STP) Topology
writeSvg('spanning-tree-protocol-stp-topology.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 420" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
  </defs>
  <rect width="850" height="420" rx="16" fill="url(#bg)"/>
  <text x="425" y="38" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">IEEE 802.1D Spanning Tree Protocol (STP)</text>
  <text x="425" y="62" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Breaking Loops by Electing a Root Bridge and Blocking Redundant Forwarding Paths</text>

  <!-- Triangle Topology of 3 Switches -->
  <!-- Switch 1: Root Bridge (Top) -->
  <g transform="translate(365, 85)">
    <rect width="120" height="65" rx="8" fill="#065f46" stroke="#34d399" stroke-width="2.5"/>
    <text x="60" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#a7f3d0" text-anchor="middle">👑 ROOT BRIDGE</text>
    <text x="60" y="42" font-family="system-ui, sans-serif" font-size="13" font-weight="900" fill="#fff" text-anchor="middle">Bridge 1</text>
    <text x="60" y="56" font-family="monospace" font-size="9" fill="#d1fae5" text-anchor="middle">Priority 4096 (Lowest)</text>
  </g>

  <!-- Switch 2: (Bottom Left) -->
  <g transform="translate(130, 225)">
    <rect width="120" height="60" rx="8" fill="#1e3a8a" stroke="#3b82f6" stroke-width="2"/>
    <text x="60" y="25" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#fff" text-anchor="middle">Bridge 2</text>
    <text x="60" y="45" font-family="monospace" font-size="9" fill="#93c5fd" text-anchor="middle">Priority 32768</text>
  </g>

  <!-- Switch 3: (Bottom Right) -->
  <g transform="translate(600, 225)">
    <rect width="120" height="60" rx="8" fill="#1e3a8a" stroke="#3b82f6" stroke-width="2"/>
    <text x="60" y="25" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#fff" text-anchor="middle">Bridge 3</text>
    <text x="60" y="45" font-family="monospace" font-size="9" fill="#93c5fd" text-anchor="middle">Priority 32768</text>
  </g>

  <!-- Links & Port Roles -->
  <!-- Link SW1 to SW2 (Active Forwarding) -->
  <line x1="375" y1="150" x2="240" y2="225" stroke="#10b981" stroke-width="4"/>
  <rect x="340" y="155" width="28" height="18" rx="3" fill="#047857"/>
  <text x="354" y="168" font-family="monospace" font-size="9" font-weight="700" fill="#fff" text-anchor="middle">DP</text>
  <rect x="245" y="200" width="28" height="18" rx="3" fill="#0284c7"/>
  <text x="259" y="213" font-family="monospace" font-size="9" font-weight="700" fill="#fff" text-anchor="middle">RP</text>

  <!-- Link SW1 to SW3 (Active Forwarding) -->
  <line x1="475" y1="150" x2="610" y2="225" stroke="#10b981" stroke-width="4"/>
  <rect x="480" y="155" width="28" height="18" rx="3" fill="#047857"/>
  <text x="494" y="168" font-family="monospace" font-size="9" font-weight="700" fill="#fff" text-anchor="middle">DP</text>
  <rect x="580" y="200" width="28" height="18" rx="3" fill="#0284c7"/>
  <text x="594" y="213" font-family="monospace" font-size="9" font-weight="700" fill="#fff" text-anchor="middle">RP</text>

  <!-- Bottom Link SW2 to SW3 (Blocked Redundant Link) -->
  <line x1="250" y1="255" x2="600" y2="255" stroke="#ef4444" stroke-width="3" stroke-dasharray="6 4"/>
  <rect x="260" y="246" width="28" height="18" rx="3" fill="#047857"/>
  <text x="274" y="259" font-family="monospace" font-size="9" font-weight="700" fill="#fff" text-anchor="middle">DP</text>
  
  <!-- Blocked Port marker -->
  <circle cx="585" cy="255" r="12" fill="#7f1d1d" stroke="#ef4444" stroke-width="2"/>
  <text x="585" y="259" font-family="system-ui, sans-serif" font-size="11" font-weight="900" fill="#fff" text-anchor="middle">X</text>
  <text x="585" y="285" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#f87171" text-anchor="middle">BLOCKED PORT</text>

  <!-- STP Port Roles Legend -->
  <g transform="translate(60, 320)">
    <rect width="730" height="85" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
    <text x="20" y="25" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• <strong fill="#34d399">DP (Designated Port):</strong> Forwards traffic away from Root Bridge onto the LAN segment.</text>
    <text x="20" y="50" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• <strong fill="#38bdf8">RP (Root Port):</strong> The lowest-cost path on a non-root switch heading towards the Root Bridge.</text>
    <text x="20" y="75" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">• <strong fill="#ef4444">Blocked Port (Alternate):</strong> Discards user data frames while continuously listening to BPDUs for failover.</text>
  </g>
</svg>`);

// 9. Bridges vs Switches Comparison
writeSvg('bridges-vs-switches-comparison.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
  </defs>
  <rect width="850" height="400" rx="16" fill="url(#bg)"/>
  <text x="425" y="40" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Architectural Comparison: Bridges vs. Layer 2 Switches</text>
  <text x="425" y="64" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Software-Driven 2-Port Forwarding vs. High-Density Hardware ASIC Switching</text>

  <g transform="translate(50, 95)">
    <!-- Bridge Card -->
    <rect width="360" height="275" rx="12" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="180" y="32" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#38bdf8" text-anchor="middle">Traditional Bridge</text>

    <text x="20" y="65" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Implementation: <tspan fill="#38bdf8">Software-Based (General CPU)</tspan></text>
    <text x="20" y="90" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Port Density: <tspan fill="#cbd5e1">2 to 4 Ports (Low Density)</tspan></text>
    <text x="20" y="115" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Forwarding Mode: <tspan fill="#cbd5e1">Store-and-Forward Only</tspan></text>
    <text x="20" y="140" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Switching Throughput: <tspan fill="#fbbf24">Packets/sec limited by CPU bus</tspan></text>
    <text x="20" y="165" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Collision Domains: <tspan fill="#cbd5e1">2 to 4 Segments</tspan></text>
    <text x="20" y="190" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Media Interconnection: <tspan fill="#38bdf8">Can bridge diverse media (Token Ring &amp; Ethernet)</tspan></text>
    <text x="20" y="215" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Modern Role: <tspan fill="#ef4444">Legacy / Software Emulation (Linux br0)</tspan></text>
    <text x="20" y="245" font-family="system-ui, sans-serif" font-size="11" fill="#94a3b8">Processes frames in central OS kernel memory.</text>
  </g>

  <g transform="translate(440, 95)">
    <!-- Switch Card -->
    <rect width="360" height="275" rx="12" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="180" y="32" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#34d399" text-anchor="middle">Multiport L2 Switch</text>

    <text x="20" y="65" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Implementation: <tspan fill="#34d399">Hardware ASIC / TCAM Silicon</tspan></text>
    <text x="20" y="90" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Port Density: <tspan fill="#34d399">24, 48, 96+ Ports (High Density)</tspan></text>
    <text x="20" y="115" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Forwarding Mode: <tspan fill="#34d399">Cut-Through, Fragment-Free &amp; Store-Forward</tspan></text>
    <text x="20" y="140" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Switching Throughput: <tspan fill="#34d399">Wire-Speed (Terabits/sec crossbar)</tspan></text>
    <text x="20" y="165" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Collision Domains: <tspan fill="#34d399">Isolated per port (Microsegmentation)</tspan></text>
    <text x="20" y="190" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Media Interconnection: <tspan fill="#cbd5e1">Homogeneous Ethernet (Copper / Fiber)</tspan></text>
    <text x="20" y="215" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">• Modern Role: <tspan fill="#34d399">Universal Enterprise &amp; Datacenter Core</tspan></text>
    <text x="20" y="245" font-family="system-ui, sans-serif" font-size="11" fill="#94a3b8">Dedicated hardware switching matrix per line card.</text>
  </g>
</svg>`);

// 10. VLAN 802.1Q Tagging & Trunking
writeSvg('vlan-802-1q-tagging-trunking.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 420" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
  </defs>
  <rect width="850" height="420" rx="16" fill="url(#bg)"/>
  <text x="425" y="38" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">Virtual LANs (VLANs) &amp; IEEE 802.1Q Trunking</text>
  <text x="425" y="62" font-family="system-ui, sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Logical Broadcast Domain Segmentation and 4-Byte 802.1Q VLAN Tagging</text>

  <!-- 802.1Q Tag Format Breakdown -->
  <g transform="translate(60, 90)">
    <rect width="730" height="75" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="365" y="22" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#38bdf8" text-anchor="middle">
      IEEE 802.1Q 4-Byte Tag Inserted Between Source MAC and EtherType
    </text>

    <!-- TPID -->
    <rect x="50" y="32" width="200" height="32" rx="4" fill="#0284c7"/>
    <text x="150" y="52" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">TPID = 0x8100 (2 Bytes)</text>

    <!-- PCP -->
    <rect x="260" y="32" width="90" height="32" rx="4" fill="#854d0e"/>
    <text x="305" y="52" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fde68a" text-anchor="middle">PCP (3b QoS)</text>

    <!-- DEI -->
    <rect x="360" y="32" width="60" height="32" rx="4" fill="#64748b"/>
    <text x="390" y="52" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fff" text-anchor="middle">DEI (1b)</text>

    <!-- VID -->
    <rect x="430" y="32" width="250" height="32" rx="4" fill="#047857"/>
    <text x="555" y="52" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">VID = 12 Bits (1 to 4094 VLAN IDs)</text>
  </g>

  <!-- Trunking Topology -->
  <g transform="translate(60, 185)">
    <!-- Switch 1 -->
    <rect x="50" y="40" width="130" height="80" rx="8" fill="#1e3a8a" stroke="#3b82f6" stroke-width="2"/>
    <text x="115" y="70" font-family="system-ui, sans-serif" font-size="13" font-weight="900" fill="#fff" text-anchor="middle">SWITCH A</text>
    <text x="115" y="90" font-family="system-ui, sans-serif" font-size="10" fill="#bfdbfe" text-anchor="middle">Access Ports</text>

    <!-- Switch 2 -->
    <rect x="550" y="40" width="130" height="80" rx="8" fill="#1e3a8a" stroke="#3b82f6" stroke-width="2"/>
    <text x="615" y="70" font-family="system-ui, sans-serif" font-size="13" font-weight="900" fill="#fff" text-anchor="middle">SWITCH B</text>
    <text x="615" y="90" font-family="system-ui, sans-serif" font-size="10" fill="#bfdbfe" text-anchor="middle">Access Ports</text>

    <!-- Trunk Cable -->
    <line x1="180" y1="80" x2="550" y2="80" stroke="#f59e0b" stroke-width="4"/>
    <rect x="280" y="65" width="170" height="30" rx="6" fill="#78350f" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="365" y="85" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fef08a" text-anchor="middle">802.1Q TRUNK LINK</text>

    <!-- VLAN 10 (Sales) Nodes -->
    <circle cx="20" cy="50" r="16" fill="#0284c7"/>
    <text x="20" y="54" font-family="system-ui, sans-serif" font-size="9" font-weight="800" fill="#fff" text-anchor="middle">V10</text>
    <line x1="36" y1="50" x2="50" y2="55" stroke="#0284c7" stroke-width="2"/>

    <circle cx="710" cy="50" r="16" fill="#0284c7"/>
    <text x="710" y="54" font-family="system-ui, sans-serif" font-size="9" font-weight="800" fill="#fff" text-anchor="middle">V10</text>
    <line x1="680" y1="55" x2="694" y2="50" stroke="#0284c7" stroke-width="2"/>

    <!-- VLAN 20 (Engineering) Nodes -->
    <circle cx="20" cy="110" r="16" fill="#059669"/>
    <text x="20" y="114" font-family="system-ui, sans-serif" font-size="9" font-weight="800" fill="#fff" text-anchor="middle">V20</text>
    <line x1="36" y1="110" x2="50" y2="105" stroke="#059669" stroke-width="2"/>

    <circle cx="710" cy="110" r="16" fill="#059669"/>
    <text x="710" y="114" font-family="system-ui, sans-serif" font-size="9" font-weight="800" fill="#fff" text-anchor="middle">V20</text>
    <line x1="680" y1="105" x2="694" y2="110" stroke="#059669" stroke-width="2"/>
  </g>

  <!-- Explanatory Footer -->
  <g transform="translate(60, 345)">
    <rect width="730" height="55" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
    <text x="365" y="24" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" text-anchor="middle">
      <strong fill="#38bdf8">Access Ports:</strong> Carry untagged frames for end devices | <strong fill="#fbbf24">Trunk Ports:</strong> Carry multiplexed tagged frames across switches.
    </text>
    <text x="365" y="44" font-family="system-ui, sans-serif" font-size="11" fill="#94a3b8" text-anchor="middle">
      Broadcasts in VLAN 10 never reach VLAN 20, providing complete security and performance isolation.
    </text>
  </g>
</svg>`);

console.log('All 10 Topic 9 SVGs generated successfully!');

