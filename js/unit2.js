// Unit II: Data Link Layer & MAC Sublayer - Curriculum & Topic Hub
// Comprehensive coverage according to prescribed reference books:
// 1. A.S. Tanenbaum & D.J. Wetherall, "Computer Networks", Pearson, 6th Edition, 2021
// 2. Behrouz A. Forouzan, "Data Communications and Networking with TCP/IP Protocol Suite", McGraw Hill, 6th Edition, 2022

const Unit2Module = {
  render: function(container) {
    container.innerHTML = `
      <!-- Unit Banner -->
      <div class="welcome-banner" style="background: linear-gradient(100deg, #e0f2fe 0%, #dbeafe 50%, #bae6fd 100%);">
        <div class="welcome-text">
          <div style="font-size: 0.85rem; font-weight: 800; color: #0284c7; text-transform: uppercase; margin-bottom: 0.35rem;">
            Semester V • Computer Networks • Tanenbaum & Wetherall (6th Ed.) & Forouzan (6th Ed.)
          </div>
          <h2>Unit II: Data Link Layer, MAC Sublayer & Switching</h2>
          <p>Exhaustive university curriculum package covering DLL design issues, framing, error control, Hamming codes, CRC, sliding window ARQ, channel allocation, ALOHA, CSMA, 802.11 WiFi, learning bridges, and network connecting devices.</p>
        </div>
        <div class="welcome-scene">
          <div class="better-note" style="color: #0284c7;">
            Tanenbaum &<br>Forouzan Aligned ♡
          </div>
        </div>
      </div>

      <!-- Unit Overview Card -->
      <div class="study-card" style="margin-bottom: 2rem;">
        <div class="study-card-header">
          <div>
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Curriculum Guide</span>
            <h3 class="study-card-title">Unit II Learning Modules & Syllabus Breakdown</h3>
          </div>
          <span class="badge" style="background: #e0f2fe; color: #0284c7; font-weight: 700; padding: 6px 12px; border-radius: 9999px;">27 Comprehensive Articles</span>
        </div>
        <div class="concept-explanation">
          <p>
            The Data Link Layer (OSI Layer 2) bridges physical wire signals and network-layer routing. It encapsulates packets into discrete frames, provides flow control to prevent buffer overflow, handles error detection and forward error correction, controls access to shared multiaccess media (MAC sublayer), and orchestrates local switching with learning bridges.
          </p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-top: 1rem;">
            <div style="background: #f8fafc; border: 1px solid var(--border-light); border-radius: 12px; padding: 1rem;">
              <strong style="color: #0284c7;">1. Design Issues & Services</strong>
              <p style="font-size: 0.85rem; color: #64748b; margin-top: 0.3rem;">Unacknowledged connectionless, acknowledged connectionless, connection-oriented services, character count, byte stuffing, and HDLC bit stuffing.</p>
            </div>
            <div style="background: #f8fafc; border: 1px solid var(--border-light); border-radius: 12px; padding: 1rem;">
              <strong style="color: #0284c7;">2. Error Detection & Correction</strong>
              <p style="font-size: 0.85rem; color: #64748b; margin-top: 0.3rem;">Hamming distance $d_{min}$, 1D/2D parity matrices, 16-bit Internet checksum, CRC Modulo-2 polynomial division, and Hamming (7,4) code.</p>
            </div>
            <div style="background: #f8fafc; border: 1px solid var(--border-light); border-radius: 12px; padding: 1rem;">
              <strong style="color: #0284c7;">3. DLL Protocols & Flow Control</strong>
              <p style="font-size: 0.85rem; color: #64748b; margin-top: 0.3rem;">Simplex protocols (Utopian, Stop-and-Wait, PAR), utilization $\\eta = \\frac{1}{1+2a}$, Sliding Window pipelining, Go-Back-N, and Selective Repeat.</p>
            </div>
            <div style="background: #f8fafc; border: 1px solid var(--border-light); border-radius: 12px; padding: 1rem;">
              <strong style="color: #0284c7;">4. MAC Sublayer & Channel Allocation</strong>
              <p style="font-size: 0.85rem; color: #64748b; margin-top: 0.3rem;">Static FDM/TDM vs dynamic allocation, Pure & Slotted ALOHA throughput, 1-persistent/non-persistent/p-persistent CSMA, and collision-free protocols.</p>
            </div>
            <div style="background: #f8fafc; border: 1px solid var(--border-light); border-radius: 12px; padding: 1rem;">
              <strong style="color: #0284c7;">5. Ethernet & Wireless LAN Protocols</strong>
              <p style="font-size: 0.85rem; color: #64748b; margin-top: 0.3rem;">IEEE 802.3 64-byte minimum frame, CSMA/CD exponential backoff, MAC addresses, ARP resolution, MACA/MACAW, and IEEE 802.11 DCF/PCF/IFS.</p>
            </div>
            <div style="background: #f8fafc; border: 1px solid var(--border-light); border-radius: 12px; padding: 1rem;">
              <strong style="color: #0284c7;">6. Switching & Connecting Devices</strong>
              <p style="font-size: 0.85rem; color: #64748b; margin-top: 0.3rem;">Uses of bridges, transparent learning bridges, 802.1D Spanning Tree, VLAN trunking, and layer-by-layer device comparison (Repeaters, Hubs, Bridges, Switches, Routers, Gateways).</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Topic Navigator Pills (Clicking moves to dedicated page) -->
      <div class="topic-navigator-bar">
        <div class="nav-bar-title">
          <span>⚡ Direct Topic Navigator (Click to open full article page):</span>
          <span style="color: #0284c7; font-size: 0.78rem; font-weight: 700;">27 Detailed Topics</span>
        </div>
        <div class="topic-pills-wrap">
          <button class="topic-nav-btn" onclick="App.loadTopic('dll-design-issues')">1. DLL Design Issues</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('framing')">2. Framing & Boundaries</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('byte-stuffing')">3. Byte Stuffing</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('bit-stuffing')">4. HDLC Bit Stuffing</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('error-detection')">5. Error Detection & Hamming Dist</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('parity')">6. Parity Checks (1D & 2D)</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('checksum')">7. Internet Checksum</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('crc')">8. CRC Polynomial & Lab</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('hamming-code')">9. Hamming (7,4) Code</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('simplex-protocol')">10. Simplex Protocols</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('flow-control')">11. Flow Control & Utilization</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('stop-and-wait')">12. Stop-and-Wait ARQ</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('sliding-window')">13. Sliding Window</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('go-back-n')">14. Go-Back-N ARQ</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('selective-repeat')">15. Selective Repeat ARQ</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('channel-allocation')">16. Channel Allocation Problem</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('aloha')">17. ALOHA (Pure & Slotted)</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('csma-protocols')">18. CSMA Protocols</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('collision-free-protocols')">19. Collision-Free Protocols</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('wireless-lan-protocols')">20. Wireless LAN Protocols</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('ethernet')">21. IEEE 802.3 Ethernet</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('mac-address')">22. MAC Addressing</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('arp')">23. ARP Protocol</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('wifi-mac-sublayer')">24. IEEE 802.11 MAC Sublayer</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('vlan')">25. IEEE 802.1Q VLANs</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('dll-switching')">26. DLL Switching & Bridges</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('network-devices')">27. Connecting Devices</button>
        </div>
      </div>

      <!-- TOPIC CATALOG (Dedicated Pages) -->
      <div class="section-heading-row" style="margin-top: 1.5rem;">
        <div>
          <h3 class="section-title">Unit II Topic Articles Catalog</h3>
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.2rem;">Select any card to navigate directly to its full Wikipedia-style article with theory, mathematical derivations, ASCII diagrams, code, and practice MCQs.</p>
        </div>
      </div>

      <!-- MODULE 1: DESIGN ISSUES & FRAMING -->
      <div style="margin: 1.5rem 0 0.75rem 0;">
        <h4 style="font-size: 1.1rem; color: #0369a1; border-left: 4px solid #0284c7; padding-left: 0.6rem;">Section 1: Data Link Layer Design Issues & Framing</h4>
      </div>
      <div class="content-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
        
        <!-- DLL Design Issues -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('dll-design-issues')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 1 • Foundation</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">DLL Design Issues & Services</h4>
          <p class="catalog-card-desc">Services provided to network layer, framing, error control, and flow control architectural principles from Tanenbaum & Forouzan.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 7 min read</span>
            <span>Prereqs: Physical Layer</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('dll-design-issues')">Read Full Article →</button>
        </div>

        <!-- Framing -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('framing')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 2 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Framing & Boundaries</h4>
          <p class="catalog-card-desc">Breaking raw bitstreams into discrete frames: byte count, character stuffing, delimiter flags, and physical violations.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 6 min read</span>
            <span>Prereqs: Encapsulation</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('framing')">Read Full Article →</button>
        </div>

        <!-- Byte Stuffing -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('byte-stuffing')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 3 • Supporting</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Byte Stuffing (Sentinel Framing)</h4>
          <p class="catalog-card-desc">Inserting Escape bytes (0x7D) before Flag delimiters (0x7E) occurring in user payloads (PPP RFC 1661).</p>
          <div class="catalog-card-meta">
            <span>⏱️ 4 min read</span>
            <span>Prereqs: Framing</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('byte-stuffing')">Read Full Article →</button>
        </div>

        <!-- Bit Stuffing -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('bit-stuffing')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 4 • Supporting</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">HDLC Bit Stuffing Algorithm</h4>
          <p class="catalog-card-desc">Hardware zero-bit insertion after five consecutive 1s to prevent flag pattern 01111110 in payload data.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 5 min read</span>
            <span>Prereqs: Framing</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('bit-stuffing')">Read Full Article →</button>
        </div>

      </div>

      <!-- MODULE 2: ERROR DETECTION AND CORRECTION CODES -->
      <div style="margin: 1.5rem 0 0.75rem 0;">
        <h4 style="font-size: 1.1rem; color: #0369a1; border-left: 4px solid #0284c7; padding-left: 0.6rem;">Section 2: Error Detection & Correction Codes</h4>
      </div>
      <div class="content-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">

        <!-- Error Detection -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('error-detection')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 5 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Error Detection vs Correction</h4>
          <p class="catalog-card-desc">Why channel noise causes bit flips, minimum Hamming distance $d_{min}$, and ARQ detection vs forward error correction.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 6 min read</span>
            <span>Prereqs: Framing</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('error-detection')">Read Full Article →</button>
        </div>

        <!-- Parity -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('parity')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 6 • Foundation</span>
            <span class="badge-difficulty foundation">Foundation</span>
          </div>
          <h4 class="catalog-card-title">Parity Checks (1D & 2D Matrix)</h4>
          <p class="catalog-card-desc">Simple even/odd parity checks and two-dimensional parity matrix for single-bit localization and correction.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 4 min read</span>
            <span>Prereqs: Error Detection</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('parity')">Read Full Article →</button>
        </div>

        <!-- Checksum -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('checksum')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 7 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Internet Checksum (16-Bit)</h4>
          <p class="catalog-card-desc">1's complement summation and wraparound carries standardized in RFC 1071 for IP, TCP, and UDP.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 5 min read</span>
            <span>Prereqs: Error Detection</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('checksum')">Read Full Article →</button>
        </div>

        <!-- CRC -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('crc')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 8 • Major Module</span>
            <span class="badge-difficulty advanced">Core</span>
          </div>
          <h4 class="catalog-card-title">Cyclic Redundancy Check (CRC)</h4>
          <p class="catalog-card-desc">Polynomial division over GF(2), generator polynomials, worked examples, and interactive XOR division lab.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 7 min read</span>
            <span>🧪 Includes Live Lab</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('crc')">Read Full Article →</button>
        </div>

        <!-- Hamming Code -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('hamming-code')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 9 • Standard</span>
            <span class="badge-difficulty advanced">Advanced</span>
          </div>
          <h4 class="catalog-card-title">Hamming (7,4) Error-Correcting Code</h4>
          <p class="catalog-card-desc">Positioning parity bits at powers of 2 (1, 2, 4), calculating syndrome vectors, and single-bit self-correction.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 6 min read</span>
            <span>Prereqs: Parity</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('hamming-code')">Read Full Article →</button>
        </div>

      </div>

      <!-- MODULE 3: DATA LINK LAYER PROTOCOLS & FLOW CONTROL -->
      <div style="margin: 1.5rem 0 0.75rem 0;">
        <h4 style="font-size: 1.1rem; color: #0369a1; border-left: 4px solid #0284c7; padding-left: 0.6rem;">Section 3: Data Link Layer Protocols & Flow Control</h4>
      </div>
      <div class="content-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">

        <!-- Simplex Protocol -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('simplex-protocol')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 10 • Foundation</span>
            <span class="badge-difficulty foundation">Core</span>
          </div>
          <h4 class="catalog-card-title">Elementary Simplex Protocols</h4>
          <p class="catalog-card-desc">Tanenbaum's classic progression: Utopian Simplex, Stop-and-Wait for error-free channels, and Positive ACK with Retransmission (PAR).</p>
          <div class="catalog-card-meta">
            <span>⏱️ 6 min read</span>
            <span>Prereqs: Framing</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('simplex-protocol')">Read Full Article →</button>
        </div>

        <!-- Flow Control -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('flow-control')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 11 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Flow Control & Utilization</h4>
          <p class="catalog-card-desc">Speed matching between sender and receiver, channel utilization $\\eta = \\frac{1}{1+2a}$, and pipelining efficiency.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 5 min read</span>
            <span>Prereqs: Framing</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('flow-control')">Read Full Article →</button>
        </div>

        <!-- Stop and Wait -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('stop-and-wait')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 12 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Stop-and-Wait ARQ Protocol</h4>
          <p class="catalog-card-desc">Alternating 1-bit sequence numbers (0 and 1), timeout timers, lost packets, and interactive timeline simulator.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 5 min read</span>
            <span>🧪 Includes Live Lab</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('stop-and-wait')">Read Full Article →</button>
        </div>

        <!-- Sliding Window -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('sliding-window')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 13 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Sliding Window Protocol</h4>
          <p class="catalog-card-desc">Pipelined data transmission with window size N, sequence number modulo spaces, and throughput maximization.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 6 min read</span>
            <span>Prereqs: Stop-and-Wait</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('sliding-window')">Read Full Article →</button>
        </div>

        <!-- Go-Back-N -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('go-back-n')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 14 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Go-Back-N ARQ (GBN)</h4>
          <p class="catalog-card-desc">Sender window N, receiver window 1, cumulative ACKs, single timer, window retransmission, and simulation.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 6 min read</span>
            <span>🧪 Includes Live Lab</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('go-back-n')">Read Full Article →</button>
        </div>

        <!-- Selective Repeat -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('selective-repeat')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 15 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Selective Repeat ARQ (SR)</h4>
          <p class="catalog-card-desc">Receiver buffers out-of-order packets, individual ACKs, window size $N \\le 2^{k-1}$, and selective retransmissions.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 6 min read</span>
            <span>🧪 Includes Live Lab</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('selective-repeat')">Read Full Article →</button>
        </div>

      </div>

      <!-- MODULE 4: MAC SUBLAYER & CHANNEL ALLOCATION -->
      <div style="margin: 1.5rem 0 0.75rem 0;">
        <h4 style="font-size: 1.1rem; color: #0369a1; border-left: 4px solid #0284c7; padding-left: 0.6rem;">Section 4: MAC Sublayer & Channel Allocation</h4>
      </div>
      <div class="content-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">

        <!-- Channel Allocation -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('channel-allocation')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 16 • Theory</span>
            <span class="badge-difficulty foundation">Core</span>
          </div>
          <h4 class="catalog-card-title">The Channel Allocation Problem</h4>
          <p class="catalog-card-desc">Static allocation (FDM/TDM queue delay analysis $T = \\frac{1}{\\mu C - \\lambda}$) vs dynamic multiaccess contention assumptions.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 5 min read</span>
            <span>Prereqs: Multiplexing</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('channel-allocation')">Read Full Article →</button>
        </div>

        <!-- ALOHA -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('aloha')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 17 • Milestone</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">ALOHA Protocols (Pure & Slotted)</h4>
          <p class="catalog-card-desc">Poisson traffic derivations: Pure ALOHA ($S = G e^{-2G}$, 18.4% max) vs Slotted ALOHA ($S = G e^{-G}$, 36.8% max).</p>
          <div class="catalog-card-meta">
            <span>⏱️ 7 min read</span>
            <span>Prereqs: Channel Allocation</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('aloha')">Read Full Article →</button>
        </div>

        <!-- CSMA Protocols -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('csma-protocols')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 18 • Major Module</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Carrier Sense Multiple Access (CSMA)</h4>
          <p class="catalog-card-desc">1-persistent, non-persistent, and p-persistent listening strategies, plus CSMA/CD collision detection mechanics.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 8 min read</span>
            <span>Prereqs: ALOHA</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('csma-protocols')">Read Full Article →</button>
        </div>

        <!-- Collision Free Protocols -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('collision-free-protocols')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 19 • Advanced</span>
            <span class="badge-difficulty advanced">Advanced</span>
          </div>
          <h4 class="catalog-card-title">Collision-Free Protocols</h4>
          <p class="catalog-card-desc">Eliminating collisions: Bit-Map Protocol, Binary Countdown, and Limited-Contention Adaptive Tree Walk algorithm.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 7 min read</span>
            <span>Prereqs: CSMA</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('collision-free-protocols')">Read Full Article →</button>
        </div>

      </div>

      <!-- MODULE 5: WIRELESS LAN & ETHERNET MAC SUBLAYER PROTOCOLS -->
      <div style="margin: 1.5rem 0 0.75rem 0;">
        <h4 style="font-size: 1.1rem; color: #0369a1; border-left: 4px solid #0284c7; padding-left: 0.6rem;">Section 5: Ethernet & Wireless LAN MAC Protocols</h4>
      </div>
      <div class="content-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">

        <!-- Wireless LAN Protocols -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('wireless-lan-protocols')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 20 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Wireless LAN MAC Protocols</h4>
          <p class="catalog-card-desc">Hidden and exposed terminal problems, MACA (RTS/CTS), and MACAW acknowledgments in wireless multiaccess.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 6 min read</span>
            <span>Prereqs: CSMA Protocols</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('wireless-lan-protocols')">Read Full Article →</button>
        </div>

        <!-- Ethernet -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('ethernet')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 21 • Major Module</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Ethernet (IEEE 802.3 MAC)</h4>
          <p class="catalog-card-desc">64-byte minimum frame size derivation, 512 bit-time slot time, CSMA/CD collision detection, and binary exponential backoff.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 7 min read</span>
            <span>Prereqs: CRC, CSMA</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('ethernet')">Read Full Article →</button>
        </div>

        <!-- MAC Address -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('mac-address')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 22 • Supporting</span>
            <span class="badge-difficulty foundation">Foundation</span>
          </div>
          <h4 class="catalog-card-title">MAC Address (EUI-48)</h4>
          <p class="catalog-card-desc">48-bit hexadecimal hardware addressing, Organizationally Unique Identifiers (OUIs), and broadcast FF:FF:FF:FF:FF:FF.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 4 min read</span>
            <span>Prereqs: Ethernet</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('mac-address')">Read Full Article →</button>
        </div>

        <!-- ARP -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('arp')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 23 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Address Resolution Protocol (ARP)</h4>
          <p class="catalog-card-desc">Mapping 32-bit IP addresses to 48-bit MAC addresses using broadcast requests, unicast replies, and ARP table caching.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 5 min read</span>
            <span>Prereqs: MAC Address, IPv4</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('arp')">Read Full Article →</button>
        </div>

        <!-- WiFi MAC Sublayer -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('wifi-mac-sublayer')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 24 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">IEEE 802.11 MAC Sublayer</h4>
          <p class="catalog-card-desc">Distributed Coordination Function (DCF), Point Coordination Function (PCF), SIFS/DIFS/PIFS timing, and 802.11 frame format.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 7 min read</span>
            <span>Prereqs: Wireless LAN Protocols</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('wifi-mac-sublayer')">Read Full Article →</button>
        </div>

        <!-- VLAN -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('vlan')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 25 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Virtual LANs (IEEE 802.1Q)</h4>
          <p class="catalog-card-desc">Partitioning physical switches into logical broadcast domains, 4-byte 802.1Q trunk tagging, and Inter-VLAN routing.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 5 min read</span>
            <span>Prereqs: Switch, Ethernet</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('vlan')">Read Full Article →</button>
        </div>

      </div>

      <!-- MODULE 6: DATA LINK LAYER SWITCHING & CONNECTING DEVICES -->
      <div style="margin: 1.5rem 0 0.75rem 0;">
        <h4 style="font-size: 1.1rem; color: #0369a1; border-left: 4px solid #0284c7; padding-left: 0.6rem;">Section 6: DLL Switching, Bridges & Connecting Devices</h4>
      </div>
      <div class="content-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">

        <!-- DLL Switching -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('dll-switching')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 26 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">DLL Switching & Learning Bridges</h4>
          <p class="catalog-card-desc">Uses of bridges, backward learning algorithm, MAC filtering tables, and Radia Perlman's 802.1D Spanning Tree Protocol.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 7 min read</span>
            <span>Prereqs: Ethernet, MAC Address</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('dll-switching')">Read Full Article →</button>
        </div>

        <!-- Connecting Devices -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('network-devices')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 27 • Capstone</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Network Connecting Devices</h4>
          <p class="catalog-card-desc">Layer-by-layer architectural comparison: Repeaters (L1), Hubs (L1), Bridges (L2), Switches (L2), Routers (L3), and Gateways (L4-7).</p>
          <div class="catalog-card-meta">
            <span>⏱️ 7 min read</span>
            <span>Prereqs: All Unit II Topics</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('network-devices')">Read Full Article →</button>
        </div>

      </div>
    `;
  }
};
