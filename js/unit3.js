// Unit III: Network Layer & Routing - Curriculum & Topic Hub
// Provides curriculum overview and topic catalog linking directly to dedicated topic pages

const Unit3Module = {
  render: function(container) {
    container.innerHTML = `
      <!-- Unit Banner -->
      <div class="welcome-banner" style="background: linear-gradient(100deg, #ecfdf5 0%, #d1fae5 50%, #bbf7d0 100%);">
        <div class="welcome-text">
          <div style="font-size: 0.85rem; font-weight: 800; color: #047857; text-transform: uppercase; margin-bottom: 0.35rem;">
            Semester V • Computer Networks • Kurose & Ross Chapters 4 & 5
          </div>
          <h2>Unit III: Network Layer, IP & Routing Protocols</h2>
          <p>Complete curriculum package covering the Data Plane vs Control Plane distinction, Dijkstra SPF, Distance-Vector Bellman-Ford, OSPF, BGP, IPv4, IPv6, and NAT.</p>
        </div>
        <div class="welcome-scene">
          <div class="better-note" style="color: #047857;">
            Network Core<br>Excellence ♡
          </div>
        </div>
      </div>

      <!-- Unit Overview Card -->
      <div class="study-card" style="margin-bottom: 2rem;">
        <div class="study-card-header">
          <div>
            <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Curriculum Guide</span>
            <h3 class="study-card-title">Unit III Learning Objectives</h3>
          </div>
          <span class="badge" style="background: #d1fae5; color: #047857; font-weight: 700; padding: 6px 12px; border-radius: 9999px;">12 Dedicated Articles</span>
        </div>
        <div class="concept-explanation">
          <p>
            The Network Layer provides end-to-end host-to-host delivery across heterogeneous interconnected subnets, dividing functions between high-speed per-router forwarding hardware and network-wide routing software.
          </p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-top: 1rem;">
            <div style="background: #f8fafc; border: 1px solid var(--border-light); border-radius: 12px; padding: 1rem;">
              <strong style="color: #047857;">1. Data Plane Forwarding (Ch 4)</strong>
              <p style="font-size: 0.85rem; color: #64748b; margin-top: 0.3rem;">Hardware TCAM longest prefix match lookups, crossbar switching fabrics, IPv4 headers, IPv6 40-byte headers, and NAT gateways.</p>
            </div>
            <div style="background: #f8fafc; border: 1px solid var(--border-light); border-radius: 12px; padding: 1rem;">
              <strong style="color: #047857;">2. Control Plane Routing (Ch 5)</strong>
              <p style="font-size: 0.85rem; color: #64748b; margin-top: 0.3rem;">Centralized Link-State Dijkstra SPF, decentralized Distance-Vector Bellman-Ford, count-to-infinity mitigation, and SDN controllers.</p>
            </div>
            <div style="background: #f8fafc; border: 1px solid var(--border-light); border-radius: 12px; padding: 1rem;">
              <strong style="color: #047857;">3. Scalable Internet Protocols</strong>
              <p style="font-size: 0.85rem; color: #64748b; margin-top: 0.3rem;">OSPF Area 0 hierarchical backbone routing and BGP inter-domain path vector policy routing with AS-PATH attributes.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Topic Navigator Pills -->
      <div class="topic-navigator-bar">
        <div class="nav-bar-title">
          <span>⚡ Direct Topic Navigator (Click to open full article page):</span>
          <span style="color: #047857; font-size: 0.78rem;">12 Topics</span>
        </div>
        <div class="topic-pills-wrap">
          <button class="topic-nav-btn" onclick="App.loadTopic('network-layer')">1. Data vs Control Plane</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('forwarding')">2. Packet Forwarding</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('routing')">3. Routing Architecture</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('dijkstra')">4. Dijkstra SPF Algorithm</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('link-state-routing')">5. Link-State Protocols</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('distance-vector')">6. Distance-Vector Routing</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('ospf')">7. OSPF Protocol</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('bgp')">8. BGP-4 Internet Routing</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('sdn')">9. Software-Defined Networking</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('ipv4')">10. IPv4 Protocol</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('ipv6')">11. IPv6 Protocol</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('nat')">12. NAT Translation</button>
        </div>
      </div>

      <!-- TOPIC CATALOG -->
      <div class="section-heading-row" style="margin-top: 1.5rem;">
        <div>
          <h3 class="section-title">Unit III Topic Articles</h3>
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.2rem;">Select any topic to navigate directly to its dedicated Wikipedia-style article page.</p>
        </div>
      </div>

      <div class="content-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; margin-top: 1rem;">
        
        <!-- Network Layer -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('network-layer')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Topic 1 • Major Module</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Network Layer: Data vs Control Plane</h4>
          <p class="catalog-card-desc">The architectural split: nanosecond per-router hardware forwarding vs network-wide software routing logic.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 7 min read</span>
            <span>Prereqs: Packet</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('network-layer')">Read Full Article →</button>
        </div>

        <!-- Forwarding -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('forwarding')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Topic 2 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Packet Forwarding & FIB</h4>
          <p class="catalog-card-desc">Line-rate hardware lookups, Ternary Content-Addressable Memory (TCAM), and Longest Prefix Matching.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 5 min read</span>
            <span>Prereqs: Network Layer</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('forwarding')">Read Full Article →</button>
        </div>

        <!-- Routing -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('routing')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Topic 3 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Routing & Control Plane Architecture</h4>
          <p class="catalog-card-desc">Graph modeling G=(V,E), least-cost path determination, and centralized vs distributed path computation.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 6 min read</span>
            <span>Prereqs: Forwarding</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('routing')">Read Full Article →</button>
        </div>

        <!-- Dijkstra -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('dijkstra')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Topic 4 • Major Module</span>
            <span class="badge-difficulty advanced">Advanced</span>
          </div>
          <h4 class="catalog-card-title">Dijkstra's Shortest Path Algorithm</h4>
          <p class="catalog-card-desc">Link-State SPF derivation, worked 6-node iteration table, binary min-heap complexity, and interactive graph solver.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 7 min read</span>
            <span>🧪 Includes Live Lab</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('dijkstra')">Read Full Article →</button>
        </div>

        <!-- Link State -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('link-state-routing')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Topic 5 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Link-State Routing Protocol</h4>
          <p class="catalog-card-desc">Reliable LSA flooding, building the identical Link-State Database (LSDB), and loop-free shortest path trees.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 5 min read</span>
            <span>Prereqs: Dijkstra</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('link-state-routing')">Read Full Article →</button>
        </div>

        <!-- Distance Vector -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('distance-vector')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Topic 6 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Distance-Vector Routing (Bellman-Ford)</h4>
          <p class="catalog-card-desc">Bellman-Ford iterative equation, direct neighbor exchange, count-to-infinity problem, and poisoned reverse.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 6 min read</span>
            <span>Prereqs: Routing</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('distance-vector')">Read Full Article →</button>
        </div>

        <!-- OSPF -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('ospf')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Topic 7 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Open Shortest Path First (OSPF)</h4>
          <p class="catalog-card-desc">Hierarchical Area 0 backbone, Area Border Routers (ABRs), cryptographic authentication, and multi-area scaling.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 6 min read</span>
            <span>Prereqs: Dijkstra</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('ospf')">Read Full Article →</button>
        </div>

        <!-- BGP -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('bgp')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Topic 8 • Standard</span>
            <span class="badge-difficulty advanced">Advanced</span>
          </div>
          <h4 class="catalog-card-title">Border Gateway Protocol (BGP-4)</h4>
          <p class="catalog-card-desc">Inter-AS path vector routing, AS-PATH loop prevention, NEXT-HOP, and commercial peering transit policy rules.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 7 min read</span>
            <span>Prereqs: Distance Vector</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('bgp')">Read Full Article →</button>
        </div>

        <!-- SDN -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('sdn')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Topic 9 • Concept Card</span>
            <span class="badge-difficulty advanced">Advanced</span>
          </div>
          <h4 class="catalog-card-title">Software-Defined Networking (SDN)</h4>
          <p class="catalog-card-desc">Decoupled control plane, centralized OpenFlow controllers, Match-Plus-Action flow tables, and cloud scale.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 5 min read</span>
            <span>Prereqs: Routing</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('sdn')">Read Full Article →</button>
        </div>

        <!-- IPv4 -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('ipv4')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Topic 10 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">IPv4 Protocol & Addressing (RFC 791)</h4>
          <p class="catalog-card-desc">32-bit dotted-decimal addresses, 20-byte base header, CIDR subnetting, TTL hop count, and fragmentation fields.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 6 min read</span>
            <span>Prereqs: Packet</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('ipv4')">Read Full Article →</button>
        </div>

        <!-- IPv6 -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('ipv6')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Topic 11 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">IPv6 Architecture (RFC 8200)</h4>
          <p class="catalog-card-desc">128-bit hexadecimal addressing, streamlined fixed 40-byte header, no router checksum, and SLAAC autoconfiguration.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 6 min read</span>
            <span>Prereqs: IPv4</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('ipv6')">Read Full Article →</button>
        </div>

        <!-- NAT -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('nat')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Topic 12 • Supporting</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Network Address Translation (NAT)</h4>
          <p class="catalog-card-desc">Multiplexing thousands of private RFC 1918 IPs through one public address, NAT translation tables, and port forwarding.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 5 min read</span>
            <span>Prereqs: IPv4</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('nat')">Read Full Article →</button>
        </div>

      </div>
    `;
  }
};
