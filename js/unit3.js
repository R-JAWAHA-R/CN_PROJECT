// Unit III: Network Layer & Routing - Curriculum & Topic Hub
// Provides curriculum overview and topic catalog linking directly to dedicated topic pages
// Aligned with Tanenbaum & Wetherall (6th Ed.) Ch. 5 and Forouzan (6th Ed.) Ch. 18-19

const Unit3Module = {
  render: function(container) {
    container.innerHTML = `
      <!-- Unit Banner -->
      <div class="welcome-banner" style="background: linear-gradient(100deg, #ecfdf5 0%, #d1fae5 50%, #bbf7d0 100%);">
        <div class="welcome-text">
          <div style="font-size: 0.85rem; font-weight: 800; color: #047857; text-transform: uppercase; margin-bottom: 0.35rem;">
            Semester V • Computer Networks • Tanenbaum Ch. 5 & Forouzan Ch. 18–19
          </div>
          <h2>Unit III: Network Layer, Routing & Internetworking</h2>
          <p>Comprehensive curriculum package covering Store-and-Forward Design Issues, the Optimality Principle, Shortest Path (Dijkstra), Flooding, Distance Vector & Count-to-Infinity, Link State & Flooding, Congestion Control & Traffic-Aware Routing, Admission Control (Leaky/Token Bucket), Traffic Throttling (ECN/RED), Load Shedding (Wine vs Milk), Tunneling, Hierarchical Routing, IPv4 Headers & Subnetting Mathematics, and IPv6.</p>
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
          <span class="badge" style="background: #d1fae5; color: #047857; font-weight: 700; padding: 6px 12px; border-radius: 9999px;">20 Dedicated Articles</span>
        </div>
        <div class="concept-explanation">
          <p>
            The Network Layer provides end-to-end host-to-host delivery across heterogeneous interconnected subnets, dividing functions between high-speed per-router forwarding hardware and network-wide routing software.
          </p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-top: 1rem;">
            <div style="background: #f8fafc; border: 1px solid var(--border-light); border-radius: 12px; padding: 1rem;">
              <strong style="color: #047857;">1. Design Issues & Routing Algorithms</strong>
              <p style="font-size: 0.85rem; color: #64748b; margin-top: 0.3rem;">Store-and-forward switching, connectionless vs virtual circuits, Bellman optimality principle, sink trees, Dijkstra SPF, flooding damping, distance vector count-to-infinity, and link-state flooding.</p>
            </div>
            <div style="background: #f8fafc; border: 1px solid var(--border-light); border-radius: 12px; padding: 1rem;">
              <strong style="color: #047857;">2. Congestion Control Approaches</strong>
              <p style="font-size: 0.85rem; color: #64748b; margin-top: 0.3rem;">Open-loop vs closed-loop principles, knee and cliff dynamics, traffic-aware route oscillation, leaky bucket and token bucket traffic shaping, ECN/RED traffic throttling, and Wine vs Milk load shedding.</p>
            </div>
            <div style="background: #f8fafc; border: 1px solid var(--border-light); border-radius: 12px; padding: 1rem;">
              <strong style="color: #047857;">3. Internetworking & IP Protocols</strong>
              <p style="font-size: 0.85rem; color: #64748b; margin-top: 0.3rem;">Heterogeneous network gateways, tunneling protocol encapsulation, two-level hierarchical AS routing, IPv4 header dissection & fragmentation calculations, CIDR subnetting mathematics, and IPv6.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Topic Navigator Pills -->
      <div class="topic-navigator-bar">
        <div class="nav-bar-title">
          <span>⚡ Direct Topic Navigator (Click to open full article page):</span>
          <span style="color: #047857; font-size: 0.78rem;">20 Topics</span>
        </div>
        <div class="topic-pills-wrap">
          <button class="topic-nav-btn" onclick="App.loadTopic('routing-design-issues')">1. Design Issues & Routing</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('optimality-principle')">2. Optimality Principle & Sink Trees</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('shortest-path-algorithm')">3. Shortest Path (Dijkstra SPF)</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('flooding')">4. Flooding & Damping</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('distance-vector-routing')">5. Distance Vector & Count-to-Infinity</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('link-state-routing')">6. Link State & Reliable Flooding</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('congestion-control')">7. Congestion Control Principles</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('traffic-aware-routing')">8. Traffic-Aware Routing</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('admission-control')">9. Admission Control & Shaping</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('traffic-throttling')">10. Traffic Throttling & ECN</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('load-shedding')">11. Load Shedding (Wine vs Milk)</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('internetworking')">12. Internetworking Architecture</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('tunneling')">13. Tunneling & Encapsulation</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('internetwork-routing')">14. Internetwork & AS Routing</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('ipv4-protocol')">15. IPv4 Header & Fragmentation</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('ip-addressing')">16. IP Addresses & Subnetting</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('ipv6-protocol')">17. IPv6 Header & Addressing</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('ospf')">18. OSPF Backbone Areas</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('bgp')">19. BGP-4 Internet Routing</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('nat')">20. NAT Gateways</button>
        </div>
      </div>

      <!-- SECTION 1: DESIGN ISSUES & ROUTING ALGORITHMS -->
      <div style="margin: 2rem 0 0.75rem 0;">
        <h4 style="font-size: 1.15rem; color: #047857; border-left: 4px solid #10b981; padding-left: 0.6rem;">Section 1: Network Layer Design Issues & Routing Algorithms</h4>
      </div>
      <div class="content-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
        
        <!-- Design Issues -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('routing-design-issues')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Topic 1 • Foundation</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Network Layer Design Issues</h4>
          <p class="catalog-card-desc">Store-and-forward packet switching, connectionless datagrams vs virtual-circuit subnets, and static vs adaptive routing classification.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 8 min read</span>
            <span>Prereqs: Network Devices</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('routing-design-issues')">Read Full Article →</button>
        </div>

        <!-- Optimality Principle -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('optimality-principle')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Topic 2 • Theory</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">The Optimality Principle & Sink Trees</h4>
          <p class="catalog-card-desc">Bellman's optimality proof by contradiction, sink tree properties, and mathematical guarantees of loop-free shortest path routing.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 7 min read</span>
            <span>Prereqs: Design Issues</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('optimality-principle')">Read Full Article →</button>
        </div>

        <!-- Shortest Path Algorithm (Dijkstra) -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('shortest-path-algorithm')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Topic 3 • Major Module</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Shortest Path Algorithm (Dijkstra SPF)</h4>
          <p class="catalog-card-desc">Greedy shortest-path algorithm, link weight metrics, step-by-step 6-node state table trace, and next-hop forwarding table generation.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 9 min read</span>
            <span>🧪 Includes Live Lab</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('shortest-path-algorithm')">Read Full Article →</button>
        </div>

        <!-- Flooding -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('flooding')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Topic 4 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Flooding Routing & Damping</h4>
          <p class="catalog-card-desc">Zero-state broadcast routing, broadcast storm prevention via Hop Counters (TTL), sequence number duplicate caches, and selective flooding.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 8 min read</span>
            <span>Prereqs: Design Issues</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('flooding')">Read Full Article →</button>
        </div>

        <!-- Distance Vector Routing -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('distance-vector-routing')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Topic 5 • Major Module</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Distance Vector & Count-to-Infinity</h4>
          <p class="catalog-card-desc">Distributed Bellman-Ford equation, periodic vector exchange, step-by-step trace of count-to-infinity, Split Horizon, and Poisoned Reverse.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 9 min read</span>
            <span>Prereqs: Shortest Path</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('distance-vector-routing')">Read Full Article →</button>
        </div>

        <!-- Link State Routing -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('link-state-routing')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Topic 6 • Major Module</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Link State Routing & Reliable Flooding</h4>
          <p class="catalog-card-desc">The 5-step operational lifecycle: HELLO discovery, ECHO delay measurement, LSA creation, reliable flooding, and local Dijkstra SPF.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 9 min read</span>
            <span>Prereqs: Flooding, Dijkstra</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('link-state-routing')">Read Full Article →</button>
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
            <span>Prereqs: Link State</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('ospf')">Read Full Article →</button>
        </div>

        <!-- BGP -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('bgp')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Topic 8 • Advanced</span>
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

      </div>

      <!-- SECTION 2: CONGESTION CONTROL APPROACHES -->
      <div style="margin: 2rem 0 0.75rem 0;">
        <h4 style="font-size: 1.15rem; color: #047857; border-left: 4px solid #10b981; padding-left: 0.6rem;">Section 2: Congestion Control Approaches & Traffic Management</h4>
      </div>
      <div class="content-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">

        <!-- Congestion Control Principles -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('congestion-control')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Topic 9 • Major Module</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Congestion Control Principles</h4>
          <p class="catalog-card-desc">Flow vs congestion control, offered load vs carried throughput curve, knee and cliff dynamics, and open-loop vs closed-loop classification.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 8 min read</span>
            <span>Prereqs: Design Issues</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('congestion-control')">Read Full Article →</button>
        </div>

        <!-- Traffic-Aware Routing -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('traffic-aware-routing')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Topic 10 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Traffic-Aware Routing & Oscillation</h4>
          <p class="catalog-card-desc">Dynamic load-sensitive link metrics, the route oscillation (flapping) cycle, EWMA metric smoothing, and multipath routing (ECMP).</p>
          <div class="catalog-card-meta">
            <span>⏱️ 8 min read</span>
            <span>Prereqs: Congestion Control</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('traffic-aware-routing')">Read Full Article →</button>
        </div>

        <!-- Admission Control & Traffic Shaping -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('admission-control')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Topic 11 • Major Module</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Admission Control & Traffic Shaping</h4>
          <p class="catalog-card-desc">Virtual circuit admission rejection, Leaky Bucket CBR smoothing, Token Bucket burst allowance, and mathematical burst duration derivation.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 9 min read</span>
            <span>Prereqs: Congestion Control</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('admission-control')">Read Full Article →</button>
        </div>

        <!-- Traffic Throttling -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('traffic-throttling')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Topic 12 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Traffic Throttling, Choke Packets & ECN</h4>
          <p class="catalog-card-desc">Hop-by-hop choke packets, Explicit Congestion Notification (ECN ECT/CE bits, TCP ECE/CWR), and Random Early Detection (RED) queueing.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 8 min read</span>
            <span>Prereqs: Admission Control</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('traffic-throttling')">Read Full Article →</button>
        </div>

        <!-- Load Shedding -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('load-shedding')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Topic 13 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Load Shedding: Wine vs Milk Policies</h4>
          <p class="catalog-card-desc">Emergency packet discard strategies: Wine policy (drop new, keep old) for bulk files vs Milk policy (drop old, keep new) for real-time video/VoIP.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 8 min read</span>
            <span>Prereqs: Traffic Throttling</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('load-shedding')">Read Full Article →</button>
        </div>

      </div>

      <!-- SECTION 3: INTERNETWORKING & IP PROTOCOLS -->
      <div style="margin: 2rem 0 0.75rem 0;">
        <h4 style="font-size: 1.15rem; color: #047857; border-left: 4px solid #10b981; padding-left: 0.6rem;">Section 3: Internetworking & IP Protocols</h4>
      </div>
      <div class="content-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">

        <!-- Internetworking -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('internetworking')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Topic 14 • Foundation</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Internetworking Architecture</h4>
          <p class="catalog-card-desc">Heterogeneous networks, why networks differ (MTU, addressing, QoS), internetwork gateways, and the universal connectionless IP overlay model.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 8 min read</span>
            <span>Prereqs: Design Issues</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('internetworking')">Read Full Article →</button>
        </div>

        <!-- Tunneling -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('tunneling')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Topic 15 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Tunneling & Protocol Encapsulation</h4>
          <p class="catalog-card-desc">Passenger and carrier protocols, dual-stack ingress/egress encapsulation, IPv6-over-IPv4 (6to4), IPsec VPN tunnels, and MTU MSS clamping.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 8 min read</span>
            <span>Prereqs: Internetworking</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('tunneling')">Read Full Article →</button>
        </div>

        <!-- Internetwork Routing -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('internetwork-routing')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Topic 16 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Internetwork & Hierarchical Routing</h4>
          <p class="catalog-card-desc">Autonomous Systems (AS), IGP vs EGP distinction, Stub/Transit AS types, and mathematical proof of table reduction from N to 2*sqrt(N).</p>
          <div class="catalog-card-meta">
            <span>⏱️ 9 min read</span>
            <span>Prereqs: Tunneling</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('internetwork-routing')">Read Full Article →</button>
        </div>

        <!-- IPv4 Protocol -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('ipv4-protocol')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Topic 17 • Major Module</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">IPv4 Protocol & Fragmentation</h4>
          <p class="catalog-card-desc">Complete 20-to-60 byte header dissection, field-by-field breakdown, and comprehensive numerical worked example of fragmentation offset calculations.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 9 min read</span>
            <span>Prereqs: Internetworking</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('ipv4-protocol')">Read Full Article →</button>
        </div>

        <!-- IPv4 Addressing & Subnetting -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('ip-addressing')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Topic 18 • Major Module</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">IPv4 Addresses, CIDR & Subnetting</h4>
          <p class="catalog-card-desc">Classful addressing (Class A/B/C), CIDR prefix notation (/24), subnet mask block size calculations, usable host ranges, and RFC 1918 private IPs.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 10 min read</span>
            <span>Prereqs: IPv4 Protocol</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('ip-addressing')">Read Full Article →</button>
        </div>

        <!-- IPv6 Protocol -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('ipv6-protocol')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Topic 19 • Major Module</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">IPv6 Architecture & 128-Bit Addressing</h4>
          <p class="catalog-card-desc">Streamlined fixed 40-byte base header, elimination of checksum & router fragmentation, extension header chaining, colon-hexadecimal compression, and transition.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 10 min read</span>
            <span>Prereqs: IPv4 Addresses</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('ipv6-protocol')">Read Full Article →</button>
        </div>

        <!-- NAT -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('nat')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Topic 20 • Supporting</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Network Address Translation (NAT)</h4>
          <p class="catalog-card-desc">Multiplexing private RFC 1918 subnets through public IPv4 addresses, NAPT port translation tables, and traversal techniques.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 5 min read</span>
            <span>Prereqs: IPv4 Addresses</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('nat')">Read Full Article →</button>
        </div>

      </div>
    `;
  }
};
