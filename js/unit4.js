// Unit IV: Transport Layer (TCP & UDP) - Curriculum & Topic Hub
// Provides curriculum overview and topic catalog linking directly to dedicated topic pages

const Unit4Module = {
  render: function(container) {
    container.innerHTML = `
      <!-- Unit Banner -->
      <div class="welcome-banner" style="background: linear-gradient(100deg, #ede7f6 0%, #e1bee7 50%, #d1c4e9 100%);">
        <div class="welcome-text">
          <div style="font-size: 0.85rem; font-weight: 800; color: #5e35b1; text-transform: uppercase; margin-bottom: 0.35rem;">
            Semester V • Computer Networks • Kurose & Ross Chapter 3 & RFC 9293
          </div>
          <h2>Unit IV: Transport Layer, TCP, UDP & Congestion Control</h2>
          <p>Complete curriculum package covering socket multiplexing, UDP headers, TCP 3-Way Handshake state machines, byte-stream sequence numbers, receive window flow control, and AIMD congestion control.</p>
        </div>
        <div class="welcome-scene">
          <div class="better-note" style="color: #5e35b1;">
            Transport<br>Mastery ♡
          </div>
        </div>
      </div>

      <!-- Unit Overview Card -->
      <div class="study-card" style="margin-bottom: 2rem;">
        <div class="study-card-header">
          <div>
            <span class="topic-number-badge" style="background: #ede7f6; color: #7c3aed;">Curriculum Guide</span>
            <h3 class="study-card-title">Unit IV Learning Objectives</h3>
          </div>
          <span class="badge" style="background: #ede7f6; color: #7c3aed; font-weight: 700; padding: 6px 12px; border-radius: 9999px;">10 Dedicated Articles</span>
        </div>
        <div class="concept-explanation">
          <p>
            The Transport Layer provides process-to-process communication across endpoints using 16-bit port numbers, offering either lightweight connectionless datagram delivery (UDP) or reliable, ordered byte streams with flow and congestion control (TCP).
          </p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-top: 1rem;">
            <div style="background: #f8fafc; border: 1px solid var(--border-light); border-radius: 12px; padding: 1rem;">
              <strong style="color: #7c3aed;">1. Ports & Multiplexing</strong>
              <p style="font-size: 0.85rem; color: #64748b; margin-top: 0.3rem;">2-tuple UDP demultiplexing vs 4-tuple TCP demultiplexing, well-known port numbers, and socket APIs.</p>
            </div>
            <div style="background: #f8fafc; border: 1px solid var(--border-light); border-radius: 12px; padding: 1rem;">
              <strong style="color: #7c3aed;">2. TCP Connection State & Reliability</strong>
              <p style="font-size: 0.85rem; color: #64748b; margin-top: 0.3rem;">3-Way Handshake (SYN/ACK), ISN randomization, 20-byte RFC 9293 header, byte stream sequence numbers, and cumulative ACKs.</p>
            </div>
            <div style="background: #f8fafc; border: 1px solid var(--border-light); border-radius: 12px; padding: 1rem;">
              <strong style="color: #7c3aed;">3. Flow Control vs Congestion Control</strong>
              <p style="font-size: 0.85rem; color: #64748b; margin-top: 0.3rem;">Receiver buffer protection (rwnd), persist timer, and network-wide AIMD congestion control (Slow Start, Fast Retransmit, TCP Reno).</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Topic Navigator Pills -->
      <div class="topic-navigator-bar">
        <div class="nav-bar-title">
          <span>⚡ Direct Topic Navigator (Click to open full article page):</span>
          <span style="color: #7c3aed; font-size: 0.78rem;">10 Topics</span>
        </div>
        <div class="topic-pills-wrap">
          <button class="topic-nav-btn" onclick="App.loadTopic('transport-layer')">1. Multiplexing & Ports</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('tcp')">2. TCP Protocol Overview</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('udp')">3. UDP Protocol Overview</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('udp-header')">4. UDP 8-Byte Header</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('tcp-three-way-handshake')">5. TCP 3-Way Handshake</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('tcp-header')">6. TCP Header (RFC 9293)</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('sequence-number')">7. Sequence Numbers</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('acknowledgement')">8. Cumulative ACKs</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('tcp-flow-control')">9. TCP Flow Control (rwnd)</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('tcp-congestion-control')">10. TCP Congestion Control (AIMD)</button>
        </div>
      </div>

      <!-- TOPIC CATALOG -->
      <div class="section-heading-row" style="margin-top: 1.5rem;">
        <div>
          <h3 class="section-title">Unit IV Topic Articles</h3>
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.2rem;">Select any topic to navigate directly to its dedicated Wikipedia-style article page.</p>
        </div>
      </div>

      <div class="content-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; margin-top: 1rem;">
        
        <!-- Transport Layer -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('transport-layer')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #ede7f6; color: #7c3aed;">Topic 1 • Major Module</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Transport Layer: Ports & Multiplexing</h4>
          <p class="catalog-card-desc">Process-to-process communication, 16-bit port spaces, 2-tuple UDP demux, and 4-tuple TCP connection demux.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 6 min read</span>
            <span>Prereqs: Network Layer</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('transport-layer')">Read Full Article →</button>
        </div>

        <!-- TCP -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('tcp')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #ede7f6; color: #7c3aed;">Topic 2 • Major Module</span>
            <span class="badge-difficulty advanced">Core</span>
          </div>
          <h4 class="catalog-card-title">Transmission Control Protocol (TCP)</h4>
          <p class="catalog-card-desc">Full-duplex reliable byte-stream transport, RFC 9293 specification, flow control windows, and congestion recovery.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 8 min read</span>
            <span>Prereqs: Transport Layer</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('tcp')">Read Full Article →</button>
        </div>

        <!-- UDP -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('udp')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #ede7f6; color: #7c3aed;">Topic 3 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">User Datagram Protocol (UDP)</h4>
          <p class="catalog-card-desc">Connectionless lightweight transport, RFC 768, zero setup latency, real-time media, DNS, and online gaming.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 5 min read</span>
            <span>Prereqs: Transport Layer</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('udp')">Read Full Article →</button>
        </div>

        <!-- UDP Header -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('udp-header')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #ede7f6; color: #7c3aed;">Topic 4 • Concept Card</span>
            <span class="badge-difficulty foundation">Foundation</span>
          </div>
          <h4 class="catalog-card-title">UDP Header Format (8 Bytes)</h4>
          <p class="catalog-card-desc">Four 16-bit fields: Source Port, Destination Port, Length, and 1's complement Internet Checksum with pseudo-header.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 4 min read</span>
            <span>Prereqs: UDP</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('udp-header')">Read Full Article →</button>
        </div>

        <!-- Handshake -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('tcp-three-way-handshake')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #ede7f6; color: #7c3aed;">Topic 5 • Major Module</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">TCP Three-Way Handshake</h4>
          <p class="catalog-card-desc">SYN $\\to$ SYN+ACK $\\to$ ACK sequence, ISN randomization for security, state machine transitions, and interactive animator.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 7 min read</span>
            <span>🧪 Includes Live Lab</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('tcp-three-way-handshake')">Read Full Article →</button>
        </div>

        <!-- TCP Header -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('tcp-header')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #ede7f6; color: #7c3aed;">Topic 6 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">TCP Segment Header (RFC 9293)</h4>
          <p class="catalog-card-desc">20 to 60-byte structure: Data Offset, sequence and ACK numbers, 6 control flags (SYN, ACK, FIN, RST, PSH, URG), and rwnd.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 7 min read</span>
            <span>Prereqs: TCP</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('tcp-header')">Read Full Article →</button>
        </div>

        <!-- Sequence Number -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('sequence-number')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #ede7f6; color: #7c3aed;">Topic 7 • Concept Card</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">TCP Sequence Numbers & Byte Streams</h4>
          <p class="catalog-card-desc">Indexing individual payload bytes, in-order stream reassembly, sequence wrap-around, and TCP Timestamps (PAWS).</p>
          <div class="catalog-card-meta">
            <span>⏱️ 5 min read</span>
            <span>Prereqs: TCP Header</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('sequence-number')">Read Full Article →</button>
        </div>

        <!-- Acknowledgement -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('acknowledgement')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #ede7f6; color: #7c3aed;">Topic 8 • Concept Card</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Cumulative Acknowledgements & SACK</h4>
          <p class="catalog-card-desc">Next expected byte tracking, immunity to lost individual ACKs, duplicate ACK loss detection, and Fast Retransmit.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 5 min read</span>
            <span>Prereqs: Sequence Number</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('acknowledgement')">Read Full Article →</button>
        </div>

        <!-- Flow Control -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('tcp-flow-control')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #ede7f6; color: #7c3aed;">Topic 9 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">TCP Flow Control (Receive Window rwnd)</h4>
          <p class="catalog-card-desc">Protecting receiver socket buffers, advertised window calculations, zero window probing, persist timer, and window scaling.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 6 min read</span>
            <span>Prereqs: TCP Header</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('tcp-flow-control')">Read Full Article →</button>
        </div>

        <!-- Congestion Control -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('tcp-congestion-control')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #ede7f6; color: #7c3aed;">Topic 10 • Major Module</span>
            <span class="badge-difficulty advanced">Advanced</span>
          </div>
          <h4 class="catalog-card-title">TCP Congestion Control (AIMD & Reno)</h4>
          <p class="catalog-card-desc">Additive Increase Multiplicative Decrease, Slow Start exponential growth, Congestion Avoidance, and Fast Recovery.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 8 min read</span>
            <span>Prereqs: Flow Control</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('tcp-congestion-control')">Read Full Article →</button>
        </div>

      </div>
    `;
  }
};
