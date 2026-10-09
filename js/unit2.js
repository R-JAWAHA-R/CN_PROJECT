// Unit II: Data Link Layer & Reliable Transfer - Curriculum & Topic Hub
// Provides curriculum overview and topic catalog linking directly to dedicated topic pages

const Unit2Module = {
  render: function(container) {
    container.innerHTML = `
      <!-- Unit Banner -->
      <div class="welcome-banner" style="background: linear-gradient(100deg, #e0f2fe 0%, #dbeafe 50%, #bae6fd 100%);">
        <div class="welcome-text">
          <div style="font-size: 0.85rem; font-weight: 800; color: #0284c7; text-transform: uppercase; margin-bottom: 0.35rem;">
            Semester V • Computer Networks • Kurose & Ross Chapters 3 & 6
          </div>
          <h2>Unit II: Data Link Layer, ARQ & Ethernet</h2>
          <p>Complete curriculum package covering framing boundaries, CRC polynomial division, Hamming codes, ARQ flow control, and IEEE 802.3 Ethernet.</p>
        </div>
        <div class="welcome-scene">
          <div class="better-note" style="color: #0284c7;">
            Master Every<br>Concept ♡
          </div>
        </div>
      </div>

      <!-- Unit Overview Card -->
      <div class="study-card" style="margin-bottom: 2rem;">
        <div class="study-card-header">
          <div>
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Curriculum Guide</span>
            <h3 class="study-card-title">Unit II Learning Objectives</h3>
          </div>
          <span class="badge" style="background: #e0f2fe; color: #0284c7; font-weight: 700; padding: 6px 12px; border-radius: 9999px;">16 Dedicated Articles</span>
        </div>
        <div class="concept-explanation">
          <p>
            The Data Link Layer transforms an error-prone physical transmission medium into a reliable, framed communication link between adjacent network nodes.
          </p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-top: 1rem;">
            <div style="background: #f8fafc; border: 1px solid var(--border-light); border-radius: 12px; padding: 1rem;">
              <strong style="color: #0284c7;">1. Framing & Error Control</strong>
              <p style="font-size: 0.85rem; color: #64748b; margin-top: 0.3rem;">Byte stuffing, HDLC bit stuffing, 2D parity matrix, Internet checksum, CRC Modulo-2 division, and Hamming (7,4) code.</p>
            </div>
            <div style="background: #f8fafc; border: 1px solid var(--border-light); border-radius: 12px; padding: 1rem;">
              <strong style="color: #0284c7;">2. Reliable ARQ Protocols</strong>
              <p style="font-size: 0.85rem; color: #64748b; margin-top: 0.3rem;">Stop-and-Wait, Sliding Window pipelining, Go-Back-N cumulative ACKs, and Selective Repeat individual buffering.</p>
            </div>
            <div style="background: #f8fafc; border: 1px solid var(--border-light); border-radius: 12px; padding: 1rem;">
              <strong style="color: #0284c7;">3. Local Area Networks (LAN)</strong>
              <p style="font-size: 0.85rem; color: #64748b; margin-top: 0.3rem;">IEEE 802.3 64-byte frame, CSMA/CD exponential backoff, MAC addressing, ARP resolution, and IEEE 802.1Q VLANs.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Topic Navigator Pills (Clicking moves to dedicated page) -->
      <div class="topic-navigator-bar">
        <div class="nav-bar-title">
          <span>⚡ Direct Topic Navigator (Click to open full article page):</span>
          <span style="color: #0284c7; font-size: 0.78rem;">16 Topics</span>
        </div>
        <div class="topic-pills-wrap">
          <button class="topic-nav-btn" onclick="App.loadTopic('framing')">1. Framing & Boundaries</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('byte-stuffing')">2. Byte Stuffing</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('bit-stuffing')">3. HDLC Bit Stuffing</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('error-detection')">4. Error Detection</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('parity')">5. Parity Checks</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('checksum')">6. Internet Checksum</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('crc')">7. CRC Mathematics & Lab</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('hamming-code')">8. Hamming (7,4) Code</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('flow-control')">9. Flow Control & Utilization</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('stop-and-wait')">10. Stop-and-Wait ARQ</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('sliding-window')">11. Sliding Window</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('go-back-n')">12. Go-Back-N ARQ</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('selective-repeat')">13. Selective Repeat ARQ</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('ethernet')">14. IEEE 802.3 Ethernet</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('mac-address')">15. MAC Addressing</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('arp')">16. ARP Protocol</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('vlan')">17. IEEE 802.1Q VLANs</button>
        </div>
      </div>

      <!-- TOPIC CATALOG (Dedicated Pages) -->
      <div class="section-heading-row" style="margin-top: 1.5rem;">
        <div>
          <h3 class="section-title">Unit II Topic Articles</h3>
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.2rem;">Select any topic to navigate directly to its dedicated Wikipedia-style article page.</p>
        </div>
      </div>

      <div class="content-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; margin-top: 1rem;">
        
        <!-- Framing -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('framing')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 1 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Framing & Boundaries</h4>
          <p class="catalog-card-desc">Breaking raw bitstreams into discrete frames: byte count, character stuffing, and delimiter flags.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 6 min read</span>
            <span>Prereqs: Encapsulation</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('framing')">Read Full Article →</button>
        </div>

        <!-- Byte Stuffing -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('byte-stuffing')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 2 • Supporting</span>
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
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 3 • Supporting</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">HDLC Bit Stuffing Algorithm</h4>
          <p class="catalog-card-desc">Hardware zero-bit insertion after five consecutive 1s to prevent flag pattern 01111110 in data.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 5 min read</span>
            <span>Prereqs: Framing</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('bit-stuffing')">Read Full Article →</button>
        </div>

        <!-- Error Detection -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('error-detection')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 4 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Error Detection vs Correction</h4>
          <p class="catalog-card-desc">Why channel noise causes bit flips, Hamming distance metrics, and ARQ detection vs forward error correction.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 6 min read</span>
            <span>Prereqs: Framing</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('error-detection')">Read Full Article →</button>
        </div>

        <!-- Parity -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('parity')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 5 • Foundation</span>
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
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 6 • Standard</span>
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
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 7 • Major Module</span>
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
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 8 • Standard</span>
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

        <!-- Flow Control -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('flow-control')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 9 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Flow Control & Utilization</h4>
          <p class="catalog-card-desc">Speed matching between sender and receiver, channel utilization $\\frac{1}{1+2a}$, and pipelining efficiency.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 5 min read</span>
            <span>Prereqs: Framing</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('flow-control')">Read Full Article →</button>
        </div>

        <!-- Stop and Wait -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('stop-and-wait')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 10 • Standard</span>
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
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 11 • Standard</span>
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
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 12 • Standard</span>
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
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 13 • Standard</span>
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

        <!-- Ethernet -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('ethernet')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 14 • Major Module</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Ethernet (IEEE 802.3)</h4>
          <p class="catalog-card-desc">64-byte minimum frame size, 512 bit-time slot time, CSMA/CD collision detection, and binary exponential backoff.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 7 min read</span>
            <span>Prereqs: CRC, Framing</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('ethernet')">Read Full Article →</button>
        </div>

        <!-- MAC Address -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('mac-address')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 15 • Supporting</span>
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
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 16 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Address Resolution Protocol (ARP)</h4>
          <p class="catalog-card-desc">Mapping 32-bit IP addresses to 48-bit MAC addresses using broadcast requests, unicast replies, and ARP caching.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 5 min read</span>
            <span>Prereqs: MAC Address, IPv4</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('arp')">Read Full Article →</button>
        </div>

        <!-- VLAN -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('vlan')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Topic 17 • Standard</span>
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
    `;
  }
};
