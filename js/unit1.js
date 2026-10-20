// Unit I: Networking Fundamentals & Physical Layer - Curriculum Overview & Topics Hub
// Comprehensive 14-topic curriculum based on Kurose & Ross Chapter 1, Tanenbaum Chapters 1-2, and Forouzan Chapters 1-6

const Unit1Module = {
  render: function(container) {
    const u1Topics = [
      { id: "computer-network", num: 1, title: "Computer Networks & The Global Internet", desc: "Network definitions, client-server/P2P, global ISP hierarchy (Tier 1/2/3), IXPs, and network classifications (LAN, MAN, WAN).", diff: "Core", time: "7 min read", prereq: "None" },
      { id: "network-edge-core", num: 2, title: "Network Edge, Core & Access Networks", desc: "End systems vs mesh packet-switched core, store-and-forward routing, and broadband access (FTTH GPON, DOCSIS cable, DSL, 5G).", diff: "Core", time: "8 min read", prereq: "Computer Network" },
      { id: "hosts-routers-switches", num: 3, title: "Network Hardware: Hosts, Routers, Switches & NICs", desc: "Layer 1 Hubs vs Layer 2 Switches vs Layer 3 Routers, collision domains, broadcast domains, and TCAM FIB lookups.", diff: "Core", time: "7 min read", prereq: "Network Edge & Core" },
      { id: "protocol", num: 4, title: "Network Protocols, Services & Interfaces", desc: "Rules of communication: Syntax, Semantics, Timing, Service Access Points (SAPs), and service primitives (Request/Indication/Confirm).", diff: "Foundation", time: "6 min read", prereq: "Computer Network" },
      { id: "osi-model", num: 5, title: "The 7-Layer OSI Reference Model (ISO 7498)", desc: "Complete functional breakdown of Physical, Data Link, Network, Transport, Session, Presentation, and Application layers.", diff: "Core", time: "9 min read", prereq: "Protocol" },
      { id: "tcp-ip-model", num: 6, title: "The TCP/IP Architecture & Hourglass Model", desc: "The 4-layer Internet model (RFC 1122) vs OSI, why IP became the universal narrow waist, and the End-to-End design principle.", diff: "Core", time: "8 min read", prereq: "OSI Model" },
      { id: "protocol-stack", num: 7, title: "Protocol Stacks & Layered Architecture", desc: "Hierarchical layering, layer independence, peer-to-peer virtual dialogues vs physical bit flows, and protocol stack overhead.", diff: "Core", time: "6 min read", prereq: "TCP/IP Model" },
      { id: "encapsulation", num: 8, title: "Encapsulation, Decapsulation & Multiplexing", desc: "How payloads become Segments, Packets, and Frames; header/trailer wrapping, and demultiplexing keys (EtherType, Protocol, Port).", diff: "Core", time: "7 min read", prereq: "Protocol Stack" },
      { id: "network-topologies", num: 9, title: "Network Topologies: Mesh, Star, Bus, Ring & Hybrid", desc: "Geometric layouts: Full Mesh N(N-1)/2 links, Star central switch, Bus collision domains, Ring loops, and Tree hierarchies.", diff: "Core", time: "7 min read", prereq: "Hardware" },
      { id: "circuit-vs-packet-switching", num: 10, title: "Circuit Switching vs Packet Switching", desc: "Dedicated reserved paths vs statistical packet multiplexing, FDM/TDM vs on-demand sharing, and mathematical multiplexing gain.", diff: "Core", time: "8 min read", prereq: "Computer Network" },
      { id: "transmission-media", num: 11, title: "Physical Layer Transmission Media", desc: "Guided media (Cat5e/6/6a Twisted Pair, Coaxial, Single-Mode and Multi-Mode Optical Fiber) vs Unguided radio/microwave channels.", diff: "Core", time: "8 min read", prereq: "Hardware" },
      { id: "network-delay-loss", num: 12, title: "Performance: Delays, Loss & Bandwidth-Delay Product", desc: "The 4 nodal delays (d_proc, d_queue, d_trans = L/R, d_prop = d/s), traffic intensity, Little's Law, and BDP pipe sizing.", diff: "Core", time: "9 min read", prereq: "Transmission Media" },
      { id: "multiplexing", num: 13, title: "Multiplexing Techniques: FDM, TDM, WDM & STDM", desc: "Frequency Division Multiplexing, Synchronous vs Statistical TDM, and Dense Wavelength Division Multiplexing (DWDM) in optical fiber.", diff: "Core", time: "7 min read", prereq: "Transmission Media" },
      { id: "analog-digital-signals", num: 14, title: "Signal Fundamentals: Nyquist Rate & Shannon Capacity", desc: "Analog vs digital waveforms, SNR in decibels, Nyquist noiseless limit C = 2B log2(M), and Shannon noisy capacity C = B log2(1 + SNR).", diff: "Advanced", time: "9 min read", prereq: "Transmission Media" }
    ];

    container.innerHTML = `
      <!-- Unit Banner -->
      <div class="welcome-banner" style="background: linear-gradient(100deg, #ecfdf5 0%, #d1fae5 50%, #a7f3d0 100%);">
        <div class="welcome-text">
          <div style="font-size: 0.85rem; font-weight: 800; color: #047857; text-transform: uppercase; margin-bottom: 0.35rem;">
            Semester V • Computer Networks • Kurose & Ross Ch 1 / Tanenbaum Ch 1-2
          </div>
          <h2>Unit I: Networking Fundamentals & Physical Layer</h2>
          <p>Comprehensive foundation: network edge & core, hosts, switches, routers, the 7-layer OSI & 4-layer TCP/IP models, encapsulation, transmission media, delays, multiplexing, and Shannon capacity limits.</p>
        </div>
        <div class="welcome-scene">
          <div class="better-note" style="color: #047857;">
            Foundations<br>First ♡
          </div>
        </div>
      </div>

      <!-- Unit Overview & Learning Objectives -->
      <div class="study-card" style="margin-bottom: 2rem;">
        <div class="study-card-header">
          <div>
            <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Curriculum Guide</span>
            <h3 class="study-card-title">What You Will Master in Unit I</h3>
          </div>
          <span class="badge" style="background: #ecfdf5; color: #047857; font-weight: 700; padding: 6px 12px; border-radius: 9999px;">14 Comprehensive Lessons</span>
        </div>
        <div class="concept-explanation">
          <p>
            Computer networking is built upon modular, layered abstractions. In this foundational unit, you explore how arbitrary digital data is transformed from application messages into packets and physical bits transmitted over shared guided and unguided media.
          </p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-top: 1rem;">
            <div style="background: #f8fafc; border: 1px solid var(--border-light); border-radius: 12px; padding: 1rem;">
              <strong style="color: #047857;">✓ Network Core vs Edge</strong>
              <p style="font-size: 0.85rem; color: #64748b; margin-top: 0.3rem;">Distinguish between end systems (hosts, servers) and packet-switching network infrastructure (routers, switches).</p>
            </div>
            <div style="background: #f8fafc; border: 1px solid var(--border-light); border-radius: 12px; padding: 1rem;">
              <strong style="color: #047857;">✓ The OSI & TCP/IP Reference Models</strong>
              <p style="font-size: 0.85rem; color: #64748b; margin-top: 0.3rem;">Master all 7 layers of the OSI model and the pragmatic 4-layer TCP/IP hourglass architecture.</p>
            </div>
            <div style="background: #f8fafc; border: 1px solid var(--border-light); border-radius: 12px; padding: 1rem;">
              <strong style="color: #047857;">✓ Encapsulation & Demultiplexing</strong>
              <p style="font-size: 0.85rem; color: #64748b; margin-top: 0.3rem;">Trace messages to segments, packets, and frames with Protocol/EtherType/Port demultiplexing.</p>
            </div>
            <div style="background: #f8fafc; border: 1px solid var(--border-light); border-radius: 12px; padding: 1rem;">
              <strong style="color: #047857;">✓ Physical Media & Capacity Bounds</strong>
              <p style="font-size: 0.85rem; color: #64748b; margin-top: 0.3rem;">Analyze Twisted Pair, Single-Mode Optical Fiber, DWDM, and calculate Nyquist and Shannon channel limits.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- TOPIC CATALOG -->
      <div class="section-heading-row">
        <div>
          <h3 class="section-title">Unit I Topic Catalog</h3>
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.2rem;">Select any topic to open its dedicated Wikipedia-style article page with full technical details, interactive diagrams, worked examples, and practice exercises.</p>
        </div>
        <span class="badge" style="background: #d1fae5; color: #047857; font-weight: 700; padding: 6px 12px; border-radius: 9999px;">14 Articles</span>
      </div>

      <div class="content-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; margin-top: 1rem;">
        ${u1Topics.map(t => `
          <div class="study-card topic-catalog-card" onclick="App.loadTopic('${t.id}')">
            <div class="catalog-card-top">
              <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Topic ${t.num} • Unit I</span>
              <span class="badge-difficulty ${t.diff.toLowerCase()}">${t.diff}</span>
            </div>
            <h4 class="catalog-card-title">${t.title}</h4>
            <p class="catalog-card-desc">${t.desc}</p>
            <div class="catalog-card-meta">
              <span>⏱️ ${t.time}</span>
              <span>Prerequisites: ${t.prereq}</span>
            </div>
            <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('${t.id}')">
              Read Full Article →
            </button>
          </div>
        `).join('')}
      </div>
    `;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Unit1Module;
}
