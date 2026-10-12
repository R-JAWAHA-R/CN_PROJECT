// Unit III: Network Layer, IP Addressing & Routing - Curriculum & Topic Hub
// Master Pedagogical Hierarchy strictly aligned with the Syllabus PDF notes:
// 5 Official Network Layer Sequence Topics from PDF (Pages 1-107) + Chapter 6 Associated Routing Protocols
// Reference Textbooks:
// 1. A.S. Tanenbaum & D.J. Wetherall, "Computer Networks", Pearson, 6th Edition, 2021 (Ch. 5)
// 2. Behrouz A. Forouzan, "Data Communications and Networking with TCP/IP", McGraw Hill, 6th Edition, 2022 (Ch. 18-19)
// 3. J.F. Kurose & K.W. Ross, "Computer Networking: A Top-Down Approach", Pearson, 8th Edition (Ch. 4-5)

const Unit3Module = {
  render: function(container) {
    container.innerHTML = `
      <!-- Unit Banner -->
      <div class="welcome-banner" style="background: linear-gradient(135deg, #059669 0%, #047857 50%, #064e3b 100%); color: white; border-radius: 16px; padding: 2rem; margin-bottom: 2rem; box-shadow: 0 10px 25px -5px rgba(5, 150, 105, 0.25);">
        <div class="welcome-text">
          <div style="font-size: 0.8rem; font-weight: 800; color: #a7f3d0; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
            <span style="background: rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 4px;">MODULE 3</span>
            <span>Computer Networks • Official Syllabus Notes & Prescribed Curriculum</span>
          </div>
          <h2 style="font-size: 1.85rem; font-weight: 900; margin-bottom: 0.75rem; letter-spacing: -0.02em;">Network Layer, IP Addressing & Routing</h2>
          <p style="font-size: 0.95rem; line-height: 1.6; color: #d1fae5; max-width: 900px;">
            The complete Layer 3 curriculum structured into the <strong>Official 5-Part Sequence</strong> from your syllabus PDF notes plus Internet routing protocols. Master store-and-forward switching, the Optimality Principle and sink trees, Dijkstra SPF & flooding, Distance Vector & Count-to-Infinity, Link State routing, open-loop vs closed-loop congestion control, traffic shaping (Leaky/Token Bucket), load shedding, tunneling, IPv4 CIDR subnetting mathematics, IPv6 architecture, and exterior BGP-4 routing.
          </p>
        </div>

        <!-- Quick Interactive Simulators Launcher Bar -->
        <div style="margin-top: 1.5rem; padding-top: 1.25rem; border-top: 1px solid rgba(255,255,255,0.2);">
          <div style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #a7f3d0; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.4rem;">
            <i class="fa-solid fa-flask"></i> Live Interactive Visual Laboratories (Module 3)
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <button class="sim-btn" style="background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); color: white;" onclick="App.loadTopic('shortest-path-algorithm')">
              🗺️ Dijkstra SPF Graph Solver
            </button>
            <button class="sim-btn" style="background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); color: white;" onclick="App.loadTopic('ip-addressing')">
              🧮 CIDR & Subnet Calculator
            </button>
            <button class="sim-btn" style="background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); color: white;" onclick="App.loadTopic('distance-vector-routing')">
              🔄 Distance Vector & Count-to-Infinity
            </button>
            <button class="sim-btn" style="background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); color: white;" onclick="App.loadTopic('congestion-control')">
              🚦 Traffic Shaper (Token/Leaky Bucket)
            </button>
            <button class="sim-btn" style="background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); color: white;" onclick="App.loadTopic('ipv4-protocol')">
              🔍 IPv4 vs IPv6 Header Inspector
            </button>
            <button class="sim-btn" style="background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); color: white;" onclick="App.loadTopic('ospf')">
              🌐 OSPF Areas & BGP-4 Explorer
            </button>
          </div>
        </div>
      </div>

      <!-- MASTER SYLLABUS HIERARCHY ACCORDION / TABLE (EXACT MATCH WITH PDF NOTES SEQUENCE) -->
      <div class="study-card" style="margin-bottom: 2.25rem; border: 2px solid #a7f3d0;">
        <div class="study-card-header flex justify-between items-center" style="border-bottom: 1px solid var(--border-light); padding-bottom: 1rem; margin-bottom: 1.25rem;">
          <div>
            <span class="topic-number-badge" style="background: #059669; color: white; font-weight: 800;">PDF OFFICIAL HIERARCHY</span>
            <h3 class="study-card-title text-lg font-black text-gray-900 dark:text-white mt-1">
              Official 5-Topic Network Layer Hierarchy & Master Roadmap
            </h3>
          </div>
          <span class="badge" style="background: #d1fae5; color: #047857; font-weight: 800; padding: 6px 14px; border-radius: 9999px;">
            6 Chapters • 28 Granular Subtopics
          </span>
        </div>

        <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          This pedagogical hierarchy is derived directly from your 107-page syllabus notes concluding sequence. Rather than an unorganized flat list, Module 3 is structured into the <strong>5 core topics from the PDF</strong> plus <strong>Chapter 6 on Internet routing protocols and SDN architecture</strong>.
        </p>

        <!-- Hierarchy Table -->
        <div class="overflow-x-auto">
          <table class="wiki-table w-full text-xs">
            <thead>
              <tr class="bg-emerald-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                <th style="width: 5%; text-align: center;">#</th>
                <th style="width: 28%;">Main Syllabus Topic (PDF Hierarchy)</th>
                <th style="width: 32%;">What to Prepare Under It</th>
                <th style="width: 35%;">Nested Subtopics & Direct Access</th>
              </tr>
            </thead>
            <tbody>
              <!-- Topic 1 -->
              <tr class="hover:bg-emerald-50/50 dark:hover:bg-gray-800/50 transition-colors">
                <td class="font-bold text-center text-emerald-600 dark:text-emerald-400">1</td>
                <td>
                  <a href="#chap-1" class="font-bold text-gray-900 dark:text-white hover:text-emerald-600">
                    Network Layer Design Issues & Routing Fundamentals
                  </a>
                  <div class="text-[11px] text-gray-400">PDF Pages 1–20 • Fundamentals</div>
                </td>
                <td class="text-gray-600 dark:text-gray-300">
                  Store-and-forward packet switching, connectionless vs connection-oriented (datagrams vs virtual circuits), routing vs forwarding distinction, best-effort service, heterogeneity, scalability, QoS, static vs dynamic, centralized vs distributed, routing metrics, Optimality Principle, sink trees, longest-prefix match, default route 0.0.0.0/0.
                </td>
                <td>
                  <div class="flex flex-wrap gap-1">
                    <button class="px-2 py-1 rounded bg-emerald-100 dark:bg-gray-700 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200 font-semibold text-[11px]" onclick="App.loadTopic('routing-design-issues')">
                      📄 NL Design Issues
                    </button>
                    <button class="px-2 py-1 rounded bg-emerald-100 dark:bg-gray-700 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200 font-semibold text-[11px]" onclick="App.loadTopic('network-layer')">
                      📄 Network Layer Arch
                    </button>
                    <button class="px-2 py-1 rounded bg-emerald-100 dark:bg-gray-700 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200 font-semibold text-[11px]" onclick="App.loadTopic('forwarding')">
                      📄 Forwarding Plane
                    </button>
                    <button class="px-2 py-1 rounded bg-emerald-100 dark:bg-gray-700 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200 font-semibold text-[11px]" onclick="App.loadTopic('routing')">
                      📄 Routing Plane
                    </button>
                    <button class="px-2 py-1 rounded bg-emerald-100 dark:bg-gray-700 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200 font-semibold text-[11px]" onclick="App.loadTopic('optimality-principle')">
                      📄 Optimality Principle
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Topic 2 -->
              <tr class="hover:bg-emerald-50/50 dark:hover:bg-gray-800/50 transition-colors">
                <td class="font-bold text-center text-emerald-600 dark:text-emerald-400">2</td>
                <td>
                  <a href="#chap-2" class="font-bold text-gray-900 dark:text-white hover:text-emerald-600">
                    Routing Algorithms
                  </a>
                  <div class="text-[11px] text-gray-400">PDF Pages 20–42 • Dijkstra & DV Lab</div>
                </td>
                <td class="text-gray-600 dark:text-gray-300">
                  Non-adaptive vs adaptive routing, Shortest Path Algorithm (Dijkstra SPF, non-negative weights, step-by-step example with cost 10), Flooding (damping: TTL/Hop Limit, sequence numbers, selective flooding, spanning-tree flooding), Distance Vector Routing (Bellman-Ford $D_x(y) = \\min_v [c(x,v) + D_v(y)]$, Count-to-Infinity problem, Split Horizon, Poison Reverse, Triggered Updates), Link State Routing (5 steps: neighbor discovery, link cost measurement, LSP creation, reliable flooding, Dijkstra calculation, topology DB, OSPF & IS-IS), Distance Vector vs Link State comparison.
                </td>
                <td>
                  <div class="flex flex-wrap gap-1">
                    <button class="px-2 py-1 rounded bg-emerald-100 dark:bg-gray-700 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200 font-semibold text-[11px]" onclick="App.loadTopic('shortest-path-algorithm')">
                      🗺️ Dijkstra SPF (PDF Cost=10)
                    </button>
                    <button class="px-2 py-1 rounded bg-emerald-100 dark:bg-gray-700 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200 font-semibold text-[11px]" onclick="App.loadTopic('dijkstra')">
                      🗺️ Dijkstra Algorithm
                    </button>
                    <button class="px-2 py-1 rounded bg-emerald-100 dark:bg-gray-700 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200 font-semibold text-[11px]" onclick="App.loadTopic('flooding')">
                      📄 Flooding & Damping
                    </button>
                    <button class="px-2 py-1 rounded bg-emerald-100 dark:bg-gray-700 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200 font-semibold text-[11px]" onclick="App.loadTopic('distance-vector-routing')">
                      🔄 DV & Count-to-Infinity
                    </button>
                    <button class="px-2 py-1 rounded bg-emerald-100 dark:bg-gray-700 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200 font-semibold text-[11px]" onclick="App.loadTopic('distance-vector')">
                      🔄 Distance Vector
                    </button>
                    <button class="px-2 py-1 rounded bg-emerald-100 dark:bg-gray-700 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200 font-semibold text-[11px]" onclick="App.loadTopic('link-state-routing')">
                      📄 Link State Routing
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Topic 3 -->
              <tr class="hover:bg-emerald-50/50 dark:hover:bg-gray-800/50 transition-colors">
                <td class="font-bold text-center text-emerald-600 dark:text-emerald-400">3</td>
                <td>
                  <a href="#chap-3" class="font-bold text-gray-900 dark:text-white hover:text-emerald-600">
                    Congestion Control in Computer Networks
                  </a>
                  <div class="text-[11px] text-gray-400">PDF Pages 42–63 • Traffic Shaper Lab</div>
                </td>
                <td class="text-gray-600 dark:text-gray-300">
                  Buffer queuing, delay, loss, throughput knee & cliff, congestion collapse, causes (excessive traffic, slow routers, bursty traffic, poor routing), effects, Open-loop (preventative) vs Closed-loop (reactive feedback), Traffic-Aware Routing (load-sensitive metrics, route oscillation), Admission Control (resource reservation, committed traffic limits), Traffic Throttling (Rate limiting, Traffic shaping vs policing, Leaky bucket, Token bucket), Load Shedding (Random, Priority, Application-aware, Early dropping/RED, Wine vs Milk), Flow control vs Congestion control distinction, TCP Congestion Control (cwnd, Slow Start, Congestion Avoidance, loss response, ECN RFC 3168).
                </td>
                <td>
                  <div class="flex flex-wrap gap-1">
                    <button class="px-2 py-1 rounded bg-emerald-100 dark:bg-gray-700 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200 font-semibold text-[11px]" onclick="App.loadTopic('congestion-control')">
                      🚦 Congestion Control Principles
                    </button>
                    <button class="px-2 py-1 rounded bg-emerald-100 dark:bg-gray-700 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200 font-semibold text-[11px]" onclick="App.loadTopic('traffic-aware-routing')">
                      📄 Traffic-Aware Routing
                    </button>
                    <button class="px-2 py-1 rounded bg-emerald-100 dark:bg-gray-700 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200 font-semibold text-[11px]" onclick="App.loadTopic('admission-control')">
                      📄 Admission Control
                    </button>
                    <button class="px-2 py-1 rounded bg-emerald-100 dark:bg-gray-700 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200 font-semibold text-[11px]" onclick="App.loadTopic('traffic-throttling')">
                      🚦 Throttling, ECN & RED
                    </button>
                    <button class="px-2 py-1 rounded bg-emerald-100 dark:bg-gray-700 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200 font-semibold text-[11px]" onclick="App.loadTopic('load-shedding')">
                      📄 Load Shedding (Wine/Milk)
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Topic 4 -->
              <tr class="hover:bg-emerald-50/50 dark:hover:bg-gray-800/50 transition-colors">
                <td class="font-bold text-center text-emerald-600 dark:text-emerald-400">4</td>
                <td>
                  <a href="#chap-4" class="font-bold text-gray-900 dark:text-white hover:text-emerald-600">
                    Internetworking and IP Routing
                  </a>
                  <div class="text-[11px] text-gray-400">PDF Pages 63–84 • Tunneling & Forwarding</div>
                </td>
                <td class="text-gray-600 dark:text-gray-300">
                  Connecting independent heterogeneous networks, Routers vs Gateways (router functions, default gateway vs protocol gateway), Tunneling (encapsulation of packet inside another packet, IPv6 over IPv4, VPN tunneling, MTU issues), Internetwork routing (IGPs: RIP, OSPF, IS-IS vs EGPs: BGP), 7-step Packet Forwarding, Longest-prefix match rule, Encapsulation & Decapsulation (hop-by-hop MAC changes vs immutable IP), Packet journey example (laptop in Chennai to remote server), Fragmentation and MTU (IPv4 router fragmentation vs IPv6 source fragmentation & PMTUD).
                </td>
                <td>
                  <div class="flex flex-wrap gap-1">
                    <button class="px-2 py-1 rounded bg-emerald-100 dark:bg-gray-700 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200 font-semibold text-[11px]" onclick="App.loadTopic('internetworking')">
                      📄 Internetworking Arch
                    </button>
                    <button class="px-2 py-1 rounded bg-emerald-100 dark:bg-gray-700 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200 font-semibold text-[11px]" onclick="App.loadTopic('tunneling')">
                      📄 Tunneling & Encapsulation
                    </button>
                    <button class="px-2 py-1 rounded bg-emerald-100 dark:bg-gray-700 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200 font-semibold text-[11px]" onclick="App.loadTopic('internetwork-routing')">
                      📄 Internetwork & AS Routing
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Topic 5 -->
              <tr class="hover:bg-emerald-50/50 dark:hover:bg-gray-800/50 transition-colors">
                <td class="font-bold text-center text-emerald-600 dark:text-emerald-400">5</td>
                <td>
                  <a href="#chap-5" class="font-bold text-gray-900 dark:text-white hover:text-emerald-600">
                    IP Addressing — IPv4 and IPv6
                  </a>
                  <div class="text-[11px] text-gray-400">PDF Pages 84–107 • CIDR Calculator & Header Inspector</div>
                </td>
                <td class="text-gray-600 dark:text-gray-300">
                  32-bit vs 128-bit, IPv4 addressing (dotted decimal, octets, binary conversion weights), IPv4 address classes (A, B, C, D, E), RFC 1918 Private IPv4 ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16, NAT/NAPT), Subnet masks (/8 to /30, total $2^{32-p}$, usable $2^{32-p}-2$), Network/Host/Broadcast addresses, CIDR notation, Subnetting formula ($2^s$ subnets, $2^h - 2$ hosts, worked example /24 into four /26 subnets, VLSM), IPv6 addressing (128 bits, 8 hextets, shortening rules: leading zero removal, double colon '::' once), IPv6 address types (Unicast: Global unicast, Link-local fe80::/10, Unique local fc00::/7, Loopback ::1, Unspecified ::; Multicast ff00::/8; Anycast; no broadcast), IPv4 vs IPv6 comparison table, IPv4-to-IPv6 transition (Dual Stack, Tunneling, Translation NAT64/DNS64), Special addresses (127.0.0.1, 0.0.0.0, 255.255.255.255, 169.254.0.0/16, ::1, fe80::/10).
                </td>
                <td>
                  <div class="flex flex-wrap gap-1">
                    <button class="px-2 py-1 rounded bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 hover:bg-purple-200 font-semibold text-[11px]" onclick="App.loadTopic('ip-addressing')">
                      🧮 Subnetting & CIDR (Page 96)
                    </button>
                    <button class="px-2 py-1 rounded bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 hover:bg-purple-200 font-semibold text-[11px]" onclick="App.loadTopic('ipv4-protocol')">
                      🔍 IPv4 Header (20-60B)
                    </button>
                    <button class="px-2 py-1 rounded bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 hover:bg-purple-200 font-semibold text-[11px]" onclick="App.loadTopic('ipv4')">
                      📄 IPv4 Protocol
                    </button>
                    <button class="px-2 py-1 rounded bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 hover:bg-purple-200 font-semibold text-[11px]" onclick="App.loadTopic('nat')">
                      📄 NAT & NAPT Gateway
                    </button>
                    <button class="px-2 py-1 rounded bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 hover:bg-purple-200 font-semibold text-[11px]" onclick="App.loadTopic('ipv6-protocol')">
                      🔍 IPv6 Base Header (Fixed 40B)
                    </button>
                    <button class="px-2 py-1 rounded bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 hover:bg-purple-200 font-semibold text-[11px]" onclick="App.loadTopic('ipv6')">
                      📄 IPv6 Protocol
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Topic 6 (Curriculum Extension) -->
              <tr class="hover:bg-emerald-50/50 dark:hover:bg-gray-800/50 transition-colors bg-gray-50/40 dark:bg-gray-800/30">
                <td class="font-bold text-center text-gray-500">6</td>
                <td>
                  <a href="#chap-6" class="font-bold text-gray-900 dark:text-white hover:text-emerald-600">
                    Routing Protocols & Internet Architecture
                  </a>
                  <div class="text-[11px] text-gray-400">Associated Curriculum • OSPF, BGP & SDN</div>
                </td>
                <td class="text-gray-600 dark:text-gray-300">
                  OSPF (Link-state IGP, Dijkstra SPF, Areas, Router LSAs), BGP-4 (Path-vector EGP, Autonomous Systems, AS-PATH attribute, eBGP vs iBGP), Software-Defined Networking (SDN, Control Plane vs Data Plane separation, OpenFlow).
                </td>
                <td>
                  <div class="flex flex-wrap gap-1">
                    <button class="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 font-semibold text-[11px]" onclick="App.loadTopic('ospf')">
                      🌐 OSPF Protocol
                    </button>
                    <button class="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 font-semibold text-[11px]" onclick="App.loadTopic('bgp')">
                      🌐 BGP-4 Routing
                    </button>
                    <button class="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 font-semibold text-[11px]" onclick="App.loadTopic('sdn')">
                      🌐 SDN Architecture
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Quick Chapter Jumper Bar -->
      <div class="topic-navigator-bar mb-8 sticky top-16 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur p-3 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <div class="nav-bar-title mb-2 flex items-center justify-between">
          <span class="font-bold text-xs uppercase tracking-wide text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
            <i class="fa-solid fa-list-ol text-emerald-600"></i> Jump Directly to Syllabus Chapter:
          </span>
          <span style="color: #059669; font-size: 0.75rem; font-weight: 700;">6 Chapters Defined in Notes</span>
        </div>
        <div class="flex flex-wrap gap-1.5">
          <a href="#chap-1" class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-gray-800 hover:bg-emerald-100 text-gray-700 dark:text-gray-300">1. NL Design & Routing</a>
          <a href="#chap-2" class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-gray-800 hover:bg-emerald-100 text-gray-700 dark:text-gray-300">2. Routing Algorithms</a>
          <a href="#chap-3" class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-gray-800 hover:bg-emerald-100 text-gray-700 dark:text-gray-300">3. Congestion Control</a>
          <a href="#chap-4" class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-gray-800 hover:bg-emerald-100 text-gray-700 dark:text-gray-300">4. Internetworking</a>
          <a href="#chap-5" class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-gray-800 hover:bg-emerald-100 text-gray-700 dark:text-gray-300">5. IPv4 & IPv6 Addressing</a>
          <a href="#chap-6" class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-gray-800 hover:bg-emerald-100 text-gray-700 dark:text-gray-300">6. Internet Routing Protocols</a>
        </div>
      </div>

      <!-- CHAPTER 1: TOPIC 1 FROM PDF NOTES -->
      <div id="chap-1" class="chapter-block mb-10 pt-4">
        <div class="flex items-center justify-between pb-2 mb-4 border-b-2 border-emerald-500">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded bg-emerald-600 text-white font-black text-xs">TOPIC 1</span>
            <h3 class="text-base font-extrabold text-gray-900 dark:text-white">Network Layer Design Issues & Routing Fundamentals (PDF Pages 1–20)</h3>
          </div>
          <span class="text-xs text-gray-500 dark:text-gray-400 font-medium">5 Nested Subtopics</span>
        </div>
        <div class="content-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.25rem;">
          
          <!-- Subtopic 1.1 -->
          <div class="study-card topic-catalog-card" onclick="App.loadTopic('routing-design-issues')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Subtopic 1.1 • Foundation</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Network Layer Design Issues & Routing Algorithms</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Store-and-forward packet switching, connectionless datagrams vs virtual-circuit subnets, best-effort delivery, and routing vs forwarding distinction.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 25–35 min</span>
              <span class="text-gfg-green font-bold">8 Practice MCQs</span>
            </div>
          </div>

          <!-- Subtopic 1.2 -->
          <div class="study-card topic-catalog-card" onclick="App.loadTopic('network-layer')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Subtopic 1.2 • Architecture</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Network Layer: Data Plane vs Control Plane</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Architectural decoupling between per-router forwarding hardware (nanoseconds) and network-wide routing computation software (seconds).</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 20–30 min</span>
              <span class="text-gfg-green font-bold">5 Practice MCQs</span>
            </div>
          </div>

          <!-- Subtopic 1.3 -->
          <div class="study-card topic-catalog-card" onclick="App.loadTopic('forwarding')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Subtopic 1.3 • Data Plane</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Packet Forwarding Plane</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Moving incoming packets from input port to output port based on forwarding tables and TCAM longest-prefix lookups.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 15–20 min</span>
              <span class="text-gfg-green font-bold">5 Practice MCQs</span>
            </div>
          </div>

          <!-- Subtopic 1.4 -->
          <div class="study-card topic-catalog-card" onclick="App.loadTopic('routing')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Subtopic 1.4 • Control Plane</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Routing Plane & Metric Selection</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Selecting end-to-end paths across subnets using routing metrics: hop count, delay, bandwidth, reliability, and administrative cost.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 15–20 min</span>
              <span class="text-gfg-green font-bold">5 Practice MCQs</span>
            </div>
          </div>

          <!-- Subtopic 1.5 -->
          <div class="study-card topic-catalog-card" onclick="App.loadTopic('optimality-principle')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Subtopic 1.5 • Theory</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">The Optimality Principle & Sink Trees</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Bellman's Optimality Principle: every subpath of an optimal path is optimal. Constructing loop-free sink trees rooted at destination routers.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 20–25 min</span>
              <span class="text-gfg-green font-bold">6 Practice MCQs</span>
            </div>
          </div>

        </div>
      </div>

      <!-- CHAPTER 2: TOPIC 2 FROM PDF NOTES -->
      <div id="chap-2" class="chapter-block mb-10 pt-4">
        <div class="flex items-center justify-between pb-2 mb-4 border-b-2 border-emerald-500">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded bg-emerald-600 text-white font-black text-xs">TOPIC 2</span>
            <h3 class="text-base font-extrabold text-gray-900 dark:text-white">Routing Algorithms (PDF Pages 20–42)</h3>
          </div>
          <span class="text-xs text-gray-500 dark:text-gray-400 font-medium">6 Nested Subtopics • Dijkstra & DV Simulator</span>
        </div>
        <div class="content-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.25rem;">
          
          <!-- Subtopic 2.1 -->
          <div class="study-card topic-catalog-card" onclick="App.loadTopic('shortest-path-algorithm')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Subtopic 2.1 • SPF Solver</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Shortest Path Algorithm (Dijkstra's SPF)</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Greedy shortest-path algorithm for non-negative link weights. Includes step-by-step trace of PDF worked example ($A \\to C \\to B \\to D \\to E$, Cost = 10!).</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 30–40 min</span>
              <span class="text-purple-600 font-bold">Live SPF Solver Lab</span>
            </div>
          </div>

          <!-- Subtopic 2.2 -->
          <div class="study-card topic-catalog-card" onclick="App.loadTopic('dijkstra')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Subtopic 2.2 • Implementation</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Dijkstra's Algorithm Implementation</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Priority queue optimization ($O((V+E)\\log V)$), link-state database calculation, and forwarding table construction.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 20–25 min</span>
              <span class="text-gfg-green font-bold">6 Practice MCQs</span>
            </div>
          </div>

          <!-- Subtopic 2.3 -->
          <div class="study-card topic-catalog-card" onclick="App.loadTopic('flooding')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Subtopic 2.3 • Forwarding</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Flooding & Damping Mechanisms</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Forwarding packets along all outgoing links except incoming. Duplicate suppression via Hop Limits, sequence numbers, and spanning trees.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 20–25 min</span>
              <span class="text-gfg-green font-bold">5 Practice MCQs</span>
            </div>
          </div>

          <!-- Subtopic 2.4 -->
          <div class="study-card topic-catalog-card" onclick="App.loadTopic('distance-vector-routing')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Subtopic 2.4 • Bellman-Ford</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Distance Vector Routing & Count-to-Infinity</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Distributed Bellman-Ford algorithm ($D_x(y) = \\min_v [c(x,v) + D_v(y)]$), routing loops, Split Horizon, and Poison Reverse loop prevention.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 30–40 min</span>
              <span class="text-purple-600 font-bold">Live DV Loop Simulator</span>
            </div>
          </div>

          <!-- Subtopic 2.5 -->
          <div class="study-card topic-catalog-card" onclick="App.loadTopic('distance-vector')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Subtopic 2.5 • RIP Protocol</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Distance Vector Protocols (RIPv1 / RIPv2)</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Routing Information Protocol: hop count metric (max 15, infinity = 16), 30s update timers, and triggered update acceleration.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 20–25 min</span>
              <span class="text-gfg-green font-bold">6 Practice MCQs</span>
            </div>
          </div>

          <!-- Subtopic 2.6 -->
          <div class="study-card topic-catalog-card" onclick="App.loadTopic('link-state-routing')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Subtopic 2.6 • Topology Sync</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Link State Routing & Reliable Flooding</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">The five steps: neighbor discovery, link cost measurement, Link-State Packet creation, reliable flooding, and synchronized topology database.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 25–30 min</span>
              <span class="text-gfg-green font-bold">8 Practice MCQs</span>
            </div>
          </div>

        </div>
      </div>

      <!-- CHAPTER 3: TOPIC 3 FROM PDF NOTES -->
      <div id="chap-3" class="chapter-block mb-10 pt-4">
        <div class="flex items-center justify-between pb-2 mb-4 border-b-2 border-emerald-500">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded bg-emerald-600 text-white font-black text-xs">TOPIC 3</span>
            <h3 class="text-base font-extrabold text-gray-900 dark:text-white">Congestion Control in Computer Networks (PDF Pages 42–63)</h3>
          </div>
          <span class="text-xs text-gray-500 dark:text-gray-400 font-medium">5 Nested Subtopics • Traffic Shaper Lab</span>
        </div>
        <div class="content-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.25rem;">
          
          <!-- Subtopic 3.1 -->
          <div class="study-card topic-catalog-card" onclick="App.loadTopic('congestion-control')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Subtopic 3.1 • Principles</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Congestion Control Approaches & Principles</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Causes and effects of congestion, Knee vs Cliff throughput curve, congestion collapse, open-loop vs closed-loop, and flow control vs congestion control.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 25–35 min</span>
              <span class="text-purple-600 font-bold">Live Traffic Shaper Lab</span>
            </div>
          </div>

          <!-- Subtopic 3.2 -->
          <div class="study-card topic-catalog-card" onclick="App.loadTopic('traffic-aware-routing')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Subtopic 3.2 • Route Shifting</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Traffic-Aware Routing & Route Oscillation</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Incorporating real-time link utilization into routing metrics. Managing route instability and load oscillation between alternative paths.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 20–25 min</span>
              <span class="text-gfg-green font-bold">6 Practice MCQs</span>
            </div>
          </div>

          <!-- Subtopic 3.3 -->
          <div class="study-card topic-catalog-card" onclick="App.loadTopic('admission-control')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Subtopic 3.3 • Open-Loop</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Admission Control & Traffic Shaping (Leaky/Token)</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Preventative control: rejecting flows during peak load. Leaky Bucket (smooth constant rate) vs Token Bucket (allows controlled bursts at wire speed).</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 25–30 min</span>
              <span class="text-gfg-green font-bold">7 Practice MCQs</span>
            </div>
          </div>

          <!-- Subtopic 3.4 -->
          <div class="study-card topic-catalog-card" onclick="App.loadTopic('traffic-throttling')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Subtopic 3.4 • Closed-Loop</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Traffic Throttling, ECN & RED</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Closed-loop feedback: Choke packets, Explicit Congestion Notification (ECN CE bits), and Random Early Detection (RED) active queue management.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 25–30 min</span>
              <span class="text-gfg-green font-bold">7 Practice MCQs</span>
            </div>
          </div>

          <!-- Subtopic 3.5 -->
          <div class="study-card topic-catalog-card" onclick="App.loadTopic('load-shedding')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Subtopic 3.5 • Recovery</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Load Shedding Policies (Wine vs Milk)</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Deliberate packet dropping under buffer emergency. Drop policies: Wine (drop new, keep old) for file transfers vs Milk (drop old, keep new) for multimedia.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 20–25 min</span>
              <span class="text-gfg-green font-bold">5 Practice MCQs</span>
            </div>
          </div>

        </div>
      </div>

      <!-- CHAPTER 4: TOPIC 4 FROM PDF NOTES -->
      <div id="chap-4" class="chapter-block mb-10 pt-4">
        <div class="flex items-center justify-between pb-2 mb-4 border-b-2 border-emerald-500">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded bg-emerald-600 text-white font-black text-xs">TOPIC 4</span>
            <h3 class="text-base font-extrabold text-gray-900 dark:text-white">Internetworking and IP Routing (PDF Pages 63–84)</h3>
          </div>
          <span class="text-xs text-gray-500 dark:text-gray-400 font-medium">3 Nested Subtopics • Forwarding & Encapsulation</span>
        </div>
        <div class="content-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.25rem;">
          
          <!-- Subtopic 4.1 -->
          <div class="study-card topic-catalog-card" onclick="App.loadTopic('internetworking')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Subtopic 4.1 • Core Arch</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Internetworking Architecture & Gateways</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Connecting heterogeneous networks. Routers vs Gateways (default gateway vs protocol translation), and the 7-step packet forwarding lifecycle.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 25–30 min</span>
              <span class="text-gfg-green font-bold">8 Practice MCQs</span>
            </div>
          </div>

          <!-- Subtopic 4.2 -->
          <div class="study-card topic-catalog-card" onclick="App.loadTopic('tunneling')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Subtopic 4.2 • Encapsulation</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Tunneling & Protocol Encapsulation</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Encapsulating inner packets inside outer carrier packets to traverse incompatible networks (IPv6 over IPv4, GRE, VPN tunneling, and MTU overhead).</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 20–25 min</span>
              <span class="text-gfg-green font-bold">6 Practice MCQs</span>
            </div>
          </div>

          <!-- Subtopic 4.3 -->
          <div class="study-card topic-catalog-card" onclick="App.loadTopic('internetwork-routing')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Subtopic 4.3 • Hierarchy</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Internetwork & Autonomous System (AS) Routing</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Two-tier Internet routing architecture: Interior Gateway Protocols (IGPs: OSPF, IS-IS) within an AS, and Exterior Gateway Protocols (EGPs: BGP) between ASes.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 25–30 min</span>
              <span class="text-gfg-green font-bold">7 Practice MCQs</span>
            </div>
          </div>

        </div>
      </div>

      <!-- CHAPTER 5: TOPIC 5 FROM PDF NOTES -->
      <div id="chap-5" class="chapter-block mb-10 pt-4">
        <div class="flex items-center justify-between pb-2 mb-4 border-b-2 border-emerald-500">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded bg-emerald-600 text-white font-black text-xs">TOPIC 5</span>
            <h3 class="text-base font-extrabold text-gray-900 dark:text-white">IP Addressing — IPv4 and IPv6 (PDF Pages 84–107)</h3>
          </div>
          <span class="text-xs text-gray-500 dark:text-gray-400 font-medium">6 Nested Subtopics • CIDR Calculator & Header Inspector</span>
        </div>
        <div class="content-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.25rem;">
          
          <!-- Subtopic 5.1 -->
          <div class="study-card topic-catalog-card" onclick="App.loadTopic('ip-addressing')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Subtopic 5.1 • CIDR Lab</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">IPv4 Addresses, CIDR & Subnetting Mathematics</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Dotted decimal, subnet masks (/8 to /30), usable host formulas ($2^h - 2$), and PDF Page 96 division of /24 into four /26 subnets.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 35–45 min</span>
              <span class="text-purple-600 font-bold">Live Subnet & CIDR Lab</span>
            </div>
          </div>

          <!-- Subtopic 5.2 -->
          <div class="study-card topic-catalog-card" onclick="App.loadTopic('ipv4-protocol')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Subtopic 5.2 • Header Lab</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">IPv4 Datagram Header & In-Transit Fragmentation</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Dissection of 20-to-60 byte header: IHL, TOS/ECN, TTL, Protocol, Checksum, and step-by-step fragmentation calculations (ID, Flags, 8-byte Offset).</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 30–35 min</span>
              <span class="text-purple-600 font-bold">Live Header Inspector</span>
            </div>
          </div>

          <!-- Subtopic 5.3 -->
          <div class="study-card topic-catalog-card" onclick="App.loadTopic('ipv4')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Subtopic 5.3 • IPv4 Fundamentals</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Internet Protocol Version 4 (IPv4) Overview</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Historical address classes (A, B, C, D, E), RFC 1918 private scopes (10/8, 172.16/12, 192.168/16), and public address exhaustion.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 20–25 min</span>
              <span class="text-gfg-green font-bold">10 Practice MCQs</span>
            </div>
          </div>

          <!-- Subtopic 5.4 -->
          <div class="study-card topic-catalog-card" onclick="App.loadTopic('nat')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Subtopic 5.4 • Address Sharing</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Network Address Translation (NAT & NAPT)</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Port Address Translation (PAT): sharing one public IP among multiple internal devices. Translation tables, NAT traversal, and end-to-end violations.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 20–25 min</span>
              <span class="text-gfg-green font-bold">6 Practice MCQs</span>
            </div>
          </div>

          <!-- Subtopic 5.5 -->
          <div class="study-card topic-catalog-card" onclick="App.loadTopic('ipv6-protocol')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Subtopic 5.5 • IPv6 Architecture</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">IPv6 Architecture, 128-Bit Addressing & Transition</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">128-bit address notation, double colon compression, fixed 40-byte base header, removal of checksum, extension headers, and transition (Dual Stack, NAT64).</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 30–40 min</span>
              <span class="text-purple-600 font-bold">Live Header Inspector</span>
            </div>
          </div>

          <!-- Subtopic 5.6 -->
          <div class="study-card topic-catalog-card" onclick="App.loadTopic('ipv6')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Subtopic 5.6 • Protocol Standard</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Internet Protocol Version 6 (IPv6) Operations</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">SLAAC autoconfiguration, ICMPv6 Neighbor Discovery replacing ARP, eliminating broadcast in favor of multicast, and global unicast allocation.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 20–25 min</span>
              <span class="text-gfg-green font-bold">10 Practice MCQs</span>
            </div>
          </div>

        </div>
      </div>

      <!-- CHAPTER 6: ASSOCIATED CURRICULUM PROTOCOLS -->
      <div id="chap-6" class="chapter-block mb-10 pt-4">
        <div class="flex items-center justify-between pb-2 mb-4 border-b-2 border-emerald-500">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded bg-emerald-600 text-white font-black text-xs">TOPIC 6</span>
            <h3 class="text-base font-extrabold text-gray-900 dark:text-white">Routing Protocols & Internet Architecture (Associated Curriculum)</h3>
          </div>
          <span class="text-xs text-gray-500 dark:text-gray-400 font-medium">3 Nested Subtopics</span>
        </div>
        <div class="content-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.25rem;">
          
          <!-- Subtopic 6.1 -->
          <div class="study-card topic-catalog-card" onclick="App.loadTopic('ospf')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Subtopic 6.1 • Link-State IGP</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">OSPF Protocol & Hierarchical Areas</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Open Shortest Path First (RFC 2328): Area 0 backbone, ABR/ASBR routers, LSA flooding, Designated Router (DR) election, and SPF recalculation.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 25–30 min</span>
              <span class="text-gfg-green font-bold">6 Practice MCQs</span>
            </div>
          </div>

          <!-- Subtopic 6.2 -->
          <div class="study-card topic-catalog-card" onclick="App.loadTopic('bgp')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Subtopic 6.2 • Path-Vector EGP</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">BGP-4: Border Gateway Protocol</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">The routing protocol of the global Internet: Autonomous Systems (AS), AS-PATH loop prevention, eBGP vs iBGP peering, and routing policy control.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 25–30 min</span>
              <span class="text-gfg-green font-bold">6 Practice MCQs</span>
            </div>
          </div>

          <!-- Subtopic 6.3 -->
          <div class="study-card topic-catalog-card" onclick="App.loadTopic('sdn')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #d1fae5; color: #047857;">Subtopic 6.3 • Modern SDN</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Software-Defined Networking (SDN) & OpenFlow</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Centralized software control plane vs distributed hardware forwarding planes. OpenFlow protocol, match-action flow tables, and cloud network virtualization.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 20–25 min</span>
              <span class="text-gfg-green font-bold">5 Practice MCQs</span>
            </div>
          </div>

        </div>
      </div>
    `;
  }
};

if (typeof window !== 'undefined') window.Unit3Module = Unit3Module;
if (typeof module !== 'undefined' && module.exports) module.exports = Unit3Module;
