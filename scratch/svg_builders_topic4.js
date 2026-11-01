// scratch/svg_builders_topic4.js
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../assets/images/topic4');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function writeSvg(filename, svgContent) {
  fs.writeFileSync(path.join(outDir, filename), svgContent.trim(), 'utf8');
  console.log(`Created topic4/${filename}`);
}

// 1. Multiple Access Categories Taxonomy
writeSvg('multiple-access-categories.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 500" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <rect x="30" y="20" width="840" height="54" rx="10" fill="#0F172A" />
  <text x="50" y="53" fill="#F8FAFC" font-size="18" font-weight="700">Taxonomy of Multiple Access Protocols (Forouzan Ch. 12)</text>

  <!-- Root -->
  <g transform="translate(320, 95)">
    <rect width="260" height="42" rx="8" fill="#1E293B" stroke="#475569" stroke-width="2" />
    <text x="130" y="26" fill="#FFF" font-size="13" font-weight="bold" text-anchor="middle">Multiple Access Protocols</text>
  </g>

  <!-- Three-way tree lines -->
  <path d="M 450 137 L 450 160 L 160 160 L 160 185" fill="none" stroke="#64748B" stroke-width="2" />
  <path d="M 450 160 L 450 185" fill="none" stroke="#64748B" stroke-width="2" />
  <path d="M 450 160 L 740 160 L 740 185" fill="none" stroke="#64748B" stroke-width="2" />

  <!-- 1. Random Access Protocols -->
  <g transform="translate(45, 185)">
    <rect width="230" height="40" rx="8" fill="#EFF6FF" stroke="#3B82F6" stroke-width="2" />
    <text x="115" y="25" fill="#1E40AF" font-size="12" font-weight="bold" text-anchor="middle">1. Random Access (Contention)</text>
    <rect x="0" y="48" width="230" height="235" rx="8" fill="#F8FAFC" stroke="#CBD5E1" />
    <text x="15" y="75" fill="#0F172A" font-size="11" font-weight="bold">&bull; ALOHA Systems:</text>
    <text x="25" y="93" fill="#64748B" font-size="10.5">- Pure ALOHA (Max 18.4%)</text>
    <text x="25" y="111" fill="#64748B" font-size="10.5">- Slotted ALOHA (Max 36.8%)</text>
    <text x="15" y="138" fill="#0F172A" font-size="11" font-weight="bold">&bull; CSMA (Carrier Sense):</text>
    <text x="25" y="156" fill="#64748B" font-size="10.5">- 1-Persistent CSMA</text>
    <text x="25" y="174" fill="#64748B" font-size="10.5">- Non-Persistent CSMA</text>
    <text x="25" y="192" fill="#64748B" font-size="10.5">- p-Persistent CSMA</text>
    <text x="15" y="219" fill="#059669" font-size="11" font-weight="bold">&bull; CSMA/CD (Wired Ethernet)</text>
    <text x="15" y="242" fill="#7C3AED" font-size="11" font-weight="bold">&bull; CSMA/CA (Wireless Wi-Fi)</text>
  </g>

  <!-- 2. Controlled Access Protocols -->
  <g transform="translate(335, 185)">
    <rect width="230" height="40" rx="8" fill="#ECFDF5" stroke="#10B981" stroke-width="2" />
    <text x="115" y="25" fill="#065F46" font-size="12" font-weight="bold" text-anchor="middle">2. Controlled Access</text>
    <rect x="0" y="48" width="230" height="235" rx="8" fill="#F8FAFC" stroke="#CBD5E1" />
    <text x="15" y="80" fill="#0F172A" font-size="11" font-weight="bold">&bull; Reservation Systems:</text>
    <text x="25" y="100" fill="#64748B" font-size="10.5">- Bit-Map Protocol</text>
    <text x="25" y="118" fill="#64748B" font-size="10.5">- Demand Assignment</text>
    <text x="15" y="148" fill="#0F172A" font-size="11" font-weight="bold">&bull; Polling Methods:</text>
    <text x="25" y="168" fill="#64748B" font-size="10.5">- Primary / Secondary nodes</text>
    <text x="25" y="186" fill="#64748B" font-size="10.5">- Poll / Select frames</text>
    <text x="15" y="216" fill="#0F172A" font-size="11" font-weight="bold">&bull; Token Passing:</text>
    <text x="25" y="236" fill="#64748B" font-size="10.5">- Token Ring (802.5)</text>
    <text x="25" y="254" fill="#64748B" font-size="10.5">- Token Bus (802.4)</text>
  </g>

  <!-- 3. Channelization Protocols -->
  <g transform="translate(625, 185)">
    <rect width="230" height="40" rx="8" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2" />
    <text x="115" y="25" fill="#92400E" font-size="12" font-weight="bold" text-anchor="middle">3. Channelization</text>
    <rect x="0" y="48" width="230" height="235" rx="8" fill="#F8FAFC" stroke="#CBD5E1" />
    <text x="15" y="80" fill="#0F172A" font-size="11" font-weight="bold">&bull; FDMA:</text>
    <text x="25" y="100" fill="#64748B" font-size="10.5">Frequency Division Multiplexing</text>
    <text x="15" y="130" fill="#0F172A" font-size="11" font-weight="bold">&bull; TDMA:</text>
    <text x="25" y="150" fill="#64748B" font-size="10.5">Time Division Multiplexing</text>
    <text x="15" y="180" fill="#0F172A" font-size="11" font-weight="bold">&bull; CDMA:</text>
    <text x="25" y="200" fill="#64748B" font-size="10.5">Code Division (Orthogonal Walsh Codes)</text>
    <text x="15" y="230" fill="#0F172A" font-size="11" font-weight="bold">&bull; OFDMA:</text>
    <text x="25" y="250" fill="#64748B" font-size="10.5">Orthogonal subcarrier allocation</text>
  </g>
</svg>
`);

// 2. Pure ALOHA Timeline & Vulnerable Time
writeSvg('pure-aloha-timeline-vulnerable-time.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 500" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <rect x="30" y="20" width="840" height="54" rx="10" fill="#0F172A" />
  <text x="50" y="53" fill="#F8FAFC" font-size="18" font-weight="700">Pure ALOHA: Vulnerable Period (2 &times; T_fr) &amp; Collision Window</text>

  <g transform="translate(60, 95)">
    <!-- Time axis -->
    <line x1="30" y1="280" x2="750" y2="280" stroke="#0F172A" stroke-width="2" />
    <polygon points="755,280 745,275 745,285" fill="#0F172A" />
    <text x="730" y="305" fill="#0F172A" font-size="12" font-weight="bold">Time (t) &rarr;</text>

    <!-- Vulnerable Band Shaded Area -->
    <rect x="230" y="30" width="300" height="240" fill="#FEE2E2" fill-opacity="0.6" stroke="#EF4444" stroke-dasharray="4 2" />
    <text x="380" y="22" fill="#DC2626" font-size="12" font-weight="bold" text-anchor="middle">Vulnerable Period = 2 &times; T_fr (300 ms)</text>

    <!-- Reference Frame (Target) -->
    <g transform="translate(380, 110)">
      <rect x="0" y="0" width="150" height="42" rx="6" fill="#3B82F6" stroke="#1D4ED8" stroke-width="2" />
      <text x="75" y="26" fill="#FFF" font-size="12" font-weight="bold" text-anchor="middle">Frame A (Target)</text>
      <line x1="0" y1="42" x2="0" y2="170" stroke="#3B82F6" stroke-dasharray="3 3" />
      <line x1="150" y1="42" x2="150" y2="170" stroke="#3B82F6" stroke-dasharray="3 3" />
      <text x="0" y="295" fill="#1D4ED8" font-size="11" font-weight="bold" text-anchor="middle">t_0</text>
      <text x="150" y="295" fill="#1D4ED8" font-size="11" font-weight="bold" text-anchor="middle">t_0 + T_fr</text>
    </g>

    <!-- Preceding colliding frame -->
    <g transform="translate(180, 50)">
      <rect x="0" y="0" width="150" height="38" rx="6" fill="#F59E0B" stroke="#D97706" />
      <text x="75" y="24" fill="#FFF" font-size="11" font-weight="bold" text-anchor="middle">Frame B (Late overlap)</text>
      <line x1="100" y1="38" x2="100" y2="80" stroke="#DC2626" stroke-width="2" />
      <text x="140" y="70" fill="#DC2626" font-size="10" font-weight="bold">Collision at head!</text>
    </g>
    <text x="230" y="295" fill="#DC2626" font-size="11" font-weight="bold" text-anchor="middle">t_0 - T_fr</text>

    <!-- Succeeding colliding frame -->
    <g transform="translate(460, 175)">
      <rect x="0" y="0" width="150" height="38" rx="6" fill="#F59E0B" stroke="#D97706" />
      <text x="75" y="24" fill="#FFF" font-size="11" font-weight="bold" text-anchor="middle">Frame C (Early overlap)</text>
      <line x1="70" y1="0" x2="70" y2="-25" stroke="#DC2626" stroke-width="2" />
      <text x="110" y="-10" fill="#DC2626" font-size="10" font-weight="bold">Collision at tail!</text>
    </g>

    <!-- Safe Frame far away -->
    <g transform="translate(600, 70)">
      <rect x="0" y="0" width="130" height="38" rx="6" fill="#10B981" />
      <text x="65" y="24" fill="#FFF" font-size="11" font-weight="bold" text-anchor="middle">Frame D (Safe)</text>
      <text x="65" y="52" fill="#059669" font-size="9.5" text-anchor="middle">&check; No overlap</text>
    </g>

    <!-- Mathematical Formula Card -->
    <g transform="translate(40, 320)">
      <rect width="700" height="70" rx="8" fill="#F8FAFC" stroke="#CBD5E1" />
      <text x="20" y="25" fill="#0F172A" font-size="12" font-weight="bold">Mathematical Derivation (Abramson, 1970):</text>
      <text x="20" y="48" fill="#475569" font-size="11">Probability of 0 frames generated in vulnerable period 2T_fr: <tspan font-family="monospace" font-weight="bold" fill="#1E40AF">P(0) = e^(-2G)</tspan>. Throughput: <tspan font-family="monospace" font-weight="bold" fill="#059669">S = G &bull; e^(-2G)</tspan>.</text>
      <text x="560" y="48" fill="#DC2626" font-size="12" font-weight="bold">S_max = 1/(2e) &approx; 18.4% at G = 0.5</text>
    </g>
  </g>
</svg>
`);

