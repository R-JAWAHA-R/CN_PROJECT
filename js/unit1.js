// Unit I: Networking Fundamentals - Curriculum Overview & Topics Hub
// Matches Section 4 of Computer Networks Content Blueprint

const Unit1Module = {
  render: function(container) {
    container.innerHTML = `
      <!-- Unit Banner -->
      <div class="welcome-banner" style="background: linear-gradient(100deg, #ecfdf5 0%, #d1fae5 50%, #a7f3d0 100%);">
        <div class="welcome-text">
          <div style="font-size: 0.85rem; font-weight: 800; color: #047857; text-transform: uppercase; margin-bottom: 0.35rem;">
            Semester V • Computer Networks • Kurose & Ross Chapter 1
          </div>
          <h2>Unit I: Networking Fundamentals & Architecture</h2>
          <p>Foundational principles of computer communication: hosts, routers, switches, packets, the 5-layer Internet protocol stack, and encapsulation.</p>
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
          <span class="badge" style="background: #ecfdf5; color: #047857; font-weight: 700; padding: 6px 12px; border-radius: 9999px;">8 Dedicated Articles</span>
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
              <strong style="color: #047857;">✓ The 5-Layer Protocol Stack</strong>
              <p style="font-size: 0.85rem; color: #64748b; margin-top: 0.3rem;">Understand Application, Transport, Network, Link, and Physical layers and their distinct responsibilities.</p>
            </div>
            <div style="background: #f8fafc; border: 1px solid var(--border-light); border-radius: 12px; padding: 1rem;">
              <strong style="color: #047857;">✓ Encapsulation & Decapsulation</strong>
              <p style="font-size: 0.85rem; color: #64748b; margin-top: 0.3rem;">Trace how messages gain headers to become segments, packets, and frames as they descend the stack.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- TOPIC CATALOG (Dedicated Pages, not scrolling down) -->
      <div class="section-heading-row">
        <div>
          <h3 class="section-title">Unit I Topic Catalog</h3>
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.2rem;">Select any topic to open its dedicated Wikipedia-style article page with full technical details, interactive diagrams, and practice.</p>
        </div>
        <span class="badge" style="background: #d1fae5; color: #047857; font-weight: 700; padding: 6px 12px; border-radius: 9999px;">8 Articles</span>
      </div>

      <div class="content-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; margin-top: 1rem;">
        
        <!-- Topic 1 -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('computer-network')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Topic 1 • Foundation</span>
            <span class="badge-difficulty foundation">Foundation</span>
          </div>
          <h4 class="catalog-card-title">Computer Network & Infrastructure</h4>
          <p class="catalog-card-desc">Definition, why networks exist, nodes, links, hosts, and the Internet as a network of networks.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 5 min read</span>
            <span>Prerequisites: None</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('computer-network')">
            Read Full Article →
          </button>
        </div>

        <!-- Topic 2 -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('protocol')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Topic 2 • Foundation</span>
            <span class="badge-difficulty foundation">Foundation</span>
          </div>
          <h4 class="catalog-card-title">Network Protocols</h4>
          <p class="catalog-card-desc">Rules of communication: message format, syntax, semantics, and actions taken upon message receipt.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 5 min read</span>
            <span>Prerequisites: Computer Network</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('protocol')">
            Read Full Article →
          </button>
        </div>

        <!-- Topic 3 -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('host')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Topic 3 • Core</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Host Systems (Clients & Servers)</h4>
          <p class="catalog-card-desc">End systems residing at the network edge: clients, servers, and network interface cards (NICs).</p>
          <div class="catalog-card-meta">
            <span>⏱️ 4 min read</span>
            <span>Prerequisites: Computer Network</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('host')">
            Read Full Article →
          </button>
        </div>

        <!-- Topic 4 -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('router')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Topic 4 • Core</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Router & Forwarding Engine</h4>
          <p class="catalog-card-desc">Layer-3 forwarding device: input/output interfaces, switching fabric, and forwarding table lookups.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 6 min read</span>
            <span>Prerequisites: Host, Packet</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('router')">
            Read Full Article →
          </button>
        </div>

        <!-- Topic 5 -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('switch')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Topic 5 • Core</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Link-Layer Switch</h4>
          <p class="catalog-card-desc">Layer-2 multi-port forwarding device: collision domain isolation, self-learning MAC tables, and full-duplex operation.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 5 min read</span>
            <span>Prerequisites: Router, Host</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('switch')">
            Read Full Article →
          </button>
        </div>

        <!-- Topic 6 -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('packet')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Topic 6 • Core</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Packet & Statistical Multiplexing</h4>
          <p class="catalog-card-desc">Formatted blocks of data: header, payload, packet switching vs circuit switching, and encapsulation units.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 5 min read</span>
            <span>Prerequisites: Protocol</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('packet')">
            Read Full Article →
          </button>
        </div>

        <!-- Topic 7 -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('protocol-stack')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Topic 7 • Core</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Internet Protocol Stack & OSI Model</h4>
          <p class="catalog-card-desc">The 5-layer Internet architecture (Application, Transport, Network, Link, Physical) compared to 7-layer OSI.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 7 min read</span>
            <span>Prerequisites: Protocol, Packet</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('protocol-stack')">
            Read Full Article →
          </button>
        </div>

        <!-- Topic 8 -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('encapsulation')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Topic 8 • Major Module</span>
            <span class="badge-difficulty advanced">Advanced</span>
          </div>
          <h4 class="catalog-card-title">Encapsulation & Decapsulation</h4>
          <p class="catalog-card-desc">How data is wrapped with headers down the stack: Messages → Segments → Packets → Frames → Bits with interactive diagram.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 6 min read</span>
            <span>Prerequisites: Protocol Stack</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('encapsulation')">
            Read Full Article →
          </button>
        </div>

      </div>
    `;
  }
};
