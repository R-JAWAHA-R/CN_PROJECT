// 5 Structured Learning Paths System (Pages 43-46 of Blueprint)
// Allows students to track progress along guided pedagogical pathways

const LEARNING_PATHS = [
  {
    id: "path-beginner",
    title: "Path 1 — Complete Beginner Pathway",
    desc: "Start from absolute zero. Learn how packets travel through layers up to web applications.",
    category: "Foundation",
    steps: [
      { name: "Computer Network", conceptId: "packet", desc: "Why networks exist, nodes, links, and hosts." },
      { name: "Network Protocol", conceptId: "protocol", desc: "Rules of communication, message formats, and actions." },
      { name: "Protocol Stack & Encapsulation", conceptId: "encapsulation", desc: "How headers are wrapped and peeled off." },
      { name: "Packet & Frame", conceptId: "framing", desc: "Understanding units of data at L2 and L3." },
      { name: "IP (Internet Protocol)", conceptId: "ipv4", desc: "32-bit addressing and router traversal." },
      { name: "TCP & UDP", conceptId: "tcp", desc: "Reliable byte-streams vs fast datagrams." },
      { name: "HTTP & DNS", conceptId: "dns", desc: "Name resolution and web browsing in action." }
    ]
  },
  {
    id: "path-datalink",
    title: "Path 2 — Data Link Specialist Pathway",
    desc: "Master framing boundaries, polynomial CRC division, Hamming codes, ARQ sliding windows, and Ethernet.",
    category: "Unit II",
    steps: [
      { name: "Framing Boundaries & Byte Stuffing", conceptId: "framing", desc: "Flag bytes and escape delimiters." },
      { name: "HDLC Bit Stuffing", conceptId: "bit-stuffing", desc: "Inserting 0 after five 1s to prevent false flags." },
      { name: "Error Detection Overview", conceptId: "error-detection", desc: "Why errors happen and single-parity limits." },
      { name: "CRC Modulo-2 Arithmetic", conceptId: "crc", desc: "Polynomial division in GF(2) and checksumming." },
      { name: "Hamming (7,4) Single Error Corrector", conceptId: "hamming-code", desc: "Syndrome computation and forward error correction." },
      { name: "Stop-and-Wait ARQ", conceptId: "stop-and-wait", desc: "Timers, ACKs, and low channel utilization." },
      { name: "Pipelined Sliding Window", conceptId: "sliding-window", desc: "Bandwidth-delay product and utilization." },
      { name: "Go-Back-N Protocol", conceptId: "gbn", desc: "Cumulative ACKs and window retransmission." },
      { name: "Selective Repeat Protocol", conceptId: "selective-repeat", desc: "Receiver buffering and individual retransmission." },
      { name: "Ethernet (IEEE 802.3)", conceptId: "ethernet", desc: "64-byte slot time, CSMA/CD, and switches." }
    ]
  },
  {
    id: "path-routing",
    title: "Path 3 — Routing Specialist Pathway",
    desc: "Understand Data Plane vs Control Plane, master Dijkstra shortest paths, Distance Vector, OSPF areas, and IPv6.",
    category: "Unit III",
    steps: [
      { name: "Data Plane vs Control Plane", conceptId: "network-layer", desc: "Hardware nanosecond forwarding vs software routing." },
      { name: "Router Architecture", conceptId: "forwarding", desc: "Input queuing, crossbar fabrics, and HOL blocking." },
      { name: "Dijkstra’s Algorithm", conceptId: "dijkstra", desc: "Link-state least cost trees and iteration tables." },
      { name: "Distance Vector & Bellman-Ford", conceptId: "distance-vector", desc: "Iterative asynchronous neighbor vector exchanges." },
      { name: "Count-to-Infinity & Poisoned Reverse", conceptId: "distance-vector", desc: "Preventing routing loops with infinity announcements." },
      { name: "OSPF Multi-Area Architecture", conceptId: "ospf", desc: "Backbone Area 0, ABRs, and ASBR gateways." },
      { name: "BGP Path-Vector Protocol", conceptId: "bgp", desc: "AS-PATH loop prevention and policy routing." },
      { name: "IPv4 Header Structure", conceptId: "ipv4", desc: "RFC 791 fragmentation, TTL, and checksum." },
      { name: "IPv6 Fixed 40-Byte Header", conceptId: "ipv6", desc: "RFC 8200 128-bit IPs and flow labeling." },
      { name: "Network Address Translation (NAT)", conceptId: "nat", desc: "RFC 1918 private addressing and port translation." }
    ]
  },
  {
    id: "path-transport",
    title: "Path 4 — Transport Specialist Pathway",
    desc: "Deep-dive into TCP reliability, the 3-Way Handshake, flow control windows, and AIMD congestion algorithms.",
    category: "Unit IV",
    steps: [
      { name: "Transport Multiplexing & Sockets", conceptId: "transport-layer", desc: "2-tuple UDP vs 4-tuple TCP socket binding." },
      { name: "UDP 8-Byte Datagram & Checksum", conceptId: "udp", desc: "1's complement word addition algorithm." },
      { name: "TCP Three-Way Handshake", conceptId: "tcp-handshake", desc: "SYN, SYN+ACK, ACK, and ISN synchronization." },
      { name: "TCP Segment Header (RFC 9293)", conceptId: "tcp-header", desc: "Sequence numbering, byte offsets, and control flags." },
      { name: "Connection Teardown & TIME_WAIT", conceptId: "tcp-handshake", desc: "4-way closing and the 2*MSL quiet timer." },
      { name: "TCP Flow Control (rwnd)", conceptId: "tcp-flow-control", desc: "Receiver buffer equation and persist timer." },
      { name: "Congestion Control Principles", conceptId: "tcp-congestion-control", desc: "Causes and costs of congestion collapse." },
      { name: "Slow Start & Congestion Avoidance", conceptId: "tcp-congestion-control", desc: "Exponential doubling and linear AIMD." },
      { name: "Fast Retransmit & Fast Recovery", conceptId: "tcp-congestion-control", desc: "3 Duplicate ACKs reaction (Reno vs Tahoe)." }
    ]
  },
  {
    id: "path-security",
    title: "Path 5 — Application & Security Specialist Pathway",
    desc: "Master DNS resolution, HTTP/2/3, TLS encryption, SMTP/IMAP architectures, firewalls, and RSA mathematics.",
    category: "Unit V",
    steps: [
      { name: "Domain Name System (DNS)", conceptId: "dns", desc: "Hierarchy, Root/TLD servers, and Type A/MX records." },
      { name: "HTTP & Web Architecture", conceptId: "http", desc: "Statelessness, cookies, caching, and methods." },
      { name: "HTTPS (HTTP over TLS)", conceptId: "https", desc: "TLS encapsulation, certificates, and integrity." },
      { name: "E-Mail Architecture (SMTP & IMAP)", conceptId: "email-system", desc: "Pushing on port 25/587 and multi-device syncing." },
      { name: "Firewalls (NIST SP 800-41)", conceptId: "firewall", desc: "Stateless packet filtering vs stateful inspection." },
      { name: "Intrusion Detection & Prevention (NIST SP 800-94)", conceptId: "ids", desc: "Passive out-of-band IDS vs active inline IPS." },
      { name: "Public-Key Cryptography", conceptId: "rsa", desc: "Asymmetric key pairs and one-way trapdoors." },
      { name: "RSA Key Generation Algorithm", conceptId: "rsa", desc: "Primes p, q, modulus n, totient, and coprime e." },
      { name: "RSA Encryption & Extended Euclidean Math", conceptId: "rsa", desc: "Modular inverse d, encryption, and decryption." },
      { name: "RSA Padding Standards (RFC 8017)", conceptId: "rsa-padding", desc: "RSAES-OAEP encryption and RSASSA-PSS signatures." }
    ]
  }
];