// 3. Pure ALOHA vs Slotted ALOHA Throughput Curves
writeSvg('pure-aloha-throughput-curve.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 500" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <rect x="30" y="20" width="840" height="54" rx="10" fill="#0F172A" />
  <text x="50" y="53" fill="#F8FAFC" font-size="18" font-weight="700">Throughput vs Offered Load (G): Pure ALOHA (18.4%) vs Slotted ALOHA (36.8%)</text>

  <g transform="translate(80, 95)">
    <!-- Axes -->
    <line x1="60" y1="20" x2="60" y2="300" stroke="#0F172A" stroke-width="2" />
    <line x1="60" y1="300" x2="700" y2="300" stroke="#0F172A" stroke-width="2" />
    <polygon points="60,15 55,25 65,25" fill="#0F172A" />
    <polygon points="705,300 695,295 695,305" fill="#0F172A" />

    <text x="25" y="150" fill="#0F172A" font-size="12" font-weight="bold" transform="rotate(-90 25 150)" text-anchor="middle">Throughput S (frames / frame time)</text>
    <text x="380" y="340" fill="#0F172A" font-size="12" font-weight="bold" text-anchor="middle">Offered Traffic Load G (frames attempted / frame time)</text>

    <!-- Grid Ticks Y -->
    <line x1="55" y1="300" x2="65" y2="300" stroke="#64748B" />
    <text x="45" y="304" fill="#64748B" font-size="10" text-anchor="end">0.00</text>

    <line x1="55" y1="226" x2="65" y2="226" stroke="#64748B" />
    <text x="45" y="230" fill="#64748B" font-size="10" text-anchor="end">0.10</text>

    <line x1="55" y1="164" x2="700" y2="164" stroke="#E2E8F0" stroke-dasharray="4 2" />
    <text x="45" y="168" fill="#DC2626" font-size="10" font-weight="bold" text-anchor="end">0.184</text>

    <line x1="55" y1="80" x2="700" y2="80" stroke="#E2E8F0" stroke-dasharray="4 2" />
    <text x="45" y="84" fill="#059669" font-size="10" font-weight="bold" text-anchor="end">0.368</text>

    <!-- Grid Ticks X -->
    <text x="60" y="318" fill="#64748B" font-size="10" text-anchor="middle">0</text>
    <line x1="190" y1="295" x2="190" y2="305" stroke="#64748B" />
    <text x="190" y="318" fill="#DC2626" font-size="10" font-weight="bold" text-anchor="middle">0.5</text>
    <line x1="320" y1="295" x2="320" y2="305" stroke="#64748B" />
    <text x="320" y="318" fill="#059669" font-size="10" font-weight="bold" text-anchor="middle">1.0</text>
    <line x1="450" y1="295" x2="450" y2="305" stroke="#64748B" />
    <text x="450" y="318" fill="#64748B" font-size="10" text-anchor="middle">1.5</text>
    <line x1="580" y1="295" x2="580" y2="305" stroke="#64748B" />
    <text x="580" y="318" fill="#64748B" font-size="10" text-anchor="middle">2.0</text>

    <!-- Curve 1: Slotted ALOHA S = G * e^(-G) (Green) -->
    <path d="M 60 300 Q 180 140, 320 80 Q 450 140, 580 230 Q 640 270, 700 290" fill="none" stroke="#10B981" stroke-width="3.5" />
    <circle cx="320" cy="80" r="5" fill="#10B981" />
    <text x="330" y="70" fill="#065F46" font-size="12" font-weight="bold">Slotted ALOHA Peak: 36.8% at G = 1.0</text>

    <!-- Curve 2: Pure ALOHA S = G * e^(-2G) (Blue/Red) -->
    <path d="M 60 300 Q 120 200, 190 164 Q 280 220, 380 270 Q 500 295, 700 299" fill="none" stroke="#3B82F6" stroke-width="3" />
    <circle cx="190" cy="164" r="5" fill="#EF4444" />
    <text x="200" y="155" fill="#DC2626" font-size="12" font-weight="bold">Pure ALOHA Peak: 18.4% at G = 0.5</text>

    <!-- Annotations Card -->
    <g transform="translate(430, 100)">
      <rect width="250" height="135" rx="8" fill="#F8FAFC" stroke="#CBD5E1" />
      <text x="15" y="24" fill="#0F172A" font-size="11" font-weight="bold">Why Slotted is 2&times; Faster:</text>
      <text x="15" y="46" fill="#475569" font-size="10">&bull; Pure ALOHA Vulnerable = 2 T_fr</text>
      <text x="15" y="66" fill="#475569" font-size="10">&bull; Slotted ALOHA Vulnerable = 1 T_fr</text>
      <text x="15" y="90" fill="#059669" font-size="10.5" font-weight="bold">Halving the collision window</text>
      <text x="15" y="106" fill="#059669" font-size="10.5" font-weight="bold">exactly DOUBLES maximum capacity!</text>
      <text x="15" y="124" fill="#DC2626" font-size="9.5">&bull; Beyond peak: Collisions dominate!</text>
    </g>
  </g>
</svg>
`);

// 4. CSMA Persistence Modes Comparison
writeSvg('csma-persistence-comparison.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 520" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <rect x="30" y="20" width="840" height="54" rx="10" fill="#0F172A" />
  <text x="50" y="53" fill="#F8FAFC" font-size="18" font-weight="700">Carrier Sense Multiple Access (CSMA): 1-Persistent vs Non-Persistent vs p-Persistent</text>

  <g transform="translate(45, 95)">
    <!-- Column 1: 1-Persistent -->
    <rect x="0" y="0" width="260" height="395" rx="10" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5" />
    <rect x="0" y="0" width="260" height="38" rx="10" fill="#EFF6FF" />
    <text x="130" y="24" fill="#1E40AF" font-size="13" font-weight="bold" text-anchor="middle">1-Persistent CSMA</text>

    <g transform="translate(15, 55)">
      <rect x="0" y="0" width="230" height="42" rx="6" fill="#FFFFFF" stroke="#3B82F6" />
      <text x="115" y="25" fill="#1E40AF" font-size="10" font-weight="bold" text-anchor="middle">Sense Medium</text>

      <line x1="115" y1="42" x2="115" y2="60" stroke="#64748B" stroke-width="1.5" />
      <polygon points="115,62 111,54 119,54" fill="#64748B" />

      <!-- Branch -->
      <rect x="0" y="65" width="230" height="55" rx="6" fill="#ECFDF5" stroke="#10B981" />
      <text x="115" y="85" fill="#065F46" font-size="10.5" font-weight="bold" text-anchor="middle">If IDLE: Transmit with Prob = 1</text>
      <text x="115" y="103" fill="#059669" font-size="9" text-anchor="middle">Transmits immediately with 0 delay</text>

      <!-- Busy Loop -->
      <rect x="0" y="130" width="230" height="55" rx="6" fill="#FEF2F2" stroke="#EF4444" />
      <text x="115" y="150" fill="#991B1B" font-size="10.5" font-weight="bold" text-anchor="middle">If BUSY: Keep Sensing Continuously</text>
      <text x="115" y="168" fill="#DC2626" font-size="9" text-anchor="middle">Greedy waiting &bull; Transmit on idle</text>

      <rect x="0" y="200" width="230" height="125" rx="6" fill="#FFFFFF" stroke="#CBD5E1" />
      <text x="10" y="222" fill="#0F172A" font-size="11" font-weight="bold">Behavior &amp; Trade-off:</text>
      <text x="10" y="242" fill="#475569" font-size="10">&bull; Minimum delay under light load.</text>
      <text x="10" y="260" fill="#DC2626" font-size="10" font-weight="bold">&bull; High collision rate under heavy load!</text>
      <text x="10" y="278" fill="#64748B" font-size="9.5">If 2 stations wait together, both transmit at exact same instant medium frees.</text>
      <text x="10" y="306" fill="#1E40AF" font-size="9.5" font-weight="bold">Used in: Classic Ethernet (with CD)</text>
    </g>

    <!-- Column 2: Non-Persistent -->
    <rect x="275" y="0" width="260" height="395" rx="10" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5" />
    <rect x="275" y="0" width="260" height="38" rx="10" fill="#ECFDF5" />
    <text x="405" y="24" fill="#065F46" font-size="13" font-weight="bold" text-anchor="middle">Non-Persistent CSMA</text>

    <g transform="translate(290, 55)">
      <rect x="0" y="0" width="230" height="42" rx="6" fill="#FFFFFF" stroke="#10B981" />
      <text x="115" y="25" fill="#065F46" font-size="10" font-weight="bold" text-anchor="middle">Sense Medium</text>

      <line x1="115" y1="42" x2="115" y2="60" stroke="#64748B" stroke-width="1.5" />
      <polygon points="115,62 111,54 119,54" fill="#64748B" />

      <rect x="0" y="65" width="230" height="55" rx="6" fill="#ECFDF5" stroke="#10B981" />
      <text x="115" y="85" fill="#065F46" font-size="10.5" font-weight="bold" text-anchor="middle">If IDLE: Transmit Immediately</text>
      <text x="115" y="103" fill="#059669" font-size="9" text-anchor="middle">Normal immediate transmission</text>

      <rect x="0" y="130" width="230" height="55" rx="6" fill="#FEF3C7" stroke="#F59E0B" />
      <text x="115" y="150" fill="#92400E" font-size="10.5" font-weight="bold" text-anchor="middle">If BUSY: Wait Random Backoff</text>
      <text x="115" y="168" fill="#D97706" font-size="9" text-anchor="middle">Polite deferral &bull; Sense again later</text>

      <rect x="0" y="200" width="230" height="125" rx="6" fill="#FFFFFF" stroke="#CBD5E1" />
      <text x="10" y="222" fill="#0F172A" font-size="11" font-weight="bold">Behavior &amp; Trade-off:</text>
      <text x="10" y="242" fill="#059669" font-size="10" font-weight="bold">&bull; Drastically lowers collisions!</text>
      <text x="10" y="260" fill="#475569" font-size="10">Waiting stations randomize wakeups.</text>
      <text x="10" y="278" fill="#DC2626" font-size="10">&bull; Channel may sit idle even when</text>
      <text x="10" y="292" fill="#DC2626" font-size="9.5">stations have frames (wasted time).</text>
      <text x="10" y="312" fill="#065F46" font-size="9.5" font-weight="bold">Higher overall capacity than 1-persistent</text>
    </g>

    <!-- Column 3: p-Persistent -->
    <rect x="550" y="0" width="260" height="395" rx="10" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5" />
    <rect x="550" y="0" width="260" height="38" rx="10" fill="#F5F3FF" />
    <text x="680" y="24" fill="#7C3AED" font-size="13" font-weight="bold" text-anchor="middle">p-Persistent CSMA</text>

    <g transform="translate(565, 55)">
      <rect x="0" y="0" width="230" height="42" rx="6" fill="#FFFFFF" stroke="#8B5CF6" />
      <text x="115" y="25" fill="#6D28D9" font-size="10" font-weight="bold" text-anchor="middle">Sense Medium (Slotted Channel)</text>

      <line x1="115" y1="42" x2="115" y2="60" stroke="#64748B" stroke-width="1.5" />
      <polygon points="115,62 111,54 119,54" fill="#64748B" />

      <rect x="0" y="65" width="230" height="55" rx="6" fill="#EDE9FE" stroke="#8B5CF6" />
      <text x="115" y="85" fill="#6D28D9" font-size="10.5" font-weight="bold" text-anchor="middle">If IDLE: Transmit with Prob p</text>
      <text x="115" y="103" fill="#7C3AED" font-size="9" text-anchor="middle">With Prob (1 - p): Wait for next slot</text>

      <rect x="0" y="130" width="230" height="55" rx="6" fill="#FEF2F2" stroke="#EF4444" />
      <text x="115" y="150" fill="#991B1B" font-size="10.5" font-weight="bold" text-anchor="middle">If BUSY: Wait Next Slot &amp; Repeat</text>
      <text x="115" y="168" fill="#DC2626" font-size="9" text-anchor="middle">Acts like non-persistent collision control</text>

      <rect x="0" y="200" width="230" height="125" rx="6" fill="#FFFFFF" stroke="#CBD5E1" />
      <text x="10" y="222" fill="#0F172A" font-size="11" font-weight="bold">Optimal Tuning:</text>
      <text x="10" y="242" fill="#475569" font-size="10">&bull; If N stations contending, set:</text>
      <text x="10" y="260" fill="#7C3AED" font-size="11" font-family="monospace" font-weight="bold">p = 1 / N (Optimal throughput)</text>
      <text x="10" y="280" fill="#475569" font-size="10">&bull; Fine balance between idle delay and collision avoidance.</text>
      <text x="10" y="306" fill="#6D28D9" font-size="9.5" font-weight="bold">Used in: IEEE 802.11 Wi-Fi, 802.15.4</text>
    </g>
  </g>
</svg>
`);

