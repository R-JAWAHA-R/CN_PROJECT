const fs = require('fs');
const path = require('path');

function writeSvg(relPath, content) {
  const fullPath = path.join(__dirname, '..', relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim(), 'utf8');
  console.log(`Created: ${relPath}`);
}

// 16. Topic 3: UDP Overview & Operation
writeSvg('assets/images/unit4/topic3-udp/udp-overview-operation.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 500">
  <defs>
    <style>
      text { font-family: 'Segoe UI', Arial, sans-serif; }
      .title { font-size: 20px; font-weight: bold; fill: #1e293b; }
      .sub { font-size: 13px; fill: #64748b; }
      .card-h { font-size: 13px; font-weight: bold; fill: #ffffff; }
      .card-d { font-size: 10px; fill: #334155; }
    </style>
  </defs>

  <rect width="840" height="500" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>

  <text x="420" y="32" text-anchor="middle" class="title">User Datagram Protocol (UDP): Architecture &amp; Operation</text>
  <text x="420" y="52" text-anchor="middle" class="sub">RFC 768 / Forouzan Section 23.2 — Lightweight Connectionless Transport Architecture</text>

  <!-- 3 Flow Columns -->
  <!-- Col 1: Sending Application -->
  <g transform="translate(40, 80)">
    <rect width="230" height="260" rx="8" fill="#ffffff" stroke="#bfdbfe" stroke-width="1.5"/>
    <rect width="230" height="32" rx="8" fill="#2563eb"/>
    <text x="115" y="21" text-anchor="middle" class="card-h">1. Application Layer</text>
    <text x="15" y="55" font-size="11" font-weight="bold" fill="#1e40af">Produces Discrete Messages:</text>
    <text x="15" y="75" class="card-d">• DNS Query: "What is ip for xyz.com?"</text>
    <text x="15" y="92" class="card-d">• VoIP Audio Chunk: 20ms G.711 PCM</text>
    <text x="15" y="109" class="card-d">• Game Player Coordinates (x, y, z)</text>
    <text x="15" y="126" class="card-d">• DHCP Discover broadcast</text>
    <rect x="15" y="145" width="200" height="55" rx="5" fill="#eff6ff" stroke="#93c5fd"/>
    <text x="25" y="165" font-size="9.5" font-weight="bold" fill="#1e3a8a">Message Boundaries Kept:</text>
    <text x="25" y="180" font-size="9" fill="#1e40af">1 sendto() = Exactly 1 Datagram!</text>
    <text x="25" y="192" font-size="8.5" fill="#64748b">(No framing / stream concatenation)</text>
  </g>

  <!-- Col 2: UDP Encapsulation -->
  <g transform="translate(305, 80)">
    <rect width="230" height="260" rx="8" fill="#ffffff" stroke="#a7f3d0" stroke-width="1.5"/>
    <rect width="230" height="32" rx="8" fill="#059669"/>
    <text x="115" y="21" text-anchor="middle" class="card-h">2. UDP Transport</text>
    <text x="15" y="55" font-size="11" font-weight="bold" fill="#065f46">8-Byte Header Attached:</text>
    <rect x="15" y="70" width="200" height="28" rx="4" fill="#059669"/>
    <text x="115" y="88" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff">8-Byte UDP Header</text>
    <rect x="15" y="102" width="200" height="40" rx="4" fill="#ecfdf5" stroke="#10b981"/>
    <text x="115" y="126" text-anchor="middle" font-size="10" fill="#065f46">Application Payload Data</text>
    <text x="15" y="165" class="card-d">• Zero connection handshake</text>
    <text x="15" y="182" class="card-d">• Zero sequence numbers</text>
    <text x="15" y="199" class="card-d">• Zero ACKs or retransmits</text>
    <text x="15" y="216" class="card-d">• Optional 1's complement Checksum</text>
  </g>

  <!-- Col 3: Network Layer Transmission -->
  <g transform="translate(570, 80)">
    <rect width="230" height="260" rx="8" fill="#ffffff" stroke="#e9d5ff" stroke-width="1.5"/>
    <rect width="230" height="32" rx="8" fill="#7c3aed"/>
    <text x="115" y="21" text-anchor="middle" class="card-h">3. IP Datagram</text>
    <text x="15" y="55" font-size="11" font-weight="bold" fill="#581c87">Encapsulated in IP (Proto=17):</text>
    <rect x="15" y="70" width="200" height="24" rx="4" fill="#7c3aed"/>
    <text x="115" y="86" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#ffffff">20-Byte IPv4 Header</text>
    <rect x="15" y="96" width="200" height="20" rx="4" fill="#059669"/>
    <text x="115" y="110" text-anchor="middle" font-size="9" font-weight="bold" fill="#ffffff">8-Byte UDP Header</text>
    <rect x="15" y="118" width="200" height="35" rx="4" fill="#faf5ff" stroke="#c084fc"/>
    <text x="115" y="138" text-anchor="middle" font-size="9.5" fill="#581c87">User Data</text>
    <text x="15" y="175" class="card-d">• Routers forward independently</text>
    <text x="15" y="192" class="card-d">• If dropped: Silently discarded</text>
    <text x="15" y="209" class="card-d">• If corrupted: Checksum drops</text>
  </g>

  <!-- Bottom Characteristics Bar -->
  <g transform="translate(40, 360)">
    <rect width="760" height="110" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="25" y="24" font-size="13" font-weight="bold" fill="#0f172a">Key Operational Strengths of UDP:</text>
    <g transform="translate(25, 35)">
      <text x="0" y="14" font-size="10" fill="#334155"><tspan font-weight="bold" fill="#2563eb">1. Zero Connection Setup Delay (0-RTT):</tspan> Immediate transmission without 3-way handshake round trips.</text>
      <text x="0" y="30" font-size="10" fill="#334155"><tspan font-weight="bold" fill="#059669">2. No Connection State:</tspan> Server does not allocate TCB buffers, enabling millions of simultaneous clients.</text>
      <text x="0" y="46" font-size="10" fill="#334155"><tspan font-weight="bold" fill="#7c3aed">3. Small Packet Overhead:</tspan> Only 8 bytes of header vs 20-60 bytes in TCP (60% to 87% lower overhead).</text>
      <text x="0" y="62" font-size="10" fill="#334155"><tspan font-weight="bold" fill="#ea580c">4. No Congestion Throttling:</tspan> Transmits audio/video frames at steady real-time codec rates.</text>
    </g>
  </g>
</svg>
`);

// 17. Topic 3: UDP Services and Characteristics
writeSvg('assets/images/unit4/topic3-udp/udp-services-characteristics.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 500">
  <defs>
    <style>
      text { font-family: 'Segoe UI', Arial, sans-serif; }
      .title { font-size: 19px; font-weight: bold; fill: #1e293b; }
      .sub { font-size: 12.5px; fill: #64748b; }
      .pill-t { font-size: 11px; font-weight: bold; fill: #ffffff; text-anchor: middle; }
      .d-text { font-size: 9.5px; fill: #475569; }
    </style>
  </defs>

  <rect width="840" height="500" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>

  <text x="420" y="30" text-anchor="middle" class="title">UDP Services and Protocol Characteristics</text>
  <text x="420" y="48" text-anchor="middle" class="sub">Forouzan Section 23.2 — Process-to-Process Datagram Delivery with Minimum Transport Overhead</text>

  <!-- 4 Feature Cards Grid -->
  <g transform="translate(40, 75)">
    <!-- Card 1 -->
    <rect x="0" y="0" width="365" height="175" rx="8" fill="#ffffff" stroke="#bfdbfe" stroke-width="1.2"/>
    <rect x="15" y="15" width="140" height="26" rx="4" fill="#2563eb"/>
    <text x="85" y="32" class="pill-t">Connectionless Service</text>
    <text x="15" y="60" font-size="11" font-weight="bold" fill="#1e40af">• Zero Handshake Latency</text>
    <text x="15" y="76" class="d-text">Each user datagram is an independent entity with no relation</text>
    <text x="15" y="90" class="d-text">to previous or subsequent datagrams. No connection is opened,</text>
    <text x="15" y="104" class="d-text">maintained, or closed.</text>
    <text x="15" y="125" class="d-text">• Ideal for quick request-response queries like DNS and NTP.</text>
    <text x="15" y="140" class="d-text">• Reduces server load drastically by maintaining zero session state.</text>

    <!-- Card 2 -->
    <rect x="395" y="0" width="365" height="175" rx="8" fill="#ffffff" stroke="#a7f3d0" stroke-width="1.2"/>
    <rect x="410" y="15" width="140" height="26" rx="4" fill="#059669"/>
    <text x="480" y="32" class="pill-t">Unreliable Delivery</text>
    <text x="410" y="60" font-size="11" font-weight="bold" fill="#065f46">• Best-Effort Service Model</text>
    <text x="410" y="76" class="d-text">UDP does not guarantee delivery, packet sequencing, or loss</text>
    <text x="410" y="90" class="d-text">recovery. If a packet is corrupted in transit, the checksum detects</text>
    <text x="410" y="104" class="d-text">it and the receiver quietly discards it.</text>
    <text x="410" y="125" class="d-text">• No retransmission timers; application handles error recovery</text>
    <text x="410" y="140" class="d-text">  if needed (or tolerates dropped samples as in voice calls).</text>
  </g>

  <g transform="translate(40, 265)">
    <!-- Card 3 -->
    <rect x="0" y="0" width="365" height="195" rx="8" fill="#ffffff" stroke="#fed7aa" stroke-width="1.2"/>
    <rect x="15" y="15" width="160" height="26" rx="4" fill="#ea580c"/>
    <text x="95" y="32" class="pill-t">Message-Oriented Service</text>
    <text x="15" y="60" font-size="11" font-weight="bold" fill="#9a3412">• Preserves Message Boundaries</text>
    <text x="15" y="76" class="d-text">Unlike TCP, which provides a continuous unstructured stream of</text>
    <text x="15" y="90" class="d-text">bytes, UDP preserves datagram boundaries intact.</text>
    <text x="15" y="110" class="d-text">• If sender writes 100 bytes via sendto(), receiver reads exactly</text>
    <text x="15" y="124" class="d-text">  100 bytes via recvfrom() in one single atomic operation.</text>
    <text x="15" y="144" class="d-text">• Eliminates the need for application-level record delimiters!</text>

    <!-- Card 4 -->
    <rect x="395" y="0" width="365" height="195" rx="8" fill="#ffffff" stroke="#c084fc" stroke-width="1.2"/>
    <rect x="410" y="15" width="160" height="26" rx="4" fill="#7c3aed"/>
    <text x="490" y="32" class="pill-t">Multicast &amp; Broadcast</text>
    <text x="410" y="60" font-size="11" font-weight="bold" fill="#581c87">• Flexible Transmission Modes</text>
    <text x="410" y="76" class="d-text">TCP is strictly point-to-point (unicast between 2 endpoints).</text>
    <text x="410" y="90" class="d-text">UDP inherently supports 1-to-many communication:</text>
    <text x="410" y="110" class="d-text">• <tspan font-weight="bold">Unicast:</tspan> One sender to one receiver.</text>
    <text x="410" y="126" class="d-text">• <tspan font-weight="bold">Multicast:</tspan> One sender to a subscribed multicast group (e.g. IPTV).</text>
    <text x="410" y="142" class="d-text">• <tspan font-weight="bold">Broadcast:</tspan> One sender to all nodes on local subnet (DHCP discover).</text>
  </g>
</svg>
`);

// 18. Topic 4: TCP Services and Buffers
writeSvg('assets/images/unit4/topic4-tcp/tcp-services-buffers.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 500">
  <defs>
    <style>
      text { font-family: 'Segoe UI', Arial, sans-serif; }
      .title { font-size: 20px; font-weight: bold; fill: #1e293b; }
      .sub { font-size: 13px; fill: #64748b; }
      .h-text { font-size: 13px; font-weight: bold; fill: #ffffff; }
      .stream-b { stroke-width: 1.2; }
    </style>
  </defs>

  <rect width="840" height="500" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>

  <text x="420" y="32" text-anchor="middle" class="title">TCP Stream Delivery Service &amp; Circular Buffer Architecture</text>
  <text x="420" y="52" text-anchor="middle" class="sub">Forouzan Figure 23.13 &amp; 23.14 — Unstructured Byte Streams, Segment Packetization &amp; Circular Queues</text>

  <!-- Top: Stream Delivery Concept -->
  <g transform="translate(40, 75)">
    <rect width="760" height="140" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="25" y="24" font-size="13" font-weight="bold" fill="#0f172a">Stream Delivery: Converting Byte Streams into Segments</text>

    <!-- Sending Process -->
    <rect x="25" y="45" width="130" height="65" rx="6" fill="#eff6ff" stroke="#3b82f6"/>
    <text x="90" y="70" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">Sending App</text>
    <text x="90" y="86" text-anchor="middle" font-size="9" fill="#2563eb">Writes byte stream</text>

    <!-- Arrow & Stream bytes -->
    <path d="M 160 78 L 220 78" stroke="#3b82f6" stroke-width="2" marker-end="url(#arr-b)"/>
    <text x="190" y="70" text-anchor="middle" font-size="9" font-weight="bold" fill="#2563eb">write()</text>

    <!-- Sender Buffer / TCP Segments -->
    <rect x="230" y="45" width="280" height="65" rx="6" fill="#f1f5f9" stroke="#94a3b8"/>
    <text x="370" y="65" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#334155">TCP Sender: Segments Assembled</text>
    
    <!-- 3 Segments -->
    <rect x="245" y="75" width="75" height="24" rx="3" fill="#2563eb"/>
    <text x="282" y="91" text-anchor="middle" font-size="9" fill="#ffffff" font-weight="bold">Seg 1 (1000B)</text>
    <rect x="330" y="75" width="75" height="24" rx="3" fill="#059669"/>
    <text x="367" y="91" text-anchor="middle" font-size="9" fill="#ffffff" font-weight="bold">Seg 2 (1000B)</text>
    <rect x="415" y="75" width="75" height="24" rx="3" fill="#7c3aed"/>
    <text x="452" y="91" text-anchor="middle" font-size="9" fill="#ffffff" font-weight="bold">Seg 3 (1000B)</text>

    <path d="M 515 78 L 575 78" stroke="#16a34a" stroke-width="2"/>
    <text x="545" y="70" text-anchor="middle" font-size="9" font-weight="bold" fill="#16a34a">IP Transit</text>

    <!-- Receiver App -->
    <rect x="585" y="45" width="150" height="65" rx="6" fill="#ecfdf5" stroke="#10b981"/>
    <text x="660" y="70" text-anchor="middle" font-size="11" font-weight="bold" fill="#065f46">Receiving App</text>
    <text x="660" y="86" text-anchor="middle" font-size="9" fill="#059669">Reads in any chunk size</text>

    <text x="25" y="125" font-size="9.5" fill="#475569">• TCP creates the illusion of an unbroken byte tube: Sender writes 2000B once; receiver can read in four 500B chunks!</text>
  </g>

  <!-- Bottom: Byte-Stream Sequence Numbering -->
  <g transform="translate(40, 235)">
    <rect width="760" height="235" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    <rect width="760" height="30" rx="8" fill="#4f46e5"/>
    <text x="25" y="20" class="h-text">Byte-Stream Numbering System (Forouzan Example 23.3)</text>

    <g transform="translate(25, 45)">
      <text x="0" y="18" font-size="11" font-weight="bold" fill="#0f172a">Example Problem: Transferring 5,000 bytes starting at byte 10,001 across 5 segments of 1,000 bytes each:</text>

      <!-- 5 Segments Visualized -->
      <g transform="translate(0, 30)">
        <rect x="0" y="0" width="135" height="65" rx="5" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="67" y="20" text-anchor="middle" font-size="10" font-weight="bold" fill="#1d4ed8">Segment 1</text>
        <text x="67" y="38" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#1e40af">Seq No: 10,001</text>
        <text x="67" y="52" text-anchor="middle" font-size="8" fill="#475569">Bytes 10,001–11,000</text>

        <rect x="145" y="0" width="135" height="65" rx="5" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="212" y="20" text-anchor="middle" font-size="10" font-weight="bold" fill="#1d4ed8">Segment 2</text>
        <text x="212" y="38" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#1e40af">Seq No: 11,001</text>
        <text x="212" y="52" text-anchor="middle" font-size="8" fill="#475569">Bytes 11,001–12,000</text>

        <rect x="290" y="0" width="135" height="65" rx="5" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="357" y="20" text-anchor="middle" font-size="10" font-weight="bold" fill="#1d4ed8">Segment 3</text>
        <text x="357" y="38" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#1e40af">Seq No: 12,001</text>
        <text x="357" y="52" text-anchor="middle" font-size="8" fill="#475569">Bytes 12,001–13,000</text>

        <rect x="435" y="0" width="135" height="65" rx="5" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="502" y="20" text-anchor="middle" font-size="10" font-weight="bold" fill="#1d4ed8">Segment 4</text>
        <text x="502" y="38" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#1e40af">Seq No: 13,001</text>
        <text x="502" y="52" text-anchor="middle" font-size="8" fill="#475569">Bytes 13,001–14,000</text>

        <rect x="580" y="0" width="130" height="65" rx="5" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="645" y="20" text-anchor="middle" font-size="10" font-weight="bold" fill="#1d4ed8">Segment 5</text>
        <text x="645" y="38" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#1e40af">Seq No: 14,001</text>
        <text x="645" y="52" text-anchor="middle" font-size="8" fill="#475569">Bytes 14,001–15,000</text>
      </g>

      <rect x="0" y="110" width="710" height="65" rx="5" fill="#f0fdf4" stroke="#86efac"/>
      <text x="15" y="130" font-size="10.5" font-weight="bold" fill="#15803d">Cumulative ACK Principle:</text>
      <text x="15" y="146" font-size="9.5" fill="#166534">• If receiver successfully receives Segment 1 (bytes 10,001 to 11,000), it returns <tspan font-weight="bold">Ack = 11,001</tspan>.</text>
      <text x="15" y="160" font-size="9.5" fill="#166534">• Meaning: "I have successfully received all bytes up to 11,000; I am now expecting byte 11,001 next!"</text>
    </g>
  </g>
</svg>
`);

// 19. Topic 4: TCP Sliding Window Flow & Calculations
writeSvg('assets/images/unit4/topic4-tcp/tcp-sliding-window-flow.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 500">
  <defs>
    <style>
      text { font-family: 'Segoe UI', Arial, sans-serif; }
      .title { font-size: 19px; font-weight: bold; fill: #1e293b; }
      .sub { font-size: 12.5px; fill: #64748b; }
      .win-t { font-size: 13px; font-weight: bold; fill: #ffffff; }
      .lbl { font-size: 10.5px; fill: #334155; }
    </style>
  </defs>

  <rect width="840" height="500" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>

  <text x="420" y="30" text-anchor="middle" class="title">TCP Byte-Level Sliding Window Dynamics</text>
  <text x="420" y="48" text-anchor="middle" class="sub">Forouzan Section 23.3 &amp; Examples 23.4–23.6 — Window Movements (Opening, Closing, Shrinking)</text>

  <!-- Formula Card -->
  <g transform="translate(40, 70)">
    <rect width="760" height="70" rx="8" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1.5"/>
    <text x="25" y="24" font-size="12.5" font-weight="bold" fill="#1e40af">Master Window Sizing Formula:</text>
    <rect x="25" y="32" width="340" height="28" rx="4" fill="#2563eb"/>
    <text x="195" y="51" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff">Window Size = min(rwnd, cwnd)</text>
    <text x="380" y="44" font-size="10" fill="#1e40af">• <tspan font-weight="bold">rwnd:</tspan> Advertised by receiver to prevent buffer overflow (Flow Control)</text>
    <text x="380" y="58" font-size="10" fill="#1e40af">• <tspan font-weight="bold">cwnd:</tspan> Maintained by sender to prevent network collapse (Congestion Control)</text>
  </g>

  <!-- 3 Window Movements Detailed -->
  <g transform="translate(40, 155)">
    <!-- 1. Opening -->
    <g transform="translate(0, 0)">
      <rect width="240" height="150" rx="6" fill="#ffffff" stroke="#bbf7d0" stroke-width="1.2"/>
      <rect width="240" height="28" rx="6" fill="#16a34a"/>
      <text x="120" y="19" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">1. Window Opening</text>
      <text x="15" y="48" font-size="10.5" font-weight="bold" fill="#15803d">Right Edge Moves Right</text>
      <text x="15" y="66" class="lbl">• Triggered when receiver buffer</text>
      <text x="15" y="80" class="lbl">  frees space and advertises a</text>
      <text x="15" y="94" class="lbl">  larger rwnd credit.</text>
      <text x="15" y="114" class="lbl">• Allows more bytes to be</text>
      <text x="15" y="128" class="lbl">  transmitted immediately.</text>
    </g>

    <!-- 2. Closing -->
    <g transform="translate(260, 0)">
      <rect width="240" height="150" rx="6" fill="#ffffff" stroke="#bfdbfe" stroke-width="1.2"/>
      <rect width="240" height="28" rx="6" fill="#2563eb"/>
      <text x="120" y="19" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">2. Window Closing</text>
      <text x="15" y="48" font-size="10.5" font-weight="bold" fill="#1e40af">Left Edge Moves Right</text>
      <text x="15" y="66" class="lbl">• Triggered when sender receives</text>
      <text x="15" y="80" class="lbl">  cumulative ACKs confirming</text>
      <text x="15" y="94" class="lbl">  in-flight bytes reached receiver.</text>
      <text x="15" y="114" class="lbl">• Acknowledged bytes are freed</text>
      <text x="15" y="128" class="lbl">  from circular retransmit buffer.</text>
    </g>

    <!-- 3. Shrinking -->
    <g transform="translate(520, 0)">
      <rect width="240" height="150" rx="6" fill="#ffffff" stroke="#fecaca" stroke-width="1.2"/>
      <rect width="240" height="28" rx="6" fill="#dc2626"/>
      <text x="120" y="19" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">3. Window Shrinking</text>
      <text x="15" y="48" font-size="10.5" font-weight="bold" fill="#991b1b">Right Edge Moves Left (Forbidden!)</text>
      <text x="15" y="66" class="lbl">• Would occur if receiver pulls</text>
      <text x="15" y="80" class="lbl">  back advertised credit.</text>
      <text x="15" y="100" class="lbl">• <tspan font-weight="bold" fill="#b91c1c">RFC 9293 strongly discourages:</tspan></text>
      <text x="15" y="116" class="lbl">  Causes packet drop confusion</text>
      <text x="15" y="130" class="lbl">  if data was already in transit!</text>
    </g>
  </g>

  <!-- Solved Example Box -->
  <g transform="translate(40, 320)">
    <rect width="760" height="150" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="25" y="24" font-size="12.5" font-weight="bold" fill="#0f172a">Solved Numerical: Forouzan Example 23.4 &amp; 23.5</text>
    
    <g transform="translate(25, 38)">
      <text x="0" y="16" font-size="10.5" fill="#334155"><tspan font-weight="bold">Given:</tspan> Receiver Host B has total buffer = 5,000 bytes. Currently, 2,000 bytes have been received and remain unread by application.</text>
      <text x="0" y="32" font-size="10.5" fill="#166534"><tspan font-weight="bold">Calculation 1 (rwnd):</tspan> rwnd = Buffer Size - Unread Bytes = 5,000 - 2,000 = <tspan font-weight="bold">3,000 bytes</tspan>.</text>
      <text x="0" y="48" font-size="10.5" fill="#334155"><tspan font-weight="bold">Given Sender State:</tspan> Sender Host A has current congestion window cwnd = 3,500 bytes.</text>
      <text x="0" y="64" font-size="10.5" fill="#1d4ed8"><tspan font-weight="bold">Calculation 2 (Window Size):</tspan> Window Size = min(rwnd, cwnd) = min(3,000, 3,500) = <tspan font-weight="bold">3,000 bytes</tspan>.</text>
      <text x="0" y="80" font-size="9.5" fill="#64748b">• Flow control restricts the sender here, because the receiver buffer (3000) is smaller than network bandwidth capacity (3500)!</text>
      <text x="0" y="96" font-size="9.5" fill="#64748b">• If the application now reads 1,000 bytes, rwnd expands to 4,000 bytes. Then Window Size = min(4,000, 3,500) = 3,500 bytes.</text>
    </g>
  </g>
</svg>
`);

// 20. Topic 5: AQM, RED & ECN
writeSvg('assets/images/unit4/topic5-congestion-control/aqm-red-ecn.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 500">
  <defs>
    <style>
      text { font-family: 'Segoe UI', Arial, sans-serif; }
      .title { font-size: 19px; font-weight: bold; fill: #1e293b; }
      .sub { font-size: 12.5px; fill: #64748b; }
      .h-box { font-size: 13px; font-weight: bold; fill: #ffffff; }
      .lbl { font-size: 10px; fill: #334155; }
    </style>
  </defs>

  <rect width="840" height="500" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>

  <text x="420" y="30" text-anchor="middle" class="title">Active Queue Management (AQM), RED &amp; Explicit Congestion Notification (ECN)</text>
  <text x="420" y="48" text-anchor="middle" class="sub">RFC 2309 (RED) / RFC 3168 (ECN) — Preventing Bufferbloat and Global TCP Synchronization</text>

  <!-- Left: Random Early Detection (RED) Curve -->
  <g transform="translate(40, 75)">
    <rect width="365" height="390" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    <rect width="365" height="32" rx="8" fill="#2563eb"/>
    <text x="182" y="21" text-anchor="middle" class="h-box">Random Early Detection (RED) Algorithm</text>

    <!-- Graph Canvas inside Card -->
    <rect x="20" y="45" width="325" height="180" rx="5" fill="#f8fafc" stroke="#e2e8f0"/>
    
    <!-- Axes -->
    <line x1="45" y1="200" x2="330" y2="200" stroke="#334155" stroke-width="1.5"/>
    <line x1="45" y1="200" x2="45" y2="60" stroke="#334155" stroke-width="1.5"/>
    <text x="330" y="215" text-anchor="end" font-size="9" fill="#334155">Average Queue Length (AvgLen) →</text>
    <text x="40" y="55" font-size="8.5" fill="#334155">Drop Prob (p) →</text>

    <!-- Thresholds -->
    <line x1="120" y1="60" x2="120" y2="200" stroke="#16a34a" stroke-dasharray="3,3"/>
    <text x="120" y="215" text-anchor="middle" font-size="8.5" font-weight="bold" fill="#15803d">min_th</text>

    <line x1="220" y1="60" x2="220" y2="200" stroke="#ea580c" stroke-dasharray="3,3"/>
    <text x="220" y="215" text-anchor="middle" font-size="8.5" font-weight="bold" fill="#c2410c">max_th</text>

    <!-- RED Curve -->
    <!-- 0 before min_th, linear to max_p at max_th, 1.0 above max_th -->
    <line x1="45" y1="200" x2="120" y2="200" stroke="#16a34a" stroke-width="2.5"/>
    <text x="80" y="190" text-anchor="middle" font-size="8" fill="#15803d">p = 0</text>

    <line x1="120" y1="200" x2="220" y2="130" stroke="#ea580c" stroke-width="2.5"/>
    <text x="170" y="150" font-size="7.5" fill="#c2410c">Linear (0 to max_p)</text>

    <line x1="220" y1="130" x2="220" y2="80" stroke="#dc2626" stroke-width="2" stroke-dasharray="2,2"/>
    <line x1="220" y1="80" x2="330" y2="80" stroke="#dc2626" stroke-width="2.5"/>
    <text x="270" y="72" font-size="8" font-weight="bold" fill="#dc2626">p = 1.0 (Drop All)</text>

    <text x="20" y="245" font-size="10.5" font-weight="bold" fill="#0f172a">Three Operating Zones:</text>
    <text x="20" y="262" class="lbl">• <tspan font-weight="bold" fill="#15803d">AvgLen &lt; min_th:</tspan> Queue safe; 0% packets dropped.</text>
    <text x="20" y="278" class="lbl">• <tspan font-weight="bold" fill="#c2410c">min_th ≤ AvgLen ≤ max_th:</tspan> Early probabilistic drops/marks.</text>
    <text x="20" y="294" class="lbl">• <tspan font-weight="bold" fill="#b91c1c">AvgLen &gt; max_th:</tspan> Severe queue overflow; drop 100% of arrivals.</text>
    <text x="20" y="318" font-size="9" fill="#475569">💡 Prevents <tspan font-weight="bold">Global Synchronization</tspan>, where all TCP connections drop cwnd simultaneously, wasting network link capacity!</text>
  </g>

  <!-- Right: Explicit Congestion Notification (ECN) -->
  <g transform="translate(435, 75)">
    <rect width="365" height="390" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    <rect width="365" height="32" rx="8" fill="#059669"/>
    <text x="182" y="21" text-anchor="middle" class="h-box">Explicit Congestion Notification (ECN)</text>

    <text x="20" y="55" font-size="11" font-weight="bold" fill="#065f46">RFC 3168: Congestion Signaling Without Packet Loss</text>
    <text x="20" y="72" class="lbl">Traditional TCP treats packet loss as the only signal of congestion.</text>
    <text x="20" y="86" class="lbl">ECN allows routers to signal congestion BEFORE dropping packets!</text>

    <!-- IP Header Bits -->
    <rect x="20" y="100" width="325" height="55" rx="5" fill="#eff6ff" stroke="#bfdbfe"/>
    <text x="35" y="120" font-size="10.5" font-weight="bold" fill="#1e40af">1. In IP Header: 2 ECN Bits (Bits 6 &amp; 7 of ToS/DiffServ)</text>
    <text x="35" y="136" font-size="9" fill="#334155">• <tspan font-family="Courier New">00:</tspan> Non-ECN-Capable | <tspan font-family="Courier New">01/10 (ECT):</tspan> ECN Capable Transport</text>
    <text x="35" y="148" font-size="9" font-weight="bold" fill="#dc2626">• <tspan font-family="Courier New">11 (CE):</tspan> Congestion Experienced (Set by congested router!)</text>

    <!-- TCP Header Bits -->
    <rect x="20" y="165" width="325" height="60" rx="5" fill="#f0fdf4" stroke="#86efac"/>
    <text x="35" y="185" font-size="10.5" font-weight="bold" fill="#15803d">2. In TCP Header: 2 Flags (ECE &amp; CWR)</text>
    <text x="35" y="202" font-size="9" fill="#166534">• <tspan font-weight="bold">ECE (ECN-Echo):</tspan> Receiver reflects CE mark back to sender.</text>
    <text x="35" y="216" font-size="9" fill="#166534">• <tspan font-weight="bold">CWR (Congestion Window Reduced):</tspan> Sender confirms</text>
    <text x="35" y="226" font-size="8.5" fill="#166534">  it reduced cwnd, instructing receiver to stop sending ECE.</text>

    <!-- Flow Steps -->
    <rect x="20" y="235" width="325" height="135" rx="5" fill="#fefce8" stroke="#fef08a"/>
    <text x="30" y="255" font-size="10" font-weight="bold" fill="#854d0e">End-to-End ECN Feedback Loop:</text>
    <text x="30" y="272" font-size="9" fill="#713f12">1. Sender transmits IP packet with ECT bit set (10).</text>
    <text x="30" y="288" font-size="9" fill="#713f12">2. Router queue reaches min_th; marks packet with CE (11).</text>
    <text x="30" y="304" font-size="9" fill="#713f12">3. Receiver notices CE; sends ACK with ECE=1 flag.</text>
    <text x="30" y="320" font-size="9" fill="#713f12">4. Sender reduces cwnd as if packet was dropped (halves cwnd).</text>
    <text x="30" y="336" font-size="9" fill="#713f12">5. Sender sets CWR=1 in next packet to acknowledge reduction.</text>
    <text x="30" y="354" font-size="9" font-weight="bold" fill="#166534">Result: Zero packet loss, zero retransmissions, low queue delay!</text>
  </g>
</svg>
`);

console.log("Batch 5 SVGs created successfully!");