const LearningPathsModule = {
  renderPathsHub: function(container) {
    container.innerHTML = `
      <div class="welcome-banner" style="background: linear-gradient(100deg, #dcfce7 0%, #e0f2fe 100%);">
        <div class="welcome-text">
          <div style="font-size: 0.85rem; font-weight: 800; color: #166534; text-transform: uppercase; margin-bottom: 0.35rem;">
            Guided Pedagogical Pathways
          </div>
          <h2>5 Structured Computer Networks Learning Paths</h2>
          <p>Follow tailored step-by-step roadmaps from complete beginner to specialized network engineer.</p>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 2rem; margin-top: 1.5rem;">
        ${LEARNING_PATHS.map((p, pIdx) => `
          <div class="study-card">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; border-bottom: 1px solid var(--border-light); padding-bottom: 0.75rem;">
              <div>
                <span class="topic-number-badge" style="background: #e8f5e9; color: #166534;">${p.category}</span>
                <h3 style="font-size: 1.35rem; font-weight: 800; color: #1e293b; margin-top: 0.2rem;">${p.title}</h3>
                <p style="font-size: 0.92rem; color: #64748b;">${p.desc}</p>
              </div>
              <div style="font-size: 0.85rem; font-weight: 700; color: #10b981; background: #f0fdf4; padding: 0.4rem 0.8rem; border-radius: var(--radius-full);">
                ${p.steps.length} Steps
              </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem;">
              ${p.steps.map((st, sIdx) => `
                <div class="schedule-item" onclick="App.openExplainModal('${st.conceptId}')" style="background: #ffffff; border: 1px solid var(--border-light); padding: 0.85rem 1rem; border-radius: 10px; cursor: pointer;">
                  <div>
                    <div style="font-size: 0.75rem; font-weight: 800; color: #0284c7; text-transform: uppercase;">
                      Step ${sIdx + 1}
                    </div>
                    <div style="font-weight: 800; color: #1e293b; font-size: 0.95rem; margin: 0.15rem 0;">
                      ${st.name}
                    </div>
                    <div style="font-size: 0.82rem; color: #64748b; line-height: 1.4;">
                      ${st.desc}
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LEARNING_PATHS, LearningPathsModule };
}