// 5. CSMA/CD Operation & Collision Detection
writeSvg('csma-cd-transceiver-collision.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 500" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <rect x="30" y="20" width="840" height="54" rx="10" fill="#0F172A" />
  <text x="50" y="53" fill="#F8FAFC" font-size="18" font-weight="700">CSMA/CD: Collision Window (2 &times; &tau;) &amp; 32-Bit Jamming Signal</text>

  <g transform="translate(60, 95)">
    <!-- Shared Bus Cable -->
    <line x1="40" y1="120" x2="740" y2="120" stroke="#334155" stroke-width="8" stroke-linecap="round" />
    <text x="390" y="105" fill="#64748B" font-size="11" font-weight="bold" text-anchor="middle">Shared Coaxial / Twisted-Pair Bus (End-to-End Propagation Delay = &tau;)</text>

    <!-- Station A on Left -->
    <g transform="translate(40, 150)">
      <rect width="110" height="90" rx="8" fill="#FFFFFF" stroke="#3B82F6" stroke-width="2" />
      <text x="55" y="25" fill="#1E40AF" font-size="12" font-weight="bold" text-anchor="middle">Station A</text>
      <line x1="55" y1="0" x2="55" y2="-30" stroke="#3B82F6" stroke-width="3" />
      <text x="55" y="50" fill="#64748B" font-size="9.5" text-anchor="middle">Tx at t = 0</text>
      <rect x="10" y="60" width="90" height="20" rx="4" fill="#DBEAFE" />
      <text x="55" y="74" fill="#1E40AF" font-size="8.5" font-weight="bold" text-anchor="middle">Transmitting...</text>
    </g>

    <!-- Signal from A propagating Right -->
    <path d="M 120 120 L 370 120" stroke="#3B82F6" stroke-width="4" />
    <polygon points="370,120 360,115 360,125" fill="#3B82F6" />

    <!-- Station B on Right -->
    <g transform="translate(630, 150)">
      <rect width="110" height="90" rx="8" fill="#FFFFFF" stroke="#EF4444" stroke-width="2" />
      <text x="55" y="25" fill="#DC2626" font-size="12" font-weight="bold" text-anchor="middle">Station B</text>
      <line x1="55" y1="0" x2="55" y2="-30" stroke="#EF4444" stroke-width="3" />
      <text x="55" y="50" fill="#64748B" font-size="9.5" text-anchor="middle">Senses idle at &tau; - &epsilon;</text>
      <rect x="10" y="60" width="90" height="20" rx="4" fill="#FEE2E2" />
      <text x="55" y="74" fill="#DC2626" font-size="8.5" font-weight="bold" text-anchor="middle">Tx at t = &tau; - &epsilon;</text>
    </g>

    <!-- Signal from B propagating Left -->
    <path d="M 660 120 L 410 120" stroke="#EF4444" stroke-width="4" />
    <polygon points="410,120 420,115 420,125" fill="#EF4444" />

    <!-- Collision Point in Middle -->
    <g transform="translate(390, 120)">
      <circle cx="0" cy="0" r="28" fill="#FEF2F2" stroke="#EF4444" stroke-width="2" />
      <polygon points="0,-18 6,-6 18,-6 9,3 12,15 0,8 -12,15 -9,3 -18,-6 -6,-6" fill="#EF4444" />
      <text x="0" y="45" fill="#DC2626" font-size="11" font-weight="bold" text-anchor="middle">COLLISION!</text>
      <text x="0" y="60" fill="#991B1B" font-size="9" text-anchor="middle">Collision wave propagates back to A and B</text>
    </g>

    <!-- Explanation & Sizing Rule below -->
    <g transform="translate(30, 260)">
      <rect width="720" height="115" rx="8" fill="#F8FAFC" stroke="#CBD5E1" />
      <text x="20" y="25" fill="#0F172A" font-size="12" font-weight="bold">The Golden Rule of CSMA/CD: Minimum Frame Size Constraint</text>
      <text x="20" y="48" fill="#475569" font-size="11">&bull; Station A detects the collision only when the reflected collision energy returns at: <tspan font-family="monospace" font-weight="bold" fill="#DC2626">t = 2 &times; &tau; (Slot Time)</tspan>.</text>
      <text x="20" y="70" fill="#475569" font-size="11">&bull; Therefore, transmission time of a frame MUST be at least twice the one-way propagation delay: <tspan font-family="monospace" font-weight="bold" fill="#059669">T_fr &ge; 2 &times; &tau;</tspan>.</text>
      <rect x="20" y="80" width="680" height="26" rx="4" fill="#DBEAFE" />
      <text x="360" y="97" fill="#1E40AF" font-size="11" font-weight="bold" text-anchor="middle">Minimum Frame Size = 2 &times; RTT &times; Bandwidth = 64 Bytes (512 bits in 10 Mbps Ethernet)</text>
    </g>
  </g>
</svg>
`);

// 6. CSMA/CA Operation & Hidden Terminal RTS/CTS
writeSvg('csma-ca-wireless-hidden-station.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 500" width="100%" height="100%" style="background:#ffffff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <rect x="30" y="20" width="840" height="54" rx="10" fill="#0F172A" />
  <text x="50" y="53" fill="#F8FAFC" font-size="18" font-weight="700">CSMA/CA in Wireless LANs: Hidden Terminal Problem &amp; RTS/CTS Solution</text>

  <g transform="translate(50, 95)">
    <!-- Top: Hidden Station Problem Diagram -->
    <rect x="0" y="0" width="800" height="170" rx="10" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5" />
    <text x="20" y="25" fill="#0F172A" font-size="12" font-weight="bold">The Hidden Terminal Problem (Wi-Fi 802.11):</text>

    <!-- Node A -->
    <g transform="translate(100, 75)">
      <circle cx="0" cy="0" r="28" fill="#DBEAFE" stroke="#3B82F6" stroke-width="2" />
      <text x="0" y="5" fill="#1E40AF" font-size="14" font-weight="bold" text-anchor="middle">Node A</text>
      <!-- Range Circle -->
      <circle cx="0" cy="0" r="140" fill="none" stroke="#3B82F6" stroke-dasharray="4 3" stroke-width="1.5" />
      <text x="0" y="45" fill="#1E40AF" font-size="9" text-anchor="middle">A's Range</text>
    </g>

    <!-- Node B (Access Point in Middle) -->
    <g transform="translate(400, 75)">
      <circle cx="0" cy="0" r="32" fill="#D1FAE5" stroke="#10B981" stroke-width="2.5" />
      <text x="0" y="6" fill="#065F46" font-size="15" font-weight="bold" text-anchor="middle">AP (B)</text>
      <text x="0" y="50" fill="#059669" font-size="10" font-weight="bold" text-anchor="middle">Receives both</text>
    </g>

    <!-- Node C on Right (Hidden from A) -->
    <g transform="translate(700, 75)">
      <circle cx="0" cy="0" r="28" fill="#FEE2E2" stroke="#EF4444" stroke-width="2" />
      <text x="0" y="5" fill="#DC2626" font-size="14" font-weight="bold" text-anchor="middle">Node C</text>
      <circle cx="0" cy="0" r="140" fill="none" stroke="#EF4444" stroke-dasharray="4 3" stroke-width="1.5" />
      <text x="0" y="45" fill="#DC2626" font-size="9" text-anchor="middle">C's Range</text>
    </g>

    <!-- Problem note -->
    <text x="400" y="150" fill="#DC2626" font-size="11" font-weight="bold" text-anchor="middle">A cannot hear C (outside radio range). If both transmit to B simultaneously &rarr; COLLISION at B!</text>

    <!-- Bottom: RTS/CTS Handshake Timeline -->
    <rect x="0" y="185" width="800" height="185" rx="10" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5" />
    <text x="20" y="210" fill="#065F46" font-size="12" font-weight="bold">The RTS / CTS Virtual Carrier Sensing Solution:</text>

    <g transform="translate(40, 225)">
      <!-- Step 1: DIFS wait -->
      <rect x="0" y="15" width="50" height="24" rx="4" fill="#E2E8F0" />
      <text x="25" y="31" fill="#475569" font-size="9" font-weight="bold" text-anchor="middle">DIFS</text>

      <!-- Step 2: RTS -->
      <rect x="55" y="15" width="60" height="24" rx="4" fill="#3B82F6" />
      <text x="85" y="31" fill="#FFF" font-size="9" font-weight="bold" text-anchor="middle">RTS</text>

      <!-- Step 3: SIFS -->
      <rect x="120" y="15" width="40" height="24" rx="4" fill="#FEF3C7" />
      <text x="140" y="31" fill="#92400E" font-size="8.5" text-anchor="middle">SIFS</text>

      <!-- Step 4: CTS -->
      <rect x="165" y="15" width="60" height="24" rx="4" fill="#10B981" />
      <text x="195" y="31" fill="#FFF" font-size="9" font-weight="bold" text-anchor="middle">CTS</text>

      <!-- Step 5: SIFS -->
      <rect x="230" y="15" width="40" height="24" rx="4" fill="#FEF3C7" />
      <text x="250" y="31" fill="#92400E" font-size="8.5" text-anchor="middle">SIFS</text>

      <!-- Step 6: DATA FRAME -->
      <rect x="275" y="10" width="220" height="34" rx="6" fill="#DBEAFE" stroke="#3B82F6" stroke-width="1.5" />
      <text x="385" y="32" fill="#1E40AF" font-size="11" font-weight="bold" text-anchor="middle">DATA FRAME TRANSMISSION</text>

      <!-- Step 7: SIFS -->
      <rect x="500" y="15" width="40" height="24" rx="4" fill="#FEF3C7" />
      <text x="520" y="31" fill="#92400E" font-size="8.5" text-anchor="middle">SIFS</text>

      <!-- Step 8: ACK -->
      <rect x="545" y="15" width="60" height="24" rx="4" fill="#10B981" />
      <text x="575" y="31" fill="#FFF" font-size="9" font-weight="bold" text-anchor="middle">ACK</text>

      <!-- NAV Bar for Node C below -->
      <rect x="165" y="60" width="440" height="26" rx="4" fill="#FEE2E2" stroke="#EF4444" stroke-dasharray="3 2" />
      <text x="385" y="77" fill="#DC2626" font-size="10" font-weight="bold" text-anchor="middle">Node C Sets Network Allocation Vector (NAV) &bull; Silences its transmitter!</text>
    </g>

    <text x="400" y="345" fill="#475569" font-size="10.5" text-anchor="middle">CTS sent by AP reaches Node C &bull; Node C reads NAV duration field and defers until ACK completes.</text>
  </g>
</svg>
`);

console.log('Topic 4 SVGs generated successfully.');
